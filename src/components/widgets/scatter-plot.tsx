import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('1 / 13 / 4 / 21'),
    ...theme.typography.sortOfLarge,
  },
}))

export const ScatterPlot: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Scatter Plot</div>
}
