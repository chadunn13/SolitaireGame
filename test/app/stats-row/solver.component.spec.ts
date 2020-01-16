import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolverComponent } from '../../../src/app/stats-row/solver/solver.component';

describe('SolverComponent', () => {
  let component: SolverComponent;
  let fixture: ComponentFixture<SolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});