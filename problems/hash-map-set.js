function mostFrequentChar(str) {
    let map = new Map();
    let maxChar = "";
    let maxCount = 0;

    for (let ch of str) {
        map.set(ch, (map.get(ch) || 0) + 1);

        if (map.get(ch) > maxCount) {
            maxCount = map.get(ch)
            maxChar = ch
        }
    }

    return maxChar;
}

console.log(mostFrequentChar("ababca")) // "a"

// https://leetcode.com/problems/first-unique-character-in-a-string
function firstUniqChar(str) {
    let map = new Map();
    let min = -Infinity;
    for (let value of str) {
        map.set(value, (map.get(value) || 0) + 1);
    }

    for (let i = 0; i < str.length; i++) {
        if (map.get(str[i]) === 1) {
            return i;
        }
    }

    return -1;
}

console.log(firstUniqChar("loveleetcode")) // 2
console.log(firstUniqChar("leetcode")) // 0

function nonRepeated(str) {
    let strArr = str.split("");
    let map = new Map();

    for (let i = 0; i < strArr.length; i++) {
        map.set(strArr[i], (map.get(strArr[i]) || 0) + 1)

        // if (str.indexOf(strArr[i]) === str.lastIndexOf(strArr[i])) return strArr[i] // c
    }

    for (let [key, value] of map) {
        if (value === 1) return key
    }
}

console.log(nonRepeated("aabbcdeeff")) // c

const paragraph = `JavaScript is widely used for building modern web applications. 
Developers use JavaScript to create dynamic user interfaces, interact with APIs, and manage application state. 
React is a popular JavaScript library for frontend development, while Node.js allows JavaScript to run on the server side. 
JavaScript also provides powerful features such as promises, async/await, arrays, objects, maps, and sets that help developers 
write efficient and maintainable code.`

function countWord(paragraph, target) {
    let arrPara = paragraph.split(" ");
    let map = new Map();
    for (let item of arrPara) {
        item = item.replace(/[^a-zA-Z]/g, "")
        if (target.includes(item)) {
            map.set(item, (map.get(item) || 0) + 1)
        }
    }
    console.log(map) // JavaScript -5, React -1, arrays -1, developers -1
}

countWord(paragraph, ["JavaScript", "React", "developers", "arrays"])

// https://leetcode.com/problems/maximum-number-of-balloons
function maxNumberOfWord(str, word) {
    if (str.length < word.length) return 0;

    const wordMap = new Map();
    const strMap = new Map();

    for (let item of word) {
        wordMap.set(item, (wordMap.get(item) || 0) + 1);
    }

    for (let item of str) {
        strMap.set(item, (strMap.get(item) || 0) + 1);
    }

    let count = Infinity;

    for (let [key, value] of wordMap) {
        count = Math.min(count, (strMap.get(key) / value));
    }

    return count;
}

console.log(maxNumberOfWord("nlaebolko", "balloon")) // 1
console.log(maxNumberOfWord("loonbalxballpoon", "balloon")) // 2
console.log(maxNumberOfWord("code", "balloon")) // 0
console.log(maxNumberOfWord("aaabbbccc", "abc")) // 2

// https://leetcode.com/problems/valid-anagram
function isAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;
    const map = new Map();

    for (let item of str1) {
        map.set(item, (map.get(item) || 0) + 1);
    }

    for (let item of str2) {
        map.set(item, map.get(item) - 1);
        if (map.get(item) < 0) return false;
    }

    return true;
}

console.log(isAnagram("anagram", "nagaram")) // true
console.log(isAnagram("aab", "abb")) // false

// https://leetcode.com/problems/sort-characters-by-frequency
function frequencySort(str) {
    const strArr = str.split("");
    const map = new Map();
    for (let i = 0; i < strArr.length; i++) {
        map.set(strArr[i], (map.get(strArr[i]) || 0) + 1)
    }

    let arrmap = [...map];
    const sortMap = arrmap.sort((a, b) => b[1] - a[1]);

    let output = "";
    for (let item of sortMap) {
        output += item[0].repeat(item[1]);
    }
    return output;
}

console.log(frequencySort("tree")) // eetr
console.log(frequencySort("cccaaa")) // cccaaa or aaaccc; cacaca (not)

// https://leetcode.com/problems/group-anagrams
function groupByAnagram(arr) {
    const map = new Map();
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i].split("");
        const sortedItem = item.sort().join("");
        let data = map.get(sortedItem) || [];
        data.push(arr[i])
        map.set(sortedItem, data)
    }
    map.forEach((value, key) => {
        result.push(value)
    })
    return result
}

console.log(groupByAnagram(["eat", "tea", "tan", "ate", "nat", "bat"])) // [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] 

// https://leetcode.com/problems/find-all-anagrams-in-a-string
function findAnagrams(s, p) {
    const result = [];

    const target = p.split("").sort().join("");
    const k = p.length;

    for (let i = 0; i <= s.length - k; i++) {
        const sub = s.substring(i, i + k);
        const sorted = sub.split("").sort().join("");

        if (sorted === target) {
            result.push(i);
        }
    }

    return result;
}

console.log(findAnagrams("cbaebabacd", "abc")) // [0,6]