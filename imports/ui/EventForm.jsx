import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { AutoForm } from "uniforms-semantic";
import { withTracker } from "meteor/react-meteor-data";
import { Events } from "../api/events.js";
import { Schema } from "./schema.js";

class EventForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			date: "",
			time: "",
			description: "",
			list: "",
			createdAt: "",
			owner: ""
		};
	}

	onSubmit(data) {
		Meteor.call("events.insert", data, (err, res) => {
				if (err) {
					alert("There was error inserting check the console");
					console.log(err);
					return;
				}

				console.log("Message inserted", res);
				this.setState({
					description: ""
				});
			})
		}
	
	

	render() {
		return <AutoForm schema={Schema} onSubmit={this.onSubmit.bind(this)} />;
	}
}

// EventForm.propTypes = {
// 	name: PropTypes.arrayOf(PropTypes.object).isRequired,
// 	name: PropTypes.arrayOf(PropTypes.object).isRequired

// };

export default withTracker(() => {
	const handle = Meteor.subscribe("events");
	return {
		events: Events.find({}).fetch(),
		user: Meteor.user(),
		ready: handle.ready()
	};
})(EventForm);