const solutions: Record<string, string> = {
  "Valid Anagram": `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Map<string, number>();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
  for (const c of t) {
    if (!count.get(c)) return false;
    count.set(c, count.get(c)! - 1);
  }
  return true;
}`,

  "Valid Palindrome": `function isPalindrome(s: string): boolean {
  const clean: string[] = [];
  for (const ch of s.toLowerCase()) {
    if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) clean.push(ch);
  }
  let l = 0, r = clean.length - 1;
  while (l < r) { if (clean[l++] !== clean[r--]) return false; }
  return true;
}`,

  "Longest Common Prefix": `function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++)
    while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0, -1);
  return prefix;
}`,

  "String to Integer (atoi)": `function myAtoi(s: string): number {
  let i = 0;
  while (i < s.length && s[i] === ' ') i++;
  let sign = 1;
  if (s[i] === '+' || s[i] === '-') { sign = s[i] === '-' ? -1 : 1; i++; }
  let num = 0;
  const INT_MAX = 2 ** 31 - 1, INT_MIN = -(2 ** 31);
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    num = num * 10 + (s.charCodeAt(i) - 48);
    if (sign === 1 && num > INT_MAX) return INT_MAX;
    if (sign === -1 && -num < INT_MIN) return INT_MIN;
    i++;
  }
  return sign * num;
}`,

  "Longest Substring No Repeat": `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    // only advance left if the duplicate's last index is inside the
    // current window — a stale index from before left would wrongly shrink it
    if (seen.has(ch) && seen.get(ch)! >= left) left = seen.get(ch)! + 1;
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,

  "Longest Palindromic Substring": `function longestPalindrome(s: string): string {
  let res = '';
  function expand(l: number, r: number) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > res.length) res = s.slice(l + 1, r);
  }
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return res;
}`,

  "Group Anagrams": `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return [...map.values()];
}`,

  "Encode & Decode Strings": `function encode(strs: string[]): string {
  return strs.map(s => s.length + '#' + s).join('');
}

function decode(s: string): string[] {
  const res: string[] = []; let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;
    const len = +s.slice(i, j);
    res.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return res;
}`,

  "Find All Anagrams in String": `function findAnagrams(s: string, p: string): number[] {
  // fixed-size array (not a Map) is safe because the problem guarantees
  // lowercase a-z only; charCodeAt(0) - 97 maps 'a'->0 ... 'z'->25
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
  if (t.length === 0 || s.length < t.length) return '';
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, total = need.size, left = 0, res = '', minLen = Infinity;
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
};

export default solutions;
