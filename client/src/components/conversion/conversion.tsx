import { useTranslation } from 'react-i18next';
import { ExchangeRate } from '../../types';
import * as SC from './conversion.styled';
interface Props {
  amount: number;
  result: number;
  resultInverted: number;
  rate: ExchangeRate | null;
}

export const Conversion: React.FC<Props> = ({ amount, result, resultInverted, rate }) => {
  const { t } = useTranslation();

  if (!rate) {
    return null;
  }

  return (
    <div>
      <SC.SecondaryText>
        <strong>{t('result.czk', { value: amount.toFixed(2) })}</strong>
      </SC.SecondaryText>
      <SC.Result>
        {result} {rate.code}
      </SC.Result>
      <SC.SecondaryText>{t('result.other', { code: rate.code, value: resultInverted })}</SC.SecondaryText>
    </div>
  );
};
