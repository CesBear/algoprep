const solutions: Record<string, string> = {
  "Invert Binary Tree": `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,

  "Maximum Depth of Binary Tree": `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,

  "Same Tree": `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,

  "Subtree of Another Tree": `function isSubtree(root: TreeNode | null, sub: TreeNode | null): boolean {
  if (!root) return false;
  if (isSame(root, sub)) return true;
  return isSubtree(root.left, sub) || isSubtree(root.right, sub);
}

function isSame(a: TreeNode | null, b: TreeNode | null): boolean {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isSame(a.left, b.left) && isSame(a.right, b.right);
}`,

  "Balanced Binary Tree": `function isBalanced(root: TreeNode | null): boolean {
  // height() doubles as the "is balanced so far" check via the -1 sentinel,
  // so the whole tree is checked in one pass instead of recomputing height
  // from scratch at every node (which would be O(n^2) on a skewed tree)
  function height(node: TreeNode | null): number {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }
  return height(root) !== -1;
}`,

  "Diameter of Binary Tree": `function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;
  function height(node: TreeNode | null): number {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    // the longest path THROUGH this node is left+right edges, which may
    // not be part of the final answer's own height — track it separately
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }
  height(root);
  return diameter;
}`,

  "Lowest Common Ancestor (BST)": `function lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode {
  if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left!, p, q);
  if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right!, p, q);
  return root;
}`,

  "Binary Tree Level Order (BFS)": `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const q: TreeNode[] = [root], res: number[][] = [];
  while (q.length) {
    const level: number[] = [];
    for (let sz = q.length; sz > 0; sz--) {
      const node = q.shift()!;
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,

  "Validate BST": `function isValidBST(root: TreeNode | null, lo = -Infinity, hi = Infinity): boolean {
  if (!root) return true;
  if (root.val <= lo || root.val >= hi) return false;
  return isValidBST(root.left, lo, root.val) && isValidBST(root.right, root.val, hi);
}`,

  "Kth Smallest in BST": `function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = []; let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop()!;
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
  return -1;
}`,

  "Construct Tree from Pre+Inorder": `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // indexOf + slice per call would be O(n^2) total on a skewed tree —
  // a precomputed index map + range bounds (no new arrays) keeps this O(n)
  const indexOf = new Map<number, number>();
  inorder.forEach((v, i) => indexOf.set(v, i));
  let preIdx = 0;
  function build(inLo: number, inHi: number): TreeNode | null {
    if (inLo > inHi) return null;
    const rootVal = preorder[preIdx++];
    const root = new TreeNode(rootVal);
    const mid = indexOf.get(rootVal)!;
    root.left = build(inLo, mid - 1);
    root.right = build(mid + 1, inHi);
    return root;
  }
  return build(0, inorder.length - 1);
}`,

  "Max Path Sum": `function maxPathSum(root: TreeNode | null): number {
  let res = -Infinity;
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    res = Math.max(res, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return res;
}`,

  "Serialize / Deserialize BTree": `function serialize(root: TreeNode | null): string {
  const res: string[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) { res.push('N'); return; }
    res.push(String(node.val)); dfs(node.left); dfs(node.right);
  }
  dfs(root);
  return res.join(',');
}

function deserialize(data: string): TreeNode | null {
  const vals = data.split(','); let i = 0;
  function dfs(): TreeNode | null {
    if (vals[i] === 'N') { i++; return null; }
    const node = new TreeNode(+vals[i++]);
    node.left = dfs(); node.right = dfs();
    return node;
  }
  return dfs();
}`,
};

export default solutions;
