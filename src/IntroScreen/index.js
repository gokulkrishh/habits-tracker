import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'redux-react-hook'

import AddSVG from './add.svg'
import EditSVG from './edit.svg'
import AllSVG from './all.svg'
import constants from '../constants'

const IntroScreenContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 95%;

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
    line-height: 22px;
    width: 90%;
    margin: 0 auto;
    margin-top: 15px;
    text-align: center;
  }

  ul {
    font-size: 17px;
    text-align: left;
    max-width: 320px;
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
    line-height: 20px;
    font-size: 14px;
    width: 90%;
  }

  li img {
    display: flex;
    align-items: center;
    margin-right: 20px;
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
      <p>A simple app to help you form a habit or keep track of your existing habits.</p>
      <ul>
        <li>
          <img src={AddSVG} alt="Add" />
          <div>
            <b>Add any habits</b>
            <p>Create or add your existing habits with time and day to track it.</p>
          </div>
        </li>
        <li>
          <img src={EditSVG} alt="Edit" />
          <div>
            <b>Edit habits</b>
            <p>Want to change an habit, edit it by pressing and holding the habit card.</p>
          </div>
        </li>
        <li>
          <img src={AllSVG} alt="All" />
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
