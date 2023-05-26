import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CheckDeviceRepairActiveComponent} from './check-device-repair-active.component';

describe('CheckDeviceRepairActiveComponent', () => {
  let component: CheckDeviceRepairActiveComponent;
  let fixture: ComponentFixture<CheckDeviceRepairActiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CheckDeviceRepairActiveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDeviceRepairActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
