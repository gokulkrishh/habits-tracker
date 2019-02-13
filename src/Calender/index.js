import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import cx from "classnames";

import "./styles.scss";

import constants from "../constants";

const Calender = ({ showHabits }) => {
  let calenderElement = useRef();
  const today = dayjs().date();
  const [state, setState] = useState({ active: today });

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
      todayElement[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  };

  const renderDays = () => {
    const days = constants.DAYS;
    const totalDaysInThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    return Array.from(Array(totalDaysInThisMonth).keys()).map((day, index) => {
      const date = day + 1 < 9 ? `0${day + 1}` : `${day + 1}`;
      const dateFormattedString = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${date}`;
      const dayOfDate = dayjs(dateFormattedString).day();
      const habitsDate = dayjs(dateFormattedString).date();
      return (
        <li
          key={day}
          className={cx({ active: state.active === habitsDate })}
          onClick={() => {
            setState({ active: habitsDate });
            showHabits(dayjs(dateFormattedString).format(constants.FORMAT.DATE));
          }}
        >
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
