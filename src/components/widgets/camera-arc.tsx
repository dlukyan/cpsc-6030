import rawData from '../../data/data_cleansed.json'

import React from 'react'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { ArcChart } from '../vizulizations/arc-chart'

export const CameraArc: React.FC = () => {
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: (window.innerHeight / 9) * 3 - 20,
    width: (window.innerWidth / 15) * 3 - 20,
  }

  const percentage = Math.round((data.filter(d => d.wapo_body_ccamera === 'Yes').length / data.length) * 100)

  const gridArea = '4 / 1 / 7 / 4'

  return (
    <ArcChart
      percentage={percentage}
      text={'of police killings include an officer wearing a body cam'}
      dimensions={dimensions}
      gridArea={gridArea}
      origin={''}
      id={'camera-arc'}
    />
  )
}
