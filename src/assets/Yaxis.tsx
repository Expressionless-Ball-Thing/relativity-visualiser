import React from "react";

const Yaxis = ({ height, width, margin, yScale, innerHeight }): JSX.Element => {
  return (
    <g className="axis" transform={`translate(${width / 2}, 0)`}>
      <line stroke="black" y1={margin.top} y2={height - margin.bottom} />
      {yScale.ticks().map((tickValue: number) => (
        <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
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
        transform={`translate(${-20}, ${innerHeight / 8 - 50}) rotate(-90)`}
      >
        Y(seconds)
      </text>
    </g>
  );
};

export default Yaxis;
