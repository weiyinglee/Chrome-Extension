/*
	TaskAction: to pass on the action command to the store
 */
import dispatcher from "../dispatcher";

//to create a new default task
export function createNewTask() {
	dispatcher.dispatch({
		type: "CREATE_NEW_TASK"
	});
}

//to fetch the data from backend storage
export function fetchTasks() {
	dispatcher.dispatch({
		type: "FETCH_TASKS"
	})
}

//to update a task text
export function updateTask(text, id) {
	dispatcher.dispatch({
		type: "UPDATE_TASK",
		text,
		id
	})
}

//to delete a task
export function delTask(id) {
	dispatcher.dispatch({
		type: "DEL_TASK",
		id
	})
}