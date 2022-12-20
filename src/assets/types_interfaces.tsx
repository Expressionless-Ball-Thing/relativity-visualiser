import { ScaleLinear } from "d3";

export type Mode = "idle" | "dragLine" | "dragEvent";

export interface EventNode {
  id: number;
  name: string;
  x: number;
  t: number;
}

export interface WorldLine {
  name: string;
  source: EventNode;
  target: EventNode;
}

export interface Items {
  events: EventNode[];
  worldlines: WorldLine[];
}

export interface Clicked {
  event: EventNode | null;
  worldline: WorldLine | null;
}

export interface CustomEvents {
  items: Items;
  SpaceScale: ScaleLinear<number, number, never>;
  TimeScale: ScaleLinear<number, number, never>;
  clicked: Clicked;
  setClicked: React.Dispatch<React.SetStateAction<Clicked>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setItems: React.Dispatch<React.SetStateAction<Items>>;
  velocity: number;
}

export interface CustomGrid {
  items: Items;
  clicked: Clicked;
  setClicked: React.Dispatch<React.SetStateAction<Clicked>>;
  setItems: React.Dispatch<React.SetStateAction<Items>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  velocity: number;
  deleteStuff: () => void;
  transformedItems: Items;
}

export interface CustomTransformed {
  transformedItems: Items;
  velocity: number,
  SpaceScale: ScaleLinear<number, number, never>,
  TimeScale: ScaleLinear<number, number, never>
}

export interface CustomWorldLine {
  items: Items
  SpaceScale: ScaleLinear<number, number, never>,
  TimeScale: ScaleLinear<number, number, never>,
  clicked: Clicked,
  setClicked: React.Dispatch<React.SetStateAction<Clicked>>,
  mode: Mode,
  velocity: number
}

export interface CustomToolbar {
  clicked: Clicked,
  updateEvent: (event: any) => void,
  deleteStuff: () => void,
  setVelocity: React.Dispatch<React.SetStateAction<number>>,
  velocity: number,
  recenter: () => void,
  setItems: React.Dispatch<React.SetStateAction<Items>>,
}
