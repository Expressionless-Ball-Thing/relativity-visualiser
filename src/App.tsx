import "./App.css";
import { scaleLinear } from "d3";
import { useState } from "react";
import Xaxis from "./assets/Xaxis";
import Yaxis from "./assets/Yaxis";

const width: number = 940;
const height: number = 940;
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
    <div className="App">
      <svg width={width} height={height} className="visualiser">
        <Xaxis
          xScale={xScale}
          height={height}
          width={width}
          margin={margin}
          innerWidth={innerWidth}
        />
        <Yaxis
          yScale={yScale}
          height={height}
          width={width}
          margin={margin}
          innerHeight={innerHeight}
        />
      </svg>
    </div>
  );
};

export default App;
