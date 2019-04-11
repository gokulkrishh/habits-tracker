import dayjs from 'dayjs'

import constants from './constants'

export default {
  habits: [],
  isAllHabitsModalVisible: false,
  isModalVisible: false,
  selectedDate: dayjs().format(constants.FORMAT.DATE),
  selectedHabit: {},
  showToday: false
}
