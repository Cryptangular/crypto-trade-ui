import { InjectionToken } from '@angular/core';

export type PriceChartConfig = {
  chartHeight: number;
  themeBackground: string;
  themeTextColor: string;
  themeLinesColor: string;
  candlesUpColor: string;
  candlesDownColor: string;
  candlesBorderVisible: boolean;
};

const DEFAULT_CHART_CONFIG: PriceChartConfig = {
  chartHeight: 400,
  themeBackground: '#18181c',
  themeTextColor: '#ADAABE',
  themeLinesColor: '#27272A',
  candlesUpColor: '#2BAF42',
  candlesDownColor: '#FFBA38',
  candlesBorderVisible: true,
};

export const PRICE_CHART_CONFIG = new InjectionToken<PriceChartConfig>('PriceChartConfig', {
  factory: (): PriceChartConfig => DEFAULT_CHART_CONFIG,
});
