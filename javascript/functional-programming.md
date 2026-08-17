## Functional Programming

### What is immutability?
Immutability means avoiding direct modification of existing data and instead creating new values. It makes state changes easier to reason about and is especially important in React.

```js
const user = { name: "A" };
const updated = { ...user, name: "B" };
```

### What is function composition?
Composition combines small functions into a larger operation where one function's output becomes another's input. It encourages reusable and focused functions.

```js
const result = addOne(double(3));
```

### What is currying?
Currying transforms a function with multiple parameters into a sequence of single-parameter functions. It can make reusable specialized functions easier to create.

```js
const add = a => b => a + b;
add(2)(3); // 5
```

### What is partial application?
Partial application creates a new function by pre-filling some arguments of another function. It differs from currying because the resulting function can still accept multiple remaining arguments.

```js
const multiply = (a, b) => a * b;
const double = b => multiply(2, b);
```

### What is function chaining?
Function chaining allows operations to be performed sequentially when each method returns a value that supports the next operation. Array methods are a common example.

```js
const result = [1, 2, 3]
  .filter(x => x > 1)
  .map(x => x * 2);
```

### What are `pipe` and `compose`?
Both combine functions, but `pipe` generally applies them left-to-right while `compose` applies them right-to-left. They are useful for building readable transformation pipelines.

```js
const pipe = (f, g) => x => g(f(x));
```

### What is point-free style?
Point-free style defines functions without explicitly mentioning their input arguments. It can make compositions concise, but excessive use can reduce readability.

```js
const double = x => x * 2;
const values = [1, 2, 3].map(double);
```

### What are transducers?
A transducer is an advanced abstraction for composing transformations independently of the input collection. It can combine operations without creating intermediate collections.

```js
// Conceptually: compose map/filter into one transformation.
```

### What are Functor and Monad concepts?
A Functor is commonly described as a structure that supports mapping over a contained value, while a Monad provides a way to sequence computations while preserving context. These are advanced functional-programming concepts rather than everyday JavaScript requirements.

```js
const value = Promise.resolve(10);
value.then(x => x * 2);
```

---