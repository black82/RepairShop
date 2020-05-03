import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DragfileComponent} from './dragfile.component';

describe('DragfileComponent', () => {
  let component: DragfileComponent;
  let fixture: ComponentFixture<DragfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
