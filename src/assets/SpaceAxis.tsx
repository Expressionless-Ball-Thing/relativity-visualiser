import React from "react";

const SpaceAxis = ({ height, width, margin, SpaceScale, innerWidth }): JSX.Element => {
  return (
    <g className="axis" transform={`translate(0, ${height / 2})`}>
      <line stroke="black" x1={margin.left} x2={width - margin.right} />
      {SpaceScale.ticks().map((tickValue: number) => (
        <g key={tickValue} transform={`translate(${SpaceScale(tickValue)}, 0)`}>
          <line
            stroke="blue"
            y1={((height - (margin.top + margin.bottom)) / 2) * -1}
            y2={(width - (margin.top + margin.bottom)) / 2}
          />
          <text style={{ textAnchor: "middle" }} dy="1em" dx=".5em">
            {tickValue === 0 ? "" : tickValue}
          </text>
        </g>
      ))}
      
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${innerWidth - 50} , -5)`}
      >
        X(metres)
      </text>
    </g>
  );
};

export default SpaceAxis;
