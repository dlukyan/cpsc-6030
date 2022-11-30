import rawData from '../../data/data_cleansed.json'
import censusData from '../../data/census.json'

import React from 'react'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { ArcChart } from '../vizulizations/arc-chart'
import { useSelectedState } from '../../context/selected-state-context'

export const FleeArc: React.FC = () => {
  const selectedState = useSelectedState()

  let data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]
  if (selectedState.state !== '')
    data = data.filter(d => d.state === censusData.find(s => s.state === selectedState.state)?.state_code)

  const dimensions = {
    height: (window.innerHeight / 9) * 3 - 20,
    width: (window.innerWidth / 15) * 3 - 20,
  }

  const percentage = Math.round(
    (data.filter(d => d.wapo_flee === 'Car' || d.wapo_flee === 'Car, Foot' || d.wapo_flee === 'Foot').length /
      data.length) *
      100,
  )

  const gridArea = '7 / 1 / 10 / 4'

  return (
    <ArcChart
      percentage={percentage}
      text={'of police killings include a suspect trying to flee'}
      dimensions={dimensions}
      gridArea={gridArea}
      origin={''}
      id={'flee-arc'}
    />
  )
}
