import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'
import React, { useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('5 / 1 / 6 / 6'),
    ...theme.common.flexBox,
    gap: 10,
    justifyContent: 'space-around',
  },
  text: {
    ...theme.common.flexBox,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  percentage: {
    ...theme.typography.extraLarge,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontStyle: 'italic',
    cursor: 'default',
  },
  info: {
    ...theme.typography.small,
    color: theme.colors.darkGray,
  },
}))

export const CameraDotChart: React.FC = () => {
  const classes = useStyles()
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const ref = useRef(null)

  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 5 - 20,
    width: window.innerWidth / 4 - 20,
  }

  const percentage = Math.round((data.filter(d => d.wapo_body_ccamera === 'Yes').length / data.length) * 100)

  useEffect(() => {
    const svgElement = d3
      .select(ref.current)
      .attr('width', dimensions.width - 100)
      .attr('height', dimensions.height)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const y = d3.scaleBand().range([0, 125]).domain(d3.range(10))

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = d3.scaleBand().range([0, 125]).domain(d3.range(10))

    const data = d3.range(100)

    const container = svgElement.append('g').attr('transform', 'translate(10,10)')

    container
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('id', d => 'id' + d)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('cx', d => x(d % 10))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('cy', d => y(Math.floor(d / 10)))
      .attr('r', 5)
      .attr('fill', d => (d < percentage ? theme.colors.primary : theme.colors.empty))
      .on('mouseover', function (_, d) {
        if (d < percentage) {
          d3.selectAll('circle')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .filter(d => d < percentage)
            .attr('r', 6)
            .transition()
            .duration(500)
        }
      })
      .on('mouseout', function () {
        d3.selectAll('circle')
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .filter(d => d < percentage)
          .attr('r', 5)
          .transition()
          .duration(500)
      })
  }, [dimensions.height, dimensions.width, percentage])

  useEffect(() => {
    d3.selectAll('circle')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .filter(d => d < percentage)
      .attr('r', isHovering ? 6 : 5)
      .transition()
      .duration(500)
  }, [isHovering, percentage])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>
        <div
          className={classes.percentage}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {percentage}%
        </div>
        <div className={classes.info}>of police killings include an officer wearing a body cam</div>
      </div>
    </div>
  )
}
