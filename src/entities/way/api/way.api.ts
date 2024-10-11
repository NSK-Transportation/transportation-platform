/* eslint-disable @conarti/feature-sliced/layers-slices */
import { axiosInstance } from "@/shared/api";
import { GetWayResponse, Way } from "../model/types/way.types";

export const getWays = async (way: Way) => {
  const response = await axiosInstance.get<GetWayResponse>(`/ways`, {
    params: {
      date: way.date,
      "from.city.name": way.from.city,
      "from.station.name": way.from.station,
      "to.city.name": way.to.city,
      "to.station.name": way.to.station,
    },
  });

  return response.data.ways;
};
