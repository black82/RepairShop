import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StatisticStaffUsersComponent} from './statistic-staff-users.component';

describe('StatisticStaffUsersComponent', () => {
  let component: StatisticStaffUsersComponent;
  let fixture: ComponentFixture<StatisticStaffUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticStaffUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticStaffUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
