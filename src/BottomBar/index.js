import React from "react";

import "./styles.scss";

const BottomBar = () => {
  return (
    <div className="BottomBar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/streaks">Streaks</a>
        </li>
        <li>
          <a href="/">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
