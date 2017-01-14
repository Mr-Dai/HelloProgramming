const fs = require('fs');
const http = require('http');

const serverPort = Number(process.argv[2]);
const servedFilePath = process.argv[3];

const server = http.createServer((req, res) => {
    fs.createReadStream(servedFilePath).pipe(res);
});
server.listen(serverPort);
