const http = require('http');
var responseList = ['', '', ''];

var counter = 0;

for (var i = 0; i < 3; i++) {
    const thisI = i;
    http.get(process.argv[thisI + 2], (response) => {
        response.setEncoding('utf8');
        var fullData = '';
        response.on('data', (data) => {
            fullData += data;
        });
        response.on('end', () => {
            responseList[thisI] = fullData;
            counter++;
            if (counter === 3)
                for (var j = 0; j < 3; j++)
                    console.log(responseList[j]);
        })
    })
}