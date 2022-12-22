import "./App.css";
import { useState } from "react";
import { ToolBar } from "./assets/Toolbar";
import Grid from "./assets/Grid";
import NavBar from "./assets/NavBar/NavBar";
import {
  Clicked,
  EventNode,
  Items,
  Mode,
  WorldLine,
} from "./assets/types_interfaces";
import { Box } from "@mui/material";
import { styled } from "@mui/system";


const AppBox = styled(Box)`
  text-align: center;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  display: flex;
  align-items: center;
`

const ContentWrap = styled(Box)`
display: block;
  text-align: center;
  padding: 64px;
`;

const GridWrap = styled(Box)`
  justify-items: center;
  align-items; center;
  margin: auto 20px;
`;

const App = () => {
  const [clicked, setClicked] = useState<Clicked>({
    event: null,
    worldline: null,
  });
  const [items, setItems] = useState<Items>({ events: [], worldlines: [] });
  const [mode, setMode] = useState<Mode>("idle");
  const [velocity, setVelocity] = useState<number>(0);

  const deleteStuff = () => {
    if (clicked.event !== null) {
      setItems({
        events: items.events.filter(
          (event: EventNode) => event.id !== clicked.event!.id
        ),
        worldlines: items.worldlines.filter(
          (worldline: WorldLine) =>
            worldline.source.id !== clicked.event!.id &&
            worldline.target.id !== clicked.event!.id
        ),
      });
    } else {
      setItems({
        ...items,
        worldlines: items.worldlines.filter((worldline: WorldLine) => {
          return !(
            (worldline.source.id === clicked.worldline!.source.id &&
              worldline.target.id === clicked.worldline!.target.id) ||
            (worldline.source.id === clicked.worldline!.target.id &&
              worldline.target.id === clicked.worldline!.source.id)
          );
        }),
      });
    }
  };

  const updateEvent = (event: any) => {
    if (clicked.event !== null) {
      let tempEvents = [...items.events];
      for (let i: number = 0; i < tempEvents.length; i++) {
        if (tempEvents[i].id === clicked.event.id) {
          tempEvents[i].name = event.target!.value;
          setItems({ ...items, events: tempEvents });
          return;
        }
      }
    } else if (clicked.worldline !== null) {
      let tempWorldlines = [...items.worldlines];
      for (let i: number = 0; i < tempWorldlines.length; i++) {
        if (
          tempWorldlines[i].source === clicked.worldline.source &&
          tempWorldlines[i].target === clicked.worldline.target
        ) {
          tempWorldlines[i].name = event.target!.value;
          setItems({ ...items, worldlines: tempWorldlines });
          return;
        }
      }
    }
  };
  const lorentz_factor = 1 / Math.sqrt(1 - Math.pow(velocity, 2));
  const transform = (event: EventNode): EventNode => {
    const tempEvent = { ...event };
    tempEvent.x = lorentz_factor * (event.x - velocity * event.t);
    tempEvent.t = lorentz_factor * (event.t - velocity * event.x);
    return tempEvent;
  };

  const transformedEvents = items.events.map((event) => {
    return transform(event);
  });
  const transformedWorldlines = items.worldlines.map((worldline) => {
    return {
      source: transform(worldline.source),
      target: transform(worldline.target),
      name: worldline.name,
    };
  });

  const recenter = () => {
    setItems({ events: transformedEvents, worldlines: transformedWorldlines });
    setClicked({ event: null, worldline: null });
    setVelocity(0);
  };

  return (
    <AppBox>
      <NavBar />
      <ContentWrap>
        <ToolBar
          clicked={clicked}
          deleteStuff={deleteStuff}
          updateEvent={updateEvent}
          setVelocity={setVelocity}
          velocity={velocity}
          recenter={recenter}
          setItems={setItems}
        />
        <GridWrap>
          <Grid
            deleteStuff={deleteStuff}
            items={items}
            transformedItems={{
              events: transformedEvents,
              worldlines: transformedWorldlines,
            }}
            clicked={clicked}
            setClicked={setClicked}
            setItems={setItems}
            mode={mode}
            setMode={setMode}
            velocity={velocity}
          />
        </GridWrap>
      </ContentWrap>
    </AppBox>
  );
};

export default App;
