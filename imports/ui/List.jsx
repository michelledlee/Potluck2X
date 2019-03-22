import React, { Component } from "react";
import PropTypes from "prop-types";

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list
    };
  }

  render() {
    return (
      <li><span>{this.props.list}</span></li>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired
};