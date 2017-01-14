const http = require('http');

const port = Number(process.argv[2]);

const server = http.createServer((req, res) => {
    req.setEncoding('utf8');
    var fullData = '';
    req.on('data', (data) => fullData += data);
    req.on('end', () => {
        if (req.method == 'POST')
            res.end(fullData.toUpperCase());
        else
            res.end();
    });
});
server.listen(port);