/*
	Task: single task layout, include edit, delete buttons and task text
*/

import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

export default class Task extends React.Component {
	render() {
		return (
			<div>
				<Grid>
					<Row>
						<Col xs={8}>
							{this.props.text}
						</Col>
						<Col xs={4}>
							<Button bsSize="xsmall">Edit</Button>
							<Button bsSize="xsmall">Delete</Button>
						</Col>
					</Row>
				</Grid>
				<hr/>
			</div>
		)
	}
}