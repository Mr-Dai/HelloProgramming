// Write a program that performs an HTTP GET request to a URL provided to you
// as the first command-line argument. Collect all data from the server (not
// just the first "data" event) and then write two lines to the console
// (stdout).
//
// The first line you write should just be an integer representing the number
// of characters received from the server. The second line should contain the
// complete String of caracters sent by the server.

const http = require('http')

http.get(process.argv[2], (response) => {
    response.setEncoding('utf8')
    // Collect received data on `fullData`
    let fullData = ''
    response.on('error', console.error)
    response.on('data', (data) => {
        fullData += data
    })
    response.on('end', () => { // Output on end of connection
        console.log(fullData.length)
        console.log(fullData)
    })
})
