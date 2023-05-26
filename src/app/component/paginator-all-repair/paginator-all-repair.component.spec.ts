import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PaginatorAllRepairComponent} from './paginator-all-repair.component';

describe('PaginatorAllRepairComponent', () => {
  let component: PaginatorAllRepairComponent;
  let fixture: ComponentFixture<PaginatorAllRepairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorAllRepairComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorAllRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
