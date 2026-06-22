import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/arrays"

export default function ArraysPage() {
  const problems = [
    { name: "Two Sum",                              diff: "Easy",   tags: ["hash map", "array"],       href: "https://leetcode.com/problems/two-sum/" },
    { name: "Best Time to Buy and Sell Stock",      diff: "Easy",   tags: ["greedy", "one pass"],      href: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { name: "Contains Duplicate",                   diff: "Easy",   tags: ["hash set"],                href: "https://leetcode.com/problems/contains-duplicate/" },
    { name: "Maximum Subarray (Kadane's)",          diff: "Medium", tags: ["dp", "greedy"],            href: "https://leetcode.com/problems/maximum-subarray/" },
    { name: "Maximum Product Subarray",             diff: "Medium", tags: ["dp", "kadane variant"],    href: "https://leetcode.com/problems/maximum-product-subarray/" },
    { name: "Product of Array Except Self",         diff: "Medium", tags: ["prefix", "suffix"],        href: "https://leetcode.com/problems/product-of-array-except-self/" },
    { name: "Sort Colors",                          diff: "Medium", tags: ["two pointers", "dutch flag"], href: "https://leetcode.com/problems/sort-colors/" },
    { name: "Find Minimum in Rotated Sorted Array", diff: "Medium", tags: ["binary search"],           href: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { name: "Search in Rotated Sorted Array",       diff: "Medium", tags: ["binary search"],           href: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { name: "3Sum",                                 diff: "Medium", tags: ["two pointers", "sort"],    href: "https://leetcode.com/problems/3sum/" },
    { name: "Container With Most Water",            diff: "Medium", tags: ["two pointers"],            href: "https://leetcode.com/problems/container-with-most-water/" },
    { name: "Trapping Rain Water",                  diff: "Hard",   tags: ["two pointers"],            href: "https://leetcode.com/problems/trapping-rain-water/" },
  ]

  const prefixSumCode = `<span class="kw">function</span> <span class="fn">prefixSum</span>(arr: number[]): number[] {
  <span class="kw">const</span> pre = <span class="kw">new</span> Array(arr.length + <span class="num">1</span>).fill(<span class="num">0</span>);
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++)
    pre[i + <span class="num">1</span>] = pre[i] + arr[i];
  <span class="kw">return</span> pre;
}

<span class="cm">// Sum of arr[l..r] inclusive → O(1)</span>
<span class="kw">const</span> rangeSum = pre[r + <span class="num">1</span>] - pre[l];`

  return (
    <div>
      <div className="page-eyebrow">Linear Structures</div>
      <h1 className="page-title">Arrays</h1>
      <p className="page-desc">
        The most fundamental data structure. Contiguous memory, O(1) access by index — which is exactly
        why you can scan once and remember running totals or boundaries instead of rescanning. That single
        idea is the root of prefix sums, sliding window, and two-pointer patterns.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Operations Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["Access by index",   "O(1)",    "Random access"],
                ["Search (unsorted)", "O(n)",    "Linear scan"],
                ["Search (sorted)",   "O(log n)","Binary search"],
                ["Insert at end",     "O(1)",    "Amortized (dynamic)"],
                ["Insert at index",   "O(n)",    "Shift elements"],
                ["Delete at end",     "O(1)",    ""],
                ["Delete at index",   "O(n)",    "Shift elements"],
              ].map(([op, t, n]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={t === "O(1)" || t === "O(log n)" ? "time-good" : "time-ok"}>{t}</td>
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
              ["Prefix Sum",    "pre[i+1] = pre[i] + arr[i] (padded). Subarray sum O(1) after O(n) build."],
              ["Two Pointers",  "Move two indices inward by a comparison rule. Needs sorted order for value/sum targeting (3Sum) — but works on unsorted data too when the rule is structural, not value-based (Container With Most Water)."],
              ["Sliding Window","Fixed or variable window. O(n) for subarray problems."],
              ["Kadane's Algo", "At each index, either extend the running sum or restart here — a negative running sum never helps later, so drop it. Don't clamp to 0: if every number is negative, the answer is the least-negative single element."],
              ["Dutch Flag",    "3-way partition (0s, 1s, 2s) in one pass. See Sort Colors below."],
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
        <div className="card-title">Template — Prefix Sum</div>
        <CodeBlock html={prefixSumCode} />
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>Trace:</strong> arr=[2,4,1,5,3] → pre=[0,2,6,7,12,15]. Sum of
          arr[1..3] = 4+1+5 = 10, check pre[4]-pre[1] = 12-2 = 10. Padding pre with a leading 0 means pre[l]
          is &quot;sum before index l&quot; — no special case needed when l=0.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Kadane&apos;s — Maximum Subarray</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              nums=[-2,1,-3,4,-1,2,1,-5,4]. cur starts at -2. At i=1, max(1, -2+1=-1)=1 → resets (the prior sum was
              hurting). At i=3, max(4, -2+4=2)=4 → resets again. From there it only grows: 3→5→6 (best=6 here)→1→5.
              Final best=6, captured at i=6 even though cur dips after.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>3Sum</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              nums=[-1,0,1,2,-1,-4]. Sort → [-4,-1,-1,0,1,2]. Fix i=1 (-1): lo=2,hi=5 → -1+(-1)+2=0, match [-1,-1,2];
              lo++ → lo=3,hi=4 → -1+0+1=0, match [-1,0,1]. i=2 is skipped entirely because nums[2]===nums[1]
              (both -1) — that&apos;s the dedup check earning its keep.
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
