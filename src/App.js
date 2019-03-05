import React, { useReducer, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import dayjs from 'dayjs'

import { Button, H1 } from './Components'
import AddHabits from './AddHabits'
import Calender from './Calender'
import constants from './constants'
import Context from './context'
import Database from './Database'
import Habits from './Habits'
import initialState from './initialState'
import reducer from './reducer'
import AllHabits from './AllHabits'

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
`

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { habits, isAllHabitsVisible, isModalVisible, selectedHabit, selectedDate } = state

  const selectedDay = dayjs(selectedDate).day()

  const getHabits = async () => {
    let collection = await Database.habits.toArray()
    const habits = collection.filter(habit => {
      return habit.reminders.indexOf(constants.DAYS[selectedDay]) > -1 && !dayjs(habit.created).isAfter(selectedDate)
    })

    dispatch({ type: constants.HABITS, payload: habits })
  }

  useEffect(() => {
    Database.on('changes', () => {
      getHabits()
    })
  }, [])

  useEffect(() => {
    getHabits()
  }, [selectedDate, habits])

  const toggleAllHabits = () => {
    dispatch({ type: constants.SHOW_ALL_HABITS, payload: !isAllHabitsVisible })
  }

  return (
    <div className="App">
      <GlobalStyles />
      <Context.Provider value={dispatch}>
        <H1>
          My Habits{' '}
          <Button type="transparent" onClick={toggleAllHabits}>
            All Habits
          </Button>
        </H1>
        <Calender />
        <Habits selectedDate={selectedDate} habits={habits} />
        <AllHabits show={isAllHabitsVisible} onClose={toggleAllHabits} />
        <AddHabits show={isModalVisible} selectedHabit={selectedHabit} />
      </Context.Provider>
    </div>
  )
}

export default App
