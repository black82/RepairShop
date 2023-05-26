import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AllDeviceSaleComponent} from './all-device-sale.component';

describe('AllDeviceSaleComponent', () => {
  let component: AllDeviceSaleComponent;
  let fixture: ComponentFixture<AllDeviceSaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDeviceSaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDeviceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
