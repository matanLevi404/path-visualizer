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

  @Input() board: Cube[][];

  @Input() initials: Initials;

  constructor(
    private _variablesService: VariablesService,
    private _utilities: UtilitiesService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._variablesService.board$.subscribe((board) => {
      this.board = board;
    });

    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
    });

    this._variablesService.curPathAlgo$.subscribe((pathAlgo) => {
      this.curPathAlgo = pathAlgo;
    });

    this._variablesService.initials$.subscribe((initials) => {
      this.initials = initials;
    });

    this._variablesService.dargForPath$.subscribe((dargForPath) => {
      this.dargForPath = dargForPath;
    });
  }

  async draggingTarget(event: CdkDragEnter<Cube>) {
    if (!this.dargForPath) return;

    let row = event.container.data['row'];
    let col = event.container.data['col'];

    if (this.board[row][col].isBlock) {
      this.board[row][col].isBlock = false;
      this._variablesService.setBoard(this.board);

      const initials = { ...this.initials, endNodeRow: row, endNodeCol: col };

      await this._utilities.visualizePath(
        this.board,
        initials,
        this.curPathAlgo,
        0
      );

      this.board[row][col].isBlock = true;
      this._variablesService.setBoard(this.board);
    } else {
      const initials = { ...this.initials, endNodeRow: row, endNodeCol: col };

      await this._utilities.visualizePath(
        this.board,
        initials,
        this.curPathAlgo,
        0
      );
    }

    this._changeDetectorRef.detectChanges();
  }
}
