import { CdkDragEnter } from '@angular/cdk/drag-drop';
import { Cube, Initials } from '../interfaces/iterfaces';

export const dargEnterEvent = (
  event: CdkDragEnter<Cube>,
  board: Cube[][],
  initials: Initials
) => {
  const [er, ec] = [initials.endNodeRow, initials.endNodeCol];
  let row = event.container.data['row'];
  let col = event.container.data['col'];

  board[er][ec].endNode = false;
  board[row][col].endNode = true;

  initials = { ...initials, endNodeRow: row, endNodeCol: col };

  return [board, initials];
};
