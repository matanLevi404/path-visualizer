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

  board: Cube[][];
  adjencencyList: Edge[];

  initials: Initials;

  isVisualize: boolean = false;

  ngOnInit(): void {
    this._variablesService.board$.subscribe((board) => {
      this.board = board;
    });

    this._variablesService.adjencencyList$.subscribe((adjencencyList) => {
      this.adjencencyList = adjencencyList;
    });

    this._variablesService.initials$.subscribe((initials) => {
      this.initials = initials;
    });

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
    this._utilities.clearBoard(this.board);
    this._variablesService.setIsVisualize(true);
    await this._recursiveDivisionService.recursiveDivision(
      this.board,
      this.initials
    );
    this._variablesService.setIsVisualize(false);
  }

  async kruskal() {
    this._utilities.clearBoard(this.board);
    this._variablesService.setIsVisualize(true);
    await this._kruskalService.kruskal(this.board, this.adjencencyList);
    this._variablesService.setIsVisualize(false);
  }

  prim() {
    const [sr, sc] = [this.initials.startNodeRow, this.initials.startNodeCol];
    const startNode = this.board[sr][sc];

    this._utilities.clearBoard(this.board);
    this._variablesService.setIsVisualize(true);
    this._primService.prim(this.board, startNode);
    this._variablesService.setIsVisualize(false);
  }

  weightMaze() {
    this._utilities.clearBoard(this.board);
    this.board = weightBoard(this.board);
    this._variablesService.setBoard(this.board);
  }
}
