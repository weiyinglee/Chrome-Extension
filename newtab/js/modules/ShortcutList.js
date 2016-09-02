import React from "react";

export default class ShortcutList extends React.Component {
	render() {
		let title = this.props.shortcutTitle;
		let lwTitle = title.toLowerCase();
		let url = "http://www." + lwTitle + ".com";
		let src = "../../img/" + lwTitle + ".png";		

		return (<a href={url} title={title}><img src={src}/></a>)
	}
}