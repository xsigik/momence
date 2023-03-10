import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ExchangeRatesData } from '../types';

const EXCHANGE_RATES_API_URL = '/api/rates';

const getExchangeRates = async (): Promise<ExchangeRatesData> => {
  const response = await fetch(EXCHANGE_RATES_API_URL);
  const data: ExchangeRatesData = await response.json();

  if (!data) {
    throw new Error('Error fetching exchange rates.');
  }
  return data;
};

export const useExchangeRatesQuery = (): UseQueryResult<ExchangeRatesData | undefined, unknown> => {
  return useQuery(['exchangeRates'], getExchangeRates, {
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
