import { computed, inject, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { WebSocketService } from './stx-trade-ws.service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { StxTradeApiService } from './stx-trade-api-service';
import {
  CandlestickData,
  isKline,
  isTicker,
  parseKline,
  parseTicker,
  PriceChange,
  WebSocketMessage,
} from '../models/stx-trade-model';
import { combineLatest, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class StxTradePageService {
  private wsService = inject(WebSocketService);
  private tradeApiService = inject(StxTradeApiService);
  private route = inject(ActivatedRoute);

  private readonly routePair = toSignal(this.route.paramMap.pipe(map(params => params.get('pair'))));

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

  start(): void {
    this.wsService.connect('wss://stream.binance.com:9443/ws');
    this.wsService.subscribeToStreams([`${this.pair()}@kline_${this.interval()}`, `${this.pair()}@ticker`]);
  }

  readonly pair = computed(() => {
    const pair = this.routePair() || 'btcusdt';
    return pair.toLowerCase();
  });

  constructor() {
    combineLatest([toObservable(this.pair), toObservable(this.interval)])
      .pipe(
        switchMap(([symbol, interval]) => this.tradeApiService.getHistoricalKlines(symbol, interval)),
        takeUntilDestroyed()
      )
      .subscribe(historicalKlines => {
        this._klinesDataArray.set(historicalKlines);
      });

    const ws = this.wsService;

    ws.messages$.pipe(takeUntilDestroyed()).subscribe((message: WebSocketMessage) => {
      if (isKline(message)) {
        const formattedKline = parseKline(message);
        this._klineData.set(formattedKline);
        this.updateKlinesArray(formattedKline);
      } else if (isTicker(message)) {
        this._priceChange.set(parseTicker(message));
      }
    });
  }

  updateInterval(interval: string): void {
    this.wsService.unsubscribeFromStreams([`${this.pair()}@kline_${this.interval()}`]);
    this._interval.set(interval);
    this.wsService.subscribeToStreams([`${this.pair()}@kline_${this.interval()}`]);
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
