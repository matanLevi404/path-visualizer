import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Cube, Initials } from '../interfaces/iterfaces';

export const dropEvent = (
  event: CdkDragDrop<Cube>,
  board: Cube[][],
  initials: Initials
): any => {
  if (event.previousContainer.data['startNode']) {
    if (event.container.data['endNode']) return [board, initials];
    const prevStartRow = event.previousContainer.data['row'];
    const prevStartCol = event.previousContainer.data['col'];

    const newStartRow = event.container.data['row'];
    const newStartCol = event.container.data['col'];

    board[newStartRow][newStartCol].isBlock = false;

    board[prevStartRow][prevStartCol].startNode = false;
    board[newStartRow][newStartCol].startNode = true;

    initials.startNodeRow = newStartRow;
    initials.startNodeCol = newStartCol;

    return [board, initials];
  } else if (event.previousContainer.data['endNode']) {
    if (event.container.data['startNode']) return [board, initials];
    const prevEndRow = event.previousContainer.data['row'];
    const prevEndCol = event.previousContainer.data['col'];

    const newEndRow = event.container.data['row'];
    const newEndCol = event.container.data['col'];

    board[newEndRow][newEndCol].isBlock = false;

    board[prevEndRow][prevEndCol].endNode = false;
    board[newEndRow][newEndCol].endNode = true;

    initials.endNodeRow = newEndRow;
    initials.endNodeCol = newEndCol;

    return [board, initials];
  }
};
