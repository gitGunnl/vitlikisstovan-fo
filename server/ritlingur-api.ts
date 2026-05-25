import { Router, json } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { ritlingurRequestSchema } from "../shared/schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const REQUESTS_FILE = join(DATA_DIR, "ritlingur-requests.ndjson");
const CONSENT_FILE = join(DATA_DIR, "ritlingur-consents.ndjson");

const PDF_URL_PATH = "/Ein_handalig_vegleiding_til_politikarir.pdf";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeSubject(subject: string): string {
  // RFC 2047 encoded-word so non-ASCII (Faroese) characters survive transport.
  const b64 = Buffer.from(subject, "utf-8").toString("base64");
  return `=?UTF-8?B?${b64}?=`;
}

function encodeRfc2822(opts: { to: string; subject: string; html: string }): string {
  return [
    `To: ${opts.to}`,
    `Subject: ${encodeSubject(opts.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(opts.html, "utf-8").toString("base64"),
  ].join("\r\n");
}

function base64Url(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendGmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const connectors = new ReplitConnectors();
    const raw = base64Url(encodeRfc2822(opts));
    const res = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw }),
        signal: AbortSignal.timeout(10_000),
      } as RequestInit,
    );
    if (!res.ok) {
      const body = await res.text();
      console.error(`[ritlingur] Gmail send failed: ${res.status} ${body}`);
      return { ok: false, error: `${res.status}` };
    }
    return { ok: true };
  } catch (err: unknown) {
    console.error("[ritlingur] send error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

async function appendJsonLine(file: string, record: object): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(file, JSON.stringify(record) + "\n", "utf-8");
  } catch (err) {
    console.error(`[ritlingur] Failed to persist ${file}:`, err);
  }
}

function sanitizeHeader(s: string): string {
  return s.replace(/[\r\n\t]+/g, " ").slice(0, 120).trim();
}

function pdfUrl(req: { protocol: string; get: (h: string) => string | undefined }): string {
  const host = req.get("host") || "vitlikisstovan.fo";
  const proto = req.get("x-forwarded-proto") || req.protocol || "https";
  return `${proto}://${host}${PDF_URL_PATH}`;
}

async function sendVisitorEmail(args: {
  email: string;
  pdfUrl: string;
}): Promise<{ ok: boolean; error?: string }> {
  const subject = "Ritlingurin frá Vitlíkisstovuni — Vitlíki á arbeiðsplássinum";
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0f2540;line-height:1.6;max-width:560px;">
      <h2 style="margin:0 0 16px 0;color:#0f2540;">Takk fyri áhugan</h2>
      <p>Her er ritlingurin: <strong>Vitlíki á arbeiðsplássinum — Haldið røttu kósina</strong>.</p>
      <p style="margin:24px 0;">
        <a href="${escapeHtml(args.pdfUrl)}"
           style="background:#2c6e7a;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;display:inline-block;font-weight:600;">
          Tak ritlingin niður (PDF)
        </a>
      </p>
      <p>Um leinkjan ikki virkar, kanst tú avrita hesa URL:<br>
        <span style="color:#2c6e7a;">${escapeHtml(args.pdfUrl)}</span>
      </p>
      <p>Hesin ritlingurin er ein royndar-útgáva. Vit dagføra hana javnan við nýggjum dømum og praktiskum ráðum til føroyskar almennar stovnar.</p>
      <p style="margin-top:24px;">
        Vinarliga,<br>
        Vitlíkisstovan<br>
        <a href="https://vitlikisstovan.fo" style="color:#2c6e7a;">vitlikisstovan.fo</a>
      </p>
    </div>
  `;
  return sendGmail({ to: args.email, subject, html });
}

async function sendOperatorEmail(args: {
  to: string;
  email: string;
  consent: boolean;
  timestamp: string;
}): Promise<{ ok: boolean; error?: string }> {
  const subject = `Nýggj ritlingur-umbøn — ${sanitizeHeader(args.email)}`;
  const html = `
    <h2>Nýggj ritlingur-umbøn</h2>
    <ul>
      <li><strong>Teldupostur:</strong> ${escapeHtml(args.email)}</li>
      <li><strong>Vil hoyra meira:</strong> ${args.consent ? "Ja" : "Nei"}</li>
      <li><strong>Tíðspunkt:</strong> ${escapeHtml(args.timestamp)}</li>
    </ul>
    <p style="color:#666;font-size:12px">Sent frá /landsnet ritlingur-umbiðingarforminum.</p>
  `;
  return sendGmail({ to: args.to, subject, html });
}

export function createRitlingurRouter(): Router {
  const router = Router();
  router.use(json({ limit: "4kb" }));

  const buckets = new Map<string, { tokens: number; refilledAt: number }>();
  const MAX_TOKENS = 5;
  const REFILL_PER_MS = 5 / 60_000;
  function rateLimit(ip: string): boolean {
    const now = Date.now();
    const b = buckets.get(ip) ?? { tokens: MAX_TOKENS, refilledAt: now };
    b.tokens = Math.min(MAX_TOKENS, b.tokens + (now - b.refilledAt) * REFILL_PER_MS);
    b.refilledAt = now;
    if (b.tokens < 1) {
      buckets.set(ip, b);
      return false;
    }
    b.tokens -= 1;
    buckets.set(ip, b);
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) {
        if (now - v.refilledAt > 10 * 60_000) buckets.delete(k);
      }
    }
    return true;
  }

  router.post("/api/ritlingur", async (req, res) => {
    const ip = req.socket.remoteAddress || "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many requests" });
    }
    const parsed = ritlingurRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: "Invalid request", details: parsed.error.flatten() });
    }
    const data = parsed.data;

    // Honeypot — silently succeed without doing anything
    if (data.website && data.website.length > 0) {
      return res.json({ ok: true });
    }

    const timestamp = new Date().toISOString();
    const url = pdfUrl(req);

    const visitorResult = await sendVisitorEmail({
      email: data.email,
      pdfUrl: url,
    });
    if (!visitorResult.ok) {
      return res.status(502).json({ error: "Email send failed" });
    }

    const operatorTo = process.env.ALERT_EMAIL_TO || process.env.BOOKING_EMAIL_TO;
    if (operatorTo) {
      const opResult = await sendOperatorEmail({
        to: operatorTo,
        email: data.email,
        consent: !!data.consent,
        timestamp,
      });
      if (!opResult.ok) {
        console.warn(`[ritlingur] Operator notification failed: ${opResult.error}`);
      }
    } else {
      console.warn("[ritlingur] No ALERT_EMAIL_TO/BOOKING_EMAIL_TO configured");
    }

    await appendJsonLine(REQUESTS_FILE, {
      timestamp,
      email: data.email,
    });

    if (data.consent) {
      await appendJsonLine(CONSENT_FILE, {
        timestamp,
        email: data.email,
      });
    }

    res.json({ ok: true });
  });

  return router;
}
