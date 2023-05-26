import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RedactStaffUserComponent} from './redact-staff-user.component';

describe('RedactStaffUserComponent', () => {
  let component: RedactStaffUserComponent;
  let fixture: ComponentFixture<RedactStaffUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RedactStaffUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactStaffUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
