import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Grow,
  Typography
} from '@material-ui/core'
import styled from 'styled-components'
import League from './League'
import { useSnackbar } from 'notistack'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Container from './Container'

const fs = window.require('fs')
const electron = window.require('electron')
const path = window.require('path')

const networkFile = path.join(
  (electron.app || electron.remote.app).getPath('appData'),
  '..',
  '/Local/Sports Interactive/EHM/Temporary/network.cfg'
)

const StyledTableHead = styled(TableHead)`
  ${({ theme }) => `
    background: ${theme.palette.primary.main}; 
    position: sticky;   
`}
`
const StyledTableHeadCell = styled(TableCell)`
  ${({ theme }) => `
    color: ${theme.palette.primary.contrastText} !important;    
`}
`

const AddButton = styled(Fab)`
  position: fixed !important;
  right: 8px;
  bottom: 8px;
`

export default function Leagues() {
  const { enqueueSnackbar } = useSnackbar()
  const [leagues, setLeagues] = useState(
    (JSON.parse(window.localStorage.getItem('leagues')) || []).filter(
      league => !league.isAdding
    )
  )

  const [currentLeague, setCurrentLeague] = useState(null)

  // read current league from network file
  useEffect(() => {
    fs.readFile(networkFile, 'utf-8', (err, data) => {
      if (!err) {
        setCurrentLeague(data)
      }
    })
  }, [])

  useEffect(() => {
    window.localStorage.setItem('leagues', JSON.stringify(leagues))
  }, [leagues])

  function updateFile(ip) {
    fs.writeFile(networkFile, ip, (err, data) => {
      if (err) {
        console.error(err)
        enqueueSnackbar('Unable to set IP', { variant: 'error' })
      }
    })
  }

  function addLeague() {
    setLeagues([
      ...leagues,
      {
        isAdding: true,
        name: '',
        ip: ''
      }
    ])
  }

  function selectLeague(ip) {
    setCurrentLeague(ip)
    updateFile(ip)
  }

  const isAdding = leagues.length > 0 && leagues[leagues.length - 1].isAdding

  return (
    <Container>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadCell>Active</StyledTableHeadCell>
            <StyledTableHeadCell>Name</StyledTableHeadCell>
            <StyledTableHeadCell>IP Address</StyledTableHeadCell>
            <StyledTableHeadCell align="right" />
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {leagues.map((league, index) => (
            <League
              key={index}
              name={league.name}
              ip={league.ip}
              isCurrent={league.ip === currentLeague}
              onChange={editedLeague => {
                setLeagues([
                  ...leagues.slice(0, index),
                  editedLeague,
                  ...leagues.slice(index + 1)
                ])

                // selected league IP was updated, update file
                if (league.ip === currentLeague) {
                  selectLeague(editedLeague.ip)
                }
              }}
              onDelete={() => setLeagues(leagues.filter((l, i) => i !== index))}
              onClick={() => {
                selectLeague(league.ip)
              }}
            />
          ))}
        </TableBody>
      </Table>
      <Grow in={!isAdding}>
        <AddButton
          color="secondary"
          onClick={() => addLeague()}
          disabled={isAdding}
        >
          <AddIcon />
        </AddButton>
      </Grow>
    </Container>
  )
}
