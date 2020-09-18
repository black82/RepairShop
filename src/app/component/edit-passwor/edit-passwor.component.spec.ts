import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPassworComponent} from './edit-passwor.component';

describe('EditPassworComponent', () => {
  let component: EditPassworComponent;
  let fixture: ComponentFixture<EditPassworComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPassworComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassworComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
