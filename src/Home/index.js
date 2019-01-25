import React from "react";
import dayjs from "dayjs";

import Calender from "../Calender";
import Habits from "../Habits";
import localStorageUtils from "../localStorageUtils";

import "./styles.scss";

const Home = props => {
  const today = dayjs().format("DD-MMM-YYYY");
  const habits = localStorageUtils.get(today);
  console.log("habits --->", habits); // eslint-disable-line
  return (
    <div className="Home">
      <h1>My Habits</h1>
      <Calender />
      <Habits habits={habits} />
    </div>
  );
};

export default Home;
