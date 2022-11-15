import * as d3 from 'd3'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.typography.sortOfLarge,
    ...theme.common.flexBox,
    flexDirection: 'column',
    gap: 5,
  },
  text: {
    ...theme.typography.small,
    textAlign: 'center',
  },
  percentage: {
    position: 'absolute',
    ...theme.typography.largest,

    color: theme.colors.primary,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  // text: {
  //   ...theme.common.flexBox,
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   justifyContent: 'space-between',
  //   maxWidth: 100,
  // },
  // percentage: {
  //   ...theme.typography.largest,
  //   color: theme.colors.primary,
  //   fontWeight: 'bold',
  //   fontStyle: 'italic',
  // },
  // info: {
  //   ...theme.typography.small,
  //   color: theme.colors.darkGray,
  // },
}))

export const ArcChart: React.FC<{
  percentage: number
  text: string
  dimensions: { height: number; width: number }
  gridArea: string
}> = ({ percentage, text, dimensions, gridArea }) => {
  const classes = useStyles()
  const ref = useRef(null)

  useEffect(() => {
    const svgElement = d3.select(ref.current).attr('width', dimensions.width).attr('height', 110)

    const container = svgElement.append('g').attr('transform', `translate(${dimensions.width / 2}, 110)`)

    container
      .append('path')
      .attr('class', 'arc')
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .arc()
          .innerRadius(70)
          .outerRadius(105)
          .startAngle(-90 * (Math.PI / 180))
          .endAngle(90 * (Math.PI / 180)),
      )
      .attr('fill', theme.colors.empty)

    container
      .append('path')
      .attr('class', 'arc')
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .arc()
          .innerRadius(70)
          .outerRadius(105)
          .startAngle(-90 * (Math.PI / 180))
          .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
      )
      .attr('fill', theme.colors.primary)
      .transition()
      .duration(1500)

    container
      .append('text')
      .text(`${percentage}%`)
      .attr('font-size', theme.typography.largest.fontSize)
      .attr('font-weight', 'bold')
      .attr('font-style', 'italic')
      .style('fill', theme.colors.primary)
      .style('text-anchor', 'middle')
      .attr('y', -10)
  }, [dimensions.height, dimensions.width, percentage])

  return (
    <div className={classes.container} style={{ ...theme.common.vizContainer(gridArea) }}>
      <svg ref={ref} />
      <div className={classes.text}>{text}</div>
    </div>
  )
}
