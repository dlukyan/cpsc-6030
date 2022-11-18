import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  x: {
    position: 'absolute',
    top: 0,
    right: 10,
    ...theme.typography.large,
    color: theme.colors.darkGray,
    cursor: 'pointer',
  },
}))

export const X: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const classes = useStyles()
  return (
    <div className={classes.x} onClick={onClick}>
      x
    </div>
  )
}
