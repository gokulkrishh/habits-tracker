import dayjs from 'dayjs'

import constants from './constants'

export default {
  habits: [],
  isModalVisible: false,
  isAllHabitsModalVisible: false,
  selectedDate: dayjs().format(constants.FORMAT.DATE)
}
