import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import * as SC from './form.styled';
import { CountryFlag } from '../countryFlag/countryFlag';
import { ConversionData, ExchangeRate } from '../../types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';

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
    control,
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
          <Controller
            render={({ field }) => (
              <Select {...field} fullWidth defaultValue="" label={t('form.code')} error={!!errors.code}>
                {rates.map((rate) => (
                  <MenuItem key={rate.code} value={rate.code} sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                    <CountryFlag country={rate.country} />
                    {rate.code} — {rate.currency}
                  </MenuItem>
                ))}
              </Select>
            )}
            name="code"
            control={control}
          />
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
