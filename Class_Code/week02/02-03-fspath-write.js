const fs = require('fs');
const path = require('path');

// Define the directory path
const directoryPath = path.join(__dirname, 'testDir');

// 3. Writing to a File
const newFilePath = path.join(directoryPath, 'output.txt');
const contentToWrite = 'Hello, this is a new file created by Node.js!';
fs.writeFile(newFilePath, contentToWrite, 'utf8', err => {
    if (err) {
        console.error('Error writing to the file:', err);
        return;
    }
    console.log('File has been written successfully.');
});
