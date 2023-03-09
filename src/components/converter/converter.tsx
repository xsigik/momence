import moment from "moment";
import { useExchangeRatesQuery } from "../../queries/exchangeRatesQuery";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { ExchangeRates } from "../exchangeRates/exchangeRates";
import { Form } from "../form/form";
import { useState } from "react";
import { Conversion } from "../conversion/conversion";
import { ConversionData } from "../../types";

export const Converter = () => {
  const { isLoading, data } = useExchangeRatesQuery();
  const { t } = useTranslation();
  const [conversionData, setConversionData] = useState<ConversionData | null>(
    null
  );

  const handleConversion = (data: ConversionData) => {
    setConversionData(data);
  };

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
        <Typography>{t("info.disclaimer")}</Typography>
        <Typography>
          {t("info.updatedAt", { date: moment(date).format("DD.MM.YYYY") })}
        </Typography>
      </Container>

      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Form rates={rates} handleConversion={handleConversion} />
            {conversionData && (
              <Conversion
                rate={conversionData.rate}
                amount={conversionData.amount}
              />
            )}
          </CardContent>
        </Card>
      </Container>

      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {t("exchangeRates.title")}
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
