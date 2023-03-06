import moment from "moment";
import { useExchangeRatesQuery } from "../../queries/exchangeRatesQuery";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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
    <Container maxWidth="sm">
      <Typography variant="h1">Currency converter</Typography>
      <h2>
        {t("date")}: {moment(date).format("DD.MM.YYYY")}
      </h2>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {header.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.map((rate, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      crossOrigin="anonymous"
                      src={`/flags/${rate.country}.svg`}
                      alt=""
                      width="32"
                      height="24"
                    />
                  </TableCell>
                  <TableCell>{rate.country}</TableCell>
                  <TableCell>{rate.currency}</TableCell>
                  <TableCell align="right">{rate.amount}</TableCell>
                  <TableCell>{rate.code}</TableCell>
                  <TableCell align="right">{rate.rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};
