import { styled } from '@mui/material';

export const SecondaryText = styled('p')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary}
`
);
