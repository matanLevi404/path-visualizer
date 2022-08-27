import { VariableBinding } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube, Edge } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

@Injectable({
  providedIn: 'root',
})
export class PrimService {
  constructor(private _variablesService: VariablesService) {}

  async prim(board: Cube[][], node: Cube) {
    const v = this.paintOddWalls(board);
    const [rows, cols] = [board.length, board[0].length];

    let forntier: number[] = [node.id];
    let e: number = 0;

    let vertex: Edge[] = [];

    const neighbors = [
      [-2, 0],
      [0, 2],
      [2, 0],
      [0, -2],
    ];

    this.blackenBorad(board);

    let [r, c] = [node.row, node.col];

    await timeout(5);
    board[r][c].isBlock = false;
    this._variablesService.setBoard(board);

    while (e < v - 1) {
      for (let i = 0; i < neighbors.length; i++) {
        const [n_r, n_c] = [r + neighbors[i][0], c + neighbors[i][1]];

        if (!this.checkLimits(n_r, n_c, rows, cols)) continue;

        const neighborNode = board[n_r][n_c];

        if (forntier.find((id) => neighborNode.id == id)) continue;

        forntier.push(neighborNode.id);
        const newEdge = {
          node: [r, c],
          neighborNode: [n_r, n_c],
          weight: Math.floor(Math.random() * 736) + 1,
        };
        vertex.push(newEdge);

        await timeout(5);
        board[n_r][n_c].isBlock = false;
        board[n_r][n_c].marker = true;
        this._variablesService.setBoard(board);
      }

      await timeout(5);
      vertex.sort(function (a, b) {
        return a.weight - b.weight;
      });

      vertex[0].weight = 1000;
      const newNode = vertex[0].node;
      const n_newNode = vertex[0].neighborNode;

      [r, c] = [newNode[0], newNode[1]];
      const [n_r, n_c] = [n_newNode[0], n_newNode[1]];

      await this.step(board, r, c, n_r, n_c);

      [r, c] = [n_r, n_c];

      e += 1;
    }
  }

  private blackenBorad(board: Cube[][]) {
    board.map((row) => row.map((cube) => (cube.isBlock = true)));
  }

  private async step(
    board: Cube[][],
    r: number,
    c: number,
    n_r: number,
    n_c: number
  ) {
    await timeout(5);
    board[(n_r + r) / 2][(n_c + c) / 2].isBlock = false;
    this._variablesService.setBoard(board);

    await timeout(5);
    board[n_r][n_c].marker = false;
    this._variablesService.setBoard(board);
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

  private paintOddWalls(board: Cube[][]) {
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (i % 2 != 0 && j % 2 != 0) {
          counter += 1;
        }
      }
    }
    return counter;
  }
}
