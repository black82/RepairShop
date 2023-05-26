import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StaffUserComponentDialogComponent} from './staff-user-component-dialog.component';

describe('StaffUserComponentDialogComponent', () => {
  let component: StaffUserComponentDialogComponent;
  let fixture: ComponentFixture<StaffUserComponentDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StaffUserComponentDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
