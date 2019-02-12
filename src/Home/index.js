import React from "react";
import dayjs from "dayjs";

import localStorageUtils from "../localStorageUtils";
import constants from "../constants";

import Calender from "../Calender";
import Habits from "../Habits";

import "./styles.scss";

const Home = () => {
  const today = dayjs().format(constants.FORMAT.DATE);
  const habits = localStorageUtils.get(today);

  return (
    <div className="Home">
      <h1>My Habits</h1>
      <Calender />
      <Habits habits={habits} />
    </div>
  );
};

export default Home;
