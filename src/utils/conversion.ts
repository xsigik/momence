import { ExchangeRate } from "../types";

export const convert = (amount: number, rate: ExchangeRate): number => {
    return (amount / rate.rate) * rate.amount;
}