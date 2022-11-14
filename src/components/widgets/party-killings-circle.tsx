import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'

import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { theme, Theme } from '../../theme'
import { PoliceViolenceDataPoint } from '../../types/police-violence'

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    ...theme.common.vizContainer('4 / 16 / 6 / 21'),
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
  }
}))

export const PartyKillingsCircle: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const data: PoliceViolenceDataPoint[] = rawData as PoliceViolenceDataPoint[];

  const dimensions = {
    height: window.innerHeight / 5 - 20,
    width: window.innerWidth / 4 - 20,
  };

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100
  }

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

    const color = d3.scaleOrdinal()
      .range(["blue", "red"])

    const pie = d3.pie()
      .value(function(d) {return d[1]})
    const data_ready = pie(Object.entries(pData))

    const container = svgElement.append('g')
      .attr('transform', 'translate(80, 80)')

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(78)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data[1])) })
      // .attr("stroke", "black")
      // .style("stroke-width", "0px")
      .style("opacity", 0.7)
      .transition()
      .duration(1500)

    container
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return d.data[0]})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("opacity", 0.7)
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
