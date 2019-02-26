import React from "react";
import cx from "classnames";
import dayjs from "dayjs";

import constants from "../constants";
import localStorageUtils from "../localStorageUtils";

import DeleteSVG from "./delete.svg";

import "./styles.scss";

const HabitActions = ({ onClose, onUpdate, selected, show }) => {
  const today = dayjs().format(constants.FORMAT.DATE);

  const onAction = () => {
    const updatedHabits = localStorageUtils.remove(today, selected.id);
    onUpdate(updatedHabits);
    onClose();
  };

  return (
    <>
      <div className={cx("Modal", { show })}>
        <div className="HabitActions">
          <ul>
            <li className="delete" onClick={onAction}>
              <img src={DeleteSVG} alt="Delete" />
              <span>Delete Habit</span>
            </li>
          </ul>
          <button
            className="cancel"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
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

export default HabitActions;
