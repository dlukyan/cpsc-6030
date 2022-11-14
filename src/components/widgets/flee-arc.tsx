import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('5 / 6 / 6 / 11'),
    ...theme.typography.sortOfLarge,
  },
  text: {
    ...theme.common.flexBox,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    maxWidth: 100,
  },
  percentage: {
    ...theme.typography.largest,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  info: {
    ...theme.typography.small,
    color: theme.colors.darkGray,
  },
}))

export const FleeArc: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 5 - 20,
    width: window.innerWidth / 4 - 20,
  }

  const percentage = Math.round(
    (data.filter(d => d.wapo_flee === 'Car' || d.wapo_flee === 'Car, Foot' || d.wapo_flee === 'Foot').length /
      data.length) *
      100,
  )

  useEffect(() => {
    const svgElement = d3
      .select(ref.current)
      .attr('width', dimensions.width - 100)
      .attr('height', dimensions.height)

    const container = svgElement.append('g').attr('transform', 'translate(80, 80)')

    container
      .append('path')
      .attr('class', 'arc')
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .arc()
          .innerRadius(40)
          .outerRadius(70)
          .startAngle(-90 * (Math.PI / 180))
          .endAngle(90 * (Math.PI / 180)),
      )
      .attr('fill', theme.colors.empty)

    container
      .append('path')
      .attr('class', 'arc')
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .arc()
          .innerRadius(40)
          .outerRadius(70)
          .startAngle(-90 * (Math.PI / 180))
          .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
      )
      .attr('fill', theme.colors.primary)
  }, [dimensions.height, dimensions.width, percentage])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>
        <div className={classes.percentage}>{percentage}%</div>
        <div className={classes.info}>of police killings include a suspect trying to flee</div>
      </div>
    </div>
  )
}
