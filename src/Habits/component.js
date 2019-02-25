import React from "react";

import AddSVG from "./add.svg";
import TickSVG from "./tick.svg";

import "./styles.scss";

const HabitsComponent = ({ habits }) => {
  const render = () => {
    if (!habits.length) {
      return (
        <div className="Habits__empty">
          <h2>
            Add a new habit
            <span role="img" aria-label="geeky emoji">
              🤓
            </span>
          </h2>
        </div>
      );
    }

    return (
      <>
        {habits.map(habit => {
          return (
            <div className="card" key={habit.id} onMouseDown={() => {}}>
              <div className="card__left">
                <label className="card__checkbox">
                  <input type="checkbox" defaultChecked={habit.done} onClick={() => {}} />
                  <span>
                    <img src={TickSVG} alt="done" />
                  </span>
                </label>

                <div className="card__info">
                  <h3 className="name">{habit.name}</h3>
                  <span className="time">{habit.time}</span>
                  <span className="notes">{habit.notes}</span>
                </div>
              </div>
              <div className="card__right">
                <span className="steaks">{habit.steaks} in a row</span>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="Habits">
      {render(habits)}
      <div className="AddHabits">
        <button onClick={() => {}} className="primary">
          <img src={AddSVG} alt="Add" />
          Add Habits
        </button>
      </div>
    </div>
  );
};

export default HabitsComponent;
