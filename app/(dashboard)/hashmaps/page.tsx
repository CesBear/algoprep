import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/hashmaps"

export default function HashmapsPage() {
  const problems = [
    { name: "Two Sum",                    diff: "Easy",   tags: ["hash map"],                  href: "https://leetcode.com/problems/two-sum/" },
    { name: "Valid Anagram",              diff: "Easy",   tags: ["hash map"],                  href: "https://leetcode.com/problems/valid-anagram/" },
    { name: "Contains Duplicate",         diff: "Easy",   tags: ["hash set"],                  href: "https://leetcode.com/problems/contains-duplicate/" },
    { name: "Subarray Sum Equals K",      diff: "Medium", tags: ["prefix sum", "hash map"],    href: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { name: "Group Anagrams",             diff: "Medium", tags: ["hash map", "sort"],          href: "https://leetcode.com/problems/group-anagrams/" },
    { name: "Top K Frequent Elements",    diff: "Medium", tags: ["hash map", "heap"],          href: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { name: "Longest Consecutive Sequence",diff:"Medium", tags: ["hash set", "sequence"],      href: "https://leetcode.com/problems/longest-consecutive-sequence/" },
    { name: "Encode & Decode Strings",     diff: "Medium", tags: ["hash map", "premium"],      href: "https://leetcode.com/problems/encode-and-decode-strings/" },
    { name: "LRU Cache",                  diff: "Medium", tags: ["hash map", "doubly LL"],     href: "https://leetcode.com/problems/lru-cache/" },
    { name: "LFU Cache",                  diff: "Hard",   tags: ["hash map", "design"],        href: "https://leetcode.com/problems/lfu-cache/" },
  ]

  const prefixCode = `<span class="cm">// Count subarrays with sum == k  →  O(n)</span>
<span class="kw">function</span> <span class="fn">subarraySum</span>(nums: number[], k: number): number {
  <span class="kw">let</span> count = <span class="num">0</span>, prefix = <span class="num">0</span>;
  <span class="kw">const</span> seen = <span class="kw">new</span> Map&lt;number, number&gt;();
  seen.set(<span class="num">0</span>, <span class="num">1</span>);  <span class="cm">// prefix_sum → frequency</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    prefix += n;
    count += seen.get(prefix - k) ?? <span class="num">0</span>;
    seen.set(prefix, (seen.get(prefix) ?? <span class="num">0</span>) + <span class="num">1</span>);
  }
  <span class="kw">return</span> count;
}`

  return (
    <div>
      <div className="page-eyebrow">Linear Structures</div>
      <h1 className="page-title">Hash Maps & Sets</h1>
      <p className="page-desc">
        A hash function turns a key into an array index in O(1), so a lookup is really just
        array access with a translation step — that&apos;s the whole trick behind O(1) average
        lookup/insert/delete, and the #1 tool for cutting brute-force O(n²) solutions to O(n):
        trade the space for a map and stop re-scanning.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Operations Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Avg</th><th>Worst</th></tr></thead>
            <tbody>
              {[
                ["Insert",  "O(1)", "O(n)"],
                ["Delete",  "O(1)", "O(n)"],
                ["Lookup",  "O(1)", "O(n)"],
                ["Iterate", "O(n)", "O(n)"],
              ].map(([op, avg, worst]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className="time-good">{avg}</td>
                  <td className="time-ok">{worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            Worst case on hash collision (all keys → same bucket).
            Python dict / Java HashMap use chaining. In practice this is rare —
            engines resize and rehash as the map grows, keeping buckets small.
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--text)" }}>Map vs. object vs. Set:</strong> use{" "}
            <code>Map</code> over a plain object — any key type, no prototype collisions,
            preserves insertion order; use <code>Set</code> when you only need membership,
            not a value. Watch out: <code>Map</code> keys compare objects/arrays by reference,
            not contents — <code>new Map().set([1,2],&apos;x&apos;).get([1,2])</code> is{" "}
            <code>undefined</code>, and mutating an object after it&apos;s used as a key can
            silently break lookups. That&apos;s why Group Anagrams below sorts each string into
            a stable string key instead of using the array of characters directly.
            <br /><br />
            <code>Set</code> preserves insertion order the same way <code>Map</code> does — LFU
            Cache below uses a <code>Set</code> per frequency bucket so the first key in a bucket
            is always that bucket&apos;s least-recently-used, without a manual linked list.
          </div>
        </div>

        <div className="card">
          <div className="card-title">When to Use</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Complement lookup",   "Two Sum pattern: store seen values, check if target-x exists."],
              ["Frequency count",     "Count chars/nums, then query. Anagram, Top-K problems."],
              ["Seen / Visited",      "Hash set as O(1) visited marker. Cycle detection, dedup."],
              ["Prefix sum + map",    "Running sum as a key, frequency as the value. Same (sum - k) seen before means a subarray between the two points sums to k."],
              ["Grouping",            "Map key→list. Group anagrams, intervals by property."],
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
        <div className="card-title">Template — Prefix Sum + Hash Map</div>
        <CodeBlock html={prefixCode} />
        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, marginTop: 12 }}>
          <strong style={{ color: "var(--text)" }}>Trace:</strong> nums=[1,2,3], k=3. n=1: prefix=1,
          seen.get(1-3=-2) is missing → count+=0; seen.set(1,1). n=2: prefix=3, seen.get(3-3=0)=1 —
          that&apos;s the seed <code>seen.set(0,1)</code>, meaning &quot;a prefix of exactly 0 happened
          once (before anything ran)&quot; → count+=1 (subarray [1,2]); seen.set(3,1). n=3: prefix=6,
          seen.get(6-3=3)=1 (the prefix=3 from the previous step) → count+=1 (subarray [3]); seen.set(6,1).
          Final count=2. The seed at key 0 exists so a subarray starting at index 0 can be counted too —
          without it, a prefix that equals k exactly would never match anything.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Practice Problems</div>
        <ProblemList problems={problems} solutions={solutions} />
      </div>
    </div>
  )
}
