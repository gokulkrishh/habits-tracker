import Database from '../Database'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import constants from '../constants'
import TickSVG from './tick.svg'

const Container = styled.div`
  padding: 15px;
  overflow: auto;
  margin-top: 15px;
  margin-bottom: 50px;
`

const NoHabits = styled.h2`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 8px;
    font-size: 15px;
  }
`

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 90px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 25px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  justify-content: space-between;
  padding: 10px 15px;

  &.readonly {
    opacity: 0.6;
    pointer-events: none;
  }

  &:last-child {
    margin-bottom: 50px;
  }

  .card__left {
    display: flex;
  }

  .card__right span {
    background-color: #d8fdf0;
    border-radius: 4px;
    padding: 0px 5px;
    color: #4dab92;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    user-select: none;
  }

  .card__checkbox {
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
  }

  .card__checkbox span.checked {
    background: #2974ff;
    border-color: #2974ff;
  }

  .card__checkbox img {
    width: 13px;
    height: 13px;
    display: inline-block;
  }

  .card__checkbox span {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dedede;
    border-radius: 50%;
  }

  card__info {
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  .name {
    margin-bottom: 5px;
  }

  .time,
  .notes {
    color: grey;
    font-size: 14px;
    display: inline-block;
  }

  .time {
    margin-bottom: 5px;
  }

  .notes {
    font-style: italic;
    display: block;
  }
`

const Habits = ({ selectedDate }) => {
  let [state, setState] = useState({ habits: [] })
  let { habits } = state

  const selectedDay = dayjs(selectedDate).day()
  const today = dayjs().format(constants.FORMAT.DATE)

  const getHabits = async () => {
    let collection = await Database.habits.toArray()
    const habits = collection.filter(habit => {
      return habit.reminders.indexOf(constants.DAYS[selectedDay]) > -1 && !dayjs(habit.created).isAfter(selectedDate)
    })
    setState({ habits })
  }

  useEffect(() => {
    getHabits()
  }, [selectedDate])

  const updateHabit = async habit => {
    let { id, done, streak } = habit
    if (done[selectedDate]) {
      if (streak > 0) streak -= 1
      else streak = 0
      done[selectedDate] = false
    } else {
      done[selectedDate] = true
      streak += 1
    }
    await Database.table('habits').update(id, { done, streak })
    getHabits()
  }

  const renderHabits = () => {
    if (!habits.length) {
      return (
        <NoHabits>
          No Habits
          <span aria-label="emoji" role="img">
            🤓
          </span>
        </NoHabits>
      )
    }

    return (
      <div>
        {habits.map(habit => {
          return (
            <Card key={habit.id} className={!dayjs(selectedDate).isSame(today) ? 'readonly' : ''}>
              <div className="card__left">
                <label
                  className="card__checkbox"
                  onClick={() => {
                    updateHabit(habit)
                  }}
                >
                  <span className={habit.done[selectedDate] ? 'checked' : ''}>
                    <img src={TickSVG} alt="done" />
                  </span>
                </label>

                <div className="card__info">
                  <h3 className="name">{habit.name}</h3>
                  <span className="time">{habit.time}</span>
                  <span className="notes">{habit.notes}</span>
                </div>
              </div>
              <div className="card__right">
                <span className="steaks">{habit.streak} in a row</span>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  return <Container>{renderHabits()}</Container>
}

export default Habits
