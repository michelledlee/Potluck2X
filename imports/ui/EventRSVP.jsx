import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";

import List from "./List.jsx";
import ListForm from "./ListForm.jsx";

class EventRSVP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.event.name,
      date: this.props.event.date,
      time: this.props.event.time,
      description: this.props.event.description,
      list: this.props.event.list,
      attendees: this.props.event.rsvp
    };
  }

  renderAttendees() {
    return this.state.attendees.map((a, i) => <Attendee key={i++} attendee={a} />);
  }

  render() {
    return (
      <div className="Comment col-4">
      <span><strong>Attendees:</strong> {this.props.events.attendees}</span>
       <nav>
      <ol>
          {this.renderAttendees()}
      </ol>
      </nav>
      <br />
      </div>
      );
  }
}

EventRSVP.propTypes = {
  eventRSVP: PropTypes.object
};

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

export default withTracker(() => {
  const handle = Meteor.subscribe("events");
  return {
    attendee: Attendee.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(EventRSVP);