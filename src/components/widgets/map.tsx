import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'
// import topology from '../../data/us_states.topojson'
import mapData from '../../data/us-states.json'
import censusData from '../../data/census.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { CensusDataPoint } from '../../types/census'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('1 / 1 / 4 / 13'),
    ...theme.typography.sortOfLarge,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {
    ...theme.common.flexBox,
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    // maxWidth: 100,
    textAlign: 'center',
    fontSize: theme.typography.small.fontSize,
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

export const Map: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as PoliceViolenceDataPoint[]
  const census: CensusDataPoint[] = censusData as CensusDataPoint[]
  const states = census.reduce((obj, item) => {
    obj[item.state] = item.state_code
    return obj
  }, {})

  const pathsForMap = mapData //d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/25240/us-states.json")

  const dimensions = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 1.6,
  }

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
  }

  useEffect(() => {
    const svg = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)

    const projection = d3
      .geoAlbersUsa()
      .scale(dimensions.width)
      .translate([dimensions.width / 2, dimensions.height / 2])
    const path = d3.geoPath().projection(projection)

    svg
      .append('div')
      .attr('id', 'svg')
      .append('div')
      .attr('class', 'map_container')
      .append('svg')
      .attr('viewBox', '0 0 ' + dimensions.width + ' ' + dimensions.height)
      .attr('preserveAspectRatio', 'xMinYMin')

    svg
      .append('g')
      .attr('id', 'map')
      .selectAll('path')
      .data(pathsForMap.features)
      .join('path')
      .attr('d', d => path(d))
      .style('stroke', 'white')
      .style('fill', 'darkblue')

    const labels = svg.append('g').attr('id', 'labels')
    labels
      .selectAll('text')
      .data(pathsForMap.features)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', theme.typography.smallest.fontSize)
      .attr('fill', 'white')
      .text(d => states[d.properties.name])
      .attr('x', d => path.centroid(d)[0])
      .attr('y', d => path.centroid(d)[1])
  }, [dimensions.height, dimensions.width, pData])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>police killings in different states</div>
    </div>
  )
}
