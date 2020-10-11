import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SinglDeviceShouwComponent} from './singl-device-shouw.component';

describe('SinglDeviceShouwComponent', () => {
  let component: SinglDeviceShouwComponent;
  let fixture: ComponentFixture<SinglDeviceShouwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglDeviceShouwComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglDeviceShouwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
