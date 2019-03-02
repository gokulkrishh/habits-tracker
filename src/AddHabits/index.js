import Database from '../Database'
import dayjs from 'dayjs'
import React, { useReducer } from 'react'
import styled from 'styled-components'

import { Button } from '../Components/index'
import AddSVG from './add-icon.svg'
import constants from '../constants'
import reducer from './reducer'

const Container = styled.div``

const Modal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  transform: translateY(102%);
  padding: 15px;
  transition: transform 0.33s cubic-bezier(0, 0, 0.3, 1);
  max-width: 600px;
  margin: auto;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.17);
  will-change: transform;
  z-index: 1;

  ${({ show }) => show && `transform: translateY(0);`}
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;

  ${({ show }) => show && `display: block;`}
`

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
    font-size: 15px;
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
  bottom: 30px;
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
`

const AddHabits = ({ onFormSubmit }) => {
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
    const today = dayjs()
      .subtract(1, 'day')
      .format(constants.FORMAT.DATE)

    const [hours, minutes] = time.split(':')
    const formattedTime = `${hours - 12}:${minutes} ${hours < 12 ? 'AM' : 'PM'} `

    const request = {
      created: today,
      done: {},
      name,
      notes,
      reminders,
      streak: 0,
      time: formattedTime
    }
    Database.habits.add(request)
    dispatch({ type: 'reset', payload: initialState })
    onFormSubmit()
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

  const toggleModal = () => {
    dispatch({ type: 'modal', payload: !state.show })
  }

  return (
    <Container>
      <ButtonContainer>
        <Button type="primary" onClick={toggleModal}>
          <img src={AddSVG} alt="Add Habits" />
          Add Habits
        </Button>
      </ButtonContainer>

      <Modal show={state.show}>
        <form className="form" autoComplete="off" onSubmit={onFormSubmitCallback}>
          <FormGroup>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Go for jog"
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
                placeholder="6 AM or 8 PM"
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
            <Button onClick={toggleModal} type="button">
              Cancel
            </Button>
            <Button type="primary">Add Habit</Button>
          </FormGroup>
        </form>
      </Modal>
      <ModalOverlay show={state.show} onClick={toggleModal} />
    </Container>
  )
}

export default AddHabits
