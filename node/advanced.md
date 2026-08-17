# Streams 

### What is a stream?

A stream processes data incrementally instead of requiring the whole dataset in memory. Streams are especially useful for large files, network data, and transformations.

```js
fs.createReadStream('large.log');
```

### What are the types of streams?

The main types are Readable, Writable, Duplex, and Transform. Readable produces data, Writable consumes it, Duplex supports both directions, and Transform changes data as it passes through.

```js
Readable -> Transform -> Writable
```

### Readable vs Writable vs Duplex vs Transform?

Readable streams produce data, Writable streams consume data, Duplex streams can both read and write, and Transform streams are Duplex streams that transform the data between input and output.

```js
input -> Transform -> output
```

### What is backpressure?

Backpressure happens when a data producer is faster than the consumer can process. Streams manage this by controlling how much data is buffered and signaling when the producer should slow down.

```js
fast producer -> buffer -> slow consumer
```

### How does Node.js handle backpressure?

Writable streams return a boolean from `write()` to indicate whether more data should be written immediately. Using `pipe()` or `pipeline()` helps connect streams while respecting flow control and errors.

```js
readable.pipe(writable);
```

### What is pipe()?

`pipe()` connects a readable stream to a writable stream and manages data flow between them. It is a simple way to build streaming pipelines.

```js
readable.pipe(writable);
```

### What is pipeline()?

`pipeline()` connects streams while providing stronger error and completion handling than manually chaining `pipe()` calls. It is preferred for many production pipelines.

```js
await pipeline(readable, transform, writable);
```

### How do streams improve performance?

Streams reduce peak memory usage and allow processing to start before the entire payload is available. They are useful for large files and long-running network transfers.

```js
10 GB file -> chunks -> process
```

### How would you process a 10 GB file without loading it into memory?

Use a readable stream and process the file chunk by chunk. If transformation is required, place a Transform stream between the readable and writable streams.

```js
createReadStream('10gb.dat').pipe(createWriteStream('copy.dat'));
```

---

# EventEmitter

### What is EventEmitter?

EventEmitter is Node.js's built-in event mechanism for registering listeners and emitting named events. Many Node.js APIs use this pattern.

```js
emitter.on('done', handler);
```

### How do on(), once(), emit(), and off() work?

`on()` registers a persistent listener, `once()` runs a listener once, `emit()` triggers an event, and `off()` removes a listener. Managing listeners is important for correctness and memory usage.

```js
emitter.once('ready', init);
```

### How do you create a custom event?

Create an EventEmitter, register a listener for an event name, and call `emit()` when the event occurs.

```js
emitter.on('order', save);
emitter.emit('order', data);
```

### How can EventEmitter cause memory leaks?

If listeners are repeatedly added and never removed, objects captured by those listeners may remain reachable. Use `off()`, lifecycle cleanup, and listener limits where appropriate.

```js
emitter.off('event', handler);
```

### Why is the error event special?

An EventEmitter emitting an `error` event without a listener can cause the Node.js process to terminate. Always handle error events for emitters that can produce them.

```js
emitter.on('error', console.error);
```

---
# Process & Environment

### What is process.env?

`process.env` exposes environment variables to the current process. It is commonly used for configuration, but values are strings and secrets should be managed securely.

```js
const port = Number(process.env.PORT || 3000);
```

### What is process.argv?

`process.argv` contains command-line arguments passed to the Node.js process. It can be used for CLI applications and scripts.

```js
console.log(process.argv.slice(2));
```

### What are stdin, stdout, and stderr?

They are standard input, standard output, and standard error streams. They are useful for CLI programs, piping data, and process orchestration.

```js
process.stdout.write('hello\n');
```

### What are process signals?

Signals such as SIGTERM and SIGINT communicate lifecycle events to a process. Node.js applications can listen for them to perform graceful shutdown.

```js
process.on('SIGTERM', shutdown);
```

### What is process.cwd()?

`process.cwd()` returns the current working directory of the Node.js process. It can differ from the directory containing the current module.

```js
console.log(process.cwd());
```

---

# Child Processes

### What is child_process?

The `child_process` module lets Node.js create and communicate with OS processes. It is useful for external commands and workloads that should be isolated from the main process.

```js
const { spawn } = require('node:child_process');
```

### What is spawn()?

`spawn()` starts a process and exposes its stdout/stderr as streams. It is useful when the child may produce a large or continuous amount of output.

```js
spawn('node', ['worker.js']);
```

### What is exec()?

`exec()` runs a command through a shell and collects its output in memory through a callback. It is convenient for short outputs but requires careful handling of shell injection risks.

```js
exec('node -v', callback);
```

### What is fork()?

`fork()` starts another Node.js process running a specified JavaScript module and provides an IPC channel. It is useful when you want separate Node processes that can communicate.

```js
const child = fork('./worker.js');
```

### spawn vs exec vs fork?

`spawn` is stream-oriented and suitable for long-running output, `exec` is convenient for shell commands with bounded output, and `fork` is specialized for launching another Node.js module with IPC.

```js
spawn -> streams
exec -> shell + buffered output
fork -> Node + IPC
```

---

# Worker Threads & Cluster

### What are Worker Threads?

Worker Threads let Node.js run JavaScript on separate threads, which is useful for CPU-intensive JavaScript that would otherwise block the event loop. They can communicate using messages and transferable/shared data.

```js
new Worker('./cpu.js');
```

### How do you handle CPU-intensive operations?

Do not run long CPU work on the main event-loop thread. Use worker threads, child processes, background jobs, or a separate service depending on isolation and scaling needs.

```js
API -> Worker -> result
```

### Cluster vs Worker Threads?

Cluster creates multiple Node.js processes, giving process-level isolation and separate heaps. Worker Threads create threads inside a process and are mainly useful for CPU-bound JavaScript with lower process-level overhead.

```js
Cluster -> processes
Workers -> threads
```

### Worker Threads vs Child Processes?

Worker Threads share a process and can use transferable/shared memory, making them efficient for CPU-bound JavaScript. Child processes provide stronger isolation and can run arbitrary executables.

```js
Worker -> CPU JS
Child -> isolated process
```

### What is horizontal scaling?

Horizontal scaling adds more application instances and distributes traffic between them. It is common for stateless Node.js APIs behind a load balancer.

```js
Load balancer -> Node 1/2/3
```

### What is vertical scaling?

Vertical scaling gives a single instance more CPU or memory. It can be simple but has hardware limits and does not provide the same redundancy as multiple instances.

```js
2 CPU -> 8 CPU
```

### Horizontal vs vertical scaling?

Horizontal scaling improves capacity and availability by adding instances, while vertical scaling increases resources on one instance. Production systems often combine both based on bottlenecks and cost.

```js
horizontal -> more nodes
vertical -> bigger node
```

### What is cluster?

The cluster module can run multiple Node.js worker processes, often allowing traffic to be handled across CPU cores. Modern deployments may also use containers/process managers instead.

```js
cluster.fork();
```

---