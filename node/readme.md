# What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment built on Google's V8 engine that allows JavaScript to run outside the browser.

It is mainly used for building:

- Server-side Applications
- REST APIs
- Real-time Applications
- Microservices

Node.js follows an **event-driven, non-blocking I/O architecture**, making it fast and efficient.

### Example

```js
console.log("Hello from Node.js");
```

---

# Why is Node.js Single-Threaded?

Node.js uses a single main thread to execute JavaScript code because context switching between multiple threads is expensive and consumes memory.

Instead of creating one thread per request, Node.js relies on the **Event Loop** and asynchronous operations to handle many requests efficiently.

This design makes Node.js lightweight and highly scalable for I/O-intensive applications.

---

# What is the V8 Engine?

V8 is Google's high-performance JavaScript engine written in C++ and originally developed for Google Chrome.

It converts JavaScript directly into machine code instead of interpreting it line by line, resulting in faster execution.

Node.js uses the V8 engine to execute JavaScript on the server.

### Example

```js
let sum = 10 + 20;

console.log(sum);
```

V8 compiles this JavaScript into machine code before execution.

---

# How Does Node.js Work Internally?

Internally, Node.js consists of:

- V8 Engine
- Event Loop
- libuv Library
- Thread Pool
- Callback Queue

When an asynchronous operation (such as reading a file) occurs, Node.js delegates it to **libuv**, allowing the main thread to continue processing other requests.

Once the operation completes, the callback is pushed to the Callback Queue and executed by the Event Loop.

### Flow

```txt
Client Request
      ↓
Event Loop
      ↓
libuv
      ↓
Callback Queue
      ↓
Response
```

---

# What is Non-Blocking I/O?

Non-blocking I/O means Node.js does not wait for an operation such as file reading or database access to finish before executing the next statement.

The operation runs asynchronously, and a callback executes once it completes.

This improves application performance and responsiveness.

### Example

```js
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("Reading file...");
```

### Output

```txt
Reading file...

<File Content>
```

---

# What is Event-Driven Architecture?

Event-driven architecture means the application responds to events such as:

- User Requests
- File Operations
- Database Responses

Event Emitters generate events, while Event Listeners respond to those events.

This architecture makes Node.js ideal for chat applications, notifications, and other real-time systems.

### Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", () => {
  console.log("Hello!");
});

emitter.emit("greet");
```

---

# What are Global Objects in Node.js?

Global objects are available throughout a Node.js application without importing any module.

Common global objects include:

- `global`
- `process`
- `Buffer`
- `console`
- `setTimeout()`
- `setInterval()`
- `__dirname`
- `__filename`

These objects help developers interact with the runtime environment and system resources.

### Example

```js
console.log(__dirname);

console.log(__filename);
```

---
# What is the http Module?

The `http` module is a built-in Node.js module used to create HTTP servers and clients.

It allows applications to receive requests and send responses without requiring external frameworks.

Frameworks like Express internally build on top of the `http` module.

### Example

```js
const http = require("http");
```

---

# How Do You Create a Server Using the http Module?

A server is created using `http.createServer()`, which accepts a callback function to handle incoming requests and responses.

After creation, the server listens on a specified port using `listen()`.

This is the foundation of all Node.js web servers.

### Example

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000);
```

### Visit

```txt
http://localhost:3000
```

---

# What is the crypto Module?

The `crypto` module provides cryptographic functionality such as:

- Hashing
- Encryption
- Decryption
- Digital Signatures
- Random Value Generation

It is commonly used for password hashing, authentication, and secure data transmission.

The module is built into Node.js and does not require installation.

### Example

```js
const crypto = require("crypto");

const hash = crypto
  .createHash("sha256")
  .update("password")
  .digest("hex");

console.log(hash);
```

---

# What is the events Module?

The `events` module provides the `EventEmitter` class, which enables event-driven programming in Node.js.

Objects can emit events and other parts of the application can listen and respond to those events.

Many core Node.js modules internally use EventEmitter.

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

# What is the stream Module?

Streams allow data to be processed piece by piece instead of loading an entire file into memory.

They are ideal for:

- Large Files
- Video Streaming
- File Uploads
- Network Communication

Streams improve performance and reduce memory consumption.

### Types of Streams

- Readable
- Writable
- Duplex
- Transform

### Example

```js
const fs = require("fs");

const stream = fs.createReadStream("largeFile.txt");

stream.on("data", (chunk) => {
  console.log(chunk.toString());
});
```

---

# What is child_process?

The `child_process` module allows Node.js to execute external commands, shell scripts, or other programs in separate processes.

It is useful for:

- CPU-intensive Tasks
- Automation Scripts
- Running External Programs

Child processes run independently of the main Node.js process.

### Example

```js
const { exec } = require("child_process");

exec("dir", (err, stdout) => {
  console.log(stdout);
});
```

---

# What are Worker Threads?

Worker Threads provide true multithreading inside a Node.js application.

They allow CPU-intensive tasks to run on separate threads without blocking the main Event Loop.

Workers share memory through `SharedArrayBuffer` and communicate using messages.

### Example

```js
const { Worker } = require("worker_threads");

new Worker("./worker.js");
```

---

# What is the Cluster Module?

The Cluster module enables multiple Node.js processes to share the same server port.

It takes advantage of multiple CPU cores by creating worker processes, each with its own Event Loop and memory space.

This improves scalability and performance for web servers.

### Example

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

# Difference Between Worker Threads and Child Processes

Worker Threads run within the same Node.js process and share memory, making communication faster and lightweight.

Child Processes are completely separate processes with independent memory and communicate using IPC.

Worker Threads are preferred for CPU-heavy computations, while Child Processes are useful for running external applications.

| Worker Threads | Child Processes |
|----------------|-----------------|
| Same Process | Separate Process |
| Shared Memory | Separate Memory |
| Lightweight | Heavyweight |
| Faster Communication | Slower IPC |

---

# Difference Between Cluster and Worker Threads

Cluster creates multiple Node.js processes to utilize multiple CPU cores and handle more incoming requests.

Worker Threads create multiple threads inside the same process for parallel computation tasks.

Cluster is mainly for scalability, while Worker Threads are mainly for CPU-intensive processing.

| Cluster | Worker Threads |
|----------|----------------|
| Multiple Processes | Multiple Threads |
| Separate Memory | Shared Memory |
| Best for Web Servers | Best for CPU Tasks |
| Uses Multiple CPU Cores | Uses Multiple Threads |

### Example Scenarios

**Cluster**

```txt
E-commerce API serving 10,000 users
```

**Worker Threads**

```txt
Image Processing
PDF Generation
Data Analysis
```

---

# What is HTTP?

HTTP (HyperText Transfer Protocol) is the communication protocol used between clients (browsers/mobile apps) and servers on the web.

It defines how requests are sent and how responses are returned.

HTTP is stateless, meaning each request is independent and does not remember previous requests.

### Flow

```txt
Client
   ↓
HTTP Request
   ↓
Server
   ↓
HTTP Response
   ↓
Client
```

---

# What are HTTP Methods?

HTTP methods define the action a client wants to perform on a resource.

REST APIs heavily rely on these methods to perform CRUD operations.

| Method | Purpose |
|---------|---------|
| GET | Fetch Data |
| POST | Create Data |
| PUT | Update Entire Resource |
| PATCH | Partial Update |
| DELETE | Remove Data |

### Examples

```http
GET /users
POST /users
PUT /users/1
DELETE /users/1
```

---

# Difference Between GET and POST

GET is used to retrieve data from the server and sends parameters in the URL.

POST is used to send data to the server and includes the data in the request body.

GET requests are generally cacheable, while POST requests are not.

### GET

```http
GET /users?id=1
```

### POST

```http
POST /users
```

```json
{
  "name": "Kalidas"
}
```

| GET | POST |
|------|------|
| Read Data | Create Data |
| Data in URL | Data in Body |
| Cacheable | Not Cacheable |
| Safe | Not Safe |

---

# Difference Between PUT and PATCH

PUT replaces the entire resource with the new data provided by the client.

PATCH updates only the specified fields without affecting the rest of the resource.

PATCH is generally more efficient for partial updates.

### PUT

```json
{
  "name": "John",
  "age": 25
}
```

### PATCH

```json
{
  "age": 26
}
```

| PUT | PATCH |
|-----|--------|
| Full Update | Partial Update |
| Replaces Resource | Updates Selected Fields |
| More Data Transfer | Less Data Transfer |

---

# What are HTTP Status Codes?

HTTP status codes indicate the result of an HTTP request.

They help clients understand whether the request succeeded, failed, or requires further action.

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 301 | Redirect |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

### Example

```js
res.status(200).json({
  message: "Success",
});
```

---

# What are Request Headers?

Request headers contain additional information sent by the client to the server.

They provide metadata such as:

- Content Type
- Authentication Tokens
- Accepted Formats
- Browser Information

Servers use headers to process requests correctly.


### Example

```http
GET /users

Authorization: Bearer token
Content-Type: application/json
```

# What are Response Headers?

Response headers contain metadata sent by the server back to the client.

They describe:

- Content Type
- Caching Policies
- Cookies
- Server Information

Browsers use these headers to handle responses properly.

### Example

```http
HTTP/1.1 200 OK

Content-Type: application/json
Cache-Control: no-cache
```

---

# What are Cookies?

Cookies are small pieces of data stored in the user's browser by the server.

They are commonly used for:

- Authentication
- Session Management
- User Preferences

The browser automatically sends cookies with future requests to the same domain.

### Example

```http
Set-Cookie: sessionId=12345
```

---

# What is CORS?

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls whether a web application can access resources from another origin.

An origin consists of:

- Protocol
- Domain
- Port

Without proper CORS configuration, browsers block cross-origin requests.

### Example

```txt
Frontend
http://localhost:3000

Backend
http://localhost:5000
```

```txt
Different Ports = Different Origins
```

---

# How Does CORS Work?

When a browser makes a cross-origin request, it checks the server's CORS headers.

If the server allows the requesting origin, the browser grants access.

Otherwise, it blocks the request.

For some requests, the browser first sends a **Preflight OPTIONS** request.

### Header

```http
Access-Control-Allow-Origin: http://localhost:3000
```

### Express Example

```js
const cors = require("cors");

app.use(cors());
```

---

# What is HTTPS?

HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP that uses SSL/TLS encryption.

It protects data transferred between the client and server from interception or tampering.

HTTPS is essential for:

- Authentication
- Payments
- Sensitive Information

### Comparison

```txt
HTTP
Plain Text

HTTPS
Encrypted Data
```

### Example

```txt
http://example.com

https://example.com
```

---

# Explain the Request-Response Lifecycle

The request-response lifecycle begins when a client sends an HTTP request to a server.

The server processes the request, may interact with databases or services, and finally returns an HTTP response.

This cycle repeats for every user interaction.

### Flow

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

### Example

```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

---

# What is REST?

REST (Representational State Transfer) is an architectural style for designing APIs.

It uses HTTP methods and resources identified by URLs to perform operations.

REST APIs are:

- Stateless
- Scalable
- Resource-Based

### Example

```http
GET /users

POST /users

GET /users/1

DELETE /users/1
```

### REST Principles

- Stateless
- Client-Server
- Resource-Based URLs
- Uses HTTP Methods

---

# Difference Between REST and GraphQL

REST exposes multiple endpoints for different resources.

GraphQL provides a single endpoint where clients request exactly the data they need.

GraphQL reduces over-fetching and under-fetching, whereas REST is simpler and easier to implement.

### REST

```http
GET /users/1

GET /users/1/orders
```

### GraphQL

```graphql
{
  user(id: 1) {
    name
    orders {
      id
      total
    }
  }
}
```

| REST | GraphQL |
|------|----------|
| Multiple Endpoints | Single Endpoint |
| Fixed Data | Flexible Data |
| Over Fetching Possible | Exact Data Fetching |
| Simpler | More Flexible |

---

# How Do You Improve Node.js Performance?

Node.js performance can be improved by using:

- Asynchronous APIs
- Caching
- Redis
- Streams
- Clustering
- Worker Threads
- Database Indexing
- Efficient Code Practices

Avoid blocking the Event Loop and minimize expensive computations on the main thread.

### Best Practices

```txt
✅ Use Async APIs
✅ Use Caching
✅ Use Redis
✅ Use Streams
✅ Use Clustering
✅ Use Worker Threads
✅ Optimize Database Queries
```

---

# What is Caching?

Caching is the process of storing frequently accessed data in a fast storage layer so future requests can be served quickly.

Instead of repeatedly fetching data from a database, applications retrieve it from memory.

This reduces latency and improves performance.

### Flow

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

# What is Redis?

Redis (Remote Dictionary Server) is an in-memory key-value data store commonly used for:

- Caching
- Sessions
- Real-time Analytics
- Message Queues

Since data is stored in memory rather than disk, Redis operations are extremely fast.

### Example

```js
const redis = require("redis");

const client = redis.createClient();
```

---

# How Does Redis Improve Performance?

Redis reduces database load by storing frequently requested data in memory.

When a request arrives, the application first checks Redis before querying the database.

Faster data retrieval results in lower response times and better scalability.

### Without Redis

```txt
Request
   ↓
Database
   ↓
Response
```

### With Redis

```txt
Request
   ↓
Redis Cache
   ↓
Response
```

### Example

```js
await client.set(
  "user:1",
  JSON.stringify(user)
);
```

---

# What is Compression Middleware?

Compression middleware reduces the size of HTTP responses before sending them to clients.

Smaller responses require less bandwidth and load faster in browsers.

Express applications often use the `compression` package.

### Example

```js
const compression = require("compression");

app.use(compression());
```

### Before Compression

```txt
500 KB Response
```

### After Compression

```txt
100 KB Response
```

---

# What is Load Balancing?

Load balancing distributes incoming requests across multiple servers.

It prevents any single server from becoming overloaded and improves:

- Availability
- Fault Tolerance
- Scalability

Popular load balancers include:

- Nginx
- HAProxy
- AWS Load Balancer

### Flow

```txt
Clients
   ↓
Load Balancer
 ┌──┼──┐
 ↓  ↓  ↓
S1 S2 S3
```

---

# What is Clustering?

Clustering allows Node.js to utilize multiple CPU cores by creating multiple worker processes.

Each worker handles incoming requests independently while sharing the same server port.

This significantly improves throughput and scalability.

### Example

```js
const cluster = require("cluster");

cluster.fork();
```

### Flow

```txt
Master
 ├── Worker 1
 ├── Worker 2
 └── Worker 3
```

---

# What are Worker Threads?

Worker Threads enable true multithreading in Node.js by running heavy computations on separate threads.

They prevent CPU-intensive tasks from blocking the Event Loop and impacting other requests.

Worker Threads are ideal for:

- Image Processing
- Encryption
- Large Calculations

### Example

```js
const { Worker } = require("worker_threads");

new Worker("./worker.js");
```

---

# How Do Streams Improve Performance?

Streams process data chunk-by-chunk instead of loading an entire file into memory.

They:

- Reduce Memory Usage
- Improve Response Time
- Handle Large Files Efficiently

Applications processing videos, logs, or huge files benefit greatly from streams.

### Without Stream

```txt
File
   ↓
Load Entire File
   ↓
Process
```

### With Stream

```txt
Chunk 1
Chunk 2
Chunk 3
   ↓
Process Continuously
```

---

# What is Memory Optimization?

Memory optimization is the process of reducing unnecessary memory consumption and improving memory utilization.

Efficient memory management improves performance and reduces garbage collection overhead.

### Best Practices

```txt
✅ Release Unused Objects
✅ Avoid Global Variables
✅ Use Streams
✅ Optimize Data Structures
✅ Use Caching Carefully
```

---

# What Causes Memory Leaks?

Memory leaks occur when objects remain in memory even though they are no longer needed.

Common causes include:

- Unreleased References
- Global Variables
- Unclosed Timers
- Large Caches
- Event Listeners

Over time, memory leaks can crash applications due to excessive memory consumption.

### Example

```js
let users = [];

app.get("/", (req, res) => {
  users.push(req.headers);
});
```

Here, the `users` array keeps growing indefinitely, causing increased memory usage.

# What is the process Object?

The `process` object is a global object that provides information about the currently running Node.js process.

It allows developers to access:

- Environment Variables
- Process ID
- Memory Usage
- Command-line Arguments

It is commonly used for application monitoring and configuration.

### Example

```js
console.log(process.pid);

console.log(process.version);
```

---

# What is REPL?

REPL stands for **Read, Evaluate, Print, Loop**.

It is an interactive command-line environment provided by Node.js where JavaScript code can be executed immediately without creating files.

It is useful for:

- Testing code snippets
- Learning JavaScript
- Debugging

### Example

```txt
> 10 + 20

30
```

---

# What is Buffer?

A Buffer is a temporary memory area used to store binary data in Node.js.

It is mainly used when working with:

- Files
- Streams
- Images
- Videos
- Network Communication

Buffers allow efficient manipulation of raw binary data.

### Example

```js
const buf = Buffer.from("Hello");

console.log(buf);
```

---

# Difference Between Node.js and Java

Node.js is a JavaScript runtime environment that executes JavaScript using the V8 engine, while Java is a programming language executed by the JVM.

Node.js primarily uses a single-threaded event-driven architecture, whereas Java commonly uses multi-threading.

Node.js is generally preferred for real-time and I/O-intensive applications, while Java is widely used for enterprise and CPU-intensive applications.

| Node.js | Java |
|----------|------|
| Runtime Environment | Programming Language |
| Single Threaded | Multi Threaded |
| Fast for I/O Tasks | Good for CPU Tasks |
| Uses V8 Engine | Uses JVM |

---

# What are the Advantages of Node.js?

Node.js offers high performance due to the V8 engine and supports non-blocking asynchronous operations.

It allows developers to use JavaScript on both frontend and backend, resulting in faster development and code reuse.

Additionally, it handles thousands of concurrent connections efficiently with minimal resource consumption.

### Advantages

- High Performance
- Non-blocking I/O
- Event-driven Architecture
- JavaScript on Frontend & Backend
- Huge npm Ecosystem
- Excellent for Real-time Applications
- Highly Scalable

---

# What are the Limitations of Node.js?

Node.js is not ideal for CPU-intensive tasks because heavy computations can block the Event Loop and affect all incoming requests.

Callback-heavy code may lead to callback hell if not properly managed using Promises or async/await.

It also provides limited built-in support for complex multi-threaded processing compared to languages like Java.

---

# When Should You Not Use Node.js?

Node.js should be avoided for applications involving heavy CPU-intensive calculations such as:

- Video Rendering
- Image Processing
- Machine Learning Training
- Scientific Computations

Technologies like Java, Go, or C++ are generally better choices for these workloads.

Node.js performs best when the workload is primarily I/O-bound rather than computation-heavy.

---

# How Does Node.js Handle Multiple Concurrent Requests?

Node.js handles concurrent requests using the Event Loop and asynchronous APIs instead of creating a new thread for every request.

When an I/O operation is initiated, Node.js delegates the task to the operating system or libuv thread pool and immediately continues processing other requests.

When the operation completes, the callback is queued and executed.

This allows Node.js to efficiently handle thousands of concurrent requests.

### Example

```js
const http = require("http");

http
  .createServer((req, res) => {
    setTimeout(() => {
      res.end("Response");
    }, 3000);
  })
  .listen(3000);
```

**Even while one request waits for 3 seconds, Node.js continues accepting and processing other incoming requests.**

---

# What is a Module in Node.js?

A module is a reusable block of code that encapsulates related functionality and can be imported into other files.

Modules help:

- Organize Code
- Improve Maintainability
- Avoid Global Scope Pollution

In Node.js, every file is treated as a separate module by default.

### Example

```js
// math.js

function add(a, b) {
  return a + b;
}

module.exports = add;
```

---

# What are CommonJS Modules?

CommonJS is the default module system used in Node.js.

It uses:

- `require()` for importing modules
- `module.exports` or `exports` for exporting functionality

Modules are loaded synchronously, making them suitable for server-side applications.

### Export

```js
module.exports = greet;
```

### Import

```js
const greet = require("./greet");
```

---

# What are ES Modules?

ES Modules (ESM) are the official JavaScript module system introduced in ES6.

They use:

- `import`
- `export`

They support:

- Static Analysis
- Tree Shaking
- Asynchronous Loading

Modern Node.js supports ES Modules using `.mjs` files or `"type": "module"` in `package.json`.

### Export

```js
export const name = "Kalidas";
```

### Import

```js
import { name } from "./user.js";
```

---

# Difference Between require() and import

`require()` belongs to CommonJS, whereas `import` belongs to ES Modules.

| require() | import |
|------------|---------|
| CommonJS | ES Modules |
| Synchronous | Asynchronous |
| Runtime Loading | Compile-time Analysis |
| Dynamic | Static |

---

# What is Module Caching?

Node.js caches a module after it is loaded for the first time.

If the same module is required again, Node.js returns the cached version instead of reloading it from disk.

This improves performance and avoids unnecessary execution.

### Example

```js
const user1 = require("./user");

const user2 = require("./user");

// Loaded only once
```

---

# How Does require() Work Internally?

When `require()` is called, Node.js performs the following steps:

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

# What are Built-in Modules?

Built-in modules come pre-installed with Node.js and do not require npm installation.

Popular built-in modules include:

- fs
- http
- path
- os
- events
- crypto
- stream

### Example

```js
const fs = require("fs");
```

---

# How Do You Create Custom Modules?

A custom module is created by writing functionality in one file and exporting it.

Other files can import and reuse the functionality.

### utils.js

```js
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

### app.js

```js
const sum = require("./utils");

console.log(sum(10, 20));
```

---

# What is package.json?

`package.json` is the main configuration file of a Node.js project.

It contains:

- Project Name
- Version
- Scripts
- Dependencies
- Entry Point
- Author Information

npm uses this file to manage packages and execute project scripts.

### Example

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js"
}
```

---

# What is package-lock.json?

`package-lock.json` is automatically generated by npm.

It stores the exact versions of installed dependencies.

This ensures all developers install identical package versions.

### Example

```json
{
  "name": "my-app",
  "lockfileVersion": 3
}
```

---

# What is npm?

npm (Node Package Manager) is the default package manager for Node.js.

It allows developers to:

- Install Packages
- Update Packages
- Remove Packages
- Manage Dependencies
- Run Scripts

### Example

```bash
npm install express
```

---

# What is npx?

npx is a package runner that comes bundled with npm.

It allows you to execute packages without globally installing them.

### Example

```bash
npx create-react-app myapp
```

---

# Difference Between dependencies and devDependencies

`dependencies` are required in production.

`devDependencies` are needed only during development.

### Example

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
|--------------|-----------------|
| Production Required | Development Only |
| Installed in Production | Usually Ignored |
| express | nodemon |

---

# What are peerDependencies?

Peer dependencies specify packages that must already exist in the host project.

They are commonly used by libraries that depend on a specific version of another package.

This avoids duplicate installations and version conflicts.

### Example

```json
{
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

A React UI library may require React to be installed by the consuming application.

---

# How Does Semantic Versioning Work?

Semantic Versioning (SemVer) follows the format:

```txt
MAJOR.MINOR.PATCH
```

```txt
1.0.0
│ │ │
│ │ └── PATCH (Bug Fix)
│ └──── MINOR (New Feature)
└────── MAJOR (Breaking Change)
```

### Version Examples

```txt
1.0.0 → Initial Release

1.0.1 → Bug Fix

1.1.0 → New Feature

2.0.0 → Breaking Change
```

---
# How Do You Detect Memory Leaks?

Memory leaks can be detected using:

- Heap Snapshots
- Memory Profiling Tools
- Monitoring Dashboards
- Node.js Inspection Tools

Developers analyze memory growth patterns and identify objects that remain in memory unexpectedly.

Monitoring memory usage over time is essential in production systems.

### Example

```js
console.log(process.memoryUsage());
```

### Popular Tools

- Chrome DevTools
- Node Inspector
- Heap Snapshot
- Clinic.js
- PM2 Monitoring

---

# What is Horizontal Scaling?

Horizontal scaling means adding more servers or application instances to handle increased traffic.

Requests are distributed among multiple machines using a load balancer.

This approach improves:

- Scalability
- Fault Tolerance
- High Availability

### Flow

```txt
1 Server
    ↓
5 Servers

Client
   ↓
Load Balancer
 ┌──┼──┬──┬──┐
 ↓  ↓  ↓  ↓  ↓
S1 S2 S3 S4 S5
```

---

# What is Vertical Scaling?

Vertical scaling means increasing the resources of a single server such as:

- CPU
- RAM
- Storage

It is easier to implement than horizontal scaling but has hardware limitations.

Most enterprise applications eventually combine both vertical and horizontal scaling.

### Example

```txt
2 CPU  → 16 CPU

4 GB RAM → 64 GB RAM
```

| Vertical Scaling | Horizontal Scaling |
|------------------|--------------------|
| Bigger Server | More Servers |
| Easy Setup | Better Scalability |
| Limited Growth | Nearly Unlimited Growth |

---

# How Do You Profile a Node.js Application?

Profiling analyzes:

- CPU Usage
- Memory Consumption
- Execution Time
- Performance Bottlenecks

Developers use profiling tools to identify slow code paths and optimize performance.

Profiling is essential for troubleshooting production performance issues.

### Example

```bash
node --inspect app.js
```

### Popular Tools

- Chrome DevTools
- Node Inspector
- Clinic.js
- PM2
- New Relic
- Datadog

### CPU Profiling Flow

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

# Explain Node.js Architecture in Detail

Node.js architecture consists of:

- V8 Engine
- Node.js Core APIs
- C++ Bindings
- libuv
- Event Loop
- Thread Pool

V8 executes JavaScript, while libuv handles asynchronous I/O operations such as:

- File System
- Networking
- Timers
- DNS
- Thread Pool

This architecture allows Node.js to run JavaScript on a single main thread while efficiently handling thousands of concurrent requests.

### Architecture Flow

```txt
JavaScript Code
       ↓
Node.js Core APIs
       ↓
C++ Bindings
       ↓
V8 Engine + libuv
       ↓
Operating System
```

---

# Explain Event Loop Phases in Detail

The Event Loop is divided into multiple phases.

Each phase has its own callback queue, and Node.js executes callbacks phase by phase whenever the Call Stack becomes empty.

### Event Loop Phases

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

### Responsibilities

| Phase | Purpose |
|--------|---------|
| Timers | Executes `setTimeout()` and `setInterval()` callbacks |
| Pending Callbacks | Executes deferred I/O callbacks |
| Idle / Prepare | Internal Node.js operations |
| Poll | Processes I/O callbacks |
| Check | Executes `setImmediate()` callbacks |
| Close | Executes close event callbacks |

---

# What are Worker Threads?

Worker Threads provide true multithreading inside Node.js.

They are mainly used for CPU-intensive tasks such as:

- Image Processing
- Encryption
- Compression
- Large Calculations

Worker Threads communicate using messages and can share memory using `SharedArrayBuffer`.

### Example

```js
const { Worker } = require("worker_threads");

new Worker("./worker.js");
```

---

# What is the Cluster Module?

The Cluster module creates multiple worker processes that share the same server port.

Each worker has:

- Its own Event Loop
- Its own Memory
- Its own V8 Instance

Cluster helps utilize multiple CPU cores and improves request handling capacity.

### Example

```js
const cluster = require("cluster");

if (cluster.isPrimary) {
  cluster.fork();
}
```

---

# Difference Between Cluster and Worker Threads

Cluster creates multiple processes.

Worker Threads create multiple threads inside the same process.

Cluster is mainly used for scaling web servers, whereas Worker Threads are used for CPU-intensive JavaScript tasks.

| Cluster | Worker Threads |
|----------|----------------|
| Multiple Processes | Multiple Threads |
| Separate Memory | Shared Memory |
| API Scaling | CPU-intensive Tasks |
| Separate Event Loop | Same Process |

### Usage

```txt
Cluster
      ↓
API Scaling

Worker Threads
      ↓
CPU-heavy Tasks
```

---

# What are Child Processes?

Child Processes allow Node.js to execute external commands, scripts, or programs in separate processes.

They are useful for:

- Shell Commands
- External Programs
- Running Another Node.js Process

Each child process has its own memory and communicates using IPC.

### Example

```js
const { exec } = require("child_process");

exec("node -v", (err, stdout) => {
  console.log(stdout);
});
```

---

# Difference Between spawn(), exec(), and fork()

Node.js provides three common ways to create child processes.

### spawn()

Starts a new process and streams output.

Best for:

- Long-running Commands
- Large Output

### exec()

Runs a command inside a shell and buffers the output.

Best for:

- Small Command Results

### fork()

Creates a new Node.js process with built-in IPC communication.

Best for:

- Running Another Node.js File

### Example

```js
const { spawn, exec, fork } = require("child_process");

spawn("node", ["app.js"]);

exec("node -v", (err, output) => {
  console.log(output);
});

fork("worker.js");
```

| Method | Best Use |
|---------|----------|
| spawn() | Large Output / Long-running Tasks |
| exec() | Small Commands |
| fork() | Another Node.js Process |

---

# What are Streams Internally?

Streams process data in small chunks instead of loading the entire data into memory.

Internally, streams use EventEmitter and emit events such as:

- `data`
- `end`
- `error`
- `finish`

Streams are heavily used in:

- File Handling
- HTTP Requests
- Compression
- Network Communication

### Example

```js
const fs = require("fs");

fs.createReadStream("large.txt")
  .on("data", (chunk) => {
    console.log(chunk);
  });
```

---

# What is Backpressure?

Backpressure occurs when a writable stream cannot consume data as fast as a readable stream produces it.

Node.js automatically pauses the readable stream until the writable stream catches up.

This prevents:

- Memory Overflow
- High Memory Usage
- Application Crashes

### Flow

```txt
Readable Stream (Fast)
          ↓↓↓↓↓↓↓↓

Writable Stream (Slow)

        Backpressure
             ↓
Readable Stream Paused
             ↓
Writable Stream Catches Up
             ↓
Readable Stream Resumes
```

# What is Garbage Collection?

Garbage Collection (GC) is the process of automatically freeing memory that is no longer used by the application.

In Node.js, the V8 engine manages memory using a **Generational Garbage Collector**.

- Short-lived objects are collected frequently.
- Long-lived objects are moved to the **Old Generation** memory space.

This automatic memory management helps prevent memory leaks and improves application performance.

### Flow

```txt
Unused Objects
       ↓
Garbage Collector
       ↓
Memory Freed
```

---

# How Does Memory Management Work in Node.js?

Node.js memory is managed by the V8 engine using:

- Stack Memory
- Heap Memory

**Stack Memory** stores:

- Function Calls
- Primitive Values

**Heap Memory** stores:

- Objects
- Arrays
- Closures
- Dynamic Data

V8 automatically allocates memory and removes unused objects through Garbage Collection.

### Example

```js
const user = {
  name: "Kalidas",
};

// Object stored in Heap Memory
```

### Memory Layout

```txt
Application
      │
      ├── Stack
      │     ├── Function Calls
      │     └── Primitive Values
      │
      └── Heap
            ├── Objects
            ├── Arrays
            └── Closures
```

---

# What Causes Memory Leaks?

Memory leaks occur when unused objects are still referenced and therefore cannot be garbage collected.

Common causes include:

- Global Variables
- Uncleared Timers
- Growing Arrays
- Unremoved Event Listeners
- Closures Holding Large Objects
- Unlimited Caches

Over time, memory usage keeps increasing, causing slower performance or application crashes.

### Example

```js
const data = [];

app.get("/", (req, res) => {
  data.push(req.headers);
});
```

Here, the array grows indefinitely because nothing removes old entries.

---

# How Do You Debug Memory Leaks?

Memory leaks can be detected using:

- `process.memoryUsage()`
- Chrome DevTools Heap Snapshots
- Node Inspector
- PM2 Monitoring
- Profiling Tools

The main goal is to determine whether heap memory continuously grows after requests complete.

Heap snapshots help identify objects that are not released from memory.

### Example

```js
console.log(process.memoryUsage());
```

```bash
node --inspect app.js
```

---

# What are Async Hooks?

`async_hooks` is a built-in Node.js module used to track asynchronous resources such as:

- Promises
- Timers
- File Operations
- Network Requests
- Callbacks

It helps developers understand the lifecycle of asynchronous operations.

Common use cases include:

- Debugging
- Tracing
- Logging
- Performance Monitoring

### Example

```js
const async_hooks = require("async_hooks");

async_hooks
  .createHook({
    init(id, type) {
      console.log(id, type);
    },
  })
  .enable();
```

---

# What is process.nextTick() Internally?

`process.nextTick()` schedules a callback to execute immediately after the current operation completes.

It executes **before**:

- Promise Callbacks
- Timers
- Event Loop Phases

Because of its high priority, excessive recursive use can starve the Event Loop and delay I/O operations.

### Example

```js
process.nextTick(() => {
  console.log("Next Tick");
});

console.log("Start");
```

### Output

```txt
Start
Next Tick
```

---

# What is setImmediate() Internally?

`setImmediate()` schedules a callback during the **Check** phase of the Event Loop.

It runs after the Poll phase, usually after I/O callbacks have completed.

It is useful when code should execute after the current Event Loop iteration.

### Example

```js
setImmediate(() => {
  console.log("Immediate");
});
```

---

# How Does Node.js Interact with libuv?

Node.js communicates with **libuv** through internal C++ bindings.

Whenever JavaScript calls asynchronous APIs such as:

- File System
- DNS
- Timers
- Networking

Node.js delegates the actual work to libuv.

Once completed, libuv places the callback into the appropriate queue, and the Event Loop executes it on the main JavaScript thread.

### Flow

```txt
JavaScript API
        ↓
C++ Bindings
        ↓
libuv
        ↓
Operating System / Thread Pool
        ↓
Callback Queue
        ↓
Event Loop
```

---

# What is libuv?

libuv is a C library used internally by Node.js.

It provides:

- Event Loop
- Asynchronous I/O
- Thread Pool
- Timers
- Networking
- DNS
- Child Processes
- File System APIs

It also abstracts operating system differences, allowing Node.js applications to run consistently on:

- Windows
- Linux
- macOS

### Summary

```txt
libuv
   =
Event Loop
+ Async I/O
+ Thread Pool
+ OS Abstraction
```

---

# How Does the Thread Pool Work in Node.js?

The libuv Thread Pool handles operations that cannot be performed asynchronously by the operating system.

Typical thread pool tasks include:

- File System Operations
- DNS Lookup
- Crypto Operations
- Compression

By default, libuv uses **4 worker threads**.

This can be increased using:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

Once a worker thread finishes, the callback is placed into the Callback Queue and executed by the Event Loop.

### Flow

```txt
Main Thread
      ↓
libuv Thread Pool
      ↓
Task Complete
      ↓
Callback Queue
      ↓
Event Loop
```

---

# What Happens Internally When a Request Hits a Node.js Server?

When a request reaches a Node.js server:

1. The Operating System receives the network request.
2. libuv detects the socket event.
3. The Event Loop invokes the registered request handler.
4. If asynchronous work is required, Node.js delegates it to the OS or Thread Pool.
5. After completion, the callback is queued.
6. The Event Loop executes the callback.
7. The response is sent back to the client.

### Internal Flow

```txt
Client Request
       ↓
OS Socket
       ↓
libuv Event Loop
       ↓
Node.js Request Handler
       ↓
Async DB / File / API Work
       ↓
Callback Queue
       ↓
Response Sent
```

### Example

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello Node.js");
  })
  .listen(3000);
```

--- 