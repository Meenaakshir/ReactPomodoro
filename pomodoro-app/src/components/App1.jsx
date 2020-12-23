import React, { Component } from "react";
import Statusdisplayer from "./Statusdisplayer.jsx";
import ClockDisplayer from "./ClockDisplayer";
import ClockSetter from "./ClockSetter.jsx";

class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      working: true,
      running: false,
      pause: false,
      totalSeconds: 25 * 60,
      clockMinutes: 25,
      clockSeconds: 0,
      workDuration: 25,
      breakDuration: 5,
      clock: null,
    };
  } //constructor

  componentWillUpdate() {
    if (this.state.totalSeconds === 0 && this.state.working) {
      this.setState({
        working: !this.state.working,
        totalSeconds: this.state.breakDuration * 60,
        clockMinutes: this.state.breakDuration,
        clockSeconds: 0,
      });
    } else if (this.state.totalSeconds === 0 && !this.state.working) {
      this.setState({
        working: !this.state.working,
        totalSeconds: this.state.workDuration * 60,
        clockMinutes: this.state.workDuration,
        clockSeconds: 0,
      });
    }
  }

  clickStart() {
    console.log("startt");
    /*  if (this.state.pause == null) {
      this.setState({ pause: false });
    }*/
    if (this.state.running === false)
      this.setState({
        clock: setInterval(() => {
          this.setState({ totalSeconds: this.state.totalSeconds - 1 }, () => {
            this.setState(
              {
                clockMinutes: Math.floor(this.state.totalSeconds / 60),
              },
              () => {
                this.setState({
                  clockSeconds:
                    this.state.totalSeconds - this.state.clockMinutes * 60,
                });
              }
            );
          });
        }, 1000),
        running: true,
      });
  }

  clickPause() {
    console.log("pause");
    clearInterval(this.state.clock);
    this.setState({
      pause: true,
      running: false,
    });
  }

  clickReset() {
    console.log("stop");
    clearInterval(this.state.clock);
    this.state.working
      ? this.setState({
          running: false,
          totalSeconds: this.state.workDuration * 60,
          clockMinutes: this.state.workDuration,
          clockSeconds: 0,
        })
      : this.setState({
          running: false,
          totalSeconds: this.state.breakDuration * 60,
          clockMinutes: this.state.breakDuration,
          clockSeconds: 0,
        });
  }

  setWorkTime(e) {
    switch (e) {
      case "+":
        this.setState(
          {
            workDuration: this.state.workDuration + 1,
          },
          () => {
            if (
              !this.state.running &&
              this.state.working &&
              !this.state.pause
            ) {
              this.setState({
                clockMinutes: this.state.clockMinutes + 1,
                totalSeconds: this.state.workDuration * 60,
              });
            }
          }
        );
        break;

      case "-":
        if (this.state.workDuration < 2 || null)
          this.setState(
            {
              workDuration: this.state.workDuration - 1,
            },
            () => {
              if (
                !this.state.running &&
                this.state.working &&
                !this.state.pause
              ) {
                this.setState({
                  clockMinutes: this.state.clockMinutes - 1,
                  totalSeconds: this.state.workDuration * 60,
                });
              }
            }
          );
        break;
      case "default":
        console.log("cannot set time");
        break;
    }
  }

  setBreakTime(e) {
    switch (e) {
      case "+":
        this.setState(
          {
            breakDuration: this.state.breakDuration + 1,
          },
          () => {
            if (
              !this.state.running &&
              !this.state.working &&
              !this.state.pause
            ) {
              this.setState({
                clockMinutes: this.state.clockMinutes + 1,
                totalSeconds: (this.state.breakDuration + 1) * 60,
              });
            }
          }
        );
        break;

      case "-":
        if (this.state.breakDuration < 2 || null)
          this.setState(
            {
              breakDuration: this.state.breakDuration - 1,
            },
            () => {
              if (
                !this.state.running &&
                !this.state.working &&
                !this.state.pause
              ) {
                this.setState({
                  clockMinutes: this.state.clockMinutes - 1,
                  totalSeconds: this.state.breakDuration * 60,
                });
              }
            }
          );
        break;
      case "default":
        console.log("cannot set time");
        break;
    }
  }

  render() {
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <div className="App">
          <Statusdisplayer workingStatus={this.state.working} />
          <ClockDisplayer
            clockMinutes={this.state.clockMinutes}
            clockSeconds={this.state.clockSeconds}
          />
          <div className="startPauseStop">
            <button onClick={(e) => this.clickStart(e)}>Start</button>
            <button onClick={(e) => this.clickPause(e)}>Pause</button>
            <button onClick={(e) => this.clickReset(e)}>Reset</button>
          </div>
          <div className="clockSetter">
            <ClockSetter
              timeSetterLabel="Working session"
              handleClickPlus={() => this.setWorkTime("+")}
              handleClickMinus={() => this.setWorkTime("-")}
              durationSetting={this.state.workDuration}
            />
            <ClockSetter
              timeSetterLabel="Break session"
              handleClickPlus={() => this.setBreakTime("+")}
              handleClickMinus={() => this.setBreakTime("-")}
              durationSetting={this.state.breakDuration}
            />
          </div>
        </div>
      </div>
    );
  } //render
}
export default App1;
