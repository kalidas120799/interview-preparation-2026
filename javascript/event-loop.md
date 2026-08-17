## Event Loop 

### What is the event loop?
The event loop coordinates JavaScript's call stack with queues of asynchronous callbacks so non-blocking operations can be processed. JavaScript itself runs user code on a single main thread in typical environments.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A C B
```

### What is the call stack?
The call stack stores currently executing function calls. Synchronous JavaScript must finish the current stack work before queued callbacks can execute.

```js
function a() { b(); }
function b() { console.log("B"); }
a();
```

### What are Web APIs?
In browsers, APIs such as timers, DOM events, and network requests are provided by the browser environment rather than the ECMAScript language itself. They interact with the JavaScript event loop.

```js
setTimeout(() => console.log("timer"), 1000);
```

### What are task and microtask queues?
Tasks include things such as timer callbacks and many DOM events, while Promise reactions and `queueMicrotask()` use the microtask queue. Microtasks are generally drained before the next task is processed.

```js
setTimeout(() => console.log("task"), 0);
Promise.resolve().then(() => console.log("microtask"));
// microtask, task
```

### What is `queueMicrotask()`?
`queueMicrotask()` schedules a callback in the microtask queue. It is useful when work should run after the current synchronous code but before the next task.

```js
queueMicrotask(() => console.log("microtask"));
```

### How does `async/await` affect execution order?
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

### What is `requestAnimationFrame()`?
`requestAnimationFrame()` schedules a callback for a browser rendering opportunity, making it suitable for visual updates and animations. Its exact ordering depends on the browser's event-loop and rendering cycle.

```js
requestAnimationFrame(() => {
  element.style.transform = "translateX(10px)";
});
```

### What is `setImmediate()`?
`setImmediate()` is a Node.js API that schedules a callback for the check phase of the Node event loop. It is not a standard browser API.

```js
setImmediate(() => console.log("immediate"));
```

### What is `process.nextTick()`?
`process.nextTick()` schedules a callback in Node.js's next-tick queue, which is processed before the event loop continues to other phases. Excessive use can starve I/O and other queued work.

```js
process.nextTick(() => console.log("next tick"));
```

### What is microtask starvation?
Microtask starvation occurs when continuously adding microtasks prevents the runtime from moving on to tasks, rendering, or I/O. Long or recursive microtask chains can make an application unresponsive.

```js
function loop() {
  queueMicrotask(loop);
}
// loop(); // would starve the event loop
```

### Where does browser rendering fit into the event loop?
Browsers perform rendering at appropriate points between JavaScript work, but the exact scheduling is browser-dependent. Long-running JavaScript can block rendering and make the UI appear frozen.

```js
requestAnimationFrame(() => console.log("before paint opportunity"));
```

### How do you solve event-loop output questions?
First identify synchronous code, then Promise/microtask callbacks, then task callbacks such as timers, while considering environment-specific APIs. Trace the queues rather than guessing based on source order.

```js
console.log(1);
Promise.resolve().then(() => console.log(2));
setTimeout(() => console.log(3), 0);
console.log(4);
// 1 4 2 3
```

---