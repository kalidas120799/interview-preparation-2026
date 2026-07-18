// typeof
console.log(typeof "123"); // string
console.log(typeof 32); // number
console.log(typeof true); // boolean
console.log(typeof NaN); // number
console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof new Date()); // object
console.log(typeof new RegExp()); // object

// Math
console.log(Math.round(3.7)); // 4
console.log(Math.floor(3.7)); // 3
console.log(Math.ceil(3.3)); // 4
console.log(Math.pow(2, 3)); // 2^3 = 8
console.log(Math.sqrt(8)); // 2.828...
console.log(Math.abs(-8), Math.abs(8)); // 8 8
console.log(Math.min(1, 3, 4, 5, 1)); // 1
console.log(Math.max(...[1, 3, 4, 5, 1])); // 5
console.log(Math.random()); // 0.xxxxx

console.log(Math.floor(1994 / 1000)); // 1
console.log(Math.floor((1994 % 1000) / 100)); // 9
console.log(Math.floor((1994 % 100) / 10)); // 9
console.log(1994 % 10); // 4

// Type Casting

// Explicit
console.log(Number("5")); // 5
console.log(Number("sss")); // NaN

const num = 100;

console.log(num.toString()); // "100"
console.log(String(true)); // "true"

console.log(
  Boolean(""),
  Boolean(0),
  Boolean(null),
  Boolean(undefined)
); // false false false false

console.log(
  Boolean(1),
  Boolean("kalidas")
); // true true

// Implicit
console.log("5" + 10); // "510"
console.log(2 + true); // 3

console.log("10" == 10, "10" === 10); // true false
console.log(0 == false, 0 === false); // true false

// for
for (var i = 0; i < 10; i++) {
  console.log(i);
}

for (const item of [1, 3, 4, 5]) {
  console.log(item);
}

for (const index in [1, 3, 4, 5]) {
  console.log(index);
}

for (const [index, item] of [1, 3, 4, 5].entries()) {
  console.log(index, item);
}

[1, 3, 4, 5].forEach((item, index) => {
  console.log(item, index);
});

// hoisting
console.log("a :", a); // undefined

var a = 2;

function abc() {
  console.log("a :", a); // undefined

  var a = 20;

  console.log("a :", a); // 20
}

abc();

console.log("a :", a); // 2

// groupBy
function groupBy(data, key) {
  return data.reduce((acc, item) => {
    const dataKey = item[key];

    if (!acc[dataKey]) {
      acc[dataKey] = [];
    }

    acc[dataKey].push(item);

    return acc;
  }, {});
}

// Odd / Even
function isOdd(n) {
  return n % 2 !== 0;
}

console.log(isOdd(2)); // false
console.log(isOdd(3)); // true

function isEven(n) {
  return n % 2 === 0;
}

console.log(isEven(2)); // true
console.log(isEven(3)); // false

// asynchronous operations allow tasks to execute independently

// Handle Asynchronous Operations
// Callbacks, Promises, Async/Await

// setTimeout(() => {
//   console.log("---settimeout");
// }, 2000);

// setInterval(() => {
//   console.log("setinterval");
// }, 2000);

// Callbacks
/*
A function passed as an argument to another function.
The first function (often asynchronous) calls the callback
function when it finishes its operation.
*/

function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json));
}

fetchData(
  "https://jsonplaceholder.typicode.com/todos/1",
  (data) => {
    console.log(data);
  }
);

// Promises
function fetchData1(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

fetchData1("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

// Async / Await
async function fetchData2(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData2("https://jsonplaceholder.typicode.com/todos/1");
