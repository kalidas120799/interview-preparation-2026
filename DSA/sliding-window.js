/*
Sliding Window

Input     → Array / String (contiguous range)
Positions → left = 0, right = 0
Condition → window valid OR invalid (sum / unique / freq)
Move      → expand → right++
             shrink → left++ (when condition fails)
Stop      → right < n
Result    → max/min length / sum / count
*/

// ======================================================
// Maximum Average Subarray I
// https://leetcode.com/problems/maximum-average-subarray-i/
// ======================================================

function findMaxAverage(nums, k) {
  let max = -Infinity;

  for (let i = 0; i <= nums.length - k; i++) {
    let j = 0;
    let sum = 0;

    while (j < k) {
      sum += nums[i + j];
      j++;
    }

    max = Math.max(max, sum);
  }

  return max / k;
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75

// ======================================================
// Contains Duplicate II
// https://leetcode.com/problems/contains-duplicate-ii/
// ======================================================

function containsNearbyDuplicate(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;

    while (j < nums.length) {
      if (nums[i] === nums[j] && j - i <= k) {
        return true;
      }

      j++;
    }
  }

  return false;
}

console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // true

// ======================================================
// Longest Substring Without Repeating Characters
// https://leetcode.com/problems/longest-substring-without-repeating-characters/
// ======================================================

function lengthOfLongestSubstring(s) {
  let set = new Set();

  let left = 0;
  let right = 0;
  let length = 0;

  while (right < s.length) {
    if (!set.has(s[right])) {
      set.add(s[right]);

      length = Math.max(length, set.size);

      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }

  return length;
}

console.log(lengthOfLongestSubstring("pwwkew")); // 3