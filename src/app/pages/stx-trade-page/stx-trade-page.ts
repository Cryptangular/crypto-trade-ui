import { WebSocketMessage, WebSocketService } from './services/stx-trade-ws.service';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { StxPriceChart } from './components/stx-price-chart/stx-price-chart';
import { StxTradeApiService } from './services/stx-trade-api-service';
import { StxTradePageHeader } from './components/stx-trade-page-header/stx-trade-page-header';
import { CandlestickData } from './models/stx-trade-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type KlineData = {
  type: string;
  time: number;
  symbol: string;
  kline: CandlestickData;
};

@Component({
  selector: 'stx-trade-page',
  imports: [StxPriceChart, StxTradePageHeader],
  providers: [StxTradeApiService],
  templateUrl: './stx-trade-page.html',
  styleUrl: './stx-trade-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePage implements OnInit, OnDestroy {
  private wsService = inject(WebSocketService);
  isConnected = false;
  readonly data = signal(null);
  readonly klineData: WritableSignal<KlineData | undefined> = signal(undefined);
  readonly priceChange: WritableSignal<number> = signal(0);
  readonly pair = input<string>('');

  ngOnInit(): void {
    this.wsService.connect('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    this.wsService.connectionStatus$.pipe().subscribe(status => (this.isConnected = status));

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
          this.klineData.set(formattedKline);
        } else if (m.e === '24hrTicker') {
          const price = m['c'];
          this.priceChange.set(price);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.wsService.disconnect();
  }
}
