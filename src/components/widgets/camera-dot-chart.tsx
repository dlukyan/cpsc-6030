import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('5 / 1 / 6 / 6'),
    ...theme.typography.sortOfLarge,
  },
}))

export const CameraDotChart: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Camera Dot Chart</div>
}
