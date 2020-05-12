import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SigPadComponent} from './sig-pad.component';

describe('SigPadComponent', () => {
  let component: SigPadComponent;
  let fixture: ComponentFixture<SigPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigPadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
