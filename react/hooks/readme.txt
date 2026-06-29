What are Hooks?
Hooks are special functions introduced in React 16.8 that allow functional components to manage state, side effects, and lifecycle behavior without using class 
components.

useState
useState is a hook that allows functional components to manage local state by returning the current state value and a function to update it.

useEffect
useEffect is used to handle side effects such as API calls, subscriptions, and DOM updates, running after render and optionally controlled by a dependency array.

useRef
useRef is used to persist values across renders without triggering re-renders and is commonly used to access DOM elements, timers, or previous values.

useMemo
useMemo memoizes the result of expensive calculations and recalculates them only when dependencies change, helping optimize component performance.

useCallback
useCallback memoizes function references so they are not recreated on every render, improving performance when passing callbacks to child components.

useReducer
useReducer is a hook used for managing complex state logic using a reducer function and actions, offering better structure and predictability than useState.

What are custom hooks?
Custom hooks are reusable functions that use built-in hooks to share logic across components without repeating code or using HOCs/render props.

Rules of custom hooks
Custom hooks must start with use, call hooks at the top level, and follow the same rules as built-in hooks.

Custom hooks vs utility functions
Custom hooks can use other hooks and manage React state/lifecycle. Utility functions are plain JavaScript helpers without React awareness.

useOptimistic
useOptimistic is a React 19 hook used to update UI immediately before an async action completes. It creates a temporary optimistic state assuming the server will 
succeed and rolls back if it fails. This improves user experience by giving instant feedback instead of waiting for API response.

useActionState
useActionState is a React 19 hook to manage async actions like form submission with state, result, and loading flag. It replaces multiple useState calls by returning 
state, action function, and pending status. This makes form handling and API logic cleaner and less boilerplate.

startTransition
startTransition is used to mark state updates as low-priority (non-urgent updates). It allows React to keep UI responsive while heavy updates run in background. 
Usually wrapped around expensive updates like filtering or navigation.

useTransition
useTransition is a hook that enables non-blocking UI updates using transitions. It returns isPending and startTransition to control background rendering. Helps 
prioritize user interactions like typing over heavy rendering work.

useDeferredValue
useDeferredValue delays updating a value until urgent updates finish. It returns a deferred version of a value to avoid UI lag during heavy renders. Useful in 
search/filter scenarios with large datasets.

useId
useId generates a unique, stable ID for elements, mainly for accessibility. It ensures consistent IDs across server and client rendering. Commonly used for linking 
labels and inputs.

useState vs useTransition
-------------------------
useState is used for urgent state updates that must reflect immediately in the UI.
useTransition is used to mark non-urgent updates that can be deferred.
Using both together keeps the UI responsive during heavy rendering.
This is especially useful for search, filtering, and large data rendering.

Examples
--------
E-commerce
- Typing product search -> urgent
- Filtering product grid -> transition

Dashboard
- Clicking dropdown -> urgent
- Recalculating graphs -> transition

Admin panel
- Typing user name -> urgent
- Rendering filtered table -> transition
