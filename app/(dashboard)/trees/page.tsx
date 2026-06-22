import CodeBlock from "@/components/CodeBlock"
import ProblemList from "@/components/ProblemList"
import solutions from "@/lib/solutions/trees"

export default function TreesPage() {
  const problems = [
    { name: "Invert Binary Tree",              diff: "Easy",   tags: ["DFS", "BFS"],              href: "https://leetcode.com/problems/invert-binary-tree/" },
    { name: "Maximum Depth of Binary Tree",    diff: "Easy",   tags: ["DFS", "recursion"],        href: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { name: "Same Tree",                       diff: "Easy",   tags: ["DFS"],                     href: "https://leetcode.com/problems/same-tree/" },
    { name: "Subtree of Another Tree",         diff: "Easy",   tags: ["DFS"],                     href: "https://leetcode.com/problems/subtree-of-another-tree/" },
    { name: "Balanced Binary Tree",            diff: "Easy",   tags: ["DFS", "post-order"],       href: "https://leetcode.com/problems/balanced-binary-tree/" },
    { name: "Diameter of Binary Tree",         diff: "Easy",   tags: ["DFS", "post-order"],       href: "https://leetcode.com/problems/diameter-of-binary-tree/" },
    { name: "Lowest Common Ancestor (BST)",    diff: "Medium", tags: ["BST", "recursion"],        href: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    { name: "Binary Tree Level Order (BFS)",   diff: "Medium", tags: ["BFS", "queue"],            href: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { name: "Validate BST",                    diff: "Medium", tags: ["DFS", "bounds"],           href: "https://leetcode.com/problems/validate-binary-search-tree/" },
    { name: "Kth Smallest in BST",             diff: "Medium", tags: ["inorder", "BST", "iterative"], href: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
    { name: "Construct Tree from Pre+Inorder", diff: "Medium", tags: ["divide & conquer"],        href: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
    { name: "Max Path Sum",                    diff: "Hard",   tags: ["DFS", "post-order"],       href: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { name: "Serialize / Deserialize BTree",   diff: "Hard",   tags: ["BFS", "design"],           href: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
  ]

  const dfsCode = `<span class="kw">function</span> <span class="fn">inorder</span>(root: TreeNode | <span class="kw">null</span>, out: number[] = []): number[] { <span class="cm">// sorted BST values</span>
  <span class="kw">if</span> (!root) <span class="kw">return</span> out;
  inorder(root.left, out);
  out.push(root.val);  <span class="cm">// visit</span>
  inorder(root.right, out);
  <span class="kw">return</span> out;
}

<span class="kw">function</span> <span class="fn">maxDepth</span>(root: TreeNode | <span class="kw">null</span>): number {
  <span class="kw">if</span> (!root) <span class="kw">return</span> <span class="num">0</span>;
  <span class="kw">return</span> <span class="num">1</span> + Math.max(maxDepth(root.left), maxDepth(root.right));
}`

  const bfsCode = `<span class="kw">function</span> <span class="fn">levelOrder</span>(root: TreeNode | <span class="kw">null</span>): number[][] {
  <span class="kw">if</span> (!root) <span class="kw">return</span> [];
  <span class="kw">const</span> q: TreeNode[] = [root], res: number[][] = [];
  <span class="kw">while</span> (q.length) {
    <span class="kw">const</span> level: number[] = [];
    <span class="kw">for</span> (<span class="kw">let</span> sz = q.length; sz &gt; <span class="num">0</span>; sz--) {
      <span class="kw">const</span> node = q.shift()!;
      level.push(node.val);
      <span class="kw">if</span> (node.left)  q.push(node.left);
      <span class="kw">if</span> (node.right) q.push(node.right);
    }
    res.push(level);
  }
  <span class="kw">return</span> res;
}`

  return (
    <div>
      <div className="page-eyebrow">Non-Linear</div>
      <h1 className="page-title">Trees</h1>
      <p className="page-desc">
        A tree has no single linear order — which order you visit left/root/right in depends on
        what you need: sorted values (inorder), a clonable copy (preorder), bottom-up aggregation
        (postorder), or level/shortest-path info (level-order BFS). Know all 4 cold. Need level
        info or shortest path? Reach for BFS. Need to explore a full path, or aggregate upward
        from leaves (subtree sums, diameter, balance)? Reach for DFS — almost always written as
        recursion, since the call stack already <em>is</em> the stack DFS needs.
      </p>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Traversal Order</div>
          <table className="complexity-table">
            <thead><tr><th>Traversal</th><th>Visit Order</th><th>Use Case</th></tr></thead>
            <tbody>
              {[
                ["Inorder",    "left → root → right", "BST gives sorted order"],
                ["Preorder",   "root → left → right", "Serialize tree, clone"],
                ["Postorder",  "left → right → root", "Delete tree, evaluate expression"],
                ["Level-order","BFS row by row",       "Level-by-level, shortest path"],
              ].map(([t, ord, use]) => (
                <tr key={t}>
                  <td className="op" style={{ color: "#c4b5fd" }}>{t}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{ord}</td>
                  <td style={{ color: "var(--muted)", fontSize: 11 }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            Why inorder gives sorted output: at every node, the left subtree is all-smaller and
            the right subtree is all-larger (the BST invariant) — visiting left → root → right
            at every node, applied recursively, is exactly what &quot;sorted&quot; means.
          </div>
        </div>

        <div className="card">
          <div className="card-title">BST Properties & Complexity</div>
          <table className="complexity-table">
            <thead><tr><th>Operation</th><th>Avg</th><th>Worst (skewed)</th></tr></thead>
            <tbody>
              {[
                ["Search",  "O(log n)", "O(n)"],
                ["Insert",  "O(log n)", "O(n)"],
                ["Delete",  "O(log n)", "O(n)"],
                ["Min/Max", "O(log n)", "O(n)"],
              ].map(([op, avg, worst]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className="time-good">{avg}</td>
                  <td className="time-ok">{worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            Balanced BST (AVL, Red-Black) guarantees O(log n) always.
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            Common bug: checking only <code>left.val &lt; node.val &lt; right.val</code> against
            immediate children. The invariant is whole-subtree, not just one level down — a node
            two levels down on the left could still violate an ancestor&apos;s bound. Validate BST
            below threads lo/hi bounds through the whole recursion to catch that.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Key Patterns</div>
        <div className="patterns-grid" style={{ gridTemplateColumns: "1fr" }}>
          {[
            ["DFS via recursion",       "The call stack is the stack — left, visit, right (or whatever order the traversal needs). Default choice for tree problems."],
            ["DFS via explicit stack",  "Same traversal, made visible: push/pop instead of call/return. Needed when recursion depth risks overflow, or you need to pause/resume traversal — see Kth Smallest in BST."],
            ["BFS via queue",           "Visit level by level. Reach for this when you need level info or the shortest path in an unweighted tree."],
            ["Match base case to return type", "if (!root) return null for node-returning functions, return 0 for count/depth, return true for existence checks — pick the base case to match what the function computes, not a generic 'empty' value."],
          ].map(([name, desc]) => (
            <div key={name} className="pattern-chip">
              <div className="pattern-chip-name">{name}</div>
              <div className="pattern-chip-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Templates</div>
        <div className="two-col">
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>DFS traversals</div>
            <CodeBlock html={dfsCode} style={{ fontSize: 11 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 6 }}>Level-order BFS</div>
            <CodeBlock html={bfsCode} style={{ fontSize: 11 }} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Worked Trace</div>
        <div className="problems-list">
          <div className="problem-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#c4b5fd" }}>Inorder traversal — call stack unwinding, on a 5-node BST</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
              Tree: root=4, left subtree={"{2 (left=1, right=3)}"}, right=5. inorder(4) calls
              inorder(2) before doing anything else — which calls inorder(1) before doing anything
              else. inorder(1) has no left child, so it immediately visits: push 1. Back in
              inorder(2): visit 2 (push 2), then call inorder(3), which has no children — visit 3
              (push 3). inorder(2) returns. Back in inorder(4): visit 4 (push 4), then call
              inorder(5) — visit 5 (push 5). Final order: 1,2,3,4,5. Nothing was ever &quot;sorted&quot;
              — the recursion just always finishes the entire left subtree (which is itself
              recursively sorted) before visiting root, then the entire right subtree.
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
