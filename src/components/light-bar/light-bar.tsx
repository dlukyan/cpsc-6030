import React from 'react'
import './light-bar.css'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(() => ({
  container: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 70,
  },
}))

export const LightBar: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className="lightbar">
        <div id="light-1" className="light strobe blue">
          <div className="inner-light"></div>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
        </div>
        <div id="light-2" className="light strobe blue">
          <div className="inner-light"></div>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
        </div>
        <div id="light-3" className="light strobe blue">
          <div className="inner-light"></div>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
        </div>
        <div id="light-4" className="light strobe red delay">
          <div className="inner-light"></div>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
        </div>
        <div id="light-5" className="light strobe red delay">
          <div className="inner-light"></div>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
        </div>
        <div id="light-6" className="light strobe red delay">
          <div className="inner-light"></div>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
          <span className="bulb"></span>
        </div>
      </div>
    </div>
  )
}
