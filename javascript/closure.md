## Closures 

### What is a closure?
A closure is created when a function remembers variables from its lexical outer scope even after the outer function has finished. Closures are useful for private state, factories, callbacks, and memoization.

```js
function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next(); // 1
```

### What is a lexical environment?
A lexical environment stores identifiers and their relationships to outer scopes. A closure keeps access to the relevant lexical environment when the inner function is retained.

```js
function outer() {
  const value = 10;
  return () => value;
}
```

### Why is closure with loops important?
Closures created inside loops can capture variables differently depending on whether `var` or `let` is used. `let` creates a new binding for each loop iteration.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2
```

### How can closures create private variables?
A variable declared inside an outer function cannot be accessed directly from outside, but returned functions can access it. This creates controlled private state.

```js
function bank() {
  let balance = 0;
  return { get: () => balance };
}
```

### What is a function factory?
A function factory returns customized functions that retain configuration through closure. It is useful for creating reusable behavior.

```js
const multiplyBy = n => x => x * n;
const double = multiplyBy(2);
double(5); // 10
```

### How is closure used for memoization?
A memoized function stores previously calculated results in a closed-over cache. Future calls can return cached results instead of repeating expensive work.

```js
function memoize(fn) {
  const cache = new Map();
  return x => cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x);
}
```

### What is a stale closure?
A stale closure happens when a callback retains an older value from a previous render or execution context. This is especially important in React effects, timers, and asynchronous callbacks.

```js
let value = 1;
const log = () => console.log(value);
value = 2;
log(); // 2
```

### What is the `var` + closure + `setTimeout` trap?
With `var`, loop iterations share one function-scoped binding, so callbacks often see the final value after the loop completes. `let` creates per-iteration bindings and avoids this common trap.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3
```
---