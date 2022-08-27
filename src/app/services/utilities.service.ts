import { Injectable } from '@angular/core';
import { AStarService } from '../algoServices/pathServices/a-star.service';
import { BFSService } from '../algoServices/pathServices/bfs.service';
import { DFSService } from '../algoServices/pathServices/dfs.service';
import { DijkstraService } from '../algoServices/pathServices/dijkstra.service';
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

    this._variablesService.setIsVisualize(true);

    this.clearMarker(board);
    this.clearVisited(board);
    switch (curPathAlgo) {
      case 'BFS!':
        await this._BFSservice.BFS(board, startNode, endNode, ms);
        this._variablesService.setIsVisualize(false);

        break;
      case 'DFS!':
        const DFSVariables = { r: sr, c: sc, er, ec, ms, rows, cols, p: 0 };
        await this._DFSservice.DFS(board, DFSVariables, []);
        this._variablesService.setIsVisualize(false);
        break;
      case 'Dijkstra!':
        await this._dijkstraService.dijkstra(board, startNode, endNode, ms);
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
}
