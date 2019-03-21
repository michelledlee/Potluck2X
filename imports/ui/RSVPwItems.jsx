import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";

import { Events } from "../api/events.js";


export default class RSVPwItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.thelist
    };
  }

  onSubmit() {
    event.preventDefault();
    let data = { name: this.itemname.value, date: this.itemquantity.value };
    Meteor.call("events.rsvp", data, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }
      console.log(res);
    });
  }

  renderTheSelection() {
    return this.state.list.map((eve, i) => <option key={i++} value={this.state.list[i]}>{this.state.list[i]}</option>);
  }

  makeSelectBox() {
    console.log(this.state.list.length);
    for (let i = 0; i < this.state.list.length; i++) {
      console.log(this.state.list[i]);
      <option key={i+=2} value={this.state.list[i]}>{this.state.list[i]}</option>
    }
  }

  render() {
    return (
      <div className="form-group">
      <label htmlFor="optionsselect">Bringing Item:</label>
      <select className="form-control" id="optionsselect"> 
      {/*this.makeSelectBox()*/};
      {this.renderTheSelection()}
      </select>
      </div>
      );
  }
}

RSVPwItems.propTypes = {
  thelist: PropTypes.arrayOf(PropTypes.string).isRequired
};

// export default withTracker(() => {
//   const handle = Meteor.subscribe("events");
//   return {
//     events: Events.find({}).fetch(),
//     user: Meteor.user(),
//     ready : handle.ready()
//   };
// })(RSVPwItems);