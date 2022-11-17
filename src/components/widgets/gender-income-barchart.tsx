import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('4 / 1 / 5 / 16'),
    ...theme.typography.sortOfLarge,
    '& svg > g > rect': {
      transition: 'all 0.05s ease-out',
    },
    transition: 'all 0.05s ease-out',
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

export const GenderIncomeBarchart: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 6 - 20,
    width: window.innerWidth / 1.5,
    margin: {
      top: 10,
      bottom: 20,
      right: 10,
      left: 50,
    },
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map(d => Number(d.hhincome_median_census_tract)))])
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
  const yScale = d3
    .scaleBand()
    .domain([...new Set(data.map(d => d.gender))])
    .range([dimensions.height, dimensions.margin.bottom])
    .padding(0.1)

  useEffect(() => {
    const svg = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)

    svg.append('g').attr('color', theme.colors.darkGray)

    svg
      .append('g')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .call(d3.axisBottom(xScale).tickFormat(d => (d === 0 ? d : d / 1000 + 'K')))
      .attr('transform', 'translate(0, ' + (dimensions.height - dimensions.margin.bottom) + ')')
      .selectAll('text')
      .attr('transform', 'translate(' + dimensions.margin.right + ', 4)')
      .style('text-anchor', 'end')

    svg
      .append('g')
      .call(d3.axisLeft(yScale))
      .attr('transform', 'translate(' + dimensions.margin.left + ', ' + -dimensions.margin.bottom + ')')

    svg
      .append('g')
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.hhincome_median_census_tract))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('y', d => yScale(d.gender) - (dimensions.margin.bottom - dimensions.margin.top))
      .attr('height', () => yScale.bandwidth() / 2)
      .attr('width', () => 1)
      .attr('fill', () => theme.colors.primary)
      .on('mouseover', function () {
        d3.select(this)
          .attr('height', () => yScale.bandwidth())
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .attr('y', d => yScale(d.gender) - dimensions.margin.bottom)
          .attr('width', () => 3)
          .attr('fill', () => theme.colors.secondary)
      })
      .on('mouseout', function () {
        d3.select(this)
          .attr('height', () => yScale.bandwidth() / 2)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .attr('y', d => yScale(d.gender) - (dimensions.margin.bottom - dimensions.margin.top))
          .attr('width', () => 1)
          .attr('fill', () => theme.colors.primary)
      })
      .transition()
      .duration(1500)
  }, [
    dimensions.height,
    dimensions.width,
    data,
    dimensions.margin.bottom,
    dimensions.margin.right,
    dimensions.margin.left,
    dimensions.margin.top,
    xScale,
    yScale,
  ])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
    </div>
  )
}
