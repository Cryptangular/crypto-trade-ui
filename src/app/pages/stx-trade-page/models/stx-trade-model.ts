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

export type TickerData = {
  lastPrice: string;
  priceChange: string;
  percent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  turnover: string;
};

export type BinanceStream = {
  e: string;
  E: number;
  s: string;
};

export type BinanceKline = {
  e: 'kline';
  k: {
    t: number;
    o: string;
    c: string;
    h: string;
    l: string;
  };
} & BinanceStream;

export type BinanceTicker = {
  e: '24hrTicker';
  p: string;
  P: string;
  c: string;
  h: string;
  l: string;
  v: string;
  q: string;
} & BinanceStream;

export type WebSocketMessage = BinanceKline | BinanceTicker;

export type BinanceCommand = {
  method: 'SUBSCRIBE' | 'UNSUBSCRIBE';
  params: string[];
  id: number;
};

export function isStreamMessage(message: WebSocketMessage | BinanceCommand): message is WebSocketMessage {
  return message && 'e' in message;
}

export function isKline(event: BinanceStream): event is BinanceKline {
  return event.e === 'kline';
}

export function isTicker(event: BinanceStream): event is BinanceTicker {
  return event.e === '24hrTicker';
}

export function parseKline(rawKline: BinanceKline): CandlestickData {
  const { t: time, o: open, h: high, l: low, c: close } = rawKline.k;
  return {
    time: time as Time,
    open: +open,
    high: +high,
    low: +low,
    close: +close,
  };
}

export function parseTicker(rawTicker: BinanceTicker): TickerData {
  const { c: lastPrice, p: priceChange, P: percent, h: highPrice, l: lowPrice, v: volume, q: turnover } = rawTicker;
  return {
    lastPrice,
    priceChange,
    percent,
    highPrice,
    lowPrice,
    volume,
    turnover,
  };
}
