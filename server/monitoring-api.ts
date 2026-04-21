import { Router, json } from "express";
import { runAllChecks, runCheck, getMonitoringSnapshot } from "./monitoring.js";
import { recordClientFailure } from "./monitoring-storage.js";
import { MONITORED_FORMS, CLIENT_FORM_SOURCES } from "./monitoring-config.js";
import { getMailerStatus, sendTestEmail } from "./monitoring-mailer.js";

const ADMIN_KEY = process.env.ELECTION_ADMIN_KEY || "vitliki-admin-2026";

function requireAdmin(req: any, res: any, next: any) {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
  next();
}

export function createMonitoringRouter(): Router {
  const router = Router();
  router.use(json({ limit: "10kb" }));

  // Public-ish: accepts client failure beacons. Rate-limit-light: capped storage.
  router.post("/api/monitoring/client-failure", (req, res) => {
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
