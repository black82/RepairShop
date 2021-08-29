import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AllOrderPaginatorComponent} from './all-order-paginator.component';

describe('AllOrderPaginatorComponent', () => {
  let component: AllOrderPaginatorComponent;
  let fixture: ComponentFixture<AllOrderPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllOrderPaginatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrderPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
