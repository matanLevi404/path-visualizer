import { CdkDragEnter } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Cube, Initials } from 'src/app/interfaces/iterfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.css'],
})
export class StartNodeComponent implements OnInit {
  isVisualize: boolean;

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

  async dragginArrow(event: CdkDragEnter<Cube>) {
    let dargForPath = this._variablesService._dragForPath.getValue();

    if (!dargForPath) return;

    let row = event.container.data['row'];
    let col = event.container.data['col'];

    let board = this._variablesService._board.getValue();
    let initials = this._variablesService._initials.getValue();
    let curPathAlgo = this._variablesService._curPathAlgo.getValue();

    if (row == initials.endNodeRow && col == initials.endNodeCol) return;

    initials.startNodeRow = row;
    initials.startNodeCol = col;

    await this._utilities.visualizePath(board, initials, curPathAlgo, 0);

    this._changeDetectorRef.detectChanges();
  }
}
