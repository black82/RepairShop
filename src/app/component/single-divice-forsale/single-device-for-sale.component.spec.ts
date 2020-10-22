import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleDeviceForSaleComponent} from './single-device-for-sale.component';

describe('SingleDiviceForsaleComponent', () => {
  let component: SingleDeviceForSaleComponent;
  let fixture: ComponentFixture<SingleDeviceForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleDeviceForSaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDeviceForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
