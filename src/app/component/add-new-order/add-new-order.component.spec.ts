import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AddNewOrderComponent} from './add-new-order.component';

describe('AddNewOrderComponent', () => {
  let component: AddNewOrderComponent;
  let fixture: ComponentFixture<AddNewOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
