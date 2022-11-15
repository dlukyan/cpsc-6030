import rawData from '../../data/data_cleansed.json'

import React from 'react'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { ArcChart } from '../vizulizations/arc-chart'

export const CameraArc: React.FC = () => {
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 5 - 20,
    width: window.innerWidth / 4 - 20,
  }

  const percentage = Math.round((data.filter(d => d.wapo_body_ccamera === 'Yes').length / data.length) * 100)

  const gridArea = '5 / 1 / 6 / 6'

  return (
    <ArcChart
      percentage={percentage}
      text={'of police killings include an officer wearing a body cam'}
      dimensions={dimensions}
      gridArea={gridArea}
    />
  )
}
