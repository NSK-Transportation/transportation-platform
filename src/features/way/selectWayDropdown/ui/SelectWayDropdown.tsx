import { FC } from "react";
import { useQuery } from "react-query";
import { City } from "@/entities/city";
import { Station } from "@/entities/station";
import { getCities, useWayStore, Way } from "@/entities/way";
import { DropdownStation } from "@/shared/ui";
import { getValue } from "@/shared/utils";

interface Props {
  name: keyof Way;
  placeholder: string;
  message?: string;
}

export const SelectWayDropdown: FC<Props> = ({ name, placeholder = "Placeholder", message }) => {
  const {
    way,
    setWay,
    options: { cities },
    setOption,
  } = useWayStore();

  const handleWayChange = (city: City, station: Station | null, name: keyof Way) => {
    setWay({
      ...way,
      [name]: { city: city.name, station: station?.name },
    });
  };

  const { isFetching } = useQuery(["cities", cities], () => getCities(), {
    refetchOnWindowFocus: false,
    onSuccess(data) {
      setOption("cities", data);
    },
  });

  const wayName = getValue(way, name);

  if (!wayName || wayName instanceof Date) {
    return null;
  }

  const city = cities?.find((city) => city.name === (wayName?.city ?? ""));
  const station = city?.stations.find((station) => station.name === wayName.station);

  return (
    <DropdownStation
      name={name}
      value={wayName.city ? (station?.name ? `${city?.rus}: ${station?.rus}` : `${city?.rus}`) : ""}
      selected={wayName}
      onClick={(city, station) => handleWayChange(city, station ?? null, name)}
      placeholder={placeholder}
      message={message}
      options={cities}
      loading={isFetching}
    />
  );
};
