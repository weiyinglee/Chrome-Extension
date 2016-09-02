import React from "react";

import $ from "jquery";
import {DropdownButton, MenuItem, ButtonToolbar} from "react-bootstrap";

export default class Controller extends React.Component {

	setColor() {
		let color = this.refs.color_code.value;
		if(color != ""){
			chrome.storage.sync.set({"bg-color": color});
			//send the message to newtab
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {"bg-color": color});
			});
		}
	}

	setColorTxt() {
		let color = this.refs.txt_color_code.value;
		if(color != "") {
			chrome.storage.sync.set({"txt-color": color});
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {"txt-color": color});
			});
		}
	}

	setBg(e) {
		let num = e;
		if(num == 0){
			chrome.storage.sync.remove("bg-img");
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {"clear-bg": true});
			});
		}else{
			chrome.storage.sync.set({"bg-img": num});
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {"bg-img": num});
			});
		}
	}

	setTxt(e) {
		let style = e;
		chrome.storage.sync.set({"text-style": style});
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {"text-style": style});
		});
	}

	setTxtSize(){
		let size = this.refs.txt_size.value;
		if(size != ""){
			chrome.storage.sync.set({"text-size": size});
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {"text-size": size});
			});			
		}
	}

	addMemo() {
		let text = this.refs.the_memo.value;
		chrome.storage.sync.set({"memo": text});
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {"memo": text});
		});
	}

	clearMemo() {
		chrome.storage.sync.remove("memo", function(){
			$("textarea").val("");
		});
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {"clear-memo": true});
		});
	}

	defaultBtn() {
		chrome.storage.sync.clear();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {"clear": true});
		});	
	}

	cancelBtn() {
		location.reload();
	}

	render() {
		let primary_btn = "btn btn-sm btn-primary",
			warning_btn = "btn btn-sm btn-warning";

		return (
			<div className="container unselectableText">
				<div className="page-header">
					<h3 className="title">Design your own background</h3>
				</div>
				<div className="page-header">
					<ul>
						<li>
						    <button className={primary_btn} onClick={this.setColor.bind(this)}>Set Color</button>
						    <input type="text" ref="color_code" placeholder="Enter the color code" />
						</li>
						<li>
							<ButtonToolbar>
								<DropdownButton title="Set Wall Paper" className={primary_btn} id="bg-dropdown" onSelect={this.setBg.bind(this)}>
							    	<MenuItem eventKey="0">No wall paper</MenuItem>
							    	<MenuItem eventKey="1">Image 1</MenuItem>
							    	<MenuItem eventKey="2">Image 2</MenuItem>
							    	<MenuItem eventKey="3">Image 3</MenuItem>
							    	<MenuItem eventKey="4">Image 4</MenuItem>
							    	<MenuItem eventKey="5">Image 5</MenuItem>
							    </DropdownButton>
							</ButtonToolbar>
						</li>
						<li>
							<ButtonToolbar>
								<DropdownButton title="Set text style" className={primary_btn} id="txt-dropdown" onSelect={this.setTxt.bind(this)}>
							    	<MenuItem eventKey="sans-serif">Sans-Serif</MenuItem>
							    	<MenuItem eventKey="serif">Serif</MenuItem>
							    	<MenuItem eventKey="monospace">Monospace</MenuItem>
							    	<MenuItem eventKey="cursive">Cursive</MenuItem>
							    	<MenuItem eventKey="fantasy">Fantasy</MenuItem>
							    </DropdownButton>
							</ButtonToolbar>
						</li>
						<li>
							<textarea ref="the_memo" maxLength="100" placeholder="Write.."></textarea>
							<button className={warning_btn} onClick={this.addMemo.bind(this)}>Add Memo</button>
							<button className={warning_btn} onClick={this.clearMemo.bind(this)}>Remove Memo</button>
						</li>
						<li>
						    <button className={primary_btn} onClick={this.setColorTxt.bind(this)}>Set Text Color</button>
						    <input type="text" ref="txt_color_code" placeholder="Enter the color code" />
						</li>
						<li>
							<button className={primary_btn} onClick={this.setTxtSize.bind(this)}>Set Memo Size</button>
						    <input type="number" ref="txt_size" min="12" max="60" placeholder="Size(px)"/>
						</li>
					</ul>
				</div>
				<button className="btn btn-sm btn-danger function-btn" onClick={this.defaultBtn.bind(this)}>Set to default</button>
				<button className="btn btn-sm btn-info function-btn" onClick={this.cancelBtn.bind(this)}>Reset</button>
			</div>	
		)
	}
}