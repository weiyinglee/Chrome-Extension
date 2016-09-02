import React from "react";

import ShortcutList from "./ShortcutList.js";

import $ from "jquery";

export default class Shortcut extends React.Component {
	
	constructor() {
		super();
		this.state = {
			shortcuts: [
				"YouTube", "Facebook", "Yahoo", "Instagram", "Amazon", "Wikipedia" 
			],
			adding: false,
			removing: false
		}
	}

	addShortcut() {
		this.setState({
			adding: !this.state.adding,
			removing: false
		});
	}

	addedOne() {
		let name = this.refs.new_shortcut_name.value,
			addr = this.refs.new_shortcut_addr.value;
		let html = "<li id='" + name.toLowerCase() + "'><a href='" + addr + "' title='" + name + "'>" + name + "</a></li>";
		let wholeHtml = $("#new-shortcut-list").html();

		if(name != "" && addr != ""){
			$("#new-shortcut-list").append(html);
			chrome.storage.sync.set({"newShortcuts" : wholeHtml + html}, () => {
				this.setState({adding: false});			
			});
		}else{
			alert("Complete the field before push Enter.");
		}

	}

	rmShortcut() {
		this.setState({
			removing: !this.state.removing,
			adding: false
		});
	}

	rmedOne(){
		let item = this.refs.rm_shortcut_name.value;

		if(item != "" && $("#" + item.toLowerCase()).length){
			$("#" + item.toLowerCase()).remove();
			let html = $("#new-shortcut-list").html();
			chrome.storage.sync.set({"newShortcuts" : html}, () => {
				this.setState({removing: false});			
			});
		}else{
			alert("There aren't any names match.");
			$("#rm-input").val("");
		}
	}

	rmedAll() {
		chrome.storage.sync.remove("newShortcuts");
		location.reload();
	}

	componentDidMount() {
		this.serverRequest = chrome.storage.sync.get("newShortcuts", function(data){
			$("#new-shortcut-list").append(data.newShortcuts);
		}.bind(this));
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	render() {

		let inputField;

		if(this.state.adding){
			inputField = (
				<li>
					<input type="text" ref="new_shortcut_name" placeholder="Enter Shortcut"/>
					<input type="text" ref="new_shortcut_addr" placeholder="Enter address" />
				    <button className="btn btn-xs btn-success" type="button" onClick={this.addedOne.bind(this)}>Enter</button>
				</li>
			)
		}

		if(this.state.removing){
			inputField = (
				<li>
					<input type="text" id="rm-input" ref="rm_shortcut_name" placeholder="Remove which shortcut?" />
					<button className="btn btn-xs btn-warning" onClick={this.rmedOne.bind(this)}>Enter</button>
					<button className="btn btn-xs btn-danger" onClick={this.rmedAll.bind(this)}>Remove ALL</button>
				</li>
			)
		}

		return (
			<div>
				<ul id="shortcut-list">
					<button className="btn btn-sm btn-default" onClick={this.addShortcut.bind(this)}><strong>＋</strong></button>
					<button className="btn btn-sm btn-default" onClick={this.rmShortcut.bind(this)}><strong>－</strong></button>
					{inputField}
					<li><ShortcutList shortcutTitle="Gmail"/></li>
					<li><a href="http://www.drive.google.com" title="Drive"><img src="../../img/drive.png"/></a></li>
					<li><a href="http://www.google.com/maps" title="Map"><img src="../../img/map.png"/></a></li>
					{
						this.state.shortcuts.map((elem, index) => {
							return <li key={index}><ShortcutList shortcutTitle={elem}/></li>
						})
					}
					<li id="new-shortcut-list"></li>
				</ul>
			</div>
		)
	}
}