import React from "react";

import $ from "jquery";

export default class Search extends React.Component {

	searchContent() {
		let searchText = this.refs.newText.value;
		if(searchText != ""){
			let searchUrl = 'https://www.google.com/?ion=1&espv=2#q=' + searchText;
			window.location.href = searchUrl;
		}
	}

	handleEnter(e){
		if(e.which == 13){
			e.preventDefault();
			this.searchContent();
		}
	}

	render(){
		return (
			<div id="search-block">
				<div>
					<form onKeyPress={this.handleEnter.bind(this)}>
					  <div className="input-group">
					  	  <span className="input-group-btn">
					        <a href="http://www.google.com" className="btn btn-warning" role="button">Google</a>
					      </span>
					      <input id="input-bar" type="text" ref="newText" className="form-control" placeholder="Search..."/>
					      <span className="input-group-btn">
					        <button className="btn btn-default" type="button" onClick={this.searchContent.bind(this)}>Search</button>
					      </span>
					  </div>
					</form>
				</div>
			</div>
		)
	}
}