
## API Fundamentals

### What is an API?

API stands for Application Programming Interface. It allows two software
systems to communicate with each other. An API defines how a client can
send requests, what data it can send, and what response it can expect.

**Example:**

``` http
GET /api/users/101
```

``` json
{
  "id": 101,
  "name": "Kalidas",
  "role": "Developer"
}
```

**Interview point:**\
An API acts as a contract between the client and the server.

------------------------------------------------------------------------

### What are the main types of APIs?

Common API types include:

-   REST API --- commonly used for web applications and services
-   SOAP API --- commonly used in enterprise and legacy systems
-   GraphQL API --- allows clients to request exactly the data they need
-   WebSocket API --- used for real-time, two-way communication
-   gRPC API --- commonly used for high-performance service-to-service
    communication
-   Webhooks --- used for event-based server-to-server notifications

------------------------------------------------------------------------

## REST APIs

### What is a REST API?

REST stands for Representational State Transfer. REST is an
architectural style for designing APIs around resources and standard
HTTP methods.

**Example:**

``` http
GET /api/users/101
POST /api/users
PUT /api/users/101
PATCH /api/users/101
DELETE /api/users/101
```

REST APIs commonly use JSON for request and response data.

------------------------------------------------------------------------

### What are the HTTP methods used in REST APIs?


-   `GET` --- retrieve data
-   `POST` --- create a resource
-   `PUT` --- replace/update an entire resource
-   `PATCH` --- partially update a resource
-   `DELETE` --- delete a resource

**Example:**

``` http
POST /api/users
```

``` json
{
  "name": "Kalidas",
  "email": "kalidas@example.com"
}
```

------------------------------------------------------------------------

### What does stateless mean in REST?

Stateless means the server does not depend on stored client session
state between requests. Every request should contain the information
required to process it.

**Example:**

``` http
GET /api/profile
Authorization: Bearer <token>
```

The server can authenticate the request using the token without
depending on a previous request.

------------------------------------------------------------------------

### What are the important REST principles?


-   Client-server architecture
-   Stateless communication
-   Resource-based URLs
-   Standard HTTP methods
-   Uniform interface
-   Cacheability
-   Layered architecture

**Example resource URL:**

``` http
GET /api/orders/123
```

The URL represents the `orders` resource and `123` identifies a
particular order.

------------------------------------------------------------------------

### What is the difference between PUT and PATCH?

`PUT` is generally used to replace the complete resource, while `PATCH`
is used for a partial update.

**PUT:**

``` http
PUT /api/users/101
```

``` json
{
  "name": "Kalidas",
  "email": "kalidas@example.com",
  "role": "Senior Developer"
}
```

**PATCH:**

``` http
PATCH /api/users/101
```

``` json
{
  "role": "Senior Developer"
}
```

------------------------------------------------------------------------

### What is the difference between GET and POST?

`GET` is normally used to retrieve data, while `POST` is normally used
to create a resource or trigger an operation that changes server state.

**GET:**

``` http
GET /api/users
```

**POST:**

``` http
POST /api/users
```

``` json
{
  "name": "Kalidas"
}
```

------------------------------------------------------------------------

### What are important HTTP status codes?


  Status   Meaning
  -------- -----------------------
  200      OK
  201      Created
  204      No Content
  400      Bad Request
  401      Unauthorized
  403      Forbidden
  404      Not Found
  409      Conflict
  422      Unprocessable Content
  429      Too Many Requests
  500      Internal Server Error
  502      Bad Gateway
  503      Service Unavailable

**Example:**

``` javascript
res.status(201).json(newUser);
```

Use `201 Created` when a new resource has been successfully created.

------------------------------------------------------------------------

### What is the difference between 401 and 403?


`401 Unauthorized` means the request does not have valid authentication
credentials.

`403 Forbidden` means the user is authenticated but does not have
permission to perform the operation.

**Easy way to remember:**

``` text
401 → Who are you?
403 → I know who you are, but you cannot do this.
```

------------------------------------------------------------------------

### What is API versioning?

API versioning allows us to introduce changes without immediately
breaking existing clients.

**Example:**

``` http
/api/v1/users
/api/v2/users
```

A new version can change the response structure while existing clients
continue using the old version.

------------------------------------------------------------------------

### What is pagination?

Pagination divides a large result set into smaller pages instead of
returning everything in one response.

**Example:**

``` http
GET /api/users?page=2&limit=20
```

The API returns the second page with up to 20 users.

**Why use it?**

-   Reduces response size
-   Reduces database load
-   Improves response time
-   Improves frontend performance

------------------------------------------------------------------------

### How do you implement filtering, sorting, and searching in an API?

Query parameters can be used to control the result.

**Example:**

``` http
GET /api/products?category=mobile&sort=price&page=1&limit=20
```

The server reads the query parameters and builds the appropriate
database query.

------------------------------------------------------------------------

## SOAP APIs

### What is a SOAP API?

SOAP stands for Simple Object Access Protocol. It is a protocol for
exchanging structured messages, commonly using XML.

**Example:**

``` xml
<soap:Envelope>
  <soap:Body>
    <GetUser>
      <UserId>101</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>
```

SOAP is still common in some enterprise and legacy systems.

------------------------------------------------------------------------

### REST vs SOAP?


  REST                        SOAP
  --------------------------- -------------------------------------
  Architectural style         Protocol
  Commonly uses JSON          Uses XML
  Lightweight                 More heavyweight
  Flexible                    More strict
  Common in web/mobile APIs   Common in enterprise/legacy systems

REST is generally preferred for lightweight web APIs, while SOAP can be
useful when a strict contract and enterprise standards are required.

------------------------------------------------------------------------

## GraphQL

### What is GraphQL?

GraphQL is an API query language that allows the client to specify
exactly which fields it wants.

**Example:**

``` graphql
query {
  user(id: 101) {
    name
    email
  }
}
```

Response:

``` json
{
  "data": {
    "user": {
      "name": "Kalidas",
      "email": "kalidas@example.com"
    }
  }
}
```

------------------------------------------------------------------------

### REST vs GraphQL?

REST typically exposes multiple resource endpoints, while GraphQL
commonly exposes a single endpoint where the client specifies the
required fields.

GraphQL can reduce over-fetching and under-fetching.

**Example:**

Instead of receiving:

``` json
{
  "id": 101,
  "name": "Kalidas",
  "email": "...",
  "phone": "...",
  "address": "..."
}
```

the client can request only:

``` text
name
email
```

------------------------------------------------------------------------

## WebSocket APIs

### What is a WebSocket API?

WebSocket provides persistent, two-way communication between the client
and server.

Unlike a normal REST request-response interaction, the server can send
updates to the client whenever new data is available.

**Examples:**

-   Chat applications
-   Live GPS tracking
-   Real-time notifications
-   Online games
-   Live dashboards

**Concept:**

``` text
Client ←────────→ Server
       persistent
       connection
```

------------------------------------------------------------------------

### REST vs WebSocket?


REST is generally suitable for request-response operations.

WebSocket is better when the application needs continuous real-time
communication.

**Example:**

``` text
REST:
Client → Get latest vehicle location
Server → Return location

WebSocket:
Client ← Vehicle location updates continuously → Server
```

For a real-time tracking system, WebSocket/Socket.IO can be more
suitable than repeatedly polling a REST endpoint.

------------------------------------------------------------------------

## gRPC

### What is gRPC?

gRPC is a high-performance Remote Procedure Call framework commonly used
for service-to-service communication and microservices.

It commonly uses Protocol Buffers for strongly typed messages.

**Example architecture:**

``` text
Order Service
      |
     gRPC
      |
Payment Service
```

------------------------------------------------------------------------

### REST vs gRPC?


  -----------------------------------------------------------------------
  REST                                gRPC
  ----------------------------------- -----------------------------------
  Commonly JSON/HTTP                  Commonly Protobuf/HTTP/2

  Easy for browser/client APIs        Excellent for service-to-service
                                      communication

  Human-readable payloads             Compact binary payloads

  Simple and widely adopted           High performance and strongly typed
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Webhooks

### What is a webhook?

A webhook is an event-based callback where one system sends an HTTP
request to another system when an event occurs.

**Example: Payment**

``` text
Customer pays
      ↓
Payment Gateway
      ↓
POST /api/payment/webhook
      ↓
Your Backend
```

``` json
{
  "event": "payment.success",
  "paymentId": "PAY123",
  "amount": 500
}
```

The receiving application can verify the event and update the payment
status.

------------------------------------------------------------------------

### Webhook vs API polling?

With polling, the application repeatedly asks whether something has
changed.

``` text
Is payment complete?
Is payment complete?
Is payment complete?
```

With a webhook, the external system notifies your application when the
event occurs.

``` text
Payment completed
       ↓
Webhook sent
       ↓
Your application
```

Webhooks can reduce unnecessary requests and provide faster event
notification.

------------------------------------------------------------------------

## API Authentication and Authorization

### What is API authentication?

Authentication verifies who the caller is.

Common approaches include:

-   API keys
-   Basic authentication
-   JWT
-   OAuth 2.0

------------------------------------------------------------------------

### What is authorization?

Authorization determines what an authenticated user is allowed to do.

**Example:**

``` text
Authentication:
User is Kalidas.

Authorization:
Kalidas has "admin" role and can delete users.
```

------------------------------------------------------------------------

### What is JWT authentication?

JWT stands for JSON Web Token. After successful login, the server can
issue a signed token. The client sends the token with subsequent
requests.

**Flow:**

``` text
Login
  ↓
Server validates credentials
  ↓
JWT generated
  ↓
Client sends JWT
  ↓
Server verifies JWT
  ↓
Request is authorized
```

**Example:**

``` http
Authorization: Bearer eyJhbGciOi...
```

------------------------------------------------------------------------

### What is the difference between authentication and authorization?


``` text
Authentication → Who are you?
Authorization  → What are you allowed to do?
```

**Example:**

A user successfully logs in --- authentication.

The same user tries to access an admin-only endpoint --- authorization
determines whether access is allowed.

------------------------------------------------------------------------

## API Security

### How do you secure a REST API?

Important measures include:

-   Use HTTPS
-   Implement authentication
-   Implement authorization
-   Validate and sanitize input
-   Use secure token handling
-   Apply rate limiting
-   Configure CORS correctly
-   Avoid exposing sensitive information
-   Use security headers
-   Log and monitor suspicious activity
-   Keep dependencies updated

------------------------------------------------------------------------

### What is CORS?

CORS stands for Cross-Origin Resource Sharing. It controls whether a
browser application from one origin can make requests to another origin.

**Example:**

``` text
Frontend:
https://app.example.com

API:
https://api.example.com
```

The API must allow the frontend origin when cross-origin browser
requests are required.

------------------------------------------------------------------------

### What is rate limiting?

Rate limiting restricts how many requests a client can make within a
time period.

**Example:**

``` text
100 requests / minute / user
```

If the client exceeds the limit, the API can return:

``` http
429 Too Many Requests
```

Rate limiting helps protect APIs from abuse and excessive traffic.

------------------------------------------------------------------------

### What is input validation?

Input validation verifies that incoming data has the expected format,
type, range, and required fields before processing it.

**Example:**

``` json
{
  "email": "invalid-value"
}
```

The server should validate the email before using it.

Validation should happen on the server even if the frontend already
validates the input.

------------------------------------------------------------------------

## Node.js and Express APIs

### How do you create a REST API using Express?


``` javascript
const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    id,
    name: "Kalidas"
  });
});

app.listen(3000);
```

Request:

``` http
GET /api/users/101
```

Response:

``` json
{
  "id": "101",
  "name": "Kalidas"
}
```

------------------------------------------------------------------------

### How do you handle errors in Express?

Express supports centralized error-handling middleware.

``` javascript
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  });
});
```

A centralized handler keeps API error responses consistent.

------------------------------------------------------------------------

### How do you validate API requests in Node.js?

Validate request body, parameters, and query parameters before executing
business logic.

**Example:**

``` javascript
if (!req.body.email) {
  return res.status(400).json({
    message: "Email is required"
  });
}
```

For larger applications, a validation library/schema can provide more
structured validation.

------------------------------------------------------------------------

## API Performance

### How do you optimize a slow API?

I would first identify where the latency is coming from and then
optimize the bottleneck.

Possible approaches:

-   Optimize database queries
-   Add appropriate database indexes
-   Use Redis caching
-   Reduce unnecessary API calls
-   Use pagination
-   Avoid returning unnecessary data
-   Use connection pooling
-   Use asynchronous processing for long-running work
-   Add monitoring and profiling

**Example:**

``` text
Request
  ↓
Check Redis
  ↓
Cache hit → Return data
  ↓
Cache miss
  ↓
Query database
  ↓
Store result in Redis
  ↓
Return response
```

------------------------------------------------------------------------

### How can Redis improve API performance?

Redis can cache frequently requested data so that repeated requests do
not always need to query the database.

**Example:**

``` text
API Request
    ↓
Redis?
  ↙   ↘
Yes    No
 ↓      ↓
Data   MongoDB
         ↓
       Redis
         ↓
      Response
```

This is especially useful for frequently accessed, relatively stable
data.

Your resume describes using Redis caching for invoice and policy
document retrieval and improving API response time by 40%.
fileciteturn0file0

------------------------------------------------------------------------

### What is connection pooling?

Connection pooling maintains a reusable set of database connections
instead of opening a new database connection for every API request.

``` text
API Requests
     ↓
Connection Pool
 ┌───┼───┐
 ↓   ↓   ↓
 DB  DB  DB
```

This reduces connection creation overhead and improves scalability.

------------------------------------------------------------------------

## API Architecture

### What is an API Gateway?

An API Gateway is an entry point between clients and backend services.

``` text
                 API Gateway
                     |
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
 User Service   Order Service  Payment Service
```

It can handle:

-   Routing
-   Authentication
-   Authorization
-   Rate limiting
-   Logging
-   Request transformation
-   Load balancing

------------------------------------------------------------------------

### How do microservices communicate?

Microservices can communicate synchronously or asynchronously.

**Synchronous:**

``` text
Order Service
      ↓
   REST/gRPC
      ↓
Payment Service
```

**Asynchronous:**

``` text
Order Service
      ↓
 RabbitMQ
      ↓
Payment Service
```

REST and gRPC are common for synchronous communication, while message
brokers such as RabbitMQ are useful for asynchronous workflows.

------------------------------------------------------------------------

### When would you use RabbitMQ instead of REST?

I would use RabbitMQ when the operation does not need an immediate
response and I want services to communicate asynchronously.

**Example:**

``` text
Order Created
     ↓
RabbitMQ
     ↓
Email Service
     ↓
Send confirmation email
```

The Order Service does not have to wait for the email service to finish.

------------------------------------------------------------------------

### What is an API Gateway vs a load balancer?

A load balancer primarily distributes traffic across multiple instances.

An API Gateway provides API-level functionality such as routing,
authentication, rate limiting, request transformation, and sometimes
traffic management.

They can be used together.

``` text
Client
  ↓
Load Balancer
  ↓
API Gateway
  ↓
Microservices
```

------------------------------------------------------------------------

## Reliability and Distributed Systems

### What is idempotency?

An operation is idempotent when performing the same operation multiple
times produces the same intended result as performing it once.

This is especially important for payments and other operations where
duplicate requests can cause duplicate side effects.

**Example:**

``` http
POST /api/payments
Idempotency-Key: abc123
```

If the client retries the same request with the same key, the server can
recognize it as the same operation instead of creating another payment.

------------------------------------------------------------------------

### How would you prevent duplicate payment requests?


I would use an idempotency key.

``` text
Client
  ↓
Payment Request
Idempotency-Key: abc123
  ↓
API
  ↓
Check existing key
  ↓
Already processed → Return previous result
  ↓
Not processed → Process payment
```

The key should be stored with the result so retries can safely return
the existing result.

------------------------------------------------------------------------

### What is a retry mechanism?

A retry mechanism attempts an operation again when a temporary failure
occurs.

**Example:**

``` text
API Call
   ↓
Temporary failure
   ↓
Retry
   ↓
Temporary failure
   ↓
Retry
   ↓
Success
```

Retries should normally use limits and backoff rather than retrying
indefinitely.

------------------------------------------------------------------------

### What is exponential backoff?

Exponential backoff increases the delay between retries.

``` text
Retry 1 → wait 100 ms
Retry 2 → wait 200 ms
Retry 3 → wait 400 ms
Retry 4 → wait 800 ms
```

This prevents many clients from repeatedly hitting an unhealthy service
at the same time.

------------------------------------------------------------------------

### What is a circuit breaker?

A circuit breaker prevents repeated calls to a service that is currently
failing.

``` text
Healthy
  ↓
Failures increase
  ↓
Circuit opens
  ↓
Requests fail fast
  ↓
Service recovers
  ↓
Circuit closes
```

This prevents failures from propagating through multiple services.

------------------------------------------------------------------------

## Senior-Level API Design

### How would you design a scalable REST API?

I would start by defining clear resources and API contracts, then design
the API to be stateless and horizontally scalable.

Important areas include:

-   Resource-oriented URLs
-   Proper HTTP methods and status codes
-   Request validation
-   Authentication and authorization
-   Pagination and filtering
-   Caching
-   Database indexing
-   Rate limiting
-   Centralized error handling
-   Logging and monitoring
-   API versioning
-   Idempotency for sensitive operations
-   Horizontal scaling
-   Timeouts and retries
-   Documentation

**Example architecture:**

``` text
Client
  ↓
Load Balancer
  ↓
API Gateway
  ↓
Node.js Services
  ↓
Redis / Database
  ↓
Message Queue for async work
```

------------------------------------------------------------------------

### How would you design API versioning for a large application?

I would use explicit versions such as:

``` http
/api/v1/orders
/api/v2/orders
```

I would keep backward compatibility where possible, communicate breaking
changes clearly, and migrate clients gradually.

------------------------------------------------------------------------

### How would you handle a sudden 10× increase in API traffic?


I would approach it in stages:

``` text
Monitor
  ↓
Identify bottleneck
  ↓
Scale application instances
  ↓
Add/optimize caching
  ↓
Optimize database
  ↓
Use load balancing
  ↓
Rate-limit abusive traffic
  ↓
Move non-critical work to async processing
```

I would use monitoring to determine whether the bottleneck is the
application, database, cache, network, or an external dependency.

------------------------------------------------------------------------

### How would you monitor production APIs?

I would monitor:

-   Request latency
-   Error rate
-   Request volume
-   CPU and memory
-   Database performance
-   Cache hit/miss rate
-   External service failures
-   Logs
-   Distributed traces where available

For your experience, relevant tools include **Elasticsearch, Kibana,
Dynatrace, and AWS CloudWatch**. fileciteturn0file0

------------------------------------------------------------------------

## Scenario-Based API Questions

### An API is taking 5 seconds to respond. How would you debug it?


I would first check monitoring and logs to identify where the time is
being spent.

``` text
API
 ↓
Check application logs
 ↓
Check database query time
 ↓
Check external API latency
 ↓
Check Redis/cache
 ↓
Check CPU/memory
 ↓
Profile bottleneck
```

If the database query is slow, I would inspect the query plan and
indexes. If repeated reads are causing the issue, I would consider
caching. If an external service is slow, I would use timeouts and
appropriate resilience mechanisms.

------------------------------------------------------------------------

### An external payment API is failing. What would you do?


I would:

-   Set a reasonable timeout
-   Avoid indefinite retries
-   Retry only appropriate transient failures
-   Use exponential backoff
-   Use idempotency for payment operations
-   Record the payment state
-   Handle webhook callbacks
-   Log failures with correlation/request IDs
-   Monitor the external dependency

The key goal is to avoid charging the customer twice while maintaining a
reliable payment state.

------------------------------------------------------------------------

### Your API receives the same request twice. How would you handle it?

For operations that should not be repeated, such as payments, I would
use an idempotency key.

``` text
Request 1 → key abc123 → process
Request 2 → key abc123 → return existing result
```

This prevents duplicate side effects.

------------------------------------------------------------------------

### When would you choose REST, GraphQL, WebSocket, or gRPC?


``` text
REST
→ Standard CRUD and resource-based APIs

GraphQL
→ Client needs flexible data selection

WebSocket
→ Real-time two-way communication

gRPC
→ High-performance service-to-service communication
```

The choice depends on the communication pattern, client requirements,
performance requirements, and system architecture.

------------------------------------------------------------------------

## Node.js Interview Example

### How would you structure a Node.js REST API?


A clean structure could separate routing, controllers, services, data
access, middleware, and configuration.

``` text
src/
├── routes/
├── controllers/
├── services/
├── repositories/
├── middleware/
├── models/
├── config/
└── app.js
```

A request can flow like:

``` text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

This keeps business logic separate from HTTP handling and database
access.