import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MarketsService } from './services/markets.service';
import { Router } from '@angular/router';
import { MarketToken } from '../../shared/types/market.types';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'stx-markets-page',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './markets-page.html',
  styleUrl: './markets-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsPage {
  private readonly marketsService = inject(MarketsService);
  private readonly router = inject(Router);

  readonly tokens = this.marketsService.tokens;
  readonly totalTokens = this.marketsService.total;

  readonly displayedColumns: string[] = ['coin', 'price', 'change24h', 'volume'];

  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);

  constructor() {
    effect(() => {
      const apiPage = this.pageIndex() + 1;
      this.marketsService.loadMarketData(apiPage, this.pageSize());
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  trackBySymbol(index: number, token: MarketToken): string {
    return token.symbol;
  }

  navigateToTrade(pair: string): void {
    this.router.navigate(['/trade', pair]);
  }
}
