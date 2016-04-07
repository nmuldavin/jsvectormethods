# vector-methods

Provides a useful set of vector methods to be added to JavaScript Arrays. Unlike most JavaScript vector libraries, these methods
may be used for arrays of arbitrary dimension.

## Use

To use, include `vector_methods.js` in your project. Vector methods can be added to any array or array-like object with `addVectorMethods()`. For example: 

```javascript
var arr = [1, 2, 3];
addVectorMethods(arr);
arr.norm(); // 3.74
```
To add method to all Arrays, use `addVectorMethods(Array.prototype)`. Vector methods do not conflict with any standard Array methods. If you do not want to mess with the built in Array prototype, `vector.js` provides a `Vector` psuedoclass which inherits all vector functionality and the added vector methods.

Vector methods includes all usual vector operations including the dot product, scalar multiplication, norm, distance to another vector, and cross product among others. You can also define your own element-wise operation between corresponding elements using `elementWise`:

```javascript
var operation = function(a, b) {
    return a*pow(a, 10*b);
}

v2.elementWise(operation, v2);
```
