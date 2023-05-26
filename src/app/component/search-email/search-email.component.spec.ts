import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SearchEmailComponent} from './search-email.component';

describe('SearchEmailComponent', () => {
  let component: SearchEmailComponent;
  let fixture: ComponentFixture<SearchEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchEmailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
