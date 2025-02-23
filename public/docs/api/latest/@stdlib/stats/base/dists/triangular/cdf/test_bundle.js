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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 0.5, -1.0, 1.0, 0.0 );
* // returns 0.875
*
* @example
* var y = cdf( 0.5, -1.0, 1.0, 0.5 );
* // returns 0.75
*
* @example
* var y = cdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~0.278
*
* @example
* var y = cdf( -2.0, -1.0, 1.0, 0.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 0.0, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 1.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 1.0, 0.0, 1.5 );
* // returns NaN
*/
function cdf( x, a, b, c ) {
	var denom1;
	var denom2;

	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b
	) {
		return NaN;
	}
	if ( x <= a ) {
		return 0.0;
	}
	denom1 = ( b - a ) * ( c - a );
	denom2 = ( b - a ) * ( b - c );

	// Case: x > a
	if ( x <= c ) {
		return pow( x - a, 2.0 ) / denom1;
	}
	// Case: x > c
	if ( x < b ) {
		return 1.0 - ( pow( b - x, 2.0 ) / denom2 );
	}
	// Case: x >= b
	return 1.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/pow":73}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a function for evaluating the cumulative distribution function (CDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c`.
*
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.0, 10.0, 2.0 );
* var y = cdf( 0.5 );
* // returns 0.0125
*
* y = cdf( 8.0 );
* // returns 0.95
*/
function factory( a, b, c ) {
	var denom1;
	var denom2;

	if (
		isnan( a ) ||
		isnan( b ) ||
		isnan( c )
	) {
		return constantFunction( NaN );
	}
	if ( !( a <= c && c <= b ) ) {
		return constantFunction( NaN );
	}

	denom1 = ( b - a ) * ( c - a );
	denom2 = ( b - a ) * ( b - c );
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a triangular distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= a ) {
			return 0.0;
		}
		// Case: x > a
		if ( x <= c ) {
			return pow( x - a, 2.0 ) / denom1;
		}
		// Case: x > c
		if ( x < b ) {
			return 1 - ( pow( b - x, 2.0 ) / denom2 );
		}
		// Case: x >= b
		return 1.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/pow":73,"@stdlib/utils/constant-function":134}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Triangular distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/triangular/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/triangular/cdf' );
*
* var y = cdf( 0.5, -1.0, 1.0, 0.0 );
* // returns 0.875
*
* y = cdf( 0.5, -1.0, 1.0, 0.5 );
* // returns 0.75
*
* y = cdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~0.278
*
* y = cdf( -2.0, -1.0, 1.0, 0.0 );
* // returns 0.0
*
* var mycdf = cdf.factory( 0.0, 10.0, 2.0 );
* y = mycdf( 0.5 );
* // returns 0.0125
*
* y = mycdf( 8.0 );
* // returns 0.95
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":111,"./factory.js":112,"@stdlib/utils/define-nonenumerable-read-only-property":135}],114:[function(require,module,exports){
module.exports={"expected":[0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358928,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358933,0.7759189452358926,0.7759189452358927,0.7759189452358923,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358928,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358923,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358923,0.7759189452358927,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358922,0.7759189452358926,0.7759189452358923,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358927,0.7759189452358922,0.7759189452358926,0.7759189452358924,0.7759189452358929,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358939,0.7759189452358928,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358928,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358928,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358929,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358918,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452359057,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358922,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358922,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358929,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358922,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358922,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358927,0.7759189452358927,0.7759189452358918,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358923,0.7759189452358927,0.7759189452358924,0.7759189452358927,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358929,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358923,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358927,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358916,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358929,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358928,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358928,0.7759189452358926,0.775918945235893,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358923,0.7759189452358924,0.7759189452358926,0.7759189452358928,0.7759189452358927,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358928,0.7759189452358926,0.7759189452358927,0.7759189452358923,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358933,0.7759189452358928,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358923,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452359002,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358923,0.7759189452358927,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358928,0.7759189452358927,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358922,0.7759189452358923,0.7759189452358924,0.7759189452358928,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358927,0.7759189452358924,0.7759189452358927,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358923,0.7759189452358843,0.7759189452358924,0.7759189452358929,0.7759189452358924,0.7759189452358931,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358928,0.7759189452358926,0.7759189452358964,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358856,0.7759189452358924,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358928,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358924,0.7759189452358928,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358923,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358923,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358928,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358923,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358928,0.7759189452358924,0.7759189452358927,0.7759189452358924,0.7759189452358923,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358924,0.7759189452358926,0.7759189452358961,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358926,0.7759189452358923,0.7759189452358926,0.7759189452358924,0.7759189452358928,0.7759189452358929,0.7759189452358924,0.7759189452358924,0.7759189452358927,0.7759189452358926,0.7759189452358927,0.7759189452358926,0.7759189452358923,0.7759189452358923,0.7759189452358926,0.7759189452358926,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358926,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358924,0.7759189452358924,0.7759189452358924,0.7759189452358926,0.7759189452358926,0.7759189452358928,0.7759189452358926,0.7759189452358926,0.7759189452358927,0.7759189452358926],"c":[26.71278025544988,36.7209309834017,33.27284298072154,20.602391767920142,20.92919963582849,44.5333258958421,15.234645347433283,22.81582040200891,30.689888999966946,19.804849496625536,37.91411073698599,31.45816439339877,28.427412003644477,41.79451801666623,15.30378446796643,18.459325321596953,7.600654293945742,41.32184963617158,39.01507316615398,13.171218184691053,21.319594905279477,20.75108050253082,10.323733618518343,6.057234312506756,12.784622082928593,34.50847556776508,22.26082632714025,21.26428432972196,23.00844466360118,35.093006092659984,9.41124136459295,46.87963314557628,27.646551633389464,17.19924239274004,22.5626866891251,13.962175363175827,14.725502767124585,21.35171582555975,44.94615257752736,31.517798843415854,16.749290347754496,8.7400707663474,38.57887257689088,19.012239848373095,33.32348409882087,25.65666805039607,15.609274618240974,30.491279341851477,13.223733880656239,22.09873000673975,11.356296843399377,17.90296873662387,34.1633913256433,30.91456863204467,5.993587342702424,21.378405526978227,30.9616979718707,20.008089519286433,22.373523635249917,17.786821181850907,21.894472460620317,15.154706079172975,33.99081322326313,36.421524531487144,24.335425490831703,23.50251210439047,27.541644004709205,26.951924019889887,22.638201129797547,47.711362891332115,18.914969016237045,24.127467610106695,5.191139734424031,4.41526167243857,46.6978182271546,36.15806650606305,23.861635482436153,49.59249545434358,37.1130368207976,3.332556899384686,30.75985354127068,40.641706694325364,17.01687738143592,20.373365614966232,26.989138535200603,40.53769850956536,20.738262119690482,32.680989979698,15.855987559271988,30.1081840862535,13.523080131512254,39.59944945060063,30.97742131762718,26.568586212602614,23.01946035823576,27.787220747883527,24.596950012756338,11.599521829414954,24.92042584987807,34.41251413874747,30.546670808084148,7.496647002722884,4.990596915908398,31.15353343017751,14.211055495614254,14.3334485046934,21.57644136030554,29.159185961503358,21.27433634530797,23.676802970664216,15.995429307393795,24.340364886896506,22.041408863760626,39.13900742149753,47.02646705038495,41.32429435097462,15.355126265060429,33.294025521599984,26.52903051140875,30.792340952603098,15.111768118371469,17.437916035155183,26.589670279507672,37.0823176407888,25.71644762678117,2.1941306619366863,9.045313190509344,41.15525994760113,38.943356941346345,28.966724662511858,30.137467443963825,35.09984995859908,16.79862234506436,36.79954023793431,19.307730459042233,33.85807107142571,11.199986390005197,29.551941941441285,49.56483240167192,41.70712018658019,31.410654862845803,14.267781909668626,32.62460070476713,29.412541207343907,37.04835097262172,22.056756830375278,6.9005093283761925,40.11601725594103,28.205041828655816,49.0029566998919,33.727206893493,37.93688787805464,26.46831210431737,49.02606477947178,32.16437561432895,37.172913113266944,18.45517779037179,42.394207010209044,25.889015350529505,29.94827027068835,43.114459322089644,11.427125785856692,36.64806252452995,18.463527331978955,40.03911078081622,34.16042641625646,17.39144054208325,19.198870587114705,7.516202102427549,28.048200415753037,24.13394103918116,37.177832338950004,19.958824882545667,16.98551989973946,25.61326376805656,34.16392337434336,11.613854855898248,16.09520444396225,35.6978665769938,25.163521749084882,22.515379845758982,27.116862091607427,2.530304267037917,44.62676290756635,24.740376944039745,41.216928272283496,3.635286082581694,8.973872213977797,26.57118354144181,26.36424346614691,17.69500219974516,45.56581632228485,33.60159049445604,52.45500062545689,16.643333461121323,8.939458012834319,20.711095683123848,32.3893218106915,8.030617566197142,42.345117682732344,11.500944450215671,41.47281908883107,19.810909802145485,34.88531387597638,7.669422251296274,38.4451785123592,6.080957860628132,14.593191465651255,41.592586521587705,36.09431831381657,41.32994572210869,32.71068546973767,9.36871431682043,29.196751345857916,34.00420674477703,33.30537932060561,36.0234345241415,7.942822364896413,27.908264488445816,34.829945224793285,22.08897038985219,25.2287698352481,46.46636885704408,29.77207208663436,7.555135827143845,31.035815797114125,35.58394615603962,26.210645101684218,33.550397199455716,27.159118073549237,37.19634240918701,18.152460609186445,15.55005092241334,42.60532003365533,19.10505340324906,16.81277312217414,31.26958295905954,19.865790940168978,39.5932149294463,7.281823935397412,27.26583837601246,17.956593157914245,26.228376487084237,18.152364168415772,30.76530170073608,15.681947205708795,19.417843374462972,9.188603334620414,44.790679542163524,17.394519956291884,22.345605656313037,22.075274483830015,36.40572235163866,13.032432827875635,13.180966175639453,15.627153483140637,13.842425506797243,44.67124122048679,33.48433451283367,29.489464366462585,35.2591592555035,41.75557642119882,23.660746420417997,33.8508471316149,18.07289059752779,18.101408566420723,28.519203954762155,8.886014075114915,38.13035374443487,27.189768461884363,22.765834956539784,37.12310027539512,3.8544516733419485,15.788244313951614,34.85035175773955,19.19775968526446,27.15150142056539,15.387502294710256,34.132369869889544,20.87486096946167,39.890615565452784,41.80987451804954,21.503743566677315,30.578091068281783,33.074360312714795,20.1584029660803,24.092639031701605,16.60750062922023,40.7473377051858,21.699691799639723,26.352321522512653,31.67781853258288,29.007626911755914,28.760311723345097,37.63108246658213,8.267145587874992,10.194606918368494,24.18040922428493,12.51713238981128,38.603049230041066,15.279989281526737,28.415455260949784,35.61738814828935,39.92648046175968,39.182901290584056,28.27892023148808,13.74062595863688,17.248199324032633,20.495834673564286,25.467777285962505,34.236985323198226,26.651856351956162,29.38759620168966,44.271928659783555,17.297201068130413,30.11308380340816,18.77312010855115,18.54897072320074,7.011378472117636,11.813560721458282,30.24129953961217,11.996376632557984,36.996216182519184,17.474651021221042,15.71845535653759,24.839934744660866,14.557998291958743,20.156313774934134,41.580586675838134,25.299077056718847,47.400965525242256,12.926488790681276,7.92298693668996,24.44961934182724,30.234531064943535,20.839212763260715,29.61840775044661,37.227458705623455,47.15203725200301,24.604448634326726,10.779393810645356,23.508611647003043,14.857670650457184,25.76131767408689,6.145263486421489,13.510102414888479,29.5938548394519,26.656860651595835,36.66955964702797,40.09287675317073,40.730709884526014,39.08961684784421,25.51341309836745,42.18609360849257,35.79184793306463,26.91981148615949,19.723352285371902,35.885196170009976,37.067459573069335,8.842678967834575,14.269849655776849,38.468772884204284,45.311740759328856,38.299065951266854,0.9212465405732276,45.26553616384497,23.033575906242817,29.324461702959013,39.86044992893977,13.926876117956759,38.11199280609761,31.997507908859678,13.918805560885087,1.5383336581567417,36.885379347529394,31.042760710931233,24.08037718120796,11.61336572475131,18.56055841374823,18.03217945143575,25.580778768335744,28.82469934004253,43.27712323848591,24.189274052286923,53.40363599425246,12.995195335749258,41.035595107501905,30.049579224819702,10.852567348424813,25.157216633098024,22.206544794226435,34.490437653610535,42.58578058506213,22.154956555179577,15.585439188826836,4.9974935951674055,45.62859828496171,34.07494817468592,23.855956978086574,43.48838209523118,34.23631046364818,5.48600018700292,17.62118838485165,10.17556219018747,15.41688363346447,23.389355567252085,47.92047064905851,47.516395516564444,25.350373635316082,47.11094604437794,18.9631441919522,15.105379782820913,21.213105910502215,27.4919964710472,19.574409278432093,22.48429404052628,39.25602233700937,32.68034693520752,40.10644380988284,13.498434144236871,6.47979049411296,35.375440368980705,25.11300338073115,41.45945671751012,29.649699685165448,26.42320099065401,40.878601427384226,31.184065347575636,20.91414021534375,25.5050997731284,21.990343249559416,5.550567880613995,34.32341346946335,33.13421765768157,13.983476811385414,32.157394941430965,6.388017301172262,29.516130134579043,16.078621180479765,31.289871297568467,33.72038985855335,42.724990652488444,26.386091048666486,12.160412629760351,20.2878727815134,19.070764637704684,14.738175796943814,20.433667380300243,16.461202412656903,34.00356214207456,21.558670836266792,45.144506910081816,21.01608868066326,12.434249374465077,29.847969221102712,23.03408622792932,9.003269590065287,31.218711081080556,17.017718433615848,39.21227818059566,43.232422933295034,20.397947007245747,33.734557914641115,29.183528344572665,40.01861242547703,11.558417829107734,19.462120707723933,13.244265316198595,19.136565034417814,33.34506660294639,38.97106512768819,16.62493379237631,3.6793569425707475,9.676117766118793,8.60976731218783,26.499609651270323,25.943112170195427,37.949974655998986,21.93283711238926,15.67466635116033,29.039948402860617,34.39138414186256,50.08014654075295,23.130135485145573,23.407068270497398,20.05228573996903,49.06460180402166,29.441374383199943,6.14036369763726,16.36419688540625,41.671062957841,27.368027917462044,38.44513246827631,30.695737975993133,26.43041998482021,14.361930680417665,31.819762292494193,17.831642021890726,35.84246245704229,42.83499620539336,27.989723856761778,37.19518793483818,47.845229519746766,22.684880385074116,24.981544658287756,1.520579542083136,21.801655164923712,29.283626552812535,36.91378450778992,43.072208795971044,16.863998229462148,21.860610074921247,28.529320461543534,20.43260351175195,41.61844871465331,25.522690774895533,11.4921149036656,38.56446325343702,28.038693203316576,29.191154788973932,7.145380637464236,36.69314501970648,42.17913844929113,13.307878404172286,8.948861488216224,10.45771161007139,33.93396913900038,13.966751922354904,32.85777530626929,19.674187259665143,36.80334350002521,33.673138472607846,21.920855826780723,45.89253269495812,13.559413726014053,19.740600706148,31.750920684300862,13.297767378868633,40.1789164279613,44.53620890975694,21.78407512460874,17.572436527172172,38.965452681937926,36.40487219541563,40.88415269036696,22.839582511652118,22.34714539587604,33.586522183637385,15.284693608380918,27.69020420751764,13.023805355829353,43.71268274847788,34.94084306998243,31.44794007830283,15.48077936423735,37.58856801971008,28.11392481341234,23.8842623399828,22.011958769414885,40.492365027074115,25.891587385275766,44.53722642517953,5.111749273797386,18.397233151561338,28.04604830989734,16.550799610441338,37.47807802563977,20.967025322308427,30.70157612110776,16.20626567471354,44.09408217255955,51.30774474026928,7.347843485358987,34.838923380321496,35.17364144582044,45.478097316161225,19.745516265820108,29.131809822957504,29.475921364777143,24.191502147959284,39.54916822502377,17.46462689599647,30.015409538293614,35.50543563460458,11.281402611881122,6.783183684540657,36.157797710212975,6.798341971186063,21.41465838883652,42.929059858352424,22.132546204878835,12.348751059580934,29.85789185969681,18.15376714888616,16.22801014457193,51.45172015229959,21.03989478740188,43.62947283667137,15.753199436266534,20.826485901253374,0.8993949977037332,18.009334583057168,20.528096647920155,18.53477264485606,15.695591702954857,34.390179018857786,40.5097575521821,22.345054200015113,37.1728221066049,29.800239723344994,30.24332510939855,7.51193923520871,34.86728678308812,41.72001500737535,24.24593131494315,4.000948430326321,34.62520660420345,46.261330648221715,40.10544071926944,42.166850465922494,6.5124430307901005,39.30710038426657,39.55123412651869,23.21210344438112,40.82026373439687,13.65004525720429,5.823765423361177,32.84162018090505,40.62260014109769,12.329371970747104,34.271665449680086,45.18038733044794,11.75525179206654,40.20580109389891,23.468166051579317,5.611537001545701,34.81170003875716,16.760043801046233,29.800276958244908,26.639670032407487,21.177996570968833,31.943974770492957,26.896065653181942,32.30930429828217,42.47487838367424,21.0486604823654,22.631650612240716,8.399355908559507,15.775987262716114,39.21271398221964,33.413871279822104,14.313536735902774,36.392646139498346,40.992068056146096,22.733691451064324,39.93099995302457,36.46461507045059,33.83203482269453,17.470831667790712,30.770945648204716,21.796788302001,4.144368591119851,31.645170794254852,28.6449234998312,14.851616166902584,27.00681690313213,14.753181028026615,29.842246306152095,2.156732432722133,32.52846166151937,28.57854096076281,47.41366995361216,21.710827716427467,20.588290207130058,22.63853115858774,12.625323778991259,18.714879643927254,38.74052121197194,4.882617047154275,34.9074484372474,43.58708236127994,26.838098293252514,44.27474111222918,42.46160869505748,14.980105591547794,27.1214656151069,26.806391082247053,35.77333783384966,31.890071818193977,30.919797583781182,18.674872290197065,21.93985303749586,13.533313911989227,11.220411830835028,26.463586659715233,19.411962281081305,33.46837067464898,35.86211648995234,20.9617931553976,32.008722805568226,41.326928013981096,7.104428714129252,5.881685503446261,42.97242369673421,38.129462748125675,26.23263514281138,15.118381654408275,37.63385606782661,7.754898481872197,34.84706149579253,42.76523989701748,49.62054115196935,9.772984114251903,22.28955718256626,22.248105311038778,17.176995240762988,21.60872929442705,31.041503209367246,21.843259220508294,18.98463775569408,41.99805103528635,33.2841682767449,20.991537239668382,34.130650135791015,21.55037403312843,36.14928012231133,36.856962702145,24.43158635431372,20.291737755996664,43.7504295340692,29.27701520733011,17.83748188991985,37.858505887643055,4.2171307357957595,38.78526714536212,19.66372199361347,20.322386525975514,20.413253853993204,11.281624786222011,25.604766642264334,25.99278010217443,14.204462005713534,42.27320292355977,31.10039349293354,29.593762269575862,18.482033377262965,30.454523808055818,24.62693583654476,45.91723446277868,28.840362703175813,25.075813379358742,39.72600006608322,33.212298177032686,46.516770068520884,23.862709177461348,29.19469027466657,11.47166314293571,36.31233673059992,47.33970369009137,29.585961626839477,30.64094402562124,37.39200829050906,40.37984679659154,11.812298585267767,24.260548547894658,12.135325017436585,30.54678426397587,22.74940188539511,35.98270777998544,24.479881280987172,4.291078758664987,20.709527620971482,28.5647517778708,27.031962496304153,36.87011826082306,10.11942443739674,40.17023730002201,42.425909374090644,14.371980007877088,51.21131534505403,13.961304252352205,22.007835823318477,13.128846149369075,9.645428592538734,50.360497125260366,28.55014381319988,35.82422576116313,40.968363337588,17.524805302735203,20.005207971485056,28.75605483627187,38.324880182116075,19.10792871190948,25.995789547686076,39.222800924129444,11.474807412858658,34.70098128202144,16.604262389467344,29.209324623012318,18.52360931716362,1.946380321678029,16.771950409873572,40.504757516730976,45.593881865915094,34.69883708244146,32.9182842921833,17.304738142901858,30.04693582962913,12.589478443999383,20.740476043983897,15.739393509689936,36.156158995715856,28.238869689110082,16.071636317673214,34.183059401175825,22.546449217375653,32.29664257021821,40.316525695094256,28.192554242993296,38.042126715714915,22.2384723362447,19.14619455200929,36.20318422937581,3.911323956762442,17.65238466556637,23.641156338822956,33.6736521352841,49.52258171962021,33.696739544724906,16.39069018705458,42.50049680032983,32.17434169800674,25.6172227867893,20.48604597630369,34.121611287991705,30.054533340281115,31.924517081102067,21.717466871076404,45.57762237909097,27.106380963140527,9.266303612314818,23.84472012787267,25.02891587212467,39.67923255693928,29.776459892877774,26.633704246405927,36.41327189750743,7.377320426103908,4.557057415032225,32.19451010201822,31.858313986868094,21.74890453987138,20.963460038614087,47.44517864145675,30.45312926402942,43.63856769323617,10.116911726178085,45.45935843602574,31.44053026867001,36.5735705230056,30.43022898778573,38.03808908635007,34.770847927698696,37.566165552521454,19.169720115351293,31.865540288245697,25.920534373163086,43.6699343192966,18.224331524496648,36.785541242739555,11.694198073612052,23.028450124188353,44.067564355560606,20.845784140411926,14.84345383856192,40.68528234755509,31.719606162924293,41.96783339261154,44.23088765940645,21.39849362098518,35.92840336373065,34.874202383197144,34.59091022112854,28.838811478808275,16.87290356970017,16.533235761948582,19.936382223282706,24.91324452537247,22.810948053852023,44.21779057597796,24.756508498377464,13.769109538551753,47.7059867132147,40.03377148247847,9.872770614897693,20.75869907443094,28.076678727861932,28.032744330154127,34.21215900960862,33.42284595828662,7.5991812126629465,21.604902017276792,19.53701835615476,48.62285750561352,33.281958619751244,35.73554664804476,35.14441169996758,34.37081026072852,23.901831872082198,38.407253329906204,33.26426359761595,27.7269317074217,17.108380129862798,12.02064040190469,9.17431512918101,22.7582579719627,12.830196370700762,40.8083012010618,46.81252579674049,14.1879825859791,26.01309634172409,27.1795694798962,31.11607045666046,13.025065790378932,25.955927813811513,26.34560957953896,21.464627418725456,10.708284802995077,14.826981567500141,21.584668339379725,37.969780185318115,13.269809552242345,12.665972242391511,25.649162578435412,18.211054742806116,29.089667265000685,45.50529654377469,31.721836855922557,17.04125442907027,36.10480733264434,11.174022762340517,15.00319021748483,8.702415886659638,13.89219389309285,39.745253987157945,21.74229012127431,23.093701515642792,20.83918141854869,26.158001745551527,33.130637003586045,35.271944064967045,24.2709945343342,6.3346678781439385,18.838608845141827,28.387430687832286,37.814080337900805,30.62055397697792,27.443345515169277,46.46613412305344,13.506873515991481,22.58370772116361,3.2382398231875418,21.03412755305678,16.114461594510374,36.436130299544295,20.885185287686618,17.13970841324274,38.467551427385345,11.402063508086536,40.05406153775513,49.47218637630176,21.31467627045391,17.159398895266538,27.84081694608129,9.071537734185942,21.993647395943164,17.532493254486024,20.911364593036264,16.910087351190768,19.180306535416506,27.36118663958446,43.24956980253785,39.429370046402646,49.6260990345335,26.622231476421724,34.75443600155735,47.17241102686067,14.761201120095023,19.31902170877474,34.86993411584087,23.216713318168615,32.9619094453781,31.8931772591253,35.39490296261913,25.045753621768192,41.80276507283105,21.38224085330003,21.426424271289306,48.59037364669757,39.752197793458606],"x":[32.22762693505186,46.85599141768371,50.65713988566876,27.932921744969665,30.574888294175704,59.85769558511872,18.517721556428036,26.51249290968851,38.41587874789948,22.46337264496707,47.50642502230394,39.51935816790254,42.842354040224286,57.82961341255776,21.356551101554782,20.203103039953756,10.287962473889769,58.28746106169942,51.30757325039295,13.292728124369487,26.548698839283027,31.63102329005131,12.190241564821456,7.05300392649767,15.153029557420922,50.012418373563044,27.454164574251223,23.589521038881728,25.107726767726263,51.23884772929128,11.683242828659331,61.23768818328704,33.74030868137857,19.30927543583998,32.19162978152646,20.59943921540254,19.393797728951256,23.20886048764862,60.18044753922597,45.07133241110677,18.035470738532528,11.862537174215728,55.351424490429594,25.45851170599343,40.85461290415422,31.91848195632674,20.539622637122743,43.1172709010099,14.618213208400725,29.355934806438025,17.240941874710987,27.272066363697725,49.586085848128754,36.919462613368395,8.056669388371226,26.959891044520724,45.35441333684027,20.189958060760805,31.108671637304692,18.871700111128995,27.655976536160374,21.55959024161602,45.96758916528542,47.367971409909494,32.717361085480036,33.44467413433182,32.36797377161537,30.622233555695804,32.96920649849599,64.49578998717728,24.143636353238374,32.64817549239375,6.162522913682016,6.18526448158558,64.00686848313632,46.16348103894551,29.155067446682228,66.66004495086383,47.655962843050304,3.8505903540188484,45.111819742785,54.88049242971536,20.25081431524761,23.173618541430834,33.62340248411432,54.67796689094885,23.626511658104413,40.82856964609947,18.057824072066488,42.926894618693346,15.953664908096709,56.34785809125104,37.023626130610715,30.705738765293454,26.117013757966596,40.97611813093464,29.00568184925128,17.36081583693464,33.65091787811875,49.58187656475432,45.17305814916416,8.395459690625364,5.210161351045638,46.76537707532822,18.96400342591914,16.082008792930637,24.439115864582313,37.87186767202316,29.62789323388027,31.8889715687246,16.25823962039808,28.028654252299923,32.35929627155231,55.137963574886605,64.45251335791755,58.35993270449063,16.14658542070437,44.08388357310757,36.85868508915358,38.235022288174804,20.787093374584106,23.306042878809087,37.779082082347905,46.05928163941993,36.18274853808354,3.2006212431699517,10.343858612639194,56.498821898505504,50.24928445471144,35.009858775795294,40.07367933331603,44.19889476163417,23.95833393061492,50.65476238013451,27.404771317691594,42.43961461287285,15.283871811836413,38.09246198699466,65.1480190539235,53.733066608494305,41.27893022443553,20.396234660110995,49.22731683499566,35.54312720794806,46.97009066394331,31.24245044922072,7.961054978795369,57.71361044438482,35.73376873699928,66.06466265649985,45.44341541785505,48.38178710709434,37.50450139312078,65.64436970331221,47.05507045255918,50.775641564102216,23.431517706976773,54.65783669188634,35.75692684914904,42.93721549432387,58.06532273528954,15.453896051635596,48.72387015930312,21.35917112278323,57.02399039270581,47.57561193769609,21.061350834189454,27.88280488219714,7.79558127200086,37.6381918451396,32.23172028674994,49.40916527466686,21.730365708631076,25.774257018028603,34.99035288859339,49.00081798565348,16.330198001688462,22.476514686191372,49.71646751357561,38.18080836436386,30.828865648376727,31.347365444453708,3.5377675482265856,57.82312344263963,28.966093984970737,56.51417817251384,4.153668712053197,10.484110292288452,30.475941257716,37.34806211432882,25.505918415618037,61.97517470138514,49.230065407296685,69.85539645135343,19.309978349886933,13.322739564284388,22.058777636596968,43.78263808319598,9.158290673654724,56.74367126170587,12.2118805252109,56.54203529025317,29.978677214151375,49.728065620051844,10.488688911036881,53.685391970887586,6.949938270623003,17.16421198570025,58.517533711965044,49.13839125179495,55.44798545098861,40.668149465130014,12.988309720793797,39.75452655658977,45.42155206677059,45.19242300777241,52.205690983259444,10.51508094862901,37.99196424120136,52.192439840795906,32.92572158897185,28.05062832255131,61.65737794459503,36.159216185167644,9.250177703321675,46.636151612334956,51.93801295977967,34.74297277074419,47.23003427872898,32.819554512094186,49.39001555800343,25.66260001471063,16.859949917104256,57.47889634017211,26.730144465460352,19.263515427306306,47.47015596718628,22.24960231424552,56.33076801273667,10.188942098995637,35.22147605956481,24.08392476502712,36.9083324263137,24.422645186750156,38.69722817244656,16.08765697415608,20.919850561376638,13.560846161119708,58.57017688371725,19.090529945598842,28.40770667981121,26.892156229225062,49.519562550125585,16.698852771610376,14.325590844053886,16.363104577556534,15.601862300639112,61.492924957818694,49.27112060247428,43.82749022472273,47.77857017791365,56.981209426336385,32.36656478039785,43.62829654994431,26.706186820805257,23.60217566687378,35.94699701547349,13.457551990444541,51.286476069453144,33.34874949081356,25.965784194703964,48.27739722632265,5.321775028397755,20.845884313578786,44.76155435291248,21.53106559241605,36.43853651884869,17.91830622405305,51.0606465978295,22.618702391579205,53.03630140316492,55.35375504672355,23.81816705623853,42.12300271823263,49.189933822087404,28.34635379457511,35.78121736294698,16.63710178351779,57.09130487229079,30.20196537019501,31.685911444608138,43.44120671434281,40.894874386302575,33.593743767436564,49.049572440670644,10.771117724146228,10.458516139952208,34.098067179755404,17.095022931521637,54.62561897662658,16.87531764697869,42.996153577607544,49.30167156857604,51.077394185079676,52.78331962707188,35.388848043524945,19.19294135544546,20.54426011500049,25.428611923772745,29.877932585276422,48.86866919072601,31.316533052196867,43.09687360132023,57.4609897781184,21.263720178705515,43.63310960542318,28.23432031967593,22.873541877181257,8.718250900156594,16.743650223188148,42.30050126113669,15.541916052449771,50.55180372365924,26.26227535007679,16.331728357414907,36.927372311796276,19.694359607452665,25.8261386417122,58.26103210740543,31.233673214249535,63.89446731965701,18.86016795895653,11.818039961807028,35.897722379201205,39.43590328304809,30.822352648412146,39.1103061376822,52.62823429595273,63.798073181193885,27.498880732517424,11.401226579775688,27.73708157834254,16.767496234997008,35.101507850175146,6.757049726456032,16.77742547077407,35.74588181341637,39.12463184971002,47.68578442287338,51.997669377455395,53.24421872091609,56.63501924920206,34.87177817869904,56.195705080690715,50.27952335259123,40.07804104977011,29.596795274781023,51.15742622223043,52.99787198998601,9.74793458185025,15.051917732137316,54.254255008943865,62.492991942073196,48.47825364203405,1.3711715000278821,61.39288968059477,26.67680358803073,34.30802691420635,54.189563893657734,17.27496269258638,47.63284044961676,47.474138591119974,16.886843732671178,1.7978469272164999,48.43663033752711,39.112805082201156,30.197315357043788,16.301218038394044,20.330637273683926,24.480920573581013,31.4787417724054,43.458209183754434,57.610538992769285,36.06685632817144,70.94749929848346,15.064222819241799,57.07268164915675,44.182038431267166,15.555376099994872,31.439333628435442,32.44053258416577,49.18541625254066,56.44204496664585,24.657697278514455,23.46359315931668,6.591827022796679,59.567962195878565,51.586223062308456,26.415091106647132,57.09204630657031,45.56465564745586,7.5439767419463415,22.035247114036643,15.013918266847721,16.62360988510178,25.49276078308391,65.01428762112482,64.32054040955583,36.98382205507615,62.31235538140446,27.67043937458916,15.506559175847894,27.343019407493767,34.07300258681151,21.810988898251107,30.989264892623535,52.432838485465766,40.15369490779001,54.20207086958993,15.630483420605294,8.263243286020813,49.39984882016424,33.699349283776726,54.930751523795045,43.070243269577325,32.06916261989274,56.500511967628256,45.43299195507307,22.720641719476284,38.07708931525214,23.34006208855686,7.029285245708747,48.38866576059875,40.11042989640356,15.442714168697623,40.31311764824319,7.408309747630327,42.92555562241932,18.924412868448783,39.251108923080544,42.42466949839602,55.00249068236967,35.69771781494915,18.442617698312894,23.112092517926538,25.39990830123751,17.19590798159261,29.912051612170565,22.273779514778685,48.7391752976683,28.131682077400615,61.82859065934075,21.60103466826031,13.114243560724743,42.28401549081796,30.665901886229108,11.247894520644174,43.92741102750689,17.306756005477236,54.5883732976977,57.09477510558939,28.80788786723364,46.17989519188863,42.40671025783213,50.57487085193052,14.101065086420842,23.29396465935131,18.014821972628404,23.01823221371209,42.19380169731874,50.698031088064184,18.99955351250746,5.323163496904564,11.85929858173942,8.971343852138398,37.48627159220225,30.690172599495114,50.01282066849366,28.16327963695268,15.844750738631618,40.61738682225044,44.78658105277496,66.70864370433053,30.22297934740754,34.04884238094445,20.13050109948357,66.37144054623707,37.456476750562956,9.154738330450611,22.401656818926206,56.39254605110199,35.98456589863464,53.05391932617645,44.72841994077625,31.734385872139352,20.372471385941232,41.767066439779725,22.340200503588957,50.152609826548584,58.16534701169676,35.45200783617024,46.418198243060985,63.94896255462537,28.89555531971104,31.174823223688573,2.312893683675924,32.529649965276704,42.75371582780911,50.24696298018401,60.15271320572692,22.771144733730527,33.14675874574946,41.481431747474254,27.45049626468703,54.42358909365356,38.2272723679927,13.887857449152978,49.23539266534906,38.93994991571476,37.14898819427941,9.6330758435152,49.925543160429854,59.29697974319306,16.390672502501623,11.044547227523326,11.997534371744438,50.921800336572204,18.586900823836014,42.833979749064426,29.658235642287874,52.383258586097384,46.285132326770146,32.47625163116065,61.80280123663278,14.137113457899328,20.201092075210767,41.1693331726258,14.331614348517062,54.0737376416436,60.708221896764776,25.58679738602133,22.284398734509104,56.181561034656404,52.04582134523498,53.29586770714816,33.88674571264242,28.33232877801338,43.52095558858869,15.892830667470493,40.81481423119837,18.088838476846043,57.13192534106984,50.618451902599766,41.56121462731941,18.084836567680757,51.07580518453557,32.79430755492265,33.635723892784355,23.140515452721615,57.296559818645434,38.82201096735319,58.916361942495136,5.949334974367695,20.1728915085064,38.514793716888406,23.048161054933534,49.54000782604476,23.87566171057422,38.61562361671831,23.706366364303793,56.91297618100012,68.50051578216883,10.334229220730338,47.89475008014985,49.7074759031052,62.39193621679142,27.243570428707695,39.138045034892095,34.830627913993496,26.818147563217313,52.11793677691896,18.195268577314696,39.80147461717813,47.5293556021206,15.724610647876128,7.99765565781134,52.11486651502181,7.935075308870422,23.352008862486436,57.43965571638469,31.35463475576406,17.906403060686614,38.84888274432386,23.873091550581357,18.085461768621183,68.26810355488543,22.45481921192808,57.911261056748046,22.6351566764147,28.198134090125535,1.0618468631822375,19.362842048465126,21.050861791330416,19.806028297785165,22.527332041767202,45.84422824492641,55.087287954055626,28.624065673030753,53.24245153458742,43.94784748961128,43.146904069636506,11.407088684787027,45.77663012409249,53.406749193179024,31.102866803674676,4.893072667073695,44.68766234680353,63.31045496949059,53.40505138836065,54.182459101933986,9.302756049356496,54.71470526124226,56.55795754234526,32.044376278323156,57.0709103164793,13.657332566454645,8.158017787635334,45.32695146351148,54.1109673995262,16.31849803655181,46.283751562592435,59.63108842709087,11.83512030551602,53.89512230353292,30.59515313870979,8.022227592896993,43.07579927468757,22.45930083821898,43.640701564327166,33.18310983041219,29.96739893887635,43.240190482608675,36.68378090901441,47.56093246488404,55.96430409906061,25.802388266064995,26.201548171245562,11.906319494698801,20.17491190245045,53.236463303144774,43.527796431546506,20.616427849659402,50.52644591662016,55.93113379007926,32.210084566011716,56.02785732481749,51.65727320420042,49.86758632173697,23.44107775712606,46.69920657398093,32.82080780272378,6.291646798089655,38.00651146472033,37.0982088548552,20.179065204908206,40.61783929875354,15.581706024129971,42.05260441749348,3.253898637080985,39.846733489706125,36.80291731124184,64.37703194826511,30.351323308802073,22.00841799830824,26.093404742203504,16.061742726129495,18.92845947088528,48.74752922373555,5.319128357573131,52.36543846002482,58.38947568704272,35.13237295694651,60.4482388922537,56.19763416291721,16.850131044874146,37.47406464701731,33.08578939081818,50.14565741607044,43.38212520991631,40.70702370462911,24.54068621851233,24.892930009059437,15.333756246339638,13.476323727540866,29.944440669289882,24.287380444135835,47.34346982817636,51.786632022957896,27.791766821286217,39.137592759861505,55.474351156463214,7.397976845890919,7.687207447137359,57.49461474829022,50.66874987875092,31.624150237260395,20.162985367562353,47.31456754052801,11.79801312532804,47.28353374725717,55.459872986290065,65.39999226215896,11.435246527915723,30.790366658937067,29.64311942626163,21.210264446242483,23.342488291166827,41.05425402583363,26.74895708831725,23.066385087325443,54.81657145864551,46.88675324092559,26.559510796120605,45.55898378221946,30.3375590581226,50.36530073776164,53.944170759984516,33.72571829680545,28.290189201598956,57.262236989314786,42.61444565344232,19.878736496390232,54.74881039681345,4.224577394437491,55.0479992793381,20.664252336306117,28.650007950750968,21.432337445994094,13.50734605775504,34.19453513987761,31.428945319058634,17.03281555664503,58.32334578190236,46.060088978487485,42.189845139872226,18.61274208293376,36.019085279237814,30.081851809882345,62.53544626231074,36.31616271824279,32.58079885600961,51.85529798833653,50.60713940095466,63.72353981508261,33.028721182178586,39.72224003278522,15.622440075494758,53.334248054863494,64.79359581109638,43.032993562460426,44.56435649826119,53.614661195912795,56.86153077506047,13.507542041668888,30.759754567186185,12.926643087684424,45.30139369460048,26.607657498470918,51.83653003415516,32.35350793791564,4.308371112147349,29.901228446863286,39.219777601055156,33.610270581020416,50.12536663847471,10.794532394933343,54.50718856140107,59.730362104253146,17.28136775896273,68.47703704181392,18.127175544891998,32.97245109127639,19.795458875207746,10.849963183188825,66.88185085458412,42.9626281912889,50.69336424586164,55.93257129414651,20.291023226647148,26.254897920007146,37.40703662231566,50.145628093793356,22.207251307209464,38.678662020190465,52.79946339473541,11.829752193864707,52.083499758904544,18.884944425493753,42.23467586755751,22.31423792990489,2.1727749442120716,23.459197131216868,53.2536843059922,62.65551341692176,48.95137304368677,45.19911763363005,25.677533525439912,42.80680959785674,13.338539076026839,27.32127786522142,17.531001199686408,47.26151024513469,32.98881133476565,23.807482578473504,49.503157048740896,26.24575380822032,48.61640270924795,54.59195169678276,33.948352366133776,48.136948698011274,26.453639844716392,26.1861820342315,46.770414988154414,5.227621939219635,23.227537165639724,26.23707524993221,44.96950841102924,65.0606510508401,46.43000843700933,19.02146646845374,59.22608386130727,39.10632627518694,30.629748684379962,29.921241123977637,43.2580762410396,37.32937789062056,46.371137642428415,26.75696516860117,61.46608506518611,34.08688437451339,12.984018095935024,28.111382423749696,28.916191544919727,54.93013338005205,41.197779625511004,32.401664877248464,52.796818811006084,7.778251717459828,5.242568259760794,39.38257281334424,38.291847154005254,32.16820391975533,24.227769345710755,64.61263419629037,36.40476800571198,57.56371698872755,10.526913743350939,62.11096473736528,44.371835931599996,50.33955474707451,40.464052442917996,49.81218737185231,46.140101781733655,48.720495409430974,26.034525122840382,42.92737040226959,33.49660151962358,60.07723078250394,23.712783842134805,53.78769651881814,12.928992976214186,26.847024059673757,56.788814699634216,30.097549715382915,20.976266713013437,57.516960242084494,39.367726026995996,56.44769103119994,58.61895047971611,23.58227753472191,45.02955160825455,45.02622402429789,43.09670103695858,41.57718239748793,25.69828600762681,21.13290585297425,26.725870262021374,30.808039191592854,27.31495432723757,59.558468561407345,28.238998445088548,19.905095451392434,62.763976430278454,51.71724052058567,14.17232089906398,22.636338631439774,37.1332422448849,40.99086190890807,46.67904355479875,45.07347290429645,8.298411913808184,32.44808294995978,28.693992740956375,64.28731930311847,42.435815780503304,52.582089885408095,50.43655729062107,43.788142736336695,32.48609577690337,55.82310437157923,44.92266737624468,33.587785449484485,25.032753328442247,17.620319816470353,13.338163796608473,26.090286651159545,17.901685702845107,56.635761805207494,61.42638727813058,20.670840091828243,31.51461949700216,39.325954735593356,37.829552658224806,16.013320267165405,29.66307799835513,32.928225342703875,28.119573178481534,12.381783573287986,17.254239911359882,30.304614057826637,49.345053622956314,17.715265988023077,16.003100615771917,29.035207599320774,25.290584948671466,43.921421686329154,60.64119566318072,47.60550189939107,17.102712055880698,49.46861872491435,11.591151659902021,15.416789279542405,10.361632152544217,19.741988015988447,55.19659012159045,28.088870166475207,29.36123154200811,28.47130301443501,39.29578239578126,45.01470759527203,45.12410780889918,31.314773727647598,7.8335355481828985,25.40563341747979,37.09946037952519,53.73657101302054,42.62993192454494,34.717024119336784,63.113970468404986,14.976432125837723,32.437795641826156,3.3429092598432195,21.81681592023913,18.555039087561518,53.88417991901073,23.906572679436287,20.865326048696893,48.4605394143489,14.290876118987462,52.531736357938414,66.15857221957702,31.39548297713185,23.7670013399464,35.020984636525746,12.87425983742745,32.74374337119205,25.116896881795583,28.941592627739276,17.974592286044803,25.15013872581702,33.52492608803819,56.26200053843566,55.06804107282869,66.64704405042849,35.75813509838804,46.883097628744004,63.443358837089704,21.926520168838078,21.860698484465615,43.86518784853439,32.06991836260638,41.13320457929758,45.14535228944487,44.64187508838963,35.45401324052621,54.018766703629495,29.234447183426493,30.33739340080715,64.18099112868816,53.89337106288909],"b":[41.27009392670982,63.47403263620548,79.16145561172485,39.95248986714518,46.390526764692375,84.98443348624356,23.900846414774094,32.57377458653011,51.08386597082075,26.822443569704344,63.23454773139378,52.73696562903504,66.47794087068955,84.12169898616801,31.28102328948902,23.06230355360576,14.694231029538912,86.10527544918891,71.46307941665066,13.491962968515669,35.12264521825806,49.47041742791,15.250677779039346,8.685726355411813,19.03640975910561,75.4335949187828,35.96946742930812,27.402115914481435,28.54983318256849,77.71251935316174,15.408550065179195,84.7799997443907,43.731991163764725,22.76900972258099,47.97981123716688,31.482287422347824,27.04820873112392,26.25394411033319,85.15949361894091,67.29450324910702,20.144367758633813,16.982316755784787,82.85268714656374,36.028198204692686,53.20309466413421,42.18572034786973,28.623711245247424,63.81958930506063,16.90468353554842,41.25527465494122,26.88975199486824,42.634189910630255,74.87404292911577,46.76543998484524,11.439420058130324,36.11162299447179,68.95355600919078,20.48816041862249,45.43133409100104,20.65053141467674,37.10287750225102,32.06141504093465,65.60541545749993,65.31640956689108,46.46087570051929,49.746427783074814,40.2815079355887,36.640288953219155,49.90853055670154,92.01652389070314,32.71686686208852,46.61922931264269,7.755259909831116,9.087465196621384,92.38780537764296,62.568947211936965,37.83448984773017,94.6450029954112,64.9427644697081,4.699988476260395,68.64414768992393,78.22724302747571,25.553367527698164,27.765077946731523,44.50133187313739,77.86318264042335,28.362255484198275,54.18782049668813,21.66808472747396,63.94520638680423,19.93899467147601,83.80953401708307,46.93733917152393,37.48925743237277,31.195944506044164,62.60141003319491,36.23449788397997,26.807372363143177,47.96594612329145,74.45445543970561,69.15534313781326,9.869205840650356,5.570172113378167,72.36347418333139,26.757216414381194,18.94905108946285,29.13292536041616,52.15769307268205,43.32487645324035,45.354126230694355,16.68915886774514,34.07619043598046,49.27711134947451,81.37079312082874,93.0252838600957,86.29256736199821,17.444308404849473,61.77556947913784,53.79579431105991,50.438480374373704,30.09269047958455,32.92776880690543,56.12589982027153,60.77843982439096,53.34391112584232,4.850922400567366,12.47303006543925,81.65702856065795,68.7871482049073,44.91853691686585,56.365676781569874,59.118223814132854,35.697818170783236,73.3725995498119,40.68115576646596,56.510418158151424,21.980050558058075,52.09600099545956,90.69912847080391,73.45151571168022,57.45953494583582,30.444806256993555,76.45010675130459,45.59519660727074,63.23835864507116,46.30385399668756,9.699988007075667,86.56765930265922,48.07831220539833,94.04003928929795,64.65400004585265,65.50785823779741,55.600086484689704,92.89271992253887,71.47072955974333,73.07947522608208,31.591017335789324,74.7660052479861,51.93693495942149,64.23465407509224,82.57963777702771,22.05642542855808,68.52407463986147,26.10703900001617,84.87339803188256,69.57193918161877,27.078751608259793,42.12149432962104,8.253667791136113,53.36250586301711,45.50931544142762,69.4643781864392,24.63508824670314,40.18478733874177,50.3655797582566,73.32826307632321,24.063391632416604,32.93968629934132,72.7021901642396,59.52471715787296,44.46014595827893,38.283947574235,5.189663601683767,79.4606523679279,35.894828196211364,81.59644887236928,5.003639361896037,12.960385475636729,36.8784116818583,55.35777722316487,38.31315607063366,88.88092387590422,74.85543212003284,98.38610891511465,23.682366157933252,20.50982581470235,24.268516236331404,62.463789582964736,11.007289828840934,80.35238661313309,13.377573130066267,81.25040852491053,46.650346717129175,74.06511441011224,15.111324351778839,78.67414236612257,8.37476966309666,21.379808454303465,86.26867262768675,70.52622047553704,78.59675379435913,53.715675479186864,18.923211244828227,57.06567578608704,64.14210300943765,64.68311901699667,78.73907049194936,14.732707419269087,54.5257914653269,80.66100725151742,50.694296258018056,32.67751347621269,86.56544995904119,46.63195333225339,12.02946806356107,72.2153798055102,78.75310281516283,48.733079076846074,69.65997185155672,42.100739035906685,69.38347926807637,37.976666320195555,19.007737355277136,81.86648689587015,39.23269226854959,23.28189666013085,74.03356836698552,26.158239655724916,83.77464452821204,14.955624032768542,48.266007545307616,34.13065806936252,54.41981636475997,34.70376675381432,51.702881360592215,16.75288257379914,23.382629891060574,20.729832668825587,81.16385121622488,21.87140768106785,38.347484082477706,34.790198861408996,71.0217862778129,22.710530565193316,16.202384775652718,17.56981327960346,18.486738355501956,89.07474704211123,75.1560636323398,67.33696076511005,68.30613270102378,81.94605285258933,46.6411366278185,59.659977712516515,40.86184710723521,32.621556952417464,48.12604341050324,20.953314448062752,72.85802805877843,43.44737704873496,31.212609182260817,66.56663858764236,7.727684707311719,29.138688340474843,61.01254509141731,25.356891199662392,51.66610551676989,22.067961205049208,78.81724481917776,25.47800735766428,74.59074111404307,77.56109819417303,27.613031940965573,61.0527189154964,75.61397604417444,41.77179957710888,54.946497901140106,16.685637577203707,83.8898347694002,44.14279320864739,40.43117919538244,62.72914988365327,60.38590453730134,41.51892324282921,67.77200022223947,14.876777719012676,10.891237222442411,50.3596425066996,24.601201529006534,80.89716675889305,19.491111870018827,66.90352415444762,71.73922755542084,69.36108820741723,75.08336548968988,47.04670388042633,28.13287837783033,25.948675257685096,33.516683642464756,37.10908261336925,72.85963867567334,38.96501133985197,65.57541118680916,79.08655015038059,27.767458217664828,65.80133913994001,43.7474606807671,29.964363106642395,11.516939329084463,24.82731495138495,62.07347770959532,21.355391029111765,72.77834237733862,40.6709810757822,17.337286841537335,56.74664591351258,28.116239734124605,35.12271698467029,85.61127155812122,40.96438613901291,90.93818298712696,28.589377334200638,18.20459800351138,54.668705481132974,54.523014384054086,47.1912959988193,54.67378103394962,77.8802518065347,91.09189278789313,32.24476184727103,12.420820163399684,34.67032959061822,19.898958596752387,50.41623304017472,7.760170430051394,22.134720532703295,45.833107093789536,59.56752284348611,65.74863452471087,71.51746758794646,73.76210383663502,85.40349302317924,50.216304010719135,79.1666880768032,74.03436811581473,61.653048191436305,45.785873142706855,76.1986729076554,79.11831319395863,11.232244932494595,16.334242550318727,80.1370599812602,90.66438195913214,65.16864850579415,2.1088949275240365,87.83624709566146,32.65045398478834,42.479373561096516,77.68442196920783,22.764682370248668,63.2437822492426,72.8505325721254,21.75341369510095,2.2233601473844766,67.37674088960311,52.344924502371505,40.22700698012984,23.98769642494117,23.232962686066067,35.05465582363413,41.1493888240418,67.45217264665467,81.11245053551625,55.542038850949915,99.71344947828385,18.456721978559262,83.36803202247702,67.35444979819148,23.26637794188498,41.73986215956985,49.22078091379584,73.2801675020053,79.16159105331957,28.761338176300413,36.381077791635576,9.205989887261858,82.4237631586482,80.29873935743123,30.611197948624532,79.39741429651245,64.13927672868624,10.91835614881408,29.272797435340525,22.947171475665055,18.602229225283516,28.941627694396338,93.0423153635947,91.87360477305666,56.058708347731546,87.2374802566193,41.94743270730309,16.164356505481305,37.393986130337495,44.863607300049495,25.478216395478277,44.93451535254256,74.03832128488277,52.40743581580168,77.31409008230197,19.126316818378214,11.187497383900995,72.39509381335931,47.77802706360048,77.01907885142191,65.07535590870329,41.326613394978146,82.11511534894751,68.79637012321308,25.682687841613955,58.690862835847575,25.55314048560382,9.453877213662745,71.45088071615805,51.549037814329694,17.835365570103793,53.68572030685189,9.081241255057266,64.91243837645516,23.590540305640136,52.3048224030415,56.69671836977432,75.13340187721961,50.96560875817055,28.743290639471173,27.74284931451401,35.77754452358978,21.22575023200783,45.453367904416865,31.804422819298708,72.90055335630798,38.909177923946785,89.18479570974463,22.560146515252015,14.229202024849466,62.674888425974004,43.17947573259665,14.92831358260747,64.76534296811694,17.78067900909811,79.79992325270443,79.82430309198782,42.59732156255525,66.58600220947902,64.08821709239146,67.8835330727098,18.27013908456557,29.57688138629022,25.8369072641662,29.38284203526814,56.7027082286173,69.92625424088801,22.8931196775374,8.01844540985655,15.438970258757863,9.564206014481753,55.50064873106984,38.47373209501424,69.7917725107792,38.379079666383944,16.123631104461932,59.600435823866704,61.831157339253735,93.97370571932389,41.85282333540332,51.49772114711582,20.258747603464702,94.74875131269427,50.598510029513584,14.097284279828308,32.301031241109015,80.53075562842982,50.11274838561243,77.00734552736733,67.73723067350605,40.43108031304892,30.22770745854878,58.077251406572586,29.732698177460485,73.61636915700029,83.30189190409988,47.68760757020475,61.54078842934789,90.35359043829142,39.07894324599606,41.32968703974329,3.612018553071872,50.119901246001604,64.84006649542789,72.10882664294853,88.15891288800579,32.45684959245374,51.652191942357184,62.71847523745969,38.957446005308114,75.4196504400069,59.0584516142483,17.816057841052853,66.73207617867762,56.814291618459,50.19711991455803,13.712047226205586,71.62216146362499,87.36439917682256,21.445403031879252,14.480756831076702,14.52231834206454,78.77604756924178,26.162368713580307,59.19155134025092,46.02866861858557,77.92900375064096,66.96449927038324,49.783499446049866,87.89021335792324,15.084343917811092,20.956140809402225,56.61231626669867,16.026770649425547,76.85650377808659,87.22480560607588,31.821964476785844,30.010409120868403,84.4101049178563,77.69164155063906,73.64684568886234,52.00032427610357,38.14598749171358,59.810036929210796,16.889967959348624,62.33469679773991,26.3937647004257,79.13490479748529,76.32438148019213,58.14353442694384,22.35460192555025,73.1902725409334,40.46853839165138,49.62479382246619,24.990963370840813,84.84970599879288,60.0234940224595,82.49323829788403,7.322689754674725,23.08436539236352,55.679964443560294,33.701617045287925,69.3174573930977,28.64483301481198,51.59196138403346,36.00397260067982,77.93158878715359,96.6907944378811,15.230882927593239,69.30185146316146,73.53800573964881,90.12486132726922,39.53782105952812,55.54485684152864,43.61051972864648,31.124949881785966,72.7264289724814,19.39327165335422,55.84728252355792,67.24448201148209,23.0099558871483,9.988975338775967,78.27901510047488,9.798930150446878,26.528602651403272,81.23208217873112,46.47571357450375,27.019056175232844,53.59104023661615,33.250832242484904,21.131048704191087,95.84123489856981,24.77481252231186,81.32852105774836,33.919218554728346,40.28512205092276,1.328212497018617,21.582132500216616,21.90801826880075,21.890453839856562,33.729055334960776,64.62496106758867,78.98946423148303,38.919502207103776,79.59116113845889,67.14509732623223,64.30437110381067,17.7938048297096,63.66423113874393,72.56900596203579,42.345901546620205,6.355852039179175,61.18665664233437,91.26520201295203,75.21187530641721,73.88395776329945,13.877917397015413,79.97792047189903,84.44318156727991,46.5262903191324,83.71642629339583,13.669281267331147,11.985395261649167,65.79863500468133,76.22728772386613,22.859303769015934,65.97947448789452,83.32530791573491,11.966077417925142,76.34093854610752,42.28098036645804,11.974937680019075,56.626102464998525,31.804137898916437,66.33427582341461,43.91211859945179,44.37902004199288,61.762130192241095,52.73229454257924,72.5683990868739,78.08235993168566,33.59687994802292,32.05496218550995,17.656543265362117,27.38764748052448,76.23062754759906,60.11118299763824,30.951018847259355,73.7010553620727,80.42610466296824,47.748136105836394,82.4212114668711,76.56804909178895,76.16041974890082,33.23024440695686,72.81612006653184,50.89643859394532,9.812450446221588,48.43693979342356,50.95871273370227,28.914264000930316,62.935272200443315,16.940204340454667,62.07342577350916,5.052876879571961,51.84620242999859,50.2880885221206,92.19115803658366,44.518788104260786,24.336943054709565,31.758218680866136,21.696297357346943,19.27865751764065,65.15560815842679,6.034857977137595,80.99058575660426,82.66035044061036,48.732153553496275,86.96725715552844,78.72002945435966,19.916334770502324,54.4487949455351,43.38186020322111,73.71135796337384,62.22517189793774,56.75473532370304,34.15861975457691,29.73496870760692,18.28586739731042,17.175249563049913,35.65185364248802,32.28140282974675,70.09389851476456,77.89740434922314,38.990593373640756,50.826507247357576,78.67129827306833,7.879295628829288,10.647647424358846,81.30605337195166,71.22890260194205,40.46439550770542,28.434414332380488,63.18763147745412,18.427341705243702,67.67510514714517,76.2747400805174,91.27290842828309,14.160789753373733,44.72879388244856,41.768419534255464,27.82344986695685,26.18526151956797,57.471749200899495,34.79262785885458,29.759058095095874,75.83457151272574,69.19035163374691,35.689087739912864,64.29755182794824,44.745544475377315,73.67472430585548,81.96136213796078,48.964923697917484,41.404920649846126,79.41699123907648,64.48328110241037,23.225697612979303,82.44314713479287,4.236787373948809,81.71333143799502,22.3047807360192,42.30446585818103,23.103286844549867,17.156769568459225,48.27882480706691,40.34240155650788,21.67035039866215,84.64010406001867,70.58888560554783,62.8431234984763,18.827059764859918,45.14306756732681,39.026052890506556,89.78364378944394,48.57392413933783,44.886414476566756,71.7432082904733,79.12874421260423,91.93677157034378,48.05785359747505,56.983829832357856,22.428298077173476,81.24437506780359,93.41202394689678,65.08153806023758,67.39400254459011,80.21427709399693,83.8858692563978,16.28716292469906,41.41623503087695,14.22413473991563,69.49391916311583,32.93388033901868,77.83138950235865,45.26356932062888,4.33672467202975,44.97248176433911,56.69038465487834,44.39645144385749,71.8594515341573,11.901479111042402,78.01489712953585,88.1037606250064,22.05177104187406,96.78692988209352,24.95778314702487,50.950679208380464,30.72642922158804,12.824988947105398,93.9712341927438,66.59418530033652,75.07367828787979,80.46876683408337,24.826676839869933,36.50225715786834,51.59169519769803,69.52762165009761,27.28908293240389,59.4742457154212,75.06055774236579,12.411740534171587,80.58489946970198,22.624484838378713,63.59180790156201,28.529575562975946,2.5439848835427314,34.4240001902901,74.15757454420253,90.63076804991952,72.3206693205291,65.33549432218368,39.4060613110883,63.72864914666677,14.566742947026853,38.111547605136955,20.468626548132697,65.47049735534112,40.777095042091105,36.49163111963944,74.62289025899979,32.311351203434924,75.37524133930071,77.99877983029678,43.38589751705371,64.68901258388634,33.3650764220276,37.72935959257368,64.09706809039162,7.385901534113861,32.3688851276489,30.49349658500734,63.4908587676469,90.53778345441744,67.30822506636028,23.33504199811931,86.65034018277319,50.472415917838234,38.848580976026824,45.39174205345236,58.23876157250163,49.257640911821156,70.05866644535585,35.02002299365988,87.5177430230776,45.532528351518835,19.079801434189253,35.10725288334406,35.289997382303625,79.93640740687584,59.9248472456323,41.859152391178874,79.66024598832941,8.435642245000361,6.366572161593478,51.16854322690866,48.84064654651586,49.2523000320343,29.580122887861048,92.76140409038686,46.163424953872386,80.39621083196121,11.199177166468676,89.41391785388122,65.57476529835498,72.91107217733082,56.91609955580441,69.1176914572124,64.78179912486104,67.00979072533423,37.2904631916152,61.06499769902848,45.91876682692776,86.97959911844586,32.711973085436405,81.66543035313022,14.953635327477732,33.108182487621974,77.64732501042407,45.26728872837582,31.03198742567797,85.11516933436079,51.90803320813836,80.18971730096594,82.21046456618589,27.162938086884928,59.95232958713986,61.67207583515477,57.043295957643046,62.463764609410774,40.16890214984548,28.674795480560014,37.85831419879132,40.47349125013425,34.69998793260491,84.71194650413607,33.94909379703919,29.966018864433632,87.45394206085533,70.87414356122775,21.222116438684168,25.715026889316967,51.98291648214661,62.23775366988844,67.12048074028884,64.1765261190085,9.444911699204939,50.22720018834461,43.70830654305867,89.97169222864983,57.44501839870307,80.20467306815415,75.51045866426577,59.22935497803428,46.56135978997808,84.37915811618234,64.03847194314139,43.197585972418096,38.02602172568901,26.80188355012088,20.165454983639123,31.553676858966682,26.217197909935237,82.58739716147517,85.38813413047804,31.300514571281543,40.53524045450705,59.241882434698375,48.837372953803744,20.913038072369368,35.741539490465684,43.72146932849716,39.031413681037726,15.125750589982271,21.234115459987486,44.60234995314188,67.9966210294233,25.00429783583174,21.474852582119492,34.587166178128165,36.89859908254819,68.24043861916603,85.4589061323631,73.64929336024113,17.20348159565311,71.3807099248941,12.275100735298402,16.094950629026417,13.082180734933115,29.333654536823772,80.53150967418654,38.495096105794715,39.63784242083018,40.98537849406425,60.83726029629089,64.50052874227248,61.278294974324666,42.864168398518196,10.291167141336954,36.17331316974055,51.384216691764635,79.84402326319679,62.32121438265623,46.64337538661451,90.41074214333933,17.386006859980732,48.595137800596284,3.514531424697802,23.100157803736757,22.556753496617596,82.49302834564048,28.860617160846914,26.974067859550708,64.84563029173917,19.027543191850157,72.9908659129766,93.51855191873616,47.9245665927435,34.60121495843421,46.79400990947837,19.109426668845366,50.3702330382373,37.552731173440336,42.108426840531756,19.72001718996422,34.9386267226093,43.63135583049578,77.59794734649515,80.710125933121,94.5555866473305,50.73790003839196,66.76996462406348,90.12216190176602,33.67519873548016,26.028181223860123,58.6143349572514,46.58615408694858,54.53134070534035,66.8743979440717,59.80375448012926,52.520007911119365,74.04884150609108,42.10938653840067,44.948342516651586,89.74428457107993,77.08007052002972],"a":[16.203952589609052,17.408045299617218,0.1461595242948821,6.633684983554318,2.548837366855672,15.331941068972261,8.978572586288461,15.771618345776904,15.96761301913483,14.738895131129723,19.63545611657056,16.09713967614897,0.9589889492369563,11.238808327760879,3.769922304726343,15.136466030236324,2.4798485510607327,8.992993173862867,15.591073828982127,12.93967466409049,11.355264928080619,0.018782687043321644,6.767005483686943,4.159743434470848,8.271498248681674,4.9649048117885375,12.364649729670818,16.83342463796886,19.008153243744985,4.326263672259385,5.081824205866998,19.519611231268073,16.034580099950162,13.178464498554355,4.214233968488936,1.3145232981143717,5.829823503981393,17.812829916616103,15.916409836858406,5.690834504974398,14.29840660444694,2.790048348855003,6.617901072880152,6.728532979521242,18.972525796166863,13.724455418559085,6.214239602183622,6.431794624656586,10.566480870695493,8.269748167983305,0.14279915226077744,0.04966508785165136,4.77464340647102,19.47193030181095,2.0622770202206153,10.742594083626592,3.5356289982032996,19.661529538342425,5.728244025077225,15.719527861031306,10.915626276221989,2.949865619737939,11.168442687989364,15.562499705991177,8.36321052497636,4.557204379886239,18.344821187035688,19.95795798004699,2.9519321649523045,15.727762608751622,8.951470997372173,7.890814820261842,3.340118478279974,1.0424291042768496,13.714521180605006,17.092227841813965,13.774725092185722,17.069390686889818,17.022942009755887,2.3454171625672915,3.411434221556897,13.508958649397762,10.854442069258297,15.03733777328074,14.347202942193945,13.592680415350316,15.234552149402258,17.155352444820707,11.660273370716641,5.681463325009899,8.891474208755078,7.68448421091831,19.456063045413696,18.68502648204283,17.11691097569154,2.6550896564446935,16.195881807905526,0.6210759405737631,8.2840184403796,5.506503727757712,2.675327709867852,5.783912598704961,4.57220544567237,1.404352003291165,5.154065590702923,11.00147577725862,16.121465949998736,12.556717040321313,5.356198482382006,8.028087861493724,15.494630563816209,17.312137345024887,2.3801368568555326,8.6521629419981,13.820227932230775,8.861997929053281,13.846959609770146,12.733388863907468,6.8453355491004375,16.60992391160243,4.297140164029689,6.255894611178983,5.267663132309899,19.97624505077431,5.7723659567450625,0.27621042226907644,6.57086723575544,11.917303266302461,17.39932303739435,17.45121776855722,11.203498022348445,17.761146035508055,3.15541890516291,10.39769260309991,3.8783972553566537,17.505492763575816,3.4179299524613516,13.277536042299056,19.87025836775482,18.791052740140948,12.6061420343053,2.5896959075940984,0.9872601341241971,17.730390185945964,18.141959078340356,4.552939074443154,4.8795843381611315,6.5828866187939195,13.85866046585242,16.490987102183464,11.401361147866185,18.033588228575752,5.438278440352695,17.359018950441172,3.789380810143239,11.252205361990924,8.972502817072119,19.025221729236854,7.085195881835578,5.1971584363184675,14.62481016357815,3.753905253811607,13.636981939269699,12.945727228527964,7.673537785542446,8.59709148773824,10.398235281910338,2.6511813637594406,6.983830539437235,9.773972118333285,8.703200796940322,13.870390190032786,16.583061542978726,0.23812343664415536,7.744731912142018,5.891447705490611,2.626617274951384,3.935285317671924,8.984692137597538,0.35840391638092495,6.67359952478193,19.05541754787045,0.6105304969286163,19.480410391126707,16.6880529670193,12.067221616354571,2.6474809749200956,6.096034873900971,19.130464279206727,5.434004786343194,2.81089440967079,14.296929020157418,3.820717320514513,19.29763983642403,11.56190269611308,0.5868866520702731,18.143017507932427,10.67876407333463,5.8817777093236945,14.90792368811543,10.146218720271474,12.75764252630323,0.4356992683081229,6.6016771354886306,2.2971627502573444,9.404157767633485,4.425070416394257,9.69397791716412,9.341217877923246,11.238157747668973,14.427285483329207,17.547323250799856,2.4713866973387466,9.078360632541678,12.247860401729884,10.653998271917452,5.187301762317658,3.041249621558322,8.693249259148864,1.7448071658274733,1.438976396299947,19.85157147175707,17.519109604713186,17.60103624321852,4.325145222142668,1.30856313970531,4.420419831395508,9.951850202764575,7.48313604983041,16.372861536965374,13.96066294624486,3.8414987013950297,13.05397014363483,14.262945483507545,4.575045124776871,12.142755978582723,0.39854705882601316,15.323314172736954,7.698935519876953,1.742158816784487,12.105956289434744,6.280643552864484,5.877164030125086,6.204017012765628,15.650602563652868,14.908846104869413,16.555690426764112,0.8570668393563263,18.533129460145474,14.162684561285456,10.793956326787644,12.896455363378161,11.416616635789257,6.04587860836812,10.999824236203771,14.224760330433481,10.489727031278036,12.616646466520471,3.401791143649784,2.167609097097243,11.402769494374363,12.74233949003599,7.071355971263356,15.219407869895472,1.621694858188527,7.61941027217981,14.365157297171777,0.17471040501478186,13.06067723362454,15.45350923466116,16.6681649691426,15.868006307964798,1.0583905742403266,6.1506477968021755,15.964038849141385,14.751523716341008,9.454572195777192,10.564923555056932,1.8746566189340275,17.551880287266055,14.84082632493459,16.001304548368264,17.093489028226916,8.578660441237101,2.365295385744033,4.555836078537974,1.8194440585633487,16.551094087516436,9.603056764330521,5.498166551208494,16.188888051391736,9.262069491772614,6.35585753559833,19.549955146473618,15.872554929332846,3.495696227828442,9.691714147240793,5.281795290322133,3.7937234591773494,8.071207818461797,12.24000796618542,0.6311749791214272,9.541273153793366,18.6778334107982,13.266595582551703,14.730582365700563,3.3509549099746216,10.967383765454661,11.096170630653459,17.06399659854918,6.355549417892119,17.763071874772734,3.2638538773931813,19.13948556223111,9.7387922513496,4.3499702581823785,0.7443101874196811,10.308275083566452,3.7588441341854573,2.4190183233023532,7.261862387198277,5.240166548984608,11.165337890660489,0.7293750363662577,14.549831702471124,1.8066927173767944,4.770394206125341,9.352167099224582,9.795128871877239,13.990394892167322,15.971738561447403,1.6195539969301764,0.5007604690592338,2.6346625696772863,12.7008369212842,1.8158196007494354,11.531100855392484,7.880478453628679,15.432148547520207,19.08895747427885,9.594459072217623,15.451041893886423,11.218398499161179,7.963098679216305,4.979472932599647,7.284048107716301,17.870846926263127,2.8988730754893854,15.67756940263541,17.407674180103054,16.885566855800782,5.65593847457587,7.680560876567313,15.490049061821228,8.184827628117306,1.8461195224264815,0.9089922727934141,6.783166137972341,6.711228754476464,7.117667232438105,12.779578191326824,8.388714288074546,12.571971505033792,18.90209348126502,0.06389108970317192,14.534023819090658,16.091215750168057,19.828018554287887,12.555576737019587,7.546922718121287,19.969521594968583,2.505981827217787,8.263054192800201,1.0438176035880575,14.873868777752257,15.664870720436506,12.42423280094373,2.6804189088046204,15.187580926846497,5.743767270385489,14.341902986253952,0.9397839419860965,15.964052762430008,1.555922215726997,19.972890450744707,9.0525556717431,10.476091186607892,3.1194419202952783,1.8911202607925226,13.186315406626331,2.7051478802230733,6.488390340026631,16.18194690878283,17.38585371663861,0.5732063543117416,1.9594081856824497,19.066414126137822,0.7063015568487208,18.97939356784946,17.565891203562913,12.64955852073021,1.564418643089156,9.209969508454297,0.955822612719115,13.117403891768769,19.381207343228798,15.347311838443183,15.495221944244806,3.1822315807249524,18.143868574828993,2.370939580283493,14.340911548372834,9.532236379774819,14.951546453785248,15.31249028936128,6.277628981591223,14.146912667510701,18.439493019682438,13.246492079889274,9.435703170534907,3.081328283070137,8.651199407945303,8.75127392265731,15.789202623482964,4.0761546885040145,15.664526957325888,11.110237007422645,4.03199334251827,17.47175748234252,1.5485187128428368,19.418383682881743,2.7327949017669173,7.521342443477446,19.840681783289845,11.20282400225641,16.616240418806917,4.443796888255767,3.9637712501762357,10.65581685622481,16.119318229835248,17.13393152078585,19.329574700382743,8.642301119304827,0.1893435751887118,14.906174934824747,7.010251644945429,10.054839073767905,2.372112412368268,5.3850339152547555,5.924083563749387,9.033455469138016,13.352116102206889,19.901443626210693,11.138485025547178,6.150435148896691,8.491263881265931,4.726019842189091,7.0016212229244745,16.46694228187274,9.912327856162722,16.81698865464897,4.372366549240261,10.01931934353038,3.9860662946329395,19.903112023626125,6.713271010981732,12.160342422755743,4.153721066259646,11.739845993391263,16.483340870591476,16.624720527285408,12.099972200412985,0.5469979126510927,5.515952980470971,7.920764377544911,5.56395292899881,16.897341205182265,14.963593117277636,10.060404282164379,15.350561689611538,6.978536322038611,14.582794849015084,18.39367886789798,9.614351975710385,3.1286132775172826,19.90324229747401,16.085518912171363,14.16817924357192,0.39631578898280395,4.859502436609882,13.61850994945267,10.948765881540856,10.607328007726395,3.9557314037521207,16.323436655347457,2.9085322230325916,12.864655995491589,9.240348943739157,8.573731100438092,13.622214048418932,13.769952956652514,19.62026128313621,17.158727233800914,10.850115727325345,13.179929688451391,0.010783666523428437,1.3589021553182468,3.6156696614622685,11.506718283711162,10.524417766409115,5.607622809300747,0.3542657858807319,3.848397614480552,7.059643246015117,17.21758658777994,1.3134486535701662,6.926902667508434,18.230451314554035,7.265780593540989,14.027088640200764,2.404947815963796,11.478120968178246,9.560200041775495,7.433453639393099,4.955423128887615,7.523499114515846,1.5627717434345323,5.162817485560565,13.847597990497356,0.6490629078905075,7.115003605908212,9.640327111549162,1.8069991962327148,15.574687080114158,12.458576789342777,18.86311041127058,13.803644998160994,11.32771811583613,13.701610699346709,13.719595617713281,14.537789737555054,8.593547052690438,6.159261274234313,6.60022871301623,17.232983088260095,1.7886374862857313,10.942066639293987,14.655941756705122,14.1258567589683,2.6805760286645874,3.3721208606981445,18.141616859509647,5.066342652079556,12.176568533913903,10.518612694364817,11.88793493090332,19.195211656321035,5.30234430996785,19.861435212727496,8.47109637041076,1.2519915878123866,17.137034558712912,3.5156860840041926,15.01362364242219,8.0973085259707,4.169738872090041,14.493442376789027,15.424467147493504,15.620946304459288,1.914433063141039,19.66701178823767,18.546023794181117,1.6571298789731337,9.96036540860982,7.478662689586377,13.247896097340476,5.457583417501479,10.064407312018059,19.272249060522768,19.186292463651302,15.598724929429002,16.072351106561907,11.36755268651935,12.593229702597117,2.814638212708278,4.468944066728406,5.750771755721122,4.632237373586783,17.722936127322725,15.278363463701186,4.559376009806249,1.7583556235014308,12.725090307630719,7.255296530516988,12.68853930362036,19.40722546233392,18.343682580354997,16.41478131678792,2.6392713722460437,6.779426222042821,0.5898345044587661,15.43015559137071,19.531940431623774,16.11232876708318,2.6773545606788662,12.56389147435983,12.73151389702023,10.380070708122098,6.551306020362464,2.8412360488613597,5.654883137427564,0.08952902574345778,14.07896468119839,19.450334149454353,11.179683501854672,2.3009592184458993,15.45067294304889,13.773336012142213,14.762339693232471,19.270482209108742,1.1953562014636576,9.947106570768218,7.144036624803216,6.381747406943061,9.853810030208887,13.636158909766397,1.3757259310812175,9.050170948936248,14.919813600053669,4.7278844229770955,11.3820095441516,17.643823524079775,11.60305817862087,14.12008632933793,9.887320848330162,1.0178404852169765,19.064028393592324,5.8998125912637045,3.4266267994197275,14.170804590803119,4.429332440066891,10.418447209796549,8.245064303260818,3.246532232627861,16.770074897752462,11.990184526180897,15.829024825553324,1.7166540859629098,7.393607182237534,12.4897290282316,14.141259978077706,2.303049344472994,9.459954307711582,12.524899990124357,4.675930660164136,9.257599601303482,7.514213474674096,3.27545600547261,6.094216700860509,0.41881460807049464,0.7899448032574519,0.05261809674528273,19.523304727354365,12.536747848330648,4.6998844703486675,1.0703046079601064,13.174383482648619,6.574772777849183,0.06602506908169659,18.583113418448555,12.906563343347202,15.089099899028602,5.245913204193862,17.882162713837747,16.055089549635454,6.077048441314554,18.307892156368677,19.671646090696214,4.050822003359298,1.640338905459413,15.380350689519236,11.03292579837531,13.455298469736071,16.286896533203404,11.416674663825095,7.394048800003543,14.840670455049327,8.386134086809447,9.9913653560648,12.269728306056527,7.497258246899161,16.31261101589817,10.102477242684365,6.921654180964558,19.83063799554474,10.121598967091936,7.028646359158732,5.5171224908737315,7.946922500419618,18.424289700844902,14.368276149736898,6.54505745550062,2.441169373900278,15.299632056725816,14.235197836712622,15.9588222379287,5.505626460310471,19.186756001449158,0.05053288663838362,11.148715693169834,18.574955168036723,19.55197496827424,6.605456482847574,6.090821841881358,8.15652064182617,9.491390640530334,18.304961199072793,11.96168487453615,12.495196351567795,11.206655560418355,17.571692536800473,7.363733946764706,10.381473542133604,12.353364968052762,4.805935164669162,9.059912199468222,4.29639752190651,6.721133723148074,5.050271815279652,18.002976476780006,3.8618466258080097,13.947764890017842,5.67315067786661,4.202940739790657,7.795783792396116,17.757159299007334,4.453670040525521,18.47133697622494,7.040396945518959,9.236515251928083,15.633884062765887,8.81488696009265,11.688819510996545,2.593914360409504,5.591270117219667,18.232961128817685,19.850962016769582,14.232309253819109,14.250366086969368,14.594836292947647,10.774672551549841,16.612990951240405,0.06552197145143435,13.728373861380781,6.396395762642428,9.133895736019898,3.5621414467208368,3.8761978780832385,14.080402923627165,3.961941696933211,4.1091561634875795,6.4788979956742,8.973139296777553,8.58192385864899,11.875972876162773,10.627427207718974,2.431107293892918,15.397294803516456,5.772423506775866,9.47627547833167,4.258127278190451,3.194262819043172,8.261044955869092,14.496653717768918,11.611551892354095,8.832971051878143,12.850429730998947,9.451373152515941,8.827990072063706,18.31058312547516,6.023019466793338,1.1141901850080105,0.4252682765937932,7.350125175037467,18.878196848439167,1.0864039550880644,7.4903077116960315,12.453285456469644,12.25363293160254,8.096098172135871,12.271158335681687,15.799829187565173,13.202008035034964,1.827915286673174,13.35176325619123,10.79844164039236,1.577686712925228,12.258303948622666,4.388839219082694,11.30036900771982,1.5149735735116332,4.029053383654211,16.211013313775737,13.082054051956389,7.539887265773864,9.516516541227379,1.3499403274183353,5.7323315879270575,11.162104384379926,8.200415320586272,12.325391715477426,14.994333612531241,19.187608416222375,1.330578238057365,4.989815172356358,15.49723158954376,1.198489382521668,13.11395771381454,17.224581048166637,18.805917498571194,14.20625104294528,5.731131628503094,16.066775476632134,1.4030495734145898,7.028641116945908,18.69449760898984,12.14880949931809,19.913981091495213,9.432832280219351,11.377608922100793,10.629019269695274,18.965083936898743,16.0655935414689,2.5067900584149205,16.711601319499817,16.191938037664997,4.395728947371351,12.114440312447176,15.301328958116525,13.804668035696865,2.1820049746626013,15.71437283434674,17.621509554535617,10.617846482197288,8.012540103294015,15.642554759498793,5.193569687834807,6.613324962315881,3.25078078598958,18.49728211488705,19.598881356404632,1.8943867366846812,14.743148586772431,14.731697674883616,19.11197156747534,17.103470224672428,9.33563152177037,13.728855097202949,6.799253620186563,10.34177039037445,11.310255642113912,15.60193138487341,13.10614238236286,16.311008881028094,6.088476524276416,10.786646695962677,11.483943720249803,12.404976105326874,7.765799690497088,4.3870485693092665,9.341232055154931,15.751958546332943,19.82655906082478,3.216062829801376,3.1570593930299617,8.611643206363585,17.145715302730128,14.375710276540307,16.8136843519813,17.237179600456333,18.58569122329555,15.528996236158065,18.382682678581382,4.565182037196238,0.05567754085202825,7.768324765402119,6.998659040098629,13.680406176129631,14.228329445805667,14.98532944114352,18.12044247076284,2.076668703057205,19.01220280152001,17.77031253360395,1.6797535462560953,17.180759075454283,10.818925108498485,3.3403761791947906,10.455860996842667,11.221969326942972,6.266760682427881,0.9426558314370936,2.0879265969357963,18.77340944806436,15.838806893362886,3.633580821614073,6.004431571866622,16.425592595088006,7.544069770094941,5.220441822010358,11.048567806551993,16.558769557448507,2.0080741482485465,1.3501595398920285,1.239884561150375,16.40890372847427,3.1662092289038135,10.648250425387968,18.965051376747795,1.8345598583524714,15.529657345624441,4.0339995609435775,18.323180356038264,7.3307911998670505,18.89175999843889,13.802092295294175,8.783281557657535,7.519345708631353,10.201714335603649,4.968357472645208,16.293604009812164,4.798760710138481,6.306900265947473,19.196877381663487,4.720641099262535,0.8269864959565698,16.663052206916795,1.4546855929254043,16.924143719303643,10.639368483798307,10.379161916049068,14.215055656646932,5.540692848549829,2.745106423637562,10.301927984221928,9.648551194828933,11.15059651851357,6.29577609187514,1.1232762516332118,10.484921343231846,16.498132763271826,10.84870630779947,3.4784974434154403,6.324801387302865,11.786204222494415,7.472944811016653,7.736058621607591,13.582971983728385,14.74281463177662,10.706553022432201,3.8062298004609607,3.0387867584697847,19.542674092129147,11.463814029915639,3.187962724150206,15.127774201521454,10.040349908024826,19.42539219379505,5.897280573838848,16.277202093827437,17.675408808341942,2.1051738911825746,4.568268187614533,14.158633332562424,1.8252526485354803,1.5087794461250192,3.08001700299275,5.609346706260103,14.881617738210426,7.804480274470329,15.615859996048478,18.45370510098107,9.629067646817067,17.191801532956852,9.213291153550571,11.642639380114366,16.16727227476618,1.107312366937201,14.475724193941,17.729009484694092,6.346469863084234,17.391080851593664,6.640467314115828,17.7743158191939,5.212272658567199,18.52453752418116,6.419452599342819,4.446108342635204,18.881639779574193,12.805455387926262]}
},{}],115:[function(require,module,exports){
module.exports={"expected":[0.19560378952949686,0.19560378952949697,0.19560378952949692,0.1956037895294844,0.1956037895294971,0.195603789529497,0.19560378952949684,0.195603789529497,0.19560378952949695,0.19560378952949706,0.19560378952949695,0.195603789529497,0.19560378952949703,0.19560378952949695,0.19560378952949692,0.19560378952949697,0.19560378952949678,0.19560378952949695,0.19560378952949697,0.19560378952949706,0.19560378952949695,0.19560378952949714,0.19560378952949664,0.19560378952949697,0.19560378952949697,0.19560378952949695,0.19560378952949675,0.19560378952949697,0.19560378952949697,0.1956037895294969,0.195603789529497,0.195603789529497,0.19560378952949695,0.19560378952949695,0.19560378952949664,0.19560378952949684,0.19560378952949697,0.1956037895294969,0.19560378952949695,0.1956037895294969,0.195603789529497,0.19560378952949692,0.19560378952949695,0.19560378952949653,0.195603789529497,0.195603789529497,0.19560378952949697,0.19560378952949692,0.19560378952949692,0.19560378952949695,0.19560378952949697,0.19560378952949695,0.19560378952949714,0.19560378952949733,0.19560378952949684,0.19560378952949692,0.19560378952949672,0.1956037895294969,0.1956037895294969,0.19560378952949653,0.1956037895294969,0.195603789529497,0.19560378952949684,0.195603789529497,0.19560378952949697,0.19560378952949686,0.19560378952949692,0.19560378952949695,0.19560378952949692,0.19560378952949714,0.19560378952949695,0.19560378952949697,0.19560378952949706,0.19560378952949692,0.19560378952949348,0.19560378952949675,0.19560378952949697,0.19560378952949686,0.19560378952949686,0.19560378952949706,0.19560378952949714,0.1956037895294971,0.19560378952949692,0.19560378952949678,0.195603789529497,0.19560378952949692,0.19560378952949672,0.19560378952949695,0.19560378952949686,0.19560378952949692,0.19560378952949706,0.19560378952949697,0.19560378952949692,0.19560378952949684,0.1956037895294972,0.19560378952949675,0.19560378952949706,0.195603789529497,0.19560378952949703,0.19560378952949695,0.19560378952949672,0.19560378952949695,0.19560378952949675,0.19560378952949714,0.1956037895294966,0.1956037895294968,0.19560378952949695,0.19560378952949695,0.19560378952949692,0.1956037895294968,0.19560378952949678,0.19560378952949684,0.19560378952949678,0.19560378952949697,0.195603789529497,0.1956037895294969,0.19560378952949703,0.1956037895294969,0.19560378952949706,0.19560378952949692,0.19560378952949692,0.19560378952949747,0.19560378952949706,0.19560378952949692,0.19560378952949706,0.19560378952949703,0.19560378952949714,0.195603789529497,0.19560378952949695,0.19560378952949703,0.19560378952949695,0.19560378952949706,0.195603789529497,0.19560378952949764,0.19560378952949695,0.19560378952949703,0.19560378952949703,0.19560378952949692,0.1956037895294968,0.19560378952949695,0.19560378952949709,0.19560378952949675,0.19560378952949692,0.195603789529497,0.19560378952949692,0.1956037895294969,0.19560378952949695,0.19560378952949678,0.19560378952949709,0.19560378952949695,0.19560378952949695,0.19560378952949703,0.1956037895294969,0.19560378952949678,0.19560378952949686,0.195603789529497,0.19560378952949686,0.19560378952949697,0.19560378952949703,0.19560378952949697,0.1956037895294971,0.19560378952949695,0.19560378952949675,0.19560378952949697,0.19560378952949697,0.19560378952949703,0.19560378952949709,0.19560378952949697,0.19560378952949636,0.19560378952949697,0.19560378952949692,0.195603789529497,0.19560378952949659,0.19560378952949703,0.19560378952949692,0.19560378952949686,0.19560378952949506,0.19560378952949706,0.19560378952949697,0.19560378952949695,0.1956037895294969,0.19560378952949706,0.19560378952949628,0.19560378952949653,0.19560378952949692,0.19560378952949695,0.195603789529497,0.19560378952949692,0.1956037895294971,0.19560378952949697,0.19560378952949717,0.1956037895293037,0.19560378952949695,0.19560378952949692,0.19560378952949695,0.19560378952949697,0.19560378952949697,0.1956037895294946,0.19560378952950763,0.19560378952949706,0.195603789529497,0.1956037895294969,0.19560378952949695,0.19560378952948584,0.19560378952949684,0.19560378952949692,0.19560378952949695,0.19560378952949692,0.19560378952949695,0.19560378952949717,0.19560378952949653,0.1956037895294969,0.1956037895294975,0.19560378952949534,0.19560378952949686,0.19560378952949697,0.19560378952949695,0.19560378952949695,0.19560378952949697,0.19560378952949692,0.195603789529497,0.19560378952949703,0.1956037895294969,0.19560378952949695,0.19560378952949686,0.19560378952949695,0.19560378952949659,0.19560378952949703,0.19560378952949695,0.19560378952949686,0.19560378952949703,0.19560378952949697,0.19560378952949692,0.19560378952949709,0.19560378952949717,0.1956037895294969,0.19560378952949709,0.1956037895294969,0.19560378952949695,0.195603789529497,0.19560378952949692,0.19560378952949697,0.19560378952949695,0.19560378952949742,0.1956037895294969,0.19560378952949706,0.19560378952949697,0.195603789529497,0.19560378952949664,0.19560378952949695,0.195603789529497,0.19560378952949695,0.19560378952949692,0.19560378952949659,0.19560378952949706,0.19560378952949695,0.19560378952949706,0.19560378952949695,0.19560378952949697,0.19560378952949697,0.1956037895294972,0.19560378952949686,0.19560378952949634,0.19560378952949692,0.1956037895294968,0.19560378952949703,0.195603789529497,0.1956037895294969,0.195603789529497,0.195603789529497,0.19560378952949647,0.19560378952949684,0.19560378952949703,0.195603789529497,0.19560378952949706,0.19560378952949703,0.19560378952949695,0.1956037895294969,0.19560378952949697,0.19560378952949697,0.19560378952949692,0.19560378952949684,0.19560378952949703,0.19560378952949706,0.1956037895294971,0.19560378952949703,0.19560378952949703,0.19560378952949692,0.19560378952949684,0.1956037895294965,0.1956037895294971,0.19560378952949695,0.19560378952949697,0.19560378952949695,0.19560378952949697,0.19560378952949686,0.1956037895294969,0.195603789529497,0.19560378952949706,0.19560378952949692,0.195603789529497,0.1956037895294969,0.19560378952949695,0.19560378952949686,0.1956037895294975,0.19560378952949703,0.19560378952949695,0.19560378952949692,0.195603789529497,0.19560378952949697,0.19560378952949697,0.19560378952949692,0.19560378952949692,0.1956037895294969,0.19560378952949692,0.19560378952949692,0.19560378952949722,0.195603789529497,0.19560378952949692,0.19560378952949709,0.19560378952949706,0.1956037895294972,0.19560378952949703,0.19560378952949695,0.19560378952949695,0.19560378952949684,0.19560378952949686,0.19560378952949686,0.19560378952949678,0.19560378952949692,0.19560378952949697,0.19560378952949684,0.195603789529497,0.19560378952949695,0.19560378952949706,0.19560378952949692,0.19560378952949686,0.19560378952949695,0.19560378952949706,0.19560378952949703,0.19560378952949703,0.1956037895294968,0.195603789529497,0.19560378952949697,0.19560378952949697,0.19560378952949695,0.1956037895294969,0.195603789529497,0.19560378952949703,0.19560378952949703,0.19560378952949692,0.19560378952949697,0.19560378952949628,0.1956037895294969,0.19560378952949703,0.19560378952949684,0.19560378952949706,0.19560378952949645,0.19560378952949684,0.19560378952949808,0.195603789529497,0.19560378952949733,0.19560378952949703,0.195603789529497,0.19560378952949686,0.19560378952949697,0.19560378952949714,0.19560378952949684,0.19560378952949717,0.19560378952949697,0.19560378952949684,0.195603789529497,0.19560378952949703,0.19560378952949697,0.1956037895294969,0.19560378952949706,0.19560378952949697,0.19560378952949697,0.1956037895294971,0.19560378952949695,0.1956037895294969,0.19560378952949697,0.19560378952949706,0.19560378952949697,0.1956037895294968,0.19560378952949645,0.19560378952949692,0.195603789529497,0.19560378952949692,0.19560378952949695,0.19560378952949695,0.19560378952949684,0.19560378952949697,0.19560378952949678,0.19560378952949706,0.19560378952949697,0.19560378952949692,0.1956037895294969,0.19560378952949697,0.195603789529497,0.19560378952949628,0.19560378952949686,0.19560378952949684,0.19560378952949709,0.19560378952949695,0.1956037895294969,0.19560378952949695,0.19560378952949695,0.19560378952949703,0.1956037895294969,0.19560378952949692,0.19560378952949697,0.19560378952949697,0.1956037895294971,0.19560378952949703,0.19560378952949703,0.19560378952949695,0.19560378952949706,0.19560378952949706,0.1956037895294971,0.19560378952949697,0.19560378952949695,0.1956037895294969,0.19560378952949697,0.19560378952949695,0.1956037895294969,0.195603789529497,0.19560378952949686,0.19560378952949706,0.19560378952949692,0.19560378952949695,0.1956037895294969,0.1956037895294969,0.19560378952949695,0.19560378952949697,0.1956037895294968,0.19560378952949706,0.19560378952949697,0.19560378952949697,0.19560378952949695,0.19560378952949697,0.19560378952949692,0.19560378952949706,0.1956037895294968,0.19560378952949695,0.1956037895294969,0.19560378952949717,0.19560378952949695,0.19560378952949695,0.19560378952949692,0.19560378952949692,0.1956037895294968,0.1956037895294969,0.19560378952949686,0.19560378952949692,0.195603789529497,0.195603789529497,0.19560378952949697,0.19560378952949706,0.19560378952949697,0.19560378952949684,0.19560378952949703,0.19560378952949695,0.19560378952949675,0.19560378952949692,0.19560378952949664,0.19560378952949706,0.19560378952949695,0.19560378952949695,0.19560378952949667,0.195603789529497,0.19560378952949695,0.19560378952949692,0.1956037895294972,0.19560378952949697,0.19560378952949722,0.19560378952949717,0.19560378952949645,0.19560378952949706,0.19560378952949695,0.19560378952949709,0.1956037895294969,0.19560378952949686,0.195603789529497,0.19560378952949695,0.19560378952949703,0.19560378952949697,0.19560378952949728,0.1956037895294968,0.19560378952949697,0.19560378952949709,0.195603789529497,0.19560378952949684,0.19560378952949717,0.19560378952949692,0.1956037895294969,0.19560378952949695,0.195603789529497,0.19560378952949692,0.1956037895294969,0.19560378952949709,0.19560378952949692,0.19560378952949686,0.19560378952949695,0.195603789529497,0.19560378952949997,0.1956037895294964,0.19560378952949692,0.19560378952949692,0.19560378952949722,0.19560378952949703,0.19560378952949703,0.19560378952949692,0.19560378952949692,0.19560378952949692,0.19560378952949695,0.19560378952949692,0.19560378952949684,0.19560378952949703,0.19560378952949692,0.19560378952949697,0.19560378952949695,0.1956037895294969,0.19560378952949697,0.19560378952949695,0.19560378952949686,0.19560378952949697,0.19560378952949695,0.19560378952949722,0.19560378952949692,0.19560378952949695,0.19560378952949706,0.1956037895294968,0.19560378952949697,0.19560378952949647,0.19560378952949678,0.19560378952949695,0.19560378952949692,0.19560378952949703,0.19560378952949706,0.19560378952949664,0.1956037895294968,0.19560378952949684,0.19560378952949695,0.19560378952949697,0.19560378952949697,0.19560378952949695,0.19560378952949703,0.19560378952949706,0.19560378952949703,0.195603789529497,0.19560378952949686,0.19560378952949692,0.19560378952949659,0.19560378952949722,0.195603789529497,0.19560378952949709,0.19560378952949703,0.19560378952949692,0.19560378952949686,0.19560378952949697,0.19560378952949695,0.19560378952949678,0.1956037895294969,0.19560378952949692,0.19560378952949706,0.19560378952949695,0.1956037895294968,0.19560378952949695,0.1956037895294969,0.1956037895294969,0.19560378952949686,0.1956037895294969,0.19560378952949692,0.1956037895294995,0.19560378952949686,0.19560378952949725,0.19560378952949709,0.19560378952949703,0.19560378952949686,0.1956037895294963,0.19560378952949692,0.19560378952949684,0.19560378952949697,0.19560378952949686,0.19560378952949686,0.19560378952949775,0.19560378952949684,0.19560378952949725,0.19560378952949697,0.1956037895294968,0.19560378952949695,0.19560378952949695,0.1956037895294967,0.19560378952949686,0.19560378952949692,0.19560378952949692,0.1956037895294969,0.19560378952949697,0.19560378952949697,0.19560378952949697,0.19560378952949709,0.19560378952949697,0.1956037895294971,0.195603789529497,0.19560378952949714,0.19560378952949684,0.19560378952949692,0.19560378952949697,0.19560378952949695,0.19560378952949692,0.19560378952949697,0.19560378952949678,0.19560378952949703,0.19560378952949706,0.1956037895294969,0.195603789529497,0.19560378952949706,0.19560378952949703,0.19560378952949697,0.1956037895294969,0.19560378952949697,0.195603789529497,0.19560378952949697,0.19560378952949692,0.19560378952949686,0.1956037895294969,0.19560378952949692,0.19560378952949695,0.19560378952949695,0.19560378952949684,0.19560378952949792,0.19560378952949692,0.19560378952949709,0.19560378952949692,0.1956037895294969,0.19560378952949703,0.19560378952949672,0.19560378952949692,0.1956037895294969,0.19560378952949678,0.19560378952949697,0.19560378952949653,0.19560378952949709,0.19560378952949697,0.19560378952949697,0.1956037895294968,0.195603789529497,0.19560378952949697,0.19560378952949684,0.195603789529497,0.19560378952949695,0.19560378952949695,0.19560378952949697,0.19560378952949706,0.19560378952949692,0.19560378952949695,0.19560378952949692,0.1956037895294971,0.19560378952949686,0.19560378952949697,0.19560378952949692,0.1956037895294968,0.195603789529497,0.1956037895294882,0.19560378952949703,0.19560378952949692,0.19560378952949697,0.19560378952949692,0.195603789529497,0.19560378952949706,0.1956037895294969,0.19560378952949695,0.19560378952949656,0.19560378952949695,0.19560378952949695,0.19560378952949692,0.19560378952949697,0.19560378952949667,0.19560378952949697,0.19560378952949697,0.19560378952949675,0.19560378952949695,0.19560378952949692,0.19560378952949686,0.1956037895294971,0.195603789529497,0.19560378952949709,0.1956037895294969,0.195603789529496,0.19560378952949714,0.19560378952949695,0.19560378952949695,0.19560378952949709,0.19560378952949686,0.195603789529497,0.19560378952949697,0.19560378952949709,0.19560378952949697,0.19560378952949695,0.19560378952949667,0.19560378952949695,0.19560378952949692,0.19560378952949717,0.19560378952949695,0.19560378952949692,0.19560378952949703,0.19560378952949706,0.19560378952949695,0.19560378952949717,0.19560378952949742,0.19560378952949692,0.19560378952949672,0.19560378952949695,0.1956037895294971,0.195603789529497,0.19560378952949709,0.19560378952949714,0.19560378952949672,0.19560378952949695,0.1956037895294972,0.195603789529497,0.1956037895294969,0.19560378952949675,0.195603789529497,0.19560378952949695,0.1956037895294969,0.19560378952949697,0.19560378952949695,0.19560378952949697,0.19560378952949697,0.19560378952949692,0.19560378952949697,0.1956037895294971,0.19560378952949697,0.19560378952949664,0.19560378952949697,0.195603789529497,0.19560378952949697,0.19560378952949695,0.19560378952948831,0.19560378952949725,0.19560378952949684,0.1956037895294969,0.19560378952949756,0.19560378952949697,0.19560378952949695,0.19560378952949695,0.195603789529497,0.19560378952949703,0.19560378952949697,0.19560378952949697,0.19560378952949684,0.19560378952949692,0.19560378952949703,0.19560378952949697,0.195603789529497,0.1956037895294968,0.1956037895294969,0.19560378952949703,0.19560378952949709,0.19560378952949703,0.19560378952949709,0.19560378952949692,0.19560378952949692,0.19560378952949703,0.195603789529497,0.19560378952949684,0.19560378952949695,0.19560378952949695,0.195603789529497,0.19560378952949692,0.19560378952949697,0.1956037895294972,0.19560378952949684,0.19560378952949706,0.19560378952949706,0.19560378952949584,0.1956037895294969,0.19560378952949717,0.19560378952949695,0.19560378952949697,0.19560378952949697,0.19560378952949692,0.19560378952949714,0.19560378952949697,0.19560378952949697,0.19560378952949564,0.19560378952949697,0.19560378952949695,0.19560378952949703,0.19560378952949686,0.19560378952949695,0.1956037895294972,0.19560378952949695,0.19560378952949695,0.19560378952949692,0.19560378952949853,0.19560378952949692,0.19560378952949697,0.19560378952949722,0.19560378952949692,0.195603789529497,0.19560378952949703,0.195603789529497,0.1956037895294969,0.195603789529497,0.19560378952949695,0.19560378952949697,0.19560378952949692,0.19560378952949686,0.19560378952949703,0.195603789529497,0.19560378952949692,0.1956037895294968,0.19560378952949675,0.19560378952949692,0.19560378952949706,0.19560378952949695,0.19560378952949675,0.19560378952949709,0.1956037895294965,0.19560378952949686,0.195603789529497,0.19560378952949692,0.19560378952949709,0.19560378952949695,0.195603789529497,0.19560378952949706,0.19560378952949675,0.1956037895294968,0.19560378952949686,0.19560378952949695,0.19560378952949703,0.1956037895294969,0.1956037895294963,0.19560378952949692,0.1956037895294976,0.19560378952949703,0.19560378952949692,0.19560378952949697,0.19560378952949692,0.19560378952949808,0.195603789529497,0.195603789529497,0.195603789529497,0.19560378952949692,0.19560378952949706,0.19560378952949736,0.19560378952949684,0.19560378952949736,0.1956037895294969,0.19560378952949678,0.19560378952949695,0.19560378952949667,0.19560378952949697,0.195603789529497,0.195603789529497,0.1956037895294969,0.19560378952949692,0.19560378952949686,0.19560378952949678,0.19560378952949686,0.19560378952949695,0.19560378952949703,0.1956037895294968,0.19560378952949703,0.19560378952949686,0.195603789529497,0.19560378952949709,0.19560378952949706,0.1956037895294969,0.1956037895294971,0.19560378952949722,0.195603789529497,0.19560378952949703,0.195603789529497,0.19560378952949684,0.1956037895294969,0.19560378952949692,0.19560378952949695,0.19560378952949678,0.19560378952949706,0.19560378952949686,0.19560378952949709,0.19560378952949695,0.19560378952949692,0.19560378952949686,0.19560378952949745,0.19560378952949684,0.1956037895294977,0.19560378952949695,0.19560378952949725,0.19560378952949675,0.19560378952949695,0.19560378952949706,0.19560378952949703,0.19560378952949703,0.195603789529497,0.1956037895294969,0.19560378952949703,0.19560378952949684,0.19560378952949695,0.19560378952949695,0.19560378952949684,0.195603789529497,0.19560378952949692,0.19560378952949703,0.19560378952949703,0.1956037895294969,0.19560378952949686,0.1956037895294971,0.195603789529497,0.19560378952949697,0.19560378952949695,0.19560378952949692,0.19560378952949697,0.19560378952949697,0.1956037895294969,0.19560378952949706,0.19560378952949697,0.19560378952949686,0.19560378952949695,0.19560378952949695,0.1956037895294969,0.19560378952949675,0.19560378952949692,0.19560378952949692,0.19560378952949697,0.1956037895294971,0.19560378952949695,0.19560378952949636,0.19560378952949706,0.19560378952949697,0.19560378952949692,0.19560378952949695,0.19560378952949678,0.19560378952949697,0.19560378952949703,0.195603789529497,0.1956037895294969,0.19560378952949706,0.19560378952949695,0.19560378952949692,0.1956037895294971,0.1956037895294972,0.19560378952949706,0.19560378952949692,0.1956037895294967,0.19560378952949695,0.19560378952949695,0.19560378952949684,0.19560378952949578,0.19560378952949706,0.19560378952949695,0.19560378952949675,0.195603789529497,0.19560378952949686,0.19560378952949695,0.1956037895294968,0.19560378952949709,0.1956037895294969,0.19560378952949675,0.19560378952949709,0.19560378952949678,0.19560378952949675,0.19560378952949706,0.19560378952949709,0.1956037895294967,0.19560378952949697,0.1956037895294969,0.1956037895294967,0.19560378952949675,0.19560378952949697,0.19560378952949659,0.19560378952949684,0.19560378952949695,0.1956037895294877,0.19560378952949695,0.19560378952949703,0.19560378952949667,0.19560378952949678,0.1956037895294969,0.1956037895294969,0.195603789529497,0.19560378952949714,0.19560378952949695,0.1956037895294971,0.19560378952949672,0.19560378952949645,0.19560378952949692,0.19560378952949706,0.19560378952949684,0.19560378952949695,0.19560378952949697,0.19560378952949692,0.19560378952949686,0.19560378952949703,0.19560378952949695,0.19560378952949697],"c":[21.89120427999784,24.022132481384258,18.40148964002336,13.747635127849225,16.51192877757572,16.675978089638015,16.033956697466785,12.05496792936517,23.834579248933718,17.47247509069781,26.823498973164753,7.753658080407271,8.072740101131064,9.013006269435209,18.78011100527149,3.6372747295876637,17.60609573259151,6.178506589555827,18.919051373648717,19.344765595162368,6.361115910921737,17.48617637766752,11.733445416528783,5.913736668135904,21.983698901798917,27.22213687479814,21.90803682978804,0.7487466651016403,11.22949314883592,17.508169180996525,12.456770764256866,12.107386039632004,4.564045337974252,12.46353416704276,2.476130340012677,4.092592505079182,3.941608981768856,10.017854615117187,17.69060908026118,1.3081023090362858,23.576447880134673,16.900756830555498,10.890071640554662,6.995628504305312,18.546098751540036,23.327166663210892,9.735900486178235,20.454030868289017,16.831067559165064,8.114695922100438,5.3174699863957695,20.493664634403494,23.559589003462428,16.09435994171605,19.31753251526615,3.209358902313535,14.304703479529039,8.556344278471594,26.88672904205651,8.865840311555681,9.439148437023752,11.458844424946841,16.27666696086641,7.143025355930859,18.287174155066523,19.818757763142408,7.015592328964015,20.354740993567965,16.791351798481323,17.857920538377527,6.877810457754846,7.945959385211868,19.918498052173558,4.342712709652861,5.285418471053494,17.57050039122222,8.304361535157309,7.043518413580353,6.126860234340835,11.560802715931818,8.11458188438746,5.567038304988532,1.968493947101279,10.5093040868054,4.621813079272335,5.3692488918409005,21.573997624606687,20.74400501078751,3.603652239246041,12.454740251147319,14.379905140951422,15.55886836148167,24.42367534152011,6.4274366819661015,23.15366423444282,10.931741438311402,5.168015336552572,20.536131969071675,9.902247630397575,6.443498417296938,12.184799925848768,16.49792342586014,9.48123564343257,21.04885994012224,15.296042815011349,10.295559471708554,3.386159349325186,14.231559688723959,20.162862905862905,16.282738854871788,21.12784443362412,11.577394494427082,17.553754599252684,6.510723503039733,10.507256971918322,21.922009024080797,19.85390575375807,6.797146839983102,9.666751320531494,2.322355002868813,12.807297028367898,18.449062005039217,11.889421415251137,17.08238293696536,14.946097248927993,15.151044740636005,12.826488740150717,10.199228299766922,14.359334827724382,19.264812272783796,12.487272863680172,20.78808435673591,13.014446654185985,13.386664718992755,8.364768246021097,4.7041303460092045,13.054322988621841,19.383564239645395,8.138359403334643,25.135135453718156,15.0361737074157,19.02190065458963,5.353480071487582,20.6238581984486,9.139019541416117,22.02590966781485,13.085569550462864,23.987305320241315,10.306894750341186,24.26505047208903,17.89153864542679,12.820552890639998,15.239776078953941,17.165547451567264,20.72974667257605,9.173727120753895,11.644354355244335,18.443158579161725,12.345462647963503,10.663183012599392,8.146058076111736,15.938465434200348,20.525491550753152,5.884784897881364,17.542513375390502,24.233985125931813,16.121057717893056,23.748153119220625,16.561905619843458,22.633429300472343,16.038733270386455,21.785827965231878,18.294882101639292,10.472759352813188,8.765208267329914,16.216292867761283,11.960667618179436,17.227045655828935,12.126236000746257,12.308469974218234,14.662624903547634,24.34888519132796,16.934927793586873,17.79862663192688,6.52099339576912,5.531575272423126,12.403499971066653,14.292645106237705,13.043134847914846,10.111201038278868,4.646259364972407,6.1927847412760535,14.396912462335674,15.122007200078901,13.067015766596883,17.760414628262083,18.813812345970035,16.177056354219985,17.040053400125867,6.058989449381388,2.7763109141867512,21.467206320770842,11.383403300438395,12.189907648800883,17.442750180491117,5.925388241904841,13.630837954026315,10.181752484475716,4.159520435625866,21.542328998808483,12.739906220539934,15.075479434929047,10.116068466300328,20.313492675955086,20.308279264398603,14.350498048508129,19.609043250421227,13.494706445365306,7.99655231521871,4.879393985861408,17.81934034694574,21.394624256121386,20.072095207923436,27.17095281756186,26.97554406218399,14.227908471082621,8.971580831737958,4.484945856139381,3.4151043350985284,4.457676778102613,20.488186489937362,2.680386339603629,13.249905782799356,19.9127431991785,19.387066110631384,15.43984076006154,23.677473241779513,11.899906757403219,11.361916502364728,10.653465627637447,26.05553431103393,12.443481724592766,10.34134311830325,19.129201474051026,8.612088216253282,11.149947935500224,6.464926565011251,8.027746238464271,19.06064374054839,2.9884703002700475,21.334164890874543,6.916250443000162,4.700892433151374,13.267576830084925,21.994648283960675,16.32690967926893,18.997377188874477,8.55560480252479,5.890077634917432,18.974089872943473,13.785289907904493,20.02423640482799,8.023899159073638,14.947263513834717,19.56926956510821,6.646857464354913,9.145573307704947,11.623486651052882,17.41319401663686,9.788067918956703,13.693999210591855,14.332814215485135,5.884782869941587,6.876964509310107,18.957371241237922,20.5785226740265,18.018373472263765,12.70553127307495,6.260969061934586,14.977464443453922,11.329563004816954,17.746203998172664,20.53409413076578,3.2684960581244646,15.984538142635298,25.798727714786303,12.019306988309618,23.180330277582517,23.564457533899702,16.719554914394767,21.67854668392481,23.241914179047853,7.856862034993809,25.39572777516721,21.971426816409316,6.280983709749256,6.904146134034367,21.29499399526871,24.05205592209675,17.359386940790195,17.60041372741284,11.773120951083884,7.454997361041916,6.317097866380308,12.498914441796739,12.749161618947632,21.59977763929311,14.002876598390792,18.37187897250827,22.891447390956408,16.05476972389747,7.967456181815317,15.019586528163687,15.192245147298289,14.568254313320116,6.097402320208632,20.525611430489707,10.065924656872957,13.249973304836061,21.976359251895104,7.675391933808088,22.703897606968646,7.428297205864229,9.0429924675372,9.83182316016657,9.716338215252652,20.83836437269006,11.437435977666217,25.64390717156534,12.271163088852141,20.44020408697968,16.47663921936168,12.957590986028855,7.4615679187169,6.859669559133216,10.763753811142891,19.364962363923254,7.343716240281618,13.326753994319716,14.432462922990629,5.108923771860306,10.227123096859357,22.640464940461598,14.410379548354651,2.524878176953155,10.809879941245995,22.67734115251966,8.467762935670205,9.140542687952845,20.50853965301344,10.71421718957556,12.06253301889497,16.718680458946025,7.552452241944833,25.971796809274622,20.91111397096426,12.818301736777073,14.814613308676423,20.25311230769008,18.94351997063324,7.733463983703914,18.161223745654755,21.465139541097116,6.883433627808654,4.988835442361092,8.241542172144175,14.6817000901246,20.542840639098948,6.544506405373494,11.635975848449537,15.285324696701895,19.67008824293332,26.81841062880684,15.3237763964995,19.35576965709192,25.832481475589063,5.841713353114898,14.503887515298935,13.438403332906217,9.810525553433372,22.915123288821015,3.781281430332108,19.38982799950976,23.650258138866956,5.125927413752931,20.873403024951422,1.2033873883711497,22.28825631608671,7.171793637792703,10.755757548447155,13.207637852024021,18.894208104576613,17.764710751714098,24.18781918118494,22.81534476139121,8.168553757621119,15.186078212332577,7.879053915505863,19.851167246121594,9.923998977816941,8.046669008256554,26.409592532314786,14.513455639269472,17.40302121899272,9.92087897692249,13.971360084460525,16.39230779796647,6.8301596267217475,7.898424492779543,21.628260461438963,17.80579521351869,14.004879168610476,5.854954007480524,19.970572307170585,16.9745903453164,19.079208540104084,7.8376413988416225,16.047178530392948,13.952975524420559,20.057748028220786,26.18706328321894,1.894281915805756,7.536805795379102,8.324441066983796,7.917460999416694,4.3613277268936255,4.264341466383815,8.560827084019735,17.528529061313954,6.877914824407077,16.609643872324543,12.596347148965188,22.911539544074635,22.94844540919865,11.577626234396988,12.21829087187081,17.30843739858187,13.916282068397713,6.3448387715657635,16.669851896522967,4.018266537348246,18.26438145383889,18.38371640101454,22.85449488018258,3.173630349367318,17.97771216636019,9.568090470076125,22.054939681419082,24.554859714911235,11.976949238057717,6.371171479136822,7.830582451451692,23.939365719606876,8.594766021886365,10.173909648100544,4.840862786740262,7.434020193589648,4.460481558481559,10.391078638276067,21.044123084140114,23.82274439570078,7.8668638862356675,5.314223786486452,21.147410041078906,16.764433239630872,17.39671138900058,6.051200729927491,5.414292860547423,17.764441253880904,2.6344782531728153,13.638132527919359,20.566995245159347,15.559643303049528,16.93752171174192,12.705023393769068,19.793665438595962,6.7584960317146425,5.249726714456067,15.19483488829255,12.408522477781844,20.10355065782847,8.265422484786477,19.376400795126116,10.609033802640498,14.331619177625516,23.7607159591295,5.504939284209906,4.044120753212573,22.65128264376416,11.910693703964926,22.316389051554996,9.204016942495464,5.274526885466986,16.594331671694228,3.630453232536147,9.456165708858482,5.082568896231526,22.659923632774706,18.61939017559994,6.760788018871396,18.760441661861933,4.089499383066311,15.65273370875964,12.582054503980121,6.320662990145062,16.836141156453994,19.672852984543088,13.879131532578754,21.663060032450268,11.66004584835938,21.002903947097437,18.972771215208997,17.546793979462258,10.835313664588288,11.259283457496437,6.586357330336536,13.101721096259565,22.248064608086462,14.53669317499649,24.146327307630166,9.552368349148338,12.170607173605653,12.413719299945893,6.3748621954525335,11.926248575562727,23.634832368785126,9.697214507876142,13.104152718736016,12.4549938645432,5.052431936938268,15.239644174401846,9.494083546570849,8.015533493489349,6.3571299080590125,9.80649002197672,21.886101757952524,21.761873449989274,25.87777427175019,24.391667256723764,6.12562229647926,6.717473526234954,23.001678024507108,14.248501573615693,12.258041203880978,13.806287729546199,15.89356313579239,5.129007425230066,21.502929529457976,19.396069872347972,13.06319375001343,12.687327417726483,12.260613718023897,17.390809120078064,16.733980668754477,19.1940780789997,13.247554428980283,23.547588376856663,5.731598999699996,8.255319803989867,24.886730101612514,22.907177292945573,18.402879805015274,20.662623839641945,9.9799115789124,6.921428290559647,12.736760355780067,2.922969057193209,17.31140750171767,7.080959615752709,15.556573457701933,9.882879467084177,21.12148229572204,16.62003002038246,6.27252016824795,19.68070599993876,6.07012934563768,20.16041755691059,21.88027915909499,17.930616887582055,22.64230589895286,18.90611370526519,12.371938683655804,23.238716257449056,18.610449881175384,5.875682588515506,17.333586509124736,2.9881723362862727,25.322327936665943,21.00673311129764,12.208308215876734,19.091466924291,24.457701128353193,10.974463927897029,16.472450036238968,5.347078451872099,14.180068282841027,9.464194656346908,1.6576274858587259,21.880700006419673,7.928195801329555,24.058316532123953,19.789732938761162,2.5221043198016937,8.524482606929466,12.352364742627461,19.08074217834162,20.363491374087655,18.10624837618085,17.58590376984603,10.650170458219817,6.4628976962444575,16.30947750341548,20.25721491096827,16.4735093774962,6.9613952537828645,7.68267810018617,19.702678526276525,15.764524674217864,16.902473745376955,12.157433179779408,15.130817194536164,14.773882351521175,26.88314919458851,6.353945078224729,12.233790473454043,9.937086118609233,3.0153228070976255,21.31217588940141,7.6621705702619805,14.639352340161668,10.474835505667409,9.77929394040972,7.8613054484627645,10.739568328145744,10.223890177880499,18.529571363255403,20.541776003315896,16.858157331661836,6.372029005681694,18.068929572438883,9.61173230702537,23.780985007482307,20.652399245236726,14.316946208890144,7.173237390773802,23.245771284732513,20.700677552278275,20.495698276797437,11.298506373833309,8.254751736938502,15.959810187774806,2.3805765113200446,22.000627455525255,17.042913723058792,18.99897718724121,14.64421451908039,9.009667106418847,3.45440184999985,10.915071047726364,21.539769800865816,11.805359392225846,11.002314970461182,14.506547897789432,11.197819146511897,11.633067522388568,7.0566763843056375,14.690074853288294,24.75921153339434,13.12716694077076,4.569466858201336,10.950170947868385,19.775064382671015,6.935918674544967,17.62027237958816,9.042722718033582,9.065064513698783,24.699084537003387,18.577927787857078,6.650241184162018,26.74501610276354,25.51169661415667,13.22614503747295,18.453385643423665,6.76079931963909,17.901842875280394,17.902494644837514,11.12806237684078,6.2287863785567925,19.808438202648265,19.657019824561964,14.921823103326853,10.052935746576289,6.215361971677225,11.736589122274006,8.96537266359321,25.825036633944876,21.44342843413777,22.175393582983663,22.57272161533978,2.25468152763026,17.080252275867867,4.872982539354205,10.589556036924487,17.31830245963215,2.7875287278722434,3.5182310737319513,25.060939671143124,8.12065235425177,19.872598065108235,17.63876778051788,19.481270161404908,9.674268637564154,5.056015025379465,2.703197436870845,18.925233727697137,24.792545199521612,4.4729094377800065,23.21728649048743,8.678356531046768,12.217952073508117,18.725028522133655,16.355878831837487,21.63179613270374,18.08942832081879,14.427199981729816,11.953082125399622,8.249728939370709,13.449480123595457,18.20220564546441,24.641601325563954,19.143933669695116,7.033334355102614,11.3622899794788,6.188987146278577,7.097028366101838,13.143980115044222,10.949927273420233,12.84995305072873,24.710036343116478,15.56620262224684,11.25996007852724,12.23487913197066,21.887236711206892,10.86305456243218,18.76914979929054,12.072050009505094,15.10894730333626,9.217476596712942,14.748167731417853,10.384310571216364,11.40371408318715,13.381816913195884,23.910192205223446,20.00664446205377,3.9729498570889894,6.3334348393921625,17.84318747450731,17.03198804601279,19.172051571680214,18.62912623998472,19.542103091539705,15.594034195082076,20.286720483220545,20.054184417577538,11.161525724606605,10.671452794235861,10.31901300092461,23.96438187111306,4.821452018829388,8.555736171803163,22.209788089122238,21.171112189262768,3.265180955423398,23.659004687740634,19.935949015365647,15.878452069904935,11.223228681757343,16.17411453541057,12.086167763241253,18.261381772370232,13.784569993127821,6.425005350980068,18.339733096843432,18.861714039576945,19.58314438819657,7.3312661782401385,20.8135649618722,14.086954258785795,22.987336092609848,7.8506785955095735,13.679928639863139,6.232894255368642,5.519639840678572,19.73951023115192,7.116705143291454,9.40277482429753,11.668428906057848,15.006170838262207,4.945324629531362,23.652171106172197,12.413635182214962,22.703618173123044,16.98917160311595,9.349605100750274,7.749179403663662,2.5194191381290545,15.686646546988516,10.20472766264482,14.407824918509556,15.076383455967234,10.098562240591253,22.258119384537803,15.702487951224997,4.9575259877942495,21.781624131498553,21.966529227047477,24.57324851265481,18.833420347081336,9.30855311293468,21.337960646058516,10.209141369509053,19.073152584672364,9.418829480184328,13.658647019453312,22.904114242083157,16.677607190401268,18.945259470811596,16.364446708409563,22.185634566092517,9.933314357170273,3.6180514950102607,16.997340686443756,21.194352373018976,17.89966207158499,11.714475138687408,14.303884510314983,20.640184417878036,9.70716353213621,9.375711294964452,7.474658172416083,7.930967460582968,20.755840254315558,1.8393588074748821,2.928533132619905,9.238286282936768,9.853832727235615,8.482966110774433,18.384442891992066,20.174770492528225,9.991640470147399,17.063949868692664,19.25002176869315,22.24676547412659,2.0489349402122596,17.921983535885197,18.36891855345864,18.02512305373139,23.868566399404703,12.226055122085793,5.762633294341844,8.16745141604213,17.962610099235544,21.457252159409695,6.196354449554568,24.382011464197245,14.335178926780467,8.511686916745916,23.250430597692283,18.56310703468074,19.225715873843797,19.687909277910478,12.323032798900616,16.32744971392781,20.323868309546548,10.221906374072528,23.77482204592041,17.392049120941344,2.9722692118084417,9.627537083641485,8.049177240602049,13.050263025244275,2.9806239107521737,15.057567080233547,9.447209422588916,21.010287160139292,1.0663398160782664,19.960489802592345,10.624100157173654,10.88459145820523,13.553344748887698,17.669313761756595,8.649752738705946,21.205701882014786,20.906530365668992,24.06644390700616,6.425474199088903,24.803684311316005,23.733901443613846,9.272087844971677,23.64521015276626,6.782324167615507,14.524750237068957,7.067964947741098,4.222473995852983,13.388734170788467,24.194792605181316,18.272776138350885,4.09807096559817,22.027189547248856,7.82997969385317,21.34564453533273,18.588950338960615,8.320324463464821,26.938859995972827,11.906893614345915,19.769404259093875,5.308046507603898,17.621421293390235,11.820013999430483,23.150052510043317,13.352154819314668,18.0313463304587,21.062865597362492,12.07758392091569,8.793883057241114,23.572878977066324,10.816252818128325,9.322061255491153,3.2689157645164904,19.359814682024457,15.374433141093414,16.902286086242203,9.221237168673404,19.876808131975856,3.0281544494634476,14.552857105178665,19.80634553408499,18.04395336142543,22.311939039078446,7.00615544815217,14.905112730219411,13.12606930920164,9.35615555868348,17.351496731630263,18.163429139471425,21.372396041194936,22.444620681181036,8.221130972581712,18.85187994919941,19.281479918103525,5.683254992605426,18.282196216225778,13.835473759982643,20.910165062965504,11.336350451603483,6.0608919179059715,15.34163334711737,12.988011427868729,10.786703867677051,10.556767611953678,12.810860193002867,21.545861973594512,5.3560301643313615,21.899056620368714,19.683538193969483,7.1852615176189065,22.179516629242183,22.78104042115057,16.39943807898117,12.397577641469356,20.544736724400245,18.54159304926146,15.619270541515291,16.116654595071164,18.532749735947455,17.924475980110955,4.127675142518022,8.46175870355811,23.35660190933637,20.535749182668514,19.990788634918047,3.0613080157127626,8.206388657495852,11.351144030310625,25.34504131971014,7.978776175878004,1.0185704409396887,11.006605268549045,7.441208851913426,19.707083463928903,22.879365961001426,20.59029924450865,20.15421150531317,13.300031022040912,19.443587190160688,9.022763104768696,9.698032511327014,9.357737940383874,21.923426400850367,21.61312564020188],"x":[21.83685943967086,23.977473183217608,18.344351214079655,13.747326828206903,16.474431127734277,16.61769117055396,16.012906626054253,11.995853118499156,23.764103087533286,17.41979580801309,26.75295553255904,7.7033719623680135,8.003403382469084,8.988194702332095,18.70644782291845,3.604622060863801,17.568062404421134,6.124427930266289,18.85908695152123,19.286917108135782,6.31739496207651,17.426261087332435,11.717777005851964,5.869978174095896,21.95076408292629,27.150121964187736,21.885961849971032,0.7443627600667785,11.179521325586519,17.45045051339452,12.399515329140876,12.043623457505785,4.521525797960719,12.40495787354874,2.474092439843096,4.080247740112816,3.9382319874426863,10.002402858695044,17.623124070405012,1.298639538967341,23.512197821187776,16.863741781466285,10.822850594661457,6.994058469096905,18.493650514876332,23.277848048420406,9.693752144641518,20.408793135421675,16.768660978246185,8.045329919966582,5.269677182792495,20.416355012846953,23.50920125141475,16.06654148355654,19.254127057964624,3.1876807628696127,14.293552025433522,8.509584878877313,26.81717099904079,8.85911071824281,9.417743544340533,11.417101387879423,16.2313013178086,7.100199296570321,18.22243192512895,19.7504634903498,6.964230250815594,20.31491837344189,16.73945727874862,17.829152761397324,6.847661397241124,7.891228133837191,19.892754819117904,4.312750120174437,5.284848183006114,17.544075423813087,8.230634409008339,7.03518145983638,6.109901834254414,11.530488571841211,8.10924076084571,5.554699621591498,1.9572108463321298,10.499926299059378,4.578932874703278,5.317208607103252,21.546819635804226,20.69361281778184,3.585173399235501,12.417754934747617,14.347993388588618,15.528903761957737,24.372921722366222,6.406660852648656,23.109468520847813,10.91958868855985,5.153993770047128,20.463186531939538,9.847161605678018,6.402884145610712,12.159619110303865,16.440956577995145,9.454729935242291,21.014589584096772,15.284635845367564,10.278254810712088,3.3571576379793946,14.17246590380159,20.14544101219498,16.246355170695164,21.09410324879753,11.530860753559349,17.52579343463228,6.449656665639409,10.44321883969235,21.893225129775352,19.820394859624674,6.76124058645194,9.633566880626066,2.302822597206843,12.795434885792796,18.436286034260117,11.857658269593443,17.02873068884112,14.930996115265785,15.111745961465175,12.821914677962011,10.162443431943586,14.306594646377732,19.2149213104065,12.414893284321856,20.746082622154994,12.93779725594663,13.383291669499842,8.345430280167111,4.666264172699249,13.035792888958836,19.349780579981058,8.123613417223885,25.063524138572387,15.007932322650333,18.9795152597451,5.312010153136581,20.56095039112073,9.06153417975765,21.989206861096516,13.024367132616685,23.947797059744786,10.26438340795153,24.191945108024715,17.843396315881424,12.770978296923229,15.207378569060104,17.144133559192213,20.68802419750409,9.12189254371948,11.605318686475476,18.432852014431642,12.28850141984434,10.627082644207027,8.13279706685176,15.902175754792381,20.469633486944396,5.845700248056824,17.524755553067596,24.186585418089106,16.104816504459272,23.696893341899273,16.555268256115788,22.59651750567684,15.975003095467384,21.736603854673692,18.288509398018444,10.431378965027882,8.745982461434494,16.19832921122057,11.958439437987375,17.17555991965299,12.067889970581895,12.291192210315685,14.632840733169196,24.275132574524235,16.924815806347787,17.777379080074354,6.496871059776355,5.513266762555061,12.341989463065165,14.230338614060894,12.995509903640436,10.072733421799098,4.639343955848475,6.192780595367449,14.334430351298128,15.064702677545682,13.037280126704502,17.699178862036145,18.743737150092013,16.17573926271106,17.039402923443216,6.038488255821667,2.7573243554572935,21.400084226064028,11.31522059402808,12.189726027225099,17.39359734381579,5.874989733351146,13.59872273781903,10.129302611265539,4.131551754758266,21.524782242607937,12.733403514166612,15.023306443950109,10.113202360878368,20.308228613357226,20.28347254321257,14.290774424478778,19.562102294710634,13.460013838741732,7.920037804463191,4.855613943842702,17.757598134100927,21.336547329951877,20.025473971751744,27.095183407752707,26.90777226740632,14.1535759112307,8.96359913167107,4.4740996783558415,3.4056504942851356,4.452829497260422,20.45520236535355,2.665494193746568,13.17539320448136,19.86809524267505,19.3590069701217,15.415149669051363,23.63875160260694,11.842736327442136,11.331566286996361,10.647409702731528,25.98157930354415,12.4396129445563,10.272660128364889,19.12341233106605,8.575100806151692,11.122787402509111,6.448076371550623,7.980381478864656,19.037940178372107,2.9674725715035857,21.304396596792234,6.865929561718199,4.669000159219955,13.261745833599479,21.954764216082502,16.275820288880958,18.935677990649495,8.504940842870127,5.838813117912935,18.926420372090686,13.775932271766456,19.95849329185643,8.021441438263151,14.912919583711666,19.542075641346063,6.619816663446915,9.077504975561485,11.552587244681785,17.378837644900393,9.766818816563465,13.685964570222843,14.314753186444786,5.855634423233006,6.820753814356993,18.911443309055,20.528346238882126,17.975698311312915,12.679946191971153,6.211322445117091,14.954672792881551,11.295185595897093,17.679937323704266,20.502742809901857,3.2601037559865897,15.964132189625143,25.722524754474218,11.983085343777109,23.12384740186628,23.50834378188422,16.70130428208227,21.638244219966523,23.210293978418875,7.790987532866095,25.324809924872746,21.906107451218215,6.253046158047059,6.865450150718798,21.241292797486405,24.00850776806253,17.29436571070098,17.550476480776087,11.707365525954781,7.408724327556247,6.296834705822659,12.496193240010424,12.68587146152613,21.54043260358852,13.931933994182714,18.296551576407175,22.84363580692569,15.986126479248105,7.936124780938441,14.97677243767242,15.16265632438914,14.497200849360265,6.044595382291463,20.491437344729484,10.045063018383768,13.235565142294663,21.929267295158287,7.667914962044826,22.65304243714767,7.41421461688988,9.01777897024889,9.757636169554988,9.659395206491496,20.773894527879524,11.424789817946445,25.58530034695208,12.214920471543206,20.37528803144244,16.40175303493643,12.890151314188532,7.417696205763086,6.85018751830016,10.688073431133581,19.317554507960658,7.277660429092914,13.2956279961079,14.412579685670002,5.086012556937289,10.202714564713592,22.57781962252457,14.349734932956231,2.502848911361096,10.766307462965539,22.610920652026646,8.392285141750417,9.128735070357891,20.490414896564655,10.650655409635888,11.997521980579071,16.712407966733046,7.529036452853695,25.909222641805783,20.845733990677488,12.78972311128952,14.808873682258053,20.207564328154117,18.940786797374106,7.730118335301622,18.155841252868427,21.409660479564486,6.867124271536096,4.980135435534976,8.209661487169193,14.664033617035372,20.490965886136,6.543307659602905,11.560573719343008,15.262348768659907,19.611072622518847,26.751455070490334,15.277527319809062,19.315850715011848,25.759420257649545,5.804880282986284,14.48209113447014,13.415321202988178,9.75192831657754,22.877499988378762,3.7486630032454302,19.339416930393714,23.595571724065262,5.110688655092661,20.851924003950522,1.196548384075811,22.234294290719873,7.145721472792497,10.71994296114789,13.143960481726568,18.862386473435304,17.755142325734674,24.133805273188322,22.761093874477474,8.147936169147732,15.135070751074087,7.8350674156818885,19.789805597944063,9.906819888119493,8.045129946159376,26.34432141784744,14.480247540890645,17.353224277078176,9.847325447411391,13.938246117891312,16.351880045721046,6.7903491282342285,7.881198173095636,21.569305897171624,17.737695230448523,13.946242976359873,5.8516220570340876,19.933704829094893,16.924446926226352,19.041445507745866,7.794631008767707,16.012709630227956,13.898026237046562,20.019003351844255,26.113932970328605,1.8777053787124685,7.494292563492401,8.284273654182549,7.881465250493367,4.332550672537263,4.229456678118106,8.518398093810347,17.492936862312355,6.842895955554041,16.53630713494782,12.538664295542787,22.838202306570157,22.873919718135955,11.532850447413487,12.209023636982403,17.275364138599212,13.868139018483356,6.306490549719501,16.667050518970427,4.005857111528593,18.205639411299643,18.372580332889118,22.79710693830104,3.1443747195047713,17.936742184662187,9.553481211249796,22.017863898273863,24.48573205689054,11.900294695580454,6.32446028637262,7.8186241198378745,23.876885373218556,8.537609774206278,10.129916982554489,4.81063319159563,7.365710242828543,4.421784487501398,10.322968866157208,20.971484479623552,23.768832006303814,7.86654187029714,5.28954811566479,21.131102525351228,16.694689237460427,17.36251239298275,6.024888259633014,5.392536272544016,17.741394173120206,2.632172894078462,13.612819700286595,20.51635933178161,15.512481978852833,16.924789183389873,12.629804657754061,19.768663425776147,6.749736548977763,5.246938849635911,15.172170938551341,12.335086972818281,20.083864858070964,8.198316924109449,19.333753821796954,10.583458545418079,14.26949856797084,23.703881825818527,5.451734012866646,4.038374975377998,22.608140197347957,11.843954963303666,22.24486300530534,9.14314120685355,5.272605494264182,16.54470365201434,3.6155187594647895,9.408677688569373,5.053742614874237,22.600190684245824,18.576942133637644,6.74616413411794,18.70225288936684,4.075050590828973,15.610118524651998,12.568079718701338,6.310709904103575,16.83443667425937,19.666197647671442,13.847142093602812,21.605721102675908,11.656681187556451,20.96639959504759,18.93057646621019,17.499495055940272,10.785804535323326,11.189552629479746,6.563708059837722,13.056627521464845,22.188345703231803,14.497519121798481,24.078206809563095,9.496061254086472,12.143206559999062,12.344593686576482,6.329475051114137,11.867682913930105,23.590340882858285,9.675557529194478,13.075465515440602,12.452868893193976,5.0273766205241,15.165832166329123,9.428353896399269,8.00027110570237,6.326545236217744,9.799942239235918,21.833361103048233,21.69559004371252,25.802838648814046,24.34362549332323,6.120624229583636,6.71308253761108,22.959938508758448,14.232662920295873,12.187055699867917,13.752959728616128,15.828983671111953,5.105779487483119,21.47253324853968,19.32817507293764,13.00644498278708,12.64816984012432,12.214963189601232,17.36281818101154,16.721161189688214,19.17435356715704,13.217632214400155,23.477207531114146,5.695523785021308,8.189349608537,24.812324219718136,22.877595142045,18.347785863679245,20.623205345156606,9.920565713479323,6.892128991145613,12.682775068946523,2.8952526919794184,17.280061752052042,7.0353379717400095,15.494224123695329,9.82278831845953,21.04770584072292,16.567899961651097,6.218436770305513,19.67819084300402,6.0428111825373385,20.151955637269026,21.823640618600344,17.87606791629926,22.612623949846476,18.901787463413086,12.347933597119813,23.18418072053558,18.57322602479122,5.862248423733833,17.267833017759713,2.9876645558387422,25.265308362303138,20.986434416958662,12.164411577577486,19.041901076217307,24.403959384148944,10.900889424223006,16.43839100690777,5.309500829176493,14.104059467056576,9.40874823077965,1.6435574455734259,21.804462855059427,7.862098053259361,23.98435406338347,19.778500207819693,2.5141445130622184,8.506552112740545,12.275218999906691,19.045693707185137,20.315059923103263,18.065154829772936,17.562405101901984,10.580955943584152,6.406940661599525,16.29541799835573,20.228527610785797,16.399572752167785,6.95682570060074,7.661212050361332,19.661415987345002,15.725789805159476,16.828002355225145,12.124194492737486,15.061588660038364,14.758151523566886,26.805863150428095,6.299387996449291,12.182259989538334,9.866113536338592,3.013751246478546,21.235920267961916,7.59370261075182,14.58846123144821,10.455420893635843,9.775689342406384,7.803943322804143,10.717367611236153,10.188565139728807,18.48776564649523,20.466665858787145,16.83728899574897,6.351295304061871,18.02642392477297,9.594925743488414,23.73647149298695,20.63542871348077,14.27659215683494,7.146264729078119,23.1879626709131,20.665089251470434,20.47037263343142,11.26965013451386,8.210803519925065,15.896145495103656,2.360473161583787,21.950041470488884,16.970062285135363,18.925560894168054,14.636234831883398,8.993988983486734,3.426640053783911,10.893767602659391,21.51703965254926,11.734063966001198,10.931196804651126,14.50191557166312,11.13990159571599,11.632877115393049,7.0209431224689745,14.62573982972157,24.706348713067,13.105167529731624,4.550136183297468,10.931086645272012,19.743169453224677,6.928350978441693,17.603800735069168,9.024696586819307,9.056494592136588,24.647488622777797,18.55635536133935,6.641917184491437,26.674787115111066,25.443068781749393,13.212529595651546,18.416943315833645,6.7184626945372905,17.838010906173523,17.87632916163214,11.06687840135572,6.21542108380452,19.74792048593639,19.652802269304058,14.906906663668689,10.036575193972109,6.159566879909472,11.712046510111394,8.957983707741748,25.764098559447767,21.397232268441144,22.145870378952424,22.50838455878136,2.233975155948362,17.046231230050182,4.869909523877255,10.541122202482935,17.31434761378931,2.7694579701277497,3.5049904744423324,24.99406313480455,8.048335414180144,19.819067838651367,17.61348310262497,19.46913585847782,9.615586950075123,5.053616985427462,2.690840214985226,18.891995035706973,24.73699200794497,4.462424089461345,23.15181871370269,8.659628268647307,12.190376584440125,18.706433258566783,16.28623488834473,21.57726786202778,18.055967663156245,14.356813186646903,11.894910560487286,8.202723806885476,13.394145871140928,18.138815560579225,24.593809742251572,19.068134700291555,7.006025234649805,11.285584576009889,6.184366791001467,7.0283506588393845,13.138017035333698,10.874034706302373,12.811084859542634,24.635981330792557,15.495583697647849,11.25942812691541,12.228991092774681,21.867380459386624,10.835334267610802,18.760446272605016,12.006018359488046,15.040766325138232,9.211491665765237,14.672499724211082,10.312743626923801,11.353685011144883,13.31765310842086,23.852548133483996,19.98017892125033,3.9720778844061138,6.276526196912764,17.775215296009307,16.974086085417923,19.136745627758614,18.607321713168442,19.483769938659186,15.575511467605313,20.25862291679693,19.98287655287272,11.092060687014417,10.62182095145055,10.253307454322652,23.912778758612973,4.779173767508263,8.486122363117177,22.14111436007007,21.111499365203816,3.2359182252797063,23.619532851463866,19.89538522387799,15.854607268478734,11.221056232926687,16.168061732235238,12.0669594092196,18.24088200274851,13.71590336125411,6.378316629496916,18.283646542335777,18.81789681171664,19.555365616990116,7.303409249658711,20.77819987655373,14.084154894733516,22.93064156820634,7.788004435870528,13.603407946888662,6.2144611896978645,5.483530307781431,19.733597747999983,7.0578626928488735,9.340082641662331,11.611983448995508,15.004310023550289,4.9226121606846664,23.590859222714087,12.410126957178733,22.667336135435956,16.931145408776885,9.322792244045008,7.735021407775201,2.510088605397386,15.614782533315907,10.149349060627353,14.350586075821917,15.023163989597329,10.07804089468654,22.187900235937434,15.65042325593836,4.918025426902985,21.727824984754214,21.92891720294967,24.524832751788423,18.784035622491462,9.2698689816577,21.30765568271057,10.196863372876573,19.063958261131496,9.368894394589173,13.583248983667506,22.838826753057763,16.65808549993783,18.881364796967294,16.33031404902537,22.123082089180652,9.928231957656777,3.6136274715094174,16.93778823377138,21.12873822310636,17.843527690275632,11.680923699268865,14.29755069806161,20.577034492337653,9.706183280010503,9.34241780367476,7.4051476745329,7.871859294842838,20.679955462061894,1.8390884909404936,2.9133141301209178,9.216258704183263,9.81780809434069,8.449850275899921,18.36677820618486,20.162790307449317,9.976898322748319,17.050510215153185,19.17762866542681,22.22185293479027,2.045423247458848,17.89527447663999,18.30794877991001,17.96675895556371,23.82524137797586,12.176638008298358,5.74760925828133,8.11956302416043,17.931460329470887,21.419064355886885,6.140184983892805,24.31200562079495,14.302942066114383,8.455034245457579,23.216317634041026,18.48875892865402,19.16920952917647,19.65318109939671,12.262932043635992,16.31307419132845,20.303400823328605,10.16009340088338,23.727655765900224,17.367133260949444,2.9710581766688255,9.55802310719394,8.004818982701138,13.00657390137378,2.976945294364042,15.022987950509775,9.409237004693525,20.97379056196141,1.056327644892581,19.909576818693086,10.604387816649847,10.875902460557374,13.527827619831749,17.66081179176065,8.633139771685078,21.17985431948899,20.86604259484899,24.004557672071922,6.420389793110651,24.755514251813835,23.68521665533338,9.254378157669647,23.582175642392293,6.762729864900749,14.47767561982332,7.027570710830324,4.205202094903724,13.35617724919695,24.138599964593457,18.235278866851996,4.076092427976718,21.986144788487763,7.770597471906196,21.286255730277183,18.542453714169394,8.258225653200117,26.86817215238211,11.863466107977153,19.700288962419428,5.267311232997139,17.611514005247095,11.75568287253532,23.077195492718232,13.284528313711256,17.955344271277422,20.99229417666687,12.035732823899219,8.746771639382622,23.532325161011375,10.74862832406785,9.278355750886965,3.243224742928154,19.294075525650733,15.314767963236969,16.88956820484313,9.194449957407532,19.8020042069242,3.0001455281439546,14.514750226676345,19.783081187558096,18.009506969041897,22.281773328786326,7.000289772006687,14.835053017615696,13.068066717290701,9.3233970045451,17.295019954524253,18.149087648917135,21.345464395674455,22.417128638137733,8.15465319593636,18.820657160121698,19.221948488137432,5.634047348446985,18.21328388966273,13.833466999465768,20.870680095730027,11.289519724172239,6.052005503387513,15.303005264657385,12.950928682801479,10.733947521244858,10.526061685197366,12.778344941586301,21.482769545412573,5.349968968180704,21.85176277618151,19.6627811338343,7.172013895940172,22.118047378087553,22.750604955891113,16.396200777353716,12.342140818194832,20.494907920258306,18.519460186361037,15.6053961443707,16.04820630906338,18.509188602087768,17.872526658973726,4.089195879155332,8.461443361471094,23.29860244882234,20.474544226534192,19.979008228333484,3.0561073171141935,8.173467561928224,11.318165834555149,25.287473569949892,7.975955006897838,1.0110797232738704,10.96345167775777,7.437181226570343,19.697670919636288,22.810436102728495,20.567972259589872,20.134136576747355,13.255905900691307,19.408277364334662,8.953239360294623,9.665480385572891,9.290230128551173,21.87974247658242,21.551251527123235],"b":[44.34841543317335,42.47693486642693,42.01310922814554,13.875035450021302,32.00728464154474,40.76219568569671,24.732591115313106,36.483299706780926,52.95782311738697,39.24141888610866,55.97454499008677,28.533661556109944,36.72512590798421,19.266023816700205,49.220344712165904,17.130512943822502,33.32281283841169,28.525722318569148,43.69847258995503,43.249807550044615,24.428159150480454,42.24529459870114,18.20818717465788,23.99629491081067,35.59353154210133,56.98124636935657,31.030199669347247,2.560331361109811,31.879618895250893,41.359565155650614,36.11674268303407,38.45634137494376,22.134623933377117,36.66933150954616,3.3182628063519592,9.193886240012713,5.337102540855039,16.403067168354667,45.57780328113749,5.2184537656535745,50.12684588835478,32.19668498565114,38.66818659090044,7.6444226120986025,40.219566154917615,43.707363558963785,27.153086735160933,39.147862941037076,42.61967521005985,36.779182695802135,25.067147704892683,52.44073605868791,44.38159124802174,27.589931279954044,45.51891123524638,12.16753325651176,18.912878934294845,27.878982890828755,55.630573903996876,11.646746412168483,18.284407560169086,28.708544524488197,35.023356050741896,24.84026859248114,45.040954633352456,48.0403680471771,28.240220597351232,36.810856854119436,38.23600377129003,29.74578400738098,19.33646916303012,30.562849257431854,30.556512940391357,16.724314984392294,5.521081673320358,28.490232039197664,38.77101908134333,10.48864272485201,13.134671266066707,24.087679797077776,10.321723141047968,10.665818920263277,6.631070466063758,14.384537840275744,22.341431032048582,26.87413612295774,32.80490435987688,41.56784241634382,11.23976285224245,27.738381806770413,27.566970495591807,27.941301258155992,45.39686682150091,15.01274456137045,41.41689706936867,15.953687691538182,10.962222805310834,50.67976795145344,32.665742403277356,23.226752717102407,22.59040399605314,40.038640880133904,20.43433223939383,35.21058379335173,20.0098063363872,17.446457764785734,15.370692776550179,38.651202802168584,27.36220588736279,31.317764685635026,35.070896021408934,30.806782935467965,29.108297297160824,31.745701721843965,36.97007935948767,33.816532742225334,33.701793077695854,21.6348814329477,23.37973620506191,10.393836226130105,17.709154112414012,23.728545241107405,25.0150772205146,39.25339048283685,21.186420070084246,31.390690981039626,14.716653101320754,25.40003741025427,36.153444105298405,39.881523445379244,42.39707638960538,38.144687423523536,44.68869044013228,14.780528133379574,16.3559000598773,20.3517731483064,20.711615903969832,33.344167933468256,14.231922688434263,54.727465020041194,26.706513285523844,36.53704571909199,22.490317852406786,46.6195903387064,41.15871299482541,37.192808225774854,38.37657440735203,40.31351665745073,27.8740857974651,54.47477392226606,37.78565285205839,33.30652933719739,28.62757363517905,26.01452556585498,37.97094982795429,30.593608649406193,27.77527406672385,22.702195849576658,35.883857824390304,25.58113273545997,13.625976376794657,30.934645167958244,43.60802019585013,22.03594531488736,24.880673964816744,43.821221765471634,22.832501845279893,44.93050706568835,19.304699192073098,37.88668912749259,42.374296800892765,42.12697236792617,20.92830875206115,27.572599935720955,16.709991617242054,23.63951143995051,12.88143052334827,38.50277379714248,36.23688038698332,19.44825343626698,26.970498092360042,54.82607637811064,21.113558759102254,26.578866955924383,16.489196258046057,13.097299442984912,37.82181858268242,40.03989254701594,32.72344715159751,26.007381441935216,7.5039511342798715,6.194497977424924,40.21673183108915,38.80226377673708,25.354834441196736,43.065200215785815,47.7713630713817,16.721325174332975,17.308853384166095,14.530808115011373,10.622228868755293,49.20443113926074,39.558910407251496,12.264960111055029,37.75444169257943,26.75183545539609,26.9019817692906,31.855896166768723,15.71716911285752,28.79326959736475,15.427054608760935,36.635205581094255,11.300444651067151,22.48878962360147,30.559294307239867,39.03041296941311,39.006707274862556,27.8309191881392,39.61505581950782,14.70614886511633,43.33340759928695,45.39406534875817,39.33763980480356,58.48155424352565,54.98124794123686,44.94475264813579,12.269901752084653,8.966970335819674,7.321765907337481,6.460744755427821,34.11839399491055,8.834348004109298,44.041139960444575,38.36285880763414,30.982095913116417,25.643073322371613,39.67862481133993,35.524751538048896,23.90369951195435,13.155988103031962,56.61636049140143,14.042198542258859,38.72358508270705,21.521480218957365,23.896594963587106,22.37364131180454,13.428022789793896,27.60054102722605,28.442559054942084,11.665474884483436,33.63547743230429,27.710619320774136,17.879908610649053,15.677150922477242,38.4761565301647,37.43885371529046,44.49366927812092,29.49174580459708,27.074390186187134,38.67281453155822,17.652196303840583,47.19161717154298,9.039516370653518,29.13939078778963,30.806761189620858,17.82107330689259,37.2738169200312,40.921630318982416,31.61046260553427,18.568948981247736,17.01419693720309,21.79627055029674,17.92995254167446,30.105212822005118,37.9364180956391,41.31320129615714,35.65326014600787,23.2781921781771,26.776708002431278,24.395781000343714,25.53552490234592,45.12993890293307,33.489569357777235,6.736492284399986,24.417000042856323,57.28848755084634,26.98737230394196,46.52105331340663,46.75264559419211,24.261362030850655,38.33295099643925,36.308500039973325,35.07853745057119,54.701493124916674,48.963700004849045,17.825768714251424,22.894695795582493,43.48622927206119,42.047694230964964,44.22846015486344,38.23625119390024,38.94558953699259,26.576652286021808,14.69055287215237,13.623411316532303,38.90289434832393,46.12324646709763,43.31887114122533,49.49982469252501,42.648885846665806,44.420587528399885,20.914699765259353,32.711883804382424,27.419393848934874,43.930060028641186,27.919097775071624,34.64755300335242,18.68669192261725,19.203935936332094,41.436422243927936,10.765141258005887,43.71905341622053,13.247721318209024,19.46210179064391,40.488512975774576,33.24720450821199,47.47958567744459,16.663276690325443,49.86232105295818,35.5126028486262,47.265815454308246,47.42226066152311,40.826049914357725,25.59091222311456,10.77798437742648,42.037564973265134,38.95556609494258,34.64031497594099,26.189117927867386,22.648920202677758,14.576648549525268,20.313592337332366,48.52772717557163,39.4708806945756,11.62815028105118,28.815569889433853,50.12464241417534,39.65785835657992,14.019868120696586,27.99833040814739,36.98019395551072,38.92739463157211,19.31069620940107,17.228684921514358,51.829657153089066,47.928435461952425,24.628001115411557,17.186430055990733,39.075149282777666,20.072963881578943,9.116004297788901,20.38546023813021,44.39105103374347,13.62303678758412,8.583986134728768,21.415769382738162,21.98211194357071,41.97932428314761,7.039870578441589,42.794803890928684,24.779791225163294,44.057431015667106,54.48681671751051,34.43553152591872,35.85168915763193,56.02396218477918,21.062441361903762,23.51092339399778,22.976756234775635,34.02497743417172,38.46240242750946,17.260369788354968,40.22146568185238,46.2486199524741,11.423121754317984,29.74929459218016,4.029505978725063,44.587274780853065,17.945734845591254,25.555612410550097,39.52138064425269,32.04403218132616,21.718722969443846,46.50827738457318,45.233731039435476,16.68847092050742,36.26416623278161,26.0558322166781,45.207971710695574,17.023006766481203,8.682663930427829,53.38192681422419,28.2362170422226,37.980879809225776,40.31580024918242,27.655222892588405,33.09848566436894,23.28126639726733,15.016949383201572,45.99037267354875,45.94711810880672,38.235428797004076,7.231833841468944,35.20551889730553,37.695625565441475,34.68422985123866,25.61105660916928,30.290947848060636,36.65996558731706,36.06841938568728,56.4070964711857,8.744293645577992,25.10477764954603,24.923037462281098,22.792178255445393,16.253024936028968,18.67997046452297,26.093987296014866,32.23648520904682,21.348950666011824,46.914978962921374,36.43294343723187,53.21708130515713,53.74509823698245,30.08056592081475,16.047840272381364,30.975478804639536,33.81069395698805,22.19168108757489,17.827480235085208,9.14628042504852,42.53867216728104,22.98553382846569,46.56922328357045,15.263091893266623,34.90795843073397,15.60515320280829,37.37596529768531,53.120854266643285,43.65331880514879,25.673889323384397,12.77218825018764,49.758455872852174,32.213750182148125,28.353235843826372,17.33280125142999,35.66210916901359,20.451480681529716,38.5364467148956,51.06096497171583,46.101251521220846,7.9999322673862405,15.511084181220696,27.886252622577427,45.58512300494178,31.528946761815174,16.924444589131266,14.404884935626278,27.288310603633086,3.5871342119405414,24.098288664411154,41.49154653311693,35.048371384246316,22.199052999630705,43.78806692100156,30.125381895407166,10.378224275116104,6.401771113814645,24.5603809427293,42.7546718304018,28.23841974960535,35.99581485706996,36.99963934609822,21.177635132314826,40.00205338233284,47.24659106323996,27.491240206772968,6.418479483386879,40.47926820787279,39.48950306487663,51.87348249254815,34.36002515210479,6.068513723768425,37.10238561682563,9.801905999844909,29.079896176410365,16.994608444172037,47.34369176685716,36.16042324609169,12.803894702267451,42.80610161419658,10.060251642709414,33.26283582845697,18.356930314409606,10.433630357691822,17.54049351670136,22.423073695888558,27.098299744904818,45.357534898735594,13.050442759189211,36.087794013216026,36.40913466977324,37.09238297117061,31.294237883032,40.074529196275,15.945837402352447,31.735981952000685,46.92602939900773,30.724798229685675,52.29612772561393,32.820452598142595,23.493510356087018,40.9788689294118,25.130436375344267,36.12765245670168,42.02028879787565,18.646644486282085,24.958720289879516,13.33310722354548,15.406175325218117,45.741377935245225,36.6559010079202,14.322492225386934,18.9957986290888,12.512265560381977,43.68040672630079,49.15252253005971,56.84382545612176,44.2442239735217,8.191000407030034,8.531985411893661,40.249922990526144,20.793593616301443,41.59176346425337,35.84330486047752,42.580083249968496,14.727613281783544,34.063748454425124,47.45260361844966,36.51379256706239,28.868624173181153,31.125027522049336,28.9576556727674,22.031443068727896,27.344944374285998,25.612472366976007,52.631444442473885,20.63915431794154,35.516539087870655,55.63387354129498,35.13156888453301,41.16964600397054,36.951740684430064,34.503723279889904,19.028935638491138,35.04539128175645,14.37635197744127,30.26458051244309,25.933437359432517,41.32152465861755,34.714668556555,51.608524268415515,38.162015042582,28.621694076328232,20.72005785058326,17.358961061216057,23.657182199303325,45.285328389951886,40.47218217539339,34.907937640793335,20.6938699336001,22.291689921224133,45.774729988447504,33.99266459972047,11.427154878310777,44.50525599528423,3.198005186305446,48.884833845694985,29.394871932967625,30.347952555054512,39.57382936164161,46.66569162153013,41.378052466501146,30.54684622106132,20.875481929223355,45.589600729784856,32.376619813194395,7.471866035821,53.384588793515604,35.24212434046366,54.622225965318094,24.431494862462444,5.811378142511345,15.933997321824961,44.23171563270326,33.56401073928386,40.37708079061942,35.087555951339766,27.296384924316,39.25205723689946,29.58632459318487,22.11936252536397,32.11182251927251,47.02673939828915,8.849696333870622,16.55320951844919,36.75381979242033,31.771143300770596,47.67668751520739,25.892834900781683,43.73849747637789,21.274417137495636,58.82047760444747,28.898861908605973,33.52800996434985,39.26546865774467,3.6647472685613414,52.823697166853215,35.95555435233584,35.66935937157364,18.49764023241916,11.268841393235416,31.56536567497035,19.913690183888328,24.821446008267216,35.80517292992299,51.579945685641924,25.48169220987408,14.939928229633184,35.633767358188514,16.556799103390752,42.1755444206215,27.6652235121233,30.99266854862575,18.31929569950376,47.13433621939495,35.407022828402575,30.961150327786576,23.222925611876967,26.4157102260618,42.26831413618541,10.687992030381688,42.90454658598934,47.14770590600148,49.337187506884376,17.94170365035596,15.48842231212924,14.926558468026716,19.718408425858485,30.932671449239052,41.26715247781036,40.39085777992638,16.420788979795027,35.13140069487375,11.711750430971897,21.822924687353723,41.27558324910878,46.60399957768011,22.21810208712177,12.557585793460198,18.836480127160982,32.95517791290564,10.063158506546316,24.426938785771423,16.491758036164313,12.6064593716174,46.02034214735926,27.492417820032262,10.0900124138955,55.766119031690785,53.87114553482691,18.852527415033038,33.51264500784937,24.255791000605374,44.27947136643152,28.714998237313488,36.41144619748745,11.751799135063553,44.81650032095587,21.399862906022648,21.085823826146285,16.813695042290114,29.271868341007384,21.878464970470873,12.018750698368127,51.00680546453933,40.533318868523025,34.375426242177674,49.159070115273394,10.811287054092249,31.13895232876415,6.142861280880014,30.60413038229961,18.952584714149353,10.255005307512066,8.989715252404622,52.69669108217241,38.00457111026789,41.99318193997515,28.087291448353536,24.495593533976624,33.92361850844076,6.046969994275386,7.8096388116598225,32.66063749348828,47.749089849634004,8.805826413706344,50.27088860134234,16.417537301589192,23.61311998505223,26.409249468550023,45.13522081069769,44.16480719722617,31.91655615725478,43.513514525330734,35.9916312956034,27.67391307815059,36.315551380733204,44.397231939020244,44.39077477668047,50.46675016610916,18.318429328724,43.05967710816503,8.098281449775516,35.47708734187957,15.608135670138488,42.31142165757519,28.91166509839226,55.31218805987682,44.74844129638286,11.479781308992196,14.668025290956175,30.092542627195158,22.318061335594447,22.36575502212473,39.35866449403186,43.28374025167495,11.690661856272166,46.01686601368865,39.95830453081969,32.07749705670845,39.89657164527496,47.73076252970606,30.94314247234861,4.3332798266190675,29.850099768592212,45.931696997888864,40.95912717160459,33.76171699049461,27.63952832897869,43.647426128397974,23.248280662191227,31.89762923314056,49.52111752333488,39.86693745431188,31.18108658181837,37.47087001433967,45.288614063219654,22.29232158791652,37.322625382108924,50.58820312763144,45.80524064146069,15.357576586753341,39.97016424838331,36.698343110751985,25.731967828012557,12.120961416198623,18.675347001255773,20.023739381334046,26.732612016430025,42.160052226346444,25.71843726669474,41.516682184449756,36.968543175243205,31.062315673007934,18.8427348561873,35.4276696987415,15.243750547787105,46.41551985573998,33.749859242529375,45.300986855799664,13.8500892913338,20.441376661221984,22.182757497751705,31.432487955579685,35.309403211117804,34.993689229937615,15.77512532687727,14.330920495326133,48.98841102763012,13.863357914629843,37.69664007739194,40.967648508137955,20.429626332335218,13.599764321384619,6.375125447430117,45.383400086979975,33.08912572861012,38.06094025872649,37.06855026586648,18.578708568313512,51.27515646895627,37.21746248501375,21.28055557563916,44.013335385574486,37.50914858116883,44.58035421719285,39.24093615140512,25.294205092723992,33.86104391945121,15.2828440661149,22.872572436226243,30.053773927809267,44.815783556957655,49.88321507083341,24.744660514445304,45.34879977843566,30.46926943671707,48.03453160419028,12.03354168974938,5.446214560855549,41.606521545314294,48.308441040093555,41.09637488612932,25.57911720924551,16.921239871426252,46.73596837151425,10.112238399187286,23.133760070532738,36.19885570308838,32.35655323682871,52.114121789450216,1.9510631653206811,9.217563528221234,18.3408613256516,24.74048586246157,22.16760096876653,25.684116177258396,25.125406916380665,16.08361746373909,22.617690307447546,49.16541385199074,32.541508321310396,3.5000906560804212,28.959111983835733,43.56378655389332,42.143233778323406,41.77199841961739,32.64695528901421,11.971096658183678,27.956629593817667,30.834797279632724,37.237803947358586,29.40756536006006,53.31090329242601,27.656590537117044,31.922575491609496,37.34711435216704,49.28637544130335,42.57613711076773,34.03882158451397,37.15879169196558,22.267924366326227,28.781757908734228,35.76521430472746,43.26559804875822,27.688164180520694,3.472711787049092,38.353172080205766,26.379579134767013,31.104155059036295,4.500758379502914,29.346887152341875,25.13875624732125,36.09197305197335,5.203723256085513,40.99953643488629,18.769936832797136,14.475192768529306,24.097925463163406,21.18262862786247,15.514818603719434,31.88682939925979,37.63751003099523,49.64002618328447,8.52653067390916,44.709257517393446,43.85217879586652,16.590357340391883,49.69330047538022,14.87938344347349,33.97764793774279,23.76029309184083,11.359834678127072,26.842406281682308,47.41558021525398,33.76797565778824,13.18038047710373,38.98833634026689,32.368815192940716,45.88720040784225,37.80300110374146,33.98175038880991,56.14957843636319,29.85267603842242,48.33029066511898,22.141303496168824,21.715463348664585,38.40391215266774,53.25715029919216,41.29782007013875,49.43808670987104,50.225473977580485,29.371938215381018,28.261988073429727,40.3311508706511,38.76108682822686,27.38272238811905,13.885355026803538,46.52556044250133,40.03019603508747,22.157764734841496,20.29066079717203,50.78843709001405,14.602431905427768,30.299967810924603,29.41999678692914,32.27842166729897,34.77747802198334,9.430060403299754,43.856265218771746,37.09479285569085,22.893149373220393,40.689699605893495,24.089840546537502,32.50150501487067,33.80530574237467,35.69210076724573,31.754241293724718,43.88197345079507,26.017594896219748,46.75920818960723,14.664738219867456,37.22675080041883,30.688464250310528,9.73307286525845,31.304123972294988,28.31191395668317,32.58749313064043,23.245543154791676,26.247312713003076,47.61788598403102,7.86073090458812,41.44254665120144,28.26108998306752,12.659647595978996,47.580786451758144,35.358051702522935,17.73720567157706,35.30603479115805,41.13576191451743,27.687675227228862,21.352662422407924,44.40190858976637,28.269044017273735,39.39177383255601,20.02866845035193,8.592069213092293,47.3240314518096,45.82780295004332,24.858869515237252,5.210420716557387,21.81055034253928,24.978901533607807,49.13407270154167,9.1445830327052,4.114000058507119,28.83919608281102,9.10556617141754,23.596679852399816,51.36362265731171,29.816599509960806,28.449882390992514,31.534092643078655,34.03485674925571,37.75243459556103,23.149722812496766,37.254354724870836,39.97516977486765,47.18169873678718],"a":[16.295855369230857,19.4240077311983,12.518512940792284,13.71589257312884,12.651167885939092,10.674752448957934,13.866639737089258,5.968502487582561,16.57834828838059,12.048612121988258,19.56034094049699,2.5761955263774494,0.9338262519561003,6.458405425463014,11.195744124022307,0.27535346386262205,13.690181359294593,0.6105636987339436,12.745109891494092,13.388680952605325,1.8596036785379644,11.31729350861091,10.120224656535957,1.408358779629748,18.592727435207483,19.807476178061197,19.635195221806395,0.29737946788231273,6.08439041037474,11.565450756309957,6.561746791710403,5.542385713915365,0.1862302506618052,6.432514515011247,2.2663079829037125,2.8215745612849163,3.593913388021406,8.426940593732969,10.742347311160954,0.3338147799988356,16.961256903728966,13.089684549228068,3.968987621241813,6.833977559333015,13.146024298800857,18.24931831756968,5.396304022389784,15.796350437140681,10.40568122132376,0.9727670444246739,0.3967192771268335,12.533860094257449,18.371662204163115,13.230169364919572,12.78930178877614,0.9773760094539252,13.15654891413898,3.7419929248971906,19.725027620516855,8.172960870075752,7.235299051516031,7.16097814027338,11.605816886738229,2.733651013239693,11.621309215870426,12.787174220297421,1.727348839916103,16.254600983851223,11.448288083249466,14.895988023296312,3.773660884564305,2.3108255634608765,17.267972810570008,1.257762208498714,5.226701570138337,14.849783728515531,0.7134109957953649,6.185145019348588,4.380822066209542,8.439656125056455,7.5646593965892395,4.296646520036944,0.8067850301391921,9.543766344226814,0.20686394177651835,0.011177200566723222,18.775749821729622,15.555620970114123,1.7010694604006815,8.646729249802823,11.094268680349924,12.473710905888392,19.198078837021644,4.288355708644458,18.603270187159872,9.680493395699955,3.7243537782254554,13.02566419058589,4.230586317961085,2.261849902482891,9.592181234108068,10.632612418717624,6.752205903732618,17.52038146626928,14.121580349256156,8.51387025383267,0.40014093409593166,8.147259079705101,18.369103403179633,12.536671953166634,17.653849466824873,6.786276980573227,14.674870954343419,0.22327726019452765,3.913885986885348,18.958417067962007,16.403621534318702,3.1002362339992207,6.250078853337291,0.31129702408389637,11.585969922839281,17.133647077831323,8.619085512357948,11.55834337229052,13.391283373686246,11.104839435680551,12.355542947847926,6.411855499154706,8.929201728131249,14.12803497589012,5.035065844805722,16.463582556313888,5.122618757203243,13.03937528557865,6.373729804716994,0.8054262499075815,11.146462512043577,15.905196060307345,6.620111547115388,17.762028976845144,12.128438574978532,14.657897164123668,1.0837341107163967,14.146865551255448,1.1611207869533446,18.246985884841255,6.784163934557297,19.919531801992633,5.9299236910090425,16.738116604451683,12.934800718464302,7.716348935197628,11.904125985856755,14.960771457101036,16.43399745252578,3.836835110315855,7.625238917371551,17.38199388736684,6.4807302502811215,6.94628632568012,6.780703549867164,12.202077270655685,14.77434103472711,1.8606263667745937,15.71416663273304,19.353707586194343,14.448861142293893,18.470442531141234,15.878522143500104,18.83298808911137,9.477069593193104,16.71770978256628,17.638748050108184,6.21223146592405,6.785717823926185,14.366753418317625,11.73125401542304,11.926070326822424,6.118924278723044,10.529550083186368,11.596044446555238,16.75531013220544,15.893796815126638,15.610977070364784,4.037355839559975,3.6465296980562334,6.0703733692391815,7.877563912924201,8.1396669479662,6.150572307476869,3.934248313393489,6.192357878209482,7.963749537707501,9.2219291833056,10.005432012155389,11.455575460629204,11.598864826228667,16.04144851186539,16.97308027119837,3.9481849946508074,0.8214533772634924,14.556310323166493,4.363306640835063,12.17120787748646,12.381970362248737,0.7363539519246043,10.324252840457087,4.781509532786821,1.2798629173310694,19.735713640229953,12.07038707568496,9.703744298915868,9.820974033150453,19.771504388825903,17.754177356419383,8.201349156929005,14.775998865244562,9.922753017681526,0.1186124438741043,2.4309990433648077,11.462357396752644,15.41501950196146,15.271969170891314,19.369728596563576,19.997754895662165,6.574622431423571,8.149784383232275,3.3682225631465235,2.4417361628946743,3.958600372369392,17.09213850355614,1.1470898647417194,5.57808502812402,15.315786187501676,16.4980948606785,12.897644143820028,19.690690315124918,6.013634922098641,8.237056009976289,10.029947136790081,18.441121091417443,12.045151836551975,3.2697372284420867,18.533150870159815,4.803861647202572,8.353497384292453,4.730029359336001,3.1510669725048412,16.723083244846414,0.8265425427295359,18.26921905854396,1.735208662846306,1.4172614733331557,12.667216986588809,17.888181608994465,11.066742142863909,12.644823027224298,3.339239646914427,0.6118790486992465,14.066034424282247,12.821826976422933,13.255320472008085,7.770852036712403,11.411209845275732,16.76938109756451,3.862734537569441,2.137252631352262,4.323678355993792,13.875859358610075,7.600258713604098,12.866752024536062,12.47324928604197,2.883656570552273,1.0895070637276483,14.228627835841703,15.412353079230808,13.624535641359255,10.071289368513842,1.1493496025407612,12.63083435976251,7.7900623567814,10.923382133650229,17.30615974009337,2.4044239890291497,13.883539662162176,17.95286510089278,8.28992370073832,17.364849079840596,17.78698134058036,14.840468417569932,17.529001916594087,19.98629590722899,1.0744182646209444,18.094020492349642,15.246139987429892,3.4045312527020233,2.9200047363765824,15.7659145700607,19.568334656651718,10.664796124671682,12.45887099963082,5.002937357582979,2.6907222991574242,4.230801307723335,12.218739298040173,6.232802176910961,15.489608230547036,6.698620650736964,10.616164516651576,17.968763047443556,8.987256012027046,4.741572754530776,10.611444501166801,12.145777680663898,7.252584237156516,0.6603959590162178,17.0070449504992,7.918008764674682,11.766507789120059,17.127767789525077,6.905562349993155,17.467845438030082,5.978352769477913,6.447008860999142,2.19352494061102,3.853481684062401,14.200544226977886,10.135386407041555,19.60974403316541,6.480418915076154,13.756442050765493,8.766351951348824,6.013997222502705,2.9445330021980176,5.883397910750947,2.971696105136541,14.483845893139815,0.5426048751414259,10.122018841117587,12.3852832898348,2.7499833334943258,7.714018762878645,16.1904982209974,8.166405315073494,0.2567433090633875,6.323654249550752,15.838681348754037,0.6965635089137834,7.924829478544835,18.642413344730254,4.1698914723226155,5.368991548535531,16.072864181623064,5.141560808691268,19.529155747449444,14.179586207105386,9.875844273826061,14.223660934265165,15.563488855844847,18.662112243120788,7.388995768672992,17.60704187727521,15.753011128367644,5.2042210603247785,4.093082075062937,4.959104412165667,12.862758671543602,15.201812111990787,6.421083449276934,3.8725668766454557,12.919721390664133,13.593835457617107,19.92466123066773,10.561967928081554,15.245712331634799,18.31009289633211,2.049377639469765,12.259730480421949,11.061865473598633,3.7773495712700456,19.04142540172831,0.42288568618689126,14.199500473070383,18.01974069409487,3.5569436581993674,18.661921382193807,0.49924298377979515,16.732322062854188,4.487401538055118,7.0682849047004925,6.6514109427054136,15.617850531823688,16.779544882064023,18.626543088428047,17.229669301227446,6.045765273689541,9.934346105356632,3.350200534068266,13.53336726313826,8.155238590478632,7.888207057182046,19.689273601538545,11.094347293847356,12.275924276125156,2.347801960654623,10.561943557345735,12.229863339023193,2.7312676618364495,6.124801302428127,15.558294021695339,10.794215755335319,7.967692336026131,5.511896135030732,16.17469394866609,11.811820085996079,15.19112384427106,3.409288351822517,12.498257936770688,8.295392699526518,16.068593189286982,18.65756068254887,0.18756039061305962,3.1596401932870455,4.1888011770968125,4.211335941020109,1.3984400124546248,0.6726010021475304,4.192335011458099,13.863953533680426,3.2723694126588487,9.05888779076978,6.657316154945887,15.360731969328265,15.275274565327294,6.967507786731,11.264135659955944,13.903212024727791,8.959469972188998,2.39650292134868,16.381421849752385,2.7405911071608946,12.21629626745127,17.23714597628055,16.94582800093528,0.16146846425937333,13.759439721565307,8.06392006550439,18.237614217046524,17.437470765330637,4.084591689947241,1.5617835044692363,6.599351715150439,17.506384483398136,2.7099543953164273,5.644421443446568,1.728421361800181,0.40082244591037597,0.47622817479409996,3.378491298891304,13.56524681518887,18.27192066571744,7.833709100610244,2.77361483403193,19.468386976236495,9.583585449317308,13.875580146985275,3.3420667787379754,3.1742328980115397,15.391512058490244,2.397118304741599,11.03192186152965,15.353517736363433,10.703909761712676,15.626579620141555,4.960496588675096,17.21945628908643,5.856619020101608,4.962687939643873,12.861352891930743,4.847597277942661,18.076699211251167,1.3562288321517757,14.985465163903493,7.9758033656562555,7.935676462988206,17.909069252605484,0.02692048304354433,3.4525350285188683,18.209333065657294,5.039267868170203,14.952061866738307,2.93624655129177,5.07670030047604,11.484626975008613,2.0927987444574647,4.566795512894721,2.1146127660173164,16.509814690011645,14.248936533103675,5.255111727725712,12.76932120147725,2.601850630753204,11.265071098212793,11.143209544323046,5.295892491125698,16.66064753951176,18.987618991923316,10.585496452355304,15.759439443501124,11.31362011510686,17.2444130719488,14.628396635579254,12.676893201083995,5.737849934104271,4.079792079059668,4.254386709893119,8.45888319127885,16.099401603094314,10.50332966572884,17.132635623798738,3.7549855410058974,9.349437903891658,5.296540867817763,1.7017983478328258,5.896323580792635,19.053985579627202,7.467410328714816,10.150516076394872,12.236206652127976,2.4727346452832144,7.63995418568717,2.726553744664777,6.444116881245159,3.208129759313514,9.132329810883233,16.455919900828768,14.937328877200615,18.162396810879326,19.445283627714343,5.611020947167988,6.2653770021499255,18.704174295082098,12.61775261809666,4.949368289029432,8.31563268074802,9.244456519902457,2.737457180721914,18.373326124530372,12.405616139452075,7.220336342082154,8.65566023706554,7.560431824971432,14.508859895922175,15.414086124977654,17.163240833178612,10.166760930438304,16.301171123722185,2.017292141062006,1.4630234415507015,17.22589481886208,19.861396776823653,12.730403397142256,16.604092636761333,3.8696567412579075,3.9047701850952787,7.17843110015858,0.06928997788574698,14.08404672204712,2.383751663756337,9.137081266320791,3.695890215103117,13.525452854181319,11.25271519185893,0.7040893853617014,19.42174524983756,3.2574491863445454,19.28917766431805,16.048770703878603,12.314250638013121,19.586250151938543,18.46068351374668,9.900373140471297,17.62373321157154,14.777878784811769,4.492499956531981,10.563602016121255,2.9358912226257328,19.451588205281993,18.916777991801123,7.688706983888194,13.988163420927954,18.924447040445212,3.3992274102125597,12.965729774969432,1.4780835490628252,6.354194804341171,3.7554264451049546,0.2089750634553944,14.03131707959638,1.1227666116681068,16.443135101565,18.633210103104027,1.702562009958366,6.678357555758985,4.409433179928892,15.472148911169409,15.376985481681068,13.875253699416232,15.166479123566923,3.523838744927983,0.7015571353662953,14.861909788639633,17.30356829312829,8.860988786617607,6.49091370914213,5.472531970706331,15.454284366373866,11.776379597509177,9.234893727437704,8.73517542326855,8.003041995168235,13.154235103872534,18.92577218494842,0.7367437717139502,6.928207913743862,2.6297436273442676,2.8535148057259763,13.46089128180806,0.6127042297117846,9.39959990010884,8.475905568065652,9.40816425467733,1.955296609498376,8.45378081950782,6.586821551758373,14.225251572628622,12.808429785940794,14.709551872210426,4.237285503324797,13.692544842298616,7.881327241623826,19.197870155227236,18.905111999483793,10.162089927160856,4.3961300824926175,17.29379199063173,17.036503382971876,17.88816810153318,8.327465769546972,3.729839956597889,9.40488856782856,0.31073408703943706,16.79229057256977,9.542124110281076,11.440030045105463,13.822625315812832,7.395446371878904,0.59604519124135,8.721666716535372,19.199471994130587,4.464776862798212,3.6799831868586663,14.029603246020823,5.23462369299081,11.613463203587147,3.3775770163998464,8.066135913136048,19.31645151498277,10.862105899930178,2.5791790936781966,8.985249694942157,16.49116001083385,6.156748105753231,15.924350601856364,7.186750871428136,8.18270473510941,19.386765267590555,16.35682910595234,5.793201542316049,19.51423417017846,18.4457697479088,11.82429810763332,14.701280811395936,2.4018171656092413,11.329698460736353,15.208494495568324,4.828555587844199,4.8526946100603086,13.577529467826167,19.22278001308342,13.386025336847837,8.368452000878372,0.47069506180220877,9.20967989951782,8.204605204779792,19.550847829449047,16.68706768568416,19.13568224103058,15.948573358206799,0.12275191776942584,13.577442800050573,4.556584631139415,5.602804743586622,16.911111229593526,0.9269621303071052,2.1549779595942287,18.175326381887285,0.674894681118805,14.361121860625715,15.03545541349316,18.231921405248904,3.632397611756444,4.809112648765934,1.4308969277187655,15.502975461714863,19.072784351798685,3.393337174050144,16.47671919249101,6.750093203988006,9.378777612931813,16.810458765036103,9.185333090620826,16.017561219195887,14.644316452255449,7.18017018405388,5.963733359050285,3.4100769085756477,7.752261264607512,11.675557664135049,19.72097625753864,11.339665990599004,4.221585227489961,3.4646957797833933,5.7132750140579835,0.025966380955635415,12.530020972606026,3.136022766511184,8.848081117568452,17.085326618138513,8.295272751866198,11.205190299944485,11.62864616664133,19.842835507229132,8.008970890427399,17.873034026998905,5.273426280443956,8.089028580602054,8.601267649225584,6.957383930105747,3.0157725207783015,6.252717004639914,6.7755066729141555,17.975154176242924,17.28175035957054,3.8831714830613784,0.4741166631962157,10.844766784835098,11.070397760781887,15.536948888946851,16.38413049361414,13.536117215644374,13.686932759362387,17.39379289823441,12.712321221281737,4.009400148576985,5.561354470323887,3.5539649043879074,18.651321466808394,0.46848003371623204,1.3882931125932707,15.139135700810748,15.033371271098531,0.2522880248264503,19.594981409940036,15.759497945651923,13.423389493866559,10.99955318422765,15.550917458182973,10.108474166093494,16.150723926404623,6.714648330852446,1.6179310211256182,12.565057161007012,14.350288912447212,16.723039983118,4.463114683864933,17.1723730764001,13.798731522155938,17.15006352986144,1.397742332202978,5.801352246782323,4.335024406041397,1.8017995756475713,19.130760514249946,1.0582819515076913,2.947982911930329,5.856800335779115,14.814581213399403,2.606847102363079,17.33949490250144,12.052428064536652,18.968016801743765,11.01479020209348,6.588951326487775,6.29147106564099,1.5587467754374629,8.287522210491783,4.502942569269548,8.514509303653508,9.59690313377347,7.985682898881188,15.028350481508728,10.341902947962396,0.8905452214914611,16.242459873678847,18.093992353240175,19.58835807599624,13.748765331445671,5.325632002075089,18.21775930514919,8.944997898471033,18.126504330669,4.27750925341035,5.895659496263388,16.18210938555962,14.66765244927544,12.366658971712399,12.850145491259672,15.745226765669953,9.410030115081831,3.1625536974693835,10.865815610852248,14.43871448659769,12.120061884591964,8.260016373592629,13.651754716949558,14.138263261032078,9.606236698404551,5.947810888917386,0.31785200135345804,1.8451862014689357,12.94273624801825,1.8115269964482472,1.3615834729408816,6.970325092073262,6.144733772917141,5.073357222803376,16.565685492104755,18.941289721791954,8.473787847975709,15.68020211378608,11.796422327215863,19.681768521311685,1.6873707861081089,15.172016756038502,12.091466012197035,12.015951048706128,19.407818884051593,7.138065312195829,4.215757394059052,3.23685893032589,14.75542742513758,17.52543299202763,0.4131419749586307,17.174204480653465,11.016069290442761,2.678723553931941,19.73815725470981,10.908220359676605,13.4078183111049,16.112293365695486,6.135054446533719,14.84734480913707,18.216534365299854,3.857637933422189,18.918578252618374,14.826710273174282,2.8475809413382125,2.47037275932652,3.482047619169335,8.552027494689597,2.6018732864681304,11.497297242820256,5.53756637585646,17.252594624239933,0.03548590609949276,14.718485091738671,8.594516071271222,9.989971596741292,10.926099192363004,16.79395028161818,6.9392803853872564,18.54443487019666,16.737906389703472,17.69463243148597,5.901983371235904,19.844091305883154,18.721311923854284,7.448697087740075,17.155172150269728,4.764893263547916,9.677944050035542,2.90897123021324,2.4441577549395888,10.036671037122758,18.409194038424317,14.412054200892452,1.8351590534364792,17.80121805032713,1.715981586750961,15.230968630869143,13.80165429917894,1.9266262156837755,19.660834220940302,7.435594241751331,12.653288034667014,1.1139395228499582,16.601366149482732,5.196476260879921,15.648688441644808,6.389324637271039,10.206168512337799,13.796826732500884,7.768591775634479,3.9432878762974166,19.39745497866626,3.853629744699232,4.822139163344303,0.6237662195756899,12.59130612081945,9.231301871940651,15.592852046038992,6.4632238508095785,12.174990295350362,0.14435377116830406,10.629369984086892,17.41104663881282,14.49735017070135,19.20607520343216,6.402224984209859,7.69175936958344,7.154118015981541,5.983332322592649,11.536643447263181,16.68682817664015,18.599511761445076,19.614037829679994,1.3765740117967074,15.637179201052266,13.152119341956826,0.6168321917152308,11.186977809971118,13.628857543894824,16.844789820653375,6.514655178487487,5.145946000367028,11.36448302673637,9.169969163472196,5.354906409641664,7.39528304789435,9.463087423732514,15.049860749165607,4.731968945723137,17.02967881068719,17.5463896970872,5.8212853777615425,15.850637835518256,19.647402593464204,16.066125256162902,6.689798083020593,15.414359244166857,16.262791794590136,14.190761551821947,9.06921383982823,16.10689359422335,12.575769908083663,0.16584724776089743,8.429291058194206,17.384973024981374,14.234082224421583,18.777877073218274,2.5258436907898485,4.81683014343512,7.955706476547935,19.417861407536996,7.6883084022074355,0.24732557794775456,6.563508264733193,7.02652423897129,18.737967184658558,15.782342488557912,18.291511172000945,18.087295326912106,8.75690515773675,15.808084826250948,1.8645930636962849,6.346463157445688,2.40712847803791,17.425726221771352,15.242562231859221]}
},{}],116:[function(require,module,exports){
module.exports={"expected":[0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910537,0.7654337024910541,0.7654337024910546,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.765433702491055,0.7654337024910542,0.7654337024910541,0.7654337024910545,0.7654337024910539,0.7654337024910542,0.765433702491054,0.7654337024910545,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910546,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910547,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910546,0.765433702491054,0.7654337024910545,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.765433702491034,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910544,0.765433702491054,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910509,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910546,0.7654337024910545,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910534,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910544,0.7654337024910544,0.765433702491054,0.7654337024910545,0.7654337024910544,0.7654337024910542,0.7654337024910542,0.7654337024910554,0.7654337024910536,0.7654337024910541,0.7654337024910544,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910555,0.7654337024910532,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910532,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910547,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.7654337024910542,0.7654337024910546,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910544,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910544,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910554,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910545,0.7654337024910532,0.7654337024910535,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910545,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910547,0.7654337024910545,0.7654337024910539,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910538,0.765433702491054,0.765433702491054,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910544,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910546,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910538,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910551,0.7654337024910547,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910544,0.7654337024910544,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910545,0.7654337024910541,0.7654337024910541,0.7654337024910545,0.7654337024910542,0.7654337024910539,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910596,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910534,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.765433702491054,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910539,0.765433702491054,0.7654337024910542,0.7654337024910542,0.765433702491054,0.765433702491054,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910546,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910537,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910538,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910537,0.7654337024910542,0.765433702491054,0.7654337024910546,0.765433702491054,0.7654337024910542,0.7654337024910542,0.765433702491054,0.765433702491054,0.7654337024910542,0.7654337024910544,0.7654337024910545,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.765433702491054,0.7654337024910581,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910548,0.765433702491054,0.7654337024910542,0.765433702491054,0.7654337024910534,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910545,0.7654337024910542,0.7654337024910539,0.7654337024910544,0.7654337024910544,0.7654337024910542,0.7654337024910554,0.7654337024910541,0.7654337024910542,0.7654337024910538,0.7654337024910542,0.7654337024910544,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.7654337024910546,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910544,0.765433702491054,0.7654337024910542,0.7654337024910539,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910568,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910545,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910545,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910539,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910544,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910536,0.7654337024910542,0.7654337024910545,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910547,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910579,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910548,0.7654337024910545,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.7654337024910544,0.7654337024910544,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910545,0.7654337024910542,0.765433702491054,0.765433702491054,0.7654337024910541,0.7654337024910544,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910544,0.7654337024910534,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.7654337024910541,0.765433702491055,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910545,0.7654337024910544,0.7654337024910541,0.765433702491054,0.7654337024910544,0.7654337024910534,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910541,0.765433702491054,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910545,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910529,0.7654337024910544,0.7654337024910542,0.7654337024910544,0.765433702491054,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910551,0.7654337024910459,0.7654337024910542,0.7654337024910545,0.765433702491054,0.7654337024910544,0.7654337024910535,0.7654337024910541,0.7654337024910544,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491053,0.765433702491054,0.765433702491054,0.7654337024910539,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910565,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910539,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910549,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910544,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910548,0.7654337024910542,0.7654337024910537,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910544,0.765433702491054,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910546,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910538,0.7654337024910541,0.7654337024910544,0.7654337024910534,0.7654337024910542,0.765433702491054,0.765433702491054,0.7654337024910538,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910549,0.7654337024910541,0.7654337024910541,0.7654337024910554,0.7654337024910544,0.7654337024910542,0.7654337024910544,0.7654337024910545,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910536,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910544,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910545,0.7654337024910542,0.765433702491055,0.7654337024910541,0.7654337024910547,0.765433702491054,0.7654337024910545,0.7654337024910538,0.7654337024910541,0.7654337024910542,0.7654337024910539,0.7654337024910542,0.765433702491054,0.7654337024910538,0.7654337024910542,0.7654337024910544,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910538,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.7654337024910539,0.7654337024910541,0.7654337024910544,0.7654337024910542,0.7654337024910544,0.7654337024910537,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910546,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910537,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910554,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910547,0.7654337024910542,0.7654337024910525,0.765433702491054,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910545,0.7654337024910544,0.765433702491054,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910545,0.7654337024910542,0.765433702491054,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910544,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910545,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910537,0.7654337024910542,0.7654337024910567,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910536,0.765433702491054,0.7654337024910544,0.7654337024910544,0.7654337024910542,0.7654337024910545,0.7654337024910538,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910542,0.765433702491054,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910547,0.7654337024910538,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910541,0.7654337024910542,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.765433702491054,0.7654337024910541,0.7654337024910547,0.7654337024910541,0.7654337024910542,0.765433702491054,0.7654337024910538,0.7654337024910542,0.7654337024910547,0.7654337024910542,0.7654337024910541,0.765433702491054,0.7654337024910545,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910541,0.7654337024910541,0.765433702491054,0.7654337024910542,0.7654337024910541,0.7654337024910544,0.7654337024910542,0.7654337024910544,0.7654337024910542,0.7654337024910526,0.7654337024910542],"c":[11.572718482814683,8.201675815535715,14.691877383084204,1.0951829027862288,10.73489022676921,15.396663827994393,3.455689059287349,10.628723569873806,6.838648090706164,10.803492767702762,9.113086072205869,2.5294478323671,13.393713618495916,14.106061605929195,5.148544674380503,15.19302697829943,19.115342810130876,3.5168196574323596,19.104519076820043,17.74619242490538,4.221055491500004,17.958779143127906,15.903670112783274,15.523753816006762,3.186716748042466,9.559399371281458,3.2263024913792155,9.87673112028185,0.5381647308066138,1.8342586294647734,3.4237117067373957,1.0134807946901938,16.712381378250694,4.962087654612089,14.439104943061377,9.282001912350573,11.5243295090984,9.430207232276945,10.677408378153663,8.306747162465745,6.757664177584286,16.069246578912416,16.239991071994684,7.5457984648213365,2.8940630349727847,3.6044159968468477,0.964129705158826,16.767036487486052,1.5722241604257243,9.490757985250864,18.8881810002351,17.838016218781057,12.826508229407382,10.657097964699572,15.951893504852443,6.617814181660076,7.330439313382142,2.6003808148324636,4.272864300110198,10.487899427056488,7.181271543901133,9.360291423280813,5.596623273695354,16.27984918732974,1.126533536082619,11.25137722494686,17.553154031210028,5.666278084961905,14.513532485585444,15.022282091340957,16.476354778008385,16.309665065612677,9.00245919866223,2.5884803689170637,6.595447243210202,10.481074576162742,9.005903527934457,1.164549617300793,17.125917838117434,5.968937301197085,14.240138679544154,9.291570397586543,11.910256442067118,2.898039742705321,4.139739368229467,2.09932640036839,13.142813766358925,0.7129978992792532,6.895902527781812,1.0141650692448942,1.9012725805270552,16.90908082813291,5.028544318423763,13.819965297319708,15.108650132442948,13.601411274754422,10.506028323979322,17.862897192961125,9.722747259701038,10.543363932978428,4.966038722333629,18.6995730122012,16.163179008023324,3.8165458456245904,10.39512703977225,6.4450738379932835,8.999875692168334,12.808057504432254,16.842865411808518,14.292798656106772,9.304099557030222,4.656037760808385,18.972390865104472,20.480568421146767,17.170528609017314,10.191452311944845,9.277436108950289,4.708318302705531,8.151798319320271,14.804836693616611,19.20010790271799,14.877776846095022,10.835611369279727,17.803127030195903,15.127850672153523,18.951680164438162,19.869210332638495,6.532817428181697,13.80605255004364,17.49931834134898,7.742365076612383,18.816579934631353,5.952589016551413,9.332305340200193,9.790907698511987,15.414413880147908,20.18074356454655,14.05219993658281,1.6209716893313542,13.86507607133281,15.881208106704639,14.694105911156056,0.07368373308741945,1.521318622819027,19.432536022464493,12.743490240927466,1.3558335173835137,6.070582491468482,4.099716526634701,1.4633974751282706,19.784492209116515,5.359299046400654,4.540248011178707,17.42343050037797,9.786160439978252,1.184694073992819,14.925715296561762,8.399651338261444,6.9124216595318515,3.4422705466802883,19.895737787198172,4.4227203896890614,4.229597024928849,13.91794444751852,8.772382159801763,7.421650058191672,9.557782990358454,2.9844928347597683,17.657890223578974,1.4276962014447303,5.982045342571904,8.961304326361564,5.276586447965623,3.565779756081289,1.9956250576905445,10.535643057997719,18.81486733155178,14.223282076940786,18.504202143146788,9.169932605295852,13.545323777541375,16.15004244970206,17.682498419056873,3.098183337644235,10.212941307693194,7.743793265166457,2.9883025397023997,0.18224647731953736,7.910989889835812,5.2877420713746845,3.2746509611387538,3.691906911855257,12.534511527395882,8.738475082370643,9.64612325141494,8.984134932593255,19.70384774319987,6.991607574157038,2.0905733468067176,14.280123286691387,11.47945544661865,9.761950044586436,13.072221462704805,14.567521194522051,17.125090406659886,9.777933024207393,12.096939412987325,20.202277405578634,11.364921403451332,18.11535176001016,1.50118642347253,10.75697530755562,5.460975354746033,16.455721109036773,18.662071493801726,2.3947508148563976,10.990922701364994,17.60242502695913,0.585403578895021,16.27711550393904,17.48953168494471,4.31452913852882,4.047931172409351,0.9900509132213966,6.523474796789607,4.924346808454083,20.010802704774363,0.6946266367745035,16.799751546127116,17.42519867230502,14.17007413465795,3.959929558915542,7.91374893411301,14.253619282487065,18.873106324806695,5.745770096479412,6.716589459953086,0.9571036338755958,1.9226061099921075,13.522617942208097,2.740241951290935,18.994506159958497,4.1535665247889995,11.43903599827803,18.95670900021287,12.897943144113759,2.2264741237327996,18.867109404214276,14.141592555936047,5.439849985990061,15.139446309706969,3.2707682150650093,19.10460775767145,11.03936955501309,4.318167035535655,11.775646346158535,6.137044564072326,2.7484506196531897,15.498711605625036,19.859291021617405,5.494865359908315,3.1246651264679413,16.75636519859804,15.62359904268913,2.8744472207353526,14.603570864987267,3.6470518947937616,5.630857227772441,10.82178372254888,13.076041043853136,7.113050554795707,17.085307789586178,11.995608829319336,3.3390614295588006,20.171638086935186,13.000052452212756,13.530279764133592,13.562916256194443,15.846248141604784,11.939851439248363,14.277423072468503,19.15226270888968,16.716040513883726,3.1217876613771973,18.20174479164593,14.934009648450534,7.9820680350756845,13.47860721590394,18.11052072980886,11.385577850101622,15.974297541422967,12.516462511816357,11.316307869532396,9.92478551723706,3.2535134721608765,18.952004750648044,18.767099347655684,0.9800339161688253,18.232905700444046,18.249644431610474,4.758925907110093,1.8294281087939837,9.297884829686964,2.3989802194173007,11.2376956455557,9.725437488171586,6.4352832897683,4.970375088670027,16.729016476796822,10.381151265583759,15.247411540367569,14.703426135317871,7.452676404125547,18.5527843354824,19.846735184041677,10.804465748574275,17.364229189994532,18.730985977717907,14.577887714388913,3.8415935559062855,0.5069063170660413,10.056113615587327,9.965733649427554,1.1246839567706768,18.79303273410871,18.62161861527231,9.007774199504528,4.435124044710882,11.190360314525279,17.67584325520046,4.74847817242881,11.533559663357053,1.7304670509758076,18.601319510151185,11.894703681820152,15.104386828549337,17.90845907097168,12.226529383615741,3.0040276392540965,15.28905084446079,8.972583709108276,14.621898143686748,10.011963520367926,5.0024536707990475,4.407911240314687,13.688836079556467,8.500924793160625,14.262937171758498,12.582373818166337,12.114877175062519,13.072609765217013,18.784979003193502,15.533995767140983,1.002481896103064,0.5692304051918401,10.219480505034822,13.794540567716089,5.593197531000187,16.98457476227041,18.539730434464204,7.982651298966541,2.064100623337277,2.078444036272843,13.943898958135978,11.885089418562034,12.617460483733163,2.8449827942421666,19.042940498090353,16.21472960198935,8.339909654645183,10.915081169247816,17.344398800747843,0.23081610647960266,7.749685989981002,18.629564870914805,11.188872989193333,5.0949925040833355,0.18868809935564185,6.610590393510928,6.934729590562883,15.432274932181286,3.199939392486578,14.532228597320719,9.319675458779656,7.700522318765457,4.564124898330389,12.524659242392842,15.986874363944628,13.952592849099291,1.4687237982038144,5.220468059339731,9.84241741979257,19.2114231108985,16.34359306821656,14.218049598232701,3.6419716876863153,6.203440452999318,10.848429427419768,20.01098668529029,17.4907322958074,11.606570022890308,3.456843112332364,4.750660927120455,7.928743140534283,0.6550192136421398,0.8582676056241373,9.658029308150198,1.0224644069026025,11.335427369278925,17.374997433682243,15.244716259889245,9.675300398744183,10.265451669208252,16.521962367909644,1.739514221934859,16.63265772917846,1.40995598385423,6.03728617320286,2.5314339519613847,11.02942418181628,18.252513570586075,10.542811235468886,19.141502172557065,1.6324601670180643,12.445964471976898,18.822257177836473,14.078746846667453,12.128113834291836,15.472052643441996,17.271947957263112,7.160732345041388,2.700389901858421,18.660224668502913,6.095145673273251,6.907196522208104,5.572509118495146,17.84974342264717,15.605470834733033,15.62861380502806,11.285906540116573,14.395583402577545,0.48239182533917213,18.297005972575395,15.808820196765488,12.21182531392117,19.15359856432756,12.865420475312636,15.799765642242527,13.48144773048336,12.81462039409414,11.512990865538034,20.277144536190665,7.258135673504184,14.266130101118517,8.215316256907892,12.237731826613391,15.406503966229605,7.917802646978727,8.809477944306353,9.770771120382,9.967140860914096,19.64629153073634,2.583231489236508,10.10780014940088,6.9918778369994685,12.46310917164895,12.703689421254724,10.604641270102592,7.80919990144665,9.925756226998276,8.719755154037886,0.9366662310366434,18.92626986308427,1.1067458038955726,7.666768093437555,3.412213049602122,5.77788254073141,8.045690461507299,12.28428875561483,20.029894508411974,12.440641002787816,2.178013628265221,20.036092907211685,8.29823959800207,15.154277869368975,8.325169376145253,0.6019794954124522,14.812862209771401,17.121845680955058,10.387348012566552,2.6459984065362723,19.550222943751173,16.192840289951782,19.360662884002007,17.31932277155282,17.15355385128054,9.149368729683157,8.7529419414856,17.158873130821913,13.27477021018056,17.24437807216965,11.043355940524538,9.223776308106768,16.896981067892128,16.931342383714583,2.0797817337046753,3.9856490681085894,10.123122888805357,14.883847348181602,3.156970624214373,10.659171311303018,6.509683559311486,0.3124897882536668,8.623046496678198,4.3083703489886265,8.00501185045445,8.618658458684932,3.8493280062872883,6.292057348169337,14.506095459585879,10.209768869062932,2.52100929413745,15.77147744335803,4.888385029343203,11.956728228428217,4.185728285949203,11.779992630739278,2.0857707093978286,14.34612677014794,11.052521869166123,3.3279377875857037,2.917174944440258,14.901420767199127,9.364169037297906,19.983551185266066,14.206219827347628,9.355040010897014,11.205141243580625,4.796507357813704,16.07244897109325,3.995934357620493,11.088797803150126,13.218515235923023,12.399763814340698,11.87459325414527,8.193435860734255,16.941903394815956,15.270379774896472,2.54660770863007,11.205037969742884,17.71268499283164,17.383948216622944,19.344895575502843,15.461316064571456,17.983935201966236,12.571116898201968,2.1637024223558057,1.3052085483100053,1.1091618555233174,0.20244709802617575,9.093729424429045,4.5891247053100015,18.332371485567677,16.73571292152416,8.882565594505495,13.092960487098388,9.22343083012915,13.80050733657116,14.005291407139536,10.845565433100877,14.339072901163595,8.033794816654844,13.11591580412166,12.361057144525365,18.671195157825327,11.435779536028589,13.231546664600451,12.116728493799108,3.086106947909746,7.606229408357331,6.523928436938411,9.78279336310878,5.375748543779934,7.189041501288585,12.702056232019443,12.062277719718255,11.593915144772847,15.410828935587245,19.034214217982434,6.8494804830127,1.6800051654302894,11.30048929691936,7.098367548944925,19.89758460239526,14.102367565639371,4.939032406461952,8.473867245214286,17.382633117269176,6.088053863180919,13.32096840824478,19.141469093759603,14.922461214379318,12.216360429842572,1.6525066362690621,1.5195189721478035,14.943088201871975,13.437127112667694,8.600689087807284,16.915712446775068,13.75227482273299,12.27720345019429,15.195986725944818,18.211144336572335,6.7581390793919285,3.6672649062916776,3.2506061900648984,0.5972189479312378,7.338154562850001,14.678946049655494,12.293424382449635,18.44524282540593,7.572365471261653,10.621735741889971,18.315277641419236,3.2419784727302585,16.908017915019897,1.5381389213119983,18.836525143066844,10.874973743680666,2.110445213934144,6.818866086516447,13.420348147367697,8.171079437952637,19.17779415998257,5.846871972326727,8.975805244693468,0.6445728924664147,11.725752051860217,11.060175607009453,12.761016346602297,15.635337903203645,19.32080874790634,13.358931969886111,13.26747369910894,10.06368135878456,8.675703115693727,5.060780869176382,9.878665533187682,20.140412674343033,5.355460187747217,7.735544762639996,8.165211525357426,12.734126227108353,2.9137629142024197,11.302083009608957,10.181543593875766,8.737896336684503,19.35251563034852,19.681454169816746,9.480596851985943,3.7379702879321153,11.04130084083403,4.046623752550917,13.698278296661114,1.4575855299769653,19.86653738693562,11.528703260807275,0.9417900117343156,8.065907267336543,3.900842734044663,18.536422636577896,10.328568686720336,3.360563232435936,15.032110596795622,16.404748197252122,17.45935302776654,18.278304140428155,11.245943741854031,2.023844175838883,5.509660185119651,9.590431368716,18.27652629155547,4.183753001099587,16.968634553266057,6.12673869531379,4.299186007159222,17.142903359475927,11.38760916139181,12.665396415681233,16.705145350753057,11.173591041489429,9.20078644240247,18.10087088133567,14.047468598407374,19.169524120972476,2.961217743337707,11.437794574550983,9.969626967414143,3.7572147548013963,10.348518074217342,8.200380163532367,13.514391116628993,2.869735615242321,16.029855760107115,7.954977312029783,6.673646159549869,16.761986934466552,7.579155954803816,19.288244203996825,11.5512194181887,10.48785300403136,16.774429784646408,17.769096158446672,10.703229769526516,2.451298584195303,2.2547075729788606,18.054986535935647,0.13492324230820651,18.482488602523567,6.148034801387376,19.39264365870609,2.2633975010146514,9.786142749492226,9.646051686675579,0.2748879679503142,11.76733187584295,13.066958458036993,16.97828809184845,16.25739874717795,10.920281933161053,16.73291292652672,13.972714803019926,6.54841186742915,3.642673655263995,19.233492657736644,13.069821053546185,19.32054377351732,15.175980611829718,11.509487466081204,8.524470476410473,9.608829654872967,12.655115260415263,19.486751747203467,16.946855565266848,16.550054900017038,18.19945015279736,12.56621966082662,11.180826733327155,13.406000054023693,8.147666042049737,12.03675190207715,18.89481951506917,3.43461693249221,20.260963902943928,14.685436356878828,8.973974764632295,17.786699505204986,14.253667509850404,12.978657263781207,20.129330864692328,4.5377450820271985,9.18063927734036,11.58442800842093,8.928640580933399,14.351444672864615,13.999404054432546,17.753549966380596,9.80429237825449,8.349688930767336,3.284587700058524,1.4760489317303958,1.8166337201028733,11.996640994555934,17.98435251513563,11.57420705545824,9.938157467744631,2.61000939191959,18.776845054640322,19.66315770409063,18.358266581585482,7.423944216746191,6.824007426670561,19.250976133266782,14.359727854316935,3.312458821482367,11.096119887409612,12.337609440943291,3.8162060029891447,15.481194116261474,5.224166843050421,3.3394380421759084,9.697292872442377,0.3993193949011661,6.594730087527919,11.254433983966617,7.2667436996724835,19.290490563789245,19.093588937331475,10.878278144532478,6.994869271706774,9.952435261910605,16.866168333284378,15.562987736570498,6.44575093324532,9.132308346649745,7.866795662450743,10.853419363239968,8.13557200366922,10.858279689764219,9.792780962653115,6.737935791466346,17.460379020552967,10.633018188069295,6.686326024873652,6.900997005726188,9.020884072542986,2.2080041886651136,10.448114960267766,9.525727540519425,18.071030875306665,17.38095459595685,12.957145085187818,16.229944878334592,12.481286522937125,18.976763237675883,10.899653510030765,8.668433634782991,16.473142113804993,9.967977444411057,0.6695387168274439,11.16089047093238,14.778414630364644,0.9999622203194661,13.055943453682335,16.780717398408797,9.717447690620956,11.327854850184238,11.098385996334255,0.4009443998678543,0.4939954914051271,3.075254080345004,11.228996922199899,11.132439762813176,1.4591875021719274,17.173562911174255,2.9426273988346847,8.754834004891995,9.721258594556675,8.122884183523254,0.6098791225644813,10.123319567007261,4.987308466120418,10.134648298823405,7.2999226083328255,15.482913781692972,18.52807674160427,0.9666877961101257,4.702516623264647,10.898436494732314,2.1724886327765125,8.93987576905581,6.5053494033109525,9.907003224518471,0.4556035966066874,12.469077758233208,4.733701183042756,13.24878485670474,7.699180025387641,6.769610032195858,13.486639101836634,2.151406206944236,0.9763965064146458,12.675269206299976,12.412442149247944,7.194609128315076,8.821169026257449,15.9153537665968,18.587150879466744,5.564519535980022,10.116805467603198,18.041941416968804,6.562044639549432,18.93732921610012,9.548642839144463,14.742157588831464,7.286912553005122,5.822290141497456,7.167711418742383,7.840868340404185,9.907571547200906,15.376583516767315,5.791765120611342,9.096717827892803,12.302073747418168,5.3910894638341516,0.6302435781383148,12.363480127976569,16.750310114120268,6.802270510968312,19.65352542932693,16.811398214562654,13.598984666928402,15.422913281457213,2.2616058157405963,17.936849540754555,17.255787885061544,3.025830935343375,7.447748818784462,8.716721761816233,2.084011938477797,2.405418725428694,15.61001357790717,10.706439606055527,7.665540192273547,4.608179706084074,12.946368892444676,8.112896848967495,8.295120264888508,8.408642290846199,13.20087657596544,10.465268902908317,18.83724892212608,12.667280813572603,12.746963768321843,18.33348706852338,19.827764425875056,10.833535459257504,17.635267434078013,12.777753827657168,9.238112535179399,16.231118454150725,18.523640368362056,16.82383876182917,5.408679760093645,9.540468235342157,15.123427989060017,8.674988167978244,11.764706620541322,18.421126539544414,12.156566643134447,2.397036990885885,16.82648705648639,7.795708679155164,0.7581045158132843,4.664625384605883,4.659130416540376,2.1430852554879394,3.5964703694761306,8.1089048599686,11.59650605478596,15.999842704390815,7.631187632440381,7.606355781431397,18.382692792237346,5.969471973437339,8.43471647666907,17.919887441292246,10.106188230235723,15.427637530883468,7.2188190097450935,2.4678254676337614,17.94169102434655,5.768725952621231,14.812281171625305,14.584055742647339,9.758888230176195,12.134842387838507,0.5838837986585168,14.793004926258794,10.362706106945138,14.45473824544688,11.074521878116451,1.9024570396174867,16.55301849967369,7.873303039663738,16.969472466428194,2.1096278865464098,16.429746365228514,6.1770133333459345,12.040395505026304,9.110448160690611,8.654968553564657,10.48818639486357,9.381008600095376,20.12722354153267,3.7453744981426045,19.309047834790473,12.218993444799933,1.266392021378493,16.631510468133584,6.361674024199199,13.871407857725071,18.78526865501306,1.2456434033639097,5.234213812839948,15.03316010594831,19.999099123730993,9.713497574225306,9.982719617988606,13.295308801225648],"x":[21.099223986150207,15.841036737600328,22.99146727479884,1.1910817703532752,16.847888069725528,17.915297037734902,12.843888974713009,16.903795346169694,11.124158551814311,19.92930905420166,12.145438655884728,9.211679665399542,21.309856448511233,21.225491729237053,10.023138851546058,24.80635197038419,26.27552585402153,7.381773285142281,27.975812819004517,18.012586970899644,8.371669236454277,26.3667563417471,19.82595120624211,18.208314350453804,7.048158553472625,12.700166651268944,3.538967369130164,14.835155106568005,9.868326697214641,2.915836725822696,9.20050455501115,8.916051083647634,17.421906645320124,7.61328471767326,22.284663269422207,14.827692927058944,19.274899517885252,11.827249408731687,18.271468900532923,12.724110326786832,7.985507436212068,22.147030745140235,17.003425969606134,12.1094072097356,7.011386615209129,10.421177932507216,4.786038678949384,19.709360554945718,2.819299587980271,16.21333997640118,23.83128011535809,21.212318082731866,13.698834052135016,18.451585695667184,24.26024938827743,13.670212446576226,13.993986915170007,3.4989914423736534,12.756741423552961,14.583394521412881,13.363340848323,14.421332611883983,11.724736871637248,24.05400479065253,6.234061569461338,12.971056765881054,17.592303732240108,7.018908435037228,20.316405550935045,22.10869940371179,19.818655999807138,19.84857588018706,17.974113669480722,11.903229893999123,16.215858650952736,18.729935900553496,10.102026299200018,10.585664177682848,21.190051693936617,8.432593275682603,15.708761562493372,14.405145259471583,17.234938797406446,5.54548349848413,5.909672566269092,3.9453548857648615,22.354611382268097,9.74085897507377,9.694672585713288,1.0299228117963954,3.147603927884286,26.696895184494018,9.51533995013327,18.553334269674952,16.790983978767756,14.609960860471578,19.13854405468816,24.679294456773953,18.908369376238504,15.863099626490293,7.34732736347895,22.50178774993216,25.114888826391756,13.635802358720301,16.544789042685295,7.193077754800245,11.646921138463515,13.121943419284857,22.53577567127615,21.616091674732804,9.961756766350605,12.007443648528534,24.418642738911565,30.16331625160477,19.65143533029388,18.230689358269217,14.141744209787687,14.237514689895658,14.104110378265169,20.566317391251147,26.863178892882296,19.02399101555254,12.966020235527894,22.139128453416976,17.25658402225581,24.919347889804712,29.54465439340304,7.735903185839222,13.90798321003785,18.809375454101463,16.35455489866703,23.50582380805048,11.110629518803707,18.83751631455379,19.350051643042487,24.121400994685295,26.58010380100676,14.628151516274222,9.145768621387885,13.957258483874387,16.456620611645956,23.90818902370139,0.3068108229095911,10.349439754546516,27.426695963915385,17.440239736892995,8.874755194415902,6.158349610651861,5.232563781247191,3.408624613413142,29.231416417894092,14.567552941753089,10.882018995508334,17.883670910319864,14.080505928467463,4.951262536778894,24.25564831695403,17.341084341048067,9.846905249849312,4.43609379974121,27.352913462241304,12.744524210797092,4.578186580149125,18.95314349547725,17.34959470770132,16.502981074928073,19.3669385938599,7.261458384605653,18.93535567144522,3.121846948468054,9.183671621415048,16.817734735983528,13.007612038909588,7.687317646008651,5.187127904652058,13.069923255289442,21.90396509281102,19.236810865695254,26.13297701447749,11.858643411061763,22.466101759158818,17.42411453031101,27.01760852345611,10.863838933154522,13.224487040726213,17.00650681214278,8.631423227563097,3.3197000185873495,9.372277478718454,8.591834132661964,7.585376277170714,9.000951462662226,21.427630574913856,18.512750647134474,16.07802072404358,9.157207197080744,28.29330470735323,15.281996862786212,4.956224479005797,21.756621256427152,21.181884288093336,14.357855217048483,15.405931633555145,16.82507429687113,19.083656544037787,10.1183825344229,12.30065175063172,26.51178989161722,17.574792821657617,27.83147748295501,4.614433276326193,11.894115199313001,12.056639422805407,18.58023129192249,23.77427795587688,5.628325300171885,16.69617401106041,18.20366816391094,0.6371616413202845,17.303161006839854,20.78718324488044,12.62393395016435,11.396716811259484,8.76665303208275,7.089228170392849,12.98170953820977,24.38834316964268,2.938684615617328,20.840201553632923,24.298686362111113,21.61523334542055,12.862461269574132,11.048836441103541,22.849649756560503,27.76388702435935,14.679179407291853,14.399872095110116,8.551474485779034,3.8004273446828094,18.370329755276966,5.069551258537334,22.917163613085037,10.897285001864152,17.35118727093768,22.874870966309686,16.522975088460413,7.692264832677316,27.786277621967898,20.995642107840364,9.384718813513967,21.84022475721396,8.687199383167346,19.926885684920954,18.899818593721676,13.990026539497194,13.24120226182097,15.71316190322772,10.15672916320159,22.703636722714652,28.533542211331522,7.527732020142333,9.92357056854823,18.730801839787254,23.845222678866673,7.717958011616231,22.183467726430337,9.668025610977729,10.222949132869466,15.956770236563322,13.433081912683159,8.062179612945663,25.84619544279051,21.599628213035658,8.61796419939945,28.06643706487838,17.17517802722456,18.351951929342263,14.237125465321279,20.027908168709057,17.400504611170014,14.849373244678349,25.183258056924387,21.684584902653988,6.2945808798534575,22.79696066135958,21.63591903978682,12.826260235670926,20.09852982437361,21.19415086935436,12.695460022120098,17.41989181056575,16.080636910196315,19.488146589104403,10.504052853993173,6.051682264085323,22.01708159927444,24.426963289412967,4.208043913875478,18.363890422307293,21.012510024698265,13.957323204761423,8.607715449895524,13.638326983158455,11.634445024951278,17.502623567624134,16.483812956803046,10.46283696463279,7.913429182018853,24.18865260497078,16.56792885887462,22.489680581200737,17.017139032511764,11.489954132105401,25.95430405578577,23.708446137256647,16.25631550099769,24.842141328101654,25.351992014006367,14.989034156084236,13.064302447517303,6.988964774366346,13.951671752041577,14.710344641319558,6.787813871785885,26.451351480205087,23.913416485934913,13.175622452391334,5.655928275364488,16.537759318573464,22.823998515514234,13.792060820653441,18.385610816159726,9.09777769220512,25.44010507304667,14.81544607025189,16.135749936757318,26.302855795544872,19.844093882254697,6.453653490581689,18.619780179254555,18.80751592564799,24.287666495390333,18.640047490627147,7.591226093607657,6.399812369832283,17.945027012498777,11.258346515861941,15.396380121023746,14.930982688994305,19.1929941489939,14.338336123286783,25.610607915512382,19.581025335015873,4.903721344455749,2.523423114307015,10.40900270604001,20.47727634430027,13.554971918845746,19.99954784355705,19.655781809921244,12.075305189177303,3.3944332510582034,10.640736671884103,20.285431432948805,14.570359471645958,18.4675034330559,12.649539167866411,20.517633126219472,20.575143724009838,14.38293955004989,20.013061729104237,18.53998418013071,0.49109714513231867,9.114105916614385,20.34540659082127,13.024974846715565,9.216909982337544,3.572784636197324,12.43920680566789,8.75519799416097,21.397471977612113,5.3384122310698565,15.297845851016842,15.626143933798744,9.46619610863464,13.571776105299602,14.450885745185941,16.21522714501568,22.201162350995396,10.697187708852407,9.190329550600545,13.24687684375811,26.495303609688815,20.11845074458587,21.021092780166313,12.934065865566328,15.8104411165741,17.28411987420535,28.797444470471817,18.56991592469315,16.938248909319036,7.475339970019943,13.811937496177165,8.42184948393496,1.0367787617896218,2.3528990880577205,15.327449677008842,8.101127634325213,17.358114678833914,19.77465833667011,22.69752508010554,12.23427200643022,11.871435287604571,19.36253830496676,6.3942467355943755,16.658609916324018,4.664487977561152,8.398628866858871,2.746374050452235,20.6074230479663,18.956622560792493,12.915564472299172,26.199452928662236,9.955252328536448,21.040774199231347,26.133044442012167,23.746635811950902,18.6222245016385,23.971497453984437,25.343766873978048,8.139646114828938,12.08526878291331,23.513334722652647,13.166251994513928,16.60807888460426,6.7936945972379785,24.427995652708148,20.023797292552953,19.49230472788278,14.174648342117408,19.243067303804267,8.248653677145732,27.586348882909377,22.41402040186039,15.404166224164126,22.216127784726254,15.63740329074642,20.424993287612516,22.554719820163506,18.326338196982622,11.657167861184002,27.46115754884731,9.64517276635355,15.201455561171066,14.634479977393116,20.487897764844536,17.839790001650943,9.844737813445741,13.349516779152204,17.778497628425903,18.80056818330901,22.470493168512267,3.0581664025647473,19.712303735724447,15.673496017667723,20.789819226253513,22.10718355619108,15.988477104586144,17.640685050504366,16.145637584397186,13.836658612712675,9.923023400351376,20.608878454198624,9.691182543895462,14.815110623116649,8.351349722786189,13.357950240697546,13.13288630195703,18.558081893988124,28.14403029465341,18.17490100492608,9.995678749643023,23.21573755700668,12.378127658467614,22.28489284251908,15.0046919183931,5.917244891755146,16.93081252871888,19.318968381838065,18.498453756675588,11.908514688698009,29.096923175346294,20.3503772455991,22.946252480815552,19.901546077445072,25.88124135405988,15.60932113061822,10.476065465605531,19.149879771536014,21.440019522700055,17.512595467141313,19.349966791925976,13.205647073989336,21.057260453359653,18.045564474239036,6.089726252955437,11.87193912000307,16.42040309342719,16.985118291560756,10.814267487148236,10.724941755354454,10.683172469815917,0.4602751591672021,9.295566185844717,12.124445820329068,13.51643485315725,11.234541714601036,10.00263165853097,6.521836708704783,15.05373564762417,11.305565753775488,10.166031323198176,24.978452143229568,9.569719472544225,21.26562546313957,8.62752489782131,20.032008041265378,3.083120146964303,23.192399754766814,14.518546201306233,7.177430910215892,10.873330979875837,21.46913333767613,13.799557596639794,27.135399277061474,19.612657821032123,12.351427096479256,16.54386217250717,8.340815006979161,25.290892830927007,12.687342128407414,13.405574819139975,16.84885047054074,22.139435676138696,13.005353478572303,10.956584187036988,26.273598047949672,18.84855388875955,5.677223001541034,15.954326982612196,25.60036509714248,18.005964043784218,22.159830499643547,16.16696320754893,25.35271711281425,22.30477652987558,3.6820059799808416,6.655048973704089,1.981540228795033,2.5411383315311973,15.368056208479747,12.505516632070808,27.15054531911572,22.541483267697643,14.988915064632558,20.470369684220955,9.401161731358084,23.07225676915465,15.72127070592648,20.138586157381255,22.256787924701978,8.309151455860647,14.47279795019063,17.408149164636676,26.59465493678637,14.575138386169957,13.559604142641863,18.317445696693937,7.74372763654288,9.97327620393111,14.651377542813172,14.316563159961785,10.083449576964966,14.758759751004279,14.945303973784032,20.4150437184444,16.752888980464526,24.703393458181154,28.81048514115037,12.55904339734607,7.528236134119902,12.507928465414711,12.505310026605258,29.73225513846999,17.298232733567055,10.1571618043779,8.803490574761508,19.834750828693167,13.966389899613525,17.439824053161917,23.104185114472337,22.307127950101766,21.041980785143103,7.19845809427222,5.6510543670374656,15.265597423039404,13.459683244211924,11.72840784285539,21.55219746512143,20.317974389209233,14.590042619419096,15.280287760140288,20.207626407423692,8.690856544934071,9.35851866153488,12.90365426556994,3.580798352698781,10.667739678158327,21.370939696259065,17.149698938328143,22.847083996354904,12.008475184736334,17.440388708965273,28.209821376716732,12.300277606951017,21.635469962342565,4.641492297550062,27.65972289907627,18.045016754145294,5.241028544208378,13.753063376914753,22.697057201590617,11.151003216938378,22.402589080418068,6.040934006944607,18.39362968630347,0.9204835682752788,12.644595752550009,13.704115630053488,15.359193622794693,24.273024032749326,24.362544775371493,14.81490051278487,20.833739141083647,19.275111517013986,8.77433531504139,9.24934519314716,19.451365340403164,28.812879376675653,8.492099609042148,12.798311727102023,14.625015468144447,18.55462959741581,10.320219665073008,18.41383725246524,13.406169977971475,14.524207843007172,24.458859412450558,21.174920360847803,16.795505402389807,13.600482456380496,20.32252917562845,9.964757949528096,14.475655713911038,4.720765731405485,29.224582633372343,17.641606552420452,8.78341062263555,8.637934194745185,11.7603731516847,25.946235153923322,17.694051250264298,4.690248549600658,15.5419813784895,24.69028057590567,19.040610210931206,27.82880066974912,13.287076125410529,8.851971353296733,7.7422022903205,16.23219929417274,28.18887277728144,10.553624596553284,26.09745659845322,13.367882571857997,14.058055557163527,22.67712103098449,19.84754068938607,19.249308712380596,21.56504517576161,14.968548397963463,17.26722548780147,26.62330813081539,15.941980821384654,27.16404840141628,9.980943346120826,12.396035110043961,16.778711114371507,9.855636608489785,19.771965577963535,13.505043512776382,16.94206581906699,3.6507755203513113,23.062179094379843,9.494061823719075,11.781577023012844,25.989215426467858,15.384689747448867,26.148738188965,21.242300481266568,11.94785101539198,18.524751811257197,20.802725651224268,17.763791954597203,5.45240664899676,8.844128488411808,26.08942317102585,1.7484782283776736,20.62962505500553,14.072835773538571,25.42954730190404,4.703930949258119,16.926583590799865,13.092787771897994,0.660368471474766,15.156940292202407,21.735950919123916,17.948013591333122,20.612781553450077,12.516034826427845,16.89196839870799,23.68586692952628,9.508610036188845,5.114003982788105,20.587214896318525,18.427968366830562,26.981754097478444,21.5603950208469,15.162875440692638,9.23327584337729,18.937615553568946,15.59000158514565,19.7938754158538,26.106945441043933,24.73287206263657,22.0179338471187,16.118579696509684,16.08054578863129,13.599921139850698,16.565598330290147,12.669227979674538,27.600609549393212,12.493810907814357,26.320461622764967,23.85973912059304,16.6791430861172,24.99169210928519,16.175217733800817,18.11335568531428,24.424422108085324,10.397694501837726,17.239481003824302,20.49860781245632,14.174866676268998,21.10579568398014,21.52039855976196,24.872269174331663,14.888494699803251,14.516891062304275,10.219854582135877,4.880172748097719,4.7708457333593355,15.848933323786921,20.50421847773291,17.4864791459288,10.154022682712064,7.155295310631414,19.10525647212546,23.508503582363296,22.368678948293216,8.205998075909951,8.572226930327856,28.47865612386485,17.107167670609364,9.636801206363018,13.395587973967466,13.309741245031006,7.4895673940598435,24.386337305357344,8.031701988131083,4.284689987801163,18.1116705049251,3.9413684477572684,11.26031411604377,17.712151069660308,16.01412204811323,21.555717210085838,25.048658184389964,13.366738186809034,10.419147179342726,19.325974130630772,20.734726143960707,18.402829281219383,12.612623671495122,11.333753181781335,13.363888360874276,18.150927835415544,11.42135343734127,19.687581544414158,18.380917817597144,14.881900362364679,23.660582318177635,19.45342323377085,8.223863071750745,13.518879226805073,17.00086857631006,4.423744369573615,14.601180736464363,13.297582049500019,23.965501956926715,22.44828857746467,17.369465253656962,21.991409998541496,17.788954845100122,27.990724697993222,12.194822144930093,8.927335999366198,25.998346732850806,18.55314870038142,6.465035760151885,17.022633715544295,23.828998556601583,8.113277942290335,13.459203291620522,23.79223016056305,18.767331025076956,14.255268423234464,11.340422294621092,2.5076473301222606,7.045404579689546,12.23232976725608,21.004340234987154,19.221068362512096,1.7706903339410267,25.706021964805725,11.699517269757024,16.77763441260282,11.46339979118872,11.181444523921964,3.855772473036069,10.157457172969762,14.094970509981621,13.266412998206725,12.48863832707443,21.583231195851344,18.991443382023153,6.806183499408904,11.233399164451379,20.129962207677167,5.43019622333224,12.214982322609721,9.027680039178694,15.040403217847595,4.4008973801240785,12.558666389624614,14.289475793419841,13.48217798584518,9.730018081631298,7.411337903948867,22.220687336995695,7.174806983125899,10.033646671741785,20.218342724102868,18.3101611656805,14.499126359959323,11.144739715742864,21.342950685309784,23.576519042931572,12.886685227873222,13.744530724820748,20.052455228005684,8.299130994616224,24.460315442141248,14.696835987855097,20.317160923580825,10.004394216446325,8.602150012935326,12.705029443947172,11.177806613121145,11.677874354070603,20.1862341493641,9.944182255549146,15.392441413284992,14.376903238222207,6.179280129261696,8.210029589858465,22.131599330420144,26.483556103515852,12.805919181278192,23.62336414538413,24.39692212542809,14.59367183591494,24.69180110145446,4.612842099570177,23.475297423071993,23.13932630983998,6.30112094675889,8.78890529911959,13.640704335137817,4.010567562571829,10.877524594698952,18.678504065462214,14.416046999998692,14.694373131188536,7.409011918840596,20.562834286130737,14.385909700303895,13.310871523735546,12.216259055417765,19.78804477530477,15.368923353693692,26.89642353832022,13.54130052282985,17.270081937061246,18.53961859685868,25.907339448658462,13.84215797552395,23.21684007260274,15.60723331687922,17.92021669864873,19.297240707172506,27.516036302283567,21.85357340785827,5.553026819432372,18.409812707000206,24.68548845868589,16.348041910976114,19.270752495743658,20.39659043852422,12.898516584100351,9.6867576127892,18.30919545352734,9.595023122179894,0.9195340359417399,11.119618530873078,10.493539504970293,8.67683932282517,12.799303601471525,17.60261843098937,20.454904475740648,25.21446859203133,11.368456215110877,8.243722482265875,18.58902998081402,14.351999255309154,9.07492203168081,24.543671924113564,14.547995615910278,17.03441802743818,15.980404057305186,6.811794572749657,22.84982433056031,7.558720074480077,18.742263969256005,21.605329538127194,16.775449773726734,17.490227905346792,2.8806645146891143,23.631492364920323,19.487856095675685,22.378323553305265,11.769677303220758,2.9546097796797888,17.882316510367694,9.08822625334867,19.613647229206983,11.121340555941432,17.50205672704937,14.092115692133062,21.729153495499283,11.620040131248425,9.04938876670309,14.71512526971058,13.554178557105862,28.27441856755904,10.82957767751828,22.89378852705719,17.37356172156774,4.544575145794694,19.339939418578833,14.404943428487075,21.667894685976265,26.842924156243903,4.218878830346582,7.0339569788133485,19.760855290864637,23.205428498278824,17.75166422168487,10.186263232171232,22.95981550394686],"b":[30.282134473082053,23.20486679051136,30.99171364291093,1.2835218278704819,22.74040678805521,20.343090031331865,21.893482178284856,22.952542434031223,15.255102363413146,28.725982089215663,15.068422569659804,15.652901659569235,28.940485642431906,28.088143466268185,14.721919739601766,34.072950604394336,33.177460665172745,11.107328598890437,36.527143242236356,18.269373393708683,12.372581687761727,34.47148078283943,23.60676634073257,20.796050123654762,10.77032870677241,15.727655039567386,3.840355279291887,19.614742291646426,18.861975221965125,3.958405256329862,14.768944273927206,16.533597260970975,18.105841275225465,10.168860348714794,29.84725374981915,20.17336602391682,26.745927649708456,14.137836825290378,25.591632415363737,16.982151274963236,9.16906574434655,28.005605847817744,17.73932585702144,16.5084190601202,10.980209587053945,16.992077896190228,8.470101841798758,22.54556303502271,4.0213964132721935,22.69345680876734,28.59609515549146,24.464918100828577,14.539697466609747,25.96494755746458,32.268945582737395,20.468249981141593,20.417198567249834,4.3651916405918945,20.93462828662423,18.531176301203523,19.3224398092839,19.299835877257177,17.631826160983376,31.54776784907906,11.157375026173245,14.62871216586771,17.630041410554945,8.322753105289081,25.90998484477744,28.939529011668355,23.04040955145256,23.259847853954696,26.622185084162872,20.88202186205819,25.48928811297592,26.681283342117712,11.158614917943275,19.666984884927253,25.107603349349997,10.807391912640734,17.1244152319801,19.334287452112306,22.367574413195097,8.097441193778732,7.615769111298762,5.72480216911412,31.23416463513801,18.443109776109964,12.392498657035151,1.0451122156418968,4.3489835099179475,36.13168982831178,13.840309126366801,23.115983560072145,18.412640641279246,15.58213481912096,27.459708536708863,31.249842901326275,27.762691208458218,20.990966993023765,9.642729431690498,26.166866993989856,33.74373493772655,23.100905126614506,22.472649544929688,7.91410321471393,14.198494890208934,13.424508327077223,28.023358217102974,28.675253529630147,10.595694077588181,19.093704418167672,29.66846319290117,39.496833831949125,22.0428625267547,25.979973096548182,18.830610012175292,23.423019007855984,19.841738809638876,26.11999722695157,34.24986385653917,23.020662572026822,15.019591076637798,26.318742156123285,19.30853977850783,30.671778150681146,38.871131631064685,8.895596928398174,14.006237509714996,20.072182387342863,24.65612657200551,28.0259394712309,16.082633597693658,27.999900307963536,28.564423391800247,32.514350881259226,32.748656603970005,15.18333009663209,16.399166694293065,14.046116128741367,17.01127956020661,32.78994534159034,0.5315296557666516,18.859154685384546,35.13252840529243,21.96759031532835,16.122489916687872,6.242951209724539,6.324552331595545,5.283692725363136,38.33761589005731,23.443690286381326,16.995059633266894,18.327311706568334,18.219966112156936,8.581981169603349,33.24907615314581,25.960024293451298,12.675550037365637,5.394072564304406,34.54112919205641,20.766183312582733,4.914203462850382,23.806736675589324,25.61745064156633,25.25677330227625,28.822304764361878,11.38416547653717,20.16674643207583,4.754894308366899,12.269823990815492,24.390805173313105,20.459800666624215,11.660202928912152,8.263521966690268,15.512798892361777,24.881647540702645,24.069515373625105,33.48660282657161,14.450379766638314,31.065131660553742,18.652234313166808,36.01602672038433,18.34940855581879,16.12741455009058,25.935139597605705,14.071011975549878,6.343994185664883,10.780860418147334,11.776756623785264,11.740625512791535,14.118513286787966,29.999999124367047,27.934494806564707,22.27793723399489,9.32403721801578,36.572963434843246,23.27337446841976,7.718519407040567,28.963462378575517,30.534373039177606,18.78799865110929,17.65547125685749,19.001203628986495,20.971582553840634,10.446552961294975,12.497016741027952,32.59373550695168,23.560691150145303,37.19716910643006,7.615393824080843,12.990241563116731,18.41441591468435,20.628116199057008,28.702101103148856,8.74527359155556,22.195652499162897,18.783226104183736,0.687052931894967,18.292199852758557,23.96589752593327,20.63364124086116,18.480451837243884,16.262774366918997,7.634576366083206,20.748465216058392,28.607997714295287,5.10180555644749,24.734923572410743,30.924266137026216,28.791866011979263,21.443902993134408,14.070849910293513,31.13564490543398,36.334001563667336,23.290385060360677,21.806039724965718,15.871937137396253,5.610520699752719,23.043197852636176,7.314848745357834,26.698341532978628,17.397775984876432,23.05010340582312,26.651715539103996,20.017262038228985,12.960919409422957,36.383755819281895,27.60248482536101,13.187307004236807,28.29932444016427,13.908274682803338,20.71950629472045,26.47676271917012,23.313048505522687,14.653899581148554,24.94389486265661,17.297811347413155,29.64869988277008,36.89493686841928,9.487278736014272,16.47725807357062,20.63402594770497,31.770314821187604,12.386776606175864,29.489978424863907,15.471839261274578,14.649416833696986,20.9065518215618,13.77724529321073,8.977076180053643,34.291101822918414,30.857256866537853,13.706471374217166,35.67649222113582,21.19971823387319,22.99971955777006,14.887017790970923,24.058747147622633,22.664206947811685,15.400694737386175,30.996731886201463,26.473927474959215,9.352940118570178,27.22643965393818,28.096108876513505,17.4957356633589,26.4796899174118,24.166562897703777,13.95809832426163,18.813347445406034,19.51626127935011,27.36524942069351,11.062427601120786,8.748928755421698,24.971609503199808,29.882691407889638,7.319628413509944,18.490150883250152,23.675726607092077,22.82395945222835,15.141528492489686,17.822221251112104,20.536811856601545,23.5415926623558,22.998432293745545,14.345127786240415,10.750335357946433,31.379240046097006,22.531566293593336,29.47074077173579,19.24740262916346,15.381618286809541,33.088871189034066,27.43087573091626,21.511531933421608,32.05034561343332,31.734196458583064,15.385351669340988,21.954373436196345,13.237233099368307,17.706727753549508,19.28383048233463,12.246690168791371,33.8334556002491,29.014353670531815,17.193147810034205,6.832701434025301,21.692292255639416,27.786473886124814,22.50946615997117,24.990527211372452,16.199369574363978,32.03223433192369,17.63084526347813,17.12991459649342,34.39448957317295,27.186913649160754,9.77886076570015,21.830379210231882,28.287729017206587,33.60481700037195,26.956940053685106,10.086628570556385,8.31987106971695,22.04770877117887,13.916315573395355,16.48894288094684,17.19488365688605,26.01582278903269,15.558411191005511,32.19005504824036,23.482089607403005,8.664253748469658,4.407133433451462,10.591689359242235,26.918984106155136,21.229586865022338,22.905779086090895,20.731580262570102,16.020348239290488,4.676784416858588,18.89421081391911,26.398242163576956,17.15877917308576,24.106551322077564,22.10047199014261,21.939137621766818,24.778289626192745,20.208013873465216,28.782902996057324,19.692448062559922,0.7419905581006603,10.4293149456202,21.999362589495433,14.794853528527327,13.190161162854404,6.834826060103771,18.057600954158012,10.510007078003492,27.14752066922544,7.399756199072565,16.035849382897492,21.70515532727153,11.168186870705092,22.254545952242985,16.307638522635298,16.435343865389505,30.152228495304758,19.592806148761508,13.017008987987303,16.528546721104114,33.51647444662169,23.757159621715047,27.57876878807447,21.891019602877094,25.070943523318466,23.487692556102424,37.26699873780279,19.610176349625487,22.077628710443065,11.34890062909284,22.54639858496221,8.897170829248964,1.404769286430838,3.793623297930089,20.792389548380207,14.924482825984784,23.16358011787235,22.087770029453175,29.88153145561227,14.700948502208586,13.41949546623447,22.100662431614765,10.88109576943796,16.683626079009727,7.80163789728801,10.67480438339234,2.9535618470480296,29.839969672853563,19.635336264137926,15.202738984901028,33.002842691235074,17.977864123995097,29.32559263028715,33.18015159084244,33.065830445776456,24.882110346410606,32.164390520230086,33.12445734363281,9.083253140430996,21.13166073274735,28.191406361290987,19.982322836943602,25.95907693388365,7.970835253411437,30.768988303996625,24.282766790864486,23.21664287908873,16.9592011226038,23.91571570947856,15.734807690098638,36.54065058337494,28.78098908837542,18.481368122831743,25.168199946411114,18.309408262194683,24.883401613125375,31.30074378392831,23.63926340291802,11.796144786650334,34.38606284692134,11.946115955327397,16.1030463882381,20.82212200683793,28.44050276639359,20.185314060242195,11.702173695007158,17.725808821705115,25.497407327418035,27.31539792501956,25.192833572101197,3.5159717116242906,28.970399127969234,24.04199195848079,28.816207607102804,31.171519358576845,21.178132695199956,27.11757540088378,22.1411848209292,18.769009348754402,18.58526722737927,22.230799952206016,17.96600211299634,21.705631975042344,13.112345235431535,20.664625615975584,18.036600892368533,24.605596460902248,35.965511380008024,23.702341921219297,17.53138205672514,26.280701114640266,16.31086530742392,29.158326022428213,21.44330233849198,11.040803192520471,18.972374168278506,21.43684687190458,26.317014085236046,20.83695732414906,38.299300021884065,24.357963206311876,26.40251966072579,22.39063564622508,34.29414502244856,21.836280704289486,12.137040633717243,21.069076244383584,29.310770609139382,17.771138993747208,27.356980892898104,17.04390264428505,25.06748993194442,19.119599619263163,9.95504303306435,19.47379224391844,22.490557612303284,19.010602135042035,18.195386580562474,10.7883400392476,14.706135041972749,0.6027303156673325,9.943829927901348,19.65861681170597,18.829075891543937,13.756077211004284,15.934002465767716,6.743328555720738,15.581623950847359,12.36184023980302,17.535318302448466,33.853356429461705,14.082210977037072,30.23877621694658,12.90911804587516,27.986395809698536,4.044497916195429,31.719611850773667,17.859560508853352,10.888083337047094,18.54253021225823,27.799966466095647,18.074973813104204,34.02929975505907,24.824100372738958,15.239742689375966,21.69003002890287,11.757289166264378,34.17685261586814,21.065274575579707,15.638792020197268,20.348249435394834,31.527824193592927,14.095330272209884,13.620073305231422,35.26872397960467,22.29767304192192,8.694925557190182,20.532322121173525,33.20355813808273,18.605545460104917,24.87323841463102,16.847159586698925,32.45572719991782,31.687369661913856,5.145548477991175,11.81193527672069,2.8224542984593493,4.795479364172119,21.416085173930213,20.13638593849817,35.650671723632456,28.137855345363217,20.875025198770125,27.581695894962582,9.572482364739923,32.00959954052706,17.375359321386927,29.096433023096093,29.888932607422333,8.574576733673581,15.780741065775317,22.273206369900734,34.23233717730241,17.601269142837417,13.875829484071428,24.29451997739686,12.233360676782521,12.25495009101618,22.485691772748865,18.68681227158821,14.62135670060421,22.055458952416096,17.107643900572896,28.466548276724886,21.72579273000762,33.6608005761575,38.23415269186063,18.062677982291362,13.165537395697514,13.67181860318097,17.71723886692974,39.212215987662766,20.378831779576938,15.187087536695199,9.121225291712731,22.19842735620292,21.560575887665433,21.410123832301807,26.923976798904242,29.425449939861714,29.549285135724972,12.544382240947062,9.633576572223678,15.576474618056366,13.481425837740012,14.743318330845803,26.021457140935173,26.646867117180516,16.819464001081542,15.361548286437337,22.132100826608482,10.553866173846703,14.844504448717224,22.208543279949435,6.456768202822825,13.877235758519761,27.821571422064608,21.830820943766867,27.09016278703663,16.28458654527497,24.0131114997285,37.74749596247706,21.031868648836944,26.192415735021427,7.632916199350559,36.1646920269022,24.956455909824648,8.258700290025747,20.437163123055452,31.639180714605185,14.023449289711298,25.51107446183135,6.227996754369034,27.471778940367635,1.1864429001052512,13.53029927226784,16.252695962676928,17.863661745770266,32.59917243145216,29.222439164005557,16.218356249680905,28.127110068092755,28.154310565398358,8.869410120532413,13.286839449809555,28.67880402892868,37.17255390796454,11.515609019229132,17.6784785243156,20.851831938147317,24.16520331930201,17.459545763689473,25.269089957073568,16.514492901690115,20.101822907991973,29.381031330592627,22.614521308193652,23.84658519391798,23.107280766361782,29.269008971116044,15.669441221002991,15.224995252388066,7.866251941638027,38.2451087644493,23.53403412961552,16.342205410207264,9.189329674301568,19.336431788215837,33.08879598568959,24.793880988503552,5.971975751567422,16.03346251462672,32.67697644703189,20.564835769267898,37.034836891929515,15.254590442555937,15.433826645568182,9.894222703596665,22.634416803320192,37.74370801691938,16.693752333195064,34.897026982654715,20.34785817970478,23.46494935468009,28.011734596773728,28.002345609190428,25.595757287173463,26.249661696781164,18.62663201467086,25.04273012339482,34.83836436156699,17.76816316641215,34.87023204107455,16.74748663217793,13.319714528409982,23.3422102062057,15.734105053646477,28.855535085681154,18.618382153305188,20.246113663241132,4.403645450760356,29.84086574618287,10.977635763577451,16.70527878082885,34.883643005903735,22.908699269669224,32.76179290646232,30.583850737305927,13.355190888835484,20.211944506211747,23.726940419476836,24.569698959030127,8.34527294829526,15.195887001116262,33.83407963578376,3.3038366961422216,22.699320164032308,21.711810834072036,31.248716330285916,7.056441026299067,23.80948824665738,16.415209506876607,1.0319457468023296,18.42429479719706,30.092276515553316,18.882763742429464,24.811077605692468,14.054233274221817,17.045287174725694,33.04869220605917,12.362041947584075,6.532267446723687,21.89211207364277,23.592861950994994,34.36664550407666,27.714541051514217,18.68449569621483,9.916516538009144,27.9299376416088,18.41903458154535,20.089921973182367,34.93665591064476,32.6205573748379,25.698695270967605,19.54281581473897,20.80354536914048,13.786848022121907,24.679918808129532,13.278892373787263,35.99240553116533,21.226264516328854,32.161409821178495,32.70314985810866,24.106407045411082,31.936820322259912,18.0274628930045,23.062859568539796,28.564601149337438,16.04629156203228,25.00766233503147,29.091277514500955,19.231875734921722,27.616535714589975,28.770131349079577,31.734235636779907,19.789323739358892,20.46165906867241,16.90498534270709,8.161519122294315,7.61850739351944,19.562283997487405,22.933199762160363,23.18551174105692,10.362102229361586,11.536645189076175,19.421822987370376,27.21515834460603,26.234446701880007,8.959845389822272,10.257392934585393,37.3735189175771,19.755514841816293,15.733041846620235,15.61212053136996,14.246810911900084,11.0304406794994,32.97029631846515,10.737977013864715,5.1958492792365885,26.22256453372467,7.355665472128989,15.757623280261335,23.93695594980157,24.44600636717779,23.739243322391264,30.788944359637735,15.765446276625525,13.719920741819482,28.361435071381365,24.463755647646344,21.140245502986144,18.557074164891716,13.455797918527004,18.66271594989058,25.185235121980586,14.588625715142243,28.198434612725883,26.659304048608995,22.732134389639324,29.637161228768928,27.95570037671689,9.70594535962329,19.898072523649034,24.69303684929735,6.5595688580449485,18.604456780948926,16.933396075280164,29.647375576941236,27.332857671901408,21.622645093058686,27.545074818649525,22.905190077387676,36.67957720469315,13.443277587022472,9.176900463270634,35.18000325483379,26.82867629346924,12.051505064923997,22.672959902182388,32.55315265696906,14.9700358077293,13.847918649362606,30.55085682070608,27.490809802094237,17.077098189683163,11.573729005143452,4.538367243558485,13.360522247959757,21.05913476154515,30.427113631687895,27.01796223582853,2.0709581099434526,33.930738540624134,20.140570056683423,24.51107433689969,13.142706716342655,14.129690952261003,6.984595321778624,10.190363528787437,22.874144076272113,16.28522350437824,17.49021125123403,27.463526833792663,19.438097654159677,12.435064552743786,17.52873062207616,29.02853201904198,8.57040720480886,15.371964734042667,11.459037102848,19.98865550362572,8.203895199839174,12.64502380393839,23.500599730698298,13.707153262709419,11.687609359714388,8.029920405288301,30.639722323531817,12.017027422877792,18.764226578175123,27.489358196258678,23.99516557637584,21.5401896191948,13.384505561060674,26.574789017449255,28.385934333292045,19.94476041563187,17.241413847026116,21.99045530085796,9.973565392524662,29.78410265000415,19.659347880331616,25.69108912520996,12.623863743496084,11.281747936506562,18.04263154214846,14.39439064260056,13.384327177150034,24.822413829005004,13.946833053492306,21.46109545593263,16.37689930005504,6.939042911608504,15.51643343661566,31.54740917069293,35.86575051222253,18.593032652754168,27.45002162900662,31.70885692099078,15.552483357317502,33.62638547078548,6.879275716857602,28.813988627527912,28.810661584064874,9.458280199229785,10.08168993075329,18.38709231488472,5.867637590816321,19.044064760563444,21.636322487689956,17.99185899405185,21.469695276654697,10.108825768699088,27.904594589795558,20.43267212300193,18.145718343336007,15.886545489972326,26.137631821228155,20.095716390725023,34.66492575281556,14.383796729976673,21.630063595687925,18.738315524349538,31.767640816590223,16.74226770056101,28.59710064117477,18.33466121423763,26.28918109419149,22.252776310613932,36.18410109218355,26.701899272083445,5.692167674858872,26.959264164565923,33.90267154145004,23.744349576855925,26.506075811166447,22.300804753851637,13.613706418535312,16.713557935556164,19.738426611109944,11.329441210990584,1.0751412344857325,17.341797716638098,16.117517403732293,14.974938738500438,21.670215791254677,26.753919700980706,28.99380467673498,34.09674810860125,14.970931734415377,8.858101108202195,18.787925150943437,22.43219168859346,9.692037122083153,30.92855460425051,18.829599149184972,18.58324634300926,24.4259826786805,10.999088584841488,27.580934682945987,9.284154000635763,22.53050302849855,28.373365177801865,23.53894311952002,22.65245930416045,5.0946066276743585,32.151199718333665,28.283886864460776,30.016126795234406,12.439760372086127,3.9688142460698295,19.163670374949582,10.259330507249334,22.16245383514452,19.808025379461395,18.535691784874373,21.72174194177901,31.068464465813374,14.039117978449209,9.429583320752176,18.789610012081425,17.576833679549537,36.12776653627448,17.65827301020533,26.34923742008744,22.34221880865641,7.704523164587571,21.950682739248233,22.15811408859873,29.183183543082,34.60996204610075,7.084877781693102,8.768788327707702,24.31803543182868,26.296114335576018,25.49991616746055,10.382465584499819,32.27574986417666],"a":[11.067379189816489,7.796441257495257,14.251620576788806,1.090095888883944,10.410622528925817,15.263061393703413,2.9576862705285745,10.295858561415457,6.611320575302484,10.31940827852296,8.952233080495425,2.1749847704424186,12.973796995386632,13.728407094124972,4.889968854077931,14.683082292584292,18.735526534806155,3.3118008356814155,18.63393589119283,17.732061363784997,4.000883654654963,17.51277286605102,15.695610320657538,15.381349665606248,2.981884213045607,9.392795455901886,3.209716992298497,9.613708496641124,0.04324060044082145,1.7768856598754024,3.1172782078304184,0.5942841352968786,16.674744177841827,4.821453289893869,14.022932517985769,8.987827351114248,11.113195797245506,9.303054668484023,10.27457680743542,8.072425440025896,6.692532483280398,15.74684681202184,16.19949420236352,7.303719056388949,2.6756570952131398,3.2428167036015454,0.7613942133205498,16.61095911331133,1.5060722839947305,9.134154524586213,18.625971293729222,17.659024319002658,12.780235174259627,10.24363461049575,15.511171701181903,6.2437154156554175,6.976967367896121,2.5527134661868,3.8228318652427618,10.270651392639776,6.85333990826952,9.091825407574635,5.271553751412257,15.8674643632339,0.8556015973510078,11.16015577516185,17.551077311448232,5.594526983306043,14.205715545661848,14.64637876422171,16.299060371804618,16.121941383681822,8.526552316991914,2.094373800898799,6.0851266542557125,10.04350869765165,8.94775902719632,0.6648008511313375,16.910333379720743,5.838251167871347,14.162234683258141,9.020317701149896,11.627805419922112,2.757604474460389,4.045852182562255,2.001402693785934,12.65416834513536,0.2341095039772645,6.747440063571362,1.0133291901833186,1.8351601742838142,16.389880247698745,4.7905395084164,13.56888085411521,15.019409707799195,13.547912147039494,10.04811126356039,17.501317243956326,9.235490333801572,10.261175309526177,4.839721814426561,18.497882213122825,15.688330102603029,3.295677396815284,10.0689144692088,6.405395514147592,8.85946155249282,12.791407234693978,16.540881515970295,13.904330112719553,9.26921372937004,4.266077953138874,18.68349111372805,19.966941158641095,17.038927399309788,9.765006081077502,9.019405919838249,4.202836270132564,7.836054296864328,14.499215437076533,18.793615629658497,14.657838387414749,10.722602532000414,17.573121190921206,15.014930713649775,18.63512159129411,19.355970503049523,6.468999010612109,13.800645576034306,17.429825563024988,7.28552621641128,18.567836134204214,5.678977613109555,8.828095628475708,9.283837079500046,14.952546439766529,19.841285598936675,14.021648233864479,1.2218142479937066,13.860186199053377,15.850684999535115,14.205339254369896,0.06131736446377101,1.0530255546370393,19.00848093410992,12.494348300175968,0.9569877325309273,6.065926831117361,4.039623953285494,1.3602117155191884,19.283374354411063,4.870841603994727,4.203844902561857,17.399016767211304,9.558364265160183,0.984894153303415,14.43080331077697,7.925347572789745,6.756760188247695,3.3895525862601605,19.50016735666935,3.981285231964544,4.211105879427501,13.650849243919495,8.317398690434828,6.939925317270319,9.03745035045738,2.7576185893840632,17.59012628999091,1.3378289420983336,5.812213124490619,8.544555185000359,4.866489481673977,3.347150265694503,1.8263298432259578,10.401210619711684,18.651004257297483,13.957336385454205,18.09952912862212,9.027308301222693,13.072115670261532,16.08245851934919,17.18731181169432,2.6862494016454974,10.053192028061773,7.252446977334586,2.6889597620481442,0.015818341230828814,7.833474998696093,5.112474493387431,3.0459859083814456,3.410285406586473,12.062770605139761,8.21999267539173,9.304939328273658,8.974954208796571,19.248214761306993,6.55183881946217,1.9385631352325028,13.883527893259258,10.964784192883542,9.518157452462752,12.948428383764444,14.447767913715408,17.02119707171076,9.759873672356534,12.086133367827934,19.86758546867253,11.035514987742307,17.5999539468461,1.3360423459302373,10.696655028651723,5.111104332697107,16.34302517101301,18.390891384967347,2.223223884683083,10.688284166992759,17.570531718164958,0.5826580409153514,16.222688294629357,17.3146057472786,3.8737516938217897,3.6581103574387885,0.577536312217104,6.493464064131351,4.496939089657395,19.778593401707987,0.5755892130226004,16.585423411904905,17.060590326843798,13.77514112480366,3.4876893362039674,7.747446305755177,13.797637604752428,18.401489441644152,5.27189195264075,6.3090250478613585,0.5542556015385269,1.8229959376384208,13.265468113299953,2.6166823188437727,18.78642640360471,3.7958418663409654,11.125422329217729,18.7488677097096,12.705651114343702,1.9365379229331436,18.393986687840105,13.778015318351793,5.230592013738478,14.783999431309102,2.9834503212052033,19.060989523654914,10.622407243021716,3.805117350947902,11.697905039022265,5.62907358099336,2.3554739672784386,15.116521959746997,19.399160078328276,5.387030708421201,2.764013041812192,16.651630003097555,15.187478003956878,2.617520237610651,14.201490614299361,3.3276656728646614,5.387266912741189,10.54939523196975,13.05710159326836,7.0627034251959175,16.62058116226656,11.486157765273987,3.059038813439652,19.752853661473004,12.778580370396773,13.274511224223286,13.527152417612317,15.624429435793319,11.650187762232584,14.2470836268498,18.83234488338859,16.45248104732254,2.9534849105633887,17.95798876400682,14.578502778447673,7.72510490615721,13.127449384787848,17.94694768888213,11.316094351615531,15.8976151119975,12.327398707678633,10.882827702056726,9.894057928163523,3.105082902472378,18.789415880350568,18.46686841388966,0.8088021576335436,18.225957536007805,18.1030865416296,4.270991313939061,1.4698697238760783,9.067643429168498,1.9090793576895493,10.905368724029834,9.366935340669675,6.221639249374298,4.814258989826898,16.33331553003147,10.052969875898317,14.86324096328493,14.580693823951506,7.238516545405016,18.160166209007723,19.641888371936467,10.515269054313467,16.967558781138887,18.37977067551257,14.556078200701833,3.3523693394102105,0.16306157390831189,9.849471359009625,9.714052866442158,0.8242797774618316,18.38679254673338,18.340911970667563,8.78668814767785,4.370365739937774,10.906704273898544,17.402756220444534,4.268755816731389,11.170088432071626,1.3396635659588352,18.23855196017078,11.739771120968413,15.049677543623847,17.463173178420952,11.822451030145778,2.8210401326381795,15.112370276058904,8.450883733051873,14.109171567984461,9.55428154538421,4.865130659185053,4.302249630382242,13.46306383640127,8.35465567660368,14.202812999423223,12.457790428601513,11.739414144456738,13.005468538804852,18.422909355764908,15.319318616127253,0.7955382708716563,0.4655690614115082,10.209427184325577,13.440050773798436,5.170860354082976,16.824643676861125,18.48052880876571,7.7655539779560945,1.9935323179592412,1.6242520027503238,13.607508501401874,11.742647631312813,12.30714138855343,2.3248941232942055,18.96471452847038,15.983428776221743,8.019353449241056,10.432473243159976,17.280978245317023,0.21700934008372474,7.677309503048186,18.538547000686236,11.091475846639005,4.876342878202307,0.009176635181664672,6.3014078820595065,6.838161734104111,15.115847417760865,3.0865027968779213,14.491615963280404,8.9851449932941,7.606861076001725,4.086308547842754,12.422481383078633,15.97476125143971,13.515042450490359,0.9791943032138972,5.009884336001504,9.661825793855293,18.82504522865687,16.14335344113847,13.857178024643538,3.1490668863739746,5.693831245146108,10.50704430365165,19.544903674729127,17.433486342205065,11.323747865487688,3.2436794963277027,4.269999986604023,7.902586013888024,0.6347685456413066,0.7789839673203147,9.357291447881764,0.6469723999473143,11.015950248744634,17.247705957943662,14.849377471837304,9.539558189538745,10.18026128895781,16.371282285350773,1.4926010976286985,16.63128107958756,1.2373173498699197,5.9120273102419585,2.5200323233820177,10.521353391990665,18.21516367988586,10.41694709328798,18.767108871271777,1.1909725821738615,11.990047549501597,18.434452009819175,13.565907781724826,11.783629774303632,15.021194411120309,16.843773401214833,7.108805267252221,2.2025632793927707,18.40278848660518,5.720054527014038,6.392607302398647,5.507730590184687,17.500796022161346,15.371098013802191,15.423661964226065,11.132671469883704,14.138445663392032,0.07042573010554776,17.80424711392756,15.458443324513066,12.042485643878829,18.991144834522782,12.718378956713398,15.554417621664719,13.000150480261459,12.522247962593207,11.505342908895294,19.89606418564296,7.131513835471486,14.21651519179624,7.874807803413177,11.800096744065677,15.277428824838918,7.815587196167844,8.568648816124771,9.345996385230588,9.498566322612824,19.496480032866707,2.558038277178065,9.598323400532998,6.531356107183317,12.021413759777143,12.204875341296697,10.319052415588871,7.2876827771866015,9.595818827961441,8.448325890154988,0.45997943575995404,18.837014864435634,0.6513791228538857,7.287579905408674,3.1502135332449033,5.375793227809882,7.775837056346706,11.951491573284706,19.599475228217898,12.136463684637548,1.763320815255196,19.86742671804607,8.081819448214137,14.776030050385156,7.97085003020217,0.3200280015992041,14.700514243729973,17.00529796764027,9.957089462804888,2.1546625827367683,19.043812409079166,15.972301207174255,19.170463097605932,17.18234716183883,16.69058834618327,8.806696615763997,8.661537803512612,17.053258969593443,12.841639581819733,17.230150316913818,10.60272670314168,9.012555545473845,16.67629651125265,16.872237793550703,1.8670717817069926,3.5673160038167895,9.789079820725366,14.772384149787072,2.750784643254467,10.655682477996251,6.288298295362216,0.30465042314473223,8.587372279712513,3.893761859934086,7.712655056809115,8.479897336398526,3.5229222622146805,6.2798685618869055,14.477045551900027,10.151641655175702,2.1154744392246494,15.283087856656348,4.640060789464582,11.46293209872097,3.9501104763862616,11.342259441806002,2.032865700370592,13.876870825861642,10.8686644951369,3.1237390777534113,2.495135796452299,14.55303244938226,9.128891146788597,19.60417704255729,13.919432027517932,9.196094830962265,10.92194553673998,4.608497397501368,15.583450995808308,3.5348933330275134,10.96590295373395,13.025941889886976,11.883116981884442,11.814611388584769,8.046862972997605,16.446897962148277,15.080573347314932,2.38054231159492,10.95310903828243,17.294278192361862,17.35095300781093,19.19557563610816,15.423884581619646,17.593053672555268,12.054788988158482,2.083163084389934,1.0214230009993752,1.0628860127999085,0.07838979558020487,8.760903934538584,4.169194868711972,17.864606077882762,16.427742293572713,8.558650563652526,12.701621318026689,9.214002986106017,13.308681734677826,13.914266238955367,10.352611482569788,13.91907288009027,8.019188355835617,13.043939163354876,12.09333107096703,18.25089040269787,11.269250331668964,13.214144655652031,11.787807669022857,2.8390406186011097,7.480667967832253,6.092802943586886,9.542296779869934,5.126025672059171,6.787501181265938,12.583061787787377,11.619200154403488,11.320254232089617,14.917899184552773,18.51562596600035,6.546613236943539,1.369782187868056,11.236439950017484,6.811552988455132,19.375898507338675,13.932840949199306,4.662233550911754,8.456382174717998,17.252559038142735,5.670142724489078,13.102481199180001,18.93126440626339,14.530737064747466,11.748200016870944,1.3583182596593657,1.3003591580145368,14.92598050359236,13.435930608916834,8.434777339389168,16.669767271983797,13.403993285940725,12.154517486260783,15.19151492618525,18.105239727813714,6.655616903000978,3.3653688807300552,2.738554369169468,0.43895315923450084,7.161534690268381,14.323965166377883,12.035820337628213,18.211744476568693,7.3370493266916625,10.26003613773025,17.790415536003536,2.7614754720601242,16.657247338711464,1.373519649269106,18.36849323835174,10.494634440417133,1.9443815123765473,6.451037363275489,12.928259459320483,8.013007564154432,19.00673294718146,5.836577833375434,8.476231004880352,0.629937042437767,11.677011427512722,10.919926196403761,12.62319444880616,15.177146575825876,19.05336678624362,13.281699230783776,12.866116535378186,9.575055429577667,8.670471110540552,4.838595920727893,9.370875835174232,19.680376390275104,5.189075237148861,7.466987202101132,7.822547286491246,12.425374076908584,2.5208828999310606,10.924835669563482,10.01049132118756,8.430957914757533,19.08164651094795,19.602232345105882,9.09257306782781,3.2148073165104574,10.54897242479337,3.732692715622239,13.65704183757459,1.2844881465410118,19.370134170979497,11.204440578497529,0.5258264651761957,8.035563750191521,3.4839291508679793,18.143364613627774,9.937862173198813,3.2900292640410367,15.00506419029836,15.965237080308302,17.37547427634935,17.77169222882857,11.137670630033437,1.6616420064127313,5.391233627906633,9.238114739440636,17.750719828388462,3.8458592784319423,16.48439062178394,5.742627803256903,3.7815208216267004,16.84933740872525,10.938846935235231,12.316148773509479,16.447349001320205,10.972285214624854,8.772897264908401,17.64879300107143,13.94697304240307,18.745449706033874,2.5888521186173197,11.386964121080014,9.608434947151952,3.433720249196104,9.848645555644676,7.9189910617718295,13.332568022090147,2.828304877254193,15.656821881038674,7.8733356356848505,6.402692852450822,16.272522973012048,7.165106655523226,18.92432511753135,11.037150114277704,10.410406519317586,16.681582885525113,17.60817543231452,10.328697943399492,2.2921029770393586,1.9051677227676267,17.62879494580916,0.04933123424307073,18.36859244023321,5.727658901849386,19.072412424085613,2.133937916191866,9.407373711340888,9.46321746946468,0.25443991960274026,11.587528030659207,12.607106467214283,16.926848411459844,16.02636481062195,10.835634247963064,16.724475732024345,13.45747472609203,6.391386350652635,3.5646260409297037,19.161683636189196,12.785594862302476,18.914150200631077,14.837315456749444,11.315691273396297,8.486871463541492,9.113978518857987,12.499432425838615,19.47046018493812,16.46095301264623,16.115992374336052,17.996896356997016,12.377782556761696,10.92091814854439,13.395713391786952,7.701131691173999,12.003201822902847,18.4330155745376,2.954066464430243,19.93953415175275,14.198779872951594,8.565249412964997,17.404506279438383,14.151737706598663,12.706284055243412,19.90149513085068,4.226900492080192,8.753153104260436,11.111569905494019,8.650351318937242,13.99315600516546,13.600448315139083,17.375933165514937,9.53459776612923,8.02254593338633,2.916702239674791,1.2954751083027949,1.659925742594952,11.792293799102747,17.85068468871772,11.260586977543493,9.926706765797695,2.3689019289750446,18.759424270758302,19.45917898736397,18.145531812334184,7.382459692946992,6.731272057161299,18.761488221793922,14.213988234071696,2.9769802235499876,10.974143200708891,12.286042116659823,3.621350308249811,15.008815366083903,5.0752394294478265,3.2892965763739745,9.250947080448677,0.21142924320718848,6.347241337999736,10.911880443707368,6.802733681661048,19.170330235165135,18.777698658150914,10.746276264307038,6.813226362219322,9.455210177313567,16.66095832545041,15.412346610304702,6.11862540873207,9.015531363088417,7.575199028533484,10.466318576840763,7.9612757240883125,10.389923989414891,9.337218006758153,6.3059342252027095,17.131485456195115,10.165134424375264,6.6047664347432145,6.54994740820332,8.597580928923506,2.090468899770781,10.227813053930404,9.325647218286583,17.75835506276016,17.112154775214158,12.723090871537789,15.92432444810866,12.199738020555886,18.49861215595186,10.83095050009241,8.654700000993746,15.967871827007132,9.512571800521862,0.362113042489538,10.84995072645504,14.298320887606186,0.6226320506622818,13.034552289700233,16.408787428827164,9.237391111180688,11.172568412276807,11.085547033315407,0.289193058417494,0.1464720017418486,2.589511417210617,10.710457875876047,10.703373526881684,1.4426636445288477,16.720953418198214,2.478112836313775,8.32925966554178,9.62884565254968,7.960640985378014,0.43769873067780907,10.121508716884339,4.504186979810476,9.968521930821105,7.024684019328764,15.159318724926774,18.5034971756358,0.6569281860266818,4.3560819768077685,10.408744584572727,1.9996815473211083,8.766145744999537,6.371550836796631,9.634698891896441,0.24632308230532196,12.464325474656386,4.226809292415359,13.236404375863241,7.591452982436091,6.735569185959496,13.023336187811964,1.8849368498653574,0.49594914893905884,12.275142272327674,12.099594048018956,6.8071365579964205,8.697913802288411,15.627443578687785,18.322486803080054,5.176110792326707,9.924370569409717,17.935292485996502,6.469899834695343,18.644359044222387,9.275553794575426,14.446428137706032,7.142762081244189,5.674830779659623,6.873981007839518,7.663858415104401,9.813664755407942,15.121452666384268,5.571497621845047,8.762757331628963,12.19201315199757,5.34927940940491,0.22816920754154868,11.845324288990637,16.23400414598363,6.483803306661162,19.442942914113267,16.40901947360717,13.546220879561247,14.93123947554832,2.136883053451095,17.643059195892246,16.943692001963147,2.8520911796529758,7.3766063555449035,8.455526103926093,1.9818166207235066,1.9560107039160979,15.447243629051336,10.509661219993633,7.29269146335505,4.459607853613576,12.542348841667096,7.780141057439005,8.029056681120768,8.2066649379603,12.851456222452935,10.205151562672729,18.409745090708505,12.620917905181074,12.507032207190875,18.32255269591874,19.505269661906553,10.673941243441831,17.33918951022833,12.627662362939521,8.777565026109247,16.068474129739684,18.0466332431348,16.5570334207623,5.40102278231863,9.069988449958544,14.616202661196107,8.267966353707937,11.366543840447543,18.31633685252808,12.11720945612852,2.0103493157528396,16.747835885517052,7.700262947433161,0.7495413884900293,4.322216337374374,4.3496406290441,1.7964982871755586,3.1083004694631056,7.605305035014189,11.126606909336015,15.511047255768787,7.4329419417566545,7.572546276165535,18.37174751025981,5.524815702711834,8.400756382652448,17.56852475469648,9.870569849169861,15.342404879745235,6.7540553887166555,2.2373969778148384,17.68133610049388,5.673774623018328,14.60381283790583,14.211607993101376,9.386690444907014,11.850762697735684,0.4620496651659778,14.324161971004866,9.878656961936718,14.034426831562525,11.037646934736314,1.84664495599427,16.482505076186683,7.808856697021551,16.82921060391014,1.631596093308012,16.372865008268455,5.7571519026673545,11.526449429918078,8.97732532444477,8.634046292869822,10.263965844965828,9.159640255228666,19.695050613807066,3.369588621058104,19.118893079053688,11.94556622767601,1.0924987987449608,16.48784020305321,5.93501389444504,13.457838460186938,18.35784540597496,1.0879263172757803,5.138745339247728,14.782376632257975,19.829017427070447,9.287108123318397,9.97192252286812,12.782649150462895]}
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
var cdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `a`, `b` and `c`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0, 0.5 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a`, `b` and `c`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, -1.1, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, 1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/cdf/test/test.cdf.js")
},{"./../lib":113,"./fixtures/julia/large_range.json":114,"./fixtures/julia/medium_range.json":115,"./fixtures/julia/small_range.json":116,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":252}],118:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0, 0.5 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0, 0.5 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NaN, 0.5 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN, 0.5 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN, 0.5 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `a`, `b` and `c`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0, 0.5 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0, 0.5 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 2.0, 1.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -1.0, -2.0, 0.5 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -10.0, 10.0, 12.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -10.0, 10.0, -12.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( a[i], b[i], c[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( a[i], b[i], c[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( a[i], b[i], c[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/cdf/test/test.factory.js")
},{"./../lib/factory.js":112,"./fixtures/julia/large_range.json":114,"./fixtures/julia/medium_range.json":115,"./fixtures/julia/small_range.json":116,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":252}],119:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/cdf/test/test.js")
},{"./../lib":113,"tape":252}],120:[function(require,module,exports){
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
