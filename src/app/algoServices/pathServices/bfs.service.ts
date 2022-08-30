import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

@Injectable({
  providedIn: 'root',
})
export class BFSService {
  constructor(private _variablesService: VariablesService) {}

  BFS(board: Cube[][], node: Cube, endNode: Cube, ms: number) {
    let visited = [];
    let visitList = [];
    let queue = [];
    let reachTarget = false;
    let pred = [];
    let path = [];

    let [er, ec] = [0, 0];
    let startId = node.id;

    board.map((r) => r.map((c) => pred.push([-1, [-1, -1]])));

    const neighbors = [
      [0, 1],
      [-1, 0],
      [1, 0],
      [0, -1],
    ];

    visited.push(node.id);
    queue.push(node);

    while (queue.length != 0 && !reachTarget) {
      node = queue.shift();
      let s_r = node.row;
      let s_c = node.col;

      for (let i = 0; i < neighbors.length; i++) {
        let new_r = node.row + neighbors[i][0];
        let new_c = node.col + neighbors[i][1];

        if (this.checkLimits(new_r, new_c, board.length, board[0].length)) {
          if (board[new_r][new_c].isBlock) continue;

          visitList.push([new_r, new_c]);

          let neighborNode = board[new_r][new_c];

          if (new_r == endNode.row && new_c == endNode.col) {
            [er, ec] = [endNode.row, endNode.col];
            pred[neighborNode.id] = [node.id, [s_r, s_c]];
            node = neighborNode;
            reachTarget = true;
            break;
          }

          if (!visited.find((id) => id == neighborNode.id)) {
            pred[neighborNode.id] = [node.id, [s_r, s_c]];
            visited.push(neighborNode.id);
            queue.push(neighborNode);
          }
        }
      }
    }

    pred[startId] = [-1, [-1, -1]];
    const dest = board[er][ec];

    path = this.findPath(pred, dest);

    return [visitList, path];
  }

  private findPath(pred: number | number[], dest: Cube) {
    let path = [];

    const [er, ec] = [dest.row, dest.col];

    let walk = dest.id;

    while (walk != -1) {
      path.unshift(pred[walk][1]);
      walk = pred[walk][0];
    }

    path.push([er, ec]);

    return path;
  }

  private async drawPath(path: number[][], board: Cube[][], ms: number) {
    for (let i = 1; i < path.length; i++) {
      const [row, col] = [path[i][0], path[i][1]];

      if (ms > 0) await timeout(25);

      board[row][col].marker = true;
      this._variablesService.setBoard(board);
    }
  }

  private checkLimits(
    new_r: number,
    new_c: number,
    rows: number,
    cols: number
  ) {
    if (new_r >= 0 && new_r < rows && new_c >= 0 && new_c < cols) return true;

    return false;
  }
}
