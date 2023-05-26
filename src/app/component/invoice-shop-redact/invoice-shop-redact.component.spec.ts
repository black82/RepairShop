import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {InvoiceShopRedactComponent} from './invoice-shop-redact.component';

describe('InvoiceShopRedactComponent', () => {
  let component: InvoiceShopRedactComponent;
  let fixture: ComponentFixture<InvoiceShopRedactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceShopRedactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceShopRedactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
