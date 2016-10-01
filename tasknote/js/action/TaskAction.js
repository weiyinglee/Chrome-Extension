import dispatcher from "../dispatcher";

export function createNewTask() {
	dispatcher.dispatch({
		type: "CREATE_NEW_TASK"
	});
}

export function fetchTasks() {
	dispatcher.dispatch({
		type: "FETCH_TASKS"
	})
}
