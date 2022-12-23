import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Input,
  Menu,
  MenuItem,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Clicked, CustomToolbar, TransformType, WorldLine } from "./types_interfaces";
import { styled } from "@mui/system";
import { useState } from "react";

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

const VelocityInput = styled(Input)`
  width: 100%;
`;

const ToolBarContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const StyledToolBar = styled(Box)`
  border: 1px solid turquoise;
  border-radius: 5px;
  width: 50%;
  min-width: 500px;
  row-gap: 1rem;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ToolBar = ({
  clicked,
  updateEvent,
  deleteStuff,
  setVelocity,
  velocity,
  recenter,
  setItems,
  setTransformType
}: CustomToolbar) => {

  const determineNewVelocity = (clicked: Clicked, transform: TransformType) => {

    let interval: WorldLine;

    if (transform === "galilean") {
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
      setVelocity(
        (interval.target.x - interval.source.x) /
          (interval.target.t - interval.source.t)
      );
      setTransformType("galilean")
      return;
    }

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
    setTransformType("lorentz")
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <ToolBarContainer>
      <StyledToolBar>
        <Box width={"90%"}>
          <Box>
            <Typography variant="subtitle2" color="blue" className="label_type">
              {`Type: `}
              {clicked.event !== null
                ? `Event (${determineIntervalType({
                    name: "",
                    source: { id: 0, name: "", x: 0, t: 0 },
                    target: clicked.event,
                  })})`
                : clicked.worldline !== null
                ? `${determineIntervalType(clicked.worldline)} interval`
                : "N/A"}
            </Typography>
          </Box>
          <Box>
            {`Name: `}
            <Input
              type="text"
              value={
                clicked.event !== null
                  ? clicked.event.name
                  : clicked.worldline !== null
                  ? clicked.worldline.name
                  : ""
              }
              onChange={updateEvent}
              disabled={
                clicked.event === null && clicked.worldline === null
                  ? true
                  : false
              }
            />

            <Button variant="outlined" onClick={deleteStuff} size="small">
              delete
            </Button>
          </Box>
        </Box>
        <Box>
          <Button
            id="transform-menu-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Transform mode
          </Button>
          <Menu 
            id="transform-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => setTransformType("galilean")}>Galiean</MenuItem>
            <MenuItem onClick={() => setTransformType("lorentz")}>Lorentz</MenuItem>
          </Menu>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            size="small"          
          >
            <Button
              className="transform"
              onClick={() => determineNewVelocity(clicked, "lorentz")}
            >
              Lorentz Transform
            </Button>
            <Button
              className="transform"
              onClick={() => determineNewVelocity(clicked, "galilean")}
            >
              Galilean Transform
            </Button>
          </ButtonGroup>

          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            size="small"
          >
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
        </Box>
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
          <VelocityInput
            type="number"
            id="Eventname"
            placeholder="Enter a number between -1 and 1"
            value={velocity}
            onChange={(event: any) => {
              if (event.target.value < 1 && event.target.value > -1) {
                setVelocity(event.target.value);
              }
            }}
          />
        </fieldset>
      </StyledToolBar>
    </ToolBarContainer>
  );
};
