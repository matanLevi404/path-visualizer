import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-path-algo-menu',
  templateUrl: './path-algo-menu.component.html',
  styleUrls: ['./path-algo-menu.component.scss'],
})
export class PathAlgoMenuComponent implements OnInit {
  active: boolean = false;

  isVisualize: boolean = false;

  constructor(
    private _renderer: Renderer2,
    private _variablesService: VariablesService
  ) {}

  ngOnInit(): void {
    this._variablesService.isVisualize$.subscribe((isVisualize) => {
      this.isVisualize = isVisualize;
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

  dijkstra() {
    this._variablesService.setCurPathAlgo('Dijkstra!');
  }

  BFS() {
    this._variablesService.setCurPathAlgo('BFS!');
  }

  DFS() {
    this._variablesService.setCurPathAlgo('DFS!');
  }

  aStar() {
    this._variablesService.setCurPathAlgo('A*!');
  }
}
