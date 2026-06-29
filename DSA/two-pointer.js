/*
Two Pointer
-----------

Input     → Array / String (mostly sorted or pair based)
Positions → left = 0, right = n - 1 (or same direction)
Condition → arr[left] + arr[right] == target
Move      → if sum < target → left++
             if sum > target → right--
             if valid → store result
Stop      → while (left < right)
Result    → return indices / count / boolean
*/

// ======================================================
// Reverse String
// https://leetcode.com/problems/reverse-string/
// ======================================================

function reverseStr(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;

    // [s[left], s[right]] = [s[right], s[left]]

    left++;
    right--;
  }

  return s;
}

console.log(reverseStr(["h", "e", "l", "l", "o"])); // ["o","l","l","e","h"]

// ======================================================
// Valid Palindrome
// https://leetcode.com/problems/valid-palindrome/
// ======================================================

function isPalindrome(str) {
  let s = str.toLowerCase().replace(/[^a-z0-9]/gi, "");

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("CaT")); // false

// ======================================================
// Two Sum II
// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
// ======================================================

function twoSum(numbers, target) {
  let start = 0;
  let end = numbers.length - 1;

  while (start < end) {
    let sum = numbers[start] + numbers[end];

    if (sum === target) {
      return [start + 1, end + 1];
    } else if (sum < target) {
      start++;
    } else {
      end--;
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 26)); // [3,4]
console.log(twoSum([2, 4, 7, 15], 6)); // [1,2]

// ======================================================
// Reverse Prefix of Word
// https://leetcode.com/problems/reverse-prefix-of-word/
// ======================================================

function reversePrefix(word, ch) {
  let arr = word.split("");
  let end = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ch) {
      end = i;
      break;
    }
  }

  if (end === -1) return word;

  let left = 0;
  let right = end;

  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left++;
    right--;
  }

  return arr.join("");
}

console.log(reversePrefix("abcdefd", "d")); // dcbaefd

// ======================================================
// 3Sum
// https://leetcode.com/problems/3sum/
// ======================================================

function threeSum(nums) {
  nums.sort((a, b) => a - b);

  let result = {};

  for (let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let end = nums.length - 1;

    while (left < end) {
      let sum = nums[i] + nums[left] + nums[end];

      if (sum === 0) {
        result[[nums[i], nums[left], nums[end]].join("-")] = [
          nums[i],
          nums[left],
          nums[end],
        ];

        left++;
        end--;
      } else if (sum < 0) {
        left++;
      } else {
        end--;
      }
    }
  }

  return Object.values(result);
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]

// ======================================================
// 4Sum
// https://leetcode.com/problems/4sum/
// ======================================================

function fourSum(nums, target) {
  nums.sort((a, b) => a - b);

  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let start = j + 1;
      let end = nums.length - 1;

      while (start < end) {
        let sum = nums[i] + nums[j] + nums[start] + nums[end];

        if (sum === target) {
          result.push([
            nums[i],
            nums[j],
            nums[start],
            nums[end],
          ]);

          start++;
          end--;
        } else if (sum < target) {
          start++;
        } else {
          end--;
        }
      }
    }
  }

  return result;
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0)); // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

console.log(fourSum([-3, -1, 0, 2, 4, 5], 0)); // [[-3,-1,0,4]]

// ======================================================
// Remove Duplicates from Sorted Array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
// ======================================================

function removeDuplicates(nums) {
  let result = [];
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i + 1]) {
      result[k] = nums[i];
      k++;
    }
  }

  return result;
}

console.log(removeDuplicates([0, 0, 1, 1, 2, 3, 3, 6])); // [0,1,2,3,6]

// ======================================================
// Remove Element
// https://leetcode.com/problems/remove-element/
// ======================================================

function removeElement(nums, val) {
  let result = [];
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      result[k] = nums[i];
      k++;
    }
  }

  return result;
}

console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); // [0,1,3,0,4]

// ======================================================
// Find Index of First Occurrence
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
// ======================================================

function strStr(haystack, needle) {
  if (needle === "") return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let k = 0;

    while (
      k < needle.length &&
      haystack[i + k] === needle[k]
    ) {
      k++;
    }

    if (k === needle.length) {
      return i;
    }
  }

  return -1;
}

console.log(strStr("sadbutsad", "sad")); // 0

// ======================================================
// Move Zeroes
// https://leetcode.com/problems/move-zeroes/
// ======================================================

function moveZeroes(nums) {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[k] = nums[i];
      k++;
    }
  }

  for (let i = k; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]

// Swap Version

function moveZeroesV1(nums) {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let temp = nums[i];
      nums[i] = nums[k];
      nums[k] = temp;

      k++;
    }
  }

  return nums;
}

console.log(moveZeroesV1([0, 1, 0, 3, 0, 12])); // [1,3,12,0,0,0]