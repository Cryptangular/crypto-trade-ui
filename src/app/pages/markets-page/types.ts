export type TokenMarketData = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  price: string;
  change24h: string;
  volume24h: string;
  marketCap: number;
};

export type TokensResponse = {
  data: TokenMarketData[];
};
