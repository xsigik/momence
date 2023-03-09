import { ExchangeRate } from "../types";

export const convert = (amount: number, rate: ExchangeRate): number => {
    if (!rate.rate) {
        return 0;
    }
    return (amount / rate.rate) * rate.amount;
}