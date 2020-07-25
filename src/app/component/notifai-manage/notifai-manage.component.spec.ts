import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotifaiManageComponent} from './notifai-manage.component';

describe('NotifaiManageComponent', () => {
  let component: NotifaiManageComponent;
  let fixture: ComponentFixture<NotifaiManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotifaiManageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifaiManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
