import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AStarService } from 'src/app/algoServices/pathServices/a-star.service';
import { BFSService } from 'src/app/algoServices/pathServices/bfs.service';
import { DFSService } from 'src/app/algoServices/pathServices/dfs.service';
import { DijkstraService } from 'src/app/algoServices/pathServices/dijkstra.service';
import { Cube, Initials } from 'src/app/interfaces/iterfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-path-algo-menu',
  templateUrl: './path-algo-menu.component.html',
  styleUrls: ['./path-algo-menu.component.scss'],
})
export class PathAlgoMenuComponent implements OnInit {
  active: boolean = false;

  board: Cube[][];

  initials: Initials;

  isVisualize: boolean = false;

  curPathAlgo: string;

  constructor(
    private _renderer: Renderer2,
    private _variablesService: VariablesService,
    private _utilities: UtilitiesService,
    private _dijkstraService: DijkstraService,
    private _BFSservice: BFSService,
    private _DFSservice: DFSService,
    private _aStarService: AStarService
  ) {}

  ngOnInit(): void {
    this._variablesService.board$.subscribe((board) => {
      this.board = board;
    });

    this._variablesService.initials$.subscribe((initials) => {
      this.initials = initials;
    });

    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });

    this._variablesService.curPathAlgo$.subscribe((curPathAlgo) => {
      this.curPathAlgo = curPathAlgo;
    });
  }

  @HostListener('click')
  do() {
    this._renderer.listen('window', 'click', (e: Event) => {
      if (!(e.target as Element).className.includes('pathMenuBtn')) {
        this.active = false;
      }
    });
  }

  goActive() {
    this.active = true;
  }

  async dijkstra() {
    this._variablesService.setCurPathAlgo('Dijkstra!');
    // this._utilities.clearPath(this.board);

    // const [sr, sc] = [this.initials.startNodeRow, this.initials.startNodeCol];
    // const startNode = this.board[sr][sc];

    // this._variablesService.setIsVisualize(true);

    // await this._dijkstraService.dijkstra(this.board, startNode);

    // this._variablesService.setIsVisualize(false);
  }

  async BFS() {
    this._variablesService.setCurPathAlgo('BFS!');
    // this._utilities.clearPath(this.board);

    // const [sr, sc] = [this.initials.startNodeRow, this.initials.startNodeCol];
    // const startNode = this.board[sr][sc];

    // this._variablesService.setIsVisualize(true);

    // await this._BFSservice.BFS(this.board, startNode, 25);

    // this._variablesService.setIsVisualize(false);
  }

  async DFS() {
    this._variablesService.setCurPathAlgo('DFS!');
    // this._utilities.clearPath(this.board);

    // const [sr, sc] = [this.initials.startNodeRow, this.initials.startNodeCol];
    // const [er, ec] = [this.initials.endNodeRow, this.initials.endNodeCol];
    // const [rows, cols] = [this.initials.rows, this.initials.cols];

    // this._variablesService.setIsVisualize(true);

    // const DFSVariables = { r: sr, c: sc, er, ec, ms: 25, rows, cols, p: 0 };

    // await this._DFSservice.DFS(this.board, DFSVariables, []);

    // this._variablesService.setIsVisualize(false);
  }

  async aStar() {
    this._variablesService.setCurPathAlgo('A*!');
    // this._utilities.clearPath(this.board);
    // const [sr, sc] = [this.initials.startNodeRow, this.initials.startNodeCol];
    // const [er, ec] = [this.initials.endNodeRow, this.initials.endNodeCol];
    // const startNode = this.board[sr][sc];
    // const endNode = this.board[er][ec];
    // this._variablesService.setIsVisualize(true);
    // await this._aStarService.aStar(this.board, startNode, endNode);
    // this._variablesService.setIsVisualize(false);
  }
}
