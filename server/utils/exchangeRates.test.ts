import { parseExchangeRates } from './exchangeRates';

const rawData = `10 Mar 2023 #50
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.712
Brazil|real|1|BRL|4.294
Bulgaria|lev|1|BGN|12.083
Canada|dollar|1|CAD|16.140
China|renminbi|1|CNY|3.212
Denmark|krone|1|DKK|3.176
EMU|euro|1|EUR|23.635
Hongkong|dollar|1|HKD|2.844
Hungary|forint|100|HUF|6.160
Iceland|krona|100|ISK|15.746
IMF|SDR|1|XDR|29.599
India|rupee|100|INR|27.184
Indonesia|rupiah|1000|IDR|1.445
Israel|new shekel|1|ILS|6.201
Japan|yen|100|JPY|16.332
Malaysia|ringgit|1|MYR|4.939
Mexico|peso|1|MXN|1.209
New Zealand|dollar|1|NZD|13.667
Norway|krone|1|NOK|2.094
Philippines|peso|100|PHP|40.467
Poland|zloty|1|PLN|5.049
Romania|leu|1|RON|4.810
Singapore|dollar|1|SGD|16.470
South Africa|rand|1|ZAR|1.217
South Korea|won|100|KRW|1.690
Sweden|krona|1|SEK|2.075
Switzerland|franc|1|CHF|24.057
Thailand|baht|100|THB|63.670
Turkey|lira|1|TRY|1.177
United Kingdom|pound|1|GBP|26.777
USA|dollar|1|USD|22.325`;

describe('exchangeRates', () => {
  it('should return correct date', () => {
    const result = parseExchangeRates(rawData);
    expect(result.date).toEqual(new Date('10 Mar 2023'));
  });

  it('should return correct header', () => {
    const result = parseExchangeRates(rawData);
    expect(result.header).toEqual(['Country', 'Currency', 'Amount', 'Code', 'Rate']);
  });

  it('should return correct rates', () => {
    const result = parseExchangeRates(rawData);
    expect(result.rates.length).toEqual(31);
    expect(result.rates[0]).toEqual({
      country: 'Australia',
      currency: 'dollar',
      amount: 1,
      code: 'AUD',
      rate: 14.712,
    });
  });
});
