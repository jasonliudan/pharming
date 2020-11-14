import React from 'react'
import styled from 'styled-components'

const CardIcon = ({ src }) => (
  <StyledCardIcon src={src} />
)

const StyledCardIcon = styled.img`
  font-size: 36px;
  height: 60px;
  width: 60px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto 3px;
`

export default CardIcon