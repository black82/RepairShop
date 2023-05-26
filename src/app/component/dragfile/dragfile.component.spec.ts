import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DragfileComponent} from './dragfile.component';

describe('DragfileComponent', () => {
  let component: DragfileComponent;
  let fixture: ComponentFixture<DragfileComponent>;

  beforeEach(waitForAsync(() => {
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
