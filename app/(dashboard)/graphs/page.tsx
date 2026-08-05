import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/graphs"

export default function GraphsPage() {
  const problems = [
    { name: "Number of Islands",           diff: "Medium", tags: ["BFS", "DFS", "union find"],    href: "https://leetcode.com/problems/number-of-islands/" },
    { name: "Max Area of Island",          diff: "Medium", tags: ["DFS"],                         href: "https://leetcode.com/problems/max-area-of-island/" },
    { name: "Clone Graph",                 diff: "Medium", tags: ["DFS", "hash map"],             href: "https://leetcode.com/problems/clone-graph/" },
    { name: "Pacific Atlantic Water Flow", diff: "Medium", tags: ["BFS", "DFS"],                  href: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
    { name: "Surrounded Regions",          diff: "Medium", tags: ["DFS", "boundary"],             href: "https://leetcode.com/problems/surrounded-regions/" },
    { name: "Course Schedule",             diff: "Medium", tags: ["topological", "cycle detect"], href: "https://leetcode.com/problems/course-schedule/" },
    { name: "Course Schedule II",          diff: "Medium", tags: ["topological sort"],            href: "https://leetcode.com/problems/course-schedule-ii/" },
    { name: "Number of Connected Components",diff:"Medium",tags: ["union find", "DFS", "premium"], href: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
    { name: "Graph Valid Tree",            diff: "Medium", tags: ["union find", "DFS", "premium"], href: "https://leetcode.com/problems/graph-valid-tree/" },
    { name: "Redundant Connection",        diff: "Medium", tags: ["union find"],                  href: "https://leetcode.com/problems/redundant-connection/" },
    { name: "Walls and Gates",             diff: "Medium", tags: ["multi-source BFS", "premium"], href: "https://leetcode.com/problems/walls-and-gates/" },
    { name: "Rotting Oranges",             diff: "Medium", tags: ["multi-source BFS"],            href: "https://leetcode.com/problems/rotting-oranges/" },
    { name: "Word Ladder",                 diff: "Hard",   tags: ["BFS", "shortest path"],        href: "https://leetcode.com/problems/word-ladder/" },
    { name: "Alien Dictionary",            diff: "Hard",   tags: ["topological sort", "premium"], href: "https://leetcode.com/problems/alien-dictionary/" },
    { name: "Network Delay Time",          diff: "Medium", tags: ["dijkstra", "weighted"],        href: "https://leetcode.com/problems/network-delay-time/" },
    { name: "Cheapest Flights Within K Stops", diff: "Medium", tags: ["bellman-ford", "weighted"], href: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
  ]

  const bfsCode = `<span class="kw">function</span> <span class="fn">bfs</span>(graph: number[][], start: number, target: number): number {
  <span class="kw">const</span> visited = <span class="kw">new</span> Set([start]);  <span class="cm">// mark on enqueue, not dequeue — else the same node can queue twice</span>
  <span class="kw">const</span> q: [number, number][] = [[start, <span class="num">0</span>]]; <span class="cm">// [node, dist]</span>
  <span class="kw">while</span> (q.length) {
    <span class="kw">const</span> [node, dist] = q.shift()!;
    <span class="kw">if</span> (node === target) <span class="kw">return</span> dist;
    <span class="kw">for</span> (<span class="kw">const</span> nei <span class="kw">of</span> graph[node]) {
      <span class="kw">if</span> (!visited.has(nei)) {
        visited.add(nei);
        q.push([nei, dist + <span class="num">1</span>]);
      }
    }
  }
  <span class="kw">return</span> -<span class="num">1</span>;
}`

  const topoCode = `<span class="kw">function</span> <span class="fn">topoSort</span>(n: number, edges: number[][]): number[] {
  <span class="kw">const</span> graph: number[][] = [];
  <span class="kw">const</span> indegree = <span class="kw">new</span> Array(n).fill(<span class="num">0</span>);
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) graph.push([]);
  <span class="kw">for</span> (<span class="kw">const</span> [u, v] <span class="kw">of</span> edges) {
    graph[u].push(v); indegree[v]++;
  }
  <span class="kw">const</span> q: number[] = [];
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) <span class="kw">if</span> (indegree[i] === <span class="num">0</span>) q.push(i);
  <span class="kw">const</span> order: number[] = [];
  <span class="kw">while</span> (q.length) {
    <span class="kw">const</span> node = q.shift()!; order.push(node);
    <span class="kw">for</span> (<span class="kw">const</span> nei <span class="kw">of</span> graph[node])
      <span class="kw">if</span> (--indegree[nei] === <span class="num">0</span>) q.push(nei);
  }
  <span class="kw">return</span> order.length === n ? order : [];
}`

  const dijkstraCode = `<span class="kw">function</span> <span class="fn">dijkstra</span>(graph: [number, number][][], src: number, n: number): number[] {
  <span class="kw">const</span> dist = <span class="kw">new</span> Array(n).fill(Infinity);
  dist[src] = <span class="num">0</span>;
  <span class="kw">const</span> heap: [number, number][] = [[<span class="num">0</span>, src]]; <span class="cm">// [distance, node]</span>
  <span class="cm">// ...siftUp/siftDown/push/pop omitted, see Heap / Priority Queue topic</span>
  <span class="kw">while</span> (heap.length) {
    <span class="kw">const</span> [d, node] = pop(heap);
    <span class="kw">if</span> (d &gt; dist[node]) <span class="kw">continue</span>; <span class="cm">// stale — a shorter path already won</span>
    <span class="kw">for</span> (<span class="kw">const</span> [nei, w] <span class="kw">of</span> graph[node]) {
      <span class="kw">const</span> nd = d + w;
      <span class="kw">if</span> (nd &lt; dist[nei]) { dist[nei] = nd; push(heap, [nd, nei]); }
    }
  }
  <span class="kw">return</span> dist;
}`

  return (
    <div>
      <div className="page-eyebrow">Non-Linear</div>
      <h1 className="page-title">Graphs</h1>
      <p className="page-desc">
        Graphs are trees that allow cycles and multiple parents — which is exactly why a visited
        set is mandatory here, not just bookkeeping: a tree never needs one because it has no
        cycles to loop on, but a graph without one can recurse forever. BFS for shortest path /
        level order, DFS for connectivity / cycle detection, topological sort for dependency
        ordering. Default representation: adjacency list (O(V+E) space, fast to iterate a
        node&apos;s neighbors) — reach for a matrix only when you need O(1) edge-existence checks on a dense
        graph.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Algorithm</th><th>Time</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["BFS",                "O(V + E)",      "O(V)"],
                ["DFS",                "O(V + E)",      "O(V)"],
                ["Topological Sort",   "O(V + E)",      "O(V)"],
                ["Union Find",         "O(α(n)) ≈ O(1)","O(n)"],
                ["Dijkstra (heap)",    "O((V+E) log V)","O(V)"],
                ["Bellman-Ford",       "O(V · E)",      "O(V)"],
              ].map(([a, t, s]) => (
                <tr key={a}>
                  <td className="op">{a}</td>
                  <td className={t === "O(V · E)" ? "time-ok" : "time-good"}>{t}</td>
                  <td style={{ color: "var(--muted)" }}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">Key Patterns</div>
          <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
            {[
              ["BFS — shortest path", "Queue + visited set. The queue always finishes one full distance-layer before starting the next, so the first time you reach a node is via the shortest path to it."],
              ["DFS — connectivity",  "Recursive or iterative (explicit stack). Mark visited on enqueue/push, not on dequeue/pop — marking late lets the same node queue twice via different paths."],
              ["Multi-source BFS",    "Start BFS from ALL sources simultaneously. Rotting oranges, walls & gates."],
              ["Topological Sort",    "Kahn's algo: nodes with in-degree 0 have no unprocessed dependency, so they're safe to output first — removing them lowers neighbors' in-degree. A cycle's nodes never reach in-degree 0, so order.length < n is the only signature a cycle leaves behind."],
              ["Union Find",          "find() flattens the path to the root as it walks up (path compression); union by size/rank always attaches the smaller tree under the bigger one's root so trees stay shallow. Together: O(α(n)) ≈ O(1) amortized merge/find."],
              ["Dijkstra's",          "Weighted shortest path, non-negative weights only. Pop the closest unvisited node from a min-heap, relax its neighbors, repeat — greedy because once popped, no later (longer) path can beat the one already found."],
              ["Bellman-Ford",        "Weighted shortest path that tolerates negative weights (not negative cycles). Relax every edge V-1 times; a K-stop limit just caps the relaxation rounds at K+1 instead of running to convergence."],
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
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>BFS (shortest path)</div>
            <CodeBlock html={bfsCode} style={{ fontSize: 11 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Topological Sort (Kahn&apos;s)</div>
            <CodeBlock html={topoCode} style={{ fontSize: 11 }} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Template — Dijkstra&apos;s (weighted shortest path)</div>
        <CodeBlock html={dijkstraCode} />
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          Same shape as the heap templates on the Heap / Priority Queue page — this is that
          min-heap used to always expand the currently-closest unvisited node next, which is what
          makes it greedy-correct as long as no edge weight is negative.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Traces</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>BFS — ring expansion, graph 0-1, 0-2, 1-3, 2-3, 3-4, start=0, target=4</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              visited={"{0}"}, queue=[(0,0)]. Pop (0,0): not target, push neighbors 1 and 2 at
              dist 1 → visited={"{0,1,2}"}, queue=[(1,1),(2,1)]. Pop (1,1): not target, 0 already
              visited, push 3 at dist 2 → queue=[(2,1),(3,2)]. Pop (2,1): not target, 0 and 3
              already visited, nothing new pushed → queue=[(3,2)]. Pop (3,2): not target, push 4
              at dist 3 → queue=[(4,3)]. Pop (4,3): node===target → return 3. Notice the queue
              processed ring 0={"{0}"}, then all of ring 1={"{1,2}"}, then ring 2={"{3}"}, then
              ring 3={"{4}"} — every node at distance d is dequeued before any node at distance
              d+1 is even looked at, which is the entire reason the first arrival is the shortest.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Topological Sort — in-degree draining, n=4, edges 0→1, 0→2, 1→3, 2→3</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              in-degree: [0,1,1,2]. Only node 0 starts at in-degree 0, so queue=[0]. Pop 0: order=
              [0]; node 1&apos;s in-degree drops to 0 (push it), node 2&apos;s drops to 0 (push it)
              → queue=[1,2]. Pop 1: order=[0,1]; node 3&apos;s in-degree drops 2→1, not 0 yet, not
              pushed. Pop 2: order=[0,1,2]; node 3&apos;s in-degree drops 1→0, push it. Pop 3:
              order=[0,1,2,3]. order.length=4===n → valid order. Now the cycle case: n=3, edges
              0→1, 1→2, 2→0. in-degree: [1,1,1] — every node has an unprocessed dependency, so the
              queue starts <strong>empty</strong> and order never grows past []. order.length
              (0) !== n (3) → returns [] immediately. The cycle didn&apos;t need a separate check;
              it just never produced any in-degree-0 node to begin with.
            </div>
          </div>
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Dijkstra — Network Delay Time, edges 2→1(1), 2→3(1), 3→4(1), start=2</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              dist[2]=0, heap=[(0,2)]. Pop (0,2): relax 1 (dist[1]=1) and 3 (dist[3]=1), push both
              → heap=[(1,1),(1,3)]. Pop (1,1): node 1 has no outgoing edges, nothing relaxes. Pop
              (1,3): relax 4 (dist[4]=1+1=2), push it → heap=[(2,4)]. Pop (2,4): no outgoing edges.
              Heap empty, done. dist=[1,0,1,2] for nodes [1,2,3,4] — the answer is the max of
              those, 2 (how long until the <em>last</em> node hears the signal).
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
