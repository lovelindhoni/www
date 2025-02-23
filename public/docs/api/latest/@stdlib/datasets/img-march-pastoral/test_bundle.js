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
(function (Buffer){(function (){
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

var main = ( typeof Buffer === 'function' ) ? Buffer : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":100}],2:[function(require,module,exports){
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
* Test for native `Buffer` support.
*
* @module @stdlib/assert/has-node-buffer-support
*
* @example
* var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
*
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/

// MODULES //

var hasNodeBufferSupport = require( './main.js' );


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./main.js":3}],3:[function(require,module,exports){
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

var isBuffer = require( '@stdlib/assert/is-buffer' );
var GlobalBuffer = require( './buffer.js' );


// MAIN //

/**
* Tests for native `Buffer` support.
*
* @returns {boolean} boolean indicating if an environment has `Buffer` support
*
* @example
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/
function hasNodeBufferSupport() {
	var bool;
	var b;

	if ( typeof GlobalBuffer !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		if ( typeof GlobalBuffer.from === 'function' ) {
			b = GlobalBuffer.from( [ 1, 2, 3, 4 ] );
		} else {
			b = new GlobalBuffer( [ 1, 2, 3, 4 ] ); // Note: this is deprecated behavior starting in Node v6 (see https://nodejs.org/api/buffer.html#buffer_new_buffer_array)
		}
		bool = (
			isBuffer( b ) &&
			b[ 0 ] === 1 &&
			b[ 1 ] === 2 &&
			b[ 2 ] === 3 &&
			b[ 3 ] === 4
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./buffer.js":1,"@stdlib/assert/is-buffer":19}],4:[function(require,module,exports){
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

},{"./main.js":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./main.js":7}],7:[function(require,module,exports){
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

},{"./main.js":9}],9:[function(require,module,exports){
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

},{"@stdlib/assert/has-symbol-support":6}],10:[function(require,module,exports){
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
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

},{"./main.js":11}],11:[function(require,module,exports){
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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var f;


// FUNCTIONS //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
}


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":85}],12:[function(require,module,exports){
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
* Test if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":13,"./object.js":14,"./primitive.js":15,"@stdlib/utils/define-nonenumerable-read-only-property":72}],13:[function(require,module,exports){
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
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":14,"./primitive.js":15}],14:[function(require,module,exports){
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
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":17,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":85}],15:[function(require,module,exports){
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
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

},{}],16:[function(require,module,exports){
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
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

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

},{"./tostring.js":16}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
* Test if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./main.js":20}],20:[function(require,module,exports){
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

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&

				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
}


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":23}],21:[function(require,module,exports){
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
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

},{"./main.js":22}],22:[function(require,module,exports){
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

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":94}],23:[function(require,module,exports){
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
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":24,"@stdlib/assert/tools/array-function":33,"@stdlib/utils/define-nonenumerable-read-only-property":72}],24:[function(require,module,exports){
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
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
}


// EXPORTS //

module.exports = isObjectLike;

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

},{"./main.js":26,"./object.js":27,"./primitive.js":28,"@stdlib/utils/define-nonenumerable-read-only-property":72}],26:[function(require,module,exports){
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

},{"./object.js":27,"./primitive.js":28}],27:[function(require,module,exports){
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

},{"./try2valueof.js":29,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":85}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"./valueof.js":30}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"@stdlib/os/platform":52}],32:[function(require,module,exports){
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

var isArray = require( '@stdlib/assert/is-array' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( format( 'invalid argument. Must provide a function. Value: `%s`.', predicate ) );
	}
	return every;

	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":10,"@stdlib/string/format":67}],33:[function(require,module,exports){
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
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":32}],34:[function(require,module,exports){
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

var ctor = require( 'buffer' ).Buffer; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{"buffer":100}],35:[function(require,module,exports){
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
* Buffer constructor.
*
* @module @stdlib/buffer/ctor
*
* @example
* var ctor = require( '@stdlib/buffer/ctor' );
*
* var b = new ctor( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*/

// MODULES //

var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
var main = require( './buffer.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasNodeBufferSupport() ) {
	ctor = main;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./buffer.js":34,"./polyfill.js":36,"@stdlib/assert/has-node-buffer-support":2}],36:[function(require,module,exports){
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

// TODO: write (browser) polyfill

// MAIN //

/**
* Buffer constructor.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],37:[function(require,module,exports){
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

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":21,"@stdlib/buffer/ctor":35}],38:[function(require,module,exports){
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
* Allocate a buffer containing a provided string.
*
* @module @stdlib/buffer/from-string
*
* @example
* var string2buffer = require( '@stdlib/buffer/from-string' );
*
* var buf = string2buffer( 'beep boop' );
* // returns <Buffer>
*/

// MODULES //

var hasFrom = require( './has_from.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var string2buffer;
if ( hasFrom ) {
	string2buffer = main;
} else {
	string2buffer = polyfill;
}


// EXPORTS //

module.exports = string2buffer;

},{"./has_from.js":37,"./main.js":39,"./polyfill.js":40}],39:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Allocates a buffer containing a provided string.
*
* @param {string} str - input string
* @param {string} [encoding="utf8"] - character encoding
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} second argument must be a valid encoding
* @returns {Buffer} new `Buffer` instance
*
* @example
* var buf = fromString( 'beep boop' );
* // returns <Buffer>
*/
function fromString( str, encoding ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', encoding ) );
		}
		return Buffer.from( str, encoding );
	}
	return Buffer.from( str, 'utf8' );
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":35,"@stdlib/string/format":67}],40:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Allocates a buffer containing a provided string.
*
* @param {string} str - input string
* @param {string} [encoding="utf8"] - character encoding
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} second argument must be a valid encoding
* @returns {Buffer} new `Buffer` instance
*
* @example
* var buf = fromString( 'beep boop' );
* // returns <Buffer>
*/
function fromString( str, encoding ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', encoding ) );
		}
		return new Buffer( str, encoding ); // eslint-disable-line no-buffer-constructor
	}
	return new Buffer( str, 'utf8' ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":35,"@stdlib/string/format":67}],41:[function(require,module,exports){
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

var string2buffer = require( '@stdlib/buffer/from-string' );
var data = require( './data.js' );


// MAIN //

/**
* Returns an image of sheep in a pastoral setting.
*
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	return string2buffer( data, 'base64' );
}


// EXPORTS //

module.exports = image;

},{"./data.js":42,"@stdlib/buffer/from-string":38}],42:[function(require,module,exports){
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

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5QZXRlciBIZW5yeSBFbWVyc29uPC9yZGY6bGk+CiAgICAgIDwvcmRmOlNlcT4KICAgICA8L0lwdGM0eG1wRXh0OkFPQ3JlYXRvcj4KICAgICA8SXB0YzR4bXBFeHQ6QU9EYXRlQ3JlYXRlZD4xODg4PC9JcHRjNHhtcEV4dDpBT0RhdGVDcmVhdGVkPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW0sIExvcyBBbmdlbGVzPC9JcHRjNHhtcEV4dDpBT1NvdXJjZT4KICAgICA8SXB0YzR4bXBFeHQ6QU9Tb3VyY2VJbnZObz44NC5YQi42OTYuMi4xMjwvSXB0YzR4bXBFeHQ6QU9Tb3VyY2VJbnZObz4KICAgICA8SXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgICAgPHJkZjpBbHQ+CiAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkEgTWFyY2ggUGFzdG9yYWwuIFtTdWZmb2xrLl08L3JkZjpsaT4KICAgICAgPC9yZGY6QWx0PgogICAgIDwvSXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgIDwvcmRmOmxpPgogICA8L3JkZjpCYWc+CiAgPC9JcHRjNHhtcEV4dDpBcnR3b3JrT3JPYmplY3Q+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOmNyZWF0b3I+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW08L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZGM6Y3JlYXRvcj4KICA8ZGM6ZGVzY3JpcHRpb24+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BIE1hcmNoIFBhc3RvcmFsLiBbU3VmZm9say5dOyBQZXRlciBIZW5yeSBFbWVyc29uIChCcml0aXNoLCBib3JuIEN1YmEsIDE4NTYgLSAxOTM2KTsgTG9uZG9uLCBFbmdsYW5kOyAxODg4OyBQaG90b2dyYXZ1cmU7IDExLjMgeCAyMy4yIGNtICg0IDcvMTYgeCA5IDEvOCBpbi4pOyA4NC5YQi42OTYuMi4xMjwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzpkZXNjcmlwdGlvbj4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BIE1hcmNoIFBhc3RvcmFsLiBbU3VmZm9say5dPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpwaG90b3Nob3A9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8nPgogIDxwaG90b3Nob3A6U291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L3Bob3Rvc2hvcDpTb3VyY2U+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNC0xNFQwNDo1OTo0NTwveG1wOk1ldGFkYXRhRGF0ZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wUmlnaHRzPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyc+CiAgPHhtcFJpZ2h0czpVc2FnZVRlcm1zPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+aHR0cDovL3d3dy5nZXR0eS5lZHUvbGVnYWwvaW1hZ2VfcmVxdWVzdC88L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwveG1wUmlnaHRzOlVzYWdlVGVybXM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMAAgEBAQEBAgEBAQICAgICBAMCAgICBQQEAwQGBQYGBgUGBgYHCQgGBwkHBgYICwgJCgoKCgoGCAsMCwoMCQoKCv/bAEMBAgICAgICBQMDBQoHBgcKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv/AABEIAfIEAAMBEQACEQEDEQH/xAAdAAACAwEBAQEBAAAAAAAAAAAEBQIDBgcBAAgJ/8QAShAAAgEDAwIEBAQEBAYBAgAPAQIDBAURABIhBjETIkFRBxRhcRUjMoEIQpGhUrHB8BYkM2LR4fFDcgkXJYKSJjRTohhjNUXC4v/EABsBAAMBAQEBAQAAAAAAAAAAAAABAgMEBQYH/8QANBEAAgIBBAAEBAYDAQADAQEBAAECESEDEjFBEyJRYQRxgfAykaGxwdFC4fEjFDNSBUNi/9oADAMBAAIR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';


// EXPORTS //

module.exports = data;

},{}],43:[function(require,module,exports){
(function (__dirname){(function (){
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

var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'image.jpg' );


// MAIN //

/**
* Returns an image of sheep in a pastoral setting.
*
* ## Notes
*
* -   This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
*
*
* @throws {Error} unable to read data
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	var data = readFile( fpath );
	if ( data instanceof Error ) {
		throw data;
	}
	return data;
}


// EXPORTS //

module.exports = image;

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-march-pastoral/lib")
},{"@stdlib/fs/read-file":49,"path":102}],44:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-march-pastoral",
  "version": "0.0.0",
  "description": "Image of sheep in a pastoral setting.",
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
    "img-march-pastoral": "./bin/cli"
  },
  "main": "./lib",
  "browser": "./lib/browser.js",
  "directories": {
    "benchmark": "./benchmark",
    "data": "./data",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
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
    "datasets",
    "dataset",
    "data",
    "image",
    "img",
    "nature",
    "pastoral",
    "pasture",
    "field",
    "sheep",
    "animals"
  ]
}

},{}],45:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib/browser.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-march-pastoral/test/test.browser.js")
},{"./../lib/browser.js":41,"@stdlib/assert/is-buffer":19,"tape":207}],46:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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

var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
var EXEC_PATH = require( '@stdlib/process/exec-path' );
var readFileSync = require( '@stdlib/fs/read-file' ).sync;
var string2buffer = require( '@stdlib/buffer/from-string' );


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

tape( 'the command-line interface prints the image buffer data', opts, function test( t ) {
	var expected;
	var opts;
	var cmd;

	cmd = [
		EXEC_PATH,
		fpath
	];

	expected = readFileSync( resolve( __dirname, '..', 'data', 'image.jpg' ) );
	expected = string2buffer( expected.toString(), 'base64' );

	opts = {
		'maxBuffer': 600*1024
	};
	exec( cmd.join( ' ' ), opts, done );

	function done( error, stdout, stderr ) {
		var i;
		if ( error ) {
			t.fail( error.message );
		} else {
			stdout = string2buffer( stdout.toString(), 'base64' );
			for ( i = 0; i < expected.length; i++ ) {
				t.strictEqual( stdout[ i ], expected[ i ], 'prints byte ' + i );
			}
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-march-pastoral/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-march-pastoral/test")
},{"./../package.json":44,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-windows":31,"@stdlib/buffer/from-string":38,"@stdlib/fs/read-file":49,"@stdlib/process/exec-path":53,"child_process":99,"path":102,"tape":207}],47:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib' );


// VARIABLES //

var opts = {
	'skip': IS_BROWSER
};


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', opts, function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-march-pastoral/test/test.js")
},{"./../lib":41,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-buffer":19,"tape":207}],48:[function(require,module,exports){
(function (__filename){(function (){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib/main.js');});/**
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

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var image = require( './../lib/main.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if unable to load data', function test( t ) {
	var image = proxyquire( './../lib/main.js', {
		'@stdlib/fs/read-file': {
			'sync': readFile
		}
	});
	t.throws( image, Error, 'throws an error' );
	t.end();

	function readFile() {
		return new Error( 'unable to read data' );
	}
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-march-pastoral/test/test.main.js")
},{"./../lib/main.js":43,"proxyquireify":199,"tape":207}],49:[function(require,module,exports){
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

},{"./main.js":50,"./sync.js":51,"@stdlib/utils/define-nonenumerable-read-only-property":72}],50:[function(require,module,exports){
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

},{"fs":99}],51:[function(require,module,exports){
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

},{"fs":99}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
*
* @example
* var reFunctionName = require( '@stdlib/regexp/function-name' );
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var reFunctionName = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reFunctionName, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = reFunctionName;

},{"./main.js":55,"./regexp.js":56,"@stdlib/utils/define-nonenumerable-read-only-property":72}],55:[function(require,module,exports){
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

/**
* Returns a regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @returns {RegExp} regular expression
*
* @example
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/
function reFunctionName() {
	return /^\s*function\s*([^(]*)/i;
}


// EXPORTS //

module.exports = reFunctionName;

},{}],56:[function(require,module,exports){
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

var reFunctionName = require( './main.js' );


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = reFunctionName();


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{"./main.js":55}],57:[function(require,module,exports){
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

},{"./is_number.js":60}],58:[function(require,module,exports){
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

},{"./is_number.js":60,"./zero_pad.js":64}],59:[function(require,module,exports){
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

},{"./main.js":62}],60:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./format_double.js":57,"./format_integer.js":58,"./is_string.js":61,"./space_pad.js":63,"./zero_pad.js":64}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"./main.js":66}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./main.js":69}],68:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],69:[function(require,module,exports){
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

},{"./is_string.js":68,"@stdlib/string/base/format-interpolate":59,"@stdlib/string/base/format-tokenize":65}],70:[function(require,module,exports){
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
* Determine the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":71}],71:[function(require,module,exports){
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

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
* // returns 'Function'
*/
function constructorName( v ) {
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":19,"@stdlib/regexp/function-name":54,"@stdlib/utils/native-class":85}],72:[function(require,module,exports){
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

},{"./main.js":73}],73:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":77}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./define_property.js":75}],77:[function(require,module,exports){
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

},{"./builtin.js":74,"./has_define_property_support.js":76,"./polyfill.js":78}],78:[function(require,module,exports){
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

},{"@stdlib/string/format":67}],79:[function(require,module,exports){
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
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],80:[function(require,module,exports){
(function (global){(function (){
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

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],81:[function(require,module,exports){
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
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

},{"./main.js":82}],82:[function(require,module,exports){
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

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a boolean. Value: `%s`.', codegen ) );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":79,"./global.js":80,"./self.js":83,"./window.js":84,"@stdlib/assert/is-boolean":12,"@stdlib/string/format":67}],83:[function(require,module,exports){
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

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],84:[function(require,module,exports){
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

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],85:[function(require,module,exports){
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

},{"./native_class.js":86,"./polyfill.js":87,"@stdlib/assert/has-tostringtag-support":8}],86:[function(require,module,exports){
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

},{"./tostring.js":88}],87:[function(require,module,exports){
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

},{"./tostring.js":88,"./tostringtag.js":89,"@stdlib/assert/has-own-property":4}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||

		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||

		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":91,"./fixtures/re.js":92,"./fixtures/typedarray.js":93}],91:[function(require,module,exports){
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

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":81}],92:[function(require,module,exports){
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

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],93:[function(require,module,exports){
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],94:[function(require,module,exports){
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
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":90,"./polyfill.js":95,"./typeof.js":96}],95:[function(require,module,exports){
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":70}],96:[function(require,module,exports){
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ```text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":70}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){

},{}],99:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],100:[function(require,module,exports){
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
},{"base64-js":97,"buffer":100,"ieee754":189}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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
},{"_process":198}],103:[function(require,module,exports){
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

},{"events":101,"inherits":190,"readable-stream/lib/_stream_duplex.js":105,"readable-stream/lib/_stream_passthrough.js":106,"readable-stream/lib/_stream_readable.js":107,"readable-stream/lib/_stream_transform.js":108,"readable-stream/lib/_stream_writable.js":109,"readable-stream/lib/internal/streams/end-of-stream.js":113,"readable-stream/lib/internal/streams/pipeline.js":115}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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
},{"./_stream_readable":107,"./_stream_writable":109,"_process":198,"inherits":190}],106:[function(require,module,exports){
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
},{"./_stream_transform":108,"inherits":190}],107:[function(require,module,exports){
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
},{"../errors":104,"./_stream_duplex":105,"./internal/streams/async_iterator":110,"./internal/streams/buffer_list":111,"./internal/streams/destroy":112,"./internal/streams/from":114,"./internal/streams/state":116,"./internal/streams/stream":117,"_process":198,"buffer":100,"events":101,"inherits":190,"string_decoder/":206,"util":98}],108:[function(require,module,exports){
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
},{"../errors":104,"./_stream_duplex":105,"inherits":190}],109:[function(require,module,exports){
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
},{"../errors":104,"./_stream_duplex":105,"./internal/streams/destroy":112,"./internal/streams/state":116,"./internal/streams/stream":117,"_process":198,"buffer":100,"inherits":190,"util-deprecate":215}],110:[function(require,module,exports){
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
},{"./end-of-stream":113,"_process":198}],111:[function(require,module,exports){
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
},{"buffer":100,"util":98}],112:[function(require,module,exports){
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
},{"_process":198}],113:[function(require,module,exports){
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
},{"../../../errors":104}],114:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],115:[function(require,module,exports){
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
},{"../../../errors":104,"./end-of-stream":113}],116:[function(require,module,exports){
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
},{"../../../errors":104}],117:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":101}],118:[function(require,module,exports){
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

},{"./":119,"get-intrinsic":184}],119:[function(require,module,exports){
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

},{"function-bind":183,"get-intrinsic":184}],120:[function(require,module,exports){
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

},{"./lib/is_arguments.js":121,"./lib/keys.js":122}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],123:[function(require,module,exports){
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

},{"has-property-descriptors":185,"object-keys":196}],124:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],125:[function(require,module,exports){
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

},{"./ToNumber":155,"./ToPrimitive":157,"./Type":162}],126:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":173,"../helpers/isPrefixOf":174,"./ToNumber":155,"./ToPrimitive":157,"./Type":162,"get-intrinsic":184}],127:[function(require,module,exports){
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

},{"get-intrinsic":184}],128:[function(require,module,exports){
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

},{"./DayWithinYear":131,"./InLeapYear":135,"./MonthFromTime":145,"get-intrinsic":184}],129:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":178,"./floor":166}],130:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":166}],131:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":129,"./DayFromYear":130,"./YearFromTime":164}],132:[function(require,module,exports){
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

},{"./modulo":167}],133:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162,"get-intrinsic":184}],134:[function(require,module,exports){
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

},{"../helpers/timeConstants":178,"./floor":166,"./modulo":167}],135:[function(require,module,exports){
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

},{"./DaysInYear":132,"./YearFromTime":164,"get-intrinsic":184}],136:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./Type":162,"has":188}],137:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":191}],138:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./Type":162,"has":188}],139:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162}],140:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":175,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162}],141:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/timeConstants":178}],142:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"./DateFromTime":128,"./Day":129,"./MonthFromTime":145,"./ToInteger":154,"./YearFromTime":164,"./floor":166,"./modulo":167,"get-intrinsic":184}],143:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/timeConstants":178,"./ToInteger":154}],144:[function(require,module,exports){
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

},{"../helpers/timeConstants":178,"./floor":166,"./modulo":167}],145:[function(require,module,exports){
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

},{"./DayWithinYear":131,"./InLeapYear":135}],146:[function(require,module,exports){
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

},{"../helpers/isNaN":173}],147:[function(require,module,exports){
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

},{"../helpers/timeConstants":178,"./floor":166,"./modulo":167}],148:[function(require,module,exports){
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

},{"./Type":162}],149:[function(require,module,exports){
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


},{"../helpers/isFinite":171,"./ToNumber":155,"./abs":165,"get-intrinsic":184}],150:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":178,"./DayFromYear":130}],151:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":178,"./modulo":167}],152:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],153:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":155}],154:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":173,"../helpers/sign":177,"./ToNumber":155,"./abs":165,"./floor":166}],155:[function(require,module,exports){
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

},{"./ToPrimitive":157}],156:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":127,"get-intrinsic":184}],157:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":179}],158:[function(require,module,exports){
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

},{"./IsCallable":137,"./ToBoolean":152,"./Type":162,"get-intrinsic":184,"has":188}],159:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":184}],160:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":173,"../helpers/sign":177,"./ToNumber":155,"./abs":165,"./floor":166,"./modulo":167}],161:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":155}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":129,"./modulo":167}],164:[function(require,module,exports){
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

},{"call-bind/callBound":118,"get-intrinsic":184}],165:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":184}],166:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],167:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":176}],168:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":178,"./modulo":167}],169:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":125,"./5/AbstractRelationalComparison":126,"./5/CheckObjectCoercible":127,"./5/DateFromTime":128,"./5/Day":129,"./5/DayFromYear":130,"./5/DayWithinYear":131,"./5/DaysInYear":132,"./5/FromPropertyDescriptor":133,"./5/HourFromTime":134,"./5/InLeapYear":135,"./5/IsAccessorDescriptor":136,"./5/IsCallable":137,"./5/IsDataDescriptor":138,"./5/IsGenericDescriptor":139,"./5/IsPropertyDescriptor":140,"./5/MakeDate":141,"./5/MakeDay":142,"./5/MakeTime":143,"./5/MinFromTime":144,"./5/MonthFromTime":145,"./5/SameValue":146,"./5/SecFromTime":147,"./5/StrictEqualityComparison":148,"./5/TimeClip":149,"./5/TimeFromYear":150,"./5/TimeWithinDay":151,"./5/ToBoolean":152,"./5/ToInt32":153,"./5/ToInteger":154,"./5/ToNumber":155,"./5/ToObject":156,"./5/ToPrimitive":157,"./5/ToPropertyDescriptor":158,"./5/ToString":159,"./5/ToUint16":160,"./5/ToUint32":161,"./5/Type":162,"./5/WeekDay":163,"./5/YearFromTime":164,"./5/abs":165,"./5/floor":166,"./5/modulo":167,"./5/msFromTime":168}],170:[function(require,module,exports){
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

},{"./isMatchRecord":172,"get-intrinsic":184,"has":188}],171:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],172:[function(require,module,exports){
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

},{"has":188}],173:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],174:[function(require,module,exports){
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

},{"call-bind/callBound":118}],175:[function(require,module,exports){
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

},{"get-intrinsic":184,"has":188}],176:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],177:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{"./helpers/isPrimitive":180,"is-callable":191}],180:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],181:[function(require,module,exports){
'use strict'

var mergeDescriptors = require('merge-descriptors')
var isObject = require('is-object')
var hasOwnProperty = Object.prototype.hasOwnProperty

function fill (destination, source, merge) {
  if (destination && (isObject(source) || isFunction(source))) {
    merge(destination, source, false)
    if (isFunction(destination) && isFunction(source) && source.prototype) {
      merge(destination.prototype, source.prototype, false)
    }
  }
  return destination
}

exports = module.exports = function fillKeys (destination, source) {
  return fill(destination, source, mergeDescriptors)
}

exports.es3 = function fillKeysEs3 (destination, source) {
  return fill(destination, source, es3Merge)
}

function es3Merge (destination, source) {
  for (var key in source) {
    if (!hasOwnProperty.call(destination, key)) {
      destination[key] = source[key]
    }
  }
  return destination
}

function isFunction (value) {
  return typeof value === 'function'
}

},{"is-object":192,"merge-descriptors":193}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":182}],184:[function(require,module,exports){
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

},{"function-bind":183,"has":188,"has-symbols":186}],185:[function(require,module,exports){
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

},{"get-intrinsic":184}],186:[function(require,module,exports){
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

},{"./shams":187}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":183}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
'use strict';

module.exports = function isObject(x) {
	return typeof x === 'object' && x !== null;
};

},{}],193:[function(require,module,exports){
/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge(dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip desriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}

},{}],194:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],195:[function(require,module,exports){
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

},{"./isArguments":197}],196:[function(require,module,exports){
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

},{"./implementation":195,"./isArguments":197}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
'use strict';

var fillMissingKeys = require('fill-keys');
var moduleNotFoundError = require('module-not-found-error');

function ProxyquireifyError(msg) {
  this.name = 'ProxyquireifyError';
  Error.captureStackTrace(this, ProxyquireifyError);
  this.message = msg || 'An error occurred inside proxyquireify.';
}

function validateArguments(request, stubs) {
  var msg = (function getMessage() {
    if (!request)
      return 'Missing argument: "request". Need it to resolve desired module.';

    if (!stubs)
      return 'Missing argument: "stubs". If no stubbing is needed, use regular require instead.';

    if (typeof request != 'string')
      return 'Invalid argument: "request". Needs to be a requirable string that is the module to load.';

    if (typeof stubs != 'object')
      return 'Invalid argument: "stubs". Needs to be an object containing overrides e.g., {"path": { extname: function () { ... } } }.';
  })();

  if (msg) throw new ProxyquireifyError(msg);
}

var stubs;

function stub(stubs_) {
  stubs = stubs_;
  // This cache is used by the prelude as an alternative to the regular cache.
  // It is not read or written here, except to set it to an empty object when
  // adding stubs and to reset it to null when clearing stubs.
  module.exports._cache = {};
}

function reset() {
  stubs = undefined;
  module.exports._cache = null;
}

var proxyquire = module.exports = function (require_) {
  if (typeof require_ != 'function')
    throw new ProxyquireifyError(
        'It seems like you didn\'t initialize proxyquireify with the require in your test.\n'
      + 'Make sure to correct this, i.e.: "var proxyquire = require(\'proxyquireify\')(require);"'
    );

  reset();

  return function(request, stubs) {

    validateArguments(request, stubs);

    // set the stubs and require dependency
    // when stub require is invoked by the module under test it will find the stubs here
    stub(stubs);
    var dep = require_(request);
    reset();

    return dep;
  };
};

// Start with the default cache
proxyquire._cache = null;

proxyquire._proxy = function (require_, request) {
  function original() {
    return require_(request);
  }

  if (!stubs || !stubs.hasOwnProperty(request)) return original();

  var stub = stubs[request];

  if (stub === null) throw moduleNotFoundError(request)

  var stubWideNoCallThru = Boolean(stubs['@noCallThru']) && (stub == null || stub['@noCallThru'] !== false);
  var noCallThru = stubWideNoCallThru || (stub != null && Boolean(stub['@noCallThru']));
  return noCallThru ? stub : fillMissingKeys(stub, original());
};

if (require.cache) {
  // only used during build, so prevent browserify from including it
  var replacePreludePath = './lib/replace-prelude';
  var replacePrelude = require(replacePreludePath);
  proxyquire.browserify = replacePrelude.browserify;
  proxyquire.plugin = replacePrelude.plugin;
}

},{"fill-keys":181,"module-not-found-error":194}],200:[function(require,module,exports){
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
},{"_process":198,"through":213,"timers":214}],201:[function(require,module,exports){
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

},{"buffer":100}],202:[function(require,module,exports){
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

},{"es-abstract/es5":169,"function-bind":183}],203:[function(require,module,exports){
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

},{"./implementation":202,"./polyfill":204,"./shim":205,"define-properties":123,"function-bind":183}],204:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":202}],205:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":204,"define-properties":123}],206:[function(require,module,exports){
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
},{"safe-buffer":201}],207:[function(require,module,exports){
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
},{"./lib/default_stream":208,"./lib/results":210,"./lib/test":211,"_process":198,"defined":124,"through":213,"timers":214}],208:[function(require,module,exports){
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
},{"_process":198,"fs":99,"through":213}],209:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":198,"timers":214}],210:[function(require,module,exports){
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
},{"_process":198,"events":101,"function-bind":183,"has":188,"inherits":190,"object-inspect":212,"resumer":200,"through":213,"timers":214}],211:[function(require,module,exports){
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
},{"./next_tick":209,"deep-equal":120,"defined":124,"events":101,"has":188,"inherits":190,"path":102,"string.prototype.trim":203}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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
},{"_process":198,"stream":103}],214:[function(require,module,exports){
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
},{"process/browser.js":198,"timers":214}],215:[function(require,module,exports){
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
},{}]},{},[45,46,47,48]);
