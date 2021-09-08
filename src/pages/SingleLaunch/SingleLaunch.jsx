import { Button, makeStyles } from '@material-ui/core'
import React, { useMemo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { bookLaunch, fetchSingleLaunch } from '../../api/lauchesApi'
import {
  launchBooked,
  selectBookedLaunches,
} from '../../app/BookingLaunchesSlice'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles({
  actions: {
    marginTop: '20px',
    '& > :not(:last-child)': {
      marginRight: '20px',
    },
  },
})

export const SingleLaunch = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { flightNumber } = useParams()

  const bookedLaunches = useSelector(selectBookedLaunches)

  const [launch, setLaunch] = useState(null)

  const handleBooking = async () => {
    const res = await bookLaunch(flightNumber)
    if (res) {
      dispatch(launchBooked(launch))
      toast.success('Успешно забронированно!')
    } else {
      toast.error('Ошибка при бронировании!')
    }
  }

  const isAlreadyBooked = useMemo(() => {
    if (bookedLaunches.some((el) => el.flight_number === +flightNumber)) {
      return true
    }
    return false
  }, [bookedLaunches])

  useEffect(() => {
    ;(async () => {
      const res = await fetchSingleLaunch(flightNumber)
      setLaunch(res.data)
    })()
  }, [])

  return (
    <div>
      <h1>{launch?.mission_name ?? <Skeleton variant='text' />}</h1>
      <div>
        <div>
          <h1>Описание</h1>
          <p>
            {launch ? (
              launch?.details ?? 'No data'
            ) : (
              <>
                <Skeleton variant='text' />
                <Skeleton variant='text' />
                <Skeleton variant='text' />
              </>
            )}
          </p>

          <div>
            <div>
              <h1>Место</h1>
              {launch?.launch_site?.site_name_long ?? (
                <Skeleton variant='text' />
              )}
            </div>
            <div>
              <h1>Дата</h1>
              {launch?.launch_date_utc ?? <Skeleton variant='text' />}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Link to='/'>
          <Button variant='contained' color='secondary'>
            Назад
          </Button>
        </Link>
        {launch?.upcoming && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleBooking}
            disabled={isAlreadyBooked}
          >
            {isAlreadyBooked ? 'Забронировано' : 'Забронировать'}
          </Button>
        )}
      </div>
    </div>
  )
}
