import {
  Button,
  ButtonGroup,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { Clicked, CustomToolbar, WorldLine } from "./types_interfaces";

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
}: CustomToolbar) => {
  const matches = useMediaQuery("(min-width:300px)");
  const determineNewVelocity = (clicked: Clicked) => {
    let interval: WorldLine;

    if (clicked.event === null && clicked.worldline === null) {
      alert("Nothing is selected");
      return;
    } else if (clicked.event !== null) {
      interval = {
        name: "",
        source: { id: 0, name: "", x: 0, t: 0 },
        target: clicked.event,
      };
    } else {
      interval = clicked.worldline!;
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
      <div className="Namebar">
        <div>
          <div className="control_label">{`Type: `}</div>
          <span className="label_type">
            {clicked.event !== null
              ? `Event (${determineIntervalType({name: "", source: { id: 0, name: "", x: 0, t: 0 }, target: clicked.event})})`
              : clicked.worldline !== null
              ? `${determineIntervalType(clicked.worldline)} interval`
              : "N/A"}
          </span>
        </div>
        <div>
          <div className="control_label">{`Name: `}</div>
          <input
            type="text"
            value={clicked.event !== null ? clicked.event.name : clicked.worldline !== null ? clicked.worldline.name : ""}
            onChange={updateEvent}
            disabled={clicked.event === null && clicked.worldline === null ? true : false}
          />            
          <Button variant="outlined" onClick={deleteStuff} size="small">
          delete
        </Button>
        </div>

      </div>
      <div className="UtilityBar">
        <div>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            size="small"
            orientation={`${matches ? `horizontal` : `vertical`}`}
          >
            <Button
              className="transform"
              onClick={() => determineNewVelocity(clicked)}
            >
              Transform
            </Button>
            <Button className="recenter" onClick={recenter}>
              Recenter
            </Button>
            <Button
              className="clear"
              onClick={() => {
                setItems({ events: [], worldlines: [] });
                setVelocity(0);
              }}
            >
              Clear Grid
            </Button>
          </ButtonGroup>
        </div>
      </div>
        <fieldset className="VelocityBar">
          <legend>Velocity Settings</legend>
          <Slider
            size="small"
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={-1}
            max={1}
            step={0.01}
            value={velocity}
            onChange={(_, newValue) => setVelocity(newValue as number)}
          />
          <input
            type="text"
            min="-1"
            max="1"
            id="Eventname"
            placeholder="Enter a number between -1 and 1"
            value={velocity}
            onChange={(event: any) => { if (event.target.value < 1 && event.target.value > -1) {setVelocity(event.target.value)}}}
          />
        </fieldset>
    </div>
  );
};
