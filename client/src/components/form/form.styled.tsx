import { styled } from '@mui/material';

export const FormGrid = styled('div')`
  display: grid;
  grid-gap: 16px;
  margin-bottom: 16px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
