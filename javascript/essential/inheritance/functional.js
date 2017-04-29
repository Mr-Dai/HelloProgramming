const assert = require('assert');
require('./util.js');

var mammal = function(spec) {
    // The `spec` object contains all the information
    // it needs to create a new instance.

    var that = {};

    // Add method to the new instance
    that.get_name = function() {
        return spec.name;
    };
    that.says = function() {
        return spec.saying || '';
    };

    // Return the new instance
    return that;
};

var myMammal = mammal({ name: 'Herb' });
assert.equal(myMammal.get_name(), 'Herb');
assert.equal(myMammal.says(), '');
assert.equal(myMammal.name, undefined); // The `name` attribute is hidden

var cat = function(spec) {
    spec.saying = spec.saying || 'meow';
    // Specify `Cat` extends `Mammal` by reusing its methods
    var that = mammal(spec);
    
    // Add new method to `cat`
    that.purr = function(n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    // Replace old method
    that.get_name = function() {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var myCat = cat({ name: 'Henrietta' });
assert.equal(myCat.says(), 'meow');
assert.equal(myCat.purr(5), 'r-r-r-r-r');
assert.equal(myCat.get_name(), 'meow Henrietta meow');

var coolcat = function(spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');
    that.get_name = function() {
        return 'like ' + super_get_name() + ' baby';
    };
    return that;
};

var myCoolCat = coolcat({ name: 'Bix' });
assert.equal(myCoolCat.get_name(), 'like meow Bix meow baby');
