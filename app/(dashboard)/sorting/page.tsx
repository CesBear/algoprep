import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/sorting"

export default function SortingPage() {
  const problems = [
    { name: "Sort Colors (Dutch Flag)",         diff: "Medium", tags: ["3-way partition"],      href: "https://leetcode.com/problems/sort-colors/" },
    { name: "Merge Intervals",                  diff: "Medium", tags: ["sort", "greedy"],       href: "https://leetcode.com/problems/merge-intervals/" },
    { name: "Meeting Rooms II",                 diff: "Medium", tags: ["sort", "heap"],         href: "https://leetcode.com/problems/meeting-rooms-ii/" },
    { name: "Insert Interval",                  diff: "Medium", tags: ["intervals"],            href: "https://leetcode.com/problems/insert-interval/" },
    { name: "Non-overlapping Intervals",        diff: "Medium", tags: ["intervals", "greedy"],  href: "https://leetcode.com/problems/non-overlapping-intervals/" },
    { name: "Meeting Rooms",                    diff: "Easy",   tags: ["intervals", "premium"], href: "https://leetcode.com/problems/meeting-rooms/" },
    { name: "Largest Number",                   diff: "Medium", tags: ["custom comparator"],    href: "https://leetcode.com/problems/largest-number/" },
    { name: "Kth Largest Element",              diff: "Medium", tags: ["quickselect", "heap"],  href: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
    { name: "Top K Frequent Elements",          diff: "Medium", tags: ["heap", "bucket sort"],  href: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { name: "Find K Pairs with Smallest Sums",  diff: "Medium", tags: ["heap"],                 href: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/" },
    { name: "Sort a Linked List",               diff: "Medium", tags: ["merge sort"],           href: "https://leetcode.com/problems/sort-list/" },
    { name: "Count of Smaller After Self",      diff: "Hard",   tags: ["merge sort", "BIT"],    href: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
  ]

  const mergeCode = `<span class="cm">// always splits evenly -> hits the O(n log n) floor on every input</span>
<span class="kw">function</span> <span class="fn">mergeSort</span>(arr: number[]): number[] {
  <span class="kw">if</span> (arr.length &lt;= <span class="num">1</span>) <span class="kw">return</span> arr;
  <span class="kw">const</span> mid = arr.length &gt;&gt; <span class="num">1</span>;
  <span class="kw">const</span> L = mergeSort(arr.slice(<span class="num">0</span>, mid));
  <span class="kw">const</span> R = mergeSort(arr.slice(mid));
  <span class="kw">return</span> <span class="fn">merge</span>(L, R);
}

<span class="kw">function</span> <span class="fn">merge</span>(L: number[], R: number[]): number[] {
  <span class="kw">const</span> res: number[] = []; <span class="kw">let</span> i = <span class="num">0</span>, j = <span class="num">0</span>;
  <span class="kw">while</span> (i &lt; L.length &amp;&amp; j &lt; R.length) {  <span class="cm">// L[i]<=R[j] keeps it stable</span>
    <span class="kw">if</span> (L[i] &lt;= R[j]) res.push(L[i++]);
    <span class="kw">else</span>              res.push(R[j++]);
  }
  <span class="kw">return</span> [...res, ...L.slice(i), ...R.slice(j)];  <span class="cm">// every level allocates new arrays -> O(n) space</span>
}`

  const quickSelectCode = `<span class="kw">function</span> <span class="fn">findKthLargest</span>(nums: number[], k: number): number {
  k = nums.length - k; <span class="cm">// kth largest = (n-k)th smallest</span>
  <span class="kw">function</span> <span class="fn">quickSelect</span>(lo: number, hi: number): number {
    <span class="cm">// random pivot avoids O(n) depth/O(n^2) time on sorted/reverse-sorted input</span>
    <span class="kw">const</span> pivotIdx = lo + Math.floor(Math.random() * (hi - lo + <span class="num">1</span>));
    [nums[pivotIdx], nums[hi]] = [nums[hi], nums[pivotIdx]];
    <span class="kw">const</span> pivot = nums[hi]; <span class="kw">let</span> p = lo;
    <span class="kw">for</span> (<span class="kw">let</span> i = lo; i &lt; hi; i++) {
      <span class="kw">if</span> (nums[i] &lt;= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]]; p++;
      }
    }
    [nums[p], nums[hi]] = [nums[hi], nums[p]];  <span class="cm">// p: everything left is <=pivot, right is >pivot</span>
    <span class="kw">if</span>      (p &lt; k) <span class="kw">return</span> <span class="fn">quickSelect</span>(p + <span class="num">1</span>, hi);  <span class="cm">// only recurse the side with k</span>
    <span class="kw">else if</span> (p &gt; k) <span class="kw">return</span> <span class="fn">quickSelect</span>(lo, p - <span class="num">1</span>);
    <span class="kw">return</span> nums[p];
  }
  <span class="kw">return</span> <span class="fn">quickSelect</span>(<span class="num">0</span>, nums.length - <span class="num">1</span>);
}`

  return (
    <div>
      <div className="page-eyebrow">Algorithms</div>
      <h1 className="page-title">Sorting</h1>
      <p className="page-desc">
        Comparison sorts can&apos;t beat O(n log n) — each comparison narrows the n! possible
        orderings by at most half, and log(n!) ≈ n log n. Merge sort always splits evenly, so it
        hits that bound on every input; quicksort&apos;s split size depends on the pivot, and a bad
        pivot (e.g. always <code>nums[hi]</code> on an already-sorted array) splits 1-vs-(n-1)
        every time, degrading to O(n²) — that&apos;s why real quicksorts randomize the pivot.
        Counting/bucket/radix sort skip comparisons entirely and beat the floor, but only work
        when keys are small integers or can be bucketed.
      </p>

      <div className="card">
        <div className="card-title">Algorithm Comparison</div>
        <table className="complexity-table">
          <thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr></thead>
          <tbody>
            {[
              ["Bubble Sort",    "O(n)",       "O(n²)",      "O(n²)",      "O(1)",     "Yes"],
              ["Selection Sort", "O(n²)",      "O(n²)",      "O(n²)",      "O(1)",     "No"],
              ["Insertion Sort", "O(n)",       "O(n²)",      "O(n²)",      "O(1)",     "Yes"],
              ["Merge Sort",     "O(n log n)", "O(n log n)", "O(n log n)", "O(n)",     "Yes"],
              ["Quick Sort",     "O(n log n)", "O(n log n)", "O(n²)",      "O(log n)", "No"],
              ["Heap Sort",      "O(n log n)", "O(n log n)", "O(n log n)", "O(1)",     "No"],
              ["Counting Sort",  "O(n+k)",     "O(n+k)",     "O(n+k)",     "O(k)",     "Yes"],
              ["Radix Sort",     "O(nk)",      "O(nk)",      "O(nk)",      "O(n+k)",   "Yes"],
              ["Tim Sort",       "O(n)",       "O(n log n)", "O(n log n)", "O(n)",     "Yes"],
            ].map(([a, b, avg, w, sp, st]) => (
              <tr key={a}>
                <td className="op">{a}</td>
                <td className={b === "O(n)" || b.startsWith("O(n+") || b === "O(nk)" ? "time-good" : "time-ok"}>{b}</td>
                <td className={avg.includes("n²") ? "time-ok" : "time-good"}>{avg}</td>
                <td className={w.includes("n²") ? "time-bad" : "time-ok"}>{w}</td>
                <td style={{ color: "var(--muted)" }}>{sp}</td>
                <td style={{ color: st === "Yes" ? "var(--easy)" : "var(--muted)" }}>{st}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
          <strong style={{ color: "var(--text)" }}>Stable</strong> = equal elements keep their
          original relative order. Matters when you sort by one key but need ties to preserve a
          previous order — e.g. sort by score, then need same-score entries to stay name-sorted
          from an earlier pass. A single-key sort never exposes an instability bug; it only bites
          on multi-key or re-sort scenarios. Tim Sort is what <code>Array.prototype.sort</code>{" "}
          actually runs in V8 — which is why reaching for <code>.sort()</code> with a comparator
          is usually the right interview move unless you&apos;re explicitly asked to hand-roll an algorithm.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Key Patterns</div>
        <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
          {[
            ["Custom Comparator",  ".sort(...) with a comparator key instead of hand-rolling an algorithm — Largest Number's string-concat order, sorting intervals by start time."],
            ["Non-Comparison Sort","Counting/bucket/radix skip comparisons entirely, beating the O(n log n) floor — but only work when keys are small integers or can be bucketed, like Top K Frequent's bucket-by-frequency below."],
            ["Quickselect (partial sort)", "Only the side of the partition containing k ever recurses — the other side is abandoned unsorted. That's why finding one order statistic averages O(n), not O(n log n)."],
            ["Intervals — sort by start", "Sort intervals by start time, then sweep once comparing each to the running boundary (last merged end, or last kept end). The sort is what turns an O(n²) all-pairs overlap check into a single O(n) pass."],
          ].map(([name, desc]) => (
            <div key={name} className="pattern-chip">
              <div className="pattern-chip-name">{name}</div>
              <div className="pattern-chip-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Template — Merge Sort</div>
          <CodeBlock html={mergeCode} style={{ fontSize: 11 }} />
        </div>
        <div className="card">
          <div className="card-title">Template — Quick Select (Kth Largest)</div>
          <CodeBlock html={quickSelectCode} style={{ fontSize: 11 }} />
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Merge step — combining two already-sorted halves, [1,3] and [2,4]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              i=0,j=0: L[0]=1 &lt;= R[0]=2 → push 1, i=1. i=1,j=0: L[1]=3 &lt;= R[0]=2? No → push 2,
              j=1. i=1,j=1: L[1]=3 &lt;= R[1]=4 → push 3, i=2 (L exhausted). Loop ends; append the
              rest of R: push 4. Result: [1,2,3,4]. Merge never has to look back — both inputs are
              already sorted, so the smaller of the two current fronts is always the next-smallest
              overall.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Quickselect partition — one pass, pivot=4, on [3,7,2,9,4]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              p starts at lo=0. i=0: 3&lt;=4 → swap nums[0] with nums[p=0] (no-op), p=1. i=1: 7&lt;=4?
              No → skip. i=2: 2&lt;=4 → swap nums[2] with nums[p=1] → [3,2,7,9,4], p=2. i=3: 9&lt;=4?
              No → skip. Loop ends; swap the pivot into place: nums[p=2] with nums[hi=4] →
              [3,2,4,9,7]. Pivot 4 now sits at index 2, with everything &lt;=4 to its left ([3,2])
              and everything &gt;4 to its right ([9,7]) — that partition invariant is what lets
              quickselect throw away the side that can&apos;t contain the kth element instead of
              recursing into both.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Non-overlapping Intervals — greedy by end, [1,2],[2,3],[3,4],[1,3]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              Sort by end time: [1,2](end 2), [2,3](end 3), [1,3](end 3), [3,4](end 4). prevEnd=2.
              [2,3]: start 2 &lt; prevEnd 2? No → keep it, prevEnd=3. [1,3]: start 1 &lt; prevEnd 3?
              Yes, overlaps → remove it, count=1, prevEnd unchanged. [3,4]: start 3 &lt; prevEnd 3?
              No → keep it, prevEnd=4. Answer: 1 removal. Sorting by <em>end</em> (not start) is
              what makes this greedy — always keeping the interval that frees up the boundary
              earliest leaves the most room for everything still to come.
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
