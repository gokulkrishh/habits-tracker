import React, { useState } from "react";
import dayjs from "dayjs";

import localStorageUtils from "../localStorageUtils";
import constants from "../constants";

import Calender from "../Calender";
import Habits from "../Habits";

import "./styles.scss";

const Home = () => {
  const today = dayjs().format(constants.FORMAT.DATE);
  const [habits, setState] = useState(localStorageUtils.get(today));

  const showHabits = date => {
    setState(localStorageUtils.get(date));
  };

  return (
    <div className="Home">
      <h1>My Habits</h1>
      <Calender showHabits={showHabits} />
      <Habits habits={habits} />
    </div>
  );
};

export default Home;
