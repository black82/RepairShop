import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OtpoutDeviceComponent} from './otpout-device.component';

describe('OtpoutDeviceComponent', () => {
  let component: OtpoutDeviceComponent;
  let fixture: ComponentFixture<OtpoutDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpoutDeviceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpoutDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
