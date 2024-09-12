const fs = require("fs");
const path = require("path");

// Define the directory path
const directoryPath = path.join(__dirname, "testDir");

// 2. Reading All Files in a Directory

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }
  console.log("Files in directory:", files);

  // Optionally, read each file in the directory
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      console.log(`Content of ${file}:`, content);
    });
  });
});
