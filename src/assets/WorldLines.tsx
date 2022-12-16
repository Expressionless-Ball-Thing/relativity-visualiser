import { WorldLine } from "../App";

const WorldLines = ({
  worldlines,
  SpaceScale,
  TimeScale,
  setClickedEvent,
  clickedWorldLine,
  setClickedWorldLine,
  mode,
  setMode
}) => {
  const mouseoverWorldLine = (event) => {
    if (mode === "idle") {
      event.stopPropagation();
      event.target.style.stroke = "red";
      event.target.style.strokeWidth = 5;
      document.body.style.cursor = "pointer";
    }
  };

  const mouseleaveWorldLine = (event) => {
    if (mode === "idle") {
      event.stopPropagation();
      event.target.style = "";
      document.body.style.cursor = "";
    }
  };
  const mousedownWorldLine = (worldline) => {
    setClickedWorldLine(worldline);
    setClickedEvent(false);
  };

  return (
    <g>
      {worldlines.map((worldline: WorldLine) => {
        return (
          <path
            className={`worldline ${
              worldline === clickedWorldLine ? "selected" : ""
            }`}
            d={`M${SpaceScale(worldline.source.x)},${TimeScale(
              worldline.source.t
            )} L${SpaceScale(worldline.target.x)},${TimeScale(
              worldline.target.t
            )}`}
            onMouseOver={(domEvent) => mouseoverWorldLine(domEvent)}
            onMouseLeave={(domEvent) => mouseleaveWorldLine(domEvent)}
            onMouseDown={() => mousedownWorldLine(worldline)}
          ></path>
        );
      })}
    </g>
  );
};

export default WorldLines;
