const solutions: Record<string, string> = {
  "Single Number": `function singleNumber(nums: number[]): number {
  // a^a=0 and a^0=a, XOR is commutative/associative — every paired
  // duplicate cancels itself out, leaving only the unpaired value.
  let res = 0;
  for (const n of nums) res ^= n;
  return res;
}`,

  "Number of 1 Bits": `function hammingWeight(n: number): number {
  let count = 0;
  while (n !== 0) {
    n &= n - 1; // Brian Kernighan's: clears the lowest set bit
    count++;
  }
  return count;
}`,

  "Counting Bits": `function countBits(n: number): number[] {
  const res = new Array(n + 1).fill(0);
  // i & (i-1) strips i's lowest set bit, landing on a smaller index
  // whose answer is already computed — one more bit than that.
  for (let i = 1; i <= n; i++) res[i] = res[i & (i - 1)] + 1;
  return res;
}`,

  "Reverse Bits": `function reverseBits(n: number): number {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res << 1) | (n & 1);
    n >>>= 1; // unsigned shift — avoids sign-extension on a set bit 31
  }
  return res >>> 0; // coerce back to an unsigned 32-bit value
}`,

  "Missing Number": `function missingNumber(nums: number[]): number {
  // XOR every index 0..n with every value in nums — indices/values that
  // exist in both cancel out, leaving the one index with no matching value.
  let res = nums.length;
  for (let i = 0; i < nums.length; i++) res ^= i ^ nums[i];
  return res;
}`,

  "Sum of Two Integers": `function getSum(a: number, b: number): number {
  // a^b adds without carrying; (a&b)<<1 is exactly the carry that XOR
  // dropped. Repeat until there's no carry left to fold in.
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,

  "Reverse Integer": `function reverse(x: number): number {
  const sign = x < 0 ? -1 : 1;
  let n = Math.abs(x);
  let res = 0;
  while (n > 0) {
    res = res * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  res *= sign;
  return res > 2 ** 31 - 1 || res < -(2 ** 31) ? 0 : res;
}`,
};

export default solutions;
