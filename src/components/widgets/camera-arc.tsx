import rawData from '../../data/data_cleansed.json'
import censusData from '../../data/census.json'

import React from 'react'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { ArcChart } from '../vizulizations/arc-chart'
import { useSelectedState } from '../../context/selected-state-context'

export const CameraArc: React.FC = () => {
  const selectedState = useSelectedState()

  let data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]
  if (selectedState.state !== '')
    data = data.filter(d => d.state === censusData.find(s => s.state === selectedState.state)?.state_code)

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
