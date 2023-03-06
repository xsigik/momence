import moment from "moment";
import { useExchangeRatesQuery } from "../../queries/exchangeRatesQuery";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { ExchangeRates } from "../exchangeRates/exchangeRates";
import { Form } from "../form/form";

export const Converter = () => {
  const { isLoading, data } = useExchangeRatesQuery();
  const { t } = useTranslation();

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (!data) {
    return null;
  }

  const { date, rates, header } = data;

  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          {t("title")}
        </Typography>
      </Container>

      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography>
          Foreign exchange market rates are updated only once a day.
        </Typography>
        <Typography>
          Last update: {moment(date).format("DD.MM.YYYY")}
        </Typography>
      </Container>

      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Form rates={rates} />
          </CardContent>
        </Card>
      </Container>

      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Exchange rates
        </Typography>
        <Card>
          <CardContent>
            <ExchangeRates header={header} rates={rates} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
