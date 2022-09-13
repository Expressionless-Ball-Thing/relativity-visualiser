import { interpolateInferno, scaleSequential, select } from "d3";
import React from "react";

const Events = ({
  events,
  SpaceScale,
  TimeScale,
  clickedEvent,
  setClickedEvent,
}) => {
  const mouseover = (event: object) => {
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
  };

  const mouseleave = (event: object) => {
    event.target.style = ""
  };

  const click = (event: object) => {
    setClickedEvent(parseInt(event.target.id))
  }

  let circles = events.map((event: object) => {
    return (
      <circle
        id={event.id}
        key={event.id}
        className={`node ${(event.id === clickedEvent) ? "selected" : ""}`}
        fill="red"
        cx={SpaceScale(event.x)}
        cy={TimeScale(event.t)}
        r={5}
        onMouseOver={mouseover}
        onMouseLeave={mouseleave}
        onClick={click}
      ></circle>
    );
  });

  return circles;
};

export default Events;
