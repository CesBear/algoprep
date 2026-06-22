import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/recursion"

export default function RecursionPage() {
  const problems = [
    { name: "Fibonacci Number",                         diff: "Easy",   tags: ["recursion", "memoization"],  href: "https://leetcode.com/problems/fibonacci-number/" },
    { name: "Climbing Stairs",                          diff: "Easy",   tags: ["recursion", "memoization", "DP"], href: "https://leetcode.com/problems/climbing-stairs/" },
    { name: "Generate Parentheses",                     diff: "Medium", tags: ["backtracking"],              href: "https://leetcode.com/problems/generate-parentheses/" },
    { name: "Subsets",                                  diff: "Medium", tags: ["backtracking"],              href: "https://leetcode.com/problems/subsets/" },
    { name: "Subsets II (duplicates)",                  diff: "Medium", tags: ["backtracking", "sort"],      href: "https://leetcode.com/problems/subsets-ii/" },
    { name: "Permutations",                             diff: "Medium", tags: ["backtracking"],              href: "https://leetcode.com/problems/permutations/" },
    { name: "Combination Sum",                          diff: "Medium", tags: ["backtracking"],              href: "https://leetcode.com/problems/combination-sum/" },
    { name: "Combination Sum II",                       diff: "Medium", tags: ["backtracking", "sort"],      href: "https://leetcode.com/problems/combination-sum-ii/" },
    { name: "Letter Combinations of Phone Number",      diff: "Medium", tags: ["backtracking"],              href: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
    { name: "Word Search",                              diff: "Medium", tags: ["backtracking", "DFS"],       href: "https://leetcode.com/problems/word-search/" },
    { name: "Palindrome Partitioning",                  diff: "Medium", tags: ["backtracking", "DP"],        href: "https://leetcode.com/problems/palindrome-partitioning/" },
    { name: "N-Queens",                                 diff: "Hard",   tags: ["backtracking"],              href: "https://leetcode.com/problems/n-queens/" },
    { name: "Sudoku Solver",                            diff: "Hard",   tags: ["backtracking"],              href: "https://leetcode.com/problems/sudoku-solver/" },
  ]

  const backtrackCode = `<span class="kw">function</span> <span class="fn">backtrack</span>(state: number[], choices: number[], result: number[][]): <span class="kw">void</span> {
  <span class="kw">if</span> (isSolution(state)) {
    result.push([...state]);  <span class="cm">// copy current state</span>
    <span class="kw">return</span>;
  }
  <span class="kw">for</span> (<span class="kw">const</span> choice <span class="kw">of</span> choices) {
    <span class="kw">if</span> (isValid(state, choice)) {   <span class="cm">// prune</span>
      state.push(choice);             <span class="cm">// choose</span>
      backtrack(state, choices, result);
      state.pop();                    <span class="cm">// undo (backtrack)</span>
    }
  }
}`

  const subsetsCode = `<span class="kw">function</span> <span class="fn">subsets</span>(nums: number[]): number[][] {
  <span class="kw">const</span> res: number[][] = [];
  <span class="kw">function</span> <span class="fn">bt</span>(start: number, curr: number[]): <span class="kw">void</span> {
    res.push([...curr]);
    <span class="kw">for</span> (<span class="kw">let</span> i = start; i &lt; nums.length; i++) {
      curr.push(nums[i]);
      bt(i + <span class="num">1</span>, curr);
      curr.pop();
    }
  }
  bt(<span class="num">0</span>, []);
  <span class="kw">return</span> res;
}`

  const permuteCode = `<span class="kw">function</span> <span class="fn">permute</span>(nums: number[]): number[][] {
  <span class="kw">const</span> res: number[][] = [];
  <span class="kw">function</span> <span class="fn">bt</span>(curr: number[], rem: number[]): <span class="kw">void</span> {
    <span class="kw">if</span> (!rem.length) { res.push([...curr]); <span class="kw">return</span>; }
    <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; rem.length; i++) {
      curr.push(rem[i]);
      bt(curr, [...rem.slice(<span class="num">0</span>, i), ...rem.slice(i + <span class="num">1</span>)]);
      curr.pop();
    }
  }
  bt([], nums);
  <span class="kw">return</span> res;
}`

  return (
    <div>
      <div className="page-eyebrow">Fundamentals</div>
      <h1 className="page-title">Recursion & Backtracking</h1>
      <p className="page-desc">
        Recursion = solving a problem by solving smaller instances of the same problem; each recursive
        call must shrink the input toward a base case, or the call stack never bottoms out.
        Backtracking = recursion + undoing a choice that didn&apos;t pan out, pruning bad branches early.
        Key for combinatorics problems.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Recursion Anatomy</div>
          <div className="problems-list">
            {[
              ["Base case",       "The simplest instance that returns directly. Prevents infinite recursion."],
              ["Recursive case",  "Call self with a smaller / simpler input. Must make progress toward base case."],
              ["Call stack",      "Each frame is O(1) space; depth = how deep calls nest before hitting the base case (often the path length, not always input size). ~10,000 deep overflows the stack in JS."],
              ["Memoization",     "Cache results: memo[n] ??= compute(n). Only helps when subproblems overlap (e.g. Fibonacci below) — memoizing non-overlapping recursion (e.g. factorial) is a no-op."],
              ["Tail recursion",  "Last op is the recursive call. Spec allows TCO in strict mode, but V8/Node never implemented it — don't rely on it in JS, use a loop instead."],
            ].map(([name, desc]) => (
              <div key={name} className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--muted)", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
            <strong style={{ color: "var(--text)" }}>Worked trace — factorial(4):</strong> calls down to the base case, then unwinds:
            factorial(4) → 4×factorial(3) → 4×(3×factorial(2)) → 4×(3×(2×factorial(1))) → 4×(3×(2×(1×factorial(0)))).
            factorial(0)=1 hits the base case, then it unwinds: 1×1=1, 2×1=2, 3×2=6, 4×6=24.
            <br /><br />
            <strong style={{ color: "var(--text)" }}>#1 recursion bug:</strong> if the recursive call doesn&apos;t actually
            shrink toward the base case (e.g. a typo&apos;d factorial(n) instead of factorial(n-1)), the base case never
            fires — you get a stack overflow, not a wrong answer.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Backtracking Template</div>
          <CodeBlock html={backtrackCode} style={{ fontSize: 11 }} />
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
            The &quot;undo&quot; step is what makes it backtracking — not just recursion.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Problem Templates</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Subsets (power set)</div>
            <CodeBlock html={subsetsCode} style={{ fontSize: 11 }} />
            <div style={{ marginTop: 8, fontSize: 10, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.5 }}>
              Trace subsets([1,2]): bt(0,[]) saves [] → push 1 → bt(1,[1]) saves [1] → push 2 → bt(2,[1,2]) saves [1,2] →
              pop 2 → pop 1 → back at top, push 2 → bt(2,[2]) saves [2] → pop 2. res = [[],[1],[1,2],[2]].
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Permutations</div>
            <CodeBlock html={permuteCode} style={{ fontSize: 11 }} />
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
