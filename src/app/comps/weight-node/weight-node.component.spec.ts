import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightNodeComponent } from './weight-node.component';

describe('WeightNodeComponent', () => {
  let component: WeightNodeComponent;
  let fixture: ComponentFixture<WeightNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
