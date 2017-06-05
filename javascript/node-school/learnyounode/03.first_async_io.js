// Write a program that uses a single asynchronous filesystem operation to
// read a file and print the number of newlines it contains to the console
// (stdout), similar to running `cat file | wc -l`
//
// The full path to the file to read will be provided as the first
// command-line argument.

const fs = require('fs')

// Use `fs.readFile` to read file asynchronously
fs.readFile(process.argv[2], (err, buffer) => {
    if (err)
        console.log(JSON.stringify(err))
    else
        console.log(buffer.toString().split('\n').length - 1)
})
