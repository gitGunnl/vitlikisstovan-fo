import { Router, json } from "express";
import { isClientFormSource } from "./monitoring-config.js";
import { processClientFailure } from "./monitoring.js";

export function createMonitoringRouter(): Router {
  const router = Router();
  router.use(json({ limit: "10kb" }));

  // Token-bucket rate limit per IP (10 reports / minute / IP).
  const buckets = new Map<string, { tokens: number; refilledAt: number }>();
  const MAX_TOKENS = 10;
  const REFILL_PER_MS = 10 / 60_000;
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

  // Public endpoint: receives client-side beacons when a real form submission throws.
  router.post("/api/monitoring/client-failure", async (req, res) => {
    const ip =
      (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many reports" });
    }
    const { source, errorName, errorMessage } = req.body || {};
    if (!isClientFormSource(source)) {
      return res.status(400).json({ error: "Invalid source" });
    }
    const userAgentHeader = req.headers["user-agent"];
    const userAgent =
      typeof userAgentHeader === "string" ? userAgentHeader.slice(0, 300) : undefined;
    // Respond immediately so the beacon is fast; alert pipeline runs after.
    res.json({ ok: true });
    processClientFailure(source, {
      errorName: typeof errorName === "string" ? errorName.slice(0, 200) : undefined,
      errorMessage: typeof errorMessage === "string" ? errorMessage.slice(0, 500) : undefined,
      userAgent,
    }).catch((err) => {
      console.error("[monitoring] processClientFailure error:", err);
    });
  });

  return router;
}
