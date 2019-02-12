import React, { useCallback } from "react";
import dayjs from "dayjs";

import constants from "../constants";
import localStorageUtils from "../localStorageUtils";
import tickSVG from "./tick.svg";

import "./styles.scss";

const Habits = () => {
  const today = dayjs().format(constants.FORMAT.DATE);
  let habits = localStorageUtils.get(today);

  const updatedHabit = currentHabit => {
    let updateKey = null;
    habits.forEach(habit => {
      if (habit.id === currentHabit.id) {
        updateKey = habit.createdDate;
        habit.done = !habit.done;
        if (habit.done) habit.steaks = 1;
        else {
          habit.steaks -= 1;
        }
      }
    });

    if (updateKey) {
      localStorageUtils.update(updateKey, habits);
      habits = localStorageUtils.get(today);
    }
  };

  if (!habits.length)
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

  return (
    <div className="Habits">
      {habits.map(habit => {
        return (
          <div className="card" key={habit.id}>
            <div className="card__left">
              <label className="card__checkbox">
                <input type="checkbox" defaultChecked={habit.done} />
                <span>
                  <img
                    src={tickSVG}
                    alt="done"
                    onClick={() => {
                      updatedHabit(habit);
                    }}
                  />
                </span>
              </label>

              <div className="card__info">
                <h3 className="name">{habit.name}</h3>
                <span className="time">{habit.time}</span>
                <span className="time">{habit.notes}</span>
              </div>
            </div>
            <div className="card__right">
              <span className="steaks">{habit.steaks} in a row</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Habits;
