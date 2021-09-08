import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  fetchRecentAsync,
  selectRecentLaunches,
} from '../../app/RecentLaunchesSlice'
import {
  fetchUpcomingLaunchesAsync,
  selectUpcomingLaunches,
} from '../../app/UpcomingLaunchesSlice'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { LaunchesContainer } from '../../components/launchesContainer'
import { makeStyles } from '@material-ui/core/styles'
import { selectBookedLaunches } from '../../app/BookingLaunchesSlice'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 36,
    textAlign: 'center',
  },
  lists: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const AllLaunches = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const recentLaunches = useSelector(selectRecentLaunches)
  const upcomingLaunches = useSelector(selectUpcomingLaunches)
  const bookedLaunches = useSelector(selectBookedLaunches)

  useEffect(() => {
    dispatch(fetchRecentAsync({ limit: 10 }))
  }, [])

  useEffect(() => {
    dispatch(fetchUpcomingLaunchesAsync({ limit: 5, order: 'desc' }))
  }, [])

  const launches = useMemo(
    () => [
      {
        id: 1,
        block: 'a',
        value: recentLaunches,
        dropable: false,
        title: 'Прошедшие запуски',
      },
      {
        id: 2,
        block: 'b',
        value: upcomingLaunches,
        dropable: true,
        title: 'Предстоящие запуски',
      },
      {
        id: 3,
        block: 'c',
        value: bookedLaunches,
        dropable: true,
        title: 'Забронированные запуски',
      },
    ],
    [recentLaunches, upcomingLaunches, bookedLaunches]
  )

  return (
    <div>
      <div className={classes.title}>Explore the space</div>
      <div className={classes.lists}>
        <DndProvider backend={HTML5Backend}>
          {launches.map((el) => (
            <LaunchesContainer
              key={el.id}
              launches={el.value}
              dropable={el.dropable}
              title={el.title}
              block={el.block}
            />
          ))}
        </DndProvider>
      </div>
    </div>
  )
}
