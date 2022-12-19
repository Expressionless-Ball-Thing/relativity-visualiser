import { Typography } from "@mui/material";
import { FC } from "react";




const Instructions: FC = () => {
    return (
        <>
            <Typography gutterBottom variant="h6">Tool Bar</Typography>
            <ul>
                <li>The <strong>Event</strong> section shows the type of object you clicked on the grid.</li>
                <li>The <strong>Name</strong> section allows you to rename the object you clicked on the grid, clicking on the <strong>Delete</strong> button 
                next to it will delete the clicked object.
                </li>
                <li>The <strong>Transform</strong> button performs a Lorentz transform, which will appears as a seperate turquoise dots and lines on the grid.</li>
                <ul>
                    <li>If the clicked item is <strong>Timelike</strong>, the transform will be executed such that the clicked interval is parallel to the time axis or on the time axis if the clicked object is an event.</li>
                    <li>If the clicked item is <strong>Spacelike</strong>, the transform will be executed such that the clicked interval is parallel to the space axis or on the space axis if the clicked object is an event.</li>
                    <li>If the clicked item is <strong>Lightlike</strong>, you will get an alert.</li>
                </ul>
                <li>The <strong>Recenter</strong> button reset all events and intervals to the transformed version, and resets the velocity to 0.</li>
                <li>The <strong>Clear Grid</strong> button clears the grid of events and intervals and resets the velocity to 0</li>
                <li>The <strong>Velocity Settings</strong> allows you to set the velocity between 1 to -1 (in natural units) through the slider or the text field.</li>
            </ul>

            <Typography gutterBottom variant="h6">Grid</Typography>
            <ul>
                <li>Click on an event or interval line to select it, the corresponding transformed version of the item will be hilighted as well.</li>
                <li>Double click on an empty spot in the Grid to insert an event.</li>
                <li>To add an interval between two events, simply drag from one event to the other.</li>
                <li>Press <strong>Backspace or Delete</strong> to delete the selected event or interval.</li>
            </ul>
        </>
    )
}

export default Instructions;