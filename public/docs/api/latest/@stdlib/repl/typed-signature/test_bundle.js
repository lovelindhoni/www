// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./main.js":2}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
}


// EXPORTS //

module.exports = hasOwnProp;

},{}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert/has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert/has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./main.js":4}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
}


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert/has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert/has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./main.js":6}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/assert/has-symbol-support' );


// VARIABLES //

var FLG = hasSymbols();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/assert/has-symbol-support":3}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = true;

},{}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":66}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/constants/float64/ninf":26,"@stdlib/constants/float64/pinf":27,"@stdlib/math/base/assert/is-integer":31}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isInteger;

},{"./object.js":11,"./primitive.js":12}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":9,"@stdlib/assert/is-number":13}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":9,"@stdlib/assert/is-number":13}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNumber = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./main.js":14,"./object.js":15,"./primitive.js":16,"@stdlib/utils/define-nonenumerable-read-only-property":66}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":15,"./primitive.js":16}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var Number = require( '@stdlib/number/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Number ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":18,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/number/ctor":41,"@stdlib/utils/native-class":73}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
}


// EXPORTS //

module.exports = isNumber;

},{}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":41}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":17}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isString = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./main.js":20,"./object.js":21,"./primitive.js":22,"@stdlib/utils/define-nonenumerable-read-only-property":66}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns true
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isString;

},{"./object.js":21,"./primitive.js":22}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof String ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
}


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":23,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":73}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' );
}


// EXPORTS //

module.exports = isString;

},{}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./valueof.js":24}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Boolean indicating if the current process is running on Windows.
*
* @module @stdlib/assert/is-windows
* @type {boolean}
*
* @example
* var PLATFORM = require( '@stdlib/os/platform' );
* var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
*
* if ( IS_WINDOWS ) {
*     console.log( 'Running on Windows...' );
* } else {
*     console.log( 'Running on %s...', PLATFORM );
* }
*/

// MODULES //

var PLATFORM = require( '@stdlib/os/platform' );


// MAIN //

/**
* Boolean indicating if the current process is running on Windows.
*
* @constant
* @type {boolean}
*/
var IS_WINDOWS = ( PLATFORM === 'win32' );


// EXPORTS //

module.exports = IS_WINDOWS;

},{"@stdlib/os/platform":43}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/float64/ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/float64/ninf' );
* // returns -Infinity
*/

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{"@stdlib/number/ctor":41}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/float64/pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/float64/pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Read the entire contents of a file.
*
* @module @stdlib/fs/read-file
*
* @example
* var readFile = require( '@stdlib/fs/read-file' );
*
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*
* @example
* var readFileSync = require( '@stdlib/fs/read-file' ).sync;
*
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var readFile = require( './main.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./main.js":29,"./sync.js":30,"@stdlib/utils/define-nonenumerable-read-only-property":66}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var readfile = require( 'fs' ).readFile;


// MAIN //

/**
* Asynchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
* @param {Function} clbk - callback to invoke after reading file contents
*
* @example
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*/
function readFile() {
	var args;
	var i;
	args = [];
	for ( i = 0; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	readfile.apply( null, args );
}


// EXPORTS //

module.exports = readFile;

},{"fs":80}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var readfileSync = require( 'fs' ).readFileSync; // eslint-disable-line node/no-sync


// MAIN //

/**
* Synchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
* @returns {(Buffer|string|Error)} file contents or an error
*
* @example
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/
function readFileSync( file, options ) {
	var f;
	try {
		if ( arguments.length > 1 ) {
			f = readfileSync( file, options );
		} else {
			f = readfileSync( file );
		}
	} catch ( err ) {
		return err;
	}
	return f;
}


// EXPORTS //

module.exports = readFileSync;

},{"fs":80}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
*/

// MODULES //

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":32}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":33}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Round a double-precision floating-point number toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var floor = require( './main.js' );


// EXPORTS //

module.exports = floor;

},{"./main.js":34}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = floor;

},{}],35:[function(require,module,exports){
module.exports={"abs":"@stdlib/math/special/abs","acronym":"@stdlib/string/acronym","AFINN_96":"@stdlib/datasets/afinn-96","AFINN_111":"@stdlib/datasets/afinn-111","afull":"@stdlib/array/full","afullLike":"@stdlib/array/full-like","alias2pkg":"@stdlib/namespace/alias2pkg","alias2related":"@stdlib/namespace/alias2related","alias2standalone":"@stdlib/namespace/alias2standalone","aliases":"@stdlib/namespace/aliases","allocUnsafe":"@stdlib/buffer/alloc-unsafe","anova1":"@stdlib/stats/anova1","ANSCOMBES_QUARTET":"@stdlib/datasets/anscombes-quartet","any":"@stdlib/utils/any","anyBy":"@stdlib/utils/any-by","anyByAsync":"@stdlib/utils/async/any-by","anyByRight":"@stdlib/utils/any-by-right","anyByRightAsync":"@stdlib/utils/async/any-by-right","aones":"@stdlib/array/ones","aonesLike":"@stdlib/array/ones-like","APERY":"@stdlib/constants/float64/apery","append":"@stdlib/utils/append","ARCH":"@stdlib/os/arch","argumentFunction":"@stdlib/utils/argument-function","ARGV":"@stdlib/process/argv","array":"@stdlib/ndarray/array","array2buffer":"@stdlib/buffer/from-array","array2iterator":"@stdlib/array/to-iterator","array2iteratorRight":"@stdlib/array/to-iterator-right","ArrayBuffer":"@stdlib/array/buffer","arraybuffer2buffer":"@stdlib/buffer/from-arraybuffer","arrayCtors":"@stdlib/array/ctors","arrayDataType":"@stdlib/array/dtype","arrayDataTypes":"@stdlib/array/dtypes","arrayMinDataType":"@stdlib/array/min-dtype","arrayNextDataType":"@stdlib/array/next-dtype","arrayPromotionRules":"@stdlib/array/promotion-rules","arraySafeCasts":"@stdlib/array/safe-casts","arraySameKindCasts":"@stdlib/array/same-kind-casts","arrayShape":"@stdlib/array/shape","arrayStream":"@stdlib/streams/node/from-array","arrayview2iterator":"@stdlib/array/to-view-iterator","arrayview2iteratorRight":"@stdlib/array/to-view-iterator-right","AsyncIteratorSymbol":"@stdlib/symbol/async-iterator","azeros":"@stdlib/array/zeros","azerosLike":"@stdlib/array/zeros-like","bartlettTest":"@stdlib/stats/bartlett-test","base.abs":"@stdlib/math/base/special/abs","base.abs2":"@stdlib/math/base/special/abs2","base.abs2f":"@stdlib/math/base/special/abs2f","base.absdiff":"@stdlib/math/base/utils/absolute-difference","base.absf":"@stdlib/math/base/special/absf","base.acos":"@stdlib/math/base/special/acos","base.acosh":"@stdlib/math/base/special/acosh","base.acot":"@stdlib/math/base/special/acot","base.acoth":"@stdlib/math/base/special/acoth","base.acovercos":"@stdlib/math/base/special/acovercos","base.acoversin":"@stdlib/math/base/special/acoversin","base.acsc":"@stdlib/math/base/special/acsc","base.acsch":"@stdlib/math/base/special/acsch","base.add":"@stdlib/math/base/ops/add","base.addf":"@stdlib/math/base/ops/addf","base.ahavercos":"@stdlib/math/base/special/ahavercos","base.ahaversin":"@stdlib/math/base/special/ahaversin","base.asech":"@stdlib/math/base/special/asech","base.asin":"@stdlib/math/base/special/asin","base.asinh":"@stdlib/math/base/special/asinh","base.atan":"@stdlib/math/base/special/atan","base.atan2":"@stdlib/math/base/special/atan2","base.atanh":"@stdlib/math/base/special/atanh","base.avercos":"@stdlib/math/base/special/avercos","base.aversin":"@stdlib/math/base/special/aversin","base.bernoulli":"@stdlib/math/base/special/bernoulli","base.besselj0":"@stdlib/math/base/special/besselj0","base.besselj1":"@stdlib/math/base/special/besselj1","base.bessely0":"@stdlib/math/base/special/bessely0","base.bessely1":"@stdlib/math/base/special/bessely1","base.beta":"@stdlib/math/base/special/beta","base.betainc":"@stdlib/math/base/special/betainc","base.betaincinv":"@stdlib/math/base/special/betaincinv","base.betaln":"@stdlib/math/base/special/betaln","base.binet":"@stdlib/math/base/special/binet","base.binomcoef":"@stdlib/math/base/special/binomcoef","base.binomcoefln":"@stdlib/math/base/special/binomcoefln","base.boxcox":"@stdlib/math/base/special/boxcox","base.boxcox1p":"@stdlib/math/base/special/boxcox1p","base.boxcox1pinv":"@stdlib/math/base/special/boxcox1pinv","base.boxcoxinv":"@stdlib/math/base/special/boxcoxinv","base.cabs":"@stdlib/math/base/special/cabs","base.cabs2":"@stdlib/math/base/special/cabs2","base.cabs2f":"@stdlib/math/base/special/cabs2f","base.cabsf":"@stdlib/math/base/special/cabsf","base.cadd":"@stdlib/math/base/ops/cadd","base.caddf":"@stdlib/math/base/ops/caddf","base.cbrt":"@stdlib/math/base/special/cbrt","base.cbrtf":"@stdlib/math/base/special/cbrtf","base.cceil":"@stdlib/math/base/special/cceil","base.cceilf":"@stdlib/math/base/special/cceilf","base.cceiln":"@stdlib/math/base/special/cceiln","base.ccis":"@stdlib/math/base/special/ccis","base.cdiv":"@stdlib/math/base/ops/cdiv","base.ceil":"@stdlib/math/base/special/ceil","base.ceil2":"@stdlib/math/base/special/ceil2","base.ceil10":"@stdlib/math/base/special/ceil10","base.ceilb":"@stdlib/math/base/special/ceilb","base.ceilf":"@stdlib/math/base/special/ceilf","base.ceiln":"@stdlib/math/base/special/ceiln","base.ceilsd":"@stdlib/math/base/special/ceilsd","base.cexp":"@stdlib/math/base/special/cexp","base.cflipsign":"@stdlib/math/base/special/cflipsign","base.cflipsignf":"@stdlib/math/base/special/cflipsignf","base.cfloor":"@stdlib/math/base/special/cfloor","base.cfloorn":"@stdlib/math/base/special/cfloorn","base.cidentity":"@stdlib/math/base/special/cidentity","base.cidentityf":"@stdlib/math/base/special/cidentityf","base.cinv":"@stdlib/math/base/special/cinv","base.clamp":"@stdlib/math/base/special/clamp","base.clampf":"@stdlib/math/base/special/clampf","base.cmul":"@stdlib/math/base/ops/cmul","base.cmulf":"@stdlib/math/base/ops/cmulf","base.cneg":"@stdlib/math/base/ops/cneg","base.continuedFraction":"@stdlib/math/base/tools/continued-fraction","base.copysign":"@stdlib/math/base/special/copysign","base.copysignf":"@stdlib/math/base/special/copysignf","base.cos":"@stdlib/math/base/special/cos","base.cosh":"@stdlib/math/base/special/cosh","base.cosm1":"@stdlib/math/base/special/cosm1","base.cospi":"@stdlib/math/base/special/cospi","base.cot":"@stdlib/math/base/special/cot","base.coth":"@stdlib/math/base/special/coth","base.covercos":"@stdlib/math/base/special/covercos","base.coversin":"@stdlib/math/base/special/coversin","base.cphase":"@stdlib/math/base/special/cphase","base.cpolar":"@stdlib/math/base/special/cpolar","base.cround":"@stdlib/math/base/special/cround","base.croundn":"@stdlib/math/base/special/croundn","base.csch":"@stdlib/math/base/special/csch","base.csignum":"@stdlib/math/base/special/csignum","base.csub":"@stdlib/math/base/ops/csub","base.csubf":"@stdlib/math/base/ops/csubf","base.deg2rad":"@stdlib/math/base/special/deg2rad","base.deg2radf":"@stdlib/math/base/special/deg2radf","base.digamma":"@stdlib/math/base/special/digamma","base.diracDelta":"@stdlib/math/base/special/dirac-delta","base.dists.arcsine.Arcsine":"@stdlib/stats/base/dists/arcsine/ctor","base.dists.arcsine.cdf":"@stdlib/stats/base/dists/arcsine/cdf","base.dists.arcsine.entropy":"@stdlib/stats/base/dists/arcsine/entropy","base.dists.arcsine.kurtosis":"@stdlib/stats/base/dists/arcsine/kurtosis","base.dists.arcsine.logcdf":"@stdlib/stats/base/dists/arcsine/logcdf","base.dists.arcsine.logpdf":"@stdlib/stats/base/dists/arcsine/logpdf","base.dists.arcsine.mean":"@stdlib/stats/base/dists/arcsine/mean","base.dists.arcsine.median":"@stdlib/stats/base/dists/arcsine/median","base.dists.arcsine.mode":"@stdlib/stats/base/dists/arcsine/mode","base.dists.arcsine.pdf":"@stdlib/stats/base/dists/arcsine/pdf","base.dists.arcsine.quantile":"@stdlib/stats/base/dists/arcsine/quantile","base.dists.arcsine.skewness":"@stdlib/stats/base/dists/arcsine/skewness","base.dists.arcsine.stdev":"@stdlib/stats/base/dists/arcsine/stdev","base.dists.arcsine.variance":"@stdlib/stats/base/dists/arcsine/variance","base.dists.bernoulli.Bernoulli":"@stdlib/stats/base/dists/bernoulli/ctor","base.dists.bernoulli.cdf":"@stdlib/stats/base/dists/bernoulli/cdf","base.dists.bernoulli.entropy":"@stdlib/stats/base/dists/bernoulli/entropy","base.dists.bernoulli.kurtosis":"@stdlib/stats/base/dists/bernoulli/kurtosis","base.dists.bernoulli.mean":"@stdlib/stats/base/dists/bernoulli/mean","base.dists.bernoulli.median":"@stdlib/stats/base/dists/bernoulli/median","base.dists.bernoulli.mgf":"@stdlib/stats/base/dists/bernoulli/mgf","base.dists.bernoulli.mode":"@stdlib/stats/base/dists/bernoulli/mode","base.dists.bernoulli.pmf":"@stdlib/stats/base/dists/bernoulli/pmf","base.dists.bernoulli.quantile":"@stdlib/stats/base/dists/bernoulli/quantile","base.dists.bernoulli.skewness":"@stdlib/stats/base/dists/bernoulli/skewness","base.dists.bernoulli.stdev":"@stdlib/stats/base/dists/bernoulli/stdev","base.dists.bernoulli.variance":"@stdlib/stats/base/dists/bernoulli/variance","base.dists.beta.Beta":"@stdlib/stats/base/dists/beta/ctor","base.dists.beta.cdf":"@stdlib/stats/base/dists/beta/cdf","base.dists.beta.entropy":"@stdlib/stats/base/dists/beta/entropy","base.dists.beta.kurtosis":"@stdlib/stats/base/dists/beta/kurtosis","base.dists.beta.logcdf":"@stdlib/stats/base/dists/beta/logcdf","base.dists.beta.logpdf":"@stdlib/stats/base/dists/beta/logpdf","base.dists.beta.mean":"@stdlib/stats/base/dists/beta/mean","base.dists.beta.median":"@stdlib/stats/base/dists/beta/median","base.dists.beta.mgf":"@stdlib/stats/base/dists/beta/mgf","base.dists.beta.mode":"@stdlib/stats/base/dists/beta/mode","base.dists.beta.pdf":"@stdlib/stats/base/dists/beta/pdf","base.dists.beta.quantile":"@stdlib/stats/base/dists/beta/quantile","base.dists.beta.skewness":"@stdlib/stats/base/dists/beta/skewness","base.dists.beta.stdev":"@stdlib/stats/base/dists/beta/stdev","base.dists.beta.variance":"@stdlib/stats/base/dists/beta/variance","base.dists.betaprime.BetaPrime":"@stdlib/stats/base/dists/betaprime/ctor","base.dists.betaprime.cdf":"@stdlib/stats/base/dists/betaprime/cdf","base.dists.betaprime.kurtosis":"@stdlib/stats/base/dists/betaprime/kurtosis","base.dists.betaprime.logcdf":"@stdlib/stats/base/dists/betaprime/logcdf","base.dists.betaprime.logpdf":"@stdlib/stats/base/dists/betaprime/logpdf","base.dists.betaprime.mean":"@stdlib/stats/base/dists/betaprime/mean","base.dists.betaprime.mode":"@stdlib/stats/base/dists/betaprime/mode","base.dists.betaprime.pdf":"@stdlib/stats/base/dists/betaprime/pdf","base.dists.betaprime.quantile":"@stdlib/stats/base/dists/betaprime/quantile","base.dists.betaprime.skewness":"@stdlib/stats/base/dists/betaprime/skewness","base.dists.betaprime.stdev":"@stdlib/stats/base/dists/betaprime/stdev","base.dists.betaprime.variance":"@stdlib/stats/base/dists/betaprime/variance","base.dists.binomial.Binomial":"@stdlib/stats/base/dists/binomial/ctor","base.dists.binomial.cdf":"@stdlib/stats/base/dists/binomial/cdf","base.dists.binomial.entropy":"@stdlib/stats/base/dists/binomial/entropy","base.dists.binomial.kurtosis":"@stdlib/stats/base/dists/binomial/kurtosis","base.dists.binomial.logpmf":"@stdlib/stats/base/dists/binomial/logpmf","base.dists.binomial.mean":"@stdlib/stats/base/dists/binomial/mean","base.dists.binomial.median":"@stdlib/stats/base/dists/binomial/median","base.dists.binomial.mgf":"@stdlib/stats/base/dists/binomial/mgf","base.dists.binomial.mode":"@stdlib/stats/base/dists/binomial/mode","base.dists.binomial.pmf":"@stdlib/stats/base/dists/binomial/pmf","base.dists.binomial.quantile":"@stdlib/stats/base/dists/binomial/quantile","base.dists.binomial.skewness":"@stdlib/stats/base/dists/binomial/skewness","base.dists.binomial.stdev":"@stdlib/stats/base/dists/binomial/stdev","base.dists.binomial.variance":"@stdlib/stats/base/dists/binomial/variance","base.dists.cauchy.Cauchy":"@stdlib/stats/base/dists/cauchy/ctor","base.dists.cauchy.cdf":"@stdlib/stats/base/dists/cauchy/cdf","base.dists.cauchy.entropy":"@stdlib/stats/base/dists/cauchy/entropy","base.dists.cauchy.logcdf":"@stdlib/stats/base/dists/cauchy/logcdf","base.dists.cauchy.logpdf":"@stdlib/stats/base/dists/cauchy/logpdf","base.dists.cauchy.median":"@stdlib/stats/base/dists/cauchy/median","base.dists.cauchy.mode":"@stdlib/stats/base/dists/cauchy/mode","base.dists.cauchy.pdf":"@stdlib/stats/base/dists/cauchy/pdf","base.dists.cauchy.quantile":"@stdlib/stats/base/dists/cauchy/quantile","base.dists.chi.cdf":"@stdlib/stats/base/dists/chi/cdf","base.dists.chi.Chi":"@stdlib/stats/base/dists/chi/ctor","base.dists.chi.entropy":"@stdlib/stats/base/dists/chi/entropy","base.dists.chi.kurtosis":"@stdlib/stats/base/dists/chi/kurtosis","base.dists.chi.logpdf":"@stdlib/stats/base/dists/chi/logpdf","base.dists.chi.mean":"@stdlib/stats/base/dists/chi/mean","base.dists.chi.mode":"@stdlib/stats/base/dists/chi/mode","base.dists.chi.pdf":"@stdlib/stats/base/dists/chi/pdf","base.dists.chi.quantile":"@stdlib/stats/base/dists/chi/quantile","base.dists.chi.skewness":"@stdlib/stats/base/dists/chi/skewness","base.dists.chi.stdev":"@stdlib/stats/base/dists/chi/stdev","base.dists.chi.variance":"@stdlib/stats/base/dists/chi/variance","base.dists.chisquare.cdf":"@stdlib/stats/base/dists/chisquare/cdf","base.dists.chisquare.ChiSquare":"@stdlib/stats/base/dists/chisquare/ctor","base.dists.chisquare.entropy":"@stdlib/stats/base/dists/chisquare/entropy","base.dists.chisquare.kurtosis":"@stdlib/stats/base/dists/chisquare/kurtosis","base.dists.chisquare.logpdf":"@stdlib/stats/base/dists/chisquare/logpdf","base.dists.chisquare.mean":"@stdlib/stats/base/dists/chisquare/mean","base.dists.chisquare.median":"@stdlib/stats/base/dists/chisquare/median","base.dists.chisquare.mgf":"@stdlib/stats/base/dists/chisquare/mgf","base.dists.chisquare.mode":"@stdlib/stats/base/dists/chisquare/mode","base.dists.chisquare.pdf":"@stdlib/stats/base/dists/chisquare/pdf","base.dists.chisquare.quantile":"@stdlib/stats/base/dists/chisquare/quantile","base.dists.chisquare.skewness":"@stdlib/stats/base/dists/chisquare/skewness","base.dists.chisquare.stdev":"@stdlib/stats/base/dists/chisquare/stdev","base.dists.chisquare.variance":"@stdlib/stats/base/dists/chisquare/variance","base.dists.cosine.cdf":"@stdlib/stats/base/dists/cosine/cdf","base.dists.cosine.Cosine":"@stdlib/stats/base/dists/cosine/ctor","base.dists.cosine.kurtosis":"@stdlib/stats/base/dists/cosine/kurtosis","base.dists.cosine.logcdf":"@stdlib/stats/base/dists/cosine/logcdf","base.dists.cosine.logpdf":"@stdlib/stats/base/dists/cosine/logpdf","base.dists.cosine.mean":"@stdlib/stats/base/dists/cosine/mean","base.dists.cosine.median":"@stdlib/stats/base/dists/cosine/median","base.dists.cosine.mgf":"@stdlib/stats/base/dists/cosine/mgf","base.dists.cosine.mode":"@stdlib/stats/base/dists/cosine/mode","base.dists.cosine.pdf":"@stdlib/stats/base/dists/cosine/pdf","base.dists.cosine.quantile":"@stdlib/stats/base/dists/cosine/quantile","base.dists.cosine.skewness":"@stdlib/stats/base/dists/cosine/skewness","base.dists.cosine.stdev":"@stdlib/stats/base/dists/cosine/stdev","base.dists.cosine.variance":"@stdlib/stats/base/dists/cosine/variance","base.dists.degenerate.cdf":"@stdlib/stats/base/dists/degenerate/cdf","base.dists.degenerate.Degenerate":"@stdlib/stats/base/dists/degenerate/ctor","base.dists.degenerate.entropy":"@stdlib/stats/base/dists/degenerate/entropy","base.dists.degenerate.logcdf":"@stdlib/stats/base/dists/degenerate/logcdf","base.dists.degenerate.logpdf":"@stdlib/stats/base/dists/degenerate/logpdf","base.dists.degenerate.logpmf":"@stdlib/stats/base/dists/degenerate/logpmf","base.dists.degenerate.mean":"@stdlib/stats/base/dists/degenerate/mean","base.dists.degenerate.median":"@stdlib/stats/base/dists/degenerate/median","base.dists.degenerate.mgf":"@stdlib/stats/base/dists/degenerate/mgf","base.dists.degenerate.mode":"@stdlib/stats/base/dists/degenerate/mode","base.dists.degenerate.pdf":"@stdlib/stats/base/dists/degenerate/pdf","base.dists.degenerate.pmf":"@stdlib/stats/base/dists/degenerate/pmf","base.dists.degenerate.quantile":"@stdlib/stats/base/dists/degenerate/quantile","base.dists.degenerate.stdev":"@stdlib/stats/base/dists/degenerate/stdev","base.dists.degenerate.variance":"@stdlib/stats/base/dists/degenerate/variance","base.dists.discreteUniform.cdf":"@stdlib/stats/base/dists/discrete-uniform/cdf","base.dists.discreteUniform.DiscreteUniform":"@stdlib/stats/base/dists/discrete-uniform/ctor","base.dists.discreteUniform.kurtosis":"@stdlib/stats/base/dists/discrete-uniform/kurtosis","base.dists.discreteUniform.logcdf":"@stdlib/stats/base/dists/discrete-uniform/logcdf","base.dists.discreteUniform.logpmf":"@stdlib/stats/base/dists/discrete-uniform/logpmf","base.dists.discreteUniform.mean":"@stdlib/stats/base/dists/discrete-uniform/mean","base.dists.discreteUniform.median":"@stdlib/stats/base/dists/discrete-uniform/median","base.dists.discreteUniform.mgf":"@stdlib/stats/base/dists/discrete-uniform/mgf","base.dists.discreteUniform.pmf":"@stdlib/stats/base/dists/discrete-uniform/pmf","base.dists.discreteUniform.quantile":"@stdlib/stats/base/dists/discrete-uniform/quantile","base.dists.discreteUniform.skewness":"@stdlib/stats/base/dists/discrete-uniform/skewness","base.dists.discreteUniform.stdev":"@stdlib/stats/base/dists/discrete-uniform/stdev","base.dists.discreteUniform.variance":"@stdlib/stats/base/dists/discrete-uniform/variance","base.dists.erlang.cdf":"@stdlib/stats/base/dists/erlang/cdf","base.dists.erlang.entropy":"@stdlib/stats/base/dists/erlang/entropy","base.dists.erlang.Erlang":"@stdlib/stats/base/dists/erlang/ctor","base.dists.erlang.kurtosis":"@stdlib/stats/base/dists/erlang/kurtosis","base.dists.erlang.logpdf":"@stdlib/stats/base/dists/erlang/logpdf","base.dists.erlang.mean":"@stdlib/stats/base/dists/erlang/mean","base.dists.erlang.mgf":"@stdlib/stats/base/dists/erlang/mgf","base.dists.erlang.mode":"@stdlib/stats/base/dists/erlang/mode","base.dists.erlang.pdf":"@stdlib/stats/base/dists/erlang/pdf","base.dists.erlang.quantile":"@stdlib/stats/base/dists/erlang/quantile","base.dists.erlang.skewness":"@stdlib/stats/base/dists/erlang/skewness","base.dists.erlang.stdev":"@stdlib/stats/base/dists/erlang/stdev","base.dists.erlang.variance":"@stdlib/stats/base/dists/erlang/variance","base.dists.exponential.cdf":"@stdlib/stats/base/dists/exponential/cdf","base.dists.exponential.entropy":"@stdlib/stats/base/dists/exponential/entropy","base.dists.exponential.Exponential":"@stdlib/stats/base/dists/exponential/ctor","base.dists.exponential.kurtosis":"@stdlib/stats/base/dists/exponential/kurtosis","base.dists.exponential.logcdf":"@stdlib/stats/base/dists/exponential/logcdf","base.dists.exponential.logpdf":"@stdlib/stats/base/dists/exponential/logpdf","base.dists.exponential.mean":"@stdlib/stats/base/dists/exponential/mean","base.dists.exponential.median":"@stdlib/stats/base/dists/exponential/median","base.dists.exponential.mgf":"@stdlib/stats/base/dists/exponential/mgf","base.dists.exponential.mode":"@stdlib/stats/base/dists/exponential/mode","base.dists.exponential.pdf":"@stdlib/stats/base/dists/exponential/pdf","base.dists.exponential.quantile":"@stdlib/stats/base/dists/exponential/quantile","base.dists.exponential.skewness":"@stdlib/stats/base/dists/exponential/skewness","base.dists.exponential.stdev":"@stdlib/stats/base/dists/exponential/stdev","base.dists.exponential.variance":"@stdlib/stats/base/dists/exponential/variance","base.dists.f.cdf":"@stdlib/stats/base/dists/f/cdf","base.dists.f.entropy":"@stdlib/stats/base/dists/f/entropy","base.dists.f.F":"@stdlib/stats/base/dists/f/ctor","base.dists.f.kurtosis":"@stdlib/stats/base/dists/f/kurtosis","base.dists.f.mean":"@stdlib/stats/base/dists/f/mean","base.dists.f.mode":"@stdlib/stats/base/dists/f/mode","base.dists.f.pdf":"@stdlib/stats/base/dists/f/pdf","base.dists.f.quantile":"@stdlib/stats/base/dists/f/quantile","base.dists.f.skewness":"@stdlib/stats/base/dists/f/skewness","base.dists.f.stdev":"@stdlib/stats/base/dists/f/stdev","base.dists.f.variance":"@stdlib/stats/base/dists/f/variance","base.dists.frechet.cdf":"@stdlib/stats/base/dists/frechet/cdf","base.dists.frechet.entropy":"@stdlib/stats/base/dists/frechet/entropy","base.dists.frechet.Frechet":"@stdlib/stats/base/dists/frechet/ctor","base.dists.frechet.kurtosis":"@stdlib/stats/base/dists/frechet/kurtosis","base.dists.frechet.logcdf":"@stdlib/stats/base/dists/frechet/logcdf","base.dists.frechet.logpdf":"@stdlib/stats/base/dists/frechet/logpdf","base.dists.frechet.mean":"@stdlib/stats/base/dists/frechet/mean","base.dists.frechet.median":"@stdlib/stats/base/dists/frechet/median","base.dists.frechet.mode":"@stdlib/stats/base/dists/frechet/mode","base.dists.frechet.pdf":"@stdlib/stats/base/dists/frechet/pdf","base.dists.frechet.quantile":"@stdlib/stats/base/dists/frechet/quantile","base.dists.frechet.skewness":"@stdlib/stats/base/dists/frechet/skewness","base.dists.frechet.stdev":"@stdlib/stats/base/dists/frechet/stdev","base.dists.frechet.variance":"@stdlib/stats/base/dists/frechet/variance","base.dists.gamma.cdf":"@stdlib/stats/base/dists/gamma/cdf","base.dists.gamma.entropy":"@stdlib/stats/base/dists/gamma/entropy","base.dists.gamma.Gamma":"@stdlib/stats/base/dists/gamma/ctor","base.dists.gamma.kurtosis":"@stdlib/stats/base/dists/gamma/kurtosis","base.dists.gamma.logcdf":"@stdlib/stats/base/dists/gamma/logcdf","base.dists.gamma.logpdf":"@stdlib/stats/base/dists/gamma/logpdf","base.dists.gamma.mean":"@stdlib/stats/base/dists/gamma/mean","base.dists.gamma.mgf":"@stdlib/stats/base/dists/gamma/mgf","base.dists.gamma.mode":"@stdlib/stats/base/dists/gamma/mode","base.dists.gamma.pdf":"@stdlib/stats/base/dists/gamma/pdf","base.dists.gamma.quantile":"@stdlib/stats/base/dists/gamma/quantile","base.dists.gamma.skewness":"@stdlib/stats/base/dists/gamma/skewness","base.dists.gamma.stdev":"@stdlib/stats/base/dists/gamma/stdev","base.dists.gamma.variance":"@stdlib/stats/base/dists/gamma/variance","base.dists.geometric.cdf":"@stdlib/stats/base/dists/geometric/cdf","base.dists.geometric.entropy":"@stdlib/stats/base/dists/geometric/entropy","base.dists.geometric.Geometric":"@stdlib/stats/base/dists/geometric/ctor","base.dists.geometric.kurtosis":"@stdlib/stats/base/dists/geometric/kurtosis","base.dists.geometric.logcdf":"@stdlib/stats/base/dists/geometric/logcdf","base.dists.geometric.logpmf":"@stdlib/stats/base/dists/geometric/logpmf","base.dists.geometric.mean":"@stdlib/stats/base/dists/geometric/mean","base.dists.geometric.median":"@stdlib/stats/base/dists/geometric/median","base.dists.geometric.mgf":"@stdlib/stats/base/dists/geometric/mgf","base.dists.geometric.mode":"@stdlib/stats/base/dists/geometric/mode","base.dists.geometric.pmf":"@stdlib/stats/base/dists/geometric/pmf","base.dists.geometric.quantile":"@stdlib/stats/base/dists/geometric/quantile","base.dists.geometric.skewness":"@stdlib/stats/base/dists/geometric/skewness","base.dists.geometric.stdev":"@stdlib/stats/base/dists/geometric/stdev","base.dists.geometric.variance":"@stdlib/stats/base/dists/geometric/variance","base.dists.gumbel.cdf":"@stdlib/stats/base/dists/gumbel/cdf","base.dists.gumbel.entropy":"@stdlib/stats/base/dists/gumbel/entropy","base.dists.gumbel.Gumbel":"@stdlib/stats/base/dists/gumbel/ctor","base.dists.gumbel.kurtosis":"@stdlib/stats/base/dists/gumbel/kurtosis","base.dists.gumbel.logcdf":"@stdlib/stats/base/dists/gumbel/logcdf","base.dists.gumbel.logpdf":"@stdlib/stats/base/dists/gumbel/logpdf","base.dists.gumbel.mean":"@stdlib/stats/base/dists/gumbel/mean","base.dists.gumbel.median":"@stdlib/stats/base/dists/gumbel/median","base.dists.gumbel.mgf":"@stdlib/stats/base/dists/gumbel/mgf","base.dists.gumbel.mode":"@stdlib/stats/base/dists/gumbel/mode","base.dists.gumbel.pdf":"@stdlib/stats/base/dists/gumbel/pdf","base.dists.gumbel.quantile":"@stdlib/stats/base/dists/gumbel/quantile","base.dists.gumbel.skewness":"@stdlib/stats/base/dists/gumbel/skewness","base.dists.gumbel.stdev":"@stdlib/stats/base/dists/gumbel/stdev","base.dists.gumbel.variance":"@stdlib/stats/base/dists/gumbel/variance","base.dists.hypergeometric.cdf":"@stdlib/stats/base/dists/hypergeometric/cdf","base.dists.hypergeometric.Hypergeometric":"@stdlib/stats/base/dists/hypergeometric/ctor","base.dists.hypergeometric.kurtosis":"@stdlib/stats/base/dists/hypergeometric/kurtosis","base.dists.hypergeometric.logpmf":"@stdlib/stats/base/dists/hypergeometric/logpmf","base.dists.hypergeometric.mean":"@stdlib/stats/base/dists/hypergeometric/mean","base.dists.hypergeometric.mode":"@stdlib/stats/base/dists/hypergeometric/mode","base.dists.hypergeometric.pmf":"@stdlib/stats/base/dists/hypergeometric/pmf","base.dists.hypergeometric.quantile":"@stdlib/stats/base/dists/hypergeometric/quantile","base.dists.hypergeometric.skewness":"@stdlib/stats/base/dists/hypergeometric/skewness","base.dists.hypergeometric.stdev":"@stdlib/stats/base/dists/hypergeometric/stdev","base.dists.hypergeometric.variance":"@stdlib/stats/base/dists/hypergeometric/variance","base.dists.invgamma.cdf":"@stdlib/stats/base/dists/invgamma/cdf","base.dists.invgamma.entropy":"@stdlib/stats/base/dists/invgamma/entropy","base.dists.invgamma.InvGamma":"@stdlib/stats/base/dists/invgamma/ctor","base.dists.invgamma.kurtosis":"@stdlib/stats/base/dists/invgamma/kurtosis","base.dists.invgamma.logpdf":"@stdlib/stats/base/dists/invgamma/logpdf","base.dists.invgamma.mean":"@stdlib/stats/base/dists/invgamma/mean","base.dists.invgamma.mode":"@stdlib/stats/base/dists/invgamma/mode","base.dists.invgamma.pdf":"@stdlib/stats/base/dists/invgamma/pdf","base.dists.invgamma.quantile":"@stdlib/stats/base/dists/invgamma/quantile","base.dists.invgamma.skewness":"@stdlib/stats/base/dists/invgamma/skewness","base.dists.invgamma.stdev":"@stdlib/stats/base/dists/invgamma/stdev","base.dists.invgamma.variance":"@stdlib/stats/base/dists/invgamma/variance","base.dists.kumaraswamy.cdf":"@stdlib/stats/base/dists/kumaraswamy/cdf","base.dists.kumaraswamy.Kumaraswamy":"@stdlib/stats/base/dists/kumaraswamy/ctor","base.dists.kumaraswamy.kurtosis":"@stdlib/stats/base/dists/kumaraswamy/kurtosis","base.dists.kumaraswamy.logcdf":"@stdlib/stats/base/dists/kumaraswamy/logcdf","base.dists.kumaraswamy.logpdf":"@stdlib/stats/base/dists/kumaraswamy/logpdf","base.dists.kumaraswamy.mean":"@stdlib/stats/base/dists/kumaraswamy/mean","base.dists.kumaraswamy.median":"@stdlib/stats/base/dists/kumaraswamy/median","base.dists.kumaraswamy.mode":"@stdlib/stats/base/dists/kumaraswamy/mode","base.dists.kumaraswamy.pdf":"@stdlib/stats/base/dists/kumaraswamy/pdf","base.dists.kumaraswamy.quantile":"@stdlib/stats/base/dists/kumaraswamy/quantile","base.dists.kumaraswamy.skewness":"@stdlib/stats/base/dists/kumaraswamy/skewness","base.dists.kumaraswamy.stdev":"@stdlib/stats/base/dists/kumaraswamy/stdev","base.dists.kumaraswamy.variance":"@stdlib/stats/base/dists/kumaraswamy/variance","base.dists.laplace.cdf":"@stdlib/stats/base/dists/laplace/cdf","base.dists.laplace.entropy":"@stdlib/stats/base/dists/laplace/entropy","base.dists.laplace.kurtosis":"@stdlib/stats/base/dists/laplace/kurtosis","base.dists.laplace.Laplace":"@stdlib/stats/base/dists/laplace/ctor","base.dists.laplace.logcdf":"@stdlib/stats/base/dists/laplace/logcdf","base.dists.laplace.logpdf":"@stdlib/stats/base/dists/laplace/logpdf","base.dists.laplace.mean":"@stdlib/stats/base/dists/laplace/mean","base.dists.laplace.median":"@stdlib/stats/base/dists/laplace/median","base.dists.laplace.mgf":"@stdlib/stats/base/dists/laplace/mgf","base.dists.laplace.mode":"@stdlib/stats/base/dists/laplace/mode","base.dists.laplace.pdf":"@stdlib/stats/base/dists/laplace/pdf","base.dists.laplace.quantile":"@stdlib/stats/base/dists/laplace/quantile","base.dists.laplace.skewness":"@stdlib/stats/base/dists/laplace/skewness","base.dists.laplace.stdev":"@stdlib/stats/base/dists/laplace/stdev","base.dists.laplace.variance":"@stdlib/stats/base/dists/laplace/variance","base.dists.levy.cdf":"@stdlib/stats/base/dists/levy/cdf","base.dists.levy.entropy":"@stdlib/stats/base/dists/levy/entropy","base.dists.levy.Levy":"@stdlib/stats/base/dists/levy/ctor","base.dists.levy.logcdf":"@stdlib/stats/base/dists/levy/logcdf","base.dists.levy.logpdf":"@stdlib/stats/base/dists/levy/logpdf","base.dists.levy.mean":"@stdlib/stats/base/dists/levy/mean","base.dists.levy.median":"@stdlib/stats/base/dists/levy/median","base.dists.levy.mode":"@stdlib/stats/base/dists/levy/mode","base.dists.levy.pdf":"@stdlib/stats/base/dists/levy/pdf","base.dists.levy.quantile":"@stdlib/stats/base/dists/levy/quantile","base.dists.levy.stdev":"@stdlib/stats/base/dists/levy/stdev","base.dists.levy.variance":"@stdlib/stats/base/dists/levy/variance","base.dists.logistic.cdf":"@stdlib/stats/base/dists/logistic/cdf","base.dists.logistic.entropy":"@stdlib/stats/base/dists/logistic/entropy","base.dists.logistic.kurtosis":"@stdlib/stats/base/dists/logistic/kurtosis","base.dists.logistic.logcdf":"@stdlib/stats/base/dists/logistic/logcdf","base.dists.logistic.Logistic":"@stdlib/stats/base/dists/logistic/ctor","base.dists.logistic.logpdf":"@stdlib/stats/base/dists/logistic/logpdf","base.dists.logistic.mean":"@stdlib/stats/base/dists/logistic/mean","base.dists.logistic.median":"@stdlib/stats/base/dists/logistic/median","base.dists.logistic.mgf":"@stdlib/stats/base/dists/logistic/mgf","base.dists.logistic.mode":"@stdlib/stats/base/dists/logistic/mode","base.dists.logistic.pdf":"@stdlib/stats/base/dists/logistic/pdf","base.dists.logistic.quantile":"@stdlib/stats/base/dists/logistic/quantile","base.dists.logistic.skewness":"@stdlib/stats/base/dists/logistic/skewness","base.dists.logistic.stdev":"@stdlib/stats/base/dists/logistic/stdev","base.dists.logistic.variance":"@stdlib/stats/base/dists/logistic/variance","base.dists.lognormal.cdf":"@stdlib/stats/base/dists/lognormal/cdf","base.dists.lognormal.entropy":"@stdlib/stats/base/dists/lognormal/entropy","base.dists.lognormal.kurtosis":"@stdlib/stats/base/dists/lognormal/kurtosis","base.dists.lognormal.LogNormal":"@stdlib/stats/base/dists/lognormal/ctor","base.dists.lognormal.logpdf":"@stdlib/stats/base/dists/lognormal/logpdf","base.dists.lognormal.mean":"@stdlib/stats/base/dists/lognormal/mean","base.dists.lognormal.median":"@stdlib/stats/base/dists/lognormal/median","base.dists.lognormal.mode":"@stdlib/stats/base/dists/lognormal/mode","base.dists.lognormal.pdf":"@stdlib/stats/base/dists/lognormal/pdf","base.dists.lognormal.quantile":"@stdlib/stats/base/dists/lognormal/quantile","base.dists.lognormal.skewness":"@stdlib/stats/base/dists/lognormal/skewness","base.dists.lognormal.stdev":"@stdlib/stats/base/dists/lognormal/stdev","base.dists.lognormal.variance":"@stdlib/stats/base/dists/lognormal/variance","base.dists.negativeBinomial.cdf":"@stdlib/stats/base/dists/negative-binomial/cdf","base.dists.negativeBinomial.kurtosis":"@stdlib/stats/base/dists/negative-binomial/kurtosis","base.dists.negativeBinomial.logpmf":"@stdlib/stats/base/dists/negative-binomial/logpmf","base.dists.negativeBinomial.mean":"@stdlib/stats/base/dists/negative-binomial/mean","base.dists.negativeBinomial.mgf":"@stdlib/stats/base/dists/negative-binomial/mgf","base.dists.negativeBinomial.mode":"@stdlib/stats/base/dists/negative-binomial/mode","base.dists.negativeBinomial.NegativeBinomial":"@stdlib/stats/base/dists/negative-binomial/ctor","base.dists.negativeBinomial.pmf":"@stdlib/stats/base/dists/negative-binomial/pmf","base.dists.negativeBinomial.quantile":"@stdlib/stats/base/dists/negative-binomial/quantile","base.dists.negativeBinomial.skewness":"@stdlib/stats/base/dists/negative-binomial/skewness","base.dists.negativeBinomial.stdev":"@stdlib/stats/base/dists/negative-binomial/stdev","base.dists.negativeBinomial.variance":"@stdlib/stats/base/dists/negative-binomial/variance","base.dists.normal.cdf":"@stdlib/stats/base/dists/normal/cdf","base.dists.normal.entropy":"@stdlib/stats/base/dists/normal/entropy","base.dists.normal.kurtosis":"@stdlib/stats/base/dists/normal/kurtosis","base.dists.normal.logpdf":"@stdlib/stats/base/dists/normal/logpdf","base.dists.normal.mean":"@stdlib/stats/base/dists/normal/mean","base.dists.normal.median":"@stdlib/stats/base/dists/normal/median","base.dists.normal.mgf":"@stdlib/stats/base/dists/normal/mgf","base.dists.normal.mode":"@stdlib/stats/base/dists/normal/mode","base.dists.normal.Normal":"@stdlib/stats/base/dists/normal/ctor","base.dists.normal.pdf":"@stdlib/stats/base/dists/normal/pdf","base.dists.normal.quantile":"@stdlib/stats/base/dists/normal/quantile","base.dists.normal.skewness":"@stdlib/stats/base/dists/normal/skewness","base.dists.normal.stdev":"@stdlib/stats/base/dists/normal/stdev","base.dists.normal.variance":"@stdlib/stats/base/dists/normal/variance","base.dists.pareto1.cdf":"@stdlib/stats/base/dists/pareto-type1/cdf","base.dists.pareto1.entropy":"@stdlib/stats/base/dists/pareto-type1/entropy","base.dists.pareto1.kurtosis":"@stdlib/stats/base/dists/pareto-type1/kurtosis","base.dists.pareto1.logcdf":"@stdlib/stats/base/dists/pareto-type1/logcdf","base.dists.pareto1.logpdf":"@stdlib/stats/base/dists/pareto-type1/logpdf","base.dists.pareto1.mean":"@stdlib/stats/base/dists/pareto-type1/mean","base.dists.pareto1.median":"@stdlib/stats/base/dists/pareto-type1/median","base.dists.pareto1.mode":"@stdlib/stats/base/dists/pareto-type1/mode","base.dists.pareto1.Pareto1":"@stdlib/stats/base/dists/pareto-type1/ctor","base.dists.pareto1.pdf":"@stdlib/stats/base/dists/pareto-type1/pdf","base.dists.pareto1.quantile":"@stdlib/stats/base/dists/pareto-type1/quantile","base.dists.pareto1.skewness":"@stdlib/stats/base/dists/pareto-type1/skewness","base.dists.pareto1.stdev":"@stdlib/stats/base/dists/pareto-type1/stdev","base.dists.pareto1.variance":"@stdlib/stats/base/dists/pareto-type1/variance","base.dists.poisson.cdf":"@stdlib/stats/base/dists/poisson/cdf","base.dists.poisson.entropy":"@stdlib/stats/base/dists/poisson/entropy","base.dists.poisson.kurtosis":"@stdlib/stats/base/dists/poisson/kurtosis","base.dists.poisson.logpmf":"@stdlib/stats/base/dists/poisson/logpmf","base.dists.poisson.mean":"@stdlib/stats/base/dists/poisson/mean","base.dists.poisson.median":"@stdlib/stats/base/dists/poisson/median","base.dists.poisson.mgf":"@stdlib/stats/base/dists/poisson/mgf","base.dists.poisson.mode":"@stdlib/stats/base/dists/poisson/mode","base.dists.poisson.pmf":"@stdlib/stats/base/dists/poisson/pmf","base.dists.poisson.Poisson":"@stdlib/stats/base/dists/poisson/ctor","base.dists.poisson.quantile":"@stdlib/stats/base/dists/poisson/quantile","base.dists.poisson.skewness":"@stdlib/stats/base/dists/poisson/skewness","base.dists.poisson.stdev":"@stdlib/stats/base/dists/poisson/stdev","base.dists.poisson.variance":"@stdlib/stats/base/dists/poisson/variance","base.dists.rayleigh.cdf":"@stdlib/stats/base/dists/rayleigh/cdf","base.dists.rayleigh.entropy":"@stdlib/stats/base/dists/rayleigh/entropy","base.dists.rayleigh.kurtosis":"@stdlib/stats/base/dists/rayleigh/kurtosis","base.dists.rayleigh.logcdf":"@stdlib/stats/base/dists/rayleigh/logcdf","base.dists.rayleigh.logpdf":"@stdlib/stats/base/dists/rayleigh/logpdf","base.dists.rayleigh.mean":"@stdlib/stats/base/dists/rayleigh/mean","base.dists.rayleigh.median":"@stdlib/stats/base/dists/rayleigh/median","base.dists.rayleigh.mgf":"@stdlib/stats/base/dists/rayleigh/mgf","base.dists.rayleigh.mode":"@stdlib/stats/base/dists/rayleigh/mode","base.dists.rayleigh.pdf":"@stdlib/stats/base/dists/rayleigh/pdf","base.dists.rayleigh.quantile":"@stdlib/stats/base/dists/rayleigh/quantile","base.dists.rayleigh.Rayleigh":"@stdlib/stats/base/dists/rayleigh/ctor","base.dists.rayleigh.skewness":"@stdlib/stats/base/dists/rayleigh/skewness","base.dists.rayleigh.stdev":"@stdlib/stats/base/dists/rayleigh/stdev","base.dists.rayleigh.variance":"@stdlib/stats/base/dists/rayleigh/variance","base.dists.signrank.cdf":"@stdlib/stats/base/dists/signrank/cdf","base.dists.signrank.pdf":"@stdlib/stats/base/dists/signrank/pdf","base.dists.signrank.quantile":"@stdlib/stats/base/dists/signrank/quantile","base.dists.t.cdf":"@stdlib/stats/base/dists/t/cdf","base.dists.t.entropy":"@stdlib/stats/base/dists/t/entropy","base.dists.t.kurtosis":"@stdlib/stats/base/dists/t/kurtosis","base.dists.t.mean":"@stdlib/stats/base/dists/t/mean","base.dists.t.median":"@stdlib/stats/base/dists/t/median","base.dists.t.mode":"@stdlib/stats/base/dists/t/mode","base.dists.t.pdf":"@stdlib/stats/base/dists/t/pdf","base.dists.t.quantile":"@stdlib/stats/base/dists/t/quantile","base.dists.t.skewness":"@stdlib/stats/base/dists/t/skewness","base.dists.t.stdev":"@stdlib/stats/base/dists/t/stdev","base.dists.t.T":"@stdlib/stats/base/dists/t/ctor","base.dists.t.variance":"@stdlib/stats/base/dists/t/variance","base.dists.triangular.cdf":"@stdlib/stats/base/dists/triangular/cdf","base.dists.triangular.entropy":"@stdlib/stats/base/dists/triangular/entropy","base.dists.triangular.kurtosis":"@stdlib/stats/base/dists/triangular/kurtosis","base.dists.triangular.logcdf":"@stdlib/stats/base/dists/triangular/logcdf","base.dists.triangular.logpdf":"@stdlib/stats/base/dists/triangular/logpdf","base.dists.triangular.mean":"@stdlib/stats/base/dists/triangular/mean","base.dists.triangular.median":"@stdlib/stats/base/dists/triangular/median","base.dists.triangular.mgf":"@stdlib/stats/base/dists/triangular/mgf","base.dists.triangular.mode":"@stdlib/stats/base/dists/triangular/mode","base.dists.triangular.pdf":"@stdlib/stats/base/dists/triangular/pdf","base.dists.triangular.quantile":"@stdlib/stats/base/dists/triangular/quantile","base.dists.triangular.skewness":"@stdlib/stats/base/dists/triangular/skewness","base.dists.triangular.stdev":"@stdlib/stats/base/dists/triangular/stdev","base.dists.triangular.Triangular":"@stdlib/stats/base/dists/triangular/ctor","base.dists.triangular.variance":"@stdlib/stats/base/dists/triangular/variance","base.dists.uniform.cdf":"@stdlib/stats/base/dists/uniform/cdf","base.dists.uniform.entropy":"@stdlib/stats/base/dists/uniform/entropy","base.dists.uniform.kurtosis":"@stdlib/stats/base/dists/uniform/kurtosis","base.dists.uniform.logcdf":"@stdlib/stats/base/dists/uniform/logcdf","base.dists.uniform.logpdf":"@stdlib/stats/base/dists/uniform/logpdf","base.dists.uniform.mean":"@stdlib/stats/base/dists/uniform/mean","base.dists.uniform.median":"@stdlib/stats/base/dists/uniform/median","base.dists.uniform.mgf":"@stdlib/stats/base/dists/uniform/mgf","base.dists.uniform.pdf":"@stdlib/stats/base/dists/uniform/pdf","base.dists.uniform.quantile":"@stdlib/stats/base/dists/uniform/quantile","base.dists.uniform.skewness":"@stdlib/stats/base/dists/uniform/skewness","base.dists.uniform.stdev":"@stdlib/stats/base/dists/uniform/stdev","base.dists.uniform.Uniform":"@stdlib/stats/base/dists/uniform/ctor","base.dists.uniform.variance":"@stdlib/stats/base/dists/uniform/variance","base.dists.weibull.cdf":"@stdlib/stats/base/dists/weibull/cdf","base.dists.weibull.entropy":"@stdlib/stats/base/dists/weibull/entropy","base.dists.weibull.kurtosis":"@stdlib/stats/base/dists/weibull/kurtosis","base.dists.weibull.logcdf":"@stdlib/stats/base/dists/weibull/logcdf","base.dists.weibull.logpdf":"@stdlib/stats/base/dists/weibull/logpdf","base.dists.weibull.mean":"@stdlib/stats/base/dists/weibull/mean","base.dists.weibull.median":"@stdlib/stats/base/dists/weibull/median","base.dists.weibull.mgf":"@stdlib/stats/base/dists/weibull/mgf","base.dists.weibull.mode":"@stdlib/stats/base/dists/weibull/mode","base.dists.weibull.pdf":"@stdlib/stats/base/dists/weibull/pdf","base.dists.weibull.quantile":"@stdlib/stats/base/dists/weibull/quantile","base.dists.weibull.skewness":"@stdlib/stats/base/dists/weibull/skewness","base.dists.weibull.stdev":"@stdlib/stats/base/dists/weibull/stdev","base.dists.weibull.variance":"@stdlib/stats/base/dists/weibull/variance","base.dists.weibull.Weibull":"@stdlib/stats/base/dists/weibull/ctor","base.ellipe":"@stdlib/math/base/special/ellipe","base.ellipk":"@stdlib/math/base/special/ellipk","base.epsdiff":"@stdlib/math/base/utils/float64-epsilon-difference","base.erf":"@stdlib/math/base/special/erf","base.erfc":"@stdlib/math/base/special/erfc","base.erfcinv":"@stdlib/math/base/special/erfcinv","base.erfinv":"@stdlib/math/base/special/erfinv","base.eta":"@stdlib/math/base/special/dirichlet-eta","base.evalpoly":"@stdlib/math/base/tools/evalpoly","base.evalrational":"@stdlib/math/base/tools/evalrational","base.exp":"@stdlib/math/base/special/exp","base.exp2":"@stdlib/math/base/special/exp2","base.exp10":"@stdlib/math/base/special/exp10","base.expit":"@stdlib/math/base/special/expit","base.expm1":"@stdlib/math/base/special/expm1","base.expm1rel":"@stdlib/math/base/special/expm1rel","base.exponent":"@stdlib/number/float64/base/exponent","base.exponentf":"@stdlib/number/float32/base/exponent","base.factorial":"@stdlib/math/base/special/factorial","base.factorialln":"@stdlib/math/base/special/factorialln","base.fallingFactorial":"@stdlib/math/base/special/falling-factorial","base.fibonacci":"@stdlib/math/base/special/fibonacci","base.fibonacciIndex":"@stdlib/math/base/special/fibonacci-index","base.fibpoly":"@stdlib/math/base/tools/fibpoly","base.flipsign":"@stdlib/math/base/special/flipsign","base.flipsignf":"@stdlib/math/base/special/flipsignf","base.float32ToInt32":"@stdlib/number/float32/base/to-int32","base.float32ToUint32":"@stdlib/number/float32/base/to-uint32","base.float64ToFloat32":"@stdlib/number/float64/base/to-float32","base.float64ToInt32":"@stdlib/number/float64/base/to-int32","base.float64ToInt64Bytes":"@stdlib/number/float64/base/to-int64-bytes","base.float64ToUint32":"@stdlib/number/float64/base/to-uint32","base.floor":"@stdlib/math/base/special/floor","base.floor2":"@stdlib/math/base/special/floor2","base.floor10":"@stdlib/math/base/special/floor10","base.floorb":"@stdlib/math/base/special/floorb","base.floorf":"@stdlib/math/base/special/floorf","base.floorn":"@stdlib/math/base/special/floorn","base.floorsd":"@stdlib/math/base/special/floorsd","base.fresnel":"@stdlib/math/base/special/fresnel","base.fresnelc":"@stdlib/math/base/special/fresnelc","base.fresnels":"@stdlib/math/base/special/fresnels","base.frexp":"@stdlib/math/base/special/frexp","base.fromBinaryString":"@stdlib/number/float64/base/from-binary-string","base.fromBinaryStringf":"@stdlib/number/float32/base/from-binary-string","base.fromBinaryStringUint8":"@stdlib/number/uint8/base/from-binary-string","base.fromBinaryStringUint16":"@stdlib/number/uint16/base/from-binary-string","base.fromBinaryStringUint32":"@stdlib/number/uint32/base/from-binary-string","base.fromInt64Bytes":"@stdlib/number/float64/base/from-int64-bytes","base.fromWordf":"@stdlib/number/float32/base/from-word","base.fromWords":"@stdlib/number/float64/base/from-words","base.gamma":"@stdlib/math/base/special/gamma","base.gamma1pm1":"@stdlib/math/base/special/gamma1pm1","base.gammaDeltaRatio":"@stdlib/math/base/special/gamma-delta-ratio","base.gammainc":"@stdlib/math/base/special/gammainc","base.gammaincinv":"@stdlib/math/base/special/gammaincinv","base.gammaLanczosSum":"@stdlib/math/base/special/gamma-lanczos-sum","base.gammaLanczosSumExpGScaled":"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled","base.gammaln":"@stdlib/math/base/special/gammaln","base.gcd":"@stdlib/math/base/special/gcd","base.getHighWord":"@stdlib/number/float64/base/get-high-word","base.getLowWord":"@stdlib/number/float64/base/get-low-word","base.hacovercos":"@stdlib/math/base/special/hacovercos","base.hacoversin":"@stdlib/math/base/special/hacoversin","base.havercos":"@stdlib/math/base/special/havercos","base.haversin":"@stdlib/math/base/special/haversin","base.heaviside":"@stdlib/math/base/special/heaviside","base.hermitepoly":"@stdlib/math/base/tools/hermitepoly","base.hypot":"@stdlib/math/base/special/hypot","base.hypotf":"@stdlib/math/base/special/hypotf","base.identity":"@stdlib/math/base/special/identity","base.identityf":"@stdlib/math/base/special/identityf","base.imul":"@stdlib/math/base/ops/imul","base.imuldw":"@stdlib/math/base/ops/imuldw","base.int32ToUint32":"@stdlib/number/int32/base/to-uint32","base.inv":"@stdlib/math/base/special/inv","base.invf":"@stdlib/math/base/special/invf","base.isComposite":"@stdlib/math/base/assert/is-composite","base.isCoprime":"@stdlib/math/base/assert/is-coprime","base.isEven":"@stdlib/math/base/assert/is-even","base.isEvenInt32":"@stdlib/math/base/assert/int32-is-even","base.isFinite":"@stdlib/math/base/assert/is-finite","base.isFinitef":"@stdlib/math/base/assert/is-finitef","base.isInfinite":"@stdlib/math/base/assert/is-infinite","base.isInfinitef":"@stdlib/math/base/assert/is-infinitef","base.isInteger":"@stdlib/math/base/assert/is-integer","base.isnan":"@stdlib/math/base/assert/is-nan","base.isnanf":"@stdlib/math/base/assert/is-nanf","base.isNegativeInteger":"@stdlib/math/base/assert/is-negative-integer","base.isNegativeZero":"@stdlib/math/base/assert/is-negative-zero","base.isNegativeZerof":"@stdlib/math/base/assert/is-negative-zerof","base.isNonNegativeInteger":"@stdlib/math/base/assert/is-nonnegative-integer","base.isNonPositiveInteger":"@stdlib/math/base/assert/is-nonpositive-integer","base.isOdd":"@stdlib/math/base/assert/is-odd","base.isOddInt32":"@stdlib/math/base/assert/int32-is-odd","base.isPositiveInteger":"@stdlib/math/base/assert/is-positive-integer","base.isPositiveZero":"@stdlib/math/base/assert/is-positive-zero","base.isPositiveZerof":"@stdlib/math/base/assert/is-positive-zerof","base.isPow2Uint32":"@stdlib/math/base/assert/uint32-is-pow2","base.isPrime":"@stdlib/math/base/assert/is-prime","base.isProbability":"@stdlib/math/base/assert/is-probability","base.isSafeInteger":"@stdlib/math/base/assert/is-safe-integer","base.kernelBetainc":"@stdlib/math/base/special/kernel-betainc","base.kernelBetaincinv":"@stdlib/math/base/special/kernel-betaincinv","base.kernelCos":"@stdlib/math/base/special/kernel-cos","base.kernelSin":"@stdlib/math/base/special/kernel-sin","base.kernelTan":"@stdlib/math/base/special/kernel-tan","base.kroneckerDelta":"@stdlib/math/base/special/kronecker-delta","base.kroneckerDeltaf":"@stdlib/math/base/special/kronecker-deltaf","base.labs":"@stdlib/math/base/special/labs","base.lcm":"@stdlib/math/base/special/lcm","base.ldexp":"@stdlib/math/base/special/ldexp","base.ln":"@stdlib/math/base/special/ln","base.log":"@stdlib/math/base/special/log","base.log1mexp":"@stdlib/math/base/special/log1mexp","base.log1p":"@stdlib/math/base/special/log1p","base.log1pexp":"@stdlib/math/base/special/log1pexp","base.log2":"@stdlib/math/base/special/log2","base.log10":"@stdlib/math/base/special/log10","base.logaddexp":"@stdlib/math/base/special/logaddexp","base.logit":"@stdlib/math/base/special/logit","base.lucas":"@stdlib/math/base/special/lucas","base.lucaspoly":"@stdlib/math/base/tools/lucaspoly","base.max":"@stdlib/math/base/special/max","base.maxabs":"@stdlib/math/base/special/maxabs","base.min":"@stdlib/math/base/special/min","base.minabs":"@stdlib/math/base/special/minabs","base.minmax":"@stdlib/math/base/special/minmax","base.minmaxabs":"@stdlib/math/base/special/minmaxabs","base.modf":"@stdlib/math/base/special/modf","base.mul":"@stdlib/math/base/ops/mul","base.mulf":"@stdlib/math/base/ops/mulf","base.ndarray":"@stdlib/ndarray/base/ctor","base.ndarrayUnary":"@stdlib/ndarray/base/unary","base.ndzeros":"@stdlib/ndarray/base/zeros","base.ndzerosLike":"@stdlib/ndarray/base/zeros-like","base.negafibonacci":"@stdlib/math/base/special/negafibonacci","base.negalucas":"@stdlib/math/base/special/negalucas","base.nonfibonacci":"@stdlib/math/base/special/nonfibonacci","base.normalize":"@stdlib/number/float64/base/normalize","base.normalizef":"@stdlib/number/float32/base/normalize","base.normhermitepoly":"@stdlib/math/base/tools/normhermitepoly","base.pdiff":"@stdlib/math/base/special/pdiff","base.pdifff":"@stdlib/math/base/special/pdifff","base.polygamma":"@stdlib/math/base/special/polygamma","base.pow":"@stdlib/math/base/special/pow","base.powm1":"@stdlib/math/base/special/powm1","base.rad2deg":"@stdlib/math/base/special/rad2deg","base.ramp":"@stdlib/math/base/special/ramp","base.rampf":"@stdlib/math/base/special/rampf","base.random.arcsine":"@stdlib/random/base/arcsine","base.random.bernoulli":"@stdlib/random/base/bernoulli","base.random.beta":"@stdlib/random/base/beta","base.random.betaprime":"@stdlib/random/base/betaprime","base.random.binomial":"@stdlib/random/base/binomial","base.random.boxMuller":"@stdlib/random/base/box-muller","base.random.cauchy":"@stdlib/random/base/cauchy","base.random.chi":"@stdlib/random/base/chi","base.random.chisquare":"@stdlib/random/base/chisquare","base.random.cosine":"@stdlib/random/base/cosine","base.random.discreteUniform":"@stdlib/random/base/discrete-uniform","base.random.erlang":"@stdlib/random/base/erlang","base.random.exponential":"@stdlib/random/base/exponential","base.random.f":"@stdlib/random/base/f","base.random.frechet":"@stdlib/random/base/frechet","base.random.gamma":"@stdlib/random/base/gamma","base.random.geometric":"@stdlib/random/base/geometric","base.random.gumbel":"@stdlib/random/base/gumbel","base.random.hypergeometric":"@stdlib/random/base/hypergeometric","base.random.improvedZiggurat":"@stdlib/random/base/improved-ziggurat","base.random.invgamma":"@stdlib/random/base/invgamma","base.random.kumaraswamy":"@stdlib/random/base/kumaraswamy","base.random.laplace":"@stdlib/random/base/laplace","base.random.levy":"@stdlib/random/base/levy","base.random.logistic":"@stdlib/random/base/logistic","base.random.lognormal":"@stdlib/random/base/lognormal","base.random.minstd":"@stdlib/random/base/minstd","base.random.minstdShuffle":"@stdlib/random/base/minstd-shuffle","base.random.mt19937":"@stdlib/random/base/mt19937","base.random.negativeBinomial":"@stdlib/random/base/negative-binomial","base.random.normal":"@stdlib/random/base/normal","base.random.pareto1":"@stdlib/random/base/pareto-type1","base.random.poisson":"@stdlib/random/base/poisson","base.random.randi":"@stdlib/random/base/randi","base.random.randn":"@stdlib/random/base/randn","base.random.randu":"@stdlib/random/base/randu","base.random.rayleigh":"@stdlib/random/base/rayleigh","base.random.t":"@stdlib/random/base/t","base.random.triangular":"@stdlib/random/base/triangular","base.random.uniform":"@stdlib/random/base/uniform","base.random.weibull":"@stdlib/random/base/weibull","base.reldiff":"@stdlib/math/base/utils/relative-difference","base.rempio2":"@stdlib/math/base/special/rempio2","base.risingFactorial":"@stdlib/math/base/special/rising-factorial","base.rotl32":"@stdlib/number/uint32/base/rotl","base.rotr32":"@stdlib/number/uint32/base/rotr","base.round":"@stdlib/math/base/special/round","base.round2":"@stdlib/math/base/special/round2","base.round10":"@stdlib/math/base/special/round10","base.roundb":"@stdlib/math/base/special/roundb","base.roundn":"@stdlib/math/base/special/roundn","base.roundsd":"@stdlib/math/base/special/roundsd","base.rsqrt":"@stdlib/math/base/special/rsqrt","base.rsqrtf":"@stdlib/math/base/special/rsqrtf","base.scalar2ndarray":"@stdlib/ndarray/base/from-scalar","base.setHighWord":"@stdlib/number/float64/base/set-high-word","base.setLowWord":"@stdlib/number/float64/base/set-low-word","base.sici":"@stdlib/math/base/special/sici","base.signbit":"@stdlib/number/float64/base/signbit","base.signbitf":"@stdlib/number/float32/base/signbit","base.significandf":"@stdlib/number/float32/base/significand","base.signum":"@stdlib/math/base/special/signum","base.signumf":"@stdlib/math/base/special/signumf","base.sin":"@stdlib/math/base/special/sin","base.sinc":"@stdlib/math/base/special/sinc","base.sincos":"@stdlib/math/base/special/sincos","base.sincospi":"@stdlib/math/base/special/sincospi","base.sinh":"@stdlib/math/base/special/sinh","base.sinpi":"@stdlib/math/base/special/sinpi","base.spence":"@stdlib/math/base/special/spence","base.sqrt":"@stdlib/math/base/special/sqrt","base.sqrt1pm1":"@stdlib/math/base/special/sqrt1pm1","base.sqrtf":"@stdlib/math/base/special/sqrtf","base.strided.binary":"@stdlib/strided/base/binary","base.strided.ccopy":"@stdlib/blas/base/ccopy","base.strided.cmap":"@stdlib/strided/base/cmap","base.strided.cswap":"@stdlib/blas/base/cswap","base.strided.cumax":"@stdlib/stats/base/cumax","base.strided.cumaxabs":"@stdlib/stats/base/cumaxabs","base.strided.cumin":"@stdlib/stats/base/cumin","base.strided.cuminabs":"@stdlib/stats/base/cuminabs","base.strided.dabs":"@stdlib/math/strided/special/dabs","base.strided.dabs2":"@stdlib/math/strided/special/dabs2","base.strided.dapx":"@stdlib/blas/ext/base/dapx","base.strided.dapxsum":"@stdlib/blas/ext/base/dapxsum","base.strided.dapxsumkbn":"@stdlib/blas/ext/base/dapxsumkbn","base.strided.dapxsumkbn2":"@stdlib/blas/ext/base/dapxsumkbn2","base.strided.dapxsumors":"@stdlib/blas/ext/base/dapxsumors","base.strided.dapxsumpw":"@stdlib/blas/ext/base/dapxsumpw","base.strided.dasum":"@stdlib/blas/base/dasum","base.strided.dasumpw":"@stdlib/blas/ext/base/dasumpw","base.strided.daxpy":"@stdlib/blas/base/daxpy","base.strided.dcbrt":"@stdlib/math/strided/special/dcbrt","base.strided.dceil":"@stdlib/math/strided/special/dceil","base.strided.dcopy":"@stdlib/blas/base/dcopy","base.strided.dcumax":"@stdlib/stats/base/dcumax","base.strided.dcumaxabs":"@stdlib/stats/base/dcumaxabs","base.strided.dcumin":"@stdlib/stats/base/dcumin","base.strided.dcuminabs":"@stdlib/stats/base/dcuminabs","base.strided.dcusum":"@stdlib/blas/ext/base/dcusum","base.strided.dcusumkbn":"@stdlib/blas/ext/base/dcusumkbn","base.strided.dcusumkbn2":"@stdlib/blas/ext/base/dcusumkbn2","base.strided.dcusumors":"@stdlib/blas/ext/base/dcusumors","base.strided.dcusumpw":"@stdlib/blas/ext/base/dcusumpw","base.strided.ddeg2rad":"@stdlib/math/strided/special/ddeg2rad","base.strided.ddot":"@stdlib/blas/base/ddot","base.strided.dfill":"@stdlib/blas/ext/base/dfill","base.strided.dfloor":"@stdlib/math/strided/special/dfloor","base.strided.dinv":"@stdlib/math/strided/special/dinv","base.strided.dmap":"@stdlib/strided/base/dmap","base.strided.dmap2":"@stdlib/strided/base/dmap2","base.strided.dmax":"@stdlib/stats/base/dmax","base.strided.dmaxabs":"@stdlib/stats/base/dmaxabs","base.strided.dmaxabssorted":"@stdlib/stats/base/dmaxabssorted","base.strided.dmaxsorted":"@stdlib/stats/base/dmaxsorted","base.strided.dmean":"@stdlib/stats/base/dmean","base.strided.dmeankbn":"@stdlib/stats/base/dmeankbn","base.strided.dmeankbn2":"@stdlib/stats/base/dmeankbn2","base.strided.dmeanli":"@stdlib/stats/base/dmeanli","base.strided.dmeanlipw":"@stdlib/stats/base/dmeanlipw","base.strided.dmeanors":"@stdlib/stats/base/dmeanors","base.strided.dmeanpn":"@stdlib/stats/base/dmeanpn","base.strided.dmeanpw":"@stdlib/stats/base/dmeanpw","base.strided.dmeanstdev":"@stdlib/stats/base/dmeanstdev","base.strided.dmeanstdevpn":"@stdlib/stats/base/dmeanstdevpn","base.strided.dmeanvar":"@stdlib/stats/base/dmeanvar","base.strided.dmeanvarpn":"@stdlib/stats/base/dmeanvarpn","base.strided.dmeanwd":"@stdlib/stats/base/dmeanwd","base.strided.dmediansorted":"@stdlib/stats/base/dmediansorted","base.strided.dmidrange":"@stdlib/stats/base/dmidrange","base.strided.dmin":"@stdlib/stats/base/dmin","base.strided.dminabs":"@stdlib/stats/base/dminabs","base.strided.dminsorted":"@stdlib/stats/base/dminsorted","base.strided.dmskabs":"@stdlib/math/strided/special/dmskabs","base.strided.dmskabs2":"@stdlib/math/strided/special/dmskabs2","base.strided.dmskcbrt":"@stdlib/math/strided/special/dmskcbrt","base.strided.dmskceil":"@stdlib/math/strided/special/dmskceil","base.strided.dmskdeg2rad":"@stdlib/math/strided/special/dmskdeg2rad","base.strided.dmskfloor":"@stdlib/math/strided/special/dmskfloor","base.strided.dmskinv":"@stdlib/math/strided/special/dmskinv","base.strided.dmskmap":"@stdlib/strided/base/dmskmap","base.strided.dmskmap2":"@stdlib/strided/base/dmskmap2","base.strided.dmskmax":"@stdlib/stats/base/dmskmax","base.strided.dmskmin":"@stdlib/stats/base/dmskmin","base.strided.dmskramp":"@stdlib/math/strided/special/dmskramp","base.strided.dmskrange":"@stdlib/stats/base/dmskrange","base.strided.dmskrsqrt":"@stdlib/math/strided/special/dmskrsqrt","base.strided.dmsksqrt":"@stdlib/math/strided/special/dmsksqrt","base.strided.dmsktrunc":"@stdlib/math/strided/special/dmsktrunc","base.strided.dnanasum":"@stdlib/blas/ext/base/dnanasum","base.strided.dnanasumors":"@stdlib/blas/ext/base/dnanasumors","base.strided.dnanmax":"@stdlib/stats/base/dnanmax","base.strided.dnanmaxabs":"@stdlib/stats/base/dnanmaxabs","base.strided.dnanmean":"@stdlib/stats/base/dnanmean","base.strided.dnanmeanors":"@stdlib/stats/base/dnanmeanors","base.strided.dnanmeanpn":"@stdlib/stats/base/dnanmeanpn","base.strided.dnanmeanpw":"@stdlib/stats/base/dnanmeanpw","base.strided.dnanmeanwd":"@stdlib/stats/base/dnanmeanwd","base.strided.dnanmin":"@stdlib/stats/base/dnanmin","base.strided.dnanminabs":"@stdlib/stats/base/dnanminabs","base.strided.dnanmskmax":"@stdlib/stats/base/dnanmskmax","base.strided.dnanmskmin":"@stdlib/stats/base/dnanmskmin","base.strided.dnanmskrange":"@stdlib/stats/base/dnanmskrange","base.strided.dnannsum":"@stdlib/blas/ext/base/dnannsum","base.strided.dnannsumkbn":"@stdlib/blas/ext/base/dnannsumkbn","base.strided.dnannsumkbn2":"@stdlib/blas/ext/base/dnannsumkbn2","base.strided.dnannsumors":"@stdlib/blas/ext/base/dnannsumors","base.strided.dnannsumpw":"@stdlib/blas/ext/base/dnannsumpw","base.strided.dnanrange":"@stdlib/stats/base/dnanrange","base.strided.dnanstdev":"@stdlib/stats/base/dnanstdev","base.strided.dnanstdevch":"@stdlib/stats/base/dnanstdevch","base.strided.dnanstdevpn":"@stdlib/stats/base/dnanstdevpn","base.strided.dnanstdevtk":"@stdlib/stats/base/dnanstdevtk","base.strided.dnanstdevwd":"@stdlib/stats/base/dnanstdevwd","base.strided.dnanstdevyc":"@stdlib/stats/base/dnanstdevyc","base.strided.dnansum":"@stdlib/blas/ext/base/dnansum","base.strided.dnansumkbn":"@stdlib/blas/ext/base/dnansumkbn","base.strided.dnansumkbn2":"@stdlib/blas/ext/base/dnansumkbn2","base.strided.dnansumors":"@stdlib/blas/ext/base/dnansumors","base.strided.dnansumpw":"@stdlib/blas/ext/base/dnansumpw","base.strided.dnanvariance":"@stdlib/stats/base/dnanvariance","base.strided.dnanvariancech":"@stdlib/stats/base/dnanvariancech","base.strided.dnanvariancepn":"@stdlib/stats/base/dnanvariancepn","base.strided.dnanvariancetk":"@stdlib/stats/base/dnanvariancetk","base.strided.dnanvariancewd":"@stdlib/stats/base/dnanvariancewd","base.strided.dnanvarianceyc":"@stdlib/stats/base/dnanvarianceyc","base.strided.dnrm2":"@stdlib/blas/base/dnrm2","base.strided.dramp":"@stdlib/math/strided/special/dramp","base.strided.drange":"@stdlib/stats/base/drange","base.strided.drev":"@stdlib/blas/ext/base/drev","base.strided.drsqrt":"@stdlib/math/strided/special/drsqrt","base.strided.dsapxsum":"@stdlib/blas/ext/base/dsapxsum","base.strided.dsapxsumpw":"@stdlib/blas/ext/base/dsapxsumpw","base.strided.dscal":"@stdlib/blas/base/dscal","base.strided.dsdot":"@stdlib/blas/base/dsdot","base.strided.dsem":"@stdlib/stats/base/dsem","base.strided.dsemch":"@stdlib/stats/base/dsemch","base.strided.dsempn":"@stdlib/stats/base/dsempn","base.strided.dsemtk":"@stdlib/stats/base/dsemtk","base.strided.dsemwd":"@stdlib/stats/base/dsemwd","base.strided.dsemyc":"@stdlib/stats/base/dsemyc","base.strided.dsmean":"@stdlib/stats/base/dsmean","base.strided.dsmeanors":"@stdlib/stats/base/dsmeanors","base.strided.dsmeanpn":"@stdlib/stats/base/dsmeanpn","base.strided.dsmeanpw":"@stdlib/stats/base/dsmeanpw","base.strided.dsmeanwd":"@stdlib/stats/base/dsmeanwd","base.strided.dsnanmean":"@stdlib/stats/base/dsnanmean","base.strided.dsnanmeanors":"@stdlib/stats/base/dsnanmeanors","base.strided.dsnanmeanpn":"@stdlib/stats/base/dsnanmeanpn","base.strided.dsnanmeanwd":"@stdlib/stats/base/dsnanmeanwd","base.strided.dsnannsumors":"@stdlib/blas/ext/base/dsnannsumors","base.strided.dsnansum":"@stdlib/blas/ext/base/dsnansum","base.strided.dsnansumors":"@stdlib/blas/ext/base/dsnansumors","base.strided.dsnansumpw":"@stdlib/blas/ext/base/dsnansumpw","base.strided.dsort2hp":"@stdlib/blas/ext/base/dsort2hp","base.strided.dsort2ins":"@stdlib/blas/ext/base/dsort2ins","base.strided.dsort2sh":"@stdlib/blas/ext/base/dsort2sh","base.strided.dsorthp":"@stdlib/blas/ext/base/dsorthp","base.strided.dsortins":"@stdlib/blas/ext/base/dsortins","base.strided.dsortsh":"@stdlib/blas/ext/base/dsortsh","base.strided.dsqrt":"@stdlib/math/strided/special/dsqrt","base.strided.dssum":"@stdlib/blas/ext/base/dssum","base.strided.dssumors":"@stdlib/blas/ext/base/dssumors","base.strided.dssumpw":"@stdlib/blas/ext/base/dssumpw","base.strided.dstdev":"@stdlib/stats/base/dstdev","base.strided.dstdevch":"@stdlib/stats/base/dstdevch","base.strided.dstdevpn":"@stdlib/stats/base/dstdevpn","base.strided.dstdevtk":"@stdlib/stats/base/dstdevtk","base.strided.dstdevwd":"@stdlib/stats/base/dstdevwd","base.strided.dstdevyc":"@stdlib/stats/base/dstdevyc","base.strided.dsum":"@stdlib/blas/ext/base/dsum","base.strided.dsumkbn":"@stdlib/blas/ext/base/dsumkbn","base.strided.dsumkbn2":"@stdlib/blas/ext/base/dsumkbn2","base.strided.dsumors":"@stdlib/blas/ext/base/dsumors","base.strided.dsumpw":"@stdlib/blas/ext/base/dsumpw","base.strided.dsvariance":"@stdlib/stats/base/dsvariance","base.strided.dsvariancepn":"@stdlib/stats/base/dsvariancepn","base.strided.dswap":"@stdlib/blas/base/dswap","base.strided.dtrunc":"@stdlib/math/strided/special/dtrunc","base.strided.dvariance":"@stdlib/stats/base/dvariance","base.strided.dvariancech":"@stdlib/stats/base/dvariancech","base.strided.dvariancepn":"@stdlib/stats/base/dvariancepn","base.strided.dvariancetk":"@stdlib/stats/base/dvariancetk","base.strided.dvariancewd":"@stdlib/stats/base/dvariancewd","base.strided.dvarianceyc":"@stdlib/stats/base/dvarianceyc","base.strided.dvarm":"@stdlib/stats/base/dvarm","base.strided.dvarmpn":"@stdlib/stats/base/dvarmpn","base.strided.dvarmtk":"@stdlib/stats/base/dvarmtk","base.strided.gapx":"@stdlib/blas/ext/base/gapx","base.strided.gapxsum":"@stdlib/blas/ext/base/gapxsum","base.strided.gapxsumkbn":"@stdlib/blas/ext/base/gapxsumkbn","base.strided.gapxsumkbn2":"@stdlib/blas/ext/base/gapxsumkbn2","base.strided.gapxsumors":"@stdlib/blas/ext/base/gapxsumors","base.strided.gapxsumpw":"@stdlib/blas/ext/base/gapxsumpw","base.strided.gasum":"@stdlib/blas/base/gasum","base.strided.gasumpw":"@stdlib/blas/ext/base/gasumpw","base.strided.gaxpy":"@stdlib/blas/base/gaxpy","base.strided.gcopy":"@stdlib/blas/base/gcopy","base.strided.gcusum":"@stdlib/blas/ext/base/gcusum","base.strided.gcusumkbn":"@stdlib/blas/ext/base/gcusumkbn","base.strided.gcusumkbn2":"@stdlib/blas/ext/base/gcusumkbn2","base.strided.gcusumors":"@stdlib/blas/ext/base/gcusumors","base.strided.gcusumpw":"@stdlib/blas/ext/base/gcusumpw","base.strided.gdot":"@stdlib/blas/base/gdot","base.strided.gfill":"@stdlib/blas/ext/base/gfill","base.strided.gfillBy":"@stdlib/blas/ext/base/gfill-by","base.strided.gnannsumkbn":"@stdlib/blas/ext/base/gnannsumkbn","base.strided.gnansum":"@stdlib/blas/ext/base/gnansum","base.strided.gnansumkbn":"@stdlib/blas/ext/base/gnansumkbn","base.strided.gnansumkbn2":"@stdlib/blas/ext/base/gnansumkbn2","base.strided.gnansumors":"@stdlib/blas/ext/base/gnansumors","base.strided.gnansumpw":"@stdlib/blas/ext/base/gnansumpw","base.strided.gnrm2":"@stdlib/blas/base/gnrm2","base.strided.grev":"@stdlib/blas/ext/base/grev","base.strided.gscal":"@stdlib/blas/base/gscal","base.strided.gsort2hp":"@stdlib/blas/ext/base/gsort2hp","base.strided.gsort2ins":"@stdlib/blas/ext/base/gsort2ins","base.strided.gsort2sh":"@stdlib/blas/ext/base/gsort2sh","base.strided.gsorthp":"@stdlib/blas/ext/base/gsorthp","base.strided.gsortins":"@stdlib/blas/ext/base/gsortins","base.strided.gsortsh":"@stdlib/blas/ext/base/gsortsh","base.strided.gsum":"@stdlib/blas/ext/base/gsum","base.strided.gsumkbn":"@stdlib/blas/ext/base/gsumkbn","base.strided.gsumkbn2":"@stdlib/blas/ext/base/gsumkbn2","base.strided.gsumors":"@stdlib/blas/ext/base/gsumors","base.strided.gsumpw":"@stdlib/blas/ext/base/gsumpw","base.strided.gswap":"@stdlib/blas/base/gswap","base.strided.mapBy":"@stdlib/strided/base/map-by","base.strided.mapBy2":"@stdlib/strided/base/map-by2","base.strided.max":"@stdlib/stats/base/max","base.strided.maxabs":"@stdlib/stats/base/maxabs","base.strided.maxBy":"@stdlib/stats/base/max-by","base.strided.maxsorted":"@stdlib/stats/base/maxsorted","base.strided.mean":"@stdlib/stats/base/mean","base.strided.meankbn":"@stdlib/stats/base/meankbn","base.strided.meankbn2":"@stdlib/stats/base/meankbn2","base.strided.meanors":"@stdlib/stats/base/meanors","base.strided.meanpn":"@stdlib/stats/base/meanpn","base.strided.meanpw":"@stdlib/stats/base/meanpw","base.strided.meanwd":"@stdlib/stats/base/meanwd","base.strided.mediansorted":"@stdlib/stats/base/mediansorted","base.strided.min":"@stdlib/stats/base/min","base.strided.minabs":"@stdlib/stats/base/minabs","base.strided.minBy":"@stdlib/stats/base/min-by","base.strided.minsorted":"@stdlib/stats/base/minsorted","base.strided.mskmax":"@stdlib/stats/base/mskmax","base.strided.mskmin":"@stdlib/stats/base/mskmin","base.strided.mskrange":"@stdlib/stats/base/mskrange","base.strided.mskunary":"@stdlib/strided/base/mskunary","base.strided.nanmax":"@stdlib/stats/base/nanmax","base.strided.nanmaxabs":"@stdlib/stats/base/nanmaxabs","base.strided.nanmaxBy":"@stdlib/stats/base/nanmax-by","base.strided.nanmean":"@stdlib/stats/base/nanmean","base.strided.nanmeanors":"@stdlib/stats/base/nanmeanors","base.strided.nanmeanpn":"@stdlib/stats/base/nanmeanpn","base.strided.nanmeanwd":"@stdlib/stats/base/nanmeanwd","base.strided.nanmin":"@stdlib/stats/base/nanmin","base.strided.nanminabs":"@stdlib/stats/base/nanminabs","base.strided.nanminBy":"@stdlib/stats/base/nanmin-by","base.strided.nanmskmax":"@stdlib/stats/base/nanmskmax","base.strided.nanmskmin":"@stdlib/stats/base/nanmskmin","base.strided.nanmskrange":"@stdlib/stats/base/nanmskrange","base.strided.nanrange":"@stdlib/stats/base/nanrange","base.strided.nanrangeBy":"@stdlib/stats/base/nanrange-by","base.strided.nanstdev":"@stdlib/stats/base/nanstdev","base.strided.nanstdevch":"@stdlib/stats/base/nanstdevch","base.strided.nanstdevpn":"@stdlib/stats/base/nanstdevpn","base.strided.nanstdevtk":"@stdlib/stats/base/nanstdevtk","base.strided.nanstdevwd":"@stdlib/stats/base/nanstdevwd","base.strided.nanstdevyc":"@stdlib/stats/base/nanstdevyc","base.strided.nanvariance":"@stdlib/stats/base/nanvariance","base.strided.nanvariancech":"@stdlib/stats/base/nanvariancech","base.strided.nanvariancepn":"@stdlib/stats/base/nanvariancepn","base.strided.nanvariancetk":"@stdlib/stats/base/nanvariancetk","base.strided.nanvariancewd":"@stdlib/stats/base/nanvariancewd","base.strided.nanvarianceyc":"@stdlib/stats/base/nanvarianceyc","base.strided.nullary":"@stdlib/strided/base/nullary","base.strided.quaternary":"@stdlib/strided/base/quaternary","base.strided.quinary":"@stdlib/strided/base/quinary","base.strided.range":"@stdlib/stats/base/range","base.strided.rangeBy":"@stdlib/stats/base/range-by","base.strided.sabs":"@stdlib/math/strided/special/sabs","base.strided.sabs2":"@stdlib/math/strided/special/sabs2","base.strided.sapx":"@stdlib/blas/ext/base/sapx","base.strided.sapxsum":"@stdlib/blas/ext/base/sapxsum","base.strided.sapxsumkbn":"@stdlib/blas/ext/base/sapxsumkbn","base.strided.sapxsumkbn2":"@stdlib/blas/ext/base/sapxsumkbn2","base.strided.sapxsumors":"@stdlib/blas/ext/base/sapxsumors","base.strided.sapxsumpw":"@stdlib/blas/ext/base/sapxsumpw","base.strided.sasum":"@stdlib/blas/base/sasum","base.strided.sasumpw":"@stdlib/blas/ext/base/sasumpw","base.strided.saxpy":"@stdlib/blas/base/saxpy","base.strided.scbrt":"@stdlib/math/strided/special/scbrt","base.strided.sceil":"@stdlib/math/strided/special/sceil","base.strided.scopy":"@stdlib/blas/base/scopy","base.strided.scumax":"@stdlib/stats/base/scumax","base.strided.scumaxabs":"@stdlib/stats/base/scumaxabs","base.strided.scumin":"@stdlib/stats/base/scumin","base.strided.scuminabs":"@stdlib/stats/base/scuminabs","base.strided.scusum":"@stdlib/blas/ext/base/scusum","base.strided.scusumkbn":"@stdlib/blas/ext/base/scusumkbn","base.strided.scusumkbn2":"@stdlib/blas/ext/base/scusumkbn2","base.strided.scusumors":"@stdlib/blas/ext/base/scusumors","base.strided.scusumpw":"@stdlib/blas/ext/base/scusumpw","base.strided.sdeg2rad":"@stdlib/math/strided/special/sdeg2rad","base.strided.sdot":"@stdlib/blas/base/sdot","base.strided.sdsapxsum":"@stdlib/blas/ext/base/sdsapxsum","base.strided.sdsapxsumpw":"@stdlib/blas/ext/base/sdsapxsumpw","base.strided.sdsdot":"@stdlib/blas/base/sdsdot","base.strided.sdsmean":"@stdlib/stats/base/sdsmean","base.strided.sdsmeanors":"@stdlib/stats/base/sdsmeanors","base.strided.sdsnanmean":"@stdlib/stats/base/sdsnanmean","base.strided.sdsnanmeanors":"@stdlib/stats/base/sdsnanmeanors","base.strided.sdsnansum":"@stdlib/blas/ext/base/sdsnansum","base.strided.sdsnansumpw":"@stdlib/blas/ext/base/sdsnansumpw","base.strided.sdssum":"@stdlib/blas/ext/base/sdssum","base.strided.sdssumpw":"@stdlib/blas/ext/base/sdssumpw","base.strided.sfill":"@stdlib/blas/ext/base/sfill","base.strided.sfloor":"@stdlib/math/strided/special/sfloor","base.strided.sinv":"@stdlib/math/strided/special/sinv","base.strided.smap":"@stdlib/strided/base/smap","base.strided.smap2":"@stdlib/strided/base/smap2","base.strided.smax":"@stdlib/stats/base/smax","base.strided.smaxabs":"@stdlib/stats/base/smaxabs","base.strided.smaxabssorted":"@stdlib/stats/base/smaxabssorted","base.strided.smaxsorted":"@stdlib/stats/base/smaxsorted","base.strided.smean":"@stdlib/stats/base/smean","base.strided.smeankbn":"@stdlib/stats/base/smeankbn","base.strided.smeankbn2":"@stdlib/stats/base/smeankbn2","base.strided.smeanli":"@stdlib/stats/base/smeanli","base.strided.smeanlipw":"@stdlib/stats/base/smeanlipw","base.strided.smeanors":"@stdlib/stats/base/smeanors","base.strided.smeanpn":"@stdlib/stats/base/smeanpn","base.strided.smeanpw":"@stdlib/stats/base/smeanpw","base.strided.smeanwd":"@stdlib/stats/base/smeanwd","base.strided.smediansorted":"@stdlib/stats/base/smediansorted","base.strided.smidrange":"@stdlib/stats/base/smidrange","base.strided.smin":"@stdlib/stats/base/smin","base.strided.sminabs":"@stdlib/stats/base/sminabs","base.strided.sminsorted":"@stdlib/stats/base/sminsorted","base.strided.smskabs":"@stdlib/math/strided/special/smskabs","base.strided.smskabs2":"@stdlib/math/strided/special/smskabs2","base.strided.smskcbrt":"@stdlib/math/strided/special/smskcbrt","base.strided.smskceil":"@stdlib/math/strided/special/smskceil","base.strided.smskdeg2rad":"@stdlib/math/strided/special/smskdeg2rad","base.strided.smskfloor":"@stdlib/math/strided/special/smskfloor","base.strided.smskinv":"@stdlib/math/strided/special/smskinv","base.strided.smskmap":"@stdlib/strided/base/smskmap","base.strided.smskmap2":"@stdlib/strided/base/smskmap2","base.strided.smskmax":"@stdlib/stats/base/smskmax","base.strided.smskmin":"@stdlib/stats/base/smskmin","base.strided.smskramp":"@stdlib/math/strided/special/smskramp","base.strided.smskrange":"@stdlib/stats/base/smskrange","base.strided.smskrsqrt":"@stdlib/math/strided/special/smskrsqrt","base.strided.smsksqrt":"@stdlib/math/strided/special/smsksqrt","base.strided.smsktrunc":"@stdlib/math/strided/special/smsktrunc","base.strided.snanmax":"@stdlib/stats/base/snanmax","base.strided.snanmaxabs":"@stdlib/stats/base/snanmaxabs","base.strided.snanmean":"@stdlib/stats/base/snanmean","base.strided.snanmeanors":"@stdlib/stats/base/snanmeanors","base.strided.snanmeanpn":"@stdlib/stats/base/snanmeanpn","base.strided.snanmeanwd":"@stdlib/stats/base/snanmeanwd","base.strided.snanmin":"@stdlib/stats/base/snanmin","base.strided.snanminabs":"@stdlib/stats/base/snanminabs","base.strided.snanmskmax":"@stdlib/stats/base/snanmskmax","base.strided.snanmskmin":"@stdlib/stats/base/snanmskmin","base.strided.snanmskrange":"@stdlib/stats/base/snanmskrange","base.strided.snanrange":"@stdlib/stats/base/snanrange","base.strided.snanstdev":"@stdlib/stats/base/snanstdev","base.strided.snanstdevch":"@stdlib/stats/base/snanstdevch","base.strided.snanstdevpn":"@stdlib/stats/base/snanstdevpn","base.strided.snanstdevtk":"@stdlib/stats/base/snanstdevtk","base.strided.snanstdevwd":"@stdlib/stats/base/snanstdevwd","base.strided.snanstdevyc":"@stdlib/stats/base/snanstdevyc","base.strided.snansum":"@stdlib/blas/ext/base/snansum","base.strided.snansumkbn":"@stdlib/blas/ext/base/snansumkbn","base.strided.snansumkbn2":"@stdlib/blas/ext/base/snansumkbn2","base.strided.snansumors":"@stdlib/blas/ext/base/snansumors","base.strided.snansumpw":"@stdlib/blas/ext/base/snansumpw","base.strided.snanvariance":"@stdlib/stats/base/snanvariance","base.strided.snanvariancech":"@stdlib/stats/base/snanvariancech","base.strided.snanvariancepn":"@stdlib/stats/base/snanvariancepn","base.strided.snanvariancetk":"@stdlib/stats/base/snanvariancetk","base.strided.snanvariancewd":"@stdlib/stats/base/snanvariancewd","base.strided.snanvarianceyc":"@stdlib/stats/base/snanvarianceyc","base.strided.snrm2":"@stdlib/blas/base/snrm2","base.strided.sramp":"@stdlib/math/strided/special/sramp","base.strided.srange":"@stdlib/stats/base/srange","base.strided.srev":"@stdlib/blas/ext/base/srev","base.strided.srsqrt":"@stdlib/math/strided/special/srsqrt","base.strided.sscal":"@stdlib/blas/base/sscal","base.strided.ssort2hp":"@stdlib/blas/ext/base/ssort2hp","base.strided.ssort2ins":"@stdlib/blas/ext/base/ssort2ins","base.strided.ssort2sh":"@stdlib/blas/ext/base/ssort2sh","base.strided.ssorthp":"@stdlib/blas/ext/base/ssorthp","base.strided.ssortins":"@stdlib/blas/ext/base/ssortins","base.strided.ssortsh":"@stdlib/blas/ext/base/ssortsh","base.strided.ssqrt":"@stdlib/math/strided/special/ssqrt","base.strided.sstdev":"@stdlib/stats/base/sstdev","base.strided.sstdevch":"@stdlib/stats/base/sstdevch","base.strided.sstdevpn":"@stdlib/stats/base/sstdevpn","base.strided.sstdevtk":"@stdlib/stats/base/sstdevtk","base.strided.sstdevwd":"@stdlib/stats/base/sstdevwd","base.strided.sstdevyc":"@stdlib/stats/base/sstdevyc","base.strided.ssum":"@stdlib/blas/ext/base/ssum","base.strided.ssumkbn":"@stdlib/blas/ext/base/ssumkbn","base.strided.ssumkbn2":"@stdlib/blas/ext/base/ssumkbn2","base.strided.ssumors":"@stdlib/blas/ext/base/ssumors","base.strided.ssumpw":"@stdlib/blas/ext/base/ssumpw","base.strided.sswap":"@stdlib/blas/base/sswap","base.strided.stdev":"@stdlib/stats/base/stdev","base.strided.stdevch":"@stdlib/stats/base/stdevch","base.strided.stdevpn":"@stdlib/stats/base/stdevpn","base.strided.stdevtk":"@stdlib/stats/base/stdevtk","base.strided.stdevwd":"@stdlib/stats/base/stdevwd","base.strided.stdevyc":"@stdlib/stats/base/stdevyc","base.strided.strunc":"@stdlib/math/strided/special/strunc","base.strided.svariance":"@stdlib/stats/base/svariance","base.strided.svariancech":"@stdlib/stats/base/svariancech","base.strided.svariancepn":"@stdlib/stats/base/svariancepn","base.strided.svariancetk":"@stdlib/stats/base/svariancetk","base.strided.svariancewd":"@stdlib/stats/base/svariancewd","base.strided.svarianceyc":"@stdlib/stats/base/svarianceyc","base.strided.ternary":"@stdlib/strided/base/ternary","base.strided.unary":"@stdlib/strided/base/unary","base.strided.variance":"@stdlib/stats/base/variance","base.strided.variancech":"@stdlib/stats/base/variancech","base.strided.variancepn":"@stdlib/stats/base/variancepn","base.strided.variancetk":"@stdlib/stats/base/variancetk","base.strided.variancewd":"@stdlib/stats/base/variancewd","base.strided.varianceyc":"@stdlib/stats/base/varianceyc","base.strided.zmap":"@stdlib/strided/base/zmap","base.sub":"@stdlib/math/base/ops/sub","base.subf":"@stdlib/math/base/ops/subf","base.sumSeries":"@stdlib/math/base/tools/sum-series","base.tan":"@stdlib/math/base/special/tan","base.tanh":"@stdlib/math/base/special/tanh","base.toBinaryString":"@stdlib/number/float64/base/to-binary-string","base.toBinaryStringf":"@stdlib/number/float32/base/to-binary-string","base.toBinaryStringUint8":"@stdlib/number/uint8/base/to-binary-string","base.toBinaryStringUint16":"@stdlib/number/uint16/base/to-binary-string","base.toBinaryStringUint32":"@stdlib/number/uint32/base/to-binary-string","base.toWordf":"@stdlib/number/float32/base/to-word","base.toWords":"@stdlib/number/float64/base/to-words","base.transpose":"@stdlib/ndarray/base/transpose","base.tribonacci":"@stdlib/math/base/special/tribonacci","base.trigamma":"@stdlib/math/base/special/trigamma","base.trunc":"@stdlib/math/base/special/trunc","base.trunc2":"@stdlib/math/base/special/trunc2","base.trunc10":"@stdlib/math/base/special/trunc10","base.truncb":"@stdlib/math/base/special/truncb","base.truncf":"@stdlib/math/base/special/truncf","base.truncn":"@stdlib/math/base/special/truncn","base.truncsd":"@stdlib/math/base/special/truncsd","base.umul":"@stdlib/math/base/ops/umul","base.umuldw":"@stdlib/math/base/ops/umuldw","base.uint32ToInt32":"@stdlib/number/uint32/base/to-int32","base.vercos":"@stdlib/math/base/special/vercos","base.versin":"@stdlib/math/base/special/versin","base.wrap":"@stdlib/math/base/special/wrap","base.xlog1py":"@stdlib/math/base/special/xlog1py","base.xlogy":"@stdlib/math/base/special/xlogy","base.zeta":"@stdlib/math/base/special/riemann-zeta","bench":"@stdlib/bench","BERNDT_CPS_WAGES_1985":"@stdlib/datasets/berndt-cps-wages-1985","bifurcate":"@stdlib/utils/bifurcate","bifurcateBy":"@stdlib/utils/bifurcate-by","bifurcateByAsync":"@stdlib/utils/async/bifurcate-by","bifurcateIn":"@stdlib/utils/bifurcate-in","bifurcateOwn":"@stdlib/utils/bifurcate-own","BigInt":"@stdlib/bigint/ctor","binomialTest":"@stdlib/stats/binomial-test","Buffer":"@stdlib/buffer/ctor","buffer2json":"@stdlib/buffer/to-json","BYTE_ORDER":"@stdlib/os/byte-order","camelcase":"@stdlib/string/camelcase","capitalize":"@stdlib/string/capitalize","capitalizeKeys":"@stdlib/utils/capitalize-keys","CATALAN":"@stdlib/constants/float64/catalan","CBRT_EPS":"@stdlib/constants/float64/cbrt-eps","CDC_NCHS_US_BIRTHS_1969_1988":"@stdlib/datasets/cdc-nchs-us-births-1969-1988","CDC_NCHS_US_BIRTHS_1994_2003":"@stdlib/datasets/cdc-nchs-us-births-1994-2003","CDC_NCHS_US_INFANT_MORTALITY_BW_1915_2013":"@stdlib/datasets/cdc-nchs-us-infant-mortality-bw-1915-2013","chdir":"@stdlib/process/chdir","chi2gof":"@stdlib/stats/chi2gof","chi2test":"@stdlib/stats/chi2test","circarray2iterator":"@stdlib/array/to-circular-iterator","circularArrayStream":"@stdlib/streams/node/from-circular-array","CircularBuffer":"@stdlib/utils/circular-buffer","close":"@stdlib/fs/close","CMUDICT":"@stdlib/datasets/cmudict","codePointAt":"@stdlib/string/code-point-at","commonKeys":"@stdlib/utils/common-keys","commonKeysIn":"@stdlib/utils/common-keys-in","complex":"@stdlib/complex/cmplx","Complex64":"@stdlib/complex/float32","COMPLEX64_NUM_BYTES":"@stdlib/constants/complex64/num-bytes","Complex64Array":"@stdlib/array/complex64","Complex128":"@stdlib/complex/float64","COMPLEX128_NUM_BYTES":"@stdlib/constants/complex128/num-bytes","Complex128Array":"@stdlib/array/complex128","complexarray":"@stdlib/array/typed-complex","complexarrayCtors":"@stdlib/array/typed-complex-ctors","complexarrayDataTypes":"@stdlib/array/typed-complex-dtypes","complexCtors":"@stdlib/complex/ctors","complexDataType":"@stdlib/complex/dtype","complexDataTypes":"@stdlib/complex/dtypes","complexPromotionRules":"@stdlib/complex/promotion-rules","compose":"@stdlib/utils/compose","composeAsync":"@stdlib/utils/async/compose","configdir":"@stdlib/os/configdir","conj":"@stdlib/complex/conj","conjf":"@stdlib/complex/conjf","constantcase":"@stdlib/string/constantcase","constantFunction":"@stdlib/utils/constant-function","constantStream":"@stdlib/streams/node/from-constant","constructorName":"@stdlib/utils/constructor-name","contains":"@stdlib/assert/contains","convertArray":"@stdlib/array/convert","convertArraySame":"@stdlib/array/convert-same","convertPath":"@stdlib/utils/convert-path","copy":"@stdlib/utils/copy","copyBuffer":"@stdlib/buffer/from-buffer","countBy":"@stdlib/utils/count-by","countByAsync":"@stdlib/utils/async/count-by","curry":"@stdlib/utils/curry","curryRight":"@stdlib/utils/curry-right","cwd":"@stdlib/process/cwd","DALE_CHALL_NEW":"@stdlib/datasets/dale-chall-new","datasets":"@stdlib/datasets","DataView":"@stdlib/array/dataview","datespace":"@stdlib/array/datespace","dayOfQuarter":"@stdlib/time/day-of-quarter","dayOfYear":"@stdlib/time/day-of-year","daysInMonth":"@stdlib/time/days-in-month","daysInYear":"@stdlib/time/days-in-year","ddot":"@stdlib/blas/ddot","debugSinkStream":"@stdlib/streams/node/debug-sink","debugStream":"@stdlib/streams/node/debug","deepEqual":"@stdlib/assert/deep-equal","deepGet":"@stdlib/utils/deep-get","deepHasOwnProp":"@stdlib/assert/deep-has-own-property","deepHasProp":"@stdlib/assert/deep-has-property","deepPluck":"@stdlib/utils/deep-pluck","deepSet":"@stdlib/utils/deep-set","defineMemoizedProperty":"@stdlib/utils/define-memoized-property","defineProperties":"@stdlib/utils/define-properties","defineProperty":"@stdlib/utils/define-property","dirname":"@stdlib/utils/dirname","DoublyLinkedList":"@stdlib/utils/doubly-linked-list","doUntil":"@stdlib/utils/do-until","doUntilAsync":"@stdlib/utils/async/do-until","doUntilEach":"@stdlib/utils/do-until-each","doUntilEachRight":"@stdlib/utils/do-until-each-right","doWhile":"@stdlib/utils/do-while","doWhileAsync":"@stdlib/utils/async/do-while","doWhileEach":"@stdlib/utils/do-while-each","doWhileEachRight":"@stdlib/utils/do-while-each-right","dswap":"@stdlib/blas/dswap","E":"@stdlib/constants/float64/e","EMOJI":"@stdlib/datasets/emoji","EMOJI_CODE_PICTO":"@stdlib/datasets/emoji-code-picto","EMOJI_PICTO_CODE":"@stdlib/datasets/emoji-picto-code","emptyStream":"@stdlib/streams/node/empty","endsWith":"@stdlib/string/ends-with","enumerableProperties":"@stdlib/utils/enumerable-properties","enumerablePropertiesIn":"@stdlib/utils/enumerable-properties-in","enumerablePropertySymbols":"@stdlib/utils/enumerable-property-symbols","enumerablePropertySymbolsIn":"@stdlib/utils/enumerable-property-symbols-in","ENV":"@stdlib/process/env","EPS":"@stdlib/constants/float64/eps","error2json":"@stdlib/error/to-json","EULERGAMMA":"@stdlib/constants/float64/eulergamma","every":"@stdlib/utils/every","everyBy":"@stdlib/utils/every-by","everyByAsync":"@stdlib/utils/async/every-by","everyByRight":"@stdlib/utils/every-by-right","everyByRightAsync":"@stdlib/utils/async/every-by-right","evil":"@stdlib/utils/eval","EXEC_PATH":"@stdlib/process/exec-path","exists":"@stdlib/fs/exists","expandContractions":"@stdlib/nlp/expand-contractions","extname":"@stdlib/utils/extname","fastmath.abs":"@stdlib/math/base/special/fast/abs","fastmath.acosh":"@stdlib/math/base/special/fast/acosh","fastmath.ampbm":"@stdlib/math/base/special/fast/alpha-max-plus-beta-min","fastmath.asinh":"@stdlib/math/base/special/fast/asinh","fastmath.atanh":"@stdlib/math/base/special/fast/atanh","fastmath.hypot":"@stdlib/math/base/special/fast/hypot","fastmath.log2Uint32":"@stdlib/math/base/special/fast/uint32-log2","fastmath.max":"@stdlib/math/base/special/fast/max","fastmath.min":"@stdlib/math/base/special/fast/min","fastmath.powint":"@stdlib/math/base/special/fast/pow-int","fastmath.sqrtUint32":"@stdlib/math/base/special/fast/uint32-sqrt","FEMALE_FIRST_NAMES_EN":"@stdlib/datasets/female-first-names-en","FIFO":"@stdlib/utils/fifo","filledarray":"@stdlib/array/filled","filledarrayBy":"@stdlib/array/filled-by","filterArguments":"@stdlib/utils/filter-arguments","find":"@stdlib/utils/find","FIVETHIRTYEIGHT_FFQ":"@stdlib/datasets/fivethirtyeight-ffq","flattenArray":"@stdlib/utils/flatten-array","flattenObject":"@stdlib/utils/flatten-object","flignerTest":"@stdlib/stats/fligner-test","FLOAT_WORD_ORDER":"@stdlib/os/float-word-order","FLOAT16_CBRT_EPS":"@stdlib/constants/float16/cbrt-eps","FLOAT16_EPS":"@stdlib/constants/float16/eps","FLOAT16_EXPONENT_BIAS":"@stdlib/constants/float16/exponent-bias","FLOAT16_MAX":"@stdlib/constants/float16/max","FLOAT16_MAX_SAFE_INTEGER":"@stdlib/constants/float16/max-safe-integer","FLOAT16_MIN_SAFE_INTEGER":"@stdlib/constants/float16/min-safe-integer","FLOAT16_NINF":"@stdlib/constants/float16/ninf","FLOAT16_NUM_BYTES":"@stdlib/constants/float16/num-bytes","FLOAT16_PINF":"@stdlib/constants/float16/pinf","FLOAT16_PRECISION":"@stdlib/constants/float16/precision","FLOAT16_SMALLEST_NORMAL":"@stdlib/constants/float16/smallest-normal","FLOAT16_SMALLEST_SUBNORMAL":"@stdlib/constants/float16/smallest-subnormal","FLOAT16_SQRT_EPS":"@stdlib/constants/float16/sqrt-eps","FLOAT32_CBRT_EPS":"@stdlib/constants/float32/cbrt-eps","FLOAT32_EPS":"@stdlib/constants/float32/eps","FLOAT32_EXPONENT_BIAS":"@stdlib/constants/float32/exponent-bias","FLOAT32_MAX":"@stdlib/constants/float32/max","FLOAT32_MAX_SAFE_INTEGER":"@stdlib/constants/float32/max-safe-integer","FLOAT32_MIN_SAFE_INTEGER":"@stdlib/constants/float32/min-safe-integer","FLOAT32_NINF":"@stdlib/constants/float32/ninf","FLOAT32_NUM_BYTES":"@stdlib/constants/float32/num-bytes","FLOAT32_PINF":"@stdlib/constants/float32/pinf","FLOAT32_PRECISION":"@stdlib/constants/float32/precision","FLOAT32_SMALLEST_NORMAL":"@stdlib/constants/float32/smallest-normal","FLOAT32_SMALLEST_SUBNORMAL":"@stdlib/constants/float32/smallest-subnormal","FLOAT32_SQRT_EPS":"@stdlib/constants/float32/sqrt-eps","Float32Array":"@stdlib/array/float32","FLOAT64_EXPONENT_BIAS":"@stdlib/constants/float64/exponent-bias","FLOAT64_HIGH_WORD_EXPONENT_MASK":"@stdlib/constants/float64/high-word-exponent-mask","FLOAT64_HIGH_WORD_SIGNIFICAND_MASK":"@stdlib/constants/float64/high-word-significand-mask","FLOAT64_MAX":"@stdlib/constants/float64/max","FLOAT64_MAX_BASE2_EXPONENT":"@stdlib/constants/float64/max-base2-exponent","FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL":"@stdlib/constants/float64/max-base2-exponent-subnormal","FLOAT64_MAX_BASE10_EXPONENT":"@stdlib/constants/float64/max-base10-exponent","FLOAT64_MAX_BASE10_EXPONENT_SUBNORMAL":"@stdlib/constants/float64/max-base10-exponent-subnormal","FLOAT64_MAX_LN":"@stdlib/constants/float64/max-ln","FLOAT64_MAX_SAFE_FIBONACCI":"@stdlib/constants/float64/max-safe-fibonacci","FLOAT64_MAX_SAFE_INTEGER":"@stdlib/constants/float64/max-safe-integer","FLOAT64_MAX_SAFE_LUCAS":"@stdlib/constants/float64/max-safe-lucas","FLOAT64_MAX_SAFE_NTH_FIBONACCI":"@stdlib/constants/float64/max-safe-nth-fibonacci","FLOAT64_MAX_SAFE_NTH_LUCAS":"@stdlib/constants/float64/max-safe-nth-lucas","FLOAT64_MIN_BASE2_EXPONENT":"@stdlib/constants/float64/min-base2-exponent","FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL":"@stdlib/constants/float64/min-base2-exponent-subnormal","FLOAT64_MIN_BASE10_EXPONENT":"@stdlib/constants/float64/min-base10-exponent","FLOAT64_MIN_BASE10_EXPONENT_SUBNORMAL":"@stdlib/constants/float64/min-base10-exponent-subnormal","FLOAT64_MIN_LN":"@stdlib/constants/float64/min-ln","FLOAT64_MIN_SAFE_INTEGER":"@stdlib/constants/float64/min-safe-integer","FLOAT64_NUM_BYTES":"@stdlib/constants/float64/num-bytes","FLOAT64_PRECISION":"@stdlib/constants/float64/precision","FLOAT64_SMALLEST_NORMAL":"@stdlib/constants/float64/smallest-normal","FLOAT64_SMALLEST_SUBNORMAL":"@stdlib/constants/float64/smallest-subnormal","Float64Array":"@stdlib/array/float64","forEach":"@stdlib/utils/for-each","forEachAsync":"@stdlib/utils/async/for-each","forEachRight":"@stdlib/utils/for-each-right","forEachRightAsync":"@stdlib/utils/async/for-each-right","forIn":"@stdlib/utils/for-in","forOwn":"@stdlib/utils/for-own","FOURTH_PI":"@stdlib/constants/float64/fourth-pi","FOURTH_ROOT_EPS":"@stdlib/constants/float64/fourth-root-eps","FRB_SF_WAGE_RIGIDITY":"@stdlib/datasets/frb-sf-wage-rigidity","fromCodePoint":"@stdlib/string/from-code-point","functionName":"@stdlib/utils/function-name","functionSequence":"@stdlib/utils/function-sequence","functionSequenceAsync":"@stdlib/utils/async/function-sequence","GAMMA_LANCZOS_G":"@stdlib/constants/float64/gamma-lanczos-g","gdot":"@stdlib/blas/gdot","getegid":"@stdlib/process/getegid","geteuid":"@stdlib/process/geteuid","getgid":"@stdlib/process/getgid","getGlobal":"@stdlib/utils/global","getPrototypeOf":"@stdlib/utils/get-prototype-of","getuid":"@stdlib/process/getuid","GLAISHER":"@stdlib/constants/float64/glaisher-kinkelin","group":"@stdlib/utils/group","groupBy":"@stdlib/utils/group-by","groupByAsync":"@stdlib/utils/async/group-by","groupIn":"@stdlib/utils/group-in","groupOwn":"@stdlib/utils/group-own","gswap":"@stdlib/blas/gswap","HALF_LN2":"@stdlib/constants/float64/half-ln-two","HALF_PI":"@stdlib/constants/float64/half-pi","HARRISON_BOSTON_HOUSE_PRICES":"@stdlib/datasets/harrison-boston-house-prices","HARRISON_BOSTON_HOUSE_PRICES_CORRECTED":"@stdlib/datasets/harrison-boston-house-prices-corrected","hasArrayBufferSupport":"@stdlib/assert/has-arraybuffer-support","hasAsyncAwaitSupport":"@stdlib/assert/has-async-await-support","hasAsyncIteratorSymbolSupport":"@stdlib/assert/has-async-iterator-symbol-support","hasBigInt64ArraySupport":"@stdlib/assert/has-bigint64array-support","hasBigIntSupport":"@stdlib/assert/has-bigint-support","hasBigUint64ArraySupport":"@stdlib/assert/has-biguint64array-support","hasClassSupport":"@stdlib/assert/has-class-support","hasDataViewSupport":"@stdlib/assert/has-dataview-support","hasDefinePropertiesSupport":"@stdlib/assert/has-define-properties-support","hasDefinePropertySupport":"@stdlib/assert/has-define-property-support","hasFloat32ArraySupport":"@stdlib/assert/has-float32array-support","hasFloat64ArraySupport":"@stdlib/assert/has-float64array-support","hasFunctionNameSupport":"@stdlib/assert/has-function-name-support","hasGeneratorSupport":"@stdlib/assert/has-generator-support","hasGlobalThisSupport":"@stdlib/assert/has-globalthis-support","hasInt8ArraySupport":"@stdlib/assert/has-int8array-support","hasInt16ArraySupport":"@stdlib/assert/has-int16array-support","hasInt32ArraySupport":"@stdlib/assert/has-int32array-support","hasIteratorSymbolSupport":"@stdlib/assert/has-iterator-symbol-support","hasMapSupport":"@stdlib/assert/has-map-support","hasNodeBufferSupport":"@stdlib/assert/has-node-buffer-support","hasOwnProp":"@stdlib/assert/has-own-property","hasProp":"@stdlib/assert/has-property","hasProxySupport":"@stdlib/assert/has-proxy-support","hasSetSupport":"@stdlib/assert/has-set-support","hasSharedArrayBufferSupport":"@stdlib/assert/has-sharedarraybuffer-support","hasSymbolSupport":"@stdlib/assert/has-symbol-support","hasToStringTagSupport":"@stdlib/assert/has-tostringtag-support","hasUint8ArraySupport":"@stdlib/assert/has-uint8array-support","hasUint8ClampedArraySupport":"@stdlib/assert/has-uint8clampedarray-support","hasUint16ArraySupport":"@stdlib/assert/has-uint16array-support","hasUint32ArraySupport":"@stdlib/assert/has-uint32array-support","hasUTF16SurrogatePairAt":"@stdlib/assert/has-utf16-surrogate-pair-at","hasWeakMapSupport":"@stdlib/assert/has-weakmap-support","hasWeakSetSupport":"@stdlib/assert/has-weakset-support","hasWebAssemblySupport":"@stdlib/assert/has-wasm-support","HERNDON_VENUS_SEMIDIAMETERS":"@stdlib/datasets/herndon-venus-semidiameters","homedir":"@stdlib/os/homedir","HOURS_IN_DAY":"@stdlib/constants/time/hours-in-day","HOURS_IN_WEEK":"@stdlib/constants/time/hours-in-week","hoursInMonth":"@stdlib/time/hours-in-month","hoursInYear":"@stdlib/time/hours-in-year","httpServer":"@stdlib/net/http-server","identity":"@stdlib/utils/identity-function","ifelse":"@stdlib/utils/if-else","ifelseAsync":"@stdlib/utils/async/if-else","ifthen":"@stdlib/utils/if-then","ifthenAsync":"@stdlib/utils/async/if-then","imag":"@stdlib/complex/imag","imagf":"@stdlib/complex/imagf","IMG_ACANTHUS_MOLLIS":"@stdlib/datasets/img-acanthus-mollis","IMG_AIRPLANE_FROM_ABOVE":"@stdlib/datasets/img-airplane-from-above","IMG_ALLIUM_OREOPHILUM":"@stdlib/datasets/img-allium-oreophilum","IMG_BLACK_CANYON":"@stdlib/datasets/img-black-canyon","IMG_DUST_BOWL_HOME":"@stdlib/datasets/img-dust-bowl-home","IMG_FRENCH_ALPINE_LANDSCAPE":"@stdlib/datasets/img-french-alpine-landscape","IMG_LOCOMOTION_HOUSE_CAT":"@stdlib/datasets/img-locomotion-house-cat","IMG_LOCOMOTION_NUDE_MALE":"@stdlib/datasets/img-locomotion-nude-male","IMG_MARCH_PASTORAL":"@stdlib/datasets/img-march-pastoral","IMG_NAGASAKI_BOATS":"@stdlib/datasets/img-nagasaki-boats","incrapcorr":"@stdlib/stats/incr/apcorr","incrBinaryClassification":"@stdlib/ml/incr/binary-classification","incrcount":"@stdlib/stats/incr/count","incrcovariance":"@stdlib/stats/incr/covariance","incrcovmat":"@stdlib/stats/incr/covmat","incrcv":"@stdlib/stats/incr/cv","increwmean":"@stdlib/stats/incr/ewmean","increwstdev":"@stdlib/stats/incr/ewstdev","increwvariance":"@stdlib/stats/incr/ewvariance","incrgmean":"@stdlib/stats/incr/gmean","incrgrubbs":"@stdlib/stats/incr/grubbs","incrhmean":"@stdlib/stats/incr/hmean","incrkmeans":"@stdlib/ml/incr/kmeans","incrkurtosis":"@stdlib/stats/incr/kurtosis","incrmaape":"@stdlib/stats/incr/maape","incrmae":"@stdlib/stats/incr/mae","incrmapcorr":"@stdlib/stats/incr/mapcorr","incrmape":"@stdlib/stats/incr/mape","incrmax":"@stdlib/stats/incr/max","incrmaxabs":"@stdlib/stats/incr/maxabs","incrmcovariance":"@stdlib/stats/incr/mcovariance","incrmcv":"@stdlib/stats/incr/mcv","incrmda":"@stdlib/stats/incr/mda","incrme":"@stdlib/stats/incr/me","incrmean":"@stdlib/stats/incr/mean","incrmeanabs":"@stdlib/stats/incr/meanabs","incrmeanabs2":"@stdlib/stats/incr/meanabs2","incrmeanstdev":"@stdlib/stats/incr/meanstdev","incrmeanvar":"@stdlib/stats/incr/meanvar","incrmgmean":"@stdlib/stats/incr/mgmean","incrmgrubbs":"@stdlib/stats/incr/mgrubbs","incrmhmean":"@stdlib/stats/incr/mhmean","incrmidrange":"@stdlib/stats/incr/midrange","incrmin":"@stdlib/stats/incr/min","incrminabs":"@stdlib/stats/incr/minabs","incrminmax":"@stdlib/stats/incr/minmax","incrminmaxabs":"@stdlib/stats/incr/minmaxabs","incrmmaape":"@stdlib/stats/incr/mmaape","incrmmae":"@stdlib/stats/incr/mmae","incrmmape":"@stdlib/stats/incr/mmape","incrmmax":"@stdlib/stats/incr/mmax","incrmmaxabs":"@stdlib/stats/incr/mmaxabs","incrmmda":"@stdlib/stats/incr/mmda","incrmme":"@stdlib/stats/incr/mme","incrmmean":"@stdlib/stats/incr/mmean","incrmmeanabs":"@stdlib/stats/incr/mmeanabs","incrmmeanabs2":"@stdlib/stats/incr/mmeanabs2","incrmmeanstdev":"@stdlib/stats/incr/mmeanstdev","incrmmeanvar":"@stdlib/stats/incr/mmeanvar","incrmmidrange":"@stdlib/stats/incr/mmidrange","incrmmin":"@stdlib/stats/incr/mmin","incrmminabs":"@stdlib/stats/incr/mminabs","incrmminmax":"@stdlib/stats/incr/mminmax","incrmminmaxabs":"@stdlib/stats/incr/mminmaxabs","incrmmpe":"@stdlib/stats/incr/mmpe","incrmmse":"@stdlib/stats/incr/mmse","incrmpcorr":"@stdlib/stats/incr/mpcorr","incrmpcorr2":"@stdlib/stats/incr/mpcorr2","incrmpcorrdist":"@stdlib/stats/incr/mpcorrdist","incrmpe":"@stdlib/stats/incr/mpe","incrmprod":"@stdlib/stats/incr/mprod","incrmrange":"@stdlib/stats/incr/mrange","incrmrmse":"@stdlib/stats/incr/mrmse","incrmrss":"@stdlib/stats/incr/mrss","incrmse":"@stdlib/stats/incr/mse","incrmstdev":"@stdlib/stats/incr/mstdev","incrmsum":"@stdlib/stats/incr/msum","incrmsumabs":"@stdlib/stats/incr/msumabs","incrmsumabs2":"@stdlib/stats/incr/msumabs2","incrmsummary":"@stdlib/stats/incr/msummary","incrmsumprod":"@stdlib/stats/incr/msumprod","incrmvariance":"@stdlib/stats/incr/mvariance","incrmvmr":"@stdlib/stats/incr/mvmr","incrnancount":"@stdlib/stats/incr/nancount","incrnansum":"@stdlib/stats/incr/nansum","incrnansumabs":"@stdlib/stats/incr/nansumabs","incrnansumabs2":"@stdlib/stats/incr/nansumabs2","incrpcorr":"@stdlib/stats/incr/pcorr","incrpcorr2":"@stdlib/stats/incr/pcorr2","incrpcorrdist":"@stdlib/stats/incr/pcorrdist","incrpcorrdistmat":"@stdlib/stats/incr/pcorrdistmat","incrpcorrmat":"@stdlib/stats/incr/pcorrmat","incrprod":"@stdlib/stats/incr/prod","incrrange":"@stdlib/stats/incr/range","incrrmse":"@stdlib/stats/incr/rmse","incrrss":"@stdlib/stats/incr/rss","incrSGDRegression":"@stdlib/ml/incr/sgd-regression","incrskewness":"@stdlib/stats/incr/skewness","incrspace":"@stdlib/array/incrspace","incrstdev":"@stdlib/stats/incr/stdev","incrsum":"@stdlib/stats/incr/sum","incrsumabs":"@stdlib/stats/incr/sumabs","incrsumabs2":"@stdlib/stats/incr/sumabs2","incrsummary":"@stdlib/stats/incr/summary","incrsumprod":"@stdlib/stats/incr/sumprod","incrvariance":"@stdlib/stats/incr/variance","incrvmr":"@stdlib/stats/incr/vmr","incrwmean":"@stdlib/stats/incr/wmean","ind2sub":"@stdlib/ndarray/ind2sub","indexOf":"@stdlib/utils/index-of","inherit":"@stdlib/utils/inherit","inheritedEnumerableProperties":"@stdlib/utils/inherited-enumerable-properties","inheritedEnumerablePropertySymbols":"@stdlib/utils/inherited-enumerable-property-symbols","inheritedKeys":"@stdlib/utils/inherited-keys","inheritedNonEnumerableProperties":"@stdlib/utils/inherited-nonenumerable-properties","inheritedNonEnumerablePropertyNames":"@stdlib/utils/inherited-nonenumerable-property-names","inheritedNonEnumerablePropertySymbols":"@stdlib/utils/inherited-nonenumerable-property-symbols","inheritedProperties":"@stdlib/utils/inherited-properties","inheritedPropertyDescriptor":"@stdlib/utils/inherited-property-descriptor","inheritedPropertyDescriptors":"@stdlib/utils/inherited-property-descriptors","inheritedPropertyNames":"@stdlib/utils/inherited-property-names","inheritedPropertySymbols":"@stdlib/utils/inherited-property-symbols","inheritedWritableProperties":"@stdlib/utils/inherited-writable-properties","inheritedWritablePropertyNames":"@stdlib/utils/inherited-writable-property-names","inheritedWritablePropertySymbols":"@stdlib/utils/inherited-writable-property-symbols","inmap":"@stdlib/utils/inmap","inmapAsync":"@stdlib/utils/async/inmap","inmapRight":"@stdlib/utils/inmap-right","inmapRightAsync":"@stdlib/utils/async/inmap-right","inspectSinkStream":"@stdlib/streams/node/inspect-sink","inspectStream":"@stdlib/streams/node/inspect","instanceOf":"@stdlib/assert/instance-of","INT8_MAX":"@stdlib/constants/int8/max","INT8_MIN":"@stdlib/constants/int8/min","INT8_NUM_BYTES":"@stdlib/constants/int8/num-bytes","Int8Array":"@stdlib/array/int8","INT16_MAX":"@stdlib/constants/int16/max","INT16_MIN":"@stdlib/constants/int16/min","INT16_NUM_BYTES":"@stdlib/constants/int16/num-bytes","Int16Array":"@stdlib/array/int16","INT32_MAX":"@stdlib/constants/int32/max","INT32_MIN":"@stdlib/constants/int32/min","INT32_NUM_BYTES":"@stdlib/constants/int32/num-bytes","Int32Array":"@stdlib/array/int32","IS_BIG_ENDIAN":"@stdlib/assert/is-big-endian","IS_BROWSER":"@stdlib/assert/is-browser","IS_DARWIN":"@stdlib/assert/is-darwin","IS_ELECTRON":"@stdlib/assert/is-electron","IS_ELECTRON_MAIN":"@stdlib/assert/is-electron-main","IS_ELECTRON_RENDERER":"@stdlib/assert/is-electron-renderer","IS_LITTLE_ENDIAN":"@stdlib/assert/is-little-endian","IS_NODE":"@stdlib/assert/is-node","IS_WEB_WORKER":"@stdlib/assert/is-web-worker","IS_WINDOWS":"@stdlib/assert/is-windows","isAbsolutePath":"@stdlib/assert/is-absolute-path","isAccessorProperty":"@stdlib/assert/is-accessor-property","isAccessorPropertyIn":"@stdlib/assert/is-accessor-property-in","isAlphagram":"@stdlib/assert/is-alphagram","isAlphaNumeric":"@stdlib/assert/is-alphanumeric","isAnagram":"@stdlib/assert/is-anagram","isArguments":"@stdlib/assert/is-arguments","isArray":"@stdlib/assert/is-array","isArrayArray":"@stdlib/assert/is-array-array","isArrayBuffer":"@stdlib/assert/is-arraybuffer","isArrayBufferView":"@stdlib/assert/is-arraybuffer-view","isArrayLength":"@stdlib/assert/is-array-length","isArrayLike":"@stdlib/assert/is-array-like","isArrayLikeObject":"@stdlib/assert/is-array-like-object","isASCII":"@stdlib/assert/is-ascii","isBetween":"@stdlib/assert/is-between","isBetweenArray":"@stdlib/assert/is-between-array","isBigInt":"@stdlib/assert/is-bigint","isBigInt64Array":"@stdlib/assert/is-bigint64array","isBigUint64Array":"@stdlib/assert/is-biguint64array","isBinaryString":"@stdlib/assert/is-binary-string","isBoolean":"@stdlib/assert/is-boolean","isBooleanArray":"@stdlib/assert/is-boolean-array","isBoxedPrimitive":"@stdlib/assert/is-boxed-primitive","isBuffer":"@stdlib/assert/is-buffer","isCapitalized":"@stdlib/assert/is-capitalized","isCentrosymmetricMatrix":"@stdlib/assert/is-centrosymmetric-matrix","isCircular":"@stdlib/assert/is-circular","isCircularArray":"@stdlib/assert/is-circular-array","isCircularPlainObject":"@stdlib/assert/is-circular-plain-object","isClass":"@stdlib/assert/is-class","isCollection":"@stdlib/assert/is-collection","isComplex":"@stdlib/assert/is-complex","isComplex64":"@stdlib/assert/is-complex64","isComplex64Array":"@stdlib/assert/is-complex64array","isComplex128":"@stdlib/assert/is-complex128","isComplex128Array":"@stdlib/assert/is-complex128array","isComplexLike":"@stdlib/assert/is-complex-like","isComplexTypedArray":"@stdlib/assert/is-complex-typed-array","isComplexTypedArrayLike":"@stdlib/assert/is-complex-typed-array-like","isComposite":"@stdlib/assert/is-composite","isConfigurableProperty":"@stdlib/assert/is-configurable-property","isConfigurablePropertyIn":"@stdlib/assert/is-configurable-property-in","isCubeNumber":"@stdlib/assert/is-cube-number","isDataProperty":"@stdlib/assert/is-data-property","isDataPropertyIn":"@stdlib/assert/is-data-property-in","isDataView":"@stdlib/assert/is-dataview","isDateObject":"@stdlib/assert/is-date-object","isDigitString":"@stdlib/assert/is-digit-string","isEmailAddress":"@stdlib/assert/is-email-address","isEmptyArray":"@stdlib/assert/is-empty-array","isEmptyArrayLikeObject":"@stdlib/assert/is-empty-array-like-object","isEmptyCollection":"@stdlib/assert/is-empty-collection","isEmptyObject":"@stdlib/assert/is-empty-object","isEmptyString":"@stdlib/assert/is-empty-string","isEnumerableProperty":"@stdlib/assert/is-enumerable-property","isEnumerablePropertyIn":"@stdlib/assert/is-enumerable-property-in","isError":"@stdlib/assert/is-error","isEvalError":"@stdlib/assert/is-eval-error","isEven":"@stdlib/assert/is-even","isFalsy":"@stdlib/assert/is-falsy","isFalsyArray":"@stdlib/assert/is-falsy-array","isFinite":"@stdlib/assert/is-finite","isFiniteArray":"@stdlib/assert/is-finite-array","isFloat32Array":"@stdlib/assert/is-float32array","isFloat32MatrixLike":"@stdlib/assert/is-float32matrix-like","isFloat32ndarrayLike":"@stdlib/assert/is-float32ndarray-like","isFloat32VectorLike":"@stdlib/assert/is-float32vector-like","isFloat64Array":"@stdlib/assert/is-float64array","isFloat64MatrixLike":"@stdlib/assert/is-float64matrix-like","isFloat64ndarrayLike":"@stdlib/assert/is-float64ndarray-like","isFloat64VectorLike":"@stdlib/assert/is-float64vector-like","isFunction":"@stdlib/assert/is-function","isFunctionArray":"@stdlib/assert/is-function-array","isGeneratorObject":"@stdlib/assert/is-generator-object","isGeneratorObjectLike":"@stdlib/assert/is-generator-object-like","isgzipBuffer":"@stdlib/assert/is-gzip-buffer","isHexString":"@stdlib/assert/is-hex-string","isInfinite":"@stdlib/assert/is-infinite","isInheritedProperty":"@stdlib/assert/is-inherited-property","isInt8Array":"@stdlib/assert/is-int8array","isInt16Array":"@stdlib/assert/is-int16array","isInt32Array":"@stdlib/assert/is-int32array","isInteger":"@stdlib/assert/is-integer","isIntegerArray":"@stdlib/assert/is-integer-array","isIterableLike":"@stdlib/assert/is-iterable-like","isIteratorLike":"@stdlib/assert/is-iterator-like","isJSON":"@stdlib/assert/is-json","isLeapYear":"@stdlib/assert/is-leap-year","isLocalhost":"@stdlib/assert/is-localhost","isLowercase":"@stdlib/assert/is-lowercase","isMatrixLike":"@stdlib/assert/is-matrix-like","isMethod":"@stdlib/assert/is-method","isMethodIn":"@stdlib/assert/is-method-in","isNamedTypedTupleLike":"@stdlib/assert/is-named-typed-tuple-like","isnan":"@stdlib/assert/is-nan","isNaNArray":"@stdlib/assert/is-nan-array","isNativeFunction":"@stdlib/assert/is-native-function","isndarrayLike":"@stdlib/assert/is-ndarray-like","isNegativeInteger":"@stdlib/assert/is-negative-integer","isNegativeIntegerArray":"@stdlib/assert/is-negative-integer-array","isNegativeNumber":"@stdlib/assert/is-negative-number","isNegativeNumberArray":"@stdlib/assert/is-negative-number-array","isNegativeZero":"@stdlib/assert/is-negative-zero","isNodeBuiltin":"@stdlib/assert/is-node-builtin","isNodeDuplexStreamLike":"@stdlib/assert/is-node-duplex-stream-like","isNodeReadableStreamLike":"@stdlib/assert/is-node-readable-stream-like","isNodeREPL":"@stdlib/assert/is-node-repl","isNodeStreamLike":"@stdlib/assert/is-node-stream-like","isNodeTransformStreamLike":"@stdlib/assert/is-node-transform-stream-like","isNodeWritableStreamLike":"@stdlib/assert/is-node-writable-stream-like","isNonConfigurableProperty":"@stdlib/assert/is-nonconfigurable-property","isNonConfigurablePropertyIn":"@stdlib/assert/is-nonconfigurable-property-in","isNonEnumerableProperty":"@stdlib/assert/is-nonenumerable-property","isNonEnumerablePropertyIn":"@stdlib/assert/is-nonenumerable-property-in","isNonNegativeInteger":"@stdlib/assert/is-nonnegative-integer","isNonNegativeIntegerArray":"@stdlib/assert/is-nonnegative-integer-array","isNonNegativeNumber":"@stdlib/assert/is-nonnegative-number","isNonNegativeNumberArray":"@stdlib/assert/is-nonnegative-number-array","isNonPositiveInteger":"@stdlib/assert/is-nonpositive-integer","isNonPositiveIntegerArray":"@stdlib/assert/is-nonpositive-integer-array","isNonPositiveNumber":"@stdlib/assert/is-nonpositive-number","isNonPositiveNumberArray":"@stdlib/assert/is-nonpositive-number-array","isNonSymmetricMatrix":"@stdlib/assert/is-nonsymmetric-matrix","isNull":"@stdlib/assert/is-null","isNullArray":"@stdlib/assert/is-null-array","isNumber":"@stdlib/assert/is-number","isNumberArray":"@stdlib/assert/is-number-array","isNumericArray":"@stdlib/assert/is-numeric-array","isObject":"@stdlib/assert/is-object","isObjectArray":"@stdlib/assert/is-object-array","isObjectLike":"@stdlib/assert/is-object-like","isOdd":"@stdlib/assert/is-odd","isoWeeksInYear":"@stdlib/time/iso-weeks-in-year","isPersymmetricMatrix":"@stdlib/assert/is-persymmetric-matrix","isPlainObject":"@stdlib/assert/is-plain-object","isPlainObjectArray":"@stdlib/assert/is-plain-object-array","isPositiveInteger":"@stdlib/assert/is-positive-integer","isPositiveIntegerArray":"@stdlib/assert/is-positive-integer-array","isPositiveNumber":"@stdlib/assert/is-positive-number","isPositiveNumberArray":"@stdlib/assert/is-positive-number-array","isPositiveZero":"@stdlib/assert/is-positive-zero","isPrime":"@stdlib/assert/is-prime","isPrimitive":"@stdlib/assert/is-primitive","isPrimitiveArray":"@stdlib/assert/is-primitive-array","isPRNGLike":"@stdlib/assert/is-prng-like","isProbability":"@stdlib/assert/is-probability","isProbabilityArray":"@stdlib/assert/is-probability-array","isPropertyKey":"@stdlib/assert/is-property-key","isPrototypeOf":"@stdlib/assert/is-prototype-of","isRangeError":"@stdlib/assert/is-range-error","isReadableProperty":"@stdlib/assert/is-readable-property","isReadablePropertyIn":"@stdlib/assert/is-readable-property-in","isReadOnlyProperty":"@stdlib/assert/is-read-only-property","isReadOnlyPropertyIn":"@stdlib/assert/is-read-only-property-in","isReadWriteProperty":"@stdlib/assert/is-read-write-property","isReadWritePropertyIn":"@stdlib/assert/is-read-write-property-in","isReferenceError":"@stdlib/assert/is-reference-error","isRegExp":"@stdlib/assert/is-regexp","isRegExpString":"@stdlib/assert/is-regexp-string","isRelativePath":"@stdlib/assert/is-relative-path","isSafeInteger":"@stdlib/assert/is-safe-integer","isSafeIntegerArray":"@stdlib/assert/is-safe-integer-array","isSameNativeClass":"@stdlib/assert/is-same-native-class","isSameType":"@stdlib/assert/is-same-type","isSameValue":"@stdlib/assert/is-same-value","isSameValueZero":"@stdlib/assert/is-same-value-zero","isSharedArrayBuffer":"@stdlib/assert/is-sharedarraybuffer","isSkewCentrosymmetricMatrix":"@stdlib/assert/is-skew-centrosymmetric-matrix","isSkewPersymmetricMatrix":"@stdlib/assert/is-skew-persymmetric-matrix","isSkewSymmetricMatrix":"@stdlib/assert/is-skew-symmetric-matrix","isSquareMatrix":"@stdlib/assert/is-square-matrix","isSquareNumber":"@stdlib/assert/is-square-number","isSquareTriangularNumber":"@stdlib/assert/is-square-triangular-number","isStrictEqual":"@stdlib/assert/is-strict-equal","isString":"@stdlib/assert/is-string","isStringArray":"@stdlib/assert/is-string-array","isSymbol":"@stdlib/assert/is-symbol","isSymbolArray":"@stdlib/assert/is-symbol-array","isSymmetricMatrix":"@stdlib/assert/is-symmetric-matrix","isSyntaxError":"@stdlib/assert/is-syntax-error","isTriangularNumber":"@stdlib/assert/is-triangular-number","isTruthy":"@stdlib/assert/is-truthy","isTruthyArray":"@stdlib/assert/is-truthy-array","isTypedArray":"@stdlib/assert/is-typed-array","isTypedArrayLength":"@stdlib/assert/is-typed-array-length","isTypedArrayLike":"@stdlib/assert/is-typed-array-like","isTypeError":"@stdlib/assert/is-type-error","isUint8Array":"@stdlib/assert/is-uint8array","isUint8ClampedArray":"@stdlib/assert/is-uint8clampedarray","isUint16Array":"@stdlib/assert/is-uint16array","isUint32Array":"@stdlib/assert/is-uint32array","isUNCPath":"@stdlib/assert/is-unc-path","isUndefined":"@stdlib/assert/is-undefined","isUndefinedOrNull":"@stdlib/assert/is-undefined-or-null","isUnityProbabilityArray":"@stdlib/assert/is-unity-probability-array","isUppercase":"@stdlib/assert/is-uppercase","isURI":"@stdlib/assert/is-uri","isURIError":"@stdlib/assert/is-uri-error","isVectorLike":"@stdlib/assert/is-vector-like","isWhitespace":"@stdlib/assert/is-whitespace","isWritableProperty":"@stdlib/assert/is-writable-property","isWritablePropertyIn":"@stdlib/assert/is-writable-property-in","isWriteOnlyProperty":"@stdlib/assert/is-write-only-property","isWriteOnlyPropertyIn":"@stdlib/assert/is-write-only-property-in","iterAbs":"@stdlib/math/iter/special/abs","iterAbs2":"@stdlib/math/iter/special/abs2","iterAcos":"@stdlib/math/iter/special/acos","iterAcosh":"@stdlib/math/iter/special/acosh","iterAcot":"@stdlib/math/iter/special/acot","iterAcoth":"@stdlib/math/iter/special/acoth","iterAcovercos":"@stdlib/math/iter/special/acovercos","iterAcoversin":"@stdlib/math/iter/special/acoversin","iterAdd":"@stdlib/math/iter/ops/add","iterAdvance":"@stdlib/iter/advance","iterAhavercos":"@stdlib/math/iter/special/ahavercos","iterAhaversin":"@stdlib/math/iter/special/ahaversin","iterAny":"@stdlib/iter/any","iterAnyBy":"@stdlib/iter/any-by","iterAsin":"@stdlib/math/iter/special/asin","iterAsinh":"@stdlib/math/iter/special/asinh","iterAtan":"@stdlib/math/iter/special/atan","iterAtan2":"@stdlib/math/iter/special/atan2","iterAtanh":"@stdlib/math/iter/special/atanh","iterator2array":"@stdlib/array/from-iterator","iterator2arrayview":"@stdlib/iter/to-array-view","iterator2arrayviewRight":"@stdlib/iter/to-array-view-right","iteratorStream":"@stdlib/streams/node/from-iterator","IteratorSymbol":"@stdlib/symbol/iterator","iterAvercos":"@stdlib/math/iter/special/avercos","iterAversin":"@stdlib/math/iter/special/aversin","iterawgn":"@stdlib/simulate/iter/awgn","iterawln":"@stdlib/simulate/iter/awln","iterawun":"@stdlib/simulate/iter/awun","iterBartlettHannPulse":"@stdlib/simulate/iter/bartlett-hann-pulse","iterBartlettPulse":"@stdlib/simulate/iter/bartlett-pulse","iterBesselj0":"@stdlib/math/iter/special/besselj0","iterBesselj1":"@stdlib/math/iter/special/besselj1","iterBessely0":"@stdlib/math/iter/special/bessely0","iterBessely1":"@stdlib/math/iter/special/bessely1","iterBeta":"@stdlib/math/iter/special/beta","iterBetaln":"@stdlib/math/iter/special/betaln","iterBinet":"@stdlib/math/iter/special/binet","iterCbrt":"@stdlib/math/iter/special/cbrt","iterCeil":"@stdlib/math/iter/special/ceil","iterCeil2":"@stdlib/math/iter/special/ceil2","iterCeil10":"@stdlib/math/iter/special/ceil10","iterCompositesSeq":"@stdlib/math/iter/sequences/composites","iterConcat":"@stdlib/iter/concat","iterConstant":"@stdlib/iter/constant","iterContinuedFraction":"@stdlib/math/iter/utils/continued-fraction","iterContinuedFractionSeq":"@stdlib/math/iter/sequences/continued-fraction","iterCos":"@stdlib/math/iter/special/cos","iterCosh":"@stdlib/math/iter/special/cosh","iterCosineWave":"@stdlib/simulate/iter/cosine-wave","iterCosm1":"@stdlib/math/iter/special/cosm1","iterCospi":"@stdlib/math/iter/special/cospi","iterCounter":"@stdlib/iter/counter","iterCovercos":"@stdlib/math/iter/special/covercos","iterCoversin":"@stdlib/math/iter/special/coversin","iterCubesSeq":"@stdlib/math/iter/sequences/cubes","itercugmean":"@stdlib/stats/iter/cugmean","itercuhmean":"@stdlib/stats/iter/cuhmean","itercumax":"@stdlib/stats/iter/cumax","itercumaxabs":"@stdlib/stats/iter/cumaxabs","itercumean":"@stdlib/stats/iter/cumean","itercumeanabs":"@stdlib/stats/iter/cumeanabs","itercumeanabs2":"@stdlib/stats/iter/cumeanabs2","itercumidrange":"@stdlib/stats/iter/cumidrange","itercumin":"@stdlib/stats/iter/cumin","itercuminabs":"@stdlib/stats/iter/cuminabs","itercuprod":"@stdlib/stats/iter/cuprod","itercurange":"@stdlib/stats/iter/curange","itercusum":"@stdlib/stats/iter/cusum","itercusumabs":"@stdlib/stats/iter/cusumabs","itercusumabs2":"@stdlib/stats/iter/cusumabs2","iterDatespace":"@stdlib/iter/datespace","iterDedupe":"@stdlib/iter/dedupe","iterDedupeBy":"@stdlib/iter/dedupe-by","iterDeg2rad":"@stdlib/math/iter/special/deg2rad","iterDigamma":"@stdlib/math/iter/special/digamma","iterDiracComb":"@stdlib/simulate/iter/dirac-comb","iterDiracDelta":"@stdlib/math/iter/special/dirac-delta","iterDivide":"@stdlib/math/iter/ops/divide","iterEllipe":"@stdlib/math/iter/special/ellipe","iterEllipk":"@stdlib/math/iter/special/ellipk","iterEmpty":"@stdlib/iter/empty","iterErf":"@stdlib/math/iter/special/erf","iterErfc":"@stdlib/math/iter/special/erfc","iterErfcinv":"@stdlib/math/iter/special/erfcinv","iterErfinv":"@stdlib/math/iter/special/erfinv","iterEta":"@stdlib/math/iter/special/dirichlet-eta","iterEvenIntegersSeq":"@stdlib/math/iter/sequences/even-integers","iterEvery":"@stdlib/iter/every","iterEveryBy":"@stdlib/iter/every-by","iterExp":"@stdlib/math/iter/special/exp","iterExp2":"@stdlib/math/iter/special/exp2","iterExp10":"@stdlib/math/iter/special/exp10","iterExpit":"@stdlib/math/iter/special/expit","iterExpm1":"@stdlib/math/iter/special/expm1","iterExpm1rel":"@stdlib/math/iter/special/expm1rel","iterFactorial":"@stdlib/math/iter/special/factorial","iterFactorialln":"@stdlib/math/iter/special/factorialln","iterFactorialsSeq":"@stdlib/math/iter/sequences/factorials","iterFibonacciSeq":"@stdlib/math/iter/sequences/fibonacci","iterFifthPowersSeq":"@stdlib/math/iter/sequences/fifth-powers","iterFill":"@stdlib/iter/fill","iterFilter":"@stdlib/iter/filter","iterFilterMap":"@stdlib/iter/filter-map","iterFirst":"@stdlib/iter/first","iterFlatTopPulse":"@stdlib/simulate/iter/flat-top-pulse","iterFloor":"@stdlib/math/iter/special/floor","iterFloor2":"@stdlib/math/iter/special/floor2","iterFloor10":"@stdlib/math/iter/special/floor10","iterFlow":"@stdlib/iter/flow","iterForEach":"@stdlib/iter/for-each","iterFourthPowersSeq":"@stdlib/math/iter/sequences/fourth-powers","iterFresnelc":"@stdlib/math/iter/special/fresnelc","iterFresnels":"@stdlib/math/iter/special/fresnels","iterGamma":"@stdlib/math/iter/special/gamma","iterGamma1pm1":"@stdlib/math/iter/special/gamma1pm1","iterGammaln":"@stdlib/math/iter/special/gammaln","iterHacovercos":"@stdlib/math/iter/special/hacovercos","iterHacoversin":"@stdlib/math/iter/special/hacoversin","iterHannPulse":"@stdlib/simulate/iter/hann-pulse","iterHavercos":"@stdlib/math/iter/special/havercos","iterHaversin":"@stdlib/math/iter/special/haversin","iterHead":"@stdlib/iter/head","iterIncrspace":"@stdlib/iter/incrspace","iterIntegersSeq":"@stdlib/math/iter/sequences/integers","iterIntersection":"@stdlib/iter/intersection","iterIntersectionByHash":"@stdlib/iter/intersection-by-hash","iterInv":"@stdlib/math/iter/special/inv","iterLanczosPulse":"@stdlib/simulate/iter/lanczos-pulse","iterLast":"@stdlib/iter/last","iterLength":"@stdlib/iter/length","iterLinspace":"@stdlib/iter/linspace","iterLn":"@stdlib/math/iter/special/ln","iterLog":"@stdlib/math/iter/special/log","iterLog1mexp":"@stdlib/math/iter/special/log1mexp","iterLog1p":"@stdlib/math/iter/special/log1p","iterLog1pexp":"@stdlib/math/iter/special/log1pexp","iterLog2":"@stdlib/math/iter/special/log2","iterLog10":"@stdlib/math/iter/special/log10","iterLogit":"@stdlib/math/iter/special/logit","iterLogspace":"@stdlib/iter/logspace","iterLucasSeq":"@stdlib/math/iter/sequences/lucas","iterMap":"@stdlib/iter/map","iterMapN":"@stdlib/iter/mapn","itermax":"@stdlib/stats/iter/max","itermaxabs":"@stdlib/stats/iter/maxabs","itermean":"@stdlib/stats/iter/mean","itermeanabs":"@stdlib/stats/iter/meanabs","itermeanabs2":"@stdlib/stats/iter/meanabs2","itermidrange":"@stdlib/stats/iter/midrange","itermin":"@stdlib/stats/iter/min","iterminabs":"@stdlib/stats/iter/minabs","itermmax":"@stdlib/stats/iter/mmax","itermmaxabs":"@stdlib/stats/iter/mmaxabs","itermmean":"@stdlib/stats/iter/mmean","itermmeanabs":"@stdlib/stats/iter/mmeanabs","itermmeanabs2":"@stdlib/stats/iter/mmeanabs2","itermmidrange":"@stdlib/stats/iter/mmidrange","itermmin":"@stdlib/stats/iter/mmin","itermminabs":"@stdlib/stats/iter/mminabs","iterMod":"@stdlib/math/iter/ops/mod","itermprod":"@stdlib/stats/iter/mprod","itermrange":"@stdlib/stats/iter/mrange","itermsum":"@stdlib/stats/iter/msum","itermsumabs":"@stdlib/stats/iter/msumabs","itermsumabs2":"@stdlib/stats/iter/msumabs2","iterMultiply":"@stdlib/math/iter/ops/multiply","iterNegaFibonacciSeq":"@stdlib/math/iter/sequences/negafibonacci","iterNegaLucasSeq":"@stdlib/math/iter/sequences/negalucas","iterNegativeEvenIntegersSeq":"@stdlib/math/iter/sequences/negative-even-integers","iterNegativeIntegersSeq":"@stdlib/math/iter/sequences/negative-integers","iterNegativeOddIntegersSeq":"@stdlib/math/iter/sequences/negative-odd-integers","iterNone":"@stdlib/iter/none","iterNoneBy":"@stdlib/iter/none-by","iterNonFibonacciSeq":"@stdlib/math/iter/sequences/nonfibonacci","iterNonNegativeEvenIntegersSeq":"@stdlib/math/iter/sequences/nonnegative-even-integers","iterNonNegativeIntegersSeq":"@stdlib/math/iter/sequences/nonnegative-integers","iterNonPositiveEvenIntegersSeq":"@stdlib/math/iter/sequences/nonpositive-even-integers","iterNonPositiveIntegersSeq":"@stdlib/math/iter/sequences/nonpositive-integers","iterNonSquaresSeq":"@stdlib/math/iter/sequences/nonsquares","iterNth":"@stdlib/iter/nth","iterOddIntegersSeq":"@stdlib/math/iter/sequences/odd-integers","iterPeriodicSinc":"@stdlib/simulate/iter/periodic-sinc","iterPipeline":"@stdlib/iter/pipeline","iterPop":"@stdlib/iter/pop","iterPositiveEvenIntegersSeq":"@stdlib/math/iter/sequences/positive-even-integers","iterPositiveIntegersSeq":"@stdlib/math/iter/sequences/positive-integers","iterPositiveOddIntegersSeq":"@stdlib/math/iter/sequences/positive-odd-integers","iterPow":"@stdlib/math/iter/special/pow","iterPrimesSeq":"@stdlib/math/iter/sequences/primes","iterprod":"@stdlib/stats/iter/prod","iterPulse":"@stdlib/simulate/iter/pulse","iterPush":"@stdlib/iter/push","iterRad2deg":"@stdlib/math/iter/special/rad2deg","iterRamp":"@stdlib/math/iter/special/ramp","iterrange":"@stdlib/stats/iter/range","iterReject":"@stdlib/iter/reject","iterReplicate":"@stdlib/iter/replicate","iterReplicateBy":"@stdlib/iter/replicate-by","iterRound":"@stdlib/math/iter/special/round","iterRound2":"@stdlib/math/iter/special/round2","iterRound10":"@stdlib/math/iter/special/round10","iterRsqrt":"@stdlib/math/iter/special/rsqrt","iterSawtoothWave":"@stdlib/simulate/iter/sawtooth-wave","iterShift":"@stdlib/iter/shift","iterSignum":"@stdlib/math/iter/special/signum","iterSin":"@stdlib/math/iter/special/sin","iterSinc":"@stdlib/math/iter/special/sinc","iterSineWave":"@stdlib/simulate/iter/sine-wave","iterSinh":"@stdlib/math/iter/special/sinh","iterSinpi":"@stdlib/math/iter/special/sinpi","iterSlice":"@stdlib/iter/slice","iterSome":"@stdlib/iter/some","iterSomeBy":"@stdlib/iter/some-by","iterSpence":"@stdlib/math/iter/special/spence","iterSqrt":"@stdlib/math/iter/special/sqrt","iterSqrt1pm1":"@stdlib/math/iter/special/sqrt1pm1","iterSquaredTriangularSeq":"@stdlib/math/iter/sequences/squared-triangular","iterSquaresSeq":"@stdlib/math/iter/sequences/squares","iterSquareWave":"@stdlib/simulate/iter/square-wave","iterstdev":"@stdlib/stats/iter/stdev","iterStep":"@stdlib/iter/step","iterStrided":"@stdlib/iter/strided","iterStridedBy":"@stdlib/iter/strided-by","iterSubtract":"@stdlib/math/iter/ops/subtract","itersum":"@stdlib/stats/iter/sum","itersumabs":"@stdlib/stats/iter/sumabs","itersumabs2":"@stdlib/stats/iter/sumabs2","iterTan":"@stdlib/math/iter/special/tan","iterTanh":"@stdlib/math/iter/special/tanh","iterThunk":"@stdlib/iter/pipeline-thunk","iterTriangleWave":"@stdlib/simulate/iter/triangle-wave","iterTriangularSeq":"@stdlib/math/iter/sequences/triangular","iterTrigamma":"@stdlib/math/iter/special/trigamma","iterTrunc":"@stdlib/math/iter/special/trunc","iterTrunc2":"@stdlib/math/iter/special/trunc2","iterTrunc10":"@stdlib/math/iter/special/trunc10","iterUnion":"@stdlib/iter/union","iterUnique":"@stdlib/iter/unique","iterUniqueBy":"@stdlib/iter/unique-by","iterUniqueByHash":"@stdlib/iter/unique-by-hash","iterUnitspace":"@stdlib/iter/unitspace","iterUnshift":"@stdlib/iter/unshift","itervariance":"@stdlib/stats/iter/variance","iterVercos":"@stdlib/math/iter/special/vercos","iterVersin":"@stdlib/math/iter/special/versin","iterZeta":"@stdlib/math/iter/special/riemann-zeta","joinStream":"@stdlib/streams/node/join","kde2d":"@stdlib/stats/kde2d","kebabcase":"@stdlib/string/kebabcase","keyBy":"@stdlib/utils/key-by","keyByRight":"@stdlib/utils/key-by-right","keysIn":"@stdlib/utils/keys-in","kruskalTest":"@stdlib/stats/kruskal-test","kstest":"@stdlib/stats/kstest","lda":"@stdlib/nlp/lda","leveneTest":"@stdlib/stats/levene-test","LinkedList":"@stdlib/utils/linked-list","linspace":"@stdlib/array/linspace","LIU_NEGATIVE_OPINION_WORDS_EN":"@stdlib/datasets/liu-negative-opinion-words-en","LIU_POSITIVE_OPINION_WORDS_EN":"@stdlib/datasets/liu-positive-opinion-words-en","LN_HALF":"@stdlib/constants/float64/ln-half","LN_PI":"@stdlib/constants/float64/ln-pi","LN_SQRT_TWO_PI":"@stdlib/constants/float64/ln-sqrt-two-pi","LN_TWO_PI":"@stdlib/constants/float64/ln-two-pi","LN2":"@stdlib/constants/float64/ln-two","LN10":"@stdlib/constants/float64/ln-ten","LOG2E":"@stdlib/constants/float64/log2-e","LOG10E":"@stdlib/constants/float64/log10-e","logspace":"@stdlib/array/logspace","lowercase":"@stdlib/string/lowercase","lowercaseKeys":"@stdlib/utils/lowercase-keys","lowess":"@stdlib/stats/lowess","lpad":"@stdlib/string/left-pad","ltrim":"@stdlib/string/left-trim","MALE_FIRST_NAMES_EN":"@stdlib/datasets/male-first-names-en","map":"@stdlib/utils/map","map2":"@stdlib/utils/map2","map2d":"@stdlib/utils/map2d","map2Right":"@stdlib/utils/map2-right","map3d":"@stdlib/utils/map3d","map4d":"@stdlib/utils/map4d","map5d":"@stdlib/utils/map5d","mapArguments":"@stdlib/utils/map-arguments","mapFun":"@stdlib/utils/map-function","mapFunAsync":"@stdlib/utils/async/map-function","mapKeys":"@stdlib/utils/map-keys","mapKeysAsync":"@stdlib/utils/async/map-keys","mapReduce":"@stdlib/utils/map-reduce","mapReduceRight":"@stdlib/utils/map-reduce-right","mapRight":"@stdlib/utils/map-right","mapValues":"@stdlib/utils/map-values","mapValuesAsync":"@stdlib/utils/async/map-values","maskArguments":"@stdlib/utils/mask-arguments","MAX_ARRAY_LENGTH":"@stdlib/constants/array/max-array-length","MAX_TYPED_ARRAY_LENGTH":"@stdlib/constants/array/max-typed-array-length","memoize":"@stdlib/utils/memoize","merge":"@stdlib/utils/merge","MILLISECONDS_IN_DAY":"@stdlib/constants/time/milliseconds-in-day","MILLISECONDS_IN_HOUR":"@stdlib/constants/time/milliseconds-in-hour","MILLISECONDS_IN_MINUTE":"@stdlib/constants/time/milliseconds-in-minute","MILLISECONDS_IN_SECOND":"@stdlib/constants/time/milliseconds-in-second","MILLISECONDS_IN_WEEK":"@stdlib/constants/time/milliseconds-in-week","MINARD_NAPOLEONS_MARCH":"@stdlib/datasets/minard-napoleons-march","MINUTES_IN_DAY":"@stdlib/constants/time/minutes-in-day","MINUTES_IN_HOUR":"@stdlib/constants/time/minutes-in-hour","MINUTES_IN_WEEK":"@stdlib/constants/time/minutes-in-week","minutesInMonth":"@stdlib/time/minutes-in-month","minutesInYear":"@stdlib/time/minutes-in-year","MOBY_DICK":"@stdlib/datasets/moby-dick","MONTH_NAMES_EN":"@stdlib/datasets/month-names-en","MONTHS_IN_YEAR":"@stdlib/constants/time/months-in-year","moveProperty":"@stdlib/utils/move-property","namedtypedtuple":"@stdlib/utils/named-typed-tuple","naryFunction":"@stdlib/utils/nary-function","nativeClass":"@stdlib/utils/native-class","ndarray":"@stdlib/ndarray/ctor","ndarrayCastingModes":"@stdlib/ndarray/casting-modes","ndarrayDataTypes":"@stdlib/ndarray/dtypes","ndarrayDispatch":"@stdlib/ndarray/dispatch","ndarrayIndexModes":"@stdlib/ndarray/index-modes","ndarrayMinDataType":"@stdlib/ndarray/min-dtype","ndarrayNextDataType":"@stdlib/ndarray/next-dtype","ndarrayOrders":"@stdlib/ndarray/orders","ndarrayPromotionRules":"@stdlib/ndarray/promotion-rules","ndarraySafeCasts":"@stdlib/ndarray/safe-casts","ndarraySameKindCasts":"@stdlib/ndarray/same-kind-casts","ndzeros":"@stdlib/ndarray/zeros","ndzerosLike":"@stdlib/ndarray/zeros-like","nextGraphemeClusterBreak":"@stdlib/string/next-grapheme-cluster-break","nextTick":"@stdlib/utils/next-tick","NIGHTINGALES_ROSE":"@stdlib/datasets/nightingales-rose","NINF":"@stdlib/constants/float64/ninf","NODE_VERSION":"@stdlib/process/node-version","none":"@stdlib/utils/none","noneBy":"@stdlib/utils/none-by","noneByAsync":"@stdlib/utils/async/none-by","noneByRight":"@stdlib/utils/none-by-right","noneByRightAsync":"@stdlib/utils/async/none-by-right","nonEnumerableProperties":"@stdlib/utils/nonenumerable-properties","nonEnumerablePropertiesIn":"@stdlib/utils/nonenumerable-properties-in","nonEnumerablePropertyNames":"@stdlib/utils/nonenumerable-property-names","nonEnumerablePropertyNamesIn":"@stdlib/utils/nonenumerable-property-names-in","nonEnumerablePropertySymbols":"@stdlib/utils/nonenumerable-property-symbols","nonEnumerablePropertySymbolsIn":"@stdlib/utils/nonenumerable-property-symbols-in","nonIndexKeys":"@stdlib/utils/nonindex-keys","noop":"@stdlib/utils/noop","now":"@stdlib/time/now","NUM_CPUS":"@stdlib/os/num-cpus","Number":"@stdlib/number/ctor","numGraphemeClusters":"@stdlib/string/num-grapheme-clusters","objectEntries":"@stdlib/utils/entries","objectEntriesIn":"@stdlib/utils/entries-in","objectFromEntries":"@stdlib/utils/from-entries","objectInverse":"@stdlib/utils/object-inverse","objectInverseBy":"@stdlib/utils/object-inverse-by","objectKeys":"@stdlib/utils/keys","objectValues":"@stdlib/utils/values","objectValuesIn":"@stdlib/utils/values-in","omit":"@stdlib/utils/omit","omitBy":"@stdlib/utils/omit-by","open":"@stdlib/fs/open","openURL":"@stdlib/utils/open-url","PACE_BOSTON_HOUSE_PRICES":"@stdlib/datasets/pace-boston-house-prices","pad":"@stdlib/string/pad","padjust":"@stdlib/stats/padjust","papply":"@stdlib/utils/papply","papplyRight":"@stdlib/utils/papply-right","parallel":"@stdlib/utils/parallel","parseJSON":"@stdlib/utils/parse-json","pascalcase":"@stdlib/string/pascalcase","PATH_DELIMITER":"@stdlib/constants/path/delimiter","PATH_DELIMITER_POSIX":"@stdlib/constants/path/delimiter-posix","PATH_DELIMITER_WIN32":"@stdlib/constants/path/delimiter-win32","PATH_SEP":"@stdlib/constants/path/sep","PATH_SEP_POSIX":"@stdlib/constants/path/sep-posix","PATH_SEP_WIN32":"@stdlib/constants/path/sep-win32","pcorrtest":"@stdlib/stats/pcorrtest","percentEncode":"@stdlib/string/percent-encode","PHI":"@stdlib/constants/float64/phi","PI":"@stdlib/constants/float64/pi","PI_SQUARED":"@stdlib/constants/float64/pi-squared","pick":"@stdlib/utils/pick","pickArguments":"@stdlib/utils/pick-arguments","pickBy":"@stdlib/utils/pick-by","PINF":"@stdlib/constants/float64/pinf","pkg2alias":"@stdlib/namespace/pkg2alias","pkg2related":"@stdlib/namespace/pkg2related","pkg2standalone":"@stdlib/namespace/pkg2standalone","PLATFORM":"@stdlib/os/platform","plot":"@stdlib/plot","Plot":"@stdlib/plot/ctor","pluck":"@stdlib/utils/pluck","pop":"@stdlib/utils/pop","porterStemmer":"@stdlib/nlp/porter-stemmer","prepend":"@stdlib/utils/prepend","PRIMES_100K":"@stdlib/datasets/primes-100k","properties":"@stdlib/utils/properties","propertiesIn":"@stdlib/utils/properties-in","propertyDescriptor":"@stdlib/utils/property-descriptor","propertyDescriptorIn":"@stdlib/utils/property-descriptor-in","propertyDescriptors":"@stdlib/utils/property-descriptors","propertyDescriptorsIn":"@stdlib/utils/property-descriptors-in","propertyNames":"@stdlib/utils/property-names","propertyNamesIn":"@stdlib/utils/property-names-in","propertySymbols":"@stdlib/utils/property-symbols","propertySymbolsIn":"@stdlib/utils/property-symbols-in","Proxy":"@stdlib/proxy/ctor","push":"@stdlib/utils/push","quarterOfYear":"@stdlib/time/quarter-of-year","random.iterators.arcsine":"@stdlib/random/iter/arcsine","random.iterators.bernoulli":"@stdlib/random/iter/bernoulli","random.iterators.beta":"@stdlib/random/iter/beta","random.iterators.betaprime":"@stdlib/random/iter/betaprime","random.iterators.binomial":"@stdlib/random/iter/binomial","random.iterators.boxMuller":"@stdlib/random/iter/box-muller","random.iterators.cauchy":"@stdlib/random/iter/cauchy","random.iterators.chi":"@stdlib/random/iter/chi","random.iterators.chisquare":"@stdlib/random/iter/chisquare","random.iterators.cosine":"@stdlib/random/iter/cosine","random.iterators.discreteUniform":"@stdlib/random/iter/discrete-uniform","random.iterators.erlang":"@stdlib/random/iter/erlang","random.iterators.exponential":"@stdlib/random/iter/exponential","random.iterators.f":"@stdlib/random/iter/f","random.iterators.frechet":"@stdlib/random/iter/frechet","random.iterators.gamma":"@stdlib/random/iter/gamma","random.iterators.geometric":"@stdlib/random/iter/geometric","random.iterators.gumbel":"@stdlib/random/iter/gumbel","random.iterators.hypergeometric":"@stdlib/random/iter/hypergeometric","random.iterators.improvedZiggurat":"@stdlib/random/iter/improved-ziggurat","random.iterators.invgamma":"@stdlib/random/iter/invgamma","random.iterators.kumaraswamy":"@stdlib/random/iter/kumaraswamy","random.iterators.laplace":"@stdlib/random/iter/laplace","random.iterators.levy":"@stdlib/random/iter/levy","random.iterators.logistic":"@stdlib/random/iter/logistic","random.iterators.lognormal":"@stdlib/random/iter/lognormal","random.iterators.minstd":"@stdlib/random/iter/minstd","random.iterators.minstdShuffle":"@stdlib/random/iter/minstd-shuffle","random.iterators.mt19937":"@stdlib/random/iter/mt19937","random.iterators.negativeBinomial":"@stdlib/random/iter/negative-binomial","random.iterators.normal":"@stdlib/random/iter/normal","random.iterators.pareto1":"@stdlib/random/iter/pareto-type1","random.iterators.poisson":"@stdlib/random/iter/poisson","random.iterators.randi":"@stdlib/random/iter/randi","random.iterators.randn":"@stdlib/random/iter/randn","random.iterators.randu":"@stdlib/random/iter/randu","random.iterators.rayleigh":"@stdlib/random/iter/rayleigh","random.iterators.t":"@stdlib/random/iter/t","random.iterators.triangular":"@stdlib/random/iter/triangular","random.iterators.uniform":"@stdlib/random/iter/uniform","random.iterators.weibull":"@stdlib/random/iter/weibull","random.streams.arcsine":"@stdlib/random/streams/arcsine","random.streams.bernoulli":"@stdlib/random/streams/bernoulli","random.streams.beta":"@stdlib/random/streams/beta","random.streams.betaprime":"@stdlib/random/streams/betaprime","random.streams.binomial":"@stdlib/random/streams/binomial","random.streams.boxMuller":"@stdlib/random/streams/box-muller","random.streams.cauchy":"@stdlib/random/streams/cauchy","random.streams.chi":"@stdlib/random/streams/chi","random.streams.chisquare":"@stdlib/random/streams/chisquare","random.streams.cosine":"@stdlib/random/streams/cosine","random.streams.discreteUniform":"@stdlib/random/streams/discrete-uniform","random.streams.erlang":"@stdlib/random/streams/erlang","random.streams.exponential":"@stdlib/random/streams/exponential","random.streams.f":"@stdlib/random/streams/f","random.streams.frechet":"@stdlib/random/streams/frechet","random.streams.gamma":"@stdlib/random/streams/gamma","random.streams.geometric":"@stdlib/random/streams/geometric","random.streams.gumbel":"@stdlib/random/streams/gumbel","random.streams.hypergeometric":"@stdlib/random/streams/hypergeometric","random.streams.improvedZiggurat":"@stdlib/random/streams/improved-ziggurat","random.streams.invgamma":"@stdlib/random/streams/invgamma","random.streams.kumaraswamy":"@stdlib/random/streams/kumaraswamy","random.streams.laplace":"@stdlib/random/streams/laplace","random.streams.levy":"@stdlib/random/streams/levy","random.streams.logistic":"@stdlib/random/streams/logistic","random.streams.lognormal":"@stdlib/random/streams/lognormal","random.streams.minstd":"@stdlib/random/streams/minstd","random.streams.minstdShuffle":"@stdlib/random/streams/minstd-shuffle","random.streams.mt19937":"@stdlib/random/streams/mt19937","random.streams.negativeBinomial":"@stdlib/random/streams/negative-binomial","random.streams.normal":"@stdlib/random/streams/normal","random.streams.pareto1":"@stdlib/random/streams/pareto-type1","random.streams.poisson":"@stdlib/random/streams/poisson","random.streams.randi":"@stdlib/random/streams/randi","random.streams.randn":"@stdlib/random/streams/randn","random.streams.randu":"@stdlib/random/streams/randu","random.streams.rayleigh":"@stdlib/random/streams/rayleigh","random.streams.t":"@stdlib/random/streams/t","random.streams.triangular":"@stdlib/random/streams/triangular","random.streams.uniform":"@stdlib/random/streams/uniform","random.streams.weibull":"@stdlib/random/streams/weibull","ranks":"@stdlib/stats/ranks","readDir":"@stdlib/fs/read-dir","readFile":"@stdlib/fs/read-file","readFileList":"@stdlib/fs/read-file-list","readJSON":"@stdlib/fs/read-json","readWASM":"@stdlib/fs/read-wasm","real":"@stdlib/complex/real","realarray":"@stdlib/array/typed-real","realarrayCtors":"@stdlib/array/typed-real-ctors","realarrayDataTypes":"@stdlib/array/typed-real-dtypes","realf":"@stdlib/complex/realf","realmax":"@stdlib/utils/real-max","realmin":"@stdlib/utils/real-min","reBasename":"@stdlib/regexp/basename","reBasenamePosix":"@stdlib/regexp/basename-posix","reBasenameWindows":"@stdlib/regexp/basename-windows","reColorHexadecimal":"@stdlib/regexp/color-hexadecimal","reDecimalNumber":"@stdlib/regexp/decimal-number","reDirname":"@stdlib/regexp/dirname","reDirnamePosix":"@stdlib/regexp/dirname-posix","reDirnameWindows":"@stdlib/regexp/dirname-windows","reduce":"@stdlib/utils/reduce","reduce2d":"@stdlib/utils/reduce2d","reduceAsync":"@stdlib/utils/async/reduce","reduceRight":"@stdlib/utils/reduce-right","reduceRightAsync":"@stdlib/utils/async/reduce-right","reEOL":"@stdlib/regexp/eol","reExtendedLengthPath":"@stdlib/regexp/extended-length-path","reExtname":"@stdlib/regexp/extname","reExtnamePosix":"@stdlib/regexp/extname-posix","reExtnameWindows":"@stdlib/regexp/extname-windows","reFilename":"@stdlib/regexp/filename","reFilenamePosix":"@stdlib/regexp/filename-posix","reFilenameWindows":"@stdlib/regexp/filename-windows","reFromString":"@stdlib/utils/regexp-from-string","reFunctionName":"@stdlib/regexp/function-name","reim":"@stdlib/complex/reim","reimf":"@stdlib/complex/reimf","rejectArguments":"@stdlib/utils/reject-arguments","removeFirst":"@stdlib/string/remove-first","removeLast":"@stdlib/string/remove-last","removePunctuation":"@stdlib/string/remove-punctuation","removeUTF8BOM":"@stdlib/string/remove-utf8-bom","removeWords":"@stdlib/string/remove-words","rename":"@stdlib/fs/rename","reNativeFunction":"@stdlib/regexp/native-function","reorderArguments":"@stdlib/utils/reorder-arguments","repeat":"@stdlib/string/repeat","replace":"@stdlib/string/replace","reRegExp":"@stdlib/regexp/regexp","rescape":"@stdlib/utils/escape-regexp-string","resolveParentPath":"@stdlib/fs/resolve-parent-path","resolveParentPathBy":"@stdlib/fs/resolve-parent-path-by","reUncPath":"@stdlib/regexp/unc-path","reUtf16SurrogatePair":"@stdlib/regexp/utf16-surrogate-pair","reUtf16UnpairedSurrogate":"@stdlib/regexp/utf16-unpaired-surrogate","reverseArguments":"@stdlib/utils/reverse-arguments","reverseString":"@stdlib/string/reverse","reviveBasePRNG":"@stdlib/random/base/reviver","reviveBuffer":"@stdlib/buffer/reviver","reviveComplex":"@stdlib/complex/reviver","reviveComplex64":"@stdlib/complex/reviver-float32","reviveComplex128":"@stdlib/complex/reviver-float64","reviveError":"@stdlib/error/reviver","reviveTypedArray":"@stdlib/array/reviver","reWhitespace":"@stdlib/regexp/whitespace","rpad":"@stdlib/string/right-pad","rtrim":"@stdlib/string/right-trim","safeintmax":"@stdlib/utils/safe-int-max","safeintmin":"@stdlib/utils/safe-int-min","sample":"@stdlib/random/sample","SAVOY_STOPWORDS_FIN":"@stdlib/datasets/savoy-stopwords-fin","SAVOY_STOPWORDS_FR":"@stdlib/datasets/savoy-stopwords-fr","SAVOY_STOPWORDS_GER":"@stdlib/datasets/savoy-stopwords-ger","SAVOY_STOPWORDS_IT":"@stdlib/datasets/savoy-stopwords-it","SAVOY_STOPWORDS_POR":"@stdlib/datasets/savoy-stopwords-por","SAVOY_STOPWORDS_SP":"@stdlib/datasets/savoy-stopwords-sp","SAVOY_STOPWORDS_SWE":"@stdlib/datasets/savoy-stopwords-swe","scalar2ndarray":"@stdlib/ndarray/from-scalar","sdot":"@stdlib/blas/sdot","SECONDS_IN_DAY":"@stdlib/constants/time/seconds-in-day","SECONDS_IN_HOUR":"@stdlib/constants/time/seconds-in-hour","SECONDS_IN_MINUTE":"@stdlib/constants/time/seconds-in-minute","SECONDS_IN_WEEK":"@stdlib/constants/time/seconds-in-week","secondsInMonth":"@stdlib/time/seconds-in-month","secondsInYear":"@stdlib/time/seconds-in-year","setConfigurableReadOnly":"@stdlib/utils/define-configurable-read-only-property","setConfigurableReadOnlyAccessor":"@stdlib/utils/define-configurable-read-only-accessor","setConfigurableReadWriteAccessor":"@stdlib/utils/define-configurable-read-write-accessor","setConfigurableWriteOnlyAccessor":"@stdlib/utils/define-configurable-write-only-accessor","setMemoizedConfigurableReadOnly":"@stdlib/utils/define-memoized-configurable-read-only-property","setMemoizedReadOnly":"@stdlib/utils/define-memoized-read-only-property","setNonEnumerableProperty":"@stdlib/utils/define-nonenumerable-property","setNonEnumerableReadOnly":"@stdlib/utils/define-nonenumerable-read-only-property","setNonEnumerableReadOnlyAccessor":"@stdlib/utils/define-nonenumerable-read-only-accessor","setNonEnumerableReadWriteAccessor":"@stdlib/utils/define-nonenumerable-read-write-accessor","setNonEnumerableWriteOnlyAccessor":"@stdlib/utils/define-nonenumerable-write-only-accessor","setReadOnly":"@stdlib/utils/define-read-only-property","setReadOnlyAccessor":"@stdlib/utils/define-read-only-accessor","setReadWriteAccessor":"@stdlib/utils/define-read-write-accessor","setWriteOnlyAccessor":"@stdlib/utils/define-write-only-accessor","SharedArrayBuffer":"@stdlib/array/shared-buffer","shift":"@stdlib/utils/shift","shuffle":"@stdlib/random/shuffle","sizeOf":"@stdlib/utils/size-of","snakecase":"@stdlib/string/snakecase","some":"@stdlib/utils/some","someBy":"@stdlib/utils/some-by","someByAsync":"@stdlib/utils/async/some-by","someByRight":"@stdlib/utils/some-by-right","someByRightAsync":"@stdlib/utils/async/some-by-right","SOTU":"@stdlib/datasets/sotu","SPACHE_REVISED":"@stdlib/datasets/spache-revised","SPAM_ASSASSIN":"@stdlib/datasets/spam-assassin","SparklineBase":"@stdlib/plot/sparklines/base/ctor","sparsearray2iterator":"@stdlib/array/to-sparse-iterator","sparsearray2iteratorRight":"@stdlib/array/to-sparse-iterator-right","splitStream":"@stdlib/streams/node/split","SQRT_EPS":"@stdlib/constants/float64/sqrt-eps","SQRT_HALF":"@stdlib/constants/float64/sqrt-half","SQRT_HALF_PI":"@stdlib/constants/float64/sqrt-half-pi","SQRT_PHI":"@stdlib/constants/float64/sqrt-phi","SQRT_PI":"@stdlib/constants/float64/sqrt-pi","SQRT_THREE":"@stdlib/constants/float64/sqrt-three","SQRT_TWO":"@stdlib/constants/float64/sqrt-two","SQRT_TWO_PI":"@stdlib/constants/float64/sqrt-two-pi","SSA_US_BIRTHS_2000_2014":"@stdlib/datasets/ssa-us-births-2000-2014","sswap":"@stdlib/blas/sswap","Stack":"@stdlib/utils/stack","standalone2pkg":"@stdlib/namespace/standalone2pkg","STANDARD_CARD_DECK":"@stdlib/datasets/standard-card-deck","startcase":"@stdlib/string/startcase","startsWith":"@stdlib/string/starts-with","STOPWORDS_EN":"@stdlib/datasets/stopwords-en","strided.abs":"@stdlib/math/strided/special/abs","strided.abs2":"@stdlib/math/strided/special/abs2","strided.abs2By":"@stdlib/math/strided/special/abs2-by","strided.absBy":"@stdlib/math/strided/special/abs-by","strided.add":"@stdlib/math/strided/ops/add","strided.cbrt":"@stdlib/math/strided/special/cbrt","strided.ceil":"@stdlib/math/strided/special/ceil","strided.deg2rad":"@stdlib/math/strided/special/deg2rad","strided.dispatch":"@stdlib/strided/dispatch","strided.floor":"@stdlib/math/strided/special/floor","strided.inv":"@stdlib/math/strided/special/inv","strided.mul":"@stdlib/math/strided/ops/mul","strided.ramp":"@stdlib/math/strided/special/ramp","strided.rsqrt":"@stdlib/math/strided/special/rsqrt","strided.sqrt":"@stdlib/math/strided/special/sqrt","strided.sub":"@stdlib/math/strided/ops/sub","strided.trunc":"@stdlib/math/strided/special/trunc","stridedarray2iterator":"@stdlib/array/to-strided-iterator","stridedArrayStream":"@stdlib/streams/node/from-strided-array","string2buffer":"@stdlib/buffer/from-string","sub2ind":"@stdlib/ndarray/sub2ind","substringAfter":"@stdlib/string/substring-after","substringAfterLast":"@stdlib/string/substring-after-last","substringBefore":"@stdlib/string/substring-before","substringBeforeLast":"@stdlib/string/substring-before-last","SUTHAHARAN_MULTI_HOP_SENSOR_NETWORK":"@stdlib/datasets/suthaharan-multi-hop-sensor-network","SUTHAHARAN_SINGLE_HOP_SENSOR_NETWORK":"@stdlib/datasets/suthaharan-single-hop-sensor-network","Symbol":"@stdlib/symbol/ctor","tabulate":"@stdlib/utils/tabulate","tabulateBy":"@stdlib/utils/tabulate-by","tabulateByAsync":"@stdlib/utils/async/tabulate-by","tic":"@stdlib/time/tic","timeit":"@stdlib/utils/timeit","tmpdir":"@stdlib/os/tmpdir","toc":"@stdlib/time/toc","tokenize":"@stdlib/nlp/tokenize","transformStream":"@stdlib/streams/node/transform","trim":"@stdlib/string/trim","truncate":"@stdlib/string/truncate","truncateMiddle":"@stdlib/string/truncate-middle","trycatch":"@stdlib/utils/try-catch","trycatchAsync":"@stdlib/utils/async/try-catch","tryFunction":"@stdlib/utils/try-function","tryRequire":"@stdlib/utils/try-require","trythen":"@stdlib/utils/try-then","trythenAsync":"@stdlib/utils/async/try-then","ttest":"@stdlib/stats/ttest","ttest2":"@stdlib/stats/ttest2","TWO_PI":"@stdlib/constants/float64/two-pi","typedarray":"@stdlib/array/typed","typedarray2json":"@stdlib/array/to-json","typedarrayCtors":"@stdlib/array/typed-ctors","typedarrayDataTypes":"@stdlib/array/typed-dtypes","typedarraypool":"@stdlib/array/pool","typemax":"@stdlib/utils/type-max","typemin":"@stdlib/utils/type-min","typeOf":"@stdlib/utils/type-of","UINT8_MAX":"@stdlib/constants/uint8/max","UINT8_NUM_BYTES":"@stdlib/constants/uint8/num-bytes","Uint8Array":"@stdlib/array/uint8","Uint8ClampedArray":"@stdlib/array/uint8c","UINT16_MAX":"@stdlib/constants/uint16/max","UINT16_NUM_BYTES":"@stdlib/constants/uint16/num-bytes","Uint16Array":"@stdlib/array/uint16","UINT32_MAX":"@stdlib/constants/uint32/max","UINT32_NUM_BYTES":"@stdlib/constants/uint32/num-bytes","Uint32Array":"@stdlib/array/uint32","umask":"@stdlib/process/umask","uncapitalize":"@stdlib/string/uncapitalize","uncapitalizeKeys":"@stdlib/utils/uncapitalize-keys","uncurry":"@stdlib/utils/uncurry","uncurryRight":"@stdlib/utils/uncurry-right","UNICODE_MAX":"@stdlib/constants/unicode/max","UNICODE_MAX_BMP":"@stdlib/constants/unicode/max-bmp","UnicodeColumnChartSparkline":"@stdlib/plot/sparklines/unicode/column","UnicodeLineChartSparkline":"@stdlib/plot/sparklines/unicode/line","UnicodeSparkline":"@stdlib/plot/sparklines/unicode","UnicodeTristateChartSparkline":"@stdlib/plot/sparklines/unicode/tristate","UnicodeUpDownChartSparkline":"@stdlib/plot/sparklines/unicode/up-down","UnicodeWinLossChartSparkline":"@stdlib/plot/sparklines/unicode/win-loss","unlink":"@stdlib/fs/unlink","unshift":"@stdlib/utils/unshift","until":"@stdlib/utils/until","untilAsync":"@stdlib/utils/async/until","untilEach":"@stdlib/utils/until-each","untilEachRight":"@stdlib/utils/until-each-right","unzip":"@stdlib/utils/unzip","uppercase":"@stdlib/string/uppercase","uppercaseKeys":"@stdlib/utils/uppercase-keys","US_STATES_ABBR":"@stdlib/datasets/us-states-abbr","US_STATES_CAPITALS":"@stdlib/datasets/us-states-capitals","US_STATES_CAPITALS_NAMES":"@stdlib/datasets/us-states-capitals-names","US_STATES_NAMES":"@stdlib/datasets/us-states-names","US_STATES_NAMES_CAPITALS":"@stdlib/datasets/us-states-names-capitals","utf16ToUTF8Array":"@stdlib/string/utf16-to-utf8-array","vartest":"@stdlib/stats/vartest","waterfall":"@stdlib/utils/async/series-waterfall","whileAsync":"@stdlib/utils/async/while","whileEach":"@stdlib/utils/while-each","whileEachRight":"@stdlib/utils/while-each-right","whilst":"@stdlib/utils/while","wilcoxon":"@stdlib/stats/wilcoxon","writableProperties":"@stdlib/utils/writable-properties","writablePropertiesIn":"@stdlib/utils/writable-properties-in","writablePropertyNames":"@stdlib/utils/writable-property-names","writablePropertyNamesIn":"@stdlib/utils/writable-property-names-in","writablePropertySymbols":"@stdlib/utils/writable-property-symbols","writablePropertySymbolsIn":"@stdlib/utils/writable-property-symbols-in","writeFile":"@stdlib/fs/write-file","zip":"@stdlib/utils/zip","ztest":"@stdlib/stats/ztest","ztest2":"@stdlib/stats/ztest2"}
},{}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the package name associated with a specified alias.
*
* @module @stdlib/namespace/alias2pkg
*
* @example
* var alias2pkg = require( '@stdlib/namespace/alias2pkg' );
*
* var v = alias2pkg( 'base.sin' );
* // returns '@stdlib/math/base/special/sin'
*/

// MODULES //

var alias2pkg = require( './main.js' );


// EXPORTS //

module.exports = alias2pkg;

},{"./main.js":37}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var format = require( '@stdlib/string/format' );
var ALIAS_TO_PKG = require( './../data/data.json' );


// MAIN //

/**
* Returns the package name associated with a specified alias.
*
* @param {string} alias - alias
* @throws {TypeError} must provide a string
* @returns {(string|null)} package name
*
* @example
* var v = alias2pkg( 'base.sin' );
* // returns '@stdlib/math/base/special/sin'
*/
function alias2pkg( alias ) {
	if ( !isString( alias ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', alias ) );
	}
	if ( hasOwnProp( ALIAS_TO_PKG, alias ) ) {
		return ALIAS_TO_PKG[ alias ];
	}
	return null;
}


// EXPORTS //

module.exports = alias2pkg;

},{"./../data/data.json":35,"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-string":19,"@stdlib/string/format":61}],38:[function(require,module,exports){
module.exports=["abs","acronym","AFINN_96","AFINN_111","afull","afullLike","alias2pkg","alias2related","alias2standalone","aliases","allocUnsafe","anova1","ANSCOMBES_QUARTET","any","anyBy","anyByAsync","anyByRight","anyByRightAsync","aones","aonesLike","APERY","append","ARCH","argumentFunction","ARGV","array","array2buffer","array2iterator","array2iteratorRight","ArrayBuffer","arraybuffer2buffer","arrayCtors","arrayDataType","arrayDataTypes","arrayMinDataType","arrayNextDataType","arrayPromotionRules","arraySafeCasts","arraySameKindCasts","arrayShape","arrayStream","arrayview2iterator","arrayview2iteratorRight","AsyncIteratorSymbol","azeros","azerosLike","bartlettTest","base.abs","base.abs2","base.abs2f","base.absdiff","base.absf","base.acos","base.acosh","base.acot","base.acoth","base.acovercos","base.acoversin","base.acsc","base.acsch","base.add","base.addf","base.ahavercos","base.ahaversin","base.asech","base.asin","base.asinh","base.atan","base.atan2","base.atanh","base.avercos","base.aversin","base.bernoulli","base.besselj0","base.besselj1","base.bessely0","base.bessely1","base.beta","base.betainc","base.betaincinv","base.betaln","base.binet","base.binomcoef","base.binomcoefln","base.boxcox","base.boxcox1p","base.boxcox1pinv","base.boxcoxinv","base.cabs","base.cabs2","base.cabs2f","base.cabsf","base.cadd","base.caddf","base.cbrt","base.cbrtf","base.cceil","base.cceilf","base.cceiln","base.ccis","base.cdiv","base.ceil","base.ceil2","base.ceil10","base.ceilb","base.ceilf","base.ceiln","base.ceilsd","base.cexp","base.cflipsign","base.cflipsignf","base.cfloor","base.cfloorn","base.cidentity","base.cidentityf","base.cinv","base.clamp","base.clampf","base.cmul","base.cmulf","base.cneg","base.continuedFraction","base.copysign","base.copysignf","base.cos","base.cosh","base.cosm1","base.cospi","base.cot","base.coth","base.covercos","base.coversin","base.cphase","base.cpolar","base.cround","base.croundn","base.csch","base.csignum","base.csub","base.csubf","base.deg2rad","base.deg2radf","base.digamma","base.diracDelta","base.dists.arcsine.Arcsine","base.dists.arcsine.cdf","base.dists.arcsine.entropy","base.dists.arcsine.kurtosis","base.dists.arcsine.logcdf","base.dists.arcsine.logpdf","base.dists.arcsine.mean","base.dists.arcsine.median","base.dists.arcsine.mode","base.dists.arcsine.pdf","base.dists.arcsine.quantile","base.dists.arcsine.skewness","base.dists.arcsine.stdev","base.dists.arcsine.variance","base.dists.bernoulli.Bernoulli","base.dists.bernoulli.cdf","base.dists.bernoulli.entropy","base.dists.bernoulli.kurtosis","base.dists.bernoulli.mean","base.dists.bernoulli.median","base.dists.bernoulli.mgf","base.dists.bernoulli.mode","base.dists.bernoulli.pmf","base.dists.bernoulli.quantile","base.dists.bernoulli.skewness","base.dists.bernoulli.stdev","base.dists.bernoulli.variance","base.dists.beta.Beta","base.dists.beta.cdf","base.dists.beta.entropy","base.dists.beta.kurtosis","base.dists.beta.logcdf","base.dists.beta.logpdf","base.dists.beta.mean","base.dists.beta.median","base.dists.beta.mgf","base.dists.beta.mode","base.dists.beta.pdf","base.dists.beta.quantile","base.dists.beta.skewness","base.dists.beta.stdev","base.dists.beta.variance","base.dists.betaprime.BetaPrime","base.dists.betaprime.cdf","base.dists.betaprime.kurtosis","base.dists.betaprime.logcdf","base.dists.betaprime.logpdf","base.dists.betaprime.mean","base.dists.betaprime.mode","base.dists.betaprime.pdf","base.dists.betaprime.quantile","base.dists.betaprime.skewness","base.dists.betaprime.stdev","base.dists.betaprime.variance","base.dists.binomial.Binomial","base.dists.binomial.cdf","base.dists.binomial.entropy","base.dists.binomial.kurtosis","base.dists.binomial.logpmf","base.dists.binomial.mean","base.dists.binomial.median","base.dists.binomial.mgf","base.dists.binomial.mode","base.dists.binomial.pmf","base.dists.binomial.quantile","base.dists.binomial.skewness","base.dists.binomial.stdev","base.dists.binomial.variance","base.dists.cauchy.Cauchy","base.dists.cauchy.cdf","base.dists.cauchy.entropy","base.dists.cauchy.logcdf","base.dists.cauchy.logpdf","base.dists.cauchy.median","base.dists.cauchy.mode","base.dists.cauchy.pdf","base.dists.cauchy.quantile","base.dists.chi.cdf","base.dists.chi.Chi","base.dists.chi.entropy","base.dists.chi.kurtosis","base.dists.chi.logpdf","base.dists.chi.mean","base.dists.chi.mode","base.dists.chi.pdf","base.dists.chi.quantile","base.dists.chi.skewness","base.dists.chi.stdev","base.dists.chi.variance","base.dists.chisquare.cdf","base.dists.chisquare.ChiSquare","base.dists.chisquare.entropy","base.dists.chisquare.kurtosis","base.dists.chisquare.logpdf","base.dists.chisquare.mean","base.dists.chisquare.median","base.dists.chisquare.mgf","base.dists.chisquare.mode","base.dists.chisquare.pdf","base.dists.chisquare.quantile","base.dists.chisquare.skewness","base.dists.chisquare.stdev","base.dists.chisquare.variance","base.dists.cosine.cdf","base.dists.cosine.Cosine","base.dists.cosine.kurtosis","base.dists.cosine.logcdf","base.dists.cosine.logpdf","base.dists.cosine.mean","base.dists.cosine.median","base.dists.cosine.mgf","base.dists.cosine.mode","base.dists.cosine.pdf","base.dists.cosine.quantile","base.dists.cosine.skewness","base.dists.cosine.stdev","base.dists.cosine.variance","base.dists.degenerate.cdf","base.dists.degenerate.Degenerate","base.dists.degenerate.entropy","base.dists.degenerate.logcdf","base.dists.degenerate.logpdf","base.dists.degenerate.logpmf","base.dists.degenerate.mean","base.dists.degenerate.median","base.dists.degenerate.mgf","base.dists.degenerate.mode","base.dists.degenerate.pdf","base.dists.degenerate.pmf","base.dists.degenerate.quantile","base.dists.degenerate.stdev","base.dists.degenerate.variance","base.dists.discreteUniform.cdf","base.dists.discreteUniform.DiscreteUniform","base.dists.discreteUniform.kurtosis","base.dists.discreteUniform.logcdf","base.dists.discreteUniform.logpmf","base.dists.discreteUniform.mean","base.dists.discreteUniform.median","base.dists.discreteUniform.mgf","base.dists.discreteUniform.pmf","base.dists.discreteUniform.quantile","base.dists.discreteUniform.skewness","base.dists.discreteUniform.stdev","base.dists.discreteUniform.variance","base.dists.erlang.cdf","base.dists.erlang.entropy","base.dists.erlang.Erlang","base.dists.erlang.kurtosis","base.dists.erlang.logpdf","base.dists.erlang.mean","base.dists.erlang.mgf","base.dists.erlang.mode","base.dists.erlang.pdf","base.dists.erlang.quantile","base.dists.erlang.skewness","base.dists.erlang.stdev","base.dists.erlang.variance","base.dists.exponential.cdf","base.dists.exponential.entropy","base.dists.exponential.Exponential","base.dists.exponential.kurtosis","base.dists.exponential.logcdf","base.dists.exponential.logpdf","base.dists.exponential.mean","base.dists.exponential.median","base.dists.exponential.mgf","base.dists.exponential.mode","base.dists.exponential.pdf","base.dists.exponential.quantile","base.dists.exponential.skewness","base.dists.exponential.stdev","base.dists.exponential.variance","base.dists.f.cdf","base.dists.f.entropy","base.dists.f.F","base.dists.f.kurtosis","base.dists.f.mean","base.dists.f.mode","base.dists.f.pdf","base.dists.f.quantile","base.dists.f.skewness","base.dists.f.stdev","base.dists.f.variance","base.dists.frechet.cdf","base.dists.frechet.entropy","base.dists.frechet.Frechet","base.dists.frechet.kurtosis","base.dists.frechet.logcdf","base.dists.frechet.logpdf","base.dists.frechet.mean","base.dists.frechet.median","base.dists.frechet.mode","base.dists.frechet.pdf","base.dists.frechet.quantile","base.dists.frechet.skewness","base.dists.frechet.stdev","base.dists.frechet.variance","base.dists.gamma.cdf","base.dists.gamma.entropy","base.dists.gamma.Gamma","base.dists.gamma.kurtosis","base.dists.gamma.logcdf","base.dists.gamma.logpdf","base.dists.gamma.mean","base.dists.gamma.mgf","base.dists.gamma.mode","base.dists.gamma.pdf","base.dists.gamma.quantile","base.dists.gamma.skewness","base.dists.gamma.stdev","base.dists.gamma.variance","base.dists.geometric.cdf","base.dists.geometric.entropy","base.dists.geometric.Geometric","base.dists.geometric.kurtosis","base.dists.geometric.logcdf","base.dists.geometric.logpmf","base.dists.geometric.mean","base.dists.geometric.median","base.dists.geometric.mgf","base.dists.geometric.mode","base.dists.geometric.pmf","base.dists.geometric.quantile","base.dists.geometric.skewness","base.dists.geometric.stdev","base.dists.geometric.variance","base.dists.gumbel.cdf","base.dists.gumbel.entropy","base.dists.gumbel.Gumbel","base.dists.gumbel.kurtosis","base.dists.gumbel.logcdf","base.dists.gumbel.logpdf","base.dists.gumbel.mean","base.dists.gumbel.median","base.dists.gumbel.mgf","base.dists.gumbel.mode","base.dists.gumbel.pdf","base.dists.gumbel.quantile","base.dists.gumbel.skewness","base.dists.gumbel.stdev","base.dists.gumbel.variance","base.dists.hypergeometric.cdf","base.dists.hypergeometric.Hypergeometric","base.dists.hypergeometric.kurtosis","base.dists.hypergeometric.logpmf","base.dists.hypergeometric.mean","base.dists.hypergeometric.mode","base.dists.hypergeometric.pmf","base.dists.hypergeometric.quantile","base.dists.hypergeometric.skewness","base.dists.hypergeometric.stdev","base.dists.hypergeometric.variance","base.dists.invgamma.cdf","base.dists.invgamma.entropy","base.dists.invgamma.InvGamma","base.dists.invgamma.kurtosis","base.dists.invgamma.logpdf","base.dists.invgamma.mean","base.dists.invgamma.mode","base.dists.invgamma.pdf","base.dists.invgamma.quantile","base.dists.invgamma.skewness","base.dists.invgamma.stdev","base.dists.invgamma.variance","base.dists.kumaraswamy.cdf","base.dists.kumaraswamy.Kumaraswamy","base.dists.kumaraswamy.kurtosis","base.dists.kumaraswamy.logcdf","base.dists.kumaraswamy.logpdf","base.dists.kumaraswamy.mean","base.dists.kumaraswamy.median","base.dists.kumaraswamy.mode","base.dists.kumaraswamy.pdf","base.dists.kumaraswamy.quantile","base.dists.kumaraswamy.skewness","base.dists.kumaraswamy.stdev","base.dists.kumaraswamy.variance","base.dists.laplace.cdf","base.dists.laplace.entropy","base.dists.laplace.kurtosis","base.dists.laplace.Laplace","base.dists.laplace.logcdf","base.dists.laplace.logpdf","base.dists.laplace.mean","base.dists.laplace.median","base.dists.laplace.mgf","base.dists.laplace.mode","base.dists.laplace.pdf","base.dists.laplace.quantile","base.dists.laplace.skewness","base.dists.laplace.stdev","base.dists.laplace.variance","base.dists.levy.cdf","base.dists.levy.entropy","base.dists.levy.Levy","base.dists.levy.logcdf","base.dists.levy.logpdf","base.dists.levy.mean","base.dists.levy.median","base.dists.levy.mode","base.dists.levy.pdf","base.dists.levy.quantile","base.dists.levy.stdev","base.dists.levy.variance","base.dists.logistic.cdf","base.dists.logistic.entropy","base.dists.logistic.kurtosis","base.dists.logistic.logcdf","base.dists.logistic.Logistic","base.dists.logistic.logpdf","base.dists.logistic.mean","base.dists.logistic.median","base.dists.logistic.mgf","base.dists.logistic.mode","base.dists.logistic.pdf","base.dists.logistic.quantile","base.dists.logistic.skewness","base.dists.logistic.stdev","base.dists.logistic.variance","base.dists.lognormal.cdf","base.dists.lognormal.entropy","base.dists.lognormal.kurtosis","base.dists.lognormal.LogNormal","base.dists.lognormal.logpdf","base.dists.lognormal.mean","base.dists.lognormal.median","base.dists.lognormal.mode","base.dists.lognormal.pdf","base.dists.lognormal.quantile","base.dists.lognormal.skewness","base.dists.lognormal.stdev","base.dists.lognormal.variance","base.dists.negativeBinomial.cdf","base.dists.negativeBinomial.kurtosis","base.dists.negativeBinomial.logpmf","base.dists.negativeBinomial.mean","base.dists.negativeBinomial.mgf","base.dists.negativeBinomial.mode","base.dists.negativeBinomial.NegativeBinomial","base.dists.negativeBinomial.pmf","base.dists.negativeBinomial.quantile","base.dists.negativeBinomial.skewness","base.dists.negativeBinomial.stdev","base.dists.negativeBinomial.variance","base.dists.normal.cdf","base.dists.normal.entropy","base.dists.normal.kurtosis","base.dists.normal.logpdf","base.dists.normal.mean","base.dists.normal.median","base.dists.normal.mgf","base.dists.normal.mode","base.dists.normal.Normal","base.dists.normal.pdf","base.dists.normal.quantile","base.dists.normal.skewness","base.dists.normal.stdev","base.dists.normal.variance","base.dists.pareto1.cdf","base.dists.pareto1.entropy","base.dists.pareto1.kurtosis","base.dists.pareto1.logcdf","base.dists.pareto1.logpdf","base.dists.pareto1.mean","base.dists.pareto1.median","base.dists.pareto1.mode","base.dists.pareto1.Pareto1","base.dists.pareto1.pdf","base.dists.pareto1.quantile","base.dists.pareto1.skewness","base.dists.pareto1.stdev","base.dists.pareto1.variance","base.dists.poisson.cdf","base.dists.poisson.entropy","base.dists.poisson.kurtosis","base.dists.poisson.logpmf","base.dists.poisson.mean","base.dists.poisson.median","base.dists.poisson.mgf","base.dists.poisson.mode","base.dists.poisson.pmf","base.dists.poisson.Poisson","base.dists.poisson.quantile","base.dists.poisson.skewness","base.dists.poisson.stdev","base.dists.poisson.variance","base.dists.rayleigh.cdf","base.dists.rayleigh.entropy","base.dists.rayleigh.kurtosis","base.dists.rayleigh.logcdf","base.dists.rayleigh.logpdf","base.dists.rayleigh.mean","base.dists.rayleigh.median","base.dists.rayleigh.mgf","base.dists.rayleigh.mode","base.dists.rayleigh.pdf","base.dists.rayleigh.quantile","base.dists.rayleigh.Rayleigh","base.dists.rayleigh.skewness","base.dists.rayleigh.stdev","base.dists.rayleigh.variance","base.dists.signrank.cdf","base.dists.signrank.pdf","base.dists.signrank.quantile","base.dists.t.cdf","base.dists.t.entropy","base.dists.t.kurtosis","base.dists.t.mean","base.dists.t.median","base.dists.t.mode","base.dists.t.pdf","base.dists.t.quantile","base.dists.t.skewness","base.dists.t.stdev","base.dists.t.T","base.dists.t.variance","base.dists.triangular.cdf","base.dists.triangular.entropy","base.dists.triangular.kurtosis","base.dists.triangular.logcdf","base.dists.triangular.logpdf","base.dists.triangular.mean","base.dists.triangular.median","base.dists.triangular.mgf","base.dists.triangular.mode","base.dists.triangular.pdf","base.dists.triangular.quantile","base.dists.triangular.skewness","base.dists.triangular.stdev","base.dists.triangular.Triangular","base.dists.triangular.variance","base.dists.uniform.cdf","base.dists.uniform.entropy","base.dists.uniform.kurtosis","base.dists.uniform.logcdf","base.dists.uniform.logpdf","base.dists.uniform.mean","base.dists.uniform.median","base.dists.uniform.mgf","base.dists.uniform.pdf","base.dists.uniform.quantile","base.dists.uniform.skewness","base.dists.uniform.stdev","base.dists.uniform.Uniform","base.dists.uniform.variance","base.dists.weibull.cdf","base.dists.weibull.entropy","base.dists.weibull.kurtosis","base.dists.weibull.logcdf","base.dists.weibull.logpdf","base.dists.weibull.mean","base.dists.weibull.median","base.dists.weibull.mgf","base.dists.weibull.mode","base.dists.weibull.pdf","base.dists.weibull.quantile","base.dists.weibull.skewness","base.dists.weibull.stdev","base.dists.weibull.variance","base.dists.weibull.Weibull","base.ellipe","base.ellipk","base.epsdiff","base.erf","base.erfc","base.erfcinv","base.erfinv","base.eta","base.evalpoly","base.evalrational","base.exp","base.exp2","base.exp10","base.expit","base.expm1","base.expm1rel","base.exponent","base.exponentf","base.factorial","base.factorialln","base.fallingFactorial","base.fibonacci","base.fibonacciIndex","base.fibpoly","base.flipsign","base.flipsignf","base.float32ToInt32","base.float32ToUint32","base.float64ToFloat32","base.float64ToInt32","base.float64ToInt64Bytes","base.float64ToUint32","base.floor","base.floor2","base.floor10","base.floorb","base.floorf","base.floorn","base.floorsd","base.fresnel","base.fresnelc","base.fresnels","base.frexp","base.fromBinaryString","base.fromBinaryStringf","base.fromBinaryStringUint8","base.fromBinaryStringUint16","base.fromBinaryStringUint32","base.fromInt64Bytes","base.fromWordf","base.fromWords","base.gamma","base.gamma1pm1","base.gammaDeltaRatio","base.gammainc","base.gammaincinv","base.gammaLanczosSum","base.gammaLanczosSumExpGScaled","base.gammaln","base.gcd","base.getHighWord","base.getLowWord","base.hacovercos","base.hacoversin","base.havercos","base.haversin","base.heaviside","base.hermitepoly","base.hypot","base.hypotf","base.identity","base.identityf","base.imul","base.imuldw","base.int32ToUint32","base.inv","base.invf","base.isComposite","base.isCoprime","base.isEven","base.isEvenInt32","base.isFinite","base.isFinitef","base.isInfinite","base.isInfinitef","base.isInteger","base.isnan","base.isnanf","base.isNegativeInteger","base.isNegativeZero","base.isNegativeZerof","base.isNonNegativeInteger","base.isNonPositiveInteger","base.isOdd","base.isOddInt32","base.isPositiveInteger","base.isPositiveZero","base.isPositiveZerof","base.isPow2Uint32","base.isPrime","base.isProbability","base.isSafeInteger","base.kernelBetainc","base.kernelBetaincinv","base.kernelCos","base.kernelSin","base.kernelTan","base.kroneckerDelta","base.kroneckerDeltaf","base.labs","base.lcm","base.ldexp","base.ln","base.log","base.log1mexp","base.log1p","base.log1pexp","base.log2","base.log10","base.logaddexp","base.logit","base.lucas","base.lucaspoly","base.max","base.maxabs","base.min","base.minabs","base.minmax","base.minmaxabs","base.modf","base.mul","base.mulf","base.ndarray","base.ndarrayUnary","base.ndzeros","base.ndzerosLike","base.negafibonacci","base.negalucas","base.nonfibonacci","base.normalize","base.normalizef","base.normhermitepoly","base.pdiff","base.pdifff","base.polygamma","base.pow","base.powm1","base.rad2deg","base.ramp","base.rampf","base.random.arcsine","base.random.bernoulli","base.random.beta","base.random.betaprime","base.random.binomial","base.random.boxMuller","base.random.cauchy","base.random.chi","base.random.chisquare","base.random.cosine","base.random.discreteUniform","base.random.erlang","base.random.exponential","base.random.f","base.random.frechet","base.random.gamma","base.random.geometric","base.random.gumbel","base.random.hypergeometric","base.random.improvedZiggurat","base.random.invgamma","base.random.kumaraswamy","base.random.laplace","base.random.levy","base.random.logistic","base.random.lognormal","base.random.minstd","base.random.minstdShuffle","base.random.mt19937","base.random.negativeBinomial","base.random.normal","base.random.pareto1","base.random.poisson","base.random.randi","base.random.randn","base.random.randu","base.random.rayleigh","base.random.t","base.random.triangular","base.random.uniform","base.random.weibull","base.reldiff","base.rempio2","base.risingFactorial","base.rotl32","base.rotr32","base.round","base.round2","base.round10","base.roundb","base.roundn","base.roundsd","base.rsqrt","base.rsqrtf","base.scalar2ndarray","base.setHighWord","base.setLowWord","base.sici","base.signbit","base.signbitf","base.significandf","base.signum","base.signumf","base.sin","base.sinc","base.sincos","base.sincospi","base.sinh","base.sinpi","base.spence","base.sqrt","base.sqrt1pm1","base.sqrtf","base.strided.binary","base.strided.ccopy","base.strided.cmap","base.strided.cswap","base.strided.cumax","base.strided.cumaxabs","base.strided.cumin","base.strided.cuminabs","base.strided.dabs","base.strided.dabs2","base.strided.dapx","base.strided.dapxsum","base.strided.dapxsumkbn","base.strided.dapxsumkbn2","base.strided.dapxsumors","base.strided.dapxsumpw","base.strided.dasum","base.strided.dasumpw","base.strided.daxpy","base.strided.dcbrt","base.strided.dceil","base.strided.dcopy","base.strided.dcumax","base.strided.dcumaxabs","base.strided.dcumin","base.strided.dcuminabs","base.strided.dcusum","base.strided.dcusumkbn","base.strided.dcusumkbn2","base.strided.dcusumors","base.strided.dcusumpw","base.strided.ddeg2rad","base.strided.ddot","base.strided.dfill","base.strided.dfloor","base.strided.dinv","base.strided.dmap","base.strided.dmap2","base.strided.dmax","base.strided.dmaxabs","base.strided.dmaxabssorted","base.strided.dmaxsorted","base.strided.dmean","base.strided.dmeankbn","base.strided.dmeankbn2","base.strided.dmeanli","base.strided.dmeanlipw","base.strided.dmeanors","base.strided.dmeanpn","base.strided.dmeanpw","base.strided.dmeanstdev","base.strided.dmeanstdevpn","base.strided.dmeanvar","base.strided.dmeanvarpn","base.strided.dmeanwd","base.strided.dmediansorted","base.strided.dmidrange","base.strided.dmin","base.strided.dminabs","base.strided.dminsorted","base.strided.dmskabs","base.strided.dmskabs2","base.strided.dmskcbrt","base.strided.dmskceil","base.strided.dmskdeg2rad","base.strided.dmskfloor","base.strided.dmskinv","base.strided.dmskmap","base.strided.dmskmap2","base.strided.dmskmax","base.strided.dmskmin","base.strided.dmskramp","base.strided.dmskrange","base.strided.dmskrsqrt","base.strided.dmsksqrt","base.strided.dmsktrunc","base.strided.dnanasum","base.strided.dnanasumors","base.strided.dnanmax","base.strided.dnanmaxabs","base.strided.dnanmean","base.strided.dnanmeanors","base.strided.dnanmeanpn","base.strided.dnanmeanpw","base.strided.dnanmeanwd","base.strided.dnanmin","base.strided.dnanminabs","base.strided.dnanmskmax","base.strided.dnanmskmin","base.strided.dnanmskrange","base.strided.dnannsum","base.strided.dnannsumkbn","base.strided.dnannsumkbn2","base.strided.dnannsumors","base.strided.dnannsumpw","base.strided.dnanrange","base.strided.dnanstdev","base.strided.dnanstdevch","base.strided.dnanstdevpn","base.strided.dnanstdevtk","base.strided.dnanstdevwd","base.strided.dnanstdevyc","base.strided.dnansum","base.strided.dnansumkbn","base.strided.dnansumkbn2","base.strided.dnansumors","base.strided.dnansumpw","base.strided.dnanvariance","base.strided.dnanvariancech","base.strided.dnanvariancepn","base.strided.dnanvariancetk","base.strided.dnanvariancewd","base.strided.dnanvarianceyc","base.strided.dnrm2","base.strided.dramp","base.strided.drange","base.strided.drev","base.strided.drsqrt","base.strided.dsapxsum","base.strided.dsapxsumpw","base.strided.dscal","base.strided.dsdot","base.strided.dsem","base.strided.dsemch","base.strided.dsempn","base.strided.dsemtk","base.strided.dsemwd","base.strided.dsemyc","base.strided.dsmean","base.strided.dsmeanors","base.strided.dsmeanpn","base.strided.dsmeanpw","base.strided.dsmeanwd","base.strided.dsnanmean","base.strided.dsnanmeanors","base.strided.dsnanmeanpn","base.strided.dsnanmeanwd","base.strided.dsnannsumors","base.strided.dsnansum","base.strided.dsnansumors","base.strided.dsnansumpw","base.strided.dsort2hp","base.strided.dsort2ins","base.strided.dsort2sh","base.strided.dsorthp","base.strided.dsortins","base.strided.dsortsh","base.strided.dsqrt","base.strided.dssum","base.strided.dssumors","base.strided.dssumpw","base.strided.dstdev","base.strided.dstdevch","base.strided.dstdevpn","base.strided.dstdevtk","base.strided.dstdevwd","base.strided.dstdevyc","base.strided.dsum","base.strided.dsumkbn","base.strided.dsumkbn2","base.strided.dsumors","base.strided.dsumpw","base.strided.dsvariance","base.strided.dsvariancepn","base.strided.dswap","base.strided.dtrunc","base.strided.dvariance","base.strided.dvariancech","base.strided.dvariancepn","base.strided.dvariancetk","base.strided.dvariancewd","base.strided.dvarianceyc","base.strided.dvarm","base.strided.dvarmpn","base.strided.dvarmtk","base.strided.gapx","base.strided.gapxsum","base.strided.gapxsumkbn","base.strided.gapxsumkbn2","base.strided.gapxsumors","base.strided.gapxsumpw","base.strided.gasum","base.strided.gasumpw","base.strided.gaxpy","base.strided.gcopy","base.strided.gcusum","base.strided.gcusumkbn","base.strided.gcusumkbn2","base.strided.gcusumors","base.strided.gcusumpw","base.strided.gdot","base.strided.gfill","base.strided.gfillBy","base.strided.gnannsumkbn","base.strided.gnansum","base.strided.gnansumkbn","base.strided.gnansumkbn2","base.strided.gnansumors","base.strided.gnansumpw","base.strided.gnrm2","base.strided.grev","base.strided.gscal","base.strided.gsort2hp","base.strided.gsort2ins","base.strided.gsort2sh","base.strided.gsorthp","base.strided.gsortins","base.strided.gsortsh","base.strided.gsum","base.strided.gsumkbn","base.strided.gsumkbn2","base.strided.gsumors","base.strided.gsumpw","base.strided.gswap","base.strided.mapBy","base.strided.mapBy2","base.strided.max","base.strided.maxabs","base.strided.maxBy","base.strided.maxsorted","base.strided.mean","base.strided.meankbn","base.strided.meankbn2","base.strided.meanors","base.strided.meanpn","base.strided.meanpw","base.strided.meanwd","base.strided.mediansorted","base.strided.min","base.strided.minabs","base.strided.minBy","base.strided.minsorted","base.strided.mskmax","base.strided.mskmin","base.strided.mskrange","base.strided.mskunary","base.strided.nanmax","base.strided.nanmaxabs","base.strided.nanmaxBy","base.strided.nanmean","base.strided.nanmeanors","base.strided.nanmeanpn","base.strided.nanmeanwd","base.strided.nanmin","base.strided.nanminabs","base.strided.nanminBy","base.strided.nanmskmax","base.strided.nanmskmin","base.strided.nanmskrange","base.strided.nanrange","base.strided.nanrangeBy","base.strided.nanstdev","base.strided.nanstdevch","base.strided.nanstdevpn","base.strided.nanstdevtk","base.strided.nanstdevwd","base.strided.nanstdevyc","base.strided.nanvariance","base.strided.nanvariancech","base.strided.nanvariancepn","base.strided.nanvariancetk","base.strided.nanvariancewd","base.strided.nanvarianceyc","base.strided.nullary","base.strided.quaternary","base.strided.quinary","base.strided.range","base.strided.rangeBy","base.strided.sabs","base.strided.sabs2","base.strided.sapx","base.strided.sapxsum","base.strided.sapxsumkbn","base.strided.sapxsumkbn2","base.strided.sapxsumors","base.strided.sapxsumpw","base.strided.sasum","base.strided.sasumpw","base.strided.saxpy","base.strided.scbrt","base.strided.sceil","base.strided.scopy","base.strided.scumax","base.strided.scumaxabs","base.strided.scumin","base.strided.scuminabs","base.strided.scusum","base.strided.scusumkbn","base.strided.scusumkbn2","base.strided.scusumors","base.strided.scusumpw","base.strided.sdeg2rad","base.strided.sdot","base.strided.sdsapxsum","base.strided.sdsapxsumpw","base.strided.sdsdot","base.strided.sdsmean","base.strided.sdsmeanors","base.strided.sdsnanmean","base.strided.sdsnanmeanors","base.strided.sdsnansum","base.strided.sdsnansumpw","base.strided.sdssum","base.strided.sdssumpw","base.strided.sfill","base.strided.sfloor","base.strided.sinv","base.strided.smap","base.strided.smap2","base.strided.smax","base.strided.smaxabs","base.strided.smaxabssorted","base.strided.smaxsorted","base.strided.smean","base.strided.smeankbn","base.strided.smeankbn2","base.strided.smeanli","base.strided.smeanlipw","base.strided.smeanors","base.strided.smeanpn","base.strided.smeanpw","base.strided.smeanwd","base.strided.smediansorted","base.strided.smidrange","base.strided.smin","base.strided.sminabs","base.strided.sminsorted","base.strided.smskabs","base.strided.smskabs2","base.strided.smskcbrt","base.strided.smskceil","base.strided.smskdeg2rad","base.strided.smskfloor","base.strided.smskinv","base.strided.smskmap","base.strided.smskmap2","base.strided.smskmax","base.strided.smskmin","base.strided.smskramp","base.strided.smskrange","base.strided.smskrsqrt","base.strided.smsksqrt","base.strided.smsktrunc","base.strided.snanmax","base.strided.snanmaxabs","base.strided.snanmean","base.strided.snanmeanors","base.strided.snanmeanpn","base.strided.snanmeanwd","base.strided.snanmin","base.strided.snanminabs","base.strided.snanmskmax","base.strided.snanmskmin","base.strided.snanmskrange","base.strided.snanrange","base.strided.snanstdev","base.strided.snanstdevch","base.strided.snanstdevpn","base.strided.snanstdevtk","base.strided.snanstdevwd","base.strided.snanstdevyc","base.strided.snansum","base.strided.snansumkbn","base.strided.snansumkbn2","base.strided.snansumors","base.strided.snansumpw","base.strided.snanvariance","base.strided.snanvariancech","base.strided.snanvariancepn","base.strided.snanvariancetk","base.strided.snanvariancewd","base.strided.snanvarianceyc","base.strided.snrm2","base.strided.sramp","base.strided.srange","base.strided.srev","base.strided.srsqrt","base.strided.sscal","base.strided.ssort2hp","base.strided.ssort2ins","base.strided.ssort2sh","base.strided.ssorthp","base.strided.ssortins","base.strided.ssortsh","base.strided.ssqrt","base.strided.sstdev","base.strided.sstdevch","base.strided.sstdevpn","base.strided.sstdevtk","base.strided.sstdevwd","base.strided.sstdevyc","base.strided.ssum","base.strided.ssumkbn","base.strided.ssumkbn2","base.strided.ssumors","base.strided.ssumpw","base.strided.sswap","base.strided.stdev","base.strided.stdevch","base.strided.stdevpn","base.strided.stdevtk","base.strided.stdevwd","base.strided.stdevyc","base.strided.strunc","base.strided.svariance","base.strided.svariancech","base.strided.svariancepn","base.strided.svariancetk","base.strided.svariancewd","base.strided.svarianceyc","base.strided.ternary","base.strided.unary","base.strided.variance","base.strided.variancech","base.strided.variancepn","base.strided.variancetk","base.strided.variancewd","base.strided.varianceyc","base.strided.zmap","base.sub","base.subf","base.sumSeries","base.tan","base.tanh","base.toBinaryString","base.toBinaryStringf","base.toBinaryStringUint8","base.toBinaryStringUint16","base.toBinaryStringUint32","base.toWordf","base.toWords","base.transpose","base.tribonacci","base.trigamma","base.trunc","base.trunc2","base.trunc10","base.truncb","base.truncf","base.truncn","base.truncsd","base.umul","base.umuldw","base.uint32ToInt32","base.vercos","base.versin","base.wrap","base.xlog1py","base.xlogy","base.zeta","bench","BERNDT_CPS_WAGES_1985","bifurcate","bifurcateBy","bifurcateByAsync","bifurcateIn","bifurcateOwn","BigInt","binomialTest","Buffer","buffer2json","BYTE_ORDER","camelcase","capitalize","capitalizeKeys","CATALAN","CBRT_EPS","CDC_NCHS_US_BIRTHS_1969_1988","CDC_NCHS_US_BIRTHS_1994_2003","CDC_NCHS_US_INFANT_MORTALITY_BW_1915_2013","chdir","chi2gof","chi2test","circarray2iterator","circularArrayStream","CircularBuffer","close","CMUDICT","codePointAt","commonKeys","commonKeysIn","complex","Complex64","COMPLEX64_NUM_BYTES","Complex64Array","Complex128","COMPLEX128_NUM_BYTES","Complex128Array","complexarray","complexarrayCtors","complexarrayDataTypes","complexCtors","complexDataType","complexDataTypes","complexPromotionRules","compose","composeAsync","configdir","conj","conjf","constantcase","constantFunction","constantStream","constructorName","contains","convertArray","convertArraySame","convertPath","copy","copyBuffer","countBy","countByAsync","curry","curryRight","cwd","DALE_CHALL_NEW","datasets","DataView","datespace","dayOfQuarter","dayOfYear","daysInMonth","daysInYear","ddot","debugSinkStream","debugStream","deepEqual","deepGet","deepHasOwnProp","deepHasProp","deepPluck","deepSet","defineMemoizedProperty","defineProperties","defineProperty","dirname","DoublyLinkedList","doUntil","doUntilAsync","doUntilEach","doUntilEachRight","doWhile","doWhileAsync","doWhileEach","doWhileEachRight","dswap","E","EMOJI","EMOJI_CODE_PICTO","EMOJI_PICTO_CODE","emptyStream","endsWith","enumerableProperties","enumerablePropertiesIn","enumerablePropertySymbols","enumerablePropertySymbolsIn","ENV","EPS","error2json","EULERGAMMA","every","everyBy","everyByAsync","everyByRight","everyByRightAsync","evil","EXEC_PATH","exists","expandContractions","extname","fastmath.abs","fastmath.acosh","fastmath.ampbm","fastmath.asinh","fastmath.atanh","fastmath.hypot","fastmath.log2Uint32","fastmath.max","fastmath.min","fastmath.powint","fastmath.sqrtUint32","FEMALE_FIRST_NAMES_EN","FIFO","filledarray","filledarrayBy","filterArguments","find","FIVETHIRTYEIGHT_FFQ","flattenArray","flattenObject","flignerTest","FLOAT_WORD_ORDER","FLOAT16_CBRT_EPS","FLOAT16_EPS","FLOAT16_EXPONENT_BIAS","FLOAT16_MAX","FLOAT16_MAX_SAFE_INTEGER","FLOAT16_MIN_SAFE_INTEGER","FLOAT16_NINF","FLOAT16_NUM_BYTES","FLOAT16_PINF","FLOAT16_PRECISION","FLOAT16_SMALLEST_NORMAL","FLOAT16_SMALLEST_SUBNORMAL","FLOAT16_SQRT_EPS","FLOAT32_CBRT_EPS","FLOAT32_EPS","FLOAT32_EXPONENT_BIAS","FLOAT32_MAX","FLOAT32_MAX_SAFE_INTEGER","FLOAT32_MIN_SAFE_INTEGER","FLOAT32_NINF","FLOAT32_NUM_BYTES","FLOAT32_PINF","FLOAT32_PRECISION","FLOAT32_SMALLEST_NORMAL","FLOAT32_SMALLEST_SUBNORMAL","FLOAT32_SQRT_EPS","Float32Array","FLOAT64_EXPONENT_BIAS","FLOAT64_HIGH_WORD_EXPONENT_MASK","FLOAT64_HIGH_WORD_SIGNIFICAND_MASK","FLOAT64_MAX","FLOAT64_MAX_BASE2_EXPONENT","FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL","FLOAT64_MAX_BASE10_EXPONENT","FLOAT64_MAX_BASE10_EXPONENT_SUBNORMAL","FLOAT64_MAX_LN","FLOAT64_MAX_SAFE_FIBONACCI","FLOAT64_MAX_SAFE_INTEGER","FLOAT64_MAX_SAFE_LUCAS","FLOAT64_MAX_SAFE_NTH_FIBONACCI","FLOAT64_MAX_SAFE_NTH_LUCAS","FLOAT64_MIN_BASE2_EXPONENT","FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL","FLOAT64_MIN_BASE10_EXPONENT","FLOAT64_MIN_BASE10_EXPONENT_SUBNORMAL","FLOAT64_MIN_LN","FLOAT64_MIN_SAFE_INTEGER","FLOAT64_NUM_BYTES","FLOAT64_PRECISION","FLOAT64_SMALLEST_NORMAL","FLOAT64_SMALLEST_SUBNORMAL","Float64Array","forEach","forEachAsync","forEachRight","forEachRightAsync","forIn","forOwn","FOURTH_PI","FOURTH_ROOT_EPS","FRB_SF_WAGE_RIGIDITY","fromCodePoint","functionName","functionSequence","functionSequenceAsync","GAMMA_LANCZOS_G","gdot","getegid","geteuid","getgid","getGlobal","getPrototypeOf","getuid","GLAISHER","group","groupBy","groupByAsync","groupIn","groupOwn","gswap","HALF_LN2","HALF_PI","HARRISON_BOSTON_HOUSE_PRICES","HARRISON_BOSTON_HOUSE_PRICES_CORRECTED","hasArrayBufferSupport","hasAsyncAwaitSupport","hasAsyncIteratorSymbolSupport","hasBigInt64ArraySupport","hasBigIntSupport","hasBigUint64ArraySupport","hasClassSupport","hasDataViewSupport","hasDefinePropertiesSupport","hasDefinePropertySupport","hasFloat32ArraySupport","hasFloat64ArraySupport","hasFunctionNameSupport","hasGeneratorSupport","hasGlobalThisSupport","hasInt8ArraySupport","hasInt16ArraySupport","hasInt32ArraySupport","hasIteratorSymbolSupport","hasMapSupport","hasNodeBufferSupport","hasOwnProp","hasProp","hasProxySupport","hasSetSupport","hasSharedArrayBufferSupport","hasSymbolSupport","hasToStringTagSupport","hasUint8ArraySupport","hasUint8ClampedArraySupport","hasUint16ArraySupport","hasUint32ArraySupport","hasUTF16SurrogatePairAt","hasWeakMapSupport","hasWeakSetSupport","hasWebAssemblySupport","HERNDON_VENUS_SEMIDIAMETERS","homedir","HOURS_IN_DAY","HOURS_IN_WEEK","hoursInMonth","hoursInYear","httpServer","identity","ifelse","ifelseAsync","ifthen","ifthenAsync","imag","imagf","IMG_ACANTHUS_MOLLIS","IMG_AIRPLANE_FROM_ABOVE","IMG_ALLIUM_OREOPHILUM","IMG_BLACK_CANYON","IMG_DUST_BOWL_HOME","IMG_FRENCH_ALPINE_LANDSCAPE","IMG_LOCOMOTION_HOUSE_CAT","IMG_LOCOMOTION_NUDE_MALE","IMG_MARCH_PASTORAL","IMG_NAGASAKI_BOATS","incrapcorr","incrBinaryClassification","incrcount","incrcovariance","incrcovmat","incrcv","increwmean","increwstdev","increwvariance","incrgmean","incrgrubbs","incrhmean","incrkmeans","incrkurtosis","incrmaape","incrmae","incrmapcorr","incrmape","incrmax","incrmaxabs","incrmcovariance","incrmcv","incrmda","incrme","incrmean","incrmeanabs","incrmeanabs2","incrmeanstdev","incrmeanvar","incrmgmean","incrmgrubbs","incrmhmean","incrmidrange","incrmin","incrminabs","incrminmax","incrminmaxabs","incrmmaape","incrmmae","incrmmape","incrmmax","incrmmaxabs","incrmmda","incrmme","incrmmean","incrmmeanabs","incrmmeanabs2","incrmmeanstdev","incrmmeanvar","incrmmidrange","incrmmin","incrmminabs","incrmminmax","incrmminmaxabs","incrmmpe","incrmmse","incrmpcorr","incrmpcorr2","incrmpcorrdist","incrmpe","incrmprod","incrmrange","incrmrmse","incrmrss","incrmse","incrmstdev","incrmsum","incrmsumabs","incrmsumabs2","incrmsummary","incrmsumprod","incrmvariance","incrmvmr","incrnancount","incrnansum","incrnansumabs","incrnansumabs2","incrpcorr","incrpcorr2","incrpcorrdist","incrpcorrdistmat","incrpcorrmat","incrprod","incrrange","incrrmse","incrrss","incrSGDRegression","incrskewness","incrspace","incrstdev","incrsum","incrsumabs","incrsumabs2","incrsummary","incrsumprod","incrvariance","incrvmr","incrwmean","ind2sub","indexOf","inherit","inheritedEnumerableProperties","inheritedEnumerablePropertySymbols","inheritedKeys","inheritedNonEnumerableProperties","inheritedNonEnumerablePropertyNames","inheritedNonEnumerablePropertySymbols","inheritedProperties","inheritedPropertyDescriptor","inheritedPropertyDescriptors","inheritedPropertyNames","inheritedPropertySymbols","inheritedWritableProperties","inheritedWritablePropertyNames","inheritedWritablePropertySymbols","inmap","inmapAsync","inmapRight","inmapRightAsync","inspectSinkStream","inspectStream","instanceOf","INT8_MAX","INT8_MIN","INT8_NUM_BYTES","Int8Array","INT16_MAX","INT16_MIN","INT16_NUM_BYTES","Int16Array","INT32_MAX","INT32_MIN","INT32_NUM_BYTES","Int32Array","IS_BIG_ENDIAN","IS_BROWSER","IS_DARWIN","IS_ELECTRON","IS_ELECTRON_MAIN","IS_ELECTRON_RENDERER","IS_LITTLE_ENDIAN","IS_NODE","IS_WEB_WORKER","IS_WINDOWS","isAbsolutePath","isAccessorProperty","isAccessorPropertyIn","isAlphagram","isAlphaNumeric","isAnagram","isArguments","isArray","isArrayArray","isArrayBuffer","isArrayBufferView","isArrayLength","isArrayLike","isArrayLikeObject","isASCII","isBetween","isBetweenArray","isBigInt","isBigInt64Array","isBigUint64Array","isBinaryString","isBoolean","isBooleanArray","isBoxedPrimitive","isBuffer","isCapitalized","isCentrosymmetricMatrix","isCircular","isCircularArray","isCircularPlainObject","isClass","isCollection","isComplex","isComplex64","isComplex64Array","isComplex128","isComplex128Array","isComplexLike","isComplexTypedArray","isComplexTypedArrayLike","isComposite","isConfigurableProperty","isConfigurablePropertyIn","isCubeNumber","isDataProperty","isDataPropertyIn","isDataView","isDateObject","isDigitString","isEmailAddress","isEmptyArray","isEmptyArrayLikeObject","isEmptyCollection","isEmptyObject","isEmptyString","isEnumerableProperty","isEnumerablePropertyIn","isError","isEvalError","isEven","isFalsy","isFalsyArray","isFinite","isFiniteArray","isFloat32Array","isFloat32MatrixLike","isFloat32ndarrayLike","isFloat32VectorLike","isFloat64Array","isFloat64MatrixLike","isFloat64ndarrayLike","isFloat64VectorLike","isFunction","isFunctionArray","isGeneratorObject","isGeneratorObjectLike","isgzipBuffer","isHexString","isInfinite","isInheritedProperty","isInt8Array","isInt16Array","isInt32Array","isInteger","isIntegerArray","isIterableLike","isIteratorLike","isJSON","isLeapYear","isLocalhost","isLowercase","isMatrixLike","isMethod","isMethodIn","isNamedTypedTupleLike","isnan","isNaNArray","isNativeFunction","isndarrayLike","isNegativeInteger","isNegativeIntegerArray","isNegativeNumber","isNegativeNumberArray","isNegativeZero","isNodeBuiltin","isNodeDuplexStreamLike","isNodeReadableStreamLike","isNodeREPL","isNodeStreamLike","isNodeTransformStreamLike","isNodeWritableStreamLike","isNonConfigurableProperty","isNonConfigurablePropertyIn","isNonEnumerableProperty","isNonEnumerablePropertyIn","isNonNegativeInteger","isNonNegativeIntegerArray","isNonNegativeNumber","isNonNegativeNumberArray","isNonPositiveInteger","isNonPositiveIntegerArray","isNonPositiveNumber","isNonPositiveNumberArray","isNonSymmetricMatrix","isNull","isNullArray","isNumber","isNumberArray","isNumericArray","isObject","isObjectArray","isObjectLike","isOdd","isoWeeksInYear","isPersymmetricMatrix","isPlainObject","isPlainObjectArray","isPositiveInteger","isPositiveIntegerArray","isPositiveNumber","isPositiveNumberArray","isPositiveZero","isPrime","isPrimitive","isPrimitiveArray","isPRNGLike","isProbability","isProbabilityArray","isPropertyKey","isPrototypeOf","isRangeError","isReadableProperty","isReadablePropertyIn","isReadOnlyProperty","isReadOnlyPropertyIn","isReadWriteProperty","isReadWritePropertyIn","isReferenceError","isRegExp","isRegExpString","isRelativePath","isSafeInteger","isSafeIntegerArray","isSameNativeClass","isSameType","isSameValue","isSameValueZero","isSharedArrayBuffer","isSkewCentrosymmetricMatrix","isSkewPersymmetricMatrix","isSkewSymmetricMatrix","isSquareMatrix","isSquareNumber","isSquareTriangularNumber","isStrictEqual","isString","isStringArray","isSymbol","isSymbolArray","isSymmetricMatrix","isSyntaxError","isTriangularNumber","isTruthy","isTruthyArray","isTypedArray","isTypedArrayLength","isTypedArrayLike","isTypeError","isUint8Array","isUint8ClampedArray","isUint16Array","isUint32Array","isUNCPath","isUndefined","isUndefinedOrNull","isUnityProbabilityArray","isUppercase","isURI","isURIError","isVectorLike","isWhitespace","isWritableProperty","isWritablePropertyIn","isWriteOnlyProperty","isWriteOnlyPropertyIn","iterAbs","iterAbs2","iterAcos","iterAcosh","iterAcot","iterAcoth","iterAcovercos","iterAcoversin","iterAdd","iterAdvance","iterAhavercos","iterAhaversin","iterAny","iterAnyBy","iterAsin","iterAsinh","iterAtan","iterAtan2","iterAtanh","iterator2array","iterator2arrayview","iterator2arrayviewRight","iteratorStream","IteratorSymbol","iterAvercos","iterAversin","iterawgn","iterawln","iterawun","iterBartlettHannPulse","iterBartlettPulse","iterBesselj0","iterBesselj1","iterBessely0","iterBessely1","iterBeta","iterBetaln","iterBinet","iterCbrt","iterCeil","iterCeil2","iterCeil10","iterCompositesSeq","iterConcat","iterConstant","iterContinuedFraction","iterContinuedFractionSeq","iterCos","iterCosh","iterCosineWave","iterCosm1","iterCospi","iterCounter","iterCovercos","iterCoversin","iterCubesSeq","itercugmean","itercuhmean","itercumax","itercumaxabs","itercumean","itercumeanabs","itercumeanabs2","itercumidrange","itercumin","itercuminabs","itercuprod","itercurange","itercusum","itercusumabs","itercusumabs2","iterDatespace","iterDedupe","iterDedupeBy","iterDeg2rad","iterDigamma","iterDiracComb","iterDiracDelta","iterDivide","iterEllipe","iterEllipk","iterEmpty","iterErf","iterErfc","iterErfcinv","iterErfinv","iterEta","iterEvenIntegersSeq","iterEvery","iterEveryBy","iterExp","iterExp2","iterExp10","iterExpit","iterExpm1","iterExpm1rel","iterFactorial","iterFactorialln","iterFactorialsSeq","iterFibonacciSeq","iterFifthPowersSeq","iterFill","iterFilter","iterFilterMap","iterFirst","iterFlatTopPulse","iterFloor","iterFloor2","iterFloor10","iterFlow","iterForEach","iterFourthPowersSeq","iterFresnelc","iterFresnels","iterGamma","iterGamma1pm1","iterGammaln","iterHacovercos","iterHacoversin","iterHannPulse","iterHavercos","iterHaversin","iterHead","iterIncrspace","iterIntegersSeq","iterIntersection","iterIntersectionByHash","iterInv","iterLanczosPulse","iterLast","iterLength","iterLinspace","iterLn","iterLog","iterLog1mexp","iterLog1p","iterLog1pexp","iterLog2","iterLog10","iterLogit","iterLogspace","iterLucasSeq","iterMap","iterMapN","itermax","itermaxabs","itermean","itermeanabs","itermeanabs2","itermidrange","itermin","iterminabs","itermmax","itermmaxabs","itermmean","itermmeanabs","itermmeanabs2","itermmidrange","itermmin","itermminabs","iterMod","itermprod","itermrange","itermsum","itermsumabs","itermsumabs2","iterMultiply","iterNegaFibonacciSeq","iterNegaLucasSeq","iterNegativeEvenIntegersSeq","iterNegativeIntegersSeq","iterNegativeOddIntegersSeq","iterNone","iterNoneBy","iterNonFibonacciSeq","iterNonNegativeEvenIntegersSeq","iterNonNegativeIntegersSeq","iterNonPositiveEvenIntegersSeq","iterNonPositiveIntegersSeq","iterNonSquaresSeq","iterNth","iterOddIntegersSeq","iterPeriodicSinc","iterPipeline","iterPop","iterPositiveEvenIntegersSeq","iterPositiveIntegersSeq","iterPositiveOddIntegersSeq","iterPow","iterPrimesSeq","iterprod","iterPulse","iterPush","iterRad2deg","iterRamp","iterrange","iterReject","iterReplicate","iterReplicateBy","iterRound","iterRound2","iterRound10","iterRsqrt","iterSawtoothWave","iterShift","iterSignum","iterSin","iterSinc","iterSineWave","iterSinh","iterSinpi","iterSlice","iterSome","iterSomeBy","iterSpence","iterSqrt","iterSqrt1pm1","iterSquaredTriangularSeq","iterSquaresSeq","iterSquareWave","iterstdev","iterStep","iterStrided","iterStridedBy","iterSubtract","itersum","itersumabs","itersumabs2","iterTan","iterTanh","iterThunk","iterTriangleWave","iterTriangularSeq","iterTrigamma","iterTrunc","iterTrunc2","iterTrunc10","iterUnion","iterUnique","iterUniqueBy","iterUniqueByHash","iterUnitspace","iterUnshift","itervariance","iterVercos","iterVersin","iterZeta","joinStream","kde2d","kebabcase","keyBy","keyByRight","keysIn","kruskalTest","kstest","lda","leveneTest","LinkedList","linspace","LIU_NEGATIVE_OPINION_WORDS_EN","LIU_POSITIVE_OPINION_WORDS_EN","LN_HALF","LN_PI","LN_SQRT_TWO_PI","LN_TWO_PI","LN2","LN10","LOG2E","LOG10E","logspace","lowercase","lowercaseKeys","lowess","lpad","ltrim","MALE_FIRST_NAMES_EN","map","map2","map2d","map2Right","map3d","map4d","map5d","mapArguments","mapFun","mapFunAsync","mapKeys","mapKeysAsync","mapReduce","mapReduceRight","mapRight","mapValues","mapValuesAsync","maskArguments","MAX_ARRAY_LENGTH","MAX_TYPED_ARRAY_LENGTH","memoize","merge","MILLISECONDS_IN_DAY","MILLISECONDS_IN_HOUR","MILLISECONDS_IN_MINUTE","MILLISECONDS_IN_SECOND","MILLISECONDS_IN_WEEK","MINARD_NAPOLEONS_MARCH","MINUTES_IN_DAY","MINUTES_IN_HOUR","MINUTES_IN_WEEK","minutesInMonth","minutesInYear","MOBY_DICK","MONTH_NAMES_EN","MONTHS_IN_YEAR","moveProperty","namedtypedtuple","naryFunction","nativeClass","ndarray","ndarrayCastingModes","ndarrayDataTypes","ndarrayDispatch","ndarrayIndexModes","ndarrayMinDataType","ndarrayNextDataType","ndarrayOrders","ndarrayPromotionRules","ndarraySafeCasts","ndarraySameKindCasts","ndzeros","ndzerosLike","nextGraphemeClusterBreak","nextTick","NIGHTINGALES_ROSE","NINF","NODE_VERSION","none","noneBy","noneByAsync","noneByRight","noneByRightAsync","nonEnumerableProperties","nonEnumerablePropertiesIn","nonEnumerablePropertyNames","nonEnumerablePropertyNamesIn","nonEnumerablePropertySymbols","nonEnumerablePropertySymbolsIn","nonIndexKeys","noop","now","NUM_CPUS","Number","numGraphemeClusters","objectEntries","objectEntriesIn","objectFromEntries","objectInverse","objectInverseBy","objectKeys","objectValues","objectValuesIn","omit","omitBy","open","openURL","PACE_BOSTON_HOUSE_PRICES","pad","padjust","papply","papplyRight","parallel","parseJSON","pascalcase","PATH_DELIMITER","PATH_DELIMITER_POSIX","PATH_DELIMITER_WIN32","PATH_SEP","PATH_SEP_POSIX","PATH_SEP_WIN32","pcorrtest","percentEncode","PHI","PI","PI_SQUARED","pick","pickArguments","pickBy","PINF","pkg2alias","pkg2related","pkg2standalone","PLATFORM","plot","Plot","pluck","pop","porterStemmer","prepend","PRIMES_100K","properties","propertiesIn","propertyDescriptor","propertyDescriptorIn","propertyDescriptors","propertyDescriptorsIn","propertyNames","propertyNamesIn","propertySymbols","propertySymbolsIn","Proxy","push","quarterOfYear","random.iterators.arcsine","random.iterators.bernoulli","random.iterators.beta","random.iterators.betaprime","random.iterators.binomial","random.iterators.boxMuller","random.iterators.cauchy","random.iterators.chi","random.iterators.chisquare","random.iterators.cosine","random.iterators.discreteUniform","random.iterators.erlang","random.iterators.exponential","random.iterators.f","random.iterators.frechet","random.iterators.gamma","random.iterators.geometric","random.iterators.gumbel","random.iterators.hypergeometric","random.iterators.improvedZiggurat","random.iterators.invgamma","random.iterators.kumaraswamy","random.iterators.laplace","random.iterators.levy","random.iterators.logistic","random.iterators.lognormal","random.iterators.minstd","random.iterators.minstdShuffle","random.iterators.mt19937","random.iterators.negativeBinomial","random.iterators.normal","random.iterators.pareto1","random.iterators.poisson","random.iterators.randi","random.iterators.randn","random.iterators.randu","random.iterators.rayleigh","random.iterators.t","random.iterators.triangular","random.iterators.uniform","random.iterators.weibull","random.streams.arcsine","random.streams.bernoulli","random.streams.beta","random.streams.betaprime","random.streams.binomial","random.streams.boxMuller","random.streams.cauchy","random.streams.chi","random.streams.chisquare","random.streams.cosine","random.streams.discreteUniform","random.streams.erlang","random.streams.exponential","random.streams.f","random.streams.frechet","random.streams.gamma","random.streams.geometric","random.streams.gumbel","random.streams.hypergeometric","random.streams.improvedZiggurat","random.streams.invgamma","random.streams.kumaraswamy","random.streams.laplace","random.streams.levy","random.streams.logistic","random.streams.lognormal","random.streams.minstd","random.streams.minstdShuffle","random.streams.mt19937","random.streams.negativeBinomial","random.streams.normal","random.streams.pareto1","random.streams.poisson","random.streams.randi","random.streams.randn","random.streams.randu","random.streams.rayleigh","random.streams.t","random.streams.triangular","random.streams.uniform","random.streams.weibull","ranks","readDir","readFile","readFileList","readJSON","readWASM","real","realarray","realarrayCtors","realarrayDataTypes","realf","realmax","realmin","reBasename","reBasenamePosix","reBasenameWindows","reColorHexadecimal","reDecimalNumber","reDirname","reDirnamePosix","reDirnameWindows","reduce","reduce2d","reduceAsync","reduceRight","reduceRightAsync","reEOL","reExtendedLengthPath","reExtname","reExtnamePosix","reExtnameWindows","reFilename","reFilenamePosix","reFilenameWindows","reFromString","reFunctionName","reim","reimf","rejectArguments","removeFirst","removeLast","removePunctuation","removeUTF8BOM","removeWords","rename","reNativeFunction","reorderArguments","repeat","replace","reRegExp","rescape","resolveParentPath","resolveParentPathBy","reUncPath","reUtf16SurrogatePair","reUtf16UnpairedSurrogate","reverseArguments","reverseString","reviveBasePRNG","reviveBuffer","reviveComplex","reviveComplex64","reviveComplex128","reviveError","reviveTypedArray","reWhitespace","rpad","rtrim","safeintmax","safeintmin","sample","SAVOY_STOPWORDS_FIN","SAVOY_STOPWORDS_FR","SAVOY_STOPWORDS_GER","SAVOY_STOPWORDS_IT","SAVOY_STOPWORDS_POR","SAVOY_STOPWORDS_SP","SAVOY_STOPWORDS_SWE","scalar2ndarray","sdot","SECONDS_IN_DAY","SECONDS_IN_HOUR","SECONDS_IN_MINUTE","SECONDS_IN_WEEK","secondsInMonth","secondsInYear","setConfigurableReadOnly","setConfigurableReadOnlyAccessor","setConfigurableReadWriteAccessor","setConfigurableWriteOnlyAccessor","setMemoizedConfigurableReadOnly","setMemoizedReadOnly","setNonEnumerableProperty","setNonEnumerableReadOnly","setNonEnumerableReadOnlyAccessor","setNonEnumerableReadWriteAccessor","setNonEnumerableWriteOnlyAccessor","setReadOnly","setReadOnlyAccessor","setReadWriteAccessor","setWriteOnlyAccessor","SharedArrayBuffer","shift","shuffle","sizeOf","snakecase","some","someBy","someByAsync","someByRight","someByRightAsync","SOTU","SPACHE_REVISED","SPAM_ASSASSIN","SparklineBase","sparsearray2iterator","sparsearray2iteratorRight","splitStream","SQRT_EPS","SQRT_HALF","SQRT_HALF_PI","SQRT_PHI","SQRT_PI","SQRT_THREE","SQRT_TWO","SQRT_TWO_PI","SSA_US_BIRTHS_2000_2014","sswap","Stack","standalone2pkg","STANDARD_CARD_DECK","startcase","startsWith","STOPWORDS_EN","strided.abs","strided.abs2","strided.abs2By","strided.absBy","strided.add","strided.cbrt","strided.ceil","strided.deg2rad","strided.dispatch","strided.floor","strided.inv","strided.mul","strided.ramp","strided.rsqrt","strided.sqrt","strided.sub","strided.trunc","stridedarray2iterator","stridedArrayStream","string2buffer","sub2ind","substringAfter","substringAfterLast","substringBefore","substringBeforeLast","SUTHAHARAN_MULTI_HOP_SENSOR_NETWORK","SUTHAHARAN_SINGLE_HOP_SENSOR_NETWORK","Symbol","tabulate","tabulateBy","tabulateByAsync","tic","timeit","tmpdir","toc","tokenize","transformStream","trim","truncate","truncateMiddle","trycatch","trycatchAsync","tryFunction","tryRequire","trythen","trythenAsync","ttest","ttest2","TWO_PI","typedarray","typedarray2json","typedarrayCtors","typedarrayDataTypes","typedarraypool","typemax","typemin","typeOf","UINT8_MAX","UINT8_NUM_BYTES","Uint8Array","Uint8ClampedArray","UINT16_MAX","UINT16_NUM_BYTES","Uint16Array","UINT32_MAX","UINT32_NUM_BYTES","Uint32Array","umask","uncapitalize","uncapitalizeKeys","uncurry","uncurryRight","UNICODE_MAX","UNICODE_MAX_BMP","UnicodeColumnChartSparkline","UnicodeLineChartSparkline","UnicodeSparkline","UnicodeTristateChartSparkline","UnicodeUpDownChartSparkline","UnicodeWinLossChartSparkline","unlink","unshift","until","untilAsync","untilEach","untilEachRight","unzip","uppercase","uppercaseKeys","US_STATES_ABBR","US_STATES_CAPITALS","US_STATES_CAPITALS_NAMES","US_STATES_NAMES","US_STATES_NAMES_CAPITALS","utf16ToUTF8Array","vartest","waterfall","whileAsync","whileEach","whileEachRight","whilst","wilcoxon","writableProperties","writablePropertiesIn","writablePropertyNames","writablePropertyNamesIn","writablePropertySymbols","writablePropertySymbolsIn","writeFile","zip","ztest","ztest2"]
},{}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Standard library aliases.
*
* @module @stdlib/namespace/aliases
*
* @example
* var aliases = require( '@stdlib/namespace/aliases' );
*
* var list = aliases();
* // returns [...]
*
* @example
* var aliases = require( '@stdlib/namespace/aliases' );
*
* var list = aliases( '@stdlib/math/base/special' );
* // returns [...]
*/

// MODULES //

var aliases = require( './main.js' );


// EXPORTS //

module.exports = aliases;

},{"./main.js":40}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var alias2pkg = require( '@stdlib/namespace/alias2pkg' );
var startsWith = require( '@stdlib/string/starts-with' );
var format = require( '@stdlib/string/format' );
var ALIASES = require( './../data/data.json' );


// VARIABLES //

var PKGS; // lazily defined


// FUNCTIONS //

/**
* Resolves package names for all aliases.
*
* @private
* @returns {ArrayArray} pairs of package names and corresponding aliases
*/
function resolvePackages() {
	var i;
	if ( PKGS ) {
		return PKGS;
	}
	PKGS = [];
	for ( i = 0; i < ALIASES.length; i++ ) {
		PKGS.push( [ alias2pkg( ALIASES[i] ), ALIASES[i] ] );
	}
	return PKGS;
}


// MAIN //

/**
* Returns a list of standard library aliases.
*
* @param {string} [namespace] - namespace filter
* @throws {TypeError} must provide a string
* @returns {Array} list of aliases
*
* @example
* var list = aliases();
* // returns [...]
*
* @example
* var list = aliases( '@stdlib/math/base/special' );
* // returns [...]
*/
function aliases( namespace ) {
	var pkgs;
	var out;
	var i;
	var p;
	if ( arguments.length === 0 ) {
		return ALIASES.slice();
	}
	if ( !isString( namespace ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', namespace ) );
	}
	pkgs = resolvePackages();
	out = [];
	for ( i = 0; i < pkgs.length; i++ ) {
		p = pkgs[ i ];
		if ( p[ 0 ] && startsWith( p[ 0 ], namespace ) ) {
			out.push( p[1] );
		}
	}
	return out;
}


// EXPORTS //

module.exports = aliases;

},{"./../data/data.json":38,"@stdlib/assert/is-string":19,"@stdlib/namespace/alias2pkg":36,"@stdlib/string/format":61,"@stdlib/string/starts-with":64}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number/ctor
*
* @example
* var Number = require( '@stdlib/number/ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":42}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Platform on which the current process is running.
*
* @constant
* @type {string}
*/
var PLATFORM = '';


// EXPORTS //

module.exports = PLATFORM;

},{}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = null;

},{}],45:[function(require,module,exports){
module.exports=[["abs","abs( x:ndarray|ArrayLikeObject|number[, options:Object] )"],["abs.assign","abs.assign( x:ndarray|ArrayLikeObject, y:ndarray|ArrayLikeObject )"],["acronym","acronym( str:string[, options:Object] )"],["AFINN_96","AFINN_96()"],["AFINN_111","AFINN_111()"],["afull","afull( length:integer, value:any[, dtype:string] )"],["afullLike","afullLike( x:TypedArray|Array[, dtype:string] )"],["alias2pkg","alias2pkg( alias:string )"],["alias2related","alias2related( alias:string )"],["alias2standalone","alias2standalone( alias:string )"],["aliases","aliases( [namespace:string] )"],["allocUnsafe","allocUnsafe( size:integer )"],["anova1","anova1( x:Array<number>, factor:Array[, options:Object] )"],["ANSCOMBES_QUARTET","ANSCOMBES_QUARTET()"],["any","any( collection:Array|TypedArray|Object )"],["anyBy","anyBy( collection:Array|TypedArray|Object, predicate:Function[, thisArg:any ] )"],["anyByAsync","anyByAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["anyByAsync.factory","anyByAsync.factory( [options:Object,] predicate:Function )"],["anyByRight","anyByRight( collection:Array|TypedArray|Object, predicate:Function[, thisArg:any ] )"],["anyByRightAsync","anyByRightAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["anyByRightAsync.factory","anyByRightAsync.factory( [options:Object,] predicate:Function )"],["aones","aones( length:integer[, dtype:string] )"],["aonesLike","aonesLike( x:TypedArray|Array[, dtype:string] )"],["APERY","APERY"],["append","append( collection1:Array|TypedArray|Object, collection2:Array|TypedArray|Object )"],["ARCH","ARCH"],["argumentFunction","argumentFunction( idx:integer )"],["ARGV","ARGV"],["array","array( [buffer:Array|TypedArray|Buffer|ndarray,] [options:Object] )"],["array2buffer","array2buffer( arr:Array<integer> )"],["array2iterator","array2iterator( src:ArrayLikeObject[, mapFcn:Function[, thisArg:any]] )"],["array2iteratorRight","array2iteratorRight( src:ArrayLikeObject[, mapFcn:Function[, thisArg:any]] )"],["ArrayBuffer","ArrayBuffer( size:integer )"],["ArrayBuffer.length","ArrayBuffer.length"],["ArrayBuffer.isView","ArrayBuffer.isView( arr:any )"],["ArrayBuffer.prototype.byteLength","ArrayBuffer.prototype.byteLength"],["ArrayBuffer.prototype.slice","ArrayBuffer.prototype.slice( [start:integer[, end:integer]] )"],["arraybuffer2buffer","arraybuffer2buffer( buf:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["arrayCtors","arrayCtors( dtype:string )"],["arrayDataType","arrayDataType( array:any )"],["arrayDataTypes","arrayDataTypes()"],["arrayMinDataType","arrayMinDataType( value:any )"],["arrayNextDataType","arrayNextDataType( [dtype:string] )"],["arrayPromotionRules","arrayPromotionRules( [dtype1:string, dtype2:string] )"],["arraySafeCasts","arraySafeCasts( [dtype:string] )"],["arraySameKindCasts","arraySameKindCasts( [dtype:string] )"],["arrayShape","arrayShape( arr:ArrayLikeObject )"],["arrayStream","arrayStream( src:ArrayLikeObject[, options:Object] )"],["arrayStream.factory","arrayStream.factory( [options:Object] )"],["arrayStream.objectMode","arrayStream.objectMode( src:ArrayLikeObject[, options:Object] )"],["arrayview2iterator","arrayview2iterator( src:ArrayLikeObject[, begin:integer[, end:integer]][, mapFcn:Function[, thisArg:any]] )"],["arrayview2iteratorRight","arrayview2iteratorRight( src:ArrayLikeObject[, begin:integer[, end:integer]][, mapFcn:Function[, thisArg:any]] )"],["AsyncIteratorSymbol","AsyncIteratorSymbol"],["azeros","azeros( length:integer[, dtype:string] )"],["azerosLike","azerosLike( x:TypedArray|Array[, dtype:string] )"],["bartlettTest","bartlettTest( ...x:Array[, options:Object] )"],["base.abs","base.abs( x:number )"],["base.abs2","base.abs2( x:number )"],["base.abs2f","base.abs2f( x:number )"],["base.absdiff","base.absdiff( x:number, y:number )"],["base.absf","base.absf( x:number )"],["base.acos","base.acos( x:number )"],["base.acosh","base.acosh( x:number )"],["base.acot","base.acot( x:number )"],["base.acoth","base.acoth( x:number )"],["base.acovercos","base.acovercos( x:number )"],["base.acoversin","base.acoversin( x:number )"],["base.acsc","base.acsc( x:number )"],["base.acsch","base.acsch( x:number )"],["base.add","base.add( x:number, y:number )"],["base.addf","base.addf( x:number, y:number )"],["base.ahavercos","base.ahavercos( x:number )"],["base.ahaversin","base.ahaversin( x:number )"],["base.asech","base.asech( x:number )"],["base.asin","base.asin( x:number )"],["base.asinh","base.asinh( x:number )"],["base.atan","base.atan( x:number )"],["base.atan2","base.atan2( y:number, x:number )"],["base.atanh","base.atanh( x:number )"],["base.avercos","base.avercos( x:number )"],["base.aversin","base.aversin( x:number )"],["base.bernoulli","base.bernoulli( n:integer )"],["base.besselj0","base.besselj0( x:number )"],["base.besselj1","base.besselj1( x:number )"],["base.bessely0","base.bessely0( x:number )"],["base.bessely1","base.bessely1( x:number )"],["base.beta","base.beta( x:number, y:number )"],["base.betainc","base.betainc( x:number, a:number, b:number[, regularized:boolean[, upper:boolean]] )"],["base.betaincinv","base.betaincinv( p:number, a:number, b:number[, upper:boolean] )"],["base.betaln","base.betaln( a:number, b:number )"],["base.binet","base.binet( x:number )"],["base.binomcoef","base.binomcoef( n:integer, k:integer )"],["base.binomcoefln","base.binomcoefln( n:integer, k:integer )"],["base.boxcox","base.boxcox( x:number, lambda:number )"],["base.boxcox1p","base.boxcox1p( x:number, lambda:number )"],["base.boxcox1pinv","base.boxcox1pinv( y:number, lambda:number )"],["base.boxcoxinv","base.boxcoxinv( y:number, lambda:number )"],["base.cabs","base.cabs( z:Complex128 )"],["base.cabs2","base.cabs2( z:Complex128 )"],["base.cabs2f","base.cabs2f( z:Complex64 )"],["base.cabsf","base.cabsf( z:Complex64 )"],["base.cadd","base.cadd( z1:Complex128, z2:Complex128 )"],["base.caddf","base.caddf( z1:Complex64, z2:Complex64 )"],["base.cbrt","base.cbrt( x:number )"],["base.cbrtf","base.cbrtf( x:number )"],["base.cceil","base.cceil( z:Complex128 )"],["base.cceilf","base.cceilf( z:Complex64 )"],["base.cceiln","base.cceiln( [out:Array|TypedArray|Object,] re:number, im:number, n:integer )"],["base.ccis","base.ccis( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.cdiv","base.cdiv( [out:Array|TypedArray|Object,] re1:number, im1:number, re2:number, im2:number )"],["base.ceil","base.ceil( x:number )"],["base.ceil2","base.ceil2( x:number )"],["base.ceil10","base.ceil10( x:number )"],["base.ceilb","base.ceilb( x:number, n:integer, b:integer )"],["base.ceilf","base.ceilf( x:number )"],["base.ceiln","base.ceiln( x:number, n:integer )"],["base.ceilsd","base.ceilsd( x:number, n:integer[, b:integer] )"],["base.cexp","base.cexp( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.cflipsign","base.cflipsign( z:Complex128, y:number )"],["base.cflipsignf","base.cflipsignf( z:Complex64, y:number )"],["base.cfloor","base.cfloor( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.cfloorn","base.cfloorn( [out:Array|TypedArray|Object,] re:number, im:number, n:integer )"],["base.cidentity","base.cidentity( z:Complex128 )"],["base.cidentityf","base.cidentityf( z:Complex64 )"],["base.cinv","base.cinv( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.clamp","base.clamp( v:number, min:number, max:number )"],["base.clampf","base.clampf( v:number, min:number, max:number )"],["base.cmul","base.cmul( z1:Complex128, z2:Complex128 )"],["base.cmulf","base.cmulf( z1:Complex64, z2:Complex64 )"],["base.cneg","base.cneg( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.continuedFraction","base.continuedFraction( generator:Function[, options:Object] )"],["base.copysign","base.copysign( x:number, y:number )"],["base.copysignf","base.copysignf( x:number, y:number )"],["base.cos","base.cos( x:number )"],["base.cosh","base.cosh( x:number )"],["base.cosm1","base.cosm1( x:number )"],["base.cospi","base.cospi( x:number )"],["base.cot","base.cot( x:number )"],["base.coth","base.coth( x:number )"],["base.covercos","base.covercos( x:number )"],["base.coversin","base.coversin( x:number )"],["base.cphase","base.cphase( re:number, im:number )"],["base.cpolar","base.cpolar( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.cround","base.cround( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.croundn","base.croundn( [out:Array|TypedArray|Object,] re:number, im:number, n:integer )"],["base.csch","base.csch( x:number )"],["base.csignum","base.csignum( [out:Array|TypedArray|Object,] re:number, im:number )"],["base.csub","base.csub( z1:Complex128, z2:Complex128 )"],["base.csubf","base.csubf( z1:Complex64, z2:Complex64 )"],["base.deg2rad","base.deg2rad( x:number )"],["base.deg2radf","base.deg2radf( x:number )"],["base.digamma","base.digamma( x:number )"],["base.diracDelta","base.diracDelta( x:number )"],["base.dists.arcsine.Arcsine","base.dists.arcsine.Arcsine( [a:number, b:number] )"],["base.dists.arcsine.cdf","base.dists.arcsine.cdf( x:number, a:number, b:number )"],["base.dists.arcsine.cdf.factory","base.dists.arcsine.cdf.factory( a:number, b:number )"],["base.dists.arcsine.entropy","base.dists.arcsine.entropy( a:number, b:number )"],["base.dists.arcsine.kurtosis","base.dists.arcsine.kurtosis( a:number, b:number )"],["base.dists.arcsine.logcdf","base.dists.arcsine.logcdf( x:number, a:number, b:number )"],["base.dists.arcsine.logcdf.factory","base.dists.arcsine.logcdf.factory( a:number, b:number )"],["base.dists.arcsine.logpdf","base.dists.arcsine.logpdf( x:number, a:number, b:number )"],["base.dists.arcsine.logpdf.factory","base.dists.arcsine.logpdf.factory( a:number, b:number )"],["base.dists.arcsine.mean","base.dists.arcsine.mean( a:number, b:number )"],["base.dists.arcsine.median","base.dists.arcsine.median( a:number, b:number )"],["base.dists.arcsine.mode","base.dists.arcsine.mode( a:number, b:number )"],["base.dists.arcsine.pdf","base.dists.arcsine.pdf( x:number, a:number, b:number )"],["base.dists.arcsine.pdf.factory","base.dists.arcsine.pdf.factory( a:number, b:number )"],["base.dists.arcsine.quantile","base.dists.arcsine.quantile( p:number, a:number, b:number )"],["base.dists.arcsine.quantile.factory","base.dists.arcsine.quantile.factory( a:number, b:number )"],["base.dists.arcsine.skewness","base.dists.arcsine.skewness( a:number, b:number )"],["base.dists.arcsine.stdev","base.dists.arcsine.stdev( a:number, b:number )"],["base.dists.arcsine.variance","base.dists.arcsine.variance( a:number, b:number )"],["base.dists.bernoulli.Bernoulli","base.dists.bernoulli.Bernoulli( [p:number] )"],["base.dists.bernoulli.cdf","base.dists.bernoulli.cdf( x:number, p:number )"],["base.dists.bernoulli.cdf.factory","base.dists.bernoulli.cdf.factory( p:number )"],["base.dists.bernoulli.entropy","base.dists.bernoulli.entropy( p:number )"],["base.dists.bernoulli.kurtosis","base.dists.bernoulli.kurtosis( p:number )"],["base.dists.bernoulli.mean","base.dists.bernoulli.mean( p:number )"],["base.dists.bernoulli.median","base.dists.bernoulli.median( p:number )"],["base.dists.bernoulli.mgf","base.dists.bernoulli.mgf( t:number, p:number )"],["base.dists.bernoulli.mgf.factory","base.dists.bernoulli.mgf.factory( p:number )"],["base.dists.bernoulli.mode","base.dists.bernoulli.mode( p:number )"],["base.dists.bernoulli.pmf","base.dists.bernoulli.pmf( x:number, p:number )"],["base.dists.bernoulli.pmf.factory","base.dists.bernoulli.pmf.factory( p:number )"],["base.dists.bernoulli.quantile","base.dists.bernoulli.quantile( r:number, p:number )"],["base.dists.bernoulli.quantile.factory","base.dists.bernoulli.quantile.factory( p:number )"],["base.dists.bernoulli.skewness","base.dists.bernoulli.skewness( p:number )"],["base.dists.bernoulli.stdev","base.dists.bernoulli.stdev( p:number )"],["base.dists.bernoulli.variance","base.dists.bernoulli.variance( p:number )"],["base.dists.beta.Beta","base.dists.beta.Beta( [α:number, β:number] )"],["base.dists.beta.cdf","base.dists.beta.cdf( x:number, α:number, β:number )"],["base.dists.beta.cdf.factory","base.dists.beta.cdf.factory( α:number, β:number )"],["base.dists.beta.entropy","base.dists.beta.entropy( α:number, β:number )"],["base.dists.beta.kurtosis","base.dists.beta.kurtosis( α:number, β:number )"],["base.dists.beta.logcdf","base.dists.beta.logcdf( x:number, α:number, β:number )"],["base.dists.beta.logcdf.factory","base.dists.beta.logcdf.factory( α:number, β:number )"],["base.dists.beta.logpdf","base.dists.beta.logpdf( x:number, α:number, β:number )"],["base.dists.beta.logpdf.factory","base.dists.beta.logpdf.factory( α:number, β:number )"],["base.dists.beta.mean","base.dists.beta.mean( α:number, β:number )"],["base.dists.beta.median","base.dists.beta.median( α:number, β:number )"],["base.dists.beta.mgf","base.dists.beta.mgf( t:number, α:number, β:number )"],["base.dists.beta.mgf.factory","base.dists.beta.mgf.factory( α:number, β:number )"],["base.dists.beta.mode","base.dists.beta.mode( α:number, β:number )"],["base.dists.beta.pdf","base.dists.beta.pdf( x:number, α:number, β:number )"],["base.dists.beta.pdf.factory","base.dists.beta.pdf.factory( α:number, β:number )"],["base.dists.beta.quantile","base.dists.beta.quantile( p:number, α:number, β:number )"],["base.dists.beta.quantile.factory","base.dists.beta.quantile.factory( α:number, β:number )"],["base.dists.beta.skewness","base.dists.beta.skewness( α:number, β:number )"],["base.dists.beta.stdev","base.dists.beta.stdev( α:number, β:number )"],["base.dists.beta.variance","base.dists.beta.variance( α:number, β:number )"],["base.dists.betaprime.BetaPrime","base.dists.betaprime.BetaPrime( [α:number, β:number] )"],["base.dists.betaprime.cdf","base.dists.betaprime.cdf( x:number, α:number, β:number )"],["base.dists.betaprime.cdf.factory","base.dists.betaprime.cdf.factory( α:number, β:number )"],["base.dists.betaprime.kurtosis","base.dists.betaprime.kurtosis( α:number, β:number )"],["base.dists.betaprime.logcdf","base.dists.betaprime.logcdf( x:number, α:number, β:number )"],["base.dists.betaprime.logcdf.factory","base.dists.betaprime.logcdf.factory( α:number, β:number )"],["base.dists.betaprime.logpdf","base.dists.betaprime.logpdf( x:number, α:number, β:number )"],["base.dists.betaprime.logpdf.factory","base.dists.betaprime.logpdf.factory( α:number, β:number )"],["base.dists.betaprime.mean","base.dists.betaprime.mean( α:number, β:number )"],["base.dists.betaprime.mode","base.dists.betaprime.mode( α:number, β:number )"],["base.dists.betaprime.pdf","base.dists.betaprime.pdf( x:number, α:number, β:number )"],["base.dists.betaprime.pdf.factory","base.dists.betaprime.pdf.factory( α:number, β:number )"],["base.dists.betaprime.quantile","base.dists.betaprime.quantile( p:number, α:number, β:number )"],["base.dists.betaprime.quantile.factory","base.dists.betaprime.quantile.factory( α:number, β:number )"],["base.dists.betaprime.skewness","base.dists.betaprime.skewness( α:number, β:number )"],["base.dists.betaprime.stdev","base.dists.betaprime.stdev( α:number, β:number )"],["base.dists.betaprime.variance","base.dists.betaprime.variance( α:number, β:number )"],["base.dists.binomial.Binomial","base.dists.binomial.Binomial( [n:integer, p:number] )"],["base.dists.binomial.cdf","base.dists.binomial.cdf( x:number, n:integer, p:number )"],["base.dists.binomial.cdf.factory","base.dists.binomial.cdf.factory( n:integer, p:number )"],["base.dists.binomial.entropy","base.dists.binomial.entropy( n:integer, p:number )"],["base.dists.binomial.kurtosis","base.dists.binomial.kurtosis( n:integer, p:number )"],["base.dists.binomial.logpmf","base.dists.binomial.logpmf( x:number, n:integer, p:number )"],["base.dists.binomial.logpmf.factory","base.dists.binomial.logpmf.factory( n:integer, p:number )"],["base.dists.binomial.mean","base.dists.binomial.mean( n:integer, p:number )"],["base.dists.binomial.median","base.dists.binomial.median( n:integer, p:number )"],["base.dists.binomial.mgf","base.dists.binomial.mgf( t:number, n:integer, p:number )"],["base.dists.binomial.mgf.factory","base.dists.binomial.mgf.factory( n:integer, p:number )"],["base.dists.binomial.mode","base.dists.binomial.mode( n:integer, p:number )"],["base.dists.binomial.pmf","base.dists.binomial.pmf( x:number, n:integer, p:number )"],["base.dists.binomial.pmf.factory","base.dists.binomial.pmf.factory( n:integer, p:number )"],["base.dists.binomial.quantile","base.dists.binomial.quantile( r:number, n:integer, p:number )"],["base.dists.binomial.quantile.factory","base.dists.binomial.quantile.factory( n:integer, p:number )"],["base.dists.binomial.skewness","base.dists.binomial.skewness( n:integer, p:number )"],["base.dists.binomial.stdev","base.dists.binomial.stdev( n:integer, p:number )"],["base.dists.binomial.variance","base.dists.binomial.variance( n:integer, p:number )"],["base.dists.cauchy.Cauchy","base.dists.cauchy.Cauchy( [x0:number, Ɣ:number] )"],["base.dists.cauchy.cdf","base.dists.cauchy.cdf( x:number, x0:number, Ɣ:number )"],["base.dists.cauchy.cdf.factory","base.dists.cauchy.cdf.factory( x0:number, Ɣ:number )"],["base.dists.cauchy.entropy","base.dists.cauchy.entropy( x0:number, Ɣ:number )"],["base.dists.cauchy.logcdf","base.dists.cauchy.logcdf( x:number, x0:number, Ɣ:number )"],["base.dists.cauchy.logcdf.factory","base.dists.cauchy.logcdf.factory( x0:number, Ɣ:number )"],["base.dists.cauchy.logpdf","base.dists.cauchy.logpdf( x:number, x0:number, Ɣ:number )"],["base.dists.cauchy.logpdf.factory","base.dists.cauchy.logpdf.factory( x0:number, Ɣ:number )"],["base.dists.cauchy.median","base.dists.cauchy.median( x0:number, Ɣ:number )"],["base.dists.cauchy.mode","base.dists.cauchy.mode( x0:number, Ɣ:number )"],["base.dists.cauchy.pdf","base.dists.cauchy.pdf( x:number, x0:number, Ɣ:number )"],["base.dists.cauchy.pdf.factory","base.dists.cauchy.pdf.factory( x0:number, Ɣ:number )"],["base.dists.cauchy.quantile","base.dists.cauchy.quantile( p:number, x0:number, Ɣ:number )"],["base.dists.cauchy.quantile.factory","base.dists.cauchy.quantile.factory( x0:number, Ɣ:number )"],["base.dists.chi.cdf","base.dists.chi.cdf( x:number, k:number )"],["base.dists.chi.cdf.factory","base.dists.chi.cdf.factory( k:number )"],["base.dists.chi.Chi","base.dists.chi.Chi( [k:number] )"],["base.dists.chi.entropy","base.dists.chi.entropy( k:number )"],["base.dists.chi.kurtosis","base.dists.chi.kurtosis( k:number )"],["base.dists.chi.logpdf","base.dists.chi.logpdf( x:number, k:number )"],["base.dists.chi.logpdf.factory","base.dists.chi.logpdf.factory( k:number )"],["base.dists.chi.mean","base.dists.chi.mean( k:number )"],["base.dists.chi.mode","base.dists.chi.mode( k:number )"],["base.dists.chi.pdf","base.dists.chi.pdf( x:number, k:number )"],["base.dists.chi.pdf.factory","base.dists.chi.pdf.factory( k:number )"],["base.dists.chi.quantile","base.dists.chi.quantile( p:number, k:number )"],["base.dists.chi.quantile.factory","base.dists.chi.quantile.factory( k:number )"],["base.dists.chi.skewness","base.dists.chi.skewness( k:number )"],["base.dists.chi.stdev","base.dists.chi.stdev( k:number )"],["base.dists.chi.variance","base.dists.chi.variance( k:number )"],["base.dists.chisquare.cdf","base.dists.chisquare.cdf( x:number, k:number )"],["base.dists.chisquare.cdf.factory","base.dists.chisquare.cdf.factory( k:number )"],["base.dists.chisquare.ChiSquare","base.dists.chisquare.ChiSquare( [k:number] )"],["base.dists.chisquare.entropy","base.dists.chisquare.entropy( k:number )"],["base.dists.chisquare.kurtosis","base.dists.chisquare.kurtosis( k:number )"],["base.dists.chisquare.logpdf","base.dists.chisquare.logpdf( x:number, k:number )"],["base.dists.chisquare.logpdf.factory","base.dists.chisquare.logpdf.factory( k:number )"],["base.dists.chisquare.mean","base.dists.chisquare.mean( k:number )"],["base.dists.chisquare.median","base.dists.chisquare.median( k:number )"],["base.dists.chisquare.mgf","base.dists.chisquare.mgf( t:number, k:number )"],["base.dists.chisquare.mgf.factory","base.dists.chisquare.mgf.factory( k:number )"],["base.dists.chisquare.mode","base.dists.chisquare.mode( k:number )"],["base.dists.chisquare.pdf","base.dists.chisquare.pdf( x:number, k:number )"],["base.dists.chisquare.pdf.factory","base.dists.chisquare.pdf.factory( k:number )"],["base.dists.chisquare.quantile","base.dists.chisquare.quantile( p:number, k:number )"],["base.dists.chisquare.quantile.factory","base.dists.chisquare.quantile.factory( k:number )"],["base.dists.chisquare.skewness","base.dists.chisquare.skewness( k:number )"],["base.dists.chisquare.stdev","base.dists.chisquare.stdev( k:number )"],["base.dists.chisquare.variance","base.dists.chisquare.variance( k:number )"],["base.dists.cosine.cdf","base.dists.cosine.cdf( x:number, μ:number, s:number )"],["base.dists.cosine.cdf.factory","base.dists.cosine.cdf.factory( μ:number, s:number )"],["base.dists.cosine.Cosine","base.dists.cosine.Cosine( [μ:number, s:number] )"],["base.dists.cosine.kurtosis","base.dists.cosine.kurtosis( μ:number, s:number )"],["base.dists.cosine.logcdf","base.dists.cosine.logcdf( x:number, μ:number, s:number )"],["base.dists.cosine.logcdf.factory","base.dists.cosine.logcdf.factory( μ:number, s:number )"],["base.dists.cosine.logpdf","base.dists.cosine.logpdf( x:number, μ:number, s:number )"],["base.dists.cosine.logpdf.factory","base.dists.cosine.logpdf.factory( μ:number, s:number )"],["base.dists.cosine.mean","base.dists.cosine.mean( μ:number, s:number )"],["base.dists.cosine.median","base.dists.cosine.median( μ:number, s:number )"],["base.dists.cosine.mgf","base.dists.cosine.mgf( t:number, μ:number, s:number )"],["base.dists.cosine.mgf.factory","base.dists.cosine.mgf.factory( μ:number, s:number )"],["base.dists.cosine.mode","base.dists.cosine.mode( μ:number, s:number )"],["base.dists.cosine.pdf","base.dists.cosine.pdf( x:number, μ:number, s:number )"],["base.dists.cosine.pdf.factory","base.dists.cosine.pdf.factory( μ:number, s:number )"],["base.dists.cosine.quantile","base.dists.cosine.quantile( p:number, μ:number, s:number )"],["base.dists.cosine.quantile.factory","base.dists.cosine.quantile.factory( μ:number, s:number )"],["base.dists.cosine.skewness","base.dists.cosine.skewness( μ:number, s:number )"],["base.dists.cosine.stdev","base.dists.cosine.stdev( μ:number, s:number )"],["base.dists.cosine.variance","base.dists.cosine.variance( μ:number, s:number )"],["base.dists.degenerate.cdf","base.dists.degenerate.cdf( x:number, μ:number )"],["base.dists.degenerate.cdf.factory","base.dists.degenerate.cdf.factory( μ:number )"],["base.dists.degenerate.Degenerate","base.dists.degenerate.Degenerate( [μ:number] )"],["base.dists.degenerate.entropy","base.dists.degenerate.entropy( μ:number )"],["base.dists.degenerate.logcdf","base.dists.degenerate.logcdf( x:number, μ:number )"],["base.dists.degenerate.logcdf.factory","base.dists.degenerate.logcdf.factory( μ:number )"],["base.dists.degenerate.logpdf","base.dists.degenerate.logpdf( x:number, μ:number )"],["base.dists.degenerate.logpdf.factory","base.dists.degenerate.logpdf.factory( μ:number )"],["base.dists.degenerate.logpmf","base.dists.degenerate.logpmf( x:number, μ:number )"],["base.dists.degenerate.logpmf.factory","base.dists.degenerate.logpmf.factory( μ:number )"],["base.dists.degenerate.mean","base.dists.degenerate.mean( μ:number )"],["base.dists.degenerate.median","base.dists.degenerate.median( μ:number )"],["base.dists.degenerate.mgf","base.dists.degenerate.mgf( x:number, μ:number )"],["base.dists.degenerate.mgf.factory","base.dists.degenerate.mgf.factory( μ:number )"],["base.dists.degenerate.mode","base.dists.degenerate.mode( μ:number )"],["base.dists.degenerate.pdf","base.dists.degenerate.pdf( x:number, μ:number )"],["base.dists.degenerate.pdf.factory","base.dists.degenerate.pdf.factory( μ:number )"],["base.dists.degenerate.pmf","base.dists.degenerate.pmf( x:number, μ:number )"],["base.dists.degenerate.pmf.factory","base.dists.degenerate.pmf.factory( μ:number )"],["base.dists.degenerate.quantile","base.dists.degenerate.quantile( p:number, μ:number )"],["base.dists.degenerate.quantile.factory","base.dists.degenerate.quantile.factory( μ:number )"],["base.dists.degenerate.stdev","base.dists.degenerate.stdev( μ:number )"],["base.dists.degenerate.variance","base.dists.degenerate.variance( μ:number )"],["base.dists.discreteUniform.cdf","base.dists.discreteUniform.cdf( x:number, a:integer, b:integer )"],["base.dists.discreteUniform.cdf.factory","base.dists.discreteUniform.cdf.factory( a:integer, b:integer )"],["base.dists.discreteUniform.DiscreteUniform","base.dists.discreteUniform.DiscreteUniform( [a:integer, b:integer] )"],["base.dists.discreteUniform.kurtosis","base.dists.discreteUniform.kurtosis( a:integer, b:integer )"],["base.dists.discreteUniform.logcdf","base.dists.discreteUniform.logcdf( x:number, a:integer, b:integer )"],["base.dists.discreteUniform.logcdf.factory","base.dists.discreteUniform.logcdf.factory( a:integer, b:integer )"],["base.dists.discreteUniform.logpmf","base.dists.discreteUniform.logpmf( x:number, a:integer, b:integer )"],["base.dists.discreteUniform.logpmf.factory","base.dists.discreteUniform.logpmf.factory( a:integer, b:integer )"],["base.dists.discreteUniform.mean","base.dists.discreteUniform.mean( a:integer, b:integer )"],["base.dists.discreteUniform.median","base.dists.discreteUniform.median( a:integer, b:integer )"],["base.dists.discreteUniform.mgf","base.dists.discreteUniform.mgf( t:number, a:integer, b:integer )"],["base.dists.discreteUniform.mgf.factory","base.dists.discreteUniform.mgf.factory( a:integer, b:integer )"],["base.dists.discreteUniform.pmf","base.dists.discreteUniform.pmf( x:number, a:integer, b:integer )"],["base.dists.discreteUniform.pmf.factory","base.dists.discreteUniform.pmf.factory( a:integer, b:integer )"],["base.dists.discreteUniform.quantile","base.dists.discreteUniform.quantile( p:number, a:integer, b:integer )"],["base.dists.discreteUniform.quantile.factory","base.dists.discreteUniform.quantile.factory( a:integer, b:integer )"],["base.dists.discreteUniform.skewness","base.dists.discreteUniform.skewness( a:integer, b:integer )"],["base.dists.discreteUniform.stdev","base.dists.discreteUniform.stdev( a:integer, b:integer )"],["base.dists.discreteUniform.variance","base.dists.discreteUniform.variance( a:integer, b:integer )"],["base.dists.erlang.cdf","base.dists.erlang.cdf( x:number, k:number, λ:number )"],["base.dists.erlang.cdf.factory","base.dists.erlang.cdf.factory( k:number, λ:number )"],["base.dists.erlang.entropy","base.dists.erlang.entropy( k:integer, λ:number )"],["base.dists.erlang.Erlang","base.dists.erlang.Erlang( [k:number, λ:number] )"],["base.dists.erlang.kurtosis","base.dists.erlang.kurtosis( k:integer, λ:number )"],["base.dists.erlang.logpdf","base.dists.erlang.logpdf( x:number, k:number, λ:number )"],["base.dists.erlang.logpdf.factory","base.dists.erlang.logpdf.factory( k:number, λ:number )"],["base.dists.erlang.mean","base.dists.erlang.mean( k:integer, λ:number )"],["base.dists.erlang.mgf","base.dists.erlang.mgf( t:number, k:number, λ:number )"],["base.dists.erlang.mgf.factory","base.dists.erlang.mgf.factory( k:number, λ:number )"],["base.dists.erlang.mode","base.dists.erlang.mode( k:integer, λ:number )"],["base.dists.erlang.pdf","base.dists.erlang.pdf( x:number, k:number, λ:number )"],["base.dists.erlang.pdf.factory","base.dists.erlang.pdf.factory( k:number, λ:number )"],["base.dists.erlang.quantile","base.dists.erlang.quantile( p:number, k:number, λ:number )"],["base.dists.erlang.quantile.factory","base.dists.erlang.quantile.factory( k:number, λ:number )"],["base.dists.erlang.skewness","base.dists.erlang.skewness( k:integer, λ:number )"],["base.dists.erlang.stdev","base.dists.erlang.stdev( k:integer, λ:number )"],["base.dists.erlang.variance","base.dists.erlang.variance( k:integer, λ:number )"],["base.dists.exponential.cdf","base.dists.exponential.cdf( x:number, λ:number )"],["base.dists.exponential.cdf.factory","base.dists.exponential.cdf.factory( λ:number )"],["base.dists.exponential.entropy","base.dists.exponential.entropy( λ:number )"],["base.dists.exponential.Exponential","base.dists.exponential.Exponential( [λ:number] )"],["base.dists.exponential.kurtosis","base.dists.exponential.kurtosis( λ:number )"],["base.dists.exponential.logcdf","base.dists.exponential.logcdf( x:number, λ:number )"],["base.dists.exponential.logcdf.factory","base.dists.exponential.logcdf.factory( λ:number )"],["base.dists.exponential.logpdf","base.dists.exponential.logpdf( x:number, λ:number )"],["base.dists.exponential.logpdf.factory","base.dists.exponential.logpdf.factory( λ:number )"],["base.dists.exponential.mean","base.dists.exponential.mean( λ:number )"],["base.dists.exponential.median","base.dists.exponential.median( λ:number )"],["base.dists.exponential.mgf","base.dists.exponential.mgf( t:number, λ:number )"],["base.dists.exponential.mgf.factory","base.dists.exponential.mgf.factory( λ:number )"],["base.dists.exponential.mode","base.dists.exponential.mode( λ:number )"],["base.dists.exponential.pdf","base.dists.exponential.pdf( x:number, λ:number )"],["base.dists.exponential.pdf.factory","base.dists.exponential.pdf.factory( λ:number )"],["base.dists.exponential.quantile","base.dists.exponential.quantile( p:number, λ:number )"],["base.dists.exponential.quantile.factory","base.dists.exponential.quantile.factory( λ:number )"],["base.dists.exponential.skewness","base.dists.exponential.skewness( λ:number )"],["base.dists.exponential.stdev","base.dists.exponential.stdev( λ:number )"],["base.dists.exponential.variance","base.dists.exponential.variance( λ:number )"],["base.dists.f.cdf","base.dists.f.cdf( x:number, d1:number, d2:number )"],["base.dists.f.cdf.factory","base.dists.f.cdf.factory( d1:number, d2:number )"],["base.dists.f.entropy","base.dists.f.entropy( d1:number, d2:number )"],["base.dists.f.F","base.dists.f.F( [d1:number, d2:number] )"],["base.dists.f.kurtosis","base.dists.f.kurtosis( d1:number, d2:number )"],["base.dists.f.mean","base.dists.f.mean( d1:number, d2:number )"],["base.dists.f.mode","base.dists.f.mode( d1:number, d2:number )"],["base.dists.f.pdf","base.dists.f.pdf( x:number, d1:number, d2:number )"],["base.dists.f.pdf.factory","base.dists.f.pdf.factory( d1:number, d2:number )"],["base.dists.f.quantile","base.dists.f.quantile( p:number, d1:number, d2:number )"],["base.dists.f.quantile.factory","base.dists.f.quantile.factory( d1:number, d2:number )"],["base.dists.f.skewness","base.dists.f.skewness( d1:number, d2:number )"],["base.dists.f.stdev","base.dists.f.stdev( d1:number, d2:number )"],["base.dists.f.variance","base.dists.f.variance( d1:number, d2:number )"],["base.dists.frechet.cdf","base.dists.frechet.cdf( x:number, α:number, s:number, m:number )"],["base.dists.frechet.cdf.factory","base.dists.frechet.cdf.factory( α:number, s:number, m:number )"],["base.dists.frechet.entropy","base.dists.frechet.entropy( α:number, s:number, m:number )"],["base.dists.frechet.Frechet","base.dists.frechet.Frechet( [α:number, s:number, m:number] )"],["base.dists.frechet.kurtosis","base.dists.frechet.kurtosis( α:number, s:number, m:number )"],["base.dists.frechet.logcdf","base.dists.frechet.logcdf( x:number, α:number, s:number, m:number )"],["base.dists.frechet.logcdf.factory","base.dists.frechet.logcdf.factory( α:number, s:number, m:number )"],["base.dists.frechet.logpdf","base.dists.frechet.logpdf( x:number, α:number, s:number, m:number )"],["base.dists.frechet.logpdf.factory","base.dists.frechet.logpdf.factory( α:number, s:number, m:number )"],["base.dists.frechet.mean","base.dists.frechet.mean( α:number, s:number, m:number )"],["base.dists.frechet.median","base.dists.frechet.median( α:number, s:number, m:number )"],["base.dists.frechet.mode","base.dists.frechet.mode( α:number, s:number, m:number )"],["base.dists.frechet.pdf","base.dists.frechet.pdf( x:number, α:number, s:number, m:number )"],["base.dists.frechet.pdf.factory","base.dists.frechet.pdf.factory( α:number, s:number, m:number )"],["base.dists.frechet.quantile","base.dists.frechet.quantile( p:number, α:number, s:number, m:number )"],["base.dists.frechet.quantile.factory","base.dists.frechet.quantile.factory( α:number, s:number, m:number )"],["base.dists.frechet.skewness","base.dists.frechet.skewness( α:number, s:number, m:number )"],["base.dists.frechet.stdev","base.dists.frechet.stdev( α:number, s:number, m:number )"],["base.dists.frechet.variance","base.dists.frechet.variance( α:number, s:number, m:number )"],["base.dists.gamma.cdf","base.dists.gamma.cdf( x:number, α:number, β:number )"],["base.dists.gamma.cdf.factory","base.dists.gamma.cdf.factory( α:number, β:number )"],["base.dists.gamma.entropy","base.dists.gamma.entropy( α:number, β:number )"],["base.dists.gamma.Gamma","base.dists.gamma.Gamma( [α:number, β:number] )"],["base.dists.gamma.kurtosis","base.dists.gamma.kurtosis( α:number, β:number )"],["base.dists.gamma.logcdf","base.dists.gamma.logcdf( x:number, α:number, β:number )"],["base.dists.gamma.logcdf.factory","base.dists.gamma.logcdf.factory( α:number, β:number )"],["base.dists.gamma.logpdf","base.dists.gamma.logpdf( x:number, α:number, β:number )"],["base.dists.gamma.logpdf.factory","base.dists.gamma.logpdf.factory( α:number, β:number )"],["base.dists.gamma.mean","base.dists.gamma.mean( α:number, β:number )"],["base.dists.gamma.mgf","base.dists.gamma.mgf( t:number, α:number, β:number )"],["base.dists.gamma.mgf.factory","base.dists.gamma.mgf.factory( α:number, β:number )"],["base.dists.gamma.mode","base.dists.gamma.mode( α:number, β:number )"],["base.dists.gamma.pdf","base.dists.gamma.pdf( x:number, α:number, β:number )"],["base.dists.gamma.pdf.factory","base.dists.gamma.pdf.factory( α:number, β:number )"],["base.dists.gamma.quantile","base.dists.gamma.quantile( p:number, α:number, β:number )"],["base.dists.gamma.quantile.factory","base.dists.gamma.quantile.factory( α:number, β:number )"],["base.dists.gamma.skewness","base.dists.gamma.skewness( α:number, β:number )"],["base.dists.gamma.stdev","base.dists.gamma.stdev( α:number, β:number )"],["base.dists.gamma.variance","base.dists.gamma.variance( α:number, β:number )"],["base.dists.geometric.cdf","base.dists.geometric.cdf( x:number, p:number )"],["base.dists.geometric.cdf.factory","base.dists.geometric.cdf.factory( p:number )"],["base.dists.geometric.entropy","base.dists.geometric.entropy( p:number )"],["base.dists.geometric.Geometric","base.dists.geometric.Geometric( [p:number] )"],["base.dists.geometric.kurtosis","base.dists.geometric.kurtosis( p:number )"],["base.dists.geometric.logcdf","base.dists.geometric.logcdf( x:number, p:number )"],["base.dists.geometric.logcdf.factory","base.dists.geometric.logcdf.factory( p:number )"],["base.dists.geometric.logpmf","base.dists.geometric.logpmf( x:number, p:number )"],["base.dists.geometric.logpmf.factory","base.dists.geometric.logpmf.factory( p:number )"],["base.dists.geometric.mean","base.dists.geometric.mean( p:number )"],["base.dists.geometric.median","base.dists.geometric.median( p:number )"],["base.dists.geometric.mgf","base.dists.geometric.mgf( t:number, p:number )"],["base.dists.geometric.mgf.factory","base.dists.geometric.mgf.factory( p:number )"],["base.dists.geometric.mode","base.dists.geometric.mode( p:number )"],["base.dists.geometric.pmf","base.dists.geometric.pmf( x:number, p:number )"],["base.dists.geometric.pmf.factory","base.dists.geometric.pmf.factory( p:number )"],["base.dists.geometric.quantile","base.dists.geometric.quantile( r:number, p:number )"],["base.dists.geometric.quantile.factory","base.dists.geometric.quantile.factory( p:number )"],["base.dists.geometric.skewness","base.dists.geometric.skewness( p:number )"],["base.dists.geometric.stdev","base.dists.geometric.stdev( p:number )"],["base.dists.geometric.variance","base.dists.geometric.variance( p:number )"],["base.dists.gumbel.cdf","base.dists.gumbel.cdf( x:number, μ:number, β:number )"],["base.dists.gumbel.cdf.factory","base.dists.gumbel.cdf.factory( μ:number, β:number )"],["base.dists.gumbel.entropy","base.dists.gumbel.entropy( μ:number, β:number )"],["base.dists.gumbel.Gumbel","base.dists.gumbel.Gumbel( [μ:number, β:number] )"],["base.dists.gumbel.kurtosis","base.dists.gumbel.kurtosis( μ:number, β:number )"],["base.dists.gumbel.logcdf","base.dists.gumbel.logcdf( x:number, μ:number, β:number )"],["base.dists.gumbel.logcdf.factory","base.dists.gumbel.logcdf.factory( μ:number, β:number )"],["base.dists.gumbel.logpdf","base.dists.gumbel.logpdf( x:number, μ:number, β:number )"],["base.dists.gumbel.logpdf.factory","base.dists.gumbel.logpdf.factory( μ:number, β:number )"],["base.dists.gumbel.mean","base.dists.gumbel.mean( μ:number, β:number )"],["base.dists.gumbel.median","base.dists.gumbel.median( μ:number, β:number )"],["base.dists.gumbel.mgf","base.dists.gumbel.mgf( t:number, μ:number, β:number )"],["base.dists.gumbel.mgf.factory","base.dists.gumbel.mgf.factory( μ:number, β:number )"],["base.dists.gumbel.mode","base.dists.gumbel.mode( μ:number, β:number )"],["base.dists.gumbel.pdf","base.dists.gumbel.pdf( x:number, μ:number, β:number )"],["base.dists.gumbel.pdf.factory","base.dists.gumbel.pdf.factory( μ:number, β:number )"],["base.dists.gumbel.quantile","base.dists.gumbel.quantile( p:number, μ:number, β:number )"],["base.dists.gumbel.quantile.factory","base.dists.gumbel.quantile.factory( μ:number, β:number )"],["base.dists.gumbel.skewness","base.dists.gumbel.skewness( μ:number, β:number )"],["base.dists.gumbel.stdev","base.dists.gumbel.stdev( μ:number, β:number )"],["base.dists.gumbel.variance","base.dists.gumbel.variance( μ:number, β:number )"],["base.dists.hypergeometric.cdf","base.dists.hypergeometric.cdf( x:number, N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.cdf.factory","base.dists.hypergeometric.cdf.factory( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.Hypergeometric","base.dists.hypergeometric.Hypergeometric( [N:integer, K:integer, n:integer] )"],["base.dists.hypergeometric.kurtosis","base.dists.hypergeometric.kurtosis( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.logpmf","base.dists.hypergeometric.logpmf( x:number, N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.logpmf.factory","base.dists.hypergeometric.logpmf.factory( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.mean","base.dists.hypergeometric.mean( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.mode","base.dists.hypergeometric.mode( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.pmf","base.dists.hypergeometric.pmf( x:number, N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.pmf.factory","base.dists.hypergeometric.pmf.factory( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.quantile","base.dists.hypergeometric.quantile( p:number, N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.quantile.factory","base.dists.hypergeometric.quantile.factory( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.skewness","base.dists.hypergeometric.skewness( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.stdev","base.dists.hypergeometric.stdev( N:integer, K:integer, n:integer )"],["base.dists.hypergeometric.variance","base.dists.hypergeometric.variance( N:integer, K:integer, n:integer )"],["base.dists.invgamma.cdf","base.dists.invgamma.cdf( x:number, α:number, β:number )"],["base.dists.invgamma.cdf.factory","base.dists.invgamma.cdf.factory( α:number, β:number )"],["base.dists.invgamma.entropy","base.dists.invgamma.entropy( α:number, β:number )"],["base.dists.invgamma.InvGamma","base.dists.invgamma.InvGamma( [α:number, β:number] )"],["base.dists.invgamma.kurtosis","base.dists.invgamma.kurtosis( α:number, β:number )"],["base.dists.invgamma.logpdf","base.dists.invgamma.logpdf( x:number, α:number, β:number )"],["base.dists.invgamma.logpdf.factory","base.dists.invgamma.logpdf.factory( α:number, β:number )"],["base.dists.invgamma.mean","base.dists.invgamma.mean( α:number, β:number )"],["base.dists.invgamma.mode","base.dists.invgamma.mode( α:number, β:number )"],["base.dists.invgamma.pdf","base.dists.invgamma.pdf( x:number, α:number, β:number )"],["base.dists.invgamma.pdf.factory","base.dists.invgamma.pdf.factory( α:number, β:number )"],["base.dists.invgamma.quantile","base.dists.invgamma.quantile( p:number, α:number, β:number )"],["base.dists.invgamma.quantile.factory","base.dists.invgamma.quantile.factory( α:number, β:number )"],["base.dists.invgamma.skewness","base.dists.invgamma.skewness( α:number, β:number )"],["base.dists.invgamma.stdev","base.dists.invgamma.stdev( α:number, β:number )"],["base.dists.invgamma.variance","base.dists.invgamma.variance( α:number, β:number )"],["base.dists.kumaraswamy.cdf","base.dists.kumaraswamy.cdf( x:number, a:number, b:number )"],["base.dists.kumaraswamy.cdf.factory","base.dists.kumaraswamy.cdf.factory( a:number, b:number )"],["base.dists.kumaraswamy.Kumaraswamy","base.dists.kumaraswamy.Kumaraswamy( [a:number, b:number] )"],["base.dists.kumaraswamy.kurtosis","base.dists.kumaraswamy.kurtosis( a:number, b:number )"],["base.dists.kumaraswamy.logcdf","base.dists.kumaraswamy.logcdf( x:number, a:number, b:number )"],["base.dists.kumaraswamy.logcdf.factory","base.dists.kumaraswamy.logcdf.factory( a:number, b:number )"],["base.dists.kumaraswamy.logpdf","base.dists.kumaraswamy.logpdf( x:number, a:number, b:number )"],["base.dists.kumaraswamy.logpdf.factory","base.dists.kumaraswamy.logpdf.factory( a:number, b:number )"],["base.dists.kumaraswamy.mean","base.dists.kumaraswamy.mean( a:number, b:number )"],["base.dists.kumaraswamy.median","base.dists.kumaraswamy.median( a:number, b:number )"],["base.dists.kumaraswamy.mode","base.dists.kumaraswamy.mode( a:number, b:number )"],["base.dists.kumaraswamy.pdf","base.dists.kumaraswamy.pdf( x:number, a:number, b:number )"],["base.dists.kumaraswamy.pdf.factory","base.dists.kumaraswamy.pdf.factory( a:number, b:number )"],["base.dists.kumaraswamy.quantile","base.dists.kumaraswamy.quantile( p:number, a:number, b:number )"],["base.dists.kumaraswamy.quantile.factory","base.dists.kumaraswamy.quantile.factory( a:number, b:number )"],["base.dists.kumaraswamy.skewness","base.dists.kumaraswamy.skewness( a:number, b:number )"],["base.dists.kumaraswamy.stdev","base.dists.kumaraswamy.stdev( a:number, b:number )"],["base.dists.kumaraswamy.variance","base.dists.kumaraswamy.variance( a:number, b:number )"],["base.dists.laplace.cdf","base.dists.laplace.cdf( x:number, μ:number, b:number )"],["base.dists.laplace.cdf.factory","base.dists.laplace.cdf.factory( μ:number, b:number )"],["base.dists.laplace.entropy","base.dists.laplace.entropy( μ:number, b:number )"],["base.dists.laplace.kurtosis","base.dists.laplace.kurtosis( μ:number, b:number )"],["base.dists.laplace.Laplace","base.dists.laplace.Laplace( [μ:number, b:number] )"],["base.dists.laplace.logcdf","base.dists.laplace.logcdf( x:number, μ:number, b:number )"],["base.dists.laplace.logcdf.factory","base.dists.laplace.logcdf.factory( μ:number, b:number )"],["base.dists.laplace.logpdf","base.dists.laplace.logpdf( x:number, μ:number, b:number )"],["base.dists.laplace.logpdf.factory","base.dists.laplace.logpdf.factory( μ:number, b:number )"],["base.dists.laplace.mean","base.dists.laplace.mean( μ:number, b:number )"],["base.dists.laplace.median","base.dists.laplace.median( μ:number, b:number )"],["base.dists.laplace.mgf","base.dists.laplace.mgf( t:number, μ:number, b:number )"],["base.dists.laplace.mgf.factory","base.dists.laplace.mgf.factory( μ:number, b:number )"],["base.dists.laplace.mode","base.dists.laplace.mode( μ:number, b:number )"],["base.dists.laplace.pdf","base.dists.laplace.pdf( x:number, μ:number, b:number )"],["base.dists.laplace.pdf.factory","base.dists.laplace.pdf.factory( μ:number, b:number )"],["base.dists.laplace.quantile","base.dists.laplace.quantile( p:number, μ:number, b:number )"],["base.dists.laplace.quantile.factory","base.dists.laplace.quantile.factory( μ:number, b:number )"],["base.dists.laplace.skewness","base.dists.laplace.skewness( μ:number, b:number )"],["base.dists.laplace.stdev","base.dists.laplace.stdev( μ:number, b:number )"],["base.dists.laplace.variance","base.dists.laplace.variance( μ:number, b:number )"],["base.dists.levy.cdf","base.dists.levy.cdf( x:number, μ:number, c:number )"],["base.dists.levy.cdf.factory","base.dists.levy.cdf.factory( μ:number, c:number )"],["base.dists.levy.entropy","base.dists.levy.entropy( μ:number, c:number )"],["base.dists.levy.Levy","base.dists.levy.Levy( [μ:number, c:number] )"],["base.dists.levy.logcdf","base.dists.levy.logcdf( x:number, μ:number, c:number )"],["base.dists.levy.logcdf.factory","base.dists.levy.logcdf.factory( μ:number, c:number )"],["base.dists.levy.logpdf","base.dists.levy.logpdf( x:number, μ:number, c:number )"],["base.dists.levy.logpdf.factory","base.dists.levy.logpdf.factory( μ:number, c:number )"],["base.dists.levy.mean","base.dists.levy.mean( μ:number, c:number )"],["base.dists.levy.median","base.dists.levy.median( μ:number, c:number )"],["base.dists.levy.mode","base.dists.levy.mode( μ:number, c:number )"],["base.dists.levy.pdf","base.dists.levy.pdf( x:number, μ:number, c:number )"],["base.dists.levy.pdf.factory","base.dists.levy.pdf.factory( μ:number, c:number )"],["base.dists.levy.quantile","base.dists.levy.quantile( p:number, μ:number, c:number )"],["base.dists.levy.quantile.factory","base.dists.levy.quantile.factory( μ:number, c:number )"],["base.dists.levy.stdev","base.dists.levy.stdev( μ:number, c:number )"],["base.dists.levy.variance","base.dists.levy.variance( μ:number, c:number )"],["base.dists.logistic.cdf","base.dists.logistic.cdf( x:number, μ:number, s:number )"],["base.dists.logistic.cdf.factory","base.dists.logistic.cdf.factory( μ:number, s:number )"],["base.dists.logistic.entropy","base.dists.logistic.entropy( μ:number, s:number )"],["base.dists.logistic.kurtosis","base.dists.logistic.kurtosis( μ:number, s:number )"],["base.dists.logistic.logcdf","base.dists.logistic.logcdf( x:number, μ:number, s:number )"],["base.dists.logistic.logcdf.factory","base.dists.logistic.logcdf.factory( μ:number, s:number )"],["base.dists.logistic.Logistic","base.dists.logistic.Logistic( [μ:number, s:number] )"],["base.dists.logistic.logpdf","base.dists.logistic.logpdf( x:number, μ:number, s:number )"],["base.dists.logistic.logpdf.factory","base.dists.logistic.logpdf.factory( μ:number, s:number )"],["base.dists.logistic.mean","base.dists.logistic.mean( μ:number, s:number )"],["base.dists.logistic.median","base.dists.logistic.median( μ:number, s:number )"],["base.dists.logistic.mgf","base.dists.logistic.mgf( t:number, μ:number, s:number )"],["base.dists.logistic.mgf.factory","base.dists.logistic.mgf.factory( μ:number, s:number )"],["base.dists.logistic.mode","base.dists.logistic.mode( μ:number, s:number )"],["base.dists.logistic.pdf","base.dists.logistic.pdf( x:number, μ:number, s:number )"],["base.dists.logistic.pdf.factory","base.dists.logistic.pdf.factory( μ:number, s:number )"],["base.dists.logistic.quantile","base.dists.logistic.quantile( p:number, μ:number, s:number )"],["base.dists.logistic.quantile.factory","base.dists.logistic.quantile.factory( μ:number, s:number )"],["base.dists.logistic.skewness","base.dists.logistic.skewness( μ:number, s:number )"],["base.dists.logistic.stdev","base.dists.logistic.stdev( μ:number, s:number )"],["base.dists.logistic.variance","base.dists.logistic.variance( μ:number, s:number )"],["base.dists.lognormal.cdf","base.dists.lognormal.cdf( x:number, μ:number, σ:number )"],["base.dists.lognormal.cdf.factory","base.dists.lognormal.cdf.factory( μ:number, σ:number )"],["base.dists.lognormal.entropy","base.dists.lognormal.entropy( μ:number, σ:number )"],["base.dists.lognormal.kurtosis","base.dists.lognormal.kurtosis( μ:number, σ:number )"],["base.dists.lognormal.LogNormal","base.dists.lognormal.LogNormal( [μ:number, σ:number] )"],["base.dists.lognormal.logpdf","base.dists.lognormal.logpdf( x:number, μ:number, σ:number )"],["base.dists.lognormal.logpdf.factory","base.dists.lognormal.logpdf.factory( μ:number, σ:number )"],["base.dists.lognormal.mean","base.dists.lognormal.mean( μ:number, σ:number )"],["base.dists.lognormal.median","base.dists.lognormal.median( μ:number, σ:number )"],["base.dists.lognormal.mode","base.dists.lognormal.mode( μ:number, σ:number )"],["base.dists.lognormal.pdf","base.dists.lognormal.pdf( x:number, μ:number, σ:number )"],["base.dists.lognormal.pdf.factory","base.dists.lognormal.pdf.factory( μ:number, σ:number )"],["base.dists.lognormal.quantile","base.dists.lognormal.quantile( p:number, μ:number, σ:number )"],["base.dists.lognormal.quantile.factory","base.dists.lognormal.quantile.factory( μ:number, σ:number )"],["base.dists.lognormal.skewness","base.dists.lognormal.skewness( μ:number, σ:number )"],["base.dists.lognormal.stdev","base.dists.lognormal.stdev( μ:number, σ:number )"],["base.dists.lognormal.variance","base.dists.lognormal.variance( μ:number, σ:number )"],["base.dists.negativeBinomial.cdf","base.dists.negativeBinomial.cdf( x:number, r:number, p:number )"],["base.dists.negativeBinomial.cdf.factory","base.dists.negativeBinomial.cdf.factory( r:number, p:number )"],["base.dists.negativeBinomial.kurtosis","base.dists.negativeBinomial.kurtosis( r:integer, p:number )"],["base.dists.negativeBinomial.logpmf","base.dists.negativeBinomial.logpmf( x:number, r:number, p:number )"],["base.dists.negativeBinomial.logpmf.factory","base.dists.negativeBinomial.logpmf.factory( r:number, p:number )"],["base.dists.negativeBinomial.mean","base.dists.negativeBinomial.mean( r:integer, p:number )"],["base.dists.negativeBinomial.mgf","base.dists.negativeBinomial.mgf( x:number, r:number, p:number )"],["base.dists.negativeBinomial.mgf.factory","base.dists.negativeBinomial.mgf.factory( r:number, p:number )"],["base.dists.negativeBinomial.mode","base.dists.negativeBinomial.mode( r:integer, p:number )"],["base.dists.negativeBinomial.NegativeBinomial","base.dists.negativeBinomial.NegativeBinomial( [r:number, p:number] )"],["base.dists.negativeBinomial.pmf","base.dists.negativeBinomial.pmf( x:number, r:number, p:number )"],["base.dists.negativeBinomial.pmf.factory","base.dists.negativeBinomial.pmf.factory( r:number, p:number )"],["base.dists.negativeBinomial.quantile","base.dists.negativeBinomial.quantile( k:number, r:number, p:number )"],["base.dists.negativeBinomial.quantile.factory","base.dists.negativeBinomial.quantile.factory( r:number, p:number )"],["base.dists.negativeBinomial.skewness","base.dists.negativeBinomial.skewness( r:integer, p:number )"],["base.dists.negativeBinomial.stdev","base.dists.negativeBinomial.stdev( r:integer, p:number )"],["base.dists.negativeBinomial.variance","base.dists.negativeBinomial.variance( r:integer, p:number )"],["base.dists.normal.cdf","base.dists.normal.cdf( x:number, μ:number, σ:number )"],["base.dists.normal.cdf.factory","base.dists.normal.cdf.factory( μ:number, σ:number )"],["base.dists.normal.entropy","base.dists.normal.entropy( μ:number, σ:number )"],["base.dists.normal.kurtosis","base.dists.normal.kurtosis( μ:number, σ:number )"],["base.dists.normal.logpdf","base.dists.normal.logpdf( x:number, μ:number, σ:number )"],["base.dists.normal.logpdf.factory","base.dists.normal.logpdf.factory( μ:number, σ:number )"],["base.dists.normal.mean","base.dists.normal.mean( μ:number, σ:number )"],["base.dists.normal.median","base.dists.normal.median( μ:number, σ:number )"],["base.dists.normal.mgf","base.dists.normal.mgf( x:number, μ:number, σ:number )"],["base.dists.normal.mgf.factory","base.dists.normal.mgf.factory( μ:number, σ:number )"],["base.dists.normal.mode","base.dists.normal.mode( μ:number, σ:number )"],["base.dists.normal.Normal","base.dists.normal.Normal( [μ:number, σ:number] )"],["base.dists.normal.pdf","base.dists.normal.pdf( x:number, μ:number, σ:number )"],["base.dists.normal.pdf.factory","base.dists.normal.pdf.factory( μ:number, σ:number )"],["base.dists.normal.quantile","base.dists.normal.quantile( p:number, μ:number, σ:number )"],["base.dists.normal.quantile.factory","base.dists.normal.quantile.factory( μ:number, σ:number )"],["base.dists.normal.skewness","base.dists.normal.skewness( μ:number, σ:number )"],["base.dists.normal.stdev","base.dists.normal.stdev( μ:number, σ:number )"],["base.dists.normal.variance","base.dists.normal.variance( μ:number, σ:number )"],["base.dists.pareto1.cdf","base.dists.pareto1.cdf( x:number, α:number, β:number )"],["base.dists.pareto1.cdf.factory","base.dists.pareto1.cdf.factory( α:number, β:number )"],["base.dists.pareto1.entropy","base.dists.pareto1.entropy( α:number, β:number )"],["base.dists.pareto1.kurtosis","base.dists.pareto1.kurtosis( α:number, β:number )"],["base.dists.pareto1.logcdf","base.dists.pareto1.logcdf( x:number, α:number, β:number )"],["base.dists.pareto1.logcdf.factory","base.dists.pareto1.logcdf.factory( α:number, β:number )"],["base.dists.pareto1.logpdf","base.dists.pareto1.logpdf( x:number, α:number, β:number )"],["base.dists.pareto1.logpdf.factory","base.dists.pareto1.logpdf.factory( α:number, β:number )"],["base.dists.pareto1.mean","base.dists.pareto1.mean( α:number, β:number )"],["base.dists.pareto1.median","base.dists.pareto1.median( α:number, β:number )"],["base.dists.pareto1.mode","base.dists.pareto1.mode( α:number, β:number )"],["base.dists.pareto1.Pareto1","base.dists.pareto1.Pareto1( [α:number, β:number] )"],["base.dists.pareto1.pdf","base.dists.pareto1.pdf( x:number, α:number, β:number )"],["base.dists.pareto1.pdf.factory","base.dists.pareto1.pdf.factory( α:number, β:number )"],["base.dists.pareto1.quantile","base.dists.pareto1.quantile( p:number, α:number, β:number )"],["base.dists.pareto1.quantile.factory","base.dists.pareto1.quantile.factory( α:number, β:number )"],["base.dists.pareto1.skewness","base.dists.pareto1.skewness( α:number, β:number )"],["base.dists.pareto1.stdev","base.dists.pareto1.stdev( α:number, β:number )"],["base.dists.pareto1.variance","base.dists.pareto1.variance( α:number, β:number )"],["base.dists.poisson.cdf","base.dists.poisson.cdf( x:number, λ:number )"],["base.dists.poisson.cdf.factory","base.dists.poisson.cdf.factory( λ:number )"],["base.dists.poisson.entropy","base.dists.poisson.entropy( λ:number )"],["base.dists.poisson.kurtosis","base.dists.poisson.kurtosis( λ:number )"],["base.dists.poisson.logpmf","base.dists.poisson.logpmf( x:number, λ:number )"],["base.dists.poisson.logpmf.factory","base.dists.poisson.logpmf.factory( λ:number )"],["base.dists.poisson.mean","base.dists.poisson.mean( λ:number )"],["base.dists.poisson.median","base.dists.poisson.median( λ:number )"],["base.dists.poisson.mgf","base.dists.poisson.mgf( x:number, λ:number )"],["base.dists.poisson.mgf.factory","base.dists.poisson.mgf.factory( λ:number )"],["base.dists.poisson.mode","base.dists.poisson.mode( λ:number )"],["base.dists.poisson.pmf","base.dists.poisson.pmf( x:number, λ:number )"],["base.dists.poisson.pmf.factory","base.dists.poisson.pmf.factory( λ:number )"],["base.dists.poisson.Poisson","base.dists.poisson.Poisson( [λ:number] )"],["base.dists.poisson.quantile","base.dists.poisson.quantile( p:number, λ:number )"],["base.dists.poisson.quantile.factory","base.dists.poisson.quantile.factory( λ:number )"],["base.dists.poisson.skewness","base.dists.poisson.skewness( λ:number )"],["base.dists.poisson.stdev","base.dists.poisson.stdev( λ:number )"],["base.dists.poisson.variance","base.dists.poisson.variance( λ:number )"],["base.dists.rayleigh.cdf","base.dists.rayleigh.cdf( x:number, sigma:number )"],["base.dists.rayleigh.cdf.factory","base.dists.rayleigh.cdf.factory( sigma:number )"],["base.dists.rayleigh.entropy","base.dists.rayleigh.entropy( σ:number )"],["base.dists.rayleigh.kurtosis","base.dists.rayleigh.kurtosis( σ:number )"],["base.dists.rayleigh.logcdf","base.dists.rayleigh.logcdf( x:number, sigma:number )"],["base.dists.rayleigh.logcdf.factory","base.dists.rayleigh.logcdf.factory( sigma:number )"],["base.dists.rayleigh.logpdf","base.dists.rayleigh.logpdf( x:number, sigma:number )"],["base.dists.rayleigh.logpdf.factory","base.dists.rayleigh.logpdf.factory( sigma:number )"],["base.dists.rayleigh.mean","base.dists.rayleigh.mean( σ:number )"],["base.dists.rayleigh.median","base.dists.rayleigh.median( σ:number )"],["base.dists.rayleigh.mgf","base.dists.rayleigh.mgf( t:number, sigma:number )"],["base.dists.rayleigh.mgf.factory","base.dists.rayleigh.mgf.factory( sigma:number )"],["base.dists.rayleigh.mode","base.dists.rayleigh.mode( σ:number )"],["base.dists.rayleigh.pdf","base.dists.rayleigh.pdf( x:number, sigma:number )"],["base.dists.rayleigh.pdf.factory","base.dists.rayleigh.pdf.factory( sigma:number )"],["base.dists.rayleigh.quantile","base.dists.rayleigh.quantile( p:number, sigma:number )"],["base.dists.rayleigh.quantile.factory","base.dists.rayleigh.quantile.factory( sigma:number )"],["base.dists.rayleigh.Rayleigh","base.dists.rayleigh.Rayleigh( [σ:number] )"],["base.dists.rayleigh.skewness","base.dists.rayleigh.skewness( σ:number )"],["base.dists.rayleigh.stdev","base.dists.rayleigh.stdev( σ:number )"],["base.dists.rayleigh.variance","base.dists.rayleigh.variance( σ:number )"],["base.dists.signrank.cdf","base.dists.signrank.cdf( x:number, n:integer )"],["base.dists.signrank.cdf.factory","base.dists.signrank.cdf.factory( n:integer )"],["base.dists.signrank.pdf","base.dists.signrank.pdf( x:number, n:integer )"],["base.dists.signrank.pdf.factory","base.dists.signrank.pdf.factory( n:integer )"],["base.dists.signrank.quantile","base.dists.signrank.quantile( p:number, n:integer )"],["base.dists.signrank.quantile.factory","base.dists.signrank.quantile.factory( n:integer )"],["base.dists.t.cdf","base.dists.t.cdf( x:number, v:number )"],["base.dists.t.cdf.factory","base.dists.t.cdf.factory( v:number )"],["base.dists.t.entropy","base.dists.t.entropy( v:number )"],["base.dists.t.kurtosis","base.dists.t.kurtosis( v:number )"],["base.dists.t.mean","base.dists.t.mean( v:number )"],["base.dists.t.median","base.dists.t.median( v:number )"],["base.dists.t.mode","base.dists.t.mode( v:number )"],["base.dists.t.pdf","base.dists.t.pdf( x:number, v:number )"],["base.dists.t.pdf.factory","base.dists.t.pdf.factory( v:number )"],["base.dists.t.quantile","base.dists.t.quantile( p:number, v:number )"],["base.dists.t.quantile.factory","base.dists.t.quantile.factory( v:number )"],["base.dists.t.skewness","base.dists.t.skewness( v:number )"],["base.dists.t.stdev","base.dists.t.stdev( v:number )"],["base.dists.t.T","base.dists.t.T( [v:number] )"],["base.dists.t.variance","base.dists.t.variance( v:number )"],["base.dists.triangular.cdf","base.dists.triangular.cdf( x:number, a:number, b:number, c:number )"],["base.dists.triangular.cdf.factory","base.dists.triangular.cdf.factory( a:number, b:number, c:number )"],["base.dists.triangular.entropy","base.dists.triangular.entropy( a:number, b:number, c:number )"],["base.dists.triangular.kurtosis","base.dists.triangular.kurtosis( a:number, b:number, c:number )"],["base.dists.triangular.logcdf","base.dists.triangular.logcdf( x:number, a:number, b:number, c:number )"],["base.dists.triangular.logcdf.factory","base.dists.triangular.logcdf.factory( a:number, b:number, c:number )"],["base.dists.triangular.logpdf","base.dists.triangular.logpdf( x:number, a:number, b:number, c:number )"],["base.dists.triangular.logpdf.factory","base.dists.triangular.logpdf.factory( a:number, b:number, c:number )"],["base.dists.triangular.mean","base.dists.triangular.mean( a:number, b:number, c:number )"],["base.dists.triangular.median","base.dists.triangular.median( a:number, b:number, c:number )"],["base.dists.triangular.mgf","base.dists.triangular.mgf( t:number, a:number, b:number, c:number )"],["base.dists.triangular.mgf.factory","base.dists.triangular.mgf.factory( a:number, b:number, c:number )"],["base.dists.triangular.mode","base.dists.triangular.mode( a:number, b:number, c:number )"],["base.dists.triangular.pdf","base.dists.triangular.pdf( x:number, a:number, b:number, c:number )"],["base.dists.triangular.pdf.factory","base.dists.triangular.pdf.factory( a:number, b:number, c:number )"],["base.dists.triangular.quantile","base.dists.triangular.quantile( p:number, a:number, b:number, c:number )"],["base.dists.triangular.quantile.factory","base.dists.triangular.quantile.factory( a:number, b:number, c:number )"],["base.dists.triangular.skewness","base.dists.triangular.skewness( a:number, b:number, c:number )"],["base.dists.triangular.stdev","base.dists.triangular.stdev( a:number, b:number, c:number )"],["base.dists.triangular.Triangular","base.dists.triangular.Triangular( [a:number, b:number, c:number] )"],["base.dists.triangular.variance","base.dists.triangular.variance( a:number, b:number, c:number )"],["base.dists.uniform.cdf","base.dists.uniform.cdf( x:number, a:number, b:number )"],["base.dists.uniform.cdf.factory","base.dists.uniform.cdf.factory( a:number, b:number )"],["base.dists.uniform.entropy","base.dists.uniform.entropy( a:number, b:number )"],["base.dists.uniform.kurtosis","base.dists.uniform.kurtosis( a:number, b:number )"],["base.dists.uniform.logcdf","base.dists.uniform.logcdf( x:number, a:number, b:number )"],["base.dists.uniform.logcdf.factory","base.dists.uniform.logcdf.factory( a:number, b:number )"],["base.dists.uniform.logpdf","base.dists.uniform.logpdf( x:number, a:number, b:number )"],["base.dists.uniform.logpdf.factory","base.dists.uniform.logpdf.factory( a:number, b:number )"],["base.dists.uniform.mean","base.dists.uniform.mean( a:number, b:number )"],["base.dists.uniform.median","base.dists.uniform.median( a:number, b:number )"],["base.dists.uniform.mgf","base.dists.uniform.mgf( t:number, a:number, b:number )"],["base.dists.uniform.mgf.factory","base.dists.uniform.mgf.factory( a:number, b:number )"],["base.dists.uniform.pdf","base.dists.uniform.pdf( x:number, a:number, b:number )"],["base.dists.uniform.pdf.factory","base.dists.uniform.pdf.factory( a:number, b:number )"],["base.dists.uniform.quantile","base.dists.uniform.quantile( p:number, a:number, b:number )"],["base.dists.uniform.quantile.factory","base.dists.uniform.quantile.factory( a:number, b:number )"],["base.dists.uniform.skewness","base.dists.uniform.skewness( a:number, b:number )"],["base.dists.uniform.stdev","base.dists.uniform.stdev( a:number, b:number )"],["base.dists.uniform.Uniform","base.dists.uniform.Uniform( [a:number, b:number] )"],["base.dists.uniform.variance","base.dists.uniform.variance( a:number, b:number )"],["base.dists.weibull.cdf","base.dists.weibull.cdf( x:number, k:number, λ:number )"],["base.dists.weibull.cdf.factory","base.dists.weibull.cdf.factory( k:number, λ:number )"],["base.dists.weibull.entropy","base.dists.weibull.entropy( k:number, λ:number )"],["base.dists.weibull.kurtosis","base.dists.weibull.kurtosis( k:number, λ:number )"],["base.dists.weibull.logcdf","base.dists.weibull.logcdf( x:number, k:number, λ:number )"],["base.dists.weibull.logcdf.factory","base.dists.weibull.logcdf.factory( k:number, λ:number)"],["base.dists.weibull.logpdf","base.dists.weibull.logpdf( x:number, k:number, λ:number )"],["base.dists.weibull.logpdf.factory","base.dists.weibull.logpdf.factory( k:number, λ:number )"],["base.dists.weibull.mean","base.dists.weibull.mean( k:number, λ:number )"],["base.dists.weibull.median","base.dists.weibull.median( k:number, λ:number )"],["base.dists.weibull.mgf","base.dists.weibull.mgf( x:number, k:number, λ:number )"],["base.dists.weibull.mgf.factory","base.dists.weibull.mgf.factory( k:number, λ:number )"],["base.dists.weibull.mode","base.dists.weibull.mode( k:number, λ:number )"],["base.dists.weibull.pdf","base.dists.weibull.pdf( x:number, k:number, λ:number )"],["base.dists.weibull.pdf.factory","base.dists.weibull.pdf.factory( k:number, λ:number )"],["base.dists.weibull.quantile","base.dists.weibull.quantile( p:number, k:number, λ:number )"],["base.dists.weibull.quantile.factory","base.dists.weibull.quantile.factory( k:number, λ:number )"],["base.dists.weibull.skewness","base.dists.weibull.skewness( k:number, λ:number )"],["base.dists.weibull.stdev","base.dists.weibull.stdev( k:number, λ:number )"],["base.dists.weibull.variance","base.dists.weibull.variance( k:number, λ:number )"],["base.dists.weibull.Weibull","base.dists.weibull.Weibull( [k:number, λ:number] )"],["base.ellipe","base.ellipe( m:number )"],["base.ellipk","base.ellipk( m:number )"],["base.epsdiff","base.epsdiff( x:number, y:number[, scale:string|Function] )"],["base.erf","base.erf( x:number )"],["base.erfc","base.erfc( x:number )"],["base.erfcinv","base.erfcinv( x:number )"],["base.erfinv","base.erfinv( x:number )"],["base.eta","base.eta( s:number )"],["base.evalpoly","base.evalpoly( c:Array<number>, x:number )"],["base.evalpoly.factory","base.evalpoly.factory( c:Array<number> )"],["base.evalrational","base.evalrational( P:Array<number>, Q:Array<number>, x:number )"],["base.evalrational.factory","base.evalrational.factory( P:Array<number>, Q:Array<number> )"],["base.exp","base.exp( x:number )"],["base.exp2","base.exp2( x:number )"],["base.exp10","base.exp10( x:number )"],["base.expit","base.expit( x:number )"],["base.expm1","base.expm1( x:number )"],["base.expm1rel","base.expm1rel( x:number )"],["base.exponent","base.exponent( x:number )"],["base.exponentf","base.exponentf( x:float )"],["base.factorial","base.factorial( x:number )"],["base.factorialln","base.factorialln( x:number )"],["base.fallingFactorial","base.fallingFactorial( x:number, n:integer )"],["base.fibonacci","base.fibonacci( n:integer )"],["base.fibonacciIndex","base.fibonacciIndex( F:integer )"],["base.fibpoly","base.fibpoly( n:integer, x:number )"],["base.fibpoly.factory","base.fibpoly.factory( n:integer )"],["base.flipsign","base.flipsign( x:number, y:number )"],["base.flipsignf","base.flipsignf( x:number, y:number )"],["base.float32ToInt32","base.float32ToInt32( x:float )"],["base.float32ToUint32","base.float32ToUint32( x:float )"],["base.float64ToFloat32","base.float64ToFloat32( x:number )"],["base.float64ToInt32","base.float64ToInt32( x:number )"],["base.float64ToInt64Bytes","base.float64ToInt64Bytes( x:integer )"],["base.float64ToInt64Bytes.assign","base.float64ToInt64Bytes.assign( x:integer, out:Array|TypedArray|Object, stride:integer, offset:integer )"],["base.float64ToUint32","base.float64ToUint32( x:number )"],["base.floor","base.floor( x:number )"],["base.floor2","base.floor2( x:number )"],["base.floor10","base.floor10( x:number )"],["base.floorb","base.floorb( x:number, n:integer, b:integer )"],["base.floorf","base.floorf( x:number )"],["base.floorn","base.floorn( x:number, n:integer )"],["base.floorsd","base.floorsd( x:number, n:integer[, b:integer] )"],["base.fresnel","base.fresnel( [out:Array|TypedArray|Object,] x:number )"],["base.fresnelc","base.fresnelc( x:number )"],["base.fresnels","base.fresnels( x:number )"],["base.frexp","base.frexp( [out:Array|TypedArray|Object,] x:number )"],["base.fromBinaryString","base.fromBinaryString( bstr:string )"],["base.fromBinaryStringf","base.fromBinaryStringf( bstr:string )"],["base.fromBinaryStringUint8","base.fromBinaryStringUint8( bstr:string )"],["base.fromBinaryStringUint16","base.fromBinaryStringUint16( bstr:string )"],["base.fromBinaryStringUint32","base.fromBinaryStringUint32( bstr:string )"],["base.fromInt64Bytes","base.fromInt64Bytes( bytes:Array|TypedArray|Object, stride:integer, offset:integer )"],["base.fromWordf","base.fromWordf( word:integer )"],["base.fromWords","base.fromWords( high:integer, low:integer )"],["base.gamma","base.gamma( x:number )"],["base.gamma1pm1","base.gamma1pm1( x:number )"],["base.gammaDeltaRatio","base.gammaDeltaRatio( z:number, delta:number )"],["base.gammainc","base.gammainc( x:number, s:number[, regularized:boolean[, upper:boolean]] )"],["base.gammaincinv","base.gammaincinv( p:number, a:number[, upper:boolean] )"],["base.gammaLanczosSum","base.gammaLanczosSum( x:number )"],["base.gammaLanczosSumExpGScaled","base.gammaLanczosSumExpGScaled( x:number )"],["base.gammaln","base.gammaln( x:number )"],["base.gcd","base.gcd( a:integer, b:integer )"],["base.getHighWord","base.getHighWord( x:number )"],["base.getLowWord","base.getLowWord( x:number )"],["base.hacovercos","base.hacovercos( x:number )"],["base.hacoversin","base.hacoversin( x:number )"],["base.havercos","base.havercos( x:number )"],["base.haversin","base.haversin( x:number )"],["base.heaviside","base.heaviside( x:number[, continuity:string] )"],["base.hermitepoly","base.hermitepoly( n:integer, x:number )"],["base.hermitepoly.factory","base.hermitepoly.factory( n:integer )"],["base.hypot","base.hypot( x:number, y:number )"],["base.hypotf","base.hypotf( x:number, y:number )"],["base.identity","base.identity( x:number )"],["base.identityf","base.identityf( x:number )"],["base.imul","base.imul( a:integer, b:integer )"],["base.imuldw","base.imuldw( [out:ArrayLikeObject,] a:integer, b:integer )"],["base.int32ToUint32","base.int32ToUint32( x:integer )"],["base.inv","base.inv( x:number )"],["base.invf","base.invf( x:number )"],["base.isComposite","base.isComposite( x:number )"],["base.isCoprime","base.isCoprime( a:number, b:number )"],["base.isEven","base.isEven( x:number )"],["base.isEvenInt32","base.isEvenInt32( x:integer )"],["base.isFinite","base.isFinite( x:number )"],["base.isFinitef","base.isFinitef( x:number )"],["base.isInfinite","base.isInfinite( x:number )"],["base.isInfinitef","base.isInfinitef( x:number )"],["base.isInteger","base.isInteger( x:number )"],["base.isnan","base.isnan( x:number )"],["base.isnanf","base.isnanf( x:number )"],["base.isNegativeInteger","base.isNegativeInteger( x:number )"],["base.isNegativeZero","base.isNegativeZero( x:number )"],["base.isNegativeZerof","base.isNegativeZerof( x:number )"],["base.isNonNegativeInteger","base.isNonNegativeInteger( x:number )"],["base.isNonPositiveInteger","base.isNonPositiveInteger( x:number )"],["base.isOdd","base.isOdd( x:number )"],["base.isOddInt32","base.isOddInt32( x:integer )"],["base.isPositiveInteger","base.isPositiveInteger( x:number )"],["base.isPositiveZero","base.isPositiveZero( x:number )"],["base.isPositiveZerof","base.isPositiveZerof( x:number )"],["base.isPow2Uint32","base.isPow2Uint32( x:integer )"],["base.isPrime","base.isPrime( x:number )"],["base.isProbability","base.isProbability( x:number )"],["base.isSafeInteger","base.isSafeInteger( x:number )"],["base.kernelBetainc","base.kernelBetainc( x:number, a:number, b:number, regularized:boolean, upper:boolean )"],["base.kernelBetainc.assign","base.kernelBetainc.assign( x:number, a:number, b:number, regularized:boolean, upper:boolean, out:Array|TypedArray|Object, stride:integer, offset:integer )"],["base.kernelBetaincinv","base.kernelBetaincinv( a:number, b:number, p:number, q:number )"],["base.kernelCos","base.kernelCos( x:number, y:number )"],["base.kernelSin","base.kernelSin( x:number, y:number )"],["base.kernelTan","base.kernelTan( x:number, y:number, k:integer )"],["base.kroneckerDelta","base.kroneckerDelta( i:number, j:number )"],["base.kroneckerDeltaf","base.kroneckerDeltaf( i:number, j:number )"],["base.labs","base.labs( x:integer )"],["base.lcm","base.lcm( a:integer, b:integer )"],["base.ldexp","base.ldexp( frac:number, exp:number )"],["base.ln","base.ln( x:number )"],["base.log","base.log( x:number, b:number )"],["base.log1mexp","base.log1mexp( x:number )"],["base.log1p","base.log1p( x:number )"],["base.log1pexp","base.log1pexp( x:number )"],["base.log2","base.log2( x:number )"],["base.log10","base.log10( x:number )"],["base.logaddexp","base.logaddexp( x:number, y:number )"],["base.logit","base.logit( p:number )"],["base.lucas","base.lucas( n:integer )"],["base.lucaspoly","base.lucaspoly( n:integer, x:number )"],["base.lucaspoly.factory","base.lucaspoly.factory( n:integer )"],["base.max","base.max( [x:number[, y:number[, ...args:number]]] )"],["base.maxabs","base.maxabs( [x:number[, y:number[, ...args:number]]] )"],["base.min","base.min( [x:number[, y:number[, ...args:number]]] )"],["base.minabs","base.minabs( [x:number[, y:number[, ...args:number]]] )"],["base.minmax","base.minmax( [out:Array|TypedArray|Object,] x:number[, y:number[, ...args:number]] )"],["base.minmaxabs","base.minmaxabs( [out:Array|TypedArray|Object,] x:number[, y:number[, ...args:number]] )"],["base.modf","base.modf( [out:Array|TypedArray|Object,] x:number )"],["base.mul","base.mul( x:number, y:number )"],["base.mulf","base.mulf( x:number, y:number )"],["base.ndarray","base.ndarray( dtype:string, buffer:ArrayLikeObject|TypedArray|Buffer, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offset:integer, order:string )"],["base.ndarray.prototype.byteLength","base.ndarray.prototype.byteLength"],["base.ndarray.prototype.BYTES_PER_ELEMENT","base.ndarray.prototype.BYTES_PER_ELEMENT"],["base.ndarray.prototype.data","base.ndarray.prototype.data"],["base.ndarray.prototype.dtype","base.ndarray.prototype.dtype"],["base.ndarray.prototype.flags","base.ndarray.prototype.flags"],["base.ndarray.prototype.length","base.ndarray.prototype.length"],["base.ndarray.prototype.ndims","base.ndarray.prototype.ndims"],["base.ndarray.prototype.offset","base.ndarray.prototype.offset"],["base.ndarray.prototype.order: string","base.ndarray.prototype.order: string"],["base.ndarray.prototype.shape","base.ndarray.prototype.shape"],["base.ndarray.prototype.strides","base.ndarray.prototype.strides"],["base.ndarray.prototype.get","base.ndarray.prototype.get( ...idx:integer )"],["base.ndarray.prototype.iget","base.ndarray.prototype.iget( idx:integer )"],["base.ndarray.prototype.set","base.ndarray.prototype.set( ...idx:integer, v:any )"],["base.ndarray.prototype.iset","base.ndarray.prototype.iset( idx:integer, v:any )"],["base.ndarray.prototype.toString","base.ndarray.prototype.toString()"],["base.ndarray.prototype.toJSON","base.ndarray.prototype.toJSON()"],["base.ndarrayUnary","base.ndarrayUnary( arrays:ArrayLikeObject<ndarray>, fcn:Function )"],["base.ndzeros","base.ndzeros( dtype:string, shape:ArrayLikeObject<integer>, order:string )"],["base.ndzerosLike","base.ndzerosLike( x:ndarray )"],["base.negafibonacci","base.negafibonacci( n:integer )"],["base.negalucas","base.negalucas( n:integer )"],["base.nonfibonacci","base.nonfibonacci( n:integer )"],["base.normalize","base.normalize( [out:Array|TypedArray|Object,] x:number )"],["base.normalizef","base.normalizef( [out:Array|TypedArray|Object,] x:float )"],["base.normhermitepoly","base.normhermitepoly( n:integer, x:number )"],["base.normhermitepoly.factory","base.normhermitepoly.factory( n:integer )"],["base.pdiff","base.pdiff( x:number, y:number )"],["base.pdifff","base.pdifff( x:number, y:number )"],["base.polygamma","base.polygamma( n:integer, x:number )"],["base.pow","base.pow( b:number, x:number )"],["base.powm1","base.powm1( b:number, x:number )"],["base.rad2deg","base.rad2deg( x:number )"],["base.ramp","base.ramp( x:number )"],["base.rampf","base.rampf( x:number )"],["base.random.arcsine","base.random.arcsine( a:number, b:number )"],["base.random.arcsine.factory","base.random.arcsine.factory( [a:number, b:number, ][options:Object] )"],["base.random.arcsine.NAME","base.random.arcsine.NAME"],["base.random.arcsine.PRNG","base.random.arcsine.PRNG"],["base.random.arcsine.seed","base.random.arcsine.seed"],["base.random.arcsine.seedLength","base.random.arcsine.seedLength"],["base.random.arcsine.state","base.random.arcsine.state"],["base.random.arcsine.stateLength","base.random.arcsine.stateLength"],["base.random.arcsine.byteLength","base.random.arcsine.byteLength"],["base.random.arcsine.toJSON","base.random.arcsine.toJSON()"],["base.random.bernoulli","base.random.bernoulli( p:number )"],["base.random.bernoulli.factory","base.random.bernoulli.factory( [p:number, ][options:Object] )"],["base.random.bernoulli.NAME","base.random.bernoulli.NAME"],["base.random.bernoulli.PRNG","base.random.bernoulli.PRNG"],["base.random.bernoulli.seed","base.random.bernoulli.seed"],["base.random.bernoulli.seedLength","base.random.bernoulli.seedLength"],["base.random.bernoulli.state","base.random.bernoulli.state"],["base.random.bernoulli.stateLength","base.random.bernoulli.stateLength"],["base.random.bernoulli.byteLength","base.random.bernoulli.byteLength"],["base.random.bernoulli.toJSON","base.random.bernoulli.toJSON()"],["base.random.beta","base.random.beta( α:number, β:number )"],["base.random.beta.factory","base.random.beta.factory( [α:number, β:number, ][options:Object] )"],["base.random.beta.NAME","base.random.beta.NAME"],["base.random.beta.PRNG","base.random.beta.PRNG"],["base.random.beta.seed","base.random.beta.seed"],["base.random.beta.seedLength","base.random.beta.seedLength"],["base.random.beta.state","base.random.beta.state"],["base.random.beta.stateLength","base.random.beta.stateLength"],["base.random.beta.byteLength","base.random.beta.byteLength"],["base.random.beta.toJSON","base.random.beta.toJSON()"],["base.random.betaprime","base.random.betaprime( α:number, β:number )"],["base.random.betaprime.factory","base.random.betaprime.factory( [α:number, β:number, ][options:Object] )"],["base.random.betaprime.NAME","base.random.betaprime.NAME"],["base.random.betaprime.PRNG","base.random.betaprime.PRNG"],["base.random.betaprime.seed","base.random.betaprime.seed"],["base.random.betaprime.seedLength","base.random.betaprime.seedLength"],["base.random.betaprime.state","base.random.betaprime.state"],["base.random.betaprime.stateLength","base.random.betaprime.stateLength"],["base.random.betaprime.byteLength","base.random.betaprime.byteLength"],["base.random.betaprime.toJSON","base.random.betaprime.toJSON()"],["base.random.binomial","base.random.binomial( n:integer, p:number )"],["base.random.binomial.factory","base.random.binomial.factory( [n:integer, p:number, ][options:Object] )"],["base.random.binomial.NAME","base.random.binomial.NAME"],["base.random.binomial.PRNG","base.random.binomial.PRNG"],["base.random.binomial.seed","base.random.binomial.seed"],["base.random.binomial.seedLength","base.random.binomial.seedLength"],["base.random.binomial.state","base.random.binomial.state"],["base.random.binomial.stateLength","base.random.binomial.stateLength"],["base.random.binomial.byteLength","base.random.binomial.byteLength"],["base.random.binomial.toJSON","base.random.binomial.toJSON()"],["base.random.boxMuller","base.random.boxMuller()"],["base.random.boxMuller.factory","base.random.boxMuller.factory( [options:Object] )"],["base.random.boxMuller.NAME","base.random.boxMuller.NAME"],["base.random.boxMuller.PRNG","base.random.boxMuller.PRNG"],["base.random.boxMuller.seed","base.random.boxMuller.seed"],["base.random.boxMuller.seedLength","base.random.boxMuller.seedLength"],["base.random.boxMuller.state","base.random.boxMuller.state"],["base.random.boxMuller.stateLength","base.random.boxMuller.stateLength"],["base.random.boxMuller.byteLength","base.random.boxMuller.byteLength"],["base.random.boxMuller.toJSON","base.random.boxMuller.toJSON()"],["base.random.cauchy","base.random.cauchy( x0:number, Ɣ:number )"],["base.random.cauchy.factory","base.random.cauchy.factory( [x0:number, Ɣ:number, ][options:Object] )"],["base.random.cauchy.NAME","base.random.cauchy.NAME"],["base.random.cauchy.PRNG","base.random.cauchy.PRNG"],["base.random.cauchy.seed","base.random.cauchy.seed"],["base.random.cauchy.seedLength","base.random.cauchy.seedLength"],["base.random.cauchy.state","base.random.cauchy.state"],["base.random.cauchy.stateLength","base.random.cauchy.stateLength"],["base.random.cauchy.byteLength","base.random.cauchy.byteLength"],["base.random.cauchy.toJSON","base.random.cauchy.toJSON()"],["base.random.chi","base.random.chi( k:number )"],["base.random.chi.factory","base.random.chi.factory( [k:number, ][options:Object] )"],["base.random.chi.NAME","base.random.chi.NAME"],["base.random.chi.PRNG","base.random.chi.PRNG"],["base.random.chi.seed","base.random.chi.seed"],["base.random.chi.seedLength","base.random.chi.seedLength"],["base.random.chi.state","base.random.chi.state"],["base.random.chi.stateLength","base.random.chi.stateLength"],["base.random.chi.byteLength","base.random.chi.byteLength"],["base.random.chi.toJSON","base.random.chi.toJSON()"],["base.random.chisquare","base.random.chisquare( k:number )"],["base.random.chisquare.factory","base.random.chisquare.factory( [k:number, ][options:Object] )"],["base.random.chisquare.NAME","base.random.chisquare.NAME"],["base.random.chisquare.PRNG","base.random.chisquare.PRNG"],["base.random.chisquare.seed","base.random.chisquare.seed"],["base.random.chisquare.seedLength","base.random.chisquare.seedLength"],["base.random.chisquare.state","base.random.chisquare.state"],["base.random.chisquare.stateLength","base.random.chisquare.stateLength"],["base.random.chisquare.byteLength","base.random.chisquare.byteLength"],["base.random.chisquare.toJSON","base.random.chisquare.toJSON()"],["base.random.cosine","base.random.cosine( μ:number, s:number )"],["base.random.cosine.factory","base.random.cosine.factory( [μ:number, s:number, ][options:Object] )"],["base.random.cosine.NAME","base.random.cosine.NAME"],["base.random.cosine.PRNG","base.random.cosine.PRNG"],["base.random.cosine.seed","base.random.cosine.seed"],["base.random.cosine.seedLength","base.random.cosine.seedLength"],["base.random.cosine.state","base.random.cosine.state"],["base.random.cosine.stateLength","base.random.cosine.stateLength"],["base.random.cosine.byteLength","base.random.cosine.byteLength"],["base.random.cosine.toJSON","base.random.cosine.toJSON()"],["base.random.discreteUniform","base.random.discreteUniform( a:integer, b:integer )"],["base.random.discreteUniform.factory","base.random.discreteUniform.factory( [a:integer, b:integer, ][options:Object] )"],["base.random.discreteUniform.NAME","base.random.discreteUniform.NAME"],["base.random.discreteUniform.PRNG","base.random.discreteUniform.PRNG"],["base.random.discreteUniform.seed","base.random.discreteUniform.seed"],["base.random.discreteUniform.seedLength","base.random.discreteUniform.seedLength"],["base.random.discreteUniform.state","base.random.discreteUniform.state"],["base.random.discreteUniform.stateLength","base.random.discreteUniform.stateLength"],["base.random.discreteUniform.byteLength","base.random.discreteUniform.byteLength"],["base.random.discreteUniform.toJSON","base.random.discreteUniform.toJSON()"],["base.random.erlang","base.random.erlang( k:integer, λ:number )"],["base.random.erlang.factory","base.random.erlang.factory( [k:integer, λ:number, ][options:Object] )"],["base.random.erlang.NAME","base.random.erlang.NAME"],["base.random.erlang.PRNG","base.random.erlang.PRNG"],["base.random.erlang.seed","base.random.erlang.seed"],["base.random.erlang.seedLength","base.random.erlang.seedLength"],["base.random.erlang.state","base.random.erlang.state"],["base.random.erlang.stateLength","base.random.erlang.stateLength"],["base.random.erlang.byteLength","base.random.erlang.byteLength"],["base.random.erlang.toJSON","base.random.erlang.toJSON()"],["base.random.exponential","base.random.exponential( λ:number )"],["base.random.exponential.factory","base.random.exponential.factory( [λ:number, ][options:Object] )"],["base.random.exponential.NAME","base.random.exponential.NAME"],["base.random.exponential.PRNG","base.random.exponential.PRNG"],["base.random.exponential.seed","base.random.exponential.seed"],["base.random.exponential.seedLength","base.random.exponential.seedLength"],["base.random.exponential.state","base.random.exponential.state"],["base.random.exponential.stateLength","base.random.exponential.stateLength"],["base.random.exponential.byteLength","base.random.exponential.byteLength"],["base.random.exponential.toJSON","base.random.exponential.toJSON()"],["base.random.f","base.random.f( d1:number, d2:number )"],["base.random.f.factory","base.random.f.factory( [d1:number, d2:number, ][options:Object] )"],["base.random.f.NAME","base.random.f.NAME"],["base.random.f.PRNG","base.random.f.PRNG"],["base.random.f.seed","base.random.f.seed"],["base.random.f.seedLength","base.random.f.seedLength"],["base.random.f.state","base.random.f.state"],["base.random.f.stateLength","base.random.f.stateLength"],["base.random.f.byteLength","base.random.f.byteLength"],["base.random.f.toJSON","base.random.f.toJSON()"],["base.random.frechet","base.random.frechet( α:number, s:number, m:number )"],["base.random.frechet.factory","base.random.frechet.factory( [α:number, s:number, m:number, ][options:Object] )"],["base.random.frechet.NAME","base.random.frechet.NAME"],["base.random.frechet.PRNG","base.random.frechet.PRNG"],["base.random.frechet.seed","base.random.frechet.seed"],["base.random.frechet.seedLength","base.random.frechet.seedLength"],["base.random.frechet.state","base.random.frechet.state"],["base.random.frechet.stateLength","base.random.frechet.stateLength"],["base.random.frechet.byteLength","base.random.frechet.byteLength"],["base.random.frechet.toJSON","base.random.frechet.toJSON()"],["base.random.gamma","base.random.gamma( α:number, β:number )"],["base.random.gamma.factory","base.random.gamma.factory( [α:number, β:number, ][options:Object] )"],["base.random.gamma.NAME","base.random.gamma.NAME"],["base.random.gamma.PRNG","base.random.gamma.PRNG"],["base.random.gamma.seed","base.random.gamma.seed"],["base.random.gamma.seedLength","base.random.gamma.seedLength"],["base.random.gamma.state","base.random.gamma.state"],["base.random.gamma.stateLength","base.random.gamma.stateLength"],["base.random.gamma.byteLength","base.random.gamma.byteLength"],["base.random.gamma.toJSON","base.random.gamma.toJSON()"],["base.random.geometric","base.random.geometric( p:number )"],["base.random.geometric.factory","base.random.geometric.factory( [p:number, ][options:Object] )"],["base.random.geometric.NAME","base.random.geometric.NAME"],["base.random.geometric.PRNG","base.random.geometric.PRNG"],["base.random.geometric.seed","base.random.geometric.seed"],["base.random.geometric.seedLength","base.random.geometric.seedLength"],["base.random.geometric.state","base.random.geometric.state"],["base.random.geometric.stateLength","base.random.geometric.stateLength"],["base.random.geometric.byteLength","base.random.geometric.byteLength"],["base.random.geometric.toJSON","base.random.geometric.toJSON()"],["base.random.gumbel","base.random.gumbel( μ:number, β:number )"],["base.random.gumbel.factory","base.random.gumbel.factory( [μ:number, β:number, ][options:Object] )"],["base.random.gumbel.NAME","base.random.gumbel.NAME"],["base.random.gumbel.PRNG","base.random.gumbel.PRNG"],["base.random.gumbel.seed","base.random.gumbel.seed"],["base.random.gumbel.seedLength","base.random.gumbel.seedLength"],["base.random.gumbel.state","base.random.gumbel.state"],["base.random.gumbel.stateLength","base.random.gumbel.stateLength"],["base.random.gumbel.byteLength","base.random.gumbel.byteLength"],["base.random.gumbel.toJSON","base.random.gumbel.toJSON()"],["base.random.hypergeometric","base.random.hypergeometric( N:integer, K:integer, n:integer )"],["base.random.hypergeometric.factory","base.random.hypergeometric.factory( [N:integer, K:integer, n:integer, ][options:Object] )"],["base.random.hypergeometric.NAME","base.random.hypergeometric.NAME"],["base.random.hypergeometric.PRNG","base.random.hypergeometric.PRNG"],["base.random.hypergeometric.seed","base.random.hypergeometric.seed"],["base.random.hypergeometric.seedLength","base.random.hypergeometric.seedLength"],["base.random.hypergeometric.state","base.random.hypergeometric.state"],["base.random.hypergeometric.stateLength","base.random.hypergeometric.stateLength"],["base.random.hypergeometric.byteLength","base.random.hypergeometric.byteLength"],["base.random.hypergeometric.toJSON","base.random.hypergeometric.toJSON()"],["base.random.improvedZiggurat","base.random.improvedZiggurat()"],["base.random.improvedZiggurat.factory","base.random.improvedZiggurat.factory( [options:Object] )"],["base.random.improvedZiggurat.NAME","base.random.improvedZiggurat.NAME"],["base.random.improvedZiggurat.PRNG","base.random.improvedZiggurat.PRNG"],["base.random.improvedZiggurat.seed","base.random.improvedZiggurat.seed"],["base.random.improvedZiggurat.seedLength","base.random.improvedZiggurat.seedLength"],["base.random.improvedZiggurat.state","base.random.improvedZiggurat.state"],["base.random.improvedZiggurat.stateLength","base.random.improvedZiggurat.stateLength"],["base.random.improvedZiggurat.byteLength","base.random.improvedZiggurat.byteLength"],["base.random.improvedZiggurat.toJSON","base.random.improvedZiggurat.toJSON()"],["base.random.invgamma","base.random.invgamma( α:number, β:number )"],["base.random.invgamma.factory","base.random.invgamma.factory( [α:number, β:number, ][options:Object] )"],["base.random.invgamma.NAME","base.random.invgamma.NAME"],["base.random.invgamma.PRNG","base.random.invgamma.PRNG"],["base.random.invgamma.seed","base.random.invgamma.seed"],["base.random.invgamma.seedLength","base.random.invgamma.seedLength"],["base.random.invgamma.state","base.random.invgamma.state"],["base.random.invgamma.stateLength","base.random.invgamma.stateLength"],["base.random.invgamma.byteLength","base.random.invgamma.byteLength"],["base.random.invgamma.toJSON","base.random.invgamma.toJSON()"],["base.random.kumaraswamy","base.random.kumaraswamy( a:number, b:number )"],["base.random.kumaraswamy.factory","base.random.kumaraswamy.factory( [a:number, b:number, ][options:Object] )"],["base.random.kumaraswamy.NAME","base.random.kumaraswamy.NAME"],["base.random.kumaraswamy.PRNG","base.random.kumaraswamy.PRNG"],["base.random.kumaraswamy.seed","base.random.kumaraswamy.seed"],["base.random.kumaraswamy.seedLength","base.random.kumaraswamy.seedLength"],["base.random.kumaraswamy.state","base.random.kumaraswamy.state"],["base.random.kumaraswamy.stateLength","base.random.kumaraswamy.stateLength"],["base.random.kumaraswamy.byteLength","base.random.kumaraswamy.byteLength"],["base.random.kumaraswamy.toJSON","base.random.kumaraswamy.toJSON()"],["base.random.laplace","base.random.laplace( μ:number, b:number )"],["base.random.laplace.factory","base.random.laplace.factory( [μ:number, b:number, ][options:Object] )"],["base.random.laplace.NAME","base.random.laplace.NAME"],["base.random.laplace.PRNG","base.random.laplace.PRNG"],["base.random.laplace.seed","base.random.laplace.seed"],["base.random.laplace.seedLength","base.random.laplace.seedLength"],["base.random.laplace.state","base.random.laplace.state"],["base.random.laplace.stateLength","base.random.laplace.stateLength"],["base.random.laplace.byteLength","base.random.laplace.byteLength"],["base.random.laplace.toJSON","base.random.laplace.toJSON()"],["base.random.levy","base.random.levy( μ:number, c:number )"],["base.random.levy.factory","base.random.levy.factory( [μ:number, c:number, ][options:Object] )"],["base.random.levy.NAME","base.random.levy.NAME"],["base.random.levy.PRNG","base.random.levy.PRNG"],["base.random.levy.seed","base.random.levy.seed"],["base.random.levy.seedLength","base.random.levy.seedLength"],["base.random.levy.state","base.random.levy.state"],["base.random.levy.stateLength","base.random.levy.stateLength"],["base.random.levy.byteLength","base.random.levy.byteLength"],["base.random.levy.toJSON","base.random.levy.toJSON()"],["base.random.logistic","base.random.logistic( μ:number, s:number )"],["base.random.logistic.factory","base.random.logistic.factory( [μ:number, s:number, ][options:Object] )"],["base.random.logistic.NAME","base.random.logistic.NAME"],["base.random.logistic.PRNG","base.random.logistic.PRNG"],["base.random.logistic.seed","base.random.logistic.seed"],["base.random.logistic.seedLength","base.random.logistic.seedLength"],["base.random.logistic.state","base.random.logistic.state"],["base.random.logistic.stateLength","base.random.logistic.stateLength"],["base.random.logistic.byteLength","base.random.logistic.byteLength"],["base.random.logistic.toJSON","base.random.logistic.toJSON()"],["base.random.lognormal","base.random.lognormal( μ:number, σ:number )"],["base.random.lognormal.factory","base.random.lognormal.factory( [μ:number, σ:number, ][options:Object] )"],["base.random.lognormal.NAME","base.random.lognormal.NAME"],["base.random.lognormal.PRNG","base.random.lognormal.PRNG"],["base.random.lognormal.seed","base.random.lognormal.seed"],["base.random.lognormal.seedLength","base.random.lognormal.seedLength"],["base.random.lognormal.state","base.random.lognormal.state"],["base.random.lognormal.stateLength","base.random.lognormal.stateLength"],["base.random.lognormal.byteLength","base.random.lognormal.byteLength"],["base.random.lognormal.toJSON","base.random.lognormal.toJSON()"],["base.random.minstd","base.random.minstd()"],["base.random.minstd.normalized","base.random.minstd.normalized()"],["base.random.minstd.factory","base.random.minstd.factory( [options:Object] )"],["base.random.minstd.NAME","base.random.minstd.NAME"],["base.random.minstd.MIN","base.random.minstd.MIN"],["base.random.minstd.MAX","base.random.minstd.MAX"],["base.random.minstd.seed","base.random.minstd.seed"],["base.random.minstd.seedLength","base.random.minstd.seedLength"],["base.random.minstd.state","base.random.minstd.state"],["base.random.minstd.stateLength","base.random.minstd.stateLength"],["base.random.minstd.byteLength","base.random.minstd.byteLength"],["base.random.minstd.toJSON","base.random.minstd.toJSON()"],["base.random.minstdShuffle","base.random.minstdShuffle()"],["base.random.minstdShuffle.normalized","base.random.minstdShuffle.normalized()"],["base.random.minstdShuffle.factory","base.random.minstdShuffle.factory( [options:Object] )"],["base.random.minstdShuffle.NAME","base.random.minstdShuffle.NAME"],["base.random.minstdShuffle.MIN","base.random.minstdShuffle.MIN"],["base.random.minstdShuffle.MAX","base.random.minstdShuffle.MAX"],["base.random.minstdShuffle.seed","base.random.minstdShuffle.seed"],["base.random.minstdShuffle.seedLength","base.random.minstdShuffle.seedLength"],["base.random.minstdShuffle.state","base.random.minstdShuffle.state"],["base.random.minstdShuffle.stateLength","base.random.minstdShuffle.stateLength"],["base.random.minstdShuffle.byteLength","base.random.minstdShuffle.byteLength"],["base.random.minstdShuffle.toJSON","base.random.minstdShuffle.toJSON()"],["base.random.mt19937","base.random.mt19937()"],["base.random.mt19937.normalized","base.random.mt19937.normalized()"],["base.random.mt19937.factory","base.random.mt19937.factory( [options:Object] )"],["base.random.mt19937.NAME","base.random.mt19937.NAME"],["base.random.mt19937.MIN","base.random.mt19937.MIN"],["base.random.mt19937.MAX","base.random.mt19937.MAX"],["base.random.mt19937.seed","base.random.mt19937.seed"],["base.random.mt19937.seedLength","base.random.mt19937.seedLength"],["base.random.mt19937.state","base.random.mt19937.state"],["base.random.mt19937.stateLength","base.random.mt19937.stateLength"],["base.random.mt19937.byteLength","base.random.mt19937.byteLength"],["base.random.mt19937.toJSON","base.random.mt19937.toJSON()"],["base.random.negativeBinomial","base.random.negativeBinomial( r:number, p:number )"],["base.random.negativeBinomial.factory","base.random.negativeBinomial.factory( [r:number, p:number, ][options:Object] )"],["base.random.negativeBinomial.NAME","base.random.negativeBinomial.NAME"],["base.random.negativeBinomial.PRNG","base.random.negativeBinomial.PRNG"],["base.random.negativeBinomial.seed","base.random.negativeBinomial.seed"],["base.random.negativeBinomial.seedLength","base.random.negativeBinomial.seedLength"],["base.random.negativeBinomial.state","base.random.negativeBinomial.state"],["base.random.negativeBinomial.stateLength","base.random.negativeBinomial.stateLength"],["base.random.negativeBinomial.byteLength","base.random.negativeBinomial.byteLength"],["base.random.negativeBinomial.toJSON","base.random.negativeBinomial.toJSON()"],["base.random.normal","base.random.normal( μ:number, σ:number )"],["base.random.normal.factory","base.random.normal.factory( [μ:number, σ:number, ][options:Object] )"],["base.random.normal.NAME","base.random.normal.NAME"],["base.random.normal.PRNG","base.random.normal.PRNG"],["base.random.normal.seed","base.random.normal.seed"],["base.random.normal.seedLength","base.random.normal.seedLength"],["base.random.normal.state","base.random.normal.state"],["base.random.normal.stateLength","base.random.normal.stateLength"],["base.random.normal.byteLength","base.random.normal.byteLength"],["base.random.normal.toJSON","base.random.normal.toJSON()"],["base.random.pareto1","base.random.pareto1( α:number, β:number )"],["base.random.pareto1.factory","base.random.pareto1.factory( [α:number, β:number, ][options:Object] )"],["base.random.pareto1.NAME","base.random.pareto1.NAME"],["base.random.pareto1.PRNG","base.random.pareto1.PRNG"],["base.random.pareto1.seed","base.random.pareto1.seed"],["base.random.pareto1.seedLength","base.random.pareto1.seedLength"],["base.random.pareto1.state","base.random.pareto1.state"],["base.random.pareto1.stateLength","base.random.pareto1.stateLength"],["base.random.pareto1.byteLength","base.random.pareto1.byteLength"],["base.random.pareto1.toJSON","base.random.pareto1.toJSON()"],["base.random.poisson","base.random.poisson( λ:number )"],["base.random.poisson.factory","base.random.poisson.factory( [λ:number, ][options:Object] )"],["base.random.poisson.NAME","base.random.poisson.NAME"],["base.random.poisson.PRNG","base.random.poisson.PRNG"],["base.random.poisson.seed","base.random.poisson.seed"],["base.random.poisson.seedLength","base.random.poisson.seedLength"],["base.random.poisson.state","base.random.poisson.state"],["base.random.poisson.stateLength","base.random.poisson.stateLength"],["base.random.poisson.byteLength","base.random.poisson.byteLength"],["base.random.poisson.toJSON","base.random.poisson.toJSON()"],["base.random.randi","base.random.randi()"],["base.random.randi.factory","base.random.randi.factory( [options:Object] )"],["base.random.randi.NAME","base.random.randi.NAME"],["base.random.randi.PRNG","base.random.randi.PRNG"],["base.random.randi.MIN","base.random.randi.MIN"],["base.random.randi.MAX","base.random.randi.MAX"],["base.random.randi.seed","base.random.randi.seed"],["base.random.randi.seedLength","base.random.randi.seedLength"],["base.random.randi.state","base.random.randi.state"],["base.random.randi.stateLength","base.random.randi.stateLength"],["base.random.randi.byteLength","base.random.randi.byteLength"],["base.random.randi.toJSON","base.random.randi.toJSON()"],["base.random.randn","base.random.randn()"],["base.random.randn.factory","base.random.randn.factory( [options:Object] )"],["base.random.randn.NAME","base.random.randn.NAME"],["base.random.randn.PRNG","base.random.randn.PRNG"],["base.random.randn.seed","base.random.randn.seed"],["base.random.randn.seedLength","base.random.randn.seedLength"],["base.random.randn.state","base.random.randn.state"],["base.random.randn.stateLength","base.random.randn.stateLength"],["base.random.randn.byteLength","base.random.randn.byteLength"],["base.random.randn.toJSON","base.random.randn.toJSON()"],["base.random.randu","base.random.randu()"],["base.random.randu.factory","base.random.randu.factory( [options:Object] )"],["base.random.randu.NAME","base.random.randu.NAME"],["base.random.randu.PRNG","base.random.randu.PRNG"],["base.random.randu.MIN","base.random.randu.MIN"],["base.random.randu.MAX","base.random.randu.MAX"],["base.random.randu.seed","base.random.randu.seed"],["base.random.randu.seedLength","base.random.randu.seedLength"],["base.random.randu.state","base.random.randu.state"],["base.random.randu.stateLength","base.random.randu.stateLength"],["base.random.randu.byteLength","base.random.randu.byteLength"],["base.random.randu.toJSON","base.random.randu.toJSON()"],["base.random.rayleigh","base.random.rayleigh( σ:number )"],["base.random.rayleigh.factory","base.random.rayleigh.factory( [σ:number, ][options:Object] )"],["base.random.rayleigh.NAME","base.random.rayleigh.NAME"],["base.random.rayleigh.PRNG","base.random.rayleigh.PRNG"],["base.random.rayleigh.seed","base.random.rayleigh.seed"],["base.random.rayleigh.seedLength","base.random.rayleigh.seedLength"],["base.random.rayleigh.state","base.random.rayleigh.state"],["base.random.rayleigh.stateLength","base.random.rayleigh.stateLength"],["base.random.rayleigh.byteLength","base.random.rayleigh.byteLength"],["base.random.rayleigh.toJSON","base.random.rayleigh.toJSON()"],["base.random.t","base.random.t( v:number )"],["base.random.t.factory","base.random.t.factory( [v:number, ][options:Object] )"],["base.random.t.NAME","base.random.t.NAME"],["base.random.t.PRNG","base.random.t.PRNG"],["base.random.t.seed","base.random.t.seed"],["base.random.t.seedLength","base.random.t.seedLength"],["base.random.t.state","base.random.t.state"],["base.random.t.stateLength","base.random.t.stateLength"],["base.random.t.byteLength","base.random.t.byteLength"],["base.random.t.toJSON","base.random.t.toJSON()"],["base.random.triangular","base.random.triangular( a:number, b:number, c:number )"],["base.random.triangular.factory","base.random.triangular.factory( [a:number, b:number, c:number, ][options:Object] )"],["base.random.triangular.NAME","base.random.triangular.NAME"],["base.random.triangular.PRNG","base.random.triangular.PRNG"],["base.random.triangular.seed","base.random.triangular.seed"],["base.random.triangular.seedLength","base.random.triangular.seedLength"],["base.random.triangular.state","base.random.triangular.state"],["base.random.triangular.stateLength","base.random.triangular.stateLength"],["base.random.triangular.byteLength","base.random.triangular.byteLength"],["base.random.triangular.toJSON","base.random.triangular.toJSON()"],["base.random.uniform","base.random.uniform( a:number, b:number )"],["base.random.uniform.factory","base.random.uniform.factory( [a:number, b:number, ][options:Object] )"],["base.random.uniform.NAME","base.random.uniform.NAME"],["base.random.uniform.PRNG","base.random.uniform.PRNG"],["base.random.uniform.seed","base.random.uniform.seed"],["base.random.uniform.seedLength","base.random.uniform.seedLength"],["base.random.uniform.state","base.random.uniform.state"],["base.random.uniform.stateLength","base.random.uniform.stateLength"],["base.random.uniform.byteLength","base.random.uniform.byteLength"],["base.random.uniform.toJSON","base.random.uniform.toJSON()"],["base.random.weibull","base.random.weibull( k:number, λ:number )"],["base.random.weibull.factory","base.random.weibull.factory( [k:number, λ:number, ][options:Object] )"],["base.random.weibull.NAME","base.random.weibull.NAME"],["base.random.weibull.PRNG","base.random.weibull.PRNG"],["base.random.weibull.seed","base.random.weibull.seed"],["base.random.weibull.seedLength","base.random.weibull.seedLength"],["base.random.weibull.state","base.random.weibull.state"],["base.random.weibull.stateLength","base.random.weibull.stateLength"],["base.random.weibull.byteLength","base.random.weibull.byteLength"],["base.random.weibull.toJSON","base.random.weibull.toJSON()"],["base.reldiff","base.reldiff( x:number, y:number[, scale:string|Function] )"],["base.rempio2","base.rempio2( x:number, y:Array|TypedArray|Object )"],["base.risingFactorial","base.risingFactorial( x:number, n:integer )"],["base.rotl32","base.rotl32( x:integer, shift:integer )"],["base.rotr32","base.rotr32( x:integer, shift:integer )"],["base.round","base.round( x:number )"],["base.round2","base.round2( x:number )"],["base.round10","base.round10( x:number )"],["base.roundb","base.roundb( x:number, n:integer, b:integer )"],["base.roundn","base.roundn( x:number, n:integer )"],["base.roundsd","base.roundsd( x:number, n:integer[, b:integer] )"],["base.rsqrt","base.rsqrt( x:number )"],["base.rsqrtf","base.rsqrtf( x:number )"],["base.scalar2ndarray","base.scalar2ndarray( value:any, dtype:string )"],["base.setHighWord","base.setHighWord( x:number, high:integer )"],["base.setLowWord","base.setLowWord( x:number, low:integer )"],["base.sici","base.sici( [out:Array|TypedArray|Object,] x:number )"],["base.signbit","base.signbit( x:number )"],["base.signbitf","base.signbitf( x:float )"],["base.significandf","base.significandf( x:float )"],["base.signum","base.signum( x:number )"],["base.signumf","base.signumf( x:number )"],["base.sin","base.sin( x:number )"],["base.sinc","base.sinc( x:number )"],["base.sincos","base.sincos( [out:Array|TypedArray|Object,] x:number )"],["base.sincospi","base.sincospi( [out:Array|TypedArray|Object,] x:number )"],["base.sinh","base.sinh( x:number )"],["base.sinpi","base.sinpi( x:number )"],["base.spence","base.spence( x:number )"],["base.sqrt","base.sqrt( x:number )"],["base.sqrt1pm1","base.sqrt1pm1( x:number )"],["base.sqrtf","base.sqrtf( x:number )"],["base.strided.binary","base.strided.binary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.binary.ndarray","base.strided.binary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.ccopy","base.strided.ccopy( N:integer, x:Complex64Array, strideX:integer, y:Complex64Array, strideY:integer )"],["base.strided.ccopy.ndarray","base.strided.ccopy.ndarray( N:integer, x:Complex64Array, strideX:integer, offsetX:integer, y:Complex64Array, strideY:integer, offsetY:integer )"],["base.strided.cmap","base.strided.cmap( N:integer, x:Complex64Array, strideX:integer, y:Complex64Array, strideY:integer, fcn:Function )"],["base.strided.cmap.ndarray","base.strided.cmap.ndarray( N:integer, x:Complex64Array, strideX:integer, offsetX:integer, y:Complex64Array, strideY:integer, offsetY:integer, fcn:Function )"],["base.strided.cswap","base.strided.cswap( N:integer, x:Complex64Array, strideX:integer, y:Complex64Array, strideY:integer )"],["base.strided.cswap.ndarray","base.strided.cswap.ndarray( N:integer, x:Complex64Array, strideX:integer, offsetX:integer, y:Complex64Array, strideY:integer, offsetY:integer )"],["base.strided.cumax","base.strided.cumax( N:integer, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.cumax.ndarray","base.strided.cumax.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.cumaxabs","base.strided.cumaxabs( N:integer, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.cumaxabs.ndarray","base.strided.cumaxabs.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.cumin","base.strided.cumin( N:integer, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.cumin.ndarray","base.strided.cumin.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.cuminabs","base.strided.cuminabs( N:integer, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.cuminabs.ndarray","base.strided.cuminabs.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.dabs","base.strided.dabs( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dabs.ndarray","base.strided.dabs.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dabs2","base.strided.dabs2( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dabs2.ndarray","base.strided.dabs2.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dapx","base.strided.dapx( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dapx.ndarray","base.strided.dapx.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dapxsum","base.strided.dapxsum( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dapxsum.ndarray","base.strided.dapxsum.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dapxsumkbn","base.strided.dapxsumkbn( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dapxsumkbn.ndarray","base.strided.dapxsumkbn.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dapxsumkbn2","base.strided.dapxsumkbn2( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dapxsumkbn2.ndarray","base.strided.dapxsumkbn2.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dapxsumors","base.strided.dapxsumors( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dapxsumors.ndarray","base.strided.dapxsumors.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dapxsumpw","base.strided.dapxsumpw( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dapxsumpw.ndarray","base.strided.dapxsumpw.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dasum","base.strided.dasum( N:integer, x:Float64Array, stride:integer )"],["base.strided.dasum.ndarray","base.strided.dasum.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dasumpw","base.strided.dasumpw( N:integer, x:Float64Array, stride:integer )"],["base.strided.dasumpw.ndarray","base.strided.dasumpw.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.daxpy","base.strided.daxpy( N:integer, alpha:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.daxpy.ndarray","base.strided.daxpy.ndarray( N:integer, alpha:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcbrt","base.strided.dcbrt( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcbrt.ndarray","base.strided.dcbrt.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dceil","base.strided.dceil( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dceil.ndarray","base.strided.dceil.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcopy","base.strided.dcopy( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcopy.ndarray","base.strided.dcopy.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcumax","base.strided.dcumax( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcumax.ndarray","base.strided.dcumax.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcumaxabs","base.strided.dcumaxabs( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcumaxabs.ndarray","base.strided.dcumaxabs.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcumin","base.strided.dcumin( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcumin.ndarray","base.strided.dcumin.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcuminabs","base.strided.dcuminabs( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcuminabs.ndarray","base.strided.dcuminabs.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcusum","base.strided.dcusum( N:integer, sum:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcusum.ndarray","base.strided.dcusum.ndarray( N:integer, sum:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcusumkbn","base.strided.dcusumkbn( N:integer, sum:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcusumkbn.ndarray","base.strided.dcusumkbn.ndarray( N:integer, sum:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcusumkbn2","base.strided.dcusumkbn2( N:integer, sum:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcusumkbn2.ndarray","base.strided.dcusumkbn2.ndarray( N:integer, sum:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcusumors","base.strided.dcusumors( N:integer, sum:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcusumors.ndarray","base.strided.dcusumors.ndarray( N:integer, sum:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dcusumpw","base.strided.dcusumpw( N:integer, sum:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dcusumpw.ndarray","base.strided.dcusumpw.ndarray( N:integer, sum:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.ddeg2rad","base.strided.ddeg2rad( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.ddeg2rad.ndarray","base.strided.ddeg2rad.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.ddot","base.strided.ddot( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.ddot.ndarray","base.strided.ddot.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dfill","base.strided.dfill( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dfill.ndarray","base.strided.dfill.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dfloor","base.strided.dfloor( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dfloor.ndarray","base.strided.dfloor.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dinv","base.strided.dinv( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dinv.ndarray","base.strided.dinv.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dmap","base.strided.dmap( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer, fcn:Function )"],["base.strided.dmap.ndarray","base.strided.dmap.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer, fcn:Function )"],["base.strided.dmap2","base.strided.dmap2( N:integer, x:Float64Array, sx:integer, y:Float64Array, sy:integer, z:Float64Array, sz:integer, fcn:Function )"],["base.strided.dmap2.ndarray","base.strided.dmap2.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, y:Float64Array, sy:integer, oy:integer, z:Float64Array, sz:integer, oz:integer, fcn:Function )"],["base.strided.dmax","base.strided.dmax( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmax.ndarray","base.strided.dmax.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmaxabs","base.strided.dmaxabs( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmaxabs.ndarray","base.strided.dmaxabs.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmaxabssorted","base.strided.dmaxabssorted( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmaxabssorted.ndarray","base.strided.dmaxabssorted.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmaxsorted","base.strided.dmaxsorted( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmaxsorted.ndarray","base.strided.dmaxsorted.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmean","base.strided.dmean( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmean.ndarray","base.strided.dmean.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeankbn","base.strided.dmeankbn( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeankbn.ndarray","base.strided.dmeankbn.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeankbn2","base.strided.dmeankbn2( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeankbn2.ndarray","base.strided.dmeankbn2.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeanli","base.strided.dmeanli( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeanli.ndarray","base.strided.dmeanli.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeanlipw","base.strided.dmeanlipw( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeanlipw.ndarray","base.strided.dmeanlipw.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeanors","base.strided.dmeanors( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeanors.ndarray","base.strided.dmeanors.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeanpn","base.strided.dmeanpn( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeanpn.ndarray","base.strided.dmeanpn.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeanpw","base.strided.dmeanpw( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeanpw.ndarray","base.strided.dmeanpw.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmeanstdev","base.strided.dmeanstdev( N:integer, c:number, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dmeanstdev.ndarray","base.strided.dmeanstdev.ndarray( N:integer, c:number, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dmeanstdevpn","base.strided.dmeanstdevpn( N:integer, c:number, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dmeanstdevpn.ndarray","base.strided.dmeanstdevpn.ndarray( N:integer, c:number, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dmeanvar","base.strided.dmeanvar( N:integer, c:number, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dmeanvar.ndarray","base.strided.dmeanvar.ndarray( N:integer, c:number, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dmeanvarpn","base.strided.dmeanvarpn( N:integer, c:number, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dmeanvarpn.ndarray","base.strided.dmeanvarpn.ndarray( N:integer, c:number, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dmeanwd","base.strided.dmeanwd( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmeanwd.ndarray","base.strided.dmeanwd.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmediansorted","base.strided.dmediansorted( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmediansorted.ndarray","base.strided.dmediansorted.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmidrange","base.strided.dmidrange( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmidrange.ndarray","base.strided.dmidrange.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmin","base.strided.dmin( N:integer, x:Float64Array, stride:integer )"],["base.strided.dmin.ndarray","base.strided.dmin.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dminabs","base.strided.dminabs( N:integer, x:Float64Array, stride:integer )"],["base.strided.dminabs.ndarray","base.strided.dminabs.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dminsorted","base.strided.dminsorted( N:integer, x:Float64Array, stride:integer )"],["base.strided.dminsorted.ndarray","base.strided.dminsorted.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dmskabs","base.strided.dmskabs( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskabs.ndarray","base.strided.dmskabs.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskabs2","base.strided.dmskabs2( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskabs2.ndarray","base.strided.dmskabs2.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskcbrt","base.strided.dmskcbrt( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskcbrt.ndarray","base.strided.dmskcbrt.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskceil","base.strided.dmskceil( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskceil.ndarray","base.strided.dmskceil.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskdeg2rad","base.strided.dmskdeg2rad( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskdeg2rad.ndarray","base.strided.dmskdeg2rad.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskfloor","base.strided.dmskfloor( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskfloor.ndarray","base.strided.dmskfloor.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskinv","base.strided.dmskinv( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskinv.ndarray","base.strided.dmskinv.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskmap","base.strided.dmskmap( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer, fcn:Function )"],["base.strided.dmskmap.ndarray","base.strided.dmskmap.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Uint8Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer, fcn:Function )"],["base.strided.dmskmap2","base.strided.dmskmap2( N:integer, x:Float64Array, sx:integer, y:Float64Array, sy:integer, m:Uint8Array, sm:integer, z:Float64Array, sz:integer, fcn:Function )"],["base.strided.dmskmap2.ndarray","base.strided.dmskmap2.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, y:Float64Array, sy:integer, oy:integer, m:Uint8Array, sm:integer, om:integer, z:Float64Array, sz:integer, oz:integer, fcn:Function )"],["base.strided.dmskmax","base.strided.dmskmax( N:integer, x:Float64Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.dmskmax.ndarray","base.strided.dmskmax.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.dmskmin","base.strided.dmskmin( N:integer, x:Float64Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.dmskmin.ndarray","base.strided.dmskmin.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.dmskramp","base.strided.dmskramp( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskramp.ndarray","base.strided.dmskramp.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmskrange","base.strided.dmskrange( N:integer, x:Float64Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.dmskrange.ndarray","base.strided.dmskrange.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.dmskrsqrt","base.strided.dmskrsqrt( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmskrsqrt.ndarray","base.strided.dmskrsqrt.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmsksqrt","base.strided.dmsksqrt( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmsksqrt.ndarray","base.strided.dmsksqrt.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dmsktrunc","base.strided.dmsktrunc( N:integer, x:Float64Array, sx:integer, m:Uint8Array, sm:integer, y:Float64Array, sy:integer )"],["base.strided.dmsktrunc.ndarray","base.strided.dmsktrunc.ndarray( N:integer, x:Float64Array, sx:integer, ox:integer, m:Float64Array, sm:integer, om:integer, y:Float64Array, sy:integer, oy:integer )"],["base.strided.dnanasum","base.strided.dnanasum( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanasum.ndarray","base.strided.dnanasum.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanasumors","base.strided.dnanasumors( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanasumors.ndarray","base.strided.dnanasumors.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmax","base.strided.dnanmax( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmax.ndarray","base.strided.dnanmax.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmaxabs","base.strided.dnanmaxabs( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmaxabs.ndarray","base.strided.dnanmaxabs.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmean","base.strided.dnanmean( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmean.ndarray","base.strided.dnanmean.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmeanors","base.strided.dnanmeanors( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmeanors.ndarray","base.strided.dnanmeanors.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmeanpn","base.strided.dnanmeanpn( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmeanpn.ndarray","base.strided.dnanmeanpn.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmeanpw","base.strided.dnanmeanpw( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmeanpw.ndarray","base.strided.dnanmeanpw.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmeanwd","base.strided.dnanmeanwd( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmeanwd.ndarray","base.strided.dnanmeanwd.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmin","base.strided.dnanmin( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanmin.ndarray","base.strided.dnanmin.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanminabs","base.strided.dnanminabs( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanminabs.ndarray","base.strided.dnanminabs.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanmskmax","base.strided.dnanmskmax( N:integer, x:Float64Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.dnanmskmax.ndarray","base.strided.dnanmskmax.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.dnanmskmin","base.strided.dnanmskmin( N:integer, x:Float64Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.dnanmskmin.ndarray","base.strided.dnanmskmin.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.dnanmskrange","base.strided.dnanmskrange( N:integer, x:Float64Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.dnanmskrange.ndarray","base.strided.dnanmskrange.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.dnannsum","base.strided.dnannsum( N:integer, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dnannsum.ndarray","base.strided.dnannsum.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dnannsumkbn","base.strided.dnannsumkbn( N:integer, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dnannsumkbn.ndarray","base.strided.dnannsumkbn.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dnannsumkbn2","base.strided.dnannsumkbn2( N:integer, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dnannsumkbn2.ndarray","base.strided.dnannsumkbn2.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dnannsumors","base.strided.dnannsumors( N:integer, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dnannsumors.ndarray","base.strided.dnannsumors.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dnannsumpw","base.strided.dnannsumpw( N:integer, x:Float64Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dnannsumpw.ndarray","base.strided.dnannsumpw.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dnanrange","base.strided.dnanrange( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnanrange.ndarray","base.strided.dnanrange.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanstdev","base.strided.dnanstdev( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanstdev.ndarray","base.strided.dnanstdev.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanstdevch","base.strided.dnanstdevch( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanstdevch.ndarray","base.strided.dnanstdevch.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanstdevpn","base.strided.dnanstdevpn( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanstdevpn.ndarray","base.strided.dnanstdevpn.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanstdevtk","base.strided.dnanstdevtk( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanstdevtk.ndarray","base.strided.dnanstdevtk.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanstdevwd","base.strided.dnanstdevwd( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanstdevwd.ndarray","base.strided.dnanstdevwd.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanstdevyc","base.strided.dnanstdevyc( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanstdevyc.ndarray","base.strided.dnanstdevyc.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnansum","base.strided.dnansum( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnansum.ndarray","base.strided.dnansum.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnansumkbn","base.strided.dnansumkbn( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnansumkbn.ndarray","base.strided.dnansumkbn.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnansumkbn2","base.strided.dnansumkbn2( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnansumkbn2.ndarray","base.strided.dnansumkbn2.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnansumors","base.strided.dnansumors( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnansumors.ndarray","base.strided.dnansumors.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnansumpw","base.strided.dnansumpw( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnansumpw.ndarray","base.strided.dnansumpw.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanvariance","base.strided.dnanvariance( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanvariance.ndarray","base.strided.dnanvariance.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanvariancech","base.strided.dnanvariancech( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanvariancech.ndarray","base.strided.dnanvariancech.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanvariancepn","base.strided.dnanvariancepn( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanvariancepn.ndarray","base.strided.dnanvariancepn.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanvariancetk","base.strided.dnanvariancetk( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanvariancetk.ndarray","base.strided.dnanvariancetk.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanvariancewd","base.strided.dnanvariancewd( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanvariancewd.ndarray","base.strided.dnanvariancewd.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnanvarianceyc","base.strided.dnanvarianceyc( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dnanvarianceyc.ndarray","base.strided.dnanvarianceyc.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dnrm2","base.strided.dnrm2( N:integer, x:Float64Array, stride:integer )"],["base.strided.dnrm2.ndarray","base.strided.dnrm2.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dramp","base.strided.dramp( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dramp.ndarray","base.strided.dramp.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.drange","base.strided.drange( N:integer, x:Float64Array, stride:integer )"],["base.strided.drange.ndarray","base.strided.drange.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.drev","base.strided.drev( N:integer, x:Float64Array, stride:integer )"],["base.strided.drev.ndarray","base.strided.drev.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.drsqrt","base.strided.drsqrt( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.drsqrt.ndarray","base.strided.drsqrt.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dsapxsum","base.strided.dsapxsum( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.dsapxsum.ndarray","base.strided.dsapxsum.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsapxsumpw","base.strided.dsapxsumpw( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.dsapxsumpw.ndarray","base.strided.dsapxsumpw.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dscal","base.strided.dscal( N:integer, alpha:number, x:Float64Array, stride:integer )"],["base.strided.dscal.ndarray","base.strided.dscal.ndarray( N:integer, alpha:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsdot","base.strided.dsdot( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.dsdot.ndarray","base.strided.dsdot.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.dsem","base.strided.dsem( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dsem.ndarray","base.strided.dsem.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsemch","base.strided.dsemch( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dsemch.ndarray","base.strided.dsemch.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsempn","base.strided.dsempn( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dsempn.ndarray","base.strided.dsempn.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsemtk","base.strided.dsemtk( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dsemtk.ndarray","base.strided.dsemtk.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsemwd","base.strided.dsemwd( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dsemwd.ndarray","base.strided.dsemwd.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsemyc","base.strided.dsemyc( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dsemyc.ndarray","base.strided.dsemyc.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsmean","base.strided.dsmean( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsmean.ndarray","base.strided.dsmean.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsmeanors","base.strided.dsmeanors( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsmeanors.ndarray","base.strided.dsmeanors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsmeanpn","base.strided.dsmeanpn( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsmeanpn.ndarray","base.strided.dsmeanpn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsmeanpw","base.strided.dsmeanpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsmeanpw.ndarray","base.strided.dsmeanpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsmeanwd","base.strided.dsmeanwd( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsmeanwd.ndarray","base.strided.dsmeanwd.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnanmean","base.strided.dsnanmean( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnanmean.ndarray","base.strided.dsnanmean.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnanmeanors","base.strided.dsnanmeanors( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnanmeanors.ndarray","base.strided.dsnanmeanors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnanmeanpn","base.strided.dsnanmeanpn( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnanmeanpn.ndarray","base.strided.dsnanmeanpn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnanmeanwd","base.strided.dsnanmeanwd( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnanmeanwd.ndarray","base.strided.dsnanmeanwd.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnannsumors","base.strided.dsnannsumors( N:integer, x:Float32Array, strideX:integer, out:Float64Array, strideOut:integer )"],["base.strided.dsnannsumors.ndarray","base.strided.dsnannsumors.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, out:Float64Array, strideOut:integer, offsetOut:integer )"],["base.strided.dsnansum","base.strided.dsnansum( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnansum.ndarray","base.strided.dsnansum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnansumors","base.strided.dsnansumors( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnansumors.ndarray","base.strided.dsnansumors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsnansumpw","base.strided.dsnansumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.dsnansumpw.ndarray","base.strided.dsnansumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsort2hp","base.strided.dsort2hp( N:integer, order:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dsort2hp.ndarray","base.strided.dsort2hp.ndarray( N:integer, order:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dsort2ins","base.strided.dsort2ins( N:integer, order:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dsort2ins.ndarray","base.strided.dsort2ins.ndarray( N:integer, order:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dsort2sh","base.strided.dsort2sh( N:integer, order:number, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dsort2sh.ndarray","base.strided.dsort2sh.ndarray( N:integer, order:number, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dsorthp","base.strided.dsorthp( N:integer, order:number, x:Float64Array, stride:integer )"],["base.strided.dsorthp.ndarray","base.strided.dsorthp.ndarray( N:integer, order:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsortins","base.strided.dsortins( N:integer, order:number, x:Float64Array, stride:integer )"],["base.strided.dsortins.ndarray","base.strided.dsortins.ndarray( N:integer, order:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsortsh","base.strided.dsortsh( N:integer, order:number, x:Float64Array, stride:integer )"],["base.strided.dsortsh.ndarray","base.strided.dsortsh.ndarray( N:integer, order:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsqrt","base.strided.dsqrt( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dsqrt.ndarray","base.strided.dsqrt.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dssum","base.strided.dssum( N:integer, x:Float32Array, stride:integer )"],["base.strided.dssum.ndarray","base.strided.dssum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dssumors","base.strided.dssumors( N:integer, x:Float32Array, stride:integer )"],["base.strided.dssumors.ndarray","base.strided.dssumors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dssumpw","base.strided.dssumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.dssumpw.ndarray","base.strided.dssumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dstdev","base.strided.dstdev( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dstdev.ndarray","base.strided.dstdev.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dstdevch","base.strided.dstdevch( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dstdevch.ndarray","base.strided.dstdevch.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dstdevpn","base.strided.dstdevpn( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dstdevpn.ndarray","base.strided.dstdevpn.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dstdevtk","base.strided.dstdevtk( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dstdevtk.ndarray","base.strided.dstdevtk.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dstdevwd","base.strided.dstdevwd( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dstdevwd.ndarray","base.strided.dstdevwd.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dstdevyc","base.strided.dstdevyc( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dstdevyc.ndarray","base.strided.dstdevyc.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsum","base.strided.dsum( N:integer, x:Float64Array, stride:integer )"],["base.strided.dsum.ndarray","base.strided.dsum.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsumkbn","base.strided.dsumkbn( N:integer, x:Float64Array, stride:integer )"],["base.strided.dsumkbn.ndarray","base.strided.dsumkbn.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsumkbn2","base.strided.dsumkbn2( N:integer, x:Float64Array, stride:integer )"],["base.strided.dsumkbn2.ndarray","base.strided.dsumkbn2.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsumors","base.strided.dsumors( N:integer, x:Float64Array, stride:integer )"],["base.strided.dsumors.ndarray","base.strided.dsumors.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsumpw","base.strided.dsumpw( N:integer, x:Float64Array, stride:integer )"],["base.strided.dsumpw.ndarray","base.strided.dsumpw.ndarray( N:integer, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dsvariance","base.strided.dsvariance( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.dsvariance.ndarray","base.strided.dsvariance.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dsvariancepn","base.strided.dsvariancepn( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.dsvariancepn.ndarray","base.strided.dsvariancepn.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.dswap","base.strided.dswap( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dswap.ndarray","base.strided.dswap.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dtrunc","base.strided.dtrunc( N:integer, x:Float64Array, strideX:integer, y:Float64Array, strideY:integer )"],["base.strided.dtrunc.ndarray","base.strided.dtrunc.ndarray( N:integer, x:Float64Array, strideX:integer, offsetX:integer, y:Float64Array, strideY:integer, offsetY:integer )"],["base.strided.dvariance","base.strided.dvariance( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvariance.ndarray","base.strided.dvariance.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvariancech","base.strided.dvariancech( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvariancech.ndarray","base.strided.dvariancech.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvariancepn","base.strided.dvariancepn( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvariancepn.ndarray","base.strided.dvariancepn.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvariancetk","base.strided.dvariancetk( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvariancetk.ndarray","base.strided.dvariancetk.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvariancewd","base.strided.dvariancewd( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvariancewd.ndarray","base.strided.dvariancewd.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvarianceyc","base.strided.dvarianceyc( N:integer, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvarianceyc.ndarray","base.strided.dvarianceyc.ndarray( N:integer, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvarm","base.strided.dvarm( N:integer, mean:number, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvarm.ndarray","base.strided.dvarm.ndarray( N:integer, mean:number, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvarmpn","base.strided.dvarmpn( N:integer, mean:number, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvarmpn.ndarray","base.strided.dvarmpn.ndarray( N:integer, mean:number, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.dvarmtk","base.strided.dvarmtk( N:integer, mean:number, correction:number, x:Float64Array, stride:integer )"],["base.strided.dvarmtk.ndarray","base.strided.dvarmtk.ndarray( N:integer, mean:number, correction:number, x:Float64Array, stride:integer, offset:integer )"],["base.strided.gapx","base.strided.gapx( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gapx.ndarray","base.strided.gapx.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gapxsum","base.strided.gapxsum( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gapxsum.ndarray","base.strided.gapxsum.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gapxsumkbn","base.strided.gapxsumkbn( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gapxsumkbn.ndarray","base.strided.gapxsumkbn.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gapxsumkbn2","base.strided.gapxsumkbn2( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gapxsumkbn2.ndarray","base.strided.gapxsumkbn2.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gapxsumors","base.strided.gapxsumors( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gapxsumors.ndarray","base.strided.gapxsumors.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gapxsumpw","base.strided.gapxsumpw( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gapxsumpw.ndarray","base.strided.gapxsumpw.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gasum","base.strided.gasum( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gasum.ndarray","base.strided.gasum.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gasumpw","base.strided.gasumpw( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gasumpw.ndarray","base.strided.gasumpw.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gaxpy","base.strided.gaxpy( N:integer, alpha:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gaxpy.ndarray","base.strided.gaxpy.ndarray( N:integer, alpha:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gcopy","base.strided.gcopy( N:integer, x:ArrayLikeObject, strideX:integer, y:ArrayLikeObject, strideY:integer )"],["base.strided.gcopy.ndarray","base.strided.gcopy.ndarray( N:integer, x:ArrayLikeObject, strideX:integer, offsetX:integer, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["base.strided.gcusum","base.strided.gcusum( N:integer, sum:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gcusum.ndarray","base.strided.gcusum.ndarray( N:integer, sum:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gcusumkbn","base.strided.gcusumkbn( N:integer, sum:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gcusumkbn.ndarray","base.strided.gcusumkbn.ndarray( N:integer, sum:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gcusumkbn2","base.strided.gcusumkbn2( N:integer, sum:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gcusumkbn2.ndarray","base.strided.gcusumkbn2.ndarray( N:integer, sum:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gcusumors","base.strided.gcusumors( N:integer, sum:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gcusumors.ndarray","base.strided.gcusumors.ndarray( N:integer, sum:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gcusumpw","base.strided.gcusumpw( N:integer, sum:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gcusumpw.ndarray","base.strided.gcusumpw.ndarray( N:integer, sum:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gdot","base.strided.gdot( N:integer, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gdot.ndarray","base.strided.gdot.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gfill","base.strided.gfill( N:integer, alpha:any, x:ArrayLikeObject, stride:integer )"],["base.strided.gfill.ndarray","base.strided.gfill.ndarray( N:integer, alpha:any, x:ArrayLikeObject, stride:integer, offset:integer )"],["base.strided.gfillBy","base.strided.gfillBy( N:integer, x:ArrayLikeObject, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.gfillBy.ndarray","base.strided.gfillBy.ndarray( N:integer, x:ArrayLikeObject, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.gnannsumkbn","base.strided.gnannsumkbn( N:integer, x:Array|TypedArray, strideX:integer, out:Array|TypedArray, strideOut:integer )"],["base.strided.gnannsumkbn.ndarray","base.strided.gnannsumkbn.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, out:Array|TypedArray, strideOut:integer, offsetOut:integer )"],["base.strided.gnansum","base.strided.gnansum( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gnansum.ndarray","base.strided.gnansum.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gnansumkbn","base.strided.gnansumkbn( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gnansumkbn.ndarray","base.strided.gnansumkbn.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gnansumkbn2","base.strided.gnansumkbn2( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gnansumkbn2.ndarray","base.strided.gnansumkbn2.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gnansumors","base.strided.gnansumors( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gnansumors.ndarray","base.strided.gnansumors.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gnansumpw","base.strided.gnansumpw( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gnansumpw.ndarray","base.strided.gnansumpw.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gnrm2","base.strided.gnrm2( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gnrm2.ndarray","base.strided.gnrm2.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.grev","base.strided.grev( N:integer, x:ArrayLikeObject, stride:integer )"],["base.strided.grev.ndarray","base.strided.grev.ndarray( N:integer, x:ArrayLikeObject, stride:integer, offset:integer )"],["base.strided.gscal","base.strided.gscal( N:integer, alpha:number, x:Array|TypedArray, stride:integer )"],["base.strided.gscal.ndarray","base.strided.gscal.ndarray( N:integer, alpha:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsort2hp","base.strided.gsort2hp( N:integer, order:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gsort2hp.ndarray","base.strided.gsort2hp.ndarray( N:integer, order:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gsort2ins","base.strided.gsort2ins( N:integer, order:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gsort2ins.ndarray","base.strided.gsort2ins.ndarray( N:integer, order:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gsort2sh","base.strided.gsort2sh( N:integer, order:number, x:Array|TypedArray, strideX:integer, y:Array|TypedArray, strideY:integer )"],["base.strided.gsort2sh.ndarray","base.strided.gsort2sh.ndarray( N:integer, order:number, x:Array|TypedArray, strideX:integer, offsetX:integer, y:Array|TypedArray, strideY:integer, offsetY:integer )"],["base.strided.gsorthp","base.strided.gsorthp( N:integer, order:number, x:Array|TypedArray, stride:integer )"],["base.strided.gsorthp.ndarray","base.strided.gsorthp.ndarray( N:integer, order:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsortins","base.strided.gsortins( N:integer, order:number, x:Array|TypedArray, stride:integer )"],["base.strided.gsortins.ndarray","base.strided.gsortins.ndarray( N:integer, order:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsortsh","base.strided.gsortsh( N:integer, order:number, x:Array|TypedArray, stride:integer )"],["base.strided.gsortsh.ndarray","base.strided.gsortsh.ndarray( N:integer, order:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsum","base.strided.gsum( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gsum.ndarray","base.strided.gsum.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsumkbn","base.strided.gsumkbn( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gsumkbn.ndarray","base.strided.gsumkbn.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsumkbn2","base.strided.gsumkbn2( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gsumkbn2.ndarray","base.strided.gsumkbn2.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsumors","base.strided.gsumors( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gsumors.ndarray","base.strided.gsumors.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gsumpw","base.strided.gsumpw( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.gsumpw.ndarray","base.strided.gsumpw.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.gswap","base.strided.gswap( N:integer, x:ArrayLikeObject, strideX:integer, y:ArrayLikeObject, strideY:integer )"],["base.strided.gswap.ndarray","base.strided.gswap.ndarray( N:integer, x:ArrayLikeObject, strideX:integer, offsetX:integer, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["base.strided.mapBy","base.strided.mapBy( N:integer, x:Array|TypedArray|Object, sx:integer, y:Array|TypedArray|Object, sy:integer, fcn:Function, clbk:Function[, thisArg:any] )"],["base.strided.mapBy.ndarray","base.strided.mapBy.ndarray( N:integer, x:Array|TypedArray|Object, sx:integer, ox:integer, y:Array|TypedArray|Object, sy:integer, oy:integer, fcn:Function, clbk:Function[, thisArg:any] )"],["base.strided.mapBy2","base.strided.mapBy2( N:integer, x:Array|TypedArray|Object, sx:integer, y:Array|TypedArray|Object, sy:integer, z:Array|TypedArray|Object, sz:integer, fcn:Function, clbk:Function[, thisArg:any] )"],["base.strided.mapBy2.ndarray","base.strided.mapBy2.ndarray( N:integer, x:Array|TypedArray|Object, sx:integer, ox:integer, y:Array|TypedArray|Object, sy:integer, oy:integer, z:Array|TypedArray|Object, sz:integer, oz:integer, fcn:Function, clbk:Function[, thisArg:any] )"],["base.strided.max","base.strided.max( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.max.ndarray","base.strided.max.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.maxabs","base.strided.maxabs( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.maxabs.ndarray","base.strided.maxabs.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.maxBy","base.strided.maxBy( N:integer, x:Array|TypedArray|Object, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.maxBy.ndarray","base.strided.maxBy.ndarray( N:integer, x:Array|TypedArray|Object, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.maxsorted","base.strided.maxsorted( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.maxsorted.ndarray","base.strided.maxsorted.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.mean","base.strided.mean( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.mean.ndarray","base.strided.mean.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.meankbn","base.strided.meankbn( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.meankbn.ndarray","base.strided.meankbn.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.meankbn2","base.strided.meankbn2( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.meankbn2.ndarray","base.strided.meankbn2.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.meanors","base.strided.meanors( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.meanors.ndarray","base.strided.meanors.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.meanpn","base.strided.meanpn( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.meanpn.ndarray","base.strided.meanpn.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.meanpw","base.strided.meanpw( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.meanpw.ndarray","base.strided.meanpw.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.meanwd","base.strided.meanwd( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.meanwd.ndarray","base.strided.meanwd.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.mediansorted","base.strided.mediansorted( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.mediansorted.ndarray","base.strided.mediansorted.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.min","base.strided.min( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.min.ndarray","base.strided.min.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.minabs","base.strided.minabs( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.minabs.ndarray","base.strided.minabs.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.minBy","base.strided.minBy( N:integer, x:Array|TypedArray|Object, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.minBy.ndarray","base.strided.minBy.ndarray( N:integer, x:Array|TypedArray|Object, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.minsorted","base.strided.minsorted( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.minsorted.ndarray","base.strided.minsorted.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.mskmax","base.strided.mskmax( N:integer, x:Array|TypedArray, strideX:integer, mask:Array|TypedArray, strideMask:integer )"],["base.strided.mskmax.ndarray","base.strided.mskmax.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, mask:Array|TypedArray, strideMask:integer, offsetMask:integer )"],["base.strided.mskmin","base.strided.mskmin( N:integer, x:Array|TypedArray, strideX:integer, mask:Array|TypedArray, strideMask:integer )"],["base.strided.mskmin.ndarray","base.strided.mskmin.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, mask:Array|TypedArray, strideMask:integer, offsetMask:integer )"],["base.strided.mskrange","base.strided.mskrange( N:integer, x:Array|TypedArray, strideX:integer, mask:Array|TypedArray, strideMask:integer )"],["base.strided.mskrange.ndarray","base.strided.mskrange.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, mask:Array|TypedArray, strideMask:integer, offsetMask:integer )"],["base.strided.mskunary","base.strided.mskunary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.mskunary.ndarray","base.strided.mskunary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.nanmax","base.strided.nanmax( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmax.ndarray","base.strided.nanmax.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanmaxabs","base.strided.nanmaxabs( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmaxabs.ndarray","base.strided.nanmaxabs.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanmaxBy","base.strided.nanmaxBy( N:integer, x:Array|TypedArray|Object, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.nanmaxBy.ndarray","base.strided.nanmaxBy.ndarray( N:integer, x:Array|TypedArray|Object, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.nanmean","base.strided.nanmean( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmean.ndarray","base.strided.nanmean.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanmeanors","base.strided.nanmeanors( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmeanors.ndarray","base.strided.nanmeanors.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanmeanpn","base.strided.nanmeanpn( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmeanpn.ndarray","base.strided.nanmeanpn.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanmeanwd","base.strided.nanmeanwd( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmeanwd.ndarray","base.strided.nanmeanwd.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanmin","base.strided.nanmin( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanmin.ndarray","base.strided.nanmin.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanminabs","base.strided.nanminabs( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanminabs.ndarray","base.strided.nanminabs.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanminBy","base.strided.nanminBy( N:integer, x:Array|TypedArray|Object, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.nanminBy.ndarray","base.strided.nanminBy.ndarray( N:integer, x:Array|TypedArray|Object, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.nanmskmax","base.strided.nanmskmax( N:integer, x:Array|TypedArray, strideX:integer, mask:Array|TypedArray, strideMask:integer )"],["base.strided.nanmskmax.ndarray","base.strided.nanmskmax.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, mask:Array|TypedArray, strideMask:integer, offsetMask:integer )"],["base.strided.nanmskmin","base.strided.nanmskmin( N:integer, x:Array|TypedArray, strideX:integer, mask:Array|TypedArray, strideMask:integer )"],["base.strided.nanmskmin.ndarray","base.strided.nanmskmin.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, mask:Array|TypedArray, strideMask:integer, offsetMask:integer )"],["base.strided.nanmskrange","base.strided.nanmskrange( N:integer, x:Array|TypedArray, strideX:integer, mask:Array|TypedArray, strideMask:integer )"],["base.strided.nanmskrange.ndarray","base.strided.nanmskrange.ndarray( N:integer, x:Array|TypedArray, strideX:integer, offsetX:integer, mask:Array|TypedArray, strideMask:integer, offsetMask:integer )"],["base.strided.nanrange","base.strided.nanrange( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.nanrange.ndarray","base.strided.nanrange.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanrangeBy","base.strided.nanrangeBy( N:integer, x:Array|TypedArray|Object, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.nanrangeBy.ndarray","base.strided.nanrangeBy.ndarray( N:integer, x:Array|TypedArray|Object, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.nanstdev","base.strided.nanstdev( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanstdev.ndarray","base.strided.nanstdev.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanstdevch","base.strided.nanstdevch( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanstdevch.ndarray","base.strided.nanstdevch.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanstdevpn","base.strided.nanstdevpn( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanstdevpn.ndarray","base.strided.nanstdevpn.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanstdevtk","base.strided.nanstdevtk( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanstdevtk.ndarray","base.strided.nanstdevtk.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanstdevwd","base.strided.nanstdevwd( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanstdevwd.ndarray","base.strided.nanstdevwd.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanstdevyc","base.strided.nanstdevyc( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanstdevyc.ndarray","base.strided.nanstdevyc.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanvariance","base.strided.nanvariance( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanvariance.ndarray","base.strided.nanvariance.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanvariancech","base.strided.nanvariancech( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanvariancech.ndarray","base.strided.nanvariancech.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanvariancepn","base.strided.nanvariancepn( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanvariancepn.ndarray","base.strided.nanvariancepn.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanvariancetk","base.strided.nanvariancetk( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanvariancetk.ndarray","base.strided.nanvariancetk.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanvariancewd","base.strided.nanvariancewd( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanvariancewd.ndarray","base.strided.nanvariancewd.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nanvarianceyc","base.strided.nanvarianceyc( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.nanvarianceyc.ndarray","base.strided.nanvarianceyc.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.nullary","base.strided.nullary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.nullary.ndarray","base.strided.nullary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.quaternary","base.strided.quaternary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.quaternary.ndarray","base.strided.quaternary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.quinary","base.strided.quinary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.quinary.ndarray","base.strided.quinary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.range","base.strided.range( N:integer, x:Array|TypedArray, stride:integer )"],["base.strided.range.ndarray","base.strided.range.ndarray( N:integer, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.rangeBy","base.strided.rangeBy( N:integer, x:Array|TypedArray|Object, stride:integer, clbk:Function[, thisArg:any] )"],["base.strided.rangeBy.ndarray","base.strided.rangeBy.ndarray( N:integer, x:Array|TypedArray|Object, stride:integer, offset:integer, clbk:Function[, thisArg:any] )"],["base.strided.sabs","base.strided.sabs( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sabs.ndarray","base.strided.sabs.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sabs2","base.strided.sabs2( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sabs2.ndarray","base.strided.sabs2.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sapx","base.strided.sapx( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sapx.ndarray","base.strided.sapx.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sapxsum","base.strided.sapxsum( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sapxsum.ndarray","base.strided.sapxsum.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sapxsumkbn","base.strided.sapxsumkbn( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sapxsumkbn.ndarray","base.strided.sapxsumkbn.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sapxsumkbn2","base.strided.sapxsumkbn2( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sapxsumkbn2.ndarray","base.strided.sapxsumkbn2.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sapxsumors","base.strided.sapxsumors( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sapxsumors.ndarray","base.strided.sapxsumors.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sapxsumpw","base.strided.sapxsumpw( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sapxsumpw.ndarray","base.strided.sapxsumpw.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sasum","base.strided.sasum( N:integer, x:Float32Array, stride:integer )"],["base.strided.sasum.ndarray","base.strided.sasum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sasumpw","base.strided.sasumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.sasumpw.ndarray","base.strided.sasumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.saxpy","base.strided.saxpy( N:integer, alpha:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.saxpy.ndarray","base.strided.saxpy.ndarray( N:integer, alpha:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scbrt","base.strided.scbrt( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scbrt.ndarray","base.strided.scbrt.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sceil","base.strided.sceil( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sceil.ndarray","base.strided.sceil.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scopy","base.strided.scopy( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scopy.ndarray","base.strided.scopy.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scumax","base.strided.scumax( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scumax.ndarray","base.strided.scumax.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scumaxabs","base.strided.scumaxabs( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scumaxabs.ndarray","base.strided.scumaxabs.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scumin","base.strided.scumin( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scumin.ndarray","base.strided.scumin.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scuminabs","base.strided.scuminabs( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scuminabs.ndarray","base.strided.scuminabs.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scusum","base.strided.scusum( N:integer, sum:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scusum.ndarray","base.strided.scusum.ndarray( N:integer, sum:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scusumkbn","base.strided.scusumkbn( N:integer, sum:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scusumkbn.ndarray","base.strided.scusumkbn.ndarray( N:integer, sum:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scusumkbn2","base.strided.scusumkbn2( N:integer, sum:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scusumkbn2.ndarray","base.strided.scusumkbn2.ndarray( N:integer, sum:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scusumors","base.strided.scusumors( N:integer, sum:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scusumors.ndarray","base.strided.scusumors.ndarray( N:integer, sum:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.scusumpw","base.strided.scusumpw( N:integer, sum:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.scusumpw.ndarray","base.strided.scusumpw.ndarray( N:integer, sum:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sdeg2rad","base.strided.sdeg2rad( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sdeg2rad.ndarray","base.strided.sdeg2rad.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sdot","base.strided.sdot( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sdot.ndarray","base.strided.sdot.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sdsapxsum","base.strided.sdsapxsum( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sdsapxsum.ndarray","base.strided.sdsapxsum.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsapxsumpw","base.strided.sdsapxsumpw( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sdsapxsumpw.ndarray","base.strided.sdsapxsumpw.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsdot","base.strided.sdsdot( N:integer, scalar:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sdsdot.ndarray","base.strided.sdsdot.ndarray( N:integer, scalar:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sdsmean","base.strided.sdsmean( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdsmean.ndarray","base.strided.sdsmean.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsmeanors","base.strided.sdsmeanors( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdsmeanors.ndarray","base.strided.sdsmeanors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsnanmean","base.strided.sdsnanmean( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdsnanmean.ndarray","base.strided.sdsnanmean.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsnanmeanors","base.strided.sdsnanmeanors( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdsnanmeanors.ndarray","base.strided.sdsnanmeanors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsnansum","base.strided.sdsnansum( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdsnansum.ndarray","base.strided.sdsnansum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdsnansumpw","base.strided.sdsnansumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdsnansumpw.ndarray","base.strided.sdsnansumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdssum","base.strided.sdssum( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdssum.ndarray","base.strided.sdssum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sdssumpw","base.strided.sdssumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.sdssumpw.ndarray","base.strided.sdssumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sfill","base.strided.sfill( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sfill.ndarray","base.strided.sfill.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sfloor","base.strided.sfloor( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sfloor.ndarray","base.strided.sfloor.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sinv","base.strided.sinv( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sinv.ndarray","base.strided.sinv.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.smap","base.strided.smap( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer, fcn:Function )"],["base.strided.smap.ndarray","base.strided.smap.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer, fcn:Function )"],["base.strided.smap2","base.strided.smap2( N:integer, x:Float32Array, sx:integer, y:Float32Array, sy:integer, z:Float32Array, sz:integer, fcn:Function )"],["base.strided.smap2.ndarray","base.strided.smap2.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, y:Float32Array, sy:integer, oy:integer, z:Float32Array, sz:integer, oz:integer, fcn:Function )"],["base.strided.smax","base.strided.smax( N:integer, x:Float32Array, stride:integer )"],["base.strided.smax.ndarray","base.strided.smax.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smaxabs","base.strided.smaxabs( N:integer, x:Float32Array, stride:integer )"],["base.strided.smaxabs.ndarray","base.strided.smaxabs.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smaxabssorted","base.strided.smaxabssorted( N:integer, x:Float32Array, stride:integer )"],["base.strided.smaxabssorted.ndarray","base.strided.smaxabssorted.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smaxsorted","base.strided.smaxsorted( N:integer, x:Float32Array, stride:integer )"],["base.strided.smaxsorted.ndarray","base.strided.smaxsorted.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smean","base.strided.smean( N:integer, x:Float32Array, stride:integer )"],["base.strided.smean.ndarray","base.strided.smean.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeankbn","base.strided.smeankbn( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeankbn.ndarray","base.strided.smeankbn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeankbn2","base.strided.smeankbn2( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeankbn2.ndarray","base.strided.smeankbn2.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeanli","base.strided.smeanli( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeanli.ndarray","base.strided.smeanli.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeanlipw","base.strided.smeanlipw( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeanlipw.ndarray","base.strided.smeanlipw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeanors","base.strided.smeanors( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeanors.ndarray","base.strided.smeanors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeanpn","base.strided.smeanpn( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeanpn.ndarray","base.strided.smeanpn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeanpw","base.strided.smeanpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeanpw.ndarray","base.strided.smeanpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smeanwd","base.strided.smeanwd( N:integer, x:Float32Array, stride:integer )"],["base.strided.smeanwd.ndarray","base.strided.smeanwd.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smediansorted","base.strided.smediansorted( N:integer, x:Float32Array, stride:integer )"],["base.strided.smediansorted.ndarray","base.strided.smediansorted.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smidrange","base.strided.smidrange( N:integer, x:Float32Array, stride:integer )"],["base.strided.smidrange.ndarray","base.strided.smidrange.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smin","base.strided.smin( N:integer, x:Float32Array, stride:integer )"],["base.strided.smin.ndarray","base.strided.smin.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sminabs","base.strided.sminabs( N:integer, x:Float32Array, stride:integer )"],["base.strided.sminabs.ndarray","base.strided.sminabs.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sminsorted","base.strided.sminsorted( N:integer, x:Float32Array, stride:integer )"],["base.strided.sminsorted.ndarray","base.strided.sminsorted.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.smskabs","base.strided.smskabs( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskabs.ndarray","base.strided.smskabs.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskabs2","base.strided.smskabs2( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskabs2.ndarray","base.strided.smskabs2.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskcbrt","base.strided.smskcbrt( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskcbrt.ndarray","base.strided.smskcbrt.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskceil","base.strided.smskceil( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskceil.ndarray","base.strided.smskceil.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskdeg2rad","base.strided.smskdeg2rad( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskdeg2rad.ndarray","base.strided.smskdeg2rad.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskfloor","base.strided.smskfloor( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskfloor.ndarray","base.strided.smskfloor.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskinv","base.strided.smskinv( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskinv.ndarray","base.strided.smskinv.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskmap","base.strided.smskmap( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer, fcn:Function )"],["base.strided.smskmap.ndarray","base.strided.smskmap.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Uint8Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer, fcn:Function )"],["base.strided.smskmap2","base.strided.smskmap2( N:integer, x:Float32Array, sx:integer, y:Float32Array, sy:integer, m:Uint8Array, sm:integer, z:Float32Array, sz:integer, fcn:Function )"],["base.strided.smskmap2.ndarray","base.strided.smskmap2.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, y:Float32Array, sy:integer, oy:integer, m:Uint8Array, sm:integer, om:integer, z:Float32Array, sz:integer, oz:integer, fcn:Function )"],["base.strided.smskmax","base.strided.smskmax( N:integer, x:Float32Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.smskmax.ndarray","base.strided.smskmax.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.smskmin","base.strided.smskmin( N:integer, x:Float32Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.smskmin.ndarray","base.strided.smskmin.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.smskramp","base.strided.smskramp( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskramp.ndarray","base.strided.smskramp.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smskrange","base.strided.smskrange( N:integer, x:Float32Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.smskrange.ndarray","base.strided.smskrange.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.smskrsqrt","base.strided.smskrsqrt( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smskrsqrt.ndarray","base.strided.smskrsqrt.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smsksqrt","base.strided.smsksqrt( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smsksqrt.ndarray","base.strided.smsksqrt.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.smsktrunc","base.strided.smsktrunc( N:integer, x:Float32Array, sx:integer, m:Uint8Array, sm:integer, y:Float32Array, sy:integer )"],["base.strided.smsktrunc.ndarray","base.strided.smsktrunc.ndarray( N:integer, x:Float32Array, sx:integer, ox:integer, m:Float32Array, sm:integer, om:integer, y:Float32Array, sy:integer, oy:integer )"],["base.strided.snanmax","base.strided.snanmax( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmax.ndarray","base.strided.snanmax.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmaxabs","base.strided.snanmaxabs( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmaxabs.ndarray","base.strided.snanmaxabs.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmean","base.strided.snanmean( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmean.ndarray","base.strided.snanmean.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmeanors","base.strided.snanmeanors( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmeanors.ndarray","base.strided.snanmeanors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmeanpn","base.strided.snanmeanpn( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmeanpn.ndarray","base.strided.snanmeanpn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmeanwd","base.strided.snanmeanwd( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmeanwd.ndarray","base.strided.snanmeanwd.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmin","base.strided.snanmin( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanmin.ndarray","base.strided.snanmin.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanminabs","base.strided.snanminabs( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanminabs.ndarray","base.strided.snanminabs.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanmskmax","base.strided.snanmskmax( N:integer, x:Float32Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.snanmskmax.ndarray","base.strided.snanmskmax.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.snanmskmin","base.strided.snanmskmin( N:integer, x:Float32Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.snanmskmin.ndarray","base.strided.snanmskmin.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.snanmskrange","base.strided.snanmskrange( N:integer, x:Float32Array, strideX:integer, mask:Uint8Array, strideMask:integer )"],["base.strided.snanmskrange.ndarray","base.strided.snanmskrange.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, mask:Uint8Array, strideMask:integer, offsetMask:integer )"],["base.strided.snanrange","base.strided.snanrange( N:integer, x:Float32Array, stride:integer )"],["base.strided.snanrange.ndarray","base.strided.snanrange.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanstdev","base.strided.snanstdev( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanstdev.ndarray","base.strided.snanstdev.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanstdevch","base.strided.snanstdevch( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanstdevch.ndarray","base.strided.snanstdevch.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanstdevpn","base.strided.snanstdevpn( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanstdevpn.ndarray","base.strided.snanstdevpn.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanstdevtk","base.strided.snanstdevtk( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanstdevtk.ndarray","base.strided.snanstdevtk.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanstdevwd","base.strided.snanstdevwd( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanstdevwd.ndarray","base.strided.snanstdevwd.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanstdevyc","base.strided.snanstdevyc( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanstdevyc.ndarray","base.strided.snanstdevyc.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snansum","base.strided.snansum( N:integer, x:Float32Array, stride:integer )"],["base.strided.snansum.ndarray","base.strided.snansum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snansumkbn","base.strided.snansumkbn( N:integer, x:Float32Array, stride:integer )"],["base.strided.snansumkbn.ndarray","base.strided.snansumkbn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snansumkbn2","base.strided.snansumkbn2( N:integer, x:Float32Array, stride:integer )"],["base.strided.snansumkbn2.ndarray","base.strided.snansumkbn2.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snansumors","base.strided.snansumors( N:integer, x:Float32Array, stride:integer )"],["base.strided.snansumors.ndarray","base.strided.snansumors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snansumpw","base.strided.snansumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.snansumpw.ndarray","base.strided.snansumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanvariance","base.strided.snanvariance( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanvariance.ndarray","base.strided.snanvariance.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanvariancech","base.strided.snanvariancech( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanvariancech.ndarray","base.strided.snanvariancech.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanvariancepn","base.strided.snanvariancepn( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanvariancepn.ndarray","base.strided.snanvariancepn.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanvariancetk","base.strided.snanvariancetk( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanvariancetk.ndarray","base.strided.snanvariancetk.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanvariancewd","base.strided.snanvariancewd( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanvariancewd.ndarray","base.strided.snanvariancewd.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snanvarianceyc","base.strided.snanvarianceyc( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.snanvarianceyc.ndarray","base.strided.snanvarianceyc.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.snrm2","base.strided.snrm2( N:integer, x:Float32Array, stride:integer )"],["base.strided.snrm2.ndarray","base.strided.snrm2.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sramp","base.strided.sramp( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sramp.ndarray","base.strided.sramp.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.srange","base.strided.srange( N:integer, x:Float32Array, stride:integer )"],["base.strided.srange.ndarray","base.strided.srange.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.srev","base.strided.srev( N:integer, x:Float32Array, stride:integer )"],["base.strided.srev.ndarray","base.strided.srev.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.srsqrt","base.strided.srsqrt( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.srsqrt.ndarray","base.strided.srsqrt.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sscal","base.strided.sscal( N:integer, alpha:number, x:Float32Array, stride:integer )"],["base.strided.sscal.ndarray","base.strided.sscal.ndarray( N:integer, alpha:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssort2hp","base.strided.ssort2hp( N:integer, order:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.ssort2hp.ndarray","base.strided.ssort2hp.ndarray( N:integer, order:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.ssort2ins","base.strided.ssort2ins( N:integer, order:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.ssort2ins.ndarray","base.strided.ssort2ins.ndarray( N:integer, order:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.ssort2sh","base.strided.ssort2sh( N:integer, order:number, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.ssort2sh.ndarray","base.strided.ssort2sh.ndarray( N:integer, order:number, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.ssorthp","base.strided.ssorthp( N:integer, order:number, x:Float32Array, stride:integer )"],["base.strided.ssorthp.ndarray","base.strided.ssorthp.ndarray( N:integer, order:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssortins","base.strided.ssortins( N:integer, order:number, x:Float32Array, stride:integer )"],["base.strided.ssortins.ndarray","base.strided.ssortins.ndarray( N:integer, order:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssortsh","base.strided.ssortsh( N:integer, order:number, x:Float32Array, stride:integer )"],["base.strided.ssortsh.ndarray","base.strided.ssortsh.ndarray( N:integer, order:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssqrt","base.strided.ssqrt( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.ssqrt.ndarray","base.strided.ssqrt.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.sstdev","base.strided.sstdev( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.sstdev.ndarray","base.strided.sstdev.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sstdevch","base.strided.sstdevch( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.sstdevch.ndarray","base.strided.sstdevch.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sstdevpn","base.strided.sstdevpn( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.sstdevpn.ndarray","base.strided.sstdevpn.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sstdevtk","base.strided.sstdevtk( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.sstdevtk.ndarray","base.strided.sstdevtk.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sstdevwd","base.strided.sstdevwd( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.sstdevwd.ndarray","base.strided.sstdevwd.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sstdevyc","base.strided.sstdevyc( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.sstdevyc.ndarray","base.strided.sstdevyc.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssum","base.strided.ssum( N:integer, x:Float32Array, stride:integer )"],["base.strided.ssum.ndarray","base.strided.ssum.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssumkbn","base.strided.ssumkbn( N:integer, x:Float32Array, stride:integer )"],["base.strided.ssumkbn.ndarray","base.strided.ssumkbn.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssumkbn2","base.strided.ssumkbn2( N:integer, x:Float32Array, stride:integer )"],["base.strided.ssumkbn2.ndarray","base.strided.ssumkbn2.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssumors","base.strided.ssumors( N:integer, x:Float32Array, stride:integer )"],["base.strided.ssumors.ndarray","base.strided.ssumors.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ssumpw","base.strided.ssumpw( N:integer, x:Float32Array, stride:integer )"],["base.strided.ssumpw.ndarray","base.strided.ssumpw.ndarray( N:integer, x:Float32Array, stride:integer, offset:integer )"],["base.strided.sswap","base.strided.sswap( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.sswap.ndarray","base.strided.sswap.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.stdev","base.strided.stdev( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.stdev.ndarray","base.strided.stdev.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.stdevch","base.strided.stdevch( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.stdevch.ndarray","base.strided.stdevch.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.stdevpn","base.strided.stdevpn( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.stdevpn.ndarray","base.strided.stdevpn.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.stdevtk","base.strided.stdevtk( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.stdevtk.ndarray","base.strided.stdevtk.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.stdevwd","base.strided.stdevwd( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.stdevwd.ndarray","base.strided.stdevwd.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.stdevyc","base.strided.stdevyc( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.stdevyc.ndarray","base.strided.stdevyc.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.strunc","base.strided.strunc( N:integer, x:Float32Array, strideX:integer, y:Float32Array, strideY:integer )"],["base.strided.strunc.ndarray","base.strided.strunc.ndarray( N:integer, x:Float32Array, strideX:integer, offsetX:integer, y:Float32Array, strideY:integer, offsetY:integer )"],["base.strided.svariance","base.strided.svariance( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.svariance.ndarray","base.strided.svariance.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.svariancech","base.strided.svariancech( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.svariancech.ndarray","base.strided.svariancech.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.svariancepn","base.strided.svariancepn( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.svariancepn.ndarray","base.strided.svariancepn.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.svariancetk","base.strided.svariancetk( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.svariancetk.ndarray","base.strided.svariancetk.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.svariancewd","base.strided.svariancewd( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.svariancewd.ndarray","base.strided.svariancewd.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.svarianceyc","base.strided.svarianceyc( N:integer, correction:number, x:Float32Array, stride:integer )"],["base.strided.svarianceyc.ndarray","base.strided.svarianceyc.ndarray( N:integer, correction:number, x:Float32Array, stride:integer, offset:integer )"],["base.strided.ternary","base.strided.ternary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.ternary.ndarray","base.strided.ternary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.unary","base.strided.unary( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.unary.ndarray","base.strided.unary.ndarray( arrays:ArrayLikeObject<ArrayLikeObject>, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offsets:ArrayLikeObject<integer>, fcn:Function )"],["base.strided.variance","base.strided.variance( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.variance.ndarray","base.strided.variance.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.variancech","base.strided.variancech( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.variancech.ndarray","base.strided.variancech.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.variancepn","base.strided.variancepn( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.variancepn.ndarray","base.strided.variancepn.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.variancetk","base.strided.variancetk( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.variancetk.ndarray","base.strided.variancetk.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.variancewd","base.strided.variancewd( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.variancewd.ndarray","base.strided.variancewd.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.varianceyc","base.strided.varianceyc( N:integer, correction:number, x:Array|TypedArray, stride:integer )"],["base.strided.varianceyc.ndarray","base.strided.varianceyc.ndarray( N:integer, correction:number, x:Array|TypedArray, stride:integer, offset:integer )"],["base.strided.zmap","base.strided.zmap( N:integer, x:Complex128Array, strideX:integer, y:Complex128Array, strideY:integer, fcn:Function )"],["base.strided.zmap.ndarray","base.strided.zmap.ndarray( N:integer, x:Complex128Array, strideX:integer, offsetX:integer, y:Complex128Array, strideY:integer, offsetY:integer, fcn:Function )"],["base.sub","base.sub( x:number, y:number )"],["base.subf","base.subf( x:number, y:number )"],["base.sumSeries","base.sumSeries( generator:Function[, options:Object] )"],["base.tan","base.tan( x:number )"],["base.tanh","base.tanh( x:number )"],["base.toBinaryString","base.toBinaryString( x:number )"],["base.toBinaryStringf","base.toBinaryStringf( x:float )"],["base.toBinaryStringUint8","base.toBinaryStringUint8( x:integer )"],["base.toBinaryStringUint16","base.toBinaryStringUint16( x:integer )"],["base.toBinaryStringUint32","base.toBinaryStringUint32( x:integer )"],["base.toWordf","base.toWordf( x:float )"],["base.toWords","base.toWords( [out:Array|TypedArray|Object,] x:number )"],["base.transpose","base.transpose( x:ndarray )"],["base.tribonacci","base.tribonacci( n:integer )"],["base.trigamma","base.trigamma( x:number )"],["base.trunc","base.trunc( x:number )"],["base.trunc2","base.trunc2( x:number )"],["base.trunc10","base.trunc10( x:number )"],["base.truncb","base.truncb( x:number, n:integer, b:integer )"],["base.truncf","base.truncf( x:number )"],["base.truncn","base.truncn( x:number, n:integer )"],["base.truncsd","base.truncsd( x:number, n:integer[, b:integer] )"],["base.umul","base.umul( a:integer, b:integer )"],["base.umuldw","base.umuldw( [out:ArrayLikeObject,] a:integer, b:integer )"],["base.uint32ToInt32","base.uint32ToInt32( x:integer )"],["base.vercos","base.vercos( x:number )"],["base.versin","base.versin( x:number )"],["base.wrap","base.wrap( v:number, min:number, max:number )"],["base.xlog1py","base.xlog1py( x:number, y:number )"],["base.xlogy","base.xlogy( x:number, y:number )"],["base.zeta","base.zeta( s:number )"],["BERNDT_CPS_WAGES_1985","BERNDT_CPS_WAGES_1985()"],["bifurcate","bifurcate( collection:Array|TypedArray|Object, [options:Object,] filter:Array|TypedArray|Object )"],["bifurcateBy","bifurcateBy( collection:Array|TypedArray|Object, [options:Object,] predicate:Function )"],["bifurcateByAsync","bifurcateByAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["bifurcateByAsync.factory","bifurcateByAsync.factory( [options:Object,] predicate:Function )"],["bifurcateIn","bifurcateIn( obj:Object|Array|TypedArray, [options:Object,] predicate:Function )"],["bifurcateOwn","bifurcateOwn( obj:Object|Array|TypedArray, [options:Object,] predicate:Function )"],["BigInt","BigInt( value:integer|string )"],["binomialTest","binomialTest( x:(number|Array[, n:Array<number>][, options:Object] )"],["Buffer","Buffer"],["Buffer","Buffer( size:integer )"],["Buffer","Buffer( buffer:Buffer )"],["Buffer","Buffer( array:Array )"],["Buffer","Buffer( str:string[, encoding:string] )"],["buffer2json","buffer2json( buffer:Buffer )"],["BYTE_ORDER","BYTE_ORDER"],["camelcase","camelcase( str:string )"],["capitalize","capitalize( str:string )"],["capitalizeKeys","capitalizeKeys( obj:Object )"],["CATALAN","CATALAN"],["CBRT_EPS","CBRT_EPS"],["CDC_NCHS_US_BIRTHS_1969_1988","CDC_NCHS_US_BIRTHS_1969_1988()"],["CDC_NCHS_US_BIRTHS_1994_2003","CDC_NCHS_US_BIRTHS_1994_2003()"],["CDC_NCHS_US_INFANT_MORTALITY_BW_1915_2013","CDC_NCHS_US_INFANT_MORTALITY_BW_1915_2013()"],["chdir","chdir( path:string )"],["chi2gof","chi2gof( x:ndarray|Array|TypedArray, y:ndarray|Array|TypedArray|string[, ...args:number][, options:Object] )"],["chi2test","chi2test( x:(MatrixLike|Array[, options:Object] )"],["circarray2iterator","circarray2iterator( src:ArrayLikeObject[, options:Object][, mapFcn:Function[, thisArg:any]] )"],["circularArrayStream","circularArrayStream( src:ArrayLikeObject[, options:Object] )"],["circularArrayStream.factory","circularArrayStream.factory( [options:Object] )"],["circularArrayStream.objectMode","circularArrayStream.objectMode( src:ArrayLikeObject[, options:Object] )"],["CircularBuffer","CircularBuffer( buffer:integer|ArrayLike )"],["CircularBuffer.prototype.clear","CircularBuffer.prototype.clear()"],["CircularBuffer.prototype.count","CircularBuffer.prototype.count"],["CircularBuffer.prototype.full","CircularBuffer.prototype.full"],["CircularBuffer.prototype.iterator","CircularBuffer.prototype.iterator( [niters:integer] )"],["CircularBuffer.prototype.length","CircularBuffer.prototype.length"],["CircularBuffer.prototype.push","CircularBuffer.prototype.push( value:any )"],["CircularBuffer.prototype.toArray","CircularBuffer.prototype.toArray()"],["CircularBuffer.prototype.toJSON","CircularBuffer.prototype.toJSON()"],["close","close( fd:integer, clbk:Function )"],["close.sync","close.sync( fd:integer )"],["CMUDICT","CMUDICT( [options:Object] )"],["codePointAt","codePointAt( str:string, idx:integer[, backward:boolean] )"],["commonKeys","commonKeys( obj1:any, obj2:any[, ...obj:any] )"],["commonKeysIn","commonKeysIn( obj1:any, obj2:any[, ...obj:any] )"],["complex","complex( real:number, imag:number[, dtype:string] )"],["Complex64","Complex64( real:number, imag:number )"],["COMPLEX64_NUM_BYTES","COMPLEX64_NUM_BYTES"],["Complex128","Complex128( real:number, imag:number )"],["COMPLEX128_NUM_BYTES","COMPLEX128_NUM_BYTES"],["complexarray","complexarray( [dtype:string] )"],["complexarray","complexarray( length:integer[, dtype:string] )"],["complexarray","complexarray( complexarray:ComplexArray[, dtype:string] )"],["complexarray","complexarray( obj:Object[, dtype:string] )"],["complexarray","complexarray( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]][, dtype:string] )"],["complexarrayCtors","complexarrayCtors( dtype:string )"],["complexarrayDataTypes","complexarrayDataTypes()"],["complexCtors","complexCtors( dtype:string )"],["complexDataType","complexDataType( value:any )"],["complexDataTypes","complexDataTypes()"],["complexPromotionRules","complexPromotionRules( [dtype1:string, dtype2:string] )"],["compose","compose( ...f:Function )"],["composeAsync","composeAsync( ...f:Function )"],["configdir","configdir( [p:string] )"],["conj","conj( z:Complex128 )"],["conjf","conjf( z:Complex64 )"],["constantcase","constantcase( str:string )"],["constantFunction","constantFunction( val:any )"],["constantStream","constantStream( value:string|Buffer|Uint8Array|any[, options:Object] )"],["constantStream.factory","constantStream.factory( [value:string|Buffer|Uint8Array|any, ][options:Object] )"],["constantStream.objectMode","constantStream.objectMode( value:any[, options:Object] )"],["constructorName","constructorName( val:any )"],["contains","contains( val:ArrayLike, searchValue:any[, position:integer] )"],["convertArray","convertArray( arr:ArrayLikeObject, dtype:string )"],["convertArraySame","convertArraySame( x:ArrayLikeObject, y:Array|TypedArray )"],["convertPath","convertPath( from:string, to:string )"],["copy","copy( value:any[, level:integer] )"],["copyBuffer","copyBuffer( buffer:Buffer )"],["countBy","countBy( collection:Array|TypedArray|Object, [options:Object,] indicator:Function )"],["countByAsync","countByAsync( collection:Array|TypedArray|Object, [options:Object,] indicator:Function, done:Function )"],["countByAsync.factory","countByAsync.factory( [options:Object,] indicator:Function )"],["curry","curry( fcn:Function[, arity:integer][, thisArg:any] )"],["curryRight","curryRight( fcn:Function[, arity:integer][, thisArg:any] )"],["cwd","cwd()"],["DALE_CHALL_NEW","DALE_CHALL_NEW()"],["datasets","datasets( name:string[, options:Object] )"],["DataView","DataView( buffer:ArrayBuffer|SharedArrayBuffer[, byteOffset:integer[, byteLength:integer]] )"],["DataView.prototype.buffer","DataView.prototype.buffer"],["DataView.prototype.byteLength","DataView.prototype.byteLength"],["DataView.prototype.byteOffset","DataView.prototype.byteOffset"],["datespace","datespace( start:number, stop:number[, length:integer][ , options:Object] )"],["dayOfQuarter","dayOfQuarter( [month:string|integer|Date[, day:integer, year:integer]] )"],["dayOfYear","dayOfYear( [month:string|integer|Date[, day:integer, year:integer]] )"],["daysInMonth","daysInMonth( [month:string|integer|Date[, year:integer]] )"],["daysInYear","daysInYear( [value:integer|Date] )"],["ddot","ddot( x:ndarray, y:ndarray )"],["debugSinkStream","debugSinkStream( [options:Object,] [clbk:Function] )"],["debugSinkStream.factory","debugSinkStream.factory( [options:Object] )"],["debugSinkStream.objectMode","debugSinkStream.objectMode( [options:Object,] [clbk:Function] )"],["debugStream","debugStream( [options:Object,] [clbk:Function] )"],["debugStream.factory","debugStream.factory( [options:Object] )"],["debugStream.objectMode","debugStream.objectMode( [options:Object,] [clbk:Function] )"],["deepEqual","deepEqual( a:any, b:any )"],["deepGet","deepGet( obj:ObjectLike, path:string|Array[, options:Object] )"],["deepGet.factory","deepGet.factory( path:string|Array[, options:Object] )"],["deepHasOwnProp","deepHasOwnProp( value:any, path:string|Array[, options:Object] )"],["deepHasOwnProp.factory","deepHasOwnProp.factory( path:string|Array[, options:Object] )"],["deepHasProp","deepHasProp( value:any, path:string|Array[, options:Object] )"],["deepHasProp.factory","deepHasProp.factory( path:string|Array[, options:Object] )"],["deepPluck","deepPluck( arr:Array, path:string|Array[, options:Object] )"],["deepSet","deepSet( obj:ObjectLike, path:string|Array, value:any[, options:Object] )"],["deepSet.factory","deepSet.factory( path:string|Array[, options:Object] )"],["defineMemoizedProperty","defineMemoizedProperty( obj:Object, prop:string|symbol, descriptor:Object )"],["defineProperties","defineProperties( obj:Object, properties:Object )"],["defineProperty","defineProperty( obj:Object, prop:string|symbol, descriptor:Object )"],["dirname","dirname( path:string )"],["DoublyLinkedList","DoublyLinkedList()"],["doUntil","doUntil( fcn:Function, predicate:Function[, thisArg:any] )"],["doUntilAsync","doUntilAsync( fcn:Function, predicate:Function, done:Function[, thisArg:any] )"],["doUntilEach","doUntilEach( collection:Array|TypedArray|Object, fcn:Function, predicate:Function[, thisArg:any] )"],["doUntilEachRight","doUntilEachRight( collection:Array|TypedArray|Object, fcn:Function, predicate:Function[, thisArg:any] )"],["doWhile","doWhile( fcn:Function, predicate:Function[, thisArg:any] )"],["doWhileAsync","doWhileAsync( fcn:Function, predicate:Function, done:Function[, thisArg:any] )"],["doWhileEach","doWhileEach( collection:Array|TypedArray|Object, fcn:Function, predicate:Function[, thisArg:any] )"],["doWhileEachRight","doWhileEachRight( collection:Array|TypedArray|Object, fcn:Function, predicate:Function[, thisArg:any] )"],["dswap","dswap( x:ndarray, y:ndarray )"],["E","E"],["EMOJI","EMOJI()"],["EMOJI_CODE_PICTO","EMOJI_CODE_PICTO()"],["EMOJI_PICTO_CODE","EMOJI_PICTO_CODE()"],["emptyStream","emptyStream( [options:Object] )"],["emptyStream.factory","emptyStream.factory( [options:Object] )"],["emptyStream.objectMode","emptyStream.objectMode()"],["endsWith","endsWith( str:string, search:string[, len:integer] )"],["enumerableProperties","enumerableProperties( value:any )"],["enumerablePropertiesIn","enumerablePropertiesIn( value:any )"],["enumerablePropertySymbols","enumerablePropertySymbols( value:any )"],["enumerablePropertySymbolsIn","enumerablePropertySymbolsIn( value:any )"],["ENV","ENV"],["EPS","EPS"],["error2json","error2json( error:Error )"],["EULERGAMMA","EULERGAMMA"],["every","every( collection:Array|TypedArray|Object )"],["everyBy","everyBy( collection:Array|TypedArray|Object, predicate:Function[, thisArg:any ] )"],["everyByAsync","everyByAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["everyByAsync.factory","everyByAsync.factory( [options:Object,] predicate:Function )"],["everyByRight","everyByRight( collection:Array|TypedArray|Object, predicate:Function[, thisArg:any ] )"],["everyByRightAsync","everyByRightAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["everyByRightAsync.factory","everyByRightAsync.factory( [options:Object,] predicate:Function )"],["evil","evil( str:string )"],["EXEC_PATH","EXEC_PATH"],["exists","exists( path:string|Buffer, clbk:Function )"],["exists.sync","exists.sync( path:string|Buffer )"],["expandContractions","expandContractions( str:string )"],["extname","extname( filename:string )"],["fastmath.abs","fastmath.abs( x:number )"],["fastmath.acosh","fastmath.acosh( x:number )"],["fastmath.ampbm","fastmath.ampbm( x:number, y:number )"],["fastmath.ampbm.factory","fastmath.ampbm.factory( alpha:number, beta:number, [nonnegative:boolean[, ints:boolean]] )"],["fastmath.asinh","fastmath.asinh( x:number )"],["fastmath.atanh","fastmath.atanh( x:number )"],["fastmath.hypot","fastmath.hypot( x:number, y:number )"],["fastmath.log2Uint32","fastmath.log2Uint32( x:uinteger )"],["fastmath.max","fastmath.max( x:number, y:number )"],["fastmath.min","fastmath.min( x:number, y:number )"],["fastmath.powint","fastmath.powint( x:number, y:integer )"],["fastmath.sqrtUint32","fastmath.sqrtUint32( x:uinteger )"],["FEMALE_FIRST_NAMES_EN","FEMALE_FIRST_NAMES_EN()"],["FIFO","FIFO()"],["filledarray","filledarray( [dtype:string] )"],["filledarray","filledarray( value:any, length:integer[, dtype:string] )"],["filledarray","filledarray( value:any, array:ArrayLikeObject[, dtype:string] )"],["filledarray","filledarray( value:any, iterable:Iterable[, dtype:string] )"],["filledarray","filledarray( value:any, buffer:ArrayBuffer[, byteOffset:integer[, length:integer]][, dtype:string] )"],["filledarrayBy","filledarrayBy( [dtype:string] )"],["filledarrayBy","filledarrayBy( length:integer[, dtype:string], clbk:Function[, thisArg:any] )"],["filledarrayBy","filledarrayBy( array:ArrayLikeObject[, dtype:string], clbk:Function[, thisArg:any] )"],["filledarrayBy","filledarrayBy( iterable:Iterable[, dtype:string], clbk:Function[, thisArg:any] )"],["filledarrayBy","filledarrayBy( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]][, dtype:string], clbk:Function[, thisArg:any] )"],["filterArguments","filterArguments( fcn:Function, predicate:Function[, thisArg:any] )"],["find","find( arr:Array|TypedArray|string, [options:Object,] clbk:Function )"],["FIVETHIRTYEIGHT_FFQ","FIVETHIRTYEIGHT_FFQ()"],["flattenArray","flattenArray( arr:ArrayLikeObject[, options:Object] )"],["flattenArray.factory","flattenArray.factory( dims:ArrayLike<integer>[, options:Object] )"],["flattenObject","flattenObject( obj:ObjectLike[, options:Object] )"],["flattenObject.factory","flattenObject.factory( [options:Object] )"],["flignerTest","flignerTest( ...x:Array[, options:Object] )"],["FLOAT_WORD_ORDER","FLOAT_WORD_ORDER"],["FLOAT16_CBRT_EPS","FLOAT16_CBRT_EPS"],["FLOAT16_EPS","FLOAT16_EPS"],["FLOAT16_EXPONENT_BIAS","FLOAT16_EXPONENT_BIAS"],["FLOAT16_MAX","FLOAT16_MAX"],["FLOAT16_MAX_SAFE_INTEGER","FLOAT16_MAX_SAFE_INTEGER"],["FLOAT16_MIN_SAFE_INTEGER","FLOAT16_MIN_SAFE_INTEGER"],["FLOAT16_NINF","FLOAT16_NINF"],["FLOAT16_NUM_BYTES","FLOAT16_NUM_BYTES"],["FLOAT16_PINF","FLOAT16_PINF"],["FLOAT16_PRECISION","FLOAT16_PRECISION"],["FLOAT16_SMALLEST_NORMAL","FLOAT16_SMALLEST_NORMAL"],["FLOAT16_SMALLEST_SUBNORMAL","FLOAT16_SMALLEST_SUBNORMAL"],["FLOAT16_SQRT_EPS","FLOAT16_SQRT_EPS"],["FLOAT32_CBRT_EPS","FLOAT32_CBRT_EPS"],["FLOAT32_EPS","FLOAT32_EPS"],["FLOAT32_EXPONENT_BIAS","FLOAT32_EXPONENT_BIAS"],["FLOAT32_MAX","FLOAT32_MAX"],["FLOAT32_MAX_SAFE_INTEGER","FLOAT32_MAX_SAFE_INTEGER"],["FLOAT32_MIN_SAFE_INTEGER","FLOAT32_MIN_SAFE_INTEGER"],["FLOAT32_NINF","FLOAT32_NINF"],["FLOAT32_NUM_BYTES","FLOAT32_NUM_BYTES"],["FLOAT32_PINF","FLOAT32_PINF"],["FLOAT32_PRECISION","FLOAT32_PRECISION"],["FLOAT32_SMALLEST_NORMAL","FLOAT32_SMALLEST_NORMAL"],["FLOAT32_SMALLEST_SUBNORMAL","FLOAT32_SMALLEST_SUBNORMAL"],["FLOAT32_SQRT_EPS","FLOAT32_SQRT_EPS"],["Float32Array","Float32Array()"],["Float32Array","Float32Array( length:integer )"],["Float32Array","Float32Array( typedarray:TypedArray )"],["Float32Array","Float32Array( obj:Object )"],["Float32Array","Float32Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Float32Array.from","Float32Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Float32Array.of","Float32Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Float32Array.BYTES_PER_ELEMENT","Float32Array.BYTES_PER_ELEMENT"],["Float32Array.name","Float32Array.name"],["Float32Array.prototype.buffer","Float32Array.prototype.buffer"],["Float32Array.prototype.byteLength","Float32Array.prototype.byteLength"],["Float32Array.prototype.byteOffset","Float32Array.prototype.byteOffset"],["Float32Array.prototype.BYTES_PER_ELEMENT","Float32Array.prototype.BYTES_PER_ELEMENT"],["Float32Array.prototype.length","Float32Array.prototype.length"],["Float32Array.prototype.copyWithin","Float32Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Float32Array.prototype.entries","Float32Array.prototype.entries()"],["Float32Array.prototype.every","Float32Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Float32Array.prototype.fill","Float32Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Float32Array.prototype.filter","Float32Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Float32Array.prototype.find","Float32Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Float32Array.prototype.findIndex","Float32Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Float32Array.prototype.forEach","Float32Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Float32Array.prototype.includes","Float32Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Float32Array.prototype.indexOf","Float32Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Float32Array.prototype.join","Float32Array.prototype.join( [separator:string] )"],["Float32Array.prototype.keys","Float32Array.prototype.keys()"],["Float32Array.prototype.lastIndexOf","Float32Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Float32Array.prototype.map","Float32Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Float32Array.prototype.reduce","Float32Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Float32Array.prototype.reduceRight","Float32Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Float32Array.prototype.reverse","Float32Array.prototype.reverse()"],["Float32Array.prototype.set","Float32Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Float32Array.prototype.slice","Float32Array.prototype.slice( [begin:integer[, end:integer]] )"],["Float32Array.prototype.some","Float32Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Float32Array.prototype.sort","Float32Array.prototype.sort( [compareFunction:Function] )"],["Float32Array.prototype.subarray","Float32Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Float32Array.prototype.toLocaleString","Float32Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Float32Array.prototype.toString","Float32Array.prototype.toString()"],["Float32Array.prototype.values","Float32Array.prototype.values()"],["FLOAT64_EXPONENT_BIAS","FLOAT64_EXPONENT_BIAS"],["FLOAT64_HIGH_WORD_EXPONENT_MASK","FLOAT64_HIGH_WORD_EXPONENT_MASK"],["FLOAT64_HIGH_WORD_SIGNIFICAND_MASK","FLOAT64_HIGH_WORD_SIGNIFICAND_MASK"],["FLOAT64_MAX","FLOAT64_MAX"],["FLOAT64_MAX_BASE2_EXPONENT","FLOAT64_MAX_BASE2_EXPONENT"],["FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL","FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL"],["FLOAT64_MAX_BASE10_EXPONENT","FLOAT64_MAX_BASE10_EXPONENT"],["FLOAT64_MAX_BASE10_EXPONENT_SUBNORMAL","FLOAT64_MAX_BASE10_EXPONENT_SUBNORMAL"],["FLOAT64_MAX_LN","FLOAT64_MAX_LN"],["FLOAT64_MAX_SAFE_FIBONACCI","FLOAT64_MAX_SAFE_FIBONACCI"],["FLOAT64_MAX_SAFE_INTEGER","FLOAT64_MAX_SAFE_INTEGER"],["FLOAT64_MAX_SAFE_LUCAS","FLOAT64_MAX_SAFE_LUCAS"],["FLOAT64_MAX_SAFE_NTH_FIBONACCI","FLOAT64_MAX_SAFE_NTH_FIBONACCI"],["FLOAT64_MAX_SAFE_NTH_LUCAS","FLOAT64_MAX_SAFE_NTH_LUCAS"],["FLOAT64_MIN_BASE2_EXPONENT","FLOAT64_MIN_BASE2_EXPONENT"],["FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL","FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL"],["FLOAT64_MIN_BASE10_EXPONENT","FLOAT64_MIN_BASE10_EXPONENT"],["FLOAT64_MIN_BASE10_EXPONENT_SUBNORMAL","FLOAT64_MIN_BASE10_EXPONENT_SUBNORMAL"],["FLOAT64_MIN_LN","FLOAT64_MIN_LN"],["FLOAT64_MIN_SAFE_INTEGER","FLOAT64_MIN_SAFE_INTEGER"],["FLOAT64_NUM_BYTES","FLOAT64_NUM_BYTES"],["FLOAT64_PRECISION","FLOAT64_PRECISION"],["FLOAT64_SMALLEST_NORMAL","FLOAT64_SMALLEST_NORMAL"],["FLOAT64_SMALLEST_SUBNORMAL","FLOAT64_SMALLEST_SUBNORMAL"],["Float64Array","Float64Array()"],["Float64Array","Float64Array( length:integer )"],["Float64Array","Float64Array( typedarray:TypedArray )"],["Float64Array","Float64Array( obj:Object )"],["Float64Array","Float64Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Float64Array.from","Float64Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Float64Array.of","Float64Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Float64Array.BYTES_PER_ELEMENT","Float64Array.BYTES_PER_ELEMENT"],["Float64Array.name","Float64Array.name"],["Float64Array.prototype.buffer","Float64Array.prototype.buffer"],["Float64Array.prototype.byteLength","Float64Array.prototype.byteLength"],["Float64Array.prototype.byteOffset","Float64Array.prototype.byteOffset"],["Float64Array.prototype.BYTES_PER_ELEMENT","Float64Array.prototype.BYTES_PER_ELEMENT"],["Float64Array.prototype.length","Float64Array.prototype.length"],["Float64Array.prototype.copyWithin","Float64Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Float64Array.prototype.entries","Float64Array.prototype.entries()"],["Float64Array.prototype.every","Float64Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Float64Array.prototype.fill","Float64Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Float64Array.prototype.filter","Float64Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Float64Array.prototype.find","Float64Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Float64Array.prototype.findIndex","Float64Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Float64Array.prototype.forEach","Float64Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Float64Array.prototype.includes","Float64Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Float64Array.prototype.indexOf","Float64Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Float64Array.prototype.join","Float64Array.prototype.join( [separator:string] )"],["Float64Array.prototype.keys","Float64Array.prototype.keys()"],["Float64Array.prototype.lastIndexOf","Float64Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Float64Array.prototype.map","Float64Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Float64Array.prototype.reduce","Float64Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Float64Array.prototype.reduceRight","Float64Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Float64Array.prototype.reverse","Float64Array.prototype.reverse()"],["Float64Array.prototype.set","Float64Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Float64Array.prototype.slice","Float64Array.prototype.slice( [begin:integer[, end:integer]] )"],["Float64Array.prototype.some","Float64Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Float64Array.prototype.sort","Float64Array.prototype.sort( [compareFunction:Function] )"],["Float64Array.prototype.subarray","Float64Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Float64Array.prototype.toLocaleString","Float64Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Float64Array.prototype.toString","Float64Array.prototype.toString()"],["Float64Array.prototype.values","Float64Array.prototype.values()"],["forEach","forEach( collection:Array|TypedArray|Object, fcn:Function[, thisArg:any] )"],["forEachAsync","forEachAsync( collection:Array|TypedArray|Object, [options:Object,] fcn:Function, done:Function )"],["forEachAsync.factory","forEachAsync.factory( [options:Object,] fcn:Function )"],["forEachRight","forEachRight( collection:Array|TypedArray|Object, fcn:Function[, thisArg:any] )"],["forEachRightAsync","forEachRightAsync( collection:Array|TypedArray|Object, [options:Object,] fcn:Function, done:Function )"],["forEachRightAsync.factory","forEachRightAsync.factory( [options:Object,] fcn:Function )"],["forIn","forIn( obj:Object, fcn:Function[, thisArg:any] )"],["forOwn","forOwn( obj:Object, fcn:Function[, thisArg:any] )"],["FOURTH_PI","FOURTH_PI"],["FOURTH_ROOT_EPS","FOURTH_ROOT_EPS"],["FRB_SF_WAGE_RIGIDITY","FRB_SF_WAGE_RIGIDITY()"],["fromCodePoint","fromCodePoint( ...pt:integer )"],["functionName","functionName( fcn:Function )"],["functionSequence","functionSequence( ...fcn:Function )"],["functionSequenceAsync","functionSequenceAsync( ...fcn:Function )"],["GAMMA_LANCZOS_G","GAMMA_LANCZOS_G"],["gdot","gdot( x:ndarray|ArrayLikeObject, y:ndarray|ArrayLikeObject )"],["getegid","getegid()"],["geteuid","geteuid()"],["getgid","getgid()"],["getGlobal","getGlobal( [codegen:boolean] )"],["getPrototypeOf","getPrototypeOf( value:any )"],["getuid","getuid()"],["GLAISHER","GLAISHER"],["group","group( collection:Array|TypedArray|Object, [options:Object,] groups:Array|TypedArray|Object )"],["groupBy","groupBy( collection:Array|TypedArray|Object, [options:Object,] indicator:Function )"],["groupByAsync","groupByAsync( collection:Array|TypedArray|Object, [options:Object,] indicator:Function, done:Function )"],["groupByAsync.factory","groupByAsync.factory( [options:Object,] indicator:Function )"],["groupIn","groupIn( obj:Object|Array|TypedArray, [options:Object,] indicator:Function )"],["groupOwn","groupOwn( obj:Object|Array|TypedArray, [options:Object,] indicator:Function )"],["gswap","gswap( x:ndarray|ArrayLikeObject, y:ndarray|ArrayLikeObject )"],["HALF_LN2","HALF_LN2"],["HALF_PI","HALF_PI"],["HARRISON_BOSTON_HOUSE_PRICES","HARRISON_BOSTON_HOUSE_PRICES()"],["HARRISON_BOSTON_HOUSE_PRICES_CORRECTED","HARRISON_BOSTON_HOUSE_PRICES_CORRECTED()"],["hasArrayBufferSupport","hasArrayBufferSupport()"],["hasAsyncAwaitSupport","hasAsyncAwaitSupport()"],["hasAsyncIteratorSymbolSupport","hasAsyncIteratorSymbolSupport()"],["hasBigInt64ArraySupport","hasBigInt64ArraySupport()"],["hasBigIntSupport","hasBigIntSupport()"],["hasBigUint64ArraySupport","hasBigUint64ArraySupport()"],["hasClassSupport","hasClassSupport()"],["hasDefinePropertiesSupport","hasDefinePropertiesSupport()"],["hasDefinePropertySupport","hasDefinePropertySupport()"],["hasFloat32ArraySupport","hasFloat32ArraySupport()"],["hasFloat64ArraySupport","hasFloat64ArraySupport()"],["hasFunctionNameSupport","hasFunctionNameSupport()"],["hasGeneratorSupport","hasGeneratorSupport()"],["hasGlobalThisSupport","hasGlobalThisSupport()"],["hasInt8ArraySupport","hasInt8ArraySupport()"],["hasInt16ArraySupport","hasInt16ArraySupport()"],["hasInt32ArraySupport","hasInt32ArraySupport()"],["hasIteratorSymbolSupport","hasIteratorSymbolSupport()"],["hasMapSupport","hasMapSupport()"],["hasNodeBufferSupport","hasNodeBufferSupport()"],["hasOwnProp","hasOwnProp( value:any, property:any )"],["hasProp","hasProp( value:any, property:any )"],["hasProxySupport","hasProxySupport()"],["hasSetSupport","hasSetSupport()"],["hasSharedArrayBufferSupport","hasSharedArrayBufferSupport()"],["hasSymbolSupport","hasSymbolSupport()"],["hasToStringTagSupport","hasToStringTagSupport()"],["hasUint8ArraySupport","hasUint8ArraySupport()"],["hasUint8ClampedArraySupport","hasUint8ClampedArraySupport()"],["hasUint16ArraySupport","hasUint16ArraySupport()"],["hasUint32ArraySupport","hasUint32ArraySupport()"],["hasUTF16SurrogatePairAt","hasUTF16SurrogatePairAt( str:string, pos:integer )"],["hasWeakMapSupport","hasWeakMapSupport()"],["hasWeakSetSupport","hasWeakSetSupport()"],["hasWebAssemblySupport","hasWebAssemblySupport()"],["HERNDON_VENUS_SEMIDIAMETERS","HERNDON_VENUS_SEMIDIAMETERS()"],["homedir","homedir()"],["HOURS_IN_DAY","HOURS_IN_DAY"],["HOURS_IN_WEEK","HOURS_IN_WEEK"],["hoursInMonth","hoursInMonth( [month:string|Date|integer[, year:integer]] )"],["hoursInYear","hoursInYear( [value:integer|Date] )"],["httpServer","httpServer( [options:Object,] [requestListener:Function] )"],["identity","identity( x:any )"],["ifelse","ifelse( bool:boolean, x:any, y:any )"],["ifelseAsync","ifelseAsync( predicate:Function, x:any, y:any, done:Function )"],["ifthen","ifthen( bool:boolean, x:Function, y:Function )"],["ifthenAsync","ifthenAsync( predicate:Function, x:Function, y:Function, done:Function )"],["imag","imag( z:Complex128 )"],["imagf","imagf( z:Complex64 )"],["IMG_ACANTHUS_MOLLIS","IMG_ACANTHUS_MOLLIS()"],["IMG_AIRPLANE_FROM_ABOVE","IMG_AIRPLANE_FROM_ABOVE()"],["IMG_ALLIUM_OREOPHILUM","IMG_ALLIUM_OREOPHILUM()"],["IMG_BLACK_CANYON","IMG_BLACK_CANYON()"],["IMG_DUST_BOWL_HOME","IMG_DUST_BOWL_HOME()"],["IMG_FRENCH_ALPINE_LANDSCAPE","IMG_FRENCH_ALPINE_LANDSCAPE()"],["IMG_LOCOMOTION_HOUSE_CAT","IMG_LOCOMOTION_HOUSE_CAT()"],["IMG_LOCOMOTION_NUDE_MALE","IMG_LOCOMOTION_NUDE_MALE()"],["IMG_MARCH_PASTORAL","IMG_MARCH_PASTORAL()"],["IMG_NAGASAKI_BOATS","IMG_NAGASAKI_BOATS()"],["incrapcorr","incrapcorr( [mx:number, my:number] )"],["incrBinaryClassification","incrBinaryClassification( N:integer[, options:Object] )"],["incrcount","incrcount()"],["incrcovariance","incrcovariance( [mx:number, my:number] )"],["incrcovmat","incrcovmat( out:integer|ndarray[, means:ndarray] )"],["incrcv","incrcv( [mean:number] )"],["increwmean","increwmean( α:number )"],["increwstdev","increwstdev( α:number )"],["increwvariance","increwvariance( α:number )"],["incrgmean","incrgmean()"],["incrgrubbs","incrgrubbs( [options:Object] )"],["incrhmean","incrhmean()"],["incrkmeans","incrkmeans( k:integer|ndarray[, ndims:integer][, options:Object] )"],["incrkurtosis","incrkurtosis()"],["incrmaape","incrmaape()"],["incrmae","incrmae()"],["incrmapcorr","incrmapcorr( W:integer[, mx:number, my:number] )"],["incrmape","incrmape()"],["incrmax","incrmax()"],["incrmaxabs","incrmaxabs()"],["incrmcovariance","incrmcovariance( W:integer[, mx:number, my:number] )"],["incrmcv","incrmcv( W:integer[, mean:number] )"],["incrmda","incrmda()"],["incrme","incrme()"],["incrmean","incrmean()"],["incrmeanabs","incrmeanabs()"],["incrmeanabs2","incrmeanabs2()"],["incrmeanstdev","incrmeanstdev( [out:Array|TypedArray] )"],["incrmeanvar","incrmeanvar( [out:Array|TypedArray] )"],["incrmgmean","incrmgmean( W:integer )"],["incrmgrubbs","incrmgrubbs( W:integer[, options:Object] )"],["incrmhmean","incrmhmean( W:integer )"],["incrmidrange","incrmidrange()"],["incrmin","incrmin()"],["incrminabs","incrminabs()"],["incrminmax","incrminmax( [out:Array|TypedArray] )"],["incrminmaxabs","incrminmaxabs( [out:Array|TypedArray] )"],["incrmmaape","incrmmaape( W:integer )"],["incrmmae","incrmmae( W:integer )"],["incrmmape","incrmmape( W:integer )"],["incrmmax","incrmmax( W:integer )"],["incrmmaxabs","incrmmaxabs( W:integer )"],["incrmmda","incrmmda( W:integer )"],["incrmme","incrmme( W:integer )"],["incrmmean","incrmmean( W:integer )"],["incrmmeanabs","incrmmeanabs( W:integer )"],["incrmmeanabs2","incrmmeanabs2( W:integer )"],["incrmmeanstdev","incrmmeanstdev( [out:Array|TypedArray,] W:integer )"],["incrmmeanvar","incrmmeanvar( [out:Array|TypedArray,] W:integer )"],["incrmmidrange","incrmmidrange( W:integer )"],["incrmmin","incrmmin( W:integer )"],["incrmminabs","incrmminabs( W:integer )"],["incrmminmax","incrmminmax( [out:Array|TypedArray,] W:integer )"],["incrmminmaxabs","incrmminmaxabs( [out:Array|TypedArray,] W:integer )"],["incrmmpe","incrmmpe( W:integer )"],["incrmmse","incrmmse( W:integer )"],["incrmpcorr","incrmpcorr( W:integer[, mx:number, my:number] )"],["incrmpcorr2","incrmpcorr2( W:integer[, mx:number, my:number] )"],["incrmpcorrdist","incrmpcorrdist( W:integer[, mx:number, my:number] )"],["incrmpe","incrmpe()"],["incrmprod","incrmprod( W:integer )"],["incrmrange","incrmrange( W:integer )"],["incrmrmse","incrmrmse( W:integer )"],["incrmrss","incrmrss( W:integer )"],["incrmse","incrmse()"],["incrmstdev","incrmstdev( W:integer[, mean:number] )"],["incrmsum","incrmsum( W:integer )"],["incrmsumabs","incrmsumabs( W:integer )"],["incrmsumabs2","incrmsumabs2( W:integer )"],["incrmsummary","incrmsummary( W:integer )"],["incrmsumprod","incrmsumprod( W:integer )"],["incrmvariance","incrmvariance( W:integer[, mean:number] )"],["incrmvmr","incrmvmr( W:integer[, mean:number] )"],["incrnancount","incrnancount()"],["incrnansum","incrnansum()"],["incrnansumabs","incrnansumabs()"],["incrnansumabs2","incrnansumabs2()"],["incrpcorr","incrpcorr( [mx:number, my:number] )"],["incrpcorr2","incrpcorr2( [mx:number, my:number] )"],["incrpcorrdist","incrpcorrdist( [mx:number, my:number] )"],["incrpcorrdistmat","incrpcorrdistmat( out:integer|ndarray[, means:ndarray] )"],["incrpcorrmat","incrpcorrmat( out:integer|ndarray[, means:ndarray] )"],["incrprod","incrprod()"],["incrrange","incrrange()"],["incrrmse","incrrmse()"],["incrrss","incrrss()"],["incrskewness","incrskewness()"],["incrspace","incrspace( start:number, stop:number[, increment:number] )"],["incrstdev","incrstdev( [mean:number] )"],["incrsum","incrsum()"],["incrsumabs","incrsumabs()"],["incrsumabs2","incrsumabs2()"],["incrsummary","incrsummary()"],["incrsumprod","incrsumprod()"],["incrvariance","incrvariance( [mean:number] )"],["incrvmr","incrvmr( [mean:number] )"],["incrwmean","incrwmean()"],["ind2sub","ind2sub( shape:ArrayLike, idx:integer[, options:Object] )"],["ind2sub.assign","ind2sub.assign( shape:ArrayLike, idx:integer[, options:Object], out:Array|TypedArray|Object )"],["indexOf","indexOf( arr:ArrayLike, searchElement:any[, fromIndex:integer] )"],["inherit","inherit( ctor:Object|Function, superCtor:Object|Function )"],["inheritedEnumerableProperties","inheritedEnumerableProperties( value:any[, level:integer] )"],["inheritedEnumerablePropertySymbols","inheritedEnumerablePropertySymbols( value:any[, level:integer] )"],["inheritedKeys","inheritedKeys( value:any[, level:integer] )"],["inheritedNonEnumerableProperties","inheritedNonEnumerableProperties( value:any[, level:integer] )"],["inheritedNonEnumerablePropertyNames","inheritedNonEnumerablePropertyNames( value:any[, level:integer] )"],["inheritedNonEnumerablePropertySymbols","inheritedNonEnumerablePropertySymbols( value:any[, level:integer] )"],["inheritedProperties","inheritedProperties( value:any[, level:integer] )"],["inheritedPropertyDescriptor","inheritedPropertyDescriptor( value:any, property:string|symbol[, level:integer] )"],["inheritedPropertyDescriptors","inheritedPropertyDescriptors( value:any[, level:integer] )"],["inheritedPropertyNames","inheritedPropertyNames( value:any[, level:integer] )"],["inheritedPropertySymbols","inheritedPropertySymbols( value:any[, level:integer] )"],["inheritedWritableProperties","inheritedWritableProperties( value:any[, level:integer] )"],["inheritedWritablePropertyNames","inheritedWritablePropertyNames( value:any[, level:integer] )"],["inheritedWritablePropertySymbols","inheritedWritablePropertySymbols( value:any[, level:integer] )"],["inmap","inmap( collection:Array|TypedArray|Object, fcn:Function[, thisArg:any] )"],["inmapAsync","inmapAsync( collection:Array|TypedArray|Object, [options:Object,] fcn:Function, done:Function )"],["inmapAsync.factory","inmapAsync.factory( [options:Object,] fcn:Function )"],["inmapRight","inmapRight( collection:Array|TypedArray|Object, fcn:Function[, thisArg:any] )"],["inmapRightAsync","inmapRightAsync( collection:Array|TypedArray|Object, [options:Object,] fcn:Function, done:Function )"],["inmapRightAsync.factory","inmapRightAsync.factory( [options:Object,] fcn:Function )"],["inspectSinkStream","inspectSinkStream( [options:Object,] clbk:Function )"],["inspectSinkStream.factory","inspectSinkStream.factory( [options:Object] )"],["inspectSinkStream.objectMode","inspectSinkStream.objectMode( [options:Object,] clbk:Function )"],["inspectStream","inspectStream( [options:Object,] clbk:Function )"],["inspectStream.factory","inspectStream.factory( [options:Object] )"],["inspectStream.objectMode","inspectStream.objectMode( [options:Object,] clbk:Function )"],["instanceOf","instanceOf( value:any, constructor:Function )"],["INT8_MAX","INT8_MAX"],["INT8_MIN","INT8_MIN"],["INT8_NUM_BYTES","INT8_NUM_BYTES"],["Int8Array","Int8Array()"],["Int8Array","Int8Array( length:integer )"],["Int8Array","Int8Array( typedarray:TypedArray )"],["Int8Array","Int8Array( obj:Object )"],["Int8Array","Int8Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Int8Array.from","Int8Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Int8Array.of","Int8Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Int8Array.BYTES_PER_ELEMENT","Int8Array.BYTES_PER_ELEMENT"],["Int8Array.name","Int8Array.name"],["Int8Array.prototype.buffer","Int8Array.prototype.buffer"],["Int8Array.prototype.byteLength","Int8Array.prototype.byteLength"],["Int8Array.prototype.byteOffset","Int8Array.prototype.byteOffset"],["Int8Array.prototype.BYTES_PER_ELEMENT","Int8Array.prototype.BYTES_PER_ELEMENT"],["Int8Array.prototype.length","Int8Array.prototype.length"],["Int8Array.prototype.copyWithin","Int8Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Int8Array.prototype.entries","Int8Array.prototype.entries()"],["Int8Array.prototype.every","Int8Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Int8Array.prototype.fill","Int8Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Int8Array.prototype.filter","Int8Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Int8Array.prototype.find","Int8Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Int8Array.prototype.findIndex","Int8Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Int8Array.prototype.forEach","Int8Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Int8Array.prototype.includes","Int8Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Int8Array.prototype.indexOf","Int8Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Int8Array.prototype.join","Int8Array.prototype.join( [separator:string] )"],["Int8Array.prototype.keys","Int8Array.prototype.keys()"],["Int8Array.prototype.lastIndexOf","Int8Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Int8Array.prototype.map","Int8Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Int8Array.prototype.reduce","Int8Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Int8Array.prototype.reduceRight","Int8Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Int8Array.prototype.reverse","Int8Array.prototype.reverse()"],["Int8Array.prototype.set","Int8Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Int8Array.prototype.slice","Int8Array.prototype.slice( [begin:integer[, end:integer]] )"],["Int8Array.prototype.some","Int8Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Int8Array.prototype.sort","Int8Array.prototype.sort( [compareFunction:Function] )"],["Int8Array.prototype.subarray","Int8Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Int8Array.prototype.toLocaleString","Int8Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Int8Array.prototype.toString","Int8Array.prototype.toString()"],["Int8Array.prototype.values","Int8Array.prototype.values()"],["INT16_MAX","INT16_MAX"],["INT16_MIN","INT16_MIN"],["INT16_NUM_BYTES","INT16_NUM_BYTES"],["Int16Array","Int16Array()"],["Int16Array","Int16Array( length:integer )"],["Int16Array","Int16Array( typedarray:TypedArray )"],["Int16Array","Int16Array( obj:Object )"],["Int16Array","Int16Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Int16Array.from","Int16Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Int16Array.of","Int16Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Int16Array.BYTES_PER_ELEMENT","Int16Array.BYTES_PER_ELEMENT"],["Int16Array.name","Int16Array.name"],["Int16Array.prototype.buffer","Int16Array.prototype.buffer"],["Int16Array.prototype.byteLength","Int16Array.prototype.byteLength"],["Int16Array.prototype.byteOffset","Int16Array.prototype.byteOffset"],["Int16Array.prototype.BYTES_PER_ELEMENT","Int16Array.prototype.BYTES_PER_ELEMENT"],["Int16Array.prototype.length","Int16Array.prototype.length"],["Int16Array.prototype.copyWithin","Int16Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Int16Array.prototype.entries","Int16Array.prototype.entries()"],["Int16Array.prototype.every","Int16Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Int16Array.prototype.fill","Int16Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Int16Array.prototype.filter","Int16Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Int16Array.prototype.find","Int16Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Int16Array.prototype.findIndex","Int16Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Int16Array.prototype.forEach","Int16Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Int16Array.prototype.includes","Int16Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Int16Array.prototype.indexOf","Int16Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Int16Array.prototype.join","Int16Array.prototype.join( [separator:string] )"],["Int16Array.prototype.keys","Int16Array.prototype.keys()"],["Int16Array.prototype.lastIndexOf","Int16Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Int16Array.prototype.map","Int16Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Int16Array.prototype.reduce","Int16Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Int16Array.prototype.reduceRight","Int16Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Int16Array.prototype.reverse","Int16Array.prototype.reverse()"],["Int16Array.prototype.set","Int16Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Int16Array.prototype.slice","Int16Array.prototype.slice( [begin:integer[, end:integer]] )"],["Int16Array.prototype.some","Int16Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Int16Array.prototype.sort","Int16Array.prototype.sort( [compareFunction:Function] )"],["Int16Array.prototype.subarray","Int16Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Int16Array.prototype.toLocaleString","Int16Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Int16Array.prototype.toString","Int16Array.prototype.toString()"],["Int16Array.prototype.values","Int16Array.prototype.values()"],["INT32_MAX","INT32_MAX"],["INT32_MIN","INT32_MIN"],["INT32_NUM_BYTES","INT32_NUM_BYTES"],["Int32Array","Int32Array()"],["Int32Array","Int32Array( length:integer )"],["Int32Array","Int32Array( typedarray:TypedArray )"],["Int32Array","Int32Array( obj:Object )"],["Int32Array","Int32Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Int32Array.from","Int32Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Int32Array.of","Int32Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Int32Array.BYTES_PER_ELEMENT","Int32Array.BYTES_PER_ELEMENT"],["Int32Array.name","Int32Array.name"],["Int32Array.prototype.buffer","Int32Array.prototype.buffer"],["Int32Array.prototype.byteLength","Int32Array.prototype.byteLength"],["Int32Array.prototype.byteOffset","Int32Array.prototype.byteOffset"],["Int32Array.prototype.BYTES_PER_ELEMENT","Int32Array.prototype.BYTES_PER_ELEMENT"],["Int32Array.prototype.length","Int32Array.prototype.length"],["Int32Array.prototype.copyWithin","Int32Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Int32Array.prototype.entries","Int32Array.prototype.entries()"],["Int32Array.prototype.every","Int32Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Int32Array.prototype.fill","Int32Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Int32Array.prototype.filter","Int32Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Int32Array.prototype.find","Int32Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Int32Array.prototype.findIndex","Int32Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Int32Array.prototype.forEach","Int32Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Int32Array.prototype.includes","Int32Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Int32Array.prototype.indexOf","Int32Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Int32Array.prototype.join","Int32Array.prototype.join( [separator:string] )"],["Int32Array.prototype.keys","Int32Array.prototype.keys()"],["Int32Array.prototype.lastIndexOf","Int32Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Int32Array.prototype.map","Int32Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Int32Array.prototype.reduce","Int32Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Int32Array.prototype.reduceRight","Int32Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Int32Array.prototype.reverse","Int32Array.prototype.reverse()"],["Int32Array.prototype.set","Int32Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Int32Array.prototype.slice","Int32Array.prototype.slice( [begin:integer[, end:integer]] )"],["Int32Array.prototype.some","Int32Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Int32Array.prototype.sort","Int32Array.prototype.sort( [compareFunction:Function] )"],["Int32Array.prototype.subarray","Int32Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Int32Array.prototype.toLocaleString","Int32Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Int32Array.prototype.toString","Int32Array.prototype.toString()"],["Int32Array.prototype.values","Int32Array.prototype.values()"],["IS_BIG_ENDIAN","IS_BIG_ENDIAN"],["IS_BROWSER","IS_BROWSER"],["IS_DARWIN","IS_DARWIN"],["IS_ELECTRON","IS_ELECTRON"],["IS_ELECTRON_MAIN","IS_ELECTRON_MAIN"],["IS_ELECTRON_RENDERER","IS_ELECTRON_RENDERER"],["IS_LITTLE_ENDIAN","IS_LITTLE_ENDIAN"],["IS_NODE","IS_NODE"],["IS_WEB_WORKER","IS_WEB_WORKER"],["IS_WINDOWS","IS_WINDOWS"],["isAbsolutePath","isAbsolutePath( value:any )"],["isAbsolutePath.posix","isAbsolutePath.posix( value:any )"],["isAbsolutePath.win32","isAbsolutePath.win32( value:any )"],["isAccessorProperty","isAccessorProperty( value:any, property:any )"],["isAccessorPropertyIn","isAccessorPropertyIn( value:any, property:any )"],["isAlphagram","isAlphagram( value:any )"],["isAlphaNumeric","isAlphaNumeric( str:string )"],["isAnagram","isAnagram( str:string, value:any )"],["isArguments","isArguments( value:any )"],["isArray","isArray( value:any )"],["isArrayArray","isArrayArray( value:any )"],["isArrayBuffer","isArrayBuffer( value:any )"],["isArrayBufferView","isArrayBufferView( value:any )"],["isArrayLength","isArrayLength( value:any )"],["isArrayLike","isArrayLike( value:any )"],["isArrayLikeObject","isArrayLikeObject( value:any )"],["isASCII","isASCII( str:string )"],["isBetween","isBetween( value:any, a:any, b:any[, left:string, right:string] )"],["isBetweenArray","isBetweenArray( value:any, a:any, b:any[, left:string, right:string] )"],["isBigInt","isBigInt( value:any )"],["isBigUint64Array","isBigUint64Array( value:any )"],["isBinaryString","isBinaryString( value:any )"],["isBoolean","isBoolean( value:any )"],["isBoolean.isPrimitive","isBoolean.isPrimitive( value:any )"],["isBoolean.isObject","isBoolean.isObject( value:any )"],["isBooleanArray","isBooleanArray( value:any )"],["isBooleanArray.primitives","isBooleanArray.primitives( value:any )"],["isBooleanArray.objects","isBooleanArray.objects( value:any )"],["isBoxedPrimitive","isBoxedPrimitive( value:any )"],["isBuffer","isBuffer( value:any )"],["isCapitalized","isCapitalized( value:any )"],["isCentrosymmetricMatrix","isCentrosymmetricMatrix( value:any )"],["isCircular","isCircular( value:any )"],["isCircularArray","isCircularArray( value:any )"],["isCircularPlainObject","isCircularPlainObject( value:any )"],["isClass","isClass( value:any )"],["isCollection","isCollection( value:any )"],["isComplex","isComplex( value:any )"],["isComplex64","isComplex64( value:any )"],["isComplex64Array","isComplex64Array( value:any )"],["isComplex128","isComplex128( value:any )"],["isComplex128Array","isComplex128Array( value:any )"],["isComplexLike","isComplexLike( value:any )"],["isComplexTypedArray","isComplexTypedArray( value:any )"],["isComplexTypedArrayLike","isComplexTypedArrayLike( value:any )"],["isComposite","isComposite( value:any )"],["isComposite.isPrimitive","isComposite.isPrimitive( value:any )"],["isComposite.isObject","isComposite.isObject( value:any )"],["isConfigurableProperty","isConfigurableProperty( value:any, property:any )"],["isConfigurablePropertyIn","isConfigurablePropertyIn( value:any, property:any )"],["isCubeNumber","isCubeNumber( value:any )"],["isCubeNumber.isPrimitive","isCubeNumber.isPrimitive( value:any )"],["isCubeNumber.isObject","isCubeNumber.isObject( value:any )"],["isDataProperty","isDataProperty( value:any, property:any )"],["isDataPropertyIn","isDataPropertyIn( value:any, property:any )"],["isDataView","isDataView( value:any )"],["isDateObject","isDateObject( value:any )"],["isDigitString","isDigitString( str:string )"],["isEmailAddress","isEmailAddress( value:any )"],["isEmptyArray","isEmptyArray( value:any )"],["isEmptyArrayLikeObject","isEmptyArrayLikeObject( value:any )"],["isEmptyCollection","isEmptyCollection( value:any )"],["isEmptyObject","isEmptyObject( value:any )"],["isEmptyString","isEmptyString( value:any )"],["isEmptyString.isPrimitive","isEmptyString.isPrimitive( value:any )"],["isEmptyString.isObject","isEmptyString.isObject( value:any )"],["isEnumerableProperty","isEnumerableProperty( value:any, property:any )"],["isEnumerablePropertyIn","isEnumerablePropertyIn( value:any, property:any )"],["isError","isError( value:any )"],["isEvalError","isEvalError( value:any )"],["isEven","isEven( value:any )"],["isEven.isPrimitive","isEven.isPrimitive( value:any )"],["isEven.isObject","isEven.isObject( value:any )"],["isFalsy","isFalsy( value:any )"],["isFalsyArray","isFalsyArray( value:any )"],["isFinite","isFinite( value:any )"],["isFinite.isPrimitive","isFinite.isPrimitive( value:any )"],["isFinite.isObject","isFinite.isObject( value:any )"],["isFiniteArray","isFiniteArray( value:any )"],["isFiniteArray.primitives","isFiniteArray.primitives( value:any )"],["isFiniteArray.objects","isFiniteArray.objects( value:any )"],["isFloat32Array","isFloat32Array( value:any )"],["isFloat32MatrixLike","isFloat32MatrixLike( value:any )"],["isFloat32ndarrayLike","isFloat32ndarrayLike( value:any )"],["isFloat32VectorLike","isFloat32VectorLike( value:any )"],["isFloat64Array","isFloat64Array( value:any )"],["isFloat64MatrixLike","isFloat64MatrixLike( value:any )"],["isFloat64ndarrayLike","isFloat64ndarrayLike( value:any )"],["isFloat64VectorLike","isFloat64VectorLike( value:any )"],["isFunction","isFunction( value:any )"],["isFunctionArray","isFunctionArray( value:any )"],["isGeneratorObject","isGeneratorObject( value:any )"],["isGeneratorObjectLike","isGeneratorObjectLike( value:any )"],["isgzipBuffer","isgzipBuffer( value:any )"],["isHexString","isHexString( str:string )"],["isInfinite","isInfinite( value:any )"],["isInfinite.isPrimitive","isInfinite.isPrimitive( value:any )"],["isInfinite.isObject","isInfinite.isObject( value:any )"],["isInheritedProperty","isInheritedProperty( value:any, property:any )"],["isInt8Array","isInt8Array( value:any )"],["isInt16Array","isInt16Array( value:any )"],["isInt32Array","isInt32Array( value:any )"],["isInteger","isInteger( value:any )"],["isInteger.isPrimitive","isInteger.isPrimitive( value:any )"],["isInteger.isObject","isInteger.isObject( value:any )"],["isIntegerArray","isIntegerArray( value:any )"],["isIntegerArray.primitives","isIntegerArray.primitives( value:any )"],["isIntegerArray.objects","isIntegerArray.objects( value:any )"],["isIterableLike","isIterableLike( value:any )"],["isIteratorLike","isIteratorLike( value:any )"],["isJSON","isJSON( value:any )"],["isLeapYear","isLeapYear( value:any )"],["isLocalhost","isLocalhost( value:any )"],["isLowercase","isLowercase( value:any )"],["isMatrixLike","isMatrixLike( value:any )"],["isMethod","isMethod( value:any, property:any )"],["isMethodIn","isMethodIn( value:any, property:any )"],["isNamedTypedTupleLike","isNamedTypedTupleLike( value:any )"],["isnan","isnan( value:any )"],["isnan.isPrimitive","isnan.isPrimitive( value:any )"],["isnan.isObject","isnan.isObject( value:any )"],["isNaNArray","isNaNArray( value:any )"],["isNaNArray.primitives","isNaNArray.primitives( value:any )"],["isNaNArray.objects","isNaNArray.objects( value:any )"],["isNativeFunction","isNativeFunction( value:any )"],["isndarrayLike","isndarrayLike( value:any )"],["isNegativeInteger","isNegativeInteger( value:any )"],["isNegativeInteger.isPrimitive","isNegativeInteger.isPrimitive( value:any )"],["isNegativeInteger.isObject","isNegativeInteger.isObject( value:any )"],["isNegativeIntegerArray","isNegativeIntegerArray( value:any )"],["isNegativeIntegerArray.primitives","isNegativeIntegerArray.primitives( value:any )"],["isNegativeIntegerArray.objects","isNegativeIntegerArray.objects( value:any )"],["isNegativeNumber","isNegativeNumber( value:any )"],["isNegativeNumber.isPrimitive","isNegativeNumber.isPrimitive( value:any )"],["isNegativeNumber.isObject","isNegativeNumber.isObject( value:any )"],["isNegativeNumberArray","isNegativeNumberArray( value:any )"],["isNegativeNumberArray.primitives","isNegativeNumberArray.primitives( value:any )"],["isNegativeNumberArray.objects","isNegativeNumberArray.objects( value:any )"],["isNegativeZero","isNegativeZero( value:any )"],["isNegativeZero.isPrimitive","isNegativeZero.isPrimitive( value:any )"],["isNegativeZero.isObject","isNegativeZero.isObject( value:any )"],["isNodeBuiltin","isNodeBuiltin( str:string )"],["isNodeDuplexStreamLike","isNodeDuplexStreamLike( value:any )"],["isNodeReadableStreamLike","isNodeReadableStreamLike( value:any )"],["isNodeREPL","isNodeREPL()"],["isNodeStreamLike","isNodeStreamLike( value:any )"],["isNodeTransformStreamLike","isNodeTransformStreamLike( value:any )"],["isNodeWritableStreamLike","isNodeWritableStreamLike( value:any )"],["isNonConfigurableProperty","isNonConfigurableProperty( value:any, property:any )"],["isNonConfigurablePropertyIn","isNonConfigurablePropertyIn( value:any, property:any )"],["isNonEnumerableProperty","isNonEnumerableProperty( value:any, property:any )"],["isNonEnumerablePropertyIn","isNonEnumerablePropertyIn( value:any, property:any )"],["isNonNegativeInteger","isNonNegativeInteger( value:any )"],["isNonNegativeInteger.isPrimitive","isNonNegativeInteger.isPrimitive( value:any )"],["isNonNegativeInteger.isObject","isNonNegativeInteger.isObject( value:any )"],["isNonNegativeIntegerArray","isNonNegativeIntegerArray( value:any )"],["isNonNegativeIntegerArray.primitives","isNonNegativeIntegerArray.primitives( value:any )"],["isNonNegativeIntegerArray.objects","isNonNegativeIntegerArray.objects( value:any )"],["isNonNegativeNumber","isNonNegativeNumber( value:any )"],["isNonNegativeNumber.isPrimitive","isNonNegativeNumber.isPrimitive( value:any )"],["isNonNegativeNumber.isObject","isNonNegativeNumber.isObject( value:any )"],["isNonNegativeNumberArray","isNonNegativeNumberArray( value:any )"],["isNonNegativeNumberArray.primitives","isNonNegativeNumberArray.primitives( value:any )"],["isNonNegativeNumberArray.objects","isNonNegativeNumberArray.objects( value:any )"],["isNonPositiveInteger","isNonPositiveInteger( value:any )"],["isNonPositiveInteger.isPrimitive","isNonPositiveInteger.isPrimitive( value:any )"],["isNonPositiveInteger.isObject","isNonPositiveInteger.isObject( value:any )"],["isNonPositiveIntegerArray","isNonPositiveIntegerArray( value:any )"],["isNonPositiveIntegerArray.primitives","isNonPositiveIntegerArray.primitives( value:any )"],["isNonPositiveIntegerArray.objects","isNonPositiveIntegerArray.objects( value:any )"],["isNonPositiveNumber","isNonPositiveNumber( value:any )"],["isNonPositiveNumber.isPrimitive","isNonPositiveNumber.isPrimitive( value:any )"],["isNonPositiveNumber.isObject","isNonPositiveNumber.isObject( value:any )"],["isNonPositiveNumberArray","isNonPositiveNumberArray( value:any )"],["isNonPositiveNumberArray.primitives","isNonPositiveNumberArray.primitives( value:any )"],["isNonPositiveNumberArray.objects","isNonPositiveNumberArray.objects( value:any )"],["isNonSymmetricMatrix","isNonSymmetricMatrix( value:any )"],["isNull","isNull( value:any )"],["isNullArray","isNullArray( value:any )"],["isNumber","isNumber( value:any )"],["isNumber.isPrimitive","isNumber.isPrimitive( value:any )"],["isNumber.isObject","isNumber.isObject( value:any )"],["isNumberArray","isNumberArray( value:any )"],["isNumberArray.primitives","isNumberArray.primitives( value:any )"],["isNumberArray.objects","isNumberArray.objects( value:any )"],["isNumericArray","isNumericArray( value:any )"],["isObject","isObject( value:any )"],["isObjectArray","isObjectArray( value:any )"],["isObjectLike","isObjectLike( value:any )"],["isOdd","isOdd( value:any )"],["isOdd.isPrimitive","isOdd.isPrimitive( value:any )"],["isOdd.isObject","isOdd.isObject( value:any )"],["isoWeeksInYear","isoWeeksInYear( [year:integer] )"],["isPersymmetricMatrix","isPersymmetricMatrix( value:any )"],["isPlainObject","isPlainObject( value:any )"],["isPlainObjectArray","isPlainObjectArray( value:any )"],["isPositiveInteger","isPositiveInteger( value:any )"],["isPositiveInteger.isPrimitive","isPositiveInteger.isPrimitive( value:any )"],["isPositiveInteger.isObject","isPositiveInteger.isObject( value:any )"],["isPositiveIntegerArray","isPositiveIntegerArray( value:any )"],["isPositiveIntegerArray.primitives","isPositiveIntegerArray.primitives( value:any )"],["isPositiveIntegerArray.objects","isPositiveIntegerArray.objects( value:any )"],["isPositiveNumber","isPositiveNumber( value:any )"],["isPositiveNumber.isPrimitive","isPositiveNumber.isPrimitive( value:any )"],["isPositiveNumber.isObject","isPositiveNumber.isObject( value:any )"],["isPositiveNumberArray","isPositiveNumberArray( value:any )"],["isPositiveNumberArray.primitives","isPositiveNumberArray.primitives( value:any )"],["isPositiveNumberArray.objects","isPositiveNumberArray.objects( value:any )"],["isPositiveZero","isPositiveZero( value:any )"],["isPositiveZero.isPrimitive","isPositiveZero.isPrimitive( value:any )"],["isPositiveZero.isObject","isPositiveZero.isObject( value:any )"],["isPrime","isPrime( value:any )"],["isPrime.isPrimitive","isPrime.isPrimitive( value:any )"],["isPrime.isObject","isPrime.isObject( value:any )"],["isPrimitive","isPrimitive( value:any )"],["isPrimitiveArray","isPrimitiveArray( value:any )"],["isPRNGLike","isPRNGLike( value:any )"],["isProbability","isProbability( value:any )"],["isProbability.isPrimitive","isProbability.isPrimitive( value:any )"],["isProbability.isObject","isProbability.isObject( value:any )"],["isProbabilityArray","isProbabilityArray( value:any )"],["isProbabilityArray.primitives","isProbabilityArray.primitives( value:any )"],["isProbabilityArray.objects","isProbabilityArray.objects( value:any )"],["isPropertyKey","isPropertyKey( value:any )"],["isPrototypeOf","isPrototypeOf( value:any, proto:Object|Function )"],["isRangeError","isRangeError( value:any )"],["isReadableProperty","isReadableProperty( value:any, property:any )"],["isReadablePropertyIn","isReadablePropertyIn( value:any, property:any )"],["isReadOnlyProperty","isReadOnlyProperty( value:any, property:any )"],["isReadOnlyPropertyIn","isReadOnlyPropertyIn( value:any, property:any )"],["isReadWriteProperty","isReadWriteProperty( value:any, property:any )"],["isReadWritePropertyIn","isReadWritePropertyIn( value:any, property:any )"],["isReferenceError","isReferenceError( value:any )"],["isRegExp","isRegExp( value:any )"],["isRegExpString","isRegExpString( value:any )"],["isRelativePath","isRelativePath( value:any )"],["isRelativePath.posix","isRelativePath.posix( value:any )"],["isRelativePath.win32","isRelativePath.win32( value:any )"],["isSafeInteger","isSafeInteger( value:any )"],["isSafeInteger.isPrimitive","isSafeInteger.isPrimitive( value:any )"],["isSafeInteger.isObject","isSafeInteger.isObject( value:any )"],["isSafeIntegerArray","isSafeIntegerArray( value:any )"],["isSafeIntegerArray.primitives","isSafeIntegerArray.primitives( value:any )"],["isSafeIntegerArray.objects","isSafeIntegerArray.objects( value:any )"],["isSameNativeClass","isSameNativeClass( a:any, b:any )"],["isSameType","isSameType( a:any, b:any )"],["isSameValue","isSameValue( a:any, b:any )"],["isSameValueZero","isSameValueZero( a:any, b:any )"],["isSharedArrayBuffer","isSharedArrayBuffer( value:any )"],["isSkewCentrosymmetricMatrix","isSkewCentrosymmetricMatrix( value:any )"],["isSkewPersymmetricMatrix","isSkewPersymmetricMatrix( value:any )"],["isSkewSymmetricMatrix","isSkewSymmetricMatrix( value:any )"],["isSquareMatrix","isSquareMatrix( value:any )"],["isSquareNumber","isSquareNumber( value:any )"],["isSquareNumber.isPrimitive","isSquareNumber.isPrimitive( value:any )"],["isSquareNumber.isObject","isSquareNumber.isObject( value:any )"],["isSquareTriangularNumber","isSquareTriangularNumber( value:any )"],["isSquareTriangularNumber.isPrimitive","isSquareTriangularNumber.isPrimitive( value:any )"],["isSquareTriangularNumber.isObject","isSquareTriangularNumber.isObject( value:any )"],["isStrictEqual","isStrictEqual( a:any, b:any )"],["isString","isString( value:any )"],["isString.isPrimitive","isString.isPrimitive( value:any )"],["isString.isObject","isString.isObject( value:any )"],["isStringArray","isStringArray( value:any )"],["isStringArray.primitives","isStringArray.primitives( value:any )"],["isStringArray.objects","isStringArray.objects( value:any )"],["isSymbol","isSymbol( value:any )"],["isSymbolArray","isSymbolArray( value:any )"],["isSymbolArray.primitives","isSymbolArray.primitives( value:any )"],["isSymbolArray.objects","isSymbolArray.objects( value:any )"],["isSymmetricMatrix","isSymmetricMatrix( value:any )"],["isSyntaxError","isSyntaxError( value:any )"],["isTriangularNumber","isTriangularNumber( value:any )"],["isTriangularNumber.isPrimitive","isTriangularNumber.isPrimitive( value:any )"],["isTriangularNumber.isObject","isTriangularNumber.isObject( value:any )"],["isTruthy","isTruthy( value:any )"],["isTruthyArray","isTruthyArray( value:any )"],["isTypedArray","isTypedArray( value:any )"],["isTypedArrayLength","isTypedArrayLength( value:any )"],["isTypedArrayLike","isTypedArrayLike( value:any )"],["isTypeError","isTypeError( value:any )"],["isUint8Array","isUint8Array( value:any )"],["isUint8ClampedArray","isUint8ClampedArray( value:any )"],["isUint16Array","isUint16Array( value:any )"],["isUint32Array","isUint32Array( value:any )"],["isUNCPath","isUNCPath( value:any )"],["isUndefined","isUndefined( value:any )"],["isUndefinedOrNull","isUndefinedOrNull( value:any )"],["isUnityProbabilityArray","isUnityProbabilityArray( value:any )"],["isUppercase","isUppercase( value:any )"],["isURI","isURI( value:any )"],["isURIError","isURIError( value:any )"],["isVectorLike","isVectorLike( value:any )"],["isWhitespace","isWhitespace( str:string )"],["isWritableProperty","isWritableProperty( value:any, property:any )"],["isWritablePropertyIn","isWritablePropertyIn( value:any, property:any )"],["isWriteOnlyProperty","isWriteOnlyProperty( value:any, property:any )"],["isWriteOnlyPropertyIn","isWriteOnlyPropertyIn( value:any, property:any )"],["iterAbs","iterAbs( iterator:Object )"],["iterAbs2","iterAbs2( iterator:Object )"],["iterAcos","iterAcos( iterator:Object )"],["iterAcosh","iterAcosh( iterator:Object )"],["iterAcot","iterAcot( iterator:Object )"],["iterAcoth","iterAcoth( iterator:Object )"],["iterAcovercos","iterAcovercos( iterator:Object )"],["iterAcoversin","iterAcoversin( iterator:Object )"],["iterAdd","iterAdd( iter0:Object, ...iterator:Object )"],["iterAdvance","iterAdvance( iterator:Object[, n:integer] )"],["iterAhavercos","iterAhavercos( iterator:Object )"],["iterAhaversin","iterAhaversin( iterator:Object )"],["iterAny","iterAny( iterator:Object )"],["iterAnyBy","iterAnyBy( iterator:Object, predicate:Function[, thisArg:any ] )"],["iterAsin","iterAsin( iterator:Object )"],["iterAsinh","iterAsinh( iterator:Object )"],["iterAtan","iterAtan( iterator:Object )"],["iterAtan2","iterAtan2( y:Object|number, x:Object|number )"],["iterAtanh","iterAtanh( iterator:Object )"],["iterator2array","iterator2array( iterator:Object[, out:ArrayLikeObject][, mapFcn:Function[, thisArg:any]] )"],["iterator2arrayview","iterator2arrayview( iterator:Object, dest:ArrayLikeObject[, begin:integer[, end:integer]][, mapFcn:Function[, thisArg:any]] )"],["iterator2arrayviewRight","iterator2arrayviewRight( iterator:Object, dest:ArrayLikeObject[, begin:integer[, end:integer]][, mapFcn:Function[, thisArg:any]] )"],["iteratorStream","iteratorStream( iterator:Object[, options:Object] )"],["iteratorStream.factory","iteratorStream.factory( [options:Object] )"],["iteratorStream.objectMode","iteratorStream.objectMode( iterator:Object[, options:Object] )"],["IteratorSymbol","IteratorSymbol"],["iterAvercos","iterAvercos( iterator:Object )"],["iterAversin","iterAversin( iterator:Object )"],["iterawgn","iterawgn( iterator:Object, sigma:number[, options:Object] )"],["iterawln","iterawln( iterator:Object, sigma:number[, options:Object] )"],["iterawun","iterawun( iterator:Object, sigma:number[, options:Object] )"],["iterBartlettHannPulse","iterBartlettHannPulse( [options:Object] )"],["iterBartlettPulse","iterBartlettPulse( [options:Object] )"],["iterBesselj0","iterBesselj0( iterator:Object )"],["iterBesselj1","iterBesselj1( iterator:Object )"],["iterBessely0","iterBessely0( iterator:Object )"],["iterBessely1","iterBessely1( iterator:Object )"],["iterBeta","iterBeta( x:Object|number, y:Object|number )"],["iterBetaln","iterBetaln( x:Object|number, y:Object|number )"],["iterBinet","iterBinet( iterator:Object )"],["iterCbrt","iterCbrt( iterator:Object )"],["iterCeil","iterCeil( iterator:Object )"],["iterCeil2","iterCeil2( iterator:Object )"],["iterCeil10","iterCeil10( iterator:Object )"],["iterCompositesSeq","iterCompositesSeq( [options:Object] )"],["iterConcat","iterConcat( iter0:Object, ...iterator:Object )"],["iterConstant","iterConstant( value:any[, options:Object] )"],["iterContinuedFractionSeq","iterContinuedFractionSeq( x:number[, options:Object] )"],["iterCos","iterCos( iterator:Object )"],["iterCosh","iterCosh( iterator:Object )"],["iterCosineWave","iterCosineWave( [options:Object] )"],["iterCosm1","iterCosm1( iterator:Object )"],["iterCospi","iterCospi( iterator:Object )"],["iterCounter","iterCounter( iterator:Object )"],["iterCovercos","iterCovercos( iterator:Object )"],["iterCoversin","iterCoversin( iterator:Object )"],["iterCubesSeq","iterCubesSeq( [options:Object] )"],["itercugmean","itercugmean( iterator:Object )"],["itercuhmean","itercuhmean( iterator:Object )"],["itercumax","itercumax( iterator:Object )"],["itercumaxabs","itercumaxabs( iterator:Object )"],["itercumean","itercumean( iterator:Object )"],["itercumeanabs","itercumeanabs( iterator:Object )"],["itercumeanabs2","itercumeanabs2( iterator:Object )"],["itercumidrange","itercumidrange( iterator:Object )"],["itercumin","itercumin( iterator:Object )"],["itercuminabs","itercuminabs( iterator:Object )"],["itercuprod","itercuprod( iterator:Object )"],["itercurange","itercurange( iterator:Object )"],["itercusum","itercusum( iterator:Object )"],["itercusumabs","itercusumabs( iterator:Object )"],["itercusumabs2","itercusumabs2( iterator:Object )"],["iterDatespace","iterDatespace( start:integer|string|Date, stop:integer|string|Date[, N:integer][, options:Object] )"],["iterDedupe","iterDedupe( iterator:Object[, limit:integer] )"],["iterDedupeBy","iterDedupeBy( iterator:Object, [limit:integer,] fcn:Function )"],["iterDeg2rad","iterDeg2rad( iterator:Object )"],["iterDigamma","iterDigamma( iterator:Object )"],["iterDiracComb","iterDiracComb( [options:Object] )"],["iterDiracDelta","iterDiracDelta( iterator:Object )"],["iterDivide","iterDivide( iter0:Object, ...iterator:Object )"],["iterEllipe","iterEllipe( iterator:Object )"],["iterEllipk","iterEllipk( iterator:Object )"],["iterEmpty","iterEmpty()"],["iterErf","iterErf( iterator:Object )"],["iterErfc","iterErfc( iterator:Object )"],["iterErfcinv","iterErfcinv( iterator:Object )"],["iterErfinv","iterErfinv( iterator:Object )"],["iterEta","iterEta( iterator:Object )"],["iterEvenIntegersSeq","iterEvenIntegersSeq( [options:Object] )"],["iterEvery","iterEvery( iterator:Object )"],["iterEveryBy","iterEveryBy( iterator:Object, predicate:Function[, thisArg:any ] )"],["iterExp","iterExp( iterator:Object )"],["iterExp2","iterExp2( iterator:Object )"],["iterExp10","iterExp10( iterator:Object )"],["iterExpit","iterExpit( iterator:Object )"],["iterExpm1","iterExpm1( iterator:Object )"],["iterExpm1rel","iterExpm1rel( iterator:Object )"],["iterFactorial","iterFactorial( iterator:Object )"],["iterFactorialln","iterFactorialln( iterator:Object )"],["iterFactorialsSeq","iterFactorialsSeq( [options:Object] )"],["iterFibonacciSeq","iterFibonacciSeq( [options:Object] )"],["iterFifthPowersSeq","iterFifthPowersSeq( [options:Object] )"],["iterFill","iterFill( iterator:Object, value:any[, begin:integer[, end:integer]] )"],["iterFilter","iterFilter( iterator:Object, predicate:Function[, thisArg:any] )"],["iterFilterMap","iterFilterMap( iterator:Object, fcn:Function[, thisArg:any] )"],["iterFirst","iterFirst( iterator:Object )"],["iterFlatTopPulse","iterFlatTopPulse( [options:Object] )"],["iterFloor","iterFloor( iterator:Object )"],["iterFloor2","iterFloor2( iterator:Object )"],["iterFloor10","iterFloor10( iterator:Object )"],["iterFlow","iterFlow( methods:Object )"],["iterForEach","iterForEach( iterator:Object, fcn:Function[, thisArg:any] )"],["iterFourthPowersSeq","iterFourthPowersSeq( [options:Object] )"],["iterFresnelc","iterFresnelc( iterator:Object )"],["iterFresnels","iterFresnels( iterator:Object )"],["iterGamma","iterGamma( iterator:Object )"],["iterGamma1pm1","iterGamma1pm1( iterator:Object )"],["iterGammaln","iterGammaln( iterator:Object )"],["iterHacovercos","iterHacovercos( iterator:Object )"],["iterHacoversin","iterHacoversin( iterator:Object )"],["iterHannPulse","iterHannPulse( [options:Object] )"],["iterHavercos","iterHavercos( iterator:Object )"],["iterHaversin","iterHaversin( iterator:Object )"],["iterHead","iterHead( iterator:Object, n:integer )"],["iterIncrspace","iterIncrspace( start:number, stop:number[, increment:number] )"],["iterIntegersSeq","iterIntegersSeq( [options:Object] )"],["iterIntersection","iterIntersection( iter0:Object, ...iterator:Object )"],["iterIntersectionByHash","iterIntersectionByHash( iter0:Object, ...iterator:Object, hashFcn:Function[, thisArg:any] )"],["iterInv","iterInv( iterator:Object )"],["iterLanczosPulse","iterLanczosPulse( [options:Object] )"],["iterLast","iterLast( iterator:Object )"],["iterLength","iterLength( iterator:Object )"],["iterLinspace","iterLinspace( start:number, stop:number[, N:integer] )"],["iterLn","iterLn( iterator:Object )"],["iterLog","iterLog( x:Object|number, b:Object|number )"],["iterLog1mexp","iterLog1mexp( iterator:Object )"],["iterLog1p","iterLog1p( iterator:Object )"],["iterLog1pexp","iterLog1pexp( iterator:Object )"],["iterLog2","iterLog2( iterator:Object )"],["iterLog10","iterLog10( iterator:Object )"],["iterLogit","iterLogit( iterator:Object )"],["iterLogspace","iterLogspace( start:number, stop:number[, N:integer][, options:Object] )"],["iterLucasSeq","iterLucasSeq( [options:Object] )"],["iterMap","iterMap( iterator:Object, fcn:Function[, thisArg:any] )"],["iterMapN","iterMapN( iter0:Object, ...iterator:Object, fcn:Function[, thisArg:any] )"],["itermax","itermax( iterator:Object )"],["itermaxabs","itermaxabs( iterator:Object )"],["itermean","itermean( iterator:Object )"],["itermeanabs","itermeanabs( iterator:Object )"],["itermeanabs2","itermeanabs2( iterator:Object )"],["itermidrange","itermidrange( iterator:Object )"],["itermin","itermin( iterator:Object )"],["iterminabs","iterminabs( iterator:Object )"],["itermmax","itermmax( iterator:Object, W:integer )"],["itermmaxabs","itermmaxabs( iterator:Object, W:integer )"],["itermmean","itermmean( iterator:Object, W:integer )"],["itermmeanabs","itermmeanabs( iterator:Object, W:integer )"],["itermmeanabs2","itermmeanabs2( iterator:Object, W:integer )"],["itermmidrange","itermmidrange( iterator:Object, W:integer )"],["itermmin","itermmin( iterator:Object, W:integer )"],["itermminabs","itermminabs( iterator:Object, W:integer )"],["iterMod","iterMod( iter0:Object, ...iterator:Object )"],["itermprod","itermprod( iterator:Object, W:integer )"],["itermrange","itermrange( iterator:Object, W:integer )"],["itermsum","itermsum( iterator:Object, W:integer )"],["itermsumabs","itermsumabs( iterator:Object, W:integer )"],["itermsumabs2","itermsumabs2( iterator:Object, W:integer )"],["iterMultiply","iterMultiply( iter0:Object, ...iterator:Object )"],["iterNegaFibonacciSeq","iterNegaFibonacciSeq( [options:Object] )"],["iterNegaLucasSeq","iterNegaLucasSeq( [options:Object] )"],["iterNegativeEvenIntegersSeq","iterNegativeEvenIntegersSeq( [options:Object] )"],["iterNegativeIntegersSeq","iterNegativeIntegersSeq( [options:Object] )"],["iterNegativeOddIntegersSeq","iterNegativeOddIntegersSeq( [options:Object] )"],["iterNone","iterNone( iterator:Object )"],["iterNoneBy","iterNoneBy( iterator:Object, predicate:Function[, thisArg:any ] )"],["iterNonFibonacciSeq","iterNonFibonacciSeq( [options:Object] )"],["iterNonNegativeEvenIntegersSeq","iterNonNegativeEvenIntegersSeq( [options:Object] )"],["iterNonNegativeIntegersSeq","iterNonNegativeIntegersSeq( [options:Object] )"],["iterNonPositiveEvenIntegersSeq","iterNonPositiveEvenIntegersSeq( [options:Object] )"],["iterNonPositiveIntegersSeq","iterNonPositiveIntegersSeq( [options:Object] )"],["iterNonSquaresSeq","iterNonSquaresSeq( [options:Object] )"],["iterNth","iterNth( iterator:Object, n:integer )"],["iterOddIntegersSeq","iterOddIntegersSeq( [options:Object] )"],["iterPeriodicSinc","iterPeriodicSinc( n:integer[, options:Object] )"],["iterPipeline","iterPipeline( iterFcn:Function|Array[, ...iterFcn:Function] )"],["iterPop","iterPop( iterator:Object[, clbk:Function[, thisArg:any]] )"],["iterPositiveEvenIntegersSeq","iterPositiveEvenIntegersSeq( [options:Object] )"],["iterPositiveIntegersSeq","iterPositiveIntegersSeq( [options:Object] )"],["iterPositiveOddIntegersSeq","iterPositiveOddIntegersSeq( [options:Object] )"],["iterPow","iterPow( base:Object|number, exponent:Object|number )"],["iterPrimesSeq","iterPrimesSeq( [options:Object] )"],["iterprod","iterprod( iterator:Object )"],["iterPulse","iterPulse( [options:Object] )"],["iterPush","iterPush( iterator:Object, ...items:any )"],["iterRad2deg","iterRad2deg( iterator:Object )"],["iterRamp","iterRamp( iterator:Object )"],["iterrange","iterrange( iterator:Object )"],["iterReject","iterReject( iterator:Object, predicate:Function[, thisArg:any] )"],["iterReplicate","iterReplicate( iterator:Object, n:integer )"],["iterReplicateBy","iterReplicateBy( iterator:Object, fcn:Function[, thisArg:any] )"],["iterRound","iterRound( iterator:Object )"],["iterRound2","iterRound2( iterator:Object )"],["iterRound10","iterRound10( iterator:Object )"],["iterRsqrt","iterRsqrt( iterator:Object )"],["iterSawtoothWave","iterSawtoothWave( [options:Object] )"],["iterShift","iterShift( iterator:Object[, clbk:Function[, thisArg:any]] )"],["iterSignum","iterSignum( iterator:Object )"],["iterSin","iterSin( iterator:Object )"],["iterSinc","iterSinc( iterator:Object )"],["iterSineWave","iterSineWave( [options:Object] )"],["iterSinh","iterSinh( iterator:Object )"],["iterSinpi","iterSinpi( iterator:Object )"],["iterSlice","iterSlice( iterator:Object[, begin:integer[, end:integer]] )"],["iterSome","iterSome( iterator:Object, n:number )"],["iterSomeBy","iterSomeBy( iterator:Object, n:integer, predicate:Function[, thisArg:any ] )"],["iterSpence","iterSpence( iterator:Object )"],["iterSqrt","iterSqrt( iterator:Object )"],["iterSqrt1pm1","iterSqrt1pm1( iterator:Object )"],["iterSquaredTriangularSeq","iterSquaredTriangularSeq( [options:Object] )"],["iterSquaresSeq","iterSquaresSeq( [options:Object] )"],["iterSquareWave","iterSquareWave( [options:Object] )"],["iterstdev","iterstdev( iterator:Object[, mean:number] )"],["iterStep","iterStep( start:number, increment:number[, N:number] )"],["iterStrided","iterStrided( iterator:Object, stride:integer[, offset:integer[, eager:boolean]] )"],["iterStridedBy","iterStridedBy( iterator:Object, fcn:Function[, offset:integer[, eager:boolean]][, thisArg:any] )"],["iterSubtract","iterSubtract( iter0:Object, ...iterator:Object )"],["itersum","itersum( iterator:Object )"],["itersumabs","itersumabs( iterator:Object )"],["itersumabs2","itersumabs2( iterator:Object )"],["iterTan","iterTan( iterator:Object )"],["iterTanh","iterTanh( iterator:Object )"],["iterThunk","iterThunk( iterFcn:Function[, ...args:any] )"],["iterTriangleWave","iterTriangleWave( [options:Object] )"],["iterTriangularSeq","iterTriangularSeq( [options:Object] )"],["iterTrigamma","iterTrigamma( iterator:Object )"],["iterTrunc","iterTrunc( iterator:Object )"],["iterTrunc2","iterTrunc2( iterator:Object )"],["iterTrunc10","iterTrunc10( iterator:Object )"],["iterUnion","iterUnion( iter0:Object, ...iterator:Object )"],["iterUnique","iterUnique( iterator:Object )"],["iterUniqueBy","iterUniqueBy( iterator:Object, predicate:Function[, thisArg:any] )"],["iterUniqueByHash","iterUniqueByHash( iterator:Object, hashFcn:Function[, thisArg:any] )"],["iterUnitspace","iterUnitspace( start:number[, stop:number] )"],["iterUnshift","iterUnshift( iterator:Object, ...items:any )"],["itervariance","itervariance( iterator:Object[, mean:number] )"],["iterVercos","iterVercos( iterator:Object )"],["iterVersin","iterVersin( iterator:Object )"],["iterZeta","iterZeta( iterator:Object )"],["joinStream","joinStream( [options:Object] )"],["joinStream.factory","joinStream.factory( [options:Object] )"],["joinStream.objectMode","joinStream.objectMode( [options:Object] )"],["kde2d","kde2d( x:Array<number>, y:Array<number>[, options:Object] )"],["kebabcase","kebabcase( str:string )"],["keyBy","keyBy( collection:Array|TypedArray|Object, fcn:Function[, thisArg:any] )"],["keyByRight","keyByRight( collection:Array|TypedArray|Object, fcn:Function[, thisArg:any] )"],["keysIn","keysIn( obj:any )"],["kruskalTest","kruskalTest( ...x:Array[, options:Object] )"],["kstest","kstest( x:Array<number>, y:Function|string[, ...params:number][, options:Object] )"],["leveneTest","leveneTest( x:Array<number>[, ...y:Array<number>[, options:Object]] )"],["LinkedList","LinkedList()"],["linspace","linspace( start:number|ComplexLike, stop:number|ComplexLike, length:integer[, options:Object] )"],["linspace.assign","linspace.assign( start:number|ComplexLike, stop:number|ComplexLike, out:ArrayLikeObject[, options:Object] )"],["LIU_NEGATIVE_OPINION_WORDS_EN","LIU_NEGATIVE_OPINION_WORDS_EN()"],["LIU_POSITIVE_OPINION_WORDS_EN","LIU_POSITIVE_OPINION_WORDS_EN()"],["LN_HALF","LN_HALF"],["LN_PI","LN_PI"],["LN_SQRT_TWO_PI","LN_SQRT_TWO_PI"],["LN_TWO_PI","LN_TWO_PI"],["LN2","LN2"],["LN10","LN10"],["LOG2E","LOG2E"],["LOG10E","LOG10E"],["logspace","logspace( a:number, b:number[, length:integer] )"],["lowercase","lowercase( str:string )"],["lowercaseKeys","lowercaseKeys( obj:Object )"],["lowess","lowess( x:Array<number>, y:Array<number>[, options:Object] )"],["lpad","lpad( str:string, len:integer[, pad:string] )"],["ltrim","ltrim( str:string )"],["MALE_FIRST_NAMES_EN","MALE_FIRST_NAMES_EN()"],["map","map( arr:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["map.assign","map.assign( arr:ArrayLikeObject|ndarray, out:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["map2","map2( x:ArrayLikeObject|ndarray, y:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["map2.assign","map2.assign( x:ArrayLikeObject|ndarray, y:ArrayLikeObject|ndarray, out:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["map2d","map2d( arr:ArrayLikeObject<ArrayLikeObject>, fcn:Function[, thisArg:any] )"],["map2Right","map2Right( x:ArrayLikeObject|ndarray, y:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["map2Right.assign","map2Right.assign( x:ArrayLikeObject|ndarray, y:ArrayLikeObject|ndarray, out:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["map3d","map3d( arr:ArrayLikeObject<ArrayLikeObject<ArrayLikeObject>>, fcn:Function[, thisArg:any] )"],["map4d","map4d( arr:ArrayLikeObject<ArrayLikeObject>, fcn:Function[, thisArg:any] )"],["map5d","map5d( arr:ArrayLikeObject<ArrayLikeObject>, fcn:Function[, thisArg:any] )"],["mapArguments","mapArguments( fcn:Function, clbk:Function[, thisArg:any] )"],["mapFun","mapFun( fcn:Function, n:integer[, thisArg:any] )"],["mapFunAsync","mapFunAsync( fcn:Function, n:integer, [options:Object,] done:Function )"],["mapFunAsync.factory","mapFunAsync.factory( [options:Object,] fcn:Function )"],["mapKeys","mapKeys( obj:Object, transform:Function )"],["mapKeysAsync","mapKeysAsync( obj:Object, [options:Object,] transform:Function, done:Function )"],["mapKeysAsync.factory","mapKeysAsync.factory( [options:Object,] transform:Function )"],["mapReduce","mapReduce( arr:ArrayLikeObject|ndarray, initial:any, mapper:Function, reducer:Function[, thisArg:any] )"],["mapReduceRight","mapReduceRight( arr:ArrayLikeObject|ndarray, initial:any, mapper:Function, reducer:Function[, thisArg:any] )"],["mapRight","mapRight( arr:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["mapRight.assign","mapRight.assign( arr:ArrayLikeObject|ndarray, out:ArrayLikeObject|ndarray, fcn:Function[, thisArg:any] )"],["mapValues","mapValues( obj:Object, transform:Function )"],["mapValuesAsync","mapValuesAsync( obj:Object, [options:Object,] transform:Function, done:Function )"],["mapValuesAsync.factory","mapValuesAsync.factory( [options:Object,] transform:Function )"],["maskArguments","maskArguments( fcn:Function, mask:ArrayLikeObject[, thisArg:any] )"],["MAX_ARRAY_LENGTH","MAX_ARRAY_LENGTH"],["MAX_TYPED_ARRAY_LENGTH","MAX_TYPED_ARRAY_LENGTH"],["memoize","memoize( fcn:Function[, hashFunction:Function] )"],["merge","merge( target:Object, ...source:Object )"],["merge.factory","merge.factory( options:Object )"],["MILLISECONDS_IN_DAY","MILLISECONDS_IN_DAY"],["MILLISECONDS_IN_HOUR","MILLISECONDS_IN_HOUR"],["MILLISECONDS_IN_MINUTE","MILLISECONDS_IN_MINUTE"],["MILLISECONDS_IN_SECOND","MILLISECONDS_IN_SECOND"],["MILLISECONDS_IN_WEEK","MILLISECONDS_IN_WEEK"],["MINARD_NAPOLEONS_MARCH","MINARD_NAPOLEONS_MARCH( [options:Object] )"],["MINUTES_IN_DAY","MINUTES_IN_DAY"],["MINUTES_IN_HOUR","MINUTES_IN_HOUR"],["MINUTES_IN_WEEK","MINUTES_IN_WEEK"],["minutesInMonth","minutesInMonth( [month:string|Date|integer[, year:integer]] )"],["minutesInYear","minutesInYear( [value:integer|Date] )"],["MOBY_DICK","MOBY_DICK()"],["MONTH_NAMES_EN","MONTH_NAMES_EN()"],["MONTHS_IN_YEAR","MONTHS_IN_YEAR"],["moveProperty","moveProperty( source:Object, prop:string, target:Object )"],["namedtypedtuple","namedtypedtuple( fields:Array<string>[, options:Object] )"],["naryFunction","naryFunction( fcn:Function, arity:integer[, thisArg:any] )"],["nativeClass","nativeClass( value:any )"],["ndarray","ndarray( dtype:string, buffer:ArrayLikeObject|TypedArray|Buffer, shape:ArrayLikeObject<integer>, strides:ArrayLikeObject<integer>, offset:integer, order:string[, options:Object] )"],["ndarray.prototype.byteLength","ndarray.prototype.byteLength"],["ndarray.prototype.BYTES_PER_ELEMENT","ndarray.prototype.BYTES_PER_ELEMENT"],["ndarray.prototype.data","ndarray.prototype.data"],["ndarray.prototype.dtype","ndarray.prototype.dtype"],["ndarray.prototype.flags","ndarray.prototype.flags"],["ndarray.prototype.length","ndarray.prototype.length"],["ndarray.prototype.ndims","ndarray.prototype.ndims"],["ndarray.prototype.offset","ndarray.prototype.offset"],["ndarray.prototype.order","ndarray.prototype.order"],["ndarray.prototype.shape","ndarray.prototype.shape"],["ndarray.prototype.strides","ndarray.prototype.strides"],["ndarray.prototype.get","ndarray.prototype.get( ...idx:integer )"],["ndarray.prototype.iget","ndarray.prototype.iget( idx:integer )"],["ndarray.prototype.set","ndarray.prototype.set( ...idx:integer, v:any )"],["ndarray.prototype.iset","ndarray.prototype.iset( idx:integer, v:any )"],["ndarray.prototype.toString","ndarray.prototype.toString()"],["ndarray.prototype.toJSON","ndarray.prototype.toJSON()"],["ndarrayCastingModes","ndarrayCastingModes()"],["ndarrayDataTypes","ndarrayDataTypes()"],["ndarrayDispatch","ndarrayDispatch( fcns:Function|ArrayLikeObject<Function>, types:ArrayLikeObject, data:ArrayLikeObject|null, nargs:integer, nin:integer, nout:integer )"],["ndarrayIndexModes","ndarrayIndexModes()"],["ndarrayMinDataType","ndarrayMinDataType( value:any )"],["ndarrayNextDataType","ndarrayNextDataType( [dtype:any] )"],["ndarrayOrders","ndarrayOrders()"],["ndarrayPromotionRules","ndarrayPromotionRules( [dtype1:any, dtype2:any] )"],["ndarraySafeCasts","ndarraySafeCasts( [dtype:any] )"],["ndarraySameKindCasts","ndarraySameKindCasts( [dtype:any] )"],["ndzeros","ndzeros( shape:ArrayLikeObject<integer>|integer[, options:Object] )"],["ndzerosLike","ndzerosLike( x:ndarray[, options:Object] )"],["nextGraphemeClusterBreak","nextGraphemeClusterBreak( str:string[, fromIndex:integer] )"],["nextTick","nextTick( clbk[, ...args] )"],["NIGHTINGALES_ROSE","NIGHTINGALES_ROSE()"],["NINF","NINF"],["NODE_VERSION","NODE_VERSION"],["none","none( collection:Array|TypedArray|Object )"],["noneBy","noneBy( collection:Array|TypedArray|Object, predicate:Function[, thisArg:any ] )"],["noneByAsync","noneByAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["noneByAsync.factory","noneByAsync.factory( [options:Object,] predicate:Function )"],["noneByRight","noneByRight( collection:Array|TypedArray|Object, predicate:Function[, thisArg:any ] )"],["noneByRightAsync","noneByRightAsync( collection:Array|TypedArray|Object, [options:Object,] predicate:Function, done:Function )"],["noneByRightAsync.factory","noneByRightAsync.factory( [options:Object,] predicate:Function )"],["nonEnumerableProperties","nonEnumerableProperties( value:any )"],["nonEnumerablePropertiesIn","nonEnumerablePropertiesIn( value:any )"],["nonEnumerablePropertyNames","nonEnumerablePropertyNames( value:any )"],["nonEnumerablePropertyNamesIn","nonEnumerablePropertyNamesIn( value:any )"],["nonEnumerablePropertySymbols","nonEnumerablePropertySymbols( value:any )"],["nonEnumerablePropertySymbolsIn","nonEnumerablePropertySymbolsIn( value:any )"],["nonIndexKeys","nonIndexKeys( obj:any )"],["noop","noop()"],["now","now()"],["NUM_CPUS","NUM_CPUS"],["Number","Number( value:number )"],["numGraphemeClusters","numGraphemeClusters( str:string )"],["objectEntries","objectEntries( obj:ObjectLike )"],["objectEntriesIn","objectEntriesIn( obj:ObjectLike )"],["objectFromEntries","objectFromEntries( entries:Array<Array> )"],["objectInverse","objectInverse( obj:ObjectLike[, options:Object] )"],["objectInverseBy","objectInverseBy( obj:ObjectLike, [options:Object,] transform:Function )"],["objectKeys","objectKeys( value:any )"],["objectValues","objectValues( obj:ObjectLike )"],["objectValuesIn","objectValuesIn( obj:ObjectLike )"],["omit","omit( obj:Object, keys:string|Array )"],["omitBy","omitBy( obj:Object, predicate:Function )"],["open","open( path:string|Buffer[, flags:string|number[, mode:integer]], clbk:Function )"],["open.sync","open.sync( path:string|Buffer[, flags:string|number[, mode:integer]] )"],["openURL","openURL( url:string )"],["PACE_BOSTON_HOUSE_PRICES","PACE_BOSTON_HOUSE_PRICES()"],["pad","pad( str:string, len:integer[, options:Object] )"],["padjust","padjust( pvals:Array<number>, method:string[, comparisons:integer] )"],["papply","papply( fcn:Function, ...args:any )"],["papplyRight","papplyRight( fcn:Function, ...args:any )"],["parallel","parallel( files:Array<string>, [options:Object,] clbk:Function )"],["parseJSON","parseJSON( str:string[, reviver:Function] )"],["pascalcase","pascalcase( str:string )"],["PATH_DELIMITER","PATH_DELIMITER"],["PATH_DELIMITER_POSIX","PATH_DELIMITER_POSIX"],["PATH_DELIMITER_WIN32","PATH_DELIMITER_WIN32"],["PATH_SEP","PATH_SEP"],["PATH_SEP_POSIX","PATH_SEP_POSIX"],["PATH_SEP_WIN32","PATH_SEP_WIN32"],["pcorrtest","pcorrtest( x:Array<number>, y:Array<number>[, options:Object] )"],["percentEncode","percentEncode( str:string )"],["PHI","PHI"],["PI","PI"],["PI_SQUARED","PI_SQUARED"],["pick","pick( obj:Object, keys:string|Array )"],["pickArguments","pickArguments( fcn:Function, indices:Array<integer>[, thisArg:any] )"],["pickBy","pickBy( obj:Object, predicate:Function )"],["PINF","PINF"],["pkg2alias","pkg2alias( pkg:string )"],["pkg2related","pkg2related( pkg:string )"],["pkg2standalone","pkg2standalone( pkg:string )"],["PLATFORM","PLATFORM"],["plot","plot( [x:Array|Array, y:Array|Array,] [options:Object] )"],["Plot","Plot( [x:Array|Array, y:Array|Array,] [options:Object] )"],["pluck","pluck( arr:Array, prop:string[, options:Object] )"],["pop","pop( collection:Array|TypedArray|Object )"],["porterStemmer","porterStemmer( word:string )"],["prepend","prepend( collection1:Array|TypedArray|Object, collection2:Array|TypedArray|Object )"],["PRIMES_100K","PRIMES_100K()"],["properties","properties( value:any )"],["propertiesIn","propertiesIn( value:any )"],["propertyDescriptor","propertyDescriptor( value:any, property:string|symbol )"],["propertyDescriptorIn","propertyDescriptorIn( value:any, property:string|symbol )"],["propertyDescriptors","propertyDescriptors( value:any )"],["propertyDescriptorsIn","propertyDescriptorsIn( value:any )"],["propertyNames","propertyNames( value:any )"],["propertyNamesIn","propertyNamesIn( value:any )"],["propertySymbols","propertySymbols( value:any )"],["propertySymbolsIn","propertySymbolsIn( value:any )"],["Proxy","Proxy( target:Object, handlers:Object )"],["Proxy.revocable","Proxy.revocable( target:Object, handlers:Object )"],["push","push( collection:Array|TypedArray|Object, ...items:any )"],["quarterOfYear","quarterOfYear( [month:integer|string|Date] )"],["random.iterators.arcsine","random.iterators.arcsine( a:number, b:number[, options:Object] )"],["random.iterators.bernoulli","random.iterators.bernoulli( p:number[, options:Object] )"],["random.iterators.beta","random.iterators.beta( α:number, β:number[, options:Object] )"],["random.iterators.betaprime","random.iterators.betaprime( α:number, β:number[, options:Object] )"],["random.iterators.binomial","random.iterators.binomial( n:integer, p:number[, options:Object] )"],["random.iterators.boxMuller","random.iterators.boxMuller( [options:Object] )"],["random.iterators.cauchy","random.iterators.cauchy( x0:number, Ɣ:number[, options:Object] )"],["random.iterators.chi","random.iterators.chi( k:number[, options:Object] )"],["random.iterators.chisquare","random.iterators.chisquare( k:number[, options:Object] )"],["random.iterators.cosine","random.iterators.cosine( μ:number, s:number[, options:Object] )"],["random.iterators.discreteUniform","random.iterators.discreteUniform( a:integer, b:integer[, options:Object] )"],["random.iterators.erlang","random.iterators.erlang( k:integer, λ:number[, options:Object] )"],["random.iterators.exponential","random.iterators.exponential( λ:number[, options:Object] )"],["random.iterators.f","random.iterators.f( d1:number, d2:number[, options:Object] )"],["random.iterators.frechet","random.iterators.frechet( α:number, s:number, m:number[, options:Object] )"],["random.iterators.gamma","random.iterators.gamma( α:number, β:number[, options:Object] )"],["random.iterators.geometric","random.iterators.geometric( p:number[, options:Object] )"],["random.iterators.gumbel","random.iterators.gumbel( μ:number, β:number[, options:Object] )"],["random.iterators.hypergeometric","random.iterators.hypergeometric( N:integer, K:integer, n:integer[, options:Object] )"],["random.iterators.improvedZiggurat","random.iterators.improvedZiggurat( [options:Object] )"],["random.iterators.invgamma","random.iterators.invgamma( α:number, β:number[, options:Object] )"],["random.iterators.kumaraswamy","random.iterators.kumaraswamy( a:number, b:number[, options:Object] )"],["random.iterators.laplace","random.iterators.laplace( μ:number, b:number[, options:Object] )"],["random.iterators.levy","random.iterators.levy( μ:number, c:number[, options:Object] )"],["random.iterators.logistic","random.iterators.logistic( μ:number, s:number[, options:Object] )"],["random.iterators.lognormal","random.iterators.lognormal( μ:number, σ:number[, options:Object] )"],["random.iterators.minstd","random.iterators.minstd( [options:Object] )"],["random.iterators.minstdShuffle","random.iterators.minstdShuffle( [options:Object] )"],["random.iterators.mt19937","random.iterators.mt19937( [options:Object] )"],["random.iterators.negativeBinomial","random.iterators.negativeBinomial( r:number, p:number[, options:Object] )"],["random.iterators.normal","random.iterators.normal( μ:number, σ:number[, options:Object] )"],["random.iterators.pareto1","random.iterators.pareto1( α:number, β:number[, options:Object] )"],["random.iterators.poisson","random.iterators.poisson( λ:number[, options:Object] )"],["random.iterators.randi","random.iterators.randi( [options:Object] )"],["random.iterators.randn","random.iterators.randn( [options:Object] )"],["random.iterators.randu","random.iterators.randu( [options:Object] )"],["random.iterators.rayleigh","random.iterators.rayleigh( σ:number[, options:Object] )"],["random.iterators.t","random.iterators.t( v:number[, options:Object] )"],["random.iterators.triangular","random.iterators.triangular( a:number, b:number, c:number[, options:Object] )"],["random.iterators.uniform","random.iterators.uniform( a:number, b:number[, options:Object] )"],["random.iterators.weibull","random.iterators.weibull( k:number, λ:number[, options:Object] )"],["random.streams.arcsine","random.streams.arcsine( a:number, b:number[, options:Object] )"],["random.streams.arcsine.factory","random.streams.arcsine.factory( [a:number, b:number, ][options:Object] )"],["random.streams.arcsine.objectMode","random.streams.arcsine.objectMode( a:number, b:number[, options:Object] )"],["random.streams.bernoulli","random.streams.bernoulli( p:number[, options:Object] )"],["random.streams.bernoulli.factory","random.streams.bernoulli.factory( [p:number, ][options:Object] )"],["random.streams.bernoulli.objectMode","random.streams.bernoulli.objectMode( p:number[, options:Object] )"],["random.streams.beta","random.streams.beta( α:number, β:number[, options:Object] )"],["random.streams.beta.factory","random.streams.beta.factory( [α:number, β:number, ][options:Object] )"],["random.streams.beta.objectMode","random.streams.beta.objectMode( α:number, β:number[, options:Object] )"],["random.streams.betaprime","random.streams.betaprime( α:number, β:number[, options:Object] )"],["random.streams.betaprime.factory","random.streams.betaprime.factory( [α:number, β:number, ][options:Object] )"],["random.streams.betaprime.objectMode","random.streams.betaprime.objectMode( α:number, β:number[, options:Object] )"],["random.streams.binomial","random.streams.binomial( n:integer, p:number[, options:Object] )"],["random.streams.binomial.factory","random.streams.binomial.factory( [n:integer, p:number, ][options:Object] )"],["random.streams.binomial.objectMode","random.streams.binomial.objectMode( n:integer, p:number[, options:Object] )"],["random.streams.boxMuller","random.streams.boxMuller( [options:Object] )"],["random.streams.boxMuller.factory","random.streams.boxMuller.factory( [options:Object] )"],["random.streams.boxMuller.objectMode","random.streams.boxMuller.objectMode( [options:Object] )"],["random.streams.cauchy","random.streams.cauchy( x0:number, γ:number[, options:Object] )"],["random.streams.cauchy.factory","random.streams.cauchy.factory( [x0:number, γ:number, ][options:Object] )"],["random.streams.cauchy.objectMode","random.streams.cauchy.objectMode( x0:number, γ:number[, options:Object] )"],["random.streams.chi","random.streams.chi( k:number[, options:Object] )"],["random.streams.chi.factory","random.streams.chi.factory( [k:number, ][options:Object] )"],["random.streams.chi.objectMode","random.streams.chi.objectMode( k:number[, options:Object] )"],["random.streams.chisquare","random.streams.chisquare( k:number[, options:Object] )"],["random.streams.chisquare.factory","random.streams.chisquare.factory( [k:number, ][options:Object] )"],["random.streams.chisquare.objectMode","random.streams.chisquare.objectMode( k:number[, options:Object] )"],["random.streams.cosine","random.streams.cosine( μ:number, s:number[, options:Object] )"],["random.streams.cosine.factory","random.streams.cosine.factory( [μ:number, s:number, ][options:Object] )"],["random.streams.cosine.objectMode","random.streams.cosine.objectMode( μ:number, s:number[, options:Object] )"],["random.streams.discreteUniform","random.streams.discreteUniform( a:integer, b:integer[, options:Object] )"],["random.streams.discreteUniform.factory","random.streams.discreteUniform.factory( [a:integer, b:integer, ][options:Object] )"],["random.streams.discreteUniform.objectMode","random.streams.discreteUniform.objectMode( a:integer, b:integer[, options:Object] )"],["random.streams.erlang","random.streams.erlang( k:integer, λ:number[, options:Object] )"],["random.streams.erlang.factory","random.streams.erlang.factory( [k:number, λ:number, ][options:Object] )"],["random.streams.erlang.objectMode","random.streams.erlang.objectMode( k:number, λ:number[, options:Object] )"],["random.streams.exponential","random.streams.exponential( λ:number[, options:Object] )"],["random.streams.exponential.factory","random.streams.exponential.factory( [λ:number, ][options:Object] )"],["random.streams.exponential.objectMode","random.streams.exponential.objectMode( λ:number[, options:Object] )"],["random.streams.f","random.streams.f( d1:number, d2:number[, options:Object] )"],["random.streams.f.factory","random.streams.f.factory( [d1:number, d2:number, ][options:Object] )"],["random.streams.f.objectMode","random.streams.f.objectMode( d1:number, d2:number[, options:Object] )"],["random.streams.frechet","random.streams.frechet( α:number, s:number, m:number[, options:Object] )"],["random.streams.frechet.factory","random.streams.frechet.factory( [α:number, s:number, m:number,][options:Object] )"],["random.streams.frechet.objectMode","random.streams.frechet.objectMode( α:number, s:number, m:number[, options:Object] )"],["random.streams.gamma","random.streams.gamma( α:number, β:number[, options:Object] )"],["random.streams.gamma.factory","random.streams.gamma.factory( [α:number, β:number, ][options:Object] )"],["random.streams.gamma.objectMode","random.streams.gamma.objectMode( α:number, β:number[, options:Object] )"],["random.streams.geometric","random.streams.geometric( p:number[, options:Object] )"],["random.streams.geometric.factory","random.streams.geometric.factory( [p:number, ][options:Object] )"],["random.streams.geometric.objectMode","random.streams.geometric.objectMode( p:number[, options:Object] )"],["random.streams.gumbel","random.streams.gumbel( μ:number, β:number[, options:Object] )"],["random.streams.gumbel.factory","random.streams.gumbel.factory( [μ:number, β:number, ][options:Object] )"],["random.streams.gumbel.objectMode","random.streams.gumbel.objectMode( μ:number, β:number[, options:Object] )"],["random.streams.hypergeometric","random.streams.hypergeometric( N:integer, K:integer, n:integer[, options:Object] )"],["random.streams.hypergeometric.factory","random.streams.hypergeometric.factory( [N:integer, K:integer, n:integer,][options:Object] )"],["random.streams.hypergeometric.objectMode","random.streams.hypergeometric.objectMode( N:integer, K:integer, n:integer[, options:Object] )"],["random.streams.improvedZiggurat","random.streams.improvedZiggurat( [options:Object] )"],["random.streams.improvedZiggurat.factory","random.streams.improvedZiggurat.factory( [options:Object] )"],["random.streams.improvedZiggurat.objectMode","random.streams.improvedZiggurat.objectMode( [options:Object] )"],["random.streams.invgamma","random.streams.invgamma( α:number, β:number[, options:Object] )"],["random.streams.invgamma.factory","random.streams.invgamma.factory( [α:number, β:number, ][options:Object] )"],["random.streams.invgamma.objectMode","random.streams.invgamma.objectMode( α:number, β:number[, options:Object] )"],["random.streams.kumaraswamy","random.streams.kumaraswamy( a:number, b:number[, options:Object] )"],["random.streams.kumaraswamy.factory","random.streams.kumaraswamy.factory( [a:number, b:number, ][options:Object] )"],["random.streams.kumaraswamy.objectMode","random.streams.kumaraswamy.objectMode( a:number, b:number[, options:Object] )"],["random.streams.laplace","random.streams.laplace( μ:number, b:number[, options:Object] )"],["random.streams.laplace.factory","random.streams.laplace.factory( [μ:number, b:number, ][options:Object] )"],["random.streams.laplace.objectMode","random.streams.laplace.objectMode( μ:number, b:number[, options:Object] )"],["random.streams.levy","random.streams.levy( μ:number, c:number[, options:Object] )"],["random.streams.levy.factory","random.streams.levy.factory( [μ:number, c:number, ][options:Object] )"],["random.streams.levy.objectMode","random.streams.levy.objectMode( μ:number, c:number[, options:Object] )"],["random.streams.logistic","random.streams.logistic( μ:number, s:number[, options:Object] )"],["random.streams.logistic.factory","random.streams.logistic.factory( [μ:number, s:number, ][options:Object] )"],["random.streams.logistic.objectMode","random.streams.logistic.objectMode( μ:number, s:number[, options:Object] )"],["random.streams.lognormal","random.streams.lognormal( μ:number, σ:number[, options:Object] )"],["random.streams.lognormal.factory","random.streams.lognormal.factory( [μ:number, σ:number, ][options:Object] )"],["random.streams.lognormal.objectMode","random.streams.lognormal.objectMode( μ:number, σ:number[, options:Object] )"],["random.streams.minstd","random.streams.minstd( [options:Object] )"],["random.streams.minstd.factory","random.streams.minstd.factory( [options] )"],["random.streams.minstd.objectMode","random.streams.minstd.objectMode( [options:Object] )"],["random.streams.minstdShuffle","random.streams.minstdShuffle( [options:Object] )"],["random.streams.minstdShuffle.factory","random.streams.minstdShuffle.factory( [options] )"],["random.streams.minstdShuffle.objectMode","random.streams.minstdShuffle.objectMode( [options:Object] )"],["random.streams.mt19937","random.streams.mt19937( [options:Object] )"],["random.streams.mt19937.factory","random.streams.mt19937.factory( [options] )"],["random.streams.mt19937.objectMode","random.streams.mt19937.objectMode( [options:Object] )"],["random.streams.negativeBinomial","random.streams.negativeBinomial( r:number, p:number[, options:Object] )"],["random.streams.negativeBinomial.factory","random.streams.negativeBinomial.factory( [r:number, p:number, ][options:Object] )"],["random.streams.negativeBinomial.objectMode","random.streams.negativeBinomial.objectMode( r:integer, p:number[, options:Object] )"],["random.streams.normal","random.streams.normal( μ:number, σ:number[, options:Object] )"],["random.streams.normal.factory","random.streams.normal.factory( [μ:number, σ:number, ][options:Object] )"],["random.streams.normal.objectMode","random.streams.normal.objectMode( μ:number, σ:number[, options:Object] )"],["random.streams.pareto1","random.streams.pareto1( α:number, β:number[, options:Object] )"],["random.streams.pareto1.factory","random.streams.pareto1.factory( [α:number, β:number, ][options:Object] )"],["random.streams.pareto1.objectMode","random.streams.pareto1.objectMode( α:number, β:number[, options:Object] )"],["random.streams.poisson","random.streams.poisson( λ:number[, options:Object] )"],["random.streams.poisson.factory","random.streams.poisson.factory( [λ:number, ][options:Object] )"],["random.streams.poisson.objectMode","random.streams.poisson.objectMode( λ:number[, options:Object] )"],["random.streams.randi","random.streams.randi( [options:Object] )"],["random.streams.randi.factory","random.streams.randi.factory( [options] )"],["random.streams.randi.objectMode","random.streams.randi.objectMode( [options:Object] )"],["random.streams.randn","random.streams.randn( [options:Object] )"],["random.streams.randn.factory","random.streams.randn.factory( [options] )"],["random.streams.randn.objectMode","random.streams.randn.objectMode( [options:Object] )"],["random.streams.randu","random.streams.randu( [options:Object] )"],["random.streams.randu.factory","random.streams.randu.factory( [options] )"],["random.streams.randu.objectMode","random.streams.randu.objectMode( [options:Object] )"],["random.streams.rayleigh","random.streams.rayleigh( σ:number[, options:Object] )"],["random.streams.rayleigh.factory","random.streams.rayleigh.factory( [σ:number, ][options:Object] )"],["random.streams.rayleigh.objectMode","random.streams.rayleigh.objectMode( σ:number[, options:Object] )"],["random.streams.t","random.streams.t( v:number[, options:Object] )"],["random.streams.t.factory","random.streams.t.factory( [v:number, ][options:Object] )"],["random.streams.t.objectMode","random.streams.t.objectMode( v:number[, options:Object] )"],["random.streams.triangular","random.streams.triangular( a:number, b:number, c:number[, options:Object] )"],["random.streams.triangular.factory","random.streams.triangular.factory( [a:number, b:number, c:number, ][options:Object] )"],["random.streams.triangular.objectMode","random.streams.triangular.objectMode( a:number, b:number, c:number[, options:Object] )"],["random.streams.uniform","random.streams.uniform( a:number, b:number[, options:Object] )"],["random.streams.uniform.factory","random.streams.uniform.factory( [a:number, b:number, ][options:Object] )"],["random.streams.uniform.objectMode","random.streams.uniform.objectMode( a:number, b:number[, options:Object] )"],["random.streams.weibull","random.streams.weibull( k:number, λ:number[, options:Object] )"],["random.streams.weibull.factory","random.streams.weibull.factory( [k:number, λ:number, ][options:Object] )"],["random.streams.weibull.objectMode","random.streams.weibull.objectMode( k:number, λ:number[, options:Object] )"],["ranks","ranks( arr:Array<number>[, options:Object] )"],["readDir","readDir( path:string|Buffer, clbk:Function )"],["readDir.sync","readDir.sync( path:string|Buffer )"],["readFile","readFile( file:string|Buffer|integer[, options:Object|string], clbk:Function )"],["readFile.sync","readFile.sync( file:string|Buffer|integer[, options:Object|string] )"],["readFileList","readFileList( filepaths:Array<string>[, options:Object|string], clbk:Function )"],["readFileList.sync","readFileList.sync( filepaths:Array<string>[, options:Object|string] )"],["readJSON","readJSON( file:string|Buffer|integer[, options:Object|string], clbk:Function )"],["readJSON.sync","readJSON.sync( file:string|Buffer|integer[, options:Object|string] )"],["readWASM","readWASM( file:string|Buffer|integer[, options:Object], clbk:Function )"],["readWASM.sync","readWASM.sync( file:string|Buffer|integer[, options:Object] )"],["real","real( z:Complex128 )"],["realarray","realarray( [dtype:string] )"],["realarray","realarray( length:integer[, dtype:string] )"],["realarray","realarray( typedarray:TypedArray[, dtype:string] )"],["realarray","realarray( obj:Object[, dtype:string] )"],["realarray","realarray( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]][, dtype:string] )"],["realarrayCtors","realarrayCtors( dtype:string )"],["realarrayDataTypes","realarrayDataTypes()"],["realf","realf( z:Complex64 )"],["realmax","realmax( dtype:string )"],["realmin","realmin( dtype:string )"],["reBasename","reBasename( [platform:string] )"],["reBasename.REGEXP","reBasename.REGEXP"],["reBasename.REGEXP_POSIX","reBasename.REGEXP_POSIX"],["reBasename.REGEXP_WIN32","reBasename.REGEXP_WIN32"],["reBasenamePosix","reBasenamePosix()"],["reBasenamePosix.REGEXP","reBasenamePosix.REGEXP"],["reBasenameWindows","reBasenameWindows()"],["reBasenameWindows.REGEXP","reBasenameWindows.REGEXP"],["reColorHexadecimal","reColorHexadecimal( [mode:string] )"],["reColorHexadecimal.REGEXP","reColorHexadecimal.REGEXP"],["reColorHexadecimal.REGEXP_SHORTHAND","reColorHexadecimal.REGEXP_SHORTHAND"],["reColorHexadecimal.REGEXP_EITHER","reColorHexadecimal.REGEXP_EITHER"],["reDecimalNumber","reDecimalNumber( [options:Object] )"],["reDecimalNumber.REGEXP","reDecimalNumber.REGEXP"],["reDecimalNumber.REGEXP_CAPTURE","reDecimalNumber.REGEXP_CAPTURE"],["reDirname","reDirname( [platform:string] )"],["reDirname.REGEXP","reDirname.REGEXP"],["reDirname.REGEXP_POSIX","reDirname.REGEXP_POSIX"],["reDirname.REGEXP_WIN32","reDirname.REGEXP_WIN32"],["reDirnamePosix","reDirnamePosix()"],["reDirnamePosix.REGEXP","reDirnamePosix.REGEXP"],["reDirnameWindows","reDirnameWindows()"],["reDirnameWindows.REGEXP","reDirnameWindows.REGEXP"],["reduce","reduce( arr:ArrayLikeObject|ndarray, initial:any, reducer:Function[, thisArg:any] )"],["reduce2d","reduce2d( arr:ArrayLikeObject<ArrayLikeObject>, initial:ArrayLikeObject, reducer:Function[, thisArg:any] )"],["reduceAsync","reduceAsync( collection:Array|TypedArray|Object, initial:any, [options:Object,] reducer:Function, done:Function )"],["reduceAsync.factory","reduceAsync.factory( [options:Object,] fcn:Function )"],["reduceRight","reduceRight( arr:ArrayLikeObject|ndarray, initial:any, reducer:Function[, thisArg:any] )"],["reduceRightAsync","reduceRightAsync( collection:Array|TypedArray|Object, initial:any, [options:Object,] reducer:Function, done:Function )"],["reduceRightAsync.factory","reduceRightAsync.factory( [options:Object,] fcn:Function )"],["reEOL","reEOL( [options:Object] )"],["reEOL.REGEXP","reEOL.REGEXP"],["reEOL.REGEXP_CAPTURE","reEOL.REGEXP_CAPTURE"],["reExtendedLengthPath","reExtendedLengthPath()"],["reExtendedLengthPath.REGEXP","reExtendedLengthPath.REGEXP"],["reExtname","reExtname( [platform:string] )"],["reExtname.REGEXP","reExtname.REGEXP"],["reExtname.REGEXP_POSIX","reExtname.REGEXP_POSIX"],["reExtname.REGEXP_WIN32","reExtname.REGEXP_WIN32"],["reExtnamePosix","reExtnamePosix"],["reExtnamePosix.REGEXP","reExtnamePosix.REGEXP"],["reExtnameWindows","reExtnameWindows"],["reExtnameWindows.REGEXP","reExtnameWindows.REGEXP"],["reFilename","reFilename( [platform:string] )"],["reFilename.REGEXP","reFilename.REGEXP"],["reFilename.REGEXP_POSIX","reFilename.REGEXP_POSIX"],["reFilename.REGEXP_WIN32","reFilename.REGEXP_WIN32"],["reFilenamePosix","reFilenamePosix()"],["reFilenamePosix.REGEXP","reFilenamePosix.REGEXP"],["reFilenameWindows","reFilenameWindows()"],["reFilenameWindows.REGEXP","reFilenameWindows.REGEXP"],["reFromString","reFromString( str:string )"],["reFunctionName","reFunctionName()"],["reFunctionName.REGEXP","reFunctionName.REGEXP"],["reim","reim( z:Complex128 )"],["reimf","reimf( z:Complex64 )"],["rejectArguments","rejectArguments( fcn:Function, predicate:Function[, thisArg:any] )"],["removeFirst","removeFirst( str:string[, n:integer] )"],["removeLast","removeLast( str:string[, n:integer] )"],["removePunctuation","removePunctuation( str:string )"],["removeUTF8BOM","removeUTF8BOM( str:string )"],["removeWords","removeWords( str:string, words:Array<string>[, ignoreCase:boolean] )"],["rename","rename( oldPath:string|Buffer, newPath:string|Buffer, clbk:Function )"],["rename.sync","rename.sync( oldPath:string|Buffer, newPath:string|Buffer )"],["reNativeFunction","reNativeFunction()"],["reNativeFunction.REGEXP","reNativeFunction.REGEXP"],["reorderArguments","reorderArguments( fcn:Function, indices:Array<integer>[, thisArg:any] )"],["repeat","repeat( str:string, n:integer )"],["replace","replace( str:string, search:string|RegExp, newval:string|Function )"],["reRegExp","reRegExp()"],["reRegExp.REGEXP","reRegExp.REGEXP"],["rescape","rescape( str:string )"],["resolveParentPath","resolveParentPath( path:string[, options:Object], clbk:Function )"],["resolveParentPath.sync","resolveParentPath.sync( path:string[, options:Object] )"],["resolveParentPathBy","resolveParentPathBy( path:string[, options:Object], predicate:Function, clbk:Function )"],["resolveParentPathBy.sync","resolveParentPathBy.sync( path:string[, options:Object], predicate:Function )"],["reUncPath","reUncPath()"],["reUncPath.REGEXP","reUncPath.REGEXP"],["reUtf16SurrogatePair","reUtf16SurrogatePair()"],["reUtf16SurrogatePair.REGEXP","reUtf16SurrogatePair.REGEXP"],["reUtf16UnpairedSurrogate","reUtf16UnpairedSurrogate()"],["reUtf16UnpairedSurrogate.REGEXP","reUtf16UnpairedSurrogate.REGEXP"],["reverseArguments","reverseArguments( fcn:Function[, thisArg:any] )"],["reverseString","reverseString( str:string )"],["reviveBasePRNG","reviveBasePRNG( key:string, value:any )"],["reviveBuffer","reviveBuffer( key:string, value:any )"],["reviveComplex","reviveComplex( key:string, value:any )"],["reviveComplex64","reviveComplex64( key:string, value:any )"],["reviveComplex128","reviveComplex128( key:string, value:any )"],["reviveError","reviveError( key:string, value:any )"],["reviveTypedArray","reviveTypedArray( key:string, value:any )"],["reWhitespace","reWhitespace( [options:Object] )"],["reWhitespace.REGEXP","reWhitespace.REGEXP"],["reWhitespace.REGEXP_CAPTURE","reWhitespace.REGEXP_CAPTURE"],["rpad","rpad( str:string, len:integer[, pad:string] )"],["rtrim","rtrim( str:string )"],["safeintmax","safeintmax( dtype:string )"],["safeintmin","safeintmin( dtype:string )"],["sample","sample( x:ArrayLike[, options:Object] )"],["sample.factory","sample.factory( [pool:ArrayLike, ][options:Object] )"],["SAVOY_STOPWORDS_FIN","SAVOY_STOPWORDS_FIN()"],["SAVOY_STOPWORDS_FR","SAVOY_STOPWORDS_FR()"],["SAVOY_STOPWORDS_GER","SAVOY_STOPWORDS_GER()"],["SAVOY_STOPWORDS_IT","SAVOY_STOPWORDS_IT()"],["SAVOY_STOPWORDS_POR","SAVOY_STOPWORDS_POR()"],["SAVOY_STOPWORDS_SP","SAVOY_STOPWORDS_SP()"],["SAVOY_STOPWORDS_SWE","SAVOY_STOPWORDS_SWE()"],["scalar2ndarray","scalar2ndarray( value:any[, dtype:string] )"],["sdot","sdot( x:ndarray, y:ndarray )"],["SECONDS_IN_DAY","SECONDS_IN_DAY"],["SECONDS_IN_HOUR","SECONDS_IN_HOUR"],["SECONDS_IN_MINUTE","SECONDS_IN_MINUTE"],["SECONDS_IN_WEEK","SECONDS_IN_WEEK"],["secondsInMonth","secondsInMonth( [month:string|Date|integer[, year:integer]] )"],["secondsInYear","secondsInYear( [value:integer|Date] )"],["setConfigurableReadOnly","setConfigurableReadOnly( obj:Object, prop:string|symbol, value:any )"],["setConfigurableReadOnlyAccessor","setConfigurableReadOnlyAccessor( obj:Object, prop:string|symbol, getter:Function )"],["setConfigurableReadWriteAccessor","setConfigurableReadWriteAccessor( obj:Object, prop:string|symbol, getter:Function, setter:Function )"],["setConfigurableWriteOnlyAccessor","setConfigurableWriteOnlyAccessor( obj:Object, prop:string|symbol, setter:Function )"],["setMemoizedConfigurableReadOnly","setMemoizedConfigurableReadOnly( obj:Object, prop:string|symbol, fcn:Function )"],["setMemoizedReadOnly","setMemoizedReadOnly( obj:Object, prop:string|symbol, fcn:Function )"],["setNonEnumerableProperty","setNonEnumerableProperty( obj:Object, prop:string|symbol, value:any )"],["setNonEnumerableReadOnly","setNonEnumerableReadOnly( obj:Object, prop:string|symbol, value:any )"],["setNonEnumerableReadOnlyAccessor","setNonEnumerableReadOnlyAccessor( obj:Object, prop:string|symbol, getter:Function )"],["setNonEnumerableReadWriteAccessor","setNonEnumerableReadWriteAccessor( obj:Object, prop:string|symbol, getter:Function, setter:Function )"],["setNonEnumerableWriteOnlyAccessor","setNonEnumerableWriteOnlyAccessor( obj:Object, prop:string|symbol, setter:Function )"],["setReadOnly","setReadOnly( obj:Object, prop:string|symbol, value:any )"],["setReadOnlyAccessor","setReadOnlyAccessor( obj:Object, prop:string|symbol, getter:Function )"],["setReadWriteAccessor","setReadWriteAccessor( obj:Object, prop:string|symbol, getter:Function, setter:Function )"],["setWriteOnlyAccessor","setWriteOnlyAccessor( obj:Object, prop:string|symbol, setter:Function )"],["SharedArrayBuffer","SharedArrayBuffer( size:integer )"],["SharedArrayBuffer.length","SharedArrayBuffer.length"],["SharedArrayBuffer.prototype.byteLength","SharedArrayBuffer.prototype.byteLength"],["SharedArrayBuffer.prototype.slice","SharedArrayBuffer.prototype.slice( [start:integer[, end:integer]] )"],["shift","shift( collection:Array|TypedArray|Object )"],["shuffle","shuffle( arr:ArrayLike[, options:Object] )"],["shuffle.factory","shuffle.factory( [options:Object] )"],["sizeOf","sizeOf( dtype:string )"],["snakecase","snakecase( str:string )"],["some","some( collection:Array|TypedArray|Object, n:number )"],["someBy","someBy( collection:Array|TypedArray|Object, n:number, predicate:Function[, thisArg:any ] )"],["someByAsync","someByAsync( collection:Array|TypedArray|Object, n:number, [options:Object,] predicate:Function, done:Function )"],["someByAsync.factory","someByAsync.factory( [options:Object,] predicate:Function )"],["someByRight","someByRight( collection:Array|TypedArray|Object, n:number, predicate:Function[, thisArg:any ] )"],["someByRightAsync","someByRightAsync( collection:Array|TypedArray|Object, n:number, [options:Object,] predicate:Function, done:Function )"],["someByRightAsync.factory","someByRightAsync.factory( [options:Object,] predicate:Function )"],["SOTU","SOTU( [options:Object] )"],["SPACHE_REVISED","SPACHE_REVISED()"],["SPAM_ASSASSIN","SPAM_ASSASSIN()"],["SparklineBase","SparklineBase( [data:ArrayLike|ndarray,] [options:Object] )"],["sparsearray2iterator","sparsearray2iterator( src:ArrayLikeObject[, mapFcn:Function[, thisArg:any]] )"],["sparsearray2iteratorRight","sparsearray2iteratorRight( src:ArrayLikeObject[, mapFcn:Function[, thisArg:any]] )"],["splitStream","splitStream( [options:Object] )"],["splitStream.factory","splitStream.factory( [options:Object] )"],["splitStream.objectMode","splitStream.objectMode( [options:Object] )"],["SQRT_EPS","SQRT_EPS"],["SQRT_HALF","SQRT_HALF"],["SQRT_HALF_PI","SQRT_HALF_PI"],["SQRT_PHI","SQRT_PHI"],["SQRT_PI","SQRT_PI"],["SQRT_THREE","SQRT_THREE"],["SQRT_TWO","SQRT_TWO"],["SQRT_TWO_PI","SQRT_TWO_PI"],["SSA_US_BIRTHS_2000_2014","SSA_US_BIRTHS_2000_2014()"],["sswap","sswap( x:ndarray, y:ndarray )"],["Stack","Stack()"],["standalone2pkg","standalone2pkg( pkg:string )"],["STANDARD_CARD_DECK","STANDARD_CARD_DECK()"],["startcase","startcase( str:string )"],["startsWith","startsWith( str:string, search:string[, position:integer] )"],["STOPWORDS_EN","STOPWORDS_EN()"],["strided.abs","strided.abs( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.abs.ndarray","strided.abs.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.abs2","strided.abs2( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.abs2.ndarray","strided.abs2.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.abs2By","strided.abs2By( N:integer, x:Array|TypedArray|Object, sx:integer, y:Array|TypedArray|Object, sy:integer, clbk:Function[, thisArg:any] )"],["strided.abs2By.ndarray","strided.abs2By.ndarray( N:integer, x:Array|TypedArray|Object, sx:integer, ox:integer, y:Array|TypedArray|Object, sy:integer, oy:integer, clbk:Function[, thisArg:any] )"],["strided.absBy","strided.absBy( N:integer, x:Array|TypedArray|Object, sx:integer, y:Array|TypedArray|Object, sy:integer, clbk:Function[, thisArg:any] )"],["strided.absBy.ndarray","strided.absBy.ndarray( N:integer, x:Array|TypedArray|Object, sx:integer, ox:integer, y:Array|TypedArray|Object, sy:integer, oy:integer, clbk:Function[, thisArg:any] )"],["strided.add","strided.add( N:integer, dx:any, x:ArrayLikeObject, sx:integer, dy:any, y:ArrayLikeObject, sy:integer, dz:any, z:ArrayLikeObject, sz:integer )"],["strided.add.ndarray","strided.add.ndarray( N:integer, dx:any, x:ArrayLikeObject, sx:integer, ox:integer, dy:any, y:ArrayLikeObject, sy:integer, oy:integer, dz:any, z:ArrayLikeObject, sz:integer, oz:integer )"],["strided.cbrt","strided.cbrt( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.cbrt.ndarray","strided.cbrt.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.ceil","strided.ceil( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.ceil.ndarray","strided.ceil.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.deg2rad","strided.deg2rad( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.deg2rad.ndarray","strided.deg2rad.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.dispatch","strided.dispatch( fcns:Function|ArrayLikeObject<Function>, types:ArrayLikeObject, data:ArrayLikeObject|null, nargs:integer, nin:integer, nout:integer )"],["strided.floor","strided.floor( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.floor.ndarray","strided.floor.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.inv","strided.inv( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.inv.ndarray","strided.inv.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.mul","strided.mul( N:integer, dx:any, x:ArrayLikeObject, sx:integer, dy:any, y:ArrayLikeObject, sy:integer, dz:any, z:ArrayLikeObject, sz:integer )"],["strided.mul.ndarray","strided.mul.ndarray( N:integer, dx:any, x:ArrayLikeObject, sx:integer, ox:integer, dy:any, y:ArrayLikeObject, sy:integer, oy:integer, dz:any, z:ArrayLikeObject, sz:integer, oz:integer )"],["strided.ramp","strided.ramp( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.ramp.ndarray","strided.ramp.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.rsqrt","strided.rsqrt( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.rsqrt.ndarray","strided.rsqrt.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.sqrt","strided.sqrt( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.sqrt.ndarray","strided.sqrt.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["strided.sub","strided.sub( N:integer, dx:any, x:ArrayLikeObject, sx:integer, dy:any, y:ArrayLikeObject, sy:integer, dz:any, z:ArrayLikeObject, sz:integer )"],["strided.sub.ndarray","strided.sub.ndarray( N:integer, dx:any, x:ArrayLikeObject, sx:integer, ox:integer, dy:any, y:ArrayLikeObject, sy:integer, oy:integer, dz:any, z:ArrayLikeObject, sz:integer, oz:integer )"],["strided.trunc","strided.trunc( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer )"],["strided.trunc.ndarray","strided.trunc.ndarray( N:integer, dtypeX:any, x:ArrayLikeObject, strideX:integer, offsetX:integer, dtypeY:any, y:ArrayLikeObject, strideY:integer, offsetY:integer )"],["stridedarray2iterator","stridedarray2iterator( N:integer, src:ArrayLikeObject, stride:integer, offset:integer[, mapFcn:Function[, thisArg:any]] )"],["stridedArrayStream","stridedArrayStream( N:integer, buffer:ArrayLikeObject, stride:integer, offset:integer[, options:Object] )"],["stridedArrayStream.factory","stridedArrayStream.factory( [options:Object] )"],["stridedArrayStream.objectMode","stridedArrayStream.objectMode( N:integer, buffer:ArrayLikeObject, stride:integer, offset:integer[, options:Object] )"],["string2buffer","string2buffer( str:string[, encoding:string] )"],["sub2ind","sub2ind( shape:ArrayLike, ...subscript:integer[, options:Object] )"],["substringAfter","substringAfter( str:string, search:string[, fromIndex:integer] )"],["substringAfterLast","substringAfterLast( str:string, search:string[, fromIndex:integer] )"],["substringBefore","substringBefore( str:string, search:string )"],["substringBeforeLast","substringBeforeLast( str:string, search:string )"],["SUTHAHARAN_MULTI_HOP_SENSOR_NETWORK","SUTHAHARAN_MULTI_HOP_SENSOR_NETWORK()"],["SUTHAHARAN_SINGLE_HOP_SENSOR_NETWORK","SUTHAHARAN_SINGLE_HOP_SENSOR_NETWORK()"],["Symbol","Symbol( [description:string] )"],["tabulate","tabulate( collection:Array|TypedArray|Object )"],["tabulateBy","tabulateBy( collection:Array|TypedArray|Object, [options:Object,] indicator:Function )"],["tabulateByAsync","tabulateByAsync( collection:Array|TypedArray|Object, [options:Object,] indicator:Function, done:Function )"],["tabulateByAsync.factory","tabulateByAsync.factory( [options:Object,] indicator:Function )"],["tic","tic()"],["timeit","timeit( code:string, [options:Object,] clbk:Function )"],["tmpdir","tmpdir()"],["toc","toc( time:Array<integer> )"],["tokenize","tokenize( str:string[, keepWhitespace:boolean] )"],["transformStream","transformStream( [options:Object] )"],["transformStream.factory","transformStream.factory( [options:Object] )"],["transformStream.objectMode","transformStream.objectMode( [options:Object] )"],["transformStream.ctor","transformStream.ctor( [options:Object] )"],["trim","trim( str:string )"],["truncate","truncate( str:string, len:integer[, ending:string] )"],["truncateMiddle","truncateMiddle( str:string, len:integer[, seq:string] )"],["trycatch","trycatch( x:Function, y:any )"],["trycatchAsync","trycatchAsync( x:Function, y:any, done:Function )"],["tryFunction","tryFunction( fcn:Function[, thisArg:any] )"],["tryRequire","tryRequire( id:string )"],["trythen","trythen( x:Function, y:Function )"],["trythenAsync","trythenAsync( x:Function, y:Function, done:Function )"],["ttest","ttest( x:Array<number>[, y:Array<number>][, options:Object] )"],["ttest2","ttest2( x:Array<number>, y:Array<number>[, options:Object] )"],["TWO_PI","TWO_PI"],["typedarray","typedarray( [dtype:string] )"],["typedarray","typedarray( length:integer[, dtype:string] )"],["typedarray","typedarray( typedarray:TypedArray[, dtype:string] )"],["typedarray","typedarray( obj:Object[, dtype:string] )"],["typedarray","typedarray( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]][, dtype:string] )"],["typedarray2json","typedarray2json( arr:TypedArray )"],["typedarrayCtors","typedarrayCtors( dtype:string )"],["typedarrayDataTypes","typedarrayDataTypes()"],["typedarraypool","typedarraypool( [dtype:string] )"],["typedarraypool","typedarraypool( length:integer[, dtype:string] )"],["typedarraypool","typedarraypool( typedarray:TypedArray[, dtype:string] )"],["typedarraypool","typedarraypool( obj:Object[, dtype:string] )"],["typedarraypool.malloc","typedarraypool.malloc( [dtype:string] )"],["typedarraypool.malloc","typedarraypool.malloc( length:integer[, dtype:string] )"],["typedarraypool.malloc","typedarraypool.malloc( typedarray:TypedArray[, dtype:string] )"],["typedarraypool.malloc","typedarraypool.malloc( obj:Object[, dtype:string] )"],["typedarraypool.calloc","typedarraypool.calloc( [dtype:string] )"],["typedarraypool.calloc","typedarraypool.calloc( length:integer[, dtype:string] )"],["typedarraypool.free","typedarraypool.free( buf:TypedArray|ArrayBuffer )"],["typedarraypool.clear","typedarraypool.clear()"],["typedarraypool.highWaterMark","typedarraypool.highWaterMark"],["typedarraypool.nbytes","typedarraypool.nbytes"],["typedarraypool.factory","typedarraypool.factory( [options:Object] )"],["typemax","typemax( dtype:string )"],["typemin","typemin( dtype:string )"],["typeOf","typeOf( value:any )"],["UINT8_MAX","UINT8_MAX"],["UINT8_NUM_BYTES","UINT8_NUM_BYTES"],["Uint8Array","Uint8Array()"],["Uint8Array","Uint8Array( length:integer )"],["Uint8Array","Uint8Array( typedarray:TypedArray )"],["Uint8Array","Uint8Array( obj:Object )"],["Uint8Array","Uint8Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Uint8Array.from","Uint8Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Uint8Array.of","Uint8Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Uint8Array.BYTES_PER_ELEMENT","Uint8Array.BYTES_PER_ELEMENT"],["Uint8Array.name","Uint8Array.name"],["Uint8Array.prototype.buffer","Uint8Array.prototype.buffer"],["Uint8Array.prototype.byteLength","Uint8Array.prototype.byteLength"],["Uint8Array.prototype.byteOffset","Uint8Array.prototype.byteOffset"],["Uint8Array.prototype.BYTES_PER_ELEMENT","Uint8Array.prototype.BYTES_PER_ELEMENT"],["Uint8Array.prototype.length","Uint8Array.prototype.length"],["Uint8Array.prototype.copyWithin","Uint8Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Uint8Array.prototype.entries","Uint8Array.prototype.entries()"],["Uint8Array.prototype.every","Uint8Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Uint8Array.prototype.fill","Uint8Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Uint8Array.prototype.filter","Uint8Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Uint8Array.prototype.find","Uint8Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Uint8Array.prototype.findIndex","Uint8Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Uint8Array.prototype.forEach","Uint8Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Uint8Array.prototype.includes","Uint8Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Uint8Array.prototype.indexOf","Uint8Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Uint8Array.prototype.join","Uint8Array.prototype.join( [separator:string] )"],["Uint8Array.prototype.keys","Uint8Array.prototype.keys()"],["Uint8Array.prototype.lastIndexOf","Uint8Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Uint8Array.prototype.map","Uint8Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Uint8Array.prototype.reduce","Uint8Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Uint8Array.prototype.reduceRight","Uint8Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Uint8Array.prototype.reverse","Uint8Array.prototype.reverse()"],["Uint8Array.prototype.set","Uint8Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Uint8Array.prototype.slice","Uint8Array.prototype.slice( [begin:integer[, end:integer]] )"],["Uint8Array.prototype.some","Uint8Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Uint8Array.prototype.sort","Uint8Array.prototype.sort( [compareFunction:Function] )"],["Uint8Array.prototype.subarray","Uint8Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Uint8Array.prototype.toLocaleString","Uint8Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Uint8Array.prototype.toString","Uint8Array.prototype.toString()"],["Uint8Array.prototype.values","Uint8Array.prototype.values()"],["Uint8ClampedArray","Uint8ClampedArray()"],["Uint8ClampedArray","Uint8ClampedArray( length:integer )"],["Uint8ClampedArray","Uint8ClampedArray( typedarray:TypedArray )"],["Uint8ClampedArray","Uint8ClampedArray( obj:Object )"],["Uint8ClampedArray","Uint8ClampedArray( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Uint8ClampedArray.from","Uint8ClampedArray.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Uint8ClampedArray.of","Uint8ClampedArray.of( element0:number[, element1:number[, ...elementN:number]] )"],["Uint8ClampedArray.BYTES_PER_ELEMENT","Uint8ClampedArray.BYTES_PER_ELEMENT"],["Uint8ClampedArray.name","Uint8ClampedArray.name"],["Uint8ClampedArray.prototype.buffer","Uint8ClampedArray.prototype.buffer"],["Uint8ClampedArray.prototype.byteLength","Uint8ClampedArray.prototype.byteLength"],["Uint8ClampedArray.prototype.byteOffset","Uint8ClampedArray.prototype.byteOffset"],["Uint8ClampedArray.prototype.BYTES_PER_ELEMENT","Uint8ClampedArray.prototype.BYTES_PER_ELEMENT"],["Uint8ClampedArray.prototype.length","Uint8ClampedArray.prototype.length"],["Uint8ClampedArray.prototype.copyWithin","Uint8ClampedArray.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Uint8ClampedArray.prototype.entries","Uint8ClampedArray.prototype.entries()"],["Uint8ClampedArray.prototype.every","Uint8ClampedArray.prototype.every( predicate:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.fill","Uint8ClampedArray.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Uint8ClampedArray.prototype.filter","Uint8ClampedArray.prototype.filter( predicate:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.find","Uint8ClampedArray.prototype.find( predicate:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.findIndex","Uint8ClampedArray.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.forEach","Uint8ClampedArray.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.includes","Uint8ClampedArray.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Uint8ClampedArray.prototype.indexOf","Uint8ClampedArray.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Uint8ClampedArray.prototype.join","Uint8ClampedArray.prototype.join( [separator:string] )"],["Uint8ClampedArray.prototype.keys","Uint8ClampedArray.prototype.keys()"],["Uint8ClampedArray.prototype.lastIndexOf","Uint8ClampedArray.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Uint8ClampedArray.prototype.map","Uint8ClampedArray.prototype.map( fcn:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.reduce","Uint8ClampedArray.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Uint8ClampedArray.prototype.reduceRight","Uint8ClampedArray.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Uint8ClampedArray.prototype.reverse","Uint8ClampedArray.prototype.reverse()"],["Uint8ClampedArray.prototype.set","Uint8ClampedArray.prototype.set( arr:ArrayLike[, offset:integer] )"],["Uint8ClampedArray.prototype.slice","Uint8ClampedArray.prototype.slice( [begin:integer[, end:integer]] )"],["Uint8ClampedArray.prototype.some","Uint8ClampedArray.prototype.some( predicate:Function[, thisArg:Any] )"],["Uint8ClampedArray.prototype.sort","Uint8ClampedArray.prototype.sort( [compareFunction:Function] )"],["Uint8ClampedArray.prototype.subarray","Uint8ClampedArray.prototype.subarray( [begin:integer[, end:integer]] )"],["Uint8ClampedArray.prototype.toLocaleString","Uint8ClampedArray.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Uint8ClampedArray.prototype.toString","Uint8ClampedArray.prototype.toString()"],["Uint8ClampedArray.prototype.values","Uint8ClampedArray.prototype.values()"],["UINT16_MAX","UINT16_MAX"],["UINT16_NUM_BYTES","UINT16_NUM_BYTES"],["Uint16Array","Uint16Array()"],["Uint16Array","Uint16Array( length:integer )"],["Uint16Array","Uint16Array( typedarray:TypedArray )"],["Uint16Array","Uint16Array( obj:Object )"],["Uint16Array","Uint16Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Uint16Array.from","Uint16Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Uint16Array.of","Uint16Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Uint16Array.BYTES_PER_ELEMENT","Uint16Array.BYTES_PER_ELEMENT"],["Uint16Array.name","Uint16Array.name"],["Uint16Array.prototype.buffer","Uint16Array.prototype.buffer"],["Uint16Array.prototype.byteLength","Uint16Array.prototype.byteLength"],["Uint16Array.prototype.byteOffset","Uint16Array.prototype.byteOffset"],["Uint16Array.prototype.BYTES_PER_ELEMENT","Uint16Array.prototype.BYTES_PER_ELEMENT"],["Uint16Array.prototype.length","Uint16Array.prototype.length"],["Uint16Array.prototype.copyWithin","Uint16Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Uint16Array.prototype.entries","Uint16Array.prototype.entries()"],["Uint16Array.prototype.every","Uint16Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Uint16Array.prototype.fill","Uint16Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Uint16Array.prototype.filter","Uint16Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Uint16Array.prototype.find","Uint16Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Uint16Array.prototype.findIndex","Uint16Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Uint16Array.prototype.forEach","Uint16Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Uint16Array.prototype.includes","Uint16Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Uint16Array.prototype.indexOf","Uint16Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Uint16Array.prototype.join","Uint16Array.prototype.join( [separator:string] )"],["Uint16Array.prototype.keys","Uint16Array.prototype.keys()"],["Uint16Array.prototype.lastIndexOf","Uint16Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Uint16Array.prototype.map","Uint16Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Uint16Array.prototype.reduce","Uint16Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Uint16Array.prototype.reduceRight","Uint16Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Uint16Array.prototype.reverse","Uint16Array.prototype.reverse()"],["Uint16Array.prototype.set","Uint16Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Uint16Array.prototype.slice","Uint16Array.prototype.slice( [begin:integer[, end:integer]] )"],["Uint16Array.prototype.some","Uint16Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Uint16Array.prototype.sort","Uint16Array.prototype.sort( [compareFunction:Function] )"],["Uint16Array.prototype.subarray","Uint16Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Uint16Array.prototype.toLocaleString","Uint16Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Uint16Array.prototype.toString","Uint16Array.prototype.toString()"],["Uint16Array.prototype.values","Uint16Array.prototype.values()"],["UINT32_MAX","UINT32_MAX"],["UINT32_NUM_BYTES","UINT32_NUM_BYTES"],["Uint32Array","Uint32Array()"],["Uint32Array","Uint32Array( length:integer )"],["Uint32Array","Uint32Array( typedarray:TypedArray )"],["Uint32Array","Uint32Array( obj:Object )"],["Uint32Array","Uint32Array( buffer:ArrayBuffer[, byteOffset:integer[, length:integer]] )"],["Uint32Array.from","Uint32Array.from( src:ArrayLike|Iterable[, map:Function[, thisArg:Any]] )"],["Uint32Array.of","Uint32Array.of( element0:number[, element1:number[, ...elementN:number]] )"],["Uint32Array.BYTES_PER_ELEMENT","Uint32Array.BYTES_PER_ELEMENT"],["Uint32Array.name","Uint32Array.name"],["Uint32Array.prototype.buffer","Uint32Array.prototype.buffer"],["Uint32Array.prototype.byteLength","Uint32Array.prototype.byteLength"],["Uint32Array.prototype.byteOffset","Uint32Array.prototype.byteOffset"],["Uint32Array.prototype.BYTES_PER_ELEMENT","Uint32Array.prototype.BYTES_PER_ELEMENT"],["Uint32Array.prototype.length","Uint32Array.prototype.length"],["Uint32Array.prototype.copyWithin","Uint32Array.prototype.copyWithin( target:integer, start:integer[, end:integer] )"],["Uint32Array.prototype.entries","Uint32Array.prototype.entries()"],["Uint32Array.prototype.every","Uint32Array.prototype.every( predicate:Function[, thisArg:Any] )"],["Uint32Array.prototype.fill","Uint32Array.prototype.fill( value:number[, start:integer[, end:integer]] )"],["Uint32Array.prototype.filter","Uint32Array.prototype.filter( predicate:Function[, thisArg:Any] )"],["Uint32Array.prototype.find","Uint32Array.prototype.find( predicate:Function[, thisArg:Any] )"],["Uint32Array.prototype.findIndex","Uint32Array.prototype.findIndex( predicate:Function[, thisArg:Any] )"],["Uint32Array.prototype.forEach","Uint32Array.prototype.forEach( fcn:Function[, thisArg:Any] )"],["Uint32Array.prototype.includes","Uint32Array.prototype.includes( searchElement:number[, fromIndex:integer] )"],["Uint32Array.prototype.indexOf","Uint32Array.prototype.indexOf( searchElement:number[, fromIndex:integer] )"],["Uint32Array.prototype.join","Uint32Array.prototype.join( [separator:string] )"],["Uint32Array.prototype.keys","Uint32Array.prototype.keys()"],["Uint32Array.prototype.lastIndexOf","Uint32Array.prototype.lastIndexOf( searchElement:number[, fromIndex:integer] )"],["Uint32Array.prototype.map","Uint32Array.prototype.map( fcn:Function[, thisArg:Any] )"],["Uint32Array.prototype.reduce","Uint32Array.prototype.reduce( fcn:Function[, initialValue:Any] )"],["Uint32Array.prototype.reduceRight","Uint32Array.prototype.reduceRight( fcn:Function[, initialValue:Any] )"],["Uint32Array.prototype.reverse","Uint32Array.prototype.reverse()"],["Uint32Array.prototype.set","Uint32Array.prototype.set( arr:ArrayLike[, offset:integer] )"],["Uint32Array.prototype.slice","Uint32Array.prototype.slice( [begin:integer[, end:integer]] )"],["Uint32Array.prototype.some","Uint32Array.prototype.some( predicate:Function[, thisArg:Any] )"],["Uint32Array.prototype.sort","Uint32Array.prototype.sort( [compareFunction:Function] )"],["Uint32Array.prototype.subarray","Uint32Array.prototype.subarray( [begin:integer[, end:integer]] )"],["Uint32Array.prototype.toLocaleString","Uint32Array.prototype.toLocaleString( [locales:string|Array[, options:Object]] )"],["Uint32Array.prototype.toString","Uint32Array.prototype.toString()"],["Uint32Array.prototype.values","Uint32Array.prototype.values()"],["umask","umask( [mask:integer|string,] [options:Object] )"],["uncapitalize","uncapitalize( str:string )"],["uncapitalizeKeys","uncapitalizeKeys( obj:Object )"],["uncurry","uncurry( fcn:Function[, arity:integer, ][thisArg:any] )"],["uncurryRight","uncurryRight( fcn:Function[, arity:integer, ][thisArg:any] )"],["UNICODE_MAX","UNICODE_MAX"],["UNICODE_MAX_BMP","UNICODE_MAX_BMP"],["UnicodeColumnChartSparkline","UnicodeColumnChartSparkline( [data:ArrayLike|ndarray,] [options:Object] )"],["UnicodeLineChartSparkline","UnicodeLineChartSparkline( [data:ArrayLike|ndarray,] [options:Object] )"],["UnicodeSparkline","UnicodeSparkline( [data:ArrayLike|ndarray,] [options:Object] )"],["UnicodeTristateChartSparkline","UnicodeTristateChartSparkline( [data:ArrayLike|ndarray,] [options:Object] )"],["UnicodeUpDownChartSparkline","UnicodeUpDownChartSparkline( [data:ArrayLike|ndarray,] [options:Object] )"],["UnicodeWinLossChartSparkline","UnicodeWinLossChartSparkline( [data:ArrayLike|ndarray,] [options:Object] )"],["unlink","unlink( path:string|Buffer|integer, clbk:Function )"],["unlink.sync","unlink.sync( path:string|Buffer|integer )"],["unshift","unshift( collection:Array|TypedArray|Object, ...items:any )"],["until","until( predicate:Function, fcn:Function[, thisArg:any] )"],["untilAsync","untilAsync( predicate:Function, fcn:Function, done:Function[, thisArg:any] )"],["untilEach","untilEach( collection:Array|TypedArray|Object, predicate:Function, fcn:Function[, thisArg:any] )"],["untilEachRight","untilEachRight( collection:Array|TypedArray|Object, predicate:Function, fcn:Function[, thisArg:any] )"],["unzip","unzip( arr:Array[, idx:Array<number>] )"],["uppercase","uppercase( str:string )"],["uppercaseKeys","uppercaseKeys( obj:Object )"],["US_STATES_ABBR","US_STATES_ABBR()"],["US_STATES_CAPITALS","US_STATES_CAPITALS()"],["US_STATES_CAPITALS_NAMES","US_STATES_CAPITALS_NAMES()"],["US_STATES_NAMES","US_STATES_NAMES()"],["US_STATES_NAMES_CAPITALS","US_STATES_NAMES_CAPITALS()"],["utf16ToUTF8Array","utf16ToUTF8Array( str:string )"],["vartest","vartest( x:Array<number>, y:Array<number>[, options:Object] )"],["waterfall","waterfall( fcns:Array<Function>, clbk:Function[, thisArg:any] )"],["waterfall.factory","waterfall.factory( fcns:Array<Function>, clbk:Function[, thisArg:any] )"],["whileAsync","whileAsync( predicate:Function, fcn:Function, done:Function[, thisArg:any] )"],["whileEach","whileEach( collection:Array|TypedArray|Object, predicate:Function, fcn:Function[, thisArg:any] )"],["whileEachRight","whileEachRight( collection:Array|TypedArray|Object, predicate:Function, fcn:Function[, thisArg:any] )"],["whilst","whilst( predicate:Function, fcn:Function[, thisArg:any] )"],["wilcoxon","wilcoxon( x:Array|TypedArray[, y:Array|TypedArray][, options:Object] )"],["writableProperties","writableProperties( value:any )"],["writablePropertiesIn","writablePropertiesIn( value:any )"],["writablePropertyNames","writablePropertyNames( value:any )"],["writablePropertyNamesIn","writablePropertyNamesIn( value:any )"],["writablePropertySymbols","writablePropertySymbols( value:any )"],["writablePropertySymbolsIn","writablePropertySymbolsIn( value:any )"],["writeFile","writeFile( file:string|Buffer|integer, data:string|Buffer[, options:Object|string], clbk:Function )"],["writeFile.sync","writeFile.sync( file:string|Buffer|integer, data:string|Buffer[, options:Object|string] )"],["zip","zip( ...arr:Array[, options:Object] )"],["ztest","ztest( x:Array<number>, sigma:number[, options:Object] )"],["ztest2","ztest2( x:Array<number>, y:Array<number>, sigmax:number, sigmay:number[, options:Object] )"]]
},{}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the typed signature(s) associated with a provided alias.
*
* @module @stdlib/repl/typed-signature
*
* @example
* var typedSignature = require( '@stdlib/repl/typed-signature' );
*
* var out = typedSignature( 'base.sin' );
* // returns [ '...' ]
*/

// MODULES //

var typedSignature = require( './main.js' );


// EXPORTS //

module.exports = typedSignature;

},{"./main.js":47}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var ALIAS_TO_TYPED_SIGNATURE = require( './../data/data.json' );


// MAIN //

/**
* Returns the typed signature(s) associated with a specified alias.
*
* @param {string} alias - alias
* @throws {TypeError} must provide a string
* @returns {(StringArray|null)} typed signature(s)
*
* @example
* var out = typedSignature( 'base.sin' );
* // returns [ '...' ]
*/
function typedSignature( alias ) {
	var out;
	var i;
	if ( !isString( alias ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', alias ) );
	}
	out = [];
	for ( i = 0; i < ALIAS_TO_TYPED_SIGNATURE.length; i++ ) {
		if ( ALIAS_TO_TYPED_SIGNATURE[ i ][ 0 ] === alias ) {
			out.push( ALIAS_TO_TYPED_SIGNATURE[ i ][ 1 ] );
		}
	}
	return ( out.length ) ? out : null;
}


// EXPORTS //

module.exports = typedSignature;

},{"./../data/data.json":45,"@stdlib/assert/is-string":19,"@stdlib/string/format":61}],48:[function(require,module,exports){
module.exports={
  "name": "@stdlib/repl/typed-signature",
  "version": "0.0.0",
  "description": "Return the typed signature(s) associated with a provided alias.",
  "license": "Apache-2.0",
  "author": {
    "name": "The Stdlib Authors",
    "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
  },
  "contributors": [
    {
      "name": "The Stdlib Authors",
      "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
    }
  ],
  "bin": {
    "stdlib-alias-typed-signature": "./bin/cli"
  },
  "main": "./lib",
  "directories": {
    "benchmark": "./benchmark",
    "data": "./data",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
    "scripts": "./scripts",
    "test": "./test"
  },
  "types": "./docs/types",
  "scripts": {},
  "homepage": "https://github.com/stdlib-js/stdlib",
  "repository": {
    "type": "git",
    "url": "git://github.com/stdlib-js/stdlib.git"
  },
  "bugs": {
    "url": "https://github.com/stdlib-js/stdlib/issues"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=0.10.0",
    "npm": ">2.7.0"
  },
  "os": [
    "aix",
    "darwin",
    "freebsd",
    "linux",
    "macos",
    "openbsd",
    "sunos",
    "win32",
    "windows"
  ],
  "keywords": [
    "stdlib",
    "repl",
    "docs",
    "help",
    "documentation",
    "man",
    "manual",
    "signature",
    "interface",
    "api",
    "typed"
  ]
}

},{}],49:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
var readFileSync = require( '@stdlib/fs/read-file' ).sync;
var EXEC_PATH = require( '@stdlib/process/exec-path' );


// VARIABLES //

var fpath = resolve( __dirname, '..', 'bin', 'cli' );
var opts = {
	'skip': IS_BROWSER || IS_WINDOWS
};


// FIXTURES //

var PKG_VERSION = require( './../package.json' ).version;


// TESTS //

tape( 'command-line interface', function test( t ) {
	t.ok( true, __filename );
	t.end();
});

tape( 'when invoked with a `--help` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		EXEC_PATH,
		fpath,
		'--help'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-h` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		EXEC_PATH,
		fpath,
		'-h'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `--version` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--version'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-V` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-V'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints signatures', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'base.sin'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			stdout = stdout.toString().split( '\n' );

			// Greater than 1 in order to include the trailing newline:
			t.strictEqual( stdout.length > 1, true, 'prints signatures' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'if unable to resolve signatures, the command-line interface sets a non-zero exit code', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'fjaldfjadljfeoejreandfljasdfjadsfjs'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.pass( error.message );
			t.strictEqual( error.code, 1, 'expected exit code' );
		}
		t.strictEqual( stdout.toString(), '', 'does not print to` stdout`' );
		t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		t.end();
	}
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/repl/typed-signature/test/test.cli.js","/lib/node_modules/@stdlib/repl/typed-signature/test")
},{"./../package.json":48,"@stdlib/assert/is-browser":7,"@stdlib/assert/is-windows":25,"@stdlib/fs/read-file":28,"@stdlib/process/exec-path":44,"child_process":80,"path":83,"tape":183}],50:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var aliases = require( '@stdlib/namespace/aliases' );
var DATA = require( './../data/data.json' );
var typedSignature = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof typedSignature, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided a string', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			typedSignature( value );
		};
	}
});

tape( 'the function returns one or more typed signatures', function test( t ) {
	var expected;
	var actual;
	var list;
	var i;
	var j;

	list = aliases();
	for ( i = 0; i < list.length; i++ ) {
		expected = [];
		for ( j = 0; j < DATA.length; j++ ) {
			if ( DATA[ j ][ 0 ] === list[ i ] ) {
				expected.push( DATA[ j ][ 1 ] );
			}
		}
		if ( expected.length === 0 ) {
			expected = null;
		}
		actual = typedSignature( list[i] );
		t.deepEqual( actual, expected, 'returns expected value for '+list[i] );
	}
	t.end();
});

tape( 'the function returns `null` if provided an unrecognized alias', function test( t ) {
	var values;
	var i;

	values = [
		'adfkaljdfdsafs',
		'adklfadjflajdslfjalsdf',
		'adflkajdlkfjasdlkfjsadlkfjlasdjflsdjfla'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.strictEqual( typedSignature( values[ i ] ), null, 'returns expected value' );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/repl/typed-signature/test/test.js")
},{"./../data/data.json":45,"./../lib":46,"@stdlib/namespace/aliases":39,"tape":183}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( './is_number.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var abs = Math.abs; // eslint-disable-line stdlib/no-builtin-math
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;
var replace = String.prototype.replace;


// VARIABLES //

var RE_EXP_POS_DIGITS = /e\+(\d)$/;
var RE_EXP_NEG_DIGITS = /e-(\d)$/;
var RE_ONLY_DIGITS = /^(\d+)$/;
var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
var RE_TRAILING_PERIOD_ZERO = /\.0$/;
var RE_PERIOD_ZERO_EXP = /\.0*e/;
var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;


// MAIN //

/**
* Formats a token object argument as a floating-point number.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid floating-point number
* @returns {string} formatted token argument
*/
function formatDouble( token ) {
	var digits;
	var out;
	var f = parseFloat( token.arg );
	if ( !isFinite( f ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( token.arg ) ) {
			throw new Error( 'invalid floating-point number. Value: ' + out );
		}
		// Case: NaN, Infinity, or -Infinity
		f = token.arg;
	}
	switch ( token.specifier ) {
	case 'e':
	case 'E':
		out = f.toExponential( token.precision );
		break;
	case 'f':
	case 'F':
		out = f.toFixed( token.precision );
		break;
	case 'g':
	case 'G':
		if ( abs( f ) < 0.0001 ) {
			digits = token.precision;
			if ( digits > 0 ) {
				digits -= 1;
			}
			out = f.toExponential( digits );
		} else {
			out = f.toPrecision( token.precision );
		}
		if ( !token.alternate ) {
			out = replace.call( out, RE_ZERO_BEFORE_EXP, '$1e' );
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
			out = replace.call( out, RE_TRAILING_PERIOD_ZERO, '' );
		}
		break;
	default:
		throw new Error( 'invalid double notation. Value: ' + token.specifier );
	}
	out = replace.call( out, RE_EXP_POS_DIGITS, 'e+0$1' );
	out = replace.call( out, RE_EXP_NEG_DIGITS, 'e-0$1' );
	if ( token.alternate ) {
		out = replace.call( out, RE_ONLY_DIGITS, '$1.' );
		out = replace.call( out, RE_DIGITS_BEFORE_EXP, '$1.e' );
	}
	if ( f >= 0 && token.sign ) {
		out = token.sign + out;
	}
	out = ( token.specifier === uppercase.call( token.specifier ) ) ?
		uppercase.call( out ) :
		lowercase.call( out );
	return out;
}


// EXPORTS //

module.exports = formatDouble;

},{"./is_number.js":54}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( './is_number.js' );
var zeroPad = require( './zero_pad.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;


// MAIN //

/**
* Formats a token object argument as an integer.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid integer
* @returns {string} formatted token argument
*/
function formatInteger( token ) {
	var base;
	var out;
	var i;

	switch ( token.specifier ) {
	case 'b':
		// Case: %b (binary)
		base = 2;
		break;
	case 'o':
		// Case: %o (octal)
		base = 8;
		break;
	case 'x':
	case 'X':
		// Case: %x, %X (hexadecimal)
		base = 16;
		break;
	case 'd':
	case 'i':
	case 'u':
	default:
		// Case: %d, %i, %u (decimal)
		base = 10;
		break;
	}
	out = token.arg;
	i = parseInt( out, 10 );
	if ( !isFinite( i ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( out ) ) {
			throw new Error( 'invalid integer. Value: ' + out );
		}
		i = 0;
	}
	if ( i < 0 && ( token.specifier === 'u' || base !== 10 ) ) {
		i = 0xffffffff + i + 1;
	}
	if ( i < 0 ) {
		out = ( -i ).toString( base );
		if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		out = '-' + out;
	} else {
		out = i.toString( base );
		if ( !i && !token.precision ) {
			out = '';
		} else if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		if ( token.sign ) {
			out = token.sign + out;
		}
	}
	if ( base === 16 ) {
		if ( token.alternate ) {
			out = '0x' + out;
		}
		out = ( token.specifier === uppercase.call( token.specifier ) ) ?
			uppercase.call( out ) :
			lowercase.call( out );
	}
	if ( base === 8 ) {
		if ( token.alternate && out.charAt( 0 ) !== '0' ) {
			out = '0' + out;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInteger;

},{"./is_number.js":54,"./zero_pad.js":58}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Generate string from a token array by interpolating values.
*
* @module @stdlib/string/base/format-interpolate
*
* @example
* var formatInterpolate = require( '@stdlib/string/base/format-interpolate' );
*
* var tokens = ['Hello ', { 'specifier': 's' }, '!' ];
* var out = formatInterpolate( tokens, 'World' );
* // returns 'Hello World!'
*/

// MODULES //

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":56}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );  // NOTE: we inline the `isNumber.isPrimitive` function from `@stdlib/assert/is-number` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isNumber;

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' ); // NOTE: we inline the `isString.isPrimitive` function from `@stdlib/assert/is-string` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isString;

},{}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var formatInteger = require( './format_integer.js' );
var isString = require( './is_string.js' );
var formatDouble = require( './format_double.js' );
var spacePad = require( './space_pad.js' );
var zeroPad = require( './zero_pad.js' );


// VARIABLES //

var fromCharCode = String.fromCharCode;
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Initializes token object with properties of supplied format identifier object or default values if not present.
*
* @private
* @param {Object} token - format identifier object
* @returns {Object} token object
*/
function initialize( token ) {
	var out = {};
	out.specifier = token.specifier;
	out.precision = ( token.precision === void 0 ) ? 1 : token.precision;
	out.width = token.width;
	out.flags = token.flags || '';
	out.mapping = token.mapping;
	return out;
}


// MAIN //

/**
* Generates string from a token array by interpolating values.
*
* @param {Array} tokens - string parts and format identifier objects
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be an array
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var tokens = [ 'beep ', { 'specifier': 's' } ];
* var out = formatInterpolate( tokens, 'boop' );
* // returns 'beep boop'
*/
function formatInterpolate( tokens ) {
	var hasPeriod;
	var flags;
	var token;
	var flag;
	var num;
	var out;
	var pos;
	var i;
	var j;

	if ( !isArray( tokens ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array. Value: `' + tokens + '`.' );
	}
	out = '';
	pos = 1;
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isString( token ) ) {
			out += token;
		} else {
			hasPeriod = token.precision !== void 0;
			token = initialize( token );
			if ( !token.specifier ) {
				throw new TypeError( 'invalid argument. Token is missing `specifier` property. Index: `'+ i +'`. Value: `' + token + '`.' );
			}
			if ( token.mapping ) {
				pos = token.mapping;
			}
			flags = token.flags;
			for ( j = 0; j < flags.length; j++ ) {
				flag = flags.charAt( j );
				switch ( flag ) {
				case ' ':
					token.sign = ' ';
					break;
				case '+':
					token.sign = '+';
					break;
				case '-':
					token.padRight = true;
					token.padZeros = false;
					break;
				case '0':
					token.padZeros = flags.indexOf( '-' ) < 0; // NOTE: We use built-in `Array.prototype.indexOf` here instead of `@stdlib/assert/contains` in order to avoid circular dependencies.
					break;
				case '#':
					token.alternate = true;
					break;
				default:
					throw new Error( 'invalid flag: ' + flag );
				}
			}
			if ( token.width === '*' ) {
				token.width = parseInt( arguments[ pos ], 10 );
				pos += 1;
				if ( isnan( token.width ) ) {
					throw new TypeError( 'the argument for * width at position ' + pos + ' is not a number. Value: `' + token.width + '`.' );
				}
				if ( token.width < 0 ) {
					token.padRight = true;
					token.width = -token.width;
				}
			}
			if ( hasPeriod ) {
				if ( token.precision === '*' ) {
					token.precision = parseInt( arguments[ pos ], 10 );
					pos += 1;
					if ( isnan( token.precision ) ) {
						throw new TypeError( 'the argument for * precision at position ' + pos + ' is not a number. Value: `' + token.precision + '`.' );
					}
					if ( token.precision < 0 ) {
						token.precision = 1;
						hasPeriod = false;
					}
				}
			}
			token.arg = arguments[ pos ];
			switch ( token.specifier ) {
			case 'b':
			case 'o':
			case 'x':
			case 'X':
			case 'd':
			case 'i':
			case 'u':
				// Case: %b (binary), %o (octal), %x, %X (hexadecimal), %d, %i (decimal), %u (unsigned decimal)
				if ( hasPeriod ) {
					token.padZeros = false;
				}
				token.arg = formatInteger( token );
				break;
			case 's':
				// Case: %s (string)
				token.maxWidth = ( hasPeriod ) ? token.precision : -1;
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
				}
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
				// Case: %e, %E (scientific notation), %f, %F (decimal floating point), %g, %G (uses the shorter of %e/E or %f/F)
				if ( !hasPeriod ) {
					token.precision = 6;
				}
				token.arg = formatDouble( token );
				break;
			default:
				throw new Error( 'invalid specifier: ' + token.specifier );
			}
			// Fit argument into field width...
			if ( token.maxWidth >= 0 && token.arg.length > token.maxWidth ) {
				token.arg = token.arg.substring( 0, token.maxWidth );
			}
			if ( token.padZeros ) {
				token.arg = zeroPad( token.arg, token.width || token.precision, token.padRight ); // eslint-disable-line max-len
			} else if ( token.width ) {
				token.arg = spacePad( token.arg, token.width, token.padRight );
			}
			out += token.arg || '';
			pos += 1;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInterpolate;

},{"./format_double.js":51,"./format_integer.js":52,"./is_string.js":55,"./space_pad.js":57,"./zero_pad.js":58}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

/**
* Returns `n` spaces.
*
* @private
* @param {number} n - number of spaces
* @returns {string} string of spaces
*/
function spaces( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += ' ';
	}
	return out;
}


// MAIN //

/**
* Pads a token with spaces to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function spacePad( str, width, right ) {
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	str = ( right ) ?
		str + spaces( pad ) :
		spaces( pad ) + str;
	return str;
}


// EXPORTS //

module.exports = spacePad;

},{}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

/**
* Tests if a string starts with a minus sign (`-`).
*
* @private
* @param {string} str - input string
* @returns {boolean} boolean indicating if a string starts with a minus sign (`-`)
*/
function startsWithMinus( str ) {
	return str[ 0 ] === '-';
}

/**
* Returns a string of `n` zeros.
*
* @private
* @param {number} n - number of zeros
* @returns {string} string of zeros
*/
function zeros( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += '0';
	}
	return out;
}


// MAIN //

/**
* Pads a token with zeros to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function zeroPad( str, width, right ) {
	var negative = false;
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	if ( startsWithMinus( str ) ) {
		negative = true;
		str = str.substr( 1 );
	}
	str = ( right ) ?
		str + zeros( pad ) :
		zeros( pad ) + str;
	if ( negative ) {
		str = '-' + str;
	}
	return str;
}


// EXPORTS //

module.exports = zeroPad;

},{}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tokenize a string into an array of string parts and format identifier objects.
*
* @module @stdlib/string/base/format-tokenize
*
* @example
* var formatTokenize = require( '@stdlib/string/base/format-tokenize' );
*
* var str = 'Hello %s!';
* var tokens = formatTokenize( str );
* // returns [ 'Hello ', {...}, '!' ]
*/

// MODULES //

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// VARIABLES //

var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;


// FUNCTIONS //

/**
* Parses a delimiter.
*
* @private
* @param {Array} match - regular expression match
* @returns {Object} delimiter token object
*/
function parse( match ) {
	var token = {
		'mapping': ( match[ 1 ] ) ? parseInt( match[ 1 ], 10 ) : void 0,
		'flags': match[ 2 ],
		'width': match[ 3 ],
		'precision': match[ 5 ],
		'specifier': match[ 6 ]
	};
	if ( match[ 4 ] === '.' && match[ 5 ] === void 0 ) {
		token.precision = '1';
	}
	return token;
}


// MAIN //

/**
* Tokenizes a string into an array of string parts and format identifier objects.
*
* @param {string} str - input string
* @returns {Array} tokens
*
* @example
* var tokens = formatTokenize( 'Hello %s!' );
* // returns [ 'Hello ', {...}, '!' ]
*/
function formatTokenize( str ) {
	var content;
	var tokens;
	var match;
	var prev;

	tokens = [];
	prev = 0;
	match = RE.exec( str );
	while ( match ) {
		content = str.slice( prev, RE.lastIndex - match[ 0 ].length );
		if ( content.length ) {
			tokens.push( content );
		}
		tokens.push( parse( match ) );
		prev = RE.lastIndex;
		match = RE.exec( str );
	}
	content = str.slice( prev );
	if ( content.length ) {
		tokens.push( content );
	}
	return tokens;
}


// EXPORTS //

module.exports = formatTokenize;

},{}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Insert supplied variable values into a format string.
*
* @module @stdlib/string/format
*
* @example
* var format = require( '@stdlib/string/format' );
*
* var out = format( '%s %s!', 'Hello', 'World' );
* // returns 'Hello World!'
*
* out = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/

// MODULES //

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":63}],62:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var interpolate = require( '@stdlib/string/base/format-interpolate' );
var tokenize = require( '@stdlib/string/base/format-tokenize' );
var isString = require( './is_string.js' );


// MAIN //

/**
* Inserts supplied variable values into a format string.
*
* @param {string} str - input string
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be a string
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var str = format( 'Hello %s!', 'world' );
* // returns 'Hello world!'
*
* @example
* var str = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/
function format( str ) {
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":62,"@stdlib/string/base/format-interpolate":53,"@stdlib/string/base/format-tokenize":59}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a string starts with the characters of another string.
*
* @module @stdlib/string/starts-with
*
* @example
* var startsWith = require( '@stdlib/string/starts-with' );
*
* var str = 'Fair is foul, and foul is fair, hover through fog and filthy air';
* var bool = startsWith( str, 'Fair' );
* // returns true
*
* bool = startsWith( str, 'fair' );
* // returns false
*
* bool = startsWith( str, 'foul', 8 );
* // returns true
*
* bool = startsWith( str, 'filthy', -10 );
* // returns true
*/

// MODULES //

var startsWith = require( './starts_with.js' );


// EXPORTS //

module.exports = startsWith;

},{"./starts_with.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Tests if a string starts with the characters of another string.
*
* @param {string} str - input string
* @param {string} search - search string
* @param {integer} [position=0] - position at which to start searching
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} third argument must be an integer
* @returns {boolean} boolean indicating if the input string starts with the search string
*
* @example
* var bool = startsWith( 'Remember the story I used to tell you when you were a boy?', 'Remember' );
* // returns true
*
* @example
* var bool = startsWith( 'Remember the story I used to tell you when you were a boy?', 'Remember, remember' );
* // returns false
*
* @example
* var bool = startsWith( 'To be, or not to be, that is the question.', 'To be' );
* // returns true
*
* @example
* var bool = startsWith( 'To be, or not to be, that is the question.', 'to be' );
* // returns false
*
* @example
* var bool = startsWith( 'To be, or not to be, that is the question.', 'to be', 14 );
* // returns true
*
* @example
* var bool = startsWith( 'To be, or not to be, that is the question.', 'quest', -9 );
* // returns true
*/
function startsWith( str, search, position ) {
	var pos;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isString( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', search ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isInteger( position ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be an integer. Value: `%s`.', position ) );
		}
		if ( position < 0 ) {
			pos = str.length + position;
		} else {
			pos = position;
		}
	} else {
		pos = 0;
	}
	if ( search.length === 0 ) {
		return true;
	}
	if (
		pos < 0 ||
		pos + search.length > str.length
	) {
		return false;
	}
	for ( i = 0; i < search.length; i++ ) {
		if ( str.charCodeAt( pos + i ) !== search.charCodeAt( i ) ) {
			return false;
		}
	}
	return true;
}


// EXPORTS //

module.exports = startsWith;

},{"@stdlib/assert/is-integer":8,"@stdlib/assert/is-string":19,"@stdlib/string/format":61}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-only property.
*
* @module @stdlib/utils/define-nonenumerable-read-only-property
*
* @example
* var setNonEnumerableReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
*
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"./main.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"@stdlib/utils/define-property":71}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @name defineProperty
* @type {Function}
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
var defineProperty = Object.defineProperty;


// EXPORTS //

module.exports = defineProperty;

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @private
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":69}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define (or modify) an object property.
*
* @module @stdlib/utils/define-property
*
* @example
* var defineProperty = require( '@stdlib/utils/define-property' );
*
* var obj = {};
* defineProperty( obj, 'foo', {
*     'value': 'bar',
*     'writable': false,
*     'configurable': false,
*     'enumerable': false
* });
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var hasDefinePropertySupport = require( './has_define_property_support.js' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var defineProperty;
if ( hasDefinePropertySupport() ) {
	defineProperty = builtin;
} else {
	defineProperty = polyfill;
}


// EXPORTS //

module.exports = defineProperty;

},{"./builtin.js":68,"./has_define_property_support.js":70,"./polyfill.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle, no-proto */

'use strict';

// MODULES //

var format = require( '@stdlib/string/format' );


// VARIABLES //

var objectProtoype = Object.prototype;
var toStr = objectProtoype.toString;
var defineGetter = objectProtoype.__defineGetter__;
var defineSetter = objectProtoype.__defineSetter__;
var lookupGetter = objectProtoype.__lookupGetter__;
var lookupSetter = objectProtoype.__lookupSetter__;


// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
function defineProperty( obj, prop, descriptor ) {
	var prototype;
	var hasValue;
	var hasGet;
	var hasSet;

	if ( typeof obj !== 'object' || obj === null || toStr.call( obj ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. Property descriptor must be an object. Value: `%s`.', descriptor ) );
	}
	hasValue = ( 'value' in descriptor );
	if ( hasValue ) {
		if (
			lookupGetter.call( obj, prop ) ||
			lookupSetter.call( obj, prop )
		) {
			// Override `__proto__` to avoid touching inherited accessors:
			prototype = obj.__proto__;
			obj.__proto__ = objectProtoype;

			// Delete property as existing getters/setters prevent assigning value to specified property:
			delete obj[ prop ];
			obj[ prop ] = descriptor.value;

			// Restore original prototype:
			obj.__proto__ = prototype;
		} else {
			obj[ prop ] = descriptor.value;
		}
	}
	hasGet = ( 'get' in descriptor );
	hasSet = ( 'set' in descriptor );

	if ( hasValue && ( hasGet || hasSet ) ) {
		throw new Error( 'invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.' );
	}

	if ( hasGet && defineGetter ) {
		defineGetter.call( obj, prop, descriptor.get );
	}
	if ( hasSet && defineSetter ) {
		defineSetter.call( obj, prop, descriptor.set );
	}
	return obj;
}


// EXPORTS //

module.exports = defineProperty;

},{"@stdlib/string/format":61}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":74,"./polyfill.js":75,"@stdlib/assert/has-tostringtag-support":5}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":76}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":76,"./tostringtag.js":77,"@stdlib/assert/has-own-property":1}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],78:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],79:[function(require,module,exports){

},{}],80:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],81:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":78,"buffer":81,"ieee754":169}],82:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],83:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":175}],84:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":82,"inherits":170,"readable-stream/lib/_stream_duplex.js":86,"readable-stream/lib/_stream_passthrough.js":87,"readable-stream/lib/_stream_readable.js":88,"readable-stream/lib/_stream_transform.js":89,"readable-stream/lib/_stream_writable.js":90,"readable-stream/lib/internal/streams/end-of-stream.js":94,"readable-stream/lib/internal/streams/pipeline.js":96}],85:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],86:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":88,"./_stream_writable":90,"_process":175,"inherits":170}],87:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":89,"inherits":170}],88:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":85,"./_stream_duplex":86,"./internal/streams/async_iterator":91,"./internal/streams/buffer_list":92,"./internal/streams/destroy":93,"./internal/streams/from":95,"./internal/streams/state":97,"./internal/streams/stream":98,"_process":175,"buffer":81,"events":82,"inherits":170,"string_decoder/":182,"util":79}],89:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":85,"./_stream_duplex":86,"inherits":170}],90:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":85,"./_stream_duplex":86,"./internal/streams/destroy":93,"./internal/streams/state":97,"./internal/streams/stream":98,"_process":175,"buffer":81,"inherits":170,"util-deprecate":191}],91:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":94,"_process":175}],92:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":81,"util":79}],93:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":175}],94:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":85}],95:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],96:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":85,"./end-of-stream":94}],97:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":85}],98:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":82}],99:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":100,"get-intrinsic":164}],100:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":163,"get-intrinsic":164}],101:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":102,"./lib/keys.js":103}],102:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],103:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],104:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = require('has-property-descriptors')();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"has-property-descriptors":165,"object-keys":173}],105:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],106:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.3

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

},{"./ToNumber":136,"./ToPrimitive":138,"./Type":143}],107:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

},{"../helpers/isFinite":152,"../helpers/isNaN":154,"../helpers/isPrefixOf":155,"./ToNumber":136,"./ToPrimitive":138,"./Type":143,"get-intrinsic":164}],108:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

},{"get-intrinsic":164}],109:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

},{"./DayWithinYear":112,"./InLeapYear":116,"./MonthFromTime":126,"get-intrinsic":164}],110:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":159,"./floor":147}],111:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":147}],112:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":110,"./DayFromYear":111,"./YearFromTime":145}],113:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

},{"./modulo":148}],114:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsDataDescriptor(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/assertRecord":151,"./IsAccessorDescriptor":117,"./IsDataDescriptor":119,"./Type":143,"get-intrinsic":164}],115:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

},{"../helpers/timeConstants":159,"./floor":147,"./modulo":148}],116:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

},{"./DaysInYear":113,"./YearFromTime":145,"get-intrinsic":164}],117:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":151,"./Type":143,"has":168}],118:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":171}],119:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":151,"./Type":143,"has":168}],120:[function(require,module,exports){
'use strict';

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"../helpers/assertRecord":151,"./IsAccessorDescriptor":117,"./IsDataDescriptor":119,"./Type":143}],121:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

},{"../helpers/isPropertyDescriptor":156,"./IsAccessorDescriptor":117,"./IsDataDescriptor":119,"./Type":143}],122:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

},{"../helpers/isFinite":152,"../helpers/timeConstants":159}],123:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

},{"../helpers/isFinite":152,"./DateFromTime":109,"./Day":110,"./MonthFromTime":126,"./ToInteger":135,"./YearFromTime":145,"./floor":147,"./modulo":148,"get-intrinsic":164}],124:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

},{"../helpers/isFinite":152,"../helpers/timeConstants":159,"./ToInteger":135}],125:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

},{"../helpers/timeConstants":159,"./floor":147,"./modulo":148}],126:[function(require,module,exports){
'use strict';

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

},{"./DayWithinYear":112,"./InLeapYear":116}],127:[function(require,module,exports){
'use strict';

var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

},{"../helpers/isNaN":154}],128:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

},{"../helpers/timeConstants":159,"./floor":147,"./modulo":148}],129:[function(require,module,exports){
'use strict';

var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

},{"./Type":143}],130:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


},{"../helpers/isFinite":152,"./ToNumber":136,"./abs":146,"get-intrinsic":164}],131:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":159,"./DayFromYear":111}],132:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":159,"./modulo":148}],133:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],134:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":136}],135:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.4

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if ($isNaN(number)) { return 0; }
	if (number === 0 || !$isFinite(number)) { return number; }
	return $sign(number) * floor(abs(number));
};

},{"../helpers/isFinite":152,"../helpers/isNaN":154,"../helpers/sign":158,"./ToNumber":136,"./abs":146,"./floor":147}],136:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":138}],137:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":108,"get-intrinsic":164}],138:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":160}],139:[function(require,module,exports){
'use strict';

var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":118,"./ToBoolean":133,"./Type":143,"get-intrinsic":164,"has":168}],140:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":164}],141:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

},{"../helpers/isFinite":152,"../helpers/isNaN":154,"../helpers/sign":158,"./ToNumber":136,"./abs":146,"./floor":147,"./modulo":148}],142:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":136}],143:[function(require,module,exports){
'use strict';

// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

},{}],144:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":110,"./modulo":148}],145:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

},{"call-bind/callBound":99,"get-intrinsic":164}],146:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":164}],147:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],148:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":157}],149:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":159,"./modulo":148}],150:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	CheckObjectCoercible: require('./5/CheckObjectCoercible'),
	DateFromTime: require('./5/DateFromTime'),
	Day: require('./5/Day'),
	DayFromYear: require('./5/DayFromYear'),
	DaysInYear: require('./5/DaysInYear'),
	DayWithinYear: require('./5/DayWithinYear'),
	floor: require('./5/floor'),
	FromPropertyDescriptor: require('./5/FromPropertyDescriptor'),
	HourFromTime: require('./5/HourFromTime'),
	InLeapYear: require('./5/InLeapYear'),
	IsAccessorDescriptor: require('./5/IsAccessorDescriptor'),
	IsCallable: require('./5/IsCallable'),
	IsDataDescriptor: require('./5/IsDataDescriptor'),
	IsGenericDescriptor: require('./5/IsGenericDescriptor'),
	IsPropertyDescriptor: require('./5/IsPropertyDescriptor'),
	MakeDate: require('./5/MakeDate'),
	MakeDay: require('./5/MakeDay'),
	MakeTime: require('./5/MakeTime'),
	MinFromTime: require('./5/MinFromTime'),
	modulo: require('./5/modulo'),
	MonthFromTime: require('./5/MonthFromTime'),
	msFromTime: require('./5/msFromTime'),
	SameValue: require('./5/SameValue'),
	SecFromTime: require('./5/SecFromTime'),
	TimeClip: require('./5/TimeClip'),
	TimeFromYear: require('./5/TimeFromYear'),
	TimeWithinDay: require('./5/TimeWithinDay'),
	ToBoolean: require('./5/ToBoolean'),
	ToInt32: require('./5/ToInt32'),
	ToInteger: require('./5/ToInteger'),
	ToNumber: require('./5/ToNumber'),
	ToObject: require('./5/ToObject'),
	ToPrimitive: require('./5/ToPrimitive'),
	ToPropertyDescriptor: require('./5/ToPropertyDescriptor'),
	ToString: require('./5/ToString'),
	ToUint16: require('./5/ToUint16'),
	ToUint32: require('./5/ToUint32'),
	Type: require('./5/Type'),
	WeekDay: require('./5/WeekDay'),
	YearFromTime: require('./5/YearFromTime')
};

},{"./5/AbstractEqualityComparison":106,"./5/AbstractRelationalComparison":107,"./5/CheckObjectCoercible":108,"./5/DateFromTime":109,"./5/Day":110,"./5/DayFromYear":111,"./5/DayWithinYear":112,"./5/DaysInYear":113,"./5/FromPropertyDescriptor":114,"./5/HourFromTime":115,"./5/InLeapYear":116,"./5/IsAccessorDescriptor":117,"./5/IsCallable":118,"./5/IsDataDescriptor":119,"./5/IsGenericDescriptor":120,"./5/IsPropertyDescriptor":121,"./5/MakeDate":122,"./5/MakeDay":123,"./5/MakeTime":124,"./5/MinFromTime":125,"./5/MonthFromTime":126,"./5/SameValue":127,"./5/SecFromTime":128,"./5/StrictEqualityComparison":129,"./5/TimeClip":130,"./5/TimeFromYear":131,"./5/TimeWithinDay":132,"./5/ToBoolean":133,"./5/ToInt32":134,"./5/ToInteger":135,"./5/ToNumber":136,"./5/ToObject":137,"./5/ToPrimitive":138,"./5/ToPropertyDescriptor":139,"./5/ToString":140,"./5/ToUint16":141,"./5/ToUint32":142,"./5/Type":143,"./5/WeekDay":144,"./5/YearFromTime":145,"./5/abs":146,"./5/floor":147,"./5/modulo":148,"./5/msFromTime":149}],151:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var isMatchRecord = require('./isMatchRecord');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Desc) {
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},
	// https://262.ecma-international.org/13.0/#sec-match-records
	'Match Record': isMatchRecord
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (Type(value) !== 'Object' || !predicate(value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"./isMatchRecord":153,"get-intrinsic":164,"has":168}],152:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],153:[function(require,module,exports){
'use strict';

var has = require('has');

// https://262.ecma-international.org/13.0/#sec-match-records

module.exports = function isMatchRecord(record) {
	return (
		has(record, '[[StartIndex]]')
        && has(record, '[[EndIndex]]')
        && record['[[StartIndex]]'] >= 0
        && record['[[EndIndex]]'] >= record['[[StartIndex]]']
        && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]'])
        && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]'])
	);
};

},{"has":168}],154:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],155:[function(require,module,exports){
'use strict';

var $strSlice = require('call-bind/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"call-bind/callBound":99}],156:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"get-intrinsic":164,"has":168}],157:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],158:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],159:[function(require,module,exports){
'use strict';

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

module.exports = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

},{}],160:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":161,"is-callable":171}],161:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],162:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],163:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":162}],164:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":163,"has":168,"has-symbols":166}],165:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"get-intrinsic":164}],166:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":167}],167:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],168:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":163}],169:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],170:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],171:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

},{}],172:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":174}],173:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":172,"./isArguments":174}],174:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],175:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],176:[function(require,module,exports){
(function (process,setImmediate){(function (){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":175,"through":189,"timers":190}],177:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":81}],178:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":150,"function-bind":163}],179:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":178,"./polyfill":180,"./shim":181,"define-properties":104,"function-bind":163}],180:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":178}],181:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":180,"define-properties":104}],182:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":177}],183:[function(require,module,exports){
(function (process,setImmediate){(function (){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":184,"./lib/results":186,"./lib/test":187,"_process":175,"defined":105,"through":189,"timers":190}],184:[function(require,module,exports){
(function (process){(function (){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this)}).call(this,require('_process'))
},{"_process":175,"fs":80,"through":189}],185:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":175,"timers":190}],186:[function(require,module,exports){
(function (process,setImmediate){(function (){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":175,"events":82,"function-bind":163,"has":168,"inherits":170,"object-inspect":188,"resumer":176,"through":189,"timers":190}],187:[function(require,module,exports){
(function (__dirname){(function (){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this)}).call(this,"/node_modules/tape/lib")
},{"./next_tick":185,"deep-equal":101,"defined":105,"events":82,"has":168,"inherits":170,"path":83,"string.prototype.trim":179}],188:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],189:[function(require,module,exports){
(function (process){(function (){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this)}).call(this,require('_process'))
},{"_process":175,"stream":84}],190:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":175,"timers":190}],191:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[49,50]);
