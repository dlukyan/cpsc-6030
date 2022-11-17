import * as d3 from 'd3'

import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { classNames } from '../../utils/classNames'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
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
  containerUnfocused: {
    ...theme.common.vizContainer('', '', 1.05),
  },
  containerFocused: {
    ...theme.common.vizContainerClicked('', '', 2),
  },
  text: {
    ...theme.typography.small,
    textAlign: 'center',
  },
  x: {
    position: 'absolute',
    top: 0,
    right: 10,
    ...theme.typography.large,
    color: theme.colors.darkGray,
    cursor: 'pointer',
  },
  overlay: {
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  percentage: {
    position: 'absolute',
    ...theme.typography.largest,

    color: theme.colors.primary,
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

  const [focused, setFocused] = useState<boolean>(false)

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
      .attr('id', `${id}-arc`)
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
      .on('mouseover', function () {
        d3.select(this).attr(
          'd',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .arc()
            .innerRadius(65)
            .outerRadius(110)
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
        )

        d3.select(`text#${id}-text`).attr('font-size', theme.typography.largest.fontSize - 5)
      })
      .on('mouseout', function () {
        d3.select(this).attr(
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

        d3.select(`text#${id}-text`).attr('font-size', theme.typography.largest.fontSize)
      })
      .transition()
      .duration(1500)

    container
      .append('text')
      .text(`${percentage}%`)
      .attr('font-size', theme.typography.largest.fontSize)
      .attr('font-weight', 'bold')
      .attr('font-style', 'italic')
      .attr('id', `${id}-text`)
      .style('fill', theme.colors.primary)
      .style('text-anchor', 'middle')
      .style('cursor', 'default')
      .attr('y', -10)
      .on('mouseover', function () {
        d3.select(this).attr('font-size', theme.typography.largest.fontSize - 5)

        d3.select(`path#${id}-arc`).attr(
          'd',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3
            .arc()
            .innerRadius(65)
            .outerRadius(110)
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(((percentage * 180) / 100 - 90) * (Math.PI / 180)),
        )
      })
      .on('mouseout', function () {
        d3.select(this).attr('font-size', theme.typography.largest.fontSize)

        d3.select(`path#${id}-arc`).attr(
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
      })
  }, [dimensions.height, dimensions.width, id, percentage])

  return (
    <>
      <div
        className={classNames(classes.container, focused ? classes.containerFocused : classes.containerUnfocused)}
        style={{ gridArea, transformOrigin: origin }}
        onClick={() => (focused ? null : setFocused(true))}
      >
        <svg ref={ref} />
        {focused && (
          <div className={classes.x} onClick={() => setFocused(false)}>
            x
          </div>
        )}

        <div className={classes.text}>{text}</div>
      </div>
      {focused && <div className={classes.overlay} />}
    </>
  )
}