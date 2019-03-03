import dayjs from 'dayjs'

import constants from './constants'

const today = dayjs().format(constants.FORMAT.DATE)
export default { selectedDate: today, habits: [], isAllHabitsVisible: false }
