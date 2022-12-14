import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const colorScale = d3.schemePaired;

const Events = ({
  events,
  SpaceScale,
  TimeScale,
  clickedEvent,
  setClickedEvent,
}) => {
  const [tooltip, setTooltip] = useState<object | boolean>(false);

  const EventRef = useRef(null);

  const Tooltip = ({ eventdata }) => {
    return (
      <foreignObject
        x={SpaceScale(eventdata.x) + 10}
        y={TimeScale(eventdata.t) + 10}
        width={100}
        height={100}
      >
        <div className="tooltip">
          <strong>{eventdata.name}</strong>
          <br />
          x: {eventdata.x}
          <br />
          t: {eventdata.t}
        </div>
      </foreignObject>
    );
  };

  const mouseover = (event: object, component) => {
    setTooltip(component);
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
    document.body.style.cursor = "pointer";
  };

  const mouseleave = (event) => {
    setTooltip(false);
    event.target.style = "";
    document.body.style.cursor = "";
  };

  useEffect(() => {
    const svg = d3.select(EventRef.current);
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
      .on("mouseover", (event, component) => mouseover(event, component))
      .on("mouseleave", (event) => mouseleave(event))
      .on("click", (_, component) => setClickedEvent(component));
  });

  return (
    <>
      <g ref={EventRef}></g>
      {tooltip && <Tooltip eventdata={tooltip} />}
    </>
  );
};

export default Events;
