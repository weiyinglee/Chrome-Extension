/*
	Task: single task layout, include edit, delete buttons and task text
*/

import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

import * as taskAction from "../../action/TaskAction";

export default class Task extends React.Component {

	constructor() {
		super();
		this.state = {
			editing: false
		}
	}

	editTask() {
		//turn on the editing mode
		this.setState({
			editing: true
		})
	}

	delTask() {

		let id = this.props.index;

		//send the action to delete the text with id
		taskAction.delTask(id);
	}

	updateText() {

		let text = this.refs.new_text.value;
		let id = this.props.index;

		//send the action to update text with text and id
		taskAction.updateTask(text, id);

		//close the editing mode
		this.setState({
			editing: false
		})
	}

	switchNotify() {

		let id = this.props.index;

		//swtich the notify
		taskAction.switchNotify(id);
	}

	setReminder() {

		let id = this.props.index;
		let time = this.refs.min.value;

		if(time != ""){
			//set the time
			taskAction.setReminder(time, id);			
		}
	}


	render() {

		//the html when editng mode is on
		let editingMode;

		//if the editing mode is on, show editingMode
		if(this.state.editing) {
			editingMode = (
				<Row>
					<Col xs={8}>
						<input type="text" ref="new_text" defaultValue={this.props.text} placeholder="What is the task?"/>
					</Col>
					<Col xs={4}>
						<a href="#" title="Done" className="btn" onClick={this.updateText.bind(this)}>
							<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
						</a>
					</Col>
				</Row>
			)
		}else {
			let notifition;

			if(this.props.notify) {
				//if have not set time
				if(!this.props.setTime) {
					notifition = (
						<div>
							<span className="notifition-time">Set the reminder in </span>
							<input type="number" ref="min" min="0" placeholder="minutes"/>
							<span className="notifition-time">minutes</span>
							<Button bsSize="xsmall" onClick={this.setReminder.bind(this)}>Set</Button>
						</div>
					)
				}else {
					notifition = (<h6 className="notifition-time">Reminder is ON, happens in {this.props.time} minutes.</h6>)
				}
			}else {
				notifition = (<h6 className="notifition-time">Reminder is OFF</h6>)
			}
			
			editingMode = (		
				<Row>	
					<Col xs={8}>
						{this.props.text} {notifition}
					</Col>
					<Col xs={4}>
						<a href="#" title="Edit" className="btn" onClick={this.editTask.bind(this)}>
							<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
						</a>
						<a href="#" title="Set reminder" className="btn" onClick={this.switchNotify.bind(this)}>
							<span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
						</a>						
						<a href="#" title="Delete" className="btn" onClick={this.delTask.bind(this)}>
							<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
						</a>
					</Col>
				</Row>
			)
		}

		return (
			<div>
				<Grid>
					{editingMode}
				</Grid>
				<hr/>
			</div>
		)
	}
}