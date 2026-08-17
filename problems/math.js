// 1*2*3*4*5
function factorial(num) {
    let ans = 1;

    for (var i = 1; i <= num; i++) {
        ans = ans * i;
    }
    return ans

}

console.log(factorial(5)) //120

// 0, 1, 1, 2, 3
function fibonacci(num) {
    let a = 0, b = 1;
    let ans = 0
    for (var i = 0; i < num; i++) {
        ans = a;;
        const c = a + b;
        a = b;
        b = c
    }
    return ans
}

console.log(fibonacci(5))

function sumOfNo(n) {
    let sum = 0;
    for (var i = 1; i <= n; i++) {
        sum = sum + i
    }
    return sum;
}

console.log(sumOfNo(4)) // 10 (1+2+3+4)

function pow(base, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result = result * base;
    }

    return result;
}
console.log(pow(2, 4), Math.pow(2, 4)) // 2^4 16

function isPower(base, num) {
   if (num < 1) return false;

   while (num > 1) {
      if (num % base !== 0) {
         return false;
      }
      num = num / base;
   }

   return true;
}
console.log(isPower(2, 16)) // true 2^4 16

function isPrime(n) {
   if (n < 2) return false;

   for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
         return false;
      }
   }

   return true;
}

console.log(isPrime(7));  // true
console.log(isPrime(1));  // false