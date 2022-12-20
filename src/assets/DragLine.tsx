import { useEffect, useState } from "react";
import * as d3 from "d3";
import { Clicked, Mode } from "./types_interfaces";
import { ScaleLinear } from "d3";

const DragLine = ({ mode, clicked, SpaceScale, TimeScale }: {mode: Mode, clicked: Clicked, SpaceScale: ScaleLinear<Number, Number, never>, TimeScale: ScaleLinear<Number, Number, never>}) => {
  const [mouseEvent, setmouseEvent] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener("mousemove", (event) => setmouseEvent(event));
    return () =>
      document.removeEventListener("mousemove", (event) =>
        setmouseEvent(event)
      );
  });

  return (
    <path
      className={`worldline dragline ${mode !== "dragLine" ? "hidden" : ""}`}
      d={`M ${
        clicked.event === null
          ? "0,0"
          : `${SpaceScale(clicked.event.x)},${TimeScale(clicked.event.t)}`
      } L ${d3.pointer(mouseEvent, document.getElementById("visualiser"))[0]},${
        d3.pointer(mouseEvent, document.getElementById("visualiser"))[1]
      }`}
    ></path>
  );
};

export default DragLine;
