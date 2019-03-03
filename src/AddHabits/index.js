import Database from '../Database'
import dayjs from 'dayjs'
import React, { useReducer } from 'react'
import styled from 'styled-components'

import { Button, Modal, ModalOverlay } from '../Components/index'
import constants from '../constants'
import reducer from './reducer'

const Container = styled.div``

const FormGroup = styled.div`
  display: flex;
  min-height: 55px;
  flex-direction: column;
  padding: 5px 0;
  margin-top: 5px;

  ${({ direction }) =>
    direction === 'row' &&
    `
    justify-content: space-between;
    display: flex;
    flex-direction: row;

    div {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    div:last-child {
      margin-left: 25px;
    }
  }`}

  label {
    font-size: 16px;
    margin-bottom: 10px;
    margin-right: 10px;
    font-weight: 600;
  }

  input {
    border-radius: 4px;
    border: 2px solid #eee;
    outline: none;
    padding: 10px 8px;
    font-size: 15px;
    height: 48px;
    appearance: none;
    width: 100%;

    &:focus {
      border-color: #2974ff;
    }
  }

  input[name='time'] {
    background-color: #fff;
    color: #9d9d9d;
  }

  button {
    width: 46%;
    height: 40px;
    border-radius: 4px;
    font-size: 15px;
    margin: 10px 0 5px;
    cursor: pointer;
  }
`

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;

  button {
    border-radius: 28px;
    height: 44px;
    outline: none;
    width: 150px;
    margin: 0 auto;
    font-weight: 600;
  }

  svg {
    margin-right: 6px;
    width: 22px;
    margin-top: 1px;
  }
`

const AddHabits = () => {
  const initialState = {
    name: '',
    notes: '',
    reminders: constants.DAYS.slice(),
    show: false,
    time: ''
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const onFormSubmitCallback = event => {
    event.preventDefault()

    const { name, notes, time, reminders } = state
    const today = dayjs().format(constants.FORMAT.DATE)

    const tConv24 = time24 => {
      var ts = time24
      var H = +ts.substr(0, 2)
      var h = H % 12 || 12
      h = h < 10 ? '0' + h : h
      var ampm = H < 12 ? ' AM' : ' PM'
      return h + ts.substr(2, 3) + ampm
    }

    const formattedTime = tConv24(time)

    const request = {
      created: today,
      done: {},
      name,
      notes,
      reminders,
      streak: 0,
      time: formattedTime,
      deleted: false
    }

    Database.habits.add(request)

    dispatch({ type: 'reset', payload: initialState })
  }

  const onChangeCallback = day => {
    const selected = state.reminders.indexOf(day)
    if (selected > -1) {
      state.reminders.splice(selected, 1)
    } else {
      state.reminders.splice(constants.DAYS.indexOf(day), 0, day)
    }
    dispatch({ type: 'reminders', payload: state.reminders })
  }

  const toggleModalCallback = () => {
    dispatch({ type: 'reset', payload: initialState })
    dispatch({ type: 'modal', payload: !state.show })
  }

  return (
    <Container>
      <ButtonContainer>
        <Button type="primary" onClick={toggleModalCallback}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Add Habits
        </Button>
      </ButtonContainer>

      <Modal show={state.show}>
        <form className="form" autoComplete="off" onSubmit={onFormSubmitCallback}>
          <FormGroup>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Go for jog (or) read books"
              name="name"
              onChange={event => {
                dispatch({ type: 'name', payload: event.target.value })
              }}
              value={state.name}
              required
            />
          </FormGroup>
          <FormGroup direction="row">
            <div>
              <label>Time:</label>
              <input
                type="time"
                name="time"
                onChange={event => {
                  dispatch({ type: 'time', payload: event.target.value })
                }}
                value={state.time}
                required
              />
            </div>
            <div>
              <label>Note:</label>
              <input
                type="text"
                placeholder="(Optional)"
                name="notes"
                onChange={event => {
                  dispatch({ type: 'notes', payload: event.target.value })
                }}
                value={state.notes}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>When:</label>
            <div className="form__days">
              {constants.DAYS.map(day => {
                return (
                  <span
                    className={state.reminders.indexOf(day) > -1 ? 'active' : ''}
                    key={day}
                    onClick={() => {
                      onChangeCallback(day)
                    }}
                  >
                    {day.charAt(0)}
                  </span>
                )
              })}
            </div>
          </FormGroup>
          <FormGroup direction="row">
            <Button onClick={toggleModalCallback} type="button">
              Cancel
            </Button>
            <Button type="primary">Add Habit</Button>
          </FormGroup>
        </form>
      </Modal>
      <ModalOverlay show={state.show} onClick={toggleModalCallback} />
    </Container>
  )
}

export default AddHabits
