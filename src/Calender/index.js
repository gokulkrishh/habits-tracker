import React, { Component } from "react";
import dayjs from "dayjs";

import "./styles.scss";

class Calender extends Component {
  state = {
    today: new Date().getDate(),
    totalDays: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };

  renderDays() {
    const { days, today, totalDays } = this.state;
    return Array.from(Array(totalDays).keys()).map((day, index) => {
      const date = `${new Date().getMonth() + 1}-${day + 1}-${new Date().getFullYear()}`;
      const dayOfDate = dayjs(date).day();
      return (
        <li key={day} className={today === dayjs(date).date() ? "active" : ""}>
          <span>{days[dayOfDate]}</span>
          <span>{day + 1}</span>
        </li>
      );
    });
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
