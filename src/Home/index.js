import React, { useState } from "react";
import dayjs from "dayjs";

import BottomBar from "../BottomBar";
import Calender from "../Calender";
import constants from "../constants";
import Habits from "../Habits";
import localStorageUtils from "../localStorageUtils";

import "./styles.scss";

const Home = () => {
  const today = dayjs().format(constants.FORMAT.DATE);
  const [habits, setHabits] = useState(localStorageUtils.get(today));

  const onHabitAdd = updatedHabits => {
    setHabits(updatedHabits);
  };

  return (
    <div className="Home">
      <h1>My Habits</h1>
      <Calender />
      <Habits habits={habits} />
      <BottomBar onHabitAdd={onHabitAdd} />
    </div>
  );
};

export default Home;
