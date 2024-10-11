/* eslint-disable @conarti/feature-sliced/layers-slices */
import { City } from "@/entities/city";
import { Station } from "@/entities/station";
import { WayDetail } from "@/entities/wayDetails";

export interface Way {
  date: Date | null;
  from: {
    city: City | null;
    station: Station | null;
  };
  to: {
    city: City | null;
    station: Station | null;
  };
}

export interface GetWayResponse {
  ways: WayDetail[];
}
