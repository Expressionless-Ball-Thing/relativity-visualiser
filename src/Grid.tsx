import { scaleLinear } from "d3";
import { useEffect } from "react";
import Events from "./assets/Events";
import { SpaceAxis } from "./assets/SpaceAxis";
import { TimeAxis } from "./assets/TimeAxis";

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
    .domain([10, -10])
    .range([width - margin.right, margin.left]);
  const TimeScale = scaleLinear()
    .domain([-10, 10])
    .range([height - margin.bottom, margin.top]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [clickedEvent]);

  const addEvent = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    let left = event.clientX - currentTargetRect.left;
    let top = event.clientY - currentTargetRect.top
    if (left < margin.left || left > width - margin.right || top < margin.top || top > height - margin.bottom) return;

    let lastnodeId = events.reduce(function(acc, currevent){
      return currevent.id > acc ? currevent.id : acc;
    }, 0);

    const newEvent = {
      id: lastnodeId + 1,
      name: "",
      x: SpaceScale.invert(left),
      t: TimeScale.invert(top),
    };
    const tempEvent = [...events];
    tempEvent.push(newEvent);
    setClickedEvent(newEvent)
    setEvents(tempEvent);
  }

  const handleClick = (event) => {
      console.log(event.detail)
    switch (event.detail) {
      case 1:
        /* TODO: check if the user clicked on an event, line or nothing.*/
        break;
      case 2:
        addEvent(event);
        break;
      default:
        break;
    }
  };

  const deleteEvent = () => {
    setEvents(events.filter((event) => event.id !== clickedEvent.id));
  };

  const handleKeyDown = (event) => {
    event.stopPropagation()
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
