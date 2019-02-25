import React from "react";

import Calender from "../Calender";
import Habits from "../Habits";

import "./styles.scss";

const App = () => {
  return (
    <div className="App">
      <h1>My Habits</h1>
      <Calender />
      <Habits />
    </div>
  );
};

export default App;
