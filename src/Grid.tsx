import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { EventNode, WorldLine } from "./App";
import DragLine from "./assets/DragLine";
import Events from "./assets/Events";
import { SpaceAxis } from "./assets/SpaceAxis";
import { TimeAxis } from "./assets/TimeAxis";
import { determineIntervalType } from "./assets/Toolbar";
import Transformed from "./assets/Transformed";
import WorldLines from "./assets/WorldLines";

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const width: number = 1000;
const height: number = 1000;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const SpaceScale = d3.scaleLinear([10, -10], [width - margin.right, margin.left])
const TimeScale = d3.scaleLinear([-10, 10],[height - margin.bottom, margin.top])

interface Tooltip {
  type: "event" | "worldline" | null
  data: EventNode | WorldLine | null
  position: number[] | null
}

const Tooltip = ({tooltipdata}) => {
  return (<foreignObject x={tooltipdata.position[0] + 10} y={tooltipdata.position[1] + 10} width={100} height={100}>
    <div className="tooltip">
    {tooltipdata.type === "event" ? <>
      <strong>{tooltipdata.data.name}</strong>
      <br/>
      x: {tooltipdata.data.x}
      <br/>
      t: {tooltipdata.data.t}
      </>
    
    : 
      `Interval Type: ${determineIntervalType(tooltipdata.data)}`
    }
    </div>
  </foreignObject>
  )
};

export const Grid = ({
  items,
  clicked,
  setClicked,
  setItems,
  mode,
  setMode,
  velocity,
  deleteStuff,
  transformedItems
}) => {


  const [tooltip, settooltip] = useState<Tooltip>({type: null, data: null, position: null})

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseup", () => setMode("idle"));
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("mouseup", () => setMode("idle"));
    };
  }, [clicked, items]);

  const addEvent = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    let left = event.clientX - currentTargetRect.left;
    let top = event.clientY - currentTargetRect.top;
    if (
      left < margin.left ||
      left > width - margin.right ||
      top < margin.top ||
      top > height - margin.bottom
    )
      return;

    let lastnodeId = items.events.reduce(function (
      acc: number,
      currevent: EventNode
    ) {
      return currevent.id > acc ? currevent.id : acc;
    },
    0);

    const newEvent = {
      id: lastnodeId + 1,
      name: "",
      x: Math.round(SpaceScale.invert(left) * 10) / 10,
      t: Math.round(TimeScale.invert(top) * 10) / 10,
    };
    const tempEvents = [...items.events];
    tempEvents.push(newEvent);
    setClicked({ ...clicked, event: newEvent });
    setItems({...items, events: tempEvents});
  };

  const handleClick = (event) => {
    switch (event.detail) {
      case 2:
        addEvent(event);
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (event) => {
    if (event.target.tagName === "INPUT") return;
    if (["Backspace", "Delete"].includes(event.key)) {
      deleteStuff();
    }
  };

  return (
    <>
    <svg
      width={width}
      height={height}
      id="visualiser"
      onClick={handleClick}
      onMouseOver={() => (document.body.style.cursor = "crosshair")}
      onMouseLeave={() => (document.body.style.cursor = "")}
    >
      <SpaceAxis
        SpaceScale={SpaceScale}
        height={height}
        width={width}
        margin={margin}
      />
      <TimeAxis
        TimeScale={TimeScale}
        height={height}
        width={width}
        margin={margin}
      />
      <DragLine
        mode={mode}
        clicked={clicked}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
      />
      <Transformed
        transformedItems={transformedItems}
        velocity={velocity}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
      />
      <WorldLines
        items={items}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
        setClicked={setClicked}
        mode={mode}
        clicked={clicked}
        setTooltip={settooltip}
      />
      <Events
        items={items}
        SpaceScale={SpaceScale}
        TimeScale={TimeScale}
        clicked={clicked}
        setClicked={setClicked}
        mode={mode}
        setMode={setMode}
        setItems={setItems}
        setTooltip={settooltip}

      />
      {tooltip.type === null ? "" : <Tooltip tooltipdata={tooltip}/>}
    </svg>
    </>
  );
};
