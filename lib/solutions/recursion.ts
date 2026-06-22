const solutions: Record<string, string> = {
  "Fibonacci Number": `function fib(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}`,

  "Climbing Stairs": `function climbStairs(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return 1; // 1 way to stand at step 0 or 1
  if (memo.has(n)) return memo.get(n)!;
  const result = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  memo.set(n, result);
  return result;
}`,

  "Subsets": `function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  function bt(start: number, path: number[]) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      bt(i + 1, path);
      path.pop();
    }
  }
  bt(0, []);
  return res;
}`,

  "Subsets II (duplicates)": `function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  function bt(start: number, path: number[]) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      bt(i + 1, path);
      path.pop();
    }
  }
  bt(0, []);
  return res;
}`,

  "Permutations": `function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  function bt(path: number[], used: boolean[]) {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      bt(path, used);
      path.pop(); used[i] = false;
    }
  }
  bt([], new Array(nums.length).fill(false));
  return res;
}`,

  "Combination Sum": `function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  function bt(start: number, path: number[], rem: number) {
    if (rem === 0) { res.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > rem) continue;
      path.push(candidates[i]);
      bt(i, path, rem - candidates[i]);
      path.pop();
    }
  }
  bt(0, [], target);
  return res;
}`,

  "Combination Sum II": `function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  function bt(start: number, path: number[], rem: number) {
    if (rem === 0) { res.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > rem) break;
      path.push(candidates[i]);
      bt(i + 1, path, rem - candidates[i]);
      path.pop();
    }
  }
  bt(0, [], target);
  return res;
}`,

  "Generate Parentheses": `function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  function bt(s: string, open: number, close: number) {
    if (s.length === 2 * n) { res.push(s); return; }
    if (open < n) bt(s + '(', open + 1, close);
    if (close < open) bt(s + ')', open, close + 1);
  }
  bt('', 0, 0);
  return res;
}`,

  "Word Search": `function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0].length;
  function bt(r: number, c: number, i: number): boolean {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;
    const tmp = board[r][c]; board[r][c] = '#';
    const found = bt(r+1,c,i+1) || bt(r-1,c,i+1) || bt(r,c+1,i+1) || bt(r,c-1,i+1);
    board[r][c] = tmp;
    return found;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (bt(r, c, 0)) return true;
  return false;
}`,

  "Palindrome Partitioning": `function partition(s: string): string[][] {
  const res: string[][] = [];
  function isPalin(sub: string) { return sub === sub.split('').reverse().join(''); }
  function bt(start: number, path: string[]) {
    if (start === s.length) { res.push([...path]); return; }
    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.slice(start, end);
      if (isPalin(sub)) { path.push(sub); bt(end, path); path.pop(); }
    }
  }
  bt(0, []);
  return res;
}`,

  "Letter Combinations of Phone Number": `function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  const map: Record<string, string> = {
    '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'
  };
  const res: string[] = [];
  function bt(i: number, path: string) {
    if (i === digits.length) { res.push(path); return; }
    for (const c of map[digits[i]]) bt(i + 1, path + c);
  }
  bt(0, '');
  return res;
}`,

  "N-Queens": `function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  const cols = new Set<number>(), diag1 = new Set<number>(), diag2 = new Set<number>();
  function bt(row: number, board: string[]) {
    if (row === n) { res.push([...board]); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
      cols.add(c); diag1.add(row - c); diag2.add(row + c);
      const rowStr = '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1);
      bt(row + 1, [...board, rowStr]);
      cols.delete(c); diag1.delete(row - c); diag2.delete(row + c);
    }
  }
  bt(0, []);
  return res;
}`,

  "Sudoku Solver": `function solveSudoku(board: string[][]): void {
  function isValid(r: number, c: number, ch: string): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch || board[i][c] === ch) return false;
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (board[br][bc] === ch) return false;
    }
    return true;
  }
  function solve(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue;
        for (let d = 1; d <= 9; d++) {
          const ch = String(d);
          if (!isValid(r, c, ch)) continue;
          board[r][c] = ch;
          if (solve()) return true;
          board[r][c] = '.';
        }
        return false; // no digit fits this cell — backtrack
      }
    }
    return true; // every cell filled
  }
  solve();
}`,
};

export default solutions;
