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
    case "note":
      return { ...state, note: action.payload };
    case "reminders":
      return { ...state, reminders: action.payload };
    default:
      return state;
  }
};

const AddHabit = ({ onHabitAdd, onClose, show }) => {
  const initialState = {
    name: "",
    time: "",
    note: "",
    reminders: constants.DAYS.slice()
  };

  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const onFormSubmit = async event => {
    event.preventDefault();
    const { name, note, time } = state;
    const date = dayjs();
    const today = date.format(constants.FORMAT.DATE);
    await localStorageUtils.set(today, {
      id: date.unix(),
      createdDate: today,
      createdDay: date.day(),
      remainders: constants.remainders,
      note,
      name,
      time
    });
    dispatch(initialState);
    onClose();
    onHabitAdd(localStorageUtils.get(today));
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
      <div className={cx("AddHabit", { show })}>
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
      <div
        className={cx("AddHabit__overlay", { show })}
        onClick={() => {
          onClose();
        }}
      />
    </>
  );
};

export default AddHabit;
