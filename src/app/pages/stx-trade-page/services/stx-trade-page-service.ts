import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { WebSocketMessage, WebSocketService } from './stx-trade-ws.service';
import { KlineData } from '../stx-trade-page';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class StxTradePageService {
  private wsService = inject(WebSocketService);
  private readonly _klineData: WritableSignal<KlineData | undefined> = signal(undefined);
  private readonly _priceChange = signal<number>(0);

  readonly klineData = this._klineData.asReadonly();
  readonly priceChange = this._priceChange.asReadonly();

  start(): void {
    this.wsService.connect('wss://stream.binance.com:9443/ws');
    this.wsService.subscribeToStreams(['btcusdt@kline_1m', 'btcusdt@ticker']);
  }

  constructor() {
    const ws = this.wsService;
    ws.messages$.pipe(takeUntilDestroyed()).subscribe({
      next: (m: WebSocketMessage) => {
        if (m.e === 'kline') {
          const formattedKline = {
            type: m.e,
            time: m.E,
            symbol: m.s,
            kline: {
              time: m['k']['t'],
              open: m['k']['o'],
              high: m['k']['h'],
              low: m['k']['l'],
              close: m['k']['c'],
            },
          };
          this._klineData.set(formattedKline);
        } else if (m.e === '24hrTicker') {
          const price = m['c'];
          this._priceChange.set(price);
        }
      },
    });
  }

  close(): void {
    this.wsService.disconnect();
  }
}
