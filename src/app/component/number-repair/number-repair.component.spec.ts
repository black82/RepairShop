import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {NumberRepairComponent} from './number-repair.component';

describe('NumberRepairComponent', () => {
  let component: NumberRepairComponent;
  let fixture: ComponentFixture<NumberRepairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NumberRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
