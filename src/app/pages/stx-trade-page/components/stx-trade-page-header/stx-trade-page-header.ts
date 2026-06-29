import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'stx-trade-page-header',
  imports: [CurrencyPipe],
  templateUrl: './stx-trade-page-header.html',
  styleUrl: './stx-trade-page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxTradePageHeader {
  readonly tradePairName = input.required<string>();
  readonly currentPrice = input.required<string>();
}
