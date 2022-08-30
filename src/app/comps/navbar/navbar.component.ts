import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  curPathAlgo: string = 'BFS!';

  isVisualize: boolean = false;

  constructor(
    private _variablesService: VariablesService,
    private _utilities: UtilitiesService
  ) {}

  ngOnInit(): void {
    this._variablesService.setCurPathAlgo(this.curPathAlgo);
    this._variablesService.setIsVisualize(this.isVisualize);

    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });

    this._variablesService.curPathAlgo$.subscribe((curPathAlgo) => {
      this.curPathAlgo = curPathAlgo;
    });
  }

  setCurPathAlgo() {
    this._variablesService.setCurPathAlgo(this.curPathAlgo);
  }

  resetBoard() {
    let initials = this._variablesService._initials.getValue();
    this._utilities.resetBoard(initials);
  }

  clearBoard() {
    let board = this._variablesService._board.getValue();
    this._variablesService.setDragForPath(false);
    this._utilities.clearBoard(board);
  }

  clearPath() {
    let board = this._variablesService._board.getValue();
    this._utilities.clearPath(board);
  }

  async visualizePath() {
    this._variablesService.setDragForPath(true);

    let board = this._variablesService._board.getValue();
    let initials = this._variablesService._initials.getValue();
    let curPathAlgo = this._variablesService._curPathAlgo.getValue();

    await this._utilities.visualizePath(board, initials, curPathAlgo, 1);
  }
}
