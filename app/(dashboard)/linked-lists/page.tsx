import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/linked-lists"

export default function LinkedListsPage() {
  const problems = [
    { name: "Reverse Linked List",            diff: "Easy",   tags: ["iterative", "recursive"],    href: "https://leetcode.com/problems/reverse-linked-list/" },
    { name: "Merge Two Sorted Lists",          diff: "Easy",   tags: ["dummy node", "merge"],       href: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { name: "Linked List Cycle",               diff: "Easy",   tags: ["fast/slow pointers"],        href: "https://leetcode.com/problems/linked-list-cycle/" },
    { name: "Middle of Linked List",           diff: "Easy",   tags: ["fast/slow pointers"],        href: "https://leetcode.com/problems/middle-of-the-linked-list/" },
    { name: "Remove Nth Node From End",        diff: "Medium", tags: ["two pointers"],              href: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    { name: "Reorder List",                    diff: "Medium", tags: ["reverse", "merge"],          href: "https://leetcode.com/problems/reorder-list/" },
    { name: "Copy List with Random Pointer",   diff: "Medium", tags: ["hash map", "two pass"],      href: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
    { name: "Find the Duplicate Number",       diff: "Medium", tags: ["fast/slow pointers", "binary search"], href: "https://leetcode.com/problems/find-the-duplicate-number/" },
    { name: "Add Two Numbers",                 diff: "Medium", tags: ["carry", "iteration"],        href: "https://leetcode.com/problems/add-two-numbers/" },
    { name: "LRU Cache",                       diff: "Medium", tags: ["doubly LL", "hash map"],     href: "https://leetcode.com/problems/lru-cache/" },
    { name: "Merge K Sorted Lists",            diff: "Hard",   tags: ["heap", "divide & conquer"],  href: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { name: "Reverse Nodes in K-Group",        diff: "Hard",   tags: ["recursion", "groups"],       href: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
  ]

  const reverseCode = `<span class="cm">// Reverse linked list — O(n) time O(1) space</span>
<span class="cm">// trace on 1→2→3: order matters — save nxt BEFORE overwriting curr.next,</span>
<span class="cm">// or the rest of the list is lost. step1: null←1  2→3 (prev=1,curr=2,nxt=3)</span>
<span class="cm">// step2: null←1←2  3       (prev=2,curr=3,nxt=null)</span>
<span class="cm">// step3: null←1←2←3        (prev=3,curr=null → loop ends, return prev)</span>
<span class="kw">function</span> <span class="fn">reverse</span>(head: ListNode | <span class="kw">null</span>): ListNode | <span class="kw">null</span> {
  <span class="kw">let</span> prev: ListNode | <span class="kw">null</span> = <span class="kw">null</span>, curr = head;
  <span class="kw">while</span> (curr) {
    <span class="kw">const</span> nxt  = curr.next;
    curr.next  = prev;
    prev       = curr;
    curr       = nxt;
  }
  <span class="kw">return</span> prev;
}`

  const cycleCode = `<span class="cm">// Detect cycle — Floyd's algorithm. Fast laps slow because the gap</span>
<span class="cm">// between them shrinks by 1 every step once both are inside the cycle.</span>
<span class="kw">function</span> <span class="fn">hasCycle</span>(head: ListNode | <span class="kw">null</span>): <span class="kw">boolean</span> {
  <span class="kw">let</span> slow = head, fast = head;
  <span class="kw">while</span> (fast &amp;&amp; fast.next) {  <span class="cm">// guard fast.next too, or fast.next.next throws</span>
    slow = slow!.next;
    fast = fast.next.next;
    <span class="kw">if</span> (slow === fast) <span class="kw">return</span> <span class="kw">true</span>;  <span class="cm">// meeting point ≠ cycle start</span>
  }
  <span class="kw">return</span> <span class="kw">false</span>;
}`

  return (
    <div>
      <div className="page-eyebrow">Linear Structures</div>
      <h1 className="page-title">Linked Lists</h1>
      <p className="page-desc">
        Dynamic chains of nodes with pointers, so insert/delete is O(1) once you&apos;re
        already at the node — reaching that node is still O(n), since there&apos;s no index
        to jump to. Fast/slow pointers (Floyd&apos;s) are the key technique: in a cycle, a
        2x-speed pointer closes the gap on a 1x-speed pointer by 1 node every step, so it
        always laps it — that&apos;s also how you find the middle in one pass.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Operations Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Singly</th><th>Doubly</th></tr></thead>
            <tbody>
              {[
                ["Access by index", "O(n)", "O(n)"],
                ["Search",          "O(n)", "O(n)"],
                ["Insert at head",  "O(1)", "O(1)"],
                ["Insert at tail",  "O(n)", "O(1) w/ tail ptr"],
                ["Insert at mid",   "O(n)", "O(n)"],
                ["Delete at head",  "O(1)", "O(1)"],
                ["Delete at tail",  "O(n)", "O(1) w/ tail ptr"],
              ].map(([op, s, d]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={s === "O(1)" || s === "O(1) w/ tail ptr" ? "time-good" : "time-ok"}>{s}</td>
                  <td className={d === "O(1)" || d.startsWith("O(1)") ? "time-good" : "time-ok"}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">Key Techniques</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Fast / Slow Pointers","Fast moves 2x. The meeting point is just some node in the cycle, not the start — to find the start, reset one pointer to head and step both by 1 until they meet again."],
              ["Dummy Head Node",     "Dummy→real head, return dummy.next. Why: without it, deleting/inserting at index 0 needs its own special-case branch."],
              ["Reverse In-Place",    "prev=null, curr=head. Loop: nxt=curr.next; curr.next=prev; prev=curr; curr=nxt. Save nxt first — reorder these lines and you lose the rest of the list."],
              ["Two-Pointer Gap",     "Advance one pointer n+1 steps ahead first, then move both together; when it hits null, the trailing pointer sits right before the target — one pass, not two."],
              ["Merge Pattern",       "Two sorted lists: compare heads, advance the smaller, chain together — usually paired with a dummy node to avoid special-casing the new head."],
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
          <CodeBlock html={reverseCode} style={{ fontSize: 11 }} />
          <CodeBlock html={cycleCode} style={{ fontSize: 11 }} />
        </div>
      </div>

      <div className="card">
        <div className="card-title">Practice Problems</div>
        <ProblemList problems={problems} solutions={solutions} />
      </div>
    </div>
  )
}
