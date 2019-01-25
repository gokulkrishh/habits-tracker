import React, { Component } from "react";

import AddSVG from "./add.svg";

import "./styles.scss";
import AddHabit from "../AddHabit";

class BottomBar extends Component {
  state = {
    showAddHabit: false
  };

  showAddHabitCallback = () => {
    this.setState({ showAddHabit: !this.state.showAddHabit });
  };

  render() {
    const { showAddHabit } = this.state;

    return (
      <div className="BottomBar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <button onClick={this.showAddHabitCallback}>
              <img src={AddSVG} alt="Add" />
            </button>
          </li>
          <li>
            <a href="/progress">Progress</a>
          </li>
        </ul>

        <AddHabit show={showAddHabit} onClose={this.showAddHabitCallback} />
      </div>
    );
  }
}

export default BottomBar;
