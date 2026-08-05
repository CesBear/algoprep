const solutions: Record<string, string> = {
  "Two Sum": `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp)!, i];
    map.set(nums[i], i);
  }
  return [];
}`,

  "Contains Duplicate": `function hasDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,

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

  "Group Anagrams": `function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const s of strs) {
    // Map keys compare by reference for objects/arrays, so an array of
    // chars wouldn't work as a key here — sorting to a string gives a
    // stable primitive key that two anagrams are guaranteed to share
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return [...map.values()];
}`,

  "Top K Frequent Elements": `function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  // bucket sort by frequency (max possible frequency is nums.length) →
  // O(n) total, avoids the O(n log k) cost of a heap or full sort
  const buckets: number[][] = Array.from({length: nums.length + 1}, () => []);
  for (const [n, f] of freq) buckets[f].push(n);
  const res: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--)
    res.push(...buckets[i]);
  return res.slice(0, k);
}`,

  "Subarray Sum Equals K": `function subarraySum(nums: number[], k: number): number {
  const prefixCount = new Map<number, number>([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    count += prefixCount.get(sum - k) ?? 0;
    prefixCount.set(sum, (prefixCount.get(sum) ?? 0) + 1);
  }
  return count;
}`,

  "Encode & Decode Strings": `function encode(strs: string[]): string {
  return strs.map(s => s.length + '#' + s).join('');
}

function decode(s: string): string[] {
  const res: string[] = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;
    const len = +s.slice(i, j);
    res.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return res;
}`,

  "Longest Consecutive Sequence": `function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let len = 1;
      while (set.has(n + len)) len++;
      best = Math.max(best, len);
    }
  }
  return best;
}`,

  "LRU Cache": `class LRUCache {
  private cap: number;
  private map = new Map<number, number>();
  constructor(capacity: number) { this.cap = capacity; }
  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key: number, value: number): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value!);
  }
}`,

  "LFU Cache": `class LFUCache {
  private minFreq = 0;
  private keyToVal = new Map<number, number>();
  private keyToFreq = new Map<number, number>();
  // Set iteration order == insertion order in JS — front of the set at a
  // given frequency is the least-recently-used key at that frequency
  private freqToKeys = new Map<number, Set<number>>();

  constructor(private cap: number) {}

  get(key: number): number {
    if (!this.keyToVal.has(key)) return -1;
    this.touch(key);
    return this.keyToVal.get(key)!;
  }

  put(key: number, value: number): void {
    if (this.cap === 0) return;
    if (this.keyToVal.has(key)) {
      this.keyToVal.set(key, value);
      this.touch(key);
      return;
    }
    if (this.keyToVal.size >= this.cap) {
      const evictSet = this.freqToKeys.get(this.minFreq)!;
      const evictKey = evictSet.values().next().value!;
      evictSet.delete(evictKey);
      this.keyToVal.delete(evictKey);
      this.keyToFreq.delete(evictKey);
    }
    this.keyToVal.set(key, value);
    this.keyToFreq.set(key, 1);
    if (!this.freqToKeys.has(1)) this.freqToKeys.set(1, new Set());
    this.freqToKeys.get(1)!.add(key);
    this.minFreq = 1;
  }

  private touch(key: number): void {
    const freq = this.keyToFreq.get(key)!;
    const bucket = this.freqToKeys.get(freq)!;
    bucket.delete(key);
    if (bucket.size === 0) {
      this.freqToKeys.delete(freq);
      if (this.minFreq === freq) this.minFreq++; // this bucket was the only one at minFreq
    }
    const nextFreq = freq + 1;
    this.keyToFreq.set(key, nextFreq);
    if (!this.freqToKeys.has(nextFreq)) this.freqToKeys.set(nextFreq, new Set());
    this.freqToKeys.get(nextFreq)!.add(key);
  }
}`,
};

export default solutions;
