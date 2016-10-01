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
						<Button bsSize="xsmall" bsStyle="link" onClick={this.updateText.bind(this)}>done</Button>
					</Col>
				</Row>
			)
		}else {
			editingMode = (			
				<Row>
					<Col xs={8}>
						{this.props.text}
					</Col>
					<Col xs={4}>
						<Button bsSize="xsmall" onClick={this.editTask.bind(this)}>Edit</Button>
						<Button bsSize="xsmall" onClick={this.delTask.bind(this)}>Delete</Button>
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