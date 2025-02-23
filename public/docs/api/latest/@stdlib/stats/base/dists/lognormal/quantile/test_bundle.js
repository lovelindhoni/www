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

},{"@stdlib/utils/native-class":144}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":144}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":144}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":144}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":87}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":91,"@stdlib/number/float64/base/get-high-word":95,"@stdlib/number/float64/base/to-words":103}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/detail/erf_inv.hpp}. This implementation follows the original, but has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var rationalFcnR1 = require( './rational_p1q1.js' );
var rationalFcnR2 = require( './rational_p2q2.js' );
var rationalFcnR3 = require( './rational_p3q3.js' );
var rationalFcnR4 = require( './rational_p4q4.js' );
var rationalFcnR5 = require( './rational_p5q5.js' );


// VARIABLES //

var Y1 = 8.91314744949340820313e-2;
var Y2 = 2.249481201171875;
var Y3 = 8.07220458984375e-1;
var Y4 = 9.3995571136474609375e-1;
var Y5 = 9.8362827301025390625e-1;


// MAIN //

/**
* Evaluates the inverse error function.
*
* ## Method
*
* 1.  For \\(|x| \leq 0.5\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = x(x+10)(\mathrm{Y} + \operatorname{R}(x))
*     ```
*
*     where \\(Y\\) is a constant and \\(\operatorname{R}(x)\\) is optimized for a low absolute error compared to \\(|Y|\\).
*
*     <!-- <note> -->
*
*     Max error \\(2.001849\mbox{e-}18\\). Maximum deviation found (error term at infinite precision) \\(8.030\mbox{e-}21\\).
*
*     <!-- </note> -->
*
* 2.  For \\(0.5 > 1-|x| \geq 0\\), we evaluate the inverse error function using the rational approximation
*
*     ```tex
*     \operatorname{erf^{-1}} = \frac{\sqrt{-2 \cdot \ln(1-x)}}{\mathrm{Y} + \operatorname{R}(1-x)}
*     ```
*
*     where \\(Y\\) is a constant, and \\(\operatorname{R}(q)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Max error \\(7.403372\mbox{e-}17\\). Maximum deviation found (error term at infinite precision) \\(4.811\mbox{e-}20\\).
*
*     <!-- </note> -->
*
* 3.  For \\(1-|x| < 0.25\\), we have a series of rational approximations all of the general form
*
*     ```tex
*     p = \sqrt{-\ln(1-x)}
*     ```
*
*     Accordingly, the result is given by
*
*     ```tex
*     \operatorname{erf^{-1}}(x) = p(\mathrm{Y} + \operatorname{R}(p-B))
*     ```
*
*     where \\(Y\\) is a constant, \\(B\\) is the lowest value of \\(p\\) for which the approximation is valid, and \\(\operatorname{R}(x-B)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*     <!-- <note> -->
*
*     Almost all code will only go through the first or maybe second approximation.  After that we are dealing with very small input values.
*
*     -   If \\(p < 3\\), max error \\(1.089051\mbox{e-}20\\).
*     -   If \\(p < 6\\), max error \\(8.389174\mbox{e-}21\\).
*     -   If \\(p < 18\\), max error \\(1.481312\mbox{e-}19\\).
*     -   If \\(p < 44\\), max error \\(5.697761\mbox{e-}20\\).
*     -   If \\(p \geq 44\\), max error \\(1.279746\mbox{e-}20\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     The Boost library can accommodate \\(80\\) and \\(128\\) bit long doubles. JavaScript only supports a \\(64\\) bit double (IEEE 754). Accordingly, the smallest \\(p\\) (in JavaScript at the time of this writing) is \\(\sqrt{-\ln(\sim5\mbox{e-}324)} = 27.284429111150214\\).
*
*     <!-- </note> -->
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfinv( 0.5 );
* // returns ~0.4769
*
* @example
* var y = erfinv( 0.8 );
* // returns ~0.9062
*
* @example
* var y = erfinv( 0.0 );
* // returns 0.0
*
* @example
* var y = erfinv( -0.0 );
* // returns -0.0
*
* @example
* var y = erfinv( -1.0 );
* // returns -Infinity
*
* @example
* var y = erfinv( 1.0 );
* // returns Infinity
*
* @example
* var y = erfinv( NaN );
* // returns NaN
*/
function erfinv( x ) {
	var sign;
	var ax;
	var qs;
	var q;
	var g;
	var r;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: 1
	if ( x === 1.0 ) {
		return PINF;
	}
	// Special case: -1
	if ( x === -1.0 ) {
		return NINF;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return x;
	}
	// Special case: |x| > 1 (range error)
	if ( x > 1.0 || x < -1.0 ) {
		return NaN;
	}
	// Argument reduction (reduce to interval [0,1]). If `x` is negative, we can safely negate the value, taking advantage of the error function being an odd function; i.e., `erf(-x) = -erf(x)`.
	if ( x < 0.0 ) {
		sign = -1.0;
		ax = -x;
	} else {
		sign = 1.0;
		ax = x;
	}
	q = 1.0 - ax;

	// |x| <= 0.5
	if ( ax <= 0.5 ) {
		g = ax * ( ax + 10.0 );
		r = rationalFcnR1( ax );
		return sign * ( (g*Y1) + (g*r) );
	}
	// 1-|x| >= 0.25
	if ( q >= 0.25 ) {
		g = sqrt( -2.0 * ln(q) );
		q -= 0.25;
		r = rationalFcnR2( q );
		return sign * ( g / (Y2+r) );
	}
	q = sqrt( -ln( q ) );

	// q < 3
	if ( q < 3.0 ) {
		qs = q - 1.125;
		r = rationalFcnR3( qs );
		return sign * ( (Y3*q) + (r*q) );
	}
	// q < 6
	if ( q < 6.0 ) {
		qs = q - 3.0;
		r = rationalFcnR4( qs );
		return sign * ( (Y4*q) + (r*q) );
	}
	// q < 18
	qs = q - 6.0;
	r = rationalFcnR5( qs );
	return sign * ( (Y5*q) + (r*q) );
}


// EXPORTS //

module.exports = erfinv;

},{"./rational_p1q1.js":66,"./rational_p2q2.js":67,"./rational_p3q3.js":68,"./rational_p4q4.js":69,"./rational_p5q5.js":70,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/ln":79,"@stdlib/math/base/special/sqrt":83}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the inverse error function.
*
* @module @stdlib/math/base/special/erfinv
*
* @example
* var erfinv = require( '@stdlib/math/base/special/erfinv' );
*
* var y = erfinv( 0.5 );
* // returns ~0.4769
*
* y = erfinv( 0.8 );
* // returns ~0.9062
*
* y = erfinv( 0.0 );
* // returns 0.0
*
* y = erfinv( -0.0 );
* // returns -0.0
*
* y = erfinv( -1.0 );
* // returns -Infinity
*
* y = erfinv( 1.0 );
* // returns Infinity
*
* y = erfinv( NaN );
* // returns NaN
*/

// MODULES //

var erfinv = require( './erfinv.js' );


// EXPORTS //

module.exports = erfinv;

},{"./erfinv.js":64}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.0005087819496582806;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0005087819496582806 + (x * (-0.008368748197417368 + (x * (0.03348066254097446 + (x * (-0.012692614766297404 + (x * (-0.03656379714117627 + (x * (0.02198786811111689 + (x * (0.008226878746769157 + (x * (-0.005387729650712429 + (x * (0.0 + (x * 0.0))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-0.9700050433032906 + (x * (-1.5657455823417585 + (x * (1.5622155839842302 + (x * (0.662328840472003 + (x * (-0.7122890234154284 + (x * (-0.05273963823400997 + (x * (0.07952836873415717 + (x * (-0.0023339375937419 + (x * 0.0008862163904564247))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0 + (x * (-0.005387729650712429 + (x * (0.008226878746769157 + (x * (0.02198786811111689 + (x * (-0.03656379714117627 + (x * (-0.012692614766297404 + (x * (0.03348066254097446 + (x * (-0.008368748197417368 + (x * -0.0005087819496582806))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0008862163904564247 + (x * (-0.0023339375937419 + (x * (0.07952836873415717 + (x * (-0.05273963823400997 + (x * (-0.7122890234154284 + (x * (0.662328840472003 + (x * (1.5622155839842302 + (x * (-1.5657455823417585 + (x * (-0.9700050433032906 + (x * 1.0))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.20243350835593876;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.20243350835593876 + (x * (0.10526468069939171 + (x * (8.3705032834312 + (x * (17.644729840837403 + (x * (-18.851064805871424 + (x * (-44.6382324441787 + (x * (17.445385985570866 + (x * (21.12946554483405 + (x * -3.6719225470772936))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (6.242641248542475 + (x * (3.971343795334387 + (x * (-28.66081804998 + (x * (-20.14326346804852 + (x * (48.560921310873994 + (x * (10.826866735546016 + (x * (-22.643693341313973 + (x * 1.7211476576120028))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -3.6719225470772936 + (x * (21.12946554483405 + (x * (17.445385985570866 + (x * (-44.6382324441787 + (x * (-18.851064805871424 + (x * (17.644729840837403 + (x * (8.3705032834312 + (x * (0.10526468069939171 + (x * -0.20243350835593876))))))))))))))); // eslint-disable-line max-len
		s2 = 1.7211476576120028 + (x * (-22.643693341313973 + (x * (10.826866735546016 + (x * (48.560921310873994 + (x * (-20.14326346804852 + (x * (-28.66081804998 + (x * (3.971343795334387 + (x * (6.242641248542475 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.1311027816799519;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.1311027816799519 + (x * (-0.16379404719331705 + (x * (0.11703015634199525 + (x * (0.38707973897260434 + (x * (0.3377855389120359 + (x * (0.14286953440815717 + (x * (0.029015791000532906 + (x * (0.0021455899538880526 + (x * (-6.794655751811263e-7 + (x * (2.8522533178221704e-8 + (x * -6.81149956853777e-10))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (3.4662540724256723 + (x * (5.381683457070069 + (x * (4.778465929458438 + (x * (2.5930192162362027 + (x * (0.848854343457902 + (x * (0.15226433829533179 + (x * (0.011059242293464892 + (x * (0.0 + (x * (0.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -6.81149956853777e-10 + (x * (2.8522533178221704e-8 + (x * (-6.794655751811263e-7 + (x * (0.0021455899538880526 + (x * (0.029015791000532906 + (x * (0.14286953440815717 + (x * (0.3377855389120359 + (x * (0.38707973897260434 + (x * (0.11703015634199525 + (x * (-0.16379404719331705 + (x * -0.1311027816799519))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.0 + (x * (0.011059242293464892 + (x * (0.15226433829533179 + (x * (0.848854343457902 + (x * (2.5930192162362027 + (x * (4.778465929458438 + (x * (5.381683457070069 + (x * (3.4662540724256723 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.0350353787183178;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.0350353787183178 + (x * (-0.0022242652921344794 + (x * (0.018557330651423107 + (x * (0.009508047013259196 + (x * (0.0018712349281955923 + (x * (0.00015754461742496055 + (x * (0.00000460469890584318 + (x * (-2.304047769118826e-10 + (x * 2.6633922742578204e-12))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (1.3653349817554064 + (x * (0.7620591645536234 + (x * (0.22009110576413124 + (x * (0.03415891436709477 + (x * (0.00263861676657016 + (x * (0.00007646752923027944 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 2.6633922742578204e-12 + (x * (-2.304047769118826e-10 + (x * (0.00000460469890584318 + (x * (0.00015754461742496055 + (x * (0.0018712349281955923 + (x * (0.009508047013259196 + (x * (0.018557330651423107 + (x * (-0.0022242652921344794 + (x * -0.0350353787183178))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (0.00007646752923027944 + (x * (0.00263861676657016 + (x * (0.03415891436709477 + (x * (0.22009110576413124 + (x * (0.7620591645536234 + (x * (1.3653349817554064 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.016743100507663373;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.016743100507663373 + (x * (-0.0011295143874558028 + (x * (0.001056288621524929 + (x * (0.00020938631748758808 + (x * (0.000014962478375834237 + (x * (4.4969678992770644e-7 + (x * (4.625961635228786e-9 + (x * (-2.811287356288318e-14 + (x * 9.905570997331033e-17))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.5914293448864175 + (x * (0.1381518657490833 + (x * (0.016074608709367652 + (x * (0.0009640118070051656 + (x * (0.000027533547476472603 + (x * (2.82243172016108e-7 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 9.905570997331033e-17 + (x * (-2.811287356288318e-14 + (x * (4.625961635228786e-9 + (x * (4.4969678992770644e-7 + (x * (0.000014962478375834237 + (x * (0.00020938631748758808 + (x * (0.001056288621524929 + (x * (-0.0011295143874558028 + (x * -0.016743100507663373))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (0.0 + (x * (2.82243172016108e-7 + (x * (0.000027533547476472603 + (x * (0.0009640118070051656 + (x * (0.016074608709367652 + (x * (0.1381518657490833 + (x * (0.5914293448864175 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

},{"./expmulti.js":72,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":85}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":74,"@stdlib/math/base/special/ldexp":77}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":71}],74:[function(require,module,exports){
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

},{"./main.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":78}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":62,"@stdlib/number/float64/base/exponent":89,"@stdlib/number/float64/base/from-words":91,"@stdlib/number/float64/base/normalize":97,"@stdlib/number/float64/base/to-words":103}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


// MAIN //

/**
* Evaluates the natural logarithm.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":81,"./polyval_q.js":82,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":48,"@stdlib/math/base/assert/is-nan":56,"@stdlib/number/float64/base/get-high-word":95,"@stdlib/number/float64/base/set-high-word":101}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":60,"@stdlib/math/base/special/floor":75}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":88}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":95}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":93}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":92,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":94,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":50,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58}],100:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":94}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":102}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":100,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":105}],104:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":92}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":104,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the quantile function of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the quantile function
*
* @example
* var quantile = factory( 5.0 );
*
* var y = quantile( 0.3 );
* // returns 5.0
*
* y = quantile( 0.1 );
* // returns 5.0
*
* y = quantile( 1.1 );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function of a degenerate distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.5 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/utils/constant-function":136}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution quantile function.
*
* @module @stdlib/stats/base/dists/degenerate/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/degenerate/quantile' );
*
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
*
* var quantile = factory( 10.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":107,"./quantile.js":109,"@stdlib/utils/define-nonenumerable-read-only-property":137}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Evaluates the quantile function for a degenerate distribution centered at `mu`.
*
* @param {Probability} p - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var y = quantile( 0.9, 4.0 );
* // returns 4.0
*
* @example
* var y = quantile( 1.1, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*/
function quantile( p, mu ) {
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return mu;
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":56}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var qnormal = require( '@stdlib/stats/base/dists/normal/quantile' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a lognormal distribution with location parameter `mu` and scale parameter `sigma`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 4.0, 2.0 );
* var y = quantile( 0.5 );
* // returns ~54.598
*
* y = quantile( 0.8 );
* // returns ~293.901
*/
function factory( mu, sigma ) {
	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma <= 0.0
	) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a lognormal distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return exp( mu + (sigma * qnormal( p, 0.0, 1.0 )) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":73,"@stdlib/stats/base/dists/normal/quantile":120,"@stdlib/utils/constant-function":136}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the quantile function for a lognormal distribution.
*
* @module @stdlib/stats/base/dists/lognormal/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/lognormal/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~2.32
*
* y = quantile( 0.5, 4.0, 2.0 );
* // returns ~54.598
*
* var myquantile = quantile.factory( 4.0, 2.0 );
*
* y = myquantile( 0.2 );
* // returns ~10.143
*
* y = myquantile( 0.8 );
* // returns ~293.901
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":110,"./quantile.js":112,"@stdlib/utils/define-nonenumerable-read-only-property":137}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var qnormal = require( '@stdlib/stats/base/dists/normal/quantile' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Evaluates the quantile function for a lognormal distribution with location parameter `mu` and scale parameter `sigma` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~2.32
*
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~54.598
*
* @example
* var y = quantile( 1.1, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = quantile( 0.5, 0.0, -1.0 );
* // returns NaN
*/
function quantile( p, mu, sigma ) {
	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		isnan( p ) ||
		sigma <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	return exp( mu + (sigma * qnormal( p, 0.0, 1.0 )) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":73,"@stdlib/stats/base/dists/normal/quantile":120}],113:[function(require,module,exports){
module.exports={"sigma":[8.024282662228952,14.231522173089747,11.40792613591362,12.797405320478262,10.982509003890165,13.91035590258609,17.364710526187874,11.47293632334586,0.5068449331867431,1.6767523824349162,13.089614991735147,12.281456472770941,13.90955781378716,14.529107145121953,12.950077869002733,4.577699257921326,4.209122033599635,16.42874403426509,17.919065563475417,5.83595430259277,17.56638001842056,17.969781175941037,19.968639521391466,1.3828714886764937,4.04761841124424,4.975300909360669,3.4270290593801356,19.251449746738942,19.512104768383736,14.611654657237994,5.107378846455424,18.050357891420077,6.485377410068214,15.47372533001797,2.6445537349779524,10.270061469958325,7.193366913107857,2.3680113142614845,9.766288303054026,12.752735086875875,6.54848764951216,1.21628803481316,13.218829656960619,19.25769102409811,9.842703216161265,0.13856242781236539,17.208757902298434,5.3540227232613935,4.275078967273709,7.72930821486383,0.3785903212632169,17.578033641339744,1.2333013942859639,15.780094848780175,13.906883536920018,4.649751445909138,16.208185595713445,4.155068748605575,16.740476719397826,17.1503474577355,11.46246519009399,18.531436267661356,0.7917258982562325,12.301803375907912,7.688434983825498,2.071480510864676,19.36363975142147,0.597294873328007,0.28882608201470816,10.849319461527687,1.8744618415659042,12.589327826074337,6.792582403778162,13.263665708142977,7.946316852808222,7.981338322600413,6.875960619577444,6.0148320445042724,11.747014399667549,15.135612292583893,9.904111839027788,4.771240398337646,18.03585409247972,8.158711889827241,5.4619837607679145,13.324709086359388,17.186134878241223,14.19414845976938,6.0236407092429545,11.93612414671688,11.339091808052114,7.468093883073879,17.810483920383025,8.013736322587736,15.009961972876077,18.03129002880263,17.739240448877716,6.30064214869245,16.832742954238725,3.3698555767364713,0.3138869986642634,9.030098245433425,3.4895072679366246,10.66889620813392,4.378097981423972,3.334239773388772,19.27680892296985,0.4728694972793557,5.193847840365695,12.412753656827217,10.044504006634721,15.739811441982642,5.547224706369471,17.289797131946454,8.445368737883365,11.52475615904705,12.388322344955004,5.651169891332581,15.485017356512461,5.099646312574886,8.853796036271246,12.493153063968133,10.027782510899419,15.747164021089418,6.448738176961308,13.880892264675179,6.1228290026334475,12.876276009382401,15.709294091987278,13.441153103427554,12.677461119670346,4.947765337814962,2.8867859272045893,13.08153029675215,16.047111547602,17.226449901578672,18.80767654756159,1.565790263384037,14.503708021144583,19.589899146654215,18.82171230304095,17.564298277473927,5.4049525437413015,18.739158793081096,7.183371221880437,3.24556515435368,2.1397929930502446,16.430728526974747,18.367778144360262,2.858665087603436,3.8989666986207183,17.901391893177202,0.5976771906185885,17.851981005691858,17.733829076752453,9.72027967001409,10.487268490769889,7.08331521942779,15.661088415994428,10.185629956946297,1.8923887202203193,10.841412950211717,7.090976606110919,19.262693160077944,5.6322286501994245,15.175800137641179,11.289054772679986,16.28068811662449,14.438919968946461,7.942881001402831,19.352576663418766,15.997700507891825,18.489363668184183,16.312595990129704,17.40352564760569,2.831971187355533,16.662238045508953,7.038584330497186,1.8763483565466954,0.21921044798834277,16.683885098900188,6.934504077079131,14.118305958379228,1.1229193047758157,18.87621260162586,18.93570427556979,14.858163322978552,6.523957566646232,2.6476587284678743,7.41040347844359,8.454912004278974,19.899514813090875,2.2138875722694396,17.499754480035858,15.964034622046652,7.701069392080431,3.0111494173920272,0.7364214884355036,18.466533059563353,11.901596445527263,4.567332456467543,7.266203483211182,2.823222150605793,12.63955792055599,16.736001475820302,18.526801002570686,12.311207994663235,13.434249469205511,5.369025325078098,16.872560251470127,14.49586224143732,9.515493597944795,19.220920461729545,14.82141345891626,1.4107269282706936,5.4206021289153306,15.178789229650693,14.845360688825417,6.645150895404863,3.0270172066105694,10.797139000377086,19.050624788008896,8.747080126190685,19.465686926253767,11.36861164267222,14.265642183713275,11.265886940272992,7.8579659934836465,5.2315682315187795,5.956421813191675,2.0454265145010853,9.749960694373318,9.920532769578841,13.592474170134437,15.216169889491233,14.664765267091893,17.094370915249776,11.742191842219603,16.919174919081158,17.741605393164768,7.265629440222194,17.595984095687058,19.078786571017044,10.318624808235924,11.962051529088868,5.4206186637983755,6.058878359931992,11.687823111380728,10.698642464713156,17.5483611550129,19.066240281959004,1.0643265958854986,0.07133455598780536,0.3369975851907636,16.218623475476438,9.27298907457656,10.923166773815339,16.334639844800538,4.4967741559583985,8.159808864011652,7.860739670904748,4.427456262554448,17.344114955936554,0.13108337982714158,2.908746258561292,12.547452129734262,9.000531336341604,9.471186930433166,17.19932291914838,5.037393432996797,18.965422934182286,4.42809943272831,19.164075063469106,6.390674262550506,12.316994047604567,11.529928660201962,17.50008104519397,3.590094712726555,5.761375001554514,4.193051527244824,9.979726481387537,16.29476297392126,0.7472592414432544,10.948197926472591,6.8161278982037565,14.287985741147825,11.768176069119797,9.319905396844819,2.9912902143261944,18.008787163841312,15.55667044587912,16.58010829334721,6.812658853550135,0.4195448959415815,11.502388930309046,5.519833820529203,13.343129471782781,3.414336934020872,6.633393477360783,7.197516195810554,12.92275882483822,5.40138983703784,1.8170548011122234,7.700905402266005,11.162505780308747,15.764840584339307,11.923165810459228,12.827250391286631,8.316223046088274,17.354502229442442,5.953548682258538,9.852851644565131,13.688748590303938,15.816815739144229,18.287445223884017,15.511322688070553,5.051447360676855,19.29866759301126,2.2178429110285247,16.558455441178673,13.887764506586118,4.960987733565276,0.8814528594856474,0.3916842702088763,19.260748268711367,1.6929472010098712,19.778760282683926,19.167034232133982,18.03037081160867,13.677383722838815,4.743588056836621,4.205885602669457,1.1028351553255922,3.524133665206799,2.809872467211214,7.011552208937379,17.13524947254882,1.4787145848113603,11.567377325034451,15.639512898132848,1.1290727139669565,6.384983749501814,6.1973956967292265,13.166599907284816,12.973823909760306,17.919609351927022,18.73437284449208,8.369662094793181,10.350748124699471,2.6183127797653993,13.37265002284672,11.237885279145686,2.629868118500336,7.127908964732468,2.555486713669768,3.593531580376861,10.637032981765042,18.6324410632282,1.8516066801476327,1.4476549260825333,0.5223974039408352,0.3921920167886839,5.474675793959394,9.606142168850717,5.310955420774124,17.11280456379985,15.672610059457174,9.120617347700932,2.324055031858965,10.540598640368554,1.149372754366036,10.575604538645296,1.7658806902274637,0.8380114695179364,9.514285206089577,14.553804215908945,8.331087603006972,15.596718183600892,2.3107539107610675,13.854722066268002,12.609951842157422,14.442533598797862,9.598242198222335,11.31532045838101,3.4923146033675545,16.07979802050523,13.024264080223379,15.69728926278029,4.769195368527819,0.7909222505447167,19.42330873767215,8.728847093215645,7.99617781863903,11.019880495098814,3.569724573355866,7.006870271043408,12.455343544972957,9.558032566114786,17.3066547350999,5.5251225509130775,5.837490005128081,6.445300511592906,9.176926606127749,0.43223647012421207,10.158414723864958,17.872085919739085,1.164189280887462,13.617659527662202,1.8295677495993434,14.181323726162915,8.01780190102512,17.479239234940014,18.11048753204398,18.181600173155136,10.349443336148063,8.155662620853295,13.843948696230095,16.412922719491693,14.737155277674985,1.6832421748648807,10.639052710267682,6.2108103946583615,15.280753907880014,12.152354006983686,9.776631106693667,1.1507124621335985,8.443484022397122,13.790799677231199,13.62534078350663,9.236119302329868,16.566616325078343,6.540346822145633,1.1123613225540963,0.34348975210173105,7.9353790275584934,14.286901757164179,6.554551323936426,16.85248063023932,19.252356893706857,4.970263348610469,18.191293925313964,5.497067883025384,18.153005752190655,1.0971125562777884,1.7591397410697818,0.9506360075997966,1.2336148431414573,9.604733734542737,0.8992174776708417,18.422417439889408,7.316451803572863,0.17249717817479748,15.12570213711518,6.095892368876292,10.30075238026837,18.00061778678149,10.982879347010538,5.779328277432918,1.0875967289305999,10.580539878131017,2.093076411289765,9.260289683775271,2.4021177968577234,7.2645928953356265,8.268167352498308,19.98607277339653,14.426273008682857,14.342843918718323,17.96490517586347,10.171034073489341,9.50164898315419,10.870023691129749,17.165184280417314,7.29003133674802,19.059436044618693,0.2070586891782522,8.832165658962982,15.481580874123765,3.382503128051697,0.05252558013771225,0.2512120806089424,10.931250534321006,16.285700853761277,5.501352908395156,1.9267389856636807,1.4276115380106535,12.582931985296359,14.827860672989566,5.993691816227349,16.97286718634666,0.32635776810197026,19.38054602698198,16.672544292996058,13.62118684692092,15.221671864915916,16.98406858922926,15.163361919507295,10.249904906846204,5.85933894756439,6.856957633100831,14.55482300660881,6.285226159487434,16.06075376238305,6.354345530664465,18.473763644597327,5.470554755417916,16.26573882097297,12.641921589634585,18.852043611701884,14.413426356948783,6.965015703371473,13.486002481235545,7.623744455652974,13.978116051032842,5.1569300874550095,17.652864399002667,1.0936238072547333,11.918050071615948,7.245915075382685,2.897647398776586,0.903148711124877,8.881473586176401,0.36172015754692755,9.309744249756928,11.608684939174658,14.779352058305225,9.783348953538674,6.5954116739446,17.637464695687697,7.628384805097732,18.54767536161394,3.2496190014844384,7.207097985369781,10.33636646699982,16.665417001578774,1.5941582837539636,18.55910625492317,12.616501582914012,19.496635190098388,0.06667713090506844,12.134295030891327,12.269782779307592,12.117805371284804,2.1900926971761825,7.397273477274271,5.943033902744972,12.091088497477593,2.80337086469729,14.886895968871228,5.35241338174576,12.386907045685213,10.549832044270172,11.18135793697693,6.973392898058126,15.976250402845054,17.04910625544727,1.3459561977984524,11.835485555963965,3.219633880523163,18.7774885125138,8.534731314905768,19.692708293801168,6.409968641236232,0.9586400292957542,17.759807391745625,0.913300277199034,0.26471526528184963,1.0149441318533414,4.239668122086604,15.7846045091183,10.929863799847785,16.9747939302329,18.057694144772647,14.859024368567484,16.218875525477475,18.372622511829345,12.331609721905012,10.694887818958874,6.2298700397793105,12.122363012307517,10.13689507579869,15.432233571756498,7.086905607132592,15.266215331632097,4.950397640469948,17.013378935126667,17.376877273306537,13.621407326267366,6.233212325825357,2.37570390347118,17.47114835322828,18.438777558062647,9.768669273433765,8.830843138580086,2.2546980949336026,7.383328618633924,2.4227042178703373,18.699658433372353,6.728852764577002,11.262508205158529,18.194275189137045,17.7330611424893,18.85943959411234,5.147168980271584,8.324275394884403,8.630751049911428,17.28601735821762,18.702780834496654,15.450404475311839,7.579809434845579,17.91829284847063,16.69350702089144,18.216743022029274,14.814352768312462,18.71404709997668,18.660068292620153,5.294578768821583,8.590147281839746,1.6312267949331805,2.9940977333224694,16.300216957474984,0.1341073646856783,5.091960219633793,5.701619624181746,6.9055185203320235,14.19417598308787,15.263881069646455,13.071566091444385,15.77925294246064,2.09413527783886,17.001740283339405,8.592674653878195,8.83616276694751,4.38248722881291,15.326100536864761,14.885684654372273,5.285837059101373,7.286437421826943,10.57041276534215,19.138546921829516,1.3203611668055348,4.821466162513146,18.930291571403203,16.127818165459335,15.92736017382677,9.606561660520336,16.109739162427324,3.7985896231018845,17.8535159285938,3.13754443423524,10.665529006089418,9.635703630565796,16.636997476756363,13.33995443084155,6.891149976471254,1.448743024763961,12.797480604021843,4.282321916511562,4.884282726908329,16.717388449411658,11.399515105953633,14.436783095383458,2.320953634248375,4.520003985858652,12.375204557517767,19.227944897442736,13.137290614199696,15.05472144319051,19.7953879198433,0.29378804230340005,11.849353642057663,14.45070733449629,12.054639074312362,8.120982279726148,2.462998214296679,6.707257850925203,1.5451222643297546,16.34049108623295,12.381068659894714,11.328475993774312,9.920548908827143,4.310406103776558,17.992494765142318,11.16900336380426,8.77589073477463,0.18468038191449043,3.080638731768972,9.617395156993345,15.748257058886779,19.472405403424943,9.4520551825746,17.609502291540156,13.732550774001876,12.178972749369525,2.694770722878137,15.300109255695876,6.920931686228977,3.652699983093357,0.01912878005931873,10.044000384322192,16.96641912917274,2.1930447295171263,5.751016602840187,6.058551138160815,4.5802801056020215,0.7139057192809162,8.479237583316635,13.74228418728845,19.145915704905207,11.533404864020147,7.554399803687897,4.811782838698062,17.63482386830251,5.933782818652484,18.95431744555507,12.7778942593212,14.453563055472012,15.383340597873687,16.85667215299337,0.9516484894511512,5.0781265536654185,6.616450759085573,9.865558080342453,18.297377705202187,18.578878103590153,6.924306415239698,10.046152918170526,6.62273950539257,19.508131530411315,16.078815968273314,12.110441591367254,19.915346618443497,10.035747542755304,1.4320239030894566,4.0738788487708755,13.07332087405095,9.74466264444693,10.734141944205916,6.78240834262986,3.3465325156319103,13.301351263399535,13.458946342147566,9.083223518490623,6.279012522880869,13.417503850644605,7.552134798865784,18.12102289286786,2.007068236080327,2.065128306634798,18.148460755570955,8.62457154073212,8.442629949170502,6.827580506403597,18.4482355135613,6.288040244027249,13.790009717189733,6.600432935745397,7.967906940983958,1.2452884185394275,14.085259683012898,19.804158245440963,19.103941128364177,9.301978976867652,17.925542220061907,2.686415851296693,2.4385206065887477,17.13980365874273,5.321151360198493,6.606728292238908,5.002773083675343,4.420204351628874,7.781555276764842,6.731401190905242,1.2612078040037211,1.916875333895045,19.529474751423656,10.859541443396544,0.9362780953062977,5.126306318029865,11.032594663515166,15.89336567776975,16.563585296554628,4.4153851023197355,14.860506122807035,19.262068846380895,19.895325627582142,11.506838139618916,13.665188621824651,6.921663793838242,2.8269128225715967,19.50542639660818,8.526079795209265,19.32445046409778,7.6601883388816105,8.525810078323497,7.3217832274036265,11.381913199288585,6.744023284688012,9.990283586271449,13.065174566876436,15.131346349382486,10.282328768625405,3.9167123389256453,1.9850831135233848,11.655633898017243,7.4721297501552675,0.7436090582548305,8.388076492959456,18.973221991544605,16.990128529139806,15.795472385293717,11.464275688929867,6.1368405448349606,17.54384414811024,16.16553637613688,14.370102447991924,14.79624247171599,12.324993896773794,6.25555564707013,17.521796974891366,15.395813995879246,2.4712876249218274,2.902880850984677,6.025342161284679,15.225784903355347,4.612181929559123,15.132257619203635,7.1365049122487445,4.9147735775628565,19.009358690751853,14.411637457203144,7.195040577360841,4.748922093327899,2.989593218047051,0.9592993534728267,16.116067369617436,6.657413158521668,11.821021334171494,18.2024930534861,14.700289951541547,17.44664139451885,0.0833071259233531,7.098712657809312,12.414948728594393,9.146805912923334,0.6868638718321529,2.6340684476370457,6.372292609197259,13.379646669623213,7.701566498901711,11.723882404547709,5.3816560460444585,17.77201892927705,4.7266095745305625,4.846650214970496,18.62922992137453,19.74097706938316,16.191699663835962,14.684434954602805,3.1531064414395793,12.544773107796141,13.37749093291726,16.499130133477156,16.181893340920766,12.419935989806774,8.442283298448068,17.26371176930961,14.162375251947154,12.041403260663873,0.9854178124969115,11.92907704938956,1.2290514422998644,15.329071141621075,14.932431092012921,19.278049742775302,6.143532625129402,2.846248449610984,10.144203705409684,3.5499202843573974,2.270972613747868,0.27832498557665897,14.230178210750735,15.065616217671272,17.096884526727592,16.034497378223858,19.558157358564404,0.7980614513598372,13.605393359251789,13.990468297980104,8.132685718884861,1.5095367496519474,8.580707360703371,3.9876857774550523,12.318100853685635,4.697024377088117,2.1961579493876293,2.3392998955884003,1.6711771089054617,5.604705782772976,19.09638615685981,16.789572358027698,3.976394221266144,19.203692527669226,16.354146168911136,2.920504942498683,9.276809099389487,13.31330440474602,18.404631983420245,7.654480569978719,5.176605804983385,0.7585192207389113,3.709371235827965,8.362442846311398,15.43202172043725,18.12921651930276,4.382440889982049,1.9846861111718894,6.325220114108059,1.4141967301767844,10.629905871576879,18.416445095723823,11.22516924502694,15.785319578497177,14.015604735044356,14.64169881214119,8.334372543966161,19.63695961558084,6.970916177367843,2.711306659759436,14.50739147609613,0.8247014624489468,1.3838171880796857,6.526190883805247,10.621400614992499,6.7128292833580705,8.760508324229281,7.7369797083559355,4.218866175249696,2.201507920023835,2.880913096259383,19.007940167455658,7.687417745581118,12.946799362357083,3.3631072139530094,19.164549607882808,19.727860316286737,9.912625259265809,12.590159195438627,10.439196197759388,3.7366364787500794,19.267507510533974,1.7668119585250563,11.993267896880319,4.436188257931866,8.646183100338147,8.511631599776281,10.035215069583533,19.347288931179868,0.2808704723461908,3.1084502293039185,13.02224468315253,2.62203682736883,8.066734014974255,9.49925401225935,1.711964279963949,3.3301461658546216,10.39021153752843,5.757232432628876,11.190801005948376,7.2424752204903164,4.522944024902853,18.615396004807945,9.849837065161434,11.66525130143286,14.8117447661471,11.417203185378973,13.412859590900453,14.187151600123688,9.95504188283157,0.24466667247096563,11.58356267353922,10.98032959883255,2.629251751069277,9.933470406110366,0.26919727866256515,5.947445602174026,10.643510668402008,12.747149142503558,13.597319693859365,14.512684258374723,9.350781205479159,1.6668183187185281,1.629559765662898,11.99452972419953,16.19651042577358,8.812706187529855,16.769474559479846,3.863155689200366,5.459907388284053,10.630482483325089],"expected":[250.7936228226978,6.797674269691359e14,13.823284061036233,2.1781283398623035e-8,953219.5530632467,16437.307025593676,21.81978628860407,7.930162744337797e-8,2.2128167921180504,0.9635084496916059,0.017605408141408027,0.35968481907685257,0.000845618305236414,1.8917199020517717e-7,1.1036887886523225e6,0.5631590902790357,2069.478065227519,0.1695040507585593,2.6046099625209198e11,1.5196225666088843,1.9256433306702867e6,233.2491456358724,5926.720347989616,2.282899168223491,0.6011464501839487,0.032830814725476054,45.164678073044975,7.043369277056472e6,5.5447106688774285e-9,2.2341857890956247e-5,8571.174137442284,3.356290641682066e9,0.18592564391181934,122.82715584906137,17.304327089019637,0.2999705981499856,4279.180500378536,3.156463322024093,265.5779773713122,2.941281035142423e-6,55381.95588609804,0.3319560876265417,0.5122845513154587,0.0006920474051744091,24314.54144564158,3.444364020983186,0.6750175401344847,2.0807460361939296,10.408396467255299,2.1374941870224923e-7,0.9088211248126373,8.084291959490147e-5,1.3346156701417797,1.1945419852842953e-7,1.0492239416340469e13,0.029672147227622334,0.5375871027716097,82.16028284301049,1.4882140924595097e8,261581.92435419385,1.607260753579307e6,325345.68096270744,1.0232268940298201,4.890205599033111,0.00508739306531014,1.9560645363889744,6.819796297319566e-6,4.960874408687377,1.794402286285838,1.0792611877128382e-7,27.42747740142095,4.189623495515783e9,64193.92666924815,3040.597426323021,454474.080554661,0.9341353715037155,0.0007575507268052085,244.43616242548748,0.22598249492005007,85.97835318352989,11.413504210540534,4347.9143751633765,1704.0746674687248,184.72724135409243,0.10898126396352117,1.8923080099823608,1.153705184564878e6,0.27660488643359366,0.04421188387428023,6.924585665853614e6,3.2691509616838315e-8,1.2519573930508034,178494.78758399657,38.88866352469546,1.4723900730505248,7.320620416910054e-6,4.5102915093829315e-7,50.31720700762196,0.058195137912320914,7.6937880887838785,2.2755536727426917,91712.40051219997,0.21415624406987102,0.0001873838268114455,0.005769740881490782,199.67157853714733,1.6284406482652402e-7,1.7528618717233,0.016074018145091806,6.433515181466983e-15,13950.306688741479,6.521629216939976e9,60.145409529990665,1.0664744221213914e11,0.002247952170374872,48118.30818652568,2.603059774139565,0.41409407120485964,4.869014489034299e-9,1.6991986801699794,886.7058462611419,2.403404227715451e6,1.4949696124050748e8,0.0004741056805018907,151.26734470074075,2.123832919442524,2.6323857205864042e-5,5.68221836013766e-12,151.7669731354216,5.6448481735302066e-5,2.4948379774061712e-14,0.00028525528415586403,0.01045371522683648,0.8848493686361169,774286.6507394015,0.00014910452863972694,0.00011475016068964036,0.3969861271340066,1.4695482630333135e-7,4.81128425877752e-6,33885.438760567355,6.388043690790999e-11,0.0033024076851521675,0.0006066699913645377,9.90997851125467e-7,97.35780810185989,0.34813272396269346,4.756473522211863e6,1.4407890100336162e-10,347.4916717996184,4.138174355041343,4.116723453495438e-14,2.2943580642645394,0.00013538931055519772,23536.974833348184,0.0019308982476224932,4.2407156217211845,0.013520367787382435,4.1759474042353387e-10,3.118030139872791e-10,1.4081664540080516,187631.773059242,9.259834771526564e-6,7.733655333103148e13,0.6968549642261306,0.00798676669903344,56.285980211637,0.0015287156487458892,2.0791219314486814e-9,1.144176101701574,2.2669312035248398e-14,72052.115996702,148109.70512037736,0.0022087482402929725,8.256679917346144e-7,2.142518244617336,289981.34996791836,2.3213301537687525,0.8320316974705517,1.841719915267804,7.346437793075206e-11,7.676130139236869e6,0.0009033101379058076,10.145889776209305,3.418685046001743e-13,134.56810890948984,4.745198895449297,27.55970851349878,989.0217987121715,1.091234985523701e-6,461.0130913949026,836.7352906116641,7.004598160451527,1.3417268277860975e-10,17358.328662774642,5.353058454013063e-7,331.061030867636,2.0802644803287693,1.604666383215728e6,7.685280977253048e-6,0.7280674836640393,0.00019865602328336622,0.19768439381264555,2.6979394861071235e-7,0.8371227668270418,1.644900009703755e7,0.032067740568361244,6.850354157501519e-5,10086.431417775475,0.1464466012394134,1.3625109796135425e-10,4.606912339129372e-5,9.152011707075686e-13,1.4122982289134164e9,1.0005431555888262,65.43834077263729,1.3863803554025215e-6,3.1098110462456326e-11,3.3752822298657312,0.2998460578516099,0.415586939704957,100.73607601353334,0.006897729581136005,17986.770763716086,61239.805139795644,279379.3134505772,1.204982857585878e-6,0.011116657972396535,0.6519286848292639,1057.1191739567398,13.352954155060127,2052.3411888500837,0.001454122081478362,6.848250370459213e-6,8.388336291091987e-5,1.7743993259674316,860.175925603289,1.3052777874517581e9,97.4953499639803,0.0005937996871085937,39.78911429108723,5.530734600497936e7,8.299293601309003e15,0.0010553078609879143,27540.55766561334,0.14096946532320384,4494.406624951366,0.970314184191722,1.6881515933438357e-5,1.3642283541151376e11,18010.212385269362,2.1118671206697472,1.37848330424563,2.0126665038460803,5201.192488929638,12.299744838385026,0.05662991662403727,0.1501555642042114,0.006112640189917753,4.311971099925277e-6,1.7633758161599047e-9,0.0034772159177404636,26.844396047179323,1.7958159666537998,0.05731110414540704,2.241004559063871e6,0.7735393622661081,6.330184140160136e-5,426.9354389115913,0.06292528609766916,1.2319854724159386e10,276.15491419415474,8.208756314270808e7,0.002352341922931671,8.37179804770498,0.006229341251457467,3.037061986337248e8,0.3651362031430511,0.001050987713485074,43.72538527652428,0.0005499293910729355,2.7834412170505915e-20,0.8234552437917377,5.4167998836135665,0.03900724326427009,93.9834968343081,0.0607969474808495,2.0378733705478125e-5,0.14720062812982881,5.095018806505154,7.152863535516112e-9,4.0398048274515754e-17,30.670247009273325,3.2954099720170973,4.100104510522477e-9,0.010055349127799188,594789.2048462128,0.23810856373073738,7.757754296116853e-7,210.1077824732594,2.106815137081489e-6,77.31186290940225,1.1020706139647167,188.99076588097265,1.5863551757826933e-6,0.005197427344530428,151.67089646143964,15.135137857031967,0.00024746624548267185,1.560991165450436e-11,10436.20591631733,76.71856960542056,1.5411375402700007,19.333769149277163,3.3017066698397375e6,3.6350742543741688e-9,5.965655897352166,7.541486485397623e7,0.043849663508878076,5.894657930928076e9,6.0891942390091626e-5,155.72905998511135,2.2772903546099132,1.2291036555931831,1.0425868175753966e-6,2.263354488678319,319173.64564695605,1.0450073299957443e10,2.9086946716108405e-10,4.9903050672506284e-5,0.45514895339277556,0.9300908098895211,4.79117002480032,12.89018068035288,0.9558744153860177,8.337398823389925,9.291914347152779e-10,0.4125851505815802,0.04883896785034312,0.012700014165903599,3.203852276806635,63.96809848278129,0.013922430651292946,1.7515129988999139,12686.19630125823,2.7833465320094965e-10,1.8582733647235359,296.7882601897313,0.0343523409944555,10.694416580956727,439526.90743993473,2107.7946168262083,0.006467096655953328,0.020950462024172414,0.5848359409751035,0.6296461930468954,182.06455787699235,2.6088152513034526,57.63116483317361,0.5677312387160486,0.850968299070177,2.36476841417341,1.3208549230285598,0.5841365215759837,347.4429413981353,7.328041391762889e-6,229291.9655337885,0.4661015263746736,4.369317704394069,0.07198619711130985,1.6516810978967766,13351.549287477996,0.3216602396383972,1.835264519650105,2.647472157193361e-6,73.36248386550588,435433.05784403026,3.860286554297698,32.52142243104168,8.361074531429368e9,0.0913015113784703,2.284038385377166e11,1.1583639171833085e-5,3.2426040022857035e-7,28.21585821263657,32425.249955430267,1.6547777693354522e-10,1.0810335572523557e7,147.73511616959564,0.44630202710103256,3.66238493355207e7,32.596209595889086,3.379780402964129e-5,0.008088214527217138,0.7702328657612741,0.00013582840778116016,88.00157983720146,60.40013420830154,0.03538105681485728,0.3914230556331499,0.0034957905303188985,1.1172312485939768,282.36572779532486,2.22581429373754,2.5444002421868545e8,3.404177665221651e-8,3.0118600645430633,1.78344526499995e6,0.15656550511762846,2.0377829144951022e8,396796.5952353754,0.01605040492201485,2.605331552817233e-14,4.710235388155376e-6,0.00030082443201420034,3.606706111995489,203.4564620040462,0.030992213545243733,2.2460061302905875e-5,3.736645063041813,0.006399957190058439,0.08043225935194004,2.1022167610297367e-7,0.1456671733826799,1.451459769793475e-12,0.27218952338456437,1.1303523965904135e7,0.00025590291766252433,0.08733018168629023,43.88171940212215,2.1812301050321504e-11,0.0007624135551527945,10.545999369930605,1.9315389679549886,41.60998004537237,2.099200374416739e-6,273897.0821049572,8.327016545648443e-13,0.17758755916746663,0.0727650986926824,5.690812820544098e6,0.00012612830029630874,1.9415751281067157e-15,3.5599400731118402,1.9460951815093532,3.196523422789408,1.8497805829237686,115570.19907433823,16.233109210207807,89595.04879838148,27.38749861059965,2.291680327969247,0.8142857139847178,0.3827309310227769,108330.98811668062,3.5217508835867345e7,3.7114720127761056,3.3877210595684017,0.8668456316171671,1.4039448448002785e-6,0.23064742241910377,2.332287014026187e7,3.189660787389965,0.002271999060046418,1919.3844619547285,2.79231955285685e-12,1.4323160489387738e-5,6025.536508950554,5834.8245905563945,0.00037864329681969655,0.00800233819583491,11556.95392455316,6.352537363652308e14,0.9302110880006529,1.6963491194671288e7,1.258577344203789,7.239286879119476,1.2161215310303066e14,3558.010466958611,1.455480775830175,1.31453170114372,2.437720782538142e-7,3.402818306770524,7571.048437332959,3.062872451054338,3.093415717602894,0.0009504330884848112,0.003700637275191992,0.2948466954508079,0.004271067447542704,2.695478630313452,1.633987483237267e25,0.4101250668780337,0.05732183210904847,0.00040166525401155804,4.704171760409913e9,262.20584387196317,35.07956335652653,0.0005440159156029905,765.5885850522387,5.766612495521631e-9,0.015587965889227664,0.08620430060182985,1186.2865320810115,15.607349438301855,1.3760000762139182,1.3319722112977472e8,7.391047752277901e-6,2.983256515680632e-9,4875.528762410361,13.624417689848816,5.9984347797861624e16,3.254361506308484,1.2646053636377388e10,1.750875299458033,1.7780323926099926e7,0.7697705026387904,1.4027013705309436e-8,2.3818339292059314e7,38.679217839668596,1.142299891959478,19.6134291145362,1.1018474258442499,236.518731022183,0.0001233521272533467,248.40606505473158,0.0017235351977927071,8.25180112282036,1.3277416723706295e9,5873.710269238866,1.5538047597044062e14,29.700865047856958,2.2248916880469007,4.9230302356639774e-5,1.8768524885437167e-7,6.483467634068515,18.55900171222524,0.011535627451294252,9810.764246969964,1.4005280878268498,5.384853992651259,4233.361686840822,8.211109628499391e8,1.784219149773317,6801.237052418562,0.2915634268607083,7.801125886657064e-6,11.270376276467992,2.3294440507266854e-8,565.0159410573012,1.0339915206393083e-5,6.649621785150627e6,789.8847106809858,3.663062951879804e-5,0.00192379762443815,3.680466358717779e10,0.6034715199029476,0.0016072407911655031,0.16562394227264773,1.0853383707953764e10,147.07628547334042,1.4933664909469972e14,0.535649114387013,24.274783738648306,3.8226927520299643e-7,1.498131351413747,1.25384168841495,1.497082767622436,9.567262749545128,679351.3729370309,1.206727831547245,460.4433375928468,51.377117142401445,6.225169698349822e-6,0.00010819771369330897,6.878498782458537e16,3.6454528824277737,5496.9809885832765,74.40068923454,2.3602591077595854e9,9.930572436847378,116427.06775602094,8.95170602283483e-6,3.2478042035588366e-9,3145.857569083282,1.4087890519163618e10,15.688351792547692,443.7070431417726,10.041479122099645,1.3663793024709832,3.7047312573067963e8,6.959901169672263e-13,35394.54048503997,1.4085793521819644e-5,0.011959612589161419,0.0006886769969347438,107.5081099346936,283.31128074274955,1090.3890060709368,0.3750068189091114,6.27264598584143e7,8.131852468919231e-6,7.723457635639404e-8,4.161401011479069,0.00010283680992535129,1.9527808335410396e6,1.888897404026863e-7,1.0808482773557496e-22,385718.06564489566,5.9554476789851485,723428.3253573723,0.24340800145921535,8.436643260625777e9,9.480764261961147e-8,0.0006080884317818325,1.5292919918266894e14,0.03680933132606521,0.10021248521327378,7.758293527567324,135.74424902529424,0.04743388271951024,1.949266415176645,1577.3614622743025,0.008515981184946548,392898.9415768872,2205.833445312817,419.57794575858753,2.516294336535097e-7,47.20337295882409,0.18840536287399023,0.00023977225278620765,9.123349505438232e-10,0.00020470729843774196,0.019931434109925206,310544.34241898364,0.17203519667276446,17.65889667600869,0.06552494791383304,9.899571595487629,77442.81507770809,0.7184759007909953,455.3426490338296,3.552227148167598e-19,7.969952022277976,1.992160812909615e13,1.0649139616138393e-11,1.455957547144242e-8,14.076291780958416,933413.6216812426,0.9174094104362417,1.2156786062641984e6,0.00022572408339573502,3.712923528220671e-11,1.5901097352808413e8,267862.1159481048,0.7891996404909564,0.02823125970203679,51080.70185970621,0.15449280135083515,0.015566438912546965,3641.2472251113304,1.482673511783669e-10,10.542392297038235,0.00838392486989577,6.526861475554161,2203.3162493518403,126.92322246060499,9.9580192849555e-5,3.582063128571748e-6,1.6967543155039917,17388.007875034684,3.814775242203055,0.019746861368960162,0.0006218803308011611,0.2044872069457262,15.780870100037605,2.3594631653271616,1.3275125774721235e7,6.3479201621190535,6.762475896834106,279.16385466132147,0.07272997533113151,146.07055977486328,9.061185689388231e-10,0.0013542817384734802,1.8624699389242394,600.5646431280779,16.034045415197774,0.0093506110580815,2.341697719992579e-15,6.336248335242443e-5,1.1325926431830025e8,638.2013514062935,0.002053281215508395,0.5721096369940005,499.21183903094357,0.8639028734393319,0.8753428246704277,2.2958701041951355,55181.98805228945,7.80563637259529e-9,0.6589624421591264,540.7563775393926,27.30234187984583,4.303335926319318,0.909699868167689,5.734396349719477e6,29.126182942295905,4.76021604229045e-5,4.958480775634852,54.60317432552499,0.000338662707678142,369.49568574833967,0.01931667273103473,5.182705248224738e7,0.0005365368117159594,0.005871746933353195,1.563465568818048e-7,0.0019589933226526013,0.9920372707037202,1419.9907307541723,0.15121078844234265,9.0998283396199e-5,7.307457887250334e-9,3.8433490909181017e8,97.63188082793417,0.004115819158752573,5.5869113296948026e-5,1.9833640158096172e12,1764.307228300334,2409.696327187495,2.416163968561211e10,9.838847465855945e-9,0.4859976489009168,49.47650182008211,2.6747335839828983,0.00010611694221170521,0.8976134430946268,0.17480532353722578,2.4019361087571998,171.93322818807076,0.02991066947731742,0.025622807203223838,172697.59118591913,6.656825844668799e-13,1.0063911562146168,0.000347588329202139,1.3260431292448778,3.7354643549275206,1.135471249652365,51.64043160621734,0.00013217563930575696,11.578664835612706,3.588316358015579e-8,0.0017507204922978497,0.03074467986069056,34.888012320303694,3.7815257816111414e-6,0.7468272722987768,0.0006775869657944802,3.477491913933096e6,2.0950676045483705e6,39693.25746756988,3.774937409467439e-11,1.9797396413847104,0.16578778060477312,0.017274158977465138,0.004198322268377076,1.0323082456950416,1847.27367786801,41.05379351070577,0.16638738994098995,0.018257901542240423,1.3481033189563716,19.072652164225786,0.26387287427316003,237.69004862385555,2.1691549371230523,0.1968715848091177,0.009901955568056887,752425.8936053236,360.03479270710363,1.6339230882203826,4.390738391504026,0.0002459011025629697,43208.37486967702,1.7219625810471263e7,88079.3737356072,1.4109292564158744e-5,28.632779092363407,7.166311455518074e-14,1.0299751119994148e-12,1.8045248731206397e-14,223.64395284679867,0.14232244678998107,4.4060163437623715e-6,2.3156022136816976e-10,6.62177440443216e-5,6.953340987956786e-6,3.5344852664433396e-5,35037.6006483964,1.5380937490733474e-6,0.2444354424675295,2.4246393462329303,0.1342166971483776,4.963768433729644e6,0.4973790641164193,3381.690533173162,8.33880366304159e-5,0.00014021223361687245,3335.1005232342386,0.0010422672494436297,2.358381783171151e7,0.6752006040973586,7.691410960425998e-12,0.00020072525550131437,3.0975819466433744e-5,0.08155728575942228,0.13613418220743326,9.313326308486133e16,5.7846413421561175e-12,0.7614532331404105,0.06251715937240747,0.000646126332748937,33.27795410529732,0.4222733142602433,4.527221515036913,0.28470045036564556,966.6406057917541,2.37490880692198,3.247246659169768e-5,0.01613979013650342,1.0100720806380397,0.007423602507627773,19.898417502522115,5.709514860465934,3.284164099987939,1.0888566811305625e7,2372.975413908956,2.3910512949214394e-8,13575.33293623841,1.0822078088347307,3279.146883731808,2.3111692219543512e-6,150.1014390985883,3.0550430648698965,22.199329600643576,9.12777238779903e-5,3.0748260403047768e10,0.00021024009928824727,1.6364285681420538e-6,4.520208727883988,0.00011579648599204069,4.4085336761369645,0.043971044300331316,6.8470841370047695e-18,161675.18713058488,1.5503286410095503e12,1.9027903654611467e-13,0.020048915635368703,5.870448739783736e-9,1.5016943802227978e7,4166.582734430683,4.026466621858189,5.318451321714753e-5,2.121274807194148,0.0004149506901781145,8.079197880190034e-11,3.414472393198163e-7,3.9057378644341827,19.9171227143681,5.418349779701851,14.154587150289984,1.6012700734913237e-8,1.1565548421337528e-13,0.011499029251844563,3.229629270656502,0.26577746128182195,23.980557201879847,42.359404270003246,1.2465638567077928,2.5038623313277333e-12,0.0009593644624537976,0.0013651345862440455,0.16158279980758558,1.712997367193075e6,6.021007766590578,2.3010248417001623e6,0.00028449840871371695,0.2091913139624703,0.4048455486080381,0.002213100413969011,37.660325043471055,4.494081121389771e-5,0.04514381479403612,0.05228637597575425,0.9183455897779078,0.29021912317333176,14.322062587863059,4.164659630962781e8,512.6026664311686,3.6558557657015043,267473.82476038055,3.9903123309744863,0.06796726501717415,0.6988085990445475,54424.84991671583,0.003262775387993156,55124.36081427366,4.165767736680257,1.4139154207501656,3940.6946596357743,684.2532839322437,13051.601542241095,0.0012457382561282902,8.25830400058004,0.07342267532858994,0.4824415191287428,3.3115933324597076,2.1989358555741997e-7,219.38186968219767,0.0025791074430164236,5.119820361970614e-8,0.0003232106201299118,1.3750779560637167e-9,3.3074077582633716e-6,5.156552957450841e-10,0.011799375783151569,13.15990924390239,5.6731551316559434e-8,2.1238737068035247,0.3473612061412186,0.08324811240938931,2.9083344867726527e-11,0.007492209831264302,83672.55249948935,40.14024965207023,6.3100050680850375,116.74560395879709,0.0011100904324668696,1.513240106887551e-7,1.819444835595824,2.391487177444946,0.030957924018389513,1.4191671936711097,2.016203489591573e-18,5.7631898210884574e-5,5713.1112736891955,0.4403970222720023,307.9008939377502,6.818038702282157e-7,2.021870636814637,45.381717845096546,23.91265473783465,0.04947063378486827,3.0881331694333505e7,0.001204190479082176,9.836154634370026e11,2.0571919397633662,1.2672866354571393,2.225587166738216,4.865453930358843,0.04121321370305025,2.7396570757468695,5.253293604935679,178.8807059670071,140.71436280072814,14.13424904764873,6.117597941994037e-14,0.00036202820682295565,1.996481014867118,131243.23740439964,5.707281375786904e-6,1.4324536292111074e-6,0.3061594228132112,13100.041833384395,0.004426168295598885,1.0334903800959376e-8,0.015692642036232055,1.4822995154244132,1.4539247656986216,0.17094153835894182,21.78691539618822,0.0004100635331897406,1.9344822857633335,0.3267904785512441,2.274631751238885e-7,5.338049738612027e-9,2137.519576600572,62804.89299066381,220.9092153404062,1.0961839763536008,0.14833169711559974,0.44095751482769663,1.544174115762968,1.4644716164520906e-5,22551.947946222135,0.5803982039943064,0.660556995994798,666.6162486085852],"p":[0.7487991301126176,0.9912936037818119,0.583847347907422,0.08090812784092138,0.878769088481129,0.7549034089049784,0.5559927951188719,0.06677997473687403,0.4068958024802909,0.43015170850340656,0.3581533280902025,0.45557375398694755,0.30384135746982466,0.13578146247418332,0.8546281439202925,0.4063743370742745,0.9444365633447163,0.4352684627829422,0.9280608013971468,0.4885671732169399,0.7810736765048603,0.6186426217676873,0.66541987287221,0.6948561507960405,0.39662753505817716,0.20919062717246617,0.8323904005166505,0.7906438665807112,0.16250582720178386,0.21910315050346107,0.949411843148199,0.8830999173364271,0.3583369323995529,0.6210734304597356,0.8185881267153488,0.44499590526228094,0.8679698422819908,0.6794789989820009,0.6833791078343556,0.15461928137547232,0.9461348559357463,0.12789541881007827,0.4718307081694266,0.35094972368231936,0.8309248147767512,0.9635789899784726,0.4791601980497049,0.5106801862130081,0.6510164923370527,0.02251354371377956,0.1951838829084942,0.2944763445351686,0.3537758004476117,0.14927750393019767,0.9840713482982264,0.21438265757863495,0.462258924731654,0.8344066398515322,0.8659989159673163,0.7598144347156823,0.8812642576472536,0.7404305968861666,0.45590617819515966,0.5469540268077369,0.23830247454623787,0.5961544003538668,0.2656132955677417,0.9739047181164981,0.3522514237482426,0.06822483861156226,0.9419524174560077,0.9601451072105232,0.9390035270001338,0.7180715955291399,0.9477221257050248,0.44892120504019095,0.13213764472385536,0.8001728868118043,0.4412086925813157,0.6050225172561685,0.564480900450371,0.9402765246479212,0.6427298232437686,0.7242674090366674,0.3133158232419997,0.5061535543283824,0.7805448746103967,0.4569697417092464,0.29917903202586493,0.9059105320824683,0.05913096442139687,0.46402037546797126,0.7357188451078924,0.6308053549383372,0.5034355646144362,0.24601571609746342,0.19401383908861525,0.7198678425494678,0.4191538109286175,0.6711416537013539,0.7726370565673686,0.8927872408376563,0.2688676558650065,0.186567993730546,0.08077552516637843,0.9077990443632036,0.204920652983128,0.5981826869816442,0.16415848844737657,0.00400428147661569,0.8270827155868077,0.922616827069676,0.7230602495826866,0.9238984397068564,0.22248483212380132,0.8145738014072819,0.5154580540992302,0.3699154406872802,0.10518021322242799,0.514637110919677,0.764991305791233,0.8673293036648813,0.9648491722614114,0.3125829950018504,0.7367001578016721,0.494570819993301,0.03432892100476237,0.021484004584544802,0.624106190514667,0.22250343998638478,0.006639534720438212,0.03701513737781381,0.05297511639085295,0.4866269321549477,0.7948991365866023,0.3001572679666986,0.31396977135150395,0.1746439035368743,0.13552296004160636,0.26117253463439627,0.701523786202096,0.08317180159385718,0.13745259761510153,0.32699221379280785,0.019618852048548074,0.9002217047966117,0.22255576754078543,0.8169855896457034,0.10534577365522546,0.9648663062270761,0.6252345606290048,0.04035195207433584,0.7319298576338378,0.29624301394741104,0.6967116560506079,0.2437371344844843,0.5425290752642951,0.24723098146454459,0.07802986071753071,0.014457913539816847,0.3802963084276174,0.8565843830621782,0.047461167414378114,0.9486940543712705,0.4693234897770595,0.3510716870542814,0.6140111182057897,0.3271658450823862,0.08083587610172027,0.49529559796675326,0.052027020374668886,0.7571775137656347,0.7305238749792349,0.35375010437480325,0.20938624149534735,0.546463036081005,0.7631086881892948,0.5412710153272451,0.43505505135803335,0.47103488117674264,0.07896096472957015,0.9871655258268743,0.3009775704356503,0.8927573898208916,0.05789027140605696,0.5894319844467912,0.526873226585993,0.6707949295797946,0.9952714902895572,0.031445782011578105,0.732043418202432,0.6268391981419406,0.7891021617508605,0.09434307178249468,0.7105516522952626,0.026068454534426078,0.9467795181721794,0.7947715945654679,0.7762923182543151,0.16065218441500506,0.4075783039329133,0.1065284072487116,0.27010643307813464,0.1049880978675628,0.4909291876284996,0.8142683596422249,0.36070836325225564,0.23526122941352834,0.937781969975203,0.44047781862809443,0.05519576146138494,0.1311393410535382,0.06899113176023852,0.9187364286845283,0.46300750076860187,0.7300995391898277,0.181166967671484,0.04583541661901269,0.5669390076545522,0.23591178020960668,0.4350669972083927,0.5929403328688776,0.27981867663067206,0.6921571082996198,0.8119912012634847,0.7944568019196645,0.1070619081491142,0.25344059095138616,0.4247847956380284,0.8467107551987272,0.8889819265067933,0.7750996547022595,0.24313193074961448,0.17520323513571046,0.26327038925630597,0.49402923575090596,0.6466989187149603,0.9562307282482678,0.6058780092430911,0.33636685312832126,0.6936859632137031,0.8371060696054333,0.9701191123932882,0.24337074402353487,0.8019507593608315,0.3408322375742474,0.8988476942050532,0.49341845539404705,0.14788397048175428,0.9201812041025665,0.6931503441514848,0.5182833705347956,0.8985485978250511,0.7579774327390032,0.6984523274727106,0.5961675989668529,0.3835235036693345,0.4332196022429706,0.10020819855279406,0.06347759515188423,0.0048333354439749066,0.07951672255498843,0.5539071636127331,0.04518704869084833,0.154085550751619,0.8727073169217017,0.4877952885971173,0.13361104658040723,0.6339137918968525,0.23932196174820408,0.8847943032864023,0.8798711200783409,0.8261613952831823,0.16014312286073595,0.5458826276516076,0.31475725133577703,0.8634302931582303,0.30582250607856354,0.09458024964422185,0.8083381254133442,0.21962415135592162,0.002608485061843302,0.3909408452937684,0.5360282435708958,0.2871600256698337,0.6151633329133397,0.3967565588008519,0.11468979257729939,0.20640074208537795,0.5172525682832505,0.10467987046980043,0.010645329208701426,0.6743700347716581,0.7165013724065319,0.0436920974919659,0.1722639091626792,0.8335620507482029,0.2788714263146339,0.01541040229935109,0.7631203619727012,0.14884075906885097,0.7611793669312448,0.48680742635231855,0.7357124627958549,0.10969841051905038,0.3692053101143049,0.6321617220578664,0.5769646522285969,0.15582291055615705,0.07428197410439119,0.9197061776398774,0.6374950620265842,0.5038982451275542,0.5532494499008078,0.7922201417347297,0.09877509052499356,0.6099397796332588,0.8149240833107596,0.0780905781424115,0.910393865322249,0.23002169875850376,0.8260990621716695,0.5406655647805254,0.4243982089333769,0.2246330164296766,0.47311151858985623,0.7303882686503409,0.8774731250818515,0.11103814162454118,0.22907464447212034,0.39703968700198655,0.48170636233010544,0.9174996546575522,0.7457535780441278,0.3996652473676603,0.5831212794255483,0.10499789579135599,0.18741625278014418,0.36585189467243406,0.37770540596624946,0.5998744571541315,0.7011419802218495,0.2176169890216244,0.4988219394167617,0.7512463856525353,0.10241449823903959,0.5052206830313966,0.718757975617847,0.348907144890789,0.7444436381825612,0.8265405680731848,0.7450659565668649,0.015631313906474098,0.2876358644522887,0.36505472025108565,0.4342535820175786,0.6753872776716761,0.49973831828709736,0.9768932199200284,0.30389718648155317,0.1058904347425409,0.4671142106928843,0.5019390067872778,0.43691714616078126,0.8537234868261352,0.23891913774548268,0.7813990004738474,0.43619354686714695,0.6731822163046386,0.38431031113048797,0.5713158557389624,0.8026682451586931,0.2232661133967193,0.4394535549576344,0.08031115536882916,0.6097440704950889,0.9388494212768568,0.534109543878388,0.8712709617599737,0.9449336281057459,0.40218628106080456,0.961460799741076,0.11410136824937167,0.09228424133642399,0.8111619055414865,0.7264578155711667,0.039140767027098455,0.8341282193369055,0.8470361201300847,0.08449341792250209,0.8017972801601689,0.6418709869483272,0.08416706919859895,0.3164562757090368,0.3836366405307925,0.09080606992223195,0.6318314537492,0.6639722256053144,0.4157950083838924,0.3967534409272886,0.13716422181642063,0.5057053658903081,0.7279352429003547,0.6287693807069414,0.9678949478994325,0.16491687780582254,0.6967578998098709,0.8400794484415575,0.12730449204755012,0.90669323109887,0.9377869159771668,0.3888806480313285,0.03959897274816071,0.23295718201049342,0.19003899266447677,0.5533230034151846,0.6330742152977915,0.4155428188486172,0.22194319270691842,0.6362150528926891,0.29051610492340885,0.3112348684591164,0.14449666479181156,0.413334704087325,0.0022339336886152417,0.038883844571279136,0.9683315751382573,0.26406473363759586,0.4100561560937761,0.624741847593643,0.06492968576167213,0.12235943508666192,0.9037212239627834,0.4269273018441688,0.6632281650611893,0.16818996354924232,0.9666681323751607,0.04727756683330342,0.4602348545084938,0.23348031208120235,0.8021587494632472,0.04122695039461033,0.028599131293544078,0.8674926967518637,0.6347597893834567,0.7325864222549836,0.4198053195463418,0.8766377972788535,0.9781774802063177,0.72684420843609,0.6323521443261795,0.6725319466443935,0.4868690721184372,0.3918302164414238,0.8508703312638703,0.8203659924045203,0.535931551532028,0.5358279665859946,0.3396520586795193,0.08923739474191184,0.2095961422435093,0.9641869485893384,0.640844352285656,0.1678100644110634,0.8186912268651174,0.08871383892717977,0.20758966175288585,0.7045251852307564,0.6706054147938407,0.21273280664439898,0.3052561262834754,0.7851923710141626,0.9737450106540768,0.4861053426193789,0.7989763890804562,0.3284451068747982,0.5585265200552829,0.9788926560463234,0.9904757939577236,0.959528437883896,0.07233372975753571,0.07285530057059653,0.5194494895509607,0.9447457816489127,0.649205090736398,0.669434200120737,0.2869126806530584,0.34622282262774773,0.41050312611188944,0.3590964760645201,0.6365473418072878,0.9983987865886164,0.4558946109846771,0.4161611037525603,0.2875951987684173,0.8986806476528506,0.6204453724502068,0.6024368733123413,0.07543319737604737,0.8110826580514217,0.09554817549543948,0.2115120184632786,0.43358157622498616,0.8545777672331352,0.556524926927251,0.5013245860795301,0.8666528883031996,0.16400215473134172,0.13839034900105096,0.7058653255058123,0.6189262887169822,0.997498650694659,0.5577065093402798,0.9445227820697628,0.522972591869812,0.8216292587635143,0.27314305575068043,0.06077963805660436,0.9890519740865336,0.8804689809541213,0.33842863828835057,0.6181373397345882,0.2070656036053511,0.6871407232028948,0.21839724304635055,0.626311437744385,0.2302897449165,0.5924499480584893,0.8812652834130337,0.86067982107305,0.956581886178653,0.7838341909977522,0.49236236428451696,0.15136743700378696,0.16686195566303086,0.7342709683963655,0.5608147100020029,0.33920027126609953,0.679294474995151,0.8310752403953727,0.539835985240881,0.7426877788648447,0.9544067166205481,0.540778886930819,0.8565761019366291,0.4108666027219361,0.1627604812624952,0.7717730632887649,0.11878438199358432,0.8807450800911276,0.17059288432125985,0.9317248848103048,0.7123108510737648,0.05728186374015776,0.34756722489196656,0.9221973254317388,0.348662603863791,0.2685974607961732,0.2622454145999735,0.881444698721312,0.7112967349628918,0.9509030062160586,0.4104282193082869,0.9981581560583743,0.18976547940115207,0.4225636850207366,0.5099357562166791,0.3019731614165295,0.6694361975395722,0.8007266048434734,0.49397844325537354,0.6198014910840344,0.5715091882909853,0.20427766798722602,0.28186215361261935,0.9805681038506568,0.5290128994197847,0.7618003331964458,0.7228307051672815,0.9562740089751507,0.5547587129226947,0.7746312436212126,0.04686246107778369,0.09721266652169747,0.9264566898077373,0.9084332433393558,0.5455485974200418,0.6722980636944333,0.6019622940337326,0.49957259973452506,0.8593109006481834,0.06139449648937112,0.8419643900531673,0.09272507173712063,0.012883585213509408,0.1547951995592216,0.9414796478471614,0.6086007424242708,0.8401075777644691,0.4390777214295829,0.824932606923646,0.24838488902908207,0.18901013846613512,0.5350482443707896,0.12238213502220607,0.9453672801857904,0.1708212258830546,0.003394436499253084,0.7794884163204128,0.5825453401683525,0.7608497903146234,0.4540461378078069,0.8924070915364704,0.12574912946069738,0.32669185837949244,0.9566675388294161,0.2563486094615077,0.3780124453709106,0.877618183839874,0.9494799998569134,0.4043463927403812,0.7962216549078784,0.9020965512641665,0.19859742732855024,0.9603328647974689,0.6893647793776907,0.6359866159859278,0.11646081367577432,0.5793802795605691,0.20436757022851237,0.3050527184902041,0.006728040271570146,0.14397717080891415,0.17875924644581365,0.7897216079021769,0.44281274546567295,0.6912122070657785,0.32434408267923676,0.5625580361915308,0.7078187673317702,0.3915799309791492,0.8959137318321215,0.012213873860114965,0.5377521793344919,0.9696495717928881,0.0042454587261335774,0.12699330148174215,0.6878030458906861,0.7675540359351365,0.460107164129415,0.9008380529340447,0.18909798286735024,0.06714693277887829,0.9124091403263104,0.9541923610752516,0.3670240993405445,0.37914442967457984,0.9904149457141909,0.3508932981613966,0.39098846763206296,0.763602552021682,0.05136179718545786,0.7426433835265511,0.13432696153960566,0.5505617561966551,0.637661057360293,0.6320519398312416,0.25414401712599477,0.24909853037467466,0.3878506743758894,0.793711719565914,0.517863189455922,0.36446249487193016,0.16734029559360142,0.23186521145983763,0.6060748758455323,0.6476098244738222,0.8377019483790582,0.5592175491011535,0.5616355747464346,0.7143892545701545,0.21058359804715288,0.5974235072743577,0.027604943944512073,0.21464589334777462,0.8140055717327639,0.9636331198268613,0.6031295426784478,0.36544359402308624,0.0418028244277886,0.13331392382007423,0.8441397319268409,0.6641334357945246,0.28499709916495397,0.3067914188846006,0.6469167753103042,0.4551664766694219,0.388476283268288,0.12490288110816805,0.8439336221490199,0.13348389998959398,0.3092840470378695,0.8563443055555569,0.6816084309668755,0.5987725185136887,0.33589218294808276,0.9655355497952329,0.5794423056614935,0.2950453740861134,0.5327700557840716,0.6978643882371902,0.04576413948327862,0.6120408560908395,0.22921618567748747,0.8165457954806965,0.267651809380715,0.3514013807015657,0.14962238003781336,0.3427645165149973,0.3105076425551503,0.8962320691095336,0.3806121273972556,0.157015369877195,0.14308087091487232,0.8466858576430953,0.7199492957163864,0.29157575786747647,0.05251372289948297,0.9257475289160109,0.6660788446484269,0.7185865185658928,0.8750201989586064,0.03211787161511692,0.1561245524659023,0.81177627928312,0.5240534736510509,0.15973281587313615,0.49489795137098724,0.35574870160445693,0.5409288563437755,0.627693643109472,0.38264923895481395,0.3169314221246413,0.9681058260905453,0.017000829896808733,0.4756538176728027,0.32576213485116656,0.3606507218716577,0.7188642936827137,0.48225389629539306,0.6350644751258623,0.14242961326123282,0.6094706438664721,0.1709483897274222,0.1272972978332525,0.3934924633934911,0.6863616144357318,0.05210715932504617,0.2881560359984683,0.29953940493310505,0.7680041242436997,0.7654854440817185,0.8722932297300614,0.09018780384958891,0.49026768391966824,0.22667944140217977,0.3986731023598602,0.14060592476241385,0.4974815477850141,0.9325637559482918,0.7781972374439805,0.38031816003018215,0.2694075652278347,0.5901528511721621,0.9086325752797406,0.45853705771275965,0.6770128577904047,0.4725158835710541,0.339820499622131,0.31110798057962996,0.799425828830093,0.6364331237457763,0.5385166401616657,0.5393972538352096,0.31556749234765813,0.6910841603913964,0.9136286331282715,0.7782589614635547,0.04230501755250904,0.8135453789798213,0.058361750717977,0.0005545556873760571,0.045648191230190704,0.7479825070671575,0.3828418684310022,0.04556448834642479,0.021179999703717645,0.07565032697161889,0.0998988054352683,0.2030442270450603,0.7498813341363224,0.08280103475526368,0.28599533282779266,0.5558473549937226,0.4016804677738095,0.9761370675537766,0.14000851106294387,0.8263303630196785,0.29741445287617796,0.2908178130430725,0.6772111764189568,0.2503927000100179,0.9957607958435997,0.4729184391242125,0.05537635156369891,0.2545430723414912,0.24066238825698938,0.39631924498063564,0.35190648699120164,0.9853664260253168,0.04496627897704886,0.3885530799541408,0.12433326371582942,0.0847457637056026,0.5857075584238225,0.42576483651061947,0.5207053988133659,0.37924793368002874,0.8953331460623077,0.5164870134665702,0.23003786525343517,0.27457333478968193,0.43536261885478367,0.04056414721679391,0.9896889832210995,0.5376413836354008,0.545690411270461,0.902298479500317,0.660198906812492,0.10607402848986847,0.6880322921909781,0.19388936398441614,0.8555072570203246,0.13368567013877675,0.7026634506831368,0.9064145977291331,0.8122392122682451,0.06951321278553846,0.963499319388353,0.12605438860120577,0.12152448745402489,0.5869019596965941,0.3040132698544138,0.6020761744082823,0.2318642301687619,0.01564382414609522,0.7121162797176415,0.9582733830515568,0.021018824639974065,0.09653821727884226,0.05653093524038977,0.8909112704713495,0.68120372920554,0.5178294784322832,0.19876948039288145,0.5320821456847729,0.31397815745433655,0.04601179775369357,0.09620509939912414,0.8711279924427715,0.5719131915025468,0.8497878423800262,0.5618857457330906,0.10516161362987941,0.06077889375677259,0.19208436455482092,0.6051570887134987,0.4255049210747768,0.7735069122354374,0.9413806084201235,0.4234715186165585,0.026624208188236853,0.3033674925300269,0.337620784216373,0.4455277157785269,0.762587881696505,0.8764918055958955,0.8529257875040603,0.2639870966279003,0.3974724764515065,0.17754408661910648,0.21655072322669233,0.8120117395074458,0.18626785757757913,0.23008193439099922,0.0395428110228484,0.3763359966204105,0.12438816995220181,0.6623440142886805,0.8459346780772872,0.6287527473445802,0.5714263886395627,0.7295891171718805,0.5188500680823758,0.12066665097572504,0.455641776139188,0.7892859194304422,0.37439646938226656,0.9087330292053986,0.5824337590194071,0.3854037280335425,0.976849187898233,0.7534729546894456,0.7160371781713752,0.3547364002900537,0.6289878275620087,0.06463403052996264,0.4496245056787922,0.652402618669695,0.07179833820375037,0.6070087183265176,0.29639252150424955,0.1387008300019119,0.26165351026897143,0.07206666939336226,0.05439941910585011,0.1369450256596021,0.22382400047516593,0.7408789633383575,0.11736540665854878,0.5631009384489563,0.2062851178952152,0.3298047968164677,0.009016882498563472,0.2080523571120798,0.8815060654432885,0.6429413958446593,0.6283954159187894,0.9605843277535648,0.006387083485639877,0.19159309528075652,0.4863146458604841,0.5119683111927589,0.11010940761463472,0.4933168372531507,0.017651149957231382,0.14012022996202522,0.7430658668056025,0.4607126193007316,0.9009131133739028,0.21540898572670564,0.5952437813324729,0.6070926391740694,0.7024761890695106,0.3268326117864153,0.9737607765108527,0.23938597323297506,0.9213741320320066,0.9428817796682967,0.4244378952337331,0.5170510811696263,0.6610194817467598,0.3316092164237059,0.5101843089071685,0.7943706260634738,0.9039968479851166,0.6827881955425625,0.6720447618165293,0.0031020941047286144,0.13484879406197137,0.5073361782581167,0.7248668131860792,0.10005754595829663,0.11120947251918367,0.4424973367035758,0.7890523848560929,0.322499485023664,0.08733337279071396,0.3052642972708157,0.08938858581576903,0.5121773166688774,0.40687596893719524,0.8693456791913472,0.20128650154943561,0.6210698641774139,0.3662003574347501,0.07194409903760635,0.06311792841521324,0.700575249567462,0.755797421117888,0.7026143012465429,0.46179812160187916,0.06485625457949817,0.46221587510745477,0.4967776107091939,0.0987472209909257,0.7186047008979866,0.43495818601599723,0.4274105584995591,0.7097793464625701],"mu":[0.14261903227423933,0.31201060451442597,0.21077323321092556,0.26121558694090785,0.9306336116016425,0.10914104221981491,0.63756847841969,0.8618094619374586,0.9136472404666205,0.257914176410283,0.7172072285225046,0.34797598015255793,0.06550236143634769,0.493714449308297,0.23252109419649192,0.5101794369304122,0.9292951084755514,0.9026209980442761,0.09701258860891482,0.5857307763275841,0.8423435960467078,0.02671109228059243,0.1546107466569362,0.12064800472729975,0.551907789293514,0.609788930439848,0.507843524630134,0.19977086365473173,0.19361167086554865,0.6182816928482122,0.6842598959229673,0.44286418598202415,0.6711846879363847,0.0402097588736281,0.44441889406853097,0.21642832685599322,0.32763606818961866,0.045384917304820416,0.921738480732504,0.2305842339214983,0.38890353753380746,0.27943236416740347,0.26528272869974745,0.0951729167428792,0.6712301631248254,0.9881833248962533,0.506337468778463,0.5893754582007669,0.6835990167695076,0.1341741841095132,0.22958340066274063,0.07536424501623684,0.7513119237661021,0.4636613962308056,0.13475199556126438,0.1618307994281245,0.9149703595631176,0.37108235250583177,0.2752487638026879,0.3714036022319598,0.749083001779884,0.7459180339663039,0.1106471339562296,0.13599864528370076,0.19143572164165779,0.16672459036918097,0.2285658894264866,0.4418990434508061,0.6942090279116,0.11437082940662324,0.36605959437011193,0.09468546765230945,0.5651909347162027,0.3650514081970406,0.12877266859669545,0.9565692801631687,0.49051129620002465,0.4330284689725541,0.25014974004691126,0.4224362322793589,0.8269647510000311,0.9481572642659764,0.8438912930526554,0.3598287906501485,0.44052984631125924,0.43225981867340946,0.6558238691290319,0.24880863140698684,0.05427039635638198,0.042823410557122576,0.47676542376326925,0.8991529540204726,0.8681087930207028,0.9842181968387242,0.25762434236461274,0.5641485868553093,0.7007731847222514,0.24854467234688693,0.5909143050387036,0.5473387538897845,0.5875741802383734,0.21565402020363122,0.6093288790954117,0.9195227658066578,0.9736574669875027,0.8710613007478154,0.2569513371290222,0.44367270041691254,0.9464845154001913,0.23775011654181455,0.07430668187889333,0.20227748523278288,0.8130476027331941,0.6373867769076951,0.353074683136249,0.46816918431669596,0.4765497087774646,0.9949632012501501,0.25577096393024745,0.3430097939132928,0.3910816235812935,0.7768355794838473,0.6728797336174883,0.039070564514069206,0.9356745545120142,0.942132444461449,0.6025836861863576,0.16817137652987246,0.05376165505577135,0.4837095567474605,0.06990973023342906,0.6766916428263987,0.10617301119079547,0.3162543350279663,0.34428026989493343,0.21490527057639253,0.041992061692351035,0.5416812845519112,0.23046873975802362,0.28779242857504084,0.4780424699409118,0.8358328109943365,0.1882182560834076,0.9919999108243547,0.9852976000354716,0.4149304259029558,0.5787533206432895,0.5226740258488041,0.3296657143112369,0.6760332850375661,0.17547840407095538,0.44573055292811126,0.4606940491259268,0.6476834789334331,0.9340065220164508,0.49932750765114053,0.32461511494232975,0.5359704709225446,0.6179453659228074,0.3632054011030368,0.9189043642635375,0.5950610219492141,0.2520000922171852,0.536290157452624,0.07233771588846749,0.9736928958239304,0.7590030653515636,0.8063945664932339,0.21553135010754687,0.22835092631349152,0.04003298532656574,0.03071299463477062,0.5458774743816124,0.005409416438724168,0.06459450729436456,0.43140557447650263,0.6417764098577587,0.1126874360031127,0.12293317939250703,0.6266296082425455,0.22501372324956592,0.3814720665658424,0.35453651168926026,0.9231593715817157,0.9829014160534426,0.6210092918433419,0.5555116789792047,0.43205279012706677,0.025842570215521166,0.05483373529979585,0.8997949004575276,0.292146019007276,0.1681291595894816,0.27110994591876714,0.9018359879397249,0.5150613443469836,0.9411068996043428,0.12635387128228825,0.258827841269643,0.027573585331826633,0.750384556428682,0.5239690596878057,0.10811502880072488,0.7197330056532574,0.2027773047378576,0.0577104414030134,0.9498536011907546,0.10592208137992642,0.9698828419340513,0.6057045283689979,0.4251921805290442,0.6817059410795656,0.7916605829191454,0.36856573245099344,0.13154272399024403,0.8576609374119317,0.3379518749527295,0.8450410809244908,0.09619692846726857,0.9734987150743999,0.8871423181186628,0.1334128453066199,0.12631078323571154,0.02612233946708198,0.9584003848994016,0.8142059096160257,0.3666296356394012,0.7160356605419149,0.5644390226550189,0.8732917428276938,0.09400242344020904,0.25822953263721815,0.37395138004766726,0.8011508090445907,0.25024662662063024,0.7929501633737168,0.32241594593519474,0.9278262825691614,0.035456519693707556,0.06507031966153742,0.004818962942249261,0.5380132232466275,0.7382330374872514,0.3226894275642045,0.07230149455372148,0.26428712455480197,0.6854397577693854,0.16269308447327036,0.19669528616422416,0.9609143645232154,0.17405602448587243,0.6987776833233086,0.23015177951595844,0.4636257314751433,0.12369826410826734,0.25216495367847913,0.36465813690296556,0.851127589351302,0.6601208716049765,0.09954458057816806,0.18386585950862155,0.5737951199338232,0.9392518071648253,0.807439714754941,0.10494679454720601,0.32734279092941176,0.018614570102154726,0.8405199390910609,0.17038523913932502,0.8031121215705854,0.4892500993338842,0.42085545313147943,0.2262322540707813,0.299154438461672,0.7051451622509439,0.4836717021197492,0.3539072329852708,0.8153021511024783,0.7070443437586356,0.1224745753073826,0.21323045821239162,0.4885091685813918,0.012645872239327671,0.699432051663677,0.584614946097382,0.35956531110925005,0.280120750266194,0.4011213764775583,0.5338288671671338,0.8492164798376045,0.7729698060103001,0.43275826843157095,0.343885627723332,0.9523497830771401,0.3494757937823718,0.6180095865084747,0.37531121339068707,0.5664469559688841,0.2546053504765282,0.19149355463835893,0.387662545855451,0.5123129934197319,0.15728970617458993,0.38872100545493016,0.3549768527053476,0.005216313846274412,0.9966407127974604,0.22680929300121622,0.10990715886111002,0.1875894230071189,0.8996246719741858,0.8741945639804829,0.298759735238451,0.8443706718301274,0.1212486111272979,0.5546745112766929,0.3758464400055894,0.8432614844923381,0.017986006591911963,0.25625318464729996,0.5535289505577441,0.3904374850977459,0.7329805960475759,0.28096147243012726,0.7996320913132173,0.9310381995189292,0.5295752671712592,0.7892043455549582,0.05739991424552837,0.24179179362327763,0.45102672463846294,0.12045694022984987,0.0355454596467224,0.22635692362199689,0.6691792367840714,0.6491317430652455,0.6836484764600519,0.4269840436050516,0.9467641616225215,0.5057563187161094,0.8786735005013948,0.7891064451768159,0.5613667402971851,0.5993604841455569,0.6466049394378046,0.718309949807403,0.37447691765032975,0.8456805727037822,0.647827083659748,0.6492125999842884,0.41537389906482747,0.24714662684841504,0.6229550953054479,0.1282051989024,0.345167777039727,0.1323299016241808,0.3662294264977226,0.9711179331204858,0.3630012718178601,0.17686466006129953,0.4909286000808575,0.8930461444748048,0.2516701453314285,0.9877391925791805,0.2606208448463945,0.3225875431319849,0.16628172356250204,0.701666694554751,0.43176305098222456,0.4695488396916987,0.2952223385605022,0.4975330322120639,0.20994487676787177,0.7348636883346105,0.5064622878696621,0.23996521197046317,0.11101220870383433,0.015593943781577968,0.865156048578211,0.7125934436320442,0.7297988613632356,0.6214931454850094,0.19997903474556322,0.07166600964172631,0.2590128420676645,0.7044857200923731,0.41022661313263353,0.9600999762680709,0.1126986003737327,0.281127767890625,0.9441097959923501,0.3115711236898626,0.7202304302084499,0.4460940857388467,0.7953741587279797,0.45571299258017284,0.2835419513419706,0.054803022278146596,0.3389022141959608,0.5082868747849416,0.7250498408872648,0.018674648454391596,0.07666075531670002,0.6580917435684788,0.5542126816972883,0.219755108146392,0.5028857131113293,0.8474214368604247,0.23001000352844425,0.4037843283490792,0.5721657176784969,0.8012780840396243,0.51177326834055,0.9912087605325743,0.9752671900105463,0.18943507124384018,0.6084183255010294,0.027011508940978368,0.5796864840856637,0.7318140471954213,0.8199909984316334,0.5375719026954515,0.8275777081495372,0.7346326048247989,0.5373753445605256,0.7283560819204973,0.5625999785731817,0.42940631925683714,0.6603504936511995,0.8447938169588503,0.5441889638077988,0.429185612141346,0.9062837039325793,0.721588746603526,0.38524789048523744,0.6606534467328924,0.4998906761257511,0.3606137378676004,0.1939036361526325,0.9950157075926784,0.10345520625787841,0.5681185096950425,0.647976775800355,0.046883467281476854,0.05982494143651884,0.5720475370713245,0.864740240145053,0.5320647437691581,0.9728961518154344,0.2888787606467529,0.8364708154815246,0.7521936617893097,0.29249868265034396,0.7132164946696364,0.8783776798315477,0.8747937496930027,0.3208918854918561,0.7004313632393948,0.30673216203430864,0.7595322769690287,0.22397094221992409,0.2826504682842861,0.29343075059723844,0.9076568057821919,0.0325135572516535,0.3514203876569877,0.6010829539025486,0.9950511288158133,0.7385576462490482,0.22714282066141656,0.01157106049679646,0.7693522222483551,0.8029712574806607,0.181610225670658,0.6753271695766581,0.3219596887954139,0.6791235409683811,0.9826133513653406,0.2464002441265858,0.28366653965116906,0.6399055137615968,0.6763052409994292,0.43031830115302117,0.15241158327597448,0.3810744685172245,0.5034804307564242,0.11838357443697034,0.26573689816952806,0.13477868102252955,0.669190611259747,0.8775969392461207,0.9293946875113364,0.9557246232336938,0.02486116935989169,0.7106957617938567,0.6328278658364874,0.9192742431577885,0.8961311161075272,0.900278970953539,0.5935421324102623,0.0569604770571952,0.8743784519239803,0.23533389458616316,0.366672854845403,0.12143028766480524,0.3010171798948955,0.6408614820529628,0.5503480003582302,0.8728495260717761,0.6893379281442278,0.5038176776927046,0.7795397864901985,0.07335686208456238,0.9806423543743246,0.2629961672114238,0.4248660748779667,0.3981582388567191,0.36998091385245546,0.3771244347794944,0.24380231515073292,0.5094358448052143,0.30651094838154247,0.3923852853781955,0.9250895508054815,0.026650175225490402,0.7546391015047629,0.8556866890072727,0.5680831988680406,0.17098053530288349,0.4138120328227439,0.9171928642225435,0.8395492918078473,0.9376944916669352,0.7335162146758623,0.6209631942221854,0.871660236721836,0.08075989236698278,0.7690759859034868,0.11112948332021189,0.272944477537586,0.46991162110064466,0.35509938871920865,0.0571171994829065,0.3547237713051026,0.9463036385364432,0.10656481272500207,0.126422146387128,0.3345110215972604,0.007645692689565831,0.02785927004935651,0.3106682337037756,0.0038886228943901813,0.40866852502553996,0.7894453345042323,0.007587674543017231,0.11902295636923643,0.018431264344567433,0.8699724694813171,0.2510626224191148,0.9082502640614021,0.2355957557322541,0.07192582296980121,0.8272202565649875,0.4054990902462974,0.82948283542657,0.5826219590063475,0.21961870806694606,0.9300043138909002,0.3998594836063214,0.10322369319413083,0.35289191586713975,0.9555655699487009,0.6848758571644298,0.29316140553579384,0.2319068408074112,0.818792215799762,0.39587780341046086,0.9960638833226605,0.6259212295204621,0.864986427818732,0.8998325025885949,0.026245044490931013,0.2544675335330082,0.26413163098644166,0.8762640512241917,0.7209041982408291,0.7646111608471209,0.016370177689817522,0.6958781585245271,0.31470956832702246,0.9098726427079897,0.4607685675624309,0.6805956530229109,0.5230992801049485,0.6010870531703458,0.22132819385331715,0.8804217189959043,0.4915377565489947,0.2997533743087841,0.7458208145000798,0.9548753253970865,0.3313303337321054,0.2491178309746518,0.9730747141076899,0.5001035836365515,0.6625867426873808,0.9556036158842547,0.0498073522374789,0.9588415638890331,0.20460286317874088,0.7869924704411324,0.5141685764908865,0.27744890926614985,0.8164666491456303,0.9986605870564251,0.691468340399545,0.16405842843141838,0.3685392734169861,0.15138078499615193,0.0009538450341441962,0.8980721571332884,0.556385253888676,0.776597282727074,0.06141827986264281,0.7651479017820078,0.6862194694852688,0.7312107975310731,0.39732608162664507,0.6937493983062806,0.0608508437661468,0.33375667058384506,0.4214788453525369,0.8955533184439328,0.11688617983511351,0.3015875753834014,0.3811256649735686,0.23207778626435527,0.5942699654134982,0.6280957187124168,0.788056752712007,0.032744961535548844,0.052722068963694246,0.11793779344448918,0.5472070792401658,0.7483832562102175,0.017955167462974098,0.3316792118074994,0.7845786597137807,0.6989796819749456,0.22806676252589808,0.29130008832596,0.09502726757769264,0.8953256241124561,0.7989660606773681,0.8732850039661477,0.2554679532406412,0.3708253088220761,0.8110801162434533,0.0026322645334795336,0.4637934385305864,0.01592500429608612,0.9258037159201042,0.8432652742815543,0.21844348189639207,0.30327592593738895,0.9253702479372967,0.4124676620106591,0.7442373805114959,0.868424112058672,0.6124248551581544,0.054556395469707475,0.6916150808025157,0.2528454443125405,0.4517838268442853,0.21743334416215232,0.9538537308100936,0.2730252182814945,0.30508846617784946,0.0035248097259421574,0.1541465665524937,0.014253726759623664,0.8462800847810661,0.5456337534657496,0.5915945089831169,0.33201629885163353,0.45702935761147256,0.869671068387629,0.2601891066623272,0.7442303414838933,0.002045444902612381,0.8332882581705809,0.731093273281197,0.6392026842690486,0.7300716085342658,0.8023424948706348,0.4447420238875601,0.6331305735165143,0.9016431237807823,0.8531257094656475,0.766348333886147,0.1655350081568958,0.6747860227460443,0.17366742827984893,0.4461169801038387,0.3135363878820081,0.20784154817884826,0.13923075146113106,0.6167634710492649,0.36135909181972026,0.6526505271872609,0.08488755299740358,0.12885100124926518,0.8925242488590686,0.45270171800127446,0.6613306253192484,0.39102955210248536,0.37700614142266176,0.2975526026566022,0.5904461655201441,0.46251177224867157,0.8580864569752149,0.12148369561120931,0.6279771391762954,0.7812383846127537,0.7734196716333845,0.5464738359897272,0.020282436207149868,0.942659037035541,0.12983322800406705,0.5759135654372156,0.7795777510415769,0.9964711698458966,0.1346260544753619,0.7255286812607662,0.2983111495757833,0.19514033400903674,0.5503943460148406,0.029266265055426288,0.7643627359228444,0.5323383651281748,0.814177001705388,0.5083628394108235,0.6620391603627527,0.42016621186273606,0.4078425101926455,0.46754010749161323,0.21978963068927504,0.9981607653285534,0.12119018261759962,0.9346100819639929,0.9662656474808418,0.09773641380753717,0.5515090613018692,0.3906508622045648,0.8159868385953091,0.24440710776579433,0.3472148095931773,0.46053064058742965,0.4039205513416766,0.1080102516046384,0.5594403490960203,0.7227033510472003,0.009810299090097008,0.01299400469197165,0.7485077605991426,0.03142194238704743,0.34266859424301943,0.26100780783941024,0.07350469699290829,0.04151606828733079,0.32848090232082083,0.5771776502502852,0.13400040051322648,0.011221239535481375,0.3942462017955266,0.7011211806668078,0.48250762927221413,0.838891274425146,0.4917203046056833,0.8208709001408561,0.18743123564938013,0.10648993573422127,0.06402774981929582,0.00956545657344643,0.9377152524034869,0.7474989731856769,0.972634986813363,0.9139980178468525,0.7680233203506237,0.8356678473042298,0.3308900349651691,0.20443228577818418,0.9853456940809839,0.29186610073536534,0.5912483704609195,0.037409552234015875,0.9187152234269609,0.05479049922043333,0.9325379280431951,0.6041468941847428,0.26388876740460643,0.871219634876016,0.8046169571058317,0.6068799647955132,0.8939508758003503,0.6243438901520066,0.1049039743811997,0.24332925572531328,0.6989293605667564,0.48915912299689945,0.8476925304579861,0.8520181986688611,0.8214548883638801,0.7991066059002534,0.19018868956927681,0.9744494019829626,0.036817113420146486,0.7336180501954719,0.38411304255870626,0.8775797296513865,0.23169185579387652,0.4270757302591732,0.576432656372247,0.9333373152884252,0.20825597511022154,0.0011458903433929635,0.7243801343109195,0.9378476929252544,0.7038216235600094,0.07913905205161709,0.31107785294824186,0.18364453982622564,0.7828486934134562,0.3112878091107203,0.7700217112969459,0.21927221283989495,0.42497155208681714,0.8978385151908796,0.2541602689999274,0.7923186468971899,0.9622614037499855,0.15095164260162064,0.5682199442945675,0.792114647090221,0.14451198453363445,0.21082371852082837,0.7658083797771018,0.12573324499250216,0.16177190241407424,0.3528998109389121,0.3634629119297468,0.3268390164971262,0.051458380245646085,0.26065143353798725,0.42701965964619704,0.5933817638118775,0.9467317692744037,0.04178933091491621,0.5653336504109052,0.19428857549115208,0.9248574818959803,0.05179631385568784,0.5626477064714215,0.6694491549601977,0.6658294114250871,0.07237215897160243,0.5787362943936074,0.6218883262800114,0.8056818162127828,0.24721056315621603,0.8294690372759184,0.4170791692459528,0.2625052890066848,0.7556314971807874,0.0594267699215163,0.8808611475104138,0.41321991783178147,0.5802908275923022,0.5132201461352373,0.1887815075713457,0.2741132353111533,0.7923365436807979,0.8056300191448673,0.5664973189598799,0.37348879787853084,0.3764831461760636,0.8713973656613048,0.37592973215626047,0.6646219283438548,0.5491363397893343,0.4917170682789489,0.6130168087755228,0.0981733800250355,0.9743007370864407,0.3712123729842911,0.905469760062896,0.651974217247481,0.6902940346427051,0.3141644275465294,0.3851884470037068,0.723257244343847,0.5805521663895039,0.7523594840637744,0.6108464851702151,0.7331118179264708,0.6752407359141042,0.20139828179758434,0.1685635529498699,0.7139742814541419,0.34952689573791074,0.5673337131157452,0.8876959272272831,0.7962133383299701,0.6632970280545831,0.0662706164179292,0.6686346338804963,0.3992355431743575,0.07194111203448972,0.6433256670325742,0.21640901524544987,0.3901758309068908,0.04295926329840327,0.3580550906802482,0.9083380557880982,0.9804783780069817,0.7457829302905483,0.10015847246648746,0.8536007640051404,0.8255148406092063,0.5536242404134903,0.62224939998867,0.07648058659109114,0.3885455920749832,0.8579511452923401,0.5649658893385594,0.9749344623896903,0.8580748000996739,0.4600082833332042,0.890830560153882,0.3701712400862367,0.8718543587932817,0.8622930750373559,0.48345177359639346,0.6478631720357129,0.6711336921358415,0.7793397794956989,0.9420134581645843,0.4313319919497407,0.20962883217979789,0.9215788085963785,0.9802779728344282,0.27812416574618304,0.555946091855761,0.8164154560383705,0.8729609224581458,0.7400083180064609,0.38578546981073636,0.25017312043198014,0.27772541675462925,0.8292027248611378,0.2432710682111816,0.49336687857002404,0.32385629081797407,0.7653068279818429,0.2521675306386768,0.8419877294527742,0.00608403335020502,0.083371457207851,0.20185063032683725,0.07016055276537214,0.6082087074806104,0.664695735178682,0.5460772609015545,0.7768982872430159,0.9587297024322776,0.31078599155269937,0.7593616398640206,0.8693378697281444,0.9157293164848797,0.7225562067982361,0.02063497172704576,0.8204065683381476,0.12786203121503714,0.5154620367796838,0.5768484126959916,0.9151966033470589,0.2588282585446131,0.44345563711896685,0.5144537075647153,0.9927089046769944,0.42374918692852437,0.25169078576598514,0.56086420719122,0.3189079423953112,0.5653152308278053,0.2257052224353755,0.31905650653965645,0.08860772784456716,0.5843304552496826,0.6263192953953678]}
},{}],114:[function(require,module,exports){
module.exports={"sigma":[1.051381434790909,0.7954895815658158,3.72276504737889,3.4640603177089813,4.051592596494914,2.5139670290237692,2.639364562604829,3.3249025695235113,0.5214248807236532,3.293969203616096,3.527117040073491,3.1188171798885076,3.88874670359028,1.2169716209091508,2.4632873320652116,4.224036175931935,4.931668532621723,0.11367808245025479,1.4326707682955586,0.37574882968199774,0.13442678339230518,2.573032931471273,0.5979111752728028,2.280358206175573,0.260645585389252,3.6289549193646007,2.830188894038489,0.1831197101843418,3.2486976534044585,0.8330569992928061,2.467380013264293,4.430296474396843,4.520089861256741,3.3454158436176185,0.08616984990727605,4.274174962497864,4.580969139110476,1.9303521031973214,2.2495375479364563,1.0157293338977247,3.6597681066518217,1.5366572344377583,1.3954626355504307,4.744414433789688,0.5638021546637018,1.7577432857606612,3.8763100106717063,2.43966287452562,3.136382028565662,0.7279871281128747,0.5847887189223944,2.956168671002568,1.3803305827287682,1.8804774544674374,4.915749540586805,3.105491950964112,1.6985068819869564,0.22177312445327835,1.9641535833359958,1.030485112186399,0.3553897716498611,2.044356574796735,4.150501487004203,2.0516543407827257,0.21408893522012584,1.3962067586084659,1.266549544820773,4.6043991690938055,3.316851742806798,4.63736130952574,4.116766476235575,2.1539221352285187,2.4155800382431583,1.2946547644604744,3.690012512326266,4.645735161128275,3.8423701209809225,1.9429149705803028,3.3250078475354403,0.909409595298406,4.443542468447323,4.819255490875833,3.420816350938648,2.494814033897973,0.3580658309438567,1.5672681706383762,2.1943944813814897,1.6739160154857669,2.02040964918813,0.447437966886306,2.262698256224438,3.2641335781120775,0.519853707171255,3.474082806385239,4.246540713188644,0.213286955922114,1.911667093386069,3.347236664056934,3.2835639411180084,0.7623268661134341,4.032221496400065,0.7022844883444745,2.5548023104449125,4.809444652969895,0.6327516808688327,0.6082059016825725,4.461079580610869,1.8392331044902765,3.75671870925855,3.0086462236534075,4.863040381255193,1.5611663101591178,4.440507530736156,4.797376005669964,4.68727241144992,0.5006770923790005,2.0104000550437586,0.10576136981606088,3.0870067106987142,2.7110693017345544,3.2783411996949985,2.87775641723941,0.010092636558782786,2.9776401296410135,3.5796575146402843,0.6711372200723198,0.4712555129739271,0.822510240572939,0.04549588580642916,1.3413544229577734,2.5265369695620024,1.2482370994794179,1.586114843919172,4.548895875986945,2.287193507449339,1.493572898690052,0.21148979014689928,1.0127869853669957,3.976022559061798,0.9195077153341591,2.5680204866956844,4.149678929227686,3.5616997195676845,0.964926695775129,4.572531375264224,4.03197733673657,1.041405222991193,0.866974029612364,4.701031910593342,4.084820829665103,4.189786612645224,3.2429911758982097,4.456726527753764,0.002750403587030714,0.657538915734267,2.6666367323680507,4.593937194754048,2.8177113000543565,2.0036066618604087,1.0076619707163859,4.221665946598576,0.10059213461418914,4.836446112056904,1.380581707378138,0.7533991423283315,4.367080984107988,2.9595054519049215,2.193215606993034,4.707645451297475,0.05272193410960635,0.3599635027379344,4.766043880142173,4.203460259152775,3.2882317443202713,1.7234146662433758,4.933339524895478,4.735594840522131,1.7176592975013483,4.205452895159592,2.996875666424599,3.988821958209734,3.9006457477816827,0.19793502814849373,4.764522883635793,0.07254763066051884,4.782101205163723,2.3845942278985865,1.7390171262273213,3.115918335491714,3.8926936394499134,1.521078444018441,3.975782422818961,4.580600113953398,1.4956808856022907,2.61979712274393,2.7802793610267686,3.5774543981828666,3.9970714596183865,0.756992361219665,3.259487394102867,1.2237440195855631,4.974723218736634,3.0450621149326196,2.8691435999770754,2.6036384905438625,3.4880817485695124,1.4702010328116288,0.570286058810352,4.984313199122818,2.3932852195313425,4.219370552176257,2.641896911405407,2.4599480847534494,3.7727182326750395,1.6529616604412334,0.5879540398337124,3.1250841731767167,0.8687185772720973,0.30188318094697575,4.670321226990132,4.564959602618948,4.806103202598981,0.6594112794389329,3.0124086212520784,2.4971238425892492,3.492378649492638,3.9994658127403193,0.9150604463727752,0.4987542736818096,1.4798016023281457,2.2206338952541205,1.4768832927782272,1.970556812815163,4.881059053976793,2.7353188725574817,4.50832449519897,2.9350752820455805,0.3439720536100932,0.4273128142632199,4.033329736021516,2.958535785348251,4.327468365864925,1.4656586184094489,3.114912529585178,4.205884258967847,0.9548205110205799,0.2661085752785275,2.320694603394391,3.1860322139977573,3.0824987502067733,4.934767781068499,1.274378784730481,4.48899739094553,0.9799905811544729,4.993230690757483,3.60838496693743,4.583533246723461,2.38515924139541,2.461251250423534,0.6984518689756236,3.8613136378072097,2.871301260746526,1.3677384244622837,1.6940359292238527,1.4082090852196472,2.2370132595240024,3.6680437961851133,3.259677408463577,0.9533168264405256,4.985817494613782,3.8852055086752646,2.8531576055166785,2.4665241832879383,0.08251684468486342,0.10130969783338495,1.2757739683815694,1.9564406347758534,3.653658571585333,0.36283169285132755,2.162256989954685,0.7554613201440297,3.8498808026365627,4.688255838643015,3.5185343876354267,4.010459254048385,2.515885319311394,1.911463230037671,0.9045383301377885,2.3888126427965775,4.658932828053668,0.08041251005132088,1.5200867658042905,3.388344945748658,1.7643458598364548,1.8504455450773316,0.47609087464864586,3.763395979511243,4.234064185605613,1.9289297634180225,3.599940358878891,4.448510127876312,3.032561773581637,2.0696714423365457,3.047606272782988,0.3838929890637477,3.94207054656364,1.2741370421647535,1.4925515262143219,1.9049421937553235,2.349757724869698,2.68584557819054,1.6953360267662376,1.9877824901415486,3.3366281508026505,2.714930512561262,0.07920158276382705,1.7411936222158297,3.6625508816776664,2.3582934889309715,0.6134869194102532,3.418546821741489,4.289000699900431,2.9822642538762545,3.409646937854882,4.327099386567536,0.8765909414570827,4.59085593776566,4.007839481074479,0.42097159796006367,2.65453289448486,0.5250681612453356,2.8183551373460713,3.53080870998372,4.807471709222534,4.093553135454594,4.675454561977243,3.7534336961923276,1.8553925259588289,1.6174297113047365,4.957523122746455,4.316799340902973,2.485668096680559,4.235283483504624,4.4096804048143,4.2674621559345045,0.2608483739848144,3.2255941603748672,4.8188141988744455,4.601922803345493,1.4553448857524398,3.5968124571306284,3.3611901702574998,3.7759572363440066,1.209151801269972,3.6363489274419045,4.879875402570246,4.764405402301341,3.241205889631853,4.919382666083485,4.508993133477778,3.100228946572967,2.498780891278062,4.19002368167677,1.4489378429878286,1.0585937864275075,4.399797460114543,4.077323143469721,4.587267394523006,1.0782404208860552,1.9179997017099015,4.262217814885757,4.994805374531804,0.04243042191514834,4.667031225614007,0.6248815585673906,4.607239362491874,1.8019326665813529,0.3650493718113679,2.2568145408062454,3.3576088160440243,2.2247506649260593,1.6476973375822646,3.832625248944903,2.4965899726652063,3.1341444636369142,3.92446035701039,0.8422687806692108,0.060356563684292874,4.995429328260874,4.283596897918472,0.31918530882274143,2.6587652838257103,1.1854331159238785,1.9651910419705754,4.261849044052224,1.5203158968638775,3.7156014065433784,1.2019351944107104,4.681192896906806,4.8499878465687924,0.40565993581288207,1.7593711513781563,4.771783447896065,2.3143796363584435,4.963898270936213,2.038872027823795,4.617579239703432,3.13382468839332,4.791896068439008,1.5914420371931637,3.423362189554273,4.860648618128489,3.7877246879723647,4.864266801055258,1.412853235755006,0.7570930542959631,1.6028836557307347,1.442223912755215,2.706395975081717,4.407682192924698,4.428233405789395,0.873908528080507,4.312294271730082,4.113697369548282,0.3709134731213537,3.303804950275363,1.5989902930744437,1.8934336454278589,0.42387575856452586,4.7601161291237055,1.682438154703224,0.44345130660542353,3.6491653011808656,1.0214576904398565,4.552089894162177,4.219950710366522,4.94684711108637,2.4881802344162707,1.1247691003028515,1.031995192558166,1.5948721955674183,1.552358917516311,3.9521899357974135,4.920895743338342,0.6154200539191801,2.707183707254722,3.461595544069762,4.2964386800305725,4.635927633574144,1.9913667626649112,1.4248265158340134,1.1415895933092102,2.9676036956858267,0.25922087949369566,1.246482028414665,1.3512583250629617,3.821788357580458,2.7131166407495444,3.686094681801493,1.2184167936121937,0.3336809206585034,2.0896102035259636,2.6469930481927886,3.1020697367849106,0.5811238198820001,4.750660756359551,1.5103571421362294,1.2934734477682441,0.34524129149420824,0.7001635293415531,1.4122905822415721,4.424123741894491,4.99200745797288,0.6485314378947526,0.2632072933292873,3.7601070639969802,2.470442178473886,1.6502722991319074,4.6440991417692326,4.9983449243827724,3.4625915756130565,2.109297759524451,0.7032803409098931,3.9246890810584576,3.509036124497187,4.960920743041699,1.3653227093262355,2.4396619049655364,3.006000673240986,3.4901922193212265,2.621899464972295,0.9406218414405565,4.530363812151073,4.7802337885672275,0.46231736443715254,2.594896398223704,1.3676706301934571,1.242434361716488,3.6490819389413853,2.509560987673587,3.1825602618665827,4.319426253830853,1.4579653382177793,4.143923589197632,1.7783422245462877,4.337082972813267,2.70733904372367,4.121694219074742,1.6546879212728527,0.9866353518748316,1.585605668500023,2.318397046693433,3.8515824048342684,2.363035562751248,1.557964854743793,0.4409776638667995,0.478187593224606,3.785647190446456,4.770599432156272,2.4227027387167466,1.4745655119393886,4.536942752684622,0.8676603147690187,1.6337364324175396,3.6821713398237077,1.603079489770557,2.4960305205220057,0.8442452841110437,2.93588686446145,4.522805893167396,1.9191200763542648,4.578600952906968,2.619139727443879,3.143143456573365,3.1942596518293254,1.9996382255935707,3.9741280756638497,0.7876610195975975,1.1099977431267116,3.6262292374525753,2.7455033521806573,4.7077144727977585,4.861135605782586,4.242566078541357,4.866176759391675,3.905009931222284,2.486988802222397,4.1186376037180175,0.031242096110226658,1.1071380332247172,1.6581026342845762,3.980671780438275,0.23735118689521717,0.6361046617062815,3.5651934516430517,2.3492609700078146,3.6056051198957073,4.327395986364561,2.0233238233388295,2.2191568393620367,1.2543673460627303,3.4021204300867467,2.4790413239013533,0.11791848010638928,3.949601335552282,1.2668398205798426,1.5055993515158372,4.056589438595716,4.087427586984721,4.693461928909698,2.2415263244155916,3.720661647964959,3.315742783077239,1.2681650464481797,4.867852834227097,2.535232170944627,3.8256110927903464,4.660912414684012,3.1932207586569703,0.6054777128207489,2.207716567589703,0.2654306709369969,0.6723590585289296,2.0805432679121183,1.7779259916286627,0.934167328551756,2.6644417998370082,1.3755621842126076,4.004002436805977,0.6725690075670521,3.535324078705162,4.61413187041964,4.015511531656719,0.30304482133343025,4.447754995860198,4.216619395667172,2.2777019738957027,2.131701639991508,2.5963618364678465,3.121505237777754,3.057466704342957,4.788833865473675,0.8575905299002651,4.208461504397086,2.563716064517413,0.9985340667688136,4.589959421823807,4.891906853417874,4.662823165481692,4.105098176110613,3.6671781969575723,2.640005435011874,0.3298578751461345,0.12817031831811154,0.1818998470647315,0.811000100691005,3.089278348317598,2.1541293213484582,2.442612954010497,2.954046926649343,3.1517245876716227,2.602676708351601,4.188491516953782,2.0053386598661724,3.366718024311186,3.1194058768192723,0.32642849905983873,4.180920353457809,2.78098861545495,0.9490557835793767,2.6846039748155945,3.612945922006535,2.700084827856216,0.758906603800924,2.60859330204673,4.390076419887812,4.952907492144481,4.523861352064444,0.9678956687173268,0.2614867555327116,1.1664511272972866,3.100834218628594,0.18208255731317458,1.089550993217252,1.0244652546016098,2.768655284938226,3.7064540968726667,1.1931273030785639,0.3419611459907679,3.4326568125933976,4.907728315231877,0.6932695808004752,3.9616763695905166,0.5936321818385337,1.1705953706233152,0.5334517631760993,4.231119161600264,3.264992518416733,0.26619382086269794,2.639079592442024,3.039150552157791,4.7405721413609605,0.2386895857422855,0.018578068111222423,1.3664949504179602,0.2165945166557759,4.774297629434546,0.5097999196210445,2.1843941403637923,0.01960028895119592,4.246283769801512,3.6721592822123226,3.6878751058226245,0.8690867772401578,3.2612619092034656,1.9762468897328256,0.5053646467553197,0.47600417352072766,4.155239532914164,2.0202056878240757,3.6083682404103357,4.957881529338318,4.366184850265242,3.3481652715428,1.295141869280514,0.8685580863122855,3.5464960858997685,2.2093663343024996,4.371089112914652,2.957450186377786,4.751489575059603,2.649678721089935,4.825931485185112,4.617796596222671,2.7886755473906923,3.605395882938894,2.1082462473037045,3.5420944477281435,1.44367965385501,2.1690351492820326,1.910739790117012,0.16690644617720518,1.178411257666907,0.8982309219377771,3.6222022747003946,0.889593494886235,3.63547084605257,1.7343845397696067,2.7708060291606817,0.8048126634471375,4.928782541197172,4.08931806670683,0.18120352568540166,3.1430835284153025,0.8477781398082429,3.0422834034861856,1.2286421066591813,0.568881322017073,0.25544474128451955,4.031828376006318,1.0938324656472653,4.758469390209309,3.855869459358691,3.0060464685605917,4.392458584780644,4.052149962083128,2.0824593591025087,2.4534395251541508,4.566336562322535,0.05266542491092041,2.6046786083093467,4.512627632135736,3.8506422915616625,4.53503975716269,0.028187846720968412,4.9780180796225135,0.1936553452324874,3.8694347190223,2.9978421262596733,2.263954912028092,1.737311050220538,0.8677539031962977,3.5945267449634533,2.786245753894261,3.2927276195702526,4.320282426771485,4.248910023629825,2.640283110264593,3.7352040384651275,4.631136341562084,0.41020799005792474,4.139241405894558,3.254409007614072,3.7560728904097864,1.0685521014670218,1.6652766861081791,1.7641627707416752,4.527145573098928,2.3220368595983887,1.6236018334342683,3.6508848947775263,1.2918669124531612,3.0500651951562396,0.9998259065600046,2.53721031616045,4.551817420463381,1.8944757955090685,1.0045660722732985,4.826877346307585,2.141217614525921,2.037905201461628,1.0747088109775438,4.6247135700654525,4.337337950655184,1.123752894668143,0.7037565257209089,2.6089419899369815,3.2641918777386425,2.539707648033067,1.4934616215323515,2.139089709213895,0.5387704954879347,2.7778885613158364,2.6944662293105646,2.059873787857488,4.0993437254752845,4.224402929743959,3.3403876051354353,4.4079142462541645,0.6245701828434391,1.3139890910800023,0.9265759287794406,1.5589535007917121,2.8254255818090335,3.2654198357288555,0.119853501607744,2.2481004249933956,2.418991902091724,0.6827071417867436,2.4754479689918476,4.035073154690353,2.9329582724784764,4.86597877247841,2.352560567095785,4.132909193695145,0.6884247301133428,2.6278754467390133,4.2447471300425015,4.265126216346761,1.199391197115438,1.0516242666205267,4.3595904412361355,3.4452866396036788,3.9753614250768967,3.688386131692819,3.569272310542697,0.8348050810087893,2.030395800545801,3.521188751572182,1.7232298792157585,2.3847270532490263,4.501931001143987,0.3419924926898621,4.9146660484694324,1.0224412509931469,1.9691532439830828,1.1923216850546203,0.3081072146799968,3.515719586506818,2.9730303803593685,2.947584880488041,0.22245553738245327,1.0042377941371794,0.5937577579105435,0.9842120105841201,3.045647531930765,1.6855684675739802,1.7034820597147404,3.218942780133962,1.977283176835608,1.949019662988598,3.3105233336702398,4.642724526853847,4.485760478043228,2.8167567953713615,3.9584047760852292,0.013760860423741583,1.5469201983989556,3.8774635317649473,3.5885673030398966,0.7312497831198206,3.104528922687262,4.702816718259113,4.039318680754076,2.903254530033811,3.76093097128271,0.04400525123418153,1.3532428436922261,1.512769443283758,2.7223114933002557,4.135284948245701,1.4998615049973374,0.5134450416567282,0.1802802548150262,0.15420290833885741,3.9960976676232516,0.8483779142703352,3.6236401109435,1.2067319061839377,2.812930887158319,0.09840339851426627,0.18671086442439533,3.444924937144104,2.663021387967431,4.743872694236111,1.731237893917471,3.9818923513429114,2.510234594321635,4.43608688281773,3.370428000605594,1.4307583897145526,2.625038155738734,3.649363774950457,4.747537302409689,2.719291925374281,1.2720578982143294,3.2902991189151196,1.2625382190327228,1.658617650190648,1.7772087171605,3.6083669085890193,1.2586727215491078,0.524525324662336,4.889287666656401,4.907064886787026,2.8096304913178596,4.471619402741038,3.077552991167616,0.279439697088929,1.1557835802633332,3.9530104421800982,3.0931963724444387,1.81057529009237,0.5938025812670289,4.528469026165781,2.686460198049394,4.818740300451907,3.6956306017613616,0.4689509757217425,2.00358571469328,2.747804797266298,2.240358635248465,1.4240449169842273,2.9184868511678594,0.9001059605856632,4.572681407278666,1.3600884864581175,2.0199578719738733,2.3418621560693986,0.3175574422551175,4.475350788010606,1.577775613256931,1.5886746632715143,1.8470597592999483,2.016644866569016,3.2494734953597657,4.072270346303625,4.768569582607646,0.9001811241956359,4.297133203543611,2.721038888179618,4.970719525010492,1.5925583227605467,2.091192499193385,1.4266752985503584,3.6306995690591704,4.321890916596152,2.054311991097757,0.9844871584750314,1.7788229682775647,2.467075965208129,4.32105352663574,0.31155561389974107,3.762745883126036,0.3200524748101563,4.208478631021684,0.13584101322244302,2.512060429112571,0.2697050563649339,4.727246136603958,0.21129497236171968,3.821851672766783,0.5959688172023381,0.9288192845275833,3.936542303856779,4.965615313701396,0.12308541045774946,4.1526695805427245,4.395045543040112,1.1700499623752147,0.7159215517577411,4.499041754154255,1.0763370565324126,0.4317913807409879,1.7819208154667743,2.823664488573041,2.783611230936782,4.525951199018159,4.6046153646141175,0.5430682831368217,3.3794421300458843,0.11823419804788404,0.23597232632347476,3.7700902510663683,3.521233969235672,2.174387266717689,4.0754841566481534,4.979175008430671,2.702009363030208,4.502601091893251,3.4308760065727473,3.8367180616887575,1.845532623611007,3.4356174898027456,0.20803345591095534,2.5745569403390203,1.8812787982690105,1.0107403543504645,1.33055166923837,3.8309910801699063,3.835586657163763,4.816406129193375,1.26592301209842,2.366837071718569,4.704072203199464,1.3739731928103527,4.541557685981807,4.788476601772917,2.18571664901126,3.531067897635433],"expected":[0.0017290367547807173,0.07718473091274694,0.0007899602720329623,0.20037130796899774,39.25943087085218,0.016755366633301547,0.19613937620874378,0.0005364550153328996,0.05796277180113057,0.07515421032860022,0.00028875172045222914,0.0020670834718516727,2.5637244957363462e-6,0.3637240060783352,0.0015225458091493518,0.41031892601542963,0.11999663148019986,0.00042996855704121543,0.00013962461059096736,0.08456407699735422,6.230547212691522e-5,0.04782717758974473,0.026540161493732617,2.454550416333929,0.0003265712281664095,0.0005404980284938999,193.11256242241825,0.022375554887680282,0.01371239768423222,0.0011728769165228502,0.008257743762771639,0.0022580281582916164,0.004627030135681821,0.01735779438478745,0.9398196211676607,0.019295469526913814,0.7294641908055779,0.012382768802584685,5.191084950033799e-6,0.003189475723364676,0.0033129890585407223,0.019764941756051757,0.039778214726383744,0.6662121177774932,0.0001745745570432717,0.00034125792073197534,7.15310215990102e-5,0.0001228475036119832,2.118880563526294e-5,0.013705349417340636,8.170602255297939e-5,5.5436300283144115,0.007220732875009974,0.00015884943291674344,0.3996028959299969,0.026619927747741697,0.0009227692652392687,0.0001787373325316659,0.0003876772376817088,0.003935371390841435,0.04278077258271514,0.00012317464435260023,0.015062757864110234,2.468961593694871,0.0035884431546914343,0.011975979561360369,0.0008117721963320425,0.2805674933118408,0.001825866624558576,0.001202858741721739,0.11270149840784868,0.074854633020319,0.03726826102352575,0.022076939397846572,3.220091257073694e-5,0.002772833407675176,0.7095237976855853,0.017359803964892576,0.7615443281207233,0.02190481103278124,0.6154857643593135,4.998519457719049e-6,0.2798704275468355,0.0005718731484564303,0.016614100936811635,0.025480680376793782,0.2776762045214296,0.0011796492678849712,0.10625446351070816,9.954806928528536e-5,0.09524194652249952,1.2129464422045763e-5,0.005694132835736752,0.0018016463038724284,0.0008160443660148114,0.0001672696271189399,0.027645665037666835,89.12479439915184,0.0013079855797319432,0.009209954193847585,9.146100852650115,0.7510426383012931,8.470738004907301e-6,1.9014151875069685e-7,0.00014514006662280366,0.5606148190456877,4.571680202914175,1.1105719912279309e-5,0.0022600998887234046,0.005251128274669182,2.1871510785695142e-6,0.0142138607260602,2.796425061212372e-5,0.000486883590456713,799.9344307049485,0.21283782534140497,3.725582845150706,0.00015148230299553907,17.35862110500773,0.00236646103903421,0.05826004179013789,0.000259036256850248,0.0003090713736015711,0.1779263624315928,7.148862249505619e-6,0.21323349368226976,0.09488956430197282,0.01189511873355709,0.11857615087362415,0.0010705827464151105,0.7650722719994805,0.0007834073926282614,0.007974052963673126,5.1519112342352474e-5,0.3966333490182097,0.22981245419276286,0.00018090787766897375,0.02730573647978305,0.3572997235877027,0.00932605444926241,0.007456538344817733,0.003105173232564778,0.0009414097433517191,7.281277090941297e-5,0.004421363581986623,0.005047530491317237,0.0007301510721462972,0.0004788207619604867,0.0009043886075339627,0.7273287511277435,0.026902996141804095,24.742832108314815,0.8504681936573875,0.0021259327881793027,0.00010134558753100509,0.0019719285741591095,0.014577768781651228,0.0003646952537198443,0.06456201774020616,0.016546678659955814,87.29123589531616,0.641588165407099,9.153269969376505e-6,0.0006362014518149733,0.009591360256978508,0.002599661204808814,7.847720492724527e-5,1.1000654576556708e-5,3.480620727013088e-5,0.00037689191006157186,0.6455853324065093,0.0031639733861734587,0.01638243594087284,13.515342322839139,0.0005020740253619072,0.043491774653960605,0.08052958660414201,0.0023061748374527615,4.88025782500997e-5,0.0063395333197160154,0.5306776510203817,0.0011569687689899283,0.0010334388226687157,0.010276704913076095,0.4001010237244268,2.623694954053238e-7,0.8090984408209131,0.14668795405244758,0.0035958383060930147,5.958910799257865,0.00013363787164630365,47.23908309413467,3.007935522056001,0.04609586812815384,0.004579700083054735,0.0039753138138679065,0.00037507848163658043,0.07689912550498015,0.0003379641902072698,0.04758931799313283,6.209560073536371e-6,0.017018805468274386,0.0012413001882734418,0.00040112813930466757,2.536025103951443e-5,0.002725237200436599,0.000866164443303846,0.15284936748345618,24.04001721536744,0.0008224289380268881,2.5368797964044933e-5,4.189543328011598,0.00021692925826972514,0.0030213202048639774,16.291505766514533,0.0004946219013488431,0.0035019691941794856,7.176448161740398e-5,0.000265304902575666,8.300124974973807e-6,0.4030606094594682,1201.8266315483147,0.00010703923362683141,0.02510403039694855,1.8137514684389018,0.04168025724758442,0.0781025812050956,7.334925035251889e-5,0.00021749931741324717,0.0008571450143661937,0.007836926522189954,3.6731048271106737,0.006184204215045808,0.000598756871188636,0.03059172623219193,3.5377559448213467,1.1642719886515147e-5,0.08882886416331667,0.0008111826808111695,0.6738102407060197,0.11842903122051793,0.04406774631846759,0.07418257241671408,0.08131152935136822,0.0016947667432606842,0.41002524439627025,0.06765852130072735,0.014216560031255206,0.011782442490925072,2.6166952839779368e-5,0.0691944348901443,0.08489491379007316,7.138970676737217e-6,0.024065450733783855,0.001040770948518578,0.0017581459122015708,0.007546528550910668,0.4125728876402377,0.04750798531013544,0.6114223176663407,0.10027976604286472,6.984486456355943,0.003024251773880124,0.0016101709981473922,0.0036549860119706886,0.0006383084181948549,0.0036724279018267194,0.04037314894597746,0.0007106311376736242,0.0002571458103955938,0.6160230301015441,0.00012863472359367405,0.00013282745336924183,0.0002880675543261385,0.006988377634937528,2.796542292279022e-5,0.0001720023369871587,0.9426910130756695,0.0023856602970163698,0.00015815819452633952,0.0009236979291086076,0.004762549274304666,2.4413709681980566e-5,1.388130655653437e-5,0.013879968432028881,0.0030049685769292255,0.0005057900280046731,0.00015740789280604918,0.010119455122718505,5.245725217511209e-5,0.024175350072756466,0.0001358695615908696,4.8916158603127265e-5,13.706180317402568,0.654176855500603,0.00026257539606918903,0.00042896194489355083,0.006800205344775464,0.0003590153668432578,0.000244292907456599,357.4777674825852,0.004046484325020779,7.772223231112241,4.9692802039171254e-5,0.03374766761157085,0.004542008975450238,5.262604135029235e-5,1.6149115971589436,0.012188400554676572,0.7040115972694314,0.09096212482210861,0.0014892040911704987,0.0002904212613652491,2.173921493564186,0.04076940712741367,0.19741627972248135,0.0002808023054110017,0.030254549888630633,0.01442033886946984,0.11513120835391041,0.016475394423173015,3.4588837567289736e-5,0.01934731056991121,0.08145745935968964,5.642478495056333e-9,0.0029741730294102157,0.08145616612382411,219.0804851991901,0.4883244310626814,0.01061912813671086,0.0009148676401640678,4.446316371243095,1.4082592764626637e-8,0.013082723717398317,0.000839463127032328,0.001164058317766933,0.12653917336511575,1.3689340480166188,2.2356308891746597,3.351694314503405,0.005910300904321023,0.02303819818224458,0.00020662345621318503,1.5611494664703544e-5,0.003440007292281824,0.03503843454301203,0.010688327672342061,0.03821192209180501,3.32935739616398e-5,0.0011470497673132852,0.0009609537974256995,0.00033933910014869465,91.61818687437429,0.00043599280231247027,0.01197837030722938,5.9383770498748705e-6,1.5287624634376503e-6,9.350537561512197e-5,1.349130497461417,1.0942239177166668,0.05101255454880135,3.8386143145017075e-5,6.209171665247007,0.020126092895322904,0.0030790348022112436,0.01212691720956181,9.5237887578035,0.002767454201735286,0.004465517717524271,0.18095090172481293,4.501624714199341e-5,8.706248517357489e-5,0.0011132987483026102,4.143830671773423e-8,0.012647319691654203,0.09351184663261825,0.0004016616381756638,0.0013811696208668644,0.002585149541373226,0.2979163134426922,0.0034512053387878994,0.002343120846576567,0.9049994861510089,0.000703287655081724,6.610635103959409e-5,0.012294183902121785,7.991351561506921e-5,0.07205413134108393,20.028851292093925,0.016358404976961463,0.00830386408887479,0.0003010606110284339,0.02154977157055648,0.004165422487142535,1.1495947137869899e-5,0.0004814215192304244,0.01972529209643188,0.004335467049855907,9.287681817613459e-6,0.018042754616972294,0.0014378118780191812,0.00621354119744579,39.17215376076351,0.00012203065559854874,8.584976769433923e-5,0.0003618956267936221,0.0052210605700962745,2.6232756782734064,0.024595297686993044,0.0007098334526894302,0.008851978328651816,3.9240235662511976e-5,0.00902037559857314,0.008967677289266467,7.05042011912434e-5,0.11823432244324679,3.3702067441837275e-5,0.00017358536835217287,6.064112042545738e-5,0.00043297594282780085,0.0013765565674627924,0.0063176301063344875,9.011917183321638e-5,0.2943473230051612,0.12454338418696952,0.8943809993732582,0.003106565392288381,1.3578851443198077,0.00022758093445627778,0.01415324159750233,0.00968356805921321,4.2272266391482066e-5,0.31106961392258475,0.0005728296468859661,0.0020619352707828306,0.05755697968133032,3.0355853364767217e-5,0.004849910285916893,0.007969812217975528,0.0002208202712601203,0.006917916640882139,0.2696800290028638,0.0007966318160516084,0.07605627361289637,0.04759526038600348,0.17281809754619354,2.260027490411544e-5,0.00397013475627585,0.04080739122932947,0.22093983478294468,0.004994593187133333,0.01932630899308419,0.0298317617392517,0.8115349170269364,0.0006470691287614294,0.00020279879734534184,0.015636291178514977,1.147500637725907,0.013891765552367194,7.569132182435246e-5,0.15569113629160308,8.02115268234316e-5,0.0006793743335977757,0.556859371037555,0.29811117441191726,0.2355207584650284,0.003969103691418597,0.004394924754486602,0.0017184268620071895,0.4419038324466497,2.323001188680361,0.012647613054436232,21.04560407707821,0.00532381685412902,0.7964892355060427,0.008504313043080124,0.00024169323273956006,0.0002745466753539405,0.0009577426061131621,0.0010838777952390858,39.383980236667725,0.0006511864268976594,0.059622435497528534,0.0001440455697069998,0.028499921088720067,7.875192692028331e-9,0.07249712280333659,0.06317886588147492,0.00015351768634178656,0.00025552324627909815,0.0015789893233363575,0.0011567992998546904,6.319032905515657e-6,0.035947167069122904,0.00042610823688660914,0.12007795740253836,0.011949673906564852,0.01207746504259077,2.23590226496891,0.004801766137323911,1.8837945031220303e-6,1.226560313907325,0.0027604153826947075,0.043226790556134334,0.09299272164121633,1.1822713177078878,0.000560442697165478,8.846439388520281,0.005577986604466508,9.876411322519703e-5,0.0024467804147703153,0.01733164419312478,0.44889342750199535,2.7503729755992784e-5,0.002059198456522244,1.7007599693891429,1.9033737723383815,9.953273484134891e-6,0.003448925686820227,0.0004859176874202469,0.00021802423020641834,3.507812646567946e-6,0.41334911802865515,0.000437577148790126,0.02996028833695984,0.0007878855649679939,0.0035626383876901082,0.5071801353344131,0.16444104491609685,2.7700027154632443e-7,0.044831730954189054,0.04390094245347716,0.3284516584708608,0.23249515756500694,4.1819904838173945e-5,0.016584071056879764,5.946208107282384,0.014992992402461063,0.0033774704262370843,0.0016658328634189695,0.0004912689166404106,0.6243243596604008,1.7942835285028864,0.029816173428126036,0.07999285323457125,0.0010665149763743201,0.0014366922550568806,2.6356553493880895e-6,0.0010449869812356536,0.17661506772130603,0.042754016780337405,1.2551489991339867e-5,0.0027698336784146346,0.02941757995962528,2.4020989798345564e-5,0.03618377025145283,0.04080150683530041,0.0004640166253333442,0.0006758285711231579,0.004572965499093153,0.0015166651469653938,0.2017944137741829,0.00030022299060706713,0.005793600836553657,0.0007377828824355725,0.2526130961846992,0.0028645612268634684,1.260224518153449e-6,1.150888933071157,7.17735629695058e-6,0.6162112037426635,0.13759715803753914,0.0018639426935864998,0.0425952934101002,0.8002310940445626,0.9509715064074322,1.084581105994109e-5,0.37979409639549544,0.053125884464014256,0.18237103402935972,0.042730638611704015,0.005327030313347476,0.004890674180015971,0.0007288951480194912,0.14694834854698605,0.0008945997341990862,1.5007337552066604e-5,0.0014015536038247951,0.016821106541130934,0.00040422404549216885,1.2412321090353303e-5,0.0005247577853751124,0.0024275182021023054,0.00023469088036063868,0.07728906356714495,0.8934432295546887,0.007750816266139439,0.12457059944351442,9.184766828737785e-5,3.6170882716741044,0.3781196469084255,0.030277261830644418,0.0007677119467488357,0.3392285134469439,0.1207229141987931,0.048984395592007804,1.6877637598141853e-6,18.35631953155205,0.0006266102835412336,2.861849726521842,0.0011632321545932732,0.014357634626529772,0.22992147724965623,0.003910477641269007,0.12368439118436154,0.0772126974364054,2.7323249152221697e-5,4.549498982624659,0.01925804127254678,0.023273235126577155,2.8335833308055154,0.01068141346442334,0.0002376346971475989,0.0005644857478064304,3.479152052129916,0.1443678320893359,0.023413860887335353,0.021944644803291696,2.3040694653341195e-7,0.0008570649749828358,0.00033612796304993735,1.6458635283895071,0.010320617079798025,0.0001194197257318156,0.0010431520652764937,0.061967132624527375,3.590532441189344e-5,0.0004991929585822449,0.007841138697127053,0.15163161761530342,0.13122270572566586,4.36012024899211e-5,0.0006847742556677506,0.2596149631832147,7.07215173326753e-5,8.771849398583133e-5,0.0030996133342813693,2.3858423062449826e-5,0.038810903834319475,8.532780630805187,361.18439965416036,1.034991240521185,8.470297689011595e-5,0.02515420124989539,0.000600748872259203,0.02734337116375436,18.904386877092286,0.0012603137536707047,0.0004029633704059933,0.21683006850462,0.3284266210843196,0.004735802718188817,0.0026084290035648526,0.34824890745211223,0.02068529009795719,0.0082618449005629,0.5208187338908679,0.13671795761086436,0.2076116806221161,0.9510900379728316,0.001147337462039814,0.0002493556153588927,0.04657024557334422,0.025889874717994588,0.007239415256486607,28.181371064126182,0.018738528339353477,1.4037739132007265,0.000313798984360867,1.6312429944796842,155.68911907197293,0.0027575756486003574,0.010109320982592528,0.011949590549024112,0.7278615008407052,0.0077684289770722165,5.047646318093151e-5,1.9611067272296232,3.467727822746541e-5,0.5871011555438799,0.04683559988550039,4.024537433344356e-5,2.018797242303261e-5,1.873152147114611e-6,0.011692690049643292,10.755922945854497,0.00933709416073006,0.013414205745616645,0.02787385395318041,0.740707035060734,0.0020703415195596187,0.0008799524144062773,0.0019094553571140224,0.042081554220965094,0.015832252815579963,0.004631180779149108,0.04487957884675958,11.348964069167256,0.0010683510128502082,0.22147643665695516,91.39045577806155,0.00035655279934783174,0.005324460640006999,0.9558110246322064,0.001631700029174091,0.0003004013840581947,0.00981072811603124,0.9222334763756852,0.0006141211896026887,0.00040613284951687516,1.1226890414452713,0.0028513353778800133,0.014546988488942227,0.1533692168497168,5.017420639919392e-5,0.016322320556340607,0.01183033589294894,2.8580970009969782e-5,0.00012194937580770571,0.06346220552059831,0.0007925754996179062,0.6408919147735774,0.005667412018733638,0.007157632737715201,0.0011769328146446795,0.3118008303225466,0.0003377661234731599,0.003896376767857449,0.016189496685595984,0.05929411143961715,4.409783691036354e-5,0.013000932065271718,8.020631828077115e-5,0.0003103462869474364,0.13455313811057595,0.0011762020439400193,0.2266047550968948,5.2937697920404945e-5,3.1113317212707136e-5,0.001086259881545877,0.0011373746178463442,0.00010264000972572938,0.02609695132339078,0.09405602171021031,0.004978309075561685,0.0001630463978097284,0.43199115025201695,0.000126068761740574,0.004682289239721541,0.00037166777712793704,0.07421911060159105,0.045478432531146154,0.0028663675122913034,2.1985934619846828,6.339339986085296e-5,4.689217497557339e-9,0.013940601151971984,0.5854852846492185,8.620328333860116e-7,0.00021929103686840545,0.05858763258630915,0.002011508845626533,3.593133323895767e-5,0.0006140798605307211,0.001648484803797698,0.11351129634358986,0.018946917527822,4.358756826291576e-6,0.020586161940262776,0.014323615060946438,0.0004580857219191922,0.40628113042842445,9.033592305916324e-5,0.026480146216852567,0.001597221045861106,3.049455649490864e-5,0.012689635041560923,0.005341694610919436,2.5517425348164898e-6,0.00270685001208839,0.13998154575403132,3.1982970939286104e-5,0.03526265403831805,3.185227983056161e-5,0.4024615441449573,0.02696548472963134,0.19897492069972927,0.0007002191577933402,0.008639904310405974,0.005597454615911544,8.04728555223367e-6,0.00044997934708888377,1.3046662389215222,1.040432196281042,1.2941744721501154e-5,0.003238955596612046,3.549114294149903,0.0010173414067185544,49.37144728072683,0.07598554189911241,1.468501606498462,0.0006166344910432646,0.06152302699154345,9.422647366104823e-7,0.00675336969485712,0.001725771118725199,0.01247900941181252,0.07983228597991575,0.00023558362226822746,3.760248980778299e-5,8.137733252151349e-5,0.020981920580907764,0.06470485685791691,0.0005602478768995654,0.00027393029362035175,0.067618502007302,2.6773542370476543e-5,0.21411393003260698,0.07210321031388438,0.06087004924903541,0.18221114515337766,0.00013015124487395212,0.013999680915659667,0.0006375943771216223,0.0009019254352294675,0.004784636634709688,0.002132697421323014,2.7628374815153978e-5,22.332435466338787,0.16308836366802626,3.805365521492108,0.009533567057268414,6.614224106187764e-5,51.2438401133122,0.0005521554428648988,5.040486189587267e-6,0.00014127439550857418,0.5162793644058461,14.485318254431402,0.28827368082411603,0.016916291706012877,0.12437804479944176,1.8891798433818427,3.387540800288877,2.0056064230031672e-5,4.489079546480011e-7,0.01246912315405105,0.0021615561279708594,0.05320511442980272,8.481133082940588e-7,0.002788095372072164,0.5164692792454119,0.0004997501731246484,0.00606180003764795,0.00036509286918570303,0.647995279875555,0.00842605257772008,0.0003192212747640573,0.000422297499226159,0.00015624390940472516,0.023792466437233203,0.030685405423545274,0.00010463443899218371,0.0038043825128907115,0.0004491281851601847,6.721637450280853,1.7853544870754512e-6,19.788721079016316,0.19520666728225994,0.048879544080333785,0.006402138160964921,0.2079432707384286,0.00010094972355132592,0.0010605915106430266,0.0009963223865931134,6.400064526519478e-6,4.9556633661704486e-5,0.8639499435855892,0.001302704005587131,0.06605221055555963,0.010530081981714135,2.093981989096491,7.132300291092733e-5,0.04400047446767434,26.084642979480932,0.11295218188335643,0.00012060595841556782,0.0033348178385938757,0.0010723281836092992,0.0017537961430020683,0.1999990464562647,0.13256784366139016,0.04786342960932248,0.7708683205521193,0.007976699088757594,0.06893635714710776,1.7050307529731055e-6,0.0001481247611098605,0.01801820314649994,0.000819903193118312,0.0028260593999703105,0.045610171073946076,0.00039113424122329965,20.489606671590632,0.5083823502169673,0.005392409727813555,8.898917907546335e-5,0.0001284178636137584,0.1882250394622621,0.009518036567933342,0.0010947896247478057,1.3765076482854666,0.0004365323421436732,0.00012490964610939716,0.12235732448634712,0.003442012144607143,7.635809524292852e-5,1.0300309476196051e-5,0.00022501920918284088,0.009790160798999737,7.594138896096094e-5,1.108041226976726e-5,0.00015030860260237806,0.0049501121338682025,12.718381063836123,0.07736688883360748,5.4426415478426655,0.012382096100476409,0.027713941504350446,0.1400492380175895,0.2247408031695655,5.458471942111059e-6,0.24118125017876124,1.0974422222033866e-5,0.050564509670360226,0.00957966982105351,0.0004391683508739511,0.1682873720117687,0.0028569958981485236,26.969415614632087,0.00552419849461021,0.00795388354753344,0.029212015854229615,0.0006802939708293441,2.0715422447974494,0.006943807540899637,0.626032018536826,0.0015768108105565027,4.057455555041327e-7,0.016370998102868174,0.0035497190032478497,0.0004922126720316664,0.009396467174563708,0.055867882917177716,0.7401086169241783,0.09115887989174339,3.3734133589278708,5.3784687020639685,2.2604776504262563,0.003862406312566146,0.0003517174184577501,0.22455360898160653,0.0001687118767311343,0.25837628790329137,0.43920349651708307,0.00023282706589078012,0.017978310240490285,0.05205920549420509,0.009602056624720981,18.726770154118203,1.5599250127839221,9.77882237537953e-5,0.00014374288182228078,0.000146457907362909,0.00030515015345968465,0.0012891345825195466,6.188667290349241e-6,0.0025942806729338545,0.0025721827064285295,0.000872077907182592,0.2643414773392031,1.8671930512408206e-5,0.00011302388984650734,0.01036566633220044,4.7256033040077235e-5,0.008947477099683633,0.0005618873788664098,0.010366366928371649,6.748067835041505e-5,125.73852672284987],"p":[0.28915429998634146,0.4768343713985459,0.7119320249840528,0.6909345421361177,0.9608256918597968,0.7342452165186968,0.48995368427649755,0.4108930693517425,0.6954694753020993,0.27040674080694593,0.4014817629581189,0.2570029469800863,0.0014041545814802436,0.8695878300615232,0.7415288051395146,0.8741312607331544,0.5483890170763841,0.5928515539657999,0.7813035286265626,0.656584682365509,0.5687803835143261,0.12385736529798064,0.9241971573585261,0.8140268525254302,0.37137719277868997,0.3190328116767205,0.979050770330766,0.6297097341257922,0.11890275259749084,0.3993937572587207,0.6035777967168641,0.3886931334668049,0.32949177508229477,0.24768096336804013,0.5146010200740954,0.39454320108352503,0.8441973883532587,0.47969270636238615,0.037231905841877744,0.3433769535989324,0.3706444415384318,0.9505713818648494,0.3756855036996509,0.5355199349002497,0.1828503705432296,0.48869388571590155,0.3661848793159419,0.24060795139727054,0.26607187110842534,0.016283701764648884,0.7524739115783379,0.9402709264760905,0.49735085663462275,0.2216592204920691,0.7237071817676997,0.8029002896944919,0.205091681645184,0.6688920202556736,0.0026082282917720967,0.34422091414651357,0.16678572704744865,0.4691867494479123,0.24876620417978113,0.9519341973170907,0.24998502900609343,0.3684784286232843,0.7218205386648551,0.4766013491791501,0.7869017752766077,0.39760197792497287,0.5925844773014544,0.8095910905205579,0.9352325883590091,0.22547226000860743,0.43012797697911287,0.44246792338701235,0.9271527048922272,0.6583291728456173,0.9807089374778497,0.5377370465819336,0.9132737198632723,0.2034422290387754,0.9864946631327716,0.04234867829079425,0.28434313383143994,0.23961829729705997,0.91622084752941,0.4165282062865445,0.748821069639531,0.9307329310872479,0.3136064275299737,0.1972499791316289,0.1813219822821761,0.6581632839368508,0.050354411272903965,0.6637253820013005,0.7579825609458648,0.975762054878532,0.5691963492669678,0.5540745174978863,0.7447838458843876,0.9649617663337016,0.2206467887544621,0.11601073479504764,0.6001886149645057,0.8968347496995017,0.9504146058322205,0.1379268894769199,0.42651207820088444,0.34461515467925574,0.15708219871983786,0.2968759060472925,0.2951774056350005,0.26081538436253915,0.9790993073516945,0.6172467553457262,0.776150404076456,0.570504033126803,0.8905962831836178,0.5934618690237656,0.7172949685349446,0.3521667399308097,0.26564288038484474,0.4514703965980169,0.013297122526613414,0.8286036280346489,0.34826530162158154,0.05073583443880825,0.5357195311918448,0.3877010973618549,0.7477050768497107,0.3773084331482248,0.6891216812941423,0.12372685654619886,0.7766939670328725,0.3899402019652911,0.623306895717542,0.8771311570941926,0.6439859374488246,0.7090163200612531,0.9727435049458586,0.10496316280305251,0.25784136239548205,0.4261960835881664,0.42427520369898586,0.4803954629864011,0.05567237858845808,0.10906677068698833,0.44684353475291005,0.8317497572635792,0.9143786739534507,0.881408218615868,0.5288431403068674,0.8509137230640491,0.6222202955226892,0.7831534567339216,0.778438743375655,0.11555449803858697,0.1600312616600703,0.918968897566069,0.8731161166831303,0.32549703156878596,0.3233731366379078,0.6791191886283545,0.5184066518753077,0.19757766668360777,0.44964588904601377,0.11088440191716575,0.3188981869517271,0.47608086672025673,0.47750438012557006,0.753268294942329,0.8478802649118966,0.8314266176341758,0.10989457918953316,0.4128386320703141,0.754816516893341,0.15256886674139447,0.19494105846761922,0.6963209000834951,0.6209092309134485,0.450824753420177,0.5877663567856581,0.5364056710715657,0.9095111612866738,0.12504630207885836,0.734909324617373,0.4849443164672136,0.255687460755218,0.8573247797469787,0.2799146965727075,0.9508626023308744,0.7976599961302204,0.5285278938899585,0.4080457393338688,0.4279556625444969,0.127788586547412,0.44780258302996345,0.8991928740624919,0.7345262933353487,0.005469189754723436,0.7014862890416345,0.7076757025371079,0.10249279794894961,0.16697116251409683,0.6970571650313151,0.6191627220370728,0.29487700960671637,0.8619058767592773,0.7267597032013038,0.22727387317495995,0.7239710809466078,0.3892905619256197,0.4422712214692992,0.9767166729314567,0.6307929329689379,0.2832608221986479,0.07498037277527536,0.6625926318881143,0.3379497844401975,0.7376334820626214,0.9687474358576587,0.6124311887969685,0.40186417113379513,0.6346368401991875,0.9063722349508674,0.2839502958294995,0.39213451843592306,0.8206173503229086,0.6387593321534848,0.07171988415470221,0.9367803730466329,0.1825708043081653,0.14207765267846062,0.46989409643325675,0.8265414132085458,0.172165414825298,0.811132588457885,0.26432048144813636,0.6767885970304304,0.3316520518628212,0.34727556684849015,0.704831044834382,0.7516833162707837,0.6006068796002422,0.6885970487222659,0.06902088702071052,0.8305235886293467,0.7879295500577257,0.1922349383398212,0.8658168992459376,0.539995605508311,0.07582434692163376,0.6413075803589456,0.3701453840293836,0.7590402988820824,0.39122486832478587,0.36108026675950833,0.5377836732877925,0.7419594541157548,0.8575403959344028,0.7782238504997607,0.5538871002517876,0.2889913515295863,0.22391004018551275,0.6985001723082396,0.5396311832289422,0.294974004293878,0.04371508732338558,0.5004115110316287,0.5373711147230975,0.2411806623269277,0.02476540887590306,0.7981360301403826,0.8721898379398367,0.20695329155208952,0.4808541546868388,0.5741490448907867,0.10197040522929512,0.49931415952142166,0.4560464854081998,0.23366655316853557,0.09277277089559433,0.1448454631783498,0.8303616441270449,0.22953465241277216,0.5209277341789829,0.8966995788572265,0.21345358635812195,0.48195988595740635,0.749323847536681,0.39551601190811336,0.09443669964675516,0.9877600696345057,0.992605787937574,0.2701467641228188,0.2527854807524661,0.7279450660302396,0.35041523502154526,0.24803601392095587,0.9906056166915436,0.5787523486548158,0.9437329704405955,0.23122398651453557,0.26496928028112987,0.8525457314347167,0.37097206873391975,0.8295875141109912,0.3023453175339239,0.6911243369183135,0.5929401504868506,0.6996316277544905,0.6269435679325783,0.7063540563919859,0.1250983591303365,0.3575340395673656,0.1591167770217996,0.8459845490222204,0.7685284280023845,0.043924391927185225,0.44832562862014735,0.26853597845120825,0.5377687045209858,0.3745324620490895,0.009011967309307423,0.9186393377866209,0.48473789400176237,0.9680026969197464,0.20352151124343854,0.4777626532673549,0.926885386353129,0.7262578328103637,0.0014679439004683381,0.5115846199225593,0.09981509374327024,0.728194219502514,0.9648633366713166,0.7857719534320606,0.8280479672564858,0.6818735818630861,0.13270081498319541,0.46978083617394994,0.09300078671188228,0.2468108828438602,0.10690825950684602,0.42794296404827437,0.38351195034389574,0.891459739410108,0.21719615335236941,0.2868252022433915,0.8002112299594886,0.3278662117537434,0.9151135238022408,0.3088168794332593,0.4814370403286903,0.09837034767152497,0.10153030431216492,0.3034323365221714,0.757713837489578,0.8042982860776446,0.5264916454570163,0.44590331326631016,0.8291063316814826,0.8110056293440906,0.27443280084205535,0.646744925035367,0.7821267081424701,0.25661175703135686,0.8923897955481483,0.5665172580715294,0.4137697334096033,0.06295406831898731,0.6507563161630356,0.012714593308795763,0.3824558951999406,0.7413569101033788,0.8735695322526029,0.7906138405922019,0.6661641561830756,0.470228045824449,0.8034653085583474,0.3529968955899023,0.7320141208081343,0.6151210607489246,0.3883621863914215,0.3927731713985301,0.7077911321255559,0.888821468635731,0.9462441024400883,0.5355217509646242,0.3297509591653962,0.6355011938318065,0.3770589959623547,0.11630346677431636,0.35321048920938836,0.530643034897281,0.1875335886312426,0.4630812778089095,0.18262661112711331,0.2308229262769681,0.5375947558546659,0.7442409038788715,0.9641373705993268,0.5008667184327287,0.31907151295830793,0.36146819099307725,0.2451690342449464,0.7587871661664121,0.69199371004825,0.8999932903324173,0.24482414840955724,0.3358218737132279,0.7521305691684452,0.4544427690049826,0.5809977694922466,0.2992195226065695,0.3148358999395753,0.3659511574310417,0.3963338865120958,0.32441652411719923,0.628715834630553,0.720121110123302,0.29008738911759346,0.7393068883719474,0.968787846798639,0.8934442326398961,0.8198165661807499,0.8606328142500252,0.6006450193641986,0.8328571614035163,0.6548711312795554,0.05078508270925841,0.6446127799112826,0.3415742901013892,0.38617072649780115,0.8994627191293623,0.2521358853765454,0.6629114936661991,0.1279980182773235,0.14496998562123942,0.5502220165010496,0.36000018952796453,0.35734831165697534,0.6585446479813295,0.39327473351241116,0.7524464617175,0.2900605385360995,0.18417119587159103,0.44942902173705157,0.2645680663532852,0.8744309820069092,0.4125066458317248,0.27258820045978727,0.7535759770422807,0.6698817783782873,0.03451849346745961,0.8344171980397463,0.712445027882598,0.7410119456027364,0.5055965187751201,0.36634826657616126,0.3951208052418578,0.6351162006900226,0.7003515500855544,0.516449866800758,0.39514417382132594,0.1021717372602553,0.4018355554443891,0.7635684620825998,0.2594610830407964,0.8909226938344601,0.3622160106287826,0.7785023690423731,0.958029370821698,0.6280349500558253,0.661015022224902,0.3851501387776859,0.5882852949892332,0.4628014586596354,0.46066440108127105,0.9025354262075778,0.052406623609555725,0.04007349153777917,0.2459810291682074,0.27325449268204616,0.021699091565239526,0.8548991611249781,0.16609422263427276,0.530590092713042,0.461827971661916,0.5938895564803315,0.6712558798241652,0.07044250730398183,0.858325358840393,0.04450418408592105,0.7969165046017122,0.1098851800269176,0.43533226500954014,0.8869556343256229,0.5315463180955287,0.04371727930214986,0.8478077766577579,0.4238302131613141,0.3037387980833326,0.29548763613850615,0.6797458006288983,0.6875236298558822,0.8926985469570301,0.6209055095214706,0.10586227182622587,0.04476552798943234,0.7412399243590748,0.9714978441522628,0.024813378158957455,0.6676516620834243,0.9279323299244011,0.9137162251209503,0.03349262079375581,0.6998322810258519,0.05296160578406184,0.024632075098634187,0.23934798855227024,0.8386383671212567,0.5502418556781119,0.6955344171441831,0.7353423278732922,0.2185431056576892,0.22062219328710198,0.42410598127869936,0.09843611584359113,0.20972652581450268,0.5976497312233244,0.37072700164852534,0.8776102264472563,0.2209929643455797,0.1752785502043135,0.9466988200339843,0.3870927486573541,0.13986884161685076,0.5186981878123798,0.34903035268373594,0.9439155759324547,0.8273973399307384,0.308034625056016,0.3751177307200477,0.048299786105060916,0.04386260432440281,0.19449656444624774,0.8170502666130186,0.1961632101762636,0.41879239999257356,0.23296588225400305,0.21261988163168333,0.1953003654268446,0.11836005646943626,0.979735170022833,0.4581358925136605,0.2224956001441809,0.35924055662710064,0.08045578158799604,0.8436583900004251,0.9845116895121306,0.7060218774568832,0.4951421805620362,0.6379371996019971,0.2004486194276447,0.6759405787221886,0.1871182512980063,0.5798916505402831,0.1307887069142175,0.7926722001976203,0.46730518347675565,0.5238828788801173,0.9810328026733115,0.887739960866083,0.8635873938644645,0.3034362310343155,0.7103761958532948,0.6011095795436143,0.5797811134922966,0.3473200687885307,0.9531988681777155,0.2047494795733078,0.13391741530323165,0.4954474274958749,0.6796883633953648,0.3352237270397711,0.297848021541278,0.8541963002884618,0.7861823321533707,0.32341778576200375,0.3449097703437365,0.7440897290558208,0.5903992022407232,0.3890970016937674,0.5753628086791649,0.65591321443078,0.4115900089975779,0.25680657725885836,0.8697308551761262,0.5197987492830771,0.7570620844135936,0.27240437437037146,0.6998694534007968,0.9557780156090836,0.8704040985893982,0.23389529969235,0.9245390838622973,0.2309528454551022,0.7500127602714914,0.06543082159782632,0.33128535297078554,0.6954650847399195,0.1698056679304547,0.7551189010572521,0.32976003970008105,0.26073757479203485,0.7820960405408695,0.36545020702421516,0.2207131949818426,0.8563838647153243,0.7032501318703681,0.2496895420733849,0.4133579584157805,0.8920463546325312,0.9138859704717672,0.7405221838677922,0.624074144140474,0.003291491987286177,0.16994475970115386,0.718212436674968,0.8670021931145031,0.2516426121599369,0.5474719968530315,0.8474667816135326,0.4270025872868104,0.2340856248838319,0.15208042921324583,0.24417220649587956,0.562272744209062,0.5526926263747489,0.47958670708517404,0.7932926578541966,0.8456477394868165,0.44853603405085996,0.4835347165238104,0.8207843648397661,0.24174123253746282,0.9882382201488598,0.8815650276054308,0.9211813585838051,0.827372248498035,0.10045077373146238,0.9835893812736001,0.04286115385430822,0.6197678642710074,0.8360099506515757,0.43181255457003,0.15031580398121136,0.9314904321860744,0.5587419488349201,0.4323767640110421,0.3290349458763453,0.15797680387842195,0.25329084354104925,0.6699589880330905,0.9545617954523884,0.7356672960571677,0.8033322676501589,0.9300593526039329,0.5952941940479846,0.19364845218893523,0.5738561190444271,0.47848890559922785,0.17697709687247198,0.9772026877448357,0.43730494832695,0.9383326804183838,0.2192915809323599,0.6197464293780286,0.990648221906776,0.7863167577667989,0.4648599974421215,0.8938593949878761,0.9150318340086945,0.8685936268084689,0.1046441209087059,0.8154081929789807,0.09014664944248363,0.7180435339236577,0.8100615310683452,0.2778991051637181,0.2753874077507281,0.2396171514300498,0.8996824402032213,0.943275712011467,0.2766276285370557,0.6093080131538804,0.048206108032447625,0.6044676833407154,0.12069807099353258,0.4067649648062397,0.48610952097289095,0.1427845707284059,0.447373123259051,0.4514980911099533,0.2503172206261908,0.9771295919895389,0.48889785480450465,0.04582273805556136,0.8452399573548017,0.5117507873421898,0.6640126171047331,0.7881802637355837,0.719275427388296,0.3522133398424683,0.05208491720353603,0.5842954396192828,0.8658701245681304,0.6108623647315161,0.6892898363085735,0.5359661876499489,0.23695331730632097,0.26914976895073606,0.4754374721275414,0.8540753343065945,0.8882843109988279,0.1493473524577078,0.05429477693636087,0.6070348004386683,0.540064366617456,0.9530531476960438,0.2968855881287673,0.29593945340162375,0.24437456703712312,0.4828585014568927,0.9859849089720345,0.6319422396600978,0.48666966664147204,0.23073391737864002,0.4700665249733218,0.8532180458924052,0.09080061112874938,0.02588118916847537,0.48241454388110894,0.2858994844280698,0.4526359531785036,0.4749581286356379,0.06104334260935418,0.39710162193436127,0.9098738283825347,0.26847694680728384,0.718914145647902,0.648072241423234,0.4852382191363167,0.29066801169645107,0.5154708500661829,0.308067571422473,0.5508699659678549,0.8219943059686801,0.27289461960281836,0.342203453923309,0.41903020697499005,0.9682380015445542,0.16256488111974,0.019770784480432457,0.7954517030822263,0.5661840343866238,0.12007157054109974,0.02416969339919217,0.12865559660777337,0.7025372462087964,0.44863857278361197,0.41033654762905636,0.15635878893639066,0.47424906086842156,0.523403840286071,0.029625927261055063,0.4291058121229938,0.2696586511228738,0.4462752365995064,0.21249072303745087,0.4195967107223033,0.1339060333347204,0.33175617605177266,0.029645471720484595,0.4181476228450032,0.21630087246061325,0.12485257389387372,0.6271500356911206,0.11235698850998155,0.2398037611882733,0.3261078125679493,0.1095440442461797,0.7641720475721057,0.9891292711635005,0.30923193007404715,0.8537868351804152,0.5864379003986138,0.1358633891107548,0.23595194116078022,0.13271475767069152,0.7469186481153065,0.5216493451119311,0.35894257532477725,0.6785608467382176,0.8864118293620789,0.4185751120139769,0.857552612355996,0.9623393777674738,0.8174607182610629,0.5244854935838472,0.773240299817666,0.02197006657602918,0.5064023614561275,0.4823642278582254,0.5384844975460936,0.7954653031581735,0.09377501059154492,0.31774758253308577,0.4389033274947114,0.5778732031204816,0.09904804957195279,0.5472844681650273,0.9218681181039894,0.935991288273673,0.1099582255598952,0.20555482850018092,0.728894803675288,0.5296680973268204,0.8811677557689401,0.26748221185485965,0.36298622364390853,0.40381436035714113,0.5201566652561431,0.6712011702268394,0.3623607038883463,0.09444690386716181,0.8525818252489108,0.2628022277463764,0.868630949538064,0.32648854559795804,0.05873806719397301,0.8759891028889788,0.09954623027955023,0.12125666731748419,0.8978589609248064,0.4339320294537532,0.8996224997818261,0.6564639540128563,0.5951517328733704,0.43294404162574174,0.790464534334469,0.952761223586571,0.2542494951012799,0.03294159369450611,0.0030420300855342752,0.6499742000394084,0.8987373470029942,0.04033338802977138,0.34835517504423685,0.6815588725423964,0.7719405229866667,0.7291178783974617,0.5603662372892131,0.6714805943238418,0.38788397525363405,0.5789592768827685,0.03945737069590316,0.23934331596349212,0.3539835163508003,0.11062445595341042,0.24801942677493538,0.024983590500864405,0.6540063145402617,0.943702609607149,0.17412991959714486,0.90070219218696,0.6049624927286676,0.6388455465940126,0.5947093434304369,0.7291286625853077,0.3359216159418925,0.6826112935403703,0.5616241857189714,0.04005578086572248,0.04551791456864107,0.8756669219988968,0.9495815700662638,0.5079313107149794,0.7422437761498337,0.8578109810433652,0.5256059663974364,0.4269432399232769,0.9508515284669903,0.7810469538649059,0.4415441066781971,0.38364201482390836,0.995896517417499,0.8354760796552914,0.34619770867496635,0.28413645497829276,0.23996803803737987,0.6566437134327721,0.41161001237661177,0.18592318397067165,0.004918559538543699,0.3093205232564771,0.9116329487538826,0.2510498416125826,0.3469500832729613,0.8650658544987786,0.9231661337991968,0.9136127329575945,0.6744174084019747,0.5773643710214047,0.2696838388650289,0.1634790954811356,0.7434212165942677,0.8580189717134701,0.7362842143217216,0.8252336641971922,0.12608022708101685,0.5734717407555447,0.5929445124582171,0.1642442983713832,0.06917278567196838,0.19848287066389236,0.2508078108084011,0.28118191306008966,0.36087614356669717,0.15460631293871585,0.6236020932338484,0.16322836337623858,0.9945163626081355,0.522011576990858,0.7556116580825698,0.804251600114468,0.027334090584184123,0.7724115191002352,0.9009227419420691,0.11254284141472715,0.97249584882693,0.31893624049920777,0.5366628704263103,0.8474359344952931,0.25970226150308373,0.8008460419195982,0.8433833260087911,0.9503606748866993,0.19976545199147622,0.25058765581412845,0.6107672980555579,0.8228684918283413,0.6369401698252581,0.33319073642606956,0.6937096527579061,0.30508513917823055,0.10400625732255553,0.5653581624005795,0.9791078738887928,0.6825079842383919,0.520208033206909,0.877369773346969,0.6588661156041322,0.7053609773552647,0.9918639724618121,0.901146059102151,0.5931580072938198,0.9293039675699024,0.46666862460965786,0.9704270418917236,0.3660468714603202,0.4896937204977454,0.5985019694223821,0.29228346405916605,0.775232129250156,0.5376047773085662,0.5409146494065158,0.753044823014982,0.6360928078594235,0.46900955481716045,0.5869718768575951,0.3800813026695169,0.06592974160393483,0.2975700572468061,0.006747752683610386,0.5899169848815078,0.06558928440092604,0.21343521084070116,0.5839984356205328,0.041167471020220336,0.23451762140807264,0.24469267344204004,0.2709775206604046,0.4546825576423523,0.2086392087652451,0.5414695329450447,0.45204471360101706,0.9916288885836948],"mu":[-5.7757730602896356,-2.5153354516364645,-9.224694136684604,-3.3344208662774855,-3.4620261097892313,-5.662034147481885,-1.5624572640659795,-6.781599290120988,-3.114618431518603,-0.5736765417071177,-7.2698796843710545,-4.146236421969123,-1.2545647352366007,-2.379777437348416,-8.08374375801072,-5.732154829808309,-2.719944191699406,-7.778499912627992,-9.9891697205513,-2.6217325655141255,-9.706753424648923,-0.065946349097592,-4.48643076920928,-1.1380367904278943,-7.941316505246647,-5.815940677827751,-0.49482331441095706,-3.860414344271743,-0.45440080117645554,-6.5359355871647296,-5.4445842645839075,-4.840699776198951,-3.381047743166403,-1.7727906053200582,-0.06522177767108728,-2.8045552954789277,-4.950742264716153,-4.293146515886144,-8.15594851250767,-5.338291492744071,-4.501642956762437,-6.459974061410896,-2.782308530945141,-0.8291270600176892,-8.14316811706485,-7.933050489126023,-8.219778487173448,-7.286194415871449,-8.80262392604573,-2.733986673873323,-9.811381500249874,-2.8902587273685376,-4.921632786048611,-7.305976795857876,-3.8366988575029737,-6.272056413560549,-5.589290338398283,-8.726476112087195,-2.3687610952915583,-5.124555868511127,-2.8080240999108663,-8.843849297433586,-1.3799233678724576,-2.5099583138775183,-5.485625953496321,-3.9558860768465642,-7.86134910087867,-1.000730015623732,-8.944976397078374,-5.519385346491131,-3.1471522161357735,-4.47988401953749,-6.951484776490215,-2.8372574477552326,-9.69389513289206,-5.215577739913886,-5.933458247869742,-4.846127270596458,-7.150571693287178,-3.9072012271375756,-6.533864411272856,-8.209332448623938,-8.838097037431075,-3.1653890367339432,-3.8934104906308065,-2.5609440299124353,-4.309765953015647,-6.389704663979934,-3.597177819505888,-9.877647201816984,-1.252447483560628,-8.540512009404665,-4.695076062191028,-7.734588751461948,-0.14065552847307483,-8.786049656366382,-4.926124037019481,-2.1146384175557342,-7.211685831093013,-4.7911182314432725,-0.44053817882584445,-1.558422274652771,-9.711667943538227,-9.727403736566968,-8.998426043090388,-1.3473232419053183,-5.835935298490589,-9.403873284034443,-5.396371991118631,-4.046155251087766,-8.138152224015709,-3.4208005077430914,-8.09416102659525,-4.553165528917587,-2.8563760777683367,-1.6965555826977008,-0.21118580580802293,-8.813831056418028,-0.9420196303451367,-6.6874173047670205,-4.727309323648088,-7.166499367935719,-8.07561988571064,-1.3632704773228133,-3.910944825738494,-2.1820496165215997,-2.171248106637622,-3.084552388062012,-2.136278860172436,-6.456842520554904,-1.9537062248998827,-6.761711824524568,-5.614091606277622,-4.612503834124477,-2.6654695659869,-1.0530755946438353,-8.683967959076034,-4.7762656442104205,-2.4968639174392893,-5.1811444652260725,-9.836294000653577,-0.5719509175472282,-4.652974896338962,-9.348078112869755,-4.5480984582565736,-5.090639799275731,-5.564156807545837,-6.57650019581604,-6.38000442225459,-4.2443094098261795,-9.348075102555118,-0.6248606776315269,-0.48446650205658415,-6.156406024388614,-9.401677469634038,-8.316420225958105,-7.751490659290765,-4.542219434447363,-0.7478839769573242,-5.510452010604543,-0.3487072793945045,-0.39830263207798255,-9.384919061359147,-8.002293223932158,-4.681665708445264,-2.239021748662391,-9.078159015771742,-8.737801079090644,-8.04943977339142,-7.880389210004917,-0.4172894346734557,-9.019764277502158,-8.430115208419044,-0.5522788785313759,-5.481979884980481,-2.0486205224416953,-5.785390095222869,-4.310743339432495,-6.311747948727704,-6.600888971802529,-1.8616376304677607,-6.2799182892422305,-6.918765947168177,-5.013269668567018,-1.0130888570961871,-9.653500366637132,-1.7087141235171655,-1.8538033529279008,-3.5817598241856685,-2.373977046804907,-8.033443730006116,-2.71784231627479,-2.71572394156548,-3.18407766040377,-4.776822574525714,-5.0228048456021135,-3.821142386800358,-2.0407847183752215,-8.959224120099094,-5.0874127780109895,-8.875406519826283,-6.703473240186753,-8.356048903960012,-4.184662640081125,-8.066682715380946,-7.704893871336063,-7.4973220731926205,-1.5708083900954684,-2.247808892494252,-8.546500541622876,-7.4265140637447775,-0.1384897600127477,-7.744279215040466,-5.254212417525837,-0.4991142823614392,-7.808066632626087,-3.8631886474268873,-8.291452694605903,-8.361285693386087,-9.746741982366817,-3.81228651314949,-1.8607086322015065,-9.33068334070037,-2.9360684586534602,-0.26401162014326074,-7.783272551254967,-0.2654527553671837,-9.269771292255948,-8.891031784352144,-7.587446851733867,-1.599897068899525,-0.9560763840466002,-3.3011983648102428,-2.1928873574853203,-3.2804104295197845,-2.976973284715556,-8.585296801830717,-2.724453692132882,-6.847775180495663,-2.245045650251778,-0.8454253335835804,-1.4226892662129065,-3.3902580978857433,-4.626973877447476,-7.452366814826785,-1.3611913328497605,-2.298610262105645,-6.4724804061813295,-6.987606114873017,-7.870195162022224,-8.132797939999335,-2.5943175896876403,-5.413921759905806,-4.081691611512534,-5.212695764424957,-8.880979646018547,-3.621025635213968,-0.03724469570147049,-3.2803112359261255,-0.9455406842960157,-6.4288251868554465,-0.2563237339490665,-5.9864041449976195,-5.488965494445079,-4.542755863495911,-8.52014103113502,-5.971889522965137,-1.452913113609302,-5.620031671429948,-8.27101017584968,-0.8489533920395731,-6.954162739551782,-4.082221556964594,-8.221215607563026,-5.078676094811834,-9.442185606368687,-8.574073868645256,-0.7420585175763983,-5.577336557214729,-8.748197554914059,-6.903723305519518,-2.5487822017560635,-4.4137148374580315,-7.45954367232597,-8.10968481243756,-3.94477638944686,-7.689706606371647,-9.899072635883716,-2.695395158675913,-9.644763823221725,-3.7764881947503803,-8.501036765297732,-5.473391319796461,-1.3510725416415137,-4.934874301608412,-7.953428915605036,-5.248661787155669,-7.559227471080938,-7.191051205888288,-5.866724024418422,-4.573571749239083,-6.112485090569601,-1.2338166497098402,-7.670202658296768,-3.1477208601309803,-9.523366938908701,-9.432751763919907,-0.9424295673757666,-3.4211448667140276,-1.5235831405542766,-3.0287938835099237,-7.39675287971127,-8.787760578976249,-1.034470978630202,-0.07800153923409603,-1.593527509804189,-6.4399839595881625,-7.231575721936634,-5.9701247143280645,-1.1145489077275372,-3.6618427106175067,-7.624607621860586,-4.227962169234605,-1.4170218006213209,-8.758806884796432,-7.041490326738056,-2.332017637414916,-2.0339509884560925,-0.3677441521758995,-4.397055970603994,-7.7596448465083645,-0.20326063167366293,-7.576387297301594,-4.476083322395221,-1.8323326644202331,-9.595530202973803,-8.861462040482488,-1.1551349108539544,-0.7263406243247128,-1.1351668898509337,-0.32337594384020285,-3.5821363208495516,-2.8834483362337937,-8.048813309121188,-0.36723192203103716,-3.303936062322148,-3.5829562485987188,-9.212607403358092,-6.712834097811065,-5.951663461694143,-9.97745260527309,-6.490048814550464,-0.6665092189996091,-7.13426811494039,-4.2553907140221225,-5.734676453745182,-7.326535398202807,-7.6097159733089725,-3.139028426556527,-3.7745000002845797,-3.181704839468178,-9.827933497297147,-2.1571751215333146,-5.183133576322774,-5.148553563276179,-6.069059045019138,-0.924055877980996,-2.890549905955029,-6.7476742810821655,-2.030821710742783,-9.079927275656452,-1.7046402398719995,-6.816863808165634,-6.569086679950889,-4.183447241927427,-5.353012828769499,-9.880280772531664,-6.879986345677196,-6.926925467703917,-0.9601406068205076,-7.569111775396353,-5.4346909498049385,-2.4718936374608824,-7.99047552241195,-8.735432769843252,-3.330789511308543,-9.89523876900286,-2.7039897943459756,-5.042861329471833,-4.494929547148477,-4.6504009708268885,-9.02935274394322,-3.466095672809091,-3.1351472441844708,-9.768217475134621,-7.75565892271546,-0.6300342495394617,-5.3295377968677755,-7.348466928311095,-0.44474382137441815,-6.582917408032653,-6.236008453803279,-4.925338432728048,-9.016266357839502,-7.028406499635251,-7.20129887154229,-2.0699814462872035,-1.2367951617862993,-6.108381500134003,-9.289934380700156,-2.362021822761491,-8.085412313068026,-7.288503801189979,-4.157440599284124,-9.848691401198117,-1.736366379411458,-9.525058754237588,-8.164740713748026,-8.999166696459401,-5.737640714037855,-8.042641633378913,-5.574075735251897,-6.929120712832555,-3.860738919429758,-2.7742130567872825,-4.225042285039162,-7.236779993029638,-1.7449761065083624,-8.496100155622745,-8.853786997054645,-5.307785399938927,-9.345321524105206,-2.5209081347684514,-7.047993395121255,-4.867129051134236,-8.250170363606163,-7.09909808904033,-6.374881418348471,-3.554462726222971,-7.326049107407819,-5.174949040145709,-0.7540631826699817,-5.690372319260481,-4.586440372528431,-2.878370030095967,-3.60237962198078,-8.782566582563774,-1.6639535315702214,-2.609646863710433,-0.25664743522869626,-6.9345153680954,-3.693880617345786,-1.7167697934755832,-0.38659792348166855,-7.8909944006118105,-6.046468548878751,-7.87205521716494,-1.3832290361628674,-6.659402448744618,-9.505940032440272,-1.745915498055659,-8.875013529063285,-8.208701514103858,-2.2153068250047814,-1.2342574736393463,-0.18258357007918447,-3.612158430374597,-5.105748878388283,-6.614170039159757,-0.3650520944132829,-0.8963052490215273,-2.810598491786538,-0.7829022534570007,-6.356397034239841,-0.3135192042802948,-6.328509492451444,-7.606516269017249,-8.568624964923497,-6.5172727570915505,-6.333573406498978,-0.8146252923760122,-3.9155311344984556,-1.589099575209021,-6.1483678648983915,-1.44190673959659,-8.639195804374529,-4.0682819643331385,-0.3960080724047277,-9.012415202163586,-7.93773359929697,-7.073833781117509,-7.1791546826705055,-5.300968686866126,-8.454063142033563,-6.974576252476599,-4.2750849506890365,-2.7487293499316334,-4.214127687738063,-3.6125532316006814,-5.537422009231974,-7.742945338223213,-4.232167408757297,-5.612292549209334,-1.0126551713128928,-1.4195115551804882,-1.85792866239064,-8.810247725495362,-2.9350391948735433,-5.698339360023763,-7.990629096545712,-3.3208194853211204,-5.555624675693864,-8.131600893570987,-5.862155169921248,-6.860719476737511,-0.11300057421759435,-0.00861992014702162,-4.583162607600457,-8.169096342441078,-3.712465186701621,-5.531468529604373,-9.346540957096341,-1.7414721549119117,-7.940553377477304,-5.391680405712862,-8.154577250087895,-3.697531186983918,-0.028741172385418068,-1.2432734516857424,-9.262502733227464,-1.555398154551333,-4.2579626758793605,-0.24923682085111087,-5.114748750911842,-7.626250792195901,-2.2326318530196043,-4.6301164496648965,-3.974188923251991,-4.490821914405281,-6.567451547607712,-6.553429317346273,-7.94938287563938,-4.003966892271622,-1.385358728323074,-0.9767732678322871,-0.3549223210377761,-2.2988255857933626,-9.298399885393929,-6.891999359520396,-0.786730151253523,-2.812407987626133,-8.383306563845384,-5.69971275460718,-2.9800488798308256,-6.418157641717741,-8.13115870540345,-2.81997504823021,-4.370359706607154,-6.570184129665191,-2.276308115912198,-7.757660422496211,-8.940148273549015,-9.454129813312287,-5.149565375510532,-8.60587447510891,-0.3117255878899283,-6.5424611298022946,-9.979674208978205,-0.6835574102654207,-6.575367671748722,-2.312641771991626,-1.6781606917750147,-6.483678619581572,-5.788167851296226,-6.135331053617927,-2.8303550408444256,-9.463290533918434,-3.5525276864294697,-3.7532585440526978,-1.82361499406124,-2.2861648669633894,-5.680007470062687,-4.765879719460981,-4.9186087195345145,-1.8973846913796621,-7.45522919647941,-9.973160775056746,-5.8403007397438405,-8.307749723485351,-8.347052989178863,-9.677067396110816,-5.711073848835905,-8.65508378130773,-8.426508870889837,-1.3073888358371022,-0.9140171480637238,-5.77407841278176,-1.6065394776785125,-7.599378402179571,-2.226397861843512,-1.124343225319484,-6.834616619081757,-6.652775738771924,-3.286420711527236,-6.481966836460344,-4.142902883873754,-9.959434904564013,-4.116188698128591,-3.9446885566969403,-1.7175433118811045,-1.216499815374248,-3.0914630272350063,-1.6387072975942174,-5.421701625044819,-2.215658068209807,-2.203884290961744,-8.527319159291375,-0.16367792881569976,-3.1097435242155247,-1.4864650490566866,-2.312563815678119,-5.928484373673535,-5.515587975685106,-7.040595822024267,-2.9194725385873155,-6.193627914847588,-3.9649591394538186,-5.14123362700976,-7.726819038770756,-6.15623357784326,-9.548483212960006,-3.5205286308054995,-2.766364924272444,-9.123386169216946,-9.540957566012352,-1.9733307546790613,-6.6414997896428,-2.954017425591251,-4.177673281140768,-1.9272851260675172,-2.185375896416921,-9.881691376673343,-7.435346525799087,-2.4576576644787407,-9.424234915204558,-9.227076446153852,-9.180331102367603,-9.807334041369977,-4.0235354230598634,-1.9163911789560806,-1.0455393013347836,-0.6199370547440597,-4.309426264255755,-4.949697700580771,-5.405773660311175,-3.7619152151405832,-1.1994466953988359,-6.115594877030983,-7.541133024291849,-5.45290946802443,-1.5625686323367471,-4.545159919182078,-5.843368027915973,-1.03620757208583,-2.9707478771734874,-4.891365614403879,-8.724700617332088,-2.3110318624733006,-3.4366499971933706,-0.07908114140723566,-7.794451902619677,-5.121939289927358,-3.753476555588826,-3.6070191586970624,-1.905198783583557,-0.612107173152292,-3.897424107241123,-0.3943232538348229,-4.8481593556812275,-0.12644647448996293,-3.4368099444804945,-9.82850472933977,-4.209212419228667,-8.60328242531805,-2.0951080948835332,-5.830270658309571,-5.441288940275846,-1.3105100182753282,-4.412811155135805,-2.2391230248501492,-7.2335042677041255,-8.55960561682614,-7.931275319212303,-9.920636920435834,-8.017582729085017,-3.3314562893130373,-3.4238036070111777,-5.29442864703875,-1.17994623666001,-0.8747890696072735,-3.941601874691152,-6.996273724757929,-6.219898698803538,-2.2089319811622454,-3.666485256749712,-5.2665221495087255,-0.6553124690210765,-1.035787488913984,-6.764520347852225,-0.1498963914692708,-0.49363343948098715,-8.059495920463654,-5.312172557539303,-2.560048827802852,-6.9104294566952955,-6.956295515166873,-2.6277773142927385,-0.2020686599376198,-7.678115794519997,-8.944061509991162,-0.42444971236966555,-6.2895450210570525,-1.4690397183212833,-0.025026818620932367,-9.629398551188977,-8.386485077619382,-6.972387506675901,-7.913065255293555,-1.6849204099798643,-2.7716146135699815,-7.402242727898347,-8.004478013302155,-3.119170546969272,-2.5082720399380665,-6.725329096172967,-0.9514324829407927,-8.41859124255654,-6.851714772398587,-4.0232034843623925,-1.1579964295778256,-9.898623185678314,-5.254166920281895,-4.629191772033446,-2.658282117651558,-1.86060494597859,-4.3027594465934875,-0.9789091537852235,-9.680553540412891,-4.602972590469314,-5.61695320125251,-7.328702515969361,-6.62860821041326,-5.532253439579589,-3.7916272907601645,-5.263117079226058,-7.803185138420141,-0.9077809834080508,-6.709065039594952,-5.66086288299765,-9.39608163547353,-0.3953003786904774,-2.565428835572985,-5.231352452559244,-1.0673651923542926,-7.1696093830399255,-9.80805583814995,-5.836810105565817,-0.702742423129179,-8.294181947088806,-4.197549302209225,-0.5287554290181995,-6.780305696700626,-9.636842284142812,-6.412200679414104,-5.273429552754316,-2.1303952305936846,-4.119254791562725,-6.186013462864195,-3.4294144732527765,-3.329090722859256,-7.399510993640936,-0.47087406988383096,-8.748271496174837,-0.6455810377041349,-5.543302799739314,-2.666478072997922,-3.4940619973312503,-2.6108521832993614,-7.80493454631324,-6.114526855776752,-0.37094579500776215,-9.695278969949339,-2.6423317787321854,-6.88207625713212,-3.2605637777562735,-3.8882439350370412,-0.4949581051699159,-9.810865294990592,-4.900461110484413,-2.464691669764818,-8.827405576170907,-4.440020903333767,-2.9690750064844607,-0.0880926012765082,-9.761887408323693,-6.051711898753016,-1.9068937895665594,-6.018097053958533,-0.6617034457831728,-4.710333294509892,-0.5682455106101392,-7.658976677367548,-5.370794801274233,-5.865972118591129,-5.056908701285132,-6.20424546538207,-4.464363183467981,-4.203984796503728,-3.7130055897478287,-9.371617869166196,-9.049761392074164,-4.748523622325475,-2.2977764517761723,-8.071010589400192,-9.652202980296273,-5.690859309767873,-9.065415383016834,-1.288000626355854,-4.772395904429936,-3.020313242798345,-5.183228624241396,-8.80879179045398,-3.916747382375234,-7.213236388077053,-7.0607274584049655,-6.692274802865736,-5.556784959464725,-8.258532760929477,-0.26603066546784904,-0.5584219578110594,-0.846378657912219,-3.164424985577694,-2.355724136360069,-1.2452098100632636,-3.8845667435420905,-7.571710475640845,-8.882275158981393,-0.4037427565568108,-2.287704828477841,-2.689433379262658,-4.255575889428389,-1.560125124591849,-3.163893654631018,-5.534594829633079,-8.897414692701453,-7.6992775459616585,-4.263783917319312,-6.658264792548665,-4.861458697056715,-9.22483534312872,-4.270607370414212,-1.3687676812423422,-7.984048554913712,-5.215745995878136,-7.938781886685793,-2.2081600828613834,-4.534776266900669,-8.771570288819657,-5.649550839157107,-6.771365519188746,-3.701525570120119,-3.2555808036814926,-6.819955030996816,-0.35142767672302844,-9.587532427400678,-0.8415150816966221,-9.500998091855035,-0.24195259002312897,-2.814641351574303,-4.216161100332374,-5.394041942254537,-3.172235366785061,-7.654945794355232,-9.104072395485723,-7.333170299874972,-9.733051386668173,-4.351924341506582,-1.6026985112456327,-9.364789612518226,-2.7526445243206643,-6.899961999155904,-0.6083871613097402,-9.581981279076297,-2.223134556304991,-4.850849481207891,-4.360316466727454,-8.365405638970424,-4.7925989390072,-7.576603647552902,-7.474056162257852,-0.0456064626073438,-0.25569242822673255,-1.7604034139106894,-0.4997303753165272,-3.819546299706076,-0.27550840053610415,-0.8423357879253146,-6.9778547889393465,-4.649868908534018,-5.761538167646226,-4.78742451772455,-5.559559900341961,-9.87813796135537,-0.9589799454681414,-1.0834990466009642,-6.115146595831671,-8.492214996310398,-6.980138772634438,-3.201528527793538,-4.994817208578331,-9.645308656671759,-1.1564533942682775,-5.917428805875229,-9.330032237638399,-2.5749751735639625,-2.496434665867122,-3.4450526023750316,-7.444106821316156,-7.794448211475393,-2.136902017138278,-8.516538111340514,-6.355728413070625,-9.3044042489497,-3.2563083443352037,-1.086042464864827,-2.759621403025594,-1.2975896582709434,-6.151856120429537,-1.694123540002861,-3.2942078195380087,-4.667508040018021,-6.876404866915584,-2.0200227807748083,-9.648910935952749,-3.0139597458036005,-8.96389980019755,-7.643110312646657,-3.9038867119354714,-6.12997153990257,-4.497503865709167,-5.020609693363356,-2.2633584421326725,-3.7008327643012406,-8.15339925952296,-0.6506454191369548,-2.829131360169914,-0.5306833679634892,-4.335193707885054,-9.183960438912301,-4.304797212793121,-7.098261523429061,-9.752400738372977,-4.721965635759973,-3.3864806318278617,-1.030424179020586,-3.919598495047938,-5.472412588936257,-4.1475166016408815,-0.26962183773524107,-6.35511567863325,-7.670002943302334,-1.716761407143359,-8.606534997568414,-1.2559308848480688,-1.7012400510381864,-7.176420341134264,-7.100426512241951,-3.4254138446203863,-4.923377732667946,-0.15028724147814865,-0.7494249602613423,-8.934363898690014,-9.25306297620172,-7.779990937125055,-7.781239799800037,-5.285658993730021,-7.345244783729505,-6.184219054690228,-3.954571842112453,-4.000685629497019,-2.1441687614258553,-2.5209662323227477,-8.17132020982224,-2.933093103895137,-7.091108232015653,-4.559971408825964,-3.80031576487762,-5.067844407643096,-9.340296869245838,-3.613240967983522]}
},{}],115:[function(require,module,exports){
module.exports={"sigma":[1.592609154618967,0.2767305378669094,4.676936421650682,1.4900129356981007,3.9584908690103293,4.5539070986369765,4.5488620376441915,3.1305978592853876,1.7833598151910668,4.816176201548523,3.1375374228499444,3.9250038152902054,2.606499230508652,3.57728677644801,0.8863849936262236,2.6189040243335615,0.6964311802934375,1.4667388041704987,0.07965923684947418,0.601981286592641,4.787575101461655,2.144524103223593,2.581740847884598,3.043476070677791,1.4141846802475244,4.28038639649695,1.2826286721117974,0.1862570171849054,2.8785599213098347,0.4424701875661474,0.8042350587031144,0.34232107671773093,0.9933491543458017,0.8199662039216815,0.15654363397895943,2.967842802772055,0.6260741887919863,4.387102247871841,1.926412937842168,3.9123030915514145,2.043272605913604,0.2891789246624543,0.1451589472684378,1.663184035703954,2.559242196185819,3.5569532472715215,4.250303242461938,1.3273357495283844,0.2565039209042652,3.014584119680591,4.301581769931224,1.7150563102785765,2.254690251827803,2.9454023951953845,1.3927240809366614,0.634744084298231,1.3823054736862561,4.9168310944778195,4.639154391052269,4.489917910377308,4.017378686398788,0.6211595930637481,1.6249441350784133,3.609742342719774,0.8093933434002676,0.1575471917426008,0.7241158562998107,2.0782837140058605,3.3368246329831885,4.4007931381666685,3.331386631873473,0.39038124151245635,0.6903362719323136,3.588075174481895,1.468205011348389,1.0060906353633214,0.9261029465514847,2.6839900850199614,0.2615546543502345,0.6899111456713325,1.5596178027581908,0.22550737032431822,4.08113707768195,1.8602482420616084,1.9784732395277527,1.5218251379635983,4.573814619142757,4.891125616293339,0.8551966021086432,1.8112606311747803,0.15314190009793283,2.2076561915774926,1.5335309688161447,1.672340839180534,2.998072430317018,4.36912021977225,3.637005417219734,1.3987998522242806,2.140953491675398,3.0186331799741515,4.143356987120466,0.9877254124696921,4.995210067289091,1.9240244465714063,4.0122375540482125,4.326594351456886,1.5134843135345144,4.2670955665602675,2.304980217805154,4.266733936352484,1.1703846605071433,1.3766688552339668,4.070945226641753,2.8311837248577323,3.7724763128705305,3.7872847292536793,4.10432663010161,4.566388000482372,1.208550106679116,3.305790894367575,1.8768306365671028,1.697062827763196,3.095587258482438,0.9953223340157247,1.2861533630089017,4.781070705332349,4.966542970835549,2.794094959629753,3.704476815191735,1.2311532942679115,0.1835885749331423,1.835428741839249,1.548726836328943,1.5566303650342384,2.331196062120905,2.2425348794257416,0.7890796984298165,0.6518175612312871,0.7286840509365211,2.738841974020475,4.165701252552129,4.710026314175452,4.895496341496466,2.4638335459915783,0.42148195486792717,3.289489963882699,0.3045181225321847,0.6530589666786024,4.117587203337566,4.318210729685054,2.827065273164422,0.9118948742886301,3.718073744579641,3.964326652382125,3.8368242899632654,2.1032308657686416,0.5297924372093332,4.972637870003518,4.841379855727485,2.1180110524758677,1.7272246340377462,4.274422204852305,0.5555223729282877,4.443330372410552,0.021554103874149577,1.6379507953143124,2.919074445470428,2.742382638111691,0.02742496732585864,3.61898862199776,1.1132089905762776,2.57375366857741,4.390132737568643,3.4032585616468403,0.64979585329905,4.028452130398588,1.8603592862201301,1.2162396387632746,4.886663216368826,1.513218523465929,4.891763374333672,2.4121660499992545,4.258158928428939,0.9216957606880583,1.4192200527069632,4.7065671973075185,4.825530143350449,1.9603873087693802,1.6860436556814729,0.11906704454570538,1.0948458976305886,2.6000195853366517,2.007751945114702,4.247036132308683,1.9835369952849091,1.7103790907593586,1.004315290086546,4.080245214875551,3.812344553269549,4.88192155411641,2.006365597292845,0.75481430304421,1.8304690302573179,3.1151434700611236,4.990591801581703,1.1717273380370985,4.2925078779069015,3.012504144406445,2.834431223298256,3.761911343221138,0.1802368590706349,2.6029364775282184,3.065887905947596,1.386016708862714,1.4362784546928442,0.4332562007642915,0.853183191842708,0.24139367122481437,2.9122258556838765,1.9537953411545528,4.087534299575091,0.16214028761014632,3.9587981412220286,2.841812544652961,0.6727363985913615,0.8272006143958088,4.7909242125073,2.5919664977375536,2.2793338961919005,0.4464385044186103,4.706441360754548,2.891212346393399,1.8955154560986864,3.297399558093926,2.6593340217754036,3.390395142637681,1.3746127487711457,3.444294565879712,3.414451355354453,4.233911969793185,1.40169042515788,3.3597842570078096,0.49578626228896194,0.1417355986698332,2.1712435150068874,3.3851092217876544,0.18105494408389378,4.391475858779113,2.4826556498520116,0.31307029237954476,3.4718818821374153,4.172373065600575,3.623196404011979,1.410718291879749,1.3699337697413727,0.7381089805990726,3.618151298121266,4.36618528087115,3.619047214170925,0.7178453657270056,2.0487549211584257,0.9551372859795138,0.4549546038307095,2.4975684302256207,3.6599904874002123,4.3007320186694455,0.6373684001940416,1.6901911544094272,4.766655949713017,3.8386649870075984,1.3389415057667708,0.7689153413054151,1.304207081658183,4.942268011659861,1.865797164311479,4.302452082718849,0.2966199123803326,0.5409911657817412,3.0309163051359667,1.121876979243025,1.9484708471083279,0.6036737477973175,3.833635690914524,3.383135655135735,2.720272097308214,2.6290009487853947,4.583369069389644,3.3798568385192085,4.508726421128152,2.1697633800518847,3.7583781028493215,4.299996047849124,2.4380362282486914,1.171385128397725,2.098147664716973,1.8941521253965,3.3972366636511375,3.614521562510932,4.637998945680407,0.16506544383451782,4.309702965548956,3.828454350056012,1.7110129860114298,3.181505825774693,4.849719798137366,0.94440003472684,3.486354558994651,2.8222944926943248,0.9855521108032927,3.2804257409815882,1.3082006683225467,3.0142729781749846,4.789930382360515,2.699293228781563,1.6093471109197044,0.5233191072399523,2.8238521105923287,1.9950343635897339,1.5925392827915819,4.012284146386103,1.8129740458812915,2.606554372904306,2.832924115952248,2.010561126209407,4.412126566716607,3.740531460136558,0.20953362287217225,2.745374753602393,2.664610301108643,4.081766967890188,2.9936552724392387,3.3012686646883385,1.492479595367625,2.003278096026201,3.051926116046771,3.9449624203491194,4.084297007467612,3.5494309617670963,2.2782840165060847,1.5841179894273405,2.4421156578736545,2.7792456233708753,0.613088130277073,4.14896448758333,3.296385148855353,1.4731769545079376,0.45795031669507047,1.408807492276658,4.519874694128372,4.028079451862135,2.3291815973699856,3.4997522328934894,3.287533869504613,0.6686266912644578,4.083795331434976,1.923426900873535,3.808457353692305,2.38221166726082,1.95386995195037,3.312439373374707,4.134012059089185,1.6735138111723336,3.5855948474611745,3.567511617565884,0.23003398658431817,3.3381969423848243,3.882171166480546,0.9509098258100779,2.746352550464705,3.134442215706269,1.1140544303235744,2.7392862601773196,2.772392178672752,1.4722322746882155,1.4748789334504098,0.9738566908462432,1.5663913754682357,1.0055725110944835,1.549153845416824,1.095474351173048,4.121538826276816,0.6832325813737916,1.611050775185705,4.168752365577236,4.90724802471591,2.394444178141649,3.5509474617211434,4.746367174675717,3.2938139974629275,3.474158490825865,1.4680647462255525,3.4320989783086784,2.4065282219522732,1.4956052591035252,3.0611917923236986,2.349455929764017,2.5271013702789293,3.8216761440429203,4.502697699411822,2.759484719435459,2.0833678055559233,2.409652925208073,1.2076620710033037,1.4183111112743285,2.2943940123720608,2.287620754201524,1.9638062429131065,2.5523258739434884,1.7217120602937919,0.43364124868957576,3.582083887631172,4.3669303828888575,3.739596589575067,1.6344074228552818,0.4804822400390374,1.9772007603335962,0.9743413576111504,2.289360131116479,1.1961200939993633,0.8136743239534594,0.7071025792523655,2.9661592981750284,2.8186822217390306,4.012101523946394,3.158918251785532,1.2515061333119815,0.4891304077812353,2.419572555542182,4.700067069287924,1.7015708090970083,0.7358529999839425,3.106198380261792,0.9517392713363237,0.05332905938033927,3.2809788539736706,4.1702561515692596,3.761881465328095,2.2491776445154468,4.305485177294541,0.6855662685887454,0.6382647737424507,2.1316230136248135,3.636115706541334,0.7823742698236325,2.321223757358648,4.123293437105822,1.9862125007765996,1.2964068338580848,3.5446404769631803,0.8401447051750166,0.7235944049264864,4.3890547647606315,2.5900372200563226,1.7632540789139761,4.672082758469029,4.791740800996267,0.45804457828787615,1.0408738545926999,4.237789028284454,0.5664996981380055,2.725874883640386,1.0349399279927352,2.979931281612992,0.7852081392063537,1.9673223672126205,0.5816137573191726,0.3820948624037612,4.475404135698881,0.6242487882434156,3.3344379404875877,1.3324236796058309,1.3805041423000364,3.1651488655093276,4.1081708253721185,4.192327140757129,4.102743222054803,2.784819253994437,2.835371421194113,1.6464782932259547,0.9422969967839223,2.34574481788276,3.9816099283960424,4.684300672053764,1.3687092888937191,2.898346188501928,0.41914380098163395,0.21308827213742831,2.331742119408747,3.6690553359180047,1.9079543987185765,0.6531086164397415,1.9454283757240887,3.4230468389848303,1.1074388884825337,0.2875449516206474,3.0219196721120314,1.037428921413287,2.717047379407788,4.965345233781103,3.1439811810351848,4.646143811742883,2.6820965162039156,1.6329710799857156,3.110557550099251,3.200675760871304,0.0212812611221469,4.345424665005773,2.1579471508940817,3.1439302718467244,2.5194422456699894,3.8342612457985457,2.799264923060658,3.4464787533610464,2.884823813345095,3.406519315617368,2.401090118021365,1.0559980365542077,4.537869951960387,2.3079846541594486,0.33347028921189903,4.577671576132457,4.50650580424941,0.3077573320724347,3.480504575160089,4.8243043474357865,1.9773072914483036,3.896567416264878,4.316933928649506,4.782968117556097,1.1238546244553804,3.4214696024917934,2.323735075127918,2.833127214362121,0.4319531006337196,4.944644859693095,4.592063812700342,1.0219392992104581,2.1572982897545745,2.4922082357210416,2.034719830981524,4.845358173809525,2.8222851514093703,3.5209042338720264,0.246746456528959,2.7099831474268643,1.1974156384549517,1.5374406850425237,2.496319812362259,0.635346400194502,1.0712404191733838,1.7558185090802148,2.9931761896093545,0.2633376244190333,4.088567119364839,1.8390024815881767,3.8591530830833323,3.999853965612117,3.146191521206967,1.6711755719503574,4.987184163766679,2.209270763453305,0.9552927763155228,0.6262840094517941,1.6590345514373506,1.0300528124060282,0.20386103314210424,2.162112820689406,2.2039674394659237,1.131307530257526,0.45320580485507245,2.7425966658013445,2.340673379547483,1.7090334517103989,3.2728331718542614,1.5379816888599962,1.7047009945921798,4.3153982698981075,1.8039119021006411,2.4566201901411375,0.40989338380862494,2.258240261198349,2.8906773581050302,1.1166604883206743,1.4135383692262338,2.4989202533876655,1.5762112833958708,1.0417566073306583,3.256520308957737,1.6882696397041186,4.924951189617053,3.5531050689634505,0.4534102928534667,3.257624576689949,0.8975173270376624,1.693986021007562,3.935518054592367,1.0525917469262924,4.951814587689159,3.312127165868841,4.726848590954244,0.28678256450251016,2.5001935397495667,1.6997000056349398,4.384380967701132,1.1518126056392242,0.5026819020910112,0.28683379148152777,2.759448858569822,0.632272863872908,1.614203380482413,4.452833300357536,2.3977625597681973,2.651313795848841,4.39415673218449,4.538788629703427,2.0381125233933926,2.4795971298696373,1.3194283992883127,1.1586375718979347,0.5027756808446338,0.5368439403556879,2.3509384220507634,2.8032852220130753,3.969686708697945,3.1965493295369996,4.778893988450836,1.4213684661146375,0.09797636047501723,3.9846624497187033,4.235298679721505,4.3737372997443655,2.2351377066301135,4.303372352054458,1.2485877368185372,0.833395180534301,3.1447134744829883,1.721884985281299,3.597406277686778,2.7688854353223826,2.9589729765384787,1.2775178196924997,2.6053925366870745,3.84530273318467,0.7014118987556339,4.644055831258943,2.6417443397461318,1.3840345731695047,4.691218538235468,1.3072622291396196,0.11933144879319735,2.3219438211159984,2.649134927577742,4.2729471554453715,4.071084906338855,4.042055512311361,3.93148249683359,3.3619238035544563,4.089488829481235,4.454758715575867,3.6011774412607855,4.638741962878784,0.5237679272466189,1.5593603483709717,2.8358110719428273,3.2414224956104043,1.5533531467354655,1.6372238633831737,0.46152555179870935,1.5072289271436734,2.1785965545048502,0.898316582128198,0.5705717722322989,0.5496612284764113,2.9251795230531954,4.141119089638798,0.05132532598101758,2.1274806640573454,3.649561020652744,1.9381256562962768,4.470502558074223,0.7232845888533701,4.812587794980208,2.978746333353061,2.206963638234506,3.493166653973143,4.507896661992578,3.990977049732435,4.692769365977441,3.9599346620930955,2.4511306645097166,0.28094912682199324,3.8969876020769476,2.550734404290483,2.24774495589517,2.17702254438803,3.1467709569130764,0.3526479771650104,4.294266143505214,2.857398211376524,1.3617007773731649,1.7591216813347144,3.453587444723971,0.7505646560708901,2.9604301862749836,3.950285893140392,1.336684458769587,0.5570813520441775,3.563382406560218,2.9167277098283897,4.975295010601756,3.486007889023639,0.17988933085624548,0.314386641244393,2.9782704248569294,1.0357298721714303,4.631419974104195,1.8591264107956817,2.7739368239880635,4.926377427391225,4.877849491516128,3.0473973479984116,4.9701448300535525,3.8617449337993626,0.7252940350758785,2.233929407455486,2.313488946886758,0.7810963585507347,3.001875318507002,0.7222775875025012,0.03299020011999443,4.045563240832859,4.066004743452632,2.6908925300988127,4.262525738502447,4.238490511878141,3.0564740690097993,2.30596562589103,0.8060231795720574,4.600371153026524,4.986850571148259,2.814576707827803,0.7718243578596884,2.493709079492686,2.382975599818341,0.4887691989577758,4.85113507423463,4.312935121906921,4.887588425568934,4.8428310527507925,3.5368249437248322,0.3841302576369343,2.6207170685000456,3.4919134498704194,1.1348015702197578,4.828472762408387,3.269546232078435,3.424925024540617,4.69371040559577,2.271976180939028,2.597693460939041,4.970548491591922,4.105609119680138,4.259487369796632,1.2535399962392568,2.377238931855601,4.376630310647762,4.671961096997497,2.5443311191786036,1.4613063123473635,2.752413823272529,1.0417066934074815,4.918677257724362,2.6266141938400214,3.744473270531099,2.0629242909927745,1.3509906184750287,2.880399058222899,1.0388591210917164,2.121587908512529,2.5468593260711514,2.5711596069365927,2.8437428272055856,1.2125742288503938,1.255410267701489,1.7202937839254295,1.38254698008759,4.088240915827985,2.5112246911156633,1.4946479638925714,2.767575559779607,1.2467803188928261,2.523539842750414,2.3791754350995706,4.637845251443448,3.6224696507114085,2.753136471506765,1.3764598970206399,0.7561465384650179,0.5292756282705269,2.68517340365762,3.442123127511514,0.12751894010222697,0.04413269547534737,3.53151642266286,0.4664023860607347,2.8051449446120436,3.489659829629961,4.083843562905724,4.448152104974717,0.8987897380367282,0.5486490026936819,3.10385761151451,0.2240856790322321,0.2758598047814831,3.7622927376203563,4.986004919592672,2.2473374620809627,2.7660894124416235,0.172133523125636,1.404531936790644,1.7015428792644915,3.309419757733915,2.5190253151589523,0.9866130478001645,4.297723647201208,4.670841961872848,0.8923234499973676,2.89643851613799,1.8393286323436286,1.2687506223694733,4.801790219931269,1.642410626369123,0.48034559823180945,2.035651965659583,2.6012608547431126,4.263727669841179,4.215319427751972,2.9119047478686957,3.3738275508072446,1.8328022282513312,3.984011555527145,1.3453996588737671,0.8783362507601022,4.111985601617435,2.49268161074097,0.532359195841493,3.038057344936118,3.1412594813087305,0.5394379494568602,3.470002239548421,2.461108184782066,4.172746185390834,2.9990988836948693,0.8733521165860814,1.0225490772275891,3.1835023074235593,0.8564363620567861,0.21947628415578402,0.9496247657309764,2.7144265481185013,4.288559670183373,3.7874354853024164,4.6129244579910615,2.197148946859947,3.373573222877692,4.328811040250605,3.4694609426153478,3.3917776706440597,2.591355235818247,0.7411023829185825,2.515271439916601,4.371657577050788,2.76330964426022,4.60004055636781,0.9553953695642292,0.7728530681279122,4.489673098153063,2.9827972924257207,3.592692598899573,0.3682845980034466,4.602651311745362,4.152438858181732,3.953071766727186,0.30127169773435103,3.0736144475718152,0.7440948919304713,4.467412760520916,3.086101367258649,4.029884227918305,0.9087620677276464,0.15706158599980258,3.1648172513525386,1.2733736152684505,2.203917099571433,0.4794652217309381,3.114948517713106,3.3602048586775455,0.04487123420685912,3.0836637509238884,3.4714771879023543,3.4660754031523133,1.2673175638474399,4.124999600304838,4.9227526416424,1.6107286931192932,3.1531327723054203,1.3469369537537268,1.7539417344450703,3.944233568625466,2.470782903413531,1.2281497874935043,4.202539876144255,1.3653495243364344,1.4252587536983297,3.902730510198028,3.682191468154914,4.693011417678782,2.1273904839096325,1.1898839629403757,3.6129501166181024,2.3015621256802046,4.053656254497958,2.4772399535703995,0.9767711316815242,3.635346045058625,1.8439998075659103,2.337527070816139,4.869111675572309,3.7579321444417335,2.7094013163736577,0.8575435818779453,4.911206391137633,1.8458608839005786,4.326913238354107,2.88493004661822,3.0402043587692065,4.747957906534195,3.11798631195763,2.4369012925163736,4.467417489434183,4.483733828544873,1.946147063193846,4.10010060137895,3.653098988691509,4.75918000328416,2.99612321216875,0.6867467195523091,3.2357958284943877,1.157226584913822,4.265662624103694,1.1590621261603251,1.602209200370558,0.994900405508673,3.456947240304833,1.8929467073925255,0.8029571776898226,4.53070242590862,4.659001264404465,0.0036623027335058733,2.389605681829079,2.8944635565830854,2.740428016073073,0.8220289956767335,3.8931049013219763,0.7629955650124232,3.994173708840978,3.2058467212064876,4.570041564443791,3.71628385160222,2.5952943312570795,3.3619805702307124,3.1783732983365462,2.391180194471163,3.9315623008943756,3.48667879301653,1.133384715810405,1.387953815240146,3.055703163594079,3.723326401198812,3.8603701998081963,3.8848563120699353,2.860203086167048,3.5479695199282824,1.668984961980391,0.38983138618995383,3.9913659331695452,0.073137622977687,1.2044716156659074,0.5615008930883869,3.9190081077705754,2.8873103299781655,0.9089630259073544,1.4819274591785803,3.781810388875395,4.03069526217039,0.6956656699798858,4.349413751698851,2.7443661455125556,4.0121543867684455,1.688335708241957],"expected":[55.15935369001061,4547.43830722477,199.57145993484494,4126.44575503647,131.04841327207419,0.09802480441261098,3.609084240855994,4.463824595556121,48.60307267228954,18264.342981265832,769.4935309087803,19.19432624930868,261.7746811420712,71417.95430411857,15.091583936876548,688.7139542520786,21.474250641634235,3833.338177975152,355.9752984155905,1563.5202956504668,27936.47931709364,217.8641538591138,1.8792890530381565,1.5887530461612203,73.01211579263473,16.353508225527367,22.873672322843447,7.283461712332118,43.3698132787724,88.90705837369562,73.4570058755105,557.2634814079801,7.253196478814769,154.1788186583902,1.9925911410488637,10.21681528318329,5.510587031006002,7134.987143232138,32.962540602530055,34.48929417937309,19946.958242137054,58.88514796578404,56.58078705849193,4.119232341417095,1408.1529421404819,6852.7282017416655,11.918616921865212,755.070592613347,2063.0343264776952,17.072830964169828,5.209079844758795e6,44.14740191026197,5220.497450753002,19.319417620022726,13.838416541024916,308.20864135392844,3.684206689915384,459.97762297762205,1.4727448237173304,145377.0165641719,1.4418371666133365,165.4127541009003,3.9297842857734504,37.7646955570177,19732.90567650357,44.07660964824666,14.189621111766531,15.259377742560819,0.48154624268105145,3701.719150866335,680.4074462978278,279.1112712104998,3.091600309956595,3.0852746522727683,17.91374620898152,269.1891578897654,9.324994687243013,0.044721869269760635,12.307230670857914,61.845434159033125,1.4571241911171002,64.47620493820921,9021.624945360996,2428.3007409601482,5.9198036598963615,1148.9542559211388,0.08423013931571469,0.0011732953206705296,58.88377131264006,80213.50976411867,2269.332751461306,615.8669985641571,4.016852066661534,2107.536819536707,769.1368019841345,14071.63659988346,908.7735223280561,2.80229947374597,31.918238010098257,4.993422549205114,0.2653593777625638,11637.244285182107,5.856519587895736,19.182716094321773,59998.49577540566,9.108028185260348,6689.091508808978,730.3426934041784,0.9885278283078597,2.2015879426008893,63.584641757813124,12.160337595958623,20887.832968190974,0.47196012158380635,3.811895432500259,636.9174861840125,6.059472670845103,1.489169006358142e6,858.4153254798391,13.326428447061009,12250.784939158148,56.18663900977243,26.12055645302202,2.021377758186146,11.679682509269426,0.691054330516025,392.7038253848706,338.8496925929127,14.844622512586065,77.57808514083615,72.42802787364917,32008.137081170848,43.57181388441868,8418.032038790585,24.199005913377057,183169.29981902926,4.071056113123119,11.33546821937716,197.523919920141,15.397618788729,1905.8135978308485,100.30238000199668,0.5915725477718388,4.690908517038645,2275.537878010811,64.11726777268532,95.68382327771594,31035.136459984635,146.62630434894083,0.05668468199424958,52.79061446380988,51511.53431193453,299721.92474457045,189.67304821065238,10.677972969070352,51.851177078983795,11.50355089270521,39.285393353144585,0.16969058591957797,6287.481852362325,518.4058537038144,1430.6109628404502,23129.888185436954,36651.31098392819,32.31671756666997,707.9367244136963,9.211128632356132,1899.0066997525842,68.80133658592177,543.0556641656386,3.649483820098795,31.500876751953808,8.644824467945384,604.0149116575285,1.6076688989447003,3.271242002964304,55.81678022297895,180.6332167629588,232535.01150553295,222.373742491503,6916.157770717527,1053.0169162794039,458.74561672135655,1.079872007831658,1149.4542220736323,0.10323540967200524,622.8965092873608,300.11062572575077,323.5167579388566,3136.463678496424,309.7591889559841,1.9408639817430733,8668.361218868447,55.39156330296545,157.44327639342936,7.220184117310706,1111.3751295694572,1.1481328604014438,1320.5183200401775,0.022593667023336907,3405.348927127133,7.593162884455994,40387.6404984787,2436.711829592596,0.009983553536189294,493.29702350093623,763371.8940460987,304.3716769471597,677.3287957166185,1015.4283835112718,37.077494223583635,545.7194021791942,13.910674879967125,4.078823797091191,16395.75903866181,83.55071885497966,6.088676260539536,7.6525604509676315,141.17352621432016,7.394265949558555,0.7490361487397417,313.207690382231,3448.7702217517526,1.2765642353226867,1299.4724706581053,230.4274286795273,15.854645903162929,24174.80448684827,119.5576990054589,133.52870891769481,25875.899894174658,243.00112328891842,283.9707195062527,2.1166338953240784e6,1067.2971415559164,12831.72849786772,20.677152225135828,274.5961752494749,0.7230208423576987,2367.1329640630784,218.97601199691658,25089.46851159791,34.395228317220315,13.690808726755286,194.56675522330295,3.1021975012496775e6,11.524509299288944,5.2481517951853916e7,21.20369007885775,16379.587929900636,61742.75383589633,15.823132084418212,3698.9197429780006,149.72614887463646,2.4232603703797553,13.237165307207489,0.712011995021359,243.69175059345466,504059.39042005833,123.20238629928112,218.5749469955641,97.85968526215791,8251.843861539894,39397.063404915956,218.53874980864535,0.09302923027398076,386.76274724780166,6.976762901104005,7362.6009388258835,296.7669982618811,15725.662195470968,8776.803732002,19.648677704673794,111.98819552921711,602.4167107761402,1222.545176900888,274.10880303894055,2.461248230085512,2.384976711001029,13.157124311495751,3.5576870263974834,3525.3257326932107,25044.97196791189,155.8853565068893,81.78712515346221,0.09800989327765615,26.36076506843984,0.004368147344352972,125359.94425567305,3.481392594193399,4.190524196513296,2223.0608173446594,2890.4400189439975,2070.1221903534483,74.07062713788014,901.9114065976516,95.62068814855826,6509.613604518889,0.6258378821583229,1489.3222687593156,10.133463508863247,2.3963912651201387,19533.717475917423,10.234984571164631,0.05270960355114841,9.023057630417966,1375.9142694279922,9204.040960191815,1.5228273115889799,168.68698835263777,86442.77079483907,70.42202508817742,803.7088587300351,0.25189869361216066,60.16882750555177,98.40415632245411,55.61299038329016,32.82033186251675,4.296301329835483,2.409106119785348,10.920751879615077,256558.103158986,166.0396902240784,414.718128480941,38916.638312635,1711.985205413232,2765.898165324101,82.33143054128499,0.9193822389083699,79.81682465852383,402.2387882660047,854.4647473206204,8.451378785785298,33.764505942916735,8734.443187623967,27718.36534200304,3562.4149970455337,0.0019793008841962434,15508.409917927946,1790.4114337108308,9614.735333753013,50054.77011348007,7.350251643971494,0.0035569696042911836,11559.994366611047,10639.976298243459,26052.954840509905,9271.290058509125,3.9011315666894912,560.0011452534195,0.8111472491911523,0.0925400175936342,60.560112090450666,9.109543336470297,112.18215420380581,29925.1455951623,4.287728108628178,175.61652111651642,41.5375472700938,44743.215390421654,431.6675030504305,23.01309210782798,7.225938733003473,0.21430287125879072,5.8060185971605245,14.155765072641282,16095.429971372156,0.4657657865701821,192.89594366488512,0.3446834686478614,783.7959453000309,9020.44715662792,0.5941129998700024,56.24418132368853,0.18884261202765196,4581.334953047148,11.718924800387187,46.7889130848944,256.5803043667922,17.789032278633037,0.47563769268605766,20.308451131563892,1156.0770254276745,2111.6290471796046,71.57477210004271,2628.2147754200005,3.75909093835095,0.1912179498571273,1.6536620505249129,25.63452914523584,13.113427515267633,9.110577865855452,1053.146528369978,21.139540550048096,1982.6449319478716,14.8991001137237,127.69693980417856,1634.076687354392,0.04529980478075471,3432.1942306899623,0.6567976867535559,309.5952003694773,328.7024616761682,490.69705093306595,198.82056299802963,0.166513982089046,820.444780853872,17.30868065049669,164.28690181704704,17.789810595326436,24.327042448075144,9.350228959771481,1278.3057777329984,25.210093827650294,7.60824888208728,1.7539301167222374,22.91062364453521,13.620679509626356,8520.581458538041,4.7163368319535905,46.42540633998049,137.0381565588043,0.8385800543009329,0.11231366563204608,1374.0604068501666,119.80357443444169,2625.6733214315873,519.0606847061475,12.726352063242093,11.14117354363881,217.78335416894805,153.37846845906336,6.073166639331392,36.42324781196338,1.7636270788641242,208.02377199418748,191.80573749131332,1.9870695325293122,17.978869783105697,22.412497160195887,38.78272165906263,4961.498832205069,6025.960393530097,8615.144771995328,22.87793466917168,32.73940734048715,4040.357668678025,526.0059403677722,34.85399014950373,740.2996304848655,563.1588102865327,163.5152486445927,1143.197573507943,0.35836455711106247,253154.79778187323,60250.67130262482,2341.1855001645386,247.4411163934475,0.05342661833200581,1637.1758711994316,9346.232810163227,256.753838688725,68.96048789424908,189.84044516701445,22.369956828328004,49.588911354166974,1.7105576223676824,302.512738741405,508.0038259059084,7464.731666864437,18.17273874079176,5936.142310812436,31380.12208192038,346.37736409121317,8.679519507017405,75.70017520274463,118.12017092066748,167935.74081585158,13659.825447914383,3.5356921403931536,3404.805679744616,1318.1126841105956,0.01584844379510564,1.7191121436672312,19611.575245073105,13.653601943929251,3.115556592476308,0.5639154651175954,0.44809641774416686,0.3363434704237067,0.8918356111439565,8.442578765240988,8.287843784149711,4354.5185127131535,1.7827891971797427,197.196114285693,630.6830980932027,961.9018322324313,0.027486623184568675,0.007574799485006082,15.325208425715232,0.011102318233990388,0.7760214991476792,206.93868599382665,452.0667134460864,8.241061782777845,0.000484654396302691,2527.1364749793356,154708.93844619626,8.800702262025812,0.012510357749533713,0.1327312324718264,123.29030755198313,1.9605342673747412,343840.22370216425,7.703782895561257,0.9367367838038422,13.945091920774203,1.7358692938770985e6,7858.726325744572,37205.473397501875,243.04270568723211,119.79196571425996,31.089131840857917,2.4138134183884903,6643.894253934125,0.4931610133061976,28788.653504344693,102.73679629369332,20273.942757956647,1.4946368565135981,67244.00695730557,49.1957819356261,2639.5263761001324,23268.377471996595,71.89194280086141,8.229307257911193,13.482000058338937,9.206314371007117,22383.69904906908,100.07883936434541,8943.703684021866,712.4252815815811,4380.539130738675,70936.20785303014,43.91885584434683,1.7302817437834053,0.13361599432229898,2.3604081159551145,36.594647708888445,8.190689469337961,0.47665176827182854,154.86534260925617,14.440359207628157,33.52002885297675,49.99337481220887,108.31496162660498,1.7799993988563976,0.6029654157178691,59.57200116219955,10.123570755224756,23.472836526060814,93.1138109670793,10154.58753480104,198.92827160757986,6990.09320784074,158.72836032293938,2091.666175266584,30.391397120067115,20.717679346567607,309.0285014656068,1.151727751445605,29276.955337873376,12419.310573147435,1.338975150488227,0.6910303572692943,0.43234422909260023,146745.69430896305,1616.1078031278344,7.8148533626225545,0.14901070894087592,84840.89292676546,23589.92633247599,7393.955683156446,139.71423376112483,0.201269752032651,14234.132610946228,97.04460851996654,8912.75686698337,1281.2611325918951,1002.6364756402969,29.031565870991642,202.87176596750498,10106.568604235217,7.986712395878328,71.79396865476878,6201.004964759003,0.003007490161056818,5992.842507987655,0.1613317255856505,3314.6137186252367,0.0035280919271179754,48.03435921480754,2789.6550204263326,13783.932996746815,499.47236882281317,210.6828997102562,307.62629687092243,33.781970499647585,2.065075089387803,816.0145089507616,3386.7227568597123,711444.6903026163,6911.449451564957,224.01800527528775,515.8214647236476,64.63080189499756,23954.861375717075,123.085922927789,1009.7759897637036,292.1136295855168,36.40219255105672,0.026798605777723868,1070.558092100821,58.38816981857633,417.9682024239769,4222.889829780528,1366.4276059182198,0.28137973454365633,257.5133264152975,869.3794288902409,142.96119470205778,1471.8491286409553,9.76816125996839,46.57302006624711,14023.021712567439,210.07696856550922,44.241251569860616,306.20662820400713,13716.650075736008,441.23546380320107,115443.54732088896,432.45651042966716,0.8280176730979745,7941.601321677992,1.8315070888894598,10.441362881906215,1.7819251059963332,687.4645118789703,21678.582678973864,41.91742864841776,62405.186777910465,11.633049002176662,4.647130312116272,1773.137337986941,1538.7368837157237,22.909806174017504,3.960163653919842e7,0.029801792034849606,280.3704626809707,0.043283977558564155,2126.979092042751,6634.735005191906,1.465250835476236e6,2.1399087427952956,1382.1755206831433,21.38696643252822,516.0589637345312,4087.8210451326486,100.46505546579507,7.520824790881374,1.4412330145571113,89.45470702764956,127.33933396193444,17.665546339102512,1423.2830274704656,47.403435604685995,2611.5649778732527,1507.9301584462607,20646.829903943493,7575.7363065360205,18.25587574171856,6.662870680950691,2206.7714130015333,23.958312499089665,41.558838671949715,0.49635446248573795,101.3265056987628,34989.46252250779,421.98838309251295,2267.8457901468887,95.03387749216454,20.50797594322917,225.08645740660535,3744.6607443162757,3.1176164757075857,35.207096474544706,0.2882611741445593,279.46294512221374,2370.4854374693095,6.989748156268378,0.04700705107274401,2.408165742312411,1387.2565737764903,3.269542066598994,14.668655826502649,1.08920930794195,670.3806203074514,385670.525433979,0.004292392116988912,30.477063771307495,167.92562082978156,10.236208911235384,0.4168381507586286,242.12361471391347,26934.64804950619,2.789291826184499,0.39100957516360735,1058.6379458186057,6751.614768299833,88.38427654568208,0.0032092776760739364,100.08945377833751,1848.961230911112,71468.66725890787,9998.009810497158,120.73011903826283,798.082026388992,2.533707701325639,127.46348602721842,37273.252852035446,711.0322237761886,30325.634046769464,107.21134424292049,2.475538064271687,64.54411666520704,3133.416282739898,25741.65707314241,1375.6302079462025,26.82585254782216,4257.647133737883,13.411244738572176,652.0720582587711,617.4590656744288,854.1044581961679,299.5692541069949,30.529300836374436,190725.31811895652,1.1962923907430565,46.014882201342154,6960.76947396756,6.079165624652566,656.9225616782612,11.263278930176346,194.2239902288161,1352.0887279728936,1.9180464945974403,3.8621683975265436e7,0.020016579698898453,26234.21776787313,1.085345278092797,573.9515020496477,3298.999334404914,997.7441513895545,45.39808424175223,625.8945516146822,0.09094176646095023,0.1844266831853977,1240.810035515834,357.3466606263444,0.9701615498187907,46.04489031149616,6379.55879842393,255985.17640492556,3223.506840365849,8.574257120522566,0.6002895199900038,1918.0614126131,20.477529313684848,201.64632157001517,259.4904108322714,69486.6279912147,63.80223678031269,4.838355115160921,1.3894359241441796,1220.9235925420671,6.530412576759238,4623.591285831212,0.8750064774618798,5491.367326088282,3.8036801715983404,4136.872545367911,291.9034331545903,6.740909880929414,41.308690952453176,12796.30792546444,6674.193424511762,349.2810685813473,1.8486229585840253,0.9941483980735345,7001.023584979124,918.8316953314595,2.4497655175533795,0.0052300714920720075,14647.003660697683,31.19433249955501,2025.3632910625474,4.121017078987746,0.21520544373243583,667.1216512701917,983.386215483899,0.14803402869923546,3409.7977068809105,2.551087930331646,9.14219919902993,8.346121210030464,3.0100967367224674,1553.9771981009142,5.51865882127983,0.933145562979713,0.21552478695445984,0.43484563671164256,6626.463891796946,159.1244312865196,6319.078570125713,867942.1654559294,6419.671533830557,189509.56122136558,1312.445189306036,7785.483039191273,53.03142649851766,0.881772383856275,34.76879078274467,4351.795836656265,36.502770710604636,35.52487213523954,50169.478452295116,166.37160758903224,968.2585066598424,56.73128803322261,59445.88589227752,60530.88248629765,2946.0928181271565,2348.0118930220096,2.258406627571325e6,747.4791534488465,76.31032309716,0.5139282562587664,30028.328780195818,21727.490124061223,146.1293702689437,1.214052941281163,174.79544477333633,4.751054879702895,7.6396871878985095,89.27900257860004,34.01290700165679,2.305558262524288,7330.473778327896,2.389056923964611e6,15.4484959218465,3016.3945072216507,11.988582268553015,92.07946538954397,3.284940290338554,4313.019558253856,6129.819639613761,0.00806116620797696,2.2834477684212535,1131.2083603671188,74.32335566743703,1.1250673325962268,3.8464227782039337,0.021897097335081106,1619.7955014795991,6.336651262584994,262.67491120835547,1388.9220471032154,1297.8062073350297,5.491773662526359,0.06846785210510777,4505.586415799235,110.40205606153009,2.672216083675015,101.71048838201553,41406.196912028034,75.78186050445572,369979.4678529132,0.006637628045495086,1637.62343316481,3.996485146530687,821.7642207796054,0.16864281951447177,53.971152013056354,0.812375951273675,12623.66742239735,21264.73718573273,1.2001320409438867,62.19876417263985,21.672452881168827,0.31999605666950504,106.31801383714549,786.9761322852343,358.3778839845591,7116.560263834505,3.1652145055818566,25954.280987207938,1.846961245055197,17984.608161070064,3.034814375690593,35.67593396395486,10753.344839127853,14.094231479988355,33.396047811749376,1180.5537798678126,1.0918303668886344,1916.3354894836011,1.7832274055103627,983.8558574208331,54.15674072193209,1.9538238843546663,279.8951259602371,15.826806984605772,2.9516368459006697,1.1383811715415615,13.55362043088858,20.00410961803628,129.54006369582046,12635.416689240432,174.29219818922513,19848.681716776515,746.4381375768065,0.9830591005852739,240.36515465291023,152.09372350643253,549.480190533201,4193.267934941954,2179.8642248604633,184035.05200696076,3.847299575412966,454.9174365748453,25.4183061040669,50348.67736941646,5.609977563650617e6,159.24342944413223,697.5777604838192,2.636540871279024,694.5487764436853,57.09380308548155,0.254056244311249,0.7671424255829893,532.6693388987816,1541.447002990761,1439.1092104653058,1.0775200573108235,9.149533331922976,122784.12827593103,20.498343101053468,146.9734025717027,0.815216177080496,2416.7300577963506,446.1657683202585,750.741927014397,0.025938491182561828,686.2574010340323,80.00628084558362,257461.4885239029,15.727860213531034,17944.4403935062,0.9227336906388987,72.2582032083608,1.344004137825706e6,3574.3960494418466,0.006578417047241792,84.55427786339592,24.50410439968058,147.65664173289647,21.256109660533042,3.832396195369674,109.6948250292935,7795.440920567972,2259.3088562287967,23080.111517545036,0.5006218756563137,14.080538387754375,24.174724772219744,38.33417663293138,114.72965279136278,101.4381670384799,1.3052095121085922e8,118.25861768762229,1333.8812482678263,21229.900276566714,1.350438059151275,289129.67423738603,1500.3108094021359,1751.4588087535428,43.33910140406333,0.2032397818966326,1458.7161641805628],"p":[0.19763715475349586,0.19968587253275571,0.823511171730811,0.2603146719403868,0.11550025939082587,0.09140247504140842,0.5317521425134151,0.4568123803302184,0.8964227137992675,0.8116239376036711,0.2907255445045187,0.09812252137805832,0.624746235385615,0.6845834612216652,0.6217148904024585,0.43042517441483996,0.9572600552880033,0.6992455715019545,0.6378765973984133,0.6177897593736876,0.6250011897747738,0.7430520767094166,0.12395322147243526,0.10072609288616352,0.09998490993753695,0.46895421167941276,0.8459418857054397,0.28988287080339425,0.4396529463695209,0.8666422108724783,0.5828994449899065,0.6520549225196453,0.06597662384970393,0.7343611645748604,0.933599421139208,0.4995037173355341,0.15268330180257728,0.5036099788451991,0.9373831117408915,0.7485520062432502,0.5972115928251154,0.03833231002624693,0.0654323906068528,0.31370871641695763,0.2742191694971341,0.8598163455005381,0.4657000315992261,0.9090031094609403,0.17111495544554756,0.5323336226704345,0.9694772541478158,0.8633677487531859,0.6286016118355466,0.6851680801300797,0.3727032519420206,0.17250710381157597,0.1701050202415435,0.8338331107716035,0.19893098913765228,0.7788727279400691,0.011719781364034176,0.8866153909382586,0.200984742637617,0.18588679442913736,0.45090289205854583,0.984757552944022,0.4191247076709228,0.13936732204633562,0.09696848035393502,0.7192538023858253,0.6363225912733819,0.9015067450899861,0.008288259568681289,0.528451931598068,0.7238540019478814,0.38391690487262364,0.11826221865445485,0.11780502219081712,0.44019934512181025,0.081965400555158,0.3724821808090548,0.32152423334239333,0.8678184762850516,0.34111512093983865,0.1959668232946432,0.9636987113799591,0.03093648081218303,0.015864050048120637,0.09781256229138946,0.932070949226971,0.16610990120279823,0.28926405397776556,0.4172081099242637,0.12179787917128393,0.7321262324071207,0.5274788035922935,0.4467872994065245,0.3323360501360819,0.5498317407223225,0.3746414589751341,0.24655022818056316,0.6900955357750003,0.4863183640666666,0.7277601879043343,0.7546129262562249,0.6331665724310622,0.95277362938251,0.3003442769620501,0.16675365806748133,0.37926071641098913,0.8523385514594657,0.4220713985198097,0.9264323646000738,0.04332374395375149,0.47964573848199876,0.8905539499769144,0.16407957897457415,0.8870075749035593,0.3393107008516629,0.22947555454051072,0.8955391680046352,0.9498065649303671,0.015901012772306267,0.6326414290695068,0.9664190858265544,0.13323842388059526,0.4129700116863506,0.43923239055553776,0.45336589719549836,0.3242380061769625,0.7722572817789806,0.6067790525241268,0.9236256494875386,0.45355079797324693,0.19820750677441357,0.9075720519044224,0.6022583985094947,0.09308607846254469,0.30679379950167474,0.6616274200569621,0.49902585414021794,0.8354672160884662,0.279973752418776,0.10880937764369136,0.48881984782791554,0.2022599613651408,0.39827257933693927,0.8143897962922606,0.6260924931405971,0.14806384446987808,0.2355653270938296,0.9060721025266938,0.8242885136114217,0.3819466302422636,0.07077412076536205,0.15167012086963605,0.41297249151853577,0.4348461775405559,0.25311454247736176,0.35448767975261686,0.8771669841299405,0.6548653411649779,0.9199260909668354,0.8536569944388515,0.6176153163457803,0.9524319306263838,0.5751645476570404,0.487848665738976,0.1675583463608712,0.4637352844125322,0.1963955391728971,0.31034648518719155,0.6280186642655932,0.20371640927895585,0.32987976597619717,0.0892203247225214,0.26300064850056737,0.7123659739096775,0.8163554385372971,0.2545617504933835,0.7665614576805044,0.7460284044508023,0.8188388626318952,0.2691268841979033,0.07268565216965284,0.1317879231170065,0.8842959460630806,0.6701624375600757,0.9854785088224793,0.3898341922594297,0.7101759738688167,0.45337138020578927,0.3650994784980015,0.3688182484194096,0.8281254887011624,0.8018554366009403,0.15807872640027654,0.029689928194803317,0.8776679146919966,0.21696558382990827,0.2167577810479404,0.10215275003817115,0.671519282062135,0.3877357597244844,0.13939973042108678,0.7492552928491392,0.9767742207622776,0.28366001986316447,0.560544656695751,0.5674892047026161,0.6892518384045392,0.9335465538009209,0.6610622027318906,0.5533937633029462,0.9511284555756498,0.9203436800464324,0.6415731187038409,0.5666499279015911,0.6109425296961148,0.5359740559646897,0.42619270579594426,0.21641948486614893,0.6546033644336435,0.0482763495414571,0.9430657952619745,0.04655759526148562,0.477214746664149,0.9566752510600731,0.7472331768839591,0.3505187146659696,0.6902148089725753,0.7292017825813861,0.5239687850862216,0.9640656691702989,0.6268377741942652,0.672443105258417,0.29866179653917757,0.5259922166745585,0.4197313711285404,0.7454434374791339,0.7177835766131553,0.6323055764263192,0.16010729813464564,0.3606932384990025,0.5892867275299287,0.9834482651470151,0.6342570834389538,0.9716541753272279,0.1472551597115801,0.9203593959621821,0.9108910563908597,0.3003679161624524,0.44304293282623997,0.011380166617422693,0.5165721447956344,0.9264706949679378,0.13119319165706012,0.7132715618796297,0.8327220763683418,0.7790880433228418,0.3635836083268973,0.8248727522699277,0.5726948104997855,0.9372415327648764,0.29740766705698896,0.2388866607477198,0.6085495946021109,0.758022163161417,0.6581413902213822,0.8067011141501046,0.9665940121209731,0.6203962733588808,0.758524690497518,0.5437090592072178,0.16091194889278104,0.4035749546264151,0.3310049703144835,0.611324097237655,0.6010941746646812,0.6081089529063151,0.5221467843095158,0.32749223306869846,0.5469361091172993,0.39729477590461815,0.30532132739851914,0.12195694423216064,0.23587706928995678,0.015870066247849257,0.9020766442645549,0.5504806040466277,0.3474429200793745,0.7770272780337144,0.9386736182860296,0.29798403001724094,0.12586495171155732,0.6036313939712916,0.12496934180793007,0.9296518640570888,0.45434600461722185,0.010623384773198019,0.6349921943780281,0.2476972370996373,0.5926496080622767,0.7294362494242366,0.13330824776982064,0.3266448007512659,0.3305504525306573,0.7511722575277566,0.44506797160763645,0.1731734816862187,0.9440750763333272,0.6457239387802047,0.4873462731418843,0.25545496586316485,0.09561232987433854,0.4793237535230299,0.8925084490114563,0.04926848652551419,0.2950187832977549,0.02805276936932133,0.8068940731944647,0.9343867778910557,0.08852786239715438,0.9336520113781546,0.5826400006257917,0.5468717057690831,0.4739724141959347,0.1129490724522173,0.4489613093874325,0.7342183758337089,0.9236915942616293,0.6220478482381404,0.8573431724240417,0.4359924051356263,0.8687655863585884,0.9010015910354814,0.7686393623588663,0.00977124221270187,0.9813065923215434,0.28336617585653534,0.39602783883840664,0.6977366725238638,0.33911590151426796,0.0028826844864986434,0.8365035228609683,0.624513317491697,0.7981429941846618,0.4055430287474704,0.5716230851425197,0.6687833111352934,0.45477168173381655,0.09497469260960978,0.39196562494369314,0.8115690711952557,0.11056716465954008,0.6616921963435931,0.3663813940252343,0.236376173188815,0.7499667037383546,0.9898712168570569,0.5321115160420824,0.17081793472697204,0.5868316766535613,0.1123766143378333,0.14070209547597967,0.6836681045592761,0.6340304547723856,0.01759298973612644,0.4182582948314284,0.22331666400729455,0.3391274718752413,0.41252165748723657,0.10841414896737178,0.13002827551965912,0.05881064007696746,0.5201120658781795,0.6814651942368217,0.16217629203236106,0.8358221503519934,0.7700131851726109,0.2154418009853405,0.6733336482623979,0.0980031145712068,0.492178482836104,0.5502589310425434,0.6595897203063148,0.6206420366949115,0.29874868831890167,0.16771311821533819,0.3050652274869987,0.8026142938842631,0.5466670721291875,0.687370799079349,0.5312014878335944,0.3938526323419198,0.6713113972194407,0.25182821446407333,0.4975863556975879,0.02162386304283781,0.6748033933805755,0.024195393180793445,0.8708072742286823,0.8522543076234785,0.875635232063747,0.6349410252029479,0.10210128345616454,0.759106482544615,0.7556601706497257,0.6595939527110743,0.3267975837974386,0.6864761930513008,0.10956397786958827,0.5917967885045439,0.8624512955270629,0.1297079325641839,0.5664495230685218,0.6512639116992789,0.46120949395869326,0.7136511154588421,0.4652238523146859,0.24676229644551695,0.29383680366566667,0.3798436132575753,0.20311744686307476,0.586930852441897,0.07625867666524311,0.887202187402067,0.5747679248369768,0.16544994781928724,0.5436930214110436,0.4585404548047951,0.6409300158622626,0.5523226447215142,0.12406846135458083,0.3363107346940657,0.4254968563455044,0.5648606020418523,0.1636139899571183,0.33584902278124273,0.512101653350417,0.5105471394976127,0.46479179682227567,0.46083720747724155,0.2529405077659297,0.5491703666400474,0.2822143773825485,0.5125246073224103,0.39719734366038884,0.23308790295931514,0.627183387011486,0.9922897576039418,0.15392374640091777,0.42088015757907016,0.036460885804579846,0.860186196698157,0.6984991281622837,0.5105817295111514,0.8146109943516797,0.16340043243921865,0.048126297548230834,0.6308421386810981,0.4279498563962256,0.25255860162233934,0.9177472024161144,0.7410501951846415,0.9888660605699158,0.5646252716079794,0.7453483431638832,0.7043569932745446,0.6736117479352923,0.9383092946465696,0.409451996583325,0.6206740242194249,0.44977280710819634,0.4117242340828591,0.7941538075315173,0.7960548706221848,0.8239995856522901,0.6934527531886332,0.18124189462514595,0.9949462149433121,0.509912394151961,0.12613898861485562,0.1996714750457489,0.8685157208960079,0.2982352571877478,0.9424837902624714,0.18499824007717436,0.35719932240104457,0.0674657711645259,0.363522782291676,0.43717351041239527,0.21812814758212373,0.6027845954989732,0.12361149719923192,0.3360231782633998,0.1185136529010078,0.2405450973442309,0.07062655022884257,0.017000143911114485,0.4651848686264288,0.02741603016451788,0.11388346708742736,0.8391556935210882,0.31587113072449235,0.4696937967845509,0.03689158423502703,0.2551293590826278,0.8585223780492146,0.04273167709789116,0.0741842557402872,0.09597500174291751,0.1908889179036941,0.5123543695782833,0.9401257680705735,0.7241783773988872,0.3178239550523583,0.3188006478056684,0.9747903429917328,0.989635234338563,0.8150196491062476,0.6061370298531548,0.42980269772117574,0.04616974415348252,0.24299522603910173,0.5240014153400903,0.04879363187619257,0.8681170901054924,0.31009271277478234,0.5837278965284434,0.24057884163348975,0.6938005062636614,0.3937066929082329,0.5704939512336107,0.7078207026011818,0.28253063010350954,0.9427793989928102,0.6037976076684206,0.18146362265712224,0.7521447731748276,0.23237321316057713,0.6182020731565003,0.4787386653531891,0.014388344254687047,0.8269081731006518,0.2399665408970879,0.6353275228410795,0.10778429082143948,0.8431428445116427,0.189863404905938,0.6300807028676445,0.1385421828206046,0.7118509512444959,0.25425758093339224,0.41055287491948933,0.1383062752742783,0.2926174937557977,0.4631478542414109,0.2632126701264348,0.7663942752254116,0.4872144032286252,0.6645221495462044,0.5927825303256611,0.7370872944852036,0.6569505037112113,0.9922684535212181,0.9455264376071388,0.31851365498433726,0.21033928845686445,0.9551676427283051,0.79545050386127,0.2728354210958843,0.966347788259158,0.6048117826153414,0.5629364112379414,0.20993728841476988,0.38537907822630024,0.8953808855260197,0.6905345279801227,0.2415166582580992,0.007954799844414717,0.8529754803368108,0.683033032618021,0.34499978347941207,0.4652238716483914,0.059652007377998695,0.9406039575660468,0.4411635296400631,0.9091747176756741,0.7696460164376839,0.9172549890630934,0.9433120578297727,0.7782591691647525,0.8000145496725597,0.3369765763263388,0.3124491751191596,0.1695416686338187,0.06480207581804698,0.704396661880462,0.15187483706760907,0.5369418418436669,0.008152450894024277,0.04947310023734297,0.4973584268691811,0.9222217227308476,0.8505052697984392,0.6650758109506341,0.5356776328272546,0.44112773655653204,0.3006385732283734,0.6662744767590587,0.3499127965616242,0.947010766238612,0.45991672312538046,0.2824339191818839,0.16533159091954297,0.518819770832541,0.8122763179432249,0.5094998491442346,0.8592085486845566,0.4641216007900222,0.26340815883022506,0.0025063920324452926,0.35596724401507207,0.05687200776742629,0.37222616547257226,0.15124936390645738,0.16281947207860137,0.3562623445262665,0.7053331344794935,0.6775603241038926,0.3883586315465759,0.4578790534049064,0.19170394655820444,0.8509510717568558,0.5843834640040837,0.770006484932277,0.6481469834193672,0.8864533615146422,0.5192031874288499,0.21247394015836707,0.895246528155413,0.18422700824990623,0.3684001210191603,0.6716549393828952,0.24346496177505483,0.0773451484396408,0.5393772987423784,0.22326959730923845,0.5439189885197695,0.012925285307094025,0.740652411785552,0.23578207669435103,0.4071442264264038,0.6423377863543864,0.735333771408256,0.575602879521588,0.9952028138245586,0.06824964992415405,0.40397133687713294,0.23784521431329808,0.9718812025259809,0.7082037980520655,0.9895685020063663,0.5819714546126136,0.9068360429995754,0.46838136423358057,0.6378837151786416,0.9317198927269195,0.33681070652257183,0.6469406734600489,0.6260304415141966,0.670024316086133,0.4591043580212575,0.32794020426900783,0.06418449837765183,0.13116032944148226,0.5337053238349914,0.9326717132846898,0.9054617112404235,0.7964172015964959,0.13571774819842153,0.20848341000207404,0.49346737974246024,0.08062595214828838,0.29515362307372084,0.02828863541576454,0.6344815245792412,0.6435208255869258,0.370958320712947,0.6960271355737522,0.5045339221179863,0.47297983795371223,0.6584157423641912,0.4502317352413068,0.31784609253589746,0.9111197955037307,0.11559185012562323,0.6468684742162141,0.2060686852523297,0.707711203999625,0.18053958669325332,0.7303118707151526,0.39291537218124994,0.47631516060300716,0.5107426253051546,0.42968917271218743,0.4268539425689588,0.8747270154143889,0.07130361584441913,0.19998190414699102,0.1757190420406063,0.38244524648278855,0.11788481287699937,0.4916549949245901,0.5619115650854816,0.36392306142954345,0.20677557839373617,0.8865581165256928,0.6098342201098101,0.8487872610786826,0.06426868726698709,0.6262719517821953,0.7802295827088395,0.7225660290338389,0.5501873975369242,0.39939863845669943,0.8259927277449493,0.8030329769578333,0.677225149473706,0.8984043436492177,0.4356292956644301,0.9282607626291759,0.7894733035400665,0.05791399699797917,0.10305874571094131,0.22783663375680252,0.9800642384949498,0.639460357412126,0.4170224793293702,0.6183310508153879,0.2347241954301298,0.5297505953987325,0.6983568305724013,0.9617122687255124,0.608948029516208,0.18837588756372514,0.8863957080210396,0.09855475283527726,0.3085792237105758,0.6203852776456749,0.45234522751096184,0.8832375712198879,0.5984045415664183,0.252451590067319,0.4267141637342955,0.009379490489110465,0.9471430574356452,0.020268482348058114,0.7118521650363068,0.49935852148455506,0.8899154442020911,0.42858437687116724,0.6237746785251794,0.6933828164203126,0.4033563894215406,0.03772700564272613,0.028941722196725417,0.9670374827340991,0.08781058043625811,0.4436530968559589,0.33791036413375264,0.3827460679677841,0.9604826110026969,0.9591067576495762,0.9370239242971057,0.14352735296392316,0.4411108273261952,0.6309218875392173,0.28373924313362453,0.9208000653306343,0.707355847011748,0.7582110162839244,0.8951726123333072,0.5154921580256824,0.3799631157783465,0.17094417822446561,0.7674959958122123,0.3569981403960949,0.8961557186955971,0.4186180460006599,0.8969424653210631,0.9356602355446941,0.570014327453032,0.23483526773189345,0.6509131314897585,0.7910437213912969,0.3078400643789927,0.5550004140486176,0.09105592967947551,0.5865081290098122,0.6805152076115288,0.18156116644709086,0.006240631310246103,0.9737242463837339,0.018966142076252135,0.754849112659544,0.03341919119133996,0.3262854448010981,0.12824687656248246,0.9426972383291661,0.14068087611639002,0.612266790857297,0.2103943085401454,0.07577631898473958,0.5930557172337649,0.27959891689763827,0.642514609448529,0.07659048518827305,0.2576649910427782,0.010470585131480581,0.022856706907193436,0.9269724962902142,0.4265311199620201,0.9686420981468493,0.8336745869898996,0.5339901124163975,0.9061795256720606,0.8603940452428098,0.950154401372064,0.3559848398506613,0.22687360589742767,0.19708384832263603,0.9572202177891362,0.6925998473380806,0.19650681241267964,0.6752066892177286,0.8129382254308062,0.3885869465887224,0.6201840596129518,0.9293073399614677,0.8398726414350837,0.11217317764598445,0.3393141052133364,0.9951739088946427,0.5030817355669688,0.38282564634805194,0.23653649425282475,0.7323271043317017,0.8440393962889232,0.5572265048870952,0.34750279983338506,0.8508695566879065,0.3723469539148707,0.8881641303490959,0.9036813393848,0.7205840463403002,0.14187887349304518,0.516900989823281,0.9649724050254691,0.1979913572372758,0.3954888513151098,0.6040771462594219,0.9709034015572482,0.4139405843439279,0.9119881036322852,0.8319639238280134,0.05809053362417793,0.032983526700248955,0.9439488328611794,0.20220219766445124,0.37923848122885495,0.2476771395156292,0.009910759501470023,0.7656259731924249,0.5026643899159531,0.21801330100590022,0.7901317535197223,0.7088903392586918,0.2782149627553254,0.10002681705339445,0.8904798003760326,0.6566319618226386,0.7675621361840159,0.5963167358843413,0.910359376018264,0.39552873798633037,0.9904815093916011,0.012672900034580215,0.8509160349476392,0.6384195186027035,0.7019355161181795,0.05001861332664381,0.38761171279571327,0.053262599901075625,0.8142406448766979,0.6417556829937376,0.3032147577654971,0.3949658099412656,0.05843371584799106,0.28637848633453644,0.4946524287552221,0.6588107082312185,0.5530678701025924,0.3424269596409504,0.5365951471449091,0.6856402355920836,0.1496244295370357,0.5709335467997727,0.1232332291209679,0.6873053914340508,0.5705986845036799,0.6189156300815184,0.9144248811474154,0.8875781822076427,0.3003321354416135,0.46836565321362666,0.3565877174262029,0.026200596716167146,0.40702082556616515,0.5273736276234562,0.22730371275231165,0.18999161942558795,0.3173969629950799,0.14880747277389417,0.2138006109005346,0.34112781487411636,0.6161902297042572,0.8300737456721887,0.7219356193503397,0.8672183939009666,0.5407230752233778,0.1663300810820798,0.519036941013632,0.76495081241439,0.23840244838723046,0.4428452004319936,0.4734968885516073,0.9745515781435252,0.2395811828240939,0.8427587324215537,0.6812018548121614,0.8900977730447825,0.998577009677722,0.5946532304091048,0.9168200163336062,0.7494473425223915,0.8423080493987554,0.5480340803736665,0.3316173396353004,0.17387912828690766,0.17289780318372028,0.7070831254296424,0.2967582483798832,0.14249006798920294,0.6456117000836148,0.7938381362605309,0.28983250245133396,0.32568399278196924,0.38127456446338326,0.7540903717707692,0.7953083178044229,0.17873453219408653,0.024506557035843368,0.5980823339432066,0.5367858589184222,0.9572571400904657,0.6886009892184941,0.9279965860730701,0.05170603966851517,0.6769279766159362,0.9982050701837468,0.47607932539139197,0.0020900177805351916,0.25836605924433176,0.6899466661648908,0.1987487194479114,0.6295850499265292,0.5198870183379212,0.3636116943146157,0.6563840550531388,0.7972030477660403,0.8126217525376533,0.11745495908944847,0.06205915686492314,0.5607215197234363,0.7851371307915342,0.7285416050097224,0.6085012301720369,0.9980868400029825,0.49840354593278335,0.13328653958458148,0.719638512630701,0.09422284163266448,0.9342271734307741,0.12388467291489524,0.9267428687586134,0.6461597543968107,0.10637899460287548,0.41628368986980036],"mu":[5.36408957597277,8.655532289145398,0.9520976796546088,9.282319664613679,9.616989936678982,3.7440351293120555,0.9210233222049369,1.8355744450808498,1.6341061873527796,5.555705018373478,8.375351410357535,8.026990464037098,4.738695013795711,9.45722290474743,2.4393686820037974,6.993898443987618,1.8691746889855532,7.485513453033672,5.846758457975982,7.174292794751094,8.712163709264015,3.9839617187323895,3.613964451326419,4.350762376328601,6.103097592147167,3.127880111350676,1.822753589826207,2.0887417855854906,4.206870612844343,3.9961584734904543,4.128360549544913,6.1892336551355465,3.4778670805545553,4.524767651964767,0.454127788973957,2.32772690608557,2.348392667738357,8.83306684615289,0.5418517158358083,0.9196403105617423,9.397908621196434,4.587544165054325,4.254961166986407,2.2229181927413966,8.785840210631498,4.992690380485039,2.8439824801199864,4.855294163238282,7.875552488167836,2.5928931222164264,7.408337875677411,1.9085600676393732,7.820466970750868,1.5408374955919002,3.0796690415814876,6.330168481112022,2.622429514051634,1.3646847207918622,4.309281513998535,8.437070363599465,9.470073982858429,4.3576338996320185,2.730464849294374,6.855438044419757,9.989906229593156,3.445039287501994,2.800326872348,4.976320992672325,3.6038499411471814,5.661336730641143,5.361215975922904,5.1279465882450515,2.782712752653107,0.870527528093199,2.0129713494519508,5.892421881881229,3.3289437640897424,0.07600288168832403,2.5495414624870105,5.0849754451279345,0.883787141785437,4.270805547579335,4.552267369492093,8.556572944011867,3.4721057813386924,4.314442895398136,6.066047185113712,3.757315828003731,5.182289701432894,8.591144124553423,7.875735530619128,7.649463471747378,1.7110693994244186,9.603301875985151,4.78869364193784,9.250736834999007,7.298663438007655,1.6367805111939582,3.195052580795894,2.57283155583099,1.5131281154797782,8.871934467126351,1.9388987021373172,1.7879490696111877,8.237329910231807,0.7370244004801996,6.277138007316698,8.826956889173534,2.2175466902114294,2.1008709883901933,2.927545775698337,2.7688288194795407,4.045171767132305,4.0999583370637716,1.5306840172818914,1.8002513863622993,5.814950287540963,8.684898507096182,7.25584483860553,5.037935593317098,7.0550398320239065,1.2404370535424891,9.9086084961794,0.3665069783347952,0.10343187880575977,4.943249190422073,7.065255977397107,6.252817517461791,3.131661052867434,4.912543587948943,4.145580960743844,9.876465622333022,1.559902039970078,9.219782643520862,5.163261913487411,9.14467455589487,1.1993753187776557,3.2896315649538077,5.653815295670494,1.5923657146772974,7.562836191082876,0.011214229066340842,2.328709239861133,4.583249152413432,7.741785094824407,6.902753787385782,4.639560375006329,9.758916680644674,3.6639932577252443,1.6413006540259945,6.003631494371316,9.648642189326155,9.145987568440166,6.436075339777285,8.008506157256221,6.113226367880773,2.5591598751556077,4.486610406083971,1.444387326793164,9.536826630411925,4.2455531286716,5.562544053666962,9.268608313838389,5.833721195474153,3.469135169348554,3.8287698685284988,1.6671358474055054,7.632629057055151,4.257656969576303,6.626640093014638,2.2458970535963063,4.723684912134969,0.7230983560416426,9.22292553365487,0.7608547409528543,6.605741337275122,5.201769037678321,4.514997395955264,7.951161970685048,6.403391056462322,5.282517250674729,5.362455147688838,2.2495304590445175,0.6441054997274342,9.113536352688246,2.9911012012743465,0.6594778813508895,4.8408715766272215,2.098781807852126,8.084160377271505,5.129361270269004,0.9677203612623542,9.75983014959964,5.437120156881798,3.1810847995750535,0.5260218078834278,8.020064445801198,7.830910305424825,2.750469007655847,0.02993170553445168,9.7044681065235,2.9853945412253036,9.793345383515506,8.68692260669773,0.7980955024252578,5.413537164163156,4.997971984257874,7.441410550734071,6.086330489882155,6.283595716468875,3.524021675541411,2.390576125423829,1.3591976369844705,1.2197492120968212,7.326451705252928,3.8156946791435953,1.4970094307814352,1.9945220132070096,4.129393194237911,1.824284652014312,0.47162269968437753,5.874040091362316,6.571047151546177,4.966698959897111,6.1060890935562355,6.828962246633427,3.0372411221709616,5.652139168222135,3.2661996909140756,5.06571336195276,7.8245106334050725,3.7282681579856347,5.534918380858791,8.630185939024383,6.112617688253743,7.945290457178881,3.755172948926635,5.390737043753193,0.36738486510466295,4.974124493138207,4.5812103585467145,8.99471077608646,4.030737810922416,2.6672685350462833,4.780702730729591,7.734542142941027,2.3823470587224693,9.407220991666854,5.656689729294566,9.263146909283256,6.356667649501794,4.945053664587853,8.734850530235382,8.221625480763187,0.8281901855985074,1.5127706455076328,3.715449757914082,3.0378828088104504,9.638148552445214,4.2617214141519515,6.101931827828244,3.6913449742400517,8.934826458922348,6.755116054721897,7.333606195743096,0.6781983990513507,5.782190471702413,0.7595280116778724,6.962252328802629,2.3694166277470408,7.208854081834117,8.84417833610376,2.063024282199599,4.175819002122417,8.249425964920826,8.158937968539883,5.743189498067743,0.7476916092406105,0.09272843353171245,2.269127424304871,1.1608880696105661,8.437478812907282,9.676350252104474,5.92993887756748,5.789163577610359,0.7407819909352686,6.570196921232496,1.8253943536347772,5.907018041732808,0.972142170050212,2.9069868859478842,4.429217855979282,4.205484379261552,8.256440113675449,6.709827177138761,6.306812924455323,8.468904291726746,3.456110907014094,0.06326134474394562,7.686316317133064,0.8285441363661894,3.484028283899401,9.478893933696979,0.38156524844223716,2.4445386592127893,2.6240048569025842,8.755269623096225,7.213364931868405,0.5567051549781787,8.217217240789818,9.287286098208991,3.127766792076745,6.841190490580988,0.39584511828686386,6.200514459755684,4.616217602796013,0.5168990424045394,6.786821261177707,2.3157853471090517,8.543581068288688,0.8197090094862558,8.521081900943472,8.936323453540627,3.0046097841888098,9.648578606272418,7.004918096085097,7.938800691440331,7.735382134672495,0.2577789678941511,1.8260932382752881,1.7150733945824803,5.724230924542521,0.5396768048405409,3.8422141056259296,5.655117481443666,5.151580456747993,5.178795428422422,2.0629733288786967,4.906855944142365,8.397695254419286,9.814896749247685,9.381496253854937,2.249090835382941,5.815762534147668,6.124226000225017,8.804851747449549,9.785494949116318,9.471418278657417,0.5453934332102328,4.5694565721597,0.055323211358149216,2.207112143444101,5.005076870472065,1.6184617287097791,9.716718648548127,9.504220233119746,2.7561651582550906,6.878749825289021,2.4089372328831704,3.018725282943542,5.734542107306291,4.727471089126829,1.1909892510190012,2.7905427007522854,2.0066808471185382,1.0545275476075422,8.356463593598445,1.2387448922993527,5.828864027225961,1.3203063407850513,7.126309278736887,9.712804250443611,2.9032350330692114,5.687815200151967,0.6411028531938645,8.380629396417403,1.7221817214069435,4.836691131009559,4.0332503164544935,2.069146761494287,2.5033569872904615,2.704171958737396,9.135898828832246,7.736951267300434,3.65088087282623,6.88912066949314,0.2334417113956877,0.8517538641230216,3.6757312899881556,5.015369355922942,1.3243190500623925,1.8070394704395953,5.784161610616723,2.9340536573064457,8.416540415696778,1.6592296703014031,6.539653048013514,7.4219549051000815,6.006893526539445,6.890312430025187,3.6920231227654776,3.0118386760840377,4.531756251085937,4.559889143426961,4.500908750744836,1.1118451123249673,5.328443920865274,1.0839512582488164,4.393379081523485,3.0732324894265695,1.4511022522712924,7.6017043402340505,6.285070872845388,1.4434540468103196,2.5711078598590897,0.23099030884515592,2.752840114272601,2.8345433364497485,8.37552906741575,1.6220511742703025,4.322009693580952,6.528541667937027,0.6861658202673215,1.1457414675789024,6.531646927017231,6.576378370501564,7.280372946911418,5.795867894189755,7.113563517854451,2.2239137190253144,5.460111498472893,3.9117392722735467,1.6786962705497066,3.6567962558065736,1.9537597825626807,6.121037779834621,4.642151405576498,2.890208747687788,4.713942260773736,3.088819317136622,3.6410985734909773,8.697832030824369,9.061352364294507,9.58176316846545,2.843349593124873,5.864733832239333,8.241722034568381,6.603166720852938,6.134201524109746,6.334509855159476,4.580762662930386,9.572640673881542,7.558665584183513,2.13587430574121,7.390504862047411,8.51413867868944,7.746261892912822,4.579572866529262,1.226036699162072,8.342986398560706,8.232055820551246,5.736058850366119,6.219538327674918,4.154684437300167,1.8356747985133914,2.574333571379326,0.4746500595673897,2.7587017531742597,5.895284007446091,7.417753188259746,0.8470114359649727,9.004887904796226,9.381433192094114,6.36612529190886,3.0963239685543775,0.958760447334297,2.4669526155513033,9.392412993066877,8.689654125303312,2.1210047345740635,2.099388721992619,7.085016208873367,1.2180621540258074,1.6953496858420958,6.639459909454315,2.8359328342847867,0.8005868181709053,1.5175091522273054,0.5399623420306598,1.7626444105695116,0.11349950763073435,2.4409365151774987,4.779736425191512,8.090413566779125,0.9109033578417725,6.563501764249984,7.673511049741588,8.783208694381791,3.710665084304059,1.782526364566419,3.1354775442826655,0.6495727358920589,1.7160021968481098,2.2498793331513767,7.647836985484313,2.1107474113249003,0.13735193846205362,9.255709820967528,8.573649435076875,6.507843787801009,1.160529430321946,1.633141909857625,7.828919193827679,0.5838660558446795,7.447966578135075,0.6123435853886106,0.43497096019493364,4.772714981930375,9.851702443868422,8.198104844959431,6.420113545776099,4.279793919876427,4.8401916599665284,9.29518771271657,4.242301489639216,8.682421700381848,5.748386512665034,5.443413638342889,7.0025498806646125,9.679464285525803,2.8121094731305463,9.938758061659456,4.659820088168538,7.801626142023377,7.349984854629643,6.917162964755008,0.4945279769715927,2.033577939853628,4.487304186394416,8.629926163947976,8.148174709466346,8.249868444336045,6.75640794873047,8.924446167716688,8.61668458099063,4.6282103622398,0.01633435754093915,1.0786517532922701,0.21874916502389707,4.540879328770315,1.5199485228063558,2.5122913509368017,4.895402869232872,5.373189286631566,3.9279839100851888,8.110496567985361,6.867979942710825,0.8676558703129533,0.5527478008542785,0.4613846998264659,2.385682908886182,2.750000401931587,4.3868282975198225,8.173203579991995,4.876643671585055,8.358630792494345,1.6014495856517241,8.685678497314978,4.325138794183115,2.261820568834507,3.469474135782833,1.5556383400965035,7.1576472687062065,8.557017361842473,0.048260030471980464,1.0055065475370428,0.4189019704214614,9.631351212678918,6.16593647336969,2.343538628773927,3.5408412738898076,8.315401557440838,9.536824515410963,9.47221591559723,5.157708705827475,0.8521575262648295,7.938399706758574,5.057200581542409,6.84023372824284,3.522554349049478,1.9827938183880156,2.6505445364352243,2.8161678948540514,8.465524563198542,2.7904878597147387,6.197953876710908,9.738721227445982,1.6986413127290945,6.919416631081408,3.0369194458290094,8.079502392759167,0.358512043530852,6.676394453328611,7.962704354558683,7.89548271634664,5.691465401788025,5.228060818688238,5.481776785541315,3.6135735650530876,1.5686924436155403,4.791277122309296,9.052089515702217,9.189108648701866,9.283178067471756,8.024372279722714,8.228393646825765,4.051674751770127,8.914496292881557,4.7852899019094375,6.376109878687339,5.725488557487825,5.082475407063887,4.247204685298314,8.441778953858723,9.12273231688124,7.593148095661273,9.813833441650964,7.316259516934023,0.20016837913241936,3.264849654387083,4.751978999034458,5.59645733065353,7.7494790113713785,3.3674401879958737,2.973856117286444,8.878253148084527,4.07522791037578,2.421483086542293,2.379777734634514,9.383879749531655,7.1088675236580485,8.38697155401994,9.527843216947012,0.04701930909346341,6.915645169010407,2.441680044468446,4.315475284542383,0.11389664751778383,7.528094767318601,9.970916400425764,8.910035713547549,9.33176309845676,5.530100303770964,2.492536704531141,6.006308932698083,4.865714981412053,2.4905903489118453,6.902132425987224,3.119747142614857,6.511489511239981,0.16861477816900727,6.662485533334783,7.945318565339865,7.6455241011202935,0.08998476418064838,5.178626170938559,3.1926779265970895,6.083391236022653,6.071920348327941,5.527397924215977,1.6789440337541506,0.18214121078638623,4.251892312431642,5.147243214749386,4.716932130890599,7.338764975464793,6.243436619855826,7.558997756520962,4.41907895567989,4.064135704598566,8.333181113201286,8.197191883375087,4.314383120744902,7.7354261423833215,8.06979993976852,6.154120510972252,6.908582037408928,3.005225069224937,9.005998280777114,6.852175013441029,7.582456520817695,4.509943771488136,3.1937061479537943,4.4990826711586385,8.500379334889349,2.627789766604096,3.0859900342229074,3.8977020121580197,4.555974494958058,8.887632761056718,0.9827141112229265,0.09674058950832842,0.4182014324302208,8.039516800913978,1.4193127469772593,2.649714680148383,0.18414765815322864,7.1648960378517845,9.511347767139975,1.8436212431871035,6.351097983673557,5.291142656817787,2.419953351025983,2.6560606364037143,5.51111519745233,9.479512449670695,1.672749025840805,1.3291149242093692,1.0115799743138565,7.457168260525677,1.3390777848590796,1.812388743597475,3.362599796546688,6.9617495901404,9.857920614641163,8.918329820523596,4.992662189005317,3.8651093414529547,0.3139387054668741,4.832655986223793,5.378004060116213,7.225654550437543,6.38308198356415,1.245194907688898,7.57160564760166,8.031690691541733,9.770107168671078,8.499425782732452,5.584257796369016,4.334194169908918,7.509001659138259,3.154413386228976,6.294017300507679,5.187227024844773,5.884486633365686,4.3606270068049735,7.2308776542729785,6.256432060664898,6.425658437497717,5.5969585899454515,8.730312137369477,2.11866767546365,2.327551981735454,2.138732985328695,8.488612873125835,7.813441206827855,8.700861240995149,9.876017810263576,0.7423470897444906,8.723219038677366,0.08989055289187142,1.3187455670222525,8.867994378884525,6.510118274092109,2.613865912336608,7.510007411407285,5.907784555725131,3.135023234586576,4.436275231637374,9.606468914973743,0.11733138116707398,5.886474194118438,9.544311518191162,5.876403329192399,4.487884405323399,0.08139617641437003,2.556144098102029,7.712980854218177,2.3100898485322974,6.762730471971943,1.9321668537915837,9.597125884338812,3.306307866535323,0.001643446992649622,0.2620767472589236,7.529838366328834,5.762100804731347,6.60416253500264,0.41425593808137373,5.12393465391135,1.592095291143154,5.137132587582299,2.061671152595619,1.090029657178384,6.34017359252266,8.389281693711649,7.691004978228531,6.2354489618305315,0.5412394140580146,3.5769064308768073,8.101461126158107,6.763278733874762,0.9361279819665347,3.5692355834360368,8.687828924985787,9.262555191045777,5.206236067519836,8.90080204295087,0.46636721411002835,7.52284475110643,6.025329119591665,1.433365045734698,8.070491842295969,1.1586018999516368,7.608287500470059,0.9480288965310324,2.4144923797221884,6.338429107324113,1.9540078681744988,0.844539476167212,2.394257085197975,5.779555605460979,5.137151147755407,5.252419709481721,0.7524013281345776,9.148823324188397,8.691003544207208,8.335876451181296,5.189325508089584,6.8712053139825535,5.74376346998015,1.1046439843633027,3.958014771825966,4.878445263032882,2.2883472694607443,7.212159620279088,8.90798848627803,2.52619322456624,7.830305257293664,3.4775539530047084,5.133728115922742,9.673669721123733,9.055459099765768,9.465067025691614,8.178993035446496,6.612594025660236,5.240355789274398,1.5881446331072757,9.975517083067292,6.477470864083809,4.6302377380536015,1.8299779432716323,2.044043458876088,1.8427683308672171,0.7890958852064212,0.34424610706309755,3.0260867281701453,1.0705829918806686,8.8595530094249,9.769079892771176,6.377717196090473,9.015644073235116,1.2665364999226303,0.3607251318552551,1.9228302352484117,2.5120807637797182,5.383454914069699,0.5078087724485814,5.590275245381298,5.853567656380778,6.405610819839653,1.4620463688084628,3.2312167826784877,6.895356217805517,6.6978544693290125,1.8411887948868189,9.068015185196732,4.82952824633389,5.191925559989916,1.9198587881086948,3.2164407979244647,3.3093781209119144,3.1099007805159884,0.7627261422014708,3.8727070637267547,9.63188770391336,5.511444898675393,5.584893738181513,3.9961879164812197,6.455552348092257,1.3297781705582135,5.034178141573515,0.3143111378646424,4.61777642022247,0.5660697377037915,6.659710390365814,8.744528152711016,0.20554820139192298,4.951821333561208,8.519522039172474,0.815405454488829,4.683422839680191,4.980167636759926,5.224813179948972,9.52389160468211,0.8625757706727355,9.512807543502957,2.4342130939644457,9.092234289941782,3.9737253758050795,2.9748607255432913,8.535346283050117,2.2325643020905828,1.5579464260681974,2.3368041571910503,2.0152820622040224,7.930695799296172,1.3604424310791186,9.199643786382687,4.841703501873463,0.5117414382900787,8.665560237196456,4.93654142978921,1.5463166390860295,3.916044339712137,4.069504558703663,3.9528910831127906,3.4252160793496955,5.857475421417277,3.5659760523197814,8.941156856023511,6.113114715140265,1.7711278549576837,5.275606864287563,2.940657151883468,8.471928703466,9.023799604404326,7.894309054966953,7.365200951333026,4.508741413879617,1.6101038480749286,2.3187132358134566,5.795706332810968,4.639568510854451,3.9304609107303934,2.4009942669068884,0.5074578069631475,3.294558876945435,3.905022980837376,0.487289917774858,0.8232144257564378,7.788424871286965,6.798372201944605,9.116915266190436,2.098598351562324,1.9137986447681188,8.003862304077023,5.6008442359711585,4.991906493072618,0.5176816330217027,5.800463874543762,3.8398942782919976,7.377491760900181,4.01146242030271,6.341734934547709,4.013285019381465,6.945508470312365,0.5074818362237044,4.365428265975142,4.146105872513937,2.736674853957246,4.855362937191106,8.325013260099192,6.236999531081874,6.698124664829375,2.6370227589194783,6.1692361234750255,2.0459566669385243,1.1578078614472753,6.04428197015576,7.397195120946325,5.344062370479272,6.8975523752844765,1.290525860913041,3.2442431588668375,2.5754318148684163,3.5885879056951953,4.009768136379462,4.464803739217338,7.352738995583337,4.784428130960075,8.205696136934282,9.101027913048396,5.274232418749049,6.49620235457607,8.117467117313392,1.1530535401488828,2.7399918499440212,3.4058455692663125,7.642242985103083]}
},{}],116:[function(require,module,exports){
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

var positiveLocation = require( './fixtures/julia/positive_location.json' );
var negativeLocation = require( './fixtures/julia/negative_location.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `sigma`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 0.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, -1.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the quantile for `x` when `mu` is positive', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var p;
	var y;

	expected = positiveLocation.expected;
	p = positiveLocation.p;
	mu = positiveLocation.mu;
	sigma = positiveLocation.sigma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], sigma[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `x` when `mu` is negative', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var p;
	var y;

	expected = negativeLocation.expected;
	p = negativeLocation.p;
	mu = negativeLocation.mu;
	sigma = negativeLocation.sigma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], sigma[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `x` when `sigma` is large', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var p;
	var y;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], sigma[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/quantile/test/test.factory.js")
},{"./../lib/factory.js":110,"./fixtures/julia/large_variance.json":113,"./fixtures/julia/negative_location.json":114,"./fixtures/julia/positive_location.json":115,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":254}],117:[function(require,module,exports){
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
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/quantile/test/test.js")
},{"./../lib":111,"tape":254}],118:[function(require,module,exports){
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
var quantile = require( './../lib' );


// FIXTURES //

var positiveLocation = require( './fixtures/julia/positive_location.json' );
var negativeLocation = require( './fixtures/julia/negative_location.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a valid `mu` and `sigma`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a nonpositive `sigma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = quantile( 2.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile for `x` when `mu` is positive', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var p;
	var y;

	expected = positiveLocation.expected;
	p = positiveLocation.p;
	mu = positiveLocation.mu;
	sigma = positiveLocation.sigma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` when `mu` is negative', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var p;
	var y;

	expected = negativeLocation.expected;
	p = negativeLocation.p;
	mu = negativeLocation.mu;
	sigma = negativeLocation.sigma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` when `sigma` is large', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var i;
	var p;
	var y;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], sigma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/quantile/test/test.quantile.js")
},{"./../lib":111,"./fixtures/julia/large_variance.json":113,"./fixtures/julia/negative_location.json":114,"./fixtures/julia/positive_location.json":115,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":254}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
var erfinv = require( '@stdlib/math/base/special/erfinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Returns a function for evaluating the quantile function of a normal distribution.
*
* @param {number} mu - mean
* @param {NonNegativeNumber} sigma - standard deviation
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 2.0 );
* var y = quantile( 0.5 );
* // returns 10.0
*
* y = quantile( 0.8 );
* // returns ~11.683
*/
function factory( mu, sigma ) {
	var A;
	var B;
	if ( isnan( mu ) || isnan( sigma ) || sigma < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( sigma === 0.0 ) {
		degenerate( mu );
	}
	A = mu;
	B = sigma * sqrt( 2.0 );
	return quantile;

	/**
	* Evaluates the quantile function for a normal distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return A + ( B * erfinv( (2.0*p) - 1.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/erfinv":65,"@stdlib/math/base/special/sqrt":83,"@stdlib/stats/base/dists/degenerate/quantile":108,"@stdlib/utils/constant-function":136}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Normal distribution quantile function.
*
* @module @stdlib/stats/base/dists/normal/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/normal/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.842
*
* var myQuantile = quantile.factory( 10.0, 2.0 );
* y = myQuantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":119,"./quantile.js":121,"@stdlib/utils/define-nonenumerable-read-only-property":137}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var erfinv = require( '@stdlib/math/base/special/erfinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Evaluates the quantile function for a normal distribution with mean `mu` and standard deviation `sigma` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - mean
* @param {NonNegativeNumber} sigma - standard deviation
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.842
*
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns 4.0
*
* @example
* var y = quantile( 1.1, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative standard deviation:
* var y = quantile( 0.5, 0.0, -1.0 );
* // returns NaN
*/
function quantile( p, mu, sigma ) {
	var A;
	var B;

	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		isnan( p ) ||
		sigma < 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	if ( sigma === 0.0 ) {
		return mu;
	}
	A = mu;
	B = sigma * sqrt( 2.0 );
	return A + (B * erfinv( (2.0*p) - 1.0 ));
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/erfinv":65,"@stdlib/math/base/special/sqrt":83}],122:[function(require,module,exports){
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

},{"./is_number.js":125}],123:[function(require,module,exports){
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

},{"./is_number.js":125,"./zero_pad.js":129}],124:[function(require,module,exports){
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

},{"./main.js":127}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./format_double.js":122,"./format_integer.js":123,"./is_string.js":126,"./space_pad.js":128,"./zero_pad.js":129}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./main.js":131}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"./main.js":134}],133:[function(require,module,exports){
arguments[4][126][0].apply(exports,arguments)
},{"dup":126}],134:[function(require,module,exports){
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

},{"./is_string.js":133,"@stdlib/string/base/format-interpolate":124,"@stdlib/string/base/format-tokenize":130}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":135}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":138}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":142}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"./define_property.js":140}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":139,"./has_define_property_support.js":141,"./polyfill.js":143}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":132}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":145,"./polyfill.js":146,"@stdlib/assert/has-tostringtag-support":20}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":147}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":147,"./tostringtag.js":148,"@stdlib/assert/has-own-property":16}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){

},{}],151:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"dup":150}],152:[function(require,module,exports){
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
},{"base64-js":149,"buffer":152,"ieee754":240}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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
},{"_process":246}],155:[function(require,module,exports){
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

},{"events":153,"inherits":241,"readable-stream/lib/_stream_duplex.js":157,"readable-stream/lib/_stream_passthrough.js":158,"readable-stream/lib/_stream_readable.js":159,"readable-stream/lib/_stream_transform.js":160,"readable-stream/lib/_stream_writable.js":161,"readable-stream/lib/internal/streams/end-of-stream.js":165,"readable-stream/lib/internal/streams/pipeline.js":167}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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
},{"./_stream_readable":159,"./_stream_writable":161,"_process":246,"inherits":241}],158:[function(require,module,exports){
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
},{"./_stream_transform":160,"inherits":241}],159:[function(require,module,exports){
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
},{"../errors":156,"./_stream_duplex":157,"./internal/streams/async_iterator":162,"./internal/streams/buffer_list":163,"./internal/streams/destroy":164,"./internal/streams/from":166,"./internal/streams/state":168,"./internal/streams/stream":169,"_process":246,"buffer":152,"events":153,"inherits":241,"string_decoder/":253,"util":150}],160:[function(require,module,exports){
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
},{"../errors":156,"./_stream_duplex":157,"inherits":241}],161:[function(require,module,exports){
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
},{"../errors":156,"./_stream_duplex":157,"./internal/streams/destroy":164,"./internal/streams/state":168,"./internal/streams/stream":169,"_process":246,"buffer":152,"inherits":241,"util-deprecate":262}],162:[function(require,module,exports){
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
},{"./end-of-stream":165,"_process":246}],163:[function(require,module,exports){
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
},{"buffer":152,"util":150}],164:[function(require,module,exports){
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
},{"_process":246}],165:[function(require,module,exports){
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
},{"../../../errors":156}],166:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],167:[function(require,module,exports){
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
},{"../../../errors":156,"./end-of-stream":165}],168:[function(require,module,exports){
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
},{"../../../errors":156}],169:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":153}],170:[function(require,module,exports){
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

},{"./":171,"get-intrinsic":235}],171:[function(require,module,exports){
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

},{"function-bind":234,"get-intrinsic":235}],172:[function(require,module,exports){
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

},{"./lib/is_arguments.js":173,"./lib/keys.js":174}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],175:[function(require,module,exports){
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

},{"has-property-descriptors":236,"object-keys":244}],176:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],177:[function(require,module,exports){
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

},{"./ToNumber":207,"./ToPrimitive":209,"./Type":214}],178:[function(require,module,exports){
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

},{"../helpers/isFinite":223,"../helpers/isNaN":225,"../helpers/isPrefixOf":226,"./ToNumber":207,"./ToPrimitive":209,"./Type":214,"get-intrinsic":235}],179:[function(require,module,exports){
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

},{"get-intrinsic":235}],180:[function(require,module,exports){
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

},{"./DayWithinYear":183,"./InLeapYear":187,"./MonthFromTime":197,"get-intrinsic":235}],181:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":230,"./floor":218}],182:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":218}],183:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":181,"./DayFromYear":182,"./YearFromTime":216}],184:[function(require,module,exports){
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

},{"./modulo":219}],185:[function(require,module,exports){
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

},{"../helpers/assertRecord":222,"./IsAccessorDescriptor":188,"./IsDataDescriptor":190,"./Type":214,"get-intrinsic":235}],186:[function(require,module,exports){
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

},{"../helpers/timeConstants":230,"./floor":218,"./modulo":219}],187:[function(require,module,exports){
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

},{"./DaysInYear":184,"./YearFromTime":216,"get-intrinsic":235}],188:[function(require,module,exports){
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

},{"../helpers/assertRecord":222,"./Type":214,"has":239}],189:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":242}],190:[function(require,module,exports){
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

},{"../helpers/assertRecord":222,"./Type":214,"has":239}],191:[function(require,module,exports){
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

},{"../helpers/assertRecord":222,"./IsAccessorDescriptor":188,"./IsDataDescriptor":190,"./Type":214}],192:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":227,"./IsAccessorDescriptor":188,"./IsDataDescriptor":190,"./Type":214}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":223,"../helpers/timeConstants":230}],194:[function(require,module,exports){
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

},{"../helpers/isFinite":223,"./DateFromTime":180,"./Day":181,"./MonthFromTime":197,"./ToInteger":206,"./YearFromTime":216,"./floor":218,"./modulo":219,"get-intrinsic":235}],195:[function(require,module,exports){
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

},{"../helpers/isFinite":223,"../helpers/timeConstants":230,"./ToInteger":206}],196:[function(require,module,exports){
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

},{"../helpers/timeConstants":230,"./floor":218,"./modulo":219}],197:[function(require,module,exports){
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

},{"./DayWithinYear":183,"./InLeapYear":187}],198:[function(require,module,exports){
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

},{"../helpers/isNaN":225}],199:[function(require,module,exports){
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

},{"../helpers/timeConstants":230,"./floor":218,"./modulo":219}],200:[function(require,module,exports){
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

},{"./Type":214}],201:[function(require,module,exports){
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


},{"../helpers/isFinite":223,"./ToNumber":207,"./abs":217,"get-intrinsic":235}],202:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":230,"./DayFromYear":182}],203:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":230,"./modulo":219}],204:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],205:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":207}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":223,"../helpers/isNaN":225,"../helpers/sign":229,"./ToNumber":207,"./abs":217,"./floor":218}],207:[function(require,module,exports){
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

},{"./ToPrimitive":209}],208:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":179,"get-intrinsic":235}],209:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":231}],210:[function(require,module,exports){
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

},{"./IsCallable":189,"./ToBoolean":204,"./Type":214,"get-intrinsic":235,"has":239}],211:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":235}],212:[function(require,module,exports){
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

},{"../helpers/isFinite":223,"../helpers/isNaN":225,"../helpers/sign":229,"./ToNumber":207,"./abs":217,"./floor":218,"./modulo":219}],213:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":207}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":181,"./modulo":219}],216:[function(require,module,exports){
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

},{"call-bind/callBound":170,"get-intrinsic":235}],217:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":235}],218:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],219:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":228}],220:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":230,"./modulo":219}],221:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":177,"./5/AbstractRelationalComparison":178,"./5/CheckObjectCoercible":179,"./5/DateFromTime":180,"./5/Day":181,"./5/DayFromYear":182,"./5/DayWithinYear":183,"./5/DaysInYear":184,"./5/FromPropertyDescriptor":185,"./5/HourFromTime":186,"./5/InLeapYear":187,"./5/IsAccessorDescriptor":188,"./5/IsCallable":189,"./5/IsDataDescriptor":190,"./5/IsGenericDescriptor":191,"./5/IsPropertyDescriptor":192,"./5/MakeDate":193,"./5/MakeDay":194,"./5/MakeTime":195,"./5/MinFromTime":196,"./5/MonthFromTime":197,"./5/SameValue":198,"./5/SecFromTime":199,"./5/StrictEqualityComparison":200,"./5/TimeClip":201,"./5/TimeFromYear":202,"./5/TimeWithinDay":203,"./5/ToBoolean":204,"./5/ToInt32":205,"./5/ToInteger":206,"./5/ToNumber":207,"./5/ToObject":208,"./5/ToPrimitive":209,"./5/ToPropertyDescriptor":210,"./5/ToString":211,"./5/ToUint16":212,"./5/ToUint32":213,"./5/Type":214,"./5/WeekDay":215,"./5/YearFromTime":216,"./5/abs":217,"./5/floor":218,"./5/modulo":219,"./5/msFromTime":220}],222:[function(require,module,exports){
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

},{"./isMatchRecord":224,"get-intrinsic":235,"has":239}],223:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],224:[function(require,module,exports){
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

},{"has":239}],225:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],226:[function(require,module,exports){
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

},{"call-bind/callBound":170}],227:[function(require,module,exports){
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

},{"get-intrinsic":235,"has":239}],228:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],229:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
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

},{"./helpers/isPrimitive":232,"is-callable":242}],232:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":233}],235:[function(require,module,exports){
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

},{"function-bind":234,"has":239,"has-symbols":237}],236:[function(require,module,exports){
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

},{"get-intrinsic":235}],237:[function(require,module,exports){
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

},{"./shams":238}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":234}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{}],243:[function(require,module,exports){
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

},{"./isArguments":245}],244:[function(require,module,exports){
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

},{"./implementation":243,"./isArguments":245}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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
},{"_process":246,"through":260,"timers":261}],248:[function(require,module,exports){
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

},{"buffer":152}],249:[function(require,module,exports){
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

},{"es-abstract/es5":221,"function-bind":234}],250:[function(require,module,exports){
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

},{"./implementation":249,"./polyfill":251,"./shim":252,"define-properties":175,"function-bind":234}],251:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":249}],252:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":251,"define-properties":175}],253:[function(require,module,exports){
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
},{"safe-buffer":248}],254:[function(require,module,exports){
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
},{"./lib/default_stream":255,"./lib/results":257,"./lib/test":258,"_process":246,"defined":176,"through":260,"timers":261}],255:[function(require,module,exports){
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
},{"_process":246,"fs":151,"through":260}],256:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":246,"timers":261}],257:[function(require,module,exports){
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
},{"_process":246,"events":153,"function-bind":234,"has":239,"inherits":241,"object-inspect":259,"resumer":247,"through":260,"timers":261}],258:[function(require,module,exports){
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
},{"./next_tick":256,"deep-equal":172,"defined":176,"events":153,"has":239,"inherits":241,"path":154,"string.prototype.trim":250}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
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
},{"_process":246,"stream":155}],261:[function(require,module,exports){
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
},{"process/browser.js":246,"timers":261}],262:[function(require,module,exports){
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
},{}]},{},[116,117,118]);
