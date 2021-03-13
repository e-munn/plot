import React, { useRef, useState, useEffect } from 'react';
import { select, ascending, transition, easeCubicIn, easeCubicOut } from 'd3';

import Vessel from './vessels/vessels.js';
import IngredientNode from './ingredients/ingredientNode.js';
import Action from './actions/actions.js';
import Plate from './plate/plate.js';

import color from '../../media/theme/colors.json';

const Plot = ({ recipe, preheat, format, aWidth }) => {

  const [focus, setFocus] = useState(false);
  const prevFocus = useRef(false);


  useEffect(() => {

    if(!(focus == false)){

        var cur = select(focus[0].parentElement)
        var curParent = select(focus[0].parentElement.parentElement)
        var all = select(focus[0].parentElement.parentElement).selectAll('g')

        var t1 = transition()
          .duration(80)
          .ease(easeCubicOut)
        var t2 = transition()
          .duration(200)
          .ease(easeCubicIn)

        all

          .attr('opacity', .6)
          // .attr('filter', 'url(#blur)')


        cur
          .attr('opacity', 1)



        var textColor
        if(cur.attr('class') == 'ingredient plot-animation-move'){
          var cX = cur.select('circle').attr('cx')
          var cY = cur.select('circle').attr('cy')
          var curX = +cX + 10
          var curY = +cY
          textColor = color.blue2

        } else if(cur.attr('class') == 'action plot-animation-move'){
          var cX = cur.select('rect').attr('x')
          var cY = cur.select('rect').attr('y')
          var curX = +cX + 10 + format.ingredient.radius
          var curY = +cY + 8
          textColor = color.orange2

        }

        cur.select('foreignObject')
          .style('opacity', 0)


        //
        // var fO = curParent.append('foreignObject')
        //   .classed('focus', 1)
        //   .attr('width', '500px')
        //   .attr('height', '500px')
        //   .attr('x', 50)
        //   .attr('y', curY-10)
        //   .append("xhtml:body")
        //   .append('div')
        //   .style('width', '300px')
        //   .style('height', '120px')
        //   .style('background-color', 'white')



        //
        // var amt = cur.append('text')
        //   .classed('focus', 1)
        //   .classed('plot-text', 1)
        //   .classed('weight-2', 1)
        //   .attr('x', curX)
        //   .attr('y', curY)
        //   .attr('fill', textColor)
        //   .attr('font-size', dim.i.font.detailSize)
        //   .attr('alignment-baseline', 'middle')
        //   .text( focus[1].data.detail )





        var svgHeight = focus[0].parentElement.parentElement.parentElement
        svgHeight = select(svgHeight).attr('height')


        var clickOn = focus[0].parentElement
        var svgT = focus[0].parentElement.parentElement

        svgT = select(svgT)

        svgT.selectAll('.focus').remove()

        var clickoff = svgT.append('rect')
          .classed('focus', 1)
          .attr('x', -format.main.margin.left/2)
          .attr('y', 0)
          .attr('width', '100vw')
          .attr('height', +svgHeight)
          .attr('fill', 'transparent')
          .on('click', () => {
            svgT.selectAll('.focus').remove()
            all
              .attr('filter', 'none')
              .attr('opacity', 1)
          })

        clickoff.lower()

        // amt.raise()

        if (!(prevFocus.current == false)){
          var prev = prevFocus.current
          prev = prev.parentElement
          console.log(prev)

          prev = select(prev)
          prev = prev.select('foreignObject').style('opacity', 1)
          // var rem = prev.selectAll('.focus')
          // rem.remove()
        }
        prevFocus.current = focus[0]

      }

    }, [focus])


  var root = recipe


  var plate=[(
    <Plate
      root={root}
      format={format}
    />
  )]


  var allVessels = root.descendants().filter(d => ('vessel' in d.data)).filter(d => (d.depth !== 0)).sort((a,b) => {return ascending(a.data.stepOrder, b.data.stepOrder)} )

  var flows = []

  allVessels.forEach((a,i) => {

    const vessel = []
    vessel.push(
      <Vessel
        a={a}
        i={i}
        format={format}
        color={color}
      />
    )

    const ingredientNodes = []

    a.children.forEach((b,j) => {
      if ('ingredient' in b.data) {
        ingredientNodes.push(
          <IngredientNode
            color={color}
            format={format}
            a={a}
            b={b}
            j={j}
            focus={focus}
            setFocus={setFocus}
            aWidth={aWidth}
          />)
        }
      })

    const actionNodes = []

    a.children.forEach((b,j) => {
      if ('action' in b.data) {
        actionNodes.push(
          <Action
            color={color}
            format={format}
            a={a}
            b={b}
            j={j}
            focus={focus}
            setFocus={setFocus}
          />)
        }
      })

    const preheatImage = []

    if(preheat !== null){


    }



    flows.push(
      <>
        {vessel}
        {actionNodes}
        {ingredientNodes}
        {plate}
      </>
    )
  })

  var empty = (<></>)

  const clickOff = (
    <rect
      x={0}
      y={0}
      width={'100%'}
      height={'100%'}
      fill={'transparent'}
      onClick={() => {
        setFocus([focus[0], empty])
      }}
      >

    </rect>
  )

  return (
    <>
      <g
        transform={`translate(${0}, ${40})`}
        >
        <defs>
          <filter id="blur" x="-0.08" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            <feOffset dx="0" dy="0" />
          </filter>
          <filter id="shadow" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx=".1" dy=".1" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation=".1" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        {/* {clickOff} */}
        {flows}
        {/* {focus[1]} */}
      </g>
    </>
  );
};

export default Plot;
