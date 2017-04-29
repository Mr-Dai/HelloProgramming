const url = require('url');
const http = require('http');

const port = Number(process.argv[2]);

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const sentTime = parsedUrl.query.iso;
    const parsedTime = new Date(sentTime);
    if (parsedUrl.pathname == '/api/parsetime') {
        res.end(JSON.stringify({
            'hour': parsedTime.getHours(),
            'minute': parsedTime.getMinutes(),
            'second': parsedTime.getSeconds()
        }));
    } else if (parsedUrl.pathname == '/api/unixtime') {
        res.end(JSON.stringify({ 'unixtime': parsedTime.getTime() }));
    } else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(port);