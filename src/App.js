import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled, { createGlobalStyle } from 'styled-components'

import Calender from './Calender'
import constants from './constants'
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
    width: 350px;
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

      & + span {
        margin-left: 10px;
      }

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

const H1 = styled.h1`
  background-color: #f7f7f7;
  padding: 15px 20px 20px;
  position: sticky;
  top: 0;
  cursor: pointer;
`

const App = () => {
  const today = dayjs().format(constants.FORMAT.DATE)
  const [state, setState] = useState({ selectedDate: today })

  const onChange = selectedDate => {
    setState({ selectedDate })
  }

  const { selectedDate } = state

  return (
    <div className="App">
      <GlobalStyles />
      <H1> My Habits </H1>
      <Calender onChange={onChange} />
      <Habits selectedDate={selectedDate} />
    </div>
  )
}

export default App
