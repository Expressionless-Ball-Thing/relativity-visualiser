import "./App.css";
import { scaleLinear } from "d3";
import { useState } from "react";
import TimeAxis from "./assets/TimeAxis";
import SpaceAxis from "./assets/SpaceAxis";
import Events from "./assets/Events";

const width: number = 940;
const height: number = 940;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

const SpaceScale = scaleLinear()
  .domain([5, -5])
  .range([width - margin.right, margin.left]);
const TimeScale = scaleLinear()
  .domain([-5, 5])
  .range([height - margin.bottom, margin.top]);

const App = () => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [events, setEvents] = useState([
    {
      id: 0,
      name: "",
      x: 0,
      t: 0,
    },
    {
      id: 1,
      name: "",
      x: 1,
      t: 1,
    },
    {
      id: 2,
      name: "",
      x: -1,
      t: 2,
    }
  ]);

  return (
    <div className="App">
      <svg width={width} height={height} className="visualiser">
        <SpaceAxis
          SpaceScale={SpaceScale}
          height={height}
          width={width}
          margin={margin}
          innerWidth={innerWidth}
        />
        <TimeAxis
          TimeScale={TimeScale}
          height={height}
          width={width}
          margin={margin}
          innerHeight={innerHeight}
        />
        <Events events={events} SpaceScale={SpaceScale} TimeScale={TimeScale}/>
      </svg>
    </div>
  );
};

export default App;
