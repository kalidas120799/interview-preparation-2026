// ======================================================
// Bubble Sort
// ======================================================

// Compares adjacent elements and swaps them if they are
// in the wrong order. Repeats until the array is sorted.

function bubbleSort(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] > data[i + 1]) {
      let temp = data[i];
      data[i] = data[i + 1];
      data[i + 1] = temp;

      i = -1;
    }
  }

  return data;
}

console.log(bubbleSort([10, 1, 5, -3, 0, 2, 6, 8]));

console.log(
  bubbleSort([
    "HTML",
    "CSS",
    "JS",
    "Angular JS",
    "XML",
    "React",
    "Python",
  ])
);

// ======================================================
// Selection Sort
// ======================================================

// Take one item and find the smallest element on the
// right side. If found, swap both items.

function selectionSort(data) {
  const dataLength = data.length;

  for (let i = 0; i < dataLength; i++) {
    let min = data[i];
    let minIndex = i;

    for (let j = i + 1; j < dataLength; j++) {
      if (data[j] < min) {
        min = data[j];
        minIndex = j;
      }
    }

    let swap = data[i];
    data[i] = data[minIndex];
    data[minIndex] = swap;
  }

  return data;
}

console.log(selectionSort([10, 1, 5, -3, 0, 2, 6, 8]));

console.log(
  selectionSort([
    "HTML",
    "CSS",
    "JS",
    "Angular JS",
    "XML",
    "React",
    "Python",
  ])
);

// ======================================================
// Insertion Sort
// ======================================================

// Builds the sorted array one element at a time by
// inserting each element into its correct position.

function insertionSort(data) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let j = i - 1;

    while (j >= 0 && data[j] > item) {
      data[j + 1] = data[j];
      j--;
    }

    data[j + 1] = item;
  }

  return data;
}

console.log(insertionSort([10, 1, 5, -3, 0, 2, 6, 8]));

console.log(
  insertionSort([
    "HTML",
    "CSS",
    "JS",
    "Angular JS",
    "XML",
    "React",
    "Python",
  ])
);

// ======================================================
// Linear Search
// ======================================================

// Sequentially checks each element until the target
// is found or the array ends.

function linearSearch(data, target) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }

  return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 5)); // 4

// ======================================================
// Binary Search
// ======================================================

// Works only on sorted arrays.
// Repeatedly divides the search interval in half.

function binarySearch(data, target) {
  let start = 0;
  let end = data.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      // Search right half
      start = mid + 1;
    } else {
      // Search left half
      end = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 4)); // 3