export interface Initials {
  rows: number;
  cols: number;
  startNodeRow: number;
  startNodeCol: number;
  endNodeRow: number;
  endNodeCol: number;
}

export interface Cube {
  id: number;
  startNode: boolean;
  endNode: boolean;
  isBlock: boolean;
  visited: boolean;
  visitNoAnimate: boolean;
  marker: boolean;
  markerNoAnimate: boolean;
  weight: number;
  row: number;
  col: number;
}

export interface Edge {
  node: number[];
  neighborNode: number[];
  weight: number;
}

export interface Reset {
  rows: number;
  cols: number;
}
