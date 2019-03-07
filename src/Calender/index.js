import { useDispatch } from 'redux-react-hook'
import clsx from 'clsx'
import dayjs from 'dayjs'
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import constants from '../constants'

const ListContainer = styled.div`
  height: 82px;
  background-color: #e6e6e6;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  position: sticky;
  top: 70px;
  z-index: 1;
`

const List = styled.ul`
  white-space: nowrap;
  margin: 13px 0;
`

const ListItem = styled.li`
  height: 55px;
  width: 55px;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  user-select: none;
  margin: 0 10px;
  border: 2px solid #f8f8f8;

  &:active {
    opacity: 0.7;
  }

  &.active {
    font-weight: bold;
    border: 2px solid #2974ff;
    background-color: #fff;
    color: #2974ff;
  }

  span {
    font-size: 14px;
  }
`

const Calender = () => {
  let calenderEle = useRef(null)
  const dispatch = useDispatch()
  const [state, setState] = useState({ active: dayjs().date() })

  useEffect(() => {
    if (calenderEle) scrollIntoSelectedDate()
    return () => (calenderEle = null)
  }, [state.active])

  const scrollIntoSelectedDate = () => {
    const element = Array.from(calenderEle.children).filter(ele => ele.classList.contains('active'))
    if (element.length) {
      element[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }

  const getNumberDaysInMonth = () => {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const formattedDateStr = day => {
    const dateObj = new Date()
    return `${dateObj.getFullYear()}-0${dateObj.getMonth() + 1}-${day + 1}`
  }

  const renderListItems = () => {
    const days = getNumberDaysInMonth()
    return Array.from(Array(days).keys()).map(day => {
      const formattedDate = formattedDateStr(day)
      const date = dayjs(formattedDate)
      const activeDate = dayjs(formattedDate).date()
      return (
        <ListItem
          key={day}
          className={clsx({ active: state.active === activeDate })}
          onClick={() => {
            setState({ active: activeDate })
            dispatch({ type: constants.SELECTED_DATE, payload: date.format(constants.FORMAT.DATE) })
          }}
        >
          <span>{constants.DAYS[date.day()]}</span>
          <span>{day + 1}</span>
        </ListItem>
      )
    })
  }

  return (
    <ListContainer>
      <List ref={ref => (calenderEle = ref)}>{renderListItems()}</List>
    </ListContainer>
  )
}

export default Calender
