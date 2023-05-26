import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DeviceBayComponent} from './device-bay.component';

describe('DeviceBayComponent', () => {
  let component: DeviceBayComponent;
  let fixture: ComponentFixture<DeviceBayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceBayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
