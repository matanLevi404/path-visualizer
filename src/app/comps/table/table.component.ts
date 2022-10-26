import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
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
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class TableComponent implements OnInit, AfterViewInit {
  board: Cube[][] = [];

  mouseDown: boolean = false;

  isVisualize: boolean;

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

    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });
  }

  ngAfterViewInit() {
    let height: number = this.divView.nativeElement.offsetHeight;
    let width: number = this.divView.nativeElement.offsetWidth;
    let cubeSize: number = 25;

    let windowWidth = window.innerWidth;

    if (windowWidth > 0 && windowWidth <= 480) cubeSize = 10;
    if (windowWidth > 480 && windowWidth <= 766) cubeSize = 15;
    if (windowWidth > 766 && windowWidth <= 1023) cubeSize = 20;
    if (windowWidth > 1023 && windowWidth <= 1200) cubeSize = 25;

    this.reset(height, width, cubeSize);
    this._changeDetectorRef.detectChanges();
  }

  onResize(event: any) {
    let windowHeight = event.target.innerHeight;
    let windowWidth = event.target.innerWidth;
    let height: number = this.divView.nativeElement.offsetHeight;
    let width: number = this.divView.nativeElement.offsetWidth;
    let cubeSize: number = 25;

    if (windowWidth > 0 && windowWidth <= 480) cubeSize = 10;
    if (windowWidth > 480 && windowWidth <= 766) cubeSize = 15;
    if (windowWidth > 766 && windowWidth <= 1023) cubeSize = 20;
    if (windowWidth > 1023 && windowWidth <= 1200) cubeSize = 25;

    console.log('i ws excute');

    this.reset(height, width, cubeSize);
  }

  reset(height: number, width: number, cubeSize: number) {
    let rows: number;
    let cols: number;

    const checker = localStorage.getItem(this.localSession);
    rows = Math.floor(height / cubeSize);
    cols = Math.floor(width / cubeSize);
    localStorage.setItem(this.localSession, JSON.stringify({ rows, cols }));

    // if (!checker) {
    //   rows = Math.floor(this.divView.nativeElement.offsetHeight / 25);
    //   cols = Math.floor(this.divView.nativeElement.offsetWidth / 25);
    //   localStorage.setItem(this.localSession, JSON.stringify({ rows, cols }));
    // } else {
    //   const savedDimensions = JSON.parse(checker);
    //   rows = savedDimensions.rows;
    //   cols = savedDimensions.cols;
    // }

    const boardInitals = getBoardInitials(rows, cols);
    const board = generateBoard(boardInitals);
    const adjencencyList = generateAdjencencyList(
      boardInitals.rows,
      boardInitals.cols
    );

    this._variablesService.setBoard(board);

    this._variablesService.setAdjencency(adjencencyList);

    this._variablesService.setInitials(boardInitals);
  }

  drop(event: CdkDragDrop<Cube>) {
    const initialsValue = this._variablesService._initials.getValue();
    const boardValue = this._variablesService._board.getValue();
    const [board, initials] = dropEvent(event, boardValue, initialsValue);

    this._variablesService.setInitials(initials);

    this._variablesService.setBoard(board);
  }

  onMouseDown(cube: Cube) {
    let board = this._variablesService._board.getValue();

    if (cube.startNode || cube.endNode || this.isVisualize) return;
    this.mouseDown = true;
    const [row, col] = [cube.row, cube.col];

    board[row][col].visited = false;
    board[row][col].marker = false;
    board[row][col].visitNoAnimate = false;
    board[row][col].markerNoAnimate = false;

    board[row][col].isBlock = !board[row][col].isBlock;

    this._variablesService.setBoard(board);
  }

  onMouseEnter(cube: Cube) {
    let board = this._variablesService._board.getValue();

    if (!this.mouseDown || cube.startNode || cube.endNode || this.isVisualize)
      return;
    const [row, col] = [cube.row, cube.col];

    board[row][col].visited = false;
    board[row][col].marker = false;
    board[row][col].visitNoAnimate = false;
    board[row][col].markerNoAnimate = false;

    board[row][col].isBlock = !board[row][col].isBlock;

    this._variablesService.setBoard(board);
  }

  onMouseUp() {
    this.mouseDown = false;
  }
}
