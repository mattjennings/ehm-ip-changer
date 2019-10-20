import React from 'react'
import styled from 'styled-components'
import { AppBar, Typography } from '@material-ui/core'

const StyledAppBar = styled(AppBar)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Header() {
  return (
    <StyledAppBar position="static">
      <Typography variant="h6">Leagues</Typography>
    </StyledAppBar>
  )
}
