import React, { useState } from "react";

import AddSVG from "./add.svg";

import "./styles.scss";
import AddHabit from "../AddHabit";

const BottomBar = ({ onHabitAdd }) => {
  const [show, setShowState] = useState(false);
  return (
    <div className="BottomBar">
      {/* <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li> */}
      <button onClick={() => setShowState(!show)} className="primary">
        <img src={AddSVG} alt="Add" /> Add Habits
      </button>
      {/* </li>
        <li>
          <a href="/streaks">Streaks</a>
        </li>
      </ul> */}

      <AddHabit onHabitAdd={onHabitAdd} onClose={() => setShowState(!show)} show={show} />
    </div>
  );
};

export default BottomBar;
