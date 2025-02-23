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
import lunr from 'lunr';
import { Link, withRouter } from 'react-router-dom';
import fetchSearchData from 'fetch-search-data';
import packageDescription from 'pkg-description';
import deprefix from 'deprefix-pkg-name';
import pkgPath from 'pkg-doc-path';
import pkgKind from 'pkg-kind';
import pkgBasename from 'pkg-basename';
import log from 'log';
import LogoIcon from './../icons/logo.jsx';
import ClearIcon from './../icons/close.jsx';


// MAIN //

/**
* Component for rendering documentation search.
*
* @private
*/
class Search extends React.Component {
	/**
	* Returns a component for rendering documentation search.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - version
	* @param {string} props.query - search query
	* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
	* @param {Callback} props.onClose - callback to invoke upon closing search results
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// Search index:
			'index': null
		}
	}

	/**
	* Returns a callback which is invoked upon clicking on a specified package.
	*
	* @private
	* @param {string} pkg - package name
	* @returns {Callback} event handler
	*/
	_onPackageClickFactory( pkg ) {
		return onClick;

		/**
		* Callback invoked upon clicking on a package.
		*
		* @private
		* @param {Object} event - event object
		*/
		function onClick( event ) {
			// Prevent the event from bubbling up:
			event.stopPropagation();
		}
	}

	/**
	* Returns a callback which is invoked upon clicking on a specified package's associated search result list item.
	*
	* @private
	* @param {string} url - package documentation URL
	* @param {string} pkg - package name
	* @returns {Callback} event handler
	*/
	_onPackageItemClickFactory( url, pkg ) {
		var self = this;
		return onClick;

		/**
		* Callback invoked upon clicking on a package.
		*
		* @private
		* @param {Object} event - event object
		*/
		function onClick( event ) {
			// Manually update history in order to navigate to the desired package:
			self.props.history.push( url );
		}
	}

	/**
	* Updates the search index.
	*
	* @private
	*/
	_updateSearchIndex() {
		var self = this;

		// Update the component state:
		this.setState({
			'index': null
		});

		// Fetch search data:
		fetchSearchData( this.props.version, clbk );

		/**
		* Callback invoked upon resolving search data.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} data - search data
		* @returns {void}
		*/
		function clbk( error, data ) {
			if ( error ) {
				// TODO: display toast/error message to user to ask that they retry their search
				return log( error );
			}
			// Load the serialized index into Lunr:
			self.setState({
				'index': lunr.Index.load( data.index )
			});
		}
	}

	/**
	* Renders a list of search results.
	*
	* @private
	* @param {ObjectArray} results - list of results
	* @returns {Array<ReactElement>} list of React elements
	*/
	_renderItems( results ) {
		var out;
		var i;

		out = [];
		for ( i = 0; i < results.length; i++ ) {
			out.push( this._renderItem( results[ i ] ) );
		}
		return out;
	}

	/**
	* Renders a search result.
	*
	* @private
	* @param {Object} result - search result
	* @returns {ReactElement} React element
	*/
	_renderItem( result ) {
		var basename;
		var clbk;
		var name;
		var desc;
		var kind;
		var pkg;
		var url;

		// Get the package name associated with the search result:
		name = result.ref; // e.g., `@stdlib/math/base/special/sin`

		// Remove the `@stdlib/` prefix:
		pkg = deprefix( name ); // e.g., `math/base/special/sin`

		// Isolate the basename of the package path:
		basename = pkgBasename( pkg ); // e.g., `sin`

		// Determine if we can resolve a package "kind":
		kind = pkgKind( pkg );

		// Retrieve the package description:
		desc = packageDescription( pkg, this.props.version ) || '(no description)';

		// Resolve the documentation path for this package:
		url = pkgPath( name, this.props.version );

		// Create a callback to be invoked whenever a user clicks on a search result link:
		clbk = this._onPackageClickFactory( pkg );

		return (
			<li
				key={ pkg }
				className="search-results-list-item"
				onClick={ this._onPackageItemClickFactory( url, pkg ) }
			>
				<h2 className="search-results-list-item-title">
					<Link
						to={ url }
						title={ name }
						onClick={ clbk }
					>
						{ basename }
					</Link>
					<span className="search-results-list-item-package-kind">
						{  ( kind ) ? ' ('+kind+')' : null }
					</span>
				</h2>
				<p className="search-results-list-item-url">
					<LogoIcon />
					<Link
						className="search-results-list-item-url-link"
						to={ url }
						title={ name }
						onClick={ clbk }
					>
						{ url }
					</Link>
				</p>
				<p className="search-results-list-item-description">
					{ desc }
				</p>
			</li>
		);
	}

	/**
	* Callback invoked upon a user press down a key when search results are open.
	*
	* @private
	* @param {Object} event - event object
	* @returns {void}
	*/
	_closeSearchResults = ( event ) => {
		// Close search results only after the settings menu gets closed
		var isSettingsClosed = document.querySelector( 'div.settings-menu-overlay.invisible' ) !== null;

		if ( event.key === "Escape" && this.props.shortcuts && isSettingsClosed ) {
			this.props.onClose();
		  }
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		document.addEventListener( "keydown" , this._closeSearchResults )
		this._updateSearchIndex();
	}

	/**
	* Callback invoked immediately after unmounting a component (i.e., is removed from a tree).
	*
	* @private
	*/
	componentWillUnmount() {
		document.removeEventListener( "keydown", this._closeSearchResults )
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps ) {
		if ( this.props.version !== prevProps.version ) {
			this._updateSearchIndex();
		}
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		var results;
		if ( this.props.query === '' ) {
			// TODO: display message or show "advanced" search interface
			return null;
		}
		if ( this.state.index === null ) {
			// TODO: display pending search message
			return null;
		}
		results = this.state.index.search( this.props.query );
		return (
			<div id="readme" className="readme search-results">
				<h1>
					<span>Search Results</span>
					<button
						className="icon-button"
						title="Close search results"
						aria-label="close"
						onClick={ this.props.onClose }
					>
						<ClearIcon />
					</button>
				</h1>
				<p>
					{ results.length } search result(s)...
				</p>
				<ul
					className="search-results-list"
					aria-label="search results"
				>
					{ this._renderItems( results ) }
				</ul>
			</div>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Search
* @type {Object}
*/
Search.propTypes = {
	'version': PropTypes.string.isRequired,
	'query': PropTypes.string.isRequired,
	'onClose': PropTypes.func.isRequired,
	'shortcuts': PropTypes.bool.isRequired
};


// EXPORTS //

export default withRouter( Search );
