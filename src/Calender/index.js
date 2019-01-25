import React, { Component } from "react";

import "./styles.scss";

class Calender extends Component {
  state = {
    today: new Date().getDay(),
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };

  renderDays() {
    const { days, today } = this.state;
    return days.map((day, index) => (
      <li key={day} className={today === index ? "active" : ""}>
        <span>{day}</span>
        <span>25</span>
      </li>
    ));
  }

  render() {
    return (
      <div className="Calender">
        <ul className="Calender__days">{this.renderDays()}</ul>
      </div>
    );
  }
}
export default Calender;
