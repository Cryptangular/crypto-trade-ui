import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { StxTradeApiService } from '../../services/stx-trade-api-service';
import { CandlestickData } from '../../models/stx-trade-model';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'stx-price-chart',
  standalone: true,
  templateUrl: './stx-price-chart.html',
  styleUrl: './stx-price-chart.scss',
  imports: [MatButtonToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class StxPriceChart {
  private readonly chartContainer = viewChild.required<ElementRef<HTMLDivElement>>('chartContainer');
  private readonly tradeApi = inject(StxTradeApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly symbol = input<string>('BNBUSDT');
  readonly interval = signal<string>('1d');

  readonly serverData = signal<CandlestickData[]>([]);

  private chart?: IChartApi;
  private candlestickSeries?: ISeriesApi<'Candlestick'>;

  constructor() {
    effect(onCleanUp => {
      const klinesSub = this.tradeApi
        .getHistoricalKlines(this.symbol(), this.interval())
        .subscribe({ next: klines => this.serverData.set(klines) });

      onCleanUp(() => klinesSub.unsubscribe());
    });

    effect(() => {
      const chartData = this.serverData();

      if (!this.chart) {
        this.initChart();
      }

      if (chartData && chartData.length > 0) {
        this.candlestickSeries?.setData(chartData);
        this.chart?.timeScale().fitContent();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.destroyChart();
    });
  }

  onToggleChange($event: MatButtonToggleChange): void {
    this.interval.set($event.value);
  }

  onResize(): void {
    if (this.chart) {
      this.chart.resize(window.innerWidth, window.innerHeight);
    }
  }

  private initChart(): void {
    const container = this.chartContainer().nativeElement;

    this.chart = createChart(container, {
      width: container.clientWidth,
      height: 400,
      layout: { background: { color: '#18181c' }, textColor: '#ADAABE' },
      grid: { vertLines: { color: '#27272A' }, horzLines: { color: '#27272A' } },
    });

    this.candlestickSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#2BAF42',
      downColor: '#FFBA38',
      borderVisible: false,
      wickUpColor: '#2BAF42',
      wickDownColor: '#FFBA38',
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.remove();
      this.chart = undefined;
      this.candlestickSeries = undefined;
    }
  }
}
