import React, { useRef } from 'react';
import { select, linkVertical } from 'd3';
import '../../../css/plot.css'


const Vessel = ({ a, i, format, color }) => {



  const shape = (
    <rect
      className={'vesselShape'}
      key={'vshape' + i}
      width={ format.vessel.s.width }
      height={ a.data.pH }
      x={ a.data.pX }
      y={ a.data.pY }
      transform={`translate(${format.vessel.s.width*-.5}, ${0})`}
      fill={ `${color.background}` }
      stroke={  `${color.green1}` }
      strokeWidth={ format.vessel.s.stroke }
      rx={ format.vessel.s.width * .5 }
      >
    </rect>
  )


  const label = (
    <text
      className={'plot-text'}
      key={'l' + i}
      x={ a.data.pX - 4 }
      y={ a.data.pY + 5 }
      fill={ `${color.green2}` }
      fontSize={format.vessel.font.size}
      fontWeight={format.main.weight1}
      letterSpacing={format.vessel.font.spacing}
      alignmentBaseline={'hanging'}
      >
        {a.data.vessel}
    </text>
  )


  const labelBack = (
    <rect
      key={'lb' + i}
      x={ a.data.pX - 2 }
      y={ a.data.pY + 2 }
      width={ format.vessel.s.width }
      height={ format.vessel.font.size + 4 }
      fill={ `${color.background}` }
      stroke={ 'none' }
      >
        {a.data.vessel}
    </rect>
  )

  const transfer = (
    <path
      key={'path' + i}
      id={'path' + i}
      stroke={ `${color.transfer}` }
      strokeWidth={3}
      fill={'none'}
      strokeDasharray={'5 5'}
      d={
        linkVertical()({
          source: [a.data.pX, a.data.pY + a.data.pH],
          target: [a.parent.data.pX, a.parent.data.pY]
        })
        }
      >
    </path>
  )

  const transferText = (
    <text
      key={'textPath' + i}
      className={'plot-text'}
      fill={'black'}
      textAnchor={'middle'}
      style={{transform : 'translate(5px, 0px)', textTransform : 'none'}}
      fontSize={ format.ingredient.font.size }
      >
      <textPath
        href={'#path'+i}
        startOffset={'50%'}
        >
        {a.data.transfer}
      </textPath>
    </text>
  )



  return (
      <g>
        {transfer}
        {transferText}
        {shape}
        {labelBack}
        {label}
        {/* {dot} */}
      </g>
  );
};

export default Vessel;
