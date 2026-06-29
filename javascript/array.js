// swap array
let arr = [1, 0, 4, 5, 4, 3, -5];
// using temp
let tempArr = [...arr];
let temp = tempArr[0];
[tempArr[0], tempArr[1]] = [tempArr[1], temp];
console.log(tempArr) // 1, 0, 4, 5, 4, 3, -1 =>  0, 1, 4, 5, 4, 3, -1

// destructure
let tempArr1 = [...arr];
[tempArr1[0], tempArr1[1], tempArr1[3]] = [tempArr1[2], tempArr1[3], tempArr1[5]]
console.log(tempArr1) //1, 0, 4, 5, 4, 3, -1 =>  4, 5, 4, 3, 4, 3, -1

function flat(item) {
    let result = [];
    if (Array.isArray(item)) {
        for (var i = 0; i < item.length; i++) {
            result = result.concat(flat(item[i]))
        }
    } else {
        result.push(item)
    }
    return result
}

console.log([1, 2, 3, [4, [5, [0], 6]], 7, [8]].flat()) // [1,2,4,5,0,6,7,8]
console.log(flat([1, 2, 3, [4, [5, [0], 6]], 7, [8]])) // [1,2,4,5,0,6,7,8]

function myFilter(arr, fn) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            result.push(arr[i]);
        }
    }
    return result;
}

console.log(myFilter([1, 2, 4, 5], (e) => e != 4)) // [1,2,5]


function myReduce(arr, fn, initial) {
    let acc = initial;
    for (let i = 0; i < arr.length; i++) {
        acc = fn(acc, arr[i]);
    }
    return acc;
}

console.log(myReduce([1, 2, 3], (acc, curr) => acc + curr, 0)) // 6


function myFind(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) return arr[i];
    }
}

console.log(myFind([1, 9, 10, 12], (num) => num > 9)) // 10

function findElement(arr,key,value) {
    for (var i = 0; i < arr.length; i++) {
        if (key && arr[i][key] === value) return arr[i];
        else if(!key && arr[i] === value) return arr[i];
        return {};
    }
    return {};
}

console.log(findElement([{id:1,name:"kalidas"},{id:2,name:"dhanush"}], 1)) // { id: 1, name: 'kalidas' }
console.log(findElement([1,2,3,4,5,1],null, 1)) // 1

function findIndex(arr,key, value) {
    for (var i = 0; i < arr.length; i++) {
        if (key && arr[i][key] === value) return i;
        else if(!key && arr[i] === value) return i;
        return -1
    }
    return -1
}

console.log(findIndex([{id:1,name:"kalidas"},{id:2,name:"dhanush"}], 1)) // 0
console.log(findIndex([1,2,3,4,5,1], null,1)) // 0

function sort(data) {
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

console.log(sort([10, 1, 5, 2, 6, 8])); // [ 1, 2, 5, 6, 8, 10 ]
console.log(sort(["HTML", "CSS", "JS", "Angular JS", "React", "Python"])) // [ 'Angular JS', 'CSS', 'HTML', 'JS', 'Python', 'React' ]