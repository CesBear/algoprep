import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/two-pointers"

export default function TwoPointersPage() {
  const problems = [
    { name: "Valid Palindrome",          diff: "Easy",   tags: ["two pointers"],              href: "https://leetcode.com/problems/valid-palindrome/" },
    { name: "Two Sum II (sorted input)", diff: "Medium", tags: ["two pointers"],              href: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
    { name: "3Sum",                      diff: "Medium", tags: ["sort", "two pointers"],      href: "https://leetcode.com/problems/3sum/" },
    { name: "Container With Most Water", diff: "Medium", tags: ["greedy", "two pointers"],    href: "https://leetcode.com/problems/container-with-most-water/" },
    { name: "Remove Duplicates",         diff: "Easy",   tags: ["in-place", "two pointers"],  href: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
    { name: "Move Zeroes",               diff: "Easy",   tags: ["two pointers"],              href: "https://leetcode.com/problems/move-zeroes/" },
    { name: "Sort Colors (Dutch Flag)",  diff: "Medium", tags: ["two pointers", "3-way partition"], href: "https://leetcode.com/problems/sort-colors/" },
    { name: "Trapping Rain Water",       diff: "Hard",   tags: ["two pointers", "stack"],     href: "https://leetcode.com/problems/trapping-rain-water/" },
    { name: "4Sum",                      diff: "Medium", tags: ["sort", "two pointers"],      href: "https://leetcode.com/problems/4sum/" },
    { name: "Linked List Cycle",         diff: "Easy",   tags: ["fast/slow pointers"],        href: "https://leetcode.com/problems/linked-list-cycle/" },
  ]

  const threeSumCode = `<span class="kw">function</span> <span class="fn">threeSum</span>(nums: number[]): number[][] {
  nums.sort((a, b) =&gt; a - b);
  <span class="kw">const</span> res: number[][] = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length - <span class="num">2</span>; i++) {
    <span class="kw">if</span> (i &gt; <span class="num">0</span> &amp;&amp; nums[i] === nums[i-<span class="num">1</span>]) <span class="kw">continue</span>;
    <span class="kw">let</span> lo = i + <span class="num">1</span>, hi = nums.length - <span class="num">1</span>;
    <span class="kw">while</span> (lo &lt; hi) {
      <span class="kw">const</span> s = nums[i] + nums[lo] + nums[hi];
      <span class="kw">if</span>      (s &lt; <span class="num">0</span>) lo++;
      <span class="kw">else if</span> (s &gt; <span class="num">0</span>) hi--;
      <span class="kw">else</span> {
        res.push([nums[i], nums[lo], nums[hi]]);
        <span class="kw">while</span> (lo &lt; hi &amp;&amp; nums[lo] === nums[lo+<span class="num">1</span>]) lo++;
        <span class="kw">while</span> (lo &lt; hi &amp;&amp; nums[hi] === nums[hi-<span class="num">1</span>]) hi--;
        lo++; hi--;
      }
    }
  }
  <span class="kw">return</span> res;
}`

  const dedupeCode = `<span class="kw">function</span> <span class="fn">removeDups</span>(nums: number[]): number {
  <span class="kw">if</span> (!nums.length) <span class="kw">return</span> <span class="num">0</span>;
  <span class="kw">let</span> slow = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> fast = <span class="num">1</span>; fast &lt; nums.length; fast++) {
    <span class="kw">if</span> (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  <span class="kw">return</span> slow + <span class="num">1</span>;  <span class="cm">// new length</span>
}`

  return (
    <div>
      <div className="page-eyebrow">Core Techniques</div>
      <h1 className="page-title">Two Pointers</h1>
      <p className="page-desc">
        Two index variables move toward each other (or in the same direction) instead of a brute-force
        nested loop re-scanning the same range — that&apos;s the whole saving. Sorting is only needed
        when you&apos;re searching by <em>value</em> (pair-sum problems like Two Sum II / 3Sum); on
        problems about position or structure — palindrome check, in-place compaction, max-area — the
        array is two-pointer-friendly without ever sorting it. Turns O(n²) brute force into O(n) for
        pair problems (k-sum variants cost more — 3Sum is O(n²), 4Sum is O(n³)).
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Variants</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Opposite ends",   "lo=0, hi=n-1. Squeeze inward — move whichever side is the current bottleneck, since the other side can never make it worse. Palindrome check (no sort needed), pair sum (needs sorted), max-area."],
              ["Same direction",  "slow=fast=0. Fast explores, slow only advances on a write, so slow ≤ fast always — safe to overwrite nums[slow] in place. Remove duplicates, compaction."],
              ["Fast / Slow",     "Floyd's cycle detection. fast moves 2x, so the gap to slow shrinks by 1 every step inside a cycle — it must eventually lap slow. Cycle in LL, find duplicate."],
            ].map(([name, desc]) => (
              <div key={name} className="pattern-chip">
                <div className="pattern-chip-name">{name}</div>
                <div className="pattern-chip-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">When to Use</div>
          <div className="problems-list">
            {[
              ["Palindrome / structure check",     "l=0, r=n-1 move inward, compare — no sorting needed"],
              ["Remove / compact in-place",         "Slow pointer writes, fast reads — no sorting needed"],
              ["Pair sum / target search",          "Needs sorted input: sort first, then squeeze from both ends"],
              ["Detect cycle",                      "Fast/slow on linked list / array — no sorting needed"],
            ].map(([cond, note]) => (
              <div key={cond} className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{cond}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Templates</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>3Sum — O(n²)</div>
            <CodeBlock html={threeSumCode} style={{ fontSize: 11 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Remove duplicates in-place</div>
            <CodeBlock html={dedupeCode} style={{ fontSize: 11 }} />
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, marginTop: 12 }}>
          Both loops guard on <code>lo &lt; hi</code>, never <code>lo &lt;= hi</code>: at{" "}
          <code>lo === hi</code> only one element is left, and there&apos;s nothing left to pair it
          with — the loop has to stop one step before they&apos;d cross.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Container With Most Water — why move the shorter side, on [1,8,6]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              lo=0 (h=1), hi=2 (h=6): area = min(1,6)×(2-0) = 2. The left side (1) is the bottleneck —
              moving hi could only keep that same ≤1 bound while shrinking the width, so it can never
              beat 2. Only advancing the shorter side has any chance to improve the answer, so lo++.
              lo=1 (h=8), hi=2 (h=6): area = min(8,6)×(2-1) = 6. Now the right side (6) is the
              bottleneck, so hi-- next. lo===hi, loop stops. Best=6 — found by always advancing
              whichever side is currently the smaller wall, since the taller side can never raise it.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Same-Direction Pointers — slow ≤ fast invariant, on [0,0,1,1,2]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              slow=0. fast=1: nums[1]=0 equals nums[slow=0]=0 → skip, no write. fast=2: nums[2]=1
              differs from nums[0]=0 → slow becomes 1, nums[1]=1 (overwriting the duplicate fast
              already read past). fast=3: nums[3]=1 equals the just-written nums[1]=1 → skip. fast=4:
              nums[4]=2 differs → slow becomes 2, nums[2]=2. Final length=3, prefix=[0,1,2]. slow never
              overtakes fast because slow only advances on a write, always one or more steps behind —
              so overwriting nums[slow] is always safe; fast has already read whatever was there.
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
