import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Form } from './form';
import { FormDataTests } from './form.constant';
import { ExchangeRate } from '../../types';

const defaultRates: ExchangeRate[] = [
  {
    country: 'USA',
    currency: 'dollar',
    amount: 1,
    code: 'USD',
    rate: 22.325,
  },
];

describe('Form component', () => {
  it('should render', () => {
    render(<Form rates={[]} handleConversion={jest.fn()} />);
  });

  it('should display error message when amount is negative', async () => {
    render(<Form rates={[]} handleConversion={jest.fn()} />);
    const amount = screen.getByTestId(FormDataTests.amount);
    const submit = screen.getByTestId(FormDataTests.submit);
    fireEvent.change(amount, { target: { value: '-1' } });
    fireEvent.blur(amount);
    fireEvent.click(submit);

    expect(await screen.findByText(/Amount must be greater than 0./i)).toBeInTheDocument();
  });

  it('should display error message when amount is empty', async () => {
    render(<Form rates={[]} handleConversion={jest.fn()} />);
    const submit = screen.getByTestId(FormDataTests.submit);
    fireEvent.click(submit);

    expect(await screen.findByText(/Amount must not be empty./i)).toBeInTheDocument();
  });

  it('should display error message when code is empty', async () => {
    render(<Form rates={[]} handleConversion={jest.fn()} />);
    const submit = screen.getByTestId(FormDataTests.submit);
    fireEvent.click(submit);

    expect(await screen.findByText(/Currency must not be empty./i)).toBeInTheDocument();
  });

  it('renders selected value in select', async () => {
    render(<Form rates={defaultRates} handleConversion={jest.fn()} />);
    const code = screen.getByTestId(FormDataTests.code);
    fireEvent.change(code, { target: { value: 'USD' } });
    fireEvent.blur(code);

    expect(await screen.findByText(/USD — dollar/i)).toBeInTheDocument();
  });

  it('calls a callback function with correct parameters', async () => {
    const handleConversion = jest.fn();
    render(<Form rates={defaultRates} handleConversion={handleConversion} />);
    const amount = screen.getByTestId(FormDataTests.amount);
    const code = screen.getByTestId(FormDataTests.code);
    const submit = screen.getByTestId(FormDataTests.submit);
    fireEvent.change(amount, { target: { value: '1' } });
    fireEvent.change(code, { target: { value: 'USD' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(handleConversion).toBeCalledWith({ amount: 1, rate: defaultRates[0] });
    });
  });
});
