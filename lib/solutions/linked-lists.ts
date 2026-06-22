const solutions: Record<string, string> = {
  "Reverse Linked List": `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null, cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}`,

  "Merge Two Sorted Lists": `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next!;
  }
  cur.next = l1 ?? l2;
  return dummy.next;
}`,

  "Reorder List": `function reorderList(head: ListNode | null): void {
  if (!head) return;
  // phase 1: find the middle (splits the list into two halves)
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next!; fast = fast.next.next; }
  // phase 2: reverse the second half in place
  let prev: ListNode | null = null, cur: ListNode | null = slow.next;
  slow.next = null;
  while (cur) { const next = cur.next; cur.next = prev; prev = cur; cur = next; }
  // phase 3: weave the reversed second half back into the first half
  let l1: ListNode | null = head, l2 = prev;
  while (l2) {
    const n1 = l1!.next, n2 = l2.next;
    l1!.next = l2; l2.next = n1;
    l1 = n1; l2 = n2;
  }
}`,

  "Remove Nth Node From End": `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy, slow: ListNode | null = dummy;
  // advance fast n+1 steps (not n) so slow ends up one node BEFORE the
  // target — needed because slow has to unlink it via slow.next = slow.next.next
  for (let i = 0; i <= n; i++) fast = fast!.next;
  while (fast) { fast = fast.next; slow = slow!.next; }
  slow!.next = slow!.next!.next;
  return dummy.next;
}`,

  "Copy List with Random Pointer": `function copyRandomList(head: Node | null): Node | null {
  const map = new Map<Node, Node>();
  let cur = head;
  while (cur) { map.set(cur, new Node(cur.val)); cur = cur.next; }
  cur = head;
  while (cur) {
    map.get(cur)!.next = cur.next ? map.get(cur.next)! : null;
    map.get(cur)!.random = cur.random ? map.get(cur.random)! : null;
    cur = cur.next;
  }
  return head ? map.get(head)! : null;
}`,

  "Add Two Numbers": `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let cur = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}`,

  "Linked List Cycle": `function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,

  "Middle of Linked List": `function middleNode(head: ListNode | null): ListNode | null {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow;
}`,

  "Find the Duplicate Number": `function findDuplicate(nums: number[]): number {
  let slow = nums[0], fast = nums[0];
  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
  // slow === fast now, but that's just some node in the cycle, not its start.
  // resetting one pointer to the head and advancing both 1 step finds the start.
  slow = nums[0];
  while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
  return slow;
}`,

  "LRU Cache": `class LRUCache {
  private cap: number;
  private map = new Map<number, number>();
  constructor(capacity: number) { this.cap = capacity; }
  // Map preserves insertion order; delete+set moves a key to the
  // most-recently-used end without needing a manual doubly-linked list
  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key); this.map.set(key, val);
    return val;
  }
  put(key: number, value: number): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value!);
  }
}`,

  "Merge K Sorted Lists": `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const merged: Array<ListNode | null> = [];
    for (let i = 0; i < lists.length; i += 2)
      merged.push(mergeTwoLists(lists[i], lists[i + 1] ?? null));
    lists = merged;
  }
  return lists[0];
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0); let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next!;
  }
  cur.next = l1 ?? l2; return dummy.next;
}`,

  "Reverse Nodes in K-Group": `// recursive: O(n/k) call-stack depth, not O(1) space
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let node = head; let count = 0;
  while (node && count < k) { node = node.next; count++; }
  if (count < k) return head;
  let prev: ListNode | null = null, cur: ListNode | null = head;
  for (let i = 0; i < k; i++) {
    const next = cur!.next; cur!.next = prev; prev = cur; cur = next;
  }
  head!.next = reverseKGroup(cur, k);
  return prev;
}`,
};

export default solutions;
