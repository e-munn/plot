import React, { useState, useEffect, useRef } from 'react';
import { scaleLinear, select, max, sum,  hierarchy, linkHorizontal, easeSin, easeCubicIn, easeCubicOut, transition } from 'd3';
import { useSwipeable } from 'react-swipeable';

import '../../../css/plot.css'


const Action = ({ root, color, format, a, b, j, focus, setFocus}) => {

  const [done, setDone] = useState(0);

  const statesIng = [
    {
      "dotColor": color.orange2,
      "posXTransform": `translate(${ format.ingredient.dotSpace }px, 0px)`
    },
    {
      "dotColor": color.orange1,
      "posXTransform": 'translate(0px, 0px)'
    }
  ]

  const focusRef = useRef();

  const label = (
    <text
      className={'plot-animation-fill plot-text'}
      key={'action' + b + j}
      x={ b.data.pX + 10 }
      y={ b.data.pY + 5 }
      fill={`${statesIng[done].dotColor}`}
      textAnchor={'start'}
      fontSize={format.action.font.size}
      fontWeight={format.main.weight2}
      alignmentBaseline={'middle'}
      ref={ focusRef }
      onClick={ () => setFocus([focusRef.current, b]) }
      >
      {/* { b.data.stepOrder} */}
      { b.data.action}

    </text>
  )


  const label3 = (
    <>
    <foreignObject
      x={ b.data.pX + format.ingredient.boxSpace }
      y={ b.data.pY - 5 }
      width={ (b.parent.data.vesselSibs == 1) ? format.ingredient.boxwidth.branch0 : (b.parent.data.branch == 0) ? format.ingredient.boxwidth.branch0_1 : format.ingredient.boxwidth.branch1}
      height={ format.ingredient.boxHeight }
      >
        <div
          className={'foreign'}
          >
          <div
            className={'fi plot-animation-fill plot-text existing'}
            style= {{
              color:`${statesIng[done].dotColor}`,
              fontSize: `${ format.ingredient.font.size + 'px'}`,
              fontWeight: `${ format.main.weight2 }`,
              width: '100%'
            }}
            >
              { b.data.action}
          </div>
        </div>
      </foreignObject>
    </>
  )
  const aHeight = b.data.action_amt * format.action.amtScale

  const shape = (
    <rect
      className={'plot-animation-fill'}
      key={'ashape' + b + j}
      x={ b.data.pX - format.action.width/2 }
      y={ b.data.pY - format.action.width/2 }
      width={ format.action.width }
      height={ aHeight + format.action.width }
      fill={`${statesIng[done].dotColor}`}
      rx={format.action.width/2}
      >
    </rect>
  )

  // const dot = (
  //   <circle
  //     className={'name'}
  //     key={'ingredient' + b + j}
  //     r={4}
  //     cx={ b.data.pX + 20}
  //     cy={ b.data.pY }
  //     fill={`${color.orange3}`}
  //     >
  //   </circle>
  //
  // )


  const swipe = (
    <rect
      key={'aswipe' + a + b + j}
      x={ b.data.pX - 20 }
      y={ b.data.pY - format.ingredient.font.size/2 - 2}
      width={ 40 }
      height={ aHeight + format.action.width + 4}
      fill={ 'transparent' }
      // fill={ 'orange' }
      // opacity={ .3 }

      >
    </rect>
  )

  const textWidthMap = scaleLinear()
    .domain([4,30])
    .range([80,200])

  const tap = (
    <rect
      key={'aswipe' + a + b + j}
      x={ b.data.pX - 20 }
      y={ b.data.pY - format.ingredient.font.size/2 - 2}
      width={ textWidthMap(b.data.action.length) }
      height={ format.ingredient.font.size + 10}

      fill={ 'transparent' }
      // fill={ 'orange' }
      // opacity={ .3 }
      >
    </rect>
  )




    const handlers = useSwipeable({
      onSwipedLeft: () => setDone(1),
      onSwipedRight: () => setDone(0),
    });

  return (
    <g
      className={'action plot-animation-move'}
      style={{transform: `${ statesIng[done].posXTransform }`}}
      {...handlers}

      >
      {shape}
      {swipe}
      {tap}
      {label3}


      {/* {dot} */}

    </g>

  );
};

export default Action;
