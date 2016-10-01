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

	componentDidMount() {
		taskAction.fetchTasks();
		toDoStore.on("change", this.getTasks.bind(this));
	}

	render() {

		let taskList;

		if(this.state.tasks.length == 0) {
			taskList = (<div id="no-task-text">No task for today</div>)
		}

		return (
			<div>
				{taskList}
				{
					this.state.tasks.map((task, index) => {
						return (<Task text={task.text} notify={task.notify} key={index} index={index}/>)
					})
				}
			</div>
		)
	}
}