// https://leetcode.com/problems/rotate-array
function rotateArr(arr, rotate){
    for(let i=0; i<rotate; i++){
        let last = arr[arr.length-1]
        arr.pop()
        // arr.unshift(last);
        arr = [last,...arr]
    }
    return arr
}

console.log(rotateArr([1,2,3,4,5,6,7],3)) // [5,6,7,1,2,3,4]
console.log(rotateArr([-1,-100,3,99],2)) // [3,99,-1,-100]

function maxOddSum(arr){
    let sum=0;
    for(let item of arr){
        if(item % 2 !=0){
            sum+=item
        }
    }
    return sum;
}

console.log(maxOddSum([1,2,3,5,6])) // 9

// https://leetcode.com/problems/median-of-two-sorted-arrays
function findMedianSortedArrays(arr1,arr2){
    const newArr = arr1.concat(arr2).sort((a,b) => a - b);
    const mid = Math.floor(newArr.length/2)
    if(newArr.length %2 !=0)
        return newArr[mid];
    else{
        return (newArr[mid-1]+newArr[mid])/2
    }
}

console.log(findMedianSortedArrays([1,2],[3])) // 2
console.log(findMedianSortedArrays([1,2],[3,4])) // 2.5

// https://leetcode.com/problems/sort-colors
function sortColors(arr,orders){
    let count=0,result=[];
    for(let order of orders){
        for(let item of arr){
            if(item === order){
                result[count]=item;
                count++
            }
        }
    }
    return result;
}

console.log(sortColors([2,0,2,1,1,0],[0,2,1])) // [ 0, 0, 2, 2, 1, 1 ]

// https://leetcode.com/problems/kids-with-the-greatest-number-of-candies
function kidsWithCandies(candies, extraCandies) {
    const max = Math.max(...candies);
    for (let i = 0; i < candies.length; i++) {
        candies[i] = candies[i] + extraCandies >= max;
    }
    return candies;
}

console.log(kidsWithCandies([2,3,5,1,3],3)) // [ true, true, true, false, true ]
console.log(kidsWithCandies([4,2,1,1,2],1)) // [ true, false, false, false, false ]

// https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks
function maximumBags(capacity, rocks, additionalRocks) {
    let balance = [];

    for (let i = 0; i < capacity.length; i++) {
        balance.push(capacity[i] - rocks[i]);
    }

    balance.sort((a, b) => a - b);
    let remain = additionalRocks;

    for (let i = 0; i < balance.length; i++) {
        remain = remain - balance[i];

        if (remain < 0) {
            return i;
        }
    }

    return balance.length;
}

console.log(maximumBags([5, 2, 3, 4, 5, 3], [3, 1, 2, 4, 3, 2], 3)) // 4

// https://leetcode.com/problems/next-greater-element-i/
function nextGreaterElement(num1, num2) {
    const ans = [];
    for (let i = 0; i < num1.length; i++) {
        let index = -1;
        for (let j = 0; j < num2.length; j++) {
            if (num1[i] === num2[j]) {
                for (let k = j + 1; k < num2.length; k++) {
                    if (num2[k] > num1[i]) {
                        index = num2[k];
                        break;
                    }
                }
                break;
            }
        }
        ans.push(index);
    }
    return ans;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])) // [-1,3,-1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])) // [3,-1]