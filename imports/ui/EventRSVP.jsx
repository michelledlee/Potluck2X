import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";

import Attendee from "./Attendee.jsx";
import List from "./List.jsx";
import Event from "./Event.jsx";
import ListForm from "./ListForm.jsx";


class EventRSVP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.events.name,
      date: this.props.events.date,
      time: this.props.events.time,
      description: this.props.events.description,
      list: this.props.events.list,
      attendees: this.props.events.rsvp
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  renderList() {
    return this.state.list.map((l, i) => <List key={i++} list={l} />);
  }
  
  renderAttendees() {
    return this.state.attendees.map((a, i) => <Attendee key={i++} attendee={a} />);
  }

  onClick(e) {
    // RSVP this person, need a meteor method for this
  }

  render() {
    return (
      <div className="Comment col-4">
      <p>
      <span><strong>Name:</strong> {this.props.events.name}</span><br />
      <span><strong>Date:</strong> {this.props.events.date}</span><br />
      <span><strong>Time:</strong> {this.props.events.time}</span><br />
      <span className="spandescription"><strong>Description: </strong> {this.props.events.description}</span>
      </p>
      <span><strong>List:</strong> {this.props.events.list}</span>
            <span><strong>Attendees:</strong> {this.props.events.attendees}</span>
             <nav>
            <ol>
                {this.renderAttendees()}
            </ol>
        </nav>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
        }}
        type="submit"
        className="btn btn-lg btn-primary btn-block text-uppercase"
        onClick={this.onClick.bind(this)}>
        RSVP
      </button>
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