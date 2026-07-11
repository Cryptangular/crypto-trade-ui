import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { StxTradePageService } from './stx-trade-page-service';
import { WebSocketService } from './stx-trade-ws.service';
import { StxTradeApiService } from './stx-trade-api-service';

describe('StxTradePageService', () => {
  let service: StxTradePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StxTradePageService,
        provideRouter([]),
        {
          provide: WebSocketService,
          useValue: {
            messages$: new Subject<unknown>(),
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
