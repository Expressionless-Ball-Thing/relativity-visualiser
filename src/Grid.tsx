import { scaleLinear } from "d3";
import { PropsWithChildren, useEffect } from "react";
import { EventNode } from "./App";
import Events from "./assets/Events";
import { SpaceAxis } from "./assets/SpaceAxis";
import { TimeAxis } from "./assets/TimeAxis";

export interface Margin {
  top: number, right: number, bottom: number, left: number
}

export const Grid = ({
  events,
  clickedEvent,
  setClickedEvent,
  setEvents,
}) => {

  const width: number = 650;
  const height: number = 650;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
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

    let lastnodeId = events.reduce(function(acc: number, currevent : EventNode){
      return currevent.id > acc ? currevent.id : acc;
    }, 0);

    const newEvent = {
      id: lastnodeId + 1,
      name: "",
      x: Math.round(SpaceScale.invert(left) * 10) / 10,
      t: Math.round(TimeScale.invert(top) * 10) / 10,
    };
    const tempEvent = [...events];
    tempEvent.push(newEvent);
    setClickedEvent(newEvent)
    setEvents(tempEvent);
  }

  const clickedSomething = (event:Event) => {
    if (event.target.className !== "node") {
      setClickedEvent(null);
    }
  }

  const handleClick = (event) => {
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
    setEvents(events.filter((event: EventNode) => event.id !== clickedEvent.id));
  };

  const handleKeyDown = (event) => {
    if (event.target.id === "Eventname") return;
    if (["Backspace", "Delete"].includes(event.key)) {
      deleteEvent();
    }
  };

  return (
    <svg
      width={width}
      height={height}
      id="visualiser"
      onClick={handleClick}
      onMouseOver={() => document.body.style.cursor = "crosshair"}
      onMouseLeave={() => document.body.style.cursor = ""}
    >
      <SpaceAxis
        SpaceScale={SpaceScale}
        height={height}
        width={width}
        margin={margin}
      />
      <TimeAxis
        TimeScale={TimeScale}
        height={height}
        width={width}
        margin={margin}
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
