import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ShopDashboardComponent} from './shop-dashboard.component';

describe('ShopDashboardComponent', () => {
  let component: ShopDashboardComponent;
  let fixture: ComponentFixture<ShopDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShopDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
