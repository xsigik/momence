import { ExchangeRate } from "../types";
import { convert } from "./conversion";

const defaultRate: ExchangeRate = {
  country: "USA",
  currency: "dollar",
  amount: 1,
  code: "USD",
  rate: 0.82,
};

describe("convert function", () => {
  it("should return correct amount", () => {
    const result = convert(100, defaultRate);
    expect(result).toEqual(121.95121951219512);
  });

  it("should return 0 if amount is 0", () => {
    const result = convert(0, defaultRate);
    expect(result).toEqual(0);
  });

  it("should return 100 if amount is 1 and rate amount is 100", () => {
    const rate: ExchangeRate = {
        ...defaultRate,
        amount: 10,
      };
    const result = convert(1, rate);
    expect(result).toEqual(12.195121951219512);
  });

  it("should return 0 if rate is 0", () => {
    const rate: ExchangeRate = {
        ...defaultRate,
      rate: 0,
    };
    const result = convert(100, rate);
    expect(result).toEqual(0);
  });
});
