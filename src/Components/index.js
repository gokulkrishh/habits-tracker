import styled from 'styled-components'

const Button = styled.button`
  appearance: none;
  align-items: center;
  background-color: #ccc;
  border-radius: 2px;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 35px;
  justify-content: center;
  outline: none;
  text-transform: uppercase;
  width: 100%;

  ${({ appearance }) => appearance === 'primary' && `background-color: #2974ff;`}

  ${({ size }) =>
    size === 'small' &&
    `
  width: 85px;
  height: 25px;
  font-size: 12px;
  border-radius: 30px;
  margin-top: 5px;`}

  ${({ appearance }) =>
    appearance === 'primary' &&
    `&:hover {
    background-color: #0d61fd;
  `}

  &:active {
    opacity: 0.7;
  }

  img {
    width: 21px;
    height: 21px;
    margin-right: 5px;
  }
`

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
  z-index: 2;
  user-select: none;

  ${({ show }) => show && `transform: translateY(0);`}

  ${({ type }) =>
    type === 'full' &&
    `border-radius: 0;
    top: 0;
    max-width: 520px;
    padding: 0;
    margin: 0 auto;`}
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
  z-index: 1;

  ${({ show }) => show && `display: block;`}
`

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 90px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  .card__info {
    display: grid;
    flex-direction: column;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
  }

  .card__left {
    display: flex;
  }

  .card__right {
    justify-self: flex-end;
    flex-direction: column;
    display: grid;
    grid-gap: 10px;
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
  }

  .card__checkbox svg {
    width: 13px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
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

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  card__info {
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  .time {
    font-weight: 600;
  }

  .time,
  .notes {
    color: grey;
    font-size: 14px;
    display: inline-block;
  }

  .notes {
    font-style: italic;
    display: block;
  }

  .streak {
    background-color: #d8fdf0;
    padding: 0px 5px;
    color: #4dab92;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    user-select: none;
    border-radius: 4px;
    max-width: 180px;
    font-size: 12px;
  }

  .streak.blue {
    background-color: #e5eeff;
    color: #2974ff;
  }

  .streak.red {
    background-color: #ffe5e5;
    color: #ab4d4d;
  }
`

const Title = styled.h1`
  background-color: #f7f7f7;
  position: sticky;
  top: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  height: 70px;
  z-index: 1;
  user-select: none;
`

const SubTitle = styled.h4`
  padding-bottom: 5px;
  z-index: 1;
`

export { Button, Card, Modal, ModalOverlay, SubTitle, Title }
