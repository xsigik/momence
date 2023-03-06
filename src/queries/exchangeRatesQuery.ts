
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseExchangeRates } from "../utils/exchangeRates";
import { ExchangeRatesData } from "../types";

const EXCHANGE_RATES_API_URL = "./daily.txt";

const getExchangeRates = async () => {
  const response = await fetch(EXCHANGE_RATES_API_URL);
  const text = await response.text();
  
  if (!text) {
    return {
      date: null,
      header: [],
      rates: [],
    };
  }

  const { date, header, rates } = parseExchangeRates(text);
  
  return {
    date,
    header,
    rates
  }
}

export const useExchangeRatesQuery = (): UseQueryResult<ExchangeRatesData | undefined, unknown> => {
    return useQuery(['exchangeRates'], () => getExchangeRates());
  };
  