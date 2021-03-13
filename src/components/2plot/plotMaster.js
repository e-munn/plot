import React, { useState, useEffect, useRef } from "react";
import Plot from './plot.js';
import { select, easeSin, easeCubicIn, easeCubicOut, transition, scaleOrdinal } from 'd3';

import arrowup from '../../media/ui-symbols/arrowup.svg';
import arrowdown from '../../media/ui-symbols/arrowdown.svg';
import '../../css/page.css';

const PlotMaster = ({ recipePlot, svgHeight, preheat, thinPage, format, aWidth }) => {

  const [open, setOpen] = useState(1);
  const [display, setDisplay] = useState(1);
  const map = scaleOrdinal()
    .domain([0, 1])
    .range(['none', 'block'])


  return (
    <>
      <div
        className={'head'}
        style={ thinPage }
        onClick={ () => {
          setDisplay( 1 - display )
          setTimeout( () => {
            setOpen( 1 - open )
          }, 1)
        }}
        >
        PLOT
      </div>
      <svg style={ thinPage } display={ map(display) } height={ open * (svgHeight + 120) }>
        <Plot
          recipe={recipePlot}
          preheat={preheat}
          format={format}
          aWidth={aWidth}

        />
      </svg>
    </>
  );
};

export default PlotMaster;
