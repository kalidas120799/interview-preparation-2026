/*
Input → Array / String
Position → iterate i
Condition → if map has value OR not
Move → add / update map check before insert
Stop → end of array
Result → index / freq / count
*/

// =========================
// MAP (JS) - CHEAT SHEET
// =========================

// Create Map

let map = new Map();

// ADD / UPDATE

map.set("a", 1);
map.set("b", 2);
map.set("a", 10); // update

// ACCESS

map.get("a"); // 10
map.has("a"); // true
map.size; // number of keys

// DELETE

map.delete("a"); // remove key
map.clear(); // remove all

// ITERATION

// keys

for (let key of map.keys()) {
  console.log(key);
}

// values

for (let value of map.values()) {
  console.log(value);
}

// entries (key, value)

for (let [k, v] of map.entries()) {
  console.log(k, v);
}

// shortcut (default = entries)

for (let [k, v] of map) {
  console.log(k, v);
}

// forEach

map.forEach((value, key) => {
  console.log(key, value);
});

// MOST USED (INTERVIEW)

map.set(x, (map.get(x) || 0) + 1); // frequency
map.has(x); // check exist
map.get(x); // fetch value

// =========================
// SET (JS) - CHEAT SHEET
// =========================

// Create Set

let set = new Set();

// ADD

set.add(1);
set.add(2);
set.add(2); // ignored (no duplicate)

// ACCESS

set.has(1); // true
set.size; // number of elements

// DELETE

set.delete(1);
set.clear(); // remove all

// ITERATION

// values

for (let val of set.values()) {
  console.log(val);
}

// keys (same as values)

for (let val of set.keys()) {
  console.log(val);
}

// entries [value, value]

for (let pair of set.entries()) {
  console.log(pair);
}

// default iteration

for (let val of set) {
  console.log(val);
}

// forEach

set.forEach((val) => {
  console.log(val);
});

// CONVERSION

let arr = [...set]; // set → array

// MOST USED (INTERVIEW)

set.has(x); // check duplicate
set.add(x); // insert
set.delete(x); // remove
new Set(arr); // remove duplicates

// =========================
// Example
// Most Frequent Character
// =========================

function mostFrequentChar(str) {
  let map = new Map();
  let maxChar = "";
  let maxCount = 0;

  for (let ch of str) {
    map.set(ch, (map.get(ch) || 0) + 1);

    if (map.get(ch) > maxCount) {
      maxCount = map.get(ch);
      maxChar = ch;
    }
  }

  return maxChar;
}

console.log(mostFrequentChar("abacba")); // "a"