import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Card, Modal, ModalOverlay } from '../Components/index'
import constants from '../constants'
import Database from '../Database'

const Title = styled.h1`
  padding: 10px 0 20px;
  position: sticky;
  top: 0;
`

const Date = styled.h3`
  margin-bottom: 15px;
`
const Content = styled.div`
  overflow-y: auto;
  height: 100%;
  max-width: 500px;
  margin: 0px auto;
`

const CloseButton = styled.div`
  width: 45px;
  height: 45px;
  float: right;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    opacity: 0.8
    background-color: #ccc;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

const AllHabits = ({ show, onClose }) => {
  const [groupedByHabits, setState] = useState([])

  const getHabitsByCreatedDate = async () => {
    let collection = await Database.habits.orderBy('created').toArray()
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

  useEffect(() => {
    getHabitsByCreatedDate()
  }, [])

  return (
    <div className="AllHabits">
      <Modal show={show} type="full">
        <Title>
          All Habits{' '}
          <CloseButton onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </CloseButton>
        </Title>
        <Content>
          {Object.keys(groupedByHabits).map(key => {
            const habits = groupedByHabits[key]
            return (
              <div key={key}>
                <Date>{dayjs(key).format(constants.FORMAT.MONTH)}</Date>
                {habits.map(habit => {
                  return (
                    <Card key={habit.id}>
                      <div className="card__left">
                        <div className="card__info">
                          <h3 className="name">{habit.name}</h3>
                          <span className="time">{habit.time}</span>
                          <span className="notes">{habit.notes}</span>
                        </div>
                      </div>
                      <div className="card__right">
                        <span className="steak">{habit.reminders.join(', ')}</span>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )
          })}
        </Content>
      </Modal>
      <ModalOverlay show={show} onClick={onClose} />
    </div>
  )
}

export default AllHabits
