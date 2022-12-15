import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { EventNode, WorldLine } from "../App";

const colorScale = d3.schemePaired;

const Events_WorldLines = ({
  events,
  worldlines,
  SpaceScale,
  TimeScale,
  clickedEvent,
  setClickedEvent,
  clickedWorldLine,
  setClickedWorldLine,
  mode,
  setMode,
  setWorldlines
}) => {
  //const [tooltip, setTooltip] = useState<WorldLine| EventNode | boolean>(false);

  const EventRef = useRef(null);
  const mouseoverEvent = (event: Event, component) => {
    event.stopPropagation()
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
    document.body.style.cursor = "pointer";

  };

  const mouseleaveEvent = (event: Event) => {
    event.stopPropagation()
    event.target.style = "";
    document.body.style.cursor = "";
  };

  const mouseoverWorldLine = (event: Event, component) => {
    if (mode === "idle") {
      event.stopPropagation()
      event.target.style.stroke = "red";
      event.target.style.strokeWidth = 5;
      document.body.style.cursor = "pointer";      
    }

  };

  const mouseleaveWorldLine = (event: Event) => {
    if (mode === "idle") {
      event.stopPropagation()
      event.target.style = "";
      document.body.style.cursor = "";
    }

  };

  const mousedownEvent = (component) => {
    setClickedWorldLine(false); 
    setClickedEvent(component);
    if (mode === 'idle') {
      setMode('dragLine')
    }
  }


  useEffect(() => {    
    const svg = d3.select(EventRef.current);
    svg.selectAll(".worldline")
      .data(worldlines)
      .join("line")
      .attr("x1", d => SpaceScale(d.source.x))
      .attr("y1", d => TimeScale(d.source.t))
      .attr("x2", d => SpaceScale(d.target.x))
      .attr("y2", d => TimeScale(d.target.t))
      .style("stroke-width", `2px`)
      .style("stroke", "#000000")
      .classed("worldline", true)
      .classed("selected", (d) => (d === clickedWorldLine ? true : false))
      .on("mouseover", (event, component) => mouseoverWorldLine(event, component))
      .on("mouseleave", (event) => mouseleaveWorldLine(event))
      .on("mousedown", (_, component) => {setClickedEvent(false);setClickedWorldLine(component)});

    svg
      .selectAll(".node")
      .data(events)
      .join("circle")
      .attr("id", (d) => d.id.toString())
      .attr("r", 5)
      .attr("cx", (d) => SpaceScale(d.x))
      .attr("cy", (d) => TimeScale(d.t))
      .attr("fill", (d) => colorScale[d.id % colorScale.length])
      .classed("node", true)
      .classed("selected", (d) => (d.id === clickedEvent.id ? true : false))
      .on("mouseover", (event, component) => mouseoverEvent(event, component))
      .on("mouseleave", (event) => mouseleaveEvent(event))
      .on("mouseup", (_, component) => {
        const tempWorldlines = [...worldlines]
        const newline: object = {source: {...clickedEvent}, target: component}
        if (tempWorldlines.includes(newline) || clickedEvent === component) {return};
        tempWorldlines.push(newline)
        setClickedEvent(component)
        setMode('idle')
        setWorldlines(tempWorldlines)
      })
      .on("mousedown", (_, component) => {mousedownEvent(component)});
  });

  return (
    <>
      <g ref={EventRef}></g>
    </>
  );
};


 //{tooltip && <Tooltip eventdata={tooltip} />}
export default Events_WorldLines;
