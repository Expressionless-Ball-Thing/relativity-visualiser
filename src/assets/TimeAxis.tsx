import { ScaleLinear } from "d3";
import React from "react";
import { Margin } from "../Grid";

export const TimeAxis = ({ height, width, margin, TimeScale, innerHeight} : {height: number, width: number, margin: Margin, TimeScale: ScaleLinear<Number, Number, never>, innerHeight: number}) => {
  return (
    <g className="axis" transform={`translate(${width / 2}, 0)`}>
      <line stroke="black" y1={margin.top} y2={height - margin.bottom} />
      {TimeScale.ticks(21).map((tickValue: number) => (
        <g key={tickValue} transform={`translate(0, ${TimeScale(tickValue)})`}>
          <line
            stroke="blue"
            x1={((width - (margin.left + margin.right)) / 2) * -1}
            x2={(width - (margin.left + margin.right)) / 2}
          />
          <text textAnchor="middle" dy="1em" dx=".5em">
            {tickValue === 0 ? "" : tickValue}
          </text>
        </g>
      ))}

      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-20}, ${innerHeight / 4 - 50}) rotate(-90)`}
      >
        Y(seconds)
      </text>
    </g>
  );
};
