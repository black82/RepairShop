import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EndRepairNotificationComponent} from './end-repair-notification.component';

describe('EndRepairNotificationComponent', () => {
  let component: EndRepairNotificationComponent;
  let fixture: ComponentFixture<EndRepairNotificationComponent>;

  beforeEach(async(() => {
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
