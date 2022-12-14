import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Cube, Edge, Initials } from '../interfaces/iterfaces';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {
  private _curMazeAlgo = new Subject<string>();
  _curPathAlgo = new BehaviorSubject<string>('BFS');

  _board = new BehaviorSubject<Cube[][]>(null);
  _adjencencyList = new BehaviorSubject<Edge[]>(null);

  _initials = new BehaviorSubject<Initials>(null);

  private _isVisualize = new Subject<boolean>();

  _dragForPath = new BehaviorSubject<boolean>(false);

  private _pathWeight = new BehaviorSubject<number>(0);

  private _manualPathWeight = new BehaviorSubject<number>(0);

  curMazeAlgo$ = this._curMazeAlgo.asObservable();
  curPathAlgo$ = this._curPathAlgo.asObservable();

  board$ = this._board.asObservable();
  adjencencyList$ = this._adjencencyList.asObservable();

  initials$ = this._initials.asObservable();

  isVisualize$ = this._isVisualize.asObservable();

  dargForPath$ = this._dragForPath.asObservable();

  pathWeight$ = this._pathWeight.asObservable();

  manualPathWeight$ = this._manualPathWeight.asObservable();

  constructor() {}

  setCurMazeAlgo(curMazeAlgo: string) {
    this._curMazeAlgo.next(curMazeAlgo);
  }

  setCurPathAlgo(curPathAlgo: string) {
    this._curPathAlgo.next(curPathAlgo);
  }

  setBoard(board: Cube[][]) {
    this._board.next(board);
  }

  setAdjencency(adjencencyList: Edge[]) {
    this._adjencencyList.next(adjencencyList);
  }

  setInitials(initials: Initials) {
    console.log('Initials', initials);
    this._initials.next(initials);
  }

  setIsVisualize(isVisualize: boolean) {
    this._isVisualize.next(isVisualize);
  }

  setDragForPath(dargForPath: boolean) {
    this._dragForPath.next(dargForPath);
  }

  setPathWeight(pathWeight: number) {
    this._pathWeight.next(pathWeight);
  }

  setManualPathWeight(manualWeight: number) {
    this._manualPathWeight.next(manualWeight);
  }
}
