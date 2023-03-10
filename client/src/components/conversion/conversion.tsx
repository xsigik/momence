import { useTranslation } from 'react-i18next';
import { ExchangeRate } from '../../types';
import { convert } from '../../utils/conversion';
import * as SC from './conversion.styled';
interface Props {
  amount: number;
  rate: ExchangeRate;
}

export const Conversion: React.FC<Props> = ({ amount, rate }) => {
  const { t } = useTranslation();
  const result = convert(amount, rate);
  return (
    <div>
      <SC.SecondaryText>
        <strong>{t('result.czk', { value: amount.toFixed(2) })}</strong>
      </SC.SecondaryText>
      <SC.Result>
        {result} {rate.code}
      </SC.Result>
      <SC.SecondaryText>{t('result.other', { code: rate.code, value: 1 / result })}</SC.SecondaryText>
    </div>
  );
};
