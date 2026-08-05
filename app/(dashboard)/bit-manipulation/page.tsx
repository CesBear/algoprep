import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/bit-manipulation"

export default function BitManipulationPage() {
  const problems = [
    { name: "Single Number",        diff: "Easy",   tags: ["xor"],                href: "https://leetcode.com/problems/single-number/" },
    { name: "Number of 1 Bits",     diff: "Easy",   tags: ["kernighan's"],        href: "https://leetcode.com/problems/number-of-1-bits/" },
    { name: "Counting Bits",        diff: "Easy",   tags: ["dp", "bit trick"],    href: "https://leetcode.com/problems/counting-bits/" },
    { name: "Missing Number",       diff: "Easy",   tags: ["xor"],                href: "https://leetcode.com/problems/missing-number/" },
    { name: "Reverse Bits",         diff: "Easy",   tags: ["bit manipulation"],   href: "https://leetcode.com/problems/reverse-bits/" },
    { name: "Sum of Two Integers",  diff: "Medium", tags: ["bitwise add"],        href: "https://leetcode.com/problems/sum-of-two-integers/" },
    { name: "Reverse Integer",      diff: "Medium", tags: ["math", "overflow"],   href: "https://leetcode.com/problems/reverse-integer/" },
  ]

  const kernighanCode = `<span class="kw">function</span> <span class="fn">hammingWeight</span>(n: number): number {
  <span class="kw">let</span> count = <span class="num">0</span>;
  <span class="kw">while</span> (n !== <span class="num">0</span>) {
    n &amp;= n - <span class="num">1</span>; <span class="cm">// clears the lowest set bit</span>
    count++;
  }
  <span class="kw">return</span> count;
}`

  return (
    <div>
      <div className="page-eyebrow">Core Techniques</div>
      <h1 className="page-title">Bit Manipulation</h1>
      <p className="page-desc">
        Operates on a number&apos;s binary representation directly — O(1) per bit, no allocation.
        Two ideas cover most interview problems: XOR&apos;s self-cancelling property (great for
        finding an unpaired or missing value without extra memory), and Brian Kernighan&apos;s
        trick for walking only the <em>set</em> bits instead of all 32.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["XOR all elements",              "O(n)",   "Single Number, Missing Number"],
                ["Count set bits (naive)",        "O(32)",  "Check every bit position"],
                ["Count set bits (Kernighan's)",  "O(k)",   "k = number of set bits"],
                ["Reverse / build 32 bits",       "O(32)",  "Fixed-width loop, treated as O(1)"],
                ["Bitwise add (getSum)",          "O(32)",  "Carry propagates at most 32 times"],
              ].map(([op, t, n]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={t === "O(n)" ? "time-good" : "time-ok"}>{t}</td>
                  <td style={{ color: "var(--muted)", fontSize: 11 }}>{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">Key Techniques</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["XOR properties",     "a^a=0 and a^0=a, and XOR is commutative/associative — order doesn't matter, so every paired-up value cancels and only the odd one out survives."],
              ["Brian Kernighan's",  "n & (n-1) drops the lowest set bit. Looping until n=0 costs O(popcount), not O(bit-width) — faster whenever the number is sparse."],
              ["Masks & shifts",     "Read bit i: (n >> i) & 1. Set bit i: n | (1 << i). Clear bit i: n & ~(1 << i)."],
              ["Unsigned shift",     "n >>> k shifts in zeros regardless of sign; n >> k sign-extends. Use >>> when you're treating the value as a raw 32-bit pattern, not a signed number."],
              ["Two's complement",   "JS bitwise ops coerce operands to 32-bit signed ints. res >>> 0 forces an unsigned reading; res | 0 forces a signed one back to range."],
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
        <div className="card-title">Template — Brian Kernighan&apos;s Bit Count</div>
        <CodeBlock html={kernighanCode} />
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>Trace:</strong> n=13 (binary 1101). n &amp;= n-1:
          13 &amp; 12 (1101 &amp; 1100) = 1100 = 12, count=1. n &amp;= n-1: 12 &amp; 11
          (1100 &amp; 1011) = 1000 = 8, count=2. n &amp;= n-1: 8 &amp; 7 (1000 &amp; 0111) =
          0000 = 0, count=3, loop ends. Three iterations — one per set bit in 1101 — instead of
          checking all 32 positions.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Single Number</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              nums=[4,1,2,1,2]. res=0^4=4, 4^1=5, 5^2=7, 7^1=6, 6^2=4. Every value that appears
              twice XORs itself back to 0 at some point along the way (order doesn&apos;t matter
              because XOR is commutative) — only the unpaired 4 survives.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Missing Number</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              nums=[3,0,1] (n=3, expected range 0..3). Start res=3 (=n). i=0: res ^= 0^3 → 3^3=0.
              i=1: res ^= 1^0 → 0^1=1. i=2: res ^= 2^1 → 1^3=2. Final res=2 — every index and every
              present value cancels in pairs, leaving the one index (2) that never had a matching
              value in nums.
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Practice Problems</div>
        <ProblemList problems={problems} solutions={solutions} />
      </div>
    </div>
  )
}
