import { Tooltip } from "@mui/material";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { EventNode, WorldLine } from "../App";
import { determineIntervalType } from "./Toolbar";

const Transformed = ({ transformedItems, velocity, SpaceScale, TimeScale}) => {
  const svgRef = useRef(null);
  useEffect(() => draw(), [transformedItems, velocity]);

  const event_array = transformedItems.events.map((d: EventNode) => (
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
      key={Math.pow(2, d.id).toString()  + " transformed"}
      >
    <circle key={Math.pow(2, d.id).toString() + " transformed"} />
    </Tooltip>
  ));
  const worldline_array = transformedItems.worldlines.map((d: WorldLine) => (
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
        ).toString() + " transformed"
      }
      >
    <path
      id={
        (
          Math.pow(2, d.source.id) * Math.pow(3, d.target.id)
        ).toString() + " transformed"
      }
      key={
        (
          Math.pow(2, d.source.id) * Math.pow(3, d.target.id)
        ).toString() + " transformed"
      }
    />
    </Tooltip>
  ));

  const draw = () => {
    let nodes = d3
      .select(svgRef.current)
      .selectAll("circle")
      .data(transformedItems.events)

    let paths = d3
      .select(svgRef.current)
      .selectAll("path")
      .data(transformedItems.worldlines)

    nodes
      .transition()
      .duration(500)
      .attr("cx", (event) => SpaceScale(event.x))
      .attr("cy", (event) => TimeScale(event.t))
      .attr("r", 5)
      .style("fill", "#cbd1d8")

    paths
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

  return (
    <>
      {[-1, 1].includes(velocity) ? (
        ""
      ) : (
        <g className="transformed_stuff" ref={svgRef}>
          <g>{worldline_array}</g>
          <g>{event_array}</g>
        </g>
      )}
      ;
    </>
  );
};

export default Transformed;
