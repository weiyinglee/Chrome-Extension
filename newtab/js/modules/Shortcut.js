import React from "react";

import ShortcutList from "./ShortcutList.js";

export default class Shortcut extends React.Component {
	
	constructor() {
		super();
		this.state = {
			shortcuts: [
				"YouTube", "Facebook", "Yahoo", "Instagram", "Amazon", "Wikipedia" 
			]
		}
	}

	render() {
		return (
			<div>
				<ul id="shortcut-list">
					<li><ShortcutList shortcutTitle="Gmail"/></li>
					<li><a href="http://www.drive.google.com" title="Drive"><img src="../../img/drive.png"/></a></li>
					<li><a href="http://www.google.com/maps" title="Map"><img src="../../img/map.png"/></a></li>
					{
						this.state.shortcuts.map((elem, index) => {
							return <li key={index}><ShortcutList shortcutTitle={elem}/></li>
						})
					}
				</ul>
			</div>
		)
	}
}