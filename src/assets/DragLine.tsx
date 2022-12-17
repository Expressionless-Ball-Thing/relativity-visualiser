import { useEffect, useRef, useState } from "react";
import * as d3 from "d3"

const DragLine = ({mode, clickedEvent, SpaceScale, TimeScale}) => {

    const [mouseEvent, setmouseEvent] = useState({x:0, y:0});
    
    useEffect(() => {
        document.addEventListener("mousemove", (event) => setmouseEvent(event))
        return () => document.removeEventListener("mousemove", (event) => setmouseEvent(event))
    })

    return (
        <path className={`worldline dragline ${mode !== "dragLine" ? "hidden" : ""}`} d={`M ${clickedEvent === false ? '0,0' : `${SpaceScale(clickedEvent.x)},${TimeScale(clickedEvent.t)}`} L ${d3.pointer(mouseEvent, document.getElementById("visualiser"))[0]},${d3.pointer(mouseEvent, document.getElementById("visualiser"))[1]}`}></path>
    )
}

export default DragLine;