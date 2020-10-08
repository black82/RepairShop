import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DragOnDropRepairComponent} from './drag-on-drop-repair.component';

describe('DragOnDropRepairComponent', () => {
  let component: DragOnDropRepairComponent;
  let fixture: ComponentFixture<DragOnDropRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragOnDropRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragOnDropRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
