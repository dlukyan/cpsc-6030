import React, { useState } from 'react'
import { Background } from '../components/background'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  homePageContentContainer: {
    ...theme.common.flexBox,
    flexDirection: 'column',
    gap: '1em',
  },
  title: {
    ...theme.typography.largest,
  },
  count: {
    ...theme.typography.medium,
  },
  button: {
    ...theme.elements.button,
    color: theme.colors.white,
    backgroundColor: theme.colors.darkGray,
    padding: 10,
  },
}))

export const HomePage: React.FC = () => {
  const classes = useStyles()
  const [counter, setCounter] = useState<number>(0)

  return (
    <Background contentClassName={classes.homePageContentContainer}>
      <h1 className={classes.title}>Home Page</h1>
      <h2 className={classes.count}>Count: {counter.toString()}</h2>
      <button className={classes.button} onClick={() => setCounter(counter + 1)}>
        Click Me!
      </button>
    </Background>
  )
}
