import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/heaps"

export default function HeapsPage() {
  const problems = [
    { name: "Kth Largest Element in a Stream", diff: "Easy",   tags: ["min-heap", "size-k"],      href: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
    { name: "Last Stone Weight",               diff: "Easy",   tags: ["max-heap"],                href: "https://leetcode.com/problems/last-stone-weight/" },
    { name: "K Closest Points to Origin",      diff: "Medium", tags: ["max-heap", "size-k"],      href: "https://leetcode.com/problems/k-closest-points-to-origin/" },
    { name: "Find Median from Data Stream",    diff: "Hard",   tags: ["two heaps", "design"],     href: "https://leetcode.com/problems/find-median-from-data-stream/" },
    { name: "Merge K Sorted Lists",            diff: "Hard",   tags: ["k-way merge"],             href: "https://leetcode.com/problems/merge-k-sorted-lists/" },
  ]

  const heapCode = `<span class="kw">class</span> <span class="fn">MinHeap</span> {
  private heap: number[] = [];

  push(val: number): <span class="kw">void</span> {
    <span class="kw">this</span>.heap.push(val);
    <span class="kw">let</span> i = <span class="kw">this</span>.heap.length - <span class="num">1</span>;
    <span class="kw">while</span> (i &gt; <span class="num">0</span>) {
      <span class="kw">const</span> p = (i - <span class="num">1</span>) &gt;&gt; <span class="num">1</span>;
      <span class="kw">if</span> (<span class="kw">this</span>.heap[p] &lt;= <span class="kw">this</span>.heap[i]) <span class="kw">break</span>;
      [<span class="kw">this</span>.heap[i], <span class="kw">this</span>.heap[p]] = [<span class="kw">this</span>.heap[p], <span class="kw">this</span>.heap[i]];
      i = p;
    }
  }

  pop(): number {
    <span class="kw">const</span> top = <span class="kw">this</span>.heap[<span class="num">0</span>];
    <span class="kw">const</span> last = <span class="kw">this</span>.heap.pop()!;
    <span class="kw">if</span> (<span class="kw">this</span>.heap.length) {
      <span class="kw">this</span>.heap[<span class="num">0</span>] = last;
      <span class="kw">let</span> i = <span class="num">0</span>;
      <span class="kw">while</span> (<span class="kw">true</span>) {
        <span class="kw">const</span> l = <span class="num">2</span> * i + <span class="num">1</span>, r = <span class="num">2</span> * i + <span class="num">2</span>;
        <span class="kw">let</span> smallest = i;
        <span class="kw">if</span> (l &lt; <span class="kw">this</span>.heap.length &amp;&amp; <span class="kw">this</span>.heap[l] &lt; <span class="kw">this</span>.heap[smallest]) smallest = l;
        <span class="kw">if</span> (r &lt; <span class="kw">this</span>.heap.length &amp;&amp; <span class="kw">this</span>.heap[r] &lt; <span class="kw">this</span>.heap[smallest]) smallest = r;
        <span class="kw">if</span> (smallest === i) <span class="kw">break</span>;
        [<span class="kw">this</span>.heap[i], <span class="kw">this</span>.heap[smallest]] = [<span class="kw">this</span>.heap[smallest], <span class="kw">this</span>.heap[i]];
        i = smallest;
      }
    }
    <span class="kw">return</span> top;
  }
}`

  return (
    <div>
      <div className="page-eyebrow">Non-Linear</div>
      <h1 className="page-title">Heap / Priority Queue</h1>
      <p className="page-desc">
        A binary tree packed into an array, kept only <em>partially</em> ordered: every parent is
        ≤ (min-heap) or ≥ (max-heap) its children, but siblings aren&apos;t compared to each other.
        That weaker invariant is what makes push/pop O(log n) instead of the O(log n) <em>fully</em>
        sorted structures need — you only fix the one path from the changed node to the root, not
        the whole tree. JS has no built-in heap, so &quot;implement a heap&quot; is itself a common
        ask before you even get to the problem.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["Push",              "O(log n)", "siftUp from the new leaf"],
                ["Pop (root)",        "O(log n)", "siftDown from the root"],
                ["Peek",              "O(1)",     "Root is always heap[0]"],
                ["Build from array",  "O(n)",     "Heapify: siftDown from the last parent backward"],
                ["Space",             "O(n)",     ""],
              ].map(([op, t, n]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={t === "O(1)" ? "time-good" : "time-ok"}>{t}</td>
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
              ["Array-as-tree",      "Node i's children live at 2i+1 and 2i+2; its parent at (i-1)>>1. No pointers needed."],
              ["siftUp / siftDown",  "Insert: append then siftUp toward the root. Remove root: move the last element to the root then siftDown toward the leaves. Both touch one root-to-leaf path, never the whole array."],
              ["Max-heap via negation", "JS's heap primitive (this array trick) is naturally a min-heap. For a max-heap either flip the comparator, or push negated values into a min-heap and negate again on read — see Find Median below."],
              ["Size-k heap",        "Kth Largest / K Closest: keep the heap capped at size k, evicting the worst element on every insert past capacity. Turns an O(n log n) full sort into O(n log k)."],
              ["Two heaps",          "Find Median: a max-heap for the lower half + a min-heap for the upper half, rebalanced after every insert so their sizes differ by at most 1. The median is then O(1) to read from the top(s)."],
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
        <div className="card-title">Template — Min-Heap (push / pop)</div>
        <CodeBlock html={heapCode} />
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>Trace:</strong> push 5,3,8,1 in order. push(5) →
          [5]. push(3) → [5,3], siftUp swaps (3&lt;5) → [3,5]. push(8) → [3,5,8], already valid,
          no swap. push(1) → [3,5,8,1], siftUp: parent of index 3 is index 1 (5), 5&gt;1 → swap →
          [3,1,8,5]; parent of index 1 is index 0 (3), 3&gt;1 → swap → [1,3,8,5]. pop(): returns
          1, moves last element 5 to the root → [5,3,8], siftDown: children of index 0 are 3 and 8,
          smaller is 3 → swap → [3,5,8]. Final heap [3,5,8], popped value 1.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Kth Largest Element in a Stream, k=2</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              add(4): heap=[4], size≤k, top=4. add(5): heap=[4,5], top=4 (the 2nd largest of
              {"{4,5}"}). add(8): heap would be size 3 &gt; k=2 → push 8 then pop the min (4) →
              heap=[5,8], top=5. add(2): push 2, size 3 &gt; 2 → pop min (2 itself, just pushed)
              → heap stays [5,8], top=5. The heap only ever holds the k largest seen so far, so
              its minimum (the root) is always exactly the kth largest.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Find Median from Data Stream</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              addNum(5): small=[5], large=[] → rebalance moves 5 to large: small=[], large=[5].
              large longer → move large&apos;s min back: small=[5], large=[]. addNum(3): push -3 to
              small → small holds {"{5,3}"} (max=5), move max 5 to large: small={"{3}"},
              large={"{5}"}. Sizes equal → median=(3+5)/2=4. addNum(8): push -8 to small
              ({"{3,8}"} max=8), move 8 to large: small={"{3}"}, large={"{5,8}"}. large longer
              (2&gt;1) → move large&apos;s min (5) back to small: small={"{3,5}"}, large={"{8}"}.
              small longer → median = small&apos;s max = 5.
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
