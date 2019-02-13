import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import AddSVG from "./add.svg";
import tickSVG from "./tick.svg";

import localStorageUtils from "../localStorageUtils";

import AddHabit from "../AddHabit";

import "./styles.scss";

const Habits = ({ habits }) => {
  const [state, setState] = useState({
    habits: habits,
    show: false
  });

  const { habits: savedHabits, show } = state;

  useEffect(() => {
    setState({ ...state, habits });
  });

  const updatedHabit = currentHabit => {
    let updateKey = null;
    savedHabits.forEach(habit => {
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
      setState({ ...state, habits });
    }
  };

  const renderHabits = () => {
    if (!savedHabits.length) {
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
        {savedHabits.map(habit => {
          return (
            <div className="card" key={habit.id}>
              <div className="card__left">
                <label className="card__checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={habit.done}
                    onClick={() => {
                      updatedHabit(habit);
                    }}
                  />
                  <span>
                    <img src={tickSVG} alt="done" />
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
      </>
    );
  };

  return (
    <div className="Habits">
      {renderHabits()}
      <div className="AddHabits">
        <button onClick={() => setState({ ...state, show: !show })} className="primary">
          <img src={AddSVG} alt="Add" /> Add Habits
        </button>
      </div>

      <AddHabit
        onClose={habits => {
          setState({ habits, show: !show });
        }}
        show={show}
      />
    </div>
  );
};

export default Habits;
