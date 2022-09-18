import React from "react";

const ToolBar = ({clickedEvent, deleteEvent}) => {

  return (
    <div className="ToolBar">
      <div className="Typebar">
        <text className="control_label type">Type:</text>
        <label className="label_type">N/A</label>
      </div>
      <div className="Namebar">
        <text className="control_label input_label">Event Name:</text>
        <input type="text" placeholder={clickedEvent.name}/>
        <button className="delete" name="delete" onClick={deleteEvent}>
          delete
        </button>
      </div>
      <div className="Addbar">
        <text className="control_label Add_event">Add Event:</text>
        <input type="checkbox" name="add" />
      </div>
    </div>
  );
};

export default ToolBar;
