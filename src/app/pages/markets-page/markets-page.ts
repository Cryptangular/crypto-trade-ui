import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CryptoMarketService } from './crypto-market.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'stx-markets-page',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './markets-page.html',
  styleUrl: './markets-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsPage {
  private readonly marketService = inject(CryptoMarketService);

  readonly tokens = this.marketService.allTokens;

  readonly displayedColumns: string[] = ['coin', 'price', 'change24h', 'volume'];

  constructor() {
    this.marketService.loadInitialMarketData();
  }
}
