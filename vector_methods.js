//  'addVectorMethods' adds vector methods to an array or an object with 
//  array properties inherited from Array.prototype
var addVectorMethods = function (that) {


    /*  Validity Checks                                                      */
    /*************************************************************************/

    // 'is_array' tests if object is an array or an object with array
    // properties. From 'JavaScript The Good Parts' by Douglas Crockford
    var is_array = function (value) {
        return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            typeof value.splice === 'function' &&
            !(value.propertyIsEnumerable('length'));
    };

    // applies 'is_array' to the object provided to 'addVectorMethods', 
    // throwing error if it is not array-like
    if (!is_array(that)) {
        throw new Error('Can only add Vector methods to an array');
    }

    /*  General methods for applying operations involving two Arrays         */
    /*************************************************************************/


    // Throws error if lengths of vectors unequal
    var checkLengthEquality = function(v1, v2) {
        if (v1.length !== v2. length) {
            throw new Error('Arrays must be equal length');
        }
    };

    // Throws error if operation variable is not a function
    var checkOperation = function(operation) {
        if (typeof operation !== 'function') {
            throw new Error('Must provide a function');
        }
    };

    // 'elementwise' returns an array whose elements are the result of applying
    // a provided operation to corresponding elements of the array and another
    // array. Takes as input an operation, an array, and optional extra
    // parameters that are passed to the operation.
    that.elementWise = function(operation, other, extras) {
        // check length equality and operation:
        checkLengthEquality(this, other);
        checkOperation(operation);
        
        // iterate over array, applying operation.
        var i, out=[];
        for(i = 0; i < this.length; i += 1) {
            out[i] = operation(this[i], other[i], extras);
        }

        return out;
    };


    // 'combine' is similar to the 'reduce' method for a single aray
    // but takes an other array as an input in addition to an operation and 
    // extras. Returns the value resulting from applying the provided operation 
    // to each set of corresponding array entries. 
    that.combine = function(operation, other, extras) {
        checkLengthEquality(this, other);
        checkOperation(operation);

        var i, out = 0;
        for(i = 0; i < this.length; i += 1) {
            out = operation(out, this[i], other[i], extras);
        }

        return out;
    }

    /*  Basic algebraic operations to be used with general methods           */
    /*************************************************************************/
    var add = function(a, b) {
        return a + b;
    };

    var sub = function(a, b) {
        return a - b;
    };

    var times = function(a, b) {
        return a*b;
    };

    var divBy = function(a, b) {
        return a/b;
    };

    // to be used with 'combine' for dot product
    var dotOperation = function(tot, a, b) {
        return tot + a*b;
    };

    /*  Vector methods. All methods are designed so that any other array     */
    /*  included as an argument does not need to have vector methods         */
    /*************************************************************************/

    // Adds a vector to another
    that.plus = function(other) {
        return this.elementWise(add, other);
    };

    // subtracts a vector from another
    that.minus = function(other) {
        return this.elementWise(sub, other);
    };

    // subtracts in the opposite way
    var reverseMinus = function(a, b) {
        return b - a;
    };

    // multiplies element-wise by corresponding entry of another vector
    that.timesVector = function(other) {
        return this.elementWise(times, other);
    };

    // divides element-wise by corresponding entry of another vector
    that.divByVector = function(other) {
        return this.elementWise(divBy, other);
    };

    // scalar multiplication
    that.times = function(scalar) {
        return this.map(function(element) {
            return element*scalar;
        });
    };
    // scalar division
    that.divBy = function(scalar) {
        return this.map(function(element) {
            return element/scalar;
        });
    };

    // negation operation, returns inverse of each element. 
    that.neg = function() {
        return that.map(function(element) {
            return -element;
        });
    };

    // dot-product operation returns number
    that.dot = function(other) {
        return this.combine(dotOperation, other);
    };

    // cross-product operation for 3-vectors
    that.cross = function(other) {

        if (this.length !== 3 || other.length !== 3) {
            throw new Error('Vector must be 3 dimensional');
        };

        var out = [];
        out[0] = this[1]*other[2] - other[1]*this[2];
        out[1] = this[2]*other[0] - other[2]*this[0];
        out[2] = this[0]*other[1] - other[0]*this[1];

        return out;
    };

    // returns the absolute value of a vector
    that.norm = function() {
        return Math.sqrt(this.dot(this));
    };

    // returns a vector pointing from another vector to this vector
    that.displacementFrom = function(other) {
        return this.minus(other);
    };

    // returns a vector point from this vector to another vector
    that.displacementTo = function(other) {
        return this.elementWise(reverseMinus, other);
    }

    // returns absolute distance from this vector to another
    that.distanceTo = function(other) {
        var inter = this.displacementFrom(other);
        return this.norm.call(inter);
    }

    // projects this vector on to the basis provided by another vector. 
    that.projectedOn = function(other) {
        var scalar = this.dot(other)/this.dot.call(other, other);
        return this.times.call(other, scalar);
    }

    return that;
};

