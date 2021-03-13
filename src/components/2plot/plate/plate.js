import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../../../css/plot.css'
import color from '../../../media/theme/colors.json';

import platesvg from '../../../media/symbols/plate.svg';


const Plate = ({ root, format }) => {


  const plate = (
    <image
      className={'plot-animation-fill'}
      key={'plate'}
      href={ platesvg }
      width={format.plate.d}
      height={format.plate.d}
      x={ root.data.pX - format.plate.d/2}
      y={ root.data.pY - format.plate.d/2}
      fill={color.green1}
      >
    </image>
  )


  const serve = (
    <text
      className={'plot-text weight-1'}
      key={'platetext'}
      x={ root.data.pX + format.plate.d/2 + 5}
      y={ root.data.pY + 2}
      alignmentBaseline={'middle'}
      fill={color.green2}
      fontSize={format.vessel.font.size}
      fontWeight={format.main.weight2}
      >
        {'Serve'}
    </text>

  )


  return (
    <g>
      {plate}
      {serve}
    </g>

  );
};

export default Plate;
