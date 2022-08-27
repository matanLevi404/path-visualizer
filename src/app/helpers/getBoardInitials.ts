export const getBoardInitials = (rows: number, cols: number) => {
  let startNodeRow = Math.floor(rows / 2);
  let startNodeCol = Math.floor(cols / 4);

  let endNodeRow = Math.floor(rows / 2);
  let endNodeCol = Math.floor(cols - cols / 4);

  if (rows % 2 == 0) rows = rows - 1;
  if (cols % 2 == 0) cols = cols - 1;
  if (startNodeRow % 2 == 0) startNodeRow -= 1;
  if (startNodeCol % 2 == 0) startNodeCol -= 1;
  if (endNodeRow % 2 == 0) endNodeRow -= 1;
  if (endNodeCol % 2 == 0) endNodeCol -= 1;

  return { rows, cols, startNodeRow, startNodeCol, endNodeRow, endNodeCol };
};
