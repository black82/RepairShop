import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AllDeviceInSaleComponent} from './all-device-in-sale.component';

describe('AllDeviceInSaleComponent', () => {
  let component: AllDeviceInSaleComponent;
  let fixture: ComponentFixture<AllDeviceInSaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDeviceInSaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDeviceInSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
