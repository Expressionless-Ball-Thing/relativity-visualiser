import { EventNode, Items } from "./types_interfaces";


const galilean = (event: EventNode, velocity: number): EventNode => {
    return {...event, x : (event.x - velocity * event.t)}
}

const lorentz = (event: EventNode, velocity: number): EventNode => {
    const lorentz_factor = (velocity: number) => 1 / Math.sqrt(1 - Math.pow(velocity, 2));
    return {
        ...event,
        x: lorentz_factor(velocity) * (event.x - velocity * event.t),
        t: lorentz_factor(velocity) * (event.t - velocity * event.x),
    }
};


export const transformItems = (items: Items, velocity: number, transform_mode: string): Items => {

    let transform: (event: EventNode, velocity: number) => EventNode;

    switch (transform_mode) {
        case "galilean":
            transform = galilean;
            break;
        case "lorentz":
            transform = lorentz;
    }


    return {
        events: items.events.map((event) => transform(event, velocity)),
        worldlines: items.worldlines.map((worldline) => {
            return {
                source: transform(worldline.source, velocity),
                target: transform(worldline.target, velocity),
                name: worldline.name,
            };
            }
        )
    }

}

