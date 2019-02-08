import React, { useState } from "react";

import AddSVG from "./add.svg";

import "./styles.scss";
import AddHabit from "../AddHabit";

const BottomBar = ({ onHabitAdd }) => {
  const [show, setShowState] = useState(false);
  return (
    <div className="BottomBar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <button onClick={() => setShowState(!show)}>
            <img src={AddSVG} alt="Add" />
          </button>
        </li>
        <li>
          <a href="/progress">Streaks</a>
        </li>
      </ul>

      <AddHabit onHabitAdd={onHabitAdd} onClose={() => setShowState(!show)} show={show} />
    </div>
  );
};

export default BottomBar;
