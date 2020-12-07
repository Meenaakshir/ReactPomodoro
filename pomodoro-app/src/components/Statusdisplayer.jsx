import React, { Component } from "react";

class StatusDisplayer extends Component {
  render() {
    return (
      <h2>{this.props.workingStatus ? "Working time !" : "Take a break"}</h2>
    );
  }
}

export default StatusDisplayer;
