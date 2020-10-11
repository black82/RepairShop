import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageableDeviceSaleComponent} from './pageable-device-sale.component';

describe('PageableDeviceSaleComponent', () => {
  let component: PageableDeviceSaleComponent;
  let fixture: ComponentFixture<PageableDeviceSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageableDeviceSaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageableDeviceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
