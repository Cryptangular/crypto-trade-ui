import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StxPriceChange } from '../../../../shared/directives/stx-price-change';

@Component({
  selector: 'stx-trade-page-header',
  imports: [CurrencyPipe, StxPriceChange],
  templateUrl: './stx-trade-page-header.html',
  styleUrl: './stx-trade-page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePageHeader {
  readonly tradePairName = input.required<string>();
  readonly currentPrice = input.required<number>();
}
