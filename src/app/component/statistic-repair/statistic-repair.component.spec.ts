import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StatisticRepairComponent} from './statistic-repair.component';

describe('StatisticRepairComponent', () => {
  let component: StatisticRepairComponent;
  let fixture: ComponentFixture<StatisticRepairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
