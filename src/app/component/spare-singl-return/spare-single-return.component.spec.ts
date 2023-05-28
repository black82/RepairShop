import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareSingleReturnComponent } from './spare-single-return.component';

describe('SpareSinglReturnComponent', () => {
  let component: SpareSingleReturnComponent;
  let fixture: ComponentFixture<SpareSingleReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpareSingleReturnComponent]
    });
    fixture = TestBed.createComponent(SpareSingleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
