const assert = require('assert')

// Constructor of pseudo-class `Mammal`
var Mammal = function(name) {
    this.name = name;
};

// Methods of pseudo-class `Mammal`
Mammal.prototype.get_name = function() {
    return this.name;
};

Mammal.prototype.says = function() {
    return this.saying || '';
};

// Test `Mammal`
var myMammal = new Mammal('Herb the Mammal');
// 'Herb the Mammal'
assert.equal(myMammal.get_name(), 'Herb the Mammal');

// Define another pseudo-class `Cat`
var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
};

// By setting the `prototype` of `Cat` to an instance of `Mammal`,
// we define `Cat` inherit `Mammal`.
Cat.prototype = new Mammal();
// Essentially, all objects created by `Cat` the function will have
// the attributes from the provided object created by `Mammal` the function,
// as the created `Cat` objects will have the same `prototype` as `Cat`
// the function.


// We can further extend `Cat` the pseudo-class by adding new methods
Cat.prototype.purr = function(n) {
    var i, s = '';
    for (i = 0; i < n; i++) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
// We can also replace the methods from `Mammal`
Cat.prototype.get_name = function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
assert.equal(myCat.says(), 'meow');
assert.equal(myCat.purr(5), 'r-r-r-r-r');
assert.equal(myCat.get_name(), 'meow Henrietta meow');
