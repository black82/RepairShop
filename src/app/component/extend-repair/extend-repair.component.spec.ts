import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendRepairComponent} from './extend-repair.component';

describe('ExtendRepairComponent', () => {
  let component: ExtendRepairComponent;
  let fixture: ComponentFixture<ExtendRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
