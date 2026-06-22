import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/binary-search"

export default function BinarySearchPage() {
  const problems = [
    { name: "Binary Search",                    diff: "Easy",   tags: ["classic"],                     href: "https://leetcode.com/problems/binary-search/" },
    { name: "Search Insert Position",            diff: "Easy",   tags: ["binary search"],              href: "https://leetcode.com/problems/search-insert-position/" },
    { name: "First Bad Version",                 diff: "Easy",   tags: ["binary search on answer"],    href: "https://leetcode.com/problems/first-bad-version/" },
    { name: "Find Minimum in Rotated Sorted Array", diff: "Medium", tags: ["binary search"],            href: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
    { name: "Search in Rotated Sorted Array",    diff: "Medium", tags: ["binary search"],              href: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { name: "Search a 2D Matrix",                diff: "Medium", tags: ["binary search", "matrix"],    href: "https://leetcode.com/problems/search-a-2d-matrix/" },
    { name: "Koko Eating Bananas",               diff: "Medium", tags: ["binary search on answer"],    href: "https://leetcode.com/problems/koko-eating-bananas/" },
    { name: "Time Based Key-Value Store",        diff: "Medium", tags: ["binary search", "design"],    href: "https://leetcode.com/problems/time-based-key-value-store/" },
    { name: "Find Peak Element",                 diff: "Medium", tags: ["binary search"],              href: "https://leetcode.com/problems/find-peak-element/" },
    { name: "Median of Two Sorted Arrays",       diff: "Hard",   tags: ["binary search", "partition"], href: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    { name: "Split Array Largest Sum",           diff: "Hard",   tags: ["binary search on answer"],    href: "https://leetcode.com/problems/split-array-largest-sum/" },
  ]

  const classicCode = `<span class="kw">function</span> <span class="fn">search</span>(nums: number[], target: number): number {
  <span class="kw">let</span> lo = <span class="num">0</span>, hi = nums.length - <span class="num">1</span>;
  <span class="kw">while</span> (lo &lt;= hi) {
    <span class="kw">const</span> mid = lo + ((hi - lo) &gt;&gt; <span class="num">1</span>);
    <span class="kw">if</span>      (nums[mid] === target) <span class="kw">return</span> mid;
    <span class="kw">else if</span> (nums[mid] &lt; target)   lo = mid + <span class="num">1</span>;
    <span class="kw">else</span>                           hi = mid - <span class="num">1</span>;
  }
  <span class="kw">return</span> -<span class="num">1</span>;
}`

  const kokoCode = `<span class="kw">function</span> <span class="fn">kokoBananas</span>(piles: number[], h: number): number {
  <span class="kw">let</span> lo = <span class="num">1</span>, hi = Math.max(...piles);
  <span class="kw">while</span> (lo &lt; hi) {
    <span class="kw">const</span> mid = (lo + hi) &gt;&gt; <span class="num">1</span>;
    <span class="kw">let</span> hours = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">const</span> p <span class="kw">of</span> piles) hours += Math.ceil(p / mid);
    <span class="kw">if</span> (hours &lt;= h) hi = mid;
    <span class="kw">else</span>            lo = mid + <span class="num">1</span>;
  }
  <span class="kw">return</span> lo;
}`

  return (
    <div>
      <div className="page-eyebrow">Core Techniques</div>
      <h1 className="page-title">Binary Search</h1>
      <p className="page-desc">
        Eliminates half the search space each step → O(log n). Works on any monotonic
        function, not just sorted arrays — e.g. Koko&apos;s &quot;can I finish with this
        eating speed?&quot; answers go <code>false,false,false,true,true</code> as the
        speed increases: that sequence is sorted even though the input piles aren&apos;t.
        &quot;Binary search on the answer&quot; means searching that feasibility sequence
        instead of the input array directly.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">The 3 Templates</div>
          <div className="problems-list" style={{ gap: 12 }}>
            {[
              ["Template 1 — Classic",    "lo=0, hi=n-1. Loop while lo<=hi. No post-processing. Use when mid is the answer."],
              ["Template 2 — lo < hi",    "lo=0, hi=n. Loop while lo<hi. hi=mid (not mid-1). Post: check lo. Left boundary."],
              ["Template 3 — lo+1 < hi",  "Keeps 2 elements at end. Both checked after loop. Use when the answer could be either of two adjacent survivors — closest-to-target, or comparing neighbors to find a peak."],
            ].map(([name, desc]) => (
              <div key={name} className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: "#c4b5fd" }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, marginTop: 4 }}>
            Don&apos;t mix the pairings: <code>lo&lt;hi</code> with <code>hi=mid-1</code> can
            infinite-loop when <code>lo===mid</code> (mid rounds down to lo, so hi never reaches
            lo). Use <code>lo&lt;=hi</code> + no post-processing, or <code>lo&lt;hi</code> +
            <code>hi=mid</code> — not a mix of the two.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Key Patterns</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Exact search",       "Find target in sorted array. Return mid or -1."],
              ["Left boundary",      "Smallest index where arr[i] >= target."],
              ["Right boundary",     "Largest index where arr[i] <= target."],
              ["Search on answer",   "Binary search the feasibility predicate ('can we do X with mid value?') instead of the array — the predicate's true/false sequence is monotonic, same as a sorted array."],
              ["Rotated array",      "Comparing nums[lo] to nums[mid] tells you which half is sorted; the target is in that half iff it falls inside that half's value range — otherwise it's in the other half."],
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
        <div className="card-title">Templates</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Classic (find exact)</div>
            <CodeBlock html={classicCode} style={{ fontSize: 11 }} />
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
              <code>lo + (hi-lo)/2</code> instead of <code>(lo+hi)/2</code> avoids overflow when
              <code>lo+hi</code> exceeds the integer range — doesn&apos;t matter at JS array-index
              sizes, but it&apos;s the safe habit (and matters for real once the search range can
              be a large sum, like Split Array Largest Sum below).
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Search on answer</div>
            <CodeBlock html={kokoCode} style={{ fontSize: 11 }} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Classic search for 7 in [1,3,5,7,9]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              lo=0, hi=4. mid=2, nums[2]=5 &lt; 7 → lo=3. lo=3, hi=4: mid=3, nums[3]=7 === 7 →
              return 3. Two steps instead of scanning all 5 — each step throws away the half that
              provably can&apos;t contain the target.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Rotated array — which half is sorted, on [4,5,6,7,0,1,2] target=0</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              lo=0, hi=6, mid=3: nums[mid]=7. nums[lo]=4 &lt;= nums[mid]=7, so the left half
              [4,5,6,7] is the sorted one. Is target 0 inside that half&apos;s range [4,7]? No —
              so the target must be in the other half: lo=mid+1=4. Now lo=4,hi=6,mid=5:
              nums[mid]=1. nums[lo]=0 &lt;= nums[mid]=1, left half [0,1] is sorted; is 0 inside
              [0,1]? Yes → hi=mid-1=4. lo===hi=4 → nums[4]=0, found.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Koko Eating Bananas — search on answer, piles=[3,6,7,11], h=8</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              lo=1, hi=11. mid=6: hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6.
              6&lt;=8 (feasible) → this speed works, but maybe a slower one does too, so keep it
              as a candidate: hi=mid=6. lo=1,hi=6,mid=3: hours = 1+2+3+4 = 10. 10&gt;8 (too
              slow) → 3 is rejected for good: lo=mid+1=4. lo=4,hi=6,mid=5: hours=1+2+2+3=8.
              8&lt;=8 → hi=5. lo=4,hi=5,mid=4: hours=1+2+2+3=8. 8&lt;=8 → hi=4. lo===hi=4 →
              answer is 4. hi=mid keeps a feasible speed as the best-so-far; lo=mid+1 permanently
              rules out an infeasible one — that pairing is what makes the search converge on the
              minimum feasible speed.
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
