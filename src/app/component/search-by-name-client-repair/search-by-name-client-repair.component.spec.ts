import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SearchByNameClientRepairComponent} from './search-by-name-client-repair.component';

describe('SearchByNameClientRepairComponent', () => {
  let component: SearchByNameClientRepairComponent;
  let fixture: ComponentFixture<SearchByNameClientRepairComponent>;

  beforeEach(waitForAsync(() => {
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
