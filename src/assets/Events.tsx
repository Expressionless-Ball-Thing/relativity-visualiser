import { schemePaired } from "d3";
import React, { useState } from "react";

const colorScale = schemePaired;

const Events = ({
  events,
  SpaceScale,
  TimeScale,
  clickedEvent,
  setClickedEvent
}) => {
  const [tooltip, setTooltip] = useState<object | boolean>(false);

  const Tooltip = ({eventdata}) => {
    return (
    <foreignObject x={SpaceScale(eventdata.x) + 10} y={TimeScale(eventdata.t) + 10} width={100} height={100}>
      <div className="tooltip">
        <strong>{eventdata.name}</strong>
        <br/>
        x: {Math.round(eventdata.x)}
        <br/>
        t: {Math.round(eventdata.t)}
      </div>
    </foreignObject>
  )}


  const mouseover = (event: object) => {
    event.target.style.stroke = "black";
    event.target.style.strokeWidth = 2;
  };

  const mouseleave = (event: object) => {
    event.target.style = "";
  };

  return (
    <>
      {events.map((event: object) => (
        <circle
          id={event.id}
          key={event.id}
          className={`node ${event.id === clickedEvent.id ? "selected" : ""}`}
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
          onClick={() => {setClickedEvent(event)}}
        />
      ))}
      {tooltip && (
        <Tooltip
          eventdata={tooltip}
        />
      )}
    </>
  );
};

export default Events;
