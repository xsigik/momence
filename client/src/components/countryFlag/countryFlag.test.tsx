import { render, screen } from '@testing-library/react';
import { CountryFlag } from './countryFlag';
import { CountryFlagDataTests } from './countryFlag.constants';

describe('CountryFlag component', () => {
  it('should render', () => {
    render(<CountryFlag country="USA" />);
  });

  it('should render default flag when img onError is called', () => {
    render(<CountryFlag country="USA" />);
    const img = screen.getByTestId(CountryFlagDataTests.img);
    img?.dispatchEvent(new Event('error'));
    expect(img?.getAttribute('src')).toEqual('/flags/default.png');
  });
});
