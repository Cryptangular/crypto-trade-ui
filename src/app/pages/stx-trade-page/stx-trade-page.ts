import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StxPriceChart } from './components/stx-price-chart/stx-price-chart';
import { StxTradeApiService } from './services/stx-trade-api-service';
import { StxTradePageHeader } from './components/stx-trade-page-header/stx-trade-page-header';

@Component({
  selector: 'stx-trade-page',
  imports: [StxPriceChart, StxTradePageHeader],
  providers: [StxTradeApiService],
  templateUrl: './stx-trade-page.html',
  styleUrl: './stx-trade-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePage {}
