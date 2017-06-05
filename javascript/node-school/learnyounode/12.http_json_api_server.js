// Write an HTTP server that serves JSON data when it receives a GET request
// to the path '/api/parsetime'. Expect the request to contain a query string
// with a key 'iso' and an ISO-format time as the value.
//
// For example:
//     /api/parsetime?iso=2013-08-10T12:10:15.474Z
//
// The JSON response should contain only 'hour', 'minute' and 'second'
// properties. For example:
//
//    {
//      "hour": 14,
//      "minute": 23,
//      "second": 15
//    }
//
// Add second endpoint for thr path '/api/unixtime' which accepts the same
// query string but returns UNIX epoch time in milliseconds (the number of
// millisecdons since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
// For example:
//
//     { "unixtime": 1376136615474 }
//
// Your server should listen on the port provided by the first argument to
// your program.

const url = require('url')
const http = require('http')

const port = Number(process.argv[2])

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const sentTime = parsedUrl.query.iso
    const parsedTime = new Date(sentTime)
    if (parsedUrl.pathname == '/api/parsetime') {
        res.end(JSON.stringify({
            'hour': parsedTime.getHours(),
            'minute': parsedTime.getMinutes(),
            'second': parsedTime.getSeconds()
        }))
    } else if (parsedUrl.pathname == '/api/unixtime') {
        res.end(JSON.stringify({ 'unixtime': parsedTime.getTime() }))
    } else {
        res.writeHead(404)
        res.end()
    }
})
server.listen(port)
