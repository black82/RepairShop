import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchRepairIdComponent} from './search-repair-id.component';

describe('SerchRepairIdComponent', () => {
  let component: SearchRepairIdComponent;
  let fixture: ComponentFixture<SearchRepairIdComponent>;

  beforeEach(async(() => {
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
