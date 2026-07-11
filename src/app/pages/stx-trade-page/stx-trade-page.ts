import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StxPriceChart } from './components/stx-price-chart/stx-price-chart';
import { StxTradeApiService } from './services/stx-trade-api-service';
import { StxTradePageHeader } from './components/stx-trade-page-header/stx-trade-page-header';
import { CandlestickData } from './models/stx-trade-model';
import { StxTradePageService } from './services/stx-trade-page-service';
import { CryptoPairPipe } from '../../shared/pipes/crypto-pair-pipe';

export type KlineData = {
  type: string;
  time: number;
  symbol: string;
  kline: CandlestickData;
};

@Component({
  selector: 'stx-trade-page',
  imports: [StxPriceChart, StxTradePageHeader, CryptoPairPipe],
  providers: [StxTradeApiService, StxTradePageService],
  templateUrl: './stx-trade-page.html',
  styleUrl: './stx-trade-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePage implements OnInit, OnDestroy {
  tradePageService = inject(StxTradePageService);

  readonly kline = this.tradePageService.klineData;
  readonly pair = this.tradePageService.pair;
  readonly pageState = this.tradePageService.pageState();

  ngOnInit(): void {
    this.tradePageService.start();
  }

  ngOnDestroy(): void {
    this.tradePageService.close();
  }
}
