import { Time } from 'lightweight-charts';

export type CandlestickData = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};
