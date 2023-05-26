import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {InvoiceRepairRedactComponent} from './invoice-repair-redact.component';

describe('InvoiceRepairRedactComponent', () => {
  let component: InvoiceRepairRedactComponent;
  let fixture: ComponentFixture<InvoiceRepairRedactComponent>;

  beforeEach(waitForAsync(() => {
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
