import dayjs from 'dayjs'

import constants from './constants'

export default {
  habits: [],
  isAllHabitsVisible: false,
  isModalVisible: false,
  selectedHabit: {},
  selectedDate: dayjs().format(constants.FORMAT.DATE)
}
