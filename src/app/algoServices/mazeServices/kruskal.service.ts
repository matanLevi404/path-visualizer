import { Injectable } from '@angular/core';
import { timeout } from 'src/app/helpers/awaitTimeout';
import { Cube, Edge } from 'src/app/interfaces/iterfaces';
import { VariablesService } from 'src/app/services/variables.service';

@Injectable({
  providedIn: 'root',
})
export class KruskalService {
  constructor(private _variablesService: VariablesService) {}

  async kruskal(board: Cube[][], adjencencyList: Edge[]) {
    const v = this.paintOddWalls(board);
    const numOfEdges = adjencencyList.length;

    let parentList: number[] = [];
    let rank: number[] = [];

    let e: number = 0;
    let i: number = 0;

    for (let i = 0; i < v; i++) {
      parentList.push(i);
      rank.push(0);
    }

    while (e < v - 1 && i < numOfEdges) {
      const source = adjencencyList[i].node;
      const des = adjencencyList[i].neighborNode;

      const [s_r, s_c] = [...source]; // s_r = source row, s_c = source col
      const [d_r, d_c] = [...des]; // d_r =  dest row, d_c = dest col

      if (s_r % 2 == 0 || s_c % 2 == 0 || d_r % 2 == 0 || d_c % 2 == 0) {
        i += 1;
        continue;
      }

      const a = board[s_r][s_c].id;
      const b = board[d_r][d_c].id;

      i += 1;

      const parentA = this.find(parentList, a);
      const parentB = this.find(parentList, b);

      if (parentA != parentB) {
        e += 1;
        const x = (source[0] + des[0]) / 2;
        const y = (source[1] + des[1]) / 2;

        await timeout(20);
        board[x][y].marker = true;
        board[x][y].isBlock = false;
        this._variablesService.setBoard(board);

        await timeout(20);
        board[x][y].marker = false;
        this._variablesService.setBoard(board);

        this.applyUnion(parentList, rank, parentA, parentB);
      }
    }
  }

  private paintOddWalls(board: Cube[][]) {
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (i % 2 == 0 || j % 2 == 0) {
          board[i][j].isBlock = true;
          this._variablesService.setBoard(board);
        }
        counter += 1;
      }
    }
    return counter;
  }

  private find(parent: number[], i: number) {
    if (parent[i] == i) {
      return i;
    }
    return this.find(parent, parent[i]);
  }

  private applyUnion(
    parent: number[],
    rank: number[],
    parentA: number,
    parentB: number
  ) {
    let rootA = this.find(parent, parentA);
    let rootB = this.find(parent, parentB);
    if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA] += 1;
    }
  }
}
