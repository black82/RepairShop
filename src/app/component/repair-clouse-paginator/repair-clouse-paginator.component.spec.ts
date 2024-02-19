import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairClousePaginatorComponent } from './repair-clouse-paginator.component';

describe('RepairClousePaginatorComponent', () => {
  let component: RepairClousePaginatorComponent;
  let fixture: ComponentFixture<RepairClousePaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairClousePaginatorComponent]
    });
    fixture = TestBed.createComponent(RepairClousePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
