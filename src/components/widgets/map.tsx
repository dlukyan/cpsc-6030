import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'
import mapData from '../../data/us-states.json'
import censusData from '../../data/census.json'
import votesData from '../../data/votes_cleaned.json'

import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { CensusDataPoint } from '../../types/census'
import { VotesDataPoint } from '../../types/votes'
import { useSelectedState } from '../../context/selected-state-context'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('3 / 4 / 8 / 13', '', 1, { borderTop: 'none' }),
    ...theme.typography.sortOfLarge,
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& svg > g > path': {
      transition: 'all 0.25s ease-in-out',
    },
  },
  text: {
    ...theme.common.flexBox,
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
  resetButton: {
    ...theme.elements.button,
    position: 'absolute',
    top: '70vh',
    left: '74vw',
    backgroundColor: theme.colors.blue,
    borderRadius: 5,
    color: theme.colors.white,
    padding: 10,
    cursor: 'pointer',
  },
}))

export const Map: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const selectedState = useSelectedState()
  const [hoveredState, setHoveredState] = useState<string>('')

  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]
  const dataPerStateByParty: { [stateCode: string]: { total: number; d: number; r: number } } = {}
  data.map(d => {
    if (d.state !== 'District of Columbia') {
      if (dataPerStateByParty[d.state] === undefined) {
        dataPerStateByParty[d.state] = { total: 0, r: 0, d: 0 }
      }
      if (d.congressperson_party === 'Democrat') dataPerStateByParty[d.state].d += 1
      else dataPerStateByParty[d.state].r += 1
      dataPerStateByParty[d.state].total += 1
    }
  })

  const census: CensusDataPoint[] = censusData as unknown as CensusDataPoint[]
  const states: { [state: string]: string } = census.reduce((obj, item) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    obj[item.state] = item.state_code
    return obj
  }, {})

  const votes: VotesDataPoint[] = votesData as unknown as VotesDataPoint[]

  const killPercent = census.map(c => ({
    state: c.state_code,
    ratio: Number(
      (
        (1000000 * data.filter(d => d.state === c.state_code).length) /
        Math.floor(
          (Number(c['2013']) +
            Number(c['2014']) +
            Number(c['2015']) +
            Number(c['2016']) +
            Number(c['2017']) +
            Number(c['2018']) +
            Number(c['2019']) +
            Number(c['2020']) +
            Number(c['2021'])) /
            9,
        )
      ).toFixed(2),
    ),
  }))

  const stateWithMostKillings = Math.max(
    ...Object.values(Object.keys(states).map(s => dataPerStateByParty[states[s]].total)),
  )

  const pathsForMap = mapData //d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/25240/us-states.json")

  const dimensions = {
    height: (window.innerHeight / 9) * 7 - 10,
    width: (window.innerWidth / 15) * 9,
  }

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
  }

  useEffect(() => {
    const svg = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)
    svg.selectAll('*').remove()

    const projection = d3
      .geoAlbersUsa()
      .scale(dimensions.width)
      .translate([dimensions.width / 2, dimensions.height / 3])
    const path = d3.geoPath().projection(projection)

    const colorScale = d3
      .scaleQuantize()
      .domain([0, Math.floor(Math.max(...killPercent.map(kp => kp.ratio)) + 1)])
      .range([0.4, 0.6, 0.8, 1])

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
      .data(
        hoveredState === ''
          ? pathsForMap.features
          : [
              ...pathsForMap.features.filter(f => f.properties.name !== hoveredState),
              pathsForMap.features.find(f => f.properties.name === hoveredState),
            ],
      )
      .join('path')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('d', d => path(d))
      .attr('class', 'state')
      .attr('id', d => `state-${d.id}`)
      .style('fill', d => {
        if (selectedState.state === '' || d.properties.name === selectedState.state)
          return votes.filter(
            s =>
              s.state_code === states[d.properties.name != 'District of Columbia' ? d.properties.name : 'Washington'],
          )[0].rep >
            votes.filter(
              s =>
                s.state_code === states[d.properties.name != 'District of Columbia' ? d.properties.name : 'Washington'],
            )[0].dem
            ? theme.colors.red
            : theme.colors.blue
        else return theme.colors.darkGray
      })
      .style('opacity', d =>
        colorScale(
          killPercent.filter(
            kp => kp.state === states[d.properties.name != 'District of Columbia' ? d.properties.name : 'Washington'],
          )[0].ratio,
        ),
      )
      .style('stroke', d => (d.properties.name === hoveredState ? 'black' : 'white'))
      .style('stroke-opacity', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function (_, d) {
        if (selectedState.state === '') {
          setHoveredState(d.properties.name)
        }
      })
      .on('mouseout', function () {
        if (selectedState.state === '') {
          setHoveredState('')
        }
      })
      .on('click', function (_, d) {
        if (selectedState.state === '') selectedState.setSelected(d.properties.name)
        else selectedState.setSelected('')
      })

    const labels = svg.append('g').attr('id', 'labels')
    labels
      .selectAll('text')
      .data(pathsForMap.features)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', theme.typography.smallest.fontSize)
      .attr('fill', 'white')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .text(d => states[d.properties.name])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('x', d => path.centroid(d)[0])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('y', d => path.centroid(d)[1])
      .style('cursor', 'pointer')
      .on('mouseover', function (_, d) {
        if (selectedState.state === '') {
          setHoveredState(d.properties.name)
        }
      })
      .on('mouseout', function () {
        if (selectedState.state === '') {
          setHoveredState('')
        }
      })
      .on('click', function (e, d) {
        if (selectedState.state === '') selectedState.setSelected(d.properties.name)
        else selectedState.setSelected('')
      })
  }, [
    data,
    dataPerStateByParty,
    dimensions.height,
    dimensions.width,
    hoveredState,
    killPercent,
    pData,
    pathsForMap.features,
    selectedState,
    stateWithMostKillings,
    states,
    votes,
  ])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>police killings in different states</div>
    </div>
  )
}
