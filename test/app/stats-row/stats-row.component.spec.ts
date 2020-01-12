import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsRowComponent } from '../../../src/app/stats-row/stats-row.component';

describe('StatsRowComponent', () => {
  let component: StatsRowComponent;
  let fixture: ComponentFixture<StatsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
