import React from "react";

import Header from "./header/Header";
import ToDoList from "./Todos/taskContainer";

export default class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<ToDoList />
			</div>
		)
	}
}