import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(() => ({
  overlay: {
    zIndex: 61,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}))

export const Overlay: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const classes = useStyles()
  return <div className={classes.overlay} onClick={onClick} />
}
