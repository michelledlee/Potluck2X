import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Events } from "../api/events.js";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.events.name,
      date: this.props.events.date,
      time: this.props.events.time,
      description: this.props.events.description
    };
  }

  render() {
    return (
      <div className="Comment col-4">
      <span><strong>Name: </strong> {this.props.events.name}</span><br />
      <span><strong>Date: </strong> {this.props.events.date}</span><br />
      <span><strong>Time: </strong> {this.props.events.time}</span><br />
      <span><strong>Description: </strong> {this.props.events.description}</span>
      
      <br />
      <p></p>
      </div>
      );
  }
}

Event.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("events");
  return {
    events: Events.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(Event);