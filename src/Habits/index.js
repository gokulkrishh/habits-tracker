import { useDispatch } from 'redux-react-hook'
import ClickNHold from 'react-click-n-hold'
import clsx from 'clsx'
import dayjs from 'dayjs'
import db from '../database'
import React from 'react'
import styled from 'styled-components'

import { Card } from '../Components/index'
import { convert24To12Hrs } from '../utils'
import constants from '../constants'

const CardContainer = styled.div`
  padding: 15px;
  overflow: auto;
  margin-top: 15px;
  margin-bottom: 50px;
`

const Empty = styled.h2`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;

  span {
    margin-left: 8px;
    font-size: 27px;
    margin-top: 6px;
  }
`

const Habits = ({ allHabits, selectedDate, onUpdate }) => {
  const selectedDay = dayjs(selectedDate).day()
  const dispatch = useDispatch()

  const getTodaysHabits = () => {
    return allHabits
      .filter(habit => {
        return habit.reminders.indexOf(constants.DAYS[selectedDay]) > -1 && !dayjs(habit.created).isAfter(selectedDate)
      })
      .sort((a, b) => {
        if (a.time > b.time) return 1
        else if (a.time < b.time) return -1
        return 0
      })
  }

  const habits = getTodaysHabits()
  const today = dayjs().format(constants.FORMAT.DATE)

  const updateHabit = async (habit, index) => {
    let { done, id, streak } = habit
    if (done[selectedDate]) {
      if (streak > 0) streak -= 1
      else streak = 0
      done[selectedDate] = false
    } else {
      done[selectedDate] = true
      streak += 1
    }

    await db.table('habits').update(id, { done, streak })
    allHabits.splice(index, { ...habit, done, streak })
    onUpdate(allHabits)
  }

  const onClickNHold = habit => {
    dispatch({ type: constants.SELECTED_HABIT, payload: habit })
    dispatch({ type: constants.TOGGLE_ADD_MODAL, payload: true })
  }

  const renderHabits = () => {
    if (!habits.length) {
      return (
        <Empty>
          No Habits
          <span aria-label="emoji" role="img">
            🤓
          </span>
        </Empty>
      )
    }

    return (
      <div
        onContextMenu={e => {
          e.preventDefault()
        }}
      >
        {habits.map((habit, index) => {
          const isReadItOnly = !dayjs(selectedDate).isSame(today)
          return (
            <ClickNHold
              key={habit.id}
              time={1}
              onClickNHold={() => {
                if (!isReadItOnly) onClickNHold(habit)
              }}
            >
              <Card className={clsx({ readonly: isReadItOnly })}>
                <div className="card__left">
                  <label
                    className="card__checkbox"
                    onClick={() => {
                      updateHabit(habit, index)
                    }}
                  >
                    <span className={habit.done[selectedDate] ? 'checked' : ''}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.756 29.756">
                        <path
                          fill="#FFF"
                          d="M29.049 5.009l-.859-.858a2.434 2.434 0 0 0-3.434 0L10.172 18.737l-5.175-5.173a2.433 2.433 0 0 0-3.432.001l-.858.857a2.437 2.437 0 0 0 0 3.433l7.744 7.752a2.437 2.437 0 0 0 3.433 0L29.049 8.442a2.438 2.438 0 0 0 0-3.433z"
                        />
                      </svg>
                    </span>
                  </label>

                  <div className="card__info">
                    <h3 className="name">{habit.name}</h3>
                    <span className="time">{convert24To12Hrs(habit.time)}</span>
                    {habit.notes ? <span className="notes">{habit.notes}</span> : null}
                  </div>
                </div>
                <div className="card__right">
                  <div className="streak">Done: {habit.streak}</div>
                </div>
              </Card>
            </ClickNHold>
          )
        })}
      </div>
    )
  }

  return <CardContainer>{renderHabits()}</CardContainer>
}

export default Habits
