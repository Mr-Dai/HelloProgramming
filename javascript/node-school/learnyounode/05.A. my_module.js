const fs = require('fs');

module.exports = function(dir, suffix, callback) {
    suffix = '.' + suffix;
    fs.readdir(dir, function(err, list) {
        if (err) {
            callback(err);
        } else {
            list = list.filter(function(name) {
                return name.endsWith(suffix);
            });
            callback(null, list);
        }
    });
}