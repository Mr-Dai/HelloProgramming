const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/md5', (req, res) => {
    const md5sum = crypto.createHash('md5');
    if (typeof req.body === 'string' || res.body instanceof String) {
        md5sum.update(req.body);
        res.send(md5sum.digest('hex'));
    } else if ('data' in req.body) {
        md5sum.update(req.body.data);
        res.send(md5sum.digest('hex'));
    } else {
        res.status(400).send("The original text must be sent as the request body in `text/plain`"
            + " or `data` field of `application/json` and `application/x-www-form-urlencoded`");
    }
});

const port = process.argv.length >= 2 ? 8000 : Number(process.argv[2]);
app.listen(port);
console.log(`Server listening on port \`${port}\`...`);