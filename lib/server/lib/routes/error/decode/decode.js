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

/* eslint-disable no-invalid-this */

'use strict';

// MODULES //

var render = require( 'react-dom/server' ).renderToString;
var ServerStyleSheets = require( '@mui/styles' ).ServerStyleSheets;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var errorMessage = require( 'error-message' );
var app = require( './app.jsx' );


// VARIABLES //

var TITLE = 'Error Decoder | stdlib';


// MAIN //

/**
* Callback invoked upon receiving an HTTP request.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( request, reply ) {
	var content;
	var sheets;
	var html;
	var code;
	var args;
	var url;
	var css;
	var v;

	v = request.params.version;
	request.log.info( 'Version: %s', v );

	url = request.url;
	if ( url[ url.length-1 ] === '/' ) {
		url = url.substring( 0, url.length-1 );
	}
	request.log.info( 'Resolved URL: %s', url );

	code = request.params.code;
	request.log.info( 'Error code: %s', code );

	args = request.query[ 'arg[]' ];
	if ( args === void 0 ) {
		args = [];
	} else if ( isString( args ) ) {
		args = [ args ];
	}
	content = errorMessage( code, args );
	request.log.info( 'Package: %s', content.pkg || '(error)' );

	// Initialize a means for generating Material-UI CSS:
	sheets = new ServerStyleSheets();

	// Render the application component as parameterized by request data:
	html = render( sheets.collect( app( this.App, url, v, content || {}, request.locals, {} ) ) ); // eslint-disable-line max-len

	// Generate Material-UI CSS:
	css = sheets.toString();

	// Insert the rendered application into the application template:
	html = this.template
		.theme( request.locals.theme )
		.title( TITLE )
		.description( this.appinfo.description )
		.url( url )
		.css( css )
		.content( html )
		.toString();

	// Send the response data:
	request.log.info( 'Returning application.' );
	reply.type( 'text/html' );
	reply.send( html );
}


// EXPORTS //

module.exports = handler;
