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
  const [velocity, setVelocity] = useState<number>(0);

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

  const recenter = () => {
    const lorentz_factor = 1 / Math.sqrt(1 - Math.pow(velocity, 2));
    const transform = (event) => {
      const tempEvent = { ...event };
      tempEvent.x = lorentz_factor * (event.x - velocity * event.t);
      tempEvent.t = lorentz_factor * (event.t - velocity * event.x);
      return tempEvent;
    };
  
    const transformedEvents = events.map((event) => {
      return transform(event);
    });
    const transformedWorldlines = worldlines.map((worldline) => {
      return {
        source: transform(worldline.source),
        target: transform(worldline.target),
      };
    }); 

    setEvents(transformedEvents)
    setWorldlines(transformedWorldlines)
    setClickedEvent(false)
    setClickedWorldLine(false)
    setVelocity(0)
  }

  return (
    <div className="App">
      <ToolBar
        clickedEvent={clickedEvent}
        clickedWorldline={clickedWorldLine}
        deleteEvent={deleteEvent}
        deleteWorldLine={deleteWorldLine}
        updateEvent={updateEventName}
        setVelocity={setVelocity}
        velocity={velocity}
        recenter={recenter}
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
