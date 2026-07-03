import { TestBed } from '@angular/core/testing';

import { StxTradePageService } from './stx-trade-page-service';

describe('StxTradePageService', () => {
  let service: StxTradePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StxTradePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
