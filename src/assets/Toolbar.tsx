import { Slider } from "@mui/material";
import { WorldLine } from "../App";

type interval = "Timelike" | "Spacelike" | "Lightlike"

const determineIntervalType = (worldLine: WorldLine): interval => {
  let interval_time = worldLine.target.t - worldLine.source.t 
  let interval_space = worldLine.target.x - worldLine.source.x

  let spacetime_interval = Math.pow(interval_time, 2) - Math.pow(interval_space, 2)

  if (spacetime_interval > 0) {
    return "Timelike"
  } else if (spacetime_interval < 0) {
    return "Spacelike"
  } else {
    return "Lightlike"
  }

}

export const ToolBar = ({ clicked, updateEvent, deleteStuff, setVelocity, velocity, recenter, setItems }) => {

  const intervalType = clicked.worldline === null ? null : determineIntervalType(clicked.worldline);

  const determineNewVelocity = (worldline: WorldLine) => {
    if (intervalType === "Timelike") {
      setVelocity((worldline.target.x - worldline.source.x) / (worldline.target.t - worldline.source.t))
    } else if (intervalType === "Spacelike") {
      setVelocity((worldline.target.t - worldline.source.t) / (worldline.target.x - worldline.source.x))
    } else {
      alert("This interval is Lightlike") 
    }
    
  }

  return (
    <div className="ToolBar">
      <div className="Typebar">
        <span className="control_label type">Type:</span>
        <span className="label_type">{clicked.event !== null ? "Event" : clicked.worldline !== null ? `${intervalType} interval`: "N/A"}</span>
      </div>
      <div className="Namebar">
        <div className="control_label input_label">Event Name:</div>

        {clicked.worldline !== null ?
        <button className="transform" name="transform" onClick={() => determineNewVelocity(clicked.worldline)}>Transform</button>
        :
        <input
          type="text"
          value={clicked.event === null ? "" : clicked.event.name}
          onChange={updateEvent}
          disabled={clicked.event === null ? true : false}
        />
        }

        <button className="delete" name="delete" onClick={deleteStuff}>
          delete
        </button>
      </div>
      <div className="Addbar">
        <span className="control_label move_event">Move Event:</span>
        <input type="checkbox" name="add" />
      </div>
      <div>
        <button className="delete" name="recenter" onClick={recenter}>Recenter</button>
      </div>
      <div>
        <button className="delete" name="clear" onClick={() =>{ setItems({events:[], worldlines: []}); setVelocity(0)}}>Clear Grid</button>
      </div>
      <div className="VelocityBar">
        <Slider
          size="small"
          defaultValue={0}
          aria-label="Small"
          valueLabelDisplay="auto"
          min={-1}
          max={1}
          step={0.00001}
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
