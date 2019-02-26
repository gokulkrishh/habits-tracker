import React, { useState } from "react";
import dayjs from "dayjs";

import localStorageUtils from "../localStorageUtils";
import constants from "../constants";

import Calender from "../Calender";
import Habits from "../Habits";

import "./styles.scss";

const Home = () => {
  const today = dayjs().format(constants.FORMAT.DATE);
  const [state, setState] = useState({ shouldScrollToSelectedDay: false, selectedDate: today });

  const showHabits = selectedDate => {
    setState({ shouldScrollToSelectedDay: false, selectedDate });
  };

  const scrollToSelectedDay = () => {
    setState({ shouldScrollToSelectedDay: true, selectedDate: today });
  };

  const { selectedDate, shouldScrollToSelectedDay } = state;
  const habits = localStorageUtils.get(selectedDate) || [];

  return (
    <div className="Home">
      <h1 onClick={scrollToSelectedDay}>My Habits</h1>
      <Calender showHabits={showHabits} shouldScrollToSelectedDay={shouldScrollToSelectedDay} />
      <Habits habits={habits} />
    </div>
  );
};

export default Home;
