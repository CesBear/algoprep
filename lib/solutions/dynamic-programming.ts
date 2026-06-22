const solutions: Record<string, string> = {
  "Climbing Stairs": `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,

  "House Robber": `function rob(nums: number[]): number {
  let prev = 0, cur = 0;
  for (const n of nums) [prev, cur] = [cur, Math.max(cur, prev + n)];
  return cur;
}`,

  "House Robber II": `function rob(nums: number[]): number {
  function robRange(arr: number[]): number {
    let prev = 0, cur = 0;
    for (const n of arr) [prev, cur] = [cur, Math.max(cur, prev + n)];
    return cur;
  }
  if (nums.length === 1) return nums[0];
  return Math.max(robRange(nums.slice(0, -1)), robRange(nums.slice(1)));
}`,

  "Longest Palindromic Substring": `function longestPalindrome(s: string): string {
  let res = "";
  function expand(l: number, r: number) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > res.length) res = s.slice(l + 1, r);
  }
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return res;
}`,

  "Palindromic Substrings": `function countSubstrings(s: string): number {
  let count = 0;
  function expand(l: number, r: number) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { count++; l--; r++; }
  }
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return count;
}`,

  "Longest Common Subsequence": `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = text1[i - 1] === text2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n];
}`,

  "Decode Ways": `function numDecodings(s: string): number {
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] !== '0' ? 1 : 0;
  for (let i = 2; i <= n; i++) {
    const one = +s[i - 1];
    const two = +(s.slice(i - 2, i));
    if (one >= 1) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }
  return dp[n];
}`,

  "Coin Change": `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const c of coins)
      if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,

  "Maximum Product Subarray": `function maxProduct(nums: number[]): number {
  let lo = nums[0], hi = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const cands = [nums[i], hi * nums[i], lo * nums[i]];
    hi = Math.max(...cands);
    lo = Math.min(...cands);
    best = Math.max(best, hi);
  }
  return best;
}`,

  "Word Break": `function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
  return dp[s.length];
}`,

  "Combination Sum IV": `function combinationSum4(nums: number[], target: number): number {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1; // one way to make 0: pick nothing
  for (let s = 1; s <= target; s++)
    for (const n of nums)
      if (n <= s) dp[s] += dp[s - n];
  return dp[target];
}`,

  "Longest Increasing Subsequence": `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const n of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1; else hi = mid;
    }
    tails[lo] = n;
  }
  return tails.length;
}`,

  "Unique Paths": `function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
  return dp[m - 1][n - 1];
}`,

  "Jump Game": `function canJump(nums: number[]): boolean {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,

  "Partition Equal Subset Sum": `function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  // iterate the capacity downward so each item is only used once (0/1, not unbounded)
  for (const n of nums)
    for (let s = target; s >= n; s--)
      if (dp[s - n]) dp[s] = true;
  return dp[target];
}`,

  "Edit Distance": `function minDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = word1[i - 1] === word2[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}`,

  "Burst Balloons": `function maxCoins(nums: number[]): number {
  const balloons = [1, ...nums, 1]; // pad with virtual 1-value balloons at both ends
  const n = balloons.length;
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  // dp[l][r]: max coins from bursting every balloon strictly between l and r
  for (let len = 2; len < n; len++) {
    for (let l = 0; l + len < n; l++) {
      const r = l + len;
      for (let k = l + 1; k < r; k++) {
        // k is the LAST balloon burst in (l, r) — at that point its only
        // neighbors left are l and r, however everything in between was split
        dp[l][r] = Math.max(dp[l][r], dp[l][k] + dp[k][r] + balloons[l] * balloons[k] * balloons[r]);
      }
    }
  }
  return dp[0][n - 1];
}`,
};

export default solutions;
