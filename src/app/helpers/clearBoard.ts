import { Cube } from '../interfaces/iterfaces';

export const clearBoard = (board: Cube[][]) => {
  board.map((row) =>
    row.map((cube) => {
      cube.isBlock = true;
      (cube.visited = false), (cube.marker = false);
    })
  );

  return board;
};
