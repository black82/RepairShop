import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SpareRedactComponentComponent} from './spare-redact-component.component';

describe('SpareRedactComponentComponent', () => {
  let component: SpareRedactComponentComponent;
  let fixture: ComponentFixture<SpareRedactComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpareRedactComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareRedactComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
