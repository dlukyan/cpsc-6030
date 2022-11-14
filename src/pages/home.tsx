import React from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'
import { Map } from '../components/widgets/map'
import { ScatterPlot } from '../components/widgets/scatter-plot'
import { GenderIncomeBarchart } from '../components/widgets/gender-income-barchart'
import { CameraDotChart } from '../components/widgets/camera-dot-chart'
import { FleeArc } from '../components/widgets/flee-arc'
import { AttackArc } from '../components/widgets/attack-arc'
import { PartyKillingsCircle } from '../components/widgets/party-killings-circle'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(20, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
  },
  title: {
    ...theme.typography.largest,
  },
}))

export const HomePage: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Map />
      <ScatterPlot />
      <GenderIncomeBarchart />
      <CameraDotChart />
      <FleeArc />
      <AttackArc />
      <PartyKillingsCircle />
    </div>
  )
}
