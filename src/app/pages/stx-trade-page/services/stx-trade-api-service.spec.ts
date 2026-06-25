import { TestBed } from '@angular/core/testing';

import { StxTradeApiService } from './stx-trade-api-service';

describe('StxTradeApiService', () => {
  let service: StxTradeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StxTradeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
