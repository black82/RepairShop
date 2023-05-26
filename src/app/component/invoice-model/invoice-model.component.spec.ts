import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {InvoiceModelComponent} from './invoice-model.component';

describe('InvoiceModelComponent', () => {
  let component: InvoiceModelComponent;
  let fixture: ComponentFixture<InvoiceModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceModelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
