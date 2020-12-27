import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StaffUserComponentDialogComponent} from './staff-user-component-dialog.component';

describe('StaffUserComponentDialogComponent', () => {
  let component: StaffUserComponentDialogComponent;
  let fixture: ComponentFixture<StaffUserComponentDialogComponent>;

  beforeEach(async(() => {
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
