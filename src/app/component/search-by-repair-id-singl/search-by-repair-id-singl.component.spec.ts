import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByRepairIdSinglComponent } from './search-by-repair-id-singl.component';

describe('SearchByRepairIdSinglComponent', () => {
  let component: SearchByRepairIdSinglComponent;
  let fixture: ComponentFixture<SearchByRepairIdSinglComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByRepairIdSinglComponent]
    });
    fixture = TestBed.createComponent(SearchByRepairIdSinglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
