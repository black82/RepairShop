import {TestBed} from '@angular/core/testing';

import {ClientStaticServiceService} from './client-static-service.service';

describe('ClientStaticServiceService', () => {
  let service: ClientStaticServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientStaticServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
