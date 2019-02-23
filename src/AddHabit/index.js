import React, { useReducer } from "react";
import cx from "classnames";
import dayjs from "dayjs";

import constants from "../constants";
import localStorageUtils from "../localStorageUtils";

import "./styles.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "time":
      return { ...state, time: action.payload };
    case "notes":
      return { ...state, notes: action.payload };
    case "reminders":
      return { ...state, reminders: action.payload };
    case "reset":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AddHabit = ({ onClose, show, onAdd }) => {
  const initialState = {
    name: "",
    time: "",
    notes: "",
    reminders: constants.DAYS.slice()
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onFormSubmit = event => {
    event.preventDefault();
    const { name, notes, time, reminders } = state;
    const date = dayjs();
    const today = date.format(constants.FORMAT.DATE);
    const request = {
      id: date.unix(),
      createdDate: today,
      createdDay: date.day(),
      done: false,
      steaks: 0,
      reminders,
      notes,
      name,
      time
    };
    const updatedHabitData = localStorageUtils.set(today, request);
    dispatch({ type: "reset", payload: initialState });
    onAdd(updatedHabitData);
  };

  const reminderClickCallback = day => {
    const selectedDay = state.reminders.indexOf(day);
    if (selectedDay > -1) {
      state.reminders.splice(selectedDay, 1);
    } else {
      const actualIndex = constants.DAYS.indexOf(day);
      state.reminders.splice(actualIndex, 0, day);
    }
    dispatch({ type: "reminders", payload: state.reminders });
  };

  return (
    <>
      <div className={cx("Modal", { show })}>
        <div className="AddHabit">
          <h2>Add Habit</h2>
          <form className="form" autoComplete="off" onSubmit={onFormSubmit}>
            <div className="form__group">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Go for jog"
                name="name"
                onChange={event => {
                  dispatch({ type: "name", payload: event.target.value });
                }}
                value={state.name}
                required
              />
            </div>

            <div className="form__group form__group-row">
              <div>
                <label>Time:</label>
                <input
                  type="text"
                  placeholder="6 AM or 8 PM"
                  name="time"
                  onChange={event => {
                    dispatch({ type: "time", payload: event.target.value });
                  }}
                  value={state.time}
                  required
                />
              </div>

              <div>
                <label>Note:</label>
                <input
                  type="text"
                  placeholder="(Optional)"
                  name="note"
                  onChange={event => {
                    dispatch({ type: "note", payload: event.target.value });
                  }}
                  value={state.note}
                />
              </div>
            </div>

            <div className="form__group">
              <label>Days:</label>
              <div className="form__days">
                {constants.DAYS.map(day => {
                  const isActive = state.reminders.indexOf(day) > -1;
                  return (
                    <span
                      className={cx({ active: isActive })}
                      key={day}
                      onClick={() => {
                        reminderClickCallback(day);
                      }}
                    >
                      {day.charAt(0)}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="form__group">
              <div className="form__group-row">
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button className="primary">Add Habit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className={cx("Modal__overlay", { show })}
        onClick={() => {
          onClose();
        }}
      />
    </>
  );
};

export default AddHabit;
