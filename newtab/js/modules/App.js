import React from "react";

import Search from "./Search.js";
import Shortcut from "./Shortcut.js";

import $ from "jquery";

export default class App extends React.Component {
	render() {
		//change to custome styling in real time
		chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
			let key = Object.keys(req);
			switch(key[0]){
				case "bg-color":
					$("body").css({"background-color": req["bg-color"]});
					break;
				
				case "txt-color":
					$("#memo-txt").css({"color": req["txt-color"]});
					break;
				
				case "memo":
					$("#memo-txt").html(req.memo);
					break;
				
				case "bg-img":
					let traparency = "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))";
					let url = "url('../img/image" + req["bg-img"] + ".jpg')";
					$("body").css({"background-image": traparency + ", " + url});					
					break;
				
				case "text-style":
					$("body, #memo-txt").css({"font-family": req["text-style"]});
					break;
				
				case "text-size":
					let size = req["text-size"] + "px";
					$("#memo-txt").css({"font-size": size});					
					break;
				
				case "clear-bg":
					$("body").css({"background-image": ""});
					break;
				
				case "clear-memo":
					$("#memo-txt").html("");
					break;
				
				case "clear":
					location.reload();
					break;
			}
		});

		//keep the changing
		//pass in null get all keys storage
		chrome.storage.sync.get(null, (data) => {
			let allKeys = Object.keys(data);
			allKeys.forEach((elem) => {
				switch(elem){
					case "bg-color":
						$("body").css({"background-color": data["bg-color"]});
						break;
					
					case "txt-color":
						$("#memo-txt").css({"color": data["txt-color"]});
						break;
					
					case "memo":
						$("#memo-txt").html(data.memo);
						break;
					
					case "clear-memo":
						if(data["clear-memo"]){
							$("#memo-txt").html("");
						}							
						break;
					
					case "bg-img":
						let traparency = "linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2))";
						let url = "url('../img/image" + data["bg-img"] + ".jpg')";
						$("body").css({"background-image": traparency + ", " + url});							
						break;
					
					case "clear-bg":
						if(data["clear-bg"]){
							$("body").css("background-image","linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))");
						}							
						break;
					
					case "text-style":
						$("body, #memo-txt").css({"font-family": data["text-style"]});
						break;
					
					case "text-size":
						let size = data["text-size"] + "px";
						$("#memo-txt").css({"font-size": size});
						break;
				}
			});
		});

		return (
			<div className="container unselectableText">
				<div className="page-header top-frame">
					<Search />
					<Shortcut />
				</div>
				<pre id="memo-txt">
				</pre>
			</div>
		)
	}
}