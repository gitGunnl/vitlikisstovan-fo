import { Router, json } from "express";
import { runAllChecks, runCheck, getMonitoringSnapshot } from "./monitoring.js";
import { recordClientFailure } from "./monitoring-storage.js";
import { MONITORED_FORMS, CLIENT_FORM_SOURCES } from "./monitoring-config.js";
import { getMailerStatus, sendTestEmail } from "./monitoring-mailer.js";

function requireAdmin(req: any, res: any, next: any) {
  const adminKey = process.env.ELECTION_ADMIN_KEY;
  if (!adminKey) {
    console.error(
      "[monitoring] ELECTION_ADMIN_KEY env var is not set — admin endpoints are disabled."
    );
    return res.status(503).json({ error: "Admin key not configured on server" });
  }
  const provided = req.headers["x-admin-key"];
  if (provided !== adminKey) return res.status(401).json({ error: "Unauthorized" });
  next();
}

export function createMonitoringRouter(): Router {
  const router = Router();
  router.use(json({ limit: "10kb" }));

  // Public-ish: accepts client failure beacons. Token-bucket rate limit per IP.
  const buckets = new Map<string, { tokens: number; refilledAt: number }>();
  const MAX_TOKENS = 10;
  const REFILL_PER_MS = 10 / 60_000; // 10 reports / minute
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
      // Light cleanup to prevent unbounded growth.
      for (const [k, v] of buckets) {
        if (now - v.refilledAt > 10 * 60_000) buckets.delete(k);
      }
    }
    return true;
  }

  router.post("/api/monitoring/client-failure", (req, res) => {
    const ip =
      (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many reports" });
    }
    const { source, errorName, errorMessage } = req.body || {};
    if (typeof source !== "string" || !CLIENT_FORM_SOURCES.includes(source as any)) {
      return res.status(400).json({ error: "Invalid source" });
    }
    recordClientFailure({
      source,
      reportedAt: new Date().toISOString(),
      errorName: typeof errorName === "string" ? errorName.slice(0, 200) : undefined,
      errorMessage: typeof errorMessage === "string" ? errorMessage.slice(0, 500) : undefined,
      userAgent: typeof req.headers["user-agent"] === "string"
        ? (req.headers["user-agent"] as string).slice(0, 300)
        : undefined,
    });
    res.json({ ok: true });
  });

  // Admin: snapshot of monitoring state.
  router.get("/api/monitoring/status", requireAdmin, (_req, res) => {
    const data = getMonitoringSnapshot();
    res.json({
      forms: MONITORED_FORMS.map((f) => ({
        id: f.id,
        label: f.label,
        formViewUrl: f.formViewUrl,
        expectedEntryIds: f.expectedEntryIds,
        state: data.forms[f.id],
      })),
      clientFailures: data.clientFailures,
      mailer: getMailerStatus(),
    });
  });

  // Admin: trigger checks on demand.
  router.post("/api/monitoring/run", requireAdmin, async (req, res) => {
    try {
      const formId = typeof req.body?.formId === "string" ? req.body.formId : undefined;
      if (formId) {
        const r = await runCheck(formId, "manual");
        if (!r) return res.status(404).json({ error: "Unknown formId" });
        return res.json({ results: [r] });
      }
      const results = await runAllChecks("manual");
      res.json({ results });
    } catch (err: any) {
      console.error("[monitoring] run error:", err);
      res.status(500).json({ error: err?.message || "Internal error" });
    }
  });

  // Admin: send a test email.
  router.post("/api/monitoring/test-email", requireAdmin, async (_req, res) => {
    const result = await sendTestEmail();
    res.json(result);
  });

  return router;
}
