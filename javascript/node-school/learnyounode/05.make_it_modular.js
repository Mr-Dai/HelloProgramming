var func = require('./05.A. my_module');

func(process.argv[2], process.argv[3], function(err, list) {
    if (err)
        console.log(JSON.stringify(err));
    else
        for (var i = 0; i < list.length; i++)
            console.log(list[i]);
});