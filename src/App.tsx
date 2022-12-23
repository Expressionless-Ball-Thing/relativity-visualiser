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
  TransformType,
  WorldLine,
} from "./assets/types_interfaces";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { transformItems } from "./assets/helpers";


const AppBox = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  align-items: center;
  justify-content: center;
  padding: 64px;
`

const GridWrap = styled(Box)`
  display: block;
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
  const [transformType, setTransformType] = useState<TransformType>("lorentz")

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

  const recenter = () => {
    setItems(transformItems(items, velocity, transformType));
    setClicked({ event: null, worldline: null });
    setVelocity(0);
  };

  return (
    <AppBox>
      <NavBar />
        <ToolBar
          clicked={clicked}
          deleteStuff={deleteStuff}
          updateEvent={updateEvent}
          setVelocity={setVelocity}
          velocity={velocity}
          recenter={recenter}
          setItems={setItems}
          setTransformType={setTransformType}
        />
        <GridWrap>
          <Grid
            deleteStuff={deleteStuff}
            items={items}
            transformedItems={transformItems(items, velocity, transformType)}
            clicked={clicked}
            setClicked={setClicked}
            setItems={setItems}
            mode={mode}
            setMode={setMode}
            velocity={velocity}
          />
        </GridWrap>
    </AppBox>
  );
};

export default App;
