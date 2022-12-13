import "./App.css";
import { useState } from "react";
import { ToolBar } from "./assets/Toolbar";
import { Grid } from "./Grid";

const App = () => {
  const [clickedEvent, setClickedEvent] = useState({});
  const [events, setEvents] = useState([
    {id: 0, name: "You", x: 0, t: 0},
    {id: 1, name: "event", x: 1, t: 1},
    {id: 2, name: "another event", x: -1, t: 2}
  ]);

  const deleteEvent = () => {
    setEvents(events.filter((event) => event.id !== clickedEvent.id));
  };

  const updateEventName = (event) => {
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
