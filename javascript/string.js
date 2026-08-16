// String → ASCII value
console.log("A".charCodeAt(0)); // 65 -> 0 is index

// ASCII → String
console.log(String.fromCharCode(65)); // A

// remove special char
console.log("kali.das#".replace(/[^a-zA-z]/g, "")) // kalidas


// string iteration strArr=test.split("") only for update str
for (let i = 0; i < "test".length; i++) {
    console.log(str[i]) // t;e;s;t
}