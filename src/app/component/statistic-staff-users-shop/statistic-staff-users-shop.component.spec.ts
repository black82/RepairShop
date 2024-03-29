import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StatisticStaffUsersShopComponent} from './statistic-staff-users-shop.component';

describe('StatisticStaffUsersShopComponent', () => {
  let component: StatisticStaffUsersShopComponent;
  let fixture: ComponentFixture<StatisticStaffUsersShopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticStaffUsersShopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticStaffUsersShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
