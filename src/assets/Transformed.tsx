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

  const lorentz_factor = 1 / Math.sqrt(1 - Math.pow(velocity, 2));

  const transform = (event) => {
    const tempEvent = { ...event };
    tempEvent.x = lorentz_factor * (event.x - velocity * event.t);
    tempEvent.t = lorentz_factor * (event.t - velocity * event.x);
    return tempEvent;
  };

  const transformedEvents = events.map((event) => {
    return transform(event);
  });
  const transformedWorldlines = worldlines.map((worldline) => {
    return {
      source: transform(worldline.source),
      target: transform(worldline.target),
    };
  });

  const event_array = transformedEvents.map(() => (
    <circle key={Date.now().toString() + Math.random.toString()} />
  ));
  const worldline_array = transformedWorldlines.map(() => (
    <path key={Date.now().toString() + Math.random.toString()} />
  ));

  const draw = () => {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(transformedEvents)
      .classed("node", true)
      .transition()
      .duration(1000)
      .attr("cx", (d) => SpaceScale(d.x))
      .attr("cy", (d) => TimeScale(d.t))
      .attr("r", 5)
      .style("fill", "cbd1d8");

    d3.select(svgRef.current)
      .selectAll("path")
      .classed("worldline", true)
      .data(transformedWorldlines)
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
