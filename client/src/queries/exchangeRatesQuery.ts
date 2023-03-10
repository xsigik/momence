import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ExchangeRatesData } from '../types';

const EXCHANGE_RATES_API_URL = '/api/rates';

const getExchangeRates = async () => {
  const response = await fetch(EXCHANGE_RATES_API_URL);
  const data = await response.json();
  return data;
};

export const useExchangeRatesQuery = (): UseQueryResult<ExchangeRatesData | undefined, unknown> => {
  return useQuery(['exchangeRates'], getExchangeRates, {
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
