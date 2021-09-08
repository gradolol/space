import React, { useMemo } from 'react'
import { LaunchCard } from '../launchCard'
import { makeStyles } from '@material-ui/core/styles'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import {
  launchBooked,
  launchCancelBooked,
} from '../../app/BookingLaunchesSlice'
import { bookLaunch, cancelBooking } from '../../api/lauchesApi'
import { toast } from 'react-toastify'
import { useConfirmModal } from '../../modals/confirmModal/useConfirmModal'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  list: {
    width: '100%',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      marginBottom: '15px',
    },
  },
})

export const LaunchesContainer = ({ launches, title, dropable, block }) => {
  const classes = useStyles()
  const confirmModal = useConfirmModal()
  const dispatch = useDispatch()

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'any',
    drop: async (e) => {
      if (block === 'c') {
        try {
          await bookLaunch(e.launch.flight_number)
          toast.success('Полет успешно забронирован!')
          dispatch(launchBooked(e.launch))
        } catch (e) {
          toast.error('Ошибка')
        }
      }
      if (block === 'b') {
        confirmModal.open({
          title: 'Вы действительно хотите отменить бронирование?',
          onSubmit: async (result) => {
            if (result) {
              try {
                await cancelBooking(e.launch.flight_number)
                dispatch(launchCancelBooked(e.launch))
                toast.success('Бронирование успешно отменено!')
              } catch (e) {
                toast.error('Ошибка')
              }
            } else {
              toast.warn('Действие отменено!')
            }
            confirmModal.close()
          },
        })
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (e) => {
      if (!dropable) {
        return false
      }

      if (block === e.block) {
        return false
      }

      if (block === 'c') {
        if (
          launches.some((el) => el.flight_number === e.launch.flight_number)
        ) {
          return false
        }
      }

      return true
    },
  })

  const isActive = useMemo(() => isOver && canDrop, [isOver, canDrop])

  const backgroundColor = useMemo(() => {
    let bc = '#211e1e'
    if (isActive) {
      bc = '#613939'
    } else if (canDrop) {
      bc = '#a79393'
    }
    return bc
  }, [canDrop, isActive])

  return (
    <div
      className={classes.list}
      ref={drop}
      role='Dustbin'
      style={{ backgroundColor }}
    >
      <Typography variant='h6' component='div'>
        {title}
      </Typography>
      {launches.map((el) => (
        <LaunchCard
          key={el.flight_number}
          launch={el}
          draggable={dropable}
          block={block}
        />
      ))}
    </div>
  )
}
