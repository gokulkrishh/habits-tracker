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
