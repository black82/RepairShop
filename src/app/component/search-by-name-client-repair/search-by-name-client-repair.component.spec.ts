import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchByNameClientRepairComponent} from './search-by-name-client-repair.component';

describe('SearchByNameClientRepairComponent', () => {
  let component: SearchByNameClientRepairComponent;
  let fixture: ComponentFixture<SearchByNameClientRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByNameClientRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByNameClientRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
