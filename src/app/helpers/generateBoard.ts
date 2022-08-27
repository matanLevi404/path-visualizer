export const generateBoard = ({
  rows,
  cols,
  startNodeRow,
  startNodeCol,
  endNodeRow,
  endNodeCol,
}) => {
  const board = [];
  let counter = 0;

  for (let i = 0; i < rows; i++) {
    let arrRow = [];
    for (let j = 0; j < cols; j++) {
      const cube = {
        id: counter,
        startNode: false,
        endNode: false,
        weight: 1,
        isBlock: false,
        visited: false,
        marker: false,
        row: i,
        col: j,
      };
      arrRow.push(cube);
      counter += 1;
    }
    board.push(arrRow);
  }

  board[startNodeRow][startNodeCol].startNode = true;
  board[endNodeRow][endNodeCol].endNode = true;

  return board;
};
