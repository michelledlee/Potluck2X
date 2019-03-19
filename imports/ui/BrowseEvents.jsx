import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Events } from "../api/events.js";

import EventRSVP from "./EventRSVP.jsx";


class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  // getAllEvents() {
  //   fetch("/getallevents")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("got all events!", data);
  //       this.setState({
  //         events: data
  //       });
  //     });
  // }

  // componentDidMount() {
  //   this.getAllEvents();
  // }

  renderEvents() {
    // return this.state.events.map((eve, i) => <EventRSVP key={i++} event={eve} />);

    return this.props.events.map(m =>
      <div className="card" key={m._id}>{m.owner} : {m.event}</div>);
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align" style={{ padding: "100px" }}>
            <p>Look at all these events:</p>

            <div className="row">{this.renderEvents()}</div>

          </div>
        </div>
      </div>
    );
  }
}

// BrowseEvents.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default withTracker(() => {
  const handle = Meteor.subscribe("events");
  return {
    events: Events.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(BrowseEvents);