import "./App.css";
import { useState } from "react";
import ToolBar from "./assets/Toolbar";
import { Grid } from "./Grid";

const App = () => {
  const [clickedEvent, setClickedEvent] = useState({});
  const [events, setEvents] = useState([
    {
      id: 0,
      name: "You",
      x: 0,
      t: 0,
    },
    {
      id: 1,
      name: "event",
      x: 1,
      t: 1,
    },
    {
      id: 2,
      name: "another event",
      x: -1,
      t: 2,
    },
  ]);

  const deleteEvent = () => {
    setEvents(events.filter((event) => event.id !== clickedEvent.id));
  };

  return (
    <div className="App">
      <ToolBar clickedEvent={clickedEvent} deleteEvent={deleteEvent}/>
      <Grid
        events={events}
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        setEvents={setEvents}/>
    </div>
  );
};

export default App;
