import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ClientPaginatorDateComponent} from './client-paginator-date.component';

describe('ClientPaginatorDateComponent', () => {
  let component: ClientPaginatorDateComponent;
  let fixture: ComponentFixture<ClientPaginatorDateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPaginatorDateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaginatorDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
