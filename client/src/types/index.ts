export interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface ExchangeRatesData {
  date: Date | null;
  header: string[];
  rates: ExchangeRate[];
}

export interface ConversionData {
  amount: number;
  rate: ExchangeRate;
}
