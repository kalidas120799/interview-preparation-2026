# JavaScript Complete Interview Q&A

## 0. JavaScript Introduction & Core Interview Questions

### 1. What is JavaScript?
JavaScript is a high-level, dynamically typed programming language mainly used to add behavior and interactivity to web applications. It runs in browsers and also on servers using runtimes such as Node.js.
```js
const name = "Kalidas";
console.log(`Hello ${name}`);
```

### 2. Why is JavaScript popular?
JavaScript is supported by all major browsers and has a huge ecosystem of libraries, frameworks, and tools. It can be used for frontend, backend, mobile, desktop, and serverless development.
```js
// Frontend
React

// Backend
Node.js
```

### 3. What are the main advantages of JavaScript?
JavaScript is easy to start with, works across platforms, supports asynchronous programming, and has a large ecosystem. It also allows developers to build both frontend and backend applications.
```js
fetch("/api/users")
  .then(res => res.json());
```

### 4. What are the disadvantages of JavaScript?
JavaScript is dynamically typed, so some errors are discovered only at runtime, and its type coercion can cause unexpected results. Large applications can also become difficult to maintain without good architecture and tooling.
```js
console.log("5" + 2); // "52"
console.log("5" - 2); // 3
```

### 5. Is JavaScript the same as Java?
No. JavaScript and Java are different programming languages with different runtimes, syntax, and design goals. JavaScript is commonly used for web applications, while Java is widely used for enterprise and backend systems.
```js
// JavaScript
const x = 10;
```

### 6. Is JavaScript interpreted or compiled?
Modern JavaScript engines use JIT (Just-In-Time) compilation, combining interpretation and compilation techniques. The exact execution strategy depends on the JavaScript engine, such as V8.
```js
const result = 10 + 20;
```

### 7. Is JavaScript single-threaded?
The JavaScript execution model uses a single main thread for executing JavaScript code, but runtimes provide asynchronous APIs and mechanisms such as Web Workers. This allows I/O and other work to happen without blocking the main JavaScript thread.
```js
console.log("Start");

setTimeout(() => console.log("Async"), 0);

console.log("End");
```

### 8. What is ECMAScript?
ECMAScript is the language specification that defines the core features and behavior of JavaScript. JavaScript is an implementation of the ECMAScript specification with additional host APIs provided by environments such as browsers.
```js
let user = "John"; // ECMAScript syntax
```

### 9. What is a JavaScript engine?
A JavaScript engine executes JavaScript code. Examples include V8 in Chrome and Node.js, SpiderMonkey in Firefox, and JavaScriptCore in Safari.
```js
console.log(10 + 20); // executed by the JS engine
```

### 10. What is the difference between JavaScript and TypeScript?
JavaScript is dynamically typed, while TypeScript adds static type checking and is compiled/transpiled to JavaScript. TypeScript helps catch many type-related errors during development.
```ts
let age: number = 25;
```

### 11. Where can JavaScript run?
JavaScript can run in browsers and server-side runtimes such as Node.js. It can also be used in environments such as workers, serverless platforms, desktop frameworks, and mobile frameworks.
```js
// Browser
window.alert("Hello");

// Node.js
console.log("Hello");
```

### 12. What are the key features of JavaScript?
Important features include dynamic typing, first-class functions, objects, prototypes, closures, asynchronous programming, modules, and event-driven execution. These features make JavaScript flexible for different application types.
```js
const add = (a, b) => a + b;
```

### 13. What is dynamic typing in JavaScript?
Dynamic typing means a variable does not have a fixed type declared at compile time and can hold values of different types. The type is associated with the value at runtime.
```js
let value = 10;
value = "hello";
```

### 14. What is weak typing in JavaScript?
JavaScript allows implicit type conversion in many operations, which is why it is often described as weakly typed. This can be convenient but can also produce surprising results.
```js
console.log("10" + 5); // "105"
```

### 15. What are the limitations of JavaScript?
Common limitations include dynamic typing, runtime errors, browser security restrictions, single-threaded main execution, and potential performance issues from poorly written code. Good TypeScript usage, architecture, testing, and performance practices reduce many of these problems.
```js
// Runtime error
const user = null;
// user.name; // TypeError
```

### 16. Why is JavaScript called a scripting language?
Historically, JavaScript was designed to add scripts and dynamic behavior to web pages rather than operate as a standalone compiled application language. Today, it is a general-purpose programming language and can power complete applications.
```js
document.querySelector("button")
  .addEventListener("click", () => alert("Clicked"));
```

### 17. What is the difference between JavaScript and a JavaScript runtime?
JavaScript is the language, while a runtime provides the engine plus environment-specific APIs needed to execute it. For example, a browser provides DOM APIs, while Node.js provides APIs such as `fs` and `http`.
```js
// Browser API
document.title = "App";

// Node.js API
// fs.readFile(...)
```

### 18. What are the advantages of JavaScript for web development?
It provides rich browser APIs, fast feedback during development, asynchronous networking, and a large ecosystem. It also allows interactive UI development without requiring a page reload for every action.
```js
button.addEventListener("click", () => {
  console.log("User clicked");
});
```

### 19. What are common disadvantages of using JavaScript in large applications?
Dynamic typing and flexible language features can make large codebases harder to reason about if coding standards are weak. Dependency management, browser differences, and accidental complexity can also become challenges.
```js
// TypeScript can help catch this earlier
let count = 10;
// count = "ten";
```

### 20. Why should a senior developer know JavaScript fundamentals before React or Node.js?
React and Node.js are built around JavaScript concepts such as functions, closures, objects, modules, promises, and the event loop. Strong fundamentals make framework behavior easier to understand and debug.
```js
const createUser = name => ({
  name,
  getName: () => name
});
```

---

## 1. JavaScript Fundamentals

### 1.1 What are `var`, `let`, and `const`?
`var` is function-scoped and can be redeclared, while `let` and `const` are block-scoped. `const` cannot be reassigned after initialization, although object contents can still be changed.

```js
var a = 10;
let b = 20;
const c = 30;
```

### 1.2 What are JavaScript data types?
JavaScript has primitive types such as string, number, bigint, boolean, undefined, null, and symbol, plus objects. Functions and arrays are also objects in JavaScript.

```js
const name = "Kalidas"; // string
const age = 30;         // number
const user = {};        // object
```

### 1.3 What is the difference between primitive and reference types?
Primitive values are immutable and are copied by value, while objects are reference values and their references are copied. Therefore, changing a shared object can affect multiple variables.

```js
let a = 10;
let b = a;
b = 20; // a remains 10

const x = { name: "A" };
const y = x;
y.name = "B"; // x.name is also "B"
```

### 1.4 What is type coercion?
Type coercion is JavaScript automatically converting one type to another during an operation. It commonly happens with `+`, comparisons, and equality operators.

```js
console.log("5" + 2); // "52"
console.log("5" - 2); // 3
```

### 1.5 What is the difference between `==` and `===`?
`==` performs type coercion before comparison, while `===` compares both value and type without coercion. In production code, `===` is generally preferred because it is more predictable.

```js
5 == "5";  // true
5 === "5"; // false
```

### 1.6 What are truthy and falsy values?
Falsy values include `false`, `0`, `-0`, `""`, `null`, `undefined`, and `NaN`; most other values are truthy. This behavior is commonly used in conditional and short-circuit expressions.

```js
if ("hello") console.log("truthy");
if (0) console.log("not executed");
```

### 1.7 What are template literals?
Template literals use backticks and allow string interpolation and multiline strings. They make dynamic string creation easier to read.

```js
const name = "Kalidas";
console.log(`Hello ${name}`);
```

### 1.8 What is destructuring?
Destructuring extracts values from arrays or properties from objects into variables. It is frequently used with function parameters, React props, and API responses.

```js
const user = { name: "Kalidas", age: 30 };
const { name, age } = user;
```

### 1.9 What are spread and rest operators?
Both use `...`, but spread expands values while rest collects remaining values. Spread is commonly used for copying/merging, while rest is useful for variable arguments.

```js
const a = [1, 2];
const b = [...a, 3];

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

### 1.10 What is optional chaining?
Optional chaining `?.` safely accesses nested properties without throwing when an intermediate value is null or undefined. It returns `undefined` instead.

```js
const city = user?.address?.city;
```

### 1.11 What is nullish coalescing?
The `??` operator returns the right-hand value only when the left-hand value is `null` or `undefined`. Unlike `||`, it preserves valid falsy values such as `0` and `""`.

```js
const count = 0;
console.log(count ?? 10); // 0
```

### 1.12 What does `typeof` do?
`typeof` returns a string describing the type of a value. One famous quirk is that `typeof null` returns `"object"`.

```js
typeof 10;       // "number"
typeof "hello";  // "string"
typeof null;     // "object"
```

### 1.13 What is the `void` operator?
`void` evaluates an expression and always returns `undefined`. It is uncommon in modern application code but can appear in older JavaScript patterns.

```js
console.log(void 0); // undefined
```

### 1.14 What is the comma operator?
The comma operator evaluates multiple expressions from left to right and returns the value of the final expression. It is different from commas used to separate function arguments or declarations.

```js
const result = (1 + 2, 3 + 4);
console.log(result); // 7
```

### 1.15 What is short-circuit evaluation?
`&&` stops when it finds a falsy value, while `||` stops when it finds a truthy value. This allows conditional execution and default-value patterns.

```js
isLoggedIn && showDashboard();
const name = inputName || "Guest";
```

### 1.16 What are tagged template literals?
A tagged template passes the template's strings and interpolated values to a function. It can be used for custom formatting, escaping, and domain-specific string processing.

```js
function tag(strings, value) {
  return `${strings[0]}${value}`;
}
tag`Hello ${"World"}`;
```

### 1.17 What is object shorthand notation?
When an object's property name and variable name are the same, JavaScript allows the shorter `{ name }` syntax. It improves readability when constructing objects.

```js
const name = "Kalidas";
const user = { name };
```

### 1.18 What are computed property names?
Computed property names allow an expression to determine an object's property name. They are written using square brackets inside an object literal.

```js
const key = "name";
const user = { [key]: "Kalidas" };
```

---



## 2. Functions

### 2.1 What is a function declaration vs expression?
A function declaration defines a named function directly, while a function expression stores a function in a variable. Declarations are hoisted differently from expressions.

```js
function add(a, b) { return a + b; }
const multiply = function(a, b) { return a * b; };
```

### 2.2 What are arrow functions?
Arrow functions provide shorter function syntax and do not create their own `this`. They are especially useful for callbacks and functional operations.

```js
const add = (a, b) => a + b;
```

### 2.3 What are parameters and arguments?
Parameters are the variables defined in a function declaration, while arguments are the actual values passed during the call. A function can receive fewer or more arguments than its declared parameters.

```js
function greet(name) { return `Hi ${name}`; }
greet("Kalidas"); // "Kalidas" is an argument
```

### 2.4 What are default parameters?
Default parameters provide fallback values when an argument is `undefined`. They make function APIs simpler and avoid manual default checks.

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}
```

### 2.5 What are first-class functions?
JavaScript treats functions as values, so they can be assigned to variables, passed as arguments, and returned from other functions. This enables higher-order functions and functional programming.

```js
const fn = () => 10;
function run(callback) { return callback(); }
```

### 2.6 What is a higher-order function?
A higher-order function accepts another function as an argument, returns a function, or both. Array methods such as `map` and `filter` are common examples.

```js
const doubled = [1, 2, 3].map(x => x * 2);
```

### 2.7 What is a callback?
A callback is a function passed to another function to be executed later or at a specific point. Callbacks are common in array methods and asynchronous operations.

```js
setTimeout(() => console.log("Done"), 1000);
```

### 2.8 What is a pure function?
A pure function produces the same output for the same input and does not modify external state. Pure functions are easier to test and reason about.

```js
function add(a, b) {
  return a + b;
}
```

### 2.9 What is an IIFE?
An IIFE, or Immediately Invoked Function Expression, is a function that is defined and executed immediately. It was traditionally used to create private scope before ES modules became common.

```js
(() => {
  const secret = 42;
})();
```

### 2.10 What is recursion?
Recursion is when a function calls itself until it reaches a base condition. It is useful for problems such as tree traversal and nested data processing.

```js
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

### 2.11 What is the `arguments` object?
The `arguments` object contains arguments passed to a traditional function. Arrow functions do not have their own `arguments`, so rest parameters are preferred in modern code.

```js
function sum() {
  return [...arguments].reduce((a, b) => a + b, 0);
}
```

### 2.12 What is a named function expression?
A named function expression assigns a name to a function expression, which can improve stack traces and allows the function to refer to itself.

```js
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
```

### 2.13 What is function composition?
Function composition combines smaller functions so the output of one becomes the input of another. It helps build reusable processing pipelines.

```js
const double = x => x * 2;
const addOne = x => x + 1;
const result = addOne(double(3)); // 7
```

### 2.14 What are `call`, `apply`, and `bind`?
They control the `this` value of a function: `call` takes individual arguments, `apply` takes an array-like argument list, and `bind` returns a new function with `this` fixed.

```js
function greet(msg) { return `${msg}, ${this.name}`; }
greet.call({ name: "Kalidas" }, "Hi");
```

---

## 3. Scope & Execution

### 3.1 What is global scope?
A variable in global scope can be accessed from many parts of the program, subject to module and environment rules. Excessive global state can cause naming conflicts and make applications harder to maintain.

```js
const appName = "MyApp";
function show() { console.log(appName); }
```

### 3.2 What is function scope?
Variables declared with `var` are function-scoped, meaning they are accessible throughout the function where they are declared. `let` and `const` are block-scoped instead.

```js
function test() {
  var x = 10;
}
```

### 3.3 What is block scope?
A block is code surrounded by `{}` such as an `if` or loop. Variables declared with `let` and `const` exist only inside that block.

```js
if (true) {
  let x = 10;
}
```

### 3.4 What is lexical scope?
Lexical scope means variable visibility is determined by where code is written, not where a function is called. Inner functions can access variables from their outer lexical scope.

```js
const name = "Kalidas";
function show() {
  console.log(name);
}
```

### 3.5 What is the scope chain?
When JavaScript cannot find a variable in the current scope, it searches the outer lexical scopes until it reaches the global scope. This lookup process is the scope chain.

```js
const a = 1;
function outer() {
  const b = 2;
  function inner() { console.log(a, b); }
}
```

### 3.6 What is an execution context?
An execution context is the environment JavaScript creates to run code, including variables, scope information, and the value of `this`. Common contexts are global, function, and module contexts.

```js
function test() {
  const x = 10; // part of this function's execution context
}
```

### 3.7 What is the call stack?
The call stack tracks active function calls in last-in-first-out order. When a function finishes, its stack frame is removed.

```js
function a() { b(); }
function b() { console.log("B"); }
a();
```

### 3.8 What is hoisting?
Hoisting describes how declarations are processed before code execution. Function declarations are callable before their source position, while `let` and `const` remain inaccessible during their temporal dead zone.

```js
sayHi();
function sayHi() {
  console.log("Hi");
}
```

### 3.9 What is the Temporal Dead Zone?
The Temporal Dead Zone is the period between entering a scope and the point where a `let` or `const` variable is initialized. Accessing it during this period throws a `ReferenceError`.

```js
console.log(x); // ReferenceError
let x = 10;
```

### 3.10 What is variable shadowing?
Shadowing occurs when an inner scope declares a variable with the same name as a variable in an outer scope. The inner variable takes precedence within that scope.

```js
let name = "Outer";
{
  let name = "Inner";
  console.log(name); // Inner
}
```

### 3.11 What is module scope?
Variables declared in an ES module are scoped to that module and are not automatically global. Modules communicate through explicit `export` and `import`.

```js
const secret = 123;
export { secret };
```

### 3.12 What is strict mode?
Strict mode enables stricter JavaScript rules and prevents some error-prone behaviors. It is automatically enabled in ES modules.

```js
"use strict";
x = 10; // ReferenceError
```

### 3.13 Why is `with` discouraged or banned in strict mode?
`with` changes the scope lookup rules dynamically, making code difficult to analyze and optimize. Strict mode therefore disallows it.

```js
"use strict";
// with (obj) {} // SyntaxError
```

---

## 4. Objects & Prototypes

### 4.1 How can you create an object?
Objects can be created using object literals, constructors, classes, or `Object.create`. Object literals are the most common for simple objects.

```js
const user = { name: "Kalidas" };
```

### 4.2 What is `this`?
`this` refers to the execution context's receiver and its value depends on how a function is called. Arrow functions do not have their own `this`; they capture it lexically.

```js
const user = {
  name: "Kalidas",
  greet() { return this.name; }
};
```

### 4.3 What is a constructor function?
A constructor function is a regular function traditionally used with `new` to create objects and initialize their properties. Classes provide a more modern syntax over prototype-based behavior.

```js
function User(name) {
  this.name = name;
}
const user = new User("Kalidas");
```

### 4.4 What is a prototype?
A prototype is an object from which another object can inherit properties and methods. JavaScript uses prototypes to implement inheritance and method sharing.

```js
const user = { name: "Kalidas" };
console.log(Object.getPrototypeOf(user));
```

### 4.5 What is the prototype chain?
If a property is not found directly on an object, JavaScript searches its prototype and then that prototype's prototype until it reaches `null`. This is called the prototype chain.

```js
const user = {};
console.log(user.toString); // found through the chain
```

### 4.6 What is `Object.create()`?
`Object.create()` creates a new object with a specified prototype. It is useful when you want explicit prototype-based inheritance.

```js
const person = { greet() { return "Hi"; } };
const user = Object.create(person);
```

### 4.7 What are JavaScript classes?
Classes provide syntax for creating objects and defining methods and inheritance. Internally, JavaScript classes still use the prototype system.

```js
class User {
  constructor(name) { this.name = name; }
  greet() { return `Hi ${this.name}`; }
}
```

### 4.8 What is inheritance?
Inheritance allows an object or class to reuse behavior from another object or class. In JavaScript, class inheritance is implemented using prototypes.

```js
class Admin extends User {
  deleteUser() {}
}
```

### 4.9 What is encapsulation?
Encapsulation means keeping implementation details controlled behind a public interface. JavaScript supports this through closures and private class fields.

```js
class Counter {
  #count = 0;
  increment() { this.#count++; }
}
```

### 4.10 What are static methods?
Static methods belong to the class itself rather than instances created from it. They are useful for utility or factory operations.

```js
class MathUtil {
  static add(a, b) { return a + b; }
}
MathUtil.add(2, 3);
```

### 4.11 What are getters and setters?
Getters allow property-like access to a method, while setters control assignment to a property. They are useful for validation and computed values.

```js
class User {
  get name() { return this._name; }
  set name(value) { this._name = value.trim(); }
}
```

### 4.12 What is the difference between `Object.freeze()` and `Object.seal()`?
`freeze()` prevents adding, deleting, or changing existing properties, while `seal()` prevents adding or deleting properties but allows changing writable values. Both are shallow operations.

```js
const a = Object.freeze({ x: 1 });
const b = Object.seal({ x: 1 });
```

### 4.13 What are property descriptors?
Property descriptors control attributes such as `writable`, `enumerable`, and `configurable`. They allow fine-grained control over object properties.

```js
Object.defineProperty(obj, "x", {
  value: 10,
  writable: false
});
```

### 4.14 What is `instanceof`?
`instanceof` checks whether an object's prototype chain contains a constructor's `prototype`. It is commonly used to test class or constructor relationships.

```js
class User {}
const user = new User();
user instanceof User; // true
```

### 4.15 What is `Object.hasOwn()`?
`Object.hasOwn()` checks whether a property directly belongs to an object rather than being inherited. It is a modern alternative to calling `hasOwnProperty()`.

```js
Object.hasOwn(user, "name");
```

### 4.16 What is a mixin?
A mixin is a technique for adding reusable behavior from one object into another without traditional inheritance. It is often implemented with `Object.assign()`.

```js
const canLog = {
  log() { console.log("log"); }
};
Object.assign(User.prototype, canLog);
```

### 4.17 What is the difference between `__proto__` and `prototype`?
`prototype` is a property on constructor functions and defines the object used for instances' inheritance. `__proto__` is an accessor for an object's actual prototype and should generally be avoided in favor of standard APIs.

```js
function User() {}
console.log(User.prototype);
const user = new User();
console.log(Object.getPrototypeOf(user));
```

---


## 5. Arrays & Built-in Methods

### 5.1 What does `map()` do?
`map()` creates a new array by transforming every element using a callback. It does not modify the original array.

```js
const result = [1, 2, 3].map(x => x * 2);
// [2, 4, 6]
```

### 5.2 What does `filter()` do?
`filter()` creates a new array containing elements for which the callback returns a truthy value.

```js
const result = [1, 2, 3, 4].filter(x => x % 2 === 0);
// [2, 4]
```

### 5.3 What does `reduce()` do?
`reduce()` processes an array and accumulates the values into a single result. It is useful for sums, grouping, transformations, and building objects.

```js
const total = [1, 2, 3].reduce((sum, x) => sum + x, 0);
// 6
```

### 5.4 What is `forEach()`?
`forEach()` executes a callback for each array element but does not create a new array. It is best for side effects rather than transformations.

```js
[1, 2, 3].forEach(x => console.log(x));
```

### 5.5 What are `find()` and `findIndex()`?
`find()` returns the first matching element, while `findIndex()` returns the index of the first matching element. If no match exists, they return `undefined` and `-1`.

```js
const users = [{ id: 1 }, { id: 2 }];
users.find(u => u.id === 2);
```

### 5.6 What do `some()` and `every()` do?
`some()` checks whether at least one element passes a condition, while `every()` checks whether all elements pass it.

```js
[1, 2, 3].some(x => x > 2);  // true
[1, 2, 3].every(x => x > 0); // true
```

### 5.7 What does `includes()` do?
`includes()` checks whether an array or string contains a specified value. It returns a boolean.

```js
[1, 2, 3].includes(2); // true
```

### 5.8 What is special about `sort()`?
`sort()` mutates the original array and converts elements to strings by default. For numbers, provide a comparator.

```js
[10, 2, 5].sort((a, b) => a - b);
// [2, 5, 10]
```

### 5.9 What is the difference between `slice()` and `splice()`?
`slice()` returns a portion without changing the original array, while `splice()` adds/removes elements and mutates the original array.

```js
const a = [1, 2, 3];
a.slice(1);  // [2, 3]
a.splice(1, 1); // removes 2
```

### 5.10 What does `concat()` do?
`concat()` creates a new array by combining arrays or values without mutating the original array.

```js
[1, 2].concat([3, 4]);
// [1, 2, 3, 4]
```

### 5.11 What do `flat()` and `flatMap()` do?
`flat()` removes nested array levels up to a specified depth, while `flatMap()` maps elements and then flattens one level. They are useful for nested data transformations.

```js
[[1], [2, 3]].flat();
// [1, 2, 3]
```

### 5.12 What is `Array.from()`?
`Array.from()` creates a real array from an iterable or array-like value. It is useful with strings, Sets, NodeLists, and other array-like objects.

```js
Array.from("abc");
// ["a", "b", "c"]
```

### 5.13 What is `Array.isArray()`?
`Array.isArray()` reliably checks whether a value is an array. It is preferred over `typeof`, because `typeof []` returns `"object"`.

```js
Array.isArray([]); // true
```

### 5.14 What does `fill()` do?
`fill()` replaces array elements with a specified value within an optional range. It mutates the original array.

```js
const a = [1, 2, 3];
a.fill(0); // [0, 0, 0]
```

### 5.15 What is `copyWithin()`?
`copyWithin()` copies part of an array to another position within the same array without changing its length. It mutates the original array.

```js
const a = [1, 2, 3, 4];
a.copyWithin(1, 2); // [1, 3, 4, 4]
```

### 5.16 What are array `entries()`, `keys()`, and `values()`?
They return iterators for index-value pairs, indexes, and values respectively. They are commonly consumed with `for...of`.

```js
for (const [i, value] of ["a", "b"].entries()) {
  console.log(i, value);
}
```

### 5.17 What is `reduceRight()`?
`reduceRight()` works like `reduce()` but processes the array from right to left. It is useful when operation order matters.

```js
const result = ["a", "b", "c"].reduceRight((acc, x) => acc + x, "");
// "cba"
```

### 5.18 What is a sparse array?
A sparse array contains missing indexes rather than explicit `undefined` values. Some array methods skip these empty slots.

```js
const a = [];
a[2] = "x";
console.log(a.length); // 3
```

---


## 6. Strings, Numbers & Objects

### 6.1 What are string methods?
JavaScript provides methods such as `includes`, `startsWith`, `endsWith`, `slice`, `replace`, `split`, and `trim` for string processing. Strings are immutable, so these methods return new strings rather than modifying the original.

```js
const name = " Kalidas ";
console.log(name.trim().toUpperCase());
```

### 6.2 What are common Number and Math operations?
`Number` provides conversion and validation utilities, while `Math` provides mathematical functions. Common methods include `Number.isNaN`, `Number.isInteger`, `Math.floor`, and `Math.random`.

```js
Math.floor(4.9); // 4
Number.isInteger(10); // true
```

### 6.3 What is `Date`?
The `Date` object represents a point in time and provides methods for reading and formatting date components. For complex date/time handling, applications often use dedicated libraries or modern platform APIs.

```js
const now = new Date();
console.log(now.toISOString());
```

### 6.4 What is RegExp?
Regular expressions are patterns used to search, validate, and replace text. JavaScript supports them through regex literals and the `RegExp` constructor.

```js
const pattern = /^\d+$/;
pattern.test("123"); // true
```

### 6.5 What do `Object.keys()`, `values()`, and `entries()` do?
They return an array of an object's own enumerable property keys, values, or key-value pairs. They are useful for iterating over object data.

```js
const user = { name: "A", age: 30 };
Object.keys(user);   // ["name", "age"]
Object.values(user); // ["A", 30]
```

### 6.6 What does `Object.assign()` do?
`Object.assign()` copies enumerable own properties from source objects into a target object. It performs a shallow copy.

```js
const result = Object.assign({}, { a: 1 }, { b: 2 });
```

### 6.7 What is shallow copy vs deep copy?
A shallow copy copies only the top-level structure, so nested objects can still share references. A deep copy recursively copies nested data so changes do not affect the original.

```js
const copy = { ...user }; // shallow
const deep = structuredClone(user); // deep
```

### 6.8 What is `structuredClone()`?
`structuredClone()` creates a deep clone using the structured clone algorithm and supports many built-in data types. It is safer for general deep cloning than JSON-based cloning.

```js
const copy = structuredClone({ user: { name: "A" } });
```

### 6.9 What are `JSON.stringify()` and `JSON.parse()`?
`JSON.stringify()` converts a JavaScript value to a JSON string, while `JSON.parse()` converts valid JSON text back into a JavaScript value. Replacer and reviver functions can customize serialization and parsing.

```js
const text = JSON.stringify({ id: 1 });
const obj = JSON.parse(text);
```

### 6.10 What are `parseInt()` and `parseFloat()` gotchas?
`parseInt()` parses an integer from the beginning of a string, while `parseFloat()` parses a floating-point number. `parseInt` should usually receive an explicit radix when parsing integers.

```js
parseInt("10px", 10); // 10
parseFloat("10.5px"); // 10.5
```

### 6.11 What is `NaN`?
`NaN` means Not-a-Number and represents an invalid numeric result; importantly, it is not equal to itself. `Number.isNaN()` is safer than global `isNaN()` because it does not perform coercion.

```js
Number.isNaN(NaN); // true
NaN === NaN;       // false
```

### 6.12 What are `Infinity` and `-Infinity`?
They represent positive and negative infinity in JavaScript's numeric system. They can result from operations such as division by zero.

```js
console.log(1 / 0);  // Infinity
console.log(-1 / 0); // -Infinity
```

### 6.13 What are `toFixed()` and `toPrecision()`?
`toFixed()` formats a number with a fixed number of decimal places, while `toPrecision()` formats it to a specified number of significant digits. Both return strings.

```js
(12.345).toFixed(2);     // "12.35"
(12.345).toPrecision(4); // "12.35"
```

### 6.14 Are strings mutable?
No. JavaScript strings are immutable, meaning string operations create new strings rather than changing the original string.

```js
let s = "hello";
s.toUpperCase();
console.log(s); // "hello"
```

---


## 7. Closures 

### 7.1 What is a closure?
A closure is created when a function remembers variables from its lexical outer scope even after the outer function has finished. Closures are useful for private state, factories, callbacks, and memoization.

```js
function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next(); // 1
```

### 7.2 What is a lexical environment?
A lexical environment stores identifiers and their relationships to outer scopes. A closure keeps access to the relevant lexical environment when the inner function is retained.

```js
function outer() {
  const value = 10;
  return () => value;
}
```

### 7.3 Why is closure with loops important?
Closures created inside loops can capture variables differently depending on whether `var` or `let` is used. `let` creates a new binding for each loop iteration.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2
```

### 7.4 How can closures create private variables?
A variable declared inside an outer function cannot be accessed directly from outside, but returned functions can access it. This creates controlled private state.

```js
function bank() {
  let balance = 0;
  return { get: () => balance };
}
```

### 7.5 What is a function factory?
A function factory returns customized functions that retain configuration through closure. It is useful for creating reusable behavior.

```js
const multiplyBy = n => x => x * n;
const double = multiplyBy(2);
double(5); // 10
```

### 7.6 How is closure used for memoization?
A memoized function stores previously calculated results in a closed-over cache. Future calls can return cached results instead of repeating expensive work.

```js
function memoize(fn) {
  const cache = new Map();
  return x => cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x);
}
```

### 7.7 What is a stale closure?
A stale closure happens when a callback retains an older value from a previous render or execution context. This is especially important in React effects, timers, and asynchronous callbacks.

```js
let value = 1;
const log = () => console.log(value);
value = 2;
log(); // 2
```

### 7.8 What is the `var` + closure + `setTimeout` trap?
With `var`, loop iterations share one function-scoped binding, so callbacks often see the final value after the loop completes. `let` creates per-iteration bindings and avoids this common trap.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3
```

---

## 8. Asynchronous JavaScript 

### 8.1 What is synchronous vs asynchronous JavaScript?
Synchronous code executes sequentially and waits for each operation to finish, while asynchronous APIs allow work to complete later without blocking the current execution flow. JavaScript coordinates asynchronous work through the runtime and event loop.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A C B
```

### 8.2 What is callback hell?
Callback hell is deeply nested asynchronous callback code that becomes difficult to read, maintain, and handle for errors. Promises and `async/await` provide cleaner alternatives.

```js
getUser(id, user => {
  getOrders(user, orders => {
    getPayment(orders, payment => {});
  });
});
```

### 8.3 What is a Promise?
A Promise represents the eventual result of an asynchronous operation and has pending, fulfilled, or rejected states. It lets code handle success and failure through chaining.

```js
const promise = fetch("/api/users");
promise.then(res => res.json()).catch(console.error);
```

### 8.4 What do `.then()`, `.catch()`, and `.finally()` do?
`then()` handles fulfillment, `catch()` handles rejection, and `finally()` runs after settlement regardless of success or failure. They support readable asynchronous chains.

```js
fetch("/api")
  .then(r => r.json())
  .catch(console.error)
  .finally(() => console.log("done"));
```

### 8.5 What is `async/await`?
`async/await` provides syntax for consuming Promises in a sequential style. An `async` function always returns a Promise, and `await` pauses that function until the awaited Promise settles.

```js
async function load() {
  const res = await fetch("/api/users");
  return res.json();
}
```

### 8.6 What is `Promise.all()`?
`Promise.all()` runs multiple Promises concurrently and fulfills when all succeed. It rejects as soon as one Promise rejects.

```js
const [users, orders] = await Promise.all([
  fetch("/users"),
  fetch("/orders")
]);
```

### 8.7 What is `Promise.allSettled()`?
`Promise.allSettled()` waits for every Promise to finish and returns each result's status. It is useful when one failure should not prevent collecting other results.

```js
const results = await Promise.allSettled([p1, p2, p3]);
```

### 8.8 What is `Promise.race()`?
`Promise.race()` settles as soon as the first input Promise settles, whether fulfilled or rejected. It is commonly used for timeout patterns.

```js
const result = await Promise.race([request, timeout]);
```

### 8.9 What is `Promise.any()`?
`Promise.any()` fulfills when the first input Promise fulfills and ignores earlier rejections. It rejects with an `AggregateError` only if every Promise rejects.

```js
const response = await Promise.any([server1(), server2()]);
```

### 8.10 What are `Promise.resolve()` and `Promise.reject()`?
`Promise.resolve()` creates or adopts a fulfilled Promise, while `Promise.reject()` creates a rejected Promise. They are useful for normalizing values into Promise-based APIs.

```js
Promise.resolve(10).then(console.log);
Promise.reject(new Error("Failed")).catch(console.error);
```

### 8.11 What is a thenable?
A thenable is an object that has a callable `then` method and can be assimilated by Promise APIs. JavaScript does not require it to be an actual `Promise` instance.

```js
const thenable = {
  then(resolve) { resolve("done"); }
};
Promise.resolve(thenable).then(console.log);
```

### 8.12 What is `AbortController`?
`AbortController` provides a standard way to signal cancellation to APIs that support an `AbortSignal`, such as `fetch`. It is useful for cancelling stale requests and timeouts.

```js
const controller = new AbortController();
fetch("/api", { signal: controller.signal });
controller.abort();
```

### 8.13 What are async iterators and `for await...of`?
Async iterators produce values asynchronously, and `for await...of` consumes them one by one. They are useful for streams, paginated data, and asynchronous generators.

```js
async function* numbers() {
  yield 1;
  yield 2;
}
for await (const n of numbers()) console.log(n);
```

---


## 9. Event Loop 

### 9.1 What is the event loop?
The event loop coordinates JavaScript's call stack with queues of asynchronous callbacks so non-blocking operations can be processed. JavaScript itself runs user code on a single main thread in typical environments.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A C B
```

### 9.2 What is the call stack?
The call stack stores currently executing function calls. Synchronous JavaScript must finish the current stack work before queued callbacks can execute.

```js
function a() { b(); }
function b() { console.log("B"); }
a();
```

### 9.3 What are Web APIs?
In browsers, APIs such as timers, DOM events, and network requests are provided by the browser environment rather than the ECMAScript language itself. They interact with the JavaScript event loop.

```js
setTimeout(() => console.log("timer"), 1000);
```

### 9.4 What are task and microtask queues?
Tasks include things such as timer callbacks and many DOM events, while Promise reactions and `queueMicrotask()` use the microtask queue. Microtasks are generally drained before the next task is processed.

```js
setTimeout(() => console.log("task"), 0);
Promise.resolve().then(() => console.log("microtask"));
// microtask, task
```

### 9.5 What is `queueMicrotask()`?
`queueMicrotask()` schedules a callback in the microtask queue. It is useful when work should run after the current synchronous code but before the next task.

```js
queueMicrotask(() => console.log("microtask"));
```

### 9.6 How does `async/await` affect execution order?
`await` suspends the async function and schedules its continuation as a Promise reaction. Therefore, code after `await` usually runs as a microtask after the awaited Promise settles.

```js
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
test();
console.log("C");
// A C B
```

### 9.7 What is `requestAnimationFrame()`?
`requestAnimationFrame()` schedules a callback for a browser rendering opportunity, making it suitable for visual updates and animations. Its exact ordering depends on the browser's event-loop and rendering cycle.

```js
requestAnimationFrame(() => {
  element.style.transform = "translateX(10px)";
});
```

### 9.8 What is `setImmediate()`?
`setImmediate()` is a Node.js API that schedules a callback for the check phase of the Node event loop. It is not a standard browser API.

```js
setImmediate(() => console.log("immediate"));
```

### 9.9 What is `process.nextTick()`?
`process.nextTick()` schedules a callback in Node.js's next-tick queue, which is processed before the event loop continues to other phases. Excessive use can starve I/O and other queued work.

```js
process.nextTick(() => console.log("next tick"));
```

### 9.10 What is microtask starvation?
Microtask starvation occurs when continuously adding microtasks prevents the runtime from moving on to tasks, rendering, or I/O. Long or recursive microtask chains can make an application unresponsive.

```js
function loop() {
  queueMicrotask(loop);
}
// loop(); // would starve the event loop
```

### 9.11 Where does browser rendering fit into the event loop?
Browsers perform rendering at appropriate points between JavaScript work, but the exact scheduling is browser-dependent. Long-running JavaScript can block rendering and make the UI appear frozen.

```js
requestAnimationFrame(() => console.log("before paint opportunity"));
```

### 9.12 How do you solve event-loop output questions?
First identify synchronous code, then Promise/microtask callbacks, then task callbacks such as timers, while considering environment-specific APIs. Trace the queues rather than guessing based on source order.

```js
console.log(1);
Promise.resolve().then(() => console.log(2));
setTimeout(() => console.log(3), 0);
console.log(4);
// 1 4 2 3
```

---

## 10. DOM & Browser JavaScript

### 10.1 What is the DOM?
The DOM is the browser's object representation of an HTML document. JavaScript can use it to read, create, modify, and remove elements.

```js
const title = document.querySelector("h1");
title.textContent = "Hello";
```

### 10.2 What is event bubbling?
Event bubbling means an event triggered on a nested element propagates upward through its ancestors. It enables event delegation but can also cause unintended parent handlers to run.

```js
child.addEventListener("click", () => console.log("child"));
parent.addEventListener("click", () => console.log("parent"));
```

### 10.3 What is event capturing?
Capturing is the phase where an event travels from the document/root toward the target before the target and bubbling phases. A listener can opt into capture mode.

```js
parent.addEventListener("click", handler, true);
```

### 10.4 What is event delegation?
Event delegation attaches one handler to a parent instead of many child elements and uses event propagation to determine the target. It is useful for dynamic lists and reducing listeners.

```js
list.addEventListener("click", e => {
  if (e.target.matches("button")) console.log("clicked");
});
```

### 10.5 What is `preventDefault()`?
`preventDefault()` stops the browser's default action for an event, such as submitting a form or following a link. It does not stop event propagation.

```js
form.addEventListener("submit", e => {
  e.preventDefault();
});
```

### 10.6 What is `stopPropagation()`?
`stopPropagation()` prevents an event from continuing to other elements in the propagation path. It does not generally prevent the browser's default action.

```js
button.addEventListener("click", e => {
  e.stopPropagation();
});
```

### 10.7 What are localStorage and sessionStorage?
`localStorage` persists data across browser sessions, while `sessionStorage` is scoped to the current page session. Both store strings and are accessible to JavaScript, so sensitive data should not be stored there.

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

### 10.8 What are cookies?
Cookies are small pieces of data associated with a domain and can be sent with HTTP requests depending on their attributes. `HttpOnly`, `Secure`, and `SameSite` attributes are important security controls.

```js
document.cookie = "theme=dark";
```

### 10.9 What is the Fetch API?
`fetch()` provides a Promise-based API for making HTTP requests. It does not reject solely because an HTTP response has a 4xx or 5xx status, so applications should check `response.ok`.

```js
const response = await fetch("/api/users");
if (!response.ok) throw new Error("Request failed");
```

### 10.10 What is CORS?
CORS is a browser security mechanism that controls whether a web page can access resources from another origin. The server communicates allowed origins and methods using HTTP headers.

```js
fetch("https://api.example.com/data");
```

### 10.11 What is `MutationObserver`?
`MutationObserver` watches for changes to a DOM subtree such as added nodes or attribute changes. It is useful when code needs to react to dynamically modified DOM content.

```js
const observer = new MutationObserver(records => console.log(records));
observer.observe(document.body, { childList: true, subtree: true });
```

### 10.12 What is `IntersectionObserver`?
`IntersectionObserver` asynchronously detects when an element enters or leaves a viewport or another root. It is commonly used for lazy loading and infinite scrolling.

```js
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) console.log("visible");
});
```

### 10.13 What is `ResizeObserver`?
`ResizeObserver` watches an element's size changes without repeatedly polling layout dimensions. It is useful for responsive components and dynamic layouts.

```js
const observer = new ResizeObserver(entries => console.log(entries[0].contentRect));
observer.observe(element);
```

### 10.14 What is `DocumentFragment`?
A `DocumentFragment` is an off-DOM container that can hold nodes before inserting them into the document. It can reduce repeated DOM insertion work when building many nodes.

```js
const fragment = document.createDocumentFragment();
fragment.append(document.createElement("div"));
list.append(fragment);
```

### 10.15 What is Shadow DOM?
Shadow DOM provides an encapsulated DOM tree and style scope for web components. It helps prevent component internals and styles from interfering with the surrounding document.

```js
const shadow = element.attachShadow({ mode: "open" });
shadow.innerHTML = "<p>Hello</p>";
```

### 10.16 What is the History API?
The History API lets applications change the browser's URL and history without a full page reload. It is commonly used by SPA routers.

```js
history.pushState({}, "", "/dashboard");
```

### 10.17 What is the Navigator API?
The `navigator` object exposes information and browser capabilities such as clipboard access, geolocation, and user-agent information. Availability and permissions depend on the browser and security context.

```js
navigator.clipboard.writeText("Hello");
```

### 10.18 What are Web Workers?
Web Workers run JavaScript in a separate worker context so CPU-heavy tasks can avoid blocking the main UI thread. Workers communicate with the main thread using messages.

```js
const worker = new Worker("worker.js");
worker.postMessage({ value: 10 });
```

### 10.19 What is the Virtual DOM?
The Virtual DOM is an in-memory representation used by libraries such as React to determine efficient DOM updates. It is a React implementation concept rather than a native browser API.

```js
// React concept:
const element = <h1>Hello</h1>;
```

---





## 11. Modules

### 11.1 What are ES modules?
ES modules provide a standard way to split JavaScript into files with explicit imports and exports. They have their own module scope and support static analysis.

```js
// math.js
export const add = (a, b) => a + b;
```

### 11.2 What is the difference between named and default exports?
Named exports allow multiple explicitly named exports from a module, while a default export provides one primary exported value. Import syntax differs accordingly.

```js
export const add = () => {};
export default function App() {}
```

### 11.3 What is CommonJS?
CommonJS is a module system historically used by Node.js that uses `require()` and `module.exports`. Modern Node.js also supports ES modules.

```js
const fs = require("fs");
module.exports = { value: 10 };
```

### 11.4 What are dynamic imports?
Dynamic `import()` loads a module asynchronously at runtime and returns a Promise. It is commonly used for lazy loading and code splitting.

```js
const module = await import("./feature.js");
```

### 11.5 What is `import.meta`?
`import.meta` provides module-specific metadata. For example, `import.meta.url` gives the URL of the current ES module.

```js
console.log(import.meta.url);
```

### 11.6 What is tree shaking?
Tree shaking is a bundler optimization that removes unused exports from statically analyzable modules. ES modules make this optimization easier because imports and exports are statically structured.

```js
import { add } from "./math.js";
// unused exports may be removed by the bundler
```

### 11.7 What are circular dependencies?
A circular dependency occurs when module A depends on B while B directly or indirectly depends on A. It can produce partially initialized bindings and confusing runtime behavior, so cycles should be designed carefully.

```js
// a.js -> imports b.js
// b.js -> imports a.js
```

### 11.8 What are module bundlers?
Bundlers such as Webpack, Vite, and Rollup process modules and assets for application delivery. They can perform transformations, code splitting, tree shaking, and optimization.

```js
// Vite/Webpack/Rollup process your module graph
import "./styles.css";
```

---

## 12. Error Handling

### 12.1 How does `try/catch` work?
`try/catch` lets code handle exceptions without terminating the current control flow. It is commonly used around operations that may throw.

```js
try {
  JSON.parse("invalid");
} catch (error) {
  console.error(error.message);
}
```

### 12.2 What does `finally` do?
`finally` runs after `try` and `catch` regardless of whether an exception occurred. It is useful for cleanup such as releasing resources or resetting state.

```js
try {
  doWork();
} finally {
  cleanup();
}
```

### 12.3 How do you throw an error?
The `throw` statement creates an exception that can be handled by a surrounding `catch`. Throwing `Error` objects preserves useful stack information.

```js
if (!user) {
  throw new Error("User not found");
}
```

### 12.4 What are custom errors?
Custom errors extend the built-in `Error` class to represent domain-specific failure types. They make error handling and classification clearer.

```js
class ValidationError extends Error {}
throw new ValidationError("Invalid email");
```

### 12.5 What are common JavaScript error types?
`TypeError` occurs when a value is used incorrectly, `ReferenceError` when an identifier cannot be resolved, `SyntaxError` for invalid syntax, and `RangeError` when a value is outside an allowed range.

```js
null.foo; // TypeError
console.log(notDefined); // ReferenceError
```

### 12.6 How do you handle errors in async code?
With Promises, use `.catch()` or `try/catch` around `await` expressions. A common senior-level concern is ensuring rejected Promises are not silently ignored.

```js
try {
  const data = await loadData();
} catch (error) {
  console.error(error);
}
```

### 12.7 What are `window.onerror` and `unhandledrejection`?
`window.onerror` can observe uncaught runtime errors in browsers, while `unhandledrejection` observes rejected Promises that have no rejection handler. They can support global error reporting.

```js
window.addEventListener("unhandledrejection", event => {
  console.error(event.reason);
});
```

### 12.8 What is the re-throwing error pattern?
A function can catch an error to add context or perform cleanup and then re-throw it so a higher layer can decide how to handle it.

```js
try {
  await save();
} catch (error) {
  logError(error);
  throw error;
}
```

---

## 13. Memory & Performance 

### 13.1 What is stack vs heap memory?
The stack manages execution frames and local execution state, while the heap stores dynamically allocated objects and other data. The exact implementation is runtime-dependent, but this model is useful for interviews.

```js
function test() {
  const x = 10;
  const obj = { value: 20 };
}
```

### 13.2 What is garbage collection?
Garbage collection automatically identifies objects that are no longer reachable and reclaims their memory. Developers mainly need to avoid accidentally keeping unnecessary references alive.

```js
let data = { huge: "object" };
data = null; // object may become collectible
```

### 13.3 What is a memory leak?
A memory leak occurs when an application unintentionally retains references to data that is no longer needed. Common causes include unremoved event listeners, timers, global references, and long-lived caches.

```js
const handler = () => {};
window.addEventListener("resize", handler);
// remove when no longer needed
window.removeEventListener("resize", handler);
```

### 13.4 What is debouncing?
Debouncing delays execution until a specified period has passed without another call. It is useful for search inputs and other events that fire rapidly.

```js
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

### 13.5 What is throttling?
Throttling limits how often a function can execute within a time window. It is useful for scroll, resize, and mouse-move events.

```js
let last = 0;
window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - last > 100) {
    last = now;
    handleScroll();
  }
});
```

### 13.6 What is memoization?
Memoization caches function results based on inputs so repeated calls can avoid expensive computation. It works best for deterministic functions with reusable inputs.

```js
const cache = new Map();
function square(n) {
  if (cache.has(n)) return cache.get(n);
  const result = n * n;
  cache.set(n, result);
  return result;
}
```

### 13.7 What are lazy loading and code splitting?
Lazy loading delays loading a resource until it is needed, while code splitting divides application code into smaller chunks. Together they can reduce initial application load time.

```js
const Feature = await import("./Feature.js");
```

### 13.8 What is `requestIdleCallback()`?
`requestIdleCallback()` schedules low-priority work when the browser has idle time. It should not be used for work that must happen immediately or reliably at a specific time.

```js
requestIdleCallback(() => {
  console.log("low-priority work");
});
```

### 13.9 What are `WeakRef` and `FinalizationRegistry`?
`WeakRef` allows a reference that does not prevent garbage collection, while `FinalizationRegistry` lets code register cleanup-related callbacks when objects are collected. They are advanced features and should be used cautiously.

```js
const ref = new WeakRef(object);
```

### 13.10 What is the Performance API?
The Performance API provides high-resolution timing and measurement tools. `performance.now()` measures elapsed time, while marks and measures can profile application operations.

```js
performance.mark("start");
// work
performance.mark("end");
performance.measure("work", "start", "end");
```

---

## 14. Advanced JavaScript 

### 14.1 What are iterators?
An iterator is an object that follows the iterator protocol and provides a `next()` method returning `{ value, done }`. Iterables such as arrays can produce iterators.

```js
const iterator = [1, 2][Symbol.iterator]();
iterator.next(); // { value: 1, done: false }
```

### 14.2 What are generators?
Generators are functions declared with `function*` that can pause and resume using `yield`. They automatically implement the iterator protocol.

```js
function* numbers() {
  yield 1;
  yield 2;
}
```

### 14.3 What are Symbols?
A Symbol is a unique primitive value often used as an object key when you want to avoid property-name collisions. JavaScript also defines well-known Symbols for language protocols.

```js
const id = Symbol("id");
const user = { [id]: 123 };
```

### 14.4 What are `Map` and `Set`?
`Map` stores key-value pairs and allows keys of any value type, while `Set` stores unique values. They are often better suited than plain objects or arrays for certain lookup and uniqueness requirements.

```js
const map = new Map([["id", 1]]);
const set = new Set([1, 1, 2]);
```

### 14.5 What are `WeakMap` and `WeakSet`?
They hold weak references to object keys or values, allowing garbage collection when there are no other strong references. They are useful for metadata associated with object lifetimes.

```js
const cache = new WeakMap();
cache.set(object, "metadata");
```

### 14.6 What is `Proxy`?
A Proxy wraps an object and intercepts operations such as property access, assignment, and function calls. It enables advanced validation, logging, and metaprogramming.

```js
const proxy = new Proxy({}, {
  get: (target, key) => `Value: ${String(key)}`
});
```

### 14.7 What is `Reflect`?
`Reflect` provides standard methods for performing object operations such as `get`, `set`, and `defineProperty`. It is commonly used inside Proxy handlers.

```js
Reflect.get({ name: "A" }, "name");
```

### 14.8 What are Typed Arrays and ArrayBuffer?
`ArrayBuffer` represents raw binary memory, while typed arrays such as `Uint8Array` provide structured views over that memory. They are useful for binary protocols, media, and performance-sensitive operations.

```js
const buffer = new ArrayBuffer(8);
const bytes = new Uint8Array(buffer);
```

### 14.9 What is BigInt?
`BigInt` represents integers larger than the safe integer range of JavaScript's Number type. BigInts and Numbers should not normally be mixed directly in arithmetic.

```js
const big = 9007199254740993n;
```

### 14.10 What is metaprogramming?
Metaprogramming means writing code that operates on the structure or behavior of other code. JavaScript supports this through features such as Proxy, Reflect, Symbols, and property descriptors.

```js
const obj = new Proxy({}, {
  set(target, key, value) {
    console.log(key, value);
    return Reflect.set(target, key, value);
  }
});
```

### 14.11 What is the difference between `for...of` and `for...in`?
`for...of` iterates over values from an iterable, while `for...in` iterates over enumerable property keys. For arrays, `for...of` is generally the correct choice when you need values.

```js
for (const value of [10, 20]) console.log(value);
for (const key in { a: 1 }) console.log(key);
```

### 14.12 What are well-known Symbols?
Well-known Symbols define standard JavaScript protocols, such as `Symbol.iterator`, `Symbol.toPrimitive`, and `Symbol.hasInstance`. They let objects customize language behavior.

```js
const obj = {
  [Symbol.toPrimitive]() { return 10; }
};
```

### 14.13 What is `globalThis`?
`globalThis` provides a standard way to access the global object across JavaScript environments. It avoids environment-specific names such as `window` or `global`.

```js
console.log(globalThis);
```

### 14.14 What are logical assignment operators?
`||=`, `&&=`, and `??=` combine logical checks with assignment. They are useful for concise conditional initialization.

```js
let name = "";
name ||= "Guest";
```

### 14.15 What does `Object.getOwnPropertyDescriptors()` do?
It returns all own property descriptors of an object. It is useful when copying objects while preserving getters, setters, and descriptor attributes.

```js
const descriptors = Object.getOwnPropertyDescriptors(obj);
```

### 14.16 What are `SharedArrayBuffer` and `Atomics`?
`SharedArrayBuffer` allows memory to be shared between certain worker contexts, while `Atomics` provides safe atomic operations on shared typed-array data. They are advanced tools for coordinating concurrent JavaScript workers.

```js
const buffer = new SharedArrayBuffer(4);
const view = new Int32Array(buffer);
Atomics.add(view, 0, 1);
```

---

## 15. Functional Programming

### 15.1 What is immutability?
Immutability means avoiding direct modification of existing data and instead creating new values. It makes state changes easier to reason about and is especially important in React.

```js
const user = { name: "A" };
const updated = { ...user, name: "B" };
```

### 15.2 What is function composition?
Composition combines small functions into a larger operation where one function's output becomes another's input. It encourages reusable and focused functions.

```js
const result = addOne(double(3));
```

### 15.3 What is currying?
Currying transforms a function with multiple parameters into a sequence of single-parameter functions. It can make reusable specialized functions easier to create.

```js
const add = a => b => a + b;
add(2)(3); // 5
```

### 15.4 What is partial application?
Partial application creates a new function by pre-filling some arguments of another function. It differs from currying because the resulting function can still accept multiple remaining arguments.

```js
const multiply = (a, b) => a * b;
const double = b => multiply(2, b);
```

### 15.5 What is function chaining?
Function chaining allows operations to be performed sequentially when each method returns a value that supports the next operation. Array methods are a common example.

```js
const result = [1, 2, 3]
  .filter(x => x > 1)
  .map(x => x * 2);
```

### 15.6 What are `pipe` and `compose`?
Both combine functions, but `pipe` generally applies them left-to-right while `compose` applies them right-to-left. They are useful for building readable transformation pipelines.

```js
const pipe = (f, g) => x => g(f(x));
```

### 15.7 What is point-free style?
Point-free style defines functions without explicitly mentioning their input arguments. It can make compositions concise, but excessive use can reduce readability.

```js
const double = x => x * 2;
const values = [1, 2, 3].map(double);
```

### 15.8 What are transducers?
A transducer is an advanced abstraction for composing transformations independently of the input collection. It can combine operations without creating intermediate collections.

```js
// Conceptually: compose map/filter into one transformation.
```

### 15.9 What are Functor and Monad concepts?
A Functor is commonly described as a structure that supports mapping over a contained value, while a Monad provides a way to sequence computations while preserving context. These are advanced functional-programming concepts rather than everyday JavaScript requirements.

```js
const value = Promise.resolve(10);
value.then(x => x * 2);
```

---

## 16. Design Patterns

### 16.1 What is the Module pattern?
The Module pattern groups related state and functions and exposes only a controlled public API. Historically it used closures for private state.

```js
const counter = (() => {
  let count = 0;
  return { inc: () => ++count };
})();
```

### 16.2 What is the Factory pattern?
A Factory creates objects without requiring callers to know the exact construction details. It is useful when the object type depends on runtime input.

```js
function createUser(role) {
  return role === "admin" ? new Admin() : new User();
}
```

### 16.3 What is the Singleton pattern?
A Singleton ensures that a component has one shared instance within a given scope. It can be useful for shared infrastructure but should not be overused because it can introduce global state.

```js
const config = Object.freeze({ api: "/api" });
```

### 16.4 What is the Observer pattern?
The Observer pattern lets subscribers receive notifications when a subject changes. It is common in event-driven systems.

```js
subject.subscribe(value => console.log(value));
```

### 16.5 What is the Strategy pattern?
Strategy encapsulates interchangeable algorithms behind a common interface. The caller can choose the strategy at runtime.

```js
const strategies = {
  card: payByCard,
  upi: payByUpi
};
strategies[method](amount);
```

### 16.6 What is the Adapter pattern?
An Adapter converts one interface into another expected by the client. It helps integrate incompatible APIs without changing the existing client code.

```js
const adapter = oldApi => ({
  getUser: () => oldApi.fetchUser()
});
```

### 16.7 What is the Decorator pattern?
A Decorator adds behavior to an object or function without modifying its original implementation. Higher-order functions are a common JavaScript implementation technique.

```js
const withLogging = fn => (...args) => {
  console.log(args);
  return fn(...args);
};
```

### 16.8 What is the Proxy pattern?
The Proxy pattern provides an intermediary that controls access to another object. JavaScript's native `Proxy` makes this pattern particularly powerful.

```js
const safe = new Proxy(user, {
  get(target, key) {
    return Reflect.get(target, key);
  }
});
```

### 16.9 What is the Revealing Module pattern?
It keeps implementation details private and returns selected functions or values as the public API. It is a variation of the Module pattern.

```js
const module = (() => {
  const privateFn = () => 1;
  return { publicFn: privateFn };
})();
```

### 16.10 What is the Command pattern?
The Command pattern represents an operation as an object or function, allowing it to be queued, logged, undone, or executed later.

```js
const command = {
  execute: () => console.log("saved")
};
command.execute();
```

### 16.11 What is the Iterator pattern?
The Iterator pattern provides a standard way to traverse a collection without exposing its internal representation. JavaScript implements this through the iterator protocol.

```js
for (const value of [1, 2, 3]) console.log(value);
```

### 16.12 What is the Mediator pattern?
A Mediator centralizes communication between components so they do not need direct knowledge of one another. This can reduce tight coupling in complex systems.

```js
mediator.send("paymentComplete", data);
```

### 16.13 Observer vs Pub/Sub?
Observer usually has a direct relationship between a subject and its subscribers, while Pub/Sub commonly uses an intermediary event broker or event bus. Pub/Sub therefore decouples publishers and subscribers more strongly.

```js
eventBus.publish("order.created", order);
eventBus.subscribe("order.created", handler);
```

---

### What is MVC/MVVM?
MVC separates an application into Model, View, and Controller, while MVVM uses a ViewModel between the UI and application logic. These are architectural patterns rather than JavaScript language features.
```text
MVC: Model -> Controller -> View
MVVM: Model <-> ViewModel <-> View
```

## 17. JavaScript Security

### 17.1 What is XSS?
Cross-Site Scripting occurs when untrusted content is executed as script in a user's browser. Prevent it by safely encoding output, sanitizing untrusted HTML, and using defenses such as CSP.

```js
element.textContent = userInput; // safer than innerHTML
```

### 17.2 What is CSRF?
CSRF tricks a user's authenticated browser into sending an unwanted request to another site. Common defenses include SameSite cookies, CSRF tokens, and validating request origin where appropriate.

```js
// Server validates a CSRF token before changing state.
```

### 17.3 What is prototype pollution?
Prototype pollution occurs when attacker-controlled input modifies object prototypes, potentially changing behavior across many objects. Avoid unsafe deep merges and validate keys such as `__proto__`, `constructor`, and `prototype`.

```js
// Avoid blindly merging untrusted objects into application objects.
```

### 17.4 What is CORS security?
CORS controls which origins browsers allow to read cross-origin responses. It is a browser access-control mechanism, not a replacement for authentication or server-side authorization.

```http
Access-Control-Allow-Origin: https://example.com
```

### 17.5 What are secure cookies?
Cookies can use `HttpOnly` to block JavaScript access, `Secure` to require HTTPS, and `SameSite` to reduce cross-site request risks. These attributes are important when storing session identifiers.

```http
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax
```

### 17.6 Why is `eval()` risky?
`eval()` executes a string as JavaScript and can turn untrusted input into code execution. It also makes code harder to analyze and can hurt performance, so it should generally be avoided.

```js
// Avoid:
eval(userInput);
```

### 17.7 What is CSP?
Content Security Policy is a browser security mechanism that restricts which resources and scripts a page can load or execute. A strong CSP can significantly reduce the impact of some XSS attacks.

```http
Content-Security-Policy: default-src 'self'
```

### 17.8 What is SRI?
Subresource Integrity allows a browser to verify that a fetched external resource matches a known cryptographic hash. It helps protect against unexpected modification of third-party resources.

```html
<script src="https://cdn.example.com/app.js"
        integrity="sha384-..."></script>
```

### 17.9 What is `postMessage` security?
`postMessage` enables cross-origin window communication, but receivers must validate `event.origin` and avoid blindly trusting `event.data`. The sender should also use a specific target origin rather than `"*"` when possible.

```js
window.addEventListener("message", event => {
  if (event.origin !== "https://trusted.example") return;
});
```

### 17.10 What is an open redirect?
An open redirect occurs when an application redirects users to attacker-controlled destinations through an insufficiently validated URL. Attackers can abuse it for phishing and trust abuse.

```js
// Validate redirect destinations against an allowlist.
```

### 17.11 What is clickjacking?
Clickjacking tricks users into interacting with a hidden or overlaid page. Defenses include CSP `frame-ancestors` and, for older compatibility, `X-Frame-Options`.

```http
X-Frame-Options: DENY
```

### 17.12 Why is localStorage risky for sensitive data?
JavaScript can read localStorage, so an XSS vulnerability can expose tokens or other sensitive values stored there. For session credentials, HttpOnly cookies are often safer when the architecture supports them.

```js
localStorage.setItem("token", sensitiveToken); // risky
```

---

## 18. JavaScript Quirks & Gotchas 

### 18.1 Why is `typeof null` equal to `"object"`?
This is a historical JavaScript behavior preserved for compatibility. It does not mean `null` is actually an object.

```js
typeof null; // "object"
```

### 18.2 Why is `0.1 + 0.2 !== 0.3`?
JavaScript uses IEEE 754 floating-point numbers, and many decimal fractions cannot be represented exactly in binary. Therefore, arithmetic can produce tiny precision errors.

```js
0.1 + 0.2 === 0.3; // false
```

### 18.3 What are `[] + []`, `[] + {}`, and `{} + []`?
These expressions demonstrate JavaScript's coercion rules and can be context-dependent, especially for `{}` at the start of a statement. The safe interview answer is that arrays and objects can be converted to primitive/string representations during `+` operations.

```js
[] + []; // ""
[] + {}; // "[object Object]"
```

### 18.4 Why is `NaN === NaN` false?
`NaN` is defined as an unordered numeric value, so it is not equal to itself using normal equality. Use `Number.isNaN()` to test specifically for it.

```js
NaN === NaN; // false
Number.isNaN(NaN); // true
```

### 18.5 What is ASI?
Automatic Semicolon Insertion is a JavaScript parsing rule where semicolons can be inserted at certain line breaks. Developers should understand it because some line breaks can change program behavior.

```js
return
{
  value: 1
}
// returns undefined
```

### 18.6 What does `delete` do?
`delete` removes a property from an object when the property is configurable. It does not delete local variables or free arbitrary memory directly.

```js
const user = { name: "A" };
delete user.name;
```

### 18.7 Why don't arrow functions have their own `arguments`?
Arrow functions inherit `arguments` from their surrounding scope rather than creating their own. Use rest parameters when you need an arrow function to accept arbitrary arguments.

```js
const sum = (...args) => args.reduce((a, b) => a + b, 0);
```

### 18.8 Why are `[]` and `{}` truthy?
All objects, including arrays and plain objects, are truthy regardless of whether they contain elements or properties.

```js
Boolean([]); // true
Boolean({}); // true
```

### 18.9 Why is `null == undefined` true?
Loose equality has a special rule that treats `null` and `undefined` as equal to each other but not to other values. Strict equality distinguishes them.

```js
null == undefined;  // true
null === undefined; // false
```

---

## 19. Testing JavaScript

### 19.1 What is unit testing?
Unit testing verifies small pieces of code in isolation, such as a function or component. Good unit tests are fast, deterministic, and focused on observable behavior.

```js
expect(add(2, 3)).toBe(5);
```

### 19.2 What are Jest `describe`, `it`, and `expect`?
`describe` groups related tests, `it` or `test` defines an individual test, and `expect` provides assertions. Jest also provides mocking and spying utilities.

```js
describe("add", () => {
  it("adds numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### 19.3 What are mocks, spies, and stubs?
A mock replaces behavior with controlled behavior, a spy observes calls to a function, and a stub provides predetermined responses. The terminology can vary slightly between testing libraries.

```js
const spy = jest.spyOn(api, "fetchUser");
```

### 19.4 What are test doubles?
Test doubles are substitutes used during testing to isolate the code under test. Common types include mocks, stubs, spies, fakes, and dummies.

```js
const fakeApi = {
  getUser: async () => ({ id: 1 })
};
```

### 19.5 What is code coverage?
Code coverage measures which parts of the code were executed by tests. High coverage can help identify untested areas, but high percentage alone does not guarantee good tests.

```js
// Example metric: statements, branches, functions, lines.
```

### 19.6 What is TDD vs BDD?
TDD focuses on writing tests before implementation in a red-green-refactor cycle. BDD emphasizes behavior and collaboration using scenarios that describe expected outcomes.

```js
// Given -> When -> Then
```

---

## 20. TypeScript Fundamentals

### 20.1 What is the difference between types and interfaces?
Both can describe object shapes, but interfaces are especially suited to extensible object contracts and declaration merging, while type aliases can represent unions, intersections, and other compositions. In modern TypeScript, both are widely used.

```ts
interface User { name: string }
type ID = string | number;
```

### 20.2 What are generics?
Generics allow reusable code to work with different types while preserving type information. They are useful for APIs, collections, and utility functions.

```ts
function identity<T>(value: T): T {
  return value;
}
```

### 20.3 What are utility types?
Utility types transform existing types into useful variants. Common examples include `Partial`, `Pick`, `Omit`, and `Record`.

```ts
type UpdateUser = Partial<User>;
type UserName = Pick<User, "name">;
```

### 20.4 What is type narrowing?
Type narrowing uses runtime checks or type guards to reduce a union type to a more specific type. This lets TypeScript provide safer property and method access.

```ts
function print(value: string | number) {
  if (typeof value === "string") console.log(value.toUpperCase());
}
```

### 20.5 What are enums?
Enums define a named set of related values. They can be useful in some codebases, although string unions are often preferred for simpler type-safe constants.

```ts
enum Role {
  Admin,
  User
}
```

### 20.6 What are `as` and type assertions?
A type assertion tells TypeScript how you want a value to be treated at compile time; it does not perform runtime conversion or validation. Assertions should be used when the developer has information the compiler cannot infer.

```ts
const value = input as string;
```

---

## 21. JavaScript Runtime Environments

### 21.1 What is Node.js?
Node.js is a JavaScript runtime built on the V8 engine that provides server-side APIs and an event-driven I/O model. It allows JavaScript to build servers, CLIs, workers, and backend services.

```js
import fs from "node:fs";
const data = fs.readFileSync("file.txt", "utf8");
```

### 21.2 What are `fs`, `path`, and `http` in Node.js?
`fs` provides filesystem operations, `path` handles filesystem paths, and `http` provides low-level HTTP server/client functionality. These are Node.js APIs rather than browser APIs.

```js
import path from "node:path";
console.log(path.join("src", "app.js"));
```

### 21.3 Browser vs Node.js?
Browsers provide APIs such as `window`, DOM, and `document`, while Node.js provides server-side APIs such as `process`, filesystem, and network modules. Both execute JavaScript but have different host environments.

```js
// Browser: window
// Node.js: globalThis / process
```

### 21.4 What are Deno and Bun?
Deno and Bun are alternative JavaScript runtimes that provide modern tooling and server-side capabilities. For most interviews, awareness of their purpose is enough unless the job specifically uses them.

```js
// Runtime choice depends on project requirements.
```

---

## 22. Concurrency Patterns 

### 22.1 What are Web Workers?
Web Workers run JavaScript away from the browser's main UI thread. They are useful for CPU-intensive tasks that would otherwise block rendering.

```js
const worker = new Worker("worker.js");
worker.postMessage(data);
```

### 22.2 What are Service Workers?
Service Workers are background browser scripts that can intercept network requests and enable features such as caching, offline support, and push notifications. They operate under strict security and lifecycle rules.

```js
navigator.serviceWorker.register("/sw.js");
```

### 22.3 What are Shared Workers?
A Shared Worker can be accessed by multiple browsing contexts from the same origin, allowing them to share a worker process and communication channel.

```js
const worker = new SharedWorker("/shared-worker.js");
worker.port.start();
```

### 22.4 What are `SharedArrayBuffer` and `Atomics` used for?
They allow worker contexts to share memory and coordinate access using atomic operations. This is useful for specialized high-performance concurrent workloads.

```js
Atomics.store(view, 0, 1);
const value = Atomics.load(view, 0);
```

### 22.5 What are async queues and semaphores?
An async queue controls the order and amount of asynchronous work, while a semaphore limits how many operations can run concurrently. These patterns are useful for rate limiting, worker pools, and controlled resource usage.

```js
// Example concept: allow only 3 requests at once.
const concurrency = 3;
```

---

## 23. JavaScript Pros & Cons — Senior Interview Summary

### Advantages
- Cross-platform and supported by all major browsers.
- Large ecosystem and strong community support.
- First-class functions, closures, and flexible object model.
- Excellent asynchronous programming model for I/O-heavy applications.
- Can be used across frontend, backend, serverless, and more.
- Large ecosystem around React, Node.js, testing, bundling, and TypeScript.

### Disadvantages
- Dynamic typing can move some errors to runtime.
- Implicit coercion can create confusing behavior.
- Single main JavaScript thread can be blocked by CPU-heavy work.
- Browser security restrictions such as same-origin policy affect applications.
- Large dependency ecosystems can introduce maintenance and security concerns.
- Flexible language features require strong conventions in large teams.

### Interview answer: "Why do you choose JavaScript?"
I choose JavaScript because it supports both frontend and backend development and has a mature ecosystem. Its asynchronous model works well for I/O-heavy applications, while TypeScript can add stronger type safety for large codebases.
```js
// One language across the stack
React();       // frontend
fetch("/api"); // API communication
// Node.js     // backend runtime
```

### Interview answer: "When would you not choose JavaScript?"
I would reconsider JavaScript when the workload is dominated by CPU-heavy computation or when a platform requires a different ecosystem or language. For such cases, I would evaluate alternatives based on performance, team expertise, libraries, and operational requirements.
```js
// CPU-heavy work should not block the main thread.
```

### Interview answer: "What makes JavaScript powerful but tricky?"
JavaScript is powerful because functions are first-class, objects are flexible, and asynchronous programming is built into the ecosystem. The same flexibility can create tricky behavior around coercion, `this`, closures, prototypes, and asynchronous execution.
```js
console.log("5" == 5);  // true
console.log("5" === 5); // false
```
---