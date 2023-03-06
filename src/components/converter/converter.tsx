import moment from "moment";
import { useExchangeRatesQuery } from "../../queries/exchangeRatesQuery";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import * as SC from "./convert.styled";

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
            <SC.FormGrid>
              <TextField id="amount" label="Amount CZK" variant="outlined" />
              <Autocomplete
                id="currency"
                sx={{ width: "100%" }}
                options={rates}
                autoHighlight
                getOptionLabel={(rate) => rate.currency}
                renderOption={(props, rate) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      src={`/flags/${rate.country}.svg`}
                      alt=""
                      width="32"
                      height="24"
                    />
                    {rate.code} - {rate.currency}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a currency"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </SC.FormGrid>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Button variant="contained">Convert</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Exchange rates
        </Typography>
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
                {rates.map((rate) => (
                  <TableRow key={rate.code}>
                    <TableCell>
                      <img
                        src={`/flags/${rate.country}.svg`}
                        alt=""
                        width="32"
                        height="24"
                        loading="lazy"
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
    </>
  );
};
