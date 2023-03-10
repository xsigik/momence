import { styled } from '@mui/material';

export const SecondaryText = styled('p')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
`
);

export const Result = styled('p')`
  font-size: 2rem;
  margin: 0;
`;
