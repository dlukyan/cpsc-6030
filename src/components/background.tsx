import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  viewContainer: {
    minHeight: '100vh',
    ...theme.common.flexBox,
  },
}))

export const Background: React.FC<{ contentClassName?: string; children: React.ReactNode }> = ({
  children,
  contentClassName,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.viewContainer}>
      <div className={contentClassName}>{children}</div>
    </div>
  )
}
