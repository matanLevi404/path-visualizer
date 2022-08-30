import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { KruskalService } from 'src/app/algoServices/mazeServices/kruskal.service';
import { PrimService } from 'src/app/algoServices/mazeServices/prim.service';
import { RecursiveDivisionService } from 'src/app/algoServices/mazeServices/recursive-division.service';
import { weightBoard } from 'src/app/helpers/generateWeightBoard';
import { Cube, Edge, Initials } from 'src/app/interfaces/iterfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-maze-algo-menu',
  templateUrl: './maze-algo-menu.component.html',
  styleUrls: ['./maze-algo-menu.component.scss'],
})
export class MazeAlgoMenuComponent implements OnInit {
  constructor(
    private _renderer: Renderer2,
    private _variablesService: VariablesService,
    private _utilities: UtilitiesService,
    private _recursiveDivisionService: RecursiveDivisionService,
    private _kruskalService: KruskalService,
    private _primService: PrimService
  ) {}

  active: boolean = false;

  isVisualize: boolean = false;

  ngOnInit(): void {
    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });
  }

  @HostListener('click')
  do() {
    this._renderer.listen('window', 'click', (e: Event) => {
      if (!(e.target as Element).className.includes('mazeMenuBtn')) {
        this.active = false;
      }
    });
  }

  goActive() {
    this.active = true;
  }

  async recursiveDivision() {
    let board = this._variablesService._board.getValue();
    let initials = this._variablesService._initials.getValue();
    this._utilities.clearBoard(board);
    this._variablesService.setIsVisualize(true);
    await this._recursiveDivisionService.recursiveDivision(board, initials);
    this._variablesService.setIsVisualize(false);
  }

  async kruskal() {
    let board = this._variablesService._board.getValue();
    let adjencencyList = this._variablesService._adjencencyList.getValue();
    this._utilities.clearBoard(board);
    this._variablesService.setIsVisualize(true);
    await this._kruskalService.kruskal(board, adjencencyList);
    this._variablesService.setIsVisualize(false);
  }

  prim() {
    let board = this._variablesService._board.getValue();
    let initials = this._variablesService._initials.getValue();

    const [sr, sc] = [initials.startNodeRow, initials.startNodeCol];
    const startNode = board[sr][sc];

    this._utilities.clearBoard(board);
    this._variablesService.setIsVisualize(true);
    this._primService.prim(board, startNode);
    this._variablesService.setIsVisualize(false);
  }

  weightMaze() {
    let board = this._variablesService._board.getValue();
    this._utilities.clearBoard(board);
    board = weightBoard(board);
    this._variablesService.setBoard(board);
  }
}
