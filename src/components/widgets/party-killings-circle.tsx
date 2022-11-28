import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { DemocratIcon } from '../../assets/icons/democrat-icon'
import { RepublicanIcon } from '../../assets/icons/republican-icon'
import { Party } from '../../types/census'
import { renderToStaticMarkup } from 'react-dom/server'
import { Overlay } from '../overlay'
import { X } from '../x'
import { classNames } from '../../utils/classNames'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.typography.sortOfLarge,
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& svg > g > path': {
      transition: 'all 0.25s ease-in-out',
    },
  },
  containerUnfocused: {
    ...theme.common.vizContainer('7 / 13 / 10 / 16', 'bottom right', 1.02),
  },
  containerFocused: {
    ...theme.common.vizContainerClicked({ height: 500, width: 500, bottom: 0, right: 0 }, 'bottom right'),
  },
  text: {
    ...theme.common.flexBox,
    textAlign: 'center',
    fontSize: theme.typography.small.fontSize,
  },
}))

export const PartyKillingsCircle: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)

  const [focused, setFocused] = useState<boolean>(false)

  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: focused ? 350 : (window.innerHeight / 9) * 3 - 40,
    width: focused ? 350 : (window.innerWidth / 15) * 3 - 20,
    margin: {
      top: 10,
      bottom: 20,
      right: 10,
      left: 50,
    },
  }

  useEffect(() => {
    const pData = {
      Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
      Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    }

    const svgElement = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)
    svgElement.selectAll('*').remove()

    const color = d3.scaleOrdinal().range([theme.colors.blue, theme.colors.red])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pie = d3.pie().value(d => d[1])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data_ready = pie(Object.entries(pData))

    const container = svgElement
      .append('g')
      .attr('transform', 'translate(' + dimensions.width / 2 + ', ' + dimensions.height / 2 + ')')

    const arcGenerator = (isHovered: boolean) =>
      d3
        .arc()
        .innerRadius(0)
        .outerRadius(dimensions.height / 2 - (isHovered ? 0 : 10))

    container
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('d', arcGenerator(false))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('fill', function (d) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return color(d.data[1])
      })
      .on('mouseover', function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (focused) d3.select(this).attr('d', arcGenerator(true))
      })
      .on('mouseout', function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (focused) d3.select(this).attr('d', arcGenerator(false))
      })
      .transition()
      .duration(1500)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const centroid = arcGenerator(false).centroid(d)
        return `translate(${centroid[0] - (focused ? 60 : 30)}, ${centroid[1] - (focused ? 38 : 28)})`
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('id', d => ((d.data[0] as Party) === 'Democrats' ? 'd-icon' : 'r-icon'))
      .html(d =>
        renderToStaticMarkup(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (d.data[0] as Party) === 'Democrats' ? (
            <DemocratIcon scale={focused ? 1.5 : 0.8} />
          ) : (
            <RepublicanIcon scale={focused ? 1.5 : 0.8} />
          ),
        ),
      )
  }, [data, dimensions.height, dimensions.width, focused])

  return (
    <>
      <div
        className={classNames(classes.container, focused ? classes.containerFocused : classes.containerUnfocused)}
        onClick={() => (focused ? null : setFocused(true))}
      >
        <svg ref={ref} />
        <div className={classes.text}>police killing location&apos;s party dominance</div>
        {focused && <X onClick={() => setFocused(false)} />}
      </div>
      {focused && <Overlay onClick={() => setFocused(false)} />}
    </>
  )
}
