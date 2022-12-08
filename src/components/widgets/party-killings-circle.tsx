import * as d3 from 'd3'
import rawData from '../../data/data_cleansed.json'
import censusData from '../../data/census.json'

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
import { useSelectedState } from '../../context/selected-state-context'

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
    ...theme.common.vizContainerClicked({ height: 650, width: 500, bottom: 0, right: 0 }, 'bottom right'),
  },
  text: {
    ...theme.common.flexBox,
    textAlign: 'center',
    fontSize: theme.typography.small.fontSize,
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
  percentages: {
    width: '100%',
    ...theme.common.flexBox,
    justifyContent: 'space-between',
  },
  party: {
    display: 'flex',
    flexDirection: 'column',
  },
  dem: {
    textAlign: 'left',
    color: `${theme.colors.blue} !important`,
  },
  rep: {
    textAlign: 'right',
    color: `${theme.colors.red} !important`,
  },
  percentage: {
    ...theme.typography.larger,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
}))

export const PartyKillingsCircle: React.FC = () => {
  const classes = useStyles()
  const selectedState = useSelectedState()

  const ref = useRef(null)

  const [focused, setFocused] = useState<boolean>(false)

  let data: PoliceViolenceDataPoint[] = rawData as unknown as PoliceViolenceDataPoint[]
  if (selectedState.state !== '')
    data = data.filter(d => d.state === censusData.find(s => s.state === selectedState.state)?.state_code)

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

  const pData = {
    Democrats: (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
    Republicans: 100 - (data.filter(d => d.congressperson_party === 'Democrat').length / data.length) * 100,
  }

  useEffect(() => {
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
            <>{pData.Democrats > 0 ? <DemocratIcon scale={focused ? 1.5 : 0.8} /> : null}</>
          ) : (
            <>{pData.Republicans > 0 ? <RepublicanIcon scale={focused ? 1.5 : 0.8} /> : null}</>
          ),
        ),
      )
  }, [data, dimensions.height, dimensions.width, focused, pData])

  return (
    <>
      <div
        className={classNames(classes.container, focused ? classes.containerFocused : classes.containerUnfocused)}
        onClick={() => (focused ? null : setFocused(true))}
      >
        {focused && (
          <h1 className={classes.question}>
            How many police killings happen in democratic areas vs republican counties?
          </h1>
        )}
        <svg ref={ref} />
        {!focused && (
          <div className={classes.text}>
            police killing location<b>*</b>&nbsp;party dominance
          </div>
        )}
        {focused && <X onClick={() => setFocused(false)} />}
        {focused && (
          <div className={classes.percentages}>
            <div className={classNames(classes.party, classes.dem)}>
              <div className={classNames(classes.percentage, classes.dem)}>{pData.Democrats.toFixed(2)}%</div>
              <div>Democratic Counties</div>
            </div>
            <div className={classNames(classes.party, classes.rep)}>
              <div className={classNames(classes.percentage, classes.rep)}>{pData.Republicans.toFixed(2)}%</div>
              <div>Republican Counties</div>
            </div>
          </div>
        )}
      </div>
      {focused && <Overlay onClick={() => setFocused(false)} />}
    </>
  )
}
