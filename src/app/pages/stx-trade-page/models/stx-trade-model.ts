import { Time } from 'lightweight-charts';

export type CandlestickData = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type PriceChange = {
  lastPrice: string;
  priceChange: string;
  percent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  turnover: string;
};
