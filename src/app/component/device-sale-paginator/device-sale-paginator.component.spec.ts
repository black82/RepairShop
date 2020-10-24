import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceSalePaginatorComponent} from './device-sale-paginator.component';

describe('DeviceSaleNowPaginatorComponent', () => {
  let component: DeviceSalePaginatorComponent;
  let fixture: ComponentFixture<DeviceSalePaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSalePaginatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSalePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
