// bubble sort
// compares adjacent elements, and swaps them if they are in the wrong order. It continues until the list is sorted
function bubbleSort(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i] > data[i + 1]) {
      let temp = data[i];
      data[i] = data[i + 1]
      data[i + 1] = temp;
      i = -1;
    }
  }
  return data;
}

console.log(bubbleSort([10, 1, 5, -3, 0, 2, 6, 8]));
console.log(bubbleSort(["HTML", "CSS", "JS", "Angular JS", "XML", "React", "Python"]))

// Selection Sort
// Take item and find small element to right side. if found swap the items
function selectionSort(data) {
  const dataLength = data.length;
  for (let i = 0; i < dataLength; i++) {
    let min = data[i];
    let minIndex = i;
    for (var j = i + 1; j < dataLength; j++) {
      if (data[j] < min) {
        min = data[j]
        minIndex = j;
      }
    }
    let swap = data[i];
    data[i] = data[minIndex];
    data[minIndex] = swap
  }
  return data;
}

console.log(selectionSort([10, 1, 5, -3, 0, 2, 6, 8]));
console.log(selectionSort(["HTML", "CSS", "JS", "Angular JS", "XML", "React", "Python"]))

// Insertion sort
// This algorithm builds the final sorted list one element at a time by repeatedly taking the next element from the unsorted
// part and inserting it into its correct position in the sorted part
// if take one element and we check the left side elements are sorted if not inserting it into its correct position in the sorted part
function insertionSort(data) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let j = i - 1;
    while (j >= 0 && data[j] > item) {
      data[j + 1] = data[j]
      j--;
    }
    data[j + 1] = item
  }
  return data
}

console.log(insertionSort([10, 1, 5, -3, 0, 2, 6, 8]));
console.log(insertionSort(["HTML", "CSS", "JS", "Angular JS", "XML", "React", "Python"]))

// linear search
/* this algorithm sequentially checks each element of the list until the desired element is found or the end of the list is reached. */
function linearSearch(data, target) {
  for (var i = 0; i < data.length; i++) {
    if (data[i] === target) return i;
  }
  return -1
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 5))

// binary search
/* This algorithm works on sorted arrays. It repeatedly divides the search interval in half until 
the desired element is found or the interval becomes empty */
function binarySearch(data, target) {
  let start = 0;
  let end = data.length;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (data[mid] === target) return mid;
    else if (data[mid] < target)
      start = mid + 1; // targeting right side of the array
    else
      end = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 4))
