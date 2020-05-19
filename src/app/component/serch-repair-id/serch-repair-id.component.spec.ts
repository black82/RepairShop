import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SerchRepairIdComponent} from './serch-repair-id.component';

describe('SerchRepairIdComponent', () => {
  let component: SerchRepairIdComponent;
  let fixture: ComponentFixture<SerchRepairIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SerchRepairIdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchRepairIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
