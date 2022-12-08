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
  },
  containerFocused: {
    ...theme.common.vizContainerClicked({ height: 700, width: 700, right: 0, top: 0 }, 'top right'),
  },
  containerUnfocused: {
    ...theme.common.vizContainer('1 / 13 / 7 / 16', 'top right', 1.015),
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
  hint: {
    position: 'absolute',
    bottom: 80,
    zIndex: 10000,
    ...theme.typography.small,
    right: '0%',
    transform: 'translateX(-50%)',
  },
}))

export const ScatterPlot: React.FC = () => {
  const classes = useStyles()
  const selectedState = useSelectedState()

  const [focused, setFocused] = useState<boolean>(false)
  const ref = useRef(null)

  let data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]
  const dataOriginal = data
  if (selectedState.state !== '')
    data = data.filter(d => d.state === censusData.find(s => s.state === selectedState.state)?.state_code)

  const dimensions = {
    height: focused ? 500 : (window.innerHeight / 9) * 6 - 20,
    width: focused ? 650 : (window.innerWidth / 15) * 3 - 20,
    margin: {
      top: 10,
      bottom: 50,
      right: 10,
      left: 50,
    },
  }

  const xScale = d3
    .scaleLinear()
    .domain([Math.min(...dataOriginal.map(d => Number(d.age))) / 2, Math.max(...dataOriginal.map(d => Number(d.age)))])
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...dataOriginal.map(d => Number(d.hhincome_median_census_tract))) + 5000])
    .range([dimensions.height, dimensions.margin.bottom])

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
      .call(d3.axisBottom(xScale))
      .attr('transform', 'translate(0, ' + (dimensions.height - dimensions.margin.bottom) + ')')
      .selectAll('text')
      .attr('transform', 'translate(' + dimensions.margin.right / 2 + ', 4)')
      .style('text-anchor', 'end')

    svg
      .append('text')
      .attr('transform', 'translate(' + dimensions.width / 2 + ' ,' + (dimensions.height - dimensions.margin.top) + ')')
      .text("Victim's age")
      .style('font-size', 10)
      .style('font-family', '"Rubik", sans-serif')
      .style('color', theme.colors.darkGray)

    svg
      .append('g')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .call(d3.axisLeft(yScale).tickFormat(d => (d === 0 ? d : d / 1000 + 'K')))
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
      .style('font-size', 10)
      .style('font-family', '"Rubik", sans-serif')
      .style('color', theme.colors.darkGray)

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
      .attr('r', focused ? 2.5 : 1.5)
      .attr('fill', d => (d.congressperson_party === 'Democrat' ? theme.colors.blue : theme.colors.red))
      .on('mouseover', function (_, d) {
        if (focused) {
          d3.select(this).attr('r', 7)

          d3.select('#tooltip')
            .style('left', _.pageX + 'px')
            .style('top', _.pageY + 'px')
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
        }
      })
      .on('mouseout', function () {
        if (focused) {
          d3.select(this).attr('r', focused ? 2.5 : 1.5)

          d3.select('#tooltip').style('opacity', 0)
        }
      })
      .on('mousemove', function (e) {
        if (focused)
          d3.select('#tooltip')
            .style('left', e.pageX + 10 + 'px')
            .style('top', e.pageY + 10 + 'px')
      })
      .transition()
      .duration(1500)
  }, [
    dimensions.height,
    dimensions.width,
    data,
    dimensions.margin.bottom,
    dimensions.margin.right,
    dimensions.margin.top,
    dimensions.margin.left,
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
        {focused && <h1 className={classes.question}>Are killings&apos; area income and victims&apos; age related?</h1>}
        <svg ref={ref} />
        {focused && <X onClick={() => setFocused(false)} />}
      </div>
      {focused && <Overlay onClick={() => setFocused(false)} />}
      {focused && (
        <div className={classes.hint}>
          <b>*</b>This democrat and republican data is from the county level
        </div>
      )}
    </>
  )
}
