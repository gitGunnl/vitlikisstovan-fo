import {
  MONITORED_FORMS,
  CHECK_INTERVAL_MS,
  FAILURE_THRESHOLD,
  type MonitoredForm,
} from "./monitoring-config.js";
import {
  recordCheckResult,
  setAlertActive,
  loadMonitoring,
  type HealthCheckResult,
} from "./monitoring-storage.js";
import { sendAlertEmail, sendRecoveryEmail } from "./monitoring-mailer.js";

const FETCH_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function checkPost(form: MonitoredForm): Promise<{
  ok: boolean;
  status: number | null;
  error?: string;
}> {
  const body = new URLSearchParams(form.healthcheckPayload).toString();
  try {
    const res = await fetchWithTimeout(form.formActionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      redirect: "follow",
    });
    return { ok: res.status >= 200 && res.status < 400, status: res.status };
  } catch (err: any) {
    return { ok: false, status: null, error: err?.message || String(err) };
  }
}

async function checkSchema(form: MonitoredForm): Promise<{
  ok: boolean;
  missing: string[];
  error?: string;
}> {
  try {
    const res = await fetchWithTimeout(form.formViewUrl);
    if (!res.ok) {
      return { ok: false, missing: [], error: `view fetch ${res.status}` };
    }
    const html = await res.text();
    const missing: string[] = [];
    for (const entryId of form.expectedEntryIds) {
      const variants = [
        `entry.${entryId}`,
        `"entry.${entryId}"`,
        `[${entryId},`,
        `[${entryId}]`,
      ];
      if (!variants.some((v) => html.includes(v))) {
        missing.push(entryId);
      }
    }
    return { ok: missing.length === 0, missing };
  } catch (err: any) {
    return { ok: false, missing: [], error: err?.message || String(err) };
  }
}

export async function runCheck(
  formId: string,
  trigger: HealthCheckResult["trigger"] = "manual"
): Promise<HealthCheckResult | null> {
  const form = MONITORED_FORMS.find((f) => f.id === formId);
  if (!form) return null;
  const startedAt = Date.now();

  const [postResult, schemaResult] = await Promise.all([
    checkPost(form),
    checkSchema(form),
  ]);

  const result: HealthCheckResult = {
    formId: form.id,
    checkedAt: new Date(startedAt).toISOString(),
    ok: postResult.ok && schemaResult.ok,
    postOk: postResult.ok,
    postStatus: postResult.status,
    schemaOk: schemaResult.ok,
    missingEntryIds: schemaResult.missing,
    durationMs: Date.now() - startedAt,
    error: postResult.error || schemaResult.error,
    trigger,
  };

  const state = recordCheckResult(result);

  // Only mark alertActive=true AFTER a successful email send, otherwise
  // a transient mailer failure would silence all subsequent alerts.
  if (!result.ok && state.consecutiveFailures >= FAILURE_THRESHOLD && !state.alertActive) {
    const sendResult = await sendAlertEmail(form, state.history);
    if (sendResult.ok) {
      setAlertActive(form.id, true);
    } else {
      console.warn(
        `[monitoring] Alert email send failed for ${form.id}; will retry on next failed check.`
      );
    }
  } else if (result.ok && state.alertActive) {
    // Recovery email best-effort; clear the alert regardless so the next
    // failure cycle can fire fresh.
    setAlertActive(form.id, false);
    await sendRecoveryEmail(form, result);
  }

  return result;
}

export async function runAllChecks(
  trigger: HealthCheckResult["trigger"] = "scheduled"
): Promise<HealthCheckResult[]> {
  const results: HealthCheckResult[] = [];
  for (const form of MONITORED_FORMS) {
    const r = await runCheck(form.id, trigger);
    if (r) results.push(r);
  }
  return results;
}

let scheduler: NodeJS.Timeout | null = null;

export function startScheduler(): void {
  if (scheduler) return;
  console.log(
    `[monitoring] Scheduler starting. Interval: ${Math.round(CHECK_INTERVAL_MS / 60000)} min. Forms: ${MONITORED_FORMS.length}`
  );
  // Initial check shortly after startup so admin page has data.
  setTimeout(() => {
    runAllChecks("startup").catch((err) =>
      console.error("[monitoring] startup check error:", err)
    );
  }, 30_000);
  scheduler = setInterval(() => {
    runAllChecks("scheduled").catch((err) =>
      console.error("[monitoring] scheduled check error:", err)
    );
  }, CHECK_INTERVAL_MS);
}

export function getMonitoringSnapshot() {
  return loadMonitoring();
}
