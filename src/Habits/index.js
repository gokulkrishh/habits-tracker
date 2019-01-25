import React from "react";

import "./styles.scss";

const Habits = props => {
  console.log("props.habits --->", props.habits); // eslint-disable-line

  if (!props.habits.length)
    return (
      <div className="Habits__empty">
        <p>Add a new habit 🤓</p>
      </div>
    );

  return (
    <div className="Habits">
      {props.habits.map(habit => {
        return (
          <div className="card" key={habit.id}>
            <label className="card__checkbox">
              <input type="checkbox" checked={habit.done} />
              <span />
            </label>
            <div className="card__info">
              <h3 className="name">{habit.name}</h3>
              <span className="time">{habit.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Habits;
