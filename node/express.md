## 1. What is Express.js?

Express.js is a fast, minimal, and flexible web application framework built on top of Node.js. It simplifies server creation, routing, middleware handling, request processing, and API development. Express removes much of the boilerplate code required when using the native `http` module directly.

**Example:**

```js
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server Running");
});
```

---

## 2. Why Use Express?

Express makes backend development faster by providing built-in support for routing, middleware, request handling, and error management. It improves code organization and allows developers to build REST APIs and web applications with less code. Most Node.js applications use Express because of its simplicity and large ecosystem.

**Without Express:**

```js
http.createServer(...)
```

**With Express:**

```js
app.get("/", (req, res) => {
  res.send("Hello");
});
```

---

## 3. What is Middleware?

Middleware is a function that executes between receiving a request and sending a response. It has access to `req`, `res`, and `next` objects and can modify requests, validate data, log information, or terminate requests. Middleware is one of the most important concepts in Express.

**Example:**

```js
app.use((req, res, next) => {
  console.log("Request Received");
  next();
});
```

---

## 4. Types of Middleware?

Express provides different types of middleware for handling various tasks during request processing. Each middleware serves a specific purpose and can be applied globally or to specific routes. Understanding middleware types is a common interview topic.

### Types:

```txt
1. Application Middleware
2. Router Middleware
3. Error Middleware
4. Built-in Middleware
5. Third-party Middleware
```

**Example:**

```js
app.use(express.json());
```

---

## 5. What is Application-Level Middleware?

Application-level middleware is attached directly to the Express application using `app.use()` or route methods. It executes for every request or specific routes depending on where it is registered. This middleware is commonly used for logging, authentication, and request validation.

**Example:**

```js
app.use((req, res, next) => {
  console.log("App Middleware");
  next();
});
```

---

## 6. What is Router-Level Middleware?

Router-level middleware works the same as application middleware but is applied only to a specific router. It helps organize middleware logic for particular modules or features. This is useful in large applications with multiple APIs.

**Example:**

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router Middleware");
  next();
});
```

---

## 7. What is Error-Handling Middleware?

Error-handling middleware catches and processes application errors in a centralized location. It contains four parameters: `err`, `req`, `res`, and `next`. This prevents application crashes and provides consistent error responses.

**Example:**

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

## 8. What is next()?

`next()` is a function used to pass control to the next middleware in the request pipeline. If `next()` is not called, the request may hang and no further middleware will execute. It is essential for chaining middleware functions together.

**Example:**

```js
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res) => {
  res.send("Done");
});
```

---

## 9. Explain Express Request Lifecycle.

When a request reaches an Express server, it passes through middleware, route handlers, and optional error handlers before a response is sent. Each middleware can modify the request or response and decide whether processing should continue. The lifecycle ends once a response is returned to the client.

**Flow:**

```txt
Client Request
  ↓
Middleware
  ↓
Route Handler
  ↓
Error Middleware (If Error)
  ↓
Response
```

---

## 10. How Do You Create Routes?

Routes define how the server responds to different HTTP requests and URLs. Express provides methods like `get()`, `post()`, `put()`, `patch()`, and `delete()` to create routes. Each route has a callback function to process the request.

**Example:**

```js
app.get("/users", (req, res) => {
  res.send("Users List");
});

app.post("/users", (req, res) => {
  res.send("User Created");
});
```

---

## 11. How Do You Handle Route Parameters?

Route parameters are dynamic values embedded in the URL path. They are accessed using `req.params` and are commonly used to fetch specific resources by ID. Route parameters make APIs more flexible and reusable.

**Example:**

```js
app.get("/users/:id", (req, res) => {
  res.send(req.params.id);
});
```

URL:

```txt
/users/101
```

Output:

```txt
101
```

---

## 12. Difference Between req.params and req.query?

`req.params` retrieves values from dynamic URL segments, while `req.query` retrieves values from query strings. Route parameters are required parts of the URL, whereas query parameters are optional filters or search values. Both are frequently used in API development.

### Route Parameter

```txt
/users/101
```

```js
req.params.id
```

### Query Parameter

```txt
/users?id=101
```

```js
req.query.id
```

| req.params | req.query    |
| ---------- | ------------ |
| URL Path   | Query String |
| Required   | Optional     |
| /users/:id | /users?id=1  |

---

## 13. How Do You Serve Static Files?

Express serves static files such as HTML, CSS, images, and JavaScript using the built-in `express.static()` middleware. Files placed inside the specified folder become directly accessible through URLs. This is commonly used for frontend assets.

**Example:**

```js
app.use(express.static("public"));
```

Folder:

```txt
public/
├── index.html
├── style.css
└── logo.png
```

---

## 14. How Do You Handle Errors Globally?

Global error handling is achieved through a dedicated error-handling middleware placed after all routes. Whenever an error occurs, it is passed using `next(error)` and processed centrally. This avoids duplicate error handling logic across multiple routes.

**Example:**

```js
app.get("/", (req, res, next) => {
  next(new Error("Something Wrong"));
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
```

---

## 15. How Do You Structure Large Express Applications?

Large Express applications should follow a modular architecture that separates routes, controllers, services, middlewares, and models. This improves maintainability, scalability, testing, and team collaboration. Most enterprise applications follow this layered structure.

**Example Structure:**

```txt
project/
│
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
├── config/
├── utils/
├── app.js
└── server.js
```

**Flow:**

```txt
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Database
```

---
