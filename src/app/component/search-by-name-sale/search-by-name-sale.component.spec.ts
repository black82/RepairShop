import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SearchByNameSaleComponent} from './search-by-name-sale.component';

describe('SearchByNameSaleComponent', () => {
  let component: SearchByNameSaleComponent;
  let fixture: ComponentFixture<SearchByNameSaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByNameSaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByNameSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
