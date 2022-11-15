import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('1 / 1 / 4 / 13', 'top left', 1.015),
    ...theme.typography.sortOfLarge,
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
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  info: {
    ...theme.typography.small,
    color: theme.colors.darkGray,
  },
}))

export const Map: React.FC = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]

  const dimensions = {
    height: window.innerHeight / 5 - 20,
    width: window.innerWidth / 4 - 20,
  }

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
  }

  useEffect(() => {
    const svgElement = d3
      .select(ref.current)
      .attr('width', dimensions.width - 100)
      .attr('height', dimensions.height)

    // const projection = d3
    //   .geoAlbersUsa()
    //   .scale(dimensions.width)
    //   .translate([dimensions.width / 2, dimensions.height / 2])
    // const path = d3.geoPath().projection(projection)
    // const viewboxwidth = dimensions.width * 1
    // const viewboxheight = dimensions.height - 20

    // const data = d3.range(100)

    const color = d3.scaleOrdinal().range(['blue', 'red'])

    const pie = d3.pie().value(function (d) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return d[1]
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data_ready = pie(Object.entries(pData))

    const container = svgElement.append('g').attr('transform', 'translate(80, 80)')

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(78)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('d', arcGenerator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .attr('fill', function (d) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return color(d.data[1])
      })
      // .attr("stroke", "black")
      // .style("stroke-width", "0px")
      .style('opacity', 0.7)
      .transition()
      .duration(1500)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return d.data[0]
      })
      .attr('transform', function (d) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return 'translate(' + arcGenerator.centroid(d) + ')'
      })
      .style('text-anchor', 'middle')
      .style('font-size', 12)
      .style('opacity', 0.7)
  }, [dimensions.height, dimensions.width, pData])

  return (
    <div className={classes.container}>
      <svg ref={ref} />
      <div className={classes.text}>
        {/* <div className={classes.percentage}>{pData}%</div> */}
        <div className={classes.info}>What party preveils in police killings locations</div>
      </div>
    </div>
  )
}
