import React, { Component } from "react";
//import "./App.css";

class ClockSetter extends Component {
  render() {
    return (
      <div>
        <h3 className="clockSetter_Label">{this.props.timeSetterLabel}</h3>
        <div className="clockSetter_Element">
          <button
            onClick={this.props.handleClickPlus}
            className="clockSetter_Button"
          >
            +
          </button>
          <div className="clockSetter_Numeral">
            {this.props.durationSetting}
          </div>
          <button
            onClick={this.props.handleClickMinus}
            className="clockSetter_Button"
          >
            -
          </button>
        </div>
      </div>
    );
  }
}
export default ClockSetter;
