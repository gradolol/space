import React, { useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core'

export const ConfirmModal = ({ title, onSubmit }) => {
  const handleSubmit = useCallback((e) => onSubmit(e), [onSubmit])

  return (
    <Dialog open={true} maxWidth='sm'>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>Это действие будет необратимо!</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          variant='contained'
          onClick={() => handleSubmit(false)}
        >
          Отмена
        </Button>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => handleSubmit(true)}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
