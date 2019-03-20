import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { AutoForm } from "uniforms-semantic";
import { withTracker } from "meteor/react-meteor-data";

import Attendee from "./Attendee.jsx";
import { Events } from "../api/events.js";
import { Schema } from "./schema.js";

export default class ListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      item: "",
      quantity: "",
      iteminfo: ""
      // name: this.props.events.name,
      // date: this.props.events.date,
      // time: this.props.events.time,
      // description: this.props.events.description,
      // list: this.props.events.list,
      // createdAt: this.props.events.createdAt,
      // owner: this.props.events.owner
    };
  }

  renderList() {
    return this.state.list.map((l, i) => <List key={i++} list={l} />);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.itemname.value);
    console.log(this.quantityname.value);
    let iteminfo = this.itemname.value + this.quantityname.value;
        console.log(iteminfo);

    let data = { objid: this.state.id, iteminfo: iteminfo };
    Meteor.call("items.insert", data, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }
    });
  }

  render() {
    return (
      <div className="Comment col-4">
        <form
          className="form-signin"
          noValidate
          onSubmit={this.onSubmit}
        >
          <div className="form-label-group">
            <label htmlFor="item">Item</label>

            <input
              id="item"
              type="text"
              ref={input => (this.itemname = input)}
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="date">Quantity</label>
            <input
              id="quantity"
              type="quantity"
              ref={input => (this.quantityname = input)}
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

        <br />
      </div>
    );
  }
}

ListForm.propTypes = {
  iddqd: PropTypes.string
};

// export default withTracker(() => {
//   const handle = Meteor.subscribe("events");
//   return {
//     events: Events.find({}).fetch(),
//     user: Meteor.user(),
//     ready: handle.ready()
//   };
// })(ListForm);