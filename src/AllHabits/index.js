import { useDispatch } from 'redux-react-hook'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { convertTo12Hrs } from '../utils'
import { Title, Card, Modal, ModalOverlay } from '../Components/index'
import db from '../database'
import constants from '../constants'

const Date = styled.h3`
  margin-bottom: 15px;

  &:first-child {
    margin-top: 20px;
  }
`
const Habits = styled.div`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  max-width: 520px;
  margin: 0px auto;
  padding: 0 20px;

  .card__container {
    &:last-child {
      margin-bottom: 100px;
    }
  }
`

const Button = styled.div`
  width: 48px;
  height: 48px;
  float: right;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.8
    background-color: #ccc;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

const AllHabits = ({ show }) => {
  const dispatch = useDispatch()
  const [groupedByHabits, setState] = useState([])

  const getHabitsByCreatedDate = async () => {
    let collection = await db.habits.orderBy('created').toArray()
    collection = collection.reduce((acc, habit) => {
      if (!acc[habit.created]) {
        acc[habit.created] = [habit]
      } else {
        acc[habit.created].push(habit)
      }
      return acc
    }, {})
    setState(collection)
  }

  const toggleScrollInBody = (toggle = '') => {
    document.body.style.overflow = toggle
  }

  if (show) toggleScrollInBody('hidden')
  else toggleScrollInBody('')

  useEffect(() => {
    toggleScrollInBody()
    getHabitsByCreatedDate()
  }, [])

  const hideAllHabitsModal = () => {
    dispatch({ type: constants.TOGGLE_ALL_HABITS_MODAL, payload: false })
  }

  return (
    <div className="AllHabits">
      <Modal show={show} type="full">
        <Title className="modal-title">
          All Habits{' '}
          <Button onClick={hideAllHabitsModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </Button>
        </Title>
        <Habits>
          {Object.keys(groupedByHabits).map(key => {
            const habits = groupedByHabits[key]
            return (
              <div className="card__container" key={key}>
                <Date>{dayjs(key).format(constants.FORMAT.MONTH)}</Date>
                {habits.map(habit => {
                  console.log('habit --->', habit)
                  const reminders = habit.reminders.map(reminder => `${reminder[0]}${reminder[1]}`)
                  return (
                    <Card key={habit.id}>
                      <div className="card__left">
                        <div className="card__info">
                          <h3 className="name">{habit.name}</h3>
                          <span className="time">{convertTo12Hrs(habit.time)}</span>
                          {habit.notes ? <span className="notes">{habit.notes}</span> : null}
                        </div>
                      </div>
                      <div className="card__right">
                        {reminders.length ? <span className="streak blue">{reminders.join(', ')}</span> : null}
                        {habit.isDeleted ? <span className="streak red">Deleted</span> : null}
                      </div>
                    </Card>
                  )
                })}
              </div>
            )
          })}
        </Habits>
      </Modal>
      <ModalOverlay show={show} onClick={hideAllHabitsModal} />
    </div>
  )
}

export default AllHabits
