import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('1 / 1 / 4 / 13'),
    ...theme.typography.sortOfLarge,
  },
}))

export const Map: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Map</div>
}
