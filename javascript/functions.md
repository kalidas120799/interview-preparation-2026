## Functions

### What is a function declaration vs expression?
A function declaration defines a named function directly, while a function expression stores a function in a variable. Declarations are hoisted differently from expressions.

```js
function add(a, b) { return a + b; }
const multiply = function(a, b) { return a * b; };
```

### What are arrow functions?
Arrow functions provide shorter function syntax and do not create their own `this`. They are especially useful for callbacks and functional operations.

```js
const add = (a, b) => a + b;
```

### What are parameters and arguments?
Parameters are the variables defined in a function declaration, while arguments are the actual values passed during the call. A function can receive fewer or more arguments than its declared parameters.

```js
function greet(name) { return `Hi ${name}`; }
greet("Kalidas"); // "Kalidas" is an argument
```

### What are default parameters?
Default parameters provide fallback values when an argument is `undefined`. They make function APIs simpler and avoid manual default checks.

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}
```

### What are first-class functions?
JavaScript treats functions as values, so they can be assigned to variables, passed as arguments, and returned from other functions. This enables higher-order functions and functional programming.

```js
const fn = () => 10;
function run(callback) { return callback(); }
```

### What is a higher-order function?
A higher-order function accepts another function as an argument, returns a function, or both. Array methods such as `map` and `filter` are common examples.

```js
const doubled = [1, 2, 3].map(x => x * 2);
```

### What is a callback?
A callback is a function passed to another function to be executed later or at a specific point. Callbacks are common in array methods and asynchronous operations.

```js
setTimeout(() => console.log("Done"), 1000);
```

### What is a pure function?
A pure function produces the same output for the same input and does not modify external state. Pure functions are easier to test and reason about.

```js
function add(a, b) {
  return a + b;
}
```

### What is an IIFE?
An IIFE, or Immediately Invoked Function Expression, is a function that is defined and executed immediately. It was traditionally used to create private scope before ES modules became common.

```js
(() => {
  const secret = 42;
})();
```

### What is recursion?
Recursion is when a function calls itself until it reaches a base condition. It is useful for problems such as tree traversal and nested data processing.

```js
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

### What is the `arguments` object?
The `arguments` object contains arguments passed to a traditional function. Arrow functions do not have their own `arguments`, so rest parameters are preferred in modern code.

```js
function sum() {
  return [...arguments].reduce((a, b) => a + b, 0);
}
```

### What is a named function expression?
A named function expression assigns a name to a function expression, which can improve stack traces and allows the function to refer to itself.

```js
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
```

### What is function composition?
Function composition combines smaller functions so the output of one becomes the input of another. It helps build reusable processing pipelines.

```js
const double = x => x * 2;
const addOne = x => x + 1;
const result = addOne(double(3)); // 7
```

### What are `call`, `apply`, and `bind`?
They control the `this` value of a function: `call` takes individual arguments, `apply` takes an array-like argument list, and `bind` returns a new function with `this` fixed.

```js
function greet(msg) { return `${msg}, ${this.name}`; }
greet.call({ name: "Kalidas" }, "Hi");
```

---