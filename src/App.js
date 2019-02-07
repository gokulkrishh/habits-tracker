import React from "react";
import dayjs from "dayjs";

import Home from "./Home";
import Habits from "./Habits";
import BottomBar from "./BottomBar";

import localStorageUtils from "./localStorageUtils";

import "./App.scss";

const App = props => {
  const today = dayjs().format("DD-MMM-YYYY");
  const habits = localStorageUtils.get(today);

  return (
    <div className="App">
      <Home />
      <Habits habits={habits} />
      <BottomBar />
    </div>
  );
};

export default App;
