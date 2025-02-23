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

// MODULES //

import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';


// FUNCTIONS //

/**
* Component for rendering a menu option.
*
* @private
* @param {string} version - version
* @param {number} idx - index
* @returns {ReactElement} React element
*/
function versionOption( version, idx ) {
	return (
		<option key={ idx } value={ version }>{ version }</option>
	);
}


// MAIN //

/**
* Component for rendering a version menu.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - current documentation version
* @param {Callback} props.onChange - callback to invoke upon a change to the selected documentation version
* @returns {ReactElement} React element
*/
function VersionMenu( props ) {
	return (
		<div className="side-menu-version-wrapper">
			<label for="side-menu-version-select">Version</label>
			<div className="side-menu-version-select-wrapper">
				<select
					id="side-menu-version-select"
					className="side-menu-version-select"
					onChange={ props.onChange }
					value={ props.version }
					title="Select documentation version"
				>
					{ config.versions.map( versionOption ) }
				</select>
			</div>
		</div>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof VersionMenu
* @type {Object}
*/
VersionMenu.propTypes = {
	'version': PropTypes.string.isRequired,
	'onChange': PropTypes.func.isRequired
};


// EXPORTS //

export default VersionMenu;
