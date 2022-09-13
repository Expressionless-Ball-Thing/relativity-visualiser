import "./App.css";
import { scaleLinear } from "d3";
import { useEffect, useState } from "react";
import TimeAxis from "./assets/TimeAxis";
import SpaceAxis from "./assets/SpaceAxis";
import Events from "./assets/Events";

const width: number = 940;
const height: number = 940;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const SpaceScale = scaleLinear()
  .domain([5, -5])
  .range([width - margin.right, margin.left]);
const TimeScale = scaleLinear()
  .domain([-5, 5])
  .range([height - margin.bottom, margin.top]);

const App = () => {
  const [clickedEvent, setClickedEvent] = useState(NaN);
  const [events, setEvents] = useState([
    {
      id: 0,
      name: "You",
      x: 0,
      t: 0,
    },
    {
      id: 1,
      name: "event",
      x: 1,
      t: 1,
    },
    {
      id: 2,
      name: "another event",
      x: -1,
      t: 2,
    },
  ]);



  const handleKeyDown = (event) => {
    event.preventDefault()
    if (["Backspace", "Delete"].includes(event.key)) {
      setEvents(events.filter((event) => (event.id !== clickedEvent)))
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  })

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
        <Events
          events={events}
          SpaceScale={SpaceScale}
          TimeScale={TimeScale}
          clickedEvent={clickedEvent}
          setClickedEvent={setClickedEvent}
        />
      </svg>
    </div>
  );
};

export default App;
