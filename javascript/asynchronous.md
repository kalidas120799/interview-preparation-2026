## Asynchronous JavaScript 

### What is synchronous vs asynchronous JavaScript?
Synchronous code executes sequentially and waits for each operation to finish, while asynchronous APIs allow work to complete later without blocking the current execution flow. JavaScript coordinates asynchronous work through the runtime and event loop.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A C B
```

### What is callback hell?
Callback hell is deeply nested asynchronous callback code that becomes difficult to read, maintain, and handle for errors. Promises and `async/await` provide cleaner alternatives.

```js
getUser(id, user => {
  getOrders(user, orders => {
    getPayment(orders, payment => {});
  });
});
```

### What is a Promise?
A Promise represents the eventual result of an asynchronous operation and has pending, fulfilled, or rejected states. It lets code handle success and failure through chaining.

```js
const promise = fetch("/api/users");
promise.then(res => res.json()).catch(console.error);
```

### What do `.then()`, `.catch()`, and `.finally()` do?
`then()` handles fulfillment, `catch()` handles rejection, and `finally()` runs after settlement regardless of success or failure. They support readable asynchronous chains.

```js
fetch("/api")
  .then(r => r.json())
  .catch(console.error)
  .finally(() => console.log("done"));
```

### What is `async/await`?
`async/await` provides syntax for consuming Promises in a sequential style. An `async` function always returns a Promise, and `await` pauses that function until the awaited Promise settles.

```js
async function load() {
  const res = await fetch("/api/users");
  return res.json();
}
```

### What is `Promise.all()`?
`Promise.all()` runs multiple Promises concurrently and fulfills when all succeed. It rejects as soon as one Promise rejects.

```js
const [users, orders] = await Promise.all([
  fetch("/users"),
  fetch("/orders")
]);
```

### What is `Promise.allSettled()`?
`Promise.allSettled()` waits for every Promise to finish and returns each result's status. It is useful when one failure should not prevent collecting other results.

```js
const results = await Promise.allSettled([p1, p2, p3]);
```

### What is `Promise.race()`?
`Promise.race()` settles as soon as the first input Promise settles, whether fulfilled or rejected. It is commonly used for timeout patterns.

```js
const result = await Promise.race([request, timeout]);
```

### What is `Promise.any()`?
`Promise.any()` fulfills when the first input Promise fulfills and ignores earlier rejections. It rejects with an `AggregateError` only if every Promise rejects.

```js
const response = await Promise.any([server1(), server2()]);
```

### What are `Promise.resolve()` and `Promise.reject()`?
`Promise.resolve()` creates or adopts a fulfilled Promise, while `Promise.reject()` creates a rejected Promise. They are useful for normalizing values into Promise-based APIs.

```js
Promise.resolve(10).then(console.log);
Promise.reject(new Error("Failed")).catch(console.error);
```

### What is a thenable?
A thenable is an object that has a callable `then` method and can be assimilated by Promise APIs. JavaScript does not require it to be an actual `Promise` instance.

```js
const thenable = {
  then(resolve) { resolve("done"); }
};
Promise.resolve(thenable).then(console.log);
```

### What is `AbortController`?
`AbortController` provides a standard way to signal cancellation to APIs that support an `AbortSignal`, such as `fetch`. It is useful for cancelling stale requests and timeouts.

```js
const controller = new AbortController();
fetch("/api", { signal: controller.signal });
controller.abort();
```

### What are async iterators and `for await...of`?
Async iterators produce values asynchronously, and `for await...of` consumes them one by one. They are useful for streams, paginated data, and asynchronous generators.

```js
async function* numbers() {
  yield 1;
  yield 2;
}
for await (const n of numbers()) console.log(n);
```

---