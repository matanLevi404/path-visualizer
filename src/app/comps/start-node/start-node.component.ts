import { CdkDragEnter } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Cube, Initials } from 'src/app/interfaces/iterfaces';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.css'],
})
export class StartNodeComponent implements OnInit {
  curPathAlgo: string;
  isVisualize: boolean;

  dargForPath: boolean;

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

  async dragginArrow(event: CdkDragEnter<Cube>) {
    if (!this.dargForPath) return;

    let row = event.container.data['row'];
    let col = event.container.data['col'];

    if (row == this.initials.endNodeRow && col == this.initials.endNodeCol)
      return;

    const initials = { ...this.initials, startNodeRow: row, startNodeCol: col };
    console.log(initials);

    await this._utilities.visualizePath(
      this.board,
      initials,
      this.curPathAlgo,
      0
    );
    this._changeDetectorRef.detectChanges();
  }
}
