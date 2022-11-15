import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('4 / 16 / 6 / 21'),
    ...theme.typography.sortOfLarge,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  text: {
    ...theme.common.flexBox,
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    textAlign: 'center',
    fontSize: theme.typography.small.fontSize
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

export const PartyKillingsCircle: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 3.1,
    width: window.innerWidth / 4.5,
    margin: {
      top: 10,
      bottom: 20,
      right: 10,
      left: 50,
    }
  }

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
  }

  useEffect(() => {
    const svgElement = d3
      .select(ref.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

    const color = d3.scaleOrdinal()
      .range(['blue', 'red']);

    const pie = d3.pie().value(function (d) {
      return d[1]
    });
    const data_ready = pie(Object.entries(pData));

    const container = svgElement.append('g')
      .attr('transform', 'translate(' + dimensions.width / 2 + ', ' + dimensions.height/ 2 + ')')

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(dimensions.height / 2)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) {
        return color(d.data[1])
      })
      // .attr("stroke", "black")
      // .style("stroke-width", "0px")
      .style('opacity', 0.7)
      .transition()
      .duration(1500)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) {
        return d.data[0]
      })
      .attr('transform', function (d) {
        return 'translate(' + arcGenerator.centroid(d) + ')'
      })
      .style('text-anchor', 'middle')
      .style('font-size', 12)
      .style('opacity', 0.7)
  }, [dimensions.height, dimensions.width, pData])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>police killing location's party dominance</div>
    </div>
  )
}
