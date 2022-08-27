import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathAlgoMenuComponent } from './path-algo-menu.component';

describe('PathAlgoMenuComponent', () => {
  let component: PathAlgoMenuComponent;
  let fixture: ComponentFixture<PathAlgoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathAlgoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathAlgoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
