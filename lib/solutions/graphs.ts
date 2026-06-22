const solutions: Record<string, string> = {
  "Number of Islands": `function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === '1') { dfs(r, c); count++; }
  return count;
}`,

  "Clone Graph": `function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;
  const visited = new Map<Node, Node>();
  function dfs(n: Node): Node {
    if (visited.has(n)) return visited.get(n)!;
    const clone = new Node(n.val);
    visited.set(n, clone);
    for (const nb of n.neighbors) clone.neighbors.push(dfs(nb));
    return clone;
  }
  return dfs(node);
}`,

  "Max Area of Island": `function maxAreaOfIsland(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  function dfs(r: number, c: number): number {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
  }
  let best = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      best = Math.max(best, dfs(r, c));
  return best;
}`,

  "Pacific Atlantic Water Flow": `function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({length: rows}, () => new Array(cols).fill(false));
  const atl = Array.from({length: rows}, () => new Array(cols).fill(false));
  function bfs(queue: number[][], visited: boolean[][]) {
    while (queue.length) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r+dr, nc = c+dc;
        if (nr>=0 && nr<rows && nc>=0 && nc<cols && !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = true; queue.push([nr, nc]);
        }
      }
    }
  }
  const pQ: number[][] = [], aQ: number[][] = [];
  for (let r = 0; r < rows; r++) {
    pac[r][0] = true; pQ.push([r, 0]);
    atl[r][cols-1] = true; aQ.push([r, cols-1]);
  }
  for (let c = 0; c < cols; c++) {
    pac[0][c] = true; pQ.push([0, c]);
    atl[rows-1][c] = true; aQ.push([rows-1, c]);
  }
  bfs(pQ, pac); bfs(aQ, atl);
  const res: number[][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}`,

  "Surrounded Regions": `function solve(board: string[][]): void {
  const rows = board.length, cols = board[0].length;
  function dfs(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
    board[r][c] = 'S';
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols-1); }
  for (let c = 0; c < cols; c++) { dfs(0, c); dfs(rows-1, c); }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      board[r][c] = board[r][c] === 'S' ? 'O' : board[r][c] === 'O' ? 'X' : board[r][c];
}`,

  "Rotting Oranges": `function orangesRotting(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const queue: [number, number][] = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  let time = 0;
  while (queue.length && fresh > 0) {
    const sz = queue.length; time++;
    for (let i = 0; i < sz; i++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r+dr, nc = c+dc;
        if (nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--; queue.push([nr, nc]);
        }
      }
    }
  }
  return fresh === 0 ? time : -1;
}`,

  "Walls and Gates": `function wallsAndGates(rooms: number[][]): void {
  const rows = rooms.length, cols = rooms[0].length, INF = 2**31 - 1;
  const queue: [number, number][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (rooms[r][c] === 0) queue.push([r, c]);
  while (queue.length) {
    const [r, c] = queue.shift()!;
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = r+dr, nc = c+dc;
      if (nr>=0 && nr<rows && nc>=0 && nc<cols && rooms[nr][nc] === INF) {
        rooms[nr][nc] = rooms[r][c] + 1; queue.push([nr, nc]);
      }
    }
  }
}`,

  "Course Schedule": `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({length: numCourses}, () => []);
  const inDeg = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { adj[b].push(a); inDeg[a]++; }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (inDeg[i] === 0) queue.push(i);
  let done = 0;
  while (queue.length) {
    const node = queue.shift()!; done++;
    for (const nb of adj[node]) if (--inDeg[nb] === 0) queue.push(nb);
  }
  return done === numCourses;
}`,

  "Course Schedule II": `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({length: numCourses}, () => []);
  const inDeg = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { adj[b].push(a); inDeg[a]++; }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (inDeg[i] === 0) queue.push(i);
  const order: number[] = [];
  while (queue.length) {
    const node = queue.shift()!; order.push(node);
    for (const nb of adj[node]) if (--inDeg[nb] === 0) queue.push(nb);
  }
  return order.length === numCourses ? order : [];
}`,

  "Graph Valid Tree": `function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;
  const adj: number[][] = Array.from({length: n}, () => []);
  for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }
  const visited = new Set<number>();
  function dfs(node: number, parent: number): boolean {
    visited.add(node);
    for (const nb of adj[node]) {
      if (nb === parent) continue;
      if (visited.has(nb) || !dfs(nb, node)) return false;
    }
    return true;
  }
  return dfs(0, -1) && visited.size === n;
}`,

  "Number of Connected Components": `function countComponents(n: number, edges: number[][]): number {
  const parent = Array.from({length: n}, (_, i) => i);
  const size = new Array(n).fill(1);
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
    return parent[x];
  }
  let components = n;
  for (const [a, b] of edges) {
    let pa = find(a), pb = find(b);
    if (pa !== pb) {
      if (size[pa] < size[pb]) [pa, pb] = [pb, pa]; // union by size: attach smaller under larger
      parent[pb] = pa;
      size[pa] += size[pb];
      components--;
    }
  }
  return components;
}`,

  "Redundant Connection": `function findRedundantConnection(edges: number[][]): number[] {
  const parent = Array.from({length: edges.length + 1}, (_, i) => i);
  const size = new Array(edges.length + 1).fill(1);
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
    return parent[x];
  }
  for (const [a, b] of edges) {
    let pa = find(a), pb = find(b);
    if (pa === pb) return [a, b];
    if (size[pa] < size[pb]) [pa, pb] = [pb, pa]; // union by size
    parent[pb] = pa;
    size[pa] += size[pb];
  }
  return [];
}`,

  "Alien Dictionary": `function alienOrder(words: string[]): string {
  const adj = new Map<string, Set<string>>();
  for (const w of words) for (const c of w) if (!adj.has(c)) adj.set(c, new Set());
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    // a longer word listed before its own prefix can never be valid —
    // e.g. ["abc","ab"] implies "ab" comes after "abc", contradicting
    // every prefix-ordering rule a dictionary actually follows
    if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) return '';
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        adj.get(w1[j])!.add(w2[j]);
        break;
      }
    }
  }
  const inDeg = new Map<string, number>();
  for (const c of adj.keys()) inDeg.set(c, 0);
  for (const set of adj.values()) for (const c of set) inDeg.set(c, (inDeg.get(c) ?? 0) + 1);
  const queue: string[] = [];
  for (const [c, d] of inDeg) if (d === 0) queue.push(c);
  let order = '';
  while (queue.length) {
    const c = queue.shift()!;
    order += c;
    for (const nb of adj.get(c)!) {
      inDeg.set(nb, inDeg.get(nb)! - 1);
      if (inDeg.get(nb) === 0) queue.push(nb);
    }
  }
  // same Kahn's-algorithm cycle signature as Course Schedule: a cycle's
  // letters never reach in-degree 0, so they never get appended to order
  return order.length === adj.size ? order : '';
}`,

  "Word Ladder": `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  while (queue.length) {
    const [word, steps] = queue.shift()!;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (next === endWord) return steps + 1;
        if (wordSet.has(next) && !visited.has(next)) {
          visited.add(next); queue.push([next, steps + 1]);
        }
      }
    }
  }
  return 0;
}`,
};

export default solutions;
