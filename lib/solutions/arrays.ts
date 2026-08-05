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

  "Best Time to Buy and Sell Stock": `function maxProfit(prices: number[]): number {
  let minPrice = Infinity, maxP = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    maxP = Math.max(maxP, p - minPrice);
  }
  return maxP;
}`,

  "Contains Duplicate": `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,

  "Product of Array Except Self": `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const out = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { out[i] = prefix; prefix *= nums[i]; }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { out[i] *= suffix; suffix *= nums[i]; }
  return out;
}`,

  "Maximum Subarray (Kadane's)": `function maxSubArray(nums: number[]): number {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,

  "Maximum Product Subarray": `function maxProduct(nums: number[]): number {
  let lo = nums[0], hi = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const candidates = [nums[i], hi * nums[i], lo * nums[i]];
    hi = Math.max(...candidates);
    lo = Math.min(...candidates);
    best = Math.max(best, hi);
  }
  return best;
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

  "3Sum": `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const s = nums[i] + nums[lo] + nums[hi];
      if (s < 0) lo++;
      else if (s > 0) hi--;
      else {
        res.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++;
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--;
        lo++; hi--;
      }
    }
  }
  return res;
}`,

  "Container With Most Water": `function maxArea(height: number[]): number {
  let lo = 0, hi = height.length - 1, best = 0;
  while (lo < hi) {
    best = Math.max(best, Math.min(height[lo], height[hi]) * (hi - lo));
    if (height[lo] < height[hi]) lo++;
    else hi--;
  }
  return best;
}`,

  "Trapping Rain Water": `function trap(height: number[]): number {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,

  "Sort Colors": `function sortColors(nums: number[]): void {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}`,

  "Rotate Image": `function rotate(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]; // transpose

  for (const row of matrix) row.reverse(); // mirror each row left-right
}`,

  "Spiral Matrix": `function spiralOrder(matrix: number[][]): number[] {
  const res: number[] = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,

  "Set Matrix Zeroes": `function setZeroes(matrix: number[][]): void {
  const rows = matrix.length, cols = matrix[0].length;
  let firstRowZero = false, firstColZero = false;

  for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRowZero = true;
  for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColZero = true;

  // use row 0 / col 0 themselves as the O(1)-space marker for the rest of the grid
  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; }

  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;

  if (firstRowZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;
  if (firstColZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;
}`,
};

export default solutions;
