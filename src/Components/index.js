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

  ${({ type }) => type === 'primary' && `background-color: #2974ff;`}

  ${({ type }) =>
    type === 'transparent' &&
    `
  background: #fff;
  border: 1px solid #2974ff;
  color: #2974ff;
  width: 80px;
  height: 24px;
  font-size: 12px;
  float: right;
  margin-top: 5px;`}

  &:active {
    opacity: 0.7;
  }

  img {
    width: 21px;
    height: 21px;
    margin-right: 5px;
  }
`

export { Button }
