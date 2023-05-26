import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ClouseOrderComponent} from './clouse-order.component';

describe('ClouseOrderComponent', () => {
  let component: ClouseOrderComponent;
  let fixture: ComponentFixture<ClouseOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClouseOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClouseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
