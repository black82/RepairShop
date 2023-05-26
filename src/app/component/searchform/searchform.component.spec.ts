import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SearchformComponent} from './searchform.component';

describe('SearchformComponent', () => {
  let component: SearchformComponent;
  let fixture: ComponentFixture<SearchformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchformComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
