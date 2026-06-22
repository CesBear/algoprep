const solutions: Record<string, string> = {
  "Best Time to Buy & Sell Stock": `function maxProfit(prices: number[]): number {
  let minP = Infinity, best = 0;
  for (const p of prices) {
    minP = Math.min(minP, p);
    best = Math.max(best, p - minP);
  }
  return best;
}`,

  "Longest Substring Without Repeating Characters": `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch)! >= left) left = seen.get(ch)! + 1;
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,

  "Longest Repeating Character Replacement": `function characterReplacement(s: string, k: number): number {
  const count = new Array(26).fill(0);
  let left = 0, maxFreq = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    maxFreq = Math.max(maxFreq, ++count[s.charCodeAt(right) - 65]);
    // maxFreq is never decreased on shrink — a stale value only ever makes
    // the shrink condition harder to trigger, and best only grows when a
    // window is truly valid, so staleness can't produce a wrong answer
    while (right - left + 1 - maxFreq > k) count[s.charCodeAt(left++) - 65]--;
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,

  "Permutation in String": `function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0), have = new Array(26).fill(0);
  for (const c of s1) need[c.charCodeAt(0) - 97]++;
  let formed = 0, total = s1.length;
  for (let r = 0; r < s2.length; r++) {
    const i = s2.charCodeAt(r) - 97;
    if (need[i] > 0 && ++have[i] <= need[i]) formed++;
    if (r >= s1.length) {
      const j = s2.charCodeAt(r - s1.length) - 97;
      if (need[j] > 0 && have[j]-- <= need[j]) formed--;
    }
    if (formed === total) return true;
  }
  return false;
}`,

  "Find All Anagrams in a String": `function findAnagrams(s: string, p: string): number[] {
  if (p.length > s.length) return [];
  const need = new Array(26).fill(0), have = new Array(26).fill(0);
  for (const c of p) need[c.charCodeAt(0) - 97]++;
  let formed = 0, total = p.length;
  const res: number[] = [];
  for (let r = 0; r < s.length; r++) {
    const i = s.charCodeAt(r) - 97;
    if (need[i] > 0 && ++have[i] <= need[i]) formed++;
    if (r >= p.length) {
      const j = s.charCodeAt(r - p.length) - 97;
      if (need[j] > 0 && have[j]-- <= need[j]) formed--;
    }
    if (formed === total) res.push(r - p.length + 1);
  }
  return res;
}`,

  "Minimum Window Substring": `function minWindow(s: string, t: string): string {
  if (t.length === 0 || s.length < t.length) return "";
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, total = need.size, left = 0, res = "", minLen = Infinity;
  const window = new Map<string, number>();
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === total) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; res = s.slice(left, right + 1); }
      const lc = s[left++];
      window.set(lc, window.get(lc)! - 1);
      if (need.has(lc) && window.get(lc)! < need.get(lc)!) have--;
    }
  }
  return res;
}`,

  "Sliding Window Maximum": `function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [], res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`,

  "Max Consecutive Ones III": `function longestOnes(nums: number[], k: number): number {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,

  "Fruit Into Baskets": `function totalFruit(fruits: number[]): number {
  const count = new Map<number, number>();
  let left = 0, best = 0;
  for (let right = 0; right < fruits.length; right++) {
    count.set(fruits[right], (count.get(fruits[right]) ?? 0) + 1);
    while (count.size > 2) {
      const lf = fruits[left];
      count.set(lf, count.get(lf)! - 1);
      if (count.get(lf) === 0) count.delete(lf);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
};

export default solutions;
