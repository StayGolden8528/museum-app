import React, { Component } from 'react';
import axios from 'axios';

const APIKEY = process.env.REACT_APP_API; // Your API Key goes here, we should put this in .env

// Searchform is in charge of the actual call to the API, 
// It should have a controlled input for searching (what are the 3 things we need to make a controlled input?)
// It will recieve 2 function props, one to pass the current search term to App
// And one to pass the current search results to the App

// This component should have the structure:
// <form>
// 	<label></label>
//	<input type="search"/>
// </form>

class SearchForm extends Component {

	constructor() {
		super();

		this.state = {
			searchInput: ""
		};
		console.log(APIKEY);
	}

	async getSearchResults(query) {

		try {
			const results = await axios.get('https://www.rijksmuseum.nl/api/en/collection/',{
				params: {
					ps: 20,
					q: query,
					key: APIKEY,
					imgonly: true
				}
			});

			const art = results.data.artObjects;	

			console.log(results);
			this.props.updateArt(art);
			this.props.updateCurrentSearch(this.state.searchInput);

			this.setState({
				searchInput: ''
			});
			// Make an Ajax call with Axios here
			// Reset our search form
		} catch (error) {
			console.log(error.message);
		}
	}

	handleSubmit = (event) => {  //use ES6 function to avoid binding issues
		event.preventDefault();
		// console.log('working');
		this.getSearchResults(this.state.searchInput);
	}

	handleChange = (event) => {
		console.log(event.target.value);
		this.setState({
			searchInput: event.target.value
			
		});
	}

	render() {
		return (
			<form onSubmit={ (event) => this.handleSubmit(event) }>
				<label htmlFor="What would you like to see?"></label>
				<input 
				id="search" 
				name="search" 
				type="search"
				placeholder="Search"
				value={ this.state.searchInput }
				onChange={ (event) => this.handleChange(event) }		
				/>
			</form>
		);
	}
}

export default SearchForm;

//step 1 - adding the label and inputs for the form
//step 2 - create an es6 handleSubmit function to prevent default refresh
//step 3 - create a "value" property on the form which is the state of the searchInput
//step 4- add this.state below the constructor/super and set searchInput to an empty string
//step 5 - add an onChange es6 function to watch for the event and set it to the state of the handleChange function(event)
//step 6 - update the handleChange to setState equal to the searchInput: event.target.value