/* eslint-disable @conarti/feature-sliced/layers-slices */
import { WayDetail } from "@/entities/wayDetails";
import { axiosInstance } from "@/shared/api";
import { Way } from "../model/types/way.types";

export const getWays = async (way: Way) => {
  const response = await axiosInstance.get<WayDetail[]>(`/ways`, {
    params: {
      "from.date": way.date,
      "from.city.name": way.from.city,
      "from.station.name": way.from.station,
      "to.city.name": way.to.city,
      "to.station.name": way.to.station,
    },
  });

  return response.data;
};
