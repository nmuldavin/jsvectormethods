/*  Makes a Vector pseudoclass that behaves like an array but has           */
/*  Vector methods. Requires vector_methods.js                                                           */
/*****************************************************************************/

// Vector constructor 
var Vector = function(length) {
    var inst = new Array(length);
    inst.__proto__ = Vector.prototype;
    return inst;
};

// giving it all properties of arrays
Vector.prototype = Object.create(Array.prototype);

// adding vector methods
addVectorMethods(Vector.prototype);

// fromArray method returns Vector object given an array
Vector.fromArray = function(array) {
    vec = new Vector(array.length);
    var i;
    for(i = 0; i < array.length; i += 1) {
        vec[i] = array[i];
    }
    return vec;
};

// fromValues returns a Vector with arguments as entries
Vector.fromValues = function() {
    var vec = new Vector(arguments.length);
    var i;
    for (i = 0; i < arguments.length; i += 1) {
        vec[i] = arguments[i];
    }
    return vec;
};

// returns a Vector of length 'length' with all entries set to the value of
// 'initial'
Vector.init = function(length, initial) {
    var vec = new Vector(length);
    var i;
    for (i = 0; i < length; i += 1) {
        vec[i] = initial;
    }
};