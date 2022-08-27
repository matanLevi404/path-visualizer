import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

interface SptSetItem {
  isVisit: boolean;
  cords: number[];
  parent: number[];
}

@Injectable({
  providedIn: 'root',
})
export class DijkstraService {
  constructor(private _variablesService: VariablesService) {}

  async dijkstra(board: Cube[][], node: Cube, endNode: Cube, ms: number) {
    const [rows, cols] = [board.length, board[0].length];

    let v = 0;

    let endId = -1;

    let dist: number[] = [];
    let sptSet: SptSetItem[] = [];
    let findEnd: boolean = false;

    const neighbors = [
      [0, 1],
      [-1, 0],
      [1, 0],
      [0, -1],
    ];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        dist[v] = Number.MAX_VALUE;
        sptSet[v] = { isVisit: false, cords: [i, j], parent: [i, j] };
        v += 1;
      }
    }
    dist[node.id] = 0;

    while (!findEnd) {
      const u = this.minDist(dist, sptSet);

      const [r, c] = [sptSet[u].cords[0], sptSet[u].cords[1]];

      sptSet[u].isVisit = true;

      if (ms > 0) await timeout(0);

      board[r][c].visited = true;
      this._variablesService.setBoard(board);

      for (let i = 0; i < neighbors.length; i++) {
        let [n_r, n_c] = [r + neighbors[i][0], c + neighbors[i][1]];

        if (!this.checkLimits(n_r, n_c, rows, cols)) continue;

        const neighborNode = board[n_r][n_c];
        const n_id = board[n_r][n_c].id;

        const cost = board[n_r][n_c].weight;

        if (sptSet[n_id].isVisit || neighborNode.isBlock) continue;

        if (ms > 0) await timeout(0);

        board[n_r][n_c].visited = true;
        this._variablesService.setBoard(board);

        if (n_r == endNode.row && n_c == endNode.col) {
          sptSet[n_id].parent = sptSet[u].cords;
          endId = n_id;
          findEnd = true;
        }

        if (dist[u] + cost < dist[n_id]) {
          dist[n_id] = dist[u] + cost;
          sptSet[n_id].parent = sptSet[u].cords;
        }
      }
    }

    let path = this.findPath(board, sptSet, node.id, endId);

    path.push(sptSet[endId].cords);

    path.unshift([node.row, node.col]);

    await this.drawPath(board, path, ms);
  }

  private findPath(
    board: Cube[][],
    sptSet: SptSetItem[],
    startId: number,
    id: number
  ) {
    let path = [];

    while (startId != id) {
      path.unshift(sptSet[id].parent);

      const [p_r, p_c] = [sptSet[id].parent[0], sptSet[id].parent[1]];

      const parentId = board[p_r][p_c].id;

      id = parentId;
    }

    return path;
  }

  private async drawPath(board: Cube[][], path: number[][], ms: number) {
    for (let i = 0; i < path.length; i++) {
      const [row, col] = [path[i][0], path[i][1]];

      if (ms > 0) await timeout(25);

      board[row][col].marker = true;
      this._variablesService.setBoard(board);
    }
  }

  private minDist(dist: number[], sptSet) {
    let minDist = Number.MAX_VALUE;
    let minInd = -1;

    for (let i = 0; i < dist.length; i++) {
      if (sptSet[i].isVisit == false && dist[i] <= minDist) {
        minDist = dist[i];
        minInd = i;
      }
    }

    return minInd;
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
