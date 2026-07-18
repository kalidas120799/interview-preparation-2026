## What is React?

React is a JavaScript library used to build fast and interactive user interfaces using a component-based architecture, virtual DOM for performance optimization, and a declarative programming approach mainly for single-page applications.

## What is JSX?

JSX is a syntax extension for JavaScript that allows writing HTML-like code inside JavaScript, which is later transformed into React.createElement calls to improve readability and developer productivity.

## What is Virtual DOM?

Virtual DOM is an in-memory representation of the real DOM that React updates first and then efficiently syncs with the actual DOM using a diffing algorithm to minimize costly DOM operations.

## Difference between React and ReactDOM?

React is responsible for creating components and managing UI logic, while ReactDOM handles rendering those components into the browser DOM and interacting with platform-specific APIs.

## What is a component?

A component is a reusable and independent UI block that encapsulates structure, behavior, and styling, returning JSX and helping build scalable and maintainable React applications.

## Functional vs Class components?

Functional components use hooks to manage state and lifecycle logic, are simpler and more readable, while class components use lifecycle methods and are less preferred in modern React.

## What are props?

Props are read-only inputs passed from parent to child components that help in data sharing, customization, and making components reusable without modifying internal state.

## What is state?

State is a mutable data object managed within a component that represents dynamic data and triggers re-rendering when updated using hooks like useState or useReducer.

## What is local component state?

Local state is data maintained within a single component using useState, mainly for UI-related values that do not need to be shared across the application.

## Controlled components

Controlled components store form input values in React state and update them through event handlers, giving full control over validation, behavior, and form submission.

## Uncontrolled components

Uncontrolled components rely on the DOM to manage form data and typically use refs to access values, making them simpler but less flexible than controlled components.

## Lifting state up

Lifting state up means moving shared state to the nearest common parent so that sibling components can access and modify the same data.

## Prop drilling

Prop drilling occurs when props are passed through multiple component levels unnecessarily, making code harder to maintain and often solved using Context or state libraries.

## Context API

Context API provides a way to share global data like theme or authentication across components without passing props manually at every level.

## Context vs Props

Props are explicit and component-scoped, while Context provides global access but may cause unnecessary re-renders if not used carefully.

## React.memo

React.memo prevents unnecessary re-renders of functional components by memoizing them based on shallow comparison of props.

## Keys in React

Keys help React identify list elements uniquely during rendering, improving reconciliation performance and preventing UI bugs.

## Lazy loading

Lazy loading loads components only when needed using React.lazy and Suspense, reducing initial bundle size and improving page load time.

## How do you make API calls in React?

API calls are typically made inside useEffect using fetch or axios, with proper handling of loading, success, and error states.

## Cleanup function in useEffect

Cleanup functions are returned from useEffect to remove subscriptions, event listeners, or cancel requests to prevent memory leaks.

## What is React Router?

React Router is a popular library for handling client-side navigation in React applications, enabling dynamic routing without page reloads.

## useParams

useParams extracts dynamic parameters from the URL and is commonly used in detail or profile pages based on route values.

## What is Redux?

Redux is a predictable global state management library that maintains application state in a single store and updates it through actions and reducers.

## Redux flow

Redux follows a unidirectional data flow where components dispatch actions, reducers update the state, and subscribed components re-render.

## Redux Toolkit

Redux Toolkit is the official recommended approach that simplifies Redux code using utilities like createSlice and built-in immutability.

## What is React Query?

React Query is a server-state management library that handles data fetching, caching, background refetching, and synchronization automatically.

## React Query vs Redux

React Query is best for managing server data, while Redux is better for client UI state, and both can be used together effectively.

## Error boundaries

Error boundaries catch JavaScript errors in the component tree and render fallback UI instead of crashing the entire application.

## Testing React applications

React apps are commonly tested using Jest and React Testing Library, focusing on user interaction rather than internal component implementation.

## CSR vs SSR

Client-side rendering renders content in the browser, while server-side rendering renders HTML on the server, improving SEO and initial load time.

## State vs Props

State is mutable and managed within a component, whereas props are immutable data passed from parent components.

## Explain React architecture at a high level (how UI updates happen).

React updates UI in a predictable pipeline: it first "renders" components to compute the next UI, then reconciles differences between old and new trees, and finally commits minimal changes to the DOM. This separation helps performance and enables scheduling in modern React. React may render without committing if nothing changed visually.

## What are the Render phase and Commit phase?

The render phase is React calling your components to calculate what the UI should look like, and it should be pure and side‑effect free. The commit phase is when React applies the calculated changes to the DOM and runs effects. In concurrent rendering, the render phase can be interruptible while commit is not.

## What is reconciliation?

Reconciliation is React's process of comparing the previous and next element trees to determine what changed. React uses heuristics (including keys) to do this efficiently instead of expensive generic tree diffing. The outcome is a set of operations that will be applied during commit.

## What is React Fiber? Why was it introduced?

Fiber is React's internal architecture that breaks rendering work into units so React can schedule, pause, resume, or abandon work for better responsiveness. It improves React's ability to prioritize urgent updates (typing, clicks) over non‑urgent updates (large list rendering). This is a key foundation for concurrent features.

## What is Concurrent Rendering in React 18?

Concurrent rendering is a behind‑the‑scenes capability that lets React prepare multiple versions of the UI and keep the app responsive by interrupting rendering work. It's not "multi-threading UI," but better scheduling and prioritization. React enables it only when you use concurrent features and the modern root API.

## What are automatic batching and why do they matter?

Automatic batching groups multiple state updates into a single render for better performance and fewer unnecessary re-renders. React 18 expands batching beyond just React event handlers, which reduces UI work in async flows too. This makes updates more efficient with less code.

## What is Suspense (architecture view)?

Suspense is a coordination mechanism that lets parts of the UI "wait" while code or data is loading and show a fallback meanwhile. It integrates with streaming SSR and hydration optimizations to reveal UI progressively. Suspense is about rendering orchestration, not a data-fetching library by itself.

## What is hydration and selective hydration (conceptually)?

Hydration is attaching event handlers and making server-rendered HTML interactive on the client. With modern React + Suspense, hydration can be coordinated so important UI becomes interactive earlier while other sections hydrate later. This improves perceived performance under heavy pages.

## What is Component‑Based Architecture in React?

Component-based architecture breaks UI into reusable components that can be composed across modules. It improves parallel development, testability, and maintainability when components are well designed. Poorly designed components can cause duplication and deep nesting complexity.

## What are Server Components vs Client Components (concept)?

Server Components run on the server and don't ship their JavaScript to the browser, reducing bundle size and improving performance. Client Components run in the browser and enable interactivity via state/effects and event handlers. A good rule is to push "use client" down to the smallest interactive leaf.

## What is a Class Component?

A class component is a JavaScript class that extends React.Component and can hold state and lifecycle methods. It uses render() to return JSX. Class components are older but still exist in many legacy codebases.

## State management in class components

State is managed using this.state and updated via this.setState, which schedules a re-render and merges changes shallowly.

## Lifecycle methods in class components

Lifecycle methods include componentDidMount, componentDidUpdate, componentWillUnmount, and others that allow running code at specific stages of a component's life.

## componentDidMount vs useEffect

componentDidMount runs once after the component mounts. useEffect with an empty dependency array behaves the same in functional components but supports cleanup and dependency control.

## componentWillUnmount vs cleanup in useEffect

componentWillUnmount runs before a component is destroyed. In hooks, cleanup functions in useEffect serve the same purpose.

## What is React.Fragment?

React.Fragment lets you group multiple elements without adding extra nodes to the DOM. It helps keep the DOM clean and avoids unnecessary wrappers.

## Short syntax for Fragment (<> </>)

The shorthand fragment syntax is a cleaner way to wrap multiple JSX elements without importing Fragment explicitly, but it doesn't support keys.

## Why are extra divs bad in React?

Extra divs increase DOM depth, affect layout/CSS, and reduce performance slightly. Fragments help avoid this problem.

## What are refs in React?

Refs provide a way to directly access DOM elements or store mutable values that don't trigger re-renders.

## When should you use refs?

Refs are used for focus control, text selection, animations, scrolling, or integrating third‑party DOM libraries.

## Refs vs state

State triggers re-renders and represents UI data, while refs store mutable values without causing re-rendering.

## Composition vs inheritance in React

React favors composition where components are built by combining smaller components rather than inheriting behavior from parent classes.

## Children props pattern

The children prop allows components to receive and render nested content, making layouts flexible and reusable.

## Render props pattern (high level)

Render props pass a function as a prop to share dynamic rendering logic between components. Hooks replaced this pattern in most cases.

## Why does React re-render a component?

A component re-renders when its state, props, or consumed context changes, or when its parent re-renders.

## Shallow comparison in React.memo

React.memo uses shallow comparison, so new object or function references can cause re-renders even if values didn't change.

## Why not over‑optimize early?

Premature optimization increases complexity and bugs. React apps should be profiled first before applying memoization.

## Synthetic events in React

React wraps browser events into synthetic events for consistent behavior across browsers and better performance.

## Event delegation in React

React attaches event listeners at the root instead of individual nodes, improving performance and memory usage.

## Why does StrictMode double render in dev?

It intentionally re-invokes render and effects to detect unsafe side effects and non-idempotent logic. This only happens in development.

## How do you avoid race conditions in API calls?

By tracking active requests, aborting fetches, or ignoring stale responses when components unmount or dependencies change.

## Single source of truth

Data should be owned by one component/state location so UI stays consistent and predictable.

## Derived state anti-pattern

State that can be calculated from props or other state should not be stored separately, to avoid inconsistencies.

## When NOT to use global state?

When state is local to a component or feature and doesn't need cross-app access.
