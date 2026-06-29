/******************************************************
 * 1. PAGE LOAD EVENTS
 ******************************************************/

// ✅ load - runs when full page (HTML + CSS + images) is loaded
// Usage: initialize app, third-party libraries
window.addEventListener("load", () => {
  console.log("✅ Page fully loaded");
});

/*
Usage:
- Safe to access DOM + images
- Start app initialization
*/

// ✅ DOMContentLoaded - runs when HTML is loaded (faster than load)
// Usage: render UI quickly
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM ready (HTML parsed)");
});

/*
Usage:
- Start UI rendering early
- Used in React debugging / vanilla apps
*/

// ✅ beforeunload - before leaving page
// Usage: prevent accidental navigation
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";
});

/*
Usage:
- Show warning popup
- Prevent form data loss
*/

/******************************************************
 * 2. WINDOW CHANGE EVENTS
 ******************************************************/

// ✅ resize - when browser window size changes
// Usage: responsive UI, layout updates
window.addEventListener("resize", () => {
  console.log("✅ Width:", window.innerWidth);
});

/*
Usage:
- Switch mobile / desktop UI
- Recalculate layout
*/

// ✅ scroll - triggered when user scrolls
// Usage: infinite scroll, lazy loading
window.addEventListener("scroll", () => {
  console.log("✅ Scroll position:", window.scrollY);
});

/*
Usage:
- Infinite scrolling
- Sticky headers
- Lazy load images
*/

/******************************************************
 * 3. KEYBOARD EVENTS
 ******************************************************/

// ✅ keydown - when key is pressed
// Usage: shortcuts (Ctrl + S)
window.addEventListener("keydown", (e) => {
  console.log("✅ Key pressed:", e.key);
});

/*
Usage:
- Keyboard shortcuts
- Input tracking
*/

// ✅ keyup - when key released
window.addEventListener("keyup", (e) => {
  console.log("✅ Key released:", e.key);
});

/******************************************************
 * 4. MOUSE EVENTS
 ******************************************************/

// ✅ click - global click detection
// Usage: close modal / dropdown
window.addEventListener("click", () => {
  console.log("✅ Click detected");
});

/*
Usage:
- Detect outside click
- Close popup
*/

// ✅ mousemove - mouse tracking
// Usage: drag & drop / canvas apps
window.addEventListener("mousemove", (e) => {
  console.log("✅ Mouse:", e.clientX, e.clientY);
});

/******************************************************
 * 5. FOCUS EVENTS
 ******************************************************/

// ✅ focus - tab active
window.addEventListener("focus", () => {
  console.log("✅ Tab is active");
});

// ✅ blur - tab inactive
window.addEventListener("blur", () => {
  console.log("✅ Tab is inactive");
});

/*
Usage:
- Pause videos
- Stop API polling
*/

/******************************************************
 * 6. NETWORK EVENTS
 ******************************************************/

// ✅ online - network restored
window.addEventListener("online", () => {
  console.log("✅ Back online");
});

// ✅ offline - network lost
window.addEventListener("offline", () => {
  console.log("❌ You are offline");
});

/*
Usage:
- Show offline banner
- Retry API calls
*/

/******************************************************
 * 7. INPUT / FORM EVENTS (via bubbling)
 ******************************************************/

// ✅ input - any input change (global)
window.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT") {
    console.log("✅ Input value:", e.target.value);
  }
});

/*
Usage:
- Live search (debounce)
- Form validation
*/

/******************************************************
 * 8. REAL INTERVIEW USE CASES (IMPORTANT)
 ******************************************************/

// ✅ Infinite Scroll Example
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("🚀 Load more data...");
  }
});

/*
Usage:
- Backend pagination
- Load more items dynamically
*/

// ✅ Responsive Layout Example
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    console.log("📱 Mobile Mode");
  } else {
    console.log("💻 Desktop Mode");
  }
});

// ✅ Keyboard Shortcut Example (Ctrl + S)
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("💾 Save Triggered");
  }
});

/******************************************************
 * 9. CLEANUP (VERY IMPORTANT IN REACT)
 ******************************************************/

function handleScroll() {
  console.log("scrolling...");
}

// Add
window.addEventListener("scroll", handleScroll);

// Remove
// window.removeEventListener("scroll", handleScroll);

/*
Usage:
- Prevent memory leaks
- Important in React useEffect cleanup
*/