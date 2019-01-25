import React, { Component } from "react";
import cx from "classnames";
import dayjs from "dayjs";

import "./styles.scss";

class AddHabit extends Component {
  state = {
    today: dayjs().format("DD MMM YYYY"),
    name: "",
    date: "",
    remind: ""
  };

  onChangeCallback = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
        <form className="form" autoComplete="off">
          <div className="form__group">
            <input type="text" placeholder="Name" name="name" />
          </div>

          <div className="form__group">
            <div className="form__subgroup">
              <input type="text" placeholder="Today" name="date" />
            </div>

            <div className="form__subgroup">
              <input type="text" placeholder="Remind" name="remind" />
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
