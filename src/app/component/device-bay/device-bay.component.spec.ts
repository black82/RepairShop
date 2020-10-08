import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceBayComponent} from './device-bay.component';

describe('DeviceBayComponent', () => {
  let component: DeviceBayComponent;
  let fixture: ComponentFixture<DeviceBayComponent>;

  beforeEach(async(() => {
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
