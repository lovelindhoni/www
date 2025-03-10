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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":53}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":54}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":55}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":151}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":151}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":151}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":151}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":95}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* The mathematical constant `π` times `2`.
*
* @module @stdlib/constants/float64/two-pi
* @type {number}
*
* @example
* var TWO_PI = require( '@stdlib/constants/float64/two-pi' );
* // returns 6.283185307179586
*/


// MAIN //

/**
* The mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 6.283185307179586
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var TWO_PI = 6.28318530717958647692528676655900576839433879875021164194988918461563281257241799725606965068423413596429617303; // eslint-disable-line max-len


// EXPORTS //

module.exports = TWO_PI;

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

},{"./is_even.js":57}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":60}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":76}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_odd.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":56}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":67}],67:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":99,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/to-words":114}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":73,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/trunc":93}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":75,"@stdlib/math/base/special/ldexp":78}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":72}],75:[function(require,module,exports){
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

},{"./main.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/copysign":70,"@stdlib/number/float64/base/exponent":97,"@stdlib/number/float64/base/from-words":99,"@stdlib/number/float64/base/normalize":105,"@stdlib/number/float64/base/to-words":114}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./pow.js":86}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":83,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/set-high-word":109,"@stdlib/number/float64/base/set-low-word":111}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":85,"@stdlib/number/float64/base/set-low-word":111}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./log2ax.js":81,"./logx.js":82,"./pow2.js":87,"./x_is_zero.js":88,"./y_is_huge.js":89,"./y_is_infinite.js":90,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-integer":60,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/sqrt":91,"@stdlib/number/float64/base/set-low-word":111,"@stdlib/number/float64/base/to-words":114,"@stdlib/number/uint32/base/to-int32":118}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":84,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":78,"@stdlib/number/float64/base/get-high-word":103,"@stdlib/number/float64/base/set-high-word":109,"@stdlib/number/float64/base/set-low-word":111,"@stdlib/number/uint32/base/to-int32":118}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/copysign":70}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":103}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/special/abs":66}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":94}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":68,"@stdlib/math/base/special/floor":76}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":103}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":101}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":100,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":102,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":51,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66}],108:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":102}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":108,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":113}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":112,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":116}],115:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":100}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":117}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":115,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var TWO_PI = require( '@stdlib/constants/float64/two-pi' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a Lévy distribution.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 10.0, 2.0 );
* var y = pdf( 11.0 );
* // returns ~0.208
*
* y = pdf( 10.0 );
* // returns 0.0
*/
function factory( mu, c ) {
	if ( isnan( mu ) || isnan( c ) || c <= 0.0 ) {
		return constantFunction( NaN );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Lévy distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( -1.2 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= mu ) {
			return 0.0;
		}
		return sqrt( c/TWO_PI ) * exp( -c / ( 2.0*(x-mu) ) ) / pow( x-mu, 1.5 );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/two-pi":52,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/exp":74,"@stdlib/math/base/special/pow":80,"@stdlib/math/base/special/sqrt":91,"@stdlib/utils/constant-function":143}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Lévy distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/levy/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/levy/pdf' );
*
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.11
*
* @example
* var factory = require( '@stdlib/stats/base/dists/levy/pdf' ).factory;
*
* var pdf = factory( 10.0, 2.0 );
* y = pdf( 11.0 );
* // returns ~0.208
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":120,"./pdf.js":122,"@stdlib/utils/define-nonenumerable-read-only-property":144}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var TWO_PI = require( '@stdlib/constants/float64/two-pi' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a Lévy distribution with location parameter `mu` and scale parameter `c` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.11
*
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = pdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = pdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function pdf( x, mu, c ) {
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return NaN;
	}
	if ( x <= mu ) {
		return 0.0;
	}
	return sqrt( c/TWO_PI ) * exp( -c / ( 2.0*(x-mu) ) ) / pow( x-mu, 1.5 );
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/two-pi":52,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/exp":74,"@stdlib/math/base/special/pow":80,"@stdlib/math/base/special/sqrt":91}],123:[function(require,module,exports){
module.exports={"expected":[0.04729296035746764,0.37442428660883986,0.011858929040831622,0.030069901463109023,0.0023842542294840955,0.06459546015380536,0.060741195376493085,0.007445059637830985,0.05571844997583094,0.004474794827104611,0.010872431001218484,0.06215347598461301,0.08400529222899322,0.0405223680583992,1.5574298590483581e-43,0.08058531052412873,0.06923423668221529,0.1143140516777531,0.06904511191333076,3.485811251250612e-14,0.01471610337668187,0.12430178844487338,0.0009082843221957327,0.04938424612388352,3.360543379813178e-5,0.05752326105066709,0.03650415615652626,0.05119146333531086,0.07163216360671913,0.0002376826677778797,0.03376011634450585,0.028510387000171097,0.06574811343438745,0.03634674425152276,0.055089763799477005,0.04068902491065244,0.03303428533969061,0.01055433401589729,0.2112316338443658,0.04512063912560208,0.048648192367147694,0.0021754685193933728,0.10845443686840447,0.045022454900000376,0.03902453130673821,5.2500637686141145e-8,0.005970898154825339,0.03589080394023351,0.048187912376951234,0.041891939570418604,0.02754103554012053,0.04945531951602843,0.0185632868730089,0.023203185131983942,8.038713551499612e-11,0.06918360194187828,0.20379455793051648,0.04398806060105204,0.02896727140619804,0.001631975383814834,0.010219655189210516,2.749508534747121e-5,0.019444770520231965,0.09918329881868103,4.160706729422326e-10,0.060741825726962996,0.07790027454126999,8.108829942467201e-26,0.015830987285300423,0.022873843346008657,0.007645580740733485,0.10566065944055147,0.014024559347061679,0.020948448254194337,0.01240163809854584,1.9068905494364377e-9,0.0013112957652566338,0.026612482890714738,0.04665240030263437,0.023773560575350322,0.00761742403458376,0.014171223421888956,0.02911646623040329,0.006900852871650882,0.03209878565151008,0.0034729035317930066,0.07739547920075145,0.012158667134705748,0.07291145181872431,0.005337181712553482,0.022241928696196015,0.00017745123607423597,0.00034065187400407053,0.029773309282963508,0.14961091988124242,0.06756439855547257,0.05521422642637306,0.00945404967872399,0.037204339428192824,0.07493565733906069,0.0020809780250967288,0.06004000657008991,0.04476080291937778,0.04714901691417675,0.026562041411083894,0.00015023315495290592,2.2732577331596655e-6,0.0389205332154952,0.17926172790849343,0.017482551063399947,0.070585332471613,0.019766181050103557,0.06113677893006071,0.0005100858510612781,0.04712477879102512,0.02130154813290926,0.10582887408019379,0.05502483600474487,0.12673411383585084,0.020386721745050608,0.09890897710586123,2.868882138422832e-7,0.00040685080291252764,6.665870969187739e-9,0.0359209525492967,0.0008435044182085258,0.005684016769824145,0.00036592505718635815,0.04247486917934662,0.049160047238175505,0.01173827239256932,0.003847407185393363,4.9429450726544145e-5,0.04275696319854572,0.0006199477199960561,0.05302361184296515,0.05462418349985018,1.968327124464635e-40,0.0566770733112376,1.7060521525541873e-7,0.006464825944292238,0.004708064248996252,0.021183232607459433,0.02679776676823463,1.0068519770400311e-8,0.016812977377632748,0.05981178268578359,0.02250196420971634,0.0019915558958178807,0.03614943837551183,0.0008827206038896874,0.0018912835493071468,0.02478725803577919,0.03774058124318818,0.05468470525654007,0.05475812443699337,0.018529913293925882,0.024663894866360326,0.03622231638628562,0.04978928366942192,0.044675013971200994,8.077097289398251e-7,0.0013649401668148094,0.08335922978077448,0.04189223215168052,0.04091224844852572,0.03517335099820001,0.018142904573278832,0.003381524757047285,0.05195367225119324,0.029443972815195604,0.04615759677963517,0.015006877281894666,7.454346456577326e-12,0.049647422464395546,0.046524714032921695,0.06547265532712004,0.0641117558810964,1.0492829093598537e-17,0.04308881638766989,0.014951702742292414,0.015352998818988663,0.008624081050556518,0.028935557105016774,0.11376343629809735,0.016082702408760752,0.02001815441323267,0.10361266845710863,0.02036675168547041,0.00011455445932580539,0.020158996856711082,0.00918046657743488,0.005543071851648467,0.049576958918614904,0.13971681524226442,0.02546903076374515,0.0581512188324869,0.0028067068655671006,0.0224816000771314,0.039396553100399946,0.01764269510371313,0.06323251502023243,0.0011860542037687946,0.02622578561568557,0.037834855916769404,0.0039435213265872834,0.019688531520163904,0.020392060909167866,0.020776218701178604,0.046419268036483434,0.04924332743445043,0.07501579914937936,0.009338199974179985,0.016768337144439312,0.0396822342466569,7.814790205080384e-5,0.05924208369379527,0.012329768396012788,0.057725703830831566,0.0698157456039933,0.07721822827107556,0.00010567593723439228,0.0600398117627233,0.01424810724952414,0.02324424414612682,0.05300807055330392,0.007253540569301705,0.0020455598742621776,4.110438766557194e-20,0.06238300643632173,0.04825331197498587,0.03442623276219429,0.0192862900566088,0.014791158752142307,0.04390479100249898,0.027952569725100587,0.01778264221914422,0.03104270968125001,0.04998467263713559,4.4313358086420816e-9,0.05881743402269766,0.10738125172498605,7.030072036382855e-28,0.0031930457846825067,0.010855209957700979,0.05630729146578796,0.01581859806606635,0.045003157248453225,0.007753513143679809,0.06168996995649564,0.2346776852348131,0.008825550392043,1.6598897496726324e-10,0.03131228523757937,0.06573156385979162,0.020472208922613616,0.038614411802594506,0.015634963510870695,0.05233404778509147,0.05947528488115172,1.62184192555291e-5,0.034650498730719057,0.0379075514304479,0.0031121407375637937,0.00515176459411246,0.048600485613063495,0.036288447078411105,4.452602452528504e-22,0.025788155596232952,0.027724359099771997,0.05404171021299081,0.00845698395551528,0.0446754736595587,0.010452118297839007,0.0002834570062418988,0.06027514541727234,0.028977726577967808,0.058607423456051536,0.0792169869873305,0.21309011500264094,0.04481634926278974,0.06892797784981237,0.09079035174030019,0.00038255987336826294,0.015295208955722372,0.05370827138268249,0.00015865388703439247,0.05611744073556074,1.518200897445786e-8,0.044861468263176545,0.08897949286507255,0.04322937524420117,0.00470394333512417,0.004813857535194141,0.04330073114598564,0.04969210369573352,0.0005661149044280153,0.0058990239432725935,0.06224211115138707,0.10255503113646043,0.1040959552292535,2.1494440083640158e-5,0.0016673779422103259,0.06332137802307398,0.00017661745144268345,0.03987558427860158,0.09449921299348579,0.08622685042912843,0.014340629557978298,0.056325860204507194,0.04121359270931731,0.00013946528091166916,0.02948081806500901,0.002359319809852547,0.04501286521220824,0.0575920370367188,0.04320432326423982,0.04835576898378231,0.059298670703185126,0.013267910404472835,0.05537194482559487,0.0013688269143134096,0.055276984032696326,0.004948958764680897,0.023443174936410526,0.06491637340350974,0.04284560529954124,0.0008302321294479701,0.00041802941242034277,0.10139318315095011,0.00013966452566529646,0.004739831813699179,0.0023131888171156866,0.03044244214342468,0.005725221806256497,3.1258020872128135e-7,0.03133882209545531,0.004006121824189285,0.008513496348292068,0.07077426229355278,0.002078474178035628,0.02830612035870839,0.01409201694992061,0.06146042507660632,0.033428193850513835,0.021101081932862087,0.05027259507892379,0.019997497295305134,0.04263225995323194,0.026669622667558346,0.04375516834425065,4.1598725643239744e-10,0.025327357118932223,0.05200041673044631,0.0071117892056792665,0.025927153732620924,0.08942651167598877,0.031245403476116342,0.05905130977834402,0.019216255221503234,1.201838339739904e-7,0.020026574616185407,0.033279917016971465,0.07146490894905842,0.005017050129670804,0.03230566049044643,0.13478704691668372,0.0707906220742797,0.07987782332264416,0.04009921931125227,0.01930750584250912,0.007281355442632334,0.03155952892120375,0.055071135402037334,0.0289321246402383,0.00041449685691188985,0.04584851611246543,0.021942863690753895,0.020294550728179567,0.0430742504393241,0.07283096985371613,0.02081321657022168,0.01880588376464285,0.038006345826885425,0.002581494037301657,0.046206494942968065,0.03349602377978058,0.041944709435960945,0.012774861172788195,0.007538940985456462,0.03860883686682063,0.044519194625378594,0.04726436121990767,0.10664904274479194,0.013267285776766774,3.433141016890362e-5,0.019517408445335813,0.03939617869872615,0.021659228200271666,0.040423705160683304,0.013064452280866796,0.05374319856244368,0.016072650671154036,0.019535949506844764,0.018385045246172804,0.03356559341456298,0.1255044848014298,0.04765791888346914,0.041260612259965475,0.03800974584460714,0.025500521166834836,0.040183721238112945,0.18554287944633868,0.022423390003083517,0.007117594646944226,0.03545415743150576,0.027293233247855746,0.012518061043675978,0.020140142742749202,0.05245036883698624,0.08222471471015654,0.033755439507031776,0.009445408333486982,0.016414177144289003,0.041930140526032784,0.026179068760551538,0.018901914848112822,0.0235697320507452,0.04365718998036559,0.033220622435221864,0.07218447848351138,0.034960941755897715,0.006206452420240743,0.030895855760038532,0.04284965059129008,0.04905300845923783,8.257751786017578e-29,0.013941842586981975,0.027293825939432415,0.054878211886674196,0.006084036404841126,0.009934919271760812,0.10251648730320662,0.2045166023121837,0.052135653110982,0.06532121454386153,0.0076680067802863535,0.03125669401125695,0.01606195433454837,0.04320849323021241,1.1272265903144743e-5,0.03361049416616923,0.002405513995156505,0.02135740277998596,0.01979202906755505,8.708171329187386e-5,0.04612263849849886,0.027095277124459083,0.08321379656313196,0.04660842503804328,0.014372385805063441,0.020351659299430915,0.025834065376746117,0.018923500576543704,0.0001539517704691363,0.04581387963011231,0.01799784534510534,0.09717686504599325,0.002104394612412034,0.03659206060003211,0.040261497029021154,0.012836657933430166,0.06277404530795525,0.018263270462450947,0.0030700309080405226,0.014325841511005154,0.050590336159236145,0.06135670868123433,0.022035996364467222,0.01830514378156878,0.0301949852684827,0.053260740960959334,0.02011235062406937,0.0779283202321613,0.032723355451342806,0.01917258973633882,0.024804271311358882,0.00900658657513606,0.02118234604698063,0.02128269589741952,0.030122183690219972,0.08934619684103658,0.13007728249242637,0.0281721080801648,0.07001354302000388,0.03344442687278786,6.42224118737889e-5,0.019087917892375753,0.007682477421523409,0.01849822284495487,0.05358374532248198,0.06216868776714762,0.0657853331615772,0.05802806785870311,0.041601061206664396,0.002304374631915786,0.018065153768795028,0.08075931881318744,0.05444014688024586,0.09144814268516495,0.03212947766017406,0.03841401813427258,5.007854233944463e-10,2.6732610495354547e-5,0.017899643321987204,1.1389178285614018e-33,0.17481665609729782,0.03936837499711371,0.010281265235106368,0.11555634261472628,0.06450794745614197,0.11268531012595073,0.1076780072959591,0.038917842319873115,0.01909794223145072,0.026447322145226854,8.110438506220874e-74,0.09437403779742157,0.0951117258249472,0.022418675985129647,5.0570937210103604e-5,0.012291528072610339,0.03852435563351742,1.3043605482532382e-31,0.05107607446319677,0.06264079747344148,0.002255214564389453,0.07759888909254478,0.021805894786129935,0.0015050908150463797,0.08309852148187842,0.0036150086585257737,0.04010492116352876,0.1534830864297182,0.02629611729487597,0.07554301942912818,0.05389240427849129,1.3685568386364097e-19,0.04017070174293665,0.005947365220366854,0.019670718844074734,0.014513984853132792,0.027371288723023943,0.020427731572832186,1.838229422915426e-5,0.21688355012111996,0.04841368103487947,0.03705725336209129,0.0002975357505268737,0.04835579620809802,0.028744075382662986,0.022338920198964097,0.033916100732928556,0.02962193238433835,0.016616845836598178,4.83961881301436e-7,0.015708104093248382,0.044536604260373314,0.12418164417942347,3.4785188816371514e-5,4.0264348489833324e-5,0.05409674259631914,0.05970600778803041,0.04303211253238313,0.05608220404968094,1.9854771275867364e-6,0.027665999386822467,0.053796275922206316,0.04592944337887876,0.019744346516687578,0.06113310925075616,0.021166704943200877,0.0014781112362211382,0.013778859455793024,0.06170530488725286,0.00682185331680497,0.0399962241995837,0.03253840250273806,1.5965085645752142e-7,0.025933998031229224,0.00725079072424721,0.02111846859375556,0.02392353594934194,0.026410954862070686,0.054388475097640075,0.06247613885897042,0.049791308163846824,0.04705039192308358,0.0020186029360860017,0.014762801622657425,0.046021845894259825,0.0016677586388139424,0.014071455514884512,0.055334119880693936,0.04396995870305805,0.023110457265658833,0.03682590868073154,0.05126509113979434,0.05350719503151247,0.009081536722479487,0.00014264919381664308,0.05010290285014289,0.03285780552862047,0.03420090046908441,0.02112637678387592,0.09183763985081964,0.03479077854129048,0.08544095272526568,0.020251973695293673,0.05800637623391416,0.01523577622638367,0.03174288774759985,0.05555002458528697,0.0005543748831007068,0.02960790681634354,0.05236285327969496,0.028362273295637144,0.04328311044352913,0.03103164624635559,0.029232416084265786,0.04578035613133822,0.03194445352117357,0.08092246125878313,0.1331575533591421,0.008676103267427307,0.06983524869526053,0.029377703879859284,0.1301124543830999,0.05157802756522698,0.040223019297319376,0.060066022585211966,9.47858658359196e-5,0.0021813377611797674,0.05248678439223844,1.3630176548762382e-14,0.04745789769611779,8.619399330716091e-5,3.937879795724129e-8,0.047923199721012714,0.02817780882626098,0.036649743994100384,1.3953872929342888e-5,0.08908051682181539,0.02295551426918881,0.018081194496605456,0.040444698028490676,0.0011895946500845808,0.13005227959223406,1.3004319057588248e-7,0.03324099376778299,0.024595898148625617,0.07990938114425448,0.04009867911027578,0.1032155360110768,0.022225795271745393,0.04780610375407845,0.010291398986134674,0.03774019360098976,0.04029967318616565,0.02196167802801225,0.0140820267714728,0.009396773717425876,0.009396669071277156,0.0709437495986902,0.07513553988073475,0.001646127442052314,0.129868425843319,0.2943248703099614,0.009531970034742734,0.07423209788308213,0.04425774052048303,0.016283618862319178,0.00229335957072804,0.05632107334203433,0.05494378517212057,0.04466413722564852,0.02039611209894828,0.030752886753338957,0.016294210105035768,0.05621761273816262,5.932149422852768e-8,0.01932111561934041,0.005210027094679364,0.12643533064021786,0.03889666274408574,0.019601118578875663,0.09165902787770856,0.058008892708674306,0.014770568227536937,0.021473264813063844,0.058614241866896774,0.011413698815048128,0.02450593167161351,0.241343113123957,0.23715776865463656,0.012188750388259608,0.002517137752946998,0.0009500477793728512,5.0660695312934e-15,0.2530196817641374,0.10351102716471866,0.026820033979538496,0.001988787069617874,0.034063969094479965,0.0018101051164839171,0.06486433053965245,0.034598155121197335,0.014137542134042693,0.013556904275309319,0.07819760577752931,1.9014057997589744e-8,0.10203137166982955,0.030270316514860608,0.029279424064081107,0.04915937217317512,4.0660457179533665e-5,0.06990475674717182,0.050961409274240504,0.004062363652801674,0.0055625932415695,0.00548892021523134,0.016309136492189152,0.07835127676531115,0.04309079412666948,0.04068627419674705,0.06195919904813767,0.06623710165668413,0.05024835665084981,0.06975651666016118,0.042423796976708124,5.86364345035172e-14,0.06482325666699548,0.0007497106026533711,0.18568443373400564,0.016475821579071393,0.05599713420101058,0.04611189658050159,0.04847638096344595,0.07050264833243164,0.02541676420410448,0.01033923694347511,0.02678229492291973,0.016442339364038105,3.712976068636892e-5,0.049461884179714075,0.08322663373897367,0.002753801995574466,0.02749812515892523,0.05913175024404788,0.1716098192092933,0.05689335339325225,0.04433489259632715,0.02915334884662194,0.024492638874535764,3.94081726690748e-5,0.07173434242720389,0.00014270051130403513,0.01328521266679078,0.016311896215955492,0.041602726515934774,0.04469680089318355,0.1268860503219436,0.056850023609138774,0.013044208713648751,0.0005324005260301615,0.21480020311571743,0.028979082040916912,0.021645403539117227,0.05383339120434378,0.047344650737750016,0.07140783688101222,0.031798741299156184,0.1660137815857118,0.06484526967467936,0.016206030016728965,0.05119138171003158,0.06961654252734766,0.03283816233787822,0.022660335663032338,0.1195728530163658,0.0031737818758705203,8.924976474781234e-14,0.06099467761361168,0.008318912523992078,0.03234113746889699,6.499697303184879e-8,0.03151373680533973,0.0382095504320087,0.039694411015083614,0.020614543826026323,0.0015519300257590073,0.01966631864233865,1.6712581630022797e-7,0.022774344673163343,0.1375026884657876,0.054588659285321604,0.06124614785128232,0.04885869332693063,0.03572698692997279,0.05288431653945161,2.2978271705537013e-11,0.07202500612224301,0.022945263436157454,1.763223576634307e-8,0.054394062133401005,0.02732604048206738,0.044273790777061,0.04729085633735527,0.013480125465323404,0.020416437536118798,0.0557402088006236,7.104412442962081e-6,0.03682335495142626,0.19789807858960762,0.04422496153657116,1.6847743634492645e-14,0.08717611421044211,0.06772160319094438,0.011997651195284297,0.04109005065993622,0.05030594644411271,0.05178820518858341,0.024161212621232196,0.038524907019732574,0.007388951577405094,0.0358364789525916,0.0149846983654034,0.03931076461424612,0.025329215084529035,0.0012372060328403813,0.04936234820408367,0.0007492985508146786,0.0031853758796759404,0.004054046018419809,0.02417652985594398,0.05817459140169783,0.0012701756022190016,8.520807820082562e-33,0.08758112649384826,0.06827316867624457,0.015259383799514834,0.0010420031279079955,0.007938828794817176,0.00867328097360697,0.02016668858026898,0.05313921614090548,0.052255153033790365,0.04069905500250298,1.2321756238256734e-71,0.01501706130721816,2.899102962846126e-14,0.0044567117586389446,2.9741121086428465e-42,0.08973484726279231,0.03281667625428744,0.01944489229517391,0.048906281813541695,0.048292714567823504,0.0843753780521991,0.022524798086774267,0.00032780813244688047,0.03310180225983244,0.005707195101779837,0.017907237215888376,0.006074617118303963,0.04896750442791963,0.011355966148270072,0.0331771517250277,1.2258207762429508e-8,0.030443309184813572,0.0739430200496101,0.11067977463700747,0.06733858111663898,0.06585456132643704,0.06176708356773926,0.17995090275780323,0.14523097996719259,4.022356826499856e-5,0.031852435742575125,0.023171473753423873,1.8198674477459122e-278,0.01067636906475073,0.009868224812074689,0.02129890930950161,0.0614088688278041,0.08645548658170372,0.0006176889985580101,0.03806858377275381,0.11754300054066248,3.917188337285561e-10,0.007825700395638733,0.0071808001251029525,0.002019531210938934,0.0595440980588533,0.026407273221385526,0.05058306629464045,0.02401918219749345,0.030825740788584407,0.07366886583392272,0.0,0.07318249391339868,0.030114525369547104,0.03134114676483076,0.03436841060462495,0.015206576338079916,0.04495772513670515,0.023606702232529208,0.029543288570605987,0.02080896895045554,0.04850973118347593,0.005739548800944303,0.00028217480061310375,0.00010961691601167413,1.4943752762806762e-10,0.01135008188813371,0.015546479926326618,0.0445156031722846,0.044731300590204866,0.0003576680983091821,0.0016847875563917945,0.019163233296905405,0.027380848075332174,2.3208968252401617e-8,6.222469000975748e-15,0.06365548533324654,0.10394123511213481,0.04750240121982377,0.10390925724201994,0.04392342445932262,0.07131536660896304,0.052483419105809455,0.03937752274030809,0.023104125425429042,0.05657923134607965,0.007129492542278812,0.04000110457582094,0.08639280431524562,0.021300904740882094,3.0942089710075972e-12,0.079854762220442,0.019468603274167884,0.04231711035388076,0.017088995064247287,0.016886285983268596,5.191655680994942e-216,0.03809452430008361,0.04924248516240957,0.019123572683974042,0.057174190469307,0.0008139509189737576,0.04411381278513963,0.11281903697117901,0.051388218945440975,0.001545878207151428,7.983348652888573e-7,0.1143840107152136,0.0030518898383424917,0.07834398297138245,3.6334869571349874e-6,0.09935824538065255,0.051326187327829016,0.07647179648280024,0.04224384955539874,0.03952622738961133,0.09569094399616458,0.03841540722551348,0.04802525932240896,0.08149584268409396,0.05324447064009461,0.057408608541827146,0.06076948987286223,0.17979523270126302,0.009890638042802212,0.0002962923655267728,0.030517968270692763,4.398530364952366e-6,8.175930848918078e-5,0.05889117258697771,0.03151567962692857,0.023862898330989465,0.0534555700135539,0.09695042647765538,2.0417050973615467e-6,0.06132766012628316,0.004677255034498851,0.04016511300388495,0.05907288883215957,0.008363139890506936,0.015433855109148475,0.05557953699669103],"c":[8.546878401109097,1.1475118862360736,11.027919452790602,15.33270353502419,11.714853531708028,4.126210672994718,6.83832824149614,20.645109060388883,7.738071580814777,17.5736650375171,14.450002476355195,6.697484113104325,5.501670258030472,11.258492201556212,17.013503766322607,3.813684586939238,5.42783092334829,3.6821956351792275,1.523796442683584,4.708039132111747,18.55295567784991,3.720914382093871,16.446497422551637,8.992384605936461,18.085530515084095,5.468690033424254,12.656878314511285,6.331839392403719,5.376812720520333,12.224629904963441,13.679064637465487,15.149484947469965,5.679249818122044,5.347160386710112,6.025538400201577,7.312764368435078,12.737957492664645,20.748789252065944,2.0366465122813784,8.21066019242401,4.123775509982432,20.487056916362263,3.4190037326271296,8.763805758317543,10.67547316725339,13.32853582267932,6.751149462707135,12.819962607636132,7.898877236604832,10.206279400496818,13.721209651735501,5.202487578433556,13.791645305341488,10.243263251474506,6.870588357858035,6.625176043669158,2.1970035648848976,8.882252566267569,15.347433951699905,20.319391066439803,17.24340236156982,9.468887997399586,12.781722889922497,1.1743280326153096,8.941259486768967,6.880455506792748,2.4390694717818286,17.042452633713108,14.52956098331957,18.336861424648706,12.745992516074244,2.5281979409025848,18.114834297655747,9.318704307807279,20.926753138553227,3.19189161760462,19.36651946430365,11.94858676321467,9.9027030525016,16.150907021652863,10.591220384272162,18.800635405765156,15.371597390678703,17.053881838933634,14.074978041479719,16.822750406882214,5.934433455996521,18.67186879251731,4.625500861542541,12.019414890304118,19.39297071987123,16.323339175420024,16.81970083452188,15.239610285611093,2.0490937952568524,1.4887865268476732,4.013546975483559,12.866102634872515,12.271567885414505,6.011624276760176,19.226852076413703,7.5558154680262914,10.146612726854233,9.808242627078062,16.501438026134025,20.691949808629087,18.29552621505832,11.766520199646896,1.7130335888812134,20.13158448892589,2.5830753282610743,20.493097626163113,6.605031237991187,17.43055597027477,8.185520222919406,12.52314483979616,4.161321369405754,7.530127762600455,3.631483160244441,19.93245182531747,4.583607449133139,4.178674711146461,2.312612907533399,17.42051404945978,12.568471906942456,19.81304754371292,14.320729920897518,20.801949147855012,10.889663851711363,7.509682582582674,20.34124029847629,18.26033863184666,10.270048570056954,9.993861147970517,9.36666901901534,8.61619384090407,8.379615733154035,20.41599818068706,6.921628923996285,10.448066101964132,19.39509023244812,3.670667102119335,20.054415166180124,16.881403830972292,19.696309886709987,7.91413403141242,3.7766870663804077,19.259700142945544,8.92791849915174,11.21560665884666,8.350175850263652,6.3497369201707246,7.077717960409865,10.50224974162806,8.437010818466403,2.7418984373452995,15.012453532316904,18.198805420670766,11.841156714247626,6.612510269417359,8.396904539136155,17.74160047840501,18.038429698808972,1.6082052755511569,9.810649436007907,10.380898826749915,13.027662418087894,20.13365010623925,11.749856444405005,2.964206310135075,12.468339329385566,8.1283334037832,3.7116915058773694,8.837490097386208,8.673158695087512,9.740789667397877,3.5007376790870772,5.130936106706287,11.067415980313822,9.718120588878847,19.12059189528363,18.829083705188594,10.267509993299496,11.023329039901752,1.0139108834731516,16.73027794755786,20.897695641371307,1.596498061840629,12.068267661773348,20.880652573451666,14.274247438696737,18.782309952653975,17.58550436261755,6.9247414928546505,2.311883370924889,10.844764334292147,7.919120981187206,20.588072499708172,18.96265272235331,11.740504725054713,18.77324121550936,4.972773711972377,6.127790518387552,16.577929034142237,11.515684895606663,14.070947683778344,14.741553363697099,14.68839374324686,19.711359780313373,1.4380453319789712,5.482651904299928,2.632332278978974,17.773719549527137,11.742203208154123,9.406031198532155,13.457093800155473,6.538420803833546,5.492253607312744,2.4590870414539614,2.984722980214162,1.8011467122469274,18.16923660680456,7.64697891748566,8.115722984405743,13.083899129331925,8.68540820292953,16.345124679091544,19.06932489925231,13.025091037751011,5.52240299133412,6.335511168623821,4.34723586112367,17.69254035016663,14.10155392067696,2.4341486343725984,15.121236890634838,17.728407496401324,12.462882852288821,8.602164816756396,12.656478373503475,7.779880723706495,4.1975974260729645,10.13497626262711,10.737707859530635,12.155418404035462,1.0174790231384536,7.978343241875429,9.609063424468996,18.101631899086748,5.832781387156055,1.9161227380021097,11.453882585888001,19.539218905496856,14.759791383506936,7.010924131207451,17.97623353875739,11.965184400230953,8.236060821646685,2.7216450777087067,7.407125890352732,6.085028950420631,10.80134118845501,11.86820106056452,19.51756588566911,17.17143150181961,8.15746378948002,3.771372969071968,17.834731728726084,14.557133305599095,15.785468544927912,1.786569508152093,20.797661752102695,8.42083284893762,19.921666416008183,17.137935819521935,3.5642283864059756,10.336646112580901,4.272708612187447,2.3788682685927656,2.1021107539581054,2.1651108142944366,2.984474308546922,4.169811404545806,5.39748700206446,8.542662665322325,6.79940794349501,8.990889247681036,1.3750291127792682,6.194765602420657,9.097231166761958,4.494706947300097,9.333760953976736,6.457802383301833,18.973309912579513,8.872733875805942,7.460345868244923,19.044253706814338,19.93461965435077,6.471184394583961,1.6582515099655506,3.1040112625323193,10.332205021314163,20.54901906965346,6.014425334829413,13.883173197317625,11.429091346468766,1.1000433598890016,5.326779566343935,20.730857109289847,4.909773710295763,9.181265386214744,11.34691301711472,13.535377695435228,12.781530239490294,5.600164460810823,7.7710445690567145,10.166430385536689,9.565100940503601,7.691771612765924,15.79388552550978,5.40854060687371,20.447440291713,7.717139921643391,18.693227743206087,17.00050607849678,6.935514662983099,10.485603126102461,11.941746894587592,18.58440403710795,4.407105748253856,9.107470164399789,16.682367187230767,14.923846884862323,14.507551717132515,19.91165072686984,15.940378673182346,14.671815128247617,13.857634700449694,10.598126224292148,6.461629936410133,8.93378265062152,14.893009928221506,15.171567078408223,5.924402561373937,13.613873172759842,18.000287568812386,7.1333502004618445,14.16562248253689,10.751150778042064,9.842502043410164,9.87981768926251,4.146933276177717,17.44044674475864,7.896679405645165,3.117481485517203,17.07846638494635,3.0236840789854815,14.802687773035679,5.660554551169538,13.786440907867842,10.319631995304704,9.936952302125597,13.813222526034988,5.7537041708989936,11.826504897318472,14.299114364709737,3.080197090041418,3.768775865498063,3.666348001390868,1.4410548634007183,20.677922204769093,17.400630616791304,13.285211844455013,8.395975949892133,10.626399050287642,15.686016197681697,10.082699509088421,15.98079383545264,19.085468764684762,10.17566516210329,5.836474406528017,10.282608372562482,14.877746504984682,11.664632835226268,17.650999633631777,9.737629327277912,13.33292012624068,9.841828396744544,14.360479033327785,15.470046112388788,11.967128890473031,10.278119764888558,9.013911175375107,1.3456258171921256,15.147378296565574,11.693345021001356,20.400106485111582,11.726011535172454,18.406517692102273,11.177070202011747,13.522910878893931,6.420065206614013,19.764365716290907,16.330102733347548,4.102625556860867,13.350668861984392,1.2823977065773242,6.568608818432188,11.204291666449947,12.117557907692376,16.07696934221059,11.166628876687597,1.869415270610303,15.387488069311392,7.356816727839729,13.034681224185801,14.376807817577937,14.563913731913285,6.446773444713737,6.961272976680538,4.27411922348356,11.10854717621032,15.252887602370755,17.638594427290098,10.982436297069333,16.923901766738155,17.027658194648605,18.724611676244457,8.870216368491354,13.868676085358377,6.085942792384799,13.006380652703852,16.388545404154108,14.76375715322947,9.711304694113306,4.8380650481042355,13.43952711455702,15.106586979648537,13.603947415128154,5.4840416753931,20.363479324803777,18.527725876509187,3.324276997556165,1.0047989887138566,8.822794107812285,6.895031742758454,20.227864878128862,14.765465285672898,19.036745472200096,10.639417283730477,19.304856862924606,13.74193015828832,3.7066264147209917,5.01192527690565,14.59160144122363,18.505682466273782,2.7986648562033736,15.044420231279254,5.254044129268291,9.871398090720636,18.276152227134077,20.593975976595253,9.710222808531736,13.435263350891784,12.70951894850607,2.92117523293434,7.990201012396722,3.200369025889519,4.319308794174893,9.619552778575974,11.218976371643954,15.707820154822468,5.179696770519037,13.545552804480131,13.608627080263517,16.978369280056786,7.363201937191718,1.5151486086107893,18.547064779648412,15.518526759281523,14.935869759406078,5.596543070428116,15.523160953496252,2.9494052326296174,13.611624911524117,18.418215762687296,18.112320428137618,12.462485518522204,16.417864330784873,20.105255154104313,15.313891599838797,5.061139139025958,2.795715126014268,15.545372270431717,2.200252174233447,13.828554736318223,12.079076860108334,19.803532106909305,20.220309801962777,16.572651265277276,8.362783595434784,3.9973787974583077,6.998381048961221,7.736371724783137,10.566548561880431,17.98288927607145,15.112231784875728,5.439195669025744,1.8074078308572297,1.5638187214964185,9.910122793462435,11.53639475535574,18.18416803339143,17.739207396535804,18.837374622880006,13.47898669976314,1.715284572852739,11.727554327201197,20.28488524903092,3.557519715743055,6.830810315477324,2.6858921812040206,4.291023433875613,11.808783225482358,19.265527187246853,13.728784755592159,17.08935449358527,4.882916340847626,4.846733338532089,14.85813533542144,12.012186290638773,20.9373734152667,11.446779880608844,4.878186789930846,4.888036785483484,5.886252239037252,20.932583832460516,4.124791432550831,19.376439847879915,18.17244652196073,3.833991724362419,16.816808847775636,10.309093666369165,1.3062044955718823,12.925046041426373,4.3338401319380395,6.323459539945787,10.205755743561067,11.308880880800393,14.720171421983988,15.844551561412178,15.587225766404316,13.163470377350777,18.151383101973185,16.84582333737806,1.9980184245326829,9.543960596558126,11.501076100772902,7.44162925355622,8.79786836885231,9.619368611125582,17.76230621458043,13.228967113578332,14.777680677173132,19.906050750396233,17.856681667055085,17.972554214844987,10.365158945019383,2.9742460844986143,18.049911120300777,19.742285038966774,7.84589152298313,7.649486615523843,10.690039387573268,5.864269976163609,19.66968331745963,16.38099039985678,8.592884985970185,9.749589120655731,10.494483538729686,7.5633171001598445,13.32357431252058,11.745782699562781,16.432642033040693,4.573292406637232,19.650452837261824,10.052979020449667,12.290053623381212,18.22070504237194,16.944833526109427,11.625467431387413,16.68218125429395,18.36703426816043,14.712249145994132,7.76998002394364,6.543360386306633,9.03395725005231,8.382498488491889,20.171017604560788,18.13878070593539,6.1832891757076105,19.059772108659512,8.98339193474324,8.346624550389546,10.215397482899924,17.649507444927615,11.950723850708982,7.433080122391783,2.2793863850959397,5.563431445876955,13.636676262270523,3.9066433231397815,5.57761959531799,13.466521554032015,16.478527070362528,4.538151189943783,11.913044800653115,2.619834808617906,18.260731086417525,3.8507761644177343,12.903799889204048,11.426247364580394,2.205359919295792,20.859667102028375,11.979899802216524,8.729192529885239,16.220354267262067,10.531574080357164,14.7646753206511,8.789007525873268,8.418931566319817,14.300686543131853,5.6400966033841495,2.4813761540840176,19.784935516056187,6.6189840837674465,14.78274203263949,3.226969445732352,8.832560651918348,1.3216522838087155,2.163960402778197,15.73244969181167,17.607187196404347,3.434515276885887,14.928020100631997,1.8477925414778875,16.73690402290051,8.674574810610185,8.936578013538988,11.589260809385141,12.374769933438792,11.299552515486008,3.0187584445726303,12.46768915386044,20.28887409650448,11.41609481381608,17.547480238021947,1.7729057885464474,16.01056052556782,13.86598321259142,12.181753529577389,5.554376585175275,3.1740266620054927,3.5980427689377272,17.543265096285907,7.05466843618379,17.554983124391033,12.219034686994998,10.7208291469023,15.828212661973268,10.460525097340549,20.896147254851336,12.777906475412934,6.372262284340112,5.733361674659964,8.004681979957503,3.5498756344023032,1.5613984699304364,14.948152124233477,2.764139934050246,9.998906656721859,13.603622260209079,6.983850295988504,4.5173206346663255,6.194133467635895,1.841812820610719,18.91987134745122,13.30519197846984,19.02679333588334,8.027454890311269,20.465067088477447,17.452371988178307,16.771203162272492,3.447991083104073,10.268821781340414,14.508750988577649,2.8149826430107296,7.956887173047517,18.84810297529782,15.820807417114978,6.301571359025723,16.04417328541305,14.729732619161501,1.9034022539343622,1.7732231519877741,8.352662038843668,10.6416341252317,17.439692030534026,20.427038202635956,1.5851143821326676,3.6932726659078066,16.41950809350727,19.06525004095065,13.567074632781608,9.897673935117183,6.959815103653403,13.361496514224495,20.723963967403122,8.488399520910086,1.1863362430315263,16.249716782794685,3.3496760615184176,14.848304723459943,9.355777953925937,3.2547336878905666,18.24500793251405,1.1889641996462776,4.851152664307613,11.381947804014601,19.195968897409067,16.856649954151028,19.459584279316722,5.8464193645087095,9.897714789478247,10.605469046542012,7.324691164482377,4.5890158582160225,8.855555288412987,6.360125242221909,10.171741635601695,9.309850581275606,4.753686869575783,14.842797383618656,2.056163969222479,15.387279414552193,7.693769809804477,8.441738389526972,8.876652245771215,6.450807502767039,17.779285987069027,18.261205151279384,16.68719634059056,18.40546293255936,11.229205461672738,5.252372636168769,1.9951085341648724,13.297958923209858,14.399689851932388,6.700511594652027,2.657368777522672,2.0379492138928104,2.2991873919809116,15.59527106212153,15.41648690861201,12.748994144368714,6.447882430482078,13.427381474972318,14.407104801440681,18.553870813638422,11.056169087130469,2.040070779196185,1.2008378145375822,7.218417775253977,8.259793823187177,14.820290870381893,2.1348210140194626,15.060648490701094,17.03890599837651,6.247921293050779,7.096176818243908,1.6747913604894773,12.305964893110287,1.9723118095689953,7.107364816988583,11.891830897060304,8.753081408087429,4.704983234326904,5.226961453560811,18.144085661717373,2.9029351604158107,15.412181201982076,20.376249800236984,3.9857994727911663,14.237311383580192,14.294248920955546,14.253699128302472,14.3379264570089,8.807512396737364,11.538535486062294,17.79110893086358,9.626334292940893,18.7385607309982,20.666469885915156,18.905522841692925,1.3685689732031605,8.472416329894491,6.583996918261254,5.4378497047676735,12.902004534926407,3.6955819298557415,18.448927716237158,2.342248419489591,17.61634895121981,10.92092041904073,7.352341099875267,14.58413259886683,9.806720210744503,7.990613150040335,17.269607148769325,8.26234234883008,7.844783714561302,2.9340963069837436,12.384909561051813,1.7916404943985,9.661935314884705,11.36644926372649,2.5072715326579544,4.63884120062675,18.395329075440657,10.802092837178598,6.546240456883349,8.913513747614509,16.511394574874636,11.679481642435178,13.538470841822843,11.315689668032828,14.829065931192224,11.719781777780742,17.676832607692997,8.128368231540222,8.354893494386365,17.080515357013834,16.434383724344855,18.737139137104222,16.091595027194515,5.094740048114107,12.768491223377314,17.94046451366014,1.2779758814121536,1.6091133809985116,13.223515815196052,18.673982503436907,11.924490512695186,19.262940767954362,18.651339404946256,6.499767371307804,7.465576703729932,11.17139514640136,15.723103669982113,15.901598682936648,12.733785871533025,15.195987506204585,9.423854391323164,2.7667406676191844,14.076681665197945,18.796825648555604,1.9106363465796719,9.384480246804667,4.949587426291021,13.758646786721016,17.268599821062644,13.912155501005543,11.59183514873598,19.142838434330088,17.53036644566847,1.5050110202112723,13.01960530316529,11.108460330234742,19.319612256016057,13.308269626107906,3.8060021239131316,3.07909576871554,5.500012167500098,7.003544154798224,6.571871245174234,2.4706265003690255,2.7955037366803106,2.522937180448256,14.466614327730024,11.587361616476931,3.8232803866061085,15.62488768982662,16.961691149506315,16.336003034828938,7.527698829838204,5.306686854516744,5.276119684235273,12.146714615908255,2.4279724122586446,16.495424590980008,18.767729167440134,20.65183443433432,19.90947375477218,5.155725290648569,13.625301116880788,7.4817090478556105,11.742556127290893,12.12601443910258,2.2203205827528585,3.8947507020614704,5.630321755668461,15.23656027646905,14.669044006260659,12.748394462849344,19.87975169943585,7.393325422076197,18.61147658187422,9.610482613436652,18.45904887505354,4.7687177681763195,20.37900116297326,13.283968393391632,15.076897593865553,20.924011165627643,13.154305368180776,19.09018466294837,10.019290759952444,2.602953446348545,11.95832949930534,15.497297922292294,13.773683649261729,15.764595805407325,19.268501404925395,17.693352553156416,6.964677249459358,4.439820085427994,9.737179160463043,1.7810033714030773,10.09121573862298,4.557268242139364,4.72217698653146,11.210641006786357,11.558981854560123,6.685198381054599,15.834385698111156,11.12186070992383,4.2628347122288615,15.588385751184623,18.735614055029643,4.155413099359308,18.59845023223495,5.5420683108255,12.936231231413451,4.6473659839677275,18.862536538393204,11.55685929127626,7.160411430051407,15.50146905413462,5.675488018441074,9.872736016607634,10.144132595183304,2.1486924647632035,2.859484384614909,16.87025888444428,16.33160906163452,2.2287689575939265,13.85942519253165,5.409707689584925,6.26754464427063,2.824992615226595,3.7617833960094496,3.5183379792384963,10.536778239564017,8.691862503061975,4.83041177879571,7.766076291680823,9.10338237512774,3.608277275698354,5.47409131731392,6.770723882904374,7.166793727615345,2.2292055416576497,19.775434428007465,19.691932336446047,14.874225370483746,13.602990262962912,15.471520261995238,6.07472167095862,14.65376292372288,18.46945024397106,6.213211943197367,3.52126261836525,6.405737997618902,7.254485391545175,19.25526560253494,11.230157923401602,6.96298628466831,17.56411401257691,9.391358779558269,7.530786158318853],"x":[5.457015239174547,1.1376619922939855,1.4264045631399385,5.0347178115524045,0.9246314985922224,4.386178697771353,4.385723634123101,2.948473118752342,3.8146294050980663,2.3627457201480864,2.5292189823803346,3.7276607608001147,1.979373874957449,5.194539540174162,0.6681086079507492,3.6544148243332617,1.2967979231993745,2.3354549128034066,3.8541345692363054,1.0327035261775144,3.1816146217871992,2.032253820583679,1.4327455880722146,4.476127896400976,1.0867972001734632,4.6345012426483025,4.071345284529116,5.298919992381762,3.5922237325406297,1.3749568228027707,5.0459657987292035,4.506386924574748,1.5377316370766656,0.8150813276152744,4.983599736411423,1.8236609172115457,3.695430136340631,3.8779702928450996,1.090296261463158,2.5581766570136537,5.7977182802271505,2.1771713365749346,0.7170081971217956,4.973978811462876,3.462112140913572,0.7801430025455953,1.3119792604074536,4.637777056193696,5.53335114587373,5.170994476700201,2.9258359741261266,5.250462150636361,2.4020208849243065,2.5085226610179165,1.0300622944639861,2.390415663031316,1.6422158985803408,5.300829867886739,5.010215761557914,2.1809935523740336,2.217403906407295,1.114334309249358,2.8838782913681955,2.399298421964271,0.3672381094473369,4.106467946880707,3.1498225917478626,0.1762336864934475,2.7380321532611163,5.089154477918962,1.4692821705313377,2.9093841769216264,3.7131744245222693,1.3256603229554773,3.5861952509773385,0.4001707604456477,2.347155328277784,2.454520603108504,3.9936427510804737,3.3986792061109194,1.6839085636209261,3.22194163356787,4.373993951962834,1.9168748299373277,4.496870738688372,2.315692385627796,2.985586571331457,2.987114596225743,0.9204285271147623,1.7561649717260752,4.882322345362253,1.2593314770216752,1.0921435261438521,5.264757791400837,1.6229590133609142,3.629639823253708,4.470301159433213,1.4399737299150825,5.191885060321488,2.5260319665762685,2.416048526501721,3.2972101131422837,4.4295765728495065,4.208445518181571,5.15770484820719,1.316740840853271,1.0730090752118566,5.079914265260218,1.5964171970236172,4.326409808414549,3.6896532839813325,5.423872193324763,1.9054514006133088,1.8365981831303735,2.625537130429641,2.629876756739487,2.7296298596089326,4.658380098285941,1.45611349895336,4.700040846809474,2.7682747832907144,0.8163331014832687,0.6284657717328379,0.4695397050615724,4.216834421933299,1.4171470697813373,1.6046207195881022,1.8452531954486313,4.097749537613169,5.16211494104863,3.4700164322543294,2.3539713344223268,0.9128569957354036,5.60875382285811,1.0459153528176022,3.919993962387105,3.3144644089446156,0.7336248571450303,4.728704709046437,0.92682557790149,2.2060738172414207,0.6894175538541725,5.09151326255211,5.2602716140071895,0.5090895831949522,1.1678641012027395,0.7558089546747688,5.378854717464625,0.6571673332425743,2.606630346964243,0.7162316303010561,0.7530397349270037,1.7191858763023218,2.384564372067744,3.1565254492349233,4.674046827887074,2.8688751322256745,5.5289763396627585,3.010015304127913,4.753861522810238,5.453822904135101,0.9041933866334044,1.5188700602214538,3.296900369129188,2.902022475662014,5.060599374912055,4.798466595815142,4.25383615550124,1.6922611656659876,5.195281368922963,3.0107980703729673,5.292103477521746,0.42419598773940015,0.720015340657056,4.388148926095933,3.6966025971891776,3.934390404944976,4.239085404294426,0.480254586192709,4.984281974725414,3.2306746010841563,3.4200318707261745,1.9333923582111665,2.8718013297754106,2.20832910997516,3.6426992777433727,5.418600160237991,2.6730996812536825,1.8450985012420973,1.9742184698413783,2.8018195533115184,2.6497082181186773,2.513019036576722,5.623747169983154,0.7824802134398694,2.4123673697707355,2.658451416251552,2.08544486149421,5.565184134299101,4.625319475617714,3.4510722327534946,4.471175442393486,0.9218657158281864,4.576998048001109,3.2032442406192247,2.1450955999680463,2.9190649395549455,2.821308810199303,5.454753489972119,4.803805577152307,5.08934349994537,3.353370738018206,2.445719125515663,2.2439627786409044,2.235598078298145,1.2048685989004364,4.115178866077411,0.8127705632286293,4.735606843888125,0.7360451132931058,3.9371713313322503,1.7362285682390508,3.318340127292238,1.7712889204938342,2.52541764919059,3.6783341584503146,2.345770038390201,2.4275084241636393,0.1910973626135295,4.047006927402309,5.032706102204472,1.3816173920964663,4.196707445504632,2.3537118380378854,5.84081925429322,4.25926589819639,3.336781760851151,2.7135726583564748,3.0523505324731683,1.0744457568426926,3.213984171377936,1.6246219114297304,0.961341232891076,1.651199938121393,1.447548555484033,4.2859511311143335,1.7746789715227969,2.9951345590537883,2.8103573259195653,4.622148566197668,0.9039386605487603,1.9807858972319463,1.072748610298165,4.891903842191409,2.5454035234680594,4.417597908798278,4.078130182582142,1.202489889362153,5.064641720077539,4.213524850269966,0.906542323169806,2.824587606393213,5.315004834434337,2.3905246124178685,2.504134210737698,5.231419413030451,0.9441440132291394,0.49901599483824355,3.4055466961307594,4.383168784052313,4.920222945703699,3.430575987843123,5.583392706079494,3.164865841090399,1.493208066936292,4.175907481783952,2.0638689148361946,4.82354993388506,0.4750175090681552,1.2194301197689341,4.942452302370566,4.312663543440183,0.8893321088216566,0.4338594903739157,1.0233747384041183,5.06777587186385,0.5159711596793304,3.810202611360462,0.6959112749899445,5.446115023460074,1.1958448253926277,5.2558692614558975,1.1971111911099759,2.5108118650464872,2.8288921657195507,4.763341270525831,1.6394596297023545,2.5089508435009398,4.261988255748981,2.3640471678066817,2.770780806508479,0.5769504356784889,1.7065131481763396,3.6319440007419725,0.8401193163810043,3.4516451237307804,2.6944024350425044,2.1438937036793018,3.7258642626668883,4.647949293659663,2.752406294659748,0.6936081165273194,3.7704130382523893,1.7830080033806543,1.4683075126271106,3.444798842831877,2.710551348380955,3.859793576557483,3.0050095186742074,3.1087217221850647,4.876878025004096,2.3790292256962804,2.8520810762620306,2.6897764278552287,3.7454536681897,3.7697855209610944,4.99574306096689,1.471804901514062,1.2342824364928637,2.4381394881978453,1.3727088908055094,1.7470262062857507,2.058090114091466,4.259278189994106,2.608339816732146,1.0325900999325603,5.1449536988456845,1.2449164336905925,2.0618780401168157,2.5466296539436595,1.3664873453429511,3.8713493721223897,2.602161587577288,1.9294217521901207,4.807367233269526,4.271367769707474,5.314101396171085,2.6412906105555383,4.776911729994792,2.3104361220658145,5.130769590312595,0.6459963256876591,4.84853136574139,2.378313911410834,0.6974250296508924,5.128930166164974,3.129826323660921,5.607964883364299,4.576326211570548,2.253003781509751,0.895915111565468,2.1055682026676403,4.692190419875375,3.0274563153734246,1.4443615481844951,5.442827152691386,2.1430328151064675,3.9597402648196853,3.5264612871905756,5.70305525563727,4.939521853640612,2.6648460890495986,3.3982109004287038,2.7874044046092816,2.6010680380058933,1.381817385120866,4.292539689976222,3.12504274122148,4.595809655291612,4.968534069789423,1.5822892589003734,2.3642005400122104,2.6447691235544224,5.91423517875966,1.7677077503610243,4.136506975654841,4.493421487932387,5.755843476529748,2.325746380354591,2.1274309398377946,4.236750095076669,3.525982367994103,4.676464997095409,2.5780850296765276,2.331768090080412,0.7548549928393644,4.679918726181118,4.028423070645454,4.6448889670719105,4.736464478659762,2.2191696131436744,1.4463343118725596,4.21584621662176,3.175344230442154,0.7719238854043462,4.468244676740606,2.71663872030242,4.970771226672415,3.996122494199507,4.872422408095106,4.583433893003057,4.813028085587078,1.286653020206362,2.9622726561014368,0.7521874936368014,5.211292148563791,3.6757270638035937,1.9734609211550467,1.037519083116568,1.5814382533875693,3.5399940750241026,2.6993929073066596,1.8936774719173606,3.3906864029097394,4.314805298604651,5.46160399710432,3.0868755461489377,5.373615767121748,2.830752655899203,5.196729322947052,2.0907264780687216,4.685665932973353,1.9349880848285677,4.737748112675348,2.4965588695959045,5.493214379788441,0.4803084067822647,2.450860249291097,3.112235569320595,5.232526027663422,2.9158474651035267,2.893042130347739,1.2320961197671805,1.7668330610431244,3.8176741044165396,2.546242134847896,2.8041913396882805,5.352172465561706,3.3683130041943126,4.690094919708352,1.2050328475257892,5.278043236262709,0.8802970121559568,0.7243064016785115,2.561094873317213,1.6903606464199945,5.487428229919086,4.268620647584295,2.821400821680786,3.725077543747354,3.6967767488477907,5.303294092314854,1.687760682276691,2.4267938976111063,1.522799076713368,4.982680353168827,1.771012823709983,2.4578378659656765,0.8933971884786751,2.6375978479453823,4.84229395966125,2.7330169105427675,4.005632247730727,3.0248761478314083,1.6118521332152456,3.4559615779270656,5.037641899202444,3.755200212654225,4.836711015796994,3.372637187231331,4.426410715936208,5.059241866244007,3.1508188787705738,0.7636850727505524,4.310884092636442,3.7687106993724573,5.1415449146060075,1.4537788873292223,3.897954915289119,5.09409837416985,5.660479131935728,1.6667695825672473,2.4141991029070735,4.236478669156098,3.799706093270708,5.025148105246743,1.1210742899220034,4.805406948626586,2.878169397465498,3.489366445655958,3.525005563528806,4.237915038117525,2.888319567942344,3.0180797869817653,5.071942077695917,2.2928538231451636,2.781732071368755,2.4497845634314834,4.7461027035138565,3.3079960013797973,1.8287041914675906,3.764940215707564,0.40230196900799475,1.0212544940156913,3.976668183060866,0.14637136715264942,2.3032013306531276,4.361738641377761,3.2966442164490273,2.330716455410145,3.237635555515868,2.2195575578289306,1.6562519463707144,4.773645085280403,4.009585753005392,3.1655937214909704,0.4704375058234318,2.5579126200481377,1.9074391876473207,3.6297265693362015,0.8390705361011288,4.104659835619724,3.292928223650736,0.1704725840357033,5.164294426493228,1.658404149261678,1.925519942561904,3.8229177957447993,5.580476402342819,1.8720076691705845,0.9768511176598307,2.000147670039431,2.5471645173610997,2.203800295666791,3.377071321903964,1.5717078427293865,5.293715830037544,0.8246770161432408,3.245810480698586,1.91827639375425,3.54401377726494,2.992372416750483,3.249253510401308,3.884510499882618,1.0059791704086303,1.814609406031845,3.0918705645428872,3.167047611175569,0.7759589133099547,3.1264650728822074,1.9035184858681218,4.177594364220315,3.8402965947066785,4.704805059933083,4.418169555833152,0.6457193920427908,3.2069337749577835,3.646546424306991,1.1686689683041462,1.4811301259068266,1.7563455723346255,3.921369165904499,3.654826289705893,4.849291488222204,4.324401455520083,1.643139178917226,4.905128892191103,3.4685979865028473,4.469627576252817,1.5787597690828008,3.1364205573440094,2.7075089704023383,1.5864692670058842,2.54376512564939,4.164515618495853,3.2076850019619294,2.886210872495303,3.631828318488906,1.117667895478033,4.67473269389393,2.158196444156684,3.7701673419624866,4.863986579424594,4.117443304440756,2.656351336096874,3.4594825284591595,3.8087704790910912,5.4429661195369965,1.6796372198734715,3.7337860863049612,1.9713977468206452,2.110125151361259,1.112420128971707,3.845294471652599,4.70655723443318,4.699732847193033,3.960318046400027,4.3419811347028485,4.1936982314314255,0.7966080759241874,1.220823004084536,5.207584195692025,1.0895273994976018,4.490024693363155,3.1447163600288865,1.651053814341576,3.3872602433232997,3.8071122149238126,4.5726551673353395,4.349398486996685,2.3320447351325218,2.7665974285537964,4.8871114056258,1.5771028652252785,2.5219567880150495,3.9510529615029117,5.483420800809598,5.0435294088897304,5.104531931426268,2.1743242058263537,5.001765740042396,4.960290292335985,2.2613531261774087,2.3298597774234255,2.5699803683725833,2.5901685863211896,4.420086644158114,1.6629787705308496,3.8137162528195017,4.654581503698093,4.465878199337333,1.3862897261908116,1.7379843306239555,5.315795831724243,0.4785076355405853,5.258976476652277,0.8951705736981763,0.6026914004969639,4.3232883520291825,2.323265239488438,5.3281853548650275,1.0071945060379364,3.04072254902446,2.920995099130995,4.352597986015844,4.388872333300676,1.5085896686769025,2.581298372005416,1.0960755088680663,5.295971817862808,2.236857631878714,3.0813214849966934,0.7840459120321539,3.07383004190792,4.648758081145524,4.879243099452858,2.4187348577340924,4.207168166164881,5.186220618886646,3.410055886837366,1.968395130832348,3.5267411815142955,1.771724403725437,2.659648733434177,3.5656675501488424,0.9656393806896977,1.2763501161284108,0.7946055171327362,2.565427863441811,3.8413926069447837,4.608515512748252,2.426009250519691,1.0882694741032517,4.532230987040484,2.0235736884982822,4.899412424407055,4.078548214164742,3.601576068589157,4.100516449672577,2.255157826090108,0.5822112177258663,4.156681992161264,2.419787802191254,2.2876230476317927,2.816082326339431,2.752468528769794,2.6780399036828824,3.3182873175458885,3.0959989030995105,3.0885391416594468,1.929411010880591,2.8985943637497815,2.943550657953727,1.020548597610866,1.7719218714528384,1.777060556259153,1.6744342319566832,1.5603319887095877,0.9345362949530742,1.6742825795661738,2.6575845872753074,4.778686954115612,2.294908113786682,4.431465891579423,1.237010681853235,3.398885843019584,5.021560594230708,4.423693578158178,1.5687752876951642,3.2353557708725704,1.1716529408160146,1.4505092687436054,4.5143746885583855,1.8608905251852086,4.887956403340295,1.5523796273121666,3.5620818234186364,5.2303654790362355,1.7633130785511069,2.445304903132046,2.122956616697988,4.409387931571997,1.9639225752832854,4.980573189289836,5.08723074667766,3.34864127504125,4.488823575347363,3.7760225235492895,2.9908454667578033,5.639396723369588,0.885954221176825,4.3963213125912795,1.8029709380832846,1.0686314191437087,2.946997784745632,2.899294681068768,5.398760781513978,4.181644951735149,2.678639994293997,5.891608421649741,2.8059421848473853,5.165985942469452,3.2290780355005415,0.8160889623755689,1.2413646839247048,3.5373831875569204,1.189635613165386,3.9139323431568624,3.8192539989047436,0.91303230465273,4.153362043325454,4.881697912914821,4.8771007176775045,3.6062818806569994,0.8682952276292839,2.24473039163603,1.165933736450967,2.390991910497495,3.49646825675683,3.881979462787244,5.563973416476136,1.9172153633127722,4.480592479786277,1.3231430342130475,1.1605734765645082,1.5249016928171866,4.424170686859199,3.6996334926535495,5.137955365260706,5.346858851196409,4.008173672607983,2.649111003273733,2.2199843680127307,3.0997626181944113,2.112974798356144,3.6519604476044507,4.301033262239368,1.0461904938323485,4.2404386023248914,2.5059339284478614,2.1774746400748963,1.1637899867755876,4.603947186105487,2.1596370108053886,5.612886210133944,0.5043314744550178,4.32821486733329,2.414681808878238,4.80198607744079,3.5826755122416074,0.6712999938117261,4.055731037382569,0.87065093651711,5.065383844288715,2.7236436770651418,3.5736989936743173,3.8297611154149394,1.1094836636730556,5.231367567283842,5.278150081485801,0.7757422655625443,3.855348365620684,3.9845190313554193,0.5876766349096085,4.434443606331312,3.2792756964014083,2.790839551689762,5.073963556361084,3.211349173558114,1.8105654931965598,4.0444978978182125,0.5195295808275016,4.215309520156223,1.2617039448326097,5.353492929360203,0.5473310549122086,3.594278805372463,3.995523028249157,2.92576218202934,4.820128960623107,5.00383284603991,3.812524953832693,4.012583068337153,5.304546643618043,2.1468907185458237,3.4595287092494607,2.3877049240383803,4.662166353415135,5.150966704852617,1.2112701046330108,4.727573030834684,1.319231688180829,1.4912570722183418,2.6376535848667655,4.303194674239537,4.371077105000037,0.9889793169993406,0.4054729459223534,2.752767126060623,3.5601372358551355,2.061407973220171,1.8176682530834785,1.7394162742387707,2.4714215996719515,4.122580726043678,4.949564185202007,4.902002341303671,3.935427148318415,0.5984176426416459,2.8001088406557715,0.915681636711239,1.8387881099778818,0.36513601863916634,2.8228341162632216,4.6423662643206836,4.528719702466536,4.965584624777401,2.8982713113657317,3.1889209896359363,3.286473974433584,1.8671465302832277,4.784886341127995,1.542139503819083,4.21970324775976,2.8009650965669515,0.5759797481718822,1.6799926579321207,2.4684148887995043,0.6115004070932593,3.2055852882309495,3.4565481898652135,2.6662819558271944,3.797947041372382,3.3277857013823433,2.38929242324328,1.7132882969515002,1.5695013944260785,0.5447928436867857,4.83672913904355,2.8112968367891673,0.10594149797590813,2.808528607090145,2.782824749515008,3.3299778978133823,2.697655003325871,2.129237515527116,0.3420693867333686,4.266964786697472,2.195746446628024,0.5502076969936827,2.6167248708044513,2.7016216436951486,1.7939236985398077,1.17092571480222,3.3426277054827995,4.643495806711886,2.7657058753620083,3.380166728795806,3.8226744486925943,0.4488382619725424,3.851320492021217,5.038104318224518,5.190225942129897,4.261142841395859,3.651732082231561,1.9162610048691324,5.576725693346557,1.8829718730508809,3.9355237251470356,5.799953836832923,2.6244647548741566,1.5599571748717473,1.0095707565905294,0.9926896405572956,1.6450591794566265,3.3325911519941647,4.32116292801778,5.156066182474751,1.115800481904545,1.6318916171000528,2.8381746743576866,4.488693245856646,0.711284555320125,0.7360068399424098,2.6533022732830394,1.565957570189886,3.7707575022704893,2.9785640620781226,4.834232956910347,3.3891130828443616,4.899659574063271,5.4319224657768315,2.3909279452248704,4.393161705408482,2.515300175170659,5.685291549054392,2.6250899615956618,3.446166995083625,1.1314756765363114,3.881538734272495,4.321440311232916,1.3480437343961529,2.381419968931455,0.6391446552242532,0.8119519834762339,3.369409178068579,5.649599540220693,3.5974575315817097,4.901759106246569,1.2944372526176444,3.5896205601097555,2.3858810929700347,4.629870028766189,1.46063015951241,0.5575568138118485,2.466531682785484,1.90652152100976,2.611082535785778,0.30818517690432357,2.809475615691716,5.321543326563044,3.770088108521289,4.936717572368488,2.0193197725022762,2.2189786890571543,1.4430657670662483,2.4573823012790807,3.211540739301058,5.1156638671259635,4.64473350058604,3.8906148212457294,0.7724151103617078,3.585533798633864,1.288224136904149,4.635662254042127,1.2613762035867853,0.9148349210416378,4.411795371238843,4.900799356150605,5.707397466357363,4.393900775516446,0.9387539411974293,0.9027660335004211,4.043770202927919,2.633221332103088,5.485517123907114,4.532420318491615,2.709891702653368,1.823065448107555,3.8886689772346754],"mu":[0.9613577633801573,0.8537325318403075,0.1633834736826516,0.24469162856521764,0.02465808632466171,0.6497607962703698,0.9708561130896922,0.44040194420645573,0.2534834091909639,0.6434350731654064,0.7589054810274867,0.3977330072424057,0.2042276847620943,0.8839276467801702,0.5853614318930589,0.7054401696922272,0.181564505620452,0.5463962105004254,0.6999186081030686,0.9652283235541406,0.21882064254787603,0.7814288869064252,0.3075212692400826,0.6563055136317313,0.2752529885332238,0.5209479071759955,0.010493291249137116,0.7062207984325475,0.5217236160447272,0.7183016131893769,0.26982857055981246,0.7191919763188066,0.3787247615290321,0.09941989409674257,0.7411690039181622,0.5890236780251554,0.659092617059142,0.9411597059838857,0.1480351530312125,0.896256687038091,0.8615846260074356,0.43858051828420086,0.024320079102865266,0.16458015494289757,0.9584395218301662,0.4234768088567882,0.7518173703052515,0.7029314505967308,0.9375773880147211,0.38038132952617354,0.0895458921042176,0.3626066861506003,0.28176898221951974,0.9968149072338459,0.8996638466327158,0.408365455747836,0.7335465850925575,0.34551421215173117,0.9102766936446707,0.5642985088126209,0.0051069269188168676,0.7235770225968059,0.9513585223167105,0.15865675182930916,0.18339047911567974,0.713218371403004,0.08139068356387225,0.03706918617994859,0.6300756220178139,0.7415165077864816,0.14242556427113495,0.6254163464882567,0.9404718286580118,0.0759783538544887,0.3437668497180957,0.3330916196324223,0.8870271671386936,0.3386189697230997,0.8214903912361622,0.0003647872635315075,0.6403111951951046,0.263674320941663,0.18902539306405908,0.03243125608387731,0.5466139533163483,0.7931728926958685,0.8028043765695014,0.2962462180796823,0.062124632801654034,0.6423750014837382,0.04725880455138887,0.3828586820272679,0.10175605161307932,0.9183804626621399,0.033874393954884896,0.43628192457365667,0.09579300939989022,0.002544876246489469,0.5113465774000145,0.09383901958982377,0.8233683449110609,0.3259261044576942,0.459686989589172,0.991701087081984,0.9012574921466208,0.19555037832563293,0.4282055930194424,0.6688710781536658,0.27055359062664297,0.44899293396708484,0.3170272290498344,0.8130290382598984,0.4257069600111678,0.7408883418198808,0.8940596190525836,0.6578935955943392,0.9176536370446502,0.8794795391663868,0.33932889746542316,0.19546381082057107,0.9607615698331478,0.7008919563049054,0.5197475182763356,0.047315939476704205,0.698139507685263,0.03481246424175377,0.19001395304433322,0.5682619537570683,0.4555979857429431,0.5858237472733148,0.46071080697756894,0.6212395959868524,0.4604476218132867,0.9114479207536483,0.49332385731551165,0.6454395918484248,0.16372980066770282,0.626586065755979,0.8931298416007125,0.6311097119137588,0.016818076832449957,0.4317949046297309,0.23205129138073222,0.4998588029281137,0.017950739227071244,0.25595227285025657,0.21291716232421054,0.5310239089287314,0.027381074225301116,0.0799983380175513,0.20609998288955467,0.3342700472533968,0.8128134043362947,0.08870304334445933,0.501191045113349,0.4339232900561545,0.4435283385214772,0.5308011209564996,0.08980080235412413,0.04975252223875204,0.4577107746810183,0.3271495608226975,0.16701750834416207,0.5618662523517419,0.6484074743300972,0.11373694480543661,0.9072393508265881,0.23633657985100576,0.7204418538050168,0.7095010396304988,0.5103446557917046,0.456815876020364,0.09220293906710908,0.5654801966452234,0.38430039435778474,0.9314803798748477,0.24123577633745596,0.5850815775565708,0.3498489021301079,0.2107256751930302,0.08733567149131427,0.3020374635951686,0.8944855396910498,0.9151712789150821,0.2585148642003121,0.9945957567844881,0.4849840468513642,0.40163240889684704,0.031571916728340144,0.8797983187563723,0.4452142650646058,0.26157833168316214,0.6822150245218481,0.9556229403594358,0.3681384299712147,0.6681057318561421,0.21118845342544357,0.22722611354049094,0.9412277684570372,0.7274598584656731,0.01898078786092805,0.7287157272161369,0.5482909022260665,0.3762880831625808,0.27200432940871444,0.8876877665645444,0.4715028145186022,0.3301040336295489,0.9504291453661715,0.5755233366463595,0.1917905737358121,0.1562357732250903,0.22057106604020404,0.6631741380317002,0.3168375098824554,0.5644279019575142,0.41540209862009725,0.2966343151405022,0.7483976100702294,0.3235730066111444,0.9663605383456457,0.8091998156447697,0.4981142643503951,0.8796853713367125,0.2826107880648321,0.9996117305664349,0.5352138374211677,0.8566629533251215,0.05541605786364889,0.3413101650460797,0.10338296219841969,0.8588085969562957,0.8809958745818416,0.40408271262677786,0.8645679414987562,0.6273560033327639,0.21756691578482412,0.06823605925536258,0.9208582006292347,0.7789157732960996,0.2836339891286117,0.4559568371961624,0.8852820687274927,0.7908558485617139,0.051050682676724524,0.9325859101674199,0.8720988899234756,0.5871601540680385,0.6844376738784006,0.9339534206862019,0.37464181308915423,0.7750304626908016,0.673389416780394,0.13093843233880853,0.03662799695380925,0.8036842690364341,0.23921720969165516,0.2642794785186844,0.6642604745346647,0.9914068061421706,0.6763368109711358,0.6148420038916884,0.48971493573467617,0.6068420079503194,0.7671444038182444,0.7911520869958844,0.5052236582215701,0.3286410300363731,0.4178754513612566,0.3254745037045119,0.9625024014986809,0.7643970336762951,0.5947481083751105,0.4127818825044818,0.5072999798406437,0.17438763924610567,0.3107125103331603,0.6961292158319023,0.16094544558246215,0.6456974993249145,0.1649190158754592,0.822537679842287,0.025698579572137614,0.1560336152115127,0.04529541110482116,0.8581230786085317,0.07304801798239002,0.18750664597222788,0.5474038132822336,0.7453359559481083,0.20180455632550087,0.33052013052608187,0.69252270378884,0.5735393693019764,0.9606944879312613,0.24505556243218618,0.4053194566551266,0.3067538962654719,0.8362860183608019,0.061127423107247614,0.5105699822299188,0.15684997631849784,0.06028438399504621,0.1356255867710976,0.11020754200215355,0.1307083496625021,0.3955031103082789,0.5294162410044114,0.22786493760936688,0.3736039863301963,0.8518415466791611,0.12782026904623423,0.7857953018634316,0.7857958870924846,0.6148915661035914,0.2261307667176311,0.07544730855988013,0.6909973982671302,0.05640041459856304,0.9202983396327948,0.5674431985713384,0.8075410333701054,0.9681259105298585,0.7738726812493306,0.0027180287089314525,0.9577758455380847,0.710585832024367,0.7082146137614429,0.08990762831096655,0.6030965547208285,0.9299027033936167,0.1124281576621795,0.8606064507826601,0.4491997649155399,0.4309717677270528,0.5506845892735206,0.6652571174694455,0.006427416108053308,0.9836250003669158,0.637436874615722,0.7313523298838482,0.3103198177009001,0.4797052757739564,0.7509964997615441,0.8766499724037526,0.5297256515344866,0.7820753702570542,0.32625265125016667,0.7673507574025649,0.7752779545217052,0.6131482457882305,0.563503722322616,0.26626346797921707,0.5666978977052546,0.46842060190283275,0.6142105410377039,0.43321923244931204,0.7154186082775247,0.625964754563783,0.0910022661742722,0.6102373526591383,0.7613409222227896,0.48088628737831995,0.09650806944776713,0.3698893112785484,0.8691563031891469,0.6034030591722985,0.5504944235850993,0.5300376055791969,0.983824994312976,0.3768810675857852,0.6936961798685892,0.2502749305609482,0.04892097884935254,0.7653991055371416,0.4411409142136469,0.8371472647135512,0.05731467867203799,0.5392715433074997,0.4789711203612168,0.1664986115739331,0.9249933616924901,0.23244299692032255,0.9334538119843383,0.2622026154634509,0.1789906886530206,0.8863464130882368,0.7806618415421818,0.4517143231148846,0.42308741489414015,0.09166161416204854,0.4801577040738385,0.41097472171887284,0.4161705303377172,0.2734906697336632,0.25171411803196597,0.1944140289974834,0.2754835271475169,0.5909627969952651,0.26613557935512966,0.4823655241875746,0.23154225427860875,0.7185210523752326,0.2763675147428504,0.37511718561330043,0.8198954448568758,0.8481795627230782,0.000988135786207156,0.1602970290809862,0.5137839027560969,0.9038197795165475,0.22965961320919392,0.0435289211468215,0.05064705046459195,0.10392381540852669,0.7140115868387633,0.5720957702327103,0.07794960670511752,0.30102739006769497,0.19298562663753294,0.7476517177077577,0.4222714430393353,0.08512831976446988,0.46690175252426025,0.3574994111197858,0.9811098864712486,0.04356258890927989,0.4645641349711902,0.9458942765812279,0.8930017743539709,0.5126268298086267,0.9434040277307632,0.2064632265581683,0.430629545217283,0.2231409659777852,0.560829465355065,0.38224867002562535,0.3526360770535688,0.3522555407835777,0.8874865432002885,0.6266381360933444,0.4716911371288621,0.6097740883660758,0.5906438297658407,0.6086043458692023,0.6315902780632678,0.3382322217111051,0.6881646820191243,0.09261123126049897,0.8026152928788064,0.42158740648976223,0.8927204561420463,0.6471906595291406,0.18719904294568135,0.14637441778206983,0.7656471684980088,0.5767139514322106,0.8536094555383602,0.4875110449127449,0.696685249047472,0.8450809595572712,0.42646728417365165,0.21203934478544628,0.3694891988430842,0.8728563708218038,0.007683851860972313,0.8242446686570701,0.017529303076535774,0.6209469835867909,0.784607122471799,0.3502144378841685,0.5953122435953018,0.26309846065460607,0.982114370852954,0.4736962890964356,0.9190956431290616,0.6100057835416459,0.29786247018519796,0.6107828251315779,0.8319470526764039,0.2603826525140054,0.5759505502882363,0.4391772023016949,0.3359511039171377,0.6557857360838211,0.21046597194215444,0.15283451123210878,0.09782336284114845,0.7696877929056076,0.15797115324041133,0.8509382644135668,0.24175845949731922,0.672855724133216,0.23424369076794838,0.47088066687415253,0.4720885802081529,0.5649530220371497,0.7105299384095194,0.41169769660149536,0.6323701542789391,0.07611201268213041,0.34645913561573116,0.36156540637785883,0.8922552182863006,0.4470255369465126,0.7915922162545064,0.3685222497378644,0.06433574479568094,0.8013742733130316,0.788122663564669,0.07200563636501678,0.7088475260467619,0.013114743905269677,0.24518250891124738,0.48182603049017003,0.062071772016424775,0.9384714613177196,0.6395202648897937,0.49228308472105975,0.5177100902097049,0.2681534863557309,0.10534175435475945,0.1706411570252493,0.4489574904891802,0.13734095445181382,0.44236589205325716,0.4211355419460079,0.8099389638277847,0.3956053598702092,0.9007844432503487,0.3000808996659079,0.8762758219227285,0.2977996273061756,0.13844224892695745,0.4280276971176966,0.47273465871737685,0.12549428483136227,0.7845256514911443,0.9294906629035813,0.48176197619718364,0.29691566823281024,0.4629553556281769,0.15780716090324454,0.6393167077677946,0.9629682748414692,0.7867334267493034,0.9894878011574513,0.7161252148950008,0.004690154757880816,0.43373551505887264,0.7796986170587437,0.7500203410340345,0.6576289860657516,0.20720010365147212,0.29923213300466056,0.9064502955798279,0.026360137465595512,0.36390556326514756,0.3896286924667207,0.9891531013966692,0.3553234078325571,0.289277282137953,0.21154130004479255,0.904184226086322,0.7828441839186966,0.08532253812998403,0.2761303358118743,0.3628366690236948,0.5685258619238764,0.6684416738713594,0.8450335133193898,0.17728137803572608,0.7428091160417429,0.9632795801882443,0.14700487526944883,0.9533259900096229,0.2546959142314138,0.6835785850918912,0.43897638837364683,0.1323349487818919,0.6706175494662203,0.5362861553952585,0.7614252808428799,0.17878617777684558,0.26972545462205577,0.9375023358597931,0.6470649055403144,0.9141246624279307,0.5858231849727527,0.2776986287421259,0.9984269853933232,0.5541942324531977,0.09899278638131426,0.978668435102076,0.7907179527354056,0.08907899860956903,0.13333596462200759,0.8394909022277954,0.0022679929403073285,0.8710170475380941,0.9579290352257992,0.6069249226829205,0.09557979321148857,0.9353790546571825,0.5287569109114989,0.6898009336055242,0.8483860232579234,0.024793719498432454,0.004041120453081026,0.3105281991217286,0.5239586509726348,0.42420420158824035,0.3619665509019543,0.3237533835872648,0.0019745602951928287,0.586061838649999,0.6157306855480693,0.9791216440944397,0.883213443446246,0.18420299651816396,0.5960632580239638,0.5024654497771421,0.8481960565068858,0.20987695147595153,0.19800972538739048,0.6424357539018306,0.5109312993714956,0.9940668848091829,0.6974735323494092,0.8204197472671984,0.19939920613650974,0.7578457057185515,0.10654764227412783,0.5725530387706781,0.05901166321997775,0.31736410580645247,0.6830652398281252,0.08674829455584954,0.40741877477706456,0.05092988110245855,0.6904905442625222,0.6072517774423172,0.2924856347210718,0.7856957897544463,0.2631739020998396,0.8467297412462513,0.06957444551588199,0.3798460105017796,0.14466709595967053,0.22836078632559564,0.456298441490695,0.5618600371378448,0.33270664700045405,0.869889051776664,0.28679566731139516,0.7628041143342363,0.23403379094728627,0.7217747641262351,0.6385232313916989,0.9763794850096223,0.17033765112305055,0.7180458168770556,0.42393203437777727,0.9004040315216495,0.8905117885793041,0.011950824086940592,0.14273971909145877,0.3818303524066806,0.27715168959224923,0.39533475814554087,0.7178343190367145,0.7170962629925548,0.3503365125973894,0.11677784766184529,0.9215816598968549,0.42952995768220625,0.1682073609450907,0.3196283393336632,0.800188455766065,0.6012112924712234,0.3156909060721669,0.48958313021720734,0.6046403904762065,0.23877920294900545,0.865346452490587,0.27906227850076215,0.0746259084418821,0.5649679645935739,0.7938131829297885,0.011016555156542873,0.01640833715772927,0.9186585707616342,0.7293366474801137,0.7442693352769771,0.5488753117120346,0.37538191160737355,0.041014587676986514,0.5205132007633142,0.049486426482809875,0.13471222566656915,0.6578274970032298,0.8064555236013251,0.03840340751526372,0.44313254006677916,0.90866340736521,0.8958419307935657,0.8636748436149524,0.3454368555559426,0.6457649692431287,0.8287291145274251,0.523391291883369,0.4967021032735688,0.7340751505616014,0.05792057122064298,0.5378675016311456,0.6060845182564691,0.4440423442189654,0.9612209416045954,0.637702612985712,0.5238568735360554,0.7565250239708496,0.8218901180331322,0.4188788672918924,0.3637908197912314,0.12158613321254541,0.7163676929908953,0.6029888430192658,0.48280570943399637,0.7892442193559783,0.3897451472202076,0.39521643300250053,0.9684189599596047,0.22095743546248525,0.308365567788216,0.2158953529597918,0.47328783095483185,0.8944784025569628,0.03797366544525094,0.2812427226377754,0.9679897507676536,0.7475394712815147,0.7319874180321961,0.8361767868390522,0.6387548786642618,0.5945846965102768,0.9855274038006678,0.6602737440710258,0.07719728508157897,0.17070396330587756,0.8976860356146272,0.3929764511203284,0.6420525347129662,0.08498897885019319,0.3311044273317181,0.4270691567994931,0.708145628859338,0.1091100976103474,0.7700574113778784,0.16817797382057553,0.1386390512457436,0.2506226139514567,0.0015732383263522554,0.39247349658537733,0.4223674463809677,0.30727456043200885,0.10462952662224967,0.48101362309424744,0.47582533922270587,0.3268812144737192,0.4970388351327828,0.8381446467236564,0.08336266678805737,0.7893700039692872,0.4361457491961458,0.2458371087296618,0.7310965216357024,0.5762536854930258,0.26658626366637095,0.8122547818683754,0.42671981128892944,0.8802927960584981,0.0014043913963097676,0.807230923140182,0.8874659615051967,0.5273523804105682,0.04135008430417786,0.9323452639856034,0.3828398323893323,0.07012441121696944,0.5774400098326011,0.8411364539996662,0.8490461625278813,0.6368899280351747,0.5830985902452093,0.7182257912159966,0.1165717064581675,0.3025139125843621,0.7832865924533976,0.47960720408002633,0.018307722617625366,0.01268268180304366,0.28331093223409787,0.2607122368955084,0.3685002077640711,0.9868467188360022,0.7178300666857986,0.35157185939235736,0.25526023387544083,0.6255030630353275,0.7469256752406648,0.4292838597523283,0.579525353514428,0.03250359436499117,0.3157885645135716,0.4926242391950333,0.06871621505032222,0.3129587787383934,0.3723399006174737,0.6902716006257155,0.7693940868872262,0.5610775486134749,0.4214448043627663,0.6053219783456922,0.10530412979875581,0.8119930003588689,0.3836715431575328,0.8252390534803149,0.5005059301526014,0.3120404639449621,0.2244298968112992,0.3483346265934817,0.9897979486929085,0.37291151935567735,0.5581937281290492,0.7262584261840286,0.9096805410455153,0.2735588007092087,0.45744800374228856,0.33282039268935004,0.6903454875347523,0.4961414559638153,0.1808288141092711,0.04318877703334967,0.8219001085847961,0.8651654912257312,0.2632258810779189,0.10282625728320127,0.2898830499889,0.23491964099543128,0.3421787403670564,0.26119394562808007,0.4787282120202816,0.5088548663122503,0.053432932863892724,0.28660594740183276,0.602907795852915,0.7264718099047491,0.7226230000624296,0.551714233941522,0.4474815379371655,0.7286379320424046,0.4107077553474774,0.31820917491033907,0.12678165825861498,0.13867050165495742,0.775730961208493,0.6232166897104856,0.23396691597258035,0.7442218575442807,0.8959807077951014,0.8520822244439661,0.48472038459894096,0.4593960471389944,0.6179863221270456,0.9253670079691698,0.431328458630045,0.1213466197692421,0.23189936155036994,0.12509985309880434,0.21049863037236594,0.20551629956997308,0.5704726859174425,0.4621569965283774,0.8426923640670014,0.9063119920141784,0.6675483451437476,0.9385313220690841,0.44911861228828753,0.3411759883930572,0.9795726789852275,0.10299148341260267,0.8484174313306461,0.6521161856573816,0.21595313940818972,0.11661413177425217,0.5324919335897718,0.054424006562658445,0.2962525263578104,0.1534357567331901,0.20261611523071998,0.375502806279419,0.2264916344476018,0.14290832391810282,0.28123102582186754,0.6636108620905485,0.25142386773823344,0.8519956783096507,0.9027721109031486,0.6326238543593734,0.4476846336501368,0.9947088754735427,0.4504526654659411,0.7150898058815784,0.9756704593152876,0.258360835699597,0.5607271309929944,0.7495704171856237,0.3100572810509399,0.04982945520300741,0.8142987800481358,0.3771547961119408,0.8222584241503113,0.25394891778101236,0.5657068247083858,0.06450959687410651,0.11518988172634281,0.12343891873815149,0.18819202064924356,0.4398102041252736,0.4571252051047112,0.6828782312657657,0.5526343014912112,0.20874547382172293,0.48542263835137,0.8063512211404047,0.16496333337549696,0.5180545554729128,0.684039190119273,0.5226618475446811,0.09446205597626545,0.289911925146892,0.5840502120778677,0.5695553518644054,0.465404305563208,0.7892671119673111,0.9875843724548357,0.018072414805580417,0.5904877695567392,0.8053972065689123,0.954522135809053,0.6422295066588144,0.5358687223288829,0.541848467845701,0.1847311216052574,0.7931729572584949,0.3574808600252304,0.9925543881204246,0.9869369826401397,0.7906968235469767,0.6833802161797768,0.8291326259626408,0.24111431779414816,0.12647440367745877,0.18207821546063885,0.029964800377351608,0.3526135293688417,0.7441872560384313,0.021234993955783876,0.09727861937822091,0.3894486992322106,0.657656505135024,0.6156737360319193,0.4933468165199244,0.3808057053096239,0.5593769897684044,0.1295159738005791,0.12270646633987181,0.27614031803397543,0.6177454215817284,0.8351306946658734,0.6745294828929196,0.27800258452545146,0.9312426866883623,0.12569448747910972,0.38615023615837596,0.7677812253247289,0.16308354846912554,0.5392839911362384,0.2318913983555979,0.8812556374524776,0.022424526663526567,0.2785711391579342,0.6957829419412513,0.9798871557548345,0.6752427211107466,0.9641625442977921,0.9877206032944108,0.6122950193934538,0.7070340987020853,0.1861512008212758]}
},{}],124:[function(require,module,exports){
module.exports={"expected":[0.02581290169993929,0.01980678496470433,0.0680790805519937,0.024707376560894154,0.024436701164938752,0.03294479926239176,0.028734112582366026,0.05263161225509491,0.024218394430238963,0.07679707045656681,0.038488376538830915,0.020411178221342387,0.23774988598566454,0.22237803791373534,0.10606647306173839,0.20440495268311054,0.03358017530892778,0.09024264892282098,0.01817892823391134,0.07382383188893289,0.027820171249522203,0.022794673770330846,0.04311207894188722,0.0858588774058789,0.085784242364739,0.01801681348296161,0.057765148774174234,0.03271044047826645,0.07751500030737862,0.033775737537152115,0.4264071723075284,0.04307004615192749,0.08487809754043749,0.033397042041768875,0.012047545207285714,0.07080170352733699,0.020751990404295848,0.04542713175915866,0.022417930137573875,0.03206614730373009,0.02554765654081997,0.06221686746873655,0.05691227699777819,0.02874250196784559,0.023655881064108597,0.12903470938606398,0.0297418439626124,0.04176163839579789,0.08570564988773365,0.04517068086496006,0.11736073266947403,0.14573093897261657,0.031910618788690115,0.0402910678732904,0.053514501779344976,0.05487956956451344,0.06688424650131165,0.03854271649447953,0.056240989383820425,0.024653126335034865,0.018972498451184126,0.04530449186165174,0.05554512659698987,0.03367444033406985,0.04723761242171122,0.01890175750648608,0.12054854227428852,0.036740781207624994,0.032305334415327604,0.0315613802291309,0.048353235137747023,0.033283262083803625,0.018958562520903954,0.017389787260907823,0.06908980771861897,0.020636273240219986,0.014486620186190737,0.020826303919216187,0.024480384345098884,0.03615560064136375,0.034074380669397934,0.014243395016121438,0.014226174297858257,0.09322217504992737,0.021941367116773813,0.05278187866206617,0.025740311845895748,0.05675097157088168,0.23342737220026044,0.032462846498500286,0.02282911335297265,0.016648776638271866,0.031346857468343425,0.026391035902039523,0.014791832535690108,0.0322274893611986,0.023054482886291354,0.04813005034917701,0.04748320614387394,0.09307276374863789,0.02905171305315304,0.026751257056040433,0.049538470116508505,0.03439046786159036,0.04152298298011159,0.08471187022776112,0.03760616428564715,0.07058439843595665,0.031609234325626574,0.09835201749720421,1.8843383718157288e-42,0.021887315627607165,0.08196596558768768,0.11018875657012893,0.02399762546842671,0.03899409324284343,0.027106264956238378,0.21869937448891497,0.022371684874872722,0.03478006044861305,0.026904349196448293,0.09789970969997287,0.03819592842707823,0.03618155750403994,0.05300397430830711,0.07562870202722954,0.047633955023852655,0.021857850236018588,0.012529658882570389,0.056092009926088135,0.034643192876971034,0.03597901051413969,3.461491089086944e-113,0.060514064575652934,0.05491693533500618,0.07517079361905703,0.029290042533647413,0.019250413438484187,0.015032050679856952,0.13738038167756586,0.0848185901337208,0.025543945414864815,0.11879516614342991,0.10986271299037093,0.06916532642725214,0.11680314369994126,0.07322789754554783,0.027405292578438455,0.021039884534788642,0.016813158228668957,0.045021778412361935,0.015532967654504331,0.005939512150685146,0.04888562214211292,0.07583383509244115,0.013222434105106633,0.028735594315036438,0.019408267940729466,0.03599625958824372,0.028933978891532795,0.02268811872601574,0.058590820765705785,0.07356632819336967,0.09541621635660402,0.16164714373129735,0.03771414168307977,0.042371782098452535,0.04681948620138078,0.07434076564910683,0.2605270422301485,0.03245963216115614,0.045008219017547264,0.05801802257949005,0.01772267680546852,0.07442606127913928,0.025520984790440324,0.19217149899394645,0.07398727455092766,0.08962776844501895,0.017113221880106038,0.15779476197091516,0.05000991941503552,0.016680361242893713,0.02357166403148756,0.08748158662867005,0.0919861781607415,0.019715297862415007,0.03147588825427029,0.04087808159400168,0.05164218984527829,0.08660819755317262,0.06757247170126832,0.030927739187573616,0.03354784218271484,0.05026328561489477,0.029728876594261246,0.018949299129419103,0.04139080250234192,0.15421006163833356,0.03571150544976464,0.026159167209157317,0.07414438879459126,0.0914722609956259,0.02973282771243303,0.034090306408600606,0.042957179991101976,0.023150616424995298,0.05547542285761539,0.05414354356863012,0.049404247590164235,0.06113283532494327,0.04082660769225823,0.02570903109513597,0.088500243242739,0.028115186507114906,0.03795019672553772,0.0690038239370748,0.04288247124207597,0.07979976359243623,0.07808092236376528,0.017144262955964776,0.05204486840403839,0.0979277886728265,0.03153488748784068,0.0314544025926801,0.024056732713716583,0.021613646864168737,0.025680411985328232,0.021435736525593014,0.024595193073633326,0.02978691175567457,0.05573366808250603,0.09165348086399468,0.09504724888789444,0.049478089110595015,0.11766779051761107,0.04524123432361457,0.10286148685951971,0.05009520362571221,0.027661952458460017,0.036427903740401835,0.12693965087364742,0.029794671616963052,0.18134223408913608,0.031621445124334915,0.0701790062075961,0.021618881949426107,0.04506129307999846,0.02536469300352986,0.018561172826308807,0.07472450902113068,0.04524669488104702,0.05659805488940102,0.025630555284798084,0.02238259233462076,0.04123653073525546,0.07474515689602594,0.11218870016453618,0.03733814969264245,0.03052769132020579,0.09749417263913925,0.11590165578561638,0.023266253232570058,0.02499212124672323,0.03369755491878126,0.024173123752014015,0.022367120633141994,0.043015066968525764,0.026025180367885623,0.04590670952171454,0.05312420447081041,0.03820856120344478,0.02642419500107203,0.025660483233380372,0.13207883697139775,0.028098010204450418,0.06817640301044686,0.034674103274365584,0.014260908932338624,0.10075582359644296,0.04443895645218849,0.029021154616451966,0.04207287928794701,0.06044245914060742,0.025627071562405276,0.06380646746025169,0.07522365790830828,0.08108903431918466,0.1146924380555842,0.02358505781464462,0.021067118418612835,0.023562298475613377,0.025945911295477807,0.02167805903288996,0.021020136330931895,0.07424235121139773,0.013726897313680422,0.03376838171976667,0.03335756698043479,0.030813175212188938,0.025897780204358397,0.07494821925521569,0.034432440931054645,0.023306891074917322,0.030960783909967017,0.1753893097869198,0.05533692090712707,0.07339790148691495,0.08066588218245889,0.017580981695323992,0.028645154928767628,0.03421912819718,0.05836134688625715,0.1360135078259662,0.022243478590681376,0.0454899635020199,0.06827149495052372,0.02525563755466471,0.06927924312164559,0.07855204327606531,0.0966850515424442,0.02746461330572718,0.034131755819247114,0.03938698001269756,0.04910818091637954,0.09905196888230275,0.05738348851297334,0.18969920439705384,0.08006533843022587,0.0730533939196614,0.04114605715295454,0.040346571751590336,0.04604295902922675,0.035724227845915224,0.0847279194158949,0.06761121683003836,0.00279985340685043,0.04300091703881523,0.09551804576867198,0.024936268130239584,0.08176578211589572,0.08187825135743243,0.1540977879572877,0.07954532086522821,0.0690953190859075,0.08006987099747846,0.06218301449841183,0.018801593969358602,0.05439910456258117,0.018947060065187708,0.02185031154981473,0.017329556198323864,0.1419358943506093,0.024311368115541514,0.06421002911000029,0.002303966428814136,0.02554378013639692,0.039914840298508426,0.08325672693384983,0.02745554575298816,0.10656047929282836,0.03474480735064383,0.02287435636279814,0.017926146214738606,0.18584149887500553,0.062139095837278634,0.03903764639939361,0.0256860437955179,0.029326029773900315,0.02602152053406608,0.0006628602640289188,0.08982232173058377,0.03608830885192688,0.023258814316150504,0.04677039929942542,0.0288865878005073,0.05497286709316407,0.03352262694040431,0.11544819771969828,0.0687927446633785,0.06822895239940566,0.025281705835187324,9.10576715625985e-11,0.18510418880923388,0.02591032104529694,0.07565948061132456,0.04203267373388481,0.027469640189343437,0.05563148279850947,0.09820912516868742,0.08563587653428242,0.022633794012236842,0.07046834382240794,0.028203439303128193,0.02563938517799303,0.025694945657926065,0.017852817966735022,0.10284604118498888,0.07091491826686794,0.10243086770877516,0.027618610009325344,0.1061019939061415,0.02575051233388245,0.017595263250759545,0.028644791997188376,0.03850594232294255,0.025471240964105694,0.06184765106015542,0.027137011335746315,0.025690706535414595,0.02115189669012088,0.1756143639328557,0.017508493336696546,0.004257642106984747,0.0820645840391738,0.021684834224214748,0.03412970206081883,0.1307331203775341,0.025085863771487093,0.026995582694082743,0.03319650535861514,0.02306068092261668,0.018605656625256702,0.09370304866541646,0.07703941544793269,0.05855054212376668,0.032767536191322,0.056749429092156474,0.1667493666175056,0.13689228873727197,0.02428402552656082,0.027121038198488375,0.05887774979609388,0.018304038063935373,0.032827767997665236,0.03837969582991516,0.03890472209007509,0.037077235860067,0.012682891483561587,0.027612458261255083,0.07265647424534276,0.022671480706563243,0.061285068318059986,0.16051550212103058,0.14052212304657616,0.37742511476327795,0.07167903654694893,0.026325986516079605,0.034467803791499003,0.02486969364436235,7.657924286675775e-47,0.054887567020587266,0.02469786279123228,2.161324749658834e-6,0.04694891127655908,0.07605646511061243,0.03448665355084871,0.03695679596218129,0.08512680702532445,0.10214545581050767,0.03336778332930999,0.057598595107952705,0.1434612371276025,0.03162405207532314,0.08603588027619824,0.07776735205815632,2.673078329140681e-10,0.03938333984870992,0.01958502503133464,0.08594951925979374,0.0180648770677457,0.03958468138026494,0.08962664919561479,0.02142607209060151,0.018014120426867355,0.05794081150336729,0.014623530915476064,0.058533074015832826,0.13988031808848073,0.02280589739055284,0.046646960844725735,0.020423174345241168,0.04100373779760164,0.10207767016873087,0.129917151691221,0.033688911463730174,0.09972821508460802,0.13017850355835436,0.030707215114695638,0.03233735298697557,0.025164086067955317,0.018341532051732713,0.026717697131457375,0.056335364779603166,0.06688016732743046,0.021214591430865962,0.03428549396779602,0.018940540188251056,0.13479137020427903,0.02654847747298874,0.34671087145932566,0.09727714573859131,0.05584651934365496,0.08656594661586473,0.17952626676860714,0.01959415118290658,0.02183202201898853,0.016353553220962432,0.035504346465533174,0.032588758323555206,0.052636638523533535,0.07559365105761195,0.02801995311250109,0.02766709795460112,0.07075399476286727,0.12281332997312411,0.029116176710245297,0.07270080717888915,0.06497522136040179,0.09316199489368383,0.038324183105887664,0.04203432646405306,0.02048422940258571,0.06091087381819947,0.10998548520682677,0.133726431313852,0.03289673716743858,0.10563739303989748,0.09807407943647721,0.06060255019818965,0.060715929138347356,0.06551978092737995,0.19356780401513776,0.06122946091736469,0.07276523869736089,0.04197277723276371,0.03162184637223133,0.029931872621463494,0.04115971544986749,0.03665812758562547,0.019686518556607385,0.3675129845155481,0.026935699942201494,0.021107337370632407,3.054716430338041e-11,0.015522099468724026,0.06407056416632874,0.02247948525467608,0.09414129245619562,0.09304364645982253,0.0887733422848424,0.10000138996522881,0.029466973406028486,0.05337291163378646,0.04001966594787866,0.031160911528253357,0.11835762141584617,0.08940277403514803,0.1346214483669904,0.019901663420563123,0.0843111246131808,0.016759536103008198,0.027685379912145647,0.03208726567612191,0.031133232256681843,0.02392700440065543,0.07062309167830565,0.037089407917057754,0.024764509858918912,0.06892118378856157,0.06696628235621645,0.021462852944574652,0.03226412791650171,0.03189492648341772,0.22613151203454215,0.02503315203819045,0.11398038929798167,0.07675170638156865,0.03341159368076708,0.0196581811752915,0.06478086095574014,0.07248175392068743,0.05001538768910846,0.05038211702704033,0.024280420823958617,0.02764947413009051,0.02638426820806935,0.05565936189664667,0.019647798454632326,0.17587072968938317,0.13065094488923557,0.03544931316471336,0.026148449945372947,0.028504495483514695,0.05245929507512982,0.03322953146887164,0.09450365631345656,0.03496161357740813,0.0051959450752323555,0.01702067417059094,0.01660648734966977,0.04693575526704998,0.05699645351870294,0.08440826630979059,1.483000957359344e-24,0.03116009779978283,0.01880707430620866,0.03706499964035746,0.0823186330350799,0.12212037019308723,0.03148989531729518,0.047552377837082355,0.1796723202197472,0.08023015501811848,0.018156854356305558,0.0706451729779336,0.04614483958728213,0.09467861664469378,0.02372870201263534,0.023543361563199323,0.1477498110632937,0.06319956734958951,0.12514162513575605,0.03239053938321929,0.04720534503468256,0.027906476562357865,0.0432639068759671,0.11412334352892226,0.035445353564654745,0.03858918378614319,0.12097603784659307,0.023528548466053855,0.04848318780953462,0.01784696744970734,0.02650362218010521,0.04466633156067816,0.03888657074659505,0.058073502703999295,0.03810993681942068,0.03327730603927412,0.0990018136269509,0.08187233905047492,0.010135215974872437,0.14373388204374143,0.026333942500695453,0.023280259093480103,0.08400169810094806,0.058103169566317066,0.04175403456901315,0.016887273112461465,0.08773674754600685,0.027626680335011332,0.03555018493289117,0.12708201182324322,0.06388324495575833,0.055796278776587466,0.01712875160497034,0.06969510360327999,0.1124263037466727,0.057478638853376084,0.02308634033152098,0.012800474186194418,0.020124501870783882,0.07130918225395193,0.07777015422030757,0.017845723500283742,0.17196372994425907,0.017142258921742978,0.1613104529999472,0.020892602904967233,0.06056344429446921,0.025804669953587836,0.08335297632312651,0.034225350069698714,0.02018564345906935,0.02403033103198465,0.06118721963830241,0.10224784096640671,0.08555384579826059,0.037337076854955034,0.01989783154979759,0.09444548399608103,0.03205191289197851,0.2006628730435021,0.02129654441965009,0.02115217468418574,0.030696270886536117,0.05217250459600655,0.10957632152750289,0.05624601179460437,0.039626972919710304,0.10133065272700252,0.07146234758248345,0.05671307607699866,0.04251513284229942,0.03666221501097739,0.02376369371119759,0.10839734691612404,0.023174213991762314,0.04893585418425329,0.08574654809529526,0.029790553714716388,0.02301992728526006,0.04762453293343949,0.04388232672972659,0.019889598534981727,0.014624058813579026,0.06691549769122655,0.047064090325063375,0.08497904385738793,0.044614888723088476,0.02827261545485205,0.1187362135378653,0.020772658215646275,3.312374902299111e-11,0.10685128893974671,0.02077965217146916,0.17906882796144158,0.0176272183229998,0.03247103964418856,0.044550049845635785,0.08856101428043528,0.02910175634286571,0.062492456396010324,0.05402103084397186,0.03211453799092128,3.166827768784101e-16,0.31964734879214535,0.08821317118783352,0.035491122076005466,0.06058445258445785,0.09724712179065818,0.02792049441173128,0.1013305971879525,0.08008419723380994,0.03858190382266904,0.07223283996405892,0.056563344108281316,0.04053960455925486,0.09941357893670594,0.03353006356523181,0.09908117402245033,0.03229239668774401,0.08368700328751315,0.06898916035546708,0.03192823702047287,0.027800127974375883,0.08232312704321008,0.06570897791925048,0.03437342953435871,0.04456950323180511,0.017777034907750355,0.06452689534569342,0.033869703802795297,0.04822404808185895,0.042745684310506064,0.05906340249064043,0.03795095045783877,0.09653538995796136,0.06085827822169444,0.02144393007413732,0.033037554776475415,0.021086363115472913,0.038793616469308234,0.019715300710344774,0.031276867604817266,0.02057408447230709,0.03736505077127813,0.026050924811662737,0.022744372954841708,0.0374947731140119,0.017330705825009018,0.08611621459267636,0.05157904545102391,0.024358002016817298,0.31245185405548026,0.027737618091151644,0.03017818339165153,0.02289606586781056,0.0608172804375946,0.13785690105810472,0.08138347457628382,0.070262145263782,0.10566717122583381,0.15285003776438996,0.059996384174818826,0.03140420078667285,0.022059768839814864,0.01343996985416792,0.10474234195416687,0.05531252956372201,0.12349109418996232,0.024141534258988583,0.028373439920969662,0.06908816961810367,0.036195279918852095,0.14613229564983152,0.023862320043101175,0.02064774560242165,0.020471532854537556,0.08120748128354924,0.018758721916567796,0.10101442441866484,0.02304819821648386,0.03686513390434716,0.10573300584009585,0.1917298531803649,0.031244938539266378,0.037207310205051324,0.041326567477828854,0.02065132725481575,0.03764991897954435,0.06429483531650951,0.040959448707040304,0.029084999741987777,0.0436390898293345,0.015102752494113218,0.10706192502011574,0.21556502735587424,0.11351301403649539,0.04792399970436319,0.0691842557549116,0.05470908590462253,0.018874186876301137,0.02382258097792576,0.036291079849820135,0.02379911496440024,0.04202593257064999,0.12886702501604216,0.07643702128239187,0.028915020251790848,0.03247784610362217,0.042144577596324756,0.020382009530339296,0.08506127822437975,0.06342055719357373,0.15848853223161657,0.02322313019576098,0.01966866471946147,0.051487144012004854,0.0652157976087278,0.13390759665289473,0.03152964447228887,0.041354403172346114,0.11282314978446718,0.03766233660813346,0.15146569368730392,7.110372875442827e-7,0.0440731466953312,0.04301182379563376,0.021114561386986398,0.039942458719705774,0.022543670821225603,0.030026412468934473,0.05916775540045522,0.021157935041057018,0.02035300650493676,0.05908058874621102,0.06479899523666714,0.029213905644719713,0.046920080443703965,0.05693435533353223,0.03843927882647097,0.219339331716018,0.18482753395118132,0.08408481362730852,0.0642731419198025,0.10189922553414672,0.02848230615371526,0.10214725029032595,0.07534734206564549,0.03534532550899184,0.10893499529984046,0.02462166944138845,0.031765668279620574,0.02465860271961221,0.024723835107797038,0.01560890581664845,0.051770581215213926,0.021867998255797296,0.026362927407901224,0.03986545288694734,0.03442678450153846,0.02523445644689286,0.023572455785572464,0.04038854045201841,0.04876795086294022,0.030998774413019115,0.030295642892810656,0.027594512966461548,0.046248415221426774,0.029004322129117122,0.05420576517107841,0.07108750178708785,0.022972315971954607,0.023441937489876205,0.028604993361203965,0.02542056392034279,0.06200484148331276,0.03812829109373457,0.03092683404101268,0.03401053819805626,0.02390612833908117,0.026404371382667786,0.03772943458405838,0.03355329118774587,0.034966493026427806,0.022221663784678904,0.037774290591011506,0.21495292270076521,0.028292096632555573,0.028767899826002648,0.05992430788013406,0.05986746988673461,0.02994050584373375,0.06074103512754456,0.027896533046495125,0.02796026364675891,0.04681034918384227,0.20568079425584201,0.035977203826877975,0.031803151939129574,0.029057750507991403,0.10717160656711827,0.02018557332923678,0.08369913564187928,0.07275208435118445,0.07487697034058204,0.13354162830910116,0.019157543588821907,0.0348884536104148,3.096215047670375e-109,0.026389800382494992,0.024853355755518867,0.027066551571058684,0.01679546556064588,0.15683114688644995,0.10188517297857043,0.026886564762707916,0.09793938505491727,0.026803283883901283,0.021864332187287012,0.1138350252230393,0.017351466139442908,0.023487679295583486,0.07578739602246799,0.05367657361298993,0.06354648629893618,0.08096912607087932,0.029735864908520697,0.03282567164136435,0.09992269890241286,0.051300873740149584,0.09837615335392894,0.08600699894541142,0.018035008766660567,0.01943650082171774,0.029964730512150786,0.031035627457684165,0.052214834377525644,0.021841943293278925,0.01943418920725602,0.024624172538949326,0.10607012964903884,0.05429260442691434,0.031764890435090926,0.031068001068134326,0.11937882246168091,0.018620027663307538,0.07832765432811999,0.033956166692619236,0.01861404828064332,0.06589608312700211,0.01795716370866633,0.025656849269576464,0.03134418886893815,0.020174277730487272,0.034437067454024584,0.0946931529195454,0.09974248412926831,0.027550327369818117,0.015328690585854291,0.08977130110678454,0.02876782332741664,0.05816039280746496,0.09152224507186582,0.08651371179709401,0.05269086549724103,0.06865336568082485,0.07644681369558358,0.03140824057727999,0.021335004516318846,0.10022328417763789,0.13309860817512856,0.07403329913012004,0.043182519778050814,0.102612473753768,0.05577679669621768,0.032421020837785,0.10521014083168671],"c":[5.586501277376929,3.3981958113403943,3.5584775793748604,1.0771128130956067,4.027924199507542,5.49477587084642,3.852854822423615,2.6924888741726907,1.243413478253437,2.640729600655908,4.700551952647629,2.624507008724617,1.4915047092269242,1.5522338655753722,1.7934612677302522,1.5402065149290924,1.2239499859818728,4.896115616481437,2.4649430086771487,4.743077147960716,1.5124526851861322,3.2396842003227713,4.876190514915723,3.3920083414373225,5.310419937179818,1.5341484740570857,2.9646573741360687,4.695601493225201,5.584538335958463,4.747332453238206,1.0812818586364727,3.8250894940458826,2.2381537253652377,5.688824333414408,1.002154973487113,5.7010204915681015,3.059458091727906,4.86338224117861,5.125980775245469,1.3476643672580926,3.052798358284341,3.2385732790654966,2.8765857011772136,2.0742519609319947,4.917584130725508,3.2524594414060073,3.3090101125761766,3.056947495329898,5.355449847904147,4.612804591077938,2.2400634262849874,2.944163848693514,3.769967971421753,2.778162986344758,4.707517227341723,3.6375460601235643,3.4048389301765294,3.347923682793768,5.724859781480007,5.069457708919511,2.711925438864288,3.91086428757111,5.925073564784103,5.936591110058859,3.836677440794949,2.70054774905695,2.242101714610635,4.809637966437654,5.719466355469213,5.365242147616797,3.7899926324610105,5.2474477463351645,2.8811744832812884,2.2471517276235566,5.005400226647814,3.6078502380018866,3.2885505915007176,1.2429057773869936,1.4849042121967406,1.9028935293854223,5.722903399304771,1.4009810631486288,1.014957243685998,3.338311554434469,3.0460100066328337,2.5020242179058707,2.707647467065403,5.7942028198337585,1.9771555136061383,4.042055180371573,5.454582741301336,1.4578547520573084,5.332836073743901,2.2113351093870453,1.5215849658540384,5.509376887823184,5.26216186378827,4.01774460530217,5.254531157813285,3.9971902195587443,5.965275970388809,1.8412068897738045,5.112163038749285,1.5766502771070203,2.8302312333572326,2.484986563936297,1.9324067232578603,1.4299973206921737,4.049300743313836,4.518267488126229,4.0479419334413045,4.826021739614047,5.628097165720463,3.165144905555417,3.0315284885333362,3.6493275481829572,4.304943332564564,2.094835504952718,2.090003466899181,5.4877889446028405,1.4831078437610126,4.427041065922389,1.0113515298410505,2.559884499304599,4.524225828622175,2.1890421482847513,3.867570836616741,1.2741955536887208,2.881095024449708,2.4777805935626476,1.8864568430347775,5.586162306392927,5.443227364226644,4.9119543009790245,3.7299154527937644,3.4846937187558957,3.391830629736851,2.030527405366085,1.0084492281077342,1.295784830648883,5.453297180011937,5.533999738787697,3.8767218062556066,2.82195184558283,5.571040429829605,3.7095791551956516,5.577457721692712,4.049960567233833,1.9498134131687186,1.6325627109070098,4.2137868623291554,1.5732233568061118,2.9171846248443467,5.311210638639805,1.9266479607457667,1.2365189330423578,4.585423823397644,2.381566711033236,5.361299489323468,2.599608947718598,1.4294317663541214,1.1121911780793294,2.002834837190101,4.651233151487285,2.6885722900102484,4.312437982892065,5.428034451405024,1.0257989724234964,5.435630731255919,1.5900328205387961,4.2170254340353,5.279576969565958,2.898451467891784,1.0788523704380484,3.2470367264168645,5.556209466661381,1.6318615829908114,4.109912290315309,1.8389930548012459,2.0703827807497266,2.8965762002353372,1.5244071806481576,1.0350943643272728,1.7189395405518062,3.6839421751254777,2.489054138741288,2.515274189203395,3.046389730043039,5.760685929340553,4.124292869715393,4.457799546433775,5.919262705352805,3.240112458828704,4.9720937496532045,4.110480954219877,3.229209996529872,2.7069472033244293,2.079543022161552,1.8070061164743536,2.4005537212680252,5.8311540284122945,5.64170855793137,3.0400635266919176,5.659561640310418,1.6959572280811932,1.4377815165373733,1.4680200958342162,5.500186969538157,1.6681799975155134,2.304372335630104,2.6703084226748564,2.4790802414361437,2.3361416995290054,5.022135906170804,4.3785355723999,5.922000872571734,3.8448942318637194,4.771478080629505,5.787847724134488,5.181823451730726,2.2977832770720243,1.7519051132770527,4.095879367165171,1.6698464930298431,4.517229756552864,4.425417264026525,1.4131871878863758,4.694844754282921,3.2555931440119448,3.2591060986649314,5.012658150165768,5.367839957675496,3.709874705906615,4.204800951000787,5.2089081352699615,2.219029809318446,2.058314046869854,4.034914627729346,3.1443395799267817,3.7098172789312436,3.268497648919995,3.600918567132331,4.319919234557305,2.4981759641542847,4.428187262796857,5.646151922563537,3.403568894581707,1.9431145295042431,5.885735079046504,2.1678562722263575,5.1749134531955345,2.405005398845457,4.740995947967965,1.5470969762795175,4.154371719619643,1.7390651024627959,5.5981875194342035,4.094891364344928,4.085781219118155,1.8052784155308146,3.424142381333636,1.1243817928635516,3.3060556784217603,5.624913838927634,4.401532174766779,1.110740288579969,3.6215312632543486,5.535615438233046,1.409859583249066,4.771771736285307,4.035498749071466,5.044210968404442,4.755987619026735,1.972657667249458,3.13312927148268,4.312775108823645,3.1024850323702204,4.246609281548086,1.4061211583283886,4.314294155471888,2.9812943528841123,5.437941204555092,4.905654237503904,4.464041856313117,1.109275974477051,5.9382405755277405,3.9969197341559752,5.665538631285471,3.600742779118961,4.761774505278515,4.2348153021130335,2.869434753364483,1.9776882033056522,3.6764926554657995,1.9369497970150698,3.1945530676683864,4.227135300355188,5.218519627868423,2.0287891611653155,3.6978704096709327,5.429750038937945,4.658003484346737,2.450187712576847,5.266126477054851,5.701693806342645,2.355878902315287,1.6201028040514989,5.237301607602786,3.2503651987677586,1.346859444355475,4.453498577455648,2.549918195249381,2.1459584512495558,3.31015175857039,1.0050591153599433,4.130806617456601,5.818367870980192,3.000852290164495,5.945987859508568,3.3932530971537167,4.4151992598378484,2.249115490434889,3.8496487651952207,5.033025355298823,5.537188869643083,4.668676745448984,5.83870975165393,2.316401106288386,5.029315904206411,4.268033535246574,5.020552115020052,3.7318469284874336,5.2954220250792075,4.937204568767766,1.6751212077895885,5.999035217947702,1.4339380805323467,3.827041134687951,2.134360139857624,5.678565953231696,5.627359352673368,1.4927508089158472,2.839036085124625,3.2924173867290065,3.851491421840384,1.6359641869694077,1.3470386057233155,2.2476188674679367,2.279885893265018,1.9635514591153327,2.546558043472813,1.7900831107463069,3.011592421136287,4.8999336918528185,3.487500993707028,4.177510071097477,2.1875874811481744,1.7611882473301468,1.9750129171774813,4.016686005062002,4.211970057980249,1.3241233534347998,1.646983172858866,2.0021557086049193,2.3843597690938525,4.403106176919145,5.153777548061861,3.192342813272392,3.7541992414333185,3.2312246629338417,5.844104778377174,4.806301371783279,3.5606953797958223,4.45730775681413,5.383992791667537,3.8021579624458512,4.169242123235967,5.699118211773342,1.9751538819278394,3.0494404189228677,2.4166085363007195,1.0714251737374816,5.014030905194391,2.311187148453433,2.1108700932857185,5.783674964303106,1.3178899304712923,2.1851700184899707,2.554458388282618,4.673835885828854,4.257975929178672,3.1932254658965533,4.735827373743177,1.7532208346848168,1.0290609057799274,4.236648171638684,1.2709612371658243,3.9331738648914154,3.2460033905784558,1.6286075350706244,2.8029691221870223,4.213727305060143,2.382278755982662,2.2729782012468895,5.731559609269748,1.944827086437835,2.7720615847410004,5.500427169608995,4.541244584390229,1.5952693458950808,4.334251540989936,2.621409057386108,1.8002982308038442,5.401116065341587,5.452060149039387,4.483015499134988,2.001764988403684,3.510321070439212,3.766809991901625,4.746488416141396,5.32575639353915,1.4528879963457788,1.632856578371116,2.8264080741540676,2.964847272401131,5.566272846912702,4.500911900499144,3.813770947381895,2.1299071008042016,2.9769835039100725,5.462342495420403,4.670469184275378,3.1635291081232855,2.26929845232337,3.6232287001864263,3.165396282998949,5.38457489152297,3.924452829794657,1.1171915932456002,4.740944502862281,5.766668362604346,4.669584543004777,3.182265788993798,1.8370382565335865,3.2777474777511664,1.1585008595365234,5.760257908492008,1.3852595228838074,3.80549425751613,2.2573147798005957,3.3696527426859317,4.430617007799589,2.47069417297387,5.902875764948065,5.0658035251333775,5.7374992307411965,2.1870325947007734,2.0940774922601304,5.097926722639354,2.5801734602022477,4.074008047462312,3.0309681710165495,1.959298017592345,5.69122878260941,2.955228191117344,4.290658211165264,5.182349367574912,4.95411236315155,2.2445171903562913,1.7336451297314117,2.2877011234326474,4.211910546973763,2.03407599879878,1.130848883722775,1.9672573781781346,3.652391775980254,1.1076905223569768,3.043571987552343,1.7774438226713876,2.801116814710646,4.132810999633303,2.938481614005191,5.792511795229769,3.8575489531604683,2.557477486560744,4.9404273641634555,2.0556624544669138,1.1062923153598383,4.120501210523507,3.7342677815995806,3.8792666996121485,1.9012683993170056,5.06114821258565,4.63989999447508,5.099349089157569,2.5333629919675196,2.213609464080163,1.2797929221492634,3.4126777076941854,3.6037053875716465,1.3218801212912192,4.042322063073577,4.044609091605203,3.575188025417031,2.5682931619442932,2.9849636286830483,1.1167967887016086,1.7729993737109775,5.7720710092784255,2.6050024074060465,3.387575049214278,4.317823268693161,5.368997097105963,2.7302814701028835,5.034993578507197,1.8458399839688913,4.801969758366801,5.640050630248202,1.3886396512632084,3.8951465477526774,4.775425588882882,2.3462219291438693,3.3586829491048986,2.167719379251033,2.123550176197666,2.640330638410311,5.3831306766252665,4.011046756006119,3.6315428502249394,4.822366923459203,5.653769406087768,1.8784084249509938,1.7375239534505695,3.5527663016275626,5.525004678196739,4.546412072246163,4.436979477381193,5.79403882796319,2.30738576099543,4.310350718177468,1.1457622864058417,1.1271690280549331,4.044995002642642,2.0857810224969686,2.9337198892605354,1.1873866526520584,4.401587746696306,2.0791631015917513,4.596044206787764,4.96854787753231,5.118675306154943,2.7104671730671606,2.1634844154344104,3.1238950918312782,5.799780030825644,4.979446682881015,2.756113162731341,5.04582144738065,2.791827391898968,3.095920772531108,4.780683145971117,1.2091443853269392,3.714272279103481,2.2276493485801296,1.5639301195233937,3.0086802703468196,1.874812257335681,1.0506267894820822,5.415883952841443,5.979764600926153,2.0143561576298534,4.212911383802987,4.5996491774895345,5.846170001332403,1.2103351941172826,3.5153058620576885,2.673018182390611,2.723731940587483,5.96989367153593,2.018324415740227,3.052759900912564,2.5541181268623805,5.602950744744217,4.14073622352214,3.5207707545293934,3.2919838671689705,3.6165316068935374,3.890987291054424,2.077338794361822,2.4555325995185187,1.5040085995563293,4.790496052678014,5.090983114301662,2.9839316511145535,4.915077381017774,4.1103228238395495,4.894417993254455,2.4531451299290876,2.8160791415149777,2.157669770458055,1.0500524969829752,2.832497002167872,3.6789163590651532,1.1693320731602277,2.8562543234895292,1.744024597725631,2.9889612729513217,5.23459852998794,4.9362946451981475,3.7850867490115547,4.791180215502096,3.4401132766153486,2.5292933312176715,2.2367796875832973,2.4825228580203555,4.417340313891538,4.541255771249489,1.553604008533285,4.078213079771798,1.738945344434212,1.9142626333652426,3.6010585543486684,1.4083226930020945,4.845142255273318,5.70422377635547,2.433991112182289,5.7353097012346,1.7793493958021525,5.871902172732909,5.76293734919339,2.2552890971707553,5.902807483507216,4.4158983699007,4.427193888198329,3.6770935102139948,3.130467601567092,5.303023434219199,1.9360575958817963,1.4111914328976785,4.0211627975568085,4.446351257851981,4.566150228680746,4.997431441040593,1.6057407576739016,2.143812856639678,1.8855600801524777,5.27056673043117,4.296435029193106,1.973417163785265,1.1823632567419031,4.835360650383571,5.525639452258155,2.0130687063616706,2.035376933378304,3.0733361710867735,5.438662670517363,1.8054508070154598,3.895199821818956,3.9587158771802424,4.731063139084054,4.023045003948211,1.117437636591704,1.0323275490041997,2.582733158275654,3.3809456310902712,1.433448643216684,1.409439094156555,1.2070613740690042,1.9206445505454863,2.4792747994717717,4.497552666033659,2.981890152848141,5.199524319135151,4.103137585412947,3.6554174078581605,5.684585478507714,3.381669482183394,2.218199842453964,4.2048013134810756,5.899057623112341,1.7003082970683538,4.540612157843482,1.6739157031928533,1.9296879171402428,4.224524085019088,4.136893737268021,4.297394516825751,5.7657691843862215,3.7124509775063843,2.466502786531999,4.304559995821758,3.5698885966964125,5.994902870129193,1.5361506129791949,1.8734903439958341,1.1336343446154853,5.211866753454844,4.227930922699374,4.062899966510494,4.026190327487088,4.54378064960586,5.699704277779363,4.187006779496921,1.9597773053857572,3.1261189637201596,2.543580142478352,3.971376765796916,4.268965127885178,5.9407941959919,5.428589809518294,1.9337090319435981,1.458960349909483,2.607137631883436,1.8578100677727518,5.755677795229657,1.36344332982986,2.3713539203534553,2.001628681492932,2.2714802485328383,3.9580774318234826,3.0303187969380154,4.794692752515005,5.400430329553458,4.652730656315558,4.913893056517184,2.554581959868917,5.8101816001881,1.4209208043791846,2.5316458179278483,4.069992217639631,2.579969075005987,4.666897319413759,4.124516696900315,4.086278799472353,4.329945200266611,2.343168513937262,3.2908780569493237,2.4160161517731193,5.9458420062525175,1.6125158101181505,4.914225273375928,4.073687043017776,3.347986637055649,5.524563412443038,3.3210698705562494,2.006811912354535,1.0091013186078315,4.322032515145889,5.524163628688719,1.9412130854800127,3.6973219762111555,1.670616144867816,5.944242370280142,2.757775528449117,4.3874869993996235,4.176329527928329,2.5811601213914175,4.304949119923205,1.3761524404771122,4.741337280455813,4.211252321140253,1.2193622816467355,3.391450717454786,4.894381776453882,3.366888673824976,4.2642094108453135,3.6902067579664157,5.281879156019784,1.0749629572667498,1.588194388106108,5.572606849106985,1.8325322558861548,5.361999753062651,4.649563239525897,1.092288090132765,1.4609824227559511,1.9304108957811563,5.630364997104314,3.6244824312975092,5.801586040322844,2.6709734760865667,4.934274230429541,3.383586417571686,4.225515141609704,2.4572490269440785,3.798824573450415,5.023311601623675,2.675550449684594,1.048667279332003,3.900125948090737,2.2773932404288213,3.6594304647883926,3.121113464604032,5.956346661491596,5.3667061941107965,5.764039754201622,2.0881142027132826,2.83204389303346,1.4763735187170348,1.748902799971729,1.7058258739673862,3.856603152074886,1.8622071653309804,1.5226822354579685,5.142989756152392,4.3180889051132025,1.4210235351084235,4.015584313507879,2.922580759707635,3.013594568767231,3.2295429770404604,4.548460216014359,3.182569895979043,4.170217874516843,5.083303841390489,2.2356529809473837,1.5895898678182965,1.952377984751992,1.4793968687825934,3.094790111156468,3.0712640812048644,2.1267343748012335,4.608877106480136,2.7686011059201756,5.771309109483294,4.572507351008419,2.594245666804346,5.451787340701255,3.433719861090756,1.5138972729575808,2.2205659080642883,1.9661979405236332,1.3440535798264444,1.8865742797096532,5.255964928009095,2.858182691423178,1.4084204420645166,4.177913455624543,1.8169882030146658,5.930853681072069,5.6635921620405485,1.685795551286319,5.469828813493696,2.3382172389052913,4.079689686908342,2.475620619621816,3.0439036876647454,2.7119571470097905,4.6851447167243325,1.5967833242974452,1.167958991473457,4.405345408699526,2.749549173635121,4.125422095284954,3.9224900824424402,2.9756146775531236,1.0006602221898921,5.968216159225357,5.224912182146432,4.130404789732469,3.674459505073191,5.383012334580236,3.7545575649426777,2.106641296203054,1.3059573728391418,5.346992254576705,4.827220164285341,2.620340892544543,1.8014704994841881,1.2032291983642809,2.917114557414221,3.4887599716465636,2.839319284519391,3.5660297280072983,5.843396337502198,1.4889720411994203,3.249777806107407,1.7807640033815322,1.4017317003174137,2.26780659066271,1.4367519660761487,3.6854428513449413,2.814977366261653,4.1649339627747874,1.0351121745586824,5.727575870167903,5.413065933095074,5.274822498254693,3.7529361727592736,1.86945555490486,5.100528760809857,2.834458583423441,2.797382722669465,4.526522495588923,3.1130968816329734,2.308931425511287,5.564969396196689,1.4058802015038854,4.799484027035657,4.560390786109894,4.014941565255871,5.925825459454885,1.0215593277300419,1.969598158603846,3.1179318041705377,1.06629679441154,2.691006208804388,2.3365468128356808,3.439606267577974,1.6810317351592488,4.014523937453761,1.2453329058120446,5.6828764623246695,1.8024648849934313,4.269706285765678,5.252414968961068,3.4841734549828587,5.410960398619483,4.870422385708689,1.2950469105328035,2.8428396558685867,1.922783035127115,4.484264781687393,1.82576441926691,1.706207105110439,2.310982461438396,5.430604703925004,2.6751876857640067,2.7907586829296096,1.7479637328892086,5.574354327732152,2.3420873313348425,2.087347742037391,2.8593208930169993,5.354609549711654,1.4002137943555106,2.7017718582620365,4.335297855157879,3.3534008217677083,3.9103256997324953,4.989679036992123,3.9431296141914878,3.9022310414145283,2.284401746439613,2.6798986173694352,3.3395922397351576,1.9491933618062232,2.1585659824247116,2.142840913482215,1.8843209405066255,2.7271549940598474,1.1726118976672875,2.620004060944551,4.127024277369957,4.720228594432491,1.5838619879625473,1.7722454641096788,5.603579774498657,3.530820216123826,5.906301013710045,1.6238260632338621,3.223247780152989,4.807141504559217,4.228842923932662,4.365475985821788,2.320405119704382,2.0304407385757197,2.470855140080988,5.334336402697021,4.171931380297695,5.628135639808678,2.0450811772696076,5.627721875352818,2.293576519454219,5.031665593752743,4.541655732617515,1.5497550251956662,3.7981182182945306,2.8527313105402654,3.344357627501399,3.188421308648744,1.0450550546784545,4.901456056318007,1.0377876934819477,4.680586087248479,2.183137304075328,5.328056804578785,4.078826999980033,5.55769539875976,1.7346319597149098,5.49397992290665,4.206684271924827,3.071811494374111,1.8488482394855912,5.608022462139418,5.349370594402292,3.571665005456972,3.716672106208824,5.776076625597636,3.3853589968904587],"x":[3.5726297653947876,9.551937977529308,1.9680515595355996,-0.7457933413698585,5.549385103467079,0.14205171956989204,-1.5715777527043198,2.7837423449107623,3.063698790570255,2.7762344342499445,1.6710664769458132,3.8274611423980893,-2.1972400666070913,0.27144069089290346,-2.756736964657283,-3.6908759477504383,3.199572173666898,-5.883944825208525,3.0061236327254655,-3.1918098754816397,3.4270640614213326,5.391292542889635,-2.803444130822804,-5.42302028785423,-6.009038898812293,6.541086558406388,1.348246220553508,6.195345505246179,-1.9444076526799785,0.5255025891412783,-1.5905966442946395,2.2197136950325635,-0.430817198254414,1.7906272895895459,4.066273652854806,-1.6330489742271337,6.84152547761394,-4.3118558381910566,5.863401241604819,-3.2806705139442816,7.7399216393163,-3.3628743153232676,-3.283845069707036,1.903717584165709,5.092219686290441,0.16289778211927786,0.5140913696368559,4.762212123932347,-3.91945417837194,-3.7724002462915056,-6.1906071406896785,-1.1393708237923783,5.871417137192385,1.391643620454233,-1.9048788806615704,-4.791998408822308,-3.6907162734908994,3.277758277731018,-5.150958946328268,5.540677234102862,8.587087025269827,4.519827503234028,-0.026702611791158404,-0.5600800686658047,-4.488165497439837,5.245658051655347,-8.140581263936532,4.4928838497852945,6.322181577903651,-1.9211604701434677,3.1776885065289995,0.4664715766631726,3.9954609616121948,9.045432168775953,-4.148984754724561,7.287441728392576,-8.504284933453473,-0.5674626119545128,5.094867843956788,2.895046253390965,2.370832862141441,4.678993904050695,0.29596063983287735,2.064967479300368,1.2095178202739962,-5.090930135336441,6.363049170375629,4.044331090282641,-6.944489192875634,3.0886367284714407,5.394191728164194,7.197525619961512,1.6349672770432884,-0.2387293819767642,6.506732408467586,1.461082667610487,4.62327640369921,1.8724313881290144,1.4359984213245536,-2.1781352593873176,5.6602782468863495,-2.433348555098842,0.1683679554360662,1.730373028105387,2.5048679799830116,2.531853633761967,1.1246553110640995,-3.7011582252632507,1.7945203780656929,-1.8123416170290496,-8.54569860381283,1.8688962920005405,-0.2682338752189528,-6.724085402818902,2.0412784533075836,2.6288816973677593,3.303821887379497,-1.0873818883195052,7.398880111707793,1.412547310231048,1.164922467985443,0.6839347208881907,3.3464320579312816,-1.5808751155565481,0.381889181054591,-2.6504278947107456,-2.130029851360913,3.810875903582069,-0.7498446225577604,2.1371995535570605,2.6877686541007657,-2.0900197474964095,-1.910933709262499,-3.0414102647088637,3.8871998156298537,2.3456077434701994,7.300464262739119,3.5493946712739746,2.549649963402608,-6.99831970610367,1.599533802134887,3.3200920579408226,-1.0014642194124335,-2.8123243623191203,0.2844563542621592,-3.357685561383043,-3.296078491784214,2.543838329283073,6.607619153537907,-0.7890976811634332,-4.466870269173553,6.084989787462895,0.15221192842137965,3.0308983928114026,-1.5372618014586759,4.019802579526393,0.7663343688747899,0.7410774349973135,2.7102790868497313,-1.4772708670565766,-1.2494733740458601,-5.428021920698256,-1.0910492936639282,-7.460093567990063,-3.0082687680516362,3.1760042061900324,4.228772237066796,2.618745688722799,-3.700779695649959,-8.368701684074829,1.3005588986273882,-0.5022310775493892,2.7318690225616438,6.178121227588077,-2.4186769532569192,2.6662447331112187,-4.946449706103786,-3.4823656110868972,0.19617419791275514,5.275991017669491,-9.063785768260109,-3.954423212801208,-1.1805294008548977,0.7749466830726259,2.0550885857890466,-3.6352243955564267,0.1449496912293622,-1.4415586695659481,-1.9110824934961395,1.6266600685907235,1.4801347091338335,0.8381448229537103,2.188800410511706,4.919140129780686,-9.057698094089318,3.4711525061728543,7.211981634877323,-1.7575971121485772,-2.5963993180719203,-0.5924915635034829,1.4536287683446627,-0.34597143628358307,-6.919476416014655,7.595487328471237,2.423916227719161,-8.741800027525047,4.115170572965206,2.8345247874422808,-3.6733254247542835,3.0753205994750954,-4.953649366934993,3.2497778993868898,0.21574662653931043,-3.235616978103985,6.354326083841116,-0.5517881867062675,1.1848957580460118,0.9892007446651636,-1.2395257520883884,-0.01880034920564322,6.2014251647058405,0.7584034969280817,-3.3470937455680594,-1.5051956340889587,5.139084904532483,0.619008242614628,4.048494200061825,7.607756730151685,6.720392662970083,6.5005951797160115,2.494589880461196,1.7388527475642102,-6.407429151514455,-7.550876261742458,-4.771443600289141,-1.0805076921186196,1.9005799311970577,0.8085655615871556,-1.8467150292100376,7.153529094988283,-1.3598284914041976,-3.087723601675461,-2.9420867360044323,-0.43334272601397883,-1.5250020044469426,-1.3257994159732678,9.230634876602728,4.121870879819223,1.3204749826971938,-0.7368479053226711,-4.438047521228377,3.8128396898535937,-3.1266594605581473,5.315363379697396,5.257071586282292,-0.05046455407636863,-4.08354810119547,-1.182244653315705,-2.2547910731983283,-0.8690730766197285,-2.133703327714078,-1.8256715256698186,-0.9445423341901567,2.027335129599746,2.084501972055368,-1.2072761095265871,9.072985661817896,-0.7377833453852123,1.2467782015803301,-2.1896388521134895,-2.1211951232711765,4.1172850307524484,7.663710726101975,6.259023279944094,-7.252485204678667,4.179916265151326,3.074421280170687,3.3181695213835827,9.359340912533149,-2.360438463247656,1.6185371418342132,0.6354607279647517,2.8711537905763236,0.02097435859523822,2.3869269270040605,-0.45333119799988,-1.9446462185254991,-2.5041238174114056,1.6252582320522402,1.6285605590863668,1.889401282512484,-1.4968868773897857,1.6518027274058849,3.123220461767591,6.412390875529453,0.7748851923813715,-6.488778894636926,-0.7447657948006343,1.348600050737601,0.6725598161430328,8.716412203640335,-2.148432637209643,1.120179089974778,8.137009684270621,1.981180606599553,-6.479394849555691,3.3655201845909932,-0.3517706185852232,-6.587367587933213,4.380739515143574,-1.2776317288169157,4.375148056904781,-8.51188886411982,-0.5662751793537968,5.953368662746962,0.8718798952379769,-2.841468633235129,2.7161237453575833,-5.798801221371613,2.4533520125688946,-6.684880163777013,6.184636857013697,5.6590581157645214,6.087891730650535,-1.5042935456237698,-1.7322853798140803,3.2920562554233745,-7.711816815248735,2.0142144507173843,-3.6931042597161623,5.712764307114305,-0.4056644161675145,3.5570139379354626,2.470228854204059,0.9052988470345746,-7.730180488911054,-9.811489264527284,-2.1967620951667968,1.7914732898040509,8.379213781630336,1.16559693673695,2.1960604139581563,-8.239183110553522,-4.200323580177365,2.7527947385878515,0.0028992336618993697,-2.9209539265269884,1.9639363307250264,0.0950888586518932,5.241842190984139,4.651133208255804,7.579799246463146,-3.004853884981758,8.453190628501572,1.3673796935433091,-3.373600362888005,-0.8531692669092426,4.698315811111211,-6.779792142923954,3.1505093749799062,-8.285663627424382,2.8069827158927896,6.218651979206801,6.702812404868702,-6.998312096363392,2.1679229909442577,-0.16004897683339614,0.06710879518998336,2.090239810591812,2.4525069488501368,-3.759870064485484,1.4551595534751205,4.875804088023806,1.306674403166241,-3.662052589354257,4.777376177591385,2.916396814116382,-1.8496997258671648,-3.11062960036923,-4.70019209521911,-0.6646531185851279,-0.746936939900567,-7.0323083003701985,-0.03170678849521602,3.948535097893932,-2.5888247067894206,-0.32430414698399535,-0.1600732033817014,-4.7170383710716965,-0.23050150237371447,-1.137938231050577,-1.0376584224673024,1.3200896158033482,5.399254935259956,4.399912870714262,5.26123375535966,4.865718423367979,1.7640892828635013,-0.23563442623278474,-3.3433438498505974,2.987384888772546,-3.9311619966186018,4.218164672314845,9.353817796243744,4.259426021660341,4.080823520815754,0.23577974135117863,1.3717809234152178,7.5805824406257685,5.733427501193235,2.504776891736168,0.609615224161526,2.1544826673750777,-2.683733078932249,0.4147437681186883,3.81299363800262,-1.6047169708159466,-5.818574633641772,0.4817068663479116,0.37351156601607904,0.38787050884561225,0.150572600913204,7.46500520961672,-2.283875853579431,1.739814171159637,0.6336537822525057,-2.6701017467913397,3.2318548676851506,-3.4820536135874436,-0.4549495146897753,-0.11172138817915211,0.6374304486613909,-3.2008288591800165,2.7471579672241564,3.32557192206439,4.024243313671986,-3.3597890978304186,-1.279932584789325,5.109109729864929,7.40484594807139,-4.825154199502828,1.9217250917695337,-4.417692685401814,-6.247831103077088,-4.948733064438635,-4.63416559902482,-6.71199984170438,-3.0212955647095834,5.303500590337942,2.791653065096013,-7.190318821658771,1.0485445705185015,4.036102831977025,-5.523906343258438,-3.5166546021902425,0.2990183439274041,-2.8611001307013906,3.4481076672207416,-2.7935574887647334,-2.7099992521942573,2.647836323188532,-3.775104786995535,0.673666132178834,6.766309896783729,-0.2113419333179145,1.8498479453340777,-3.7168585387356323,4.032401768685299,8.732767140158357,-3.930250422845951,5.344956101492483,-2.765060372945795,-6.669337682189503,6.0595992771609515,4.479058600884395,-4.464081373945307,8.399485132116858,-4.694736076796202,0.9522136757230282,6.840760237126508,-0.2434144191312777,8.871208748887613,-3.813913082208309,-0.16305798712534791,-5.144516301179829,-4.388272306155174,1.3868809570158103,0.41012449135189977,4.730710106875504,0.32512921311947274,5.588110583238377,8.13730501322453,7.155174230947898,4.102694629200325,-0.9635320931617231,0.8547066938239478,-0.9762419350452101,4.878226836780897,-4.960983542548398,6.8645309394772935,-7.057742525775736,-2.9946025624175587,-0.8897795452144912,-1.3403738490280803,-3.651332873811246,4.614876270876887,-0.19791729399132763,7.224245144155774,1.855009934512175,-2.8789763525751955,-1.9716530950415185,-1.7094477215289694,-1.6857271259141022,1.5734493275270163,-2.43617830468845,-0.6726881949830332,0.9770786050656817,-5.7554230398193535,-1.8685210863911839,-7.007370626867219,2.4372352931039836,-2.530719765307378,1.7288455489190637,1.835836479328108,0.1842313412736285,-2.4859997932688627,-0.4017491194678282,-0.4928393576821244,-6.099569557886354,-0.1423965192891523,2.2455060718061803,-2.9225929670661888,-2.1480888849010737,-2.6320501805274232,2.0221188517244904,0.9900161974879751,1.2652219702470724,3.3732436993964106,-2.7216941496383056,-2.380511602725983,3.2241300108675475,-8.763338210868955,7.9111126764723565,5.162900136261337,-4.158837445368157,8.714332075970939,2.4730125424765115,0.412500704446372,-1.8641505817052195,-1.782477615847109,0.616126991187258,-4.989413867356207,4.380657108372965,0.6235520009924893,3.1658720741233166,1.927210993519874,-6.267798726726748,-0.6712587315343033,-4.571494265973506,5.610355912723192,-7.192097038368875,7.032766028457267,-3.1484840993517405,6.08192684219765,3.4949401474312163,5.6653743193311925,-2.8684743716651573,-5.294617183316502,8.83125334982659,-4.211812853150249,2.712636049225383,6.729032243449629,0.5260575310056659,5.1028122892837535,-0.8676152321017749,8.200779124972092,-5.97588249884045,-2.7918292998105576,-1.2399918777815735,-1.2192792352825919,-2.346770184403526,-2.4203848687550384,-4.29428683732503,1.0792174380996888,2.823385541811226,4.870157916202946,5.755398750515126,-2.03810716372789,6.368303567338964,-0.014414655646282082,-1.9225830263264454,-2.7460693709813544,1.3332112824241165,6.540133022078091,-2.9803553516952226,-2.086992163260253,-6.201331257206652,-3.9071990460319546,-2.455807077899068,6.336252862586197,-1.4683424768985773,1.1054469149128665,-3.9900061889593026,1.9900783572085867,-6.978502167581733,5.02560793641911,0.7105205770291771,-0.7695589280474913,-6.807481841923323,-5.783878209932677,2.610920394626411,1.2187254197030861,-1.0076051638240568,1.9025205174906756,0.34831960888140223,-1.9639627785840408,0.2410537459161466,-2.7678058113679653,3.677490158390917,1.5689005599681067,0.6806959295571402,0.23706066625595268,-1.5040509122562007,-1.9989755527670905,-4.321308011338519,3.1768686245680855,-0.8092839652279888,-4.310917546713757,3.7572546617233127,2.883336769469564,-1.283128507157616,3.2674668445728265,-0.6443243159220087,-3.1333848316927115,-0.16595994618691456,1.3615490484801995,1.4493291614049646,-4.408188750680374,3.0384695679529417,-0.9757555751433094,0.851330634618368,-1.9537780877553073,-6.822435898855079,-0.6590121499540391,6.487700166509631,2.094908143546757,-3.7268872312014656,-2.7469023969182897,-2.1686170368665625,7.510210163132212,2.0631781695067386,5.257352299033157,-2.2520054531413587,-0.04648187879475074,-5.8276710273328804,-3.314109596439751,1.0367875562691609,-2.805724578814816,0.014808003707060813,-4.4672411503117,4.9340585819806275,2.080500781235843,6.286005769522951,-9.304857764141477,-2.0009275807395372,4.685014220420101,-1.982278408364695,-1.6854299325636415,-1.2053428301836666,5.302183576413585,-2.6186595089121907,2.8941285136090844,-7.372517094848346,-0.7224912109462522,3.694621915498457,6.77855677512655,-4.524638495238727,-0.17573256029783435,-4.403273219499655,4.232043603553755,1.0074829554108096,-2.2187365491671174,-0.37369763973952974,-2.2505957336175086,7.766242116647075,0.37724210938040414,6.8126536825109785,1.508022473617252,-1.2640018731725111,2.163052623235448,-0.18472891911723188,-2.593513625541743,-2.746485227565582,-0.016728100378153865,-2.0170243743581455,3.1497306644250878,3.537744005127415,-6.33037858099782,2.2205327894275833,-3.965469579194563,-4.918023713157766,1.152440676949702,7.352761756528718,-3.6016471474030496,0.6597767000623822,3.445883373850463,-2.806979219616721,-6.2420706200971,4.075620379016899,-3.8569881831331116,-3.8667323581939375,-2.165488375433533,-2.1599429346877796,6.16572450258948,-5.295251586308398,-0.8208792402228848,5.4338086658008695,-6.231452960303367,5.7258278241117555,2.7907243844499074,-2.670160456528535,0.8767361057034884,3.9551290181553753,2.6408166901747343,-2.254205292073064,5.508391811512981,-0.7663402404142317,-4.586638347594125,2.218221505683915,1.8595516905095604,-2.7670615420355333,-6.568034020018949,7.472777762072678,-1.0456771162632683,0.3904682849264418,-3.490324763085506,1.689102064527026,-0.5105152174517142,2.578321717673082,-2.108278463566138,-1.2619024912771906,-2.83285451440314,0.6619994370552273,-5.773990317140187,-1.7530620393790302,2.043680396311072,1.931672351244671,1.694934718873644,1.2440363918413166,-0.7821744376682283,-3.409875150413698,2.4523442675710463,-6.1021207248815745,3.703100537412207,3.393741542129207,2.001483758797551,-1.6066173011273537,2.8495260146091006,-0.17995516430585168,-4.868146920226572,9.447669560829052,-0.8599066938865025,8.800309761310832,4.73261904205446,0.17702931406063094,1.029860344864157,9.695487208586155,6.363010537194137,-1.4009957999068723,4.730903157487079,2.859766074787356,0.6973346358531582,-7.69101004668798,0.18019164265204335,-1.755217420504482,-5.148613752706149,5.861119008928653,-0.6199170805062533,0.9087040144375482,-5.299131132036301,-0.8053680647524408,-5.625215409733093,-0.9464093559450997,-4.477838869617437,-2.0937472643881727,-2.3953344766295688,0.6980872790806281,1.7452188415951682,8.987647623502049,-5.187332689589208,-5.741602127657518,-1.390504497935714,-1.5868541483102998,7.85552865621825,-0.5155304644881253,1.2397596495701482,-4.130057891828606,5.541719601262805,1.8105712929100974,6.33269107802109,-5.529680861544857,-3.926963945721842,-3.2385716922728163,-0.5662123249488005,6.068879339261186,0.16755067771553556,-1.2040004324392606,5.512001492006471,-2.8489195374976113,4.662527386511266,5.538972309199895,5.386695931675213,2.0141382364183036,4.918512997104753,2.9202884761551218,-4.510065577402159,7.815688656235331,-2.6826807978922718,-8.895340389394562,-7.248652916059131,4.528744310301935,-2.1845090041963977,-3.189934924320215,8.973492779372368,2.3815863766182632,1.5037650808033414,3.4215301202410977,-0.6636648169389785,-8.227940992590739,-6.1726530432691655,-1.8141966464564137,2.924793675137554,-1.220967738543477,6.92001366575004,0.14562010500195566,-4.0152044553282185,-2.263531475378404,0.4411618636557275,-0.8833572990767813,-7.640535492192591,-3.627450322357093,-2.1613434407842247,-1.5285058137706704,0.30407299411514366,0.0913406569826547,-3.1645953233154183,-8.618749495742525,-0.9341049653093036,4.280977063785554,-1.858578641754412,1.050111828612816,0.5623971367285492,-1.7195169342309047,-0.49519724827388867,4.021750682066308,7.038086548293478,5.62382087010209,0.008303411180714537,2.531061429763577,-1.7866555053084499,3.3193766179645223,-4.0851443421111036,1.7245883384803928,-2.7205357803105223,-8.579490292812379,-2.2813314356866266,1.940170178577818,2.258084062957799,0.6620888413956951,-7.041801719095053,0.9888617785969234,0.0635719918762696,-4.514606259677203,8.038693362061302,6.007388297650378,6.512943948619219,5.293891883964999,4.62793929077151,-2.579939482793616,-0.39238562072690897,5.682478507305553,2.6173534576482727,4.355668671962773,7.508963380714035,5.057760532050738,-3.546987311673851,-0.38733674849472877,4.9178864374374225,2.839328347892618,2.455796550570974,-1.720595528280965,3.2141138621261445,3.3920250754349324,0.1246631284366373,6.811330837029619,2.5116212762259114,2.842073449068769,-3.1025543942668747,-1.6339662768461483,1.3193426586693162,5.936028782520536,0.4119249173722901,-1.2277518695898921,4.319202832224174,5.900776498961671,-4.125661007238293,2.9169480520840407,5.399378748323462,-1.8223196708245726,-6.173823159221017,-0.39551163409211565,-2.593881116286031,-3.1886242378852847,-2.5385569290651206,5.437399437525405,3.3454054497198493,0.3730819858241574,3.5680354951573854,1.2328041858732948,-4.010266892598764,5.052258285526149,5.793691321858045,4.897790930957384,-2.1273743490271717,7.86198041316546,-6.82843690634512,-0.19982552393471575,1.532909667376563,-3.6263182384357817,2.812854904416504,0.9020894651560862,-4.332998251272707,-1.4647076359906244,6.642805166385621,4.651818419834399,-0.07343984499505396,-8.544479261311928,-0.7397652595567128,1.9908543607800562,1.7016749579859347,0.3715643028229625,4.275319092041935,-8.233251311334918,1.5894796072211932,3.765765960962087,-8.033113409007955,-2.30115622845671,-1.5251392500463012,-1.7360894388095027,0.7093779711232067,0.36701297546861067,-1.131938487467623,4.42686414793214,-1.0555188081805134,-4.196740161772647,5.1336853004696135,0.4066134839406459,7.833439205259461,6.860942042707155,0.9511592134653339,6.67337083966196,8.63315154762925,4.142893802293256,-4.289858790767731,0.7081774923945527,-1.2744018549275626,4.413644620672295,-4.36185909100816,-7.633105927588563,-3.7808584859777765,6.508133628089238,4.586743042362042,2.6919803529468123,6.289174867359572,6.104219953641053,0.7784139607890186,6.644932216668267,0.9131997863181862,1.221813402214691,1.0227265838144062,-2.1514916125790196,6.945762330504602,1.1553155908157176,-0.7011130687747213,1.7423542464523982,-0.06710774186783341,-7.162921653807192,-1.4713920198141217,-1.8021190910720786,-4.5532608198766145,-0.6874071143748512,2.4755069339315963,-3.2640850918555793,-7.0152278633418135,2.795459920524108,2.7583503987700575,-0.22043611161320253,-3.712072643617808,6.433731403995653,-6.371106865774949],"mu":[-5.366402065765334,-0.3778098685124842,-1.5862067732518637,-6.924632174888339,-3.239331382879733,-7.0784330317149475,-9.229302586483733,-1.5881762154543555,-3.470096784985981,-0.3531460144291976,-4.509040953367829,-5.262913659534101,-3.1597592360388482,-0.767439106501544,-5.010583901321597,-4.848323475744971,-1.945200222172614,-7.995723950493836,-6.72493878857952,-6.305991235353757,-2.823177544756681,-3.434333292641021,-8.391204642569823,-8.21262515848505,-7.549169973449805,-2.0264261524066884,-2.743792134919081,-0.9266421636086286,-4.48935316843653,-6.413813999894355,-1.9756024230913494,-3.241824188923057,-3.246946690759134,-5.366593908974062,-5.9133776965692775,-2.90953822816884,-2.498834872110691,-9.62818130232404,-4.0240540041677875,-8.743117043043036,-0.23772973414971643,-7.223774486818595,-7.413617948068385,-4.733212048654489,-4.300006784193126,-1.4272822290079712,-6.706750020548437,-0.6506584645470226,-5.898429328216064,-9.102594046850081,-8.248567104592947,-1.8659028874347205,-1.135766612347009,-4.08151141602054,-6.424571204499136,-9.165993473400022,-7.305302607570874,-2.5983587808600594,-6.174434892625705,-3.593469034694794,-1.0892410950200149,-0.7184680791947806,-4.24375123532162,-1.3648258623098797,-9.524554367434954,-4.446481209665373,-8.496432686671973,-1.9644433192781952,-1.0569159558880847,-9.400275138110565,-1.7482319394813506,-6.652086842720363,-5.84145260408738,-0.7513229848808267,-7.490767089731573,-2.480393439096087,-8.787671808288884,-7.83854037474204,-1.7249682596640814,-2.5741935394182347,-4.660419114077818,-5.162646676168232,-8.635297761398995,-0.47855784854159644,-7.738535969984223,-9.399270071440709,-1.3436216189737982,-0.08401116232378047,-7.640606549424329,-3.9085532545571677,-4.463208325608936,-1.7275120366387609,-5.8831830981303295,-7.4275293384279255,-3.316805257191875,-5.904505459765462,-5.090887449303898,-3.1018374388164394,-3.658695601032438,-4.586332342044937,-2.487725534191474,-9.21681856162764,-4.713499215729742,-3.6820188702804635,-2.856384563608241,-0.31213315286554133,-4.204247829785091,-6.760099574070438,-5.36019992931778,-3.7276241180427716,-8.565593911784987,-8.089400701465504,-2.2605667323588685,-8.813419961173645,-6.311726246777949,-3.2759976807038815,-4.897742531712439,-1.712405937010828,-0.6000449392298624,-5.462988684654839,-5.204092302142684,-0.4305212086379262,-1.0995267346794946,-7.439063289462046,-4.183162036626924,-5.76271151320025,-7.133040815856986,-3.2667027851990227,-0.9832299293172198,-1.9520501063722318,-2.9480030521380796,-8.765231743025561,-1.9211749393010158,-6.988878961774727,-0.49208761090542064,-0.8679158006599019,-0.04644850449518456,-5.3011594877672525,-6.029877784733328,-8.72668327042244,-0.21855598334611148,-5.684365522697947,-2.397261168964,-4.972088898240045,-2.8947101301575118,-5.044255616480699,-6.173980220122395,-5.489254258933009,-1.5993384101108266,-9.951353928323954,-9.775354735309048,-3.500343669884771,-0.05262273813800622,-1.9123018596131347,-4.5862489329755185,-5.961775569733527,-7.144188350175272,-8.45059345763206,-3.9395657134527062,-8.460931404268567,-8.373904651187772,-8.75789858371155,-4.238111448745969,-8.696914588726782,-3.688971614144645,-3.0505747512147185,-1.4783563170922465,-1.2310368189289322,-6.5614431573369,-9.167012541339757,-5.748051513989177,-5.877941366950504,-1.3331937152223183,-1.6304848093054214,-5.669831498263786,-6.350830094154407,-6.178522480069719,-6.700001875063988,-2.428494544548725,-4.409555643334584,-9.917200618421152,-8.007896013547294,-9.225099533559078,-6.525465798042411,-0.6359696843681295,-6.263815403016939,-9.076044760117698,-8.226599360211518,-7.829341374956358,-3.041634108712108,-1.0557189438419856,-2.3345801374094055,-4.781813785302451,-2.1038141810787536,-9.62346272278764,-3.714436388936513,-2.468346084325499,-6.79533462172758,-4.1566354436623865,-6.426045324804123,-7.44299117078887,-3.1232412992506653,-9.550291011851668,-0.3373826386399559,-3.1279028463193637,-8.873751494757434,-2.960612234403457,-1.4544272375483946,-7.5663881779893805,-1.4031134629398578,-8.796848293403858,-2.041817076435708,-7.2182709785238135,-4.576322700966877,-1.6329170054800834,-6.919602686170516,-2.313678981731069,-4.618660166255273,-3.086292901280121,-2.739598191955319,-3.757923219175321,-3.300130283201075,-5.531632419180594,-7.362542915358001,-2.1794272321583974,-8.455806921318118,-3.30270987831212,-1.10298070845819,-2.5368139797612055,-1.839451643636345,-5.2936437584581615,-2.543263083062941,-8.94005241021227,-8.479941015869096,-9.656770407694545,-3.1337159936862835,-2.790028374725697,-1.2095738508724296,-6.513912654538592,-0.6790049419807431,-7.486133043971535,-4.452346272874948,-3.4341108175420065,-1.1415322261492888,-2.044626435783381,-4.401981987388188,-0.06691332762883473,-0.523453568745591,-7.825400274908738,-9.990176181498478,-7.374338870967776,-1.0335064112415782,-7.38940071050494,-1.358577889051662,-4.2208926449388535,-4.8946394564891005,-6.837538168207262,-2.686013036448538,-8.487881529966577,-6.9922718715886845,-4.527246931412467,-3.78315660388868,-9.675823902345208,-7.167673164477191,-4.792939316320708,-7.53907873834126,-0.12027858339968889,-6.362680350418475,-5.185090726581674,-7.448519408653523,-6.660852497640349,-2.146796872612695,-0.8668115799228016,-0.86445251170995,-8.828752446254457,-3.788910282204019,-0.46033250565060246,-3.358141878743215,-0.4846498662918375,-3.4532257583354475,-3.5014855372614284,-7.423016874439261,-2.8479838842179928,-3.9692870994124374,-3.6857008468485453,-3.932926103068388,-5.1149619264069095,-4.223835607279778,-0.19354035609244535,-7.727512714306695,-8.088533021312692,-9.853248817331274,-5.418776813468815,-6.326418877785775,-1.7851480934182407,-2.4839938443767062,-6.870700845250028,-7.76827825911422,-4.555363247368371,-6.5091276344581335,-0.15745161146331288,-5.219111380588819,-4.9080212125719775,-1.4927343819290129,-5.680760807670224,-7.668159076314436,-0.43728068993495794,-3.3518785836659792,-9.581855949004812,-4.009616517178953,-9.168013835453815,-1.7372409301260672,-8.754022258455516,-1.4843312792241736,-0.5661933391546992,-4.377214490830257,-5.997913736729226,-5.299127032595486,-8.817098695593309,-0.6191971049985057,-7.764148609408627,-0.8240988823499973,-0.9975745468743646,-0.003226152027995255,-6.413009367413361,-3.262465909615677,-0.7704791382659915,-8.726724111869048,-0.6494592694494306,-6.937709151543161,-0.1355373947149685,-6.162778671406786,-1.698234911523795,-4.169429126482198,-1.8111429590821615,-9.082393924529688,-9.89185623896952,-7.6662980015556865,-0.7255139108072495,-0.8472230109918955,-0.8760618364669859,-0.5429508995164611,-9.49814444395235,-7.237148038629437,-0.740583942457258,-2.8331318162249675,-6.253450495812761,-7.2953449892591244,-4.03862542473961,-3.6271886970594003,-3.9251932957463564,-1.6296624551035332,-4.419251444160064,-0.7272693824031395,-2.3957349400687167,-3.6394761393847808,-8.197495560136744,-0.2820302649897566,-9.604431017218078,-4.857641360466614,-9.442260023142143,-2.3209467857779686,-1.1535286410735024,-2.5771979576673787,-8.01794287042747,-1.7097191108004028,-6.312727931531148,-7.961001010995008,-5.404626012930529,-5.518015250069704,-4.0858412169849,-0.749795452500166,-1.3953003249175677,-8.028378656840545,-8.833513470895669,-2.8278510136563617,-1.4821447689351164,-8.98376540690865,-5.204795721723636,-8.201569136848851,-0.9663979865116956,-6.816665480099595,-7.126747256938515,-1.115071946074977,-3.2515486111177183,-4.075135094849458,-4.7774380146199436,-7.116613946258575,-8.855073559588757,-1.9570637770130483,-3.7798648426345616,-9.879975523826543,-1.9917131316088277,-1.041631219605177,-1.539353493850908,-3.2734457470285605,-3.293124591201111,-0.30192592394847173,-3.645721554786052,-5.643509484143285,-4.379123168538568,-5.074729457680349,-3.2439933954682076,-0.39102863806552923,-3.9487900259678566,-1.1613030875300212,-7.577091935053892,-2.3808188154714127,-0.6962065818246188,-0.9859929117570876,-7.493442033183952,-0.1982987229375377,-7.002694675751213,-3.0832428449809313,-1.0681675933705592,-6.064752580902876,-7.388615932754377,-7.117203730510456,-8.004673381631019,-8.005598617120244,-6.759279288169202,-6.924101279066566,-1.0614721760132828,-4.860494824806427,-1.3985630046173858,-3.376611871884443,-9.736615267701715,-1.0198551791962185,-4.853588314583566,-1.9974043904451677,-9.48316999486385,-7.685750789477471,-7.252884872378904,-6.718876435547916,-3.4712699314480555,-1.812531608825907,-9.550522787982842,-7.512027374091086,-4.851043957858701,-0.8180984633707822,-7.654333156675968,-7.696559020610896,-8.327091129011293,-7.737634754731852,-6.127475769170121,-4.931360801473903,-9.622826001200568,-9.36876772948154,-1.286235572714971,-4.7608204954202415,-7.205338877505437,-3.3599073530615797,-3.7336366291642475,-5.714302761977432,-8.67019245970248,-2.2625746975891015,-8.724161073191077,-2.056643617221867,-5.1022350181755165,-5.074228674661594,-4.200988697430173,-7.888354190792885,-1.0021762100242215,-0.7510520049435909,-0.6638814053118858,-1.1512489735901843,-3.8190003624993762,-2.0513010145115484,-0.252614243452578,-6.628525539780563,-4.232994779119177,-8.716637874484427,-9.32541399434691,-0.8719251513159287,-4.722656148960445,-8.6233907881434,-0.6001907662882333,-8.75164127259252,-0.7773013581952948,-1.67157120982534,-5.374449155041649,-0.48499281812454553,-9.714598152240024,-2.287277520336626,-6.943011991872026,-5.007472014668208,-1.0247830879664632,-1.3620167954760443,-2.618987560154018,-6.59447102718662,-2.9314942518346876,-0.8591229367598663,-1.3906849113856823,-0.18564929997652913,-1.9187604743839382,-7.898891550162281,-6.882466878058184,-2.963893655896408,-6.006364280068248,-1.1759163772732828,-7.4529910278692775,-3.869536578646393,-5.217708007775304,-4.082234932564188,-4.45408615404308,-5.073071307410815,-7.013135850968311,-2.3466040821393586,-4.918948914080961,-9.25730362457113,-6.4834707342894005,-2.4896466676223383,-9.974471058885221,-5.737444240185874,-5.664743433604937,-2.6409331009454085,-6.908530137459641,-8.643982286907761,-5.111840919304735,-9.440971320110666,-3.77689089404903,-7.642178462490101,-7.924604713563519,-1.897407538531617,-2.0151241113362928,-4.2000071406225725,-7.615364450605766,-1.4603429734107354,-8.428984353639773,-4.092896710668093,-1.5663215589310542,-6.349841850571223,-3.3511335296902334,-6.573634418715701,-0.9125233767292307,-4.707175338452205,-5.999694167262655,-4.535837301866752,-7.899610456503073,-8.761265302809687,-4.161741107535894,-9.329250815077195,-0.23184723882079483,-3.177864549406675,-4.21072696858926,-0.10310968989218905,-1.2782287764818245,-7.547221163018771,-3.0171824807988235,-3.4838582669608953,-1.3819494541551824,-7.400481774737342,-2.2040545333790873,-3.7905235251760705,-2.8778921277414105,-5.559916445532911,-6.765575806729485,-2.079984339935268,-6.227866092425318,-4.055567425444395,-9.719665821671848,-1.3700895900901866,-3.5415590597947877,-0.13856578181211,-2.3158324118914964,-2.6909985734858455,-6.089864702933578,-9.884323626068372,-0.37581838604098916,-7.244409413140107,-0.6955207739185032,-3.0942658316877014,-6.657545238955311,-2.378045608306296,-1.9331341875092978,-0.17054317979297684,-8.063867661862599,-5.92945378211029,-8.423955912011664,-9.92227685997511,-6.049476475463713,-5.70991201252075,-9.102503515848628,-3.6999986756667447,-5.7510658645636115,-2.7663625332533837,-2.330449648439532,-6.3732228007567375,-2.4077650092228997,-1.1400117179644642,-3.757542905117832,-9.407259539467303,-7.375384729868433,-0.7552785572981668,-7.587983755610177,-8.969771706483787,-7.830671789349948,-9.86648536182342,-2.647791892544633,-3.5007833624273443,-9.573023985279747,-3.7451082078297104,-8.215931754984362,-0.5558043835704218,-7.002271472672204,-0.951406630738465,-9.280012571688747,-7.230680306371782,-9.378906917737037,-7.008896849444348,-4.767649770137861,-3.7234174302332046,-1.9944978042261141,-1.0596366091028697,-9.410182125905662,-5.318628907793883,-0.3881943669468946,-5.212473198807881,-5.340593396304836,-5.761261857187659,-0.9455475343384778,-3.588195398944194,-3.3993078620907258,-9.213521186635914,-9.431149270495734,-3.8867353421121886,-6.401281537812791,-6.416971432422056,-3.034933963938682,-3.376660725640528,-3.275273504314824,-6.480149572028653,-5.618186194165378,-3.5670863271034925,-8.252095427174952,-3.7788298210353855,-4.738069782706127,-8.208762782103001,-1.8352396502542367,-7.824836564938082,-1.0871430527560544,-4.684794474559284,-7.2593208410150485,-2.341570846110812,-0.6552355043060465,-5.46130145913442,-5.986527620541837,-6.910363899817864,-7.112863874560489,-0.7921376485049914,-0.24665691081617647,-3.16763268780369,-7.868200300507895,-1.9482914486803393,-9.580180946881644,-7.582178805681767,-8.272328938906806,-6.264861159047525,-1.0458961216679064,-5.220913046610624,-4.252639274276239,-7.816861065192812,-0.7641451063872506,-9.642469663884372,-5.1065140185727405,-3.7711100639450468,-3.3893806964076267,-9.952152516268164,-2.6764580560851736,-3.5004659633360102,-6.5984469046023815,-4.978911874469025,-8.681373268790523,-7.435749088678203,-6.269765121127158,-2.7392769588770327,-8.457821361861944,-2.539893107505984,-7.062969377558497,-2.2353809157542615,-7.214461863113614,-3.3381574490447408,-6.1649448399972595,-3.3431210638747877,-2.1227083088260423,-9.51747163510787,-0.5940505772309113,-3.0626739985848306,-3.1939542514570407,-1.9137778021240481,-6.146914902188094,-4.833931100815853,-4.221642182609992,-3.703477636092234,-6.834632314455105,-1.5770561575818687,-5.922639427154195,-7.594330771028373,-6.958701902868436,-8.86559621657894,-7.464770467959441,-6.773923314004804,-1.9349901923258805,-8.059748996889603,-4.555956850418226,-5.743062135003414,-3.1658733647554493,-9.829216961274252,-1.03514576864987,-5.778507717284082,-8.542858716358822,-8.28214669193745,-4.1588434980495315,-2.007092435201885,-5.4000104951725,-2.9838190341259208,-3.3000868208239975,-7.504055188121869,-4.00446725841541,-4.179205813469533,-7.7938871164305805,-1.4090942947822604,-4.07635357442561,-1.192593921164169,-6.722989450288899,-0.9134344691180574,-0.8397627002881669,-5.142450393876025,-0.5206679182270357,-4.643598407725973,-6.622009607944436,-7.9003098039652375,-0.46933506944708103,-3.0990655188237137,-2.4899304711355064,-8.95472837810611,-1.660508814049504,-4.554340135629024,-3.39040529842632,-4.46583185539926,-8.277511157686199,-4.981222782550773,-6.119608733612518,-7.661224059423608,-5.257936727485582,-4.04114309679483,-3.644772939499814,-1.0812458192332342,-2.205876477828823,-6.491647465105485,-8.687841045452501,-6.413373086568797,-9.519106843047329,-2.566533002761522,-1.603581239851406,-3.5550483437820524,-5.546601382528172,-3.341914068035945,-2.53800807975636,-8.807992842595528,-0.38150990233594584,-6.060288398612412,-0.6665568241758102,-1.4286022096891982,-9.76450316862339,-6.253146833554335,-0.147749557189214,-0.05541757966077254,-7.348829718738941,-2.5964603643490514,-3.562738752972885,-8.573784439109115,-9.566221987178436,-4.51097579234967,-8.022221807647691,-5.576378641614202,-0.827385833209493,-8.44513178712389,-8.122600418022435,-9.068898012027471,-2.4392824005578517,-8.25145336416294,-4.389972849858815,-6.24189002025817,-3.553087324979791,-6.424984044384054,-6.748477571631435,-6.88001818967826,-0.3960876198629837,-7.198982611013706,-9.818579465265348,-2.8529644118208553,-9.960363307544783,-0.46188540781342713,-3.7651006096824324,-5.41270695314301,-5.758236042710864,-2.708631997972244,-5.88014477013709,-1.7878308203176152,-8.352689939975653,-4.295791736819248,-5.6026446693481695,-7.7383891918994845,-0.41377262301694806,-1.0977959911563073,-2.4611108951256244,-1.7002068982668583,-8.741574399534011,-0.7829216554435625,-3.9631266232598272,-0.8915756477839998,-1.7261272370895986,-0.8506739379906803,-5.043948737891684,-9.422211457096761,-1.991238726532376,-2.9528828357506542,-9.989963406433391,-7.843714472277137,-0.30141505759944787,-5.5301873194284745,-7.610853345009756,-0.7931201043430214,-7.229613122564129,-4.984021573206019,-4.665671799364379,-6.417215304038115,-9.134072132150417,-9.07642425422569,-8.536632153344563,-3.0519866098037696,-5.688092437381707,-1.4010436066177734,-2.0391219983717335,-7.7665348316684675,-3.787944155818912,-8.77842845792638,-9.331029748410964,-8.660112821452493,-4.770277632334818,-3.966282794149365,-9.031825282017405,-4.869540133906911,-1.3845764131081917,-8.800657709130062,-9.569561801459098,-1.0112378333963168,-1.1787615451884959,-6.454035608361098,-6.02034883480457,-5.374458581157411,-1.9720844813130056,-7.982598043282163,-0.0661009405476709,-2.103667977470076,-1.3058426858629857,-3.8732127564978214,-1.055748371083698,-9.444993350252311,-1.7225553323176435,-8.261111791012612,-4.278966322685416,-3.3974735867778483,-9.88865865557796,-3.757604012780724,-1.7510326283105848,-0.11025262392147184,-5.77874829446454,-9.239575923779293,-2.2156762120903717,-6.291799022891027,-6.693682320183802,-0.46822995466401673,-1.500533321239963,-0.2766312219166567,-3.0073127320961235,-5.27737439365742,-6.449542907984052,-8.705793785549014,-0.7237836208643689,-3.187575983819233,-1.8619865180507933,-1.1195575310034611,-1.255656434712693,-9.5351405438591,-1.2344373511641482,-2.662958116508223,-4.461964735238578,-4.201728624889118,-6.951744962549677,-3.8997954180626393,-0.8976322058208952,-3.1881561969187455,-1.8783863199037865,-5.424944108701652,-5.343470672967641,-9.638803536104712,-5.485894941523455,-4.891434617019077,-1.3365775395684598,-6.651099380031578,-7.454656980080127,-2.6533008659008717,-0.0006612546216966386,-9.079180223594598,-3.1657968414993354,-2.8819976198149444,-2.2153612675958656,-7.23046243928807,-8.212264757154923,-8.373568640754387,-7.0604423257188165,-6.1951366683897575,-2.114422057692955,-0.5389829106248323,-7.3049048017810865,-4.745411401573467,-3.9320040828776226,-5.183755103303009,-0.9657691561021253,-0.24343242219496242,-2.9098044833243764,-4.363550893530482,-0.2838316666360474,-9.688891290764857,-1.382177943942684,-1.6737662501990735,-5.303272380679296,-5.701911797084229,-5.963518435025723,-4.337546920029249,-8.547136001523498,-1.3768702217910889,-3.879933786052987,-8.838410251549782,-9.838570958880801,-2.611339889741766,-5.845820588121939,-0.551610588132061,-8.131031102951207,-5.265007395208354,-9.889371098297575,-8.267818794577565,-4.468779852657869,-8.543195098711793,-6.353830726954943,-1.7765625279763864,-4.659994993161627,-5.60403701685707,-6.041592035283512,-3.358545904499217,-0.01929203476709107,-3.2087874155452822,-6.659826629527696,-3.5073728523084235,-8.05351533297576,-0.0358904210940314,-0.21443666038901243,-3.597370788609866,-0.9174921771571021,-1.3067883355513166,-4.910071477725952,-6.027827009973052,-3.7481428951335216,-7.60483134918432,-1.8151606917016538,-4.776556431898394,-8.191636603159584,-6.776628262686957,-0.5350506113927511,-4.4991032018972055,-0.7146968361427741,-3.337157697453488,-2.72382112958083,-6.568050893535887,-1.2837249350615787,-5.6791563687085596,-1.3249732912458678,-1.3173617047282726,-9.75489896447658,-1.6108596243878481,-0.9841342286344945,-6.18797446057215,-2.402040279040849,-2.69007235249054,-8.823806936870833,-6.048978316105629,-5.023484481144762,-7.530029487655443,-8.220221609535269,-7.390280441112884,-5.634512130011064,-8.83307807488898,-0.007566263697178499,-2.8421872251580704,-2.4202606053408315,-8.02730790276138,-0.9288316320216339,-8.542492220959021]}
},{}],125:[function(require,module,exports){
module.exports={"expected":[0.055032489371181305,0.0654988781452119,0.06578876944315565,0.02448773160987539,0.07509211417132503,0.0150443587580188,0.15009012091923427,0.022279537131482154,0.03856351484801666,0.021639777959330565,0.09409483517169523,0.062171531989579226,0.132535796568735,0.05442374625705559,0.01872016101640246,0.06465185710510277,0.0036999463622546026,0.029700390182677165,0.029392389792371267,0.2115924385196608,0.02547495231014125,0.0248222381797748,0.07531690564274823,0.02543289664857789,0.031083453878659,0.08624486010947384,0.03709276624980155,0.043559907866259726,0.04393885626318572,0.03856816819992559,0.04468172095217113,0.113955698201727,0.02575530225768018,0.03132407395277327,0.02619291284756415,0.07673057739145986,0.09275219933033657,0.05263519056759645,0.023694309250047382,0.06603865025386015,0.024894131475884068,0.06497333773099526,0.06412618026904567,0.047112153558243865,0.02917192358939305,0.02308746362511104,0.020331619346396122,0.038776927748318424,0.06913556510939904,0.026704097408598408,0.024623007278698292,0.030530902217129827,0.04390835737529902,0.054099958661903584,0.03043782334221183,0.13788378777480537,0.050542197392174054,0.04168283105012645,0.024558591952467505,0.017478198674383764,0.05395811332710314,0.038753563265805514,0.028133424884311035,0.09665812254978041,0.029079341105369548,0.04542270537588472,0.13451382498618766,0.03767181191295214,0.03304149100082359,0.06165135751068239,0.0961863979684123,0.0457796035865063,0.14855314721290172,0.03943307833577811,0.034532541520611686,0.038822748539978316,0.03633731121649849,1.3114272113766145e-9,0.03394304809634905,0.06983576167398937,0.03609695044348067,0.027784623814051588,0.032356402216019986,0.02289276028301459,0.03423406555000988,0.0697914182044629,0.03849822789593554,0.030484753131933096,0.018399187895783386,0.06126557306851897,0.03706854464378092,2.945645916040818e-6,0.15944198407856552,0.09169036459044415,0.04298190585124963,0.002497215939434728,0.03302398568387707,0.09882261262523807,0.03316129664016532,0.01326955886577201,0.10557809119982782,0.02540489973398184,0.021201120814571695,0.05974023454923805,0.05739848110992548,0.021377784980365234,0.022766002533118217,0.023939761716569634,0.09056175717427208,0.08481988433108434,0.01922369317403484,0.038643836468481595,0.06065269369810547,0.031755289165078145,0.027045164778734747,0.054924778865581385,0.13016097050571304,0.05646885243906276,0.048034508415786666,0.02371993141108671,0.017213572634966538,0.029699470884194366,0.03992501976541653,0.16566899598752427,0.10444657880710206,0.022119196349650417,0.03538723918236185,0.07746005323201204,0.05143122472246159,0.0551764016532549,0.3119397060782087,0.05629040997288938,0.033682602142976685,0.04146024827531158,0.03661957268080441,1.1764968822644596e-9,0.02347224852857983,0.03509295092682009,0.021727637134599884,0.08819650978678331,0.11731094461985078,0.20257139198562227,0.1149176983123343,0.020143224757390745,0.036710556111295804,0.036238566599983105,0.027802202726327944,0.07622186040380662,0.05536025895573258,0.031138665668904917,0.026093287024344276,0.036625840062378644,0.051442720480374474,0.06222627100087287,0.021844995995323233,0.04712180672578373,0.19516949718261517,0.039780905091636176,0.047393492320269036,0.0308003073328228,0.03604867393442735,0.03548082712404687,0.19665049695107498,0.042748324572525344,0.21284633778883238,0.08305852106623247,2.5599141088424445e-5,0.04681958262350919,0.02219707770552696,0.08492367753457125,0.08051934015550866,0.028118013138193117,0.06811524817153088,0.08478122435851193,0.024795494898548473,0.04990005887612165,0.04132139053459265,0.0512227430069519,0.03763145410671063,0.040120197554743726,0.026537709033171666,0.020114478719047046,0.03423580259286154,0.019721972110594493,0.024229144232355462,0.03145072734788189,0.0433829201339222,0.023882376187435914,0.012241003620199871,0.03727906056076542,0.01707611675546546,0.17496681459037497,0.041586100927450506,0.35521473641065154,0.057723765128917914,0.045594274316406946,0.11138731874330864,0.02261446365048492,0.0222845858533855,0.0834562557853139,0.0973530315451985,0.02052348850589734,0.030909733693215414,0.025112417058330998,0.09122333843885416,0.014176727185994597,0.021638311781533602,0.053730968794894675,0.13482525225469907,0.0394576515519584,0.038352548226107314,0.24715808800178907,0.06005375490956051,0.04424448746379549,0.020416108726573012,0.24470918977275966,0.046988043632585616,0.03152295775242961,0.06340090410655619,0.03717474834477925,0.026872924693937646,0.02697286855123833,0.02400842196513939,0.027213692148822334,0.10912942139083177,0.04603945824618187,0.043062007388135384,0.02523714221554957,0.1066925671867446,0.027842125574884326,0.02424442980957044,0.00023660423972139794,0.025632417487809537,0.026997535884129138,0.08795866208466513,0.049700686638039025,0.04535565702642319,0.04874684917843415,0.06419164946588374,0.04325527003350374,0.11048224493510024,0.04851967909875086,0.053515777053228936,0.040041691978763616,0.023790474541617618,0.06012750489569832,0.03610726200307503,0.0637115879343045,0.02236362532735419,0.041590892067594275,0.07059213419933053,0.03148077722360587,0.06051128218851275,0.02989547954018557,3.693073738605231e-34,0.0602919537310158,0.028560212159629086,0.022533092791834772,0.05719022127810486,0.15028743367908648,0.06512215912611509,0.02193692867028032,0.03501374499605016,0.06646678719389361,0.03149842931799894,0.030906443146716516,0.020441683445053985,0.04634763276706172,0.1042402074328679,0.02376560482589292,0.04564769530318262,0.04586675145180958,0.1013868865897378,0.04372023820290905,0.06362739016585127,0.04856301484179433,0.025742173870072035,0.0391748559600472,0.023068220166424125,0.03666964622825672,0.02950131532290311,0.0190188852415971,0.03376248250200109,0.05818744771927142,0.02092677133327038,0.023002504748283362,0.060823947338773304,0.04314801096033284,0.0737896681842475,0.05509141514163915,0.017706960003286677,0.0251007675122017,0.121677068601201,0.022863547117214316,0.12258580216314009,0.03743974456396952,0.024228378244392917,0.06326774769371869,0.03431647287114449,0.02469831769716706,0.10972335809020217,0.021911775858943806,0.023163490149916845,0.13094059393573396,0.04719061201515409,0.056970908965767154,0.02824584762401021,0.12285086483072605,0.06459592979026224,0.024795978909282545,0.34550042106850154,0.033490295419655834,0.04709472539691909,0.032558629241413006,0.04370919682847079,0.0524471521065436,0.09272027922398378,0.02329804399229986,0.023753872819705858,0.03167886848190516,0.17187165387993872,0.04076641146510641,0.0499484995491481,0.029773135572105817,0.018302996117868196,0.4289324613908871,0.12896412133678647,0.04145620146215828,0.3690812561842599,0.1378166250084318,0.06364122597829042,0.22849664544407003,0.00048410147018094894,0.10798534486026737,0.0371749875154254,0.03021857004528231,0.07171198914485111,0.12403509114783096,0.027301222306962285,0.11975022517926988,0.04049789717839323,0.04229840323054371,0.02769574922387416,0.069910304569179,0.04509242788885185,0.02520897673547489,0.04798851099536841,0.015816915844129826,0.03560774107821729,0.029596079332612615,0.03751416707351408,0.03492053925242022,0.06349346154751996,0.07305251485444371,0.07865032907510933,0.049203444322079064,0.07335208359989227,0.03211710851194698,0.02122097665397535,0.02865890431694817,0.028727040995483705,0.02024790985320018,0.07672576695772688,0.019958749387104163,0.07192121967389407,0.0536288448261017,0.13050379208551496,0.04165740061191681,0.10385887422416969,0.03488635459046587,0.09916894197796516,0.0651011489901229,0.046104497152465104,0.22536811616918534,0.042733373247805996,0.07429971591225397,0.028853063170366712,0.016105702495020528,0.03018798435137433,0.02512500265482741,0.015737103599035487,0.10858259094358241,0.03294290957269812,0.027546026734788547,0.06874990253159828,0.02540712832194164,0.0484799663777617,0.027963625728585843,0.04542585851956092,0.1380740252552561,0.08942197886339179,0.3392826543003981,0.042193538052612334,0.04438750024098155,0.025470461018481813,0.15569713034979601,0.04826467035100353,0.025413707816052344,0.044862768944505145,0.05834805732277105,0.03099319288117793,0.16811192147079385,0.06372703146534639,0.15102599243973783,0.03617645369461644,0.025247884795156144,6.890307805115909e-133,0.08793990753450481,0.014859840376140953,0.040389075964731805,0.08294945562819273,0.010113590507495026,0.07721643300614178,0.027763014695368533,0.09779217570641902,0.004527732558691952,0.05244624660050641,0.048383601558979965,0.02806674557072751,0.027075042289315485,0.03273587948968615,0.04347855300513509,0.022063257175291395,0.05428539187660634,0.06092925060097462,0.028662728854911664,0.02301537508484921,0.036118292376277894,0.06425066479501441,0.024113277580137135,0.07537077244250551,0.10105818366674789,0.026586558853288974,0.020561003183913743,0.05876924968460627,0.07722297684176435,0.020866778104904934,0.02073684954284141,0.03627372291000374,0.017180246320319663,0.1064050310208104,0.03964081883658993,0.07968875328224552,0.051622620991930955,0.031000080420301664,0.034156379381971545,0.05559817361925615,0.06553308210994259,0.024889076208736927,0.04500730947028914,0.08821210355148623,0.07277767356245171,0.06840111821958257,0.05763681065358669,0.020435776294614637,0.021888788625381746,6.915791668168393e-5,0.0777434328171163,0.025301639211486163,0.06534936381456184,0.020882830730344554,0.11743718329344757,5.66578519182053e-8,0.02420539387232027,0.03963273867986691,0.07184476512715232,0.05605135934463266,0.20119414297073068,0.0220293322554983,0.204745123853731,0.07305883296297339,0.034538213614282796,0.036482247181185826,0.049316341319654435,0.02513696094256505,0.12566204796071082,0.042360064758593524,0.00010194634911190276,0.017831757684875164,0.1555692408799472,0.025929760779739235,0.030733498150854795,0.08921814887881648,0.020435729985819363,0.034781949575849576,0.023001937931462914,0.034149806979708056,0.025764792537968498,0.047084850870415106,0.030736995149144006,0.029523307868513513,0.031816538680039155,0.01938983433360598,0.044835841785981934,0.03433392899809491,0.07752872822853073,0.0924367572235696,0.046752835736103254,0.0364788182874103,0.09479200695812383,0.05162213616819239,0.018289462861665426,0.03406749482024337,0.06824961271529267,0.021651529540561393,0.020450236779172105,0.04330383178463985,0.044491514300756325,0.032644583492032364,0.09749104962145719,0.024361680385832665,0.04008140489004116,0.038322392678812135,0.03776708552480168,0.013605269575573632,0.05156967363918429,0.041993713097011595,0.07032196570928305,0.046666950946634964,0.041501842602820346,0.09473846987073585,0.010669192219454416,0.046987261628691566,0.025013201067251536,0.03306253002737172,0.06796253295045394,0.16161102073392958,0.01591478344163978,0.08696889909920504,0.1476496890223027,0.139306335188858,0.18406575670745898,0.0837987100848676,0.0794426040313906,0.023026701378061606,0.03905150144193977,0.03759175639924658,0.024010865471344154,0.04580031840360987,0.020705839967321546,0.024239352119557946,0.12405091473695672,0.026073701706631012,0.013454973392328992,0.021132461493264764,0.06215398026562791,0.05900121527015034,0.0908919228193889,0.045952348068582456,0.034387787281930475,0.03521923034741755,0.02773497812927332,0.02459619849370738,0.037313893836242056,0.022679344004037198,0.046690272659623146,0.02931417768377499,0.11434011091658534,0.020097718588988164,0.16547638831468792,0.10253264590926302,0.03784386261142953,0.016052495118298867,0.06677012229142733,0.10437601816433958,0.07478514267258893,0.07531290436908075,0.02401187896339525,0.03306770755199857,0.014652623975520626,0.020365265719601587,0.06475368387708974,0.07432822726019077,0.06877701419637833,0.023805033821375582,0.035665796941966886,0.05366577125195707,0.13024040515263424,0.023017113820754075,0.03684542856493516,0.11214482083995948,0.042807201389567506,0.015327202397438705,0.08066735702166705,0.052825388621330426,0.07233384839113334,0.021769173629390935,0.14898579048742033,0.35906420167591824,0.0476507953621183,0.08472319024974032,0.04595906069134696,0.027102020373925863,0.037527464029622475,0.0544308991831802,0.017520769662389645,0.030934391157258722,0.03677895486561678,0.1092764564897923,0.03312922768124312,0.02160721873985997,0.039039410680403584,0.05655714078578113,0.057694743886505695,0.07124736516516343,0.07350362804200977,0.12498663460102308,0.023321977302792868,0.0271879284051344,0.029939546494362354,0.11475638327175444,0.07520840046670436,0.025665544844973,0.2630461075856676,0.06379173350301762,0.00975763601065247,0.11396184974523012,0.07078015571365863,0.12509189579903177,0.05716690236951011,0.03128515181538543,0.028043256046107263,0.05902401771086964,0.018739397246842707,0.07286938985092203,0.02645326589188604,0.031018629431350572,0.11160582116518933,8.909921787199827e-8,0.0983610485100494,0.01876183352255648,0.06599245215357843,0.025459814465866502,0.0403329903590252,0.28212573784490824,0.12333741312814002,0.03998289095040002,0.03970237102618332,0.041770017414769885,0.07975245541553866,0.07286353592816175,0.07143345651697865,0.025419871185859484,0.020107225790225506,0.04483376738956654,0.02457680377259286,0.1246421316499833,0.020092934063580904,0.029793226832389927,0.03361568285177454,0.10163025317329014,0.11615154268102086,0.13166614180018127,0.04823064617703952,0.047540015602900325,0.03806046043757661,0.1348130365770723,0.0571192406635799,0.05910945142945455,0.30019043677139795,0.042315167858968016,0.04564486013000633,0.024575670252911064,0.05584377250383695,0.1616676834893909,0.04076517698548251,0.015675110710755766,0.037287931924722205,0.04334617860002772,0.0266565772536745,0.026144673489814987,0.014650816515032456,0.022175845109041203,0.11350712372510936,0.024736759730998936,0.03780652603027578,0.042021035037514996,0.04503895389331166,0.10226911211765949,0.08984793917922423,0.06741192385242833,0.04463616374213109,0.024434669965523476,0.05643247990599822,0.06820097529082911,0.046556606798571785,0.09226554722165065,0.12480798940140181,0.031110636073873252,0.041135368341231764,0.023280512360838203,0.0224526247606965,0.08035454233320119,0.06134230738209023,0.06405240381862148,0.11388799529991894,0.021183295721256643,0.10486585509988508,0.06216277703523329,0.02489247297397949,0.022892325667535275,0.02089427090450275,1.3939159710886682e-5,0.03142201873096469,0.02483175958969796,0.07622865838507072,0.022332845758064778,0.023181187282533537,0.034245417606090775,0.04173156909275765,0.0974919159285187,0.05434206322870805,0.02550387202470995,0.1814333401302887,0.04690711656922403,0.025199342062995213,0.08360414799464018,0.07538745109545338,0.03332554784986468,0.018073908860001087,0.03063986764300928,0.043565915906507435,0.03272079933396665,0.034270507430319494,0.09226128541015871,0.044554872054074025,0.01592907113845241,0.029143602764208337,0.03004281907126251,0.021844062366719666,0.08694426313092102,0.05336395928102846,0.020113573556327192,0.037755788926750834,0.02828939588521216,0.06770488235428795,0.054032555781559424,0.059667115852420724,0.06693587640076307,0.05604969235272718,0.3055323321478008,0.020801202947070992,0.20133235517304376,0.02921396664117713,0.014328492123095659,0.17525107619547647,0.01728367544191774,0.08085018730122204,0.018380602116199966,0.25002360911618865,0.021420505781550966,0.023800941055089536,0.06427092168125062,0.08063741025445802,0.046524755710876636,0.057385545958294135,0.06289414036655706,0.017540573933884744,0.020751279279150575,0.1135616627114829,0.029597257047415716,0.08154363557036501,0.1229825529900135,0.05697316927631867,0.08114630109297032,0.025406884095028597,0.09453784633773119,0.018866152205844852,0.04283315267667436,0.11081337147192744,0.04272945345841215,0.2118711344221026,0.02335669097992935,0.06135627089755026,0.05224708452538069,0.03475348498544908,0.21434151333310014,0.021616209272743193,5.763636479556172e-5,0.03155512869346637,0.02767082451085118,0.09091361771382066,0.022371061112458023,0.036880888101983,0.0864227803970139,0.15999303536928916,0.012891111076705335,0.0691990310348964,0.014267251813396494,0.08106362412585477,0.029946471133208197,0.020459561681841213,0.1580842031013652,0.04169788143927222,0.12323792470384125,0.02504438426758467,0.0368077720000022,0.042490099023846796,0.04323886485740244,0.04269749471901157,0.0001639218008052925,0.04963536444601907,0.055625150370564584,0.08426966467936943,0.04515998475808647,0.022039843654836595,0.060071948956831364,0.027783951886041037,0.07756282221699337,0.07261110670798891,0.016980461244852016,0.06247611113866386,0.028869384136619984,0.07334773733547488,0.3975768900815992,0.06307760956189333,0.03128942136279048,0.054277779576591564,0.10348155149988104,0.02777499804709958,0.17141777626520757,0.033828837455978644,0.20502954746133858,0.005356457334534355,0.04875638917064559,0.03482599491461711,0.07919740390919665,0.02609342243811912,0.04372855380655221,0.036862893637772544,0.02684427848874197,0.13385012965364868,0.0627039432388152,0.05646654421968481,0.03006459660206124,0.1451837235966111,0.024283663730029142,0.027767306632411757,0.02232477195164401,0.10896032229353458,1.8097028141641774e-5,0.02331195024150248,0.128002142432134,0.019066153520765718,0.07575202438934898,0.0716935606239895,0.01643091848015911,0.10285589830703627,0.028353043214979317,0.09966065323106134,0.03343769422345543,0.03264719161758565,0.03844343290773948,0.020807575545223507,0.30830864498703225,0.029284127361265875,0.06559560034090405,0.09866209480450296,0.02269824160097129,0.02641645088002129,0.017869753748204566,0.02131571776000172,0.026967791066479223,0.151754517366552,0.02588872233490073,0.09652280751260017,0.023294020064524808,0.18648301632974656,0.0334722549295437,0.039302161458127614,0.025350208106949344,0.08440805843614875,0.03519760802918098,2.669315448588601e-6,0.038623911402399215,0.15268635738772973,0.03713978659473623,0.022705525274120498,0.02516901826579436,0.02708414291150584,0.17812453404129847,0.02019357398482159,0.021044269313602253,0.07049539791059799,0.2618539929892026,0.026962309811123263,0.00047721344937928545,0.04211835641628226,0.023099952302580756,0.07982821744304622,0.03354406405745716,0.07576107699567246,0.029434134050563776,0.06197734374671762,0.05951388793086721,0.07831932018674252,0.07556700722061015,2.4120588956659178e-11,0.022432279559226394,0.01677679154040924,0.026184984646349992,0.03244781476253164,0.02006658751227384,0.02216924777004857,0.04453289516341107,0.041513211885169536,0.045689433991233756,0.025803511786559978,0.09587913603624262,0.03996868709905654,0.10995698098967574,0.027661862025950577,0.025625154393221418,0.02184563574774364,0.05925713665070499,0.05070340375638022,0.019190994844642713,0.04437230431191594,0.09612859710030401,0.17433278977558375,0.0303484713409956,0.0753090964190083,0.07870907975867644,0.009818603720341096,0.03334451384272345,0.0203024259035478,0.038905050024452284,0.04732765175469743,0.020853409445668353,0.024706397330066375,0.04750354427383166,0.12152794489238138,0.027873546288277075,0.03991111581149477,0.02694156109983166,0.06826998989134417,0.024933960132254258,0.021644434939764985,0.23582088145569635,0.043303641257124006,0.03476158868669754,0.029214525848610465,0.0757583591314879,0.0202011714260234,0.03890233099427896,0.11658666897616023,0.02378066803602157,0.03786669349542981,0.0012837267489788278,0.06487193299159325,0.01859621856335063,0.02151303651944651,0.07258892796450561,0.019286869851405358,0.02341713064464046,0.07057075052086548,0.05726372895647554,0.07508951625918088,0.025531686242227954,0.01509060423384507,0.0012499261414297678,0.024122381397875415,0.045744896259155586,0.046499943919546136,0.02298295247521173,0.04583338412514676,0.018541514739343998,0.0257501509177922,0.0786324439217093,0.10671132209087425,0.018947798567536502,0.03538906562523407,0.04711007295871309,0.0269856454489647,0.07212994938331363,0.0565790281816748,0.08921423486632354,0.054071778428329574,0.10986917412243911,0.03426370457280316,0.017991760715723018,0.078246452239459,0.06409265523503019,0.06799777278587142,0.12152204156439152,0.022319332521423967,0.026757361227720166,0.02457788065816319,0.04768609239161056,0.017323321654783695,0.1557297010023809,0.0728267877885908,0.04397030597937617,0.022289231146581556,0.040619083210909714,0.04413945910633338,0.11134073352860063,0.12178519152002623,0.10712236045470824,0.0820923910765008],"c":[4.002383894492791,1.8827971508701726,4.604049622611659,2.8913179080125264,4.493030753940179,1.0969364115018345,2.9688485941025413,2.980841148471443,4.7107689311826775,1.8722604770395992,4.522727280557767,2.9466648212273996,2.6996270855829074,3.6172800124821736,2.47855668503163,5.032256605315274,5.238404750043269,2.987844258483986,4.983528329292946,1.5946242286193093,4.0368330854957515,1.5109379693091332,1.2099596712848062,4.61812270316365,4.010105355598114,2.7568370892306087,2.6131894955756874,3.3435333748935507,3.61856289096706,3.7223483945957625,5.8656470844518696,4.058579416162176,2.562228730274221,4.703723729472967,5.158271249381209,1.8312652188669167,2.870210262694001,3.920536775237572,2.937469783619071,5.644151159777926,2.5823147116396195,3.1554625230796844,5.668102265861746,3.5662928255259523,4.130768861702227,2.702176513898932,2.33067793688457,4.145499353844303,2.080802694566664,4.608362830793776,5.53675635070791,2.3620325405549094,4.362639949014895,5.934212968758356,4.140978053331222,3.2090249390383807,2.064918071716683,3.2268641509343823,4.559484769724418,1.6111075886120887,3.0173769322513357,5.967201641643024,3.0960714797245372,4.336100089877348,3.966670627143786,1.6565748162727936,1.7652449504709102,2.862146413848478,5.678513804037486,2.6743730543449873,3.6604516985073348,1.843104600463901,3.0898115327492253,5.617579520856307,4.741500027948797,3.2237771059740763,4.875776289626735,5.324077987082316,3.721960604558753,5.782857849658636,5.73665204908011,4.498289904053154,5.637156119300771,3.754083158167513,4.771833643151466,2.5502385865978905,4.566362915217731,1.8900763869071626,1.8403217700334087,4.69607706189349,3.933057995960997,5.990938321527484,2.058013550941741,4.6463399602854185,2.46048248261595,4.282288943313093,5.946245231454598,3.9862666917961533,4.47882308378275,1.0189179987755672,3.1257560450602284,2.680489623568887,3.281518419377646,3.05029812282341,3.3248799399807396,4.384867106299834,3.168926191425151,1.7438788125317553,1.5614645992075507,4.01000592987947,2.170927942714819,5.433849094095277,5.56302821902586,3.3234090011342454,5.212715435622801,3.6133321721713596,2.9939229528643674,2.14076798508704,3.0083263469992527,4.961240854688212,1.7966212478464996,5.050772860601814,3.5347063248651933,2.6226156785219104,3.803831413577581,4.136502498917078,5.584173121839931,5.866936342232164,3.5463537359594337,2.7783431132494556,1.4637217920448378,4.435867610032743,3.8115205309365687,4.97798561906666,4.1596403482407975,4.223253288446033,1.8442666513891872,5.332555608476118,1.4698316571439942,5.1761165048419455,2.66768889570628,2.1328268319151533,1.2498743085592703,3.610756967104183,4.915928584355597,1.525169776957758,2.1501385378409346,4.225190315260177,1.9720294420004338,4.416943474361922,5.181935337746372,4.975166921936149,3.0170753632895186,4.534400797682621,3.0990073056249727,4.252311459387419,1.400636810659949,3.6811719520618538,1.9697421687439622,2.9207355745318,1.8925575271739505,2.303019250411616,2.246668675645383,5.589832761057583,2.1440229850247983,4.637664653843715,4.5205325148302045,4.709078830812925,5.113088506183097,4.273540600437133,4.726206199335755,2.1895730096877353,4.474905277012676,2.5052712148943836,3.2733681051283927,5.2721435462811455,2.752897894869884,4.760609018815951,4.2311156453515055,5.846028167722065,2.4151019190444414,3.3349231228180614,1.268123341896832,1.8701000530560554,5.555281292881576,5.202826183132501,4.551921294901032,5.353171674454373,5.784280873407733,2.0344781605006794,1.899744758802834,1.5163604563342972,2.393272559999419,1.2509166243661687,4.2485611165026205,1.816070545735298,3.5139077354758985,2.741825716385228,1.3281795965970968,1.490354478099061,4.73893799502304,3.525318750971388,1.5589656184623548,2.0533015969736526,5.0012710851603295,5.620772062508037,3.8484397190899555,3.169610665811873,1.8913351134197456,5.998176168305495,3.9911958140908004,1.1677398788511753,4.982873480524795,5.765964088452832,1.6510649921114253,1.6964854930154607,5.742689310711425,4.643487097176246,5.118920203639532,3.473773302355824,4.573338009180052,2.9844387174244495,4.856949055459492,3.2729045120972504,3.6822110724840798,4.836301248744423,4.709123578570189,5.957308657975293,4.183749149068036,2.909527286320066,4.631278107994066,4.216623869068412,4.527373062097352,1.2027594792364895,4.633205916985554,3.5004977552759753,1.7843960661277838,5.513600551843733,1.439129025654701,4.860804879500973,4.172334921000168,5.235820616648084,4.842487603223882,2.270313582338262,5.804194710510028,5.725492230236105,5.606480313600692,1.7965748808770257,2.0850908505819925,3.214941878345067,1.735184150036411,1.6732588246943827,5.018910219560123,3.0746973608760766,4.85072953694206,3.326156856361241,3.9533275096197373,5.464685612135245,4.994751945539696,1.9686745397766494,5.55028718540675,4.475298055393327,4.00013074813203,5.420140522222436,2.9717676628899095,3.056237066068559,3.081272959321968,4.88528910878796,2.6801562496955413,5.151354455368104,2.657912845277397,4.913650811259336,1.8836410498735892,4.108125260443502,4.176778927574688,5.145643387790207,4.0937260593838944,5.517671941857616,5.994402165641385,5.220958411797976,4.180881349356577,2.3752304364711643,4.62009202800687,4.187789315068578,2.463094892616037,5.0990443060098904,3.4664695577297833,3.3265518860926404,5.772591764264868,5.1076595040622355,1.9670209960847276,1.3354651345301785,3.491872207362934,2.469393842543382,1.0727303250332334,1.2046100121798378,5.233695712234475,4.863813083590736,3.527640635278509,5.064034326985673,4.170836508822199,1.4364474078081948,5.509578971473282,2.172052193730224,5.716257071188961,1.3446894182809401,3.4784029612960667,3.6302481239884568,3.270332618353251,2.68690415945725,1.1686292839455472,3.8367860167086514,5.12194601536846,5.550172272023962,5.923737604220135,3.1186819492939524,4.644384122803456,2.0904583367590472,1.7854170537457528,3.062793943216701,1.7609512771453175,3.4819421224509974,1.3208917744411344,5.527814674580633,2.42335696175767,1.0735531925341337,3.360398931397496,1.3091406631536264,1.1502872151290002,3.3196205982793727,2.3597986423414032,2.0206071409268738,1.439421860847543,4.21096926435378,2.329492013994338,5.814761506600016,1.8762183256609024,2.2467218113329146,1.3980741710473057,3.8342094295510387,1.453697499147051,4.98511119667473,5.557490109110878,5.480540880176656,2.8386000815350547,4.179078787937945,5.596412947776857,1.1226583591305275,2.0605077931681786,2.1404189592120986,2.7035799666130744,1.8209357838552223,4.279555323929423,5.233754130987931,5.329794597068421,1.5392614481759839,1.9453785916656432,1.1262307729945067,2.3777237998394365,1.1714136964642465,5.116164867456749,1.733937060347869,5.8584596466303696,2.314438082738972,5.702317298579967,5.234225313414984,1.477042415376151,2.5064317648239034,4.0831300313340835,4.647494476034057,4.618082692998317,4.853770248651584,3.4970857062771703,1.0953251285359635,5.663870762707829,5.184148168782768,4.841290207141781,1.3321466160393427,1.4226682580927754,5.127672981882814,1.5922620866368145,4.041781047220553,5.755240693841824,5.511331207934398,4.459177059790463,2.6157917163407,3.6306441510433576,5.505576217700078,3.4482621838827088,2.756090463963773,3.611628724196089,1.0853188043046271,4.9877542361245775,3.1457865458901004,1.368361535452748,1.383272297961531,4.955268930852769,3.229039852846645,1.5653783808522694,3.7563002415128404,2.025561959190454,2.0790968214395336,1.8933782628930431,3.037922302543663,5.305680936104736,1.6561665399475847,3.6227518172284316,4.885320637043454,1.282259452855581,4.177100045569128,4.359542697953453,5.498041932641446,3.9899086559216848,2.9384059338642246,1.3405022389765933,2.7903286039179376,2.5941495176750187,5.767556352704842,3.1242386154026027,4.658050874760059,3.352785175478349,4.576205733751055,4.870853928685129,1.9151481879007328,2.65578703373767,2.6484011405715826,3.3924787276590265,3.664418147022809,2.2957653723602913,5.692983186404131,3.9233808720363785,4.311745443894948,2.51388277138212,3.631136407871816,4.759210807390039,5.989362965166539,3.061980413964598,3.6563158255569586,3.925817467492645,1.8049953722520065,4.127401268443567,5.276728302069541,1.2945526737759896,3.6294918525798403,4.49349902545423,5.523740749527116,3.658534813383543,2.6332334821972627,3.3565798718433673,3.3594234612815823,4.161632158240245,5.59016883149244,4.911610695028472,2.844886072642246,3.4493852554056907,2.573422495102319,5.747184291333767,5.850606951647699,3.450855071899406,5.781992972754266,2.731702187659324,3.584972242802163,5.377371157545596,5.2406799831340045,3.9031279173743862,5.701485402622923,5.381160908908894,1.011815219639738,4.264312206022792,2.2221484363969557,5.294122296550088,4.483240428113349,1.7160679101499612,3.4906445787139675,4.1122512424423485,3.257576360405448,2.2089894730936876,4.502602382158301,1.2875776426648646,2.665743569558434,2.358762724733663,2.063618413904126,1.71146527581754,1.194406458457882,3.8042946218910823,4.372585129159484,3.758312563136852,2.1659784237058366,2.2186964403179266,3.2241925222851364,3.5595787663868563,4.162364996367009,2.298217016728093,5.082958421508048,2.7158421697773107,1.6950823807566953,1.0989198509794131,2.436334212474529,1.5738254887589378,3.362317785836682,1.98745266846763,2.4082171149781306,3.4324284895418757,3.1975293055110035,3.62276086890326,2.680849050526765,1.3648964216645445,4.149588245940883,2.938115801220351,4.744367097372821,1.2617788314926184,3.5144617653586487,4.172302979252906,3.9042199604399412,1.0652529442243588,5.6730643877694416,5.98397788651414,1.1974192717454015,2.5584543681116356,3.12771956833957,3.7898581092882067,3.4593640970200994,5.26126036829789,4.8268585241579265,2.059897194068583,5.998850759057174,2.317026735944001,1.0175174271436507,5.226531558771704,2.350711147388709,1.1610127965632058,2.4248671490995815,2.035212378984649,5.372805187729918,2.660287028362828,2.7956723533875127,2.5625848859966807,1.4143581313565725,3.816579260628175,3.7343912073848644,2.900840170289401,2.5352027577754512,5.705198865108802,1.0333688549595812,1.1902022056299524,3.8449437998745006,5.4105685957915375,3.3976971079212914,1.832574574242917,1.9497649792569174,4.046169344492821,1.326338380571195,2.9857106081464715,5.702861783226048,5.514625158035415,3.5736675334981065,5.370740958049333,3.954640194410054,3.2351171758433166,2.4374393180834,4.49497298683197,3.6322140448357443,1.20353306106343,2.1092154861745387,2.255510422249654,4.029480968453752,4.651268521174193,5.250063017885291,4.219417857431923,1.5216592925703523,3.1261095955095866,4.230496075469386,2.1784352912461094,2.067965444367487,3.317509007106601,5.1302672213869425,5.255498930585353,2.897002289285905,1.4858514824809645,1.3215926600776653,3.883621925977977,1.6121044616629223,1.5842772345727432,5.589771453752814,4.970374857157748,1.4378686628226758,4.466061711380868,2.61341816078194,1.2823319775086375,4.976031503337777,3.170660820858936,5.6097394003286265,5.788010658691908,3.3234209218141233,5.354675868840695,1.249700103724293,3.48703424624247,4.40809371795737,1.557088711039786,3.8760468100533556,2.9851768468773567,4.51607164770952,1.1932475706766101,3.7052661648682905,1.5036440464227399,3.526348894168864,3.4619773329272974,5.106686375761917,4.590356427493732,1.1721103351839737,1.750298435536031,1.7322738393639117,1.5387770948473702,1.5581975768816827,1.925608561696758,5.527461977099675,2.531909933359997,3.707136719190195,3.116871730929172,5.929365248593686,5.7217711672791935,1.0973344529535347,2.361630755071265,2.26253249843004,1.5019507964707226,4.52245674486975,5.043131514927189,4.0954668522991735,5.582516973819652,4.2092065503658525,2.825247367246795,5.835557906149544,5.769589245508438,3.0709454402981633,1.2337284440687504,3.459586268827615,5.30235801724431,3.926163049165055,5.951553105138578,3.898529710539149,4.673028393137913,2.9101753785275175,3.0916795927334855,2.307923930996655,5.318448802098881,4.604191991509294,3.2275917702034054,1.6186803656669748,3.058498836708731,5.756161130595434,4.3046457096322515,3.8878284726702583,3.276225745839585,5.865280724161244,2.1470961379992515,2.485796727070665,2.2141572693031213,4.7802212462618465,4.605104267016483,1.5135338075825446,2.719876748687952,2.955623304027958,5.341381892719818,5.2249903742109565,2.860997063491304,4.917144845653446,1.398137457354043,3.4409510028219437,2.188575386644064,2.7034360516066305,3.5551388351126048,5.29296488122048,5.030982589394463,1.2513968670983913,1.5697526540270037,1.2911172494113756,1.200453593712866,4.845946292498855,3.8866112787683615,5.130876029887038,5.889666664076082,2.930451252919317,5.634197779170427,3.345649552367295,4.76881323112753,2.019278525609939,4.99070308311833,3.4844425909597225,5.50782670849787,1.9370213790468895,2.163038018026059,1.9874002064253806,4.042238797619998,1.7050344989784885,2.7155831964254995,3.4982390806325205,1.2095254075065056,4.314774695825113,3.9009068593783613,3.044023474355839,4.61464183830368,2.553175947292008,4.162392438028531,4.3049626337092795,4.980287015577879,1.1398369583833214,4.018288855000528,2.5242164671717715,4.789984963917159,4.950440404552938,4.055641992644547,4.0820184480168455,5.543645691090416,2.26313411311775,4.098063037431986,5.97555937552732,4.234781602296439,5.297645032139909,5.419428701109521,2.4459722628262384,3.78918708114279,2.3659325428737565,3.6386670332274456,1.2619695663942512,3.956761995089947,3.4778003223857583,1.4053154217058241,2.6529754829709176,5.7084999153567,4.044523468497743,3.66985744627282,2.360257014220937,2.2416536674054535,4.897937554994522,5.300729010908636,5.773870266079388,4.861167147090903,5.812371366397246,2.5721221892640322,1.508844965486408,1.105196246844107,2.0327778218416075,1.137424979836026,2.9230261681163263,1.4476692681839423,2.4737961190108297,1.0453229097796093,5.265064614259836,2.4046226160481012,1.5233714417804058,3.268138609852126,4.398634614879676,3.8542766614681114,2.908741397469065,2.7884526356860753,5.259478727734626,2.7563113691831123,4.210066643936578,1.9751441501278235,2.7557894909985627,4.30936577622253,5.152844311389372,1.9744020448754365,4.708771349101818,5.435879843182782,5.111020703186554,4.889626852837322,2.2313620267911274,2.392304816687978,4.150309791831738,5.753043750636819,2.128817670083362,4.497931108104851,4.625790365768189,5.7735081957466265,2.5129657113442208,1.0694225198476717,3.102535975182356,3.973713284720473,3.614711473677187,1.452597280942797,4.570388250685036,5.046606493614677,4.458094683079652,4.010437094573058,2.4021244664335852,1.0304950725932873,4.488867886068907,1.1422437042810565,5.584819481172223,2.618226784009218,1.37776619896429,1.3207698470412579,4.072255056108094,2.313482233758705,4.463648059301454,5.702499037857452,2.6618164789033996,3.3531982744405444,4.260261357505023,2.2693515348212703,5.6348117435769565,1.3865097028393882,4.424674719098367,4.446921442556102,3.656772263264564,5.899570615807979,5.574575402382392,1.3375237640689266,3.678721296441533,1.716388112695674,2.1960508494134303,2.0489573205573164,4.646637559640242,1.0163821867144842,4.636359119290012,5.212253959130017,1.8790156182840703,4.121927859061394,4.250120813752547,2.6978741102147756,5.987898365990104,2.2281750990526796,4.6853507794406735,4.195712111561418,1.8716766334363923,2.0642709604293996,1.71650094350871,4.098573642435526,3.294300693370903,4.2770069256904675,2.5974590024651345,3.1001566533073035,2.908612573903218,5.483493639612873,2.732730340706492,5.992643672529492,3.2758266600517,5.7219296722609325,3.43778318328306,2.8320705698492254,2.6303939110295107,1.9753265794749744,3.0835274317442476,2.280695113546988,3.015233863354453,1.2230943615483716,3.8719334443761846,1.01756665584986,4.509304195467212,4.524607511153394,2.898120884751948,5.7944722012230105,1.2187980671058476,1.495118011896346,2.733698471631282,3.0555867774235423,4.395994548796449,4.741355427467701,5.915985467414224,2.306275268515482,2.484840266397552,5.278571408154259,1.8395575123630594,2.2367393634667936,4.034143384314934,1.5037335443953594,2.043882718404637,4.021299485149513,1.7287656992899416,5.450316453134664,5.39202644829276,1.1525790372180669,3.264757872165829,4.101098244816494,2.8291391310956637,3.566568381603399,4.604234739544595,5.882783175507559,4.763177791780529,2.3475479425728674,3.7050640329567965,1.932368649238533,5.907484904614478,1.766395020728905,3.0132664877371176,5.521543798870617,2.189328558323677,3.976677521121245,3.82442052362585,1.644810258959394,5.164875446200628,5.063213777306775,3.2558179098549322,5.494226269222913,4.346666002082688,5.196513580631644,3.847081928969617,3.790135449567157,1.0728128559975716,4.550823717775616,5.964647560117594,1.5239416783897233,3.92431753061103,2.742357789258632,5.2269800067783025,4.602652428693744,4.7555861302471545,2.986553502425923,3.0507965795162364,2.617309597289367,1.861976970966376,2.1553450053599725,3.45150881989449,3.9042680619247374,2.653224184206481,2.348095369188286,2.315335504173618,4.331387229295176,2.5877626514451384,1.8558335032087705,2.170634194817186,4.856999261083552,3.599386981135571,5.749019612306455,2.847576660024217,1.1415831872708018,5.021223441203192,1.1665199089910396,1.3601013874978065,1.7276699551738852,3.3569336807589703,4.043571288940865,2.8002654487631906,3.1324716137684954,3.852250814101848,3.5227127330458754,2.377996476224619,1.0008708204591712,2.172487621052646,3.5710607009356403,3.7901605836251733,2.028485768308168,1.4866310769281812,1.1622382513862064,3.594903158707158,5.008756089798285,3.424908974544654,5.262689981695461,4.426575922147872,1.9877161370247467,3.6363101381453378,4.907017746478943,1.1214733048391303,2.4318538969264836,5.347348524409631,5.904186900597675,3.687827518997424,4.287006730236522,1.5436360535816753,3.9902330407618183,2.83892710942128,3.3940785678838186,1.4751977638464244,5.2605378779428715,2.477651825421782,1.5005591696686906,3.0568588527719234,2.7116512046487675,3.940468154968374,1.7861385159103673,5.469702861294737,2.9103677191193236,5.871898675913804,1.6518573102609093,2.909424762249685,2.501039476184862,3.108949052516321,3.277763739562392,2.0561175855158957,1.243581741534089,3.6527907392658756,1.5317260716157957,2.1800312319962902,3.730495337731953,3.4838737842253646,1.9414192595128168,4.836006845939309,1.1240927753334664,2.027176155064894,2.2168964224706236,5.360603928087246,5.372842446158035,4.6745076316695044,5.127860983225768,3.305348553814163,3.052245035149698,1.6994750837145036,3.3980702970923504,3.3529666798270554],"x":[5.364929435375041,12.192944061550133,5.768915375858967,14.534078488857185,4.215322141704916,12.921153164410287,1.6619037149497662,12.68152151506198,7.144045782146624,14.299448108643873,1.4144679973628538,7.1645669494233495,8.184618008619607,5.374623894002154,9.561724924734454,11.834194238453254,8.313794396932884,14.916105917871116,15.265546124364729,3.788871353626204,12.665361055290507,7.892907064628496,9.59217295509755,17.322500360669444,9.113308288455245,4.502664789712756,7.682433506212714,9.784354253818446,7.521051339813228,10.580505371309329,7.444030143233114,6.614477018957429,16.352318524569345,10.777517847475627,15.71498456582486,6.241083210561074,8.07370607388785,12.5031582778238,11.025093844039663,10.985640826583895,8.974640874710964,5.793227511998868,11.41247966487599,10.184725328869892,12.638747828099984,16.73907491120954,12.05231393499542,12.925807994856957,6.420613407187076,16.24228146474353,16.761161407729944,12.07080013326553,8.063459605416204,10.04772926114592,7.983905840409369,9.39570950585178,11.452200681056055,6.984668593634558,2.8226343957283206,9.920710130851248,11.105304446505533,12.49884906714096,9.022912444881651,9.663712864397251,16.8293190246548,6.114009671581197,9.904152162840942,13.552636613986838,10.83032603463453,13.224802171737306,3.930445679283885,8.587845028593755,7.929732237979081,13.989714944039143,7.052164823056304,7.742280637321494,12.614778681375633,2.0083140101527053,5.899919859587235,10.489612748213883,16.02090692047183,12.341851475410044,10.356318845362985,13.83353549609183,11.418069771782369,5.534696418559766,7.092948089764326,6.588277928613847,15.902826918171078,12.47445387751692,10.861281914568234,4.451529064718209,5.550748719015863,11.56445094273251,11.261125820920824,2.1265397598504188,7.446978456464741,8.584951434019676,11.336288552796638,9.957106083468393,4.214176066972781,11.454986329494796,16.12396683442741,8.704535446257719,10.201183052624357,18.48904350617598,17.76114317160959,9.64341132870433,7.974763447737749,5.925710176033416,0.3545877204161596,15.008475704409376,11.05383177576247,8.21643146795642,15.073646836328951,2.0030171979330524,6.682211650653798,9.052760815079768,7.13793135186266,18.70662073431857,11.815379360254347,15.707746081139959,6.982102406451092,4.4761927590143635,10.734552653948139,14.292916558173541,8.320382190974644,2.68123887890237,8.309800821029206,9.702318086909901,6.90537804025919,5.502819912558577,7.980743989956543,4.453998241262125,2.8484553802276924,4.14921565109389,11.418805922098835,12.698212904476659,11.387739601964366,7.679182132692651,11.17743526223953,7.077788288065947,8.331212034563906,16.19055596674152,16.156103413662144,6.13206862578682,9.16876329148397,11.102790846955639,6.817554609959187,11.361471306581944,15.793175785157421,15.818673413166247,7.955747226577475,7.509843828272109,17.233729078634124,7.742129453389646,2.129315283600959,8.466551967793336,6.309520514042905,14.219789270244483,14.308409363943957,6.34448324812471,7.155097853596808,13.90498333984423,8.128475540261311,6.341829679055937,3.737996855821444,12.486763740239892,14.488966035502726,4.439554749502346,10.864037250923833,9.239980971897628,7.094990709108986,9.9465066041297,9.877344118246763,13.407133854540366,14.93109065209184,9.475546534774764,11.119133255788517,11.077996168858352,16.434727180183554,15.445119302555874,9.861247291107917,14.776610534834454,11.417192962703483,12.822396917915814,14.396247492463093,10.431152459400689,8.966423373320223,5.473349797342886,12.83312496064738,9.859781299272367,7.6843740360754165,2.075715819129993,5.547877085738631,13.952798976562574,10.785011803312699,10.79553686233281,14.936874189892148,10.852766061733856,6.258048479610137,11.590259003494168,12.310910853742794,11.649835889523455,2.4082907835384626,6.328193332405585,16.66831615770294,13.95057099408275,6.806646160168121,6.340925721762485,12.932317995693111,9.066184832338198,10.221460666279048,15.04770620813406,17.621477502150896,7.103135837336141,7.561803740001574,11.033638576427949,13.146909212917096,14.62279306179125,16.305754903065356,16.915550608367905,18.064663111301826,12.194626675074236,3.724765735881954,10.970275212907005,10.691516118570028,10.232497997345554,4.385993432584825,8.934681797018044,16.256822859190684,3.87197630623491,13.5755595137443,9.313758016943126,7.140101065040798,9.576751563948804,13.159066077161615,6.6221302120975025,12.223075355665173,6.704684512775351,5.081517956460213,12.647576488841958,14.399741299484711,10.354377884515403,16.826708872476665,9.649721939259246,8.153185794216936,9.320582942488851,11.083596205592938,8.1134683073983,7.509295893580116,15.461510979043732,6.189910877396764,11.009850309069037,0.3431019044564687,7.878935074490638,14.28061341607681,14.926488235680479,12.371559669799105,6.576889486027701,8.15796410365265,13.244017528379151,8.26056797480135,5.21250258474498,16.59928832417492,14.421375151099237,17.545102842813176,10.296319237009655,5.444332582666364,15.437881774112709,12.5696379366522,12.041153097230639,3.840148553841265,8.886754931063589,12.16003808420703,9.787977895569675,18.12040987415666,14.705256625480569,11.422076830773463,8.129438367666344,15.282496613746103,11.184997602888355,11.635284372704199,13.776203481368782,18.455764842437375,11.149426396316255,6.6400843848058315,5.755448342747355,9.703671083739843,11.384374064578214,11.467482283974757,8.981496531269206,4.990577104421908,16.822711727707496,8.14661266374743,13.343817299833098,17.996120383289256,12.656230803639966,15.926141186405275,15.178637986109758,1.6801340157205913,12.405076529882543,17.434858599203192,4.046581988691624,7.911985795634191,9.324944011740422,14.541102723769075,9.983400602511946,4.988937246890717,14.383648559396894,9.033108439468414,9.683947926233502,11.128033949691655,8.136734118637019,10.54966411377411,5.593989025077688,2.8255038147581635,16.658200172102614,8.505079525118939,16.369354147002277,8.165390727466331,14.826038240110336,5.286315101130463,14.832003887776178,10.725070724703196,3.66834811415369,10.14075981377393,8.50062580050114,9.737362436027569,7.992744709443162,7.064136493314567,9.1203079374803,6.704978007356834,4.3657725917616546,9.516289689793227,15.756245416235508,5.296484547262796,11.808610764927643,15.108947706762184,3.7353589258952447,10.912563160239237,13.021394750940395,10.060504657812722,6.865031129415295,14.736510927242906,11.797356679310585,11.110440670747083,14.76640037599974,6.614856400556374,7.72094165556291,6.844751218497812,14.646759481972161,6.881405751906014,12.700351031088749,3.397085182516688,9.17372069055147,7.093390613281176,10.49123856785058,12.111604311061594,9.987048235983536,15.076950016215228,8.458478687796571,11.00337328107379,10.594347690340658,6.072266024088087,7.836975060976578,8.672976073357379,5.368109886445115,4.64620712666494,8.695441419353234,10.330341228001789,11.644935995612606,5.361973518334063,8.025673188653574,11.78416674938429,7.77636506295681,12.251595998345904,15.453028882389434,6.797564804596474,16.929654634756716,11.641906299309179,6.625808247723222,14.427716443132383,11.68142409478331,6.11891034542535,10.085223167616189,7.297617989315789,13.869147988006334,10.996490233690295,8.934034271358879,3.8479438604855853,5.206997899303059,5.909441135560128,7.5023842651771595,14.95768591618517,7.728592166391342,6.198240784815974,18.022722844603898,7.61981174098501,7.49731781706018,15.3592903607126,2.9661611834989388,6.778987933494999,2.59967398976783,8.810159303129579,7.279931136199922,3.781207018289283,10.162038520381756,16.213741127894266,7.393632454610987,6.193042607705397,2.460405420174847,8.935864773495542,10.103731460696675,9.680595466374848,1.898427810592056,7.13995718104078,14.545751170672547,9.992436838330354,11.879808694399582,14.747986717003396,8.216242152170715,19.527661123130635,11.120656165714223,9.27404610881349,8.407788305153217,18.155801731534837,9.653762091959806,12.789817300778068,17.15429760546249,9.007045800575641,4.1543963418379075,17.29089127212908,16.11318923093668,6.764537729866394,10.242228881401585,19.23834077672491,19.17582805905742,11.997926399142704,17.401936258768472,5.985507072935398,6.7544059787907695,11.711788624757855,10.762833240830048,4.152954512721694,14.151233676986536,1.2304506444459462,5.572419360674921,10.275100103814415,5.694959637252159,7.443970113131451,3.322107128979259,6.799180892690528,13.94050828754019,15.821886117236552,15.859719706174149,1.2376543041572408,9.483833153626803,15.739361264885893,11.5413210190794,16.72631233465049,9.87342371052668,9.911671517980452,13.494264156411216,8.431092047505834,5.021865176490985,6.511585290195147,6.544840298642056,14.12854842412501,3.054007324501944,8.41115718318194,16.512661515093598,9.610615957698235,8.628845212209505,10.735873112526397,3.087538264502272,12.739511326301615,8.833014250548104,13.92063536698462,10.578820830350177,13.971816450757053,14.199147935095343,7.576667684304185,7.417024811034853,9.736379407291043,14.284419111059924,7.0302706913934205,9.020683832005291,5.9516946467911795,7.026472882117005,8.246374777852846,16.30840894703855,15.437610685636717,4.829408717773836,14.855339839315494,4.625636158701498,10.771056624133214,11.122051226620947,7.95633220226213,5.175153912943138,5.635338788374698,13.756723095767065,8.418761730071116,1.3983949213785163,9.492098092141367,10.850684695548,14.13836647331818,6.949245536247486,15.632804862854712,7.804070836859614,9.596665622011134,8.653437235404535,9.473765764733484,10.240145903257451,18.852585463360324,11.445871451982367,12.148017855637816,10.91345844815169,10.046328400513858,13.784930388653226,7.237127822212539,4.171088142624604,10.411606288131148,17.87225874263803,6.046240186067033,10.538314195566096,8.512752042419468,14.663575909490133,11.648979422718654,2.0807974520609185,5.426130039358281,3.087038301432825,8.90850437377793,2.8096435258694408,16.715827119131134,5.679286594524935,6.439903291493738,12.904795318909708,14.657151489097473,17.3128693669314,17.963173236066787,7.5073449924192595,9.944258249913473,11.640891203423383,15.012119126967416,6.558016858182882,13.854174279869088,2.728332625887553,9.840227978997879,9.025864489822451,11.018929198410564,12.186647280357443,16.25681440637104,15.023868027635938,10.881449663897516,5.124436048199517,11.042384669291481,6.655705055015233,16.406102188150427,10.164190008763253,5.336877385008427,9.349618990602673,17.47615284409649,13.178547888967156,11.594172167082483,3.829360922827467,5.3745801720730535,18.49729219382175,14.037506192717878,11.44804944875742,12.825606832645322,5.626182560804647,3.582098006298009,5.294864265491171,12.546209650771488,8.313443328905278,11.861268705665182,7.3643607677933565,11.437508121471577,13.402738574552643,2.713464042618756,12.76036075760934,18.977940689643656,4.942325891521254,6.880893840483999,6.169050640975651,11.38693942200474,6.882778156002248,2.605755235869962,10.389652524007252,8.463009871678604,7.299525210797295,17.620041100128944,9.155299680958322,10.04112157060393,16.2254108131739,14.257557603859599,13.095572329517776,6.035788970674922,15.528262786720962,10.161290119626475,7.356261401696759,4.006927505441791,4.866214502107772,6.741781332986234,12.281918163686141,5.5878634299373555,14.584458146103863,15.87712567265709,12.228791031565468,4.949927509855289,4.522990466698573,9.857617481751168,3.028947123132515,12.971485210824111,8.353541070726479,8.887557084736795,6.196389123482586,6.130813745770576,4.643491938709408,9.317771738686385,9.556361784317552,10.530109133071102,10.765595710834877,4.373015016957879,10.811206854904738,7.693455261185165,9.635520816536172,8.54008231548944,2.594249474819874,19.705459471580383,3.727035295816916,16.97642219255569,5.822091953808512,6.604147526262352,6.918405257184601,12.98388677002163,11.465079486322454,8.053381918665613,7.27783359209392,4.365432449947885,8.499957568563572,12.574658357120494,18.812895924290423,11.69471047229924,17.612553423279987,7.79589416438621,15.059851404060513,9.025735308122416,8.972638580270946,2.5282560654744346,7.028406645803935,3.211303039587925,7.776400066232947,5.693252262070574,10.666493097904652,10.178946797603054,13.454673697802225,11.176176444597058,2.3915559641786177,11.119485546039577,6.714527583756668,16.24859913534671,12.675621175187885,4.653564436628419,11.873565258209812,9.534343103519866,12.278647160368816,12.186037856331042,17.296807910173584,12.947568083391026,9.149044577824913,7.343254953004457,10.770247893201518,12.224303652445824,10.076203953818453,5.662449634588686,9.370060132797082,7.824638411163381,9.172743448154678,4.741752529236168,8.27108713447537,17.248509666104958,2.5311377743367314,6.794165060071884,14.30558301150299,6.351442641212321,8.16588123005527,11.865531916281906,14.247069023843412,13.777695993086503,9.426650420536195,4.560485002635673,6.9575647086778964,4.239717869099415,3.222290662991256,12.099870073781167,11.120992821278035,7.779720479626984,10.006480139497219,10.121743434430883,10.453603217973946,5.26198662594444,11.952973394939242,10.231392500568326,4.635060776461357,10.093543817223994,15.235334337741882,16.2372361949064,13.412392103970525,7.1489453056726475,8.805112327875653,10.838678098420367,10.409669775752732,1.2442124063705107,11.613241512517959,3.8021250537831963,3.4685223920281882,15.194255655647858,18.4983757283995,11.586339952103728,11.253507220460738,15.924062273978992,5.131322657208295,3.8975916809254363,15.065628885957576,11.16932520544066,14.334060781885624,10.71867347264968,13.747614796144074,10.723032794496111,13.980590146634684,17.374713570115965,14.368269233344087,11.908175016617017,3.892709158618042,4.539481055198005,7.707444528652568,12.92433661191163,12.132369354261641,3.3299993471296707,11.885695422340682,6.522979569092595,10.005867128489431,13.785433027564348,11.078364746812394,14.04246910409738,4.5977764116353415,15.786852921453638,7.913999883987451,17.590997144251403,14.330552371475523,13.702367941787298,9.136617726056473,5.760305134263728,7.948820358352299,5.53357666065128,7.06128963990922,15.648922742733069,8.275417660678627,17.58128657698329,2.256199662374845,5.607457298564238,11.44132635698081,5.492872549741257,18.461499858085112,8.033890089426468,17.959423028479527,14.508958246694718,7.1435660265087035,9.381441290399824,6.645490231476168,16.65942128385109,9.745443323128292,14.285423515015502,9.89250032414386,4.670859333533435,13.983050946023285,3.3272559773138966,15.850738689401883,10.220928206369937,2.3336870957038514,10.970480028390307,8.773399615428193,8.152258299400984,6.802426459085806,13.493643713461879,8.010512104879925,18.502846633091846,6.7565296229264975,10.75757785807308,15.978994238657577,10.313721030655417,11.41052662683812,4.98951091715343,10.052824993361774,15.535583242646052,8.224461487931732,12.508502094686836,8.262198489818127,0.3776931607878975,4.960441477867634,7.09434274760638,4.546858378399861,5.583896631650099,12.921536427974345,8.06995558997045,15.633257385568388,4.590749179457621,7.2333379478478355,16.63679788416146,13.180296323564745,12.262825093478874,9.26627593574446,6.067280077135266,9.214474326435374,16.86186270645674,10.83084932093296,10.302110698927052,16.436598627114698,6.110759602666169,9.385276866356806,2.627832700826984,7.363248730568673,5.136235190934089,11.46808769976549,10.403583103754324,8.160434782419294,11.139437899341793,12.484025736454038,15.785776475074323,2.246349212669867,7.386542166243773,9.821761546559879,13.136197920329339,1.8419769245025064,12.685728341978628,14.958378777474945,1.416659385168595,11.143688054703237,7.9814077311525455,11.294844910676161,7.218714538832178,18.447518097322117,3.458571596870099,5.817749744887138,15.157262193583794,3.021213066278561,10.007081213535916,7.309367217441505,7.7415606783580015,0.8191856108845563,11.838845488409614,9.529472016014262,8.355661807784937,12.409004360913684,4.656647436160355,7.240588900574217,10.04268671462795,11.63098325261157,14.425498412593942,18.12837059028802,11.909614561154598,10.105842079329355,8.371072544781475,2.0416349703390835,13.136880473011141,6.631743172387987,11.375830523512208,7.94130912546124,9.912501911249947,10.526589427776877,11.070606652669365,5.2797330580999935,6.726324434154559,8.959886833035595,7.983032009096864,16.67751215050095,19.10886846188145,14.645325542410685,2.6034254650046273,15.92514451575217,8.916990204773068,8.501227041877666,0.8324515357003492,12.679723314747793,7.354312655554389,12.018326662558918,12.980035719859972,6.345560949279796,7.995608864148645,1.4942967769007276,15.888141916935892,8.864533272437502,5.031358806201238,10.291404730062354,7.287571382016644,0.8495825488373265,12.732522568989953,13.605201150814297,14.191013021110408,8.131404846707213,14.550090272617481,17.090903240440404,11.39348380816351,15.72345395788668,9.564870454124527,10.169726921264573,1.909071095099224,11.07452636125785,6.8266485290335455,7.35485304084029,16.396514613372005,14.806995233416071,5.779739266878258,12.3311818839268,7.0404818340739475,8.88905176615723,3.0512512654993373,5.820366233034772,6.205931771971113,7.575108486240012,11.714951288338721,0.42558032841343296,9.879507359836085,15.356067216346451,9.344844609941354,13.001387970091624,13.686242946800656,14.401400696873349,11.219163789618518,11.025139933344866,16.516638451466356,10.789324152687964,17.29655320363949,9.484969669319664,9.405587003800653,13.846015743058043,6.678140590018478,14.482726172781966,7.546246204501181,15.669766184613973,11.183586509002062,12.077403946224905,14.08711362733835,10.365863744938755,18.569053514413625,6.8431830087218355,1.8767800716888305,9.04907049339312,9.617242235751059,15.542817877066028,5.141524390873943,16.361270299935867,13.240350481342972,10.52711034985707,10.98056739818567,3.748080335212829,17.537389193196866,13.081323637330815,7.198229472391382,16.947294548252213,11.445380885158269,5.510317739183051,17.345483151002725,12.927126291948188,13.121445644762312,15.779290745272208,11.486431956523521,11.742010376561161,14.448105561216856,12.464711759445658,12.363082018306164,11.508761491822884,8.256538543851235,5.275854371413342,12.577884645009352,10.876256559930408,2.2670341527700844,12.68259078219954,14.462267752764335,8.221431070465785,3.9926440204444824,3.830532394677164,6.184630978288664,11.936775364688241,7.756890868897326,9.950130372416908,10.00822550885939,10.889016725075175,10.832834320709544,10.11482366990383,11.582465007136353,12.618391098373362,6.377855948723598,5.372269294290989,6.371987124383985,10.39679189532154,2.129241543412741,5.813883982747736],"mu":[0.9770654866752859,8.763329234426857,2.1480513280932545,6.401978394406321,1.1170038730028486,4.123474257507906,0.4142575934098147,3.883126376950181,0.9732757335939768,6.347453924641274,0.31510203271403636,6.780258089877775,6.463995056309038,0.9689000799080172,0.022349770242937606,8.20087870481756,7.938466638216801,7.8469973099402175,7.395895870191014,2.6893263289704095,4.156664008154809,1.1077767206771116,6.788000064723089,8.570418113860246,1.8722600627411112,1.697252652251211,1.9114087109890598,4.478957587208436,2.192994241720043,4.602000017330945,2.0378505572549943,5.276523161236312,8.75331787582237,3.386478429292612,6.9991306166399925,3.246375969947659,5.471381918372698,7.931734931799095,2.655730677008905,9.835959872348258,1.1640600873174556,5.360472224123507,7.879456644209077,5.179200499534393,4.971327692229424,8.380607077109715,3.219011412076389,6.879402086570375,3.0843475371938656,7.8334975580761945,7.475515221999083,5.519146025527226,7.483317184194547,5.692445813388376,0.5743135335151339,8.54897412711323,7.150411444057852,1.511922951555964,2.326934374381344,1.0413054278341827,6.752610814309632,6.258106194243858,1.5912599177416853,7.537793404990206,9.2012788953999,1.6650508675005127,8.105455711657994,7.7426013728473215,3.6046742893601658,9.40893793557477,3.225183889025942,4.053693724236826,6.9973677193888895,7.864620160699962,0.2458564063906321,1.940436524729412,6.083826354695436,1.89573255513247,5.478712267184687,9.193887040021988,9.353508813731723,4.2371168143177655,2.998652254453593,4.728342170913731,4.554506342574999,2.132577584588109,0.934030510570516,0.385290166047525,7.009104043926628,8.559519054987918,4.6258232690434875,4.2537027802869565,4.0805483799416775,9.36560605602361,6.188891997178725,1.8493941576117812,0.1878317453756595,6.391392707897836,4.346175835718378,0.5736549500369903,1.997120806414474,3.690957395454093,6.771361419782201,4.719884155354357,6.035062977828245,8.548058188460132,8.97403800260821,2.3957114311572814,5.434814990271293,3.189300458892106,0.17306674408724465,8.775047342277293,7.217976274787747,1.3539176338760783,6.572725115187772,1.5148270901890548,5.0047012184603945,5.089395019172307,2.332679520482801,9.319019730980283,2.5520350431022387,7.8911213394686985,1.222631924690285,3.2920729579276897,8.67160218534148,4.736115926329479,1.542526409852778,0.3922596654252697,3.680959714093377,5.48135024594713,6.476328221699312,1.2052964514849496,1.2628326081533858,3.769169251261917,2.344855881300547,4.0612624082903315,3.952867220989782,5.8966896034873955,3.9810130271334865,5.704025404844697,9.158326169556172,6.101187621749258,6.324580643945195,6.239774371117397,9.678436308689683,0.969957832833479,2.302679465925588,8.013713665536743,2.8539868231591403,4.007992879250983,7.042908117292786,9.319349457446123,3.4203169443321935,3.6476123226115043,8.217572408249751,2.6465632384329063,0.8946515634245533,2.652238298852081,1.8294810327875677,7.382318787327526,8.834290057881935,0.5372966925971867,6.5645201879647885,8.244847727948645,7.308758588676383,3.6939236035988143,3.564620532574325,7.328986300572186,4.52727438831513,1.77001675847263,8.113311212892123,2.399871169705159,6.32669534981372,7.103377953917837,1.5805903377694186,8.567143651742395,9.577479885569794,4.751725425994198,4.8968127789642075,5.04827948981228,9.113414904842838,5.675447328497196,4.7384859178166145,6.276768107350583,2.0009746949765783,5.349769512696709,8.867884409331012,0.9635731855042029,8.416411057594091,0.04227796976610243,3.366513802436002,8.480005259126496,2.507789135621925,1.742005732426013,1.3561947608749714,9.41987020356682,8.83038667382976,2.2754777383155145,7.871374202510008,8.156884401832896,4.582046889628453,1.8362254458093097,6.4743818258986146,4.335160971956606,0.49367869867746883,5.77626731114556,7.104448062225471,9.55426903424117,5.013237817718778,0.20924739171090057,6.861078028905421,8.873018657666362,6.247524118214141,9.582760359633617,9.616614174003889,6.707449901013711,2.429006885360361,3.6966681855810135,9.439743171085698,8.529621376563313,7.951843393019329,9.303159170229268,8.806107240839701,4.473198902706792,1.7672745916075705,5.723048773746697,5.110590067860288,1.0306414586599533,2.6377851964237653,1.5491347515454423,7.155589211486744,3.67246822036273,4.9116289855163835,3.3244171331387973,4.739562643742317,4.8117904010422885,8.626333820259733,1.6733142710800686,8.92300043860647,1.13536971818051,3.5926685531816327,7.663591857717291,9.883897455466236,5.082698931619374,7.19560799837093,5.80413223967454,1.4981336096942965,5.844184355409732,3.0876446900008547,2.634156673495196,4.331095683323376,9.59359519557381,2.2549101221545342,3.9317144193171716,0.31357313215546245,3.8961936259315877,6.54623636650644,4.960084768701336,8.174400300910962,4.986408920619603,7.061869150943565,3.4592152716723557,1.701305382171583,1.7910709646850465,9.854492905315961,7.533801662569612,8.081950738381863,5.080996147852382,3.1366809075853963,5.998450304650936,7.663390895942679,6.771925139552271,1.4814187073282903,8.35546048393188,8.366172821203664,4.806691384884562,9.657422797340846,8.546535832164214,1.4871016409808102,1.6063778150117547,7.66782732202768,1.863224803426422,4.719861161100411,9.617785638604685,9.678897158192077,1.4751631449247826,2.6787799168334048,0.41169485077630297,8.298162511016972,7.020822486193485,2.1518373378142264,2.480906677268657,3.328098025520938,8.595416066467418,6.292935314830855,8.610588086760238,8.677424663116856,8.900899921496453,9.402588793676422,6.059942245696275,0.44321063315084785,5.091102230341078,7.676526452752766,2.212586790825426,2.801121341745645,5.762619638072069,6.940551166672453,9.005151607114016,1.2585280744807492,6.4718871704568475,8.417177275131426,2.9264027918640623,5.990088358934907,0.8319843345230549,5.020466037818229,1.1131559674216773,0.6818273986788048,8.892679368935426,1.1689845436159296,9.610636949514511,6.779231780178607,9.18014441083843,1.3682010667404199,6.932342492534707,1.0867933164017551,3.3367361722651823,8.613653879454963,4.009625587831356,9.188762390637816,7.009860303788309,3.4157101388155686,8.412516340508315,6.639457309385004,3.154085353537701,3.899514511593567,7.910256328432221,2.1152618904265363,9.868812261189177,8.909567721584875,2.5759933896342924,6.2173491515347905,7.325118843217357,1.6464107452721044,5.714664636337867,9.721112007350639,3.1558917931807318,6.083187543930244,6.210216795487056,0.9738515524866065,1.1754129354014964,1.0834103387730676,9.093968478663964,3.084636227956292,9.676529681151765,0.7848928922994713,5.0602383801988005,3.9529519243586253,5.30024825561505,3.50518986962443,4.291112650802762,7.020833163380582,0.29350039906945957,9.387111317231065,1.6576974902487729,4.766467004897155,3.353415311160659,6.8389711572423,0.1483501811488641,2.6939912428147017,1.9669538396925845,8.599363745634125,8.01345122727451,0.27448461235843213,6.95211319804895,6.121830694776637,4.816233344770686,4.295279053027777,6.558506877651276,1.0051015077636904,7.918008183687004,2.11078366258197,5.580220911807463,7.173241200677851,3.238637445680743,2.6608071630679286,2.368516526811344,2.4060964801841256,5.53536578475642,5.853591011004782,7.329903699533798,1.2165454557976574,4.543122735942607,0.19966699536536403,2.330883340434813,8.480287015621151,6.179282231059913,1.1849967290679952,9.90713563208254,7.4712878497179025,3.3596724448486803,9.12303134241262,1.5977452182022578,3.268265512480437,1.4740038030680225,2.1966425388935162,0.4047256518509701,3.775396868163705,8.953486150596477,6.910452066591848,1.5518870369239557,3.455784853213155,1.9688390765654495,8.245589834050453,2.685034949943379,7.358214908216891,1.7128545896090674,2.7819327387097026,9.573518105825045,2.531892814342993,3.5490383092535205,8.037947278350448,2.6967207115797853,9.613972971595096,7.11867571454778,5.422523439141056,1.34259147433188,9.298066960661943,3.355320884721651,9.18585116878006,7.6613952628082815,5.8354380273862905,2.2219841776866023,9.90618625972578,6.303064481406075,2.671816399277016,8.262476620198576,9.934543405156859,9.412982933309799,5.64947926290881,8.113390027528283,4.1743433660402225,0.6791842102231338,8.989947905428888,6.138622176877497,3.626657645063718,7.157710370718426,0.7305395081335497,1.96212522280792,1.9542150383900836,0.5308016773293911,4.8869635166662455,2.056663214386689,3.3936296337348426,9.86180745878258,6.087827427092223,7.271178594824743,0.9906081955998425,7.210348356405188,7.471475179806859,8.138772657710454,7.694529331701634,8.132326340251907,9.774403524528882,4.166075156111882,2.546980458418522,2.096209671221323,2.258917264038538,5.350010693585112,4.477064630055374,2.4130943639785762,7.287778411594232,9.75966838048288,4.3163352827495665,3.8327648649872037,2.1035286609408477,1.4138666246268072,7.724550861809387,8.636673743725478,5.723490332427894,9.243382866643241,6.566857540349165,7.894005424462513,4.9677475530954425,0.13380561478007147,3.1962197441398787,4.904673808131632,0.40460041663660684,1.7418401452398125,1.3331076237546524,0.029083809233227953,0.8714534290992937,9.157644739655058,6.328018403549791,4.095453316577884,8.672790660166799,1.6949899056240536,8.43213361545031,6.389154621900093,2.777414263603468,2.68558060578989,1.438446967300393,4.129713844545211,1.8904679789055945,0.9465842816299097,0.06622357624849862,1.7225390983304711,9.742924321648976,1.591709123160645,9.090293290188834,6.230023888562042,9.49783593810248,2.9181435676866663,3.360105263426305,4.109296137699037,9.503001529924727,6.80402021291636,6.388071530832522,7.96310207403674,5.261669856820412,8.322065639020057,6.4934719247702795,3.8895223158008063,9.61847944164334,8.926813485725933,0.08027270719751955,7.432587156638539,7.130372619131804,6.394835882474437,9.611757567250558,0.5189766122143924,3.7416765028524,2.432128734065524,6.089146395544464,0.2778610869436915,8.373992651096092,0.060414103870150004,0.7530643382681079,6.083979387070697,9.48355875861283,7.4897234699492365,9.76157546937631,5.599763278056253,1.0519165838900268,2.3067007607097034,7.906558126206571,2.6650810592367735,9.855761335993074,0.11596740485495749,5.325151322959558,3.311960063572321,4.4796768411626235,6.146946346823327,8.088573520634274,8.563299819215493,0.9510570089528736,0.07810856976534941,3.0671285208862575,5.542413371938617,6.7039515675168655,9.618992654650352,3.937664244394641,3.299625352216904,8.828113068238007,9.735838033100615,9.276339033289297,0.6415469740074764,2.3224304160756426,9.104490438023303,7.096561332882274,1.5588653122757679,3.3013163930943557,1.9054427638772298,0.4246076177036473,1.9472883554775944,3.959326588542269,1.6362894775890857,7.382774113596005,5.65578505049829,4.307974404330388,8.492697849879926,1.7257248317785123,8.137507593515457,9.282049367287708,2.6889739323214323,2.308513644694181,3.165377686823332,1.547266219750949,5.416427143869171,2.1431986498478017,9.656209679188361,5.615538185182332,2.040199136573111,8.998236739547528,3.1570160969199823,9.14959860436748,7.9995762922200715,7.181489082775057,6.713372304974317,3.874376201315739,8.697869010563181,1.15495546990815,1.2807218279751464,0.5271565884206209,0.6868169136866409,3.67374946678529,8.9940921284351,4.008527119318101,5.014930457994908,7.596701592538824,6.707590050570151,2.8571804222039843,1.5065094642711752,3.200222894419198,2.23032555019822,9.45263670878376,7.862994578079721,6.783580727444396,2.7837820671555003,4.385915106440221,0.5792282908648949,1.7234680466123709,3.8784361425747105,6.642113990930499,1.467161731895048,1.3603016143390745,2.367278983292651,0.16325795084524142,8.083079512087355,8.39360344849464,0.4786529012547325,9.843332381779636,0.39387049875625024,7.887233994518443,0.2480928236228963,6.368893221491259,6.073409834847587,6.955845346567693,5.584854577660032,2.2615346278787807,6.598884345706486,1.181038247549735,5.129922228630885,4.542459822295197,9.931219073116251,6.297933193797675,8.620710091935376,6.083565523793649,7.008661445392552,1.936956724389547,1.8502144202725646,0.619293521491795,5.939067812645867,2.394357146698529,2.794657218197507,1.140848617740875,5.071567945127377,8.408083933457089,9.235625029730592,7.098303890079523,1.957532541777094,5.879688485150341,1.714273023088435,7.005139364696921,8.387634175422384,3.69470324690492,5.983272067288827,0.3374300055280832,6.210922425878145,7.2704855975224625,9.794199047344952,4.834153942053576,8.633206729537974,6.796938121874088,8.742288012934187,5.349382548124401,5.287883580904089,1.3164427212363172,4.010740026664594,5.718474110580143,7.34304914261932,1.5439172308349014,3.184990181619809,7.876004949255863,2.0890601686869736,3.349654112150353,9.738010164518627,4.810188686932193,7.282449301453804,4.267050571834208,9.267453265149591,5.936833286571364,1.5568136992294335,1.636046265459945,3.4115851575279876,3.8931944825741804,1.3342458870481821,4.972733583863143,9.903387944606312,3.8871909583910003,1.8746799800189762,0.6004244990684549,1.583102203895006,5.111328447567569,4.686110254637845,1.1803881174115105,1.8938187386238892,0.668793559041605,7.04553742724412,9.372214905618465,7.646119292430951,4.93118609128421,4.360221301402234,1.8198222549053122,9.25369006264434,0.6984071830914673,2.3954291041509923,2.982035619826542,0.6214342775586879,8.058035862704553,8.746720817897454,4.337715173148016,6.2757177857521125,9.10372570561745,0.01913595857225836,1.4466341500334723,9.830284424954863,2.0618066457538298,7.355085721069223,2.849300276168134,4.145585216850469,8.009385213057769,9.754838469692507,8.56487079298076,8.053885050745622,3.7023517751226542,0.6743421449918086,0.06933170254050935,3.8415990346411433,9.390676111382568,8.42707608332476,2.5686963182165212,3.515122529255703,5.3220042862575845,2.881195465437927,3.88801773489295,9.955236650483121,6.171270838705903,2.1016030351654935,6.1984945727370615,7.596369258249469,8.320098707686064,5.1896624815706405,9.938041551543577,6.136601088963706,0.8877128126937261,3.7954398813826584,1.7697565181594666,6.656424138855758,7.329900925649168,7.793182180921578,9.945002678761012,1.0308742619044953,3.6399425648882877,7.206597330809594,4.069580076423023,9.53738254696086,6.356281751474611,8.741534053179594,9.45220299225823,5.632113153586278,3.718943866203761,6.051493805758588,7.33799390664095,5.830692332740939,9.723169182164582,3.8728745493490746,3.542747722471047,4.892611300663736,3.165225271218577,8.836478500097275,4.015788795127411,1.2662366633247912,1.0964900490451246,2.396995312973913,5.482687257159311,5.425928155754098,3.8871226336200704,7.229287608818331,9.261403464910805,4.541083076011406,3.94324552274236,8.391208449849204,8.790485020807022,5.747601471800201,3.0413767326781738,1.2499555022010278,8.991382222826216,3.0239673293082325,7.167484703895115,2.6881107690888117,0.2807768618927309,4.047007640249067,3.440015090674924,1.8900501614836651,0.26607111575931874,3.6027331590223888,4.259704195279321,7.238299008726341,1.7910469887290947,3.9097924855594224,7.405504624052712,9.516753493185,5.668358681067323,6.103831801849315,5.83936112376529,5.419312339561331,9.354019966667519,6.844245241117486,8.356804382238183,8.414803416928136,5.197899269767181,2.2816666764712523,1.7808217593873277,7.0108106214975185,0.2040557214388805,5.865540769031192,7.43642079837322,1.3817865453486777,5.705444601456698,6.40754545474744,7.530067262121635,1.7515530950277292,3.566669830812892,5.657633971710789,5.311394726777625,0.35637781349446174,3.170167141704452,7.355388657545985,0.7666510730448262,9.093678842784191,7.879922292369674,3.0529658127232473,6.9171776397121665,8.478051747627715,0.33486792748630645,2.4524818153944494,6.607734986799727,0.9300518453009321,4.494715163970671,6.066153671687509,0.7899361412462325,0.5201588697330051,5.554716591685289,2.295456395259421,7.889520737501301,5.40648546853419,0.9960749169851679,5.246873451700987,0.40354589495858795,2.7901188057080106,4.75036613306695,9.44959902308501,3.370977620470359,8.520606980557233,1.0574779669759704,1.1788064068948945,6.044227583520485,5.445088953108083,4.559810515192943,2.925434790567343,0.8730877617737454,8.437486656690435,6.179896949722838,5.177215528311692,0.6682364319225731,8.252460452270594,1.8569511401754024,7.0984568876942244,9.903440379755132,6.283542446237491,2.049586349341157,5.931442570885519,0.7316133699220773,5.56662913869337,0.24180601009780478,5.047991530939305,7.061382211491473,6.990783704831925,3.820944496113532,3.3652938372465657,2.421374480037084,0.3831018688202126,8.008805966955215,4.988293098064878,1.0891598487530407,9.47843030982001,4.412713941559813,0.7814494629249946,3.4631564514212854,5.505522142657567,5.666913717158795,0.7524872596152021,6.629438767282081,7.662461393279054,6.358287439302459,9.91054996870738,4.292212450988638,1.4720526665781875,1.4175792197168802,5.4659482437118,4.645404629654508,0.7162960800694762,9.097703181899528,5.551937822322861,1.6983173474368796,7.831955831007975,6.840714743459275,4.005055611175548,0.8987536304009236,4.7791505208892655,0.011670427416317075,4.454789040860376,8.908235228735093,0.13532688361869383,2.705124278685991,6.0339944011250175,4.808856249358264,7.889126904696129,6.556035627860863,7.792457679695344,6.87733730959285,9.289295297204488,8.594474613499488,5.2657581578292545,9.591681855111936,5.947258187005334,1.0044877358432225,5.36339740732333,5.652217625929577,9.571287560588615,1.0762450166305015,8.137705155485499,8.108270333007772,4.250429848519788,9.528727749362098,8.603327886388595,9.183904819901763,0.8568350635652244,1.5594009807205844,8.319251346589882,0.5972336608805495,6.062257014016845,1.9943981901429475,8.915838521201998,5.189629013377035,7.3741492758779215,6.92009922897348,0.5421710625953358,8.938743898045518,3.3535807512183724,6.967836060684418,8.75913259789326,6.344773249412046,1.2608607447297238,7.607297904879998,8.102157122259095,4.7804578795716335,7.847164418739412,8.420323592684964,9.823275545672125,5.813123537292968,5.69898444740147,7.505140450552443,2.837534417737224,5.162149207816036,4.912812757866602,9.869815209691952,6.5147015098277405,0.19687682105550497,6.877759155359389,6.4000860938707955,5.1539218229885675,0.643623445170427,0.42258229586058293,4.713221830271584,2.8116925115274793,0.8784233951967546,0.8730495853997633,6.11659968930538,1.3449185616342074,9.349416519724706,8.964728051597282,6.0801899314012475,2.867186149724188,0.45051764090381363,0.13511978504729294,4.286841224792404,8.42065029349065,0.01563709231825694,2.8800558317446834]}
},{}],126:[function(require,module,exports){
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
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `c`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `c`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 0.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var c;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], c[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var c;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], c[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large variance ( = large `c`)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var c;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], c[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/pdf/test/test.factory.js")
},{"./../lib/factory.js":120,"./fixtures/julia/large_variance.json":123,"./fixtures/julia/negative_mean.json":124,"./fixtures/julia/positive_mean.json":125,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66,"tape":261}],127:[function(require,module,exports){
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
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/pdf/test/test.js")
},{"./../lib":121,"tape":261}],128:[function(require,module,exports){
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
var pdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `c`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `c`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `c`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var c;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], c[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var c;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], c[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large variance ( = large `c` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var c;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], c[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/pdf/test/test.pdf.js")
},{"./../lib":121,"./fixtures/julia/large_variance.json":123,"./fixtures/julia/negative_mean.json":124,"./fixtures/julia/positive_mean.json":125,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66,"tape":261}],129:[function(require,module,exports){
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

},{"./is_number.js":132}],130:[function(require,module,exports){
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

},{"./is_number.js":132,"./zero_pad.js":136}],131:[function(require,module,exports){
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

},{"./main.js":134}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./format_double.js":129,"./format_integer.js":130,"./is_string.js":133,"./space_pad.js":135,"./zero_pad.js":136}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./main.js":138}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./main.js":141}],140:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"dup":133}],141:[function(require,module,exports){
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

},{"./is_string.js":140,"@stdlib/string/base/format-interpolate":131,"@stdlib/string/base/format-tokenize":137}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":142}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":145}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":149}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{"./define_property.js":147}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":146,"./has_define_property_support.js":148,"./polyfill.js":150}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":139}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":152,"./polyfill.js":153,"@stdlib/assert/has-tostringtag-support":20}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":154}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":154,"./tostringtag.js":155,"@stdlib/assert/has-own-property":16}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){

},{}],158:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"dup":157}],159:[function(require,module,exports){
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
},{"base64-js":156,"buffer":159,"ieee754":247}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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
},{"_process":253}],162:[function(require,module,exports){
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

},{"events":160,"inherits":248,"readable-stream/lib/_stream_duplex.js":164,"readable-stream/lib/_stream_passthrough.js":165,"readable-stream/lib/_stream_readable.js":166,"readable-stream/lib/_stream_transform.js":167,"readable-stream/lib/_stream_writable.js":168,"readable-stream/lib/internal/streams/end-of-stream.js":172,"readable-stream/lib/internal/streams/pipeline.js":174}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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
},{"./_stream_readable":166,"./_stream_writable":168,"_process":253,"inherits":248}],165:[function(require,module,exports){
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
},{"./_stream_transform":167,"inherits":248}],166:[function(require,module,exports){
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
},{"../errors":163,"./_stream_duplex":164,"./internal/streams/async_iterator":169,"./internal/streams/buffer_list":170,"./internal/streams/destroy":171,"./internal/streams/from":173,"./internal/streams/state":175,"./internal/streams/stream":176,"_process":253,"buffer":159,"events":160,"inherits":248,"string_decoder/":260,"util":157}],167:[function(require,module,exports){
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
},{"../errors":163,"./_stream_duplex":164,"inherits":248}],168:[function(require,module,exports){
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
},{"../errors":163,"./_stream_duplex":164,"./internal/streams/destroy":171,"./internal/streams/state":175,"./internal/streams/stream":176,"_process":253,"buffer":159,"inherits":248,"util-deprecate":269}],169:[function(require,module,exports){
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
},{"./end-of-stream":172,"_process":253}],170:[function(require,module,exports){
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
},{"buffer":159,"util":157}],171:[function(require,module,exports){
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
},{"_process":253}],172:[function(require,module,exports){
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
},{"../../../errors":163}],173:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],174:[function(require,module,exports){
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
},{"../../../errors":163,"./end-of-stream":172}],175:[function(require,module,exports){
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
},{"../../../errors":163}],176:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":160}],177:[function(require,module,exports){
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

},{"./":178,"get-intrinsic":242}],178:[function(require,module,exports){
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

},{"function-bind":241,"get-intrinsic":242}],179:[function(require,module,exports){
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

},{"./lib/is_arguments.js":180,"./lib/keys.js":181}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],182:[function(require,module,exports){
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

},{"has-property-descriptors":243,"object-keys":251}],183:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],184:[function(require,module,exports){
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

},{"./ToNumber":214,"./ToPrimitive":216,"./Type":221}],185:[function(require,module,exports){
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

},{"../helpers/isFinite":230,"../helpers/isNaN":232,"../helpers/isPrefixOf":233,"./ToNumber":214,"./ToPrimitive":216,"./Type":221,"get-intrinsic":242}],186:[function(require,module,exports){
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

},{"get-intrinsic":242}],187:[function(require,module,exports){
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

},{"./DayWithinYear":190,"./InLeapYear":194,"./MonthFromTime":204,"get-intrinsic":242}],188:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":237,"./floor":225}],189:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":225}],190:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":188,"./DayFromYear":189,"./YearFromTime":223}],191:[function(require,module,exports){
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

},{"./modulo":226}],192:[function(require,module,exports){
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

},{"../helpers/assertRecord":229,"./IsAccessorDescriptor":195,"./IsDataDescriptor":197,"./Type":221,"get-intrinsic":242}],193:[function(require,module,exports){
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

},{"../helpers/timeConstants":237,"./floor":225,"./modulo":226}],194:[function(require,module,exports){
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

},{"./DaysInYear":191,"./YearFromTime":223,"get-intrinsic":242}],195:[function(require,module,exports){
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

},{"../helpers/assertRecord":229,"./Type":221,"has":246}],196:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":249}],197:[function(require,module,exports){
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

},{"../helpers/assertRecord":229,"./Type":221,"has":246}],198:[function(require,module,exports){
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

},{"../helpers/assertRecord":229,"./IsAccessorDescriptor":195,"./IsDataDescriptor":197,"./Type":221}],199:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":234,"./IsAccessorDescriptor":195,"./IsDataDescriptor":197,"./Type":221}],200:[function(require,module,exports){
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

},{"../helpers/isFinite":230,"../helpers/timeConstants":237}],201:[function(require,module,exports){
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

},{"../helpers/isFinite":230,"./DateFromTime":187,"./Day":188,"./MonthFromTime":204,"./ToInteger":213,"./YearFromTime":223,"./floor":225,"./modulo":226,"get-intrinsic":242}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":230,"../helpers/timeConstants":237,"./ToInteger":213}],203:[function(require,module,exports){
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

},{"../helpers/timeConstants":237,"./floor":225,"./modulo":226}],204:[function(require,module,exports){
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

},{"./DayWithinYear":190,"./InLeapYear":194}],205:[function(require,module,exports){
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

},{"../helpers/isNaN":232}],206:[function(require,module,exports){
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

},{"../helpers/timeConstants":237,"./floor":225,"./modulo":226}],207:[function(require,module,exports){
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

},{"./Type":221}],208:[function(require,module,exports){
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


},{"../helpers/isFinite":230,"./ToNumber":214,"./abs":224,"get-intrinsic":242}],209:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":237,"./DayFromYear":189}],210:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":237,"./modulo":226}],211:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],212:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":214}],213:[function(require,module,exports){
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

},{"../helpers/isFinite":230,"../helpers/isNaN":232,"../helpers/sign":236,"./ToNumber":214,"./abs":224,"./floor":225}],214:[function(require,module,exports){
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

},{"./ToPrimitive":216}],215:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":186,"get-intrinsic":242}],216:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":238}],217:[function(require,module,exports){
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

},{"./IsCallable":196,"./ToBoolean":211,"./Type":221,"get-intrinsic":242,"has":246}],218:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":242}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":230,"../helpers/isNaN":232,"../helpers/sign":236,"./ToNumber":214,"./abs":224,"./floor":225,"./modulo":226}],220:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":214}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":188,"./modulo":226}],223:[function(require,module,exports){
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

},{"call-bind/callBound":177,"get-intrinsic":242}],224:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":242}],225:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],226:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":235}],227:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":237,"./modulo":226}],228:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":184,"./5/AbstractRelationalComparison":185,"./5/CheckObjectCoercible":186,"./5/DateFromTime":187,"./5/Day":188,"./5/DayFromYear":189,"./5/DayWithinYear":190,"./5/DaysInYear":191,"./5/FromPropertyDescriptor":192,"./5/HourFromTime":193,"./5/InLeapYear":194,"./5/IsAccessorDescriptor":195,"./5/IsCallable":196,"./5/IsDataDescriptor":197,"./5/IsGenericDescriptor":198,"./5/IsPropertyDescriptor":199,"./5/MakeDate":200,"./5/MakeDay":201,"./5/MakeTime":202,"./5/MinFromTime":203,"./5/MonthFromTime":204,"./5/SameValue":205,"./5/SecFromTime":206,"./5/StrictEqualityComparison":207,"./5/TimeClip":208,"./5/TimeFromYear":209,"./5/TimeWithinDay":210,"./5/ToBoolean":211,"./5/ToInt32":212,"./5/ToInteger":213,"./5/ToNumber":214,"./5/ToObject":215,"./5/ToPrimitive":216,"./5/ToPropertyDescriptor":217,"./5/ToString":218,"./5/ToUint16":219,"./5/ToUint32":220,"./5/Type":221,"./5/WeekDay":222,"./5/YearFromTime":223,"./5/abs":224,"./5/floor":225,"./5/modulo":226,"./5/msFromTime":227}],229:[function(require,module,exports){
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

},{"./isMatchRecord":231,"get-intrinsic":242,"has":246}],230:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],231:[function(require,module,exports){
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

},{"has":246}],232:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],233:[function(require,module,exports){
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

},{"call-bind/callBound":177}],234:[function(require,module,exports){
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

},{"get-intrinsic":242,"has":246}],235:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],236:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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

},{"./helpers/isPrimitive":239,"is-callable":249}],239:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":240}],242:[function(require,module,exports){
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

},{"function-bind":241,"has":246,"has-symbols":244}],243:[function(require,module,exports){
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

},{"get-intrinsic":242}],244:[function(require,module,exports){
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

},{"./shams":245}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":241}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
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

},{}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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

},{"./isArguments":252}],251:[function(require,module,exports){
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

},{"./implementation":250,"./isArguments":252}],252:[function(require,module,exports){
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

},{}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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
},{"_process":253,"through":267,"timers":268}],255:[function(require,module,exports){
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

},{"buffer":159}],256:[function(require,module,exports){
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

},{"es-abstract/es5":228,"function-bind":241}],257:[function(require,module,exports){
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

},{"./implementation":256,"./polyfill":258,"./shim":259,"define-properties":182,"function-bind":241}],258:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":256}],259:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":258,"define-properties":182}],260:[function(require,module,exports){
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
},{"safe-buffer":255}],261:[function(require,module,exports){
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
},{"./lib/default_stream":262,"./lib/results":264,"./lib/test":265,"_process":253,"defined":183,"through":267,"timers":268}],262:[function(require,module,exports){
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
},{"_process":253,"fs":158,"through":267}],263:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":253,"timers":268}],264:[function(require,module,exports){
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
},{"_process":253,"events":160,"function-bind":241,"has":246,"inherits":248,"object-inspect":266,"resumer":254,"through":267,"timers":268}],265:[function(require,module,exports){
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
},{"./next_tick":263,"deep-equal":179,"defined":183,"events":160,"has":246,"inherits":248,"path":161,"string.prototype.trim":257}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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
},{"_process":253,"stream":162}],268:[function(require,module,exports){
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
},{"process/browser.js":253,"timers":268}],269:[function(require,module,exports){
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
},{}]},{},[126,127,128]);
