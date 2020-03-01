import {TestBed} from '@angular/core/testing';

import {HttpClien} from './clientservice.service';

describe('ClientserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpClien = TestBed.get(HttpClien);
    expect(service).toBeTruthy();
  });
});
