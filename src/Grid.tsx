import { scaleLinear } from "d3";
import { useEffect, useRef } from "react";
import { EventNode, WorldLine } from "./App";
import DragLine from "./assets/DragLine";
import Events from "./assets/Events";
import { SpaceAxis } from "./assets/SpaceAxis";
import { TimeAxis } from "./assets/TimeAxis";
import Transformed from "./assets/Transformed";
import WorldLines from "./assets/WorldLines";

export interface Margin {
  top: number, right: number, bottom: number, left: number
}

const width: number = 1000;
const height: number = 1000;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };


export const Grid = ({
  events,
  clickedEvent,
  setClickedEvent,
  setEvents,
  setWorldlines,
  worldlines,
  clickedWorldLine,
  setClickedWorldLine,
  mode,
  setMode,
  velocity
}) => {
  const SpaceScale = scaleLinear()
    .domain([10, -10])
    .range([width - margin.right, margin.left]);
  const TimeScale = scaleLinear()
    .domain([-10, 10])
    .range([height - margin.bottom, margin.top]);
    
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseup", () => setMode("idle"));
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("mouseup", () => setMode("idle"));
    };
  }, [clickedEvent, clickedWorldLine]);


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

  const handleClick = (event) => {
    switch (event.detail) {
      case 2:
        addEvent(event);
        break;
      default:
        break;
    }
  };

  const deleteStuff = () => {
    if (clickedEvent !== false) {
      setEvents(events.filter((event: EventNode) => event.id !== clickedEvent.id));
      setWorldlines(worldlines.filter((event: WorldLine) => event.source !== clickedEvent && event.target !== clickedEvent))  
    } else {
      const tempWorldlines = worldlines.filter((worldline: WorldLine) => {
        return !((worldline.source === clickedWorldLine.source && worldline.target === clickedWorldLine.target) || (worldline.source === clickedWorldLine.target && worldline.target === clickedWorldLine.source))  
      })
      setWorldlines(tempWorldlines);
    }
    setClickedEvent(false)
    setClickedWorldLine(false)
  };

  const handleKeyDown = (event) => {
    if (event.target.tagName === "INPUT") return;
    if (["Backspace", "Delete"].includes(event.key)) {
      deleteStuff();
    }
  };

  const lorentz_factor = 1 / Math.sqrt(1 - Math.pow(velocity, 2));

  const transform = (event) => {
    const tempEvent = { ...event };
    tempEvent.x = lorentz_factor * (event.x - velocity * event.t);
    tempEvent.t = lorentz_factor * (event.t - velocity * event.x);
    return tempEvent;
  };

  const transformedEvents = events.map((event) => {
    return transform(event);
  });
  const transformedWorldlines = worldlines.map((worldline) => {
    return {
      source: transform(worldline.source),
      target: transform(worldline.target),
    };
  });

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
      <DragLine mode={mode} clickedEvent={clickedEvent} SpaceScale={SpaceScale} TimeScale={TimeScale}/>
      <Transformed 
        events={transformedEvents}
        worldlines={transformedWorldlines}
        velocity={velocity}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
      />
      <WorldLines 
        worldlines={worldlines}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
        setClickedWorldLine={setClickedWorldLine}
        setClickedEvent={setClickedEvent}
        mode={mode}
        clickedWorldLine={clickedWorldLine}/>
      <Events
        events={events}
        worldlines={worldlines}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        setClickedWorldLine={setClickedWorldLine}
        mode={mode}
        setMode={setMode}
        setWorldlines={setWorldlines}
      />
    </svg>
  );
};
