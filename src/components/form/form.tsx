import { Autocomplete, Box, Button, TextField } from "@mui/material";
import * as SC from "./form.styled";
import { CountryFlag } from "../countryFlag/countryFlag";
import { ExchangeRate } from "../../types";

interface Props {
  rates: ExchangeRate[];
}

export const Form: React.FC<Props> = ({ rates }) => {
  return (
    <>
      <SC.FormGrid>
        <TextField
          id="amount"
          label="Amount CZK"
          variant="outlined"
          type="number"
        />
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
              <CountryFlag country={rate.country} />
              {rate.code} — {rate.currency}
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
    </>
  );
};
