const http = require('http');

http.get(process.argv[2], (response) => {
    response.setEncoding('utf8');
    var fullData = '';
    response.on('error', console.error);
    response.on('data', (data) => {
        fullData += data;
    });
    response.on('end', () => {
        console.log(fullData.length);
        console.log(fullData);
    })
});