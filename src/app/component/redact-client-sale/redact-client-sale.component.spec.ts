import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RedactClientSaleComponent} from './redact-client-sale.component';

describe('RedactClientSaleComponent', () => {
  let component: RedactClientSaleComponent;
  let fixture: ComponentFixture<RedactClientSaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RedactClientSaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactClientSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
