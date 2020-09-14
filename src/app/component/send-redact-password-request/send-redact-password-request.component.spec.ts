import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendRedactPasswordRequestComponent} from './send-redact-password-request.component';

describe('SendRedactPasswordRequestComponent', () => {
  let component: SendRedactPasswordRequestComponent;
  let fixture: ComponentFixture<SendRedactPasswordRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendRedactPasswordRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRedactPasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
