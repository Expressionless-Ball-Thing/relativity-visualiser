import "./App.css";
import { useState } from "react";
import { ToolBar } from "./assets/Toolbar";
import { Grid } from "./Grid";

export interface EventNode {
  id: number;
  name: String;
  x: number;
  t: number;
}

export interface WorldLine {
  source: EventNode;
  target: EventNode;
}

export interface Items {
  events: EventNode[];
  worldlines: WorldLine[];
}

export interface Clicked {
  event: EventNode | null;
  worldline: WorldLine | null;
}

type Mode = "idle" | "dragLine" | "dragEvent";

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
          (event: EventNode) => (event.id !== clicked.event.id)
        ),
        worldlines: items.worldlines.filter(
          (worldline: WorldLine) =>
            (worldline.source.id !== clicked.event.id &&
            worldline.target.id !== clicked.event.id)
        )
      });
    } else {
      setItems({
        ...items,
        worldlines: items.worldlines.filter((worldline: WorldLine) => {
          return !(
            (worldline.source.id === clicked.worldline.source.id &&
              worldline.target.id === clicked.worldline.target.id) ||
            (worldline.source.id === clicked.worldline.target.id &&
              worldline.target.id === clicked.worldline.source.id)
          );
        }),
      });
    }
  };

  const updateEventName = (event: Event) => {
    let tempEvents = [...items.events];
    for (let i: number = 0; i < events.length; i++) {
      if (tempEvents[i].id === clickedEvent.id) {
        tempEvents[i].name = event.target.value;
        break;
      }
    }
    setItems({...items, events: tempEvents});
  };
  const lorentz_factor = 1 / Math.sqrt(1 - Math.pow(velocity, 2));
  const transform = (event) => {
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
    };
  });

  const recenter = () => {
    setItems({ events: transformedEvents, worldlines: transformedWorldlines });
    setClicked({ event: null, worldline: null });
    setVelocity(0);
  };

  return (
    <div className="App">
      <ToolBar
        clicked={clicked}
        deleteStuff={deleteStuff}
        updateEvent={updateEventName}
        setVelocity={setVelocity}
        velocity={velocity}
        recenter={recenter}
      />
      <Grid
        deleteStuff={deleteStuff}
        items={items}
        clicked={clicked}
        setClicked={setClicked}
        setItems={setItems}
        mode={mode}
        setMode={setMode}
        velocity={velocity}
      />
    </div>
  );
};

export default App;
