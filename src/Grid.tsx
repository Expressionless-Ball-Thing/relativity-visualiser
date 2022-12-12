import { scaleLinear } from "d3";
import { useEffect } from "react";
import Events from "./assets/Events";
import SpaceAxis from "./assets/SpaceAxis";
import TimeAxis from "./assets/TimeAxis";

export const Grid = ({
  events,
  clickedEvent,
  setClickedEvent,
  setEvents,
}) => {
  const width: number = 650;
  const height: number = 650;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const SpaceScale = scaleLinear()
    .domain([5, -5])
    .range([width - margin.right, margin.left]);
  const TimeScale = scaleLinear()
    .domain([-5, 5])
    .range([height - margin.bottom, margin.top]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleClick = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    const newEvent = {
      id: events[events.length - 1].id + 1,
      name: "newevent",
      x: SpaceScale.invert(event.clientX - currentTargetRect.left),
      t: TimeScale.invert(event.clientY - currentTargetRect.top),
    };
    const tempEvent = [...events];
    tempEvent.push(newEvent);
    setEvents(tempEvent);
  };

  const deleteEvent = () => {
    setEvents(events.filter((event) => event.id !== clickedEvent.id));
  };

  const handleKeyDown = (event) => {
    if (["Backspace", "Delete"].includes(event.key)) {
      deleteEvent();
    }
  };

  return (
    <svg
      width={width}
      height={height}
      className="visualiser"
      onClick={handleClick}
    >
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
  );
};