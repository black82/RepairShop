import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DeviceinputComponent} from './deviceinput.component';

describe('DeviceinputComponent', () => {
  let component: DeviceinputComponent;
  let fixture: ComponentFixture<DeviceinputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
