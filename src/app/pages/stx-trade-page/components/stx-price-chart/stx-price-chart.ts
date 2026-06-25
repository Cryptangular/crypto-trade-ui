import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { StxTradeApiService } from '../../services/stx-trade-api-service';
import { CandlestickData } from '../../models/stx-trade-model';

@Component({
  selector: 'stx-price-chart',
  standalone: true,
  templateUrl: './stx-price-chart.html',
  styleUrl: './stx-price-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StxPriceChart implements OnInit {
  private readonly chartContainer = viewChild.required<ElementRef<HTMLDivElement>>('chartContainer');
  private readonly tradeApi = inject(StxTradeApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly symbol = input<string>('BNBUSDT');
  readonly interval = input<string>('1d');

  readonly serverData = signal<CandlestickData[]>([]);

  private chart?: IChartApi;
  private candlestickSeries?: ISeriesApi<'Candlestick'>;

  constructor() {
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

  ngOnInit(): void {
    this.loadData();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.chart) {
      this.chart.resize(window.innerWidth, window.innerHeight);
    }
  }

  private loadData(): void {
    this.tradeApi
      .getHistoricalKlines(this.symbol(), this.interval())
      .subscribe({ next: klines => this.serverData.set(klines) });
  }

  private initChart(): void {
    const container = this.chartContainer().nativeElement;

    this.chart = createChart(container, {
      width: container.clientWidth,
      height: 400,
      layout: { background: { color: '#141416' }, textColor: '#ADAABE' },
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
