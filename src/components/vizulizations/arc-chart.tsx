import * as d3 from 'd3'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('', '', 1),
    ...theme.typography.sortOfLarge,
    ...theme.common.flexBox,
    flexDirection: 'column',
    gap: 5,
    '& svg > g > path': {
      transition: 'all 0.25s ease-in-out',
    },
    '& svg > g > text': {
      transition: 'all 0.25s ease-in-out',
    },
  },
  text: {
    ...theme.typography.small,
    textAlign: 'center',
  },
  percentage: {
    position: 'absolute',
    ...theme.typography.largest,

    color: theme.colors.darkBlue,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
}))

export const ArcChart: React.FC<{
  percentage: number
  text: string
  dimensions: { height: number; width: number }
  gridArea: string
  origin: string
  id: string
}> = ({ percentage, text, dimensions, gridArea, id, origin }) => {
  const classes = useStyles()

  const ref = useRef(null)

  useEffect(() => {
    const svgElement = d3.select(ref.current).attr('width', dimensions.width).attr('height', 150)
    svgElement.selectAll('*').remove()

    const container = svgElement.append('g').attr('transform', `translate(${dimensions.width / 2}, 150)`)

    const innerR = dimensions.width / 2 - 50
    const outerR = dimensions.width / 2 - 10

    container
      .append('path')
      .attr('class', 'arc')
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .arc()
          .innerRadius(innerR)
          .outerRadius(outerR)
          .startAngle(-90 * (Math.PI / 180))
          .endAngle(90 * (Math.PI / 180)),
      )
      .attr('fill', theme.colors.empty)

    container
      .append('path')
      .attr('class', 'arc')
      .attr('id', `${id}-arc`)
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .arc()
          .innerRadius(innerR)
          .outerRadius(outerR)
          .startAngle(-90 * (Math.PI / 180))
          .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
      )
      .attr('fill', theme.colors.darkBlue)
      .on('mouseover', function () {
        d3.select(this).attr(
          'd',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .arc()
            .innerRadius(innerR - 5)
            .outerRadius(outerR + 5)
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
        )

        d3.select(`text#${id}-text`).attr('font-size', theme.typography.moreLarge.fontSize - 5)
      })
      .on('mouseout', function () {
        d3.select(this).attr(
          'd',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
        )

        d3.select(`text#${id}-text`).attr('font-size', theme.typography.moreLarge.fontSize)
      })
      .transition()
      .duration(1500)

    container
      .append('text')
      .text(`${percentage}%`)
      .attr('font-size', theme.typography.moreLarge.fontSize)
      .attr('font-weight', 'bold')
      .attr('font-style', 'italic')
      .attr('id', `${id}-text`)
      .style('fill', theme.colors.darkBlue)
      .style('text-anchor', 'middle')
      .style('cursor', 'default')
      .attr('y', -10)
      .on('mouseover', function () {
        d3.select(this).attr('font-size', theme.typography.moreLarge.fontSize - 5)

        d3.select(`path#${id}-arc`).attr(
          'd',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .arc()
            .innerRadius(innerR - 5)
            .outerRadius(outerR + 5)
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
        )
      })
      .on('mouseout', function () {
        d3.select(this).attr('font-size', theme.typography.moreLarge.fontSize)

        d3.select(`path#${id}-arc`).attr(
          'd',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
        )
      })
  }, [dimensions.height, dimensions.width, id, percentage])

  return (
    <div className={classes.container} style={{ gridArea, transformOrigin: origin }}>
      <svg ref={ref} />
      <div className={classes.text}>{text}</div>
    </div>
  )
}
