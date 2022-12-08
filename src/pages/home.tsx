import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'
import { Map } from '../components/widgets/map'
import { ScatterPlot } from '../components/widgets/scatter-plot'
import { GenderIncomeBarchart } from '../components/widgets/gender-income-barchart'
import { CameraArc } from '../components/widgets/camera-arc'
import { FleeArc } from '../components/widgets/flee-arc'
import { AttackArc } from '../components/widgets/attack-arc'
import { PartyKillingsCircle } from '../components/widgets/party-killings-circle'
import { Heading } from '../components/heading'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(15, 1fr)',
    gridTemplateRows: 'repeat(9, 1fr)',
  },
  title: {
    ...theme.typography.largest,
  },
  hint: {
    position: 'absolute',
    bottom: 0,
    ...theme.typography.small,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10000,
  },
}))

export const HomePage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Heading />
      <Map />
      <ScatterPlot />
      <GenderIncomeBarchart />
      <CameraArc />
      <FleeArc />
      <AttackArc />
      <PartyKillingsCircle />
      <div className={classes.hint}>
        <b>*</b>This democrat and republican data is from the county level
      </div>
    </div>
  )
}
