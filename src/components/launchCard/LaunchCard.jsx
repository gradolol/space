import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    border: '1px solid black',
    backgroundColor: '#222',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  desc: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '6',
    '-webkit-box-orient': 'vertical',
  },
})

export const ItemTypes = {
  BOX: 'box',
}

export const LaunchCard = ({ launch, draggable = true, block }) => {
  const classes = useStyles()
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'any',
      item: { launch, block },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      canDrag: () => draggable,
    }),
    [launch]
  )

  return (
    <Card className={classes.root} ref={drag} role='Box' style={{ opacity }}>
      <Link to={`/launch/${launch.flight_number}`}>
        <CardContent>
          <Typography variant='h6' component='h6'>
            {launch.mission_name}
          </Typography>
          <Typography variant='subtitle2' component='p'>
            {launch.rocket.rocket_name}
          </Typography>
          <Typography variant='body1' component='p' className={classes.desc}>
            {launch.details || 'No Information'}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}
