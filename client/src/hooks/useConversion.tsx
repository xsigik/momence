import { useState } from 'react';
import { ConversionData } from '../types';
import { convert } from '../utils/conversion';

export const useConversion = () => {
  const [data, setData] = useState<ConversionData | null>(null);
  const result = data ? convert(data.amount, data.rate) : 0;
  const resultInverted = result ? 1 / result : 0;
  const amount = data?.amount ?? 0;
  const rate = data?.rate ?? null;

  return {
    data: {
      result,
      resultInverted,
      amount,
      rate,
    },
    setInputData: setData,
  };
};
