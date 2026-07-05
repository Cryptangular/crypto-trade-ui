import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { StxMarketsService } from './services/stx-markets.service';
import { Router } from '@angular/router';
import { MarketToken } from './types/markets.types';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../../../core/services/toast/toast-service';

@Component({
  selector: 'stx-markets-page',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  providers: [StxMarketsService],
  templateUrl: './stx-markets-page.html',
  styleUrl: './stx-markets-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxMarketsPage {
  private readonly marketsService = inject(StxMarketsService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly displayedColumns: string[] = ['coin', 'price', 'change24h', 'volume'];

  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(20);
  readonly sortBy = signal<string | undefined>(undefined);
  readonly sortOrder = signal<'asc' | 'desc'>('asc');
  readonly searchQuery = signal<string>('');
  readonly isLoading = signal<boolean>(false);

  readonly queryParams = computed(() => ({
    page: this.pageIndex() + 1,
    limit: this.pageSize(),
    sortBy: this.sortBy(),
    sortOrder: this.sortOrder(),
    search: this.searchQuery().trim() || undefined,
  }));

  private readonly marketData$ = toObservable(this.queryParams).pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(params =>
      this.marketsService.getMarketData(params).pipe(
        catchError(err => {
          this.toastService.danger('Failed to load market data', err.message);
          return of({ data: [], total: 0 });
        }),
        finalize(() => this.isLoading.set(false))
      )
    )
  );

  readonly marketResponse = toSignal(this.marketData$);

  readonly tokens = computed(() => this.marketResponse()?.data ?? []);
  readonly totalTokens = computed(() => this.marketResponse()?.total ?? 0);

  protected onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.pageIndex.set(0);
  }

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  protected onSortChange(sortState: Sort): void {
    if (!sortState.direction) {
      this.sortBy.set(undefined);
      this.sortOrder.set('asc');
    } else {
      const backendField = sortState.active === 'coin' ? 'baseAsset' : sortState.active;
      this.sortBy.set(backendField);
      this.sortOrder.set(sortState.direction as 'asc' | 'desc');
    }
  }

  protected trackBySymbol(index: number, token: MarketToken): string {
    return token.symbol;
  }

  protected navigateToTrade(pair: string): void {
    this.router.navigate(['/trade', pair]);
  }
}
