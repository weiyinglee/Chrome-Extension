/*
	Application Header: include a title
*/

import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

import * as taskAction from "../../action/TaskAction";

export default class Header extends React.Component {

	addNewTask() {
		taskAction.createNewTask();
	}

	render() {
		return (
			<Grid className="page-header" id="header">
				<Row>
					<Col xs={2}></Col>
					<Col xs={8}>
						<span id="header-title">TO DO LIST</span>
					</Col>
					<Col xs={2}>
						<Button bsSize="xsmall" onClick={this.addNewTask.bind(this)}>
							<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</Button>
					</Col>
				</Row>
			</Grid>
		)
	}
}