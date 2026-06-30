import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { StxTradeApiService } from './stx-trade-api-service';
import { StxApiService } from '../../../../core/services/stx-api/stx-api-service';

describe('StxTradeApiService', () => {
  let service: StxTradeApiService;

  const stxApiServiceMock = {
    get: (): Observable<unknown> => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StxTradeApiService, { provide: StxApiService, useValue: stxApiServiceMock }],
    });

    service = TestBed.inject(StxTradeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
