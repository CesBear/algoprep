import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/strings"

export default function StringsPage() {
  const problems = [
    { name: "Valid Anagram",              diff: "Easy",   tags: ["hash map", "sort"],             href: "https://leetcode.com/problems/valid-anagram/" },
    { name: "Valid Palindrome",           diff: "Easy",   tags: ["two pointers"],                 href: "https://leetcode.com/problems/valid-palindrome/" },
    { name: "Longest Common Prefix",      diff: "Easy",   tags: ["string"],                       href: "https://leetcode.com/problems/longest-common-prefix/" },
    { name: "String to Integer (atoi)",   diff: "Medium", tags: ["string", "math"],               href: "https://leetcode.com/problems/string-to-integer-atoi/" },
    { name: "Longest Substring No Repeat",diff: "Medium", tags: ["sliding window", "hash map"],   href: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { name: "Longest Palindromic Substring",diff:"Medium",tags: ["expand around center"],         href: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { name: "Group Anagrams",             diff: "Medium", tags: ["hash map", "sort"],             href: "https://leetcode.com/problems/group-anagrams/" },
    { name: "Encode & Decode Strings",    diff: "Medium", tags: ["design", "premium"],            href: "https://leetcode.com/problems/encode-and-decode-strings/" },
    { name: "Find All Anagrams in String",diff: "Medium", tags: ["sliding window"],               href: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
    { name: "Minimum Window Substring",   diff: "Hard",   tags: ["sliding window", "hash map"],   href: "https://leetcode.com/problems/minimum-window-substring/" },
  ]

  const slideCode = `<span class="kw">function</span> <span class="fn">longestNoRepeat</span>(s: string): number {
  <span class="kw">const</span> seen = <span class="kw">new</span> Map&lt;string, number&gt;();
  <span class="kw">let</span> left = <span class="num">0</span>, best = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> right = <span class="num">0</span>; right &lt; s.length; right++) {
    <span class="kw">const</span> ch = s[right];
    <span class="kw">if</span> (seen.has(ch) &amp;&amp; seen.get(ch)! &gt;= left)
      left = seen.get(ch)! + <span class="num">1</span>;  <span class="cm">// stale index check</span>
    seen.set(ch, right);
    best = Math.max(best, right - left + <span class="num">1</span>);
  }
  <span class="kw">return</span> best;
}`

  return (
    <div>
      <div className="page-eyebrow">Linear Structures</div>
      <h1 className="page-title">Strings</h1>
      <p className="page-desc">
        Most string problems boil down to one question: which characters have I seen, and where?
        Answering that cheaply — instead of re-scanning — is what every pattern below is for.
        Strings are also immutable in JS/TS, so every <code>+=</code> or <code>.slice()</code>
        builds a brand-new string rather than mutating in place; that one fact explains both the
        sliding-window pattern (avoid re-scanning by tracking a window incrementally) and the
        concatenation trap below (avoid rebuilding the whole string on every loop iteration).
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Operations Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Access char",       "O(1)"],
                ["Length",            "O(1)"],
                ["Concatenation",     "O(n)  — creates new string"],
                ["Substring (slice)", "O(k)  — k = slice length"],
                ["Search (contains)", "O(n·m) — naive substring search"],
                ["Replace",           "O(n)"],
                ["Split",             "O(n)"],
              ].map(([op, t]) => (
                <tr key={op}><td className="op">{op}</td><td style={{ color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{t}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">Key Techniques</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Char Frequency Map",        "Counter/dict of char→count, O(n) build + O(1) lookup. charCodeAt(c) - 97 turns 'a'..'z' into array index 0..25 when you know the input is lowercase-only; otherwise use a Map."],
              ["Sliding Window",            "Expand right; only pull left forward when the duplicate's last-seen index is ≥ left (a stale match outside the window must not shrink it). Works on input in its original order — no sorting required."],
              ["Two Pointers (Palindrome)", "l=0, r=n-1; compare chars moving inward. Also order-only, not a sorted-array technique — that's a different two-pointer use case (e.g. Two Sum II)."],
              ["Sort → Compare",            "Sort each string's chars into a canonical key: O(k log k) per string (k = string length), O(n·k log k) across n strings. Why it works: every anagram of a word sorts to the same key."],
              ["StringBuilder",             "s += char inside a loop allocates a new string and copies everything seen so far — O(n) work per iteration, O(n²) total over n iterations. Collect into an array and .join('') once for O(n) total."],
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
        <div className="card-title">Template — Sliding Window (variable)</div>
        <CodeBlock html={slideCode} />
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Sliding Window — the stale-index guard, on &quot;abba&quot;</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              right=0 &apos;a&apos;: not seen → left=0, seen[a]=0, best=1. right=1 &apos;b&apos;: not seen → left=0, seen[b]=1, best=2.
              right=2 &apos;b&apos;: seen[b]=1, and 1&gt;=left(0) → window has the duplicate, so left=2. best stays 2.
              right=3 &apos;a&apos;: seen[a]=0, but 0&gt;=left(2) is false — that &apos;a&apos; was seen before the window even
              started, it&apos;s stale. left stays 2. Without the <code>{`>= left`}</code> guard you&apos;d set left=seen[a]+1=1,
              moving left backward and letting the window re-include the duplicate &apos;b&apos; at index 2. Final best=2
              (&quot;ab&quot; or &quot;ba&quot;) — correct only because the guard rejected the stale match.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Expand Around Center — the off-by-one in &quot;cbbd&quot;</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              Centering on the &quot;bb&quot; gap (l=1, r=2): l===1,r===2 match → l=0,r=3. s[0]=&apos;c&apos;, s[3]=&apos;d&apos;
              don&apos;t match → loop stops. The <em>while</em> condition always overshoots by one step on each side
              before failing, so the matched span isn&apos;t r-l+1 — it&apos;s <code>{`r - l - 1`}</code> = 3-0-1 = 2,
              i.e. s.slice(l+1, r) = s.slice(1,3) = &quot;bb&quot;. Forgetting the -1 is the most common bug in this pattern.
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
