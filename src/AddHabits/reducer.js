const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload }
    case 'time':
      return { ...state, time: action.payload }
    case 'notes':
      return { ...state, notes: action.payload }
    case 'reminders':
      return { ...state, reminders: action.payload }
    case 'reset':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default reducer
