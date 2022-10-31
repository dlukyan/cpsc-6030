import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('5 / 6 / 6 / 11'),
    ...theme.typography.sortOfLarge,
  },
}))

export const GeographyArc: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Geography Arc</div>
}
