import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/sliding-window"

export default function SlidingWindowPage() {
  const problems = [
    { name: "Best Time to Buy & Sell Stock",      diff: "Easy",   tags: ["sliding window"],          href: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { name: "Longest Substring Without Repeating Characters", diff: "Medium", tags: ["hash map", "variable"], href: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { name: "Longest Repeating Character Replacement", diff: "Medium", tags: ["hash map", "variable"], href: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
    { name: "Permutation in String",              diff: "Medium", tags: ["hash map", "fixed"],       href: "https://leetcode.com/problems/permutation-in-string/" },
    { name: "Find All Anagrams in a String",      diff: "Medium", tags: ["hash map", "fixed"],       href: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
    { name: "Minimum Window Substring",           diff: "Hard",   tags: ["hash map", "variable"],    href: "https://leetcode.com/problems/minimum-window-substring/" },
    { name: "Sliding Window Maximum",             diff: "Hard",   tags: ["deque", "monotonic"],      href: "https://leetcode.com/problems/sliding-window-maximum/" },
    { name: "Max Consecutive Ones III",           diff: "Medium", tags: ["variable", "at most K"],   href: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
    { name: "Fruit Into Baskets",                 diff: "Medium", tags: ["at most 2 distinct"],      href: "https://leetcode.com/problems/fruit-into-baskets/" },
  ]

  const variableCode = `<span class="kw">function</span> <span class="fn">longestValid</span>(s: string, k: number): number {
  <span class="kw">const</span> counts = <span class="kw">new</span> Map&lt;string, number&gt;();
  <span class="kw">let</span> left = <span class="num">0</span>, best = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> right = <span class="num">0</span>; right &lt; s.length; right++) {
    <span class="kw">const</span> ch = s[right];
    counts.set(ch, (counts.get(ch) ?? <span class="num">0</span>) + <span class="num">1</span>);
    <span class="cm">// shrink while window violates constraint</span>
    <span class="kw">while</span> (notValid(counts, k)) {
      <span class="kw">const</span> lch = s[left];
      counts.set(lch, counts.get(lch)! - <span class="num">1</span>);
      <span class="kw">if</span> (counts.get(lch) === <span class="num">0</span>) counts.delete(lch);
      left++;
    }
    best = Math.max(best, right - left + <span class="num">1</span>);
  }
  <span class="kw">return</span> best;
}`

  const minWindowCode = `<span class="kw">function</span> <span class="fn">minWindow</span>(s: string, t: string): string {
  <span class="kw">const</span> need = <span class="kw">new</span> Map&lt;string, number&gt;();
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> t) need.set(c, (need.get(c) ?? <span class="num">0</span>) + <span class="num">1</span>);
  <span class="kw">let</span> have = <span class="num">0</span>, total = need.size;
  <span class="kw">const</span> window = <span class="kw">new</span> Map&lt;string, number&gt;();
  <span class="kw">let</span> res = <span class="str">""</span>, lo = <span class="num">0</span>;
  <span class="kw">for</span> (<span class="kw">let</span> hi = <span class="num">0</span>; hi &lt; s.length; hi++) {
    <span class="kw">const</span> c = s[hi];
    window.set(c, (window.get(c) ?? <span class="num">0</span>) + <span class="num">1</span>);
    <span class="kw">if</span> (need.has(c) &amp;&amp; window.get(c) === need.get(c)) have++;
    <span class="kw">while</span> (have === total) {
      <span class="kw">if</span> (!res || hi - lo + <span class="num">1</span> &lt; res.length) res = s.slice(lo, hi + <span class="num">1</span>);
      <span class="kw">const</span> lc = s[lo];
      window.set(lc, window.get(lc)! - <span class="num">1</span>);
      <span class="kw">if</span> (need.has(lc) &amp;&amp; window.get(lc)! &lt; need.get(lc)!) have--;
      lo++;
    }
  }
  <span class="kw">return</span> res;
}`

  return (
    <div>
      <div className="page-eyebrow">Core Techniques</div>
      <h1 className="page-title">Sliding Window</h1>
      <p className="page-desc">
        Checking every subarray re-examines elements you&apos;ve already looked at; sliding window
        reuses the previous window&apos;s work instead of restarting. Maintain a window [left, right]:
        left and right each only ever move forward, so each is processed at most once → O(n), not
        O(n²). The one thing that makes shrinking correct: the constraint has to be monotonic in
        window size — growing the window can only make a violation worse, never fix it, so once
        invalid you just shrink until valid again. (&quot;Exactly K&quot; constraints aren&apos;t
        monotonic this way — see the &quot;At most K&quot; trick below.)
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Fixed vs Variable Window</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["Fixed size (k)",   "Maintain window of exactly k. Window is valid once right >= k-1 — common bug: using right-k instead of right-k+1 for the size check."],
              ["Variable size",    "Expand right freely, shrink left until valid. Longest/shortest substring with constraint."],
              ["At most K",        "count(at most K distinct) - count(at most K-1 distinct) = count(exactly K). Needed because 'exactly K' isn't monotonic — shrinking a valid exactly-K window makes it invalid, not closer to valid, so direct shrink logic can't be used."],
              ["Frequency map",    "Track character counts inside window. Anagram / permutation problems."],
            ].map(([name, desc]) => (
              <div key={name} className="pattern-chip">
                <div className="pattern-chip-name">{name}</div>
                <div className="pattern-chip-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Decision Checklist</div>
          <div className="problems-list">
            {[
              ["Contiguous subarray / substring?",  "→ Sliding window candidate"],
              ["Find longest with constraint?",       "→ Variable window, expand & shrink"],
              ["Find shortest with constraint?",      "→ Variable window, shrink aggressively"],
              ["Fixed window size k given?",          "→ Fixed window"],
              ["Anagram / permutation match?",        "→ Fixed window + freq map"],
              ["Max/min inside window?",              "→ Monotonic deque (count/frequency shrinking doesn't track a running max — the deque evicts elements that can never be the max again)"],
            ].map(([cond, act]) => (
              <div key={cond} className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                <div style={{ fontSize: 12, color: "var(--text)" }}>{cond}</div>
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "#22c55e" }}>{act}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Templates</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Variable window — longest valid</div>
            <CodeBlock html={variableCode} style={{ fontSize: 11 }} />
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
              <code>notValid</code> is a stand-in for whatever constraint your problem defines
              (e.g. <code>counts.size &gt; k</code>) — swap it in per problem.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Min window substring</div>
            <CodeBlock html={minWindowCode} style={{ fontSize: 11 }} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Variable Window — at most 2 distinct, on &quot;abcba&quot;</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              right=0 (&apos;a&apos;): counts={"{a:1}"}, valid (1 distinct) → best=1. right=1 (&apos;b&apos;):
              counts={"{a:1,b:1}"}, valid (2 distinct) → best=2. right=2 (&apos;c&apos;): counts=
              {"{a:1,b:1,c:1}"}, now 3 distinct — invalid, so shrink: remove s[left=0]=&apos;a&apos; →
              counts={"{b:1,c:1}"}, left=1, valid again → best stays 2 (window size 2). right=3
              (&apos;b&apos;): counts={"{b:2,c:1}"}, still 2 distinct, valid → best=3 (window
              [1,3]=&quot;bcb&quot;). right=4 (&apos;a&apos;): counts={"{b:2,c:1,a:1}"}, 3 distinct —
              shrink until valid: remove &apos;b&apos; (left=2) → counts={"{b:1,c:1,a:1}"} still 3
              distinct, remove &apos;c&apos; (left=3) → counts={"{b:1,a:1}"}, valid → best stays 3. Final
              best=3. Each shrink only ever removes elements, never adds — that&apos;s why the window
              size check after the shrink loop is always safe.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Min Window Substring — the have/total trick, on s=&quot;ADOBECODEBANC&quot;, t=&quot;ABC&quot;</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              need={"{A:1,B:1,C:1}"}, total=3 (3 distinct chars needed — not 3 total chars). have
              only increments the moment a character&apos;s window count first reaches its needed
              count, so have ticks 0→1→2→3 exactly once per satisfied character instead of
              re-comparing the whole map every iteration. Once have===total the window already
              contains a full t — that&apos;s the cue to start shrinking from the left and record the
              window only while it stays valid. First valid window: &quot;ADOBEC&quot; (length 6).
              Later, once have hits total again, the window improves to &quot;EBANC&quot; (length 5)
              and then immediately to &quot;BANC&quot; (length 4) on the very next shrink step —
              both improvements come from continuing to shrink left while have still equals total,
              not from finding a brand-new window from scratch.
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
