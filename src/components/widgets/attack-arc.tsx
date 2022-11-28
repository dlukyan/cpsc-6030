import rawData from '../../data/data_cleansed.json'

import React from 'react'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { ArcChart } from '../vizulizations/arc-chart'

export const AttackArc: React.FC = () => {
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: (window.innerHeight / 9) * 3 - 20,
    width: (window.innerWidth / 15) * 3 - 20,
  }

  const percentage = Math.round(
    (data.filter(d => d.wapo_threat_level === 'Attack' || d.wapo_threat_level === 'Brandished Weapon').length /
      data.length) *
      100,
  )

  const gridArea = '1 / 1 / 4 / 4'

  return (
    <ArcChart
      percentage={percentage}
      text={'of police killings include a suspect attacking an officer'}
      dimensions={dimensions}
      gridArea={gridArea}
      origin={''}
      id={'attack-arc'}
    />
  )
}
