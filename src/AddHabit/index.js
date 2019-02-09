import React, { useState } from "react";
import cx from "classnames";
import dayjs from "dayjs";

import constants from "../constants";
import localStorageUtils from "../localStorageUtils";

import "./styles.scss";

const AddHabit = ({ onHabitAdd, onClose, show }) => {
  const initialState = {
    name: "",
    time: "",
    note: "",
    reminders: constants.DAYS.slice()
  };

  const [form, setState] = useState(initialState);

  const onFormSubmit = async event => {
    event.preventDefault();
    const { name, note, time } = form;
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
    setState(initialState);
    onClose();
    onHabitAdd(localStorageUtils.get(today));
  };

  const reminderClickCallback = day => {
    const selectedDay = form.reminders.indexOf(day);
    if (selectedDay > -1) {
      form.reminders.splice(selectedDay, 1);
    } else {
      const actualIndex = constants.DAYS.indexOf(day);
      form.reminders.splice(actualIndex, 0, day);
    }
    setState({ ...form });
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
                setState({ ...form, name: event.target.value });
              }}
              value={form.name}
              required
            />
          </div>

          <div className="form__group form__group-row">
            <div>
              <label>Time:</label>
              <input
                type="text"
                placeholder="Like 6 AM"
                name="time"
                onChange={event => {
                  setState({ ...form, time: event.target.value });
                }}
                value={form.time}
                required
              />
            </div>

            <div>
              <label>Note:</label>
              <input
                type="text"
                placeholder="Note (Optional)"
                name="note"
                onChange={event => {
                  setState({ ...form, note: event.target.value });
                }}
                value={form.note}
              />
            </div>
          </div>

          <div className="form__group">
            <label>Days:</label>
            <div className="form__days">
              {constants.DAYS.map(day => {
                const isActive = form.reminders.indexOf(day) > -1;
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
