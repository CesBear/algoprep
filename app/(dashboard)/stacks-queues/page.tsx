import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/stacks-queues"

export default function StacksQueuesPage() {
  const problems = [
    { name: "Valid Parentheses",                diff: "Easy",   tags: ["stack"],                   href: "https://leetcode.com/problems/valid-parentheses/" },
    { name: "Min Stack",                        diff: "Medium", tags: ["stack", "design"],         href: "https://leetcode.com/problems/min-stack/" },
    { name: "Evaluate Reverse Polish Notation", diff: "Medium", tags: ["stack"],                   href: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
    { name: "Generate Parentheses",             diff: "Medium", tags: ["backtracking", "stack"],   href: "https://leetcode.com/problems/generate-parentheses/" },
    { name: "Daily Temperatures",               diff: "Medium", tags: ["monotonic stack"],         href: "https://leetcode.com/problems/daily-temperatures/" },
    { name: "Car Fleet",                        diff: "Medium", tags: ["stack", "sort"],           href: "https://leetcode.com/problems/car-fleet/" },
    { name: "Largest Rectangle in Histogram",   diff: "Hard",   tags: ["monotonic stack"],         href: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    { name: "Trapping Rain Water",              diff: "Hard",   tags: ["monotonic stack"],         href: "https://leetcode.com/problems/trapping-rain-water/" },
    { name: "Sliding Window Maximum",           diff: "Hard",   tags: ["deque", "monotonic"],      href: "https://leetcode.com/problems/sliding-window-maximum/" },
    { name: "Task Scheduler",                   diff: "Medium", tags: ["queue", "greedy"],         href: "https://leetcode.com/problems/task-scheduler/" },
    { name: "Design Circular Queue",            diff: "Medium", tags: ["queue", "design"],         href: "https://leetcode.com/problems/design-circular-queue/" },
    { name: "Implement Queue using Stacks",     diff: "Easy",   tags: ["stack", "design"],         href: "https://leetcode.com/problems/implement-queue-using-stacks/" },
  ]

  const monoCode = `<span class="kw">function</span> <span class="fn">dailyTemperatures</span>(temps: number[]): number[] {
  <span class="kw">const</span> result = <span class="kw">new</span> Array(temps.length).fill(<span class="num">0</span>);
  <span class="kw">const</span> stack: number[] = [];  <span class="cm">// stores indices</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; temps.length; i++) {
    <span class="kw">while</span> (stack.length &amp;&amp; temps[stack.at(-<span class="num">1</span>)!] &lt; temps[i]) {
      <span class="kw">const</span> idx   = stack.pop()!;
      result[idx] = i - idx;  <span class="cm">// days until warmer</span>
    }
    stack.push(i);
  }
  <span class="kw">return</span> result;  <span class="cm">// O(n) time, O(n) space</span>
}`

  return (
    <div>
      <div className="page-eyebrow">Linear Structures</div>
      <h1 className="page-title">Stacks & Queues</h1>
      <p className="page-desc">
        Reach for a stack (LIFO) when you need to resolve the most recent unresolved thing
        first — matching brackets, undo, DFS. Reach for a queue (FIFO) when arrival order
        must be preserved — BFS, scheduling. A monotonic stack builds on the same idea: pop
        everything smaller before pushing, so what&apos;s left is always sorted — that one
        invariant is what solves the next-greater-element and histogram problems below.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Stack — Operations</div>
          <table className="complexity-table">
            <thead><tr><th>Op</th><th>Time</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["push(x)",   "O(1)", "Add to top"],
                ["pop()",     "O(1)", "Remove from top"],
                ["peek()",    "O(1)", "Read top without removing"],
                ["isEmpty()", "O(1)", ""],
              ].map(([op, t, n]) => (
                <tr key={op}><td className="op">{op}</td><td className="time-good">{t}</td><td style={{ color: "var(--muted)", fontSize: 11 }}>{n}</td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16 }} className="card-title">Queue / Deque — Operations</div>
          <table className="complexity-table">
            <thead><tr><th>Op</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["enqueue / appendleft", "O(1)"],
                ["dequeue / popleft",    "O(1)"],
                ["peek front/back",      "O(1)"],
              ].map(([op, t]) => (
                <tr key={op}><td className="op">{op}</td><td className="time-good">{t}</td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, marginTop: 8 }}>
            These O(1) numbers assume a real deque (linked list or circular buffer). A plain
            JS array&apos;s <code>.shift()</code>/<code>.unshift()</code> are O(n) — every
            remaining element has to re-index. Sliding Window Maximum below uses a plain array
            anyway: each index only ever enters and leaves the deque once, so the total cost
            across the whole run is still O(n) even though no single <code>shift()</code> call is O(1).
          </div>
        </div>

        <div className="card">
          <div className="card-title">Key Techniques</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Bracket Matching",    "Push open brackets, pop on close, check match. O(n)."],
              ["Monotonic Stack",     "Before pushing, pop everything smaller — it can never be the answer once something bigger showed up. Works on any input order, not just sorted; the stack's contents stay sorted as an invariant you build, not a property you need going in."],
              ["Monotonic Deque",     "Sliding window max/min. Remove old indices + maintain order. O(n) total."],
              ["Stack for recursion", "Replace call stack with explicit stack for DFS, expression eval — avoids stack-overflow on deep/unbalanced recursion and lets you pause/resume traversal."],
              ["Two Stacks = Queue",  "Enqueue to stack1. Dequeue from stack2; if empty, pour stack1 into stack2. Each element only ever gets poured once, so the pour is amortized O(1) per operation."],
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
        <div className="card-title">Template — Monotonic Stack (Next Greater Element)</div>
        <CodeBlock html={monoCode} />
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Monotonic Stack — Daily Temperatures on [73,74,75,71,69]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              i=0 (73): stack empty → push 0. stack=[0]. i=1 (74): temps[0]=73&lt;74, so pop 0,
              result[0]=1-0=1 → push 1. stack=[1]. i=2 (75): temps[1]=74&lt;75, pop 1, result[1]=2-1=1
              → push 2. stack=[2]. i=3 (71): temps[2]=75 is not &lt;71, so no pop → push 3. stack=[2,3].
              i=4 (69): temps[3]=71 is not &lt;69 either → push 4. stack=[2,3,4]. Everything still on the
              stack at the end keeps result=0 (no warmer day exists yet) — the stack only ever holds
              indices with no warmer day seen so far, which is exactly why it stays sorted descending
              by temperature without sorting anything.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Two Stacks = Queue</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              push(1), push(2), push(3): all land on s1 → s1=[1,2,3], s2=[]. pop(): s2 is empty, so pour
              all of s1 into s2 (reversing it) → s1=[], s2=[3,2,1], then pop s2&apos;s top → returns 1
              (the first one pushed, FIFO preserved). pop() again: s2 still has [3,2] → returns 2, no
              re-pour needed. push(4): goes straight to s1=[4]. pop(): s2=[3] still has an element →
              returns 3 before s1 is ever touched. The pour only happens when s2 empties out, and each
              element is poured at most once in its lifetime — that&apos;s the whole amortized-O(1) argument.
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
