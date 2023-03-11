import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ExchangeRate } from '../../types';
import { CountryFlag } from '../countryFlag/countryFlag';

interface Props {
  header: string[];
  rates: ExchangeRate[];
}

export const ExchangeRates: React.FC<Props> = ({ header, rates }) => {
  return (
    <TableContainer component={Card}>
      <Table sx={{ minWidth: 504 }}>
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
                <CountryFlag country={rate.country} />
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
    </TableContainer>
  );
};
