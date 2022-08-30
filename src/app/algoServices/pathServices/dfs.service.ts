import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

interface DFSVariables {
  r: number; // node row
  c: number; // node col
  er: number; // node end row
  ec: number; // node end col
  ms: number; // timeout in milisecons
  rows: number; // num of rows
  cols: number; // num of columns
  p: number; // place in result in order to splice result array
}

@Injectable({
  providedIn: 'root',
})
export class DFSService {
  constructor(private _variablesService: VariablesService) {}

  async DFS(board: Cube[][], DFSVariables: DFSVariables, result: number[][]) {
    let { r, c, er, ec, ms, rows, cols, p } = { ...DFSVariables };

    if (r == er && c == ec) {
      console.log('found target !!');
      // await this.drawPath(board, result, ms);
      return true;
    }

    let returnedValue: boolean;

    const neighbors = [
      [-1, 0], // up
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
    ];

    for (let i = 0; i < neighbors.length; i++) {
      const n_r = r + neighbors[i][0]; // n_r => neighbor row
      const n_c = c + neighbors[i][1]; // n_c => neighbor col

      if (this.checkLimits(n_r, n_c, rows, cols)) {
        if (this.isCubeValid(board, n_r, n_c, returnedValue)) {
          if (ms > 0) await timeout(ms);

          p += 1;

          result.push([n_r, n_c]);
          board[n_r][n_c].visited = true;
          this._variablesService.setBoard(board);

          DFSVariables = { r: n_r, c: n_c, er, ec, ms, rows, cols, p };

          await this.DFS(board, DFSVariables, result).then(
            (value) => (returnedValue = value)
          );

          p -= 1;

          result.splice(p, 1);
        }
      }
    }

    return returnedValue;
  }

  private checkLimits(r: number, c: number, rows: number, cols: number) {
    if (r >= 0 && r < rows && c >= 0 && c < cols) return true;
    return false;
  }

  private isCubeValid(
    board: Cube[][],
    r: number,
    c: number,
    returnedValue: boolean
  ) {
    if (!board[r][c].visited && !board[r][c].isBlock && !returnedValue)
      return true;
    else return false;
  }

  private async drawPath(board: Cube[][], result: number[][], ms: number) {
    for (let i = 0; i < result.length; i++) {
      const [r, c] = [result[i][0], result[i][1]];

      if (ms > 0) await timeout(ms);

      board[r][c].marker = true;
      this._variablesService.setBoard(board);
    }
  }
}
