import type { HealthCheckResult } from "./monitoring-storage.js";
import type { MonitoredForm } from "./monitoring-config.js";

const RESEND_API_URL = "https://api.resend.com/emails";

export interface MailerStatus {
  configured: boolean;
  missing: string[];
  to?: string;
  from?: string;
}

export function getMailerStatus(): MailerStatus {
  const missing: string[] = [];
  if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!process.env.ALERT_EMAIL_TO) missing.push("ALERT_EMAIL_TO");
  if (!process.env.ALERT_EMAIL_FROM) missing.push("ALERT_EMAIL_FROM");
  return {
    configured: missing.length === 0,
    missing,
    to: process.env.ALERT_EMAIL_TO,
    from: process.env.ALERT_EMAIL_FROM,
  };
}

async function sendEmail(subject: string, html: string): Promise<void> {
  const status = getMailerStatus();
  if (!status.configured) {
    console.warn(
      `[monitoring] Email not sent (missing: ${status.missing.join(", ")}). Subject: ${subject}`
    );
    return;
  }
  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: status.from,
        to: [status.to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[monitoring] Resend send failed: ${res.status} ${body}`);
    } else {
      console.log(`[monitoring] Alert email sent: ${subject}`);
    }
  } catch (err) {
    console.error(`[monitoring] Resend send error:`, err);
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
): Promise<void> {
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
  await sendEmail(subject, html);
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

export async function sendTestEmail(): Promise<MailerStatus & { sent: boolean }> {
  const status = getMailerStatus();
  if (!status.configured) return { ...status, sent: false };
  await sendEmail(
    "[TEST] Form monitoring email is working",
    `<p>This is a test email from the form monitoring system. If you received this, alerts will work.</p>`
  );
  return { ...status, sent: true };
}
