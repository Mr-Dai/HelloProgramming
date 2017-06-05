// Write an HTTP server that receives only POST requests and converts
// incoming POST body characters to upper-case and returns it to the client.
//
// Your server should listen on the port provided by the first argument to
// your program.

const http = require('http')

const port = Number(process.argv[2])

const server = http.createServer((req, res) => {
    req.setEncoding('utf8')
    let fullData = ''
    req.on('data', (data) => fullData += data)
    req.on('end', () => {
        if (req.method == 'POST')
            res.end(fullData.toUpperCase())
        else
            res.end()
    })
})
server.listen(port)
