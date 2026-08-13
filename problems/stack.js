function removeStarFromStr(str) {
    const strArr = str.split("");
    const stack = [];
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === "*" && stack.length !== 0) stack.pop();
        else stack.push(strArr[i]);
    }

    return stack.join("")
}

console.log(removeStarFromStr("goo**gle*")) // ggl
console.log(removeStarFromStr("erase*****")) //

// https://leetcode.com/problems/valid-parentheses/
function isValidParentheses(str) {
    const strArr = str.split("");
    const parentheses = { "{": "}", "[": "]", "(": ")" };
    const open = ["{", "(", "["]
    const stack = [];

    for (let i = 0; i < strArr.length; i++) {
        if (open.includes(strArr[i])) stack.push(strArr[i]);
        else {
            let lastItem = stack[stack.length - 1];
            if (strArr[i] == parentheses[lastItem]) stack.pop()
        }
    }

    return stack.length === 0
}

console.log(isValidParentheses("{([])}")) // true
console.log(isValidParentheses("([)")) // false

// https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string
function removeAdjacent(str) {
    const strArr = str.split("");
    const stack = [];

    for (let i = 0; i < strArr.length; i++) {
        let prevItem = stack[stack.length - 1];
        if (strArr[i] === prevItem) stack.pop();
        else stack.push(strArr[i]);
    }

    return stack.join("")

}

console.log(removeAdjacent("abbaca")) // ca
console.log(removeAdjacent("azxxzy")) // ay

// https://leetcode.com/problems/evaluate-reverse-polish-notation
function evalRPN(arr) {
    const operators = new Set(["+", "-", "*", "/"]);
    const stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (!operators.has(arr[i])) stack.push(parseInt(arr[i]));
        else {
            if (stack.length >= 2) {
                let val1 = stack.pop();
                let val2 = stack.pop();
                let operator = arr[i];
                if (operator == "+") stack.push((parseInt(val2) + parseInt(val1)))
                if (operator == "-") stack.push((parseInt(val2) - parseInt(val1)))
                if (operator == "*") stack.push((parseInt(val2) * parseInt(val1)))
                if (operator == "/") stack.push((parseInt(val2) / parseInt(val1)))
            }
        }
    }
    return stack.join("")
}

console.log(evalRPN(["4","13","5","/","+"])) // 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])) // 22
