import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './comps/navbar/navbar.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { VariablesService } from './services/variables.service';
import { TableComponent } from './comps/table/table.component';
import { UtilitiesService } from './services/utilities.service';
import { StartNodeComponent } from './comps/start-node/start-node.component';
import { EndNodeComponent } from './comps/end-node/end-node.component';
import { RecursiveDivisionService } from './algoServices/mazeServices/recursive-division.service';
import { KruskalService } from './algoServices/mazeServices/kruskal.service';
import { BFSService } from './algoServices/pathServices/bfs.service';
import { DFSService } from './algoServices/pathServices/dfs.service';
import { PrimService } from './algoServices/mazeServices/prim.service';
import { WeightNodeComponent } from './comps/weight-node/weight-node.component';
import { MazeAlgoMenuComponent } from './comps/maze-algo-menu/maze-algo-menu.component';
import { PathAlgoMenuComponent } from './comps/path-algo-menu/path-algo-menu.component';
import { MainInfoComponent } from './comps/main-info/main-info.component';

@NgModule({
  declarations: [
    AppComponent,
    EndNodeComponent,
    NavbarComponent,
    TableComponent,
    StartNodeComponent,
    WeightNodeComponent,
    MazeAlgoMenuComponent,
    PathAlgoMenuComponent,
    MainInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    UtilitiesService,
    RecursiveDivisionService,
    KruskalService,
    VariablesService,
    BFSService,
    DFSService,
    PrimService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
