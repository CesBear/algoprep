const solutions: Record<string, string> = {
  "Kth Largest Element in a Stream": `class KthLargest {
  private heap: number[] = []; // min-heap, capped at size k — heap[0] is the kth largest

  constructor(private k: number, nums: number[]) {
    for (const n of nums) this.add(n);
  }

  add(val: number): number {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1);
    if (this.heap.length > this.k) this.popMin();
    return this.heap[0];
  }

  private siftUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }

  private popMin() {
    const last = this.heap.pop()!;
    if (!this.heap.length) return;
    this.heap[0] = last;
    let i = 0;
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let smallest = i;
      if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
      if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}`,

  "Last Stone Weight": `function lastStoneWeight(stones: number[]): number {
  const heap = [...stones];
  const less = (a: number, b: number) => a > b; // max-heap: bigger value "wins"

  function siftUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  }
  function siftDown(i: number) {
    const n = heap.length;
    while (true) {
      let top = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && less(heap[l], heap[top])) top = l;
      if (r < n && less(heap[r], heap[top])) top = r;
      if (top === i) break;
      [heap[i], heap[top]] = [heap[top], heap[i]];
      i = top;
    }
  }
  for (let i = (heap.length >> 1) - 1; i >= 0; i--) siftDown(i); // O(n) heapify

  function pop(): number {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; siftDown(0); }
    return top;
  }
  function push(v: number) { heap.push(v); siftUp(heap.length - 1); }

  while (heap.length > 1) {
    const y = pop(), x = pop(); // y >= x, the two heaviest stones
    if (y !== x) push(y - x);
  }
  return heap.length ? heap[0] : 0;
}`,

  "K Closest Points to Origin": `function kClosest(points: number[][], k: number): number[][] {
  const dist = (p: number[]) => p[0] * p[0] + p[1] * p[1];
  const heap: number[][] = []; // max-heap by distance, capped at size k
  const less = (a: number[], b: number[]) => dist(a) > dist(b);

  function siftUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  }
  function siftDown(i: number) {
    const n = heap.length;
    while (true) {
      let top = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && less(heap[l], heap[top])) top = l;
      if (r < n && less(heap[r], heap[top])) top = r;
      if (top === i) break;
      [heap[i], heap[top]] = [heap[top], heap[i]];
      i = top;
    }
  }

  for (const p of points) {
    heap.push(p);
    siftUp(heap.length - 1);
    if (heap.length > k) {
      // evict the current farthest point — it's the max-heap root
      const last = heap.pop()!;
      if (heap.length) { heap[0] = last; siftDown(0); }
    }
  }
  return heap;
}`,

  "Find Median from Data Stream": `class MedianFinder {
  private small: number[] = []; // max-heap (values stored negated) — the lower half
  private large: number[] = []; // min-heap — the upper half

  addNum(num: number): void {
    this.push(this.small, -num);
    this.push(this.large, -this.pop(this.small)); // move small's max into large
    if (this.large.length > this.small.length) this.push(this.small, -this.pop(this.large));
  }

  findMedian(): number {
    if (this.small.length > this.large.length) return -this.small[0];
    return (-this.small[0] + this.large[0]) / 2;
  }

  // both heaps are plain min-heaps — negating on the way in/out of "small"
  // is what turns it into a max-heap without a separate implementation
  private push(heap: number[], val: number) {
    heap.push(val);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  }

  private pop(heap: number[]): number {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = 2 * i + 2;
        let smallest = i;
        if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
        if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
        if (smallest === i) break;
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      }
    }
    return top;
  }
}`,

  "Merge K Sorted Lists": `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  type Entry = [number, number]; // [value, listIndex]
  const heap: Entry[] = [];
  const less = (a: Entry, b: Entry) => a[0] < b[0];

  function siftUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  }
  function siftDown(i: number) {
    const n = heap.length;
    while (true) {
      let top = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && less(heap[l], heap[top])) top = l;
      if (r < n && less(heap[r], heap[top])) top = r;
      if (top === i) break;
      [heap[i], heap[top]] = [heap[top], heap[i]];
      i = top;
    }
  }
  function push(e: Entry) { heap.push(e); siftUp(heap.length - 1); }
  function pop(): Entry {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; siftDown(0); }
    return top;
  }

  for (let i = 0; i < lists.length; i++) if (lists[i]) push([lists[i]!.val, i]);

  const dummy = new ListNode(0);
  let cur = dummy;
  while (heap.length) {
    const [, i] = pop();
    const node = lists[i]!;
    cur.next = node;
    cur = cur.next;
    lists[i] = node.next;
    if (lists[i]) push([lists[i]!.val, i]); // pull the next node from the same list
  }
  return dummy.next;
}`,
};

export default solutions;
