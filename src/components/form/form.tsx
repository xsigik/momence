import { Autocomplete, Box, Button, TextField } from "@mui/material";
import * as SC from "./form.styled";
import { CountryFlag } from "../countryFlag/countryFlag";
import { ExchangeRate } from "../../types";
import { useForm } from "react-hook-form";

interface Props {
  rates: ExchangeRate[];
}

export const Form: React.FC<Props> = ({ rates }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SC.FormGrid>
        <TextField
          label="Amount CZK"
          variant="outlined"
          type="number"
          {...register("amount")}
        />
        <Autocomplete
          sx={{ width: "100%" }}
          options={rates}
          autoHighlight
          getOptionLabel={(rate) => `${rate.code} — ${rate.currency}`}
          renderOption={(props, rate) => (
            <Box
              key={rate.code}
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
              {...register("currency")}
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
        <Button variant="contained" type="submit">
          Convert
        </Button>
      </Box>
    </form>
  );
};
