import { ReplitConnectors } from "@replit/connectors-sdk";
import type { HealthCheckResult, ClientFailureEvent } from "./monitoring-storage.js";
import type { MonitoredForm } from "./monitoring-config.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Uses the Replit Gmail integration (connector id: google-mail).
// Calls https://gmail.googleapis.com/gmail/v1/users/me/messages/send via the proxy,
// which handles OAuth token refresh automatically.

interface MailerStatus {
  configured: boolean;
  missing: string[];
  to?: string;
}

function getMailerStatus(): MailerStatus {
  const missing: string[] = [];
  if (!process.env.ALERT_EMAIL_TO) missing.push("ALERT_EMAIL_TO");
  return {
    configured: missing.length === 0,
    missing,
    to: process.env.ALERT_EMAIL_TO,
  };
}

function encodeRfc2822(opts: {
  to: string;
  subject: string;
  html: string;
}): string {
  const lines = [
    `To: ${opts.to}`,
    `Subject: ${opts.subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    opts.html,
  ];
  return lines.join("\r\n");
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendEmail(subject: string, html: string): Promise<{ ok: boolean; error?: string }> {
  const status = getMailerStatus();
  if (!status.configured) {
    console.warn(
      `[monitoring] Email not sent (missing: ${status.missing.join(", ")}). Subject: ${subject}`
    );
    return { ok: false, error: `missing: ${status.missing.join(", ")}` };
  }
  try {
    const connectors = new ReplitConnectors();
    const raw = base64UrlEncode(
      encodeRfc2822({ to: status.to!, subject, html })
    );
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
      console.error(`[monitoring] Gmail send failed: ${res.status} ${body}`);
      return { ok: false, error: `${res.status}: ${body.slice(0, 300)}` };
    }
    console.log(`[monitoring] Alert email sent: ${subject}`);
    return { ok: true };
  } catch (err: any) {
    console.error(`[monitoring] Gmail send error:`, err);
    return { ok: false, error: err?.message || String(err) };
  }
}

function formatResult(r: HealthCheckResult): string {
  const parts: string[] = [];
  parts.push(`<li><strong>POST status:</strong> ${r.postStatus ?? "n/a"} (${r.postOk ? "OK" : "FAIL"})</li>`);
  parts.push(`<li><strong>Schema check:</strong> ${r.schemaOk ? "OK" : "FAIL"}</li>`);
  if (r.missingEntryIds.length) {
    parts.push(`<li><strong>Missing entry IDs:</strong> ${r.missingEntryIds.join(", ")}</li>`);
  }
  if (r.error) parts.push(`<li><strong>Error:</strong> ${r.error}</li>`);
  parts.push(`<li><strong>Checked at:</strong> ${r.checkedAt}</li>`);
  return `<ul>${parts.join("")}</ul>`;
}

export async function sendAlertEmail(
  form: MonitoredForm,
  recent: HealthCheckResult[]
): Promise<{ ok: boolean; error?: string }> {
  const subject = `[ALERT] Form broken: ${form.label}`;
  const html = `
    <h2>Form submission failure detected</h2>
    <p>The monitored form <strong>${form.label}</strong> has failed health checks
    consecutively. Real customer submissions to this form may not be reaching you.</p>
    <p><a href="${form.formViewUrl}">View the Google Form</a></p>
    <h3>Most recent check</h3>
    ${recent[0] ? formatResult(recent[0]) : "<p>(no recent check)</p>"}
    ${recent[1] ? `<h3>Previous check</h3>${formatResult(recent[1])}` : ""}
    <p style="color:#666;font-size:12px">You will receive a recovery email when checks pass again.</p>
  `;
  return await sendEmail(subject, html);
}

export async function sendClientBeaconAlertEmail(
  form: MonitoredForm,
  recentBeacons: ClientFailureEvent[]
): Promise<{ ok: boolean; error?: string }> {
  const subject = `[ALERT] Real customers are hitting form errors: ${form.label}`;
  const items = recentBeacons
    .slice(0, 10)
    .map(
      (ev) => `
        <li>
          <strong>${escapeHtml(ev.reportedAt)}</strong> — source: ${escapeHtml(ev.source)}<br/>
          ${ev.errorName ? `<code>${escapeHtml(ev.errorName)}</code>: ` : ""}${ev.errorMessage ? escapeHtml(ev.errorMessage) : ""}<br/>
          <span style="color:#666;font-size:11px">${ev.userAgent ? escapeHtml(ev.userAgent) : ""}</span>
        </li>`
    )
    .join("");
  const html = `
    <h2>Real users are reporting form failures</h2>
    <p>${recentBeacons.length} client-side failure beacons have been received for
    <strong>${form.label}</strong> within the alert window. This means real
    visitors tried to submit and the request threw an error in the browser.</p>
    <p><a href="${form.formViewUrl}">Open the Google Form</a></p>
    <h3>Recent reports</h3>
    <ul>${items}</ul>
    <p style="color:#666;font-size:12px">Recovery is detected when the next scheduled health check passes.</p>
  `;
  return await sendEmail(subject, html);
}

export async function sendRecoveryEmail(
  form: MonitoredForm,
  latest: HealthCheckResult
): Promise<void> {
  const subject = `[RECOVERED] Form working again: ${form.label}`;
  const html = `
    <h2>Form is working again</h2>
    <p>The monitored form <strong>${form.label}</strong> is now passing health checks.</p>
    ${formatResult(latest)}
  `;
  await sendEmail(subject, html);
}

