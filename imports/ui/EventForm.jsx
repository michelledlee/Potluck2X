import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { AutoForm } from "uniforms-semantic";
import { withTracker } from "meteor/react-meteor-data";
import { Events } from "../api/events.js";
import { Schema } from "./schema.js";
import  ListForm  from "./ListForm.jsx";

class EventForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			name: "",
			date: "",
			time: "",
			description: "",
			list: [],
			createdAt: "",
			owner: ""
		};
	}

	onSubmit1(event) {
		event.preventDefault();
		let data = { name: this.eventname.value, date: this.eventdate.value, description: this.eventdescription.value, list: this.state.list };
		Meteor.call("events.insert", data, (err, res) => {
			if (err) {
				alert("There was error inserting check the console");
				console.log(err);
				return;
			}
			this.setState({
				id: res
			});
			console.log(this.state.id)
			console.log(res);
		});
	}

	render() {
		// return <AutoForm schema={Schema} onSubmit={this.onSubmit.bind(this)} />;
		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
        		<div className="row">
         			 <div className="col s12 center-align" style={{ padding: "100px" }}>
			    <h2>Register a New Event</h2>
			    <center>
			    <div className="makeForm col-8">
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
						<label htmlFor="date">Description</label>
						<input
							id="description"
							type="text"
							ref={input => (this.eventdescription = input)}
						/>
					</div>
					<div className="form-label-group">
						{this.state.id != "" ? (
							<ListForm iddqd={this.state.id} />
						) : (
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
						)}
						<div className="register">Register an event, then add a list of items and their quantities you'd like guests to bring!</div>
					</div>
				</form>
				</div>
				</center>
				<br />
			</div>
			</div>
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