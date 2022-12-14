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

type Mode = 'idle' | 'dragLine' | 'dragEvent'

const App = () => {
  const [clickedEvent, setClickedEvent] = useState<EventNode | boolean>(false);
  const [clickedWorldLine, setClickedWorldLine] = useState<WorldLine | boolean>(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [events, setEvents] = useState<EventNode[]>([
    {id: 0, name: "You", x: 0, t: 0},
    {id: 1, name: "event", x: 4, t: 4},
    {id: 2, name: "another event", x: 0, t: 8}
  ]);
  const [worldlines, setWorldlines] = useState<WorldLine[]>([
    {source: events[0], target: events[1]},
    {source: events[1], target: events[2]}
  ])

  const deleteEvent = () => {
    console.log("hey")
    setEvents(events.filter((event: EventNode) => event.id !== clickedEvent.id));
  };

  const updateEventName = (event: Event) => {
    let tempEvents = [...events]
    for (let i : number = 0; i < events.length; i++) {
      if (tempEvents[i].id === clickedEvent.id) {
        tempEvents[i].name = event.target.value;
        break;
      }
    }
    setEvents(tempEvents);
  }

  return (
    <div className="App">
      <ToolBar clickedEvent={clickedEvent} deleteEvent={deleteEvent} updateEvent={updateEventName}/>
      <Grid
        events={events}
        worldlines={worldlines}
        clickedEvent={clickedEvent}
        clickedWorldLine={clickedWorldLine}
        setClickedEvent={setClickedEvent}
        setClickedWorldLine={setClickedWorldLine}
        setEvents={setEvents} 
        setWorldlines={setWorldlines}/>
    </div>
  );
};

export default App;
