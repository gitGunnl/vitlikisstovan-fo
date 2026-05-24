import { Router, json } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { promises as fs } from "fs";
import path from "path";
import { resourceRequestSchema } from "../shared/schema.js";

const DATA_DIR = path.join(process.cwd(), "data");
const REQUESTS_FILE = path.join(DATA_DIR, "resource-requests.jsonl");
const CONSENT_FILE = path.join(DATA_DIR, "newsletter-consent.jsonl");

const PDF_PATH = "/Ein_handalig_vegleiding_til_politikarir.pdf";
const SITE_URL = "https://vitlikisstovan.fo";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeRfc2822(opts: { to: string; subject: string; html: string }): string {
  return [
    `To: ${opts.to}`,
    `Subject: ${opts.subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    opts.html,
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
      },
    );
    if (!res.ok) {
      const body = await res.text();
      console.error(`[resource] Gmail send failed: ${res.status} ${body}`);
      return { ok: false, error: `${res.status}` };
    }
    return { ok: true };
  } catch (err: unknown) {
    console.error("[resource] send error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

async function appendJsonl(file: string, record: object): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(file, JSON.stringify(record) + "\n", "utf-8");
}

function visitorEmailHtml(args: { name: string }): string {
  const downloadUrl = `${SITE_URL}${PDF_PATH}`;
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;">
      <h2 style="margin:0 0 16px 0;color:#0f2a44;">Takk fyri áhugan</h2>
      <p>Hey ${escapeHtml(args.name)},</p>
      <p>Takk fyri at tú bað um byrjanarpakkan <em>“Vitlíki á arbeiðsplássinum: Haldið røttu kósina”</em>.</p>
      <p>Ritlingurin er tøkur til niðurtøku her:</p>
      <p style="margin:20px 0;">
        <a href="${downloadUrl}" style="display:inline-block;background:#1f6b5e;color:#ffffff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;">
          Tak ritlingin niður (PDF)
        </a>
      </p>
      <p>Inni í ritlinginum finnur tú meðal annað:</p>
      <ul>
        <li>Grønum / gulum / reyðum trygdarmyndlinum</li>
        <li>Sjey stigini til skipaða nýtslu</li>
        <li>Tríkantin: Leiðsla, KT og starvsfólk</li>
      </ul>
      <p>Skulu tit hava hjálp at fáa hetta í verk á tykkara arbeiðsplássi, svara einans hesum telduposti — so finna vit eina tíð til eina stutta samrøðu.</p>
      <p style="margin-top:24px;">
        Vinarliga,<br>
        Gunnleygur<br>
        <a href="${SITE_URL}" style="color:#0f2a44;">Vitlíkisstovan</a>
      </p>
    </div>
  `;
}

function operatorEmailHtml(args: {
  name: string;
  institution: string;
  email: string;
  newsletterConsent: boolean;
}): string {
  return `
    <h2>Nýggj umbøn um byrjanarpakkan</h2>
    <ul>
      <li><strong>Navn:</strong> ${escapeHtml(args.name)}</li>
      <li><strong>Stovnur:</strong> ${escapeHtml(args.institution)}</li>
      <li><strong>Teldupostur:</strong> ${escapeHtml(args.email)}</li>
      <li><strong>Vil hoyra meira (nýhevdarbræv):</strong> ${args.newsletterConsent ? "JA" : "Nei"}</li>
    </ul>
    <p style="color:#666;font-size:12px">Sent frá /landsnet umbiðingarformi.</p>
  `;
}

export function createResourceRouter(): Router {
  const router = Router();
  router.use(json({ limit: "8kb" }));

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

  router.post("/api/resource-request", async (req, res) => {
    const ip = req.socket.remoteAddress || "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Ov nógvar umbønir. Royn aftur eftir eina løtu." });
    }

    const parsed = resourceRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Tað manglar okkurt í formininum.",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;

    // Honeypot tripped — silently accept but do nothing
    if (data.website && data.website.length > 0) {
      return res.json({ ok: true });
    }

    const consent = !!data.newsletterConsent;
    const submittedAt = new Date().toISOString();

    // Persist primary request
    try {
      await appendJsonl(REQUESTS_FILE, {
        submittedAt,
        name: data.name,
        institution: data.institution,
        email: data.email,
        newsletterConsent: consent,
        source: "/landsnet",
        ip,
      });

      // Store consent SEPARATELY (only if explicitly opted in)
      if (consent) {
        await appendJsonl(CONSENT_FILE, {
          consentedAt: submittedAt,
          name: data.name,
          institution: data.institution,
          email: data.email,
          source: "/landsnet",
        });
      }
    } catch (err) {
      console.error("[resource] persistence failed:", err);
      // Continue — email is the primary delivery; storage is best-effort
    }

    // Send visitor confirmation with PDF link
    const visitorResult = await sendGmail({
      to: data.email,
      subject: "Byrjanarpakki: Vitlíki á arbeiðsplássinum",
      html: visitorEmailHtml({ name: data.name }),
    });
    if (!visitorResult.ok) {
      return res.status(502).json({ error: "Vit kundu ikki senda telduposti. Royn aftur." });
    }

    // Send operator notification
    const operatorTo = process.env.ALERT_EMAIL_TO || process.env.BOOKING_EMAIL_TO;
    if (operatorTo) {
      const operatorResult = await sendGmail({
        to: operatorTo,
        subject: `Ny umbøn: ${data.institution} (${data.name})`,
        html: operatorEmailHtml({
          name: data.name,
          institution: data.institution,
          email: data.email,
          newsletterConsent: consent,
        }),
      });
      if (!operatorResult.ok) {
        console.warn(`[resource] Operator notification failed: ${operatorResult.error}`);
      }
    } else {
      console.warn("[resource] No ALERT_EMAIL_TO configured — operator notification skipped");
    }

    res.json({ ok: true });
  });

  return router;
}
