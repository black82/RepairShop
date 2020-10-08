import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceSellComponent} from './device-sell.component';

describe('DeviceSellComponent', () => {
  let component: DeviceSellComponent;
  let fixture: ComponentFixture<DeviceSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
