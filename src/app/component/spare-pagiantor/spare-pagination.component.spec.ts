import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SparePaginationComponent} from './spare-pagination.component';

describe('SparePagiantorComponent', () => {
  let component: SparePaginationComponent;
  let fixture: ComponentFixture<SparePaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SparePaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
