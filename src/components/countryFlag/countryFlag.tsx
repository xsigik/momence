import { SyntheticEvent } from "react";

interface Props {
  country: string;
  height?: number;
  width?: number;
}

export const CountryFlag: React.FC<Props> = ({
  country,
  width = 32,
  height = 24,
}) => {
  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/flags/default.png";
  };

  return (
    <img
      src={`/flags/${country}.svg`}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      onError={handleError}
    />
  );
};
