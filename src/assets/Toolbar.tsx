
export const ToolBar = ({ clickedEvent, deleteEvent, updateEvent }) => {
  return (
    <div className="ToolBar">
      <div className="Typebar">
        <text className="control_label type">Type:</text>
        <label className="label_type">N/A</label>
      </div>
      <div className="Namebar">
        <text className="control_label input_label">Event Name:</text>

        <input
          type="text"
          id="Eventname"
          placeholder={clickedEvent.name}
          onChange={updateEvent}
          disabled={clickedEvent === null ? true : false}
        />

        <button className="delete" name="delete" onClick={deleteEvent}>
          delete
        </button>
      </div>
      <div className="Addbar">
        <span className="control_label move_event">Move_Event:</span>
        <input type="checkbox" name="add" />
      </div>
    </div>
  );
};
