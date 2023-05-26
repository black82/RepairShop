import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpareAllComponent} from './spare-all.component';

describe('SpareAllComponent', () => {
  let component: SpareAllComponent;
  let fixture: ComponentFixture<SpareAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpareAllComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
