import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { AutoForm } from "uniforms-semantic";
import { withTracker } from "meteor/react-meteor-data";

import Attendee from "./Attendee.jsx";
import { Events } from "../api/events.js";
import { Schema } from "./schema.js";

class ListForm extends Component {
  constructor() {
    super();

    this.state = {
      list: ""
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

  onClick(e) {
    const list = {
      name: this.state.name,
      quantity: this.state.quantity,
    };

    //meteor call to insert
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
                    <label htmlFor="name">Name</label>

                    <input
                      onChange={this.onChange}
                      value={this.state.name}
                      id="name"
                      type="text"
                    />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="date">Quantity</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.quantity}
                      id="quantity"
                      type="quantity"
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
  ListForm: PropTypes.object
};

export default withTracker(() => {
  const handle = Meteor.subscribe("events");
  return {
    events: Events.find({}).fetch(),
    user: Meteor.user(),
    ready: handle.ready()
  };
})(ListForm);