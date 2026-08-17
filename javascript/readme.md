# JavaScript Complete Interview Q&A

## JavaScript Introduction & Core Interview Questions

### What is JavaScript?
JavaScript is a high-level, dynamically typed programming language mainly used to add behavior and interactivity to web applications. It runs in browsers and also on servers using runtimes such as Node.js.
```js
const name = "Kalidas";
console.log(`Hello ${name}`);
```

### Why is JavaScript popular?
JavaScript is supported by all major browsers and has a huge ecosystem of libraries, frameworks, and tools. It can be used for frontend, backend, mobile, desktop, and serverless development.
```js
// Frontend
React

// Backend
Node.js
```

### What are the main advantages of JavaScript?
JavaScript is easy to start with, works across platforms, supports asynchronous programming, and has a large ecosystem. It also allows developers to build both frontend and backend applications.
```js
fetch("/api/users")
  .then(res => res.json());
```

### What are the disadvantages of JavaScript?
JavaScript is dynamically typed, so some errors are discovered only at runtime, and its type coercion can cause unexpected results. Large applications can also become difficult to maintain without good architecture and tooling.
```js
console.log("5" + 2); // "52"
console.log("5" - 2); // 3
```

### Is JavaScript the same as Java?
No. JavaScript and Java are different programming languages with different runtimes, syntax, and design goals. JavaScript is commonly used for web applications, while Java is widely used for enterprise and backend systems.
```js
// JavaScript
const x = 10;
```

### Is JavaScript interpreted or compiled?
Modern JavaScript engines use JIT (Just-In-Time) compilation, combining interpretation and compilation techniques. The exact execution strategy depends on the JavaScript engine, such as V8.
```js
const result = 10 + 20;
```

### Is JavaScript single-threaded?
The JavaScript execution model uses a single main thread for executing JavaScript code, but runtimes provide asynchronous APIs and mechanisms such as Web Workers. This allows I/O and other work to happen without blocking the main JavaScript thread.
```js
console.log("Start");

setTimeout(() => console.log("Async"), 0);

console.log("End");
```

### What is ECMAScript?
ECMAScript is the language specification that defines the core features and behavior of JavaScript. JavaScript is an implementation of the ECMAScript specification with additional host APIs provided by environments such as browsers.
```js
let user = "John"; // ECMAScript syntax
```

### What is a JavaScript engine?
A JavaScript engine executes JavaScript code. Examples include V8 in Chrome and Node.js, SpiderMonkey in Firefox, and JavaScriptCore in Safari.
```js
console.log(10 + 20); // executed by the JS engine
```

### What is the difference between JavaScript and TypeScript?
JavaScript is dynamically typed, while TypeScript adds static type checking and is compiled/transpiled to JavaScript. TypeScript helps catch many type-related errors during development.
```ts
let age: number = 25;
```

### Where can JavaScript run?
JavaScript can run in browsers and server-side runtimes such as Node.js. It can also be used in environments such as workers, serverless platforms, desktop frameworks, and mobile frameworks.
```js
// Browser
window.alert("Hello");

// Node.js
console.log("Hello");
```

### What are the key features of JavaScript?
Important features include dynamic typing, first-class functions, objects, prototypes, closures, asynchronous programming, modules, and event-driven execution. These features make JavaScript flexible for different application types.
```js
const add = (a, b) => a + b;
```

### What is dynamic typing in JavaScript?
Dynamic typing means a variable does not have a fixed type declared at compile time and can hold values of different types. The type is associated with the value at runtime.
```js
let value = 10;
value = "hello";
```

### What is weak typing in JavaScript?
JavaScript allows implicit type conversion in many operations, which is why it is often described as weakly typed. This can be convenient but can also produce surprising results.
```js
console.log("10" + 5); // "105"
```

### What are the limitations of JavaScript?
Common limitations include dynamic typing, runtime errors, browser security restrictions, single-threaded main execution, and potential performance issues from poorly written code. Good TypeScript usage, architecture, testing, and performance practices reduce many of these problems.
```js
// Runtime error
const user = null;
// user.name; // TypeError
```

### Why is JavaScript called a scripting language?
Historically, JavaScript was designed to add scripts and dynamic behavior to web pages rather than operate as a standalone compiled application language. Today, it is a general-purpose programming language and can power complete applications.
```js
document.querySelector("button")
  .addEventListener("click", () => alert("Clicked"));
```

### What is the difference between JavaScript and a JavaScript runtime?
JavaScript is the language, while a runtime provides the engine plus environment-specific APIs needed to execute it. For example, a browser provides DOM APIs, while Node.js provides APIs such as `fs` and `http`.
```js
// Browser API
document.title = "App";

// Node.js API
// fs.readFile(...)
```

### What are the advantages of JavaScript for web development?
It provides rich browser APIs, fast feedback during development, asynchronous networking, and a large ecosystem. It also allows interactive UI development without requiring a page reload for every action.
```js
button.addEventListener("click", () => {
  console.log("User clicked");
});
```

### What are common disadvantages of using JavaScript in large applications?
Dynamic typing and flexible language features can make large codebases harder to reason about if coding standards are weak. Dependency management, browser differences, and accidental complexity can also become challenges.
```js
// TypeScript can help catch this earlier
let count = 10;
// count = "ten";
```

### Why should a senior developer know JavaScript fundamentals before React or Node.js?
React and Node.js are built around JavaScript concepts such as functions, closures, objects, modules, promises, and the event loop. Strong fundamentals make framework behavior easier to understand and debug.
```js
const createUser = name => ({
  name,
  getName: () => name
});
```

---

## JavaScript Fundamentals

### What are `var`, `let`, and `const`?
`var` is function-scoped and can be redeclared, while `let` and `const` are block-scoped. `const` cannot be reassigned after initialization, although object contents can still be changed.

```js
var a = 10;
let b = 20;
const c = 30;
```

### What are JavaScript data types?
JavaScript has primitive types such as string, number, bigint, boolean, undefined, null, and symbol, plus objects. Functions and arrays are also objects in JavaScript.

```js
const name = "Kalidas"; // string
const age = 30;         // number
const user = {};        // object
```

### What is the difference between primitive and reference types?
Primitive values are immutable and are copied by value, while objects are reference values and their references are copied. Therefore, changing a shared object can affect multiple variables.

```js
let a = 10;
let b = a;
b = 20; // a remains 10

const x = { name: "A" };
const y = x;
y.name = "B"; // x.name is also "B"
```

### What is type coercion?
Type coercion is JavaScript automatically converting one type to another during an operation. It commonly happens with `+`, comparisons, and equality operators.

```js
console.log("5" + 2); // "52"
console.log("5" - 2); // 3
```

### What is the difference between `==` and `===`?
`==` performs type coercion before comparison, while `===` compares both value and type without coercion. In production code, `===` is generally preferred because it is more predictable.

```js
5 == "5";  // true
5 === "5"; // false
```

### What are truthy and falsy values?
Falsy values include `false`, `0`, `-0`, `""`, `null`, `undefined`, and `NaN`; most other values are truthy. This behavior is commonly used in conditional and short-circuit expressions.

```js
if ("hello") console.log("truthy");
if (0) console.log("not executed");
```

### What are template literals?
Template literals use backticks and allow string interpolation and multiline strings. They make dynamic string creation easier to read.

```js
const name = "Kalidas";
console.log(`Hello ${name}`);
```

### What is destructuring?
Destructuring extracts values from arrays or properties from objects into variables. It is frequently used with function parameters, React props, and API responses.

```js
const user = { name: "Kalidas", age: 30 };
const { name, age } = user;
```

### What are spread and rest operators?
Both use `...`, but spread expands values while rest collects remaining values. Spread is commonly used for copying/merging, while rest is useful for variable arguments.

```js
const a = [1, 2];
const b = [...a, 3];

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

### What is optional chaining?
Optional chaining `?.` safely accesses nested properties without throwing when an intermediate value is null or undefined. It returns `undefined` instead.

```js
const city = user?.address?.city;
```

### What is nullish coalescing?
The `??` operator returns the right-hand value only when the left-hand value is `null` or `undefined`. Unlike `||`, it preserves valid falsy values such as `0` and `""`.

```js
const count = 0;
console.log(count ?? 10); // 0
```

### What does `typeof` do?
`typeof` returns a string describing the type of a value. One famous quirk is that `typeof null` returns `"object"`.

```js
typeof 10;       // "number"
typeof "hello";  // "string"
typeof null;     // "object"
```

### What is the `void` operator?
`void` evaluates an expression and always returns `undefined`. It is uncommon in modern application code but can appear in older JavaScript patterns.

```js
console.log(void 0); // undefined
```

### What is the comma operator?
The comma operator evaluates multiple expressions from left to right and returns the value of the final expression. It is different from commas used to separate function arguments or declarations.

```js
const result = (1 + 2, 3 + 4);
console.log(result); // 7
```

### What is short-circuit evaluation?
`&&` stops when it finds a falsy value, while `||` stops when it finds a truthy value. This allows conditional execution and default-value patterns.

```js
isLoggedIn && showDashboard();
const name = inputName || "Guest";
```

### What are tagged template literals?
A tagged template passes the template's strings and interpolated values to a function. It can be used for custom formatting, escaping, and domain-specific string processing.

```js
function tag(strings, value) {
  return `${strings[0]}${value}`;
}
tag`Hello ${"World"}`;
```

### What is object shorthand notation?
When an object's property name and variable name are the same, JavaScript allows the shorter `{ name }` syntax. It improves readability when constructing objects.

```js
const name = "Kalidas";
const user = { name };
```

### What are computed property names?
Computed property names allow an expression to determine an object's property name. They are written using square brackets inside an object literal.

```js
const key = "name";
const user = { [key]: "Kalidas" };
```

---





## Scope & Execution

### What is global scope?
A variable in global scope can be accessed from many parts of the program, subject to module and environment rules. Excessive global state can cause naming conflicts and make applications harder to maintain.

```js
const appName = "MyApp";
function show() { console.log(appName); }
```

### What is function scope?
Variables declared with `var` are function-scoped, meaning they are accessible throughout the function where they are declared. `let` and `const` are block-scoped instead.

```js
function test() {
  var x = 10;
}
```

### What is block scope?
A block is code surrounded by `{}` such as an `if` or loop. Variables declared with `let` and `const` exist only inside that block.

```js
if (true) {
  let x = 10;
}
```

### What is lexical scope?
Lexical scope means variable visibility is determined by where code is written, not where a function is called. Inner functions can access variables from their outer lexical scope.

```js
const name = "Kalidas";
function show() {
  console.log(name);
}
```

### What is the scope chain?
When JavaScript cannot find a variable in the current scope, it searches the outer lexical scopes until it reaches the global scope. This lookup process is the scope chain.

```js
const a = 1;
function outer() {
  const b = 2;
  function inner() { console.log(a, b); }
}
```

### What is an execution context?
An execution context is the environment JavaScript creates to run code, including variables, scope information, and the value of `this`. Common contexts are global, function, and module contexts.

```js
function test() {
  const x = 10; // part of this function's execution context
}
```

### What is the call stack?
The call stack tracks active function calls in last-in-first-out order. When a function finishes, its stack frame is removed.

```js
function a() { b(); }
function b() { console.log("B"); }
a();
```

### What is hoisting?
Hoisting describes how declarations are processed before code execution. Function declarations are callable before their source position, while `let` and `const` remain inaccessible during their temporal dead zone.

```js
sayHi();
function sayHi() {
  console.log("Hi");
}
```

### What is the Temporal Dead Zone?
The Temporal Dead Zone is the period between entering a scope and the point where a `let` or `const` variable is initialized. Accessing it during this period throws a `ReferenceError`.

```js
console.log(x); // ReferenceError
let x = 10;
```

### What is variable shadowing?
Shadowing occurs when an inner scope declares a variable with the same name as a variable in an outer scope. The inner variable takes precedence within that scope.

```js
let name = "Outer";
{
  let name = "Inner";
  console.log(name); // Inner
}
```

### What is module scope?
Variables declared in an ES module are scoped to that module and are not automatically global. Modules communicate through explicit `export` and `import`.

```js
const secret = 123;
export { secret };
```

### What is strict mode?
Strict mode enables stricter JavaScript rules and prevents some error-prone behaviors. It is automatically enabled in ES modules.

```js
"use strict";
x = 10; // ReferenceError
```

### Why is `with` discouraged or banned in strict mode?
`with` changes the scope lookup rules dynamically, making code difficult to analyze and optimize. Strict mode therefore disallows it.

```js
"use strict";
// with (obj) {} // SyntaxError
```

---
## DOM & Browser JavaScript

### What is the DOM?
The DOM is the browser's object representation of an HTML document. JavaScript can use it to read, create, modify, and remove elements.

```js
const title = document.querySelector("h1");
title.textContent = "Hello";
```

### What is event bubbling?
Event bubbling means an event triggered on a nested element propagates upward through its ancestors. It enables event delegation but can also cause unintended parent handlers to run.

```js
child.addEventListener("click", () => console.log("child"));
parent.addEventListener("click", () => console.log("parent"));
```

### What is event capturing?
Capturing is the phase where an event travels from the document/root toward the target before the target and bubbling phases. A listener can opt into capture mode.

```js
parent.addEventListener("click", handler, true);
```

### What is event delegation?
Event delegation attaches one handler to a parent instead of many child elements and uses event propagation to determine the target. It is useful for dynamic lists and reducing listeners.

```js
list.addEventListener("click", e => {
  if (e.target.matches("button")) console.log("clicked");
});
```

### What is `preventDefault()`?
`preventDefault()` stops the browser's default action for an event, such as submitting a form or following a link. It does not stop event propagation.

```js
form.addEventListener("submit", e => {
  e.preventDefault();
});
```

### What is `stopPropagation()`?
`stopPropagation()` prevents an event from continuing to other elements in the propagation path. It does not generally prevent the browser's default action.

```js
button.addEventListener("click", e => {
  e.stopPropagation();
});
```

### What are localStorage and sessionStorage?
`localStorage` persists data across browser sessions, while `sessionStorage` is scoped to the current page session. Both store strings and are accessible to JavaScript, so sensitive data should not be stored there.

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

### What are cookies?
Cookies are small pieces of data associated with a domain and can be sent with HTTP requests depending on their attributes. `HttpOnly`, `Secure`, and `SameSite` attributes are important security controls.

```js
document.cookie = "theme=dark";
```

### What is the Fetch API?
`fetch()` provides a Promise-based API for making HTTP requests. It does not reject solely because an HTTP response has a 4xx or 5xx status, so applications should check `response.ok`.

```js
const response = await fetch("/api/users");
if (!response.ok) throw new Error("Request failed");
```

### What is CORS?
CORS is a browser security mechanism that controls whether a web page can access resources from another origin. The server communicates allowed origins and methods using HTTP headers.

```js
fetch("https://api.example.com/data");
```

### What is `MutationObserver`?
`MutationObserver` watches for changes to a DOM subtree such as added nodes or attribute changes. It is useful when code needs to react to dynamically modified DOM content.

```js
const observer = new MutationObserver(records => console.log(records));
observer.observe(document.body, { childList: true, subtree: true });
```

### What is `IntersectionObserver`?
`IntersectionObserver` asynchronously detects when an element enters or leaves a viewport or another root. It is commonly used for lazy loading and infinite scrolling.

```js
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) console.log("visible");
});
```

### What is `ResizeObserver`?
`ResizeObserver` watches an element's size changes without repeatedly polling layout dimensions. It is useful for responsive components and dynamic layouts.

```js
const observer = new ResizeObserver(entries => console.log(entries[0].contentRect));
observer.observe(element);
```

### What is `DocumentFragment`?
A `DocumentFragment` is an off-DOM container that can hold nodes before inserting them into the document. It can reduce repeated DOM insertion work when building many nodes.

```js
const fragment = document.createDocumentFragment();
fragment.append(document.createElement("div"));
list.append(fragment);
```

### What is Shadow DOM?
Shadow DOM provides an encapsulated DOM tree and style scope for web components. It helps prevent component internals and styles from interfering with the surrounding document.

```js
const shadow = element.attachShadow({ mode: "open" });
shadow.innerHTML = "<p>Hello</p>";
```

### What is the History API?
The History API lets applications change the browser's URL and history without a full page reload. It is commonly used by SPA routers.

```js
history.pushState({}, "", "/dashboard");
```

### What is the Navigator API?
The `navigator` object exposes information and browser capabilities such as clipboard access, geolocation, and user-agent information. Availability and permissions depend on the browser and security context.

```js
navigator.clipboard.writeText("Hello");
```

### What are Web Workers?
Web Workers run JavaScript in a separate worker context so CPU-heavy tasks can avoid blocking the main UI thread. Workers communicate with the main thread using messages.

```js
const worker = new Worker("worker.js");
worker.postMessage({ value: 10 });
```

### What is the Virtual DOM?
The Virtual DOM is an in-memory representation used by libraries such as React to determine efficient DOM updates. It is a React implementation concept rather than a native browser API.

```js
// React concept:
const element = <h1>Hello</h1>;
```

---





## Modules

### What are ES modules?
ES modules provide a standard way to split JavaScript into files with explicit imports and exports. They have their own module scope and support static analysis.

```js
// math.js
export const add = (a, b) => a + b;
```

### What is the difference between named and default exports?
Named exports allow multiple explicitly named exports from a module, while a default export provides one primary exported value. Import syntax differs accordingly.

```js
export const add = () => {};
export default function App() {}
```

### What is CommonJS?
CommonJS is a module system historically used by Node.js that uses `require()` and `module.exports`. Modern Node.js also supports ES modules.

```js
const fs = require("fs");
module.exports = { value: 10 };
```

### What are dynamic imports?
Dynamic `import()` loads a module asynchronously at runtime and returns a Promise. It is commonly used for lazy loading and code splitting.

```js
const module = await import("./feature.js");
```

### What is `import.meta`?
`import.meta` provides module-specific metadata. For example, `import.meta.url` gives the URL of the current ES module.

```js
console.log(import.meta.url);
```

### What is tree shaking?
Tree shaking is a bundler optimization that removes unused exports from statically analyzable modules. ES modules make this optimization easier because imports and exports are statically structured.

```js
import { add } from "./math.js";
// unused exports may be removed by the bundler
```

### What are circular dependencies?
A circular dependency occurs when module A depends on B while B directly or indirectly depends on A. It can produce partially initialized bindings and confusing runtime behavior, so cycles should be designed carefully.

```js
// a.js -> imports b.js
// b.js -> imports a.js
```

### What are module bundlers?
Bundlers such as Webpack, Vite, and Rollup process modules and assets for application delivery. They can perform transformations, code splitting, tree shaking, and optimization.

```js
// Vite/Webpack/Rollup process your module graph
import "./styles.css";
```

---

## Error Handling

### How does `try/catch` work?
`try/catch` lets code handle exceptions without terminating the current control flow. It is commonly used around operations that may throw.

```js
try {
  JSON.parse("invalid");
} catch (error) {
  console.error(error.message);
}
```

### What does `finally` do?
`finally` runs after `try` and `catch` regardless of whether an exception occurred. It is useful for cleanup such as releasing resources or resetting state.

```js
try {
  doWork();
} finally {
  cleanup();
}
```

### How do you throw an error?
The `throw` statement creates an exception that can be handled by a surrounding `catch`. Throwing `Error` objects preserves useful stack information.

```js
if (!user) {
  throw new Error("User not found");
}
```

### What are custom errors?
Custom errors extend the built-in `Error` class to represent domain-specific failure types. They make error handling and classification clearer.

```js
class ValidationError extends Error {}
throw new ValidationError("Invalid email");
```

### What are common JavaScript error types?
`TypeError` occurs when a value is used incorrectly, `ReferenceError` when an identifier cannot be resolved, `SyntaxError` for invalid syntax, and `RangeError` when a value is outside an allowed range.

```js
null.foo; // TypeError
console.log(notDefined); // ReferenceError
```

### How do you handle errors in async code?
With Promises, use `.catch()` or `try/catch` around `await` expressions. A common senior-level concern is ensuring rejected Promises are not silently ignored.

```js
try {
  const data = await loadData();
} catch (error) {
  console.error(error);
}
```

### What are `window.onerror` and `unhandledrejection`?
`window.onerror` can observe uncaught runtime errors in browsers, while `unhandledrejection` observes rejected Promises that have no rejection handler. They can support global error reporting.

```js
window.addEventListener("unhandledrejection", event => {
  console.error(event.reason);
});
```

### What is the re-throwing error pattern?
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

## Memory & Performance

### What is stack vs heap memory?
The stack manages execution frames and local execution state, while the heap stores dynamically allocated objects and other data. The exact implementation is runtime-dependent, but this model is useful for interviews.

```js
function test() {
  const x = 10;
  const obj = { value: 20 };
}
```

### What is garbage collection?
Garbage collection automatically identifies objects that are no longer reachable and reclaims their memory. Developers mainly need to avoid accidentally keeping unnecessary references alive.

```js
let data = { huge: "object" };
data = null; // object may become collectible
```

### What is a memory leak?
A memory leak occurs when an application unintentionally retains references to data that is no longer needed. Common causes include unremoved event listeners, timers, global references, and long-lived caches.

```js
const handler = () => {};
window.addEventListener("resize", handler);
// remove when no longer needed
window.removeEventListener("resize", handler);
```

### What is debouncing?
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

### What is throttling?
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

### What is memoization?
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

### What are lazy loading and code splitting?
Lazy loading delays loading a resource until it is needed, while code splitting divides application code into smaller chunks. Together they can reduce initial application load time.

```js
const Feature = await import("./Feature.js");
```

### What is `requestIdleCallback()`?
`requestIdleCallback()` schedules low-priority work when the browser has idle time. It should not be used for work that must happen immediately or reliably at a specific time.

```js
requestIdleCallback(() => {
  console.log("low-priority work");
});
```

### What are `WeakRef` and `FinalizationRegistry`?
`WeakRef` allows a reference that does not prevent garbage collection, while `FinalizationRegistry` lets code register cleanup-related callbacks when objects are collected. They are advanced features and should be used cautiously.

```js
const ref = new WeakRef(object);
```

### What is the Performance API?
The Performance API provides high-resolution timing and measurement tools. `performance.now()` measures elapsed time, while marks and measures can profile application operations.

```js
performance.mark("start");
// work
performance.mark("end");
performance.measure("work", "start", "end");
```

---

## Advanced JavaScript

### What are iterators?
An iterator is an object that follows the iterator protocol and provides a `next()` method returning `{ value, done }`. Iterables such as arrays can produce iterators.

```js
const iterator = [1, 2][Symbol.iterator]();
iterator.next(); // { value: 1, done: false }
```

### What are generators?
Generators are functions declared with `function*` that can pause and resume using `yield`. They automatically implement the iterator protocol.

```js
function* numbers() {
  yield 1;
  yield 2;
}
```

### What are Symbols?
A Symbol is a unique primitive value often used as an object key when you want to avoid property-name collisions. JavaScript also defines well-known Symbols for language protocols.

```js
const id = Symbol("id");
const user = { [id]: 123 };
```

### What are `Map` and `Set`?
`Map` stores key-value pairs and allows keys of any value type, while `Set` stores unique values. They are often better suited than plain objects or arrays for certain lookup and uniqueness requirements.

```js
const map = new Map([["id", 1]]);
const set = new Set([1, 1, 2]);
```

### What are `WeakMap` and `WeakSet`?
They hold weak references to object keys or values, allowing garbage collection when there are no other strong references. They are useful for metadata associated with object lifetimes.

```js
const cache = new WeakMap();
cache.set(object, "metadata");
```

### What is `Proxy`?
A Proxy wraps an object and intercepts operations such as property access, assignment, and function calls. It enables advanced validation, logging, and metaprogramming.

```js
const proxy = new Proxy({}, {
  get: (target, key) => `Value: ${String(key)}`
});
```

### What is `Reflect`?
`Reflect` provides standard methods for performing object operations such as `get`, `set`, and `defineProperty`. It is commonly used inside Proxy handlers.

```js
Reflect.get({ name: "A" }, "name");
```

### What are Typed Arrays and ArrayBuffer?
`ArrayBuffer` represents raw binary memory, while typed arrays such as `Uint8Array` provide structured views over that memory. They are useful for binary protocols, media, and performance-sensitive operations.

```js
const buffer = new ArrayBuffer(8);
const bytes = new Uint8Array(buffer);
```

### What is BigInt?
`BigInt` represents integers larger than the safe integer range of JavaScript's Number type. BigInts and Numbers should not normally be mixed directly in arithmetic.

```js
const big = 9007199254740993n;
```

### What is metaprogramming?
Metaprogramming means writing code that operates on the structure or behavior of other code. JavaScript supports this through features such as Proxy, Reflect, Symbols, and property descriptors.

```js
const obj = new Proxy({}, {
  set(target, key, value) {
    console.log(key, value);
    return Reflect.set(target, key, value);
  }
});
```

### What is the difference between `for...of` and `for...in`?
`for...of` iterates over values from an iterable, while `for...in` iterates over enumerable property keys. For arrays, `for...of` is generally the correct choice when you need values.

```js
for (const value of [10, 20]) console.log(value);
for (const key in { a: 1 }) console.log(key);
```

### What are well-known Symbols?
Well-known Symbols define standard JavaScript protocols, such as `Symbol.iterator`, `Symbol.toPrimitive`, and `Symbol.hasInstance`. They let objects customize language behavior.

```js
const obj = {
  [Symbol.toPrimitive]() { return 10; }
};
```

### What is `globalThis`?
`globalThis` provides a standard way to access the global object across JavaScript environments. It avoids environment-specific names such as `window` or `global`.

```js
console.log(globalThis);
```

### What are logical assignment operators?
`||=`, `&&=`, and `??=` combine logical checks with assignment. They are useful for concise conditional initialization.

```js
let name = "";
name ||= "Guest";
```

### What does `Object.getOwnPropertyDescriptors()` do?
It returns all own property descriptors of an object. It is useful when copying objects while preserving getters, setters, and descriptor attributes.

```js
const descriptors = Object.getOwnPropertyDescriptors(obj);
```

### What are `SharedArrayBuffer` and `Atomics`?
`SharedArrayBuffer` allows memory to be shared between certain worker contexts, while `Atomics` provides safe atomic operations on shared typed-array data. They are advanced tools for coordinating concurrent JavaScript workers.

```js
const buffer = new SharedArrayBuffer(4);
const view = new Int32Array(buffer);
Atomics.add(view, 0, 1);
```

---

## Design Patterns

### What is the Module pattern?
The Module pattern groups related state and functions and exposes only a controlled public API. Historically it used closures for private state.

```js
const counter = (() => {
  let count = 0;
  return { inc: () => ++count };
})();
```

### What is the Factory pattern?
A Factory creates objects without requiring callers to know the exact construction details. It is useful when the object type depends on runtime input.

```js
function createUser(role) {
  return role === "admin" ? new Admin() : new User();
}
```

### What is the Singleton pattern?
A Singleton ensures that a component has one shared instance within a given scope. It can be useful for shared infrastructure but should not be overused because it can introduce global state.

```js
const config = Object.freeze({ api: "/api" });
```

### What is the Observer pattern?
The Observer pattern lets subscribers receive notifications when a subject changes. It is common in event-driven systems.

```js
subject.subscribe(value => console.log(value));
```

### What is the Strategy pattern?
Strategy encapsulates interchangeable algorithms behind a common interface. The caller can choose the strategy at runtime.

```js
const strategies = {
  card: payByCard,
  upi: payByUpi
};
strategies[method](amount);
```

### What is the Adapter pattern?
An Adapter converts one interface into another expected by the client. It helps integrate incompatible APIs without changing the existing client code.

```js
const adapter = oldApi => ({
  getUser: () => oldApi.fetchUser()
});
```

### What is the Decorator pattern?
A Decorator adds behavior to an object or function without modifying its original implementation. Higher-order functions are a common JavaScript implementation technique.

```js
const withLogging = fn => (...args) => {
  console.log(args);
  return fn(...args);
};
```

### What is the Proxy pattern?
The Proxy pattern provides an intermediary that controls access to another object. JavaScript's native `Proxy` makes this pattern particularly powerful.

```js
const safe = new Proxy(user, {
  get(target, key) {
    return Reflect.get(target, key);
  }
});
```

### What is the Revealing Module pattern?
It keeps implementation details private and returns selected functions or values as the public API. It is a variation of the Module pattern.

```js
const module = (() => {
  const privateFn = () => 1;
  return { publicFn: privateFn };
})();
```

### What is the Command pattern?
The Command pattern represents an operation as an object or function, allowing it to be queued, logged, undone, or executed later.

```js
const command = {
  execute: () => console.log("saved")
};
command.execute();
```

### What is the Iterator pattern?
The Iterator pattern provides a standard way to traverse a collection without exposing its internal representation. JavaScript implements this through the iterator protocol.

```js
for (const value of [1, 2, 3]) console.log(value);
```

### What is the Mediator pattern?
A Mediator centralizes communication between components so they do not need direct knowledge of one another. This can reduce tight coupling in complex systems.

```js
mediator.send("paymentComplete", data);
```

### Observer vs Pub/Sub?
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

## JavaScript Security

### What is XSS?
Cross-Site Scripting occurs when untrusted content is executed as script in a user's browser. Prevent it by safely encoding output, sanitizing untrusted HTML, and using defenses such as CSP.

```js
element.textContent = userInput; // safer than innerHTML
```

### What is CSRF?
CSRF tricks a user's authenticated browser into sending an unwanted request to another site. Common defenses include SameSite cookies, CSRF tokens, and validating request origin where appropriate.

```js
// Server validates a CSRF token before changing state.
```

### What is prototype pollution?
Prototype pollution occurs when attacker-controlled input modifies object prototypes, potentially changing behavior across many objects. Avoid unsafe deep merges and validate keys such as `__proto__`, `constructor`, and `prototype`.

```js
// Avoid blindly merging untrusted objects into application objects.
```

### What is CORS security?
CORS controls which origins browsers allow to read cross-origin responses. It is a browser access-control mechanism, not a replacement for authentication or server-side authorization.

```http
Access-Control-Allow-Origin: https://example.com
```

### What are secure cookies?
Cookies can use `HttpOnly` to block JavaScript access, `Secure` to require HTTPS, and `SameSite` to reduce cross-site request risks. These attributes are important when storing session identifiers.

```http
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax
```

### Why is `eval()` risky?
`eval()` executes a string as JavaScript and can turn untrusted input into code execution. It also makes code harder to analyze and can hurt performance, so it should generally be avoided.

```js
// Avoid:
eval(userInput);
```

### What is CSP?
Content Security Policy is a browser security mechanism that restricts which resources and scripts a page can load or execute. A strong CSP can significantly reduce the impact of some XSS attacks.

```http
Content-Security-Policy: default-src 'self'
```

### What is SRI?
Subresource Integrity allows a browser to verify that a fetched external resource matches a known cryptographic hash. It helps protect against unexpected modification of third-party resources.

```html
<script src="https://cdn.example.com/app.js"
        integrity="sha384-..."></script>
```

### What is `postMessage` security?
`postMessage` enables cross-origin window communication, but receivers must validate `event.origin` and avoid blindly trusting `event.data`. The sender should also use a specific target origin rather than `"*"` when possible.

```js
window.addEventListener("message", event => {
  if (event.origin !== "https://trusted.example") return;
});
```

### What is an open redirect?
An open redirect occurs when an application redirects users to attacker-controlled destinations through an insufficiently validated URL. Attackers can abuse it for phishing and trust abuse.

```js
// Validate redirect destinations against an allowlist.
```

### What is clickjacking?
Clickjacking tricks users into interacting with a hidden or overlaid page. Defenses include CSP `frame-ancestors` and, for older compatibility, `X-Frame-Options`.

```http
X-Frame-Options: DENY
```

### Why is localStorage risky for sensitive data?
JavaScript can read localStorage, so an XSS vulnerability can expose tokens or other sensitive values stored there. For session credentials, HttpOnly cookies are often safer when the architecture supports them.

```js
localStorage.setItem("token", sensitiveToken); // risky
```

---

## JavaScript Quirks & Gotchas

### Why is `typeof null` equal to `"object"`?
This is a historical JavaScript behavior preserved for compatibility. It does not mean `null` is actually an object.

```js
typeof null; // "object"
```

### Why is `0.1 + 0.2 !== 0.3`?
JavaScript uses IEEE 754 floating-point numbers, and many decimal fractions cannot be represented exactly in binary. Therefore, arithmetic can produce tiny precision errors.

```js
0.1 + 0.2 === 0.3; // false
```

### What are `[] + []`, `[] + {}`, and `{} + []`?
These expressions demonstrate JavaScript's coercion rules and can be context-dependent, especially for `{}` at the start of a statement. The safe interview answer is that arrays and objects can be converted to primitive/string representations during `+` operations.

```js
[] + []; // ""
[] + {}; // "[object Object]"
```

### Why is `NaN === NaN` false?
`NaN` is defined as an unordered numeric value, so it is not equal to itself using normal equality. Use `Number.isNaN()` to test specifically for it.

```js
NaN === NaN; // false
Number.isNaN(NaN); // true
```

### What is ASI?
Automatic Semicolon Insertion is a JavaScript parsing rule where semicolons can be inserted at certain line breaks. Developers should understand it because some line breaks can change program behavior.

```js
return
{
  value: 1
}
// returns undefined
```

### What does `delete` do?
`delete` removes a property from an object when the property is configurable. It does not delete local variables or free arbitrary memory directly.

```js
const user = { name: "A" };
delete user.name;
```

### Why don't arrow functions have their own `arguments`?
Arrow functions inherit `arguments` from their surrounding scope rather than creating their own. Use rest parameters when you need an arrow function to accept arbitrary arguments.

```js
const sum = (...args) => args.reduce((a, b) => a + b, 0);
```

### Why are `[]` and `{}` truthy?
All objects, including arrays and plain objects, are truthy regardless of whether they contain elements or properties.

```js
Boolean([]); // true
Boolean({}); // true
```

### Why is `null == undefined` true?
Loose equality has a special rule that treats `null` and `undefined` as equal to each other but not to other values. Strict equality distinguishes them.

```js
null == undefined;  // true
null === undefined; // false
```

---

## Testing JavaScript

### What is unit testing?
Unit testing verifies small pieces of code in isolation, such as a function or component. Good unit tests are fast, deterministic, and focused on observable behavior.

```js
expect(add(2, 3)).toBe(5);
```

### What are Jest `describe`, `it`, and `expect`?
`describe` groups related tests, `it` or `test` defines an individual test, and `expect` provides assertions. Jest also provides mocking and spying utilities.

```js
describe("add", () => {
  it("adds numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### What are mocks, spies, and stubs?
A mock replaces behavior with controlled behavior, a spy observes calls to a function, and a stub provides predetermined responses. The terminology can vary slightly between testing libraries.

```js
const spy = jest.spyOn(api, "fetchUser");
```

### What are test doubles?
Test doubles are substitutes used during testing to isolate the code under test. Common types include mocks, stubs, spies, fakes, and dummies.

```js
const fakeApi = {
  getUser: async () => ({ id: 1 })
};
```

### What is code coverage?
Code coverage measures which parts of the code were executed by tests. High coverage can help identify untested areas, but high percentage alone does not guarantee good tests.

```js
// Example metric: statements, branches, functions, lines.
```

### What is TDD vs BDD?
TDD focuses on writing tests before implementation in a red-green-refactor cycle. BDD emphasizes behavior and collaboration using scenarios that describe expected outcomes.

```js
// Given -> When -> Then
```

---

## TypeScript Fundamentals

### What is the difference between types and interfaces?
Both can describe object shapes, but interfaces are especially suited to extensible object contracts and declaration merging, while type aliases can represent unions, intersections, and other compositions. In modern TypeScript, both are widely used.

```ts
interface User { name: string }
type ID = string | number;
```

### What are generics?
Generics allow reusable code to work with different types while preserving type information. They are useful for APIs, collections, and utility functions.

```ts
function identity<T>(value: T): T {
  return value;
}
```

### What are utility types?
Utility types transform existing types into useful variants. Common examples include `Partial`, `Pick`, `Omit`, and `Record`.

```ts
type UpdateUser = Partial<User>;
type UserName = Pick<User, "name">;
```

### What is type narrowing?
Type narrowing uses runtime checks or type guards to reduce a union type to a more specific type. This lets TypeScript provide safer property and method access.

```ts
function print(value: string | number) {
  if (typeof value === "string") console.log(value.toUpperCase());
}
```

### What are enums?
Enums define a named set of related values. They can be useful in some codebases, although string unions are often preferred for simpler type-safe constants.

```ts
enum Role {
  Admin,
  User
}
```

### What are `as` and type assertions?
A type assertion tells TypeScript how you want a value to be treated at compile time; it does not perform runtime conversion or validation. Assertions should be used when the developer has information the compiler cannot infer.

```ts
const value = input as string;
```

---

## JavaScript Runtime Environments

### What is Node.js?
Node.js is a JavaScript runtime built on the V8 engine that provides server-side APIs and an event-driven I/O model. It allows JavaScript to build servers, CLIs, workers, and backend services.

```js
import fs from "node:fs";
const data = fs.readFileSync("file.txt", "utf8");
```

### What are `fs`, `path`, and `http` in Node.js?
`fs` provides filesystem operations, `path` handles filesystem paths, and `http` provides low-level HTTP server/client functionality. These are Node.js APIs rather than browser APIs.

```js
import path from "node:path";
console.log(path.join("src", "app.js"));
```

### Browser vs Node.js?
Browsers provide APIs such as `window`, DOM, and `document`, while Node.js provides server-side APIs such as `process`, filesystem, and network modules. Both execute JavaScript but have different host environments.

```js
// Browser: window
// Node.js: globalThis / process
```

### What are Deno and Bun?
Deno and Bun are alternative JavaScript runtimes that provide modern tooling and server-side capabilities. For most interviews, awareness of their purpose is enough unless the job specifically uses them.

```js
// Runtime choice depends on project requirements.
```

---

## Concurrency Patterns

### What are Web Workers?
Web Workers run JavaScript away from the browser's main UI thread. They are useful for CPU-intensive tasks that would otherwise block rendering.

```js
const worker = new Worker("worker.js");
worker.postMessage(data);
```

### What are Service Workers?
Service Workers are background browser scripts that can intercept network requests and enable features such as caching, offline support, and push notifications. They operate under strict security and lifecycle rules.

```js
navigator.serviceWorker.register("/sw.js");
```

### What are Shared Workers?
A Shared Worker can be accessed by multiple browsing contexts from the same origin, allowing them to share a worker process and communication channel.

```js
const worker = new SharedWorker("/shared-worker.js");
worker.port.start();
```

### What are `SharedArrayBuffer` and `Atomics` used for?
They allow worker contexts to share memory and coordinate access using atomic operations. This is useful for specialized high-performance concurrent workloads.

```js
Atomics.store(view, 0, 1);
const value = Atomics.load(view, 0);
```

### What are async queues and semaphores?
An async queue controls the order and amount of asynchronous work, while a semaphore limits how many operations can run concurrently. These patterns are useful for rate limiting, worker pools, and controlled resource usage.

```js
// Example concept: allow only 3 requests at once.
const concurrency = 3;
```

---

## JavaScript Pros & Cons — Senior Interview Summary

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