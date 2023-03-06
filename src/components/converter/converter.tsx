import moment from "moment";
import { useExchangeRatesQuery } from "../../queries/exchangeRatesQuery";
import { useTranslation } from "react-i18next";

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
    <div>
      <h2>
        {t("date")}: {moment(date).format("DD.MM.YYYY")}
      </h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>
                <img
                  crossOrigin="anonymous"
                  src={`https://countryflagsapi.com/svg/${rate.country}`}
                  alt=""
                  width="30"
                />
              </td>
              <td>{rate.country}</td>
              <td>{rate.currency}</td>
              <td>{rate.amount}</td>
              <td>{rate.code}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
