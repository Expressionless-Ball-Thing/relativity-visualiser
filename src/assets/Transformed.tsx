import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Transformed = ({ transformedItems, velocity, SpaceScale, TimeScale }) => {
  const svgRef = useRef(null);
  useEffect(() => draw(), [transformedItems, velocity]);

  const event_array = transformedItems.events.map((event) => (
    <circle key={Math.pow(2, event.id).toString() + " transformed"} />
  ));
  const worldline_array = transformedItems.worldlines.map((worldline) => (
    <path
      id={
        (
          Math.pow(2, worldline.source.id) * Math.pow(3, worldline.target.id)
        ).toString() + " transformed"
      }
      key={
        (
          Math.pow(2, worldline.source.id) * Math.pow(3, worldline.target.id)
        ).toString() + " transformed"
      }
    />
  ));

  const draw = () => {
    let nodes = d3
      .select(svgRef.current)
      .selectAll("circle")
      .data(transformedItems.events)

    let paths = d3
      .select(svgRef.current)
      .selectAll("path")
      .data(transformedItems.worldlines);

    nodes
      .transition()
      .duration(500)
      .attr("cx", (event) => SpaceScale(event.x))
      .attr("cy", (event) => TimeScale(event.t))
      .attr("r", 5)
      .style("fill", "#cbd1d8");

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
