import { computed, inject, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { WebSocketService } from './stx-trade-ws.service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { StxTradeApiService } from './stx-trade-api-service';
import { BinanceStream, isKline, isTicker, KlineData, PriceData } from '../models/stx-trade-model';
import { combineLatest, filter, map, switchMap, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Time } from 'lightweight-charts';
import { DEFAULT_KLINES_LIMIT, MS_IN_SECOND } from '../constants/stx-trade-page-constants';

@Injectable()
export class StxTradePageService {
  private wsService = inject(WebSocketService);
  private tradeApiService = inject(StxTradeApiService);
  private route = inject(ActivatedRoute);
  private readonly baseUrl = environment.apiUrl;

  private readonly routePair = toSignal(this.route.paramMap.pipe(map(params => params.get('pair'))));

  private readonly _klineData: WritableSignal<KlineData | undefined> = signal(undefined);
  private readonly _priceChange = signal<PriceData | null>(null);
  private readonly _interval = signal('1m');
  private readonly _klinesDataArray = signal<KlineData[]>([]);

  readonly klineData = this._klineData.asReadonly();
  readonly interval = this._interval.asReadonly();

  readonly pageState = computed(() => ({
    priceChange: this._priceChange(),
    klines: untracked(() => this._klinesDataArray()),
  }));

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

    this.wsService.tradeStream$.pipe(takeUntilDestroyed()).subscribe((message: BinanceStream) => {
      if (isKline(message)) {
        const formattedKlineData = { ...message.data, time: (message.data.time / MS_IN_SECOND) as Time };
        this._klineData.set(formattedKlineData);
        this.updateKlinesArray(formattedKlineData);
      } else if (isTicker(message)) {
        this._priceChange.set(message.data);
      }
    });
  }

  start(): void {
    this.wsService.connect(this.baseUrl);

    this.wsService.connectionStatus$
      .pipe(
        filter(status => status === true),
        take(1)
      )
      .subscribe(() => {
        this.wsService.subscribeToStream(`${this.pair()}@kline_${this.interval()}`);
        this.wsService.subscribeToStream(`${this.pair()}@ticker`);
      });
  }

  updateInterval(interval: string): void {
    this.wsService.unsubscribeFromStream(`${this.pair()}@kline_${this.interval()}`);

    this._interval.set(interval);

    this.wsService.subscribeToStream(`${this.pair()}@kline_${this.interval()}`);
  }

  updateKlinesArray(newKline: KlineData): void {
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

      return [...oldArray, newKline].slice(-DEFAULT_KLINES_LIMIT);
    });
  }

  close(): void {
    this.wsService.disconnect();
  }
}
