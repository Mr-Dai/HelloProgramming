Object.prototype.method = function(name, func) {
    if (!this.prototype[name])
        this.prototype[name] = func;
    return this;
};

Function.method('inherits', function(Parent) {
    this.prototype = new Parent();
    return this;
});

Object.method('superior', function(name) {
    var that = this, method = that[name];
    return function() {
        return method.apply(that, arguments);
    }
});
