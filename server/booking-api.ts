import { Router, json } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { bookingRequestSchema } from "../shared/schema.js";

const ALLOWED_SLOTS = new Set([
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
]);

function isAllowedDate(iso: string): boolean {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const diffDays = (date.getTime() - today.getTime()) / 86_400_000;
  if (diffDays < 1 || diffDays > 28) return false;
  const dow = date.getUTCDay();
  return dow !== 0 && dow !== 6;
}

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
      console.error(`[booking] Gmail send failed: ${res.status} ${body}`);
      return { ok: false, error: `${res.status}` };
    }
    return { ok: true };
  } catch (err: unknown) {
    console.error("[booking] send error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

async function sendBookingEmail(args: {
  email: string;
  date: string;
  time: string;
}): Promise<{ ok: boolean; error?: string }> {
  const to = process.env.ALERT_EMAIL_TO || process.env.BOOKING_EMAIL_TO;
  if (!to) {
    console.warn("[booking] No ALERT_EMAIL_TO/BOOKING_EMAIL_TO configured");
    return { ok: false, error: "missing recipient" };
  }
  const subject = `New workshop booking — ${args.date} ${args.time}`;
  const html = `
    <h2>New workshop booking</h2>
    <ul>
      <li><strong>Email:</strong> ${escapeHtml(args.email)}</li>
      <li><strong>Date:</strong> ${escapeHtml(args.date)}</li>
      <li><strong>Time:</strong> ${escapeHtml(args.time)}</li>
    </ul>
    <p style="color:#666;font-size:12px">Sent from /ai-workshop booking dialog.</p>
  `;
  return sendGmail({ to, subject, html });
}

async function sendVisitorConfirmationEmail(args: {
  email: string;
  date: string;
  time: string;
}): Promise<{ ok: boolean; error?: string }> {
  const prettyDate = formatFaroeseDate(args.date);
  const subject = `Váttan á bóking — ${prettyDate} kl. ${args.time}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#1a1a1a; line-height:1.55; max-width:560px;">
      <h2 style="margin:0 0 16px 0;">Takk fyri bókingina</h2>
      <p>Hey,</p>
      <p>Takk fyri at tú hevur bókað eitt stutt prát. Eg ringi tær á tí valda tíðspunktinum:</p>
      <p style="background:#f5f5f3;padding:12px 16px;border-radius:8px;margin:16px 0;">
        <strong>Dagur:</strong> ${escapeHtml(prettyDate)}<br>
        <strong>Tíðspunkt:</strong> kl. ${escapeHtml(args.time)}
      </p>
      <p>Tørvar tú at flyta ella avlýsa tíðspunktið, ert tú vælkomin at svara hesum telduposti ella ringja mær beinleiðis.</p>
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

export function createBookingRouter(): Router {
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
    return true;
  }

  router.post("/api/booking", async (req, res) => {
    const ip =
      (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many requests" });
    }
    const parsed = bookingRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    }
    if (!ALLOWED_SLOTS.has(parsed.data.time)) {
      return res.status(400).json({ error: "Invalid time slot" });
    }
    if (!isAllowedDate(parsed.data.date)) {
      return res.status(400).json({ error: "Invalid date" });
    }
    const result = await sendBookingEmail(parsed.data);
    if (!result.ok) {
      return res.status(502).json({ error: "Email send failed" });
    }
    const visitorResult = await sendVisitorConfirmationEmail(parsed.data);
    if (!visitorResult.ok) {
      console.warn(
        `[booking] Visitor confirmation email failed for ${parsed.data.email}: ${visitorResult.error}`,
      );
    }
    res.json({ ok: true });
  });

  return router;
}
