// In-memory sliding-window rate limiter. Module-scoped Map of timestamp lists,
// keyed by an arbitrary identifier (we use client IP). Each call prunes expired
// entries for the key and either records a new submission or returns ok:false.
//
// Limitations (acceptable for a low-traffic marketing contact form):
//   - Cold-start amnesia: serverless containers reset the Map on each cold
//     start, so a fresh container resets the bucket.
//   - Multi-instance non-coherence: behind a load balancer with N instances,
//     an attacker effectively gets N x limit total.
//   - x-forwarded-for trust depends on the host stripping/rewriting untrusted
//     hops. Vercel and most managed hosts do this; bare nginx may not.
//
// Upgrade path: swap the implementation for @upstash/ratelimit (Redis-backed,
// coherent across instances). The exported signature should stay the same so
// callers don't change.

const buckets = new Map<string, number[]>();

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterMs: number };

export function checkRateLimit(
  key: string,
  limit = 3,
  windowMs = 10 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const fresh = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (fresh.length >= limit) {
    const oldest = fresh[0];
    return { ok: false, retryAfterMs: windowMs - (now - oldest) };
  }

  fresh.push(now);
  buckets.set(key, fresh);
  return { ok: true };
}
