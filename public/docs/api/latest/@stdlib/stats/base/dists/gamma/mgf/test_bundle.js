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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float64
*
* @example
* var ctor = require( '@stdlib/array/float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var builtin = require( './float64array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":14}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint16
*
* @example
* var ctor = require( '@stdlib/array/uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
var builtin = require( './uint16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/assert/has-uint16array-support":22}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

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

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint32
*
* @example
* var ctor = require( '@stdlib/array/uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
var builtin = require( './uint32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/assert/has-uint32array-support":25}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint8
*
* @example
* var ctor = require( '@stdlib/array/uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
var builtin = require( './uint8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/assert/has-uint8array-support":28}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test for native `Float64Array` support.
*
* @module @stdlib/assert/has-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./main.js":15}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFloat64Array = require( '@stdlib/assert/is-float64array' );
var GlobalFloat64Array = require( './float64array.js' );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./float64array.js":13,"@stdlib/assert/is-float64array":31}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":17}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":19}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":21}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":18}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test for native `Uint16Array` support.
*
* @module @stdlib/assert/has-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./main.js":23}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
var GlobalUint16Array = require( './uint16array.js' );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":52}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test for native `Uint32Array` support.
*
* @module @stdlib/assert/has-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

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

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
var GlobalUint32Array = require( './uint32array.js' );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":53}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test for native `Uint8Array` support.
*
* @module @stdlib/assert/has-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

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

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
var GlobalUint8Array = require( './uint8array.js' );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":54}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test if a value is a Float64Array.
*
* @module @stdlib/assert/is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert/is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat64Array;

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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasFloat64Array = ( typeof Float64Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return (
		( hasFloat64Array && value instanceof Float64Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float64Array]'
	);
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":142}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './main.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./main.js":35}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctors = require( './ctors.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @private
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	*
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// MAIN //

bool = isLittleEndian();


// EXPORTS //

module.exports = bool;

},{"./ctors.js":33}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert/is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert/is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = require( './main.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./main.js":37}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasUint16Array = ( typeof Uint16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return (
		( hasUint16Array && value instanceof Uint16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint16Array]'
	);
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":142}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert/is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert/is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = require( './main.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./main.js":39}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasUint32Array = ( typeof Uint32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return (
		( hasUint32Array && value instanceof Uint32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint32Array]'
	);
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":142}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert/is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert/is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = require( './main.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./main.js":41}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasUint8Array = ( typeof Uint8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return (
		( hasUint8Array && value instanceof Uint8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8Array]'
	);
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":142}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/float64/eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/float64/eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/float64/exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

},{}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Natural logarithm of `2`.
*
* @module @stdlib/constants/float64/ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/float64/ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ```tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

},{}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

},{}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

},{}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

},{}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/ctor":86}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/float64/smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/uint16/max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/uint16/max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;

},{}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/uint8/max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/uint8/max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
* // returns false
*/

// MODULES //

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":56}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
}


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":59}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a double-precision floating-point numeric value is infinite.
*
* @module @stdlib/math/base/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = require( './main.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./main.js":58}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./is_integer.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/math/base/special/floor":69}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":62}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a finite numeric value is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
* // returns false
*/

// MODULES //

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite numeric value is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
}


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":55}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":66}],66:[function(require,module,exports){
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

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ];


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/number/float64/base/from-words":90,"@stdlib/number/float64/base/get-high-word":94,"@stdlib/number/float64/base/to-words":105}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/float64/min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' );
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		exp === 0 ||
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords( WORDS, frac );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":67,"@stdlib/number/float64/base/exponent":88,"@stdlib/number/float64/base/from-words":90,"@stdlib/number/float64/base/normalize":96,"@stdlib/number/float64/base/to-words":105}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( 3.141592653589793, 5.0 );
* // returns ~306.0197
*
* v = pow( 3.141592653589793, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":79}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyvalL = require( './polyval_l.js' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000|0; // asm type annotation

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000|0; // asm type annotation

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = log2ax( [ 0.0, 0.0 ], 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( out, ax, ahx ) {
	var tmp;
	var ss; // `hs + ls`
	var s2; // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp; // `BP` constant
	var dp; // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0|0; // asm type annotation

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53|0; // asm type annotation
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += ((ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK)|0; // asm type annotation

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0)|0; // asm type annotation

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1|0; // asm type annotation
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = log2ax;

},{"./polyval_l.js":76,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":94,"@stdlib/number/float64/base/set-high-word":100,"@stdlib/number/float64/base/set-low-word":102}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = logx( [ 0.0, 0.0 ], 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( out, ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = logx;

},{"./polyval_w.js":78,"@stdlib/number/float64/base/set-low-word":102}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25)));
}


// EXPORTS //

module.exports = evalpoly;

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000|0; // asm type annotation

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000|0; // asm type annotation

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00|0; // asm type annotation

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00>>>0; // asm type annotation

var HIGH_NUM_NONSIGN_BITS = 31|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* 1.  Let \\(x = 2^n (1+f)\\).
*
* 2.  Compute \\(\operatorname{log2}(x)\\) as
*
*     ```tex
*     \operatorname{log2}(x) = w_1 + w_2
*     ```
*
*     where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3.  Compute
*
*     ```tex
*     y \cdot \operatorname{log2}(x) = n + y^\prime
*     ```
*
*     by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4.  Return
*
*     ```tex
*     x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
* ## Notes
*
* -   \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) **always** returns the correct integer, provided the value is representable.
* -   The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( 3.141592653589793, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( 3.141592653589793, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	toWords( WORDS, y );
	hy = WORDS[ 0 ];
	ly = WORDS[ 1 ];

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];
	lx = WORDS[ 1 ];

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// `pow( 1/x, -y )`
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// Signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK)|0; // asm type annotation
	ahy = (hy & ABS_MASK)|0; // asm type annotation

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// Signal overflow...
				return sx * HUGE * HUGE;
			}
			// Signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// Signal overflow...
				return sx * HUGE * HUGE;
			}
			// Signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( LOG_WORKSPACE, ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( LOG_WORKSPACE, ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	toWords( WORDS, z );
	j = uint32ToInt32( WORDS[0] );
	i = uint32ToInt32( WORDS[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// Signal overflow...
			return sx * HUGE * HUGE;
		}
		if ( (lp+OVT) > (z-hp) ) {
			// Signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":74,"./logx.js":75,"./pow2.js":80,"./x_is_zero.js":81,"./y_is_huge.js":82,"./y_is_infinite.js":83,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-integer":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/abs":65,"@stdlib/math/base/special/sqrt":84,"@stdlib/number/float64/base/set-low-word":102,"@stdlib/number/float64/base/to-words":105,"@stdlib/number/uint32/base/to-int32":109}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/constants/float64/ln-two' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns ~0.79
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK)|0; // asm type annotation
	k = ((i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = (j + (HIGH_MIN_NORMAL_EXP>>(k+1)))>>>0; // asm type annotation
		k = (((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)))>>>0; // asm type annotation
		t = setHighWord( 0.0, tmp );
		n = (((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >> (HIGH_NUM_SIGNIFICAND_BITS-k))>>>0; // eslint-disable-line max-len
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS)>>>0; // asm type annotation

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
}


// EXPORTS //

module.exports = pow2;

},{"./polyval_p.js":77,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":71,"@stdlib/number/float64/base/get-high-word":94,"@stdlib/number/float64/base/set-high-word":100,"@stdlib/number/float64/base/set-low-word":102,"@stdlib/number/uint32/base/to-int32":109}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns -Infinity
*
* @example
* var v = pow( 0.0, -9 );
* // returns Infinity
*
* @example
* var v = pow( -0.0, 9 );
* // returns 0.0
*
* @example
* var v = pow( 0.0, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 0.0, Infinity );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/copysign":67}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Infinity
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":94}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Infinity );
* // returns NaN
*
* @example
* var v = pow( -1.0, -Infinity  );
* // returns NaN
*
* @example
* var v = pow( 1.0, Infinity );
* // returns 1.0
*
* @example
* var v = pow( 1.0, -Infinity  );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Infinity );
* // returns 0.0
*
* @example
* var v = pow( 0.5, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 1.5, -Infinity  );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Infinity );
* // returns Infinity
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/special/abs":65}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the principal square root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var sqrt = require( './main.js' );


// EXPORTS //

module.exports = sqrt;

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

// MAIN //

/**
* Compute the principal square root of a double-precision floating-point number.
*
* @type {Function}
* @param {number} x - input value
* @returns {number} principal square root
*
* @example
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/
var sqrt = Math.sqrt; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = sqrt;

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

},{"./number.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent' );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns -1023
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = require( './main.js' );


// EXPORTS //

module.exports = exponent;

},{"./main.js":89}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* @example
* var exp = exponent( -3.14 );
* // returns 1
*
* @example
* var exp = exponent( 0.0 );
* // returns -1023
*
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":94}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":92}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":34}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
*
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
*
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":91,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":34}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./main.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":93,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Return a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = require( './main.js' );


// EXPORTS //

module.exports = normalize;

},{"./main.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fcn = require( './normalize.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( [ 0.0, 0 ], 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( [ 0.0, 0 ], 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( [ 0.0, 0 ], Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( [ 0.0, 0 ], NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/float64/smallest-normal":51,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65}],99:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":93}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './main.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":99,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var setLowWord = require( './main.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./main.js":104}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":34}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":103,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Split a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":107}],106:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":91}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":106,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/number/uint32/base/to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './main.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./main.js":110}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
}


// EXPORTS //

module.exports = uint32ToInt32;

},{}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a gamma distribution with shape `alpha` and rate `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} MGF
*
* @example
* var mgf = factory( 3.0, 1.5 );
*
* var y = mgf( 1.0 );
* // returns ~27.0
*
* y = mgf( 0.5 );
* // returns ~3.375
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) of a gamma distribution.
	*
	* @private
	* @param {number} t - input value
	* @returns {number} evaluated MGF
	*
	* @example
	* var y = mgf( 0.5 );
	* // returns <number>
	*/
	function mgf( t ) {
		var base;
		if ( t >= beta ) {
			return NaN;
		}
		base = 1.0 - (t / beta);
		return pow( base, -alpha );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/pow":73,"@stdlib/utils/constant-function":134}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the moment-generating function (MGF) of a gamma distribution.
*
* @module @stdlib/stats/base/dists/gamma/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/gamma/mgf' );
*
* var y = mgf( 0.5, 0.5, 1.0 );
* // returns ~1.414
*
* y = mgf( 0.1, 1.0, 1.0 );
* // returns ~1.111
*
* y = mgf( -1.0, 4.0, 2.0 );
* // returns ~0.198
*
* var mymgf = mgf.factory( 3.0, 1.5 );
*
* y = mymgf( 1.0 );
* // returns ~26.999
*
* y = mymgf( 0.5 );
* // returns ~3.375
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var mgf = require( './mgf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( mgf, 'factory', factory );


// EXPORTS //

module.exports = mgf;

},{"./factory.js":111,"./mgf.js":113,"@stdlib/utils/define-nonenumerable-read-only-property":135}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a gamma distribution.
*
* @param {number} t - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 0.5, 0.5, 1.0 );
* // returns ~1.414
*
* @example
* var y = mgf( 0.1, 1.0, 1.0 );
* // returns ~1.111
*
* @example
* var y = mgf( -1.0, 4.0, 2.0 );
* // returns ~0.198
*
* @example
* var y = mgf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = mgf( 2.0, 4.0, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 2.0, -0.5, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 2.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = mgf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function mgf( t, alpha, beta ) {
	var base;
	if (
		isnan( t ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0 ||
		t >= beta
	) {
		return NaN;
	}
	base = 1.0 - (t / beta);
	return pow( base, -alpha );
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/pow":73}],114:[function(require,module,exports){
module.exports={"expected":[334.74000505659905,3.620928432839068e13,3.70428011697318e19,1.8859721071771777e13,1.688520517734925e14,2.695963093957597e10,2.4966907703050013e-8,1.7160679043483454e8,8.091287636849522e24,775767.5686399649,7.059403685212158e-8,0.014774299956131378,1.11390653797221e6,3.5715895322915856e-8,9.180740213498224e6,21134.90849609938,0.004968605123413518,2.679804098927118e19,0.03535653413778832,862.9784474790708,2.039232510061491,3492.56043966417,14524.212236661024,5.00835409383038e7,5969.589611906018,5.906990009259416e25,9.77080305452918e12,938.2598833986619,284.0772042226189,1.0811113047909136e6,1891.5237983214863,0.0001416176729035732,2.9076558316378444e40,2100.9874146277593,7.030279840626159e8,11586.340672017192,13.005981700081712,1.2381863909437311e14,963.9924649122794,0.5011434070247857,2.429310385425441e7,0.042816353132396845,296.8297555221794,0.24351620714064717,209425.79519342413,140.94135798665715,5.079079304049828e12,2.1085263384068646e17,1422.360697856375,0.2965684133034286,1.4269057059364934e6,168976.39984997097,0.5325643664725841,3.3207435162088653e19,47.70478471354082,1505.2223482491145,7.95215364354275e-7,1.1597383176046886e7,7.110887151990277e52,8.107078999512951e-11,0.11070146255703359,0.0001271252652449721,88.42654420302415,2.3831287369773254e-6,0.0013304366285872581,2420.0950310401754,0.016011729513963978,63.811400576806456,0.005692945690789155,0.004682737745645303,0.6907190939298842,3.884783791836702e7,1.0346393769755363e-7,0.0003757672801155567,1.2084578067356253e6,6.229273521619472,4005.2236012903327,0.00368844998710212,0.0003693076483829475,393549.16654743237,0.10448229474959406,2.0686669199585813e-8,1.8800939731085926e7,6437.627241805013,2.3120902575759897e21,3.3481119323204075e-5,2.863247588415921e14,1.5338183544808267e31,1.1875390284043734e9,63410.831822884895,385.93628651897865,4.7564282925900995e-6,8.212139410594815e-6,57342.12827812461,5469.311873803136,115628.89257641631,1.8729975983728032e-6,3.322115022487727e60,16.239445444802147,5.781983684007942,0.001036340150052085,0.0009062724514104036,0.16623018619243998,5.491194490785827e9,1.2056156506238998e15,2.233121991027918e9,3.443638624504365e-8,0.18316327354582956,8.031254684121707e15,1922.4093771793393,2.0325232988803922e-5,2.086370116056633e-6,8.90113001797165e12,7886.25750366542,0.07866114223921358,1.5005534341138917,9.279471749820631,57439.79256426376,508.27720041883185,738868.4199576105,0.027417390535009287,3.707542945655062e13,0.019902021780515488,0.040490452791863314,0.3476285352064055,5.413647731603506e6,4.3337261118262594e-5,7.695974393099466e20,27669.04369155226,89.8081620516736,1.2466861625887231,9.041227338133121e38,0.16963967354634207,2.722687554019121e13,1.5641491163870377e-5,4.0992316863260107e12,0.5752439260479968,0.36375137375700495,0.00038797582885365697,3.925942920126136e-10,1.1101275155384344e15,1101.5631518233315,6.866631909191679e8,4.316530871712827e22,8.563860459859293e-6,209.03437472197982,36.33855282040058,1.4264031228977144e9,0.10718423881348414,2.442102509321624e11,2.8568272382277735e15,81.20203990949176,2.7126697342574014e11,2.089399395401509e-6,7.347020065940891e9,7.614462970036113e23,0.0017130527890110697,3595.926032528864,2162.9755680043345,0.0017395789803652064,97469.24632106003,31.066020467442122,0.0004992366148329444,0.030802684802679458,1.4219467309972345e-7,10.176653196843723,863960.7604260636,1.411648276255915e6,1.5405962539134252e-5,1.6694315431617123e21,1.1278522400558666,4.877594275724996e19,1.7526292297730588,483.59126078149956,4309.025166386344,12143.59689714263,4.184106967652099e9,1.397111219371187e8,2319.476400638693,1848.8460065036427,42.97621463590675,0.06025558911796184,0.16317377674254946,52.060539353304826,0.0007743362269482239,1.5693485946187948,2.5798411468663785e8,142.6950886649905,0.17372524883782106,1.2364107553158434e-5,41.69703298375688,0.0019884055352516823,0.0008328698699607748,1.3626075385038537e-9,1.2768293305304597,1.0970633530170461e23,40339.74336274091,0.005034298140660802,2.0986763529925825e-6,38072.48167775343,6.727003682922682e6,0.1371778960397827,2.9400198053140348e-5,0.0037655831838742013,195.59554556499887,1.9273822797327502e12,3054.4856014702304,9.03291632198115,1.1296336266216216e-11,3.633548009212136e6,0.057790055845703486,4.286323814604929e9,2055.7382187568487,933.707739094939,5.790945263822755e14,1.5038107452598695,2.042815530232845e8,1.7844353467491223e11,731.1264351100644,0.32255902344137155,1771.4588435241646,0.013749859798267303,1.3927712649599684e-7,8.857741645611092e-5,0.1425904312077466,3.1379902573494005e8,271.00272322545027,746.1234547783091,0.810764469299226,288.3071828956207,4.494339079038206e-5,7.443143082330875e-10,2.946657850240212e12,7.513575498616192e-8,3.4339175414610737e10,1.8033393903444006e-7,0.5511833628926082,7.587669818980639e8,0.0831862046875307,1.299511734301587e18,7.621031397377115e11,1364.6960420253622,2.9490443244808473,0.00011380247332200355,0.15210585319410203,5.817336801594439e-8,5.859088618882051e-5,39.69123890102944,1.406300969036139e-5,1390.685638140546,0.06872669446097023,0.003957898246138334,839142.2855492348,2.0830990537027135e9,5.391527737889411e6,0.0010561689849222819,7.460267046156972e6,7297.945538449577,1.0606135522572395e22,6.696629565551784e-5,4.31041528591625e27,0.37090444264162337,7.879265417547133e16,5.384694931792679e24,14377.120937572266,2012.9106481013798,0.5891582728673419,1.894291538688209e7,1.6828755039687888e17,0.019108379800058462,2.3629480048182003e7,2.4832416902351763e12,1.087087713244726e9,3.0670982919356455e20,4.117564755119547e9,1.3271937094496038e7,0.044514982903131696,0.1384456266222282,1.3141922164008541e10,3.8040279689251254e30,0.00014495313447502375,136.22032997851298,831.4133841337505,0.0002330622629552828,1.2417821850876394e-8,1.1054005307885754e28,38834.714589135765,1.1191309786529167,5.308007647739036e8,24733.052872410495,0.0008486848660320697,3.133717799188456,72.14669464573124,0.8989856573272074,0.002540177510647604,1.2474647322302726e8,1.0685043329534675e41,1.9834539094184655e26,0.0011376682062351426,2.5879767321243187e-5,12.61102676086301,4.638432818350561e32,24851.63141702214,20.473621035957137,5.923304575880785e19,0.004589611214256117,1.1769367461264773e13,4.966332916153693,0.1139723433704075,9.442184452697232e10,4.654839861667068e12,0.0806087517828942,1.984872765908192e12,4.182173039054328,1479.3843020072636,140.10435031845506,1.1067364543606669e-5,8.412471867224165e-5,2.947131837941433,6.277673302036192e34,5.2618562477038497e8,4.138777930169305e10,2.8703701563868452e7,7.330599152031618e-6,1.0499033621625659e8,50.29301109228592,34.78433648901469,6.273691679287216e7,1.1905954828417968e7,2.554534731685632e11,7.851928039557018e-5,4.183386649814044e6,185473.22715808434,72.82056835445375,33981.04654070993,9.047635816268167e7,8.725747963991627e19,38.425743575265145,5.506334537434368e12,79428.06109028061,460.6349109644997,0.3558644030465667,0.00822524680741624,338.4400128265821,0.25378473282171055,1.2055411239403058e11,8.725930026386206e19,1722.442640122011,529.3923182733581,23325.014540637418,0.03992802923718374,1590.8251724905006,7.742289608528154e8,1.6824763470375696e17,7.825048065927485e14,630.3147168905564,10.687364405926399,1.081217386148312e9,1.2549992616592133e18,2.2618816723765871e-10,6.253486852359094e10,0.0029982251788870707,4.484822965690892e-5,1.1570908989396679e10,0.38301578975422446,8.767857141858162e6,0.0015689040695689462,6.802402179267587e-6,11.655846905658294,5.635031128771122e27,0.6777845422656481,9662.927204961488,1.7882907076673809,3.206108278821677e-9,127788.61039848531,2.867254967790445e28,0.34257850630933284,1.3232781603276005e6,0.7693842278542815,1.1866772123642776e11,0.07714542727529532,54.10676448581823,31.93126512327157,8.056780340244382e10,1248.9384127406074,1.5978450849584103,0.11487216589608018,3.482760389600693e7,7.214571787840118e-5,2.5238557267350376e8,8.51839138983039e7,0.0013332867877148776,588.9113885379145,5.826412480264693,7.483041997952929e-6,1.7966623276153574e9,78.89400915260056,23.256462797388266,3.462108414177134e-5,0.07190785204072302,1.3809478401442308,12323.73866063598,0.0005805283051930231,876.3986450915919,1.9738068449773796e10,0.9648561650178218,0.08749977903571633,3.538362432279773e11,2.872496212175447e8,6.530151026229011e8,0.001720485212174219,0.010222096388180092,6.425494583068991e-8,3.6198349368982645e-5,1.471096912277337e8,0.12416884044442729,1997.944208628889,1.8617810063458895e6,5.3389678662637294e14,4.529445390235394,2.9371931681969146e-6,0.5491381385407149,6.300880560427659e18,5.516420657455342e8,6696.244042783735,257.3496929757054,403.29899025595046,5318.4314824368275,6.869521130438863,0.0006447873874263199,0.5675238833786423,3576.667842163015,1.8471841912700297e-12,0.656471000596456,7.031175573375313,43.42918416394497,0.0003854907110449165,1.2513891879752708e10,2.202778409124524e11,1.6210964068847855,0.20838077187451617,3.1898580990540635e12,4.1708260779715756e-10,9.17321808773328,0.2946338151926558,4.528992881462337e32,6.632530424319703e7,7.6843112681515e-6,1.3020085684056679e-8,0.007486039783048477,0.18723441124534806,12056.217304761536,0.004899602826817317,11122.786477872889,2.3613874849168237e7,100.00369342780928,1.682663475834396,3.278381377534643e6,5.072843107948766e-6,0.007616186146902469,0.03326595928067649,2.6605488513988515e-5,1.1585702972905888e8,3.170846309037951e8,3.5854116567913797e6,9.818196338678876e8,17654.443093457303,0.1219077952925552,347.6948417548822,453934.82772680116,0.0002582447050805706,2.2186532140553382e27,2.3853484485992566e14,0.0031545470649871053,82000.21766694041,2.1424416234242442e18,1.7056354433735556e-5,0.7310380993270417,1.2164272139802754e6,0.005877695706689466,1.2518079633146406e13,605284.2413049297,3.8228338426093242,2.284702309669548e10,41701.5696373171,1.2736339739935804e-9,1.5859220637653852e7,4.494755877904712,0.22257029626503275,6.454727629605146e10,6.6282850106926e7,6.312351883598009e-7,4.603981840223709e-9,9.324261038834125,357258.65155487636,7.318491366524651e-5,8.814639388730018e-5,1.658672461187135e7,0.033521557980416686,6.766467887596849e-8,11907.7253574169,0.0009530922864925384,0.1921879110669647,7.401536384582575e9,0.012229675659833865,3.800075995533788e6,0.004326406667570658,2.5754831485989997e14,2.4219668809971847e19,677.2012232544754,1.6854864583418118e15,203792.05127690357,522693.8373249557,1.0588069766340234e42,21.852346633850825,12.186692701961318,1.8883148948850895e-5,8.058892657877139e-7,26.41709897735005,217.63946350450777,2.9722367447987197e12,8.675327533875707e16,0.03106204138015637,0.40677322030331775,0.21858921198454978,16956.893354727432,2.8566168632990346e-6,5.117956891424564e40,2.2295478017176995e6,5.259649510212002e6,4.531602972514907e18,0.003848985082902181,2.123026740496437e-6,5.682600308021422e-5,1.0530752487590678e7,261769.36789529442,7.718529458351972e-6,0.00012165549626444486,368.0290605377339,2.5386078751998848e8,0.18561178780271698,0.2618448974955831,0.07212731599633102,0.845283661057517,1516.9928933446045,6.852404007714302,1857.4471813293853,1.821549692719971e-10,5.137541897955101e-9,345546.25977877126,174827.2626632427,1.0185250365669012,135700.11361706915,0.25335656857181726,0.12002855618082231,0.027177403942539573,3.9905421707056855e-7,5.168478702242521e27,5.7757292772135e8,1391.8252630189177,11721.735204381112,0.025918008230388787,884867.0373080333,14236.476381675962,441.6794671175229,903.7725177841596,67.90231316933365,279333.3525661829,0.007037970434903344,32655.459869279148,245.23844854143894,66262.02010157515,3.014709214930033e24,4610.018825255051,0.025444524481796165,0.0013351035718721538,0.0005013003902825036,4496.711344941689,15729.01762516676,1.734787698756043e40,5.499052860277319e-6,8.757101067754619e8,7.800201938112326e12,8.935166276790803e35,2.4924477923635325e20,13.041077645346851,5.51067925115283e15,1.985837472619528e-9,0.03512840134087735,0.1172315357874848,118.95179572556643,0.6389272335386728,551666.6192363742,3.786917729688208e14,2.283612552111182e26,0.08724838753760937,8.274586234219323e7,0.008863976042457498,5.013701371067079e6,5.1927940386812606e14,1.2935372693490175e32,0.008344834495177754,1398.1768167530502,1.2023614636247117e56,5.364299928925719e11,268395.1363397907,3.5034142093874023,341.45828733455824,3.5258906517041135e8,95.24640395993868,7.565529857694156e8,0.0005654510029738005,3.1935714226718338e-9,9.505966831577712,0.2150316021158335,5.784931145757815,5.080878245680975,97149.32142743896,162.60935185400024,1.3722703427730458e7,4.7374043031550276e8,913.7146268068662,2.559472499936308e-5,3.095700642277654e14,0.008748109995613868,19.88236604597035,7.006848486577961e17,0.0011073195396766229,211097.12708020955,0.204087635010841,3.3677630906606035e9,1.1266049493537528e18,7.192400045348539e-6,24251.691495082905,0.020727572253911537,5.086770090553816e16,1.3075909268830793e8,6.25209055217797e29,5.9447575377044216e7,6.35167250380757e-5,1.380792796403227e8,0.22870527780604963,5.2164297061574765e17,702.6126657218042,0.0012736557014774617,0.05038851169438681,4.710302712541292e-8,69592.26696096594,1.0427066738679565,268.62761604700006,0.011726917206499606,31.41386490495796,296.57329088158616,1.1000019828277251e-5,6.6331185357149164e13,0.08299550624812506,0.01714672474687506,0.16304328926323014,1.8733973265034388e14,25552.606507506614,241.40806273676245,335602.36533709,5.389598327689119,4.809001676859007e-5,1.7122401097263805e13,34.184855537755695,5.786559387044796e6,45.47197272511965,8.932985628302053,6.987991519233125e8,4.5711051773793105,1.1635511913898175e6,177.16458171390565,9.572404210136614,7554.030833566841,0.5833794944828005,2498.8169661603843,7195.436652927251,0.17741826182090006,1.416763939597502e6,0.00038076192673568415,1.8852444822452695e15,2.3468625365705267e-12,3282.157554588437,6.04026604703954e20,2.5032540717518546e7,4.120664959064973e-6,3.866320742408075e11,4.974534791505083e17,3.1657872470783994e12,4.93849919848627e6,1.8463511363746576e21,5.854629448320216e19,1.4516974190490254e12,1.1013472164716637e39,1.2670576404463687e9,6.242726686826261e-5,560554.7376719925,0.01831809171891688,22.215029934202597,5.751579260640684e9,0.9562467791956774,5.759875315669066e7,3.701115011275091e6,1.3647752805350914e10,228.37550698007016,6.603054378620035,12.919273369303992,0.021989639756678094,2.2122030383682723,4.593566304879273e-8,2.8028594282767612e16,0.08892106889396825,4.211584163142352,5.524481296434707e15,0.18022834184359765,8961.258145414951,0.00955794877830368,0.05905139623607853,3.1030228921536553e-11,179865.5596487545,139.4084687638518,4531.552133012063,8.214416971286542e11,0.02180238210720573,45.24518104438161,296550.5999910367,0.5926384154150256,1.4752753802373002e6,1.32291353272797e-7,153.10047115783843,1.8293731549379192e6,0.000393967492639281,4.726921875439376e-8,597152.2356515594,0.0037056656731773514,3.404705376302628e-7,137532.45393513163,3.2511441840002913e7,9.169179625428306e15,0.5199110649395079,0.06967217334489173,3.011787032092123e20,9.933979888828072e14,0.13102123096656754,4131.252120554532,1.1731323391325672,1.3624314014432294e-6,0.865322481870629,2.1252521974027784e16,384.52678944917,11464.394970735375,1.6140892726220816e-10,0.028998464232026493,0.07221454074664119,0.00025696697446111154,0.0011830437521527205,22.30916096657017,7.636074067511557e-6,8.740593727447407e20,4.026169996249315,143.39445614291745,152983.02007847608,12.447724990208677,8.384445648718538e-5,4.567824998983606e16,504.25928459102096,155727.51714336738,2.8227365209722083e7,9799.01765873234,0.7515260607578391,9.740185339654254e6,75948.99760251906,2.4249575335307166e8,3377.653146937233,69.50152607600683,2.1215162914014095e10,0.23958379336062552,112.9932811589395,19692.94915677655,10180.30541809058,5.802881546738764e6,3.6356069626164995e6,3.065067406528214,651.3823804477462,1.9139710669413574e7,0.000811296231131405,0.005140293490750753,0.07763309292769364,0.0014098935566710085,1.2920587155926284e-5,11.301113133423007,0.0005276249702635584,17664.286177379392,0.11302803913224906,2.3725264703002384e29,3.8851300673333673e11,1734.0652412480704,0.0041096156856737474,1.4020708677092986e6,4.644700135762923,1.575448254175619e-7,9.829424042105813,82.75430253213045,0.04052771403792803,1.5730101721957048,1.0160708174833105e15,1.1420233042538393e-6,2.1977538961146195,0.0023202887922241394,0.004627966449457556,3.830142372398112e15,3.6309737077315716,2.342116997499117e26,1.2594412028411122e37,1.7182947081766374e9,1.5048780633986594,148.81481585964738,0.01774149266909111,2.4372917872256354,9.830621943229203e35,43.18916526538734,31327.23265149364,2.8698704513505712e23,2052.447732847994,1.919304996402789e21,5.7658338990543574e7,21.363581107004148,1.4380284405337664,17129.26466557374,1476.7521663339176,1.4209674158735123e11,6.645827670431133e11,0.0033447399576937873,7.3518864443594366e22,36.19655038015131,3.034998848122092e17,2.880149984080182e-6,251.01130783419487,0.030005472402167607,2.4047809693191198,2.004491536079595e43,5.325228216102133e-10,0.0007163755052735624,3.607883223161769e8,2.422572484251365e6,1.3989507255719659e20,0.48165055081871305,1.4277401802175161e-6,4582.451250574739,6.931917410047916,1.6458353816050144e-8,4.882573672830015,0.4859028804797651,6.988913849711117e-8,34574.824375376236,9.452656354925866,5.125966394012827e7,1.2230525527144804e9,0.0011732775435904183,2.341482933540219e20,0.004567877703420141,0.06852376477393993,1763.6804626959192,669.6315048881787,6.190033794007334e9,1584.8890322044608,41752.58201311656,0.0035615062259696977,1.7983140423492544e20,2.761157162626804,1.3167198296420868e31,7.745266163402139,0.0010587082576904387,824414.2879201457,1.0582325932287542,6.446173876789612e-6,15.416574564800277,26655.881168065633,531159.4933707592,89.56482450258517,121.1502514500408,1.581324055373564e37,0.00011824672205722675,20.11134702172169,492411.8805288608,0.32968612189086566,2221.100392611666,0.12077536025915434,3.533237619304022e13,9544.965469271609,56.970474489630746,160.6050905653387,0.5370393000176529,6.210931640049447e8,1.1431649184390106e9,630932.0156752855,392292.5554567488,25092.429739663876,65274.87274430783,1.2558372859087156e33,2.3695009198105297e21,370571.9372472108,0.029183281066820242,1.848074013734809,0.0002542119022414859,0.0006879755074806196,6.001040269471816e19,0.02746394339761278,4.8916250932450716,50.58630719478691,0.04107454774137778,0.0003577453071259466,210.14633109201753,1.2245856674247923e21,1.1166763988139114e11,1220.649663745134,2.7606490559434586e10,0.0005025359675933986,4.38169792989372e17,6.632618755510447e8,18.734073575615717,6.473574271661086e9,1.7846989443792864e16,5.686506225814912e19,36412.5244523211,0.021783030516471253,0.00022888509910689355,5.506096978540143e-5,231910.26983086363,16.689893096512183,5.398777787127279e8,0.00845682910914475,6.954751279158077e13,1365.3513983775194,2.333457961830651e15,1.987140227388596,3.505331659837956e-8,1.6952829438377254e-5,817.453592818677,1.8343611408692676e13,2.262835839655271e-5,3.865018074411292e-5,10.352479083606148,9.958844336012882e11,4.942591271280012,0.5817303955309318,0.03249893052389006,6.045136079159115e-5,0.22557192738698947,3.915687653094795e6,7.531005710362572e13,14545.409257089748,2.9322178703861105e8,0.3710375997269725,12636.306076142368,0.2244879275656919,4.1453559091179136e-10,0.49141721232320235,3.2260490567564655,1.587730158812204e16,0.002622969493827298,18.61485598668904,3.368684518765506,55.30462707735167,7.426618236740808e17,4.684322697648028e21,9.397870544339245,2.2545830592252213e8,2.6376569427374583e-6,2.0125357574769795e7,7016.621724581124,0.00989033017887851,0.002996146028770951,672005.3573906446,1.4911404439203743e7,1.5001517113064885e13,6786.68954186231,1.0594072053453244e7,0.014088446119541553,79.47439431720588,70.91811335496348,4.226947960328411e13,3.9442053247605404,42.25377072891341,1.431381631199001e8,6.02372677825739e7,6.067825626646826e6,4.849687003658094e6,3.219162751545343e18,2.962350602903378e12,59.4151847909879,0.03805512759791105,2.3747775368698765e17,42.48503054379162,1.133144717932567e7,3.1513816288036127e6,111.77535491362494,217.2452110860768,0.0004972975582948489],"alpha":[27.50251822496508,23.88004732684689,29.699845059837568,26.898933911609,18.189926783446744,20.654298443800162,29.966961141507028,25.685324081552118,11.060316868626625,19.98228835178075,16.233624287725696,22.347054384095955,22.469961339259864,20.746773146809115,15.085249960625294,26.08726599703163,25.08678644521625,15.124993830648146,15.852308232594655,24.861849373532024,21.71347479320321,12.093763107803985,28.614178434573674,14.764390801740754,24.564708026065425,18.30548031638208,13.908575643844966,14.342653974134132,17.075235612223572,22.004096034019472,19.355017775411607,20.730009881487298,23.9901559969238,17.156257020108093,22.320224849256714,22.061035616154175,11.583519340479128,16.410454963442255,10.011646735035846,15.24305058071143,12.655001008293908,19.329715143702497,27.463315685643135,17.98024766385653,10.780592639852063,16.817357587285947,21.871957671586124,26.610039505595722,13.684229013470862,24.081673964693763,18.796528225026655,18.299539938438446,21.929799963679105,27.318819703796706,21.128601787044573,18.047674100000492,20.18777724550127,14.054183585647033,24.44724954094732,22.262990820934796,26.808555423303154,24.946822451632833,24.346641621370466,22.727642493539175,17.541713906236307,12.065212614217305,17.207761474169274,18.770467616883796,22.407477353624454,21.58442016142526,29.044487600844896,13.439302090564347,27.280909456123034,14.08842899758097,17.971173081319634,26.736827917420385,15.708390238262924,23.710270296951133,17.906591476492373,12.098083161683366,13.63020416969663,21.77394082599467,10.383172938057132,28.014255624044374,24.430187829867585,20.69503353855875,11.968116923531147,29.5800573181548,12.232588062223826,21.458314685352246,12.253213795998224,22.30315988443533,17.24665112877387,11.755274603172964,16.99262984837656,16.405535361626853,27.41139051361436,22.022140478310423,28.811535440526143,26.148312587034287,29.193686432771088,28.18197586795157,12.696093042531187,21.505204502663254,18.219119474955562,20.482632196672782,27.929775091729255,20.265025323097625,19.777453191264772,16.25907419219269,20.977476567910042,16.0397005969596,15.225007730159351,16.28877445107097,13.724818247712655,13.856033988430392,13.847823076764385,13.031718688585192,11.870564771082499,24.668520485217506,28.02153896810557,23.71256837602916,12.179712884462388,19.245372326064732,11.956208902259103,12.22624108838771,16.366173271919603,14.184610817035374,24.351792763622036,18.531681304522923,15.193289082900506,26.02217383914876,14.956155521224854,23.529719420174825,16.64118664027398,15.862786303266518,13.841188501819936,11.968016674651874,14.409400860004062,23.316046764636766,22.96117617915271,23.24932225009453,26.043924095845462,12.391557238259665,22.79139644550597,27.30154564393868,15.533668129760944,10.614406655414133,16.3380504541323,26.75641627217974,22.15210959919157,26.484005387134605,12.778689895814779,17.008266335604375,28.597545008849274,10.478083695747781,14.758671540281743,21.282694036491677,19.869562785914173,17.190931619477627,13.214973849526999,19.918012837530927,15.789678815010149,17.455126409565697,24.636527790899663,12.764405002051413,28.650068857070494,29.288956720696294,20.56560103770105,19.852307233956267,23.791166273512555,26.07459063429294,14.407515334208775,21.48015903581454,10.275782014671066,27.735257629142026,22.147385375082674,15.04252419635414,19.120262476646257,23.467948137321564,29.44744763369531,27.47831784737822,23.110132419288057,21.839174951221054,12.46725371390658,12.30468696660449,12.807618864114726,29.489233319044995,28.626175005400786,28.00469277156751,15.083820907429871,27.92234180228011,22.923307230014043,20.334531364354564,15.61560416663411,25.19478958335052,18.061939889206094,21.08032980674257,19.09167877438833,12.913777648252566,18.99362593780266,19.187862865678294,10.399881241953558,18.244215450886273,20.455934068681344,26.269870984906184,21.47652707759427,28.007139372423357,26.04696649865588,23.47877760399159,23.413381089511084,20.259244868901824,15.882139150562523,17.466387304270267,20.035509193671054,21.10808095552524,19.13577118819591,24.701287794866925,12.954561933922303,14.401582369561318,12.37431470371217,22.444533866097704,28.90448422341457,28.030838071642314,12.859028823156375,17.099816854366736,26.98022136811862,14.410148848336505,25.231495392048743,27.53158121950571,14.994959913971634,21.52485170395822,20.24439506546117,21.38674865031838,14.574346155930197,29.21372031952203,21.587089607365893,27.75481905891581,10.45830059017517,24.00798953766396,13.022199366221887,18.073787148662927,20.884924342194964,28.695381551287063,25.11794859488447,18.854351755343146,21.642726601011816,22.827732573449037,24.563329921636694,24.156134398781894,28.160118372144694,27.007748753452944,12.451724880901377,16.417530168141354,13.328257369103031,16.715332694563223,12.061723330525265,17.308500264444643,25.56468242252583,26.447814299711467,29.147531231102892,11.335391623987704,11.099733253284816,25.421451101975435,15.580315448752886,12.24738041306904,24.53247858243802,25.845054952598318,27.443655111636495,15.718933034525664,11.295124368097609,26.52985477069429,18.811528693548926,28.393004053806568,28.0798372541923,14.46504416545416,11.209993794255752,10.622616122925862,16.63826115489936,25.814017891172632,28.514584478117882,10.1825746127607,18.66265620516674,20.424885779863974,27.12467368581858,13.319261778073255,10.83729155276814,24.646603586634683,28.519963511884416,26.123959857933635,11.938426759491097,16.56585463777087,14.664230723938424,28.098444028127926,12.736069323664685,15.475171444870872,23.917139763065958,17.38362447831127,16.569705576357666,25.74171704313307,14.776804841811057,26.105706630649408,15.812409606239344,13.092805344281135,27.376230275388657,16.261893445046116,15.940250798456127,13.196143648625313,11.035270386296002,28.055723811598945,13.023460649204504,16.72451942670568,27.088776300025508,12.299486495034744,24.30702034396676,14.305103313936751,24.585131690634373,11.222070438964945,23.227047805847157,17.421216129981026,20.42478884856696,26.69356716041445,12.363681501803367,27.9857775459479,20.327527422975677,18.274184729101208,18.604210600701645,15.812332255334871,22.61480437525647,14.769738751812604,14.144574675926922,16.18494736731997,14.017718365118839,29.784145299228307,15.01862697808409,19.70317408016575,25.52127587586203,26.88133777947373,19.897998234691862,20.8944100885802,25.042685067670153,14.968311670519112,10.31002788499964,19.623173862892457,21.251825511986905,20.825438702442433,12.670943779656323,12.333913213441296,16.04963433533974,22.049973896386703,29.770720446262647,15.148741269684137,24.03224641281266,13.003716048554473,18.872175944124546,24.440023235336675,12.652178128881664,28.80051052928847,11.015974356563326,29.849591919632378,20.49014698144451,22.600569273583865,25.79959184117712,18.450944251747675,22.86604553501277,28.144614367910506,16.10010722953907,19.28948879659812,14.794292053460612,27.598165869951483,19.206404229441716,12.085650486440196,24.749307028414368,24.392682787694948,19.308804953275867,15.621762946825664,17.570222695668626,28.55287727590518,15.594429733901372,29.473500001944544,15.806481116528186,23.269469298325696,17.036976859916045,27.306542546687076,18.355891744798623,14.270138236587545,23.409269404665054,29.03488752416251,15.792660119830519,28.58586473082547,14.67969745362183,15.32290966209306,12.871526489693776,11.516337641783835,29.690056527896274,16.67820283034697,16.25880832769939,12.670964443739003,26.973787416398977,21.610120328229236,12.685545740459844,23.172359341147303,26.119244878597097,23.93281302834236,11.660116276720661,10.95306344566545,22.636996170519524,23.13033133536846,21.495317148703048,14.555460817302443,17.983487970023383,12.548841051398805,21.627593120229307,19.468394763808025,12.292975093453142,15.730437367163592,21.151598874239728,18.260392515014324,27.725274644339073,29.789684561194782,28.336918724837453,10.83435047499895,29.911084927873837,25.85826451874312,15.367010793681363,22.38235201315264,26.91021327577667,15.593946095579017,17.38405510035889,10.263922320462147,25.610266587070562,12.838881037654296,27.4961594635477,21.00929252508351,15.827279834710293,26.86242309471677,21.5838073122349,26.09409938737048,29.370775130840197,17.937218668219344,25.175862795485653,28.12279726346832,28.584740125303362,21.334237045937144,24.914476025389867,27.216134002559635,28.36546384046813,16.7779987899248,22.92554935681972,20.323641137483584,26.232552669055252,25.546579626160224,12.649088383506491,23.984142055866595,22.110288536104484,21.41202585628978,13.052405096509933,17.662232401214723,22.05297828049349,11.625415250456816,27.75574451390046,16.46780453072777,29.72953612676428,21.420397391867315,19.009161600607637,16.413684129385366,18.15510961043366,18.227455263291553,19.462534461175338,20.72114802273785,15.825899976766404,23.827935197599672,12.232750695550054,17.48238025501458,20.980641147851923,29.716786937852234,13.954325505729607,14.015794508407664,17.768775590290016,20.1763657573786,25.744661022272,14.092862663235465,24.540018746178394,20.513742864469357,28.12389684727642,26.44287642287842,25.15661848163431,14.335820722811192,18.940246571275274,25.64489965435215,29.730245403700877,29.758788019341146,29.87227979052762,15.63860000376392,12.14658549933857,19.13610953807546,12.664503667087095,17.164510682723385,23.141956759635292,26.02727432455533,26.793861494551336,21.649503808628722,17.841786566535202,17.230953119391348,29.615580800239194,22.75976928214429,19.101861975573627,23.61923661356581,19.424895806138743,19.448036565764607,16.302322047854474,22.988364102950992,19.84260410182802,28.390993561252863,26.120420044692008,15.659217184809794,16.03644514387973,27.57147494687842,19.28259474231067,15.855710834220034,22.126955829983945,22.293463772738416,23.13721127884859,10.107542044971991,26.310014996973475,26.187768120863666,19.136815044076315,29.56145366983926,27.03647618370033,13.62771565529243,25.655863355260404,14.917856592535582,15.114141875441716,29.005354443512907,25.208551984734914,17.510658686052615,24.35763998913275,23.54205009808564,15.6855204416301,13.724297354305497,21.905812217337278,20.44018671680456,23.58599105479936,19.198493084426662,27.579019133928927,17.968278943465176,22.46072868409182,29.979826332355607,22.114353106811286,13.563248927153207,21.298364869600977,21.708403666851,13.706810881007963,28.89603444518987,24.496901651760226,24.796891890614713,18.517588845970387,29.937366520229702,14.91745640180767,22.63567917563394,26.187881424047564,16.355262927539815,25.32365666367367,27.745391646758215,14.825258408383695,15.310622950940477,18.15102107106425,14.257924860171723,14.394055534172562,11.587310977342122,10.211035934539098,27.440215968003304,22.111244292055282,22.57191269911391,27.497396554829688,29.253241786400853,20.396418718684785,21.80457984265717,17.545625627723247,29.201060104970015,22.942031255293323,19.825795385671587,12.203705927293186,15.839041569160837,29.12353566575645,26.613797205224387,26.01152395795797,29.20625117394308,10.033593626435287,10.287518102569786,20.135192998320854,19.352142969886827,11.513460538694623,29.884470526529483,14.123145950330489,21.714238258913365,16.123874969087616,14.862762461168124,24.983561204594515,24.761233161706244,20.93921844777901,10.226898314403927,14.990386843558777,23.888542588424464,15.232055194154356,14.697728422480875,29.99627484830477,16.303156077846456,21.900998975955588,19.41427937296247,18.818043362836807,24.03542017399678,29.893341256670478,13.718394049133797,16.884108307761657,18.477924458877716,13.576020690286722,10.938334127904179,21.140798072035235,22.029087908272622,11.716824089589108,11.234347937010458,19.896726110400156,25.34674937239067,21.33328901488179,22.103898160394287,20.788507321302127,16.870930096088994,14.96024071719187,28.0791573192585,13.050819839698239,18.591725559689408,15.408286807441947,18.26410131677814,25.583015521136986,15.10524000652632,24.25853022011321,29.95774953813584,27.979879639659153,14.222013791616494,16.532634019724522,19.442285657352805,27.642192116238103,27.5175950550569,15.15099519347304,22.55835698209043,18.587772281549935,10.719777712435663,23.467067665417414,22.4960031033839,11.606358861531154,10.865180575171557,16.559852325948548,13.465738678074043,24.765387193868378,15.945649086627762,22.850428925150986,16.2429283791886,14.450715409373922,19.372467972429327,20.14294594590521,13.799202919720832,20.905145167696112,15.74584586968578,25.8156193457334,25.779889472870167,22.923347761087463,14.694501708544667,16.82096111197694,27.962435842604265,12.04209860185208,26.83082382721053,24.32272556641906,20.481400545650928,15.960013285984736,11.499272535600786,15.005899262268825,16.671357496957665,28.54860495865214,20.62487916173336,14.937561500939221,28.653068478562428,27.416507835618642,14.795478673717124,15.762659861839886,28.88212137356721,28.032055951882814,26.47053732999996,16.059650576024662,24.64864868842355,10.743848616743712,27.007333180638945,25.153901946912185,24.31578375394439,24.85295188422462,25.510064062677674,10.019583111081086,16.366833285539073,24.13121933769729,24.041172743633958,18.780755404516714,25.49308803207298,17.178153309305383,27.703560838432985,25.163090230572628,20.666530272976726,13.971033387770353,29.162614838216555,16.566206392441906,26.134968707561153,19.695556437056368,27.778141458658393,14.94255615832079,19.809171859368284,20.566458400745432,20.760599404880814,12.19810119356536,25.603954460869822,10.467399197876436,29.449121264407193,11.5881546294573,15.149133042186595,15.787576363598559,19.786433216162624,14.525323086610399,24.43793011710174,14.339178793455524,14.658063070175373,11.497140686498227,17.254312079234538,25.75088694611898,16.1004686903564,25.772184625472597,20.162071533637015,16.27471855344436,13.442751603407928,27.223529682375023,11.597344484954712,23.137570174224436,21.896993679828412,17.481081644278078,12.11368852214104,25.426532856100472,14.40260682310766,22.836643743630646,23.922059176194878,13.870135126487897,19.229897355519284,16.317158148412652,24.506565532420154,26.914349139797462,24.655605485063287,27.55949566775609,27.82274013717118,19.192441726252877,28.157868327494246,15.372032621162028,23.51929910374684,28.602126927507285,23.23092632038594,10.577099785945393,14.755303989606801,19.002182536754354,14.42446951010361,11.559761728473855,28.606596776336154,12.023028422349471,24.999326364286333,27.648638999035352,14.222229082572554,11.998750153146243,20.188823446225594,11.657796037531352,20.71906796873993,16.865414107857482,29.486343605390783,17.731424558685845,16.768182975031507,15.133955131126982,18.806255747472807,10.781041113647074,19.980039319444778,21.15386249882181,14.495602490124494,15.122261053527946,20.36489085087726,29.383382000081365,26.21730993017796,29.71461342556988,12.824736234216395,20.942020066001874,14.56957324986087,14.398955370688387,29.674866410109985,12.05020919145635,25.5499802582932,17.36874700916209,25.167736747121097,19.135163254450287,24.098871776032865,23.00201730555401,25.64245306802019,24.80093318313969,13.141221290185836,16.99851986665189,11.405729524342,27.351818797907477,25.08663632498369,20.894649456365443,21.558500785745707,10.23637316484928,27.75899986430347,11.808398572577321,23.617183564740532,25.737188657285994,28.868012409162578,21.61697602395642,10.870470134220751,20.349204014440122,22.674530044295253,25.81047038055551,12.214163663505024,13.642805323612922,25.489287207163656,14.204722156361012,11.052662105325904,22.92685501469764,19.141005673669113,14.4963969918195,28.247341137525154,20.3103705401861,18.662985621770723,24.681956772154795,16.141336903822694,25.381471486679914,11.514510205325866,29.61937129134374,12.228204988025322,10.009942009622726,10.38376152761817,29.40204743813395,26.52551924759385,19.80546698609515,29.59880596144582,11.646040358482352,15.13095047770815,17.86847559557063,13.695755869070814,19.76107058447093,21.850655216388684,27.272634163061234,21.511271111030325,17.77240045041317,16.78898751018179,25.68281467124638,17.344371535304145,10.756505960166503,17.748135081283397,28.569501973260216,27.82346357179099,23.83777073271819,17.833588216153878,21.059015082237202,21.62469677835118,25.97201629499022,23.176078451098853,15.961139385566433,10.456772607438495,20.175280916615904,22.68769591839174,21.630816564927976,28.70620298032231,16.912452601537392,15.532204078884178,21.857899676046664,22.674974283404584,28.11761202283719,19.33650233140764,19.112172164418592,24.336662118480863,15.149997399071982,11.712427102182739,28.510341092942546,20.261877407085343,22.793373229836167,11.317157286514163,17.165719394084242,14.616047160832695,29.767278114749697,24.066004194728645,16.11180275467669,25.54865530204699,24.706672974909797,18.50472003299915,14.52299142690582,29.33409231900975,13.494023916536428,27.39748240443202,11.29474322820656,17.87539514581036,19.344898450681693,26.80330566305659,17.556285735887904,22.738489834585693,25.650902822371368,25.481387569036432,24.192971168955655,29.24545834247356,10.203517530851137,16.57449906564816,15.083990423607165,24.54423707020423,21.18975940517872,19.470122305643173,27.811569639311735,28.809390833045548,16.128887876130197,22.07116161827706,27.25942748935512,26.225205869680515,26.627147822765643,25.014755025710514,17.690905057305738,19.0263754084608,26.513968146481666,21.465432866686548,14.313453797509275,21.806013365046862,16.422308092665986,12.720109173311979,25.82921431384374,21.201221993093164,11.796476637621645,24.71453522580302,17.854849794491994,13.120519067607695,26.111176736246215,29.803929436421438,25.090401592822783,10.56584586229318,20.136164675284395,20.795746100283527,14.35313797747311,19.768134276619836,21.086386189647513,16.01609985582726,10.427468530323516,19.763236710668444,28.033069961631277,17.550937135141616,22.59136307638608,23.699482095700954,19.669937318657777,13.700062682395014,19.508971008386172,14.008323704535734,20.647285840791213,27.365000635900238,27.954001893985712,20.881108802179927,25.68398870852875,10.49132918546805,26.4774419928224,15.426048877890523,27.27914649832642,21.251202977923942,19.637411699112036,17.650404325168957,28.515765778363658,15.59378008002474,24.04836737133963,13.850385978606718,13.063014223531297,10.939962742857684,24.611417394728186,11.167553127578662,29.32898557135559,13.992579081910028,20.012875588979465,11.0229775819306,17.46567772468925,12.470700107031556,22.87251417191324,15.968007519328848,25.769591938776895,13.600032663188957,15.43128269444296,10.309771139588758,10.747139270338089,20.520005317642426,25.14464990501352,10.32311475870015,16.090937707874474,10.272663387054797,10.234239597106228,23.9031823493887,21.780813042861066,10.08367970606534,12.545490978137366,11.711183909512076],"x":[5.169059257300663,17.71219922079699,19.777495986526752,19.930250741990008,13.270316755687382,10.493379842971155,-13.224822549736682,11.586444234435815,27.571115691515672,7.066188437594951,-18.70047555858252,-4.2917338876345426,9.84394248350484,-13.018789340877781,16.610012498680966,5.636721472217582,-2.969575221319289,11.626668408847374,-5.56251582343539,4.967541888303124,0.8801948074789401,8.954187086390446,4.654987514370244,19.826349950855956,5.33453167765969,26.094148176933402,19.785545556631163,8.000812306412744,7.741458143062715,7.05053919869165,8.35563928465319,-5.612240210633232,16.152920918306556,6.603894911457299,13.92281161029746,7.867977947284578,4.074801097485221,12.609230527965636,14.080017308939203,-0.7346241199379193,11.740079923627212,-1.8341756636766906,4.245812595607504,-2.2583727954498762,10.680583566052732,3.567420548786176,20.98547891717463,13.078908573686979,8.388558239932518,-1.3360512329064917,8.255073646399598,13.03355243889757,-0.42513135463861573,8.834532641485858,2.1753452359462706,9.279634078694343,-13.186784339875341,15.934407234378853,26.59311240102592,-19.338190760380748,-2.2767439776588496,-6.806170918111928,3.103729274542946,-9.950292518101673,-8.562377203022521,7.323149717505661,-3.08983521020439,4.742900676095253,-4.845870990071727,-6.182720663030242,-0.3540346157322105,20.307442893362747,-8.108028409777171,-8.746537072562177,11.271761635343548,1.2161092583959814,11.36756976112417,-5.489921004220989,-8.249979911194025,14.069987138302917,-4.282480463631725,-15.267943546077445,14.821806906129526,3.2300743820444264,10.641637691992788,-9.51590364480838,27.697041721709827,12.070687796017957,19.57116308441851,4.37525711555822,8.762514577039646,-7.91531215826766,-11.814909891301046,16.86740437458953,6.053327715938803,9.501457235499288,-7.745113551207087,29.412812939694025,1.1987460690708396,1.7625371720795115,-6.087507111976411,-6.524821167278528,-1.869949854430974,10.629043671127146,19.740948680526206,7.384647977872014,-12.751978962055452,-2.156063690599332,24.78861967408913,6.228031476623649,-10.275686200880253,-13.40704563980048,19.405582042426648,6.614282103313645,-4.698184038847707,0.5612233469030663,3.8592676284583582,11.887982211250414,12.06945714206719,8.820823939615467,-2.1556591982655355,15.728637968497614,-4.667606986102346,-3.1421327654617173,-2.031112394294457,19.696169875429177,-9.930496682712974,13.697594638109813,8.917664688008,5.437729632687233,0.3665038042482536,13.226099523576277,-3.0173280734870787,13.940576949507204,-14.265318197916308,9.702081216484762,-1.1289876675948491,-1.001264421914362,-10.26544734639096,-17.767689087086794,15.653178041977725,5.365292226675104,11.845305268549122,13.677722113471686,-9.939380715580963,2.234092335740087,5.273182258800052,22.900046198096504,-3.759508499130426,7.870358532747376,17.195174621311878,3.1289002435089337,11.720650013074696,-15.489033933826894,10.53725262397251,28.89262231180404,-8.916899765394003,4.882830552244389,8.178908321769711,-6.439396358311328,8.67819184247427,4.127573768698671,-9.258952295804827,-2.352374267065917,-12.87623042051269,3.0470362365828745,9.049766261651563,11.452488103667221,-11.152619978800637,13.479060656517355,0.08531274961133306,22.915326761527954,0.8517974315652381,4.142599007051508,13.694566136047666,4.297558380827965,9.097519706820165,9.007343900933302,9.249318828009333,5.5229055725663,3.172524858553608,-1.2767480604667476,-1.4138425579916927,2.685563136809396,-12.87258520158585,1.0070664898076345,22.127378100705684,3.263502566063675,-1.7395297596370192,-6.968824348498384,5.730697127596738,-4.529234802888418,-5.001198078260154,-18.50351336269825,0.2855308540420971,18.16439045213056,11.713862215285468,-5.879913633570794,-12.652335575125285,14.420117946291947,14.795030444455582,-2.18925845188771,-17.847911293917505,-7.366082254049598,4.080932448050378,10.346953277641711,3.1868766653587883,2.1249251995376497,-17.481684549702887,5.7568298615564935,-2.720334256251242,17.066860895113482,10.826047204461641,6.496124221678258,18.38717383195105,0.3389681542284002,17.060094152545837,15.210299029842725,9.943640776160528,-1.5138649956646084,9.066565266309663,-4.590822984435846,-10.540554641627573,-7.435657419358044,-3.088085661914672,18.73992846761123,3.002972438078716,10.516804668777375,-0.24087238109549958,4.712116341318939,-11.136742732427958,-17.143179099344398,8.19111893486058,-15.149044428435493,10.152778002480233,-12.197940283120563,-0.5518426186970906,13.31180670912493,-5.732940988582701,17.733357170317134,17.218115774562342,6.90929292992775,0.6060614455567865,-4.022738510968129,-1.383233168434021,-16.428888784075532,-6.844398082983069,3.1453324563279814,-8.181308768439479,4.1238718336077955,-2.1792600231005324,-3.6139093528048534,16.864477844229466,15.720397675644008,7.041431096361452,-7.08060863261381,14.796797359400474,7.899036461678762,15.949504364777944,-8.353185111310562,25.258982294513583,-2.256488813108419,18.382572713760204,26.29613090286817,10.184282942211553,9.987451546600145,-0.30108366377713125,9.91699356975797,21.244524046208504,-6.209980046346388,11.792895289623749,7.573984643847982,11.415400453545516,21.773451024866606,14.323377521781362,18.577297901927846,-5.697350841377798,-2.3229378049583715,14.72925716402235,21.531291870970634,-7.413733306337637,6.194561464667457,6.444758005193933,-5.724019499810982,-14.267667081200502,17.614940065736935,18.142027382286617,0.12172851272883989,13.175948990733742,7.553800333045526,-10.429122792771317,1.960684331113832,6.529029569891936,-0.09318665919586877,-7.5590525271480455,14.061926681786279,28.561129708295596,21.77973123068319,-7.826780343682575,-7.895494306131948,4.608151640236681,21.758173629272246,8.59338000473935,4.954354502570027,20.733116307082046,-5.051785622484523,13.556707003693829,2.976388406134209,-4.297165927309166,16.233754249169564,24.13666149772675,-2.6831510222716908,13.613770869497795,1.945238721372327,3.314404058246023,8.350564792162238,-10.115708877513427,-13.171786693902385,1.088422013912318,25.724279427117676,11.310673576786945,14.550229373904159,18.770230367371518,-8.306103168463753,11.207701077215138,5.42158569417575,5.155033991742673,9.858083126008228,8.104629861779763,16.492540428482048,-10.70484969791666,12.014122328542328,8.349903819954713,2.6774218926876223,6.695644290300876,14.333769504849357,15.110451324842963,3.18312455353103,14.966298363030933,9.509777647960988,6.097199071504971,-1.769705173849438,-8.901737132402419,6.955955115160883,-1.6976519805288355,18.847052656314805,11.302355864916517,11.111200973988627,7.615420526703902,8.011581987957982,-1.759785643170595,11.317677638009005,15.890364730188715,15.548438301961738,15.97092954144618,4.197168590557581,2.069810308267977,13.155930519819092,19.81246377394518,-13.938371659187133,11.854690794356548,-5.669966782605538,-4.785787722701702,21.142372139745852,-0.9850220871087707,7.921055572805335,-7.235239470168903,-10.596188266610849,3.764143087936631,19.625737526580803,-0.4270140384689576,9.001586241278094,0.3822932287946301,-14.032425312393427,11.569644619447335,26.234548500305646,-1.3643927213118374,6.832582327375164,-0.2904320808640435,14.214352686970251,-3.102563315962353,3.3149978739135193,4.0405860545221195,16.735402371897393,9.044798805240564,0.7239230614621839,-1.7857627893592891,9.236544238989735,-11.096534757806962,14.493626483359112,7.333533466421361,-7.346844024901049,4.720623993959869,2.850562967341311,-5.321180955468538,15.74248592428184,3.2432936689361433,5.488076761533581,-4.75181355622659,-2.62019101216271,0.4888653074717091,9.43873136787014,-6.770093563870574,3.130140648366041,19.46759725385007,-0.0847172831959746,-2.832968437629681,14.941124585662891,14.275521507986259,20.056221353009356,-7.831791000470037,-8.16579540742216,-15.73432940027708,-7.292172728492568,22.88665171541874,-3.570156111403705,4.116761989128406,6.2500580744636025,7.872268733586845,1.192174688363174,-6.967155780036618,-1.1973736800167458,9.031538526485633,16.049953171824658,5.005941837072742,5.528803389445979,5.323213202636598,12.400891548230888,1.8463783761322912,-13.255333775187776,-0.46058064280572,7.724116100491001,-17.957930222644556,-0.3229608557481072,2.7048892464259815,3.2851115533784245,-7.9757022875853565,14.327189358802638,8.635877228518126,0.6073114671466762,-1.6647898467283113,10.855172447738848,-13.93981607024227,2.65206915240816,-1.0715588341395694,21.77381938043561,13.410559660717375,-12.359998907402804,-12.55801619814013,-4.969988668835867,-1.3271557892919077,4.370047396923482,-9.95558632627629,7.262263408423269,13.637939559939731,5.55524453696227,0.5690753128557056,14.315241437610126,-8.0631006626293,-9.449887697936745,-2.839624675492278,-10.792578420728129,11.253229505519634,15.237115993824354,13.157832091283568,7.523917201294447,10.689906877511383,-2.019733639710246,6.857958562114991,6.598102545285194,-9.311142569163888,12.694130543333793,17.818972320542656,-7.084292629347548,7.977173251041309,20.24166994825256,-12.024815440788275,-0.6584281251431605,7.127992803663953,-5.197647729792887,9.358850709605013,12.782174128374795,1.1263830563347312,20.392394409278992,7.633658878805644,-13.403118785337547,8.474188902836422,2.635221355601484,-0.9637730903310011,15.595866168667923,7.274693411213468,-6.992552605402146,-10.49597055211666,3.0911383590610377,16.49424976880571,-10.56223811869636,-12.135619780603129,8.22919449829457,-2.025454576563387,-11.779680643729634,7.2710039406792575,-5.180513950078215,-1.680230895871393,14.7793244690055,-3.357420367063259,12.781165324690466,-5.568424835499798,10.765121786977032,16.984857554505886,6.443266630208782,25.407367751766397,12.320363988216215,14.118473494933419,16.50505610988875,2.7941782439966474,2.688416933838706,-14.624725630461132,-7.388772465931726,4.07503433561531,2.8879656504204174,19.701359759374085,18.432780068260662,-3.692195524685417,-2.5480290536256582,-1.2775827366160861,5.263663155767844,-11.40787802854977,22.752065281147846,7.450310121617086,19.469778143238052,13.179287419907856,-8.24825484383036,-14.738704149662901,-5.359652662853975,11.471050412943592,14.645938009283384,-8.333032587489463,-9.357530078340488,8.679288731202814,18.130842364494868,-1.1237047551047628,-1.5032986672521957,-2.552794942890884,-0.24881656918219264,4.664833399708689,1.797008800164182,6.002267599525737,-15.361901200133593,-14.960337287410194,17.82466730301303,12.329483473960654,0.020582539694729007,14.238930725013239,-0.8637231033600372,-1.7795767096467685,-2.5361172607236213,-15.38625113112157,18.28836405943793,21.03946303909893,8.044871988305456,5.888432014399555,-5.207793081889417,7.376362048007728,4.286903814039928,6.058372934676315,10.351403269723225,5.293568873084816,14.532619094424192,-6.856203270332223,17.323686304601544,8.747249888438628,7.699480682646694,25.19461225666392,8.458331954659254,-3.3624027440270616,-4.558760251337226,-6.086514057068005,9.01121003179702,12.535166649390145,26.95701071638661,-10.646178637610294,14.54145736859125,19.34402595423868,11.96739522230266,18.65534855496155,1.422820340519369,22.007590659227645,-12.194203128870452,-7.753406278453021,-4.381920416440291,5.467504337270601,-0.257575189440713,9.05594447110831,13.140131422900016,27.93402958669311,-2.421713241093265,17.374351192297766,-6.813534547921606,12.16623026741179,19.390792251026856,27.51812815875424,-7.286864780153978,11.354105556924434,14.27888371805324,9.00801883091518,17.01839571876051,1.226503931529642,7.946933812697058,14.766292976836413,4.870373223152992,14.65612146309451,-4.110681343478513,-12.732168517640854,3.391715756642647,-1.871670644579396,0.9469967463356781,1.456561120666482,17.49665988450404,2.801110586457355,5.657628109597191,20.639390838752348,4.725841813590347,-11.019650378448341,11.61574128842311,-4.794080407295759,2.1128360500926995,16.57021232635746,-9.226809341612775,16.59999699248402,-1.428664975665658,24.07047837822501,26.755994065097028,-14.000773229214696,12.663259475700944,-3.560728581567936,9.79318341519565,10.525701272889117,25.73813664199652,6.832875965438415,-12.904345600432052,19.64631834541472,-1.3713970826552,22.271995904352963,3.896137965632464,-10.235944328489996,-1.778084544096739,-17.872580643202866,16.723649473113543,0.022265162079468936,4.223721421350811,-5.9872487886664505,5.187718568299328,4.836817309398176,-15.311499949136167,18.105506122508544,-4.223308993030049,-4.48352182855837,-2.992698221042332,24.842634062893627,10.531807595552998,3.703003859506447,16.362740596262988,1.8816299488065056,-11.364519535864897,16.792554249928347,2.979343044295561,13.716117072641516,6.289911133521532,2.609752635530267,14.67339700242516,3.1837626520114135,6.231303013251781,3.477088997129874,2.285865432842492,9.88249384012181,-1.2756510074922431,8.25355386021776,8.427571430480281,-0.9381889126167859,5.768353560817325,-8.944386856010977,15.686458921093141,-17.006112423597795,7.475217153768785,27.11686019578152,9.131782921576605,-7.980422002126694,13.888572026470673,19.79721172333248,11.441685806305118,20.80281805155302,14.461516911893899,22.301579356020135,19.774494920314872,26.8666994522384,6.238606258523794,-16.494935602517423,6.536693523223006,-4.38713879295906,2.372525307821096,8.289260048531187,-0.031410701892355064,19.215303765250255,12.589743722584505,13.42825448570185,3.1319194303376694,3.098243625183869,2.432375422052811,-5.324693421458676,0.5222929741315525,-13.841898237573226,14.001947907759746,-2.3243694572498317,2.039506905977884,15.718645271627953,-2.2844966025419176,14.936718882732144,-2.4580583261089046,-6.489761067310766,-16.554536610118078,16.175185967833087,3.266359887786207,8.539973187614578,22.04945157651574,-4.471563837993152,3.5740854732021177,10.37888632445632,-0.9405558635855726,17.033013183309887,-15.880852511155817,2.7180117833606747,15.46017884785372,-6.385832691473496,-15.029892154864177,6.684420450022365,-5.174039027615104,-9.36415304395786,18.383785871107122,10.125302985448462,21.34773804162029,-1.0884561546602498,-5.320873567457216,9.00180068985494,22.287090522760945,-1.9421547917149802,7.970822030369597,0.2304060897852409,-10.985759411457822,-0.13850585456789055,13.870641628290695,2.697495958108396,7.335790080686397,-14.735606376072347,-1.8785258923225339,-3.0856969560725034,-5.42653652832335,-7.291754687741086,1.3791308979254282,-7.117654103366739,12.086193753562792,1.6558405228710154,6.593571698096316,11.040850876310044,4.442021251187587,-15.55282347674417,15.161254091234081,11.77430659702189,3.8218370717262964,12.058857525636764,9.616499142881603,-0.4828505889782875,10.436877903053919,12.80945293667778,17.58201371215974,7.866425367698875,2.884137060763212,16.81061655308099,-1.5480286482255998,4.172732740862207,10.03719410644511,16.68954446569688,13.244683690397187,7.343598068749218,1.8502922265680368,7.066743334494561,11.369057086829216,-3.9595710110853233,-4.624669194323982,-1.7405302251871504,-6.861204648690562,-8.682083429908715,4.468427666553655,-11.803654204983843,8.031712508711045,-4.466013390375771,15.561390552073293,11.020253220028938,6.603874048409086,-7.1527754727579484,9.777107971246835,1.659544247884508,-9.288531639915941,1.654727866437522,7.098446743421931,-2.3918432858656082,0.46790307477242976,16.557795116812787,-8.291177114700623,1.064572217982203,-4.3524680956605994,-8.759961452498114,9.157654526017804,1.0954996317032215,27.35780714085338,26.860408983737436,7.943380050931634,0.301663988571498,9.54806433009733,-4.972234705825585,0.6832180498164071,22.26686249684418,6.76644103287234,14.713041806950397,14.0486974187551,11.64883548633819,18.080937119834378,10.115512143574044,3.264265192762224,0.6538910938752167,4.129935370535115,7.271317153742178,18.93179555511929,18.32665893308403,-4.739341168373622,22.86721920334372,7.997066471113289,19.526984745425008,-18.872371850519407,6.391511616661225,-6.974141553873213,0.8187038744205068,27.268983266569478,-19.671512224070398,-5.682769980513854,14.630977282169958,13.387014151611359,26.824116269974763,-1.4042471013929045,-9.941617844338081,6.629733032915995,1.5002944691747757,-16.116352296551877,1.5822540534374774,-1.0329590648427533,-9.591370693616089,5.709768914657591,2.1062808506582567,16.1146003032152,9.265688982473618,-5.5114583400168655,18.299389986920975,-7.775078603985897,-3.4935894706219095,8.48835607921044,3.6678917069688275,13.45823683206204,7.038525814116614,13.48243573017508,-6.23318783850743,17.29549160726136,0.6609547613160487,26.35662229171635,2.497782116509242,-7.882601168646419,9.584550761304381,0.07111250257787916,-8.655227954704305,3.9535177958995185,10.584740864281468,10.22373343773722,4.223179075768943,8.51785506738372,23.750043860663773,-6.519856365642511,3.221725844229571,18.404733086781764,-1.406631576781983,10.080915989579058,-0.8785441377333587,17.137192245026885,10.083056216035715,4.120805148771474,2.1610661747456064,-0.9015615494926443,20.788470571920474,14.782106040437313,16.734339911548496,4.364323500468979,17.23098020499718,13.538653070636407,23.296434992892017,24.95512794295706,11.939742767615146,-2.9969369501198457,0.3079472437142936,-7.624353595989803,-7.558521039011126,11.31133004631972,-6.355693220158027,2.0284462817929274,4.531234661856043,-2.9984154463784733,-7.509481529792286,5.4423552310112875,20.093756339132725,12.141320959486888,8.453795036410604,15.999535137195274,-5.043533641523689,19.132424623362542,15.83664213254395,3.1104267477108962,14.815997099525777,9.6403987871021,15.903362279730377,7.082936072826326,-6.625920481722449,-6.921598128999175,-10.231216039389281,7.809471839847131,2.8745540129136558,14.598428254884288,-5.366022343003458,10.953428023229199,7.398209086187157,26.092339848097627,0.6103743594484108,-7.902902771873748,-6.225891088755112,11.540417452143853,16.887167866966198,-8.595751658054459,-12.210111150614026,1.7534501847559056,13.73255217279952,1.4802459226497824,-0.8968517184537639,-4.419040433417543,-7.762990537439261,-1.9288126736207083,12.234700841501434,19.200640289290895,11.499007380920329,14.012716855396222,-0.9112967945564527,13.830898843551248,-1.9904390267919112,-15.23261151492585,-0.730668162712778,1.6078940386717129,9.847855286145812,-12.71887346149611,2.2103674343295694,1.2169401032902893,3.185043580612323,16.927682964052945,19.791852790741135,2.930754248730139,14.215505899177328,-13.017711797059633,13.642998097224849,5.606657750928413,-5.84816153177241,-9.914466283361794,12.282033958224286,16.118883734024585,18.72923991877497,5.26400640063013,12.190652674737432,-8.726641890636074,5.583009101087999,6.368753029444866,17.428669761793948,1.4404649618895498,1.5055151454291735,13.646163140679933,10.556017087327245,21.72181754999737,18.09999871147682,16.114071683318315,8.019828924822653,9.52439097760763,-3.823078613274454,26.01107428196133,8.72317476358186,11.399347902460114,9.686858044401657,10.022309376519349,3.5545822638957967,-10.267926398650125],"beta":[27.12992306834838,24.280830472839206,25.334324184567695,29.351114237800843,15.895141950097376,15.265267682091451,16.666513031686826,22.195276568265857,27.726309871987205,14.341342801611665,10.640222133843945,20.67615262267192,21.313500173910466,10.128539295310222,25.37765673373503,17.762917499453682,12.611324728681929,12.26363400567851,23.699268150378437,20.864710824400603,27.263719868346442,18.250116490606842,16.355815955330186,28.361882867112147,17.896132183192158,27.15587816115127,22.392622207111387,21.08422343707463,27.48286645308162,15.060232789987458,25.882713786361833,10.520818670752256,16.492238873370543,18.356430371673284,23.261000084254718,22.76047893907164,20.511375629795836,14.635183793432143,28.354592269122953,15.844049389111937,15.883310414039205,10.360100392684682,22.677640770903714,27.631819501744364,15.728503898707915,13.995232464906069,28.453814347079597,16.83996102963932,20.3746915435085,25.80814057567608,15.590907272812755,27.039862890512175,14.585727265342378,10.946603133618144,13.012568498093739,27.842006910825265,13.119693201733117,23.238256180502507,26.777569375992712,10.511709300016685,26.609362839425984,15.72862159949445,18.458552559810766,12.961659362708588,18.66847594466167,15.392839659219613,11.376967756137454,23.88042928743007,18.678770302123265,21.916041319811377,27.612928818226944,27.912064326471725,10.094464499166369,11.657351160404286,20.824619222879534,18.389885163982065,27.70777829688805,20.596664172616023,14.868182527803008,21.473373224982915,23.76021962166611,12.177449283343416,18.51020052858607,12.017181281294649,12.281290794071932,14.746478140861923,29.526238633453623,13.239036920250506,23.90224830613922,10.86544175462211,22.76280338517499,10.807070316012428,12.157275321680778,27.821884110672887,15.232175845338523,18.679324555536134,12.535107059326833,29.46542739843682,12.99950030707711,27.15552474558106,22.936322666716073,23.118397045873138,12.317814178338601,16.4143336177507,23.188440824256382,11.353972894684992,14.999808504601733,24.67830758617794,29.404142199110453,16.74659778072379,15.253560436040567,10.638278976446287,22.592974794085166,15.616381993703254,23.083882490493266,19.443337704280886,25.970193663839044,20.904452542302657,29.553476009514014,20.913981811098328,15.74032207020625,21.480574243586265,12.30500327998028,17.330471371336415,21.982483605786264,27.407482977665452,11.716784682793207,14.17520067784828,26.001924235107214,25.233701488056365,25.43846626039916,13.661054724569412,23.958374229700667,19.058742050253294,15.105223179636841,11.553988577498057,27.698993760608246,11.355849632749608,14.163511702565831,11.599833401046622,20.09860142967144,20.625650018248297,21.847707903767013,13.884678104098578,14.86741277417417,12.570242196756944,25.53652986390178,26.543590538589395,25.667476411638486,12.59884272870262,21.509516136489594,20.453963198866543,13.432352868820598,13.38127141290351,19.223563134428574,29.04533575448766,16.522535156499746,15.289973098390202,25.514641434282236,14.399862221580953,14.94334160002464,26.049267094305115,14.970747945097651,10.661486081352184,14.36469883564146,18.333435575203268,23.85115299864536,29.87407653954357,15.621015724840092,14.736134530242966,16.912469605669813,27.801867102990222,22.299828826678283,16.566269980817175,24.582348677050803,14.94403921743006,14.389352198692693,12.640498406125076,27.758127152061892,20.138956245876876,26.46222121543814,11.861248522827847,17.325033445976167,16.222441874367743,16.57996000040777,28.003213405003446,28.38342547958856,21.077562036868493,27.589446373863833,14.018985999582881,26.15514336356297,18.150306528138454,13.796482789323248,10.702429203351267,18.38824077545182,20.68279329887115,26.377143770771738,20.607451049485306,12.86593330681237,25.836400513110306,26.28074599780277,20.070836246724255,10.33255204100234,20.580420163024172,17.95039334608376,15.693531220649973,10.221836859059357,28.117016463032705,10.71198446838574,12.132781822010962,21.00822061146536,25.64999279595266,28.384280220908856,20.049798722454657,22.514084049131608,17.706612045789008,26.989296577200285,23.412929799661658,24.925355283018696,18.521776940336192,19.987096928384066,21.814339530484244,14.50608983945806,18.823680333872545,18.882134925677004,27.498209738608598,16.015922859728416,28.569539499991897,28.85121215513076,25.34134210645003,11.729256972508821,10.357851810442416,10.808170935226178,13.135045303983643,12.523132602841812,17.386831159307782,19.723536642250096,25.5351532020355,21.35826927624512,21.521039738014952,19.618135425852774,20.983143953485342,12.009545986890831,10.806074281941754,17.76667135179916,11.572804979935981,12.034622732904197,21.120012437963172,14.206272471390985,15.92862722594277,21.846599034546223,15.898003021794413,25.336950208213672,21.553700947358834,10.242931930135759,13.971164163847313,20.249564972767775,19.65621857299635,18.493098066511738,19.06157624931265,28.467114068545214,24.677584804317334,18.95196522080656,29.42889582208966,22.1848844773465,21.586628418494158,13.811218611143673,20.786064128901813,27.795115603564035,21.690003330179906,15.166414511231219,11.493633135220085,17.05976862247184,26.876522954897823,26.260481426735307,27.391764914144673,17.806321961686887,11.354164305105744,19.548184783108663,23.03717810841789,20.40074775156759,16.18083479494406,21.30537045924413,11.310495271654393,14.91742045859442,17.754196408452295,29.128266373865745,26.71687236798459,26.059901345007464,23.52748065657815,12.903381834064284,29.42781807440644,25.799736884756037,24.542077474332032,12.626108232980053,20.08284643151734,29.12187332428616,22.4696967898625,15.484100490469693,15.564281438060231,29.23589408454458,23.050489377996204,18.17811683261794,24.057374885821726,25.58254751966352,12.871814190826122,15.974657453174848,26.02526556646959,19.756454071669346,27.34184679094918,27.013252092837735,16.512480093147577,20.99521753100728,17.712831256971615,12.777022569544151,28.584863848576113,17.125464030902315,10.074481961507464,23.938578994200267,25.985673660679097,18.071660513543932,24.258149057659327,25.004867731448076,15.798822768425286,18.77627368968421,28.095596754253084,29.681347862354563,14.524316851786573,15.784327693618811,19.844480339322384,11.258451529996272,19.690035741412835,14.418540779706888,19.968012230647613,13.370437900903461,23.6773427268008,18.1060478011807,25.078647890773098,19.409626906831136,22.79203318209146,28.071002648906017,24.763496340508,15.011354125749774,27.085521511035665,25.47038886049628,26.684143872425267,11.612220538008383,24.503173868991365,23.543270270984074,21.874158670652598,15.402763497328952,29.372706968113448,27.71758998875274,16.321222721518602,19.069508004436088,18.103762847705433,12.121181370621219,25.578036364508883,20.273769872942317,12.620239988689747,16.86875150148296,19.34319879396941,10.09354945933882,29.562782315655124,22.980821673075038,18.278585083401403,14.663098775205231,12.421752292313606,24.610089435944452,21.77573935853552,20.874535841330548,16.920798583371116,16.469444272896745,11.412515034982933,25.36761478060294,26.636169610868343,21.702877597458553,17.536700050081446,17.131052748243143,24.54897996986013,17.631670603461167,21.033101423540867,21.963874737308014,27.83018145010483,28.09974311843751,22.406729712256322,18.43910334656116,20.518925541648386,13.382271044798246,29.47348712754212,10.303567174929565,13.595282954962666,12.080796683352624,20.088503200867294,10.900628099855396,21.824751780179106,13.766245745913913,24.957410399046452,10.253707775045875,20.226635402084874,19.45890668809795,28.25842120314774,20.50621606543846,12.694761869731522,22.40057477555151,25.894257072413676,24.93353235995594,21.867512829062058,23.956911163123195,26.669271144622428,18.441824302375316,18.523084379006043,13.675900952034542,10.553922932124165,29.21314348029348,25.175302390364067,13.638952244985365,11.437842244572538,11.155447388109359,24.11133255856861,12.275584623533335,21.049563386337482,11.80946474570209,29.674549984315423,11.473215181636519,25.173657053852978,26.636507382023314,29.307249671025623,17.59616914279127,12.67533850159225,20.59344798459734,16.38963150833728,10.744520077098926,15.960592990807069,23.330609071255243,25.08139317288693,18.152444755293935,24.29330210570502,14.66096374214449,22.85400940373926,25.899554408218574,16.941132117884194,12.34899418846243,26.8781029085291,21.315446679370112,23.24062018206524,28.53144360170541,12.146646317222189,10.397582127458428,18.25084440150988,20.1234842843067,14.198620832439882,19.047128860427208,22.56089871203743,25.44441351922886,28.706360740066266,14.560287603270478,25.01168669784487,10.923096115566313,18.128181518975815,21.768403644705078,12.04656652790443,24.22639779252888,25.43691213084324,24.013018274232323,10.4971976252865,25.669234827793197,16.502920731629082,26.411312580640857,14.138622860283023,13.584053895978098,13.66692842361996,19.094140352644366,18.157830088693405,19.13757393075251,26.690932936585135,10.051559158995689,29.128433294838203,13.0670634914614,17.92752396995491,13.562016826924683,20.913182493483923,21.181017343933,29.667246792095842,24.23758789822338,11.459372638381616,17.557512872346507,26.477214885723356,11.6735360824112,25.108444844311965,16.011516260265314,11.358816065190197,11.643499007633697,23.234508392252025,25.337116951257986,16.38056917776748,11.132425466201443,13.265315880481463,12.816201065286595,13.30026224113935,24.60590077735769,13.672246357215286,17.34941846908978,20.17501163130421,20.941090006865434,26.29481299238426,16.889802485544195,14.265924535115415,18.882217200160596,22.626395702171024,28.754596659898645,29.87157167777669,29.111143088924067,17.07001576312999,25.087941241196905,18.217046513640433,15.069415480097152,11.136521562312929,26.095441363417052,10.032330178901997,27.102625864891547,22.312075820759677,22.806273883373457,27.376704391400402,21.473162913842643,16.94917446283423,12.026674175517318,23.748707650986,17.83944639771979,28.683941047337438,16.219159566212763,18.262303517993068,10.732576712853689,13.373272673804951,24.227766728219635,28.74278174071545,13.409974318880678,20.057487697047303,27.653990805711253,23.986556381432184,14.0618743405678,22.187635834718805,21.646823863922393,28.29567754235791,20.000119729576788,17.691618639823762,21.079436200055053,13.804001378649557,10.916164141241808,29.246134705042316,28.49743429436395,24.352487193077653,24.644476500882856,17.749960665799463,19.686057964076507,16.205483505176534,12.653598767627132,20.750532781239365,28.37875453413656,29.394202769086775,19.57817590992869,20.81052040866013,17.6605122311039,14.703325199722826,17.98286772870864,28.842239468038883,25.52826750094826,24.84128350125371,16.679447528511684,29.252754099666785,20.997665564147777,23.140082182246008,27.330362733752903,27.123688075358746,23.54031852839748,17.955107201310906,13.483519549621082,28.154836758940984,29.60016193861492,28.135280941729768,15.31039570803349,22.508575919034087,21.206357457564785,12.032044215174142,23.3007245660854,15.467832406649036,29.27398816277772,12.368917929790118,19.569489161704464,18.91464654353421,25.87918705535651,10.998996343345011,13.262588599092684,19.473236291585387,28.319277261839375,20.3721754539325,25.65641819426392,18.202388378599338,26.407207740394036,26.01086706359865,28.34788260590305,12.210189528197501,29.631580380075132,14.343312374480508,10.850459971055209,29.71125790681528,29.96221111077254,26.420625907471084,24.906398965805803,23.282129987621385,22.119862707200582,11.263613681481628,13.779658885611976,22.404113330982454,19.63925952678677,10.45021171390255,12.907988255190457,26.91701171360686,13.087758988374354,10.76088208941731,25.224995705802744,10.38800300379011,15.712888745413371,15.87069800169687,19.273248825863263,16.700466618576527,19.23498179944575,18.568273476472573,29.67715644289358,24.535019488674493,29.577906041431376,29.959101323881434,12.104072337052658,29.819862122587885,21.764925969126445,10.625620067456474,19.59458722050201,28.637729302179494,14.458520251157431,13.263256695724607,28.969802151469256,17.395712095504297,28.871579861829847,18.38163216368415,18.521620961916952,12.554531753254121,12.08867805112754,25.863740858409013,12.505140492059033,19.18682483107865,12.82730763125973,19.081652965844874,16.62781153262411,11.47151290693946,25.029262709107357,25.000006657662915,23.0218590489465,25.332575465073795,27.69148622163361,25.8277565031701,15.530557491166487,27.167059812115482,24.30543858287779,12.909798664979068,24.237692040270083,23.271086556847745,27.821119796197536,27.494945408554727,21.380460981412956,28.36709848247495,26.852569247017296,15.355191892305298,18.136079318266674,21.889976116479048,23.06230993857855,26.586651159502566,20.31437557824015,20.40598139532328,15.024470097022853,11.611366794804168,12.888464203937664,22.187731027096675,10.27124524013782,17.73735911981188,28.48537506213358,20.494090843621635,14.344672687754013,21.870722891719208,21.49718787050527,16.607823630899507,27.308274175513354,17.280782563104545,26.668032784297758,28.91466605617406,27.608216896961807,11.134644058778914,10.131443637168926,11.78662535861752,24.334640188580508,19.606640792457362,11.879560602985588,17.882578126744377,29.716435274536916,29.92599161974518,22.216451789518473,13.552348840770986,24.51640307209036,28.95658940418055,20.54845705005065,17.45428474526532,10.192043639677966,18.814668895442573,13.221209904568369,29.130468798453236,18.97513451797611,26.551706365702763,28.408982863840446,12.34166900630305,20.910521888829358,12.99223874557458,24.961129435367084,11.743700204636806,20.662471346996,29.39703747285646,14.839612586295011,24.745616435047843,17.751351247715984,25.88476742382673,24.013785474395867,10.558356103255369,15.31495804542324,26.131275590000964,17.962677569478473,11.486494605443793,11.971962410448853,10.016925697568988,12.859900440502873,28.748144260612346,19.23181019713646,26.246658844400812,28.548698436587685,21.63238251713322,10.672300611427396,24.516444857340005,20.865990631951647,27.116786781474897,20.129301514933815,10.786179300109522,15.554593547624505,17.684296770083897,13.596198859289581,23.249507063644174,11.637256813262162,13.842848165409428,21.02640591924892,15.90336788241201,13.250943735771461,11.151181106765144,13.962811892356246,13.820258010934472,13.420607871805545,23.07418138107106,23.668725117209206,27.696290625318944,12.418293192543626,20.532396156426387,29.140756003384645,10.053995141959739,26.083300111740705,20.204717835179373,20.041751795009702,18.998609658771368,20.70629995177044,29.00533943701285,20.57661028635872,21.527480335092278,22.76571461598856,17.403747588142014,15.553294437858462,24.546347764276444,29.01885218861423,24.465958335238113,14.388641281102284,24.88298321928258,20.27874628455973,20.264328531084015,14.447898562596041,20.769179022399904,19.378519048153375,10.265704309100672,12.19820262129149,29.143887018697537,17.131268071005266,28.607914524125952,22.519357528970687,16.747822233850247,14.041243148237005,25.749519950226173,21.505145420873863,22.011665543989423,25.6955515681129,11.031685629236382,18.797165395969472,24.871919146262943,11.52434176832491,12.016694089267968,23.083740580454226,11.430905948838316,28.784104921640484,13.394152543940079,12.68248215630139,12.623448949734266,10.589580381596967,29.622890059980488,27.868772311664962,15.238569110270355,16.10646695984532,25.886097580745236,22.69136340342361,17.732852086280086,23.202346926752316,25.5045877080636,27.66780233207404,15.967017158104845,28.038832157215193,18.29810401406916,18.686200219007837,22.08310158385582,26.42181076592385,14.150391555958048,24.090129354474467,25.329987610297387,27.43092173643933,11.189584297884924,26.152773480047884,29.862987264891206,26.27791675853615,10.264731123370083,15.067087956461073,17.36199412328518,27.84466397672852,27.919781198514663,10.143842929222329,20.502653086301535,17.933885864511197,21.539820698728548,28.98549731109087,25.630287161051193,10.185400931986921,20.71185034607677,21.89233750733214,12.391589259875278,18.53697607605513,23.515514196334735,10.664317065785603,12.615848315184497,11.175805600037712,25.489345751205477,17.844319491799695,20.080641118595686,21.273317347749057,22.039081419680787,25.736440091721402,29.043963295448584,16.551064463154837,21.63754645017454,19.03592551318425,21.116000445220344,19.335185516447506,19.834422146585542,14.409756496240224,28.723458040796675,21.910099128393817,14.219252582745296,20.665775071703596,28.524437597864868,16.339826801734784,29.97026819962782,25.61152948835483,24.445057146006775,16.44982121214528,25.346023764422803,24.988812613712703,11.590660805824257,26.113730315598257,26.831550463487474,21.06483536658001,24.602492663070382,11.937760682540723,23.590414143690637,23.244975224271876,28.158047152464064,11.630088759869754,26.387151576573075,27.646001142155512,29.04968280230274,26.633909487534492,11.636180827945308,29.09800939534555,29.294018787333762,23.758636356371685,29.687905574481512,23.037453815343213,17.822378292675634,13.016595192235943,19.865045626055956,21.522531488973243,14.331293596828548,15.0480280180034,22.208339108326875,19.783367333557255,21.586342459304788,16.530781165306557,22.65995214902798,24.340834622127456,20.702690532531612,23.721305804826077,24.11253942234724,15.695075247321055,24.294283655653746,29.67511958922866,28.137594365440695,20.545735538102893,11.208557127042113,19.39095789184539,18.30527747338163,21.61867895587248,14.76649233484309,12.523104976488924,12.567916475655165,27.84087583186875,23.829007883610167,10.760159564940821,15.11584739531699,22.24536804557601,27.97827061006236,23.515601925689072,10.146643288326306,11.333695688956166,24.55888150752508,21.63460527341385,12.780795417176796,11.857043160737305,15.724586338160783,18.805849865358006,15.589350297224538,16.817892596921876,23.34191155602921,18.745741145385125,21.782492407022545,25.00482518297862,25.936171464693444,29.812323144739263,18.461298307642956,17.479956357580193,28.20139805868309,26.5261498175238,12.670295595684408,28.38526005820801,29.476884582747612,12.856305159780312,16.689081699881662,21.141142197857675,16.07321153347309,23.28327779567857,19.780749839855353,21.48458439491194,24.584693203302134,28.97666074870577,10.177515794279373,27.119125045949936,11.868581594624473,13.79703153737851,14.146638780948667,29.22406258555004,20.875288887724736,29.056690775285283,11.25534325381044,21.99003729758892,18.48512106415427,25.193957566571545,22.002563298008507,23.352367141438407,17.49235960574163,11.134141448928974,18.22818233922886,15.370119324420752,27.84224022453818,23.776066993055874,18.42308112074376,11.779263197983031,29.146956563124608,16.973018409767047,26.55138596214316,28.439362257153675,23.115456386423496,19.493978533576147,26.827705146588347,10.191218495787503,11.22707486968876]}
},{}],115:[function(require,module,exports){
module.exports={"expected":[8.810396517635658,3518.381851395898,0.8943167324733661,1.1813396595002856,1206.8173262732162,96.40993111885666,1.097592942755134,9.811584086135857e8,1.4773916500094177,1.5606664640546593,0.42999105972665475,422.3455385265977,54.064076357977065,157731.8813992422,1.0372202547869356,485.70324977235475,0.625048602743476,0.05518740223826072,0.005466008500694339,3.603353152830363,40.335078814941966,29.01024281022811,3.798690253437788,13.784777666783322,9.823399123151813,0.05264809699020586,1.0354361031868926,3.08268083566354,1.0501004783517525,6.913410707498248,0.23284513188759864,6881.55334007173,40.28550993674785,25.08982942180859,1.821267986997417,0.2824939416818623,0.4781835515600149,1.814622174993026,0.7101101003118753,43.99306588891682,1.447339507080974,5.006620150487915,13.09772834146755,215891.7299447261,3.1138170271750245,1.2981522691790313,8966.631465900002,4.002980545470016,0.38838530885364264,58.20906815134087,0.5582591093012358,0.14287553459715996,5.2719997252041,2.6913197755922703e13,2.66253296199923e7,189.31803471080013,1686.4711191648817,352.1884273810083,2.528410178413888,8.72697929809737,0.8284384504411672,2.5732065042066266,41.668533259991804,0.07680493734368947,23.188768173716753,1.2982526024225824e7,1.0573371115091557,3.291898737230091,0.8657871884754109,15.599920065538605,64.21127194415794,18.526754723032855,0.41805199752484157,0.19055299652045193,4.562395213306421e6,1.5314104414267107,6832.036800593625,135.9966272769573,310.9434804543873,3.0843338974295305e6,1.0736892506368305,6.325230683457057,138.81638561669982,1.011414326798869,0.6105996185638962,0.12491022850843485,0.7320930288954005,13280.68416646152,2.3515112164457284,0.06358051638010874,0.8604419492802284,0.1485892899860427,4.0274382151180435,1182.0146958417113,0.00807634803354269,13.332059025936921,26236.623524073515,4.003605208632255,0.36693267099782745,144.43371545296804,18.925899811689845,1.1833741949810084,23.94908622364025,2.917478575209743,5.2758659554893885,6.3540531359964766e7,5.841381389253751,1.844551734014002,0.39612122807014866,1.1552407770939297,591083.3689081082,0.06415693777689471,1140.9209672383197,0.4652696595780759,0.7366227558459778,4.522265047429651,1.2320749101030763,0.9418925221278344,0.8971360926544854,0.7428750210769254,2.4852618675863027,0.7038901418352925,7.7446487300953315,1.0525118573248634e7,1.0217419840150102,0.6599331430430274,0.39756037256674875,2.043100100246844,1253.1703751589307,14.192262898874503,9643.525936479216,672.2845118301102,5.044344505670411,1.0405996409553113,1.6887887407778832,1.9334138621641832,0.4535450308394204,1.0595547203488098,207.78634295116242,1.3863512910680402,30.850308406932125,1.4341818916300109,1507.719853173623,0.6398270556108969,1.5733177280209278,3.3705083452166202,33.340427175259734,2.0425298421896225,191.75580555079398,1.0598317512864976,2.6666417172291172,39.74180986335094,501145.32869158086,1708.3644162501096,3.306056927595314,933665.7464673391,8.910331982447827,882.7303028001129,1.2615261285446744,3116.0077484869234,2.2646552632689865,125.39411962612935,2.7336116325237656,0.08905609477509567,2.0007596748787266,5.174673489457782,0.7349014142465218,5.682613561939966e6,1.0155269514588767,0.741577980667737,13617.907855673657,0.7564248441654391,0.1861395113813184,2.5470670814653475,2.809523109373314,0.32750654177874666,149.87680921594404,0.4128859699244624,0.8183730307627125,45.98022565283071,0.04960919481163091,249.98485779753034,0.7614337255512633,5.976483077849059,3.8823432744396618,55.326225577541216,0.059113375619891335,1.0253326392856499,1.441302142578243,1.0441326704442372e6,1004.0998084307031,11.50428150605319,3.030500333066832,2.662149911320312,96532.3081411483,2.8058695091735295,9.291589823067532,1.0071621585604273,4.054418539633229,1.9035847488975064,5399.264925216525,1.4999706030464721,2.6391497760464784,63.97019717309394,0.77848924614536,0.06483022720775332,267.21841426539385,0.03307624385140517,21.74337920602677,13.47094217890084,0.9338190288275572,3531.7362749701447,1.899188071219827,1.033509039453611,3.4761922532740925,10174.335383752972,2.423620999896197,0.05548605355864028,40.7077035955035,3259.1426574169664,3.195755734249392,1.2273543305219536,0.7456149675650765,1.503839666790942,0.011015246017811006,348.679722158676,6.3004190271421905,2.437344969349934,0.22012203382959186,125.18378633164336,0.8466042951981361,57.107555096990794,1.3502350988804264,502.562345457933,836.6527775913166,0.13063521345776277,0.5979003533988556,63.57887534683193,41.942377993681085,0.39725069763423126,0.0417868306120067,0.5383451789978632,1.422411209828865,4.118684220026238,6.454819545038981,70647.96086955149,6.507329206338726,3.0585002023918353,75.92152034096574,0.06517497828519987,0.9759361797847939,0.5662957537326757,1.0747910376167347,2.9721553836427437e12,0.008156212893211352,1.022981387616445,0.8692744704668018,3.7982267602128494e6,27.276698120712794,1.3354648602766135,3.4106841974678743,0.5500025259475573,0.19620483747117035,1.1522903713389272,4.008980063071248,5.6434340602804145,8.098624601917182,1.3789742438804167,342098.87465036457,16.829369171320135,8.534204803529509,6.62492315584123,3.8247334553608396e6,0.9996160532321022,1.906095961417351,0.9104080725746486,0.034422379967788,0.14785261387380993,12.62165159072243,316.7002432414288,86587.07266458713,519.3016671962616,91.20043572248193,254.57535775806608,0.09113551646200278,0.0184314994497672,3.8853371168032607,11.71310847538654,2619.4639448973257,3.354878978149267e6,9.163195496171662,6.604832836258061,0.027937936906470708,3.630025389172871,1.896269511502229,1646.2849515529172,14.557105047217915,0.6081221748068019,2.594408012438598,1.3986197842898358,87.84276384322692,2.391460063318331,802.9858648498027,26.714490768479415,0.5871335939505049,1.3439524601613126,5.766528127025466e16,0.10580881947464348,1133.6237085315722,1.6349763180752206e14,20.397428106031008,0.4145077659393497,0.21568993970394143,306.8861405601767,0.9932325996053092,175.71880813552787,9.116341323544855,1.8684225699686585,4.355854017339295,0.08299949561665271,79.82621985132582,0.5531588449130823,0.5249598633997397,3360.4786206286453,72.52749534314398,283677.54332717427,1.100744003016677,15.799249514156672,2.4503092064131202,5.959450291295656,511.0803402712481,1.5810794872674014,519.208620668827,46039.480591060754,4.146269371810735,8215.139848188599,0.009493060855737508,4014.7559544496594,1.079256398579392,10.139029433515848,5.98367178258369,1.123443588652476,14.355503715872164,0.01926660746841137,1.7431539263139286,476.2320521818047,185.6769383460907,1.2708054936862752,2007.3851232042218,1.1682126355876976,1.3300803490047068,0.541537161258336,886.4135180432993,5618.710518012479,0.546205949589177,0.3870532655912358,15480.546697245105,5.517208993324558,65217.39876226809,3.329831196535464,3.637115072580993,271.7134388506505,28.196271199957188,2644.529724501105,8.871448606203991,5.926044343047748,6726.628415642774,285.4011328768677,0.7703613001269345,1.286225766533486,0.7971583985840696,3.7571737184231027,1583.050319724052,3.8810461225508144,0.29744752703069,7.455202335136185,3.2984187238571594,7.45985663368417e7,20.842162518667926,5.828626415763521e24,1.189466795615628,3.448032927016164,2025.4282184075507,2564.701721415207,0.4813769109466451,131.22208786783435,8.8964040673512,1.1619192536647218,9.974331172187886,1.3847410777763762e7,0.17048174446162054,1.7523008917163194,1683.9978693394185,2.50221472284958,0.9442191150426114,1.0387723586485247,1.1474005597483163,1.8594827359086714,59.30625419970499,0.553072227817879,5442.703984124478,2.9829247710425073e12,1.3940386755409895,0.99493173072572,5.783423664651801,0.7971174442887572,18.840716396371484,5.409470939405813,0.4772592655775325,103.53513688452595,2.0705368074943986,104.12663312794939,1.1529655781197632,0.7056503619602565,2316.2967944146912,351.5782342157595,0.5793676785591395,1.8753559913399718,1.4266397535127173,12.305576134358564,0.7826124401957892,14.863578844523436,0.05232299828053048,3.806443129566744e7,2887.7752943866817,75.52590172844378,20028.563920855046,144.80991237749498,1.9200765364334902,314.16729830482836,0.07921776308382358,261.6796377821919,50.941732093287555,1.4458928262778574,6.941379977148596,0.0888477704823856,1.0975202175354453,37.22170782513071,0.08936153000499816,0.36002755087668403,25.625818098285734,0.017940870218707865,2.7502660045091956,2.7060040058881563,2.6470676782802327,0.4958507637975981,3.336926941776729,0.43121918413531896,5.223533009719386,0.7901061793787119,1.0718905839361954,0.9241317913161845,3.9007989451638587,488.71137936818417,1.0104776674553817,883.9743150689575,4.572238609703822,6.217536609078772,1.895127065817123,1.353083357292153,0.09156108522484391,9.096454152555626,0.39365224510359054,7.739518944508702,0.5359555940209244,0.9641102679446503,0.3344066102333481,0.3970731954630422,120.33815438038623,0.9942469639862218,1014.4105542913012,0.7162431144061016,0.9813760124716171,0.06319494807159924,0.6571409056485116,605.2143610297037,7.463686608709317e7,2133.2246840087273,21.44200085773057,0.0139392123928284,0.2313340013747994,7.800047070557515,10.644958824120781,5.711021024651511e17,0.018625026674331645,3610.360008515626,2.495893576184621,149.73330517703587,4.107478747278328,6.6859298536113325,0.11630430686985685,6.036839195896987,14.08426252900556,3.12985678002108,1.4531194356374304,0.022087302368416883,73.25028919930843,1.0358291917632312,71.42003081652982,0.019873013769708615,2.451657145152896,508.6746531046409,0.7371851914647489,3.5231438263675976,0.7579164390179087,0.6977690307693086,1.4190221257534392,1.1031718409396463,2039.700812667232,2.2022291190654353,0.5901035627175614,0.466295483454755,0.01682132679418368,1.6264508848419856e7,75.14006757650876,0.8172419837250442,2.2142284303850177,95.22719301735802,40.50807800508726,0.7057295705333474,9.227091294494647,4937.653821580123,113842.45845577503,2.7962621006914468,5.035281616318552,3.491152358713291,0.1165499038524854,1.3551189216404735,267.5508001143726,0.4950026164135855,7.717390274926292,4.2731853750018525,1.4050580735484441,14.265233724447807,0.2415377660276542,195.70066145603744,717.2549177167552,0.8157779026976947,3.0278254254554198,52.0698274132014,1.5245128204443699,0.07230554725523042,1.770718965097812,1.090515547277246,1.0174533396482335,1.18331184768835e7,53.16963480931875,2.4664690474688977,1023.2880159199983,104.536158206626,0.4208918486060179,2.907785146156412,0.340259119642716,1.5676407748680223,1.2061873801959135,9.99324425081671,0.17496654456996738,1.4043253377415827,2.251639031283931,137.07367066590712,1.039681868000867,14.7289272545758,3.222360470644248,119.08868720103584,7.934706571392323e8,1.0494947679232278,0.5751500445592208,0.9158581106193685,0.5721780979621419,39.107420994205775,508.2356519033096,1.460779247040111,10.20446014899539,30.89427519504678,0.4737990520671681,6686.787205960655,0.05881745924221028,2.396227724433557e6,0.035011022583602384,968.8664755262552,11.222352392329256,0.7355921288470602,2.1036364905341567,29252.30092778233,23005.79372125778,1.3289068153585282e15,12.737899592705087,9.822450939791501,1.6427103833759582,2.175054246521117,1.1962693175001332e15,8.105865848867582,3811.428019015661,251.6260186012142,0.7280982349234008,0.871926520053497,4.544633293302118,10.73103136629214,49.26817358673925,0.22544090641311124,29.878943725292075,0.05869755981240313,0.8882211774942695,707.8940626115818,11.342410873522734,237.3658663182125,10.8025434274126,28.605243012843378,19530.68926426842,53.470523074282326,0.11407228428951485,6.4178276291867355,1.0780090635185975,45.76955087721458,1.0933471379693613,0.49600108561050854,4.592347497221096,0.7031045736448873,362.79019771303297,1.4688866654558086,1663.116690570106,1.9399848120452825,59.396032205086215,28.924600786913874,0.05513432152291991,457922.0012230371,4.401361298339857,36.511167182539744,1.2693608723271192,7.3482452543228085,0.2597521954038732,0.12448302865001887,1.0893254470940497,5.956698061733398e7,0.7119408133869862,21.857460944861167,9.566974218037393e6,156.75656989620134,37.18751017962778,9.526377611503017,0.5527578185095493,3.20124060606686,0.43975109609060803,11.876031653348132,1.3470863834332276,1.3020021869907301,0.9880966383949545,2.6036583332768305e13,6.559289183996489,240.57861965948365,41.844556674072614,4.605253049901017,0.1583974911038752,14.885788737410984,7.4033905255457375,0.587544128077864,0.12373408192176799,2.5806863403150877,1343.029427503195,3.7152022617258362,1.0396080126773852,1.5974322635084,0.014012728352205963,7.389958064902966,117.68238470982386,0.014009687952115393,1.8552510399843047,21494.70718333498,4.8921824131048774,0.8281832302201741,8458.085188638997,12.07509422615065,23.328599609213867,111667.11791686899,2.9453597484059753,2.806670796343379,0.7789621983442444,22.5016379302143,1.0407075836029953,72.76291802789233,1.356057125111003,1.2459832156317192,1.177773205480707e7,0.8985861354907393,101.5218482507065,1960.6553296146535,0.4863187684271586,16.699013404452135,20.71514405861025,558.3682143586834,0.31305084210359785,1.003795227594211,9.171729799549393,2.1433846857888246,2.9199119894450765,0.9500059671940512,2.400951020933295,1044.2640649981554,0.9699611012610925,1.8411738626982503,1.288527777031205,0.8254859259167722,1.6869580693441484,9902.635124447186,1.0249135639089664,4.990935903197428,2.6247610659818754e8,0.6474662011832113,0.20542779324685825,558.3899956001022,16.066389996320332,3.563684410745825,8.27799524169968,2.8509030168466093e6,2.4231379936852542e8,0.5855820071485541,2.0482848055479157,2.755388561665625,1.159572817127253,3.63674316878677e8,36.44764813370671,76.72840751619933,127.92054505374168,1.7816754208679155,4.481829793695054,1.1489445520194708,27202.567124363606,2.2531356860393363,0.07795172060733255,1.5521334734885417,0.029128072345805806,4.97885947779861,0.8889369013758457,28.5516432600429,0.11455429632184005,0.35941724702945244,0.9127703417638684,3.376036946651972e6,4411.258716568951,8.888602761706759,41.07019463380786,0.022193242674748884,1.5532880647130451,13.17261050137135,2.415294176006645e6,78.96903291316816,18590.4392235817,6.121757426352316,1.152447771537025,0.09752453059747088,0.8747831199771934,1444.5280105418074,40.495106033389575,0.4403708070104067,0.2517563103207996,0.9925265952450032,1.0201350093022308,2.061509923137699,15.18300279238319,1.0207600018912304,5.851321771797011,1919.5217458684863,0.05714178888790286,0.23847371677344933,105.28423535307195,63.659359193094744,2.0058378555802714e7,1.0545228499049955,2.023873730443619,4.173438263737731,3.1415784870995003,1.0126398829162213,5.633240786821583,95.14130967454935,7701.2863312442305,36.017738321509746,727.2074669797346,2.1330920171108316e6,2.2950976287016576,26.790129233753795,27.17915028112155,4.14644229178209,168.7646087662493,2.1189748205896324,0.07474483850578738,0.6433137708822387,12.10735830062368,45.67534168220701,65.1667077585164,7.890025147714306,1131.4207011543156,16.78427612343084,1.7019772583222412,151.03585990292163,3.4287310148263713e6,0.603784078119953,2.6502659086597706,521.7306081063908,0.25557467410778745,377.73260952030574,9.178588645439458,20.427762053675018,1.2439717568851094,30.502192112421472,231.89239614363876,1.0058699475489086,22534.826850385238,5.489795465746093,62.32718441284251,0.018756199735335162,0.1925958175030923,1.1840758853467923,0.6749030018167577,1.5440088860275871,0.17367454957419312,2.2017814562556213e8,8.546302423330449,0.612765151512031,1.0235821909727691,4.532910576394861,0.783604840973218,0.596583203408265,8.685369121450071,1366.676802445052,3510.8686764779086,2.4717791989417757,0.633678275334614,0.2928243750481729,1.8231205645588473,0.9703457688188434,21.659661412068562,0.6277663758716671,3.0547111461208874e8,0.03103516144274028,2.2635824386949617,49824.57359279244,152758.65757922726,8034.261115092862,1.0705199189388217,0.7771211055644418,0.9347598281276206,0.24260889449599476,0.6416293137616678,3804.876076062917,11.822694969392046,2.028094690023539,6.805929923891924,1.1848964492875775,1.069114549817323,6.569194700954716e6,2.021394577421599,0.47658344898682153,0.9839953327897649,1.9366354317306036,0.20021142616441487,1.0646395952945074,1.4525134163078768,4.820021182567726,9.016976955789875,0.16037045341477446,8.401525589219172,290.03350469199654,659.4837812534427,190.43772046742262,0.03204505950934315,2.8381374102192725,2.915180385836969,78.42230527439335,65.82908082087432,2.7447219175478645,7.735126261531838,0.35353738210869323,4.799752427672552,201825.5498000325,1130.2664105886836,1.267616112519488,0.11991761126895896,7.248409558590783,860.9551118442456,1.539533134877882,2.1483981696728307,20607.41099448818,4.137427262173316,3.312820895871113,10.599292937013804,252.24006681113616,1.4535409399378107,2.5325112306255924,18.00372811901185,0.615412833717428,721453.2418208718,7.290956325502412e13,179.5384724495854,1598.421749145688,2.602396726108912,146329.42539310452,0.008134558679701963,2.1468553297186967,267.23943590770745,1.022034621618465,2.9312338981287915,0.9517022022897852,0.40754803710759213,0.8849359060259798,64.27201755102178,2.2789570651245383,1.288643656014548,1.1384798540973087,1079.2995041975332,7.085188568534571,3.7925357043157004,32.00468626598254,26.17231606095693,0.1735483144528907,0.4886525080030699,116.59377661803808,1.013206422848104,3.798724438785352e12,0.33474654278985894,94185.74767432496,6.604280257929369,0.14887268646058682,3.308603351657688e11,80.42468292707233,8.213992826260046,1.4255144354076154e9,0.08714453090921458,4.0952016764908326,0.054783200594028664,235.82130540909344,0.1297090255348322,6.630885231509233e8,1.430368460831268e7,3.001375242470091,37.89081702617576,1.4378907544872486,2.7038479338165466e6,8.508678209818473,1.9396572544144837,27.757978416033897,8.55269353420618e6,15057.625369769303,0.700978892876967,846.2950677648395,1.4466433116581559,2400.474988766925,1.4076912113009254,1.1372435067898143,1.7586003849751386,1.1107882213871991,10.372965392097147,5.218020530379355,1.1156856598415366,2513.20478133733,0.09470292039089345,0.5444664990378528,3.3149025537720056,143.1865489038041,0.26984633663786417,31443.582414443463,0.10077755557858675,0.4737511491434187,0.464427551500311,893374.3932034455,3.510011371370539e8,9360.621584743403,1.3507380702754537,1.7194304028898428,515.4203425827541,736286.0389627949,0.7509890035851344,121.37455710845471,1.1210049768817585,3.475445100224282,2.95322107463822,62754.73867855753,0.7759650447158466,1.5834080355334288,1.3839028391663082,9.48219138028701e6,200259.65124905392,1.4387517540252088,1962.9670974275857,3.4871261650715755,0.9811910163607692,34.564309586274696,2.6174276407113476e6,117.98132166762946,0.22967439917958493,9.862291306149809e6,1.1965179079883546,976098.2422209098,7260.112072753823,27.20519527653339,9.624548194777927e9,131.88770952358266,2.6394289976073395,21.14784628362515,2.6293196392063547,1.0666821503653177],"alpha":[9.718667351191868,3.910164624937995,5.767923973648259,1.4784547983082685,3.665927103192357,6.54000108721414,1.4682411198081957,7.110408458996695,1.4686349862204406,1.5673128629971678,5.990264020659541,2.2064069436831746,9.166846012785449,8.199389329524575,2.1621527584679923,3.5752062869909085,2.2331981561283087,4.620571761702868,9.766641254160993,1.2728710706629975,8.193852075673476,1.338081984888042,1.1813781204265061,7.480381480311403,9.344650872811961,9.914898408930565,0.2536483983711091,2.095729256758616,6.356355361719963,9.560283533310688,4.214479843075207,5.402765614937035,7.167306701371892,7.415030963698648,0.238015567156995,2.859965066825314,3.9254178547518848,0.5341875172330623,1.131572870457218,2.749462490042507,1.4538699068787664,2.113621812426887,1.62023805989167,9.706380564418392,9.80025373832177,2.1821108486603746,7.679312054694543,3.2306294030439853,9.40787031509773,3.3250131268131544,3.9218075214780423,6.224382481896478,2.3325709261809524,8.033861374511726,7.957113061536518,2.593330393216373,2.187284799073055,6.457835906057101,6.346102562705076,4.601524801740209,5.581163563397502,4.298298483379551,7.299254302549068,6.595566571527258,0.8642046917691659,3.814600047775456,0.12891020131495345,1.8695891763676031,1.4330668274495784,5.178318243062736,7.35958793236173,5.489297982852392,9.311019442959276,8.882194519840256,7.885156434340912,0.44253637319513484,9.29856445843127,5.063302019099185,4.3085048406811115,9.520502408450106,0.6774097436668258,8.453439899757086,3.4874100680364584,0.6258451982205737,8.635725430971522,5.598826967464021,4.377581221960993,8.640833588229974,7.256881120438228,9.570436394132212,1.2089049053803125,9.199300703328987,4.146630605950663,6.893178253486951,8.728562309038015,5.223526355314054,7.673787044758229,3.447762566248369,6.271676576340335,6.322584981235231,6.080351166070721,0.9324192653962027,4.987684758892832,3.320233989930488,4.06888254610452,9.903066769631753,4.5925869597133655,1.3688957003304125,8.80831917867978,2.494575069346352,7.856347035774323,6.25901158900251,7.018359987158094,3.3609754623388177,4.271896010347415,5.781896078184772,1.1602770188250866,8.222425368475932,2.3843700278194335,4.199533720488235,7.878755740647865,0.9079905548705924,9.317641774044013,8.017181103714666,0.03987342307914421,8.473850082932106,4.28591708063951,1.8286027651123082,5.070090206643545,7.4418839468799,3.5062306885805095,5.487581527996288,5.548719025434914,1.1705111710187865,2.0976163369122958,1.4172840704064127,5.533426603658262,3.3899991814280384,7.763455429774986,1.9157644116707173,9.013658408802865,2.496176126458751,6.927963694430113,2.4495138880342204,6.844703905039591,5.4425570979508535,5.466075118297418,0.9764509655037568,6.09845648531103,1.2056350074229716,7.140200253353372,2.317209742087709,6.122434270028103,9.882604007320136,4.383127607053552,5.426200714778579,3.0936611364283007,4.201128017387081,0.26900507331071744,8.956908075830068,9.733230663448635,8.958009693966005,2.515661778031202,7.070958639035907,1.1734716655101995,1.0669722378817292,1.129777878058984,6.679210067649857,0.2047921296134092,2.408822323034321,9.964859488287567,0.538697223910054,7.86123340121825,1.2173417520057295,2.642992062471856,2.740289526352302,6.34843898705161,3.5063646166326135,3.002952749527039,4.637584019545214,8.793787213848107,4.345028349219026,1.4126220788636368,4.8895231418050145,6.709457560474965,7.4568442695456465,5.136859319521321,0.19969002794760105,0.48264149659388966,9.051527729137954,9.573310422655283,1.2792064123117353,5.349455623152906,7.910094320681555,9.347936548856573,1.7337635454452238,5.421923479220041,0.4917580193751059,1.280315497182698,0.8450673326673575,2.9918018941687463,1.3223054931358247,7.380345231224257,4.464313342534306,7.053450064025313,5.305744222049933,4.02205630509048,8.7233128659995,9.67626796414849,9.305078840556476,0.816881240264129,5.576025428548843,8.01109076580765,0.18020975614989831,8.471440823306924,4.138119304750536,1.0498477505007053,7.796053334241526,6.035853306129912,7.3450668511764405,8.022808666425021,1.9692896034219887,3.7577483980897153,8.45675999866397,8.089284449919184,5.765078299900026,3.74090916557432,3.8044276758021156,4.298070806724974,8.706687790479766,0.5259626079683444,3.060514584360765,2.3935781296410896,9.595494689013256,3.9814321353182125,7.219936408288364,5.100085474990439,4.6585579620421385,9.741935959349338,2.4002341812947736,7.427958410005456,5.420804751535266,2.575107872795772,1.345929573503859,5.464120041066085,6.697420163661539,7.335220473372268,0.7753682552859309,8.257397398840725,7.741041847708647,1.2368295781345773,2.391163244808505,0.6261678753916589,8.707141189717092,8.446998495300475,0.0953440989609522,5.979951312069236,5.552315802773928,5.6412296133003785,5.709128033593299,6.472923263049237,1.1834015762717676,4.242265814071313,0.9478132534886141,3.2866847598415494,5.9750650828607865,4.149419967607519,0.7447305887572675,8.91816234610619,3.5781136097243493,7.951035220764105,4.640814593037215,3.7930868123160955,1.226516526312429,4.56072992998098,3.3521101792034758,9.902264859989314,7.378658215749816,4.3736134314917585,3.94539730870467,8.577687160090564,6.558359910487976,8.1602688921498,6.737058007217545,8.929141854283172,8.244809013561339,9.431143021208793,7.916298652220459,4.47755573706117,7.929571728863271,9.204883131987184,6.995851619131413,7.772176293987709,5.166193857658077,1.7050489916968758,3.0022880631845883,2.612293299155375,6.028798969309726,2.1907745071754525,0.8430081462345607,4.025403406510646,0.7048679627167842,7.115595414596045,3.848890494036068,1.801334128868508,1.0279292932250939,9.052365347392652,6.766973870557081,8.609679799056488,8.35042876028579,2.1050123258979014,2.6404850017843473,9.608419662468666,6.062664440043428,3.7105673452487875,9.387574918015849,8.941469457545006,6.702380232346403,1.6543367475268966,8.501493201247321,8.486871932118369,4.98221571034994,4.500669914650168,7.200568190024796,5.679752135738909,7.317889276549135,2.131928482926011,2.9665626604969098,3.6202349329027372,8.352195525294455,2.9789888452889057,0.9881919342579781,9.451606007244449,7.05034240818446,8.944719247636586,6.393750318668527,9.277598405564735,9.626265196175925,6.7255832239086715,3.2190146954126475,1.8191647382047282,2.0117037105479962,9.030578811886393,7.448236354761462,0.5736512691756146,2.4929394707962738,8.34408593263257,5.212227044828806,5.645565659593121,4.691615918323146,7.303800145355717,2.059048038598985,8.620256195651432,9.034863202100752,9.05448036598859,2.396162622564053,4.672262520934685,9.473937986582575,9.829508451437828,1.3335167414709814,5.087747173710135,6.636476117021011,6.671384732044238,7.290087417987388,8.248317965040881,3.7730715647741353,9.201806119392108,6.4808657574325075,3.9385023375090533,6.767936658922558,2.9651657584232627,2.3188401035164863,7.020994966382137,4.157439151386031,6.53158877307753,5.220835815836827,5.206395812531834,9.050323217616398,5.147617736987497,8.433948946837555,0.5817040868074508,4.371839105556887,3.8846890300941306,7.871162466735663,4.713193835507421,5.223843818722839,6.4948542208463556,4.148796536773132,5.3744682024252715,9.92296160548613,5.009829092834455,0.6374394110125348,4.7212037165440695,3.789850111067339,0.5238125676113836,4.89876018461433,6.015437068932186,1.7885958256397494,3.85353834131011,7.851448504163924,7.531384937194603,9.420028728669756,2.416068659333477,0.15454273318249,5.1962677600912155,1.330846960669927,2.194344715874852,6.950078288765944,6.511514980330169,3.88908561781111,3.311926738704376,9.060661254809453,0.1436730823493093,4.533144443955557,7.177825826383113,7.691108511202986,8.022785485767665,4.1326140249793,8.512843761157935,5.261350218106752,2.201450823454565,7.403885562465957,9.274503676840881,8.145709610829401,4.019448427796304,2.3861143004439156,6.461027640970216,6.0305236082250495,2.3063754595595554,9.079535022090235,5.751599282692073,2.132832453316451,1.5774426799626617,0.6233729831463886,3.094236910919439,9.351842480413989,0.28209795280969674,2.179849673085421,9.99236282429396,7.5983101889399896,2.8213123483358094,6.289323613487308,8.482527749487796,0.6655324807929297,2.8383304985999414,2.1804562808131966,5.942530023119124,6.477346158169606,7.38313746014486,0.8621423643671733,0.1450681068907067,1.3523282097644285,2.918188314096193,4.332009820690869,0.032167554779720664,4.121843028594583,7.9591506257530025,5.013828801700515,1.745881239471787,1.3700226211673971,5.844399079730421,3.0765326409653393,5.20410019243106,1.5263749737376786,7.103939215072785,4.97589886667541,6.575367210823353,8.625513747179275,5.527452247139168,1.6672308549791626,8.043771799293573,7.702399240921933,0.180632642988654,7.796864477638465,1.461912247513355,7.568651990735836,4.5915731139473115,8.664453966629713,5.8343823915294335,6.7729122229626215,4.006149470007843,4.683899973800683,8.634723540111713,9.644398471478377,7.764714599772258,8.711024427514078,3.3523475905710676,3.8843432875478134,2.9259363138076178,1.6151893401264905,6.0939419427839,5.885366621984735,3.5266896842988893,5.085367340800209,0.48233873134235106,8.0899329070681,2.436883303135664,0.25037891330227824,6.432844230528303,7.368433637350574,1.4150300998495724,9.81900171051124,3.095011844906599,3.7934472099127547,0.8623134366853069,1.5994121307533038,0.44394800508270604,0.14848887780025244,2.265089494589083,1.611687268508637,3.272970858588977,1.4135851121319432,8.163318692012197,9.30659361649173,5.545543087870469,0.7632377778195898,1.4347995150877946,9.30613540437143,8.273385589816037,3.313484958296191,8.61940694191318,5.645467407010032,7.284904286611837,1.7727374283645414,4.739410930828278,4.259548331531975,6.928732763537157,9.82039785397696,7.015625388076803,4.26627914109962,5.4439865911951095,1.9108077403823498,8.82702190839983,2.7324595942416585,5.731177134600751,5.200095301345236,6.573793790008713,2.0490526351044913,1.3115469497437493,8.841192709118438,3.181697177732068,8.460138935389372,5.904134959488953,9.327107116624543,2.0770217753392806,5.860150830284461,8.584013238375656,9.673371807520324,3.9977778001010056,7.761755401834522,5.606873490276767,4.929354771188668,7.068904305552786,4.801618057536958,4.3785001784136846,9.46443133226622,7.2459277629637615,2.601562148329608,2.0384448259760424,1.9463303125071185,9.569326203985977,6.741444199985316,4.97953549094974,5.636668810850374,4.292229405211252,0.2128176699829254,8.359287748288356,1.3961081983290202,6.695490792112604,7.295077975323281,9.072155942185429,0.3524385356332793,5.159726833866083,9.389943054104537,3.696075091266182,6.847843924205268,6.669860530468776,6.571515152220055,9.372347095644674,5.070059046235825,4.8760826738316805,1.2130363501939034,8.982160920730852,6.905538150673487,3.9699378588727807,8.135824145919976,1.9800125848631867,4.007050906885132,3.7540368054291773,1.1171559368584805,9.069097389741763,1.9922258547947225,4.354041532521393,5.608885200759344,9.058738975709053,0.8831795698475831,3.816214965920075,2.2726934908139795,5.106893515297144,3.9235620955090655,5.367818242057085,7.0399295202023655,3.311200308733373,4.6078768001744415,5.512228809505455,3.38318500467919,2.222339835418903,7.258046552211681,8.886540796959572,3.9727316823302017,8.303491823936275,1.1379069272636055,1.6824273828291103,5.583945859166242,6.330815223615847,2.064492537495166,7.04239060547569,8.528506467057497,7.699960313222078,0.8620392177337455,5.2993097041790715,7.417059399737611,2.8699876241055766,7.883980248516018,6.838891356791872,7.298506124419046,5.650024089576955,3.722395679619539,0.3339951251641593,4.458926844219424,6.892472572124624,3.224528181793762,1.3742253523588221,8.03946874830421,2.848748629351565,4.5624181066993525,6.8673330942910615,5.048940129806541,7.19293079896733,8.100408391981258,1.815929807461114,3.182919433925475,3.0187312370934594,1.926108898929273,7.258087773408337,0.2906377167824381,0.03698707646728083,9.623305939693239,3.301890100663396,9.757911246421308,9.454491551233366,5.739787043125446,7.156741213266022,6.603616872965256,1.184503449988501,6.65584771399383,7.618008456814945,7.068607593512657,8.312809323799431,1.5398965190253278,1.1893546517150821,8.955324486042205,8.986568364171498,9.155428167082517,4.475788835492418,9.242380446201498,4.672154078329482,6.759018099940861,1.0968396640101563,3.7844257677983317,6.724617139342546,1.2720942382585476,5.3939214589239315,9.55489693387503,9.978197518842997,8.829244259605417,2.8105788522649555,6.83098706217383,6.185915237943316,8.958083663361016,4.708359483172244,7.3391435395656135,3.995607589159764,1.1896784919565584,4.30738656478378,7.398971140220636,6.876501934829939,9.921085469689832,3.8415082422828606,8.478357335607123,6.657437607056805,0.00689441141441316,3.1523706960423703,4.603575197388166,7.229889234042601,1.3929878457446399,1.009801585334853,6.654882783363907,7.459010118960741,1.7263102179683165,1.8064852032160927,6.717074679259573,7.89563777339562,5.104040531499914,0.03243933629895723,4.321662991250275,8.875979610539586,7.2395672465242455,3.9230164189491323,9.628348180990047,1.9321855777162655,2.1760296862653172,3.2886531951075226,7.449259384066986,5.685444042079373,9.221634253939348,1.6340169144913563,6.5673777323333145,1.6304491865036952,5.700383748278515,1.7396405752748345,3.7754152830050547,5.050471131200938,7.302894205647849,3.3729681010061308,0.1790885475299775,8.795480583731386,8.084689400023786,6.043412664559993,1.7997716994085078,8.823095437872945,6.753326972308821,0.8059801265301858,8.773368208375182,5.588861026979314,4.406245151539139,3.70968792644649,2.729642670507346,6.81794770074837,8.621928967527,5.072580152570289,6.944654645758077,1.5148244885260298,3.371670174988337,7.054619465830481,9.720185153036292,6.258639054208253,5.971297392758701,5.176602021866945,9.443213802747092,4.342763625834703,9.310461796939995,8.294330722773582,2.4595492369595418,2.5501346804341085,0.030522643105297398,0.07616493765600252,9.548855121779003,5.462205756251757,0.40843715237892875,3.3133927196895407,5.406083328966087,8.394757698840952,4.320718778717579,7.649592709169575,9.74294054768542,6.615858239945265,0.058618959798282244,4.616472150429556,2.562869905258802,6.109664469464866,0.021395460782562825,6.743115484012527,2.590120607223403,5.984128281652112,2.531125172387938,9.861184734010088,8.941886248879538,0.9116181087696629,7.568860278819265,2.661996550047574,1.4106410372067169,4.993302007523841,4.230009007805142,9.43543118700849,9.794226637317662,2.2245023448353796,9.227840770960702,8.229142953679986,4.035687476537038,4.650838768895675,6.732650975070831,6.303886241817209,3.360825331655415,9.642957133800117,7.274102029855691,0.846737756706406,2.6571168138458345,7.99358802001562,6.0863129669972516,2.572693482159918,2.263660744393552,2.88430582906259,8.82976969911304,2.6861999037582573,4.2480907351202735,9.867508239573867,8.509232484913646,9.754895800319002,8.419413426311857,6.027191231739599,3.7434604840681374,4.357815049472609,8.488449397649525,4.22510283008106,7.684743508754965,4.424060895178701,4.672693256816121,1.1705435868108505,9.613231541008446,6.529699593922416,2.872324338671699,6.7526003499127185,5.7051627488292915,3.911813469526444,2.901238873323242,4.332665554405349,3.8967755755046296,0.9184809249789949,0.32926836294084216,6.11750296671697,1.597758152157478,9.97772816578691,7.922100915430084,1.1852675914971633,7.410653233005656,8.434319809319625,4.726117780611658,2.156306880436567,5.25750292597251,0.8424567598823729,2.9201726427897867,9.362284250608926,4.556638106650153,8.064871206375464,2.24353835356383,4.52875776020991,3.3458754449819805,7.706891698557148,4.802081744477391,4.007310835056915,2.187499718957433,0.0949064241300901,5.033898308422664,9.15178186699544,0.4576198176022639,6.801515855927873,1.897077330300787,1.1003566358518224,9.20664092774845,5.156905129312328,3.7973556228584204,7.510388925665497,5.671017748870783,5.514014603934118,1.1817257949411974,1.0588580800695335,3.705344390217824,5.285359480397807,5.628368202214573,5.118368405530253,2.7349380371840892,2.5314085237399664,5.668544668022806,5.9883448715660625,1.553660524835232,7.114333288897572,6.213224149997454,4.125363174466776,7.799936303501552,7.842950071156755,8.309673075633246,4.3395499696762085,5.744447026700064,7.815749244001495,7.077141560914201,8.320230493959038,1.5824972876349208,3.8136533243869786,1.3527473984657679,4.773671289146126,8.480374970680707,2.709572649208085,6.080606719064292,4.229191631143047,4.770717510012583,8.616637586605018,2.1421437000138632,8.069559273624156,1.3389087646608,8.764176528555351,2.4611977308693023,1.7004867010383573,8.337503171445222,2.684686715186866,3.7240166540152386,0.4530529543978079,4.866524884973487,5.830338802542658,4.208153009829781,8.266804416356297,3.212316531371364,7.767984329568705,5.551756375297641,2.935312548656812,8.284927777902952,0.18654644497648531,4.639447919155275,3.29954302103866,4.66295709923023,1.9710324062309592,7.523490230761718,8.154729808543308,7.956752118352705,3.9079212034585753,7.411467707931438,6.465575020271412,6.080687900348933,7.871916242998493,6.0721902598477095,6.609219693073087,9.894559336190659,6.335827120487938,1.6550903000940398,2.725883641245843,1.0613761399402777,9.303210515396167,4.413767258114878,6.049763757850233,3.7435314452050417,8.57960566384783,7.1769249811446585,2.114496980367646,4.2313840784810015,2.0672130855069626,7.599199230648235,0.5018963195385284,0.3408754738545916,8.830451196723407,3.1395999980493405,3.806416354702098,4.012546384060642,0.8489235828677444,6.447071924534978,8.14987572679354,2.7535063693712836,3.837420433047407,3.3869653046303294,5.1144431333670575,3.930301511441694,5.21230642169235,6.508106886713804,3.4573770019660977,8.904512447843903,9.202390181188914,4.593852217629184,1.8663793340536339,1.5055615462593774,5.504715900671964,7.147267052954696,8.131452774146224,6.7317416128657985,1.0650152177074879,1.0210874388690105,1.6465393332657974,6.777751712177746,4.778640939164617,4.291808227631353,0.9741309567070733,7.402364747622565,3.488810451731441,2.703036196518356,7.941324613604004,1.8022948298801067,0.11945494873009332,5.414579809373887,9.16417408303917,5.122429360589673,5.085981557809518,8.592072613638301,1.6093007966126005,7.691125556189656,8.79890515308376,2.71099878593164,6.921382162503806,8.830188588475878,9.29255585718282,4.2690804476462985,5.818383774358196,1.7041283955879427],"x":[3.3029106326071798,16.00125119086526,-0.20066943912887858,1.6023823118980456,11.631624294664672,7.630874290019656,0.9729561538025884,15.770069419210754,3.9305484367452763,3.353861287311,-2.5457357680153123,16.32208478484314,6.280160939429251,10.640061940492455,0.32031557370950736,11.2986246724372,-3.1204554323524185,-9.152708920949976,-7.856889259004525,8.667191084654569,5.0705404094215805,17.667335991503975,12.135607588454299,4.894148494637379,3.0487376978891536,-4.52995457260948,2.466653441336895,5.491515444512986,0.12589216637190503,2.0106398684515945,-5.546120981938353,10.719507711489555,5.825223162415448,3.6142241147451966,10.310910258796802,-6.291804116100085,-2.6041896753641627,9.41958835966598,-4.503076163426254,8.196521197219258,3.6321888417381665,7.9458094992311965,14.86469941199584,12.1715077631528,1.9423447756204943,1.150019069849849,9.77800582478156,6.431357143493006,-1.1813782306523652,12.547749593025607,-2.449818048614974,-5.0376532119366,6.319335809498486,11.103961780705799,17.085586880338756,15.303462953776613,17.224780972902344,11.557761250255844,1.485511203871388,4.032042960748444,-0.6610277050686371,3.1789805698001476,6.895013968158633,-5.33349404770013,18.636633780149158,17.029447568450955,6.997785137974063,9.207497585499606,-1.1238910559608062,5.032209340285723,6.8288335907643525,7.631431891775879,-1.635266342106359,-2.2777942576944827,9.354605986386563,9.048389183722328,10.344299347929567,8.377156015844111,13.535624308850077,11.016970275897016,1.7020934263520466,3.4564533926776875,11.285576715740646,0.3026626862597084,-0.7971123774864246,-6.014897273981688,-1.0637243109418293,10.029338140558458,2.0462943746794124,-3.400828087522891,-2.330566498701671,-2.880554664674621,4.7155955472343365,12.705253209581734,-8.019755437336235,5.9515381697848895,13.25485616141371,6.569900558187648,-2.572623912428922,10.020418002576381,6.66646091635333,2.096682927610672,7.119034515302329,4.68226574986917,4.602092063901884,9.550471567424857,3.7142613797180752,3.8713877362411004,-1.5706040636657388,0.564537753630308,11.577692973067798,-6.167399351267756,10.396924530263451,-4.033755670339476,-1.3351700015483168,2.5399443167575093,2.902665267965258,-0.0787301187465701,-0.6567563686970637,-1.0782840295446068,1.6567685848704823,-5.486720555800435,3.579847744469042,11.837715505278588,5.01943207867208,-0.933509448914073,-3.069841261991261,4.93782958835137,14.645273734067807,4.386412898695836,13.803153634278395,10.348254521565405,4.243477981169409,0.3918835463990664,3.8982368207453515,6.847276503481375,-2.4980746409128933,0.32029315489444343,5.335442925075147,2.9799220420910224,4.8954159578647545,2.3923565007602985,7.037773530498829,-3.2170671251597653,0.6653988060999811,3.597855898164058,5.581586531890818,9.019392479519158,7.009802881615819,0.6947643200600542,1.99525400742883,15.406474318614563,13.461663243201977,9.556040793756218,3.2310948872214613,16.296050545564697,5.720238841824989,13.137085818079157,9.972795593133323,9.067224033295211,1.1910766616260844,7.454132565487946,4.727751758661126,-4.331949470870134,8.238173258742176,14.878238387867631,-4.375996310810995,14.471601554603385,1.0387767554702343,-2.0402208197637837,10.069966090682673,-7.901421686635201,-3.4544969481623173,10.593139239868947,5.873321858736242,-5.5586794071251,8.31113886498359,-3.6358003467986038,-0.7235255660087248,10.96682900088304,-4.7628995066607835,12.737049690534846,-2.599888591610421,3.5770707121383047,3.6449324785703396,6.736405360730229,-7.948226432885511,2.330170410702223,5.9293557885691115,13.450838841224112,8.527307326974878,13.618091408374461,2.5989161719835607,1.6117899508550373,8.813741867258523,5.132297217371019,4.241381415525229,0.15384371298151578,11.857595330963624,7.947231439309508,18.03427485555375,3.5027585887408677,1.6492954514350728,11.939841478208969,-0.6568142228630371,-7.145543815317923,12.137139131175584,-5.225875112434842,2.943502986927358,2.9156689378346936,-1.1026094157736193,11.765940216674256,1.5064584195919082,3.1667977885553213,2.5331443019842297,16.61308216162032,10.086350359811167,-5.34954879965318,6.50990195288239,13.280464571953939,1.6922646823793084,1.8850215096300502,-1.2729329088633072,0.9115607077266858,-8.040015865523118,9.064363168785409,7.303986066692659,3.8607571833282286,-4.904155045031558,7.342064914166741,-4.276196542059635,12.06559295173922,1.821584471750258,5.2407572330730146,10.7807957103574,-4.170892819023097,-1.1232028514361634,11.154148090475204,4.937231925836889,-5.9401933390768775,-6.919483331864894,-1.7141892745397236,2.2577484285895366,9.738991166285142,4.843446270574942,15.458233864311588,4.188748817812456,7.641581564833883,4.784511946777412,-4.710336672930085,-0.3433176902066748,-3.4345173618821008,1.5702725730055391,12.938448331420194,-8.118268858044594,3.4566020408404476,-0.2573794019514537,10.952722590618952,8.76105807543637,0.7770421808311081,3.1914743278281925,-6.917238891885958,-6.373609082658556,1.9717804000515695,6.887529490921574,4.843556184696514,6.597392672069187,5.5132709941822355,12.464076531273983,8.286900565829164,2.462638975122152,6.512676258547394,11.3120438557491,-0.005103323486018496,2.092445150287208,-0.5113415426668837,-4.9135758354589285,-3.599053486870181,5.7115099594895655,10.909507252301086,12.063109814049977,12.10268717445003,8.494578277006536,6.446211062142779,-3.9702597175267726,-6.630398626566885,1.4463078155393632,3.2540475363520738,9.94374902462139,10.188908015859257,3.8785435155090298,2.9805755019110407,-5.993497365470221,3.978856362007317,3.5270040890761836,9.584968894680724,12.012489091700184,-1.002409664742995,5.810018711713315,3.293013219964519,10.448975017281004,8.243139266054891,9.843718301862857,11.11357382422397,-4.2613002389100725,3.4997711296818643,15.265695615318222,-4.831061972646836,9.66842898261159,12.688125354978334,14.320285727177858,-4.552142408635778,-2.1686254568390897,6.676464353925045,-0.027354292367867572,5.7224402507221965,3.333866449960535,1.2458553821282816,10.066865179135132,-3.844514403598332,6.395862346825393,-2.007675134948066,-2.6065658871207837,11.578164604813075,5.675035866906109,12.032810273248586,0.739015035252617,10.959484883275795,3.676806252017286,2.365787159298799,17.042043728977195,6.520944476818485,8.274520662252563,14.424945532144733,2.4981538012855413,9.576905685011546,-6.814235187785211,11.222909397146225,0.20812005364420472,9.432410664925435,9.362520800970488,1.0723439583350576,3.9678465003613965,-7.887734993098608,7.651453923052642,17.927116960814878,8.88269486879923,0.6028624463933099,12.315699300615831,0.5091319195695032,0.7476178444398798,-4.100011065114485,6.1726530773477455,11.30881804665432,-1.030066564348413,-4.981734829962219,9.783041014771499,2.8797077265206994,7.170618084098736,9.191972212380708,2.827489668492815,10.980967451822254,4.87076266430573,10.016786332968188,3.64384895260946,4.918575857460823,7.788329671018112,8.51783049338154,-0.8802604335129764,0.40539659483071233,-1.4460980787295483,6.268061743233417,10.424259003105433,4.029920475757079,-2.41776005437481,6.020997205132222,3.090247771262817,15.796118444540795,7.433319298704372,19.745914380925612,3.311945937260152,3.9656532074792175,12.519693432235403,6.862489704400256,-1.6996560391608426,7.863710617724501,4.4349016442881,0.6426009282879761,3.7469624376457524,9.809773149128933,-5.828190452526899,11.130782762712172,10.929821532602261,3.617688379992364,-1.4713887228419793,0.1253107920426686,0.29918311261373276,4.206020923390739,13.032749973193106,-1.2022755534789482,8.804570686834163,17.120376983136858,2.3237163100169855,-0.3864115772269816,4.085459495454273,-2.898688343354138,13.097782104773753,4.106143713907947,-1.5315685085145105,8.246207468810578,2.3380580057767606,4.324232756811547,11.134419017928131,-1.4750980715102529,9.013623271648779,10.51487304856538,-1.2097715222739538,1.486558500693814,0.4636717861328119,5.215572615248368,-1.5046534050614717,5.040571114485987,-4.024742179669353,13.85355751962717,13.477365825173475,9.071063813961942,9.879500281261674,8.788775715249173,4.141222394031033,5.827522584779537,-5.931864723637007,14.392742807613887,9.357035758449463,7.68711792661761,8.274467494875209,-3.975478264995097,3.8353329423495506,16.06418990200656,-3.8452146994145604,-2.393909032071356,13.16286206895428,-9.063910465518134,1.8032419968019404,9.000654855274824,3.2266403165721442,-5.2094070378438015,3.1258608201515443,-1.7810596251414665,2.814983070751886,-3.399701982997275,6.554725049135353,-0.866408816079284,6.019324415898563,10.69083974762033,4.339860073174979,14.524979962965919,2.4644250610317737,5.692038683852253,5.21497861672821,2.834169061519095,-5.150638938679819,6.072361335724778,-2.230126286405868,13.048707056067844,-1.16964276466188,-0.14037068966373312,-2.183838593120413,-1.6184650637809508,11.587882671253551,-0.03865028469785692,8.453655368987363,-0.633000727081372,-1.329777002302599,-5.043173140856371,-3.9941163809017173,7.42945163115471,13.722049996311728,10.531962756751412,7.229237846448335,-8.90557795546317,-5.544596876353548,5.218680724943772,2.5694634217073187,16.199004709265935,-7.885590680505972,11.272376194363062,2.716168188433416,10.04871081373161,7.2215996588121065,11.946093788124035,-4.860130505691373,3.818817926064554,9.267201334381202,2.927786962038182,9.981480494436866,-7.298755019878886,16.339672614725927,2.6094068413038656,5.800224721592577,-8.059255137321164,5.919123224573815,9.332184154540414,-1.2907916882147799,3.7841735258698073,-5.02116860394964,-3.859961802047021,10.650130056396952,8.431718497590532,16.497211174446242,7.404129925611034,-2.6694000844434562,-8.098407729640295,-7.357983783870026,16.007090432209793,9.539467139179404,-4.578268981063879,6.918224635551082,4.794749860209479,3.800578585578088,-1.7056776269191847,3.804446722828896,12.1971601471841,11.314123025274059,5.043614318151096,3.508714924346826,5.061473822434287,-4.71549405103101,0.30680501791179715,9.977258124188339,-1.9419672230860243,4.550112074276047,6.910349936679887,0.6909227954797146,6.5011136580778945,-4.287761633269341,11.683880235367344,9.289387410857636,-1.138799878809035,10.486065180777652,6.419502141488696,1.8811948373340641,-5.207634897139885,1.2008935487621795,0.09289542976926235,0.11903752561712189,12.628282818720027,6.88492250921176,1.774621929006944,11.395224619184694,5.369043305975501,-2.6921688794254734,3.7776687751844094,-2.4375961666900494,1.2566193964451848,0.7558115477999827,2.4523332810237246,-3.407192020762791,2.3429255369118884,4.262310199995476,17.6023275730534,0.07171748829068036,3.667880369227727,2.9608342470945175,6.151807753728296,16.799019942859005,3.920905496222918,-1.0758276144032095,-0.8363360917686684,-0.8736738130745287,7.333661976006262,8.1847863329772,9.61747597117332,3.661961948513997,3.8046893994076036,-2.547261609225014,8.641891401935599,-6.144448931219586,11.513024014429302,-4.478843329316563,14.01029889683852,5.969299856295603,-2.8866651072386738,0.9300544824657617,10.549418888165862,11.87763842342915,18.41288541968177,13.419491895344127,7.201119902572538,1.9248431900677598,6.08335290436165,10.774036595528116,11.212998143600544,9.518215496178076,12.170280649596467,-0.5484922795380047,-1.8972272797357412,6.239292208662725,7.634657250155392,8.956759727507405,-5.121642485945067,7.931314408031849,-5.471967294800965,-0.6839475541399942,13.966170868618967,4.847576870304627,11.874353061076937,12.809364801561347,5.785999736373963,11.790150468469134,8.067377341112103,-3.9358579078355636,14.522748978816715,0.8105644283116575,6.051681889493043,0.2082483463354876,-5.39646744338442,3.872217193588252,-0.5556078182028763,8.080018520880277,5.0270589883069245,8.875220601413464,1.1770279792125926,11.644718813504044,6.853319235085348,-6.382583938914038,8.984127016223734,4.424861755189378,11.2909289046518,10.166091513703957,4.545595679704798,-3.0122738954364277,-9.314239349267222,0.9618717746805334,17.630205480935423,-2.1898849600431767,6.7263648753317185,16.2490777530624,11.957364484279346,6.978938999624205,3.2160374051087057,-5.435773690281863,5.507225193083512,-3.972372619931498,13.516043948635254,0.4327263428727015,11.25775897063486,-4.641883232705325,15.376464313699485,7.956584713569734,7.571985958768851,4.2258448830459745,4.030231116848762,-4.083735282944607,3.7052078176954684,13.087128257986446,-1.2730569188732375,-3.195237142534097,1.4536361931040656,6.588005105860628,10.16657878834565,0.5900499088867583,0.9435544349219569,-7.380948781505529,3.3005017756247703,12.141064304807553,-7.0879271822396355,2.354848922700043,12.294641452807015,11.656416096258218,-0.7796315553309974,9.728794993799424,10.41465388691936,8.29929884662975,8.412871476045517,1.8063833898682446,1.95396354794911,-1.102099272709177,6.5349546924981645,0.10570869483719747,6.277150916798615,0.6397053289540438,0.5411334024986587,18.20405961768217,-1.06219303630162,9.890482554466338,11.00078750256695,-1.9340412665425966,3.864442329498237,5.698110704331272,9.941489831878378,-2.7738231690430286,4.827834914001168,5.134030415540178,1.976546858004797,1.7531775021260714,-0.4024200445591326,11.29226637271314,7.277393746488283,-0.04111759832114714,5.064052078839008,2.356776983295223,-0.2925033782246391,1.1336014896243682,9.298587477005968,10.05879601981631,4.460371517366534,12.887837856740928,-1.1611088550062938,-6.050862909642298,8.898198646306419,13.459411861103003,5.098748879732493,7.776410235372637,17.251291476461162,17.787813201097308,-0.7604269800033663,5.551260311645166,2.7257561144744002,1.1421489474577413,15.96696043473135,16.067929213583035,10.612590096711902,8.504166525567312,0.9033067121869642,5.881052559402441,10.693090434983713,13.607923795368038,1.8252945627139283,-6.179535564328525,3.5853871666303245,-5.428388535218829,3.3410356381214097,-2.385674804566859,3.2355121937917604,-5.075262637508338,-3.1111975236084284,-0.3581334784558159,18.165303626801563,13.705035851997703,3.078796876169042,8.521028656752652,-7.3499573800958125,4.438424999138547,9.392464125156181,17.450751171855885,4.272553563572876,14.25641098092248,4.4805380634967875,0.4958464334430026,-2.9471156151242237,-0.5193915850187167,10.057217930670774,6.079119951161331,-4.562225196570743,-7.667966726588066,-2.880252609261083,3.163661317387392,1.394820288197959,5.255868937320331,0.7256068935575097,7.205918709809669,8.903302847683767,-5.569369201810002,-4.469304292973115,6.024183793043647,6.479132692469442,13.311441094711405,10.44205694523174,2.308362278332549,6.496699050775252,3.4131168491973938,8.138498034656202,2.5929388743528587,16.540558208114717,11.17917792775744,9.824492773120305,7.102528965825476,10.188053768059632,9.038116505908143,7.030223958019068,11.242444355083855,12.399811931927097,7.906728395457707,3.0794221098724304,-4.015603570429585,-0.582860964444043,7.5511043744917545,3.8119190304597383,4.058429938238535,6.055523609582327,14.179591418766774,5.116497113605551,1.2501594004912224,14.304219886625472,11.46598748296109,-0.8279103460552442,7.126350921295101,9.774897604395072,-2.909896728152493,9.660987486323698,8.004686853630698,13.54366559263855,1.3710748006018925,3.981029525467253,14.326747885609482,0.02398951005521255,11.07959445674188,2.32789495011545,5.719633264131801,-6.24812588472934,-4.756923106952815,0.7466175328140103,-1.0569373411075471,0.8489416026862919,-6.507630572601192,17.99833882390516,7.568336641230747,-1.546667279403728,0.35977581688880633,1.60206095407273,-0.5513225795034167,-2.773996619064828,3.0247083206611105,9.280336444895191,11.557288693212149,4.94698661451579,-1.5416525120100548,-5.218178691179254,8.767062160863127,-1.5113773210179282,6.139963575877617,-3.877700786816181,16.786735116356372,-6.33315960796897,8.762048970590218,11.38770826592901,14.429021818345355,12.960416980071365,0.49594027957168585,-0.8804668104164151,-1.514273049917751,-6.752518338892065,-0.5746028542517436,13.686357483308509,5.21361986951141,2.9966785197751893,6.263749821838042,0.6759216973197564,0.14283427171447016,17.427544310633184,2.871416974811172,-5.097191274606255,-2.6518966554351184,1.2865633879042377,-2.7187088414825826,2.4340576042357647,0.9297476628949539,6.375024383205288,15.075523523674953,-2.372211819545626,4.613730837908442,10.3581267781314,9.33398418487592,10.708301715109789,-8.816757741667843,9.867636937309586,12.221984181919682,9.180131526064798,5.806178584322958,3.219934600439519,6.548675589312889,-5.170361433707507,9.141529165631297,12.69827439155343,11.161886075583304,2.8251574888011994,-3.5216866401291096,5.041522956387418,12.389016762916341,0.839632683491697,1.1803845045387238,12.282776031630682,3.6836564224849244,2.271811159085468,3.6286141022764333,5.67177754897984,0.46963839386671324,4.612881060848813,9.566617482635912,-4.697327519940233,15.292744615848953,15.327970037237964,15.077801337234721,13.65544977070642,3.7946488741547455,15.840723008154423,-8.385037383294852,3.913709410881687,9.100386859187456,0.18212396190441105,1.9956020931980145,-0.2180094666709227,-8.071141831903791,-0.23872222978737767,9.353597056704523,2.346832003877413,6.673157260807942,0.4498214719400835,13.164092081412061,4.782983407774468,1.626087788558042,10.30455898606884,5.780506945885698,-4.666394806354386,-4.132081417358318,4.837418382146487,1.1212129502924153,19.31862451699616,-4.331468382014457,9.261212362142107,6.9168283892137294,-4.407514637205676,13.996804018702374,4.880187014007443,5.777793378182757,12.204892827868418,-6.071910680169131,3.705507186925008,-4.698154133787318,11.446695023364189,-4.576391741839901,17.29679393800689,17.117026067087316,7.332895857917299,12.155622329150187,3.2847905091299463,12.687546069759069,4.326023579112819,1.1145636091076554,6.380653763254521,8.673912092879842,10.886021233600545,-2.1897727726022165,8.004062545100707,2.5729260995111964,9.640920318109817,6.897142232896603,5.001372603572257,1.0326355449242772,0.5359234611057886,8.929341521642359,6.490540985850657,2.2499825365712987,13.404727804279167,-4.136163202096849,-3.055438543115855,5.263077838494695,14.044799698019956,-3.8404574130666873,10.34746766513565,-5.651118864325516,-1.5976396179252959,-2.715649083482992,15.36275182927562,10.840420240050125,9.201636346840743,1.5882790523245731,5.8897822454515865,9.672617482681595,14.373954099067547,-0.6675977525103889,7.921998669479935,1.6463907724190179,12.032157178502526,7.989036767008223,15.547033746654446,-0.627987185735492,1.5649709877057525,5.530227290435343,9.062854096995359,17.567981018956978,1.2907962084120665,8.470387995500893,7.68272592433565,-1.9998307643242974,8.91212859458102,10.839975909331613,11.32545541623924,-4.026878624121064,16.005779254610967,1.6396387882035022,10.843791781546951,9.441767789496739,14.047444599934396,19.24062802863711,8.22117324419424,1.9077828895028937,9.017305937249672,2.971613007436673,0.5169599016783888],"beta":[16.46527405378618,18.264027665915897,10.262522529657797,15.032036793291239,13.593724696082742,15.179745179628208,15.83248301233801,16.67690198199366,16.84305336663823,13.56567243966033,16.82548897370055,17.448610378015253,17.794941667780172,13.859767082432626,19.11215946631731,13.732923621834896,13.323588546859394,10.496772105079963,11.149858475383528,13.65534027118954,13.962713959139743,19.218659409711897,17.928625302119585,16.544156700580434,14.055699551358492,13.102430687251964,19.22863426684215,13.213130414592593,16.43208434530157,10.981077710043365,13.424805894679404,13.313534649776809,14.4581700416142,10.254084455770027,11.214211270293958,11.320016654649514,12.594832757506174,14.01217395540794,12.746519456125316,10.965480513555583,16.175765262865287,14.89910073422189,18.68356006383287,16.954892259722186,17.748728152724553,10.203431039184016,14.083160320700511,18.424706069064204,11.170902162533663,17.78719478869443,15.287130332817744,13.727200303626638,12.398668064296643,11.345595343581609,19.341519623943597,17.638947980121777,17.821270984958495,19.369528856817134,10.92395351473618,10.73778490112678,19.273119042967608,16.10483681121084,17.23363913861002,11.212216127378285,19.140297251857668,17.265168892920087,19.930192674760004,19.537420410215095,10.623256396647607,12.22275294612947,15.80933059265218,18.50248904162299,16.653142523424467,11.100339582360041,10.91611917646473,14.634845591721174,16.87262411220563,13.48959256086509,18.38847070791913,13.91316119951766,17.082593780103636,17.631734076049952,14.908930329079212,16.841252614521068,13.55912169552759,13.367669980251364,14.406548084283394,15.043014971885729,18.410140696949888,10.193088390081952,17.603117514860422,12.508270736277403,16.525468347081375,19.799489166498823,10.883805481839088,15.222997810980516,18.04746108708345,19.833600580220644,14.841139128875804,18.400548023871508,17.38558162916868,12.691143657911478,15.114934426836799,16.98615370003263,13.716397046840507,11.409692861297795,11.64059755796112,10.73551868574625,14.16782834057665,10.043798626456532,14.192288730547855,11.196407413892631,16.41883033638735,15.77841289622292,17.999493067761243,11.057137626359632,17.63234147501244,10.774383360926254,14.10049059350473,14.70231758186907,15.182635636644461,11.621061342841077,18.15033110551993,13.654862532298807,12.039299200078009,18.570025877598823,12.783932156148602,15.267111875498003,19.3947786025876,14.628883782547133,14.891070501860552,14.896143677026112,16.774770578222373,11.723112586237656,17.634814464419637,18.407856376838414,16.263434082532175,18.930128300803183,10.732870813766766,19.007827798584405,15.470344996260962,17.785791621764396,10.789542636860372,16.08698353607293,10.386221637401693,17.981455602896197,11.787305507101966,17.386057459020297,12.135274241729393,14.764726586673172,15.545566012794191,19.357254030164235,15.249180296209756,18.059945454536436,13.532715534952937,17.70129697935441,11.285247929150799,16.400364819435715,17.24283456599229,15.299146853768377,14.786285856259774,17.881184303186316,14.347863010098866,10.622618628271507,18.46175233259346,18.935145340599558,13.9619502107065,16.033882798525866,14.332900114695338,15.438916430676182,16.366155005800056,11.63684706465512,14.48681535487288,19.7607700732883,18.154504194620237,11.054905445883884,15.228414872909127,12.670251402349805,10.482140626800538,19.51485822862897,11.698526050979158,17.705690405215552,12.216904865042606,11.680180197595213,19.913040315382595,16.185509270978702,10.824603440797452,19.789165646267424,11.16407140456754,17.163248160095353,16.58312191436673,15.986411111314851,13.883719173162365,13.843625276356342,12.465142584604877,11.443837640111209,12.582022104385178,10.677889678053024,17.83361918987471,14.90601176684338,19.11536510284823,13.264512381099767,13.385642871049093,19.701743660017783,18.175151147046076,10.589900369987708,16.16638114229159,10.929575906432259,10.79919703442746,11.958323416713297,12.610573294601918,15.301313731663416,19.578180200741365,18.946277911085208,18.521089577417456,18.61489786423322,17.70524527602058,11.913017684423826,14.187294424894098,19.893866817186876,12.552241954203428,19.07920887250014,15.666923085624923,19.352684865887937,10.777206086845828,14.212791541283693,18.795053153204588,18.49214588645755,11.617797779100052,17.244302589825043,11.480985889705446,16.45370027572489,15.450022726184722,10.986697384444799,13.21958377530329,12.807716988880918,10.585466828985028,18.908947370261057,15.499254698593196,12.663986595820262,12.973339894430309,14.164800439560864,17.654932538066177,14.967825371588578,16.75096304546215,19.055732603783923,18.588401914383947,10.00864731373727,11.725156960020815,11.136065157305397,17.26153472846004,12.79310977999635,14.432608983119195,13.434718337415283,10.583748602987427,16.30162799092286,10.857939202721994,11.71803580509054,19.75534653835296,15.727261982709342,18.483635878218994,10.523939984257602,13.61896094313436,14.194643402851392,19.988401281422142,19.262399763787585,16.66231691911988,15.73170408929494,16.391054490177503,15.185807490866015,10.418951761598706,19.461359722428107,11.523968475866033,16.296866567939965,15.865034542578286,18.007085365597,12.124177026123313,12.170650482473333,12.982549094278127,14.211992454100741,16.42793811907395,19.69336282234444,19.99623781191609,11.499560289070605,12.903095366018597,10.639572322274349,10.790770827641108,12.179713443516498,12.015465060139592,11.991605327868069,18.13363715277237,12.602705288768819,10.252346827209111,18.016014510390427,11.271614255531762,10.473651969217004,18.73236386797347,11.65601929108621,16.466203472548568,10.0301034761296,15.57126163499984,11.614323413943131,16.154338764783354,19.358317932543898,12.389165985071172,14.003251653808181,15.483628073824573,12.272573991685725,17.320813890769237,12.945151677918416,18.81064709152484,11.498859606733422,12.528775985027485,10.924523808762146,14.933885030511275,13.515397323990282,15.223650714863304,13.99090310778924,17.087508556330327,11.303244929758629,15.865089485593113,15.90930312394001,16.93184844494233,17.12209208520202,10.714937475903248,14.671128801697877,16.786361284206897,18.097288187521613,16.766544200189042,12.294887265023567,19.43784396546973,17.577926937511382,17.09869261980697,18.4478645041005,16.993837807538668,12.671196818629706,10.451385410321787,19.427600255870566,18.455991638933767,18.38492385771099,14.956659509229803,19.074540242711933,15.53108743518094,11.278718755327422,12.332622928371562,19.577547202040673,19.089732845650452,13.415543827899906,16.64325589330341,15.619552354738353,19.519642960855094,11.815714808075642,11.326961713475423,18.375631601440592,14.912900393242271,10.249151440179089,11.204207965111799,17.45745592284031,10.6035418183237,15.467672489139275,12.61478501909229,19.25662538236263,12.369021630072245,15.160220720631996,15.671248151001066,13.081561275191657,12.637689429968548,14.634140568741472,12.853212872735151,11.104097143018592,18.200521769901815,14.411172447428221,16.041858853238715,14.47892192197738,11.852490466228648,18.8506834200233,15.085308533107973,18.25998061443178,16.67934399022083,19.7688001893209,12.842007966817604,16.08268562160989,14.57260792099513,10.87366035747019,10.129262430718907,12.958086325855408,15.520309620248016,18.088042205132112,10.762266997597298,12.1210967378979,13.761378466960208,19.02027968646602,13.788326071668903,16.830328157198583,12.705819378219172,16.200331398003556,13.23910879419669,14.352151726285921,19.947238807248112,15.344517700444314,12.931346109282453,17.97216685991813,18.088453357313732,11.560512201936994,14.253903134953214,15.604605585185666,17.756609016662843,19.040999253295308,12.73105985283997,11.835957214228578,11.851262422890054,10.779933509186787,17.71066194636518,18.451920045970237,13.652873952651767,19.713748870911303,17.183976300245504,10.532138643072045,11.342153038594752,13.746777455902055,12.775224564560748,16.500781152561363,10.74615806370522,15.694943256893659,15.630195178795784,10.841087061506574,12.599502391882453,15.644447059853253,16.808997838720636,12.421330920593643,10.70700149200974,15.534862457839582,10.201298220380142,17.216186880715952,17.780734563862815,13.45548008084019,13.649999927811072,19.839281456105304,14.064389306343552,16.635373085772684,19.264758161790542,10.125843226750277,16.038730714915218,11.599970996026292,11.11339044063586,13.727452242824869,17.030444369566514,12.844120794242734,14.031794079820134,10.818798601199394,17.23450195612543,14.420949269392002,16.14740827832727,14.057180406967442,15.680424111702626,17.994845452387345,14.175812014342382,18.63596155684617,17.008301771380616,14.30996496964114,10.190968816203831,11.857665637194955,11.366949189772315,17.673384211089093,12.745874333089011,19.04010311216866,12.047359507953676,14.319508729286971,19.991585938211536,11.14929489357362,14.649263360658296,14.295026618741566,12.123572070206915,11.865772919626078,12.005637796233966,13.010982475947998,13.991964334177446,17.937141075903945,17.689329877217286,10.127956742505917,12.56973880549803,14.699275292926268,10.724193441030568,16.43595223555407,11.764552964209605,18.493990461606316,11.375016115588085,13.86811051649315,18.85623439934002,17.273292781750182,11.47825273229953,14.507383735031699,17.5635291012226,14.567702710272268,18.511621865899983,12.1227881814638,19.726625949232005,19.894883981614626,11.95958611604807,11.481063174545822,12.610044221207382,19.86041509842641,12.467213743877764,13.395337925166913,13.244537060864186,15.297746515691355,19.5276608610681,17.42815531064455,17.08819652092534,19.118482262024862,15.265260838450661,11.318195343072643,11.330121945605377,19.237841110715124,17.630298250934676,15.125611004483023,16.264267894650644,12.385460517752477,10.536353882482935,15.378354786603401,16.74082127307097,15.671427511187893,14.182805130113065,11.459324448851195,12.141274910931244,19.898835235606768,12.964415078877137,10.068817760251136,18.167447110428178,10.837626095676,14.538919747166478,12.980370894766777,18.28115150975476,10.453063124501424,15.241298141845384,18.327877002351578,14.693464667045708,10.900295435462578,18.386685759891403,17.80734143524341,15.155696996089624,14.3026036052699,13.018977823484574,10.045827061990618,14.348839357448282,13.464271524366453,18.5807510787529,19.916190036231534,13.839858964705762,11.91382975468176,16.131340945298902,19.40271849033376,14.795813985653858,14.059342697144452,18.033660455117705,11.358729924529866,12.527578281359856,19.14758152629356,12.976818542684175,19.129024195574694,17.6715529075731,11.148334477894217,14.13846340884448,10.760037421729347,16.94209432244894,19.307533098745303,15.72684473847011,12.870607026865637,10.046795293085642,18.564908011712163,16.474124948117385,14.59852665206462,10.102271464720063,12.431879956264002,11.373287064978083,11.94144457387129,11.609173498668852,12.891924026149402,10.416493899972936,18.872449992500584,15.268323631437365,10.020506532141162,11.704822466133265,13.621881709431378,12.905817520340129,18.671288397895005,18.55092880042614,16.570811367808332,15.541834123598539,12.137405650365983,11.013576714018479,17.245616283825974,11.204441615303137,19.41735853283059,15.38555271663659,11.302038579048403,19.052794671157557,11.781412116791783,16.779240447457283,11.090213095334647,16.91339695739444,11.033565044008625,18.765790848275717,18.39381329441924,13.604039463602929,14.816131605805225,19.488408357701886,15.637414710316776,17.57043549055944,12.750460562449792,13.171858492671733,18.04498710571124,18.563124646522354,12.206266854836871,14.877186577905253,13.343156880094394,19.894790383060744,13.176229449214944,15.10654349321834,13.970168298078713,11.782057878112987,13.771183095319802,15.341583715525665,19.728016030158813,12.095552803307825,10.793623042580423,19.17949908160459,18.223522061674316,19.918727393283255,12.604052457477463,13.944704417628396,10.255556825284376,15.935311895541771,19.761896316134262,17.288080110420996,13.688410171729748,17.979969670141244,18.903741465696164,17.663189437885023,13.23993897562165,14.080197759206445,17.98630604322878,12.700077484285885,18.687318006876932,10.759305930142439,18.867466247802547,12.141690835975869,16.02312265406787,18.3217532346265,17.614198414127294,12.951594953889593,17.251506219074933,13.906657023776363,11.039289481382228,16.047974857018456,15.30502431120457,10.12401876209108,11.581228561181858,11.367232689970017,17.725358041511384,18.363345368465218,18.515772548257342,12.142403524375753,16.8181210271407,18.525503521288577,12.076758922249152,19.005738120388784,15.937579835937072,15.240439561456558,15.263984617390612,13.157810020839465,12.12554058883892,18.76402250133736,11.954740374678284,17.605222407692477,17.71310078708902,11.857538881667086,17.852061229953645,16.441158922840657,16.504027665034318,10.21216309660711,18.330149760453253,18.518764344356207,11.294273386980505,15.033510473575674,17.16024643583023,17.498485412849423,15.641495648469961,10.442008076164704,18.90918054638842,14.55378761824779,11.420740595235308,10.168336270789498,12.950673238296854,12.727115829067909,10.730008598637475,19.471359233413775,11.228214605090471,10.03530831512548,17.002814352665602,18.000722882388246,10.099181119680287,17.68922719238208,11.134289539441342,18.919051115017478,14.358644843793149,14.522874318784144,18.763061344850986,12.176005752286876,18.47807265212367,17.654410866392656,11.526891412543094,16.40154490254954,19.966297508686765,18.40472028234014,12.727064648968327,15.629043254934459,19.059525800460754,13.15786345849357,16.486168501569267,18.396187647615797,15.53271546947386,13.77569461871201,11.87948411589355,16.38188872154283,19.82312275050562,19.813233831761877,19.094275268591375,11.762745109894162,16.543566156790874,11.011435190116543,15.792884331186869,15.168668096175361,10.189712222600741,10.717195280361594,11.90149185191838,14.377921344461264,18.239321685764182,19.358552729236408,13.75444008346861,16.410007876482062,10.063442590756363,17.59414158024658,17.57236200593282,19.93257171086849,11.801266078134145,17.998268799790058,17.11986286200974,18.339355466125937,10.543279395314302,16.602206487868287,18.547123264210562,16.888151786251875,11.527288546096631,10.687031672910098,10.33822885086728,13.738054036826119,19.116810734525686,13.399117666666898,14.789280643953424,17.43636126466854,11.823672680702881,13.707953252051013,11.359673861880015,13.211865844586656,18.66710042779325,14.449305696274934,17.528409619620174,16.298849272529914,15.202370098821628,19.976413421637325,18.328009623386126,11.466131386860566,19.98281391935482,14.408776102111641,12.972859501024379,14.573240275197385,12.671355599525679,15.113741235390963,19.951981717346314,15.816898951646143,19.52308767290024,12.316775323799513,18.931656052868085,12.692279067151693,12.651991921377155,11.202292854263531,11.241702977054384,10.195792408865348,15.11597205579562,18.19081928162965,14.9498859222507,15.4533499600089,18.450167878737005,14.51453185747656,11.527089915814166,10.423153470952979,10.799873871586234,15.636572658918208,15.511943914416728,13.859634395952591,18.395491857363435,18.8088466103871,12.403467215245929,16.499085383078615,17.42415065708228,17.36979884002549,12.835079095298646,16.562837212080243,10.35093263764005,15.13597629567304,16.91784145983555,11.193866632127298,17.017623635369173,12.676761695790644,19.608285244920566,19.694898830948905,13.996180795509677,18.24833993927439,11.012131034917687,14.489083727869673,14.080018104222859,11.041587008995396,12.92680182555725,13.194297366392203,18.461948769133567,13.883779760253494,14.083972139307203,18.26620718618861,15.78746255111405,15.539378803054118,11.462307453794594,19.5450644292945,11.511826833916835,17.592748822486268,14.834300901480205,19.057434606731544,15.233108017706122,15.942405371416479,17.92097017572233,18.161991207331653,10.818107998371493,11.83814888725201,16.366915065494446,19.76266883266259,11.085037723907012,18.143734446592145,13.671073294991702,16.543095638259807,18.116803005119912,17.827330914171696,12.640129560877716,14.310962445390603,10.455990361665048,14.150050648130923,19.02796024416294,17.409309778969142,11.312506689937036,17.43909103939065,10.785897044754773,13.643651322157396,13.359555848990244,16.130164098146075,17.737122989985565,10.177092241547449,16.82894771848736,19.218532945004817,13.268494434293082,10.611626486020082,19.607310329012606,19.876178092743626,11.178038799290276,19.792755956394316,14.363175152159172,16.15635832382687,19.95812011427989,10.13936139035666,18.468484385731937,15.377390015133168,15.601895271772317,12.705737099728937,17.611786863480084,13.198846561473818,12.070575524811222,13.918590043541366,10.459615163025962,10.68436565681277,10.386856245154908,18.003468016884383,10.880690629134396,16.256190708444063,15.691872273861085,17.68153340226995,19.431594956332034,18.74810178151209,17.26806406630556,11.211522370606401,13.04633539481754,18.212620343374418,11.279345593217327,17.281385536617204,10.730365530048653,11.608508469760057,16.163214457605896,11.87156833537923,11.826632132775192,15.568196531052985,17.104631048371445,18.85520121790139,12.85588297986278,10.91905496915565,15.61195617696705,16.846164003929875,12.582105921235375,14.95530463583125,11.070973202063536,16.509146461828216,19.35624025208985,11.013075111194254,10.129986684042755,11.224295917198974,15.298968966319805,14.559822372814988,11.513811506963998,13.86927162172439,12.959053954455976,13.242831638387267,17.906534515007095,10.528773203140966,19.293158820133762,12.638258133346321,19.844049411122096,18.489698648834835,15.111890729681612,16.506328391445933,11.335592186868519,15.92971540784134,11.255136997897404,10.745159312505987,10.843308814875916,10.272347826471261,14.745756518898334,11.968580137724123,10.046540543292883,15.729196631661699,15.042042416003918,13.960407301389102,15.913763039119956,16.674773258461087,16.28342162669505,19.449179963380963,19.231105968342796,18.59757712552866,19.064869434289356,12.333147023378285,12.367066536727048,19.62089767900746,18.261936077269542,13.156505523369816,11.146999164260578,10.216588142075056,13.134253654627202,10.934367185814475,19.561078083953177,12.2889149259674,10.65770258372192,10.67515448514765,19.481981542988215,14.257769884677236,16.93144644661056,18.62492332395956,15.540442991965522,16.188507363715534,17.07249224109239,16.57654213543878,19.335931539669918,11.519855368688074,15.411014622332427,19.49914569122697,10.230686338814316,18.115567576934726,10.251129058816362,13.77068405251941,15.366966466796331,11.607569924717115,18.559195425960937,13.539447245165569,18.690120013383613,12.005541944565486,18.907302050882137,15.542087569450775,13.008942646935138,14.84751279524058,19.944329545785944,19.96139342614631,19.357420943941104,19.236372277770027,17.656412669636175,19.41204185265036,13.907278357517487]}
},{}],116:[function(require,module,exports){
module.exports={"expected":[0.014604146578048309,2.1788430714699547e20,1.4680358528137894e9,8.022094595727365e-5,30557.150354428595,0.0001031247220560062,9.846361678503676,4.8913676703600544e8,664.0993321538708,9.996226081014438e10,5.22548479129052,5.081672081526415e9,0.01703961975995294,2.1428510584281906,0.006322405685782386,9.532746423925914e12,0.26798241350351587,1.2852396182388214e10,1.8445408054654844e25,0.00019546362206014292,0.05806915100803022,6.076195267674547e-8,0.2024689261837558,1.0231369043037151e-5,7.859543641573733e-22,2.7336040363512506,7.998364345721695,5.939339149003796,0.040680633902776805,0.00018023494877096276,0.00012154652254987005,3.486524746650951e-8,65050.423098048064,389.29383229745014,2.855697882648599e-17,6.062777098660245e-6,1.0890651836221567e-23,2.6677770817001667,826.7556181760303,53.384126741530324,26640.341098306162,2.835997635745033e-17,4.20394335760907,0.13548544752435182,1.1528175376730676e13,4.331645000112324e9,6.621500594770532e-5,57.2475468196874,0.00012741678854314242,2.563908507448204e15,2.500686430949508e-7,0.005878508799339118,7.046480193532283e-9,1.5311166096025343e-19,2.392063705177714e9,1.4429096844347003e34,3019.7122813053147,0.8286450764735805,2.387443907613307e-10,7.56137272123635e-19,0.0005294597678879541,3.303695430629344e11,64.32445256734654,5.769660857529284e-11,1826.2479544164105,352.33149354838827,4.065579315097657e-12,330.6325536907624,22.532645482526807,5.644135442463676e-11,579.3941418298599,4.250627685978003e-7,1.1921122953102914e13,2.7096522436137868e-8,6.686740855864552e-21,174.06099371446325,2.2548128650485342e-9,39.37671977826349,3560.2103272795093,2528.1816343183573,0.6755856775913178,3.402689146626296e8,0.3532441246798984,4.829334086579857e-16,0.036959911699638644,14518.19184611837,926.0538140581604,188.84357525717402,4.0956771825670496e7,301.82447131909703,2.2594602410957543e-13,2.763157566289883e-9,120.40204245052591,1.857505201711282e16,1.7337486580646292e-7,1.3039149961394232,0.9670036064600737,0.000154532078034843,8.490909762869004,5.983077758495033e32,2.3842671794446494e-5,0.0009251954510634398,3.0991581390214224e12,1.886686344255867e19,1.8021848603294096e-5,7.781466182798934e13,7.103324258354995e-7,9.18533062817436,7.310251865398076e8,0.004135157446264968,198.1820419124903,0.009440216264959785,1.7563694276376308e6,6.45767465807968e-11,9.725346157110503e11,0.00047128198209152945,0.00047024428171339245,592.4275385252685,2.2250486091503245,0.00011919975506762103,2.0195622708791806e-27,5.796647334404262e-10,4.945488463784762e12,1.0611439038072082e16,314.52027166445015,7.517947373547521e7,34.44426006780527,24.5280512568158,1.8954337448825153e-6,21639.116634658505,7.564650816365495,0.5373543853459751,1.1040533257510975e8,4.8046218540882096e-8,7.037364201457328e-5,0.0011024819647162203,0.21846738714714908,2.093878935173065e-5,4.0267969243898803e8,7.312505426824739e-8,4.357182979870844e9,465.6504959662514,0.7265871104379873,1202.3624532450694,1.4054345168577065e31,173.6702357500024,0.019508077520318058,1.5174868624960045e24,0.04030455120867056,0.016562278802343542,0.010548030455304717,0.014986464336480498,2.005852933611238e10,5.6081259157564345e-8,294525.26922484086,1938.3164742090166,28751.180298819207,2.0886193995173818e-7,1.371550858057529,0.0028960109859845684,0.0027814634184659976,2.4330400307738564,0.08149820884248143,0.44923735462378367,1.4701331068843218e-9,11.112122601724085,4.614068225137535e17,1.7347132181086082,3.310216389635497e-5,9.680263884800054e17,1.70421688720073e14,0.2687848073101326,9.113061867990825e8,1.838644942475843e6,5.413085171111858,0.08051656769947482,0.06687116302770792,2.3318109147422304e6,0.14869851399286146,1.1731819608789525e9,1.3081835458771046e8,1.2263858345025544e-7,0.003024809662589066,0.7245035384469612,2.3244359064503396e-45,6.7361382760175405e-6,0.0002332409521523538,7.865870103479476e-9,0.00017123690320340149,4.980580797518186e15,4.222166821861609e27,6.609375599881034e15,3.7500965904822483e9,1.0257868466696784e-40,7.85740721203048e-14,4.22507662227984e-12,1.531816546202304e11,524172.4510189889,8.609963567327224,0.1987406633499436,1.1440024152550738e-20,6.521087491593537,5.761918760576136e-17,0.0005761393051824321,0.0002280381685161954,0.0004883686566303452,1.4954148228012192e-21,1.0337321674278077e-15,2224.515922419737,153.4740101239933,4.653465477219014e22,7.383894291569134e-14,925.1814996576418,6.185594887699632e-14,0.41513522047349716,2.3312316878043033e11,288.6001313507772,7.669504446351176,1.965675569340087e-15,3.9064713557112825e-6,2.0591537741796898e10,1.9464006913804946e-16,2.1580176786089957,0.819160890550793,5.05367977096644e24,9.130742390911171e7,4.231572735616023e-5,1.819890358222118e-7,0.017145741477711095,4.6361324542948613e-10,1.5235129238017618e-11,2.1673545648704325e-8,10.718015266619018,0.0006646786080296311,1.8802115236977241e-6,0.4322113693492118,0.1090912262507816,2.769707214252445,19.052812540663382,1.826824577005856e6,4.721634295777496e6,1.7789001004611176e8,3.6402605873796907,4.38624256803439,5.9045617921323925e7,2.7281044348671036e-14,2.9466210600650613e6,0.0023769226379457297,0.4279646379263671,65.54348467601457,1.8702079756382304e8,0.00010198005534738645,1.4565505303754738e-5,3.7782614412170825,0.9320344696611875,8.873327778325723e-10,0.00018165016521832177,1.0058588963392823,2.6487895839878246,6.3891239756166e-8,7.018901668704915e-10,1.2095902781026313,1.6846277103002286e8,25.339016538465216,1.7340619666586e8,68863.4394182778,7.177123452500998e-5,1.889970764760801e-7,841.8672876520283,1.0511664642668177,2683.147654039861,0.013693819274336475,4.461925086699953e10,2.1809728217786373e-8,4.695813467568068,3.1278934414054114e-10,0.0013481277846967856,3.3428499900025805e20,3.1946280655410404e10,284.19436653707777,6.580106253318419e6,0.0023938035058388616,0.05378733527891044,0.42898151461658957,4.880801806789033e-6,0.01663404932907319,0.06242465754611261,8.115069635902861e12,1.0572209664522846e13,1.8944357869255567e-12,7.049965600491031,0.0022397215891738,101.24734649015788,20827.38798288633,0.00010454739642669282,20177.91805407717,0.0006743290528040931,0.00017978201618590602,1313.402279955759,0.10507025873784182,7.353495278995934,2.82559828154963,2.9267268448647917e-7,4.846072316055954e-6,0.00027492494739800473,1.3556830674216697e-7,3.688749489287646e14,3.9933087158315256e7,20.732442283709332,55.703939381779904,8.620839562675161e-6,0.01032633350234281,466.5978224277993,2.800794754095968e9,2.76826657347727,3.143941167085294e-17,2.690932665068534e-7,0.7818542722288254,0.8709083242771031,9697.415876731227,1.3670448785997786,1.2962918430354058e15,44012.994337975426,4.398791235446413e-7,116.35218387064624,0.04100176097949772,0.14392549624774323,2.8526138944183046,0.04494845798328752,1305.226342377111,0.5296752524260929,1.525022563159192e12,853653.6694638919,13742.469544439216,1.0600928682101928e-18,5.30319376878705e9,1.473420433592754,1.0744075780959849e6,0.00013089810181574977,1.9239111957870414e-12,1.4107185183791283e-17,1.10269419608371e21,0.3798708630808375,4.078752597702785e-8,19553.015029294842,5.6494841568197e-5,1.2708346201537485e-21,235.5069632078648,16.026005059918635,4.831850684299831e-5,0.025464412827303624,0.9027363835874209,3.142078815888991e15,3.6534178751955903e-6,2.134979415576953e-11,2.8273256994987835e10,0.018370600152210564,37046.386977581045,0.004314268086484825,2.3142656431195306e-5,4.940360575770148,86.67025839801768,115.58448174486865,81801.57530356095,8.450066105224689,2454.7225010011643,2.7667015568691086e10,1.1772297206579088e47,1.7535517261299767e7,6.6623932554793205e-9,1.4031291461566016e-12,0.0619896698266521,469.9496743495074,2.590868270116011e-8,0.039044659692017605,4.176766191944853e-6,9.546345689195588e11,0.011246491211724477,489.4212951032114,0.03918451073141732,0.06360679429758001,3.136857864871229e6,3165.497172932268,66097.49268572591,5.125705126737865e34,6.3934468766558964e-6,0.23130383777463767,0.01737177661086116,3.536859458337719e-5,0.03355100847449465,11816.348718988662,0.24148861144058026,29.009008031072717,2.274154785035782e12,25371.02751125639,6.415427579413158e8,0.08744735231184894,0.0056585235776091,9.999484038784935e-7,58.128285070886584,5.452601930277496e7,4.5526421914543473e18,0.3615908702686865,1.0325812017116001e20,315129.2691680043,2.632787785477657e-13,1.5379815076532702e-5,0.07213192384118547,0.26203058869114965,87.26987009128538,1.0820546222250581e11,0.01553717885368705,1.1984817800104763e-13,2.728160897967719e24,3.5947446324334114,47.91985388106404,1.338718542429982,5.202862720344311e-6,3.719216665383194e-5,4.892769699984719,3.424044188324179e10,0.0007541923774460222,20.05244604900547,1.375108488458671e-10,1.8743945704209343e-10,8.031258695969466,6.668952495652244e-9,5.671588634013927,2.267244038295363e-12,2.050723710966779e11,8.412026525532684e23,5.096982673542078e9,106272.490697545,1.0503037283907514e-9,0.19364967438827674,1.2289769573112754e6,8.414467297932929e-5,0.0006995417874668208,3.423742523058593e-5,1.2884110644654938e13,6.046132400979974e11,0.16621140118980365,2.548344394491778e13,1.0284813830379432e13,2.0144723689774787e6,5.99533101438833e10,2.1942207590032724e-12,2.893493016311598e-6,6.278953386955925e-5,2.714788242761942e54,7.250384868909338e6,0.00012813628758725237,1.674455013196915e-5,0.0008939445970256943,129.07826055650932,2.6032412028793677e17,6.0644583437888374e10,438.38110972714657,1.2186656165578217e-8,237099.46500358832,2.988130559352316e7,0.002715858321795015,1.7187002386253195e9,4.311665697904904,5.3888962855663394e-5,2.456481462321643,2.6045575663807563,0.007612933168532014,53733.65272172709,6.429179932929152e-6,0.1418056622533696,0.008223642170207556,1.0377346893126862e6,0.00029178371736600936,5.8459090304171095,0.02490296595511288,0.13123803911487852,272.563720099913,3.853110800850468e-5,0.010665137951669505,8.289416005250767e-16,0.00025008120422714163,0.035928527275571914,0.235074577215123,2.360145489638263,7.02204241756544e10,7.097912813933306e-27,0.00043693359937928657,1.1848595122009412e-13,5.2254426776516425e-8,2.7910670325561875,3.403369051793743e6,2.252093948590015e-38,24.78801938144177,14801.055813404817,0.02992365553433637,0.2639622560492228,9.794720493535833,0.7433608511698293,7.193328353435483e-5,8.803149595529338e21,50.106643214462316,19.830524305280584,53627.22355745339,0.021425715310740702,381.7866785033738,0.21575363140055717,2.7197235427056218e-5,3.2929935417935234e6,0.0008315501101744619,3.288481056877477,260.30861339207723,81.23073129189588,4.900237884653696,1.2822495147594407e-11,1076.3758928760897,0.006387496772766572,1.573664211964539e17,225.50319713147647,0.30473162659160713,0.002625368332371581,6.54565115929195e-8,98.41703514243929,1.0561339676694658e13,150.8319086732132,0.5442035464643221,6.238017230480412e-29,1.410063257106625e-12,1263.4586518871924,6.2005258015869964e-6,22.01248274340004,4.584175977078153,0.002571312656174684,2.8981826021695623e9,0.006508325631116963,0.005072380903035267,3124.9516239591453,0.04109572577207163,0.00374311266315147,97388.3407988874,0.24276805219949363,0.010308878224801567,0.08486508865133083,3.19023110450303e29,2.177486650028973,226.3540155201781,1.0549332437292533,1.3288713720426326e-19,20766.483274757004,0.9911062825464888,814.9871163321867,8.883986380602938e-16,4.218654276923921e-9,357248.15888863127,3.164169829650968e-11,0.00013402882057917824,2.396463219549113e6,0.01940086225930037,0.3925541169948881,1.6433230119613804e7,0.0029756991683808818,1.18463504865706,62862.41806791243,8.034028650539104e-27,1.7017347557610703e18,1.0499512072240883e-6,274.9881183376573,0.007235721617598685,2.4484434726569174e-7,0.017384605516779884,0.001036578889469555,635818.0998812326,28.783845426728558,10249.057420092133,6.264778868674097,1.9396263970195694e9,1.1236952429900125e6,3.165293958550704e-9,0.04401319027625325,129.1952673203436,0.003343261261770967,7.301480716265018e10,0.004141581084954268,4.672514466097507,3200.4513846505392,0.0021063701299834383,0.00021544181501468516,108005.46495560919,5.141180426891656e7,0.00019068880002345027,6.371219035026668e-17,0.09311317688321957,2389.862304980405,7.06540939623893e-18,0.9928051043658063,0.41819145673636654,4.271658665187977e-21,29.262872872194244,0.8211126386771684,8.953944945291788e10,6.641257660707732e-13,22.924061701009855,2.100542586305928e6,3.5851821336337955e-10,1.0482917407244017e-28,0.011892243233569588,406781.8228844488,1.7864611637383772,5.468907159768183e-15,8.918514322401312e-11,0.377949909180309,1.14547102290041,1.1572717194793828e16,3.089106899917881e-12,4.456112904140979e6,5.937678354839487e-8,0.1253086719683683,9.049331911015426e-9,7.017249331365934e-5,4.92409032063261e-5,0.007824521780214151,1.0265225509123608e-24,4.954918750478354e-7,2.99851559642412,2.843346716473235e34,94.5938193098762,0.03490758771364948,3447.4665438030875,3900.6258743301855,1.4391442463701502e-7,0.0008695811293260799,5.19529693784676e-15,5.748716148829584e-17,6.645701214145675e6,1.592328299129842e-6,3.6756047997856846e-15,3.419958338089483e-5,1.5589861501126151e-6,3.8756629946346503e-11,0.0014232589090849468,7014.098402353171,0.1162415989542743,6.036173526347394e-9,6.686254807406492e-11,3.0658409953887036e-14,0.012300299857197355,5.152881041478678e7,0.011231213125694804,0.506834913014017,118.73818908311081,0.012226546263280277,1216.8579909424602,0.6339258750062708,2.8410565129918086e13,18.201006829062884,228.17471681453617,287.1057621272144,6877.069609734479,0.01130062700542332,3677.6874473698876,2.381768064033114e-11,0.2324326058910425,69.35086960492029,0.0052406501508606,3.601404901989988e-6,5.530498555034056e11,0.05740538051753323,0.00031381967442014144,3.633697409216153,2.816649279351896e-5,1.0821100750561983e-5,294973.1363561629,1184.7692436895813,1.4060626839831012e-20,9.760011133624303e10,0.0016465963952688961,2.807369651354876e-5,0.005049507569001608,1.7117042062322784e-5,3.2867997510048193e-6,3299.24168953371,1.0513400137252231e-14,3.4017291952499285e13,770687.124368985,5.0918897424617775e19,0.00105035290403486,1.3929086951990463e6,1.610371705608172,2.277790773672754,109756.31887273012,3.42318741498137e-5,6.708395123134253e16,1.133504844018569e6,4.692986374749012e7,16.675717711405383,1.742322850508395e6,1.853583228509269e8,19.454951074400427,66104.358270663,3.6703608914933166e-10,0.000724644048676841,3.8924031399828825e-5,0.0004127873391964902,0.18670056934283924,1.3022362729695184e-6,2.309704855718262e-8,1.0526482158602236e-22,37366.43597763897,0.029117581209757992,0.6947208773605691,0.0003205708579769851,9.427982331800998e10,2.6254317946794236e16,28.323411348874966,1.0774634810858119e-6,3.5161922247784355e10,1.5170283024693938e12,6.96605614257567,16.42398260594424,2.3853702164175875e15,0.7596988635185322,2.804472694735717e-22,1.6580028385405506e-21,108963.0999455722,5.440424383708857e17,3.234657480196398e15,649.2807083522814,0.00017051248759218215,59143.17358650703,8931.853065594578,1.3005282434336725e-40,20.79239505446315,9.409006297267787e8,3.897876397185373e17,9.421098744777784e-22,0.3944730681803408,398.9105655727572,1.0974505881105287e32,2.2238985346719286e-10,2.8077460246070123e9,9.427482424081664e-5,2.0552338868294698e-35,1.0273481382974502e14,1.0824293947123156,0.011034040178070352,0.7867833944597544,3.619726027379883e7,4.804289817382101e19,0.0010139808886714,6.790285933782155,1210.1907996925727,1.90838947245018e-9,6.776225337147516e-10,3.958664139869046e-5,13222.131584898327,1.3545643792733293e-5,5.1141636244542456e8,1.4377599977466455e11,5.951372231595877e17,0.376300696697536,0.0038201577978643733,1.8883914163993868e15,145594.5763947107,14216.665739837781,2.4568944287059714e-25,3.755233556157441e6,0.0017854069732963632,2.627666964335855e15,5.6612991594666354e26,1.7612002020717433e19,30764.08198012388,1.3055251531033007e-9,0.02820932804177906,7.934343248618904e9,684508.0821390967,4.2823237439533256e-8,1.4846154056783307e8,8.7751474513606e-11,5.254547235434041e9,2.4156254271381977e6,2.2910773067852726e10,0.014447156748807019,3.896691577247426e7,1.455832468089126e-22,1.0549956404748223e-9,0.010084345215788791,1.7314838806044782e-9,4.552077312661475e35,140468.62248494156,7.387956617272877e12,6.070085155988287e18,18.553741601955807,0.07569977399997632,9.004060613147951e-6,6.776713262764616e-6,0.5719319768207712,1.1324696404298172e9,32691.819432907047,6.549391429531678e-6,4161.479300470751,4.657823149676475e-13,0.016486165737912374,550.7521148181146,1176.721564036468,7.462044941240539e-9,1.247218940533049e12,4.763985882985335e15,0.020018460659019383,265.3700606505715,1102.4743706507027,0.20395245147482075,7.279869834147253,2.8966523719948065e6,0.0015281072308462014,7.024127526336419e-7,11.292924546351024,5.28245613123137,8.82539449200439e-10,1.2257503086251772e6,2.2279700274783878e-11,10.145228698459754,56.09529023866881,5441.39181634611,6.929285336499793e-5,1.5373371533936766e8,1.7849017435432049,6.028721663789646e-13,0.0025372967848292342,0.16062545984510612,0.023814805627305348,4228.8747043428375,0.6452911467684688,2.2307959729136015e-20,0.5720607919058734,0.0026580884546183303,0.011846971319712539,55.135602969655054,15670.055364218531,3.6773360878440543e-7,4.066203840524384e-5,4.1368517193646134e-11,99.54346052922811,2.4466873566765613e-8,3.381017215109399e-6,4.190567686169555e-12,1.3871714209066178e-5,470.7807938156931,3.930745227314512e7,12.022844307522615,3.2040340631479085e-11,2.943773495077305e-8,1.401332338614783e-8,3.6590529251584956,0.0396869846325079,0.18897267222720027,8.998535069883317e-8,3.779288541953089,336.8629247646671,0.0041568578894962144,9.495176970635288e-10,2.3549317214365892,88.88600022380042,0.012344286285566344,1.745809047919105,0.009390295139865739,0.0011809973739256626,1.1870239051239452e15,2.8183867835092144e10,0.010406030251325946,1.231557216002479e9,0.026976129128797512,0.03320178138286771,1.3983968984987939e-8,66.69280744002047,7.134364716220188e7,3.304512567248554e-17,5.096850830837598e-16,47394.7620247696,0.33779401801476205,5.171490998787941,2688.9441232950567,0.03726260534484422,891.8389895640925,196.33923204395512,0.00018107382216001001,5.87380409919309e15,1.0866701111474797e13,6.329815320329294e6,4.510413958590431e-6,52756.46440767775,256.9462181191134,388101.45589847147,0.001566931567579263,5.158198152551392e7,9.87296927841763e-17,1.0935616530480526e26,42913.3325738029,0.19281131127919793,6.900874827340799e-5,0.0009240740390987053,0.0002105169335620352,6.425985614140442e-10,0.27689855860452217,0.0007832507664393628,571.625078579812,4.411922352827924,9.049748551090884e11,0.13574054877070915,0.3515563533158995,1327.30552990881,36.254261164764614,2.2643850346542858e-5,0.0021517071613356992,0.022535064701390092,0.027154507793357333,7.611727893781259e6,1.6008962342154966e14,0.015571720140880112,1.497835989270265e12,1008.360510880206,4974.389033287098,1.0677638670188937e-7,1.197394848243287e-6,1.527017961212808e-16,74915.69040153989,4642.349269532275,7.9575708786017145,2.0884562677664076,2.3373610915916174e-5,26159.950722503465,0.39514211253092973,0.5445416635030995,1.310021798972346e-5,2.898613138793172e-5,1.3285365008335236e7,589.4684220665147,2.9427203928595376e-7,1.9098289251086115e-18,5.877802285687525e-18,0.08382028473883339,8.196330679574754e-6,0.004111690106936481,1.927048338945428e-6,4.850554312403391,4.654785988411879,6.37973172098665e-6,4.095832711624955e-31,35717.82653739553,0.11810357636214897,14.531904936021474,0.44553385803354506,4.228184348855061e7,8.384936977568303e-9,6.423655638386044e17,0.5899413281603345,189250.7455187936,122340.54596272341,1.8044919807282652e-7,0.07653506000073457,0.32166510013226973,379480.1409475926,2.3032769683536848e-21,1.337557589319337e6,0.04868982259189922,2.3106445394024346e-16,0.5578681288919836,6.38455228285759e-23,0.006049691741447948,3.9415877356678843e8,1.6406320310504301e-18,0.0003257266742419722,18689.506928726416,7.689000254644147e9,5.24639781238683e-6,17.18511783744171,361013.0910663634,1.2391961893261545e9,0.003621358307831536,1.8564257866632528e-8,2.6110180743496247,3.450878077314373e-5,704832.0067340829,424.4402756657385,2.2077293403690956e-6,0.9575410811609356,1.520071416079275,87.71885798186949,2.60573377538609e-15,0.009527489799146305,9.624298413032293e-10,0.018904854061443578,2.327111088792894e-8,1.628305265074174e-13,851.1073923417368,157486.93164725267,0.04702432968435989,0.0001825189095882221,5.088010402820327e-8,3.8107094513649478,0.84916447779766],"alpha":[11.868993067705322,17.375735749339725,13.449096513484848,13.376796544756608,13.435816398783873,10.390181414764566,18.566198368241114,13.464293055371295,17.268057512376004,19.93011711948395,19.19541803143939,17.621990590536875,17.061968490449516,17.72450941764488,11.830198595966813,13.115056816289478,14.582725924322958,12.672118461972271,11.810567970396747,11.275065233223794,14.521540945534074,14.614151624871903,15.682587603792854,18.152025681772024,18.00459965072357,12.273339673777812,15.095965002170797,12.253782771916269,14.36356577797103,15.078389671846402,17.83946707370048,12.082730718988044,16.177802739211522,12.801431538633096,18.064418054644733,10.114072300516144,13.870053331983339,17.07426331731004,16.479217841672096,17.21264811408411,17.8705057516517,13.167739891162825,12.332298210537061,15.819199012992513,14.436431444460986,17.038746155753707,16.791653152074026,15.624028931361476,16.683972286379092,12.644485685051874,11.134464303070581,18.377866827368354,11.079348091329678,12.824969232173357,11.832451510405837,13.213350843403886,12.848372657346612,10.103848074466493,14.352263118879808,16.839832974797403,19.67711468862507,16.868839305345283,19.397522333419175,16.231024902778383,14.754741147493831,12.333733687894455,14.428837287773622,11.9902232213785,17.34749839130338,19.342474969767345,16.89524487079768,13.713392181353077,13.88150398337684,12.395952522447857,19.415904904022764,14.061019288514785,15.467286104093567,12.066913347173692,11.899181051931485,12.292347183228188,12.05352806090045,12.211887754293688,10.380124371969695,14.534688532946411,16.01500438793382,11.877631553024843,15.117437464703126,11.099131151938064,10.685294735807766,16.114415960967975,16.270071065628734,10.572303228879846,14.477482280863146,11.629070817897516,16.192426602570357,11.412644870877262,10.092065533149484,17.628827004145677,15.294361846643218,19.101816020217623,18.595935527750196,15.923776407822704,13.29054564165875,16.864828146679706,17.217678586253385,16.563992547456472,11.172575417357242,12.127384615963752,15.39422702704904,13.149884150538469,13.114740049910079,18.44688734293782,10.228463587962565,14.96985728191909,14.398689629533346,14.284566147119586,17.98226902083799,15.798721315781727,18.766044993791887,15.766271116417588,18.033553339199784,18.762414856164547,15.570726444184785,10.955051333017039,15.596075448075906,17.75105089996232,16.73922856761316,15.447192134556346,15.315860259902074,16.9735574828824,10.361783004121785,10.742951709538946,16.903351789715273,11.233873974823418,13.79389306492072,12.231985501399187,18.85409739955098,10.082632400582463,15.729673679726572,19.83017475656515,16.657273338783895,15.96811802367559,17.078531461896063,11.507799612130231,13.178053181666458,13.89830751635768,16.68169123532629,15.821214085565344,13.805466802141256,19.61156890841985,10.106543635886249,19.748601363960475,19.351324479961743,19.885097607755473,17.09328925635193,10.596256268923195,18.958190757710636,14.376809700952247,11.21656856964335,10.531770506672215,14.275882520589434,11.093998696349242,11.846595863539779,16.947354218691935,17.922743796499216,19.778002256363198,13.649518630734951,13.41147113105453,14.115360568785755,16.478501768176994,10.440606064107987,15.194054882885915,10.041501436968744,16.65712134367414,10.71401104421535,10.502720842391662,15.580840008229481,12.975422311713427,19.384970955871935,10.000694893909403,18.144694958907383,15.230346413494072,13.161476759165494,19.44453301587688,19.488861492641725,11.889495909106493,15.333025610096628,12.057707970240827,18.841523010477484,15.858356779261754,10.174880840296153,15.069841596757055,16.70325713564379,18.861328240251748,16.06676114388866,17.60386737474715,17.17582001796373,17.64056083850943,10.36041995201505,14.487124367730289,19.33984931111344,16.881042345000218,19.347686466570522,12.85382657517286,14.040130905936657,14.86015378851632,17.47190924437798,19.84881126439129,10.366354091238863,19.168839210379623,16.081355654403968,18.200019699782004,13.168993077232471,18.97923422057441,13.058199850504808,16.053013815697135,18.647882224701135,16.013957003997444,14.122905199134866,10.139483053727691,16.81326800541126,18.882855104289046,10.820077883013079,12.195225259956157,16.125800400300378,14.967606331946824,14.973483492789699,16.85681757996691,13.766415499864733,16.639730811928224,17.921907254421477,11.892242525110852,13.162526247801116,17.06876372221282,11.333275976049759,10.045851273199728,16.88452729502174,14.056826952338097,16.206485081056158,15.074586769164,15.69290085286582,13.751719547460821,10.426139410598491,18.54269681200089,18.981966878763664,17.07376941986987,15.081203892760184,10.432746022474639,10.295976068455062,10.729811379549988,12.518801256744862,19.445146978733924,15.979393381655358,10.094201099544527,12.970209165774662,17.60980744978673,15.192846357498935,11.24281089299594,17.718933566409994,14.63090422346978,15.309259182637271,17.330364675024025,15.530645877605052,14.055628768576142,18.807045544916193,16.205064691641944,12.60066272420023,13.842481827263938,10.523117918867744,13.298924814019076,13.498588404586716,11.669014780407569,15.579761468608949,15.189925126608895,14.957369657830135,15.766169617028341,19.934767449183184,19.420474300351067,15.052280900014772,11.218149691395144,18.193657716252225,13.098510471606046,11.193470292141221,18.625404536425687,16.306440507265656,18.89364246887715,17.988417105158263,18.064373725767354,12.015151834996749,14.916458085410689,18.296004661888368,19.881410732577358,12.56751835002943,10.542815986332483,18.97689939856525,12.677510266356764,12.641349020649589,12.478898378682683,17.905681323956124,11.222761145855468,12.93354747850237,16.05540662793713,10.161128704293393,12.866402137995738,15.056390500368321,15.390106867431834,14.133105139942757,14.30606407034402,12.719928672477794,19.60207574943334,12.774354746414536,11.475463874301186,11.087457223758552,16.578019300098426,18.74074211947116,17.87799323595007,18.624806253207602,12.457031905981012,12.71960401857418,11.824592564715545,19.818443728865056,16.79206525756541,15.429581711821802,14.649405429557586,17.089059414946416,18.522122154360435,10.617366027324774,19.113761756783205,12.423203446285346,14.053648296749515,10.075922458098422,16.552570275511115,13.438182252795695,15.463811875104286,16.271000530200677,18.424057675486573,10.742837188450254,15.048500887060268,11.857199097789316,19.73492766126997,17.905164951416822,19.86248363660736,18.147830296086116,12.30286796583182,11.115289674847823,12.288323720237566,13.922661511818612,10.82590667228574,15.135539334994721,12.440240011425725,16.328340881938917,10.688564751787254,10.850475246376504,10.599173996317734,11.749496601891003,16.58848284964621,18.977782666123982,16.26543156266881,14.326580888027365,19.065958440890654,14.516265654779048,19.822885287423265,13.97260412496965,16.064570104262224,18.226511154426944,13.659077821718624,18.778571167000013,18.946686515983046,19.496409200546605,12.172861719938663,13.194231992842536,13.97369327098448,15.457458403505829,10.916268391035544,19.572603483118506,12.826916732573014,18.12726139704648,15.803734943368028,13.829347685623238,13.463909263291285,13.108055572343886,12.423714648750995,17.66590853482934,11.90331310775065,14.864942580387448,14.575296552624957,12.733192635973259,16.14841558543238,16.768080464922832,16.487552100279856,14.000219457611113,10.271222219617997,18.37423790458778,16.959326672001215,12.49309567386094,17.95621845365205,17.551936068125006,16.331188934473495,16.680035693218578,13.555849074525948,15.121589063504068,15.775748908759509,17.84976194034077,17.907029125815534,13.442857554669075,11.066411531604942,15.419890353115047,13.496393202029642,11.51359464160449,15.571183208475457,16.777672159413896,11.810785494555669,19.908502191553048,18.866934247274422,13.825285885568393,10.306466762258353,17.619089284090705,15.323587199545432,15.596987461684718,16.04729668572201,12.931159294052215,12.365218147303805,12.723614638100663,13.525077198569004,16.170861652672585,18.499399122175753,11.962197303985425,17.980256267658383,18.201900271482856,15.496352782704223,10.828134435810217,11.87859827875814,16.15597967564463,18.2377100864599,14.485904609430943,10.253256133017688,19.849365280132787,13.063976217354128,17.04329683951505,16.004893720128592,10.202725881934104,10.1168266215296,13.039861875193262,16.193868347130213,14.597848554442143,10.956819766160882,15.716009493741044,17.519745574744572,19.74807305647062,19.435205706716904,13.718867877544593,14.24815314908601,16.07827810210589,11.451847775377498,15.343795900509269,15.846112322564343,15.789131719571847,11.636834590573278,17.247719052763124,18.284040068299916,19.251649374707227,17.497949250822373,11.71892133852225,14.418405144045483,13.653937826328502,11.287999380964571,19.625542425269728,18.523392135409413,14.629642286313562,18.642090001111313,10.196418138472316,18.724111347449778,15.841887679843543,13.712798814531443,10.525058057667081,12.404825602401024,11.774301087396651,17.859123117075924,13.644258098689734,15.350220477829895,18.994029493897653,17.73788558796501,14.053146662236813,11.727910439742619,19.943573047854944,14.8481810027242,14.301820924230453,10.46905301409083,11.19927196113994,16.554415641528088,16.51174106309914,13.84640346220954,16.738148580700408,16.44841842791627,15.25041639965057,14.152939213562183,16.222005312577075,14.937631168355248,19.466239050909802,16.468867264532424,16.83394445423427,10.309934516267242,11.563561663093033,17.268149560094862,13.458302046781668,11.217593565320422,19.468700689333083,11.352677274088304,14.166175795859138,13.894704436385005,11.917904097066529,15.285157263511993,15.267148181847933,11.313874548171231,10.787338953019894,19.46317275871854,18.05217497274039,14.223127353663882,10.101717995978872,11.539382923950894,15.195680559699213,14.50833855528941,10.8700716825979,17.455083669465175,19.90624082853587,18.772331691362243,16.55905199044595,12.879692814747244,15.612018431855649,14.826506071135475,10.569694302576107,18.23776277854845,13.682268416335665,17.860682686894613,12.522043583640999,14.12573856467846,17.538006103635325,16.88660241285304,12.737436376234738,11.848906171358307,16.95690789913583,18.64439935894347,17.007361356998103,18.174760735576655,13.462887186990447,19.808209688692756,10.603736636863434,18.56401497177538,14.08333886737649,11.061423054332701,11.829049061309734,13.06753588821391,15.852951472178884,17.35228471651562,17.110948437743772,12.71434785067835,10.098959346462149,19.41340791063258,16.639029927112595,13.233041931791334,15.747239782090496,11.727730777599835,19.139358488453315,18.312278965014073,17.462179727722173,12.017869846278817,14.969618100374385,17.53101840285715,18.946558541167878,15.262050796025301,15.146677599111104,13.858956748546849,16.855043444325773,15.172039921007263,19.783665647008313,18.245669328381336,14.915489775406161,10.5976156643261,10.143440127689125,10.807225831848722,10.168108387595487,11.821430111719689,13.587812018322733,12.981579892552253,11.232626588542642,13.221893998774263,14.202942902918732,17.779434936876886,15.982846271895642,17.042786900830407,19.679464323196065,10.219543212251578,10.294982103107436,12.073764632035495,10.038461036115473,10.264764317309616,19.698412151000127,16.21446414857216,10.5100904721902,18.406065803579516,17.345062237576975,18.713030298627622,17.196287311789604,13.149307533003846,12.523747405448306,16.680281123508486,17.779051651251855,16.17975203344014,18.567096900374732,18.547923191773446,15.042264948275836,12.333358609049192,16.83305800233891,15.963914123268875,17.38545731911328,12.322770403997971,15.834210492347644,10.159001409331182,18.47046820823789,19.038278196220087,19.279208011231077,19.689761296583605,19.735567278861676,17.710755311302087,17.80709585855403,10.601369192510425,13.17138904820925,14.219532053917863,12.624015311799472,15.674091291814072,11.35612872816601,19.885108679765402,17.816825959378804,12.117723261787186,11.774443491891773,19.523272372345314,17.80104937061315,19.017184759573084,10.30288967739674,14.478953877554838,11.644410515869195,14.126559891950839,10.317962962386337,14.111450059262289,17.21091373589176,15.032024946720338,16.897682055322605,15.601309549098815,16.20429827029536,16.758674401611835,19.31419788088713,11.05634909686742,12.133071939973378,18.088669219179685,11.583313731978615,17.22390963267424,19.73141644691445,12.3477143395728,19.447085583816612,18.236478249187957,19.357528534160885,19.547226599032278,15.319690853707113,10.947783057980796,17.064221869192817,17.599122964204973,15.80027586172783,15.349585931653664,11.571428711862673,19.926552664886522,19.04247031140617,12.440188786563617,15.551329127283237,13.730286239653042,10.536937245030586,16.53721519058749,17.257696801759376,18.447231525850793,14.048094101936648,16.694330499282117,18.83782073714955,13.35084147933157,14.178308741576624,14.975319075336177,12.750991644754784,15.660561226093055,15.547461013190507,16.837437284313076,10.997316542968251,15.856865106602239,13.989305640688732,16.0351275421103,18.543994251114775,13.146282808513988,12.632121590473064,10.637405625233407,18.277052692568322,16.6838681309769,13.99841134138281,17.237348063964532,10.160878968004653,13.233401379101428,15.476283986357078,16.466748064010883,19.585017905811085,12.939430242021375,14.980029173163501,19.043397611066695,19.655248928378857,13.040496005533267,15.127043580401553,10.070167401077283,18.863855713281765,10.335656382113696,15.734953760812338,14.621038327531766,16.280550535349438,14.540761782866314,16.46616932274275,16.03684926733677,11.020636106639177,14.464498417029745,17.366758312110555,13.67017322283669,13.797051994212332,16.941004944147352,15.418465639731625,14.11764519665077,19.499611712599044,15.482756754921903,18.00317122243108,10.405850279524218,12.213880781533085,13.51146703846765,13.55411109295235,13.411652809480966,15.543201917328188,16.713240134955225,16.933644891663953,13.221342697612501,19.975529247354974,17.423893717357693,15.47566787810929,14.157375060755307,12.862020920517612,10.184707819620671,19.677642324403095,16.840853161132507,16.71247874580497,17.54374931235044,13.256263173081429,11.09563311940083,13.975537145614085,17.82776386991756,11.9134226436955,11.455967554543964,10.52082117951971,16.75488107521105,12.193682295956194,15.478471285120886,17.632417523171437,14.603593540560858,12.188897891059401,10.73520110960654,15.638903851262747,11.424341476398492,14.767122107800578,17.85261099873015,13.226127796644008,19.54760393251238,13.816549232668287,16.82589427136725,11.986119137132489,10.25547785982451,16.383837368333396,15.927744146929225,17.36690013997991,13.491231749118617,19.47193535055854,11.25881117789932,19.283605774398993,13.256384686602251,12.877015677047241,19.956598557796696,16.7949541366263,12.780241491697232,10.597339684446398,16.573890287758203,13.920716247703373,16.550702505168033,12.280460468013729,15.185096144465351,13.254780845867383,15.614478791138986,16.840671950538376,15.470913560804911,14.466897466769094,13.217233298922093,15.001595013511409,10.488203955986746,13.004834981172227,15.857628818406361,10.858948018086824,14.377034522147621,13.828543567860532,17.783278294767285,17.668606600491884,19.454928493882115,17.920202939075445,12.648326597438338,18.877192892947683,11.355305946558513,19.92741568845687,19.617785777827557,19.142573513629447,11.189499293379285,16.229122954792892,10.288053548167051,19.498269054981044,17.468981233611466,15.641333950813674,19.407522679730555,11.975326003867274,16.566996052112017,16.909334915618835,18.792705882196756,16.857825466980685,14.641767904126223,12.610456510705614,17.454297452870428,14.410685995906519,10.293382039765543,15.692310950527089,11.195552873976709,10.16059804327959,16.41017122972063,15.928019024029204,13.999869344497466,14.272297978068671,10.11616110801702,18.2662859406109,12.791030962168579,17.149543610650838,12.695061724934067,18.508306158482384,19.750893744641637,11.567735109711295,13.007020132905643,13.747103263375156,15.285394076964792,12.671617122412854,18.817023338303592,19.476780039768595,13.199176436375627,19.136529864195285,17.0555065658246,17.066997509447972,11.528390377169504,11.687865597486038,19.49239395561961,17.354679180735687,11.43383916760017,14.56062047970038,18.631538004298868,14.820082499403668,12.845628179134714,17.827378808214334,14.705344724596788,10.136816804921875,12.65517285293193,11.38379054573996,10.369149893430333,15.968955056513662,14.200794422689246,19.5327520500471,18.213672567115502,17.62040515699784,10.08573297846304,13.75314076579545,19.524420783926967,13.840459198783915,10.671186039111152,14.621538148811569,10.866011135419908,15.856663516870222,15.16766598293714,13.478974254453322,10.700954663739475,16.63253183705083,13.979006835249535,13.323190535108413,10.954642387425153,17.326881167023746,15.242333514837787,18.99339038100613,17.28421432803129,16.112426357852243,11.343418193494442,18.501546495580424,17.839167185110327,16.002243151059155,10.412559097119622,13.666271519848651,11.377485394644005,15.339016660309085,16.261867782374726,14.901621090242774,10.96216256116389,19.505455772550505,15.399154049074916,15.385680622333426,19.87932225303831,16.361793278707665,16.447170410100313,10.89915225765601,17.79664606959641,16.805431749666617,16.59249111262317,10.001613712249128,16.318213474341263,14.558751181602464,12.803492769166457,19.693606133440994,12.13838089854695,13.470957291722714,14.095815049307435,10.44038227224712,13.19095543430178,14.774191885807378,13.253094457106439,11.370340159225787,10.703724722170449,10.876324075097106,19.864448375415343,14.40297484046834,10.383442671882111,13.035539451880636,18.28045653861922,19.412373771807616,18.856447807404276,18.99621783068448,14.157928252250635,19.236960735118068,12.429756378951648,12.541803530948854,16.12222338001647,16.964768931227844,10.638670158549903,16.351076113275106,15.67492542434853,10.68986344611124,19.958200664568007,14.368267285993914,18.958639393222086,14.976269924020889,19.03471244748821,18.1662629335921,17.968131785463846,10.281477988435718,11.026275643080517,12.398538405405926,19.93222334906631,17.223423462904254,14.650578988190544,15.437931807626242,16.11485139603645,12.658464095867327,15.215609794259521,16.196532661585536,16.1070140857084,18.556331263617167,16.523236399877568,15.832808731086914,10.81244640186667,18.395828297941637,14.976036515300919,19.960040255929773,10.547430040398257,10.311453018141991,14.097638778316693,18.901743127292455,10.093963450105218,13.52706124058727,10.367783535339045,18.8933947636882,14.906514651532666,13.004647880361638,16.870997841630015,18.29690725546392,17.892251150045873,11.825599924037851,10.492343912871206,12.985267926974473,11.227315721168498,14.06337509636516,19.51166717932321,16.286132106309385,10.213377618514576,19.908127888289187,13.28272349402809],"x":[-1.4399524726250719,7.18703758787327,7.505128616636272,-4.34249489025082,1.556153881055109,-4.616080233187632,0.5290760154349332,5.914802711768874,3.129970145713891,7.08147446498757,0.3607091148931545,7.090124076581201,-2.009012701279101,0.1736545519732764,-1.0932338789158225,8.712050141943248,-0.6673852514027292,3.8622747862618922,9.135432796590832,-4.753502617456775,-1.2854412632962706,-0.9453623855080373,-0.7933166413733419,-3.1531711685322628,-6.4510690324599995,0.4291254459999987,0.5469610311922461,1.2640427007557697,-1.0677589413049349,-2.1631882976470047,-3.074930076853833,-6.119069124251839,4.5776589206732,1.3179938556127313,-6.0116492801707455,-5.850161180743797,-5.761354704897881,0.44646261115483643,2.981914454174712,1.6177145163012758,4.053950157479949,-8.230539564384333,0.5973328158890236,-0.8072129098047327,7.120256623965549,4.021090183126663,-4.277695212126975,2.1828431314160994,-2.3336420204655144,5.3915511964780505,-4.147106851119407,-1.716571824983058,-5.5682390531668595,-1.5222883889960248,3.664043754422812,4.568328264878483,3.8686367687333876,-0.05440898960613838,-6.573410776508359,-7.702348768711265,-2.928437784635049,4.493004678491063,1.107492723398738,-7.443537131316151,3.1332489947280555,1.2541981457788998,-3.9909577560374854,1.9150252072916447,1.146222604979405,-6.264857991987702,2.53609091264744,-5.1860738780762645,1.897453912139484,-6.0340483430130565,-2.4298217916449905,2.099446011946821,-6.301781988492097,2.1626147345401154,3.4582508670010466,1.354444379261357,-0.28589289590911804,2.0355694234873645,-0.7021339443234531,-8.012388350102098,-1.369036096112663,1.7212263418093565,2.8448455285808256,2.273323387131163,5.440077643359169,0.6741720525116635,-6.606129970056858,-5.668475968250267,1.8935720685646151,2.4627533384364364,-2.9481159953599256,0.2030011411872401,-0.014062661369846907,-0.6941347884168381,0.590728245418493,4.283584396503722,-2.6173659898028383,-3.0161727488618295,5.169680941666179,7.874652024348142,-4.639993997504739,2.8076829420240257,-3.434224444525571,1.5993947484022257,7.317597829821585,-1.8546432009969505,3.113134689545584,-2.004752442669849,7.071680504229674,-6.135089426078449,6.7288805632965065,-3.9132731621976955,-2.6878273001300723,2.137716023571082,0.11830923838361374,-4.011265391054012,-4.593731005389953,-5.617124232408797,7.522529458270639,8.049396098822548,2.6332580170985462,4.937229368786541,1.5711874753837565,1.4951388160772616,-4.071507799968588,2.4797364961969826,0.8603637269906894,-0.4509379682199839,2.98685219930483,-4.6291962215283675,-2.783932135100875,-2.573166960031772,-0.11408788234439804,-6.438254228881364,3.164885962944284,-5.513135921013983,4.516115245814934,1.0389455949566262,-0.13837733369138938,2.5453758009965703,5.963260714972826,2.5320910961362646,-1.0345583663184716,8.222855770313855,-1.7053338441654375,-1.6002847468084287,-2.8330962408928135,-0.9064985063462205,4.321995228510967,-3.5841431576055633,1.655535177864902,4.6209042608511375,1.2973526463982465,-1.7429643272814155,0.15108342907361738,-2.721921977856594,-3.1659632818124788,0.4953286285118157,-1.3103376638047441,-0.4265291697715483,-3.338102659317223,0.2845714351517681,6.868851392639334,0.35971611464676734,-5.044113171711317,3.560739533943824,6.613526020026801,-0.4545879137077451,7.71812147056514,1.4533512418412031,0.8011742797637584,-1.5914703827872563,-0.9731111752477553,3.2306670208427564,-0.8220857868119307,8.618342436896938,5.853123742403974,-3.513734874849676,-2.206689313702937,-0.10425824085202429,-9.312050840724197,-3.848388658757475,-3.7214253755652553,-5.6545635887682755,-2.4469341388841563,4.449060774673832,7.068676779573441,4.332992148646664,5.11313976424239,-3.635023859170925,-7.005489338779353,-4.873694147051264,4.931907240844076,1.1222205053679857,0.5082066470292812,-0.5028385418854979,-8.394649459087594,0.9035345364252318,-7.231577589665184,-4.077613391393514,-3.740643160737731,-3.3913127936380345,-8.529283088025231,-7.899873942477969,3.5437557623578075,1.0403183963464357,8.86592507446844,-0.44599429984298444,3.038831307325271,-7.694513680506479,-0.5355612694715184,5.5693442589235325,1.0292769659301948,1.117473283873606,-4.4029332114905095,-4.040527355979041,2.0085922786339316,-8.445990400674324,0.42694204837788163,-0.14693092941547903,9.190402278956146,4.586356256397526,-3.460150787975167,-2.02881859093061,-1.0997951766635565,-3.4442404792207864,-0.29549235393768747,-4.1396246417425395,0.960308788715067,-3.30834191042685,-5.50879607131228,-0.6246165378621438,-1.162775885862887,0.503476730226815,1.2979360209646078,5.085124059110703,6.061215441285363,4.973661853097157,0.8429281628661904,0.28419916417071533,2.4356532905521666,-7.928890265336134,2.9546680536132386,-3.513482369083736,-0.40175198021046743,3.1829417543951806,5.519200010732552,-2.214327385809744,-4.474096341246602,0.8697009459862644,-0.051831759915669906,-4.159092833016739,-3.0051513958101457,0.0029005327189173258,0.2819765562782717,-1.9076544564660103,-5.950535429316813,0.08262474230622274,3.3085936580065867,1.3536644264095532,6.118914352913107,1.4843150591726695,-4.630381647064407,-5.28944456155898,3.794787982180747,0.021359647110790192,2.0721378799474506,-2.4435150514654707,6.982223217568183,-1.0338189842583456,0.7312499949784241,-4.383072609655434,-0.9688818167279245,6.866351791422483,5.00224815465755,3.5120087492142593,4.380045842077518,-3.5304432403887898,-1.234162913887455,-0.3388664253589351,-3.0050098476527647,-1.0431828720951257,-1.244039565536136,5.308462387672421,3.718675512014289,-5.51188315927069,0.42909208959878375,-2.397210112317156,2.838304522157353,5.066042000538859,-3.0655401852297617,5.244384122539224,-2.3339499292090404,-1.1987370782666074,2.4425704492436893,-1.5151309003657687,1.2003161327191965,0.395512050333406,-6.3301048929646075,-4.367233444369907,-3.715375365679286,-2.6864401126253075,6.532706148300222,2.5894759792053446,1.7564389407529752,1.1468296411364625,-1.8012600318775807,-2.6972411214868366,3.7307062836852865,3.407135343251977,0.35578639770847964,-3.4341595827802696,-2.012503059657005,-0.13267058529764508,-0.08089995603390854,4.719682643605292,0.14715086000500932,2.2857008109767873,3.7381402882640247,-6.10918828399098,1.9237216403699051,-0.9454154398139574,-0.9654340971418351,0.3664212322581655,-2.0183733110757807,3.2353211913890405,-0.46409298047186986,7.270834638592519,4.284361486665533,2.227100134497728,-9.122169349065338,5.591502613612109,0.26818998885875267,3.472089536793046,-5.221446900670309,-6.070143325590637,-5.291964845941404,9.110397121279071,-0.46138937773917377,-6.176043419820227,5.070402737939446,-4.606018338581626,-8.416381610615744,2.5850700430896945,1.0879648930610886,-3.193881575353683,-1.023252215333601,-0.040241265960578865,4.387011708619839,-3.062186344137567,-8.34724024550676,4.0355774911545,-1.6648661813503516,4.645343799862058,-2.939273201198537,-1.9106881520824315,0.9888600448083285,1.900092413204951,0.3898695328424706,2.5068852143925753,0.3438337506732858,2.3027338894625937,6.542900986759795,8.072949026683085,2.7634830800828425,-7.3308060285649015,-2.5857762801302098,-0.8460879663518321,2.3004063544079463,-1.3323208491857974,-0.747879917875836,-1.6159558425508158,5.82399769641091,-2.0499434481312377,3.558351789483253,-0.5083035849151174,-0.9429033622582157,4.995999779308133,0.5273633044243486,4.268518144390019,8.126410963799174,-2.299256188065932,-0.9812210073372576,-1.9627554509982463,-4.335626501732934,-1.7934824830943557,4.090525375984135,-0.5953909880394725,1.2509667784109357,5.272260617105751,1.5193818108594148,3.22690552356981,-1.1075338341801855,-1.537910156028131,-5.507764892947268,1.6072888688634652,1.9527950452224174,3.096620169175306,-0.4385415082927002,8.665453407494361,2.348833176720888,-7.559564981498156,-5.112804247157239,-1.427884864714441,-0.9919460961714872,2.29642095446573,7.278360328750206,-2.8148906151792517,-6.857458044142684,6.267848415093946,0.5668390798920537,1.6528491393084206,0.12051598027519539,-1.0766478249578237,-2.0210555600058826,0.4000918339824544,4.903677285332708,-2.662918360727571,0.3336716469690182,-4.491578296374723,-3.9731500686744337,0.7416953911047441,-1.1108873784219675,0.4857141098905542,-5.801456827876057,5.0202890716735595,6.9627928713415965,7.599893186020227,2.198116447602223,-4.275412734614457,-0.49448740538217084,7.158618120670559,-3.231059667354719,-2.8639999894244683,-3.1763711257933314,3.787555792122126,9.270947641765328,-1.5068459285929992,7.985707118880581,8.053304427103647,4.485254171803938,6.908116654405944,-5.652400041174115,-4.757667702645629,-3.5806074859111137,6.606761672303701,5.78986873064787,-4.445073948891243,-4.814630708728051,-3.9828295630957644,0.5019946678535114,7.891575372064235,4.500299816039268,3.0518425529225546,-3.0146135030423933,3.691531096052561,3.7361953376358144,-0.5321029591591286,5.674730383604114,0.6917132463225713,-3.7365670067863777,0.11554699766687992,0.29831580096719534,-1.8054057244892547,3.8784694224306864,-1.7213250854735662,-1.0582451917052538,-1.4965882901098952,3.866658115748296,-0.7001926179690643,0.6800143811249444,-1.0738505986940132,-0.7960435704871038,1.45005894197564,-1.7312374915713802,-1.948030696487848,-4.249043864586756,-1.1948237255760574,-1.293933424183833,-0.9969038464519793,0.3807569925458498,5.203144720372665,-4.143571902601403,-4.667512645009313,-5.224479202003343,-5.766770452860877,0.1966286792022487,6.3382586382508235,-9.029192102128894,1.0214279948292582,3.590638557925092,-2.1012641915506602,-0.5617001016527201,1.0769919419301957,-0.06634478745425376,-3.0112448626376414,7.101905586811645,1.5353262651977566,1.0940747048694077,4.203418883797124,-2.3662519414739496,1.6309653613042796,-0.7542238679226827,-3.717303717903209,5.882623080103379,-1.9907147873748383,0.6429456500549575,1.9145569204404467,1.1258657961219383,1.0375932732881452,-8.491660217852864,1.3790676298798816,-1.2514132779695908,9.145862380839773,3.339986710287894,-0.1917132296183155,-1.0024287423226985,-6.577429621482157,3.211282733478228,2.5139602122167015,1.1657965692777745,-0.2107998609132853,-7.60677598682078,-6.829145404950102,1.8028557815311634,-4.801911340399913,1.159322853754769,0.47851182315004515,-1.9135900120012872,6.596544835508613,-2.5068741929444345,-2.119698066351223,2.9617653718473287,-0.7507114404403481,-2.9749453258685135,2.8455146920891345,-0.3464747738968428,-0.520922993094115,-1.039430762633951,2.9232770780363238,0.34150174315366755,2.113587327912649,0.03941915955632247,-7.976047799581211,4.803546744695453,-0.005629333804544778,4.0502034884006015,-8.233229158248564,-5.53319118630494,5.111314427256611,-3.5397034636660973,-2.0936051325967604,6.960203359894914,-0.6995320494490631,-0.3760050587770998,3.1406908652716807,-2.3433463450568315,0.03383556320807779,3.8426233896736015,-8.773764932120867,5.451831910143307,-2.868389788726804,2.8906065428601613,-2.419136267177972,-2.939474379190574,-1.758302400314233,-2.4157218595618017,3.2751484635037516,0.8158019302950552,4.192250806418974,0.8506139431121316,5.600960620023473,4.905343845241117,-4.278267760512032,-1.3343058765937337,1.7896857429849033,-1.3749760588558746,8.021730960456255,-3.1799150328089514,0.9988201695449419,5.108422366014979,-2.3649004654148786,-4.464834242462553,4.385535659497455,4.1061506686668725,-3.1607219099059893,-4.920315960966988,-0.9752233772032963,4.923901541214802,-5.003017696582374,-0.006376817470201246,-0.5121433759335066,-2.62935462145214,1.751570600057498,-0.15169394737033493,6.0674033776755225,-4.880936689244532,1.5044290724709217,0.8776545664395452,-6.58036145655263,-3.8967778798804487,-1.9846470603418798,4.236054396294762,0.19200533567358136,-7.646075820312266,-5.44235855023118,-0.5522433613030362,0.09160003076880585,7.6437864994216485,-7.296300094192233,5.760889723164077,-4.162019568954612,-0.3539373337023033,-7.31893096769555,-2.5241532367435315,-3.659550939764717,-1.9297365141886367,-6.926551014871268,-2.3432079615300156,0.5348668619575445,6.278979378737477,1.9911530621457945,-1.9400913196693104,4.306022088353863,2.7925918118868114,-5.251299926303847,-3.6372916676219047,-5.8908890390713164,-2.5461761008100803,6.079272091774371,-2.0772054099928305,-5.760765461871906,-2.534773769807394,-4.362235599652481,-5.491277509569277,-2.587406155661067,0.7992766078832436,-1.2020200235297747,-5.859192954360917,-4.100282799592514,-4.390434142425086,-1.6129679855838752,3.9493101369129118,-2.4690756278078068,-0.3220229689890992,1.4100430930080226,-2.030902719098851,2.485415706848788,-0.21950951619329206,4.638184688960845,0.484269064036853,2.3224287641252044,1.8908767494775063,4.196514615166652,-1.1421580413611085,0.3180806850480322,-1.5543775652149394,-0.6872339737060926,1.7540291139628055,-0.4745564661223467,-3.2424126399095683,3.317492379163292,-1.178550157743108,-1.237352897968702,0.49560660669421,-3.3165187650396764,-4.018847134310734,2.0555072520695483,3.3686124774957307,-7.13978505855499,9.048331605021653,-2.0064998284428075,-4.076644904821432,-2.3495388087309284,-1.1638000661726067,-1.3325665670921727,2.3403905057257326,-3.9561514761192007,6.391598844802967,2.5909160424960276,2.4367522075862724,-2.1226852888172436,3.163394621060589,0.25660678699785855,0.4120493637575313,3.233021831261227,-3.2133913219430026,5.031131640513021,1.7352670921408797,5.041586783959081,0.5194909800902603,2.390454546472869,3.611976301483486,1.0327013419758124,3.451677005974716,-6.407621384167722,-1.9184875142292168,-3.2408169173560215,-2.0163463779225954,-0.8726493484829998,-3.424587889226738,-6.5618776768711715,-7.681429783451192,1.2765967704745962,-0.6467178172062304,-0.25600193234247115,-3.5465937467783757,7.70952572014388,3.8109731065477375,2.1046120080171935,-4.942934030208054,2.1886416159015565,7.300634451032028,0.8609044640134522,1.413695459020075,4.778119637796636,-0.18447426428164615,-5.199707543538182,-5.255688508356835,1.751599965463022,7.4718549347046785,8.489831576828141,2.225997585227459,-2.005096775326256,3.9799235449373995,1.3403342643034533,-2.8851847816892073,1.8896198566301186,7.022117725143966,8.523228290757274,-7.889163805927211,-0.6675196716632463,1.6828658020474392,4.2768442767579025,-6.716339433582359,2.574567435661046,-3.6238965266171235,-2.5533245210683964,8.519820739437867,0.03232740989851557,-2.8601292474029725,-0.10300650945319845,1.8640984898941904,8.919706792197431,-2.7699113190035503,0.634029643452104,3.379121083758646,-7.028995878613506,-3.6247078685195238,-2.415686941377168,1.435927136057964,-6.183018933065966,3.2217842374698114,4.69584205416535,7.393971418803152,-0.590561194680582,-0.896079894161308,5.846383821727474,4.458049002814231,4.042696108372963,-7.767473318608957,5.938337110976136,-3.191509046704364,7.048592111499568,9.435804420648958,8.186571212653522,4.421085814771857,-6.014612103400593,-1.835910623576928,6.713756635967345,3.5116111995392285,-1.918730229830563,6.557542570285291,-5.066469536659621,5.48076376576808,5.844482028213109,2.2441183976656642,-2.181889540628694,3.573215660984095,-7.5227380691783345,-3.2386728702950736,-2.1536237125925854,-6.83953966218257,6.6753708584600675,3.5487553398740386,6.626783098133449,2.0159835380683,0.9351514433074772,-1.1616027225234937,-3.8081052720773667,-3.7001884305788186,-0.13801409983659196,5.200013699060799,4.536450630866154,-4.77412649730609,5.093442080451647,-5.727695739371246,-1.0785095443018982,0.3385262191062721,3.0319724296565713,-7.265642838702053,2.7185821577238545,8.703811177053321,-1.5797651285574483,0.9904952404892575,1.4819709211863685,-0.2319841147822932,0.7664321717561462,1.9416025617282684,-2.4795334927261266,-2.131374249836131,1.5618296587525666,0.8679626041919892,-2.1738222021332687,4.687129079586981,-6.314269670615254,0.42697986511785135,1.8732201743234675,2.9161977508339176,-1.2033114546752421,6.560738401005148,0.2879265997207998,-8.057257320091807,-2.8436301829603856,-0.7760756468329344,-0.40369860554795745,3.9821234941309633,-0.10934834932247339,-9.2363768182655,-0.3329480375092846,-2.4181520413909663,-2.2585895439915937,1.9512989616815357,3.9659308159823676,-6.092904507962881,-3.006956988997045,-4.163452191407099,1.9654128045050356,-2.924155266505946,-2.906592201979989,-5.926688849442772,-4.136561253452413,1.707948890423332,4.516971335731407,0.27418600317042463,-0.5590706251569055,-5.902483885825662,-3.6720381691205284,0.22373422534237575,-1.928279606649082,-0.4018716586521931,-4.1230306908937475,0.5677941078773969,3.252089843790203,-2.6254218517376664,-4.082764559073822,0.3195034110830415,2.732908071578813,-1.6619900684856175,0.2755413232326216,-1.060509541457173,-3.0741456410435735,5.299468426791595,6.665284979490013,-3.44378178703807,6.0727485419337945,-1.950290560066863,-2.258549226197009,-2.8076817730478982,1.1575099755097384,5.165238295718996,-3.4204149995484356,-3.7096265757104634,6.00183608604879,-0.4855362841889743,0.5670518275138203,3.9763385994587113,-1.0173155688191593,1.5950642024391808,1.488871471857105,-3.375754500254626,7.913502115104558,6.486660299943701,4.832063553074837,-5.063370492744596,4.463287291067449,1.6391688028424967,2.7709217437328055,-2.9373284178624814,6.391715051859078,-2.9544665407050252,7.694908492232364,3.1307542090202367,-1.3009769174196908,-3.451102668599903,-2.608824477673778,-3.054458674465403,-7.8825633337770675,-0.7003892333029365,-3.9954006903901966,3.010248198286142,0.5740988360443193,7.082564185037774,-0.5244079966484883,-0.5007678504929736,3.4465821467931743,0.5798389455968733,-4.148963423618676,-0.9633666595852985,-0.6646841363260236,-2.535832971759195,5.416855573498877,6.781008421872155,-1.4585449324738171,7.9525961571423185,2.4457731645790783,3.8491135800748104,-2.0605526006237795,-3.1746636037039644,-8.86447119113224,5.620081984310753,3.6321587716793378,1.7724420659077467,0.2527169112976839,-4.1926084468859806,5.047147490044146,-0.7187776892426712,-0.2700705082785211,-3.4632074953355207,-3.314589245594835,5.591197892291316,2.0789787981163554,-6.4016132626548785,-5.267285371251862,-2.1615970002938356,-0.8506772700208458,-2.846902820072586,-2.831528352524167,-3.136287702866163,1.0498327697114558,0.5518537738917413,-5.100484791221849,-6.403567154684746,4.563551317178236,-1.0949589875088375,0.6172656741375593,-0.6550304700250678,5.5434678248116604,-4.899468124340765,8.516998262744204,-0.1235695174160023,3.578171255432621,2.582445345320912,-4.876415398811323,-1.2810066862456981,-0.44012517825379405,3.452785884751932,-8.188984909507942,4.978056658294943,-1.7307531815433475,-8.520465669038483,-0.3035237063259544,-8.631841541973825,-2.080416486379523,3.765312503824838,-8.080109865387037,-2.327229162902607,1.5953949716204652,6.255894290429664,-5.593779703532665,1.1396221701261329,5.078374932030606,4.141800180873312,-1.763396390338992,-6.2654173002700535,0.3534726253262592,-1.237577665731231,6.513173290687847,2.65487919463782,-5.881205095855671,-0.020054692611369163,0.21791330743185355,1.1813192102412873,-5.2908144044675405,-1.0527583952260144,-5.246560114438699,-2.427690826031588,-5.130996473746084,-7.483157548024217,4.254012159224498,5.143097557494552,-1.4150133506254647,-3.222689542395134,-5.975206299190181,0.6264327641991798,-0.1158093371084874],"beta":[3.366432164362967,7.707536436209881,9.47817433443267,4.241299828351308,2.901331822096498,3.252325483878722,4.564892283017272,7.64455406515264,9.98007301566439,9.843513824720084,4.370281398385947,9.865569599499155,7.452876717449497,4.126015908869915,2.046377111754032,9.70608485637144,7.062007358407277,4.594217732948547,9.20221044039132,4.196241942971259,5.936867965249528,0.44647224588202805,7.3996428111078805,3.570032495902089,0.46526176579354983,5.454856114412641,4.25087874550379,9.341383130873528,4.275699779794371,2.804290012574975,4.676207790546549,1.9474959954839033,9.230178936774285,3.5388352391808953,0.8305074790936007,2.5660761114318142,0.13021274830704144,7.994087392506248,8.907126833398799,7.840624229343134,9.32798317960585,0.4825215031394947,5.434244524029205,5.993164132228264,8.132929968410794,5.522801943402125,5.528995425268182,9.564871330698912,3.2786717054673553,5.738420689854391,1.4218131212865726,5.3234167132577355,1.2534465903500513,0.05376652140221205,4.368203996291964,4.580231940186996,8.337279176167836,2.897599830006179,1.7853340811963903,0.705650039310215,6.267743333845129,5.6698345459263155,5.732746616425127,2.2736314699085325,7.854767428647569,3.314303120304365,0.7737146727216726,4.992627711028421,6.97366206240239,2.6243676274110572,8.08242710669429,2.708287520851733,2.142294532879352,1.9603739491953065,0.2444066327037464,6.83543230826195,2.4026972565453275,8.2405851846391,6.957734717015482,2.8736054705924907,8.64476172395888,2.544932325452771,6.6587055233925785,0.7765584064921427,5.987121794282951,3.1084396429564376,7.825068585778792,6.040191217706181,6.748679041935006,2.2596101459204787,1.3245023793538602,1.0401721706079647,6.721115387860763,2.5651104720607165,1.8249822226469936,8.83222819915609,4.222730611072089,1.0760954964741964,4.526102492197584,4.367595404342238,3.388222903257363,5.47732625150823,5.840474303627565,8.485184331344772,5.236995002561018,3.283842231868326,1.3463410882696158,9.570632233480143,9.963850696209029,3.5807502884184594,9.380049442822093,6.971013438166242,9.368707542708776,1.6170594176829356,7.8888436820407914,5.514925998390449,5.0592011850977014,6.430745686558231,2.8355880978971038,5.1848484737433065,0.1572165748005694,2.666266434368405,8.88155568804857,8.336553726112154,8.53840800070127,7.714419544446518,8.244148151755532,7.991177265915718,2.9853194767489133,5.577178396940963,4.849888618211797,7.576453214445802,4.486999061042615,1.3295390663336026,2.783732872831799,3.4539301601452577,1.3578298008296708,3.368719984442654,4.418735211319094,4.27345517463362,6.134595679736419,3.2531449395795575,7.330227341761557,5.532806536752142,5.9891879070649185,8.168034286923845,3.8867174751555633,8.473860848539163,6.511657589921629,6.881207063153505,4.979840315400359,3.8245892704082185,6.117531001711416,2.7244454175417587,3.1756429123626106,9.051788838873877,3.102654322471501,0.9101373912532162,5.4396562672961,3.669232313128621,6.2057772174579995,6.431287752310604,5.559372293823679,8.821787398068796,1.5817321085771274,2.4824517200838248,7.236480304161079,8.93917474621674,4.684349815818553,3.8746113086687273,6.913154083560009,5.033099170470998,8.852633407431274,2.5085635320871402,5.49382369453201,5.870754705531298,5.132676586049374,4.772280976978466,7.9574403341599425,9.837344244563198,9.102855595547945,1.906443742433146,3.984124583083737,6.238583044418955,0.047980228944646264,2.234160493332098,5.130247188360055,1.528151616544089,4.186193521894399,4.956432698979678,7.082325872052239,4.757182066697876,6.977417116550695,0.027775245988395092,1.2643088867248897,1.4221125240953603,6.34937323028211,2.1334934626815882,2.7085221238320623,4.261787476156622,0.8616354480744959,8.59467279360599,1.2240472243047784,5.183937051656027,4.577483221475083,5.058434572665904,0.5859216494493369,1.6849982409417108,6.755815159281218,4.504668381512622,9.225182892814361,0.10453402506519271,7.509379783883913,1.9404306792110182,7.69001919818974,6.925553438691397,3.9287743029442046,9.354554512335822,0.4403724509370188,1.6731449393279907,2.655260558030905,1.4581589915330628,6.221727979498482,8.909604223726582,9.468601031365012,6.495033030206874,3.607260145159523,1.3427566659020185,3.20074710521147,1.305316769778635,0.09804167217415394,1.2138901677700997,5.823607944869154,6.182025975248213,2.503414326838569,7.172368608217807,8.29266098920899,7.201864469321084,7.80586739623252,8.258484023770365,9.707004004791134,6.642404286312386,7.232110006917443,3.708353870695962,3.990155704757461,1.5162269464969458,4.708040334074641,4.478678865565624,4.675639892374277,9.859729340215681,7.061367154977631,3.6646577153197324,4.440252024266071,7.048750509222101,9.525349719921008,1.8353688704588667,3.9393020850896376,5.583658313095848,5.271434766982996,0.9072486534990509,2.008916895971331,7.566636048149055,4.69522724285377,6.589066518208407,9.631284429049538,2.985742912399103,4.08887678856442,2.567720152207238,8.027067017723768,5.703225355989286,4.679471106126789,5.498177150104821,8.807369810058102,0.471146651268064,7.443612611445573,1.4574540108116407,2.4647054131668766,7.526704641587203,6.256804687314384,8.876338960908647,7.577026765760888,6.032572084804089,4.1363596539682295,7.289270627019253,2.690134598421514,4.308780414252165,7.461716377571284,6.577352267099803,4.052689682486217,1.0791304562351267,4.238116258045093,6.673909494094749,9.230806013076506,8.296531815414383,4.936996126019255,9.66783606314696,2.9854378399542436,1.203737817106878,7.393722267369805,6.814593135684708,8.396523830657546,6.313283584816403,1.8643024081750514,2.7491480677005,5.132876940537026,1.4973292254208737,7.20394712869566,3.668925972022774,8.282462771278196,6.185029805570091,1.2077132470353846,5.509073675381362,8.767617619282667,4.662424976140249,6.727884865058316,0.4655527880428534,1.6061518635581273,6.649728846195604,7.4044656940868165,8.741741361061234,9.401413529459743,2.61490486939139,7.477604147027179,3.5602627123289987,7.917756932930978,5.023129726725517,4.819856821558974,6.866290793844199,7.115534327686701,8.09247721622494,7.128739840498966,8.906395281551568,6.714564463617878,4.841647093047179,0.7779183467492912,7.949338935885026,7.5683934690736105,5.761761142790385,4.63872225862342,2.0764222983225866,0.68444735015329,9.980883416648886,8.422052497697596,2.0677435522995014,8.609795902615467,3.78588107640607,0.27428171830200965,6.524716483383588,6.496305802348692,2.6116226398801246,4.059530379451477,4.183406498239259,4.557003107018877,1.3559615871196584,1.1766236235555794,5.27114651010381,7.101554196122937,9.753733826807277,6.355723216756395,2.546268503452769,9.489480380948148,9.426801259688805,1.3527984095464962,4.959445241665971,3.1117181526150084,5.28992083883264,9.061369304206604,8.099499564432548,4.806545494982251,1.9836736370421937,0.37404691139255597,3.8426416634685134,7.005698218139522,0.3369348564058017,4.150022073788106,0.9935631286095159,7.450771484490691,6.242486539914475,9.857259594264235,1.8686427456118238,4.031248022345748,7.136916637314423,1.4395287558526837,7.039113982862684,8.164159830454125,1.807842378479363,8.05285913549531,6.880036396816864,5.144586870641623,7.844716387140749,8.379045337455786,4.012953470308758,7.4700682158350284,6.483378317751072,2.733079349407579,4.768124085605388,7.436723669699181,4.125281482232996,4.27172695336947,6.206765693519014,2.821446192404675,3.3142225186033825,7.477993781123491,9.380917572575598,3.850028281482305,0.5952190854619133,4.861059426856478,6.638778803246696,8.041166719178888,9.204390105944453,9.330641629150922,6.658265925071845,1.983673241824766,6.602456526370091,6.412743950780699,5.280369077933209,7.339438046376534,0.8882227451246583,2.1894389902492306,4.247027298437582,5.791021197145724,3.376571885190369,1.5893303611915344,1.0302533351981147,1.3265705886946888,6.963822910297961,0.2904412881320595,5.278983844560456,1.7253117056993061,6.169103331119061,7.006040263205606,8.965642877700411,4.297554810845834,2.0293328604537963,4.120632721567928,9.605453223898763,5.346476502521062,3.850052694389543,3.835555293416746,4.464669211542316,9.96904384052688,7.763986766300159,8.81166900241439,9.55550330234341,7.118900123377527,7.7085191112064795,1.2508894748588717,4.443189643798653,5.663302002479917,6.617230456158223,8.466930705894566,5.075577055560649,4.9040003566122925,4.708157495898318,1.84896725225838,8.574151261772716,5.678806736441326,7.496381763781697,1.6065903418398042,7.506108049776168,6.321593047023468,1.3246703938785065,6.779096053892754,7.1766043619607895,3.54481169858774,1.5098039494061433,6.26635996654201,5.992729152863381,7.387151059040036,1.9149322307477235,5.011911226255698,5.120720970617314,6.633502386156254,0.8639670053089055,4.402871019989611,3.096976455050886,4.2288964190041085,5.380844567082532,1.5648922215916516,5.659309426357051,0.8134996337470479,2.0043581735801363,4.845342143308877,7.586932902705663,9.034703973259743,6.39205622143548,0.06244702885913389,4.267789513956779,0.39391282792181626,3.2888374433475143,3.2624330316736483,9.56702283101372,0.051156915558703275,5.760646586569191,7.685067468502549,7.467565994294157,6.564021260189161,7.602512435307036,4.321591839483176,3.8373547154335497,7.473374257312018,4.8601911094839405,4.805735857139011,8.98658781416409,7.159440080285213,3.9647090355474335,9.202424743204276,2.4386148311896028,9.00408901344296,2.9890575134832065,6.763650544486777,6.276801814364186,4.498859238686681,7.917410841259834,0.9204078224050605,4.575341442494764,3.8738390832104086,9.748205190915149,8.04550632668292,1.7674461885590365,2.0946857935511565,3.0919434954389824,9.324573571601281,3.063640620092385,5.233720589651584,6.399109586676952,0.1536708699499778,0.9329707343736326,4.91107430003124,3.8566758647847954,4.571409604821543,5.974179076983772,3.503024001556052,9.360446080919996,5.065331572070151,4.672729228602837,8.048605396843051,3.6081276539409757,5.402304348478126,4.584410655951238,3.979312846777334,1.873201750021265,6.659514656067889,2.9945612093492002,6.080605705289788,8.82637877467982,7.835919379418026,0.8489472703946888,9.487096156085244,6.967401687811476,9.36271724128662,0.6244602757149686,2.329703395038649,9.803338499680576,1.1389125822612978,2.0595962221690023,9.080547005155637,3.106709777601442,6.504473058306067,4.392068391590385,5.243689724986518,2.3589478255602847,8.761616091774012,0.3426250581427337,5.993398150516864,1.3378118027206187,9.239474365247453,7.451677660455294,2.383545863094152,5.782158003382665,4.2078194453249695,5.293527809905642,4.514043827290058,9.194897865901542,9.60287891702495,8.11399041647298,8.080633325301354,0.8013076191948332,3.7004594761675658,4.940359989792098,1.828861191575759,9.12094055694334,6.391846729546051,8.919674870664071,9.966979705579782,3.982828440383912,5.4984371858449705,9.156921981897634,6.121837937187591,4.840810697135156,0.8704821056543488,3.729476678300363,9.285545016511286,0.19748716719802273,8.861828899471183,5.777530954998387,0.26786651464463684,9.31791399035777,8.013470255451871,8.134168643588378,1.2093441856366982,9.761294146609544,1.5367450750951095,1.556419567649534,0.02286278787073215,6.5212086868377845,8.203220886487761,5.450596531831531,1.572215458899846,2.1927657836502035,8.264414529816984,8.3640251072384,8.599169267332215,1.7126206628366414,9.839776885254665,1.455984856881234,2.5252067775741005,1.40997105777809,3.720849812156226,5.3525946607732315,6.7456537209569305,0.4459482926557401,2.1561448363683966,8.89668471810731,6.3527914671882835,5.706313044818845,6.687577416703904,9.874531843177381,5.811064170252312,3.0316070254898864,4.229286126605762,1.3932623272867728,0.355768133685328,8.368042321850966,0.9855968446617469,1.2837988400659128,3.241820232498025,4.276461272553,0.5939049183067535,4.518916112331204,1.5007874407293986,7.3044583123274265,1.1138517560346095,0.9623791877075139,0.8612543832740749,4.745622630831794,6.072362948161752,7.405629206953797,7.518729294857678,5.685265598067913,7.929546156868021,5.243055786485433,5.733821692702068,5.659116848606159,2.1855378278934245,8.588699811065684,7.582565085174986,8.210778076486726,4.405594646854631,0.8774674583186659,0.6123906060168616,8.867026097136943,7.256181324116455,0.7709605792068919,2.98976965377576,4.226973690234217,5.944892042407091,1.789743457103965,4.697184400192569,4.793963565115254,4.883552179634334,3.22858065665812,9.213648708328716,0.26526095054675736,9.949613855238225,4.238748427518566,4.879420568220079,7.0769499550354364,0.9827257950599066,1.178910215400304,6.69578658838476,0.3900451970428853,7.190234229720398,4.350662098939315,2.508175617067352,3.862686736875758,5.294893759131516,9.196941735097639,5.713215984941393,6.229122192714085,2.96024902529727,5.524203034070705,3.283574288068989,6.821144739119511,2.6014284750604832,3.2259454330592474,5.581629842346967,6.336525685780929,6.304915163422895,2.5359126460787107,1.8498263408578652,2.808508592530916,3.0805987894880293,8.133399875736,3.4329517116352926,2.2690064786475173,0.2712560182893986,3.005851938102182,3.2807653341540632,9.03782982104424,5.051492687194115,8.391972835109236,4.404580358679391,7.61449957976782,3.5439961696334166,2.701956685230722,8.887706844919773,6.889222139963027,9.044221424107713,5.36824379121251,7.3054477959965585,0.17388476121725782,0.35694737851614367,3.0626036800222267,7.880244171509112,9.663712464160092,6.490586486222281,2.361948090420982,9.238931186351063,3.0165263350463234,0.017673965087552368,7.470328819365126,8.607690538320194,8.970854356218487,0.22811524347402745,9.294371969911921,5.263052421716623,4.329246080804099,2.473143358785228,3.1899666238300206,6.137258697622325,0.02635026462355139,9.729554679372265,5.7942760611875155,6.815896899613603,4.32351599130355,3.175249881600495,9.568586462619432,5.4249528564808225,6.129776730946189,8.150024587155741,1.3763198735763704,1.026897301309928,3.154427757886835,2.614967346052781,3.7237865111515323,3.7844296220932128,5.98811275247453,7.661023590073162,9.060492617754349,2.41342613282556,6.42416951964573,7.156420631729306,6.856163205734456,0.21301716251659997,8.087845273772523,5.965497243269762,8.166245969923192,9.526208445198156,9.132913705453445,8.394499349150665,2.534667920664566,5.294788956290319,7.529336790397114,6.2750563760107525,1.0091089141616782,9.912127740003427,1.1099658898405829,8.022258348691105,8.01776960694055,3.1617892433647232,5.7931799369137575,4.811437700260259,0.6585730330159678,1.3362726315278861,4.975244872388567,1.1976581134691089,6.722803961835437,6.19110016281023,7.954448865697228,2.0773587105867097,5.34457575512466,5.403517421478307,3.4480422315184067,3.6015902807937428,3.752903976405555,6.812335089640131,8.330677281152571,3.9264186711450555,9.290785444818097,0.7271749553325257,3.6500352218547416,0.768022530923933,7.804918203180389,2.53160819075805,3.4361976630526048,9.999989278631773,7.0947673207991935,3.7012530140648314,3.4847860303163536,2.6400833368850862,4.778545424307223,3.6908766303529394,6.330716229473728,1.9441695409638515,8.01817427871991,8.904715953573405,0.3300121232500186,9.141052416761447,2.055652520882343,3.1011604445779573,9.996565397723543,5.691074300406513,1.5375318045236308,9.76266759314428,9.484126584553767,1.8706109164916174,5.64104576865838,4.973103834669585,1.6906662279191131,9.054992839615082,2.515180324269195,0.5472638009059416,6.508984418671401,3.051086569676018,7.277354546278325,8.767642046758375,7.957173510546795,3.340749089943733,1.751607026086357,1.540849208415631,6.505925271220385,1.6440743166007055,1.7123421536125294,1.9005096271018296,5.429972897865348,4.139586822931434,6.109714939953276,1.6569270912395573,0.14487000355464463,2.014901896668091,2.274661269413907,3.472349991354877,6.962868863591631,4.41765992558576,2.5949317264446026,7.576247470854156,8.204448524945887,4.3860492663271184,2.1452425610800185,6.634858148760796,8.419091794547416,4.717458711995142,9.351651929706552,2.8644116166982103,4.454494993967684,6.18157252269331,8.276809599487757,6.053398500207951,7.509132279504847,5.221631454579443,5.810011515694238,1.334763568135049,4.520857276962014,8.554870388121067,0.4863558696054371,0.5816929167382545,9.147407611974891,5.913130727854381,7.025343730902223,9.145320187645137,2.8173568887298495,4.292206459166701,3.8686107951917403,4.6764572664487325,8.708372916607374,7.270892289210877,6.287052840550111,4.619578702633687,8.256125656054436,4.81206198958843,4.009405529919487,6.502473197833105,9.288862380959152,0.49560737978055824,7.942330228910821,6.46585914426991,8.330692311258721,5.086835867068649,5.441620261350046,4.380316504711066,1.1881005099395003,7.109287010179393,4.566110463179376,8.881924088566706,6.581150340023825,8.407864039737873,2.6243791625641566,9.095494076148718,9.237699723128824,2.7858188398038264,5.822081940590236,2.1149226583662073,2.5628576210730714,6.4659919731823585,9.189101639155092,7.9107925342374985,5.115495360653275,8.465835379607947,7.079713761992441,8.694435853335696,0.8230696140132476,3.1795715425213023,0.4643432978326234,9.94093159080554,8.060304705236632,9.83737163175791,4.654236453134589,3.9623208730469517,9.419198795773198,8.447505773586412,4.6222625873264045,1.9118368472305525,4.788833746965757,8.224787895448685,4.529212103691127,2.95030096275698,0.633298028484921,0.3216650707420343,6.054423324781419,3.339486779138605,5.972467122125451,3.193979262055655,8.79973713375394,4.782026179371234,4.636417343354848,0.10526441863196068,7.281733530124692,7.845588762135483,3.9326356580562494,8.33751796187588,9.473624777025142,1.84994754125976,9.623743356463976,3.4453007834268923,7.583484326234123,5.43375081023134,3.5514565974003287,4.510903574402749,4.06227763324315,5.351691841152415,0.8314497455753034,8.90310378133817,7.554210970919046,0.9161556687690142,8.229835482564612,0.15505055410816482,5.215290337225332,5.338131217433664,0.6899642973451181,4.298346260905694,3.556513166797295,8.204127748631285,2.6912598345765937,7.95578549399651,8.83973437479829,6.374884324111534,2.505196128909881,1.3559845765514322,5.370906314720165,1.7137815551612268,8.842354448433753,7.361302702796797,2.341343566645533,8.723104938455483,7.866532204026566,4.058116046451756,0.8372990492385624,3.6351417723366675,2.3944857319049517,6.088408544919563,1.1823945936278135,0.8644355054830344,9.418110758488085,8.975942133822963,8.342186299713743,4.626741942503305,1.4303811353794815,9.638715603299223,9.350416017658475]}
},{}],117:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var mgf = factory( 0.0, 1.0 );
	t.equal( typeof mgf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, 1.0 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 1.0 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 1.0, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, -1.0 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( PINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha < 0`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( -1.0, 0.5 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, 1.0 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, PINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NaN );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the mgf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var mgf;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( alpha[i], beta[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given a large shape parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var mgf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( alpha[i], beta[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 6500.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given a large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var mgf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( alpha[i], beta[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gamma/mgf/test/test.factory.js")
},{"./../lib/factory.js":111,"./fixtures/julia/both_large.json":114,"./fixtures/julia/large_rate.json":115,"./fixtures/julia/large_shape.json":116,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":252}],118:[function(require,module,exports){
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
var mgf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `mgf` functions', function test( t ) {
	t.equal( typeof mgf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gamma/mgf/test/test.js")
},{"./../lib":112,"tape":252}],119:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var mgf = require( './../lib' );


// FIXTURES //

var largeShape = require( './fixtures/julia/large_shape.json' );
var largeRate = require( './fixtures/julia/large_rate.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 3000.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 6500.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gamma/mgf/test/test.mgf.js")
},{"./../lib":112,"./fixtures/julia/both_large.json":114,"./fixtures/julia/large_rate.json":115,"./fixtures/julia/large_shape.json":116,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":252}],120:[function(require,module,exports){
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

},{"./is_number.js":123}],121:[function(require,module,exports){
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

},{"./is_number.js":123,"./zero_pad.js":127}],122:[function(require,module,exports){
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

},{"./main.js":125}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"./format_double.js":120,"./format_integer.js":121,"./is_string.js":124,"./space_pad.js":126,"./zero_pad.js":127}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{"./main.js":129}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],132:[function(require,module,exports){
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

},{"./is_string.js":131,"@stdlib/string/base/format-interpolate":122,"@stdlib/string/base/format-tokenize":128}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @private
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

},{}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":133}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":136}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":140}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./define_property.js":138}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":137,"./has_define_property_support.js":139,"./polyfill.js":141}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":130}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native_class.js":143,"./polyfill.js":144,"@stdlib/assert/has-tostringtag-support":20}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":145}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":145,"./tostringtag.js":146,"@stdlib/assert/has-own-property":16}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){

},{}],149:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"dup":148}],150:[function(require,module,exports){
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
},{"base64-js":147,"buffer":150,"ieee754":238}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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
},{"_process":244}],153:[function(require,module,exports){
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

},{"events":151,"inherits":239,"readable-stream/lib/_stream_duplex.js":155,"readable-stream/lib/_stream_passthrough.js":156,"readable-stream/lib/_stream_readable.js":157,"readable-stream/lib/_stream_transform.js":158,"readable-stream/lib/_stream_writable.js":159,"readable-stream/lib/internal/streams/end-of-stream.js":163,"readable-stream/lib/internal/streams/pipeline.js":165}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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
},{"./_stream_readable":157,"./_stream_writable":159,"_process":244,"inherits":239}],156:[function(require,module,exports){
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
},{"./_stream_transform":158,"inherits":239}],157:[function(require,module,exports){
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
},{"../errors":154,"./_stream_duplex":155,"./internal/streams/async_iterator":160,"./internal/streams/buffer_list":161,"./internal/streams/destroy":162,"./internal/streams/from":164,"./internal/streams/state":166,"./internal/streams/stream":167,"_process":244,"buffer":150,"events":151,"inherits":239,"string_decoder/":251,"util":148}],158:[function(require,module,exports){
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
},{"../errors":154,"./_stream_duplex":155,"inherits":239}],159:[function(require,module,exports){
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
},{"../errors":154,"./_stream_duplex":155,"./internal/streams/destroy":162,"./internal/streams/state":166,"./internal/streams/stream":167,"_process":244,"buffer":150,"inherits":239,"util-deprecate":260}],160:[function(require,module,exports){
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
},{"./end-of-stream":163,"_process":244}],161:[function(require,module,exports){
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
},{"buffer":150,"util":148}],162:[function(require,module,exports){
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
},{"_process":244}],163:[function(require,module,exports){
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
},{"../../../errors":154}],164:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],165:[function(require,module,exports){
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
},{"../../../errors":154,"./end-of-stream":163}],166:[function(require,module,exports){
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
},{"../../../errors":154}],167:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":151}],168:[function(require,module,exports){
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

},{"./":169,"get-intrinsic":233}],169:[function(require,module,exports){
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

},{"function-bind":232,"get-intrinsic":233}],170:[function(require,module,exports){
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

},{"./lib/is_arguments.js":171,"./lib/keys.js":172}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],173:[function(require,module,exports){
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

},{"has-property-descriptors":234,"object-keys":242}],174:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],175:[function(require,module,exports){
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

},{"./ToNumber":205,"./ToPrimitive":207,"./Type":212}],176:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/isNaN":223,"../helpers/isPrefixOf":224,"./ToNumber":205,"./ToPrimitive":207,"./Type":212,"get-intrinsic":233}],177:[function(require,module,exports){
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

},{"get-intrinsic":233}],178:[function(require,module,exports){
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

},{"./DayWithinYear":181,"./InLeapYear":185,"./MonthFromTime":195,"get-intrinsic":233}],179:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":228,"./floor":216}],180:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":216}],181:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":179,"./DayFromYear":180,"./YearFromTime":214}],182:[function(require,module,exports){
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

},{"./modulo":217}],183:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./Type":212,"get-intrinsic":233}],184:[function(require,module,exports){
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

},{"../helpers/timeConstants":228,"./floor":216,"./modulo":217}],185:[function(require,module,exports){
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

},{"./DaysInYear":182,"./YearFromTime":214,"get-intrinsic":233}],186:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./Type":212,"has":237}],187:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":240}],188:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./Type":212,"has":237}],189:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./Type":212}],190:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":225,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./Type":212}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/timeConstants":228}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"./DateFromTime":178,"./Day":179,"./MonthFromTime":195,"./ToInteger":204,"./YearFromTime":214,"./floor":216,"./modulo":217,"get-intrinsic":233}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/timeConstants":228,"./ToInteger":204}],194:[function(require,module,exports){
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

},{"../helpers/timeConstants":228,"./floor":216,"./modulo":217}],195:[function(require,module,exports){
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

},{"./DayWithinYear":181,"./InLeapYear":185}],196:[function(require,module,exports){
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

},{"../helpers/isNaN":223}],197:[function(require,module,exports){
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

},{"../helpers/timeConstants":228,"./floor":216,"./modulo":217}],198:[function(require,module,exports){
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

},{"./Type":212}],199:[function(require,module,exports){
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


},{"../helpers/isFinite":221,"./ToNumber":205,"./abs":215,"get-intrinsic":233}],200:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":228,"./DayFromYear":180}],201:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":228,"./modulo":217}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],203:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":205}],204:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/isNaN":223,"../helpers/sign":227,"./ToNumber":205,"./abs":215,"./floor":216}],205:[function(require,module,exports){
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

},{"./ToPrimitive":207}],206:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":177,"get-intrinsic":233}],207:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":229}],208:[function(require,module,exports){
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

},{"./IsCallable":187,"./ToBoolean":202,"./Type":212,"get-intrinsic":233,"has":237}],209:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":233}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/isNaN":223,"../helpers/sign":227,"./ToNumber":205,"./abs":215,"./floor":216,"./modulo":217}],211:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":205}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":179,"./modulo":217}],214:[function(require,module,exports){
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

},{"call-bind/callBound":168,"get-intrinsic":233}],215:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":233}],216:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],217:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":226}],218:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":228,"./modulo":217}],219:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":175,"./5/AbstractRelationalComparison":176,"./5/CheckObjectCoercible":177,"./5/DateFromTime":178,"./5/Day":179,"./5/DayFromYear":180,"./5/DayWithinYear":181,"./5/DaysInYear":182,"./5/FromPropertyDescriptor":183,"./5/HourFromTime":184,"./5/InLeapYear":185,"./5/IsAccessorDescriptor":186,"./5/IsCallable":187,"./5/IsDataDescriptor":188,"./5/IsGenericDescriptor":189,"./5/IsPropertyDescriptor":190,"./5/MakeDate":191,"./5/MakeDay":192,"./5/MakeTime":193,"./5/MinFromTime":194,"./5/MonthFromTime":195,"./5/SameValue":196,"./5/SecFromTime":197,"./5/StrictEqualityComparison":198,"./5/TimeClip":199,"./5/TimeFromYear":200,"./5/TimeWithinDay":201,"./5/ToBoolean":202,"./5/ToInt32":203,"./5/ToInteger":204,"./5/ToNumber":205,"./5/ToObject":206,"./5/ToPrimitive":207,"./5/ToPropertyDescriptor":208,"./5/ToString":209,"./5/ToUint16":210,"./5/ToUint32":211,"./5/Type":212,"./5/WeekDay":213,"./5/YearFromTime":214,"./5/abs":215,"./5/floor":216,"./5/modulo":217,"./5/msFromTime":218}],220:[function(require,module,exports){
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

},{"./isMatchRecord":222,"get-intrinsic":233,"has":237}],221:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],222:[function(require,module,exports){
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

},{"has":237}],223:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],224:[function(require,module,exports){
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

},{"call-bind/callBound":168}],225:[function(require,module,exports){
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

},{"get-intrinsic":233,"has":237}],226:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],227:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
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

},{"./helpers/isPrimitive":230,"is-callable":240}],230:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":231}],233:[function(require,module,exports){
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

},{"function-bind":232,"has":237,"has-symbols":235}],234:[function(require,module,exports){
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

},{"get-intrinsic":233}],235:[function(require,module,exports){
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

},{"./shams":236}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":232}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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

},{"./isArguments":243}],242:[function(require,module,exports){
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

},{"./implementation":241,"./isArguments":243}],243:[function(require,module,exports){
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

},{}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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
},{"_process":244,"through":258,"timers":259}],246:[function(require,module,exports){
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

},{"buffer":150}],247:[function(require,module,exports){
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

},{"es-abstract/es5":219,"function-bind":232}],248:[function(require,module,exports){
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

},{"./implementation":247,"./polyfill":249,"./shim":250,"define-properties":173,"function-bind":232}],249:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":247}],250:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":249,"define-properties":173}],251:[function(require,module,exports){
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
},{"safe-buffer":246}],252:[function(require,module,exports){
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
},{"./lib/default_stream":253,"./lib/results":255,"./lib/test":256,"_process":244,"defined":174,"through":258,"timers":259}],253:[function(require,module,exports){
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
},{"_process":244,"fs":149,"through":258}],254:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":244,"timers":259}],255:[function(require,module,exports){
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
},{"_process":244,"events":151,"function-bind":232,"has":237,"inherits":239,"object-inspect":257,"resumer":245,"through":258,"timers":259}],256:[function(require,module,exports){
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
},{"./next_tick":254,"deep-equal":170,"defined":174,"events":151,"has":237,"inherits":239,"path":152,"string.prototype.trim":248}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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
},{"_process":244,"stream":153}],259:[function(require,module,exports){
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
},{"process/browser.js":244,"timers":259}],260:[function(require,module,exports){
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
},{}]},{},[117,118,119]);
