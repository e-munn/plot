import React, { useState, useEffect, useRef } from 'react';
import { scaleLinear, select, selectAll, max, sum,  hierarchy, linkHorizontal, easeSin, easeCubicIn, easeCubicOut, transition } from 'd3';
import { useSwipeable } from 'react-swipeable';
// import 'fraction.js';

import '../../../css/plot.css'


const IngredientNode = ({ root, color, format, a, b, j, focus, setFocus, aWidth }) => {


  const [done, setDone] = useState(0);


  const statesIng = [
    {
      "dotColor": color.blue2,
      "posXTransform": `translate(${ format.ingredient.dotSpace }px, 0px)`
    },
    {
      "dotColor": color.blue1,
      "posXTransform": 'translate(0px, 0px)'
    }
  ]

  const clean = (a, b) => {
    var c = '';
    if (!(a == null)) {
      a = ' - ' + a
    } else {
      a = ''
    }

    if (b == null){
      c = a
    } else if ( (a == null) && (b == null) ) {
        c = 'com'
      } else {
        c = a + ' ' + b
      }

    return c
  }

  var texzt = b.data.ingredient + '<tspan>' + b.data.ing_amt + '</tspan>'


  const ingHover = useRef(false);
  const detHover = useRef(false);



  const hoverON = (element) => {
    var el = element.current

    el = select(el.parentElement.parentElement.parentElement).selectAll('*')
    el.style('color', '#ADADAD')
      .attr('fill', '#ADADAD')



  }

  const hoverOFF = (element) => {
    var el = element.current
    el = select(el.parentElement.parentElement.parentElement).selectAll('*')
    el.style('color', statesIng[done].dotColor)
      .attr('fill', statesIng[done].dotColor)
  }

  const maxWidth = (b.parent.data.vesselSibs == 1) ? format.ingredient.boxwidth.branch0 : (b.parent.data.branch == 0) ? format.ingredient.boxwidth.branch0_1 : format.ingredient.boxwidth.branch1
  const label3 = (
    <>
    <foreignObject
      x={ b.data.pX + format.ingredient.boxSpace }
      y={ b.data.pY - format.ingredient.boxHeight/2 - format.ingredient.boxNudge }
      width={ maxWidth }
      height={ format.ingredient.boxHeight }
      style={{
        // backgroundColor: 'rgb(0,0,0,.1)'
      }}
      >
        <div
          className={'foreign'}
          style={{
            // backgroundColor: 'rgb(0,0,0,.1)',
            display: 'inline-block'
          }}
          >

            <div
                className={'fi plot-animation-fill plot-text existing'}
                ref={ingHover}
                onMouseEnter={ () => hoverON(ingHover) }
                onMouseLeave={ () => hoverOFF(ingHover) }
                style= {{
                  fontWeight: `${ format.main.weight2 }`,
                  color:`${ statesIng[done].dotColor }`,
                  fontSize: `${ format.ingredient.font.size + 'px'}`,
                  maxWidth: `${ maxWidth }`,
                  cursor: 'pointer'

                  // backgroundColor: 'rgb(0,0,0,.1)',

                }}
                >
                { b.data.ingredient}
                <span
                  className={'plot-text'}
                  style= {{
                    fontWeight: `${ format.main.weight3 }`,
                    color:`${ statesIng[done].dotColor }`,
                    fontSize: `${ format.ingredient.font.amountSize + 'px'}`,
                    cursor: 'pointer'



                  }}
                  >
                  { clean(b.data.ing_amt, b.data.ing_unit) }
                </span>
              </div>
        </div>
        { aWidth[0] ? (<></>) : (
          <div
            ref={detHover}
            onMouseEnter={ () => hoverON(ingHover) }
            onMouseLeave={ () => hoverOFF(ingHover) }
            style= {{
              fontWeight: `${ format.main.weight4 }`,
              color:`${ statesIng[done].dotColor }`,
              fontSize: `${ format.ingredient.font.detailSize + 'px'}`,
              maxWidth: `${ maxWidth }`,
              cursor: 'pointer'


            }}
            >
            {/* {b.data.detail} */}
            {'ahhhhhhhhhh'}

          </div>
        )}
      </foreignObject>
    </>
  )

  const dot = (
    <circle
      className={'plot-animation-fill'}
      key={'idot' + a + b + j}
      r={ format.ingredient.radius }
      cx={ b.data.pX }
      cy={ b.data.pY }
      fill={`${statesIng[done].dotColor}`}
      >
    </circle>

  )



  function drawTool(d){
    var tool = (
      <circle
        r={ 25 }
        cx={ d.data.pX }
        cy={ d.data.pY }
        fill={ 'pink' }
        >
      </circle>
    )

    return tool
  }

  const focusRef = useRef();


  const textWidthMap = scaleLinear()
    .domain([4,24])
    .range([80,210])




    function getWidth(f) {
      // var x = select(f.current.parentElement).select('foreignObject').select('.foreign').select('.fi')
      // x = x.style('width')
      // x = JSON.stringify(t)
      var x = f
      console.log(x)


      var t = 11
      return t
    }

  const swipe = (
    <rect
      key={'iswipe' + a + b + j}
      ref={ focusRef }

      // x={ b.data.pX - 20 }
      // y={ b.data.pY - format.ingredient.font.size/2 - 2}
      // width={ () => {getWidth(focusRef)}}

      // width={ '111px'  }

      // height={ format.ingredient.font.size + 6}
      x={ b.data.pX + format.ingredient.boxSpace }
      y={ b.data.pY - format.ingredient.boxHeight/2 - format.ingredient.boxNudge }
      height={ format.ingredient.boxHeight + 20 }
      // fill={ 'transparent' }
      fill={ 'pink' }
      opacity={.8}

      //
      // onClick={ () => {
      //   setFocus([focusRef.current, b])
      // }}


      >
    </rect>
  )




  const handlers = useSwipeable({
    onSwipedLeft: () => setDone(1),
    onSwipedRight: () => setDone(0)
  });

  return (
    <g
      className={'ingredient plot-animation-move'}
      style={{transform: `${ statesIng[done].posXTransform }`}}
      {...handlers}
      >
      {label3}
      {dot}
      {/* {swipe} */}
    </g>

  );
};

export default IngredientNode;
