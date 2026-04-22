import { Router, json } from "express";
import { isClientFormSource } from "./monitoring-config.js";
import { processClientFailure } from "./monitoring.js";
import { issueToken, validateAndConsumeToken } from "./monitoring-token.js";

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

  // Strict rate limit for token issuance: 1 token per 2 minutes per IP.
  // This means triggering the 3-beacon alert threshold requires at minimum
  // 6 minutes of sustained effort from a single IP, while real browsers
  // only need one token per page-load failure event.
  // NOTE: In deployments where remoteAddress resolves to a shared upstream
  // proxy or large NAT, this limit is applied per-proxy rather than per
  // end-user. Monitor 429 rates on this endpoint post-deploy and relax the
  // refill rate (TOKEN_REFILL_PER_MS) if legitimate users are throttled.
  const tokenBuckets = new Map<string, { tokens: number; refilledAt: number }>();
  const TOKEN_MAX = 1;
  const TOKEN_REFILL_PER_MS = 1 / (2 * 60_000);
  function tokenRateLimit(ip: string): boolean {
    const now = Date.now();
    const b = tokenBuckets.get(ip) ?? { tokens: TOKEN_MAX, refilledAt: now };
    b.tokens = Math.min(TOKEN_MAX, b.tokens + (now - b.refilledAt) * TOKEN_REFILL_PER_MS);
    b.refilledAt = now;
    if (b.tokens < 1) {
      tokenBuckets.set(ip, b);
      return false;
    }
    b.tokens -= 1;
    tokenBuckets.set(ip, b);
    if (tokenBuckets.size > 5000) {
      for (const [k, v] of tokenBuckets) {
        if (now - v.refilledAt > 30 * 60_000) tokenBuckets.delete(k);
      }
    }
    return true;
  }

  // Issues a one-time-use nonce bound to the requesting IP address.
  // Nonces expire after 10 minutes and are consumed on first use, so they
  // cannot be replayed or shared across requests.
  router.get("/api/monitoring/client-token", (req, res) => {
    const ip = req.socket.remoteAddress || "unknown";
    if (!tokenRateLimit(ip)) {
      return res.status(429).json({ error: "Too many token requests" });
    }
    try {
      const token = issueToken(ip);
      res.json({ token });
    } catch (err) {
      console.error("[monitoring] Token issuance error:", err);
      res.status(503).json({ error: "Token unavailable" });
    }
  });

  // Public endpoint: receives client-side beacons when a real form submission throws.
  // Requires a valid one-time-use token issued to the same IP by /api/monitoring/client-token.
  router.post("/api/monitoring/client-failure", async (req, res) => {
    const ip = req.socket.remoteAddress || "unknown";
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: "Too many reports" });
    }
    const { source, errorName, errorMessage, monitoringToken } = req.body || {};
    if (!validateAndConsumeToken(monitoringToken, ip)) {
      return res.status(403).json({ error: "Invalid or missing token" });
    }
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
