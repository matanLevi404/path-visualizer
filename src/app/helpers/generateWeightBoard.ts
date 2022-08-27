import { Cube } from '../interfaces/iterfaces';

export const weightBoard = (board: Cube[][]) => {
  board.map((row) =>
    row.map((cube) => {
      if (!cube.endNode && !cube.startNode) {
        cube.weight = Math.floor(Math.random() * 20) + 1;
      }
    })
  );

  return board;
};
