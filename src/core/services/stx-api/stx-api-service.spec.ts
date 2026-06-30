import { TestBed } from '@angular/core/testing';

import { StxApiService } from './stx-api-service';

describe('StxSpiService', () => {
  let service: StxApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StxApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
