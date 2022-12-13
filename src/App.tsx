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

const App = () => {
  const [clickedEvent, setClickedEvent] = useState<EventNode>({});
  const [events, setEvents] = useState<EventNode[]>([
    {id: 0, name: "You", x: 0, t: 0},
    {id: 1, name: "event", x: 1, t: 1},
    {id: 2, name: "another event", x: -1, t: 2}
  ]);

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
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        setEvents={setEvents}/>
    </div>
  );
};

export default App;
