import moment from 'moment';
import { useExchangeRatesQuery } from '../../queries/exchangeRatesQuery';
import { useTranslation } from 'react-i18next';
import { Alert, Card, CardContent, Container, Typography } from '@mui/material';
import { ExchangeRates } from '../exchangeRates/exchangeRates';
import { Form } from '../form/form';
import { Conversion } from '../conversion/conversion';
import { useConversion } from '../../hooks/useConversion';

const CONTAINER_GAP = 4;

export const Converter = () => {
  const { t } = useTranslation();
  const { isLoading, data: exchangeRatesData } = useExchangeRatesQuery();
  const { setInputData, data: conversionData } = useConversion();

  if (isLoading) {
    return <Alert severity="info">{t('loading')}</Alert>;
  }

  if (!exchangeRatesData) {
    return <Alert severity="error">{t('error.data')}</Alert>;
  }

  const { date, rates, header } = exchangeRatesData;

  return (
    <>
      <Container sx={{ mb: CONTAINER_GAP }}>
        <Typography>{t('info.disclaimer')}</Typography>
        <Typography>{t('info.updatedAt', { date: moment(date).format('DD.MM.YYYY') })}</Typography>
      </Container>

      <Container sx={{ mb: CONTAINER_GAP }}>
        <Card>
          <CardContent>
            <Form rates={rates} handleConversion={setInputData} />
            <Conversion {...conversionData} />
          </CardContent>
        </Card>
      </Container>

      <Container sx={{ mb: CONTAINER_GAP }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {t('exchangeRates.title')}
        </Typography>
        <ExchangeRates header={header} rates={rates} />
      </Container>
    </>
  );
};
