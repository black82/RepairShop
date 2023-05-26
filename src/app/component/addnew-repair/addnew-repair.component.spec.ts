import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AddnewRepairComponent} from './addnew-repair.component';

describe('AddnewRepairComponent', () => {
  let component: AddnewRepairComponent;
  let fixture: ComponentFixture<AddnewRepairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
