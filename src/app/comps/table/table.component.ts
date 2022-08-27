import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { dropEvent } from 'src/app/helpers/dropEvent';
import { generateAdjencencyList } from 'src/app/helpers/generateAdjencencyList';
import { generateBoard } from 'src/app/helpers/generateBoard';
import { getBoardInitials } from 'src/app/helpers/getBoardInitials';
import { Cube, Edge, Initials } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  board: Cube[][] = [];
  adjencencyList: Edge[] = [];

  initials: Initials;

  mouseDown: boolean = false;

  isVisualize: boolean;

  manualWeight: number;

  localSession: string = 'localSession';

  @ViewChild('table') divView: ElementRef;

  constructor(
    private _variablesService: VariablesService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._variablesService.board$.subscribe((board) => {
      this.board = board;
    });

    this._variablesService.adjencencyList$.subscribe((adjencencyList) => {
      this.adjencencyList = adjencencyList;
    });

    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });

    this._variablesService.manualPathWeight$.subscribe((manualWeight) => {
      this.manualWeight = manualWeight;
    });
  }

  ngAfterViewInit() {
    this.reset();
    this._changeDetectorRef.detectChanges();
  }

  reset() {
    let rows: number;
    let cols: number;

    const checker = localStorage.getItem(this.localSession);

    if (!checker) {
      rows = Math.floor(this.divView.nativeElement.offsetHeight / 25);
      cols = Math.floor(this.divView.nativeElement.offsetWidth / 25);
      localStorage.setItem(this.localSession, JSON.stringify({ rows, cols }));
    } else {
      const savedDimensions = JSON.parse(checker);
      rows = savedDimensions.rows;
      cols = savedDimensions.cols;
    }

    const boardInitals = getBoardInitials(rows, cols);
    this.board = generateBoard(boardInitals);
    this.adjencencyList = generateAdjencencyList(
      boardInitals.rows,
      boardInitals.cols
    );

    this.initials = boardInitals;

    this._variablesService.setBoard(this.board);

    this._variablesService.setAdjencency(this.adjencencyList);

    this._variablesService.setInitials(boardInitals);
  }

  drop(event: CdkDragDrop<Cube>) {
    [this.board, this.initials] = dropEvent(event, this.board, this.initials);

    this._variablesService.setInitials(this.initials);

    this._variablesService.setBoard(this.board);
  }

  onMouseDown(cube: Cube) {
    if (cube.startNode || cube.endNode || this.isVisualize) return;
    this.mouseDown = true;
    const [row, col] = [cube.row, cube.col];

    this.board[row][col].visited = false;
    this.board[row][col].marker = false;

    this.board[row][col].isBlock = !this.board[row][col].isBlock;

    this._variablesService.setBoard(this.board);
  }

  onMouseEnter(cube: Cube) {
    if (!this.mouseDown || cube.startNode || cube.endNode || this.isVisualize)
      return;
    const [row, col] = [cube.row, cube.col];

    this.board[row][col].visited = false;
    this.board[row][col].marker = false;

    this.board[row][col].isBlock = !this.board[row][col].isBlock;

    this._variablesService.setBoard(this.board);
  }

  onMouseUp() {
    this.mouseDown = false;
  }
}
