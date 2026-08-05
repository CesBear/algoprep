import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/tries"

export default function TriesPage() {
  const problems = [
    { name: "Implement Trie (Prefix Tree)",              diff: "Medium", tags: ["design"],              href: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
    { name: "Design Add and Search Words Data Structure", diff: "Medium", tags: ["dfs", "wildcard"],     href: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
    { name: "Word Search II",                             diff: "Hard",   tags: ["backtracking", "prune"], href: "https://leetcode.com/problems/word-search-ii/" },
    { name: "Replace Words",                              diff: "Medium", tags: ["prefix match"],        href: "https://leetcode.com/problems/replace-words/" },
  ]

  const trieCode = `<span class="kw">class</span> <span class="fn">TrieNode</span> {
  children = <span class="kw">new</span> Map&lt;string, TrieNode&gt;();
  isEnd = <span class="kw">false</span>;
}

<span class="kw">function</span> <span class="fn">insert</span>(root: TrieNode, word: string): <span class="kw">void</span> {
  <span class="kw">let</span> node = root;
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> word) {
    <span class="kw">if</span> (!node.children.has(ch)) node.children.set(ch, <span class="kw">new</span> TrieNode());
    node = node.children.get(ch)!;
  }
  node.isEnd = <span class="kw">true</span>;
}

<span class="kw">function</span> <span class="fn">search</span>(root: TrieNode, word: string): boolean {
  <span class="kw">let</span> node = root;
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> word) {
    <span class="kw">const</span> next = node.children.get(ch);
    <span class="kw">if</span> (!next) <span class="kw">return</span> <span class="kw">false</span>;
    node = next;
  }
  <span class="kw">return</span> node.isEnd;
}`

  return (
    <div>
      <div className="page-eyebrow">Non-Linear</div>
      <h1 className="page-title">Trie / Prefix Tree</h1>
      <p className="page-desc">
        A tree where each edge is one character and each path from the root spells a prefix —
        siblings that share a prefix share the same nodes. That sharing is the whole point: it
        turns &quot;does any word start with this prefix?&quot; into a single O(L) walk instead of scanning
        every word, which is why tries show up wherever autocomplete, spell-check, or IP routing
        need fast prefix lookups.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["Insert word",     "O(L)",     "L = word length"],
                ["Search word",     "O(L)",     "Exact match, checks isEnd"],
                ["StartsWith",      "O(L)",     "Same walk, skips the isEnd check"],
                ["Space",           "O(N·L)",   "N words of length L, worst case no shared prefixes"],
              ].map(([op, t, n]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className="time-good">{t}</td>
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
              ["Node shape",         "children: Map<char, TrieNode> + a marker (isEnd, or a word/count field) on the node that completes a stored entry."],
              ["isEnd vs. exists",   "Walking to a node that exists only proves the prefix exists — you still need isEnd (or equivalent) to know a word actually ends there, not just passes through."],
              ["Wildcard search",    "A '.' in the query means branch into every child instead of following one — DFS over children.values() when you hit it."],
              ["Trie-pruned DFS",    "Word Search II: walk the board and the trie together. If the current cell's letter has no matching trie child, that whole board branch is dead — prune instead of building the string first and checking after."],
              ["Shortest-prefix match", "Replace Words: walk the trie one character at a time and stop at the first isEnd — that's the shortest dictionary root, which is what you want to keep the replacement minimal."],
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
        <div className="card-title">Template — Insert / Search</div>
        <CodeBlock html={trieCode} />
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>Trace:</strong> insert &quot;cat&quot;,
          &quot;car&quot;, &quot;dog&quot;. The first two share the path root→c→a, then split into
          →t and →r; &quot;dog&quot; starts a separate root→d→o→g path. search(&quot;car&quot;)
          walks c→a→r and finds isEnd=true → true. search(&quot;ca&quot;) walks c→a and reaches a
          real node — but that node&apos;s isEnd is false (nothing was ever inserted stopping at
          &quot;ca&quot;) → false. That distinction is exactly what separates search() from
          startsWith().
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Design Add and Search Words — wildcard</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              Dictionary has &quot;bad&quot;, &quot;dad&quot;, &quot;mad&quot;. search(&quot;.ad&quot;):
              at i=0 the char is &apos;.&apos;, so branch into all three root children (b, d, m).
              Each branch then matches &apos;a&apos; then &apos;d&apos; exactly and hits isEnd — the
              first branch that succeeds returns true immediately, so this is true without needing
              to try all three if the first one matches.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Replace Words</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              dictionary=[&quot;cat&quot;,&quot;bat&quot;,&quot;rat&quot;], sentence=&quot;the
              cattle was rattled by the battery&quot;. For &quot;cattle&quot;: walk c→a→t, hit
              isEnd at i=2 → return &quot;cat&quot; immediately, ignoring the remaining
              &quot;tle&quot;. &quot;battery&quot; → &quot;bat&quot;, &quot;rattled&quot; →
              &quot;rat&quot;. Result: &quot;the cat was rat by the bat&quot;.
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
