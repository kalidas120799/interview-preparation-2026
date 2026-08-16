# Node.js Complete Interview Q&A

---

# 1. Node.js Fundamentals

### What is Node.js?

Node.js is a JavaScript runtime built on Chrome’s V8 engine that lets JavaScript run outside the browser. It is designed around an event-driven, non-blocking I/O model, making it well suited for backend APIs and I/O-heavy applications.

```js
console.log(process.version);
```

### Why is Node.js suitable for I/O-heavy applications?

Node.js does not wait synchronously for most I/O operations such as database, filesystem, or network work. While an operation is waiting, the event loop can continue handling other requests, which gives good concurrency for I/O-heavy workloads.

```js
app.get('/users', async (req, res) => res.json(await getUsers()));
```

### Is Node.js single-threaded?

JavaScript execution for a Node.js process normally runs on a single main event-loop thread. However, Node.js can use libuv's thread pool, worker threads, and child processes for work that should not run on that main thread.

```js
console.log('main thread');
```

### If Node.js is single-threaded, how does it handle multiple requests?

Node.js uses an event loop and non-blocking I/O. It starts an I/O operation, continues processing other work, and later handles the completion callback or promise when the operation finishes.

```js
Request A -> async DB
Request B -> async DB
Event loop handles whichever completes
```

### What is non-blocking I/O?

Non-blocking I/O starts an operation without making the JavaScript thread wait for its completion. This allows the event loop to keep processing other work while the operating system or libuv handles the I/O.

```js
fs.promises.readFile('data.txt').then(console.log);
```

### What is event-driven architecture?

In an event-driven system, components react to events instead of continuously waiting for work. Node.js uses events heavily through the event loop, EventEmitter, streams, HTTP, and asynchronous callbacks.

```js
emitter.on('orderCreated', handleOrder);
```

### What is the V8 engine?

V8 is Google's JavaScript engine used by Chrome and Node.js. It parses and executes JavaScript and includes JIT compilation and garbage collection capabilities.

```js
const v8 = require('v8');
console.log(v8.getHeapStatistics());
```

### How does Node.js work internally?

Node.js combines V8 for JavaScript execution, libuv for asynchronous I/O and the event loop, and Node's core APIs for networking, filesystem, streams, crypto, and other runtime features. The main JavaScript thread coordinates work rather than blocking on most I/O.

```js
HTTP request -> Node -> libuv/OS -> callback -> response
```

### Explain Node.js architecture.

At a high level, application JavaScript runs on V8, asynchronous work is coordinated through libuv and the event loop, and Node's core modules expose networking, filesystem, streams, crypto, and process APIs. This architecture favors concurrent I/O without creating one JavaScript thread per request.

```js
Client -> HTTP -> Event Loop -> Handler -> I/O -> Response
```

### What are the advantages of Node.js?

Node.js offers efficient I/O concurrency, a large npm ecosystem, fast development with JavaScript/TypeScript, and good support for APIs and real-time applications. It also lets teams use a similar language across frontend and backend.

```js
React frontend <-> Node.js API
```

### What are the disadvantages of Node.js?

CPU-heavy work can block the main event loop if it is executed directly. Large dependency trees can also create maintenance and security concerns, so dependency management and workload selection matter.

```js
for (;;) { heavyWork(); } // blocks the event loop
```

### When should you not use Node.js?

Avoid putting heavy CPU computation on the main event-loop thread. For workloads dominated by CPU-intensive processing, use worker threads, background workers, separate services, or another runtime better suited to the workload.

```js
API -> Queue -> CPU worker
```

### Node.js vs Java?

Node.js is a JavaScript runtime centered on an event-driven asynchronous model, while Java commonly uses JVM-based multithreading and mature enterprise frameworks. The better choice depends on workload, team expertise, ecosystem, and operational requirements.

```js
Node.js -> I/O-heavy API
Java -> broad enterprise workloads
```

### What is the Node.js REPL?

REPL means Read-Eval-Print Loop. It lets developers interactively execute JavaScript and inspect values, which is useful for quick experiments and learning.

```js
node
> 2 + 3
5
```

### What are global objects in Node.js?

Node.js provides runtime-level globals such as `process`, `Buffer`, `console`, `setTimeout`, and `globalThis`. Some are available without importing a module.

```js
console.log(process.pid);
```

### What is the process object?

`process` provides information and control over the current Node.js process, including environment variables, arguments, signals, standard streams, and memory information. It is also used for graceful shutdown and process-level diagnostics.

```js
console.log(process.env.NODE_ENV);
console.log(process.pid);
```

---

# 2. Node.js Runtime, Event Loop & Internals

### What is libuv?

libuv is the library Node.js uses for its cross-platform asynchronous I/O model and event loop. It also provides the worker thread pool used by certain operations.

```js
Node.js -> libuv -> OS/I/O
```

### What is the libuv thread pool?

The libuv thread pool is a pool of worker threads used for certain operations that cannot be handled directly by the event-driven OS I/O path. It prevents those operations from blocking the main JavaScript thread.

```js
JavaScript -> libuv pool -> worker
```

### Which operations use the libuv thread pool?

Common examples include many filesystem operations, some DNS operations, and some CPU-heavy crypto APIs. Network socket I/O is generally handled through the OS/event-driven networking layer rather than consuming one libuv worker per request.

```js
fs -> pool
crypto -> pool for some APIs
```

### What is UV_THREADPOOL_SIZE?

It controls the size of libuv's worker pool. Increasing it can help workloads with many thread-pool-bound operations, but it does not make the JavaScript event loop itself multithreaded and excessive values can increase contention.

```js
UV_THREADPOOL_SIZE=8 node app.js
```

### Explain the Node.js event loop.

The event loop coordinates asynchronous callbacks and keeps the main JavaScript thread moving between available work. Node.js processes phases such as timers, pending callbacks, poll, check, and close callbacks, while microtasks are processed between JavaScript turns according to runtime rules.

```js
setTimeout(() => console.log('timer'), 0);
setImmediate(() => console.log('immediate'));
```

### What are the Node.js event-loop phases?

Important phases include timers, pending callbacks, poll, check, and close callbacks. The poll phase handles many I/O callbacks, while the check phase is where `setImmediate()` callbacks run.

```js
timers -> pending -> poll -> check -> close
```

### What is process.nextTick()?

`process.nextTick()` schedules a callback to run after the current operation completes and before the event loop continues to later phases. Excessive use can starve I/O because the next-tick queue has very high priority.

```js
process.nextTick(() => console.log('nextTick'));
```

### What is setImmediate()?

`setImmediate()` schedules a callback for the check phase of the Node.js event loop. It is useful when you want work to run after the current poll phase.

```js
setImmediate(() => console.log('immediate'));
```

### process.nextTick() vs setImmediate()?

`process.nextTick()` runs before the event loop proceeds to another phase, while `setImmediate()` runs in the check phase. Therefore `nextTick()` has stronger priority and can cause starvation if abused.

```js
process.nextTick(a);
setImmediate(b);
```

### What is Async Hooks?

Async Hooks is a Node.js API for observing the lifecycle of asynchronous resources. It can help with tracing, correlation, and advanced debugging of async operations.

```js
async_hooks.createHook({ init, destroy }).enable();
```

### How can Async Hooks help tracing?

Async Hooks can associate asynchronous resources with request or transaction context. In production systems, this kind of context propagation can support request IDs, tracing, and diagnostics.

```js
Request ID -> async context -> logs
```

### What causes event-loop blocking?

Long synchronous loops, CPU-heavy algorithms, synchronous filesystem APIs, large JSON processing, and other long-running JavaScript can block the event loop. While blocked, other callbacks cannot run.

```js
JSON.parse(veryLargeString); // can block
```

### How do you detect event-loop lag?

Measure event-loop delay with runtime metrics or monitoring and correlate it with CPU usage and request latency. Profiling can then identify the synchronous code responsible.

```js
monitor event-loop delay -> profile CPU
```

---

# 3. Modules

### What is a module in Node.js?

A module is a reusable unit of code with its own scope and exports. Node.js supports CommonJS and ES Modules.

```js
module.exports = { add };
```

### What are CommonJS modules?

CommonJS is Node.js's traditional module system using `require()` and `module.exports`. Each module is loaded with its own module scope.

```js
const fs = require('fs');
```

### What are ES Modules?

ES Modules use standard JavaScript `import` and `export` syntax. Node.js supports ESM with the appropriate package or file configuration.

```js
import fs from 'node:fs';
```

### require() vs import?

`require()` is the CommonJS loading mechanism and is traditionally synchronous during module loading. `import` is the standard ESM syntax and supports static analysis and dynamic `import()`.

```js
const x = require('./x');
import x from './x.js';
```

### What is module caching?

Node.js caches a loaded module so subsequent imports of the same resolved module can reuse the existing module instance. This means top-level initialization normally runs once per process/module cache entry.

```js
const a = require('./counter');
const b = require('./counter'); // cached
```

### How does require() work internally?

Node resolves the module path, checks the module cache, loads and wraps the module source, executes it, and returns its exports. The cache prevents repeated execution for the same resolved module.

```js
require('./user') -> resolve -> cache -> execute -> exports
```

### What are built-in modules?

Built-in modules are provided by Node.js itself, such as `fs`, `path`, `http`, `crypto`, `events`, `stream`, and `worker_threads`. They do not need to be installed from npm.

```js
const path = require('node:path');
```

### How do you create a custom module?

Put reusable logic in a separate file and expose its public API using `module.exports` or ESM `export`. Consumers import or require that API.

```js
module.exports = { add: (a,b) => a+b };
```

### What are circular dependencies?

A circular dependency occurs when module A depends on B while B also depends directly or indirectly on A. It can produce partially initialized exports and should usually be redesigned.

```js
A -> B -> A
```

### What is dynamic import?

Dynamic `import()` loads an ES module asynchronously at runtime. It is useful when code should be loaded conditionally or lazily.

```js
const mod = await import('./feature.js');
```

### What are __dirname and __filename?

In CommonJS, `__dirname` is the current module directory and `__filename` is the current module file path. They are commonly used to build reliable filesystem paths.

```js
path.join(__dirname, 'config.json');
```

---

# 4. NPM & Package Management

### What is npm?

npm is Node.js's package manager and ecosystem for installing, updating, publishing, and managing JavaScript dependencies. It also runs project scripts defined in `package.json`.

```js
npm install express
```

### What is npx?

`npx` runs a package executable, often without requiring a permanent global installation. It is useful for project generators and command-line tools.

```js
npx eslint .
```

### What is package.json?

`package.json` describes a Node.js project, including metadata, scripts, dependencies, and configuration. It is a central manifest for package management.

```js
{"scripts":{"start":"node app.js"}}
```

### What is package-lock.json?

It records the resolved dependency tree and exact versions used for reproducible installs. It helps teams and CI environments install consistent dependency versions.

```js
npm ci
```

### dependencies vs devDependencies?

`dependencies` are needed by the application at runtime, while `devDependencies` are generally needed only for development, testing, linting, or build steps.

```js
"dependencies": {"express":"..."}
```

### What are peerDependencies?

Peer dependencies express compatibility requirements where a package expects the consuming project to provide a compatible dependency. They are common for plugins and libraries.

```js
"peerDependencies": {"react":"..."}
```

### What is Semantic Versioning?

SemVer uses major.minor.patch versioning. Major changes can break compatibility, minor versions add compatible features, and patch versions contain compatible fixes.

```js
1.4.2 -> 1.4.3
```

### What are npm scripts?

npm scripts are commands stored in `package.json` and executed with `npm run`. They standardize development, testing, building, and deployment tasks.

```js
"scripts":{"test":"jest"}
```

### What is npm audit?

`npm audit` checks installed dependencies against known security advisories. It can help identify vulnerable packages that need updating or replacement.

```js
npm audit
```

### How do you manage dependency vulnerabilities?

Keep dependencies updated, review advisories, remove unused packages, lock versions appropriately, and use automated security checks. Do not blindly force upgrades without checking compatibility.

```js
npm audit -> review -> update -> test
```

---

# 5. File System & Core Modules

### What is the fs module?

`fs` provides filesystem operations such as reading, writing, renaming, deleting, and watching files and directories. Prefer asynchronous APIs on request paths to avoid blocking the event loop.

```js
await fs.promises.readFile('data.txt', 'utf8');
```

### readFile() vs readFileSync()?

`readFile()` is asynchronous and allows other event-loop work while the filesystem operation is pending. `readFileSync()` blocks the JavaScript thread until the operation completes.

```js
await fs.promises.readFile('a.txt');
fs.readFileSync('a.txt');
```

### What is the path module?

`path` provides platform-aware utilities for building and manipulating filesystem paths. It avoids hard-coding path separators.

```js
path.join(__dirname, 'files', 'a.txt');
```

### What is the os module?

`os` exposes operating-system information such as CPU count, platform, memory, and home directory.

```js
console.log(os.cpus().length);
```

### What is the http module?

The `http` module provides low-level HTTP server and client functionality in Node.js. Frameworks such as Express build on top of Node's HTTP capabilities.

```js
http.createServer((req,res)=>res.end('OK')).listen(3000);
```

### How do you create an HTTP server?

Create a server with `http.createServer`, inspect the request, and write a response. The server then listens on a port for incoming connections.

```js
http.createServer((req,res)=>res.end('Hello')).listen(3000);
```

### What is the crypto module?

`crypto` provides cryptographic primitives such as hashing, random bytes, encryption/decryption APIs, and signing/verification. Use established algorithms and libraries rather than implementing cryptography yourself.

```js
crypto.randomBytes(16);
```

### What is the events module?

The `events` module provides `EventEmitter`, Node's basic mechanism for creating and consuming custom events.

```js
const { EventEmitter } = require('node:events');
```

### What is the zlib module?

`zlib` provides compression and decompression functionality such as gzip and Brotli. Compression can reduce network payload size at the cost of CPU work.

```js
createGzip()
```

### What is the url module?

The `url` module provides APIs for parsing and constructing URLs. The WHATWG `URL` class is commonly used for modern URL handling.

```js
const u = new URL('https://example.com?a=1');
```

---

# 6. Buffers & Binary Data

### What is a Buffer?

A Buffer is a Node.js object for working with raw binary data. It is commonly used for files, network packets, streams, and encoded data.

```js
const b = Buffer.from('hello');
```

### Buffer vs ArrayBuffer?

Buffer is Node.js's byte-oriented abstraction built on top of ArrayBuffer concepts. ArrayBuffer is a standard JavaScript binary-memory container, while Buffer provides Node-specific APIs for byte manipulation.

```js
const buf = Buffer.from([1,2,3]);
```

### Why are Buffers important in Node.js?

Network and filesystem data is fundamentally byte-oriented. Buffers let Node.js handle binary content efficiently without converting everything to strings.

```js
fs.createReadStream('image.png').on('data', chunk => console.log(chunk.length));
```

---

# 7. Streams 

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

# 8. EventEmitter

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

# 9. HTTP & HTTPS

### What is HTTP?

HTTP is an application-layer protocol used for request-response communication between clients and servers. Node.js provides HTTP server and client APIs for implementing it.

```js
GET /users HTTP/1.1
```

### What are HTTP methods?

Common methods include GET for retrieval, POST for creation/actions, PUT for full replacement, PATCH for partial updates, and DELETE for removal.

```js
GET /users
POST /users
PATCH /users/1
```

### GET vs POST?

GET is generally used to retrieve resources and should be safe and cacheable when appropriate. POST is commonly used to submit data or create resources and may change server state.

```js
GET /users/1
POST /users
```

### PUT vs PATCH?

PUT generally represents replacing a resource representation, while PATCH applies a partial modification. API semantics should be documented consistently.

```js
PUT /users/1 -> full user
PATCH /users/1 -> name only
```

### What are HTTP status codes?

Status codes communicate the result of an HTTP request. Common groups are 2xx success, 3xx redirection, 4xx client error, and 5xx server error.

```js
200 OK
201 Created
400 Bad Request
500 Server Error
```

### What are HTTP headers?

Headers carry metadata such as content type, authorization, caching directives, and correlation IDs. They can be sent by both requests and responses.

```js
Content-Type: application/json
```

### What is HTTPS?

HTTPS is HTTP protected by TLS. It provides encryption in transit and server authentication through certificates.

```js
https://api.example.com
```

### What is TLS?

TLS is the cryptographic protocol used to secure network communication. It establishes keys and authenticates the server before protected application data is exchanged.

```js
Client <-> TLS handshake <-> Server
```

### Explain the request-response lifecycle.

A client opens or reuses a connection, sends an HTTP request, Node receives it and runs application logic, and the server sends headers/body back as the response. Middleware and routing can occur between receiving and responding.

```js
Client -> HTTP -> Node -> Express -> Handler -> Response
```

### What is HTTP keep-alive?

Keep-alive allows a connection to be reused for multiple HTTP requests instead of creating a new connection each time. Connection reuse can reduce latency and connection overhead.

```js
one TCP/TLS connection -> many requests
```

### What is an HTTP Agent?

Node's HTTP Agent manages connection reuse and pooling for HTTP client requests. Reusing sockets can improve performance when calling downstream services.

```js
http.Agent({ keepAlive: true })
```

---

# 10. REST APIs & API Styles

### What is REST?

REST is an architectural style centered around resources, standard HTTP semantics, stateless requests, and representations such as JSON. Good REST APIs use HTTP methods and status codes consistently.

```js
GET /users/10
```

### What are REST principles?

Common principles include client-server separation, statelessness, cacheability, a uniform interface, layered systems, and resource-oriented design. APIs should use HTTP semantics consistently.

```js
GET /users/10 -> resource
```

### What are the main types of APIs?

Common API styles include REST, SOAP, GraphQL, gRPC, WebSocket APIs, and RPC-style APIs. The best choice depends on client needs, contracts, performance, and communication patterns.

```js
REST -> HTTP resources
GraphQL -> flexible queries
gRPC -> RPC
WebSocket -> real time
```

### What is a SOAP API?

SOAP is a protocol based on XML messages and formal contracts such as WSDL. It remains common in some enterprise and legacy integrations.

```js
<soap:Envelope>...</soap:Envelope>
```

### What is a GraphQL API?

GraphQL exposes a schema and lets clients request the fields they need. It can reduce over-fetching but requires careful query complexity, authorization, and caching design.

```js
query { user(id: 1) { name email } }
```

### What is a gRPC API?

gRPC is an RPC framework commonly using HTTP/2 and Protocol Buffers. It provides strongly typed contracts and efficient service-to-service communication.

```js
rpc GetUser(GetUserRequest) returns (User);
```

### What is a WebSocket API?

WebSockets provide a persistent two-way connection for real-time communication. They are useful for chat, live notifications, collaboration, and dashboards.

```js
client <-> WebSocket <-> server
```

### What is an RPC API?

RPC models communication as calling a remote operation rather than primarily manipulating resources. gRPC is a popular modern RPC implementation.

```js
GetUser(10)
```

### REST vs GraphQL?

REST exposes resource endpoints, while GraphQL usually exposes a schema and lets clients choose fields. REST is often simpler operationally, while GraphQL can be useful when clients have diverse data requirements.

```js
REST: GET /users/1
GraphQL: user(id:1){name}
```

### REST vs SOAP?

REST commonly uses HTTP semantics and JSON and is generally lighter for modern web APIs. SOAP uses XML and formal standards and is still useful in some enterprise integrations.

```js
REST -> JSON
SOAP -> XML
```

### REST vs gRPC?

REST is broadly compatible with browsers and public APIs, while gRPC is strong for typed internal service-to-service communication. Choose based on clients, protocol support, performance, and operational needs.

```js
REST public API
 gRPC internal service
```

### What is API versioning?

Versioning allows an API to evolve without unexpectedly breaking existing clients. Common approaches include URL versions, headers, or content negotiation.

```js
GET /api/v1/users
```

### What is pagination?

Pagination limits the amount of data returned in one response. It improves latency and memory usage and prevents clients from requesting unbounded datasets.

```js
GET /users?page=2&limit=20
```

### What is API idempotency?

An operation is idempotent when repeating the same request produces the same intended state. Idempotency keys are commonly used to make retried creation/payment requests safe.

```js
Idempotency-Key: abc123
```

---

# 11. Express.js & Middleware

### What is Express.js?

Express is a lightweight Node.js web framework built around routing and middleware. It simplifies HTTP API development while still exposing Node's underlying request and response objects.

```js
app.get('/health', (req,res)=>res.json({ok:true}));
```

### Why use Express instead of the Node http module?

The `http` module is low-level, while Express provides routing, middleware composition, request handling helpers, and a familiar application structure. Express reduces boilerplate for typical APIs.

```js
http -> low level
Express -> routing + middleware
```

### What is Express middleware?

Middleware is a function that can inspect or modify the request/response, end the request, or call `next()` to continue. Middleware is executed in the order it is registered.

```js
app.use((req,res,next)=>{ next(); });
```

### What happens internally when a request reaches Express?

Node's HTTP server receives the request and passes it into the Express application. Express walks its middleware/router stack in order until a matching handler sends a response or an error is passed to error middleware.

```js
HTTP -> Express -> middleware -> router -> handler -> response
```

### Application-level vs router-level middleware?

Application middleware is attached to the Express application and can affect many routes. Router middleware is attached to a specific router and is useful for grouping behavior by feature.

```js
app.use(auth)
router.use(validate)
```

### What is built-in middleware?

Express provides built-in middleware such as `express.json()` for parsing JSON request bodies and `express.urlencoded()` for URL-encoded bodies.

```js
app.use(express.json());
```

### What is custom middleware?

Custom middleware is application-specific logic such as authentication, validation, request IDs, or logging. It follows the `(req, res, next)` pattern unless it ends the response.

```js
function auth(req,res,next){ next(); }
```

### What is third-party middleware?

Third-party middleware is installed from npm and integrated into Express. Examples include security, logging, compression, CORS, and request parsing packages.

```js
app.use(cors());
```

### How do you create centralized error handling?

Register an Express error-handling middleware after routes. It receives `(err, req, res, next)`, logs the error appropriately, and sends a consistent safe response.

```js
app.use((err,req,res,next)=>res.status(500).json({error:'Internal error'}));
```

### How do you handle async errors in Express?

Ensure rejected promises reach the centralized error handler, either through framework support or an async wrapper depending on the Express version/pattern used. Do not leave rejected requests unhandled.

```js
const wrap = fn => (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
```

### How do you implement authentication middleware?

Extract credentials such as a session cookie or bearer token, verify them, and attach the authenticated identity to the request. Reject missing or invalid credentials before protected handlers execute.

```js
Authorization: Bearer <token>
```

### How do you implement authorization?

Authentication answers who the user is; authorization answers what that user may do. Use roles, permissions, ownership checks, or policies after authentication.

```js
if (!user.permissions.includes('orders:read')) return res.sendStatus(403);
```

### How do you validate request body/query parameters?

Validate input at the API boundary using a schema validation library or explicit checks. Reject invalid input with a clear 4xx response before business logic or database access.

```js
schema.parse(req.body);
```

### How do you handle file uploads?

Accept multipart data with an appropriate parser, enforce size/type limits, validate the content, and store it safely. For large files, streaming or direct object-storage uploads can avoid unnecessary memory usage.

```js
multipart -> validate -> stream -> S3
```

### How do you implement API rate limiting?

Rate limiting restricts requests per client or identity within a time window. A shared store such as Redis is useful when multiple Node.js instances must enforce one distributed limit.

```js
Redis counter -> limit -> 429
```

### How do you implement compression?

Compression middleware can reduce response size for compressible content. It trades CPU for lower network bandwidth and should be configured with sensible thresholds and exclusions.

```js
app.use(compression());
```

---

# 12. Authentication & Authorization

### What is session-based authentication?

The server stores session state and the client sends a session identifier, commonly in a secure cookie. Sessions can be revoked centrally but require shared/session storage when the app is distributed.

```js
Cookie: sessionId=abc
```

### What is JWT authentication?

A JWT carries signed claims that the server can verify without storing the full session state. Keep tokens short-lived and protect refresh-token handling carefully.

```js
Authorization: Bearer <JWT>
```

### Access token vs refresh token?

An access token is short-lived and used for API authorization. A refresh token is longer-lived and is used to obtain new access tokens, so it needs stronger storage and rotation controls.

```js
access: 15m
refresh: longer-lived
```

### What is OAuth 2.0?

OAuth 2.0 is an authorization framework for delegated access. It allows a client to obtain access tokens to call protected resources without sharing the user's password with the client.

```js
Client -> Authorization Server -> Access Token
```

### What is OpenID Connect?

OpenID Connect adds an identity layer on top of OAuth 2.0. It provides an ID token and standardized user identity information.

```js
OIDC = OAuth 2.0 + identity
```

### What is RBAC?

Role-Based Access Control assigns permissions through roles such as admin, manager, or user. It simplifies authorization management when roles map cleanly to business permissions.

```js
admin -> users:delete
```

---

# 13. Databases

### How does Node.js connect to a database?

Node.js uses database drivers, ORMs, or query builders to communicate with databases. Production applications commonly use connection pooling and parameterized queries.

```js
pool.query('SELECT ... WHERE id = $1', [id]);
```

### What is connection pooling?

A pool reuses database connections instead of opening a new connection for every request. It reduces connection setup overhead and limits database concurrency.

```js
Request -> pool -> DB connection -> release
```

### What is a transaction?

A transaction groups related database operations into one logical unit. It should preserve the required atomicity and consistency guarantees when multiple changes must succeed or fail together.

```js
BEGIN -> UPDATE -> UPDATE -> COMMIT
```

### What are prepared/parameterized statements?

They separate SQL structure from user-supplied values and help prevent SQL injection. They can also allow database drivers to reuse execution plans depending on the database.

```js
SELECT * FROM users WHERE id = $1
```

### What is the N+1 query problem?

N+1 occurs when one query loads a list and then an additional query is executed for each item. Batch loading, joins, or eager loading can reduce excessive round trips.

```js
1 query + 100 item queries = N+1
```

### How do you optimize database queries?

Use appropriate indexes, select only needed fields, paginate large results, inspect query plans, and reduce unnecessary round trips. Measure database latency before and after changes.

```js
EXPLAIN SELECT ...
```

---

# 14. Caching & Redis

### What is caching?

Caching stores frequently used data so repeated requests can avoid expensive computation or database/external API calls. Cache design must define TTL and invalidation behavior.

```js
GET user -> Redis -> DB only on miss
```

### What is Redis?

Redis is an in-memory data store commonly used for caching, sessions, rate limiting, queues, and distributed coordination. It supports fast key-value operations and additional data structures.

```js
SET user:1 '{...}' EX 60
```

### What is cache-aside?

The application first checks the cache and reads from the database on a miss, then stores the result in the cache. This is simple but requires a strategy for invalidation and stale data.

```js
cache hit -> return
cache miss -> DB -> set cache
```

### What is cache stampede?

A cache stampede happens when many requests miss or simultaneously refresh the same key, causing a burst of backend load. Techniques include locking, request coalescing, jittered TTLs, and stale-while-revalidate.

```js
many misses -> DB overload
```

### How can Redis be used for rate limiting?

Redis can store counters with expiry or use Lua scripts for atomic rate-limiting logic. A shared Redis store lets multiple Node.js instances enforce the same limit.

```js
INCR api:user:1 + EXPIRE
```

---

# 15. Error Handling

### How do you handle synchronous errors?

Use `try/catch` around synchronous code where recovery or translation is needed. At API boundaries, convert expected failures into safe, consistent responses.

```js
try { risky(); } catch (e) { handle(e); }
```

### How do you handle asynchronous errors?

Handle rejected promises with `try/catch` around `await` or with appropriate promise rejection handlers. API frameworks should route errors to centralized handlers.

```js
try { await save(); } catch (e) { next(e); }
```

### What is the difference between operational and programmer errors?

Operational errors are expected runtime failures such as timeouts or unavailable dependencies and can often be handled gracefully. Programmer errors indicate bugs and should be fixed rather than silently hidden.

```js
timeout -> operational
undefined.foo -> programmer
```

### What are unhandledRejection and uncaughtException?

They indicate errors that escaped normal promise or synchronous error handling. Treat them as serious signals: log diagnostics, stop accepting new work if necessary, and restart cleanly rather than continuing in an unknown state.

```js
process.on('unhandledRejection', handler);
```

### How do you implement graceful shutdown?

Stop accepting new traffic, allow in-flight requests to finish within a deadline, close database/queue connections, and then exit. Handle signals such as SIGTERM in production.

```js
SIGTERM -> stop server -> drain -> close DB -> exit
```

---

# 16. Security 

### What is SQL injection?

SQL injection occurs when untrusted input changes the structure of a SQL query. Parameterized queries and safe query APIs keep data separate from SQL syntax.

```js
db.query('SELECT ... WHERE id=$1', [id]);
```

### What is NoSQL injection?

NoSQL injection occurs when untrusted data is interpreted as database operators or query structures. Validate input and construct database queries from controlled fields.

```js
validate id before query
```

### What is XSS?

Cross-site scripting occurs when attacker-controlled content is executed as script in a user's browser. APIs should validate input where appropriate and clients should safely encode output; avoid injecting untrusted HTML.

```js
never render untrusted HTML directly
```

### What is CSRF?

CSRF tricks a browser into sending an authenticated request to a site the user is logged into. SameSite cookies, CSRF tokens, and appropriate origin checks can reduce the risk for cookie-based authentication.

```js
SameSite=Lax
```

### What is CORS?

CORS is a browser security mechanism controlling whether a web page can make cross-origin requests to a server. The server uses response headers to declare allowed origins and methods.

```js
Access-Control-Allow-Origin: https://app.example
```

### What is a CORS preflight request?

For certain cross-origin requests, the browser first sends an OPTIONS request to ask whether the actual request is allowed. The server must respond with appropriate CORS headers.

```js
OPTIONS /users
```

### What is SSRF?

Server-Side Request Forgery occurs when an attacker makes a server fetch a URL they control or target internally. Restrict outbound destinations, validate URLs, and block access to sensitive internal metadata endpoints.

```js
allowlist outbound hosts
```

### What is prototype pollution?

Prototype pollution occurs when attacker-controlled properties modify JavaScript object prototypes in unsafe code paths. Avoid unsafe deep merges and validate object keys carefully.

```js
reject __proto__ / constructor / prototype keys
```

### What is command injection?

Command injection happens when untrusted input is passed into shell commands and changes what the shell executes. Prefer direct APIs and fixed argument arrays rather than building shell strings.

```js
spawn('tool', [safeArg])
```

### What is path traversal?

Path traversal uses sequences such as `../` to escape an intended directory. Resolve paths and verify they remain inside an allowed base directory before accessing files.

```js
resolve(base, userPath) -> verify prefix
```

### How do secure cookies help?

HttpOnly prevents client-side JavaScript from reading the cookie, Secure restricts transmission to HTTPS, and SameSite reduces cross-site request risks. Together they improve session-cookie security.

```js
Set-Cookie: sid=...; HttpOnly; Secure; SameSite=Lax
```

### How do you protect secrets?

Do not hard-code credentials in source code. Use environment/configuration secret management, restrict access, rotate secrets, and avoid logging them.

```js
process.env.DB_PASSWORD
```

---

# 17. Process & Environment

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

# 18. Child Processes

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

# 19. Worker Threads & Cluster

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

# 20. Performance & Optimization 

### How do you improve Node.js API performance?

Measure first, then optimize the actual bottleneck. Common improvements include removing event-loop blocking, optimizing database queries, caching, connection pooling, streaming, reducing payloads, and scaling horizontally.

```js
Measure -> optimize -> load test -> measure
```

### How do you optimize a slow API?

Break latency into application, database, external-service, and network components. Use profiling, tracing, query analysis, and metrics to identify which layer is responsible.

```js
request -> trace -> bottleneck
```

### How do you improve database performance?

Use indexes, efficient queries, pagination, connection pooling, and fewer round trips. Check query plans and avoid N+1 access patterns.

```js
EXPLAIN SELECT ...
```

### How do you reduce event-loop blocking?

Avoid long synchronous operations and CPU-heavy work on request paths. Use asynchronous APIs and move CPU-intensive work to workers or background jobs.

```js
sync CPU -> Worker Thread
```

### How do you optimize large-file processing?

Use streams rather than reading the entire file into memory. Streaming allows bounded memory use and supports backpressure.

```js
readable -> transform -> writable
```

### How do you optimize response size?

Return only required fields, paginate large results, compress appropriate content, and avoid unnecessarily nested payloads. Smaller responses reduce serialization and network costs.

```js
GET /users?limit=20
```

### How do you improve throughput?

Keep the event loop non-blocking, reuse connections, cache repeated work, optimize database access, and scale horizontally when necessary. Throughput improvements should be verified with load tests.

```js
LB -> multiple Node instances
```

### How do you optimize external API calls?

Set timeouts, avoid duplicate calls, cache stable data, reuse connections, and use bounded retries with exponential backoff for transient failures. Add circuit breakers when dependencies can fail for long periods.

```js
timeout -> retry/backoff -> fallback
```

### What is event-loop lag?

Event-loop lag measures how long scheduled work is delayed because the main thread is busy. High lag is a strong signal of blocking or overloaded JavaScript execution.

```js
high CPU -> high event-loop delay
```

### How do you find a memory leak?

Monitor memory over time, reproduce the growth, and compare heap snapshots to find objects that remain retained. Common causes include unbounded caches, listeners, timers, globals, and closures.

```js
heap snapshot A vs B
```

### How do you load test a Node.js API?

Generate realistic traffic and measure latency percentiles, throughput, error rate, CPU, memory, event-loop lag, and database behavior. Repeat after each optimization to verify improvement.

```js
baseline -> load -> optimize -> retest
```

### What is optimization vs premature optimization?

Optimization is evidence-driven improvement against a measured bottleneck and a defined goal. Premature optimization changes code without evidence and can add complexity without meaningful benefit.

```js
measure first
```

---

# 21. Memory Management

### How does memory management work in Node.js?

V8 manages JavaScript memory through a garbage-collected heap. Objects remain alive while reachable and become eligible for collection when they are no longer reachable.

```js
object -> reachable -> GC when unreachable
```

### What is garbage collection?

Garbage collection automatically reclaims memory that is no longer reachable by the application. V8 uses generational strategies to make collection efficient for common allocation patterns.

```js
allocate -> use -> unreachable -> GC
```

### What causes memory leaks?

Leaks occur when objects remain reachable even though the application no longer needs them. Common causes include unbounded caches, event listeners, timers, globals, and retained closures.

```js
cache.set(key, hugeObject) without limit
```

### What is process.memoryUsage()?

It returns memory metrics for the current Node.js process, such as heap usage and resident set size. It is useful for monitoring and investigating abnormal growth.

```js
console.log(process.memoryUsage());
```

### What are heap snapshots?

Heap snapshots capture the state of the V8 heap so retained objects and reference paths can be analyzed. Comparing snapshots before and after repeated workloads can reveal leaks.

```js
snapshot A -> workload -> snapshot B
```

### How do you profile Node.js?

Use CPU profiles, heap snapshots, runtime metrics, and tracing to locate expensive code or memory retention. The Node inspector and performance tooling can help connect symptoms to code.

```js
node --inspect app.js
```

---

# 22. Logging & Monitoring

### What is structured logging?

Structured logging emits machine-readable fields rather than only free-form text. It makes filtering, searching, and correlation easier in centralized log systems.

```js
{"level":"info","requestId":"abc"}
```

### What are log levels?

Typical levels include debug, info, warn, and error. Use appropriate levels so production logs remain useful without excessive noise or sensitive data.

```js
logger.warn('timeout');
```

### What is a request/correlation ID?

A request ID uniquely identifies a request and can be propagated across services. It helps correlate logs and traces when debugging distributed systems.

```js
X-Request-ID: abc123
```

### What are health checks?

Health endpoints report whether an application is alive or ready to serve traffic. Liveness and readiness checks should reflect different operational concerns.

```js
GET /health/live
GET /health/ready
```

### What is APM?

Application Performance Monitoring collects metrics, traces, errors, and dependency timings to show how an application behaves in production. It helps identify bottlenecks and failures.

```js
API -> trace -> DB span
```

### What is OpenTelemetry?

OpenTelemetry is an observability framework for collecting traces, metrics, and logs in a vendor-neutral way. It can standardize telemetry across Node.js services and dependencies.

```js
Node -> OTEL -> collector
```

---

# 23. Testing Node.js

### What is unit testing?

Unit tests verify small pieces of logic in isolation. They should be fast and deterministic and usually mock external dependencies when isolation is important.

```js
expect(add(2,3)).toBe(5);
```

### What is integration testing?

Integration tests verify that multiple components work together, such as an API and database. They catch integration problems that unit tests may miss.

```js
HTTP request -> API -> test DB
```

### What is API testing?

API tests send real HTTP requests to endpoints and verify status codes, response bodies, validation, and behavior. They are useful for testing the service boundary.

```js
await request(app).get('/health').expect(200);
```

### What are mocks, stubs, and spies?

A mock provides controlled replacement behavior, a stub returns predefined results, and a spy observes calls to a real or wrapped function. All are test doubles used for different purposes.

```js
jest.spyOn(service,'save')
```

### What is test isolation?

Each test should avoid depending on state left by another test. Reset mocks and use controlled test data or isolated databases to keep tests reliable.

```js
beforeEach(() => jest.clearAllMocks());
```

### What is code coverage?

Coverage measures which code paths are exercised by tests. High coverage can be useful, but coverage alone does not guarantee good tests or correct behavior.

```js
npm test -- --coverage
```

---

# 24. API Reliability

### What is a timeout?

A timeout limits how long the application waits for a dependency or request. It prevents stuck operations from consuming resources indefinitely.

```js
fetch(url, { signal: AbortSignal.timeout(3000) });
```

### What is retry with exponential backoff?

Retries repeat transient failures after increasing delays. Exponential backoff reduces pressure on an unhealthy dependency, and retries should be bounded and used only for retryable failures.

```js
1s -> 2s -> 4s -> stop
```

### What is a circuit breaker?

A circuit breaker stops calls to a failing dependency after a threshold and allows recovery probes later. It prevents repeated failures from consuming application resources.

```js
closed -> open -> half-open
```

### What is idempotency?

Idempotency allows a retried operation to produce the same intended result rather than duplicating side effects. It is especially important for payments and other retryable writes.

```js
Idempotency-Key: order-123
```

### What is graceful degradation?

A service continues providing reduced functionality when a dependency is unavailable. Caches, fallbacks, queues, and optional-feature disabling can help preserve core functionality.

```js
recommendations down -> core API still works
```

---

# 25. WebSockets & Real-Time

### What is a WebSocket?

A WebSocket provides a persistent two-way connection between client and server. Unlike normal request-response HTTP, either side can send messages whenever needed.

```js
client <-> ws <-> server
```

### What is Socket.IO?

Socket.IO is a real-time communication library that provides higher-level features such as rooms, events, and reconnection. It is not identical to the raw WebSocket protocol.

```js
socket.on('message', handler);
```

### How do you authenticate WebSockets?

Authenticate during the connection handshake using a secure token/session and then associate the connection with the user. Validate authorization again for sensitive operations where needed.

```js
connect -> verify token -> user
```

### How do you scale WebSockets?

Use multiple application instances with a shared pub/sub or adapter layer so messages can reach clients connected to different instances. Sticky sessions may also be needed depending on the architecture.

```js
LB -> Node 1/2 + Redis adapter
```

---

# 26. Queues & Background Jobs

### Why use background jobs?

Background jobs move slow or retryable work out of the request path. This reduces API latency and lets work be retried independently.

```js
POST /report -> queue -> worker
```

### What is a message queue?

A queue buffers work between producers and consumers. It provides asynchronous processing and can smooth traffic spikes.

```js
API -> Queue -> Worker
```

### What are retries and dead-letter queues?

Retries allow transient job failures to recover automatically. A dead-letter queue stores jobs that repeatedly fail so they can be investigated without blocking normal processing.

```js
job -> retry -> DLQ
```

### How do you prevent duplicate jobs?

Use idempotency keys, unique job IDs, transactional outbox patterns, or consumer-side deduplication depending on the workflow. Assume messages may be delivered more than once.

```js
jobId=payment-123
```

### What is BullMQ?

BullMQ is a Redis-backed job and queue library for Node.js. It supports delayed jobs, retries, concurrency, and worker processing.

```js
queue.add('email', data);
```

---

# 27. File Uploads

### How do you handle multipart file uploads?

Parse multipart form data with a suitable library, enforce size and type limits, validate the content, and store files safely. Avoid trusting client-provided filenames or MIME types alone.

```js
multipart -> validate -> store
```

### How do you upload large files efficiently?

Stream the upload rather than buffering the whole file in memory. Direct uploads to object storage using pre-signed URLs can also reduce load on the Node.js API.

```js
client -> S3 presigned URL
```

### How do you secure file uploads?

Restrict file size and type, generate safe filenames, store outside executable paths, and scan content when required. Treat uploaded files as untrusted input.

```js
validate -> random filename -> object storage
```

---

# 28. Microservices

### What is a microservice?

A microservice is a separately deployable service organized around a focused business capability. It can scale and deploy independently but adds distributed-system complexity.

```js
Orders service | Users service
```

### REST vs messaging between services?

Synchronous REST is simple when the caller needs an immediate response, while messaging decouples producers and consumers and works well for asynchronous workflows. Choose based on consistency, latency, and failure requirements.

```js
REST: request/response
Queue: async
```

### What is an API gateway?

An API gateway provides a front door for clients and can handle routing, authentication, rate limiting, and aggregation. It can also hide internal service topology.

```js
Client -> Gateway -> Services
```

### What is eventual consistency?

Eventual consistency means replicas or services may temporarily disagree but converge after updates propagate. It is common in distributed systems where immediate global consistency is not required.

```js
Order created -> event -> read model
```

### What is the Saga pattern?

Saga coordinates a distributed business transaction as a sequence of local transactions with compensating actions when later steps fail. It avoids requiring one global database transaction across services.

```js
Order -> Payment -> Inventory -> compensate
```

---

# 29. Node.js Architecture & Design

### What is MVC in Node.js?

MVC separates request handling into controllers, business/domain logic, and data access/views. For APIs, controllers commonly handle HTTP concerns while services contain business logic.

```js
Route -> Controller -> Service -> Repository
```

### What is layered architecture?

Layered architecture separates concerns such as controllers, services, repositories, and infrastructure. This improves testability and makes responsibilities easier to reason about.

```js
Controller -> Service -> Repository
```

### What is dependency injection?

Dependency injection provides dependencies to a component instead of constructing them inside it. This reduces coupling and makes testing easier.

```js
new UserService(userRepo)
```

### What is Clean Architecture?

Clean Architecture separates business rules from frameworks and infrastructure so core logic does not depend heavily on external details. Dependencies point inward toward stable business rules.

```js
API -> Use Case -> Domain
```

### What is a modular monolith?

A modular monolith is one deployable application with strong internal module boundaries. It can provide many benefits of modular design without the operational complexity of distributed microservices.

```js
single app: users | orders | billing
```

### What are SOLID principles in Node.js?

SOLID principles encourage focused responsibilities, extensible designs, substitutable abstractions, small interfaces, and dependency inversion. They are guidelines for maintainable code rather than rules requiring a specific framework.

```js
Service depends on interface/contract
```

---

# 30. Deployment & Production

### How do you productionize a Node.js application?

Use environment-based configuration, structured logging, health checks, secure secrets, graceful shutdown, monitoring, resource limits, and automated deployment. Run the application with an appropriate process/container strategy.

```js
CI -> image -> deploy -> health check
```

### Why use Docker for Node.js?

Docker packages the application and runtime into a reproducible image. It helps keep development, CI, and production environments consistent.

```js
FROM node:22
```

### What is a reverse proxy?

A reverse proxy sits in front of application servers and can terminate TLS, route traffic, serve static assets, and provide load balancing or buffering.

```js
Internet -> Nginx -> Node
```

### What is zero-downtime deployment?

Zero-downtime deployment replaces application instances without dropping all traffic. Health checks, load balancers, rolling updates, and graceful shutdown help drain old instances safely.

```js
new instances healthy -> shift traffic -> drain old
```

### What is PM2?

PM2 is a Node.js process manager that can restart processes, manage multiple instances, and provide operational features. Container orchestration platforms are another common production approach.

```js
pm2 start app.js -i max
```

---

# 31. Node.js + AWS

### What is AWS Lambda with Node.js?

Lambda runs Node.js functions without managing servers directly. It is useful for event-driven workloads and APIs, with trade-offs around startup behavior, execution limits, and statelessness.

```js
API Gateway -> Lambda -> DB
```

### How can Node.js use S3?

Node.js can upload and download objects from S3 using AWS SDKs. For large client uploads, pre-signed URLs can let clients upload directly without sending the file through the API server.

```js
Client -> presigned S3 URL
```

### How can Node.js use SQS?

SQS provides a managed queue for asynchronous processing. Node.js workers can consume messages, process them, and use visibility timeouts/retries for failures.

```js
API -> SQS -> Worker
```

### What is CloudWatch used for?

CloudWatch can collect logs, metrics, alarms, and operational signals for AWS workloads. It can help monitor Node.js services and trigger alerts.

```js
Node logs -> CloudWatch
```

### When would you use ECS/EKS?

ECS and EKS are container orchestration options for running scalable services. The choice depends on the organization's AWS platform preferences, Kubernetes requirements, and operational model.

```js
Docker -> ECS/EKS
```

---

# 32. Advanced Node.js Internals

### What is V8 garbage collection?

V8 manages JavaScript memory using generational garbage collection strategies. Short-lived objects and long-lived objects are treated differently to improve collection efficiency.

```js
young objects -> old objects -> GC
```

### What are V8 hidden classes?

V8 can optimize objects when their property shapes are consistent. Frequently changing object shapes can reduce optimization opportunities, so predictable object construction can help performance.

```js
same shape -> optimization
```

### What is JIT compilation?

V8 uses just-in-time compilation to optimize frequently executed JavaScript into machine code. Runtime feedback helps V8 optimize hot code and deoptimize when assumptions stop being valid.

```js
JS -> bytecode -> optimized machine code
```

### What is deoptimization?

Deoptimization happens when optimized assumptions become invalid and V8 falls back to a less optimized execution path. Unpredictable types or object shapes can contribute to deoptimization.

```js
optimized -> assumption fails -> deopt
```

### What are native addons?

Native addons let Node.js interact with native code for specialized functionality or performance. They add complexity and platform considerations, so they should be used only when justified.

```js
JS -> native addon -> C/C++
```

### What are Atomics and SharedArrayBuffer?

They allow controlled shared memory between worker threads. Atomics provide synchronization primitives so concurrent workers can coordinate safely.

```js
SharedArrayBuffer + Atomics
```

---

# 33. Concurrency Patterns

### What are async queues?

An async queue limits or schedules concurrent asynchronous work. It prevents too many simultaneous operations from overwhelming a downstream dependency.

```js
queue -> concurrency=10 -> workers
```

### What is a semaphore in Node.js?

A semaphore limits the number of concurrent operations to a fixed capacity. It is useful when a resource such as an external API or database has a concurrency limit.

```js
10 permits -> max 10 concurrent
```

### What are worker pools?

A worker pool keeps a controlled number of worker threads or processes available for repeated CPU-bound jobs. It avoids creating a new worker for every task.

```js
job queue -> worker pool
```

### What are Shared Workers and Service Workers?

Shared Workers can be shared by multiple browser contexts, while Service Workers run separately from pages and support features such as caching and offline behavior. They are browser technologies rather than Node server workers.

```js
Browser -> Service Worker -> Cache
```

---

# 34. API Reliability & Security Scenarios

### An external API is slow or unavailable. What do you do?

Use strict timeouts, bounded retries with exponential backoff, circuit breaking, caching, and asynchronous queues where appropriate. The service should fail predictably instead of holding resources indefinitely.

```js
timeout -> retry -> circuit breaker -> fallback
```

### How do you protect an API from abuse?

Use authentication, authorization, input validation, rate limiting, payload limits, secure headers, logging, and dependency protections. Apply controls at both application and infrastructure layers.

```js
client -> rate limit -> validation -> handler
```

### How do you make an API idempotent?

Define an idempotency key or deterministic request identifier, persist the result/status for that operation, and return the same outcome for safe retries. This prevents duplicate side effects.

```js
POST + Idempotency-Key -> same result
```

---

# 35. Senior Node.js Performance Scenarios 

### An API normally takes 100 ms but suddenly takes 3 seconds. How do you debug it?

Start with metrics and traces to locate the delay across Node.js, the database, external services, and network. Check event-loop lag, CPU/memory, slow queries, dependency latency, and recent deployments.

```js
trace -> isolate layer -> profile -> fix
```

### Node.js CPU is 100%. What do you check?

Use CPU profiling and event-loop metrics to identify expensive synchronous work. If the workload is genuinely CPU-bound, move it to worker threads or separate workers and scale appropriately.

```js
CPU profile -> hot function -> worker
```

### Node.js memory keeps increasing. What do you do?

Determine whether memory returns after garbage collection, then compare heap snapshots and inspect retained objects. Look for unbounded caches, listeners, timers, globals, and closures.

```js
heap snapshots -> retained object -> fix
```

### The database is the bottleneck. What would you do?

Optimize queries and indexes first, reduce round trips, use caching and batching, configure pooling, and consider read replicas or scaling when justified. Do not simply add Node.js instances if the database is already saturated.

```js
API -> cache -> DB
```

### A large response is slow. How do you optimize it?

Select only required fields, paginate, compress appropriate content, and stream when the payload is very large. Measure serialization, database time, and network transfer separately.

```js
large result -> paginate/stream
```

### How do you protect your service from a failing payment API?

Use timeouts, bounded retries for safe transient errors, circuit breakers, idempotency, and asynchronous processing where suitable. Never allow indefinite waiting or unsafe duplicate payment attempts.

```js
API -> payment service -> timeout/circuit
```

### How do you optimize before production?

Profile realistic workloads, remove blocking operations, optimize database access, configure pooling and caching, load-test expected traffic, and establish latency/error/CPU/memory baselines.

```js
baseline -> optimize -> load test
```

---

# 36. Senior Design & Trade-offs

### Why not add more Node.js processes to solve every performance problem?

More processes increase application capacity but do not fix a slow database, blocked event loop, or inefficient algorithm. Scaling should follow measured bottlenecks and downstream capacity.

```js
8 Node processes -> still slow DB
```

### Is caching always a good optimization?

No. Caching introduces consistency, invalidation, memory, and operational complexity. Cache data that is expensive to retrieve and whose freshness requirements are understood.

```js
cache hit -> fast; stale data -> risk
```

### Is asynchronous code always faster?

No. Async I/O improves concurrency for waiting operations, but it does not make CPU computation cheaper. CPU-bound work still needs appropriate parallelism or offloading.

```js
async DB wait != faster CPU
```

### When would you choose Node.js vs another backend runtime?

Choose based on workload, ecosystem, team skills, operational needs, and performance characteristics. Node.js is strong for I/O-heavy and real-time systems but should not be selected blindly for CPU-heavy workloads.

```js
requirements -> runtime choice
```

---

# 37. Senior Node.js Scenario Questions

### How would you design a production-ready Node.js API?

Use clear architecture, validation, authentication/authorization, centralized errors, database pooling, caching where useful, timeouts, rate limits, observability, health checks, graceful shutdown, and automated tests. Then load-test and deploy with safe operational controls.

```js
Client -> LB -> API -> Service -> DB/Cache
```

### How would you handle 10,000 requests per second?

First identify the bottleneck and establish latency/error targets. Keep instances stateless, use load balancing, optimize the database/cache, control downstream concurrency, and scale horizontally based on measured capacity.

```js
LB -> N Node instances -> cache/DB
```

### How would you process a 2 GB file?

Use streaming rather than loading the file into memory. Apply backpressure-aware transformations and store the result in object storage or another streaming destination.

```js
stream -> transform -> storage
```

### How would you design a resilient background job system?

Use a durable queue, idempotent consumers, bounded concurrency, retries with backoff, dead-letter handling, observability, and graceful shutdown. Assume messages can be delivered more than once.

```js
producer -> queue -> worker -> DLQ
```

### How do you scale WebSockets?

Run multiple WebSocket instances behind appropriate load balancing and use a shared pub/sub layer or adapter to route messages between instances. Design connection state carefully so one process is not a single point of failure.

```js
clients -> LB -> WS nodes -> Redis pub/sub
```

### Worker threads vs child processes: when would you choose each?

Choose worker threads for CPU-bound JavaScript where shared/transferable memory and lower overhead are useful. Choose child processes when stronger isolation or running an external executable is required.

```js
CPU JS -> Worker
external/isolation -> Child
```

---