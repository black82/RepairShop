import {TestBed} from '@angular/core/testing';

import {FiltreMoreDeviceRepairActivService} from './filtre-more-device-repair-activ.service';

describe('FiltreMoreDeviceRepairActivService', () => {
  let service: FiltreMoreDeviceRepairActivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltreMoreDeviceRepairActivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
