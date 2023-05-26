import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AnimationWaitComponent} from './animation-wait.component';

describe('AnimationWaitComponent', () => {
  let component: AnimationWaitComponent;
  let fixture: ComponentFixture<AnimationWaitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationWaitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
