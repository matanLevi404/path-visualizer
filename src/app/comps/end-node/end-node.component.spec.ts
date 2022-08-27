import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndNodeComponent } from './end-node.component';

describe('EndNodeComponent', () => {
  let component: EndNodeComponent;
  let fixture: ComponentFixture<EndNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
