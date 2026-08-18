// Encode
function encode(strs) {
    let res = "";

    for (let s of strs) {
        res += s.length + "#" + s;
    }

    return res;
}

console.log(encode(["a", "bc", "cde"])); // 1#a2#bc3#cde


// Decode
function decode(s) {
    let res = [];
    let i = 0;

    while (i < s.length) {
        let j = i;

        while (s[j] !== "#") {
            j++;
        }

        let len = parseInt(s.substring(i, j));
        let word = s.substring(j + 1, j + 1 + len);

        res.push(word);

        i = j + 1 + len;
    }

    return res;
}

console.log(decode("1#a2#bc3#cde")); // ['a', 'bc', 'cde']


function problem1(str) {
    const strArr = str.split("");
    let output = "";

    for (let i = 0; i < strArr.length; i++) {
        if (parseInt(strArr[i])) {
            let prevStr = strArr[i - 1];
            let ascStr = prevStr.charCodeAt(0);
            output += String.fromCharCode(ascStr + parseInt(strArr[i]))
        } else output += strArr[i];
    }

    return output
}

console.log(problem1("a1b2c3d4")) // abbdcfdh


function stringDecompression(str) {
    const strArr = str.split("");
    let output = "";

    for (let i = 0; i < strArr.length; i++) {
        let parsed = parseInt(strArr[i]);
        if (parsed) {
            let prevStr = strArr[i - 1]

            output += prevStr.repeat(parsed);

            // let newStr = "";
            // while (parsed > 0)
            //     newStr += prevStr
            //     parsed--
            // }
            // output += newStr;
        }
    }

    return output;
}

console.log(stringDecompression("a1b2c3d4")) // abbcccdddd

function stringDecompressionV1(str) {
    const strArr = str.split("");
    let output = "";
    let newStr = "";
    let start = 0;

    while (start < strArr.length) {
        let parsed = parseInt(strArr[start + 1]);
        if (parsed) {
            newStr = strArr[start];
            start++;
        }
        else {
            let j = start;
            let numStr = "";
            while (j < strArr.length) {
                if (parseInt(strArr[j])) {
                    numStr += strArr[j];
                    j++
                } else break;
            }
            output += newStr.repeat(parseInt(numStr))
            start = j
        }
    }
    return output;
}

console.log(stringDecompressionV1("a12b3")) // aaaaaaaaaaaabbb

function stringCompression(str) {
    const strArr = str.split("");
    let output = ""
    let count = 1;
    for (let i = 1; i < strArr.length; i++) {
        if (strArr[i] === strArr[i - 1]) {
            count++;
        } else {
            output += strArr[i - 1] + count;
            count = 1
        }
    }
    output += strArr[strArr.length - 1] + count;
    return output;
}

console.log(stringCompression("aaabbbbaa")) // a3b4a2 (x -> map a5b3)

function stringCompressionV1(str) {
    let result = "";
    let left = 0;

    for (let right = 0; right <= str.length; right++) {
        if (str[right] !== str[left]) {
            result += str[left] + (right - left);
            left = right;
        }
    }

    return result;
}

console.log(stringCompressionV1("aaabbbbaa")) // a3b3a2 (x -> map a5b3)

function reverseString(str) {
    let arrStr = str.split("");
    let output = "";
    for (let i = arrStr.length - 1; i >= 0; i--) {
        output += arrStr[i]
    }

    // let j = arrStr.length - 1;
    // while (j >= 0) {
    //     output += arrStr[j]
    //     j--
    // }

    return output;
}

console.log(reverseString("hello")) // olleh

// Armstrong mean 153 -> 1^3 + 5^3 + 3^3 = 153
function isArmstrong(num) {
    let numStr = num.toString().split("");
    let output = 0;

    for (let i = 0; i < numStr.length; i++) {
        output += Math.pow(numStr[i], 3)
    }

    return output === num
}

console.log(isArmstrong(153)) // true
console.log(isArmstrong(111)) // false
console.log(isArmstrong(370)) // true

function decodeStr(str) {
    str = str.split("").reverse().join("");
    let output = "";

    for (let i = 0; i < str.length; i++) {
        let item = str[i];

        if (parseInt(item) || parseInt(item) == 0) {
            output += (Number(item) - 3 + 10) % 10 //(0-3) % 10
        } else {
            output += String.fromCharCode("Z".charCodeAt() - (item.charCodeAt() - "A".charCodeAt()))
        }
    }

    return output;
}

console.log(decodeStr("210ZYC")) // CBA789
console.log(decodeStr("98765LOOVS")) // HELLO23456

function romanToInt(s) {
    const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        if (roman[s[i]] < roman[s[i + 1]]) {
            result -= roman[s[i]];
        } else {
            result += roman[s[i]];
        }
    }

    return result;
}

console.log(romanToInt("MCMIV")); // 1904
console.log(romanToInt("LVIII")); // 58

function intToRoman(num) {
    const values = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let result = "";

    for (const [value, symbol] of values) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }

    return result;
}

console.log(intToRoman(1994)); // MCMXCIV
console.log(intToRoman(3749)); // MMMDCCXLIX