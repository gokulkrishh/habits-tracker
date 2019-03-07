import { useMappedState, useDispatch } from 'redux-react-hook'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import db from '../database'
import { Button, Modal, ModalOverlay } from '../Components'
import constants from '../constants'

const Container = styled.div`
  .add {
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    border-radius: 28px;
    height: 44px;
    outline: none;
    width: 150px;
    margin: 0 auto;
    font-weight: 600;
    z-index: 1;
  }

  .add svg {
    margin-right: 6px;
    width: 22px;
    margin-top: 1px;
  }
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

const AddHabits = ({ onUpdate, selectedHabit }) => {
  const dispatch = useDispatch()
  const mapState = useCallback(state => state.isModalVisible, [])
  const isModalVisible = useMappedState(mapState)

  const reminders = constants.DAYS.slice(1, 6)
  const initialState = { id: null, name: '', notes: '', reminders, time: '' }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (selectedHabit && selectedHabit.id) {
      setState(selectedHabit)
    }
  }, [selectedHabit])

  const hideModal = () => {
    setState(initialState)
    dispatch({ type: constants.TOGGLE_ADD_MODAL, payload: false })
    dispatch({ type: constants.SELECTED_HABIT, payload: {} })
  }

  const onFormSubmitCallback = async event => {
    event.preventDefault()
    const { id, name, notes, time, reminders } = state
    const today = dayjs().format(constants.FORMAT.DATE)

    const request = {
      created: today,
      done: {},
      isDeleted: false,
      name,
      notes,
      reminders,
      streak: 0,
      time
    }

    if (!id) db.habits.add(request)
    else {
      db.habits.update(id, {
        name,
        notes,
        reminders,
        time,
        isDeleted: !reminders.length
      })
    }
    hideModal()
    onUpdate()
  }

  const onReminderChange = day => {
    const selected = state.reminders.indexOf(day)
    if (selected > -1) state.reminders.splice(selected, 1)
    else state.reminders.splice(constants.DAYS.indexOf(day), 0, day)
    setState({ ...state, reminders: state.reminders })
  }

  const addBtnHTML = () => {
    return (
      <Button
        className="add"
        appearance="primary"
        onClick={() => {
          dispatch({ type: constants.TOGGLE_ADD_MODAL, payload: true })
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        Add Habits
      </Button>
    )
  }

  const renderModalHTMl = () => {
    return ReactDOM.createPortal(
      <div className="AddHabit">
        <Modal show={isModalVisible}>
          <form className="form" autoComplete="off" onSubmit={onFormSubmitCallback}>
            <FormGroup>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Go for jog (or) read books"
                name="name"
                onChange={event => {
                  setState({ ...state, name: event.target.value })
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
                    setState({ ...state, time: event.target.value })
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
                    setState({ ...state, notes: event.target.value })
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
                        onReminderChange(day)
                      }}
                    >
                      {day.charAt(0)}
                    </span>
                  )
                })}
              </div>
            </FormGroup>
            <FormGroup direction="row">
              <Button onClick={hideModal} type="button">
                Cancel
              </Button>
              <Button appearance="primary">{state.id ? 'Update' : 'Add'}</Button>
            </FormGroup>
          </form>
        </Modal>
        <ModalOverlay show={isModalVisible} onClick={hideModal} />
      </div>,
      document.getElementById('custom-root')
    )
  }

  return (
    <Container>
      {addBtnHTML()}
      {renderModalHTMl()}
    </Container>
  )
}

export default AddHabits
