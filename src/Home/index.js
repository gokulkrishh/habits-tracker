import React from "react";
import dayjs from "dayjs";

import Habits from "../Habits";
import BottomBar from "../BottomBar";
import Calender from "../Calender";
import localStorageUtils from "../localStorageUtils";

import "./styles.scss";

const Home = () => {
  const today = dayjs().format("DD-MMM-YYYY");
  const habits = localStorageUtils.get(today);

  return (
    <div className="Home">
      <h1>My Habits</h1>
      <Calender />
      <Habits habits={habits} />
      <BottomBar />
    </div>
  );
};

export default Home;
