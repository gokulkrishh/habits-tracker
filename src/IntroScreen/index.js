import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'redux-react-hook'

import AddSVG from './add.svg'
import EditSVG from './edit.svg'
import AllSVG from './all.svg'
import constants from '../constants'

const IntroScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  padding: 20px;

  h1 {
    margin-top: 5px;
    font-size: 35px !important;
  }

  h1,
  h2,
  > p {
    text-align: center;
  }

  h2 {
    margin-top: 5px;
    color: #0d61fd;
    font-size: 25px !important;
  }

  > p {
    font-size: 16px;
    line-height: 25px;
    width: 90%;
    margin: 0 auto;
    margin-top: 15px;
  }

  ul {
    font-size: 17px;
    text-align: left;
    max-width: 360px;
    margin: 0 auto;
    margin-top: 20px;
  }

  li {
    padding-top: 20px;
    display: flex;
  }

  li:first-child {
    padding-top: 10px;
  }

  button {
    display: block;
    margin: 30px auto;
    background-color: #0d61fd;
    color: #fff;
    font-size: 14px;
    border: 1px solid #0d61fd;
    max-width: 360px;
    text-transform: uppercase;
    font-weight: 600;
  }

  li b {
    font-size: 16px;
  }

  li p {
    margin-top: 4px;
    line-height: 25px;
    font-size: 14px;
    width: 90%;
  }

  img {
    width: 50px;
    height: 50px;
  }

  li div:last-child {
    margin-left: 35px;
  }

  li div:first-child {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
`

const IntroScreen = props => {
  const dispatch = useDispatch()

  const hideIntroScreen = () => {
    dispatch({ type: constants.HIDE_INTRO_SCREEN, payload: false })
    window.localStorage.setItem('showIntroScreen', false)
  }

  return (
    <IntroScreenContainer>
      <h1>Welcome to</h1>
      <h2>Habits Tracker</h2>
      <p>An awesome tool to help you to form or keep track of your existing habits.</p>
      <ul>
        <li>
          <div>
            <img src={AddSVG} alt="Add" />
          </div>
          <div>
            <b>Add any habits</b>
            <p>Create or add any of your habits with time and day to track it.</p>
          </div>
        </li>
        <li>
          <div>
            <img src={EditSVG} alt="Edit" />
          </div>
          <div>
            <b>Edit habits</b>
            <p>Want to change an habit, edit it by press and an holding the habit card.</p>
          </div>
        </li>
        <li>
          <div>
            <img src={AllSVG} alt="All" />
          </div>
          <div>
            <b>All habits</b>
            <p>See all the habits sorted by month in all habits.</p>
          </div>
        </li>
      </ul>
      <button onClick={hideIntroScreen}>Continue</button>
    </IntroScreenContainer>
  )
}

export default IntroScreen
