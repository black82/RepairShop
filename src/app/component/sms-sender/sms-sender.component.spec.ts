import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SmsSenderComponent} from './sms-sender.component';

describe('SmsSenderComponent', () => {
  let component: SmsSenderComponent;
  let fixture: ComponentFixture<SmsSenderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SmsSenderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
