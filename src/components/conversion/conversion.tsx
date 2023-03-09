import { ExchangeRate } from "../../types";
import { convert } from "../../utils/conversion";

interface Props {
  amount: number;
  rate: ExchangeRate;
}

export const Conversion: React.FC<Props> = ({ amount, rate }) => {
  const result = convert(amount, rate);
  return (
    <div>
      <p>{amount} Czech Koruna</p>
      <p>
        {result} {rate.code}
      </p>
      <p>
        1 {rate.code} = {1 / result} CZK
      </p>
    </div>
  );
};
