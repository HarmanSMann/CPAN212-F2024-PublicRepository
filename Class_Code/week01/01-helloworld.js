/*
How to run it
    1. Make a new file, call it "helloworld.js"
    2. Write the code under this into it
    3. open a terminal
    4. navigate to the folder with the helloworld file and run it with:
        node helloworld.js
        'runtime environment' and the filename

    OR
    3. right click the folder, navigate to 'open integrated terminal'
    4. run the file like in step 4

*/
const message = "Hello, World!";
console.log(message);

// Functions
//older way
function addition_function(a, b) {
    return a+b
}

// newer way with =>
const addition = (a, b) => {
    return a+b
}

console.log(addition_function)
console.log(addition(1, 2))
console.log(addition)
console.log(addition(1, 2))
