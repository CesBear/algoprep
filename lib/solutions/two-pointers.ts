const solutions: Record<string, string> = {
  "Valid Palindrome": `function isPalindrome(s: string): boolean {
  const clean: string[] = [];
  for (const ch of s.toLowerCase()) {
    if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) clean.push(ch);
  }
  let l = 0, r = clean.length - 1;
  while (l < r) { if (clean[l++] !== clean[r--]) return false; }
  return true;
}`,

  "Two Sum II (sorted input)": `function twoSum(numbers: number[], target: number): number[] {
  let lo = 0, hi = numbers.length - 1;
  while (lo < hi) {
    const s = numbers[lo] + numbers[hi];
    if (s === target) return [lo + 1, hi + 1];
    if (s < target) lo++;
    else hi--;
  }
  return [];
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
    // the shorter side is the bottleneck — moving the taller side keeps that
    // same bound (or a smaller one) while only shrinking width, so it can
    // never beat best. only advancing the shorter side has a chance to win.
    if (height[lo] < height[hi]) lo++;
    else hi--;
  }
  return best;
}`,

  "Remove Duplicates": `function removeDuplicates(nums: number[]): number {
  if (!nums.length) return 0;
  // slow only advances on a write, so slow <= fast always — fast has
  // already read past index slow, making the overwrite at nums[slow] safe
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++)
    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast];
  return slow + 1;
}`,

  "Move Zeroes": `function moveZeroes(nums: number[]): void {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++)
    if (nums[fast] !== 0) nums[slow++] = nums[fast];
  while (slow < nums.length) nums[slow++] = 0;
}`,

  "Sort Colors (Dutch Flag)": `function sortColors(nums: number[]): void {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo], nums[mid]] = [nums[mid], nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid], nums[hi]] = [nums[hi], nums[mid]]; hi--; }
  }
}`,

  "Trapping Rain Water": `function trap(height: number[]): number {
  // maxL/maxR track the tallest wall seen so far from each side. Whichever
  // side is currently shorter is safe to process: its water level is capped
  // by its own running max, since something at least as tall as the other
  // side's max is guaranteed to exist further along (we only ever advance
  // the shorter side, so the taller side's max is always a real wall ahead).
  let lo = 0, hi = height.length - 1, maxL = 0, maxR = 0, water = 0;
  while (lo < hi) {
    if (height[lo] < height[hi]) {
      if (height[lo] >= maxL) maxL = height[lo];
      else water += maxL - height[lo];
      lo++;
    } else {
      if (height[hi] >= maxR) maxR = height[hi];
      else water += maxR - height[hi];
      hi--;
    }
  }
  return water;
}`,

  "Linked List Cycle": `function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;  // meeting point ≠ cycle start
  }
  return false;
}`,

  "4Sum": `function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let lo = j + 1, hi = nums.length - 1;
      while (lo < hi) {
        const s = nums[i] + nums[j] + nums[lo] + nums[hi];
        if (s < target) lo++;
        else if (s > target) hi--;
        else {
          res.push([nums[i], nums[j], nums[lo], nums[hi]]);
          while (lo < hi && nums[lo] === nums[lo + 1]) lo++;
          while (lo < hi && nums[hi] === nums[hi - 1]) hi--;
          lo++; hi--;
        }
      }
    }
  }
  return res;
}`,
};

export default solutions;
