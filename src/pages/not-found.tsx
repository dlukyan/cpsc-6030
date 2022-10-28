import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    height: '100vh',
    width: '100vw',
    ...theme.common.flexBox,
  },
  title: {
    ...theme.typography.largest,
  },
}))

export const NotFoundPage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Page Not Found</h1>
    </div>
  )
}
