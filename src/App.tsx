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

type Mode = "idle" | "dragLine" | "dragEvent";

const App = () => {
  const [clickedEvent, setClickedEvent] = useState<EventNode | boolean>(false);
  const [clickedWorldLine, setClickedWorldLine] = useState<WorldLine | boolean>(
    false
  );
  const [mode, setMode] = useState<Mode>("idle");
  const [events, setEvents] = useState<EventNode[]>([]);
  const [worldlines, setWorldlines] = useState<WorldLine[]>([]);
  const [velocity, setVelocity] = useState<Number>(0);

  const deleteEvent = () => {
    setEvents(
      events.filter((event: EventNode) => event.id !== clickedEvent.id)
    );
  };

  const deleteWorldLine = () => {
    setWorldlines(
      worldlines.filter((worldline: WorldLine) => {
        return !(
          (worldline.source === clickedWorldLine.source &&
            worldline.target === clickedWorldLine.target) ||
          (worldline.source === clickedWorldLine.target &&
            worldline.target === clickedWorldLine.source)
        );
      })
    );
  };

  const updateEventName = (event: Event) => {
    let tempEvents = [...events];
    for (let i: number = 0; i < events.length; i++) {
      if (tempEvents[i].id === clickedEvent.id) {
        tempEvents[i].name = event.target.value;
        break;
      }
    }
    setEvents(tempEvents);
  };

  return (
    <div className="App">
      <ToolBar
        clickedEvent={clickedEvent}
        clickedWorldline={clickedWorldLine}
        deleteEvent={deleteEvent}
        deleteWorldLine={deleteWorldLine}
        updateEvent={updateEventName}
        setVelocity={setVelocity}
      />
      <Grid
        events={events}
        worldlines={worldlines}
        clickedEvent={clickedEvent}
        clickedWorldLine={clickedWorldLine}
        setClickedEvent={setClickedEvent}
        setClickedWorldLine={setClickedWorldLine}
        setEvents={setEvents}
        setWorldlines={setWorldlines}
        mode={mode}
        setMode={setMode}
        velocity={velocity}
      />
    </div>
  );
};

export default App;
