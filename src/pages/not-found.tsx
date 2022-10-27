import React from 'react'
import { Background } from '../components/background'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    ...theme.typography.largest,
  },
}))

export const NotFoundPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Background>
      <h1 className={classes.title}>Page Not Found</h1>
    </Background>
  )
}
