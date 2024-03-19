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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from './../icons/close.jsx';


// MAIN //

/**
* Component for displaying documentation help.
*
* @private
* @param {Object} props - component properties
* @param {Callback} props.onClose - callback to invoke upon closing documentation help
* @returns {ReactElement} React element
*/
function Help( props ) {
	return (
		<Fragment>
			<div id="readme" className="readme help" >
				<h1>
					<span>Documentation Help</span>
					<button
						className="icon-button"
						title="Close help"
						aria-label="close"
						onClick={ props.onClose }
					>
						<ClearIcon />
					</button>
				</h1>
				<section>
					<p>TODO</p>
				</section>
			</div>
		</Fragment>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Help
* @type {Object}
*/
Help.propTypes = {
	'onClose': PropTypes.func.isRequired
};


// EXPORTS //

export default Help;
