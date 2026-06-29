# 1. What is the Event Loop?

The Event Loop is the core mechanism that allows Node.js to perform non-blocking operations despite using a single JavaScript thread.

It continuously checks for pending callbacks and executes them when the Call Stack becomes empty.

This enables Node.js to handle thousands of concurrent requests efficiently.

### Flow

```txt
Call Stack
     ↓
Event Loop
     ↓
Callback Queue / Microtask Queue
     ↓
Execute Callback
```

---

# 2. Explain Event Loop Phases.

The Event Loop operates in multiple phases, each responsible for processing specific types of callbacks.

Node.js moves through these phases repeatedly and executes queued callbacks before moving to the next phase.

### Phases

```txt
1. Timers
2. Pending Callbacks
3. Idle / Prepare
4. Poll
5. Check
6. Close Callbacks
```

### Example

```js
setTimeout(() => console.log("Timer"), 0);

setImmediate(() => console.log("Immediate"));
```

---

# 3. What is the Call Stack?

The Call Stack is a data structure used by the JavaScript engine to keep track of function execution.

Whenever a function is called, it is pushed onto the stack, and when the function completes, it is popped off.

JavaScript executes synchronous code using this Call Stack.

### Example

```js
function one() {
  two();
}

function two() {
  console.log("Hello");
}

one();
```

### Stack

```txt
one()
  ↓
two()
  ↓
console.log()
```

---

# 4. What is the Callback Queue?

The Callback Queue (Task Queue) stores completed asynchronous callback functions waiting to be executed.

When the Call Stack becomes empty, the Event Loop moves callbacks from the queue to the Call Stack.

This mechanism enables asynchronous execution in Node.js.

### Example

```js
setTimeout(() => {
  console.log("Executed");
}, 1000);
```

### After 1 Second

```txt
Callback Queue
      ↓
Call Stack
      ↓
Execute
```

---

# 5. What is the Microtask Queue?

The Microtask Queue stores high-priority asynchronous operations such as Promise callbacks and `process.nextTick()`.

Before processing the Callback Queue, Node.js always clears all pending Microtasks.

This makes Microtasks execute sooner than normal callbacks.

### Example

```js
Promise.resolve().then(() => {
  console.log("Promise");
});
```

---

# 6. Difference Between process.nextTick() and setImmediate()

`process.nextTick()` executes immediately after the current operation completes and before the Event Loop continues.

`setImmediate()` executes during the Check phase of the Event Loop after I/O operations finish.

Therefore, `process.nextTick()` always has higher priority.

### Example

```js
setImmediate(() => console.log("Immediate"));

process.nextTick(() => {
  console.log("Next Tick");
});
```

### Output

```txt
Next Tick
Immediate
```

| process.nextTick() | setImmediate() |
|--------------------|----------------|
| Microtask Queue | Check Phase |
| Higher Priority | Lower Priority |
| Executes First | Executes Later |

---

# 7. Difference Between setTimeout() and setImmediate()

`setTimeout(fn, 0)` schedules execution in the Timers phase.

`setImmediate()` schedules execution in the Check phase.

Their execution order may vary depending on the context, especially inside or outside I/O operations.

Inside I/O callbacks, `setImmediate()` usually executes first.

### Example

```js
setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => {
  console.log("Immediate");
});
```

---

# 8. Execution Order of nextTick, Promise, setTimeout and setImmediate

Node.js executes tasks based on priority.

Execution order:

1. Synchronous Code
2. `process.nextTick()`
3. Promise Microtasks
4. `setTimeout()`
5. `setImmediate()`

This is one of the most frequently asked Node.js interview questions.

### Example

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("NextTick"));

console.log("End");
```

### Output

```txt
Start
End
NextTick
Promise
Timeout
Immediate
```

### Priority Order

```txt
1. Sync Code
2. process.nextTick()
3. Promise.then()
4. setTimeout()
5. setImmediate()
```

---

# 9. How Does Node.js Handle Asynchronous Operations?

Node.js delegates asynchronous operations such as:

- File Access
- Network Requests
- DNS Lookups
- Timers

to **libuv** and the operating system.

Once the operation completes, the callback is placed into the appropriate queue and executed by the Event Loop.

This allows Node.js to continue processing other requests without waiting.

### Example

```js
const fs = require("fs");

fs.readFile("test.txt", () => {
  console.log("File Read");
});

console.log("Continuing...");
```

### Output

```txt
Continuing...
File Read
```

---

# 10. Why is Node.js Considered Non-Blocking?

Node.js is considered non-blocking because it does not wait for I/O operations to finish before executing other code.

Instead, operations are delegated to the operating system or libuv thread pool, and the results are handled asynchronously.

This allows a single thread to handle many concurrent connections efficiently.

### Example

```js
fs.readFile("bigfile.txt", () => {
  console.log("Done");
});

console.log("Running Other Tasks");
```

---

# 11. What are Event Loop Phases?

The Event Loop repeatedly cycles through a series of phases.

Each phase handles a specific type of callback and ensures asynchronous tasks are processed in the correct order.

### Phases

```txt
Timers
   ↓
Pending Callbacks
   ↓
Idle / Prepare
   ↓
Poll
   ↓
Check
   ↓
Close Callbacks
```

### Common Interview Tip

Most interviewers expect you to remember:

```txt
Timers
   ↓
Poll
   ↓
Check
```

---

# 12. What Causes Event Loop Blocking?

Event Loop blocking occurs when long-running synchronous operations prevent the Event Loop from processing other callbacks.

Common causes include:

- Heavy CPU computations
- Large loops
- Synchronous file operations
- Complex calculations

When blocked, all incoming requests must wait.

### Example

```js
for (let i = 0; i < 10000000000; i++) {}

console.log("Done");
```

### During Execution

```txt
Event Loop Blocked
No Requests Processed
```

---

# 13. How Can You Avoid Blocking the Event Loop?

Event Loop blocking can be avoided by using:

- Asynchronous APIs
- Worker Threads
- Streams
- Clustering
- Breaking large computations into smaller chunks

CPU-intensive tasks should be moved to Worker Threads or separate processes.

This keeps the main thread responsive and improves application scalability.

### Example Using Worker Thread

```js
const { Worker } = require("worker_threads");

new Worker("./heavyTask.js");
```

### Best Practices

```txt
✅ Use Async I/O
✅ Use Streams
✅ Use Worker Threads
✅ Use Clustering
✅ Avoid readFileSync()
✅ Avoid Heavy Loops
```