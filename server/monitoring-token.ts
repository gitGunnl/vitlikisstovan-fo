import { randomBytes } from "crypto";

const NONCE_TTL_MS = 10 * 60 * 1000;

interface NonceEntry {
  ip: string;
  expiresAt: number;
}

const nonceStore = new Map<string, NonceEntry>();

function pruneExpired(): void {
  const now = Date.now();
  for (const [k, v] of nonceStore) {
    if (v.expiresAt <= now) nonceStore.delete(k);
  }
}

export function issueToken(ip: string): string {
  pruneExpired();
  if (nonceStore.size >= 10_000) {
    throw new Error("Nonce store at capacity");
  }
  const nonce = randomBytes(16).toString("hex");
  nonceStore.set(nonce, { ip, expiresAt: Date.now() + NONCE_TTL_MS });
  return nonce;
}

export function validateAndConsumeToken(token: unknown, ip: string): boolean {
  if (typeof token !== "string" || !/^[0-9a-f]{32}$/i.test(token)) return false;
  const key = token.toLowerCase();
  const entry = nonceStore.get(key);
  if (!entry) return false;
  if (entry.expiresAt <= Date.now()) {
    nonceStore.delete(key);
    return false;
  }
  if (entry.ip !== ip) return false;
  nonceStore.delete(key);
  return true;
}
