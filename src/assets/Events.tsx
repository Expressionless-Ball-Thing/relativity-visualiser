import React from "react";

const Events = ({ events, SpaceScale, TimeScale }) =>
  events.map((event) => (
    <circle cx={SpaceScale(event.x)} cy={TimeScale(event.t)} r={5}></circle>
  ));

export default Events;
