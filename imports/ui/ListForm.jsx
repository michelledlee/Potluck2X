import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

export default class ListForm extends Component {
  constructor(props) {
    super(props);

    this.itemname = "";
    this.quantityname = "";
    this.onSubmit = this.onSubmit.bind(this);
    this.onKey = this.onKey.bind(this);
    this.iddata = this.props.iddqd;
    this.state = {
      idd: this.props.iddqd,
      item: "",
      quantity: "",
      iteminfo: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state.idd);
    console.log(this.state.iddata);
  }

  onSubmit(event) {
    event.preventDefault();
    let iteminfo = this.itemname.value + this.quantityname.value;
    console.log(iteminfo);

    let data = { objid: this.iddata.value, iteminfo: iteminfo };
    Meteor.call("items.insert", data, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }
      console.log(res);
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {
      event.preventDefault();
      let iteminfo = this.itemname.value + "-" + this.quantityname.value;
      console.log(iteminfo);

      let data = { objid: this.state.idd, iteminfo: iteminfo };
      Meteor.call("items.insert", data, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        } else {
          console.log("Item added");
          console.log("Message inserted", res);
          this.itemname.value = "";
          this.quantityname.value = "";
        }
      });
    }
  }

  render() {
    return (
      <div>
        <form className="form-signin" onKeyPress={this.onKey.bind(this)}>
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
          <div className="form-label-group" />
        </form>

        <br />
      </div>
    );
  }
}

ListForm.propTypes = {
  iddqd: PropTypes.string
};