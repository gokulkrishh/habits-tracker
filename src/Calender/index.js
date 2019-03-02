import dayjs from 'dayjs'
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import constants from '../constants'

const Container = styled.div`
  height: 82px;
  background-color: #e6e6e6;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
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
    border: 2px solid #2974ff;
    background-color: #fff;
    color: #2974ff;
  }

  span {
    font-size: 14px;
  }
`

const Calender = ({ onChange }) => {
  let calenderEle = useRef(null)

  const [state, setState] = useState({
    active: dayjs().date() - 1
  })

  useLayoutEffect(() => {
    if (calenderEle) {
      scrollIntoSelectedDate()
    }
  })

  useEffect(() => {
    if (calenderEle) {
      scrollIntoSelectedDate()
    }

    return () => {
      calenderEle = null
    }
  }, [])

  const scrollIntoSelectedDate = () => {
    const element = Array.from(calenderEle.children).filter(ele => ele.classList.contains('active'))
    if (element.length) {
      element[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }

  const totalDaysInThisMonth = () => {
    const dateObj = new Date()
    const days = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate()
    return Array.from(Array(days).keys())
  }

  const formattedDateStr = day => {
    const dateObj = new Date()
    return `${dateObj.getFullYear()}-0${dateObj.getMonth() + 1}-${day}`
  }

  const renderListItems = () => {
    return totalDaysInThisMonth().map(day => {
      const date = dayjs(formattedDateStr(day + 1))
      const activeDate = dayjs(formattedDateStr(day)).date()
      return (
        <ListItem
          key={day}
          className={state.active === activeDate ? 'active' : ''}
          onClick={() => {
            setState({ active: activeDate })
            onChange(date.format(constants.FORMAT.DATE))
          }}
        >
          <span>{constants.DAYS[date.day()]}</span>
          <span>{day + 1}</span>
        </ListItem>
      )
    })
  }

  return (
    <Container>
      <List ref={ref => (calenderEle = ref)}>{renderListItems()}</List>
    </Container>
  )
}

export default Calender
