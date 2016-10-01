/*
	TodoStore: the Store in flux design, providing data and handle action to alter data
*/

"user strict";

import EventEmitter from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
	constructor() {
		super();
		this.tasks = [];
	}

	getTask() {
		return this.tasks;
	}

	fetchTasks() {
		chrome.storage.sync.get("tasks", (data) => {
			if(data.tasks){
				this.tasks = data.tasks;
				this.emit("change");
			}
		});
	}

	//create the default task
	createNewTask() {
		this.tasks.push({
			text: "New Task",
			complete: false
		});
		chrome.storage.sync.set({"tasks": this.tasks})
		this.emit("change");
	}

	//update the text of task with certain id
	updateTask(text, id) {
		this.tasks[id].text = text;
		chrome.storage.sync.set({"tasks": this.tasks})
		this.emit("change");
	}

	//delete a task with certain id
	delTask(id) {
		this.tasks.splice(id, 1);
		chrome.storage.sync.set({"tasks": this.tasks});
		this.emit("change");
	}

	handleAction(action) {
		switch(action.type) {
			case "CREATE_NEW_TASK":
				this.createNewTask();
				break;
			case "FETCH_TASKS":
				this.fetchTasks();
				break;
			case "UPDATE_TASK":
				this.updateTask(action.text, action.id);
				break;
			case "DEL_TASK":
				this.delTask(action.id);
				break;
		}
	}

}

//create the TodoStore instance
const todoStore = new TodoStore;

//register the handlerAction to dispatcher
dispatcher.register(todoStore.handleAction.bind(todoStore));

export default todoStore;