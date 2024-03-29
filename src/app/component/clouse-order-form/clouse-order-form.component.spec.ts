import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ClouseOrderFormComponent} from './clouse-order-form.component';

describe('ClouseOrderFormComponent', () => {
  let component: ClouseOrderFormComponent;
  let fixture: ComponentFixture<ClouseOrderFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClouseOrderFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClouseOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
