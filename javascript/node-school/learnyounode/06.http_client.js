// Write a program that performs an HTTP GET request to a URL provided to you
// as the first command-line argument. Write the String contents of each
// "data" event from the response to a new line on the console (stdout).

const http = require('http')

// Use `http.get` to perform GET request
http.get(process.argv[2], (response) => {
    // Set client encoding to let `data` event emit Strings
    response.setEncoding('utf8')
    response.on('data', console.log)
})
