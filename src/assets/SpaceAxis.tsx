import * as d3 from "d3";
import { ScaleLinear } from "d3";
import { Margin } from "./Grid";

export const SpaceAxis = ({ height, width, margin, SpaceScale}: {height: number, width: number, margin: Margin, SpaceScale: ScaleLinear<Number, Number, never>}) => {
  return (
    <g className="axis" transform={`translate(0, ${height / 2})`}>
      <line stroke="black" x1={margin.left} x2={width - margin.right} />
      {SpaceScale.ticks(21).map((tickValue: number) => (
        <g key={tickValue} transform={`translate(${SpaceScale(tickValue)}, 0)`}>
          <line
            stroke="blue"
            y1={((height - (margin.top + margin.bottom)) / 2) * -1}
            y2={(width - (margin.top + margin.bottom)) / 2}
          />
          <text style={{ textAnchor: "middle" }} dy="1em" dx=".5em" className="tick-label">
            {tickValue === 0 ? "" : tickValue}
          </text>
        </g>
      ))}
      
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${width - margin.left - margin.right - 70} , -5)`}
      >
        X(lightseconds)
      </text>
    </g>
  );
};
