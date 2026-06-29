## What is Next.js?

Next.js is a React framework used to build full-stack web applications with features like routing, server-side rendering, API routes, and performance optimization.

* Helps build SEO-friendly and fast applications.
* Supports frontend and backend development in a single project.

---

## Why use Next.js instead of React?

React only handles UI rendering, while Next.js provides:

* File-based routing
* Server-Side Rendering (SSR)
* Static Site Generation (SSG)
* API routes
* Image optimization
* Better SEO
* Deployment support

Next.js reduces configuration work and improves performance.

---

## Main Features of Next.js

* File-based Routing
* Server-Side Rendering (SSR)
* Static Site Generation (SSG)
* API Routes
* Image Optimization
* Middleware
* Automatic Code Splitting
* TypeScript Support
* Server Components
* App Router

---

## What is File-based Routing?

Files inside the **pages** or **app** folder automatically become routes.

Example:

```text
pages/about.js
```

becomes

```text
/about
```

No manual route configuration is required.

---

## What is SSR (Server-Side Rendering)?

SSR generates HTML on the server for every request.

**Advantages**

* Better SEO
* Faster initial page load
* Fresh data on every request

Implemented using:

```javascript
getServerSideProps()
```

---

## What is SSG (Static Site Generation)?

SSG generates HTML during build time.

**Advantages**

* Very fast
* Low server load
* Great for blogs and documentation

Implemented using:

```javascript
getStaticProps()
```

---

## SSR vs SSG

| SSR                   | SSG                |
| --------------------- | ------------------ |
| Runs on every request | Runs during build  |
| Dynamic data          | Mostly static data |
| Higher server load    | Better performance |
| Better for dashboards | Better for blogs   |

---

## What is CSR?

CSR (Client-Side Rendering) renders the page inside the browser using JavaScript.

**Pros**

* Rich interactions

**Cons**

* Slower first load
* SEO is weaker than SSR

---

## What is Hydration?

Hydration is the process where React attaches event listeners and interactivity to server-rendered HTML.

Flow:

```text
Server HTML
      ↓
Browser receives HTML
      ↓
React hydrates
      ↓
Interactive page
```

---

## What are API Routes?

API Routes let you create backend endpoints inside the same Next.js project.

Example:

```text
pages/api/users.js
```

becomes

```text
/api/users
```

Useful for building full-stack applications.

---

## What is the App Router?

Introduced in **Next.js 13**.

Features:

* Layouts
* Nested routing
* Server Components
* Streaming
* Better performance

Uses:

```text
app/
```

---

## Pages Router vs App Router

| Pages Router        | App Router           |
| ------------------- | -------------------- |
| Uses `pages` folder | Uses `app` folder    |
| Traditional routing | Nested routing       |
| No layouts          | Shared layouts       |
| Older approach      | Recommended approach |

---

## What are Server Components?

Server Components run only on the server.

Benefits:

* Less JavaScript sent to browser
* Better security
* Faster performance

Default in App Router.

---

## What are Client Components?

Client Components run in the browser.

Supports:

* useState
* useEffect
* Browser APIs

Must include:

```javascript
"use client";
```

---

## What is `"use client"`?

Marks a component as a Client Component.

Required when using:

* useState
* useEffect
* Event handlers
* Browser APIs

Example:

```javascript
"use client";

export default function Home() {}
```

---

## What is Dynamic Routing?

Creates dynamic URLs.

Example:

```text
product/[id]
```

URL:

```text
/product/100
```

Useful for:

* Products
* Blogs
* User Profiles

---

## What is Catch-all Routing?

Captures multiple URL segments.

Example:

```text
docs/[...slug]
```

Matches:

```text
/docs/react/hooks
/docs/react/useState
/docs/javascript
```

---

## What is Middleware?

Middleware runs before a request is completed.

Used for:

* Authentication
* Redirects
* Logging
* Request modification

---

## Image Optimization

Next.js Image component provides:

* Lazy loading
* Responsive images
* Image resizing
* WebP support

Example:

```jsx
<Image
  src="/photo.png"
  width={500}
  height={300}
  alt="Image"
/>
```

---

## Automatic Code Splitting

Next.js automatically splits JavaScript by page.

Benefits:

* Smaller bundles
* Faster loading
* Better performance

---

## What is ISR (Incremental Static Regeneration)?

ISR updates static pages after deployment without rebuilding the app.

Example:

```javascript
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60
  };
}
```

Updates every **60 seconds**.

---

## What is `getStaticProps()`?

Fetches data during build time.

Used for:

* Blogs
* Documentation
* Static pages

---

## What is `getServerSideProps()`?

Runs on every request.

Useful for:

* User dashboard
* Live stock prices
* Frequently changing data

---

## What is `getStaticPaths()`?

Defines dynamic pages generated during build.

Example:

```javascript
getStaticPaths()
```

Works with:

```javascript
getStaticProps()
```

---

## What is Shallow Routing?

Changes URL without re-running data fetching.

Useful for:

* Filters
* Search
* Pagination

---

## What is Lazy Loading?

Loads components only when needed.

Example:

```javascript
const Chart = dynamic(() => import("./Chart"));
```

Benefits:

* Smaller bundle
* Faster first load

---

## What is Dynamic Import?

Loads components asynchronously.

Example:

```javascript
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"));
```

---

## SEO in Next.js

Next.js improves SEO using:

* SSR
* Metadata
* Fast loading
* Static generation

---

## Adding Metadata

Using App Router:

```javascript
export const metadata = {
  title: "Home",
  description: "Welcome"
};
```

---

## What is Prefetching?

The `Link` component automatically loads linked pages in the background.

Benefits:

* Faster navigation
* Better UX

---

## What is the Link Component?

Used for client-side navigation.

Example:

```jsx
<Link href="/about">
  About
</Link>
```

No full page reload.

---

## `<a>` vs `Link`

| `<a>`              | `Link`                 |
| ------------------ | ---------------------- |
| Full page reload   | Client-side navigation |
| Slower             | Faster                 |
| Browser navigation | SPA navigation         |

---

## What is Caching?

Caching stores data temporarily for faster access.

Benefits:

* Faster response
* Lower server load

---

## What is Edge Runtime?

Runs code closer to users using edge servers.

Benefits:

* Lower latency
* Faster response

Commonly used with Middleware.

---

## What are Layouts?

Layouts share common UI.

Example:

* Navbar
* Sidebar
* Footer

Benefits:

* Prevent unnecessary re-rendering
* Better organization

---

## What is Streaming?

Streaming sends UI in parts instead of waiting for the entire page.

Benefits:

* Faster perceived loading
* Better user experience

---

## What is Suspense?

Shows fallback UI while content loads.

Example:

```jsx
<Suspense fallback={<Loading />}>
  <Products />
</Suspense>
```

---

## What is Route Grouping?

Organizes routes without changing the URL.

Example:

```text
(app)
(admin)
```

Improves project organization.

---

## Authentication in Next.js

Common authentication methods:

* JWT
* OAuth
* Session Authentication
* NextAuth.js

---

## Environment Variables

Client:

```text
NEXT_PUBLIC_API_URL=https://api.com
```

Server only:

```text
DATABASE_URL=mysql://...
```

Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## How Next.js Improves Performance

* SSR
* SSG
* ISR
* Image Optimization
* Code Splitting
* Streaming
* Caching
* Server Components

---

## Common Next.js Interview Coding Tasks

* Authentication
* CRUD APIs
* Dashboard
* Pagination
* Dynamic Routing
* Form Handling
* API Integration
* SSR/SSG
* Performance Optimization

---

## Common Challenges

* Hydration errors
* Server vs Client Components confusion
* SEO issues
* Caching issues
* Deployment configuration

---

## What is a Hydration Error?

Occurs when server-rendered HTML differs from client-rendered HTML.

Common causes:

* `Math.random()`
* `Date.now()`
* Browser-only APIs on the server

---

## Deployment Platforms

* Vercel
* Netlify
* AWS
* Docker

Vercel is the official platform for Next.js.

---

## Server Actions vs API Routes

| Server Actions                  | API Routes             |
| ------------------------------- | ---------------------- |
| Called directly from components | Expose REST APIs       |
| Less boilerplate                | External communication |
| App Router                      | Pages/App Router       |

---

## Common Hooks

* useState
* useEffect
* useRouter
* usePathname
* useSearchParams

---

## What is `useRouter`?

Used for programmatic navigation.

Example:

```javascript
const router = useRouter();

router.push("/dashboard");
router.replace("/login");
router.back();
```

---

## React vs Next.js Lifecycle

| React             | Next.js                   |
| ----------------- | ------------------------- |
| Browser rendering | Server + Client rendering |
| UI only           | Full-stack framework      |
| CSR               | SSR, SSG, ISR, CSR        |

---

## Real-world Next.js Project

A production-grade Next.js application typically includes:

* Authentication
* Dashboard
* API Integration
* Responsive UI
* SSR & SSG
* Image Optimization
* Caching
* App Router
* Server Components
* Deployment on Vercel/AWS

---

## Environment Variable Example

```env
NEXT_PUBLIC_API_URL=https://api.com
DATABASE_URL=mysql://localhost:3306/mydb
JWT_SECRET=mysecretkey
```