import { CustomWorldLine, WorldLine } from "./types_interfaces";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Tooltip } from "@mui/material";
import { determineIntervalType } from "./Toolbar";
const WorldLines = ({
  items,
  SpaceScale,
  TimeScale,
  setClicked,
  clicked,
  mode,
  velocity
}: CustomWorldLine) => {
  const svgRef = useRef(null);

  useEffect(() => draw(), [items, clicked, mode, velocity]);

  const mouseoverWorldLine = (event: any, worldline: WorldLine) => {
    if (mode === "idle") {
      event.target!.style.stroke = "red";
      event.target!.style.strokeWidth = 5;
      event.target!.style.cursor = "pointer";

      d3.selectAll(".transformed_stuff path")
        .filter(
          (d: any) =>
            d.source.id === worldline.source.id &&
            d.target.id === worldline.target.id
        )
        .transition()
        .style("stroke", "black");
    }
  };

  const mouseleaveWorldLine = (event: any, worldline: WorldLine) => {
    if (mode === "idle") {
      event.stopPropagation();
      event.target!.style = "";
      document.body.style.cursor = "";

      d3.selectAll(".transformed_stuff path")
        .filter(
          (d: any) =>
            d.source.id === worldline.source.id &&
            d.target.id === worldline.target.id
        )
        .transition()
        .style("stroke", "turquoise");
    }
  };
  const mousedownWorldLine = (worldline: WorldLine) => {
    setClicked({ worldline: worldline, event: null });
  };

  const lines = items.worldlines.map((d: WorldLine) => (
    <Tooltip followCursor
      title={
        <>
          {d.name !== "" ? <><strong>{d.name}</strong>
          <br/></> : ""}
          {`Interval Type: ${determineIntervalType(d)}`}
        </>
      }
      key={
        (
          Math.pow(2, d.source.id) * Math.pow(3, d.target.id)
        ).toString()
      }
      >
    <path
      key={(
        Math.pow(2, d.source.id) * Math.pow(3, d.target.id)
      ).toString()}
    />
    </Tooltip>

  ));

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("path")
      .data(items.worldlines)
      .classed("worldline", true)
      .classed("selected", (worldline) => worldline === clicked.worldline)
      .on("mouseover", (event, worldline) =>
        mouseoverWorldLine(event, worldline)
      )
      .on("mouseleave", (event, worldline) =>
        mouseleaveWorldLine(event, worldline)
      )
      .on("mousedown", (_, worldline) => mousedownWorldLine(worldline))
      .transition()
      .duration(500)
      .attr(
        "d",
        (d: WorldLine) =>
          `M${SpaceScale(d.source.x)},${TimeScale(d.source.t)} L${SpaceScale(
            d.target.x
          )},${TimeScale(d.target.t)}`
      );
  };

  return <g ref={svgRef}>{lines}</g>;
};

export default WorldLines;
