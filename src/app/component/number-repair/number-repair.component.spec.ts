import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NumberRepairComponent} from './number-repair.component';

describe('NumberRepairComponent', () => {
  let component: NumberRepairComponent;
  let fixture: ComponentFixture<NumberRepairComponent>;

  beforeEach(async(() => {
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
