import { WorldLine } from "../App";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
const WorldLines = ({
  worldlines,
  SpaceScale,
  TimeScale,
  setClickedEvent,
  clickedWorldLine,
  setClickedWorldLine,
  mode,
}) => {
  const svgRef = useRef(null);

  useEffect(() => draw(), [worldlines, clickedWorldLine, mode]);

  const mouseoverWorldLine = (event) => {
    if (mode === "idle") {
      event.stopPropagation();
      event.target.style.stroke = "red";
      event.target.style.strokeWidth = 5;
      document.body.style.cursor = "pointer";
    }
  };

  const mouseleaveWorldLine = (event) => {
    if (mode === "idle") {
      event.stopPropagation();
      event.target.style = "";
      document.body.style.cursor = "";
    }
  };
  const mousedownWorldLine = (worldline) => {
    setClickedWorldLine(worldline);
    setClickedEvent(false);
  };

  const lines = worldlines.map((worldline: WorldLine) => (
    <path
      key={(
        Math.pow(2, worldline.source.id) * Math.pow(3, worldline.target.id)
      ).toString()}
    />
  ));

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("path")
      .data(worldlines)
      .classed("worldline", true)
      .classed("selected", (worldline) => worldline === clickedWorldLine)
      .on("mouseover", (event) => mouseoverWorldLine(event))
      .on("mouseleave", (event) => mouseleaveWorldLine(event))
      .on("mousedown", (_, worldline) => mousedownWorldLine(worldline))
      .transition()
      .duration(500)
      .attr(
        "d",
        (d) =>
          `M${SpaceScale(d.source.x)},${TimeScale(d.source.t)} L${SpaceScale(
            d.target.x
          )},${TimeScale(d.target.t)}`
      );
  };

  return <g ref={svgRef}>{lines}</g>;
};

export default WorldLines;
