import { RequestHandler } from 'express';
import { parseExchangeRates } from '../utils/exchangeRates';

const EXCHANGE_RATES_API_URL =
  'http://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export const getRates: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(EXCHANGE_RATES_API_URL);
    const text = await response.text();

    if (!text) {
      res.send({
        date: null,
        header: [],
        rates: [],
      });
    }

    const { date, header, rates } = parseExchangeRates(text);

    res.send({
      date,
      header,
      rates,
    });
  } catch (err) {
    console.error(err);
  }
};
