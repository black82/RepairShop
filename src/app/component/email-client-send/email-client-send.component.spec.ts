import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmailClientSendComponent} from './email-client-send.component';

describe('EmailClientSendComponent', () => {
  let component: EmailClientSendComponent;
  let fixture: ComponentFixture<EmailClientSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailClientSendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailClientSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
