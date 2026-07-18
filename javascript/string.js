// String → ASCII value
console.log("A".charCodeAt(0)); // 65 -> 0 is index

// ASCII → String
console.log(String.fromCharCode(65)); // A

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
