import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/dynamic-programming"

export default function DPPage() {
  const problems = [
    { name: "Climbing Stairs",              diff: "Easy",   tags: ["1D DP", "fibonacci"],      href: "https://leetcode.com/problems/climbing-stairs/" },
    { name: "House Robber",                 diff: "Medium", tags: ["1D DP"],                   href: "https://leetcode.com/problems/house-robber/" },
    { name: "House Robber II",              diff: "Medium", tags: ["1D DP", "circular"],       href: "https://leetcode.com/problems/house-robber-ii/" },
    { name: "Longest Palindromic Substring",diff: "Medium", tags: ["expand around center"],    href: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { name: "Palindromic Substrings",       diff: "Medium", tags: ["expand around center"],    href: "https://leetcode.com/problems/palindromic-substrings/" },
    { name: "Decode Ways",                  diff: "Medium", tags: ["1D DP", "string"],         href: "https://leetcode.com/problems/decode-ways/" },
    { name: "Coin Change",                  diff: "Medium", tags: ["unbounded knapsack"],       href: "https://leetcode.com/problems/coin-change/" },
    { name: "Maximum Product Subarray",     diff: "Medium", tags: ["1D DP", "kadane variant"], href: "https://leetcode.com/problems/maximum-product-subarray/" },
    { name: "Longest Common Subsequence",   diff: "Medium", tags: ["2D DP"],                   href: "https://leetcode.com/problems/longest-common-subsequence/" },
    { name: "Word Break",                   diff: "Medium", tags: ["1D DP", "trie"],            href: "https://leetcode.com/problems/word-break/" },
    { name: "Combination Sum IV",           diff: "Medium", tags: ["1D DP", "unbounded knapsack"], href: "https://leetcode.com/problems/combination-sum-iv/" },
    { name: "Unique Paths",                 diff: "Medium", tags: ["2D DP"],                   href: "https://leetcode.com/problems/unique-paths/" },
    { name: "Longest Increasing Subsequence",diff: "Medium",tags: ["1D DP", "binary search", "O(n log n)"], href: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { name: "Jump Game",                    diff: "Medium", tags: ["greedy / DP"],              href: "https://leetcode.com/problems/jump-game/" },
    { name: "Jump Game II",                 diff: "Medium", tags: ["greedy"],                  href: "https://leetcode.com/problems/jump-game-ii/" },
    { name: "Gas Station",                  diff: "Medium", tags: ["greedy"],                  href: "https://leetcode.com/problems/gas-station/" },
    { name: "Partition Equal Subset Sum",   diff: "Medium", tags: ["0/1 knapsack"],             href: "https://leetcode.com/problems/partition-equal-subset-sum/" },
    { name: "Edit Distance",                diff: "Hard",   tags: ["2D DP"],                   href: "https://leetcode.com/problems/edit-distance/" },
    { name: "Burst Balloons",               diff: "Hard",   tags: ["interval DP"],             href: "https://leetcode.com/problems/burst-balloons/" },
  ]

  const coinCode = `<span class="kw">function</span> <span class="fn">coinChange</span>(coins: number[], amount: number): number {
  <span class="kw">const</span> dp = <span class="kw">new</span> Array(amount + <span class="num">1</span>).fill(Infinity);
  dp[<span class="num">0</span>] = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> a = <span class="num">1</span>; a &lt;= amount; a++) {
    <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> coins) {
      <span class="kw">if</span> (c &lt;= a)
        dp[a] = Math.min(dp[a], dp[a - c] + <span class="num">1</span>);
    }
  }
  <span class="kw">return</span> dp[amount] === Infinity ? -<span class="num">1</span> : dp[amount];
}`

  const lcsCode = `<span class="kw">function</span> <span class="fn">lcs</span>(s1: string, s2: string): number {
  <span class="kw">const</span> m = s1.length, n = s2.length;
  <span class="kw">const</span> dp: number[][] = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt;= m; i++) dp.push(<span class="kw">new</span> Array(n + <span class="num">1</span>).fill(<span class="num">0</span>));
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i &lt;= m; i++) {
    <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">1</span>; j &lt;= n; j++) {
      <span class="kw">if</span> (s1[i-<span class="num">1</span>] === s2[j-<span class="num">1</span>])
        dp[i][j] = dp[i-<span class="num">1</span>][j-<span class="num">1</span>] + <span class="num">1</span>;
      <span class="kw">else</span>
        dp[i][j] = Math.max(dp[i-<span class="num">1</span>][j], dp[i][j-<span class="num">1</span>]);
    }
  }
  <span class="kw">return</span> dp[m][n];
}`

  return (
    <div>
      <div className="page-eyebrow">Algorithms</div>
      <h1 className="page-title">Dynamic Programming</h1>
      <p className="page-desc">
        Plain recursion on an overlapping-subproblems problem recomputes the same answer
        exponentially many times — naive Fibonacci(30) calls Fibonacci(2) over a million times.
        DP is just recursion with a memory: cache each subproblem&apos;s answer once. Memoization
        (top-down) is recursion + cache — computed lazily, easy to write straight from the
        recurrence, but risks stack overflow on deep recursion. Tabulation (bottom-up) fills an
        array in dependency order — always computes every state, but lets you drop dimensions for
        less space. Identify the state (what uniquely describes a subproblem) and the transition
        (how it&apos;s built from smaller ones) — that&apos;s the entire skill.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">DP Framework</div>
          <div className="problems-list">
            {[
              ["1. Recognize overlapping subproblems", "Same sub-problem solved multiple times? → DP candidate"],
              ["2. Define the state",                  "What variables uniquely identify a subproblem? dp[i], dp[i][j]..."],
              ["3. Write the recurrence",              "dp[i] = f(dp[i-1], dp[i-2], ...). Think small → big."],
              ["4. Base cases",                        "dp[0], dp[1], or dp[0][0]. Simplest answers."],
              ["5. Order of computation",              "Bottom-up: fill table so deps are already computed. (Top-down: recursion handles the order automatically — you just cache.)"],
            ].map(([step, desc]) => (
              <div key={step} className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#22c55e" }}>{step}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Common Patterns</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["1D DP — Linear",      "dp[i] depends on dp[i-1] or dp[i-2]. Fibonacci, climbing stairs, house robber."],
              ["2D DP — Grid",        "dp[i][j] from dp[i-1][j] + dp[i][j-1]. Unique paths, edit distance, LCS."],
              ["0/1 Knapsack",        "For each item: skip it (carry forward the row above) or take it (add its value, spend its weight from a smaller subproblem). Try both, keep the max — each item used at most once."],
              ["Unbounded Knapsack",  "Same item can be used many times. Coin change, combination sum."],
              ["Interval DP",         "The subproblem is a contiguous range; try every position as the 'last thing that happens' in that range (last balloon burst, last matrix multiplied) — whatever's on each side was already solved independently."],
              ["Greedy",              "Make the locally-best choice and never revisit it — no table, no subproblem cache. Only valid when an exchange argument holds: swapping in the greedy choice never makes the final answer worse. See Common Traps for exactly where this breaks."],
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
        <div className="card-title">Common Traps</div>
        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--text)" }}>Greedy vs. DP:</strong> greedy only works when
          the locally-best choice is always part of some globally-best solution (true for Jump
          Game&apos;s reachability check) — it fails the moment an early greedy pick can block a
          better later combination, e.g. coins [1,3,4] for amount 6: greedy picks 4+1+1 (3 coins),
          optimal is 3+3 (2 coins).
          <br /><br />
          <strong style={{ color: "var(--text)" }}>Overlapping subproblems isn&apos;t enough on
          its own</strong> — you also need optimal substructure: the global optimum has to be
          buildable from optimal answers to subproblems. That requirement is why DP works for
          shortest-path-with-no-negative-cycles but breaks once negative cycles exist.
          <br /><br />
          <strong style={{ color: "var(--text)" }}>State design bugs:</strong> if two different
          scenarios collapse into the same <code>dp[i]</code> but need different answers, your
          state is missing a dimension — that&apos;s the most common reason a DP solution runs
          without error but returns the wrong number.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Templates</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Coin Change — O(n·amount)</div>
            <CodeBlock html={coinCode} style={{ fontSize: 11 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>LCS — O(m·n)</div>
            <CodeBlock html={lcsCode} style={{ fontSize: 11 }} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Coin Change — filling dp[0..6], coins=[1,2,5], amount=6</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              dp[0]=0 (base case: 0 coins for amount 0). dp[1]=1 (one 1-coin). dp[2]=1 (one 2-coin,
              cheaper than two 1-coins). dp[3]=2 (1+2). dp[4]=2 (2+2). dp[5]=1 (one 5-coin — jumps
              back down even though dp[4] was 2, because dp[a] only ever looks at dp[a-c] for each
              coin c, not at dp[a-1]). dp[6]=2 (5+1, found via dp[6-5]=dp[1]=1, plus the 5-coin
              itself). Full array: [0,1,1,2,2,1,2]. State = &quot;remaining amount&quot; — that
              single number is all you need to decide what to do next, you don&apos;t care which
              coins you&apos;ve already used to get there.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>LCS — filling the table, s1=&quot;abcde&quot;, s2=&quot;ace&quot;</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              Row for s1[0]=&apos;a&apos;: matches s2[0]=&apos;a&apos; → dp[1][1]=1, then carries
              forward (no more matches in this row) → 1,1,1. Row for s1[2]=&apos;c&apos;: matches
              s2[1]=&apos;c&apos; → dp[3][2]=dp[2][1]+1=1+1=2. Row for s1[4]=&apos;e&apos;: matches
              s2[2]=&apos;e&apos; → dp[5][3]=dp[4][2]+1=2+1=3 — the final answer. Every match adds
              1 to the diagonal predecessor; every mismatch just carries forward the better of the
              cell above or to the left. Notice each row only ever reads the row directly above it
              — once row i is computed, row i-2 is dead. That&apos;s why this 2D table can be
              collapsed to two 1D arrays (or even one, updated carefully): O(m·n) time stays the
              same, but space drops from O(m·n) to O(n).
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Gas Station — greedy restart, gas=[1,2,3,4,5], cost=[3,4,5,1,2]</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              i=0: diff=1-3=-2, tank=-2&lt;0 → this start (and every station up to and including 0)
              can&apos;t work, restart at start=1, tank=0. i=1: diff=-2, tank=-2&lt;0 → start=2.
              i=2: diff=-2, tank=-2&lt;0 → start=3. i=3: diff=4-1=3, tank=3 (no reset). i=4:
              diff=5-2=3, tank=6. Loop ends with total=0 (not negative, so a valid start exists) →
              return start=3. Skipping stations 0,1,2 without individually re-checking them is
              valid because a negative tank at i proves every station from the current start
              through i is disqualified together — none of them could have reached i+1 either.
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
