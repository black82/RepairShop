import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchByNameSaleComponent} from './search-by-name-sale.component';

describe('SearchByNameSaleComponent', () => {
  let component: SearchByNameSaleComponent;
  let fixture: ComponentFixture<SearchByNameSaleComponent>;

  beforeEach(async(() => {
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
