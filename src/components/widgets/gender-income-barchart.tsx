import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('4 / 1 / 5 / 16'),
    ...theme.typography.sortOfLarge,
  },
}))

export const GenderIncomeBarchart: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Gender/Income Barchart</div>
}
