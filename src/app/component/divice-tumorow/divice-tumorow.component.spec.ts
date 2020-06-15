import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiviceTumorowComponent} from './divice-tumorow.component';

describe('DiviceTumorowComponent', () => {
  let component: DiviceTumorowComponent;
  let fixture: ComponentFixture<DiviceTumorowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiviceTumorowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiviceTumorowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
