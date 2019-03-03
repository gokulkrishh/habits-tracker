import constants from './constants'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SELECTED_DATE:
      return { ...state, selectedDate: action.payload }
    case constants.HABITS:
      return { ...state, habits: action.payload }
    case constants.SHOW_ALL_HABITS:
      return { ...state, isAllHabitsVisible: action.payload }
    default:
      return state
  }
}

export default reducer
