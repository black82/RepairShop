import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticModelPartsComponent} from './statistic-model-parts.component';

describe('StatisticModelPartsComponent', () => {
  let component: StatisticModelPartsComponent;
  let fixture: ComponentFixture<StatisticModelPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticModelPartsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticModelPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
