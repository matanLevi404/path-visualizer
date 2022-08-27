import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube, Initials } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

interface HelperVariables {
  sr: number; // start row
  er: number; // end row
  sc: number; // start col
  ec: number; //end col
  rows: number; // number of rows
  cols: number; //number of columns
}

@Injectable({
  providedIn: 'root',
})
export class RecursiveDivisionService {
  constructor(private _variablesService: VariablesService) {}

  delay = 0;

  async recursiveDivision(board: Cube[][], initials: Initials) {
    await this.drawOuterWalls(board, initials);

    const [rows, cols] = [initials.rows, initials.cols];

    const helperVariables: HelperVariables = {
      sr: 1,
      er: rows - 2,
      sc: 1,
      ec: cols - 2,
      rows,
      cols,
    };

    await this.divisionHelper(board, 'horizantal', helperVariables);
  }

  private async divisionHelper(
    board: Cube[][],
    orientation: string,
    helperVariables: HelperVariables
  ) {
    let { sr, er, sc, ec, rows, cols } = { ...helperVariables };

    if (orientation == 'vertical') {
      if (er - sr < 2) return;

      let randWall = Math.floor(this.randomNumber(sc, ec) / 2) * 2;
      let randPass = Math.floor(this.randomNumber(sr, er) / 2) * 2 + 1;

      await this.verticalDraw(sr, er, randPass, randWall, board, rows, cols);

      helperVariables = { sr, er, sc, ec: randWall - 1, rows, cols };
      orientation = this.chooseOrientation(sr, er, sc, ec);

      await this.divisionHelper(board, orientation, helperVariables);

      helperVariables = { sr, er, sc: randWall + 1, ec, rows, cols };
      orientation = this.chooseOrientation(sr, er, sc, ec);

      await this.divisionHelper(board, orientation, helperVariables);
    } else if (orientation == 'horizantal') {
      if (ec - sc < 2) return;

      let randWall = Math.floor(this.randomNumber(sr, er) / 2) * 2;
      let randPass = Math.floor(this.randomNumber(sc, ec) / 2) * 2 + 1;

      await this.horizantalDraw(sc, ec, randPass, randWall, board, rows, cols);

      helperVariables = { sr, er: randWall - 1, sc, ec, rows, cols };
      orientation = this.chooseOrientation(sr, er, sc, ec);

      await this.divisionHelper(board, orientation, helperVariables);

      helperVariables = { sr: randWall + 1, er, sc, ec, rows, cols };
      orientation = this.chooseOrientation(sr, er, sc, ec);

      await this.divisionHelper(board, orientation, helperVariables);
    }
  }

  private async drawOuterWalls(board: Cube[][], initials: Initials) {
    const [rows, cols] = [initials.rows, initials.cols];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cube = board[i][j];
        const [row, col] = [cube.row, cube.col];
        if (row == 0 || row >= rows - 1 || col == 0 || col >= cols - 1) {
          await timeout(5);
          this.paintCube(board, cube);
        }
      }
    }
  }

  private paintCube(board: Cube[][], cube: Cube) {
    const [row, col] = [cube.row, cube.col];
    board[row][col].isBlock = true;
    this._variablesService.setBoard(board);
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private chooseOrientation(startRow, endRow, startCol, endCol) {
    if (endCol - startCol > endRow - startRow) return 'vertical';
    else return 'horizantal';
  }

  private async verticalDraw(
    sr: number,
    er: number,
    pass: number,
    wall: number,
    board: Cube[][],
    rows: number,
    cols: number
  ) {
    for (let i = sr; i <= er; i++) {
      await timeout(5);
      if (i != pass) board[i][wall].isBlock = true;
      else if (this.checkLimits(rows, cols, pass, wall))
        board[i][wall].isBlock = true;
      else board[i][wall].isBlock = false;
      this._variablesService.setBoard(board);
    }
  }

  private async horizantalDraw(
    sc: number,
    ec: number,
    pass: number,
    wall: number,
    board: Cube[][],
    rows: number,
    cols: number
  ) {
    for (let i = sc; i <= ec; i++) {
      await timeout(5);
      if (i != pass) board[wall][i].isBlock = true;
      else if (this.checkLimits(rows, cols, wall, pass))
        board[wall][i].isBlock = true;
      else board[wall][i].isBlock = false;
      this._variablesService.setBoard(board);
    }
  }

  private checkLimits(rows: number, cols: number, pass: number, wall: number) {
    if (pass == 0 || pass >= rows - 1 || wall == 0 || wall >= cols - 1)
      return true;
    return false;
  }
}
