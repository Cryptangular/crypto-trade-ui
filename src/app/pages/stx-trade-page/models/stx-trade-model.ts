import { Time } from 'lightweight-charts';

export type KlineData = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};

type KlinePayload = Omit<KlineData, 'time'> & { time: number };

export type PriceData = {
  lastPrice: string;
  priceChange: string;
  percent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  turnover: string;
};

export type BinanceStream = {
  type: string;
  data: KlinePayload | PriceData;
};

export type KlineStreamMessage = {
  type: 'kline';
  data: KlinePayload;
};

export type TickerStreamMessage = {
  type: 'ticker';
  data: PriceData;
};

export type WebSocketMessage = KlineStreamMessage | TickerStreamMessage;

export function isKline(event: BinanceStream): event is KlineStreamMessage {
  return event.type === 'kline';
}

export function isTicker(event: BinanceStream): event is TickerStreamMessage {
  return event.type === 'ticker';
}
