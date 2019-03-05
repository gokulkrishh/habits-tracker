import ClickNHold from 'react-click-n-hold'
import Database from '../Database'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import styled from 'styled-components'

import { Card } from '../Components/index'
import constants from '../constants'
import Context from '../context'

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

const Habits = ({ selectedDate, habits }) => {
  const today = dayjs().format(constants.FORMAT.DATE)
  const dispatch = useContext(Context)

  const updateHabit = async habit => {
    let { done, id, streak } = habit
    if (done[selectedDate]) {
      if (streak > 0) streak -= 1
      else streak = 0
      done[selectedDate] = false
    } else {
      done[selectedDate] = true
      streak += 1
    }
    await Database.table('habits').update(id, { done, streak })
  }

  const onClickNHold = habit => {
    dispatch({
      type: constants.SELECTED_HABIT,
      payload: habit
    })

    dispatch({
      type: constants.TOGGLE_MODAL,
      payload: true
    })
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

    const tConv24 = time24 => {
      var ts = time24
      var H = +ts.substr(0, 2)
      var h = H % 12 || 12
      h = h < 10 ? '0' + h : h
      var ampm = H < 12 ? ' AM' : ' PM'
      return h + ts.substr(2, 3) + ampm
    }

    return (
      <div>
        {habits.map(habit => {
          return (
            <ClickNHold
              key={habit.id}
              time={1}
              onClickNHold={() => {
                onClickNHold(habit)
              }}
            >
              <Card className={!dayjs(selectedDate).isSame(today) ? 'readonly' : ''}>
                <div className="card__left">
                  <label
                    className="card__checkbox"
                    onClick={() => {
                      updateHabit(habit)
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
                    <span className="time">{tConv24(habit.time)}</span>
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

  return <Container>{renderHabits()}</Container>
}

export default Habits
