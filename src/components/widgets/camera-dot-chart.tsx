import * as d3 from 'd3'
import rawData from '../../data/police_violence_cleaned.json'
import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('5 / 1 / 6 / 6'),
    ...theme.common.flexBox,
    gap: 10,
    justifyContent: 'space-around',
  },
  text: {
    ...theme.typography.medium,
    color: theme.colors.darkGray,
    maxWidth: 120,
  },
  percentage: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
}))

export const CameraDotChart: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 5 - 20,
    width: window.innerWidth / 4 - 120,
  }

  const totalDataPoints = data.length
  const totals = {
    yes: 0,
    other: 0,
  }

  data.map(d => {
    if (d.wapo_body_camera === 'Yes') totals.yes += 1
    else if (
      d.wapo_body_camera === 'Surveillance Video' ||
      d.wapo_body_camera === 'Dash Cam Video' ||
      d.wapo_body_camera === 'Vehicle' ||
      d.wapo_body_camera === 'Bystander Video'
    )
      totals.other += 1
  })

  const percentages = {
    yes: Math.round((totals.yes / totalDataPoints) * 100),
    other: Math.round((totals.other / totalDataPoints) * 100),
  }

  useEffect(() => {
    const svgElement = d3
      .select(ref.current)
      .attr('width', dimensions.width - 100)
      .attr('height', dimensions.height)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const y = d3.scaleBand().range([0, 125]).domain(d3.range(10))

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = d3.scaleBand().range([0, 125]).domain(d3.range(10))

    const data = d3.range(100)

    const container = svgElement.append('g').attr('transform', 'translate(10,10)')

    container
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('id', d => 'id' + d)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('cx', d => x(d % 10))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('cy', d => y(Math.floor(d / 10)))
      .attr('r', 5)
      .attr('fill', d =>
        d < percentages.yes
          ? theme.colors.primary
          : d < percentages.other + percentages.yes
          ? theme.colors.secondary
          : theme.colors.empty,
      )
  }, [dimensions.height, dimensions.width])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>
        <b className={classes.percentage}>{percentages.yes}%</b> of police killings body cam video, while{' '}
        <b className={classes.percentage} style={{ color: theme.colors.secondary }}>
          {percentages.other}%
        </b>{' '}
        of included video of another type
      </div>
    </div>
  )
}
