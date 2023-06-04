import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPrintReturnComponent } from './app-print-return.component';

describe('AppPrintReturnComponent', () => {
  let component: AppPrintReturnComponent;
  let fixture: ComponentFixture<AppPrintReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPrintReturnComponent]
    });
    fixture = TestBed.createComponent(AppPrintReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
