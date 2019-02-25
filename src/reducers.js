import { combineReducers } from "redux";

import HabitsReducer from "./Habits/reducer";

export default combineReducers({
  habits: HabitsReducer
});
