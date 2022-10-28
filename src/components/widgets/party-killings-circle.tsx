import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('4 / 16 / 6 / 21'),
    ...theme.typography.sortOfLarge,
  },
}))

export const PartyKillingsCircle: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.container}>Party/Killings Circle</div>
}
