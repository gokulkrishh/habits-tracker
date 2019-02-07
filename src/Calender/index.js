import React, { Component } from "react";
import dayjs from "dayjs";
import cx from "classnames";

import "./styles.scss";

class Calender extends Component {
  cal = null;

  state = {
    today: dayjs().date(),
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };

  componentDidMount() {
    this.scrollTodayIntoMiddle();
  }

  scrollTodayIntoMiddle() {
    const todayElement = Array.from(this.cal.children).filter(ele => ele.classList.contains("active"));
    if (todayElement.length) {
      todayElement[0].scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
    }
  }

  renderDays() {
    const { days, today } = this.state;
    const totalDaysInThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    return Array.from(Array(totalDaysInThisMonth).keys()).map((day, index) => {
      const date = `${new Date().getMonth() + 1}-${day + 1}-${new Date().getFullYear()}`;
      const dayOfDate = dayjs(date).day();
      return (
        <li key={day} className={cx({ active: today === dayjs(date).date() })}>
          <span>{days[dayOfDate]}</span>
          <span>{day + 1}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="Calender">
        <ul
          className="Calender__days"
          ref={ref => {
            this.cal = ref;
          }}
        >
          {this.renderDays()}
        </ul>
      </div>
    );
  }
}
export default Calender;
