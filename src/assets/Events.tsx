import { schemePaired } from "d3";
import React, { useState } from "react";

const colorScale = schemePaired;

const Tooltip = ({ x, t, name }) => (
  <foreignObject x={x + 10} y={t + 10} width={100} height={100}>
    <div className="tooltip">
      <strong>{name}</strong>
      <br/>
      x: {Math.round(x)}
      <br/>
      t: {Math.round(t)}
    </div>
  </foreignObject>
);

const Events = ({
  events,
  SpaceScale,
  TimeScale,
  clickedEvent,
  setClickedEvent,
}) => {
  const [tooltip, setTooltip] = useState<object | boolean>(false);

  const mouseover = (event: object) => {
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
  };

  const mouseleave = (event: object) => {
    event.target.style = "";
  };

  const click = (event: object) => {
    setClickedEvent(parseInt(event.target.id));
  };

  return (
    <>
      {events.map((event: object) => (
        <circle
          id={event.id}
          key={event.id}
          className={`node ${event.id === clickedEvent ? "selected" : ""}`}
          fill={`${colorScale[event.id % colorScale.length]}`}
          cx={SpaceScale(event.x)}
          cy={TimeScale(event.t)}
          r={5}
          onMouseOver={(component: object) => {
            setTooltip(event);
            mouseover(component);
          }}
          onMouseLeave={(component: object) => {
            setTooltip(false);
            mouseleave(component);
          }}
          onClick={click}
        />
      ))}
      {tooltip && (
        <Tooltip
          x={SpaceScale(tooltip.x)}
          t={TimeScale(tooltip.t)}
          name={tooltip.name}
        />
      )}
    </>
  );
};

export default Events;
