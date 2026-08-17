## Objects & Prototypes

### How can you create an object?
Objects can be created using object literals, constructors, classes, or `Object.create`. Object literals are the most common for simple objects.

```js
const user = { name: "Kalidas" };
```

### What is `this`?
`this` refers to the execution context's receiver and its value depends on how a function is called. Arrow functions do not have their own `this`; they capture it lexically.

```js
const user = {
  name: "Kalidas",
  greet() { return this.name; }
};
```

### What is a constructor function?
A constructor function is a regular function traditionally used with `new` to create objects and initialize their properties. Classes provide a more modern syntax over prototype-based behavior.

```js
function User(name) {
  this.name = name;
}
const user = new User("Kalidas");
```

### What is a prototype?
A prototype is an object from which another object can inherit properties and methods. JavaScript uses prototypes to implement inheritance and method sharing.

```js
const user = { name: "Kalidas" };
console.log(Object.getPrototypeOf(user));
```

### What is the prototype chain?
If a property is not found directly on an object, JavaScript searches its prototype and then that prototype's prototype until it reaches `null`. This is called the prototype chain.

```js
const user = {};
console.log(user.toString); // found through the chain
```

### What is `Object.create()`?
`Object.create()` creates a new object with a specified prototype. It is useful when you want explicit prototype-based inheritance.

```js
const person = { greet() { return "Hi"; } };
const user = Object.create(person);
```

### What are JavaScript classes?
Classes provide syntax for creating objects and defining methods and inheritance. Internally, JavaScript classes still use the prototype system.

```js
class User {
  constructor(name) { this.name = name; }
  greet() { return `Hi ${this.name}`; }
}
```

### What is inheritance?
Inheritance allows an object or class to reuse behavior from another object or class. In JavaScript, class inheritance is implemented using prototypes.

```js
class Admin extends User {
  deleteUser() {}
}
```

### What is encapsulation?
Encapsulation means keeping implementation details controlled behind a public interface. JavaScript supports this through closures and private class fields.

```js
class Counter {
  #count = 0;
  increment() { this.#count++; }
}
```

### What are static methods?
Static methods belong to the class itself rather than instances created from it. They are useful for utility or factory operations.

```js
class MathUtil {
  static add(a, b) { return a + b; }
}
MathUtil.add(2, 3);
```

### What are getters and setters?
Getters allow property-like access to a method, while setters control assignment to a property. They are useful for validation and computed values.

```js
class User {
  get name() { return this._name; }
  set name(value) { this._name = value.trim(); }
}
```

### What is the difference between `Object.freeze()` and `Object.seal()`?
`freeze()` prevents adding, deleting, or changing existing properties, while `seal()` prevents adding or deleting properties but allows changing writable values. Both are shallow operations.

```js
const a = Object.freeze({ x: 1 });
const b = Object.seal({ x: 1 });
```

### What are property descriptors?
Property descriptors control attributes such as `writable`, `enumerable`, and `configurable`. They allow fine-grained control over object properties.

```js
Object.defineProperty(obj, "x", {
  value: 10,
  writable: false
});
```

### What is `instanceof`?
`instanceof` checks whether an object's prototype chain contains a constructor's `prototype`. It is commonly used to test class or constructor relationships.

```js
class User {}
const user = new User();
user instanceof User; // true
```

### What is `Object.hasOwn()`?
`Object.hasOwn()` checks whether a property directly belongs to an object rather than being inherited. It is a modern alternative to calling `hasOwnProperty()`.

```js
Object.hasOwn(user, "name");
```

### What is a mixin?
A mixin is a technique for adding reusable behavior from one object into another without traditional inheritance. It is often implemented with `Object.assign()`.

```js
const canLog = {
  log() { console.log("log"); }
};
Object.assign(User.prototype, canLog);
```

### What is the difference between `__proto__` and `prototype`?
`prototype` is a property on constructor functions and defines the object used for instances' inheritance. `__proto__` is an accessor for an object's actual prototype and should generally be avoided in favor of standard APIs.

```js
function User() {}
console.log(User.prototype);
const user = new User();
console.log(Object.getPrototypeOf(user));
```

---


## Arrays & Built-in Methods

### What does `map()` do?
`map()` creates a new array by transforming every element using a callback. It does not modify the original array.

```js
const result = [1, 2, 3].map(x => x * 2);
// [2, 4, 6]
```

### What does `filter()` do?
`filter()` creates a new array containing elements for which the callback returns a truthy value.

```js
const result = [1, 2, 3, 4].filter(x => x % 2 === 0);
// [2, 4]
```

### What does `reduce()` do?
`reduce()` processes an array and accumulates the values into a single result. It is useful for sums, grouping, transformations, and building objects.

```js
const total = [1, 2, 3].reduce((sum, x) => sum + x, 0);
// 6
```

### What is `forEach()`?
`forEach()` executes a callback for each array element but does not create a new array. It is best for side effects rather than transformations.

```js
[1, 2, 3].forEach(x => console.log(x));
```

### What are `find()` and `findIndex()`?
`find()` returns the first matching element, while `findIndex()` returns the index of the first matching element. If no match exists, they return `undefined` and `-1`.

```js
const users = [{ id: 1 }, { id: 2 }];
users.find(u => u.id === 2);
```

### What do `some()` and `every()` do?
`some()` checks whether at least one element passes a condition, while `every()` checks whether all elements pass it.

```js
[1, 2, 3].some(x => x > 2);  // true
[1, 2, 3].every(x => x > 0); // true
```

### What does `includes()` do?
`includes()` checks whether an array or string contains a specified value. It returns a boolean.

```js
[1, 2, 3].includes(2); // true
```

### What is special about `sort()`?
`sort()` mutates the original array and converts elements to strings by default. For numbers, provide a comparator.

```js
[10, 2, 5].sort((a, b) => a - b);
// [2, 5, 10]
```

### What is the difference between `slice()` and `splice()`?
`slice()` returns a portion without changing the original array, while `splice()` adds/removes elements and mutates the original array.

```js
const a = [1, 2, 3];
a.slice(1);  // [2, 3]
a.splice(1, 1); // removes 2
```

### What does `concat()` do?
`concat()` creates a new array by combining arrays or values without mutating the original array.

```js
[1, 2].concat([3, 4]);
// [1, 2, 3, 4]
```

### What do `flat()` and `flatMap()` do?
`flat()` removes nested array levels up to a specified depth, while `flatMap()` maps elements and then flattens one level. They are useful for nested data transformations.

```js
[[1], [2, 3]].flat();
// [1, 2, 3]
```

### What is `Array.from()`?
`Array.from()` creates a real array from an iterable or array-like value. It is useful with strings, Sets, NodeLists, and other array-like objects.

```js
Array.from("abc");
// ["a", "b", "c"]
```

### What is `Array.isArray()`?
`Array.isArray()` reliably checks whether a value is an array. It is preferred over `typeof`, because `typeof []` returns `"object"`.

```js
Array.isArray([]); // true
```

### What does `fill()` do?
`fill()` replaces array elements with a specified value within an optional range. It mutates the original array.

```js
const a = [1, 2, 3];
a.fill(0); // [0, 0, 0]
```

### What is `copyWithin()`?
`copyWithin()` copies part of an array to another position within the same array without changing its length. It mutates the original array.

```js
const a = [1, 2, 3, 4];
a.copyWithin(1, 2); // [1, 3, 4, 4]
```

### What are array `entries()`, `keys()`, and `values()`?
They return iterators for index-value pairs, indexes, and values respectively. They are commonly consumed with `for...of`.

```js
for (const [i, value] of ["a", "b"].entries()) {
  console.log(i, value);
}
```

### What is `reduceRight()`?
`reduceRight()` works like `reduce()` but processes the array from right to left. It is useful when operation order matters.

```js
const result = ["a", "b", "c"].reduceRight((acc, x) => acc + x, "");
// "cba"
```

### What is a sparse array?
A sparse array contains missing indexes rather than explicit `undefined` values. Some array methods skip these empty slots.

```js
const a = [];
a[2] = "x";
console.log(a.length); // 3
```

---


## Strings, Numbers & Objects

### What are string methods?
JavaScript provides methods such as `includes`, `startsWith`, `endsWith`, `slice`, `replace`, `split`, and `trim` for string processing. Strings are immutable, so these methods return new strings rather than modifying the original.

```js
const name = " Kalidas ";
console.log(name.trim().toUpperCase());
```

### What are common Number and Math operations?
`Number` provides conversion and validation utilities, while `Math` provides mathematical functions. Common methods include `Number.isNaN`, `Number.isInteger`, `Math.floor`, and `Math.random`.

```js
Math.floor(4.9); // 4
Number.isInteger(10); // true
```

### What is `Date`?
The `Date` object represents a point in time and provides methods for reading and formatting date components. For complex date/time handling, applications often use dedicated libraries or modern platform APIs.

```js
const now = new Date();
console.log(now.toISOString());
```

### What is RegExp?
Regular expressions are patterns used to search, validate, and replace text. JavaScript supports them through regex literals and the `RegExp` constructor.

```js
const pattern = /^\d+$/;
pattern.test("123"); // true
```

### What do `Object.keys()`, `values()`, and `entries()` do?
They return an array of an object's own enumerable property keys, values, or key-value pairs. They are useful for iterating over object data.

```js
const user = { name: "A", age: 30 };
Object.keys(user);   // ["name", "age"]
Object.values(user); // ["A", 30]
```

### What does `Object.assign()` do?
`Object.assign()` copies enumerable own properties from source objects into a target object. It performs a shallow copy.

```js
const result = Object.assign({}, { a: 1 }, { b: 2 });
```

### What is shallow copy vs deep copy?
A shallow copy copies only the top-level structure, so nested objects can still share references. A deep copy recursively copies nested data so changes do not affect the original.

```js
const copy = { ...user }; // shallow
const deep = structuredClone(user); // deep
```

### What is `structuredClone()`?
`structuredClone()` creates a deep clone using the structured clone algorithm and supports many built-in data types. It is safer for general deep cloning than JSON-based cloning.

```js
const copy = structuredClone({ user: { name: "A" } });
```

### What are `JSON.stringify()` and `JSON.parse()`?
`JSON.stringify()` converts a JavaScript value to a JSON string, while `JSON.parse()` converts valid JSON text back into a JavaScript value. Replacer and reviver functions can customize serialization and parsing.

```js
const text = JSON.stringify({ id: 1 });
const obj = JSON.parse(text);
```

### What are `parseInt()` and `parseFloat()` gotchas?
`parseInt()` parses an integer from the beginning of a string, while `parseFloat()` parses a floating-point number. `parseInt` should usually receive an explicit radix when parsing integers.

```js
parseInt("10px", 10); // 10
parseFloat("10.5px"); // 10.5
```

### What is `NaN`?
`NaN` means Not-a-Number and represents an invalid numeric result; importantly, it is not equal to itself. `Number.isNaN()` is safer than global `isNaN()` because it does not perform coercion.

```js
Number.isNaN(NaN); // true
NaN === NaN;       // false
```

### What are `Infinity` and `-Infinity`?
They represent positive and negative infinity in JavaScript's numeric system. They can result from operations such as division by zero.

```js
console.log(1 / 0);  // Infinity
console.log(-1 / 0); // -Infinity
```

### What are `toFixed()` and `toPrecision()`?
`toFixed()` formats a number with a fixed number of decimal places, while `toPrecision()` formats it to a specified number of significant digits. Both return strings.

```js
(12.345).toFixed(2);     // "12.35"
(12.345).toPrecision(4); // "12.35"
```

### Are strings mutable?
No. JavaScript strings are immutable, meaning string operations create new strings rather than changing the original string.

```js
let s = "hello";
s.toUpperCase();
console.log(s); // "hello"
```

---