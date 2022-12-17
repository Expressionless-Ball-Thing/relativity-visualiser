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

export const ToolBar = ({ clickedEvent, clickedWorldline, deleteEvent, updateEvent, deleteWorldLine, setVelocity }) => {

  const intervalType = clickedWorldline === false ? null : determineIntervalType(clickedWorldline);

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
        <span className="label_type">{clickedEvent !== false ? "Event" : clickedWorldline !== false ? `${intervalType} interval`: "N/A"}</span>
      </div>
      <div className="Namebar">
        <div className="control_label input_label">Event Name:</div>

        {clickedWorldline !== false ? 
        <button className="transform" name="transform" onClick={() => determineNewVelocity(clickedWorldline)}>Transform</button>
        :
        <input
          type="text"
          id="Eventname"
          placeholder={clickedEvent.name}
          onChange={updateEvent}
          disabled={clickedEvent === false ? true : false}
        />
        }

        <button className="delete" name="delete" onClick={clickedEvent !== false ? deleteEvent : deleteWorldLine}>
          delete
        </button>
      </div>
      <div className="Addbar">
        <span className="control_label move_event">Move Event:</span>
        <input type="checkbox" name="add" />
      </div>
    </div>
  );
};
