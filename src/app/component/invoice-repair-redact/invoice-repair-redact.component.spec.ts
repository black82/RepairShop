import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceRepairRedactComponent} from './invoice-repair-redact.component';

describe('InvoiceRepairRedactComponent', () => {
  let component: InvoiceRepairRedactComponent;
  let fixture: ComponentFixture<InvoiceRepairRedactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceRepairRedactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRepairRedactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
