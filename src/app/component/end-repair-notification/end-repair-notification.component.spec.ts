import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EndRepairNotificationComponent} from './end-repair-notification.component';

describe('EndRepairNotificationComponent', () => {
  let component: EndRepairNotificationComponent;
  let fixture: ComponentFixture<EndRepairNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EndRepairNotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndRepairNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
