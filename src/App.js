import { createGlobalStyle } from 'styled-components'
import dayjs from 'dayjs'
import { useDispatch, useMappedState } from 'redux-react-hook'
import React, { useCallback, useEffect } from 'react'

import { Button, Title } from './Components'
import AddHabits from './AddHabits'
import AllHabits from './AllHabits'
import Calender from './Calender'
import constants from './constants'
import db from './database'
import Habits from './Habits'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root, .App {
    height: 100%;
  }

  body {
    background-color: #f7f7f7;
    color: #272730;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: 500;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  h1 {
    font-size: 28px;
  }

  ul {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .form__days {
    min-width: 300px;
    max-width: 350px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      width: 40px;
      height: 40px;
      background-color: #EEEEEE;
      border-radius: 50%;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: space-around;

      &.active {
        background-color: #2974ff;
        color: #fff;
      }
    }
  }

  button {
    width: 50%;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    margin: 5px 0;
    cursor: pointer;
    margin-top: 15px;
    user-select: none;
  }

  button + button {
    margin-left: 20px;
  }

  .readonly {
    opacity: 0.6;
    pointer-events: none;
  }
`

const App = () => {
  const dispatch = useDispatch()
  const mapState = useCallback(state => state, [])
  const { habits, selectedDate, isAllHabitsModalVisible } = useMappedState(mapState)
  const selectedDay = dayjs(selectedDate).day()

  useEffect(() => {
    getHabits()
  }, [])

  const getHabits = async () => {
    const collection = await db.habits.toArray()
    const habits = collection.filter(habit => {
      return habit.reminders.indexOf(constants.DAYS[selectedDay]) > -1 && !dayjs(habit.created).isAfter(selectedDate)
    })
    dispatch({ type: constants.HABITS, payload: habits })
  }

  const onClickAllHabits = () => {
    dispatch({ type: constants.TOGGLE_ALL_HABITS_MODAL, payload: true })
  }

  return (
    <div className="App">
      <GlobalStyles />
      <Title>
        My Habits
        <Button
          appearance="primary"
          size="small"
          onClick={() => {
            onClickAllHabits()
          }}
        >
          All Habits
        </Button>
      </Title>
      <Calender />
      <AddHabits />
      <Habits habits={habits} selectedDate={selectedDate} />
      <AllHabits show={isAllHabitsModalVisible} />
    </div>
  )
}

export default App
