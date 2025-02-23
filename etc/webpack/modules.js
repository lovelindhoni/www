/**
* MIT License
*
* Copyright (c) 2013-present, Facebook, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const paths = require('./paths');

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
	const baseUrl = options.baseUrl;

	// We need to explicitly check for null and undefined (and not a falsy value) because
	// TypeScript treats an empty string as `.`.
	if (baseUrl == null) {
		// If there's no baseUrl set we respect NODE_PATH
		// Note that NODE_PATH is deprecated and will be removed
		// in the next major release of create-react-app.

		const nodePath = process.env.NODE_PATH || '';
		return nodePath.split(path.delimiter).filter(Boolean);
	}
	const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

	// We don't need to do anything if `baseUrl` is set to `node_modules`. This is
	// the default behavior.
	if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
		return null;
	}

	// Allow the user set the `baseUrl` to `appSrc`.
	if (path.relative(paths.appSrc, baseUrlResolved) === '') {
		return [paths.appSrc];
	}

	// If the path is equal to the root directory we ignore it here.
	// We don't want to allow importing from the root directly as source files are
	// not transpiled outside of `src`. We do allow importing them with the
	// absolute path (e.g. `src/Components/Button.js`) but we set that up with
	// an alias.
	if (path.relative(paths.appPath, baseUrlResolved) === '') {
		return null;
	}

	// Otherwise, throw an error.
	throw new Error(
		chalk.red.bold(
			"Your project's `baseUrl` can only be set to `src` or `node_modules`." +
				' Create React App does not support other values at this time.'
		)
	);
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
	const baseUrl = options.baseUrl;

	if (!baseUrl) {
		return {};
	}

	const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

	if (path.relative(paths.appPath, baseUrlResolved) === '') {
		return {
			src: paths.appSrc,
		};
	}
}

function getModules() {
	const hasJsConfig = fs.existsSync(paths.appJsConfig);
	let config;
	if ( hasJsConfig ) {
		config = require(paths.appJsConfig);
	}
	config = config || {};
	const options = config.compilerOptions || {};

	const additionalModulePaths = getAdditionalModulePaths(options);

	return {
		additionalModulePaths: additionalModulePaths,
		webpackAliases: getWebpackAliases(options)
	};
}

module.exports = getModules();
