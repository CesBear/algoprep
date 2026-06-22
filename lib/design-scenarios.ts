export interface DesignScenario {
  name: string
  tag: "commonly-cited" | "SDET-niche"
  requirements: string[]
  components: string[]
  tradeoffs: string[]
  sdetAngle: string
}

const scenarios: DesignScenario[] = [
  {
    name: "Design a URL Shortener",
    tag: "commonly-cited",
    requirements: [
      "Shorten a long URL into a short alias",
      "Redirect alias -> original URL with low latency",
      "~100M new URLs/day, read:write ratio roughly 100:1",
    ],
    components: [
      "Base62 counter or hash-based ID generator",
      "Key-value store mapping alias -> original URL",
      "Cache in front of the store for hot redirects",
      "CDN/edge layer for the read (redirect) path",
    ],
    tradeoffs: [
      "Counter-based IDs are collision-free but sequential/guessable; hash-based IDs need collision checks",
      "Custom aliases require a uniqueness check that adds write latency",
    ],
    sdetAngle:
      "Test for alias collisions under concurrent writes, verify redirect status codes (301 vs 302) and what happens to cache/CDN entries when a URL is updated or deleted.",
  },
  {
    name: "Design a Rate Limiter",
    tag: "commonly-cited",
    requirements: [
      "Limit requests per user/IP/API key to N per time window",
      "Add minimal latency to the request path",
      "Work correctly across multiple service instances",
    ],
    components: [
      "Token bucket or sliding-window-counter algorithm (the page's template above implements token bucket)",
      "Centralized store (e.g. Redis) for cross-instance shared state",
      "Local in-memory fallback if the store is unreachable",
    ],
    tradeoffs: [
      "Fixed window is simplest but allows bursts at window edges; sliding window is smoother but costs more memory/compute",
      "A centralized store adds a network hop and a new failure mode unless replicated",
    ],
    sdetAngle:
      "Test exact-boundary behavior at the window edge, simulate bursty traffic, and verify whether the system fails open or fails closed when the rate-limit store itself is down — that's a real design decision worth probing in the interview.",
  },
  {
    name: "Design a Notification System",
    tag: "commonly-cited",
    requirements: [
      "Send push/email/SMS notifications on backend events",
      "At-least-once delivery",
      "Respect per-user, per-channel preferences and rate limits",
    ],
    components: [
      "Message queue decoupling event producers from delivery workers",
      "Per-channel delivery workers calling provider APIs (push/email/SMS)",
      "Idempotency/dedup layer keyed by event id",
      "Retry with backoff + dead-letter queue for permanent failures",
    ],
    tradeoffs: [
      "At-least-once delivery implies duplicates are possible, so downstream idempotency is required, not optional",
      "Synchronous delivery is simpler to reason about but couples user-facing latency to a third-party provider's latency",
    ],
    sdetAngle:
      "Test idempotency by forcing duplicate event ids through retries, test dead-letter-queue draining, and verify a slow/down provider on one channel doesn't block delivery on the others.",
  },
  {
    name: "Design a Distributed Cache",
    tag: "commonly-cited",
    requirements: [
      "Low-latency key-value lookups",
      "Scale horizontally as data volume grows",
      "Tolerate node failure without losing all cached data",
    ],
    components: [
      "Consistent hashing to map keys to nodes",
      "Replication factor to tolerate node loss without a full cache-cold start (caches are best-effort, not a durable store)",
      "Per-node eviction policy (LRU/LFU)",
      "Client library handling node discovery and retries",
      "Cache-aside is the typical default (app manages misses); write-through trades higher write latency for reads that are never stale",
    ],
    tradeoffs: [
      "More replicas reduce the blast radius of node loss but increase write cost and the staleness window between replicas",
      "Consistent hashing minimizes key remapping on node add/remove, at the cost of virtual-node bookkeeping",
    ],
    sdetAngle:
      "Test cache-stampede behavior (many clients missing the same key simultaneously), test correctness during a live rebalance/node-add event, and fuzz the access pattern to stress the eviction policy under memory pressure.",
  },
  {
    name: "Design a CI Test-Execution Platform",
    tag: "SDET-niche",
    requirements: [
      "Run thousands of test suites per commit across many repos",
      "Parallelize execution across a worker pool",
      "Report pass/fail and flaky status back to the PR within minutes",
    ],
    components: [
      "Job scheduler/queue distributing test shards to workers",
      "Result aggregator with a historical results store",
      "Flaky-test detector feeding back into scheduling priority",
      "Build-artifact/dependency cache shared across runs",
    ],
    tradeoffs: [
      "More parallel shards reduce wall-clock time but increase contention on shared resources (test DBs, network mocks) and infra cost",
      "Caching build artifacts speeds up runs but risks false pass/fail results if cache invalidation is wrong",
    ],
    sdetAngle:
      "This scenario IS the SDET angle — center the answer on test isolation, hermetic environments, and instrumenting the platform itself (queue depth, p95 time-to-feedback per PR).",
  },
  {
    name: "Design a Flaky-Test Detection System",
    tag: "SDET-niche",
    requirements: [
      "Identify tests that pass/fail nondeterministically across reruns of the same commit",
      "Avoid blocking releases on flaky failures while still catching real regressions",
      "Surface a ranked list of the flakiest tests to their owners",
    ],
    components: [
      "Historical run-result store keyed by (test, commit, environment)",
      "Flakiness scorer — e.g. rolling failure rate, or a rerun-on-fail signal",
      "Auto-quarantine mechanism to exclude known-flaky tests from blocking merges",
      "Dashboard/alerting for test owners",
    ],
    tradeoffs: [
      "Auto-quarantine reduces noise but can mask a real regression if the scoring threshold is too aggressive",
      "Rerun-on-fail improves signal quality but roughly doubles CI cost for tests that are already flaky",
    ],
    sdetAngle:
      "Make the statistical reasoning explicit: how many reruns justify calling something 'flaky' rather than 'a real regression that happens to fail 100% of the time on this commit'? That distinction is what separates a strong SDET answer from a generic one.",
  },
]

export default scenarios
