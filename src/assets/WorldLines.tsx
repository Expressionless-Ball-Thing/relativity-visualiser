import { WorldLine } from "../App";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
const WorldLines = ({
  items,
  SpaceScale,
  TimeScale,
  setClicked,
  clicked,
  mode,
}) => {
  const svgRef = useRef(null);

  useEffect(() => draw(), [items, clicked.worldline, mode]);

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
    setClicked({worldline: worldline, event: null})
  };

  const lines = items.worldlines.map((worldline: WorldLine) => (
    <path
      key={(
        Math.pow(2, worldline.source.id) * Math.pow(3, worldline.target.id)
      ).toString()}
    />
  ));

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("path")
      .data(items.worldlines)
      .classed("worldline", true)
      .classed("selected", (worldline) => worldline === clicked.worldline)
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
