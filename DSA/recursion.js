// 1*2*3*4*5
function factorialRec(n) {
   if (n <= 1) return 1;
   return n * factorialRec(n - 1)
}

console.log(factorialRec(5)) // 120

// 0, 1, 1, 2, 3
function fibonacciRec(n, memo = {}) {
   if (n in memo) return memo[n];
   if (n == 1) return 0;
   if (n == 2) return 1;
   memo[n] = fibonacciRec(n - 1, memo) + fibonacciRec(n - 2, memo);
   return memo[n];
}

console.log(fibonacciRec(5)) // 3 (0,1,1,2,3)

function sumOfNoRec(n) {
   if (n <= 1) return 1;
   return n + sumOfNoRec(n - 1)
}

console.log(sumOfNoRec(4)) //  10 (1+2+3+4)

function powRec(base, n) {
   if (n === 0) return 1;
   return base * powRec(base, (n - 1))
}

console.log(powRec(2, 4), Math.pow(2, 4)) // 2^4 16
console.log(powRec(3, 3), Math.pow(3, 3)) // 3^3 27

function isPowerRec(base, num) {
   if (num === 1) {
      return true;
   } else if (num % base !== 0 || num < 1) {
      return false;
   }
   return isPowerRec(base, (num / base));
}

console.log(isPowerRec(2, 16)) // true 2^4 16
console.log(isPowerRec(3, 3)) // true 


function flatRec(item, result = []) {
   if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
         flatRec(item[i], result);
      }
   } else {
      result.push(item);
   }
   return result;
}

console.log(flatRec([1, 2, 3, [4, [5, [0], 6]], 7, [8]])) // [1,2,4,5,0,6,7,8]

function isPrimeRec(n, i = 2) {
   if (n < 2) return false;

   if (i * i > n) {
      return true;
   }

   if (n % i === 0) {
      return false;
   }

   return isPrime(n, i + 1);
}

console.log(isPrimeRec(1));  // false
console.log(isPrimeRec(83));  // true