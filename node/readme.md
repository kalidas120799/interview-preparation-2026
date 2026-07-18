## What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment built on Google's V8 engine that allows JavaScript to run outside the browser. It is mainly used for building scalable server-side applications, APIs, real-time applications, and microservices. Node.js follows an event-driven, non-blocking I/O architecture which makes it fast and efficient.

```js
console.log("Hello from Node.js");
```

---

## Why is Node.js Single-Threaded?

Node.js uses a single main thread to execute JavaScript code because context switching between multiple threads is expensive and consumes memory. Instead of creating a thread per request, Node.js relies on the Event Loop and asynchronous operations to handle many requests efficiently. This design makes Node.js lightweight and highly scalable for I/O-intensive applications.

---

## What is the V8 Engine?

V8 is Google's high-performance JavaScript engine written in C++, originally developed for Chrome. It converts JavaScript code directly into machine code instead of interpreting it line by line, resulting in faster execution. Node.js uses V8 to execute JavaScript efficiently on the server side.

```js
let sum = 10 + 20;
console.log(sum);
```

V8 compiles this JavaScript into machine code before execution.

---

## How does Node.js work internally?

Internally, Node.js consists of the V8 Engine, Event Loop, libuv library, thread pool, and callback queue. When an asynchronous operation such as file reading occurs, Node.js delegates it to libuv, allowing the main thread to continue processing other requests. Once the operation completes, the callback is pushed to the event queue and executed by the Event Loop.

**Flow:** Client Request → Event Loop → libuv → Callback Queue → Response

---

## What is Non-Blocking I/O?

Non-blocking I/O means Node.js does not wait for an operation like file reading or database access to finish before executing the next statement. The operation is performed asynchronously, and a callback is executed when the task completes. This improves application performance and responsiveness

```js
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("Reading file...");
```

Output:

```
Reading file...
<File Content>
```

---

## What is Event-Driven Architecture?

Event-driven architecture means the application responds to events such as user requests, file operations, or database responses. Event Emitters generate events, and Event Listeners react to those events when they occur. This makes Node.js ideal for real-time applications like chat systems and notifications.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", () => {
  console.log("Hello!");
});

emitter.emit("greet");
```

---

## What are Global Objects in Node.js?

Global objects are available throughout a Node.js application without importing any module. Common global objects include `global`, `process`, `Buffer`, `console`, `setTimeout`, and `setInterval`. These objects help developers interact with the runtime environment and system resources.

```js
console.log(__dirname);
console.log(__filename);
```

---

## What is the process Object?

The process object is a global object that provides information about the currently running Node.js process. It allows developers to access environment variables, process IDs, memory usage, and command-line arguments. It is commonly used for application monitoring and configuration.

```js
console.log(process.pid);
console.log(process.version);
```

---

## What is REPL?

REPL stands for Read, Evaluate, Print, and Loop. It is an interactive command-line environment provided by Node.js where JavaScript code can be executed immediately without creating files. It is useful for testing code snippets and learning JavaScript concepts.

```
> 10 + 20
30
```

---

## What is Buffer?

A Buffer is a temporary memory area used to store binary data in Node.js. It is mainly used when working with files, streams, images, videos, and network communication because JavaScript traditionally handles text data. Buffers allow efficient manipulation of raw binary data.

```js
const buf = Buffer.from("Hello");
console.log(buf);
```

---

## Difference Between Node.js and Java

Node.js is a JavaScript runtime environment that executes JavaScript using the V8 engine, while Java is a programming language executed by the JVM. Node.js primarily uses a single-threaded event-driven architecture, whereas Java commonly uses multi-threading. Node.js is generally preferred for real-time and I/O-heavy applications, while Java is widely used for enterprise and CPU-intensive applications.

| Node.js | Java |
| ------------------- | -------------------- |
| Runtime Environment | Programming Language |
| Single Threaded | Multi Threaded |
| Fast for I/O Tasks | Good for CPU Tasks |
| Uses V8 Engine | Uses JVM |

---

## What are the Advantages of Node.js?

Node.js offers high performance due to the V8 engine and supports non-blocking asynchronous operations. It allows developers to use JavaScript on both frontend and backend, resulting in faster development and code reuse. Additionally, it handles thousands of concurrent connections efficiently with minimal resource consumption

---

## What are the Limitations of Node.js?

Node.js is not ideal for CPU-intensive tasks because heavy computations can block the event loop and affect all incoming requests. Callback-heavy code may lead to callback hell if not properly managed using Promises or async/await. It also provides limited built-in support for complex multi-threaded processing compared to languages like Java.

---

## When Should You Not Use Node.js?

Node.js should be avoided for applications involving heavy CPU-intensive calculations such as video rendering, image processing, machine learning training, or scientific computations. In such cases, technologies with better multi-threading support like Java, Go, or C++ are usually preferred. Node.js performs best when the workload is primarily I/O-bound rather than computation-heavy.

---

## How Does Node.js Handle Multiple Concurrent Requests?

Node.js handles concurrent requests using the Event Loop and asynchronous APIs instead of creating a new thread for every request. When an I/O operation is initiated, Node.js delegates the task to the operating system or libuv thread pool and immediately continues processing other requests. When the operation completes, the callback is queued and executed, allowing thousands of requests to be processed efficiently

```js
const http = require("http");

http.createServer((req, res) => {
  setTimeout(() => {
    res.end("Response");
  }, 3000);
}).listen(3000);
```

Even while one request waits for 3 seconds, Node.js can continue accepting and processing other incoming requests.

---

## What is a Module in Node.js?

A module is a reusable block of code that encapsulates related functionality and can be imported into other files. Modules help organize code, improve maintainability, and avoid global scope pollution. In Node.js, every file is treated as a separate module by default.

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = add;
```

---

## What are CommonJS Modules?

CommonJS is the default module system used in Node.js. It uses `require()` to import modules and `module.exports` or `exports` to export functionality. Modules are loaded synchronously, making them suitable for server-side applications.

```js
// export
module.exports = greet;

// import
const greet = require('./greet');
```

---

## What are ES Modules?

ES Modules (ESM) are the official JavaScript module system introduced in ES6. They use the `import` and `export` keywords and support static analysis, tree shaking, and asynchronous loading. Modern Node.js supports ES Modules using `.mjs` files or `"type":"module"` in package.json.

```js
// export
export const name = "Kalidas";

// import
import { name } from "./user.js";
```

---

## Difference Between require() and import?

`require()` belongs to CommonJS and loads modules at runtime synchronously. `import` belongs to ES Modules and is statically analyzed before execution, enabling optimizations such as tree shaking. Modern JavaScript projects generally prefer `import`, while older Node.js applications commonly use `require()`.

| require() | import |
| --------------- | --------------------- |
| CommonJS | ES Modules |
| Synchronous | Asynchronous |
| Runtime loading | Compile-time analysis |
| Dynamic | Static |

---

## What is Module Caching?

Node.js caches a module after it is loaded for the first time. If the same module is required again, Node.js returns the cached version instead of reloading it from disk. This improves performance and prevents unnecessary execution of the same module multiple times.

```js
const user1 = require("./user");
const user2 = require("./user");
// Loaded only once
```

---

## How does require() Work Internally?

When `require()` is called, Node.js first resolves the module path and checks whether the module already exists in cache. If cached, it returns the exported object immediately; otherwise it loads, wraps, compiles, executes, and caches the module. Finally, it returns the exported values to the calling file.

**Internal Steps:**

```txt
Resolve Path
  ↓
Check Cache
  ↓
Load Module
  ↓
Compile & Execute
  ↓
Store in Cache
  ↓
Return Exports
```

---

## What are Built-in Modules?

Built-in modules are modules that come pre-installed with Node.js and do not require npm installation. They provide common functionalities such as file handling, HTTP servers, streams, operating system access, and path utilities. Some popular built-in modules are `fs`, `http`, `path`, `os`, and `events`.

```js
const fs = require("fs");
```

---

## How Do You Create Custom Modules?

A custom module is created by writing functionality in one file and exporting it using `module.exports` or `export`. Other files can then import the module and reuse its functionality. This promotes modular and maintainable code architecture.

```js
// utils.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// app.js
const sum = require("./utils");
console.log(sum(10, 20));
```

---

## What is package.json?

`package.json` is the main configuration file of a Node.js project. It contains project metadata such as name, version, scripts, dependencies, entry point, and author details. npm uses this file to manage packages and execute project scripts.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js"
}
```

---

## What is package-lock.json?

`package-lock.json` is automatically generated by npm and stores the exact versions of installed dependencies. It ensures that all developers and environments install the same package versions consistently. This helps avoid issues caused by dependency version changes.

```json
{
  "name": "my-app",
  "lockfileVersion": 3
}
```

---

## What is npm?

npm (Node Package Manager) is the default package manager for Node.js. It allows developers to install, update, remove, and manage third-party packages from the npm registry. It also provides commands for running project scripts and dependency management.

```
npm install express
```

---

## What is npx?

npx is a package runner that comes bundled with npm. It allows you to run packages without globally installing them, making it useful for executing CLI tools directly. This saves system space and avoids maintaining unnecessary global packages.

```
npx create-react-app myapp
```

---

## Difference Between dependencies and devDependencies?

`dependencies` contain packages required for the application to run in production. `devDependencies` contain packages used only during development, testing, or build processes. Production deployments typically install only dependencies, reducing application size.

```json
{
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

| dependencies | devDependencies |
| ------------------------ | ---------------- |
| Production Required | Development Only |
| Installed in Production | Usually Ignored |
| express | nodemon |

---

## What are peerDependencies?

Peer dependencies specify packages that must already exist in the host project. They are commonly used by libraries that need to work with a specific version of another package without installing it themselves. This prevents duplicate package installations and version conflicts.

```json
{
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

A React UI library may require React to be installed by the consuming application.

---

## How Does Semantic Versioning Work?

Semantic Versioning (SemVer) follows the format **MAJOR.MINOR.PATCH**. The PATCH version increases for bug fixes, the MINOR version increases for backward-compatible features, and the MAJOR version increases for breaking changes. This helps developers understand the impact of upgrading a package version.

```txt
1.0.0
│ │ │
│ │ └── PATCH (Bug Fix)
│ └──── MINOR (New Feature)
└────── MAJOR (Breaking Change)
```

**Version Examples:**

```txt
1.0.0 → Initial Release
1.0.1 → Bug Fix
1.1.0 → New Feature
2.0.0 → Breaking Change
```

---

## What is the fs Module?

The `fs` (File System) module is a built-in Node.js module used for working with files and directories. It provides methods to create, read, update, delete, and manage files on the system. It supports both synchronous and asynchronous operations.

```js
const fs = require("fs");
fs.writeFileSync("test.txt", "Hello Node.js");
```

---

## Difference Between readFile() and readFileSync()

`readFile()` reads files asynchronously without blocking the event loop, whereas `readFileSync()` reads files synchronously and blocks execution until the file is fully read. In production applications, asynchronous methods are generally preferred for better performance.

```js
// Async
fs.readFile("test.txt", "utf8", (err, data) => {
  console.log(data);
});

// Sync
const data = fs.readFileSync("test.txt", "utf8");
console.log(data);
```

| readFile() | readFileSync() |
| ------------------- | ----------------------- |
| Asynchronous | Synchronous |
| Non-blocking | Blocking |
| Better Performance | Slower for large files |

---

## What is the path Module?

The `path` module is a built-in Node.js module that helps work with file and directory paths. It provides utilities for joining paths, extracting file extensions, resolving absolute paths, and normalizing path strings. It makes applications platform-independent.

```js
const path = require("path");
console.log(path.join("user", "docs", "test.txt"));
```

Output:

```
user/docs/test.txt
```

---

## What is the os Module?

The `os` module provides information about the operating system where Node.js is running. It can retrieve details such as CPU information, memory usage, hostname, platform, and architecture. This module is useful for monitoring and system-related applications.

```js
const os = require("os");
console.log(os.platform());
console.log(os.cpus().length);
```

---

## What is the http Module?

The `http` module is a built-in Node.js module used to create HTTP servers and clients. It allows applications to receive requests and send responses without requiring external frameworks. Frameworks like Express internally build on top of the http module.

```js
const http = require("http");
```

---

## How Do You Create a Server Using the http Module?

A server is created using `http.createServer()`, which accepts a callback function to handle incoming requests and responses. After creation, the server listens on a specified port using `listen()`. This is the foundation of all Node.js web servers.

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello World");
});
server.listen(3000);
```

Visit:

```
http://localhost:3000
```

---

## What is the crypto Module?

The `crypto` module provides cryptographic functionality such as hashing, encryption, decryption, digital signatures, and random value generation. It is commonly used for password hashing, authentication, and secure data transmission. The module is built into Node.js and does not require installation.

```js
const crypto = require("crypto");
const hash = crypto
  .createHash("sha256")
  .update("password")
  .digest("hex");
console.log(hash);
```

---

## What is the events Module?

The `events` module provides the EventEmitter class, which enables event-driven programming in Node.js. Objects can emit events and other parts of the application can listen and respond to those events. Many core Node.js modules internally use EventEmitter.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User Logged In");
});

emitter.emit("login");
```

---

## What is the stream Module?

Streams allow data to be processed piece by piece instead of loading an entire file into memory. They are ideal for handling large files, video streaming, and network communication efficiently. Streams improve performance and reduce memory consumption.

**Types of Streams:**

* Readable
* Writable
* Duplex
* Transform

```js
const fs = require("fs");
const stream = fs.createReadStream("largeFile.txt");
stream.on("data", chunk => {
  console.log(chunk.toString());
});
```

---

## What is child_process?

The `child_process` module allows Node.js to execute external commands, shell scripts, or other programs in separate processes. It is useful for CPU-intensive tasks, automation scripts, and integration with system tools. Child processes run independently of the main Node.js process.

```js
const { exec } = require("child_process");
exec("dir", (err, stdout) => {
  console.log(stdout);
});
```

---

## What are Worker Threads?

Worker Threads provide true multithreading inside a Node.js application. They allow CPU-intensive tasks to run on separate threads without blocking the main event loop. Workers share memory through SharedArrayBuffer and communicate using messages.

```js
const { Worker } = require("worker_threads");
new Worker("./worker.js");
```

---

## What is the Cluster Module?

The Cluster module enables multiple Node.js processes to share the same server port. It takes advantage of multiple CPU cores by creating worker processes, each with its own event loop and memory space. This improves scalability and performance for web servers.

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
}
```

---

## Difference Between Worker Threads and Child Processes?

Worker Threads run within the same Node.js process and share memory, making communication faster and lightweight. Child Processes are completely separate processes with independent memory and communicate using IPC. Worker Threads are usually preferred for CPU-heavy computations, while Child Processes are useful for running external applications.

| Worker Threads | Child Processes |
| --------------------- | ---------------- |
| Same Process | Separate Process |
| Shared Memory | Separate Memory |
| Lightweight | Heavyweight |
| Faster Communication | Slower IPC |

---

## Difference Between Cluster and Worker Threads?

Cluster creates multiple Node.js processes to utilize multiple CPU cores and handle more incoming requests. Worker Threads create multiple threads inside the same process for parallel computation tasks. Cluster is mainly for scalability, while Worker Threads are mainly for CPU-intensive processing.

| Cluster | Worker Threads |
| --------------------- | ---------------------- |
| Multiple Processes | Multiple Threads |
| Separate Memory | Shared Memory |
| Best for Web Servers | Best for CPU Tasks |
| Uses Multiple Cores | Uses Multiple Threads |

**Example Scenario:**

* **Cluster** → E-commerce API serving 10,000 users.
* **Worker Threads** → Image processing, PDF generation, data analysis.

---

## What is HTTP?

HTTP (HyperText Transfer Protocol) is the communication protocol used between clients (browsers/mobile apps) and servers on the web. It defines how requests are sent and how responses are returned. HTTP is stateless, meaning each request is independent and does not remember previous requests.

```txt
Client → HTTP Request → Server
Client ← HTTP Response ← Server
```

---

## What are HTTP Methods?

HTTP methods define the action a client wants to perform on a resource. The most common methods are GET, POST, PUT, PATCH, DELETE, and OPTIONS. REST APIs heavily rely on these methods to perform CRUD operations.

| Method | Purpose |
| ------ | ---------------------- |
| GET | Fetch Data |
| POST | Create Data |
| PUT | Update Entire Resource |
| PATCH | Partial Update |
| DELETE | Remove Data |

```
GET /users
POST /users
PUT /users/1
DELETE /users/1
```

---

## Difference Between GET and POST?

GET is used to retrieve data from the server and sends parameters in the URL. POST is used to send data to the server and includes the data in the request body. GET requests are generally cacheable, while POST requests are not.

GET

```
GET /users?id=1
```

POST

```
POST /users
{ "name": "Kalidas" }
```

| GET | POST |
| ----------- | ------------- |
| Read Data | Create Data |
| Data in URL | Data in Body |
| Cacheable | Not Cacheable |
| Safe | Not Safe |

---

## Difference Between PUT and PATCH?

PUT replaces the entire resource with the new data provided by the client. PATCH updates only the specified fields without affecting the rest of the resource. PATCH is generally more efficient for partial updates.

PUT

```
{ "name":"John", "age":25 }
```

PATCH

```
{ "age":26 }
```

| PUT | PATCH |
| ------------------- | ------------------------ |
| Full Update | Partial Update |
| Replaces Resource | Updates Selected Fields |
| More Data Transfer | Less Data Transfer |

---

## What are HTTP Status Codes?

HTTP status codes indicate the result of an HTTP request. They help clients understand whether the request succeeded, failed, or requires further action. Status codes are grouped into categories such as 2xx, 3xx, 4xx, and 5xx.

| Code | Meaning |
| ---- | --------------------- |
| 200 | OK |
| 201 | Created |
| 301 | Redirect |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

```js
res.status(200).json({ message: "Success" });
```

---

## What are Request Headers?

Request headers contain additional information sent by the client to the server. They provide metadata such as content type, authentication tokens, accepted formats, and browser information. Servers use headers to process requests correctly.

```
GET /users
Authorization: Bearer token
Content-Type: application/json
```

---

## What are Response Headers?

Response headers contain metadata sent by the server back to the client. They describe the content type, caching policies, cookies, and server information. Browsers use these headers to handle responses properly.

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache
```

---

## What are Cookies?

Cookies are small pieces of data stored in the user's browser by the server. They are commonly used for authentication, session management, and user preferences. The browser automatically sends cookies with future requests to the same domain.

```
Set-Cookie: sessionId=12345
```

---

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls whether a web application can access resources from another origin. An origin consists of protocol, domain, and port. Without proper CORS configuration, browsers block cross-origin requests.

```
Frontend: http://localhost:3000
Backend: http://localhost:5000
Different ports = Different Origins
```

---

## How Does CORS Work?

When a browser makes a cross-origin request, it checks the server's CORS headers. If the server allows the requesting origin, the browser grants access; otherwise, it blocks the request. For some requests, the browser first sends a preflight OPTIONS request.

```
Access-Control-Allow-Origin: http://localhost:3000
```

**Express Example:**

```js
const cors = require("cors");
app.use(cors());
```

---

## What is HTTPS?

HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP that uses SSL/TLS encryption. It protects data transferred between the client and server from interception or tampering. HTTPS is essential for authentication, payments, and sensitive information.

```
HTTP → Plain Text
HTTPS → Encrypted Data
```

Example:

```
http://example.com
https://example.com
```

---

## Explain the Request-Response Lifecycle.

The request-response lifecycle begins when a client sends an HTTP request to a server. The server processes the request, may interact with databases or services, and finally returns an HTTP response. This cycle repeats for every user interaction.

**Flow:**

```txt
Browser
  ↓
HTTP Request
  ↓
Server
  ↓
Database
  ↓
Server
  ↓
HTTP Response
  ↓
Browser
```

```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

---

## What is REST?

REST (Representational State Transfer) is an architectural style for designing APIs. It uses HTTP methods and resources identified by URLs to perform operations. REST APIs are stateless, scalable, and widely used in modern web applications.

```
GET /users
POST /users
GET /users/1
DELETE /users/1
```

**REST Principles:**

```
Stateless
Client-Server
Resource-Based URLs
Uses HTTP Methods
```

---

## Difference Between REST and GraphQL?

REST exposes multiple endpoints for different resources, while GraphQL provides a single endpoint where clients request exactly the data they need. GraphQL reduces over-fetching and under-fetching, whereas REST is simpler and easier to implement.

REST

```
GET /users/1
GET /users/1/orders
```

GraphQL

```graphql
{
  user(id:1){
    name
    orders{
      id
      total
    }
  }
}
```

| REST | GraphQL |
| ----------------------- | -------------------- |
| Multiple Endpoints | Single Endpoint |
| Fixed Data | Flexible Data |
| Over Fetching Possible | Exact Data Fetching |
| Simpler | More Flexible |

---

## How Do You Improve Node.js Performance?

Node.js performance can be improved by using asynchronous operations, caching, streams, load balancing, clustering, Worker Threads, database indexing, and efficient code practices. Avoid blocking the Event Loop and minimize expensive computations on the main thread. Performance optimization helps applications handle more users with lower resource consumption.

**Best Practices:**

```
✅ Use Async APIs
✅ Use Caching
✅ Use Redis
✅ Use Streams
✅ Use Clustering
✅ Use Worker Threads
✅ Optimize Database Queries
```

---

## What is Caching?

Caching is the process of storing frequently accessed data in a fast storage layer so future requests can be served quickly. Instead of repeatedly fetching data from a database, applications retrieve it from memory. This reduces latency and improves application performance.

**Flow:**

```txt
Client
  ↓
Cache
  ↓ (Miss)
Database
Next Request
  ↓
Cache (Hit)
```

---

## What is Redis?

Redis (Remote Dictionary Server) is an in-memory key-value data store commonly used for caching, sessions, real-time analytics, and message queues. Since data is stored in memory rather than disk, Redis operations are extremely fast. It is frequently used with Node.js applications for performance optimization.

```js
const redis = require("redis");
const client = redis.createClient();
```

---

## How Does Redis Improve Performance?

Redis reduces database load by storing frequently requested data in memory. When a request arrives, the application first checks Redis before querying the database. Faster data retrieval results in lower response times and better scalability.

**Without Redis:**

```txt
Request
  ↓
Database
  ↓
Response
```

**With Redis:**

```txt
Request
  ↓
Redis Cache
  ↓
Response
```

```js
await client.set("user:1", JSON.stringify(user));
```

---

## What is Compression Middleware?

Compression middleware reduces the size of HTTP responses before sending them to clients. Smaller responses require less bandwidth and load faster in browsers. Express applications often use the `compression` package for this purpose.

```js
const compression = require("compression");
app.use(compression());
```

**Before Compression:**

```
500 KB Response
```

**After Compression:**

```
100 KB Response
```

---

## What is Load Balancing?

Load balancing distributes incoming requests across multiple servers. It prevents any single server from becoming overloaded and improves availability and fault tolerance. Popular load balancers include Nginx, HAProxy, and AWS Load Balancer.

**Flow:**

```txt
Clients
  ↓
Load Balancer
 ┌─┴─┬─┐
 ↓   ↓ ↓
S1  S2 S3
```

---

## What is Clustering?

Clustering allows Node.js to utilize multiple CPU cores by creating multiple worker processes. Each worker handles incoming requests independently while sharing the same server port. This significantly improves throughput and scalability.

```js
const cluster = require("cluster");
cluster.fork();
```

**Flow:**

```txt
Master
├─ Worker 1
├─ Worker 2
└─ Worker 3
```

---

## What are Worker Threads?

Worker Threads enable true multithreading in Node.js by running heavy computations on separate threads. They prevent CPU-intensive tasks from blocking the Event Loop and impacting other requests. Worker Threads are ideal for image processing, encryption, and large calculations.

```js
const { Worker } = require("worker_threads");
new Worker("./worker.js");
```

---

## How Do Streams Improve Performance?

Streams process data chunk-by-chunk instead of loading an entire file into memory. They reduce memory usage, improve response time, and are well-suited for large files and real-time data transfers. Applications that process videos, logs, or huge files benefit greatly from streams.

**Without Stream:**

```txt
File
  ↓
Load Entire File
  ↓
Process
```

**With Stream:**

```txt
Chunk1
Chunk2
Chunk3
  ↓
Process Continuously
```

---

## What is Memory Optimization?

Memory optimization is the process of reducing unnecessary memory consumption and improving memory utilization. Efficient memory management improves application performance and reduces garbage collection overhead. Good practices include clearing unused objects and using streams instead of loading large datasets.

**Best Practices:**

```
✅ Release Unused Objects
✅ Avoid Global Variables
✅ Use Streams
✅ Optimize Data Structures
✅ Use Caching Carefully
```

---

## What Causes Memory Leaks?

Memory leaks occur when objects remain in memory even though they are no longer needed. Unreleased references, global variables, unclosed timers, large caches, and event listeners are common causes. Over time, memory leaks can crash applications due to excessive memory consumption.

```js
let users = [];
app.get("/", (req, res) => {
  users.push(req.headers);
});
```

Here the array keeps growing indefinitely.

---

## How Do You Detect Memory Leaks?

Memory leaks can be detected using heap snapshots, memory profiling tools, monitoring dashboards, and Node.js inspection tools. Developers analyze memory growth patterns and identify objects that remain in memory unexpectedly. Monitoring memory usage over time is essential in production systems.

```js
console.log(process.memoryUsage());
```

**Tools:**

```
Chrome DevTools
Node Inspector
Heap Snapshot
Clinic.js
PM2 Monitoring
```

---

## What is Horizontal Scaling?

Horizontal scaling means adding more servers or application instances to handle increased traffic. Requests are distributed among multiple machines using a load balancer. This approach improves fault tolerance and scalability.

```txt
1 Server → 5 Servers
Client
  ↓
Load Balancer
  ↓
Server1  Server2  Server3  Server4  Server5
```

---

## What is Vertical Scaling?

Vertical scaling means increasing the resources of a single server such as CPU, RAM, or storage. It is easier to implement than horizontal scaling but has hardware limitations. Most large systems eventually combine both scaling approaches.

```txt
Server
2 CPU → 16 CPU
4 GB RAM → 64 GB RAM
```

| Vertical Scaling | Horizontal Scaling |
| ----------------- | ------------------------ |
| Bigger Server | More Servers |
| Easy Setup | Better Scalability |
| Limited Growth | Nearly Unlimited Growth |

---

## How Do You Profile a Node.js Application?

Profiling analyzes CPU usage, memory consumption, execution time, and bottlenecks within an application. Developers use profiling tools to identify slow code paths and optimize performance. Profiling is essential for troubleshooting production performance issues.

```
node --inspect app.js
```

**Popular Tools:**

```
Chrome DevTools
Node Inspector
Clinic.js
PM2
New Relic
Datadog
```

**CPU Profiling Flow:**

```txt
Application
  ↓
Profiler
  ↓
Find Bottlenecks
  ↓
Optimize Code
```

---

## Explain Node.js Architecture in Detail

Node.js architecture has **V8 Engine**, **Node.js Core APIs**, **C++ bindings**, **libuv**, **Event Loop**, and **Thread Pool**. V8 executes JavaScript, while libuv handles async I/O, event loop, file system, networking, timers, DNS, and thread pool operations. This architecture allows Node.js to run JavaScript on a single main thread but still handle many concurrent requests efficiently

```txt
JS Code → Node Core APIs → C++ Bindings → V8 + libuv → OS
```

---

## Explain Event Loop Phases in Detail

The Event Loop is divided into phases: **Timers**, **Pending Callbacks**, **Idle/Prepare**, **Poll**, **Check**, and **Close Callbacks**. Each phase has its own callback queue, and Node.js executes callbacks phase by phase when the Call Stack is empty. Timers handle `setTimeout`, Poll handles I/O callbacks, Check handles `setImmediate`, and Close handles closed connections

```txt
Timers → Pending → Idle/Prepare → Poll → Check → Close
```

---

## What are Worker Threads?

Worker Threads allow Node.js to run JavaScript code in separate threads for CPU-intensive tasks. They are useful for heavy calculations, image processing, encryption, or data processing without blocking the main Event Loop. Workers can communicate with the main thread using messages and can share memory using `SharedArrayBuffer`
```js
const { Worker } = require("worker_threads");
new Worker("./worker.js");
```

---

## What is the Cluster Module?

The Cluster module allows Node.js to create multiple worker processes that share the same server port. It helps utilize multiple CPU cores because a single Node.js process normally runs on one main thread. Cluster is mainly used to scale HTTP servers and improve request handling capacity.

```js
const cluster = require("cluster");
if (cluster.isPrimary) {
  cluster.fork();
}
```

---

## Difference Between Cluster and Worker Threads

Cluster creates **multiple processes**, and each process has its own memory, Event Loop, and V8 instance. Worker Threads create **multiple threads inside the same process**, and they are better for CPU-heavy calculations. Use Cluster for scaling web servers and Worker Threads for CPU-intensive JavaScript tasks.

```txt
Cluster → Multiple Processes → API Scaling
Worker Threads → Multiple Threads → CPU Tasks
```

---

## What are Child Processes?

Child Processes allow Node.js to run external commands, scripts, or programs in separate processes. They are useful when you want to execute shell commands, run another Node.js file, or perform heavy work outside the main process. Child processes have separate memory and communicate with the parent process using IPC

```js
const { exec } = require("child_process");
exec("node -v", (err, stdout) => {
  console.log(stdout);
});
```

---

## Fork vs Spawn vs Exec

`spawn()` starts a new process and streams output, so it is good for long-running commands or large output. `exec()` runs a command in a shell and buffers the output, so it is good for small command results. `fork()` is a special case of spawn used to create new Node.js processes with IPC communication.

```js
const { spawn, exec, fork } = require("child_process");
spawn("node", ["app.js"]);
exec("node -v", (err, out) => console.log(out));
fork("worker.js");
```

---

## What are Streams Internally?

Streams internally process data in small chunks instead of loading the entire data into memory. They use EventEmitter behavior and emit events like `data`, `end`, `error`, and `finish`. Streams are heavily used in file handling, HTTP requests, compression, and network communication.

```js
const fs = require("fs");
fs.createReadStream("large.txt")
  .on("data", chunk => console.log(chunk));
```

---

## What is Backpressure?

Backpressure happens when a writable stream cannot consume data as fast as a readable stream produces it. Node.js manages this by pausing the readable stream until the writable stream is ready again. This prevents memory overflow and improves stability when processing large files or network data.

```txt
Readable Fast → Writable Slow = Backpressure
```

---

## What is Garbage Collection?

Garbage Collection is the process of automatically freeing memory that is no longer used by the application. In Node.js, V8 manages memory and garbage collection using a generational garbage collector. Short-lived objects are collected frequently, while long-lived objects are moved to old memory space. [\[dev.to\]](https://dev.to/rohith_nag/inside-nodejs-a-deep-dive-into-v8-libuv-the-event-loop-thread-pool-5fcn), [\[letsbuildsolutions.com\]](https://letsbuildsolutions.com/blog/web-engineering/how-node-js-works-internally-the-event-loop-libuv-thread-pool-and-async-io-architecture/)

```txt
Unused Objects → Garbage Collector → Memory Freed
```

---

## How Does Memory Management Work in Node.js?

Node.js memory is mainly managed by V8 using heap memory and stack memory. Stack stores function calls and primitive values, while heap stores objects, arrays, closures, and dynamic data. V8 automatically allocates memory and removes unused objects through Garbage Collection.

```js
const user = { name: "Kalidas" };
// Object stored in heap
```

---

## What Causes Memory Leaks?

Memory leaks happen when unused objects are still referenced and cannot be garbage collected. Common causes are global variables, uncleared timers, growing arrays, unremoved event listeners, closures holding large data, and unlimited caches. Over time, memory usage increases and the application may slow down or crash.

```js
const data = [];
app.get("/", (req, res) => {
  data.push(req.headers); // keeps growing
});
```

---

## How Do You Debug Memory Leaks?

Memory leaks can be debugged using `process.memoryUsage()`, Chrome DevTools heap snapshots, Node inspector, PM2 monitoring, and profiling tools. The main idea is to check whether heap memory keeps increasing continuously after requests finish. Heap snapshots help find objects that are not released from memory.

```js
console.log(process.memoryUsage());
```

```
node --inspect app.js
```

---

## What are Async Hooks?

Async Hooks is a Node.js module used to track asynchronous resources such as Promises, timers, callbacks, file operations, and network requests. It helps understand the lifecycle of async operations from creation to completion. It is mainly used for debugging, tracing, logging, and performance monitoring.

```js
const async_hooks = require("async_hooks");
async_hooks.createHook({
  init(id, type) {
    console.log(id, type);
  }
}).enable();
```

---

## What is process.nextTick Internally?

`process.nextTick()` schedules a callback to run immediately after the current operation finishes and before the Event Loop continues to the next phase. It has higher priority than Promise callbacks and normal Event Loop callbacks. If overused recursively, it can starve the Event Loop and delay I/O operations.

```js
process.nextTick(() => {
  console.log("Next Tick");
});
console.log("Start");
```

Output:

```
Start
Next Tick
```

---

## What is setImmediate Internally?

`setImmediate()` schedules a callback to execute in the **Check phase** of the Event Loop. It runs after the Poll phase, usually after I/O callbacks are processed. It is useful when you want to execute code after the current Event Loop cycle.

```js
setImmediate(() => {
  console.log("Immediate");
});
```

---

## How Does Node.js Interact with libuv?

Node.js interacts with libuv through internal C++ bindings. When JavaScript calls async APIs like file system, DNS, timers, or networking, Node.js delegates the actual work to libuv. After completion, libuv places the callback into the correct queue, and the Event Loop executes it on the main JavaScript thread.
```txt
JavaScript API → C++ Binding → libuv → OS/Thread Pool → Callback Queue
```

---

## What is libuv?

libuv is a C library used by Node.js to provide asynchronous I/O, Event Loop, thread pool, timers, networking, DNS, child processes, pipes, and file system operations. It abstracts OS differences, so Node.js can work consistently on Windows, Linux, and macOS. libuv is one of the main reasons Node.js can handle non-blocking I/O efficiently.

```txt
libuv = Event Loop + Async I/O + Thread Pool + OS Abstraction
```

---

## How Does Thread Pool Work in Node.js?

The libuv thread pool handles operations that cannot be performed asynchronously by the OS, such as file system tasks, DNS lookup, crypto, and compression. By default, libuv uses 4 worker threads, and this can be changed using `UV_THREADPOOL_SIZE`. Once a thread completes the task, the callback is sent back to the Event Loop for execution on the main thread.

```
UV_THREADPOOL_SIZE=8 node app.js
```

```txt
Main Thread → libuv Thread Pool → Task Complete → Callback Queue
```

---

## What Happens Internally When a Request Hits a Node.js Server?

When a request hits a Node.js server, the OS receives the network event and libuv notifies the Event Loop. Node.js executes the registered request handler, and if async work is needed, it delegates it to the OS or thread pool. After the async task completes, the callback runs, response is created, and data is sent back to the client

**Flow:**

```txt
Client Request
  ↓
OS Socket
  ↓
libuv Event Loop
  ↓
Node.js Request Handler
  ↓
Async DB/File/API Work
  ↓
Callback
  ↓
Response Sent
```

```js
const http = require("http");
http.createServer((req, res) => {
  res.end("Hello Node.js");
}).listen(3000);
```
