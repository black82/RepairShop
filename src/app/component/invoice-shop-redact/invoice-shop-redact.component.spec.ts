import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceShopRedactComponent} from './invoice-shop-redact.component';

describe('InvoiceShopRedactComponent', () => {
  let component: InvoiceShopRedactComponent;
  let fixture: ComponentFixture<InvoiceShopRedactComponent>;

  beforeEach(async(() => {
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
