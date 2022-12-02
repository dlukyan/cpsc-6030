import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'
import mapData from '../../data/us-states.json'
import censusData from '../../data/census.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { CensusDataPoint } from '../../types/census'
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
  stateName: {
    ...theme.typography.larger,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
}))

export const Map: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const selectedState = useSelectedState()

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

    let projectionSelectedState
    let pathSelectedState: d3.GeoPath<any, d3.GeoPermissibleObjects>

    if (selectedState.state !== '') {
      projectionSelectedState = d3.geoMercator().fitSize(
        [dimensions.width, dimensions.height - 250],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mapData.features.find(f => f.properties.name === selectedState.state).geometry,
      )
      // .center([-10, 0])
      pathSelectedState = d3.geoPath().projection(projectionSelectedState)
    }

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
        selectedState.state === ''
          ? pathsForMap.features
          : pathsForMap.features.filter(f => f.properties.name === selectedState.state),
      )
      .join('path')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('d', d => (selectedState.state === '' ? path(d) : pathSelectedState(d)))
      .attr('class', 'state')
      .attr('id', d => `state-${d.id}`)
      .style('stroke', 'white')
      .style('fill', d =>
        dataPerStateByParty[states[d.properties.name]]?.r > dataPerStateByParty[states[d.properties.name]]?.d
          ? theme.colors.red
          : theme.colors.blue,
      )
      .style(
        'opacity',
        d => data.filter(killing => killing.state === states[d.properties.name]).length / stateWithMostKillings + 0.2,
      )
      .style('cursor', selectedState.state === '' ? 'pointer' : 'default')
      .on('mouseover', function () {
        if (selectedState.state === '') {
          // d3.selectAll('.state').style('opacity', 0.5)
          // d3.select(this).style('fill', theme.colors.red).style('opacity', 1)
        }
      })
      .on('mouseout', function () {
        if (selectedState.state === '') {
          // d3.selectAll('.state').style('opacity', 1)
          // d3.select(this).style('fill', theme.colors.blue)
        }
      })
      .on('click', function (e, d) {
        selectedState.setSelected(d.properties.name)
      })

    if (selectedState.state === '') {
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
            console.log(_, d)
            // d3.selectAll('.state').style('opacity', 0.5)
            // svg.selectAll(`path#state-${d.id}`).style('fill', theme.colors.red).style('opacity', 1)
          }
        })
        .on('mouseout', function (_, d) {
          if (selectedState.state === '') {
            console.log(_, d)
            // svg.selectAll(`path#state-${d.id}`).style('fill', theme.colors.blue).style('opacity', 1)
          }
        })
        .on('click', function (e, d) {
          selectedState.setSelected(d.properties.name)
        })
    }
  }, [
    data,
    dataPerStateByParty,
    dimensions.height,
    dimensions.width,
    pData,
    pathsForMap.features,
    selectedState,
    stateWithMostKillings,
    states,
  ])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={selectedState.state === '' ? classes.text : classes.stateName}>
        {selectedState.state === '' ? 'police killings in different states' : selectedState.state}
      </div>
      {selectedState.state !== '' && (
        <div className={classes.resetButton} onClick={() => selectedState.setSelected('')}>
          Reset
        </div>
      )}
    </div>
  )
}
