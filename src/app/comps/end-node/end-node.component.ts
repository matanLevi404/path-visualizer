import { CdkDragEnter } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { dargEnterEvent } from 'src/app/helpers/dragEnterEvent';
import { Cube, Initials } from 'src/app/interfaces/iterfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';
// import { structuredClone } from '@ungap/structured-clone';

@Component({
  selector: 'app-end-node',
  templateUrl: './end-node.component.html',
  styleUrls: ['./end-node.component.css'],
})
export class EndNodeComponent implements OnInit {
  curPathAlgo: string;
  isVisualize: boolean;

  dargForPath: boolean;

  @Input() endNodeRow: number;
  @Input() endNodeCol: number;

  board: Cube[][];

  // initials: Initials;

  constructor(
    private _variablesService: VariablesService,
    private _utilities: UtilitiesService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });
  }

  async draggingTarget(event: CdkDragEnter<Cube>) {
    let dargForPath = this._variablesService._dragForPath.getValue();

    if (!dargForPath) return;

    let thisCubeWasBlock = false;

    let row = event.container.data['row'];
    let col = event.container.data['col'];

    let board = this._variablesService._board.getValue();
    let initials = this._variablesService._initials.getValue();
    let curPathAlgo = this._variablesService._curPathAlgo.getValue();

    if (row == initials.startNodeRow && col == initials.startNodeCol) return;

    if (board[row][col].isBlock) {
      thisCubeWasBlock = true;
      board[row][col].isBlock = false;
      this._variablesService.setBoard(board);
    }

    initials.endNodeRow = row;
    initials.endNodeCol = col;

    await this._utilities.visualizePath(board, initials, curPathAlgo, 0);

    if (thisCubeWasBlock) {
      board[row][col].isBlock = true;
      this._variablesService.setBoard(board);
    }

    this._changeDetectorRef.detectChanges();
  }
}
