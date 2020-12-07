//import React from "react";
import React, { Component } from "react";
class ClockDisplayer extends Component {
  render() {
    return (
      <div className="clockDisplay">
        {this.props.clockMinutes}
        <span> m</span>
        {this.props.clockSeconds === 0 ? (
          ""
        ) : this.props.clockSeconds < 10 ? (
          <div>
            {" "}
            0{this.props.clockSeconds}
            <span> s</span>
          </div>
        ) : (
          <div>
            {" "}
            {this.props.clockSeconds}
            <span> s</span>
          </div>
        )}
      </div>
    );
  }
}

export default ClockDisplayer;
