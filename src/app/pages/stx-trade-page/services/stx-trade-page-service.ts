import { computed, inject, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { WebSocketMessage, WebSocketService } from './stx-trade-ws.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { StxTradeApiService } from './stx-trade-api-service';
import { CandlestickData, PriceChange } from '../models/stx-trade-model';
import { Time } from 'lightweight-charts';
import { combineLatest, switchMap } from 'rxjs';

@Injectable()
export class StxTradePageService {
  private wsService = inject(WebSocketService);
  private tradeApiService = inject(StxTradeApiService);

  private readonly _klineData: WritableSignal<CandlestickData | undefined> = signal(undefined);
  private readonly _priceChange = signal<PriceChange | null>(null);
  private readonly _interval = signal('1m');
  private readonly _klinesDataArray = signal<CandlestickData[]>([]);

  readonly klineData = this._klineData.asReadonly();
  readonly interval = this._interval.asReadonly();

  readonly pageState = computed(() => ({
    priceChange: this._priceChange(),
    klines: untracked(() => this._klinesDataArray()),
  }));

  readonly symbol = signal('btcusdt');

  start(): void {
    this.wsService.connect('wss://stream.binance.com:9443/ws');
    this.wsService.subscribeToStreams([`${this.symbol()}@kline_${this.interval()}`, `${this.symbol()}@ticker`]);
  }

  constructor() {
    combineLatest([toObservable(this.symbol), toObservable(this.interval)])
      .pipe(
        switchMap(([symbol, interval]) => this.tradeApiService.getHistoricalKlines(symbol, interval)),
        takeUntilDestroyed()
      )
      .subscribe(historicalKlines => {
        this._klinesDataArray.set(historicalKlines);
      });

    const ws = this.wsService;

    ws.messages$.pipe(takeUntilDestroyed()).subscribe({
      next: (m: WebSocketMessage) => {
        if (m.e === 'kline') {
          const formattedKline = {
            time: m['k']['t'] as Time,
            open: Number(m['k']['o']),
            high: Number(m['k']['h']),
            low: Number(m['k']['l']),
            close: Number(m['k']['c']),
          };

          this._klineData.set(formattedKline);

          this.updateKlinesArray(formattedKline);
        } else if (m.e === '24hrTicker') {
          const priceChange = {
            lastPrice: m['c'],
            priceChange: m['p'],
            percent: m['P'],
            highPrice: m['h'],
            lowPrice: m['l'],
            volume: m['v'],
            turnover: m['q'],
          };
          this._priceChange.set(priceChange);
        }
      },
    });
  }

  updateInterval(interval: string): void {
    this._interval.set(interval);
    this.wsService.unsubscribeFromStreams([`btcusdt@kline_${this.interval()}`]);
    this.wsService.subscribeToStreams([`btcusdt@kline_${this.interval()}`]);
  }

  updateKlinesArray(newKline: CandlestickData): void {
    if (!newKline) return;

    this._klinesDataArray.update(oldArray => {
      if (oldArray.length === 0) return [newKline];

      const lastCandle = oldArray.at(-1)!;

      if (lastCandle.time === newKline.time) {
        const updatedArray = [...oldArray];
        updatedArray[updatedArray.length - 1] = newKline;
        return updatedArray;
      }

      if (newKline.time <= lastCandle.time) {
        return oldArray;
      }

      return [...oldArray, newKline].slice(-500);
    });
  }

  close(): void {
    this.wsService.disconnect();
  }
}
