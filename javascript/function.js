// function is a block of reusable code that performs a specific task or calculates a value
// function doesn't have a name it's called anonymous function

// Function Declarations
function fnName() {
  console.log("fnName")
}
fnName();

const fnName1 = function () {
  console.log("fnName1")
}
fnName1();

// with parameters
function fnName2(params) {
  console.log(params)
}
fnName2("kalidas"); // "kalidas" is argument

// return function
function sum(x, y) {
  return x + y
}
console.log(sum(1, 2)); // 3

// default Parameter
function calc(x, y = 10) {
  return x + y
}
console.log(calc(5, 5)) // 10
console.log(calc(5)) // 15

// rest Parameter
// Is something that allows a fn to accept any number of arguments
// only one rest parameter in fn and rest parameter must be last
function display(params, ...restParams) {
  console.log(params)
  console.log(restParams)
}
display("hi", "kalidas", "software developer");

// arrow function or fat arrow syntax
// arrow fun not binding this keyword
const sub = (x, y) => x - y;
console.log(sub(10, 5));

// closure function
/* a closure is a combination of a function and the lexical environment within which that function was declared. This means
that a closure has access to variables and parameters of its outer function even after the outer function has finished executing */

// or nested fn is a closure
function outer(x) {
  function inner(y) {
    return x + y
  }
  return inner;
}
const outerFn = outer(10);
console.log(outerFn(5)) // 10

// callback function
/* A callback function in JavaScript is a function that is passed as an argument to another function and is executed after some asynchronous operation,
Callback functions are commonly used in event handling, AJAX requests, and asynchronous programming */
function doSomethingAsync(callback) {
  setTimeout(function () {
    console.log("Async operation completed");
    callback();
  }, 2000);
}

function callbackFunction() {
  console.log("Callback function executed");
}

doSomethingAsync(callbackFunction);

// high order function (HOF)
// HOF is a function, it's take one or more fn as argument and it may return fn
// map, filter, reduce are HOF's
function returnFn() {
  return function () {
    console.log("inner fn")
  }
}

const fn = returnFn();
fn();

// pure function
// is a fn it's produce same output as a input
function welcome(name) {
  console.log(`Hi ${name}`)
}
welcome("kalidas");

// im pure function
// is a fn it's not produce same output as a input
let msg = "hai";

function welcome1(name) {
  console.log(`${msg} ${name}`)
}

welcome1("kalidas"); // hai kalidas

msg = "welcome";
welcome1("kalidas"); // welcome kalidas

// IIFE (Immediately Invoked Function Expression)
(function () {
  console.log("IIFE fn")
})();

// recursion
// fn that refer or call itself with base condition
/* 
function fn(){
  if(condition) return console.log("---fn---")
  fn();
}
fn()

const f1 = function f2(){
  if(condition) return f1()
}
f1()
*/

function fetchWater(count) {
  if (count === 0) {
    console.log("no more water")
    return
  }

  console.log("fetching water...")
  fetchWater(count - 1)
}

fetchWater(4);
