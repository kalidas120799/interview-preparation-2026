// String → ASCII value
console.log("A".charCodeAt(0)); // 65 -> 0 is index

// ASCII → String
console.log(String.fromCharCode(65)); // A

// remove special char
console.log("kali.das#".replace(/[^a-zA-z]/g, "")) // kalidas