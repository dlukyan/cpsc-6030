import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'
import censusData from '../../data/census.json'

import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { classNames } from '../../utils/classNames'
import { Overlay } from '../overlay'
import { X } from '../x'
import { useSelectedState } from '../../context/selected-state-context'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.typography.sortOfLarge,
    '& svg > g > rect': {
      transition: 'all 0.05s ease-out',
    },
    transition: 'all 0.05s ease-out',
  },
  containerUnfocused: {
    ...theme.common.vizContainer('8 / 4 / 10 / 13', 'bottom', 1.01),
  },
  containerFocused: {
    ...theme.common.vizContainerClicked(
      { height: 500, width: (window.innerWidth * 3) / 4, left: window.innerWidth / 8, bottom: 0 },
      'bottom',
    ),
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
    color: theme.colors.blue,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  info: {
    ...theme.typography.small,
    color: theme.colors.darkGray,
  },
  question: {
    ...theme.typography.larger,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '15px 0',
    color: theme.colors.primary,
    letterSpacing: 1.02,
  },
}))

export const GenderIncomeBarchart: React.FC = () => {
  const classes = useStyles()
  const selectedState = useSelectedState()

  const [focused, setFocused] = useState<boolean>(false)

  const ref = useRef(null)

  let data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]
  const dataOriginal = data
  const genders = new Set(data.map(d => d.gender))
  if (selectedState.state !== '')
    data = data.filter(d => d.state === censusData.find(s => s.state === selectedState.state)?.state_code)

  const dimensions = {
    height: focused ? 300 : (window.innerHeight / 9) * 2 - 20,
    width: focused ? (window.innerWidth * 3) / 4 - 40 : (window.innerWidth / 15) * 9,
    margin: {
      top: 10,
      bottom: 20,
      right: 10,
      left: 50,
    },
  }

  const xScale = d3
    .scaleLinear()
    .domain([0, Math.max(...dataOriginal.map(d => Number(d.hhincome_median_census_tract)))])
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

  const yScale = d3
    .scaleBand()
    .domain(genders)
    .range([dimensions.height - dimensions.margin.bottom * 1.5, dimensions.margin.bottom])
    .padding(0.1)

  useEffect(() => {
    const priceStrFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    const svg = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)
    svg.selectAll('*').remove()

    svg.append('g').attr('color', theme.colors.darkGray)

    svg
      .append('g')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .call(d3.axisBottom(xScale).tickFormat(d => (d === 0 ? d : d / 1000 + 'K')))
      .attr('transform', 'translate(0, ' + (dimensions.height - dimensions.margin.bottom * 2.5) + ')')
      .selectAll('text')
      .attr('transform', 'translate(' + dimensions.margin.right + ', 4)')
      .style('text-anchor', 'end')
      .style('font-size', 10)
      .style('font-family', '"Rubik", sans-serif')
      .style('color', theme.colors.darkGray)

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + dimensions.width / 2.5 + ' ,' + (dimensions.height - dimensions.margin.top - 5) + ')',
      )
      .style('font-size', 10)
      .style('font-family', '"Rubik", sans-serif')
      .style('color', theme.colors.darkGray)
      .text('Location household median income')

    svg
      .append('g')
      .call(d3.axisLeft(yScale))
      .attr('transform', 'translate(' + dimensions.margin.left + ', ' + -dimensions.margin.bottom + ')')

    d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .attr('style', 'position: absolute; opacity: 0; z-index: 1000')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '5px')

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
      .attr('height', () => yScale.bandwidth() / 1.5)
      .attr('width', () => 1)
      .attr('fill', d => (d.congressperson_party === 'Democrat' ? theme.colors.blue : theme.colors.red))
      .on('mouseover', function (e, d) {
        if (focused) {
          d3.select('#tooltip')
            .style('left', e.pageX + 'px')
            .style('top', e.pageY + 'px')
            .style('opacity', 1)
            .html(
              'Name: ' +
                d.name +
                '<br/>Age: ' +
                d.age +
                '<br/>Date: ' +
                new Date(d.date).toDateString() +
                '<br/>Area income: ' +
                priceStrFormatter.format(d.hhincome_median_census_tract),
            )
          d3.select(this)
            .attr('height', () => yScale.bandwidth())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .attr('y', d => (d.gender === 'Female' ? 0 : yScale(d.gender) / 1.3))
            .attr('width', () => 3)
        }
      })
      .on('mouseout', function () {
        if (focused) {
          d3.select('#tooltip').style('opacity', 0)
          d3.select(this)
            .attr('height', () => yScale.bandwidth() / 1.5)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .attr('y', d => yScale(d.gender) - (dimensions.margin.bottom - dimensions.margin.top))
            .attr('width', () => 1)
        }
      })
      .on('mousemove', function (e) {
        if (focused)
          d3.select('#tooltip')
            .style('left', e.pageX + 10 + 'px')
            .style('top', e.pageY + 10 + 'px')
      })
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
    focused,
  ])

  return (
    <>
      <div
        className={classNames(classes.container, focused ? classes.containerFocused : classes.containerUnfocused)}
        onClick={() => (!focused ? setFocused(true) : null)}
      >
        {focused && <X onClick={() => setFocused(false)} />}
        {focused && (
          <h1 className={classes.question}>
            What is the distribution across sex and the median household income in the area a police killing happened?
          </h1>
        )}
        <svg ref={ref} />
      </div>
      {focused && <Overlay onClick={() => setFocused(false)} />}
    </>
  )
}
