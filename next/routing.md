## Static Route

A fixed URL that doesn't change.

```text
app/
├── page.js                 → /
└── about/
    └── page.js             → /about
```

**Examples**

* `/`
* `/about`

---

## Nested Routing

Creates child routes using nested folders.

```text
app/
└── blog/
    ├── page.js             → /blog
    └── post/
        └── page.js         → /blog/post
```

**Examples**

* `/blog`
* `/blog/post`

---

## Dynamic Routing

Creates dynamic URLs using folder names wrapped in square brackets.

```text
app/
└── products/
    └── [id]/
        └── page.js
```

**Examples**

```text
/products/1
/products/2
/products/100
```

Access parameter:

```javascript
export default function Product({ params }) {
  return <h1>{params.id}</h1>;
}
```

---

## Nested Dynamic Routing

Supports multiple dynamic parameters.

```text
app/
└── shop/
    └── [category]/
        └── [productId]/
            └── page.js
```

**Examples**

```text
/shop/electronics/1001
/shop/books/25
/shop/mobile/iphone16
```

Access parameters:

```javascript
export default function Product({ params }) {
  const { category, productId } = params;
}
```

---

## Route Groups

Route Groups organize files without affecting the URL.

Folders wrapped in parentheses **()** are ignored in the URL.

```text
app/
├── (public)/
│   ├── layout.js
│   ├── page.js              → /
│   └── about/
│       └── page.js          → /about
│
├── (auth)/
│   ├── layout.js
│   ├── login/
│   │   └── page.js          → /login
│   └── register/
│       └── page.js          → /register
│
└── (dashboard)/
    ├── layout.js
    ├── dashboard/
    │   └── page.js          → /dashboard
    └── settings/
        └── page.js          → /settings
```

**Purpose**

* Separate layouts
* Better project organization
* URL remains unchanged

---

## Private Folders (`_folder`)

Folders starting with `_` are private and cannot be accessed through a URL.

```text
app/
└── _lib/
    ├── utils.js
    └── api.js
```

**Accessible?**

```text
/_lib      ❌ No
```

**Use Cases**

* Helper functions
* API utilities
* Constants
* Database functions

---

## Optional Catch-All Routing (`[[...slug]]`)

Matches zero or more URL segments.

```text
app/
└── repo/
    └── [repo]/
        └── [[...path]]/
            └── page.js
```

**Matches**

```text
/repo/my-project
/repo/my-project/src
/repo/my-project/src/components
/repo/my-project/src/components/button
```

Access parameters:

```javascript
export default function Repo({ params }) {
  console.log(params.repo);
  console.log(params.path);
}
```

Example output:

```javascript
// /repo/my-project
params = {
  repo: "my-project",
  path: undefined
}

// /repo/my-project/src/components
params = {
  repo: "my-project",
  path: ["src", "components"]
}
```

---

## Catch-All Routing (`[...slug]`)

Matches one or more URL segments.

```text
app/
└── docs/
    └── [...slug]/
        └── page.js
```

**Matches**

```text
/docs/react
/docs/react/hooks
/docs/react/hooks/useState
```

**Does NOT match**

```text
/docs
```

Example output:

```javascript
// /docs/react/hooks
params = {
  slug: ["react", "hooks"]
}
```

---

## Routing Summary

| Route Type           | Folder Pattern      | Example URL            |
| -------------------- | ------------------- | ---------------------- |
| Static Route         | `about/page.js`     | `/about`               |
| Nested Route         | `blog/post/page.js` | `/blog/post`           |
| Dynamic Route        | `[id]`              | `/products/1`          |
| Nested Dynamic Route | `[category]/[id]`   | `/shop/books/10`       |
| Catch-All            | `[...slug]`         | `/docs/react/hooks`    |
| Optional Catch-All   | `[[...slug]]`       | `/docs`, `/docs/react` |
| Route Group          | `(admin)`           | URL unchanged          |
| Private Folder       | `_lib`              | Not accessible via URL |
