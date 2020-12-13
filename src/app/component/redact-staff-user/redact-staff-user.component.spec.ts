import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RedactStaffUserComponent} from './redact-staff-user.component';

describe('RedactStaffUserComponent', () => {
  let component: RedactStaffUserComponent;
  let fixture: ComponentFixture<RedactStaffUserComponent>;

  beforeEach(async(() => {
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
