const PATTERN_TIME_CLASS: Record<string, string> = {
  "O(1)": "time-good",
  "O(log n)": "time-good",
  "O(n)": "time-good",
  "O(n log n)": "time-ok",
  "O(n²)": "time-ok",
  "O(V + E)": "time-ok",
  "O(n·m)": "time-ok",
}

export default function ComplexityPage() {
  return (
    <div>
      <div className="page-eyebrow">Fundamentals</div>
      <h1 className="page-title">Big O / Complexity</h1>
      <p className="page-desc">
        Big O describes how the number of operations grows as input size n grows — it says nothing
        about raw speed on a given machine. Every other topic page&apos;s complexity column assumes
        this notation, so read this one first. Know these cold before touching a single problem.
      </p>

      {/* Complexity hierarchy */}
      <div className="card">
        <div className="card-title">Complexity Hierarchy (best → worst)</div>
        <table className="complexity-table">
          <thead>
            <tr>
              <th>Notation</th>
              <th>Name</th>
              <th>n = 1,000</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["O(1)",       "Constant",       "1",          "Hash lookup, array index", "time-good"],
              ["O(log n)",   "Logarithmic",    "~10",        "Binary search",            "time-good"],
              ["O(n)",       "Linear",         "1,000",      "Single loop",              "time-good"],
              ["O(n log n)", "Linearithmic",   "~10,000",    "Merge sort, heap sort",    "time-ok"  ],
              ["O(n²)",      "Quadratic",      "1,000,000",  "Nested loops, bubble sort","time-ok"  ],
              ["O(2ⁿ)",      "Exponential",    "2¹⁰⁰⁰ ≈ ∞", "Naive recursion, subsets", "time-bad" ],
              ["O(n!)",      "Factorial",      "impossible", "Permutations",             "time-bad" ],
            ].map(([n, name, ops, ex, cls]) => (
              <tr key={n}>
                <td className={`op ${cls}`} style={{ fontWeight: 700 }}>{n}</td>
                <td>{name}</td>
                <td className={cls as string}>{ops}</td>
                <td style={{ color: "var(--muted)" }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--muted)", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
          <strong style={{ color: "var(--text)" }}>Worked trace:</strong> linear search over 4 items takes ≤4 comparisons.
          Checking every pair (nested loop) over the same 4 items takes 4×4=16. Same shape, just scaled —
          at n=1,000 that gap is 1,000 vs 1,000,000 (the column above).
          <br /><br />
          <strong style={{ color: "var(--text)" }}>Read the colors as growth rate, not raw speed:</strong> for small n,
          a low-overhead O(n²) loop can outrun a high-overhead O(n log n) sort. O(1) means the work doesn&apos;t grow
          with n — it does not mean instant.
        </div>
      </div>

      <div className="two-col">
        {/* Rules */}
        <div className="card">
          <div className="card-title">Simplification Rules</div>
          <div className="problems-list">
            {[
              ["Drop constants",      "O(2n) → O(n)",             "Constants don't scale"],
              ["Drop lower terms",    "O(n² + n) → O(n²)",        "Dominated by highest term"],
              ["Different variables", "O(n·m) stays as O(n·m)",   "Two independent inputs"],
              ["Sequential steps",    "A then B → O(A+B)",        "One after another, not nested"],
              ["Nested steps",        "A inside B → O(A·B)",      "Each A iteration runs all of B"],
            ].map(([rule, ex, note]) => (
              <div key={rule} className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                <div style={{ fontWeight: 700, fontSize: 12, fontFamily: "var(--font-mono)", color: "#c4b5fd" }}>{rule}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)" }}>{ex}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Space complexity */}
        <div className="card">
          <div className="card-title">Space Complexity</div>
          <div className="problems-list">
            {[
              ["Call stack (recursion)",   "O(n) per frame depth"],
              ["Array / list of n",        "O(n)"],
              ["2D matrix n×n",            "O(n²)"],
              ["Hash map of n pairs",      "O(n)"],
              ["In-place modification",    "O(1) extra space"],
              ["Dynamic array push (end)", "O(1) amortized — occasional O(n) resize"],
              ["Tail recursion",           "O(1) only if the engine optimizes it (V8/Node don't)"],
            ].map(([item, val]) => (
              <div key={item} className="problem-row">
                <span className="problem-name" style={{ fontSize: 12 }}>{item}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#22c55e" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common patterns cheatsheet */}
      <div className="card">
        <div className="card-title">Complexity by Pattern</div>
        <table className="complexity-table">
          <thead>
            <tr><th>Pattern</th><th>Time</th><th>Space</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {[
              ["Single loop",          "O(n)",       "O(1)",     ""],
              ["Nested loops",         "O(n²)",      "O(1)",     "Same array"],
              ["Binary search",        "O(log n)",   "O(1)",     "Sorted input; O(1) iterative, O(log n) recursive (call stack)"],
              ["BFS / DFS (graph)",    "O(V + E)",   "O(V)",     "V=vertices, E=edges"],
              ["Merge sort",           "O(n log n)", "O(n)",     "Stable"],
              ["Quick sort",           "O(n log n)", "O(log n)", "Avg; worst O(n²) time, O(n) space"],
              ["Hash table ops",       "O(1)",       "O(n)",     "Avg; worst O(n)"],
              ["Heap push/pop",        "O(log n)",   "O(n)",     ""],
              ["DP (memoization)",     "O(n·m)",     "O(n·m)",   "Varies by state; often reducible to O(n) via rolling array"],
              ["Two pointers",         "O(n)",       "O(1)",     "Sorted or countable"],
              ["Sliding window",       "O(n)",       "O(k)",     "k = window size"],
            ].map(([p, t, s, n]) => (
              <tr key={p}>
                <td className="op">{p}</td>
                <td className={PATTERN_TIME_CLASS[t] ?? ""}>{t}</td>
                <td style={{ color: "var(--muted)" }}>{s}</td>
                <td style={{ color: "var(--muted)", fontSize: 11 }}>{n}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--muted)", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
          Rows with two complexities (e.g. &quot;Avg O(1); worst O(n)&quot;) describe <strong style={{ color: "var(--text)" }}>one
          algorithm analyzed under different assumptions about the input</strong>, not two different algorithms —
          always state which case you mean out loud in an interview.
        </div>
      </div>
    </div>
  )
}
