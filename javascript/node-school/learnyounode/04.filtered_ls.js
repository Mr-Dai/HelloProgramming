var fs = require('fs');
var suffix = '.' + process.argv[3];

fs.readdir(process.argv[2], function(err, list) {
    if (err)
        console.log(JSON.stringify(err));
    else
        for (var i = 0; i < list.length; i++)
            if (list[i].endsWith(suffix))
                console.log(list[i]);
});