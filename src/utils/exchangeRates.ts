import { ExchangeRate, ExchangeRatesData } from "../types";

const dateParser = (date: string): Date => new Date(date);

const headerParser = (data: string, delimiter: string = "|") => {
    return data.split(delimiter);
}

const rateParser = (data: string, delimiter: string = "|"): ExchangeRate => {
    const [country, currency, amountRaw, code, rateRaw ] = data.split(delimiter);
    return {
        country,
        currency,
        amount: parseInt(amountRaw),
        code,
        rate: parseFloat(rateRaw),
    }
}

export const parseExchangeRates = (data: string): ExchangeRatesData => {
    const parsedData = data.split("\n")
    const [date, header, ...rates] = parsedData;
    return {
        date: dateParser(date),
        header: headerParser(header),
        rates: rates.filter(rate => !!rate).map(rate => rateParser(rate)),
    }
}
