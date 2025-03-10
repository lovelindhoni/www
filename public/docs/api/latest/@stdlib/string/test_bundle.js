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

/**
* Test if a position in a string marks the start of a UTF-16 surrogate pair.
*
* @module @stdlib/assert/has-utf16-surrogate-pair-at
*
* @example
* var hasUTF16SurrogatePairAt = require( '@stdlib/assert/has-utf16-surrogate-pair-at' );
*
* var bool = hasUTF16SurrogatePairAt( '🌷', 0 );
* // returns true
*
* bool = hasUTF16SurrogatePairAt( '🌷', 1 );
* // returns false
*/

// MODULES //

var hasUTF16SurrogatePairAt = require( './main.js' );


// EXPORTS //

module.exports = hasUTF16SurrogatePairAt;

},{"./main.js":8}],8:[function(require,module,exports){
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

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// VARIABLES //

// Range for a high surrogate
var OxD800 = 0xD800|0; // 55296
var OxDBFF = 0xDBFF|0; // 56319

// Range for a low surrogate
var OxDC00 = 0xDC00|0; // 56320
var OxDFFF = 0xDFFF|0; // 57343


// MAIN //

/**
* Tests if a position in a string marks the start of a UTF-16 surrogate pair.
*
* @private
* @param {string} str - input string
* @param {NonNegativeInteger} pos - position in string
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {RangeError} position must be a valid index in string
* @returns {boolean} boolean indicating whether the string has a surrogate pair at a position
*
* @example
* var out = hasUTF16SurrogatePairAt( '🌷', 0 );
* // returns true
*
* @example
* var out = hasUTF16SurrogatePairAt( '🌷', 1 );
* // returns false
*/
function hasUTF16SurrogatePairAt( str, pos ) {
	var ch1;
	var ch2;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( pos ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a valid position (i.e., a nonnegative integer). Value: `%s`.', pos ) );
	}
	if ( pos >= str.length ) {
		throw new RangeError( format( 'invalid argument. Must provide a valid position (i.e., within string bounds). Value: `%u`.', pos ) );
	}
	ch1 = str.charCodeAt( pos );
	ch2 = str.charCodeAt( pos + 1 );
	return ch1 >= OxD800 && ch1 <= OxDBFF && ch2 >= OxDC00 && ch2 <= OxDFFF;
}


// EXPORTS //

module.exports = hasUTF16SurrogatePairAt;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],9:[function(require,module,exports){
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

var isArguments = require( './main.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Detects whether an environment returns the expected internal class of the `arguments` object.
*
* @private
* @returns {boolean} boolean indicating whether an environment behaves as expected
*
* @example
* var bool = detect();
* // returns <boolean>
*/
function detect() {
	return isArguments( arguments );
}


// MAIN //

bool = detect();


// EXPORTS //

module.exports = bool;

},{"./main.js":11}],10:[function(require,module,exports){
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
* Test if a value is an `arguments` object.
*
* @module @stdlib/assert/is-arguments
*
* @example
* var isArguments = require( '@stdlib/assert/is-arguments' );
*
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* bool = isArguments( [] );
* // returns false
*/

// MODULES //

var hasArgumentsClass = require( './detect.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var isArguments;
if ( hasArgumentsClass ) {
	isArguments = main;
} else {
	isArguments = polyfill;
}


// EXPORTS //

module.exports = isArguments;

},{"./detect.js":9,"./main.js":11,"./polyfill.js":12}],11:[function(require,module,exports){
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


// MAIN //

/**
* Tests whether a value is an `arguments` object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `arguments` object
*
* @example
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* @example
* var bool = isArguments( [] );
* // returns false
*/
function isArguments( value ) {
	return ( nativeClass( value ) === '[object Arguments]' );
}


// EXPORTS //

module.exports = isArguments;

},{"@stdlib/utils/native-class":258}],12:[function(require,module,exports){
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
var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/uint32/max' );


// MAIN //

/**
* Tests whether a value is an `arguments` object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `arguments` object
*
* @example
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* @example
* var bool = isArguments( [] );
* // returns false
*/
function isArguments( value ) {
	return (
		value !== null &&
		typeof value === 'object' &&
		!isArray( value ) &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH &&
		hasOwnProp( value, 'callee' ) &&
		!isEnumerableProperty( value, 'callee' )
	);
}


// EXPORTS //

module.exports = isArguments;

},{"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-array":13,"@stdlib/assert/is-enumerable-property":28,"@stdlib/constants/uint32/max":75,"@stdlib/math/base/assert/is-integer":78}],13:[function(require,module,exports){
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

},{"./main.js":14}],14:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":258}],15:[function(require,module,exports){
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

},{"./main.js":16,"./object.js":17,"./primitive.js":18,"@stdlib/utils/define-nonenumerable-read-only-property":217}],16:[function(require,module,exports){
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

},{"./object.js":17,"./primitive.js":18}],17:[function(require,module,exports){
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

},{"./try2serialize.js":20,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":258}],18:[function(require,module,exports){
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],20:[function(require,module,exports){
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

},{"./tostring.js":19}],21:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":52}],23:[function(require,module,exports){
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
* Test if a value is a collection.
*
* @module @stdlib/assert/is-collection
*
* @example
* var isCollection = require( '@stdlib/assert/is-collection' );
*
* var bool = isCollection( [] );
* // returns true
*
* bool = isCollection( {} );
* // returns false
*/

// MODULES //

var isCollection = require( './main.js' );


// EXPORTS //

module.exports = isCollection;

},{"./main.js":24}],24:[function(require,module,exports){
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

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/array/max-typed-array-length' );


// MAIN //

/**
* Tests if a value is a collection.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a collection
*
* @example
* var bool = isCollection( [] );
* // returns true
*
* @example
* var bool = isCollection( {} );
* // returns false
*/
function isCollection( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
}


// EXPORTS //

module.exports = isCollection;

},{"@stdlib/constants/array/max-typed-array-length":71,"@stdlib/math/base/assert/is-integer":78}],25:[function(require,module,exports){
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
* Test if a value is an empty array.
*
* @module @stdlib/assert/is-empty-array
*
* @example
* var isEmptyArray = require( '@stdlib/assert/is-empty-array' );
*
* var bool = isEmptyArray( [] );
* // returns true
*
* bool = isEmptyArray( [ 1, 2, 3 ] );
* // returns false
*
* bool = isEmptyArray( {} );
* // returns false
*/

// MODULES //

var isEmptyArray = require( './main.js' );


// EXPORTS //

module.exports = isEmptyArray;

},{"./main.js":26}],26:[function(require,module,exports){
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


// MAIN //

/**
* Tests if a value is an empty array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an empty array
*
* @example
* var bool = isEmptyArray( [] );
* // returns true
*
* @example
* var bool = isEmptyArray( [ 1, 2, 3 ] );
* // returns false
*
* @example
* var bool = isEmptyArray( {} );
* // returns false
*/
function isEmptyArray( value ) {
	return (
		isArray( value ) &&
		value.length === 0
	);
}


// EXPORTS //

module.exports = isEmptyArray;

},{"@stdlib/assert/is-array":13}],27:[function(require,module,exports){
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

var isEnum = require( './native.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Detects whether an environment has a bug where String indices are not detected as "enumerable" properties. Observed in Node v0.10.
*
* @private
* @returns {boolean} boolean indicating whether an environment has the bug
*/
function detect() {
	return !isEnum.call( 'beep', '0' );
}


// MAIN //

bool = detect();


// EXPORTS //

module.exports = bool;

},{"./native.js":30}],28:[function(require,module,exports){
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
* Test whether an object's own property is enumerable.
*
* @module @stdlib/assert/is-enumerable-property
*
* @example
* var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/

// MODULES //

var isEnumerableProperty = require( './main.js' );


// EXPORTS //

module.exports = isEnumerableProperty;

},{"./main.js":29}],29:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isEnum = require( './native.js' );
var hasStringEnumBug = require( './has_string_enumerability_bug.js' );


// MAIN //

/**
* Tests if an object's own property is enumerable.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object property is enumerable
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/
function isEnumerableProperty( value, property ) {
	var bool;
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	bool = isEnum.call( value, property );
	if ( !bool && hasStringEnumBug && isString( value ) ) {
		// Note: we only check for indices, as properties attached to a `String` object are properly detected as enumerable above.
		property = +property;
		return (
			!isnan( property ) &&
			isInteger( property ) &&
			property >= 0 &&
			property < value.length
		);
	}
	return bool;
}


// EXPORTS //

module.exports = isEnumerableProperty;

},{"./has_string_enumerability_bug.js":27,"./native.js":30,"@stdlib/assert/is-integer":33,"@stdlib/assert/is-nan":38,"@stdlib/assert/is-string":63}],30:[function(require,module,exports){
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
* Tests if an object's own property is enumerable.
*
* @private
* @name isEnumerableProperty
* @type {Function}
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object property is enumerable
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/
var isEnumerableProperty = Object.prototype.propertyIsEnumerable;


// EXPORTS //

module.exports = isEnumerableProperty;

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

},{"./main.js":32}],32:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":269}],33:[function(require,module,exports){
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

},{"./main.js":35,"./object.js":36,"./primitive.js":37,"@stdlib/utils/define-nonenumerable-read-only-property":217}],34:[function(require,module,exports){
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

},{"@stdlib/constants/float64/ninf":73,"@stdlib/constants/float64/pinf":74,"@stdlib/math/base/assert/is-integer":78}],35:[function(require,module,exports){
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

},{"./object.js":36,"./primitive.js":37}],36:[function(require,module,exports){
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

},{"./integer.js":34,"@stdlib/assert/is-number":46}],37:[function(require,module,exports){
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

},{"./integer.js":34,"@stdlib/assert/is-number":46}],38:[function(require,module,exports){
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
* Test if a value is `NaN`.
*
* @module @stdlib/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isnan = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./main.js":39,"./object.js":40,"./primitive.js":41,"@stdlib/utils/define-nonenumerable-read-only-property":217}],39:[function(require,module,exports){
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
* Tests if a value is `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isnan;

},{"./object.js":40,"./primitive.js":41}],40:[function(require,module,exports){
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
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a number object having a value of `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value of `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value.valueOf() )
	);
}


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":46,"@stdlib/math/base/assert/is-nan":80}],41:[function(require,module,exports){
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
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a `NaN` number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `NaN` number primitive
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns false
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value )
	);
}


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":46,"@stdlib/math/base/assert/is-nan":80}],42:[function(require,module,exports){
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
* Test if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNonNegativeInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./main.js":43,"./object.js":44,"./primitive.js":45,"@stdlib/utils/define-nonenumerable-read-only-property":217}],43:[function(require,module,exports){
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
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":44,"./primitive.js":45}],44:[function(require,module,exports){
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

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":33}],45:[function(require,module,exports){
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


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":33}],46:[function(require,module,exports){
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

},{"./main.js":47,"./object.js":48,"./primitive.js":49,"@stdlib/utils/define-nonenumerable-read-only-property":217}],47:[function(require,module,exports){
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

},{"./object.js":48,"./primitive.js":49}],48:[function(require,module,exports){
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

},{"./try2serialize.js":51,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/number/ctor":95,"@stdlib/utils/native-class":258}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"@stdlib/number/ctor":95}],51:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./tostring.js":50,"dup":20}],52:[function(require,module,exports){
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

},{"./main.js":53,"@stdlib/assert/tools/array-function":70,"@stdlib/utils/define-nonenumerable-read-only-property":217}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './main.js' );


// EXPORTS //

module.exports = isObject;

},{"./main.js":55}],55:[function(require,module,exports){
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


// MAIN //

/**
* Tests if a value is an object; e.g., `{}`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
}


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":13}],56:[function(require,module,exports){
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
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var isPlainObject = require( './main.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./main.js":57}],57:[function(require,module,exports){
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

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
}


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
}


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-function":31,"@stdlib/assert/is-object":54,"@stdlib/utils/get-prototype-of":230,"@stdlib/utils/native-class":258}],58:[function(require,module,exports){
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

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],59:[function(require,module,exports){
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
* Test if a value is a regular expression.
*
* @module @stdlib/assert/is-regexp
*
* @example
* var isRegExp = require( '@stdlib/assert/is-regexp' );
*
* var bool = isRegExp( /\.+/ );
* // returns true
*
* bool = isRegExp( {} );
* // returns false
*/

// MODULES //

var isRegExp = require( './main.js' );


// EXPORTS //

module.exports = isRegExp;

},{"./main.js":60}],60:[function(require,module,exports){
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
var test = require( './try2exec.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a regular expression.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a regular expression
*
* @example
* var bool = isRegExp( /\.+/ );
* // returns true
*
* @example
* var bool = isRegExp( {} );
* // returns false
*/
function isRegExp( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof RegExp ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object RegExp]' );
	}
	return false;
}


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":61,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":258}],61:[function(require,module,exports){
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

var exec = require( './exec.js' );


// MAIN //

/**
* Attempts to call a `RegExp` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `RegExp` method
*/
function test( value ) {
	try {
		exec.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./exec.js":58}],62:[function(require,module,exports){
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
* Test if a value is an array of strings.
*
* @module @stdlib/assert/is-string-array
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' );
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', 123 ] );
* // returns false
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', new String( 'def' ) ] );
* // returns false
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' ).objects;
*
* var bool = isStringArray( [ new String( 'abc' ), new String( 'def' ) ] );
* // returns true
*
* bool = isStringArray( [ new String( 'abc' ), 'def' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isString = require( '@stdlib/assert/is-string' );


// MAIN //

var isStringArray = arrayfun( isString );
setReadOnly( isStringArray, 'primitives', arrayfun( isString.isPrimitive ) );
setReadOnly( isStringArray, 'objects', arrayfun( isString.isObject ) );


// EXPORTS //

module.exports = isStringArray;

},{"@stdlib/assert/is-string":63,"@stdlib/assert/tools/array-function":70,"@stdlib/utils/define-nonenumerable-read-only-property":217}],63:[function(require,module,exports){
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

},{"./main.js":64,"./object.js":65,"./primitive.js":66,"@stdlib/utils/define-nonenumerable-read-only-property":217}],64:[function(require,module,exports){
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

},{"./object.js":65,"./primitive.js":66}],65:[function(require,module,exports){
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

},{"./try2valueof.js":67,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":258}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./valueof.js":68}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":13,"@stdlib/string/format":130}],70:[function(require,module,exports){
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

},{"./arrayfcn.js":69}],71:[function(require,module,exports){
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
* Maximum length of a typed array.
*
* @module @stdlib/constants/array/max-typed-array-length
*
* @example
* var MAX_TYPED_ARRAY_LENGTH = require( '@stdlib/constants/array/max-typed-array-length' );
* // returns 9007199254740991
*/

// MAIN //

/**
* Maximum length of a typed array.
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
*/
var MAX_TYPED_ARRAY_LENGTH = 9007199254740991;


// EXPORTS //

module.exports = MAX_TYPED_ARRAY_LENGTH;

},{}],72:[function(require,module,exports){
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
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/float64/max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* Maximum safe double-precision floating-point integer.
*
* ## Notes
*
* The integer has the value
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_SAFE_INTEGER = 9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MAX_SAFE_INTEGER;

},{}],73:[function(require,module,exports){
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

},{"@stdlib/number/ctor":95}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/uint32/max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],76:[function(require,module,exports){
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
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @module @stdlib/constants/unicode/max-bmp
* @type {integer32}
*
* @example
* var UNICODE_MAX_BMP = require( '@stdlib/constants/unicode/max-bmp' );
* // returns 65535
*/


// MAIN //

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @constant
* @type {integer32}
* @default 65535
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
*/
var UNICODE_MAX_BMP = 0xFFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX_BMP;

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

/**
* Maximum Unicode code point.
*
* @module @stdlib/constants/unicode/max
* @type {integer32}
*
* @example
* var UNICODE_MAX = require( '@stdlib/constants/unicode/max' );
* // returns 1114111
*/


// MAIN //

/**
* Maximum Unicode code point.
*
* @constant
* @type {integer32}
* @default 1114111
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
*/
var UNICODE_MAX = 0x10FFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX;

},{}],78:[function(require,module,exports){
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

},{"./is_integer.js":79}],79:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":86}],80:[function(require,module,exports){
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
* Test if a double-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var isnan = require( './main.js' );


// EXPORTS //

module.exports = isnan;

},{"./main.js":81}],81:[function(require,module,exports){
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
* Tests if a double-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;

},{}],82:[function(require,module,exports){
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
* Compute an absolute value of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var abs = require( './main.js' );


// EXPORTS //

module.exports = abs;

},{"./main.js":83}],83:[function(require,module,exports){
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
* Computes the absolute value of a double-precision floating-point number `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	return Math.abs( x ); // eslint-disable-line stdlib/no-builtin-math
}


// EXPORTS //

module.exports = abs;

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

/**
* Round a double-precision floating-point number toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './main.js' );


// EXPORTS //

module.exports = ceil;

},{"./main.js":85}],85:[function(require,module,exports){
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
* Rounds a double-precision floating-point number toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = ceil;

},{}],86:[function(require,module,exports){
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

},{"./main.js":87}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":89}],89:[function(require,module,exports){
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

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = round;

},{}],90:[function(require,module,exports){
module.exports={
    "i.e.": ["i.e."],
    "I.e.": ["I.e."],
    "I.E.": ["I.E."],
    "e.g.": ["e.g."],
    "E.g.": ["E.g."],
    "E.G.": ["E.G."],
    "et al.": ["et al."],
    "etc.": ["etc."],
    "vs.": ["vs."],
    "A.S.A.P": ["A.S.A.P"],
    "E.T.A.": ["E.T.A."],
    "D.I.Y": ["D.I.Y"],
    "R.S.V.P": ["R.S.V.P"],
    "P.S.": ["P.S."],
    "B.Y.O.B": ["B.Y.O.B"],
    "Ms.": ["Ms."],
    "Mr.": ["Mr."],
    "Dr.": ["Dr."],
    "Prof.": ["Prof."],
    "Mrs.": ["Mrs."],
    "Messrs.": ["Messrs."],
    "Gov.": ["Gov."],
    "Gen.": ["Gen."],
    "Lt.": ["Lt."],
    "Col.":["Col."],
    "Mt.": ["Mt."],
    "Bros.": ["Bros."],
    "Corp.": ["Corp."],
    "Co.": ["Co."],
    "co.": ["co."],
    "Inc.": ["Inc."],
    "Ltd.": ["Ltd."],
    "Rep.": ["Rep."],
    "Sen.": ["Sen."],
    "Jr.": ["Jr."],
    "Sr.": ["Sr."],
    "Ph.D.": ["Ph.D."],
    "J.D.": ["J.D."],
    "M.D.": ["M.D."],
    "Rev.": ["Rev."],
    "Adm.": ["Adm."],
    "St.": ["St."],
    "a.m.": ["a.m."],
    "p.m.": ["p.m."],
    "b.c.": ["b.c."],
    "B.C.": ["B.C."],
    "a.d.": ["a.d."],
    "A.D.": ["A.D."],
    "b.c.e.": ["b.c.e."],
    "B.C.E.": ["B.C.E."],
    "Jan.": ["Jan."],
    "Feb.": ["Feb."],
    "Mar.": ["Mar."],
    "Apr.": ["Apr."],
    "May.": ["May."],
    "Jun.": ["Jun."],
    "Jul.": ["Jul."],
    "Aug.": ["Aug."],
    "Sep.": ["Sep."],
    "Sept.": ["Sept."],
    "Oct.": ["Oct."],
    "Nov.": ["Nov."],
    "Dec.": ["Dec."],
    "Ala.": ["Ala."],
    "Ariz.": ["Ariz."],
    "Ark.": [ "Ark."],
    "Calif.": ["Calif."],
    "Colo.": ["Colo."],
    "Conn.": ["Conn."],
    "Del.": [ "Del."],
    "D.C.": ["D.C."],
    "Fla.": [ "Fla."],
    "Ga.": ["Ga."],
    "Ill.": ["Ill."],
    "Ind.": ["Ind."],
    "Kans.": ["Kans."],
    "Kan.": ["Kan."],
    "Ky.": ["Ky."],
    "La.": ["La."],
    "Md.": ["Md."],
    "Mass.": ["Mass."],
    "Mich.": ["Mich."],
    "Minn.": ["Minn."],
    "Miss.": ["Miss."],
    "Mo.": ["Mo."],
    "Mont.": ["Mont."],
    "Nebr.": ["Nebr."],
    "Neb.": ["Neb."],
    "Nev.": [ "Nev."],
    "N.H.": ["N.H."],
    "N.J.": ["N.J."],
    "N.M.": ["N.M."],
    "N.Y.": ["N.Y."],
    "N.C.": ["N.C."],
    "N.D.": ["N.D."],
    "Okla.": ["Okla."],
    "Ore.": ["Ore."],
    "Pa.": ["Pa."],
    "Tenn.": ["Tenn."],
    "Va.": ["Va."],
    "Wash.": ["Wash."],
    "Wis.": ["Wis."]
}

},{}],91:[function(require,module,exports){
module.exports={
    "'s": ["'s"],
    "'S": ["'S"],
    "ain't": ["ai", "n't"],
    "aint": ["ai", "nt"],
    "Ain't": ["Ai", "n't"],
    "aren't": ["are", "n't"],
    "arent": ["are", "nt"],
    "Aren't": ["Are", "n't"],
    "can't": ["ca", "n't"],
    "cant": ["ca", "nt"],
    "Can't": ["Ca", "n't"],
    "can't've": ["ca", "n't", "'ve"],
    "'cause": ["'cause'"],
    "cannot": ["can", "not"],
    "Cannot": ["Can", "not"],
    "could've": ["could", "'ve"],
    "couldve": ["could", "ve"],
    "Could've": ["Could", "'ve"],
    "couldn't": ["could", "n't"],
    "couldnt": ["could", "nt"],
    "Couldn't": ["Could", "n't"],
    "couldn't've": ["could", "n't", "'ve"],
    "couldntve": ["could", "nt", "ve"],
    "Couldn't've": ["Could", "n't", "'ve"],
    "didn't": ["did", "n't"],
    "didnt": ["did", "nt"],
    "Didn't": ["Did", "n't"],
    "doesn't": ["does", "n't"],
    "doesnt": ["does", "nt"],
    "Doesn't": ["Does", "n't"],
    "don't": ["do", "n't"],
    "dont": ["do", "nt"],
    "Don't": ["Do", "n't"],
    "hadn't": ["had", "n't"],
    "hadnt": ["had", "nt"],
    "Hadn't": ["Had", "n't"],
    "hadn't've": ["had", "n't", "'ve"],
    "hasn't": ["has", "n't"],
    "hasnt": ["has", "nt"],
    "haven't": ["have", "n't"],
    "havent": ["have", "nt"],
    "he'd": ["he", "'d"],
    "hed": ["he", "d"],
    "he'd've": ["he", "'d", "'ve"],
    "hedve": ["he", "d", "ve"],
    "he'll": ["he", "'ll"],
    "he'll've": ["he", "'ll", "'ve"],
    "he's": ["he", "'s"],
    "hes": ["he", "s"],
    "how'd": ["how", "'d"],
    "howd": ["how", "d"],
    "how'd'y": [ "how", "'d", "'y" ],
    "how'll": ["how", "'ll"],
    "howll": ["how", "ll"],
    "how's": ["how", "'s"],
    "hows": ["how", "s"],
    "I'd": ["I", "'d"],
    "I'd've": ["I", "'d", "'ve"],
    "I'll": ["I", "'ll"],
    "i'll": ["i", "'ll"],
    "I'll've": ["I", "'ll", "'ve"],
    "i'll've": ["i", "'ll", "'ve"],
    "I'm": ["I", "'m"],
    "i'm": ["i", "'m"],
    "Im": ["I", "m"],
    "im": ["i", "m"],
    "I'ma": ["I", "'ma"],
    "i'ma": ["i", "'ma"],
    "I've": ["I", "'ve"],
    "i've": ["i", "'ve"],
    "isn't": ["is", "n't"],
    "isnt": ["is", "nt"],
    "Isn't": ["Is", "n't"],
    "It'd": ["It", "'d"],
    "it'd": ["it", "'d"],
    "it'd've": ["it", "'d", "'ve"],
    "it'll've": ["it", "'ll", "'ve"],
    "it'll": ["it", "'ll"],
    "itll": ["it", "ll"],
    "it's": ["it", "'s"],
    "let's": ["let", "'s"],
    "lets": ["let", "s"],
    "ma'am": ["ma'am"],
    "mayn't": ["may", "n't"],
    "mightn't": ["might", "n't"],
    "mightn't've": ["might", "n't", "'ve"],
    "might've": ["might", "'ve"],
    "mustn't": ["must", "n't"],
    "mustn't've": ["must", "n't","'ve"],
    "must've": ["must", "'ve"],
    "needn't": ["need", "n't"],
    "needn't've": ["need", "n't", "'ve"],
    "not've": ["not", "'ve"],
    "o'clock": ["o'clock"],
    "oughtn't": ["ought", "n't"],
    "oughtn't've": ["ought", "n't", "'ve"],
    "so've": ["so", "'ve"],
    "so's": ["so", "'s"],
    "shan't": ["sha", "n't"],
    "sha'n't": ["sha'", "n't"],
    "shan't've": ["sha", "n't", "'ve"],
    "she'd": ["she", "'d"],
    "she'd've": ["she", "'d", "'ve"],
    "she'll": ["she", "'ll"],
    "she'll've": ["she", "'ll", "'ve"],
    "she's": ["she", "'s"],
    "should've": ["should", "'ve"],
    "shouldn't": ["should", "n't"],
    "shouldn't've": ["should", "n't", "'ve"],
    "that'd": ["that", "'d"],
    "that'd've": ["that", "'d", "'ve"],
    "that's": ["that", "'s"],
    "thats": ["that", "s"],
    "there'd": ["there", "'d"],
    "there'd've": ["there", "'d", "'ve"],
    "there's": ["there", "'s"],
    "they'd": ["they", "'d"],
    "They'd": ["They", "'d"],
    "they'd've": ["they", "'d", "'ve"],
    "They'd've": ["They", "'d", "'ve"],
    "they'll": ["they", "'ll"],
    "They'll": ["They", "'ll"],
    "they'll've": ["they", "'ll", "'ve"],
    "They'll've": ["They", "'ll", "'ve"],
    "they're": ["they", "'re"],
    "They're": ["They", "'re"],
    "they've": ["they", "'ve"],
    "They've": ["They", "'ve"],
    "to've": ["to", "'ve"],
    "wasn't": ["was", "n't"],
    "we'd": ["we", "'d"],
    "We'd": ["We", "'d"],
    "we'd've": ["we", "'d", "'ve"],
    "we'll": ["we", "'ll"],
    "We'll": ["We", "'ll"],
    "we'll've": ["we", "'ll", "'ve"],
    "We'll've": ["We", "'ll", "'ve"],
    "we're": ["we", "'re"],
    "We're": ["We", "'re"],
    "we've": ["we", "'ve"],
    "We've": ["We", "'ve"],
    "weren't": ["were", "n't"],
    "what'll": ["what", "'ll"],
    "what'll've": ["what", "'ll", "'ve"],
    "what're": ["what", "'re"],
    "what's": ["what", "'s"],
    "what've": ["what", "'ve"],
    "when's": ["when", "'s"],
    "when've": ["when", "'ve"],
    "where'd": ["where", "'d"],
    "where's": ["where", "'s"],
    "where've": ["where", "'ve"],
    "who'd": ["who", "'d"],
    "who'll": ["who", "'ll"],
    "who'll've": ["who", "'ll'", "'ve'"],
    "who're": ["who", "'re"],
    "who's": ["who", "'s"],
    "who've": ["who", "'ve"],
    "why've": ["why", "'ve"],
    "why'll": ["why", "'ll"],
    "why're": ["why", "'re"],
    "why's": ["why", "'s"],
    "will've": ["will", "'ve"],
    "won't": ["wo", "n't"],
    "wont": ["wo", "nt"],
    "won't've": ["wo", "n't", "'ve"],
    "would've": ["would", "'ve"],
    "wouldn't": ["would", "n't"],
    "wouldn't've": ["would", "n't", "'ve"],
    "y'all": ["y'", "all"],
    "y'all'd": ["y'", "all", "'d"],
    "y'all'd've": ["y'","all", "'d", "'ve"],
    "y'all're": [ "y'", "all", "'re'"],
    "y'all've": [ "y'", "all", "ve"],
    "you'd": ["you", "'d"],
    "You'd": ["You", "'d"],
    "you'd've": ["you", "'d", "'ve"],
    "You'd've": ["You", "'d", "'ve"],
    "you'll": ["you", "'ll"],
    "You'll": ["You", "'ll"],
    "you'll've": ["you", "'ll", "'ve"],
    "You'll've": ["You", "'ll", "'ve"],
    "you're": ["you", "'re"],
    "You're": ["You", "'re"],
    "you've": ["you", "'ve"],
    "You've": ["You", "'ve"]
}

},{}],92:[function(require,module,exports){
module.exports={
    "^_^": ["^_^"],
    "=D": ["=D"],
    ";-p": [";-p"],
    ":O": [":O"],
    ":-/": [":-/"],
    "xD": ["xD"],
    "V_V": ["V_V"],
    ";(": [";("],
    "(:": ["(:"],
    "\")": ["\")"],
    ":Y": [":Y"],
    ":]": [":]"],
    ":3": [":3"],
    ":(": [":("],
    ":-)": [":-)"],
    "=3": ["=3"],
    ":))": [":))"],
    ":>": [":>"],
    ";p": [";p"],
    ":p": [":p"],
    "=[[": ["=[["],
    "xDD": ["xDD"],
    "<333": ["<333"],
    "<33": ["<33"],
    ":P": [":P"],
    "o.O": ["o.O"],
    "<3": ["<3"],
    ";-)": [";-)"],
    ":)": [":)"],
    "-_-": ["-_-"],
    ":')": [":')"],
    "o_O": ["o_O"],
    ";)": [";)"],
    "=]": ["=]"],
    "(=": ["(="],
    "-__-": ["-__-"],
    ":/": [":/"],
    ":0": [":0"],
    "(^_^)": ["(^_^)"],
    ";D": [";D"],
    "o_o": ["o_o"],
    ":((": [":(("],
    "=)": ["=)"]
}

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

/**
* Tokenize a string.
*
* @module @stdlib/nlp/tokenize
*
* @example
* var tokenize = require( '@stdlib/nlp/tokenize' );
*
* var str = 'Hello Mrs. Maple, could you call me back?';
* var out = tokenize( str );
* // returns [ 'Hello', 'Mrs.', 'Maple', ',', 'could', 'you', 'call', 'me', 'back', '?' ]
*
* str = 'Hello World!';
* out = tokenize( str );
* // returns [ 'Hello', 'World', '!' ]
*/

// MODULES //

var tokenize = require( './tokenize.js' );


// EXPORTS //

module.exports = tokenize;

},{"./tokenize.js":94}],94:[function(require,module,exports){
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
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var format = require( '@stdlib/string/format' );
var ABBRS = require( './abbreviations.json' );
var EMOJIS = require( './emojis.json' );
var CONTRACT = require( './contractions.json' );


// VARIABLES //

var REGEXP_PREFIXES = /^([,([{*<"“'`‘.])/gi;
var REGEXP_SUFFIXES = /([,.!?%*>:;"'”`)\]}])$/gi;


// FUNCTIONS //

/**
* Extends an array by the elements of another array.
*
* @private
* @param {Array} arr - input array
* @param {Array} ext - array to extend `arr` with
* @returns {Array} mutated input array
*
* @example
* var arr = [ 1, 2, 3 ];
* var out = extend( arr, [ 4, 5 ] );
* // returns [ 1, 2, 3, 4, 5 ]
*/
function extend( arr, ext ) {
	var i;
	for ( i = 0; i < ext.length; i++ ) {
		arr.push( ext[ i ] );
	}
	return arr;
}

/**
* Tokenizes a substring.
*
* @private
* @param {string} substr - input string
* @returns {Array} token array
*
* @example
* var str = '(never)';
* var out = tokenizeSubstring( str );
* // returns [ '(', 'never', ')' ]
*/
function tokenizeSubstring( substr ) {
	var prefixes = [];
	var suffixes = [];
	var match;
	var done;
	var res;

	do {
		if (
			!EMOJIS[ substr ] &&
			!ABBRS[ substr ] &&
			!CONTRACT[ substr ]
		) {
			match = substr.split( REGEXP_PREFIXES );
			if ( match.length > 1 ) {
				prefixes.push( match[ 1 ] );
				substr = match[ 2 ];
			}
			else {
				match = substr.split( REGEXP_SUFFIXES );
				if ( match.length > 1 ) {
					substr = match[ 0 ];
					suffixes.push( match[ 1 ] );
				} else {
					done = true;
				}
			}
		}
		else {
			done = true;
		}
	} while ( !done );

	res = prefixes;
	res.push( substr );
	extend( res, suffixes );
	return res;
}


// MAIN //

/**
* Tokenize a string.
*
* @param {string} str - input string
* @param {boolean} [keepWhitespace=false] - boolean indicating whether whitespace characters should be returned as part of the token array
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a boolean
* @returns {Array} array of tokens
*
* @example
* var str = 'Hello World!';
* var out = tokenize( str );
* // returns [ 'Hello', 'World', '!' ]
*
* @example
* var str = '';
* var out = tokenize( str );
* // returns []
*
* @example
* var str = 'Hello Mrs. Maple, could you call me back?';
* var out = tokenize( str );
* // returns [ 'Hello', 'Mrs.', 'Maple', ',', 'could', 'you', 'call', 'me', 'back', '?' ]
*/
function tokenize( str, keepWhitespace ) {
	var subtkns;
	var substrs;
	var tokens;
	var substr;
	var cache;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isBoolean( keepWhitespace ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a boolean. Value: `%s`.', keepWhitespace ) );
		}
	}
	if ( !str ) {
		return [];
	}

	// Split on whitespace:
	if ( keepWhitespace ) {
		substrs = str.split( /(\s+)/ );
	} else {
		substrs = str.split( /\s+/ );
	}

	// Set up cache to hold tokens for substring matches:
	cache = {};

	// Initialize token array:
	tokens = [];

	for ( i = 0; i < substrs.length; i++ ) {
		substr = substrs[ i ];
		if ( hasOwnProp( cache, substr ) ) {
			extend( tokens, cache[ substr ] );
		}
		else {
			subtkns = tokenizeSubstring( substr );
			extend( tokens, subtkns );
			cache[ substr ] = subtkns;
		}
	}
	return tokens;
}


// EXPORTS //

module.exports = tokenize;

},{"./abbreviations.json":90,"./contractions.json":91,"./emojis.json":92,"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-boolean":15,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],95:[function(require,module,exports){
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

},{"./number.js":96}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"./main.js":98,"./regexp.js":99,"@stdlib/utils/define-nonenumerable-read-only-property":217}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./main.js":98}],100:[function(require,module,exports){
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
* Return a regular expression to match a white space character.
*
* @module @stdlib/regexp/whitespace
*
* @example
* var reWhitespace = require( '@stdlib/regexp/whitespace' );
*
* var RE_WHITESPACE = reWhitespace();
*
* var bool = RE_WHITESPACE.test( ' ' );
* // returns true
*
* @example
* var reWhitespace = require( '@stdlib/regexp/whitespace' );
*
* var RE_WHITESPACE = reWhitespace({
*     'flags': 'gm'
* });
*
* var bool = RE_WHITESPACE.test( '\t' );
* // returns true
*
* @example
* var RE_WHITESPACE = require( '@stdlib/regexp/whitespace' ).REGEXP;
*
* var bool = RE_WHITESPACE.test( 'a' );
* // returns false
*
* @example
* var RE_WHITESPACE = require( '@stdlib/regexp/whitespace' ).REGEXP_CAPTURE;
* var replace = require( '@stdlib/string/replace' );
*
* var str = 'Duplicate capture';
* var out = replace( str, RE_WHITESPACE, '$1$1' );
* // returns 'Duplicate  capture'
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var reWhitespace = require( './main.js' );
var REGEXP_CAPTURE = require( './regexp_capture.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reWhitespace, 'REGEXP', REGEXP );
setReadOnly( reWhitespace, 'REGEXP_CAPTURE', REGEXP_CAPTURE );


// EXPORTS //

module.exports = reWhitespace;

},{"./main.js":101,"./regexp.js":102,"./regexp_capture.js":103,"@stdlib/utils/define-nonenumerable-read-only-property":217}],101:[function(require,module,exports){
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

var validate = require( './validate.js' );


// VARIABLES //

var REGEXP_STRING = '[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]';


// MAIN //

/**
* Returns a regular expression to match a white space character.
*
* @param {Options} [options] - function options
* @param {string} [options.flags=''] - regular expression flags
* @param {boolean} [options.capture=false] - boolean indicating whether to wrap a regular expression matching white space characters with a capture group
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {RegExp} regular expression
*
* @example
* var RE_WHITESPACE = reWhitespace();
*
* var bool = RE_WHITESPACE.test( ' ' );
* // returns true
*
* bool = RE_WHITESPACE.test( '\t' );
* // returns true
*
* @example
* var replace = require( '@stdlib/string/replace' );
* var RE_WHITESPACE = reWhitespace({
*     'capture': true
* });
*
* var str = 'Duplicate capture';
* var out = replace( str, RE_WHITESPACE, '$1$1' );
* // returns 'Duplicate  capture'
*/
function reWhitespace( options ) {
	var opts;
	var err;
	if ( arguments.length > 0 ) {
		opts = {};
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
		if ( opts.capture ) {
			return new RegExp( '('+REGEXP_STRING+')', opts.flags );
		}
		return new RegExp( REGEXP_STRING, opts.flags );
	}
	return /[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/; // eslint-disable-line no-control-regex
}


// EXPORTS //

module.exports = reWhitespace;

},{"./validate.js":104}],102:[function(require,module,exports){
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

var reWhitespace = require( './main.js' );


// MAIN //

/**
* Matches a white space character.
*
* Regular expression: `/[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/`
*
* -   `[]`
*     -   match any one of the listed characters
*
* -   `\u0009`
*     -   character tabulation (horizontal tab; `\t`)
*
* -   `\u000A`
*     -   line feed (LF; `\n`)
*
* -   `\u000B`
*     -   line tabulation (vertical tab; `\v`)
*
* -   `\u000C`
*     -   form feed (`\f`)
*
* -   `\u000D`
*     -   carriage return (CR; `\r`)
*
* -   `\u0020`
*     -   space (most common)
*
* -   `\u0085`
*     -   next line (NEL)
*
* -   `\u00A0`
*     -   non-breaking space
*
* -   `\u1680`
*     -   Ogham space mark
*
* -   `\u2000`
*     -   en quad
*
* -   `\u2001`
*     -   em quad
*
* -   `\u2002`
*     -   en space
*
* -   `\u2003`
*     -   em space
*
* -   `\u2004`
*
*     -   three-per-em space (thick space)
*
* -   `\u2005`
*     -   four-per-em space (mid space)
*
* -   `\u2006`
*     -   six-per-em space
*
* -   `\u2007`
*     -   figure space
*
* -   `\u2008`
*     -   punctuation space
*
* -   `\u2009`
*     -   thin space
*
* -   `\u200A`
*     -   hair space
*
* -   `\u2028`
*     -   line separator
*
* -   `\u2029`
*     -   paragraph separator
*
* -   `\u202F`
*     -   narrow no-break space
*
* -   `\u205F`
*     -   medium mathematical space
*
* -   `\u3000`
*     -   ideographic space
*
* -   `\uFEFF`
*     -   zero width non-breaking space
*
* ## Notes
*
* -   Matches the 25 characters defined as white space ("WSpace=Y","WS") characters in the Unicode 9.0 character database.
* -   Matches one related white space character without the Unicode character property "WSpace=Y" (zero width non-breaking space which was deprecated as of Unicode 3.2).
*
* @constant
* @type {RegExp}
* @default /[\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/
* @see [whitespace]{@link https://en.wikipedia.org/wiki/Whitespace_character}
*/
var REGEXP = reWhitespace();


// EXPORTS //

module.exports = REGEXP;

},{"./main.js":101}],103:[function(require,module,exports){
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

var reWhitespace = require( './main.js' );


// MAIN //

/**
* Matches a white space character.
*
* Regular expression: `/([\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/`
*
* -   `()`
*     -   create a capture group
*
* -   `[]`
*     -   match any one of the listed characters
*
* -   `\u0009`
*     -   character tabulation (horizontal tab; `\t`)
*
* -   `\u000A`
*     -   line feed (LF; `\n`)
*
* -   `\u000B`
*     -   line tabulation (vertical tab; `\v`)
*
* -   `\u000C`
*     -   form feed (`\f`)
*
* -   `\u000D`
*     -   carriage return (CR; `\r`)
*
* -   `\u0020`
*     -   space (most common)
*
* -   `\u0085`
*     -   next line (NEL)
*
* -   `\u00A0`
*     -   non-breaking space
*
* -   `\u1680`
*     -   Ogham space mark
*
* -   `\u2000`
*     -   en quad
*
* -   `\u2001`
*     -   em quad
*
* -   `\u2002`
*     -   en space
*
* -   `\u2003`
*     -   em space
*
* -   `\u2004`
*
*     -   three-per-em space (thick space)
*
* -   `\u2005`
*     -   four-per-em space (mid space)
*
* -   `\u2006`
*     -   six-per-em space
*
* -   `\u2007`
*     -   figure space
*
* -   `\u2008`
*     -   punctuation space
*
* -   `\u2009`
*     -   thin space
*
* -   `\u200A`
*     -   hair space
*
* -   `\u2028`
*     -   line separator
*
* -   `\u2029`
*     -   paragraph separator
*
* -   `\u202F`
*     -   narrow no-break space
*
* -   `\u205F`
*     -   medium mathematical space
*
* -   `\u3000`
*     -   ideographic space
*
* -   `\uFEFF`
*     -   zero width non-breaking space
*
* ## Notes
*
* -   Matches the 25 characters defined as white space ("WSpace=Y","WS") characters in the Unicode 9.0 character database.
* -   Matches one related white space character without the Unicode character property "WSpace=Y" (zero width non-breaking space which was deprecated as of Unicode 3.2).
*
* @constant
* @type {RegExp}
* @default /([\u0009\u000A\u000B\u000C\u000D\u0020\u0085\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/
* @see [whitespace]{@link https://en.wikipedia.org/wiki/Whitespace_character}
*/
var REGEXP_CAPTURE = reWhitespace({
	'capture': true
});


// EXPORTS //

module.exports = REGEXP_CAPTURE;

},{"./main.js":101}],104:[function(require,module,exports){
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

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {string} [options.flags] - regular expression flags
* @param {boolean} [options.capture] - boolean indicating whether to wrap a regular expression matching white space characters with a capture group
* @returns {(Error|null)} null or an error object
*
* @example
* var opts = {};
* var options = {
*     'flags': 'gm'
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
	}
	if ( hasOwnProp( options, 'flags' ) ) {
		opts.flags = options.flags;
		if ( !isString( opts.flags ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a string. Option: `%s`.', 'flags', opts.flags ) );
		}
	}
	if ( hasOwnProp( options, 'capture' ) ) {
		opts.capture = options.capture;
		if ( !isBoolean( opts.capture ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a boolean. Option: `%s`.', 'capture', opts.capture ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-boolean":15,"@stdlib/assert/is-plain-object":56,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],105:[function(require,module,exports){
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
* Generate an acronym for a given string.
*
* @module @stdlib/string/acronym
*
* @example
* var acronym = require( '@stdlib/string/acronym' );
*
* var out = acronym( 'National Association of Securities Dealers Automated Quotation' );
* // returns 'NASDAQ'
*
* out = acronym( 'To be determined...', {
*     'stopwords': []
* });
* // returns 'TBD'
*/

// MODULES //

var acronym = require( './main.js' );


// EXPORTS //

module.exports = acronym;

},{"./main.js":106}],106:[function(require,module,exports){
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

var removePunctuation = require( '@stdlib/string/remove-punctuation' );
var tokenize = require( '@stdlib/nlp/tokenize' );
var replace = require( '@stdlib/string/replace' );
var uppercase = require( '@stdlib/string/uppercase' );
var lowercase = require( '@stdlib/string/lowercase' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var validate = require( './validate.js' );
var STOPWORDS = require( './stopwords.json' );


// VARIABLES //

var RE_HYPHEN = /-/g;


// MAIN //

/**
* Generates an acronym for a given string.
*
* ## Notes
*
* -   The acronym is generated by capitalizing the first letter of each word in the string.
* -   The function removes stop words from the string before generating the acronym.
* -   The function splits hyphenated words and uses the first character of each hyphenated part.
*
* @param {string} str - input string
* @param {Options} [options] - function options
* @param {StringArray} [options.stopwords] - custom stop words
* @throws {TypeError} must provide a string primitive
* @throws {TypeError} must provide valid options
* @returns {string} generated acronym
*
* @example
* var out = acronym( 'the quick brown fox' );
* // returns 'QBF'
*
* @example
* var out = acronym( 'Hard-boiled eggs' );
* // returns 'HBE'
*
* @example
* var out = acronym( 'National Association of Securities Dealers Automated Quotation' );
* // returns 'NASDAQ'
*/
function acronym( str, options ) {
	var stopwords;
	var words;
	var opts;
	var err;
	var out;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	opts = {};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	stopwords = opts.stopwords || STOPWORDS;
	str = removePunctuation( str );
	str = replace( str, RE_HYPHEN, ' ' );
	words = tokenize( str );
	out = '';
	for ( i = 0; i < words.length; i++ ) {
		if ( stopwords.indexOf( lowercase( words[ i ] ) ) === -1 ) {
			out += uppercase( words[ i ].charAt( 0 ) );
		}
	}
	return out;
}


// EXPORTS //

module.exports = acronym;

},{"./stopwords.json":107,"./validate.js":108,"@stdlib/assert/is-string":63,"@stdlib/nlp/tokenize":93,"@stdlib/string/format":130,"@stdlib/string/lowercase":144,"@stdlib/string/remove-punctuation":163,"@stdlib/string/replace":171,"@stdlib/string/uppercase":211}],107:[function(require,module,exports){
module.exports=[
    "a",
    "all",
    "also",
    "although",
    "an",
    "and",
    "any",
    "are",
    "as",
    "at",
    "b",
    "be",
    "been",
    "but",
    "by",
    "c",
    "could",
    "d",
    "e",
    "each",
    "eg",
    "either",
    "even",
    "ever",
    "ex",
    "except",
    "f",
    "far",
    "few",
    "for",
    "from",
    "further",
    "g",
    "get",
    "gets",
    "given",
    "gives",
    "go",
    "going",
    "got",
    "h",
    "had",
    "has",
    "have",
    "having",
    "he",
    "her",
    "here",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "i",
    "ie",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "itself",
    "j",
    "just",
    "k",
    "l",
    "less",
    "let",
    "m",
    "many",
    "may",
    "me",
    "might",
    "must",
    "my",
    "myself",
    "n",
    "need",
    "needs",
    "next",
    "no",
    "non",
    "not",
    "now",
    "o",
    "of",
    "off",
    "old",
    "on",
    "once",
    "only",
    "or",
    "our",
    "out",
    "p",
    "per",
    "put",
    "q",
    "r",
    "s",
    "same",
    "shall",
    "she",
    "should",
    "since",
    "so",
    "such",
    "sure",
    "t",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "though",
    "thus",
    "to",
    "too",
    "u",
    "us",
    "v",
    "w",
    "was",
    "we",
    "well",
    "went",
    "were",
    "what",
    "when",
    "where",
    "which",
    "who",
    "whose",
    "why",
    "will",
    "would",
    "x",
    "y",
    "yet",
    "z"
]

},{}],108:[function(require,module,exports){
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

var isPlainObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var isEmptyArray = require( '@stdlib/assert/is-empty-array' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - options to validate
* @param {StringArray} [options.stopwords] - array of custom stop words
* @returns {(null|Error)} error object or null
*
* @example
* var opts = {};
* var options = {
*     'stopwords': [ 'of' ]
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isPlainObject( options ) ) {
		return new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
	}
	if ( hasOwnProp( options, 'stopwords' ) ) {
		opts.stopwords = options.stopwords;
		if (
			!isStringArray( opts.stopwords ) &&
			!isEmptyArray( opts.stopwords )
		) {
			return new TypeError( format( 'invalid option. `%s` option must be an array of strings. Option: `%s`.', 'stopwords', opts.stopwords ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-empty-array":25,"@stdlib/assert/is-plain-object":56,"@stdlib/assert/is-string-array":62,"@stdlib/string/format":130}],109:[function(require,module,exports){
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

},{"./is_number.js":112}],110:[function(require,module,exports){
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

},{"./is_number.js":112,"./zero_pad.js":116}],111:[function(require,module,exports){
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

},{"./main.js":114}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./format_double.js":109,"./format_integer.js":110,"./is_string.js":113,"./space_pad.js":115,"./zero_pad.js":116}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{"./main.js":118}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

/*
* When adding modules to the namespace, ensure that they are added in alphabetical order according to module name.
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );


// MAIN //

/**
* Top-level namespace.
*
* @namespace ns
*/
var ns = {};

/**
* @name formatInterpolate
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/base/format-interpolate}
*/
setReadOnly( ns, 'formatInterpolate', require( '@stdlib/string/base/format-interpolate' ) );

/**
* @name formatTokenize
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/base/format-tokenize}
*/
setReadOnly( ns, 'formatTokenize', require( '@stdlib/string/base/format-tokenize' ) );


// EXPORTS //

module.exports = ns;

},{"@stdlib/string/base/format-interpolate":111,"@stdlib/string/base/format-tokenize":117,"@stdlib/utils/define-read-only-property":224}],120:[function(require,module,exports){
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
* Convert a string to camel case.
*
* @module @stdlib/string/camelcase
*
* @example
* var camelcase = require( '@stdlib/string/camelcase' );
*
* var str = camelcase( 'foo bar' );
* // returns 'fooBar'
*
* str = camelcase( '--foo-bar--' );
* // returns 'fooBar'
*
* str = camelcase( 'Hello World!' );
* // returns 'helloWorld'
*/

// MODULES //

var camelcase = require( './main.js' );


// EXPORTS //

module.exports = camelcase;

},{"./main.js":121}],121:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var capitalize = require( '@stdlib/string/capitalize' );
var lowercase = require( '@stdlib/string/lowercase' );
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );
var trim = require( '@stdlib/string/trim' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;
var RE_SPECIAL = /[-!"'(),–.:;<>?`{}|~\/\\\[\]_#$*&^@%]+/g; // eslint-disable-line no-useless-escape
var RE_TO_CAMEL = /(?:\s|^)([^\s]+)(?=\s|$)/g;
var RE_CAMEL = /([a-z0-9])([A-Z])/g;


// FUNCTIONS //

/**
* Converts first capture group to uppercase.
*
* @private
* @param {string} match - entire match
* @param {string} p1 - first capture group
* @param {number} offset - offset of the matched substring in entire string
* @returns {string} uppercased capture group
*/
function replacer( match, p1, offset ) {
	p1 = lowercase( p1 );
	return ( offset === 0 ) ? p1 : capitalize( p1 );
}


// MAIN //

/**
* Converts a string to camel case.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string primitive
* @returns {string} camel-cased string
*
* @example
* var out = camelcase( 'foo bar' );
* // returns 'fooBar'
*
* @example
* var out = camelcase( 'IS_MOBILE' );
* // returns 'isMobile'
*
* @example
* var out = camelcase( 'Hello World!' );
* // returns 'helloWorld'
*
* @example
* var out = camelcase( '--foo-bar--' );
* // returns 'fooBar'
*/
function camelcase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	str = replace( str, RE_SPECIAL, ' ' );
	str = replace( str, RE_WHITESPACE, ' ' );
	str = replace( str, RE_CAMEL, '$1 $2' );
	str = trim( str );
	str = replace( str, RE_TO_CAMEL, replacer );
	return str;
}


// EXPORTS //

module.exports = camelcase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/capitalize":123,"@stdlib/string/format":130,"@stdlib/string/lowercase":144,"@stdlib/string/replace":171,"@stdlib/string/trim":203}],122:[function(require,module,exports){
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


// MAIN //

/**
* Capitalizes the first character in a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} capitalized string
*
* @example
* var out = capitalize( 'last man standing' );
* // returns 'Last man standing'
*
* @example
* var out = capitalize( 'presidential election' );
* // returns 'Presidential election'
*
* @example
* var out = capitalize( 'javaScript' );
* // returns 'JavaScript'
*
* @example
* var out = capitalize( 'Hidden Treasures' );
* // returns 'Hidden Treasures'
*/
function capitalize( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( str === '' ) {
		return '';
	}
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
}


// EXPORTS //

module.exports = capitalize;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],123:[function(require,module,exports){
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
* Capitalize the first character in a string.
*
* @module @stdlib/string/capitalize
*
* @example
* var capitalize = require( '@stdlib/string/capitalize' );
*
* var out = capitalize( 'last man standing' );
* // returns 'Last man standing'
*
* out = capitalize( 'Hidden Treasures' );
* // returns 'Hidden Treasures';
*/

// MODULES //

var capitalize = require( './capitalize.js' );


// EXPORTS //

module.exports = capitalize;

},{"./capitalize.js":122}],124:[function(require,module,exports){
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

/**
* Return a Unicode code point from a string at a specified position.
*
* @module @stdlib/string/code-point-at
*
* @example
* var codePointAt = require( '@stdlib/string/code-point-at' );
*
* var out = codePointAt( 'अनुच्छेद', 2 );
* // returns 2369
*
* out = codePointAt( '🌷', 1, true );
* // returns 127799
*/

// MODULES //

var codePointAt = require( './main.js' );


// EXPORTS //

module.exports = codePointAt;

},{"./main.js":125}],125:[function(require,module,exports){
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

// MODULES //

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// VARIABLES //

// Factors for converting individual surrogates
var Ox10000 = 0x10000|0; // 65536
var Ox400 = 0x400|0; // 1024

// Range for a high surrogate
var OxD800 = 0xD800|0; // 55296
var OxDBFF = 0xDBFF|0; // 56319

// Range for a low surrogate
var OxDC00 = 0xDC00|0; // 56320
var OxDFFF = 0xDFFF|0; // 57343


// MAIN //

/**
* Returns a Unicode code point from a string at a specified position.
*
* ## Notes
*
* -   UTF-16 encoding uses one 16-bit unit for non-surrogates (U+0000 to U+D7FF and U+E000 to U+FFFF).
* -   UTF-16 encoding uses two 16-bit units (surrogate pairs) for U+10000 to U+10FFFF and encodes U+10000-U+10FFFF by subtracting 0x10000 from the code point, expressing the result as a 20-bit binary, and splitting the 20 bits of 0x0-0xFFFFF as upper and lower 10-bits. The respective 10-bits are stored in two 16-bit words: a high and a low surrogate.
*
*
* @param {string} str - input string
* @param {NonNegativeInteger} idx - position
* @param {boolean} [backward=false] - backward iteration for low surrogates
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a number having a nonnegative integer
* @throws {TypeError} third argument must be a boolean
* @throws {RangeError} position must be a valid index in string
* @returns {NonNegativeInteger} code point
*
* @example
* var out = codePointAt( 'last man standing', 4 );
* // returns 32
*
* @example
* var out = codePointAt( 'presidential election', 8, true );
* // returns 116
*
* @example
* var out = codePointAt( 'अनुच्छेद', 2 );
* // returns 2369
*
* @example
* var out = codePointAt( '🌷', 1, true );
* // returns 127799
*/
function codePointAt( str, idx, backward ) {
	var code;
	var FLG;
	var low;
	var hi;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( idx ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a valid position (i.e., a nonnegative integer). Value: `%s`.', idx ) );
	}
	if ( idx >= str.length ) {
		throw new RangeError( format( 'invalid argument. Must provide a valid position (i.e., within string bounds). Value: `%s`.', idx ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isBoolean( backward ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a boolean. Value: `%s`.', backward ) );
		}
		FLG = backward;
	} else {
		FLG = false;
	}
	code = str.charCodeAt( idx );

	// High surrogate
	if ( code >= OxD800 && code <= OxDBFF && idx < str.length - 1 ) {
		hi = code;
		low = str.charCodeAt( idx+1 );
		if ( OxDC00 <= low && low <= OxDFFF ) {
			return ( ( hi - OxD800 ) * Ox400 ) + ( low - OxDC00 ) + Ox10000;
		}
		return hi;
	}
	// Low surrogate - support only if backward iteration is desired
	if ( FLG ) {
		if ( code >= OxDC00 && code <= OxDFFF && idx >= 1 ) {
			hi = str.charCodeAt( idx-1 );
			low = code;
			if ( OxD800 <= hi && hi <= OxDBFF ) {
				return ( ( hi - OxD800 ) * Ox400 ) + ( low - OxDC00 ) + Ox10000;
			}
			return low;
		}
	}
	return code;
}


// EXPORTS //

module.exports = codePointAt;

},{"@stdlib/assert/is-boolean":15,"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],126:[function(require,module,exports){
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
* Convert a string to constant case.
*
* @module @stdlib/string/constantcase
*
* @example
* var constantcase = require( '@stdlib/string/constantcase' );
*
* var str = constantcase( 'aBcDeF' );
* // returns 'ABCDEF'
*
* str = constantcase( 'Hello World!' );
* // returns 'HELLO_WORLD'
*
* str = constantcase( 'I am a robot' );
* // returns 'I_AM_A_ROBOT'
*/


// MODULES //

var constantcase = require( './main.js' );


// EXPORTS //

module.exports = constantcase;

},{"./main.js":127}],127:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var uppercase = require( '@stdlib/string/uppercase' );
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );
var trim = require( '@stdlib/string/trim' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;
var RE_SPECIAL = /[!"'(),–.:;<>?`{}|~\/\\\[\]_#$*&^@%]+/g; // eslint-disable-line no-useless-escape
var RE_CAMEL = /([a-z0-9])([A-Z])/g;


// MAIN //

/**
* Converts a string to constant case.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string primitive
* @returns {string} constant-cased string
*
* @example
* var str = constantcase( 'beep' );
* // returns 'BEEP'
*
* @example
* var str = constantcase( 'beep boop' );
* // returns 'BEEP_BOOP'
*
* @example
* var str = constantcase( 'isMobile' );
* // returns 'IS_MOBILE'
*
* @example
* var str = constantcase( 'Hello World!' );
* // returns 'HELLO_WORLD'
*/
function constantcase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	str = replace( str, RE_SPECIAL, ' ' );
	str = replace( str, RE_CAMEL, '$1 $2' );
	str = trim( str );
	str = replace( str, RE_WHITESPACE, '_' );
	return uppercase( str );
}


// EXPORTS //

module.exports = constantcase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/replace":171,"@stdlib/string/trim":203,"@stdlib/string/uppercase":211}],128:[function(require,module,exports){
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
* Test if a string ends with the characters of another string.
*
* @param {string} str - input string
* @param {string} search - search string
* @param {integer} [len=str.length] - substring length
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} third argument must be an integer
* @returns {boolean} boolean indicating if the input string ends with the search string
*
* @example
* var bool = endsWith( 'Remember the story I used to tell you when you were a boy?', 'boy?' );
* // returns true
*
* @example
* var bool = endsWith( 'Remember the story I used to tell you when you were a boy?', 'Boy?' );
* // returns false
*
* @example
* var bool = endsWith( 'To be, or not to be, that is the question.', 'to be' );
* // returns false
*
* @example
* var bool = endsWith( 'To be, or not to be, that is the question.', 'to be', 19 );
* // returns true
*
* @example
* var bool = endsWith( 'To be, or not to be, that is the question.', 'to be', -23 );
* // returns true
*/
function endsWith( str, search, len ) {
	var idx;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isString( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', search ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isInteger( len ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be an integer. Value: `%s`.', len ) );
		}
		if ( len === 0 ) {
			return ( search.length === 0 );
		}
		if ( len < 0 ) {
			idx = str.length + len;
		} else {
			idx = len;
		}
	} else {
		idx = str.length;
	}
	if ( search.length === 0 ) {
		// Based on the premise that every string can be "surrounded" by empty strings (e.g., "" + "a" + "" + "b" + "" === "ab"):
		return true;
	}
	idx -= search.length;
	if ( idx < 0 ) {
		return false;
	}
	for ( i = 0; i < search.length; i++) {
		if ( str.charCodeAt( idx + i ) !== search.charCodeAt( i ) ) {
			return false;
		}
	}
	return true;
}


// EXPORTS //

module.exports = endsWith;

},{"@stdlib/assert/is-integer":33,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],129:[function(require,module,exports){
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
* Test if a string ends with the characters of another string.
*
* @module @stdlib/string/ends-with
*
* @example
* var endsWith = require( '@stdlib/string/ends-with' );
*
* var str = 'Fair is foul, and foul is fair, hover through fog and filthy air';
*
* var bool = endsWith( str, 'air' );
* // returns true
*
* bool = endsWith( str, 'fair' );
* // returns false
*
* bool = endsWith( str, 'fair', 30 );
* // returns true
*
* bool = endsWith( str, 'fair', -34 );
* // returns true
*/

// MODULES //

var endsWith = require( './ends_with.js' );


// EXPORTS //

module.exports = endsWith;

},{"./ends_with.js":128}],130:[function(require,module,exports){
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

},{"./main.js":132}],131:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"dup":113}],132:[function(require,module,exports){
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

},{"./is_string.js":131,"@stdlib/string/base/format-interpolate":111,"@stdlib/string/base/format-tokenize":117}],133:[function(require,module,exports){
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
* Create a string from a sequence of Unicode code points.
*
* @module @stdlib/string/from-code-point
*
* @example
* var fromCodePoint = require( '@stdlib/string/from-code-point' );
*
* var str = fromCodePoint( 9731 );
* // returns '☃'
*/

// MODULES //

var fromCodePoint = require( './main.js' );


// EXPORTS //

module.exports = fromCodePoint;

},{"./main.js":134}],134:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isCollection = require( '@stdlib/assert/is-collection' );
var format = require( '@stdlib/string/format' );
var UNICODE_MAX = require( '@stdlib/constants/unicode/max' );
var UNICODE_MAX_BMP = require( '@stdlib/constants/unicode/max-bmp' );


// VARIABLES //

var fromCharCode = String.fromCharCode;

// Factor to rescale a code point from a supplementary plane:
var Ox10000 = 0x10000|0; // 65536

// Factor added to obtain a high surrogate:
var OxD800 = 0xD800|0; // 55296

// Factor added to obtain a low surrogate:
var OxDC00 = 0xDC00|0; // 56320

// 10-bit mask: 2^10-1 = 1023 => 0x3ff => 00000000 00000000 00000011 11111111
var Ox3FF = 1023|0;


// MAIN //

/**
* Creates a string from a sequence of Unicode code points.
*
* ## Notes
*
* -   UTF-16 encoding uses one 16-bit unit for non-surrogates (U+0000 to U+D7FF and U+E000 to U+FFFF).
* -   UTF-16 encoding uses two 16-bit units (surrogate pairs) for U+10000 to U+10FFFF and encodes U+10000-U+10FFFF by subtracting 0x10000 from the code point, expressing the result as a 20-bit binary, and splitting the 20 bits of 0x0-0xFFFFF as upper and lower 10-bits. The respective 10-bits are stored in two 16-bit words: a high and a low surrogate.
*
*
* @param {...NonNegativeInteger} args - sequence of code points
* @throws {Error} must provide either an array-like object of code points or one or more code points as separate arguments
* @throws {TypeError} a code point must be a nonnegative integer
* @throws {RangeError} must provide a valid Unicode code point
* @returns {string} created string
*
* @example
* var str = fromCodePoint( 9731 );
* // returns '☃'
*/
function fromCodePoint( args ) {
	var len;
	var str;
	var arr;
	var low;
	var hi;
	var pt;
	var i;

	len = arguments.length;
	if ( len === 1 && isCollection( args ) ) {
		arr = arguments[ 0 ];
		len = arr.length;
	} else {
		arr = [];
		for ( i = 0; i < len; i++ ) {
			arr.push( arguments[ i ] );
		}
	}
	if ( len === 0 ) {
		throw new Error( 'insufficient arguments. Must provide either an array of code points or one or more code points as separate arguments.' );
	}
	str = '';
	for ( i = 0; i < len; i++ ) {
		pt = arr[ i ];
		if ( !isNonNegativeInteger( pt ) ) {
			throw new TypeError( format( 'invalid argument. Must provide valid code points (i.e., nonnegative integers). Value: `%s`.', pt ) );
		}
		if ( pt > UNICODE_MAX ) {
			throw new RangeError( format( 'invalid argument. Must provide a valid code point (cannot exceed max). Value: `%s`.', pt ) );
		}
		if ( pt <= UNICODE_MAX_BMP ) {
			str += fromCharCode( pt );
		} else {
			// Code point from a supplementary plane. Split into two 16-bit code units (surrogate pair).
			pt -= Ox10000;
			hi = (pt >> 10) + OxD800;
			low = (pt & Ox3FF) + OxDC00;
			str += fromCharCode( hi, low );
		}
	}
	return str;
}


// EXPORTS //

module.exports = fromCodePoint;

},{"@stdlib/assert/is-collection":23,"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/constants/unicode/max":77,"@stdlib/constants/unicode/max-bmp":76,"@stdlib/string/format":130}],135:[function(require,module,exports){
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
* Convert a string to kebab case.
*
* @module @stdlib/string/kebabcase
*
* @example
* var kebabcase = require( '@stdlib/string/kebabcase' );
*
* var str = kebabcase( 'Foo Bar' );
* // returns 'foo-bar'
*
* str = kebabcase( 'I am a tiny little house' );
* // returns 'i-am-a-tiny-little-house'
*/

// MODULES //

var kebabcase = require( './main.js' );


// EXPORTS //

module.exports = kebabcase;

},{"./main.js":136}],136:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var lowercase = require( '@stdlib/string/lowercase' );
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );
var trim = require( '@stdlib/string/trim' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;
var RE_SPECIAL = /[!"'(),–.:;<>?`{}|~\/\\\[\]_#$*&^@%]+/g; // eslint-disable-line no-useless-escape
var RE_CAMEL = /([a-z0-9])([A-Z])/g;


// MAIN //

/**
* Converts a string to kebab case.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string primitive
* @returns {string} kebab-cased string
*
* @example
* var str = kebabCase( 'Hello World!' );
* // returns 'hello-world'
*
* @example
* var str = kebabCase( 'foo bar' );
* // returns 'foo-bar'
*
* @example
* var str = kebabCase( 'I am a tiny little teapot' );
* // returns 'i-am-a-tiny-little-teapot'
*
* @example
* var str = kebabCase( 'BEEP boop' );
* // returns 'beep-boop'
*
* @example
* var str = kebabCase( 'isMobile' );
* // returns 'is-mobile'
*/
function kebabCase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	str = replace( str, RE_SPECIAL, ' ' );
	str = replace( str, RE_CAMEL, '$1 $2' );
	str = trim( str );
	str = replace( str, RE_WHITESPACE, '-' );
	return lowercase( str );
}


// EXPORTS //

module.exports = kebabCase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/lowercase":144,"@stdlib/string/replace":171,"@stdlib/string/trim":203}],137:[function(require,module,exports){
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
* Left pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/left-pad
*
* @example
* var lpad = require( '@stdlib/string/left-pad' );
*
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/

// MODULES //

var lpad = require( './left_pad.js' );


// EXPORTS //

module.exports = lpad;

},{"./left_pad.js":138}],138:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var format = require( '@stdlib/string/format' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );


// MAIN //

/**
* Left pads a string such that the padded string has a length of at least `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - minimum string length
* @param {string} [pad=' '] - string used to pad
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @throws {RangeError} padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* @example
* var str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* @example
* var str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/
function lpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', len ) );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a string. Value: `%s`.', p ) );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Third argument must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( format( 'invalid argument. Output string length exceeds maximum allowed string length. Value: `%u`.', len ) );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return repeat( p, n ) + str;
}


// EXPORTS //

module.exports = lpad;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/constants/float64/max-safe-integer":72,"@stdlib/math/base/special/ceil":84,"@stdlib/string/format":130,"@stdlib/string/repeat":169}],139:[function(require,module,exports){
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
* Trim `n` characters from the beginning of a string.
*
* @module @stdlib/string/left-trim-n
*
* @example
* var ltrimN = require( '@stdlib/string/left-trim-n' );
*
* var str = 'foo  ';
* var out = ltrimN( str, str.length );
* // returns 'foo  '
*
* str = '🐶🐶🐶 Animals 🐶🐶🐶';
* out = ltrimN( str, 4, [ '🐶', ' ' ] );
* // returns 'Animals 🐶🐶🐶'
*/

// MODULES //

var ltrimN = require( './main.js' );


// EXPORTS //

module.exports = ltrimN;

},{"./main.js":140}],140:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var splitGraphemeClusters = require( '@stdlib/string/split-grapheme-clusters' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var replace = require( '@stdlib/string/replace' );
var rescape = require( '@stdlib/utils/escape-regexp-string' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

var WHITESPACE_CHARS = '\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';


// MAIN //

/**
* Trims `n` characters from the beginning of a string.
*
* @param {string} str - input string
* @param {NonNegativeInteger} n - number of characters to trim
* @param {(string|StringArray)} [chars] - characters to trim (defaults to whitespace characters)
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string or an array of strings
* @returns {string} trimmed string
*
* @example
* var str = '   abc   ';
* var out = ltrimN( str, 2 );
* // returns ' abc   '
*
* @example
* var str = '   abc   ';
* var out = ltrimN( str, str.length );
* // returns 'abc   '
*
* @example
* var str = '~~abc!~~';
* var out = ltrimN( str, str.length, [ '~', '!' ] );
* // returns 'abc!~~'
*
* @example
* var str = '🤖👨🏼‍🎨🤖👨🏼‍🎨🤖👨🏼‍🎨';
* var out = ltrimN( str, str.length, '👨🏼‍🎨🤖' );
* // returns ''
*/
function ltrimN( str, n, chars ) {
	var nElems;
	var reStr;
	var isStr;
	var RE;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', n ) );
	}
	if ( arguments.length > 2 ) {
		isStr = isString( chars );
		if ( !isStr && !isStringArray( chars ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a string or an array of strings. Value: `%s`.', chars ) );
		}
		if ( isStr ) {
			chars = splitGraphemeClusters( chars );
		}
		nElems = chars.length - 1;
		reStr = '';
		for ( i = 0; i < nElems; i++ ) {
			reStr += rescape( chars[ i ] );
			reStr += '|';
		}
		reStr += rescape( chars[ nElems ] );

		// Case: Trim a specific set of characters from the beginning of a string..
		RE = new RegExp( '^(?:' + reStr + '){0,'+n+'}' );
	} else {
		// Case: Trim `n` whitespace characters from the beginning of a string...
		RE = new RegExp( '^[' + WHITESPACE_CHARS + ']{0,'+n+'}' );
	}
	return replace( str, RE, '' );
}


// EXPORTS //

module.exports = ltrimN;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/assert/is-string-array":62,"@stdlib/string/format":130,"@stdlib/string/replace":171,"@stdlib/string/split-grapheme-clusters":183,"@stdlib/utils/escape-regexp-string":226}],141:[function(require,module,exports){
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
* Trim whitespace characters from the beginning of a string.
*
* @module @stdlib/string/left-trim
*
* @example
* var ltrim = require( '@stdlib/string/left-trim' );
*
* var out = ltrim( '   Whitespace   ' );
* // returns 'Whitespace   '
*
* out = ltrim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs\t\t\t'
*/

// MODULES //

var ltrim = require( './left_trim.js' );


// EXPORTS //

module.exports = ltrim;

},{"./left_trim.js":142}],142:[function(require,module,exports){
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
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /^[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;


// MAIN //

/**
* Trims whitespace characters from the beginning of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = ltrim( '   Whitespace   ' );
* // returns 'Whitespace   '
*
* @example
* var out = ltrim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs\t\t\t'
*
* @example
* var out = ltrim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines\n\n\n'
*/
function ltrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	return replace( str, RE, '' );
}


// EXPORTS //

module.exports = ltrim;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/replace":171}],143:[function(require,module,exports){
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

/*
* When adding modules to the namespace, ensure that they are added in alphabetical order according to module name.
*/

/*
* The following modules are intentionally not exported: tools
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );


// MAIN //

/**
* Top-level namespace.
*
* @namespace string
*/
var string = {};

/**
* @name acronym
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/acronym}
*/
setReadOnly( string, 'acronym', require( '@stdlib/string/acronym' ) );

/**
* @name base
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/base}
*/
setReadOnly( string, 'base', require( '@stdlib/string/base' ) );

/**
* @name camelcase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/camelcase}
*/
setReadOnly( string, 'camelcase', require( '@stdlib/string/camelcase' ) );

/**
* @name capitalize
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/capitalize}
*/
setReadOnly( string, 'capitalize', require( '@stdlib/string/capitalize' ) );

/**
* @name codePointAt
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/code-point-at}
*/
setReadOnly( string, 'codePointAt', require( '@stdlib/string/code-point-at' ) );

/**
* @name constantcase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/constantcase}
*/
setReadOnly( string, 'constantcase', require( '@stdlib/string/constantcase' ) );

/**
* @name endsWith
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/ends-with}
*/
setReadOnly( string, 'endsWith', require( '@stdlib/string/ends-with' ) );

/**
* @name format
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/format}
*/
setReadOnly( string, 'format', require( '@stdlib/string/format' ) );

/**
* @name fromCodePoint
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/from-code-point}
*/
setReadOnly( string, 'fromCodePoint', require( '@stdlib/string/from-code-point' ) );

/**
* @name kebabcase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/kebabcase}
*/
setReadOnly( string, 'kebabcase', require( '@stdlib/string/kebabcase' ) );

/**
* @name lpad
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/left-pad}
*/
setReadOnly( string, 'lpad', require( '@stdlib/string/left-pad' ) );

/**
* @name ltrim
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/left-trim}
*/
setReadOnly( string, 'ltrim', require( '@stdlib/string/left-trim' ) );

/**
* @name ltrimN
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/left-trim-n}
*/
setReadOnly( string, 'ltrimN', require( '@stdlib/string/left-trim-n' ) );

/**
* @name lowercase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/lowercase}
*/
setReadOnly( string, 'lowercase', require( '@stdlib/string/lowercase' ) );

/**
* @name nextGraphemeClusterBreak
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/next-grapheme-cluster-break}
*/
setReadOnly( string, 'nextGraphemeClusterBreak', require( '@stdlib/string/next-grapheme-cluster-break' ) );

/**
* @name numGraphemeClusters
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/num-grapheme-clusters}
*/
setReadOnly( string, 'numGraphemeClusters', require( '@stdlib/string/num-grapheme-clusters' ) );

/**
* @name pad
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/pad}
*/
setReadOnly( string, 'pad', require( '@stdlib/string/pad' ) );

/**
* @name pascalcase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/pascalcase}
*/
setReadOnly( string, 'pascalcase', require( '@stdlib/string/pascalcase' ) );

/**
* @name percentEncode
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/percent-encode}
*/
setReadOnly( string, 'percentEncode', require( '@stdlib/string/percent-encode' ) );

/**
* @name prevGraphemeClusterBreak
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/prev-grapheme-cluster-break}
*/
setReadOnly( string, 'prevGraphemeClusterBreak', require( '@stdlib/string/prev-grapheme-cluster-break' ) );

/**
* @name removeFirst
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/remove-first}
*/
setReadOnly( string, 'removeFirst', require( '@stdlib/string/remove-first' ) );

/**
* @name removeLast
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/remove-last}
*/
setReadOnly( string, 'removeLast', require( '@stdlib/string/remove-last' ) );

/**
* @name removePunctuation
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/remove-punctuation}
*/
setReadOnly( string, 'removePunctuation', require( '@stdlib/string/remove-punctuation' ) );

/**
* @name removeUTF8BOM
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/remove-utf8-bom}
*/
setReadOnly( string, 'removeUTF8BOM', require( '@stdlib/string/remove-utf8-bom' ) );

/**
* @name removeWords
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/remove-words}
*/
setReadOnly( string, 'removeWords', require( '@stdlib/string/remove-words' ) );

/**
* @name repeat
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/repeat}
*/
setReadOnly( string, 'repeat', require( '@stdlib/string/repeat' ) );

/**
* @name replace
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/replace}
*/
setReadOnly( string, 'replace', require( '@stdlib/string/replace' ) );

/**
* @name reverseString
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/reverse}
*/
setReadOnly( string, 'reverseString', require( '@stdlib/string/reverse' ) );

/**
* @name rpad
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/right-pad}
*/
setReadOnly( string, 'rpad', require( '@stdlib/string/right-pad' ) );

/**
* @name rtrim
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/right-trim}
*/
setReadOnly( string, 'rtrim', require( '@stdlib/string/right-trim' ) );

/**
* @name rtrimN
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/right-trim-n}
*/
setReadOnly( string, 'rtrimN', require( '@stdlib/string/right-trim-n' ) );

/**
* @name snakecase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/snakecase}
*/
setReadOnly( string, 'snakecase', require( '@stdlib/string/snakecase' ) );

/**
* @name splitGraphemeClusters
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/split-grapheme-clusters}
*/
setReadOnly( string, 'splitGraphemeClusters', require( '@stdlib/string/split-grapheme-clusters' ) );

/**
* @name startcase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/startcase}
*/
setReadOnly( string, 'startcase', require( '@stdlib/string/startcase' ) );

/**
* @name startsWith
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/starts-with}
*/
setReadOnly( string, 'startsWith', require( '@stdlib/string/starts-with' ) );

/**
* @name substringAfter
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/substring-after}
*/
setReadOnly( string, 'substringAfter', require( '@stdlib/string/substring-after' ) );

/**
* @name substringAfterLast
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/substring-after-last}
*/
setReadOnly( string, 'substringAfterLast', require( '@stdlib/string/substring-after-last' ) );

/**
* @name substringBefore
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/substring-before}
*/
setReadOnly( string, 'substringBefore', require( '@stdlib/string/substring-before' ) );

/**
* @name substringBeforeLast
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/substring-before-last}
*/
setReadOnly( string, 'substringBeforeLast', require( '@stdlib/string/substring-before-last' ) );

/**
* @name trim
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/trim}
*/
setReadOnly( string, 'trim', require( '@stdlib/string/trim' ) );

/**
* @name truncate
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/truncate}
*/
setReadOnly( string, 'truncate', require( '@stdlib/string/truncate' ) );

/**
* @name truncateMiddle
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/truncate-middle}
*/
setReadOnly( string, 'truncateMiddle', require( '@stdlib/string/truncate-middle' ) );

/**
* @name uncapitalize
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/uncapitalize}
*/
setReadOnly( string, 'uncapitalize', require( '@stdlib/string/uncapitalize' ) );

/**
* @name uppercase
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/uppercase}
*/
setReadOnly( string, 'uppercase', require( '@stdlib/string/uppercase' ) );

/**
* @name utf16ToUTF8Array
* @memberof string
* @readonly
* @type {Function}
* @see {@link module:@stdlib/string/utf16-to-utf8-array}
*/
setReadOnly( string, 'utf16ToUTF8Array', require( '@stdlib/string/utf16-to-utf8-array' ) );


// EXPORTS //

module.exports = string;

},{"@stdlib/string/acronym":105,"@stdlib/string/base":119,"@stdlib/string/camelcase":120,"@stdlib/string/capitalize":123,"@stdlib/string/code-point-at":124,"@stdlib/string/constantcase":126,"@stdlib/string/ends-with":129,"@stdlib/string/format":130,"@stdlib/string/from-code-point":133,"@stdlib/string/kebabcase":135,"@stdlib/string/left-pad":137,"@stdlib/string/left-trim":141,"@stdlib/string/left-trim-n":139,"@stdlib/string/lowercase":144,"@stdlib/string/next-grapheme-cluster-break":146,"@stdlib/string/num-grapheme-clusters":148,"@stdlib/string/pad":150,"@stdlib/string/pascalcase":153,"@stdlib/string/percent-encode":155,"@stdlib/string/prev-grapheme-cluster-break":157,"@stdlib/string/remove-first":159,"@stdlib/string/remove-last":161,"@stdlib/string/remove-punctuation":163,"@stdlib/string/remove-utf8-bom":165,"@stdlib/string/remove-words":167,"@stdlib/string/repeat":169,"@stdlib/string/replace":171,"@stdlib/string/reverse":173,"@stdlib/string/right-pad":175,"@stdlib/string/right-trim":179,"@stdlib/string/right-trim-n":177,"@stdlib/string/snakecase":181,"@stdlib/string/split-grapheme-clusters":183,"@stdlib/string/startcase":185,"@stdlib/string/starts-with":187,"@stdlib/string/substring-after":191,"@stdlib/string/substring-after-last":189,"@stdlib/string/substring-before":195,"@stdlib/string/substring-before-last":193,"@stdlib/string/trim":203,"@stdlib/string/truncate":207,"@stdlib/string/truncate-middle":205,"@stdlib/string/uncapitalize":209,"@stdlib/string/uppercase":211,"@stdlib/string/utf16-to-utf8-array":213,"@stdlib/utils/define-read-only-property":224}],144:[function(require,module,exports){
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
* Convert a string to lowercase.
*
* @module @stdlib/string/lowercase
*
* @example
* var lowercase = require( '@stdlib/string/lowercase' );
*
* var str = lowercase( 'bEEp' );
* // returns 'beep'
*/

// MODULES //

var lowercase = require( './lowercase.js' );


// EXPORTS //

module.exports = lowercase;

},{"./lowercase.js":145}],145:[function(require,module,exports){
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


// MAIN //

/**
* Converts a string to lowercase.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string
* @returns {string} lowercase string
*
* @example
* var str = lowercase( 'bEEp' );
* // returns 'beep'
*/
function lowercase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	return str.toLowerCase();
}


// EXPORTS //

module.exports = lowercase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],146:[function(require,module,exports){
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

/**
* Return the next extended grapheme cluster break in a string after a specified position.
*
* @module @stdlib/string/next-grapheme-cluster-break
*
* @example
* var nextGraphemeClusterBreak = require( '@stdlib/string/next-grapheme-cluster-break' );
*
* var out = nextGraphemeClusterBreak( 'अनुच्छेद', 1 );
* // returns 3
*
* out = nextGraphemeClusterBreak( '🌷', 0 );
* // returns -1
*/

// MODULES //

var nextGraphemeClusterBreak = require( './main.js' );


// EXPORTS //

module.exports = nextGraphemeClusterBreak;

},{"./main.js":147}],147:[function(require,module,exports){
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

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var codePointAt = require( '@stdlib/string/code-point-at' );
var hasUTF16SurrogatePairAt = require( '@stdlib/assert/has-utf16-surrogate-pair-at' );
var grapheme = require( '@stdlib/string/tools/grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

var breakType = grapheme.breakType;
var breakProperty = grapheme.breakProperty;
var emojiProperty = grapheme.emojiProperty;


// MAIN //

/**
* Returns the next extended grapheme cluster break in a string after a specified position.
*
* @param {string} str - input string
* @param {integer} [fromIndex=0] - position
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be an integer
* @returns {NonNegativeInteger} next grapheme break position
*
* @example
* var out = nextGraphemeClusterBreak( 'last man standing', 4 );
* // returns 5
*
* @example
* var out = nextGraphemeClusterBreak( 'presidential election', 8 );
* // returns 9
*
* @example
* var out = nextGraphemeClusterBreak( 'अनुच्छेद', 1 );
* // returns 3
*
* @example
* var out = nextGraphemeClusterBreak( '🌷' );
* // returns -1
*/
function nextGraphemeClusterBreak( str, fromIndex ) {
	var breaks;
	var emoji;
	var len;
	var idx;
	var cp;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be an integer. Value: `%s`.', fromIndex ) );
		}
		idx = fromIndex;
	} else {
		idx = 0;
	}
	len = str.length;
	if ( idx < 0 ) {
		idx += len;
		if ( idx < 0 ) {
			idx = 0;
		}
	}
	if ( len === 0 || idx >= len ) {
		return -1;
	}
	// Initialize caches for storing grapheme break and emoji properties:
	breaks = [];
	emoji = [];

	// Get the code point for the starting index:
	cp = codePointAt( str, idx );

	// Get the corresponding grapheme break and emoji properties:
	breaks.push( breakProperty( cp ) );
	emoji.push( emojiProperty( cp ) );

	// Begin searching for the next grapheme cluster break...
	for ( i = idx+1; i < len; i++ ) {
		// If the current character is part of a surrogate pair, move along...
		if ( hasUTF16SurrogatePairAt( str, i-1 ) ) {
			continue;
		}
		// Get the next code point:
		cp = codePointAt( str, i );

		// Get the corresponding grapheme break and emoji properties:
		breaks.push( breakProperty( cp ) );
		emoji.push( emojiProperty( cp ) );

		// Determine if we've encountered a grapheme cluster break...
		if ( breakType( breaks, emoji ) > 0 ) {
			// We've found a break!
			return i;
		}
	}
	// Unable to find a grapheme cluster break:
	return -1;
}


// EXPORTS //

module.exports = nextGraphemeClusterBreak;

},{"@stdlib/assert/has-utf16-surrogate-pair-at":7,"@stdlib/assert/is-integer":33,"@stdlib/assert/is-string":63,"@stdlib/string/code-point-at":124,"@stdlib/string/format":130,"@stdlib/string/tools/grapheme-cluster-break":202}],148:[function(require,module,exports){
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

/**
* Return the number of grapheme clusters in a string.
*
* @module @stdlib/string/num-grapheme-clusters
*
* @example
* var numGraphemeClusters = require( '@stdlib/string/num-grapheme-clusters' );
*
* var out = numGraphemeClusters( 'last man standing' );
* // returns 17
*
* out = numGraphemeClusters( '🌷' );
* // returns 1
*/

// MODULES //

var numGraphemeClusters = require( './main.js' );


// EXPORTS //

module.exports = numGraphemeClusters;

},{"./main.js":149}],149:[function(require,module,exports){
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

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var nextGraphemeClusterBreak = require( '@stdlib/string/next-grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns the number of grapheme clusters in a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {NonNegative} number of grapheme clusters
*
* @example
* var out = numGraphemeClusters( 'last man standing' );
* // returns 17
*
* @example
* var out = numGraphemeClusters( 'presidential election' );
* // returns 21
*
* @example
* var out = numGraphemeClusters( 'अनुच्छेद' );
* // returns 5
*
* @example
* var out = numGraphemeClusters( '🌷' );
* // returns 1
*/
function numGraphemeClusters( str ) {
	var count;
	var idx;
	var brk;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	count = 0;
	idx = 0;

	brk = nextGraphemeClusterBreak( str, idx );
	while ( brk !== -1 ) {
		count += 1;
		idx = brk;
		brk = nextGraphemeClusterBreak( str, idx );
	}
	if ( idx < str.length ) {
		count += 1;
	}
	return count;
}


// EXPORTS //

module.exports = numGraphemeClusters;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/next-grapheme-cluster-break":146}],150:[function(require,module,exports){
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
* Pad a string.
*
* @module @stdlib/string/pad
*
* @example
* var pad = require( '@stdlib/string/pad' );
*
* var str = pad( 'a', 5 );
* // returns 'a    '
*
* str = pad( 'a', 10, {
*     'lpad': 'b'
* });
* // returns 'bbbbbbbbba'
*
* str = pad( 'a', 12, {
*     'rpad': 'b'
* });
* // returns 'abbbbbbbbbbb'
*
* var opts = {
*     'lpad': 'a',
*     'rpad': 'c'
* };
* str = pad( 'b', 10, opts );
* // returns 'aaaabccccc'
*
* opts = {
*     'lpad': 'a',
*     'rpad': 'c',
*     'centerRight': true
* };
* str = pad( 'b', 10, opts );
* // returns 'aaaaabcccc'
*/

// MODULES //

var pad = require( './pad.js' );


// EXPORTS //

module.exports = pad;

},{"./pad.js":151}],151:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var format = require( '@stdlib/string/format' );
var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var lpad = require( '@stdlib/string/left-pad' );
var rpad = require( '@stdlib/string/right-pad' );
var abs = require( '@stdlib/math/base/special/abs' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );
var validate = require( './validate.js' );


// MAIN //

/**
* Pads a string such that the padded string has a length of `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - string length
* @param {Options} [options] - function options
* @param {string} [options.lpad=''] - string used to left pad
* @param {string} [options.rpad=' '] - string used to right pad
* @param {boolean} [options.centerRight=false] - boolean indicating whether to center right in the event of a tie
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {RangeError} at least one padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = pad( 'a', 5 );
* // returns 'a    '
*
* @example
* var str = pad( 'a', 10, {
*     'lpad': 'b'
* });
* // returns 'bbbbbbbbba'
*
* @example
* var str = pad( 'a', 12, {
*     'rpad': 'b'
* });
* // returns 'abbbbbbbbbbb'
*
* @example
* var opts = {
*     'lpad': 'a',
*     'rpad': 'c'
* };
* var str = pad( 'b', 10, opts );
* // returns 'aaaabccccc'
*
* @example
* var opts = {
*     'lpad': 'a',
*     'rpad': 'c',
*     'centerRight': true
* };
* var str = pad( 'b', 10, opts );
* // returns 'aaaaabcccc'
*/
function pad( str, len, options ) {
	var nright;
	var nleft;
	var isodd;
	var right;
	var left;
	var opts;
	var err;
	var tmp;
	var n;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', len ) );
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( format( 'invalid argument. Output string length exceeds maximum allowed string length. Value: `%u`.', len ) );
	}
	opts = {};
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.lpad && opts.rpad ) {
		n = ( len-str.length ) / 2;
		if ( n === 0 ) {
			return str;
		}
		tmp = floor( n );
		if ( tmp !== n ) {
			isodd = true;
		}
		if ( n < 0 ) {
			n = floor( abs( n ) );
			nleft = n;
			nright = str.length - n;

			// If |len-str.length| is an odd number, take away an additional character from one side...
			if ( isodd ) {
				if ( opts.centerRight ) {
					nright -= 1;
				} else {
					nleft += 1;
				}
			}
			return str.substring( nleft, nright );
		}
		nleft = ceil( n / opts.lpad.length );
		left = repeat( opts.lpad, nleft );

		nright = ceil( n / opts.rpad.length );
		right = repeat( opts.rpad, nright );

		// If (len-str.length) is an odd number, give one side one extra character...
		n = tmp;
		nleft = n;
		nright = n;
		if ( isodd ) {
			if ( opts.centerRight ) {
				nleft += 1;
			} else {
				nright += 1;
			}
		}
		left = left.substring( 0, nleft );
		right = right.substring( 0, nright );
		return left + str + right;
	}
	if ( opts.lpad ) {
		tmp = lpad( str, len, opts.lpad );
		return tmp.substring( tmp.length-len );
	}
	if ( opts.rpad ) {
		return ( rpad( str, len, opts.rpad ) ).substring( 0, len );
	}
	if ( opts.rpad === void 0 ) {
		return ( rpad( str, len, ' ' ) ).substring( 0, len );
	}
	throw new RangeError( format( 'invalid argument. At least one padding option must have a length greater than 0. Left padding: `%s`. Right padding: `%s`.', opts.lpad, opts.rpad ) );
}


// EXPORTS //

module.exports = pad;

},{"./validate.js":152,"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/constants/float64/max-safe-integer":72,"@stdlib/math/base/special/abs":82,"@stdlib/math/base/special/ceil":84,"@stdlib/math/base/special/floor":86,"@stdlib/string/format":130,"@stdlib/string/left-pad":137,"@stdlib/string/repeat":169,"@stdlib/string/right-pad":175}],152:[function(require,module,exports){
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

var isPlainObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - options to validate
* @param {string} [options.lpad] - string used to left pad
* @param {string} [options.rpad] - string used to right pad
* @param {boolean} [options.centerRight] - boolean indicating whether to center right in the event of a tie
* @returns {(null|Error)} error object or null
*
* @example
* var opts = {};
* var options = {
*     'lpad': 'a',
*     'rpad': 'b'
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isPlainObject( options ) ) {
		return new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
	}
	if ( hasOwnProp( options, 'lpad' ) ) {
		opts.lpad = options.lpad;
		if ( !isString( opts.lpad ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a string. Option: `%s`.', 'lpad', opts.lpad ) );
		}
	}
	if ( hasOwnProp( options, 'rpad' ) ) {
		opts.rpad = options.rpad;
		if ( !isString( opts.rpad ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a string. Option: `%s`.', 'rpad', opts.rpad ) );
		}
	}
	if ( hasOwnProp( options, 'centerRight' ) ) {
		opts.centerRight = options.centerRight;
		if ( !isBoolean( opts.centerRight ) ) {
			return new TypeError( format( 'invalid option. `%s` option must be a boolean. Option: `%s`.', 'centerRight', opts.centerRight ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-boolean":15,"@stdlib/assert/is-plain-object":56,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],153:[function(require,module,exports){
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
* Convert a string to Pascal case.
*
* @module @stdlib/string/pascalcase
*
* @example
* var pascalcase = require( '@stdlib/string/pascalcase' );
*
* var str = pascalcase( 'foo bar' );
* // returns 'FooBar'
*
* str = pascalcase( '--foo-bar--' );
* // returns 'FooBar'
*
* str = pascalcase( 'Hello World!' );
* // returns 'HelloWorld'
*/

// MODULES //

var pascalcase = require( './main.js' );


// EXPORTS //

module.exports = pascalcase;

},{"./main.js":154}],154:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var capitalize = require( '@stdlib/string/capitalize' );
var lowercase = require( '@stdlib/string/lowercase' );
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );
var trim = require( '@stdlib/string/trim' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;
var RE_SPECIAL = /[-!"'(),–.:;<>?`{}|~\/\\\[\]_#$*&^@%]+/g; // eslint-disable-line no-useless-escape
var RE_TO_PASCAL = /(?:\s|^)([^\s]+)(?=\s|$)/g;
var RE_CAMEL = /([a-z0-9])([A-Z])/g;


// FUNCTIONS //

/**
* Callback invoked upon a match.
*
* @private
* @param {string} match - entire match
* @param {string} p1 - first capture group
* @returns {string} capitalized capture group
*/
function replacer( match, p1 ) {
	return capitalize( lowercase( p1 ) );
}


// MAIN //

/**
* Converts a string to Pascal case.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string primitive
* @returns {string} Pascal-cased string
*
* @example
* var out = pascalcase( 'foo bar' );
* // returns 'FooBar'
*
* @example
* var out = pascalcase( 'IS_MOBILE' );
* // returns 'IsMobile'
*
* @example
* var out = pascalcase( 'Hello World!' );
* // returns 'HelloWorld'
*
* @example
* var out = pascalcase( '--foo-bar--' );
* // returns 'FooBar'
*/
function pascalcase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	str = replace( str, RE_SPECIAL, ' ' );
	str = replace( str, RE_WHITESPACE, ' ' );
	str = replace( str, RE_CAMEL, '$1 $2' );
	str = trim( str );
	str = replace( str, RE_TO_PASCAL, replacer );
	return str;
}


// EXPORTS //

module.exports = pascalcase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/capitalize":123,"@stdlib/string/format":130,"@stdlib/string/lowercase":144,"@stdlib/string/replace":171,"@stdlib/string/trim":203}],155:[function(require,module,exports){
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
* Percent-encode a UTF-16 encoded string according to RFC 3986.
*
* @module @stdlib/string/percent-encode
*
* @example
* var percentEncode = require( '@stdlib/string/percent-encode' );
*
* var str1 = 'Ladies + Gentlemen';
*
* var str2 = percentEncode( str1 );
* // returns 'Ladies%20%2B%20Gentlemen'
*/

// MODULES //

var percentEncode = require( './percent_encode.js' );


// EXPORTS //

module.exports = percentEncode;

},{"./percent_encode.js":156}],156:[function(require,module,exports){
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
var utf16ToUTF8Array = require( '@stdlib/string/utf16-to-utf8-array' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

// Character codes:
var UNDERSCORE = 95|0;
var PERIOD = 46|0;
var HYPHEN = 45|0;
var TILDE = 126|0;
var ZERO = 48|0;
var NINE = 57|0;
var A = 65|0;
var Z = 90|0;
var a = 97|0;
var z = 122|0;


// MAIN //

/**
* Percent-encode a UTF-16 encoded string according to [RFC 3986][1].
*
* [1]: https://tools.ietf.org/html/rfc3986#section-2.1
*
* @param {string} str - string to percent-encode
* @throws {TypeError} must provide a string
* @returns {string} percent-encoded string
*
* @example
* var str1 = 'Ladies + Gentlemen';
*
* var str2 = percentEncode( str1 );
* // returns 'Ladies%20%2B%20Gentlemen'
*/
function percentEncode( str ) {
	var byte;
	var out;
	var len;
	var buf;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	// Convert to an array of octets using UTF-8 encoding (see https://tools.ietf.org/html/rfc3986#section-2.5):
	buf = utf16ToUTF8Array( str );

	// Encode the string...
	len = buf.length;
	out = '';
	for ( i = 0; i < len; i++ ) {
		byte = buf[ i ];
		if (
			// ASCII Digits:
			( byte >= ZERO && byte <= NINE ) ||

			// ASCII uppercase letters:
			( byte >= A && byte <= Z ) ||

			// ASCII lowercase letters:
			( byte >= a && byte <= z ) ||

			// ASCII unreserved characters (see https://tools.ietf.org/html/rfc3986#section-2.3):
			byte === HYPHEN ||
			byte === PERIOD ||
			byte === UNDERSCORE ||
			byte === TILDE
		) {
			out += str.charAt( i );
		} else {
			// Convert an octet to hexadecimal and uppercase according to the RFC (see https://tools.ietf.org/html/rfc3986#section-2.1):
			out += '%' + byte.toString( 16 ).toUpperCase();
		}
	}
	return out;
}


// EXPORTS //

module.exports = percentEncode;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/utf16-to-utf8-array":213}],157:[function(require,module,exports){
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
* Return the prev extended grapheme cluster break in a string before a specified position.
*
* @module @stdlib/string/prev-grapheme-cluster-break
*
* @example
* var prevGraphemeClusterBreak = require( '@stdlib/string/prev-grapheme-cluster-break' );
*
* var out = prevGraphemeClusterBreak( 'अनुच्छेद', 2 );
* // returns 0
*
* out = prevGraphemeClusterBreak( '🌷', 1 );
* // returns -1
*/

// MODULES //

var prevGraphemeClusterBreak = require( './main.js' );


// EXPORTS //

module.exports = prevGraphemeClusterBreak;

},{"./main.js":158}],158:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' );
var codePointAt = require( '@stdlib/string/code-point-at' );
var hasUTF16SurrogatePairAt = require( '@stdlib/assert/has-utf16-surrogate-pair-at' );
var grapheme = require( '@stdlib/string/tools/grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

var breakType = grapheme.breakType;
var breakProperty = grapheme.breakProperty;
var emojiProperty = grapheme.emojiProperty;


// MAIN //

/**
* Returns the previous extended grapheme cluster break in a string before a specified position.
*
* @param {string} str - input string
* @param {integer} [fromIndex=str.length-1] - position
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be an integer
* @returns {NonNegativeInteger} previous grapheme break position
*
* @example
* var out = prevGraphemeClusterBreak( 'last man standing', 4 );
* // returns 3
*
* @example
* var out = prevGraphemeClusterBreak( 'presidential election', 8 );
* // returns 7
*
* @example
* var out = prevGraphemeClusterBreak( 'अनुच्छेद', 2 );
* // returns 0
*
* @example
* var out = prevGraphemeClusterBreak( '🌷', 1 );
* // returns -1
*/
function prevGraphemeClusterBreak( str, fromIndex ) {
	var breaks;
	var emoji;
	var ans;
	var len;
	var idx;
	var cp;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	len = str.length;
	if ( arguments.length > 1 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be an integer. Value: `%s`.', fromIndex ) );
		}
		idx = fromIndex;
	} else {
		idx = len - 1;
	}
	if ( len === 0 || idx <= 0 ) {
		return -1;
	}
	if ( idx >= len ) {
		idx = len - 1;
	}

	// Initialize caches for storing grapheme break and emoji properties:
	breaks = [];
	emoji = [];

	// Get the code point for the starting index:
	cp = codePointAt( str, 0 );

	// Get the corresponding grapheme break and emoji properties:
	breaks.push( breakProperty( cp ) );
	emoji.push( emojiProperty( cp ) );

	ans = -1;
	for ( i = 1; i <= idx; i++ ) {
		// If the current character is part of a surrogate pair, move along...
		if ( hasUTF16SurrogatePairAt( str, i-1 ) ) {
			ans = i-2;
			breaks.length = 0;
			emoji.length = 0;
			continue;
		}
		cp = codePointAt( str, i );

		// Get the corresponding grapheme break and emoji properties:
		breaks.push( breakProperty( cp ) );
		emoji.push( emojiProperty( cp ) );

		// Determine if we've encountered a grapheme cluster break...
		if ( breakType( breaks, emoji ) > 0 ) {
			ans = i-1;
			breaks.length = 0;
			emoji.length = 0;
			continue;
		}
	}
	return ans;
}


// EXPORTS //

module.exports = prevGraphemeClusterBreak;

},{"@stdlib/assert/has-utf16-surrogate-pair-at":7,"@stdlib/assert/is-integer":33,"@stdlib/assert/is-string":63,"@stdlib/string/code-point-at":124,"@stdlib/string/format":130,"@stdlib/string/tools/grapheme-cluster-break":202}],159:[function(require,module,exports){
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
* Remove the first character(s) of a string.
*
* @module @stdlib/string/remove-first
*
* @example
* var removeFirst = require( '@stdlib/string/remove-first' );
*
* var out = removeFirst( 'last man standing' );
* // returns 'ast man standing'
*
* out = removeFirst( 'Hidden Treasures' );
* // returns 'idden Treasures';
*
* out = removeFirst( '🐮🐷🐸🐵', 2 );
* // returns '🐸🐵
*/

// MODULES //

var removeFirst = require( './main.js' );


// EXPORTS //

module.exports = removeFirst;

},{"./main.js":160}],160:[function(require,module,exports){
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
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var nextGraphemeClusterBreak = require( '@stdlib/string/next-grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Removes the first character(s) of a string.
*
* @param {string} str - input string
* @param {NonNegativeInteger} [n=1] - number of characters to remove
* @throws {TypeError} must provide a string primitive
* @throws {TypeError} second argument must be a nonnegative integer
* @returns {string} updated string
*
* @example
* var out = removeFirst( 'last man standing' );
* // returns 'ast man standing'
*
* @example
* var out = removeFirst( 'presidential election' );
* // returns 'residential election'
*
* @example
* var out = removeFirst( 'javaScript' );
* // returns 'avaScript'
*
* @example
* var out = removeFirst( 'Hidden Treasures' );
* // returns 'idden Treasures'
*
* @example
* var out = removeFirst( '🐶🐮🐷🐰🐸', 2 );
* // returns '🐷🐰🐸'
*
* @example
* var out = removeFirst( 'foo bar', 4 );
* // returns 'bar'
*/
function removeFirst( str, n ) {
	var nextBreak;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( n ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', n ) );
		}
		nextBreak = 0;
		while ( n > 0 ) {
			nextBreak = nextGraphemeClusterBreak( str, nextBreak );
			n -= 1;
		}
	}
	else {
		nextBreak = nextGraphemeClusterBreak( str );
	}
	// Value of `nextBreak` will be -1 if and only if `str` is an empty string or `str` has only 1 extended grapheme cluster...
	if ( str === '' || nextBreak === -1 ) {
		return '';
	}
	return str.substring( nextBreak );
}


// EXPORTS //

module.exports = removeFirst;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/next-grapheme-cluster-break":146}],161:[function(require,module,exports){
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
* Remove the last character(s) of a string.
*
* @module @stdlib/string/remove-last
*
* @example
* var removeLast = require( '@stdlib/string/remove-last' );
*
* var out = removeLast( 'last man standing' );
* // returns 'last man standin'
*
* out = removeLast( 'Hidden Treasures' );
* // returns 'Hidden Treasure';
*
* out = removeLast( '🐮🐷🐸🐵', 2 ) );
* // returns '🐮🐷'
*/

// MODULES //

var removeLast = require( './main.js' );


// EXPORTS //

module.exports = removeLast;

},{"./main.js":162}],162:[function(require,module,exports){
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
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var prevGraphemeClusterBreak = require( '@stdlib/string/prev-grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Removes the last character(s) of a string.
*
* @param {string} str - input string
* @param {NonNegativeInteger} [n=1] - number of character to remove
* @throws {TypeError} must provide a string primitive
* @throws {TypeError} second argument must be a nonnegative integer
* @returns {string} updated string
*
* @example
* var out = removeLast( 'last man standing' );
* // returns 'last man standin'
*
* @example
* var out = removeLast( 'presidential election' );
* // returns 'presidential electio'
*
* @example
* var out = removeLast( 'javaScript' );
* // returns 'javaScrip'
*
* @example
* var out = removeLast( 'Hidden Treasures' );
* // returns 'Hidden Treasure'
*
* @example
* var out = removeLast( 'leader', 2 );
* // returns 'lead'
*/
function removeLast( str, n ) {
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( str === '' ) {
		return '';
	}
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( n ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', n ) );
		}
		if ( n === 0 ) {
			return str;
		}
		i = str.length - 1;
		while ( n > 0 ) {
			i = prevGraphemeClusterBreak( str, i );
			n -= 1;
		}
		return str.substring( 0, i + 1 );
	}
	return str.substring( 0, prevGraphemeClusterBreak( str, str.length-1 ) + 1 ); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = removeLast;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/prev-grapheme-cluster-break":157}],163:[function(require,module,exports){
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
* Remove punctuation characters from a string.
*
* @module @stdlib/string/remove-punctuation
*
* @example
* var removePunctuation = require( '@stdlib/string/remove-punctuation' );
*
* var out = removePunctuation( 'Sun Tzu said: "A leader leads by example not by force."' );
* // returns 'Sun Tzu said A leader leads by example not by force'
*
* out = removePunctuation( 'Double, double, toil and trouble; Fire burn, and cauldron bubble!' ) );
* // returns 'Double double toil and trouble Fire burn and cauldron bubble'
*/

// MODULES //

var removePunctuation = require( './remove_punctuation.js' );


// EXPORTS //

module.exports = removePunctuation;

},{"./remove_punctuation.js":164}],164:[function(require,module,exports){
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
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

var RE = /[!"'(),–.:;<>?`{}|~\/\\\[\]]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Removes punctuation characters from a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} output string
*
* @example
* var str = 'Sun Tzu said: "A leader leads by example not by force."';
* var out = removePunctuation( str );
* // returns 'Sun Tzu said A leader leads by example not by force'
*
* @example
* var str = 'Double, double, toil and trouble; Fire burn, and cauldron bubble!';
* var out = removePunctuation( str );
* // returns 'Double double toil and trouble Fire burn and cauldron bubble'
*
* @example
* var str = 'This module removes these characters: `{}[]:,!/<>().;~|?\'"';
* var out = removePunctuation( str );
* // returns 'This module removes these characters '
*/
function removePunctuation( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	return replace( str, RE, '' );
}


// EXPORTS //

module.exports = removePunctuation;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/replace":171}],165:[function(require,module,exports){
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
* Remove a UTF-8 byte order mark (BOM) from the beginning of a string.
*
* @module @stdlib/string/remove-utf8-bom
*
* @example
* var removeUTF8BOM = require( '@stdlib/string/remove-utf8-bom' );
*
* var str = removeUTF8BOM( '\ufeffbeep' );
* // returns 'beep'
*/

// MODULES //

var removeUTF8BOM = require( './remove_utf_8_bom.js' );


// EXPORTS //

module.exports = removeUTF8BOM;

},{"./remove_utf_8_bom.js":166}],166:[function(require,module,exports){
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


// VARIABLES //

// '\ufeff' => 1111111011111111 => 0xFEFF => 65279
var BOM = 65279;


// MAIN //

/**
* Removes a UTF-8 byte order mark (BOM) from the beginning of a string.
*
* ## Notes
*
* -   A UTF-8 byte order mark ([BOM][1]) is the byte sequence `0xEF,0xBB,0xBF`.
* -   To convert a UTF-8 encoded `Buffer` to a `string`, the `Buffer` must be converted to [UTF-16][2]. The BOM thus gets converted to the single 16-bit code point `'\ufeff'` (UTF-16 BOM).
*
* [1]: https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
* [2]: http://es5.github.io/#x4.3.16
*
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} string with BOM removed
*
* @example
* var str = removeUTF8BOM( '\ufeffbeep' );
* // returns 'beep'
*/
function removeUTF8BOM( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	if ( str.charCodeAt( 0 ) === BOM ) {
		return str.slice( 1 );
	}
	return str;
}


// EXPORTS //

module.exports = removeUTF8BOM;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],167:[function(require,module,exports){
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
* Remove a list of words from a string.
*
* @module @stdlib/string/remove-words
*
* @example
* var removeWords = require( '@stdlib/string/remove-words' );
*
* var str = 'beep boop Foo bar';
* var words = [ 'boop', 'foo' ];
*
* var out = removeWords( str, words );
* // returns 'beep  Foo bar'
*
* // Case-insensitive:
* out = removeWords( str, words, true )
* //returns 'beep   bar'
*/

// MODULES //

var removeWords = require( './remove_words.js' );


// EXPORTS //

module.exports = removeWords;

},{"./remove_words.js":168}],168:[function(require,module,exports){
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

var isStringArray = require( '@stdlib/assert/is-string-array' );
var uppercase = require( '@stdlib/string/uppercase' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var tokenize = require( '@stdlib/nlp/tokenize' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Removes a list of words from a string.
*
* @param {string} str - input string
* @param {StringArray} words - array of words to be removed
* @param {boolean} [ignoreCase=false] - boolean indicating whether to perform a case-insensitive operation
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be an array of strings
* @throws {TypeError} third argument must be a boolean
* @returns {string} output string
*
* @example
* var str = 'beep boop Foo bar';
* var out = removeWords( str, [ 'boop', 'foo' ] );
* // returns 'beep  Foo bar'
*
* @example
* var str = 'beep boop Foo bar';
* var out = removeWords( str, [ 'boop', 'foo' ], true );
* // returns 'beep   bar'
*/
function removeWords( str, words, ignoreCase ) {
	var tokens;
	var token;
	var list;
	var flg;
	var out;
	var N;
	var i;
	var j;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isStringArray( words ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be an array of strings. Value: `%s`.', words ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isBoolean( ignoreCase ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a boolean. Value: `%s`.', ignoreCase ) );
		}
	}
	tokens = tokenize( str, true );
	N = words.length;
	out = [];
	if ( ignoreCase ) {
		list = words.slice();
		for ( i = 0; i < N; i++ ) {
			list[ i ] = uppercase( list[ i ] );
		}
		for ( i = 0; i < tokens.length; i++ ) {
			flg = true;
			token = uppercase( tokens[ i ] );
			for ( j = 0; j < N; j++ ) {
				if ( list[ j ] === token ) {
					flg = false;
					break;
				}
			}
			if ( flg ) {
				out.push( tokens[ i ] );
			}
		}
		return out.join( '' );
	}
	// Case: case-sensitive
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		flg = true;
		for ( j = 0; j < N; j++ ) {
			if ( words[ j ] === token ) {
				flg = false;
				break;
			}
		}
		if ( flg ) {
			out.push( token );
		}
	}
	return out.join( '' );
}


// EXPORTS //

module.exports = removeWords;

},{"@stdlib/assert/is-boolean":15,"@stdlib/assert/is-string":63,"@stdlib/assert/is-string-array":62,"@stdlib/nlp/tokenize":93,"@stdlib/string/format":130,"@stdlib/string/uppercase":211}],169:[function(require,module,exports){
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
* Repeat a string a specified number of times and return the concatenated result.
*
* @module @stdlib/string/repeat
*
* @example
* var replace = require( '@stdlib/string/repeat' );
*
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* str = repeat( '', 100 );
* // returns ''
*
* str = repeat( 'beep', 0 );
* // returns ''
*/

// MODULES //

var repeat = require( './repeat.js' );


// EXPORTS //

module.exports = repeat;

},{"./repeat.js":170}],170:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Repeats a string a specified number of times and returns the concatenated result.
*
* ## Method
*
* The algorithmic trick used in the implementation is to treat string concatenation the same as binary addition (i.e., any natural number (nonnegative integer) can be expressed as a sum of powers of two).
*
* For example,
*
* ```text
* n = 10 => 1010 => 2^3 + 2^0 + 2^1 + 2^0
* ```
*
* We can produce a 10-repeat string by "adding" the results of a 8-repeat string and a 2-repeat string.
*
* The implementation is then as follows:
*
* 1.  Let `s` be the string to be repeated and `o` be an output string.
*
* 2.  Initialize an output string `o`.
*
* 3.  Check the least significant bit to determine if the current `s` string should be "added" to the output "total".
*
*     -   if the bit is a one, add
*     -   otherwise, move on
*
* 4.  Double the string `s` by adding `s` to `s`.
*
* 5.  Right-shift the bits of `n`.
*
* 6.  Check if we have shifted off all bits.
*
*     -   if yes, done.
*     -   otherwise, move on
*
* 7.  Repeat 3-6.
*
* The result is that, as the string is repeated, we continually check to see if the doubled string is one which we want to add to our "total".
*
* The algorithm runs in `O(log_2(n))` compared to `O(n)`.
*
*
* @param {string} str - string to repeat
* @param {NonNegativeInteger} n - number of times to repeat the string
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {RangeError} output string length must not exceed maximum allowed string length
* @returns {string} repeated string
*
* @example
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* @example
* var str = repeat( '', 100 );
* // returns ''
*
* @example
* var str = repeat( 'beep', 0 );
* // returns ''
*/
function repeat( str, n ) {
	var rpt;
	var cnt;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', n ) );
	}
	if ( str.length === 0 || n === 0 ) {
		return '';
	}
	// Check that output string will not exceed the maximum string length:
	if ( str.length * n > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( format( 'invalid argument. Output string length exceeds maximum allowed string length. Value: `%u`.', str.length * n ) );
	}
	rpt = '';
	cnt = n;
	for ( ; ; ) {
		// If the count is odd, append the current concatenated string:
		if ( (cnt&1) === 1 ) {
			rpt += str;
		}
		// Right-shift the bits:
		cnt >>>= 1;
		if ( cnt === 0 ) {
			break;
		}
		// Double the string:
		str += str;
	}
	return rpt;
}


// EXPORTS //

module.exports = repeat;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/constants/float64/max-safe-integer":72,"@stdlib/string/format":130}],171:[function(require,module,exports){
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
* Replace search occurrences with a replacement string.
*
* @module @stdlib/string/replace
*
* @example
* var replace = require( '@stdlib/string/replace' );
*
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* str = 'Hello World';
* out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*/

// MODULES //

var replace = require( './replace.js' );


// EXPORTS //

module.exports = replace;

},{"./replace.js":172}],172:[function(require,module,exports){
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

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegExp = require( '@stdlib/assert/is-regexp' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Replace search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {(string|RegExp)} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument argument must be a string or regular expression
* @throws {TypeError} third argument must be a string or function
* @returns {string} new string containing replacement(s)
*
* @example
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* @example
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*
* @example
* var capitalize = require( '@stdlib/string/capitalize' );
*
* var str = 'Oranges and lemons say the bells of St. Clement\'s';
*
* function replacer( match, p1 ) {
*     return capitalize( p1 );
* }
*
* var out = replace( str, /([^\s]*)/gi, replacer);
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegExp( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string or regular expression. Value: `%s`.', search ) );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( format( 'invalid argument. Third argument must be a string or replacement function. Value: `%s`.', newval ) );
	}
	return str.replace( search, newval );
}


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":31,"@stdlib/assert/is-regexp":59,"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/utils/escape-regexp-string":226}],173:[function(require,module,exports){
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
* Reverse a string.
*
* @module @stdlib/string/reverse
*
* @example
* var reverseString = require( '@stdlib/string/reverse' );
*
* var out = reverseString( 'last man standing' );
* // returns 'gnidnats nam tsal'
*
* out = reverseString( 'Hidden Treasures' );
* // returns 'serusaerT neddiH';
*/

// MODULES //

var reverseString = require( './main.js' );


// EXPORTS //

module.exports = reverseString;

},{"./main.js":174}],174:[function(require,module,exports){
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

var prevGraphemeClusterBreak = require( '@stdlib/string/prev-grapheme-cluster-break' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Reverses a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} reversed string
*
* @example
* var out = reverse( 'last man standing' );
* // returns 'gnidnats nam tsal'
*
* @example
* var out = reverse( 'presidential election' );
* // returns 'noitcele laitnediserp'
*
* @example
* var out = reverse( 'javaScript' );
* // returns 'tpircSavaj'
*
* @example
* var out = reverse( 'Hidden Treasures' );
* // returns 'serusaerT neddiH'
*/
function reverse( str ) {
	var out;
	var brk;
	var idx;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( str === '' ) {
		return '';
	}

	out = [];
	idx = str.length - 1;
	while ( idx >= 0 ) {
		brk = prevGraphemeClusterBreak( str, idx );
		for ( i = brk + 1; i <= idx; i++ ) {
			out.push( str.charAt( i ) );
		}
		idx = brk;
	}
	return out.join( '' );
}


// EXPORTS //

module.exports = reverse;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/prev-grapheme-cluster-break":157}],175:[function(require,module,exports){
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
* Right pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/right-pad
*
* @example
* var rpad = require( '@stdlib/string/right-pad' );
*
* var str = rpad( 'a', 5 );
* // returns 'a    '
*
* str = rpad( 'beep', 10, 'p' );
* // returns 'beeppppppp'
*
* str = rpad( 'beep', 12, 'boop' );
* // returns 'beepboopboop'
*/

// MODULES //

var rpad = require( './right_pad.js' );


// EXPORTS //

module.exports = rpad;

},{"./right_pad.js":176}],176:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var format = require( '@stdlib/string/format' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );


// MAIN //

/**
* Right pads a string such that the padded string has a length of at least `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - minimum string length
* @param {string} [pad=' '] - string used to pad
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @throws {RangeError} padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = rpad( 'a', 5 );
* // returns 'a    '
*
* @example
* var str = rpad( 'beep', 10, 'p' );
* // returns 'beeppppppp'
*
* @example
* var str = rpad( 'beep', 12, 'boop' );
* // returns 'beepboopboop'
*/
function rpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', len ) );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a string. Value: `%s`.', p ) );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Pad string must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( format( 'invalid argument. Output string length exceeds maximum allowed string length. Value: `%u`.', len ) );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return str + repeat( p, n );
}


// EXPORTS //

module.exports = rpad;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/constants/float64/max-safe-integer":72,"@stdlib/math/base/special/ceil":84,"@stdlib/string/format":130,"@stdlib/string/repeat":169}],177:[function(require,module,exports){
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
* Trim `n` characters from the end of a string.
*
* @module @stdlib/string/right-trim-n
*
* @example
* var rtrimN = require( '@stdlib/string/right-trim-n' );
*
* var str = '  foo  ';
* var out = rtrimN( str, str.length );
* // returns '  foo'
*
* str = '🐶🐶🐶 Animals 🐶🐶🐶';
* out = rtrimN( str, 4, [ '🐶', ' ' ] );
* // returns '🐶🐶🐶 Animals'
*/

// MODULES //

var rtrimN = require( './main.js' );


// EXPORTS //

module.exports = rtrimN;

},{"./main.js":178}],178:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var splitGraphemeClusters = require( '@stdlib/string/split-grapheme-clusters' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var replace = require( '@stdlib/string/replace' );
var rescape = require( '@stdlib/utils/escape-regexp-string' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

var WHITESPACE_CHARS = '\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';


// MAIN //

/**
* Trims `n` characters from the end of a string.
*
* @param {string} str - input string
* @param {NonNegativeInteger} n - number of characters to trim
* @param {(string|StringArray)} [chars] - characters to trim (defaults to whitespace characters)
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string or an array of strings
* @returns {string} trimmed string
*
* @example
* var str = '   abc   ';
* var out = rtrimN( str, 2 );
* // returns '   abc '
*
* @example
* var str = '   abc   ';
* var out = rtrimN( str, str.length );
* // returns '   abc'
*
* @example
* var str = '~~abc!~~';
* var out = rtrimN( str, str.length, [ '~', '!' ] );
* // returns '~~abc'
*
* @example
* var str = '🤖👨🏼‍🎨🤖👨🏼‍🎨🤖👨🏼‍🎨';
* var out = rtrimN( str, str.length, '👨🏼‍🎨🤖' );
* // returns ''
*/
function rtrimN( str, n, chars ) {
	var nElems;
	var reStr;
	var isStr;
	var RE;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a nonnegative integer. Value: `%s`.', n ) );
	}
	if ( arguments.length > 2 ) {
		isStr = isString( chars );
		if ( !isStr && !isStringArray( chars ) ) {
			throw new TypeError( format( 'invalid argument. Must provide a string or an array of strings. Value: `%s`.', chars ) );
		}
		if ( isStr ) {
			chars = splitGraphemeClusters( chars );
		}
		nElems = chars.length - 1;
		reStr = '';
		for ( i = 0; i < nElems; i++ ) {
			reStr += rescape( chars[ i ] );
			reStr += '|';
		}
		reStr += rescape( chars[ nElems ] );

		// Case: Trim a specific set of characters from the end of a string..
		RE = new RegExp( '(?:' + reStr + '){0,'+n+'}$' );
	} else {
		// Case: Trim `n` whitespace characters from the end of a string...
		RE = new RegExp( '[' + WHITESPACE_CHARS + ']{0,'+n+'}$' );
	}
	return replace( str, RE, '' );
}


// EXPORTS //

module.exports = rtrimN;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/assert/is-string-array":62,"@stdlib/string/format":130,"@stdlib/string/replace":171,"@stdlib/string/split-grapheme-clusters":183,"@stdlib/utils/escape-regexp-string":226}],179:[function(require,module,exports){
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
* Trim whitespace characters from the end of a string.
*
* @module @stdlib/string/right-trim
*
* @example
* var rtrim = require( '@stdlib/string/right-trim' );
*
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/

// MODULES //

var rtrim = require( './right_trim.js' );


// EXPORTS //

module.exports = rtrim;

},{"./right_trim.js":180}],180:[function(require,module,exports){
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
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+$/;


// MAIN //

/**
* Trims whitespace from the end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* @example
* var out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* @example
* var out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/
function rtrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	return replace( str, RE, '' );
}


// EXPORTS //

module.exports = rtrim;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/replace":171}],181:[function(require,module,exports){
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
* Convert a string to snake case.
*
* @module @stdlib/string/snakecase
*
* @example
* var snakecase = require( '@stdlib/string/snakecase' );
*
* var str = snakecase( 'Foo Bar' );
* // returns 'foo_bar'
*
* str = snakecase( 'I am a tiny little house' );
* // returns 'i_am_a_tiny_little_house'
*/

// MODULES //

var snakecase = require( './main.js' );


// EXPORTS //

module.exports = snakecase;

},{"./main.js":182}],182:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var lowercase = require( '@stdlib/string/lowercase' );
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );
var trim = require( '@stdlib/string/trim' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;
var RE_SPECIAL = /[\-!"'(),–.:;<>?`{}|~\/\\\[\]_#$*&^@%]+/g; // eslint-disable-line no-useless-escape
var RE_CAMEL = /([a-z0-9])([A-Z])/g;


// MAIN //

/**
* Converts a string to snake case.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string primitive
* @returns {string} snake-cased string
*
* @example
* var str = snakecase( 'Hello World!' );
* // returns 'hello_world'
*
* @example
* var str = snakecase( 'foo bar' );
* // returns 'foo_bar'
*
* @example
* var str = snakecase( 'I am a tiny little teapot' );
* // returns 'i_am_a_tiny_little_teapot'
*
* @example
* var str = snakecase( 'BEEP boop' );
* // returns 'beep_boop'
*
* @example
* var str = snakecase( 'isMobile' );
* // returns 'is_mobile'
*/
function snakecase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	str = replace( str, RE_SPECIAL, ' ' );
	str = replace( str, RE_CAMEL, '$1 $2' );
	str = trim( str );
	str = replace( str, RE_WHITESPACE, '_' );
	return lowercase( str );
}


// EXPORTS //

module.exports = snakecase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/lowercase":144,"@stdlib/string/replace":171,"@stdlib/string/trim":203}],183:[function(require,module,exports){
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
* Split a string by its grapheme cluster breaks.
*
* @module @stdlib/string/split-grapheme-clusters
*
* @example
* var splitGraphemeClusters = require( '@stdlib/string/split-grapheme-clusters' );
*
* var out = splitGraphemeClusters( 'café' );
* // returns [ 'c', 'a', 'f', 'é' ]
*
* out = splitGraphemeClusters( '🍕🍕🍕' );
* // returns [ '🍕', '🍕', '🍕' ]
*/

// MODULES //

var splitGraphemeClusters = require( './main.js' );


// EXPORTS //

module.exports = splitGraphemeClusters;

},{"./main.js":184}],184:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var nextGraphemeClusterBreak = require( '@stdlib/string/next-grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Splits a string by its grapheme cluster breaks.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {StringArray} array of grapheme clusters
*
* @example
* var out = splitGraphemeClusters( 'café' );
* // returns [ 'c', 'a', 'f', 'é' ]
*
* @example
* var out = splitGraphemeClusters( '🍕🍕🍕' );
* // returns [ '🍕', '🍕', '🍕' ]
*/
function splitGraphemeClusters( str ) {
	var idx;
	var brk;
	var out;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	idx = 0;
	out = [];
	if ( str.length === 0 ) {
		return out;
	}
	brk = nextGraphemeClusterBreak( str, idx );
	while ( brk !== -1 ) {
		out.push( str.substring( idx, brk ) );
		idx = brk;
		brk = nextGraphemeClusterBreak( str, idx );
	}
	out.push( str.substring( idx ) );
	return out;
}


// EXPORTS //

module.exports = splitGraphemeClusters;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/next-grapheme-cluster-break":146}],185:[function(require,module,exports){
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
* Capitalize the first letter of each word in an input string.
*
* @module @stdlib/string/startcase
*
* @example
* var startcase = require( '@stdlib/string/startcase' );
*
* var str = startcase( 'beep boop foo bar' );
* // returns 'Beep Boop Foo Bar'
*/

// MODULES //

var startcase = require( './startcase.js' );


// EXPORTS //

module.exports = startcase;

},{"./startcase.js":186}],186:[function(require,module,exports){
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
var reWhitespace = require( '@stdlib/regexp/whitespace' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Capitalizes the first letter of each word in an input string.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string
* @returns {string} start case string
*
* @example
* var str = startcase( 'beep boop foo bar' );
* // returns 'Beep Boop Foo Bar'
*/
function startcase( str ) {
	var cap;
	var out;
	var ch;
	var i;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	cap = true;
	out = '';
	for ( i = 0; i < str.length; i++ ) {
		ch = str.charAt( i );
		if ( reWhitespace.REGEXP.test( ch ) ) {
			out += ch;
			cap = true;
		} else if ( cap ) {
			out += ch.toUpperCase();
			cap = false;
		} else {
			out += ch;
		}
	}
	return out;
}


// EXPORTS //

module.exports = startcase;

},{"@stdlib/assert/is-string":63,"@stdlib/regexp/whitespace":100,"@stdlib/string/format":130}],187:[function(require,module,exports){
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

},{"./starts_with.js":188}],188:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":33,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],189:[function(require,module,exports){
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
* Return the part of a string after the last occurrence of a specified substring.
*
* @module @stdlib/string/substring-after-last
*
* @example
* var substringAfterLast = require( '@stdlib/string/substring-after-last' );
*
* var str = 'beep boop';
* var out = substringAfterLast( str, 'b' ):
* // returns 'oop'
*
* out = substringAfterLast( str, 'o' ):
* // returns 'p'
*/

// MODULES //

var substringAfterLast = require( './main.js' );


// EXPORTS //

module.exports = substringAfterLast;

},{"./main.js":190}],190:[function(require,module,exports){
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

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns the part of a string after the last occurrence of a specified substring.
*
* @param {string} str - input string
* @param {string} search - search value
* @param {integer} [fromIndex=str.length] - index of last character to be considered beginning of a match
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} third argument must be an integer
* @returns {string} substring
*
* @example
* var out = substringAfterLast( 'beep boop', 'b' );
* // returns 'oop'
*
* @example
* var out = substringAfterLast( 'beep boop', 'o' );
* // returns 'p'
*
* @example
* var out = substringAfterLast( 'Hello World', 'o' );
* // returns 'rld'
*
* @example
* var out = substringAfterLast( 'Hello World', '!' );
* // returns ''
*
* @example
* var out = substringAfterLast( 'Hello World', '' );
* // returns ''
*
* @example
* var out = substringAfterLast( 'beep boop baz', 'p b', 6 );
* // returns 'oop baz'
*/
function substringAfterLast( str, search, fromIndex ) {
	var idx;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isString( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', search ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a nonnegative integer. Value: `%s`.', fromIndex ) );
		}
		idx = str.lastIndexOf( search, fromIndex );
	} else {
		idx = str.lastIndexOf( search );
	}
	if ( idx === -1 ) {
		return '';
	}
	return str.substring( idx+search.length );
}


// EXPORTS //

module.exports = substringAfterLast;

},{"@stdlib/assert/is-integer":33,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],191:[function(require,module,exports){
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
* Return the part of a string after a specified substring.
*
* @module @stdlib/string/substring-after
*
* @example
* var substringAfter = require( '@stdlib/string/substring-after' );
*
* var str = 'beep boop';
* var out = substringAfter( str, 'o' );
* // returns 'op'
*
* out = substringAfter( str, ' ' );
* // returns 'boop'
*/

// MODULES //

var substringAfter = require( './main.js' );


// EXPORTS //

module.exports = substringAfter;

},{"./main.js":192}],192:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns the part of a string after a specified substring.
*
* @param {string} str - input string
* @param {string} search - search string
* @param {integer} [fromIndex=0] - index at which to start the search
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} third argument must be an integer
* @returns {string} substring
*
* @example
* var out = substringAfter( 'Hello, world!', ', ' );
* // returns 'world!'
*
* @example
* var out = substringAfter( 'beep boop', 'beep' );
* // returns ' boop'
*
* @example
* var out = substringAfter( 'beep boop', 'boop' );
* // returns ''
*
* @example
* var out = substringAfter( 'beep boop', 'xyz' );
* // returns ''
*
* @example
* var out = substringAfter( 'beep boop', 'beep', 5 );
* // returns ''
*
* @example
* var out = substringAfter( 'beep boop beep baz', 'beep', 5 );
* // returns ' baz'
*/
function substringAfter( str, search, fromIndex ) {
	var idx;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isString( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', search ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be an integer. Value: `%s`.', fromIndex ) );
		}
		idx = str.indexOf( search, fromIndex );
	} else {
		idx = str.indexOf( search );
	}
	if ( idx === -1 ) {
		return '';
	}
	return str.substring( idx+search.length );
}


// EXPORTS //

module.exports = substringAfter;

},{"@stdlib/assert/is-integer":33,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],193:[function(require,module,exports){
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
* Return the part of a string before the last occurrence of a specified substring.
*
* @module @stdlib/string/substring-before-last
*
* @example
* var substringBeforeLast = require( '@stdlib/string/substring-before-last' );
*
* var str = 'Beep Boop Beep';
* var out = substringBeforeLast( str, 'Beep' );
* // returns 'Beep Boop '
*
* out = substringBeforeLast( str, 'Boop' );
* // returns 'Beep '
*/

// MODULES //

var substringBeforeLast = require( './main.js' );


// EXPORTS //

module.exports = substringBeforeLast;

},{"./main.js":194}],194:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns the part of a string before the last occurrence of a specified substring.
*
* @param {string} str - input string
* @param {string} search - search value
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @returns {string} substring
*
* @example
* var out = substringBeforeLast( 'abcba', 'b' );
* // returns 'abc'
*
* @example
* var out = substringBeforeLast( 'Hello World, my friend!', ' ' );
* // returns 'Hello World, my'
*
* @example
* var out = substringBeforeLast( 'abcba', ' ' );
* // returns 'abcba'
*
* @example
* var out = substringBeforeLast( 'abcba', '' );
* // returns 'abcba'
*/
function substringBeforeLast( str, search ) {
	var idx;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isString( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', search ) );
	}
	idx = str.lastIndexOf( search );
	if ( idx === -1 ) {
		return str;
	}
	return str.substring( 0, idx );
}


// EXPORTS //

module.exports = substringBeforeLast;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],195:[function(require,module,exports){
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
* Return the part of a string before a specified substring.
*
* @module @stdlib/string/substring-before
*
* @example
* var substringBefore = require( '@stdlib/string/substring-before' );
*
* var str = 'beep boop';
* var out = substringBefore( str, ' ' );
* // returns 'beep'
*
* out = substringBefore( str, 'o' );
* // returns 'beep b'
*/

// MODULES //

var substringBefore = require( './main.js' );


// EXPORTS //

module.exports = substringBefore;

},{"./main.js":196}],196:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns the part of a string before a specified substring.
*
* @param {string} str - input string
* @param {string} search - search string
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @returns {string} substring
*
* @example
* var out = substringBefore( 'beep boop', ' ' );
* // returns 'beep'
*
* @example
* var out = substringBefore( 'beep boop', 'p' );
* // returns 'bee'
*
* @example
* var out = substringBefore( 'Hello World!', '' );
* // returns ''
*
* @example
* var out = substringBefore( 'Hello World!', 'XYZ' );
* // returns 'Hello World!'
*/
function substringBefore( str, search ) {
	var idx;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isString( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', search ) );
	}
	idx = str.indexOf( search );
	if ( idx === -1 ) {
		return str;
	}
	return str.substring( 0, idx );
}


// EXPORTS //

module.exports = substringBefore;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],197:[function(require,module,exports){
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
var objectKeys = require( '@stdlib/utils/keys' );
var string = require( './../lib' );


// TESTS //

tape( 'main export is an object', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof string, 'object', 'main export is an object' );
	t.end();
});

tape( 'the exported object contains string manipulation functionality', function test( t ) {
	var keys = objectKeys( string );
	t.equal( keys.length > 0, true, 'has keys' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/string/test/test.js")
},{"./../lib":143,"@stdlib/utils/keys":251,"tape":377}],198:[function(require,module,exports){
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

// MODULES //

var constants = require( './constants.js' );


// MAIN //

/**
* Returns the grapheme break property from the [Unicode Standard][1].
*
* [1]: https://www.unicode.org/Public/13.0.0/ucd/auxiliary/GraphemeBreakProperty.txt
*
* @private
* @param {NonNegativeInteger} code - Unicode code point
* @returns {NonNegativeInteger} grapheme break property
*
* @example
* var out = graphemeBreakProperty( 0x008f );
* // returns 2
*
* @example
* var out = graphemeBreakProperty( 0x111C2 );
* // returns 12
*
* @example
* var out = graphemeBreakProperty( 0x1F3FC );
* // returns 3
*/
function graphemeBreakProperty( code ) {
	if (
		( 0x0600 <= code && code <= 0x0605 ) || // Cf   [6] ARABIC NUMBER SIGN..ARABIC NUMBER MARK ABOVE
		code === 0x06DD || // Cf       ARABIC END OF AYAH
		code === 0x070F || // Cf       SYRIAC ABBREVIATION MARK
		code === 0x08E2 || // Cf       ARABIC DISPUTED END OF AYAH
		code === 0x0D4E || // Lo       MALAYALAM LETTER DOT REPH
		code === 0x110BD || // Cf       KAITHI NUMBER SIGN
		code === 0x110CD || // Cf       KAITHI NUMBER SIGN ABOVE
		( 0x111C2 <= code && code <= 0x111C3 ) || // Lo   [2] SHARADA SIGN JIHVAMULIYA..SHARADA SIGN UPADHMANIYA
		code === 0x1193F || // Lo       DIVES AKURU PREFIXED NASAL SIGN
		code === 0x11941 || // Lo       DIVES AKURU INITIAL RA
		code === 0x11A3A || // Lo       ZANABAZAR SQUARE CLUSTER-INITIAL LETTER RA
		( 0x11A84 <= code && code <= 0x11A89 ) || // Lo   [6] SOYOMBO SIGN JIHVAMULIYA..SOYOMBO CLUSTER-INITIAL LETTER SA
		code === 0x11D46 // Lo       MASARAM GONDI REPHA
	) {
		return constants.Prepend;
	}
	if (
		code === 0x000D // Cc       <control-000D>
	) {
		return constants.CR;
	}
	if (
		code === 0x000A // Cc       <control-000A>
	) {
		return constants.LF;
	}
	if (
		( 0x0000 <= code && code <= 0x0009 ) || // Cc  [10] <control-0000>..<control-0009>
		( 0x000B <= code && code <= 0x000C ) || // Cc   [2] <control-000B>..<control-000C>
		( 0x000E <= code && code <= 0x001F ) || // Cc  [18] <control-000E>..<control-001F>
		( 0x007F <= code && code <= 0x009F ) || // Cc  [33] <control-007F>..<control-009F>
		code === 0x00AD || // Cf       SOFT HYPHEN
		code === 0x061C || // Cf       ARABIC LETTER MARK
		code === 0x180E || // Cf       MONGOLIAN VOWEL SEPARATOR
		code === 0x200B || // Cf       ZERO WIDTH SPACE
		( 0x200E <= code && code <= 0x200F ) || // Cf   [2] LEFT-TO-RIGHT MARK..RIGHT-TO-LEFT MARK
		code === 0x2028 || // Zl       LINE SEPARATOR
		code === 0x2029 || // Zp       PARAGRAPH SEPARATOR
		( 0x202A <= code && code <= 0x202E ) || // Cf   [5] LEFT-TO-RIGHT EMBEDDING..RIGHT-TO-LEFT OVERRIDE
		( 0x2060 <= code && code <= 0x2064 ) || // Cf   [5] WORD JOINER..INVISIBLE PLUS
		code === 0x2065 || // Cn       <reserved-2065>
		( 0x2066 <= code && code <= 0x206F ) || // Cf  [10] LEFT-TO-RIGHT ISOLATE..NOMINAL DIGIT SHAPES
		code === 0xFEFF || // Cf       ZERO WIDTH NO-BREAK SPACE
		( 0xFFF0 <= code && code <= 0xFFF8 ) || // Cn   [9] <reserved-FFF0>..<reserved-FFF8>
		( 0xFFF9 <= code && code <= 0xFFFB ) || // Cf   [3] INTERLINEAR ANNOTATION ANCHOR..INTERLINEAR ANNOTATION TERMINATOR
		( 0x13430 <= code && code <= 0x13438 ) || // Cf   [9] EGYPTIAN HIEROGLYPH VERTICAL JOINER..EGYPTIAN HIEROGLYPH END SEGMENT
		( 0x1BCA0 <= code && code <= 0x1BCA3 ) || // Cf   [4] SHORTHAND FORMAT LETTER OVERLAP..SHORTHAND FORMAT UP STEP
		( 0x1D173 <= code && code <= 0x1D17A ) || // Cf   [8] MUSICAL SYMBOL BEGIN BEAM..MUSICAL SYMBOL END PHRASE
		code === 0xE0000 || // Cn       <reserved-E0000>
		code === 0xE0001 || // Cf       LANGUAGE TAG
		( 0xE0002 <= code && code <= 0xE001F ) || // Cn  [30] <reserved-E0002>..<reserved-E001F>
		( 0xE0080 <= code && code <= 0xE00FF ) || // Cn [128] <reserved-E0080>..<reserved-E00FF>
		( 0xE01F0 <= code && code <= 0xE0FFF ) // Cn [3600] <reserved-E01F0>..<reserved-E0FFF>
	) {
		return constants.Control;
	}
	if (
		( 0x0300 <= code && code <= 0x036F ) || // Mn [112] COMBINING GRAVE ACCENT..COMBINING LATIN SMALL LETTER X
		( 0x0483 <= code && code <= 0x0487 ) || // Mn   [5] COMBINING CYRILLIC TITLO..COMBINING CYRILLIC POKRYTIE
		( 0x0488 <= code && code <= 0x0489 ) || // Me   [2] COMBINING CYRILLIC HUNDRED THOUSANDS SIGN..COMBINING CYRILLIC MILLIONS SIGN
		( 0x0591 <= code && code <= 0x05BD ) || // Mn  [45] HEBREW ACCENT ETNAHTA..HEBREW POINT METEG
		code === 0x05BF || // Mn       HEBREW POINT RAFE
		( 0x05C1 <= code && code <= 0x05C2 ) || // Mn   [2] HEBREW POINT SHIN DOT..HEBREW POINT SIN DOT
		( 0x05C4 <= code && code <= 0x05C5 ) || // Mn   [2] HEBREW MARK UPPER DOT..HEBREW MARK LOWER DOT
		code === 0x05C7 || // Mn       HEBREW POINT QAMATS QATAN
		( 0x0610 <= code && code <= 0x061A ) || // Mn  [11] ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM..ARABIC SMALL KASRA
		( 0x064B <= code && code <= 0x065F ) || // Mn  [21] ARABIC FATHATAN..ARABIC WAVY HAMZA BELOW
		code === 0x0670 || // Mn       ARABIC LETTER SUPERSCRIPT ALEF
		( 0x06D6 <= code && code <= 0x06DC ) || // Mn   [7] ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA..ARABIC SMALL HIGH SEEN
		( 0x06DF <= code && code <= 0x06E4 ) || // Mn   [6] ARABIC SMALL HIGH ROUNDED ZERO..ARABIC SMALL HIGH MADDA
		( 0x06E7 <= code && code <= 0x06E8 ) || // Mn   [2] ARABIC SMALL HIGH YEH..ARABIC SMALL HIGH NOON
		( 0x06EA <= code && code <= 0x06ED ) || // Mn   [4] ARABIC EMPTY CENTRE LOW STOP..ARABIC SMALL LOW MEEM
		code === 0x0711 || // Mn       SYRIAC LETTER SUPERSCRIPT ALAPH
		( 0x0730 <= code && code <= 0x074A ) || // Mn  [27] SYRIAC PTHAHA ABOVE..SYRIAC BARREKH
		( 0x07A6 <= code && code <= 0x07B0 ) || // Mn  [11] THAANA ABAFILI..THAANA SUKUN
		( 0x07EB <= code && code <= 0x07F3 ) || // Mn   [9] NKO COMBINING SHORT HIGH TONE..NKO COMBINING DOUBLE DOT ABOVE
		code === 0x07FD || // Mn       NKO DANTAYALAN
		( 0x0816 <= code && code <= 0x0819 ) || // Mn   [4] SAMARITAN MARK IN..SAMARITAN MARK DAGESH
		( 0x081B <= code && code <= 0x0823 ) || // Mn   [9] SAMARITAN MARK EPENTHETIC YUT..SAMARITAN VOWEL SIGN A
		( 0x0825 <= code && code <= 0x0827 ) || // Mn   [3] SAMARITAN VOWEL SIGN SHORT A..SAMARITAN VOWEL SIGN U
		( 0x0829 <= code && code <= 0x082D ) || // Mn   [5] SAMARITAN VOWEL SIGN LONG I..SAMARITAN MARK NEQUDAA
		( 0x0859 <= code && code <= 0x085B ) || // Mn   [3] MANDAIC AFFRICATION MARK..MANDAIC GEMINATION MARK
		( 0x08D3 <= code && code <= 0x08E1 ) || // Mn  [15] ARABIC SMALL LOW WAW..ARABIC SMALL HIGH SIGN SAFHA
		( 0x08E3 <= code && code <= 0x0902 ) || // Mn  [32] ARABIC TURNED DAMMA BELOW..DEVANAGARI SIGN ANUSVARA
		code === 0x093A || // Mn       DEVANAGARI VOWEL SIGN OE
		code === 0x093C || // Mn       DEVANAGARI SIGN NUKTA
		( 0x0941 <= code && code <= 0x0948 ) || // Mn   [8] DEVANAGARI VOWEL SIGN U..DEVANAGARI VOWEL SIGN AI
		code === 0x094D || // Mn       DEVANAGARI SIGN VIRAMA
		( 0x0951 <= code && code <= 0x0957 ) || // Mn   [7] DEVANAGARI STRESS SIGN UDATTA..DEVANAGARI VOWEL SIGN UUE
		( 0x0962 <= code && code <= 0x0963 ) || // Mn   [2] DEVANAGARI VOWEL SIGN VOCALIC L..DEVANAGARI VOWEL SIGN VOCALIC LL
		code === 0x0981 || // Mn       BENGALI SIGN CANDRABINDU
		code === 0x09BC || // Mn       BENGALI SIGN NUKTA
		code === 0x09BE || // Mc       BENGALI VOWEL SIGN AA
		( 0x09C1 <= code && code <= 0x09C4 ) || // Mn   [4] BENGALI VOWEL SIGN U..BENGALI VOWEL SIGN VOCALIC RR
		code === 0x09CD || // Mn       BENGALI SIGN VIRAMA
		code === 0x09D7 || // Mc       BENGALI AU LENGTH MARK
		( 0x09E2 <= code && code <= 0x09E3 ) || // Mn   [2] BENGALI VOWEL SIGN VOCALIC L..BENGALI VOWEL SIGN VOCALIC LL
		code === 0x09FE || // Mn       BENGALI SANDHI MARK
		( 0x0A01 <= code && code <= 0x0A02 ) || // Mn   [2] GURMUKHI SIGN ADAK BINDI..GURMUKHI SIGN BINDI
		code === 0x0A3C || // Mn       GURMUKHI SIGN NUKTA
		( 0x0A41 <= code && code <= 0x0A42 ) || // Mn   [2] GURMUKHI VOWEL SIGN U..GURMUKHI VOWEL SIGN UU
		( 0x0A47 <= code && code <= 0x0A48 ) || // Mn   [2] GURMUKHI VOWEL SIGN EE..GURMUKHI VOWEL SIGN AI
		( 0x0A4B <= code && code <= 0x0A4D ) || // Mn   [3] GURMUKHI VOWEL SIGN OO..GURMUKHI SIGN VIRAMA
		code === 0x0A51 || // Mn       GURMUKHI SIGN UDAAT
		( 0x0A70 <= code && code <= 0x0A71 ) || // Mn   [2] GURMUKHI TIPPI..GURMUKHI ADDAK
		code === 0x0A75 || // Mn       GURMUKHI SIGN YAKASH
		( 0x0A81 <= code && code <= 0x0A82 ) || // Mn   [2] GUJARATI SIGN CANDRABINDU..GUJARATI SIGN ANUSVARA
		code === 0x0ABC || // Mn       GUJARATI SIGN NUKTA
		( 0x0AC1 <= code && code <= 0x0AC5 ) || // Mn   [5] GUJARATI VOWEL SIGN U..GUJARATI VOWEL SIGN CANDRA E
		( 0x0AC7 <= code && code <= 0x0AC8 ) || // Mn   [2] GUJARATI VOWEL SIGN E..GUJARATI VOWEL SIGN AI
		code === 0x0ACD || // Mn       GUJARATI SIGN VIRAMA
		( 0x0AE2 <= code && code <= 0x0AE3 ) || // Mn   [2] GUJARATI VOWEL SIGN VOCALIC L..GUJARATI VOWEL SIGN VOCALIC LL
		( 0x0AFA <= code && code <= 0x0AFF ) || // Mn   [6] GUJARATI SIGN SUKUN..GUJARATI SIGN TWO-CIRCLE NUKTA ABOVE
		code === 0x0B01 || // Mn       ORIYA SIGN CANDRABINDU
		code === 0x0B3C || // Mn       ORIYA SIGN NUKTA
		code === 0x0B3E || // Mc       ORIYA VOWEL SIGN AA
		code === 0x0B3F || // Mn       ORIYA VOWEL SIGN I
		( 0x0B41 <= code && code <= 0x0B44 ) || // Mn   [4] ORIYA VOWEL SIGN U..ORIYA VOWEL SIGN VOCALIC RR
		code === 0x0B4D || // Mn       ORIYA SIGN VIRAMA
		( 0x0B55 <= code && code <= 0x0B56 ) || // Mn   [2] ORIYA SIGN OVERLINE..ORIYA AI LENGTH MARK
		code === 0x0B57 || // Mc       ORIYA AU LENGTH MARK
		( 0x0B62 <= code && code <= 0x0B63 ) || // Mn   [2] ORIYA VOWEL SIGN VOCALIC L..ORIYA VOWEL SIGN VOCALIC LL
		code === 0x0B82 || // Mn       TAMIL SIGN ANUSVARA
		code === 0x0BBE || // Mc       TAMIL VOWEL SIGN AA
		code === 0x0BC0 || // Mn       TAMIL VOWEL SIGN II
		code === 0x0BCD || // Mn       TAMIL SIGN VIRAMA
		code === 0x0BD7 || // Mc       TAMIL AU LENGTH MARK
		code === 0x0C00 || // Mn       TELUGU SIGN COMBINING CANDRABINDU ABOVE
		code === 0x0C04 || // Mn       TELUGU SIGN COMBINING ANUSVARA ABOVE
		( 0x0C3E <= code && code <= 0x0C40 ) || // Mn   [3] TELUGU VOWEL SIGN AA..TELUGU VOWEL SIGN II
		( 0x0C46 <= code && code <= 0x0C48 ) || // Mn   [3] TELUGU VOWEL SIGN E..TELUGU VOWEL SIGN AI
		( 0x0C4A <= code && code <= 0x0C4D ) || // Mn   [4] TELUGU VOWEL SIGN O..TELUGU SIGN VIRAMA
		( 0x0C55 <= code && code <= 0x0C56 ) || // Mn   [2] TELUGU LENGTH MARK..TELUGU AI LENGTH MARK
		( 0x0C62 <= code && code <= 0x0C63 ) || // Mn   [2] TELUGU VOWEL SIGN VOCALIC L..TELUGU VOWEL SIGN VOCALIC LL
		code === 0x0C81 || // Mn       KANNADA SIGN CANDRABINDU
		code === 0x0CBC || // Mn       KANNADA SIGN NUKTA
		code === 0x0CBF || // Mn       KANNADA VOWEL SIGN I
		code === 0x0CC2 || // Mc       KANNADA VOWEL SIGN UU
		code === 0x0CC6 || // Mn       KANNADA VOWEL SIGN E
		( 0x0CCC <= code && code <= 0x0CCD ) || // Mn   [2] KANNADA VOWEL SIGN AU..KANNADA SIGN VIRAMA
		( 0x0CD5 <= code && code <= 0x0CD6 ) || // Mc   [2] KANNADA LENGTH MARK..KANNADA AI LENGTH MARK
		( 0x0CE2 <= code && code <= 0x0CE3 ) || // Mn   [2] KANNADA VOWEL SIGN VOCALIC L..KANNADA VOWEL SIGN VOCALIC LL
		( 0x0D00 <= code && code <= 0x0D01 ) || // Mn   [2] MALAYALAM SIGN COMBINING ANUSVARA ABOVE..MALAYALAM SIGN CANDRABINDU
		( 0x0D3B <= code && code <= 0x0D3C ) || // Mn   [2] MALAYALAM SIGN VERTICAL BAR VIRAMA..MALAYALAM SIGN CIRCULAR VIRAMA
		code === 0x0D3E || // Mc       MALAYALAM VOWEL SIGN AA
		( 0x0D41 <= code && code <= 0x0D44 ) || // Mn   [4] MALAYALAM VOWEL SIGN U..MALAYALAM VOWEL SIGN VOCALIC RR
		code === 0x0D4D || // Mn       MALAYALAM SIGN VIRAMA
		code === 0x0D57 || // Mc       MALAYALAM AU LENGTH MARK
		( 0x0D62 <= code && code <= 0x0D63 ) || // Mn   [2] MALAYALAM VOWEL SIGN VOCALIC L..MALAYALAM VOWEL SIGN VOCALIC LL
		code === 0x0D81 || // Mn       SINHALA SIGN CANDRABINDU
		code === 0x0DCA || // Mn       SINHALA SIGN AL-LAKUNA
		code === 0x0DCF || // Mc       SINHALA VOWEL SIGN AELA-PILLA
		( 0x0DD2 <= code && code <= 0x0DD4 ) || // Mn   [3] SINHALA VOWEL SIGN KETTI IS-PILLA..SINHALA VOWEL SIGN KETTI PAA-PILLA
		code === 0x0DD6 || // Mn       SINHALA VOWEL SIGN DIGA PAA-PILLA
		code === 0x0DDF || // Mc       SINHALA VOWEL SIGN GAYANUKITTA
		code === 0x0E31 || // Mn       THAI CHARACTER MAI HAN-AKAT
		( 0x0E34 <= code && code <= 0x0E3A ) || // Mn   [7] THAI CHARACTER SARA I..THAI CHARACTER PHINTHU
		( 0x0E47 <= code && code <= 0x0E4E ) || // Mn   [8] THAI CHARACTER MAITAIKHU..THAI CHARACTER YAMAKKAN
		code === 0x0EB1 || // Mn       LAO VOWEL SIGN MAI KAN
		( 0x0EB4 <= code && code <= 0x0EBC ) || // Mn   [9] LAO VOWEL SIGN I..LAO SEMIVOWEL SIGN LO
		( 0x0EC8 <= code && code <= 0x0ECD ) || // Mn   [6] LAO TONE MAI EK..LAO NIGGAHITA
		( 0x0F18 <= code && code <= 0x0F19 ) || // Mn   [2] TIBETAN ASTROLOGICAL SIGN -KHYUD PA..TIBETAN ASTROLOGICAL SIGN SDONG TSHUGS
		code === 0x0F35 || // Mn       TIBETAN MARK NGAS BZUNG NYI ZLA
		code === 0x0F37 || // Mn       TIBETAN MARK NGAS BZUNG SGOR RTAGS
		code === 0x0F39 || // Mn       TIBETAN MARK TSA -PHRU
		( 0x0F71 <= code && code <= 0x0F7E ) || // Mn  [14] TIBETAN VOWEL SIGN AA..TIBETAN SIGN RJES SU NGA RO
		( 0x0F80 <= code && code <= 0x0F84 ) || // Mn   [5] TIBETAN VOWEL SIGN REVERSED I..TIBETAN MARK HALANTA
		( 0x0F86 <= code && code <= 0x0F87 ) || // Mn   [2] TIBETAN SIGN LCI RTAGS..TIBETAN SIGN YANG RTAGS
		( 0x0F8D <= code && code <= 0x0F97 ) || // Mn  [11] TIBETAN SUBJOINED SIGN LCE TSA CAN..TIBETAN SUBJOINED LETTER JA
		( 0x0F99 <= code && code <= 0x0FBC ) || // Mn  [36] TIBETAN SUBJOINED LETTER NYA..TIBETAN SUBJOINED LETTER FIXED-FORM RA
		code === 0x0FC6 || // Mn       TIBETAN SYMBOL PADMA GDAN
		( 0x102D <= code && code <= 0x1030 ) || // Mn   [4] MYANMAR VOWEL SIGN I..MYANMAR VOWEL SIGN UU
		( 0x1032 <= code && code <= 0x1037 ) || // Mn   [6] MYANMAR VOWEL SIGN AI..MYANMAR SIGN DOT BELOW
		( 0x1039 <= code && code <= 0x103A ) || // Mn   [2] MYANMAR SIGN VIRAMA..MYANMAR SIGN ASAT
		( 0x103D <= code && code <= 0x103E ) || // Mn   [2] MYANMAR CONSONANT SIGN MEDIAL WA..MYANMAR CONSONANT SIGN MEDIAL HA
		( 0x1058 <= code && code <= 0x1059 ) || // Mn   [2] MYANMAR VOWEL SIGN VOCALIC L..MYANMAR VOWEL SIGN VOCALIC LL
		( 0x105E <= code && code <= 0x1060 ) || // Mn   [3] MYANMAR CONSONANT SIGN MON MEDIAL NA..MYANMAR CONSONANT SIGN MON MEDIAL LA
		( 0x1071 <= code && code <= 0x1074 ) || // Mn   [4] MYANMAR VOWEL SIGN GEBA KAREN I..MYANMAR VOWEL SIGN KAYAH EE
		code === 0x1082 || // Mn       MYANMAR CONSONANT SIGN SHAN MEDIAL WA
		( 0x1085 <= code && code <= 0x1086 ) || // Mn   [2] MYANMAR VOWEL SIGN SHAN E ABOVE..MYANMAR VOWEL SIGN SHAN FINAL Y
		code === 0x108D || // Mn       MYANMAR SIGN SHAN COUNCIL EMPHATIC TONE
		code === 0x109D || // Mn       MYANMAR VOWEL SIGN AITON AI
		( 0x135D <= code && code <= 0x135F ) || // Mn   [3] ETHIOPIC COMBINING GEMINATION AND VOWEL LENGTH MARK..ETHIOPIC COMBINING GEMINATION MARK
		( 0x1712 <= code && code <= 0x1714 ) || // Mn   [3] TAGALOG VOWEL SIGN I..TAGALOG SIGN VIRAMA
		( 0x1732 <= code && code <= 0x1734 ) || // Mn   [3] HANUNOO VOWEL SIGN I..HANUNOO SIGN PAMUDPOD
		( 0x1752 <= code && code <= 0x1753 ) || // Mn   [2] BUHID VOWEL SIGN I..BUHID VOWEL SIGN U
		( 0x1772 <= code && code <= 0x1773 ) || // Mn   [2] TAGBANWA VOWEL SIGN I..TAGBANWA VOWEL SIGN U
		( 0x17B4 <= code && code <= 0x17B5 ) || // Mn   [2] KHMER VOWEL INHERENT AQ..KHMER VOWEL INHERENT AA
		( 0x17B7 <= code && code <= 0x17BD ) || // Mn   [7] KHMER VOWEL SIGN I..KHMER VOWEL SIGN UA
		code === 0x17C6 || // Mn       KHMER SIGN NIKAHIT
		( 0x17C9 <= code && code <= 0x17D3 ) || // Mn  [11] KHMER SIGN MUUSIKATOAN..KHMER SIGN BATHAMASAT
		code === 0x17DD || // Mn       KHMER SIGN ATTHACAN
		( 0x180B <= code && code <= 0x180D ) || // Mn   [3] MONGOLIAN FREE VARIATION SELECTOR ONE..MONGOLIAN FREE VARIATION SELECTOR THREE
		( 0x1885 <= code && code <= 0x1886 ) || // Mn   [2] MONGOLIAN LETTER ALI GALI BALUDA..MONGOLIAN LETTER ALI GALI THREE BALUDA
		code === 0x18A9 || // Mn       MONGOLIAN LETTER ALI GALI DAGALGA
		( 0x1920 <= code && code <= 0x1922 ) || // Mn   [3] LIMBU VOWEL SIGN A..LIMBU VOWEL SIGN U
		( 0x1927 <= code && code <= 0x1928 ) || // Mn   [2] LIMBU VOWEL SIGN E..LIMBU VOWEL SIGN O
		code === 0x1932 || // Mn       LIMBU SMALL LETTER ANUSVARA
		( 0x1939 <= code && code <= 0x193B ) || // Mn   [3] LIMBU SIGN MUKPHRENG..LIMBU SIGN SA-I
		( 0x1A17 <= code && code <= 0x1A18 ) || // Mn   [2] BUGINESE VOWEL SIGN I..BUGINESE VOWEL SIGN U
		code === 0x1A1B || // Mn       BUGINESE VOWEL SIGN AE
		code === 0x1A56 || // Mn       TAI THAM CONSONANT SIGN MEDIAL LA
		( 0x1A58 <= code && code <= 0x1A5E ) || // Mn   [7] TAI THAM SIGN MAI KANG LAI..TAI THAM CONSONANT SIGN SA
		code === 0x1A60 || // Mn       TAI THAM SIGN SAKOT
		code === 0x1A62 || // Mn       TAI THAM VOWEL SIGN MAI SAT
		( 0x1A65 <= code && code <= 0x1A6C ) || // Mn   [8] TAI THAM VOWEL SIGN I..TAI THAM VOWEL SIGN OA BELOW
		( 0x1A73 <= code && code <= 0x1A7C ) || // Mn  [10] TAI THAM VOWEL SIGN OA ABOVE..TAI THAM SIGN KHUEN-LUE KARAN
		code === 0x1A7F || // Mn       TAI THAM COMBINING CRYPTOGRAMMIC DOT
		( 0x1AB0 <= code && code <= 0x1ABD ) || // Mn  [14] COMBINING DOUBLED CIRCUMFLEX ACCENT..COMBINING PARENTHESES BELOW
		code === 0x1ABE || // Me       COMBINING PARENTHESES OVERLAY
		( 0x1ABF <= code && code <= 0x1AC0 ) || // Mn   [2] COMBINING LATIN SMALL LETTER W BELOW..COMBINING LATIN SMALL LETTER TURNED W BELOW
		( 0x1B00 <= code && code <= 0x1B03 ) || // Mn   [4] BALINESE SIGN ULU RICEM..BALINESE SIGN SURANG
		code === 0x1B34 || // Mn       BALINESE SIGN REREKAN
		code === 0x1B35 || // Mc       BALINESE VOWEL SIGN TEDUNG
		( 0x1B36 <= code && code <= 0x1B3A) || // Mn   [5] BALINESE VOWEL SIGN ULU..BALINESE VOWEL SIGN RA REPA
		code === 0x1B3C || // Mn       BALINESE VOWEL SIGN LA LENGA
		code === 0x1B42 || // Mn       BALINESE VOWEL SIGN PEPET
		( 0x1B6B <= code && code <= 0x1B73 ) || // Mn   [9] BALINESE MUSICAL SYMBOL COMBINING TEGEH..BALINESE MUSICAL SYMBOL COMBINING GONG
		( 0x1B80 <= code && code <= 0x1B81 ) || // Mn   [2] SUNDANESE SIGN PANYECEK..SUNDANESE SIGN PANGLAYAR
		( 0x1BA2 <= code && code <= 0x1BA5 ) || // Mn   [4] SUNDANESE CONSONANT SIGN PANYAKRA..SUNDANESE VOWEL SIGN PANYUKU
		( 0x1BA8 <= code && code <= 0x1BA9 ) || // Mn   [2] SUNDANESE VOWEL SIGN PAMEPET..SUNDANESE VOWEL SIGN PANEULEUNG
		( 0x1BAB <= code && code <= 0x1BAD ) || // Mn   [3] SUNDANESE SIGN VIRAMA..SUNDANESE CONSONANT SIGN PASANGAN WA
		code === 0x1BE6 || // Mn       BATAK SIGN TOMPI
		( 0x1BE8 <= code && code <= 0x1BE9) || // Mn   [2] BATAK VOWEL SIGN PAKPAK E..BATAK VOWEL SIGN EE
		code === 0x1BED || // Mn       BATAK VOWEL SIGN KARO O
		( 0x1BEF <= code && code <= 0x1BF1 ) || // Mn   [3] BATAK VOWEL SIGN U FOR SIMALUNGUN SA..BATAK CONSONANT SIGN H
		( 0x1C2C <= code && code <= 0x1C33 ) || // Mn   [8] LEPCHA VOWEL SIGN E..LEPCHA CONSONANT SIGN T
		( 0x1C36 <= code && code <= 0x1C37 ) || // Mn   [2] LEPCHA SIGN RAN..LEPCHA SIGN NUKTA
		( 0x1CD0 <= code && code <= 0x1CD2 ) || // Mn   [3] VEDIC TONE KARSHANA..VEDIC TONE PRENKHA
		( 0x1CD4 <= code && code <= 0x1CE0 ) || // Mn  [13] VEDIC SIGN YAJURVEDIC MIDLINE SVARITA..VEDIC TONE RIGVEDIC KASHMIRI INDEPENDENT SVARITA
		( 0x1CE2 <= code && code <= 0x1CE8 ) || // Mn   [7] VEDIC SIGN VISARGA SVARITA..VEDIC SIGN VISARGA ANUDATTA WITH TAIL
		code === 0x1CED || // Mn       VEDIC SIGN TIRYAK
		code === 0x1CF4 || // Mn       VEDIC TONE CANDRA ABOVE
		( 0x1CF8 <= code && code <= 0x1CF9 ) || // Mn   [2] VEDIC TONE RING ABOVE..VEDIC TONE DOUBLE RING ABOVE
		( 0x1DC0 <= code && code <= 0x1DF9 ) || // Mn  [58] COMBINING DOTTED GRAVE ACCENT..COMBINING WIDE INVERTED BRIDGE BELOW
		( 0x1DFB <= code && code <= 0x1DFF ) || // Mn   [5] COMBINING DELETION MARK..COMBINING RIGHT ARROWHEAD AND DOWN ARROWHEAD BELOW
		code === 0x200C || // Cf       ZERO WIDTH NON-JOINER
		( 0x20D0 <= code && code <= 0x20DC ) || // Mn  [13] COMBINING LEFT HARPOON ABOVE..COMBINING FOUR DOTS ABOVE
		( 0x20DD <= code && code <= 0x20E0 ) || // Me   [4] COMBINING ENCLOSING CIRCLE..COMBINING ENCLOSING CIRCLE BACKSLASH
		code === 0x20E1 || // Mn       COMBINING LEFT RIGHT ARROW ABOVE
		( 0x20E2 <= code && code <= 0x20E4 ) || // Me   [3] COMBINING ENCLOSING SCREEN..COMBINING ENCLOSING UPWARD POINTING TRIANGLE
		( 0x20E5 <= code && code <= 0x20F0 ) || // Mn  [12] COMBINING REVERSE SOLIDUS OVERLAY..COMBINING ASTERISK ABOVE
		( 0x2CEF <= code && code <= 0x2CF1 ) || // Mn   [3] COPTIC COMBINING NI ABOVE..COPTIC COMBINING SPIRITUS LENIS
		code === 0x2D7F || // Mn       TIFINAGH CONSONANT JOINER
		( 0x2DE0 <= code && code <= 0x2DFF ) || // Mn  [32] COMBINING CYRILLIC LETTER BE..COMBINING CYRILLIC LETTER IOTIFIED BIG YUS
		( 0x302A <= code && code <= 0x302D ) || // Mn   [4] IDEOGRAPHIC LEVEL TONE MARK..IDEOGRAPHIC ENTERING TONE MARK
		( 0x302E <= code && code <= 0x302F ) || // Mc   [2] HANGUL SINGLE DOT TONE MARK..HANGUL DOUBLE DOT TONE MARK
		( 0x3099 <= code && code <= 0x309A ) || // Mn   [2] COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK..COMBINING KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK
		code === 0xA66F || // Mn       COMBINING CYRILLIC VZMET
		( 0xA670 <= code && code <= 0xA672 ) || // Me   [3] COMBINING CYRILLIC TEN MILLIONS SIGN..COMBINING CYRILLIC THOUSAND MILLIONS SIGN
		( 0xA674 <= code && code <= 0xA67D ) || // Mn  [10] COMBINING CYRILLIC LETTER UKRAINIAN IE..COMBINING CYRILLIC PAYEROK
		( 0xA69E <= code && code <= 0xA69F ) || // Mn   [2] COMBINING CYRILLIC LETTER EF..COMBINING CYRILLIC LETTER IOTIFIED E
		( 0xA6F0 <= code && code <= 0xA6F1 ) || // Mn   [2] BAMUM COMBINING MARK KOQNDON..BAMUM COMBINING MARK TUKWENTIS
		code === 0xA802 || // Mn       SYLOTI NAGRI SIGN DVISVARA
		code === 0xA806 || // Mn       SYLOTI NAGRI SIGN HASANTA
		code === 0xA80B || // Mn       SYLOTI NAGRI SIGN ANUSVARA
		( 0xA825 <= code && code <= 0xA826 ) || // Mn   [2] SYLOTI NAGRI VOWEL SIGN U..SYLOTI NAGRI VOWEL SIGN E
		code === 0xA82C || // Mn       SYLOTI NAGRI SIGN ALTERNATE HASANTA
		( 0xA8C4 <= code && code <= 0xA8C5 ) || // Mn   [2] SAURASHTRA SIGN VIRAMA..SAURASHTRA SIGN CANDRABINDU
		( 0xA8E0 <= code && code <= 0xA8F1 ) || // Mn  [18] COMBINING DEVANAGARI DIGIT ZERO..COMBINING DEVANAGARI SIGN AVAGRAHA
		code === 0xA8FF || // Mn       DEVANAGARI VOWEL SIGN AY
		( 0xA926 <= code && code <= 0xA92D ) || // Mn   [8] KAYAH LI VOWEL UE..KAYAH LI TONE CALYA PLOPHU
		( 0xA947 <= code && code <= 0xA951 ) || // Mn  [11] REJANG VOWEL SIGN I..REJANG CONSONANT SIGN R
		( 0xA980 <= code && code <= 0xA982 ) || // Mn   [3] JAVANESE SIGN PANYANGGA..JAVANESE SIGN LAYAR
		code === 0xA9B3 || // Mn       JAVANESE SIGN CECAK TELU
		( 0xA9B6 <= code && code <= 0xA9B9 ) || // Mn   [4] JAVANESE VOWEL SIGN WULU..JAVANESE VOWEL SIGN SUKU MENDUT
		( 0xA9BC <= code && code <= 0xA9BD ) || // Mn   [2] JAVANESE VOWEL SIGN PEPET..JAVANESE CONSONANT SIGN KERET
		code === 0xA9E5 || // Mn       MYANMAR SIGN SHAN SAW
		( 0xAA29 <= code && code <= 0xAA2E ) || // Mn   [6] CHAM VOWEL SIGN AA..CHAM VOWEL SIGN OE
		( 0xAA31 <= code && code <= 0xAA32 ) || // Mn   [2] CHAM VOWEL SIGN AU..CHAM VOWEL SIGN UE
		( 0xAA35 <= code && code <= 0xAA36 ) || // Mn   [2] CHAM CONSONANT SIGN LA..CHAM CONSONANT SIGN WA
		code === 0xAA43 || // Mn       CHAM CONSONANT SIGN FINAL NG
		code === 0xAA4C || // Mn       CHAM CONSONANT SIGN FINAL M
		code === 0xAA7C || // Mn       MYANMAR SIGN TAI LAING TONE-2
		code === 0xAAB0 || // Mn       TAI VIET MAI KANG
		( 0xAAB2 <= code && code <= 0xAAB4 ) || // Mn   [3] TAI VIET VOWEL I..TAI VIET VOWEL U
		( 0xAAB7 <= code && code <= 0xAAB8 ) || // Mn   [2] TAI VIET MAI KHIT..TAI VIET VOWEL IA
		( 0xAABE <= code && code <= 0xAABF ) || // Mn   [2] TAI VIET VOWEL AM..TAI VIET TONE MAI EK
		code === 0xAAC1 || // Mn       TAI VIET TONE MAI THO
		( 0xAAEC <= code && code <= 0xAAED ) || // Mn   [2] MEETEI MAYEK VOWEL SIGN UU..MEETEI MAYEK VOWEL SIGN AAI
		code === 0xAAF6 || // Mn       MEETEI MAYEK VIRAMA
		code === 0xABE5 || // Mn       MEETEI MAYEK VOWEL SIGN ANAP
		code === 0xABE8 || // Mn       MEETEI MAYEK VOWEL SIGN UNAP
		code === 0xABED || // Mn       MEETEI MAYEK APUN IYEK
		code === 0xFB1E || // Mn       HEBREW POINT JUDEO-SPANISH VARIKA
		( 0xFE00 <= code && code <= 0xFE0F ) || // Mn  [16] VARIATION SELECTOR-1..VARIATION SELECTOR-16
		( 0xFE20 <= code && code <= 0xFE2F ) || // Mn  [16] COMBINING LIGATURE LEFT HALF..COMBINING CYRILLIC TITLO RIGHT HALF
		( 0xFF9E <= code && code <= 0xFF9F ) || // Lm   [2] HALFWIDTH KATAKANA VOICED SOUND MARK..HALFWIDTH KATAKANA SEMI-VOICED SOUND MARK
		code === 0x101FD || // Mn       PHAISTOS DISC SIGN COMBINING OBLIQUE STROKE
		code === 0x102E0 || // Mn       COPTIC EPACT THOUSANDS MARK
		( 0x10376 <= code && code <= 0x1037A ) || // Mn   [5] COMBINING OLD PERMIC LETTER AN..COMBINING OLD PERMIC LETTER SII
		( 0x10A01 <= code && code <= 0x10A03 ) || // Mn   [3] KHAROSHTHI VOWEL SIGN I..KHAROSHTHI VOWEL SIGN VOCALIC R
		( 0x10A05 <= code && code <= 0x10A06 ) || // Mn   [2] KHAROSHTHI VOWEL SIGN E..KHAROSHTHI VOWEL SIGN O
		( 0x10A0C <= code && code <= 0x10A0F ) || // Mn   [4] KHAROSHTHI VOWEL LENGTH MARK..KHAROSHTHI SIGN VISARGA
		( 0x10A38 <= code && code <= 0x10A3A ) || // Mn   [3] KHAROSHTHI SIGN BAR ABOVE..KHAROSHTHI SIGN DOT BELOW
		code === 0x10A3F || // Mn       KHAROSHTHI VIRAMA
		( 0x10AE5 <= code && code <= 0x10AE6 ) || // Mn   [2] MANICHAEAN ABBREVIATION MARK ABOVE..MANICHAEAN ABBREVIATION MARK BELOW
		( 0x10D24 <= code && code <= 0x10D27 ) || // Mn   [4] HANIFI ROHINGYA SIGN HARBAHAY..HANIFI ROHINGYA SIGN TASSI
		( 0x10EAB <= code && code <= 0x10EAC ) || // Mn   [2] YEZIDI COMBINING HAMZA MARK..YEZIDI COMBINING MADDA MARK
		( 0x10F46 <= code && code <= 0x10F50 ) || // Mn  [11] SOGDIAN COMBINING DOT BELOW..SOGDIAN COMBINING STROKE BELOW
		code === 0x11001 || // Mn       BRAHMI SIGN ANUSVARA
		( 0x11038 <= code && code <= 0x11046 ) || // Mn  [15] BRAHMI VOWEL SIGN AA..BRAHMI VIRAMA
		( 0x1107F <= code && code <= 0x11081 ) || // Mn   [3] BRAHMI NUMBER JOINER..KAITHI SIGN ANUSVARA
		( 0x110B3 <= code && code <= 0x110B6 ) || // Mn   [4] KAITHI VOWEL SIGN U..KAITHI VOWEL SIGN AI
		( 0x110B9 <= code && code <= 0x110BA ) || // Mn   [2] KAITHI SIGN VIRAMA..KAITHI SIGN NUKTA
		( 0x11100 <= code && code <= 0x11102 ) || // Mn   [3] CHAKMA SIGN CANDRABINDU..CHAKMA SIGN VISARGA
		( 0x11127 <= code && code <= 0x1112B ) || // Mn   [5] CHAKMA VOWEL SIGN A..CHAKMA VOWEL SIGN UU
		( 0x1112D <= code && code <= 0x11134 ) || // Mn   [8] CHAKMA VOWEL SIGN AI..CHAKMA MAAYYAA
		code === 0x11173 || // Mn       MAHAJANI SIGN NUKTA
		( 0x11180 <= code && code <= 0x11181 ) || // Mn   [2] SHARADA SIGN CANDRABINDU..SHARADA SIGN ANUSVARA
		( 0x111B6 <= code && code <= 0x111BE ) || // Mn   [9] SHARADA VOWEL SIGN U..SHARADA VOWEL SIGN O
		( 0x111C9 <= code && code <= 0x111CC ) || // Mn   [4] SHARADA SANDHI MARK..SHARADA EXTRA SHORT VOWEL MARK
		code === 0x111CF || // Mn       SHARADA SIGN INVERTED CANDRABINDU
		( 0x1122F <= code && code <= 0x11231 ) || // Mn   [3] KHOJKI VOWEL SIGN U..KHOJKI VOWEL SIGN AI
		code === 0x11234 || // Mn       KHOJKI SIGN ANUSVARA
		( 0x11236 <= code && code <= 0x11237 ) || // Mn   [2] KHOJKI SIGN NUKTA..KHOJKI SIGN SHADDA
		code === 0x1123E || // Mn       KHOJKI SIGN SUKUN
		code === 0x112DF || // Mn       KHUDAWADI SIGN ANUSVARA
		( 0x112E3 <= code && code <= 0x112EA ) || // Mn   [8] KHUDAWADI VOWEL SIGN U..KHUDAWADI SIGN VIRAMA
		( 0x11300 <= code && code <= 0x11301 ) || // Mn   [2] GRANTHA SIGN COMBINING ANUSVARA ABOVE..GRANTHA SIGN CANDRABINDU
		( 0x1133B <= code && code <= 0x1133C ) || // Mn   [2] COMBINING BINDU BELOW..GRANTHA SIGN NUKTA
		code === 0x1133E || // Mc       GRANTHA VOWEL SIGN AA
		code === 0x11340 || // Mn       GRANTHA VOWEL SIGN II
		code === 0x11357 || // Mc       GRANTHA AU LENGTH MARK
		( 0x11366 <= code && code <= 0x1136C ) || // Mn   [7] COMBINING GRANTHA DIGIT ZERO..COMBINING GRANTHA DIGIT SIX
		( 0x11370 <= code && code <= 0x11374 ) || // Mn   [5] COMBINING GRANTHA LETTER A..COMBINING GRANTHA LETTER PA
		( 0x11438 <= code && code <= 0x1143F ) || // Mn   [8] NEWA VOWEL SIGN U..NEWA VOWEL SIGN AI
		( 0x11442 <= code && code <= 0x11444 ) || // Mn   [3] NEWA SIGN VIRAMA..NEWA SIGN ANUSVARA
		code === 0x11446 || // Mn       NEWA SIGN NUKTA
		code === 0x1145E || // Mn       NEWA SANDHI MARK
		code === 0x114B0 || // Mc       TIRHUTA VOWEL SIGN AA
		( 0x114B3 <= code && code <= 0x114B8 ) || // Mn   [6] TIRHUTA VOWEL SIGN U..TIRHUTA VOWEL SIGN VOCALIC LL
		code === 0x114BA || // Mn       TIRHUTA VOWEL SIGN SHORT E
		code === 0x114BD || // Mc       TIRHUTA VOWEL SIGN SHORT O
		( 0x114BF <= code && code <= 0x114C0 ) || // Mn   [2] TIRHUTA SIGN CANDRABINDU..TIRHUTA SIGN ANUSVARA
		( 0x114C2 <= code && code <= 0x114C3 ) || // Mn   [2] TIRHUTA SIGN VIRAMA..TIRHUTA SIGN NUKTA
		code === 0x115AF || // Mc       SIDDHAM VOWEL SIGN AA
		( 0x115B2 <= code && code <= 0x115B5 ) || // Mn   [4] SIDDHAM VOWEL SIGN U..SIDDHAM VOWEL SIGN VOCALIC RR
		( 0x115BC <= code && code <= 0x115BD ) || // Mn   [2] SIDDHAM SIGN CANDRABINDU..SIDDHAM SIGN ANUSVARA
		( 0x115BF <= code && code <= 0x115C0 ) || // Mn   [2] SIDDHAM SIGN VIRAMA..SIDDHAM SIGN NUKTA
		( 0x115DC <= code && code <= 0x115DD ) || // Mn   [2] SIDDHAM VOWEL SIGN ALTERNATE U..SIDDHAM VOWEL SIGN ALTERNATE UU
		( 0x11633 <= code && code <= 0x1163A ) || // Mn   [8] MODI VOWEL SIGN U..MODI VOWEL SIGN AI
		code === 0x1163D || // Mn       MODI SIGN ANUSVARA
		( 0x1163F <= code && code <= 0x11640 ) || // Mn   [2] MODI SIGN VIRAMA..MODI SIGN ARDHACANDRA
		code === 0x116AB || // Mn       TAKRI SIGN ANUSVARA
		code === 0x116AD || // Mn       TAKRI VOWEL SIGN AA
		( 0x116B0 <= code && code <= 0x116B5 ) || // Mn   [6] TAKRI VOWEL SIGN U..TAKRI VOWEL SIGN AU
		code === 0x116B7 || // Mn       TAKRI SIGN NUKTA
		( 0x1171D <= code && code <= 0x1171F ) || // Mn   [3] AHOM CONSONANT SIGN MEDIAL LA..AHOM CONSONANT SIGN MEDIAL LIGATING RA
		( 0x11722 <= code && code <= 0x11725 ) || // Mn   [4] AHOM VOWEL SIGN I..AHOM VOWEL SIGN UU
		( 0x11727 <= code && code <= 0x1172B ) || // Mn   [5] AHOM VOWEL SIGN AW..AHOM SIGN KILLER
		( 0x1182F <= code && code <= 0x11837 ) || // Mn   [9] DOGRA VOWEL SIGN U..DOGRA SIGN ANUSVARA
		( 0x11839 <= code && code <= 0x1183A ) || // Mn   [2] DOGRA SIGN VIRAMA..DOGRA SIGN NUKTA
		code === 0x11930 || // Mc       DIVES AKURU VOWEL SIGN AA
		( 0x1193B <= code && code <= 0x1193C ) || // Mn   [2] DIVES AKURU SIGN ANUSVARA..DIVES AKURU SIGN CANDRABINDU
		code === 0x1193E || // Mn       DIVES AKURU VIRAMA
		code === 0x11943 || // Mn       DIVES AKURU SIGN NUKTA
		( 0x119D4 <= code && code <= 0x119D7 ) || // Mn   [4] NANDINAGARI VOWEL SIGN U..NANDINAGARI VOWEL SIGN VOCALIC RR
		( 0x119DA <= code && code <= 0x119DB ) || // Mn   [2] NANDINAGARI VOWEL SIGN E..NANDINAGARI VOWEL SIGN AI
		code === 0x119E0 || // Mn       NANDINAGARI SIGN VIRAMA
		( 0x11A01 <= code && code <= 0x11A0A ) || // Mn  [10] ZANABAZAR SQUARE VOWEL SIGN I..ZANABAZAR SQUARE VOWEL LENGTH MARK
		( 0x11A33 <= code && code <= 0x11A38 ) || // Mn   [6] ZANABAZAR SQUARE FINAL CONSONANT MARK..ZANABAZAR SQUARE SIGN ANUSVARA
		( 0x11A3B <= code && code <= 0x11A3E ) || // Mn   [4] ZANABAZAR SQUARE CLUSTER-FINAL LETTER YA..ZANABAZAR SQUARE CLUSTER-FINAL LETTER VA
		code === 0x11A47 || // Mn       ZANABAZAR SQUARE SUBJOINER
		( 0x11A51 <= code && code <= 0x11A56 ) || // Mn   [6] SOYOMBO VOWEL SIGN I..SOYOMBO VOWEL SIGN OE
		( 0x11A59 <= code && code <= 0x11A5B ) || // Mn   [3] SOYOMBO VOWEL SIGN VOCALIC R..SOYOMBO VOWEL LENGTH MARK
		( 0x11A8A <= code && code <= 0x11A96 ) || // Mn  [13] SOYOMBO FINAL CONSONANT SIGN G..SOYOMBO SIGN ANUSVARA
		( 0x11A98 <= code && code <= 0x11A99 ) || // Mn   [2] SOYOMBO GEMINATION MARK..SOYOMBO SUBJOINER
		( 0x11C30 <= code && code <= 0x11C36 ) || // Mn   [7] BHAIKSUKI VOWEL SIGN I..BHAIKSUKI VOWEL SIGN VOCALIC L
		( 0x11C38 <= code && code <= 0x11C3D ) || // Mn   [6] BHAIKSUKI VOWEL SIGN E..BHAIKSUKI SIGN ANUSVARA
		code === 0x11C3F || // Mn       BHAIKSUKI SIGN VIRAMA
		( 0x11C92 <= code && code <= 0x11CA7 ) || // Mn  [22] MARCHEN SUBJOINED LETTER KA..MARCHEN SUBJOINED LETTER ZA
		( 0x11CAA <= code && code <= 0x11CB0 ) || // Mn   [7] MARCHEN SUBJOINED LETTER RA..MARCHEN VOWEL SIGN AA
		( 0x11CB2 <= code && code <= 0x11CB3 ) || // Mn   [2] MARCHEN VOWEL SIGN U..MARCHEN VOWEL SIGN E
		( 0x11CB5 <= code && code <= 0x11CB6 ) || // Mn   [2] MARCHEN SIGN ANUSVARA..MARCHEN SIGN CANDRABINDU
		( 0x11D31 <= code && code <= 0x11D36 ) || // Mn   [6] MASARAM GONDI VOWEL SIGN AA..MASARAM GONDI VOWEL SIGN VOCALIC R
		code === 0x11D3A || // Mn       MASARAM GONDI VOWEL SIGN E
		( 0x11D3C <= code && code <= 0x11D3D ) || // Mn   [2] MASARAM GONDI VOWEL SIGN AI..MASARAM GONDI VOWEL SIGN O
		( 0x11D3F <= code && code <= 0x11D45 ) || // Mn   [7] MASARAM GONDI VOWEL SIGN AU..MASARAM GONDI VIRAMA
		code === 0x11D47 || // Mn       MASARAM GONDI RA-KARA
		( 0x11D90 <= code && code <= 0x11D91 ) || // Mn   [2] GUNJALA GONDI VOWEL SIGN EE..GUNJALA GONDI VOWEL SIGN AI
		code === 0x11D95 || // Mn       GUNJALA GONDI SIGN ANUSVARA
		code === 0x11D97 || // Mn       GUNJALA GONDI VIRAMA
		( 0x11EF3 <= code && code <= 0x11EF4 ) || // Mn   [2] MAKASAR VOWEL SIGN I..MAKASAR VOWEL SIGN U
		( 0x16AF0 <= code && code <= 0x16AF4 ) || // Mn   [5] BASSA VAH COMBINING HIGH TONE..BASSA VAH COMBINING HIGH-LOW TONE
		( 0x16B30 <= code && code <= 0x16B36 ) || // Mn   [7] PAHAWH HMONG MARK CIM TUB..PAHAWH HMONG MARK CIM TAUM
		code === 0x16F4F || // Mn       MIAO SIGN CONSONANT MODIFIER BAR
		( 0x16F8F <= code && code <= 0x16F92 ) || // Mn   [4] MIAO TONE RIGHT..MIAO TONE BELOW
		code === 0x16FE4 || // Mn       KHITAN SMALL SCRIPT FILLER
		( 0x1BC9D <= code && code <= 0x1BC9E ) || // Mn   [2] DUPLOYAN THICK LETTER SELECTOR..DUPLOYAN DOUBLE MARK
		code === 0x1D165 || // Mc       MUSICAL SYMBOL COMBINING STEM
		( 0x1D167 <= code && code <= 0x1D169 ) || // Mn   [3] MUSICAL SYMBOL COMBINING TREMOLO-1..MUSICAL SYMBOL COMBINING TREMOLO-3
		( 0x1D16E <= code && code <= 0x1D172 ) || // Mc   [5] MUSICAL SYMBOL COMBINING FLAG-1..MUSICAL SYMBOL COMBINING FLAG-5
		( 0x1D17B <= code && code <= 0x1D182 ) || // Mn   [8] MUSICAL SYMBOL COMBINING ACCENT..MUSICAL SYMBOL COMBINING LOURE
		( 0x1D185 <= code && code <= 0x1D18B ) || // Mn   [7] MUSICAL SYMBOL COMBINING DOIT..MUSICAL SYMBOL COMBINING TRIPLE TONGUE
		( 0x1D1AA <= code && code <= 0x1D1AD ) || // Mn   [4] MUSICAL SYMBOL COMBINING DOWN BOW..MUSICAL SYMBOL COMBINING SNAP PIZZICATO
		( 0x1D242 <= code && code <= 0x1D244 ) || // Mn   [3] COMBINING GREEK MUSICAL TRISEME..COMBINING GREEK MUSICAL PENTASEME
		( 0x1DA00 <= code && code <= 0x1DA36 ) || // Mn  [55] SIGNWRITING HEAD RIM..SIGNWRITING AIR SUCKING IN
		( 0x1DA3B <= code && code <= 0x1DA6C ) || // Mn  [50] SIGNWRITING MOUTH CLOSED NEUTRAL..SIGNWRITING EXCITEMENT
		code === 0x1DA75 || // Mn       SIGNWRITING UPPER BODY TILTING FROM HIP JOINTS
		code === 0x1DA84 || // Mn       SIGNWRITING LOCATION HEAD NECK
		( 0x1DA9B <= code && code <= 0x1DA9F ) || // Mn   [5] SIGNWRITING FILL MODIFIER-2..SIGNWRITING FILL MODIFIER-6
		( 0x1DAA1 <= code && code <= 0x1DAAF ) || // Mn  [15] SIGNWRITING ROTATION MODIFIER-2..SIGNWRITING ROTATION MODIFIER-16
		( 0x1E000 <= code && code <= 0x1E006 ) || // Mn   [7] COMBINING GLAGOLITIC LETTER AZU..COMBINING GLAGOLITIC LETTER ZHIVETE
		( 0x1E008 <= code && code <= 0x1E018 ) || // Mn  [17] COMBINING GLAGOLITIC LETTER ZEMLJA..COMBINING GLAGOLITIC LETTER HERU
		( 0x1E01B <= code && code <= 0x1E021 ) || // Mn   [7] COMBINING GLAGOLITIC LETTER SHTA..COMBINING GLAGOLITIC LETTER YATI
		( 0x1E023 <= code && code <= 0x1E024 ) || // Mn   [2] COMBINING GLAGOLITIC LETTER YU..COMBINING GLAGOLITIC LETTER SMALL YUS
		( 0x1E026 <= code && code <= 0x1E02A ) || // Mn   [5] COMBINING GLAGOLITIC LETTER YO..COMBINING GLAGOLITIC LETTER FITA
		( 0x1E130 <= code && code <= 0x1E136 ) || // Mn   [7] NYIAKENG PUACHUE HMONG TONE-B..NYIAKENG PUACHUE HMONG TONE-D
		( 0x1E2EC <= code && code <= 0x1E2EF ) || // Mn   [4] WANCHO TONE TUP..WANCHO TONE KOINI
		( 0x1E8D0 <= code && code <= 0x1E8D6 ) || // Mn   [7] MENDE KIKAKUI COMBINING NUMBER TEENS..MENDE KIKAKUI COMBINING NUMBER MILLIONS
		( 0x1E944 <= code && code <= 0x1E94A ) || // Mn   [7] ADLAM ALIF LENGTHENER..ADLAM NUKTA
		( 0x1F3FB <= code && code <= 0x1F3FF ) || // Sk   [5] EMOJI MODIFIER FITZPATRICK TYPE-1-2..EMOJI MODIFIER FITZPATRICK TYPE-6
		( 0xE0020 <= code && code <= 0xE007F ) || // Cf  [96] TAG SPACE..CANCEL TAG
		( 0xE0100 <= code && code <= 0xE01EF ) // Mn [240] VARIATION SELECTOR-17..VARIATION SELECTOR-256
	) {
		return constants.Extend;
	}
	if (
		( 0x1F1E6 <= code && code <= 0x1F1FF ) // So  [26] REGIONAL INDICATOR SYMBOL LETTER A..REGIONAL INDICATOR SYMBOL LETTER Z
	) {
		return constants.RegionalIndicator;
	}
	if (
		code === 0x0903 || // Mc       DEVANAGARI SIGN VISARGA
		code === 0x093B || // Mc       DEVANAGARI VOWEL SIGN OOE
		( 0x093E <= code && code <= 0x0940 ) || // Mc   [3] DEVANAGARI VOWEL SIGN AA..DEVANAGARI VOWEL SIGN II
		( 0x0949 <= code && code <= 0x094C ) || // Mc   [4] DEVANAGARI VOWEL SIGN CANDRA O..DEVANAGARI VOWEL SIGN AU
		( 0x094E <= code && code <= 0x094F ) || // Mc   [2] DEVANAGARI VOWEL SIGN PRISHTHAMATRA E..DEVANAGARI VOWEL SIGN AW
		( 0x0982 <= code && code <= 0x0983 ) || // Mc   [2] BENGALI SIGN ANUSVARA..BENGALI SIGN VISARGA
		( 0x09BF <= code && code <= 0x09C0 ) || // Mc   [2] BENGALI VOWEL SIGN I..BENGALI VOWEL SIGN II
		( 0x09C7 <= code && code <= 0x09C8 ) || // Mc   [2] BENGALI VOWEL SIGN E..BENGALI VOWEL SIGN AI
		( 0x09CB <= code && code <= 0x09CC ) || // Mc   [2] BENGALI VOWEL SIGN O..BENGALI VOWEL SIGN AU
		code === 0x0A03 || // Mc       GURMUKHI SIGN VISARGA
		( 0x0A3E <= code && code <= 0x0A40 ) || // Mc   [3] GURMUKHI VOWEL SIGN AA..GURMUKHI VOWEL SIGN II
		code === 0x0A83 || // Mc       GUJARATI SIGN VISARGA
		( 0x0ABE <= code && code <= 0x0AC0 ) || // Mc   [3] GUJARATI VOWEL SIGN AA..GUJARATI VOWEL SIGN II
		code === 0x0AC9 || // Mc       GUJARATI VOWEL SIGN CANDRA O
		( 0x0ACB <= code && code <= 0x0ACC ) || // Mc   [2] GUJARATI VOWEL SIGN O..GUJARATI VOWEL SIGN AU
		( 0x0B02 <= code && code <= 0x0B03 ) || // Mc   [2] ORIYA SIGN ANUSVARA..ORIYA SIGN VISARGA
		code === 0x0B40 || // Mc       ORIYA VOWEL SIGN II
		( 0x0B47 <= code && code <= 0x0B48 ) || // Mc   [2] ORIYA VOWEL SIGN E..ORIYA VOWEL SIGN AI
		( 0x0B4B <= code && code <= 0x0B4C ) || // Mc   [2] ORIYA VOWEL SIGN O..ORIYA VOWEL SIGN AU
		code === 0x0BBF || // Mc       TAMIL VOWEL SIGN I
		( 0x0BC1 <= code && code <= 0x0BC2 ) || // Mc   [2] TAMIL VOWEL SIGN U..TAMIL VOWEL SIGN UU
		( 0x0BC6 <= code && code <= 0x0BC8 ) || // Mc   [3] TAMIL VOWEL SIGN E..TAMIL VOWEL SIGN AI
		( 0x0BCA <= code && code <= 0x0BCC ) || // Mc   [3] TAMIL VOWEL SIGN O..TAMIL VOWEL SIGN AU
		( 0x0C01 <= code && code <= 0x0C03 ) || // Mc   [3] TELUGU SIGN CANDRABINDU..TELUGU SIGN VISARGA
		( 0x0C41 <= code && code <= 0x0C44 ) || // Mc   [4] TELUGU VOWEL SIGN U..TELUGU VOWEL SIGN VOCALIC RR
		( 0x0C82 <= code && code <= 0x0C83 ) || // Mc   [2] KANNADA SIGN ANUSVARA..KANNADA SIGN VISARGA
		code === 0x0CBE || // Mc       KANNADA VOWEL SIGN AA
		( 0x0CC0 <= code && code <= 0x0CC1 ) || // Mc   [2] KANNADA VOWEL SIGN II..KANNADA VOWEL SIGN U
		( 0x0CC3 <= code && code <= 0x0CC4 ) || // Mc   [2] KANNADA VOWEL SIGN VOCALIC R..KANNADA VOWEL SIGN VOCALIC RR
		( 0x0CC7 <= code && code <= 0x0CC8 ) || // Mc   [2] KANNADA VOWEL SIGN EE..KANNADA VOWEL SIGN AI
		( 0x0CCA <= code && code <= 0x0CCB ) || // Mc   [2] KANNADA VOWEL SIGN O..KANNADA VOWEL SIGN OO
		( 0x0D02 <= code && code <= 0x0D03 ) || // Mc   [2] MALAYALAM SIGN ANUSVARA..MALAYALAM SIGN VISARGA
		( 0x0D3F <= code && code <= 0x0D40 ) || // Mc   [2] MALAYALAM VOWEL SIGN I..MALAYALAM VOWEL SIGN II
		( 0x0D46 <= code && code <= 0x0D48 ) || // Mc   [3] MALAYALAM VOWEL SIGN E..MALAYALAM VOWEL SIGN AI
		( 0x0D4A <= code && code <= 0x0D4C ) || // Mc   [3] MALAYALAM VOWEL SIGN O..MALAYALAM VOWEL SIGN AU
		( 0x0D82 <= code && code <= 0x0D83 ) || // Mc   [2] SINHALA SIGN ANUSVARAYA..SINHALA SIGN VISARGAYA
		( 0x0DD0 <= code && code <= 0x0DD1 ) || // Mc   [2] SINHALA VOWEL SIGN KETTI AEDA-PILLA..SINHALA VOWEL SIGN DIGA AEDA-PILLA
		( 0x0DD8 <= code && code <= 0x0DDE ) || // Mc   [7] SINHALA VOWEL SIGN GAETTA-PILLA..SINHALA VOWEL SIGN KOMBUVA HAA GAYANUKITTA
		( 0x0DF2 <= code && code <= 0x0DF3 ) || // Mc   [2] SINHALA VOWEL SIGN DIGA GAETTA-PILLA..SINHALA VOWEL SIGN DIGA GAYANUKITTA
		code === 0x0E33 || // Lo       THAI CHARACTER SARA AM
		code === 0x0EB3 || // Lo       LAO VOWEL SIGN AM
		( 0x0F3E <= code && code <= 0x0F3F ) || // Mc   [2] TIBETAN SIGN YAR TSHES..TIBETAN SIGN MAR TSHES
		code === 0x0F7F || // Mc       TIBETAN SIGN RNAM BCAD
		code === 0x1031 || // Mc       MYANMAR VOWEL SIGN E
		( 0x103B <= code && code <= 0x103C ) || // Mc   [2] MYANMAR CONSONANT SIGN MEDIAL YA..MYANMAR CONSONANT SIGN MEDIAL RA
		( 0x1056 <= code && code <= 0x1057 ) || // Mc   [2] MYANMAR VOWEL SIGN VOCALIC R..MYANMAR VOWEL SIGN VOCALIC RR
		code === 0x1084 || // Mc       MYANMAR VOWEL SIGN SHAN E
		code === 0x17B6 || // Mc       KHMER VOWEL SIGN AA
		( 0x17BE <= code && code <= 0x17C5 ) || // Mc   [8] KHMER VOWEL SIGN OE..KHMER VOWEL SIGN AU
		( 0x17C7 <= code && code <= 0x17C8 ) || // Mc   [2] KHMER SIGN REAHMUK..KHMER SIGN YUUKALEAPINTU
		( 0x1923 <= code && code <= 0x1926 ) || // Mc   [4] LIMBU VOWEL SIGN EE..LIMBU VOWEL SIGN AU
		( 0x1929 <= code && code <= 0x192B ) || // Mc   [3] LIMBU SUBJOINED LETTER YA..LIMBU SUBJOINED LETTER WA
		( 0x1930 <= code && code <= 0x1931 ) || // Mc   [2] LIMBU SMALL LETTER KA..LIMBU SMALL LETTER NGA
		( 0x1933 <= code && code <= 0x1938 ) || // Mc   [6] LIMBU SMALL LETTER TA..LIMBU SMALL LETTER LA
		( 0x1A19 <= code && code <= 0x1A1A ) || // Mc   [2] BUGINESE VOWEL SIGN E..BUGINESE VOWEL SIGN O
		code === 0x1A55 || // Mc       TAI THAM CONSONANT SIGN MEDIAL RA
		code === 0x1A57 || // Mc       TAI THAM CONSONANT SIGN LA TANG LAI
		( 0x1A6D <= code && code <= 0x1A72 ) || // Mc   [6] TAI THAM VOWEL SIGN OY..TAI THAM VOWEL SIGN THAM AI
		code === 0x1B04 || // Mc       BALINESE SIGN BISAH
		code === 0x1B3B || // Mc       BALINESE VOWEL SIGN RA REPA TEDUNG
		( 0x1B3D <= code && code <= 0x1B41 ) || // Mc   [5] BALINESE VOWEL SIGN LA LENGA TEDUNG..BALINESE VOWEL SIGN TALING REPA TEDUNG
		( 0x1B43 <= code && code <= 0x1B44 ) || // Mc   [2] BALINESE VOWEL SIGN PEPET TEDUNG..BALINESE ADEG ADEG
		code === 0x1B82 || // Mc       SUNDANESE SIGN PANGWISAD
		code === 0x1BA1 || // Mc       SUNDANESE CONSONANT SIGN PAMINGKAL
		( 0x1BA6 <= code && code <= 0x1BA7 ) || // Mc   [2] SUNDANESE VOWEL SIGN PANAELAENG..SUNDANESE VOWEL SIGN PANOLONG
		code === 0x1BAA || // Mc       SUNDANESE SIGN PAMAAEH
		code === 0x1BE7 || // Mc       BATAK VOWEL SIGN E
		( 0x1BEA <= code && code <= 0x1BEC ) || // Mc   [3] BATAK VOWEL SIGN I..BATAK VOWEL SIGN O
		code === 0x1BEE || // Mc       BATAK VOWEL SIGN U
		( 0x1BF2 <= code && code <= 0x1BF3 ) || // Mc   [2] BATAK PANGOLAT..BATAK PANONGONAN
		( 0x1C24 <= code && code <= 0x1C2B ) || // Mc   [8] LEPCHA SUBJOINED LETTER YA..LEPCHA VOWEL SIGN UU
		( 0x1C34 <= code && code <= 0x1C35 ) || // Mc   [2] LEPCHA CONSONANT SIGN NYIN-DO..LEPCHA CONSONANT SIGN KANG
		code === 0x1CE1 || // Mc       VEDIC TONE ATHARVAVEDIC INDEPENDENT SVARITA
		code === 0x1CF7 || // Mc       VEDIC SIGN ATIKRAMA
		( 0xA823 <= code && code <= 0xA824 ) || // Mc   [2] SYLOTI NAGRI VOWEL SIGN A..SYLOTI NAGRI VOWEL SIGN I
		code === 0xA827 || // Mc       SYLOTI NAGRI VOWEL SIGN OO
		( 0xA880 <= code && code <= 0xA881 ) || // Mc   [2] SAURASHTRA SIGN ANUSVARA..SAURASHTRA SIGN VISARGA
		( 0xA8B4 <= code && code <= 0xA8C3 ) || // Mc  [16] SAURASHTRA CONSONANT SIGN HAARU..SAURASHTRA VOWEL SIGN AU
		( 0xA952 <= code && code <= 0xA953 ) || // Mc   [2] REJANG CONSONANT SIGN H..REJANG VIRAMA
		code === 0xA983 || // Mc       JAVANESE SIGN WIGNYAN
		( 0xA9B4 <= code && code <= 0xA9B5 ) || // Mc   [2] JAVANESE VOWEL SIGN TARUNG..JAVANESE VOWEL SIGN TOLONG
		( 0xA9BA <= code && code <= 0xA9BB ) || // Mc   [2] JAVANESE VOWEL SIGN TALING..JAVANESE VOWEL SIGN DIRGA MURE
		( 0xA9BE <= code && code <= 0xA9C0 ) || // Mc   [3] JAVANESE CONSONANT SIGN PENGKAL..JAVANESE PANGKON
		( 0xAA2F <= code && code <= 0xAA30 ) || // Mc   [2] CHAM VOWEL SIGN O..CHAM VOWEL SIGN AI
		( 0xAA33 <= code && code <= 0xAA34 ) || // Mc   [2] CHAM CONSONANT SIGN YA..CHAM CONSONANT SIGN RA
		code === 0xAA4D || // Mc       CHAM CONSONANT SIGN FINAL H
		code === 0xAAEB || // Mc       MEETEI MAYEK VOWEL SIGN II
		( 0xAAEE <= code && code <= 0xAAEF ) || // Mc   [2] MEETEI MAYEK VOWEL SIGN AU..MEETEI MAYEK VOWEL SIGN AAU
		code === 0xAAF5 || // Mc       MEETEI MAYEK VOWEL SIGN VISARGA
		( 0xABE3 <= code && code <= 0xABE4 ) || // Mc   [2] MEETEI MAYEK VOWEL SIGN ONAP..MEETEI MAYEK VOWEL SIGN INAP
		( 0xABE6 <= code && code <= 0xABE7 ) || // Mc   [2] MEETEI MAYEK VOWEL SIGN YENAP..MEETEI MAYEK VOWEL SIGN SOUNAP
		( 0xABE9 <= code && code <= 0xABEA ) || // Mc   [2] MEETEI MAYEK VOWEL SIGN CHEINAP..MEETEI MAYEK VOWEL SIGN NUNG
		code === 0xABEC || // Mc       MEETEI MAYEK LUM IYEK
		code === 0x11000 || // Mc       BRAHMI SIGN CANDRABINDU
		code === 0x11002 || // Mc       BRAHMI SIGN VISARGA
		code === 0x11082 || // Mc       KAITHI SIGN VISARGA
		( 0x110B0 <= code && code <= 0x110B2 ) || // Mc   [3] KAITHI VOWEL SIGN AA..KAITHI VOWEL SIGN II
		( 0x110B7 <= code && code <= 0x110B8 ) || // Mc   [2] KAITHI VOWEL SIGN O..KAITHI VOWEL SIGN AU
		code === 0x1112C || // Mc       CHAKMA VOWEL SIGN E
		( 0x11145 <= code && code <= 0x11146 ) || // Mc   [2] CHAKMA VOWEL SIGN AA..CHAKMA VOWEL SIGN EI
		code === 0x11182 || // Mc       SHARADA SIGN VISARGA
		( 0x111B3 <= code && code <= 0x111B5 ) || // Mc   [3] SHARADA VOWEL SIGN AA..SHARADA VOWEL SIGN II
		( 0x111BF <= code && code <= 0x111C0 ) || // Mc   [2] SHARADA VOWEL SIGN AU..SHARADA SIGN VIRAMA
		code === 0x111CE || // Mc       SHARADA VOWEL SIGN PRISHTHAMATRA E
		( 0x1122C <= code && code <= 0x1122E ) || // Mc   [3] KHOJKI VOWEL SIGN AA..KHOJKI VOWEL SIGN II
		( 0x11232 <= code && code <= 0x11233 ) || // Mc   [2] KHOJKI VOWEL SIGN O..KHOJKI VOWEL SIGN AU
		code === 0x11235 || // Mc       KHOJKI SIGN VIRAMA
		( 0x112E0 <= code && code <= 0x112E2 ) || // Mc   [3] KHUDAWADI VOWEL SIGN AA..KHUDAWADI VOWEL SIGN II
		( 0x11302 <= code && code <= 0x11303 ) || // Mc   [2] GRANTHA SIGN ANUSVARA..GRANTHA SIGN VISARGA
		code === 0x1133F || // Mc       GRANTHA VOWEL SIGN I
		( 0x11341 <= code && code <= 0x11344 ) || // Mc   [4] GRANTHA VOWEL SIGN U..GRANTHA VOWEL SIGN VOCALIC RR
		( 0x11347 <= code && code <= 0x11348 ) || // Mc   [2] GRANTHA VOWEL SIGN EE..GRANTHA VOWEL SIGN AI
		( 0x1134B <= code && code <= 0x1134D ) || // Mc   [3] GRANTHA VOWEL SIGN OO..GRANTHA SIGN VIRAMA
		( 0x11362 <= code && code <= 0x11363 ) || // Mc   [2] GRANTHA VOWEL SIGN VOCALIC L..GRANTHA VOWEL SIGN VOCALIC LL
		( 0x11435 <= code && code <= 0x11437 ) || // Mc   [3] NEWA VOWEL SIGN AA..NEWA VOWEL SIGN II
		( 0x11440 <= code && code <= 0x11441 ) || // Mc   [2] NEWA VOWEL SIGN O..NEWA VOWEL SIGN AU
		code === 0x11445 || // Mc       NEWA SIGN VISARGA
		( 0x114B1 <= code && code <= 0x114B2 ) || // Mc   [2] TIRHUTA VOWEL SIGN I..TIRHUTA VOWEL SIGN II
		code === 0x114B9 || // Mc       TIRHUTA VOWEL SIGN E
		( 0x114BB <= code && code <= 0x114BC ) || // Mc   [2] TIRHUTA VOWEL SIGN AI..TIRHUTA VOWEL SIGN O
		code === 0x114BE || // Mc       TIRHUTA VOWEL SIGN AU
		code === 0x114C1 || // Mc       TIRHUTA SIGN VISARGA
		( 0x115B0 <= code && code <= 0x115B1 ) || // Mc   [2] SIDDHAM VOWEL SIGN I..SIDDHAM VOWEL SIGN II
		( 0x115B8 <= code && code <= 0x115BB ) || // Mc   [4] SIDDHAM VOWEL SIGN E..SIDDHAM VOWEL SIGN AU
		code === 0x115BE || // Mc       SIDDHAM SIGN VISARGA
		( 0x11630 <= code && code <= 0x11632 ) || // Mc   [3] MODI VOWEL SIGN AA..MODI VOWEL SIGN II
		( 0x1163B <= code && code <= 0x1163C ) || // Mc   [2] MODI VOWEL SIGN O..MODI VOWEL SIGN AU
		code === 0x1163E || // Mc       MODI SIGN VISARGA
		code === 0x116AC || // Mc       TAKRI SIGN VISARGA
		( 0x116AE <= code && code <= 0x116AF ) || // Mc   [2] TAKRI VOWEL SIGN I..TAKRI VOWEL SIGN II
		code === 0x116B6 || // Mc       TAKRI SIGN VIRAMA
		( 0x11720 <= code && code <= 0x11721 ) || // Mc   [2] AHOM VOWEL SIGN A..AHOM VOWEL SIGN AA
		code === 0x11726 || // Mc       AHOM VOWEL SIGN E
		( 0x1182C <= code && code <= 0x1182E ) || // Mc   [3] DOGRA VOWEL SIGN AA..DOGRA VOWEL SIGN II
		code === 0x11838 || // Mc       DOGRA SIGN VISARGA
		( 0x11931 <= code && code <= 0x11935 ) || // Mc   [5] DIVES AKURU VOWEL SIGN I..DIVES AKURU VOWEL SIGN E
		( 0x11937 <= code && code <= 0x11938 ) || // Mc   [2] DIVES AKURU VOWEL SIGN AI..DIVES AKURU VOWEL SIGN O
		code === 0x1193D || // Mc       DIVES AKURU SIGN HALANTA
		code === 0x11940 || // Mc       DIVES AKURU MEDIAL YA
		code === 0x11942 || // Mc       DIVES AKURU MEDIAL RA
		( 0x119D1 <= code && code <= 0x119D3 ) || // Mc   [3] NANDINAGARI VOWEL SIGN AA..NANDINAGARI VOWEL SIGN II
		( 0x119DC <= code && code <= 0x119DF ) || // Mc   [4] NANDINAGARI VOWEL SIGN O..NANDINAGARI SIGN VISARGA
		code === 0x119E4 || // Mc       NANDINAGARI VOWEL SIGN PRISHTHAMATRA E
		code === 0x11A39 || // Mc       ZANABAZAR SQUARE SIGN VISARGA
		( 0x11A57 <= code && code <= 0x11A58 ) || // Mc   [2] SOYOMBO VOWEL SIGN AI..SOYOMBO VOWEL SIGN AU
		code === 0x11A97 || // Mc       SOYOMBO SIGN VISARGA
		code === 0x11C2F || // Mc       BHAIKSUKI VOWEL SIGN AA
		code === 0x11C3E || // Mc       BHAIKSUKI SIGN VISARGA
		code === 0x11CA9 || // Mc       MARCHEN SUBJOINED LETTER YA
		code === 0x11CB1 || // Mc       MARCHEN VOWEL SIGN I
		code === 0x11CB4 || // Mc       MARCHEN VOWEL SIGN O
		( 0x11D8A <= code && code <= 0x11D8E ) || // Mc   [5] GUNJALA GONDI VOWEL SIGN AA..GUNJALA GONDI VOWEL SIGN UU
		( 0x11D93 <= code && code <= 0x11D94 ) || // Mc   [2] GUNJALA GONDI VOWEL SIGN OO..GUNJALA GONDI VOWEL SIGN AU
		code === 0x11D96 || // Mc       GUNJALA GONDI SIGN VISARGA
		( 0x11EF5 <= code && code <= 0x11EF6 ) || // Mc   [2] MAKASAR VOWEL SIGN E..MAKASAR VOWEL SIGN O
		( 0x16F51 <= code && code <= 0x16F87 ) || // Mc  [55] MIAO SIGN ASPIRATION..MIAO VOWEL SIGN UI
		( 0x16FF0 <= code && code <= 0x16FF1 ) || // Mc   [2] VIETNAMESE ALTERNATE READING MARK CA..VIETNAMESE ALTERNATE READING MARK NHAY
		code === 0x1D166 || // Mc       MUSICAL SYMBOL COMBINING SPRECHGESANG STEM
		code === 0x1D16D // Mc       MUSICAL SYMBOL COMBINING AUGMENTATION DOT
	) {
		return constants.SpacingMark;
	}
	if (
		( 0x1100 <= code && code <= 0x115F ) || // Lo  [96] HANGUL CHOSEONG KIYEOK..HANGUL CHOSEONG FILLER
		( 0xA960 <= code && code <= 0xA97C ) // Lo  [29] HANGUL CHOSEONG TIKEUT-MIEUM..HANGUL CHOSEONG SSANGYEORINHIEUH
	) {
		return constants.L;
	}
	if (
		( 0x1160 <= code && code <= 0x11A7 ) || // Lo  [72] HANGUL JUNGSEONG FILLER..HANGUL JUNGSEONG O-YAE
		( 0xD7B0 <= code && code <= 0xD7C6 ) // Lo  [23] HANGUL JUNGSEONG O-YEO..HANGUL JUNGSEONG ARAEA-E
	) {
		return constants.V;
	}
	if (
		( 0x11A8 <= code && code <= 0x11FF ) || // Lo  [88] HANGUL JONGSEONG KIYEOK..HANGUL JONGSEONG SSANGNIEUN
		( 0xD7CB <= code && code <= 0xD7FB ) // Lo  [49] HANGUL JONGSEONG NIEUN-RIEUL..HANGUL JONGSEONG PHIEUPH-THIEUTH
	) {
		return constants.T;
	}
	if (
		code === 0xAC00 || // Lo       HANGUL SYLLABLE GA
		code === 0xAC1C || // Lo       HANGUL SYLLABLE GAE
		code === 0xAC38 || // Lo       HANGUL SYLLABLE GYA
		code === 0xAC54 || // Lo       HANGUL SYLLABLE GYAE
		code === 0xAC70 || // Lo       HANGUL SYLLABLE GEO
		code === 0xAC8C || // Lo       HANGUL SYLLABLE GE
		code === 0xACA8 || // Lo       HANGUL SYLLABLE GYEO
		code === 0xACC4 || // Lo       HANGUL SYLLABLE GYE
		code === 0xACE0 || // Lo       HANGUL SYLLABLE GO
		code === 0xACFC || // Lo       HANGUL SYLLABLE GWA
		code === 0xAD18 || // Lo       HANGUL SYLLABLE GWAE
		code === 0xAD34 || // Lo       HANGUL SYLLABLE GOE
		code === 0xAD50 || // Lo       HANGUL SYLLABLE GYO
		code === 0xAD6C || // Lo       HANGUL SYLLABLE GU
		code === 0xAD88 || // Lo       HANGUL SYLLABLE GWEO
		code === 0xADA4 || // Lo       HANGUL SYLLABLE GWE
		code === 0xADC0 || // Lo       HANGUL SYLLABLE GWI
		code === 0xADDC || // Lo       HANGUL SYLLABLE GYU
		code === 0xADF8 || // Lo       HANGUL SYLLABLE GEU
		code === 0xAE14 || // Lo       HANGUL SYLLABLE GYI
		code === 0xAE30 || // Lo       HANGUL SYLLABLE GI
		code === 0xAE4C || // Lo       HANGUL SYLLABLE GGA
		code === 0xAE68 || // Lo       HANGUL SYLLABLE GGAE
		code === 0xAE84 || // Lo       HANGUL SYLLABLE GGYA
		code === 0xAEA0 || // Lo       HANGUL SYLLABLE GGYAE
		code === 0xAEBC || // Lo       HANGUL SYLLABLE GGEO
		code === 0xAED8 || // Lo       HANGUL SYLLABLE GGE
		code === 0xAEF4 || // Lo       HANGUL SYLLABLE GGYEO
		code === 0xAF10 || // Lo       HANGUL SYLLABLE GGYE
		code === 0xAF2C || // Lo       HANGUL SYLLABLE GGO
		code === 0xAF48 || // Lo       HANGUL SYLLABLE GGWA
		code === 0xAF64 || // Lo       HANGUL SYLLABLE GGWAE
		code === 0xAF80 || // Lo       HANGUL SYLLABLE GGOE
		code === 0xAF9C || // Lo       HANGUL SYLLABLE GGYO
		code === 0xAFB8 || // Lo       HANGUL SYLLABLE GGU
		code === 0xAFD4 || // Lo       HANGUL SYLLABLE GGWEO
		code === 0xAFF0 || // Lo       HANGUL SYLLABLE GGWE
		code === 0xB00C || // Lo       HANGUL SYLLABLE GGWI
		code === 0xB028 || // Lo       HANGUL SYLLABLE GGYU
		code === 0xB044 || // Lo       HANGUL SYLLABLE GGEU
		code === 0xB060 || // Lo       HANGUL SYLLABLE GGYI
		code === 0xB07C || // Lo       HANGUL SYLLABLE GGI
		code === 0xB098 || // Lo       HANGUL SYLLABLE NA
		code === 0xB0B4 || // Lo       HANGUL SYLLABLE NAE
		code === 0xB0D0 || // Lo       HANGUL SYLLABLE NYA
		code === 0xB0EC || // Lo       HANGUL SYLLABLE NYAE
		code === 0xB108 || // Lo       HANGUL SYLLABLE NEO
		code === 0xB124 || // Lo       HANGUL SYLLABLE NE
		code === 0xB140 || // Lo       HANGUL SYLLABLE NYEO
		code === 0xB15C || // Lo       HANGUL SYLLABLE NYE
		code === 0xB178 || // Lo       HANGUL SYLLABLE NO
		code === 0xB194 || // Lo       HANGUL SYLLABLE NWA
		code === 0xB1B0 || // Lo       HANGUL SYLLABLE NWAE
		code === 0xB1CC || // Lo       HANGUL SYLLABLE NOE
		code === 0xB1E8 || // Lo       HANGUL SYLLABLE NYO
		code === 0xB204 || // Lo       HANGUL SYLLABLE NU
		code === 0xB220 || // Lo       HANGUL SYLLABLE NWEO
		code === 0xB23C || // Lo       HANGUL SYLLABLE NWE
		code === 0xB258 || // Lo       HANGUL SYLLABLE NWI
		code === 0xB274 || // Lo       HANGUL SYLLABLE NYU
		code === 0xB290 || // Lo       HANGUL SYLLABLE NEU
		code === 0xB2AC || // Lo       HANGUL SYLLABLE NYI
		code === 0xB2C8 || // Lo       HANGUL SYLLABLE NI
		code === 0xB2E4 || // Lo       HANGUL SYLLABLE DA
		code === 0xB300 || // Lo       HANGUL SYLLABLE DAE
		code === 0xB31C || // Lo       HANGUL SYLLABLE DYA
		code === 0xB338 || // Lo       HANGUL SYLLABLE DYAE
		code === 0xB354 || // Lo       HANGUL SYLLABLE DEO
		code === 0xB370 || // Lo       HANGUL SYLLABLE DE
		code === 0xB38C || // Lo       HANGUL SYLLABLE DYEO
		code === 0xB3A8 || // Lo       HANGUL SYLLABLE DYE
		code === 0xB3C4 || // Lo       HANGUL SYLLABLE DO
		code === 0xB3E0 || // Lo       HANGUL SYLLABLE DWA
		code === 0xB3FC || // Lo       HANGUL SYLLABLE DWAE
		code === 0xB418 || // Lo       HANGUL SYLLABLE DOE
		code === 0xB434 || // Lo       HANGUL SYLLABLE DYO
		code === 0xB450 || // Lo       HANGUL SYLLABLE DU
		code === 0xB46C || // Lo       HANGUL SYLLABLE DWEO
		code === 0xB488 || // Lo       HANGUL SYLLABLE DWE
		code === 0xB4A4 || // Lo       HANGUL SYLLABLE DWI
		code === 0xB4C0 || // Lo       HANGUL SYLLABLE DYU
		code === 0xB4DC || // Lo       HANGUL SYLLABLE DEU
		code === 0xB4F8 || // Lo       HANGUL SYLLABLE DYI
		code === 0xB514 || // Lo       HANGUL SYLLABLE DI
		code === 0xB530 || // Lo       HANGUL SYLLABLE DDA
		code === 0xB54C || // Lo       HANGUL SYLLABLE DDAE
		code === 0xB568 || // Lo       HANGUL SYLLABLE DDYA
		code === 0xB584 || // Lo       HANGUL SYLLABLE DDYAE
		code === 0xB5A0 || // Lo       HANGUL SYLLABLE DDEO
		code === 0xB5BC || // Lo       HANGUL SYLLABLE DDE
		code === 0xB5D8 || // Lo       HANGUL SYLLABLE DDYEO
		code === 0xB5F4 || // Lo       HANGUL SYLLABLE DDYE
		code === 0xB610 || // Lo       HANGUL SYLLABLE DDO
		code === 0xB62C || // Lo       HANGUL SYLLABLE DDWA
		code === 0xB648 || // Lo       HANGUL SYLLABLE DDWAE
		code === 0xB664 || // Lo       HANGUL SYLLABLE DDOE
		code === 0xB680 || // Lo       HANGUL SYLLABLE DDYO
		code === 0xB69C || // Lo       HANGUL SYLLABLE DDU
		code === 0xB6B8 || // Lo       HANGUL SYLLABLE DDWEO
		code === 0xB6D4 || // Lo       HANGUL SYLLABLE DDWE
		code === 0xB6F0 || // Lo       HANGUL SYLLABLE DDWI
		code === 0xB70C || // Lo       HANGUL SYLLABLE DDYU
		code === 0xB728 || // Lo       HANGUL SYLLABLE DDEU
		code === 0xB744 || // Lo       HANGUL SYLLABLE DDYI
		code === 0xB760 || // Lo       HANGUL SYLLABLE DDI
		code === 0xB77C || // Lo       HANGUL SYLLABLE RA
		code === 0xB798 || // Lo       HANGUL SYLLABLE RAE
		code === 0xB7B4 || // Lo       HANGUL SYLLABLE RYA
		code === 0xB7D0 || // Lo       HANGUL SYLLABLE RYAE
		code === 0xB7EC || // Lo       HANGUL SYLLABLE REO
		code === 0xB808 || // Lo       HANGUL SYLLABLE RE
		code === 0xB824 || // Lo       HANGUL SYLLABLE RYEO
		code === 0xB840 || // Lo       HANGUL SYLLABLE RYE
		code === 0xB85C || // Lo       HANGUL SYLLABLE RO
		code === 0xB878 || // Lo       HANGUL SYLLABLE RWA
		code === 0xB894 || // Lo       HANGUL SYLLABLE RWAE
		code === 0xB8B0 || // Lo       HANGUL SYLLABLE ROE
		code === 0xB8CC || // Lo       HANGUL SYLLABLE RYO
		code === 0xB8E8 || // Lo       HANGUL SYLLABLE RU
		code === 0xB904 || // Lo       HANGUL SYLLABLE RWEO
		code === 0xB920 || // Lo       HANGUL SYLLABLE RWE
		code === 0xB93C || // Lo       HANGUL SYLLABLE RWI
		code === 0xB958 || // Lo       HANGUL SYLLABLE RYU
		code === 0xB974 || // Lo       HANGUL SYLLABLE REU
		code === 0xB990 || // Lo       HANGUL SYLLABLE RYI
		code === 0xB9AC || // Lo       HANGUL SYLLABLE RI
		code === 0xB9C8 || // Lo       HANGUL SYLLABLE MA
		code === 0xB9E4 || // Lo       HANGUL SYLLABLE MAE
		code === 0xBA00 || // Lo       HANGUL SYLLABLE MYA
		code === 0xBA1C || // Lo       HANGUL SYLLABLE MYAE
		code === 0xBA38 || // Lo       HANGUL SYLLABLE MEO
		code === 0xBA54 || // Lo       HANGUL SYLLABLE ME
		code === 0xBA70 || // Lo       HANGUL SYLLABLE MYEO
		code === 0xBA8C || // Lo       HANGUL SYLLABLE MYE
		code === 0xBAA8 || // Lo       HANGUL SYLLABLE MO
		code === 0xBAC4 || // Lo       HANGUL SYLLABLE MWA
		code === 0xBAE0 || // Lo       HANGUL SYLLABLE MWAE
		code === 0xBAFC || // Lo       HANGUL SYLLABLE MOE
		code === 0xBB18 || // Lo       HANGUL SYLLABLE MYO
		code === 0xBB34 || // Lo       HANGUL SYLLABLE MU
		code === 0xBB50 || // Lo       HANGUL SYLLABLE MWEO
		code === 0xBB6C || // Lo       HANGUL SYLLABLE MWE
		code === 0xBB88 || // Lo       HANGUL SYLLABLE MWI
		code === 0xBBA4 || // Lo       HANGUL SYLLABLE MYU
		code === 0xBBC0 || // Lo       HANGUL SYLLABLE MEU
		code === 0xBBDC || // Lo       HANGUL SYLLABLE MYI
		code === 0xBBF8 || // Lo       HANGUL SYLLABLE MI
		code === 0xBC14 || // Lo       HANGUL SYLLABLE BA
		code === 0xBC30 || // Lo       HANGUL SYLLABLE BAE
		code === 0xBC4C || // Lo       HANGUL SYLLABLE BYA
		code === 0xBC68 || // Lo       HANGUL SYLLABLE BYAE
		code === 0xBC84 || // Lo       HANGUL SYLLABLE BEO
		code === 0xBCA0 || // Lo       HANGUL SYLLABLE BE
		code === 0xBCBC || // Lo       HANGUL SYLLABLE BYEO
		code === 0xBCD8 || // Lo       HANGUL SYLLABLE BYE
		code === 0xBCF4 || // Lo       HANGUL SYLLABLE BO
		code === 0xBD10 || // Lo       HANGUL SYLLABLE BWA
		code === 0xBD2C || // Lo       HANGUL SYLLABLE BWAE
		code === 0xBD48 || // Lo       HANGUL SYLLABLE BOE
		code === 0xBD64 || // Lo       HANGUL SYLLABLE BYO
		code === 0xBD80 || // Lo       HANGUL SYLLABLE BU
		code === 0xBD9C || // Lo       HANGUL SYLLABLE BWEO
		code === 0xBDB8 || // Lo       HANGUL SYLLABLE BWE
		code === 0xBDD4 || // Lo       HANGUL SYLLABLE BWI
		code === 0xBDF0 || // Lo       HANGUL SYLLABLE BYU
		code === 0xBE0C || // Lo       HANGUL SYLLABLE BEU
		code === 0xBE28 || // Lo       HANGUL SYLLABLE BYI
		code === 0xBE44 || // Lo       HANGUL SYLLABLE BI
		code === 0xBE60 || // Lo       HANGUL SYLLABLE BBA
		code === 0xBE7C || // Lo       HANGUL SYLLABLE BBAE
		code === 0xBE98 || // Lo       HANGUL SYLLABLE BBYA
		code === 0xBEB4 || // Lo       HANGUL SYLLABLE BBYAE
		code === 0xBED0 || // Lo       HANGUL SYLLABLE BBEO
		code === 0xBEEC || // Lo       HANGUL SYLLABLE BBE
		code === 0xBF08 || // Lo       HANGUL SYLLABLE BBYEO
		code === 0xBF24 || // Lo       HANGUL SYLLABLE BBYE
		code === 0xBF40 || // Lo       HANGUL SYLLABLE BBO
		code === 0xBF5C || // Lo       HANGUL SYLLABLE BBWA
		code === 0xBF78 || // Lo       HANGUL SYLLABLE BBWAE
		code === 0xBF94 || // Lo       HANGUL SYLLABLE BBOE
		code === 0xBFB0 || // Lo       HANGUL SYLLABLE BBYO
		code === 0xBFCC || // Lo       HANGUL SYLLABLE BBU
		code === 0xBFE8 || // Lo       HANGUL SYLLABLE BBWEO
		code === 0xC004 || // Lo       HANGUL SYLLABLE BBWE
		code === 0xC020 || // Lo       HANGUL SYLLABLE BBWI
		code === 0xC03C || // Lo       HANGUL SYLLABLE BBYU
		code === 0xC058 || // Lo       HANGUL SYLLABLE BBEU
		code === 0xC074 || // Lo       HANGUL SYLLABLE BBYI
		code === 0xC090 || // Lo       HANGUL SYLLABLE BBI
		code === 0xC0AC || // Lo       HANGUL SYLLABLE SA
		code === 0xC0C8 || // Lo       HANGUL SYLLABLE SAE
		code === 0xC0E4 || // Lo       HANGUL SYLLABLE SYA
		code === 0xC100 || // Lo       HANGUL SYLLABLE SYAE
		code === 0xC11C || // Lo       HANGUL SYLLABLE SEO
		code === 0xC138 || // Lo       HANGUL SYLLABLE SE
		code === 0xC154 || // Lo       HANGUL SYLLABLE SYEO
		code === 0xC170 || // Lo       HANGUL SYLLABLE SYE
		code === 0xC18C || // Lo       HANGUL SYLLABLE SO
		code === 0xC1A8 || // Lo       HANGUL SYLLABLE SWA
		code === 0xC1C4 || // Lo       HANGUL SYLLABLE SWAE
		code === 0xC1E0 || // Lo       HANGUL SYLLABLE SOE
		code === 0xC1FC || // Lo       HANGUL SYLLABLE SYO
		code === 0xC218 || // Lo       HANGUL SYLLABLE SU
		code === 0xC234 || // Lo       HANGUL SYLLABLE SWEO
		code === 0xC250 || // Lo       HANGUL SYLLABLE SWE
		code === 0xC26C || // Lo       HANGUL SYLLABLE SWI
		code === 0xC288 || // Lo       HANGUL SYLLABLE SYU
		code === 0xC2A4 || // Lo       HANGUL SYLLABLE SEU
		code === 0xC2C0 || // Lo       HANGUL SYLLABLE SYI
		code === 0xC2DC || // Lo       HANGUL SYLLABLE SI
		code === 0xC2F8 || // Lo       HANGUL SYLLABLE SSA
		code === 0xC314 || // Lo       HANGUL SYLLABLE SSAE
		code === 0xC330 || // Lo       HANGUL SYLLABLE SSYA
		code === 0xC34C || // Lo       HANGUL SYLLABLE SSYAE
		code === 0xC368 || // Lo       HANGUL SYLLABLE SSEO
		code === 0xC384 || // Lo       HANGUL SYLLABLE SSE
		code === 0xC3A0 || // Lo       HANGUL SYLLABLE SSYEO
		code === 0xC3BC || // Lo       HANGUL SYLLABLE SSYE
		code === 0xC3D8 || // Lo       HANGUL SYLLABLE SSO
		code === 0xC3F4 || // Lo       HANGUL SYLLABLE SSWA
		code === 0xC410 || // Lo       HANGUL SYLLABLE SSWAE
		code === 0xC42C || // Lo       HANGUL SYLLABLE SSOE
		code === 0xC448 || // Lo       HANGUL SYLLABLE SSYO
		code === 0xC464 || // Lo       HANGUL SYLLABLE SSU
		code === 0xC480 || // Lo       HANGUL SYLLABLE SSWEO
		code === 0xC49C || // Lo       HANGUL SYLLABLE SSWE
		code === 0xC4B8 || // Lo       HANGUL SYLLABLE SSWI
		code === 0xC4D4 || // Lo       HANGUL SYLLABLE SSYU
		code === 0xC4F0 || // Lo       HANGUL SYLLABLE SSEU
		code === 0xC50C || // Lo       HANGUL SYLLABLE SSYI
		code === 0xC528 || // Lo       HANGUL SYLLABLE SSI
		code === 0xC544 || // Lo       HANGUL SYLLABLE A
		code === 0xC560 || // Lo       HANGUL SYLLABLE AE
		code === 0xC57C || // Lo       HANGUL SYLLABLE YA
		code === 0xC598 || // Lo       HANGUL SYLLABLE YAE
		code === 0xC5B4 || // Lo       HANGUL SYLLABLE EO
		code === 0xC5D0 || // Lo       HANGUL SYLLABLE E
		code === 0xC5EC || // Lo       HANGUL SYLLABLE YEO
		code === 0xC608 || // Lo       HANGUL SYLLABLE YE
		code === 0xC624 || // Lo       HANGUL SYLLABLE O
		code === 0xC640 || // Lo       HANGUL SYLLABLE WA
		code === 0xC65C || // Lo       HANGUL SYLLABLE WAE
		code === 0xC678 || // Lo       HANGUL SYLLABLE OE
		code === 0xC694 || // Lo       HANGUL SYLLABLE YO
		code === 0xC6B0 || // Lo       HANGUL SYLLABLE U
		code === 0xC6CC || // Lo       HANGUL SYLLABLE WEO
		code === 0xC6E8 || // Lo       HANGUL SYLLABLE WE
		code === 0xC704 || // Lo       HANGUL SYLLABLE WI
		code === 0xC720 || // Lo       HANGUL SYLLABLE YU
		code === 0xC73C || // Lo       HANGUL SYLLABLE EU
		code === 0xC758 || // Lo       HANGUL SYLLABLE YI
		code === 0xC774 || // Lo       HANGUL SYLLABLE I
		code === 0xC790 || // Lo       HANGUL SYLLABLE JA
		code === 0xC7AC || // Lo       HANGUL SYLLABLE JAE
		code === 0xC7C8 || // Lo       HANGUL SYLLABLE JYA
		code === 0xC7E4 || // Lo       HANGUL SYLLABLE JYAE
		code === 0xC800 || // Lo       HANGUL SYLLABLE JEO
		code === 0xC81C || // Lo       HANGUL SYLLABLE JE
		code === 0xC838 || // Lo       HANGUL SYLLABLE JYEO
		code === 0xC854 || // Lo       HANGUL SYLLABLE JYE
		code === 0xC870 || // Lo       HANGUL SYLLABLE JO
		code === 0xC88C || // Lo       HANGUL SYLLABLE JWA
		code === 0xC8A8 || // Lo       HANGUL SYLLABLE JWAE
		code === 0xC8C4 || // Lo       HANGUL SYLLABLE JOE
		code === 0xC8E0 || // Lo       HANGUL SYLLABLE JYO
		code === 0xC8FC || // Lo       HANGUL SYLLABLE JU
		code === 0xC918 || // Lo       HANGUL SYLLABLE JWEO
		code === 0xC934 || // Lo       HANGUL SYLLABLE JWE
		code === 0xC950 || // Lo       HANGUL SYLLABLE JWI
		code === 0xC96C || // Lo       HANGUL SYLLABLE JYU
		code === 0xC988 || // Lo       HANGUL SYLLABLE JEU
		code === 0xC9A4 || // Lo       HANGUL SYLLABLE JYI
		code === 0xC9C0 || // Lo       HANGUL SYLLABLE JI
		code === 0xC9DC || // Lo       HANGUL SYLLABLE JJA
		code === 0xC9F8 || // Lo       HANGUL SYLLABLE JJAE
		code === 0xCA14 || // Lo       HANGUL SYLLABLE JJYA
		code === 0xCA30 || // Lo       HANGUL SYLLABLE JJYAE
		code === 0xCA4C || // Lo       HANGUL SYLLABLE JJEO
		code === 0xCA68 || // Lo       HANGUL SYLLABLE JJE
		code === 0xCA84 || // Lo       HANGUL SYLLABLE JJYEO
		code === 0xCAA0 || // Lo       HANGUL SYLLABLE JJYE
		code === 0xCABC || // Lo       HANGUL SYLLABLE JJO
		code === 0xCAD8 || // Lo       HANGUL SYLLABLE JJWA
		code === 0xCAF4 || // Lo       HANGUL SYLLABLE JJWAE
		code === 0xCB10 || // Lo       HANGUL SYLLABLE JJOE
		code === 0xCB2C || // Lo       HANGUL SYLLABLE JJYO
		code === 0xCB48 || // Lo       HANGUL SYLLABLE JJU
		code === 0xCB64 || // Lo       HANGUL SYLLABLE JJWEO
		code === 0xCB80 || // Lo       HANGUL SYLLABLE JJWE
		code === 0xCB9C || // Lo       HANGUL SYLLABLE JJWI
		code === 0xCBB8 || // Lo       HANGUL SYLLABLE JJYU
		code === 0xCBD4 || // Lo       HANGUL SYLLABLE JJEU
		code === 0xCBF0 || // Lo       HANGUL SYLLABLE JJYI
		code === 0xCC0C || // Lo       HANGUL SYLLABLE JJI
		code === 0xCC28 || // Lo       HANGUL SYLLABLE CA
		code === 0xCC44 || // Lo       HANGUL SYLLABLE CAE
		code === 0xCC60 || // Lo       HANGUL SYLLABLE CYA
		code === 0xCC7C || // Lo       HANGUL SYLLABLE CYAE
		code === 0xCC98 || // Lo       HANGUL SYLLABLE CEO
		code === 0xCCB4 || // Lo       HANGUL SYLLABLE CE
		code === 0xCCD0 || // Lo       HANGUL SYLLABLE CYEO
		code === 0xCCEC || // Lo       HANGUL SYLLABLE CYE
		code === 0xCD08 || // Lo       HANGUL SYLLABLE CO
		code === 0xCD24 || // Lo       HANGUL SYLLABLE CWA
		code === 0xCD40 || // Lo       HANGUL SYLLABLE CWAE
		code === 0xCD5C || // Lo       HANGUL SYLLABLE COE
		code === 0xCD78 || // Lo       HANGUL SYLLABLE CYO
		code === 0xCD94 || // Lo       HANGUL SYLLABLE CU
		code === 0xCDB0 || // Lo       HANGUL SYLLABLE CWEO
		code === 0xCDCC || // Lo       HANGUL SYLLABLE CWE
		code === 0xCDE8 || // Lo       HANGUL SYLLABLE CWI
		code === 0xCE04 || // Lo       HANGUL SYLLABLE CYU
		code === 0xCE20 || // Lo       HANGUL SYLLABLE CEU
		code === 0xCE3C || // Lo       HANGUL SYLLABLE CYI
		code === 0xCE58 || // Lo       HANGUL SYLLABLE CI
		code === 0xCE74 || // Lo       HANGUL SYLLABLE KA
		code === 0xCE90 || // Lo       HANGUL SYLLABLE KAE
		code === 0xCEAC || // Lo       HANGUL SYLLABLE KYA
		code === 0xCEC8 || // Lo       HANGUL SYLLABLE KYAE
		code === 0xCEE4 || // Lo       HANGUL SYLLABLE KEO
		code === 0xCF00 || // Lo       HANGUL SYLLABLE KE
		code === 0xCF1C || // Lo       HANGUL SYLLABLE KYEO
		code === 0xCF38 || // Lo       HANGUL SYLLABLE KYE
		code === 0xCF54 || // Lo       HANGUL SYLLABLE KO
		code === 0xCF70 || // Lo       HANGUL SYLLABLE KWA
		code === 0xCF8C || // Lo       HANGUL SYLLABLE KWAE
		code === 0xCFA8 || // Lo       HANGUL SYLLABLE KOE
		code === 0xCFC4 || // Lo       HANGUL SYLLABLE KYO
		code === 0xCFE0 || // Lo       HANGUL SYLLABLE KU
		code === 0xCFFC || // Lo       HANGUL SYLLABLE KWEO
		code === 0xD018 || // Lo       HANGUL SYLLABLE KWE
		code === 0xD034 || // Lo       HANGUL SYLLABLE KWI
		code === 0xD050 || // Lo       HANGUL SYLLABLE KYU
		code === 0xD06C || // Lo       HANGUL SYLLABLE KEU
		code === 0xD088 || // Lo       HANGUL SYLLABLE KYI
		code === 0xD0A4 || // Lo       HANGUL SYLLABLE KI
		code === 0xD0C0 || // Lo       HANGUL SYLLABLE TA
		code === 0xD0DC || // Lo       HANGUL SYLLABLE TAE
		code === 0xD0F8 || // Lo       HANGUL SYLLABLE TYA
		code === 0xD114 || // Lo       HANGUL SYLLABLE TYAE
		code === 0xD130 || // Lo       HANGUL SYLLABLE TEO
		code === 0xD14C || // Lo       HANGUL SYLLABLE TE
		code === 0xD168 || // Lo       HANGUL SYLLABLE TYEO
		code === 0xD184 || // Lo       HANGUL SYLLABLE TYE
		code === 0xD1A0 || // Lo       HANGUL SYLLABLE TO
		code === 0xD1BC || // Lo       HANGUL SYLLABLE TWA
		code === 0xD1D8 || // Lo       HANGUL SYLLABLE TWAE
		code === 0xD1F4 || // Lo       HANGUL SYLLABLE TOE
		code === 0xD210 || // Lo       HANGUL SYLLABLE TYO
		code === 0xD22C || // Lo       HANGUL SYLLABLE TU
		code === 0xD248 || // Lo       HANGUL SYLLABLE TWEO
		code === 0xD264 || // Lo       HANGUL SYLLABLE TWE
		code === 0xD280 || // Lo       HANGUL SYLLABLE TWI
		code === 0xD29C || // Lo       HANGUL SYLLABLE TYU
		code === 0xD2B8 || // Lo       HANGUL SYLLABLE TEU
		code === 0xD2D4 || // Lo       HANGUL SYLLABLE TYI
		code === 0xD2F0 || // Lo       HANGUL SYLLABLE TI
		code === 0xD30C || // Lo       HANGUL SYLLABLE PA
		code === 0xD328 || // Lo       HANGUL SYLLABLE PAE
		code === 0xD344 || // Lo       HANGUL SYLLABLE PYA
		code === 0xD360 || // Lo       HANGUL SYLLABLE PYAE
		code === 0xD37C || // Lo       HANGUL SYLLABLE PEO
		code === 0xD398 || // Lo       HANGUL SYLLABLE PE
		code === 0xD3B4 || // Lo       HANGUL SYLLABLE PYEO
		code === 0xD3D0 || // Lo       HANGUL SYLLABLE PYE
		code === 0xD3EC || // Lo       HANGUL SYLLABLE PO
		code === 0xD408 || // Lo       HANGUL SYLLABLE PWA
		code === 0xD424 || // Lo       HANGUL SYLLABLE PWAE
		code === 0xD440 || // Lo       HANGUL SYLLABLE POE
		code === 0xD45C || // Lo       HANGUL SYLLABLE PYO
		code === 0xD478 || // Lo       HANGUL SYLLABLE PU
		code === 0xD494 || // Lo       HANGUL SYLLABLE PWEO
		code === 0xD4B0 || // Lo       HANGUL SYLLABLE PWE
		code === 0xD4CC || // Lo       HANGUL SYLLABLE PWI
		code === 0xD4E8 || // Lo       HANGUL SYLLABLE PYU
		code === 0xD504 || // Lo       HANGUL SYLLABLE PEU
		code === 0xD520 || // Lo       HANGUL SYLLABLE PYI
		code === 0xD53C || // Lo       HANGUL SYLLABLE PI
		code === 0xD558 || // Lo       HANGUL SYLLABLE HA
		code === 0xD574 || // Lo       HANGUL SYLLABLE HAE
		code === 0xD590 || // Lo       HANGUL SYLLABLE HYA
		code === 0xD5AC || // Lo       HANGUL SYLLABLE HYAE
		code === 0xD5C8 || // Lo       HANGUL SYLLABLE HEO
		code === 0xD5E4 || // Lo       HANGUL SYLLABLE HE
		code === 0xD600 || // Lo       HANGUL SYLLABLE HYEO
		code === 0xD61C || // Lo       HANGUL SYLLABLE HYE
		code === 0xD638 || // Lo       HANGUL SYLLABLE HO
		code === 0xD654 || // Lo       HANGUL SYLLABLE HWA
		code === 0xD670 || // Lo       HANGUL SYLLABLE HWAE
		code === 0xD68C || // Lo       HANGUL SYLLABLE HOE
		code === 0xD6A8 || // Lo       HANGUL SYLLABLE HYO
		code === 0xD6C4 || // Lo       HANGUL SYLLABLE HU
		code === 0xD6E0 || // Lo       HANGUL SYLLABLE HWEO
		code === 0xD6FC || // Lo       HANGUL SYLLABLE HWE
		code === 0xD718 || // Lo       HANGUL SYLLABLE HWI
		code === 0xD734 || // Lo       HANGUL SYLLABLE HYU
		code === 0xD750 || // Lo       HANGUL SYLLABLE HEU
		code === 0xD76C || // Lo       HANGUL SYLLABLE HYI
		code === 0xD788 // Lo       HANGUL SYLLABLE HI
	) {
		return constants.LV;
	}
	if (
		( 0xAC01 <= code && code <= 0xAC1B ) || // Lo  [27] HANGUL SYLLABLE GAG..HANGUL SYLLABLE GAH
		( 0xAC1D <= code && code <= 0xAC37 ) || // Lo  [27] HANGUL SYLLABLE GAEG..HANGUL SYLLABLE GAEH
		( 0xAC39 <= code && code <= 0xAC53 ) || // Lo  [27] HANGUL SYLLABLE GYAG..HANGUL SYLLABLE GYAH
		( 0xAC55 <= code && code <= 0xAC6F ) || // Lo  [27] HANGUL SYLLABLE GYAEG..HANGUL SYLLABLE GYAEH
		( 0xAC71 <= code && code <= 0xAC8B ) || // Lo  [27] HANGUL SYLLABLE GEOG..HANGUL SYLLABLE GEOH
		( 0xAC8D <= code && code <= 0xACA7 ) || // Lo  [27] HANGUL SYLLABLE GEG..HANGUL SYLLABLE GEH
		( 0xACA9 <= code && code <= 0xACC3 ) || // Lo  [27] HANGUL SYLLABLE GYEOG..HANGUL SYLLABLE GYEOH
		( 0xACC5 <= code && code <= 0xACDF ) || // Lo  [27] HANGUL SYLLABLE GYEG..HANGUL SYLLABLE GYEH
		( 0xACE1 <= code && code <= 0xACFB ) || // Lo  [27] HANGUL SYLLABLE GOG..HANGUL SYLLABLE GOH
		( 0xACFD <= code && code <= 0xAD17 ) || // Lo  [27] HANGUL SYLLABLE GWAG..HANGUL SYLLABLE GWAH
		( 0xAD19 <= code && code <= 0xAD33 ) || // Lo  [27] HANGUL SYLLABLE GWAEG..HANGUL SYLLABLE GWAEH
		( 0xAD35 <= code && code <= 0xAD4F ) || // Lo  [27] HANGUL SYLLABLE GOEG..HANGUL SYLLABLE GOEH
		( 0xAD51 <= code && code <= 0xAD6B ) || // Lo  [27] HANGUL SYLLABLE GYOG..HANGUL SYLLABLE GYOH
		( 0xAD6D <= code && code <= 0xAD87 ) || // Lo  [27] HANGUL SYLLABLE GUG..HANGUL SYLLABLE GUH
		( 0xAD89 <= code && code <= 0xADA3 ) || // Lo  [27] HANGUL SYLLABLE GWEOG..HANGUL SYLLABLE GWEOH
		( 0xADA5 <= code && code <= 0xADBF ) || // Lo  [27] HANGUL SYLLABLE GWEG..HANGUL SYLLABLE GWEH
		( 0xADC1 <= code && code <= 0xADDB ) || // Lo  [27] HANGUL SYLLABLE GWIG..HANGUL SYLLABLE GWIH
		( 0xADDD <= code && code <= 0xADF7 ) || // Lo  [27] HANGUL SYLLABLE GYUG..HANGUL SYLLABLE GYUH
		( 0xADF9 <= code && code <= 0xAE13 ) || // Lo  [27] HANGUL SYLLABLE GEUG..HANGUL SYLLABLE GEUH
		( 0xAE15 <= code && code <= 0xAE2F ) || // Lo  [27] HANGUL SYLLABLE GYIG..HANGUL SYLLABLE GYIH
		( 0xAE31 <= code && code <= 0xAE4B ) || // Lo  [27] HANGUL SYLLABLE GIG..HANGUL SYLLABLE GIH
		( 0xAE4D <= code && code <= 0xAE67 ) || // Lo  [27] HANGUL SYLLABLE GGAG..HANGUL SYLLABLE GGAH
		( 0xAE69 <= code && code <= 0xAE83 ) || // Lo  [27] HANGUL SYLLABLE GGAEG..HANGUL SYLLABLE GGAEH
		( 0xAE85 <= code && code <= 0xAE9F ) || // Lo  [27] HANGUL SYLLABLE GGYAG..HANGUL SYLLABLE GGYAH
		( 0xAEA1 <= code && code <= 0xAEBB ) || // Lo  [27] HANGUL SYLLABLE GGYAEG..HANGUL SYLLABLE GGYAEH
		( 0xAEBD <= code && code <= 0xAED7 ) || // Lo  [27] HANGUL SYLLABLE GGEOG..HANGUL SYLLABLE GGEOH
		( 0xAED9 <= code && code <= 0xAEF3 ) || // Lo  [27] HANGUL SYLLABLE GGEG..HANGUL SYLLABLE GGEH
		( 0xAEF5 <= code && code <= 0xAF0F ) || // Lo  [27] HANGUL SYLLABLE GGYEOG..HANGUL SYLLABLE GGYEOH
		( 0xAF11 <= code && code <= 0xAF2B ) || // Lo  [27] HANGUL SYLLABLE GGYEG..HANGUL SYLLABLE GGYEH
		( 0xAF2D <= code && code <= 0xAF47 ) || // Lo  [27] HANGUL SYLLABLE GGOG..HANGUL SYLLABLE GGOH
		( 0xAF49 <= code && code <= 0xAF63 ) || // Lo  [27] HANGUL SYLLABLE GGWAG..HANGUL SYLLABLE GGWAH
		( 0xAF65 <= code && code <= 0xAF7F ) || // Lo  [27] HANGUL SYLLABLE GGWAEG..HANGUL SYLLABLE GGWAEH
		( 0xAF81 <= code && code <= 0xAF9B ) || // Lo  [27] HANGUL SYLLABLE GGOEG..HANGUL SYLLABLE GGOEH
		( 0xAF9D <= code && code <= 0xAFB7 ) || // Lo  [27] HANGUL SYLLABLE GGYOG..HANGUL SYLLABLE GGYOH
		( 0xAFB9 <= code && code <= 0xAFD3 ) || // Lo  [27] HANGUL SYLLABLE GGUG..HANGUL SYLLABLE GGUH
		( 0xAFD5 <= code && code <= 0xAFEF ) || // Lo  [27] HANGUL SYLLABLE GGWEOG..HANGUL SYLLABLE GGWEOH
		( 0xAFF1 <= code && code <= 0xB00B ) || // Lo  [27] HANGUL SYLLABLE GGWEG..HANGUL SYLLABLE GGWEH
		( 0xB00D <= code && code <= 0xB027 ) || // Lo  [27] HANGUL SYLLABLE GGWIG..HANGUL SYLLABLE GGWIH
		( 0xB029 <= code && code <= 0xB043 ) || // Lo  [27] HANGUL SYLLABLE GGYUG..HANGUL SYLLABLE GGYUH
		( 0xB045 <= code && code <= 0xB05F ) || // Lo  [27] HANGUL SYLLABLE GGEUG..HANGUL SYLLABLE GGEUH
		( 0xB061 <= code && code <= 0xB07B ) || // Lo  [27] HANGUL SYLLABLE GGYIG..HANGUL SYLLABLE GGYIH
		( 0xB07D <= code && code <= 0xB097 ) || // Lo  [27] HANGUL SYLLABLE GGIG..HANGUL SYLLABLE GGIH
		( 0xB099 <= code && code <= 0xB0B3 ) || // Lo  [27] HANGUL SYLLABLE NAG..HANGUL SYLLABLE NAH
		( 0xB0B5 <= code && code <= 0xB0CF ) || // Lo  [27] HANGUL SYLLABLE NAEG..HANGUL SYLLABLE NAEH
		( 0xB0D1 <= code && code <= 0xB0EB ) || // Lo  [27] HANGUL SYLLABLE NYAG..HANGUL SYLLABLE NYAH
		( 0xB0ED <= code && code <= 0xB107 ) || // Lo  [27] HANGUL SYLLABLE NYAEG..HANGUL SYLLABLE NYAEH
		( 0xB109 <= code && code <= 0xB123 ) || // Lo  [27] HANGUL SYLLABLE NEOG..HANGUL SYLLABLE NEOH
		( 0xB125 <= code && code <= 0xB13F ) || // Lo  [27] HANGUL SYLLABLE NEG..HANGUL SYLLABLE NEH
		( 0xB141 <= code && code <= 0xB15B ) || // Lo  [27] HANGUL SYLLABLE NYEOG..HANGUL SYLLABLE NYEOH
		( 0xB15D <= code && code <= 0xB177 ) || // Lo  [27] HANGUL SYLLABLE NYEG..HANGUL SYLLABLE NYEH
		( 0xB179 <= code && code <= 0xB193 ) || // Lo  [27] HANGUL SYLLABLE NOG..HANGUL SYLLABLE NOH
		( 0xB195 <= code && code <= 0xB1AF ) || // Lo  [27] HANGUL SYLLABLE NWAG..HANGUL SYLLABLE NWAH
		( 0xB1B1 <= code && code <= 0xB1CB ) || // Lo  [27] HANGUL SYLLABLE NWAEG..HANGUL SYLLABLE NWAEH
		( 0xB1CD <= code && code <= 0xB1E7 ) || // Lo  [27] HANGUL SYLLABLE NOEG..HANGUL SYLLABLE NOEH
		( 0xB1E9 <= code && code <= 0xB203 ) || // Lo  [27] HANGUL SYLLABLE NYOG..HANGUL SYLLABLE NYOH
		( 0xB205 <= code && code <= 0xB21F ) || // Lo  [27] HANGUL SYLLABLE NUG..HANGUL SYLLABLE NUH
		( 0xB221 <= code && code <= 0xB23B ) || // Lo  [27] HANGUL SYLLABLE NWEOG..HANGUL SYLLABLE NWEOH
		( 0xB23D <= code && code <= 0xB257 ) || // Lo  [27] HANGUL SYLLABLE NWEG..HANGUL SYLLABLE NWEH
		( 0xB259 <= code && code <= 0xB273 ) || // Lo  [27] HANGUL SYLLABLE NWIG..HANGUL SYLLABLE NWIH
		( 0xB275 <= code && code <= 0xB28F ) || // Lo  [27] HANGUL SYLLABLE NYUG..HANGUL SYLLABLE NYUH
		( 0xB291 <= code && code <= 0xB2AB ) || // Lo  [27] HANGUL SYLLABLE NEUG..HANGUL SYLLABLE NEUH
		( 0xB2AD <= code && code <= 0xB2C7 ) || // Lo  [27] HANGUL SYLLABLE NYIG..HANGUL SYLLABLE NYIH
		( 0xB2C9 <= code && code <= 0xB2E3 ) || // Lo  [27] HANGUL SYLLABLE NIG..HANGUL SYLLABLE NIH
		( 0xB2E5 <= code && code <= 0xB2FF ) || // Lo  [27] HANGUL SYLLABLE DAG..HANGUL SYLLABLE DAH
		( 0xB301 <= code && code <= 0xB31B ) || // Lo  [27] HANGUL SYLLABLE DAEG..HANGUL SYLLABLE DAEH
		( 0xB31D <= code && code <= 0xB337 ) || // Lo  [27] HANGUL SYLLABLE DYAG..HANGUL SYLLABLE DYAH
		( 0xB339 <= code && code <= 0xB353 ) || // Lo  [27] HANGUL SYLLABLE DYAEG..HANGUL SYLLABLE DYAEH
		( 0xB355 <= code && code <= 0xB36F ) || // Lo  [27] HANGUL SYLLABLE DEOG..HANGUL SYLLABLE DEOH
		( 0xB371 <= code && code <= 0xB38B ) || // Lo  [27] HANGUL SYLLABLE DEG..HANGUL SYLLABLE DEH
		( 0xB38D <= code && code <= 0xB3A7 ) || // Lo  [27] HANGUL SYLLABLE DYEOG..HANGUL SYLLABLE DYEOH
		( 0xB3A9 <= code && code <= 0xB3C3 ) || // Lo  [27] HANGUL SYLLABLE DYEG..HANGUL SYLLABLE DYEH
		( 0xB3C5 <= code && code <= 0xB3DF ) || // Lo  [27] HANGUL SYLLABLE DOG..HANGUL SYLLABLE DOH
		( 0xB3E1 <= code && code <= 0xB3FB ) || // Lo  [27] HANGUL SYLLABLE DWAG..HANGUL SYLLABLE DWAH
		( 0xB3FD <= code && code <= 0xB417 ) || // Lo  [27] HANGUL SYLLABLE DWAEG..HANGUL SYLLABLE DWAEH
		( 0xB419 <= code && code <= 0xB433 ) || // Lo  [27] HANGUL SYLLABLE DOEG..HANGUL SYLLABLE DOEH
		( 0xB435 <= code && code <= 0xB44F ) || // Lo  [27] HANGUL SYLLABLE DYOG..HANGUL SYLLABLE DYOH
		( 0xB451 <= code && code <= 0xB46B ) || // Lo  [27] HANGUL SYLLABLE DUG..HANGUL SYLLABLE DUH
		( 0xB46D <= code && code <= 0xB487 ) || // Lo  [27] HANGUL SYLLABLE DWEOG..HANGUL SYLLABLE DWEOH
		( 0xB489 <= code && code <= 0xB4A3 ) || // Lo  [27] HANGUL SYLLABLE DWEG..HANGUL SYLLABLE DWEH
		( 0xB4A5 <= code && code <= 0xB4BF ) || // Lo  [27] HANGUL SYLLABLE DWIG..HANGUL SYLLABLE DWIH
		( 0xB4C1 <= code && code <= 0xB4DB ) || // Lo  [27] HANGUL SYLLABLE DYUG..HANGUL SYLLABLE DYUH
		( 0xB4DD <= code && code <= 0xB4F7 ) || // Lo  [27] HANGUL SYLLABLE DEUG..HANGUL SYLLABLE DEUH
		( 0xB4F9 <= code && code <= 0xB513 ) || // Lo  [27] HANGUL SYLLABLE DYIG..HANGUL SYLLABLE DYIH
		( 0xB515 <= code && code <= 0xB52F ) || // Lo  [27] HANGUL SYLLABLE DIG..HANGUL SYLLABLE DIH
		( 0xB531 <= code && code <= 0xB54B ) || // Lo  [27] HANGUL SYLLABLE DDAG..HANGUL SYLLABLE DDAH
		( 0xB54D <= code && code <= 0xB567 ) || // Lo  [27] HANGUL SYLLABLE DDAEG..HANGUL SYLLABLE DDAEH
		( 0xB569 <= code && code <= 0xB583 ) || // Lo  [27] HANGUL SYLLABLE DDYAG..HANGUL SYLLABLE DDYAH
		( 0xB585 <= code && code <= 0xB59F ) || // Lo  [27] HANGUL SYLLABLE DDYAEG..HANGUL SYLLABLE DDYAEH
		( 0xB5A1 <= code && code <= 0xB5BB ) || // Lo  [27] HANGUL SYLLABLE DDEOG..HANGUL SYLLABLE DDEOH
		( 0xB5BD <= code && code <= 0xB5D7 ) || // Lo  [27] HANGUL SYLLABLE DDEG..HANGUL SYLLABLE DDEH
		( 0xB5D9 <= code && code <= 0xB5F3 ) || // Lo  [27] HANGUL SYLLABLE DDYEOG..HANGUL SYLLABLE DDYEOH
		( 0xB5F5 <= code && code <= 0xB60F ) || // Lo  [27] HANGUL SYLLABLE DDYEG..HANGUL SYLLABLE DDYEH
		( 0xB611 <= code && code <= 0xB62B ) || // Lo  [27] HANGUL SYLLABLE DDOG..HANGUL SYLLABLE DDOH
		( 0xB62D <= code && code <= 0xB647 ) || // Lo  [27] HANGUL SYLLABLE DDWAG..HANGUL SYLLABLE DDWAH
		( 0xB649 <= code && code <= 0xB663 ) || // Lo  [27] HANGUL SYLLABLE DDWAEG..HANGUL SYLLABLE DDWAEH
		( 0xB665 <= code && code <= 0xB67F ) || // Lo  [27] HANGUL SYLLABLE DDOEG..HANGUL SYLLABLE DDOEH
		( 0xB681 <= code && code <= 0xB69B ) || // Lo  [27] HANGUL SYLLABLE DDYOG..HANGUL SYLLABLE DDYOH
		( 0xB69D <= code && code <= 0xB6B7 ) || // Lo  [27] HANGUL SYLLABLE DDUG..HANGUL SYLLABLE DDUH
		( 0xB6B9 <= code && code <= 0xB6D3 ) || // Lo  [27] HANGUL SYLLABLE DDWEOG..HANGUL SYLLABLE DDWEOH
		( 0xB6D5 <= code && code <= 0xB6EF ) || // Lo  [27] HANGUL SYLLABLE DDWEG..HANGUL SYLLABLE DDWEH
		( 0xB6F1 <= code && code <= 0xB70B ) || // Lo  [27] HANGUL SYLLABLE DDWIG..HANGUL SYLLABLE DDWIH
		( 0xB70D <= code && code <= 0xB727 ) || // Lo  [27] HANGUL SYLLABLE DDYUG..HANGUL SYLLABLE DDYUH
		( 0xB729 <= code && code <= 0xB743 ) || // Lo  [27] HANGUL SYLLABLE DDEUG..HANGUL SYLLABLE DDEUH
		( 0xB745 <= code && code <= 0xB75F ) || // Lo  [27] HANGUL SYLLABLE DDYIG..HANGUL SYLLABLE DDYIH
		( 0xB761 <= code && code <= 0xB77B ) || // Lo  [27] HANGUL SYLLABLE DDIG..HANGUL SYLLABLE DDIH
		( 0xB77D <= code && code <= 0xB797 ) || // Lo  [27] HANGUL SYLLABLE RAG..HANGUL SYLLABLE RAH
		( 0xB799 <= code && code <= 0xB7B3 ) || // Lo  [27] HANGUL SYLLABLE RAEG..HANGUL SYLLABLE RAEH
		( 0xB7B5 <= code && code <= 0xB7CF ) || // Lo  [27] HANGUL SYLLABLE RYAG..HANGUL SYLLABLE RYAH
		( 0xB7D1 <= code && code <= 0xB7EB ) || // Lo  [27] HANGUL SYLLABLE RYAEG..HANGUL SYLLABLE RYAEH
		( 0xB7ED <= code && code <= 0xB807 ) || // Lo  [27] HANGUL SYLLABLE REOG..HANGUL SYLLABLE REOH
		( 0xB809 <= code && code <= 0xB823 ) || // Lo  [27] HANGUL SYLLABLE REG..HANGUL SYLLABLE REH
		( 0xB825 <= code && code <= 0xB83F ) || // Lo  [27] HANGUL SYLLABLE RYEOG..HANGUL SYLLABLE RYEOH
		( 0xB841 <= code && code <= 0xB85B ) || // Lo  [27] HANGUL SYLLABLE RYEG..HANGUL SYLLABLE RYEH
		( 0xB85D <= code && code <= 0xB877 ) || // Lo  [27] HANGUL SYLLABLE ROG..HANGUL SYLLABLE ROH
		( 0xB879 <= code && code <= 0xB893 ) || // Lo  [27] HANGUL SYLLABLE RWAG..HANGUL SYLLABLE RWAH
		( 0xB895 <= code && code <= 0xB8AF ) || // Lo  [27] HANGUL SYLLABLE RWAEG..HANGUL SYLLABLE RWAEH
		( 0xB8B1 <= code && code <= 0xB8CB ) || // Lo  [27] HANGUL SYLLABLE ROEG..HANGUL SYLLABLE ROEH
		( 0xB8CD <= code && code <= 0xB8E7 ) || // Lo  [27] HANGUL SYLLABLE RYOG..HANGUL SYLLABLE RYOH
		( 0xB8E9 <= code && code <= 0xB903 ) || // Lo  [27] HANGUL SYLLABLE RUG..HANGUL SYLLABLE RUH
		( 0xB905 <= code && code <= 0xB91F ) || // Lo  [27] HANGUL SYLLABLE RWEOG..HANGUL SYLLABLE RWEOH
		( 0xB921 <= code && code <= 0xB93B ) || // Lo  [27] HANGUL SYLLABLE RWEG..HANGUL SYLLABLE RWEH
		( 0xB93D <= code && code <= 0xB957 ) || // Lo  [27] HANGUL SYLLABLE RWIG..HANGUL SYLLABLE RWIH
		( 0xB959 <= code && code <= 0xB973 ) || // Lo  [27] HANGUL SYLLABLE RYUG..HANGUL SYLLABLE RYUH
		( 0xB975 <= code && code <= 0xB98F ) || // Lo  [27] HANGUL SYLLABLE REUG..HANGUL SYLLABLE REUH
		( 0xB991 <= code && code <= 0xB9AB ) || // Lo  [27] HANGUL SYLLABLE RYIG..HANGUL SYLLABLE RYIH
		( 0xB9AD <= code && code <= 0xB9C7 ) || // Lo  [27] HANGUL SYLLABLE RIG..HANGUL SYLLABLE RIH
		( 0xB9C9 <= code && code <= 0xB9E3 ) || // Lo  [27] HANGUL SYLLABLE MAG..HANGUL SYLLABLE MAH
		( 0xB9E5 <= code && code <= 0xB9FF ) || // Lo  [27] HANGUL SYLLABLE MAEG..HANGUL SYLLABLE MAEH
		( 0xBA01 <= code && code <= 0xBA1B ) || // Lo  [27] HANGUL SYLLABLE MYAG..HANGUL SYLLABLE MYAH
		( 0xBA1D <= code && code <= 0xBA37 ) || // Lo  [27] HANGUL SYLLABLE MYAEG..HANGUL SYLLABLE MYAEH
		( 0xBA39 <= code && code <= 0xBA53 ) || // Lo  [27] HANGUL SYLLABLE MEOG..HANGUL SYLLABLE MEOH
		( 0xBA55 <= code && code <= 0xBA6F ) || // Lo  [27] HANGUL SYLLABLE MEG..HANGUL SYLLABLE MEH
		( 0xBA71 <= code && code <= 0xBA8B ) || // Lo  [27] HANGUL SYLLABLE MYEOG..HANGUL SYLLABLE MYEOH
		( 0xBA8D <= code && code <= 0xBAA7 ) || // Lo  [27] HANGUL SYLLABLE MYEG..HANGUL SYLLABLE MYEH
		( 0xBAA9 <= code && code <= 0xBAC3 ) || // Lo  [27] HANGUL SYLLABLE MOG..HANGUL SYLLABLE MOH
		( 0xBAC5 <= code && code <= 0xBADF ) || // Lo  [27] HANGUL SYLLABLE MWAG..HANGUL SYLLABLE MWAH
		( 0xBAE1 <= code && code <= 0xBAFB ) || // Lo  [27] HANGUL SYLLABLE MWAEG..HANGUL SYLLABLE MWAEH
		( 0xBAFD <= code && code <= 0xBB17 ) || // Lo  [27] HANGUL SYLLABLE MOEG..HANGUL SYLLABLE MOEH
		( 0xBB19 <= code && code <= 0xBB33 ) || // Lo  [27] HANGUL SYLLABLE MYOG..HANGUL SYLLABLE MYOH
		( 0xBB35 <= code && code <= 0xBB4F ) || // Lo  [27] HANGUL SYLLABLE MUG..HANGUL SYLLABLE MUH
		( 0xBB51 <= code && code <= 0xBB6B ) || // Lo  [27] HANGUL SYLLABLE MWEOG..HANGUL SYLLABLE MWEOH
		( 0xBB6D <= code && code <= 0xBB87 ) || // Lo  [27] HANGUL SYLLABLE MWEG..HANGUL SYLLABLE MWEH
		( 0xBB89 <= code && code <= 0xBBA3 ) || // Lo  [27] HANGUL SYLLABLE MWIG..HANGUL SYLLABLE MWIH
		( 0xBBA5 <= code && code <= 0xBBBF ) || // Lo  [27] HANGUL SYLLABLE MYUG..HANGUL SYLLABLE MYUH
		( 0xBBC1 <= code && code <= 0xBBDB ) || // Lo  [27] HANGUL SYLLABLE MEUG..HANGUL SYLLABLE MEUH
		( 0xBBDD <= code && code <= 0xBBF7 ) || // Lo  [27] HANGUL SYLLABLE MYIG..HANGUL SYLLABLE MYIH
		( 0xBBF9 <= code && code <= 0xBC13 ) || // Lo  [27] HANGUL SYLLABLE MIG..HANGUL SYLLABLE MIH
		( 0xBC15 <= code && code <= 0xBC2F ) || // Lo  [27] HANGUL SYLLABLE BAG..HANGUL SYLLABLE BAH
		( 0xBC31 <= code && code <= 0xBC4B ) || // Lo  [27] HANGUL SYLLABLE BAEG..HANGUL SYLLABLE BAEH
		( 0xBC4D <= code && code <= 0xBC67 ) || // Lo  [27] HANGUL SYLLABLE BYAG..HANGUL SYLLABLE BYAH
		( 0xBC69 <= code && code <= 0xBC83 ) || // Lo  [27] HANGUL SYLLABLE BYAEG..HANGUL SYLLABLE BYAEH
		( 0xBC85 <= code && code <= 0xBC9F ) || // Lo  [27] HANGUL SYLLABLE BEOG..HANGUL SYLLABLE BEOH
		( 0xBCA1 <= code && code <= 0xBCBB ) || // Lo  [27] HANGUL SYLLABLE BEG..HANGUL SYLLABLE BEH
		( 0xBCBD <= code && code <= 0xBCD7 ) || // Lo  [27] HANGUL SYLLABLE BYEOG..HANGUL SYLLABLE BYEOH
		( 0xBCD9 <= code && code <= 0xBCF3 ) || // Lo  [27] HANGUL SYLLABLE BYEG..HANGUL SYLLABLE BYEH
		( 0xBCF5 <= code && code <= 0xBD0F ) || // Lo  [27] HANGUL SYLLABLE BOG..HANGUL SYLLABLE BOH
		( 0xBD11 <= code && code <= 0xBD2B ) || // Lo  [27] HANGUL SYLLABLE BWAG..HANGUL SYLLABLE BWAH
		( 0xBD2D <= code && code <= 0xBD47 ) || // Lo  [27] HANGUL SYLLABLE BWAEG..HANGUL SYLLABLE BWAEH
		( 0xBD49 <= code && code <= 0xBD63 ) || // Lo  [27] HANGUL SYLLABLE BOEG..HANGUL SYLLABLE BOEH
		( 0xBD65 <= code && code <= 0xBD7F ) || // Lo  [27] HANGUL SYLLABLE BYOG..HANGUL SYLLABLE BYOH
		( 0xBD81 <= code && code <= 0xBD9B ) || // Lo  [27] HANGUL SYLLABLE BUG..HANGUL SYLLABLE BUH
		( 0xBD9D <= code && code <= 0xBDB7 ) || // Lo  [27] HANGUL SYLLABLE BWEOG..HANGUL SYLLABLE BWEOH
		( 0xBDB9 <= code && code <= 0xBDD3 ) || // Lo  [27] HANGUL SYLLABLE BWEG..HANGUL SYLLABLE BWEH
		( 0xBDD5 <= code && code <= 0xBDEF ) || // Lo  [27] HANGUL SYLLABLE BWIG..HANGUL SYLLABLE BWIH
		( 0xBDF1 <= code && code <= 0xBE0B ) || // Lo  [27] HANGUL SYLLABLE BYUG..HANGUL SYLLABLE BYUH
		( 0xBE0D <= code && code <= 0xBE27 ) || // Lo  [27] HANGUL SYLLABLE BEUG..HANGUL SYLLABLE BEUH
		( 0xBE29 <= code && code <= 0xBE43 ) || // Lo  [27] HANGUL SYLLABLE BYIG..HANGUL SYLLABLE BYIH
		( 0xBE45 <= code && code <= 0xBE5F ) || // Lo  [27] HANGUL SYLLABLE BIG..HANGUL SYLLABLE BIH
		( 0xBE61 <= code && code <= 0xBE7B ) || // Lo  [27] HANGUL SYLLABLE BBAG..HANGUL SYLLABLE BBAH
		( 0xBE7D <= code && code <= 0xBE97 ) || // Lo  [27] HANGUL SYLLABLE BBAEG..HANGUL SYLLABLE BBAEH
		( 0xBE99 <= code && code <= 0xBEB3 ) || // Lo  [27] HANGUL SYLLABLE BBYAG..HANGUL SYLLABLE BBYAH
		( 0xBEB5 <= code && code <= 0xBECF ) || // Lo  [27] HANGUL SYLLABLE BBYAEG..HANGUL SYLLABLE BBYAEH
		( 0xBED1 <= code && code <= 0xBEEB ) || // Lo  [27] HANGUL SYLLABLE BBEOG..HANGUL SYLLABLE BBEOH
		( 0xBEED <= code && code <= 0xBF07 ) || // Lo  [27] HANGUL SYLLABLE BBEG..HANGUL SYLLABLE BBEH
		( 0xBF09 <= code && code <= 0xBF23 ) || // Lo  [27] HANGUL SYLLABLE BBYEOG..HANGUL SYLLABLE BBYEOH
		( 0xBF25 <= code && code <= 0xBF3F ) || // Lo  [27] HANGUL SYLLABLE BBYEG..HANGUL SYLLABLE BBYEH
		( 0xBF41 <= code && code <= 0xBF5B ) || // Lo  [27] HANGUL SYLLABLE BBOG..HANGUL SYLLABLE BBOH
		( 0xBF5D <= code && code <= 0xBF77 ) || // Lo  [27] HANGUL SYLLABLE BBWAG..HANGUL SYLLABLE BBWAH
		( 0xBF79 <= code && code <= 0xBF93 ) || // Lo  [27] HANGUL SYLLABLE BBWAEG..HANGUL SYLLABLE BBWAEH
		( 0xBF95 <= code && code <= 0xBFAF ) || // Lo  [27] HANGUL SYLLABLE BBOEG..HANGUL SYLLABLE BBOEH
		( 0xBFB1 <= code && code <= 0xBFCB ) || // Lo  [27] HANGUL SYLLABLE BBYOG..HANGUL SYLLABLE BBYOH
		( 0xBFCD <= code && code <= 0xBFE7 ) || // Lo  [27] HANGUL SYLLABLE BBUG..HANGUL SYLLABLE BBUH
		( 0xBFE9 <= code && code <= 0xC003 ) || // Lo  [27] HANGUL SYLLABLE BBWEOG..HANGUL SYLLABLE BBWEOH
		( 0xC005 <= code && code <= 0xC01F ) || // Lo  [27] HANGUL SYLLABLE BBWEG..HANGUL SYLLABLE BBWEH
		( 0xC021 <= code && code <= 0xC03B ) || // Lo  [27] HANGUL SYLLABLE BBWIG..HANGUL SYLLABLE BBWIH
		( 0xC03D <= code && code <= 0xC057 ) || // Lo  [27] HANGUL SYLLABLE BBYUG..HANGUL SYLLABLE BBYUH
		( 0xC059 <= code && code <= 0xC073 ) || // Lo  [27] HANGUL SYLLABLE BBEUG..HANGUL SYLLABLE BBEUH
		( 0xC075 <= code && code <= 0xC08F ) || // Lo  [27] HANGUL SYLLABLE BBYIG..HANGUL SYLLABLE BBYIH
		( 0xC091 <= code && code <= 0xC0AB ) || // Lo  [27] HANGUL SYLLABLE BBIG..HANGUL SYLLABLE BBIH
		( 0xC0AD <= code && code <= 0xC0C7 ) || // Lo  [27] HANGUL SYLLABLE SAG..HANGUL SYLLABLE SAH
		( 0xC0C9 <= code && code <= 0xC0E3 ) || // Lo  [27] HANGUL SYLLABLE SAEG..HANGUL SYLLABLE SAEH
		( 0xC0E5 <= code && code <= 0xC0FF ) || // Lo  [27] HANGUL SYLLABLE SYAG..HANGUL SYLLABLE SYAH
		( 0xC101 <= code && code <= 0xC11B ) || // Lo  [27] HANGUL SYLLABLE SYAEG..HANGUL SYLLABLE SYAEH
		( 0xC11D <= code && code <= 0xC137 ) || // Lo  [27] HANGUL SYLLABLE SEOG..HANGUL SYLLABLE SEOH
		( 0xC139 <= code && code <= 0xC153 ) || // Lo  [27] HANGUL SYLLABLE SEG..HANGUL SYLLABLE SEH
		( 0xC155 <= code && code <= 0xC16F ) || // Lo  [27] HANGUL SYLLABLE SYEOG..HANGUL SYLLABLE SYEOH
		( 0xC171 <= code && code <= 0xC18B ) || // Lo  [27] HANGUL SYLLABLE SYEG..HANGUL SYLLABLE SYEH
		( 0xC18D <= code && code <= 0xC1A7 ) || // Lo  [27] HANGUL SYLLABLE SOG..HANGUL SYLLABLE SOH
		( 0xC1A9 <= code && code <= 0xC1C3 ) || // Lo  [27] HANGUL SYLLABLE SWAG..HANGUL SYLLABLE SWAH
		( 0xC1C5 <= code && code <= 0xC1DF ) || // Lo  [27] HANGUL SYLLABLE SWAEG..HANGUL SYLLABLE SWAEH
		( 0xC1E1 <= code && code <= 0xC1FB ) || // Lo  [27] HANGUL SYLLABLE SOEG..HANGUL SYLLABLE SOEH
		( 0xC1FD <= code && code <= 0xC217 ) || // Lo  [27] HANGUL SYLLABLE SYOG..HANGUL SYLLABLE SYOH
		( 0xC219 <= code && code <= 0xC233 ) || // Lo  [27] HANGUL SYLLABLE SUG..HANGUL SYLLABLE SUH
		( 0xC235 <= code && code <= 0xC24F ) || // Lo  [27] HANGUL SYLLABLE SWEOG..HANGUL SYLLABLE SWEOH
		( 0xC251 <= code && code <= 0xC26B ) || // Lo  [27] HANGUL SYLLABLE SWEG..HANGUL SYLLABLE SWEH
		( 0xC26D <= code && code <= 0xC287 ) || // Lo  [27] HANGUL SYLLABLE SWIG..HANGUL SYLLABLE SWIH
		( 0xC289 <= code && code <= 0xC2A3 ) || // Lo  [27] HANGUL SYLLABLE SYUG..HANGUL SYLLABLE SYUH
		( 0xC2A5 <= code && code <= 0xC2BF ) || // Lo  [27] HANGUL SYLLABLE SEUG..HANGUL SYLLABLE SEUH
		( 0xC2C1 <= code && code <= 0xC2DB ) || // Lo  [27] HANGUL SYLLABLE SYIG..HANGUL SYLLABLE SYIH
		( 0xC2DD <= code && code <= 0xC2F7 ) || // Lo  [27] HANGUL SYLLABLE SIG..HANGUL SYLLABLE SIH
		( 0xC2F9 <= code && code <= 0xC313 ) || // Lo  [27] HANGUL SYLLABLE SSAG..HANGUL SYLLABLE SSAH
		( 0xC315 <= code && code <= 0xC32F ) || // Lo  [27] HANGUL SYLLABLE SSAEG..HANGUL SYLLABLE SSAEH
		( 0xC331 <= code && code <= 0xC34B ) || // Lo  [27] HANGUL SYLLABLE SSYAG..HANGUL SYLLABLE SSYAH
		( 0xC34D <= code && code <= 0xC367 ) || // Lo  [27] HANGUL SYLLABLE SSYAEG..HANGUL SYLLABLE SSYAEH
		( 0xC369 <= code && code <= 0xC383 ) || // Lo  [27] HANGUL SYLLABLE SSEOG..HANGUL SYLLABLE SSEOH
		( 0xC385 <= code && code <= 0xC39F ) || // Lo  [27] HANGUL SYLLABLE SSEG..HANGUL SYLLABLE SSEH
		( 0xC3A1 <= code && code <= 0xC3BB ) || // Lo  [27] HANGUL SYLLABLE SSYEOG..HANGUL SYLLABLE SSYEOH
		( 0xC3BD <= code && code <= 0xC3D7 ) || // Lo  [27] HANGUL SYLLABLE SSYEG..HANGUL SYLLABLE SSYEH
		( 0xC3D9 <= code && code <= 0xC3F3 ) || // Lo  [27] HANGUL SYLLABLE SSOG..HANGUL SYLLABLE SSOH
		( 0xC3F5 <= code && code <= 0xC40F ) || // Lo  [27] HANGUL SYLLABLE SSWAG..HANGUL SYLLABLE SSWAH
		( 0xC411 <= code && code <= 0xC42B ) || // Lo  [27] HANGUL SYLLABLE SSWAEG..HANGUL SYLLABLE SSWAEH
		( 0xC42D <= code && code <= 0xC447 ) || // Lo  [27] HANGUL SYLLABLE SSOEG..HANGUL SYLLABLE SSOEH
		( 0xC449 <= code && code <= 0xC463 ) || // Lo  [27] HANGUL SYLLABLE SSYOG..HANGUL SYLLABLE SSYOH
		( 0xC465 <= code && code <= 0xC47F ) || // Lo  [27] HANGUL SYLLABLE SSUG..HANGUL SYLLABLE SSUH
		( 0xC481 <= code && code <= 0xC49B ) || // Lo  [27] HANGUL SYLLABLE SSWEOG..HANGUL SYLLABLE SSWEOH
		( 0xC49D <= code && code <= 0xC4B7 ) || // Lo  [27] HANGUL SYLLABLE SSWEG..HANGUL SYLLABLE SSWEH
		( 0xC4B9 <= code && code <= 0xC4D3 ) || // Lo  [27] HANGUL SYLLABLE SSWIG..HANGUL SYLLABLE SSWIH
		( 0xC4D5 <= code && code <= 0xC4EF ) || // Lo  [27] HANGUL SYLLABLE SSYUG..HANGUL SYLLABLE SSYUH
		( 0xC4F1 <= code && code <= 0xC50B ) || // Lo  [27] HANGUL SYLLABLE SSEUG..HANGUL SYLLABLE SSEUH
		( 0xC50D <= code && code <= 0xC527 ) || // Lo  [27] HANGUL SYLLABLE SSYIG..HANGUL SYLLABLE SSYIH
		( 0xC529 <= code && code <= 0xC543 ) || // Lo  [27] HANGUL SYLLABLE SSIG..HANGUL SYLLABLE SSIH
		( 0xC545 <= code && code <= 0xC55F ) || // Lo  [27] HANGUL SYLLABLE AG..HANGUL SYLLABLE AH
		( 0xC561 <= code && code <= 0xC57B ) || // Lo  [27] HANGUL SYLLABLE AEG..HANGUL SYLLABLE AEH
		( 0xC57D <= code && code <= 0xC597 ) || // Lo  [27] HANGUL SYLLABLE YAG..HANGUL SYLLABLE YAH
		( 0xC599 <= code && code <= 0xC5B3 ) || // Lo  [27] HANGUL SYLLABLE YAEG..HANGUL SYLLABLE YAEH
		( 0xC5B5 <= code && code <= 0xC5CF ) || // Lo  [27] HANGUL SYLLABLE EOG..HANGUL SYLLABLE EOH
		( 0xC5D1 <= code && code <= 0xC5EB ) || // Lo  [27] HANGUL SYLLABLE EG..HANGUL SYLLABLE EH
		( 0xC5ED <= code && code <= 0xC607 ) || // Lo  [27] HANGUL SYLLABLE YEOG..HANGUL SYLLABLE YEOH
		( 0xC609 <= code && code <= 0xC623 ) || // Lo  [27] HANGUL SYLLABLE YEG..HANGUL SYLLABLE YEH
		( 0xC625 <= code && code <= 0xC63F ) || // Lo  [27] HANGUL SYLLABLE OG..HANGUL SYLLABLE OH
		( 0xC641 <= code && code <= 0xC65B ) || // Lo  [27] HANGUL SYLLABLE WAG..HANGUL SYLLABLE WAH
		( 0xC65D <= code && code <= 0xC677 ) || // Lo  [27] HANGUL SYLLABLE WAEG..HANGUL SYLLABLE WAEH
		( 0xC679 <= code && code <= 0xC693 ) || // Lo  [27] HANGUL SYLLABLE OEG..HANGUL SYLLABLE OEH
		( 0xC695 <= code && code <= 0xC6AF ) || // Lo  [27] HANGUL SYLLABLE YOG..HANGUL SYLLABLE YOH
		( 0xC6B1 <= code && code <= 0xC6CB ) || // Lo  [27] HANGUL SYLLABLE UG..HANGUL SYLLABLE UH
		( 0xC6CD <= code && code <= 0xC6E7 ) || // Lo  [27] HANGUL SYLLABLE WEOG..HANGUL SYLLABLE WEOH
		( 0xC6E9 <= code && code <= 0xC703 ) || // Lo  [27] HANGUL SYLLABLE WEG..HANGUL SYLLABLE WEH
		( 0xC705 <= code && code <= 0xC71F ) || // Lo  [27] HANGUL SYLLABLE WIG..HANGUL SYLLABLE WIH
		( 0xC721 <= code && code <= 0xC73B ) || // Lo  [27] HANGUL SYLLABLE YUG..HANGUL SYLLABLE YUH
		( 0xC73D <= code && code <= 0xC757 ) || // Lo  [27] HANGUL SYLLABLE EUG..HANGUL SYLLABLE EUH
		( 0xC759 <= code && code <= 0xC773 ) || // Lo  [27] HANGUL SYLLABLE YIG..HANGUL SYLLABLE YIH
		( 0xC775 <= code && code <= 0xC78F ) || // Lo  [27] HANGUL SYLLABLE IG..HANGUL SYLLABLE IH
		( 0xC791 <= code && code <= 0xC7AB ) || // Lo  [27] HANGUL SYLLABLE JAG..HANGUL SYLLABLE JAH
		( 0xC7AD <= code && code <= 0xC7C7 ) || // Lo  [27] HANGUL SYLLABLE JAEG..HANGUL SYLLABLE JAEH
		( 0xC7C9 <= code && code <= 0xC7E3 ) || // Lo  [27] HANGUL SYLLABLE JYAG..HANGUL SYLLABLE JYAH
		( 0xC7E5 <= code && code <= 0xC7FF ) || // Lo  [27] HANGUL SYLLABLE JYAEG..HANGUL SYLLABLE JYAEH
		( 0xC801 <= code && code <= 0xC81B ) || // Lo  [27] HANGUL SYLLABLE JEOG..HANGUL SYLLABLE JEOH
		( 0xC81D <= code && code <= 0xC837 ) || // Lo  [27] HANGUL SYLLABLE JEG..HANGUL SYLLABLE JEH
		( 0xC839 <= code && code <= 0xC853 ) || // Lo  [27] HANGUL SYLLABLE JYEOG..HANGUL SYLLABLE JYEOH
		( 0xC855 <= code && code <= 0xC86F ) || // Lo  [27] HANGUL SYLLABLE JYEG..HANGUL SYLLABLE JYEH
		( 0xC871 <= code && code <= 0xC88B ) || // Lo  [27] HANGUL SYLLABLE JOG..HANGUL SYLLABLE JOH
		( 0xC88D <= code && code <= 0xC8A7 ) || // Lo  [27] HANGUL SYLLABLE JWAG..HANGUL SYLLABLE JWAH
		( 0xC8A9 <= code && code <= 0xC8C3 ) || // Lo  [27] HANGUL SYLLABLE JWAEG..HANGUL SYLLABLE JWAEH
		( 0xC8C5 <= code && code <= 0xC8DF ) || // Lo  [27] HANGUL SYLLABLE JOEG..HANGUL SYLLABLE JOEH
		( 0xC8E1 <= code && code <= 0xC8FB ) || // Lo  [27] HANGUL SYLLABLE JYOG..HANGUL SYLLABLE JYOH
		( 0xC8FD <= code && code <= 0xC917 ) || // Lo  [27] HANGUL SYLLABLE JUG..HANGUL SYLLABLE JUH
		( 0xC919 <= code && code <= 0xC933 ) || // Lo  [27] HANGUL SYLLABLE JWEOG..HANGUL SYLLABLE JWEOH
		( 0xC935 <= code && code <= 0xC94F ) || // Lo  [27] HANGUL SYLLABLE JWEG..HANGUL SYLLABLE JWEH
		( 0xC951 <= code && code <= 0xC96B ) || // Lo  [27] HANGUL SYLLABLE JWIG..HANGUL SYLLABLE JWIH
		( 0xC96D <= code && code <= 0xC987 ) || // Lo  [27] HANGUL SYLLABLE JYUG..HANGUL SYLLABLE JYUH
		( 0xC989 <= code && code <= 0xC9A3 ) || // Lo  [27] HANGUL SYLLABLE JEUG..HANGUL SYLLABLE JEUH
		( 0xC9A5 <= code && code <= 0xC9BF ) || // Lo  [27] HANGUL SYLLABLE JYIG..HANGUL SYLLABLE JYIH
		( 0xC9C1 <= code && code <= 0xC9DB ) || // Lo  [27] HANGUL SYLLABLE JIG..HANGUL SYLLABLE JIH
		( 0xC9DD <= code && code <= 0xC9F7 ) || // Lo  [27] HANGUL SYLLABLE JJAG..HANGUL SYLLABLE JJAH
		( 0xC9F9 <= code && code <= 0xCA13 ) || // Lo  [27] HANGUL SYLLABLE JJAEG..HANGUL SYLLABLE JJAEH
		( 0xCA15 <= code && code <= 0xCA2F ) || // Lo  [27] HANGUL SYLLABLE JJYAG..HANGUL SYLLABLE JJYAH
		( 0xCA31 <= code && code <= 0xCA4B ) || // Lo  [27] HANGUL SYLLABLE JJYAEG..HANGUL SYLLABLE JJYAEH
		( 0xCA4D <= code && code <= 0xCA67 ) || // Lo  [27] HANGUL SYLLABLE JJEOG..HANGUL SYLLABLE JJEOH
		( 0xCA69 <= code && code <= 0xCA83 ) || // Lo  [27] HANGUL SYLLABLE JJEG..HANGUL SYLLABLE JJEH
		( 0xCA85 <= code && code <= 0xCA9F ) || // Lo  [27] HANGUL SYLLABLE JJYEOG..HANGUL SYLLABLE JJYEOH
		( 0xCAA1 <= code && code <= 0xCABB ) || // Lo  [27] HANGUL SYLLABLE JJYEG..HANGUL SYLLABLE JJYEH
		( 0xCABD <= code && code <= 0xCAD7 ) || // Lo  [27] HANGUL SYLLABLE JJOG..HANGUL SYLLABLE JJOH
		( 0xCAD9 <= code && code <= 0xCAF3 ) || // Lo  [27] HANGUL SYLLABLE JJWAG..HANGUL SYLLABLE JJWAH
		( 0xCAF5 <= code && code <= 0xCB0F ) || // Lo  [27] HANGUL SYLLABLE JJWAEG..HANGUL SYLLABLE JJWAEH
		( 0xCB11 <= code && code <= 0xCB2B ) || // Lo  [27] HANGUL SYLLABLE JJOEG..HANGUL SYLLABLE JJOEH
		( 0xCB2D <= code && code <= 0xCB47 ) || // Lo  [27] HANGUL SYLLABLE JJYOG..HANGUL SYLLABLE JJYOH
		( 0xCB49 <= code && code <= 0xCB63 ) || // Lo  [27] HANGUL SYLLABLE JJUG..HANGUL SYLLABLE JJUH
		( 0xCB65 <= code && code <= 0xCB7F ) || // Lo  [27] HANGUL SYLLABLE JJWEOG..HANGUL SYLLABLE JJWEOH
		( 0xCB81 <= code && code <= 0xCB9B ) || // Lo  [27] HANGUL SYLLABLE JJWEG..HANGUL SYLLABLE JJWEH
		( 0xCB9D <= code && code <= 0xCBB7 ) || // Lo  [27] HANGUL SYLLABLE JJWIG..HANGUL SYLLABLE JJWIH
		( 0xCBB9 <= code && code <= 0xCBD3 ) || // Lo  [27] HANGUL SYLLABLE JJYUG..HANGUL SYLLABLE JJYUH
		( 0xCBD5 <= code && code <= 0xCBEF ) || // Lo  [27] HANGUL SYLLABLE JJEUG..HANGUL SYLLABLE JJEUH
		( 0xCBF1 <= code && code <= 0xCC0B ) || // Lo  [27] HANGUL SYLLABLE JJYIG..HANGUL SYLLABLE JJYIH
		( 0xCC0D <= code && code <= 0xCC27 ) || // Lo  [27] HANGUL SYLLABLE JJIG..HANGUL SYLLABLE JJIH
		( 0xCC29 <= code && code <= 0xCC43 ) || // Lo  [27] HANGUL SYLLABLE CAG..HANGUL SYLLABLE CAH
		( 0xCC45 <= code && code <= 0xCC5F ) || // Lo  [27] HANGUL SYLLABLE CAEG..HANGUL SYLLABLE CAEH
		( 0xCC61 <= code && code <= 0xCC7B ) || // Lo  [27] HANGUL SYLLABLE CYAG..HANGUL SYLLABLE CYAH
		( 0xCC7D <= code && code <= 0xCC97 ) || // Lo  [27] HANGUL SYLLABLE CYAEG..HANGUL SYLLABLE CYAEH
		( 0xCC99 <= code && code <= 0xCCB3 ) || // Lo  [27] HANGUL SYLLABLE CEOG..HANGUL SYLLABLE CEOH
		( 0xCCB5 <= code && code <= 0xCCCF ) || // Lo  [27] HANGUL SYLLABLE CEG..HANGUL SYLLABLE CEH
		( 0xCCD1 <= code && code <= 0xCCEB ) || // Lo  [27] HANGUL SYLLABLE CYEOG..HANGUL SYLLABLE CYEOH
		( 0xCCED <= code && code <= 0xCD07 ) || // Lo  [27] HANGUL SYLLABLE CYEG..HANGUL SYLLABLE CYEH
		( 0xCD09 <= code && code <= 0xCD23 ) || // Lo  [27] HANGUL SYLLABLE COG..HANGUL SYLLABLE COH
		( 0xCD25 <= code && code <= 0xCD3F ) || // Lo  [27] HANGUL SYLLABLE CWAG..HANGUL SYLLABLE CWAH
		( 0xCD41 <= code && code <= 0xCD5B ) || // Lo  [27] HANGUL SYLLABLE CWAEG..HANGUL SYLLABLE CWAEH
		( 0xCD5D <= code && code <= 0xCD77 ) || // Lo  [27] HANGUL SYLLABLE COEG..HANGUL SYLLABLE COEH
		( 0xCD79 <= code && code <= 0xCD93 ) || // Lo  [27] HANGUL SYLLABLE CYOG..HANGUL SYLLABLE CYOH
		( 0xCD95 <= code && code <= 0xCDAF ) || // Lo  [27] HANGUL SYLLABLE CUG..HANGUL SYLLABLE CUH
		( 0xCDB1 <= code && code <= 0xCDCB ) || // Lo  [27] HANGUL SYLLABLE CWEOG..HANGUL SYLLABLE CWEOH
		( 0xCDCD <= code && code <= 0xCDE7 ) || // Lo  [27] HANGUL SYLLABLE CWEG..HANGUL SYLLABLE CWEH
		( 0xCDE9 <= code && code <= 0xCE03 ) || // Lo  [27] HANGUL SYLLABLE CWIG..HANGUL SYLLABLE CWIH
		( 0xCE05 <= code && code <= 0xCE1F ) || // Lo  [27] HANGUL SYLLABLE CYUG..HANGUL SYLLABLE CYUH
		( 0xCE21 <= code && code <= 0xCE3B ) || // Lo  [27] HANGUL SYLLABLE CEUG..HANGUL SYLLABLE CEUH
		( 0xCE3D <= code && code <= 0xCE57 ) || // Lo  [27] HANGUL SYLLABLE CYIG..HANGUL SYLLABLE CYIH
		( 0xCE59 <= code && code <= 0xCE73 ) || // Lo  [27] HANGUL SYLLABLE CIG..HANGUL SYLLABLE CIH
		( 0xCE75 <= code && code <= 0xCE8F ) || // Lo  [27] HANGUL SYLLABLE KAG..HANGUL SYLLABLE KAH
		( 0xCE91 <= code && code <= 0xCEAB ) || // Lo  [27] HANGUL SYLLABLE KAEG..HANGUL SYLLABLE KAEH
		( 0xCEAD <= code && code <= 0xCEC7 ) || // Lo  [27] HANGUL SYLLABLE KYAG..HANGUL SYLLABLE KYAH
		( 0xCEC9 <= code && code <= 0xCEE3 ) || // Lo  [27] HANGUL SYLLABLE KYAEG..HANGUL SYLLABLE KYAEH
		( 0xCEE5 <= code && code <= 0xCEFF ) || // Lo  [27] HANGUL SYLLABLE KEOG..HANGUL SYLLABLE KEOH
		( 0xCF01 <= code && code <= 0xCF1B ) || // Lo  [27] HANGUL SYLLABLE KEG..HANGUL SYLLABLE KEH
		( 0xCF1D <= code && code <= 0xCF37 ) || // Lo  [27] HANGUL SYLLABLE KYEOG..HANGUL SYLLABLE KYEOH
		( 0xCF39 <= code && code <= 0xCF53 ) || // Lo  [27] HANGUL SYLLABLE KYEG..HANGUL SYLLABLE KYEH
		( 0xCF55 <= code && code <= 0xCF6F ) || // Lo  [27] HANGUL SYLLABLE KOG..HANGUL SYLLABLE KOH
		( 0xCF71 <= code && code <= 0xCF8B ) || // Lo  [27] HANGUL SYLLABLE KWAG..HANGUL SYLLABLE KWAH
		( 0xCF8D <= code && code <= 0xCFA7 ) || // Lo  [27] HANGUL SYLLABLE KWAEG..HANGUL SYLLABLE KWAEH
		( 0xCFA9 <= code && code <= 0xCFC3 ) || // Lo  [27] HANGUL SYLLABLE KOEG..HANGUL SYLLABLE KOEH
		( 0xCFC5 <= code && code <= 0xCFDF ) || // Lo  [27] HANGUL SYLLABLE KYOG..HANGUL SYLLABLE KYOH
		( 0xCFE1 <= code && code <= 0xCFFB ) || // Lo  [27] HANGUL SYLLABLE KUG..HANGUL SYLLABLE KUH
		( 0xCFFD <= code && code <= 0xD017 ) || // Lo  [27] HANGUL SYLLABLE KWEOG..HANGUL SYLLABLE KWEOH
		( 0xD019 <= code && code <= 0xD033 ) || // Lo  [27] HANGUL SYLLABLE KWEG..HANGUL SYLLABLE KWEH
		( 0xD035 <= code && code <= 0xD04F ) || // Lo  [27] HANGUL SYLLABLE KWIG..HANGUL SYLLABLE KWIH
		( 0xD051 <= code && code <= 0xD06B ) || // Lo  [27] HANGUL SYLLABLE KYUG..HANGUL SYLLABLE KYUH
		( 0xD06D <= code && code <= 0xD087 ) || // Lo  [27] HANGUL SYLLABLE KEUG..HANGUL SYLLABLE KEUH
		( 0xD089 <= code && code <= 0xD0A3 ) || // Lo  [27] HANGUL SYLLABLE KYIG..HANGUL SYLLABLE KYIH
		( 0xD0A5 <= code && code <= 0xD0BF ) || // Lo  [27] HANGUL SYLLABLE KIG..HANGUL SYLLABLE KIH
		( 0xD0C1 <= code && code <= 0xD0DB ) || // Lo  [27] HANGUL SYLLABLE TAG..HANGUL SYLLABLE TAH
		( 0xD0DD <= code && code <= 0xD0F7 ) || // Lo  [27] HANGUL SYLLABLE TAEG..HANGUL SYLLABLE TAEH
		( 0xD0F9 <= code && code <= 0xD113 ) || // Lo  [27] HANGUL SYLLABLE TYAG..HANGUL SYLLABLE TYAH
		( 0xD115 <= code && code <= 0xD12F ) || // Lo  [27] HANGUL SYLLABLE TYAEG..HANGUL SYLLABLE TYAEH
		( 0xD131 <= code && code <= 0xD14B ) || // Lo  [27] HANGUL SYLLABLE TEOG..HANGUL SYLLABLE TEOH
		( 0xD14D <= code && code <= 0xD167 ) || // Lo  [27] HANGUL SYLLABLE TEG..HANGUL SYLLABLE TEH
		( 0xD169 <= code && code <= 0xD183 ) || // Lo  [27] HANGUL SYLLABLE TYEOG..HANGUL SYLLABLE TYEOH
		( 0xD185 <= code && code <= 0xD19F ) || // Lo  [27] HANGUL SYLLABLE TYEG..HANGUL SYLLABLE TYEH
		( 0xD1A1 <= code && code <= 0xD1BB ) || // Lo  [27] HANGUL SYLLABLE TOG..HANGUL SYLLABLE TOH
		( 0xD1BD <= code && code <= 0xD1D7 ) || // Lo  [27] HANGUL SYLLABLE TWAG..HANGUL SYLLABLE TWAH
		( 0xD1D9 <= code && code <= 0xD1F3 ) || // Lo  [27] HANGUL SYLLABLE TWAEG..HANGUL SYLLABLE TWAEH
		( 0xD1F5 <= code && code <= 0xD20F ) || // Lo  [27] HANGUL SYLLABLE TOEG..HANGUL SYLLABLE TOEH
		( 0xD211 <= code && code <= 0xD22B ) || // Lo  [27] HANGUL SYLLABLE TYOG..HANGUL SYLLABLE TYOH
		( 0xD22D <= code && code <= 0xD247 ) || // Lo  [27] HANGUL SYLLABLE TUG..HANGUL SYLLABLE TUH
		( 0xD249 <= code && code <= 0xD263 ) || // Lo  [27] HANGUL SYLLABLE TWEOG..HANGUL SYLLABLE TWEOH
		( 0xD265 <= code && code <= 0xD27F ) || // Lo  [27] HANGUL SYLLABLE TWEG..HANGUL SYLLABLE TWEH
		( 0xD281 <= code && code <= 0xD29B ) || // Lo  [27] HANGUL SYLLABLE TWIG..HANGUL SYLLABLE TWIH
		( 0xD29D <= code && code <= 0xD2B7 ) || // Lo  [27] HANGUL SYLLABLE TYUG..HANGUL SYLLABLE TYUH
		( 0xD2B9 <= code && code <= 0xD2D3 ) || // Lo  [27] HANGUL SYLLABLE TEUG..HANGUL SYLLABLE TEUH
		( 0xD2D5 <= code && code <= 0xD2EF ) || // Lo  [27] HANGUL SYLLABLE TYIG..HANGUL SYLLABLE TYIH
		( 0xD2F1 <= code && code <= 0xD30B ) || // Lo  [27] HANGUL SYLLABLE TIG..HANGUL SYLLABLE TIH
		( 0xD30D <= code && code <= 0xD327 ) || // Lo  [27] HANGUL SYLLABLE PAG..HANGUL SYLLABLE PAH
		( 0xD329 <= code && code <= 0xD343 ) || // Lo  [27] HANGUL SYLLABLE PAEG..HANGUL SYLLABLE PAEH
		( 0xD345 <= code && code <= 0xD35F ) || // Lo  [27] HANGUL SYLLABLE PYAG..HANGUL SYLLABLE PYAH
		( 0xD361 <= code && code <= 0xD37B ) || // Lo  [27] HANGUL SYLLABLE PYAEG..HANGUL SYLLABLE PYAEH
		( 0xD37D <= code && code <= 0xD397 ) || // Lo  [27] HANGUL SYLLABLE PEOG..HANGUL SYLLABLE PEOH
		( 0xD399 <= code && code <= 0xD3B3 ) || // Lo  [27] HANGUL SYLLABLE PEG..HANGUL SYLLABLE PEH
		( 0xD3B5 <= code && code <= 0xD3CF ) || // Lo  [27] HANGUL SYLLABLE PYEOG..HANGUL SYLLABLE PYEOH
		( 0xD3D1 <= code && code <= 0xD3EB ) || // Lo  [27] HANGUL SYLLABLE PYEG..HANGUL SYLLABLE PYEH
		( 0xD3ED <= code && code <= 0xD407 ) || // Lo  [27] HANGUL SYLLABLE POG..HANGUL SYLLABLE POH
		( 0xD409 <= code && code <= 0xD423 ) || // Lo  [27] HANGUL SYLLABLE PWAG..HANGUL SYLLABLE PWAH
		( 0xD425 <= code && code <= 0xD43F ) || // Lo  [27] HANGUL SYLLABLE PWAEG..HANGUL SYLLABLE PWAEH
		( 0xD441 <= code && code <= 0xD45B ) || // Lo  [27] HANGUL SYLLABLE POEG..HANGUL SYLLABLE POEH
		( 0xD45D <= code && code <= 0xD477 ) || // Lo  [27] HANGUL SYLLABLE PYOG..HANGUL SYLLABLE PYOH
		( 0xD479 <= code && code <= 0xD493 ) || // Lo  [27] HANGUL SYLLABLE PUG..HANGUL SYLLABLE PUH
		( 0xD495 <= code && code <= 0xD4AF ) || // Lo  [27] HANGUL SYLLABLE PWEOG..HANGUL SYLLABLE PWEOH
		( 0xD4B1 <= code && code <= 0xD4CB ) || // Lo  [27] HANGUL SYLLABLE PWEG..HANGUL SYLLABLE PWEH
		( 0xD4CD <= code && code <= 0xD4E7 ) || // Lo  [27] HANGUL SYLLABLE PWIG..HANGUL SYLLABLE PWIH
		( 0xD4E9 <= code && code <= 0xD503 ) || // Lo  [27] HANGUL SYLLABLE PYUG..HANGUL SYLLABLE PYUH
		( 0xD505 <= code && code <= 0xD51F ) || // Lo  [27] HANGUL SYLLABLE PEUG..HANGUL SYLLABLE PEUH
		( 0xD521 <= code && code <= 0xD53B ) || // Lo  [27] HANGUL SYLLABLE PYIG..HANGUL SYLLABLE PYIH
		( 0xD53D <= code && code <= 0xD557 ) || // Lo  [27] HANGUL SYLLABLE PIG..HANGUL SYLLABLE PIH
		( 0xD559 <= code && code <= 0xD573 ) || // Lo  [27] HANGUL SYLLABLE HAG..HANGUL SYLLABLE HAH
		( 0xD575 <= code && code <= 0xD58F ) || // Lo  [27] HANGUL SYLLABLE HAEG..HANGUL SYLLABLE HAEH
		( 0xD591 <= code && code <= 0xD5AB ) || // Lo  [27] HANGUL SYLLABLE HYAG..HANGUL SYLLABLE HYAH
		( 0xD5AD <= code && code <= 0xD5C7 ) || // Lo  [27] HANGUL SYLLABLE HYAEG..HANGUL SYLLABLE HYAEH
		( 0xD5C9 <= code && code <= 0xD5E3 ) || // Lo  [27] HANGUL SYLLABLE HEOG..HANGUL SYLLABLE HEOH
		( 0xD5E5 <= code && code <= 0xD5FF ) || // Lo  [27] HANGUL SYLLABLE HEG..HANGUL SYLLABLE HEH
		( 0xD601 <= code && code <= 0xD61B ) || // Lo  [27] HANGUL SYLLABLE HYEOG..HANGUL SYLLABLE HYEOH
		( 0xD61D <= code && code <= 0xD637 ) || // Lo  [27] HANGUL SYLLABLE HYEG..HANGUL SYLLABLE HYEH
		( 0xD639 <= code && code <= 0xD653 ) || // Lo  [27] HANGUL SYLLABLE HOG..HANGUL SYLLABLE HOH
		( 0xD655 <= code && code <= 0xD66F ) || // Lo  [27] HANGUL SYLLABLE HWAG..HANGUL SYLLABLE HWAH
		( 0xD671 <= code && code <= 0xD68B ) || // Lo  [27] HANGUL SYLLABLE HWAEG..HANGUL SYLLABLE HWAEH
		( 0xD68D <= code && code <= 0xD6A7 ) || // Lo  [27] HANGUL SYLLABLE HOEG..HANGUL SYLLABLE HOEH
		( 0xD6A9 <= code && code <= 0xD6C3 ) || // Lo  [27] HANGUL SYLLABLE HYOG..HANGUL SYLLABLE HYOH
		( 0xD6C5 <= code && code <= 0xD6DF ) || // Lo  [27] HANGUL SYLLABLE HUG..HANGUL SYLLABLE HUH
		( 0xD6E1 <= code && code <= 0xD6FB ) || // Lo  [27] HANGUL SYLLABLE HWEOG..HANGUL SYLLABLE HWEOH
		( 0xD6FD <= code && code <= 0xD717 ) || // Lo  [27] HANGUL SYLLABLE HWEG..HANGUL SYLLABLE HWEH
		( 0xD719 <= code && code <= 0xD733 ) || // Lo  [27] HANGUL SYLLABLE HWIG..HANGUL SYLLABLE HWIH
		( 0xD735 <= code && code <= 0xD74F ) || // Lo  [27] HANGUL SYLLABLE HYUG..HANGUL SYLLABLE HYUH
		( 0xD751 <= code && code <= 0xD76B ) || // Lo  [27] HANGUL SYLLABLE HEUG..HANGUL SYLLABLE HEUH
		( 0xD76D <= code && code <= 0xD787 ) || // Lo  [27] HANGUL SYLLABLE HYIG..HANGUL SYLLABLE HYIH
		( 0xD789 <= code && code <= 0xD7A3 ) // Lo  [27] HANGUL SYLLABLE HIG..HANGUL SYLLABLE HIH
	) {
		return constants.LVT;
	}
	if (
		code === 0x200D // Cf       ZERO WIDTH JOINER
	) {
		return constants.ZWJ;
	}
	// All unlisted characters have a grapheme break property of "Other":
	return constants.Other;
}


// EXPORTS //

module.exports = graphemeBreakProperty;

},{"./constants.js":200}],199:[function(require,module,exports){
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

// MODULES //

var constants = require( './constants.js' );


// FUNCTIONS //

/**
* Returns number of elements in array equal to a provided value.
*
* @private
* @param {Array} arr - input array
* @param {NonNegativeInteger} start - starting search index (inclusive)
* @param {NonNegativeInteger} end - ending search index (inclusive)
* @param {*} value - input value
* @returns {NonNegativeInteger} number of elements in array equal to a provided value
*/
function count( arr, start, end, value ) {
	var cnt;
	var i;

	if ( end >= arr.length ) {
		end = arr.length - 1;
	}
	cnt = 0;
	for ( i = start; i <= end; i++ ) {
		if ( arr[ i ] === value ) {
			cnt += 1;
		}
	}
	return cnt;
}

/**
* Returns whether every indexed array element is equal to a provided value.
*
* @private
* @param {Array} arr - input array
* @param {NonNegativeInteger} start - starting search index (inclusive)
* @param {NonNegativeInteger} end - ending search index (inclusive)
* @param {*} value - search value
* @returns {boolean} boolean indicating whether all the values in array in the given range are equal to the provided value
*/
function every( arr, start, end, value ) {
	var i;

	if ( end >= arr.length ) {
		end = arr.length - 1;
	}
	for ( i = start; i <= end; i++ ) {
		if ( arr[ i ] !== value ) {
			return false;
		}
	}
	return true;
}

/**
* Returns the index of the first occurrence of a value in a provided array.
*
* @private
* @param {Array} arr - input array
* @param {NonNegativeInteger} start - starting search index (inclusive)
* @param {NonNegativeInteger} end - ending search index (inclusive)
* @param {*} value - search value
* @returns {integer} index of the first occurrence
*/
function indexOf( arr, start, end, value ) {
	var i;

	if ( end >= arr.length ) {
		end = arr.length - 1;
	}
	for ( i = start; i <= end; i++ ) {
		if ( arr[ i ] === value ) {
			return i;
		}
	}
	return -1;
}

/**
* Returns the index of the last occurrence of a value in a provided array.
*
* @private
* @param {Array} arr - input array
* @param {NonNegativeInteger} start - starting search index at which to start searching backwards (inclusive)
* @param {NonNegativeInteger} end - ending search index (inclusive)
* @param {*} value - search value
* @returns {integer} index of the last occurrence
*/
function lastIndexOf( arr, start, end, value ) {
	var i;

	if ( start >= arr.length-1 ) {
		start = arr.length - 1;
	}
	for ( i = start; i >= end; i-- ) {
		if ( arr[ i ] === value ) {
			return i;
		}
	}
	return -1;
}


// MAIN //

/**
* Returns the break type between grapheme breaking classes according to _UAX #29 3.1.1 Grapheme Cluster Boundary Rules_ on extended grapheme clusters.
*
* @private
* @param {Array} breaks - list of grapheme break properties
* @param {Array} emoji - list of emoji properties
* @returns {NonNegativeInteger} break type
*
* @example
* var out = breakType( [ 11, 3, 11 ], [ 11, 11, 11 ] );
* // returns 1
*/
function breakType( breaks, emoji ) {
	var nextEmoji;
	var next;
	var prev;
	var idx;
	var N;
	var M;

	N = breaks.length;
	M = N - 1;

	prev = breaks[ M-1 ];
	next = breaks[ M ];
	nextEmoji = emoji[ M ];

	idx = lastIndexOf( breaks, M, 0, constants.RegionalIndicator );
	if (
		idx > 0 &&
		prev !== constants.Prepend &&
		prev !== constants.RegionalIndicator &&
		every( breaks, 1, idx-1, constants.RegionalIndicator )
	) {
		if ( count( breaks, 0, M, constants.RegionalIndicator ) % 2 === 1 ) {
			return constants.BreakLastRegional;
		}
		return constants.BreakPenultimateRegional;
	}
	// GB3: CR × LF
	if (
		prev === constants.CR &&
		next === constants.LF
	) {
		return constants.NotBreak;
	}
	// GB4: (Control|CR|LF) ÷
	if (
		prev === constants.Control ||
		prev === constants.CR ||
		prev === constants.LF
	) {
		return constants.BreakStart;
	}
	// GB5: ÷ (Control|CR|LF)
	if (
		next === constants.Control ||
		next === constants.CR ||
		next === constants.LF
	) {
		return constants.BreakStart;
	}
	// GB6: L × (L|V|LV|LVT)
	if (
		prev === constants.L &&
		(
			next === constants.L ||
			next === constants.V ||
			next === constants.LV ||
			next === constants.LVT
		)
	) {
		return constants.NotBreak;
	}
	// GB7: (LV|V) × (V|T)
	if (
		( prev === constants.LV || prev === constants.V ) &&
		( next === constants.V || next === constants.T )
	) {
		return constants.NotBreak;
	}
	// GB8: (LVT|T) × (T)
	if (
		( prev === constants.LVT || prev === constants.T ) &&
		next === constants.T
	) {
		return constants.NotBreak;
	}
	// GB9: × (Extend|ZWJ)
	if (
		next === constants.Extend ||
		next === constants.ZWJ
	) {
		return constants.NotBreak;
	}
	// GB9a: × SpacingMark
	if ( next === constants.SpacingMark ) {
		return constants.NotBreak;
	}
	// GB9b: Prepend ×
	if ( prev === constants.Prepend ) {
		return constants.NotBreak;
	}
	// GB11: \p{Extended_Pictographic} Extend* ZWJ × \p{Extended_Pictographic}
	idx = lastIndexOf( emoji, M-1, 0, constants.ExtendedPictographic );
	if (
		idx >= 0 &&
		prev === constants.ZWJ &&
		nextEmoji === constants.ExtendedPictographic &&
		emoji[ idx ] === constants.ExtendedPictographic &&
		every( breaks, idx+1, M-2, constants.Extend )
	) {
		return constants.NotBreak;
	}
	// GB12: ^ (RI RI)* RI × RI
	// GB13: [^RI] (RI RI)* RI × RI
	if ( indexOf( breaks, 1, M-1, constants.RegionalIndicator ) >= 0 ) {
		return constants.Break;
	}
	if (
		prev === constants.RegionalIndicator &&
		next === constants.RegionalIndicator
	) {
		return constants.NotBreak;
	}
	// GB999: Any ? Any
	return constants.BreakStart;
}


// EXPORTS //

module.exports = breakType;

},{"./constants.js":200}],200:[function(require,module,exports){
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

var consts = {
	'CR': 0,
	'LF': 1,
	'Control': 2,
	'Extend': 3,
	'RegionalIndicator': 4,
	'SpacingMark': 5,
	'L': 6,
	'V': 7,
	'T': 8,
	'LV': 9,
	'LVT': 10,
	'Other': 11,
	'Prepend': 12,
	'ZWJ': 13,
	'NotBreak': 0,
	'BreakStart': 1,
	'Break': 2,
	'BreakLastRegional': 3,
	'BreakPenultimateRegional': 4,
	'ExtendedPictographic': 101
};


// EXPORTS //

module.exports = consts;

},{}],201:[function(require,module,exports){
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

// MODULES //

var constants = require( './constants.js' );


// MAIN //

/**
* Returns the emoji property from the [Unicode Standard][1].
*
* [1]: https://www.unicode.org/Public/13.0.0/ucd/emoji/emoji-data.txt
*
* @private
* @param {NonNegativeInteger} code - Unicode code point
* @returns {NonNegativeInteger} emoji property
*
* @example
* var out = emojiProperty( 0x23EC );
* // returns 101
*
* @example
* var out = emojiProperty( 0x1FFFE );
* // returns 11
*/
function emojiProperty( code ) {
	if (
		code === 0x00A9 || // E0.6   [1] (©️)       copyright
		code === 0x00AE || // E0.6   [1] (®️)       registered
		code === 0x203C || // E0.6   [1] (‼️)       double exclamation mark
		code === 0x2049 || // E0.6   [1] (⁉️)       exclamation question mark
		code === 0x2122 || // E0.6   [1] (™️)       trade mark
		code === 0x2139 || // E0.6   [1] (ℹ️)       information
		( 0x2194 <= code && code <= 0x2199 ) || // E0.6   [6] (↔️..↙️)    left-right arrow..down-left arrow
		( 0x21A9 <= code && code <= 0x21AA ) || // E0.6   [2] (↩️..↪️)    right arrow curving left..left arrow curving right
		( 0x231A <= code && code <= 0x231B ) || // E0.6   [2] (⌚..⌛)    watch..hourglass done
		code === 0x2328 || // E1.0   [1] (⌨️)       keyboard
		code === 0x2388 || // E0.0   [1] (⎈)       HELM SYMBOL
		code === 0x23CF || // E1.0   [1] (⏏️)       eject button
		( 0x23E9 <= code && code <= 0x23EC ) || // E0.6   [4] (⏩..⏬)    fast-forward button..fast down button
		( 0x23ED <= code && code <= 0x23EE ) || // E0.7   [2] (⏭️..⏮️)    next track button..last track button
		code === 0x23EF || // E1.0   [1] (⏯️)       play or pause button
		code === 0x23F0 || // E0.6   [1] (⏰)       alarm clock
		( 0x23F1 <= code && code <= 0x23F2 ) || // E1.0   [2] (⏱️..⏲️)    stopwatch..timer clock
		code === 0x23F3 || // E0.6   [1] (⏳)       hourglass not done
		( 0x23F8 <= code && code <= 0x23FA ) || // E0.7   [3] (⏸️..⏺️)    pause button..record button
		code === 0x24C2 || // E0.6   [1] (Ⓜ️)       circled M
		( 0x25AA <= code && code <= 0x25AB ) || // E0.6   [2] (▪️..▫️)    black small square..white small square
		code === 0x25B6 || // E0.6   [1] (▶️)       play button
		code === 0x25C0 || // E0.6   [1] (◀️)       reverse button
		( 0x25FB <= code && code <= 0x25FE ) || // E0.6   [4] (◻️..◾)    white medium square..black medium-small square
		( 0x2600 <= code && code <= 0x2601 ) || // E0.6   [2] (☀️..☁️)    sun..cloud
		( 0x2602 <= code && code <= 0x2603 ) || // E0.7   [2] (☂️..☃️)    umbrella..snowman
		code === 0x2604 || // E1.0   [1] (☄️)       comet
		code === 0x2605 || // E0.0   [1] (★)       BLACK STAR
		( 0x2607 <= code && code <= 0x260D ) || // E0.0   [7] (☇..☍)    LIGHTNING..OPPOSITION
		code === 0x260E || // E0.6   [1] (☎️)       telephone
		( 0x260F <= code && code <= 0x2610 ) || // E0.0   [2] (☏..☐)    WHITE TELEPHONE..BALLOT BOX
		code === 0x2611 || // E0.6   [1] (☑️)       check box with check
		code === 0x2612 || // E0.0   [1] (☒)       BALLOT BOX WITH X
		( 0x2614 <= code && code <= 0x2615 ) || // E0.6   [2] (☔..☕)    umbrella with rain drops..hot beverage
		( 0x2616 <= code && code <= 0x2617 ) || // E0.0   [2] (☖..☗)    WHITE SHOGI PIECE..BLACK SHOGI PIECE
		code === 0x2618 || // E1.0   [1] (☘️)       shamrock
		( 0x2619 <= code && code <= 0x261C ) || // E0.0   [4] (☙..☜)    REVERSED ROTATED FLORAL HEART BULLET..WHITE LEFT POINTING INDEX
		code === 0x261D || // E0.6   [1] (☝️)       index pointing up
		( 0x261E <= code && code <= 0x261F ) || // E0.0   [2] (☞..☟)    WHITE RIGHT POINTING INDEX..WHITE DOWN POINTING INDEX
		code === 0x2620 || // E1.0   [1] (☠️)       skull and crossbones
		code === 0x2621 || // E0.0   [1] (☡)       CAUTION SIGN
		( 0x2622 <= code && code <= 0x2623 ) || // E1.0   [2] (☢️..☣️)    radioactive..biohazard
		( 0x2624 <= code && code <= 0x2625 ) || // E0.0   [2] (☤..☥)    CADUCEUS..ANKH
		code === 0x2626 || // E1.0   [1] (☦️)       orthodox cross
		( 0x2627 <= code && code <= 0x2629 ) || // E0.0   [3] (☧..☩)    CHI RHO..CROSS OF JERUSALEM
		code === 0x262A || // E0.7   [1] (☪️)       star and crescent
		( 0x262B <= code && code <= 0x262D ) || // E0.0   [3] (☫..☭)    FARSI SYMBOL..HAMMER AND SICKLE
		code === 0x262E || // E1.0   [1] (☮️)       peace symbol
		code === 0x262F || // E0.7   [1] (☯️)       yin yang
		( 0x2630 <= code && code <= 0x2637 ) || // E0.0   [8] (☰..☷)    TRIGRAM FOR HEAVEN..TRIGRAM FOR EARTH
		( 0x2638 <= code && code <= 0x2639 ) || // E0.7   [2] (☸️..☹️)    wheel of dharma..frowning face
		code === 0x263A || // E0.6   [1] (☺️)       smiling face
		( 0x263B <= code && code <= 0x263F ) || // E0.0   [5] (☻..☿)    BLACK SMILING FACE..MERCURY
		code === 0x2640 || // E4.0   [1] (♀️)       female sign
		code === 0x2641 || // E0.0   [1] (♁)       EARTH
		code === 0x2642 || // E4.0   [1] (♂️)       male sign
		( 0x2643 <= code && code <= 0x2647 ) || // E0.0   [5] (♃..♇)    JUPITER..PLUTO
		( 0x2648 <= code && code <= 0x2653 ) || // E0.6  [12] (♈..♓)    Aries..Pisces
		( 0x2654 <= code && code <= 0x265E ) || // E0.0  [11] (♔..♞)    WHITE CHESS KING..BLACK CHESS KNIGHT
		code === 0x265F || // E11.0  [1] (♟️)       chess pawn
		code === 0x2660 || // E0.6   [1] (♠️)       spade suit
		( 0x2661 <= code && code <= 0x2662 ) || // E0.0   [2] (♡..♢)    WHITE HEART SUIT..WHITE DIAMOND SUIT
		code === 0x2663 || // E0.6   [1] (♣️)       club suit
		code === 0x2664 || // E0.0   [1] (♤)       WHITE SPADE SUIT
		( 0x2665 <= code && code <= 0x2666 ) || // E0.6   [2] (♥️..♦️)    heart suit..diamond suit
		code === 0x2667 || // E0.0   [1] (♧)       WHITE CLUB SUIT
		code === 0x2668 || // E0.6   [1] (♨️)       hot springs
		( 0x2669 <= code && code <= 0x267A ) || // E0.0  [18] (♩..♺)    QUARTER NOTE..RECYCLING SYMBOL FOR GENERIC MATERIALS
		code === 0x267B || // E0.6   [1] (♻️)       recycling symbol
		( 0x267C <= code && code <= 0x267D ) || // E0.0   [2] (♼..♽)    RECYCLED PAPER SYMBOL..PARTIALLY-RECYCLED PAPER SYMBOL
		code === 0x267E || // E11.0  [1] (♾️)       infinity
		code === 0x267F || // E0.6   [1] (♿)       wheelchair symbol
		( 0x2680 <= code && code <= 0x2685 ) || // E0.0   [6] (⚀..⚅)    DIE FACE-1..DIE FACE-6
		( 0x2690 <= code && code <= 0x2691 ) || // E0.0   [2] (⚐..⚑)    WHITE FLAG..BLACK FLAG
		code === 0x2692 || // E1.0   [1] (⚒️)       hammer and pick
		code === 0x2693 || // E0.6   [1] (⚓)       anchor
		code === 0x2694 || // E1.0   [1] (⚔️)       crossed swords
		code === 0x2695 || // E4.0   [1] (⚕️)       medical symbol
		( 0x2696 <= code && code <= 0x2697 ) || // E1.0   [2] (⚖️..⚗️)    balance scale..alembic
		code === 0x2698 || // E0.0   [1] (⚘)       FLOWER
		code === 0x2699 || // E1.0   [1] (⚙️)       gear
		code === 0x269A || // E0.0   [1] (⚚)       STAFF OF HERMES
		( 0x269B <= code && code <= 0x269C ) || // E1.0   [2] (⚛️..⚜️)    atom symbol..fleur-de-lis
		( 0x269D <= code && code <= 0x269F ) || // E0.0   [3] (⚝..⚟)    OUTLINED WHITE STAR..THREE LINES CONVERGING LEFT
		( 0x26A0 <= code && code <= 0x26A1 ) || // E0.6   [2] (⚠️..⚡)    warning..high voltage
		( 0x26A2 <= code && code <= 0x26A6 ) || // E0.0   [5] (⚢..⚦)    DOUBLED FEMALE SIGN..MALE WITH STROKE SIGN
		code === 0x26A7 || // E13.0  [1] (⚧️)       transgender symbol
		( 0x26A8 <= code && code <= 0x26A9 ) || // E0.0   [2] (⚨..⚩)    VERTICAL MALE WITH STROKE SIGN..HORIZONTAL MALE WITH STROKE SIGN
		( 0x26AA <= code && code <= 0x26AB ) || // E0.6   [2] (⚪..⚫)    white circle..black circle
		( 0x26AC <= code && code <= 0x26AF ) || // E0.0   [4] (⚬..⚯)    MEDIUM SMALL WHITE CIRCLE..UNMARRIED PARTNERSHIP SYMBOL
		( 0x26B0 <= code && code <= 0x26B1 ) || // E1.0   [2] (⚰️..⚱️)    coffin..funeral urn
		( 0x26B2 <= code && code <= 0x26BC ) || // E0.0  [11] (⚲..⚼)    NEUTER..SESQUIQUADRATE
		( 0x26BD <= code && code <= 0x26BE ) || // E0.6   [2] (⚽..⚾)    soccer ball..baseball
		( 0x26BF <= code && code <= 0x26C3 ) || // E0.0   [5] (⚿..⛃)    SQUARED KEY..BLACK DRAUGHTS KING
		( 0x26C4 <= code && code <= 0x26C5 ) || // E0.6   [2] (⛄..⛅)    snowman without snow..sun behind cloud
		( 0x26C6 <= code && code <= 0x26C7 ) || // E0.0   [2] (⛆..⛇)    RAIN..BLACK SNOWMAN
		code === 0x26C8 || // E0.7   [1] (⛈️)       cloud with lightning and rain
		( 0x26C9 <= code && code <= 0x26CD ) || // E0.0   [5] (⛉..⛍)    TURNED WHITE SHOGI PIECE..DISABLED CAR
		code === 0x26CE || // E0.6   [1] (⛎)       Ophiuchus
		code === 0x26CF || // E0.7   [1] (⛏️)       pick
		code === 0x26D0 || // E0.0   [1] (⛐)       CAR SLIDING
		code === 0x26D1 || // E0.7   [1] (⛑️)       rescue worker’s helmet
		code === 0x26D2 || // E0.0   [1] (⛒)       CIRCLED CROSSING LANES
		code === 0x26D3 || // E0.7   [1] (⛓️)       chains
		code === 0x26D4 || // E0.6   [1] (⛔)       no entry
		( 0x26D5 <= code && code <= 0x26E8 ) || // E0.0  [20] (⛕..⛨)    ALTERNATE ONE-WAY LEFT WAY TRAFFIC..BLACK CROSS ON SHIELD
		code === 0x26E9 || // E0.7   [1] (⛩️)       shinto shrine
		code === 0x26EA || // E0.6   [1] (⛪)       church
		( 0x26EB <= code && code <= 0x26EF ) || // E0.0   [5] (⛫..⛯)    CASTLE..MAP SYMBOL FOR LIGHTHOUSE
		( 0x26F0 <= code && code <= 0x26F1 ) || // E0.7   [2] (⛰️..⛱️)    mountain..umbrella on ground
		( 0x26F2 <= code && code <= 0x26F3 ) || // E0.6   [2] (⛲..⛳)    fountain..flag in hole
		code === 0x26F4 || // E0.7   [1] (⛴️)       ferry
		code === 0x26F5 || // E0.6   [1] (⛵)       sailboat
		code === 0x26F6 || // E0.0   [1] (⛶)       SQUARE FOUR CORNERS
		( 0x26F7 <= code && code <= 0x26F9 ) || // E0.7   [3] (⛷️..⛹️)    skier..person bouncing ball
		code === 0x26FA || // E0.6   [1] (⛺)       tent
		( 0x26FB <= code && code <= 0x26FC ) || // E0.0   [2] (⛻..⛼)    JAPANESE BANK SYMBOL..HEADSTONE GRAVEYARD SYMBOL
		code === 0x26FD || // E0.6   [1] (⛽)       fuel pump
		( 0x26FE <= code && code <= 0x2701 ) || // E0.0   [4] (⛾..✁)    CUP ON BLACK SQUARE..UPPER BLADE SCISSORS
		code === 0x2702 || // E0.6   [1] (✂️)       scissors
		( 0x2703 <= code && code <= 0x2704 ) || // E0.0   [2] (✃..✄)    LOWER BLADE SCISSORS..WHITE SCISSORS
		code === 0x2705 || // E0.6   [1] (✅)       check mark button
		( 0x2708 <= code && code <= 0x270C ) || // E0.6   [5] (✈️..✌️)    airplane..victory hand
		code === 0x270D || // E0.7   [1] (✍️)       writing hand
		code === 0x270E || // E0.0   [1] (✎)       LOWER RIGHT PENCIL
		code === 0x270F || // E0.6   [1] (✏️)       pencil
		( 0x2710 <= code && code <= 0x2711 ) || // E0.0   [2] (✐..✑)    UPPER RIGHT PENCIL..WHITE NIB
		code === 0x2712 || // E0.6   [1] (✒️)       black nib
		code === 0x2714 || // E0.6   [1] (✔️)       check mark
		code === 0x2716 || // E0.6   [1] (✖️)       multiply
		code === 0x271D || // E0.7   [1] (✝️)       latin cross
		code === 0x2721 || // E0.7   [1] (✡️)       star of David
		code === 0x2728 || // E0.6   [1] (✨)       sparkles
		( 0x2733 <= code && code <= 0x2734 ) || // E0.6   [2] (✳️..✴️)    eight-spoked asterisk..eight-pointed star
		code === 0x2744 || // E0.6   [1] (❄️)       snowflake
		code === 0x2747 || // E0.6   [1] (❇️)       sparkle
		code === 0x274C || // E0.6   [1] (❌)       cross mark
		code === 0x274E || // E0.6   [1] (❎)       cross mark button
		( 0x2753 <= code && code <= 0x2755 ) || // E0.6   [3] (❓..❕)    question mark..white exclamation mark
		code === 0x2757 || // E0.6   [1] (❗)       exclamation mark
		code === 0x2763 || // E1.0   [1] (❣️)       heart exclamation
		code === 0x2764 || // E0.6   [1] (❤️)       red heart
		( 0x2765 <= code && code <= 0x2767 ) || // E0.0   [3] (❥..❧)    ROTATED HEAVY BLACK HEART BULLET..ROTATED FLORAL HEART BULLET
		( 0x2795 <= code && code <= 0x2797 ) || // E0.6   [3] (➕..➗)    plus..divide
		code === 0x27A1 || // E0.6   [1] (➡️)       right arrow
		code === 0x27B0 || // E0.6   [1] (➰)       curly loop
		code === 0x27BF || // E1.0   [1] (➿)       double curly loop
		( 0x2934 <= code && code <= 0x2935 ) || // E0.6   [2] (⤴️..⤵️)    right arrow curving up..right arrow curving down
		( 0x2B05 <= code && code <= 0x2B07 ) || // E0.6   [3] (⬅️..⬇️)    left arrow..down arrow
		( 0x2B1B <= code && code <= 0x2B1C ) || // E0.6   [2] (⬛..⬜)    black large square..white large square
		code === 0x2B50 || // E0.6   [1] (⭐)       star
		code === 0x2B55 || // E0.6   [1] (⭕)       hollow red circle
		code === 0x3030 || // E0.6   [1] (〰️)       wavy dash
		code === 0x303D || // E0.6   [1] (〽️)       part alternation mark
		code === 0x3297 || // E0.6   [1] (㊗️)       Japanese “congratulations” button
		code === 0x3299 || // E0.6   [1] (㊙️)       Japanese “secret” button
		( 0x1F000 <= code && code <= 0x1F003 ) || // E0.0   [4] (🀀..🀃)    MAHJONG TILE EAST WIND..MAHJONG TILE NORTH WIND
		code === 0x1F004 || // E0.6   [1] (🀄)       mahjong red dragon
		( 0x1F005 <= code && code <= 0x1F0CE ) || // E0.0 [202] (🀅..🃎)    MAHJONG TILE GREEN DRAGON..PLAYING CARD KING OF DIAMONDS
		code === 0x1F0CF || // E0.6   [1] (🃏)       joker
		( 0x1F0D0 <= code && code <= 0x1F0FF ) || // E0.0  [48] (🃐..🃿)    <reserved-1F0D0>..<reserved-1F0FF>
		( 0x1F10D <= code && code <= 0x1F10F ) || // E0.0   [3] (🄍..🄏)    CIRCLED ZERO WITH SLASH..CIRCLED DOLLAR SIGN WITH OVERLAID BACKSLASH
		code === 0x1F12F || // E0.0   [1] (🄯)       COPYLEFT SYMBOL
		( 0x1F16C <= code && code <= 0x1F16F ) || // E0.0   [4] (🅬..🅯)    RAISED MR SIGN..CIRCLED HUMAN FIGURE
		( 0x1F170 <= code && code <= 0x1F171 ) || // E0.6   [2] (🅰️..🅱️)    A button (blood type)..B button (blood type)
		( 0x1F17E <= code && code <= 0x1F17F ) || // E0.6   [2] (🅾️..🅿️)    O button (blood type)..P button
		code === 0x1F18E || // E0.6   [1] (🆎)       AB button (blood type)
		( 0x1F191 <= code && code <= 0x1F19A ) || // E0.6  [10] (🆑..🆚)    CL button..VS button
		( 0x1F1AD <= code && code <= 0x1F1E5 ) || // E0.0  [57] (🆭..🇥)    MASK WORK SYMBOL..<reserved-1F1E5>
		( 0x1F201 <= code && code <= 0x1F202 ) || // E0.6   [2] (🈁..🈂️)    Japanese “here” button..Japanese “service charge” button
		( 0x1F203 <= code && code <= 0x1F20F ) || // E0.0  [13] (🈃..🈏)    <reserved-1F203>..<reserved-1F20F>
		code === 0x1F21A || // E0.6   [1] (🈚)       Japanese “free of charge” button
		code === 0x1F22F || // E0.6   [1] (🈯)       Japanese “reserved” button
		( 0x1F232 <= code && code <= 0x1F23A ) || // E0.6   [9] (🈲..🈺)    Japanese “prohibited” button..Japanese “open for business” button
		( 0x1F23C <= code && code <= 0x1F23F ) || // E0.0   [4] (🈼..🈿)    <reserved-1F23C>..<reserved-1F23F>
		( 0x1F249 <= code && code <= 0x1F24F ) || // E0.0   [7] (🉉..🉏)    <reserved-1F249>..<reserved-1F24F>
		( 0x1F250 <= code && code <= 0x1F251 ) || // E0.6   [2] (🉐..🉑)    Japanese “bargain” button..Japanese “acceptable” button
		( 0x1F252 <= code && code <= 0x1F2FF ) || // E0.0 [174] (🉒..🋿)    <reserved-1F252>..<reserved-1F2FF>
		( 0x1F300 <= code && code <= 0x1F30C ) || // E0.6  [13] (🌀..🌌)    cyclone..milky way
		( 0x1F30D <= code && code <= 0x1F30E ) || // E0.7   [2] (🌍..🌎)    globe showing Europe-Africa..globe showing Americas
		code === 0x1F30F || // E0.6   [1] (🌏)       globe showing Asia-Australia
		code === 0x1F310 || // E1.0   [1] (🌐)       globe with meridians
		code === 0x1F311 || // E0.6   [1] (🌑)       new moon
		code === 0x1F312 || // E1.0   [1] (🌒)       waxing crescent moon
		( 0x1F313 <= code && code <= 0x1F315 ) || // E0.6   [3] (🌓..🌕)    first quarter moon..full moon
		( 0x1F316 <= code && code <= 0x1F318 ) || // E1.0   [3] (🌖..🌘)    waning gibbous moon..waning crescent moon
		code === 0x1F319 || // E0.6   [1] (🌙)       crescent moon
		code === 0x1F31A || // E1.0   [1] (🌚)       new moon face
		code === 0x1F31B || // E0.6   [1] (🌛)       first quarter moon face
		code === 0x1F31C || // E0.7   [1] (🌜)       last quarter moon face
		( 0x1F31D <= code && code <= 0x1F31E ) || // E1.0   [2] (🌝..🌞)    full moon face..sun with face
		( 0x1F31F <= code && code <= 0x1F320 ) || // E0.6   [2] (🌟..🌠)    glowing star..shooting star
		code === 0x1F321 || // E0.7   [1] (🌡️)       thermometer
		( 0x1F322 <= code && code <= 0x1F323 ) || // E0.0   [2] (🌢..🌣)    BLACK DROPLET..WHITE SUN
		( 0x1F324 <= code && code <= 0x1F32C ) || // E0.7   [9] (🌤️..🌬️)    sun behind small cloud..wind face
		( 0x1F32D <= code && code <= 0x1F32F ) || // E1.0   [3] (🌭..🌯)    hot dog..burrito
		( 0x1F330 <= code && code <= 0x1F331 ) || // E0.6   [2] (🌰..🌱)    chestnut..seedling
		( 0x1F332 <= code && code <= 0x1F333 ) || // E1.0   [2] (🌲..🌳)    evergreen tree..deciduous tree
		( 0x1F334 <= code && code <= 0x1F335 ) || // E0.6   [2] (🌴..🌵)    palm tree..cactus
		code === 0x1F336 || // E0.7   [1] (🌶️)       hot pepper
		( 0x1F337 <= code && code <= 0x1F34A ) || // E0.6  [20] (🌷..🍊)    tulip..tangerine
		code === 0x1F34B || // E1.0   [1] (🍋)       lemon
		( 0x1F34C <= code && code <= 0x1F34F ) || // E0.6   [4] (🍌..🍏)    banana..green apple
		code === 0x1F350 || // E1.0   [1] (🍐)       pear
		( 0x1F351 <= code && code <= 0x1F37B ) || // E0.6  [43] (🍑..🍻)    peach..clinking beer mugs
		code === 0x1F37C || // E1.0   [1] (🍼)       baby bottle
		code === 0x1F37D || // E0.7   [1] (🍽️)       fork and knife with plate
		( 0x1F37E <= code && code <= 0x1F37F ) || // E1.0   [2] (🍾..🍿)    bottle with popping cork..popcorn
		( 0x1F380 <= code && code <= 0x1F393 ) || // E0.6  [20] (🎀..🎓)    ribbon..graduation cap
		( 0x1F394 <= code && code <= 0x1F395 ) || // E0.0   [2] (🎔..🎕)    HEART WITH TIP ON THE LEFT..BOUQUET OF FLOWERS
		( 0x1F396 <= code && code <= 0x1F397 ) || // E0.7   [2] (🎖️..🎗️)    military medal..reminder ribbon
		code === 0x1F398 || // E0.0   [1] (🎘)       MUSICAL KEYBOARD WITH JACKS
		( 0x1F399 <= code && code <= 0x1F39B ) || // E0.7   [3] (🎙️..🎛️)    studio microphone..control knobs
		( 0x1F39C <= code && code <= 0x1F39D ) || // E0.0   [2] (🎜..🎝)    BEAMED ASCENDING MUSICAL NOTES..BEAMED DESCENDING MUSICAL NOTES
		( 0x1F39E <= code && code <= 0x1F39F ) || // E0.7   [2] (🎞️..🎟️)    film frames..admission tickets
		( 0x1F3A0 <= code && code <= 0x1F3C4 ) || // E0.6  [37] (🎠..🏄)    carousel horse..person surfing
		code === 0x1F3C5 || // E1.0   [1] (🏅)       sports medal
		code === 0x1F3C6 || // E0.6   [1] (🏆)       trophy
		code === 0x1F3C7 || // E1.0   [1] (🏇)       horse racing
		code === 0x1F3C8 || // E0.6   [1] (🏈)       american football
		code === 0x1F3C9 || // E1.0   [1] (🏉)       rugby football
		code === 0x1F3CA || // E0.6   [1] (🏊)       person swimming
		( 0x1F3CB <= code && code <= 0x1F3CE ) || // E0.7   [4] (🏋️..🏎️)    person lifting weights..racing car
		( 0x1F3CF <= code && code <= 0x1F3D3 ) || // E1.0   [5] (🏏..🏓)    cricket game..ping pong
		( 0x1F3D4 <= code && code <= 0x1F3DF ) || // E0.7  [12] (🏔️..🏟️)    snow-capped mountain..stadium
		( 0x1F3E0 <= code && code <= 0x1F3E3 ) || // E0.6   [4] (🏠..🏣)    house..Japanese post office
		code === 0x1F3E4 || // E1.0   [1] (🏤)       post office
		( 0x1F3E5 <= code && code <= 0x1F3F0 ) || // E0.6  [12] (🏥..🏰)    hospital..castle
		( 0x1F3F1 <= code && code <= 0x1F3F2 ) || // E0.0   [2] (🏱..🏲)    WHITE PENNANT..BLACK PENNANT
		code === 0x1F3F3 || // E0.7   [1] (🏳️)       white flag
		code === 0x1F3F4 || // E1.0   [1] (🏴)       black flag
		code === 0x1F3F5 || // E0.7   [1] (🏵️)       rosette
		code === 0x1F3F6 || // E0.0   [1] (🏶)       BLACK ROSETTE
		code === 0x1F3F7 || // E0.7   [1] (🏷️)       label
		( 0x1F3F8 <= code && code <= 0x1F3FA ) || // E1.0   [3] (🏸..🏺)    badminton..amphora
		( 0x1F400 <= code && code <= 0x1F407 ) || // E1.0   [8] (🐀..🐇)    rat..rabbit
		code === 0x1F408 || // E0.7   [1] (🐈)       cat
		( 0x1F409 <= code && code <= 0x1F40B ) || // E1.0   [3] (🐉..🐋)    dragon..whale
		( 0x1F40C <= code && code <= 0x1F40E ) || // E0.6   [3] (🐌..🐎)    snail..horse
		( 0x1F40F <= code && code <= 0x1F410 ) || // E1.0   [2] (🐏..🐐)    ram..goat
		( 0x1F411 <= code && code <= 0x1F412 ) || // E0.6   [2] (🐑..🐒)    ewe..monkey
		code === 0x1F413 || // E1.0   [1] (🐓)       rooster
		code === 0x1F414 || // E0.6   [1] (🐔)       chicken
		code === 0x1F415 || // E0.7   [1] (🐕)       dog
		code === 0x1F416 || // E1.0   [1] (🐖)       pig
		( 0x1F417 <= code && code <= 0x1F429 ) || // E0.6  [19] (🐗..🐩)    boar..poodle
		code === 0x1F42A || // E1.0   [1] (🐪)       camel
		( 0x1F42B <= code && code <= 0x1F43E ) || // E0.6  [20] (🐫..🐾)    two-hump camel..paw prints
		code === 0x1F43F || // E0.7   [1] (🐿️)       chipmunk
		code === 0x1F440 || // E0.6   [1] (👀)       eyes
		code === 0x1F441 || // E0.7   [1] (👁️)       eye
		( 0x1F442 <= code && code <= 0x1F464 ) || // E0.6  [35] (👂..👤)    ear..bust in silhouette
		code === 0x1F465 || // E1.0   [1] (👥)       busts in silhouette
		( 0x1F466 <= code && code <= 0x1F46B ) || // E0.6   [6] (👦..👫)    boy..woman and man holding hands
		( 0x1F46C <= code && code <= 0x1F46D ) || // E1.0   [2] (👬..👭)    men holding hands..women holding hands
		( 0x1F46E <= code && code <= 0x1F4AC ) || // E0.6  [63] (👮..💬)    police officer..speech balloon
		code === 0x1F4AD || // E1.0   [1] (💭)       thought balloon
		( 0x1F4AE <= code && code <= 0x1F4B5 ) || // E0.6   [8] (💮..💵)    white flower..dollar banknote
		( 0x1F4B6 <= code && code <= 0x1F4B7 ) || // E1.0   [2] (💶..💷)    euro banknote..pound banknote
		( 0x1F4B8 <= code && code <= 0x1F4EB ) || // E0.6  [52] (💸..📫)    money with wings..closed mailbox with raised flag
		( 0x1F4EC <= code && code <= 0x1F4ED ) || // E0.7   [2] (📬..📭)    open mailbox with raised flag..open mailbox with lowered flag
		code === 0x1F4EE || // E0.6   [1] (📮)       postbox
		code === 0x1F4EF || // E1.0   [1] (📯)       postal horn
		( 0x1F4F0 <= code && code <= 0x1F4F4 ) || // E0.6   [5] (📰..📴)    newspaper..mobile phone off
		code === 0x1F4F5 || // E1.0   [1] (📵)       no mobile phones
		( 0x1F4F6 <= code && code <= 0x1F4F7 ) || // E0.6   [2] (📶..📷)    antenna bars..camera
		code === 0x1F4F8 || // E1.0   [1] (📸)       camera with flash
		( 0x1F4F9 <= code && code <= 0x1F4FC ) || // E0.6   [4] (📹..📼)    video camera..videocassette
		code === 0x1F4FD || // E0.7   [1] (📽️)       film projector
		code === 0x1F4FE || // E0.0   [1] (📾)       PORTABLE STEREO
		( 0x1F4FF <= code && code <= 0x1F502 ) || // E1.0   [4] (📿..🔂)    prayer beads..repeat single button
		code === 0x1F503 || // E0.6   [1] (🔃)       clockwise vertical arrows
		( 0x1F504 <= code && code <= 0x1F507 ) || // E1.0   [4] (🔄..🔇)    counterclockwise arrows button..muted speaker
		code === 0x1F508 || // E0.7   [1] (🔈)       speaker low volume
		code === 0x1F509 || // E1.0   [1] (🔉)       speaker medium volume
		( 0x1F50A <= code && code <= 0x1F514 ) || // E0.6  [11] (🔊..🔔)    speaker high volume..bell
		code === 0x1F515 || // E1.0   [1] (🔕)       bell with slash
		( 0x1F516 <= code && code <= 0x1F52B ) || // E0.6  [22] (🔖..🔫)    bookmark..pistol
		( 0x1F52C <= code && code <= 0x1F52D ) || // E1.0   [2] (🔬..🔭)    microscope..telescope
		( 0x1F52E <= code && code <= 0x1F53D ) || // E0.6  [16] (🔮..🔽)    crystal ball..downwards button
		( 0x1F546 <= code && code <= 0x1F548 ) || // E0.0   [3] (🕆..🕈)    WHITE LATIN CROSS..CELTIC CROSS
		( 0x1F549 <= code && code <= 0x1F54A ) || // E0.7   [2] (🕉️..🕊️)    om..dove
		( 0x1F54B <= code && code <= 0x1F54E ) || // E1.0   [4] (🕋..🕎)    kaaba..menorah
		code === 0x1F54F || // E0.0   [1] (🕏)       BOWL OF HYGIEIA
		( 0x1F550 <= code && code <= 0x1F55B ) || // E0.6  [12] (🕐..🕛)    one o’clock..twelve o’clock
		( 0x1F55C <= code && code <= 0x1F567 ) || // E0.7  [12] (🕜..🕧)    one-thirty..twelve-thirty
		( 0x1F568 <= code && code <= 0x1F56E ) || // E0.0   [7] (🕨..🕮)    RIGHT SPEAKER..BOOK
		( 0x1F56F <= code && code <= 0x1F570 ) || // E0.7   [2] (🕯️..🕰️)    candle..mantelpiece clock
		( 0x1F571 <= code && code <= 0x1F572 ) || // E0.0   [2] (🕱..🕲)    BLACK SKULL AND CROSSBONES..NO PIRACY
		( 0x1F573 <= code && code <= 0x1F579 ) || // E0.7   [7] (🕳️..🕹️)    hole..joystick
		code === 0x1F57A || // E3.0   [1] (🕺)       man dancing
		( 0x1F57B <= code && code <= 0x1F586 ) || // E0.0  [12] (🕻..🖆)    LEFT HAND TELEPHONE RECEIVER..PEN OVER STAMPED ENVELOPE
		code === 0x1F587 || // E0.7   [1] (🖇️)       linked paperclips
		( 0x1F588 <= code && code <= 0x1F589 ) || // E0.0   [2] (🖈..🖉)    BLACK PUSHPIN..LOWER LEFT PENCIL
		( 0x1F58A <= code && code <= 0x1F58D ) || // E0.7   [4] (🖊️..🖍️)    pen..crayon
		( 0x1F58E <= code && code <= 0x1F58F ) || // E0.0   [2] (🖎..🖏)    LEFT WRITING HAND..TURNED OK HAND SIGN
		code === 0x1F590 || // E0.7   [1] (🖐️)       hand with fingers splayed
		( 0x1F591 <= code && code <= 0x1F594 ) || // E0.0   [4] (🖑..🖔)    REVERSED RAISED HAND WITH FINGERS SPLAYED..REVERSED VICTORY HAND
		( 0x1F595 <= code && code <= 0x1F596 ) || // E1.0   [2] (🖕..🖖)    middle finger..vulcan salute
		( 0x1F597 <= code && code <= 0x1F5A3 ) || // E0.0  [13] (🖗..🖣)    WHITE DOWN POINTING LEFT HAND INDEX..BLACK DOWN POINTING BACKHAND INDEX
		code === 0x1F5A4 || // E3.0   [1] (🖤)       black heart
		code === 0x1F5A5 || // E0.7   [1] (🖥️)       desktop computer
		( 0x1F5A6 <= code && code <= 0x1F5A7 ) || // E0.0   [2] (🖦..🖧)    KEYBOARD AND MOUSE..THREE NETWORKED COMPUTERS
		code === 0x1F5A8 || // E0.7   [1] (🖨️)       printer
		( 0x1F5A9 <= code && code <= 0x1F5B0 ) || // E0.0   [8] (🖩..🖰)    POCKET CALCULATOR..TWO BUTTON MOUSE
		( 0x1F5B1 <= code && code <= 0x1F5B2 ) || // E0.7   [2] (🖱️..🖲️)    computer mouse..trackball
		( 0x1F5B3 <= code && code <= 0x1F5BB ) || // E0.0   [9] (🖳..🖻)    OLD PERSONAL COMPUTER..DOCUMENT WITH PICTURE
		code === 0x1F5BC || // E0.7   [1] (🖼️)       framed picture
		( 0x1F5BD <= code && code <= 0x1F5C1 ) || // E0.0   [5] (🖽..🗁)    FRAME WITH TILES..OPEN FOLDER
		( 0x1F5C2 <= code && code <= 0x1F5C4 ) || // E0.7   [3] (🗂️..🗄️)    card index dividers..file cabinet
		( 0x1F5C5 <= code && code <= 0x1F5D0 ) || // E0.0  [12] (🗅..🗐)    EMPTY NOTE..PAGES
		( 0x1F5D1 <= code && code <= 0x1F5D3 ) || // E0.7   [3] (🗑️..🗓️)    wastebasket..spiral calendar
		( 0x1F5D4 <= code && code <= 0x1F5DB ) || // E0.0   [8] (🗔..🗛)    DESKTOP WINDOW..DECREASE FONT SIZE SYMBOL
		( 0x1F5DC <= code && code <= 0x1F5DE ) || // E0.7   [3] (🗜️..🗞️)    clamp..rolled-up newspaper
		( 0x1F5DF <= code && code <= 0x1F5E0 ) || // E0.0   [2] (🗟..🗠)    PAGE WITH CIRCLED TEXT..STOCK CHART
		code === 0x1F5E1 || // E0.7   [1] (🗡️)       dagger
		code === 0x1F5E2 || // E0.0   [1] (🗢)       LIPS
		code === 0x1F5E3 || // E0.7   [1] (🗣️)       speaking head
		( 0x1F5E4 <= code && code <= 0x1F5E7 ) || // E0.0   [4] (🗤..🗧)    THREE RAYS ABOVE..THREE RAYS RIGHT
		code === 0x1F5E8 || // E2.0   [1] (🗨️)       left speech bubble
		( 0x1F5E9 <= code && code <= 0x1F5EE ) || // E0.0   [6] (🗩..🗮)    RIGHT SPEECH BUBBLE..LEFT ANGER BUBBLE
		code === 0x1F5EF || // E0.7   [1] (🗯️)       right anger bubble
		( 0x1F5F0 <= code && code <= 0x1F5F2 ) || // E0.0   [3] (🗰..🗲)    MOOD BUBBLE..LIGHTNING MOOD
		code === 0x1F5F3 || // E0.7   [1] (🗳️)       ballot box with ballot
		( 0x1F5F4 <= code && code <= 0x1F5F9 ) || // E0.0   [6] (🗴..🗹)    BALLOT SCRIPT X..BALLOT BOX WITH BOLD CHECK
		code === 0x1F5FA || // E0.7   [1] (🗺️)       world map
		( 0x1F5FB <= code && code <= 0x1F5FF ) || // E0.6   [5] (🗻..🗿)    mount fuji..moai
		code === 0x1F600 || // E1.0   [1] (😀)       grinning face
		( 0x1F601 <= code && code <= 0x1F606 ) || // E0.6   [6] (😁..😆)    beaming face with smiling eyes..grinning squinting face
		( 0x1F607 <= code && code <= 0x1F608 ) || // E1.0   [2] (😇..😈)    smiling face with halo..smiling face with horns
		( 0x1F609 <= code && code <= 0x1F60D ) || // E0.6   [5] (😉..😍)    winking face..smiling face with heart-eyes
		code === 0x1F60E || // E1.0   [1] (😎)       smiling face with sunglasses
		code === 0x1F60F || // E0.6   [1] (😏)       smirking face
		code === 0x1F610 || // E0.7   [1] (😐)       neutral face
		code === 0x1F611 || // E1.0   [1] (😑)       expressionless face
		( 0x1F612 <= code && code <= 0x1F614 ) || // E0.6   [3] (😒..😔)    unamused face..pensive face
		code === 0x1F615 || // E1.0   [1] (😕)       confused face
		code === 0x1F616 || // E0.6   [1] (😖)       confounded face
		code === 0x1F617 || // E1.0   [1] (😗)       kissing face
		code === 0x1F618 || // E0.6   [1] (😘)       face blowing a kiss
		code === 0x1F619 || // E1.0   [1] (😙)       kissing face with smiling eyes
		code === 0x1F61A || // E0.6   [1] (😚)       kissing face with closed eyes
		code === 0x1F61B || // E1.0   [1] (😛)       face with tongue
		( 0x1F61C <= code && code <= 0x1F61E ) || // E0.6   [3] (😜..😞)    winking face with tongue..disappointed face
		code === 0x1F61F || // E1.0   [1] (😟)       worried face
		( 0x1F620 <= code && code <= 0x1F625 ) || // E0.6   [6] (😠..😥)    angry face..sad but relieved face
		( 0x1F626 <= code && code <= 0x1F627 ) || // E1.0   [2] (😦..😧)    frowning face with open mouth..anguished face
		( 0x1F628 <= code && code <= 0x1F62B ) || // E0.6   [4] (😨..😫)    fearful face..tired face
		code === 0x1F62C || // E1.0   [1] (😬)       grimacing face
		code === 0x1F62D || // E0.6   [1] (😭)       loudly crying face
		( 0x1F62E <= code && code <= 0x1F62F ) || // E1.0   [2] (😮..😯)    face with open mouth..hushed face
		( 0x1F630 <= code && code <= 0x1F633 ) || // E0.6   [4] (😰..😳)    anxious face with sweat..flushed face
		code === 0x1F634 || // E1.0   [1] (😴)       sleeping face
		code === 0x1F635 || // E0.6   [1] (😵)       dizzy face
		code === 0x1F636 || // E1.0   [1] (😶)       face without mouth
		( 0x1F637 <= code && code <= 0x1F640 ) || // E0.6  [10] (😷..🙀)    face with medical mask..weary cat
		( 0x1F641 <= code && code <= 0x1F644 ) || // E1.0   [4] (🙁..🙄)    slightly frowning face..face with rolling eyes
		( 0x1F645 <= code && code <= 0x1F64F ) || // E0.6  [11] (🙅..🙏)    person gesturing NO..folded hands
		code === 0x1F680 || // E0.6   [1] (🚀)       rocket
		( 0x1F681 <= code && code <= 0x1F682 ) || // E1.0   [2] (🚁..🚂)    helicopter..locomotive
		( 0x1F683 <= code && code <= 0x1F685 ) || // E0.6   [3] (🚃..🚅)    railway car..bullet train
		code === 0x1F686 || // E1.0   [1] (🚆)       train
		code === 0x1F687 || // E0.6   [1] (🚇)       metro
		code === 0x1F688 || // E1.0   [1] (🚈)       light rail
		code === 0x1F689 || // E0.6   [1] (🚉)       station
		( 0x1F68A <= code && code <= 0x1F68B ) || // E1.0   [2] (🚊..🚋)    tram..tram car
		code === 0x1F68C || // E0.6   [1] (🚌)       bus
		code === 0x1F68D || // E0.7   [1] (🚍)       oncoming bus
		code === 0x1F68E || // E1.0   [1] (🚎)       trolleybus
		code === 0x1F68F || // E0.6   [1] (🚏)       bus stop
		code === 0x1F690 || // E1.0   [1] (🚐)       minibus
		( 0x1F691 <= code && code <= 0x1F693 ) || // E0.6   [3] (🚑..🚓)    ambulance..police car
		code === 0x1F694 || // E0.7   [1] (🚔)       oncoming police car
		code === 0x1F695 || // E0.6   [1] (🚕)       taxi
		code === 0x1F696 || // E1.0   [1] (🚖)       oncoming taxi
		code === 0x1F697 || // E0.6   [1] (🚗)       automobile
		code === 0x1F698 || // E0.7   [1] (🚘)       oncoming automobile
		( 0x1F699 <= code && code <= 0x1F69A ) || // E0.6   [2] (🚙..🚚)    sport utility vehicle..delivery truck
		( 0x1F69B <= code && code <= 0x1F6A1 ) || // E1.0   [7] (🚛..🚡)    articulated lorry..aerial tramway
		code === 0x1F6A2 || // E0.6   [1] (🚢)       ship
		code === 0x1F6A3 || // E1.0   [1] (🚣)       person rowing boat
		( 0x1F6A4 <= code && code <= 0x1F6A5 ) || // E0.6   [2] (🚤..🚥)    speedboat..horizontal traffic light
		code === 0x1F6A6 || // E1.0   [1] (🚦)       vertical traffic light
		( 0x1F6A7 <= code && code <= 0x1F6AD ) || // E0.6   [7] (🚧..🚭)    construction..no smoking
		( 0x1F6AE <= code && code <= 0x1F6B1 ) || // E1.0   [4] (🚮..🚱)    litter in bin sign..non-potable water
		code === 0x1F6B2 || // E0.6   [1] (🚲)       bicycle
		( 0x1F6B3 <= code && code <= 0x1F6B5 ) || // E1.0   [3] (🚳..🚵)    no bicycles..person mountain biking
		code === 0x1F6B6 || // E0.6   [1] (🚶)       person walking
		( 0x1F6B7 <= code && code <= 0x1F6B8 ) || // E1.0   [2] (🚷..🚸)    no pedestrians..children crossing
		( 0x1F6B9 <= code && code <= 0x1F6BE ) || // E0.6   [6] (🚹..🚾)    men’s room..water closet
		code === 0x1F6BF || // E1.0   [1] (🚿)       shower
		code === 0x1F6C0 || // E0.6   [1] (🛀)       person taking bath
		( 0x1F6C1 <= code && code <= 0x1F6C5 ) || // E1.0   [5] (🛁..🛅)    bathtub..left luggage
		( 0x1F6C6 <= code && code <= 0x1F6CA ) || // E0.0   [5] (🛆..🛊)    TRIANGLE WITH ROUNDED CORNERS..GIRLS SYMBOL
		code === 0x1F6CB || // E0.7   [1] (🛋️)       couch and lamp
		code === 0x1F6CC || // E1.0   [1] (🛌)       person in bed
		( 0x1F6CD <= code && code <= 0x1F6CF ) || // E0.7   [3] (🛍️..🛏️)    shopping bags..bed
		code === 0x1F6D0 || // E1.0   [1] (🛐)       place of worship
		( 0x1F6D1 <= code && code <= 0x1F6D2 ) || // E3.0   [2] (🛑..🛒)    stop sign..shopping cart
		( 0x1F6D3 <= code && code <= 0x1F6D4 ) || // E0.0   [2] (🛓..🛔)    STUPA..PAGODA
		code === 0x1F6D5 || // E12.0  [1] (🛕)       hindu temple
		( 0x1F6D6 <= code && code <= 0x1F6D7 ) || // E13.0  [2] (🛖..🛗)    hut..elevator
		( 0x1F6D8 <= code && code <= 0x1F6DF ) || // E0.0   [8] (🛘..🛟)    <reserved-1F6D8>..<reserved-1F6DF>
		( 0x1F6E0 <= code && code <= 0x1F6E5 ) || // E0.7   [6] (🛠️..🛥️)    hammer and wrench..motor boat
		( 0x1F6E6 <= code && code <= 0x1F6E8 ) || // E0.0   [3] (🛦..🛨)    UP-POINTING MILITARY AIRPLANE..UP-POINTING SMALL AIRPLANE
		code === 0x1F6E9 || // E0.7   [1] (🛩️)       small airplane
		code === 0x1F6EA || // E0.0   [1] (🛪)       NORTHEAST-POINTING AIRPLANE
		( 0x1F6EB <= code && code <= 0x1F6EC ) || // E1.0   [2] (🛫..🛬)    airplane departure..airplane arrival
		( 0x1F6ED <= code && code <= 0x1F6EF ) || // E0.0   [3] (🛭..🛯)    <reserved-1F6ED>..<reserved-1F6EF>
		code === 0x1F6F0 || // E0.7   [1] (🛰️)       satellite
		( 0x1F6F1 <= code && code <= 0x1F6F2 ) || // E0.0   [2] (🛱..🛲)    ONCOMING FIRE ENGINE..DIESEL LOCOMOTIVE
		code === 0x1F6F3 || // E0.7   [1] (🛳️)       passenger ship
		( 0x1F6F4 <= code && code <= 0x1F6F6 ) || // E3.0   [3] (🛴..🛶)    kick scooter..canoe
		( 0x1F6F7 <= code && code <= 0x1F6F8 ) || // E5.0   [2] (🛷..🛸)    sled..flying saucer
		code === 0x1F6F9 || // E11.0  [1] (🛹)       skateboard
		code === 0x1F6FA || // E12.0  [1] (🛺)       auto rickshaw
		( 0x1F6FB <= code && code <= 0x1F6FC ) || // E13.0  [2] (🛻..🛼)    pickup truck..roller skate
		( 0x1F6FD <= code && code <= 0x1F6FF ) || // E0.0   [3] (🛽..🛿)    <reserved-1F6FD>..<reserved-1F6FF>
		( 0x1F774 <= code && code <= 0x1F77F ) || // E0.0  [12] (🝴..🝿)    <reserved-1F774>..<reserved-1F77F>
		( 0x1F7D5 <= code && code <= 0x1F7DF ) || // E0.0  [11] (🟕..🟟)    CIRCLED TRIANGLE..<reserved-1F7DF>
		( 0x1F7E0 <= code && code <= 0x1F7EB ) || // E12.0 [12] (🟠..🟫)    orange circle..brown square
		( 0x1F7EC <= code && code <= 0x1F7FF ) || // E0.0  [20] (🟬..🟿)    <reserved-1F7EC>..<reserved-1F7FF>
		( 0x1F80C <= code && code <= 0x1F80F ) || // E0.0   [4] (🠌..🠏)    <reserved-1F80C>..<reserved-1F80F>
		( 0x1F848 <= code && code <= 0x1F84F ) || // E0.0   [8] (🡈..🡏)    <reserved-1F848>..<reserved-1F84F>
		( 0x1F85A <= code && code <= 0x1F85F ) || // E0.0   [6] (🡚..🡟)    <reserved-1F85A>..<reserved-1F85F>
		( 0x1F888 <= code && code <= 0x1F88F ) || // E0.0   [8] (🢈..🢏)    <reserved-1F888>..<reserved-1F88F>
		( 0x1F8AE <= code && code <= 0x1F8FF ) || // E0.0  [82] (🢮..🣿)    <reserved-1F8AE>..<reserved-1F8FF>
		code === 0x1F90C || // E13.0  [1] (🤌)       pinched fingers
		( 0x1F90D <= code && code <= 0x1F90F ) || // E12.0  [3] (🤍..🤏)    white heart..pinching hand
		( 0x1F910 <= code && code <= 0x1F918 ) || // E1.0   [9] (🤐..🤘)    zipper-mouth face..sign of the horns
		( 0x1F919 <= code && code <= 0x1F91E ) || // E3.0   [6] (🤙..🤞)    call me hand..crossed fingers
		code === 0x1F91F || // E5.0   [1] (🤟)       love-you gesture
		( 0x1F920 <= code && code <= 0x1F927 ) || // E3.0   [8] (🤠..🤧)    cowboy hat face..sneezing face
		( 0x1F928 <= code && code <= 0x1F92F ) || // E5.0   [8] (🤨..🤯)    face with raised eyebrow..exploding head
		code === 0x1F930 || // E3.0   [1] (🤰)       pregnant woman
		( 0x1F931 <= code && code <= 0x1F932 ) || // E5.0   [2] (🤱..🤲)    breast-feeding..palms up together
		( 0x1F933 <= code && code <= 0x1F93A ) || // E3.0   [8] (🤳..🤺)    selfie..person fencing
		( 0x1F93C <= code && code <= 0x1F93E ) || // E3.0   [3] (🤼..🤾)    people wrestling..person playing handball
		code === 0x1F93F || // E12.0  [1] (🤿)       diving mask
		( 0x1F940 <= code && code <= 0x1F945 ) || // E3.0   [6] (🥀..🥅)    wilted flower..goal net
		( 0x1F947 <= code && code <= 0x1F94B ) || // E3.0   [5] (🥇..🥋)    1st place medal..martial arts uniform
		code === 0x1F94C || // E5.0   [1] (🥌)       curling stone
		( 0x1F94D <= code && code <= 0x1F94F ) || // E11.0  [3] (🥍..🥏)    lacrosse..flying disc
		( 0x1F950 <= code && code <= 0x1F95E ) || // E3.0  [15] (🥐..🥞)    croissant..pancakes
		( 0x1F95F <= code && code <= 0x1F96B ) || // E5.0  [13] (🥟..🥫)    dumpling..canned food
		( 0x1F96C <= code && code <= 0x1F970 ) || // E11.0  [5] (🥬..🥰)    leafy green..smiling face with hearts
		code === 0x1F971 || // E12.0  [1] (🥱)       yawning face
		code === 0x1F972 || // E13.0  [1] (🥲)       smiling face with tear
		( 0x1F973 <= code && code <= 0x1F976 ) || // E11.0  [4] (🥳..🥶)    partying face..cold face
		( 0x1F977 <= code && code <= 0x1F978 ) || // E13.0  [2] (🥷..🥸)    ninja..disguised face
		code === 0x1F979 || // E0.0   [1] (🥹)       <reserved-1F979>
		code === 0x1F97A || // E11.0  [1] (🥺)       pleading face
		code === 0x1F97B || // E12.0  [1] (🥻)       sari
		( 0x1F97C <= code && code <= 0x1F97F ) || // E11.0  [4] (🥼..🥿)    lab coat..flat shoe
		( 0x1F980 <= code && code <= 0x1F984 ) || // E1.0   [5] (🦀..🦄)    crab..unicorn
		( 0x1F985 <= code && code <= 0x1F991 ) || // E3.0  [13] (🦅..🦑)    eagle..squid
		( 0x1F992 <= code && code <= 0x1F997 ) || // E5.0   [6] (🦒..🦗)    giraffe..cricket
		( 0x1F998 <= code && code <= 0x1F9A2 ) || // E11.0 [11] (🦘..🦢)    kangaroo..swan
		( 0x1F9A3 <= code && code <= 0x1F9A4 ) || // E13.0  [2] (🦣..🦤)    mammoth..dodo
		( 0x1F9A5 <= code && code <= 0x1F9AA ) || // E12.0  [6] (🦥..🦪)    sloth..oyster
		( 0x1F9AB <= code && code <= 0x1F9AD ) || // E13.0  [3] (🦫..🦭)    beaver..seal
		( 0x1F9AE <= code && code <= 0x1F9AF ) || // E12.0  [2] (🦮..🦯)    guide dog..white cane
		( 0x1F9B0 <= code && code <= 0x1F9B9 ) || // E11.0 [10] (🦰..🦹)    red hair..supervillain
		( 0x1F9BA <= code && code <= 0x1F9BF ) || // E12.0  [6] (🦺..🦿)    safety vest..mechanical leg
		code === 0x1F9C0 || // E1.0   [1] (🧀)       cheese wedge
		( 0x1F9C1 <= code && code <= 0x1F9C2 ) || // E11.0  [2] (🧁..🧂)    cupcake..salt
		( 0x1F9C3 <= code && code <= 0x1F9CA ) || // E12.0  [8] (🧃..🧊)    beverage box..ice
		code === 0x1F9CB || // E13.0  [1] (🧋)       bubble tea
		code === 0x1F9CC || // E0.0   [1] (🧌)       <reserved-1F9CC>
		( 0x1F9CD <= code && code <= 0x1F9CF ) || // E12.0  [3] (🧍..🧏)    person standing..deaf person
		( 0x1F9D0 <= code && code <= 0x1F9E6 ) || // E5.0  [23] (🧐..🧦)    face with monocle..socks
		( 0x1F9E7 <= code && code <= 0x1F9FF ) || // E11.0 [25] (🧧..🧿)    red envelope..nazar amulet
		( 0x1FA00 <= code && code <= 0x1FA6F ) || // E0.0 [112] (🨀..🩯)    NEUTRAL CHESS KING..<reserved-1FA6F>
		( 0x1FA70 <= code && code <= 0x1FA73 ) || // E12.0  [4] (🩰..🩳)    ballet shoes..shorts
		code === 0x1FA74 || // E13.0  [1] (🩴)       thong sandal
		( 0x1FA75 <= code && code <= 0x1FA77 ) || // E0.0   [3] (🩵..🩷)    <reserved-1FA75>..<reserved-1FA77>
		( 0x1FA78 <= code && code <= 0x1FA7A ) || // E12.0  [3] (🩸..🩺)    drop of blood..stethoscope
		( 0x1FA7B <= code && code <= 0x1FA7F ) || // E0.0   [5] (🩻..🩿)    <reserved-1FA7B>..<reserved-1FA7F>
		( 0x1FA80 <= code && code <= 0x1FA82 ) || // E12.0  [3] (🪀..🪂)    yo-yo..parachute
		( 0x1FA83 <= code && code <= 0x1FA86 ) || // E13.0  [4] (🪃..🪆)    boomerang..nesting dolls
		( 0x1FA87 <= code && code <= 0x1FA8F ) || // E0.0   [9] (🪇..🪏)    <reserved-1FA87>..<reserved-1FA8F>
		( 0x1FA90 <= code && code <= 0x1FA95 ) || // E12.0  [6] (🪐..🪕)    ringed planet..banjo
		( 0x1FA96 <= code && code <= 0x1FAA8 ) || // E13.0 [19] (🪖..🪨)    military helmet..rock
		( 0x1FAA9 <= code && code <= 0x1FAAF ) || // E0.0   [7] (🪩..🪯)    <reserved-1FAA9>..<reserved-1FAAF>
		( 0x1FAB0 <= code && code <= 0x1FAB6 ) || // E13.0  [7] (🪰..🪶)    fly..feather
		( 0x1FAB7 <= code && code <= 0x1FABF ) || // E0.0   [9] (🪷..🪿)    <reserved-1FAB7>..<reserved-1FABF>
		( 0x1FAC0 <= code && code <= 0x1FAC2 ) || // E13.0  [3] (🫀..🫂)    anatomical heart..people hugging
		( 0x1FAC3 <= code && code <= 0x1FACF ) || // E0.0  [13] (🫃..🫏)    <reserved-1FAC3>..<reserved-1FACF>
		( 0x1FAD0 <= code && code <= 0x1FAD6 ) || // E13.0  [7] (🫐..🫖)    blueberries..teapot
		( 0x1FAD7 <= code && code <= 0x1FAFF ) || // E0.0  [41] (🫗..🫿)    <reserved-1FAD7>..<reserved-1FAFF>
		( 0x1FC00 <= code && code <= 0x1FFFD ) // E0.0[1022] (🰀..🿽)    <reserved-1FC00>..<reserved-1FFFD>
	) {
		return constants.ExtendedPictographic;
	}
	return constants.Other;
}


// EXPORTS //

module.exports = emojiProperty;

},{"./constants.js":200}],202:[function(require,module,exports){
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
* Grapheme cluster break tooling.
*
* @module @stdlib/string/tools/grapheme-cluster-break
*
* @example
* var grapheme = require( '@stdlib/string/tools/grapheme-cluster-break' );
*
* var out = grapheme.emojiProperty( 0x23EC );
* // returns 101
*
* out = grapheme.breakProperty( 0x008f );
* // returns 2
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var constants = require( './constants.js' );
var breakType = require( './break_type.js' );
var emojiProperty = require( './emoji_property.js' );
var breakProperty = require( './break_property.js' );


// MAIN //

var main = {};
setReadOnly( main, 'constants', constants );
setReadOnly( main, 'breakType', breakType );
setReadOnly( main, 'emojiProperty', emojiProperty );
setReadOnly( main, 'breakProperty', breakProperty );


// EXPORTS //

module.exports = main;

},{"./break_property.js":198,"./break_type.js":199,"./constants.js":200,"./emoji_property.js":201,"@stdlib/utils/define-nonenumerable-read-only-property":217}],203:[function(require,module,exports){
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
* Trim whitespace characters from the beginning and end of a string.
*
* @module @stdlib/string/trim
*
* @example
* var trim = require( '@stdlib/string/trim' );
*
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* out = trim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines'
*/

// MODULES //

var trim = require( './trim.js' );


// EXPORTS //

module.exports = trim;

},{"./trim.js":204}],204:[function(require,module,exports){
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
var replace = require( '@stdlib/string/replace' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /^[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*([\S\s]*?)[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*$/;


// MAIN //

/**
* Trim whitespace characters from beginning and end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* @example
* var out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* @example
* var out = trim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines'
*/
function trim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	return replace( str, RE, '$1' );
}


// EXPORTS //

module.exports = trim;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/replace":171}],205:[function(require,module,exports){
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
* Truncate a string in the middle to a specified length.
*
* @module @stdlib/string/truncate-middle
*
* @example
* var truncateMiddle = require( '@stdlib/string/truncate-middle' );
*
* var out = truncateMiddle( 'beep boop', 7 );
* // returns 'be...op'
*
* out = truncateMiddle( 'beep boop', 7, '|' );
* // returns 'bee|oop'
*/

// MODULES //

var truncateMiddle = require( './main.js' );


// EXPORTS //

module.exports = truncateMiddle;

},{"./main.js":206}],206:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var numGraphemeClusters = require( '@stdlib/string/num-grapheme-clusters' );
var nextGraphemeClusterBreak = require( '@stdlib/string/next-grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );
var round = require( '@stdlib/math/base/special/round' );
var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Truncates a string in the middle to a specified length.
*
* @param {string} str - input string
* @param {integer} len - output string length (including sequence)
* @param {string} [seq='...'] - custom replacement sequence
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @returns {string} truncated string
*
* @example
* var str = 'beep boop';
* var out = truncateMiddle( str, 5 );
* // returns 'b...p'
*
* @example
* var str = 'beep boop';
* var out = truncateMiddle( str, 5, '>>>' );
* // returns 'b>>>p'
*
* @example
* var str = 'beep boop';
* var out = truncateMiddle( str, 10 );
* // returns 'beep boop'
*
* @example
* var str = 'beep boop';
* var out = truncateMiddle( str, 0 );
* // returns ''
*
* @example
* var str = 'beep boop';
* var out = truncateMiddle( str, 2 );
* // returns '..'
*
* @example
* var str = '🐺 Wolf Brothers 🐺';
* var out = truncateMiddle( str, 7 );
* // returns '🐺 ... 🐺'
*/
function truncateMiddle( str, len, seq ) {
	var seqLength;
	var fromIndex;
	var strLength;
	var seqStart;
	var nVisual;
	var seqEnd;
	var idx2;
	var idx1;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', len ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isString( seq ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a string. Value: `%s`.', seq ) );
		}
	}
	seq = seq || '...';
	seqLength = numGraphemeClusters( seq );
	strLength = numGraphemeClusters( str );
	fromIndex = 0;
	if ( len > strLength ) {
		return str;
	}
	if ( len - seqLength < 0 ) {
		return seq.slice( 0, len );
	}
	seqStart = round( ( len - seqLength ) / 2 );
	seqEnd = strLength - floor( ( len - seqLength ) / 2 );
	nVisual = 0;
	while ( nVisual < seqStart ) {
		idx1 = nextGraphemeClusterBreak( str, fromIndex );
		fromIndex = idx1;
		nVisual += 1;
	}
	idx2 = idx1;
	while ( idx2 > 0 ) {
		idx2 = nextGraphemeClusterBreak( str, fromIndex );
		if ( idx2 >= seqEnd + fromIndex - nVisual ) {
			break;
		}
		fromIndex = idx2;
		nVisual += 1;
	}
	return str.substring( 0, idx1 ) + seq + str.substring( idx2 );
}


// EXPORTS //

module.exports = truncateMiddle;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/math/base/special/floor":86,"@stdlib/math/base/special/round":88,"@stdlib/string/format":130,"@stdlib/string/next-grapheme-cluster-break":146,"@stdlib/string/num-grapheme-clusters":148}],207:[function(require,module,exports){
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
* Truncate a string to a specified length.
*
* @module @stdlib/string/truncate
*
* @example
* var truncate = require( '@stdlib/string/truncate' );
*
* var out = truncate( 'beep boop', 7 );
* // returns 'beep...'
*
* out = truncate( 'beep boop', 7, '|' );
* // returns 'beep b|'
*/

// MODULES //

var truncate = require( './main.js' );


// EXPORTS //

module.exports = truncate;

},{"./main.js":208}],208:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var numGraphemeClusters = require( '@stdlib/string/num-grapheme-clusters' );
var nextGraphemeClusterBreak = require( '@stdlib/string/next-grapheme-cluster-break' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Truncates a string to a specified length.
*
* @param {string} str - input string
* @param {integer} len - output string length (including ending)
* @param {string} [ending='...'] - custom ending
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @returns {string} truncated string
*
* @example
* var str = 'beep boop';
* var out = truncate( str, 7 );
* // returns 'beep...'
*
* @example
* var str = 'beep boop';
* var out = truncate( str, 5, '>>>' );
* // returns 'be>>>'
*
* @example
* var str = 'beep boop';
* var out = truncate( str, 10 );
* // returns 'beep boop'
*
* @example
* var str = 'beep boop';
* var out = truncate( str, 0 );
* // returns ''
*
* @example
* var str = 'beep boop';
* var out = truncate( str, 2 );
* // returns '..'
*
* @example
* var str = '🐺 Wolf Brothers 🐺';
* var out = truncate( str, 6 );
* // returns '🐺 W...'
*/
function truncate( str, len, ending ) {
	var endingLength;
	var fromIndex;
	var nVisual;
	var idx;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', len ) );
	}
	if ( arguments.length > 2 ) {
		if ( !isString( ending ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be a string. Value: `%s`.', ending ) );
		}
	}
	ending = ending || '...';
	endingLength = numGraphemeClusters( ending );
	fromIndex = 0;
	if ( len > numGraphemeClusters( str ) ) {
		return str;
	}
	if ( len - endingLength < 0 ) {
		return ending.slice( 0, len );
	}
	nVisual = 0;
	while ( nVisual < len - endingLength ) {
		idx = nextGraphemeClusterBreak( str, fromIndex );
		fromIndex = idx;
		nVisual += 1;
	}
	return str.substring( 0, idx ) + ending;
}


// EXPORTS //

module.exports = truncate;

},{"@stdlib/assert/is-nonnegative-integer":42,"@stdlib/assert/is-string":63,"@stdlib/string/format":130,"@stdlib/string/next-grapheme-cluster-break":146,"@stdlib/string/num-grapheme-clusters":148}],209:[function(require,module,exports){
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
* Uncapitalize the first character of a string.
*
* @module @stdlib/string/uncapitalize
*
* @example
* var uncapitalize = require( '@stdlib/string/uncapitalize' );
*
* var out = uncapitalize( 'Last man standing' );
* // returns 'last man standing'
*
* out = uncapitalize( 'Hidden Treasures' );
* // returns 'hidden Treasures';
*/

// MODULES //

var uncapitalize = require( './uncapitalize.js' );


// EXPORTS //

module.exports = uncapitalize;

},{"./uncapitalize.js":210}],210:[function(require,module,exports){
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


// MAIN //

/**
* Uncapitalizes the first character of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} input string with first character converted to lowercase
*
* @example
* var out = uncapitalize( 'Last man standing' );
* // returns 'last man standing'
*
* @example
* var out = uncapitalize( 'Presidential election' );
* // returns 'presidential election'
*
* @example
* var out = uncapitalize( 'JavaScript' );
* // returns 'javaScript'
*
* @example
* var out = uncapitalize( 'Hidden Treasures' );
* // returns 'hidden Treasures'
*/
function uncapitalize( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( str === '' ) {
		return '';
	}
	return str.charAt( 0 ).toLowerCase() + str.slice( 1 );
}


// EXPORTS //

module.exports = uncapitalize;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],211:[function(require,module,exports){
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
* Convert a string to uppercase.
*
* @module @stdlib/string/uppercase
*
* @example
* var uppercase = require( '@stdlib/string/uppercase' );
*
* var str = uppercase( 'bEEp' );
* // returns 'BEEP'
*/

// MODULES //

var uppercase = require( './uppercase.js' );


// EXPORTS //

module.exports = uppercase;

},{"./uppercase.js":212}],212:[function(require,module,exports){
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


// MAIN //

/**
* Converts a string to uppercase.
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string
* @returns {string} uppercase string
*
* @example
* var str = uppercase( 'bEEp' );
* // returns 'BEEP'
*/
function uppercase( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	return str.toUpperCase();
}


// EXPORTS //

module.exports = uppercase;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],213:[function(require,module,exports){
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
* Convert a UTF-16 encoded string to an array of integers using UTF-8 encoding.
*
* @module @stdlib/string/utf16-to-utf8-array
*
* @example
* var utf16ToUTF8Array = require( '@stdlib/string/utf16-to-utf8-array' );
*
* var str = '☃';
* var out = utf16ToUTF8Array( str );
* // returns [ 226, 152, 131 ]
*/

// MODULES //

var utf16ToUTF8Array = require( './main.js' );


// EXPORTS //

module.exports = utf16ToUTF8Array;

},{"./main.js":214}],214:[function(require,module,exports){
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


// VARIABLES //

// 2^6-1 = 63 => 0x3f => 00111111
var Ox3F = 63|0;

// 2^7 = 128 => 0x80 => 10000000
var Ox80 = 128|0;

// 192 => 0xc0 => 11000000
var OxC0 = 192|0;

// 224 => 0xe0 => 11100000
var OxE0 = 224|0;

// 240 => 0xf0 => 11110000
var OxF0 = 240|0;

// 2^10-1 = 1023 => 0x3ff => 00000011 11111111
var Ox3FF = 1023|0;

// 2^11 = 2048 => 0x800 => 00001000 00000000
var Ox800 = 2048|0;

// 55296 => 11011000 00000000
var OxD800 = 55296|0;

// 57344 => 11100000 00000000
var OxE000 = 57344|0;

// 2^16 = 65536 => 00000000 00000001 00000000 00000000
var Ox10000 = 65536|0;


// MAIN //

/**
* Converts a UTF-16 encoded string to an array of integers using UTF-8 encoding.
*
* ## Method
*
* -   UTF-8 is defined to encode code points in one to four bytes, depending on the number of significant bits in the numerical value of the code point.
*
* -   UTF-16 encoding uses one 16-bit unit for non-surrogates (U+0000 to U+D7FF and U+E000 to U+FFFF).
*
* -   UTF-16 encoding uses two 16-bit units (surrogate pairs) for U+10000 to U+10FFFF and encodes U+10000-U+10FFFF by subtracting 0x10000 from the code point, expressing the result as a 20-bit binary, and splitting the 20 bits of 0x0-0xFFFFF as upper and lower 10-bits. The respective 10-bits are stored in two 16-bit words.
*
* -   Let `N` be the number of significant bits.
*
* -   If `N <= 7` (i.e., U+0000 to U+007F), a code point is encoded in a single byte.
*
*     ```text
*     0xxxxxxx
*     ```
*
*     where an `x` refers to a code point bit.
*
* -   If `N <= 11` (i.e., U+0080 to U+07FF; ASCII characters), a code point is encoded in two bytes (5+6 bits).
*
*     ```text
*     110xxxxx 10xxxxxx
*     ```
*
* -   If `N <= 16` (i.e., U+0800 to U+FFFF), a code point is encoded in three bytes (4+6+6 bits).
*
*     ```text
*     1110xxxx 10xxxxxx 10xxxxxx
*     ```
*
* -   If `N <= 21` (i.e., U+10000 to U+10FFFF), a code point is encoded in four bytes (3+6+6+6 bits).
*
*     ```text
*     11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
*     ```
*
*
* @param {string} str - string to convert
* @throws {TypeError} must provide a string
* @returns {Array} array of integers
* @see [UTF-8]{@link https://en.wikipedia.org/wiki/UTF-8}
* @see [Stack Overflow]{@link https://stackoverflow.com/questions/6240055/manually-converting-unicode-codepoints-into-utf-8-and-utf-16}
*
* @example
* var str = '☃';
* var out = utf16ToUTF8Array( str );
* // returns [ 226, 152, 131 ]
*/
function utf16ToUTF8Array( str ) {
	var code;
	var out;
	var len;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', str ) );
	}
	len = str.length;
	out = [];
	for ( i = 0; i < len; i++ ) {
		code = str.charCodeAt( i );

		// ASCII...
		if ( code < Ox80 ) {
			out.push( code );
		}
		// UTF-16 non-surrogate pair...
		else if ( code < Ox800 ) {
			out.push( OxC0 | (code>>6) );
			out.push( Ox80 | (code & Ox3F) );
		}
		else if ( code < OxD800 || code >= OxE000 ) {
			out.push( OxE0 | (code>>12) );
			out.push( Ox80 | ((code>>6) & Ox3F) );
			out.push( Ox80 | (code & Ox3F) );
		}
		// UTF-16 surrogate pair...
		else {
			i += 1;

			// eslint-disable-next-line max-len
			code = Ox10000 + (((code & Ox3FF)<<10) | (str.charCodeAt(i) & Ox3FF));

			out.push( OxF0 | (code>>18) );
			out.push( Ox80 | ((code>>12) & Ox3F) );
			out.push( Ox80 | ((code>>6) & Ox3F) );
			out.push( Ox80 | (code & Ox3F) );
		}
	}
	return out;
}


// EXPORTS //

module.exports = utf16ToUTF8Array;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],215:[function(require,module,exports){
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

},{"./main.js":216}],216:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":21,"@stdlib/regexp/function-name":97,"@stdlib/utils/native-class":258}],217:[function(require,module,exports){
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

},{"./main.js":218}],218:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":222}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{"./define_property.js":220}],222:[function(require,module,exports){
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

},{"./builtin.js":219,"./has_define_property_support.js":221,"./polyfill.js":223}],223:[function(require,module,exports){
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

},{"@stdlib/string/format":130}],224:[function(require,module,exports){
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
* Define a read-only property.
*
* @module @stdlib/utils/define-read-only-property
*
* @example
* var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
*
* var obj = {};
*
* setReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setReadOnly;

},{"./main.js":225}],225:[function(require,module,exports){
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
* Defines a read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': true,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setReadOnly;

},{"@stdlib/utils/define-property":222}],226:[function(require,module,exports){
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
* Escape a regular expression string or pattern.
*
* @module @stdlib/utils/escape-regexp-string
*
* @example
* var rescape = require( '@stdlib/utils/escape-regexp-string' );
*
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/

// MODULES //

var rescape = require( './main.js' );


// EXPORTS //

module.exports = rescape;

},{"./main.js":227}],227:[function(require,module,exports){
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


// VARIABLES //

var RE_CHARS = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Escapes a regular expression string.
*
* @param {string} str - regular expression string
* @throws {TypeError} first argument must be a string
* @returns {string} escaped string
*
* @example
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/
function rescape( str ) {
	var len;
	var s;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a regular expression string. Value: `%s`.', str ) );
	}
	// Check if the string starts with a forward slash...
	if ( str[ 0 ] === '/' ) {
		// Find the last forward slash...
		len = str.length;
		for ( i = len-1; i >= 0; i-- ) {
			if ( str[ i ] === '/' ) {
				break;
			}
		}
	}
	// If we searched the string to no avail or if the first letter is not `/`, assume that the string is not of the form `/[...]/[guimy]`:
	if ( i === void 0 || i <= 0 ) {
		return str.replace( RE_CHARS, '\\$&' );
	}
	// We need to de-construct the string...
	s = str.substring( 1, i );

	// Only escape the characters between the `/`:
	s = s.replace( RE_CHARS, '\\$&' );

	// Reassemble:
	str = str[ 0 ] + s + str.substring( i );

	return str;
}


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],228:[function(require,module,exports){
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
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":231,"./polyfill.js":232,"@stdlib/assert/is-function":31}],229:[function(require,module,exports){
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

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":228}],230:[function(require,module,exports){
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
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":229}],231:[function(require,module,exports){
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

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],232:[function(require,module,exports){
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
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":233,"@stdlib/utils/native-class":258}],233:[function(require,module,exports){
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
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
}


// EXPORTS //

module.exports = getProto;

},{}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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
},{}],236:[function(require,module,exports){
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

},{"./main.js":237}],237:[function(require,module,exports){
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

},{"./codegen.js":234,"./global.js":235,"./self.js":238,"./window.js":239,"@stdlib/assert/is-boolean":15,"@stdlib/string/format":130}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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
* Return the first index at which a given element can be found.
*
* @module @stdlib/utils/index-of
*
* @example
* var indexOf = require( '@stdlib/utils/index-of' );
*
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* arr = [ 4, 3, 2, 1 ];
* idx = indexOf( arr, 5 );
* // returns -1
*
* // Using a `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, 3 );
* // returns 5
*
* // `fromIndex` which exceeds `array` length:
* arr = [ 1, 2, 3, 4, 2, 5 ];
* idx = indexOf( arr, 2, 10 );
* // returns -1
*
* // Negative `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* // Negative `fromIndex` exceeding input `array` length:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, -10 );
* // returns 1
*
* // Array-like objects:
* var str = 'bebop';
* idx = indexOf( str, 'o' );
* // returns 3
*/

// MODULES //

var indexOf = require( './index_of.js' );


// EXPORTS //

module.exports = indexOf;

},{"./index_of.js":241}],241:[function(require,module,exports){
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

var isnan = require( '@stdlib/assert/is-nan' );
var isCollection = require( '@stdlib/assert/is-collection' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns the first index at which a given element can be found.
*
* @param {ArrayLike} arr - array-like object
* @param {*} searchElement - element to find
* @param {integer} [fromIndex] - starting index (if negative, the start index is determined relative to last element)
* @throws {TypeError} must provide an array-like object
* @throws {TypeError} third argument must be an integer
* @returns {integer} index or -1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 5 );
* // returns -1
*
* @example
* // Using a `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, 3 );
* // returns 5
*
* @example
* // `fromIndex` which exceeds `array` length:
* var arr = [ 1, 2, 3, 4, 2, 5 ];
* var idx = indexOf( arr, 2, 10 );
* // returns -1
*
* @example
* // Negative `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* var idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* @example
* // Negative `fromIndex` exceeding input `array` length:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, -10 );
* // returns 1
*
* @example
* // Array-like objects:
* var str = 'bebop';
* var idx = indexOf( str, 'o' );
* // returns 3
*/
function indexOf( arr, searchElement, fromIndex ) {
	var len;
	var i;
	if ( !isCollection( arr ) && !isString( arr ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be an array-like object. Value: `%s`.', arr ) );
	}
	len = arr.length;
	if ( len === 0 ) {
		return -1;
	}
	if ( arguments.length === 3 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( format( 'invalid argument. Third argument must be an integer. Value: `%s`.', fromIndex ) );
		}
		if ( fromIndex >= 0 ) {
			if ( fromIndex >= len ) {
				return -1;
			}
			i = fromIndex;
		} else {
			i = len + fromIndex;
			if ( i < 0 ) {
				i = 0;
			}
		}
	} else {
		i = 0;
	}
	// Check for `NaN`...
	if ( isnan( searchElement ) ) {
		for ( ; i < len; i++ ) {
			if ( isnan( arr[i] ) ) {
				return i;
			}
		}
	} else {
		for ( ; i < len; i++ ) {
			if ( arr[ i ] === searchElement ) {
				return i;
			}
		}
	}
	return -1;
}


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-collection":23,"@stdlib/assert/is-integer":33,"@stdlib/assert/is-nan":38,"@stdlib/assert/is-string":63,"@stdlib/string/format":130}],242:[function(require,module,exports){
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
* Returns an array of an object's own enumerable property names.
*
* ## Notes
*
* -   In contrast to the built-in `Object.keys()`, this function returns an empty array if provided `undefined` or `null`, rather than throwing an error.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function keys( value ) {
	return Object.keys( Object( value ) );
}


// EXPORTS //

module.exports = keys;

},{}],243:[function(require,module,exports){
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

var isArguments = require( '@stdlib/assert/is-arguments' );
var builtin = require( './builtin.js' );


// VARIABLES //

var slice = Array.prototype.slice;


// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function keys( value ) {
	if ( isArguments( value ) ) {
		return builtin( slice.call( value ) );
	}
	return builtin( value );
}


// EXPORTS //

module.exports = keys;

},{"./builtin.js":242,"@stdlib/assert/is-arguments":10}],244:[function(require,module,exports){
module.exports=[
	"console",
	"external",
	"frame",
	"frameElement",
	"frames",
	"innerHeight",
	"innerWidth",
	"outerHeight",
	"outerWidth",
	"pageXOffset",
	"pageYOffset",
	"parent",
	"scrollLeft",
	"scrollTop",
	"scrollX",
	"scrollY",
	"self",
	"webkitIndexedDB",
	"webkitStorageInfo",
	"window"
]

},{}],245:[function(require,module,exports){
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

var keys = require( './builtin.js' );


// FUNCTIONS //

/**
* Tests the built-in `Object.keys()` implementation when provided `arguments`.
*
* @private
* @returns {boolean} boolean indicating whether the built-in implementation returns the expected number of keys
*/
function test() {
	return ( keys( arguments ) || '' ).length !== 2;
}


// MAIN //

/**
* Tests whether the built-in `Object.keys()` implementation supports providing `arguments` as an input value.
*
* ## Notes
*
* -   Safari 5.0 does **not** support `arguments` as an input value.
*
* @private
* @returns {boolean} boolean indicating whether a built-in implementation supports `arguments`
*/
function check() {
	return test( 1, 2 );
}


// EXPORTS //

module.exports = check;

},{"./builtin.js":242}],246:[function(require,module,exports){
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
var indexOf = require( '@stdlib/utils/index-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isConstructorPrototype = require( './is_constructor_prototype.js' );
var EXCLUDED_KEYS = require( './excluded_keys.json' );
var win = require( './window.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Determines whether an environment throws when comparing to the prototype of a value's constructor (e.g., [IE9][1]).
*
* [1]: https://stackoverflow.com/questions/7688070/why-is-comparing-the-constructor-property-of-two-windows-unreliable
*
* @private
* @returns {boolean} boolean indicating whether an environment is buggy
*/
function check() {
	var k;
	if ( typeOf( win ) === 'undefined' ) {
		return false;
	}
	for ( k in win ) { // eslint-disable-line guard-for-in
		try {
			if (
				indexOf( EXCLUDED_KEYS, k ) === -1 &&
				hasOwnProp( win, k ) &&
				win[ k ] !== null &&
				typeOf( win[ k ] ) === 'object'
			) {
				isConstructorPrototype( win[ k ] );
			}
		} catch ( err ) { // eslint-disable-line no-unused-vars
			return true;
		}
	}
	return false;
}


// MAIN //

bool = check();


// EXPORTS //

module.exports = bool;

},{"./excluded_keys.json":244,"./is_constructor_prototype.js":252,"./window.js":257,"@stdlib/assert/has-own-property":1,"@stdlib/utils/index-of":240,"@stdlib/utils/type-of":269}],247:[function(require,module,exports){
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

var bool = ( typeof Object.keys !== 'undefined' );


// EXPORTS //

module.exports = bool;

},{}],248:[function(require,module,exports){
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

var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
var noop = require( '@stdlib/utils/noop' );


// MAIN //

// Note: certain environments treat an object's prototype as enumerable, which, as a matter of convention, it shouldn't be...
var bool = isEnumerableProperty( noop, 'prototype' );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-enumerable-property":28,"@stdlib/utils/noop":263}],249:[function(require,module,exports){
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

var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );


// VARIABLES //

var obj = {
	'toString': null
};


// MAIN //

// Note: certain environments don't allow enumeration of overwritten properties which are considered non-enumerable...
var bool = !isEnumerableProperty( obj, 'toString' );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-enumerable-property":28}],250:[function(require,module,exports){
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

var bool = ( typeof window !== 'undefined' );


// EXPORTS //

module.exports = bool;

},{}],251:[function(require,module,exports){
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
* Return an array of an object's own enumerable property names.
*
* @module @stdlib/utils/keys
*
* @example
* var keys = require( '@stdlib/utils/keys' );
*
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/

// MODULES //

var keys = require( './main.js' );


// EXPORTS //

module.exports = keys;

},{"./main.js":254}],252:[function(require,module,exports){
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
* Tests whether a value equals the prototype of its constructor.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value equals the prototype of its constructor
*/
function isConstructorPrototype( value ) {
	return ( value.constructor && value.constructor.prototype === value );
}


// EXPORTS //

module.exports = isConstructorPrototype;

},{}],253:[function(require,module,exports){
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

var hasAutomationEqualityBug = require( './has_automation_equality_bug.js' );
var isConstructorPrototype = require( './is_constructor_prototype.js' );
var HAS_WINDOW = require( './has_window.js' );


// MAIN //

/**
* Wraps the test for constructor prototype equality to accommodate buggy environments (e.g., environments which throw when testing equality).
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value equals the prototype of its constructor
*/
function wrapper( value ) {
	if ( HAS_WINDOW === false && !hasAutomationEqualityBug ) {
		return isConstructorPrototype( value );
	}
	try {
		return isConstructorPrototype( value );
	} catch ( error ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = wrapper;

},{"./has_automation_equality_bug.js":246,"./has_window.js":250,"./is_constructor_prototype.js":252}],254:[function(require,module,exports){
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

var hasArgumentsBug = require( './has_arguments_bug.js' );
var HAS_BUILTIN = require( './has_builtin.js' );
var builtin = require( './builtin.js' );
var wrapper = require( './builtin_wrapper.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* @name keys
* @type {Function}
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
var keys;
if ( HAS_BUILTIN ) {
	if ( hasArgumentsBug() ) {
		keys = wrapper;
	} else {
		keys = builtin;
	}
} else {
	keys = polyfill;
}


// EXPORTS //

module.exports = keys;

},{"./builtin.js":242,"./builtin_wrapper.js":243,"./has_arguments_bug.js":245,"./has_builtin.js":247,"./polyfill.js":256}],255:[function(require,module,exports){
module.exports=[
	"toString",
	"toLocaleString",
	"valueOf",
	"hasOwnProperty",
	"isPrototypeOf",
	"propertyIsEnumerable",
	"constructor"
]

},{}],256:[function(require,module,exports){
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
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArguments = require( '@stdlib/assert/is-arguments' );
var HAS_ENUM_PROTO_BUG = require( './has_enumerable_prototype_bug.js' );
var HAS_NON_ENUM_PROPS_BUG = require( './has_non_enumerable_properties_bug.js' );
var isConstructorPrototype = require( './is_constructor_prototype_wrapper.js' );
var NON_ENUMERABLE = require( './non_enumerable.json' );


// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function keys( value ) {
	var skipConstructor;
	var skipPrototype;
	var isFcn;
	var out;
	var k;
	var p;
	var i;

	out = [];
	if ( isArguments( value ) ) {
		// Account for environments which treat `arguments` differently...
		for ( i = 0; i < value.length; i++ ) {
			out.push( i.toString() );
		}
		// Note: yes, we are precluding the `arguments` array-like object from having other enumerable properties; however, this should (1) be very rare and (2) not be encouraged (e.g., doing something like `arguments.a = 'b'`; in certain engines directly manipulating the `arguments` value results in automatic de-optimization).
		return out;
	}
	if ( typeof value === 'string' ) {
		// Account for environments which do not treat string character indices as "own" properties...
		if ( value.length > 0 && !hasOwnProp( value, '0' ) ) {
			for ( i = 0; i < value.length; i++ ) {
				out.push( i.toString() );
			}
		}
	} else {
		isFcn = ( typeof value === 'function' );
		if ( isFcn === false && !isObjectLike( value ) ) {
			return out;
		}
		skipPrototype = ( HAS_ENUM_PROTO_BUG && isFcn );
	}
	for ( k in value ) {
		if ( !( skipPrototype && k === 'prototype' ) && hasOwnProp( value, k ) ) {
			out.push( String( k ) );
		}
	}
	if ( HAS_NON_ENUM_PROPS_BUG ) {
		skipConstructor = isConstructorPrototype( value );
		for ( i = 0; i < NON_ENUMERABLE.length; i++ ) {
			p = NON_ENUMERABLE[ i ];
			if ( !( skipConstructor && p === 'constructor' ) && hasOwnProp( value, p ) ) {
				out.push( String( p ) );
			}
		}
	}
	return out;
}


// EXPORTS //

module.exports = keys;

},{"./has_enumerable_prototype_bug.js":248,"./has_non_enumerable_properties_bug.js":249,"./is_constructor_prototype_wrapper.js":253,"./non_enumerable.json":255,"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-arguments":10,"@stdlib/assert/is-object-like":52}],257:[function(require,module,exports){
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

var w = ( typeof window === 'undefined' ) ? void 0 : window;


// EXPORTS //

module.exports = w;

},{}],258:[function(require,module,exports){
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

},{"./native_class.js":259,"./polyfill.js":260,"@stdlib/assert/has-tostringtag-support":5}],259:[function(require,module,exports){
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

},{"./tostring.js":261}],260:[function(require,module,exports){
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

},{"./tostring.js":261,"./tostringtag.js":262,"@stdlib/assert/has-own-property":1}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
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
* No operation.
*
* @module @stdlib/utils/noop
*
* @example
* var noop = require( '@stdlib/utils/noop' );
*
* noop();
* // ...does nothing.
*/

// MODULES //

var noop = require( './noop.js' );


// EXPORTS //

module.exports = noop;

},{"./noop.js":264}],264:[function(require,module,exports){
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
* No operation.
*
* @example
* noop();
* // ...does nothing.
*/
function noop() {
	// Empty function...
}


// EXPORTS //

module.exports = noop;

},{}],265:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":266,"./fixtures/re.js":267,"./fixtures/typedarray.js":268}],266:[function(require,module,exports){
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

},{"@stdlib/utils/global":236}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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

},{"./check.js":265,"./polyfill.js":270,"./typeof.js":271}],270:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":215}],271:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":215}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){

},{}],274:[function(require,module,exports){
arguments[4][273][0].apply(exports,arguments)
},{"dup":273}],275:[function(require,module,exports){
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
},{"base64-js":272,"buffer":275,"ieee754":363}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
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
},{"_process":369}],278:[function(require,module,exports){
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

},{"events":276,"inherits":364,"readable-stream/lib/_stream_duplex.js":280,"readable-stream/lib/_stream_passthrough.js":281,"readable-stream/lib/_stream_readable.js":282,"readable-stream/lib/_stream_transform.js":283,"readable-stream/lib/_stream_writable.js":284,"readable-stream/lib/internal/streams/end-of-stream.js":288,"readable-stream/lib/internal/streams/pipeline.js":290}],279:[function(require,module,exports){
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

},{}],280:[function(require,module,exports){
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
},{"./_stream_readable":282,"./_stream_writable":284,"_process":369,"inherits":364}],281:[function(require,module,exports){
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
},{"./_stream_transform":283,"inherits":364}],282:[function(require,module,exports){
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
},{"../errors":279,"./_stream_duplex":280,"./internal/streams/async_iterator":285,"./internal/streams/buffer_list":286,"./internal/streams/destroy":287,"./internal/streams/from":289,"./internal/streams/state":291,"./internal/streams/stream":292,"_process":369,"buffer":275,"events":276,"inherits":364,"string_decoder/":376,"util":273}],283:[function(require,module,exports){
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
},{"../errors":279,"./_stream_duplex":280,"inherits":364}],284:[function(require,module,exports){
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
},{"../errors":279,"./_stream_duplex":280,"./internal/streams/destroy":287,"./internal/streams/state":291,"./internal/streams/stream":292,"_process":369,"buffer":275,"inherits":364,"util-deprecate":385}],285:[function(require,module,exports){
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
},{"./end-of-stream":288,"_process":369}],286:[function(require,module,exports){
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
},{"buffer":275,"util":273}],287:[function(require,module,exports){
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
},{"_process":369}],288:[function(require,module,exports){
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
},{"../../../errors":279}],289:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],290:[function(require,module,exports){
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
},{"../../../errors":279,"./end-of-stream":288}],291:[function(require,module,exports){
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
},{"../../../errors":279}],292:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":276}],293:[function(require,module,exports){
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

},{"./":294,"get-intrinsic":358}],294:[function(require,module,exports){
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

},{"function-bind":357,"get-intrinsic":358}],295:[function(require,module,exports){
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

},{"./lib/is_arguments.js":296,"./lib/keys.js":297}],296:[function(require,module,exports){
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

},{}],297:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],298:[function(require,module,exports){
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

},{"has-property-descriptors":359,"object-keys":367}],299:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],300:[function(require,module,exports){
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

},{"./ToNumber":330,"./ToPrimitive":332,"./Type":337}],301:[function(require,module,exports){
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

},{"../helpers/isFinite":346,"../helpers/isNaN":348,"../helpers/isPrefixOf":349,"./ToNumber":330,"./ToPrimitive":332,"./Type":337,"get-intrinsic":358}],302:[function(require,module,exports){
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

},{"get-intrinsic":358}],303:[function(require,module,exports){
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

},{"./DayWithinYear":306,"./InLeapYear":310,"./MonthFromTime":320,"get-intrinsic":358}],304:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":353,"./floor":341}],305:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":341}],306:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":304,"./DayFromYear":305,"./YearFromTime":339}],307:[function(require,module,exports){
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

},{"./modulo":342}],308:[function(require,module,exports){
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

},{"../helpers/assertRecord":345,"./IsAccessorDescriptor":311,"./IsDataDescriptor":313,"./Type":337,"get-intrinsic":358}],309:[function(require,module,exports){
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

},{"../helpers/timeConstants":353,"./floor":341,"./modulo":342}],310:[function(require,module,exports){
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

},{"./DaysInYear":307,"./YearFromTime":339,"get-intrinsic":358}],311:[function(require,module,exports){
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

},{"../helpers/assertRecord":345,"./Type":337,"has":362}],312:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":365}],313:[function(require,module,exports){
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

},{"../helpers/assertRecord":345,"./Type":337,"has":362}],314:[function(require,module,exports){
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

},{"../helpers/assertRecord":345,"./IsAccessorDescriptor":311,"./IsDataDescriptor":313,"./Type":337}],315:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":350,"./IsAccessorDescriptor":311,"./IsDataDescriptor":313,"./Type":337}],316:[function(require,module,exports){
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

},{"../helpers/isFinite":346,"../helpers/timeConstants":353}],317:[function(require,module,exports){
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

},{"../helpers/isFinite":346,"./DateFromTime":303,"./Day":304,"./MonthFromTime":320,"./ToInteger":329,"./YearFromTime":339,"./floor":341,"./modulo":342,"get-intrinsic":358}],318:[function(require,module,exports){
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

},{"../helpers/isFinite":346,"../helpers/timeConstants":353,"./ToInteger":329}],319:[function(require,module,exports){
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

},{"../helpers/timeConstants":353,"./floor":341,"./modulo":342}],320:[function(require,module,exports){
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

},{"./DayWithinYear":306,"./InLeapYear":310}],321:[function(require,module,exports){
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

},{"../helpers/isNaN":348}],322:[function(require,module,exports){
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

},{"../helpers/timeConstants":353,"./floor":341,"./modulo":342}],323:[function(require,module,exports){
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

},{"./Type":337}],324:[function(require,module,exports){
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


},{"../helpers/isFinite":346,"./ToNumber":330,"./abs":340,"get-intrinsic":358}],325:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":353,"./DayFromYear":305}],326:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":353,"./modulo":342}],327:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],328:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":330}],329:[function(require,module,exports){
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

},{"../helpers/isFinite":346,"../helpers/isNaN":348,"../helpers/sign":352,"./ToNumber":330,"./abs":340,"./floor":341}],330:[function(require,module,exports){
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

},{"./ToPrimitive":332}],331:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":302,"get-intrinsic":358}],332:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":354}],333:[function(require,module,exports){
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

},{"./IsCallable":312,"./ToBoolean":327,"./Type":337,"get-intrinsic":358,"has":362}],334:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":358}],335:[function(require,module,exports){
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

},{"../helpers/isFinite":346,"../helpers/isNaN":348,"../helpers/sign":352,"./ToNumber":330,"./abs":340,"./floor":341,"./modulo":342}],336:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":330}],337:[function(require,module,exports){
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

},{}],338:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":304,"./modulo":342}],339:[function(require,module,exports){
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

},{"call-bind/callBound":293,"get-intrinsic":358}],340:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":358}],341:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],342:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":351}],343:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":353,"./modulo":342}],344:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":300,"./5/AbstractRelationalComparison":301,"./5/CheckObjectCoercible":302,"./5/DateFromTime":303,"./5/Day":304,"./5/DayFromYear":305,"./5/DayWithinYear":306,"./5/DaysInYear":307,"./5/FromPropertyDescriptor":308,"./5/HourFromTime":309,"./5/InLeapYear":310,"./5/IsAccessorDescriptor":311,"./5/IsCallable":312,"./5/IsDataDescriptor":313,"./5/IsGenericDescriptor":314,"./5/IsPropertyDescriptor":315,"./5/MakeDate":316,"./5/MakeDay":317,"./5/MakeTime":318,"./5/MinFromTime":319,"./5/MonthFromTime":320,"./5/SameValue":321,"./5/SecFromTime":322,"./5/StrictEqualityComparison":323,"./5/TimeClip":324,"./5/TimeFromYear":325,"./5/TimeWithinDay":326,"./5/ToBoolean":327,"./5/ToInt32":328,"./5/ToInteger":329,"./5/ToNumber":330,"./5/ToObject":331,"./5/ToPrimitive":332,"./5/ToPropertyDescriptor":333,"./5/ToString":334,"./5/ToUint16":335,"./5/ToUint32":336,"./5/Type":337,"./5/WeekDay":338,"./5/YearFromTime":339,"./5/abs":340,"./5/floor":341,"./5/modulo":342,"./5/msFromTime":343}],345:[function(require,module,exports){
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

},{"./isMatchRecord":347,"get-intrinsic":358,"has":362}],346:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],347:[function(require,module,exports){
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

},{"has":362}],348:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],349:[function(require,module,exports){
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

},{"call-bind/callBound":293}],350:[function(require,module,exports){
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

},{"get-intrinsic":358,"has":362}],351:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],352:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],353:[function(require,module,exports){
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

},{}],354:[function(require,module,exports){
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

},{"./helpers/isPrimitive":355,"is-callable":365}],355:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],356:[function(require,module,exports){
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

},{}],357:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":356}],358:[function(require,module,exports){
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

},{"function-bind":357,"has":362,"has-symbols":360}],359:[function(require,module,exports){
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

},{"get-intrinsic":358}],360:[function(require,module,exports){
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

},{"./shams":361}],361:[function(require,module,exports){
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

},{}],362:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":357}],363:[function(require,module,exports){
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

},{}],364:[function(require,module,exports){
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

},{}],365:[function(require,module,exports){
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

},{}],366:[function(require,module,exports){
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

},{"./isArguments":368}],367:[function(require,module,exports){
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

},{"./implementation":366,"./isArguments":368}],368:[function(require,module,exports){
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

},{}],369:[function(require,module,exports){
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

},{}],370:[function(require,module,exports){
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
},{"_process":369,"through":383,"timers":384}],371:[function(require,module,exports){
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

},{"buffer":275}],372:[function(require,module,exports){
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

},{"es-abstract/es5":344,"function-bind":357}],373:[function(require,module,exports){
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

},{"./implementation":372,"./polyfill":374,"./shim":375,"define-properties":298,"function-bind":357}],374:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":372}],375:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":374,"define-properties":298}],376:[function(require,module,exports){
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
},{"safe-buffer":371}],377:[function(require,module,exports){
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
},{"./lib/default_stream":378,"./lib/results":380,"./lib/test":381,"_process":369,"defined":299,"through":383,"timers":384}],378:[function(require,module,exports){
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
},{"_process":369,"fs":274,"through":383}],379:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":369,"timers":384}],380:[function(require,module,exports){
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
},{"_process":369,"events":276,"function-bind":357,"has":362,"inherits":364,"object-inspect":382,"resumer":370,"through":383,"timers":384}],381:[function(require,module,exports){
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
},{"./next_tick":379,"deep-equal":295,"defined":299,"events":276,"has":362,"inherits":364,"path":277,"string.prototype.trim":373}],382:[function(require,module,exports){
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

},{}],383:[function(require,module,exports){
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
},{"_process":369,"stream":278}],384:[function(require,module,exports){
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
},{"process/browser.js":369,"timers":384}],385:[function(require,module,exports){
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
},{}]},{},[197]);
