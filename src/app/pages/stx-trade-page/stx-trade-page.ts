import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StxPriceChart } from './components/stx-price-chart/stx-price-chart';

@Component({
  selector: 'stx-trade-page',
  imports: [StxPriceChart],
  templateUrl: './stx-trade-page.html',
  styleUrl: './stx-trade-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePage {}
