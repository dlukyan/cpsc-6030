import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'
import { LightBar } from './light-bar/light-bar'

const useStyles = createUseStyles((theme: Theme) => ({
  text: {
    ...theme.typography.heading,
    gridArea: '1 / 4 / 3 / 13',
    // borderLeft: `1px solid ${theme.colors.empty}`,
    // borderRight: `1px solid ${theme.colors.empty}`,
    padding: 10,
    height: '100%',
    width: 'auto',
    zIndex: 60,
  },
}))

export const Heading: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <h1 className={classes.text}>POLICE VIOLENCE IN THE USA</h1>
      <LightBar />
    </>
  )
}
