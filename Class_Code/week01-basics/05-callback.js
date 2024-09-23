const http = require("http");
const server = http.createServer();
const PORT = 3000;

// // newer
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// older
server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

// the breakdown
// Callback function to be passed to server.listen
// function startServer() {
//   console.log(`Server is running on port ${PORT}`);
//   secondfunction();
// }

// function secondfunction() {
//   let a = 4;
//   let b = 9;
//   console.log(`${a + b}`); // THIS IS NOT "", but ``, which is on the left the 1 key on your keyboard
// }

// // Using the callback function
// server.listen(PORT, startServer);

/*
NOTE:   We can just pass a function as an argument here, 
        we WILL be doing this alot - the concept will be middleware

        middleware - any code that we run after recieving a request
        and before sending back a response
*/
