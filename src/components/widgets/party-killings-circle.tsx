import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'
import { DemocratIcon } from '../../assets/icons/democrat-icon'
import { RepublicanIcon } from '../../assets/icons/republican-icon'
import { Party } from '../../types/census'
import { renderToStaticMarkup } from 'react-dom/server'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('4 / 16 / 6 / 21', 'bottom right', 1.02),
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
}))

export const PartyKillingsCircle: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 3.1,
    width: window.innerWidth / 4.5,
    margin: {
      top: 10,
      bottom: 20,
      right: 10,
      left: 50,
    },
  }

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
  }

  useEffect(() => {
    const svgElement = d3.select(ref.current).attr('width', dimensions.width).attr('height', dimensions.height)

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
        d3.select(this).attr('d', arcGenerator(true))
      })
      .on('mouseout', function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3.select(this).attr('d', arcGenerator(false))
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
        return `translate(${centroid[0] - 40}, ${centroid[1] - 32})`
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('id', d => ((d.data[0] as Party) === 'Democrats' ? 'd-icon' : 'r-icon'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .html(d => renderToStaticMarkup((d.data[0] as Party) === 'Democrats' ? <DemocratIcon /> : <RepublicanIcon />))

    // container.append('path').attr('d', democratIconPath).attr('fill', 'white')
  }, [dimensions.height, dimensions.width, pData])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>police killing location&apos;s party dominance</div>
    </div>
  )
}
