import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeAlgoMenuComponent } from './maze-algo-menu.component';

describe('MazeAlgoMenuComponent', () => {
  let component: MazeAlgoMenuComponent;
  let fixture: ComponentFixture<MazeAlgoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeAlgoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeAlgoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
