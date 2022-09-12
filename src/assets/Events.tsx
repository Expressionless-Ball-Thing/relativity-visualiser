import { interpolateInferno, scaleSequential, select } from "d3";
import React from "react";

const mouseover = (event: object) => {

  event.target.style.stroke = "black"
  event.target.style.strokeWidth = 2
};

const mouseleave = (event: object) => {
    event.target.style.stroke = "none"
}

const Events = ({ events, SpaceScale, TimeScale }) =>
  events.map((event:object) => (
    <circle fill="red" cx={SpaceScale(event.x)} cy={TimeScale(event.t)} r={5} onMouseOver={mouseover} onMouseLeave={mouseleave}></circle>
  ));

export default Events;
