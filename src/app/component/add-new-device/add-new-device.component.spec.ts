import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNewDeviceComponent} from './add-new-device.component';

describe('AddNewDeviceComponent', () => {
  let component: AddNewDeviceComponent;
  let fixture: ComponentFixture<AddNewDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewDeviceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
