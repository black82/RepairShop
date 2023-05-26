import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ExtendDateRepairComponent} from './extend-date-repair.component';

describe('ExtendDateRepairComponent', () => {
  let component: ExtendDateRepairComponent;
  let fixture: ComponentFixture<ExtendDateRepairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendDateRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendDateRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
