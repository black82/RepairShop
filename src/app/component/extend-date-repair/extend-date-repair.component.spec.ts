import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendDateRepairComponent} from './extend-date-repair.component';

describe('ExtendDateRepairComponent', () => {
  let component: ExtendDateRepairComponent;
  let fixture: ComponentFixture<ExtendDateRepairComponent>;

  beforeEach(async(() => {
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
