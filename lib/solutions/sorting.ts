const solutions: Record<string, string> = {
  "Sort Colors (Dutch Flag)": `function sortColors(nums: number[]): void {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo], nums[mid]] = [nums[mid], nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid], nums[hi]] = [nums[hi], nums[mid]]; hi--; }
  }
}`,

  "Merge Intervals": `function merge(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (const [s, e] of intervals.slice(1)) {
    const last = res[res.length - 1];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else res.push([s, e]);
  }
  return res;
}`,

  "Meeting Rooms II": `function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  let rooms = 0, ep = 0;
  for (let sp = 0; sp < starts.length; sp++) {
    if (starts[sp] < ends[ep]) rooms++;
    else ep++;
  }
  return rooms;
}`,

  "Largest Number": `function largestNumber(nums: number[]): string {
  const res = nums.map(String).sort((a, b) => (b + a) > (a + b) ? 1 : -1).join('');
  return res[0] === '0' ? '0' : res;
}`,

  "Kth Largest Element": `function findKthLargest(nums: number[], k: number): number {
  k = nums.length - k;
  function qs(lo: number, hi: number): number {
    // random pivot avoids the O(n) recursion depth / O(n^2) time a fixed
    // last-element pivot hits on already-sorted or reverse-sorted input
    const pivotIdx = lo + Math.floor(Math.random() * (hi - lo + 1));
    [nums[pivotIdx], nums[hi]] = [nums[hi], nums[pivotIdx]];
    const pivot = nums[hi]; let p = lo;
    for (let i = lo; i < hi; i++) if (nums[i] <= pivot) [nums[i], nums[p++]] = [nums[p], nums[i]];
    [nums[p], nums[hi]] = [nums[hi], nums[p]];
    if (p < k) return qs(p + 1, hi);
    if (p > k) return qs(lo, p - 1);
    return nums[p];
  }
  return qs(0, nums.length - 1);
}`,

  "Top K Frequent Elements": `function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const buckets: number[][] = Array.from({length: nums.length + 1}, () => []);
  for (const [n, f] of freq) buckets[f].push(n);
  const res: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) res.push(...buckets[i]);
  return res.slice(0, k);
}`,

  "Find K Pairs with Smallest Sums": `function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  if (!nums1.length || !nums2.length) return [];
  type Item = [number, number, number]; // [sum, i, j]
  const heap: Item[] = [];
  const less = (a: Item, b: Item) => a[0] < b[0];
  function siftUp(i: number) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (!less(heap[i], heap[parent])) break;
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    }
  }
  function siftDown(i: number) {
    const n = heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && less(heap[l], heap[smallest])) smallest = l;
      if (r < n && less(heap[r], heap[smallest])) smallest = r;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }
  function push(item: Item) { heap.push(item); siftUp(heap.length - 1); }
  function pop(): Item {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; siftDown(0); }
    return top;
  }
  // seed with one pair per i (paired with nums2[0]) — the true global
  // minimum is guaranteed to be among these since nums2 is sorted
  for (let i = 0; i < Math.min(nums1.length, k); i++) push([nums1[i] + nums2[0], i, 0]);
  const res: number[][] = [];
  while (k-- > 0 && heap.length) {
    const [, i, j] = pop();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) push([nums1[i] + nums2[j + 1], i, j + 1]);
  }
  return res;
}`,

  "Sort a Linked List": `function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let slow = head, fast: ListNode | null = head.next;
  while (fast && fast.next) { slow = slow.next!; fast = fast.next.next; }
  const mid = slow.next; slow.next = null;
  const l = sortList(head), r = sortList(mid);
  const dummy = new ListNode(0); let cur = dummy;
  let a = l, b = r;
  while (a && b) {
    if (a.val <= b.val) { cur.next = a; a = a.next; }
    else { cur.next = b; b = b.next; }
    cur = cur.next!;
  }
  cur.next = a ?? b;
  return dummy.next;
}`,

  "Count of Smaller After Self": `function countSmaller(nums: number[]): number[] {
  const n = nums.length, res = new Array(n).fill(0);
  const indices = nums.map((_, i) => i);
  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    const mid = arr.length >> 1;
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const merged: number[] = []; let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (nums[left[i]] <= nums[right[j]]) { res[left[i]] += j; merged.push(left[i++]); }
      else merged.push(right[j++]);
    }
    while (i < left.length) { res[left[i]] += j; merged.push(left[i++]); }
    while (j < right.length) merged.push(right[j++]);
    return merged;
  }
  mergeSort(indices);
  return res;
}`,
};

export default solutions;
