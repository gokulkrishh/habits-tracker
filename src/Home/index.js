import React from "react";

import Calender from "../Calender";

import "./styles.scss";

const Home = props => {
  return (
    <div className="Home">
      <h1>My Habits</h1>
      <Calender />
    </div>
  );
};

export default Home;
