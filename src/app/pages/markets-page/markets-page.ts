import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { CryptoMarketService } from './crypto-market.service';

@Component({
  selector: 'stx-markets-page',
  imports: [],
  templateUrl: './markets-page.html',
  styleUrl: './markets-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsPage implements OnInit {
  private readonly marketService = inject(CryptoMarketService);

  readonly filteredTokens = computed(() => {
    const tokens = this.marketService.allTokens();
    console.log(tokens);
    return tokens;
  });

  ngOnInit(): void {
    this.marketService.loadInitialMarketData();
  }
}
