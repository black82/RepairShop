import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PageableDeviceSaleComponent} from './pageable-device-sale.component';

describe('PageableDeviceSaleComponent', () => {
  let component: PageableDeviceSaleComponent;
  let fixture: ComponentFixture<PageableDeviceSaleComponent>;

  beforeEach(waitForAsync(() => {
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
