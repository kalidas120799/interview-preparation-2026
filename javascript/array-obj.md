# What is Shallow Copy?

A shallow copy copies only the first level of an object or array.

If the copied value is modified directly, it may affect the original data when nested objects or arrays are shared.

### Example

```js
const arr = [1, 2, 3, 4];

const newArr = arr;

newArr.splice(1, 2);

console.log(newArr);
console.log(arr);
```

---

# What is Deep Copy?

A deep copy creates a completely independent copy.

Modifying the copied data does **not** affect the original data.

### Array Copy

```js
const arr = [1, 2, 3, 4];

const newArr1 = [...arr];

const newArr2 = Array.from(arr);
```

> **Note:** Spread (`...`) and `Array.from()` perform a deep copy only for **primitive arrays**. For nested objects or arrays, they still create a **shallow copy**.

---

# Common Array Methods

| Method | Purpose |
|---------|---------|
| `forEach()` | Iterates through each element |
| `map()` | Creates a new array by transforming elements |
| `filter()` | Returns elements matching a condition |
| `reduce()` | Reduces array into a single value |
| `concat()` | Merges arrays |
| `slice()` | Returns a portion of an array |
| `splice()` | Adds or removes elements from the original array |
| `sort()` | Sorts the original array |
| `push()` | Adds element to the end |
| `pop()` | Removes element from the end |
| `shift()` | Removes first element |
| `unshift()` | Adds element at the beginning |
| `find()` | Returns first matching element |
| `findIndex()` | Returns index of first matching element |
| `includes()` | Checks whether an element exists |

---

# Difference Between slice() and splice()

| Feature | slice() | splice() |
|----------|----------|-----------|
| Purpose | Creates a new array | Modifies the original array |
| Original Array | Not Modified | Modified |
| Return Value | New Array | Removed Elements |

### slice()

```js
const fruits = ["apple", "banana", "orange", "mango", "kiwi"];

const subArray = fruits.slice(1, 3);

console.log(fruits);
// ["apple", "banana", "orange", "mango", "kiwi"]

console.log(subArray);
// ["banana", "orange"]
```

### splice()

```js
const fruits = ["apple", "banana", "orange", "mango", "kiwi"];

fruits.splice(2, 1, "grapefruit");

console.log(fruits);

// ["apple", "banana", "grapefruit", "mango", "kiwi"]
```

---

# Common Object Methods

| Method | Purpose |
|---------|---------|
| `Object.assign()` | Copies properties from one object to another |
| `Object.create()` | Creates an object using another object as its prototype |
| `hasOwnProperty()` | Checks whether a property belongs directly to the object |
| `Object.entries()` | Returns an array of `[key, value]` pairs |
| `Object.keys()` | Returns all keys |
| `Object.values()` | Returns all values |
| `Object.freeze()` | Prevents adding, removing, or modifying properties |
| `Object.isFrozen()` | Checks whether an object is frozen |

---

# What is __proto__?

`__proto__` is a property that points to an object's prototype.

It allows access to inherited properties and methods.

### Example

```js
const person = {
  name: "Kalidas",
};

console.log(person.__proto__);
```

---

# What is Prototype?

Every JavaScript function has a `prototype` property.

Objects created using a constructor function inherit properties and methods from that prototype.

Using prototypes helps reduce memory usage because methods are shared instead of being recreated for every object.

### Example

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello ${this.name}`);
};

const user1 = new Person("Kalidas");
const user2 = new Person("John");

user1.greet();
user2.greet();
```

### Prototype Chain

```txt
Object
   ↑
Prototype
   ↑
Instance
```