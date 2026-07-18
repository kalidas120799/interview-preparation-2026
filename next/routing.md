## Static Route

A static route is a fixed, unchanging URL created by a `page.js` file placed directly inside a folder named after the route path.

```
app/
├── page.js          → /
├── about/
│   └── page.js       → /about
```

---

## Nested Routing

Nested routing is created by nesting folders inside one another, where each folder level adds a segment to the URL path.

```
app/
├── blog/
│   ├── page.js        → /blog
│   ├── post/
│   │   └── page.js    → /blog/post
```

---

## Dynamic Routing

Dynamic routing lets a single folder match multiple URLs by using a bracketed segment name (e.g. `[id]`) that captures a variable value from the path.

```
app/
├── products/
│   ├── [id]/
│   │   └── page.js    → /products/1, /products/2
```

The `[id]` folder name in brackets creates a dynamic segment — any value in that position of the URL is captured as a route parameter.

---

## Nested Dynamic Routing

Nested dynamic routing chains multiple dynamic segments together across folder levels, so each level captures its own route parameter.

```
app/
├── shop/
│   ├── [category]/
│   │   ├── [productId]/
│   │   │   └── page.js    → /shop/electronics/1001
```

Multiple dynamic segments can be nested, letting a single route template match many combinations of parameters (e.g. category + product ID).

---

## Route Groups

Route groups use parentheses `(folderName)` to organize routes without affecting the URL path — the group name itself never appears in the route.

```
app/
├── (public)/
│   ├── layout.js
│   ├── page.js         → / (home)
│   ├── about/
│   │   └── page.js     → /about
│
├── (auth)/
│   ├── layout.js
│   ├── login/
│   │   └── page.js     → /login
│   ├── register/
│   │   └── page.js     → /register
│
├── (dashboard)/
│   ├── layout.js
│   ├── dashboard/
│   │   └── page.js     → /dashboard
│   ├── settings/
│   │   └── page.js     → /settings
```

Each group can have its own `layout.js`, which is useful for giving public pages, auth pages, and dashboard pages different layouts while keeping the URLs clean.

---

## Private Folders (`_folder`)

Prefixing a folder name with an underscore (`_folder`) excludes it from routing entirely — Next.js won't treat it as a route segment.

```
app/
├── _lib/               → ❌ NOT accessible as a route
│   ├── utils.js
│   ├── api.js
```

This is commonly used for utilities, helpers, or components colocated with routes that shouldn't be publicly reachable as URLs.

---

## Catch-All Route: `[slug]` / `[[...path]]`

```
app/
├── repo/
│   ├── [repo]/
│   │   ├── [[...path]]/
│   │   │   └── page.js   → matches:
│   │   │                    /repo/my-project
│   │   │                    /repo/my-project/src
│   │   │                    /repo/my-project/src/component
```

- `[...path]` — a **required** catch-all segment; captures one or more path parts as an array.
- `[[...path]]` — an **optional** catch-all segment (double brackets); also matches the base route with no extra path parts (e.g. `/repo/my-project` alone), in addition to any nested paths.

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
