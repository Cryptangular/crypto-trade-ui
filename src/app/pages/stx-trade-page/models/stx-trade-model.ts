import { Time } from 'lightweight-charts';

export type CandlestickData = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type BinanceKlineRaw = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];
