import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CryptoMarketService } from './services/crypto-market.service';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MarketToken } from '../../shared/types/market.types';

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
  private readonly router = inject(Router);

  readonly tokens = this.marketService.allTokens;

  readonly displayedColumns: string[] = ['coin', 'price', 'change24h', 'volume'];

  constructor() {
    this.marketService.loadInitialMarketData();
  }

  trackBySymbol(index: number, token: MarketToken): string {
    return token.symbol;
  }

  navigateToTrade(pair: string): void {
    this.router.navigate(['/trade', pair]);
  }
}
