const net = require('net');
const strftime = require('strftime');

const server = net.createServer((socket) => {
    socket.write(getFormattedTime() + '\n');
    socket.end();
});
server.listen(parseInt(process.argv[2]));

function getFormattedTime() {
    var time = new Date();
    return strftime("%Y-%m-%d %H:%M", time);
}