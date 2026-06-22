const solutions: Record<string, string> = {
  "Binary Search": `function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,

  "Search Insert Position": `function searchInsert(nums: number[], target: number): number {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,

  "First Bad Version": `function firstBadVersion(n: number, isBadVersion: (v: number) => boolean): number {
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (isBadVersion(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,

  "Search a 2D Matrix": `function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix.length || !matrix[0].length) return false;
  const cols = matrix[0].length;
  let lo = 0, hi = matrix.length * cols - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / cols)][mid % cols];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,

  "Koko Eating Bananas": `function minEatingSpeed(piles: number[], h: number): number {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
    if (hours <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,

  "Find Minimum in Rotated Sorted Array": `function findMin(nums: number[]): number {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,

  "Search in Rotated Sorted Array": `function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,

  "Find Peak Element": `function findPeakElement(nums: number[]): number {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[mid + 1]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,

  "Time Based Key-Value Store": `class TimeMap {
  private map = new Map<string, [number, string][]>();
  set(key: string, value: string, timestamp: number): void {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key)!.push([timestamp, value]);
  }
  get(key: string, timestamp: number): string {
    const arr = this.map.get(key) ?? [];
    let lo = 0, hi = arr.length - 1, res = "";
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= timestamp) { res = arr[mid][1]; lo = mid + 1; }
      else hi = mid - 1;
    }
    return res;
  }
}`,

  "Median of Two Sorted Arrays": `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = (m + n + 1) / 2 - i | 0;
    const maxL1 = i === 0 ? -Infinity : nums1[i - 1];
    const minR1 = i === m ? Infinity : nums1[i];
    const maxL2 = j === 0 ? -Infinity : nums2[j - 1];
    const minR2 = j === n ? Infinity : nums2[j];
    if (maxL1 <= minR2 && maxL2 <= minR1) {
      const maxLeft = Math.max(maxL1, maxL2);
      if ((m + n) % 2 === 1) return maxLeft;
      return (maxLeft + Math.min(minR1, minR2)) / 2;
    } else if (maxL1 > minR2) hi = i - 1;
    else lo = i + 1;
  }
  return 0;
}`,

  "Split Array Largest Sum": `function splitArray(nums: number[], k: number): number {
  let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b, 0);
  const canSplit = (cap: number): boolean => {
    let pieces = 1, sum = 0;
    for (const n of nums) {
      if (sum + n > cap) { pieces++; sum = n; } else sum += n;
    }
    return pieces <= k;
  };
  while (lo < hi) {
    // hi can be as large as 10^4 * 10^6 here, so (lo+hi)>>1 risks 32-bit
    // overflow — use the division form instead
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canSplit(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,
};

export default solutions;
