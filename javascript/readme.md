## Basics

### What is JavaScript?
JavaScript is a high-level, dynamic programming language mainly used to make web pages interactive and dynamic in browsers. It allows developers to handle events, update content, validate forms, and communicate with servers without reloading the page. Today, it is also used on the server side (Node.js) and for mobile, desktop, and full-stack development.

### Difference between Java and JavaScript
Java is a strongly typed, compiled, object-oriented language mainly used for backend and enterprise applications, while JavaScript is a loosely typed scripting language primarily used for web development. Java runs on JVM, whereas JavaScript runs in browsers or runtime environments like Node.js. Despite similar names, they are fundamentally different in design, syntax, and use cases.

### Is JS compiled or interpreted?
JavaScript is both interpreted and just-in-time (JIT) compiled in modern engines like V8. The engine first parses and compiles code into optimized machine code at runtime. This makes JavaScript faster than purely interpreted languages while still being flexible.

### What is ECMAScript (ES6)?
ECMAScript is the standard specification that defines how JavaScript works, and ES6 (released in 2015) is a major update to this standard. It introduced features like let/const, arrow functions, classes, promises, and modules. ES6 made JavaScript more structured and suitable for large-scale applications.

### Why is JS single-threaded?
JavaScript is single-threaded because it has one call stack and executes one task at a time to avoid complexity like race conditions. It uses an event loop and callback queue to handle asynchronous tasks efficiently. This design makes it simple but powerful for non-blocking operations like API calls and timers.

---

## Data Types & Variables

### What are data types in JavaScript?
JavaScript has two categories of data types: primitive and non-primitive (reference types). Primitive types include string, number, boolean, null, undefined, symbol, and bigint. Non-primitive types include objects, arrays, and functions.

### Primitive vs non-primitive types
Primitive data types store actual values directly and are immutable, meaning their values cannot be changed once created. Non-primitive types store references to memory locations and can be modified after creation. Example: numbers are primitive, while arrays and objects are non-primitive.

### What is the `typeof` operator?
The `typeof` operator is used to check the data type of a variable in JavaScript. It returns a string representing the type of the operand. It is commonly used for debugging and type validation.

```javascript
console.log(typeof "hello"); // string
console.log(typeof 10);      // number
console.log(typeof {});      // object
```

### What are variables?
Variables are containers used to store data values in JavaScript programs. They allow you to reuse and manipulate data throughout your code. Variables can be declared using `var`, `let`, or `const`.

### Difference between `var`, `let`, `const`
`var` is function-scoped and can be redeclared and updated, which may cause issues in large programs. `let` is block-scoped and can be updated but not redeclared in the same scope. `const` is block-scoped and cannot be updated or redeclared after assignment.

```javascript
var a = 10;
let b = 20;
const c = 30;
b = 25;      // ✅ allowed
// c = 35;   ❌ error
```

### Difference between `==` and `===`
In JavaScript, `==` checks equality with type coercion, meaning it converts values to the same type before comparing. The `===` operator checks strict equality without type conversion, so both value and type must match. It is recommended to use `===` to avoid unexpected results caused by implicit conversions.

```javascript
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

### What is `NaN`?
`NaN` stands for "Not a Number" and represents an invalid or undefined numeric result. It occurs when a mathematical operation cannot produce a valid number. Interestingly, `NaN` is the only value in JavaScript that is not equal to itself.

```javascript
console.log(0 / 0);        // NaN
console.log(NaN === NaN);  // false
```

### What are truthy and falsy values?
Truthy values are those that evaluate to `true` in a boolean context, like non-empty strings, numbers (except 0), and objects. Falsy values include `false`, `0`, `""`, `null`, `undefined`, and `NaN`. These are commonly used in condition checks.

### What is `null` vs `undefined`?
`undefined` means a variable is declared but not assigned a value. `null` is an explicit assignment that represents an intentional absence of value. Both represent empty values but are used differently in practice.

```javascript
let a;
let b = null;
console.log(a); // undefined
console.log(b); // null
```

### What is type coercion?
Type coercion is the automatic or implicit conversion of values from one data type to another. It usually happens in operations involving different types, especially with `==` or arithmetic operations. It can lead to unexpected results if not handled carefully.

---

## Functions

### What is a function?
A function is a reusable block of code designed to perform a specific task. It can take input values (parameters) and return a result. Functions help organize and reuse code efficiently.

```javascript
function add(a, b) { return a + b; }
```

### Function declaration vs expression
Function declaration defines a named function and is hoisted, meaning it can be used before its definition. Function expression assigns a function to a variable and is not hoisted. This affects when and how functions can be called.

```javascript
// Declaration
function test() {}

// Expression
const test2 = function() {};
```

### What are arrow functions?
Arrow functions are a shorter syntax for writing functions introduced in ES6. They do not have their own `this` context and inherit it from the surrounding scope. They are useful for concise and cleaner code.

```javascript
const add = (a, b) => a + b;
```

### What are parameters vs arguments?
Parameters are variables listed in a function definition. Arguments are the actual values passed to the function when it is called. Parameters act as placeholders for arguments.

### What is a default parameter?
Default parameters allow you to assign default values to function parameters if no value is provided. This helps avoid undefined values and makes functions more robust.

```javascript
function greet(name = "Guest") { return "Hello " + name; }
```

---

## Arrays & Objects

### What is an array?
An array is a data structure used to store multiple values in a single variable. It can hold elements of different types and is indexed starting from 0. Arrays are widely used for collections and iterations.

### Common array methods (map, filter, reduce)
`map()` transforms each element and returns a new array. `filter()` returns elements that satisfy a condition. `reduce()` reduces the array to a single value using an accumulator.

```javascript
let arr = [1, 2, 3, 4];
arr.map(x => x * 2);
arr.filter(x => x > 2);
arr.reduce((sum, x) => sum + x, 0);
```

### What is an object in JS?
An object is a collection of key-value pairs used to store structured data. Keys are strings (or symbols), and values can be any data type. Objects are fundamental for representing real-world entities.

### How to access object properties?
Object properties can be accessed using dot notation or bracket notation. Dot notation is simpler, while bracket notation is useful for dynamic keys.

```javascript
let user = { name: "Kali", age: 25 };
console.log(user.name);
console.log(user["age"]);
```

### What is JSON?
JSON (JavaScript Object Notation) is a lightweight data format used for storing and exchanging data. It is text-based and easy to parse in JavaScript. It is commonly used in APIs.

---

## DOM & Events

### What is the DOM?
DOM (Document Object Model) is a programming interface for HTML and XML documents. It represents the page as a tree structure where each element is a node. JavaScript can manipulate the DOM to update content dynamically.

### How to select elements?
Elements in the DOM can be selected using methods like `getElementById`, `querySelector`, and `querySelectorAll`. These methods allow you to target specific elements to modify them.

```javascript
document.getElementById("id");
document.querySelector(".class");
```

### What is event handling?
Event handling allows JavaScript to respond to user actions like clicks, key presses, or mouse movements. You can attach event listeners to elements to execute functions when events occur.

```javascript
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

### What is event bubbling?
Event bubbling is a process where an event starts from the target element and propagates upward to its parent elements. This allows parent elements to handle events triggered on child elements.

### What is event capturing?
Event capturing is the opposite of bubbling, where the event starts from the topmost element and travels down to the target element. It is less commonly used but can be enabled using event listener options.

---

## Scope & Execution Context

### What is scope (global, block, function)?
Scope defines the accessibility of variables in different parts of a program. Global scope means variables are accessible everywhere, function scope limits access inside functions, and block scope (let/const) restricts access within `{}` blocks. Understanding scope helps avoid unexpected variable conflicts.

### What is lexical scope?
Lexical scope means that the scope of variables is determined by their position in the source code. Inner functions can access variables from their outer functions. This creates a scope chain used during execution.

### What is execution context?
Execution context is the environment in which JavaScript code runs. It includes variables, functions, and the value of `this`. There are global and function execution contexts, managed using the call stack.

### What is hoisting?
Hoisting is JavaScript behavior where variable and function declarations are moved to the top of their scope during compilation. Only declarations are hoisted, not initializations. This can lead to undefined values if not understood properly.

```javascript
console.log(a); // undefined
var a = 10;
```

### What is the Temporal Dead Zone?
Temporal Dead Zone (TDZ) is the time between variable declaration and initialization for `let` and `const`. Accessing variables in this phase throws a `ReferenceError`. It ensures safer variable usage.

---

## Higher-Order Functions & Closures

### What are higher-order functions?
Higher-order functions are functions that take other functions as arguments or return functions. They are widely used for abstraction and reusable logic. Examples include `map`, `filter`, and `reduce`.

### What is a closure?
A closure is a function that remembers variables from its outer scope even after the outer function has finished execution. It helps in data encapsulation and maintaining state. Closures are widely used in callbacks and private variables.

```javascript
function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
```

### What is currying?
Currying is a technique of transforming a function with multiple arguments into a sequence of functions each taking one argument. It helps in function reuse and partial application. It improves code modularity.

```javascript
const add = a => b => a + b;
```

### What is an IIFE?
IIFE (Immediately Invoked Function Expression) is a function that runs immediately after it is defined. It is used to create a private scope and avoid global variable pollution. Common in older JavaScript patterns.

```javascript
(function() {
  console.log("IIFE");
})();
```

### What are pure functions?
Pure functions always return the same output for the same input and have no side effects. They do not modify external variables or state. This makes them predictable and easy to test.

---

## `this`, call/apply/bind, Prototypes

### What is the `this` keyword?
`this` refers to the object that is currently executing the function. Its value depends on how the function is invoked. In arrow functions, `this` is inherited from the surrounding scope.

### `call`, `apply`, `bind` difference
`call()` invokes a function immediately with arguments passed individually. `apply()` is similar but takes arguments as an array. `bind()` returns a new function with a fixed `this` value without invoking it.

```javascript
fn.call(obj, a, b);
fn.apply(obj, [a, b]);
const newFn = fn.bind(obj);
```

### What is a prototype?
Prototype is an object from which other objects inherit properties and methods. Every JavaScript object has a prototype. It enables code reuse and forms the basis of inheritance.

### What is prototype inheritance?
Prototype inheritance allows objects to inherit properties and methods from another object. This is achieved through the prototype chain. It helps in efficient memory usage.

### Class vs constructor function
Classes are modern ES6 syntax for creating objects and handling inheritance. Constructor functions are older ways to achieve the same using functions. Both work similarly behind the scenes using prototypes.

---

## Asynchronous JavaScript

### What is a callback function?
A callback function is a function passed as an argument to another function and executed later. It is commonly used in asynchronous operations. Helps manage tasks like API calls or events.

### What is callback hell?
Callback hell occurs when callbacks are nested inside each other, making code difficult to read and maintain. It leads to a pyramid-like structure. Promises and async/await solve this problem.

### What are Promises?
Promises represent the result of an asynchronous operation. They can be in pending, fulfilled, or rejected states. They allow better handling of async code compared to callbacks.

### Promise chaining
Promise chaining allows handling multiple asynchronous operations in sequence using `.then()`. Each `.then()` returns a new promise. It avoids deeply nested callbacks.

```javascript
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));
```

### What is async/await?
async/await is syntactic sugar over promises that makes asynchronous code look synchronous. The `async` keyword defines a function, and `await` pauses execution until the promise resolves. It improves readability.

### What is the event loop?
The event loop manages execution of asynchronous tasks in JavaScript. It continuously checks the call stack and task queues. It ensures non-blocking execution.

### What is microtask vs macrotask?
Microtasks (like promises) are executed immediately after the current script before rendering. Macrotasks (like `setTimeout`) are executed after microtasks and rendering. Microtasks have higher priority.

---

## Modern Syntax (ES6+)

### What is destructuring?
Destructuring allows extracting values from arrays or objects into variables. It simplifies code and improves readability. It is widely used in modern JavaScript.

```javascript
const { name } = { name: "Kali" };
```

### Spread vs rest operator
Spread operator expands elements of arrays/objects. Rest operator collects multiple elements into a single array. Both use `...` but differ in usage context.

```javascript
const arr2 = [...arr1];
function sum(...nums) {}
```

### Template literals
Template literals use backticks (`` ` ``) to create strings with embedded expressions. They support multi-line strings and interpolation using `${}`. Makes string handling easier.

```javascript
let name = "Kali";
console.log(`Hello ${name}`);
```

### Modules (import/export)
Modules allow splitting code into reusable files. `export` is used to expose variables/functions and `import` is used to use them in other files. Helps in better code organization.

### Optional chaining
Optional chaining (`?.`) allows safe access to nested object properties. It prevents errors if a property is undefined or null. It returns `undefined` instead of throwing an error.

```javascript
user?.address?.city;
```

---

## Storage, Cookies & Networking

### `localStorage` vs `sessionStorage`
`localStorage` stores data with no expiration and persists even after the browser is closed. `sessionStorage` stores data only for the session and is cleared when the tab is closed. Both store data as key-value pairs.

### Cookies in JS
Cookies are small pieces of data stored in the browser and sent with every HTTP request. They are used for sessions, authentication, and tracking. Compared to storage, cookies have size limits and expiry.

### Fetch API
Fetch API is used to make network requests in JavaScript. It returns a promise and is used to get or send data to servers. It is the modern replacement for `XMLHttpRequest`.

```javascript
fetch("https://api.com")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Engine Internals & Performance

### How does the JS engine work?
JavaScript engine (like V8) reads code, parses it into tokens, and creates an Abstract Syntax Tree (AST). It then compiles this into bytecode or machine code using Just-In-Time (JIT) compilation. Finally, the engine executes the code while optimizing performance during runtime.

### Call stack, memory heap
The call stack is where function execution happens in a last-in-first-out manner. The memory heap is where objects and data are stored dynamically. Together, they manage execution and memory allocation in JavaScript.

### How execution context works internally
Execution context is created whenever code runs, containing variable object, scope chain, and `this`. First, a creation phase sets up variables and functions, then execution phase runs the code line by line. Contexts are managed using the call stack.

### How closures manage memory
Closures keep references to outer scope variables even after the parent function finishes execution. These variables stay in memory because they are still being used by the inner function. This allows state persistence but can increase memory usage if misused.

### Garbage collection in JS
Garbage collection automatically removes unused memory in JavaScript. It mainly uses a mark-and-sweep algorithm to clean objects that are no longer reachable. This helps prevent memory overflow, but developers should still avoid leaks.

### Detailed event loop working
The event loop continuously checks the call stack and task queues. If the stack is empty, it pushes tasks from the queue to execute. This enables JavaScript to handle asynchronous operations without blocking execution.

### Microtask queue vs task queue
Microtask queue (Promises, mutation observers) runs before the next render cycle. Task queue (`setTimeout`, `setInterval`) runs after microtasks are completed. Microtasks have higher priority than macrotasks.

### Promise internals
Promises have three states: pending, fulfilled, and rejected. Internally, they store callbacks in queues and execute them when resolved or rejected. They are handled via the microtask queue for faster execution.

### Concurrency in JS (single-threaded model)
JavaScript is single-threaded but achieves concurrency using the event loop and async APIs. Tasks like network calls are handled outside the main thread and pushed back as callbacks. This gives the illusion of parallel execution.

### Race condition handling
Race conditions happen when multiple async operations modify shared data unpredictably. They can be handled using locks, flags, or controlling execution order with promises. Sequential execution ensures consistency.

### Debouncing vs throttling
Debouncing delays execution until the event stops triggering for a set time. Throttling limits execution to once per fixed interval. Both improve performance in events like scroll or input.

```javascript
// debounce
const debounce = (fn, delay) => {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
};
```

### Memory leaks and prevention
Memory leaks occur when unused data is not garbage collected. Common causes include unused closures, global variables, and DOM references. Prevention involves proper cleanup and avoiding unnecessary references.

### Lazy loading / code splitting
Lazy loading loads resources only when needed to improve performance. Code splitting divides code into smaller chunks that load on demand. This reduces initial load time in large applications.

### Virtual DOM concept
Virtual DOM is a lightweight copy of the real DOM used by libraries like React. Changes are first applied to the virtual DOM and then efficiently updated in the real DOM. This improves performance and reduces re-renders.

### Reflow & repaint
Reflow happens when layout changes affect element positions. Repaint occurs when visual styles change without affecting layout. Both impact performance, with reflow being more expensive.

### Deep vs shallow copy
Shallow copy copies only references of nested objects. Deep copy creates a complete independent clone. Shallow copy is faster but can cause unintended side effects.

```javascript
let obj2 = { ...obj1 }; // shallow
```

### Immutability
Immutability means data cannot be modified after creation. Instead, new copies are created with updated values. It helps in predictable state management and debugging.

### Memoization
Memoization caches function results to avoid repeated computations. It improves performance for expensive operations. Commonly used in recursion and React optimization.

### Generators & iterators
Generators are functions that can pause and resume using `yield`. Iterators define how values are accessed sequentially. They help in controlled iteration over data.

```javascript
function* gen() {
  yield 1;
  yield 2;
}
```

### WeakMap / WeakSet
`WeakMap` and `WeakSet` store weak references to objects, meaning they do not prevent garbage collection. They are useful for memory-sensitive applications. Keys in `WeakMap` must be objects only.

---

## Design Patterns

### Module pattern
Module pattern encapsulates code inside a function and exposes only required parts. It uses closures to create private variables. Helps in avoiding global scope pollution.

### Factory pattern
Factory pattern creates objects without using constructors. It returns new objects based on input parameters. Useful for flexible object creation.

### Singleton pattern
Singleton ensures only one instance of a class exists throughout the application. It is commonly used for configurations or shared resources. Achieved using closures or static variables.

### Observer pattern
Observer pattern allows objects to subscribe to events and get notified on changes. It is widely used in event systems and frameworks. One object (subject) notifies multiple observers.

### MVC/MVVM basics
MVC separates an application into Model, View, and Controller for better structure. MVVM improves on this by introducing a ViewModel for data binding between UI and logic. Both patterns improve maintainability and scalability of applications.
