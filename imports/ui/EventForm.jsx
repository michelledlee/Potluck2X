import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { AutoForm } from "uniforms-semantic";
import { withTracker } from "meteor/react-meteor-data";
import { Events } from "../api/events.js";
import { Schema } from "./schema.js";
import { ListForm } from "./ListForm.jsx";

class EventForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			name: "",
			date: "",
			time: "",
			description: "",
			list: "",
			createdAt: "",
			owner: ""
		};
	}

	onSubmit1(event) {
		event.preventDefault();
		let data = { name: this.eventname.value, date: this.eventdate.value };
		Meteor.call("events.insert", data, (err, res) => {
			if (err) {
				alert("There was error inserting check the console");
				console.log(err);
				return;
			}
			this.setState({
				id: res
			});
			console.log(res);
		});
	}

	render() {
		// return <AutoForm schema={Schema} onSubmit={this.onSubmit.bind(this)} />;
		return (
			<div className="Comment col-4">
				<form
					className="form-signin"
					noValidate
					onSubmit={this.onSubmit1.bind(this)}
				>
					<div className="form-label-group">
						<label htmlFor="name">Name</label>

						<input
							id="name"
							type="text"
							ref={input => (this.eventname = input)}
						/>
					</div>
					<div className="form-label-group">
						<label htmlFor="date">Date</label>
						<input
							id="date"
							type="date"
							ref={input => (this.eventdate = input)}
						/>
					</div>
					<div className="form-label-group">
						<button
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							type="submit"
							className="btn btn-lg btn-primary btn-block text-uppercase"
						>
							Submit
						</button>
					</div>
				</form>

				{this.state.id != "" ? (
					<ListForm id={this.state.id} />
				) : (
					<div>sugma</div>
				)}


				<br />
			</div>
		);
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