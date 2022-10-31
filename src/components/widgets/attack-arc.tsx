import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('5 / 11 / 6 / 16'),
    ...theme.typography.sortOfLarge,
  },
}))

export const AttackArc: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Attack Arc</div>
}
