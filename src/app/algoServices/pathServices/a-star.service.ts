import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

interface OpenListItem {
  id: number;
  parentId: number;
  cords: number[];
  g: number;
  h: number;
  f: number;
}

@Injectable({
  providedIn: 'root',
})
export class AStarService {
  constructor(private _variablesService: VariablesService) {}

  async aStar(board: Cube[][], startNode: Cube, endNode: Cube, ms: number) {
    const [rows, cols] = [board.length, board[0].length];

    const [e_r, e_c] = [endNode.row, endNode.col];
    const [s_r, s_c] = [startNode.row, startNode.col];

    let openList: OpenListItem[] = [];
    let closedList = [];

    let reachTarget: boolean = false;
    let target: OpenListItem;

    openList.push({
      id: startNode.id,
      parentId: -1,
      g: startNode.weight,
      h: Math.abs(s_r - e_r) + Math.abs(s_c - e_c),
      f: 0,
      cords: [startNode.row, startNode.col],
    });

    const neighbors = [
      [0, 1],
      [-1, 0],
      [1, 0],
      [0, -1],
    ];

    while (openList.length != 0 && !reachTarget) {
      const lowInd = this.findMinF(openList);

      const q = openList[lowInd];
      openList.splice(lowInd, 1);

      const [r, c] = [q.cords[0], q.cords[1]];

      if (ms > 0) await timeout(20);

      board[r][c].visited = true;
      this._variablesService.setBoard(board);

      for (let i = 0; i < neighbors.length; i++) {
        const [n_r, n_c] = [r + neighbors[i][0], c + neighbors[i][1]];

        if (!this.checkLimits(n_r, n_c, rows, cols)) continue;

        const neighborNode = board[n_r][n_c];

        if (neighborNode.visited || neighborNode.isBlock) continue;

        const h_cost = Math.abs(n_r - e_r) + Math.abs(n_c - e_c);
        const g_cost = q.g + 0;
        const f_cost = h_cost + g_cost;

        const n_OpenListItem = {
          id: neighborNode.id,
          parentId: q.id,
          cords: [n_r, n_c],
          g: g_cost,
          h: h_cost,
          f: h_cost + g_cost,
        };

        if (n_r == endNode.row && n_c == endNode.col) {
          target = n_OpenListItem;

          if (ms > 0) await timeout(20);

          board[n_r][n_c].visited = true;
          reachTarget = true;
          this._variablesService.setBoard(board);
        }

        if (closedList.find((i) => i.id == neighborNode.id)) continue;

        if (openList.find((i) => i.id == neighborNode.id)) continue;

        openList.push(n_OpenListItem);
      }

      closedList.push(q);
    }

    const path = this.findPath(closedList, target);

    await this.drawPath(board, path, ms);
  }

  private findMinF(openList: OpenListItem[]) {
    let lowInd: number = 0;

    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) lowInd = i;
    }

    return lowInd;
  }

  private findPath(closedList: OpenListItem[], node: OpenListItem) {
    let id = node.id;
    let path = [];

    while (id != -1) {
      path.unshift(node.cords);

      id = node.parentId;

      node = closedList.find((i) => i.id == id);
    }

    return path;
  }

  private async drawPath(board: Cube[][], path: number[][], ms: number) {
    for (let i = 0; i < path.length; i++) {
      const [r, c] = [path[i][0], path[i][1]];

      if (ms > 0) await timeout(25);

      board[r][c].marker = true;
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
