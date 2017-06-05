// This problem is the same as the previous problem (HTTP COLLECT) in that
// you need to use `http.get()`. However, this time you will be provided with
// three URLs as the first three command-line arguments.
//
// You must collect the complete content provided to you by each of the URLs
// and print it to the console (stdout). You don't need to print out the
// length, just the data as a String; one line per URL. The catch is that you
// must print them out in the same order as the URLs are provided to you as
// command-line arguments

const http = require('http')

const responseList = []
var counter = 0

for (let i = 0; i < 3; i++) {
    http.get(process.argv[i + 2], (response) => {
        response.setEncoding('utf8')
        let fullData = ''
        response.on('data', (data) => {
            fullData += data
        })
        response.on('end', () => {
            responseList[i] = fullData
            counter++
            if (counter === 3)
                for (var j = 0; j < 3; j++)
                    console.log(responseList[j])
        })
    })
}
