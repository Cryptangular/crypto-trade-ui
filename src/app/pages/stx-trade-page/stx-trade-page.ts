import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StxPriceChart } from './components/stx-price-chart/stx-price-chart';
import { StxTradeApiService } from './services/stx-trade-api-service';

@Component({
  selector: 'stx-trade-page',
  imports: [StxPriceChart],
  providers: [StxTradeApiService],
  templateUrl: './stx-trade-page.html',
  styleUrl: './stx-trade-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePage {
  readonly pair = input<string>('');
}
