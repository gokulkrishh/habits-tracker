import React, { useEffect } from "react";
import dayjs from "dayjs";
import cx from "classnames";

import "./styles.scss";
import constants from "../constants";

const Calender = () => {
  let calenderElement = null;
  const today = dayjs().date();

  useEffect(() => {
    if (calenderElement) {
      scrollTodayIntoMiddle();
    }

    return () => {
      calenderElement = null;
    };
  }, []);

  const scrollTodayIntoMiddle = () => {
    const todayElement = Array.from(calenderElement.children).filter(ele => ele.classList.contains("active"));
    if (todayElement.length) {
      todayElement[0].scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
    }
  };

  const renderDays = () => {
    const days = constants.DAYS;
    const totalDaysInThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    return Array.from(Array(totalDaysInThisMonth).keys()).map((day, index) => {
      const date = day + 1 < 9 ? `0${day + 1}` : `${day + 1}`;
      const dateFormatted = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${date}`;
      const dayOfDate = dayjs(dateFormatted).day();
      return (
        <li key={day} className={cx({ active: today === dayjs(dateFormatted).date() })}>
          <span>{days[dayOfDate]}</span>
          <span>{day + 1}</span>
        </li>
      );
    });
  };

  return (
    <div className="Calender">
      <ul
        className="Calender__days"
        ref={ref => {
          calenderElement = ref;
        }}
      >
        {renderDays()}
      </ul>
    </div>
  );
};
export default Calender;
