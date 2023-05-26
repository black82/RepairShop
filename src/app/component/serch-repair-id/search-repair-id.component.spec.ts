import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SearchRepairIdComponent} from './search-repair-id.component';

describe('SerchRepairIdComponent', () => {
  let component: SearchRepairIdComponent;
  let fixture: ComponentFixture<SearchRepairIdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRepairIdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRepairIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
