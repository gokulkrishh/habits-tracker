import constants from "./constants";
import initialState from "./initialState";

const HabitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_HABITS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default HabitsReducer;
