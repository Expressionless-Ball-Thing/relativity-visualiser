import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Transformed = ({
  events,
  worldlines,
  velocity,
  SpaceScale,
  TimeScale,
}) => {
  const svgRef = useRef(null);

  useEffect(() => draw(), [events, worldlines, velocity])

  console.log(events)

  const event_array = events.map((event) => (
    <circle key={(Math.pow(2, event.x) * Math.pow(3, event.t)).toString()} />
  ));
  const worldline_array = worldlines.map((worldline) => (
    <path key={(Math.pow(2, worldline.source.x) * Math.pow(3, worldline.source.t) * Math.pow(5, worldline.target.x) * Math.pow(7, worldline.target.t)).toString()} />
  ));

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(events)
      .classed("node", true)
      .transition()
      .duration(1000)
      .attr("cx", (d) => SpaceScale(d.x))
      .attr("cy", (d) => TimeScale(d.t))
      .attr("r", 5)
      .attr("fill", "#cbd1d8");

    d3.select(svgRef.current)
      .selectAll("path")
      .classed("worldline", true)
      .data(worldlines)
      .transition()
      .duration(1000)
      .attr(
        "d",
        (d) =>
          `M${SpaceScale(d.source.x)},${TimeScale(d.source.t)} L${SpaceScale(
            d.target.x
          )},${TimeScale(d.target.t)}`
      );
  };

  return (<g className="transformed_stuff" ref={svgRef}>
    <g>
        {worldline_array}
    </g>
    <g>
        {event_array}
    </g>
  </g>);
};

export default Transformed;
