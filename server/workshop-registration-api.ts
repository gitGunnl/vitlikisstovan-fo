import { Router, json } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  workshopRegistrationSchema,
  WORKSHOP_REGISTRATION_PRICE_DKK,
} from "../shared/schema.js";

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

const FAROESE_MONTHS = [
  "januar", "februar", "mars", "apríl", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "desember",
];

function formatFaroeseDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const month = FAROESE_MONTHS[m - 1] ?? "";
  return `${d}. ${month} ${y}`;
}

function formatDkk(n: number): string {
  return n.toLocaleString("da-DK") + " kr.";
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
      }
    );
    if (!res.ok) {
      const body = await res.text();
      console.error(`[workshop-registration] Gmail send failed: ${res.status} ${body}`);
      return { ok: false, error: `${res.status}` };
    }
    return { ok: true };
  } catch (err: unknown) {
    console.error("[workshop-registration] send error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

type Registration = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  date: string;
  seats: number;
};

async function sendOperatorEmail(args: Registration): Promise<{ ok: boolean; error?: string }> {
  const to = process.env.ALERT_EMAIL_TO || process.env.BOOKING_EMAIL_TO;
  if (!to) {
    console.warn("[workshop-registration] No ALERT_EMAIL_TO/BOOKING_EMAIL_TO configured");
    return { ok: false, error: "missing recipient" };
  }
  const prettyDate = formatFaroeseDate(args.date);
  const total = args.seats * WORKSHOP_REGISTRATION_PRICE_DKK;
  const subject = `New leiðslu-verkstova registration — ${prettyDate}, ${args.seats} seat(s)`;
  const html = `
    <h2>New leadership workshop registration</h2>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(args.name)}</li>
      <li><strong>Organization:</strong> ${escapeHtml(args.organization)}</li>
      <li><strong>Email:</strong> ${escapeHtml(args.email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(args.phone)}</li>
      <li><strong>Date:</strong> ${escapeHtml(prettyDate)}</li>
      <li><strong>Seats:</strong> ${args.seats}</li>
      <li><strong>Price per seat:</strong> ${formatDkk(WORKSHOP_REGISTRATION_PRICE_DKK)}</li>
      <li><strong>Total to invoice:</strong> ${formatDkk(total)}</li>
    </ul>
    <p>Visitor acknowledged that an invoice will be sent.</p>
    <p style="color:#666;font-size:12px">Sent from /leidslu-verkstova registration dialog.</p>
  `;
  return sendGmail({ to, subject, html });
}

async function sendVisitorConfirmation(args: Registration): Promise<{ ok: boolean; error?: string }> {
  const prettyDate = formatFaroeseDate(args.date);
  const total = args.seats * WORKSHOP_REGISTRATION_PRICE_DKK;
  const subject = `Váttan á skráseting — Leiðslu-verkstova ${prettyDate}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#1a1a1a; line-height:1.55; max-width:560px;">
      <h2 style="margin:0 0 16px 0;">Takk fyri skrásetingina</h2>
      <p>Hey ${escapeHtml(args.name)},</p>
      <p>Takk fyri at tú hevur skrásett teg til <strong>Leiðslu-verkstovuna</strong>. Her er ein samantekt:</p>
      <p style="background:#f5f5f3;padding:12px 16px;border-radius:8px;margin:16px 0;">
        <strong>Dagur:</strong> ${escapeHtml(prettyDate)}<br>
        <strong>Fyritøka:</strong> ${escapeHtml(args.organization)}<br>
        <strong>Seti:</strong> ${args.seats}<br>
        <strong>Prísur fyri seti:</strong> ${escapeHtml(formatDkk(WORKSHOP_REGISTRATION_PRICE_DKK))}<br>
        <strong>Tilsamans:</strong> ${escapeHtml(formatDkk(total))}
      </p>
      <p>Vit senda tær eina rokning á <strong>${escapeHtml(args.email)}</strong> innan fá dagar. Tørva vit fleiri upplýsingar (t.d. V-tal ella fakturatilvísing), venda vit aftur við einum telduposti.</p>
      <p>Tørvar tú at flyta ella avlýsa, ert tú vælkomin at svara hesum telduposti ella ringja beinleiðis.</p>
      <p>Vit síggjast!</p>
      <p style="margin-top:24px;">
        Vinarliga,<br>
        Gunnleygur<br>
        <a href="https://vitlikisstovan.fo" style="color:#1a1a1a;">Vitlíkisstovan</a>
      </p>
    </div>
  `;
  return sendGmail({ to: args.email, subject, html });
}

export function createWorkshopRegistrationRouter(): Router {
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

  router.post("/api/workshop-registration", async (req, res) => {
    const ip = req.socket.remoteAddress || "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many requests" });
    }
    const parsed = workshopRegistrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: "Invalid request", details: parsed.error.flatten() });
    }
    if (parsed.data.website && parsed.data.website.length > 0) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const payload: Registration = {
      name: parsed.data.name,
      organization: parsed.data.organization,
      email: parsed.data.email,
      phone: parsed.data.phone,
      date: parsed.data.date,
      seats: parsed.data.seats,
    };
    const operatorResult = await sendOperatorEmail(payload);
    if (!operatorResult.ok) {
      return res.status(502).json({ error: "Email send failed" });
    }
    const visitorResult = await sendVisitorConfirmation(payload);
    if (!visitorResult.ok) {
      console.warn(
        `[workshop-registration] Visitor confirmation email failed for ${payload.email}: ${visitorResult.error}`,
      );
    }
    res.json({ ok: true });
  });

  return router;
}
