const fs = require("fs");
const path = require("path");

// what happens with example.txt
fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    console.log("File Content:", data);
  });

  // what happens with adding some directory to example.txt
//   fs.readFile("/testDir/example.txt", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading the file:", err);
//       return;
//     }
//     console.log("File Content:", data);
//   });

//   fs.readFile("./testDir/example.txt", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading the file:", err);
//       return;
//     }
//     console.log("File Content:", data);
//   });


// Define the directory path
// const directoryPath = path.join(__dirname, "testDir");

// // 1. Reading a Single File
// const filePath = path.join(directoryPath, "example.txt");
// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading the file:", err);
//     return;
//   }
//   console.log("File Content:", data);
// });
