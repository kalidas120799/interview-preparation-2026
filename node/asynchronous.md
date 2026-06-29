# 1. What is Asynchronous Programming?

Asynchronous programming allows tasks such as file reading, API calls, or database operations to run in the background without blocking the main thread. Instead of waiting for a task to complete, Node.js continues executing other code and handles the result later. This improves performance and responsiveness in applications.

### Example

```js
console.log("Start");

setTimeout(() => {
  console.log("Completed");
}, 2000);

console.log("End");
```

### Output

```
Start
End
Completed
```

---

# 2. What are Callbacks?

A callback is a function passed as an argument to another function and executed after a task completes. Callbacks are commonly used for asynchronous operations like file handling, database queries, and API calls. They allow Node.js to continue execution without waiting for the operation to finish.

### Example

```js
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Kalidas", () => {
  console.log("Callback Executed");
});
```

---

# 3. What is Callback Hell?

Callback Hell occurs when multiple nested callbacks make code difficult to read, maintain, and debug. As applications grow, deeply nested callback structures create a pyramid-like shape often called the "Pyramid of Doom". This reduces code readability and increases complexity.

### Example

```js
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    getPayment(orders.id, (payment) => {
      console.log(payment);
    });
  });
});
```

---

# 4. How Can Callback Hell Be Avoided?

Callback Hell can be avoided using Promises, async/await, modular functions, and proper error handling techniques. These approaches flatten nested structures and make asynchronous code easier to read and maintain. Modern Node.js development mostly uses async/await for cleaner code.

### Example

```js
async function getData() {
  const user = await getUser();
  const orders = await getOrders(user.id);
  const payment = await getPayment(orders.id);
}
```

---

# 5. What are Promises?

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

A Promise has three states:

- Pending
- Fulfilled
- Rejected

It provides `.then()`, `.catch()`, and `.finally()` methods for handling results.

### Example

```js
const promise = new Promise((resolve, reject) => {
  resolve("Success");
});

promise.then((result) => console.log(result));
```

---

# 6. Promise Chaining vs Async/Await

Promise chaining uses multiple `.then()` methods to execute asynchronous tasks sequentially.

Async/await is built on top of Promises and provides a more readable synchronous-looking syntax. Most modern applications prefer async/await because it simplifies error handling and improves code clarity.

## Promise Chaining

```js
fetchUser()
  .then((user) => fetchOrders(user.id))
  .then((orders) => console.log(orders))
  .catch((err) => console.log(err));
```

## Async/Await

```js
try {
  const user = await fetchUser();
  const orders = await fetchOrders(user.id);

  console.log(orders);
} catch (err) {
  console.log(err);
}
```

---

# 7. What is Promise.all()?

`Promise.all()` executes multiple promises in parallel and waits until all of them are successfully resolved.

If any one of the promises rejects, the entire Promise.all() immediately rejects.

It is useful when all results are required before proceeding.

### Example

```js
Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C"),
]).then((result) => console.log(result));
```

### Output

```js
["A", "B", "C"];
```

---

# 8. What is Promise.allSettled()?

`Promise.allSettled()` waits for all promises to complete regardless of whether they are fulfilled or rejected.

It returns the status and result of each promise, making it useful when partial failures are acceptable.

Unlike Promise.all(), it never fails due to a single rejected promise.

### Example

```js
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
]).then((result) => console.log(result));
```

### Output

```js
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Error" },
];
```

---

# 9. What is Promise.race()?

`Promise.race()` returns the result of the first promise that settles, whether it resolves or rejects.

The remaining promises continue executing, but their results are ignored.

It is commonly used for implementing timeouts or selecting the fastest response.

### Example

```js
Promise.race([
  new Promise((r) => setTimeout(() => r("Fast"), 1000)),
  new Promise((r) => setTimeout(() => r("Slow"), 3000)),
]).then(console.log);
```

### Output

```
Fast
```

---

# 10. What is Promise.any()?

`Promise.any()` returns the first successfully fulfilled promise and ignores rejected promises.

It only rejects if all promises fail.

This is useful when multiple sources can provide the same data and only one success is needed.

### Example

```js
Promise.any([
  Promise.reject("Fail"),
  Promise.resolve("Success"),
  Promise.resolve("Another Success"),
]).then(console.log);
```

### Output

```
Success
```

---

# 11. What Happens When a Promise is Rejected?

When a Promise is rejected, control moves to the nearest `.catch()` handler or the surrounding `try...catch` block when using async/await.

If no rejection handler exists, Node.js generates an **Unhandled Promise Rejection** warning or error.

Proper error handling is important to prevent application crashes.

### Example

```js
Promise.reject("Something Wrong").catch((err) => console.log(err));
```

### Output

```
Something Wrong
```

---

# 12. What is EventEmitter?

EventEmitter is a built-in Node.js class used for implementing event-driven programming.

It allows objects to emit events and register listeners that execute when those events occur.

Many core Node.js modules like Streams and HTTP internally use EventEmitter.

### Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User Logged In");
});

emitter.emit("login");
```

---

# 13. How Do You Create Custom Events?

Custom events are created using EventEmitter by defining event listeners with `.on()` and triggering events using `.emit()`.

This enables communication between different parts of an application without tight coupling.

Custom events are commonly used in real-time systems and notifications.

### Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("orderPlaced", (id) => {
  console.log(`Order ${id} Created`);
});

emitter.emit("orderPlaced", 101);
```

### Output

```
Order 101 Created
```

---

# 14. What are Timers in Node.js?

Timers allow code execution after a specified delay or at regular intervals.

Node.js provides:

- `setTimeout()`
- `setInterval()`
- `setImmediate()`

These APIs are handled by the Event Loop and are commonly used for polling, retries, and delayed execution.

### Example

```js
setTimeout(() => {
  console.log("Executed After 2 Seconds");
}, 2000);
```

---

# 15. Difference Between setTimeout() and setInterval()

`setTimeout()` executes a function only once after a specified delay.

`setInterval()` repeatedly executes a function at fixed intervals until it is stopped using `clearInterval()`.

Use `setTimeout` for one-time tasks and `setInterval` for recurring tasks.

## setTimeout()

```js
setTimeout(() => {
  console.log("Runs Once");
}, 1000);
```

## setInterval()

```js
setInterval(() => {
  console.log("Runs Repeatedly");
}, 1000);
```

| setTimeout() | setInterval() |
|--------------|---------------|
| Runs once | Runs repeatedly |
| Single delay | Recurring delay |
| clearTimeout() | clearInterval() |

---