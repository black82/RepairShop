import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DeviceSaleByIdComponent} from './device-sale-by-id.component';

describe('DeviceSaleByIdComponent', () => {
  let component: DeviceSaleByIdComponent;
  let fixture: ComponentFixture<DeviceSaleByIdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSaleByIdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSaleByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
