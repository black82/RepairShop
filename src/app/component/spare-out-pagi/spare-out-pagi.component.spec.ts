import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareOutPagiComponent } from './spare-out-pagi.component';

describe('SpareOutPagiComponent', () => {
  let component: SpareOutPagiComponent;
  let fixture: ComponentFixture<SpareOutPagiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpareOutPagiComponent]
    });
    fixture = TestBed.createComponent(SpareOutPagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
