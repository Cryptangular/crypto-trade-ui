import { TestBed } from '@angular/core/testing';
import { StxTradePageService } from './stx-trade-page-service';
import { WebSocketService } from './stx-trade-ws.service';
import { StxTradeApiService } from './stx-trade-api-service';
import { Observable, of, Subject } from 'rxjs';

describe('StxTradePageService', () => {
  let service: StxTradePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StxTradePageService,
        {
          provide: WebSocketService,
          useValue: {
            messages$: new Subject(),
            connect: (): void => {},
            disconnect: (): void => {},
            subscribeToStreams: (): void => {},
            unsubscribeFromStreams: (): void => {},
          },
        },
        {
          provide: StxTradeApiService,
          useValue: {
            getHistoricalKlines: (): Observable<never[]> => of([]),
          },
        },
      ],
    });

    service = TestBed.inject(StxTradePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
