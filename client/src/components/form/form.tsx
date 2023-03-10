import { Box, Button, MenuItem, TextField } from '@mui/material';
import * as SC from './form.styled';
import { CountryFlag } from '../countryFlag/countryFlag';
import { ConversionData, ExchangeRate } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

interface Props {
  rates: ExchangeRate[];
  handleConversion: (data: ConversionData) => void;
}

interface FormValues {
  amount: number;
  code: string;
}

const schema = z.object({
  amount: z.number().nonnegative(),
  code: z.string().nonempty(),
});

export const Form: React.FC<Props> = ({ rates, handleConversion }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { t } = useTranslation();

  const onSubmit = (data: FormValues) => {
    const selectedRate = rates.find((rate) => rate.code === data.code) as ExchangeRate;

    handleConversion({
      amount: data.amount,
      rate: selectedRate,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SC.FormGrid>
        <div>
          <TextField
            fullWidth
            label={t('form.amount')}
            variant="outlined"
            error={!!errors.amount}
            type="number"
            inputProps={{
              step: 'any',
            }}
            helperText={<>{errors.amount?.message ? errors.amount.message : ''}</>}
            {...register('amount', { valueAsNumber: true })}
          />
        </div>
        <div>
          <TextField
            select
            fullWidth
            defaultValue=""
            {...register('code')}
            label={t('form.code')}
            error={!!errors.code}
          >
            {rates.map((rate) => (
              <MenuItem key={rate.code} value={rate.code}>
                <Box display="flex" alignItems="center" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                  <CountryFlag country={rate.country} width={24} height={18} />
                  {rate.code} — {rate.currency}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </div>
      </SC.FormGrid>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button variant="contained" type="submit">
          {t('form.submit')}
        </Button>
      </Box>
    </form>
  );
};
