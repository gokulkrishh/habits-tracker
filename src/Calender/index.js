import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import cx from "classnames";

import "./styles.scss";

import constants from "../constants";

const Calender = () => {
  let calenderElement = useRef();
  const [state, setState] = useState({ active: dayjs().date() });

  useEffect(() => {
    if (calenderElement) {
      scrollToToday();
    }

    return () => {
      calenderElement = null;
    };
  }, []);

  const scrollToToday = () => {
    const todayElement = Array.from(calenderElement.children).filter(ele => ele.classList.contains("active"));
    if (todayElement.length) {
      todayElement[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  };

  const getDays = () => {
    const dateObj = new Date();
    const totalDaysInThisMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
    return Array.from(Array(totalDaysInThisMonth).keys());
  };

  const render = () => {
    const days = constants.DAYS;
    return getDays().map((day, index) => {
      const date = day + 1 < 9 ? `0${day + 1}` : `${day + 1}`;
      const dateFormattedString = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${date}`;
      const dayOfThisDate = days[dayjs(dateFormattedString).day()];
      const selectedDate = dayjs(dateFormattedString).date();
      return (
        <li
          key={day}
          className={cx({ active: state.active === selectedDate })}
          onClick={() => {
            setState({ active: selectedDate });
          }}
        >
          <span>{dayOfThisDate}</span>
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
        {render()}
      </ul>
    </div>
  );
};
export default Calender;
