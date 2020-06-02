import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogServiceComponent} from './log-service.component';

describe('LogServiceComponent', () => {
  let component: LogServiceComponent;
  let fixture: ComponentFixture<LogServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
