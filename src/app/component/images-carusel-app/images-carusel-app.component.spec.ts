import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesCaruselAppComponent } from './images-carusel-app.component';

describe('ImagesCaruselAppComponent', () => {
  let component: ImagesCaruselAppComponent;
  let fixture: ComponentFixture<ImagesCaruselAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesCaruselAppComponent]
    });
    fixture = TestBed.createComponent(ImagesCaruselAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
