import React, { useState, useMemo, useEffect } from 'react'
import {
  TableCell,
  TableRow,
  TextField,
  InputBase,
  IconButton,
  Checkbox
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete'
import styled from 'styled-components'

const StyledInput = styled(InputBase)`
  color: ${props => (props.disabled ? 'inherit !important' : null)};
  border: ${props =>
    !props.disabled ? `1px solid ${props.theme.palette.grey[500]}` : `1px`};
  border-radius: 5px;
  padding: ${props => (props.disabled ? '5px' : '4px')};
  box-sizing: border-box;

  input {
    cursor: ${props => (props.disabled ? 'pointer !important' : null)};
  }
`

const StyledRow = styled(TableRow)`
  cursor: ${props => (!props.disabled ? 'pointer' : null)};
`

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default function League({
  isCurrent,
  onChange,
  onClick,
  onDelete,
  name: nameProp,
  ip: ipProp,
  ...other
}) {
  const [isNew, setIsNew] = useState(!ipProp && !nameProp)
  const [isEditing, setIsEditing] = useState(isNew)

  const [name, setName] = useState(nameProp)
  const [ip, setIp] = useState(ipProp)

  function onConfirm() {
    onChange({
      name,
      ip
    })
    setIsNew(false)
  }

  // update state when props change
  useEffect(() => {
    setName(nameProp)
    setIp(ipProp)
  }, [nameProp, ipProp])

  return (
    <StyledRow
      disabled={isEditing}
      onClick={() => !isEditing && onClick()}
      {...other}
    >
      <TableCell>
        <Checkbox disabled={isNew || isEditing} checked={isCurrent} />
      </TableCell>
      <TableCell>
        <StyledInput
          disabled={!isEditing}
          value={name}
          onChange={ev => {
            setName(ev.currentTarget.value)
          }}
          onClick={ev => {
            if (isEditing) {
              ev.stopPropagation()
            }
          }}
        />
      </TableCell>

      <TableCell>
        <StyledInput
          disabled={!isEditing}
          value={ip}
          onChange={ev => {
            setIp(ev.currentTarget.value)
          }}
          onClick={ev => {
            if (isEditing) {
              ev.stopPropagation()
            }
          }}
        />
      </TableCell>

      <TableCell align="right">
        <ActionButtons>
          <IconButton
            disabled={isEditing && (!ip || !name)}
            onClick={ev => {
              ev.stopPropagation()

              if (isEditing) {
                onConfirm()
                setIsEditing(false)
              } else {
                setIsEditing(true)
              }
            }}
          >
            {isEditing ? <DoneIcon /> : <EditIcon />}
          </IconButton>
          {!isNew && (
            <IconButton
              disabled={isEditing}
              onClick={ev => {
                ev.stopPropagation()
                onDelete()
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </ActionButtons>
      </TableCell>
    </StyledRow>
  )
}
