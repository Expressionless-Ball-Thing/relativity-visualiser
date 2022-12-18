import { Slider } from "@mui/material";
import { WorldLine } from "../App";

type interval = "Timelike" | "Spacelike" | "Lightlike";

export const determineIntervalType = (worldLine: WorldLine): interval => {
  let interval_time = worldLine.target.t - worldLine.source.t;
  let interval_space = worldLine.target.x - worldLine.source.x;

  let spacetime_interval =
    Math.pow(interval_time, 2) - Math.pow(interval_space, 2);

  if (spacetime_interval > 0) {
    return "Timelike";
  } else if (spacetime_interval < 0) {
    return "Spacelike";
  } else {
    return "Lightlike";
  }
};

export const ToolBar = ({
  clicked,
  updateEvent,
  deleteStuff,
  setVelocity,
  velocity,
  recenter,
  setItems,
}) => {
  const determineNewVelocity = (clicked) => {

    let interval: WorldLine;

    if (clicked.event === null && clicked.worldline === null) {
      alert("Nothing is selected"); return;
    } else if (clicked.event !== null) {
      interval = {name: "", source: {id: 0, name: "", x: 0, t: 0}, target: clicked.event};
    } else {
      interval = clicked.worldline
    }

    const intervalType = determineIntervalType(interval);

    if (intervalType === "Timelike") {
      setVelocity(
        (interval.target.x - interval.source.x) /
          (interval.target.t - interval.source.t)
      );
    } else if (intervalType === "Spacelike") {
      setVelocity(
        (interval.target.t - interval.source.t) /
          (interval.target.x - interval.source.x)
      );
    } else if (intervalType === "Lightlike") {
      alert("This interval is Lightlike");
    }
  };

  return (
    <div className="ToolBar">
      <div className="Typebar">
        <span className="control_label type">Type:</span>
        <span className="label_type">
          {clicked.event !== null
            ? "Event"
            : clicked.worldline !== null
            ? `${determineIntervalType(clicked.worldline)} interval`
            : "N/A"}
        </span>
      </div>
      <div className="Namebar">
        <div className="control_label input_label">
          {clicked.event !== null ? "Event" : "Interval"} name:
        </div>
        <input
          type="text"
          value={clicked.event !== null ? clicked.event.name : clicked.worldline !== null ? clicked.worldline.name : ""}
          onChange={updateEvent}
          disabled={clicked.event === null && clicked.worldline === null ? true : false}
        />
      </div>
      <div className="ButtonBar">
        <button className="delete" name="delete" onClick={deleteStuff}>
          delete
        </button>
        <button
          className="transform"
          name="transform"
          onClick={() => determineNewVelocity(clicked)}
        >
          Transform
        </button>
        <button className="recenter" name="recenter" onClick={recenter}>
          Recenter
        </button>
        <button
          className="clear"
          name="clear"
          onClick={() => {
            setItems({ events: [], worldlines: [] });
            setVelocity(0);
          }}
        >
          Clear Grid
        </button>
      </div>
      <div className="Addbar">
        <span className="control_label move_event">Move Event:</span>
        <input type="checkbox" name="add" />
      </div>
      <div className="VelocityBar">
        <Slider
          size="small"
          defaultValue={0}
          aria-label="Small"
          valueLabelDisplay="auto"
          min={-1}
          max={1}
          step={0.01}
          value={velocity}
          onChange={(_, newValue) => setVelocity(newValue)}
        />
        <input
          type="number"
          min="-1"
          max="1"
          id="Eventname"
          value={velocity}
          onChange={(event) => setVelocity(event.target.value)}
        />
      </div>
    </div>
  );
};
