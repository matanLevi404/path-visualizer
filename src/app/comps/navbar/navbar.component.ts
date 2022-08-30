import { Component, OnInit } from '@angular/core';
import { KruskalService } from 'src/app/algoServices/mazeServices/kruskal.service';
import { PrimService } from 'src/app/algoServices/mazeServices/prim.service';
import { RecursiveDivisionService } from 'src/app/algoServices/mazeServices/recursive-division.service';
import { weightBoard } from 'src/app/helpers/generateWeightBoard';
import { Cube, Edge, Initials } from 'src/app/interfaces/iterfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  curMazeAlgo: string = '';
  curPathAlgo: string = 'BFS!';

  board: Cube[][];
  adjencencyList: Edge[];

  initials: Initials;

  isVisualize: boolean = false;

  pathWeight: number;

  manualWeight: number;

  mazeAlgorithems = [
    { value: 'recursiveDivision', viewValue: 'RecursiveDivision' },
    { value: 'kruskal', viewValue: 'Kruskal' },
    { value: 'prim', viewValue: 'Prim' },
    { value: 'weightMaze', viewValue: 'Weight maze' },
  ];

  pathAlgorithms = [
    { value: 'DFS', viewValue: 'DFS' },
    { value: 'BFS', viewValue: 'BFS' },
    { value: 'djikstra', viewValue: 'Djikstra' },
    { value: 'aStar', viewValue: 'A*' },
  ];

  constructor(
    private _variablesService: VariablesService,
    private _utilities: UtilitiesService,
    private _recursiveDivisionService: RecursiveDivisionService,
    private _kruskalService: KruskalService,
    private _primService: PrimService
  ) {}

  ngOnInit(): void {
    this._variablesService.setCurMazeAlgo(this.curMazeAlgo);
    this._variablesService.setCurPathAlgo(this.curPathAlgo);
    this._variablesService.setIsVisualize(this.isVisualize);

    this._variablesService.board$.subscribe((board) => {
      this.board = board;
    });

    this._variablesService.adjencencyList$.subscribe((adjencencyList) => {
      this.adjencencyList = adjencencyList;
    });

    this._variablesService.initials$.subscribe((initials) => {
      console.log(initials, 'from navbar');
      this.initials = initials;
    });

    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });

    this._variablesService.pathWeight$.subscribe((pathWeight) => {
      this.pathWeight = pathWeight;
    });

    this._variablesService.manualPathWeight$.subscribe((manulaWeight) => {
      this.manualWeight = manulaWeight;
    });

    this._variablesService.curPathAlgo$.subscribe((curPathAlgo) => {
      this.curPathAlgo = curPathAlgo;
    });
  }

  setCurPathAlgo() {
    this._variablesService.setCurPathAlgo(this.curPathAlgo);
  }

  resetBoard() {
    this._utilities.resetBoard(this.initials);
  }

  clearBoard() {
    this._variablesService.setDragForPath(false);
    this._utilities.clearBoard(this.board);
  }

  clearPath() {
    this._utilities.clearPath(this.board);
  }

  async visualizePath() {
    this._variablesService.setDragForPath(true);

    let initials = this._variablesService._initials.getValue();

    await this._utilities.visualizePath(
      this.board,
      initials,
      this.curPathAlgo,
      25
    );
  }
}

// async seCurMazeAlgo() {
//   this._variablesService.setCurMazeAlgo(this.curMazeAlgo);
//   this._variablesService.setIsVisualize(true);

//   const [sr, sc] = [this.initials.startNodeRow, this.initials.startNodeCol];
//   const startNode = this.board[sr][sc];

//   this._utilities.clearBoard(this.board);

//   switch (this.curMazeAlgo) {
//     case 'recursiveDivision':
//       await this._recursiveDivisionService.recursiveDivision(
//         this.board,
//         this.initials
//       );
//       this._variablesService.setIsVisualize(false);
//       break;
//     case 'kruskal':
//       await this._kruskalService.kruskal(this.board, this.adjencencyList);
//       this._variablesService.setIsVisualize(false);
//       break;
//     case 'prim':
//       await this._primService.prim(this.board, startNode);
//       this._variablesService.setIsVisualize(false);
//       break;
//     case 'weightMaze':
//       this._variablesService.setIsVisualize(false);
//       this.board = weightBoard(this.board);
//       this._variablesService.setBoard(this.board);
//       break;
//     default:
//       break;
//   }
// }
