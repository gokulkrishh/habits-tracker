import React, { Component } from "react";
import cx from "classnames";
import dayjs from "dayjs";

import localStorageUtils from "../localStorageUtils";

import "./styles.scss";

class AddHabit extends Component {
  state = {
    today: dayjs().format("DD-MMM-YYYY"),
    name: "",
    time: "",
    reminder: "",
    storage: localStorageUtils.getNamespace() || {}
  };

  resetForm() {
    this.setState({ name: "", time: "", reminder: "" });
  }

  onChangeCallback = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitCallback = event => {
    event.preventDefault();
    const { name, time, reminder, today, storage } = this.state;
    const request = {
      created_date: today,
      created_day: dayjs().day(),
      id: Date.now(),
      name,
      time,
      reminder
    };

    console.log("storage --->", storage); // eslint-disable-line

    if (!Array.isArray(storage[today])) {
      storage[today] = [request];
    } else {
      storage[today].push(request);
    }
    localStorageUtils.set(today, request);
    this.resetForm();
    this.props.onClose();
  };

  render() {
    const { show, onClose } = this.props;
    return (
      <div className={cx("AddHabit", { show })}>
        <div className="close" onClick={onClose}>
          <span />
          <span />
        </div>
        <h2>Add Habit</h2>
        <form
          className="form"
          autoComplete="off"
          onSubmit={this.onSubmitCallback}
        >
          <div className="form__group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.onChangeCallback}
            />
          </div>

          <div className="form__group">
            <div className="form__subgroup">
              <input
                type="text"
                placeholder="Today"
                name="time"
                onChange={this.onChangeCallback}
              />
            </div>

            <div className="form__subgroup">
              <input
                type="text"
                placeholder="Reminder"
                name="reminder"
                onChange={this.onChangeCallback}
              />
            </div>
          </div>

          <div className="form__group">
            <button>Add Habit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddHabit;
