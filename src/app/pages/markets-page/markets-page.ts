import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CryptoMarketService } from './crypto-market.service';

@Component({
  selector: 'stx-markets-page',
  imports: [],
  templateUrl: './markets-page.html',
  styleUrl: './markets-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsPage {
  private readonly marketService = inject(CryptoMarketService);

  readonly tokens = this.marketService.allTokens;

  constructor() {
    this.marketService.loadInitialMarketData();
  }
}
