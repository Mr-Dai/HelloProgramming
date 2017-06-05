// Write a TCP time server!
//
// Your server should listen to TCP connections on the port provided by the
// first argument to your program. For each connection you must write the
// current date & 24 hour time in the format:
//     "YYYY-MM-DD hh:mm"
// followed by a new line character. Month, day, hour and minute must be
// zero-filled to 2 integers. For example:
//     "2013-07-06 17:42"
// After sending the string, close the connection.

const net = require('net')
const strftime = require('strftime')

// Create TCP server
const server = net.createServer((socket) => {
    socket.write(getFormattedTime() + '\n') // Send formatted time string
    socket.end() // Close the connection
});
server.listen(parseInt(process.argv[2]))

/**
 * `getFormattedTime()` returns the current time in the format:
 * > "YYYY-MM-DD hh:mm"
 */
function getFormattedTime() {
    let time = new Date()
    return strftime("%Y-%m-%d %H:%M", time)
}
