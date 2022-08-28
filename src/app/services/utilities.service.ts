import { Injectable } from '@angular/core';
import { AStarService } from '../algoServices/pathServices/a-star.service';
import { BFSService } from '../algoServices/pathServices/bfs.service';
import { DFSService } from '../algoServices/pathServices/dfs.service';
import { DijkstraService } from '../algoServices/pathServices/dijkstra.service';
import { timeout } from '../helpers/awaitTimeout';
import { generateAdjencencyList } from '../helpers/generateAdjencencyList';
import { generateBoard } from '../helpers/generateBoard';
import { getBoardInitials } from '../helpers/getBoardInitials';
import { Cube, Initials } from '../interfaces/iterfaces';
import { VariablesService } from './variables.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private _variablesService: VariablesService,
    private _BFSservice: BFSService,
    private _DFSservice: DFSService,
    private _dijkstraService: DijkstraService,
    private _aStarService: AStarService
  ) {}

  resetBoard(boardInitals: Initials) {
    const initials = getBoardInitials(boardInitals.rows, boardInitals.cols);
    const board = generateBoard(initials);
    const adjencencyList = generateAdjencencyList(
      boardInitals.rows,
      boardInitals.cols
    );
    this._variablesService.setDragForPath(false);

    this._variablesService.setBoard(board);

    this._variablesService.setAdjencency(adjencencyList);

    this._variablesService.setInitials(initials);
  }

  clearBoard(board: Cube[][]) {
    board.map((row) =>
      row.map((cube) => {
        cube.isBlock = false;
        cube.visited = false;
        cube.marker = false;
        cube.weight = 1;
      })
    );
    this._variablesService.setDragForPath(false);

    this._variablesService.setBoard(board);
  }

  clearPath(board: Cube[][]) {
    board.map((row) =>
      row.map((cube) => {
        cube.visited = false;
        cube.marker = false;
        cube.weight = 1;
      })
    );

    this._variablesService.setDragForPath(false);

    this._variablesService.setBoard(board);
  }

  clearBlocks(board: Cube[][]) {
    board.map((row) =>
      row.map((cube) => {
        cube.isBlock = false;
      })
    );

    this._variablesService.setBoard(board);
  }

  clearVisited(board: Cube[][]) {
    board.map((row) =>
      row.map((cube) => {
        cube.visited = false;
      })
    );

    this._variablesService.setBoard(board);
  }

  clearMarker(board: Cube[][]) {
    board.map((row) =>
      row.map((cube) => {
        cube.marker = false;
      })
    );

    this._variablesService.setBoard(board);
  }

  clearWeights(board: Cube[][]) {
    board.map((row) =>
      row.map((cube) => {
        cube.weight = 1;
      })
    );

    this._variablesService.setBoard(board);
  }

  async visualizePath(
    board: Cube[][],
    initials: Initials,
    curPathAlgo: string,
    ms: number
  ) {
    const [sr, sc] = [initials.startNodeRow, initials.startNodeCol];
    const [er, ec] = [initials.endNodeRow, initials.endNodeCol];
    const [rows, cols] = [initials.rows, initials.cols];

    const startNode = board[sr][sc];
    const endNode = board[er][ec];

    if (ms > 0) this._variablesService.setIsVisualize(true);

    let delay = 0;
    let [visitList, path] = [[], []];

    this.clearMarker(board);
    this.clearVisited(board);
    switch (curPathAlgo) {
      case 'BFS!':
        [visitList, path] = this._BFSservice.BFS(board, startNode, endNode, ms);
        delay = this.drawVisited(board, visitList, ms);
        await this.drawPath(board, path, delay, ms);
        this._variablesService.setIsVisualize(false);
        break;
      case 'DFS!':
        const DFSVariables = { r: sr, c: sc, er, ec, ms, rows, cols, p: 0 };
        await this._DFSservice.DFS(board, DFSVariables, []);
        this._variablesService.setIsVisualize(false);
        break;
      case 'Dijkstra!':
        [visitList, path] = this._dijkstraService.dijkstra(
          board,
          startNode,
          endNode,
          ms
        );
        delay = this.drawVisited(board, visitList, ms);
        await this.drawPath(board, path, delay, ms);
        this._variablesService.setIsVisualize(false);
        break;
      case 'A*!':
        await this._aStarService.aStar(board, startNode, endNode, ms);
        this._variablesService.setIsVisualize(false);
        break;
      default:
        break;
    }
  }

  private drawVisited(board: Cube[][], visitList: number[][], ms: number) {
    let delay = 0;

    for (let i = 1; i < visitList.length; i++) {
      const [row, col] = [visitList[i][0], visitList[i][1]];

      if (ms <= 0) {
        board[row][col].visited = true;
        this._variablesService.setBoard(board);
        continue;
      }

      setTimeout(() => {
        board[row][col].visited = true;
        this._variablesService.setBoard(board);
      }, (delay += 1));
    }

    return delay;
  }

  private async drawPath(
    board: Cube[][],
    path: number[][],
    delay: number,
    ms: number
  ) {
    let delay2 = delay;

    await timeout(delay);
    for (let i = 1; i < path.length; i++) {
      const [row, col] = [path[i][0], path[i][1]];

      if (ms > 0) await timeout(25);

      board[row][col].marker = true;
      this._variablesService.setBoard(board);

      // setTimeout(() => {
      //   board[row][col].marker = true;
      //   this._variablesService.setBoard(board);

      //   if (i + 1 == path.length) this._variablesService.setIsVisualize(false);
      // }, (delay += 25));
    }
  }
}
