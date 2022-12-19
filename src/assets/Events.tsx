import { Tooltip } from "@mui/material";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { EventNode } from "../App";

const colorScale = d3.schemePaired;

const radius = 5;

const Events = ({
  items,
  SpaceScale,
  TimeScale,
  clicked,
  setClicked,
  mode,
  setMode,
  setItems,
  velocity,
}) => {
  const svgRef = useRef(null);
  useEffect(() => draw(), [items, clicked, mode, velocity]);

  const mouseoverEvent = (event, component) => {
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
    event.target.style.cursor = "pointer";
    if (mode === "dragLine") {
      d3.select(event.target)
        .transition()
        .attr("r", radius * 1.5);
    } else if (mode === "idle") {
      d3.selectAll(".transformed_stuff circle")
        .filter((d) => d.id === component.id)
        .transition()
        .style("fill", "black");
    }
  };

  const mouseleaveEvent = (event, component) => {
    event.target.style = "";
    document.body.style.cursor = "";
    if (mode === "dragLine") {
      d3.select(event.target).transition().attr("r", radius);
    }
    d3.selectAll(".transformed_stuff circle")
      .filter((d) => d.id === component.id)
      .transition()
      .style("fill", "#cbd1d8");
  };

  const mousedownEvent = (event) => {
    setClicked({ worldline: null, event: event });
    if (mode === "idle") {
      setMode("dragLine");
    }
  };

  const mouseupEvent = (event: EventNode) => {
    const tempWorldlines = [...items.worldlines];
    const newline: object = {
      source: clicked.event,
      target: event,
    };
    const inplaceWorldLine = tempWorldlines.filter(
      (l) =>
        (l.source === clicked.event && l.target === event) ||
        (l.target === clicked.event && l.source === event)
    );
    if (inplaceWorldLine.length > 0 || clicked.event === event) {
      return;
    }
    tempWorldlines.push(newline);
    setClicked({ ...clicked, event: event });
    setItems({ ...items, worldlines: tempWorldlines });
    setMode("idle");
  };

  const circles = items.events.map((d: EventNode) => (
    <Tooltip followCursor
      title={
        <>
          {d.name !== "" ? <><strong>{d.name}</strong>
          <br/></> : ""}
          X: {Math.round(d.x * 1000) / 1000}
          <br/>
          T: {Math.round(d.t * 1000) / 1000}
        </>
      }
      key={Math.pow(2, d.id).toString()}
    >
      <circle key={Math.pow(2, d.id).toString()} />
    </Tooltip>
  ));

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(items.events)
      .classed("node", true)
      .classed("selected", (d) => d === clicked.event)
      .on("mouseover", (domEvent, component) =>
        mouseoverEvent(domEvent, component)
      )
      .on("mouseleave", (domEvent, component) =>
        mouseleaveEvent(domEvent, component)
      )
      .on("mouseup", (_, event) => mouseupEvent(event))
      .on("mousedown", (_, event) => mousedownEvent(event))
      .transition()
      .duration(500)
      .attr("cx", (event) => SpaceScale(event.x))
      .attr("cy", (event) => TimeScale(event.t))
      .attr("fill", (event) => colorScale[event.id % colorScale.length])
      .attr("r", radius);
  };

  return <g ref={svgRef}>{circles}</g>;
};

export default Events;
