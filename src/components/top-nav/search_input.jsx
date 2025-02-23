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
import InputBase from '@mui/material/InputBase'; // FIXME: replace; use native HTML
import SearchIcon from './../icons/search.jsx';


// MAIN //

/**
* Component for displaying a search input element.
*
* @private
*/
class SearchInput extends React.Component {
	/**
	* Returns a component for displaying a search input element.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.value - value of input element
	* @param {Callback} props.onChange - callback to invoke upon updating a search input element
	* @param {Callback} props.onSubmit - callback to invoke upon a user submitting a search query
	* @param {Callback} props.onFocus - callback to invoke when search input element receives focus
	* @param {Callback} props.onBlur - callback to invoke when search input element loses focus
	* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// Boolean indicating whether a search input element is "active" (e.g., is focused or contains a search query):
			'active': false
		};
		// Ref for search input element
		this.searchRef = React.createRef();

	}

	/**
	* Callback invoked upon updating a search input element.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onChange = ( event ) => {
		this.props.onChange( event.target.value );
	}

	/**
	* Callback invoked upon a user releasing a key on a keyboard when using a search input element.
	*
	* @private
	* @param {Object} event - event object
	* @returns {void}
	*/
	_onKeyUp = ( event ) => {
		if ( event.key === 'Enter' ) {
			this.props.onSubmit();
		}
	}

	/**
	* Callback invoked upon the search input element being focused.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onFocus = ( event ) => {
		this.setState({
			'active': true
		});
		this.props.onFocus( event );
	}

	/**
	* Callback invoked upon the search input element losing focus.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onBlur = ( event ) => {
		this.setState({
			'active': false
		});
		this.props.onBlur( event );
	}

	/**
	* Callback invoked upon clicking a submit button.
	*
	* @private
	*/
	_onSubmitClick = () => {
		this.props.onSubmit();
	};

	/**
	* Callback invoked upon a user press down a key to focus the search input element
	*
	* @private
	* @param {Object} event - event object
	* @returns {void}
	*/
	_focusSearch = ( event ) => {
		// Focus search input element when forward slash is pressed down while shortcuts are active
		if ( event.key === "/" && this.props.shortcuts ) {
			this.searchRef.current.focus();
			event.preventDefault();
		}
	};

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		// Add event listener when the component mounts
		document.addEventListener( "keydown", this._focusSearch );
	}

	/**
	* Callback invoked immediately after unmounting a component (i.e., is removed from a tree).
	*
	* @private
	*/
	componentWillUnmount() {
		// Cleanup the event listener when the component unmounts
		document.removeEventListener( "keydown", this._focusSearch );
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<Fragment>
				<InputBase
					id="top-nav-search"
					className={ 'top-nav-search ' + ( ( this.state.active || this.props.value ) ? 'top-nav-search-active' : '' ) }
					placeholder="Search documentation"
					value={ this.props.value }
					inputRef={ this.searchRef }
					type="text"
					inputProps={{
						'aria-label': 'search text'
					}}
					onChange={ this._onChange }
					onKeyUp={ this._onKeyUp }
					onFocus={ this._onFocus }
					onBlur={ this._onBlur }
				/>
				<button
					type="button"
					className="icon-button top-nav-search-button"
					onClick={ this._onSubmitClick }
					aria-label="search"
				>
					<SearchIcon />
				</button>
			</Fragment>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof SearchInput
* @type {Object}
*/
SearchInput.propTypes = {
	'value': PropTypes.string.isRequired,
	'onChange': PropTypes.func.isRequired,
	'onSubmit': PropTypes.func.isRequired,
	'onFocus': PropTypes.func.isRequired,
	'onBlur': PropTypes.func.isRequired,
	'shortcuts': PropTypes.bool.isRequired
};


// EXPORTS //

export default SearchInput;
