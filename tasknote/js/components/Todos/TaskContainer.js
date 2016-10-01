/*
	TaskContainer: contains all the saved tasks as a list
*/

import React from "react";

import Task from "./task";
import toDoStore from "../../store/ToDoStore";
import * as taskAction from "../../action/TaskAction";

export default class TaskContainer extends React.Component {
	
	constructor() {
		super();
		this.state = {
			tasks: toDoStore.getTask()
		}
	}

	getTasks() {
		//re-get the tasks from toDoStore for latest version
		this.setState({tasks: toDoStore.getTask()});
	}

	componentWillMount() {
		taskAction.fetchTasks();
		toDoStore.on("change", this.getTasks.bind(this));
	}

	componentWillUnMount() {
		toDoStore.removeListener("change", this.getTasks.bind(this));
	}

	render() {
		return (
			<div>
				{
					this.state.tasks.map((task, index) => {
						return (<Task text={task.text} key={index} index={index}/>)
					})
				}
			</div>
		)
	}
}