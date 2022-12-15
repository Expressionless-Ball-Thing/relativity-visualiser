import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { EventNode, WorldLine } from "../App";

const colorScale = d3.schemePaired;

const Events = ({
  events,
  worldlines,
  SpaceScale,
  TimeScale,
  clickedEvent,
  setClickedEvent,
  setClickedWorldLine,
  mode,
  setMode,
  setWorldlines,
}) => {
  //const [tooltip, setTooltip] = useState<WorldLine| EventNode | boolean>(false);
  const mouseoverEvent = (event) => {
    event.stopPropagation();
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
    document.body.style.cursor = "pointer";
  };

  const mouseleaveEvent = (event) => {
    event.stopPropagation();
    event.target.style = "";
    document.body.style.cursor = "";
  };

  const mousedownEvent = (event) => {
    setClickedWorldLine(false);
    setClickedEvent(event);
    if (mode === "idle") {
      setMode("dragLine");
    }
  };

  const mouseupEvent = (event: EventNode) => {
    const tempWorldlines = [...worldlines];
    const newline: object = {
      source: clickedEvent,
      target: event,
    };
    const inplaceWorldLine = tempWorldlines.filter((l) => ((l.source === clickedEvent && l.target === event) || (l.target === clickedEvent && l.source === event)))
    if (inplaceWorldLine.length > 0 || clickedEvent === event) {
      return;
    }
    tempWorldlines.push(newline);
    setClickedEvent(event);
    setMode("idle");
    setWorldlines(tempWorldlines);
  }

  return (
    <g>
      {events.map((event: EventNode) => {
        return (
          <circle
            id={event.id.toString()}
            r={5}
            cx={SpaceScale(event.x)}
            cy={TimeScale(event.t)}
            fill={colorScale[event.id % colorScale.length]}
            className={`node ${event.id === clickedEvent.id ? "selected" : ""}`}
            onMouseOver={(domEvent) => mouseoverEvent(domEvent)}
            onMouseLeave={(domEvent) => mouseleaveEvent(domEvent)}
            onMouseUp={() => mouseupEvent(event)}
            onMouseDown={() => mousedownEvent(event)}
          ></circle>
        );
      })}
    </g>
  );
};

//{tooltip && <Tooltip eventdata={tooltip} />}
export default Events;
