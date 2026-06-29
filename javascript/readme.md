# Variables (`var`, `let`, `const`)

Variables store data values in JavaScript.

- `var` is **function-scoped** and can be redeclared.
- `let` is **block-scoped** and can be reassigned.
- `const` is **block-scoped** and cannot be reassigned (objects can still be modified).

Understanding scope and hoisting is essential for interviews.

---

# Data Types

JavaScript supports two categories of data types.

### Primitive Types

- String
- Number
- Boolean
- Null
- Undefined
- BigInt
- Symbol

### Non-Primitive Types

- Object
- Array
- Function

JavaScript is dynamically typed, meaning variable types can change during runtime.

---

# Operators

Operators perform operations on values and variables.

### Types

- Arithmetic
- Comparison
- Logical
- Assignment
- Ternary
- Spread (`...`)
- Rest (`...`)
- Optional Chaining (`?.`)
- Nullish Coalescing (`??`)

Understanding `==` vs `===` is a common interview topic.

---

# Functions

Functions are reusable blocks of code.

### Types

- Function Declaration
- Function Expression
- Arrow Function
- Anonymous Function
- IIFE

Functions are first-class citizens and can be:

- Passed as arguments
- Returned from functions
- Assigned to variables

---

# Scope

Scope determines where variables are accessible.

### Types

- Global Scope
- Function Scope
- Block Scope
- Lexical Scope

---

# Hoisting

Hoisting is JavaScript's behavior of moving declarations to the top of their scope before execution.

- `var` → initialized as `undefined`
- `let` & `const` → Temporal Dead Zone (TDZ)
- Function declarations are completely hoisted.

---

# Closures

A closure allows a function to remember variables from its outer scope even after the outer function has finished executing.

Uses:

- Data Privacy
- Callbacks
- Currying
- React Hooks

---

# Arrays

Arrays store ordered collections of data.

Common methods:

- map()
- filter()
- reduce()
- find()
- findIndex()
- forEach()
- slice()
- splice()
- concat()
- sort()

---

# Objects

Objects store key-value pairs.

Features:

- Dot Notation
- Bracket Notation
- Methods
- Destructuring
- Dynamic Keys

---

# Destructuring

Extract values from arrays or objects into variables.

Supports:

- Default Values
- Nested Destructuring

---

# Spread and Rest Operators

### Spread (`...`)

Expands elements.

Uses:

- Clone Arrays
- Merge Arrays
- Merge Objects

### Rest (`...`)

Collects multiple values.

Uses:

- Function Parameters
- Array Destructuring

---

# Template Literals

Template literals use backticks (`` ` ``).

Features:

- Multiline Strings
- String Interpolation (`${}`)

---

# Type Conversion & Coercion

JavaScript converts values automatically.

### Explicit Conversion

- Number()
- String()
- Boolean()

### Implicit Conversion

Occurs automatically during operations.

Understanding coercion is a favorite interview topic.

---

# Truthy and Falsy Values

Falsy values:

```txt
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy.

---

# DOM Manipulation

The DOM represents an HTML document.

Common methods:

- querySelector()
- getElementById()
- createElement()
- appendChild()
- remove()

---

# Event Handling

Events represent browser or user actions.

Examples:

- click
- input
- keydown
- scroll

Important concepts:

- Event Bubbling
- Event Capturing
- Event Delegation

---

# Callbacks

Callbacks are functions passed as arguments.

Used heavily in asynchronous programming.

Problem:

- Callback Hell

Solutions:

- Promises
- Async/Await

---

# Promises

Promises handle asynchronous operations.

States:

- Pending
- Fulfilled
- Rejected

Methods:

- then()
- catch()
- finally()

Advanced APIs:

- Promise.all()
- Promise.allSettled()
- Promise.race()
- Promise.any()

---

# Async / Await

Cleaner syntax for asynchronous code.

Usually combined with:

```js
try {
} catch (err) {}
```

---

# Event Loop

JavaScript is single-threaded.

The Event Loop manages:

- Call Stack
- Callback Queue
- Microtask Queue

Priority:

```txt
Sync Code
↓

process.nextTick()

↓

Promise

↓

Timers

↓

setImmediate
```

---

# Execution Context

Execution Context contains:

- Variable Environment
- Scope Chain
- this

Types:

- Global Execution Context
- Function Execution Context

---

# this Keyword

The value of `this` depends on how the function is invoked.

Arrow functions inherit `this` from their surrounding scope.

---

# Prototype and Inheritance

JavaScript uses Prototype-based inheritance.

Objects inherit properties from their prototype chain.

Methods:

- Object.create()
- prototype
- __proto__

---

# Classes

Classes are syntactic sugar over prototypes.

Supports:

- Constructors
- Inheritance
- Getters
- Setters

---

# Modules

Modules split code into reusable files.

### CommonJS

```js
require()

module.exports
```

### ES Modules

```js
import

export
```

---

# Error Handling

Methods:

- try
- catch
- finally
- throw

---

# Memory Management

JavaScript automatically manages memory using Garbage Collection.

Concepts:

- Stack Memory
- Heap Memory
- Garbage Collection
- Memory Leaks

---

# Debouncing and Throttling

### Debouncing

Delays execution until user stops triggering events.

Examples:

- Search Box
- Resize

### Throttling

Limits execution frequency.

Examples:

- Scroll
- Mouse Move

---

# Currying

Transforms:

```txt
f(a,b,c)

↓

f(a)(b)(c)
```

Improves:

- Reusability
- Functional Composition

---

# Higher Order Functions

Functions that:

- Accept functions
- Return functions

Examples:

- map()
- filter()
- reduce()

---

# Deep Copy vs Shallow Copy

### Shallow Copy

Copies only the first level.

Examples:

```js
Object.assign()

...

Array.from()
```

### Deep Copy

Copies nested objects.

Examples:

```js
structuredClone()

JSON.parse(JSON.stringify(obj))
```

---

# Local Storage & Session Storage

### Local Storage

- Persistent
- Browser Close → Data Remains

### Session Storage

- Session Only
- Browser Close → Data Removed

---

# Cookies

Cookies store small pieces of data.

Uses:

- Authentication
- Session Management

Types:

- Secure
- HttpOnly
- SameSite

---

# Fetch API & AJAX

Fetch API performs HTTP requests.

Returns Promises.

AJAX updates web pages without refreshing.

---

# ES6+ Features

- let
- const
- Arrow Functions
- Classes
- Modules
- Promises
- Destructuring
- Template Literals
- Spread
- Rest
- Optional Chaining
- Nullish Coalescing

---

# Functional Programming

Principles:

- Pure Functions
- Immutability
- Composition
- Higher Order Functions
- Currying

---

# Web APIs

Browser-provided APIs.

Examples:

- fetch()
- localStorage
- setTimeout()
- Geolocation
- Notification

---

# Single Thread & Concurrency

JavaScript runs on a single thread.

Concurrency is achieved using:

- Event Loop
- Async APIs
- Web Workers

---

# Strict Mode

Enable with:

```js
"use strict";
```

Benefits:

- Prevents unsafe code
- Throws more errors
- Improves security

---

# JavaScript Engine

A JavaScript engine executes JavaScript code.

Popular engines:

- V8 (Chrome, Node.js)
- SpiderMonkey (Firefox)
- JavaScriptCore (Safari)

Responsibilities:

- Parsing
- Compilation
- Optimization
- Garbage Collection

---

# Additional Frequently Asked Topics

## call(), apply(), bind()

Used to control the value of `this`.

---

## Object Methods

- Object.assign()
- Object.freeze()
- Object.seal()
- Object.create()
- Object.keys()
- Object.values()
- Object.entries()

---

## Map vs Object

Comparison of key-value data structures.

---

## Set vs Array

Unique values vs ordered collection.

---

## WeakMap

Garbage-collectable object keys.

---

## WeakSet

Stores weak object references.

---

## JSON

Methods:

```js
JSON.stringify()

JSON.parse()
```

---

# Date

Common methods:

- new Date()
- getTime()
- toISOString()

---

# Regular Expressions (Regex)

Common methods:

- test()
- exec()
- match()
- replace()

Flags:

```txt
g
i
m
```

---

# Primitive vs Reference Types

Primitive:

- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- BigInt

Reference:

- Object
- Array
- Function

---

# Mutable vs Immutable

Mutable:

- Objects
- Arrays

Immutable:

- String
- Number
- Boolean

---

# Object.freeze() vs Object.seal()

| Object.freeze() | Object.seal() |
|-----------------|---------------|
| Cannot Add | Cannot Add |
| Cannot Delete | Cannot Delete |
| Cannot Modify | Can Modify Existing Properties |

---

# Microtask vs Macrotask

### Microtasks

- Promise
- queueMicrotask()
- MutationObserver

### Macrotasks

- setTimeout()
- setInterval()
- setImmediate()

---