import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RedactClientsaleRedacandformComponent} from './redact-clientsale-redacandform.component';

describe('RedactClientsaleRedacandformComponent', () => {
  let component: RedactClientsaleRedacandformComponent;
  let fixture: ComponentFixture<RedactClientsaleRedacandformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RedactClientsaleRedacandformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactClientsaleRedacandformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
