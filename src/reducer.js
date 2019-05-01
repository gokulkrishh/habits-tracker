import constants from './constants'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SELECTED_DATE:
      return { ...state, selectedDate: action.payload }
    case constants.HABITS:
      return { ...state, habits: action.payload }
    case constants.SELECTED_HABIT:
      return { ...state, selectedHabit: action.payload }
    case constants.TOGGLE_ALL_HABITS_MODAL:
      return { ...state, isAllHabitsModalVisible: action.payload }
    case constants.TOGGLE_ADD_MODAL:
      return { ...state, isModalVisible: action.payload }
    case constants.GO_TO_TODAY:
      return { ...state, shouldGotoToday: action.payload }
    case constants.HIDE_INTRO_SCREEN:
      return { ...state, showIntroScreen: action.payload }
    default:
      return state
  }
}

export default reducer
