import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('1 / 13 / 4 / 21', 'top right', 1.015),
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

export const ScatterPlot: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 2 - 20,
    width: window.innerWidth / 3,
    margin: {
      top: 10,
      bottom: 50,
      right: 10,
      left: 50,
    },
  }

  const xScale = d3
    .scaleLinear()
    .domain([Math.min(...data.map(d => Number(d.age))) / 2, Math.max(...data.map(d => Number(d.age)))])
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map(d => Number(d.hhincome_median_census_tract)))])
    .range([dimensions.height, 0])

  useEffect(() => {
    const svg = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)

    svg.append('g').attr('color', theme.colors.darkGray)

    svg
      .append('g')
      .call(d3.axisBottom(xScale)) //.tickValues(xScale.domain().filter(function (d, i) { return !(i % 5) })))
      .attr('transform', 'translate(0, ' + (dimensions.height - dimensions.margin.bottom) + ')')
      .selectAll('text')
      .attr('transform', 'translate(' + dimensions.margin.right / 2 + ', 4)')
      .style('text-anchor', 'end')

    svg
      .append('text')
      .attr('transform', 'translate(' + dimensions.width / 2 + ' ,' + (dimensions.height - dimensions.margin.top) + ')')
      // .style("text-anchor", "middle")
      .style('font-size', 14)
      .text("Victim's age")

    svg
      .append('g')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .call(d3.axisLeft(yScale).tickFormat(d => (d === 0 ? d : d / 1000 + 'K')))
      .attr('transform', 'translate(' + dimensions.margin.left + ', ' + -dimensions.margin.bottom + ')')

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' +
          dimensions.margin.right +
          ' ,' +
          (dimensions.height - dimensions.margin.bottom) / 2 +
          ') rotate(-90)',
      )
      .style('text-anchor', 'middle')
      .style('font-size', 14)
      .text('Location household average income')

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return xScale(d.age)
      })
      .attr('cy', function (d) {
        return yScale(d.hhincome_median_census_tract) - dimensions.margin.bottom
      })
      .attr('r', 1.5)
      .style('fill', theme.colors.primary)
      .transition()
      .duration(1500)
  }, [dimensions.height, dimensions.width, data])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      {/* <div className={classes.text}>
        <div className={classes.percentage}>{percentage}%</div>
        <div className={classes.info}>of police killings include a suspect trying to flee</div>
      </div> */}
    </div>
  )
}
