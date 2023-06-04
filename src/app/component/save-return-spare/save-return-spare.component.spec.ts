import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveReturnSpareComponent } from './save-return-spare.component';

describe('SaveReturnSpareComponent', () => {
  let component: SaveReturnSpareComponent;
  let fixture: ComponentFixture<SaveReturnSpareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveReturnSpareComponent]
    });
    fixture = TestBed.createComponent(SaveReturnSpareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
