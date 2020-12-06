import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RedactClientsaleRedacandformComponent} from './redact-clientsale-redacandform.component';

describe('RedactClientsaleRedacandformComponent', () => {
  let component: RedactClientsaleRedacandformComponent;
  let fixture: ComponentFixture<RedactClientsaleRedacandformComponent>;

  beforeEach(async(() => {
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
