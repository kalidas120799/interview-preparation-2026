// asynchronous operations allow tasks to execute independently
// for Handle Asynchronous Operations
// Callbacks, Promises, Async/Await

// setTimeout(() => { console.log("---settimeout") }, 2000)
// setInterval(() => { console.log("setinterval") }, 2000)


// Callbacks
/* A function passed as an argument to another function.
The first function (often asynchronous) calls the callback function when it finishes its operation. */

function fetchData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(json => callback(json))
}

fetchData("https://jsonplaceholder.typicode.com/todos/1", (data) => {
    console.log(data);
});

// Promises
function fetchData1(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => reject(err))
    });
}

fetchData1("https://jsonplaceholder.typicode.com/todos/1")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

// Async/Await
async function fetchData2(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchData2("https://jsonplaceholder.typicode.com/todos/1");