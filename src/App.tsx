import "./App.css";
import { scaleLinear } from "d3";
import { useState } from "react";

const width = 940;
const height = 940;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

const xScale = scaleLinear()
  .domain([5, -5])
  .range([width - margin.right, margin.left]);
const yScale = scaleLinear()
  .domain([-5, 5])
  .range([height - margin.bottom, margin.top]);

const App = () => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [dots, setDots] = useState({});

  return (
    <svg width={width} height={height} className="App">

      <g className="axis" transform={`translate(0, ${height / 2})`}>
        <line stroke="black" x1={margin.left} x2={width - margin.right} />
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
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

      <g className="axis" transform={`translate(${width / 2}, 0)`}>
        <line stroke="black" y1={margin.top} y2={height - margin.bottom} />
        {yScale.ticks().map((tickValue) => (
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
          transform={`translate(${-20}, ${innerHeight/8 - 50}) rotate(-90)`}
        >
          Y(seconds)
        </text>

      </g>
    </svg>
  );
};

export default App;
