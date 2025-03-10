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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":51}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":52}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":53}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":122}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":122}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":122}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":122}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/ctor":74}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":59}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":63}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/get-high-word":82,"@stdlib/number/float64/base/to-words":87}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*     ```tex
*     \begin{align*}
*     x &= k \cdot \ln(2) + r \\
*     |r| &\leq 0.5 \cdot \ln(2)
*     \end{align*}
*     ```
*
*     <!-- <note> -->
*
*     \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*     <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\(\[0,0.34658]\\):
*
*     ```tex
*     \begin{align*}
*     R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*     &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*     ```tex
*     R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*     ```
*
*     where \\( z = r^2 \\) and
*
*     ```tex
*     \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*     <!-- </note> -->
*
*     The computation of \\( e^{r} \\) thus becomes
*
*     ```tex
*     \begin{align*}
*     e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*     \end{align*}
*     ```
*
*     where
*
*     ```tex
*     R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*     ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*     ```tex
*     e^{x} = 2^k e^{r}
*     ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision.
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":65,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":72}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":67,"@stdlib/math/base/special/ldexp":70}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":64}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":62,"@stdlib/number/float64/base/exponent":76,"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/normalize":84,"@stdlib/number/float64/base/to-words":87}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Round a double-precision floating-point number toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
*/

// MODULES //

var trunc = require( './main.js' );


// EXPORTS //

module.exports = trunc;

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

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a double-precision floating-point number toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":60,"@stdlib/math/base/special/floor":68}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./number.js":75}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":82}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":80}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":79,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":81,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./normalize.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/smallest-normal":50,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":89}],88:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":79}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./to_words.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":88,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 0.0, 3.0 );
*
* var y = logcdf( 10.0 );
* // returns ~-0.036
*
* y = logcdf( -2.0 );
* // returns ~-1.948
*/
function factory( mu, beta ) {
	if (
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the logarithm of the cumulative distribution function (CDF) for a Gumbel distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logarithm of CDF
	*
	* @example
	* var y = logcdf( 2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		z = ( x - mu ) / beta;
		return -exp( -z );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66,"@stdlib/utils/constant-function":114}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Gumbel distribution logarithm of the cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/gumbel/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/gumbel/logcdf' );
*
* var y = logcdf( 10.0, 0.0, 3.0 );
* // returns ~-0.036
*
* y = logcdf( 0.0, 0.0, 3.0 );
* // returns ~-1
*
* var myLCDF = logcdf.factory( 2.0, 3.0 );
* y = myLCDF( 10.0 );
* // returns ~-0.069
*
* y = myLCDF( 2.0 );
* // returns ~-1
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":91,"./logcdf.js":93,"@stdlib/utils/define-nonenumerable-read-only-property":115}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated logarithm of CDF
*
* @example
* var y = logcdf( 10.0, 0.0, 3.0 );
* // returns ~-0.036
*
* @example
* var y = logcdf( -2.0, 0.0, 3.0 );
* // returns ~-1.948
*
* @example
* var y = logcdf( 0.0, 0.0, 1.0 );
* // returns ~-1.0
*
* @example
* var y = logcdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logcdf( 0.0, 0.0, -1.0 );
* // returns NaN
*/
function logcdf( x, mu, beta ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0.0
	) {
		return NaN;
	}
	z = ( x - mu ) / beta;
	return -exp( -z );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66}],94:[function(require,module,exports){
module.exports={"expected":[-0.5960960360627553,-0.7401197782686801,-0.9275374591950026,-0.7776147806204368,-0.9485648644337725,-4.628615665157829e-9,-0.8638480264890706,-0.18001037067135744,-0.9007556246094908,-0.8996304894090725,-0.8288991495367557,-1.0284029038324565,-0.778406510483865,-0.7960124438733033,-0.0001847412854660973,-0.13434484426855778,-0.6083010574749727,-1.0113865241840099,-1.0879236146944153,-0.8894855426508238,-0.9671132434812019,-0.9247194406040181,-1.0301631940921792,-0.02155870947560127,-0.955801639395107,-0.9305614634535706,-0.8264046753779677,-0.6175758471599145,-0.9289178985844762,-0.7863059895187823,-0.6199290429110186,-0.8031173245657144,-0.7601301705537432,-0.8330440158401567,-0.189697982360145,-0.8943466060766516,-0.9085690052237101,-0.17861122042107191,-0.9297784472645223,-0.5262942245735542,-0.94341967254055,-0.7301139108297404,-0.8672829285121948,-0.4824968128404945,-0.9357732643853627,-0.7677773381842623,-0.6175098161838715,-1.0130655882426471,-0.7274837906270795,-1.026194552771844,-0.7490769316759364,-0.4305942358743775,-0.7494113445731443,-0.9588217015017491,-0.7910856757515116,-1.0092713950592793,-0.7478040238938128,-0.30173878231366386,-0.9099936645884542,-0.6489754373645913,-1.0137280912898894,-0.6945103876580652,-0.5738755383870837,-0.8149259735819034,-0.8833709614234522,-1.0394043684998633,-0.11414068224620275,-0.567116449895193,-0.8605064365656554,-0.6092384287125231,-1.0241420866038333,-0.989194637180681,-0.8238732359422842,-0.8798246530142,-0.9859754573635843,-0.2565879433009051,-0.9371941196902539,-0.6394933650765255,-0.9086563595955987,-0.8578068178473992,-0.8274094649110484,-0.8199751933264166,-0.7190868029713597,-0.7850817488941795,-1.0105722236744252,-0.9253153072427963,-0.8812869770014921,-0.9656097626093709,-0.9621606843677651,-0.05447508705482066,-0.9380250791050717,-0.9500916839800594,-0.7211322400065994,-1.0185230000400085,-0.776292091907588,-0.8329433550615518,-0.862015617783236,-0.985560809701951,-0.9806573305479053,-0.03138396353457919,-0.7390994646914659,-0.7770230559319983,-0.9632545000765017,-0.9890073191729679,-0.9491561059971176,-0.5544199341532099,-1.0067345340649803,-1.0028549643703961,-0.8204949868689316,-0.9073484872863883,-0.7052633326210245,-0.9407451841559168,-0.9740447853353613,-0.7444303554959895,-0.3749386661191273,-0.7987265570667925,-0.3856609392441694,-0.9346207481828994,-0.893456095878342,-0.8499102581799691,-1.037036091555346,-0.9200290778132372,-1.001674977533639,-0.8352256227318616,-1.0130166165482575,-0.9968865139164758,-0.9855217293974078,-1.004243557674289,-0.7481089230785216,-0.8513902501778329,-0.7703383505562116,-0.3841736163055983,-0.5720341386181934,-0.8958852449864486,-0.6349429395901179,-0.8296305909944864,-1.0270634944838668,-0.8799845191081288,-0.8318102837214545,-0.9564780576568357,-0.8502851962409498,-0.8208995257929002,-0.9920278469042222,-0.8611769278044371,-0.6909565229246393,-0.11091096896677803,-1.002175080722762,-0.8851535321796729,-0.9543602452418632,-0.978616991856711,-0.6136787217310827,-0.8006484438215586,-0.711559003647585,-0.8957983108116737,-0.9234411384969613,-0.23612902888934845,-1.025081336925987,-0.5093957528943376,-0.9338146751192153,-1.037572903149811,-0.7776165187279903,-0.7070968258964223,-0.8129115855848459,-0.8877394589997508,-0.5069997247664746,-0.6156160071690411,-0.8506123393992691,-0.8692895948781744,-0.8182925055445036,-0.9039147576490494,-0.9346185264958915,-1.0661034006203618,-0.5101786050452614,-0.8831240774299436,-0.8221179762622124,-0.7956928078111998,-0.710741387945752,-0.7247583370375759,-0.8793870374843877,-0.9291317679619191,-0.1298159878816007,-0.9903361155205166,-0.8143440164586948,-0.7536439649536998,-0.550363555851328,-0.31383127995982846,-0.7897385739059186,-2.3474694850514194e-7,-0.775486574475102,-1.020009422795586,-0.9327353877510844,-0.8722658937260452,-0.8209359117798416,-1.001381935829599,-0.9275621060628878,-0.2574587251281715,-0.6200745777590605,-0.8370975399356457,-1.032387349723827,-0.7619131117655839,-0.9029928236055278,-0.8711796696703031,-0.15958986490095392,-0.9870783269148409,-0.8387930431102347,-0.7336040200149356,-0.7859436616689341,-0.9921965413775403,-0.8022581367315055,-0.028167507803582698,-0.5677369921295645,-0.5644657784790921,-0.8943392533598925,-0.8701504375531015,-0.8509420290798463,-0.9658532669303604,-0.9988867220203437,-0.23388382527286644,-1.0212943306188094,-0.8623386822692735,-0.9469968502001184,-0.9453583783154133,-0.6674315239021644,-0.04445852924035003,-0.9913275573482071,-0.9143449071710642,-0.7842932271209487,-0.6504282015157129,-0.7477530880271757,-0.9990224164727284,-0.9820445244249373,-0.9920245228044501,-0.1401799604959517,-0.6170514365789085,-1.1211012374626432,-0.8096570082921005,-0.8325243134168032,-0.8783712010040068,-0.9035088361220197,-0.6468842802179544,-0.6095465938766597,-0.9048070506116287,-0.8865019625276832,-0.7692216485834433,-0.7770782709664432,-0.9760491426007974,-0.7273721262269137,-0.9890176514518624,-0.9989570422410291,-1.059688873000645,-0.3754352726064474,-0.974982399461874,-1.5156768483812875,-0.7409908481522325,-0.7024398152503118,-1.039655720146345,-0.6373255045151951,-1.0228770122341457,-0.8893982303497814,-0.8867953507604757,-0.7597800140868263,-0.6168948322794807,-0.5965065837286551,-0.8058500815223653,-0.9652304451763334,-0.6487911199201088,-0.8355961380358546,-1.0030323403335557,-0.6605191904502066,-0.8561288211588796,-1.3010307070130813,-0.9769246910208647,-0.9918992006206909,-0.6579082973655582,-0.6618344634301185,-0.4500290997323003,-0.936722160900507,-0.9398199382499864,-0.7748499071825709,-0.7407317143447804,-0.6934577821765606,-0.9371141106283513,-0.4755696505290161,-0.28987440154689365,-0.59786070028807,-1.0613345852827871,-0.9246342387977808,-0.8627825570784515,-0.9952884122219728,-0.9636566741504419,-0.9725412076143475,-1.027545837148424,-0.763494455830023,-0.7054935912114497,-0.7981292175001465,-0.9888190916969534,-0.5488508401323172,-0.3594202043201658,-0.7988466838966167,-0.33316825230702046,-0.9246312999784148,-0.9308205362819335,-0.8981979398683885,-0.8325237294331611,-1.0230074894280392,-0.90542584237817,-0.9197132513258258,-0.8677185271816953,-0.9069928651374238,-0.8974703423923674,-0.8384668718384697,-0.9071202914647061,-0.9430832326227,-1.0151656876012638,-0.9767716158284354,-0.9125820522725463,-0.6442629245671196,-0.9069322709372226,-0.9396483313881471,-0.7674217507494183,-1.0081552596825818,-1.8758279781009562e-11,-0.8661761013594457,-0.7052088524551426,-0.7683191330178518,-0.37865920133166614,-0.9092815997397888,-0.384025505548814,-0.7057946812424865,-0.8758412397228693,-0.6676063936480832,-0.8881860088984707,-0.8931860161501157,-0.6777217601919268,-0.8515109463206018,-0.7871104249125931,-0.5274568605863184,-0.8552080005843044,-0.8347080723117666,-0.2818381791088615,-0.8712498116200372,-1.0336282541440678,-0.913251550729635,-0.8772444362530549,-0.7236391654981513,-0.6399065784136853,-0.9286349356623141,-0.7116307866213688,-0.9263327863733479,-0.995163092743697,-0.8082269782802284,-0.8848752267478673,-0.6459799413900649,-0.6811324073065135,-0.8822149780042232,-0.9916292419868807,-0.7972051550644148,-0.6197959826333821,-1.0116001877414822,-0.8842572914730217,-0.9014655326106938,-0.7383455464420767,-0.8975859221915296,-1.4366294268496707,-0.782460062330638,-0.8252521775652364,-0.8262602709599515,-0.8353790300946438,-0.8543418133563252,-0.0162700149460695,-0.999444744595438,-0.9891116266541354,-1.0071062330060205,-0.9506032990241429,-0.4893450257195276,-0.021180567500220134,-0.8655584709717771,-0.8569518495785298,-1.0440643628532245,-0.7859363841496372,-0.8280828259662478,-0.8256297820273317,-1.0188431230552437,-0.8837013871123628,-0.7526392314730614,-0.9045030478755742,-1.0823698937082633,-0.7942605854156705,-0.7297564735888096,-0.8770196885836642,-1.1183553165787696,-0.10360982826686899,-0.9707059634037349,-0.5226528769169947,-0.6133150199255557,-0.682064770863474,-0.9635414782270945,-0.85941401269726,-1.0137263677019004,-0.7491209824638437,-0.5575707515988931,-0.04327672032493038,-0.3311169631673091,-0.7059381212130638,-0.6441201886548994,-0.6196130139819422,-0.14727505376770267,-0.8232325224841411,-0.393974742239409,-0.9541235275176194,-0.8822510080467997,-0.6765330255548825,-0.7380303157809516,-0.897032101518505,-0.2522979722173446,-0.5140897660207667,-0.6466644339247377,-0.7993935372052403,-0.8058331655693489,-0.7464682208358306,-0.840738515938134,-0.9620657387710063,-0.9306842288735052,-1.0532628818729015,-0.865835585211978,-0.7469062139413996,-1.0003930805674013,-0.7408983931163071,-0.6490813937135471,-0.7775652791490375,-0.8330628302009578,-1.0020557729379207,-0.6209304714321845,-0.7619942502309649,-0.7714376548670732,-0.8700448452880425,-0.8523854504739207,-0.7526609138638096,-0.02938644992450318,-0.9297826753918181,-0.9943677278855544,-0.7840987930806201,-0.9659516041766048,-0.9297765793668947,-0.5986954789613903,-0.9247579239511563,-0.9945299477908794,-0.9624500298752191,-1.0592813315740477,-0.9721559363937025,-0.7406221391857977,-0.9713882802504388,-0.8732337866572306,-0.8743756109491351,-0.4942375547023587,-1.409927644691879,-0.7666840323003669,-0.7246679912068759,-0.9914410851619332,-0.9510201580623883,-0.7499100481468269,-0.4668935703030689,-0.8683448001825443,-1.0293138829488395,-0.876200846395355,-0.44671387562850073,-0.7098784738592308,-0.9655298068589514,-0.5362743643932006,-0.9162969822518412,-0.9070689260627958,-0.44594860699046945,-0.9686396984742944,-0.9611381327065113,-0.7923890153584972,-0.9733699456006815,-0.1049237965039932,-1.2227834641993969,-0.8399367077321254,-0.8505261411228534,-0.698145190528372,-0.9543071807850141,-0.3650794816348393,-1.0302763718447614,-0.8053994628258698,-1.0161389011674167,-0.8356223849606603,-0.34427678618297125,-0.851794107550516,-0.9706546516169328,-0.6315968181695436,-0.3954634630331432,-0.6794349611955148,-0.8727470888334621,-0.8958446545732002,-1.0177160321056677,-0.7656701820475074,-0.7877391788839309,-1.0334161966429491,-1.0119148258356099,-0.6024440290129419,-0.7529027468805523,-0.9618697028504942,-0.17680696923114775,-0.7913740910675211,-0.3652022008180694,-0.9031738135221188,-0.6636868462281751,-0.946689137777396,-1.0270217443227194,-0.743022235199202,-0.547072473409082,-1.0168404853810105,-0.9138067415688962,-0.8880906698897231,-0.9120099135516283,-0.18881953289047382,-0.6956070984591861,-0.8445901864916542,-0.624457208520307,-0.7385033616733006,-0.5451433030553279,-0.8774550178871118,-0.4625791564644405,-0.5714860930992456,-0.8183639431116431,-0.7165511718027107,-0.011536832203376918,-0.7098915967581834,-0.7878292090074395,-0.8985656719533189,-0.7389165349474978,-0.08036404949618034,-0.5998792769127125,-0.9222323114930898,-0.8426901358051643,-0.7794376283498665,-0.4491654683307033,-0.9168612210552253,-1.006637071773342,-1.0397302658523213,-0.9789323679295164,-0.7715943992007017,-0.8396256482004298,-0.6732933543666648,-0.6005186184228407,-0.8639460572859985,-0.8614791269480981,-0.8075217653672377,-0.8280392395487169,-0.8860975528735342,-0.8122778290746948,-0.7989816277370151,-0.8643059742854691,-0.9139428257768974,-0.7903553785842778,-0.7118279249045469,-0.8578316226524998,-0.7055126293845785,-0.8385491728402423,-0.7024661397169722,-0.6184442373182399,-1.0153478552874315,-0.824216455893496,-0.8628522746851985,-0.9521871726753929,-0.14377094461435744,-0.7653168972737295,-0.6139604171440656,-0.6482585858621612,-0.5484143401703132,-0.7101594339029087,-0.7813787577122246,-0.39639186574695817,-0.7661112537211079,-0.8500812398964193,-0.38704588392420197,-0.8144918200431506,-0.9004215051786083,-0.9096258783303507,-0.6783716027453754,-4.7353062529969304e-7,-0.7436338133486637,-1.0451506128298613,-0.8681526474879646,-0.7493191560931862,-0.8767057096383222,-1.0048113909909633,-0.5956066833410726,-0.9984956861450194,-0.9899596717547047,-0.9382581498798546,-0.694977008708298,-0.2196827609416108,-0.8322315197690842,-0.8025089765765958,-0.9127999758052305,-0.9908636122893003,-0.00033736852405263104,-0.8419451232339434,-0.8578833728209823,-1.0640375396592325,-0.8395379296122323,-0.582030694593819,-0.3082255120875145,-0.7771848128949869,-0.8056501324278936,-0.8918207467920016,-0.8531401067243234,-0.6562773711325797,-1.0760799311132965,-0.4643881082436251,-0.9502308691133342,-0.5926399485810508,-0.8577567730539639,-0.8408771321934383,-0.7243152218220423,-1.1157381175488659,-0.9538910602689666,-0.9281080258163792,-0.4491576431552727,-0.5447074962668709,-0.8047762649049686,-1.079906115599509,-0.7742171573056503,-0.9431722121596644,-0.6249920437837386,-0.5510487492644388,-0.6486697673202023,-0.9385572144892691,-1.0076442548724702,-0.9268238990838231,-0.8007447122238731,-0.868160893669124,-0.883324542484599,-0.7766949920526679,-0.0001176364315524287,-0.7515799709068084,-1.0508212818317797,-1.003991700901419,-0.08400423362302555,-0.7284678724660659,-0.8991311230573305,-1.0334557370625854,-0.8317284575048254,-0.7087066415853895,-0.811443327686737,-0.8095421951424735,-6.168489207556935e-10,-0.907014752448912,-0.766378864314005,-0.8149599375656684,-0.7902789166194129,-0.902638849217218,-0.7474052609314603,-0.9585355678723355,-0.836041431404185,-0.1992143490901574,-0.8917645318642677,-0.9558951949747626,-1.1514187013556065,-1.012275293940317,-0.978884528636939,-0.6626898535866068,-0.7462090785617053,-0.09028038400897782,-0.7433377598162543,-0.8446391679200855,-0.7282783111286608,-0.7500382300331103,-0.6600772426296213,-0.7059520555332812,-0.9589888884255515,-0.765319380512026,-0.8725166374138502,-0.944336447673043,-0.9215105022170107,-0.7515349715249318,-0.9818441132780796,-0.7807488476029041,-0.9682945786687741,-1.0683006967211608,-0.8423610996279642,-1.2676676654766008,-0.9668753449691805,-0.9319583796305493,-0.7145655109301623,-0.26003471199146133,-0.8946131189309703,-0.8860323431831632,-0.23082608915792754,-0.016970795207872705,-1.0782693409488562,-0.69264495827374,-0.722587739912859,-0.7935246438820138,-0.6802393305852643,-0.9964977209731345,-0.8496479879438347,-0.7907422423882543,-0.6123873173135627,-0.9857399526868035,-1.0020203714681943,-0.3780391358257568,-0.838729525937691,-0.785181576482026,-0.8102083565141331,-0.8198837903801119,-0.802505595910195,-0.679336289621395,-0.725775384184014,-1.6307500070393598e-15,-0.05185330237050911,-0.871453314442814,-0.7695203884894902,-0.21472778565356315,-0.7556379358942544,-0.8526344064493466,-0.8224790832178003,-0.3334737029008731,-0.864681620553255,-0.9231453126019757,-0.46794662751678956,-0.987199917497824,-0.46671338542876356,-0.9511784718701488,-1.3896840822712785e-6,-0.7321644127715727,-0.17091378255280487,-0.6423557335462495,-0.8611709650091397,-1.0437962486614312,-0.854189112780171,-0.9995237742646708,-0.7962127703914306,-0.8293258667544986,-0.9193042199892055,-1.0587622098544636,-1.1041963699151123,-0.7139353383085358,-0.8523221060998772,-0.1510697191195799,-0.4126829604336015,-0.7881655722271135,-0.9157066084102861,-0.9286212342488348,-0.8857508834601764,-0.8593037501647312,-0.7978074453399039,-0.005223255479608332,-0.5530381073514606,-0.8126927512979676,-0.8218727081301402,-0.36626277808581226,-0.7409154273767864,-0.7484755377624559,-0.933378669721238,-0.8821911672769942,-0.8169045850592985,-0.5781575841343239,-0.9970975588827472,-0.9996227825814956,-0.7111244214395378,-0.7819588396541212,-0.03297465277590139,-0.9282013041019813,-2.6734457962732906e-71,-0.4168459131833347,-0.8325343799083504,-0.8075231137219209,-0.8068276185751909,-1.0391208909710843,-0.961037101866943,-0.6374167372558637,-0.4806342309310186,-0.7975121301046261,-0.831887629170911,-0.889421714365066,-0.9658651082674445,-0.9212289270032756,-0.3546362980264487,-0.9644545036308111,-0.7938305397502514,-0.1397187315636829,-0.956930523189295,-0.7869371526221673,-0.9933283480257626,-0.7830603405131236,-0.2834646429025852,-0.9001414596051438,-0.7791694133659558,-0.6578759290483387,-0.7286675061382175,-0.20606147667597746,-1.0516221296582318,-0.911569721555711,-0.28125015878437476,-0.8881752829070658,-1.0622202096504634,-0.9057392280652634,-0.6978158710707558,-1.0568105624581787,-0.07104391793419071,-0.9094452022977803,-0.38968223242070454,-1.146345187286981,-0.8643059307449981,-0.9729526498693656,-0.8300082534964707,-1.1313105492729454,-0.7359927990309019,-0.9829094567366491,-1.0054775800256555,-0.5464774952658676,-0.7620972556533112,-0.6895576606836049,-1.0125372502107146,-0.6085091820329662,-0.7418165346932365,-1.0600680819902164,-1.5013204805148157,-0.5462273988752163,-0.817662580046691,-0.8123086030024801,-0.8292549166974208,-0.7216146761188286,-1.0095827586794657,-0.8583401676202855,-0.9188029015359132,-0.9620202476144091,-0.8834803508958305,-0.7771930791417594,-0.9874543505337297,-0.9613870506980217,-0.008208084884783973,-0.536374060002625,-0.8271536173911513,-0.9281153282635759,-1.0689973193596967,-0.9746106381617722,-0.8671329031270429,-0.022460276517721627,-0.5573110324501539,-0.38245246976204006,-0.6185783110715994,-0.0019634127045316703,-0.8445517823943557,-1.0173272428237037,-0.7100691615479657,-0.8602249825134609,-0.8865957920070097,-0.9981950143981435,-0.970004333490121,-0.8238610170543905,-0.8574297993975467,-0.8025694270653841,-0.7321587852463252,-0.9353975399969923,-0.9409545930217563,-0.8552377904171553,-0.6538617622738006,-1.0023548588310425,-0.8376365028553475,-0.7280203885928572,-0.03757645990198113,-0.6459339373854448,-0.8611341982126532,-0.7968464261000596,-0.7982523533121638,-0.9799358412364677,-0.9748733858949914,-0.02207543661685895,-0.8289292178076613,-0.822928240435306,-0.8795735899668609,-0.9159697666801759,-1.077272343770328,-0.7459779003234539,-0.9283248906607866,-0.5151143666170515,-0.7613787831752312,-0.672651845348744,-0.42705522113094924,-0.9775287507588543,-0.08099204678461217,-0.696015407096332,-0.4891439840170708,-0.8046425214440776,-0.8529591814855734,-0.654188649671028,-0.31926569439380253,-0.7967991643862468,-0.8635304245082189,-0.9319338669241839,-0.7903467358990618,-0.6536925236982921,-0.612672195829356,-0.9324432190542049,-0.821131747592756,-2.6166952611974117,-0.3415776658347811,-0.9304183768582092,-0.8125573135600557,-0.7449800167140203,-0.8703793121151657,-1.0308779325522281,-0.9316053870350526,-1.0232850892952774,-0.7819896272235922,-1.0047006007958945,-0.8889595144414645,-0.9492665865565996,-0.90081080775936,-0.8537308174594116,-0.7003235835327766,-0.8907846062306662,-0.014809287724351744,-3.4028772597886824e-5,-0.16956198117771445,-0.6548948485679056,-0.9188846791599863,-0.8758149357949084,-1.0082391097530672,-0.33927064699094867,-0.7307189009855112,-0.6995113028357449,-0.7463543069968078,-0.8238563556810365,-0.729227364120459,-0.7526000216306684,-0.6020852450202759,-0.7479536849441871,-0.3885627441780142,-0.6116227954781823,-0.9102828862006628,-0.9992204146114604,-0.531529979517942,-0.9608196978413901,-0.9207483360605264,-0.8102447708448005,-0.9856200081923008,-0.9252745629057579,-0.8406819180506087,-0.5062062801259762,-0.893365149844362,-0.8221663691430091,-0.9401213919603261,-0.9828957804316224,-0.7819622060016206,-0.9160949386933765,-1.0299098357405931,-0.12466433615652996,-0.8000682140199448,-0.9971918890441616,-0.3129739347427712,-0.42569876726862327,-1.0231660889331884,-0.8173012862297868,-0.817892034274444,-1.0508559220542475,-0.15767698562109395,-0.9939249889425363,-0.9517619321720537,-0.6502269527783701,-0.0609321516877243,-0.9919475260348809,-0.746119938683957,-0.6922087206692449,-0.9247876747705018,-0.9669341747742882,-0.9322876819028145,-0.7711240841191784,-0.6790278972782187,-0.7620797025838707,-0.996321240729272,-0.8463489242364486,-0.7111356702311888,-0.3954387118845045,-0.8899784489672529,-0.6313661768938178,-0.9709901354048361,-0.0009886817081957715,-1.0482007833237301,-0.3502864910963588,-1.013685290385298,-0.9296936878511015,-1.0316292391444852,-0.7939865277985086,-0.6407521637647606,-0.7864359390160578,-1.0025582951438248,-0.4726443242502891,-0.8613353493334539,-0.319589708269751,-0.199652623746757,-0.796127083440811,-0.7972280950719355,-0.9285723733216598,-0.7185017344734448,-0.8733730758136136],"x":[2.1419302305100207,0.9522148503964056,1.8776290908226378,4.38491093834685,1.7868080368675954,4.91931540310966,2.1974193590289826,3.117770675077418,1.6609304467327646,1.5507740765668365,3.8562000024320096,0.04453982256751865,3.9191787480157037,4.6284173316285155,3.7165359658005626,4.933623955878841,4.356521599676006,0.7558913994764749,0.37042089595996974,1.747520402978573,0.8186272355230673,1.0789422640873036,0.02734727256385905,2.3292484099668864,1.7635250077990328,1.7148435040746235,3.461042097444831,4.959952766410006,1.3083271792117102,3.7712415142725977,4.530588776242972,4.68175455189083,2.2461691962657238,0.8431231197896139,3.4850349440921535,2.0995711155550314,1.5521663942025299,3.1348438492518262,1.0251991661860038,0.5914803119205325,1.5165866390925742,1.8307140810234779,2.479365470207645,4.519792131433965,0.5190332727972591,4.704959578190161,3.4970909853331964,0.7908799583325432,3.7666068576381084,0.27071021433062725,4.650773887718941,2.8283126901371536,2.1275894612436064,1.3192734074803703,2.61552950541443,0.7669309514964184,4.460015713068972,3.533735876346975,2.4233049909382567,4.675799089181526,0.02784560450347806,2.2288414386121245,3.760684455330333,3.321136267141267,0.6861642477509633,0.0001979755545211681,2.926880199223545,4.374818617501189,1.9135667845727744,2.635869556697552,0.17392530172311127,0.6013155936675985,3.2227392118798304,2.789057910476065,0.9883594781469562,4.089904059978119,1.0061024412803032,3.2496391934169475,2.3457837999404463,2.635331295336046,3.7108408983828567,3.3321722849917035,4.0978615330409855,1.7478705227142433,0.2402460303115328,1.1896365641897189,2.638238905284261,0.9415810009696501,0.9688972676341945,4.549063145141364,2.1456747059755044,1.4082000262995198,2.052409694764968,0.03337996657217346,4.807611298196997,3.3591916103713446,3.2620867237627413,0.4747495036885252,0.8853019545106589,3.189648538726899,3.3064196333126095,4.5319682130611465,0.38859306483810974,0.4858051041600864,0.9960059747562711,4.274277464200149,0.7886715276017431,0.5907603781568682,1.67321275908067,2.678320779057434,1.718927013613406,1.0745249215963704,1.08979040355071,4.1709099636915585,2.3481839484777667,3.663510720678879,1.356316347485409,0.6352509444370225,1.8313112146488986,2.7424389335412402,0.07224247884333623,1.4628095463625301,0.5628621843658421,3.417496947959947,0.6069213260309747,0.8385753498645021,0.6476882818748941,0.7111381994889754,2.190196817471155,2.00371387259193,3.4066550783690563,2.995125573509619,4.636346281799907,2.0245620206613713,4.654431324869047,2.58960190670936,0.007263216343373902,2.196779782817787,3.7355271007552773,0.5726998489119017,2.3176507216025177,3.5898421763867603,0.3668134896903241,1.8145315961857078,4.724618367732752,4.388656269465806,0.3151978676283329,1.3567418097810635,1.0286361003541222,1.3240829035200186,3.991076307978326,2.6890493969510985,3.7949114963846764,1.3037304990592302,0.6457966559590766,4.536885112913289,0.027698120914179114,4.752817018408589,1.713538939079351,0.2132432635538728,4.212467364657721,4.793472210381441,3.369852732052123,1.0876743644538955,3.5953985349293003,3.9981134870033372,2.550635640884381,3.341538348133619,1.7656720630339018,2.2324447156105007,0.8241482155507773,0.09355159939255286,4.667864505271345,1.3117129502446412,2.2270662830501298,3.620294892905375,3.9522046002059685,4.00554623355871,0.9704741333719313,1.90323568826115,2.9529564948391043,1.182682826945145,4.184570423591671,4.282392351085029,1.4870254161955532,2.890930771436274,2.482442636965078,2.5630361478400854,2.4546322509841465,0.24095637941687675,0.562833185259336,1.8588385509000482,2.250702486006161,0.8724971190152009,1.86542634948202,4.335700531616855,4.625039143341008,1.7537813424209658,0.4275530519314785,3.2743841130828977,2.287755380678896,2.0049640589049567,1.1204773439814664,1.074279547630096,3.498932359912721,4.319111622571535,4.682628368926576,0.647425706860848,4.607483739590862,2.493178138589729,4.777778106209678,1.7417477707178974,1.4435560537714187,2.5221365146092944,2.7984200989516053,1.616316416874325,0.521352636521375,3.6778009047036164,0.5271409885201672,2.9482943530640515,1.203226836702589,1.9424831542826615,4.221737583595374,2.786651728441859,0.814711667874144,1.796695302917325,2.392118326088133,4.931290856643439,2.858818204353634,1.0147261979728783,1.096013126231975,0.14435717665860825,4.366535358059008,3.1426270611960505,0.1707420880681454,3.956092835998545,2.862151977360037,1.9567982631776581,2.050462123299084,1.9603658917629319,0.7522217197736636,2.960783298890867,3.2583116950504296,0.976270050067668,2.1368935836362493,0.23033799667381727,4.440331226286117,0.9730154508584643,0.3184064432191147,0.44230434726011847,4.371028527722023,1.2419104763712774,0.04847973443005249,3.742311112979262,4.26995067737018,0.11248797284039824,4.710562847700688,0.23631197528596215,2.5437569803424953,2.8151560282020394,4.32008471430874,1.6550714998008653,4.738118619857035,4.6541512299464225,1.13098216793188,2.559916367966312,3.2944653397757726,0.008403083225443364,2.758022526650137,2.5966433543467318,0.084341224414749,1.0464739327906358,0.4055853995886527,3.133142763282316,2.483482014601167,4.839165020719642,1.6942197383724311,1.8216014286134274,3.882144109955571,2.996681098841557,3.7407808367100315,1.4746455858523833,3.798402706614652,2.907621502687572,2.8821479570677777,0.01698017406387864,1.8185635139157474,1.7266987720460447,0.6496525966953803,1.1996896776269894,0.8728976949022027,0.5015652854186459,3.421338104440431,3.5653627269448562,4.920154609599235,0.15645030782909797,2.9484757244873725,1.9715202871431325,2.784661530641354,4.3203749049642335,1.7382900382642896,1.511116615702216,1.1970867481675218,3.7075015837010596,0.16816848245368665,1.528058392525784,2.2407926414599855,3.0702859762854806,2.1943186436184314,2.468018947770112,1.9131717432833473,2.3244103537601224,0.8065860235656863,0.7290382024527264,0.41280362654778524,1.7644116777527152,4.117839296787781,2.434243611382252,0.4603945255663633,1.9317635615105222,0.42516059731179334,4.63886784642124,1.4174875259691921,2.8752575159648175,3.101924436400437,4.788983429452473,2.1473524543343236,4.16800276532753,3.4664284903954377,2.9914418639920015,1.4524903056614757,2.8811073683630903,1.1912507354191526,4.393815293973317,2.6664430738295666,4.385214182264615,4.589785630425984,2.7132967834822495,3.3017472697670156,2.8870171357073717,1.9084048400914044,0.6064518731445134,0.3914687800125527,3.5438945095171093,2.0360298058331527,1.5293165528729902,1.4132844697427371,3.9473359207120593,1.6492128976068487,0.3390179486102751,3.7811378323648146,1.928239729770499,3.4943134535381457,4.293955921263146,1.8977310116428425,0.13865477469164667,4.59312550448036,3.6572298484731194,0.7888458772033957,2.611843825659225,2.2000872006471073,4.006747816725833,2.8259955000146055,0.5944184750798054,4.6009391430450695,1.1702750670818707,3.413030285184343,2.297999949099782,2.757859342407208,4.7187701292753745,0.45305999187722046,1.0074529752454375,0.2722152995794702,0.569267985829196,2.164805783208237,2.40439964321566,3.4882849594276735,1.8052820568351768,0.284516145650916,3.002177677163431,3.6718454665435996,2.341509977193539,0.6011211997212873,1.7863032801710788,1.502120209381731,2.077363117842479,0.3065900791698084,4.050654409121107,3.105879717036497,1.2184471705870425,0.0040126019672726,4.879837791272754,0.2734713982931358,2.3146438941272818,4.3963696038100615,1.0980481860070779,0.703361742649623,2.2575146037724583,0.29935462137152924,2.036052142961603,3.250108100231942,4.677406568262232,1.9451207862079878,4.166891518559074,2.709529759465006,4.434171176517517,4.4558993183118645,4.389085256846723,2.9176538832618757,1.4896284517021385,2.2292606673891435,2.985168894938951,3.0989260527342988,1.5367570809076991,4.9071367350008295,2.922742366461961,4.489956936707658,2.7804930339535705,4.659441215396555,2.152009557010369,2.038222180133001,0.8161237304451496,0.8247387411708706,0.00547248685003443,2.5869318969499124,3.826410864681037,0.5925561106103228,4.359516849605445,2.0085362518736516,4.61914447936477,4.310246000665192,0.026069611365466816,3.8789890013894333,4.204849239787523,3.863101071553449,2.2341286600038393,3.2017527833942006,3.385261550071943,4.33977997643868,1.9480354910309805,0.6408754492451252,2.876136389990447,1.072318977578608,2.2148598828133705,4.8857260010422285,1.808443112789423,0.7261309553208473,1.4334881886125894,0.07608235371392214,1.5086063356482649,3.1301262688823894,1.396531421552445,2.1949331453019916,1.4302988495607516,4.74856175125923,0.050522104496608655,2.5710553799848346,4.4351379597985705,0.8552661604500755,1.076906471586736,2.601212208217354,2.549344039455889,1.382325310402942,0.41600348306157886,3.123331984800266,4.657539174779596,4.323055199089426,1.0653049564293071,3.8284289434697016,2.2260240085254637,1.1992927853244417,4.509815339056922,0.721434667991987,1.1957166272503594,4.608312127325469,0.5942359053508273,2.2257954636893817,0.06362534825455457,3.6424246318598397,4.09218343317558,3.2867447149729925,1.6348677991440874,4.187516238169838,0.3719470084912435,3.735973949224034,0.5117146701704567,3.377151374576597,3.6687399073674856,2.1887346322637757,1.4188898024807273,3.0418330192143017,2.3901307594263743,4.104458201849433,1.3239785249071734,1.1420157272283593,0.12073581156438418,2.6105836701835883,4.372748070886724,0.5233878600984743,0.02148566245653183,3.982553827906945,3.278030422846502,1.1373041983425336,2.5604444447667607,4.416000299449902,1.942261445813278,1.9120887265990716,4.237325351561906,1.7425628942492999,0.5658808873606125,1.44340730666065,2.198306381965134,0.11053352522894078,2.18726313924238,2.1969846915591775,2.16941467384667,3.635131846560297,4.16699125471647,3.0990296873105305,2.87439781229081,3.430970433877427,2.0420191245142547,3.4740985196086624,2.324700149755692,2.4351521247419603,1.3578046477366357,3.814660298402004,3.8623944936410606,1.0822253208410548,2.3927188258121115,2.4963648427098715,3.6548454971340263,3.930252985025944,4.941710419767709,2.4772366153240277,1.3388107942468597,3.340563614845119,4.846491123625167,1.58863583084218,0.7399857022984246,0.39188773151520917,0.451512767823109,4.576628942625972,1.9805892930981484,4.2505895724692255,4.932230646683145,1.9690718887573733,2.0103525038531167,2.778466125715131,4.260432720150375,3.0007741793704454,3.7210025541310143,4.768221042801464,2.599466699477012,2.18940905435021,1.3057842962214772,2.0307344836317034,1.5377076283194435,4.227990062590096,2.531957737383471,4.579529643301171,3.6744149429845443,0.7152392049823098,3.5410466042389577,2.7128583027073705,0.6278497598972332,1.3495891558235928,2.0005623346773427,4.728449048131597,2.5285119403460787,3.479674241644519,2.422081585699848,1.3508646926087697,2.5414093050813804,2.3424497022449664,2.9852666380349433,2.718303489505063,2.343984992166366,1.386337804488349,2.626340268732068,3.317497112733748,2.256666216327913,4.380807190889209,0.34212508053070856,2.698021524368487,4.8466140204351715,2.816531523089414,0.677940704020632,1.284563274394479,0.9738433695939486,0.784241451944635,0.7992248728897655,2.5749524271112225,4.292111046014304,3.54104618362956,1.671351560868859,1.2565874998084847,0.4066960124761887,3.9573131527720085,3.3282664150549324,2.626368786742619,0.031247649547501144,2.5337916891485825,2.7781443833694697,4.520307102197823,3.8553740049310727,4.03655482486703,0.5713392736190681,3.146632569118503,3.6531707040966053,0.4712452804882661,4.974371180711853,1.0503629288743055,3.0558130504340975,3.3335975293869957,3.121168735851522,4.465695291321282,0.25773693289464106,0.7520790483257878,1.6501952245261708,4.25382423856006,2.879973018220212,4.416341660200265,0.5962710036715901,0.7073875636619809,1.0484570243870117,3.6775599347098833,4.607786382731302,4.481465795379868,1.3872773805225624,0.3405802180199957,1.3247430491337053,1.9422064286559426,3.031503960846109,2.8427935925575323,4.346817245877189,1.5955663945951626,3.445944784458969,0.7638149390046312,0.09153970116451582,4.805259967817097,2.7326169031434255,1.8951501561581519,0.3979270607296992,0.8898098558265299,3.0308936865269356,2.7534461976533873,4.108525885337077,4.906134061035466,1.1950190934719718,0.9998726052459939,2.6116519133687186,2.3631998786669826,1.773856695259206,4.25931886532867,1.0285260026341392,2.108665002363521,3.0777310116192638,2.7834307239457,1.421195254060662,0.46500546031727374,0.06560879023036259,0.4193038736877286,4.674976706572163,2.6519379578282996,3.858708725314788,4.208953317186496,4.260578010948821,1.327450882486887,1.8352667510654208,3.183198132031734,3.5850791989573336,1.4600173363096614,3.964785522262538,3.139625132234314,0.7104301727644424,1.5124076198455039,3.991920010639143,0.6237664671091125,2.71658108071318,0.6846233078957875,0.006859661131431993,3.109138776100282,0.02111549206033181,0.6872189928412453,1.2746222295831444,4.700061564790009,4.4758204824739245,2.1173375752739956,2.349569019613238,2.740332453440293,4.48276438799073,0.2927138607861368,4.67464553040921,3.9818388011475134,4.931524123624019,3.4552885822367427,0.8911711699086089,2.7525806991301716,3.531636674007758,1.8857531727126908,1.0998041729431285,0.6819479338070111,3.8894061986986017,3.1168293711672557,2.3377664881025106,2.108506049596347,2.9198007127364245,3.6817049443822345,3.207291795977781,2.4454993251448776,4.341718821988083,3.4211326153931845,2.562909746833093,4.227269976721731,3.1197891211147155,2.80508416553951,3.377512818639117,2.1423531516272556,2.4799027180378097,2.8258386575542174,1.7108114144653963,3.981342663058877,0.43722717333748884,3.7899284456123428,1.4930438939516755,4.579189160647531,3.6168948905603604,4.102405722251978,1.192552826644545,2.436285672875104,0.3218433446290725,1.0533860536780248,0.3118316023264023,4.271172925903698,2.681002685382664,1.8257047468020127,0.18307466803416883,0.5115674392505565,4.545322515374122,1.593287255201854,4.727741800783068,4.934890341762125,4.0232600952175765,1.6575785576582613,1.2189437015162918,2.395897920862735,2.364732224327745,1.8879705700822302,3.724597999461692,4.111919540619783,3.732346363391279,3.8513471433786552,3.6236049535905277,4.855295062765813,1.8504735915490633,1.9991844587793939,1.6028597626141516,3.8140020766057137,3.844503660145422,0.4745069062378826,0.32795517336417834,4.85374793304014,4.068220633781559,4.882560734621869,1.421106889416206,3.9933659906182193,4.703420437723013,4.049776854103149,4.3131053641530634,2.6600702329923775,0.33623013326405493,0.49601998153413596,4.126181450561154,4.85088163863166,4.969266659345141,4.047199628326744,2.3266705484127903,0.9033166564195805,2.4219672893967337,2.1464352391339983,1.4351101571767977,4.231230679251464,3.381846902560449,1.1759084203351011,4.176089784303984,0.8285317353754573,4.0008732412845935,3.8915905324177547,2.2829310978782402,3.2156960868414863,4.598819451819295,3.674559351029756,1.3194179963209696,0.24358367713742113,2.6041885553920885,4.371086783404139,1.2632794611256626,0.23091082139745533,2.649664504527932,2.218535682027124,0.45831100741745456,2.09721500221932,1.5852376871447582,4.418097457384125,0.09792526925669898,1.6485358515910375,1.016031463732815,2.946936459103491,0.7331693605742762,2.8131121255922187,0.9049636413841045,0.6813687763716836,3.841834669908717,4.906664389969597,4.256458019689346,0.9126960501897352,2.6288093843293425,0.5907061105654132,0.0544949043627696,0.05205129277372267,3.6653923075359742,3.283536396517248,3.7970686620860086,4.166650750194224,1.9242573741426883,0.25338670065157665,2.349088575490623,0.6904429799778822,0.9639914460317722,2.6554417508119563,4.360732780989572,0.592580837042681,0.6074408044578661,3.9666095210233876,4.294262585126222,2.6088760718690107,1.844819803979808,0.7853950021731948,1.063192991170857,2.2330724278159,3.7780671467596374,3.5923077448314245,3.7693110357655426,4.832332696732498,2.0031154719316504,2.7418475546500276,0.22315740220099856,4.029643057290687,2.134900544134204,1.923267179803242,0.7245057677304501,0.9819735122243456,2.376905990702446,2.9998549525923615,3.3585326217273437,3.807068470451167,1.5159561935129184,1.4428323657533348,1.5729264177587399,3.8824380478579865,0.38086887648489887,3.5361177946550884,3.905395945703485,4.6687831675190665,4.150537796873802,2.534457762270401,4.322209829203288,4.360486444595736,0.9867264483604576,1.2406187119925338,4.864499061337947,3.5689483503153396,3.642076342991084,1.3284049580764912,1.469802099143681,0.3715562737052669,4.226545557824549,1.4357705853981761,4.829457353453332,4.729994032333147,4.8342305245485475,3.388923178099362,1.167934967409463,1.6983961117479818,2.9075972877064182,4.87747230343146,3.500659399263678,1.4922680624812112,3.562823946957392,3.303918872500141,4.981018275516495,2.9361952646833878,1.3661281222873645,4.5074635971476384,4.073781020496517,3.4869447761049424,1.3102779307075774,4.011129994448743,0.26504546787955996,1.6749087509038818,1.4326144906379379,2.6605174441422896,4.896359301635947,2.4715792125957856,0.31574545877343096,1.0172171681574382,0.7929609020589512,4.359241711583332,0.7733527348426472,1.7535957780538458,0.6790682054942865,1.5590682573226111,2.9990554648091416,2.8651598748564835,2.534942037518478,2.3451033364875107,3.3992322813295814,4.848243807892009,4.661481265292747,1.9695416648803066,2.517086187481792,0.40159725821751757,3.397780656065944,1.9810517737785327,1.8585231333530916,4.526233670010092,3.894517690338617,2.189730164887301,4.953762678221251,4.564363457301253,3.9112235409810294,2.5402462164928985,4.1064593048799765,2.516811563246936,0.29760561152655574,3.1883188432475738,0.5328953153526728,2.321211645393413,2.8419416814260803,0.4203921672134203,0.9006566454201614,4.0210772012332585,4.995963344301506,2.4724505860954595,3.9755292930303296,1.301889696080688,0.8246451018108614,1.1105999074955164,0.49339636605400417,0.09926891815804306,3.799981041928746,3.3648216536610587,0.19503690360297754,4.588953502878316,4.777492503590681,0.6212709163064134,3.5786940981132034,3.7148372601512936,0.15852089854303641,4.003974303346212,0.4490673093915387,0.6812859848824704,4.526670525946478,3.347025233896208,0.5435188215846876,1.6386151438561036,3.9724877795796463,1.5641815114036772,1.2788348676188943,2.045194515995743,2.3529952558190015,4.974642362306701,2.0211492923618124,0.4204594623537805,3.631039966471352,1.8863579252102403,4.318302733646114,1.247638598790476,3.5637356281018793,0.8498882536020969,1.4186177980549597,0.45800970172834465,2.4476194571835985,0.3367884195050541,1.0707312704939254,0.4779027991706608,3.525694492449917,4.7388809445389635,3.7955883966811754,0.14401308374737298,2.4487394685275676,0.5908157115207824,4.896428796455313,3.875638773359782,4.9459978336780805,2.845465378938019,1.582858048346416,3.303672052602641,2.427398988576636],"mu":[0.08181355720450312,0.6008382953633025,0.3991290967803012,0.21948016451068897,0.8841494431587504,0.43662344789001106,0.020306230199301112,0.008815769220881231,0.8801753775561996,0.040298361369271785,0.5668270301977445,0.3085490182389976,0.4915484969393362,0.14117667442097726,0.6671680372082474,0.24041430381478435,0.3603284132548976,0.9768054021917232,0.9186642500090922,0.34533111433732144,0.24651239716140028,0.16245884185029769,0.13563995094945747,0.016870839790070313,0.9377935369613435,0.32217925865328456,0.8641731017508647,0.7945108569116655,0.8470019603844507,0.7087853051694422,0.6574891345453491,0.46691177392083705,0.12052286972333603,0.1599958155725214,0.028728981097765338,0.9800633783270136,0.5936797997338272,0.3419332055046851,0.32065674413728806,0.5185657194246169,0.6054936168711638,0.32236871236344333,0.4119338361766347,0.5221517988818041,0.34318664386476194,0.6665708328701474,0.6586123181731405,0.8635074636429081,0.7756606158444206,0.4453021057409505,0.19947861901732233,0.378296816624655,0.41596068306672773,0.6760872111704295,0.3102569675163527,0.8336392819532006,0.0027395390305087197,0.3151184832121654,0.7584827681810358,0.6739567172702776,0.2084703270712862,0.75717842665512,0.6180897360288478,0.40768698293294414,0.52986135923729,0.7149444762603419,0.44209713630982717,0.17740235039098806,0.5384510759151506,0.5780393245731383,0.5446127597928889,0.42064646913246273,0.5370193477800083,0.3190306275697108,0.9453969083226941,0.6944125896774191,0.3060620807024166,0.8358359831947286,0.7001723081052669,0.20713846241043932,0.9745172333838699,0.23955408586714166,0.2541530834028809,0.7971062547143748,0.2722313124220974,0.8822003108322869,0.4730964843180816,0.45561958536784686,0.2316537970473298,0.7970520370674385,0.9732183538195145,0.39880678605307507,0.1758604570180946,0.3450947161951119,0.05891161141891477,0.3452904164504773,0.5804500337608445,0.23050280731012673,0.6814812073495631,0.655411432483904,0.8179989886148216,0.8958248837832186,0.11522746855807275,0.3989015602386883,0.22366451500025786,0.2770835773911915,0.9175644300702799,0.6104109548424108,0.019049806823942417,0.7731233846810268,0.9467026674007235,0.2400605221874581,0.6268684047197439,0.6975622714439391,0.3409363683520368,0.9911597225629738,0.4974803913779011,0.25608471459519877,0.8417971720983579,0.5843440054147637,0.48353503992038993,0.3357930594042282,0.5932037393409788,0.4509105242377702,0.790423649559509,0.8086535394311534,0.411185466661913,0.7331925990285906,0.7603237984898332,0.5900561517193588,0.2977043843314846,0.38957755964041874,0.4411510677854664,0.7148901351931867,0.18978030592592132,0.7363831806908872,0.5209710082349748,0.20261214665326244,0.8987767940940079,0.03889624712902551,0.09169052028120261,0.43879070579585355,0.2361007070176271,0.13529557130172476,0.7032307711537349,0.22350789927962644,0.33471551273492284,0.160828650125306,0.22315474053941475,0.91804020844687,0.05219864199194779,0.2507718411933253,0.6180360456654881,0.4043781778299771,0.07939710449847714,0.9785278092430165,0.42917310694888844,0.17451378598502298,0.9647543436222397,0.7175217165211509,0.6264151485321399,0.5709913959179902,0.7113982004740218,0.713243166977398,0.18549217768920756,0.054726154110628755,0.7152879245994588,0.8346500661273781,0.8987112359917855,0.3594461465994645,0.0826264323841086,0.884425030303325,0.3769428636531893,0.4668678978126437,0.9430467535158187,0.42238797572150344,0.08937169167044434,0.635769968507748,0.0664084085445551,0.5095263047653453,0.009034638782771776,0.9932098724874419,0.9422412124270996,0.452898941437593,0.4758007409020302,0.7994170832702954,0.5498920078882352,0.05453830752259581,0.4242723093036844,0.6086091050894498,0.009454763076295558,0.11213735303767192,0.26669374005064395,0.8926396183046386,0.49836260472820126,0.16557286640721136,0.41649915140593663,0.4726920087525386,0.6775349366483501,0.641510294180011,0.4429188657268537,0.2838377554861462,0.3986451283153971,0.9556056735466236,0.4094982152788684,0.6507315963996927,0.8286489437225901,0.5361135125784628,0.5662952710326699,0.36247657191142024,0.9241106674507649,0.007548318557258238,0.9860663408722306,0.8431267340271775,0.8378703870710429,0.9274438087568495,0.5162925891042589,0.05122292633586012,0.7826773681422912,0.24653408998640503,0.7011743200229701,0.832286788224675,0.4063334785432129,0.5006542672754029,0.7510752335299069,0.7996107166613531,0.9461067419060072,0.9266995999566516,0.022545384204976315,0.9953650227448241,0.8898083947276774,0.04954291813222045,0.1380920122973679,0.026276914014474073,0.8378402805905103,0.7100859301903315,0.7546837710772427,0.17957068989752156,0.22039153270273615,0.13039718730010508,0.5833207796911035,0.9629692956111042,0.984673906535366,0.22168232305067703,0.17975188600262215,0.016161591888826266,0.16541927478532936,0.7919585127789606,0.3115121871693214,0.896266498812812,0.3809738009709467,0.8079285434885752,0.7782705244708896,0.40627275387929895,0.21571450995128072,0.6974447313365257,0.8506686893155111,0.420042046217622,0.6620373861554338,0.4443048886626595,0.2247883330208751,0.39882683279984743,0.49693119414812026,0.8402748247316938,0.575911170211914,0.47455129351928815,0.028191837727710833,0.05497529438525861,0.22916717649657348,0.5299143416754581,0.6694859200407821,0.6168013689357084,0.318467953149296,0.9941095924494674,0.9758774333332445,0.9584347463931135,0.4153416312548994,0.8457789810610352,0.08458030229226376,0.529661424051955,0.253264452156702,0.4160952991418394,0.5347381042948314,0.29315223599590845,0.0016241025793732877,0.5380605938612713,0.2769707495139877,0.3360627990484648,0.6310141764058474,0.5087366440841514,0.6694307229715111,0.9745146382306968,0.227806107488417,0.08430294965684482,0.46288513537050413,0.06230778058196296,0.6066183171221535,0.11219502919294388,0.01688508371650399,0.6550221077445799,0.43423290838339157,0.9359294303368126,0.018524571324786798,0.6566395641449347,0.40049574028605295,0.9555700176423885,0.5996182240717285,0.7183719479901953,0.5942819220404498,0.3249938449142513,0.8842226481090492,0.9908304816526132,0.03691280454162893,0.9274864026308252,0.0913012852691022,0.7649605455286812,0.8675036864159926,0.5543623437658822,0.32364103823249035,0.5629005208116364,0.5201783899752614,0.924538597104104,0.7296553831724255,0.10822250905865749,0.9504983063632533,0.8159703680861028,0.6681023248320994,0.29188482771849356,0.5150042118786999,0.9865302330000367,0.3023441775775131,0.7533789095465082,0.8973031484642762,0.29985385037998236,0.8462284647801352,0.25373055839494385,0.27893860797409364,0.012541846922184963,0.40652790548054685,0.9620970979162917,0.9979392158580203,0.8108105790335496,0.18071837629100607,0.9516939749267486,0.9068066247386937,0.7007482087089452,0.012867413930739202,0.24522208941882906,0.7526846986005273,0.30256836036652546,0.4918889038839529,0.23129383701024886,0.8008494109001385,0.1840297437650622,0.4380027494030345,0.028520136859570888,0.3411493648093695,0.32409206509092847,0.8519747100707231,0.6795378320366674,0.4189258670053113,0.6474388097023913,0.9234879030940439,0.8416739682579346,0.04573121080218456,0.20591670618033064,0.162555937023398,0.49044668188744,0.9631710881900213,0.7311973859639724,0.44334963592391263,0.8190051269520067,0.3988917186303611,0.20179531677303864,0.6200289657404068,0.5577819496289615,0.8557767173297866,0.18951752356297558,0.9850025319411397,0.45307424703349786,0.48954952754275216,0.9876860779957424,0.9522639803842974,0.7794581289145572,0.41230783526313175,0.5785833260199686,0.9171774712951652,0.14902445230421946,0.12294939790587,0.09603430283790293,0.7415679608127312,0.35295508778709017,0.21878851128122956,0.6759456459908881,0.2587115847485997,0.49525513917964825,0.4626850037824459,0.12717998791862595,0.5681274677609998,0.451682914205616,0.33587902995021346,0.5327043783180567,0.15212856150432152,0.5637196910650704,0.38707508961868564,0.9766348864186072,0.1314280879537253,0.7526005411162202,0.9000456451584558,0.5517861694025739,0.11177639965789332,0.5119452984421611,0.6451455719722214,0.3079970255150093,0.9206437817223216,0.11834786453756507,0.880296834638632,0.39460729620942225,0.6214848088232985,0.5020618484983104,0.05097432865836904,0.06868953952981549,0.1829623054323699,0.11337736015237998,0.9907713917417089,0.020813548883823474,0.5955705568960821,0.49766605574956535,0.5047357504296466,0.06308672770492274,0.9836434803827678,0.04082424033799792,0.026853446152860228,0.20288925368386734,0.5685704088231209,0.7942751186160935,0.1476558829847916,0.6311970090701298,0.8722801707913383,0.7225502961894121,0.6251494082610691,0.3618591020677977,0.44554221806297356,0.970382701315819,0.3984995932622388,0.39410802076544615,0.660753475043206,0.8442620925780064,0.8127889533152819,0.9604783490745543,0.35199632149954163,0.9871169503028272,0.4359567591613944,0.21957627961167425,0.548166251744753,0.7336553291444414,0.834643359343461,0.01869650358633712,0.7813845325619402,0.89703722960993,0.3381806449597413,0.5475805216083116,0.6154441985256511,0.8883750953952947,0.6878296441084488,0.6734067824833012,0.15716117239898986,0.3843872920147,0.10258954536228027,0.4872069476268921,0.02177291941598236,0.992095447378128,0.46263440347731577,0.6149773969513901,0.7177697954157065,0.4414061647859928,0.5364102975270071,0.9018564490305296,0.5855563220743831,0.8976222797262536,0.4075345929345986,0.8468890308242105,0.7719635923383152,0.8115533596814555,0.17051646433777257,0.5635937485847267,0.22703025478923955,0.6737105157201038,0.09327215995288296,0.8438033515872352,0.7856490689820634,0.17365279286325563,0.9372335094034334,0.9638294937757221,0.06438220430845965,0.3849984877332884,0.7794098454889584,0.6832778846201253,0.736467468521993,0.24238651364953467,0.8063295547277989,0.2585875993184823,0.5379636645985255,0.555433437624244,0.20717335681671245,0.3669903758201154,0.5587596879181533,0.9408453609714422,0.7131019938639804,0.8341945566188826,0.1451949494582867,0.10146076714571062,0.38555753158246264,0.9611162913770759,0.18874692971054885,0.43304937104577546,0.5334758238485207,0.2999681439167965,0.49619487836843224,0.9286860597542141,0.029000061791763176,0.6678267695145206,0.9123022525519358,0.6691312526404745,0.21967840767701619,0.5840467124396729,0.6717765801720208,0.7691669857929497,0.16485568814212392,0.37497403082006997,0.3580287744113879,0.4368681477468519,0.34339434110219424,0.8424747144485565,0.9247397046074528,0.9645527584714744,0.781230832355267,0.5213495672301394,0.4173898872666748,0.7687822003847833,0.6080672749587563,0.13656768472675807,0.40064614333594695,0.08508798741470303,0.7016576042022944,0.46895494502824553,0.18566732570505584,0.4631007861431198,0.7940867675458623,0.7045028174480434,0.741695936097418,0.09243078219956447,0.3436457352479827,0.25774008666512604,0.4903334411313831,0.8964825044598521,0.7288701527217181,0.18296387628235156,0.36559847010022395,0.8951899569249628,0.29835238450528934,0.15815937169607164,0.9690367685969377,0.22041140862141773,0.25849954587785473,0.061147637413385025,0.08209816707378215,0.16606681858497407,0.7990799143977607,0.1795770958525864,0.4939619931607233,0.1254959072977282,0.09915353716010622,0.129268478512643,0.1645531990572311,0.5529171834689282,0.30276081210166894,0.11999619622341906,0.05780876710269367,0.8327614445644869,0.09757737563084379,0.6649133368588018,0.44709393930037433,0.713424238957068,0.8194861527809665,0.19253251938591753,0.24582341313619716,0.772030053387234,0.22378913355587216,0.9486654542686008,0.6703268176659625,0.08950339384039063,0.05504814634153643,0.644354713225703,0.27355563125789617,0.2915748112912422,0.27975918941828737,0.38181884527537613,0.06012852717946471,0.37488569572626695,0.7812359162465405,0.999304162807048,0.10998507412154224,0.8753237517607977,0.04782197777625208,0.5214328121890497,0.22890157529223676,0.04089165589945698,0.48093267846686616,0.5024192631023685,0.8253733093365865,0.19086896518126295,0.402993867319527,0.28261067113603033,0.5145823279914687,0.00941792310130296,0.8309738730477356,0.9358877517539674,0.13279474846242834,0.17146696800775962,0.9099177393086813,0.7429449239785935,0.5190592036602997,0.8839725835987442,0.09379010346736383,0.3169105685148701,0.8526425045874564,0.2672857296857243,0.7963380770682253,0.5482819515340664,0.43737330440128597,0.6758835268846237,0.886510572503715,0.5341757726487342,0.46600934158222773,0.67685933205149,0.7228713564371501,0.271147039332579,0.9512684758851075,0.14536020146945972,0.08416803545941876,0.17835456814508777,0.33091921073967967,0.7748711882803949,0.06865859529085805,0.6859291729254862,0.681066600553188,0.17818582298188113,0.847435494693211,0.16269906435359416,0.01617251630000527,0.47067863045490066,0.0342503124801532,0.2737783645038345,0.8680125457521433,0.9796653180535355,0.6863675450180031,0.47191553824762456,0.874454664176914,0.5348406442184943,0.7947006409456023,0.20466450759116128,0.2142566047684027,0.49610288571252736,0.4833235724530023,0.6379578329898163,0.4218053541264912,0.9995332444767178,0.2548998716374131,0.25386461864340015,0.7669566688818164,0.9990548472000773,0.9448495023357237,0.036903653699708494,0.7119757201836856,0.09058018630956655,0.9607987429266724,0.4353693698709076,0.47903340052660104,0.2569704733513356,0.04781770033850519,0.40055206833858725,0.08394472210619086,0.24272679021286891,0.1751089592490347,0.39285358786169744,0.7066068472633846,0.5552466781147345,0.9643673867303495,0.019509200718314856,0.7656852461452945,0.5773258287510594,0.5754460861186859,0.11105081003938433,0.13899503545806535,0.566695880151284,0.15827389401127245,0.8368939837440761,0.7010159594066259,0.06306069359625743,0.6576449902930299,0.9355335027310745,0.7220963473954043,0.411553215877543,0.9029088428713554,0.5454510471203757,0.16231424921226045,0.46370718153719714,0.14269287794210173,0.02422829732663856,0.377232663695233,0.877578589627956,0.7515725025115085,0.7674229353554887,0.8864939081146124,0.9610853238497914,0.4092858586924468,0.9963490327997302,0.26326171864158954,0.9223993455515349,0.27473496933653907,0.21182779996444467,0.3259730159561489,0.3504407011338435,0.4126230643084585,0.8201495333382125,0.3435632448352359,0.2207307676884478,0.7863303276951572,0.592729672573713,0.9750803396505237,0.7605385467965937,0.14206588639719908,0.30596108308121095,0.2709397283692825,0.293309089606026,0.49665752213120307,0.9414874676284373,0.7082225685348176,0.46538500988239573,0.19125142497817404,0.528460535830114,0.0632462310806099,0.20412658997338617,0.4836733042328629,0.5913638900173572,0.835375939889325,0.051014750062375214,0.6273016289133533,0.28846277343147886,0.14178928385698208,0.3146475976964176,0.2096353318102011,0.11428319215309513,0.42859210374129986,0.7810709135786058,0.8892374166100094,0.9705654045110483,0.6817411371303266,0.418601896272639,0.4434930382790434,0.3212830039506691,0.21955637926221194,0.10829606317839446,0.37265804508405553,0.27867277796825163,0.12152686749059538,0.08906516329359859,0.6440265330746875,0.17262728475670364,0.6960856409740925,0.7135835236015673,0.19514338988885482,0.1551780620422194,0.359130080232299,0.5413472720465573,0.835620895355391,0.8136910169602489,0.725466750718669,0.955415178539657,0.5753786088847521,0.8084202455866314,0.18674061483742532,0.6970106399315994,0.32355968972938043,0.21313114907845154,0.7130348820618804,0.8229839141615467,0.7343222450303999,0.7176689098672742,0.24975877535653646,0.6304138492539286,0.4982203138456529,0.5224124248954702,0.5666398878128538,0.7548421042435991,0.3873847933233685,0.4658841330826764,0.7313290023438557,0.9685452841295537,0.001782021153340363,0.6229678707904667,0.3054743532499615,0.3107308595939908,0.9317514446466904,0.7766014301158068,0.971358882773679,0.6678200035952475,0.5132118326486157,0.9645386093186699,0.9389426657798472,0.6872207671181612,0.768485261138754,0.40595080020783114,0.9467520525517799,0.29320107556657704,0.9391655506573195,0.8308509742488313,0.2866608883082886,0.4164209497718814,0.5964351920068356,0.6603850535199536,0.26399416900728867,0.8847090798618198,0.4396817427877451,0.23677013673110814,0.389717572413649,0.035578982323760444,0.12900071526428492,0.36227561829111354,0.624095956212747,0.49531101239463093,0.3521262096539153,0.10035991716425285,0.43759175670858963,0.030777672002732626,0.09962526156602824,0.7765901933495034,0.8994416353019474,0.8653378984420146,0.5925047165230448,0.6976948998112622,0.8156416555078023,0.08357689832194293,0.35746927606964296,0.3014684431555781,0.1832283526932832,0.549206881949136,0.35589819183647853,0.0414526199782137,0.10857559837045705,0.7039709049443341,0.6903038664461152,0.07248742085061721,0.617442444436473,0.2645302747129896,0.7912562809787449,0.21387300947521815,0.9035437854668065,0.09851296770360496,0.9366299446574748,0.3953244594411707,0.18036979894799288,0.1988983501622652,0.5842211727030762,0.3193244201358716,0.18033237982120243,0.7200344602410129,0.42549965282430247,0.6886013768415571,0.8631374268855718,0.5792047621914092,0.250540754251694,0.1001878548127586,0.11210432919319047,0.16049754759839607,0.8755270419616163,0.6200590212085648,0.4548970835695414,0.3025554929238288,0.24415237048949412,0.41512411442595254,0.8501665370341396,0.9341110544948057,0.48504721983337373,0.6377108213585405,0.7010817793699498,0.6044888260389107,0.9395655172790414,0.8641710505898663,0.027637865339774192,0.9266874883091125,0.5899211622364349,0.485593830993688,0.47172582647184,0.048653661200198206,0.025460025365147354,0.374557691971368,0.9063940269916448,0.9199310619788463,0.5136810162722696,0.4926891137881717,0.64258851571835,0.8506415373160092,0.6776161905187474,0.5290176809542488,0.005488411432609919,0.9312726377202192,0.7178596500079841,0.8453620389635887,0.6709118910636884,0.057249803542164024,0.601974800905527,0.9794593880247733,0.39212182648193106,0.6979817543908249,0.6531583610778922,0.622084260682775,0.6781647836616671,0.5617680620005909,0.8459270723768659,0.26601398721911584,0.4947998675332608,0.95968752913033,0.227052902668609,0.17015135643943724,0.8070912683489933,0.3122071415419154,0.46718233690999655,0.5844677076384783,0.29210624290923004,0.8203066102069017,0.9429010318248112,0.09616488861877404,0.637549350672945,0.2889946698359307,0.48230875420630515,0.13834204991085808,0.682596362670636,0.1883420357045078,0.16163622082635154,0.3803972309260515,0.6334512254039821,0.1554062307680959,0.27844745478636,0.8217727351971822,0.9325499179825625,0.6419397171821541,0.3575915124580371,0.06443110432205912,0.5424961359546618,0.30196603694317314,0.6770952881281354,0.17877738398041076,0.47138937564774963,0.03160370438092808,0.8136986293560073,0.17582904655348086,0.16213893516130518,0.7785302007322252,0.038985088265058865,0.36860338264134196,0.09499042795912405,0.8190145187679836,0.11819058793994808,0.39602118810649434,0.11092834722649858,0.8149522532987763,0.05881969059120151,0.6444340525224503,0.9601848274947693,0.8552137569924083,0.7696381345415713,0.036124795471839555,0.37683787811924785,0.5162617223532877,0.4095267542021328,0.014397336989635745,0.22757552744470355,0.21533664261260665,0.31432146681089645,0.40599516702639926,0.9296527835578579,0.6574149758700358,0.5128249758645627,0.0936018882063725,0.8691773161663501,0.6305519699543038,0.7467274720054866,0.4602528259818308,0.18602042886935277,0.1761801235813567,0.3581306262068331,0.5801699103313718,0.9501575403301186,0.38828923332013177,0.6415152020679826,0.8270347544831376,0.20276656642107693,0.9259637965083769],"beta":[3.982029136518368,1.1675841301951806,19.655128379700937,16.560767463384835,17.094153741129947,0.23358293393588525,14.875216029203253,1.8130757014834353,7.469818889948194,14.280599845326405,17.528665338483332,9.42653646234489,13.68280597648734,19.668763060378325,0.3547197945588243,2.3380180805127004,8.039249420817779,19.511603988030224,6.505722628600394,11.973059849549434,17.108859844023662,11.710019198712267,3.6441039879795456,0.6026563461809031,18.266424202153214,19.351387803913035,13.619653914993698,8.642831460270472,6.256536490649021,12.738511715874772,8.100172709255627,19.22352058883657,7.750321060278229,3.739704379980555,2.079203598270296,10.025872511986433,9.996268480372512,1.6213873126873057,9.676590891649845,0.11359273457857366,15.642678274669702,4.795176475776453,14.519497657500224,5.4853797388644265,2.64900788625694,15.282136266815346,5.88822308123222,5.594921407472202,9.400656163647017,6.752118150035256,15.407012512295637,2.907723266875446,5.933528853981493,15.295695940773895,9.836920575123823,7.228372216487116,15.337427063645954,2.6862248356407425,17.651228301770672,9.255802058584294,13.247414928477044,4.036950872246048,5.658838232388632,14.235697049053172,1.2604049939610684,18.493834340558145,1.144890621601915,7.400362662574929,9.15314796000155,4.152655816032165,15.539015261887767,16.629821914217725,13.86259554494563,19.292167242941236,3.041852883721883,2.4961639877669306,10.792291913474944,5.3990525858393035,17.17967139091388,15.831597847469116,14.443087836095074,15.581416959853481,11.6556119047359,3.9293068337307924,3.041371855360886,3.9607494776119045,17.133091216281695,13.886397727557874,19.11253923994522,1.2893456679338033,18.325760026042552,19.715947978350886,5.73986319017683,16.9839045622491,18.75278116489328,16.488358912090234,18.06036199226139,16.793120292870544,10.435121791058997,0.7321299106903956,8.231006272532015,14.412825332500606,7.301894968092788,7.862050564863119,14.800917554178259,6.776824508979016,19.203471617356023,6.892770505089056,8.360798764311319,19.595013907057815,2.211511100484711,13.661163127809521,17.602938512272047,11.768635367995323,2.046138903605912,11.891034756662018,0.9013842763871072,5.607769286577224,8.783338201012821,13.270415875481255,11.309582503047189,13.52149303868221,18.129770691805966,16.47614924902679,14.189097322184509,9.595419684777905,16.216479459357753,5.208167949705196,4.9270849220060775,8.786776626135424,11.915092074938176,2.723586331399157,7.510778970854339,11.912286302704045,9.829266903621212,9.922212410031328,19.23728728551442,15.597595670871325,15.404488836400464,11.996279211639674,13.724951918994904,15.966448982854878,16.330727080563456,11.235707085456053,10.878070925466655,1.8940865479776914,8.983052188589472,9.803035633721677,17.24280235301205,18.785282511355955,8.066780285399382,10.966766036085257,9.335598153410531,8.17295888507719,7.111264508723676,2.4653001765543126,16.20683001504765,6.787396952428604,10.934788642279457,13.671922481092205,14.257422063467784,12.183009347013133,12.834533749810797,3.1444465094597396,5.020143349764679,8.128485341154214,11.343395838686892,17.896251576107286,4.323230413818435,18.54082887737065,10.966527520694074,12.355405098067296,6.37586521787219,6.797392983256301,6.555422185224122,13.992638960889035,11.313137677044534,10.46784165536387,7.033879885179064,18.96081694176941,1.441941643082818,19.51140359069114,15.787562323467622,13.539662575593754,1.6933438755934471,1.8047408032410583,8.186924599437315,0.16433263381463448,7.985224340996164,18.55719894723287,7.946987761891284,12.781272526430723,10.055275432434785,14.58563666638855,18.18012077276826,3.073284973804191,8.806033290154748,7.204631995765385,7.842830847897431,9.682432813754005,18.0794232626044,12.480336449475601,0.39333730940639633,9.12462951222377,17.574445403312545,11.841663175158397,16.00023565806902,14.20874031981857,18.34195437554204,0.5969043650095429,6.8074329557100155,3.0324771592539124,4.096796923007249,12.07146346656382,12.146299742958032,19.827464274244832,4.542648257616748,2.4960432237774466,12.127526697868053,18.241925984170614,9.218821456765243,19.757481982367693,9.436630514991924,0.7342922389222339,7.30591076094774,11.134710550139362,5.951343007598657,9.310310263347436,9.75728945228347,19.795454365333285,11.380811848280441,11.840753491934635,2.152067666151183,6.454704793025403,5.835795038003435,15.37338584417595,11.497819911848929,13.704082542158261,18.03569141904211,4.201147202734723,0.34118652768413416,19.97143726746927,18.87275820916348,2.8759771394215816,7.7598394798207515,8.834806373828412,13.429729022051081,16.39548155149654,6.6068449621628655,7.830261643314094,4.07285921622822,17.129157376331534,1.7548864957218546,11.128771044692037,11.478729347269226,15.041462428465966,8.568502654895177,8.12272791022902,16.05423201032721,19.73389826843561,14.906820875933068,2.6006152398231253,8.208776332322332,17.66848685247195,15.685110173148026,4.820043365406517,18.185378576993738,15.381778360606265,6.097607676857892,13.305029136472232,2.223559077539634,18.404774634681118,10.710561211364764,5.108874311801257,3.6526754782654214,4.860372146344711,19.564116083852756,15.722087538771742,14.887389948764431,8.220199116896826,9.527043476355503,16.29787038573674,4.39112013735544,2.111324663297429,5.599801483182265,8.753658486383816,19.673954245957113,9.422126509278112,3.9465416602326586,18.664219202610557,7.307696840808857,17.404943726411858,11.834496608660828,9.978454989740912,19.767497001102807,8.372776071003116,3.903560409935274,1.8170549462783292,12.323891653640246,3.334844209735315,16.64182673271077,8.023391487930368,10.977173576694677,16.644677119308994,10.213620212912051,5.762344642499713,19.6093787205512,16.57586109825829,16.3903434206443,19.81068698285956,5.840321740556917,13.6805187904117,13.134190178719155,13.184316606578687,13.67954494044513,10.925676430887709,7.393034627695125,19.243825097411005,2.1968576653550853,5.171008848486474,11.698550294855167,0.15038144140369525,4.787682261708928,7.922535939730793,8.163253119827072,4.091171480332192,15.55460833870988,4.050083998666358,8.47061568995052,15.123368877158132,2.8464981979445048,17.944295306952988,2.602217660533439,10.523823110342212,11.323761992228176,17.258615953811308,6.7389816427844895,17.26708775835543,16.024617350177,1.5199670608527294,6.605880621002056,6.178610311157566,2.3224742186290914,19.792382354667648,3.491049276511311,1.855974328313943,18.914437567467402,10.882294842836107,11.715995158017712,7.517482441180068,15.44884074238321,13.874293938946147,6.163719090339952,10.702972861282536,11.648052423421817,13.101924182067751,18.760658540116427,6.967772251537889,5.473556429203668,15.708884644450993,17.170555713341074,11.074279607962616,17.608241467576118,0.6824612252988205,18.56900832823374,5.020966789305943,17.03197130233213,10.04923551385314,11.40035330207899,0.9682260837051748,17.483233409681624,17.212858620556247,17.88936329875653,7.253927234068138,2.1614718247682996,0.479059723674804,18.23314777045313,10.466589429148678,16.24461741931002,10.582487148018833,16.86948973055305,7.065561792755641,18.81008789501937,8.14361977683081,3.8350816672686827,14.932606337349075,7.7140161773038685,16.938298392200796,9.468285533858749,8.553291744543849,6.59360841983609,1.9967520647686765,1.8392131367492226,2.525590175323047,8.463604556986407,1.5753914146355896,6.480301761456579,14.061196728777174,19.7148508921062,5.485002572087212,4.988701317530975,1.3199098220040995,1.6222010530779007,10.347171999192604,5.27986672510345,7.2233633166102384,2.257675073858829,18.694985121269628,2.1660510112155684,19.970181068497315,16.902192550485754,6.3290380270745805,8.077747756544259,11.307923877785377,2.894752923501782,4.214869418953215,8.280408738831916,10.655941523744904,18.704759849682414,5.642732913201156,11.455555981532273,19.3272812730358,8.934006413594911,2.0793783405652233,11.079812601054403,13.041100741430105,7.670281761861775,12.877481127832887,3.479431736701546,18.109224527494145,18.213367039618525,7.184543386363815,8.083616383063879,14.723033325136683,12.695714901806326,10.342993597334447,19.121993648805493,9.6926163944745,0.9830683186477174,16.832569906084515,2.7842604732927834,10.337450259007763,18.09321020533865,17.0918938533131,8.74699265098219,18.080743993843363,11.91917466353491,15.395293718007505,12.792112944966423,19.410278032510583,9.252269036892567,14.103629975459175,12.976399296842732,9.018737770681335,5.9602143700260735,1.9885207883528322,6.535714595314874,13.713881890930804,8.595131864499876,3.581624262946761,7.863153980099682,2.6281797957524855,5.432461751558364,16.34931125032612,18.42844650638609,4.9440922279999056,12.157462051044652,19.411361290491964,5.979430815128679,19.891574962935692,12.072565467855544,4.356031300087673,8.122392817134592,14.651390172057571,16.7189302607798,5.662236062327675,0.7493322134530178,4.1676129076969515,17.525026817317112,19.73167733160492,8.012758848883038,16.84807312356202,3.3896550332692454,14.73849357563472,16.474949625323504,3.240406299841263,17.541753669968223,2.8087809941845787,13.063130325348645,19.308222234247737,4.9100416570988425,2.3892265024444725,8.194762694565352,2.646024811965866,9.79771428450583,15.048328339588103,6.858231999097448,15.463755719195426,6.482492978335963,18.65023072781684,6.267702739106693,10.638613164414824,15.416611631351827,1.1571621245735608,17.987632285424763,1.5638485575774475,13.288743021973236,8.041276594251707,18.791097961096842,10.063107261090227,4.370654074161844,3.476352826540654,16.46825037000907,13.60327175679808,16.921245971480303,18.85213895907291,1.860662148741894,10.653828146972359,15.410165384587437,4.1321416398635025,11.222823807382657,2.2650032255646657,19.596147538059196,2.147474612505822,3.9596314701202617,3.8601405857187077,9.429435255428835,0.6932051872751677,2.6773336370996015,8.461069958494525,19.992766830070785,10.635469733896379,1.4226857133651682,8.02156620946596,19.176542937310828,2.1866491355473894,10.270912551030062,5.403968593851816,13.493747701317371,4.353117749181017,5.548568292745575,14.79120839088537,16.105063964644003,10.843882120886308,8.971597195838399,8.752179403651393,12.19464066265723,10.376965251895607,9.282114506778726,18.84488140830948,18.681148731524708,17.45236953226575,19.715836365340916,16.058093178544976,18.881289975616518,1.7396917958466318,3.8299243130807303,8.834472409621723,11.07239880975115,9.295483146645772,12.12255224470551,7.317174867512648,16.662930347767745,17.176697812510252,16.638391677658888,11.566847566431878,0.6535028768285134,6.85881724182841,8.054877430973505,5.4189647124173534,4.97018820836411,6.7099482825278,5.073916076261411,2.606727855186577,8.174431683551028,14.975367390301129,2.544787256580956,10.838633009382907,12.66565050135159,18.935210079625566,8.297477927505824,0.1093007963084558,13.280304670461845,8.407851733927941,13.286411223635461,16.12695186946879,19.536645123978982,19.60254712058053,2.0471358869128675,16.724550363603406,11.288655067246145,11.136352670874746,6.925163282516769,2.406853185174991,17.792466598543587,6.271363631377285,10.70631625996009,2.7104092359708654,0.4874933037780371,17.166781828967732,12.037103289686728,15.59603727707267,13.857955503001014,3.5157202556146716,3.80014912905585,13.225878749627977,17.61940143471209,4.633129944494434,16.783194794105135,7.480918139658188,4.829584224768215,6.236357512157098,12.681003117661277,5.300785102227028,18.372735655905498,17.95485381816476,11.269454886702999,6.192243479546522,13.118816177150974,19.820196039529357,4.1778915517846515,3.5177050508592345,17.944035246272424,3.742503032795188,2.3977747370267677,12.503701526809143,6.01025341861122,7.283550230754807,8.514000266921089,13.230974575463655,12.710535423944581,8.538557783200789,4.750826501444072,17.664164861578392,19.15794315954994,14.52254946449084,0.0964526467029625,11.117108182140267,3.781437451987051,13.509991852003242,1.9060578345529278,8.062397599220418,14.711594990993486,11.454388691883954,4.45674104704485,6.810548587068883,9.918504580684196,18.601956358806117,0.1913902946168733,10.577421867241537,3.6970277800452234,10.463355260584839,9.894872448783198,14.64451862538013,11.648060595780212,1.1537730599819929,7.9423745055731265,1.6151342653946221,16.664543140927478,19.650045392160237,2.338349342274859,11.397483226761388,9.607871425257954,10.156500660523001,7.407748747163279,1.3392814034543798,12.768332215564353,19.313749470621843,3.3826732813168103,5.49802205105451,5.816684337360685,7.426666517818563,12.302283114688034,14.685754463618505,17.801467350504723,10.822769485851275,6.748243450769245,12.451271986155543,7.8991006010417575,9.937750014220107,19.764957483337668,5.9587840699575345,17.63483430059602,0.9343641389929846,15.202593991222484,12.51319214421832,11.882431598435081,2.9107260679948777,10.353174997503283,19.256402388575808,1.3468792824807396,0.9580932703602141,3.7518893170815337,12.426813105170904,11.827175993109925,18.87324497837794,8.556771622933859,15.47052169345382,12.591451010294566,14.773525436254493,2.5043483104320563,11.437312173470126,19.891865398356934,3.575251578043428,12.588606806034663,7.411153504123451,9.24715549555283,12.367493514312912,16.085215682170958,8.232649787348327,6.4529541394921175,0.10173765211708208,0.9020805753657202,13.04926131200257,12.751646001615509,1.4032280392404939,8.55053065010197,14.936004000969838,9.61505406730657,1.4182441775029453,17.54615247662491,18.744647355440062,4.813490483476484,6.736663033322632,4.431926963384827,13.443484813778479,0.3140656662471253,10.893864100486272,1.877098844139975,1.355186399746322,9.776418741908888,10.234510717089474,5.782390548430576,12.32424216634865,17.553441336319825,12.758718533286864,15.796006773992929,13.282069501779144,1.9840545559150868,12.107973035757848,8.774198133480127,2.2218256778314593,5.504212227198906,16.04360481181551,13.330854986833657,8.474585546110681,12.862907401279449,15.258686211725019,5.580946756353553,0.653924698418118,6.702583331180922,16.4786073427905,18.564084271918997,3.493933672930969,14.762132832799718,3.691200632651044,16.099185500843305,5.044371724505656,15.488378661445182,6.252686027050198,10.669928153978386,17.6845250984579,13.59367726131838,16.100319006176957,1.3217706316955757,15.333317957985258,0.023826676871006036,5.273316026155164,18.58214853698856,19.367613184041485,9.14990977970993,9.83329810155093,7.570695965832734,8.817953755795473,6.1308391828946895,19.570202169490635,17.44874078665169,12.911167795410847,5.120768891629819,17.87459983721337,1.5154947621877835,17.315406686102857,17.517315528011203,1.3641601585507601,19.360786587775273,16.53941848028429,17.25376960789992,12.995082844724504,2.50444096935726,14.878444251487885,11.88624842519173,9.477040187857435,10.034629578309456,0.50456780029704,6.418268478502558,19.974105659238322,3.140455810768037,6.72418514702092,8.290387278648272,16.98034323249573,6.161071772138809,2.9799197537432276,0.6775457601149437,13.42709300716399,3.6993404965607857,4.969118508324755,4.643653553610543,12.699241871563803,13.062094266122678,1.8753068930131622,6.1140483168775805,12.631363038868217,15.947710648033858,5.68608154346363,14.575590083039437,10.662373084224868,2.1244756895824146,3.619492186706612,1.018054036590681,6.204467656618746,1.3397084842721707,4.96925471090218,14.99979835564304,14.01015114737163,19.906079939679557,5.172153168955371,14.294740269609512,15.145250490743338,6.629877943655158,15.540269348357857,16.39686537315145,15.334930600288459,19.04589511494953,12.877200574601527,0.7348085556162642,6.844315544486235,13.222948446777112,14.319570410622218,1.709303224605323,7.693482850340181,11.507666399715472,0.8114769630805663,4.749427151657497,3.834709154111269,9.31619850217265,0.27300298511771626,15.144308390504332,18.979716777743555,10.729617444234858,13.90428813038925,15.076433794652377,11.366475510372528,9.577151076594355,11.893562591335076,15.48872012402811,14.067680987816967,9.673571996731791,19.497031370888173,8.861075984030213,9.42865902604835,6.933608248508549,6.1458447197837485,18.940725268587766,11.676721408490373,1.2447705288141586,8.765914332470516,15.746139506941246,15.86209382057579,17.463178770530497,14.709022073818314,14.833624481783145,1.1237788302790053,17.686806170991094,18.17412997554071,9.478796386646957,14.917123172129948,6.770866716579063,12.306336956983994,13.188479404138832,6.82413568948903,16.454298629866422,11.144517132592501,2.9838169582554563,10.288115329915115,0.4827511768480841,6.263769121570699,5.840301977958209,13.32447663971434,3.4751640148151486,6.359355234311925,2.869571916199356,17.848487777887392,15.990838260464875,12.491013036583798,17.152657817851562,9.46825494228166,7.065332560844242,13.377556802478171,15.75434628665028,0.6808164132884853,1.0810362491883607,13.032630384774802,9.721734003751358,13.742346606175602,12.92236905922097,7.013041943904774,14.280684166006843,6.00881778099593,14.807554590147781,15.355146814381285,9.198393459153355,11.942978127501377,9.162294075823612,12.77099117866776,6.942586363551735,15.88342927555865,0.40164858771305934,0.26993253536292894,2.3499536023338274,9.685568564449571,13.28233638099913,16.976351482397114,11.358756019300746,2.2554947634969125,5.590854590072931,4.724392257191763,12.712632903459413,18.488477369835323,5.455076183126675,15.372858622782179,8.420626123990234,10.643132128163355,1.6897748222536713,8.156981164006446,19.992180160169717,11.041234095352163,4.281690818833113,9.87160381470268,19.845518220368806,12.611033336563624,17.864474777692834,6.698783456831303,19.52050654453015,7.109986382542859,19.457302945663816,16.106001482180776,5.981572135336579,10.590274207777245,3.0616460912743193,4.894892640294821,15.039303150801873,1.6800172058819474,12.049435134502646,5.782064850986806,3.5446270339730113,5.557095208644216,8.40228597927435,16.866951892747977,17.67292332467921,12.498928588293289,2.1464783250400643,13.20479389243243,11.85864574014567,8.613765564560524,1.1539818521116674,18.24320990726291,5.216281801324647,8.583344236121789,19.252340165440096,18.86701873287742,15.474971603148537,5.762782001362252,10.863031638514498,7.305831092179518,11.835865054113714,18.67109275078732,4.332254640016817,4.639031503134978,8.75154685531398,7.281197470898513,18.19244313284798,0.14635097824553522,10.018938545013395,1.7065755985808284,12.951013698282964,13.403674087705637,12.565280468343394,12.549992482890646,8.968863247634925,13.883116434805029,16.441049006881467,3.032456044327172,1.5588059350123595,3.7838112992850936,1.8157424647321418,19.990260962613867,9.725550095537013,10.199087205886599,9.379993740166217,11.089503311969086]}
},{}],95:[function(require,module,exports){
module.exports={"expected":[-145.8539197459952,-18.27474269261039,-23.57846192011749,-248.3452410300312,-42.395778667784,-31.261079445675964,-5.28493262100162e49,-36.398984952618726,-32.917353391903504,-12065.552250340468,-10100.001523474693,-21.2336708288768,-12.999745720652044,-1.95126391117372e7,-28.835331338969127,-3.7358618565840085e217,-286.1636201504806,-4.082067820603486,-182.49109741703137,-17.226842749105636,-541.49997563198,-8.305777780763306,-145.9490447962293,-16.582753261705097,-4.349727792159501e197,-6.9654618714608825,-993045.1551659495,-5.620172293210096,-11.69587252073955,-176259.28262648438,-2.4845868657586347e7,-186151.92209058558,-56520.32948902293,-2.551946055601865e6,-726.3833091163606,-2.303050180490883e6,-5.468149350777999,-7.931234891656315e55,-131.9706314570289,-4.6483335008518005e10,-1821.4717559260937,-15.967466570478027,-22.62589757532556,-563.0954763052154,-15.364135770156388,-33.118903897580914,-145.80498751229354,-423.6378497541109,-4.422784622315514,-7.574809082761874,-1.4284033071121132e8,-11.308145614676462,-44.96271382199966,-88.34439916374433,-5.279982197493374e29,-11.272163993014448,-29.025952372362042,-15.5730323023901,-17.58058647917376,-34.35152159091099,-2.1751174917520615,-791.6851415210834,-3.3510189360114014e11,-3.8445709022439765,-13.25314110392043,-5.683337272663107,-6.346150645435885,-21.109375616554107,-3.807561546923025e10,-90.02182274518918,-1.3763658185480596e41,-3.6099412416719985,-7.654927117499905e6,-30.327182501305643,-23.159500508306447,-54.16680775971515,-131.1462489650314,-5.708553136339736,-1.9999332451976735e52,-6.468268422511257,-118.82630013751583,-2.87647212480954,-2.274435785017506e16,-70.14143197408055,-5.100102537342237,-6.622624885703093e9,-3.6117410769081,-15.87368494248027,-3.114203004515856e11,-1.611485784289897,-4.857319174463855,-9.552382709241583,-261055.45357478448,-35585.652772298665,-1.0854127588420326e13,-1855.8059754465844,-15.717388530178816,-6.879547377245065,-3.4098914274154493,-46.16282527304473,-264.5645523193326,-39.27833254508957,-436.2736834877084,-7.371382549727205e6,-9.978462804757934e6,-50.74553189429816,-1484.3141105078662,-10011.762930580124,-310.39137089291376,-205.446034650537,-11.933894540799063,-56.64958829053255,-672.9927570536319,-9.470810428548269,-1791.851686824833,-65.15297330553153,-3.644612856757057,-111.76100526161069,-7.037489164323388,-246.9192232410819,-126.99140608140006,-14.742480502553503,-608.5194085352588,-10.94307069452024,-162143.4528239168,-11.927652506714303,-47836.34810571345,-3459.3441439165126,-89.58495278309347,-25.00368055009031,-25.91537036623197,-13.009619977575964,-24.202413480152497,-35.67669374701731,-243.34477163988703,-4.187062800314409,-118.21649077915944,-69.40587401997874,-14.70236142131657,-41.189104068380644,-122943.75606101449,-793.0996202783011,-242.72641997827634,-8.30235887499697,-1.0890716276842216e11,-3.023538635215707e14,-3.659437031353673,-9.003461152539899,-2.49982660311262,-11.908864376768857,-4.486285360822371,-271.66951868737,-9.812399225570315,-7.459198837804159,-207461.26209571652,-1203.5525413560076,-4.585931784377872,-1013.7309046528951,-39426.8782734056,-3.418718781185583,-4.235593087081764,-5425.992791363437,-14.602838405263094,-138.24893613547795,-629.9087017421034,-1266.9800439525536,-5325.160538905472,-8.759891950391054,-197.94321254497146,-10.241692689467719,-5.357971666622307,-11810.597190073988,-52.167692026747744,-8972.751756024347,-1.913188326781628,-42.26591225222515,-690.0600103442533,-53.87037379658422,-46.827847153524544,-122536.1270348457,-4.1927245755893647e18,-18.229832533478955,-7.753835083615667,-3.007761954518036,-5027.49628585289,-5.419598397653329,-5.768315615131958e7,-20.519883073846216,-166.40170711308045,-17.984662980156163,-19.566901968505945,-2.8011953925628257,-1877.4753081324138,-6.041891430177435e8,-35.76269607965181,-13.714724635327496,-5.605382660769525e83,-1.5402833473515805,-32.7038760685298,-1156.0616849740854,-2.6850326620935596,-43.1639915426379,-6.441588726010061e82,-6.123733721537884,-1964.3252944939636,-7.826747215923083e16,-9.50014571270096,-1.410547121701057,-4.81830818138075e19,-5868.2637363617505,-5391.636231638897,-4167.384630045335,-970.2915087099128,-2018.5581982195386,-4.087151695313144,-12.797955723998994,-281.8652892095165,-7.91356938120254e19,-37.144038033528744,-1661.425667643885,-3946.667685860518,-2.5285278261846156e14,-15.258089849676837,-11.634356788166926,-7135.745043040735,-48.422640090190384,-3.234967767324096,-15.241014922230129,-85.87973499849168,-3.664254832682564,-21.41442818758525,-1098.967992770483,-109419.00115159883,-16.038946219293837,-8.393103202278572e36,-111.15057493902049,-18.000368189652075,-6.438037373706302e20,-43.644679732344436,-12.378395398499633,-25.676955572836135,-2.839157636562052,-2.5062785762669888e11,-39.04416946254886,-39.971585949242424,-40.2955349941238,-7.229917807748601,-550.130707535912,-10.409909329747387,-22.70810494167993,-277947.92275245924,-24.060938039857326,-49.78729564897329,-3.0117793254548166,-14.557083507410953,-9.812936736850638e10,-7.163002696225004e6,-1372.5323629476547,-17.141663968456747,-6.2924745904260755,-8.534548079296908,-12.384755259118442,-6.722406521156956,-1.5750612732643643e11,-39.746747764683015,-22.73622444386608,-6.371750770315721,-873.9877814725547,-47.94237456940017,-1.0430475674722826e13,-3.136103888080232,-2320.8045162403964,-62.01013494392884,-9.257072348748435,-204.5372616957362,-42.95540378461234,-23.866128573043333,-1.3103604304177714,-3.6924559774511545,null,-1.4536015411576106e16,-22.219236303605122,-101.12458676089051,-36.36158950186946,-28.117920824089598,-22184.55909358124,-11.487563473724002,-16.194471276344007,-32.60389478945596,-1145.788105881622,-28173.845328324394,-764.5149459767159,-1.8887846958164507e12,-4.161753831557639e8,-6.956903794418324,-80.2714703802986,-5.179930179310301,-19.041677197775837,-4.419778308941997,-1444.9746620446915,-117.1662020096522,-13.887973919405617,-126.32956353140801,-51.85641146897328,-2.460694573837262,-1036.494762351626,-11.477368433880539,-13.170561753686616,-3.770922009289589,-7.271986966152147,-157998.67016508436,-30.142431015220808,-58.40349752587793,-4.77637941289468e43,-10.034217271963122,-7.700139108606825,-8.748767264142254,-11.375165204925686,-3.1718532273117046e9,-1.0809159096697006e8,-33.64955443215274,-7.7558379157508694,-3.3517861135569262,-18.736132870487257,-394.20584719370834,-5.89908609534103,-6.000143871622919e6,-6805.166198559726,-8.738526003446032e7,-5836.690701053704,-7.407533856321554,-26.72114781912688,-23.742832723172537,-1.776493715326034,-3.730169677879171e8,-85.13204736524015,-934.017801473578,-4.474730617842098e16,-20.5959470180023,-12.197261071566167,-3.4180142819756454,-1004.0749242653875,-223.5184926225055,-3.338504948619989e20,-2.789662404966263,-5.507396959751192,-11582.23808857575,-228.77282526922642,-475.73150077195805,-8.192683403020379,-350.3061594270985,-26.238444056109053,-6.022265425463126,-18.507481876473744,-8.898115773188804,-3.480057551804582,-4.035319993308265,-268.693529809655,-163083.77637493084,-113.46726133136718,-324.92131303919285,-43.53390382742012,-2.406346449513668,-6279.061419475895,-175.65408933271002,-32.47764478919217,-230.45992204331583,-24.4385687977509,-1724.531674844833,-1.332773701883383,-10482.623186612147,-7.156615829150931,-10.425641750333584,-2.7781347045075164e9,-112.24929806541346,-469.1569972773937,-11.231073749581443,-140.5421504645141,-5.134472973758596,-1.5221941935696585e11,-16.598746017563656,-17.43928424892444,-223.62124611192877,-35.719937985430306,-1.7836896644262974,-3953.2089677252466,-34.349906989198274,-8.282168382497076,-11.398457914751532,-99.75094927756388,-291.223884320003,-597.1875850409929,-8.331737781469988,-10.268164870489013,-24.50193873295808,-3.739526583649661,-19.925586531773554,-31.094981360872428,-162.8024265763314,-9.504416076836721e46,-244.0526135217995,-8.495851723378195,-9.293305997738535e12,-35.36629096868337,-35.526916092121205,-3.719313198168881,-7.405896444466666,-23639.599154092597,-1.593472600865941e6,-1801.4781561576826,-108318.33253048515,-38.21232429605537,-5165.623902096023,-24.349783446241762,-108.37911720916844,-343.88013698801836,-143.49404887549352,-1555.0413584686537,-18.37270066459114,-23.12324666324011,-12365.672675160607,-4.194669675076765e7,-8.542301806743504,-3.74247514910284,-296919.9049759643,-284.402289942284,-1.198799809177137e23,-10.780992282656875,-8.076381715881175e15,-84081.25069715956,-2.894403552144541,-1578.0979875134349,-5.840387700992504e15,-2.7825999624588005,-25113.724212896115,-33.96413043497479,-9.31541069260316,-1202.8983415596522,-57.19269251383098,-9.767928587339917,-4.039105042555794,-1130.4855167936594,-98.03248562436193,-3440.130080768446,-186.33042175793628,-1.680587675600208,-23359.025137428373,-25.57467687766797,-5.55671615423228,-4.935302241163499e6,-2.928011775533014e11,-5.566466364157829,-225.43146759403533,-4.333458952284847e9,-798.4004206728107,-193.88154324898304,-179.7579757767269,-91.47895922062743,-78.79311749896442,-191.64363150949742,-29.44524991230565,-1.6256979303863345e11,-719.2785731884312,-62.86460883020687,-16.31121818976981,-5.6700841927635315e22,-83.58301357834831,-519.51334375113,-128576.9743535373,-4.9252872440880235,-3019.69434654877,-45.64063039228903,-79.8744110049177,-35.15234549809674,-58082.88640988129,-292.28969473161976,-22.462634592347058,-193.49250514618888,-4027.0552808644898,-6.228563666181147e8,-13.140095330049451,-87.11877235570888,-18.143979332418123,-6.352652770366571,-3.1518300365305874,-7.394826625814562,-209.39805374655063,-51615.50217991413,-4.867166560577957e12,-36.20040363698752,-444716.2113998655,-23.076240121694575,-1287.5713203157252,-349.0695071285675,-70.09554258210349,-2648.6055652712357,-18.510487970148045,-1406.0451584583368,-77196.53214057928,-1.7120366899446775,-176.55798878403027,-8233.405908400633,-30.954037853134533,-22.568287654817162,-1.5555059319983544e6,-16920.36236532131,-112.01369793709618,-42.281366346217055,-225.1738893199656,-75.91922045088872,-17.14312480310676,-1248.0001425272967,-511.4547136123857,-4.238542771819286,-6222.81214074393,-56.47483611019492,-270370.5142396465,-14.406793868110288,-142.70421083355382,-3231.268563381113,-6.573587552079736,-53.42304227018034,-16.621510539916567,-7.056750466174932,-799.7264860042053,-6.773528077105059,-41.67735120277054,-26.985076618905605,-133.41670664566234,-9.974679540500766e7,-14.453373185164057,-543.377256932267,-65.35107340261632,-28.056235696338064,-951.6799210581104,-23.45077674288901,-338603.7672336132,-26.935123224953188,-20.89640270633952,-89.88832806826797,-78.07448824873555,-11.809943121562114,-342.4883273819842,-573.3032134393579,-72.10555605585544,-46.87641865907936,-27271.301428624676,-7.6953945640836485,-7.926802283201923,-11.666162541747717,-1.4596148227514134,-5.960748300593119,-7.704953156241839e6,-33.08662029397555,-19.595405387406505,-91.8993808748722,-270.18041174253574,-5.813656876539852,-26.59842109012942,-117.86589728632505,-1.641774784127499,-15755.390139450585,-2.726965341165654,-20.63575149735148,-7.041900101196889,-1.8162106022118592e55,-343.81854902078356,-4.049810636327951,-24.559943116994315,-9.998631888088825e9,-20.93602281183561,-2.906433305989348e8,-13.817186902728674,-3.0873226883194885e11,-180.9144471148436,-897.2987795677343,-28721.80721803439,-4.545093192065015,-5.471548072801005,-2.629332987436255,-6.826933141806554,-3.300613957807088,-1822.0079201342623,-2.8909730685492535e6,-8.094743197148512,-4.248508078683309,-20.91012207911829,-2.0388279118027044e16,-5.031067704293237,-70.78488529464467,-2.622756504751613,-86178.958859283,-8.493532589780033,-21.31852150960437,-2.9902751069015956,-262204.5630459684,-2.1365579405072945,-24.393601957955376,-5282.66850911718,-27.03349662298129,-39758.29258115494,-3291.564471700823,-3.4438114597552776,-19.839260888635906,-254.18588054379669,-1489.617288846124,-1.1626402301182654e35,-77.7166913438583,-424.235076951394,null,-649.3710893874179,-4.42393082846219e20,-44.08536711461154,-8.861941757433197,-1.47610472054577e16,-23.591210319782007,-4.895279653587698,-47.78895643124662,-130.81267578121995,-76.91995439859154,-193814.41974475968,-11.252388855950626,-3.1221808101047346,-15578.874093171527,-9.749505948970416,-42.92285179625304,-30.643682129426498,-80.4625032817355,-8.029826923842357,-297.26356871278443,-52.22507812207195,-6.559137040197454e20,-5.5150670805162685,-5.155326797200967e23,-13.347656241679188,-3.128748765693387e213,-9.960774687055997,-50.628882737171054,-929.4971210728581,-10.4744827750762,-28.712185811762858,-28387.74396499192,-8.211934568506189,-5.130070833501283e35,-1534.8507865259726,-3.7948784857701474,-1.7691396770496266,-69.16292499078352,-36.082088618778954,-5.106560217789954,-7.514731240400985,-9.9904480823092,-1816.6651515523024,-2.5316256987120242e11,-151.75965089948863,-5.347039032998459,-185.93535476385668,-115.05316694039689,-1.037766236132526e8,-1.1829595361768872,-7.344151278735305,-3.051437933066365e8,-14.135575133184883,-29.021690579288578,-214763.71711463883,-367.3713504736362,-2.948499349407961e12,-3.433366004791983e8,-1.6076582752827153e12,-79498.60568801087,-43.31075658204043,-1.5227917473162216e16,-3.617637302276385e6,-146879.4710804384,-23.49855263359604,-562.9889291197395,-2.318450754062206,-3203.2739379891023,-9.120332007922027,-2943.635159424113,-526.408626512897,-13.082332303495324,-7.0216110329052,-207.87455728258266,-1733.75827980517,-3127.288650241659,-217.80437221317345,-58.84177066500748,-1.9660006847534884e16,-6.681814566174749,-3.888092419866114,-2.2377899445568397,-216156.82099710545,-7.287612237363396,-160.27396187863627,-4.051521070550891,-11.978562450973682,-26.732003476400628,-38.681354961084374,-2.781187290949971,-12.581034477038457,-15189.997055701506,-5.950623407792517e23,-3.3445020549360205,-6.493866800275706,-1.366159451229403e8,-1.957324626318868,-201.2416550958025,-102.60511155377968,-20082.534455145735,-14.1471159350457,-27.740262556031375,-26.464551430772097,-4.053069068644425e7,-3.433985876792944,-45.06786498273329,-8.094484734676724e12,-2.7373733786579386,-3.442818656657562e31,-3.0570688926263476,-14.202494226702907,-19.356536191349747,-38.62613819138739,-8542.02920491365,-17232.74960322114,-27.4613427392354,-102536.88655985883,-29.408027922358748,-1.1801051621150671e8,-5594.84666559186,-205.36427554675933,-75.78208897082547,-1951.834177217692,-41.15669485368343,-4.212015864978922,-131333.99502709645,-15.440170016468835,-6.115623063459205,-7.428295902093203e7,-1293.7790705831226,-4.04664344406346e12,-494.87307315729254,-146799.11780507545,-1.1055481283512802e6,-195.5839846336757,-1.989755128843848e11,-6.232173867243057,-261.833941353351,-6.31804328894559,-54.7405628132403,-183.11045168170165,-24.484013429442342,-6.1897444539830415,-13.646377116805878,-17059.160379162655,-1532.6135487444326,-705.6940213702476,-4.0008531962226606e12,-2610.561538459044,-134213.82737105154,-2.6055453597056258e13,-5.747759910275142e24,-80.8610753939523,-15.98593775532664,-2.9495312742676782,-41.42583914598906,-8.79227774751058,-14745.542553326412,-3081.2402294557805,-28.713136864089204,-24.617370257338788,-7379.9399700298945,-671.1727653599747,-1.7436826880375154e7,-231.99956413815985,-6.387844366743416,-954056.8601202955,-315.04184451967996,-362.40693826452735,-38.403202297640654,-2.6716048822616003e6,-245.36315653954208,-2.824418942046189,-3.433628797938707,-12.553015346639143,-60.84735176063665,-227068.28465135928,-13690.390658392329,-3.6602917784474865e6,-19.172867489038786,-257.6094473581075,-86.42053870703307,-29425.03591195169,-4.30721127997223,-3.6767486178632662,-119908.21184343372,-2.814387089399959,-170.08610202256943,-75.29999514412498,-2.949029738640792e37,-160.99968875663723,-1061.5570987197618,-15.870016038291947,-34.35932923025049,-6420.353315830145,-4.321887634163609,-48.96713521507302,-42633.20214471346,-7.034395736847189,-165323.51691812137,-16.76289557866299,-1.8971457227297661,-338.05698618411196,-17.015163705393828,-6.950359350027886,-591.6704021074055,-20.610618268433992,-52.47219305620256,-5.192798142253367e134,-3.0653612275779887e28,-6.92916138246848e18,-21.187944041309123,-22.558276220669654,-22.369394039382804,-2837.014528659142,-4.502429977396605e6,-8.31332952726882,-16.24128022035769,-7.756603831328829e12,-480.08670055085395,-29.931584244204593,-4.590122859753799,-77.44911408699345,-20.39003972393793,-1961.7423211086384,-2.729143037520756,-1.626338052493502,-91.62844169229058,-36.57804141839861,-97.32612372968677,-223.66330044612837,-385.39422482196176,-117.38519647440141,-13.57765639860818,-1.5055215988295156e20,-10.81861563666614,-1237.204269024498,-123.33109975684381,-79.04427213139977,-4686.357596163467,-3.2956211070851035e13,-57.7716540442223,-2140.5160669413212,-4.450902754424804,-7572.961170397865,-11.346377402479966,-25.937570028690594,-6.0148466782721936e60,-105.91742396855525,-19.643610028817914,-885.0039623296225,-68.35845632005159,null,-11.34404058788385,-9.644812679458235e173,-18.6893663006434,-10.77665369433231,-772.9115830319627,-4.731671101217183e20,-580.0501830084913,-80.2744274357937,-79272.79098863687,-1.890831419982935e11,-21.240709104095075,-1797.0774158182576,-8.618778433679588e10,-14.904536230060105,-2.5690620121694113e149,-67.54216511240816,-3.948082988521723,-4240.000610584332,-9.287375014792033,-204.66068668869383,-1413.461564998188,-1597.205012988025,-37.45985042882947,-242921.6955007116,-4791.952262264276,-530.6568970266516,-19.204564756482355,-2.5496237495512966,-4.526636333130634e31,-8.659639724348756,-3.4347031219331177,-250.98808933023292,-3.024926960469387,-1.1928015004024368e12,-231.84667088990477,-90.6355114288431,-330.3661720387003,-186963.012228264,-35.58812241828555,-253.61737213796897,-3001.149568383744,-9.005374745879456,-1.8719667407177342e6,-20.954209000072375,-15.712925894125421,-109.81341285983711,-27.057405193338234,-10.570143691773325,-20.99407031754503,-9.460699872847099e34,-279.0998828339985,-1.8273316913694413,-792867.8657341546,-1.2805349354956426e7,-6.2524904804473445e6,-1.593413903158538,-5.561071657395653,-7.120709321878548,-21.133493826252217,-12.492757160044281,-1774.579866545387,-8308.22724703049,-8.337956580329828e15,-6.556730860928568,-14.597879695402689,-2725.9390414925424,-71044.37505253767,-4.3486746317018445,-20.378729367408802,-27.547747186649147,-38506.924079220866,-7.653548191987361,-21.534559828032243,-6.5347558574413815,-7.492499219756578,-297.2251087613831,-34.47315995675173,-12790.991563573432,-15.877264697557157,-35.32601702841418,-4.908549489146887e7,-6.229191397429115e39,-16.4984062787183,-113.09154604963837,-32.40510917130822,-8.88713666875183,-289.4375403256586,-77.5770022527209,-253.38518444083147,-16.04627132760177,-3.3675347071601696,-759.6328877805563,-71.19049464459916,-14.751418186805076,-4.0609352063355646e11,-362.1466326734186,-74.28960430807662,-19.97559171352352,-21.132074517466954,-10.681973656491195,-56723.368265170735,-5.526299232917188,-5.698810935799044,-58.776292751242536,-85.24900842054689,-2.8306894972074925,-59185.23506287514,-19.940437627687064,-7580.750284287881,-11.627879276073365,-9.372889042665598,-1.9685292651172573e19,-34.896670713721676,-11.332045668152322,-19.669967615821673,-15.802132203893072,-9.719423752491979,-41.49669000970869,-91.6191551304106,-24.144239353149274,-8.21389224928437,-61.93598566852068,-4.299227712330802e7,-367.4919415536183,-2.5551536216083743,-17.27190597487881,-1.3831491743411354e16,-2.638027994077815,-90.61609292103253,-15.711552203772182,-7.451523266967149,-7383.557124266106,-2.933319873523978e53,-1.9117009032312422e18,-696.9924946368869,-2.2080866420475704,-2024.1237361339854],"x":[-18.17842286380655,-12.846368966774918,-12.70736885031197,-15.157812177891577,-18.717428986003323,-19.695060857369153,-13.029814845023553,-18.633592323630566,-18.28176263874157,-19.21734452623921,-17.463127517504102,-14.411788313678803,-13.419748089494835,-19.973347129135952,-10.783570696681723,-11.794410532914569,-11.281365665662282,-15.88718823185372,-19.2174842356324,-13.711035957427878,-17.467555806316675,-19.390945710498293,-19.322214005868695,-14.500930401818175,-19.105756468740914,-12.593294631299528,-15.060590825212616,-17.500230914758625,-14.984900029713382,-11.320354054118711,-14.85160282883228,-17.284305814316426,-17.54955394975991,-19.475676287219848,-11.793899189511318,-15.169618033394528,-16.677051728873433,-15.981000419199303,-19.31016323329817,-12.904268531305483,-15.837315346704518,-13.3232174052306,-16.07485040854,-17.156782331420725,-14.425815937610027,-17.007143989943835,-10.579051625264178,-13.78030668613152,-10.689434189394884,-16.908515727797525,-16.430361626029807,-14.294664658602601,-14.042880722565645,-13.004957480492612,-16.4551878819589,-12.679585628001277,-14.60177795951915,-17.488979674772672,-11.108782811722598,-13.566846735111781,-11.384888867122562,-17.633988254285875,-14.936594091562284,-14.234888155508973,-12.359535082920392,-10.07714183402545,-14.233390500627443,-19.46005903415141,-16.470232942832837,-11.964840325974073,-17.64717727451609,-10.030084172649925,-12.556457740767568,-10.89021744227532,-12.597085389851744,-19.885448908021036,-11.910876135291026,-14.623915675589709,-19.799800957640578,-16.0602175726099,-11.78036121875376,-11.655833533683333,-16.548639652468832,-16.720398404576592,-11.872585494977361,-14.502142787521324,-13.343748241808644,-18.687200348655907,-16.545466723487724,-10.74334208370476,-10.844249607449497,-16.23816332845143,-14.952468745020177,-14.532159566415812,-16.144262822824334,-12.49147859490198,-13.842845927244905,-15.021721404314441,-12.131229555471645,-16.547405797680934,-18.087067392516154,-19.04398406203963,-13.46594373951871,-14.5140623269337,-18.558547464283016,-19.306196720525424,-19.562968609148367,-17.659250655991535,-15.215086337969987,-16.41205413372278,-15.008367860677392,-11.652381000488521,-17.061968522233467,-11.424083738509292,-18.719813354214022,-18.17195917531968,-15.279667018176697,-19.86237529077673,-10.645640239719246,-17.50274296687702,-16.251391188244103,-12.636655409364941,-17.627856747901397,-10.341340313563151,-19.245690975640702,-13.842472875110051,-15.869882156577862,-11.64032224310921,-17.52956352662059,-17.32131945402053,-17.835237962156594,-18.913274736778053,-15.531872146334216,-19.689164786265536,-17.359354261337735,-11.670011695579156,-10.576905283801366,-19.825690991363082,-17.66260387332202,-13.053287702092613,-19.47412111633668,-19.86337575519922,-19.806113147382295,-13.579361391840026,-18.352770822960768,-17.901032293804516,-11.571194357864945,-19.827845938706638,-10.215751601324712,-14.909146581176175,-16.32408231680404,-18.755560967513304,-11.541216182484506,-12.183516442075565,-17.471531471105365,-19.541523001953603,-14.172818197306828,-16.746962396518402,-12.280628347692906,-12.703111671755021,-13.008218358680114,-14.036814465758757,-19.409225862912585,-19.999161364697706,-13.216306911195247,-12.877976805198283,-13.758302213899716,-10.561880915404267,-17.860874939510403,-19.978977709725072,-13.070577896463796,-18.361063680023268,-19.968970346562113,-17.174081372242654,-10.812278672266446,-15.218441037804082,-17.203662497251052,-17.94796895722754,-18.90108741630479,-14.38532125295572,-17.620245000364022,-18.770537036057647,-12.44903373626962,-11.699387482796894,-11.29495710466334,-10.238487108137658,-14.349370673056557,-19.318782495000725,-12.466813033215526,-13.13366790636772,-14.758112091116649,-12.120782208195253,-19.134553526201625,-14.250962937172435,-17.09128845078591,-14.907417896916094,-10.703256757978423,-10.230230139289446,-12.41766190100402,-17.276700936563778,-11.973096297138833,-15.832868425016697,-18.460248261451685,-12.33470823939917,-15.112448430515252,-16.86329968600252,-14.002100541386866,-10.120982966348802,-19.610979729215515,-12.474130197926296,-15.983270164677908,-13.284971049263037,-19.378836019253235,-10.823835450725133,-13.786471315610715,-13.721642586854802,-13.33310141515794,-15.389705956805242,-19.054668236938966,-13.032399985024721,-18.54609150239755,-19.73378703345077,-15.071711855840022,-12.11594926473622,-10.03151565969721,-11.629623463865686,-11.154056857617443,-17.49382722305205,-14.386222876261934,-10.004447050242007,-17.03936146116323,-18.533184264079374,-15.27574005894801,-11.876693282177007,-16.711618908195433,-17.01499385974874,-10.854281263109053,-16.58213033551032,-14.649562707958442,-12.067050264764775,-16.659428139717782,-13.200250293935948,-12.2029375021946,-15.284200697875194,-16.992392555983457,-19.101415683166355,-15.52582615287635,-10.988485527277707,-14.055615789946946,-19.679581596362482,-17.570605702611882,-12.639374063674182,-15.588572958759542,-13.69220233494707,-11.567361577144075,-11.267443840917897,-17.237374798331317,-14.345959942940423,-11.818707970360245,-12.921322106323137,-13.679279525666546,-15.429001711693962,-12.176109293966672,-17.200506092505382,-10.742163092287525,-18.117518160748517,-11.906643356225866,-19.739894783113677,-17.26295144452878,-16.82105801595378,-12.465224939780914,-17.06977171162116,-18.912027602850387,-13.889274712150876,-18.086978666688253,-17.36780435743832,-15.835516765508276,-10.470097556053869,-16.118555981463267,-13.665062929741376,-10.094344346338968,-16.87494915226099,-15.52485235415676,-11.922235221414056,-18.854892184419615,-10.85380151870736,-14.858790592067217,-12.892694249967933,-16.462862741799057,-14.266781547622085,-19.75363894896599,-16.31819424480367,-11.990799947318528,-18.363510945722435,-14.28818233631266,-18.00416629341036,-14.024077016839511,-17.15935627991205,-14.780828080268538,-14.155857637779622,-16.595411474164795,-15.564742111675082,-12.959454387965806,-14.877314272699188,-13.414716500228273,-17.858236510779953,-13.03306794824577,-19.42327102041307,-10.341184620072035,-12.505318206865661,-16.5373210670331,-16.98952856244173,-15.119042763250938,-13.884839608888244,-15.331321770213549,-12.448227042321525,-13.39228554895979,-11.246489712298091,-10.724259294170245,-15.332358286236158,-13.00766775799575,-15.336759703930387,-10.198895878826315,-19.625713279110848,-11.351568738682314,-15.0811231098944,-17.831171758895394,-18.319719904837484,-17.036731616656823,-19.391275124300126,-12.824176872457304,-10.390893277040323,-13.39471845858129,-10.303674323894104,-17.914701573741713,-15.97743361661427,-13.192561344944869,-16.56132192764877,-14.3176222519462,-17.874458806987693,-12.4420836964476,-10.144025423749055,-13.246325972926718,-19.38854227115073,-12.073529670280392,-11.757986750409202,-13.413660841954137,-19.691225144067865,-18.614961363808543,-12.095616718764546,-13.237707808611244,-12.50824025714499,-10.666662103033547,-12.807728614148976,-13.94200880901086,-11.434715360043441,-12.11996088669595,-15.894172351176138,-18.80876293908552,-11.756060021237554,-19.058238823211845,-13.063925709045233,-13.610407231198455,-16.668261132617253,-15.3584601586906,-19.179735966370504,-11.690179156902056,-11.073013907983402,-13.957532828353848,-10.915125178616442,-19.869388985169508,-11.844658176403248,-11.458153924041754,-17.49883453104921,-10.088698334087676,-19.183018254370147,-12.972555318030082,-19.785859747922768,-13.085770936618456,-14.833729123550567,-13.895660155296394,-14.107795366264773,-14.073827309506079,-16.132546513432324,-11.70577081550148,-11.545036799176545,-12.282621090104032,-18.11995016516536,-10.893140452102507,-12.010302709147552,-11.026019070830602,-14.880439166784203,-11.960321635473285,-11.276088495166244,-18.348978766654465,-11.754999501752202,-19.892221608097778,-16.201171711697768,-13.745156426808133,-19.457472131123367,-14.814342734205114,-16.15630452298005,-14.451408388495558,-19.527616469259577,-16.498646245283744,-12.02263288517935,-12.228620299655798,-16.316666897757823,-19.154674978568988,-14.463876799089192,-16.129072074482345,-17.127482030443655,-18.21384666076323,-17.39670239546992,-11.408289293809954,-16.354310276684135,-14.435084504697457,-12.736126835960313,-10.728921419812153,-16.690088431889755,-16.766765362313777,-15.59862984186135,-12.996012772091397,-12.775449696884312,-18.19140950178867,-11.095791550611443,-13.073970904325156,-11.662671949548269,-14.391950478880393,-18.343047871866972,-13.20594288634814,-14.410783237070486,-18.617752976964116,-12.327626104947312,-11.929276733885866,-14.913535002897301,-19.404305122130914,-18.88641300093133,-16.544070891054545,-14.324386731972519,-14.154184088452395,-16.08279962470678,-15.76676490567009,-19.47132433827396,-19.27008359972178,-11.557596675300928,-13.862535785755304,-16.30882233946689,-14.925730509394073,-16.788096428533617,-15.518925130320758,-11.240034751196173,-17.441806862747033,-19.96088005307135,-12.199918280314229,-15.187074935959487,-18.69713966436445,-10.062731817660671,-17.301634860212715,-16.425089396581143,-16.225820310912972,-17.02723484392886,-18.08987935064296,-11.742517498858218,-11.852272775997058,-11.006059625129785,-10.20565661375936,-18.939651966043673,-10.147237258949719,-11.380079549291127,-19.971743011785033,-14.129520596401164,-17.6400340401181,-19.00918876478413,-16.01513331335741,-18.243498836070767,-12.484188254606071,-15.592819002338036,-17.886399176009363,-19.78772729134839,-15.510986360712844,-14.958203195683431,-16.935548549045517,-15.91123659985419,-13.328599068616446,-18.865724312300422,-14.268712363309488,-12.657507238688348,-16.541696060368125,-19.443062574536132,-13.322459274514191,-18.448672500896162,-15.109167066893754,-16.44455753713831,-14.639105544873898,-18.475599922524733,-12.094042647315879,-16.35073798791233,-19.74433599125296,-11.893575439643032,-17.375093162426666,-14.48312766873395,-19.53862262214361,-10.04417193591495,-11.404886957614526,-17.69160615878971,-15.934434986699994,-12.831599853323501,-15.824524617105196,-13.486145790040005,-15.4093273598079,-14.997270384104024,-10.358482827163352,-12.037177586238943,-17.37756318424016,-19.30722963655032,-12.496844211164884,-13.066272049647107,-18.353349448327542,-18.22023007414653,-11.08639921250381,-19.881394700865048,-18.84728179863281,-13.872998787001961,-19.48650841735121,-12.466993396884812,-13.247768340246118,-15.301982411596384,-17.822322023254774,-16.22508265514532,-17.805923005712128,-17.674939879158398,-15.74830414928339,-17.539221248183075,-18.96095375990825,-19.834692501392126,-14.71472143698943,-17.453990238169126,-11.786765056869402,-16.887492760286243,-16.426883614440467,-13.223475469494483,-19.782726241538665,-13.694667293734344,-15.148319240876827,-19.916918801902458,-12.32335421663185,-16.529959705679435,-10.266140546252966,-18.673725932500204,-10.343704800450963,-11.610898095082664,-18.47799172573228,-12.680381548989184,-12.246185368179663,-12.358678652181773,-14.122741543131006,-15.131870854545959,-15.938523270720577,-19.959787683630214,-10.478512465506522,-18.382373702637516,-10.102521046018914,-13.429716347579417,-14.320375282557436,-11.531065999835361,-16.592898677206826,-11.212463826085049,-14.627102159416115,-14.303147791037444,-15.161186361322503,-16.33331675301929,-15.423841552855052,-15.93863023003706,-16.978081400709858,-19.086304393395192,-17.848465635397414,-10.626647998757523,-11.656477240552313,-14.508192432893603,-10.436696279888736,-11.897510575618695,-18.310116947552267,-10.123935155287548,-10.658187028389305,-13.381072639565296,-15.14985960336801,-15.18651052820561,-11.385937374049107,-15.203444397600482,-10.487174400853972,-15.65505194741209,-16.93426367406581,-16.98438338701487,-10.76873041981009,-14.51540331723086,-11.219839201109313,-11.618881229493798,-12.760683121824133,-12.459032968800429,-12.37557126819626,-17.554052284773686,-11.36487514487997,-10.761905934671345,-12.208442121816452,-13.812808514475776,-17.018403372494863,-19.996220052631827,-15.226749206132075,-12.37736158089788,-15.741840115807182,-16.36301349148348,-18.155988358098078,-16.275210796288153,-18.61552157783827,-16.577404103874972,-12.805033421274828,-18.626643063069736,-12.900582397565742,-18.12160516663113,-19.59027554701858,-15.351957843741939,-13.421344049078009,-17.155515888980716,-10.823711309202618,-18.122917734117816,-11.20069707403401,-12.328950074122808,-12.446304716918345,-12.929155350267525,-17.87616869373224,-18.93508485559926,-14.503930164989441,-14.117048891236374,-19.367324095187143,-13.036503858051901,-10.64574387996048,-16.90160644933083,-16.501699994499855,-12.529483540497807,-12.86367820394618,-16.12679565145369,-15.353286971748723,-15.05758938807311,-19.063181913138042,-13.887393314224452,-11.825021741546921,-10.639714221301467,-10.690099049674831,-15.95110293299998,-11.114168705313553,-11.809350577011624,-13.069882202703516,-19.042302868288477,-16.704149979079297,-11.832980169912716,-10.451402935812997,-10.446323343015608,-17.336077052512504,-10.33335993039757,-10.674306666572553,-19.512727702997235,-17.449910097659412,-17.81258841898539,-18.81681510164679,-16.827300766812133,-14.626868246641124,-11.529031402575264,-14.002380974106297,-11.208760020311125,-18.029269987800607,-15.344319148908578,-19.852113082512545,-14.648564154229975,-10.912245279645134,-16.047110593118227,-10.942328325764858,-16.59114457871203,-15.190935528051776,-11.03465849881662,-15.056996044073106,-12.62321574645573,-10.438298193341103,-15.38547923926343,-15.986401293272316,-19.681316380789994,-19.22485777945465,-12.707423454485358,-17.604663736260346,-11.320222958631748,-12.99085907096072,-11.219250868098579,-13.219239614897662,-13.0700552987198,-17.05740363630927,-10.001947947974175,-15.623569047282494,-18.169065499092984,-17.549297380946282,-12.931654653595213,-13.960762964084463,-16.606720067351937,-17.61623324260791,-11.355485656757644,-12.469602207306316,-12.595691312689716,-10.526624728237406,-15.837582478238337,-17.503286081949085,-17.691228425964812,-17.352916259083727,-10.355983989604498,-14.952444102419019,-18.62209034083429,-11.505905850239127,-14.382774888205876,-18.56187092088215,-10.113672330654266,-17.431815309693977,-14.285437693612113,-13.12054138466581,-10.2063991987888,-13.012891918846691,-14.698478414686566,-16.302441184285566,-18.045927892930447,-14.926028850124293,-15.61590582892503,-13.802131902675864,-13.616989716663602,-17.184981392195414,-16.841434630005246,-18.511101701037557,-15.257836929509438,-12.546325365545982,-19.58039150449397,-19.315805694596946,-16.433879397047036,-19.934423578540176,-12.317191426969922,-12.676753329874746,-19.860329483264735,-16.094256927020993,-11.902659955636052,-11.776428905572686,-10.422616944585766,-14.173619769063336,-10.102794940484728,-13.183270016501634,-17.646461835718036,-18.95321632667349,-13.068307360419208,-10.557533592619883,-15.07128615401358,-13.881712687588266,-14.480317311511005,-17.07138051499084,-10.48104944894268,-16.39169473112772,-16.37317260674312,-13.066150388605243,-13.860606884641822,-18.286320011185474,-15.691708243797,-13.57285603305456,-16.203452227661614,-18.826433312782164,-14.00248892671058,-16.184806913981873,-12.364580590961946,-16.956221843088755,-18.889842049847914,-12.952852697650815,-11.263344004496002,-19.833925014444127,-15.464958050207917,-13.563052920233396,-19.054319462966358,-16.813962539926706,-14.95088773008848,-11.183495125772204,-10.81210395694363,-10.575580310892976,-13.4294328035846,-12.66467823173626,-16.789058751483882,-12.922137306918124,-14.113181092931733,-18.854030020855937,-15.411596005722446,-16.959809292928508,-11.262266201537408,-11.01077875504634,-13.190237435138668,-13.822266938785958,-11.50591329653828,-10.334382273693887,-15.843101092217974,-13.996878669332247,-15.480549973651755,-16.49516617416586,-11.97802335236942,-16.003872577351846,-12.939608997939194,-17.977940833881178,-15.331340817603314,-16.514759498495565,-16.908485759015992,-18.749516896718315,-18.640009878083397,-15.451408204403037,-10.956050310699467,-17.350342644452056,-17.75564580205868,-12.142278314682509,-14.410626731650575,-14.2170793008104,-19.308928662161577,-16.767230793032677,-14.643942931546059,-16.042936350775506,-19.69095876860141,-17.169718397524807,-18.245208332226014,-18.558666479592006,-12.974363648364644,-10.084770549667308,-11.137712116421227,-16.543523209889734,-19.60589149285419,-13.952359465752721,-15.121862530762034,-14.403544773093351,-14.283646443520091,-17.207975329961307,-11.615034806739041,-10.20071346858641,-15.075797771801318,-17.459439250273146,-14.663057971607309,-12.58613056747295,-16.920499050072436,-13.682187481310702,-17.575514993589536,-12.17588002830767,-10.458350873227907,-10.766618790839077,-18.161740381792733,-13.127579127290465,-17.689523921227224,-16.195441723892362,-12.296884650384749,-19.996992600997054,-10.949187822341276,-19.598514007829177,-11.003468590074203,-16.12151153187631,-16.918010330199934,-14.088828540021396,-10.572072676395283,-16.32606609538231,-16.26720910688832,-18.048440484399997,-12.691937002574779,-12.827493594868006,-13.254751786412013,-14.342351530478574,-12.680888151044494,-17.556585198500365,-14.244398359561934,-16.148967058349214,-19.4169880716684,-15.140154607694887,-12.430105738789353,-11.033192133264578,-19.80970901751174,-17.850136608469434,-18.007092699878374,-14.685809532317283,-16.21529957809016,-15.68384863376675,-16.701153706417607,-15.795512166109031,-17.811698740043504,-16.648101747363576,-13.994450828908384,-17.975598068724835,-14.428106258096046,-17.136394833409113,-19.5585335597994,-13.120623422171537,-16.11474648339285,-12.214764662647724,-10.238150658970131,-19.307959537186253,-10.471713902011881,-18.91212546025153,-17.17618673076883,-17.547904237557823,-19.506026282564836,-12.226501170242837,-12.45804532204688,-12.678204339208964,-18.025183052287552,-16.61304299369068,-17.28682449021326,-12.217442171676531,-14.263757446594507,-16.291604472364597,-12.16295233631434,-13.119441160988295,-15.570359158600905,-17.07873708160298,-12.950500702266627,-11.305404575379852,-19.859708912524564,-10.426053683935715,-19.619521692369855,-11.414013394679408,-11.8360164915424,-12.585220758706093,-10.443628800983191,-16.461367060545086,-19.893145507200096,-17.304491066631936,-10.97505820353729,-13.134137682550563,-13.48529364716573,-13.2558766994055,-12.040799109490468,-10.787418898939409,-16.081707478428203,-11.55100230442622,-14.991067508955002,-16.575754099634747,-14.588734786727297,-13.695447763022791,-12.65486353127928,-15.96991527641694,-10.727408082843189,-13.723922374723418,-13.249123447798208,-18.263676035450402,-19.04693070317316,-15.188553706314721,-17.382749599626777,-11.93493202908506,-18.041123104109783,-12.692925384141935,-15.771668896552029,-15.81205293313757,-18.298142263192457,-12.553291297029542,-12.352491394457717,-16.42411250147719,-14.205992741952727,-10.416470834701583,-15.813956619571648,-14.261526891897457,-16.743675384256036,-15.56783025128756,-12.067976543564543,-11.294415099862773,-13.990535684414976,-15.270139212615025,-13.390476082330409,-18.161245835618026,-19.695080636467512,-10.555412564651833,-16.834371339260784,-15.109588045213568,-17.809531042020893,-15.560406218233231,-14.710222265790955,-15.911761555286034,-17.99360277249265,-13.154574524450254,-17.445513812091114,-12.993371857368716,-10.849896788542736,-18.633191952532954,-14.835052868115019,-14.918435125182592,-16.651564112228918,-19.346014165696886,-18.50793150742836,-15.278962661971889,-11.151694465011575,-14.58701735940603,-15.180179303064083,-10.134796645381005,-16.231367365982344,-11.87641662736705,-10.6685485639829,-17.24117215560029,-13.330037023888773,-12.717130059223472,-17.628864664269397,-11.48339121171663,-19.13706836781697],"mu":[-6.256114154373609,-4.464464924919353,-7.08646626304672,-8.126507481416565,-2.9032459386941833,-9.772978904037855,-0.4828180434526175,-1.5364923297962574,-4.980699049599866,-3.385238394104475,-7.614135599663621,-1.3628840135151887,-3.3574245526269753,-0.11909349179255901,-1.2638515454289045,-3.7458964297871566,-3.441904203435324,-9.484168613660637,-4.711300195377932,-9.215642507598183,-8.241949272700905,-9.50042773417162,-4.06614351001836,-6.6730518083315316,-0.9449103280092719,-4.766264616462781,-0.5043523177160059,-9.315156539814783,-5.808284909355265,-6.459304353181663,-0.19616264873852485,-2.058962775904236,-2.5720072540746686,-0.6715810609115103,-6.28377862913532,-0.44887988836507464,-9.437556225031996,-8.788005843602754,-4.044672325765795,-4.42955588590735,-0.9421547149437881,-3.413001807396465,-2.871735475960837,-8.02405099958023,-0.8917154654783177,-8.005438427854191,-4.837915484365505,-1.5522567606721682,-6.0667389891908226,-7.176839044823192,-5.77893324120444,-2.8631738061318823,-3.657568590167537,-1.6548050104639245,-6.882985301754361,-5.715528252858302,-0.9500682440304686,-4.695757290894775,-7.941353409768759,-1.0453333625349082,-9.82244730896494,-5.836074906711223,-0.289042231304244,-7.862136494226588,-0.10550803772207962,-7.574593010552519,-5.329593048620705,-9.378563868233885,-2.883542997812998,-1.6770967671944148,-3.922999720220861,-7.846642759842739,-3.2908157704472263,-1.0775572264319777,-7.899696861942205,-4.997929401100447,-1.3598478716437667,-6.6291039718945015,-1.3761111511252677,-8.197315911517185,-6.08744589022685,-9.565283793385928,-5.212495075416763,-5.537745371191242,-4.829753800095027,-6.5444295460178115,-9.539803776929663,-5.020930424237518,-0.5515751256547174,-9.758602410222522,-5.4678097279983255,-5.677768889018113,-3.952709599159927,-7.795855686327322,-6.86421862450326,-0.9701894541093936,-1.5533039892409528,-5.82412435679224,-7.637207963731452,-0.7219523637373104,-8.66461941828031,-7.433892107295719,-0.5080152490497247,-1.7447329560149383,-1.5490021350514782,-2.3905825236203793,-5.688671743761473,-2.9612850124305212,-0.8280326674465766,-2.8111372650166944,-5.519891704505266,-1.4983747350312182,-0.19691912219615304,-1.3198420068953554,-9.451307746602726,-4.470596482726941,-9.095873688926945,-2.4957552796581406,-3.8299516118275245,-0.6776424008778026,-4.514277483301492,-4.631889302858032,-0.7494782552275048,-2.1162094195819314,-1.0802732745878618,-3.579355037481158,-4.857648403831087,-8.679093952416066,-8.132514496020448,-8.95540687192419,-5.898932478428163,-6.6803439497043415,-9.570677692174737,-8.005848806866442,-0.6377107120754499,-5.627004440211274,-0.6029946727016267,-2.088479393541345,-4.61724429443845,-8.175180082419203,-8.01040351399799,-8.558936182266079,-0.7140230534970438,-5.282681350746595,-9.863888163401814,-4.009270591364345,-8.634920929504498,-9.999045401262794,-6.217833150743193,-5.92222497456045,-9.75534849621841,-8.113628771228601,-2.1928798200129695,-7.5406220547005915,-8.997679601907846,-5.478118291735099,-7.913643110783212,-3.8101226850784764,-7.2311143212747675,-8.431768346287251,-5.882502416564197,-2.8099915701043288,-7.9623357689833485,-9.63211410799423,-1.6842935525671,-1.8295555293998733,-0.511205660709515,-0.49797498418683084,-6.407644910569714,-9.08773614122125,-8.295112006844738,-3.4679556239133746,-5.310800171032286,-5.875451664882501,-7.773234240288984,-1.0232286473505448,-7.814783995889567,-8.646615837803823,-7.751440261874634,-8.666506737254906,-4.5703740886249555,-4.952232509361121,-8.099524689773855,-8.091318479199277,-4.052251867219452,-5.1573098015767105,-5.091493047272473,-5.828775604094791,-6.644694000517822,-4.743645231553337,-1.9941220949014915,-7.95174617161681,-0.1672245420339591,-2.9494255979640016,-9.3526533409244,-5.5741610125356384,-0.06307306388027678,-9.112382361237085,-2.722620818708843,-0.16867663804143396,-8.583756350221641,-3.0149122424492214,-1.977680208399717,-7.48911652301524,-3.447846269482444,-9.522875899455725,-3.4195558818518323,-9.963223456238756,-7.077118943232308,-5.404565382501609,-4.683129061183317,-3.216583429304387,-1.1700885666413363,-1.0655283080196432,-8.033015084010884,-4.3786155781848635,-5.060447803688803,-9.198677007472911,-8.05058516781468,-3.043665350599698,-6.332433122531038,-0.25866482574780747,-4.610359368808603,-2.1051464779716644,-3.1704930616009963,-3.268925509763414,-6.9156382686642015,-9.05560278695015,-5.314922560290873,-6.5287566615326735,-6.341706149709774,-6.349237158191272,-1.5707783878037018,-0.6890111426803047,-4.186719266905272,-8.743554872584491,-4.729760049342957,-4.10655230135972,-8.238295164490335,-7.80310099292339,-0.4581352944536743,-9.847547365836192,-7.719400287208382,-2.6908251273104455,-3.157005952427412,-3.4359008642201494,-5.895879570665348,-4.773483320662972,-7.530879069509249,-4.467586080670014,-0.6870111839697768,-7.653141718264312,-1.0704753078140294,-9.517813848257198,-8.01646882024243,-6.588995031381559,-6.731009369455682,-6.524429460971435,-6.547329896428369,-3.9926580069200535,-3.4987022313659155,-7.537627506422357,-7.362590150648511,-5.239804401765678,-7.5815964963559646,-6.344337881906064,-6.241610114305645,-3.412805238483967,-6.484464736248103,-7.151631960527625,-7.545755138320973,-5.843976992703137,-1.4419862373587211,-9.000611770136015,-2.4369962598404116,-1.6840908835016255,-2.677081658448066,-9.2058388053805,-9.70740372809406,-4.751899928244918,-0.16622501718264848,-6.427993686775038,-1.9527324430888426,-7.785609518993446,-4.085150469734629,-1.4785413421415106,-2.7865688321812843,-7.09707608670983,-7.202172885665998,-1.0791666170808978,-1.4322537765253163,-6.0348331153620975,-4.031281746591084,-6.750928694666269,-4.762058321224045,-3.9122847229769886,-6.605548238661932,-6.802618449282818,-7.752746878804335,-2.877416749474515,-4.215371336245051,-8.379058301374293,-0.4391732016512462,-6.209127030083874,-9.227328060205389,-2.8923072981844355,-5.5766079612697395,-8.523273814903526,-7.926206046882962,-5.682889052821974,-0.823533979246287,-1.7986140779820214,-0.4828857823988053,-2.8348289104309354,-4.002611973389902,-5.323489510235932,-2.853984579952571,-5.8190429036718,-2.8241126242733983,-9.258955578926368,-4.379930227497139,-5.6784113167521655,-8.05302237568943,-7.021312839318174,-4.6948273630584865,-6.863409012822704,-2.041083288417056,-2.670724757654228,-1.7483728247433294,-6.265183654797404,-5.644336745401435,-6.119545147388172,-2.4803450766546953,-7.674799763550788,-3.1744862483349223,-8.494796997726471,-8.695804733179253,-2.1269529896702766,-0.13549932021962086,-6.188250090121425,-9.664680084762537,-3.407572193754036,-1.5735124285360702,-2.9557184672173364,-7.361231146740241,-4.803024806193832,-9.151978180819125,-6.903820325660979,-0.5671810380672748,-2.922209861387288,-1.7851637679809995,-2.0839403251077226,-8.69185162330468,-6.982177080746135,-3.038790123112891,-8.177057494887201,-6.3203397713390235,-6.0562754035243715,-0.33111906345163256,-6.902071791907412,-2.252499454012886,-1.5471244760178537,-9.835439830763455,-1.6553142207072313,-0.40606492275357287,-4.746790976780211,-6.308010859756168,-2.6172378784835493,-9.052962025756255,-9.641683065708357,-2.0619324408497786,-3.4564328464125804,-3.2334559321932366,-2.566106189318358,-2.0057241838942197,-4.07236813142005,-1.2237482266947897,-8.164726467441623,-9.856168968557332,-2.574148548449593,-3.9496780895777306,-0.05540500815248928,-0.004846301075696058,-6.808746933521896,-9.95122847863587,-7.021967183412698,-2.2607700599357106,-8.823129996950192,-4.732745711617003,-7.7664822444859976,-2.705375013081739,-0.351457062380518,-1.6595591425173861,-9.905463122538594,-2.728497968423391,-6.791665394206845,-8.085427033867516,-1.6027314185777675,-2.7925679472704057,-9.926448882407087,-4.479949745903875,-6.902420686568984,-5.818126354905273,-3.0803332494466185,-2.5686935509562714,-6.989276774414559,-2.336133301200185,-4.39747330593849,-6.3636507397205815,-1.995183369070288,-4.377556274392386,-1.365986559864436,-0.2223808583303022,-3.5825555181858215,-3.7066345800158906,-6.700439104193614,-8.709990367606109,-8.40205800142585,-3.1325317961581334,-6.658393600828876,-9.460449628507746,-5.8982986108673945,-9.295552890310383,-7.494563858488035,-5.597804590128654,-1.216543817773581,-6.050021410676938,-1.2874089087272944,-7.080051272895334,-3.5260111964694985,-8.965975045729497,-1.0610519438356203,-0.37391170037781585,-8.140118494120776,-8.760868378053793,-1.6757954973332034,-9.31747821981056,-7.502800825782585,-4.3893695254863285,-3.4246830233847048,-8.061380055818034,-9.869708336798762,-0.3593326771373695,-0.18832985878393993,-5.49181117811589,-9.319651469619094,-3.6268069892588195,-0.42578871477428226,-9.57671630864159,-1.589160723890204,-2.464743710124342,-4.491916075821529,-6.387512356448579,-2.1424114841130892,-4.243187981768197,-4.272437242279297,-4.915911906341403,-4.700303371736998,-0.47023718229906697,-3.5236308831156116,-7.506685850121784,-3.338806580096496,-9.659006869892142,-3.097586987492389,-3.292157595426044,-1.6248418123305686,-0.2941828854981865,-2.7106409313856883,-1.7073422146196848,-8.823401316464707,-0.011607727121780709,-0.25290531710425057,-5.132868793085321,-4.9617970792820625,-8.56575269787334,-4.62046491101299,-5.401310688718446,-6.061148752547362,-4.524535549755438,-2.644507610970912,-4.454522407765444,-1.7401256899211481,-2.4522690047991236,-8.413072917292219,-9.100772496498301,-9.744338820488057,-3.591293570984444,-2.6231887761548256,-0.731796873099464,-7.297812160270607,-1.684561968210414,-2.8682198291993366,-6.542929383895215,-2.488253539373335,-1.429955309311921,-2.7527791117774214,-8.707595504300711,-0.7832005496458683,-9.105459083443531,-9.30475106992124,-0.9980130905477136,-1.7868001246134058,-8.935113157160044,-0.2574944793675549,-1.2985919625067388,-8.454238003271666,-1.25823768940857,-2.013930947016449,-5.1595929769528315,-5.057512512880109,-6.260357207731692,-2.31804469233422,-3.9991914776558257,-6.7165570061963535,-1.0229228918409894,-9.264682660042233,-0.17530760332167272,-2.3954017091204083,-8.59402208618009,-5.870775815594522,-1.8356652220797542,-0.6786891910611148,-7.588021692918998,-4.930700509274619,-7.012771610243254,-3.9282465473179706,-4.682577862329753,-1.4914681232721305,-9.627449464036921,-4.211425929796158,-7.3279175163921595,-3.0982801375362357,-5.093577576128747,-1.5717519271777602,-1.5759182615699752,-5.440156676004331,-1.18310120362632,-1.8536280000321503,-3.3570295106418624,-0.2604500341039895,-7.086236902701197,-2.1828431439535767,-7.3009942823004685,-9.000929523629662,-0.9373460869800487,-3.179908470810906,-0.867727961414928,-9.999074239127825,-2.245098843930331,-9.70733221216504,-8.574151901826736,-6.546336132050188,-7.4708491602138105,-1.1200043267632043,-4.886060439600715,-1.9602681525717736,-2.0723440886535194,-7.640152366661937,-3.314966613033352,-9.242089837029994,-8.750944871478236,-1.2390877204968431,-7.483382456907557,-0.5402625945477535,-5.318767683823138,-1.3520733804037555,-8.84754706576119,-6.415779540843813,-9.591999916776954,-8.435175547133857,-6.848278087274782,-9.373869103273446,-7.512832489909853,-1.6950999267602618,-3.1710038045928,-0.6360477219169636,-2.489935427052057,-3.3676957349766146,-5.510395903736731,-9.874943346284027,-2.749200121633355,-6.1673633649694874,-3.3118348924799434,-1.502290323266371,-4.876849281982139,-6.628777167624125,-7.521374541213401,-3.9573834214646353,-6.101206964409491,-0.27258479862505514,-7.264947573210576,-3.7202296037406946,-8.44911166850675,-2.8056450516569797,-7.180647245528384,-4.055697700129562,-8.992638549038203,-0.3373974860260809,-1.8992947021749784,-6.291291264983303,-3.3313155127225524,-8.396137566862771,-9.715446419952267,-4.251113492748095,-1.2292579228943845,-7.387696991440722,-3.3232254431671904,-6.802580519407703,-2.054374181309826,-7.274962889532244,-0.4228261814545653,-8.981590570932683,-4.053358228914583,-7.033353649670047,-9.980187528746692,-9.087800804342503,-8.520907027180005,-8.957968871483937,-4.816171084805663,-8.70558346385262,-5.6711294703514525,-7.367975537521518,-9.077456073263834,-6.6070957822349,-8.15824549184726,-0.3826525320488239,-1.9022689336765253,-1.5793332208363164,-9.892116477590049,-2.504847441059135,-5.857912066309834,-8.659344099634351,-9.274984400217537,-3.9109755164891924,-6.585358927720368,-5.984496499107241,-1.436893670123005,-0.0518015914165848,-5.136564333094298,-4.6354965505323875,-4.364087587805637,-3.703169967977953,-6.733659801118086,-5.310524472610023,-2.076497444334744,-9.48146245813232,-9.557905511714356,-0.3462242273101457,-1.67734639301933,-9.264871095451344,-4.406086762042869,-7.579687603001977,-1.2977537636433367,-7.566827809630845,-0.7163851180549408,-5.7662495372966465,-0.690057863239939,-5.100356602452544,-7.441874922202381,-9.648464583059848,-3.7593770653776737,-3.3821718467072315,-9.415204169969414,-2.261692095884029,-8.713411699352955,-5.517995944372811,-8.594468923064685,-8.358776974416743,-5.31893707968468,-8.299571236273557,-1.4328594777381842,-4.571936481742429,-7.160248517164369,-2.0072820472678776,-1.269216445741097,-0.47015633502279774,-6.907146952910126,-6.218158428947211,-4.44637964536642,-8.36379482769897,-4.577609362071016,-5.53640367156566,-3.8306611136541435,-3.869009157196861,-4.711949901708108,-5.726794832981077,-4.774370741289138,-2.542126806265965,-4.869673717105696,-2.8987459533239313,-6.71138164742792,-9.371233674871107,-8.252290323848499,-5.305874775319648,-3.759090767485491,-4.277655136770662,-8.410394183854752,-9.139783251193613,-5.688157937356317,-9.127465381095138,-2.1967983753372833,-2.595747796454293,-0.23721035406444102,-5.655091376462531,-4.594236614391789,-2.938801749052995,-8.281738172169016,-7.819514138472776,-5.1983090159041545,-5.5609391901092735,-5.642539586767031,-3.6194103440127168,-1.4276275598531196,-7.621440943568707,-9.464545009325889,-0.4646445180101355,-2.7625346449711685,-5.710149242926237,-8.342584754684284,-9.47109208913734,-3.925323609971476,-5.687062305038657,-4.533079352287064,-9.435810563314108,-7.669047229240402,-9.083171137496484,-3.6818377116081247,-0.045713772721636126,-3.6776985380893445,-0.9457598388256283,-2.072802693427187,-3.466998560983805,-4.142768865322908,-4.237621669893739,-7.873857320825202,-6.1560963274582186,-6.9057590081703735,-7.971164521030463,-0.35724076410283967,-5.2263118016800085,-0.06821027227102983,-8.58060621780988,-9.24262899648628,-3.2257405645875448,-6.426091716778622,-0.2764003747245414,-9.70982833734254,-6.311646960357216,-7.133339713066345,-0.0007602073582058111,-3.4927040529357223,-4.804858090508817,-8.571431343659295,-2.185525136223061,-0.27460808810779724,-7.555364574548782,-2.8281027343442555,-4.978455250874536,-3.626580538022499,-4.349105616067397,-0.6790741362988983,-1.967439834616267,-1.1392276519007205,-3.826528634457258,-8.499775612911485,-5.50513180453744,-9.457251474390718,-5.049054312414787,-5.704654852945992,-7.577092296398808,-8.124029858117222,-6.635754200329346,-4.455620791877921,-1.5967145945281236,-1.1650218467878504,-6.7749676732755,-2.216383240020292,-7.00978914093763,-9.721527340930766,-0.3573779799383381,-5.5586717641939964,-7.046556022604113,-5.549338348440321,-7.5013382414494,-1.9543876089988732,-5.419005313124683,-1.3285622384369278,-3.2176470207140606,-1.27235425046478,-4.0595609428706965,-3.876913036804923,-6.354161248457151,-1.284878508465943,-8.601484732116463,-8.487622670359727,-5.538657280077408,-5.529761856045024,-8.70331245396211,-6.322923687399733,-1.392615708322782,-0.7018939487189813,-4.858729353550921,-4.860240158694236,-6.396315738907838,-2.392073302949387,-8.369653640591306,-4.944014437948512,-0.37910732900561905,-9.646955803005675,-1.6159909173915055,-5.706182271966207,-9.327902701217175,-1.2763135143918247,-7.782198635988378,-4.373659252927997,-1.238473577281911,-3.7332597516044697,-7.381779228472287,-8.228237744466469,-5.028467616010925,-3.637650296590098,-5.698864310943739,-2.3574943317315045,-5.5881830437873266,-0.3918191318373454,-6.70155820055262,-1.0562354008409347,-4.773015468014288,-4.075766754987966,-5.682536814637931,-2.3005310073716423,-8.080960028142702,-1.2331186147956674,-7.25882082330874,-6.32528714186013,-7.336528833399569,-8.86942246672203,-1.1174903473882236,-7.637364838704008,-0.9580392242323854,-3.4234673579022967,-4.9732395649841425,-6.170328871191817,-8.414342098563829,-4.550187625787463,-5.121202246839458,-5.081542959323267,-1.5979525710151332,-4.756207788741785,-8.97835531860455,-3.7009750796016094,-2.5073762923599974,-3.403929752924628,-6.972553209115002,-2.0159470000188984,-4.003369039798754,-0.12135684580732553,-1.0576361303861703,-3.878346324050659,-5.12713760181196,-0.6275507610514675,-0.5856946900289572,-1.949290444279388,-9.944578156014597,-1.6394997428929448,-3.1013286191739042,-4.998011653911312,-1.0484728293383005,-3.923216840535768,-0.7296204559343966,-7.225527467204252,-8.347643565637057,-7.017449505846695,-0.4960378522360265,-3.4288810356615795,-2.4362590626417835,-5.024257621368031,-8.456392880778436,-6.6193231387760125,-9.368108537523307,-3.0380251327603247,-7.8533654112656865,-3.2279411361051524,-7.134402170467888,-6.33706772973075,-6.804925600333687,-1.9720871322231681,-4.303582502281163,-6.948242119016992,-8.386585764669846,-8.932243643234044,-1.2763291228600893,-3.391509020265804,-5.471443991926903,-3.535575775463784,-5.567371029904842,-2.4723095093649228,-0.929086093418996,-8.78514485063376,-6.26753476678646,-2.0161374585314373,-1.425507961746284,-7.072518529022769,-3.700975991290789,-5.82566247367756,-3.191524926105458,-2.380870621201352,-1.8774662486981764,-7.6697287554604205,-6.918672754225881,-8.885054014253926,-2.829117220880919,-0.18740370142874552,-0.3163628276228714,-8.347174006047887,-4.090116348660688,-4.662720985970948,-1.3736845406898701,-9.131044264190342,-5.326942233352736,-3.1963695981465667,-6.3610330121824195,-4.593653258630626,-5.6077632747946655,-4.827968570024403,-1.7800287588829167,-7.3131213233395265,-3.802603552435282,-2.3661867072962894,-6.584883059997817,-7.825523321511878,-4.551212016581561,-2.604483428055897,-6.966426318225154,-8.925232973083832,-0.8033741128448835,-6.519068034380052,-5.102985844200645,-3.7765406067336382,-1.9230745747699562,-0.5523977873433039,-5.436778831735736,-2.8763540037567137,-5.530747815970825,-1.8968968980037482,-6.714318538407036,-0.5912165659972457,-4.048318767855859,-2.235321179983636,-2.7885866275039928,-8.220680869286376,-2.6293439144392328,-5.757990258105561,-6.677025517730177,-9.936705198042294,-6.764353331814115,-1.8351906370881133,-9.005123668177955,-1.877496745956515,-9.312208696495016,-1.9207065212241958,-8.771043260047575,-9.288383490095267,-1.8245198910724358,-7.332510670130128,-8.641584330110623,-2.4333937500945435,-7.608339257576269,-6.7690606760242344,-5.711732557586191,-1.1662780595347222,-8.622019560506276,-5.566836302996463,-9.599524381637094,-9.750529787485068,-2.5835694072515003,-3.721099754123325,-2.982236594243417,-1.6527168417490823,-2.69095691259132,-3.887629340836072,-2.9976606002302253,-1.0346652270206125,-6.566832513923313,-9.966642575204947,-1.4248494207829476,-2.7692238528471314,-7.5413707358874715,-1.519104458361673,-2.4142584511553,-5.696306916242118,-5.2605735537945915,-2.6281495879380445,-7.740040155316277,-7.556120215563375,-1.0829727609108475,-6.173887514258764,-1.491548313119473,-9.966238489415836,-8.849010881202021],"beta":[2.3927859709566768,2.88482070539559,1.778578841159295,1.2749835626048733,4.220436909604533,2.8823371224380203,0.1095888653456023,4.756407153222043,3.806829901272273,1.6846053678231965,1.0681866845796872,4.270504917887921,3.9230405242981914,1.1827460952932678,2.831900028560548,0.01606557362134553,1.3859052624022405,4.552113516186527,2.7860603003977866,1.5792878046149128,1.4656980882978698,4.6720571947760705,3.0614653838344195,2.7873455281916915,0.039906985627333746,4.032547921832789,1.0541481979166156,4.741226263640964,3.731490229924982,0.40241439098457676,0.8606569349453019,1.2547340963513554,1.3687680379189704,1.2746493833961792,0.8363775726795175,1.0048460350290223,4.26118315823909,0.05588398373139514,3.1265217888314787,0.34502843983485687,1.9840637787713022,3.576980652874211,4.232995228617557,1.4419838298779564,4.953851535254545,2.5718392825038325,1.1523133250325301,2.02153985914318,3.109221161448492,4.806174141285107,0.5672521372486228,4.712999777361436,2.728787782279759,2.532813545021443,0.13986495866695425,2.874934132165844,4.053128932965693,4.659636730852396,1.1048676739027508,3.5405048341176384,2.010650338490796,1.7676991102439021,0.551952565366467,4.7322577391607,4.741840039748758,1.4402838657310624,4.818467413296565,3.3057146704854414,0.5576808779537823,2.2861387588080273,0.14488376327002728,1.700908216792686,0.5845513701884686,2.87588876359113,1.494838634784711,3.7292747321463815,2.1637306786688084,4.589534777250518,0.1529856876162805,4.211723236498957,1.1915691018119712,1.9786293869656668,0.30098814310513755,2.6308945051634938,4.322716391004741,0.35189698984752105,2.9621353665643246,4.943196111844196,0.6043547553058204,2.0637662180317218,3.4017622310284623,4.679385999650561,0.8819217971278281,0.6427956219235453,0.3091743806985692,1.5308497599452364,4.461190017866777,4.769170309357903,3.6635633892273143,4.1296272092959345,1.6891903778079254,3.16293275189639,2.1318449164516906,0.8075150717693425,1.055448564717647,4.307709242435261,1.8998838156776043,1.595607681239003,2.5074015213235326,2.5540748292641657,3.826951126049496,2.515307463582314,2.589947305968056,4.494340647778911,1.2372846931517512,3.2803979776063796,4.78159104820886,3.6822061999768962,3.492983241478563,3.054077600011973,2.422961264609149,2.9749386659138155,2.6327098191490963,3.437584631074566,1.5142596886333481,4.140258077370733,1.0219657371743829,0.3633928710560075,2.090468819408924,2.598898016088479,3.6672522339548754,4.767892911322837,1.8707935292815048,3.268519707690899,3.043353661930345,4.219978648923137,2.089863552901594,4.183332737292517,4.853169703296962,1.3119633288963006,0.9781761127391952,1.693308299198858,3.476386777009796,3.91992653587518,0.3340270039633386,0.41663678630287415,2.263356460428465,4.472497244928201,4.363485264993305,3.6277330864102564,4.376165367998536,1.8987899522719176,4.093599898657345,2.3105322232308523,0.6921554828380194,1.9827068169456519,4.109785018219567,1.8691093170669482,0.4771703965066243,3.4747107847785,4.936335723658759,1.3056029918800816,4.269290661630012,2.1032520977782196,1.789136508941166,1.5464468016230937,1.5439149935358387,4.637352373452811,2.1658988176804805,4.681451316870612,2.844934582015499,1.5883012905362437,3.706740657235015,1.2413419746006493,4.6843089726308875,3.791475638758227,1.4363158255304431,2.3331656566018086,2.898663922610626,0.4881133357429912,0.3043355103871914,4.759911049560161,2.1235892206421747,3.27649949119176,0.849815722462105,3.0065751566719436,0.5180543453966946,4.464828305294743,1.1383766586113653,2.903604957539383,4.292091133983799,4.047426053467047,2.5163340512129615,0.5589452969281983,2.1635001130020806,3.56439322139396,0.05517671667628399,2.587811923792515,2.779945192777087,2.4257155138653563,3.4315726806550395,3.4044976493161663,0.0864433691837152,2.6739138050017344,1.5382763650206221,0.18870513524123722,4.700622357195522,0.4586330132767269,0.2765541702092833,0.8147180968352385,1.3151008540685727,1.2079585546663851,2.6475451588556007,1.2822771613890693,4.086701776093849,3.664959140585281,1.4664109451203244,0.13512309720676186,3.0441720428460783,1.347020040336131,1.4749678448015557,0.587239865242769,3.8388736911818375,4.079444056227416,0.773258381317371,2.154837123862865,3.6101789820307406,3.0977441143558107,2.037144953317042,2.676438850809262,3.4913279021151,1.7400351924002722,1.1811628657312023,4.031568251629443,0.14731627690108495,1.755813941461427,2.118923925591946,0.26037478412525905,1.6978626467637925,1.6947653119966222,4.991780625651278,3.212917247946038,0.1708194104512517,3.4364061768058285,3.7512888277764276,4.238229115307547,4.867966785903678,0.9849205479310097,2.785066250777648,4.871389758817357,1.3468958829003663,1.5677068782635528,3.7151970004265467,3.786186807598874,1.3259110212312986,0.18484913179673823,0.6656153495056405,1.082652770508128,1.8551313855006835,4.854238014773892,4.748132507313771,3.13589504458022,2.5261899989531877,0.4639036129546137,0.8582600263532403,3.7686725751360637,3.0590809047601244,2.410590505263397,2.785138857110818,0.32257491775287916,4.30406875845446,1.4485514748993877,4.2328036524114285,2.196768967349616,2.941311265082943,4.17102017706182,4.147706863076909,4.677204170670203,4.907902038875789,0.0017541907406593005,0.26677444782363224,3.3689440718841226,2.940008933794307,1.1511369851195763,4.426840359156881,0.9368559979641378,4.945068108121538,2.081258591321512,2.6577331719433275,1.8722174251285717,1.7881239611086475,1.5488758788178858,0.28158385929952234,0.5851164489025296,4.911045261859463,3.2133524230845456,4.5103153983998645,3.5147736333857083,4.729244786040835,1.5501206645508059,2.5988867963231277,2.731136537233235,2.5874261742585505,2.195323354132973,4.650361415322974,2.155355935556983,3.0554539635437985,4.2281086660932115,1.8194402380432584,3.438673130672117,1.3127266727411158,4.460131982928221,3.598427532306884,0.10986853669604946,4.912708146274291,3.4903995292331813,4.858794202409326,2.23220131954049,0.36110694122647224,0.32831884519702537,2.45385039392809,4.714963999605082,1.7741920318466264,4.301176840223815,1.1137498022885617,4.630226476949706,1.011712117738357,1.773169368068398,0.8360765024867012,1.5136316522776627,3.58544261477698,1.3000779901308535,3.445976027695564,4.5748072639173,0.7468265137644348,1.683684497253184,0.6574690506702185,0.37648516845085966,4.688158939728425,4.672219470844878,2.25977913765497,0.9746277182510676,2.15783827787017,0.34773145952904705,4.593239071907313,4.076545447448552,0.45544285755928837,2.3537716835162614,2.9275277946662834,4.36155663034924,1.954756836532453,3.1905662475511196,1.0998889557880365,1.9962995301931008,4.98811484977819,2.612293747289561,4.15717938951064,1.7587863247476543,1.5395445877381464,1.0258847107724989,2.9057660718332654,3.0519886188460843,4.298970647200361,1.71675111145292,2.8929761130231,4.1467402267004685,0.9893551733811212,2.645602605314863,0.6580921941523421,4.433029627901571,1.9235761397443984,4.262229009754439,3.5084285811603544,0.6867186501755518,1.7122325106754521,2.4566418074839547,4.85751973074364,2.349836372670709,1.9741118398174973,0.47612630887249763,3.540343124782562,4.915613955726671,2.600573247972803,2.6075386806033074,3.0319520541323044,0.5461138742467186,2.8337536003032304,4.397520925929419,2.5315184887907094,0.9220331687456562,1.4664273277566109,2.2729124581350755,4.858685102218969,0.5884916002335272,4.883304362168531,3.7630692285584812,3.9461150335957607,4.24737941969817,2.1507134279121476,0.0881109747826836,1.8798747377945413,4.325097652557163,0.2891222646915492,4.61256147763663,3.901629928758523,3.8319045014664352,4.940619839338063,1.1835541740235722,0.895640536404243,1.6632990898087696,1.0136882978677708,4.32632762152179,2.1043188647663014,4.327031337657912,1.64367348621958,1.6529771557475015,1.1527901168876142,0.5897288101443221,2.609666633856796,3.1939544032726195,0.775396814860847,0.5526652709281032,1.7251315890718022,4.001437434371649,0.9993958687390792,1.7484188118712507,0.13217626375117586,4.3634158444676165,0.1996274716028612,1.3066701240245682,3.9895101330161884,1.8128429569217241,0.502535686687704,4.09181747647339,0.312738650304224,3.755062208437886,4.519855751250522,1.605023545447395,3.0038115003552357,4.782450327728124,4.364400448386984,0.8837461731829455,3.360180553534937,2.3679685620360305,2.635717952913751,4.3108409079653285,1.0175956546606013,4.8997471945480235,3.118945416136929,0.9861802613224069,0.4944248858010092,3.9307281832636756,2.0402845061678176,0.8030087499346306,1.1906620315457417,2.0721710839458387,2.6545183727191257,1.187400139249143,3.8543782189915445,2.4547846693289754,2.57769413693946,0.5302638237790502,1.2816287175118157,2.0876516000182512,3.066105150576155,0.17905795163747573,2.239455793305709,2.595440597311579,0.7174168647206813,1.6035537757906637,2.490996785685673,3.631862782257649,2.8552202245877667,3.9462386838849217,0.6790915552566124,2.39937385839489,2.2760962714532385,1.8103016122432591,1.6097097406717698,0.8465860031555084,4.29265837157509,2.9588698338404926,4.9970968203996495,4.055533166449039,3.6828295003757203,4.558913285564026,1.9979313762478945,0.9246875501745133,0.5411840858183448,3.3839544796028975,0.8948654996355587,4.963819035611207,1.19631619306938,2.3835453298619957,3.1081383163463308,1.9948290484765119,1.16040285130373,2.1476801701306814,0.9453326014341423,4.814771823360875,3.165479316094164,1.4082066154443396,3.0891475000480675,3.1402322752754817,0.7088499861773268,0.9487581242559973,3.1102724245951574,2.889067283837017,1.9688354790976181,1.9467149918275939,3.2196576380192674,1.778467710407845,1.0195650531093048,3.6840802181372503,1.8721019898579927,2.4896026142310745,0.9851280238236992,4.000026529841911,1.967299316300678,1.528278628202101,4.912607828283995,4.826932287277935,4.005859547675468,4.57644238849162,1.8661330592253433,4.463485767237366,2.296323667639099,4.190993646581461,1.6746521852554141,0.6522728758907692,3.9229833874055577,2.3145623625898013,2.549115554172089,4.788979981820138,2.534916245066058,4.562591308524949,1.0627550732197077,4.73681143388354,2.7733251953580473,3.6960744739515317,2.14349892698256,4.471807420738408,2.1386607031778224,0.739006655761999,3.321771309937236,4.350083475926185,1.1216062160858686,3.2004385595073104,3.8744319868085597,3.649782582492586,4.679220514890114,2.8369780609364037,0.6941340099732407,3.3037871105942687,2.4737461772218627,2.300179978350304,2.1522064497122626,4.256150918798549,3.8476460412655857,2.247109985582252,3.4845599121055546,1.7737606084100066,2.6108116812885482,4.2581258521539045,4.6117674566072,0.0799990414156515,1.326232938692058,3.4294607459132234,1.572920507862633,0.25484431084422443,2.7331865329510707,0.3571217084267031,3.0126696219011184,0.5383909179935498,2.6562164637335037,2.713516899621995,1.496143582764845,4.7943996179801545,3.616274562018851,4.792701314812274,4.00207924845658,4.798682209786969,1.9977214317110858,0.5795244156917467,2.7645833284419874,4.667804090386206,2.5091774806687814,0.2990149085041427,3.270998383976196,3.505188312552281,3.341775969811432,1.0502140010794203,3.9663124226074986,4.6342163685377935,3.275695215440911,0.8383270020178235,2.93363027875169,3.531731518657196,1.2670499214539654,1.8706697602697442,0.8539911054295612,1.130729843749898,1.333864587432041,2.1792259616000154,1.9824943528234618,0.8793964026068213,0.16961827076818814,3.030881510123492,2.177148528501287,0.005174199364660348,2.3655039636709283,0.15527177197848685,3.7248160765627922,4.235952695078477,0.23194079724269234,2.369472123533767,2.697351586842578,2.500436473169213,1.6587605441451614,2.168208731503949,1.1432886186781388,3.298375110804664,3.8153420245839618,1.0926848502918218,1.1704928742895104,4.718903183374018,2.7169109720460805,2.449892479339387,1.2261106169640457,1.8305539977362706,3.0383177375785286,0.21437913105118778,3.0623691516311933,0.18692617484698526,4.932568164279257,0.014345265999979873,4.006190932170853,4.2934665469244475,1.6628717082927813,3.360656285204502,2.531658138394225,1.211622165498073,4.0936902164673885,0.11854051761918782,2.3154645753201377,3.3036575996625626,3.9739571886887393,2.4297356659712497,2.5134589903208084,4.100659365816208,3.3259940949181397,1.8376819881577522,1.5686220405396523,0.43703945451753823,3.1833564596436057,3.618595402635234,1.8680573414055779,1.126559007416209,0.5360459121453187,4.0762877910484105,3.468034933995713,0.8256712415893208,3.0334587038965988,4.617189866028393,0.8229340796754181,1.914762995400754,0.21009795993011782,0.16130144707345861,0.3089555882434625,0.2578269273312328,4.404098821774513,0.28909907163200077,0.8404467118785497,1.062527655432367,3.0545504223048727,2.4595475863902525,4.798650597723143,1.2850691045531748,4.860676638123459,0.3343845918275412,1.672399716476366,2.7561603246759803,3.390283162872417,2.157880974164109,1.5117163747566476,1.7339286008903732,2.6841693896999406,2.4946419349112583,0.33944256869492984,4.433780746947388,4.6243398982862285,2.2942805846369643,0.40435090842774857,3.909110122906715,2.619384501173908,4.091433044999793,2.904885370044613,2.747919321521998,3.244864228643026,3.719103912197684,4.6457660601478254,1.4551725445193553,0.31746593663140255,4.721535776140199,4.209493670729273,0.5155101877919732,3.342701374152972,1.5115578452449507,2.657152953341747,1.2243411274780158,4.419826010822707,2.027326822750651,4.12869867750943,0.6279780455998196,1.6546364744374376,3.654808563578331,0.5315667791662948,4.372917737456497,0.12516768940341705,4.308306645942054,3.4654242808714333,1.525241615779691,2.320738059376435,0.5813333629444017,0.885061740244012,2.7055097703443822,0.9745374149442776,4.6048386160650505,0.5447260572242618,1.4683447777598102,2.838082230192953,3.0903102171929184,1.8964278729399975,2.9645060959073586,3.249414873124692,1.1390519186160442,4.534224013090089,4.673347051719965,1.0802162572182983,0.9896106422102857,0.4343443672738323,1.8180489145422918,0.5759209358833073,0.6235277227158365,1.0140916329338145,0.389992389606143,2.4395966202695374,0.680916866300243,3.2819241335555507,4.408554352455094,2.9674177726034614,2.5839263851807748,1.0895326138084116,4.93051036832203,1.396396402785367,0.9441319536816573,2.171502228796933,0.1896300076012214,1.622549124399738,1.0183682540448613,0.4009898262043188,0.208612335074998,3.903513840440204,4.280816529530362,4.690147390950133,2.8728769772455753,4.309901433055283,0.9327761297777815,1.3046231731355507,1.4259703407002788,2.757085529275709,1.3758557519263226,1.3054535580048854,0.5797393742386525,3.4275398891356854,4.6861545837803416,0.8241048303653009,2.0937157977872034,1.2035830253003599,4.000259406928537,0.3801021198167964,0.6843042475972028,4.840825474020991,4.80545533018052,4.233381871006969,2.767535092874236,0.9400445445083039,1.1439542122551027,1.1633437187175355,3.843592329546385,2.3566651634551428,1.1006631314532622,0.945216447397198,3.142355716615206,4.097178287908005,0.5102625412858608,4.64329153922423,1.390063270841283,1.7757700734615234,0.16328701636364573,3.1080538173141727,1.0217871691840252,4.031075552671836,1.8500218116608669,1.7777416953975966,4.756250593923515,2.9736059915901647,1.550541825114663,4.666037557386794,1.4168193515697447,3.4567739347555837,2.542588153803763,2.76033609731974,3.5190818319752637,4.006935039540091,2.063646702305687,3.464801837200765,3.011690909387635,0.027527940549793017,0.1465940202890159,0.2859529001272876,4.582415094757971,4.753446451445736,4.072803359355923,2.2849921492375236,0.4094486369875705,4.26304586839109,2.2832532427682306,0.42007880369142603,2.255171646331253,3.4281030923754505,4.620297347779852,3.027947899337864,2.3299227868658368,1.435410070057207,4.261512534776762,2.737418121324351,3.0896647666873966,2.7287723398458255,2.9936253513585265,1.6936086985589294,2.0065038978986505,1.5763131663462238,3.512146615002073,0.1641316040174423,2.2413050141037836,0.7983973616886841,3.440130022887308,1.9156420635210125,1.0306134755014706,0.4014131599579118,2.413290423562472,2.1637098397766086,2.66332872883277,1.9684167985908019,2.882005768713193,4.914516557213407,0.11332939907681583,2.1898407168157696,1.828538742964524,2.3135070678586622,3.711807258164704,0.020747010085575557,1.1312089910936651,0.027927141510502018,3.467752801944676,3.930516629706844,1.749192075028615,0.2863793219365507,2.123924949649827,2.0347825964940593,0.9812683024970681,0.3128274021716615,3.9052296926393226,1.0147311655110125,0.689975849433554,4.747396913995917,0.027761344538557164,1.9147783342658387,4.986193378963808,1.5140494474627708,3.9700108421160927,2.3617245531182984,1.4719596634804444,1.3979147668444447,1.984264439456913,1.290554261951955,1.1946773226386154,1.6238388411075266,3.7805036501602363,4.475023856100772,0.20357241788269587,4.087351421076603,3.863026878806899,2.8545205965689946,4.430753195083654,0.5912044917469883,2.9832671975288996,1.9443218612161806,2.2824191831806906,0.8411437998071258,3.0886059561561985,1.0126194498765761,1.7890162472692173,4.908214822354129,0.9759597991360913,3.233226089136647,4.496774220303699,1.834916893643379,1.5901582874231035,1.795728235801829,4.1853604852793636,0.20973893450496162,2.24344871876633,4.907020236064749,1.1609448881711026,0.3521662782004409,1.1659806577430376,4.900349652863935,3.7936292290806928,4.782891509663002,1.3381790391690074,4.699807247327861,1.9094737535621287,1.382439930329018,0.2508219076965379,3.095474983818294,3.611763110537509,1.3766002198320637,0.4883973470987013,2.0150716240121636,3.8250214929699613,2.6980496588124456,0.7600104412097086,3.7591569974444017,4.490844201765159,3.823049369262126,3.7498726983047295,2.1412584992677153,2.4869726678472146,1.3928546054597535,2.825555346736434,4.31667982721188,0.7632348697873348,0.14505781246787253,3.805717860165921,2.3991627136098046,4.022867367597512,4.786954447119857,2.2906176424552838,1.7446332411868282,2.8309034991710424,2.4483367172769546,4.674316413307446,0.9780745390564805,1.7446688248190922,3.188479591635247,0.2547276967705714,2.1018205621607358,1.7250502943194579,4.5573795557588905,1.0806811075567313,0.8469422894437295,1.1114636182703408,4.643195802038203,2.7288442247982028,3.860790706502757,2.7188243010964275,3.638902396981496,1.0122138860243823,4.659029765172814,1.028448849432988,4.073346010675948,2.2837827607855132,0.13868400967164796,4.337932255067264,3.885870931228852,4.854926410720562,4.108717297982798,3.587724991867561,3.9578882666282467,2.6202599822801287,4.360417752278782,4.788965137738893,2.2731801200679627,0.9719256907103235,2.117889153646831,3.8484982506517817,4.586711208659244,0.34348639933199365,4.575613234364365,2.4343665607164064,3.3576385519270424,1.4581166437240478,1.0873515437638293,0.09947812059847516,0.1554416527560798,2.4649262013890993,1.9152912769469943,1.3513993455243156]}
},{}],96:[function(require,module,exports){
module.exports={"expected":[-183097.5462195888,-2054.805636729386,-1.350832093137942e7,-1387.0709357724252,-115.98575818291599,-2.1532834100150185e9,-29.617738117605324,-134.12281926263154,-90.03080910757107,-7.439291374464051e6,-942.5052705609079,-1.3779960135374198e100,-130.9221192270616,-8.404120839273093e11,-1.2149456709807443e33,-6559.470886810448,-358.1626485071165,-370.0805655783563,-2754.045415798785,-278.0493758041564,-14.301049748237308,-2.2739093741468802e8,-7.00913253861702e12,-74.06419290569563,-244.54597893547077,-8.419739127728536e8,-173511.94501899602,-190.77599392127817,-70.68826037931899,-166.11424726549143,-127.58146386655677,-577.6221817059836,-2.09766808964236e7,-4.537274776525524e8,-191.0303104232615,-107.06867009955977,-16924.33592908122,-1.4697294506895722e40,-7.090787876986793e16,-416705.103424462,-5.775338793443989e8,-243.48986257976446,-709.8738918522121,-1.899911183406894e208,-71.95761267019613,-64.99719422985721,-1.3090768868839098e7,-6.195846664645811e7,-1.4420440186554288e7,-1493.697303522979,-5.843114056506672e14,-243.89644341892023,-92.39773815494905,-45.815139203825176,-23.656502020542526,-494.24109866562156,-1.5784177642084605e49,-3019.1400429230507,-163.40157515442957,-35.07687611826291,-116.25653884671917,-256.8562596150568,-460.878382853758,-237.35328993047918,-44.96272272661193,-118.14782586831248,-2.5721558620827555e45,-1844.7392730321362,-22.77060960489895,-3962.98936288038,-335.673806275325,-1.7617254129061667e59,-1.9683400335299402e11,-8581.99343153134,-8400.010898601366,-185.29178671035385,-323.0741571451359,-131.48153725693282,-1.9809496405109344e17,-70.05372249813627,-4939.736567343043,-1.583053167069423e6,-1.4087384756812495e6,-2.9455003262313126e20,-769.3990158920774,-89.06565911876052,-11717.740902645017,-7.173305598818144e7,-233.60343012917372,-607679.0463870431,-197370.87674354573,-1640.2430365298897,-18211.588888896495,-1.669583291102478e14,-5.585978998120949e25,-8.698423587017462e26,-611.0187191260632,-707.9676548062146,-127.35594156315412,-1.6522143270563284e7,-71677.1460280035,-86.3914050602435,-2.534471914187108e13,-28178.96805235323,-94017.39193554936,-3.7504358761548433e9,-1.8379700856684826e6,-1668.0185158007503,-66878.26920753792,-7.520754201666353e6,-1628.7425235602109,-187.72214605530473,-6.969995865454192e6,-257.65474634165736,-299.67950217615055,-5.4153899821394946e11,-8.493970530391948e20,-231.41129081531577,-1.0572591295410633e21,-792802.3949940989,-2.292683272117846e8,-140.8107333210981,-84150.76404064923,-64.12628161075388,-2.979602481829981e9,-6.297731463379069e7,-3076.7401271270774,-8.482864062387299e12,-25520.58481470059,-4.4459073748150193e24,-5408.9392996222405,-5.726018156398142e6,-63614.360450273765,-1.0832520809370172e14,null,-222.06014218590786,-5436.928672995185,-4069.032735573532,-333702.5595303184,-1.705119941951877e11,-340161.56212884013,-4102.404211911939,-1.1468612055692819e8,-3895.686653444628,-5.482715442781803e6,-5138.631839255109,-29780.34230916293,-8.594863683805655e12,-17.38093602153914,-1.0349698464581838e9,-9.587577250042505e8,-11676.769988901917,-599.0458667931587,-5.585154601667531e7,-13.657908151266568,-304.48105496323626,-21728.884411909265,-4598.182972888567,-1.7718366878535324e8,-862.4572974467484,-259.15750264230934,-1083.801938989493,-2.1441937718596267e127,-2935.449549719767,-14329.712175390145,-3.222614173442117e6,-269.2548943851332,null,-312.5737211126523,-118679.70938811847,-4.413716004317929e6,-19.451048419806867,-189464.11534832505,-96.62403415556952,-129.7345793366415,-68.47385841706355,-1498.6542696431347,-1665.3619974929022,-1.8055084937756543e13,-500.38916505982786,-3.8809612107266024e16,-3.1503627406557944e7,-8.256774150839452e10,-28698.887699042294,-560.6095427256234,-49.94042640396593,-4.500047957974147e6,-1.4597712790813805e10,-189.92947395741913,-162622.39726988476,-29269.276252437143,-148.71909999511453,-44404.15204719142,-28.118391757001366,-50.358432677597854,-1.7962744461677676e26,-65.66624473530898,-133.35635670563684,-5120.657111376984,-612.9738388600589,-2796.067429357397,-7.344306572571267e6,-1.9493988251679055e7,-4.9455961895993036e20,-282.0143625597018,-34.535185310600674,-207.8467564417504,-2.2269535559937734e13,-350.8327974386133,-5633.177892680224,-3160.0911675472657,-4.909569215621034e7,-79.92593271799419,-407.2709126552581,-953.0910748454434,-157309.23122855398,-184.8936060465357,-8.158389771420103e13,-788453.7393757907,-1.881934153721243e204,-1442.7312872876494,-366059.15349519753,-33.077084600097386,-1.9374717618789906e38,-3.12133712798795e6,-2.5411214039970478e10,-1.239835498763241e76,-184.30745156993424,-55200.5992400632,-162.775428096106,-46.947489576094455,-450.1279380323775,-1067.9675125163192,-878.0540588786082,-2058.1009833392654,-2.213397656047958e66,-15.009341563223035,-276.38675502565155,-2.7377675957574357e32,-110.71659466412389,-7217.550952473568,-28048.987553090516,-30.031101774640305,-13.701904908665409,-3060.5365817817005,-7.669420025648604e47,-153.2359198973192,-2.2281422030516595e7,-3493.8413802700106,-1.2576127526825035e9,-226.2933714941821,-109.80062821756457,-933.5701492865484,-1024.7841578256389,-1651.6557916047655,-2.350101580712883e9,-982.0407427176798,-174.95401955076085,-630.2406917588881,-26.615385308261555,-34.557330771595325,-148049.35153472668,-1.2243446659714457e53,-3.4499245680419004e8,-224.32144736070995,-1.542066072927805e12,-2.103424888132952e7,-1.079174067302536e10,-3.371159950469525e8,-58365.896156190785,-30696.40020327099,-11286.911734530617,-6.328402864673949e12,-763.8409057209687,-147829.24187038385,-9.751683144876232e9,-8738.497260495971,-7.315365644716438e9,-736.7752094769057,-5.125752036991968e22,-1.7785536539710434e10,-3.3563373602375407e118,-274.26245459744797,-69.5335252362045,-4.503853889614466e22,-3477.9490976445277,-18702.856606191293,-18.4952307702832,-2.13449056231637e189,-2356.4394634316295,-1.9573936462309524e24,-3.3434341737921903e37,-39802.064251743774,-711.5381872553891,-43.05467227498768,-24387.21839197682,-20236.422273637432,-4.221745175969528e7,-449.6566874996545,-5.485798749715364e8,-6114.152657817612,-664.0487141779748,-259.3842368825463,-2.9604338063147763e21,-16778.668263489362,-67.42486660530415,-1681.101708335711,-1.4643918064075993e10,-9.13640185075e15,-41.09644231400488,-42.554288011038004,-2073.15476081416,-61.12950438717443,-4437.250795825756,-564.690421306815,-4.500463799595695e116,-6346.1116632920375,-5.578946704571931e8,-1.0697815263691163e35,-413.6963948581641,-3.4844871891040485e6,-2694.344057513609,-1480.9141707619085,-143.04595076703032,-383.4820592294501,-59.71850755928025,-48.45842102763706,-10472.739932106748,-1482.4780315639591,-7467.855151470112,-1.0775553425090069e7,-82.42189214727122,-1356.549416933597,-4.674834589438757e6,-1.42763851913519e61,-204.41617768636655,-2.649935452889909e62,-88920.3147285693,-573858.3082382282,-174.12504596577818,-145.12790361731692,-253.9995779472103,-3688.393788827477,-18568.33748593834,-1.346270650709813e10,-43.20435449287754,-22.389848770702546,-1.957529905954764e7,-115.11144864302464,-118.42852476419884,-41343.43215774566,-5.350071059421685e25,-130.63405084160829,-88.6661948923431,-7.114684257052059e39,-49.38039838627996,-73.00977714326828,-32.970816776208224,-2.6160563769215415e6,-80.00196162179806,-4944.087377846228,-261.4236308237065,-701.6551238147858,-216.44430280761992,-60.70570742615121,-1.6348523025237754e7,-2649.3580048699805,-45.91383758655557,-15439.943720299843,-183.2621370152054,-2716.5857811189803,-180.46119686157863,-316.29675599867693,-232.88334465117904,-788.1956369717603,-18542.039266305255,-2.38506042491504e6,-43681.25515658655,-47.49632466880425,-96.32946522694786,-1.2360106464729782e10,-114.87090766606867,-3.735734566232539e6,-3.0163378110423785e11,-287.219854790115,-3.1192527169888742e13,-2.9952374253280355e21,-1848.6930185426445,-2.671919813391296e7,-67.06807504078368,-108217.43927969763,-3.190664395164709e6,-33.646596923156466,-2.046658800694687e16,-256797.7198831209,-3385.363171362602,-1711.5540285487477,-7738.915759266473,-1.5014593377036733e21,-255.01263769375308,-1.1098367380816631e6,-14.130627450123358,-78.60280064702891,-183.1094988298335,-260.409972692009,-8.264261305434342e14,-3.5347269703111467e9,-6.93895035950104e17,-9.911395729495358e78,-604.3458006104887,-109.5700301053167,-10716.518259087947,-2.1756570689417238e23,-84.11467514996392,-1.33098430591807e7,-1228.5787805409568,-1147.058282247431,-5773.231633608331,-71.06256623266455,-599.5232152929515,-442.3413544784761,-345689.00148328894,-296141.51577467006,-7.637256698508324e20,-663.8146315253857,-80.63826787106537,-115.32714821899121,-1.0485304956669086e6,-1.1847151134569084e12,-31.79698166686919,-30394.334162760922,-297.62943906422356,-667.2951824002081,-90.7391270526118,null,-1.216655629058838e6,-1.856529731640717e19,-32333.97738245093,-137.40239380616703,-1.5023691168421041e22,-1.8695538888719613e6,-11504.57740165748,-41.533833826908285,-3.8379487407535617e37,-1.7080367575181657e8,-75.68407525939891,-579.1907213488658,-1.5467941736131125e66,-2041.3771342451132,-1320.113509293633,-1.0124865537477802e17,-24.391252267472353,-5.702697582428202e67,-1001.4702385355561,-97898.87342043011,-65.16183234813214,-152263.75363174488,-2301.8459375955854,-956.3690640549758,-1235.868427523054,-659.2751593233785,-3.75472259975858e19,-282.899567615391,-46970.2372577837,-1.6508575974414882e23,-1.4203828893556294e29,-52677.45946513461,-515.2869210329625,-120.6423264737223,-44.90976314876676,-3.33789345118011e11,-74394.38508005167,-85.61684255506538,-136.8060979066463,-674.8773872473581,-44.51861569563465,-1.5177523998162213e8,-9.45256097667323e6,-1.831278572590115e39,-7.220738387191411e9,-1.1276299615030188e16,-380.69641326569035,-2.4019333968761912e8,-2271.9696845956996,-533.7904495680409,-36082.641967878444,-2.289800031590237e11,-55189.64542050435,-463.26360311340295,-156.38402822477497,-11900.019051427887,-21.574447336504534,-83.85091007418964,-86.99065221317167,-18.686977811466043,-1.3951391817762535e7,-93.63375391676195,-725.7750454073785,-320.1720964864485,-37.6546450596308,-3473.5841601422007,-5096.90145984735,-11.732502532327906,-2.6547116506860256e6,-20970.360667662822,-72.25801378393228,-491.58694430814626,-84.80413312223402,-9.499448834640284e8,-3043.869256365028,-4.894466099622365e13,-691.8702855792776,-49.40473557669726,-2.7896360666857074e55,-3.937397234877846e7,-77.59428370980473,-36783.58957897687,-91220.71362064464,-1.586153853309933e62,-133.77750600045377,-192.6058853832689,-5360.49437703712,-83236.67086807739,-3390.890143794888,-205.87528937826863,-1474.9334033482469,-2450.753194172758,-1461.1041630291936,-450369.0641520476,-7.893820998586827e37,-411.12394389419,-37.9214434494364,-132.07784224953343,-150.94108579315497,-74.19154249712548,-2.1297004369384833e7,-3.383707426053461e10,-3.202915155877541e18,-9.192808436691168e7,-613.4842797360793,-4066.773446047406,-223.50123063475644,-275.1744359122167,-3787.8275105964435,-208.10126570674936,-1770.098909384324,-215544.71233749762,-1.8425487274743654e6,-348.00308489317683,-2.072634727112011e6,-6.888352542115053e9,-1.2252672838201553e6,-7.036135961949153e8,-1.2052746158119947e7,null,-649502.4913698487,-125.43027297473816,-3.8428111465569266e28,-3.734623418900763e8,-3022.330939134631,-585.8601526329599,-5.884009585397992e18,-2.640552242564097e16,-70.95439215204645,-1.4160092887928315e7,-4271.078819257561,-1270.0034006569795,-1.7054619156267158e12,-348.4738278698717,-502.792646180881,-1.3583106704223673e6,-109.91014754772465,-24.87780206092489,-129488.20457604699,-3.7695990720754693e56,-978.8162096560523,-5.264549854772868e12,-2340.5162821432787,-4165.837706567285,-817.7234499921635,-9027.612535248452,-87.85363927618822,-2190.880709573322,-6111.616847695368,-3.194530896667604e10,-89.95749747949412,-1.98646650822441e6,-141.01811353226577,-17944.835700302705,-4108.660753291748,-79.11271998017116,-66157.26275776717,-1442.5065086939976,-473.28898151306004,-92508.05536822247,-22800.202009740104,-96.68561761386422,-226.42314727784122,-53.841792779991465,-117.51940925039098,-3057.965155638776,-1.1290499318020259e11,-943613.2799395097,-594.5523194028051,-1.1673097587530342e57,-214.95101731528877,-7.412514784029957e17,-1.3763187731831462e40,-23.903045931394622,-1187.8877618135384,-1.6738036261542097e8,-4.701756839923901e268,-270.3431513479069,-190.99058044657238,-48.56909690083354,-1.872153111037468e12,-83.03966291609328,-4.2211672238287477e9,-14672.014933366272,-7.517067476514852e194,-3.480502564061294e10,-92.58695927495981,-8.337327474798023e40,-2394.3253785509955,-4.0157085502276885e82,-8.610344106388605e10,-54.30310207007592,-2717.197813859463,-857.1319089150683,-283.95779599692986,-66.88866534563356,-1.4578803153161709e148,-6.326714243278959e26,-1239.8057660828374,-37.516411401771364,-159.7117771614392,-557.9812370629535,-1172.146375780054,-3.3281601501961365e9,-4120.163183120811,-269.799051922313,-8.60385911071077e146,-1.0310532847113818e9,-3885.5157923879337,-9.780092390933477e12,-74797.528091106,-513.6028197031403,-2.0143689256210022e15,-1.1261756708468661e29,-154.0107380508217,-4.983303284944567e6,-886210.1387493293,-4.505415221512253e20,-295.11139089958243,-1.4728014890164474e11,-2488.1928156577023,-602.2883279548464,-3140.1180483624726,-1.4307155438201236e11,-17.5422571918932,-127215.07527190691,-192.89547433937406,-7.99694549664972e10,-4.491295925791531e9,-71.31774227560946,-419.47368800723467,-2711.580284082359,-355.92834899721527,-9.352299035947266e21,-8916.39943359976,-47.575563656362675,-2365.314846986203,-355.1860737727072,-9375.765108512218,-3.919397329819459e10,-5077.541319328532,-5.099736809644145e6,-2.979025160948946e16,-45.451987263513374,-182.11486079634756,-491.6353149512645,-2545.7989878949197,-4.748936450884717e133,-215.7480928314399,-1.0882133370810883e8,-2.3970793621038984e13,-415676.8433721985,-174.85536789581965,-377.3955891212354,-36.50984233451787,-74.94831678518557,-40768.01426023629,-4.958188437244931e100,-2.217305850909603e10,-193253.5693860333,-3.84867824499008e18,-405.3347531298293,-22.3126834338734,-5.26831177334232e24,-5394.3547649623915,-87.64111496173064,-1.7304313911126007e6,-5322.479010436027,-81.5683255315702,-150276.0139618702,-4.254277533017128e6,-55.27752881595322,-1.50516319000338e91,-1.1664243569120571e7,-27.976413826678268,-422.2549395420326,-2461.426960400853,-28031.46204726484,-98.34254700272925,-8.746906707176379e28,-135278.28225793756,-236.00763757809153,-121.78741574641722,-462338.33974353684,-3.84828866907068e20,-2.2140564327150277e32,-172.43232374760981,-49.68889514525469,-26394.08568310226,-1201.9532130427642,-1.993588051052186e118,-3016.9004573748693,-9.84210906403019e67,-82.34295210181298,-70.21588648997883,-298.3749864400056,-1.1372201968874172e6,-152.90617354025596,-180.11506381739235,-2.6600412658149214e12,-6813.959822189247,-412.213467800454,-90.18320084644996,-578.6813817932305,-5.7820599780899e15,-8.880543057117324e12,-4.686200727314951e7,-46.77635309509782,-1.0129385628783813e11,-18600.36235650935,-198.52665074748737,-34.90255403764275,-29695.224814966423,-140.55054456390766,-2.5737619394832186e7,-11615.182921362024,-211.15622210453662,-5.887753003464673e12,-5.661935486418183e8,-74.20169792800846,-28.652169449349554,-766.8030129593205,-29707.276276842294,-9.382842563387325e6,-98.07826447133559,-1.5290037769117648e13,-324.94854671550286,-42.09072673638336,-2.728180033920809e12,-123.38860686767157,-6091.142364291972,-4.04102016540249e11,-193.09520381192135,-1.0196139233688975e7,-85.56637818143864,-314.7637415355598,-3.857781345757061e11,-9774.940425785493,null,-1763.640199081935,-118715.16755019838,-1.0915792271198272e6,-3245.9957134936667,-105.56288280893318,-275.1250554602584,-43951.82402079503,-23.602574008845814,-3.683197790989775e6,-1.4080028268521547e7,-3838.264942922912,-1599.5738827229172,-821.7005928053441,-50.812426713500074,-2635.183684451755,-209.57136572691022,-2639.8395842613354,-2307.5812105484747,-103.94624826514338,-74820.0852751844,-3.2146402980746285e17,-2973.7871494252495,-67.0094562333998,-508.03875166030565,-1.9754175846331036e20,-89.66815886270268,-160424.42481312045,-5.6933823398216573e23,-29.42599064121608,-2.2129674642455973e23,-13117.658329427268,-175.59432603692784,-4521.4998120799855,-1296.2025569097732,-7543.002756335119,-3.2621916054314774e8,-380.7027897642963,-175.79688633617752,-109.1332580042438,-444110.5828380635,-720527.4221042773,-696972.2807915777,-369.7357333628528,-4.390786302638152e28,-1.0807058294993149e17,-566.2533549941425,-4.855262502457312e6,-113.90379512420921,-4.292460563310682e12,-1.5320343041209592e13,-610.929421108197,-66.28446186478737,-3.2717566463611353e7,-3.261448268234494e8,-176.9102147854622,-252.7109070505795,-58.992038331906315,-2.477439862235614e9,-835.5460421298876,-1061.748575315606,-4.521075152198154e8,-1.596131326711048e15,-1.2792128697462755e6,-966.2228837047098,-54021.36618542581,-1864.8879013915764,-817.0874485205792,-59630.79490211748,-54.785817914448444,-3.2119922712157463e31,-1.0122047506096825e7,-328384.88647551835,-251.16289610651376,-3.441416170000129e7,-125.75208393104813,-160.23323463341484,-831.19389819698,-7.34399571388339e16,-3909.864067205668,-227.4684133649103,-4246.583352633094,-6.364349155501143e31,-74.20418607890772,-61.17683083484666,-2.367829745575496e15,-88.35595233648283,-199.19004685512806,-300.337096010437,-21432.21078738258,-53.951837167532005,-66.7142840319248,-697.2944888326276,-156.43066856763969,-286.13132787759935,-406.51406447664704,-88.75835407837627,-3.1753243139857342e6,-2.08606875585081e26,-416.71205084706,-275.40210464348786,-1400.3768494595033,-7.544075609302112e7,-9.356414320730575e8,-1047.6476024012818,-1466.334371021012,-2.2748490687534977e6,-496.00321288539936,-2.0155887039674677e79,-3123.7950750863733,-60922.01804851271,-158.0349841932804,-4.418354731729301e8,-8.59847225096898e9,-636.5124442543766,-720.617943763715,-6123.013430412233,-70.01652362875483,-2463.5226924667713,-8.508621731543069e7,-1.6211480426138006e6,-201.03427706249994,-218848.85869087535,-952.5980708474132,-4691.605223359818,-160523.74646629117,-126.99713855137067,-9.060522362879658e9,-41.40466248573768,-538.0689082207266,-64602.52275898695,-173.2808038937993,-386.57607384022594,-4.251052283592706e12,-301.94785372719224,-92.44229548877408,-3.76981789660405e7,-935.6969575645628,-29.37956538837449,-156.71816652210939,-1.3795810744206448e11,-1463.5893775327213,-3.0654893462418728e7,-5.504024942315457e10,-234952.70089585418,-2262.7671954242287,-14811.545599209994,-3.516995006574738e6,-147.5916331748193,-8.557010563121814e18,-9.476599386292683e6,-37107.01846852196,-82.53953350629936,-36.78877189876782,-69662.3076983232,-451.2511167237071,-19056.927546912542,-2.041256895640393e7,-210.237201312987,-475283.76336776814,-36.11962321083898,-1.0099577119999954e7,-16.775876569369743,-4.125074844840211e10,-74.03375185032107,-2871.769178704567,-3.144168561583871e8,-8.454251222813455e6,-1200.8369302801125,-1.0931742771443595e23,-224.37882227084003,-42.910324238576166,-986889.9187937204,-66.65098485412753,-5431.543462067912,-760.528955204566,-1985.1314209481757,-63.497191256688225,-2.484298925757598e7,-349.60442015572045,-9.39071203544183e27,-9942.879258968784,-9.679013560604077e6,-263822.441975764,-1.3734986826376443e9,-871.2160332894553,-6.442832380720944e9,-176.93397585468404,-20729.391656359065,-549.2517513027323,-178.73863344722545,-4374.311174672718,-220.48186424414808,-17.675846570555414,-1345.4832008792393,-375.8270014110279,-6.241653856140126e7,-1.312588759599824e11,-171.3859834751084,-124.4137521326031,-1.1462916447742933e8,-4.705171149237014e6,-2.30001852875113e6,-6.485472804772913e33,-471.39050932091294,-2229.9605581354444,-1.1386626223239422e14,-32159.865130881117,-1186.609889322575,-30653.518849232263,-21045.15707246097,-29.506061354619778,-20391.07399453149,-60.41513353379176,-6648.783709237526,-5.6117599897288954e17,-31.610096889098124,-641.4744309793143,-2.1308317820884133e44,-384088.56008851674,-27.666205120306756,-4421.770700678298,-686.3857174023553,-22.897962977752805,-5.690831472507149e12,-607.0802555160012,-2.0944714411397044e7],"x":[-15.464781330132883,-12.366509693827282,-15.52262312503154,-14.651277528873303,-15.13093504573239,-10.357755050361064,-11.058924893589381,-12.260292068432769,-17.94145145813492,-15.338670867989068,-14.661573605586327,-10.88152927969795,-15.808045016539843,-16.729039525809867,-15.536555351488397,-14.864979411836414,-18.55276402348983,-12.34837508481033,-18.695420674372077,-19.426216152623926,-10.124527300128676,-16.62633836467343,-10.78129314268109,-11.644712543562427,-16.313906664887732,-16.488059082849322,-19.4013111740973,-16.942486449232252,-16.525885090567595,-17.092562235505277,-15.86114353259349,-19.15052128841702,-19.883254932084892,-18.653140054108814,-12.634889081179573,-13.985840202461304,-18.296912537312963,-11.66379539169315,-13.64105684705921,-15.838100454939994,-13.365556783730623,-16.496003393280734,-19.048972563729095,-19.72941166966786,-15.460259012967386,-11.953642589094432,-17.302299278901064,-12.83118589971587,-17.494682578355516,-18.81457437627408,-16.718581537099183,-11.491278505957535,-17.248234322699606,-10.587202267402976,-13.458772934984736,-18.7180803058576,-16.136271915743443,-13.411696714267515,-13.508784597396453,-13.30229601947924,-13.155713592121536,-19.505172208763216,-17.392076494533445,-11.554031784207876,-13.620842981356542,-14.13647206262233,-17.618664128021074,-10.77346048901462,-10.771756232314228,-10.347254348528587,-19.44538547815825,-12.0932179469963,-13.00815771984826,-11.669051782622063,-15.842433275733931,-17.466739612194132,-16.057036299269313,-18.187887571676807,-16.813312258330203,-15.263910926357248,-17.57068401139322,-10.030282741421601,-15.044764239199742,-19.997541469112793,-12.607311469339633,-10.200266122936734,-19.908897672503805,-17.69033868227462,-12.866616848625853,-11.10062600024226,-19.95236395953332,-11.895129865741453,-15.212604595463562,-10.836071377369825,-18.514522638511053,-16.723705341246745,-19.517341798288555,-17.727221579646645,-18.572716434909974,-11.92029068051119,-18.27897064934913,-13.580238688172262,-10.077361266454243,-17.50472656645374,-19.185696815193356,-14.971880924825161,-11.776394887681708,-13.128844190618471,-14.860724541750283,-18.300787067436445,-12.061007235100636,-16.359371698160274,-10.649184365101782,-17.799169088028744,-19.239292803216905,-12.038907127104267,-19.86123090904656,-16.167497746995018,-19.61585283363948,-16.636853791443546,-17.756794839786025,-18.23535112516283,-17.48082544543704,-10.363257184215666,-10.054859909045613,-19.62718302616869,-18.63909757700865,-16.96323498475009,-13.07429610603608,-12.486708899319973,-10.157430319039927,-13.693334442699161,-13.770508623198939,-13.212606741743326,-18.669296652483794,-12.292364279399736,-14.025386468230378,-10.328344432481103,-12.401429967176778,-19.994652351491165,-12.466619802262127,-15.035139299796143,-11.910466985363684,-18.985477517000668,-13.198842857490051,-18.678524542240662,-16.454529092013978,-10.32278781224096,-10.117297701119918,-19.27051910427847,-19.92909058683927,-13.318323344890983,-16.321244600035424,-19.196824823204874,-10.797264097366941,-16.86264863079714,-14.3687671510214,-19.931314993780276,-18.58959679858254,-10.021051110723677,-14.384125858859033,-18.97678643309959,-18.127182182230026,-19.53050465274359,-12.797532078176221,-16.734024600953287,-14.869970763151098,-10.247039770017853,-10.660066539107245,-14.932368357020707,-18.25011964463222,-14.454374384150306,-19.678308155677605,-11.289872302864394,-12.952603529039122,-12.601284447413036,-19.776994240186706,-11.795814206123143,-11.188181093690275,-14.146360664890754,-11.518579193985019,-19.101753592940216,-10.4958653213316,-13.000089405685209,-18.883283093965858,-11.26171446266913,-12.224463620523201,-16.144714459718195,-17.965384100938465,-12.310450445385989,-18.642309060912293,-19.914614496602606,-18.66367476250044,-13.765925897547742,-15.188394284743893,-13.084035102086029,-10.656797396742942,-12.101957112744087,-18.23369023668952,-14.466691682163084,-18.578226821723398,-17.18638224012021,-12.3559895757322,-15.03938473035733,-15.018734681084982,-13.791794435493294,-16.51671751915163,-19.908892835473086,-11.940057124310863,-18.167598974950394,-10.898894617775277,-11.877085094080579,-13.989627288830741,-11.340477114272732,-12.907328426608228,-14.147303502516877,-19.488536181601994,-18.113231635171424,-11.271878923004424,-11.635932618775456,-17.289384383031916,-11.705637562183302,-12.596789793141824,-10.179723882523554,-18.220213836788993,-10.40682202397457,-11.051079900191016,-13.636988542792034,-14.733520644042418,-11.696980667430418,-11.668611310640918,-10.353861408232426,-11.231792270254694,-13.459138385755615,-17.76677047095269,-12.904407545190729,-13.161186992926698,-12.366195546758581,-11.297171865289432,-14.592531570214405,-11.489179392878935,-13.842786001224416,-10.362516007376598,-10.646102074733271,-14.861340896032884,-14.80045998385086,-11.492769734027581,-16.641961491096467,-14.485330385963396,-19.138545041607763,-13.73574018599977,-16.1399289166407,-10.188521548156732,-15.820042449673245,-15.993093292132286,-17.97386482295806,-14.452816547337527,-12.871102400748342,-17.89269121593341,-11.089259741378083,-16.19556277779711,-17.138608547111613,-12.05047976570659,-16.67486166179379,-16.530506024192924,-14.410259235302991,-13.563116416145895,-18.9355695651053,-12.08748412939551,-19.18736473860061,-15.242252877436957,-10.371561993658426,-13.542009008145556,-18.75216058083076,-16.715643693003134,-11.685509413014561,-19.674217094650984,-10.579211516143165,-12.388155776771246,-15.450706147454182,-16.685279228520255,-10.788575298494694,-17.612837613496602,-14.613290910103158,-16.2982014871275,-11.783863301869665,-19.226718571514787,-10.373106274257957,-19.80109657958815,-12.407042177418878,-13.751029137237156,-15.019668684544293,-16.125851971666723,-14.110003400051742,-12.365785485613623,-19.088093657585816,-14.806868554685193,-15.9713886919859,-17.45601741360451,-17.86524412119362,-13.7260634090563,-11.78757532323064,-12.851162353762923,-15.84102059037862,-19.268046601892507,-18.78047260223078,-11.075654346578565,-10.13378911467967,-12.683020190449483,-11.655901941263364,-15.551810786510687,-19.32972467132197,-17.71777006220381,-17.66545987780115,-17.402378304927208,-12.395887190578676,-16.351556621916185,-18.13791821741865,-18.09769474694543,-19.788457193101248,-12.367927956424104,-19.47389138136664,-13.139982185292938,-19.705439546888172,-17.290490119488766,-11.145457915846919,-10.35454245562537,-17.902000942669495,-14.768778834885172,-18.018402474109475,-15.111290404807107,-13.27000284356911,-13.385987848632068,-19.656667234416993,-10.78695212105577,-19.13870536435857,-10.099164233727196,-16.168262650231416,-10.599072715607132,-11.220204604668172,-11.539639715028319,-15.273835624298293,-15.609791114794207,-10.068090942067867,-18.80841895459978,-10.53835244425197,-10.01389045814544,-10.999348178577616,-16.263508481807854,-15.113059816928292,-19.745745637997498,-12.896627318851198,-16.481446477360596,-11.080711632655975,-14.583617524361191,-12.767557487572127,-12.015505235197653,-11.046097543053111,-16.426405189965735,-11.936501852639585,-18.122277985685265,-16.45175656661354,-15.908471423187775,-10.248501700358293,-11.522462395943824,-11.694005847384524,-13.056308654671787,-13.453434100298745,-17.859402741061196,-16.96501135413454,-18.27451275771025,-15.76536531666536,-17.37626731724854,-10.437265625335897,-10.836735564023911,-14.61002524566771,-11.78059901979921,-10.1170762360999,-17.219412961488267,-15.147317191579237,-17.42015105618497,-16.440572631589664,-13.083602136633974,-15.213237235818568,-18.30917903560678,-17.020795443875528,-16.968602618596954,-19.5427635093569,-17.04118884711794,-14.242845484362157,-14.985315561807106,-19.515681458468595,-15.006136118815729,-12.311134671826071,-15.408512398693915,-10.212696038807055,-11.686626496230897,-18.622708886689217,-10.604481425066496,-15.793056281325752,-15.185599545231474,-12.322322712741453,-11.72238263537228,-11.183512960858323,-14.992943955996953,-17.7131493082843,-19.481482366169466,-18.500227239212716,-16.82757196701163,-17.17903584552763,-14.420969499496765,-13.591928178150148,-19.648916602242963,-12.110198209491806,-13.712982221411147,-16.711299000655938,-14.157202248032126,-15.731824032313558,-16.462264812699566,-15.404286280717123,-18.98683441948904,-17.74341881427647,-18.645817115607734,-14.825177548757381,-18.523498588547287,-18.94115682526361,-10.870096926333165,-15.550883594726132,-13.820210496870772,-15.70267779294159,-15.13757703228526,-11.011892111832564,-18.076444459016205,-15.328871537799024,-16.359962145704934,-12.506782903379305,-16.87747130414149,-17.65871149122585,-18.38217264364674,-16.09884349969725,-19.894446577692722,-10.621198943618344,-10.661143462697929,-15.825239353275082,-15.935469709510734,-17.7391895544178,-11.654436347746993,-13.268654764819017,-17.748374919752226,-18.188670904988854,-10.481363242694307,-13.284871904993743,-11.338755599696967,-15.880852708615068,-16.939099705302112,-17.137683362729852,-13.768503123954831,-19.56540221750695,-14.827345133377317,-17.622737979444537,-17.410346514432348,-16.214317094835828,-11.256855714072644,-17.270147172483902,-18.893712683329614,-14.903383349353664,-10.922380408080896,-11.972768319358858,-18.626516341593668,-12.090146629548817,-17.313427605616674,-14.564644554199484,-10.83544183053868,-15.352388858163387,-12.437037905818089,-10.02497759888415,-12.257027658599384,-14.80325879167612,-16.347871011570344,-19.327705094293396,-13.002921569310997,-16.520516455569375,-17.554074872233226,-19.09222558849548,-16.327503307223836,-17.602218507798536,-11.890728542806325,-18.102161999071033,-13.132921123532748,-11.066725718649742,-17.75060008666353,-10.039345660814043,-15.76409302526137,-16.906703992542433,-10.53267052974316,-15.158048455768263,-13.679464396424576,-18.39318940021155,-14.915735202709019,-13.526144171660363,-19.507304689417758,-16.50534178174273,-11.61109667879983,-15.959522015477305,-14.50333442594081,-10.868143878831354,-12.619816557541679,-11.256102307496782,-15.547342810029914,-18.877354444740217,-15.676429118688054,-18.82254183150971,-11.793566012685044,-19.427095879251823,-11.453264178662861,-11.528219504154372,-19.608054406987556,-16.071187922583785,-14.085326915986897,-14.310390341254282,-19.813232731575006,-17.64329779207719,-13.441495983562916,-13.040835985017749,-17.644765194551496,-10.361427625334048,-19.59117634091112,-15.580981432895129,-19.67745699705125,-15.875751269616426,-17.61677134501108,-10.162910151514101,-13.15811559571937,-11.490242865431082,-12.488959722937231,-19.0013048327539,-18.914507749344075,-10.871365532798336,-13.701381766295906,-11.032222090119179,-15.6557197144852,-10.59742092678272,-17.822137732494888,-15.668032245074004,-15.280284953290483,-18.751944267829252,-16.850104454699597,-19.564761002852382,-18.206964822368697,-11.048551646279241,-10.948948993785644,-15.238360112261615,-18.78940248113682,-13.034647275101701,-13.006818301510833,-11.643789480294933,-18.962795619738802,-16.663184924632443,-12.22176007150648,-14.360199128740396,-12.880903657038921,-19.099778600076778,-11.257981113196415,-10.736500932223219,-16.562467054449332,-11.18616298685266,-11.962522802769204,-12.962955155173345,-12.347817230118558,-12.943750844161816,-13.14840850472792,-11.198849634725958,-12.30601865633723,-10.145217882422802,-18.820459891980533,-14.462587811039613,-12.81262853778111,-17.792715900249906,-18.461947423864075,-17.469141731209096,-11.889963187073151,-11.837322417346456,-13.17473117150598,-14.589262488963099,-13.750457121055597,-18.422770728777348,-16.698104823712207,-18.07910064265381,-15.72741136691775,-17.177990269606553,-10.884996415124961,-14.993427238240818,-12.962305383904644,-12.540725473493401,-14.751774401965676,-18.848803970316126,-15.274783146149167,-18.575571405969235,-15.303741464459845,-19.7781268990836,-12.447303974781928,-13.946770977985192,-11.936829545292936,-14.317250073822436,-13.464396894774083,-19.696506053234415,-13.253272310898602,-17.803029216936267,-11.817476606315665,-19.767710578002497,-18.418638671872973,-13.985463212589632,-17.49121678206413,-19.08530510310917,-16.0504590017532,-19.307538370832,-17.21440381171178,-12.603367447401975,-19.937521728001514,-19.917697499662587,-16.158161633749447,-15.137369240681267,-15.931275937947657,-19.36882290746369,-12.699671395388364,-10.285328094485454,-15.877279304763245,-17.103976454162012,-10.829444068656342,-18.62607381462977,-11.9749866149964,-18.57136123581744,-11.390184816375523,-17.70676717503207,-12.621548577550769,-16.023204009889874,-18.01276862303267,-17.575267279356265,-14.482754206000033,-17.125089990173354,-11.182587858734863,-15.395507245561246,-18.678428598697145,-12.105340672753613,-17.575748585010654,-11.167201948206282,-17.251269157945835,-19.51436112606781,-18.453698539544366,-11.152756849765936,-17.551291978189262,-15.059337174826286,-13.618413459790254,-18.558923771814854,-16.667994037275953,-15.465046468875556,-16.06659437839571,-15.702481246877111,-17.462120560872098,-10.104503019879292,-13.060193438600853,-18.31654328527273,-14.083771009051977,-18.202203760708045,-11.480026999153594,-16.323068106210716,-16.398619571253434,-17.3230455134791,-10.070743831676939,-15.803080450369878,-11.311127849491792,-10.847853334011418,-18.854513295379324,-11.313470159921284,-14.523845053837142,-17.06999207776149,-15.53009081187058,-12.269118718519302,-10.068896740520776,-16.043617258739378,-14.995483890031602,-16.775258463814467,-16.2528541085369,-19.59471472705852,-17.402974543117466,-10.1376712643804,-15.40811816005322,-10.875179056186317,-19.13187617288948,-13.707519296146124,-16.47361418643843,-19.277950503721154,-16.1144197483513,-11.022431777825016,-17.227874893010615,-12.880809758863087,-16.769155391909038,-12.046907178580998,-12.391676646266044,-12.099456040940595,-11.421090886458279,-10.114429865888395,-14.329362026808614,-17.009798660986387,-19.641921237664157,-18.375883667752746,-18.185369447207652,-18.393440050510964,-17.993739958285943,-10.55539210823519,-19.059527492942323,-19.228198191396125,-14.15036357719266,-11.939459116725084,-14.994884667646037,-14.653130540903916,-13.8438625433393,-17.827139843069617,-19.542675484812765,-10.69917186817261,-16.819487019987125,-18.363173296731304,-15.240918811045985,-19.24589350778723,-15.738955170110941,-10.970864565413434,-15.907721344374576,-18.270309463748656,-10.90930856848946,-16.347546485082326,-17.94672875347287,-18.415805142101263,-11.768773290003104,-16.22335728384581,-19.55922515952359,-18.30691433681833,-14.201872705778982,-14.612656195950702,-10.251790101150593,-12.724275942628772,-11.143611696602292,-19.434483797927495,-10.892753468001903,-14.837414412167602,-19.62767641478861,-15.574240812634802,-10.661721295109812,-19.52002486696963,-14.811801987625437,-14.754968089712694,-13.477875495089108,-19.194004726544232,-13.929312883345332,-16.976392713639427,-12.569896970112707,-13.565933241389125,-19.32867206681728,-11.331081167583099,-16.561714371547247,-15.524652739149598,-17.505935289344833,-14.915725789519072,-11.667458158785454,-13.111779111859656,-14.277645231935818,-13.026530832534409,-10.424893303891505,-11.31643958910994,-11.747023174779086,-12.136304205047587,-18.963174295245867,-17.909735778238833,-13.206702725028418,-17.93572070399304,-10.870516992545214,-12.363584928344649,-12.837908268288189,-14.303487956254576,-11.491190763979823,-17.57469520554408,-15.75764169296377,-11.723675712878144,-13.152470904601172,-11.990538059621496,-16.107120670860343,-10.529869716065487,-13.131041617988114,-12.95630125958861,-17.259954631418115,-19.34867255022079,-11.924612222748415,-16.26966959498389,-17.66052508957387,-16.111334198507702,-10.941989374969214,-13.9054838475879,-11.317339277754932,-18.014734067635697,-18.86325723509878,-15.7785899733769,-15.10314547191552,-12.803004523334742,-11.455968256358046,-17.245293402625233,-11.250229241057625,-15.49312906093296,-10.557935405042343,-18.605911292392413,-19.912533979095386,-19.95049376923526,-12.960101822207443,-16.67434083879658,-13.86850975748817,-18.768516280800714,-19.623936343937267,-17.301617119945146,-12.277103463465659,-19.533352377061078,-13.560428295736202,-13.964129295481518,-13.702790445902579,-15.746812287282093,-14.069172981918431,-17.062050827394263,-19.828802759020544,-10.446744931777731,-10.196390133749471,-11.225450231704029,-11.627598454469156,-17.254398769014557,-11.076659564587747,-19.96574147997057,-18.030298348284546,-11.466339665207933,-13.536841675769695,-12.282360125242954,-10.087834135750516,-13.061818833381647,-15.908619969141817,-19.977008048567342,-17.641347514914397,-15.062804153003297,-10.958338399410923,-16.51386964465466,-12.582377652584047,-10.800394917549088,-14.596260314542924,-14.346806371680804,-13.874210126566016,-13.166339103342107,-17.648048356175693,-19.548288493994967,-18.080714636736403,-16.056093070566767,-19.603833402737475,-17.73965884769628,-12.05970384902297,-19.42706335358739,-17.983706360316972,-13.499823925349375,-17.730253484765335,-12.005832194406045,-13.598629366195823,-14.611956484520082,-13.368397630308044,-14.162984884285477,-14.074543421139412,-16.203426253011543,-19.8432794075455,-18.119520056512894,-11.234730182806342,-10.646262740132508,-19.830510757814555,-13.254962423612145,-10.804936233194862,-15.959076617546042,-14.15133193678346,-14.287951750722472,-10.396990775973283,-13.501700044713143,-18.175684610925927,-16.301434670582754,-12.93255154324247,-12.002335040244464,-10.992370481771111,-16.81434757760841,-19.163745656483787,-18.4118961381651,-10.161617450715553,-15.383837441919745,-17.015025277629896,-19.117894302352685,-19.55890732769412,-11.576720842744248,-15.471187560684413,-17.20487854147563,-17.841131462235115,-12.079099202715284,-14.597524095099683,-15.045078388212453,-18.36296529682616,-11.406216682052914,-11.263582355837077,-11.193778317593186,-15.103438163548727,-12.814037881222156,-19.05888358139017,-19.757081984881008,-10.593655267514102,-18.83389967472828,-19.268518690659423,-11.36379024312119,-13.988688587165479,-14.689465052716596,-18.628220304385504,-11.797172734246825,-13.857119553955714,-17.06104587150763,-19.110015311826253,-16.220756613725328,-15.997665888352316,-13.20585240762243,-16.303693943674432,-17.42989058457377,-10.907139287080142,-12.570825741702851,-11.86601611713333,-15.388914004497348,-18.506379376823155,-19.993416539663947,-11.20132802479482,-14.266491386268713,-15.000406176928848,-13.599850003821718,-16.126730884243948,-11.92095286539267,-19.783088902184573,-17.609654972236576,-15.267544385669297,-15.871767067359194,-12.677201903856673,-15.811115200428471,-13.466569532866561,-17.98045922278804,-16.20695387562632,-11.214632337956203,-13.84185223675831,-11.299649112116143,-13.175287552944372,-17.293775054966023,-12.953384293298889,-17.73633020907213,-18.048291564541184,-10.187216581905485,-13.49259592170047,-16.973124727669124,-12.432232858389867,-11.564390993436866,-17.07270359928841,-18.008010162490013,-19.18288334023281,-19.842948088517844,-17.27053658763545,-12.202266713411074,-10.815483379085489,-12.622639486971854,-10.903199739882917,-16.536510682553264,-12.199790766815044,-19.468267937902958,-12.67479565847415,-11.363553663068489,-15.459343614924332,-17.217070827878192,-15.853694550013556,-14.553250340586958,-18.699535349394093,-17.989907673926115,-10.424779924157786,-11.32241886894876,-17.29418006775753,-18.9727966955411,-13.056035974892264,-19.79483069219779,-11.953035765290725,-18.730573971105493,-11.5275506287887,-14.47382644780647,-16.479656877844974,-10.960842315319768,-13.48473769237752,-12.021705238808622,-14.326585629113314,-13.39826357137116,-16.805330921170864,-18.782469106846122,-12.109240814142709,-16.83077098799305,-14.508075633031684,-15.236313063389149],"mu":[4.967007521119793,9.913951314107175,3.002396751965948,6.974668804129312,3.8959642822491647,1.9680411793818675,2.932567907075303,7.777019425907654,4.254700821268653,5.621912093571735,8.86098505904511,1.4184827605527195,7.669295691011058,0.08972828772609853,6.426796241728951,6.580067412331221,6.0990738360023204,2.1016523511889362,1.3797161492637944,8.595572525458559,2.908687376472916,6.364544498102333,1.4126339880296435,7.522443773226719,5.691666209792587,8.039168285726081,7.0956017286185435,7.845825526926498,2.3521265860963725,2.6081371928028685,1.2015103883289235,0.5791063127715623,1.8365964555113012,0.6356571778483922,3.543047797779939,1.6112214579591155,9.03906970105589,3.0551598680233316,8.789609300294439,5.516184020697628,1.8844789872192025,5.39349862063649,2.7877858717538695,1.144148404751233,3.634921341948276,7.714916523367483,5.892956457635448,0.07715027107516148,1.0226305904496669,2.2043026109196395,3.3846103097976266,4.262074462506256,3.786775414361978,3.1021802461706582,0.671559175795915,7.6409220295214375,5.591016773081261,6.912080736220312,0.7194839618618709,4.004807042440528,7.106983466574008,6.940945045638176,7.21514261204608,7.529421543842734,2.6152676961830768,5.733870922537343,6.332009864168377,1.7370925078317168,2.022841275202114,3.258416242948816,7.71492048742828,5.305137448568027,1.7162702013193298,9.229251118511655,7.403489828142423,6.856078076716255,8.50076179225503,5.5816395361741815,8.009308623710108,4.984876274324764,6.528588183967825,9.589431790188495,9.748045918905778,5.728116051608724,3.3553344804724783,0.7537419253107047,3.4071893924004493,4.858551569260041,4.913139148084302,8.622167355790024,4.022411896927238,6.240492652890066,3.7362906457407385,3.838029952566684,4.48938106336191,0.1473735480843863,0.14875688621095895,8.316347786770429,2.472507856349797,6.330597152321957,8.040709202277244,1.2822000794772248,7.080409030166956,9.535563764422239,3.761943099129188,4.715663840764255,9.33570637066246,8.897324672262954,0.8111746955883858,9.93217735132735,7.134513510687062,3.249881977547282,4.3423507501147185,7.18208948895358,1.6916399750897737,8.210686526574658,0.7989965571890112,1.3891503142551165,6.760237909367788,0.5424892345227983,8.539963731514014,4.842892163222952,3.1165624335110476,6.358080018399638,4.725534532150377,0.9805393847621069,3.4410090114889913,9.91183795200958,1.6438838975475845,8.553249706931787,8.172716572892591,4.274049875025463,2.869274832618609,9.464911386760404,3.4904373526096344,2.374545940886017,6.237255190933116,3.7874200323999485,3.601104091646843,4.1310216723008475,0.16461949589818614,4.694068221699186,6.618527993317245,4.2941712779191725,5.220113654844132,9.336148183604077,0.08717676704114163,5.7907249517760935,1.5085070552856261,9.585400481590032,2.1999755417389943,4.9990049220500214,1.3727872859420742,6.7789320271425035,1.0535870909479916,3.6516699968474886,4.37984052048966,9.578527576174718,1.132917148879149,0.2544537586763451,5.187741957354149,9.627038033893957,8.276848566260384,1.2447486218877168,0.21517071753044847,7.697344668973294,8.04134730915077,0.17323641414420887,1.9797549917706458,2.609677267941035,4.6562322610873474,0.30321758243821106,5.9452114834380465,3.3493146266496754,2.0911016932509496,5.035414792060493,8.889040375344823,8.575776031987308,0.5365691410383655,9.720260700802811,8.441491952838549,0.5614649440668806,4.944736257098137,8.517146516360324,6.797538632189825,7.626685437288123,3.1789183551820055,7.262812049823308,6.607493502515512,9.156211089306867,2.6393848471000303,1.426402118785124,8.724621200358273,1.13059641024585,2.462785453383012,7.956473550141688,2.546916678071056,0.879161880399939,9.066390359753173,0.784185853321695,6.462294368976796,9.079221010838122,2.13079996420799,1.046905646564824,7.491110670954688,1.0473681970554871,4.786225195978191,5.279515966989646,6.601425697727771,3.5209353884256167,3.185371376046886,5.770763521506542,6.1174615553245175,1.0429818679743152,5.456071949083197,5.081721217724764,0.009399424911720189,5.8539232481808785,1.4385512505169706,8.637280043216698,6.74747304603412,4.964210578380939,1.7005758151496697,0.486178395269532,6.128687900972219,4.810332368460484,8.651650945973264,5.329049997423909,3.6926817604086892,8.305369282490275,0.22755633833985156,3.5231584717444475,0.7537247088480736,7.803529640933149,1.2322120841948703,5.703199778584396,0.1299509139948407,8.312407912055031,1.5188350624723523,6.852080352346022,9.502993263451776,6.399002909805338,6.093027028303874,1.950422843845152,0.44959462150839125,9.750628486297607,5.851290451832787,5.042090283971126,7.287339596302735,6.370979170057128,2.7603558657003835,1.8220395295156466,6.356765678460783,9.386208171495117,8.478230791666734,8.797624469538816,0.26272503261816516,3.504523471080172,5.47104433381449,0.10325400351815395,1.108406732469771,2.5794265724082077,8.602254352316868,4.567556835107651,7.795462029644624,7.89102794430333,5.912394344253185,4.52476599610093,9.76734070627016,0.05356938728513727,7.686592421461038,2.3129652617915353,5.293636806630742,9.609060118641635,7.251003117105014,4.818885775504036,5.24798819196276,6.531947966378109,7.5076172748187275,3.390371965618799,3.4965950023391668,0.05712820567201238,3.923416993321236,1.8382041666257254,9.63104098508368,6.432864772523292,6.6114078351042105,3.1254696793831616,7.357133215139711,9.718042474400486,8.542079247330673,5.061940954599391,5.076686372052482,3.62532558519028,5.998864647939676,9.66304321783583,1.018846866888592,9.666650345980035,2.2114709951963274,1.74022167089811,2.3387791545806524,3.927842497283658,1.4777850320970143,6.866253859588964,4.990261547073313,1.942554871770521,5.584597481710976,7.064579747804012,7.956050908270475,6.1242423354121245,2.103135943684711,6.766805538109921,0.10537060319556701,2.454329134997568,7.683967449910125,6.798937322267418,4.698768306687191,1.5354528803148249,1.887314705798444,6.580973210300273,6.48997419777066,9.152333311339136,8.105587321075427,2.979026605087103,4.623054090746203,5.77203240647397,0.04486953289838835,3.5076575886744132,9.371648652210254,9.790341227771087,7.624141453872559,1.430302971319295,6.756720703679154,9.873032273550326,8.68980648025264,3.0610988051705657,9.518420992811397,1.5249940121314687,7.03339733564362,9.373758171265248,5.520808590462847,6.432433982183817,4.633334303536789,9.416287682700544,2.797871430294603,0.43846967184455243,4.286436255103522,8.515807365418727,2.287458493346619,2.084168260481185,2.462548961980955,8.80476751442794,1.9134879755242706,8.51023313384543,8.078352423583139,1.8103233790419893,2.078468630555703,2.0534409643290563,1.8064508406307533,8.51610917205882,9.376222650038857,6.114097829349838,0.4020626068898103,0.5878853910285442,7.477957576453502,6.030506417420012,6.377682174701979,3.916057044943093,8.649225888960405,4.246022974824473,7.32654316157187,2.592293800917511,7.412492826065417,6.586695375271104,5.909489829668814,9.868439375771796,3.172931784979718,1.9830621327749332,0.5180051292885501,3.240798371744744,3.1721319283106975,5.897299390545139,5.252375460670844,3.388276838905211,7.253452258153413,3.681238440393333,2.655224198971957,3.5251962105662327,1.0641823059619537,0.8669839092648224,3.945454426391055,1.1834666071918964,0.23372239069477718,3.1944729663514115,2.408211701256404,3.389471708590188,8.627785555977034,2.6789589057135577,5.13172989634028,5.231591172908048,8.84610648866463,0.8610778626029414,5.966808952426296,0.8055610555176429,8.095716885755866,9.552438168852806,9.202217332200018,1.7307316978024057,8.745466005706273,7.686013531889573,1.2576312893902264,3.12629597081421,2.238084458151106,7.942241988582293,6.149927553812457,7.768727024085176,9.361188496102958,4.971005277586398,4.142299936872198,7.669532658912461,4.183573448710716,9.00509677039517,1.819417023565908,8.666557580797967,5.962115018195641,0.9339887959447157,9.679481481999677,8.207840661964106,8.2969536282653,1.2777843304166092,3.022686559892185,1.8107101813139193,8.871323527679424,1.9970289027239452,4.304832004277481,3.446759479713235,8.66057929466858,9.538110429824801,5.808805015238095,3.2367642705753963,3.9514691815997627,7.407812648311875,1.8070367060642623,7.816152444694541,8.171011792248686,3.2151447430280333,9.169448713327498,1.8062869355974898,6.419207954163355,9.615983320122947,7.197430856144771,2.1488264428330894,2.243726669538413,6.1511889589840685,7.718627335844348,1.1485136506028515,2.784522043862061,0.7631408331321587,7.217131114536526,2.5883900529010195,0.85619837894086,5.478309898787157,8.606350842773294,1.4797189587516724,7.84869855304406,6.966319999436803,6.416496171081034,9.004050044062984,3.0365353603349288,4.604818072603116,1.9827621818238672,6.749314558092547,2.158236858802336,8.730434274850987,1.4564320445527135,1.9334699431344915,7.823809260224365,5.682133385865058,8.236874026249906,4.920254948130629,1.2656044206484052,6.933502637192454,7.698575303788104,6.01884454395432,6.738191143347585,2.9821362235841797,0.7612896827277682,7.46391034153419,6.4782934050661956,5.73026652227491,0.8322093847881429,3.5565384873065753,1.6776051790167523,4.339605609451946,2.790366951874599,2.3119098275985572,4.0787840191303015,4.565549066668211,9.751444462770847,2.541300705653553,7.9581237276139944,9.440125356343056,0.41816116904075384,2.122558532034846,9.284430726204718,3.1479235165844033,1.5779124378840814,1.3617809209976328,7.282728330452633,7.721898584242,8.895484002158277,5.186036089993689,1.7800833866393706,7.812024103210414,7.157247759657466,5.2465255613869655,8.36915647657725,7.828137303420412,3.5665603123282863,3.9884087364444465,0.13078684883980563,6.3819391534507375,3.583907934679773,3.9732541766739993,2.1874065597398595,5.816849684995233,9.987732947365917,3.5464075064529665,2.5427647842445245,0.2606347726926339,5.250529593744108,5.338191247578434,9.803173757605823,7.89212306612169,5.140743116828281,7.486173439349888,6.294443795663529,7.495976811741036,0.34515837196580357,9.400275563961022,6.773383028964604,8.184021685521222,8.279074418613561,7.1318517883355215,0.7635260640675368,4.9467258661857105,6.685210477479866,5.780812331086434,5.106860737320682,2.1125068652346024,4.2800788322951515,8.514511837847671,1.849459470650825,7.562837453332774,5.970210556693461,3.5840549436213376,4.51475067830674,2.332938309711816,7.352654694651628,1.1602170469787243,7.5302503273634365,7.21465312210597,5.738614356035228,8.669798946815341,8.267542761101128,6.925487831804526,3.537279109137521,7.5006392584742665,9.63199227851347,7.792414968240524,9.887045564884904,0.14125295877252197,3.0945727631777387,4.1620660097466144,9.226093309559001,9.324284046528874,4.798811537620407,6.362127028874653,1.19032014706838,5.639872403960373,2.8342073902565468,3.7910086534287135,4.827903252725793,7.6994133302581,9.25477861482032,3.4714423359107127,2.094575463208417,4.283828144952988,0.8822423176959671,3.7129972468593997,1.7995914328468388,1.9289900544642768,7.999856265871587,8.064992788658003,2.457844090630603,9.997075805919328,1.8426686056061947,4.610054933775727,2.5331498028342914,0.9142783121644471,6.533367421542371,4.312782720264305,9.608212540906454,9.206156904814609,9.131344290364627,4.289460821908817,9.904619095350613,9.827247722813492,1.5585094794079013,9.076100948072128,2.0836807069684116,5.666418593109839,1.8803084822071114,5.899642850029583,1.4020404688969346,9.351337946472611,4.5488634211986785,3.89084796219598,1.485453908634724,1.6983616612071906,7.620314933067409,5.376240306726931,4.51523332703502,1.6582770724924467,0.9425452380143384,4.827065942605611,3.064347301529451,5.397614922783809,0.5304891798116795,9.413714122191955,1.9471157007134532,5.673649394649248,3.7843835779359503,8.311659765909871,3.531666694919302,4.1652122184231555,1.4857588291227564,0.56401796270797,6.016688721339445,8.39066273932697,5.684310529308501,9.022449962168782,6.42606010919311,9.96211284003828,7.938921142469062,4.767974266911557,8.343725760487967,1.6445339124899894,0.027791829197458817,8.80676202008084,7.030131873801279,4.793038374251513,5.914534858092011,4.923107680978132,8.447167407686706,0.19581279784997685,5.5763138915121635,5.879678718590058,8.800358643183685,0.44796599987226626,8.416663085355008,0.38424738724753826,8.95850996546404,9.83991333434788,3.50402594097442,9.606657350145742,5.567464805977331,6.373319709456742,1.9518821786196505,7.291407286893412,7.384992743001173,9.766354306442224,9.678317208357512,5.091684189083965,9.146161123886426,5.85101245632077,3.6663325042112382,7.255538131175916,4.900195721122698,6.80571387274536,9.425189050117357,9.428236106330774,5.182870172288688,3.5301404941595083,4.2635567358015525,4.130412991414792,9.157360256923358,8.525216668994473,9.452269721995165,0.3472134501285251,4.4402465192816365,7.236295391176569,5.573303624592487,0.458380596758301,0.24260655690835575,0.7464326273807154,9.000362184134303,1.9970734167162396,9.261625140308407,8.061957329738469,8.639100647122483,7.192827360727064,6.516641511385897,1.882822404516018,4.418766500513234,6.2306432521050485,0.27828706145301974,8.68593693128005,6.224503788428743,0.37283779036384024,6.585145842049833,7.4967829316441525,9.714108516117976,9.757284157447936,4.604485533847109,7.038579952440065,0.5321201387140073,4.331321984805969,4.188571727250457,4.441930639625175,4.853696022688876,4.677510380172989,1.8908854452519197,4.935231858813189,4.371083137240492,8.27740573259119,7.729248642575142,5.405656969061501,2.8858863081917874,4.249466546547125,4.916484877969721,4.817519531665151,0.9204763238280234,6.079278031390065,3.6767830931524226,3.070623263005039,5.303583886891195,1.2205827432373173,6.866447134318352,9.088629922534672,0.00789982701183689,0.2900179100779754,6.5840733383044325,2.1714597036976,9.230085930427578,9.31566616246661,1.2777930869999654,4.939662435987826,2.815839806004996,9.147124211971818,1.013835023059848,7.103780574995633,9.704330576846505,7.779091445934978,5.858701468202996,2.1152480136828267,5.992638982625098,6.472625884041408,8.739500055240763,6.688163280033567,3.767856516515604,3.6781096959603454,2.7531196152943482,9.316976684330218,5.7289725415068915,9.822095249265328,9.979457257961048,7.935420610775388,0.25425732241706633,4.077384056751425,3.336596450745868,3.215768305408244,4.594722433841678,2.8442501666792586,4.407238421040043,3.1018858020785323,5.958268932623962,0.13312148243199484,2.394135297352833,2.7294121172227115,7.986790277301987,0.07052305661958691,4.446840899936824,6.901143138279286,8.601108935167483,9.518769580153059,3.493832902800982,1.5268513888433333,7.18522501719627,2.941132707026586,0.8420271081651376,4.925112874866495,3.3329314613333616,5.842699736027166,4.4858884724489005,0.42800288623231264,1.4314208311194387,4.903062716788376,9.920280816371424,2.9680694330606894,1.352768651588303,6.73240190891458,0.2753529557456469,8.698065828171284,6.006754178502742,0.8593744199485553,8.397635450482843,4.596047761650038,1.9697426179072086,3.6402080635357303,8.179032573562326,2.191986787760669,7.216088970805652,8.023775714118395,5.874393181342432,5.894349629389179,7.062718066950282,1.7320657159376496,6.945811484193136,0.6056403743331495,5.055568454354818,2.9172357073634814,9.654647339488296,9.83140194086664,7.099901074470627,4.040879851904194,3.3876020872111168,7.22267034820657,9.435994791134906,3.9556864427450766,7.435023980750113,2.279728838656483,4.446897748577927,3.1982818084556164,8.112063709212602,4.263101001563509,3.774335395989974,4.339814863157942,5.836821693616471,6.163310086692162,8.029430794932988,5.156374067629351,3.1091644008073493,7.24738479898191,3.5285644039105057,4.444059148634025,1.0217015100931603,8.120944218476197,5.820668566649632,7.223736310988036,0.8845171395982865,0.6604025156482174,9.235979954608736,1.933845086128294,4.331876185579064,2.3951552397509235,8.746471779770346,0.35946020396257605,6.042495978991649,2.0111940304571063,8.032495683546593,5.614455586171683,5.474456007897586,2.7711027004381794,6.1146859994838065,0.7790316724445501,7.8691207606648135,2.274187271451551,4.108634183439415,3.392205838002673,2.8950351452619194,6.2056722797208375,8.099194663652206,0.640874352955827,5.989084678595704,4.505829121962179,7.767286567373491,3.922129113678303,8.077513266694893,7.2375853285593035,5.602579765753839,5.794431064062531,4.28240251102382,1.8857709794130928,3.3701235043417666,6.112369675690474,8.18263587795752,9.243618796189978,4.28054693354963,9.503012547015036,4.149438863109731,5.458503367773049,5.84105489226433,5.5245622006711015,5.526316653276398,9.45552378350332,7.37880650368006,8.31451534765141,8.84120099772167,6.970617288659939,5.312743836505172,6.0492120940212075,4.3382222053026975,5.94702681792044,0.8874827842113997,4.833658903145421,9.021904467151938,2.6092776353871305,3.0569223634720277,4.2713390317383615,3.8497641460487375,5.272360725611138,8.075922622271072,3.837400733003984,8.078305273430686,3.530267528745823,2.636762000140116,1.110557918712658,9.277895600709826,6.186151010154521,8.294792458307255,0.6248101621517077,0.852865167993786,4.628410301071629,9.584192808898129,5.953253890396393,2.739305130511931,1.1270710300387266,3.9946177459322674,7.952057010988359,1.0876935982373848,6.354799805534796,3.684499605056555,2.7609187185756756,3.5220083695185256,1.013012214342368,1.6983701512959537,0.21439466543184738,0.5461073391804971,2.479977012849035,5.875367231215103,8.644516675940093,4.050133647023957,4.557985167439053,0.3729224596391334,2.3408484922511374,0.678055476421846,9.427045111291754,8.117487870236706,9.646705108055302,4.388680945919081,7.037759818527716,1.5081998346595404,9.946693023726557,7.773123213980462,3.172045260493177,4.976521744186481,7.0950217356965855,5.098361132922877,9.84480289912228,6.348085999125197,3.5636920184217202,5.450660573819269,7.861526257854237,1.9400160059902882,8.48388373940952,0.8641879918243478,6.516370500375057,0.8725305694870955,2.141776921394072,4.145683971475136,6.712618241658268,7.1030522641050435,8.963316991170469,4.245066767230609,0.5073911523361407,3.2209125019786145,8.778436256587428,1.2380461573732582,9.51372391819968,8.490010602914488,2.4510262531898452,5.268394844498374,8.236323039585141,4.432992194510701,5.322782389336174,5.172925340849122,1.1019405040720476,2.0339201408111274,5.465479451375101,7.8268666554548645,5.453769911347934,3.414391008225981,1.3631628979001742,1.3986858147953063,3.8671628576524686,3.267827428079504,2.226725933919287,6.992494917410768,0.8176122663729268],"beta":[1.6861007884853663,2.9209027744094285,1.1282798591841359,2.9890942772617723,4.002741091865065,0.5735526890955167,4.129265276625524,4.090285724026249,4.93231175284148,1.3247505925313363,3.4346814756732327,0.053343993141380386,4.816257335690819,0.6125458323277055,0.2883086039809746,2.4400800672746414,4.191785661966794,2.443474777335468,2.5344751156975787,4.97917394142653,4.899091562299992,1.1948168724605857,0.4122601333284559,4.45237125136582,4.001447338487142,1.1934658925421482,2.1963618300372802,4.72059421684615,4.433248599366638,3.853305048971559,3.518976230840357,3.1026695778516586,1.2883297910863956,0.967681240244983,3.080084909987124,3.337361812096522,2.8075756348025696,0.1591436569445548,0.5781075988859219,1.650236726225126,0.7559148349600431,3.9834762548048563,3.3261946588150906,0.04352471236214295,4.465583598140077,4.71177234695552,1.4154307845143743,0.7194490180801205,1.1233400001444294,2.8757489377195986,0.5912450434025252,2.865942776735886,4.647488592969303,3.579284187434731,4.466481971958133,4.249379764383172,0.19179639442955643,2.5364369270824785,2.7919309179959817,4.86490461971705,4.260629143226431,4.766340092447124,4.012176860607454,3.4890355429324638,4.266111367505455,4.163999785074272,0.2290591820658816,1.663616741502112,4.093654662642631,1.64225404167618,4.669816502886972,0.12753633362246442,0.56620162069142,2.3073126165910143,2.572593321026624,4.657819861133968,4.250311546332667,4.87193642148024,0.6232529431345579,4.765247527123185,2.833519288610727,1.3744237343650423,1.7511266344367282,0.5458216951439665,2.401983661900796,2.439985716734905,2.4886793948081785,1.2465896748586236,3.260172125854891,1.480979034247052,1.966299576639382,2.4498991228260127,1.9316264667811156,0.4480810547736125,0.38802306714712853,0.271981017982309,3.0655818440899854,3.968605340580227,4.341919889536915,1.0981140175475246,2.3541906227893907,3.333216292125829,0.5559226732594957,2.6390217040267485,2.003944533896076,0.893056094794582,1.4636611938658006,2.968729756105608,1.410532087586529,1.783152202989926,2.5955453761982206,3.7458247486856666,0.9514130867706527,4.49981380999915,3.6703461420286123,0.74949414473788,0.42871495548380434,3.224837258533466,0.5448483544708826,1.2647372870186213,1.3660367389633399,4.664705808986494,1.8162896319515698,4.018726934302422,0.6775318212319481,1.1475328661272954,2.7491452940751504,0.9027851260425257,1.450461313247735,0.37072186785460426,2.132451803734857,1.1546768161186793,1.504420348301888,0.7017392792658317,0.015197485405331612,2.7146123793038948,2.3558555146272866,1.6984107462231512,1.258258165292313,0.9328593049462008,0.9916828762844054,2.3714903893025294,0.9984526867654264,2.8157600443521758,1.1870093889968747,3.278662829920853,1.6057408321039235,0.5410453356577338,4.071552398982493,1.3901350146875735,1.0700114467931965,1.9558601877601722,2.766707783492528,1.456186473047697,4.533055270909527,3.587291787203827,1.8774144763891154,3.499156311684085,1.0384261646299664,1.5200933018404161,3.521744170006793,4.093142700811221,0.09005741788091548,2.6019101686548884,1.3597262098898233,1.6303118076802714,4.094481122824927,0.007068460637130736,2.200204142011505,1.5013497037462253,1.4971249198633674,4.972400395463223,2.1085923875145287,3.202743243779774,3.091919449687137,4.172932534908433,3.9202364663998965,2.7463124234365397,0.38411014188568626,3.8399257717269295,0.5225499110945664,1.1388659208887686,0.6142607422632917,2.0962538548938214,4.057627059772892,4.829766551954667,1.005469031259616,1.0001450946570345,4.683534145802419,1.7890097842352848,2.069339385525786,4.26644615162961,2.5593935215687305,4.464817083824931,4.503810083404542,0.34804780565195537,3.155322219153188,2.652984443876487,3.196342228036786,2.3761470557128153,3.155319847939678,1.6613877513182906,0.8630477994980046,0.3375912501021294,3.989722246998494,4.1895121404648386,3.991706356384239,0.8195552645629056,3.1639083282156646,2.511284966974867,1.7477840045815862,0.9965310147687978,4.589506555416238,2.060654478125843,2.676993506926232,1.606976007151063,3.735393737893361,0.7482101112115347,0.9361165293754847,0.04310151237047366,3.3043563629681305,1.3012593411775153,4.086315066423097,0.12098399003243054,1.6282782485487701,0.6351475291762354,0.1124511629870617,3.635705111945838,1.6875775793992753,3.9279046931576045,3.0906925825202833,2.2713720498946866,1.7187202012068636,3.1371471768615153,2.4901874930213896,0.1218053197880109,4.906882076777243,3.678287941755791,0.17158963652421866,4.555923429654117,2.3628469600544877,1.9764075752615018,4.836688221109576,4.812361842631448,1.9075848970624931,0.2226679571013157,3.4467674131580983,1.2816191080172068,2.668625838099714,1.2174941986807508,3.042531612252195,3.8227802292040503,2.4192496359870397,3.6360917205573107,3.302680774725182,1.2407003078090795,2.1358963552185606,3.170791427741176,3.624475114746649,3.4108029104362956,4.884512294481934,1.6562399553418927,0.168953148262454,1.0805423836252248,4.493923570684234,0.7946540963331028,1.1550172282116544,1.0155089562560071,1.1130013371223113,1.753242231390798,2.2192281974442505,1.359338202871917,0.6390148499632797,4.272323693228151,2.013358793319213,0.7175603817126741,2.7460991783507493,0.7533560747433987,3.0134687560736797,0.36031103476652726,0.855104326399504,0.03974009521118593,3.8361108969563196,3.8784148516230808,0.49709250332945265,2.2340306112206942,2.6267784483637846,4.626740790550917,0.06229711775731728,2.8493688964775576,0.3985634045716935,0.23241891719860686,2.0018118224295844,2.7004979800726217,4.8810080723130955,2.846135914782054,1.5961001923086104,1.4601626830030157,3.219700207391125,0.974289038196211,1.8426447007979152,2.4183684307015643,2.5779321575504497,0.45929303621791373,2.493693283090903,4.921149160828304,2.24313892564627,0.7347440978441955,0.5615914378429032,4.784854580074579,4.707005952026533,3.417195520079812,4.333373184417343,2.395843234647298,3.9591613758668087,0.07146141103922865,2.4042133921180087,0.9768462247145404,0.2477748782220346,4.376572800732937,1.2518662483150689,3.624072748067906,2.9101866012621014,4.570563739170601,3.683386379992737,4.1366678056229915,2.679773122515743,2.3129246384382673,3.3062419560312173,3.1181443683455425,1.4040465589936069,3.332004081334822,2.792672616055359,1.9227938536771116,0.1383157809986224,4.172771590533856,0.13648457936885294,1.5526535050284418,1.3297350543224529,3.9912531031299716,3.427433976242946,3.9199865988446394,2.464782374570621,1.982292822429007,0.9263866181530278,2.914761881518644,4.600235282965216,1.162323545419448,3.9088400377644463,3.602034529558822,2.0892743610550992,0.36631935305692753,3.7753334693826623,4.3682217691640615,0.24696201100165793,3.738346114119757,3.2848542531645233,3.74741187596511,1.2338523202250296,4.66736017059387,3.232855608158424,4.054128262050767,2.488849983477416,2.0151972330106407,4.62743434572821,1.0671214790713046,2.4655939812101746,4.538947162060577,2.7485139412001027,4.070498917256473,3.2377173788204248,3.5333660600931474,4.3060855178797866,3.1233544391391077,2.5107739585380173,2.49073801035113,1.018304435666224,1.1324761034223663,4.594409587404144,4.025618293703129,0.8861568754455507,4.7088473060853815,1.211618732345482,0.7037370101294882,4.516168097672271,0.6662772633594061,0.3968312798373086,3.0666367373472516,1.0587383514388082,3.5926956551646394,1.6331035953334383,1.3821786731348862,4.334539333971685,0.41284906338949656,1.4303677909526114,1.6736563866491172,2.728540443517755,2.3790068850867097,0.32272308275311024,3.794163416050631,1.726449959225811,4.977977778712971,4.053056978530758,2.301128592405992,4.150951669748353,0.7938011811709589,1.3046405752421975,0.4924639400034947,0.14059205938190877,3.8826484023712937,3.338313106954817,1.8016217700114712,0.4073001370690432,4.524282735758181,1.2108566410613752,3.441292762583089,3.3383304285311333,2.390354430239705,4.832712885369074,3.607462948885111,3.8033644864929395,2.0973807931800783,1.6244063607387282,0.4885486532620731,3.768175211467817,4.527395533614563,4.328256432683589,1.713835048224135,0.7955664634911264,4.908539821659681,1.759372541203531,2.2512187030693553,4.143749740652346,3.8433771180040255,0.01907532908898779,1.1385940042664966,0.5755984241279177,2.6191402375717043,4.91395515599065,0.3786550179199566,1.6512407964189446,1.9281333694640723,3.345807640138955,0.27318270835539726,1.2717054891041268,4.843177179319476,3.27335590088208,0.09891252644871229,3.171024553570404,3.8695649138914154,0.4514923242564972,4.831751207540304,0.0870593025801536,3.188786507953348,2.1457006195238595,4.3779624267396215,1.3871208080646635,2.625929160363932,3.2120084621603926,2.838829298302896,2.814073046167662,0.48128691562530856,3.518668381863744,1.7429949349854845,0.5002251223940091,0.3258012964802304,1.5948277775697328,3.359126646354449,4.519887175199174,4.388036173246389,0.7272312029774619,1.900124915125142,2.920005209870239,4.896311259836372,2.132689198230966,3.1503527829500335,1.0659800122674723,1.2754110336615065,0.2719375975608662,1.0681815762076263,0.38603773896449645,3.9471575637043643,1.3086339537784208,3.249192874997072,3.6728793253664005,1.961616516614073,0.4836971497692222,2.3415304863789386,3.194895423120465,3.3246132185115087,1.9802029792199272,4.426450126153858,3.938031008576688,4.757558875998696,4.550486726933877,1.0619331886558137,3.9120332795862547,3.485334992580409,4.275920273019496,4.428176462419858,3.368775052213817,3.0393963938258537,4.885249625436674,1.2224356455102614,2.3905222691777017,3.2745960019535794,2.290828718526371,2.841645248488814,1.1044004228327675,3.31624924211404,0.779523446633007,3.671374050716112,3.4803816210580396,0.213358872319942,1.0641500969048645,3.854939472993361,2.6612502869877677,2.092570460466021,0.12324878873508971,3.737363922281143,3.7911730548740277,2.7979229530498007,1.5027573279162476,2.093050662899232,3.7227641066817307,2.217305521025702,3.790150971156643,2.624883519671913,1.7069077024394197,0.18491939450332673,3.7992525111250863,4.263795905182514,4.701914546131904,3.863422852700248,4.093599939639365,1.5697142013846221,1.039766371512173,0.43105108442727524,0.766041884224874,3.1830511648700432,2.6988531167776664,3.471990214333609,4.646489113757806,2.7671280344057414,3.0055707066993254,3.168783706986815,1.9164124462564402,1.7568565919377144,3.983763433648886,0.9048926593351947,0.6722713145341253,1.6943741938662005,1.013112383074548,1.2632771224626094,0.004021916244217882,1.137768059993458,4.859015107937305,0.28861335628708185,0.9916957014499472,1.9367151472700217,3.202713667096785,0.6088658158904192,0.4494985279762953,4.553291884393249,1.507962042901786,2.1665634419889535,2.1687827337165366,0.7265648227865185,3.754945326112705,3.3336933942307345,1.6312036586446066,2.4129607019408206,4.791756936429691,1.2154332240811883,0.21529269912401006,3.4542091173513634,0.6012368564303339,3.1134890544606266,2.3578931485649415,3.445751249132752,1.6166118477320257,3.49183993675944,2.3404181735892537,2.5566428356031787,0.9511290686510865,4.866097285715403,1.295879971750703,4.518778202308215,1.6957178080865365,2.510678774617545,2.9020714858476193,1.5245709477505875,2.881738435604074,3.345243707831708,1.5049883455190916,2.8746632960264353,3.7444130114041863,4.275893049732105,4.4748288012038975,4.341121553180396,2.3650438714334965,0.7174730137627561,1.566061159771317,3.68254717966368,0.17195881519772915,4.46631934810816,0.5628071531202161,0.2989551509678434,4.214228494053937,4.074023797007065,1.0827290994831107,0.03176622633832005,3.4593911553089396,4.757022440557117,4.494606186488736,1.0141823367734026,4.924575570145244,0.7442103711250159,2.2330260339203125,0.048172852891832374,0.9796254892872325,4.530242424490405,0.2169986148764147,2.7024144698440633,0.07172481310868672,0.6002027461959436,4.741830226811601,2.845652858221234,1.6820580131149676,4.963826079217265,3.3123969816833156,0.07106648103502033,0.245893343382092,3.652883090671184,4.456331713941837,3.9792905017187485,3.0831000011466205,2.5669071613026406,0.9349510620905777,3.0654531016865816,3.0131958476838183,0.07217209113253076,1.209630631020766,2.6699847661232967,0.8530090626912379,1.419925974840608,4.1008089345018295,0.6004383095625521,0.27628108565033394,3.9625631120468627,1.5939603031090677,1.4496383238635457,0.4107272482617552,4.128815627010712,0.9766507145766223,2.0028436477081826,3.3813154175766003,2.680342518117389,1.0224190138562361,3.683733281512195,1.8272523818174224,3.5538318274637537,0.9178395953959828,1.261714439748366,3.5114936243647854,4.293711212820256,2.7786574637630226,4.033609624050505,0.23764869737438743,2.53907022613539,4.840646080706219,2.653506602887913,4.858602219891521,1.7937200296066014,0.9704087856429433,2.6862916026920622,1.2429133585927243,0.5147148569751614,3.9220433616993255,4.390186776830851,3.940256275043553,3.3413449234438373,0.06964133606327527,4.303009951198028,1.170833617391539,0.46313134112097587,1.8987569565120477,3.7568840327058672,4.8175846601054095,3.9067165740396446,4.844761555301513,2.497655648060598,0.09353819326121005,0.48193867298571447,1.4353292945259066,0.3184362090717141,4.291548386880856,4.52279494133338,0.38039132964807765,2.3462305760503166,4.48447783424945,1.2049150833170952,2.4296906669449356,4.2923717444997065,2.01847529842875,1.6121224411596258,4.60168746343806,0.12898372092875587,1.4883349480367558,3.280409208425877,4.24186748738692,3.422551452024133,2.3302684445227184,4.728549140024101,0.2941034179036506,1.8359328455851187,2.631101770165032,4.6141573435058625,1.8193155606084987,0.31943705485973806,0.291002902844234,4.47391496169434,4.386267994270491,2.3751472541434038,2.835713476486271,0.07066308824020151,2.9502013876736055,0.15122627684285073,3.1275288900973086,4.844561138912702,4.012250820300613,1.6661763021289422,2.5228016689209767,4.294256963231808,0.8121819578451805,2.4219094436836364,3.2392796940859867,3.517056981813016,2.691228511923518,0.6010135142998985,0.37402498660202066,1.116730839653055,4.544892002199613,0.6711920759961165,2.9354032356749826,4.704265270937526,3.360819903056619,2.3750171056144573,3.5643316895804578,1.4007760630856059,1.5482483576455586,4.913087827617295,0.8037589244644672,1.2282889592036483,4.2789667324959035,4.673654315182141,3.812170201354579,1.7286583592826243,1.5759682675107078,4.843861875936079,0.7007588053465397,3.214887019133379,3.8559473588527537,0.78327310496763,4.154768477560613,2.6218816560051805,0.763494913523245,3.657835745966096,0.7436880462566053,3.6441048829981404,3.8769922755740804,0.7918541786695144,1.9375537855546654,0.00639726234008986,2.043809898923433,1.3235905762213773,1.3519379476472015,1.7855649511836125,2.98012700064036,3.6146148040692405,2.221005186025984,3.7307407364725598,1.1640301624938842,1.1477140769427374,2.9939296167938845,2.717541110588826,2.477118597859672,3.68702468958364,3.103476620839957,4.170165948314539,1.620445818992523,2.7369454022054054,4.5206775428981905,1.9561920789600395,0.3827150026290316,1.79222540149222,3.0319296493543115,3.6782897754722566,0.6159214538192281,4.169523322409234,1.3729762384266453,0.3571453145247028,3.4688773825461916,0.4826331037857412,1.8200277281290778,3.1640761293575173,2.2521651295918046,3.2372443860984355,2.4508687263413833,1.2034181287199341,3.5575676258441815,3.6496664514211483,4.493188197312554,2.0603387095456083,1.8904821624469559,1.72403026227971,3.2708461459615323,0.3224383379167173,0.5228307920679309,2.2984183706689687,1.2184254535248107,3.9414259730106247,0.8155912121534703,0.8858126890344131,4.19778359306931,3.4544059310094832,0.7850465461360467,0.9410936985471452,4.069754409326767,3.83390119290665,4.540067747777901,1.028431104623344,3.3408012206782134,2.1046657440535697,1.086278170541115,0.4726415861722977,0.9858064685116585,2.5317379360686774,1.995519173398136,3.4710490087196955,3.8281762879642467,1.838787895003745,3.5138613663399285,0.3275289792270819,0.9988044515324945,1.2001672268442198,2.826216856686173,1.2946743198893773,4.073977257075148,4.016458462714195,2.7566477590593133,0.52036986608052,3.3026046297539766,3.3148885962869548,2.865224084944511,0.2749498896579161,4.830982697337053,4.809829085177947,0.6786918976535061,3.461219583221784,4.866166790737996,3.088620449406365,1.912539285239645,4.358741046995136,4.638366611276108,2.2821967689588685,4.343032925417482,3.266644380257775,3.986923184611512,4.795390381948161,0.943814075250492,0.27807329338099485,4.629952664273534,2.4733468129580793,2.31817636277732,1.1282356084812117,1.061087831518217,2.6185344584360215,2.534044438498968,1.4168671344179717,3.83113649795791,0.1210035298119394,2.1393529956566337,1.2605668427103722,2.8368585335637366,1.1517231549415174,1.1954780503972384,4.28368927090046,2.1948214181034222,2.8540588616468066,4.981360979439251,3.1470487612622664,1.3910793535345345,1.196007236665445,3.959197040934975,2.168193403543367,3.676808297049863,2.412437690094648,1.955476351070321,4.54478691349038,1.032647543671641,4.688042990862062,2.4812082895334173,1.5475615392082565,3.1020736212381217,2.9623507017337483,0.9656993885819809,3.9168762575481852,3.01564618472284,1.3244526604976103,3.3792277808119042,4.921502242573687,4.365384017964134,0.7222888825992402,3.6641265430064127,0.8891501897893106,0.66692253021292,1.4693457440256064,3.6751226735135676,2.333284287887424,1.6116412785943812,2.7692067628258465,0.3935596977403455,1.3731224717109924,1.9475561945472308,4.19735223242308,4.051190190086745,1.4810663508817346,3.681431417852208,2.8356109818031983,0.7301134056273284,3.855717952521754,1.429420237788297,4.561336890823266,1.2182994943308623,4.5866068781826,0.8788412263533385,4.140774140266167,1.9859701331645607,0.9379294766399915,1.1631573538893358,3.4489368519030537,0.33020140159711,4.163503844341188,4.410582692792845,0.9821165527177211,3.457557340591354,2.4100867153251126,3.209636704080766,3.5478622009427263,4.177808556413511,1.4548957417692454,3.3391073217632616,0.31259214528827295,2.310333050088662,1.2523830077951625,1.3945934912075475,0.8868277849597472,3.2749520027132437,1.2331764980977977,4.932780351516933,2.354956747402417,3.6016473374750935,3.868894084620792,1.521499705474314,3.9116466173921536,4.096995818462453,3.1997854165840733,2.2047625342400834,1.2039464319501558,0.6570387603843286,3.514086171298189,4.6774890895911145,1.410793100996377,1.3081577317148196,1.028140477837124,0.28155524587545,4.348555173597568,1.512739382387276,0.6437654743565668,2.4843911884306715,3.0264528467756513,1.7738179134729426,2.81594885032494,4.8413545825422695,2.424036462912712,4.072055642044642,1.7695333024048987,0.4530001381745641,4.756459565347512,3.2970861545333774,0.17121025996049588,1.3796943222698688,4.445929381907855,2.1686175716895173,3.4677854908263006,4.911157053411643,0.6488790065096395,3.3549239933032773,0.9523371518629198]}
},{}],97:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `-infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, 0.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var beta;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], beta[i] );
		y = logcdf( x[i] );
		if ( expected[ i ] ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var beta;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], beta[i] );
		y = logcdf( x[i] );
		if ( expected[ i ] ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large variance ( = large `beta`)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var beta;
	var tol;
	var mu;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], beta[i] );
		y = logcdf( x[i] );
		if ( expected[ i ] ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/logcdf/test/test.factory.js")
},{"./../lib/factory.js":91,"./fixtures/julia/large_variance.json":94,"./fixtures/julia/negative_mean.json":95,"./fixtures/julia/positive_mean.json":96,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":232}],98:[function(require,module,exports){
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
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/logcdf/test/test.js")
},{"./../lib":92,"tape":232}],99:[function(require,module,exports){
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
var logcdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `beta`, the function returns `1`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the log cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], beta[i] );
		if ( expected[ i ] ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the log cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], beta[i] );
		if ( expected[ i ] ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the log cdf for `x` given large variance ( = large `beta` )', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], beta[i] );
		if ( expected[ i ] ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/logcdf/test/test.logcdf.js")
},{"./../lib":92,"./fixtures/julia/large_variance.json":94,"./fixtures/julia/negative_mean.json":95,"./fixtures/julia/positive_mean.json":96,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":232}],100:[function(require,module,exports){
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

},{"./is_number.js":103}],101:[function(require,module,exports){
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

},{"./is_number.js":103,"./zero_pad.js":107}],102:[function(require,module,exports){
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

},{"./main.js":105}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./format_double.js":100,"./format_integer.js":101,"./is_string.js":104,"./space_pad.js":106,"./zero_pad.js":107}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./main.js":109}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"./main.js":112}],111:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],112:[function(require,module,exports){
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

},{"./is_string.js":111,"@stdlib/string/base/format-interpolate":102,"@stdlib/string/base/format-tokenize":108}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./constant_function.js":113}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":116}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":120}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{"./define_property.js":118}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":117,"./has_define_property_support.js":119,"./polyfill.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":110}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native_class.js":123,"./polyfill.js":124,"@stdlib/assert/has-tostringtag-support":20}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":125}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":125,"./tostringtag.js":126,"@stdlib/assert/has-own-property":16}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){

},{}],129:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],130:[function(require,module,exports){
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
},{"base64-js":127,"buffer":130,"ieee754":218}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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
},{"_process":224}],133:[function(require,module,exports){
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

},{"events":131,"inherits":219,"readable-stream/lib/_stream_duplex.js":135,"readable-stream/lib/_stream_passthrough.js":136,"readable-stream/lib/_stream_readable.js":137,"readable-stream/lib/_stream_transform.js":138,"readable-stream/lib/_stream_writable.js":139,"readable-stream/lib/internal/streams/end-of-stream.js":143,"readable-stream/lib/internal/streams/pipeline.js":145}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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
},{"./_stream_readable":137,"./_stream_writable":139,"_process":224,"inherits":219}],136:[function(require,module,exports){
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
},{"./_stream_transform":138,"inherits":219}],137:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"./internal/streams/async_iterator":140,"./internal/streams/buffer_list":141,"./internal/streams/destroy":142,"./internal/streams/from":144,"./internal/streams/state":146,"./internal/streams/stream":147,"_process":224,"buffer":130,"events":131,"inherits":219,"string_decoder/":231,"util":128}],138:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"inherits":219}],139:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"./internal/streams/destroy":142,"./internal/streams/state":146,"./internal/streams/stream":147,"_process":224,"buffer":130,"inherits":219,"util-deprecate":240}],140:[function(require,module,exports){
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
},{"./end-of-stream":143,"_process":224}],141:[function(require,module,exports){
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
},{"buffer":130,"util":128}],142:[function(require,module,exports){
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
},{"_process":224}],143:[function(require,module,exports){
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
},{"../../../errors":134}],144:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],145:[function(require,module,exports){
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
},{"../../../errors":134,"./end-of-stream":143}],146:[function(require,module,exports){
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
},{"../../../errors":134}],147:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":131}],148:[function(require,module,exports){
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

},{"./":149,"get-intrinsic":213}],149:[function(require,module,exports){
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

},{"function-bind":212,"get-intrinsic":213}],150:[function(require,module,exports){
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

},{"./lib/is_arguments.js":151,"./lib/keys.js":152}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],153:[function(require,module,exports){
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

},{"has-property-descriptors":214,"object-keys":222}],154:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],155:[function(require,module,exports){
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

},{"./ToNumber":185,"./ToPrimitive":187,"./Type":192}],156:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/isPrefixOf":204,"./ToNumber":185,"./ToPrimitive":187,"./Type":192,"get-intrinsic":213}],157:[function(require,module,exports){
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

},{"get-intrinsic":213}],158:[function(require,module,exports){
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

},{"./DayWithinYear":161,"./InLeapYear":165,"./MonthFromTime":175,"get-intrinsic":213}],159:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":208,"./floor":196}],160:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":196}],161:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":159,"./DayFromYear":160,"./YearFromTime":194}],162:[function(require,module,exports){
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

},{"./modulo":197}],163:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192,"get-intrinsic":213}],164:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],165:[function(require,module,exports){
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

},{"./DaysInYear":162,"./YearFromTime":194,"get-intrinsic":213}],166:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./Type":192,"has":217}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":220}],168:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./Type":192,"has":217}],169:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192}],170:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":205,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/timeConstants":208}],172:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"./DateFromTime":158,"./Day":159,"./MonthFromTime":175,"./ToInteger":184,"./YearFromTime":194,"./floor":196,"./modulo":197,"get-intrinsic":213}],173:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/timeConstants":208,"./ToInteger":184}],174:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],175:[function(require,module,exports){
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

},{"./DayWithinYear":161,"./InLeapYear":165}],176:[function(require,module,exports){
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

},{"../helpers/isNaN":203}],177:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],178:[function(require,module,exports){
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

},{"./Type":192}],179:[function(require,module,exports){
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


},{"../helpers/isFinite":201,"./ToNumber":185,"./abs":195,"get-intrinsic":213}],180:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":208,"./DayFromYear":160}],181:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":208,"./modulo":197}],182:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],183:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":185}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/sign":207,"./ToNumber":185,"./abs":195,"./floor":196}],185:[function(require,module,exports){
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

},{"./ToPrimitive":187}],186:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":157,"get-intrinsic":213}],187:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":209}],188:[function(require,module,exports){
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

},{"./IsCallable":167,"./ToBoolean":182,"./Type":192,"get-intrinsic":213,"has":217}],189:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":213}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/sign":207,"./ToNumber":185,"./abs":195,"./floor":196,"./modulo":197}],191:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":185}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":159,"./modulo":197}],194:[function(require,module,exports){
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

},{"call-bind/callBound":148,"get-intrinsic":213}],195:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":213}],196:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],197:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":206}],198:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":208,"./modulo":197}],199:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":155,"./5/AbstractRelationalComparison":156,"./5/CheckObjectCoercible":157,"./5/DateFromTime":158,"./5/Day":159,"./5/DayFromYear":160,"./5/DayWithinYear":161,"./5/DaysInYear":162,"./5/FromPropertyDescriptor":163,"./5/HourFromTime":164,"./5/InLeapYear":165,"./5/IsAccessorDescriptor":166,"./5/IsCallable":167,"./5/IsDataDescriptor":168,"./5/IsGenericDescriptor":169,"./5/IsPropertyDescriptor":170,"./5/MakeDate":171,"./5/MakeDay":172,"./5/MakeTime":173,"./5/MinFromTime":174,"./5/MonthFromTime":175,"./5/SameValue":176,"./5/SecFromTime":177,"./5/StrictEqualityComparison":178,"./5/TimeClip":179,"./5/TimeFromYear":180,"./5/TimeWithinDay":181,"./5/ToBoolean":182,"./5/ToInt32":183,"./5/ToInteger":184,"./5/ToNumber":185,"./5/ToObject":186,"./5/ToPrimitive":187,"./5/ToPropertyDescriptor":188,"./5/ToString":189,"./5/ToUint16":190,"./5/ToUint32":191,"./5/Type":192,"./5/WeekDay":193,"./5/YearFromTime":194,"./5/abs":195,"./5/floor":196,"./5/modulo":197,"./5/msFromTime":198}],200:[function(require,module,exports){
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

},{"./isMatchRecord":202,"get-intrinsic":213,"has":217}],201:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],202:[function(require,module,exports){
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

},{"has":217}],203:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],204:[function(require,module,exports){
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

},{"call-bind/callBound":148}],205:[function(require,module,exports){
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

},{"get-intrinsic":213,"has":217}],206:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],207:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{"./helpers/isPrimitive":210,"is-callable":220}],210:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":211}],213:[function(require,module,exports){
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

},{"function-bind":212,"has":217,"has-symbols":215}],214:[function(require,module,exports){
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

},{"get-intrinsic":213}],215:[function(require,module,exports){
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

},{"./shams":216}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":212}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{"./isArguments":223}],222:[function(require,module,exports){
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

},{"./implementation":221,"./isArguments":223}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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
},{"_process":224,"through":238,"timers":239}],226:[function(require,module,exports){
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

},{"buffer":130}],227:[function(require,module,exports){
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

},{"es-abstract/es5":199,"function-bind":212}],228:[function(require,module,exports){
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

},{"./implementation":227,"./polyfill":229,"./shim":230,"define-properties":153,"function-bind":212}],229:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":227}],230:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":229,"define-properties":153}],231:[function(require,module,exports){
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
},{"safe-buffer":226}],232:[function(require,module,exports){
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
},{"./lib/default_stream":233,"./lib/results":235,"./lib/test":236,"_process":224,"defined":154,"through":238,"timers":239}],233:[function(require,module,exports){
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
},{"_process":224,"fs":129,"through":238}],234:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":224,"timers":239}],235:[function(require,module,exports){
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
},{"_process":224,"events":131,"function-bind":212,"has":217,"inherits":219,"object-inspect":237,"resumer":225,"through":238,"timers":239}],236:[function(require,module,exports){
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
},{"./next_tick":234,"deep-equal":150,"defined":154,"events":131,"has":217,"inherits":219,"path":132,"string.prototype.trim":228}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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
},{"_process":224,"stream":133}],239:[function(require,module,exports){
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
},{"process/browser.js":224,"timers":239}],240:[function(require,module,exports){
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
},{}]},{},[97,98,99]);
