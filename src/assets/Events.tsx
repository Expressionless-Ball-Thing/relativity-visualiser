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

  const svgRef = useRef(null)
  useEffect(() => draw(), [events, worldlines, clickedEvent, mode])

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

  const circles = events.map((d: EventNode) => <circle key={(Math.pow(2, d.id)).toString()}/>)

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(events)
      .classed("node", true)
      .classed("selected", (d) => (d === clickedEvent))
      .on("mouseover", (domEvent) => mouseoverEvent(domEvent))
      .on("mouseleave", (domEvent) => mouseleaveEvent(domEvent))
      .on("mouseup", (_, event) => mouseupEvent(event))
      .on("mousedown", (_, event) => mousedownEvent(event))
      .transition()
      .duration(500)
      .attr("cx", (event) => SpaceScale(event.x))
      .attr("cy", (event) => TimeScale(event.t))
      .attr("fill", (event) => colorScale[event.id % colorScale.length])
      .attr("r", 5)
  }

  return (
    <g ref={svgRef}>
      {circles}
    </g>
  );
};

//{tooltip && <Tooltip eventdata={tooltip} />}
export default Events;
