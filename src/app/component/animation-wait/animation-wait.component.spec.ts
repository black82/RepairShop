import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimationWaitComponent} from './animation-wait.component';

describe('AnimationWaitComponent', () => {
  let component: AnimationWaitComponent;
  let fixture: ComponentFixture<AnimationWaitComponent>;

  beforeEach(async(() => {
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
