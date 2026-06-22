import CodeBlock from "@/components/CodeBlock"
import DesignScenarios from "@/components/DesignScenarios"
import scenarios from "@/lib/design-scenarios"

export default function SystemDesignPage() {
  const tokenBucketCode = `<span class="kw">function</span> <span class="fn">createTokenBucket</span>(capacity: number, refillPerSec: number) {
  <span class="kw">let</span> tokens = capacity;
  <span class="kw">let</span> last = Date.now();

  <span class="kw">return</span> <span class="kw">function</span> <span class="fn">allow</span>(): boolean {
    <span class="kw">const</span> now = Date.now();
    tokens = Math.min(capacity, tokens + ((now - last) / <span class="num">1000</span>) * refillPerSec);
    last = now;
    <span class="kw">if</span> (tokens &lt; <span class="num">1</span>) <span class="kw">return</span> <span class="kw">false</span>;
    tokens -= <span class="num">1</span>;
    <span class="kw">return</span> <span class="kw">true</span>;
  };
}

<span class="cm">// O(1) per check — state is just two numbers per client/key</span>
<span class="kw">const</span> allow = createTokenBucket(<span class="num">10</span>, <span class="num">2</span>); <span class="cm">// burst 10, refill 2/sec</span>`

  return (
    <div>
      <div className="page-eyebrow">System Design</div>
      <h1 className="page-title">System Design</h1>
      <p className="page-desc">
        Almost every system-design problem has the same shape: figure out the read/write ratio,
        consistency needs, and scale first — the components mostly pick themselves once you know
        that. System design rounds test how you reason about scale, trade-offs, and failure, not
        memorized diagrams. As an SDET, lean into testability and observability: explicitly
        discussing how you&apos;d test and monitor a design is often your strongest signal in this round.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Core Building Blocks</div>
          <table className="complexity-table">
            <thead><tr><th>Component</th><th>Purpose</th><th>Trade-off</th></tr></thead>
            <tbody>
              {[
                ["Load Balancer", "Distribute traffic across servers", "Round robin vs least-connections vs consistent hashing"],
                ["Cache (Redis/Memcached)", "Reduce read latency, offload the DB", "Invalidation is the hard part — staleness vs complexity"],
                ["CDN", "Serve static assets close to users", "Doesn't help personalized/dynamic data"],
                ["SQL Database", "Strong consistency, relations, transactions", "Harder to horizontally scale (though Vitess/CockroachDB/Spanner-style systems narrow this gap)"],
                ["NoSQL Database", "Horizontal scale, flexible schema", "Weaker consistency guarantees"],
                ["Message Queue", "Decouple producers/consumers, absorb spikes", "Adds eventual consistency and operational overhead"],
                ["Sharding", "Split data horizontally across nodes for scale — vertical scaling (a bigger box) is simpler but hits a hardware ceiling and stays a single point of failure", "Cross-shard queries/joins get expensive"],
                ["Replication", "Copies of data for availability and read scale", "Replica lag and failover complexity"],
              ].map(([c, p, t]) => (
                <tr key={c}>
                  <td className="op">{c}</td>
                  <td>{p}</td>
                  <td style={{ color: "var(--muted)", fontSize: 11 }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            Default to SQL unless you have a specific reason not to — the access pattern is pure
            key-value, or write volume genuinely can&apos;t fit one (shardable) box. &quot;NoSQL
            scales better&quot; isn&apos;t by itself a justification in an interview; you still
            have to name the access pattern that needs it.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Key Patterns / Talking Points</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["CAP Theorem", "Only constrains you during an actual network partition — pick consistency or availability for that window. Outside a partition you get both; it's not a permanent architecture choice."],
              ["Back-of-Envelope Estimation", "QPS, storage, bandwidth math before designing. Interviewers grade the process, not just the number — see the worked example below."],
              ["Consistent Hashing", "Add/remove nodes with minimal key remapping. Used in caches and sharded stores."],
              ["Rate Limiting", "Token bucket allows controlled bursts up to the bucket size; leaky bucket smooths output to a constant rate; sliding-window counters avoid the fixed-window edge-burst exploit."],
              ["Caching Strategy", "Cache-aside: app manages both, stale until the next read-miss. Write-through: write hits cache+DB together, no staleness but slower writes. Write-back: write hits cache only, fast but risks loss on a cache crash."],
              ["Idempotency", "Dedup retried requests with idempotency keys — required wherever retries exist."],
              ["Observability", "Logs, metrics, traces. As an SDET, this is your strongest differentiator in this round."],
              ["Testability in Design", "Contract tests at service boundaries, feature flags, canary releases, chaos-testing hooks."],
            ].map(([name, desc]) => (
              <div key={name} className="pattern-chip">
                <div className="pattern-chip-name">{name}</div>
                <div className="pattern-chip-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Template — Token Bucket Rate Limiter</div>
        <CodeBlock html={tokenBucketCode} />
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
          <strong style={{ color: "var(--text)" }}>Trace:</strong> capacity=10, refill=2/sec.
          A burst of 10 calls in quick succession (elapsed≈0, no refill between them) all
          succeed, tokens→0. Call #11 immediately after: tokens still 0 (&lt;1) → rejected. Wait
          1 second: tokens refills to min(10, 0+1×2)=2 → the next 2 calls succeed, tokens→0, and
          the 3rd is rejected again until more time passes.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Estimate — Back-of-the-Envelope, URL Shortener</div>
        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
          Inputs from the scenario below: ~100M new URLs/day, read:write ≈ 100:1.
          <br /><br />
          <strong style={{ color: "var(--text)" }}>Write QPS:</strong> 100,000,000 ÷ 86,400 sec/day
          ≈ 1,157 writes/sec average.
          <br />
          <strong style={{ color: "var(--text)" }}>Read QPS:</strong> 1,157 × 100 ≈ 116,000
          reads/sec average. (State this explicitly as an <em>average</em> — interviewers expect
          you to separately note that peak traffic is commonly modeled as several times the
          average, not to invent a precise peak multiplier as fact.)
          <br /><br />
          <strong style={{ color: "var(--text)" }}>Storage:</strong> assume ~500 bytes per record
          (short code + original URL + metadata). 100M/day × 500 bytes = 50 GB/day. Over 5 years:
          50 GB × 365 × 5 ≈ 91 TB total.
          <br /><br />
          The number itself rarely matters — what interviewers are grading is whether you convert
          units correctly, separate average from peak, and state your assumptions out loud (record
          size, retention window) before computing anything.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Practice Scenarios</div>
        <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12, lineHeight: 1.6 }}>
          <span style={{ color: "#22c55e" }}>commonly-cited</span> = a documented staple of public system-design
          interview prep (Grokking the System Design Interview, ByteByteGo, etc.).{" "}
          <span style={{ color: "#c4b5fd" }}>SDET-niche</span> = realistic for test-infra/SDET-focused loops, but not
          a universally-documented public staple — treat as informed judgment, not a verified frequency claim.
        </p>
        <DesignScenarios scenarios={scenarios} />
      </div>
    </div>
  )
}
